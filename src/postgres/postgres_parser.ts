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
        if (r.peekIf(TokenType.EoF)) {
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
    return new Node("CommandStatement", node => {
      node.append(new Node("CommandName", node => {
        const command = r.consume(TokenType.Command)
        node.append(command)
        node.data.value = command.text
      }))
      node.append(new Node("CommandArgumentList", node => {
        while (!r.peek().eos) {
          node.append(new Node("CommandArgument", node => {
            const arg = r.consume()
            node.append(arg)
            node.data.value = dequote(arg.text)
          }))
        }
      }))
      if (r.peekIf(TokenType.EoF)) {
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
      if (r.peekIf(TokenType.EoF)) {
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
        if (r.peekIf(TokenType.EoF)) {
          stmt.append(r.consume())
        }
        err.node = stmt
      }
      throw err
    }
    return stmt
  }

  private explainStatement(r: TokenReader) {
    return new Node("ExplainStatement", node => {
      node.append(r.consume())
      if (r.peekIf(TokenType.LeftParen)) {
        node.append(new Node("ExplainOptionList", node => {
          node.append(r.consume())
          do {
            if (r.peekIf(Keyword.ANALYZE)) {
              node.append(new Node("AnalyzeOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.VERBOSE)) {
              node.append(new Node("VerboseOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.COSTS)) {
              node.append(new Node("CostsOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.SETTINGS)) {
              node.append(new Node("SettingsOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.BUFFERS)) {
              node.append(new Node("BuffersOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.WAL)) {
              node.append(new Node("WalOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.TIMING)) {
              node.append(new Node("TimingOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.SUMMARY)) {
              node.append(new Node("SummaryOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
                  node.append(this.booleanLiteral(r))
                }
              }))
            } else if (r.peekIf(Keyword.FORMAT)) {
              node.append(new Node("FormatOption", node => {
                node.append(r.consume())
                if (r.peekIf([Keyword.TEXT, Keyword.XML, Keyword.JSON, Keyword.YAML])) {
                  node.append(this.identifier(r, "FormatType"))
                } else {
                  throw r.createParseError()
                }
              }))
            } else {
              throw r.createParseError()
            }
            if (r.peekIf(TokenType.RightParen)) {
              break
            }
          } while (!r.peek().eos)
          node.append(r.consume(TokenType.RightParen))
        }))
      } else {
        if (r.peekIf(Keyword.ANALYZE)) {
          node.append(new Node("AnalyzeOption", node => {
            node.append(r.consume())
          }))
        }
        if (r.peekIf(Keyword.VERBOSE)) {
          node.append(new Node("VerboseOption", node => {
            node.append(r.consume())
          }))
        }  
      }
    })
  }

  private createFunctionStatement(r: TokenReader) {
    return new Node("CreateFunctionStatement", node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf(Keyword.OR)) {
        node.append(new Node("OrReplaceOption", node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.REPLACE))
        }))
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
    return new Node("CreateProcedureStatement", node => {
      node.append(r.consume(Keyword.CREATE))
      if (r.peekIf(Keyword.OR)) {
        node.append(new Node("OrReplaceOption", node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.REPLACE))
        }))
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
    return new Node("CreateTableStatement", node => {
      node.append(r.consume(Keyword.CREATE))
      //TODO
    })
  }

  private alterTableStatement(r: TokenReader) {
    return new Node("AlterTableStatement", node => {
      node.append(r.consume(Keyword.CREATE))
      //TODO
    })
  }

  private dropTableStatement(r: TokenReader) {
    return new Node("DropTableStatement", node => {
      node.append(r.consume(Keyword.CREATE))
      //TODO
    })
  }

  private setStatement(r: TokenReader) {
    return new Node("SetStatement", node => {
      node.append(r.consume(Keyword.SET))
      if (r.peekIf(Keyword.SESSION)) {
        node.append(new Node("SessionOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.LOCAL)) {
        node.append(new Node("LocalOption", node => {
          node.append(r.consume())
        }))
      }
      if (r.peekIf(Keyword.TIME)) {
        node.append(new Node("ParameterName", node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.ZONE))
        }))
        if (r.peekIf(Keyword.LOCAL)) {
          node.append(new Node("LocalOption", node => {
            node.append(r.consume())
          }))
        } else if (r.peekIf(Keyword.DEFAULT)) {
          node.append(new Node("DefaultOption", node => {
            node.append(r.consume())
          }))
        } else if (r.peekIf(TokenType.Identifier)) {
          node.append(this.identifier(r, "ParameterValue"))
        }
      } else {
        node.append(new Node("ParameterName", node => {
          node.append(r.consume(TokenType.Identifier))
        }))
        if (r.peekIf(Keyword.TO) || r.peekIf({ type: TokenType.Operator, text: "=" })) {
          node.append(r.consume())
        }
        if (r.peekIf(Keyword.DEFAULT)) {
          node.append(new Node("DefaultOption", node => {
            node.append(r.consume())
          }))
        } else if (r.peekIf(TokenType.Identifier)) {
          node.append(this.identifier(r, "ParameterValue"))
        }
      }
    })
  }

  private insertStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("InsertStatement", node => {
      if (prefix) {
        node.append(...prefix)
      }
      node.append(this.insertClause(r))
    })
  }

  private insertClause(r: TokenReader) {
    return new Node("InsertClause", node => {
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
        node.append(new Node("ColumnList", node => {
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
        }))
      }

      if (r.peekIf(Keyword.OVERRIDING)) {
        node.append(new Node("", node => {
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
        }))
      }

      if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultValuesOption", node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.VALUES))
        }))
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
    return new Node("UpdateStatement", node => {
      if (prefix) {
        node.append(...prefix)
      }
      node.append(this.updateClause(r))
    })
  }

  private updateClause(r: TokenReader) {
    return new Node("UpdateClause", node => {
      node.append(r.consume(Keyword.UPDATE))

      if (r.peekIf(Keyword.ONLY)) {
        node.append(new Node("OnlyOption", node => {
          node.append(r.consume())
        }))
      }
      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        node.append(new Node("AllDescendantsOption", node => {
          node.append(r.consume())
        }))
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
        node.append(new Node("WhereClause", node => {
          node.append(r.consume())
          node.append(new Node("CurrentOfOption", node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.OF))
            node.append(this.identifier(r, "CursorName"))
          }))
        }))
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
    return new Node("DeleteStatement", node => {
      if (prefix) {
        node.append(...prefix)
      }
      node.append(this.deleteClause(r))
    })
  }
  
  private deleteClause(r: TokenReader) {
    return new Node("DeleteClause", node => {
      node.append(r.consume(Keyword.DELETE))
      node.append(r.consume(Keyword.FROM))

      if (r.peekIf(Keyword.ONLY)) {
        node.append(new Node("OnlyOption", node => {
          node.append(r.consume())
        }))
      }
      const ident = this.identifier(r, "ObjectName")
      node.append(ident)
      if (r.peekIf(TokenType.Dot)) {
        ident.name = "SchemaName"
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectName"))
      }
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        node.append(new Node("AllDescendantsOption", node => {
          node.append(r.consume())
        }))
      }
      if (r.peekIf(Keyword.AS)) {
        node.append(r.consume())
        node.append(this.identifier(r, "ObjectAlias"))
      }
      if (r.peekIf(Keyword.USING)) {
        node.append(this.fromClause(r))
      }
      if (r.peekIf(Keyword.WHERE, Keyword.CURRENT)) {
        node.append(new Node("WhereClause", node => {
          node.append(r.consume())
          node.append(new Node("CurrentOfOption", node => {
            node.append(r.consume())
            node.append(r.consume(Keyword.OF))
            node.append(this.identifier(r, "CursorName"))
          }))
        }))
      } else if (r.peekIf(Keyword.WHERE)) {
        node.append(this.whereClause(r))
      }
      if (r.peekIf(Keyword.RETURNING)) {
        node.append(this.returningClause(r))
      }
    })
  }

  private mergeStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("MergeStatement", node => {
      if (prefix) {
        node.append(...prefix)
      }
      node.append(this.mergeClause(r))
    })
  }

  private mergeClause(r: TokenReader) {
    return new Node("MergeClause", node => {
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
        node.append(new Node("UsingClause", node => {
          node.append(r.consume())
          node.append(new Node("ObjectReference", node => {
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
          }))

          node.append(new Node("OnClause", node => {
            node.append(r.consume(Keyword.ON))
            node.append(this.expression(r))
          }))

          do {
            if (r.peekIf(Keyword.WHEN, Keyword.MATCHED)) {
              node.append(new Node("WhenMatchedClause", node => {
                node.append(r.consume())
                node.append(r.consume())
                if (r.peekIf(Keyword.AND)) {
                  node.append(r.consume())
                  node.append(new Node("WhenClause", node => {
                    node.append(this.expression(r))
                  }))
                }
                node.append(r.consume(Keyword.THEN))
                if (r.peekIf(Keyword.UPDATE)) {
                  node.append(new Node("UpdateClause", node => {
                    node.append(this.setClause(r))
                  }))
                } else if (r.peekIf(Keyword.DELETE)) {
                  node.append(new Node("DeleteClause", node => {
                    node.append(r.consume())
                  }))
                } else {
                  node.append(new Node("DoNothingOption", node => {
                    node.append(r.consume(Keyword.DO))
                    node.append(r.consume(Keyword.NOTHING))
                  }))
                }
              }))
            } else if (r.peekIf(Keyword.WHEN, Keyword.NOT)) {
              node.append(new Node("WhenNotMatchedClause", node => {
                node.append(r.consume())
                node.append(r.consume())
                node.append(r.consume(Keyword.MATCHED))
                if (r.peekIf(Keyword.AND)) {
                  node.append(r.consume())
                  node.append(new Node("WhenClause", node => {
                    node.append(this.expression(r))
                  }))
                }
                node.append(r.consume(Keyword.THEN))
                node.append(new Node("InsertClause", node => {
                  node.append(this.setClause(r))
                  if (r.peekIf(TokenType.LeftParen)) {
                    node.append(new Node("ColumnList", node => {
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
                    }))
                  }

                  if (r.peekIf(Keyword.OVERRIDING)) {
                    node.append(new Node("", node => {
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
                    }))
                  }

                  if (r.peekIf(Keyword.DEFAULT)) {
                    node.append(new Node("DefaultValuesOption", node => {
                      node.append(r.consume())
                      node.append(r.consume(Keyword.VALUES))
                    }))
                  } else {
                    node.append(this.valuesClause(r))
                  }
                }))
              }))
            } else {
              throw r.createParseError()
            }
          } while (!r.peek().eos)
        }))
      }
    })
  }

  private selectStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    return new Node("SelectStatement", node => {
      if (prefix) {
        node.append(...prefix)
      }
      let current: Node
      do {
        current = this.selectClause(r)
        if (r.peekIf(Keyword.UNION)) {
          current = new Node("UnionOperation", node => {
            node.append(current)
            node.append(r.consume())
            if (r.peekIf(Keyword.ALL)) {
              node.append(new Node("AllOption", node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption", node => {
                node.append(r.consume())
              }))
            }
          })
        } else if (r.peekIf(Keyword.INTERSECT)) {
          current = new Node("IntersectOperation", node => {
            node.append(current)
            node.append(r.consume())
            if (r.peekIf(Keyword.ALL)) {
              node.append(new Node("AllOption", node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption", node => {
                node.append(r.consume())
              }))
            }
          })
        } else if (r.peekIf(Keyword.EXCEPT)) {
          current = new Node("ExceptOperation", node => {
            node.append(current)
            node.append(r.consume())
            if (r.peekIf(Keyword.ALL)) {
              node.append(new Node("AllOption", node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption", node => {
                node.append(r.consume())
              }))
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
    return new Node("SelectClause", node => {
      node.append(r.consume(Keyword.SELECT))
      if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.DISTINCT)) {
        node.append(new Node("DistinctOption", node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.ON)) {
            node.append(new Node("OnClause", node => {
              node.append(r.consume())
              node.append(new Node("ExpressionList", node => {
                node.append(r.consume(TokenType.LeftParen))
                do {
                  node.append(this.expression(r))
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                } while (!r.peek().eos)
                node.append(r.consume(TokenType.RightParen))
              }))
            }))
          }
        }))
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
    return new Node("ValuesStatement", node => {
      if (prefix) {
        node.append(...prefix)
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
    return new Node("ValuesClause", node => {
      node.append(r.consume(Keyword.VALUES))
      node.append(new Node("ExpressionList", node => {
        node.append(r.consume(TokenType.LeftParen))
        do {
          node.append(this.expression(r))
          if (r.peekIf(TokenType.Comma)) {
            node.append(r.consume())
          } else {
            break
          }
        } while (!r.peek().eos)
        node.append(r.consume(TokenType.RightParen))
      }))
    })
  }

  private onConflictClause(r: TokenReader) {
    return new Node("OnConflictClause", node => {
      node.append(r.consume(Keyword.ON))
      node.append(r.consume(Keyword.CONFLICT))
      if (r.peekIf(TokenType.LeftParen)) {
        node.append(new Node("SortingColumnList", node => {
          node.append(r.consume())
          do  {
            //TODO
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

          node.append(r.consume(Keyword.ON))
          node.append(r.consume(Keyword.CONSTRAINT))
          node.append(this.identifier(r, "ConstraintName"))
        }))
      }
      node.append(r.consume(Keyword.DO))
      if (r.peekIf(Keyword.NOTHING)) {
        node.append(new Node("DoNothingOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.UPDATE)) {
        node.append(new Node("DoUpdateOption", node => {
          node.append(r.consume())
          node.append(this.setClause(r))
          if (r.peekIf(Keyword.WHERE)) {
            node.append(this.whereClause(r))
          }
        }))
      } else {
        throw r.createParseError()
      }
    })
  }

  private returningClause(r: TokenReader) {
    return new Node("ReturningClause", node => {
      node.append(r.consume(Keyword.RETURNING))
      node.append(this.selectColumns(r))
    })
  }

  private setClause(r: TokenReader) {
    return new Node("SetClause", node => {
      node.append(r.consume(Keyword.SET))
      do {
        node.append(new Node("ColumnAssignment", node => {
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("ColumnList", node => {
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
            }))
            node.append(r.consume({ type: TokenType.Operator, text: "=" }))
            node.append(new Node("ColumnValueList", node => {
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
                  node.append(new Node("ColumnValue", node => {
                    if (r.peekIf(Keyword.DEFAULT)) {
                      node.append(new Node("DefaultOption", node => {
                        node.append(r.consume())
                      }))
                    } else {
                      node.append(this.expression(r))
                    }
                  }))
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                } while (!r.peek().eos)
              }
              node.append(r.consume(TokenType.LeftParen))
            }))
          } else {
            node.append(this.identifier(r, "ColumnName"))
            node.append(r.consume({ type: TokenType.Operator, text: "=" }))
            node.append(new Node("ColumnValue", node => {
              if (r.peekIf(Keyword.DEFAULT)) {
                node.append(new Node("DefaultOption", node => {
                  node.append(r.consume())
                }))
              } else {
                node.append(this.expression(r))
              }
            }))
          }  
        }))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private procedureArgumentList(r: TokenReader) {
    return new Node("ProcedureArgumentList", node => {
      node.append(node)
      node.append(r.consume(TokenType.LeftParen))
      while (!r.peek().eos) {
        node.append(new Node("ProcedureArgument", node => {
          node.append(this.identifier(r, "ArgumentName"))
          if (r.peekIf(Keyword.IN)) {
            node.append(new Node("InOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(Keyword.OUT)) {
            node.append(new Node("OutOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(Keyword.INOUT)) {
            node.append(new Node("InoutOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(Keyword.VARIADIC)) {
            node.append(new Node("VariadicOption", node => {
              node.append(r.consume())
            }))
          }

          node.append(new Node("ParameterType", node => {
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
          }))

          if (r.peekIf(Keyword.DEFAULT) || r.peekIf({ type: TokenType.Operator, text: "=" })) {
            node.append(r.consume())
            node.append(this.expression(r))
          }
        }))

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
      node.append(...ident.children)
      node.data.value = node.data.value ? node.data.value + " " + ident.data.value : ident.data.value
    }
    return node
  }

  private columnReference(r: TokenReader) {
    return new Node("ColumnReference", node => {
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
    return new Node("SortingColumn", node => {
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
        node.append(new Node("AscOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.DESC)) {
        node.append(new Node("DescOption", node => {
          node.append(r.consume())
        }))
      } else if (options?.using && r.peekIf(Keyword.USING)) {
        node.append(new Node("UsingOption", node => {
          node.append(r.consume())
          const ope = r.consume(TokenType.Operator)
          node.append(ope)
          node.data.value = ope.text
        }))
      }
      if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
        node.append(new Node("NullsFirstOption", node => {
          node.append(r.consume())
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
        node.append(new Node("NullsLastOption", node => {
          node.append(r.consume())
          node.append(r.consume())
        }))
      }
    })
  }

  private withClause(r: TokenReader) {
    return new Node("WithClause", node => {
      node.append(r.consume(Keyword.WITH))

      if (r.peekIf(Keyword.RECURSIVE)) {
        node.append(new Node("RecursiveOption", node => {
          node.append(r.consume())
        }))
      }
  
      do {
        node.append(new Node("CommonTable", node => {
          node.append(this.identifier(r, "ObjectName"))
          if (r.peekIf(TokenType.LeftParen)) {
            node.append(new Node("ColumnList", node => {
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
            }))
          }
          node.append(r.consume(Keyword.AS))

          if (r.peekIf(Keyword.MATERIALIZED) || r.peekIf(Keyword.NOT, Keyword.MATERIALIZED)) {
            node.append(new Node("MaterializedOption", node => {
              if (r.peekIf(Keyword.NOT)) {
                node.name = "NotMaterializedOption"
                node.append(r.consume())
              }
              node.append(r.consume())
            }))
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
        }))
  
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
  
      if (r.peekIf(Keyword.SEARCH)) {
        node.append(new Node("SearchClause", node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.BREADTH)) {
            node.append(new Node("BreadthOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(Keyword.WIDTH)) {
            node.append(new Node("WidthOption", node => {
              node.append(r.consume())
            }))
          } else {
            throw r.createParseError()
          }
        }))
        node.append(r.consume(Keyword.FIRST))
        node.append(r.consume(Keyword.BY))
        node.append(new Node("ColumnList", node => {
          do {
            node.append(this.identifier(r, "ColumnName"))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
        }))
        node.append(this.identifier(r, "SequenceColumnName"))
      }
      if (r.peekIf(Keyword.CYCLE)) {
        node.append(new Node("CycleClause", node => {
          node.append(r.consume())

          node.append(new Node("ColumnList", node => {
            do {
              node.append(this.identifier(r, "ColumnName"))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            } while (!r.peek().eos)
          }))
    
          node.append(new Node("CycleDetectionClause", node => {
            node.append(r.consume(Keyword.SET))
            node.append(this.identifier(r, "CycleMarkColumnName"))
            if (r.peekIf(Keyword.TO)) {
              node.append(r.consume())
              node.append(new Node("CycleMarkValue", node => {
                node.append(this.expression(r))
              }))
              node.append(r.consume(Keyword.DEFAULT))
              node.append(new Node("CycleMarkDefaultValue", node => {
                node.append(this.expression(r))
              }))
            }
          }))
    
          if (r.peekIf(Keyword.USING)) {
            node.append(new Node("UsingOption", node => {
              node.append(r.consume(Keyword.USING))
              node.append(this.identifier(r, "ColumnName"))
            }))
          }
        }))
      }  
    })
  }

  private selectColumns(r: TokenReader) {
    return new Node("SelectColumnList", node => {
      do {
        node.append(new Node("SelectColumn", node => {
          if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
            node.append(new Node("AllColumnsOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(
            TokenType.Identifier, 
            TokenType.Dot, 
            { type: TokenType.Operator, text: "*" }
          )) {
            node.append(this.identifier(r, "SchemaName"))
            node.append(new Node("AllColumnsOption", node => {
              node.append(r.consume())
              node.append(r.consume())
            }))
          } else {
            node.append(this.expression(r))
            if (r.peekIf(Keyword.AS)) {
              node.append(r.consume())
              node.append(this.identifier(r, "ColumnAlias"))
            } else if (r.peekIf(TokenType.Identifier)) {
              node.append(this.identifier(r, "ColumnAlias"))
            }
          }
        }))
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private fromClause(r: TokenReader) {
    return new Node("FromClause", node => {
      if (r.peekIf(Keyword.USING)) {
        node.append(r.consume())
        node.name = "UsingClause"
      } else {
        node.append(r.consume(Keyword.FROM))
      }
      let hasJoinClause = false
      do {
        node.append(new Node("ObjectReference", node => {
          if (r.peekIf(Keyword.ONLY)) {
            node.append(new Node("OnlyOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(Keyword.LATERAL)) {
            node.append(new Node("LiteralOption", node => {
              node.append(r.consume())
            }))
          }

          if (r.peekIf(TokenType.LeftParen)) {
            node.append(r.consume())
            node.name = "Subquery"
            node.append(this.selectStatement(r))
            node.append(r.consume(TokenType.RightParen))
          } else if (r.peekIf(Keyword.ROWS)) {
            //TODO
          } else {
            const ident = this.identifier(r, "ObjectName")
            node.append(ident)
            if (r.peekIf(TokenType.Dot)) {
              node.append(r.consume())
              ident.name = "SchemaName"
              node.append(this.identifier(r, "ObjectName"))
            }
            if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
              node.append(new Node("AllDescendantsOption", node => {
                node.append(r.consume())
              }))
            } else if (r.peekIf(TokenType.LeftParen)) {
              node.append(r.consume())
              node.name = "Function"
              node.append(new Node("ArgumentList", node => {
                while (!r.peekIf(TokenType.RightParen)) {
                  node.append(new Node("Argument", node => {
                    node.append(this.expression(r))
                  }))
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                }
              }))
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
        }))
        if (!hasJoinClause && r.consume(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
    })
  }

  private joinClause(r: TokenReader) {
    return new Node("InnerJoinClause", node => {
      let hasCondition = true
      if (r.peekIf(Keyword.CROSS)) {
        node.name = "CrossJoinClause"
        node.append(r.consume())
        hasCondition = false
      } else {
        if (r.peekIf(Keyword.NATURAL)) {
          node.append(new Node("NatualOption", node => {
            node.append(r.consume())
          }))
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
        node.append(new Node("JoinOnClause", node => {
          node.append(r.consume())
          node.append(this.expression(r))
        }))
      } else if (hasCondition && r.peekIf(Keyword.USING)) {
        node.append(new Node("UsingClause", node => {
          node.append(r.consume())
          node.append(r.consume(TokenType.LeftParen))
          //TODO
          node.append(r.consume(TokenType.RightParen))
        }))
      }
    })
  }

  private whereClause(r: TokenReader) {
    return new Node("WhereClause", node => {
      node.append(r.consume(Keyword.WHERE))
      node.append(this.expression(r))  
    })
  }

  private gropuByClause(r: TokenReader) {
    return new Node("GroupByClause", node => {
      node.append(r.consume(Keyword.GROUP))
      node.append(r.consume(Keyword.BY))
      if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.DISTINCT)) {
        node.append(new Node("DistinctOption", node => {
          node.append(r.consume())
        }))
      }
      do {
        if (r.peekIf(Keyword.ROLLUP)) {
          node.append(new Node("RollupClause", node => {
            node.append(r.consume())
            //TODO
          }))
        } else if (r.peekIf(Keyword.CUBE)) {
          node.append(new Node("CubeClause", node => {
            node.append(r.consume())
            //TODO
          }))
        } else if (r.peekIf(Keyword.GROUPING, Keyword.SET)) {
          node.append(new Node("GroupingSetClause", node => {
            node.append(r.consume())
            //TODO
          }))
        } else {
          node.append(this.expression(r))
        }
        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      } while(!r.peek().eos)
    })
  }

  private havingClause(r: TokenReader) {
    return new Node("HavingClause", node => {
      node.append(r.consume(Keyword.HAVING))
      node.append(this.expression(r))
    })
  }

  private windowClause(r: TokenReader) {
    return new Node("WindowClause", node => {
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
    return new Node("Window", node => {
      if (!r.peekIf(Keyword.PARTITION)) {
        node.append(this.identifier(r, "BaseWindowName"))
      }
      if (r.peekIf(Keyword.PARTITION)) {
        node.append(this.partitionByClause(r))
      }
      if (r.peekIf(Keyword.ORDER)) {
        node.append(this.orderByClause(r))
      }
      node.append(new Node("FrameClause", node => {
        if (r.peekIf(Keyword.RANGE)) {
          node.append(new Node("RangeOption", node => {
            node.append(r.consume())
          }))
        } else if (r.peekIf(Keyword.ROWS)) {
          node.append(new Node("RowsOption", node => {
            node.append(r.consume())
          }))
        } else if (r.peekIf(Keyword.GROUPS)) {
          node.append(new Node("GroupsOption", node => {
            node.append(r.consume())
          }))
        }
        if (r.peekIf(Keyword.CURRENT)) {
          node.append(new Node("FrameStartClause", node => {
            node.append(new Node("CurrentRowOption", node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.ROW))
            }))
          }))
        } else if (r.peekIf(Keyword.UNBOUNDED)) {
          node.append(new Node("FrameStartClause", node => {
            node.append(new Node("UnboundedPrecedingOption", node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.PRECEDING))
            }))
          }))
        } else if (r.peekIf(Keyword.BETWEEN)) {
          node.append(r.consume())
          node.append(new Node("FrameStartClause", node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.CURRENT)) {
              node.append(new Node("CurrentRowOption", node => {
                node.append(r.consume())
                node.append(r.consume(Keyword.ROW))
              }))
            } else if (r.peekIf(Keyword.UNBOUNDED)) {
              node.append(new Node("UnboundedPrecedingOption", node => {
                node.append(r.consume(),)
                node.append(r.consume(Keyword.PRECEDING))
              }))
            } else {
              const expr = this.expression(r)
              if (r.peekIf(Keyword.PRECEDING)) {
                node.append(new Node("PrecedingOption", node => {
                  node.append(expr)
                  node.append(r.consume())
                }))
              } else if (r.peekIf(Keyword.FOLLOWING)) {
                node.append(new Node("FollowingOption", node => {
                  node.append(expr)
                  node.append(r.consume())
                }))
              } else {
                throw r.createParseError()
              }
            }
          }))
          node.append(r.consume(Keyword.AND))
          node.append(new Node("FrameEndClause", node => {
            node.append(r.consume())
            if (r.peekIf(Keyword.CURRENT)) {
              node.append(new Node("CurrentRowOption", node => {
                node.append(r.consume())
                node.append(r.consume(Keyword.ROW))
              }))
            } else if (r.peekIf(Keyword.UNBOUNDED)) {
              node.append(new Node("UnboundedFollowingOption", node => {
                node.append(r.consume())
                node.append(r.consume(Keyword.FOLLOWING))
              }))
            } else {
              const expr = this.expression(r)
              if (r.peekIf(Keyword.PRECEDING)) {
                node.append(new Node("PrecedingOption", node => {
                  node.append(expr)
                  node.append(r.consume())
                }))
              } else if (r.peekIf(Keyword.FOLLOWING)) {
                node.append(new Node("FollowingOption", node => {
                  node.append(expr)
                  node.append(r.consume())
                }))
              } else {
                throw r.createParseError()
              }
            }
          }))
        } else {
          node.append(new Node("FrameStartClause", node => {
            node.append(new Node("PrecedingOption", node => {
              node.append(this.expression(r))
              node.append(r.consume(Keyword.PRECEDING))
            }))
          }))
        }
      }))
      if (r.peekIf(Keyword.EXCLUDE)) {
        node.append(new Node("ExcludeClause", node => {
          node.append(r.consume())
          if (r.peekIf(Keyword.NO)) {
            node.append(new Node("NoOthersOption", node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.OTHERS))
            }))
          } else if (r.peekIf(Keyword.CURRENT)) {
            node.append(new Node("CurrentRowOption", node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.ROW))
            }))
          } else if (r.peekIf(Keyword.GROUP)) {
            node.append(new Node("GroupOption", node => {
              node.append(r.consume())
            }))
          } else if (r.peekIf(Keyword.TIES)) {
            node.append(new Node("TiesOption", node => {
              node.append(r.consume())
            }))
          } else {
            throw r.createParseError()
          }
        }))
      }
    })
  }

  private partitionByClause(r: TokenReader) {
    return new Node("PartitionByClause", node => {
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
    return new Node("OrderByClause", node => {
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
    return new Node("LimitClause", node => {
      node.append(r.consume(Keyword.LIMIT))
      if (r.peekIf(Keyword.ALL)) {
        node.append(new Node("AllOption", node => {
          node.append(r.consume())
        }))
      } else {
        node.append(this.expression(r))
      }
    })
  }

  private offsetClause(r: TokenReader) {
    return new Node("OffsetClause", node => {
      node.append(r.consume(Keyword.OFFSET))
      node.append(this.expression(r))
      if (r.peekIf(Keyword.ROW) || r.peekIf(Keyword.ROWS)) {
        node.append(r.consume())
      }
    })
  }

  private fetchClause(r: TokenReader) {
    return new Node("FetchClause", node => {
      node.append(r.consume(Keyword.FETCH))
      if (r.peekIf(Keyword.FIRST)) {
        node.append(new Node("FirstOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.NEXT)) {
        node.append(new Node("NextOption", node => {
          node.append(r.consume())
        }))
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
        node.append(new Node("OnlyOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.WITH)) {
        node.append(new Node("WithTiesOption", node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.TIES))
        }))
      }
    })
  }

  private forUpdateClause(r: TokenReader) {
    return new Node("ForUpdateClause", node => {
      node.append(r.consume(Keyword.FOR))
      if (r.peekIf(Keyword.UPDATE)) {
        node.append(r.consume())
      } else if (r.peekIf(Keyword.NO, Keyword.KEY, Keyword.UPDATE)) {
        node.append(new Node("NoKeyOption", node => {
          node.append(r.consume())
          node.append(r.consume())
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.SHARE)) {
        node.name = "ForShareClause"
        node.append(r.consume())
      } else if (r.peekIf(Keyword.KEY, Keyword.SHARE)) {
        node.name = "ForShareClause"
        node.append(new Node("KeyOption", node => {
          node.append(r.consume())
          node.append(r.consume())
        }))
      }
      if (r.peekIf(Keyword.OF)) {
        node.append(new Node("ObjectReferenceList", node => {
          node.append(r.consume())
          do {
            node.append(new Node("ObjectReference", node => {
              const ident = this.identifier(r, "ObjectName")
              node.append(ident)
              if (r.peekIf(TokenType.Dot)) {
                ident.name = "SchemaName"
                node.append(r.consume())
                node.append(this.identifier(r, "ObjectName"))
              }
            }))
            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
              break
            }
          } while (!r.peek().eos)
        }))
      }
      if (r.peekIf(Keyword.NOWAIT)) {
        node.append(new Node("NowaitOption", node => {
          node.append(r.consume())
        }))
      } else if (r.peekIf(Keyword.SKIP)) {
        node.append(new Node("SkipLockedOption", node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.LOCKED))
        }))
      }
    })
  }

  private expression(r: TokenReader, priority = 0) {
    let current: Node
    if (priority < 9 && r.peekIf(Keyword.NOT)) {
      current = new Node("NotOperation", node => {
        node.append(r.consume())
        node.append(this.expression(r, 9))
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
      current = new Node("BitwiseNotOperation", node => {
        node.append(r.consume())
        node.append(this.expression(r))
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
      current = new Node("UnaryPlusOperation", node => {
        node.append(r.consume())
        node.append(this.expression(r))
      })
    } else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
      current = new Node("UnaryMinusOperation", node => {
        node.append(r.consume())
      })
    } else {
      current = this.expressionValue(r)
    }

    while (!r.peek().eos) {
      if (priority < 11 && r.peekIf(Keyword.OR)) {
        current = new Node("OrOperation", node => {
          node.append(r.consume())
          node.append(this.expression(r, 11))
        })
      } else if (priority < 10 && r.peekIf(Keyword.AND)) {
        current = new Node("AndOperation", node => {
          node.append(r.consume())
          node.append(this.expression(r, 10))
        })
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: [ "=", "==" ] })) {
        current = new Node("EqualOperation", node => {
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf({ type: TokenType.Operator, text: [ "<>", "!=" ] })) {
        current = new Node("NotEqualOperation", node => {
          node.append(r.consume())
          node.append(this.expression(r, 8))
        })
      } else if (priority < 8 && r.peekIf(Keyword.IS)) {
        const prefix = [ r.consume() ]
        if (r.peekIf(Keyword.NOT)) {
          prefix.push(r.consume())
          if (r.peekIf(Keyword.DISTINCT)) {
            current = new Node("IsNotDistinctFromOperation", node => {
              node.append(...prefix)
              node.append(r.consume())
              node.append(r.consume(Keyword.FROM))
            })
          } else {
            current = new Node("IsNotOperation", node => {
              node.append(...prefix)
              node.append(r.consume())
            })
          }
        } else if (r.peekIf(Keyword.DISTINCT)) {
          current = new Node("IsDistinctFromOperation", node => {
            node.append(...prefix)
            node.append(r.consume())
            node.append(r.consume(Keyword.FROM))
          })
        } else {
          current = new Node("IsOperation", node => {
            node.append(...prefix)
          })
        }
        current.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.BETWEEN) || r.peekIf(Keyword.NOT, Keyword.BETWEEN)) {
        if (r.peekIf(Keyword.NOT)) {
          current = new Node("NotBetweenOperation", node => {
            node.append(r.consume())
          })
        } else {
          current = new Node("BetweenOperation", node => {
            node.append(current)
          })
        }
        current.append(r.consume())
        current.append(this.expression(r, 8))
        current.append(r.consume(Keyword.AND))
        current.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.IN) || r.peekIf(Keyword.NOT, Keyword.IN)) {
        if (r.peekIf(Keyword.NOT)) {
          current = new Node("NotInOperation", node => {
            node.append(current)
            node.append(r.consume())
          })
        } else {
          current = new Node("InOperation", node => {
            node.append(current)
          })
        }
        current.append(r.consume())
        if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.VALUES, Keyword.SELECT])) {
          current.append(new Node("Subquery", node => {
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
          }))
        } else if (r.peekIf(TokenType.LeftParen)) {
          current.append(new Node("ExpressionList", node => {
            node.append(r.consume())
            while (!r.peek().eos) {
              node.append(this.expression(r))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            }
            node.append(r.consume(TokenType.RightParen))  
          }))
        } else if (r.peekIf(
          TokenType.Identifier,
          TokenType.LeftParen
        )) {
          current = new Node("Function", node => {
            node.append(new Node("ObjectName", node => {
              node.append(r.consume())
              current.append(new Node("ArgumentList", node => {
                node.append(r.consume(TokenType.LeftParen))
                while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
                  node.append(new Node("Argument", node => {
                    node.append(this.expression(r))
                  }))
                  if (r.peekIf(TokenType.Comma)) {
                    node.append(r.consume())
                  } else {
                    break
                  }
                }
                node.append(r.consume(TokenType.RightParen))
              }))
            }))
          })
        } else if (r.peekIf([TokenType.Identifier, TokenType.String])) {
          current.append(this.columnReference(r))
        } else {
          throw r.createParseError()
        }
      } else if (priority < 8 && (r.peekIf(Keyword.MATCH) || r.peekIf(Keyword.NOT, Keyword.MATCH))) {
        if (r.peekIf(Keyword.NOT)) {
          current = new Node("NotMatchOperation", node => {
            node.append(current)
            node.append(r.consume())
          })
        } else {
          current = new Node("MatchOperation", node => {
            node.append(current)
          })
        }
        current.append(r.consume())
        current.append(this.expression(r, 8))
      } else if (priority < 8 && (r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE))) {
        if (r.peekIf(Keyword.NOT)) {
          current = new Node("NotLikeOperation", node => {
            node.append(current)
            node.append(r.consume())
          })
        } else {
          current = new Node("LikeOperation", node => {
            node.append(current)
          })
        }
        current.append(r.consume())
        current.append(this.expression(r, 8))
        if (r.peekIf(Keyword.ESCAPE)) {
          current.append(new Node("EscapeOption", node => {
            node.append(this.expression(r, 6))
          }))
        }
      } else if (priority < 8 && (r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP))) {
        if (r.peekIf(Keyword.NOT)) {
          current = new Node("NotRegexpOperation", node => {
            node.append(current)
            node.append(r.consume())
          })
        } else {
          current = new Node("RegexpOperation", node => {
            node.append(current)
          })
        }
        current.append(r.consume())
        current.append(this.expression(r, 8))
      } else if (priority < 8 && (r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB))) {
        if (r.peekIf(Keyword.NOT)) {
          current = new Node("NotGlobOperation", node => {
            node.append(current)
            node.append(r.consume())
          })
        } else {
          current = new Node("GlobOperation", node => {
            node.append(current)
          })
        }
        current.append(r.consume())
        current.append(this.expression(r, 8))
      } else if (priority < 8 && r.peekIf(Keyword.ISNULL)) {
        current = new Node("IsNullOperation", node => {
          node.append(current)
          node.append(r.consume())
        })
      } else if (priority < 8 && r.peekIf(Keyword.NOTNULL)) {
        current = new Node("IsNotNullOperation", node => {
          node.append(current)
          node.append(r.consume())
        })
      } else if (priority < 8 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
        current = new Node("IsNotNullOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(r.consume())
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<"})) {
        current = new Node("LessThanOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">"})) {
        current = new Node("GreaterThanOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: "<="})) {
        current = new Node("LessThanOrEqualOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 7 && r.peekIf({ type: TokenType.Operator, text: ">="})) {
        current = new Node("GreaterThanOrEqualOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 7))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "&"})) {
        current = new Node("BitwiseAndOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "|"})) {
        current = new Node("BitwiseOrOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: "<<"})) {
        current = new Node("BitwiseLeftShiftOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 5 && r.peekIf({ type: TokenType.Operator, text: ">>"})) {
        current = new Node("BitwiseRightShiftOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 5))
        })
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "+" })) {
        current = new Node("AddOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 4))
        })
      } else if (priority < 4 && r.peekIf({ type: TokenType.Operator, text: "-" })) {
        current = new Node("SubtractOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 4))
        })
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "*" })) {
        current = new Node("MultiplyOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 3))
        })
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "/" })) {
        current = new Node("DivideOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 3))
        })
      } else if (priority < 3 && r.peekIf({ type: TokenType.Operator, text: "%" })) {
        current = new Node("ModuloOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 3))
        })
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "||" })) {
        current = new Node("ConcatenateOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
        })
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->" })) {
        current = new Node("JsonExtractOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
        })
      } else if (priority < 2 && r.peekIf({ type: TokenType.Operator, text: "->>" })) {
        current = new Node("JsonExtractAndUnquoteOperation", node => {
          node.append(current)
          node.append(r.consume())
          node.append(this.expression(r, 2))
        })
      } else if (priority < 1 && r.peekIf(Keyword.COLLATE)) {
        current = new Node("CollateOperation", node => {
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
    let node: Node
    if (r.peekIf(Keyword.NULL)) {
      node = new Node("NullLiteral", node => {
        node.append(r.consume())
      })
    } else if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
      node = this.booleanLiteral(r)
    } else if (r.peekIf([Keyword.CURRENT_DATE, Keyword.CURRENT_TIME, Keyword.CURRENT_TIMESTAMP])) {
      node =  new Node("Function", node => {
        node.append(new Node("ObjectName", node => {
          const token = r.consume()
          node.append(token)
          node.data.value = token.text.toUpperCase()
        }))
      })
    } else if (r.peekIf(Keyword.CASE)) {
      node = new Node("CaseBlock", node => {
        node.append(r.consume())
        if (!r.peekIf(Keyword.WHEN)) {
          node.append(new Node("CaseClause", node => {
            node.append(this.expression(r))
          }))
        }
        node.append(new Node("CaseConditionList", node => {
          do {
            node.append(new Node("CaseCondition", node => {
              node.append(r.consume(Keyword.WHEN))
              node.append(new Node("WhenClause", node => {
                node.append(this.expression(r))
              }))
              node.append(r.consume(Keyword.THEN))
              node.append(new Node("ThenClause", node => {
                node.append(this.expression(r))
              }))
            }))
          } while (!r.peek().eos)
        }))
        if (r.peekIf(Keyword.ELSE)) {
          node.append(new Node("ElseClause", node => {
            node.append(r.consume())
            node.append(this.expression(r))
          }))
        }
        node.append(r.consume(Keyword.END))
      })
    } else if (r.peekIf(Keyword.CAST)) {
      node = new Node("Function", node => {
        node.append(new Node("ObjectName", node => {
          const token = r.consume()
          node.append(token)
          node.data.value = token.text.toUpperCase()
        }))
        node.append(new Node("ArgumentList", node => {
          node.append(r.consume(TokenType.LeftParen))
          node.append(new Node("Argument", node => {
            node.append(this.expression(r))
          }))
          node.append(r.consume(Keyword.AS))
          node.append(this.typeName(r))
          node.append(r.consume(TokenType.RightParen))
        }))
      })
    } else if (r.peekIf(Keyword.EXISTS)) {
      node = new Node("ExistsOperation", node => {
        node.append(r.consume())
        node.append(r.consume(TokenType.LeftParen))
        if (r.peekIf(Keyword.VALUES)) {
          node.append(this.valuesStatement(r))
        } else {
          node.append(this.selectStatement(r))
        }
        node.append(r.consume(TokenType.RightParen))
      })
    } else if (r.peekIf(TokenType.LeftParen)) {
      node = new Node("", node => {
        node.append(r.consume())
        if (r.peekIf(Keyword.VALUES)) {
          node.name = "Subquery"
          node.append(this.valuesStatement(r))
        } else if (r.peekIf(Keyword.SELECT)) {
          node.name = "Subquery"
          node.append(this.selectStatement(r))
        } else {
          node.name = "Expression"
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
      })
    } else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
      node = new Node("Function", node => {
        node.append(new Node("ObjectName", node => {
          node.append(r.consume())
        }))

        node.append(new Node("ArgumentList", node => {
          node.append(r.consume(TokenType.LeftParen))
          if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
            node.append(new Node("Argument", node => {
              node.append(new Node("AllColumnsOption", node => {
                node.append(r.consume())
              }))
            }))
          } else {
            if (r.peekIf(Keyword.DISTINCT)) {
              node.append(new Node("DistinctOption", node => {
                node.append(r.consume())
              }))
            }
            while (!r.peek().eos) {
              node.append(new Node("Argument", node => {
                node.append(this.expression(r))
              }))
              if (r.peekIf(TokenType.Comma)) {
                node.append(r.consume())
              } else {
                break
              }
            }
          }
          node.append(r.consume(TokenType.RightParen))
        }))
        if (r.peekIf(Keyword.FILTER)) {
          node.append(new Node("FilterClause", node => {
            node.append(r.consume())
            node.append(r.consume(TokenType.LeftParen))
            node.append(this.whereClause(r))
            node.append(r.consume(TokenType.RightParen))
          }))
        }
        if (r.peekIf(Keyword.OVER)) {
          node.append(new Node("OverClause", node => {
            node.append(r.consume())
            if (r.peekIf(TokenType.LeftParen)) {
              node.append(r.consume())
              node.append(this.window(r))
              node.append(r.consume(TokenType.RightParen))
            } else {
              node.append(this.identifier(r, "WindowName"))
            }
          }))
        }
      })
    } else if (r.peekIf(TokenType.Numeric)) {
      node = this.numericLiteral(r)
    } else if (r.peekIf(TokenType.String)) {
      node = this.stringLiteral(r)
    } else if (r.peekIf(TokenType.Blob)) {
      node = this.blobLiteral(r)
    } else if (r.peekIf(TokenType.Identifier) || r.peekIf(TokenType.String, TokenType.Dot)) {
      node = this.columnReference(r)
    } else if (r.peekIf(TokenType.BindVariable)) {
      const token = r.consume()
      if (token.text.startsWith("?")) {
        let value = token.text.substring(1)
        if (value) {
          r.state.bindPosition = Number.parseInt(value, 10)
        } else {
          const pos = r.state.bindPosition ? r.state.bindPosition + 1 : 1
          value = `${pos}`
          r.state.bindPosition = pos
        }
        node = new Node("PositionalBindVariable", node => {
          node.data.value = value
        })
      } else {
        node = new Node("NamedBindVariable", node => {
          node.data.value = token.text.substring(1)
        })
      }
      node.append(token)
    } else {
      throw r.createParseError()
    }
    return node
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
    return new Node("NumericLiteral", node => {
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
    return new Node("StringLiteral", node => {
      const token = r.consume(TokenType.String)
      node.append(token)
      node.data.value = dequote(token.text)
    })
  }

  private blobLiteral(r: TokenReader) {
    return new Node("BlobLiteral", node => {
      const token = r.consume(TokenType.Blob)
      node.append(token)
      node.data.value = token.text.substring(3, token.text.length-1).replace(/''/g, "'").toUpperCase()
    })
  }

  private booleanLiteral(r: TokenReader) {
    return new Node("BooleanLiteral", node => {
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