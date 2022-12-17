import Decimal from "decimal.js"
import {
  TokenType,
  Token,
  SourceLocation,
  Keyword,
  Operator,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
} from "../parser"
import { dequote } from "../util"
import { Sqlite3Lexer } from "./sqlite3_lexer"

export class Sqlite3Parser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new Sqlite3Lexer(options).lex(input, options.fileName)
    const rootNode = new Sqlite3Parser(tokens, options).parse()
    return rootNode
  }

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Delimiter) || this.peekIf(TokenType.Eof)) {
          root.add(this.consume())
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          root.add(this.statement())
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

    if (this.token() != null) {
      for (let i = this.pos; i < this.tokens.length; i++) {
        root.add(this.tokens[i])
      }
      
      try {
        throw this.createParseError()
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

  private command() {
    const stmt = new Node("command")

    const token = this.consume(TokenType.Command)
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

    if (this.peekIf(TokenType.Delimiter)) {
      stmt.add(this.consume())
    }
    if (this.peekIf(TokenType.Eof)) {
      stmt.add(this.consume())
    }
    return stmt
  }

  private statement(): Node {
    let explain
    let stmt

    try {
      if (this.peekIf(Keyword.EXPLAIN)) {
        explain = new Node("explain")
        explain.add(this.consume())
        if (this.peekIf(Keyword.QUERY)) {
          explain.add(new Node("query plan").add(
            this.consume(), 
            this.consume(Keyword.PLAN)
          ))
        }
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.TEMPORARY) || this.peekIf(Keyword.TEMP)) {
          this.consume()
        }

        if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.createTableStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createViewStatement()
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.createTriggerStatement()
        } else if (
          this.peekIf(Keyword.UNIQUE, Keyword.INDEX) ||
          this.peekIf(Keyword.INDEX)
        ) {
          this.pos = mark
          stmt = this.createIndexStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ALTER)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.alterTableStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.DROP)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.dropTableStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropViewStatement()
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.dropTriggerStatement()
        } else if (this.peekIf(Keyword.INDEX)) {
          this.pos = mark
          stmt = this.dropIndexStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ATTACH, Keyword.DATABASE)) {
        stmt = this.attachDatabaseStatement()
      } else if (this.peekIf(Keyword.DETACH, Keyword.DATABASE)) {
        stmt = this.detachDatabaseStatement()
      } else if (this.peekIf(Keyword.ANALYZE)) {
        stmt = this.analyzeStatement()
      } else if (this.peekIf(Keyword.REINDEX)) {
        stmt = this.reindexStatement()
      } else if (this.peekIf(Keyword.VACUUM)) {
        stmt = this.vacuumStatement()
      } else if (this.peekIf(Keyword.PRAGMA)) {
        stmt = this.pragmaStatement()
      } else if (this.peekIf(Keyword.BEGIN)) {
        stmt = this.beginTransactionStatement()
      } else if (this.peekIf(Keyword.SAVEPOINT)) {
        stmt = this.savepointStatement()
      } else if (this.peekIf(Keyword.RELEASE)) {
        stmt = this.releaseSavepointStatement()
      } else if (this.peekIf(Keyword.COMMIT) || this.peekIf(Keyword.END)) {
        stmt = this.commitTransactionStatement()
      } else if (this.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackTransactionStatement()
      } else {
        let withNode
        if (this.peekIf(Keyword.WITH)) {
          withNode = this.withClause()
        }
        if (this.peekIf(Keyword.INSERT) || this.peekIf(Keyword.REPLACE)) {
          stmt = this.insertClause(withNode)
        } else if (this.peekIf(Keyword.UPDATE)) {
          stmt = this.updateClause(withNode)
        } else if (this.peekIf(Keyword.DELETE)) {
          stmt = this.deleteClause(withNode)
        } else if (this.peekIf(Keyword.SELECT)) {
          stmt = this.selectClause(withNode)
        }
      }

      if (!stmt) {
        throw this.createParseError()
      }
      
      if (explain) {
        stmt = explain.add(stmt)
      }

      if (this.peekIf(TokenType.Delimiter)) {
        stmt.add(this.consume())
      }
      if (this.peekIf(TokenType.Eof)) {
        stmt.add(this.consume())
      }
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (this.token() && !this.peekIf(TokenType.Delimiter)) {
          stmt.add(this.consume())
        }
        if (this.peekIf(TokenType.Delimiter)) {
          stmt.add(this.consume())
        }
        if (this.peekIf(TokenType.Eof)) {
          stmt.add(this.consume())
        }
        err.node = stmt
      }      
      throw err
    }
  }

  private createTableStatement() {
    const node = new Node("create table")
    let virtual = false
    
    node.add(this.consume(Keyword.CREATE))
    if (this.peekIf(Keyword.TEMPORARY) || this.peekIf(Keyword.TEMP)) {
      node.add(new Node("temporary").add(this.consume()))
    } else if (this.peekIf(Keyword.VIRTUAL)) {
      node.add(new Node("virtual").add(this.consume()))
      virtual = true
    }
    node.add(this.consume(Keyword.TABLE))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    if (virtual) {
      node.add(this.consume(Keyword.USING))

      const moduleNode = new Node("module")
      moduleNode.add(this.identifier("name"))
      if (this.peekIf(TokenType.LeftParen)) {
        moduleNode.add(this.consume())
        while (this.token()) {
          const moduleArg = new Node("arg")
          while (
            this.token() &&
            !this.peekIf(TokenType.Comma) &&
            !this.peekIf(TokenType.RightParen)
          ) {
            moduleArg.add(this.consume())
          }
          moduleNode.add(moduleArg)
          if (this.peekIf(TokenType.Comma)) {
            moduleNode.add(this.consume())
          } else {
            break
          }
        }
        moduleNode.add(this.consume(TokenType.RightParen))
      }
      node.add(moduleNode)
    } else if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      node.add(this.tableColumn())

      while (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())

        if (
          !this.peekIf(Keyword.CONSTRAINT) &&
          !this.peekIf(Keyword.PRIMARY) &&
          !this.peekIf(Keyword.NOT) &&
          !this.peekIf(Keyword.NULL) &&
          !this.peekIf(Keyword.UNIQUE) &&
          !this.peekIf(Keyword.CHECK) &&
          !this.peekIf(Keyword.DEFAULT) &&
          !this.peekIf(Keyword.COLLATE) &&
          !this.peekIf(Keyword.REFERENCES) &&
          !this.peekIf(Keyword.GENERATED) &&
          !this.peekIf(Keyword.AS)
        ) {
          node.add(this.tableColumn())
        } else {
          node.add(this.tableConstraint())
          while (this.peekIf(TokenType.Comma)) {
            node.add(this.consume())
            node.add(this.tableConstraint())
          }
          break
        }
      }

      node.add(this.consume(TokenType.RightParen))
      while (this.token() && !this.peekIf(TokenType.Delimiter)) {
        if (this.peekIf(Keyword.WITHOUT)) {
          node.add(new Node("without rowid").add(
            this.consume(), 
            this.consume(Keyword.ROWID)
          ))
        } else {
          node.add(this.consume())
        }
      }
    } else if (this.peekIf(Keyword.AS)) {
      node.add(this.consume())
      node.add(this.selectClause())
    } else {
      throw this.createParseError()
    }

    return node
  }

  private createViewStatement() {
    const node = new Node("create view")

    node.add(this.consume(Keyword.CREATE))
    if (
      this.peekIf(Keyword.TEMPORARY) ||
      this.peekIf(Keyword.TEMP)
    ) {
      node.add(new Node("temporary").add(this.consume()))
    }
    node.add(this.consume(Keyword.VIEW))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    node.add(this.consume(Keyword.AS))

    if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      while (this.token()) {
        node.add(this.identifier("column_name"))
        if (this.peekIf(TokenType.Comma)) {
          node.add(this.consume())
        } else {
          break
        }
      }
      node.add(this.consume(TokenType.RightParen))
    }
    node.add(this.selectClause())

    return node
  }

  private createTriggerStatement() {
    const node = new Node("create trigger")

    node.add(this.consume(Keyword.CREATE))
    if (this.peekIf(Keyword.TEMPORARY) || this.peekIf(Keyword.TEMP)) {
      node.add(new Node("temporary").add(this.consume()))
    }
    node.add(this.consume(Keyword.TRIGGER))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    while (this.token() && !this.peekIf(TokenType.Delimiter)) {
      if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.consume())
        while (this.token() && !this.peekIf(Keyword.END)) {
          node.add(this.consume())
        }
      } else {
        node.add(this.consume())
      }
    }

    return node
  }

  private createIndexStatement() {
    const node = new Node("create index")

    node.add(this.consume(Keyword.CREATE))
    if (this.peekIf(Keyword.UNIQUE)) {
      node.add(new Node("unique").add(this.consume()))
    }
    node.add(this.consume(Keyword.INDEX))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    node.add(this.consume(Keyword.ON))
    node.add(this.identifier("table_name"))

    node.add(this.consume(TokenType.LeftParen))
    while (this.token()) {
      node.add(this.indexColumn())
      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
      } else {
        break
      }
    }
    node.add(this.consume(TokenType.RightParen))

    if (this.peekIf(Keyword.WHERE)) {
      const whereNode = new Node("where")
      whereNode.add(this.consume())
      while (this.token() && !this.peekIf(TokenType.Delimiter)) {
        whereNode.add(this.consume())
      }
      node.add(whereNode)
    }

    return node
  }

  private alterTableStatement() {
    const node = new Node("alter table")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLE))

    if (this.peekIf(Keyword.RENAME, Keyword.TO)) {
      node.add(new Node("rename to").add(
        this.consume(),
        this.consume(),
        this.identifier("table_name")
      ))
    } else  if (this.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
      node.add(new Node("rename column").add(
        this.consume(),
        this.consume(),
        this.identifier("from_column_name"),
        this.consume(Keyword.TO),
        this.identifier("to_column_name")
      ))
    } else if (this.peekIf(Keyword.ADD)) {
      const child = new Node("add column")
      child.add(this.consume())
      if (this.peekIf(Keyword.COLUMN)) {
        child.add(this.consume())
      }
      child.add(this.tableColumn())
      node.add(child)
    } else if (this.peekIf(Keyword.DROP)) {
      const child = new Node("drop column")
      child.add(this.consume())
      if (this.peekIf(Keyword.COLUMN)) {
        child.add(this.consume())
      }
      child.add(this.identifier("column_name"))
      node.add(child)
    } else {
      throw this.createParseError()
    }
    return node
  }

  private dropTableStatement() {
    const node = new Node("drop table")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLE))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private dropViewStatement() {
    const node = new Node("drop view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.VIEW))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private dropTriggerStatement() {
    const node = new Node("drop trigger")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TRIGGER))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private dropIndexStatement() {
    const node = new Node("drop index")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INDEX))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private attachDatabaseStatement() {
    const node = new Node("attach database")
    node.add(this.consume(Keyword.ATTACH))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.expression())
    node.add(this.consume(Keyword.AS))
    node.add(this.identifier("name"))
    return node
  }

  private detachDatabaseStatement() {
    const node = new Node("detach database")
    node.add(this.consume(Keyword.DETACH))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.identifier("name"))
    return node
  }

  private analyzeStatement() {
    const node = new Node("analyze")
    node.add(this.consume(Keyword.ANALYZE))
    this.parseName(node)
    return node
  }

  private reindexStatement() {
    const node = new Node("reindex")
    node.add(this.consume(Keyword.REINDEX))
    this.parseName(node)    
    return node
  }

  private vacuumStatement() {
    const node = new Node("vacuum")
    node.add(this.consume(Keyword.VACUUM))

    if (this.token() && !this.peekIf(Keyword.TO)) {
      node.add(this.identifier("schema_name"))
    }
    while (this.token() && !this.peekIf(TokenType.Delimiter)) {
      node.add(this.consume())
    }
    return node
  }

  private pragmaStatement() {
    const node = new Node("pragma")
    node.add(this.consume(Keyword.PRAGMA))

    this.parseName(node)
    if (this.peekIf(Operator.EQ)) {
      node.add(this.consume())
      node.add(this.pragmaValue())
    } else if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      node.add(this.pragmaValue())
      node.add(this.consume(TokenType.RightParen))
    }
    return node
  }

  private beginTransactionStatement() {
    const node = new Node("begin transaction")

    node.add(this.consume(Keyword.BEGIN))
    if (this.peekIf(Keyword.DEFERRED)) {
      node.add(new Node("deferred").add(this.consume()))
    } else if (this.peekIf(Keyword.IMMEDIATE)) {
      node.add(new Node("immediate").add(this.consume()))
    } else if (this.peekIf(Keyword.EXCLUSIVE)) {
      node.add(new Node("exclusive").add(this.consume()))
    }
    if (this.peekIf(Keyword.TRANSACTION)) {
      node.add(this.consume())
    }

    return node
  }

  private savepointStatement() {
    const node = new Node("savepoint")
    node.add(this.consume(Keyword.SAVEPOINT))
    node.add(this.identifier("name"))
    return node
  }

  private releaseSavepointStatement() {
    const node = new Node("release savepoint")
    node.add(this.consume(Keyword.RELEASE))
    if (this.peekIf(Keyword.SAVEPOINT)) {
      node.add(this.consume())
    }
    node.add(this.identifier("name"))
    return node
  }

  private commitTransactionStatement() {
    const node = new Node("commit transaction")
    if (this.peekIf(Keyword.END)) {
      node.add(this.consume())
    } else {
      node.add(this.consume(Keyword.COMMIT))  
    }
    if (this.peekIf(Keyword.TRANSACTION)) {
      node.add(this.consume())
    }
    return node
  }

  private rollbackTransactionStatement() {
    const node = new Node("rollback transaction")
    node.add(this.consume(Keyword.ROLLBACK))
    if (this.peekIf(Keyword.TRANSACTION)) {
      node.add(this.consume())
    }
    if (this.peekIf(Keyword.TO)) {
      node.add(this.consume())
      if (this.peekIf(Keyword.SAVEPOINT)) {
        node.add(this.consume())
      }
      node.add(this.identifier("name"))
    }
    return node
  }

  private insertClause(withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    if (this.peekIf(Keyword.REPLACE)) {
      node.add(new Node("replace").add(this.consume()))
    } else {
      node.add(this.consume(Keyword.INSERT))
      if (this.peekIf(Keyword.OR)) {
        node.add(this.consume())
        node.add(this.conflictAction())
      }
    }
    node.add(this.consume(Keyword.INTO))
    this.parseName(node)
    
    while (this.token() && !this.peekIf(TokenType.Delimiter)) {
      node.add(this.consume())
    }
    return node
  }

  private updateClause(withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.UPDATE))
    this.parseName(node)
    
    while (this.token() && !this.peekIf(TokenType.Delimiter)) {
      node.add(this.consume())
    }
    return node
  }

  private deleteClause(withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.DELETE))
    node.add(this.consume(Keyword.FROM))
    this.parseName(node)
    
    while (this.token() && !this.peekIf(TokenType.Delimiter)) {
      node.add(this.consume())
    }
    return node
  }
    
  private selectClause(withNode?: Node) {
    const node = new Node("select")
    if (withNode != null) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.SELECT))

    let depth = 0
    while (this.token() &&
      !this.peekIf(TokenType.Delimiter) &&
      (depth == 0 && !this.peekIf(TokenType.RightParen))
    ) {
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        depth++
      } else if (this.peekIf(TokenType.RightParen)) {
        node.add(this.consume())
        depth--
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private withClause() {
    const node = new Node("with")
    node.add(this.consume(Keyword.WITH))

    if (this.peekIf(Keyword.RECURSIVE)) {
      node.add(new Node("recursive").add(this.consume()))
    }

    while (this.token()) {
      node.add(this.identifier("name"))
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        while (this.token()) {
          node.add(this.identifier("column"))
          if (this.peekIf(TokenType.Comma)) {
            node.add(this.consume())
          } else {
            break
          }
        }
        node.add(this.consume(TokenType.RightParen))
      }

      node.add(this.consume(Keyword.AS))

      if (this.peekIf(Keyword.NOT)) {
        node.add(new Node("not materialized").add(
          this.consume(), 
          this.consume(Keyword.MATERIALIZED)
        ))
      } else if (this.peekIf(Keyword.MATERIALIZED)) {
        node.add(new Node("materialized").add(this.token(-1)))
      }
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.selectClause())
      node.add(this.consume(TokenType.RightParen))

      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
      } else {
        break
      }
    }
    return node
  }

  private parseName(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.peekIf(TokenType.Dot)) {
      stmt.add(this.consume())
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private tableColumn() {
    const node = new Node("column")
    node.add(this.identifier("name"))

    if (
      this.peekIf(TokenType.QuotedIdentifier) ||
      this.peekIf(TokenType.Identifier) ||
      this.peekIf(TokenType.QuotedValue)
    ) {
      node.add(this.dataType())
    }

    while (
      this.token() &&
      !this.peekIf(TokenType.Delimiter) &&
      !this.peekIf(TokenType.RightParen) &&
      !this.peekIf(TokenType.Comma)
    ) {
      node.add(this.columnConstraint())
    }

    return node
  }

  private columnConstraint() {
    const node = new Node("")
    if (this.peekIf(Keyword.CONSTRAINT)) {
      node.add(this.consume())
      node.add(this.identifier("name"))
    }
    if (this.peekIf(Keyword.PRIMARY)) {
      node.add(this.consume())
      node.add(this.consume(Keyword.KEY))
      node.name = "primary key"

      if (this.peekIf(Keyword.ASC)) {
        node.add(new Node("asc").add(this.consume()))
      } else if (this.peekIf(Keyword.DESC)) {
        node.add(new Node("desc").add(this.consume()))
      }
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
      if (this.peekIf(Keyword.AUTOINCREMENT)) {
        node.add(new Node("autoincrement").add(this.consume()))
      }
    } else if (this.peekIf(Keyword.NOT)) {
      node.add(this.consume())
      node.add(this.consume(Keyword.NULL))
      node.name = "not null"
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
    } else if (this.peekIf(Keyword.NULL)) {
      node.add(this.consume())
      node.name = "null"
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
    } else if (this.peekIf(Keyword.UNIQUE)) {
      node.add(this.consume())
      node.name = "unique"
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
    } else if (this.peekIf(Keyword.CHECK)) {
      node.add(this.consume())
      node.name = "check"
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.expression())
      node.add(this.consume(TokenType.RightParen))
    } else if (this.peekIf(Keyword.DEFAULT)) {
      node.add(this.consume())
      node.name = "default"
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        node.add(this.expression())
        node.add(this.consume(TokenType.RightParen))
      } else {
        node.add(this.expression())
      }
    } else if (this.peekIf(Keyword.COLLATE)) {
      node.add(this.consume())
      node.name = "collate"
      node.add(this.identifier("collate_name"))
    } else if (this.peekIf(Keyword.REFERENCES)) {
      node.add(this.consume())
      node.name = "references"
      node.add(this.identifier("table_name"))
      node.add(this.consume(TokenType.LeftParen))
      while (this.token()) {
        node.add(this.identifier("column_name"))
        if (this.peekIf(TokenType.Comma)) {
          node.add(this.consume())
        } else {
          break
        }
      }
      node.add(this.consume(TokenType.RightParen))
    } else if (this.peekIf(Keyword.GENERATED) || this.peekIf(Keyword.AS)) {
      node.name = "generated always"
      if (this.peekIf(Keyword.GENERATED)) {
        node.add(this.consume(), this.consume(Keyword.ALWAYS))
      }
      node.add(this.consume(Keyword.AS))
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.expression())
      node.add(this.consume(TokenType.RightParen))

      if (this.peekIf(Keyword.STORED)) {
        node.add(new Node("stored").add(this.consume()))
      } else if (this.peekIf(Keyword.VIRTUAL)) {
        node.add(new Node("virtual").add(this.consume()))
      }
    } else {
      throw this.createParseError()
    }

    return node
  }

  private tableConstraint() {
    const node = new Node("constraint")

    if (this.peekIf(Keyword.CONSTRAINT)) {
      node.add(this.consume())
      const nameNode = this.identifier("name")
      node.value = nameNode.value
      node.add(nameNode)
    }
    if (this.peekIf(Keyword.PRIMARY)) {
      const childNode = new Node("primary key")
      childNode.add(this.consume())
      childNode.add(this.consume(Keyword.KEY))
      childNode.add(this.consume(TokenType.LeftParen))
      while (this.token()) {
        childNode.add(this.indexColumn())
        if (this.peekIf(TokenType.Comma)) {
          childNode.add(this.consume())
        } else {
          break
        }
      }
      childNode.add(this.consume(TokenType.RightParen))
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        childNode.add(this.conflictAction())
      }
      node.add(childNode)
    } else if (this.peekIf(Keyword.UNIQUE)) {
      const childNode = new Node("unique")
      childNode.add(this.consume())
      childNode.add(this.consume(TokenType.LeftParen))
      while (this.token()) {
        childNode.add(this.indexColumn())
        if (this.peekIf(TokenType.Comma)) {
          childNode.add(this.consume())
        } else {
          break
        }
      }
      childNode.add(this.consume(TokenType.RightParen))
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        childNode.add(this.conflictAction())
      }
      node.add(childNode)
    } else if (this.peekIf(Keyword.CHECK)) {
      const childNode = new Node("check")
      childNode.add(this.consume())
      childNode.add(this.consume(TokenType.LeftParen))
      childNode.add(this.expression())
      childNode.add(this.consume(TokenType.RightParen))
      node.add(childNode)
    } else if (this.peekIf(Keyword.FOREIGN)) {
      const childNode = new Node("foreign key")
      childNode.add(this.consume())
      childNode.add(this.consume(Keyword.KEY))
      childNode.add(this.consume(TokenType.LeftParen))
      childNode.add(this.identifier("column_name"))
      while (this.token()) {
        childNode.add(this.identifier("column_name"))
        if (this.peekIf(TokenType.Comma)) {
          childNode.add(this.consume())
        } else {
          break
        }
      }
      childNode.add(this.consume(TokenType.RightParen))
      node.add(childNode)
    } else {
      throw this.createParseError()
    }
    return node
  }

  private dataType() {
    const node = new Node("type")

    const nameNode = new Node("name")
    let identifier = this.identifier("")
    nameNode.add(...identifier.children)
    nameNode.value = identifier.value
    while (
      this.peekIf(TokenType.QuotedIdentifier) ||
      this.peekIf(TokenType.QuotedValue) ||
      this.peekIf(TokenType.Identifier)
    ) {
      identifier = this.identifier("")
      nameNode.add(...identifier.children)
      nameNode.value = " " + identifier.value
    }
    node.add(nameNode)

    if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      node.add(this.numberValue("length"))
      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
        node.add(this.numberValue("scale"))
      }
      node.add(this.consume(TokenType.RightParen))
    }
    return node
  }

  private conflictAction() {
    const node = new Node("")
    if (this.peekIf(Keyword.ON)) {
      node.add(this.consume())
      node.add(this.consume(Keyword.CONFLICT))
    }
    if (this.peekIf(Keyword.ROLLBACK)) {
      node.name = "rollback"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.ABORT)) {
      node.name = "abort"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.FAIL)) {
      node.name = "fail"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.IGNORE)) {
      node.name = "ignore"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.REPLACE)) {
      node.name = "replace"
      node.add(this.consume())
    } else {
      throw this.createParseError()
    }
    return node
  }

  private indexColumn() {
    const node = new Node("index_column")
    const mark = this.pos
    const expressionNode = this.expression()
    if (expressionNode.children.length === 1) {
      this.pos = mark
      node.add(this.identifier("name"))
    } else {
      node.add(expressionNode)
    }
    if (this.peekIf(Keyword.ASC)) {
      node.add(new Node("asc").add(this.consume()))
    } else if (this.peekIf(Keyword.DESC)) {
      node.add(new Node("desc").add(this.consume()))
    }
    return node
  }

  private pragmaValue() {
    const node = new Node("pragma_value")
    if (this.peekIf(Operator.PLUS) || this.peekIf(Operator.MINUS)) {
      const token1 = this.consume()
      node.add(token1)
      const token2 = this.consume(TokenType.Number)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else if (this.peekIf(TokenType.Number)) {
      const token = this.consume()
      node.add(token)
      node.value = new Decimal(token.text).toString()
    } else if (this.peekIf(TokenType.String) || this.peekIf(TokenType.QuotedValue)) {
      const token = this.consume()
      node.add(token)
      node.value = dequote(token.text)
    } else if (this.peekIf(TokenType.Identifier)) {
      const token = this.consume()
      node.add(token)
      node.value = token.text
    } else {
      throw this.createParseError()
    }
    return node
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.peekIf(TokenType.QuotedIdentifier)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.QuotedValue)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.String)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.Identifier)) {
      node.add(this.consume())
      node.value = this.token(-1).text
    } else {
      throw this.createParseError()
    }
    return node
  }

  private numberValue(name: string) {
    const node = new Node(name)
    if (this.peekIf(Operator.PLUS) || this.peekIf(Operator.MINUS)) {
      const token1 = this.consume()
      node.add(token1)
      const token2 = this.consume(TokenType.Number)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else {
      const token = this.consume(TokenType.Number)
      node.add(token)
      node.value = new Decimal(token.text).toString()
    }
    return node
  }

  private expression() {
    const node = new Node("expression")
    let depth = 0
    while (this.token() &&
      (depth == 0 && !this.peekIf(TokenType.Comma)) &&
      (depth == 0 && !this.peekIf(TokenType.RightParen)) &&
      (depth == 0 && !this.peekIf(Keyword.AS)) &&
      (depth == 0 && !this.peekIf(Keyword.ASC)) &&
      (depth == 0 && !this.peekIf(Keyword.DESC)) &&
      !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        depth++
      } else if (this.peekIf(TokenType.RightParen)) {
        node.add(this.consume())
        depth--
      } else {
        node.add(this.consume())
      }
    }
    return node
  }
}
