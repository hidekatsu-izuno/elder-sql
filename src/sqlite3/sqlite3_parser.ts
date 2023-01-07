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
          root.append(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          root.append(this.command(r))
        } else {
          root.append(this.Statement(r))
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            root.append(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (r.peek() != null) {
      for (let i = r.pos; i < r.tokens.length; i++) {
        root.append(r.tokens[i])
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
    const stmt = new Node("command statement")

    const token = r.consume(TokenType.Command)
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.append(new Node("command name", token.text).append(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), {
        preskips: token.preskips, 
        postskips: token.postskips,
        location: token.location,
      })
      stmt.append(new Node("command name", nameToken.text).append(nameToken))

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
          stmt.append(new Node("command argument", dequote(argToken.text)).append(argToken))
        }
      }
    }

    if (r.peekIf(TokenType.SemiColon)) {
      stmt.append(r.consume())
    }
    if (r.peekIf(TokenType.Eof)) {
      stmt.append(r.consume())
    }
    return stmt
  }

  private Statement(r: TokenReader): Node {
    let explain
    let stmt

    try {
      if (r.peekIf(Keyword.EXPLAIN)) {
        explain = new Node("explain statement")
          .append(r.consume())
        if (r.peekIf(Keyword.QUERY)) {
          explain.append(new Node("query plan clause")
            .append(r.consume())
            .append(r.consume(Keyword.PLAN))
          )
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
        stmt = explain.append(stmt)
      }

      if (r.peekIf(TokenType.Delimiter)) {
        stmt.append(r.consume())
      }
      if (r.peekIf(TokenType.Eof)) {
        stmt.append(r.consume())
      }
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (!r.peek().eos) {
          stmt.append(r.consume())
        }
        if (r.peekIf(TokenType.Eof)) {
          stmt.append(r.consume())
        }
        err.node = stmt
      }      
      throw err
    }
  }

  private createTableStatement(r: TokenReader) {
    const node = new Node("create table statement")
    let virtual = false
    
    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
      node.append(new Node("temporary option")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.VIRTUAL)) {
      node.append(new Node("virtual option")
        .append(r.consume())
      )
      virtual = true
    }
    node.append(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if not exists option")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    if (virtual) {
      node.append(r.consume(Keyword.USING))

      const module = new Node("module")
      module.append(this.identifier(r, "module name"))
      if (r.peekIf(TokenType.LeftParen)) {
        module.append(r.consume())
        do {
          const moduleArg = new Node("module arg")
          do {
            moduleArg.append(r.consume())
          } while (!r.peek().eos
            && !r.peekIf([
              TokenType.RightParen, 
              TokenType.Comma
            ])
          )
          module.append(moduleArg)

          if (r.peekIf(TokenType.Comma)) {
            module.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        module.append(r.consume(TokenType.RightParen))
      }
      node.append(module)
    } else if (r.peekIf(TokenType.LeftParen)) {
      node.append(r.consume())
      let hasConstraint = false
      do {
        if (hasConstraint || r.peekIf([
          Keyword.CONSTRAINT,
          Keyword.PRIMARY,
          Keyword.UNIQUE,
          Keyword.CHECK,
          Keyword.FOREIGN,
        ])) {
          node.append(this.tableConstraint(r))
          hasConstraint = true
        } else {
          node.append(this.tableColumn(r))
        }
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      node.append(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.WITHOUT)) {
        node.append(new Node("without rowid option")
          .append(r.consume()) 
          .append(r.consume(Keyword.ROWID))
        )
      }
    } else if (r.peekIf(Keyword.AS)) {
      node.append(r.consume())
      node.append(this.selectStatement(r))
    } else {
      throw r.createParseError()
    }

    return node
  }

  private createViewStatement(r: TokenReader) {
    const node = new Node("create view statement")

    node.append(r.consume(Keyword.CREATE))
    if (
      r.peekIf(Keyword.TEMPORARY) ||
      r.peekIf(Keyword.TEMP)
    ) {
      node.append(new Node("temporary option")
        .append(r.consume())
      )
    }
    node.append(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if not exists option")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    node.append(r.consume(Keyword.AS))

    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("column list")
        .append(r.consume())
      do {
        columns.append(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      node.append(columns)
    }

    node.append(this.selectStatement(r))

    return node
  }

  private createTriggerStatement(r: TokenReader) {
    const node = new Node("create trigger statement")

    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
      node.append(new Node("temporary option")
        .append(r.consume())
      )
    }
    node.append(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if not exists option")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    if (r.peekIf(Keyword.BEFORE)) {
      node.append(new Node("before option")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.AFTER)) {
      node.append(new Node("after option")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.INSTEAD)) {
      node.append(new Node("instead of option")
        .append(r.consume())
        .append(r.consume(Keyword.OF))
      )
    }

    if (r.peekIf(Keyword.INSERT)) {
      node.append(new Node("insert on clause")
        .append(r.consume())
        .append(r.consume(Keyword.ON))
        .append(this.identifier(r, "target object name"))
      )
    } else if (r.peekIf(Keyword.UPDATE)) {
      const updateOn = new Node("update on clause")
        .append(r.consume())
      if (r.peekIf(Keyword.OF)) {
        const columns = new Node("column list")
          .append(r.consume())
        do {
          columns.append(this.identifier(r, "column name"))
          if (r.peekIf(TokenType.Comma)) {
            columns.append(r.consume())
          } else {
            break
          }
        } while(!r.peek().eos)
        updateOn.append(columns)
      }
      updateOn.append(r.consume(Keyword.ON))
      updateOn.append(this.identifier(r, "target object name"))
      node.append(updateOn)
    } else if (r.peekIf(Keyword.DELETE)) {
      node.append(new Node("delete on clause")
        .append(r.consume())
        .append(r.consume(Keyword.ON))
        .append(this.identifier(r, "target object name"))
      )
    } else {
      throw r.createParseError()
    }

    if (r.peekIf(Keyword.FOR)) {
      node.append(new Node("for each row option")
        .append(r.consume())
        .append(r.consume(Keyword.EACH))
        .append(r.consume(Keyword.ROW))
      )
    }

    if (r.peekIf(Keyword.WHEN)) {
      node.append(new Node("when clause")
        .append(r.consume())
        .append(this.expression(r))
      )
    }

    {
      const block = new Node("block statement")
      {
        const begin = new Node("begin block")
        begin.append(r.consume(Keyword.BEGIN))
        const prefix = []
        if (r.peekIf(Keyword.WITH)) {
          prefix.push(this.withClause(r))
        }
        if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
          begin.append(this.insertStatement(r, prefix))
        } else if (r.peekIf(Keyword.UPDATE)) {
          begin.append(this.updateStatement(r, prefix))
        } else if (r.peekIf(Keyword.DELETE)) {
          begin.append(this.deleteStatement(r, prefix))
        } else if (r.peekIf(Keyword.SELECT)) {
          begin.append(this.selectStatement(r, prefix))
        } else {
          throw r.createParseError()
        }
        block.append(r.consume(TokenType.SemiColon))
        block.append(begin)
      }
      block.append(r.consume(Keyword.END))
      node.append(block)
    }

    return node
  }

  private createIndexStatement(r: TokenReader) {
    const node = new Node("create index statement")

    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.UNIQUE)) {
      node.append(new Node("unique option")
        .append(r.consume())
      )
    }
    node.append(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if not exists option")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    node.append(r.consume(Keyword.ON))
    node.append(this.identifier(r, "target object name"))

    {
      const columns = new Node("sorting column list")
      columns.append(r.consume(TokenType.LeftParen))
      do {
        node.append(this.sortingColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      node.append(columns)
    }

    if (r.peekIf(Keyword.WHERE)) {
      node.append(this.whereClause(r))
    }

    return node
  }

  private alterTableStatement(r: TokenReader) {
    const node = new Node("alter table statement")
    node.append(r.consume(Keyword.ALTER))
    node.append(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
      node.append(new Node("rename object clause")
        .append(r.consume())
        .append(r.consume())
        .append(this.identifier(r, "target object name"))
      )
    } else  if (r.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
      node.append(new Node("rename column clause")
        .append(r.consume())
        .append(r.consume())
        .append(this.identifier(r, "column name"))
        .append(r.consume(Keyword.TO))
        .append(this.identifier(r, "target column name"))
      )
    } else if (r.peekIf(Keyword.ADD)) {
      const addColumn = new Node("add column clause")
      addColumn.append(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        addColumn.append(r.consume())
      }
      addColumn.append(this.tableColumn(r))
      node.append(addColumn)
    } else if (r.peekIf(Keyword.DROP)) {
      const dropColumn = new Node("drop column clause")
      dropColumn.append(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        dropColumn.append(r.consume())
      }
      dropColumn.append(this.identifier(r, "column name"))
      node.append(dropColumn)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private dropTableStatement(r: TokenReader) {
    const node = new Node("drop table statement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if exists option")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    return node
  }

  private dropViewStatement(r: TokenReader) {
    const node = new Node("drop view statement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if exists option")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    return node
  }

  private dropTriggerStatement(r: TokenReader) {
    const node = new Node("drop trigger statement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if exists option")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    return node
  }

  private dropIndexStatement(r: TokenReader) {
    const node = new Node("drop index statement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("if exists")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    return node
  }

  private attachDatabaseStatement(r: TokenReader) {
    const node = new Node("attach database statement")
    node.append(r.consume(Keyword.ATTACH))
    node.append(r.consume(Keyword.DATABASE))
    {
      const database = new Node("database")
      database.append(this.expression(r))
      node.append(database)
    }
    node.append(r.consume(Keyword.AS))
    node.append(this.identifier(r, "schema name"))
    return node
  }

  private detachDatabaseStatement(r: TokenReader) {
    const node = new Node("detach database statement")
    node.append(r.consume(Keyword.DETACH))
    node.append(r.consume(Keyword.DATABASE))
    node.append(this.identifier(r, "schema name"))
    return node
  }

  private analyzeStatement(r: TokenReader) {
    const node = new Node("analyze statement")
    node.append(r.consume(Keyword.ANALYZE))

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    return node
  }

  private reindexStatement(r: TokenReader) {
    const node = new Node("reindex statement")
    node.append(r.consume(Keyword.REINDEX))

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    return node
  }

  private vacuumStatement(r: TokenReader) {
    const node = new Node("vacuum statement")
    node.append(r.consume(Keyword.VACUUM))

    if (r.peekIf(Keyword.TO)) {
      node.append(r.consume())
      node.append(new Node("file name")
        .append(this.stringLiteral(r))
      )
    } else {
      node.append(this.identifier(r, "schema name"))
    }
    return node
  }

  private pragmaStatement(r: TokenReader) {
    const node = new Node("pragma statement")
    node.append(r.consume(Keyword.PRAGMA))

    const ident = this.identifier(r, "pragma name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "pragma name"))
    }

    if (r.peekIf({ type: TokenType.Operator, text: "=" })) {
      node.append(r.consume())
      node.append(this.pragmaValue(r))
    } else if (r.peekIf(TokenType.LeftParen)) {
      node.append(r.consume())
      node.append(this.pragmaValue(r))
      node.append(r.consume(TokenType.RightParen))
    }
    return node
  }

  private beginTransactionStatement(r: TokenReader) {
    const node = new Node("begin transaction statement")

    node.append(r.consume(Keyword.BEGIN))
    if (r.peekIf(Keyword.DEFERRED)) {
      node.append(new Node("deferred option").append(r.consume()))
    } else if (r.peekIf(Keyword.IMMEDIATE)) {
      node.append(new Node("immediate option").append(r.consume()))
    } else if (r.peekIf(Keyword.EXCLUSIVE)) {
      node.append(new Node("exclusive option").append(r.consume()))
    }
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.append(r.consume())
    }

    return node
  }

  private savepointStatement(r: TokenReader) {
    const node = new Node("savepoint statement")
    node.append(r.consume(Keyword.SAVEPOINT))
    node.append(this.identifier(r, "savepoint name"))
    return node
  }

  private releaseSavepointStatement(r: TokenReader) {
    const node = new Node("release savepoint statement")
    node.append(r.consume(Keyword.RELEASE))
    if (r.peekIf(Keyword.SAVEPOINT)) {
      node.append(r.consume())
    }
    node.append(this.identifier(r, "savepoint name"))
    return node
  }

  private commitTransactionStatement(r: TokenReader) {
    const node = new Node("commit transaction statement")
    if (r.peekIf(Keyword.END)) {
      node.append(r.consume())
    } else {
      node.append(r.consume(Keyword.COMMIT))  
    }
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.append(r.consume())
    }
    return node
  }

  private rollbackTransactionStatement(r: TokenReader) {
    const node = new Node("rollback transaction statement")
    node.append(r.consume(Keyword.ROLLBACK))
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.append(r.consume())
    }
    if (r.peekIf(Keyword.TO)) {
      node.append(r.consume())
      if (r.peekIf(Keyword.SAVEPOINT)) {
        node.append(r.consume())
      }
      node.append(this.identifier(r, "savepoint name"))
    }
    return node
  }

  private insertStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("insert statement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.insertClause(r))
    return node
  }

  private insertClause(r: TokenReader) {
    const node = new Node("insert clause")
    if (r.peekIf(Keyword.REPLACE)) {
      node.append(new Node("replace").append(r.consume()))
    } else {
      node.append(r.consume(Keyword.INSERT))
      if (r.peekIf(Keyword.OR)) {
        node.append(this.conflictAction(r, [
          r.consume()
        ]))
      }
    }
    node.append(r.consume(Keyword.INTO))

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }
    
    if (r.peekIf(Keyword.AS)) {
      node.append(r.consume())
      node.append(this.identifier(r, "object alias"))
    }

    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("column list")
        .append(r.consume())
      do {
        columns.append(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      node.append(columns)
    }

    if (r.peekIf([Keyword.WITH, Keyword.SELECT])) {
      const prefix = []
      if (r.peekIf(Keyword.WITH)) {
        prefix.push(this.withClause(r))
      }
      node.append(this.selectStatement(r, prefix))
      if (r.peekIf(Keyword.ON)) {
        node.append(this.onConflictClause(r))
      }
    } else if (r.peekIf(Keyword.DEFAULT)) {
      node.append(new Node("default values option")
        .append(r.consume())
        .append(r.consume(Keyword.VALUES))
      )
    } else {
      const values = new Node("values clause")
      values.append(r.consume(Keyword.VALUES))
      {
        const exprs = new Node("expression list")
        exprs.append(r.consume(TokenType.LeftParen))
        do {
          exprs.append(this.expression(r))
          if (r.peekIf(TokenType.Comma)) {
            exprs.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        exprs.append(r.consume(TokenType.RightParen))
        values.append(exprs)
      }

      do {
        if (r.peekIf(Keyword.ON)) {
          node.append(this.onConflictClause(r))
        } else {
          break
        }
      } while (!r.peek().eos)
    }
    return node
  }

  private onConflictClause(r: TokenReader) {
    const node = new Node("on conflict clause")
      .append(r.consume(Keyword.ON))
      .append(r.consume(Keyword.CONFLICT))
    if (r.peekIf(TokenType.LeftParen)) {
      const target = new Node("sorting column list")
        .append(r.consume())
      do  {
        target.append(this.sortingColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          target.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      target.append(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.WHERE)) {
        target.append(this.whereClause(r))
      }

      node.append(target)
    }
    node.append(r.consume(Keyword.DO))
    if (r.peekIf(Keyword.NOTHING)) {
      node.append(new Node("do nothing option").append(r.consume()))
    } else if (r.peekIf(Keyword.UPDATE)) {
      const update = new Node("do update option")
      update.append(r.consume())
      update.append(this.setClause(r))
      if (r.peekIf(Keyword.WHERE)) {
        update.append(this.whereClause(r))
      }
      node.append(update)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private updateStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("update statement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.updateClause(r))
    return node
  }

  private updateClause(r: TokenReader) {
    const node = new Node("update clause")
    node.append(r.consume(Keyword.UPDATE))

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    node.append(this.setClause(r))
    if (r.peekIf(Keyword.FROM)) {
      node.append(this.fromClause(r))
    }
    if (r.peekIf(Keyword.WHERE)) {
      node.append(this.whereClause(r))
    }
    if (r.peekIf(Keyword.RETURNING)) {
      node.append(this.returingClause(r))
    }
    if (r.peekIf(Keyword.ORDER)) {
      node.append(this.orderByClause(r))
    }
    if (r.peekIf(Keyword.LIMIT)) {
      node.append(this.limitClause(r))
    }
    return node
  }

  private setClause(r: TokenReader) {
    const node = new Node("set clause")
    node.append(r.consume(Keyword.SET))
    do {
      const column = new Node("update column")
      if (r.peekIf(TokenType.LeftParen)) {
        const columns = new Node("column list")
        columns.append(r.consume())
        do {
          columns.append(this.identifier(r, "column name"))
          if (r.peekIf(TokenType.Comma)) {
            columns.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        columns.append(r.consume(TokenType.RightParen))
        column.append(columns)
      } else {
        column.append(this.identifier(r, "column name"))
      }
      column.append(r.consume({ type: TokenType.Operator, text: "=" }))
      column.append(this.expression(r))
      node.append(column)
      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private deleteStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("delete statement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.deleteClause(r))
    return node
  }

  private deleteClause(r: TokenReader) {
    const node = new Node("delete clause")
    node.append(r.consume(Keyword.DELETE))
    node.append(r.consume(Keyword.FROM))

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(this.identifier(r, "object name"))
    }

    if (r.peekIf(Keyword.WHERE)) {
      node.append(this.whereClause(r))
    }
    if (r.peekIf(Keyword.RETURNING)) {
      node.append(this.returingClause(r))
    }
    return node
  }
    
  private selectStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("select statement")
    if (prefix) {
      node.append(...prefix)
    }

    let current
    do {
      current = this.selectClause(r)
      if (r.peekIf(Keyword.UNION, Keyword.ALL)) {
        const unionAll = new Node("union all operation")
        unionAll.append(current)
        unionAll.append(r.consume())
        unionAll.append(r.consume())
        current = unionAll
      } else if (r.peekIf(Keyword.UNION)) {
        const union = new Node("union operation")
        union.append(current)
        union.append(r.consume())
        current = union
      } else if (r.peekIf(Keyword.INTERSECT)) {
        const intersect = new Node("intersect operation")
        intersect.append(current)
        intersect.append(r.consume())
        current = intersect
      } else if (r.peekIf(Keyword.EXPECT)) {
        const expect = new Node("expect operation")
        expect.append(current)
        expect.append(r.consume())
        current = expect
      } else {
        break
      }
    } while(!r.peek().eos)
    node.append(current)

    if (r.peekIf(Keyword.ORDER)) {
      node.append(this.orderByClause(r))
    }
    if (r.peekIf(Keyword.LIMIT)) {
      node.append(this.limitClause(r))
    }
    return node
  }

  private selectClause(r: TokenReader) {
    const node = new Node("select clause")
    if (r.peekIf(Keyword.VALUES)) {
      node.name = "values clause"
      node.append(r.consume(Keyword.VALUES))
      const exprs = new Node("expression list")
      exprs.append(r.consume(TokenType.LeftParen))
      do {
        exprs.append(this.expression(r))
        if (r.peekIf(TokenType.Comma)) {
          exprs.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      exprs.append(r.consume(TokenType.RightParen))
      node.append(exprs)
    } else {
      node.append(r.consume(Keyword.SELECT))
      if (r.peekIf(Keyword.DISTINCT)) {
        node.append(new Node("distinct option").append(r.consume()))
      } else if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("all option").append(r.consume()))
      }
      node.append(this.selectColumns(r))

      if (r.peekIf(Keyword.FROM)) {
        node.append(this.fromClause(r))
      }
      if (r.peekIf(Keyword.WHERE)) {
        node.append(this.whereClause(r))
      }
      if (r.peekIf(Keyword.GROUP)) {
        node.append(this.gropuByClause(r))
      }
      if (r.peekIf(Keyword.HAVING)) {
        node.append(this.havingClause(r))
      }
      if (r.peekIf(Keyword.WINDOW)) {
        node.append(this.windowClause(r))
      }
    }
    return node
  }

  private withClause(r: TokenReader) {
    const node = new Node("with clause")
    node.append(r.consume(Keyword.WITH))

    if (r.peekIf(Keyword.RECURSIVE)) {
      node.append(new Node("recursive option").append(r.consume()))
    }

    do {
      const table = new Node("common table")
      table.append(this.identifier(r, "object name"))
      if (r.peekIf(TokenType.LeftParen)) {
        const columns = new Node("column list")
        columns.append(r.consume())
        do {
          columns.append(this.identifier(r, "column name"))
          if (r.peekIf(TokenType.Comma)) {
            columns.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        columns.append(r.consume(TokenType.RightParen))
        table.append(columns)
      }
      table.append(r.consume(Keyword.AS))

      if (r.peekIf(Keyword.MATERIALIZED) || r.peekIf(Keyword.NOT, Keyword.MATERIALIZED)) {
        let materialized = new Node("materialized option")
        if (r.peekIf(Keyword.NOT)) {
          materialized.name = "not materialized option"
          materialized.append(r.consume())
        }
        materialized.append(r.consume())
        table.append(materialized)
      }

      table.append(r.consume(TokenType.LeftParen))
      table.append(this.selectStatement(r))
      table.append(r.consume(TokenType.RightParen))
      node.append(table)

      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private selectColumns(r: TokenReader) {
    const node = new Node("select column list") 
    do {
      const column = new Node("select column")
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        column.append(new Node("all columns expression")
          .append(r.consume())
        )
      } else if (r.peekIf(
        [TokenType.String, TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
        TokenType.Dot, 
        { type: TokenType.Operator, text: "*" }
      )) {
        column.append(new Node("all columns expression")
          .append(this.identifier(r, "schema name"))
          .append(r.consume())
          .append(r.consume())
        )
      } else {
        column.append(this.expression(r))
        if (r.peekIf(Keyword.AS)) {
          column.append(r.consume())
          column.append(this.identifier(r, "column alias"))
        } else if (r.peekIf(
          [TokenType.String, TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
        )) {
          column.append(this.identifier(r, "column alias"))
        }
      }
      node.append(column)
      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private fromClause(r: TokenReader) {
    const node = new Node("from clause")
    node.append(r.consume(Keyword.FROM))
    let hasJoinClause = false
    do {
      const table = new Node("object reference")
      if (r.peekIf(TokenType.LeftParen)) {
        table.name = "subquery"
        table.append(r.consume())
        if (r.peekIf(Keyword.WITH) || r.peekIf(Keyword.SELECT)) {
          table.append(this.selectStatement(r))
          table.append(r.consume(TokenType.RightParen))
        } else {
          table.append(this.fromClause(r))
          table.append(r.consume(TokenType.RightParen))
        }
      } else {
        const ident = this.identifier(r, "object name")
        table.append(ident)
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "schema name"
          table.append(r.consume())
          table.append(this.identifier(r, "object name"))
        }
        if (r.peekIf(TokenType.LeftParen)) {
          table.name = "table function"
          table.append(r.consume())
          while (!r.peekIf(TokenType.RightParen)) {
            const arg = new Node("function arg")
            arg.append(this.expression(r))
            table.append(arg)
            if (r.peekIf(TokenType.Comma)) {
              table.append(r.consume())
            } else {
              break
            }
          }
          table.append(r.consume(TokenType.RightParen))
        }
      }
      if (r.peekIf(Keyword.AS)) {
        table.append(r.consume())
        table.append(this.identifier(r, "object alias"))
      } else if (r.peekIf(
        [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
      )) {
        table.append(this.identifier(r, "object alias"))
      }
      while (r.peekIf(
        [Keyword.NATURAL, Keyword.JOIN, Keyword.CROSS, Keyword.INNER, Keyword.LEFT, Keyword.RIGHT, Keyword.FULL]
      )) {
        hasJoinClause = true
        table.append(this.joinClause(r))
      }
      node.append(table)

      if (!hasJoinClause && r.consume(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private joinClause(r: TokenReader) {
    const node = new Node("inner join clause")
    if (r.peekIf(Keyword.CROSS)) {
      node.name = "cross join clause"
      node.append(r.consume())
    } else {
      if (r.peekIf(Keyword.NATURAL)) {
        node.append(new Node("natual option")
          .append(r.consume())
        )
      }
      if (r.peekIf(Keyword.LEFT)) {
        node.name = "left outer join clause"
        node.append(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.append(r.consume())
        }
      } else if (r.peekIf(Keyword.RIGHT)) {
        node.name = "right outer join clause"
        node.append(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.append(r.consume())
        }
      } else if (r.peekIf(Keyword.FULL)) {
        node.name = "full outer join clause"
        node.append(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.append(r.consume())
        }
      } else if (r.peekIf(Keyword.INNER)) {
        node.append(r.consume())
      }
    }
    node.append(r.consume(Keyword.JOIN))

    const ident = this.identifier(r, "object name")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "schema name"
      node.append(r.consume())
      node.append(this.identifier(r, "object name"))
    }

    if (r.peekIf(Keyword.AS)) {
      node.append(r.consume())
      node.append(this.identifier(r, "object alias"))
    } else if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
    )) {
      node.append(this.identifier(r, "object alias"))
    }
    
    if (r.peekIf(Keyword.ON)) {
      node.append(new Node("join on clause")
        .append(r.consume())
        .append(this.expression(r))
      )
    } else if (r.peekIf(Keyword.USING)) {
      node.append(new Node("using clause")
        .append(r.consume())
        .append(r.consume(TokenType.LeftParen))
        .append(r.consume(TokenType.RightParen))
      )
    }
    return node
  }

  private whereClause(r: TokenReader) {
    const node = new Node("where clause")
    node.append(r.consume(Keyword.WHERE))
    node.append(this.expression(r))
    return node
  }

  private gropuByClause(r: TokenReader) {
    const node = new Node("group by clause")
      .append(r.consume(Keyword.GROUP))
      .append(r.consume(Keyword.BY))
    do {
      node.append(this.expression(r))
      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while(!r.peek().eos)
    return node
  }

  private havingClause(r: TokenReader) {
    const node = new Node("having clause")
      .append(r.consume(Keyword.HAVING))
      .append(this.expression(r))
    return node
  }

  private windowClause(r: TokenReader) {
    const node = new Node("window clause")
      .append(r.consume(Keyword.WINDOW))
    do {
      node.append(this.identifier(r, "window name"))
        .append(r.consume(Keyword.AS))
        .append(this.window(r))
      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private window(r: TokenReader) {
    const node = new Node("window")
    if (!r.peekIf(Keyword.PARTITION)) {
      node.append(this.identifier(r, "base window name"))
    }
    if (r.peekIf(Keyword.PARTITION)) {
      node.append(this.partitionByClause(r))
    }
    if (r.peekIf(Keyword.ORDER)) {
      node.append(this.orderByClause(r))
    }
    const frame = new Node("window frame clause")
    if (r.peekIf(Keyword.RANGE)) {
      frame.append(new Node("range option")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.ROWS)) {
      frame.append(new Node("rows option")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.GROUPS)) {
      frame.append(new Node("groups option")
        .append(r.consume())
      )
    }
    if (r.peekIf(Keyword.CURRENT)) {
      frame.append(new Node("window frame start clause")
        .append(new Node("current row option")
          .append(r.consume())
          .append(r.consume(Keyword.ROW))
        )
      )
    } else if (r.peekIf(Keyword.UNBOUNDED)) {
      frame.append(new Node("window frame start clause")
        .append(new Node("unbounded preceding option")
          .append(r.consume())
          .append(r.consume(Keyword.PRECEDING))
        )
      )
    } else if (r.peekIf(Keyword.BETWEEN)) {
      frame.append(r.consume())
      {
        const start = new Node("window frame start clause")
          .append(r.consume())
        if (r.peekIf(Keyword.CURRENT)) {
          start.append(new Node("current row option")
            .append(r.consume())
            .append(r.consume(Keyword.ROW))
          )
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          start.append(new Node("unbounded preceding option")
            .append(r.consume(),)
            .append(r.consume(Keyword.PRECEDING))
          )
        } else {
          const expr = this.expression(r)
          if (r.peekIf(Keyword.PRECEDING)) {
            start.append(new Node("preceding expression")
              .append(expr)
              .append(r.consume())
            )
          } else if (r.peekIf(Keyword.FOLLOWING)) {
            start.append(new Node("following expression")
              .append(expr)
              .append(r.consume())
            )
          } else {
            throw r.createParseError()
          }
        }
        frame.append(start)
      }
      frame.append(r.consume(Keyword.AND))
      {
        const end = new Node("window frame end clause")
        end.append(r.consume())
        if (r.peekIf(Keyword.CURRENT)) {
          end.append(new Node("current row option").append(
            r.consume(),
            r.consume(Keyword.ROW),
          ))
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          end.append(new Node("unbounded following option").append(
            r.consume(),
            r.consume(Keyword.FOLLOWING),
          ))
        } else {
          const expr = this.expression(r)
          if (r.peekIf(Keyword.PRECEDING)) {
            end.append(new Node("preceding option").append(
              expr,
              r.consume(),
            ))
          } else if (r.peekIf(Keyword.FOLLOWING)) {
            end.append(new Node("following option").append(
              expr,
              r.consume(),
            ))
          } else {
            throw r.createParseError()
          }
        }
        frame.append(end)
      }
    } else {
      frame.append(new Node("window frame start clause")
        .append(new Node("preceding option")
          .append(this.expression(r))
          .append(r.consume(Keyword.PRECEDING))
        )
      )
    }
    node.append(frame)
    if (r.peekIf(Keyword.EXCLUDE)) {
      const exclude = new Node("window frame exclude clause")
      exclude.append(r.consume())
      if (r.peekIf(Keyword.NO)) {
        exclude.append(new Node("no others option")
          .append(r.consume())
          .append(r.consume(Keyword.OTHERS))
        )
      } else if (r.peekIf(Keyword.CURRENT)) {
        exclude.append(new Node("current row option")
          .append(r.consume())
          .append(r.consume(Keyword.ROW))
        )
      } else if (r.peekIf(Keyword.GROUP)) {
        exclude.append(new Node("group option")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.TIES)) {
        exclude.append(new Node("ties option")
          .append(r.consume())
        )
      } else {
        throw r.createParseError()
      }
      node.append(exclude)
    }
    return node
  }

  private partitionByClause(r: TokenReader) {
    const node = new Node("partition by clause")
      .append(r.consume(Keyword.PARTITION))
      .append(r.consume(Keyword.BY))
    do {
      node.append(this.expression(r))
      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while(!r.peek().eos)
    return node
  }

  private returingClause(r: TokenReader) {
    const node = new Node("returning clause")
      .append(r.consume(Keyword.RETURNING))
      .append(this.selectColumns(r))
    return node
  }

  private orderByClause(r: TokenReader) {
    const node = new Node("order by clause")
      .append(r.consume(Keyword.ORDER))
      .append(r.consume(Keyword.BY))
    do {
      const column = this.sortingColumn(r)
      if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
        column.append(new Node("nulls first option")
          .append(r.consume())
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
        column.append(new Node("nulls last option")
          .append(r.consume())
          .append(r.consume())
        )
      }
      node.append(column)

      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)
    return node
  }

  private limitClause(r: TokenReader) {
    const node = new Node("limit clause")
      .append(r.consume(Keyword.LIMIT))
    const limit = new Node("limit expression")
      .append(this.expression(r))
    node.append(limit)
    if (r.peekIf(Keyword.OFFSET)) {
      node.append(new Node("offset expression")
        .append(r.consume())
        .append(this.expression(r))
      )
    } else if (r.peekIf(TokenType.Comma)) {
      limit.name = "offset expression"
      node.append(r.consume())
      node.append(new Node("limit expression")
        .append(this.expression(r))
      )
    }
    return node
  }

  private tableColumn(r: TokenReader) {
    const node = new Node("table column")
      .append(this.identifier(r, "column name"))

    if (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      const columnType = new Node("column type")
      columnType.append(this.typeName(r))
      if (r.peekIf(TokenType.LeftParen)) {
        columnType.append(r.consume())
        columnType.append(new Node("length option").append(this.numericLiteral(r)))
        if (r.peekIf(TokenType.Comma)) {
          columnType.append(r.consume())
          columnType.append(new Node("scale option").append(this.numericLiteral(r)))
        }
        columnType.append(r.consume(TokenType.RightParen))
      }
      node.append(columnType)
    }

    while (!r.peekIf([TokenType.Comma, TokenType.RightParen])) {
      node.append(this.columnConstraint(r))
    }

    return node
  }

  private columnConstraint(r: TokenReader) {
    const node = new Node("column constraint")
    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.append(r.consume())
      node.append(this.identifier(r, "constraint name"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const pkey = new Node("primary key constraint")
      pkey.append(r.consume())
      pkey.append(r.consume(Keyword.KEY))

      if (r.peekIf(Keyword.ASC)) {
        pkey.append(new Node("asc option").append(r.consume()))
      } else if (r.peekIf(Keyword.DESC)) {
        pkey.append(new Node("desc option").append(r.consume()))
      }
      if (r.peekIf(Keyword.ON)) {
        pkey.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      if (r.peekIf(Keyword.AUTOINCREMENT)) {
        pkey.append(new Node("autoincrement option").append(r.consume()))
      }
      node.append(pkey)
    } else if (r.peekIf(Keyword.NOT)) {
      const notNull = new Node("not null constraint")
      notNull.append(r.consume())
      notNull.append(r.consume(Keyword.NULL))
      if (r.peekIf(Keyword.ON)) {
        notNull.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(notNull)
    } else if (r.peekIf(Keyword.NULL)) {
      const nullable = new Node("null constraint")
      nullable.append(r.consume())
      if (r.peekIf(Keyword.ON)) {
        nullable.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(nullable)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("unique constraint")
      unique.append(r.consume())
      if (r.peekIf(Keyword.ON)) {
        unique.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(unique)
    } else if (r.peekIf(Keyword.CHECK)) {
      const check = new Node("check constraint")
      check.append(r.consume())
      check.append(r.consume(TokenType.LeftParen))
      check.append(this.expression(r))
      check.append(r.consume(TokenType.RightParen))
      node.append(check)
    } else if (r.peekIf(Keyword.DEFAULT)) {
      const def = new Node("default option")
      def.append(r.consume())
      if (r.peekIf(TokenType.LeftParen)) {
        def.append(r.consume())
        def.append(this.expression(r))
        def.append(r.consume(TokenType.RightParen))
      } else {
        def.append(this.expression(r))
      }
      node.append(def)
    } else if (r.peekIf(Keyword.COLLATE)) {
      const collate = new Node("collate option")
      collate.append(r.consume())
      collate.append(this.identifier(r, "collate name"))
      node.append(collate)
    } else if (r.peekIf(Keyword.REFERENCES)) {
      const refs = new Node("references constraint")
      refs.append(r.consume())
      refs.append(this.identifier(r, "object name"))
      refs.append(r.consume(TokenType.LeftParen))
      do {
        refs.append(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          refs.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      refs.append(r.consume(TokenType.RightParen))
      node.append(refs)
    } else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
      const genAlways = new Node("generated column option")
      if (r.peekIf(Keyword.GENERATED)) {
        genAlways.append(r.consume())
        genAlways.append(r.consume(Keyword.ALWAYS))
      }
      genAlways.append(r.consume(Keyword.AS))
      genAlways.append(r.consume(TokenType.LeftParen))
      genAlways.append(this.expression(r))
      genAlways.append(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.STORED)) {
        genAlways.append(new Node("stored option").append(r.consume()))
      } else if (r.peekIf(Keyword.VIRTUAL)) {
        genAlways.append(new Node("virtual option").append(r.consume()))
      }
      node.append(genAlways)
    } else {
      throw r.createParseError()
    }

    return node
  }

  private tableConstraint(r: TokenReader) {
    const node = new Node("table constraint")

    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.append(r.consume())
      node.append(this.identifier(r, "constraint name"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const pkey = new Node("primary key constraint")
      pkey.append(r.consume())
      pkey.append(r.consume(Keyword.KEY))
      pkey.append(r.consume(TokenType.LeftParen))
      do  {
        pkey.append(this.sortingColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          pkey.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      pkey.append(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON)) {
        pkey.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(pkey)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("unique constraint")
      unique.append(r.consume())
      unique.append(r.consume(TokenType.LeftParen))
      do {
        unique.append(this.sortingColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          unique.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      unique.append(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.ON)) {
        unique.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(unique)
    } else if (r.peekIf(Keyword.CHECK)) {
      const check = new Node("check constraint")
      check.append(r.consume())
      check.append(r.consume(TokenType.LeftParen))
      check.append(this.expression(r))
      check.append(r.consume(TokenType.RightParen))
      node.append(check)
    } else if (r.peekIf(Keyword.FOREIGN)) {
      const fkey = new Node("foreign key constraint")
      fkey.append(r.consume())
      fkey.append(r.consume(Keyword.KEY))
      fkey.append(r.consume(TokenType.LeftParen))
      do {
        fkey.append(this.identifier(r, "column name"))
        if (r.peekIf(TokenType.Comma)) {
          fkey.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      fkey.append(r.consume(TokenType.RightParen))
      node.append(fkey)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private typeName(r: TokenReader) {
    const node = this.identifier(r, "type name")
    while (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue, TokenType.String])) {
      const ident = this.identifier(r, "")
      node.append(...ident.children)
      node.value = " " + ident.value
    }
    return node
  }

  private conflictAction(r: TokenReader, prefix?: Token[]) {
    const node = new Node("")
    if (prefix) {
      node.append(...prefix)
    }
    if (r.peekIf(Keyword.ROLLBACK)) {
      node.name = "rollback option"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.ABORT)) {
      node.name = "abort option"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.FAIL)) {
      node.name = "fail option"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.IGNORE)) {
      node.name = "ignore option"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.REPLACE)) {
      node.name = "replace option"
      node.append(r.consume())
    } else {
      throw r.createParseError()
    }
    return node
  }

  private pragmaValue(r: TokenReader) {
    const node = new Node("pragma value")
    if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
      const token1 = r.consume()
      node.append(token1)
      const token2 = r.consume(TokenType.Numeric)
      node.append(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else if (r.peekIf(TokenType.Numeric)) {
      const token = r.consume()
      node.append(token)
      node.value = new Decimal(token.text).toString()
    } else if (r.peekIf([TokenType.String, TokenType.QuotedValue])) {
      const token = r.consume()
      node.append(token)
      node.value = dequote(token.text)
    } else if (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      const token = r.consume()
      node.append(token)
      node.value = token.text
    } else {
      throw r.createParseError()
    }
    return node
  }

  private expression(r: TokenReader, priority = 0) {
    let node
    if (priority < 9 && r.peekIf(Keyword.NOT)) {
      node = new Node("not operation").append(r.consume())
      node.append(this.expression(r, 9))
    } else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
      node = new Node("bitwise not operation").append(r.consume())
      node.append(this.expression(r))
    } else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
      node = new Node("unary plus operation").append(r.consume())
      node.append(this.expression(r))
    } else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
      node = new Node("unary minus operation").append(r.consume())
      node.append(this.expression(r))
    } else {
      node = this.expressionValue(r)
    }

    while (!r.peek().eos) {
      if (priority < 11 && r.peekIf(Keyword.OR)) {
        node = new Node("or operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 11))
      } else if (priority < 10 && r.peekIf(Keyword.AND)) {
        node = new Node("and operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 10))
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: [ "=", "==" ] })) {
        node = new Node("equal operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: [ "<>", "!=" ] })) {
        node = new Node("not equal operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.IS)) {
        const prefix = [ r.consume() ]
        if (r.peekIf(Keyword.NOT)) {
          prefix.push(r.consume())
          if (r.peekIf(Keyword.DISTINCT)) {
            node = new Node("is not distinct from operation").append(node)
            node.append(...prefix)
            node.append(r.consume())
            node.append(r.consume(Keyword.FROM))
          } else {
            node = new Node("is not operation").append(node)
            node.append(...prefix)
            node.append(r.consume())
          }
        } else if (r.peekIf(Keyword.DISTINCT)) {
          node = new Node("is distinct from operation").append(node)
          node.append(...prefix)
          node.append(r.consume())
          node.append(r.consume(Keyword.FROM))
        } else {
          node = new Node("is operation").append(node)
          node.append(...prefix)
        }
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.BETWEEN) || r.peekIf(Keyword.NOT, Keyword.BETWEEN)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("not between operation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("between operation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
        node.append(r.consume(Keyword.AND))
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.IN) || r.peekIf(Keyword.NOT, Keyword.IN)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("not in operation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("in operation").append(node)
        }
        node.append(r.consume())
        if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.SELECT])) {
          const subquery = new Node("subquery")
          subquery.append(r.consume())
          subquery.append(this.selectStatement(r))
          subquery.append(r.consume(TokenType.RightParen))
          node.append(subquery)
        } else if (r.peekIf(TokenType.LeftParen)) {
          const exprs = new Node("expression list")
          exprs.append(r.consume())
          while (!r.peek().eos) {
            exprs.append(this.expression(r))
            if (r.peekIf(TokenType.Comma)) {
              exprs.append(r.consume())
            } else {
              break
            }
          }
          exprs.append(r.consume(TokenType.RightParen))
          node.append(exprs)
        } else if (r.peekIf(
          [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
          TokenType.LeftParen
        )) {
          node = new Node("function")
          node.append(new Node("object name").append(r.consume()))
          const args = new Node("function arguments")
          args.append(r.consume(TokenType.LeftParen))
          while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
            const arg = new Node("function argument")
            arg.append(this.expression(r))
            args.append(arg)
            if (r.peekIf(TokenType.Comma)) {
              args.append(r.consume())
            } else {
              break
            }
          }
          args.append(r.consume(TokenType.RightParen))
          node.append(args)
        } else if (r.peekIf([
          TokenType.String,
          TokenType.Identifier,
          TokenType.QuotedIdentifier,
          TokenType.QuotedValue
        ])) {
          node.append(this.columnReference(r))
        } else {
          throw r.createParseError()
        }
      } else if (priority < 8 && r.peekIf(Keyword.MATCH) || r.peekIf(Keyword.NOT, Keyword.MATCH)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("not match operation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("match operation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("not like operation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("like operation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
        if (r.peekIf(Keyword.ESCAPE)) {
          node.append(new Node("escape").append(this.expression(r, 6)))
        }
      } else if (priority < 8 && r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("not regexp operation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("regexp operation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("not glob operation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("glob operation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.ISNULL)) {
        node = new Node("is null operation").append(node)
        node.append(r.consume())
      } else if (priority < 8 && r.peekIf(Keyword.NOTNULL)) {
        node = new Node("is not null operation").append(node)
        node.append(r.consume())
      } else if (priority < 8 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
        node = new Node("is not null operation").append(node)
        node.append(r.consume())
        node.append(r.consume())
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<"})) {
        node = new Node("less than operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">"})) {
        node = new Node("greater than operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<="})) {
        node = new Node("less than or equal operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">="})) {
        node = new Node("greater than or equal operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "&"})) {
        node = new Node("bitwise and operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "|"})) {
        node = new Node("bitwise or operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "<<"})) {
        node = new Node("bitwise left shift operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: ">>"})) {
        node = new Node("bitwise right shift operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
        node = new Node("add operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 4))
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
        node = new Node("subtract operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 4))
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "*" })) {
        node = new Node("multiply operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 3))
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "/" })) {
        node = new Node("divide operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 3))
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "%" })) {
        node = new Node("modulo operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 3))
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "||" })) {
        node = new Node("concatenate operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 2))
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->" })) {
        node = new Node("json extract operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 2))
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->>" })) {
        node = new Node("json extract and unquote operation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 2))
      } else if (priority < 1 && r.peekIf(Keyword.COLLATE)) {
        node = new Node("collate operation").append(node)
        node.append(r.consume())
        node.append(this.identifier(r, "collation name"))
      } else {
        break
      }
    }
    return node
  }

  private expressionValue(r: TokenReader) {
    let node
    if (r.peekIf(Keyword.NULL)) {
      node = new Node("null literal")
      node.append(r.consume())
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      node = this.booleanLiteral(r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      node =  new Node("function")
      const token = r.consume()
      node.append(new Node("object name", token.text.toUpperCase()).append(token))
    } else if (r.peekIf(Keyword.CASE)) {
      node = new Node("case expression")
      node.append(r.consume())
      if (!r.peekIf(Keyword.WHEN)) {
        const target = new Node("target expression")
        target.append(this.expression(r))
        node.append(target)
      }
      do {
        const when = new Node("when clause")
        when.append(r.consume(Keyword.WHEN))
        const condition = new Node("condition expression")
        condition.append()
        when.append(this.expression(r))
        when.append(r.consume(Keyword.THEN))
        const result = new Node("result expression")
        result.append(this.expression(r))
        when.append(result)
        node.append(when)
      } while (!r.peek().eos)
      if (r.peekIf(Keyword.ELSE)) {
        const els = new Node("else clause")
        els.append(r.consume())
        const result = new Node("result expression")
        result.append(this.expression(r))
        els.append(result)
        node.append(els)
      }
      node.append(r.consume(Keyword.END))
    } else if (r.peekIf(Keyword.CAST)) {
      node = new Node("function")
      const token = r.consume()
      node.append(new Node("object name", token.text.toUpperCase()).append(token))
      const args = new Node("function arguments")
      args.append(r.consume(TokenType.LeftParen))

      const arg = new Node("function argument")
      arg.append(this.expression(r))
      arg.append(r.consume(Keyword.AS))
      arg.append(this.typeName(r))

      args.append(arg)
      args.append(r.consume(TokenType.RightParen))
      node.append(args)
    } else if (r.peekIf(Keyword.RAISE)) {
      node = new Node("function")
      const token = r.consume()
      node.append(new Node("object name", token.text.toUpperCase()).append(token))
      const args = new Node("function arguments")
      args.append(r.consume(TokenType.LeftParen))
      args.append(new Node("function argument").append(this.conflictAction(r)))
      args.append(r.consume(TokenType.Comma))
      args.append(new Node("function argument").append(this.expression(r)))
      args.append(r.consume(TokenType.RightParen))
      node.append(args)
    } else if (r.peekIf(Keyword.EXISTS)) {
      node = new Node("exists operation")
      node.append(r.consume())
      node.append(r.consume(TokenType.LeftParen))
      node.append(this.selectStatement(r))
      node.append(r.consume(TokenType.RightParen))
    } else if (r.peekIf(TokenType.LeftParen)) {
      node = new Node("expression")
      node.append(r.consume())
      if (r.peekIf(Keyword.WITH) || r.peekIf(Keyword.SELECT)) {
        node.name = "subquery"
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      } else {
        node.append(this.expression(r))
        if (r.peekIf(TokenType.Comma)) {
          node.name = "expression list"
          node.append(r.consume())
          do {
            node.append(this.expression(r))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
        }
      }
      node.append(r.consume(TokenType.RightParen))
    } else if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue],
      TokenType.LeftParen
    )) {
      node = new Node("function")
      node.append(new Node("object name").append(r.consume()))

      const args = new Node("function arguments")
      args.append(r.consume(TokenType.LeftParen))
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        const arg = new Node("function argument")
        arg.append(new Node("all columns reference").append(r.consume()))
        args.append(arg)
      } else {
        if (r.peekIf(Keyword.DISTINCT)) {
          args.append(new Node("distinct option").append(r.consume()))
        }
        while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
          const arg = new Node("function argument")
          arg.append(this.expression(r))
          args.append(arg)
          if (r.peekIf(TokenType.Comma)) {
            args.append(r.consume())
          } else {
            break
          }
        }
      }
      args.append(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.FILTER)) {
        node.append(new Node("filter clause")
          .append(r.consume())
          .append(r.consume(TokenType.LeftParen))
          .append(this.whereClause(r))
          .append(r.consume(TokenType.RightParen))
        )
      }
      if (r.peekIf(Keyword.OVER)) {
        const over = new Node("over clause")
          .append(r.consume())
        if (r.peekIf(TokenType.LeftParen)) {
          over.append(r.consume())
          over.append(this.window(r))
          over.append(r.consume(TokenType.RightParen))
        } else {
          over.append(this.identifier(r, "window name"))
        }
        node.append(over)
      }
      node.append(args)
    } else if (
      r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])
      || r.peekIf(TokenType.String, TokenType.Dot)
    ) {
      node = this.columnReference(r)
    } else if (r.peekIf(Keyword.BindVariable)) {
      const token = r.consume()
      if (token.text.startsWith("?")) {
        let value = token.text.substring(1)
        if (value) {
          r.state.bindPosition = Number.parseInt(value, 10)
        } else {
          const pos = r.state.bindPosition ? r.state.bindPosition + 1 : 1
          value = "${pos}"
          r.state.bindPosition = pos
        }
        node = new Node("positional bind variable", value)
      } else {
        node = new Node("named bind variable", token.text.substring(1))
      }
      node.append(token)
    } else if (r.peekIf(TokenType.Numeric)) {
      node = this.numericLiteral(r)
    } else if (r.peekIf(TokenType.String)) {
      node = this.stringLiteral(r)
    } else if (r.peekIf(TokenType.Blob)) {
      node = this.blobLiteral(r)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private sortingColumn(r: TokenReader) {
    const node = new Node("sorting column")
    const mark = r.pos
    const expr = this.expression(r)
    if (expr.children.length === 1) {
      r.pos = mark
      node.append(this.identifier(r, "column name"))
    } else {
      node.append(expr)
    }
    if (r.peekIf(Keyword.COLLATE)) {
      node.append(r.consume())
      node.append(this.identifier(r, "collation name"))
    }
    if (r.peekIf(Keyword.ASC)) {
      node.append(new Node("asc option").append(r.consume()))
    } else if (r.peekIf(Keyword.DESC)) {
      node.append(new Node("desc option").append(r.consume()))
    }
    return node
  }

  private columnReference(r: TokenReader) {
    const node = new Node("column reference")
    const ident1 = this.identifier(r, "column name")
    if (r.peekIf(TokenType.Dot)) {
      const dot1 = r.consume()
      const ident2 = this.identifier(r, "column name")
      if (r.peekIf(TokenType.Dot)) {
        ident2.name = "schema name"
        node.append(ident1)
        node.append(dot1)
        ident2.name = "object name"
        node.append(ident2)
        node.append(dot1)
        node.append(this.identifier(r, "column name"))
      } else {
        ident1.name = "object name"
        node.append(ident1)
        node.append(dot1)
        node.append(ident2)
      }
    } else {
      node.append(ident1)
    }
    return node
  }
  
  private identifier(r: TokenReader, name: string) {
    const node = new Node(name)
    if (r.peekIf(TokenType.Identifier)) {
      node.append(r.consume())
      node.value = r.peek(-1).text
    } else if (r.peekIf([TokenType.String, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      node.append(r.consume())
      node.value = dequote(r.peek(-1).text)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private numericLiteral(r: TokenReader) {
    const node = new Node("numeric literal")
    if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
      const token1 = r.consume()
      node.append(token1)
      const token2 = r.consume(TokenType.Numeric)
      node.value = new Decimal(token1.text + token2.text).toString()
      node.append(token2)
    } else {
      const token = r.consume(TokenType.Numeric)
      node.value = token.text.toLowerCase()
      node.append(token)
    }
    return node
  }

  private stringLiteral(r: TokenReader) {
    const node = new Node("string literal")
    const token = r.consume(TokenType.String)
    node.value = dequote(token.text)
    node.append(token)
    return node
  }

  private blobLiteral(r: TokenReader) {
    const node = new Node("blob literal")
    const token = r.consume(TokenType.Blob)
    node.value = token.text.substring(2, token.text.length-1).toUpperCase()
    node.append(token)
    return node
  }

  private booleanLiteral(r: TokenReader) {
    const node = new Node("boolean literal")
    if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      const token = r.consume()
      node.value = token.text.toUpperCase()
      node.append(token)
    } else {
      throw r.createParseError()
    }
    return node
  }
}
