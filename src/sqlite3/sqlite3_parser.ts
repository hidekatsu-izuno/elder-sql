import { Decimal } from "decimal.js"
import {
  TokenType,
  Token,
  Keyword,
} from "../lexer.js"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser.js"
import { dequote } from "../utils.js"
import { Sqlite3Lexer } from "./sqlite3_lexer.js"

export class Sqlite3Parser extends Parser {
  constructor(
    options: Record<string, any> = {},
  ) {
    super(options, options.lexer ?? new Sqlite3Lexer(options))
  }

  processTokens(tokens: Token[]): Node {
    const r = new TokenReader(tokens)

    const node = new Node("Script")
    const errors = []

    while (r.peek()) {
      try {
        if (r.peekIf([TokenType.SemiColon, TokenType.Delimiter, TokenType.SectionBreak])) {
          node.append(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          node.append(this.command(r))
        } else {
          node.append(this.statement(r))
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            node.append(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (r.peek() != null) {
      for (let i = r.pos; i < r.tokens.length; i++) {
        node.append(r.tokens[i])
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
      err.node = node
      throw err
    }

    return node
  }

  private command(r: TokenReader) {
    return new Node("CommandStatement").apply(node => {
      node.append(new Node("CommandName")).apply(node => {
        const command = r.consume(TokenType.Command)
        node.append(command)
        node.data.value = command.text
      })
      node.append(new Node("CommandArgumentList")).apply(node => {
        while (!r.peek().eos) {
          node.append(new Node("CommandArgument")).apply(node => {
            const arg = r.consume()
            node.append(arg)
            node.data.value = dequote(arg.text)
          })
        }
      })
      if (r.peekIf(TokenType.SemiColon)) {
        node.append(r.consume())
      }
    })
  }

  private statement(r: TokenReader) {
    let explain
    let stmt

    try {
      if (r.peekIf(Keyword.EXPLAIN)) {
        explain = this.explainStatement(r)
      }

      if (r.peekIf(Keyword.CREATE)) {
        const mark = r.pos
        r.consume()
        while (!r.peek().eos && !Sqlite3Lexer.isObjectStart(r.peek().keyword)) {
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
        } else if (r.peekIf(Keyword.INDEX)) {
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
      } else if (r.peekIf([Keyword.COMMIT, Keyword.END])) {
        stmt = this.commitTransactionStatement(r)
      } else if (r.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackTransactionStatement(r)
      } else {
        const prefix = []
        if (r.peekIf(Keyword.WITH)) {
          prefix.push(this.withClause(r))
        }
        if (r.peekIf([Keyword.INSERT, Keyword.REPLACE])) {
          stmt = this.insertStatement(r, prefix)
        } else if (r.peekIf(Keyword.UPDATE)) {
          stmt = this.updateStatement(r, prefix)
        } else if (r.peekIf(Keyword.DELETE)) {
          stmt = this.deleteStatement(r, prefix)
        } else if (r.peekIf([Keyword.SELECT, Keyword.VALUES])) {
          stmt = this.selectStatement(r, prefix)
        }
      }

      if (!stmt) {
        throw r.createParseError()
      }

      if (explain) {
        explain.append(stmt)
        stmt = explain
      }
      if (r.peekIf(TokenType.SemiColon)) {
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
        if (r.peekIf(TokenType.SemiColon)) {
          stmt.append(r.consume())
        }
        err.node = stmt
      }
      throw err
    }
  }

  private explainStatement(r: TokenReader) {
    return new Node("ExplainStatement").apply(node => {
      node.append(r.consume())
      if (r.peekIf(Keyword.QUERY)) {
        node.append(new Node("QueryPlanClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.PLAN))
        })
      }
    })
  }

  private createTableStatement(r: TokenReader) {
    return new Node("CreateTableStatement").apply(node => {
      let virtual = false

      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf([Keyword.TEMPORARY, Keyword.TEMP])) {
        node.append(new Node("TemporaryOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.VIRTUAL)) {
        node.append(new Node("VirtualOption")).apply(node => {
          node.append(r.consume())
        })
        virtual = true
      }
      node.append(r.consume(Keyword.TABLE))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfNotExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.NOT))
          node.append(r.consume(Keyword.EXISTS))
        })
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

        node.append(new Node("Module")).apply(node => {
          node.append(this.identifier(r, "ModuleName"))
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("ModuleArgumentList")).apply(node => {
              node.append(r.consume())
              do {
                node.append(new Node("ModuleArgument")).apply(node => {
                  do {
                    node.append(r.consume())
                  } while (!r.peek().eos
                    && !r.peekIf([TokenType.RightParen, TokenType.Comma])
                  )
                })
                if (r.peekIf(TokenType.Comma)) {
                  node.append(r.consume())
                } else {
                  break
                }
              } while (!r.peek().eos)
              node.append(r.consume(TokenType.RightParen))
            })
          }
        })
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
          node.append(new Node("WithoutRowidOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.ROWID))
          })
        }
      } else if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        node.append(this.selectStatement(r))
      } else {
        throw r.createParseError()
      }
    })
  }

  private createViewStatement(r: TokenReader) {
    return new Node("CreateViewStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf([Keyword.TEMPORARY, Keyword.TEMP])) {
        node.append(new Node("TemporaryOption")).apply(node => {
          node.append(r.consume())
        })
      }
      node.append(r.consume(Keyword.VIEW))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfNotExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.NOT))
          node.append(r.consume(Keyword.EXISTS))
        })
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
        node.append(new Node("ColumnList")).apply(node => {
          node.append(r.consume())
          do {
            node.append(this.identifier(r, "ColumnName"))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))
        })
      }

      node.append(this.selectStatement(r))
    })
  }

  private createTriggerStatement(r: TokenReader) {
    return new Node("CreateTriggerStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
        node.append(new Node("TemporaryOption")).apply(node => {
          node.append(r.consume())
        })
      }
      node.append(r.consume(Keyword.TRIGGER))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfNotExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.NOT))
          node.append(r.consume(Keyword.EXISTS))
        })
      }

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }

      if (r.peekIf(Keyword.BEFORE)) {
        node.append(new Node("BeforeOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.AFTER)) {
        node.append(new Node("AfterOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.INSTEAD)) {
        node.append(new Node("InsteadOfOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.OF))
        })
      }

      if (r.peekIf(Keyword.INSERT)) {
        node.append(new Node("InsertOnClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.ON))
          node.append(this.identifier(r, "TargetObjectName"))
        })
      } else if (r.peekIf(Keyword.UPDATE)) {
        node.append(new Node("UpdateOnClause")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.OF)) {
            node.append(new Node("ColumnList")).apply(node => {
              node.append(r.consume())
              do {
                node.append(this.identifier(r, "ColumnName"))
                if (r.peekIf(TokenType.Comma)) {
                  node.append(r.consume())
                } else {
                  break
                }
              } while (!r.peek().eos)
            })
          }
          node.append(r.consume(Keyword.ON))
          node.append(this.identifier(r, "TargetObjectName"))
        })
      } else if (r.peekIf(Keyword.DELETE)) {
        node.append(new Node("DeleteOnClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.ON))
          node.append(this.identifier(r, "TargetObjectName"))
        })
      } else {
        throw r.createParseError()
      }

      if (r.peekIf(Keyword.FOR)) {
        node.append(new Node("ForEachRowOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.EACH))
          node.append(r.consume(Keyword.ROW))
        })
      }

      if (r.peekIf(Keyword.WHEN)) {
        node.append(new Node("WhenClause")).apply(node => {
          node.append(r.consume())
          node.append(this.expression(r))
        })
      }

      node.append(new Node("BeginStatement")).apply(node => {
        node.append(new Node("BeginBlock")).apply(node => {
          node.append(r.consume(Keyword.BEGIN))
          const prefix = []
          if (r.peekIf(Keyword.WITH)) {
            prefix.push(this.withClause(r))
          }
          if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
            node.append(this.insertStatement(r, prefix))
          } else if (r.peekIf(Keyword.UPDATE)) {
            node.append(this.updateStatement(r, prefix))
          } else if (r.peekIf(Keyword.DELETE)) {
            node.append(this.deleteStatement(r, prefix))
          } else if (r.peekIf(Keyword.SELECT)) {
            node.append(this.selectStatement(r, prefix))
          } else {
            throw r.createParseError()
          }
          node.append(r.consume(TokenType.SemiColon))
          node.append(r.consume(Keyword.END))
        })
      })
    })
  }

  private createIndexStatement(r: TokenReader) {
    return new Node("CreateIndexStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf(Keyword.UNIQUE)) {
        node.append(new Node("UniqueOption")).apply(node => {
          node.append(r.consume())
        })
      }
      node.append(r.consume(Keyword.INDEX))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfNotExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.NOT))
          node.append(r.consume(Keyword.EXISTS))
        })
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
        node.append(new Node("SortingColumnList")).apply(node => {
          node.append(r.consume(TokenType.LeftParen))
          do {
            node.append(this.sortingColumn(r))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))
        })
      }

      if (r.peekIf(Keyword.WHERE)) {
        node.append(this.whereClause(r))
      }
    })
  }

  private alterTableStatement(r: TokenReader) {
    return new Node("AlterTableStatement").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TABLE))

      if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
        node.append(new Node("RenameToClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume())
          node.append(this.identifier(r, "TargetObjectName"))
        })
      } else if (r.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
        node.append(new Node("RenameColumnClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume())
          node.append(this.identifier(r, "ColumnName"))
          node.append(r.consume(Keyword.TO))
          node.append(this.identifier(r, "TargetColumnName"))
        })
      } else if (r.peekIf(Keyword.ADD)) {
        node.append(new Node("AddColumnClause")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.COLUMN)) {
            node.append(r.consume())
          }
          node.append(this.tableColumn(r))
        })
      } else if (r.peekIf(Keyword.DROP)) {
        node.append(new Node("DropColumnClause")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.COLUMN)) {
            node.append(r.consume())
          }
          node.append(this.identifier(r, "ColumnName"))
        })
      } else {
        throw r.createParseError()
      }
    })
  }

  private dropTableStatement(r: TokenReader) {
    return new Node("DropTableStatement").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TABLE))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.EXISTS))
        })
      }

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
    })
  }

  private dropViewStatement(r: TokenReader) {
    return new Node("DropViewStatement").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.VIEW))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.EXISTS))
        })
      }

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
    })
  }

  private dropTriggerStatement(r: TokenReader) {
    return new Node("DropTriggerStatement").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TRIGGER))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfExistsOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.EXISTS))
        })
      }

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
    })
  }

  private dropIndexStatement(r: TokenReader) {
    return new Node("DropIndexStatement").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.INDEX))

      if (r.peekIf(Keyword.IF)) {
        node.append(new Node("IfExists")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.EXISTS))
        })
      }

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
    })
  }

  private attachDatabaseStatement(r: TokenReader) {
    return new Node("AttachDatabaseStatement").apply(node => {
      node.append(r.consume(Keyword.ATTACH))
      node.append(r.consume(Keyword.DATABASE))
      node.append(new Node("DatabaseSource")).apply(node => {
        node.append(this.expression(r))
      })
      node.append(r.consume(Keyword.AS))
      node.append(this.identifier(r, "SchemaName"))
    })
  }

  private detachDatabaseStatement(r: TokenReader) {
    return new Node("DetachDatabaseStatement").apply(node => {
      node.append(r.consume(Keyword.DETACH))
      node.append(r.consume(Keyword.DATABASE))
      node.append(this.identifier(r, "SchemaName"))
    })
  }

  private analyzeStatement(r: TokenReader) {
    return new Node("AnalyzeStatement").apply(node => {
      node.append(r.consume(Keyword.ANALYZE))

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
    })
  }

  private reindexStatement(r: TokenReader) {
    return new Node("ReindexStatement").apply(node => {
      node.append(r.consume(Keyword.REINDEX))

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
    })
  }

  private vacuumStatement(r: TokenReader) {
    return new Node("VacuumStatement").apply(node => {
      node.append(r.consume(Keyword.VACUUM))

      if (r.peekIf(Keyword.TO)) {
        node.append(r.consume())
        node.append(new Node("FileName")).apply(node => {
          node.append(this.stringLiteral(r))
        })
      } else {
        node.append(this.identifier(r, "SchemaName"))
      }
    })
  }

  private pragmaStatement(r: TokenReader) {
    return new Node("PragmaStatement").apply(node => {
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
        node.append(new Node("ArgumentList")).apply(node => {
          node.append(r.consume())
          node.append(this.pragmaValue(r, "Argument"))
          node.append(r.consume(TokenType.RightParen))
        })
      }
    })
  }

  private beginTransactionStatement(r: TokenReader) {
    return new Node("BeginTransactionStatement").apply(node => {
      node.append(r.consume(Keyword.BEGIN))
      if (r.peekIf(Keyword.DEFERRED)) {
        node.append(new Node("DeferredOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.IMMEDIATE)) {
        node.append(new Node("ImmediateOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.EXCLUSIVE)) {
        node.append(new Node("ExclusiveOption")).apply(node => {
          node.append(r.consume())
        })
      }
      if (r.peekIf(Keyword.TRANSACTION)) {
        node.append(r.consume())
      }
    })
  }

  private savepointStatement(r: TokenReader) {
    return new Node("SavepointStatement").apply(node => {
      node.append(r.consume(Keyword.SAVEPOINT))
      node.append(this.identifier(r, "SavepointName"))
    })
  }

  private releaseSavepointStatement(r: TokenReader) {
    return new Node("ReleaseSavepointStatement").apply(node => {
      node.append(r.consume(Keyword.RELEASE))
      if (r.peekIf(Keyword.SAVEPOINT)) {
        node.append(r.consume())
      }
      node.append(this.identifier(r, "SavepointName"))
    })
  }

  private commitTransactionStatement(r: TokenReader) {
    return new Node("CommitTransactionStatement").apply(node => {
      if (r.peekIf(Keyword.END)) {
        node.append(r.consume())
      } else {
        node.append(r.consume(Keyword.COMMIT))
      }
      if (r.peekIf(Keyword.TRANSACTION)) {
        node.append(r.consume())
      }
    })
  }

  private rollbackTransactionStatement(r: TokenReader) {
    return new Node("RollbackTransactionStatement").apply(node => {
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
    })
  }

  private insertStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("InsertStatement").apply(node => {
      if (prefix) {
        for (const token of prefix) {
          node.append(token)
        }
      }
      node.append(this.insertClause(r))
    })
  }

  private insertClause(r: TokenReader) {
    return new Node("InsertClause").apply(node => {
      if (r.peekIf(Keyword.REPLACE)) {
        node.append(new Node("ReplaceOption")).apply(node => {
          node.append(r.consume())
        })
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
        node.append(new Node("ColumnList")).apply(node => {
          node.append(r.consume())
          do {
            node.append(this.identifier(r, "ColumnName"))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))
        })
      }

      if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultValuesOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.VALUES))
        })
      } else {
        if (r.peekIf(Keyword.VALUES)) {
          node.append(this.valuesClause(r))
        } else {
          const prefix = []
          if (r.peekIf(Keyword.WITH)) {
            prefix.push(this.withClause(r))
          }
          node.append(this.selectStatement(r, prefix))
        }

        do {
          if (r.peekIf(Keyword.ON)) {
            node.append(this.onConflictClause(r))
          } else {
            break
          }
        } while (!r.peek().eos)
      }
    })
  }

  private valuesClause(r: TokenReader) {
    return new Node("ValuesClause").apply(node => {
      node.append(r.consume(Keyword.VALUES))
      node.append(this.expressionList(r))
    })
  }

  private onConflictClause(r: TokenReader) {
    return new Node("OnConflictClause").apply(node => {
      node.append(r.consume(Keyword.ON))
      node.append(r.consume(Keyword.CONFLICT))
      if (r.peekIf(TokenType.LeftParen)) {
        node.append(new Node("SortingColumnList")).apply(node => {
          node.append(r.consume())
          do {
            node.append(this.sortingColumn(r))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))

          if (r.peekIf(Keyword.WHERE)) {
            node.append(this.whereClause(r))
          }
        })
      }
      node.append(r.consume(Keyword.DO))
      if (r.peekIf(Keyword.NOTHING)) {
        node.append(new Node("DoNothingOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.UPDATE)) {
        node.append(new Node("DoUpdateOption")).apply(node => {
          node.append(r.consume())
          node.append(this.setClause(r))
          if (r.peekIf(Keyword.WHERE)) {
            node.append(this.whereClause(r))
          }
        })
      } else {
        throw r.createParseError()
      }
    })
  }

  private updateStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("UpdateStatement").apply(node => {
      if (prefix) {
        for (const token of prefix) {
          node.append(token)
        }
      }
      node.append(this.updateClause(r))
    })
  }

  private updateClause(r: TokenReader) {
    return new Node("UpdateClause").apply(node => {
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
        node.append(this.returningClause(r))
      }
      if (r.peekIf(Keyword.ORDER)) {
        node.append(this.orderByClause(r))
      }
      if (r.peekIf(Keyword.LIMIT)) {
        node.append(this.limitClause(r))
      }
    })
  }

  private setClause(r: TokenReader) {
    return new Node("SetClause").apply(node => {
      node.append(r.consume(Keyword.SET))
      do {
        node.append(new Node("ColumnAssignment")).apply(node => {
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("ColumnList")).apply(node => {
              node.append(r.consume())
              do {
                node.append(this.identifier(r, "ColumnName"))
                if (r.peekIf(TokenType.Comma)) {
                  node.append(r.consume())
                } else {
                  break
                }
              } while (!r.peek().eos)
              node.append(r.consume(TokenType.RightParen))
            })
          } else {
            node.append(this.identifier(r, "ColumnName"))
          }
          node.append(r.consume({ type: TokenType.Operator, text: "=" }))
          node.append(new Node("ColumnValue")).apply(node => {
            node.append(this.expression(r))
          })
        })

        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private deleteStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("DeleteStatement").apply(node => {
      if (prefix) {
        for (const token of prefix) {
          node.append(token)
        }
      }
      node.append(this.deleteClause(r))
    })
  }

  private deleteClause(r: TokenReader) {
    return new Node("DeleteClause").apply(node => {
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
        node.append(this.returningClause(r))
      }
    })
  }

  private selectStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("SelectStatement").apply(node => {
      if (prefix) {
        for (const token of prefix) {
          node.append(token)
        }
      }

      let current: Node
      do {
        current = this.selectClause(r)
        if (r.peekIf(Keyword.UNION)) {
          current = new Node("UnionOperation").apply(node => {
            node.append(current)
            node.append(r.consume())
          })
          if (r.peekIf(Keyword.ALL)) {
            current.append(new Node("AllOption")).apply(node => {
              node.append(r.consume())
            })
          }
        } else if (r.peekIf(Keyword.INTERSECT)) {
          current = new Node("IntersectOperation").apply(node => {
            node.append(current)
            node.append(r.consume())
          })
        } else if (r.peekIf(Keyword.EXCEPT)) {
          current = new Node("ExceptOperation").apply(node => {
            node.append(current)
            node.append(r.consume())
          })
        } else {
          break
        }
      } while (!r.peek().eos)
      node.append(current)

      if (r.peekIf(Keyword.ORDER)) {
        node.append(this.orderByClause(r))
      }
      if (r.peekIf(Keyword.LIMIT)) {
        node.append(this.limitClause(r))
      }
    })
  }

  private selectClause(r: TokenReader) {
    return new Node("SelectClause").apply(node => {
      if (r.peekIf(Keyword.VALUES)) {
        node.append(this.valuesClause(r))
      } else {
        node.append(r.consume(Keyword.SELECT))
        if (r.peekIf(Keyword.DISTINCT)) {
          node.append(new Node("DistinctOption")).apply(node => {
            node.append(r.consume())
          })
        } else if (r.peekIf(Keyword.ALL)) {
          node.append(new Node("AllOption")).apply(node => {
            node.append(r.consume())
          })
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
    })
  }

  private withClause(r: TokenReader) {
    return new Node("WithClause").apply(node => {
      node.append(r.consume(Keyword.WITH))

      if (r.peekIf(Keyword.RECURSIVE)) {
        node.append(new Node("RecursiveOption")).apply(node => {
          node.append(r.consume())
        })
      }

      do {
        node.append(new Node("CommonTable")).apply(node => {
          node.append(this.identifier(r, "ObjectName"))
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("ColumnList")).apply(node => {
              node.append(r.consume())
              do {
                node.append(this.identifier(r, "ColumnName"))
                if (r.peekIf(TokenType.Comma)) {
                  node.append(r.consume())
                } else {
                  break
                }
              } while (!r.peek().eos)
              node.append(r.consume(TokenType.RightParen))
            })
          }
          node.append(r.consume(Keyword.AS))

          if (r.peekIf(Keyword.MATERIALIZED) || r.peekIf(Keyword.NOT, Keyword.MATERIALIZED)) {
            node.append(new Node("MaterializedOption")).apply(node => {
              if (r.peekIf(Keyword.NOT)) {
                node.name = "NotMaterializedOption"
                node.append(r.consume())
              }
              node.append(r.consume())
            })
          }

          node.append(r.consume(TokenType.LeftParen))
          node.append(this.selectStatement(r))
          node.append(r.consume(TokenType.RightParen))
        })

        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private selectColumns(r: TokenReader) {
    return new Node("SelectColumnList").apply(node => {
      do {
        node.append(new Node("SelectColumn")).apply(node => {
          if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
            node.append(new Node("AllColumnsOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(
            [TokenType.Identifier, TokenType.String],
            TokenType.Dot,
            { type: TokenType.Operator, text: "*" }
          )) {
            node.append(this.identifier(r, "SchemaName"))
            node.append(new Node("AllColumnsOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume())
            })
          } else {
            node.append(this.expression(r))
            if (r.peekIf(Keyword.AS)) {
              node.append(r.consume())
              node.append(this.identifier(r, "ColumnAlias"))
            } else if (r.peekIf([TokenType.Identifier, TokenType.String])) {
              node.append(this.identifier(r, "ColumnAlias"))
            }
          }
        })
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private fromClause(r: TokenReader) {
    return new Node("FromClause").apply(node => {
      node.append(r.consume(Keyword.FROM))
      let hasJoinClause = false
      do {
        node.append(new Node("ObjectReference")).apply(node => {
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            node.name = "Subquery"
            if (r.peekIf(Keyword.WITH) || r.peekIf(Keyword.SELECT)) {
              node.append(this.selectStatement(r))
              node.append(r.consume(TokenType.RightParen))
            } else {
              node.append(this.fromClause(r))
              node.append(r.consume(TokenType.RightParen))
            }
          } else {
            const ident = this.identifier(r, "ObjectName")
            node.append(ident)
            if (r.peekIf(TokenType.Dot)) {
              ident.name = "SchemaName"
              node.append(r.consume())
              node.append(this.identifier(r, "ObjectName"))
            }
            if (r.peekIf(TokenType.LeftParen)) {
              node.name = "TableFunction"
              node.append(r.consume())
              node.append(new Node("ArgumentList")).apply(node => {
                while (!r.peekIf(TokenType.RightParen)) {
                  node.append(new Node("Argument")).apply(node => {
                    node.append(this.expression(r))
                  })
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                }
              })
              node.append(r.consume(TokenType.RightParen))
            }
          }
          if (r.peekIf(Keyword.AS)) {
            node.append(r.consume())
            node.append(this.identifier(r, "ObjectAlias"))
          } else if (r.peekIf(TokenType.Identifier)) {
            node.append(this.identifier(r, "ObjectAlias"))
          }
          while (r.peekIf(
            [Keyword.NATURAL, Keyword.JOIN, Keyword.CROSS, Keyword.INNER, Keyword.LEFT, Keyword.RIGHT, Keyword.FULL]
          )) {
            hasJoinClause = true
            node.append(this.joinClause(r))
          }
        })

        if (!hasJoinClause && r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private joinClause(r: TokenReader) {
    return new Node("InnerJoinClause").apply(node => {
      if (r.peekIf(Keyword.CROSS)) {
        node.name = "CrossJoinClause"
        node.append(r.consume())
      } else {
        if (r.peekIf(Keyword.NATURAL)) {
          node.append(new Node("NatualOption")).apply(node => {
            node.append(r.consume())
          })
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
      } else if (r.peekIf(TokenType.Identifier)) {
        node.append(this.identifier(r, "ObjectAlias"))
      }

      if (r.peekIf(Keyword.ON)) {
        node.append(new Node("JoinOnClause")).apply(node => {
          node.append(r.consume())
          node.append(this.expression(r))
        })
      } else if (r.peekIf(Keyword.USING)) {
        node.append(new Node("UsingClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          node.append(r.consume(TokenType.RightParen))
        })
      }
    })
  }

  private whereClause(r: TokenReader) {
    return new Node("WhereClause").apply(node => {
      node.append(r.consume(Keyword.WHERE))
      node.append(this.expression(r))
    })
  }

  private gropuByClause(r: TokenReader) {
    return new Node("GroupByClause").apply(node => {
      node.append(r.consume(Keyword.GROUP))
      node.append(r.consume(Keyword.BY))
      do {
        node.append(this.expression(r))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private havingClause(r: TokenReader) {
    return new Node("HavingClause").apply(node => {
      node.append(r.consume(Keyword.HAVING))
      node.append(this.expression(r))
    })
  }

  private windowClause(r: TokenReader) {
    return new Node("WindowClause").apply(node => {
      node.append(r.consume(Keyword.WINDOW))
      do {
        node.append(this.identifier(r, "WindowName"))
        node.append(r.consume(Keyword.AS))
        node.append(this.window(r))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private window(r: TokenReader) {
    return new Node("Window").apply(node => {
      if (!r.peekIf(Keyword.PARTITION)) {
        node.append(this.identifier(r, "BaseWindowName"))
      }
      if (r.peekIf(Keyword.PARTITION)) {
        node.append(this.partitionByClause(r))
      }
      if (r.peekIf(Keyword.ORDER)) {
        node.append(this.orderByClause(r))
      }
      node.append(new Node("FrameClause")).apply(node => {
        if (r.peekIf(Keyword.RANGE)) {
          node.append(new Node("RangeOption")).apply(node => {
            node.append(r.consume())
          })
        } else if (r.peekIf(Keyword.ROWS)) {
          node.append(new Node("RowsOption")).apply(node => {
            node.append(r.consume())
          })
        } else if (r.peekIf(Keyword.GROUPS)) {
          node.append(new Node("GroupsOption")).apply(node => {
            node.append(r.consume())
          })
        }
        if (r.peekIf(Keyword.CURRENT)) {
          node.append(new Node("FrameStartClause")).apply(node => {
            node.append(new Node("CurrentRowOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.ROW))
            })
          })
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          node.append(new Node("FrameStartClause")).apply(node => {
            node.append(new Node("UnboundedPrecedingOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.PRECEDING))
            })
          })
        } else if (r.peekIf(Keyword.BETWEEN)) {
          node.append(r.consume())
          node.append(new Node("FrameStartClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.CURRENT)) {
              node.append(new Node("CurrentRowOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume(Keyword.ROW))
              })
            } else if (r.peekIf(Keyword.UNBOUNDED)) {
              node.append(new Node("UnboundedPrecedingOption")).apply(node => {
                node.append(r.consume(),)
                node.append(r.consume(Keyword.PRECEDING))
              })
            } else {
              const expr = this.expression(r)
              if (r.peekIf(Keyword.PRECEDING)) {
                node.append(new Node("PrecedingOption")).apply(node => {
                  node.append(expr)
                  node.append(r.consume())
                })
              } else if (r.peekIf(Keyword.FOLLOWING)) {
                node.append(new Node("FollowingOption")).apply(node => {
                  node.append(expr)
                  node.append(r.consume())
                })
              } else {
                throw r.createParseError()
              }
            }
          })
          node.append(r.consume(Keyword.AND))
          node.append(new Node("FrameEndClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.CURRENT)) {
              node.append(new Node("CurrentRowOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume(Keyword.ROW))
              })
            } else if (r.peekIf(Keyword.UNBOUNDED)) {
              node.append(new Node("UnboundedFollowingOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume(Keyword.FOLLOWING))
              })
            } else {
              const expr = this.expression(r)
              if (r.peekIf(Keyword.PRECEDING)) {
                node.append(new Node("PrecedingOption")).apply(node => {
                  node.append(expr)
                  node.append(r.consume())
                })
              } else if (r.peekIf(Keyword.FOLLOWING)) {
                node.append(new Node("FollowingOption")).apply(node => {
                  node.append(expr)
                  node.append(r.consume())
                })
              } else {
                throw r.createParseError()
              }
            }
          })
        } else {
          node.append(new Node("FrameStartClause")).apply(node => {
            node.append(new Node("PrecedingOption")).apply(node => {
              node.append(this.expression(r))
              node.append(r.consume(Keyword.PRECEDING))
            })
          })
        }
      })
      if (r.peekIf(Keyword.EXCLUDE)) {
        node.append(new Node("ExcludeClause")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.NO)) {
            node.append(new Node("NoOthersOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.OTHERS))
            })
          } else if (r.peekIf(Keyword.CURRENT)) {
            node.append(new Node("CurrentRowOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.ROW))
            })
          } else if (r.peekIf(Keyword.GROUP)) {
            node.append(new Node("GroupOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.TIES)) {
            node.append(new Node("TiesOption")).apply(node => {
              node.append(r.consume())
            })
          } else {
            throw r.createParseError()
          }
        })
      }
    })
  }

  private partitionByClause(r: TokenReader) {
    return new Node("PartitionByClause").apply(node => {
      node.append(r.consume(Keyword.PARTITION))
      node.append(r.consume(Keyword.BY))
      do {
        node.append(this.expression(r))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private returningClause(r: TokenReader) {
    return new Node("ReturningClause").apply(node => {
      node.append(r.consume(Keyword.RETURNING))
      node.append(this.selectColumns(r))
    })
  }

  private orderByClause(r: TokenReader) {
    return new Node("OrderByClause").apply(node => {
      node.append(r.consume(Keyword.ORDER))
      node.append(r.consume(Keyword.BY))
      do {
        const column = this.sortingColumn(r)
        node.append(column)
        if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
          column.append(new Node("NullsFirstOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume())
          })
        } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
          column.append(new Node("NullsLastOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume())
          })
        }

        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private limitClause(r: TokenReader) {
    return new Node("LimitClause").apply(node => {
      node.append(r.consume(Keyword.LIMIT))
      node.append(new Node("LimitOption")).apply(node => {
        node.append(this.expression(r))
      })
      if (r.peekIf(Keyword.OFFSET)) {
        node.append(new Node("OffsetOption")).apply(node => {
          node.append(r.consume())
          node.append(this.expression(r))
        })
      } else if (r.peekIf(TokenType.Comma)) {
        node.name = "OffsetOption"
        node.append(r.consume())
        node.append(new Node("LimitOption")).apply(node => {
          node.append(this.expression(r))
        })
      }
    })
  }

  private tableColumn(r: TokenReader) {
    return new Node("TableColumn").apply(node => {
      node.append(this.identifier(r, "ColumnName"))

      if (r.peekIf(TokenType.Identifier)) {
        node.append(new Node("ColumnType")).apply(node => {
          node.append(this.typeName(r))
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            node.append(new Node("LengthOption")).apply(node => {
              node.append(this.numericLiteral(r))
            })
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
              node.append(new Node("ScaleOption")).apply(node => {
                node.append(this.numericLiteral(r))
              })
            }
            node.append(r.consume(TokenType.RightParen))
          }
        })
      }

      while (!r.peekIf([TokenType.Comma, TokenType.RightParen])) {
        node.append(this.columnConstraint(r))
      }
    })
  }

  private columnConstraint(r: TokenReader) {
    return new Node("ColumnConstraint").apply(node => {
      if (r.peekIf(Keyword.CONSTRAINT)) {
        node.append(r.consume())
        node.append(this.identifier(r, "ConstraintName"))
      }
      if (r.peekIf(Keyword.PRIMARY)) {
        node.append(new Node("PrimaryKeyConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.KEY))

          if (r.peekIf(Keyword.ASC)) {
            node.append(new Node("AscOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.DESC)) {
            node.append(new Node("DescOption")).apply(node => {
              node.append(r.consume())
            })
          }
          if (r.peekIf(Keyword.ON)) {
            node.append(this.conflictAction(r, [
              r.consume(),
              r.consume(Keyword.CONFLICT)
            ]))
          }
          if (r.peekIf(Keyword.AUTOINCREMENT)) {
            node.append(new Node("AutoincrementOption")).apply(node => {
              node.append(r.consume())
            })
          }
        })
      } else if (r.peekIf(Keyword.NOT)) {
        node.append(new Node("NotNullConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.NULL))
          if (r.peekIf(Keyword.ON)) {
            node.append(this.conflictAction(r, [
              r.consume(),
              r.consume(Keyword.CONFLICT)
            ]))
          }
        })
      } else if (r.peekIf(Keyword.NULL)) {
        node.append(new Node("NullConstraint")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.ON)) {
            node.append(this.conflictAction(r, [
              r.consume(),
              r.consume(Keyword.CONFLICT)
            ]))
          }
        })
      } else if (r.peekIf(Keyword.UNIQUE)) {
        node.append(new Node("UniqueConstraint")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.ON)) {
            node.append(this.conflictAction(r, [
              r.consume(),
              r.consume(Keyword.CONFLICT)
            ]))
          }
        })
      } else if (r.peekIf(Keyword.CHECK)) {
        node.append(new Node("CheckConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          node.append(this.expression(r))
          node.append(r.consume(TokenType.RightParen))
        })
      } else if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultOption")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            node.append(this.expression(r))
            node.append(r.consume(TokenType.RightParen))
          } else {
            node.append(this.expression(r))
          }
        })
      } else if (r.peekIf(Keyword.COLLATE)) {
        node.append(new Node("CollateOption")).apply(node => {
          node.append(r.consume())
          node.append(this.identifier(r, "CollateName"))
        })
      } else if (r.peekIf(Keyword.REFERENCES)) {
        node.append(new Node("ForeignKeyConstraint")).apply(node => {
          node.append(this.referencesClause(r))
        })
      } else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
        node.append(new Node("GeneratedColumnOption")).apply(node => {
          if (r.peekIf(Keyword.GENERATED)) {
            node.append(r.consume())
            node.append(r.consume(Keyword.ALWAYS))
          }
          node.append(r.consume(Keyword.AS))
          node.append(r.consume(TokenType.LeftParen))
          node.append(new Node("GeneratedColumn")).apply(node => {
            node.append(this.expression(r))
          })
          node.append(r.consume(TokenType.RightParen))

          if (r.peekIf(Keyword.STORED)) {
            node.append(new Node("StoredOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.VIRTUAL)) {
            node.append(new Node("virtual option")).apply(node => {
              node.append(r.consume())
            })
          }
        })
      } else {
        throw r.createParseError()
      }
    })
  }

  private tableConstraint(r: TokenReader) {
    return new Node("TableConstraint").apply(node => {
      if (r.peekIf(Keyword.CONSTRAINT)) {
        node.append(r.consume())
        node.append(this.identifier(r, "ConstraintName"))
      }
      if (r.peekIf(Keyword.PRIMARY)) {
        node.append(new Node("PrimaryKeyConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.KEY))
          node.append(new Node("SortingColumnList")).apply(node => {
            node.append(r.consume(TokenType.LeftParen))
            do {
              node.append(this.sortingColumn(r))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })
          if (r.peekIf(Keyword.ON)) {
            node.append(this.conflictAction(r, [
              r.consume(),
              r.consume(Keyword.CONFLICT)
            ]))
          }
        })
      } else if (r.peekIf(Keyword.UNIQUE)) {
        node.append(new Node("UniqueConstraint")).apply(node => {
          node.append(r.consume())
          node.append(new Node("SortingColumnList")).apply(node => {
            node.append(r.consume(TokenType.LeftParen))
            do {
              node.append(this.sortingColumn(r))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })
          if (r.peekIf(Keyword.ON)) {
            node.append(this.conflictAction(r, [
              r.consume(),
              r.consume(Keyword.CONFLICT)
            ]))
          }
        })
      } else if (r.peekIf(Keyword.CHECK)) {
        node.append(new Node("CheckConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          node.append(this.expression(r))
          node.append(r.consume(TokenType.RightParen))
        })
      } else if (r.peekIf(Keyword.FOREIGN)) {
        node.append(new Node("ForeignKeyConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.KEY))
          node.append(new Node("ColumnList")).apply(node => {
            node.append(r.consume(TokenType.LeftParen))
            do {
              node.append(this.identifier(r, "ColumnName"))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })
          node.append(this.referencesClause(r))
        })
      } else {
        throw r.createParseError()
      }
    })
  }

  private referencesClause(r: TokenReader) {
    return new Node("ReferencesClause").apply(node => {
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
      if (r.peekIf(TokenType.LeftParen)) {
        node.append(new Node("ColumnList")).apply(node => {
          node.append(r.consume())
          do {
            node.append(this.identifier(r, "ColumnName"))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))
        })
      }

      while (!r.peek().eos && r.peekIf([Keyword.ON, Keyword.MATCH])) {
        if (r.peekIf(Keyword.ON)) {
          node.append(new Node("OnUpdateClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.DELETE)) {
              node.name = "OnDeleteClause"
              node.append(r.consume())
            } else {
              node.append(r.consume(Keyword.UPDATE))
            }
            if (r.peekIf(Keyword.SET, Keyword.NULL)) {
              node.append(new Node("SetNullOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.SET, Keyword.DEFAULT)) {
              node.append(new Node("SetDefaultOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.CASCADE)) {
              node.append(new Node("CascadeOption")).apply(node => {
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.RESTRICT)) {
              node.append(new Node("RestrictOption")).apply(node => {
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.NO, Keyword.ACTION)) {
              node.append(new Node("NoActionOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
              })
            } else {
              throw r.createParseError()
            }
          })
        } else if (r.peekIf(Keyword.MATCH)) {
          node.append(new Node("")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.SIMPLE)) {
              node.name = "MatchSimpleOption"
              node.append(r.consume())
            } else if (r.peekIf(Keyword.FULL)) {
              node.name = "MatchFullOption"
              node.append(r.consume())
            } else if (r.peekIf(Keyword.PARTIAL)) {
              node.name = "MatchPartialOption"
              node.append(r.consume())
            } else {
              throw r.createParseError()
            }
          })
        } else {
          throw r.createParseError()
        }
      }

      if (r.peekIf(Keyword.DEFERRABLE) || r.peekIf(Keyword.NOT, Keyword.DEFERRABLE)) {
        node.append(new Node("DeferrableOption")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.name = "NotDeferrableOption"
            node.append(r.consume())
          }
          node.append(r.consume())

          if (r.peekIf(Keyword.INITIALLY, Keyword.DEFERRED)) {
            node.append(new Node("InitiallyDeferredOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.INITIALLY, Keyword.IMMEDIATE)) {
            node.append(new Node("InitiallyImmediateOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume())
            })
          }
        })
      }
    })
  }

  private typeName(r: TokenReader) {
    return this.identifier(r, "TypeName").apply(node => {
      while (r.peekIf([TokenType.Identifier, TokenType.String])) {
        const ident = this.identifier(r, "")
        for (const child of ident.children) {
          node.append(child)
        }
        node.data.value = node.data.value ? node.data.value + " " + ident.data.value : ident.data.value
      }
    })
  }

  private conflictAction(r: TokenReader, prefix?: Token[]) {
    return new Node("").apply(node => {
      if (prefix) {
        for (const token of prefix) {
          node.append(token)
        }
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
    })
  }

  private pragmaValue(r: TokenReader, name: string) {
    return new Node(name).apply(node => {
      if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
        node.append(this.numericLiteral(r))
      } else if (r.peekIf(TokenType.Numeric)) {
        node.append(this.numericLiteral(r))
      } else if (r.peekIf(TokenType.String)) {
        node.append(this.stringLiteral(r))
      } else if (r.peekIf(TokenType.Identifier)) {
        node.append(this.identifier(r, "PragmaLiteral"))
      } else {
        throw r.createParseError()
      }
    })
  }

  private expressionList(r: TokenReader) {
    return new Node("ExpressionList").apply(node => {
      node.append(r.consume(TokenType.LeftParen))
      while (!r.peek().eos) {
        node.append(this.expression(r))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      }
      node.append(r.consume(TokenType.RightParen))  
    })
  }

  private expression(r: TokenReader, priority = 0) {
    let current: Node
    if (priority < 9 && r.peekIf(Keyword.NOT)) {
      current = new Node("NotOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 9))
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
      current = new Node("BitwiseNotOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r))
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
      current = new Node("UnaryPlusOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r))
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
      current = new Node("UnaryMinusOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r))
      })
    } else {
      current = this.expressionValue(r)
    }

    while (!r.peek().eos) {
      if (priority < 11 && r.peekIf(Keyword.OR)) {
        current = new Node("OrOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 11))
        })
      } else if (priority < 10 && r.peekIf(Keyword.AND)) {
        current = new Node("AndOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 10))
        })
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: ["=", "=="] })) {
        current = new Node("EqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: ["<>", "!="] })) {
        current = new Node("NotEqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf(Keyword.IS)) {
        current = new Node("Is").apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name += "Not"
          }
          if (r.peekIf(Keyword.DISTINCT)) {
            node.append(r.consume())
            node.append(r.consume(Keyword.FROM))
            node.name += "DistinctFromOperation"
          } else {
            node.name += "Operation"
          }
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf(Keyword.BETWEEN) || r.peekIf(Keyword.NOT, Keyword.BETWEEN)) {
        current = new Node("BetweenOperation").apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(this.expression(r, 8))
          node.append(r.consume(Keyword.AND))
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf(Keyword.IN) || r.peekIf(Keyword.NOT, Keyword.IN)) {
        current = new Node("InOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.SELECT])) {
            node.append(new Node("Subquery")).apply(node => {
              node.append(r.consume())
              node.append(this.selectStatement(r))
              node.append(r.consume(TokenType.RightParen))
            })
          } else if (r.peekIf(TokenType.LeftParen)) {
            node.append(this.expressionList(r))
          } else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
            node.append(new Node("Function")).apply(node => {
              node.append(new Node("ObjectName")).apply(node => {
                node.append(r.consume())
              })
              node.append(new Node("ArgumentList")).apply(node => {
                node.append(r.consume(TokenType.LeftParen))
                while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
                  node.append(new Node("Argument")).apply(node => {
                    node.append(this.expression(r))
                  })
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                }
                node.append(r.consume(TokenType.RightParen))
              })
            })
          } else if (r.peekIf([TokenType.Identifier, TokenType.String])) {
            node.append(this.columnReference(r))
          } else {
            throw r.createParseError()
          }
        })
      } else if (priority < 8 && (r.peekIf(Keyword.MATCH) || r.peekIf(Keyword.NOT, Keyword.MATCH))) {
        current = new Node("MatchOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && (r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE))) {
        current = new Node("LikeOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(this.expression(r, 8))
          if (r.peekIf(Keyword.ESCAPE)) {
            node.append(new Node("EscapeOption")).apply(node => {
              node.append(this.expression(r, 6))
            })
          }
        })
      } else if (priority < 8 && (r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP))) {
        current = new Node("RegexpOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && (r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB))) {
        current = new Node("GlobOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf(Keyword.ISNULL)) {
        current = new Node("IsNullOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
        })
      } else if (priority < 8 && r.peekIf(Keyword.NOTNULL)) {
        current = new Node("IsNotNullOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
        })
      } else if (priority < 8 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
        current = new Node("IsNotNullOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(r.consume())
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<" })) {
        current = new Node("LessThanOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">" })) {
        current = new Node("GreaterThanOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<=" })) {
        current = new Node("LessThanOrEqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">=" })) {
        current = new Node("GreaterThanOrEqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "&" })) {
        current = new Node("BitwiseAndOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "|" })) {
        current = new Node("BitwiseOrOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "<<" })) {
        current = new Node("BitwiseLeftShiftOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: ">>" })) {
        current = new Node("BitwiseRightShiftOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
        current = new Node("AddOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 4))
        })
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
        current = new Node("SubtractOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 4))
        })
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "*" })) {
        current = new Node("MultiplyOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 3))
        })
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "/" })) {
        current = new Node("DivideOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 3))
        })
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "%" })) {
        current = new Node("ModuloOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 3))
        })
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "||" })) {
        current = new Node("ConcatenateOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
        })
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->" })) {
        current = new Node("JsonExtractOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
        })
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->>" })) {
        current = new Node("JsonExtractValueOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
        })
      } else if (priority < 1 && r.peekIf(Keyword.COLLATE)) {
        current = new Node("CollateOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.identifier(r, "CollationName"))
        })
      } else {
        break
      }
    }
    return current
  }

  private expressionValue(r: TokenReader) {
    if (r.peekIf(Keyword.NULL)) {
      return new Node("NullLiteral").apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      return this.booleanLiteral(r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      return new Node("Function").apply(node => {
        node.append(new Node("ObjectName")).apply(node => {
          const token = r.consume()
          node.append(token)
          node.data.value = token.text.toUpperCase()
        })
      })
    } else if (r.peekIf(Keyword.CASE)) {
      return new Node("CaseClause").apply(node => {
        node.append(r.consume())
        if (!r.peekIf(Keyword.WHEN)) {
          node.append(this.expression(r))
        }
        node.append(new Node("CaseConditionList")).apply(node => {
          do {
            node.append(new Node("CaseCondition")).apply(node => {
              node.append(new Node("WhenClause")).apply(node => {
                node.append(r.consume(Keyword.WHEN))
                node.append(this.expression(r))
              })
              node.append(new Node("ThenClause")).apply(node => {
                node.append(r.consume(Keyword.THEN))
                node.append(this.expression(r))
              })
            })
          } while (!r.peek().eos)
        })
        if (r.peekIf(Keyword.ELSE)) {
          node.append(new Node("ElseClause")).apply(node => {
            node.append(r.consume())
            node.append(this.expression(r))
          })
        }
        node.append(r.consume(Keyword.END))
      })
    } else if (r.peekIf(Keyword.CAST)) {
      return new Node("Function").apply(node => {
        const token = r.consume()
        node.append(new Node("ObjectName")).apply(node => {
          node.data.value = token.text.toUpperCase()
          node.append(token)
        })
        node.append(new Node("ArgumentList")).apply(node => {
          node.append(r.consume(TokenType.LeftParen))
          node.append(new Node("Argument")).apply(node => {
            node.append(this.expression(r))
          })
          node.append(r.consume(Keyword.AS))
          node.append(this.typeName(r))
          node.append(r.consume(TokenType.RightParen))
        })
      })
    } else if (r.peekIf(Keyword.RAISE)) {
      return new Node("Function").apply(node => {
        const token = r.consume()
        node.append(new Node("ObjectName")).apply(node => {
          node.data.value = token.text.toUpperCase()
          node.append(token)
        })
        node.append(new Node("ArgumentList")).apply(node => {
          node.append(r.consume(TokenType.LeftParen))
          node.append(new Node("Argument")).apply(node => {
            node.append(this.conflictAction(r))
          })
          node.append(r.consume(TokenType.Comma))
          node.append(new Node("Argument")).apply(node => {
            node.append(this.expression(r))
          })
          node.append(r.consume(TokenType.RightParen))
        })
      })
    } else if (r.peekIf(Keyword.EXISTS)) {
      return new Node("ExistsOperation").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen, Keyword.VALUES)) {
      return new Node("Subquery").apply(node => {
        node.append(r.consume())
        node.append(this.valuesClause(r))
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen, Keyword.SELECT)) {
      return new Node("Subquery").apply(node => {
        node.append(r.consume())
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen)) {
      return new Node("Expression").apply(node => {
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
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
      return new Node("Function").apply(node => {
        node.append(new Node("ObjectName")).apply(node => {
          node.append(r.consume())
        })

        node.append(new Node("ArgumentList")).apply(node => {
          node.append(r.consume(TokenType.LeftParen))
          if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
            node.append(new Node("Argument")).apply(node => {
              node.append(new Node("AllColumnsOption")).apply(node => {
                node.append(r.consume())
              })
            })
          } else {
            if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption")).apply(node => {
                node.append(r.consume())
              })
            }
            while (!r.peek().eos) {
              node.append(new Node("Argument")).apply(node => {
                node.append(this.expression(r))
              })
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            }
          }
          node.append(r.consume(TokenType.RightParen))
        })
        if (r.peekIf(Keyword.FILTER)) {
          node.append(new Node("FilterClause")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(TokenType.LeftParen))
            node.append(this.whereClause(r))
            node.append(r.consume(TokenType.RightParen))
          })
        }
        if (r.peekIf(Keyword.OVER)) {
          node.append(new Node("OverClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(TokenType.LeftParen)) {
              node.append(r.consume())
              node.append(this.window(r))
              node.append(r.consume(TokenType.RightParen))
            } else {
              node.append(this.identifier(r, "WindowName"))
            }
          })
        }
      })
    } else if (r.peekIf(TokenType.Numeric)) {
      return this.numericLiteral(r)
    } else if (r.peekIf(TokenType.String) || r.peekIf({ type: TokenType.Identifier, text: /^"/ })) {
      return this.stringLiteral(r)
    } else if (r.peekIf(TokenType.Blob)) {
      return this.blobLiteral(r)
    } else if (r.peekIf(TokenType.Identifier) || r.peekIf(TokenType.String, TokenType.Dot)) {
      return this.columnReference(r)
    } else if (r.peekIf(TokenType.BindVariable)) {
      const token = r.consume()
      if (token.text.startsWith("?")) {
        return new Node("PositionalBindVariable").apply(node => {
          node.append(token)

          let value = token.text.substring(1)
          if (value) {
            r.state.bindPosition = Number.parseInt(value, 10)
          } else {
            const pos = r.state.bindPosition ? r.state.bindPosition + 1 : 1
            value = `${pos}`
            r.state.bindPosition = pos
          }
          node.data.value = value
        })
      } else {
        return new Node("NamedBindVariable").apply(node => {
          node.append(token)
          node.data.value = token.text.substring(1)
        })
      }
    } else {
      throw r.createParseError()
    }
  }

  private sortingColumn(r: TokenReader) {
    return new Node("SortingColumn").apply(node => {
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
        node.append(new Node("AscOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.DESC)) {
        node.append(new Node("DescOption")).apply(node => {
          node.append(r.consume())
        })
      }
    })
  }

  private columnReference(r: TokenReader) {
    return new Node("ColumnReference").apply(node => {
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
    })
  }

  private identifier(r: TokenReader, name: string) {
    return new Node(name).apply(node => {
      if (r.peekIf([TokenType.Identifier, TokenType.String])) {
        node.append(r.consume())
        node.data.value = dequote(r.peek(-1).text)
      } else {
        throw r.createParseError()
      }
    })
  }

  private numericLiteral(r: TokenReader) {
    return new Node("NumericLiteral").apply(node => {
      if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
        const token1 = r.consume()
        node.append(token1)
        const token2 = r.consume(TokenType.Numeric)
        node.append(token2)
        node.data.value = new Decimal(token1.text + token2.text).toString()
      } else {
        const token = r.consume(TokenType.Numeric)
        node.append(token)
        node.data.value = token.text.toLowerCase()
      }
    })
  }

  private stringLiteral(r: TokenReader) {
    return new Node("StringLiteral").apply(node => {
      if (r.peekIf({ type: TokenType.Identifier, text: /^"/ })) {
        const token = r.consume()
        node.append(token)
        node.data.value = dequote(token.text)
      } else {
        const token = r.consume(TokenType.String)
        node.append(token)
        node.data.value = dequote(token.text)
      }
    })
  }

  private blobLiteral(r: TokenReader) {
    return new Node("BlobLiteral").apply(node => {
      const token = r.consume(TokenType.Blob)
      node.append(token)
      node.data.value = token.text.substring(2, token.text.length - 1).toUpperCase()
    })
  }

  private booleanLiteral(r: TokenReader) {
    return new Node("BooleanLiteral").apply(node => {
      if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
        const token = r.consume()
        node.append(token)
        node.data.value = token.text.toUpperCase()
      } else {
        throw r.createParseError()
      }
    })
  }
}
