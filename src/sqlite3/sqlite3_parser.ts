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
    const root = new Sqlite3Parser(options).parse(tokens)
    return root
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
        explain = new Node("explain statement")
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
        const prefix = []
        if (r.peekIf(Keyword.WITH)) {
          prefix.push(this.withClause(r))
        }
        if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
          stmt = this.insertStatement(r, prefix)
        } else if (r.peekIf(Keyword.UPDATE)) {
          stmt = this.updateStatement(r, prefix)
        } else if (r.peekIf(Keyword.DELETE)) {
          stmt = this.deleteStatement(r, prefix)
        } else if (r.peekIf(Keyword.SELECT) || r.peekIf(Keyword.VALUES)) {
          stmt = this.selectStatement(r, prefix)
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

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    if (virtual) {
      node.add(r.consume(Keyword.USING))

      const module = new Node("module")
      module.add(this.identifier(r, "module name"))
      if (r.peekIf(TokenType.LeftParen)) {
        module.add(r.consume())
        do {
          const moduleArg = new Node("module arg")
          do {
            moduleArg.add(r.consume())
          } while (!r.peek().eos
            && !r.peekIf([
              TokenType.RightParen, 
              TokenType.Comma
            ])
          )
          module.add(moduleArg)

          if (r.peekIf(TokenType.Comma)) {
            module.add(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        module.add(r.consume(TokenType.RightParen))
      }
      node.add(module)
    } else if (r.peekIf(TokenType.LeftParen)) {
      node.add(r.consume())
      let hasConstraint = false
      do {
        if (hasConstraint || r.peekIf([
          Keyword.CONSTRAINT,
          Keyword.PRIMARY,
          Keyword.UNIQUE,
          Keyword.CHECK,
          Keyword.FOREIGN,
        ])) {
          node.add(this.tableConstraint(r))
          hasConstraint = true
        } else {
          node.add(this.tableColumn(r))
        }
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
      node.add(this.selectStatement(r))
    } else {
      throw r.createParseError()
    }

    return node
  }

  private createViewStatement(r: TokenReader) {
    const node = new Node("create view statement")

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

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
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

    node.add(this.selectStatement(r))

    return node
  }

  private createTriggerStatement(r: TokenReader) {
    const node = new Node("create trigger statement")

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

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
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
      const update = new Node("update").add(r.consume())
      if (r.peekIf(Keyword.OF)) {
        update.add(r.consume())
        do {
          update.add(this.identifier(r, "column name"))
          if (r.peekIf(TokenType.Comma)) {
            update.add(r.consume())
          } else {
            break
          }
        } while(!r.peek().eos)
      }
      node.add(update)
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
      const when = new Node("when").add(r.consume())
      when.add(this.expression(r))
      node.add(when)
    }

    const body = new Node("body block")
    body.add(r.consume(Keyword.BEGIN))
    const prefix = []
    if (r.peekIf(Keyword.WITH)) {
      prefix.push(this.withClause(r))
    }
    if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
      body.add(this.insertStatement(r, prefix))
    } else if (r.peekIf(Keyword.UPDATE)) {
      body.add(this.updateStatement(r, prefix))
    } else if (r.peekIf(Keyword.DELETE)) {
      body.add(this.deleteStatement(r, prefix))
    } else if (r.peekIf(Keyword.SELECT)) {
      body.add(this.selectStatement(r, prefix))
    } else {
      throw r.createParseError()
    }
    body.add(r.consume(Keyword.END))
    node.add(body)

    return node
  }

  private createIndexStatement(r: TokenReader) {
    const node = new Node("create index statement")

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

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
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
    const node = new Node("alter table statement")
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
      const addColumn = new Node("add column").add(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        addColumn.add(r.consume())
      }
      addColumn.add(this.tableColumn(r))
      node.add(addColumn)
    } else if (r.peekIf(Keyword.DROP)) {
      const dropColumn = new Node("drop column").add(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        dropColumn.add(r.consume())
      }
      dropColumn.add(this.identifier(r, "column name"))
      node.add(dropColumn)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private dropTableStatement(r: TokenReader) {
    const node = new Node("drop table statement")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private dropViewStatement(r: TokenReader) {
    const node = new Node("drop view statement")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private dropTriggerStatement(r: TokenReader) {
    const node = new Node("drop trigger statement")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private dropIndexStatement(r: TokenReader) {
    const node = new Node("drop index statement")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        r.consume(),
        r.consume(Keyword.EXISTS)
      ))
    }

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private attachDatabaseStatement(r: TokenReader) {
    const node = new Node("attach database statement")
    node.add(r.consume(Keyword.ATTACH))
    node.add(r.consume(Keyword.DATABASE))
    node.add(this.expression(r))
    node.add(r.consume(Keyword.AS))
    node.add(this.identifier(r, "database name"))
    return node
  }

  private detachDatabaseStatement(r: TokenReader) {
    const node = new Node("detach database statement")
    node.add(r.consume(Keyword.DETACH))
    node.add(r.consume(Keyword.DATABASE))
    node.add(this.identifier(r, "database name"))
    return node
  }

  private analyzeStatement(r: TokenReader) {
    const node = new Node("analyze statement")
    node.add(r.consume(Keyword.ANALYZE))

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot)
    ) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    return node
  }

  private reindexStatement(r: TokenReader) {
    const node = new Node("reindex statement")
    node.add(r.consume(Keyword.REINDEX))
    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))
    return node
  }

  private vacuumStatement(r: TokenReader) {
    const node = new Node("vacuum statement")
    node.add(r.consume(Keyword.VACUUM))

    if (!r.peekIf(Keyword.TO)) {
      node.add(this.identifier(r, "schema name"))
    }
    if (r.peekIf(Keyword.TO)) {
      node.add(r.consume())
      node.add(new Node("file name").add(this.stringValue(r)))
    }
    return node
  }

  private pragmaStatement(r: TokenReader) {
    const node = new Node("pragma statement")
    node.add(r.consume(Keyword.PRAGMA))

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
      TokenType.Dot
    )) {
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
    const node = new Node("begin transaction statement")

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
    const node = new Node("savepoint statement")
    node.add(r.consume(Keyword.SAVEPOINT))
    node.add(this.identifier(r, "savepoint name"))
    return node
  }

  private releaseSavepointStatement(r: TokenReader) {
    const node = new Node("release savepoint statement")
    node.add(r.consume(Keyword.RELEASE))
    if (r.peekIf(Keyword.SAVEPOINT)) {
      node.add(r.consume())
    }
    node.add(this.identifier(r, "savepoint name"))
    return node
  }

  private commitTransactionStatement(r: TokenReader) {
    const node = new Node("commit transaction statement")
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
    const node = new Node("rollback transaction statement")
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

  private insertStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("insert statement")
    if (prefix) {
      node.add(...prefix)
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
        node.add(this.conflictAction(r, [
          r.consume()
        ]))
      }
    }
    node.add(r.consume(Keyword.INTO))

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))
    
    if (r.peekIf(Keyword.AS)) {
      node.add(r.consume())
      node.add(this.identifier(r, "object alias"))
    }

    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("insert columns")
      columns.add(r.consume())
      do {
        columns.add(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.RightParen)) {
          break
        } else {
          columns.add(r.consume(TokenType.Comma))
        }
      } while (!r.peek().eos)
      columns.add(r.consume(TokenType.RightParen))
      node.add(columns)
    }

    if (r.peekIf([Keyword.WITH, Keyword.SELECT])) {
      const prefix = []
      if (r.peekIf(Keyword.WITH)) {
        prefix.push(this.withClause(r))
      }
      node.add(this.selectStatement(r, prefix))
      if (r.peekIf(Keyword.ON)) {
        node.add(this.onConflictClause(r))
      }
    } else if (r.peekIf(Keyword.DEFAULT)) {
      node.add(new Node("default values").add(
        r.consume(),
        r.consume(Keyword.VALUES),
      ))
    } else {
      const values = new Node("insert values")
      values.add(r.consume(Keyword.VALUES))
      values.add(r.consume(TokenType.LeftParen))
      do {
        values.add(this.expression(r))
        if (r.peekIf(TokenType.RightParen)) {
          break
        } else {
          values.add(r.consume(TokenType.Comma))
        }
      } while (!r.peek().eos)
      values.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON)) {
        node.add(this.onConflictClause(r))
      }
    }
    return node
  }

  private onConflictClause(r: TokenReader) {
    const node = new Node("on conflict")
    node.add(r.consume(Keyword.ON))
    node.add(r.consume(Keyword.CONFLICT))
    if (r.peekIf(TokenType.LeftParen)) {
      const target = new Node("conflict target")
      target.add(r.consume())
      do  {
        target.add(this.indexColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          target.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      target.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.WHERE)) {
        target.add(this.whereClause(r))
      }
      node.add(target)
    }
    if (r.peekIf(Keyword.NOTHING)) {
      node.add(new Node("nothing").add(r.consume()))
    } else if (r.peekIf(Keyword.UPDATE)) {
      const update = new Node("update")
      update.add(r.consume())
      update.add(r.consume(Keyword.SET))
      node.add(update)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private updateStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("update statement")
    if (prefix) {
      node.add(...prefix)
    }
    node.add(this.updateClause(r))
    return node
  }

  private updateClause(r: TokenReader) {
    const node = new Node("update clause")
    node.add(r.consume(Keyword.UPDATE))

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    node.add(this.setClause(r))
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

  private setClause(r: TokenReader) {
    const node = new Node("set clause")
    node.add(r.consume(Keyword.SET))
    do {
      const column = new Node("update column")
      if (r.peekIf(TokenType.LeftParen)) {
        const columns = new Node("column set")
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
        column.add(columns)
      } else {
        column.add(this.identifier(r, "column name"))
      }
      column.add(r.consume({ type: TokenType.Operator, text: "=" }))
      column.add(this.expression(r))
      node.add(column)
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private deleteStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("delete statement")
    if (prefix) {
      node.add(...prefix)
    }
    node.add(this.deleteClause(r))
    return node
  }

  private deleteClause(r: TokenReader) {
    const node = new Node("delete clause")
    node.add(r.consume(Keyword.DELETE))
    node.add(r.consume(Keyword.FROM))

    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))

    if (r.peekIf(Keyword.WHERE)) {
      node.add(this.whereClause(r))
    }
    if (r.peekIf(Keyword.RETURNING)) {
      node.add(this.returingClause(r))
    }
    return node
  }
    
  private selectStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("select statement")
    if (prefix) {
      node.add(...prefix)
    }

    let current
    do {
      current = this.selectClause(r)
      if (r.peekIf(Keyword.UNION, Keyword.ALL)) {
        const unionAll = new Node("union all operation")
        unionAll.add(current)
        unionAll.add(r.consume())
        unionAll.add(r.consume())
        current = unionAll
      } else if (r.peekIf(Keyword.UNION)) {
        const union = new Node("union operation")
        union.add(current)
        union.add(r.consume())
        current = union
      } else if (r.peekIf(Keyword.INTERSECT)) {
        const intersect = new Node("intersect operation")
        intersect.add(current)
        intersect.add(r.consume())
        current = intersect
      } else if (r.peekIf(Keyword.EXPECT)) {
        const expect = new Node("expect operation")
        expect.add(current)
        expect.add(r.consume())
        current = expect
      } else {
        break
      }
    } while(!r.peek().eos)
    node.add(current)

    if (r.peekIf(Keyword.ORDER)) {
      node.add(this.orderByClause(r))
    }
    if (r.peekIf(Keyword.LIMIT)) {
      node.add(this.limitClause(r))
    }
    return node
  }

  private selectClause(r: TokenReader) {
    const node = new Node("select clause")
    if (r.peekIf(Keyword.VALUES)) {
      const child = new Node("select values")
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
      if (r.peekIf(Keyword.GROUP)) {
        node.add(this.gropuByClause(r))
      }
      if (r.peekIf(Keyword.HAVING)) {
        node.add(this.havingClause(r))
      }
      if (r.peekIf(Keyword.WINDOW)) {
        node.add(this.windowClause(r))
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
      const table = new Node("common table")
      table.add(this.identifier(r, "object name"))
      if (r.peekIf(TokenType.LeftParen)) {
        table.add(r.consume())
        while (r.peek()) {
          table.add(this.identifier(r, "column name"))
          if (r.peekIf(TokenType.Comma)) {
            table.add(r.consume())
          } else {
            break
          }
        }
        table.add(r.consume(TokenType.RightParen))
      }

      table.add(r.consume(Keyword.AS))

      if (r.peekIf(Keyword.NOT)) {
        table.add(new Node("not materialized").add(
          r.consume(), 
          r.consume(Keyword.MATERIALIZED)
        ))
      } else if (r.peekIf(Keyword.MATERIALIZED)) {
        table.add(new Node("materialized").add(r.peek(-1)))
      }
      table.add(r.consume(TokenType.LeftParen))
      table.add(this.selectStatement(r))
      table.add(r.consume(TokenType.RightParen))
      node.add(table)

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
      const column = new Node("select column")
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        column.add(new Node("all column").add(r.consume()))
      } else if (r.peekIf(
        [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
        TokenType.Dot, 
        { type: TokenType.Operator, text: "*" }
      )) {
        const allColumns = new Node("all columns")
        allColumns.add(this.identifier(r, "schema name"))
        allColumns.add(r.consume())
        allColumns.add(r.consume())
        column.add(allColumns)
      } else {
        column.add(this.expression(r))
        if (r.peekIf(Keyword.AS)) {
          column.add(r.consume())
          column.add(this.identifier(r, "column alias"))
        } else if (r.peekIf(
          [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
        )) {
          column.add(this.identifier(r, "column alias"))
        }
      }
      node.add(column)
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private fromClause(r: TokenReader) {
    const node = new Node("from clause")
    node.add(r.consume(Keyword.FROM))
    let hasJoinClause = false
    do {
      const table = new Node("select object")
      if (r.peekIf(TokenType.LeftParen)) {
        table.add(r.consume())
        if (r.peekIf(Keyword.WITH) || r.peekIf(Keyword.SELECT)) {
          table.add(this.selectStatement(r))
          table.add(r.consume(TokenType.RightParen))
          if (r.peekIf(Keyword.AS)) {
            table.add(r.consume())
            table.add(this.identifier(r, "object alias"))
          } else if (r.peekIf(
            [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
          )) {
            table.add(this.identifier(r, "object alias"))
          }
        } else {
          table.add(this.fromClause(r))
          table.add(r.consume(TokenType.RightParen))
        }
      } else {
        if (r.peekIf(
          [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
          TokenType.Dot
        )) {
          table.add(this.identifier(r, "schema name"))
          table.add(r.consume())
        }
        table.add(this.identifier(r, "object name"))
        if (r.peekIf(TokenType.LeftParen)) {
          table.add(r.consume())
          while (!r.peekIf(TokenType.RightParen)) {
            const arg = new Node("function arg")
            arg.add(this.expression(r))
            table.add(arg)
            if (r.peekIf(TokenType.Comma)) {
              table.add(r.consume())
            } else {
              break
            }
          }
          table.add(r.consume(TokenType.RightParen))
        }
        while (r.peekIf(
          [Keyword.NATURAL, Keyword.JOIN, Keyword.CROSS, Keyword.INNER, Keyword.LEFT, Keyword.RIGHT, Keyword.FULL]
        )) {
          hasJoinClause = true
          table.add(this.joinClause(r))
        }
      }
      if (!hasJoinClause && r.consume(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private joinClause(r: TokenReader) {
    const node = new Node("")
    if (r.peekIf(Keyword.CROSS)) {
      node.name = "cross join clause"
      node.add(r.consume())
    } else {
      if (r.peekIf(Keyword.NATURAL)) {
        node.add(new Node("natual").add(r.consume()))
      }
      if (r.peekIf(Keyword.INNER)) {
        node.name = "inner join clause"
        node.add(r.consume())
      } else if (r.peekIf(Keyword.LEFT)) {
        node.name = "left outer join clause"
        node.add(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.add(r.consume())
        }
      } else if (r.peekIf(Keyword.RIGHT)) {
        node.name = "right outer join clause"
        node.add(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.add(r.consume())
        }
      } else if (r.peekIf(Keyword.FULL)) {
        node.name = "full outer join clause"
        node.add(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.add(r.consume())
        }
      } else {
        node.name = "inner join clause"
      }
    }
    node.add(r.consume(Keyword.JOIN))
    if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot
    )) {
      node.add(this.identifier(r, "schema name"))
      node.add(r.consume())
    }
    node.add(this.identifier(r, "object name"))
    if (r.peekIf(Keyword.ON)) {
      const on = new Node("on clause")
      on.add(r.consume())
      on.add(this.expression(r))
      node.add(on)
    } else if (r.peekIf(Keyword.USING)) {
      const using = new Node("using clause")
      using.add(r.consume())
      using.add(r.consume(TokenType.LeftParen))
      using.add(r.consume(TokenType.RightParen))
      node.add(using)
    }
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
      node.add(this.window(r))
      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private window(r: TokenReader) {
    const node = new Node("window")
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
      const from = new Node("between from")
      from.add(r.consume())
      if (r.peekIf(Keyword.CURRENT)) {
        from.add(new Node("current row").add(
          r.consume(),
          r.consume(Keyword.ROW),
        ))
      } else if (r.peekIf(Keyword.UNBOUNDED)) {
        from.add(new Node("unbounded preceding").add(
          r.consume(),
          r.consume(Keyword.PRECEDING),
        ))
      } else {
        const expr = this.expression(r)
        if (r.peekIf(Keyword.PRECEDING)) {
          from.add(new Node("preceding").add(
            expr,
            r.consume(),
          ))
        } else if (r.peekIf(Keyword.FOLLOWING)) {
          from.add(new Node("following").add(
            expr,
            r.consume(),
          ))
        } else {
          throw r.createParseError()
        }
      }
      frame.add(from)
      frame.add(r.consume())
      const to = new Node("between to")
      to.add(r.consume())
      if (r.peekIf(Keyword.CURRENT)) {
        to.add(new Node("current row").add(
          r.consume(),
          r.consume(Keyword.ROW),
        ))
      } else if (r.peekIf(Keyword.UNBOUNDED)) {
        to.add(new Node("unbounded following").add(
          r.consume(),
          r.consume(Keyword.FOLLOWING),
        ))
      } else {
        const expr = this.expression(r)
        if (r.peekIf(Keyword.PRECEDING)) {
          to.add(new Node("preceding").add(
            expr,
            r.consume(),
          ))
        } else if (r.peekIf(Keyword.FOLLOWING)) {
          to.add(new Node("following").add(
            expr,
            r.consume(),
          ))
        } else {
          throw r.createParseError()
        }
      }
      frame.add(to)
    } else {
      frame.add(new Node("preceding").add(
        this.expression(r),
        r.consume(Keyword.PRECEDING),
      ))
    }
    node.add(frame)
    if (r.peekIf(Keyword.EXCLUDE)) {
      const exclude = new Node("exclude")
      exclude.add(r.consume())
      if (r.peekIf(Keyword.NO)) {
        exclude.add(new Node("no others").add(
          r.consume(),
          r.consume(Keyword.OTHERS),
        ))
      } else if (r.peekIf(Keyword.CURRENT)) {
        exclude.add(new Node("current row").add(
          r.consume(),
          r.consume(Keyword.ROW),
        ))
      } else if (r.peekIf(Keyword.GROUP)) {
        exclude.add(new Node("group").add(r.consume()))
      } else if (r.peekIf(Keyword.TIES)) {
        exclude.add(new Node("ties").add(r.consume()))
      } else {
        throw r.createParseError()
      }
      node.add(exclude)
    }
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

    if (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      const columnType = new Node("column type")
      columnType.add(this.typeName(r))
      if (r.peekIf(TokenType.LeftParen)) {
        columnType.add(r.consume())
        columnType.add(new Node("length").add(this.numericValue(r)))
        if (r.peekIf(TokenType.Comma)) {
          columnType.add(r.consume())
          columnType.add(new Node("scale").add(this.numericValue(r)))
        }
        columnType.add(r.consume(TokenType.RightParen))
      }
      node.add(columnType)
    }

    while (!r.peekIf([TokenType.Comma, TokenType.RightParen])) {
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
      const pkey = new Node("primary key")
      pkey.add(r.consume())
      pkey.add(r.consume(Keyword.KEY))

      if (r.peekIf(Keyword.ASC)) {
        pkey.add(new Node("asc").add(r.consume()))
      } else if (r.peekIf(Keyword.DESC)) {
        pkey.add(new Node("desc").add(r.consume()))
      }
      if (r.peekIf(Keyword.ON)) {
        pkey.add(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      if (r.peekIf(Keyword.AUTOINCREMENT)) {
        pkey.add(new Node("autoincrement").add(r.consume()))
      }
      node.add(pkey)
    } else if (r.peekIf(Keyword.NOT)) {
      const notNull = new Node("not null")
      notNull.add(r.consume())
      notNull.add(r.consume(Keyword.NULL))
      if (r.peekIf(Keyword.ON)) {
        notNull.add(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.add(notNull)
    } else if (r.peekIf(Keyword.NULL)) {
      const nullable = new Node("null")
      nullable.add(r.consume())
      if (r.peekIf(Keyword.ON)) {
        nullable.add(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.add(nullable)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("unique")
      unique.add(r.consume())
      if (r.peekIf(Keyword.ON)) {
        unique.add(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
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
      const pkey = new Node("primary key")
      pkey.add(r.consume())
      pkey.add(r.consume(Keyword.KEY))
      pkey.add(r.consume(TokenType.LeftParen))
      do  {
        pkey.add(this.indexColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          pkey.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      pkey.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON)) {
        pkey.add(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.add(pkey)
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
      if (r.peekIf(Keyword.ON)) {
        unique.add(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
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
      const fkey = new Node("foreign key")
      fkey.add(r.consume())
      fkey.add(r.consume(Keyword.KEY))
      fkey.add(r.consume(TokenType.LeftParen))
      fkey.add(this.identifier(r, "column name"))
      do {
        fkey.add(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          fkey.add(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      fkey.add(r.consume(TokenType.RightParen))
      node.add(fkey)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private typeName(r: TokenReader) {
    const node = this.identifier(r, "type name")
    while (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
    )) {
      const ident = this.identifier(r, "")
      node.add(...ident.children)
      node.value = " " + ident.value
    }
    return node
  }

  private conflictAction(r: TokenReader, prefix?: Token[]) {
    const node = new Node("")
    if (prefix) {
      node.add(...prefix)
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
    const expr = this.expression(r)
    if (expr.children.length === 1) {
      r.pos = mark
      node.add(this.identifier(r, "column name"))
    } else {
      node.add(expr)
    }
    if (r.peekIf(Keyword.COLLATE)) {
      node.add(r.consume())
      node.add(this.identifier(r, "collation name"))
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
    } else if (r.peekIf([TokenType.String, TokenType.QuotedValue])) {
      const token = r.consume()
      node.add(token)
      node.value = dequote(token.text)
    } else if (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
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
    } else if (r.peekIf([TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      node.add(r.consume())
      node.value = dequote(r.peek(-1).text)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private expression(r: TokenReader) {
    const node = this.expressionValue(r)
    //TODO
    return node
  }

  private expressionValue(r: TokenReader) {
    let node
    if (r.peekIf(TokenType.LeftParen)) {
      node = new Node("expression")
      node.add(r.consume())
      node.add(this.expression(r))
      if (r.peekIf(TokenType.Comma)) {
        node.name = "expressions"
        node.add(r.consume())
        do {
          node.add(this.expression(r))
          if (r.peekIf(TokenType.Comma)) {
            node.add(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
      }
      node.add(r.consume(TokenType.RightParen))
    } else if (r.peekIf(Keyword.BindVariable)) {
      node = new Node("bind variable")
      const token = r.consume()
      node.add(token)
      node.value = token.text.substring(1)
    } else if (r.peekIf(Keyword.EXISTS)) {
      node = new Node("exist")
      node.add(r.consume())
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.selectStatement(r))
      node.add(r.consume(TokenType.RightParen))
    } else if (r.peekIf(Keyword.CAST)) {
      node = new Node("cast")
      node.add(r.consume())
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.expression(r))
      node.add(r.consume(Keyword.AS))
      node.add(this.typeName(r))
      node.add(r.consume(TokenType.RightParen))
    } else if (r.peekIf(Keyword.RAISE)) {
      node = new Node("raise")
      node.add(r.consume())
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.conflictAction(r))
      node.add(r.consume(TokenType.Comma))
      node.add(this.expression(r))
      node.add(r.consume(TokenType.RightParen))
    } else if (r.peekIf(TokenType.Number)) {
      node = this.numericValue(r)
    } else if (r.peekIf(Keyword.NOT)) {
      node = new Node("not operation")
      node.add(r.consume())
      node.add(this.expression(r))
    } else if (r.peekIf(TokenType.Operator)) {
      const token = r.consume()
      if (token.text === "~") {
        node = new Node("bitwise not operation")
      } else if (token.text === "+") {
        node = new Node("unary plus operation")
      } else if (token.text === "-") {
        node = new Node("unary minus operation")
      } else {
        throw r.createParseError()
      }
      node.add(token)
      node.add(this.expression(r))
    } else if (r.peekIf(TokenType.String)) {
      node = this.stringValue(r)
    } else if (r.peekIf(TokenType.Bytes)) {
      node = this.blobValue(r)
    } else if (r.peekIf(Keyword.NULL)) {
      node = new Node("null")
      node.add(r.consume())
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      node = this.booleanValue(r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      node =  new Node("function")
      const token = r.consume()
      node.add(new Node("object name", token.text.toUpperCase()).add(token))
    } else if (r.peekIf(Keyword.CASE)) {
      node = new Node("case formula")
      node.add(r.consume())
      if (!r.peekIf(Keyword.WHEN)) {
        const target = new Node("target expression")
        target.add(this.expression(r))
        node.add(target)
      }
      do {
        const when = new Node("when")
        when.add(r.consume(Keyword.WHEN))
        const condition = new Node("condition expression")
        condition.add(this.expression(r))
        when.add(condition)
        when.add(r.consume(Keyword.THEN))
        const result = new Node("result expression")
        result.add(this.expression(r))
        when.add(result)
        node.add(when)
      } while (!r.peek().eos)
      if (r.peekIf(Keyword.ELSE)) {
        const els = new Node("else")
        els.add(r.consume())
        const result = new Node("result expression")
        result.add(this.expression(r))
        els.add(result)
        node.add(els)
      }
      node.add(r.consume(Keyword.END))
    } else if (r.peekIf(
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot,
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot,
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue]
    )) {
      node = new Node("column")
      node.add(new Node("schema name").add(r.consume()))
      node.add(r.consume())
      node.add(new Node("object name").add(r.consume()))
      node.add(r.consume())
      node.add(new Node("column name").add(r.consume()))
    } else if (r.peekIf(
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.Dot,
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue]
    )) {
      node = new Node("column")
      node.add(new Node("object name").add(r.consume()))
      node.add(r.consume())
      node.add(new Node("column name").add(r.consume()))
    } else if (r.peekIf(
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.LeftParen
    )) {
      node = new Node("function")
      node.add(new Node("object name").add(r.consume()))

      const args = new Node("function arguments")
      args.add(r.consume(TokenType.LeftParen))
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        const arg = new Node("function argument")
        arg.add(new Node("all column").add(r.consume()))
        args.add(arg)
      } else {
        if (r.peekIf(Keyword.DISTINCT)) {
          args.add(new Node("distinct").add(r.consume()))
        }
        while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
          const arg = new Node("function argument")
          arg.add(this.expression(r))
          args.add(arg)
          if (r.peekIf(TokenType.Comma)) {
            args.add(r.consume())
          } else {
            break
          }
        }
      }
      args.add(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.FILTER)) {
        const filter = new Node("filter clause")
        filter.add(r.consume())
        filter.add(r.consume(TokenType.LeftParen))
        filter.add(this.whereClause(r))
        filter.add(r.consume(TokenType.RightParen))
        node.add(filter)
      }
      if (r.peekIf(Keyword.OVER)) {
        const over = new Node("over clause")
        over.add(r.consume())
        if (r.peekIf(TokenType.LeftParen)) {
          over.add(r.consume())
          over.add(this.window(r))
          over.add(r.consume(TokenType.RightParen))
          node.add(over)
        } else {
          node.add(this.identifier(r, "window name"))
          
        }
      }
      node.add(args)
    } else if (r.peekIf(
      [TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue]
    )) {
      node = new Node("column")
      node.add(new Node("column name").add(r.consume()))
    } else {
      throw r.createParseError()
    }

    return node
  }

  private numericValue(r: TokenReader) {
    const node = new Node("numeric value")
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

  private stringValue(r: TokenReader) {
    const node = new Node("string value")
    const token = r.consume(TokenType.String)
    node.add(token)
    node.value = dequote(token.text)
    return node
  }

  private blobValue(r: TokenReader) {
    const node = new Node("blob value")
    const token = r.consume(TokenType.Bytes)
    node.add(token)
    node.value = token.text.substring(2, token.text.length-1).toUpperCase()
    return node
  }

  private booleanValue(r: TokenReader) {
    const node = new Node("boolean value")
    if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      const token = r.consume()
      node.add(token)
      node.value = token.text.toUpperCase()
    } else {
      throw r.createParseError()
    }
    return node
  }
}
