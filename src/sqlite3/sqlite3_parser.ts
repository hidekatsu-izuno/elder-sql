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

    while (r.peek()) {
      try {
        if (r.peekIf(TokenType.SemiColon) || r.peekIf(TokenType.Eof)) {
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

    if (r.peek() != null) {
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
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), {
        preskips: token.preskips, 
        postskips: token.postskips,
        location: token.location,
      })
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

          const location = new SourceLocation()
          location.fileName = token.location?.fileName
          location.position = re.lastIndex
          location.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            location.columnNumber = token.location?.columnNumber + location.position
          }

          argTokens.push(new Token(type, m[0], {
            location
          }))
          pos = re.lastIndex
        }
      }

      let skips = []
      for (const argToken of argTokens) {
        if (argToken.is(TokenType.WhiteSpace)) {
          skips.push(argToken)
        } else {
          argToken.preskips.push(...skips)
          skips = []
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    if (r.peekIf(TokenType.SemiColon)) {
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
          stmt = this.insertStatement(r, withNode)
        } else if (r.peekIf(Keyword.UPDATE)) {
          stmt = this.updateStatement(r, withNode)
        } else if (r.peekIf(Keyword.DELETE)) {
          stmt = this.deleteStatement(r, withNode)
        } else if (r.peekIf(Keyword.SELECT)) {
          stmt = this.selectStatement(r, withNode)
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
        while (!r.peek().eos) {
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
    const node = new Node("create table statement")
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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    if (virtual) {
      node.add(r.consume(Keyword.USING))

      const moduleNode = new Node("module")
      moduleNode.add(this.identifier(r, "module name"))
      if (r.peekIf(TokenType.LeftParen)) {
        moduleNode.add(r.consume())
        do {
          const moduleArg = new Node("module arg")
          do {
            moduleArg.add(r.consume())
          } while (!r.peek().eos
            && !r.peekIf(TokenType.RightParen)
            && !r.peekIf(TokenType.Comma)
          )
          moduleNode.add(moduleArg)

          if (r.peekIf(TokenType.Comma)) {
            moduleNode.add(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        moduleNode.add(r.consume(TokenType.RightParen))
      }
      node.add(moduleNode)
    } else if (r.peekIf(TokenType.LeftParen)) {
      node.add(r.consume())
      do {
        node.add(this.tableColumn(r))

        do {
          node.add(this.tableConstraint(r))
        } while (!r.peek().eos
          && !r.peekIf(TokenType.RightParen)
          && !r.peekIf(TokenType.Comma)
        )

        if (r.peekIf(TokenType.Comma)) {
          node.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      node.add(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.WITHOUT)) {
        node.add(new Node("without rowid").add(
          r.consume(), 
          r.consume(Keyword.ROWID)
        ))
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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    node.add(r.consume(Keyword.AS))

    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("columns")
      columns.add(r.consume())
      do {
        columns.add(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          columns.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.add(r.consume(TokenType.RightParen))
      node.add(columns)
    }

    const body = new Node("body")
    body.add(this.selectClause(r))
    node.add(body)

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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    if (r.peekIf(Keyword.BEFORE)) {
      node.add(new Node("before").add(r.consume()))
    } else if (r.peekIf(Keyword.AFTER)) {
      node.add(new Node("after").add(r.consume()))
    } else if (r.peekIf(Keyword.INSTEAD)) {
      node.add(new Node("instead of").add(
        r.consume(),
        r.consume(Keyword.OF)
      ))
    }

    if (r.peekIf(Keyword.DELETE)) {
      node.add(new Node("delete").add(r.consume()))
    } else if (r.peekIf(Keyword.INSERT)) {
      node.add(new Node("insert").add(r.consume()))
    } else if (r.peekIf(Keyword.UPDATE)) {
      const updateNode = new Node("update").add(r.consume())
      if (r.peekIf(Keyword.OF)) {
        updateNode.add(r.consume())
        do {
          updateNode.add(this.identifier(r, "column name"))
          if (r.peekIf(TokenType.Comma)) {
            updateNode.add(r.consume())
          } else {
            break
          }
        } while(!r.peek().eos)
      }
      node.add(updateNode)
    }

    node.add(r.consume(Keyword.ON))
    node.add(this.identifier(r, "target object name"))

    if (r.peekIf(Keyword.FOR)) {
      node.add(new Node("for each row").add(
        r.consume(),
        r.consume(Keyword.EACH),
        r.consume(Keyword.ROW),
      ))
    }

    if (r.peekIf(Keyword.WHEN)) {
      const whenNode = new Node("when").add(r.consume())
      node.add(this.expression(r))
      node.add(whenNode)
    }

    const bodyNode = new Node("body")
    bodyNode.add(r.consume(Keyword.BEGIN))
    let withNode
    if (r.peekIf(Keyword.WITH)) {
      withNode = this.withClause(r)
    }
    if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
      bodyNode.add(this.insertStatement(r, withNode))
    } else if (r.peekIf(Keyword.UPDATE)) {
      bodyNode.add(this.updateStatement(r, withNode))
    } else if (r.peekIf(Keyword.DELETE)) {
      bodyNode.add(this.deleteStatement(r, withNode))
    } else if (r.peekIf(Keyword.SELECT)) {
      bodyNode.add(this.selectStatement(r, withNode))
    } else {
      throw r.createParseError()
    }
    bodyNode.add(r.consume(Keyword.END))
    node.add(bodyNode)

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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    node.add(r.consume(Keyword.ON))
    node.add(this.identifier(r, "target object name"))

    node.add(r.consume(TokenType.LeftParen))
    do {
      node.add(this.indexColumn(r))
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    node.add(r.consume(TokenType.RightParen))

    if (r.peekIf(Keyword.WHERE)) {
      node.add(this.whereClause(r))
    }

    return node
  }

  private alterTableStatement(r: TokenReader) {
    const node = new Node("alter table")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
      node.add(new Node("rename object").add(
        r.consume(),
        r.consume(),
        this.identifier(r, "target object name")
      ))
    } else  if (r.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
      node.add(new Node("rename column").add(
        r.consume(),
        r.consume(),
        this.identifier(r, "column name"),
        r.consume(Keyword.TO),
        this.identifier(r, "target column name")
      ))
    } else if (r.peekIf(Keyword.ADD)) {
      const child = new Node("add column").add(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        child.add(r.consume())
      }
      child.add(this.tableColumn(r))
      node.add(child)
    } else if (r.peekIf(Keyword.DROP)) {
      const child = new Node("drop column").add(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        child.add(r.consume())
      }
      child.add(this.identifier(r, "column name"))
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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private attachDatabaseStatement(r: TokenReader) {
    const node = new Node("attach database")
    node.add(r.consume(Keyword.ATTACH))
    node.add(r.consume(Keyword.DATABASE))
    node.add(this.expression(r))
    node.add(r.consume(Keyword.AS))
    node.add(this.identifier(r, "database name"))
    return node
  }

  private detachDatabaseStatement(r: TokenReader) {
    const node = new Node("detach database")
    node.add(r.consume(Keyword.DETACH))
    node.add(r.consume(Keyword.DATABASE))
    node.add(this.identifier(r, "database name"))
    return node
  }

  private analyzeStatement(r: TokenReader) {
    const node = new Node("analyze")
    node.add(r.consume(Keyword.ANALYZE))

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private reindexStatement(r: TokenReader) {
    const node = new Node("reindex")
    node.add(r.consume(Keyword.REINDEX))
    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))
    return node
  }

  private vacuumStatement(r: TokenReader) {
    const node = new Node("vacuum")
    node.add(r.consume(Keyword.VACUUM))

    if (r.peek() && !r.peekIf(Keyword.TO)) {
      node.add(this.identifier(r, "schema name"))
    }
    if (r.peekIf(Keyword.TO)) {
      node.add(r.consume())
      node.add(this.stringValue(r, "file name"))
    }
    return node
  }

  private pragmaStatement(r: TokenReader) {
    const node = new Node("pragma")
    node.add(r.consume(Keyword.PRAGMA))

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "pragma name"))

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
    node.add(this.identifier(r, "savepoint name"))
    return node
  }

  private releaseSavepointStatement(r: TokenReader) {
    const node = new Node("release savepoint")
    node.add(r.consume(Keyword.RELEASE))
    if (r.peekIf(Keyword.SAVEPOINT)) {
      node.add(r.consume())
    }
    node.add(this.identifier(r, "savepoint name"))
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
      node.add(this.identifier(r, "savepoint name"))
    }
    return node
  }

  private insertStatement(r: TokenReader, withNode?: Node) {
    const node = new Node("insert statement")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.insertClause(r))
    return node
  }

  private insertClause(r: TokenReader) {
    const node = new Node("insert clause")
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

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))
    
    if (r.peekIf(Keyword.AS)) {
      node.add(r.consume())
      node.add(this.identifier(r, "object alias"))
    }

    if (r.peekIf(TokenType.LeftParen)) {
      const child = new Node("columns").add(r.consume())
      do {
        child.add(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.RightParen)) {
          break
        } else {
          child.add(r.consume(TokenType.Comma))
        }
      } while (!r.peek().eos)
      child.add(r.consume(TokenType.RightParen))
      node.add(child)
    }

    if (r.peekIf(Keyword.WITH)) {
      let withNode = this.withClause(r)
      node.add(this.selectStatement(r, withNode))
    } else if (r.peekIf(Keyword.SELECT)) {
      node.add(this.selectStatement(r))
    } else if (r.peekIf(Keyword.DEFAULT)) {
      node.add(new Node("default values").add(
        r.consume(),
        r.consume(Keyword.VALUES),
      ))
    } else {
      const child = new Node("values")
      child.add(r.consume(Keyword.VALUES))
      child.add(r.consume(TokenType.LeftParen))
      do {
        child.add(this.expression(r))
        if (r.peekIf(TokenType.RightParen)) {
          break
        } else {
          child.add(r.consume(TokenType.Comma))
        }
      } while (!r.peek().eos)
      child.add(r.consume(TokenType.RightParen))
    }
    return node
  }

  private updateStatement(r: TokenReader, withNode?: Node) {
    const node = new Node("update statement")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.updateClause(r))
    return node
  }

  private updateClause(r: TokenReader) {
    const node = new Node("update clause")
    node.add(r.consume(Keyword.UPDATE))

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    const setNode = new Node("set").add(r.consume(Keyword.SET))
    do {
      if (r.peekIf(TokenType.LeftParen)) {
        const child = new Node("column names")
        child.add(r.consume())
        do {
          setNode.add(this.identifier(r, "column name"))
          if (r.consume(TokenType.Comma)) {
            child.add(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        child.add(r.consume(TokenType.RightParen))
      } else {
        setNode.add(this.identifier(r, "column name"))
      }
      setNode.add(r.consume({ type: TokenType.Operator, text: "=" }))
      setNode.add(this.expression(r))
      if (r.consume(TokenType.Comma)) {
        setNode.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    node.add(setNode)

    if (r.peekIf(Keyword.FROM)) {
      node.add(this.fromClause(r))
    }
    if (r.peekIf(Keyword.WHERE)) {
      node.add(this.whereClause(r))
    }
    if (r.peekIf(Keyword.RETURNING)) {
      node.add(this.returingClause(r))
    }
    if (r.peekIf(Keyword.ORDER)) {
      node.add(this.orderByClause(r))
    }
    if (r.peekIf(Keyword.LIMIT)) {
      node.add(this.limitClause(r))
    }

    return node
  }

  private deleteStatement(r: TokenReader, withNode?: Node) {
    const node = new Node("delete statement")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.deleteClause(r))
    return node
  }

  private deleteClause(r: TokenReader) {
    const node = new Node("delete clause")
    node.add(r.consume(Keyword.DELETE))
    node.add(r.consume(Keyword.FROM))

    if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    if (r.peekIf(Keyword.WHERE)) {
      const whereNode = new Node("where")
      whereNode.add(r.consume())
      do {
        node.add(r.consume())
      } while (!r.peek().eos
        && !r.peekIf(Keyword.RETURNING)
      )
      node.add(whereNode)
    }
    if (r.peekIf(Keyword.RETURNING)) {
      node.add(this.returingClause(r))
    }
    return node
  }
    
  private selectStatement(r: TokenReader, withNode?: Node) {
    const node = new Node("select statement")
    if (withNode != null) {
      node.add(withNode)
    }
    node.add(this.selectClause(r))
    return node
  }

  private selectClause(r: TokenReader) {
    const node = new Node("select clause")
    if (r.peekIf(Keyword.VALUES)) {
      const child = new Node("values")
      child.add(r.consume(Keyword.VALUES))
      child.add(r.consume(TokenType.LeftParen))
      do {
        child.add(this.expression(r))
        if (r.peekIf(TokenType.RightParen)) {
          break
        } else {
          child.add(r.consume(TokenType.Comma))
        }
      } while (!r.peek().eos)
      child.add(r.consume(TokenType.RightParen))
    } else {
      node.add(r.consume(Keyword.SELECT))

      if (r.peekIf(Keyword.DISTINCT)) {
        node.add(new Node("distinct").add(r.consume()))
      } else if (r.peekIf(Keyword.ALL)) {
        node.add(new Node("all").add(r.consume()))
      }

      node.add(this.selectColumns(r))

      if (r.peekIf(Keyword.FROM)) {
        node.add(this.fromClause(r))
      }
      if (r.peekIf(Keyword.WHERE)) {
        node.add(this.whereClause(r))
      }
      if (r.peekIf(Keyword.GROP)) {
        node.add(this.gropuByClause(r))
      }
      if (r.peekIf(Keyword.HAVING)) {
        node.add(this.havingClause(r))
      }
      if (r.peekIf(Keyword.WINDOW)) {
        node.add(this.windowClause(r))
      }
      if (r.peekIf(Keyword.ORDER)) {
        node.add(this.orderByClause(r))
      }
      if (r.peekIf(Keyword.LIMIT)) {
        node.add(this.limitClause(r))
      }
    }

    return node
  }

  private withClause(r: TokenReader) {
    const node = new Node("with clause")
    node.add(r.consume(Keyword.WITH))

    if (r.peekIf(Keyword.RECURSIVE)) {
      node.add(new Node("recursive").add(r.consume()))
    }

    do {
      const child = new Node("common table")
      child.add(this.identifier(r, "common table name"))
      if (r.peekIf(TokenType.LeftParen)) {
        child.add(r.consume())
        while (r.peek()) {
          child.add(this.identifier(r, "column"))
          if (r.peekIf(TokenType.Comma)) {
            child.add(r.consume())
          } else {
            break
          }
        }
        child.add(r.consume(TokenType.RightParen))
      }

      child.add(r.consume(Keyword.AS))

      if (r.peekIf(Keyword.NOT)) {
        child.add(new Node("not materialized").add(
          r.consume(), 
          r.consume(Keyword.MATERIALIZED)
        ))
      } else if (r.peekIf(Keyword.MATERIALIZED)) {
        child.add(new Node("materialized").add(r.peek(-1)))
      }
      child.add(r.consume(TokenType.LeftParen))
      child.add(this.selectClause(r))
      child.add(r.consume(TokenType.RightParen))
      node.add(child)

      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)

    return node
  }

  private selectColumns(r: TokenReader) {
    const node = new Node("select columns") 
    do {
      const columNode = new Node("select column")
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        const child = new Node("all column")
        child.add(r.consume())
        columNode.add(child)
      } else if (r.peekIf(TokenType.Identifier, TokenType.Dot, { type: TokenType.Operator, text: "*" })) {
        const child = new Node("all column")
        child.add(this.identifier(r, "schema name"))
        child.add(r.consume())
        child.add(r.consume())
        columNode.add(child)
      } else {
        columNode.add(this.expression(r))
        if (r.peekIf(Keyword.AS)) {
          columNode.add(r.consume())
          columNode.add(this.identifier(r, "column alias"))
        } else if (!r.peekIf(TokenType.Comma)) {
          columNode.add(this.identifier(r, "column alias"))
        }
      }
      node.add(columNode)
      if (r.consume(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private fromClause(r: TokenReader) {
    //TODO
    const node = new Node("from clause")
    node.add(r.consume(Keyword.FROM))
    do {
      node.add(r.consume())
    } while (!r.peek().eos
      && !r.peekIf(Keyword.FROM)
      && !r.peekIf(Keyword.WHERE)
      && !r.peekIf(Keyword.GROUP)
      && !r.peekIf(Keyword.HAVING)
      && !r.peekIf(Keyword.WINDOW)
      && !r.peekIf(Keyword.RETURNING)
      && !r.peekIf(Keyword.ORDER)
      && !r.peekIf(Keyword.LIMIT)
    )
    return node
  }

  private whereClause(r: TokenReader) {
    const node = new Node("where clause")
    node.add(r.consume(Keyword.WHERE))
    node.add(this.expression(r))
    return node
  }

  private gropuByClause(r: TokenReader) {
    const node = new Node("group by clause")
    node.add(r.consume(Keyword.GROUP))
    node.add(r.consume(Keyword.BY))
    do {
      node.add(this.expression(r))
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while(!r.peek().eos)
    return node
  }

  private havingClause(r: TokenReader) {
    const node = new Node("having clause")
    node.add(r.consume(Keyword.HAVING))
    node.add(this.expression(r))
    return node
  }

  private windowClause(r: TokenReader) {
    const node = new Node("window clause")
    node.add(r.consume(Keyword.WINDOW))
    do {
      node.add(this.identifier(r, "window name"))
      node.add(r.consume(Keyword.AS))
      if (!r.peekIf(Keyword.PARTITION)) {
        node.add(this.identifier(r, "base window name"))
      }
      if (r.peekIf(Keyword.PARTITION)) {
        node.add(this.partitionByClause(r))
      }
      if (r.peekIf(Keyword.ORDER)) {
        node.add(this.orderByClause(r))
      }
      if (r.peekIf(Keyword.RANGE)) {
        node.add(new Node("range").add(r.consume()))
      } else if (r.peekIf(Keyword.ROWS)) {
        node.add(new Node("rows").add(r.consume()))
      } else if (r.peekIf(Keyword.GROUPS)) {
        node.add(new Node("groups").add(r.consume()))
      }
      const frame = new Node("frame")
      if (r.peekIf(Keyword.CURRENT)) {
        frame.add(new Node("current row").add(
          r.consume(),
          r.consume(Keyword.ROW),
        ))
      } else if (r.peekIf(Keyword.UNBOUNDED)) {
        frame.add(new Node("unbounded preceding").add(
          r.consume(),
          r.consume(Keyword.PRECEDING),
        ))
      } else if (r.peekIf(Keyword.BETWEEN)) {
        const betweenFromNode = new Node("between from")
        betweenFromNode.add(r.consume())
        if (r.peekIf(Keyword.CURRENT)) {
          betweenFromNode.add(new Node("current row").add(
            r.consume(),
            r.consume(Keyword.ROW),
          ))
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          betweenFromNode.add(new Node("unbounded preceding").add(
            r.consume(),
            r.consume(Keyword.PRECEDING),
          ))
        } else {
          const expressionNode = this.expression(r)
          if (r.peekIf(Keyword.PRECEDING)) {
            betweenFromNode.add(new Node("preceding").add(
              expressionNode,
              r.consume(),
            ))
          } else if (r.peekIf(Keyword.FOLLOWING)) {
            betweenFromNode.add(new Node("following").add(
              expressionNode,
              r.consume(),
            ))
          } else {
            throw r.createParseError()
          }
        }
        frame.add(betweenFromNode)
        frame.add(r.consume())
        const betweenToNode = new Node("between to")
        betweenToNode.add(r.consume())
        if (r.peekIf(Keyword.CURRENT)) {
          betweenToNode.add(new Node("current row").add(
            r.consume(),
            r.consume(Keyword.ROW),
          ))
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          betweenToNode.add(new Node("unbounded following").add(
            r.consume(),
            r.consume(Keyword.FOLLOWING),
          ))
        } else {
          const expressionNode = this.expression(r)
          if (r.peekIf(Keyword.PRECEDING)) {
            betweenToNode.add(new Node("preceding").add(
              expressionNode,
              r.consume(),
            ))
          } else if (r.peekIf(Keyword.FOLLOWING)) {
            betweenToNode.add(new Node("following").add(
              expressionNode,
              r.consume(),
            ))
          } else {
            throw r.createParseError()
          }
        }
        frame.add(betweenToNode)
      } else {
        frame.add(new Node("preceding").add(
          this.expression(r),
          r.consume(Keyword.PRECEDING),
        ))
      }
      node.add(frame)
      if (r.peekIf(Keyword.EXCLUDE)) {
        const excludeNode = new Node("exclude")
        excludeNode.add(r.consume())
        if (r.peekIf(Keyword.NO)) {
          excludeNode.add(new Node("no others").add(
            r.consume(),
            r.consume(Keyword.OTHERS),
          ))
        } else if (r.peekIf(Keyword.CURRENT)) {
          excludeNode.add(new Node("current row").add(
            r.consume(),
            r.consume(Keyword.ROW),
          ))
        } else if (r.peekIf(Keyword.GROUP)) {
          excludeNode.add(new Node("group").add(r.consume()))
        } else if (r.peekIf(Keyword.TIES)) {
          excludeNode.add(new Node("ties").add(r.consume()))
        } else {
          throw r.createParseError()
        }
        node.add(excludeNode)
      }
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private partitionByClause(r: TokenReader) {
    const node = new Node("partition by clause")
    node.add(r.consume(Keyword.PARTITION))
    node.add(r.consume(Keyword.BY))
    do {
      node.add(this.expression(r))
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while(!r.peek().eos)
    return node
  }

  private returingClause(r: TokenReader) {
    const node = new Node("returning clause")
    node.add(r.consume(Keyword.RETURNING))
    node.add(this.selectColumns(r))
    return node
  }

  private orderByClause(r: TokenReader) {
    const node = new Node("order by clause")
    node.add(r.consume(Keyword.ORDER))
    node.add(r.consume(Keyword.BY))
    do {
      node.add(this.expression(r))
      if (r.peekIf(Keyword.COLLATE)) {
        node.add(this.identifier(r, "collation name"))
      }
      if (r.peekIf(Keyword.ASC)) {
        node.add(new Node("asc").add(r.consume()))
      } else if (r.peekIf(Keyword.DESC)) {
        node.add(new Node("desc").add(r.consume()))
      }
      if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
        node.add(new Node("nulls first").add(r.consume(), r.consume()))
      } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
        node.add(new Node("nulls last").add(r.consume(), r.consume()))
      }
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private limitClause(r: TokenReader) {
    const node = new Node("limit clause")
    node.add(r.consume(Keyword.LIMIT))
    const limit = new Node("limit")
    limit.add(this.expression(r))
    node.add(limit)
    if (r.peekIf(Keyword.OFFSET)) {
      const offset = new Node("offset")
      offset.add(r.consume())
      offset.add(this.expression(r))
      node.add(offset)
    } else if (r.peekIf(TokenType.Comma)) {
      limit.name = "offset"
      node.add(r.consume())
      const offset = new Node("offset")
      offset.add(this.expression(r))
      node.add(offset)
    }
    return node
  }

  private tableColumn(r: TokenReader) {
    const node = new Node("column")
    node.add(this.identifier(r, "column name"))

    if (r.peekIf(TokenType.Identifier)
      || r.peekIf(TokenType.QuotedIdentifier)
      || r.peekIf(TokenType.QuotedValue)
    ) {
      node.add(this.dataType(r, "column type"))
    }

    while (r.peekIf(Keyword.CONSTRAINT)
      || r.peekIf(Keyword.PRIMARY)
      || r.peekIf(Keyword.NOT)
      || r.peekIf(Keyword.NULL)
      || r.peekIf(Keyword.UNIQUE)
      || r.peekIf(Keyword.CHECK)
      || r.peekIf(Keyword.DEFAULT)
      || r.peekIf(Keyword.COLLATE)
      || r.peekIf(Keyword.REFERENCES)
      || r.peekIf(Keyword.GENERATED)
      || r.peekIf(Keyword.AS)
    ) {
      node.add(this.columnConstraint(r))
    }

    return node
  }

  private columnConstraint(r: TokenReader) {
    const node = new Node("column constraint")
    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.add(r.consume())
      node.add(this.identifier(r, "constraint name"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const nPkey = new Node("primary key")
      nPkey.add(r.consume())
      nPkey.add(r.consume(Keyword.KEY))

      if (r.peekIf(Keyword.ASC)) {
        nPkey.add(new Node("asc").add(r.consume()))
      } else if (r.peekIf(Keyword.DESC)) {
        nPkey.add(new Node("desc").add(r.consume()))
      }
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        nPkey.add(this.conflictAction(r))
      }
      if (r.peekIf(Keyword.AUTOINCREMENT)) {
        nPkey.add(new Node("autoincrement").add(r.consume()))
      }
      node.add(nPkey)
    } else if (r.peekIf(Keyword.NOT)) {
      const nNotNull = new Node("not null")
      nNotNull.add(r.consume())
      nNotNull.add(r.consume(Keyword.NULL))
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        nNotNull.add(this.conflictAction(r))
      }
      node.add(nNotNull)
    } else if (r.peekIf(Keyword.NULL)) {
      const nNull = new Node("null")
      nNull.add(r.consume())
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        nNull.add(this.conflictAction(r))
      }
      node.add(nNull)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("unique")
      unique.add(r.consume())
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        unique.add(this.conflictAction(r))
      }
      node.add(unique)
    } else if (r.peekIf(Keyword.CHECK)) {
      const check = new Node("check")
      check.add(r.consume())
      check.add(r.consume(TokenType.LeftParen))
      check.add(this.expression(r))
      check.add(r.consume(TokenType.RightParen))
      node.add(check)
    } else if (r.peekIf(Keyword.DEFAULT)) {
      const def = new Node("default")
      def.add(r.consume())
      if (r.peekIf(TokenType.LeftParen)) {
        def.add(r.consume())
        def.add(this.expression(r))
        def.add(r.consume(TokenType.RightParen))
      } else {
        def.add(this.expression(r))
      }
      node.add(def)
    } else if (r.peekIf(Keyword.COLLATE)) {
      const collate = new Node("collate")
      collate.add(r.consume())
      collate.add(this.identifier(r, "collate name"))
      node.add(collate)
    } else if (r.peekIf(Keyword.REFERENCES)) {
      const refs = new Node("references")
      refs.add(r.consume())
      refs.add(this.identifier(r, "object name"))
      refs.add(r.consume(TokenType.LeftParen))
      do {
        refs.add(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          refs.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      refs.add(r.consume(TokenType.RightParen))
      node.add(refs)
    } else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
      const genAlways = new Node("generated always")
      if (r.peekIf(Keyword.GENERATED)) {
        genAlways.add(r.consume())
        genAlways.add(r.consume(Keyword.ALWAYS))
      }
      genAlways.add(r.consume(Keyword.AS))
      genAlways.add(r.consume(TokenType.LeftParen))
      genAlways.add(this.expression(r))
      genAlways.add(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.STORED)) {
        genAlways.add(new Node("stored").add(r.consume()))
      } else if (r.peekIf(Keyword.VIRTUAL)) {
        genAlways.add(new Node("virtual").add(r.consume()))
      }
      node.add(genAlways)
    } else {
      throw r.createParseError()
    }

    return node
  }

  private tableConstraint(r: TokenReader) {
    const node = new Node("table constraint")

    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.add(r.consume())
      node.add(this.identifier(r, "constraint name"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const primaryKey = new Node("primary key")
      primaryKey.add(r.consume())
      primaryKey.add(r.consume(Keyword.KEY))
      primaryKey.add(r.consume(TokenType.LeftParen))
      do  {
        primaryKey.add(this.indexColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          primaryKey.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      primaryKey.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        primaryKey.add(this.conflictAction(r))
      }
      node.add(primaryKey)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("unique")
      unique.add(r.consume())
      unique.add(r.consume(TokenType.LeftParen))
      do {
        unique.add(this.indexColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          unique.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      unique.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        unique.add(this.conflictAction(r))
      }
      node.add(unique)
    } else if (r.peekIf(Keyword.CHECK)) {
      const check = new Node("check")
      check.add(r.consume())
      check.add(r.consume(TokenType.LeftParen))
      check.add(this.expression(r))
      check.add(r.consume(TokenType.RightParen))
      node.add(check)
    } else if (r.peekIf(Keyword.FOREIGN)) {
      const foreignKey = new Node("foreign key")
      foreignKey.add(r.consume())
      foreignKey.add(r.consume(Keyword.KEY))
      foreignKey.add(r.consume(TokenType.LeftParen))
      foreignKey.add(this.identifier(r, "column name"))
      do {
        foreignKey.add(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          foreignKey.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      foreignKey.add(r.consume(TokenType.RightParen))
      node.add(foreignKey)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private dataType(r: TokenReader, name: string) {
    const node = new Node(name)

    const nameNode = this.identifier(r, "type name")
    while (r.peekIf(TokenType.Identifier)
      || r.peekIf(TokenType.QuotedIdentifier)
      || r.peekIf(TokenType.QuotedValue)
    ) {
      const identifier = this.identifier(r, "")
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
    const node = new Node("index column")
    const mark = r.pos
    const expressionNode = this.expression(r)
    if (expressionNode.children.length === 1) {
      r.pos = mark
      node.add(this.identifier(r, "column name"))
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
    const node = new Node("pragma value")
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
    } else if (r.peekIf(TokenType.Identifier)
      || r.peekIf(TokenType.QuotedIdentifier)
      || r.peekIf(TokenType.QuotedValue)) {
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
    if (r.peekIf(TokenType.Identifier)) {
      node.add(r.consume())
      node.value = r.peek(-1).text
    } else if (r.peekIf(TokenType.QuotedIdentifier)) {
      node.add(r.consume())
      node.value = dequote(r.peek(-1).text)
    } else if (r.peekIf(TokenType.QuotedValue)) {
      node.add(r.consume())
      node.value = dequote(r.peek(-1).text)
    } else if (r.peekIf(TokenType.String)) {
      node.add(r.consume())
      node.value = dequote(r.peek(-1).text)
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

  private stringValue(r: TokenReader, name: string) {
    const node = new Node(name)
    const token = r.consume(TokenType.String)
    node.add(token)
    node.value = dequote(token.text)
    return node
  }

  private expression(r: TokenReader) {
    const node = new Node("expression")
    let depth = 0
    do {
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        depth++
      } else if (r.peekIf(TokenType.RightParen)) {
        node.add(r.consume())
        depth--
      } else {
        node.add(r.consume())
      }
    } while(!r.peek().eos
      && (depth == 0 && !r.peekIf(TokenType.RightParen))
      && (depth == 0 && !r.peekIf(TokenType.Comma))
      && (depth == 0 && !r.peekIf(Keyword.AS))
      && (depth == 0 && !r.peekIf(Keyword.ASC))
      && (depth == 0 && !r.peekIf(Keyword.DESC))
      && (depth == 0 && !r.peekIf(Keyword.PRECEDING))
      && (depth == 0 && !r.peekIf(Keyword.FOLLOWING))
      && (depth == 0 && !r.peekIf(Keyword.FROM))
      && (depth == 0 && !r.peekIf(Keyword.WHERE))
      && (depth == 0 && !r.peekIf(Keyword.GROUP))
      && (depth == 0 && !r.peekIf(Keyword.WINDOW))
      && (depth == 0 && !r.peekIf(Keyword.RETURNING))
      && (depth == 0 && !r.peekIf(Keyword.ORDER))
      && (depth == 0 && !r.peekIf(Keyword.LIMIT))
    )
    return node
  }
}
