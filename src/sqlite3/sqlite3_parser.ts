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
  public compileOptions: Set<string>

  constructor(
    options: Record<string, any> = {},
  ) {
    super(options.lexer ?? new Sqlite3Lexer(options), options)
    this.compileOptions = new Set(options.compileOptions || [])
  }

  parseTokens(tokens: Token[]): Node {
    const r = new TokenReader(tokens)

    const root = new Node("Script")
    const errors = []

    while (r.peek()) {
      try {
        if (r.peekIf([TokenType.SemiColon, TokenType.Delimiter, TokenType.SectionBreak])) {
          root.append(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          this.command(root, r)
        } else if (r.peekIf(Keyword.EXPLAIN)) {
          this.explainStatement(root, r)
        } else {
          this.statement(root, r)
        }
      } catch (err) {
        if (err instanceof ParseError) {
          this.unknown(root, r)
          errors.push(err)
        } else {
          throw err
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

  private unknown(parent: Node, r: TokenReader) {
    if (!r.peek().eos) {
      return parent.append(new Node("Unknown")).apply(node => {
        while (!r.peek().eos) {
          node.append(r.consume())
        }
      })
    }
  }

  private command(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("CommandStatement"))
    try {
      return current.apply(node => {
        node.append(new Node("CommandName")).apply(node => {
          const token = r.consume(TokenType.Command)
          node.append(token)
          node.data.value = token.text
        })
        node.append(new Node("CommandArgumentList")).apply(node => {
          while (!r.peek().eos) {
            node.append(new Node("CommandArgument")).apply(node => {
              const token = r.consume()
              node.append(token)
              node.data.value = dequote(token.text)
            })
          }
        })
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private explainStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("ExplainStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.EXPLAIN))
        if (r.peekIf(Keyword.QUERY)) {
          node.append(new Node("QueryPlanOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.PLAN))
          })
        }
        this.statement(node, r)
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private statement(parent: Node, r: TokenReader) {
    if (r.peekIf(Keyword.CREATE)) {
      const mark = r.pos
      r.consume()
      while (!r.peek().eos && !Sqlite3Lexer.isObjectStart(r.peek().keyword)) {
        r.consume()
      }

      if (r.peekIf(Keyword.TABLE)) {
        r.pos = mark
        return this.createTableStatement(parent, r)
      } else if (r.peekIf(Keyword.VIEW)) {
        r.pos = mark
        return this.createViewStatement(parent, r)
      } else if (r.peekIf(Keyword.TRIGGER)) {
        r.pos = mark
        return this.createTriggerStatement(parent, r)
      } else if (r.peekIf(Keyword.INDEX)) {
        r.pos = mark
        return this.createIndexStatement(parent, r)
      }
    } else if (r.peekIf(Keyword.ALTER)) {
      const mark = r.pos
      r.consume()

      if (r.peekIf(Keyword.TABLE)) {
        r.pos = mark
        return this.alterTableStatement(parent, r)
      }
    } else if (r.peekIf(Keyword.DROP)) {
      const mark = r.pos
      r.consume()

      if (r.peekIf(Keyword.TABLE)) {
        r.pos = mark
        return this.dropTableStatement(parent, r)
      } else if (r.peekIf(Keyword.VIEW)) {
        r.pos = mark
        return this.dropViewStatement(parent, r)
      } else if (r.peekIf(Keyword.TRIGGER)) {
        r.pos = mark
        return this.dropTriggerStatement(parent, r)
      } else if (r.peekIf(Keyword.INDEX)) {
        r.pos = mark
        return this.dropIndexStatement(parent, r)
      }
    } else if (r.peekIf(Keyword.ATTACH)) {
      return this.attachDatabaseStatement(parent, r)
    } else if (r.peekIf(Keyword.DETACH)) {
      return this.detachDatabaseStatement(parent, r)
    } else if (r.peekIf(Keyword.ANALYZE)) {
      return this.analyzeStatement(parent, r)
    } else if (r.peekIf(Keyword.REINDEX)) {
      return this.reindexStatement(parent, r)
    } else if (r.peekIf(Keyword.VACUUM)) {
      return this.vacuumStatement(parent, r)
    } else if (r.peekIf(Keyword.PRAGMA)) {
      return this.pragmaStatement(parent, r)
    } else if (r.peekIf(Keyword.BEGIN)) {
      return this.beginTransactionStatement(parent, r)
    } else if (r.peekIf(Keyword.SAVEPOINT)) {
      return this.savepointStatement(parent, r)
    } else if (r.peekIf(Keyword.RELEASE)) {
      return this.releaseSavepointStatement(parent, r)
    } else if (r.peekIf([Keyword.COMMIT, Keyword.END])) {
      return this.commitTransactionStatement(parent, r)
    } else if (r.peekIf(Keyword.ROLLBACK)) {
      return this.rollbackTransactionStatement(parent, r)
    } else {
      if (r.peekIf(Keyword.WITH)) {
        this.withClause(parent, r)
      }
      if (r.peekIf([Keyword.INSERT, Keyword.REPLACE])) {
        return this.insertStatement(parent, r)
      } else if (r.peekIf(Keyword.UPDATE)) {
        return this.updateStatement(parent, r)
      } else if (r.peekIf(Keyword.DELETE)) {
        return this.deleteStatement(parent, r)
      } else if (r.peekIf([Keyword.SELECT, Keyword.VALUES])) {
        return this.selectStatement(parent, r)
      }
    }
    throw r.createParseError()
  }

  private createTableStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("CreateTableStatement"))
    try {
      return current.apply(node => {
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

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }

        if (virtual) {
          node.append(new Node("UsingModuleClause")).apply(node => {
            node.append(r.consume(Keyword.USING))
            this.identifier(node, r, "ModuleName")
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
          node.append(new Node("TableColumnList")).apply(node => {
            node.append(r.consume())
            let hasTableConstraint = false
            do {
              if (!hasTableConstraint) {
                if (r.peekIf([Keyword.CONSTRAINT, Keyword.UNIQUE, Keyword.CHECK, Keyword.FOREIGN]) || r.peekIf(Keyword.PRIMARY, Keyword.KEY)) {
                  hasTableConstraint = true
                } else {
                  this.tableColumn(node, r)
                }
              }
              if (hasTableConstraint) {
                this.tableConstraint(node, r)
              }
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })

          if (r.peekIf(Keyword.WITHOUT)) {
            node.append(new Node("WithoutRowidOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.ROWID))
            })
          }
        } else if (r.peekIf(Keyword.AS)) {
          node.append(r.consume())
          this.selectStatement(node, r)
        } else {
          throw r.createParseError()
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private createViewStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("CreateViewStatement"))
    try {
      return current.apply(node => {
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

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }

        if (r.peekIf(TokenType.LeftParen)) {
          this.columnList(node, r)
        }

        node.append(r.consume(Keyword.AS))
        this.selectStatement(node, r)
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private createTriggerStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("CreateTriggerStatement"))
    try {
      return current.apply(node => {
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

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
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

            const ident = this.identifier(node, r, "ObjectName")
            if (r.peekIf(TokenType.Dot)) {
              ident.name = "SchemaName"
              node.append(r.consume())
              this.identifier(node, r, "ObjectName")
            }
          })
        } else if (r.peekIf(Keyword.UPDATE)) {
          node.append(new Node("UpdateOnClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.OF)) {
              node.append(new Node("ColumnList")).apply(node => {
                node.append(r.consume())
                do {
                  this.identifier(node, r, "ColumnName")
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                } while (!r.peek().eos)
              })
            }
            node.append(r.consume(Keyword.ON))
            const ident = this.identifier(node, r, "ObjectName")
            if (r.peekIf(TokenType.Dot)) {
              ident.name = "SchemaName"
              node.append(r.consume())
              this.identifier(node, r, "ObjectName")
            }
          })
        } else if (r.peekIf(Keyword.DELETE)) {
          node.append(new Node("DeleteOnClause")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.ON))
            const ident = this.identifier(node, r, "ObjectName")
            if (r.peekIf(TokenType.Dot)) {
              ident.name = "SchemaName"
              node.append(r.consume())
              this.identifier(node, r, "ObjectName")
            }
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
            this.expression(node, r)
          })
        }

        node.append(new Node("BeginStatement")).apply(node => {
          node.append(new Node("BeginBlock")).apply(node => {
            node.append(r.consume(Keyword.BEGIN))
            if (r.peekIf(Keyword.WITH)) {
              this.withClause(node, r)
            }
            if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
              this.insertStatement(node, r)
            } else if (r.peekIf(Keyword.UPDATE)) {
              this.updateStatement(node, r)
            } else if (r.peekIf(Keyword.DELETE)) {
              this.deleteStatement(node, r)
            } else if (r.peekIf(Keyword.SELECT)) {
              this.selectStatement(node, r)
            } else {
              throw r.createParseError()
            }
            node.append(r.consume(TokenType.SemiColon))
            node.append(r.consume(Keyword.END))
          })
        })
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private createIndexStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("CreateIndexStatement"))
    try {
      return current.apply(node => {
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

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }

        node.append(new Node("IndexOnClause")).apply(node => {
          node.append(r.consume(Keyword.ON))
          this.identifier(node, r, "ObjectName")
          node.append(new Node("SortingColumnList")).apply(node => {
            node.append(r.consume(TokenType.LeftParen))
            do {
              this.sortingColumn(node, r)
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })  
        })

        if (r.peekIf(Keyword.WHERE)) {
          this.whereClause(node, r)
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private alterTableStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("AlterTableStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.ALTER))
        node.append(r.consume(Keyword.TABLE))

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }

        if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
          node.append(new Node("RenameToObjectClause")).apply(node => {
            node.append(r.consume())
            node.append(r.consume())
            this.identifier(node, r, "ObjectName")
          })
        } else if (r.peekIf(Keyword.RENAME)) {
          node.append(new Node("RenameColumnClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.COLUMN)) {
              node.append(r.consume())
            }
            this.identifier(node, r, "ColumnName")
            node.append(new Node("RenameToColumnClause")).apply(node => {
              node.append(r.consume(Keyword.TO))
              this.identifier(node, r, "ColumnName")
            })
          })
        } else if (r.peekIf(Keyword.ADD)) {
          node.append(new Node("AddColumnClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.COLUMN)) {
              node.append(r.consume())
            }
            this.tableColumn(node, r)
          })
        } else if (r.peekIf(Keyword.DROP)) {
          node.append(new Node("DropColumnClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.COLUMN)) {
              node.append(r.consume())
            }
            this.identifier(node, r, "ColumnName")
          })
        } else {
          throw r.createParseError()
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private dropTableStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("DropTableStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.DROP))
        node.append(r.consume(Keyword.TABLE))

        if (r.peekIf(Keyword.IF)) {
          node.append(new Node("IfExistsOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.EXISTS))
          })
        }

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private dropViewStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("DropViewStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.DROP))
        node.append(r.consume(Keyword.VIEW))

        if (r.peekIf(Keyword.IF)) {
          node.append(new Node("IfExistsOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.EXISTS))
          })
        }

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private dropTriggerStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("DropTriggerStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.DROP))
        node.append(r.consume(Keyword.TRIGGER))

        if (r.peekIf(Keyword.IF)) {
          node.append(new Node("IfExistsOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.EXISTS))
          })
        }

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private dropIndexStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("DropIndexStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.DROP))
        node.append(r.consume(Keyword.INDEX))

        if (r.peekIf(Keyword.IF)) {
          node.append(new Node("IfExists")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.EXISTS))
          })
        }

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private attachDatabaseStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("AttachDatabaseStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.ATTACH))
        if (r.peekIf(Keyword.DATABASE)) {
          node.append(r.consume())
        }
        node.append(new Node("DatabaseExpression")).apply(node => {
          this.expression(node, r)
        })
        node.append(r.consume(Keyword.AS))
        this.identifier(node, r, "SchemaName")
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private detachDatabaseStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("DetachDatabaseStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.DETACH))
        if (r.peekIf(Keyword.DATABASE)) {
          node.append(r.consume())
        }
        this.identifier(node, r, "SchemaName")
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private analyzeStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("AnalyzeStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.ANALYZE))

        const ident = this.identifier(node, r, "ObjectName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "ObjectName")
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private reindexStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("ReindexStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.REINDEX))

        if (r.peekIf([TokenType.Identifier, TokenType.String])) {
          const ident = this.identifier(node, r, "ObjectName")
          if (r.peekIf(TokenType.Dot)) {
            ident.name = "SchemaName"
            node.append(r.consume())
            this.identifier(node, r, "ObjectName")
          }
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private vacuumStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("VacuumStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.VACUUM))

        if (r.peekIf([TokenType.Identifier, TokenType.String])) {
          this.identifier(node, r, "SchemaName")
        }

        if (r.peekIf(Keyword.INTO)) {
          node.append(r.consume())
          node.append(new Node("FileName")).apply(node => {
            this.stringLiteral(node, r)
          })
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private pragmaStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("PragmaStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.PRAGMA))

        const ident = this.identifier(node, r, "PragmaName")
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          node.append(r.consume())
          this.identifier(node, r, "PragmaName")
        }

        if (r.peekIf({ type: TokenType.Operator, text: "=" })) {
          node.append(r.consume())
          this.pragmaValue(node, r, "PragmaValue")
        } else if (r.peekIf(TokenType.LeftParen)) {
          node.append(new Node("ArgumentList")).apply(node => {
            node.append(r.consume())
            this.pragmaValue(node, r, "Argument")
            node.append(r.consume(TokenType.RightParen))
          })
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private beginTransactionStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("BeginTransactionStatement"))
    try {
      return current.apply(node => {
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
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private savepointStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("SavepointStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.SAVEPOINT))
        this.identifier(node, r, "SavepointName")
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private releaseSavepointStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("ReleaseSavepointStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.RELEASE))
        if (r.peekIf(Keyword.SAVEPOINT)) {
          node.append(r.consume())
        }
        this.identifier(node, r, "SavepointName")
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private commitTransactionStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("CommitTransactionStatement"))
    try {
      return current.apply(node => {
        if (r.peekIf(Keyword.END)) {
          node.append(r.consume())
        } else {
          node.append(r.consume(Keyword.COMMIT))
        }
        if (r.peekIf(Keyword.TRANSACTION)) {
          node.append(r.consume())
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private rollbackTransactionStatement(parent: Node, r: TokenReader) {
    const current = parent.append(new Node("RollbackTransactionStatement"))
    try {
      return current.apply(node => {
        node.append(r.consume(Keyword.ROLLBACK))
        if (r.peekIf(Keyword.TRANSACTION)) {
          node.append(r.consume())
        }
        if (r.peekIf(Keyword.TO)) {
          node.append(r.consume())
          if (r.peekIf(Keyword.SAVEPOINT)) {
            node.append(r.consume())
          }
          this.identifier(node, r, "SavepointName")
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private insertStatement(parent: Node, r: TokenReader) {
    let current = new Node("InsertStatement")
    const last = parent.last()
    if (last instanceof Node && last.name === "WithClause") {
      last.wrap(current)
    } else {
      current = parent.append(current)
    }
    try {
      return current.apply(node => {
        this.insertClause(node, r)
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private insertClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("InsertClause")).apply(node => {
      if (r.peekIf(Keyword.REPLACE)) {
        node.append(new Node("ReplaceOption")).apply(node => {
          node.append(r.consume())
        })
      } else {
        node.append(r.consume(Keyword.INSERT))
        if (r.peekIf(Keyword.OR)) {
          node.append(new Node("OrConflictClause")).apply(node => {
            node.append(r.consume())
            this.conflictAction(node, r)
          })
        }
      }
      node.append(r.consume(Keyword.INTO))

      const ident = this.identifier(node, r, "ObjectName")
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        this.identifier(node, r, "ObjectName")
      }

      if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        this.identifier(node, r, "ObjectAlias")
      }

      if (r.peekIf(TokenType.LeftParen)) {
        this.columnList(node, r)
      }

      if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultValuesOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.VALUES))
        })
      } else {
        if (r.peekIf(Keyword.VALUES)) {
          node.append(new Node("ValuesClause")).apply(node => {
            node.append(r.consume(Keyword.VALUES))
            const current = this.expressionList(node, r)
            if (r.peekIf(TokenType.Comma)) {
              current.wrap(new Node("ExpressionGroupList")).apply(node => {
                node.append(r.consume())
                do {
                  node.append(this.expressionList(node, r))
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                } while (!r.peek().eos)
              })
            }
          })
        } else {
          if (r.peekIf(Keyword.WITH)) {
            this.withClause(node, r)
          }
          this.selectStatement(node, r)
        }

        do {
          if (r.peekIf(Keyword.ON)) {
            this.onConflictClause(node, r)
          } else {
            break
          }
        } while (!r.peek().eos)
      }

      if (r.peekIf(Keyword.RETURNING)) {
        this.returningClause(node, r)
      }
    })
  }

  private onConflictClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("OnConflictClause")).apply(node => {
      node.append(r.consume(Keyword.ON))
      node.append(r.consume(Keyword.CONFLICT))
      if (r.peekIf(TokenType.LeftParen)) {
        node.append(new Node("SortingColumnList")).apply(node => {
          node.append(r.consume())
          do {
            this.sortingColumn(node, r)
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))

          if (r.peekIf(Keyword.WHERE)) {
            this.whereClause(node, r)
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
          this.setClause(node, r)
          if (r.peekIf(Keyword.WHERE)) {
            this.whereClause(node, r)
          }
        })
      } else {
        throw r.createParseError()
      }
    })
  }

  private updateStatement(parent: Node, r: TokenReader) {
    let current = new Node("UpdateStatement")
    const last = parent.last()
    if (last instanceof Node && last.name === "WithClause") {
      last.wrap(current)
    } else {
      current = parent.append(current)
    }
    try {
      return current.apply(node => {
        this.updateClause(node, r)
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private updateClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("UpdateClause")).apply(node => {
      node.append(r.consume(Keyword.UPDATE))

      const ident = this.identifier(node, r, "ObjectName")
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        this.identifier(node, r, "ObjectName")
      }

      if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        this.identifier(node, r, "ObjectAlias")
      }

      if (r.peekIf(Keyword.INDEXED)) {
        node.append(new Node("IndexedByOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.BY))
          this.identifier(node, r, "ObjectName")
        })
      } else if (r.peekIf(Keyword.NOT)) {
        node.append(new Node("NotIndexedOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.INDEXED))
        })
      }

      this.setClause(node, r)
      if (r.peekIf(Keyword.FROM)) {
        this.fromClause(node, r)
      }
      if (r.peekIf(Keyword.WHERE)) {
        this.whereClause(node, r)
      }
      if (r.peekIf(Keyword.RETURNING)) {
        this.returningClause(node, r)
      }
      if (r.peekIf(Keyword.ORDER)) {
        this.orderByClause(node, r)
      }
      if (r.peekIf(Keyword.LIMIT)) {
        this.limitClause(node, r)
      }
    })
  }

  private setClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("SetClause")).apply(node => {
      node.append(r.consume(Keyword.SET))
      do {
        node.append(new Node("ColumnAssignment")).apply(node => {
          if (r.peekIf(TokenType.LeftParen)) {
            this.columnList(node, r)
          } else {
            this.identifier(node, r, "ColumnName")
          }
          node.append(r.consume({ type: TokenType.Operator, text: "=" }))
          node.append(new Node("ColumnValue")).apply(node => {
            this.expression(node, r)
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

  private deleteStatement(parent: Node, r: TokenReader) {
    let current = new Node("DeleteStatement")
    const last = parent.last()
    if (last instanceof Node && last.name === "WithClause") {
      last.wrap(current)
    } else {
      current = parent.append(current)
    }
    try {
      return current.apply(node => {
        this.deleteClause(node, r)
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private deleteClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("DeleteClause")).apply(node => {
      node.append(r.consume(Keyword.DELETE))
      node.append(r.consume(Keyword.FROM))

      const ident = this.identifier(node, r, "ObjectName")
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        this.identifier(node, r, "ObjectName")
      }

      if (r.peekIf(Keyword.WHERE)) {
        this.whereClause(node, r)
      }
      if (r.peekIf(Keyword.RETURNING)) {
        this.returningClause(node, r)
      }
    })
  }

  private selectStatement(parent: Node, r: TokenReader) {
    let current = new Node("SelectStatement")
    const last = parent.last()
    if (last instanceof Node && last.name === "WithClause") {
      last.wrap(current)
    } else {
      current = parent.append(current)
    }
    try {
      return current.apply(node => {
        let current = this.selectClause(node, r)
        while (!this.compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT") && !r.peek().eos) {
          if (r.peekIf(Keyword.UNION)) {
            current = current.wrap(new Node("UnionOperation")).apply(node => {
              node.append(r.consume())
              if (r.peekIf(Keyword.ALL)) {
                node.append(new Node("AllOption")).apply(node => {
                  node.append(r.consume())
                })
              }
              this.selectClause(node, r)
            })
          } else if (r.peekIf(Keyword.INTERSECT)) {
            current = current.wrap(new Node("IntersectOperation")).apply(node => {
              node.append(r.consume())
              this.selectClause(node, r)
            })
          } else if (r.peekIf(Keyword.EXCEPT)) {
            current = current.wrap(new Node("ExceptOperation")).apply(node => {
              node.append(r.consume())
              this.selectClause(node, r)
            })
          } else {
            break
          }
        }

        if (r.peekIf(Keyword.ORDER)) {
          this.orderByClause(node, r)
        }
        if (r.peekIf(Keyword.LIMIT)) {
          this.limitClause(node, r)
        }
      })
    } catch (err) {
      if (err instanceof ParseError) {
        this.unknown(current, r)
      }
      throw err
    }
  }

  private selectClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("SelectClause")).apply(node => {
      if (r.peekIf(Keyword.VALUES)) {
        node.append(new Node("ValuesClause")).apply(node => {
          node.append(r.consume(Keyword.VALUES))
          this.expressionList(node, r)
        })
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
        this.selectColumns(node, r)

        if (r.peekIf(Keyword.FROM)) {
          this.fromClause(node, r)
        }
        if (r.peekIf(Keyword.WHERE)) {
          this.whereClause(node, r)
        }
        if (r.peekIf(Keyword.GROUP)) {
          this.gropuByClause(node, r)
        }
        if (r.peekIf(Keyword.HAVING)) {
          this.havingClause(node, r)
        }
        if (!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") && r.peekIf(Keyword.WINDOW)) {
          this.windowClause(node, r)
        }
      }
    })
  }

  private withClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("WithClause")).apply(node => {
      node.append(r.consume(Keyword.WITH))

      if (r.peekIf(Keyword.RECURSIVE)) {
        node.append(new Node("RecursiveOption")).apply(node => {
          node.append(r.consume())
        })
      }

      do {
        node.append(new Node("CommonTableExpression")).apply(node => {
          this.identifier(node, r, "ObjectName")
          if (r.peekIf(TokenType.LeftParen)) {
            this.columnList(node, r)
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
          this.selectStatement(node, r)
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

  private selectColumns(parent: Node, r: TokenReader) {
    return parent.append(new Node("SelectColumnList")).apply(node => {
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
            this.identifier(node, r, "SchemaName")
            node.append(new Node("AllColumnsOption")).apply(node => {
              node.append(r.consume())
              node.append(r.consume())
            })
          } else {
            this.expression(node, r)
            if (r.peekIf(Keyword.AS)) {
              node.append(r.consume())
              this.identifier(node, r, "ColumnAlias")
            } else if (r.peekIf([TokenType.Identifier, TokenType.String])) {
              this.identifier(node, r, "ColumnAlias")
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

  private fromClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("FromClause")).apply(node => {
      node.append(r.consume(Keyword.FROM))
      let hasJoinClause = false
      do {
        node.append(new Node("ObjectReference")).apply(node => {
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            node.name = "SubqueryExpression"
            if (r.peekIf([Keyword.WITH, Keyword.SELECT])) {
              if (r.peekIf(Keyword.WITH)) {
                this.withClause(node, r)
              }
              this.selectStatement(node, r)
              node.append(r.consume(TokenType.RightParen))
            } else {
              this.fromClause(node, r)
              node.append(r.consume(TokenType.RightParen))
            }
          } else {
            const ident = this.identifier(node, r, "ObjectName")
            if (r.peekIf(TokenType.Dot)) {
              ident.name = "SchemaName"
              node.append(r.consume())
              this.identifier(node, r, "ObjectName")
            }
            if (r.peekIf(TokenType.LeftParen)) {
              node.name = "FunctionExpression"
              node.append(r.consume())
              node.append(new Node("ArgumentList")).apply(node => {
                while (!r.peekIf(TokenType.RightParen)) {
                  node.append(new Node("Argument")).apply(node => {
                    this.expression(node, r)
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
            this.identifier(node, r, "ObjectAlias")
          } else if (r.peekIf(TokenType.Identifier)) {
            this.identifier(node, r, "ObjectAlias")
          }
          while (r.peekIf(
            [Keyword.NATURAL, Keyword.JOIN, Keyword.CROSS, Keyword.INNER, Keyword.LEFT, Keyword.RIGHT, Keyword.FULL]
          )) {
            hasJoinClause = true
            this.joinClause(node, r)
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

  private joinClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("InnerJoinClause")).apply(node => {
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

      const ident = this.identifier(node, r, "ObjectName")
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        this.identifier(node, r, "ObjectName")
      }

      if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        this.identifier(node, r, "ObjectAlias")
      } else if (r.peekIf(TokenType.Identifier)) {
        this.identifier(node, r, "ObjectAlias")
      }

      if (r.peekIf(Keyword.ON)) {
        node.append(new Node("JoinOnClause")).apply(node => {
          node.append(r.consume())
          this.expression(node, r)
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

  private whereClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("WhereClause")).apply(node => {
      node.append(r.consume(Keyword.WHERE))
      this.expression(node, r)
    })
  }

  private gropuByClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("GroupByClause")).apply(node => {
      node.append(r.consume(Keyword.GROUP))
      node.append(r.consume(Keyword.BY))
      do {
        this.expression(node, r)
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private havingClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("HavingClause")).apply(node => {
      node.append(r.consume(Keyword.HAVING))
      this.expression(node, r)
    })
  }

  private windowClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("WindowClause")).apply(node => {
      node.append(r.consume(Keyword.WINDOW))
      do {
        this.identifier(node, r, "WindowName")
        node.append(r.consume(Keyword.AS))
        this.window(node, r)
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private window(parent: Node, r: TokenReader) {
    return parent.append(new Node("Window")).apply(node => {
      if (!r.peekIf(Keyword.PARTITION)) {
        this.identifier(node, r, "BaseWindowName")
      }
      if (r.peekIf(Keyword.PARTITION)) {
        this.partitionByClause(node, r)
      }
      if (r.peekIf(Keyword.ORDER)) {
        this.orderByClause(node, r)
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
              if (r.peekIf(Keyword.PRECEDING)) {
                node.append(new Node("PrecedingOption")).apply(node => {
                  this.expression(node, r)
                  node.append(r.consume())
                })
              } else if (r.peekIf(Keyword.FOLLOWING)) {
                node.append(new Node("FollowingOption")).apply(node => {
                  this.expression(node, r)
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
              if (r.peekIf(Keyword.PRECEDING)) {
                node.append(new Node("PrecedingOption")).apply(node => {
                  this.expression(node, r)
                  node.append(r.consume())
                })
              } else if (r.peekIf(Keyword.FOLLOWING)) {
                node.append(new Node("FollowingOption")).apply(node => {
                  this.expression(node, r)
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
              this.expression(node, r)
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

  private partitionByClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("PartitionByClause")).apply(node => {
      node.append(r.consume(Keyword.PARTITION))
      node.append(r.consume(Keyword.BY))
      do {
        this.expression(node, r)
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private returningClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("ReturningClause")).apply(node => {
      node.append(r.consume(Keyword.RETURNING))
      this.selectColumns(node, r)
    })
  }

  private orderByClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("OrderByClause")).apply(node => {
      node.append(r.consume(Keyword.ORDER))
      node.append(r.consume(Keyword.BY))
      node.append(new Node("SortingColumnList")).apply(node => {
        do {
          this.sortingColumn(node, r).apply(node => {
            if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
              node.append(new Node("NullsFirstOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
              node.append(new Node("NullsLastOption")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
              })
            }
          })

          if (r.peekIf(TokenType.Comma)) {
            node.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
      })
    })
  }

  private limitClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("LimitClause")).apply(node => {
      node.append(r.consume(Keyword.LIMIT))
      node.append(new Node("LimitOption")).apply(node => {
        this.expression(node, r)
      })
      if (r.peekIf(Keyword.OFFSET)) {
        node.append(new Node("OffsetOption")).apply(node => {
          node.append(r.consume())
          this.expression(node, r)
        })
      } else if (r.peekIf(TokenType.Comma)) {
        node.name = "OffsetOption"
        node.append(r.consume())
        node.append(new Node("LimitOption")).apply(node => {
          this.expression(node, r)
        })
      }
    })
  }

  private tableColumn(parent: Node, r: TokenReader) {
    return parent.append(new Node("TableColumn")).apply(node => {
      this.identifier(node, r, "ColumnName")
      if (r.peekIf(TokenType.Identifier)) {
        node.append(new Node("ColumnType")).apply(node => {
          node.append(new Node("TypeName")).apply(node => {
            const token = r.consume()
            node.append(token)
            node.data.value = token.text
            while (r.peekIf(TokenType.Identifier)) {
              const token = r.consume()
              node.append(token)
              node.data.value += " " + token.text
            }
          })
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("TypeOptionList")).apply(node => {
              node.append(r.consume())
              node.append(new Node("LengthOption")).apply(node => {
                this.numericLiteral(node, r)
              })
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
                node.append(new Node("ScaleOption")).apply(node => {
                  this.numericLiteral(node, r)
                })
              }
              node.append(r.consume(TokenType.RightParen))
            })
          }
        })
      }

      while (r.peekIf([
        Keyword.CONSTRAINT,
        Keyword.PRIMARY,
        Keyword.NOT,
        Keyword.UNIQUE,
        Keyword.CHECK,
        Keyword.DEFAULT,
        Keyword.COLLATE,
        Keyword.REFERENCES,
        ...(!this.compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS") ? [
          Keyword.GENERATED,
          Keyword.AS
        ] : [])
      ])) {
        this.columnConstraint(node, r)
      }
    })
  }

  private columnConstraint(parent: Node, r: TokenReader) {
    return parent.append(new Node("ColumnConstraint")).apply(node => {
      if (r.peekIf(Keyword.CONSTRAINT)) {
        node.append(r.consume())
        this.identifier(node, r, "ConstraintName")
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
            node.append(new Node("OnConflictClause")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.CONFLICT))
              this.conflictAction(node, r)
            })
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
            node.append(new Node("OnConflictClause")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.CONFLICT))
              this.conflictAction(node, r)
            })
          }
        })
      } else if (r.peekIf(Keyword.NULL)) {
        node.append(new Node("NullConstraint")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.ON)) {
            node.append(new Node("OnConflictClause")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.CONFLICT))
              this.conflictAction(node, r)
            })
          }
        })
      } else if (r.peekIf(Keyword.UNIQUE)) {
        node.append(new Node("UniqueConstraint")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.ON)) {
            node.append(new Node("OnConflictClause")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.CONFLICT))
              this.conflictAction(node, r)
            })
          }
        })
      } else if (r.peekIf(Keyword.CHECK)) {
        node.append(new Node("CheckConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          this.expression(node, r)
          node.append(r.consume(TokenType.RightParen))
        })
      } else if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultOption")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            this.expression(node, r)
            node.append(r.consume(TokenType.RightParen))
          } else {
            this.expression(node, r)
          }
        })
      } else if (r.peekIf(Keyword.COLLATE)) {
        node.append(new Node("CollateOption")).apply(node => {
          node.append(r.consume())
          this.identifier(node, r, "CollateName")
        })
      } else if (r.peekIf(Keyword.REFERENCES)) {
        node.append(new Node("ForeignKeyConstraint")).apply(node => {
          this.referencesClause(node, r)
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
            this.expression(node, r)
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

  private tableConstraint(parent: Node, r: TokenReader) {
    return parent.append(new Node("TableConstraint")).apply(node => {
      if (r.peekIf(Keyword.CONSTRAINT)) {
        node.append(r.consume())
        this.identifier(node, r, "ConstraintName")
      }
      if (r.peekIf(Keyword.PRIMARY)) {
        node.append(new Node("PrimaryKeyConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.KEY))
          node.append(new Node("SortingColumnList")).apply(node => {
            node.append(r.consume(TokenType.LeftParen))
            do {
              this.sortingColumn(node, r)
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })
          if (r.peekIf(Keyword.ON)) {
            node.append(new Node("OnConflictClause")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.CONFLICT))
              this.conflictAction(node, r)
            })
          }
        })
      } else if (r.peekIf(Keyword.UNIQUE)) {
        node.append(new Node("UniqueConstraint")).apply(node => {
          node.append(r.consume())
          node.append(new Node("SortingColumnList")).apply(node => {
            node.append(r.consume(TokenType.LeftParen))
            do {
              this.sortingColumn(node, r)
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
            node.append(r.consume(TokenType.RightParen))
          })
          if (r.peekIf(Keyword.ON)) {
            node.append(new Node("OnConflictClause")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.CONFLICT))
              this.conflictAction(node, r)
            })
          }
        })
      } else if (r.peekIf(Keyword.CHECK)) {
        node.append(new Node("CheckConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          this.expression(node, r)
          node.append(r.consume(TokenType.RightParen))
        })
      } else if (r.peekIf(Keyword.FOREIGN)) {
        node.append(new Node("ForeignKeyConstraint")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.KEY))
          this.columnList(node, r)
          this.referencesClause(node, r)
        })
      } else {
        throw r.createParseError()
      }
    })
  }

  private referencesClause(parent: Node, r: TokenReader) {
    return parent.append(new Node("ReferencesClause")).apply(node => {
      node.append(r.consume())
      this.identifier(node, r, "ObjectName")
      if (r.peekIf(TokenType.LeftParen)) {
        this.columnList(node, r)
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

  private conflictAction(parent: Node, r: TokenReader) {
    if (r.peekIf(Keyword.ROLLBACK)) {
      return parent.append(new Node("RollbackOption")).apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf(Keyword.ABORT)) {
      return parent.append(new Node("AbortOption")).apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf(Keyword.FAIL)) {
      return parent.append(new Node("FailOption")).apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf(Keyword.IGNORE)) {
      return parent.append(new Node("IgnoreOption")).apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf(Keyword.REPLACE)) {
      return parent.append(new Node("ReplaceOption")).apply(node => {
        node.append(r.consume())
      })
    } else {
      throw r.createParseError()
    }
  }

  private pragmaValue(parent: Node, r: TokenReader, name: string) {
    return parent.append(new Node(name)).apply(node => {
      if (r.peekIf({ type: TokenType.Operator, text: "+" }) || r.peekIf({ type: TokenType.Operator, text: "-" })) {
        this.numericLiteral(node, r)
      } else if (r.peekIf(TokenType.Numeric)) {
        this.numericLiteral(node, r)
      } else if (r.peekIf(TokenType.String)) {
        this.stringLiteral(node, r)
      } else if (r.peekIf(TokenType.Identifier)) {
        this.identifier(node, r, "PragmaLiteral")
      } else {
        throw r.createParseError()
      }
    })
  }

  private expressionList(parent: Node, r: TokenReader) {
    return parent.append(new Node("ExpressionList")).apply(node => {
      node.append(r.consume(TokenType.LeftParen))
      while (!r.peek().eos) {
        this.expression(node, r)
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      }
      node.append(r.consume(TokenType.RightParen))
    })
  }

  private expression(parent: Node, r: TokenReader, precedence = 0) {
    let current: Node
    if (r.peekIf(Keyword.NOT)) {
      current = parent.append(new Node("NotOperation")).apply(node => {
        node.append(r.consume())
        this.expression(node, r, 3)
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
      current = parent.append(new Node("BitwiseNotOperation")).apply(node => {
        node.append(r.consume())
        this.expression(node, r, 16)
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
      current = parent.append(new Node("UnaryPlusOperation")).apply(node => {
        node.append(r.consume())
        this.expression(node, r, 16)
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
      current = parent.append(new Node("UnaryMinusOperation")).apply(node => {
        node.append(r.consume())
        this.expression(node, r, 16)
      })
    } else {
      current = this.expressionValue(parent, r)
    }

    while (!r.peek().eos) {
      if (precedence < 1 && r.peekIf(Keyword.OR)) {
        current = current.wrap(new Node("OrOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 1)
        })
      } else if (precedence < 2 && r.peekIf(Keyword.AND)) {
        current = current.wrap(new Node("AndOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 2)
        })
      } else if (precedence < 4 && r.peekIf({ type: TokenType.Operator, text: ["=", "=="] })) {
        current = current.wrap(new Node("EqualOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && r.peekIf({ type: TokenType.Operator, text: ["<>", "!="] })) {
        current = current.wrap(new Node("NotEqualOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && r.peekIf(Keyword.IS)) {
        current = current.wrap(new Node("Is")).apply(node => {
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
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && r.peekIf(Keyword.BETWEEN) || r.peekIf(Keyword.NOT, Keyword.BETWEEN)) {
        current = current.wrap(new Node("BetweenOperation")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          this.expression(node, r, 4)
          node.append(r.consume(Keyword.AND))
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && r.peekIf(Keyword.IN) || r.peekIf(Keyword.NOT, Keyword.IN)) {
        current = current.wrap(new Node("InOperation")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.SELECT])) {
            node.append(new Node("SubqueryExpression")).apply(node => {
              node.append(r.consume())
              if (r.peekIf(Keyword.WITH)) {
                this.withClause(node, r)
              }
              this.selectStatement(node, r)
              node.append(r.consume(TokenType.RightParen))
            })
          } else if (r.peekIf(TokenType.LeftParen)) {
            this.expressionList(node, r)
          } else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
            node.append(new Node("FunctionExpression")).apply(node => {
              node.append(new Node("ObjectName")).apply(node => {
                node.append(r.consume())
              })
              node.append(new Node("ArgumentList")).apply(node => {
                node.append(r.consume(TokenType.LeftParen))
                while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
                  node.append(new Node("Argument")).apply(node => {
                    this.expression(node, r)
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
            this.columnReference(node, r)
          } else {
            throw r.createParseError()
          }
        })
      } else if (precedence < 4 && (r.peekIf(Keyword.MATCH) || r.peekIf(Keyword.NOT, Keyword.MATCH))) {
        current = current.wrap(new Node("MatchOperation")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && (r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE))) {
        current = current.wrap(new Node("LikeOperation")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          this.expression(node, r, 4)
          if (r.peekIf(Keyword.ESCAPE)) {
            node.append(new Node("EscapeOption")).apply(node => {
              this.expression(node, r, 6)
            })
          }
        })
      } else if (precedence < 4 && (r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP))) {
        current = current.wrap(new Node("RegexpOperation")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && (r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB))) {
        current = current.wrap(new Node("GlobOperation")).apply(node => {
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          this.expression(node, r, 4)
        })
      } else if (precedence < 4 && r.peekIf(Keyword.ISNULL)) {
        current = current.wrap(new Node("IsNullOperation")).apply(node => {
          node.append(r.consume())
        })
      } else if (precedence < 4 && r.peekIf(Keyword.NOTNULL)) {
        current = current.wrap(new Node("IsNotNullOperation")).apply(node => {
          node.append(r.consume())
        })
      } else if (precedence < 4 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
        current = current.wrap(new Node("IsNotNullOperation")).apply(node => {
          node.append(r.consume())
          node.append(r.consume())
        })
      } else if (precedence < 5 && r.peekIf({ type: TokenType.Operator, text: "<" })) {
        current = current.wrap(new Node("LessThanOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 5)
        })
      } else if (precedence < 5 && r.peekIf({ type: TokenType.Operator, text: ">" })) {
        current = current.wrap(new Node("GreaterThanOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 5)
        })
      } else if (precedence < 5 && r.peekIf({ type: TokenType.Operator, text: "<=" })) {
        current = current.wrap(new Node("LessThanOrEqualOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 5)
        })
      } else if (precedence < 5 && r.peekIf({ type: TokenType.Operator, text: ">=" })) {
        current = current.wrap(new Node("GreaterThanOrEqualOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 5)
        })
      } else if (precedence < 7 && r.peekIf({ type: TokenType.Operator, text: "&" })) {
        current = current.wrap(new Node("BitwiseAndOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 7)
        })
      } else if (precedence < 7 && r.peekIf({ type: TokenType.Operator, text: "|" })) {
        current = current.wrap(new Node("BitwiseOrOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 7)
        })
      } else if (precedence < 7 && r.peekIf({ type: TokenType.Operator, text: "<<" })) {
        current = current.wrap(new Node("BitwiseLeftShiftOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 7)
        })
      } else if (precedence < 7 && r.peekIf({ type: TokenType.Operator, text: ">>" })) {
        current = current.wrap(new Node("BitwiseRightShiftOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 7)
        })
      } else if (precedence < 8 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
        current = current.wrap(new Node("AddOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 8)
        })
      } else if (precedence < 8 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
        current = current.wrap(new Node("SubtractOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 8)
        })
      } else if (precedence < 9 && r.peekIf({ type: TokenType.Operator, text: "*" })) {
        current = current.wrap(new Node("MultiplyOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 9)
        })
      } else if (precedence < 9 && r.peekIf({ type: TokenType.Operator, text: "/" })) {
        current = current.wrap(new Node("DivideOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 9)
        })
      } else if (precedence < 9 && r.peekIf({ type: TokenType.Operator, text: "%" })) {
        current = current.wrap(new Node("ModuloOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 9)
        })
      } else if (precedence < 10 && r.peekIf({ type: TokenType.Operator, text: "||" })) {
        current = current.wrap(new Node("ConcatenateOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 10)
        })
      } else if (precedence < 10 && r.peekIf({ type: TokenType.Operator, text: "->" })) {
        current = current.wrap(new Node("JsonExtractOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 10)
        })
      } else if (precedence < 10 && r.peekIf({ type: TokenType.Operator, text: "->>" })) {
        current = current.wrap(new Node("JsonExtractValueOperation")).apply(node => {
          node.append(r.consume())
          this.expression(node, r, 10)
        })
      } else if (precedence < 11 && r.peekIf(Keyword.COLLATE)) {
        current = current.wrap(new Node("CollateOperation")).apply(node => {
          node.append(r.consume())
          this.identifier(node, r, "CollationName")
        })
      } else {
        break
      }
    }
    return current
  }

  private expressionValue(parent: Node, r: TokenReader) {
    if (r.peekIf(Keyword.NULL)) {
      return parent.append(new Node("NullLiteral")).apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      return this.booleanLiteral(parent, r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      return parent.append(new Node("FunctionExpression")).apply(node => {
        node.append(new Node("ObjectName")).apply(node => {
          const token = r.consume()
          node.append(token)
          node.data.value = token.text.toUpperCase()
        })
      })
    } else if (r.peekIf(Keyword.CASE)) {
      return parent.append(new Node("CaseExpression")).apply(node => {
        node.append(r.consume())
        if (!r.peekIf(Keyword.WHEN)) {
          this.expression(node, r)
        }
        node.append(new Node("CaseConditionList")).apply(node => {
          do {
            node.append(new Node("CaseCondition")).apply(node => {
              node.append(new Node("WhenClause")).apply(node => {
                node.append(r.consume(Keyword.WHEN))
                this.expression(node, r)
              })
              node.append(new Node("ThenClause")).apply(node => {
                node.append(r.consume(Keyword.THEN))
                this.expression(node, r)
              })
            })
          } while (!r.peek().eos)
        })
        if (r.peekIf(Keyword.ELSE)) {
          node.append(new Node("ElseClause")).apply(node => {
            node.append(r.consume())
            this.expression(node, r)
          })
        }
        node.append(r.consume(Keyword.END))
      })
    } else if (r.peekIf(Keyword.CAST)) {
      return parent.append(new Node("FunctionExpression")).apply(node => {
        const token = r.consume()
        node.append(new Node("ObjectName")).apply(node => {
          node.data.value = token.text.toUpperCase()
          node.append(token)
        })
        node.append(new Node("ArgumentList")).apply(node => {
          node.append(r.consume(TokenType.LeftParen))
          node.append(new Node("Argument")).apply(node => {
            this.expression(node, r)
          })
          node.append(r.consume(Keyword.AS))
          const columnType = node.append(new Node("ColumnType"))
          const token = r.consume()
          columnType.append(token)
          columnType.data.value = token.text
          while (r.peekIf(TokenType.Identifier)) {
            const token = r.consume()
            columnType.append(token)
            columnType.data.value += " " + token.text
          }
          if (r.peekIf(TokenType.LeftParen)) {
            columnType.apply(node => {
              node.append(r.consume())
              node.append(new Node("LengthOption")).apply(node => {
                this.numericLiteral(node, r)
              })
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
                node.append(new Node("ScaleOption")).apply(node => {
                  this.numericLiteral(node, r)
                })
              }
              node.append(r.consume(TokenType.RightParen))
            })
          }
          node.append(r.consume(TokenType.RightParen))
        })
      })
    } else if (r.peekIf(Keyword.RAISE)) {
      return parent.append(new Node("FunctionExpression")).apply(node => {
        const token = r.consume()
        node.append(new Node("ObjectName")).apply(node => {
          node.data.value = token.text.toUpperCase()
          node.append(token)
        })
        node.append(new Node("ArgumentList")).apply(node => {
          node.append(r.consume(TokenType.LeftParen))
          node.append(new Node("Argument")).apply(node => {
            this.conflictAction(node, r)
          })
          node.append(r.consume(TokenType.Comma))
          node.append(new Node("Argument")).apply(node => {
            this.expression(node, r)
          })
          node.append(r.consume(TokenType.RightParen))
        })
      })
    } else if (r.peekIf(Keyword.EXISTS)) {
      return parent.append(new Node("ExistsOperation")).apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        this.selectStatement(node, r)
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen, Keyword.VALUES)) {
      return parent.append(new Node("SubqueryExpression")).apply(node => {
        node.append(r.consume())
        node.append(new Node("ValuesClause")).apply(node => {
          node.append(r.consume(Keyword.VALUES))
          this.expressionList(node, r)
        })
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen, Keyword.SELECT)) {
      return parent.append(new Node("SubqueryExpression")).apply(node => {
        node.append(r.consume())
        this.selectStatement(node, r)
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen)) {
      return parent.append(new Node("Expression")).apply(node => {
        node.append(r.consume())
        this.expression(node, r)
        if (r.peekIf(TokenType.Comma)) {
          node.name = "ExpressionList"
          node.append(r.consume())
          do {
            this.expression(node, r)
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
      return parent.append(new Node("FunctionExpression")).apply(node => {
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
                this.expression(node, r)
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
            this.whereClause(node, r)
            node.append(r.consume(TokenType.RightParen))
          })
        }
        if (!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") && r.peekIf(Keyword.OVER)) {
          node.append(new Node("OverClause")).apply(node => {
            node.append(r.consume())
            if (r.peekIf(TokenType.LeftParen)) {
              node.append(r.consume())
              this.window(node, r)
              node.append(r.consume(TokenType.RightParen))
            } else {
              this.identifier(node, r, "WindowName")
            }
          })
        }
      })
    } else if (r.peekIf(TokenType.Numeric)) {
      return this.numericLiteral(parent, r)
    } else if (r.peekIf(TokenType.String) || r.peekIf({ type: TokenType.Identifier, text: /^"/ })) {
      return this.stringLiteral(parent, r)
    } else if (r.peekIf(TokenType.Blob)) {
      return this.blobLiteral(parent, r)
    } else if (r.peekIf(TokenType.Identifier) || r.peekIf(TokenType.String, TokenType.Dot)) {
      return this.columnReference(parent, r)
    } else if (r.peekIf(TokenType.BindVariable)) {
      const token = r.consume()
      if (token.text.startsWith("?")) {
        return parent.append(new Node("PositionalBindVariable")).apply(node => {
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
        return parent.append(new Node("NamedBindVariable")).apply(node => {
          node.append(token)
          node.data.value = token.text.substring(1)
        })
      }
    } else {
      throw r.createParseError()
    }
  }

  private sortingColumn(parent: Node, r: TokenReader) {
    return parent.append(new Node("SortingColumn")).apply(node => {
      this.expression(node, r)
      if (r.peekIf(Keyword.COLLATE)) {
        node.append(r.consume())
        this.identifier(node, r, "CollationName")
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

  private columnList(parent: Node, r: TokenReader) {
    return parent.append(new Node("ColumnList")).apply(node => {
      node.append(r.consume())
      do {
        this.identifier(node, r, "ColumnName")
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      node.append(r.consume(TokenType.RightParen))
    })
  }

  private columnReference(parent: Node, r: TokenReader) {
    return parent.append(new Node("ColumnReference")).apply(node => {
      const ident1 = this.identifier(node, r, "ColumnName")
      if (r.peekIf(TokenType.Dot)) {
        node.append(r.consume())
        ident1.name = "ObjectName"
        const ident2 = this.identifier(node, r, "ColumnName")
        if (r.peekIf(TokenType.Dot)) {
          node.append(r.consume())
          ident1.name = "SchemaName"
          ident2.name = "ObjectName"
          this.identifier(node, r, "ColumnName")
        }
      }
    })
  }

  private identifier(parent: Node, r: TokenReader, name: string) {
    return parent.append(new Node(name)).apply(node => {
      if (r.peekIf([TokenType.Identifier, TokenType.String])) {
        const token = r.consume()
        node.append(token)
        node.data.value = dequote(token.text)
      } else {
        throw r.createParseError()
      }
    })
  }

  private numericLiteral(parent: Node, r: TokenReader) {
    return parent.append(new Node("NumericLiteral")).apply(node => {
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

  private stringLiteral(parent: Node, r: TokenReader) {
    return parent.append(new Node("StringLiteral")).apply(node => {
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

  private blobLiteral(parent: Node, r: TokenReader) {
    return parent.append(new Node("BlobLiteral")).apply(node => {
      const token = r.consume(TokenType.Blob)
      node.append(token)
      node.data.value = token.text.substring(2, token.text.length - 1).toUpperCase()
    })
  }

  private booleanLiteral(parent: Node, r: TokenReader) {
    return parent.append(new Node("BooleanLiteral")).apply(node => {
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
