import Decimal from "decimal.js"
import {
  TokenType,
  Token,
  SourceLocation,
  Keyword,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
  TokenReader,
} from "../parser"
import { dequote } from "../util"
import { Sqlite3Lexer } from "./sqlite3_lexer"

export class Sqlite3Parser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new Sqlite3Lexer(options).lex(input, options.fileName)
    const rootNode = new Sqlite3Parser(options).parse(tokens)
    return rootNode
  }

  constructor(
    options: Record<string, any> = {},
  ) {
    super(options)
  }

  parse(tokens: Token[]): Node {
    const r = new TokenReader(tokens)

    const root = new Node("root")
    const errors = []

    while (r.token()) {
      try {
        if (r.peekIf(TokenType.Delimiter) || r.peekIf(TokenType.Eof)) {
          root.add(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          root.add(this.command(r))
        } else {
          root.add(this.Statement(r))
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            root.add(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (r.token() != null) {
      for (let i = r.pos; i < r.tokens.length; i++) {
        root.add(r.tokens[i])
      }
      
      try {
        throw r.createParseError()
      } catch (e) {
        if (e instanceof ParseError) {
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (errors.length) {
      const err = new AggregateParseError(errors, `${errors.length} error found\n${errors.map(
        e => e.message
      ).join("\n")}`)
      err.node = root
      throw err
    }

    return root
  }

  private command(r: TokenReader) {
    const stmt = new Node("command")

    const token = r.consume(TokenType.Command)
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.add(new Node("name", token.text).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), token.skips, token.location)
      stmt.add(new Node("name", nameToken.text).add(nameToken))

      const args = token.text.substring(sep)
      const argTokens = []
      const re = /([ \t]+)|("[^"]*"|'[^']*')|([^ \t"']+)/y
      let pos = 0
      while (pos < args.length) {
        re.lastIndex = pos
        const m = re.exec(args)
        if (m) {
          const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier

          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = re.lastIndex
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(type, m[0], [], loc))
          pos = re.lastIndex
        }
      }

      const skips = new Array<Token>()
      for (const argToken of argTokens) {
        if (argToken.type.options.skip) {
          skips.push(argToken)
        } else {
          argToken.skips.push(...skips)
          skips.length = 0
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    if (r.peekIf(TokenType.Delimiter)) {
      stmt.add(r.consume())
    }
    if (r.peekIf(TokenType.Eof)) {
      stmt.add(r.consume())
    }
    return stmt
  }

  private Statement(r: TokenReader): Node {
    let explain
    let stmt

    try {
      if (r.peekIf(Keyword.EXPLAIN)) {
        explain = new Node("explain")
        explain.add(r.consume())
        if (r.peekIf(Keyword.QUERY)) {
          explain.add(new Node("query plan").add(
            r.consume(), 
            r.consume(Keyword.PLAN)
          ))
        }
      }

      if (r.peekIf(Keyword.CREATE)) {
        const mark = r.pos
        r.consume()

        if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
          r.consume()
        }

        if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.createTableStatement(r)
        } else if (r.peekIf(Keyword.VIEW)) {
          r.pos = mark
          stmt = this.createViewStatement(r)
        } else if (r.peekIf(Keyword.TRIGGER)) {
          r.pos = mark
          stmt = this.createTriggerStatement(r)
        } else if (
          r.peekIf(Keyword.UNIQUE, Keyword.INDEX) ||
          r.peekIf(Keyword.INDEX)
        ) {
          r.pos = mark
          stmt = this.createIndexStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.ALTER)) {
        const mark = r.pos
        r.consume()

        if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.alterTableStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.DROP)) {
        const mark = r.pos
        r.consume()

        if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.dropTableStatement(r)
        } else if (r.peekIf(Keyword.VIEW)) {
          r.pos = mark
          stmt = this.dropViewStatement(r)
        } else if (r.peekIf(Keyword.TRIGGER)) {
          r.pos = mark
          stmt = this.dropTriggerStatement(r)
        } else if (r.peekIf(Keyword.INDEX)) {
          r.pos = mark
          stmt = this.dropIndexStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.ATTACH, Keyword.DATABASE)) {
        stmt = this.attachDatabaseStatement(r)
      } else if (r.peekIf(Keyword.DETACH, Keyword.DATABASE)) {
        stmt = this.detachDatabaseStatement(r)
      } else if (r.peekIf(Keyword.ANALYZE)) {
        stmt = this.analyzeStatement(r)
      } else if (r.peekIf(Keyword.REINDEX)) {
        stmt = this.reindexStatement(r)
      } else if (r.peekIf(Keyword.VACUUM)) {
        stmt = this.vacuumStatement(r)
      } else if (r.peekIf(Keyword.PRAGMA)) {
        stmt = this.pragmaStatement(r)
      } else if (r.peekIf(Keyword.BEGIN)) {
        stmt = this.beginTransactionStatement(r)
      } else if (r.peekIf(Keyword.SAVEPOINT)) {
        stmt = this.savepointStatement(r)
      } else if (r.peekIf(Keyword.RELEASE)) {
        stmt = this.releaseSavepointStatement(r)
      } else if (r.peekIf(Keyword.COMMIT) || r.peekIf(Keyword.END)) {
        stmt = this.commitTransactionStatement(r)
      } else if (r.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackTransactionStatement(r)
      } else {
        let withNode
        if (r.peekIf(Keyword.WITH)) {
          withNode = this.withClause(r)
        }
        if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
          stmt = this.insertClause(r, withNode)
        } else if (r.peekIf(Keyword.UPDATE)) {
          stmt = this.updateClause(r, withNode)
        } else if (r.peekIf(Keyword.DELETE)) {
          stmt = this.deleteClause(r, withNode)
        } else if (r.peekIf(Keyword.SELECT)) {
          stmt = this.selectClause(r, withNode)
        }
      }

      if (!stmt) {
        throw r.createParseError()
      }
      
      if (explain) {
        stmt = explain.add(stmt)
      }

      if (r.peekIf(TokenType.Delimiter)) {
        stmt.add(r.consume())
      }
      if (r.peekIf(TokenType.Eof)) {
        stmt.add(r.consume())
      }
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (r.token() && !r.peekIf(TokenType.Delimiter)) {
          stmt.add(r.consume())
        }
        if (r.peekIf(TokenType.Delimiter)) {
          stmt.add(r.consume())
        }
        if (r.peekIf(TokenType.Eof)) {
          stmt.add(r.consume())
        }
        err.node = stmt
      }      
      throw err
    }
  }

  private createTableStatement(r: TokenReader) {
    const node = new Node("create table")
    let virtual = false
    
    node.add(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
      node.add(new Node("temporary").add(r.consume()))
    } else if (r.peekIf(Keyword.VIRTUAL)) {
      node.add(new Node("virtual").add(r.consume()))
      virtual = true
    }
    node.add(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        r.consume(),
        r.consume(Keyword.NOT),
        r.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(r, node)

    if (virtual) {
      node.add(r.consume(Keyword.USING))

      const moduleNode = new Node("module")
      moduleNode.add(this.identifier(r, "name"))
      if (r.peekIf(TokenType.LeftParen)) {
        moduleNode.add(r.consume())
        while (r.token()) {
          const moduleArg = new Node("arg")
          while (
            r.token() &&
            !r.peekIf(TokenType.Comma) &&
            !r.peekIf(TokenType.RightParen)
          ) {
            moduleArg.add(r.consume())
          }
          moduleNode.add(moduleArg)
          if (r.peekIf(TokenType.Comma)) {
            moduleNode.add(r.consume())
          } else {
            break
          }
        }
        moduleNode.add(r.consume(TokenType.RightParen))
      }
      node.add(moduleNode)
    } else if (r.peekIf(TokenType.LeftParen)) {
      node.add(r.consume())
      node.add(this.tableColumn(r))

      while (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())

        if (
          !r.peekIf(Keyword.CONSTRAINT) &&
          !r.peekIf(Keyword.PRIMARY) &&
          !r.peekIf(Keyword.NOT) &&
          !r.peekIf(Keyword.NULL) &&
          !r.peekIf(Keyword.UNIQUE) &&
          !r.peekIf(Keyword.CHECK) &&
          !r.peekIf(Keyword.DEFAULT) &&
          !r.peekIf(Keyword.COLLATE) &&
          !r.peekIf(Keyword.REFERENCES) &&
          !r.peekIf(Keyword.GENERATED) &&
          !r.peekIf(Keyword.AS)
        ) {
          node.add(this.tableColumn(r))
        } else {
          node.add(this.tableConstraint(r))
          while (r.peekIf(TokenType.Comma)) {
            node.add(r.consume())
            node.add(this.tableConstraint(r))
          }
          break
        }
      }

      node.add(r.consume(TokenType.RightParen))
      while (r.token() && !r.peekIf(TokenType.Delimiter)) {
        if (r.peekIf(Keyword.WITHOUT)) {
          node.add(new Node("without rowid").add(
            r.consume(), 
            r.consume(Keyword.ROWID)
          ))
        } else {
          node.add(r.consume())
        }
      }
    } else if (r.peekIf(Keyword.AS)) {
      node.add(r.consume())
      node.add(this.selectClause(r))
    } else {
      throw r.createParseError()
    }

    return node
  }

  private createViewStatement(r: TokenReader) {
    const node = new Node("create view")

    node.add(r.consume(Keyword.CREATE))
    if (
      r.peekIf(Keyword.TEMPORARY) ||
      r.peekIf(Keyword.TEMP)
    ) {
      node.add(new Node("temporary").add(r.consume()))
    }
    node.add(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        r.consume(),
        r.consume(Keyword.NOT),
        r.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(r, node)

    node.add(r.consume(Keyword.AS))

    if (r.peekIf(TokenType.LeftParen)) {
      node.add(r.consume())
      while (r.token()) {
        node.add(this.identifier(r, "column_name"))
        if (r.peekIf(TokenType.Comma)) {
          node.add(r.consume())
        } else {
          break
        }
      }
      node.add(r.consume(TokenType.RightParen))
    }
    node.add(this.selectClause(r))

    return node
  }

  private createTriggerStatement(r: TokenReader) {
    const node = new Node("create trigger")

    node.add(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
      node.add(new Node("temporary").add(r.consume()))
    }
    node.add(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        r.consume(),
        r.consume(Keyword.NOT),
        r.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(r, node)

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      if (r.peekIf(Keyword.BEGIN)) {
        node.add(r.consume())
        while (r.token() && !r.peekIf(Keyword.END)) {
          node.add(r.consume())
        }
      } else {
        node.add(r.consume())
      }
    }

    return node
  }

  private createIndexStatement(r: TokenReader) {
    const node = new Node("create index")

    node.add(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.UNIQUE)) {
      node.add(new Node("unique").add(r.consume()))
    }
    node.add(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        r.consume(),
        r.consume(Keyword.NOT),
        r.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(r, node)

    node.add(r.consume(Keyword.ON))
    node.add(this.identifier(r, "table_name"))

    node.add(r.consume(TokenType.LeftParen))
    while (r.token()) {
      node.add(this.indexColumn(r))
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    }
    node.add(r.consume(TokenType.RightParen))

    if (r.peekIf(Keyword.WHERE)) {
      const whereNode = new Node("where")
      whereNode.add(r.consume())
      while (r.token() && !r.peekIf(TokenType.Delimiter)) {
        whereNode.add(r.consume())
      }
      node.add(whereNode)
    }

    return node
  }

  private alterTableStatement(r: TokenReader) {
    const node = new Node("alter table")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
      node.add(new Node("rename to").add(
        r.consume(),
        r.consume(),
        this.identifier(r, "table_name")
      ))
    } else  if (r.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
      node.add(new Node("rename column").add(
        r.consume(),
        r.consume(),
        this.identifier(r, "from_column_name"),
        r.consume(Keyword.TO),
        this.identifier(r, "to_column_name")
      ))
    } else if (r.peekIf(Keyword.ADD)) {
      const child = new Node("add column")
      child.add(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        child.add(r.consume())
      }
      child.add(this.tableColumn(r))
      node.add(child)
    } else if (r.peekIf(Keyword.DROP)) {
      const child = new Node("drop column")
      child.add(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        child.add(r.consume())
      }
      child.add(this.identifier(r, "column_name"))
      node.add(child)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private dropTableStatement(r: TokenReader) {
    const node = new Node("drop table")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(r, node)
    return node
  }

  private dropViewStatement(r: TokenReader) {
    const node = new Node("drop view")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(r, node)
    return node
  }

  private dropTriggerStatement(r: TokenReader) {
    const node = new Node("drop trigger")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(r, node)
    return node
  }

  private dropIndexStatement(r: TokenReader) {
    const node = new Node("drop index")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(r, node)
    return node
  }

  private attachDatabaseStatement(r: TokenReader) {
    const node = new Node("attach database")
    node.add(r.consume(Keyword.ATTACH))
    node.add(r.consume(Keyword.DATABASE))
    node.add(this.expression(r))
    node.add(r.consume(Keyword.AS))
    node.add(this.identifier(r, "name"))
    return node
  }

  private detachDatabaseStatement(r: TokenReader) {
    const node = new Node("detach database")
    node.add(r.consume(Keyword.DETACH))
    node.add(r.consume(Keyword.DATABASE))
    node.add(this.identifier(r, "name"))
    return node
  }

  private analyzeStatement(r: TokenReader) {
    const node = new Node("analyze")
    node.add(r.consume(Keyword.ANALYZE))
    this.parseName(r, node)
    return node
  }

  private reindexStatement(r: TokenReader) {
    const node = new Node("reindex")
    node.add(r.consume(Keyword.REINDEX))
    this.parseName(r, node)    
    return node
  }

  private vacuumStatement(r: TokenReader) {
    const node = new Node("vacuum")
    node.add(r.consume(Keyword.VACUUM))

    if (r.token() && !r.peekIf(Keyword.TO)) {
      node.add(this.identifier(r, "schema_name"))
    }
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }
    return node
  }

  private pragmaStatement(r: TokenReader) {
    const node = new Node("pragma")
    node.add(r.consume(Keyword.PRAGMA))

    this.parseName(r, node)
    if (r.peekIf({ type: TokenType.Operator, text: "=" })) {
      node.add(r.consume())
      node.add(this.pragmaValue(r))
    } else if (r.peekIf(TokenType.LeftParen)) {
      node.add(r.consume())
      node.add(this.pragmaValue(r))
      node.add(r.consume(TokenType.RightParen))
    }
    return node
  }

  private beginTransactionStatement(r: TokenReader) {
    const node = new Node("begin transaction")

    node.add(r.consume(Keyword.BEGIN))
    if (r.peekIf(Keyword.DEFERRED)) {
      node.add(new Node("deferred").add(r.consume()))
    } else if (r.peekIf(Keyword.IMMEDIATE)) {
      node.add(new Node("immediate").add(r.consume()))
    } else if (r.peekIf(Keyword.EXCLUSIVE)) {
      node.add(new Node("exclusive").add(r.consume()))
    }
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.add(r.consume())
    }

    return node
  }

  private savepointStatement(r: TokenReader) {
    const node = new Node("savepoint")
    node.add(r.consume(Keyword.SAVEPOINT))
    node.add(this.identifier(r, "name"))
    return node
  }

  private releaseSavepointStatement(r: TokenReader) {
    const node = new Node("release savepoint")
    node.add(r.consume(Keyword.RELEASE))
    if (r.peekIf(Keyword.SAVEPOINT)) {
      node.add(r.consume())
    }
    node.add(this.identifier(r, "name"))
    return node
  }

  private commitTransactionStatement(r: TokenReader) {
    const node = new Node("commit transaction")
    if (r.peekIf(Keyword.END)) {
      node.add(r.consume())
    } else {
      node.add(r.consume(Keyword.COMMIT))  
    }
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.add(r.consume())
    }
    return node
  }

  private rollbackTransactionStatement(r: TokenReader) {
    const node = new Node("rollback transaction")
    node.add(r.consume(Keyword.ROLLBACK))
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.add(r.consume())
    }
    if (r.peekIf(Keyword.TO)) {
      node.add(r.consume())
      if (r.peekIf(Keyword.SAVEPOINT)) {
        node.add(r.consume())
      }
      node.add(this.identifier(r, "name"))
    }
    return node
  }

  private insertClause(r: TokenReader, withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    if (r.peekIf(Keyword.REPLACE)) {
      node.add(new Node("replace").add(r.consume()))
    } else {
      node.add(r.consume(Keyword.INSERT))
      if (r.peekIf(Keyword.OR)) {
        node.add(r.consume())
        node.add(this.conflictAction(r))
      }
    }
    node.add(r.consume(Keyword.INTO))
    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }
    return node
  }

  private updateClause(r: TokenReader, withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.UPDATE))
    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }
    return node
  }

  private deleteClause(r: TokenReader, withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.DELETE))
    node.add(r.consume(Keyword.FROM))
    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }
    return node
  }
    
  private selectClause(r: TokenReader, withNode?: Node) {
    const node = new Node("select")
    if (withNode != null) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.SELECT))

    let depth = 0
    while (r.token() &&
      !r.peekIf(TokenType.Delimiter) &&
      (depth == 0 && !r.peekIf(TokenType.RightParen))
    ) {
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        depth++
      } else if (r.peekIf(TokenType.RightParen)) {
        node.add(r.consume())
        depth--
      } else {
        node.add(r.consume())
      }
    }
    return node
  }

  private withClause(r: TokenReader) {
    const node = new Node("with")
    node.add(r.consume(Keyword.WITH))

    if (r.peekIf(Keyword.RECURSIVE)) {
      node.add(new Node("recursive").add(r.consume()))
    }

    while (r.token()) {
      node.add(this.identifier(r, "name"))
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        while (r.token()) {
          node.add(this.identifier(r, "column"))
          if (r.peekIf(TokenType.Comma)) {
            node.add(r.consume())
          } else {
            break
          }
        }
        node.add(r.consume(TokenType.RightParen))
      }

      node.add(r.consume(Keyword.AS))

      if (r.peekIf(Keyword.NOT)) {
        node.add(new Node("not materialized").add(
          r.consume(), 
          r.consume(Keyword.MATERIALIZED)
        ))
      } else if (r.peekIf(Keyword.MATERIALIZED)) {
        node.add(new Node("materialized").add(r.token(-1)))
      }
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.selectClause(r))
      node.add(r.consume(TokenType.RightParen))

      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    }
    return node
  }

  private parseName(r: TokenReader, stmt: Node) {
    const nameNode = this.identifier(r, "name")
    stmt.add(nameNode)
    if (r.peekIf(TokenType.Dot)) {
      stmt.add(r.consume())
      nameNode.name = "schema_name"
      stmt.add(this.identifier(r, "name"))
    }
  }

  private tableColumn(r: TokenReader) {
    const node = new Node("column")
    node.add(this.identifier(r, "name"))

    if (
      r.peekIf(TokenType.QuotedIdentifier) ||
      r.peekIf(TokenType.Identifier) ||
      r.peekIf(TokenType.QuotedValue)
    ) {
      node.add(this.dataType(r))
    }

    while (
      r.token() &&
      !r.peekIf(TokenType.Delimiter) &&
      !r.peekIf(TokenType.RightParen) &&
      !r.peekIf(TokenType.Comma)
    ) {
      node.add(this.columnConstraint(r))
    }

    return node
  }

  private columnConstraint(r: TokenReader) {
    const node = new Node("")
    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.add(r.consume())
      node.add(this.identifier(r, "name"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      node.add(r.consume())
      node.add(r.consume(Keyword.KEY))
      node.name = "primary key"

      if (r.peekIf(Keyword.ASC)) {
        node.add(new Node("asc").add(r.consume()))
      } else if (r.peekIf(Keyword.DESC)) {
        node.add(new Node("desc").add(r.consume()))
      }
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction(r))
      }
      if (r.peekIf(Keyword.AUTOINCREMENT)) {
        node.add(new Node("autoincrement").add(r.consume()))
      }
    } else if (r.peekIf(Keyword.NOT)) {
      node.add(r.consume())
      node.add(r.consume(Keyword.NULL))
      node.name = "not null"
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction(r))
      }
    } else if (r.peekIf(Keyword.NULL)) {
      node.add(r.consume())
      node.name = "null"
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction(r))
      }
    } else if (r.peekIf(Keyword.UNIQUE)) {
      node.add(r.consume())
      node.name = "unique"
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction(r))
      }
    } else if (r.peekIf(Keyword.CHECK)) {
      node.add(r.consume())
      node.name = "check"
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.expression(r))
      node.add(r.consume(TokenType.RightParen))
    } else if (r.peekIf(Keyword.DEFAULT)) {
      node.add(r.consume())
      node.name = "default"
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        node.add(this.expression(r))
        node.add(r.consume(TokenType.RightParen))
      } else {
        node.add(this.expression(r))
      }
    } else if (r.peekIf(Keyword.COLLATE)) {
      node.add(r.consume())
      node.name = "collate"
      node.add(this.identifier(r, "collate_name"))
    } else if (r.peekIf(Keyword.REFERENCES)) {
      node.add(r.consume())
      node.name = "references"
      node.add(this.identifier(r, "table_name"))
      node.add(r.consume(TokenType.LeftParen))
      while (r.token()) {
        node.add(this.identifier(r, "column_name"))
        if (r.peekIf(TokenType.Comma)) {
          node.add(r.consume())
        } else {
          break
        }
      }
      node.add(r.consume(TokenType.RightParen))
    } else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
      node.name = "generated always"
      if (r.peekIf(Keyword.GENERATED)) {
        node.add(r.consume(), r.consume(Keyword.ALWAYS))
      }
      node.add(r.consume(Keyword.AS))
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.expression(r))
      node.add(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.STORED)) {
        node.add(new Node("stored").add(r.consume()))
      } else if (r.peekIf(Keyword.VIRTUAL)) {
        node.add(new Node("virtual").add(r.consume()))
      }
    } else {
      throw r.createParseError()
    }

    return node
  }

  private tableConstraint(r: TokenReader) {
    const node = new Node("constraint")

    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.add(r.consume())
      const nameNode = this.identifier(r, "name")
      node.value = nameNode.value
      node.add(nameNode)
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const childNode = new Node("primary key")
      childNode.add(r.consume())
      childNode.add(r.consume(Keyword.KEY))
      childNode.add(r.consume(TokenType.LeftParen))
      while (r.token()) {
        childNode.add(this.indexColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          childNode.add(r.consume())
        } else {
          break
        }
      }
      childNode.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        childNode.add(this.conflictAction(r))
      }
      node.add(childNode)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const childNode = new Node("unique")
      childNode.add(r.consume())
      childNode.add(r.consume(TokenType.LeftParen))
      while (r.token()) {
        childNode.add(this.indexColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          childNode.add(r.consume())
        } else {
          break
        }
      }
      childNode.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        childNode.add(this.conflictAction(r))
      }
      node.add(childNode)
    } else if (r.peekIf(Keyword.CHECK)) {
      const childNode = new Node("check")
      childNode.add(r.consume())
      childNode.add(r.consume(TokenType.LeftParen))
      childNode.add(this.expression(r))
      childNode.add(r.consume(TokenType.RightParen))
      node.add(childNode)
    } else if (r.peekIf(Keyword.FOREIGN)) {
      const childNode = new Node("foreign key")
      childNode.add(r.consume())
      childNode.add(r.consume(Keyword.KEY))
      childNode.add(r.consume(TokenType.LeftParen))
      childNode.add(this.identifier(r, "column_name"))
      while (r.token()) {
        childNode.add(this.identifier(r, "column_name"))
        if (r.peekIf(TokenType.Comma)) {
          childNode.add(r.consume())
        } else {
          break
        }
      }
      childNode.add(r.consume(TokenType.RightParen))
      node.add(childNode)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private dataType(r: TokenReader) {
    const node = new Node("type")

    const nameNode = new Node("name")
    let identifier = this.identifier(r, "")
    nameNode.add(...identifier.children)
    nameNode.value = identifier.value
    while (
      r.peekIf(TokenType.QuotedIdentifier) ||
      r.peekIf(TokenType.QuotedValue) ||
      r.peekIf(TokenType.Identifier)
    ) {
      identifier = this.identifier(r, "")
      nameNode.add(...identifier.children)
      nameNode.value = " " + identifier.value
    }
    node.add(nameNode)

    if (r.peekIf(TokenType.LeftParen)) {
      node.add(r.consume())
      node.add(this.numberValue(r, "length"))
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
        node.add(this.numberValue(r, "scale"))
      }
      node.add(r.consume(TokenType.RightParen))
    }
    return node
  }

  private conflictAction(r: TokenReader) {
    const node = new Node("")
    if (r.peekIf(Keyword.ON)) {
      node.add(r.consume())
      node.add(r.consume(Keyword.CONFLICT))
    }
    if (r.peekIf(Keyword.ROLLBACK)) {
      node.name = "rollback"
      node.add(r.consume())
    } else if (r.peekIf(Keyword.ABORT)) {
      node.name = "abort"
      node.add(r.consume())
    } else if (r.peekIf(Keyword.FAIL)) {
      node.name = "fail"
      node.add(r.consume())
    } else if (r.peekIf(Keyword.IGNORE)) {
      node.name = "ignore"
      node.add(r.consume())
    } else if (r.peekIf(Keyword.REPLACE)) {
      node.name = "replace"
      node.add(r.consume())
    } else {
      throw r.createParseError()
    }
    return node
  }

  private indexColumn(r: TokenReader) {
    const node = new Node("index_column")
    const mark = r.pos
    const expressionNode = this.expression(r)
    if (expressionNode.children.length === 1) {
      r.pos = mark
      node.add(this.identifier(r, "name"))
    } else {
      node.add(expressionNode)
    }
    if (r.peekIf(Keyword.ASC)) {
      node.add(new Node("asc").add(r.consume()))
    } else if (r.peekIf(Keyword.DESC)) {
      node.add(new Node("desc").add(r.consume()))
    }
    return node
  }

  private pragmaValue(r: TokenReader) {
    const node = new Node("pragma_value")
    if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
      const token1 = r.consume()
      node.add(token1)
      const token2 = r.consume(TokenType.Number)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else if (r.peekIf(TokenType.Number)) {
      const token = r.consume()
      node.add(token)
      node.value = new Decimal(token.text).toString()
    } else if (r.peekIf(TokenType.String) || r.peekIf(TokenType.QuotedValue)) {
      const token = r.consume()
      node.add(token)
      node.value = dequote(token.text)
    } else if (r.peekIf(TokenType.Identifier)) {
      const token = r.consume()
      node.add(token)
      node.value = token.text
    } else {
      throw r.createParseError()
    }
    return node
  }

  private identifier(r: TokenReader, name: string) {
    const node = new Node(name)
    if (r.peekIf(TokenType.QuotedIdentifier)) {
      node.add(r.consume())
      node.value = dequote(r.token(-1).text)
    } else if (r.peekIf(TokenType.QuotedValue)) {
      node.add(r.consume())
      node.value = dequote(r.token(-1).text)
    } else if (r.peekIf(TokenType.String)) {
      node.add(r.consume())
      node.value = dequote(r.token(-1).text)
    } else if (r.peekIf(TokenType.Identifier)) {
      node.add(r.consume())
      node.value = r.token(-1).text
    } else {
      throw r.createParseError()
    }
    return node
  }

  private numberValue(r: TokenReader, name: string) {
    const node = new Node(name)
    if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
      const token1 = r.consume()
      node.add(token1)
      const token2 = r.consume(TokenType.Number)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else {
      const token = r.consume(TokenType.Number)
      node.add(token)
      node.value = new Decimal(token.text).toString()
    }
    return node
  }

  private expression(r: TokenReader) {
    const node = new Node("expression")
    let depth = 0
    while (r.token() &&
      (depth == 0 && !r.peekIf(TokenType.Comma)) &&
      (depth == 0 && !r.peekIf(TokenType.RightParen)) &&
      (depth == 0 && !r.peekIf(Keyword.AS)) &&
      (depth == 0 && !r.peekIf(Keyword.ASC)) &&
      (depth == 0 && !r.peekIf(Keyword.DESC)) &&
      !r.peekIf(TokenType.Delimiter)
    ) {
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        depth++
      } else if (r.peekIf(TokenType.RightParen)) {
        node.add(r.consume())
        depth--
      } else {
        node.add(r.consume())
      }
    }
    return node
  }
}
