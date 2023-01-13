import Decimal from "decimal.js"
import {
  TokenType,
  Token,
  Keyword,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser"
import { dequote } from "../util"
import { Sqlite3Lexer } from "./sqlite3_lexer"

export class Sqlite3Parser extends Parser {
  constructor(
    options: Record<string, any> = {},
  ) {
    super(options, options.lexer ?? new Sqlite3Lexer(options))
  }

  processTokens(tokens: Token[]): Node {
    const r = new TokenReader(tokens)

    const script = new Node("Script")
    const errors = []

    while (r.peek()) {
      try {
        if (r.peekIf(TokenType.SemiColon) || r.peekIf(TokenType.Eof)) {
          script.append(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          script.append(this.command(r))
        } else {
          script.append(this.Statement(r))
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            script.append(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (r.peek() != null) {
      for (let i = r.pos; i < r.tokens.length; i++) {
        script.append(r.tokens[i])
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
      err.node = script
      throw err
    }

    return script
  }

  private command(r: TokenReader) {
    const stmt = new Node("CommandStatement")
    const command = r.consume(TokenType.Command)
    stmt.append(new Node("CommandName", command.text)
      .append(command)
    )
    const args = new Node("CommandArgumentList")
    while (r.peek()) {
      const arg = r.consume()
      args.append(new Node("CommandArgument", dequote(arg.text))
        .append(arg)
      )
      if (!r.peek().eos) {
        break
      }
    }
    if (args.children.length > 0) {
      stmt.append(args)
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
        explain = new Node("ExplainStatement")
          .append(r.consume())
        if (r.peekIf(Keyword.QUERY)) {
          explain.append(new Node("QueryPlanClause")
            .append(r.consume())
            .append(r.consume(Keyword.PLAN))
          )
        }
      }

      if (r.peekIf(Keyword.CREATE)) {
        const mark = r.pos
        r.consume()
        while (!r.peek().eos && !this.lexer.isObjectStart(r.peek().keyword)) {
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
      if (r.peekIf(TokenType.SemiColon)) {
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
          stmt = new Node("Unknown")
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
    const node = new Node("CreateTableStatement")
    let virtual = false
    
    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
      node.append(new Node("TemporaryOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.VIRTUAL)) {
      node.append(new Node("VirtualOption")
        .append(r.consume())
      )
      virtual = true
    }
    node.append(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfNotExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    if (virtual) {
      node.append(r.consume(Keyword.USING))

      const module = new Node("Module")
      module.append(this.identifier(r, "ModuleName"))
      if (r.peekIf(TokenType.LeftParen)) {
        const args = new Node("ModuleArgumentList")
        args.append(r.consume())
        do {
          const arg = new Node("ModuleArgument")
          do {
            arg.append(r.consume())
          } while (!r.peek().eos
            && !r.peekIf([
              TokenType.RightParen, 
              TokenType.Comma
            ])
          )
          args.append(arg)

          if (r.peekIf(TokenType.Comma)) {
            args.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        args.append(r.consume(TokenType.RightParen))
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
        node.append(new Node("WithoutRowidOption")
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
    const node = new Node("CreateViewStatement")

    node.append(r.consume(Keyword.CREATE))
    if (
      r.peekIf(Keyword.TEMPORARY) ||
      r.peekIf(Keyword.TEMP)
    ) {
      node.append(new Node("TemporaryOption")
        .append(r.consume())
      )
    }
    node.append(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfNotExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    node.append(r.consume(Keyword.AS))

    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("ColumnList")
        .append(r.consume())
      do {
        columns.append(this.identifier(r, "ColumnName"))
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
    const node = new Node("CreateTriggerStatement")

    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
      node.append(new Node("TemporaryOption")
        .append(r.consume())
      )
    }
    node.append(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfNotExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    if (r.peekIf(Keyword.BEFORE)) {
      node.append(new Node("BeforeOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.AFTER)) {
      node.append(new Node("AfterOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.INSTEAD)) {
      node.append(new Node("InsteadOfOption")
        .append(r.consume())
        .append(r.consume(Keyword.OF))
      )
    }

    if (r.peekIf(Keyword.INSERT)) {
      node.append(new Node("InsertOnClause")
        .append(r.consume())
        .append(r.consume(Keyword.ON))
        .append(this.identifier(r, "TargetObjectName"))
      )
    } else if (r.peekIf(Keyword.UPDATE)) {
      const updateOn = new Node("UpdateOnClause")
        .append(r.consume())
      if (r.peekIf(Keyword.OF)) {
        const columns = new Node("ColumnList")
          .append(r.consume())
        do {
          columns.append(this.identifier(r, "ColumnName"))
          if (r.peekIf(TokenType.Comma)) {
            columns.append(r.consume())
          } else {
            break
          }
        } while(!r.peek().eos)
        updateOn.append(columns)
      }
      updateOn.append(r.consume(Keyword.ON))
      updateOn.append(this.identifier(r, "TargetObjectName"))
      node.append(updateOn)
    } else if (r.peekIf(Keyword.DELETE)) {
      node.append(new Node("DeleteOnClause")
        .append(r.consume())
        .append(r.consume(Keyword.ON))
        .append(this.identifier(r, "TargetObjectName"))
      )
    } else {
      throw r.createParseError()
    }

    if (r.peekIf(Keyword.FOR)) {
      node.append(new Node("ForEachRowOption")
        .append(r.consume())
        .append(r.consume(Keyword.EACH))
        .append(r.consume(Keyword.ROW))
      )
    }

    if (r.peekIf(Keyword.WHEN)) {
      node.append(new Node("WhenClause")
        .append(r.consume())
        .append(this.expression(r))
      )
    }

    {
      const block = new Node("BeginStatement")
      {
        const begin = new Node("BeginBlock")
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
    const node = new Node("CreateIndexStatement")

    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.UNIQUE)) {
      node.append(new Node("UniqueOption")
        .append(r.consume())
      )
    }
    node.append(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfNotExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.NOT))
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    node.append(r.consume(Keyword.ON))
    node.append(this.identifier(r, "TargetObjectName"))

    {
      const columns = new Node("SortingColumnList")
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
    const node = new Node("AlterTableStatement")
    node.append(r.consume(Keyword.ALTER))
    node.append(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
      node.append(new Node("RenameToClause")
        .append(r.consume())
        .append(r.consume())
        .append(this.identifier(r, "TargetObjectName"))
      )
    } else  if (r.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
      node.append(new Node("RenameColumnClause")
        .append(r.consume())
        .append(r.consume())
        .append(this.identifier(r, "ColumnName"))
        .append(r.consume(Keyword.TO))
        .append(this.identifier(r, "TargetColumnName"))
      )
    } else if (r.peekIf(Keyword.ADD)) {
      const addColumn = new Node("AddColumnClause")
      addColumn.append(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        addColumn.append(r.consume())
      }
      addColumn.append(this.tableColumn(r))
      node.append(addColumn)
    } else if (r.peekIf(Keyword.DROP)) {
      const dropColumn = new Node("DropColumnClause")
      dropColumn.append(r.consume())
      if (r.peekIf(Keyword.COLUMN)) {
        dropColumn.append(r.consume())
      }
      dropColumn.append(this.identifier(r, "ColumnName"))
      node.append(dropColumn)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private dropTableStatement(r: TokenReader) {
    const node = new Node("DropTableStatement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.TABLE))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    return node
  }

  private dropViewStatement(r: TokenReader) {
    const node = new Node("DropViewStatement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.VIEW))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    return node
  }

  private dropTriggerStatement(r: TokenReader) {
    const node = new Node("DropTriggerStatement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.TRIGGER))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfExistsOption")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    return node
  }

  private dropIndexStatement(r: TokenReader) {
    const node = new Node("DropIndexStatement")
    node.append(r.consume(Keyword.DROP))
    node.append(r.consume(Keyword.INDEX))

    if (r.peekIf(Keyword.IF)) {
      node.append(new Node("IfExists")
        .append(r.consume())
        .append(r.consume(Keyword.EXISTS))
      )
    }

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    return node
  }

  private attachDatabaseStatement(r: TokenReader) {
    const node = new Node("AttachDatabaseStatement")
    node.append(r.consume(Keyword.ATTACH))
    node.append(r.consume(Keyword.DATABASE))
    {
      const database = new Node("DatabaseSource")
      database.append(this.expression(r))
      node.append(database)
    }
    node.append(r.consume(Keyword.AS))
    node.append(this.identifier(r, "SchemaName"))
    return node
  }

  private detachDatabaseStatement(r: TokenReader) {
    const node = new Node("DetachDatabaseStatement")
    node.append(r.consume(Keyword.DETACH))
    node.append(r.consume(Keyword.DATABASE))
    node.append(this.identifier(r, "SchemaName"))
    return node
  }

  private analyzeStatement(r: TokenReader) {
    const node = new Node("AnalyzeStatement")
    node.append(r.consume(Keyword.ANALYZE))

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    return node
  }

  private reindexStatement(r: TokenReader) {
    const node = new Node("ReindexStatement")
    node.append(r.consume(Keyword.REINDEX))

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    return node
  }

  private vacuumStatement(r: TokenReader) {
    const node = new Node("VacuumStatement")
    node.append(r.consume(Keyword.VACUUM))

    if (r.peekIf(Keyword.TO)) {
      node.append(r.consume())
      node.append(new Node("FileName")
        .append(this.stringLiteral(r))
      )
    } else {
      node.append(this.identifier(r, "SchemaName"))
    }
    return node
  }

  private pragmaStatement(r: TokenReader) {
    const node = new Node("PragmaStatement")
    node.append(r.consume(Keyword.PRAGMA))

    const ident = this.identifier(r, "PragmaName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "PragmaName"))
    }

    if (r.peekIf({ type: TokenType.Operator, text: "=" })) {
      node.append(r.consume())
      node.append(this.pragmaValue(r, "PragmaValue"))
    } else if (r.peekIf(TokenType.LeftParen)) {
      const args = new Node("ArgumentList")
      args.append(r.consume())
      args.append(this.pragmaValue(r, "Argument"))
      args.append(r.consume(TokenType.RightParen))
    }
    return node
  }

  private beginTransactionStatement(r: TokenReader) {
    const node = new Node("BeginTransactionStatement")

    node.append(r.consume(Keyword.BEGIN))
    if (r.peekIf(Keyword.DEFERRED)) {
      node.append(new Node("DeferredOption").append(r.consume()))
    } else if (r.peekIf(Keyword.IMMEDIATE)) {
      node.append(new Node("ImmediateOption").append(r.consume()))
    } else if (r.peekIf(Keyword.EXCLUSIVE)) {
      node.append(new Node("ExclusiveOption").append(r.consume()))
    }
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.append(r.consume())
    }

    return node
  }

  private savepointStatement(r: TokenReader) {
    const node = new Node("SavepointStatement")
    node.append(r.consume(Keyword.SAVEPOINT))
    node.append(this.identifier(r, "SavepointName"))
    return node
  }

  private releaseSavepointStatement(r: TokenReader) {
    const node = new Node("ReleaseSavepointStatement")
    node.append(r.consume(Keyword.RELEASE))
    if (r.peekIf(Keyword.SAVEPOINT)) {
      node.append(r.consume())
    }
    node.append(this.identifier(r, "SavepointName"))
    return node
  }

  private commitTransactionStatement(r: TokenReader) {
    const node = new Node("CommitTransactionStatement")
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
    const node = new Node("RollbackTransactionStatement")
    node.append(r.consume(Keyword.ROLLBACK))
    if (r.peekIf(Keyword.TRANSACTION)) {
      node.append(r.consume())
    }
    if (r.peekIf(Keyword.TO)) {
      node.append(r.consume())
      if (r.peekIf(Keyword.SAVEPOINT)) {
        node.append(r.consume())
      }
      node.append(this.identifier(r, "SavepointName"))
    }
    return node
  }

  private insertStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("InsertStatement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.insertClause(r))
    return node
  }

  private insertClause(r: TokenReader) {
    const node = new Node("InsertClause")
    if (r.peekIf(Keyword.REPLACE)) {
      node.append(new Node("ReplaceOption").append(r.consume()))
    } else {
      node.append(r.consume(Keyword.INSERT))
      if (r.peekIf(Keyword.OR)) {
        node.append(this.conflictAction(r, [
          r.consume()
        ]))
      }
    }
    node.append(r.consume(Keyword.INTO))

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }
    
    if (r.peekIf(Keyword.AS)) {
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectAlias"))
    }

    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("ColumnList")
        .append(r.consume())
      do {
        columns.append(this.identifier(r, "ColumnName"))
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
      node.append(new Node("DefaultValuesOption")
        .append(r.consume())
        .append(r.consume(Keyword.VALUES))
      )
    } else {
      const values = new Node("ValuesClause")
      values.append(r.consume(Keyword.VALUES))
      {
        const exprs = new Node("ExpressionList")
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
    const node = new Node("OnConflictClause")
      .append(r.consume(Keyword.ON))
      .append(r.consume(Keyword.CONFLICT))
    if (r.peekIf(TokenType.LeftParen)) {
      const target = new Node("SortingColumnList")
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
      node.append(new Node("DoNothingOption").append(r.consume()))
    } else if (r.peekIf(Keyword.UPDATE)) {
      const update = new Node("DoUpdateOption")
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
    const node = new Node("UpdateStatement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.updateClause(r))
    return node
  }

  private updateClause(r: TokenReader) {
    const node = new Node("UpdateClause")
    node.append(r.consume(Keyword.UPDATE))

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
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
    const node = new Node("SetClause")
    node.append(r.consume(Keyword.SET))
    do {
      const column = new Node("UpdateColumn")
      if (r.peekIf(TokenType.LeftParen)) {
        const columns = new Node("ColumnList")
        columns.append(r.consume())
        do {
          columns.append(this.identifier(r, "ColumnName"))
          if (r.peekIf(TokenType.Comma)) {
            columns.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        columns.append(r.consume(TokenType.RightParen))
        column.append(columns)
      } else {
        column.append(this.identifier(r, "ColumnName"))
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
    const node = new Node("DeleteStatement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.deleteClause(r))
    return node
  }

  private deleteClause(r: TokenReader) {
    const node = new Node("DeleteClause")
    node.append(r.consume(Keyword.DELETE))
    node.append(r.consume(Keyword.FROM))

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
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
    const node = new Node("SelectStatement")
    if (prefix) {
      node.append(...prefix)
    }

    let current
    do {
      current = this.selectClause(r)
      if (r.peekIf(Keyword.UNION, Keyword.ALL)) {
        current = new Node("UnionAllOperation")
          .append(current)
          .append(r.consume())
          .append(r.consume())
      } else if (r.peekIf(Keyword.UNION)) {
        current = new Node("UnionOperation")
          .append(current)
          .append(r.consume())
      } else if (r.peekIf(Keyword.INTERSECT)) {
        current = new Node("IntersectOperation")
          .append(current)
          .append(r.consume())
      } else if (r.peekIf(Keyword.EXCEPT)) {
        current = new Node("ExceptOperation")
          .append(current)
          .append(r.consume())
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
    const node = new Node("SelectClause")
    if (r.peekIf(Keyword.VALUES)) {
      node.name = "ValuesClause"
      node.append(r.consume())
      const exprs = new Node("ExpressionList")
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
        node.append(new Node("DistinctOption").append(r.consume()))
      } else if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption").append(r.consume()))
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
    const node = new Node("WithClause")
    node.append(r.consume(Keyword.WITH))

    if (r.peekIf(Keyword.RECURSIVE)) {
      node.append(new Node("RecursiveOption").append(r.consume()))
    }

    do {
      const table = new Node("CommonTable")
      table.append(this.identifier(r, "ObjectName"))
      if (r.peekIf(TokenType.LeftParen)) {
        const columns = new Node("ColumnList")
        columns.append(r.consume())
        do {
          columns.append(this.identifier(r, "ColumnName"))
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
        let materialized = new Node("MaterializedOption")
        if (r.peekIf(Keyword.NOT)) {
          materialized.name = "NotMaterializedOption"
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
    const node = new Node("SelectColumnList") 
    do {
      const column = new Node("SelectColumn")
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        column.append(new Node("AllColumns")
          .append(r.consume())
        )
      } else if (r.peekIf(
        [TokenType.String, TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue], 
        TokenType.Dot, 
        { type: TokenType.Operator, text: "*" }
      )) {
        column.append(new Node("AllColumns")
          .append(this.identifier(r, "SchemaName"))
          .append(r.consume())
          .append(r.consume())
        )
      } else {
        column.append(this.expression(r))
        if (r.peekIf(Keyword.AS)) {
          column.append(r.consume())
          column.append(this.identifier(r, "ColumnAlias"))
        } else if (r.peekIf(
          [TokenType.String, TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
        )) {
          column.append(this.identifier(r, "ColumnAlias"))
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
    const node = new Node("FromClause")
    node.append(r.consume(Keyword.FROM))
    let hasJoinClause = false
    do {
      const table = new Node("ObjectReference")
      if (r.peekIf(TokenType.LeftParen)) {
        table.name = "Subquery"
        table.append(r.consume())
        if (r.peekIf(Keyword.WITH) || r.peekIf(Keyword.SELECT)) {
          table.append(this.selectStatement(r))
          table.append(r.consume(TokenType.RightParen))
        } else {
          table.append(this.fromClause(r))
          table.append(r.consume(TokenType.RightParen))
        }
      } else {
        const ident = this.identifier(r, "ObjectName")
        table.append(ident)
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          table.append(r.consume())
          table.append(this.identifier(r, "ObjectName"))
        }
        if (r.peekIf(TokenType.LeftParen)) {
          table.name = "TableFunction"
          table.append(r.consume())
          const args = new Node("ArgumentList")
          while (!r.peekIf(TokenType.RightParen)) {
            const arg = new Node("Argument")
            arg.append(this.expression(r))
            args.append(arg)
            if (r.peekIf(TokenType.Comma)) {
              args.append(r.consume())
            } else {
              break
            }
          }
          table.append(args)
          table.append(r.consume(TokenType.RightParen))
        }
      }
      if (r.peekIf(Keyword.AS)) {
        table.append(r.consume())
        table.append(this.identifier(r, "ObjectAlias"))
      } else if (r.peekIf(
        [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
      )) {
        table.append(this.identifier(r, "ObjectAlias"))
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
    const node = new Node("InnerJoinClause")
    if (r.peekIf(Keyword.CROSS)) {
      node.name = "CrossJoinClause"
      node.append(r.consume())
    } else {
      if (r.peekIf(Keyword.NATURAL)) {
        node.append(new Node("NatualOption")
          .append(r.consume())
        )
      }
      if (r.peekIf(Keyword.LEFT)) {
        node.name = "LeftOuterJoinClause"
        node.append(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.append(r.consume())
        }
      } else if (r.peekIf(Keyword.RIGHT)) {
        node.name = "RightOuterJoinClause"
        node.append(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.append(r.consume())
        }
      } else if (r.peekIf(Keyword.FULL)) {
        node.name = "FullOuterJoinClause"
        node.append(r.consume())
        if (r.peekIf(Keyword.OUTER)) {
          node.append(r.consume())
        }
      } else if (r.peekIf(Keyword.INNER)) {
        node.append(r.consume())
      }
    }
    node.append(r.consume(Keyword.JOIN))

    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }

    if (r.peekIf(Keyword.AS)) {
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectAlias"))
    } else if (r.peekIf(
      [TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue]
    )) {
      node.append(this.identifier(r, "ObjectAlias"))
    }
    
    if (r.peekIf(Keyword.ON)) {
      node.append(new Node("JoinOnClause")
        .append(r.consume())
        .append(this.expression(r))
      )
    } else if (r.peekIf(Keyword.USING)) {
      node.append(new Node("UsingClause")
        .append(r.consume())
        .append(r.consume(TokenType.LeftParen))
        .append(r.consume(TokenType.RightParen))
      )
    }
    return node
  }

  private whereClause(r: TokenReader) {
    const node = new Node("WhereClause")
    node.append(r.consume(Keyword.WHERE))
    node.append(this.expression(r))
    return node
  }

  private gropuByClause(r: TokenReader) {
    const node = new Node("GroupByClause")
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
    const node = new Node("HavingClause")
      .append(r.consume(Keyword.HAVING))
      .append(this.expression(r))
    return node
  }

  private windowClause(r: TokenReader) {
    const node = new Node("WindowClause")
      .append(r.consume(Keyword.WINDOW))
    do {
      node.append(this.identifier(r, "WindowName"))
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
    const node = new Node("Window")
    if (!r.peekIf(Keyword.PARTITION)) {
      node.append(this.identifier(r, "BaseWindowName"))
    }
    if (r.peekIf(Keyword.PARTITION)) {
      node.append(this.partitionByClause(r))
    }
    if (r.peekIf(Keyword.ORDER)) {
      node.append(this.orderByClause(r))
    }
    const frame = new Node("FrameClause")
    if (r.peekIf(Keyword.RANGE)) {
      frame.append(new Node("RangeOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.ROWS)) {
      frame.append(new Node("RowsOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.GROUPS)) {
      frame.append(new Node("GroupsOption")
        .append(r.consume())
      )
    }
    if (r.peekIf(Keyword.CURRENT)) {
      frame.append(new Node("FrameStartClause")
        .append(new Node("CurrentRowOption")
          .append(r.consume())
          .append(r.consume(Keyword.ROW))
        )
      )
    } else if (r.peekIf(Keyword.UNBOUNDED)) {
      frame.append(new Node("FrameStartClause")
        .append(new Node("UnboundedPrecedingOption")
          .append(r.consume())
          .append(r.consume(Keyword.PRECEDING))
        )
      )
    } else if (r.peekIf(Keyword.BETWEEN)) {
      frame.append(r.consume())
      {
        const start = new Node("FrameStartClause")
          .append(r.consume())
        if (r.peekIf(Keyword.CURRENT)) {
          start.append(new Node("CurrentRowOption")
            .append(r.consume())
            .append(r.consume(Keyword.ROW))
          )
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          start.append(new Node("UnboundedPrecedingOption")
            .append(r.consume(),)
            .append(r.consume(Keyword.PRECEDING))
          )
        } else {
          const expr = this.expression(r)
          if (r.peekIf(Keyword.PRECEDING)) {
            start.append(new Node("PrecedingOption")
              .append(expr)
              .append(r.consume())
            )
          } else if (r.peekIf(Keyword.FOLLOWING)) {
            start.append(new Node("FollowingOption")
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
        const end = new Node("FrameEndClause")
        end.append(r.consume())
        if (r.peekIf(Keyword.CURRENT)) {
          end.append(new Node("CurrentRowOption")
            .append(r.consume())
            .append(r.consume(Keyword.ROW))
          )
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          end.append(new Node("UnboundedFollowingOption")
            .append(r.consume())
            .append(r.consume(Keyword.FOLLOWING))
          )
        } else {
          const expr = this.expression(r)
          if (r.peekIf(Keyword.PRECEDING)) {
            end.append(new Node("PrecedingOption")
              .append(expr)
              .append(r.consume())
            )
          } else if (r.peekIf(Keyword.FOLLOWING)) {
            end.append(new Node("FollowingOption")
              .append(expr)
              .append(r.consume())
            )
          } else {
            throw r.createParseError()
          }
        }
        frame.append(end)
      }
    } else {
      frame.append(new Node("FrameStartClause")
        .append(new Node("PrecedingOption")
          .append(this.expression(r))
          .append(r.consume(Keyword.PRECEDING))
        )
      )
    }
    node.append(frame)
    if (r.peekIf(Keyword.EXCLUDE)) {
      const exclude = new Node("ExcludeClause")
      exclude.append(r.consume())
      if (r.peekIf(Keyword.NO)) {
        exclude.append(new Node("NoOthersOption")
          .append(r.consume())
          .append(r.consume(Keyword.OTHERS))
        )
      } else if (r.peekIf(Keyword.CURRENT)) {
        exclude.append(new Node("CurrentRowOption")
          .append(r.consume())
          .append(r.consume(Keyword.ROW))
        )
      } else if (r.peekIf(Keyword.GROUP)) {
        exclude.append(new Node("GroupOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.TIES)) {
        exclude.append(new Node("TiesOption")
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
    const node = new Node("PartitionByClause")
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
    const node = new Node("ReturningClause")
      .append(r.consume(Keyword.RETURNING))
      .append(this.selectColumns(r))
    return node
  }

  private orderByClause(r: TokenReader) {
    const node = new Node("OrderByClause")
      .append(r.consume(Keyword.ORDER))
      .append(r.consume(Keyword.BY))
    do {
      const column = this.sortingColumn(r)
      if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
        column.append(new Node("NullsFirstOption")
          .append(r.consume())
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
        column.append(new Node("NullsLastOption")
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
    const node = new Node("LimitClause")
      .append(r.consume(Keyword.LIMIT))
    const limit = new Node("LimitOption")
      .append(this.expression(r))
    node.append(limit)
    if (r.peekIf(Keyword.OFFSET)) {
      node.append(new Node("OffsetOption")
        .append(r.consume())
        .append(this.expression(r))
      )
    } else if (r.peekIf(TokenType.Comma)) {
      limit.name = "OffsetOption"
      node.append(r.consume())
      node.append(new Node("LimitOption")
        .append(this.expression(r))
      )
    }
    return node
  }

  private tableColumn(r: TokenReader) {
    const node = new Node("TableColumn")
      .append(this.identifier(r, "ColumnName"))

    if (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      const columnType = new Node("ColumnType")
      columnType.append(this.typeName(r))
      if (r.peekIf(TokenType.LeftParen)) {
        columnType.append(r.consume())
        columnType.append(new Node("LengthOption").append(this.numericLiteral(r)))
        if (r.peekIf(TokenType.Comma)) {
          columnType.append(r.consume())
          columnType.append(new Node("ScaleOption").append(this.numericLiteral(r)))
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
    const node = new Node("ColumnConstraint")
    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.append(r.consume())
      node.append(this.identifier(r, "ConstraintName"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const pkey = new Node("PrimaryKeyConstraint")
      pkey.append(r.consume())
      pkey.append(r.consume(Keyword.KEY))

      if (r.peekIf(Keyword.ASC)) {
        pkey.append(new Node("AscOption").append(r.consume()))
      } else if (r.peekIf(Keyword.DESC)) {
        pkey.append(new Node("DescOption").append(r.consume()))
      }
      if (r.peekIf(Keyword.ON)) {
        pkey.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      if (r.peekIf(Keyword.AUTOINCREMENT)) {
        pkey.append(new Node("AutoincrementOption").append(r.consume()))
      }
      node.append(pkey)
    } else if (r.peekIf(Keyword.NOT)) {
      const notNull = new Node("NotNullConstraint")
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
      const nullable = new Node("NullConstraint")
      nullable.append(r.consume())
      if (r.peekIf(Keyword.ON)) {
        nullable.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(nullable)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("UniqueConstraint")
      unique.append(r.consume())
      if (r.peekIf(Keyword.ON)) {
        unique.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(unique)
    } else if (r.peekIf(Keyword.CHECK)) {
      const check = new Node("CheckConstraint")
      check.append(r.consume())
      check.append(r.consume(TokenType.LeftParen))
      check.append(this.expression(r))
      check.append(r.consume(TokenType.RightParen))
      node.append(check)
    } else if (r.peekIf(Keyword.DEFAULT)) {
      const def = new Node("DefaultOption")
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
      node.append(new Node("CollateOption")
        .append(r.consume())
        .append(this.identifier(r, "CollateName"))
      )
    } else if (r.peekIf(Keyword.REFERENCES)) {
      node.append(new Node("ForeignKeyConstraint")
        .append(this.referencesClause(r))
      )
    } else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
      const genAlways = new Node("GeneratedColumnOption")
      if (r.peekIf(Keyword.GENERATED)) {
        genAlways.append(r.consume())
        genAlways.append(r.consume(Keyword.ALWAYS))
      }
      genAlways.append(r.consume(Keyword.AS))
      genAlways.append(r.consume(TokenType.LeftParen))
      genAlways.append(new Node("GeneratedColumn")
        .append(this.expression(r))
      )
      genAlways.append(r.consume(TokenType.RightParen))

      if (r.peekIf(Keyword.STORED)) {
        genAlways.append(new Node("StoredOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.VIRTUAL)) {
        genAlways.append(new Node("virtual option")
          .append(r.consume())
        )
      }
      node.append(genAlways)
    } else {
      throw r.createParseError()
    }

    return node
  }

  private tableConstraint(r: TokenReader) {
    const node = new Node("TableConstraint")

    if (r.peekIf(Keyword.CONSTRAINT)) {
      node.append(r.consume())
      node.append(this.identifier(r, "ConstraintName"))
    }
    if (r.peekIf(Keyword.PRIMARY)) {
      const pkey = new Node("PrimaryKeyConstraint")
      pkey.append(r.consume())
      pkey.append(r.consume(Keyword.KEY))
      const columns = new Node("SortingColumnList")
      columns.append(r.consume(TokenType.LeftParen))
      do  {
        columns.append(this.sortingColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      pkey.append(columns)
      if (r.peekIf(Keyword.ON)) {
        pkey.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(pkey)
    } else if (r.peekIf(Keyword.UNIQUE)) {
      const unique = new Node("UniqueConstraint")
      unique.append(r.consume())
      const columns = new Node("SortingColumnList")
      columns.append(r.consume(TokenType.LeftParen))
      do {
        columns.append(this.sortingColumn(r))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      unique.append(columns)
      if (r.peekIf(Keyword.ON)) {
        unique.append(this.conflictAction(r, [
          r.consume(), 
          r.consume(Keyword.CONFLICT)
        ]))
      }
      node.append(unique)
    } else if (r.peekIf(Keyword.CHECK)) {
      const check = new Node("CheckConstraint")
      check.append(r.consume())
      check.append(r.consume(TokenType.LeftParen))
      check.append(this.expression(r))
      check.append(r.consume(TokenType.RightParen))
      node.append(check)
    } else if (r.peekIf(Keyword.FOREIGN)) {
      const fkey = new Node("ForeignKeyConstraint")
        .append(r.consume())
        .append(r.consume(Keyword.KEY))
      const columns = new Node("ColumnList")
      columns.append(r.consume(TokenType.LeftParen))
      do {
        columns.append(this.identifier(r, "ColumnName"))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      fkey.append(columns)
      fkey.append(this.referencesClause(r))
      node.append(fkey)
    } else {
      throw r.createParseError()
    }
    return node
  }

  private referencesClause(r: TokenReader) {
    const node = new Node("ReferencesClause")
      .append(r.consume())
      .append(this.identifier(r, "ObjectName"))
    if (r.peekIf(TokenType.LeftParen)) {
      const columns = new Node("ColumnList")
        .append(r.consume())
      do {
        columns.append(this.identifier(r, "ColumnName"))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      columns.append(r.consume(TokenType.RightParen))
      node.append(columns)
    }

    while (!r.peek().eos && r.peekIf([Keyword.ON, Keyword.MATCH])) {
      if (r.peekIf(Keyword.ON)) {
        const on = new Node("OnUpdateClause")
          .append(r.consume())
        if (r.peekIf(Keyword.DELETE)) {
          on.name = "OnDeleteClause"
          on.append(r.consume())
        } else {
          on.append(r.consume(Keyword.UPDATE))
        }
        if (r.peekIf(Keyword.SET, Keyword.NULL)) {
          on.append(new Node("SetNullOption")
            .append(r.consume())
            .append(r.consume())
          )
        } else if (r.peekIf(Keyword.SET, Keyword.DEFAULT)) {
          on.append(new Node("SetDefaultOption")
            .append(r.consume())
            .append(r.consume())
          )
        } else if (r.peekIf(Keyword.CASCADE)) {
          on.append(new Node("CascadeOption")
            .append(r.consume())
          )
        } else if (r.peekIf(Keyword.RESTRICT)) {
          on.append(new Node("RestrictOption")
            .append(r.consume())
          )
        } else if (r.peekIf(Keyword.NO, Keyword.ACTION)) {
          on.append(new Node("NoActionOption")
            .append(r.consume())
            .append(r.consume())
          )
        } else {
          throw r.createParseError()
        }
        node.append(on)
      } else if (r.peekIf(Keyword.MATCH)) {
        const match = new Node("")
          .append(r.consume())
        if (r.peekIf(Keyword.SIMPLE)) {
          match.name = "MatchSimpleOption"
          match.append(r.consume())
        } else if (r.peekIf(Keyword.FULL)) {
          match.name = "MatchFullOption"
          match.append(r.consume())
        } else if (r.peekIf(Keyword.PARTIAL)) {
          match.name = "MatchPartialOption"
          match.append(r.consume())
        } else {
          throw r.createParseError()
        }
        node.append(match)
      } else {
        throw r.createParseError()
      }
    }

    if (r.peekIf(Keyword.DEFERRABLE) || r.peekIf(Keyword.NOT, Keyword.DEFERRABLE)) {
      const defer = new Node("DeferrableOption")
      if (r.peekIf(Keyword.NOT)) {
        defer.name = "NotDeferrableOption"
        defer.append(r.consume())
      }
      defer.append(r.consume())
      node.append(defer)

      if (r.peekIf(Keyword.INITIALLY, Keyword.DEFERRED)) {
        defer.append(new Node("InitiallyDeferredOption")
          .append(r.consume())
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.INITIALLY, Keyword.IMMEDIATE)) {
        defer.append(new Node("InitiallyImmediateOption")
          .append(r.consume())
          .append(r.consume())
        )
      }
    }
    
    return node
  }

  private typeName(r: TokenReader) {
    const node = this.identifier(r, "TypeName")
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
      node.name = "RollbackOption"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.ABORT)) {
      node.name = "AbortOption"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.FAIL)) {
      node.name = "FailOption"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.IGNORE)) {
      node.name = "IgnoreOption"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.REPLACE)) {
      node.name = "ReplaceOption"
      node.append(r.consume())
    } else {
      throw r.createParseError()
    }
    return node
  }

  private pragmaValue(r: TokenReader, name: string) {
    const node = new Node(name)
    if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
      node.append(this.numericLiteral(r))
    } else if (r.peekIf(TokenType.Numeric)) {
      node.append(this.numericLiteral(r))
    } else if (r.peekIf([TokenType.String])) {
      node.append(this.stringLiteral(r))
    } else if (r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])) {
      node.append(this.identifier(r, "PragmaLiteral"))
    } else {
      throw r.createParseError()
    }
    return node
  }

  private expression(r: TokenReader, priority = 0) {
    let node
    if (priority < 9 && r.peekIf(Keyword.NOT)) {
      node = new Node("NotOperation").append(r.consume())
      node.append(this.expression(r, 9))
    } else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
      node = new Node("BitwiseNotOperation").append(r.consume())
      node.append(this.expression(r))
    } else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
      node = new Node("UnaryPlusOperation").append(r.consume())
      node.append(this.expression(r))
    } else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
      node = new Node("UnaryMinusOperation").append(r.consume())
      node.append(this.expression(r))
    } else {
      node = this.expressionValue(r)
    }

    while (!r.peek().eos) {
      if (priority < 11 && r.peekIf(Keyword.OR)) {
        node = new Node("OrOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 11))
      } else if (priority < 10 && r.peekIf(Keyword.AND)) {
        node = new Node("AndOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 10))
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: [ "=", "==" ] })) {
        node = new Node("EqualOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: [ "<>", "!=" ] })) {
        node = new Node("NotEqualOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.IS)) {
        const prefix = [ r.consume() ]
        if (r.peekIf(Keyword.NOT)) {
          prefix.push(r.consume())
          if (r.peekIf(Keyword.DISTINCT)) {
            node = new Node("IsNotDistinctFromOperation").append(node)
            node.append(...prefix)
            node.append(r.consume())
            node.append(r.consume(Keyword.FROM))
          } else {
            node = new Node("IsNotOperation").append(node)
            node.append(...prefix)
            node.append(r.consume())
          }
        } else if (r.peekIf(Keyword.DISTINCT)) {
          node = new Node("IsDistinctFromOperation").append(node)
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
          node = new Node("NotBetweenOperation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("BetweenOperation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
        node.append(r.consume(Keyword.AND))
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.IN) || r.peekIf(Keyword.NOT, Keyword.IN)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("NotInOperation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("InOperation").append(node)
        }
        node.append(r.consume())
        if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.SELECT])) {
          const subquery = new Node("Subquery")
          subquery.append(r.consume())
          subquery.append(this.selectStatement(r))
          subquery.append(r.consume(TokenType.RightParen))
          node.append(subquery)
        } else if (r.peekIf(TokenType.LeftParen)) {
          const exprs = new Node("ExpressionList")
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
          node = new Node("Function")
          node.append(new Node("ObjectName").append(r.consume()))
          const args = new Node("ArgumentList")
          args.append(r.consume(TokenType.LeftParen))
          while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
            const arg = new Node("Argument")
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
          node = new Node("NotMatchOperation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("MatchOperation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("NotLikeOperation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("LikeOperation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
        if (r.peekIf(Keyword.ESCAPE)) {
          node.append(new Node("EscapeOption")
            .append(this.expression(r, 6))
          )
        }
      } else if (priority < 8 && r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("NotRegexpOperation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("RegexpOperation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB)) {
        if (r.peekIf(Keyword.NOT)) {
          node = new Node("NotGlobOperation").append(node)
          node.append(r.consume())
        } else {
          node = new Node("GlobOperation").append(node)
        }
        node.append(r.consume())
        node.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.ISNULL)) {
        node = new Node("IsNullOperation").append(node)
        node.append(r.consume())
      } else if (priority < 8 && r.peekIf(Keyword.NOTNULL)) {
        node = new Node("IsNotNullOperation").append(node)
        node.append(r.consume())
      } else if (priority < 8 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
        node = new Node("IsNotNullOperation").append(node)
        node.append(r.consume())
        node.append(r.consume())
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<"})) {
        node = new Node("LessThanOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">"})) {
        node = new Node("GreaterThanOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<="})) {
        node = new Node("LessThanOrEqualOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">="})) {
        node = new Node("GreaterThanOrEqualOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 7))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "&"})) {
        node = new Node("BitwiseAndOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "|"})) {
        node = new Node("BitwiseOrOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "<<"})) {
        node = new Node("BitwiseLeftShiftOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: ">>"})) {
        node = new Node("BitwiseRightShiftOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 5))
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
        node = new Node("AddOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 4))
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
        node = new Node("SubtractOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 4))
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "*" })) {
        node = new Node("MultiplyOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 3))
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "/" })) {
        node = new Node("DivideOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 3))
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "%" })) {
        node = new Node("ModuloOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 3))
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "||" })) {
        node = new Node("ConcatenateOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 2))
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->" })) {
        node = new Node("JsonExtractOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 2))
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->>" })) {
        node = new Node("JsonExtractAndUnquoteOperation").append(node)
        node.append(r.consume())
        node.append(this.expression(r, 2))
      } else if (priority < 1 && r.peekIf(Keyword.COLLATE)) {
        node = new Node("CollateOperation").append(node)
        node.append(r.consume())
        node.append(this.identifier(r, "CollationName"))
      } else {
        break
      }
    }
    return node
  }

  private expressionValue(r: TokenReader) {
    let node
    if (r.peekIf(Keyword.NULL)) {
      node = new Node("NullLiteral")
      node.append(r.consume())
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      node = this.booleanLiteral(r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      node =  new Node("Function")
      const token = r.consume()
      node.append(new Node("ObjectName", token.text.toUpperCase()).append(token))
    } else if (r.peekIf(Keyword.CASE)) {
      node = new Node("CaseBlock")
      node.append(r.consume())
      if (!r.peekIf(Keyword.WHEN)) {
        const target = new Node("CaseClause")
        target.append(this.expression(r))
        node.append(target)
      }
      const conds = new Node("CaseConditionList")
      do {
        conds.append(new Node("CaseCondition")
          .append(r.consume(Keyword.WHEN))
          .append(new Node("WhenClause")
            .append(this.expression(r))
          )
          .append(r.consume(Keyword.THEN))
          .append(new Node("ThenClause")
            .append(this.expression(r))
          )
        )
      } while (!r.peek().eos)
      node.append(conds)
      if (r.peekIf(Keyword.ELSE)) {
        node.append(new Node("ElseClause")
          .append(r.consume())
          .append(this.expression(r))
        )
      }
      node.append(r.consume(Keyword.END))
    } else if (r.peekIf(Keyword.CAST)) {
      node = new Node("Function")
      const token = r.consume()
      node.append(new Node("ObjectName", token.text.toUpperCase())
        .append(token)
      )
      const args = new Node("ArgumentList")
      args.append(r.consume(TokenType.LeftParen))

      const arg = new Node("Argument")
      arg.append(this.expression(r))
      args.append(arg)

      args.append(r.consume(Keyword.AS))

      args.append(this.typeName(r))
      
      args.append(r.consume(TokenType.RightParen))
      node.append(args)
    } else if (r.peekIf(Keyword.RAISE)) {
      node = new Node("Function")
      const token = r.consume()
      node.append(new Node("ObjectName", token.text.toUpperCase()).append(token))
      const args = new Node("ArgumentList")
      args.append(r.consume(TokenType.LeftParen))
      args.append(new Node("Argument")
        .append(this.conflictAction(r))
      )
      args.append(r.consume(TokenType.Comma))
      args.append(new Node("Argument")
        .append(this.expression(r))
      )
      args.append(r.consume(TokenType.RightParen))
      node.append(args)
    } else if (r.peekIf(Keyword.EXISTS)) {
      node = new Node("ExistsOperation")
      node.append(r.consume())
      node.append(r.consume(TokenType.LeftParen))
      node.append(this.selectStatement(r))
      node.append(r.consume(TokenType.RightParen))
    } else if (r.peekIf(TokenType.LeftParen)) {
      node = new Node("Expression")
      node.append(r.consume())
      if (r.peekIf(Keyword.WITH) || r.peekIf(Keyword.SELECT)) {
        node.name = "Subquery"
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      } else {
        node.append(this.expression(r))
        if (r.peekIf(TokenType.Comma)) {
          node.name = "ExpressionList"
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
      node = new Node("Function")
      node.append(new Node("ObjectName").append(r.consume()))

      const args = new Node("ArgumentList")
      args.append(r.consume(TokenType.LeftParen))
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        args.append(new Node("Argument")
          .append(new Node("AllColumns")
            .append(r.consume())
          )
        )
      } else {
        if (r.peekIf(Keyword.DISTINCT)) {
          args.append(new Node("DistinctOption").append(r.consume()))
        }
        while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
          args.append(new Node("Argument")
            .append(this.expression(r))
          )
          if (r.peekIf(TokenType.Comma)) {
            args.append(r.consume())
          } else {
            break
          }
        }
      }
      args.append(r.consume(TokenType.RightParen))
      if (r.peekIf(Keyword.FILTER)) {
        node.append(new Node("FilterClause")
          .append(r.consume())
          .append(r.consume(TokenType.LeftParen))
          .append(this.whereClause(r))
          .append(r.consume(TokenType.RightParen))
        )
      }
      if (r.peekIf(Keyword.OVER)) {
        const over = new Node("OverClause")
          .append(r.consume())
        if (r.peekIf(TokenType.LeftParen)) {
          over.append(r.consume())
          over.append(this.window(r))
          over.append(r.consume(TokenType.RightParen))
        } else {
          over.append(this.identifier(r, "WindowName"))
        }
        node.append(over)
      }
      node.append(args)
    } else if (
      r.peekIf([TokenType.Identifier, TokenType.QuotedIdentifier, TokenType.QuotedValue])
      || r.peekIf(TokenType.String, TokenType.Dot)
    ) {
      node = this.columnReference(r)
    } else if (r.peekIf(TokenType.BindVariable)) {
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
        node = new Node("PositionalBindVariable", value)
      } else {
        node = new Node("NamedBindVariable", token.text.substring(1))
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
    const node = new Node("SortingColumn")
    const mark = r.pos
    const expr = this.expression(r)
    if (expr.children.length === 1) {
      r.pos = mark
      node.append(this.identifier(r, "ColumnName"))
    } else {
      node.append(expr)
    }
    if (r.peekIf(Keyword.COLLATE)) {
      node.append(r.consume())
      node.append(this.identifier(r, "CollationName"))
    }
    if (r.peekIf(Keyword.ASC)) {
      node.append(new Node("AscOption").append(r.consume()))
    } else if (r.peekIf(Keyword.DESC)) {
      node.append(new Node("DescOption").append(r.consume()))
    }
    return node
  }

  private columnReference(r: TokenReader) {
    const node = new Node("ColumnReference")
    const ident1 = this.identifier(r, "ColumnName")
    if (r.peekIf(TokenType.Dot)) {
      const dot1 = r.consume()
      const ident2 = this.identifier(r, "ColumnName")
      if (r.peekIf(TokenType.Dot)) {
        ident2.name = "SchemaName"
        node.append(ident1)
        node.append(dot1)
        ident2.name = "ObjectName"
        node.append(ident2)
        node.append(dot1)
        node.append(this.identifier(r, "ColumnName"))
      } else {
        ident1.name = "ObjectName"
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
    const node = new Node("NumericLiteral")
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
    const node = new Node("StringLiteral")
    const token = r.consume(TokenType.String)
    node.value = dequote(token.text)
    node.append(token)
    return node
  }

  private blobLiteral(r: TokenReader) {
    const node = new Node("BlobLiteral")
    const token = r.consume(TokenType.Blob)
    node.value = token.text.substring(2, token.text.length-1).toUpperCase()
    node.append(token)
    return node
  }

  private booleanLiteral(r: TokenReader) {
    const node = new Node("BooleanLiteral")
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
