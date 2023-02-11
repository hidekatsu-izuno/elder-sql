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
import { PostgresLexer } from "./postgres_lexer.js"

export class PostgresParser extends Parser {
  constructor(
    options: Record<string, any> = {},
  ) {
    super(options, options.lexer ?? new PostgresLexer(options))
  }

  processTokens(tokens: Token[]): Node {
    const r = new TokenReader(tokens)
    const root = new Node("root")
    const errors = []

    while (r.peek()) {
      try {
        if (r.peekIf(TokenType.SectionBreak)) {
          root.append(r.consume())
          break
        } else if (r.peekIf(TokenType.SemiColon)) {
          root.append(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          root.append(this.command(r))
        } else {
          root.append(this.statement(r))
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
      if (r.peekIf(TokenType.SectionBreak)) {
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
        while (!r.peek().eos && !PostgresLexer.isObjectStart(r.peek().keyword)) {
          r.consume()
        }

        if (r.peekIf(Keyword.FUNCTION)) {
          r.pos = mark
          stmt = this.createFunctionStatement(r)
        } else if (r.peekIf(Keyword.PROCEDURE)) {
          r.pos = mark
          stmt = this.createProcedureStatement(r)
        } else if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.createTableStatement(r)
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
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.SET)) {
        stmt = this.setStatement(r)
      } else {
        const prefix = []
        if (r.peekIf(Keyword.WITH)) {
          prefix.push(this.withClause(r))
        }
        if (r.peekIf(Keyword.INSERT)) {
          stmt = this.insertStatement(r, prefix)
        } else if (r.peekIf(Keyword.UPDATE)) {
          stmt = this.updateStatement(r, prefix)
        } else if (r.peekIf(Keyword.DELETE)) {
          stmt = this.deleteStatement(r, prefix)
        } else if (r.peekIf(Keyword.MERGE)) {
          stmt = this.mergeStatement(r, prefix)
        } else if (r.peekIf(Keyword.SELECT)) {
          stmt = this.selectStatement(r, prefix)
        } else if (r.peekIf(Keyword.VALUES)) {
          stmt = this.valuesStatement(r, prefix)
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
      if (r.peekIf(TokenType.SectionBreak)) {
        stmt.append(r.consume())
      }
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
        if (r.peekIf(TokenType.SectionBreak)) {
          stmt.append(r.consume())
        }
        err.node = stmt
      }
      throw err
    }
    return stmt
  }

  private explainStatement(r: TokenReader) {
    return new Node("ExplainStatement").apply(node => {
      node.append(r.consume())
      if (r.peekIf(TokenType.LeftParen)) {
        node.append(new Node("ExplainOptionList")).apply(node => {
          node.append(r.consume())
          do {
            if (r.peekIf(Keyword.ANALYZE)) {
              node.append(new Node("AnalyzeOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.VERBOSE)) {
              node.append(new Node("VerboseOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.COSTS)) {
              node.append(new Node("CostsOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.SETTINGS)) {
              node.append(new Node("SettingsOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.BUFFERS)) {
              node.append(new Node("BuffersOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.WAL)) {
              node.append(new Node("WalOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.TIMING)) {
              node.append(new Node("TimingOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.SUMMARY)) {
              node.append(new Node("SummaryOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              })
            } else if (r.peekIf(Keyword.FORMAT)) {
              node.append(new Node("FormatOption")).apply(node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TEXT, Keyword.XML, Keyword.JSON, Keyword.YAML])) {
                  node.append(this.identifier(r, "FormatType"))
                } else {
                  throw r.createParseError()
                }
              })
            } else {
              throw r.createParseError()
            }
            if (r.peekIf(TokenType.RightParen)) {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))
        })
      } else {
        if (r.peekIf(Keyword.ANALYZE)) {
          node.append(new Node("AnalyzeOption")).apply(node => {
            node.append(r.consume())
          })
        }
        if (r.peekIf(Keyword.VERBOSE)) {
          node.append(new Node("VerboseOption")).apply(node => {
            node.append(r.consume())
          })
        }  
      }
    })
  }

  private createFunctionStatement(r: TokenReader) {
    return new Node("CreateFunctionStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf(Keyword.OR)) {
        node.append(new Node("OrReplaceOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.REPLACE))
        })
      }
      node.append(r.consume(Keyword.FUNCTION))

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }

      node.append(this.procedureArgumentList(r))

      //TODO
    })
  }

  private createProcedureStatement(r: TokenReader) {
    return new Node("CreateProcedureStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf(Keyword.OR)) {
        node.append(new Node("OrReplaceOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.REPLACE))
        })
      }
      node.append(r.consume(Keyword.PROCEDURE))

      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }

      node.append(this.procedureArgumentList(r))

      //TODO
    })
  }

  private createTableStatement(r: TokenReader) {
    return new Node("CreateTableStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      //TODO
    })
  }

  private alterTableStatement(r: TokenReader) {
    return new Node("AlterTableStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      //TODO
    })
  }

  private dropTableStatement(r: TokenReader) {
    return new Node("DropTableStatement").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      //TODO
    })
  }

  private setStatement(r: TokenReader) {
    return new Node("SetStatement").apply(node => {
      node.append(r.consume(Keyword.SET))
      if (r.peekIf(Keyword.SESSION)) {
        node.append(new Node("SessionOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.LOCAL)) {
        node.append(new Node("LocalOption")).apply(node => {
          node.append(r.consume())
        })
      }
      if (r.peekIf(Keyword.TIME)) {
        node.append(new Node("ParameterName")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.ZONE))
        })
        if (r.peekIf(Keyword.LOCAL)) {
          node.append(new Node("LocalOption")).apply(node => {
            node.append(r.consume())
          })
        } else if (r.peekIf(Keyword.DEFAULT)) {
          node.append(new Node("DefaultOption")).apply(node => {
            node.append(r.consume())
          })
        } else if (r.peekIf(TokenType.Identifier)) {
          node.append(this.identifier(r, "ParameterValue"))
        }
      } else {
        node.append(new Node("ParameterName")).apply(node => {
          node.append(r.consume(TokenType.Identifier))
        })
        if (r.peekIf(Keyword.TO) || r.peekIf({ type: TokenType.Operator, text: "=" })) {
          node.append(r.consume())
        }
        if (r.peekIf(Keyword.DEFAULT)) {
          node.append(new Node("DefaultOption")).apply(node => {
            node.append(r.consume())
          })
        } else if (r.peekIf(TokenType.Identifier)) {
          node.append(this.identifier(r, "ParameterValue"))
        }
      }
    })
  }

  private insertStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("InsertStatement").apply(node => {
      if (prefix) {
        for (const item of prefix) {
          node.append(item)
        }
      }
      node.append(this.insertClause(r))
    })
  }

  private insertClause(r: TokenReader) {
    return new Node("InsertClause").apply(node => {
      node.append(r.consume(Keyword.INSERT))
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

      if (r.peekIf(Keyword.OVERRIDING)) {
        node.append(new Node("")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.SYSTEM)) {
            node.name = "OverridingSystemValueOption"
            node.append(r.consume())
            node.append(r.consume(Keyword.VALUE))
          } else if (r.peekIf(Keyword.USER)) {
            node.name = "OverridingUserValueOption"
            node.append(r.consume())
            node.append(r.consume(Keyword.VALUE))
          } else {
            throw r.createParseError()
          }  
        })
      }

      if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultValuesOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.VALUES))
        })
      } else if (r.peekIf(Keyword.VALUES)) {
        node.append(this.valuesClause(r))
      } else {
        const prefix = []
        if (r.peekIf(Keyword.WITH)) {
          prefix.push(this.withClause(r))
        }
        node.append(this.selectStatement(r, prefix))
      }
      
      if (r.peekIf(Keyword.ON)) {
        node.append(this.onConflictClause(r))
      }

      if (r.peekIf(Keyword.RETURNING)) {
        node.append(this.returningClause(r))
      }
    })
  }

  private updateStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("UpdateStatement").apply(node => {
      if (prefix) {
        for (const item of prefix) {
          node.append(item)
        }
      }
      node.append(this.updateClause(r))
    })
  }

  private updateClause(r: TokenReader) {
    return new Node("UpdateClause").apply(node => {
      node.append(r.consume(Keyword.UPDATE))

      if (r.peekIf(Keyword.ONLY)) {
        node.append(new Node("OnlyOption")).apply(node => {
          node.append(r.consume())
        })
      }
      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        node.append(new Node("AllDescendantsOption")).apply(node => {
          node.append(r.consume())
        })
      }
      if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectAlias"))
      }
  
      node.append(this.setClause(r))
      if (r.peekIf(Keyword.FROM)) {
        node.append(this.fromClause(r))
      }
      if (r.peekIf(Keyword.WHERE, Keyword.CURRENT)) {
        node.append(new Node("WhereClause")).apply(node => {
          node.append(r.consume())
          node.append(new Node("CurrentOfOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.OF))
            node.append(this.identifier(r, "CursorName"))
          })
        })
      } else if (r.peekIf(Keyword.WHERE)) {
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

  private deleteStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("DeleteStatement").apply(node => {
      if (prefix) {
        for (const item of prefix) {
          node.append(item)
        }
      }
      node.append(this.deleteClause(r))
    })
  }
  
  private deleteClause(r: TokenReader) {
    return new Node("DeleteClause").apply(node => {
      node.append(r.consume(Keyword.DELETE))
      node.append(r.consume(Keyword.FROM))

      if (r.peekIf(Keyword.ONLY)) {
        node.append(new Node("OnlyOption")).apply(node => {
          node.append(r.consume())
        })
      }
      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        node.append(new Node("AllDescendantsOption")).apply(node => {
          node.append(r.consume())
        })
      }
      if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectAlias"))
      }
      if (r.peekIf(Keyword.USING)) {
        node.append(this.fromClause(r))
      }
      if (r.peekIf(Keyword.WHERE, Keyword.CURRENT)) {
        node.append(new Node("WhereClause")).apply(node => {
          node.append(r.consume())
          node.append(new Node("CurrentOfOption")).apply(node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.OF))
            node.append(this.identifier(r, "CursorName"))
          })
        })
      } else if (r.peekIf(Keyword.WHERE)) {
        node.append(this.whereClause(r))
      }
      if (r.peekIf(Keyword.RETURNING)) {
        node.append(this.returningClause(r))
      }
    })
  }

  private mergeStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("MergeStatement").apply(node => {
      if (prefix) {
        for (const item of prefix) {
          node.append(item)
        }
      }
      node.append(this.mergeClause(r))
    })
  }

  private mergeClause(r: TokenReader) {
    return new Node("MergeClause").apply(node => {
      node.append(r.consume(Keyword.MERGE))
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
      if (r.peekIf(Keyword.USING)) {
        node.append(new Node("UsingClause")).apply(node => {
          node.append(r.consume())
          node.append(new Node("ObjectReference")).apply(node => {
            if (r.peekIf(TokenType.LeftParen)) {
              node.append(r.consume())
              node.name = "Subquery"
              node.append(this.selectStatement(r))
              node.append(r.consume(TokenType.RightParen))
            } else {
              const ident = this.identifier(r, "ObjectName")
              node.append(ident)
              if (r.peekIf(TokenType.Dot)) {
                ident.name = "SchemaName"
                node.append(r.consume())
                node.append(this.identifier(r, "ObjectName"))
              }
            }
            if (r.peekIf(Keyword.AS)) {
              node.append(r.consume())
              node.append(this.identifier(r, "ObjectAlias"))
            } else if (r.peekIf(TokenType.Identifier)) {
              node.append(this.identifier(r, "ObjectAlias"))
            }
          })

          node.append(new Node("OnClause")).apply(node => {
            node.append(r.consume(Keyword.ON))
            node.append(this.expression(r))
          })

          do {
            if (r.peekIf(Keyword.WHEN, Keyword.MATCHED)) {
              node.append(new Node("WhenMatchedClause")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
                if (r.peekIf(Keyword.AND)) {
                  node.append(r.consume())
                  node.append(new Node("WhenClause")).apply(node => {
                    node.append(this.expression(r))
                  })
                }
                node.append(r.consume(Keyword.THEN))
                if (r.peekIf(Keyword.UPDATE)) {
                  node.append(new Node("UpdateClause")).apply(node => {
                    node.append(this.setClause(r))
                  })
                } else if (r.peekIf(Keyword.DELETE)) {
                  node.append(new Node("DeleteClause")).apply(node => {
                    node.append(r.consume())
                  })
                } else {
                  node.append(new Node("DoNothingOption")).apply(node => {
                    node.append(r.consume(Keyword.DO))
                    node.append(r.consume(Keyword.NOTHING))
                  })
                }
              })
            } else if (r.peekIf(Keyword.WHEN, Keyword.NOT)) {
              node.append(new Node("WhenNotMatchedClause")).apply(node => {
                node.append(r.consume())
                node.append(r.consume())
                node.append(r.consume(Keyword.MATCHED))
                if (r.peekIf(Keyword.AND)) {
                  node.append(r.consume())
                  node.append(new Node("WhenClause")).apply(node => {
                    node.append(this.expression(r))
                  })
                }
                node.append(r.consume(Keyword.THEN))
                node.append(new Node("InsertClause")).apply(node => {
                  node.append(this.setClause(r))
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

                  if (r.peekIf(Keyword.OVERRIDING)) {
                    node.append(new Node("")).apply(node => {
                      node.append(r.consume())
                      if (r.peekIf(Keyword.SYSTEM)) {
                        node.name = "OverridingSystemValueOption"
                        node.append(r.consume())
                        node.append(r.consume(Keyword.VALUE))
                      } else if (r.peekIf(Keyword.USER)) {
                        node.name = "OverridingUserValueOption"
                        node.append(r.consume())
                        node.append(r.consume(Keyword.VALUE))
                      } else {
                        throw r.createParseError()
                      }
                    })
                  }

                  if (r.peekIf(Keyword.DEFAULT)) {
                    node.append(new Node("DefaultValuesOption")).apply(node => {
                      node.append(r.consume())
                      node.append(r.consume(Keyword.VALUES))
                    })
                  } else {
                    node.append(this.valuesClause(r))
                  }
                })
              })
            } else {
              throw r.createParseError()
            }
          } while (!r.peek().eos)
        })
      }
    })
  }

  private selectStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("SelectStatement").apply(node => {
      if (prefix) {
        for (const item of prefix) {
          node.append(item)
        }
      }
      let current: Node
      do {
        current = this.selectClause(r)
        if (r.peekIf(Keyword.UNION)) {
          current = new Node("UnionOperation").apply(node => {
            node.append(current)
            node.append(r.consume())
            if (r.peekIf(Keyword.ALL)) {
              node.append(new Node("AllOption")).apply(node => {
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption")).apply(node => {
                node.append(r.consume())
              })
            }
          })
        } else if (r.peekIf(Keyword.INTERSECT)) {
          current = new Node("IntersectOperation").apply(node => {
            node.append(current)
            node.append(r.consume())
            if (r.peekIf(Keyword.ALL)) {
              node.append(new Node("AllOption")).apply(node => {
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption")).apply(node => {
                node.append(r.consume())
              })
            }
          })
        } else if (r.peekIf(Keyword.EXCEPT)) {
          current = new Node("ExceptOperation").apply(node => {
            node.append(current)
            node.append(r.consume())
            if (r.peekIf(Keyword.ALL)) {
              node.append(new Node("AllOption")).apply(node => {
                node.append(r.consume())
              })
            } else if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption")).apply(node => {
                node.append(r.consume())
              })
            }
          })
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
      if (r.peekIf(Keyword.OFFSET)) {
        node.append(this.offsetClause(r))
      }
      if (r.peekIf(Keyword.FETCH)) {
        node.append(this.fetchClause(r))
      }
      if (r.peekIf(Keyword.FOR)) {
        node.append(this.forUpdateClause(r))
      }
    })
  }

  private selectClause(r: TokenReader) {
    return new Node("SelectClause").apply(node => {
      node.append(r.consume(Keyword.SELECT))
      if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.DISTINCT)) {
        node.append(new Node("DistinctOption")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.ON)) {
            node.append(new Node("OnClause")).apply(node => {
              node.append(r.consume())
              node.append(this.expressionList(r))
            })
          }
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
    })
  }

  private valuesStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("ValuesStatement").apply(node => {
      if (prefix) {
        for (const item of prefix) {
          node.append(item)
        }
      }
      node.append(this.valuesClause(r))
      if (r.peekIf(Keyword.ORDER)) {
        node.append(this.orderByClause(r))
      }
      if (r.peekIf(Keyword.LIMIT)) {
        node.append(this.limitClause(r))
      }
      if (r.peekIf(Keyword.OFFSET)) {
        node.append(this.offsetClause(r))
      }
      if (r.peekIf(Keyword.FETCH)) {
        node.append(this.fetchClause(r))
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
        node.append(new Node("ConflictColumnList")).apply(node => {
          node.append(r.consume())
          do {
            if (r.peekIf(TokenType.LeftParen)) {
              node.append(r.consume())
              node.append(this.expression(r))
              node.append(r.consume(TokenType.RightParen))
            } else {
              node.append(this.identifier(r, "ColumnName"))
            }
            if (r.peekIf(Keyword.COLLATE)) {
              node.append(r.consume())
              node.append(this.identifier(r, "CollationName"))
            }
            if (r.peekIf(TokenType.Identifier)) {
              node.append(this.identifier(r, "OperatorClassName"))
            }
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

          node.append(r.consume(Keyword.ON))
          node.append(r.consume(Keyword.CONSTRAINT))
          node.append(this.identifier(r, "ConstraintName"))
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

  private returningClause(r: TokenReader) {
    return new Node("ReturningClause").apply(node => {
      node.append(r.consume(Keyword.RETURNING))
      node.append(this.selectColumns(r))
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
            node.append(r.consume({ type: TokenType.Operator, text: "=" }))
            node.append(new Node("ColumnValueList")).apply(node => {
              let hasRow = false
              if (r.peekIf(Keyword.ROW)) {
                node.append(r.consume())
                hasRow = true
              }
              node.append(r.consume(TokenType.RightParen))
              if (!hasRow && r.peekIf(Keyword.SELECT)) {
                node.append(this.selectStatement(r))
              } else {
                do {
                  node.append(new Node("ColumnValue")).apply(node => {
                    if (r.peekIf(Keyword.DEFAULT)) {
                      node.append(new Node("DefaultOption")).apply(node => {
                        node.append(r.consume())
                      })
                    } else {
                      node.append(this.expression(r))
                    }
                  })
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                } while (!r.peek().eos)
              }
              node.append(r.consume(TokenType.LeftParen))
            })
          } else {
            node.append(this.identifier(r, "ColumnName"))
            node.append(r.consume({ type: TokenType.Operator, text: "=" }))
            node.append(new Node("ColumnValue")).apply(node => {
              if (r.peekIf(Keyword.DEFAULT)) {
                node.append(new Node("DefaultOption")).apply(node => {
                  node.append(r.consume())
                })
              } else {
                node.append(this.expression(r))
              }
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
  }

  private procedureArgumentList(r: TokenReader) {
    return new Node("ProcedureArgumentList").apply(node => {
      node.append(node)
      node.append(r.consume(TokenType.LeftParen))
      while (!r.peek().eos) {
        node.append(new Node("ProcedureArgument")).apply(node => {
          node.append(this.identifier(r, "ArgumentName"))
          if (r.peekIf(Keyword.IN)) {
            node.append(new Node("InOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.OUT)) {
            node.append(new Node("OutOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.INOUT)) {
            node.append(new Node("InoutOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.VARIADIC)) {
            node.append(new Node("VariadicOption")).apply(node => {
              node.append(r.consume())
            })
          }

          node.append(new Node("ParameterType")).apply(node => {
            if (r.peekIf(
              TokenType.Identifier, TokenType.Dot, 
              TokenType.Identifier, TokenType.Dot, 
              TokenType.Identifier, { type: TokenType.Operator, text: "%" }, Keyword.TYPE)
            ) {
              const cref = this.columnReference(r)
              cref.append(r.consume())
              cref.append(r.consume())
              node.append(cref)
            } else if (r.peekIf(
              TokenType.Identifier, TokenType.Dot, 
              TokenType.Identifier, { type: TokenType.Operator, text: "%" }, Keyword.TYPE)
            ) {
              const cref = this.columnReference(r)
              cref.append(r.consume())
              cref.append(r.consume())
              node.append(cref)
            } else {
              if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
                node.append(this.identifier(r, "SchemaName"))
                node.append(r.consume())
              }
              node.append(this.typeName(r))  
            }
          })

          if (r.peekIf(Keyword.DEFAULT) || r.peekIf({ type: TokenType.Operator, text: "=" })) {
            node.append(r.consume())
            node.append(this.expression(r))
          }
        })

        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
          break
        }
      }
      node.append(r.consume(TokenType.RightParen))
    })
  }

  private typeName(r: TokenReader) {
    const node = this.identifier(r, "TypeName")
    while (r.peekIf([TokenType.Identifier, TokenType.String])) {
      const ident = this.identifier(r, "")
      for (const child of ident.children) {
        node.append(child)
      }
      node.data.value = node.data.value ? node.data.value + " " + ident.data.value : ident.data.value
    }
    return node
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

  private sortingColumn(r: TokenReader, options?: { using: boolean }) {
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
      } else if (options?.using && r.peekIf(Keyword.USING)) {
        node.append(new Node("UsingOption")).apply(node => {
          node.append(r.consume())
          const ope = r.consume(TokenType.Operator)
          node.append(ope)
          node.data.value = ope.text
        })
      }
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
          if (r.peekIf(Keyword.INSERT)) {
            node.append(this.insertStatement(r))
          } else if (r.peekIf(Keyword.UPDATE)) {
            node.append(this.updateStatement(r))
          } else if (r.peekIf(Keyword.DELETE)) {
            node.append(this.deleteStatement(r))
          } else if (r.peekIf(Keyword.MERGE)) {
            node.append(this.mergeStatement(r))
          } else if (r.peekIf(Keyword.SELECT)) {
            node.append(this.selectStatement(r))
          } else if (r.peekIf(Keyword.VALUES)) {
            node.append(this.valuesStatement(r))
          } else {
            throw r.createParseError()
          }
          node.append(r.consume(TokenType.RightParen))
        })
  
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
  
      if (r.peekIf(Keyword.SEARCH)) {
        node.append(new Node("SearchClause")).apply(node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.BREADTH)) {
            node.append(new Node("BreadthOption")).apply(node => {
              node.append(r.consume())
            })
          } else if (r.peekIf(Keyword.WIDTH)) {
            node.append(new Node("WidthOption")).apply(node => {
              node.append(r.consume())
            })
          } else {
            throw r.createParseError()
          }
        })
        node.append(r.consume(Keyword.FIRST))
        node.append(r.consume(Keyword.BY))
        node.append(new Node("ColumnList")).apply(node => {
          do {
            node.append(this.identifier(r, "ColumnName"))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
        })
        node.append(this.identifier(r, "SequenceColumnName"))
      }
      if (r.peekIf(Keyword.CYCLE)) {
        node.append(new Node("CycleClause")).apply(node => {
          node.append(r.consume())

          node.append(new Node("ColumnList")).apply(node => {
            do {
              node.append(this.identifier(r, "ColumnName"))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
          })
    
          node.append(new Node("CycleDetectionClause")).apply(node => {
            node.append(r.consume(Keyword.SET))
            node.append(this.identifier(r, "CycleMarkColumnName"))
            if (r.peekIf(Keyword.TO)) {
              node.append(r.consume())
              node.append(new Node("CycleMarkValue")).apply(node => {
                node.append(this.expression(r))
              })
              node.append(r.consume(Keyword.DEFAULT))
              node.append(new Node("CycleMarkDefaultValue")).apply(node => {
                node.append(this.expression(r))
              })
            }
          })
    
          if (r.peekIf(Keyword.USING)) {
            node.append(new Node("UsingOption")).apply(node => {
              node.append(r.consume(Keyword.USING))
              node.append(this.identifier(r, "ColumnName"))
            })
          }
        })
      }  
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
            TokenType.Identifier, 
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
            } else if (r.peekIf(TokenType.Identifier)) {
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
      if (r.peekIf(Keyword.USING)) {
        node.append(r.consume())
        node.name = "UsingClause"
      } else {
        node.append(r.consume(Keyword.FROM))
      }
      let hasJoinClause = false
      do {
        node.append(new Node("ObjectReference")).apply(node => {
          let hasOnly = false
          let hasLiteral = false
          if (r.peekIf(Keyword.ONLY)) {
            node.append(new Node("OnlyOption")).apply(node => {
              node.append(r.consume())
            })
            hasOnly = true
          } else if (r.peekIf(Keyword.LATERAL)) {
            node.append(new Node("LiteralOption")).apply(node => {
              node.append(r.consume())
            })
            hasLiteral = true
          }

          if (!hasOnly && r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            node.name = "Subquery"
            node.append(this.selectStatement(r))
            node.append(r.consume(TokenType.RightParen))
          } else if (!hasOnly && r.peekIf(Keyword.XMLTABLE, TokenType.LeftParen)) {
            node.name = "Function"
            node.append(this.identifier(r, "ObjectName"))
            node.append(r.consume())
            // TODO
            node.append(r.consume(TokenType.RightParen))
          } else if (!hasOnly && (
            r.peekIf(TokenType.Identifier, TokenType.LeftParen) || 
            r.peekIf(TokenType.Identifier, TokenType.Dot, TokenType.Identifier, TokenType.LeftParen)
          )) {
            node.name = "Function"
            const ident = this.identifier(r, "ObjectName")
            node.append(ident)
            if (r.peekIf(TokenType.Dot)) {
              node.append(r.consume())
              ident.name = "SchemaName"
              node.append(this.identifier(r, "ObjectName"))
            }
            node.append(new Node("ArgumentList")).apply(node => {
              node.append(r.consume())
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
              node.append(r.consume(TokenType.RightParen))
            })
          } else if (!hasOnly && r.peekIf(Keyword.ROWS, Keyword.FROM, TokenType.LeftParen)) {
            node.append(new Node("RowsFromClause")).apply(node => {
              //TODO
            })
          } else if (!hasLiteral) {
            const ident = this.identifier(r, "ObjectName")
            node.append(ident)
            if (r.peekIf(TokenType.Dot)) {
              node.append(r.consume())
              ident.name = "SchemaName"
              node.append(this.identifier(r, "ObjectName"))
            }
            if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
              node.append(new Node("AllDescendantsOption")).apply(node => {
                node.append(r.consume())
              })
            }
          }
          let hasAlias = false
          if (r.peekIf(Keyword.AS)) {
            node.append(r.consume())
            node.append(this.identifier(r, "ObjectAlias"))
            hasAlias = true
          } else if (r.peekIf(TokenType.Identifier)) {
            node.append(this.identifier(r, "ObjectAlias"))
            hasAlias = true
          }
          if (hasAlias && r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("ColumnAliasList")).apply(node => {
              node.append(r.consume())
              while (!r.peek().eos) {
                node.append(this.identifier(r, "ColumnAlias"))
                if (r.peekIf(TokenType.Comma)) {
                  node.append(r.consume())
                } else {
                  break
                }
              }
              node.append(r.consume(TokenType.RightParen))
            })
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
      let hasCondition = true
      if (r.peekIf(Keyword.CROSS)) {
        node.name = "CrossJoinClause"
        node.append(r.consume())
        hasCondition = false
      } else {
        if (r.peekIf(Keyword.NATURAL)) {
          node.append(new Node("NatualOption")).apply(node => {
            node.append(r.consume())
          })
          hasCondition = false
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
      
      if (hasCondition && r.peekIf(Keyword.ON)) {
        node.append(new Node("JoinOnClause")).apply(node => {
          node.append(r.consume())
          node.append(this.expression(r))
        })
      } else if (hasCondition && r.peekIf(Keyword.USING)) {
        node.append(new Node("UsingClause")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          node.append(this.expression(r))
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
      if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.DISTINCT)) {
        node.append(new Node("DistinctOption")).apply(node => {
          node.append(r.consume())
        })
      }
      do {
        node.append(this.groupingElement(r))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while(!r.peek().eos)
    })
  }

  private groupingElement(r: TokenReader) {
    if (r.peekIf(Keyword.ROLLUP)) {
      return new Node("RollupClause").apply(node => {
        node.append(r.consume())
        node.append(this.expressionGroupList(r))
      })
    } else if (r.peekIf(Keyword.CUBE)) {
      return new Node("CubeClause").apply(node => {
        node.append(r.consume())
        node.append(this.expressionGroupList(r))
      })
    } else if (r.peekIf(Keyword.GROUPING, Keyword.SET)) {
      return new Node("GroupingSetClause").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        while (!r.peek().eos) {
          node.append(this.groupingElement(r))
          if (r.peekIf(TokenType.Comma)) {
            node.append(r.consume())
          } else {
            break
          }
        }
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen)) {
      return this.expressionList(r)
    } else {
      return this.expression(r)
    }
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
      } while(!r.peek().eos)
    })
  }

  private orderByClause(r: TokenReader) {
    return new Node("OrderByClause").apply(node => {
      node.append(r.consume(Keyword.ORDER))
      node.append(r.consume(Keyword.BY))
      do {
        const column = this.sortingColumn(r, { using: true })
        node.append(column)

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
      if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption")).apply(node => {
          node.append(r.consume())
        })
      } else {
        node.append(this.expression(r))
      }
    })
  }

  private offsetClause(r: TokenReader) {
    return new Node("OffsetClause").apply(node => {
      node.append(r.consume(Keyword.OFFSET))
      node.append(this.expression(r))
      if (r.peekIf(Keyword.ROW) || r.peekIf(Keyword.ROWS)) {
        node.append(r.consume())
      }
    })
  }

  private fetchClause(r: TokenReader) {
    return new Node("FetchClause").apply(node => {
      node.append(r.consume(Keyword.FETCH))
      if (r.peekIf(Keyword.FIRST)) {
        node.append(new Node("FirstOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.NEXT)) {
        node.append(new Node("NextOption")).apply(node => {
          node.append(r.consume())
        })
      } else {
        throw r.createParseError()
      }
      if (r.peekIf(Keyword.ROW) || r.peekIf(Keyword.ROWS)) {
        node.append(r.consume())
      } else {
        node.append(this.expression(r))
        if (r.peekIf(Keyword.ROW) || r.peekIf(Keyword.ROWS)) {
          node.append(r.consume())
        }
      }
      if (r.peekIf(Keyword.ONLY)) {
        node.append(new Node("OnlyOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.WITH)) {
        node.append(new Node("WithTiesOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.TIES))
        })
      }
    })
  }

  private forUpdateClause(r: TokenReader) {
    return new Node("ForUpdateClause").apply(node => {
      node.append(r.consume(Keyword.FOR))
      if (r.peekIf(Keyword.UPDATE)) {
        node.append(r.consume())
      } else if (r.peekIf(Keyword.NO, Keyword.KEY, Keyword.UPDATE)) {
        node.append(new Node("NoKeyOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume())
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.SHARE)) {
        node.name = "ForShareClause"
        node.append(r.consume())
      } else if (r.peekIf(Keyword.KEY, Keyword.SHARE)) {
        node.name = "ForShareClause"
        node.append(new Node("KeyOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume())
        })
      }
      if (r.peekIf(Keyword.OF)) {
        node.append(new Node("ObjectReferenceList")).apply(node => {
          node.append(r.consume())
          do {
            node.append(new Node("ObjectReference")).apply(node => {
              const ident = this.identifier(r, "ObjectName")
              node.append(ident)
              if (r.peekIf(TokenType.Dot)) {
                ident.name = "SchemaName"
                node.append(r.consume())
                node.append(this.identifier(r, "ObjectName"))
              }
            })
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
              break
            }
          } while (!r.peek().eos)
        })
      }
      if (r.peekIf(Keyword.NOWAIT)) {
        node.append(new Node("NowaitOption")).apply(node => {
          node.append(r.consume())
        })
      } else if (r.peekIf(Keyword.SKIP)) {
        node.append(new Node("SkipLockedOption")).apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.LOCKED))
        })
      }
    })
  }

  private expressionGroupList(r: TokenReader) {
    return new Node("ExpressionGroupList").apply(node => {
      node.append(r.consume(TokenType.LeftParen))
      while (!r.peek().eos) {
        if (r.peekIf(TokenType.LeftParen)) {
          node.append(this.expressionList(r))
        } else {
          node.append(this.expression(r))
        }
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      }
      node.append(r.consume(TokenType.RightParen))
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
    if (priority < 11 && r.peekIf(Keyword.NOT)) {
      current = new Node("NotOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 11))
      })
    } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "~" })) {
      current = new Node("BitwiseNotOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 7))
      })
    } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "@" })) {
      current = new Node("AbsoluteValueOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 7))
      })
    } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "^" })) {
      current = new Node("ExponentialOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 4))
      })
    } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
      current = new Node("UnaryPlusOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 3))
      })
    } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
      current = new Node("UnaryMinusOperation").apply(node => {
        node.append(r.consume())
        node.append(this.expression(r, 3))
      })
    } else {
      current = this.expressionValue(r)
    }

    while (!r.peek().eos) {
      if (priority < 13 && r.peekIf(Keyword.OR)) {
        current = new Node("OrOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 13))
        })
      } else if (priority < 12 && r.peekIf(Keyword.AND)) {
        current = new Node("AndOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 12))
        })
      } else if (priority < 10 && r.peekIf(Keyword.IS)) {
        current = new Node("Is").apply(node => {
          node.append(current)
          node.append(r.consume())
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name += "Not"
          }
          if (r.peekIf(Keyword.NORMALIZED)) {
            node.append(r.consume())
            node.name += "NormalizedOperation"
          } else if (r.peekIf([Keyword.NFC, Keyword.NFD, Keyword.NFKC, Keyword.NFKD], Keyword.NORMALIZED)) {
            if (r.peekIf(Keyword.NFC)) {
              node.append(new Node("NfcOption").apply(node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(Keyword.NFD)) {
              node.append(new Node("NfdOption").apply(node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(Keyword.NFKC)) {
              node.append(new Node("NfkcOption").apply(node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(Keyword.NFKD)) {
              node.append(new Node("NfkdOption").apply(node => {
                node.append(r.consume())
              }))
            } else {
              throw r.createParseError()
            }
            node.append(r.consume())
            node.name += "NormalizedOperation"
          } else if (r.peekIf(Keyword.DOCUMENT)) {
            node.append(r.consume())
            node.name += "DocumentOperation"
          } else if (r.peekIf(Keyword.DISTINCT)) {
            node.append(r.consume())
            node.append(r.consume(Keyword.FROM))
            node.name += "DistinctFromOperation"
            node.append(this.expression(r, 10))
          } else {
            node.name += "Operation"
            node.append(this.expression(r, 10))
          }
        })
      } else if (priority < 10 && r.peekIf(Keyword.ISNULL)) {
        current = new Node("IsNullOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
        })
      } else if (priority < 10 && r.peekIf(Keyword.NOTNULL)) {
        current = new Node("IsNotNullOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
        })
      } else if (priority < 9 && r.peekIf({ type: TokenType.Operator, text: "=" })) {
        current = new Node("EqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 9))
        })
      } else if (priority < 9 && r.peekIf({ type: TokenType.Operator, text: ["<>", "!="] })) {
        current = new Node("NotEqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 9))
        })
      } else if (priority < 9 && r.peekIf({ type: TokenType.Operator, text: "<"})) {
        current = new Node("LessThanOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 9))
        })
      } else if (priority < 9 && r.peekIf({ type: TokenType.Operator, text: ">"})) {
        current = new Node("GreaterThanOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 9))
        })
      } else if (priority < 9 && r.peekIf({ type: TokenType.Operator, text: "<="})) {
        current = new Node("LessThanOrEqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 9))
        })
      } else if (priority < 9 && r.peekIf({ type: TokenType.Operator, text: ">="})) {
        current = new Node("GreaterThanOrEqualOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 9))
        })
      } else if (priority < 8 && r.peekIf(Keyword.BETWEEN) || r.peekIf(Keyword.NOT, Keyword.BETWEEN)) {
        current = new Node("BetweenOperation").apply(node => {
          node.append(current)
          node.append(current)
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
          if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.VALUES, Keyword.SELECT])) {
            node.append(new Node("Subquery")).apply(node => {
              node.append(r.consume())
              const prefix = []
              if (r.peekIf(Keyword.WITH)) {
                prefix.push(this.withClause(r))
              }
              if (r.peekIf(Keyword.VALUES)) {
                node.append(this.valuesStatement(r, prefix))
              } else {
                node.append(this.selectStatement(r, prefix))
              }
              node.append(r.consume(TokenType.RightParen))
            })
          } else if (r.peekIf(TokenType.LeftParen)) {
            node.append(this.expressionList(r))
          } else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
            node.append(new Node("Function")).apply(node => {
              node.append(new Node("ObjectName")).apply(node => {
                node.append(r.consume())
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
            })
          } else if (r.peekIf([TokenType.Identifier, TokenType.String])) {
            node.append(this.columnReference(r))
          } else {
            throw r.createParseError()
          }
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
      } else if (priority < 8 && (r.peekIf(Keyword.ILIKE) || r.peekIf(Keyword.NOT, Keyword.ILIKE))) {
        current = new Node("IlikeOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(this.expression(r, 8))
          if (r.peekIf(Keyword.ESCAPE)) {
            node.append(new Node("EscapeOption")).apply(node => {
              node.append(this.stringLiteral(r))
            })
          }
        })
      } else if (priority < 8 && (r.peekIf(Keyword.SIMILAR) || r.peekIf(Keyword.NOT, Keyword.SIMILAR))) {
        current = new Node("SimilarToOperation").apply(node => {
          node.append(current)
          if (r.peekIf(Keyword.NOT)) {
            node.append(r.consume())
            node.name = "Not" + node.name
          }
          node.append(r.consume())
          node.append(r.consume(Keyword.TO))
          node.append(this.expression(r, 8))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "||" })) {
        current = new Node("ConcatenateOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "^@" })) {
        current = new Node("StartsWithOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "&"})) {
        current = new Node("BitwiseAndOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "|"})) {
        current = new Node("BitwiseOrOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "#"})) {
        current = new Node("BitwiseXorOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<<"})) {
        current = new Node("BitwiseLeftShiftOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">>"})) {
        current = new Node("BitwiseRightShiftOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "~"})) {
        current = new Node("MatchOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "~*"})) {
        current = new Node("ImatchOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "!~"})) {
        current = new Node("NotMatchOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "!~*"})) {
        current = new Node("NotImatchOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "->" })) {
        current = new Node("JsonExtractOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "#>" })) {
        current = new Node("JsonExtractPathOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "->>" })) {
        current = new Node("JsonExtractValueOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "#>>" })) {
        current = new Node("JsonExtractPathValueOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf(Keyword.OPERATOR, TokenType.LeftParen)) {
        current = new Node("OperatorOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(r.consume())
          node.append(this.identifier(r, "SchemaName"))
          const token = r.consume()
          node.data.value = token.text
          node.append(token)
          node.append(r.consume(TokenType.RightParen))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: /^(::|\|\|?\/|[^*/%+-])$/ })) {
        current = new Node("OperatorOperation").apply(node => {
          node.append(current)
          const token = r.consume()
          node.data.value = token.text
          node.append(token)
          node.append(this.expression(r, 7))
        })
      } else if (priority < 6 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
        current = new Node("AddOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 6))
        })
      } else if (priority < 6 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
        current = new Node("SubtractOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 6))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "*" })) {
        current = new Node("MultiplyOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "/" })) {
        current = new Node("DivideOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "||/" })) {
        current = new Node("CubeRootOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "|/" })) {
        current = new Node("SquareRootOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "%" })) {
        current = new Node("ModuloOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 2 && r.peekIf(TokenType.LeftBracket)) {
        current = new Node("ArrayElementSelectOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
          node.append(r.consume(TokenType.RightBracket))
        })
      } else if (priority < 1 && r.peekIf({ type: TokenType.Operator, text: "::" })) {
        current = new Node("CastOperation").apply(node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.typeName(r))
        })
      } else {
        break
      }
    }
    return current
  }

  private expressionValue(r: TokenReader) {
    if (r.peekIf(Keyword.UNKNOWN)) {
      return new Node("UnknownLiteral").apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf(Keyword.NULL)) {
      return new Node("NullLiteral").apply(node => {
        node.append(r.consume())
      })
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      return this.booleanLiteral(r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      return  new Node("Function").apply(node => {
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
        node.append(new Node("ObjectName")).apply(node => {
          const token = r.consume()
          node.append(token)
          node.data.value = token.text.toUpperCase()
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
    } else if (r.peekIf(Keyword.XMLELEMENT)) {
      return new Node("Function").apply(node => {
        //TODO
      })
    } else if (r.peekIf(Keyword.XMLFOREST)) {
      return new Node("Function").apply(node => {
        //TODO
      })
    } else if (r.peekIf(Keyword.XMLPI)) {
      return new Node("Function").apply(node => {
        //TODO
      })
    } else if (r.peekIf(Keyword.XMLROOT)) {
      return new Node("Function").apply(node => {
        //TODO
      })
    } else if (r.peekIf(Keyword.XMLAGG)) {
      return new Node("Function").apply(node => {
        //TODO
      })
    } else if (r.peekIf(Keyword.EXISTS)) {
      return new Node("ExistsOperation").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        if (r.peekIf(Keyword.VALUES)) {
          node.append(this.valuesStatement(r))
        } else {
          node.append(this.selectStatement(r))
        }
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(Keyword.ANY)) {
      return new Node("AnyOperation").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(Keyword.SOME)) {
      return new Node("SomeOperation").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(Keyword.ALL)) {
      return new Node("AllOperation").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        node.append(this.selectStatement(r))
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(Keyword.XMLEXISTS)) {
      return new Node("XmlexistsOperation").apply(node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        //TODO
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen, Keyword.VALUES)) {
      return new Node("Subquery").apply(node => {
        node.append(r.consume())
        node.append(this.valuesStatement(r))
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
    } else if (r.peekIf(TokenType.String)) {
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

  private identifier(r: TokenReader, name: string) {
    const node = new Node(name)
    if (r.peekIf(TokenType.Identifier)) {
      node.append(r.consume())
      node.data.value = dequote(r.peek(-1).text)
    } else {
      throw r.createParseError()
    }
    return node
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
      const token = r.consume(TokenType.String)
      node.append(token)
      node.data.value = dequote(token.text)
    })
  }

  private blobLiteral(r: TokenReader) {
    return new Node("BlobLiteral").apply(node => {
      const token = r.consume(TokenType.Blob)
      node.append(token)
      node.data.value = token.text.substring(3, token.text.length-1).replace(/''/g, "'").toUpperCase()
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