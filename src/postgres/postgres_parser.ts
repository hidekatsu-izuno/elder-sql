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
        } else if (r.peekIf(TokenType.Delimiter)) {
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
    stmt.append(args)
    if (r.peekIf(TokenType.EoF)) {
      stmt.append(r.consume())
    }
    return stmt
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
        stmt = explain.append(stmt)
      }
      if (r.peekIf(TokenType.Delimiter)) {
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
    const node = new Node("ExplainStatement")
      .append(r.consume())
    if (r.peekIf(TokenType.LeftParen)) {
      const options = new Node("ExplainOptionList")
      options.append(r.consume())
      do {
        if (r.peekIf(Keyword.ANALYZE)) {
          const analyze = new Node("AnalyzeOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            analyze.append(this.booleanLiteral(r))
          }
          options.append(analyze)
        } else if (r.peekIf(Keyword.VERBOSE)) {
          const verbose = new Node("VerboseOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            verbose.append(this.booleanLiteral(r))
          }
          options.append(verbose)
        } else if (r.peekIf(Keyword.COSTS)) {
          const costs = new Node("CostsOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            costs.append(this.booleanLiteral(r))
          }
          options.append(costs)
        } else if (r.peekIf(Keyword.SETTINGS)) {
          const settings = new Node("SettingsOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            settings.append(this.booleanLiteral(r))
          }
          options.append(settings)
        } else if (r.peekIf(Keyword.BUFFERS)) {
          const buffers = new Node("BuffersOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            buffers.append(this.booleanLiteral(r))
          }
          options.append(buffers)
        } else if (r.peekIf(Keyword.WAL)) {
          const wal = new Node("walOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            wal.append(this.booleanLiteral(r))
          }
          options.append(wal)
        } else if (r.peekIf(Keyword.TIMING)) {
          const timing = new Node("timingOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            timing.append(this.booleanLiteral(r))
          }
          options.append(timing)
        } else if (r.peekIf(Keyword.SUMMARY)) {
          const summary = new Node("summaryOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TRUE, Keyword.FALSE])) {
            summary.append(this.booleanLiteral(r))
          }
          options.append(summary)
        } else if (r.peekIf(Keyword.FORMAT)) {
          const format = new Node("formatOption")
            .append(r.consume())
          if (r.peekIf([Keyword.TEXT, Keyword.XML, Keyword.JSON, Keyword.YAML])) {
            format.append(this.identifier(r, "FormatType"))
          } else {
            throw r.createParseError()
          }
          options.append(format)
        } else {
          throw r.createParseError()
        }
        if (r.peekIf(TokenType.RightParen)) {
          break
        }
      } while (!r.peek().eos)
      options.append(r.consume(TokenType.RightParen))
      node.append(options)
    } else {
      if (r.peekIf(Keyword.ANALYZE)) {
        node.append(new Node("AnalyzeOption")
          .append(r.consume())
        )
      }
      if (r.peekIf(Keyword.VERBOSE)) {
        node.append(new Node("VerboseOption")
          .append(r.consume())
        )
      }  
    }
    return node
  }

  private createFunctionStatement(r: TokenReader) {
    const node = new Node("CreateFunctionStatement")
    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.OR)) {
      node.append(new Node("OrReplaceOption")
        .append(r.consume())
        .append(r.consume(Keyword.REPLACE))
      )
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
    return node
  }

  private createProcedureStatement(r: TokenReader) {
    const node = new Node("CreateProcedureStatement")
    node.append(r.consume(Keyword.CREATE))
    if (r.peekIf(Keyword.OR)) {
      node.append(new Node("OrReplaceOption")
        .append(r.consume())
        .append(r.consume(Keyword.REPLACE))
      )
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
    return node
  }

  private createTableStatement(r: TokenReader) {
    const node = new Node("CreateTableStatement")
    node.append(r.consume(Keyword.CREATE))
    //TODO
    return node
  }

  private alterTableStatement(r: TokenReader) {
    const node = new Node("AlterTableStatement")
    node.append(r.consume(Keyword.CREATE))
    //TODO
    return node
  }

  private dropTableStatement(r: TokenReader) {
    const node = new Node("DropTableStatement")
    node.append(r.consume(Keyword.CREATE))
    //TODO
    return node
  }

  private setStatement(r: TokenReader) {
    const node = new Node("SetStatement")
    node.append(r.consume(Keyword.SET))
    if (r.peekIf(Keyword.SESSION)) {
      node.append(new Node("SessionOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.LOCAL)) {
      node.append(new Node("LocalOption")
        .append(r.consume())
      )
    }
    if (r.peekIf(Keyword.TIME)) {
      node.append(new Node("ParameterName")
        .append(r.consume())
        .append(r.consume(Keyword.ZONE))
      )
      if (r.peekIf(Keyword.LOCAL)) {
        node.append(new Node("LocalOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultOption")
          .append(r.consume())
        )
      } else if (r.peekIf(TokenType.Identifier)) {
        node.append(this.identifier(r, "ParameterValue"))
      }
    } else {
      node.append(new Node("ParameterName")
        .append(r.consume(TokenType.Identifier))
      )
      if (r.peekIf(Keyword.TO) || r.peekIf({ type: TokenType.Operator, text: "=" })) {
        node.append(r.consume())
      }
      if (r.peekIf(Keyword.DEFAULT)) {
        node.append(new Node("DefaultOption")
          .append(r.consume())
        )
      } else if (r.peekIf(TokenType.Identifier)) {
        node.append(this.identifier(r, "ParameterValue"))
      }
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

    if (r.peekIf(Keyword.OVERRIDING)) {
      const overriding = new Node("")
      node.append(overriding)
      overriding.append(r.consume())
      if (r.peekIf(Keyword.SYSTEM)) {
        overriding.name = "OverridingSystemValueOption"
        overriding.append(r.consume())
        overriding.append(r.consume(Keyword.VALUE))
      } else if (r.peekIf(Keyword.USER)) {
        overriding.name = "OverridingUserValueOption"
        overriding.append(r.consume())
        overriding.append(r.consume(Keyword.VALUE))
      } else {
        throw r.createParseError()
      }
    }

    if (r.peekIf(Keyword.DEFAULT)) {
      node.append(new Node("DefaultValuesOption")
        .append(r.consume())
        .append(r.consume(Keyword.VALUES))
      )
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

    if (r.peekIf(Keyword.ONLY)) {
      node.append(new Node("OnlyOption")
        .append(r.consume())
      )
    }
    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }
    if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
      node.append(new Node("AllDescendantsOption")
        .append(r.consume())
      )
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
      node.append(new Node("WhereClause")
        .append(r.consume())
        .append(new Node("CurrentOfOption")
          .append(r.consume())
          .append(r.consume(Keyword.OF))
          .append(this.identifier(r, "CursorName"))
        )
      )
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

    if (r.peekIf(Keyword.ONLY)) {
      node.append(new Node("OnlyOption")
        .append(r.consume())
      )
    }
    const ident = this.identifier(r, "ObjectName")
    node.append(ident)
    if (r.peekIf(TokenType.Dot)) {
      ident.name = "SchemaName"
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectName"))
    }
    if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
      node.append(new Node("AllDescendantsOption")
        .append(r.consume())
      )
    }
    if (r.peekIf(Keyword.AS)) {
      node.append(r.consume())
      node.append(this.identifier(r, "ObjectAlias"))
    }
    if (r.peekIf(Keyword.USING)) {
      node.append(this.fromClause(r))
    }
    if (r.peekIf(Keyword.WHERE, Keyword.CURRENT)) {
      node.append(new Node("WhereClause")
        .append(r.consume())
        .append(new Node("CurrentOfOption")
          .append(r.consume())
          .append(r.consume(Keyword.OF))
          .append(this.identifier(r, "CursorName"))
        )
      )
    } else if (r.peekIf(Keyword.WHERE)) {
      node.append(this.whereClause(r))
    }
    if (r.peekIf(Keyword.RETURNING)) {
      node.append(this.returningClause(r))
    }
    return node
  }

  private mergeStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("MergeStatement")
    if (prefix) {
      node.append(...prefix)
    }
    node.append(this.mergeClause(r))
    return node
  }

  private mergeClause(r: TokenReader) {
    const node = new Node("MergeClause")
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
      const using = new Node("UsingClause")
      node.append(using)
      using.append(r.consume())
      const table = new Node("ObjectReference")
      using.append(table)
      if (r.peekIf(TokenType.LeftParen)) {
        table.append(r.consume())
        table.name = "Subquery"
        table.append(this.selectStatement(r))
        table.append(r.consume(TokenType.RightParen))
      } else {
        const ident = this.identifier(r, "ObjectName")
        table.append(ident)
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          table.append(r.consume())
          table.append(this.identifier(r, "ObjectName"))
        }
      }
      if (r.peekIf(Keyword.AS)) {
        table.append(r.consume())
        table.append(this.identifier(r, "ObjectAlias"))
      } else if (r.peekIf(TokenType.Identifier)) {
        table.append(this.identifier(r, "ObjectAlias"))
      }

      const on = new Node("OnClause")
        .append(r.consume(Keyword.ON))
        .append(this.expression(r))
      using.append(on)

      do {
        if (r.peekIf(Keyword.WHEN, Keyword.MATCHED)) {
          const when = new Node("WhenMatchedClause")
            .append(r.consume())
            .append(r.consume())
          if (r.peekIf(Keyword.AND)) {
            when.append(r.consume())
            when.append(new Node("WhenClause")
              .append(this.expression(r))
            )
          }
          when.append(r.consume(Keyword.THEN))
          if (r.peekIf(Keyword.UPDATE)) {
            const update = new Node("UpdateClause")
            when.append(update)
            update.append(this.setClause(r))
          } else if (r.peekIf(Keyword.DELETE)) {
            when.append(new Node("DeleteClause")
              .append(r.consume())
            )
          } else {
            when.append(new Node("DoNothingOption")
              .append(r.consume(Keyword.DO))
              .append(r.consume(Keyword.NOTHING))
            )
          }
        } else if (r.peekIf(Keyword.WHEN, Keyword.NOT)) {
          const when = new Node("WhenNotMatchedClause")
            .append(r.consume())
            .append(r.consume())
            .append(r.consume(Keyword.MATCHED))
          if (r.peekIf(Keyword.AND)) {
            when.append(r.consume())
            when.append(new Node("WhenClause")
              .append(this.expression(r))
            )
          }
          when.append(r.consume(Keyword.THEN))
          const insert = new Node("InsertClause")
          when.append(insert)
          insert.append(this.setClause(r))
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
            insert.append(columns)
          }

          if (r.peekIf(Keyword.OVERRIDING)) {
            const overriding = new Node("")
            insert.append(overriding)
            overriding.append(r.consume())
            if (r.peekIf(Keyword.SYSTEM)) {
              overriding.name = "OverridingSystemValueOption"
              overriding.append(r.consume())
              overriding.append(r.consume(Keyword.VALUE))
            } else if (r.peekIf(Keyword.USER)) {
              overriding.name = "OverridingUserValueOption"
              overriding.append(r.consume())
              overriding.append(r.consume(Keyword.VALUE))
            } else {
              throw r.createParseError()
            }
          }

          if (r.peekIf(Keyword.DEFAULT)) {
            insert.append(new Node("DefaultValuesOption")
              .append(r.consume())
              .append(r.consume(Keyword.VALUES))
            )
          } else {
            insert.append(this.valuesClause(r))
          }
        } else {
          throw r.createParseError()
        }
      } while (!r.peek().eos)
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
      if (r.peekIf(Keyword.UNION)) {
        current = new Node("UnionOperation")
          .append(current)
          .append(r.consume())
        if (r.peekIf(Keyword.ALL)) {
          current.append(new Node("AllOption"))
            .append(r.consume())
        } else if (r.peekIf(Keyword.DISTINCT)) {
          current.append(new Node("DistinctOption"))
            .append(r.consume())
        }
      } else if (r.peekIf(Keyword.INTERSECT)) {
        current = new Node("IntersectOperation")
          .append(current)
          .append(r.consume())
        if (r.peekIf(Keyword.ALL)) {
          current.append(new Node("AllOption"))
            .append(r.consume())
        } else if (r.peekIf(Keyword.DISTINCT)) {
          current.append(new Node("DistinctOption"))
            .append(r.consume())
        }
      } else if (r.peekIf(Keyword.EXCEPT)) {
        current = new Node("ExceptOperation")
          .append(current)
          .append(r.consume())
        if (r.peekIf(Keyword.ALL)) {
          current.append(new Node("AllOption"))
            .append(r.consume())
        } else if (r.peekIf(Keyword.DISTINCT)) {
          current.append(new Node("DistinctOption"))
            .append(r.consume())
        }
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
    return node
  }

  private selectClause(r: TokenReader) {
    const node = new Node("SelectClause")
    node.append(r.consume(Keyword.SELECT))
    if (r.peekIf(Keyword.ALL)) {
      node.append(new Node("AllOption").append(r.consume()))
    } else if (r.peekIf(Keyword.DISTINCT)) {
      const distinct = new Node("DistinctOption")
        .append(r.consume())
      node.append(distinct)
      if (r.peekIf(Keyword.ON)) {
        const on = new Node("OnClause")
          .append(r.consume())
        distinct.append(on)
        const exprs = new Node("ExpressionList")
        on.append(exprs)
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
      }
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
    return node
  }

  private valuesStatement(r: TokenReader, prefix?: (Token | Node)[]) {
    const node = new Node("ValuesStatement")
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
    return node
  }

  private valuesClause(r: TokenReader) {
    const node = new Node("ValuesClause")
    node.append(r.consume(Keyword.VALUES))
    const exprs = new Node("ExpressionList")
    node.append(exprs)
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
        //TODO
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

      target.append(r.consume(Keyword.ON))
      target.append(r.consume(Keyword.CONSTRAINT))
      target.append(this.identifier(r, "ConstraintName"))

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

  private returningClause(r: TokenReader) {
    const node = new Node("ReturningClause")
      .append(r.consume(Keyword.RETURNING))
      .append(this.selectColumns(r))
    return node
  }

  private setClause(r: TokenReader) {
    const node = new Node("SetClause")
    node.append(r.consume(Keyword.SET))
    do {
      const column = new Node("ColumnAssignment")
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
        column.append(r.consume({ type: TokenType.Operator, text: "=" }))
        const cvalues = new Node("ColumnValueList")
        let hasRow = false
        if (r.peekIf(Keyword.ROW)) {
          cvalues.append(r.consume())
          hasRow = true
        }
        cvalues.append(r.consume(TokenType.RightParen))
        if (!hasRow && r.peekIf(Keyword.SELECT)) {
          cvalues.append(this.selectStatement(r))
        } else {
          do {
            const cvalue = new Node("ColumnValue")
            columns.append(cvalue)
            if (r.peekIf(Keyword.DEFAULT)) {
              cvalue.append(new Node("DefaultOption")
                .append(r.consume())
              )
            } else {
              cvalue.append(this.expression(r))
            }
            if (r.peekIf(TokenType.Comma)) {
              columns.append(r.consume())
            } else {
              break
            }
          } while (!r.peek().eos)
        }
        cvalues.append(r.consume(TokenType.LeftParen))
        column.append(cvalues)
      } else {
        column.append(this.identifier(r, "ColumnName"))
        column.append(r.consume({ type: TokenType.Operator, text: "=" }))
        const cvalue = new Node("ColumnValue")
        if (r.peekIf(Keyword.DEFAULT)) {
          cvalue.append(new Node("DefaultOption")
            .append(r.consume())
          )
        } else {
          cvalue.append(this.expression(r))
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

  private procedureArgumentList(r: TokenReader) {
    const node = new Node("ProcedureArgumentList")
    node.append(node)
    node.append(r.consume(TokenType.LeftParen))
    while (!r.peek().eos) {
      const arg = new Node("ProcedureArgument")
      arg.append(this.identifier(r, "ArgumentName"))
      if (r.peekIf(Keyword.IN)) {
        arg.append(new Node("InOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.OUT)) {
        arg.append(new Node("OutOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.INOUT)) {
        arg.append(new Node("InoutOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.VARIADIC)) {
        arg.append(new Node("VariadicOption")
          .append(r.consume())
        )
      }

      const type = new Node("ParameterType")
      arg.append(type)
      if (r.peekIf(
        TokenType.Identifier, TokenType.Dot, 
        TokenType.Identifier, TokenType.Dot, 
        TokenType.Identifier, { type: TokenType.Operator, text: "%" }, Keyword.TYPE)
      ) {
        const cref = this.columnReference(r)
        cref.append(r.consume())
        cref.append(r.consume())
        arg.append(cref)
      } else if (r.peekIf(
        TokenType.Identifier, TokenType.Dot, 
        TokenType.Identifier, { type: TokenType.Operator, text: "%" }, Keyword.TYPE)
      ) {
        const cref = this.columnReference(r)
        cref.append(r.consume())
        cref.append(r.consume())
        arg.append(cref)
      } else {
        if (r.peekIf(TokenType.Identifier, TokenType.Dot)) {
          arg.append(this.identifier(r, "SchemaName"))
          arg.append(r.consume())
        }
        type.append(this.typeName(r))  
      }

      if (r.peekIf(Keyword.DEFAULT) || r.peekIf({ type: TokenType.Operator, text: "=" })) {
        node.append(r.consume())

        node.append(this.expression(r))
      }

      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
        break
      }
    }
    node.append(r.consume(TokenType.RightParen))
    return node
  }

  private typeName(r: TokenReader) {
    const node = this.identifier(r, "TypeName")
    while (r.peekIf([TokenType.Identifier, TokenType.String])) {
      const ident = this.identifier(r, "")
      node.append(...ident.children)
      node.value = node.value ? node.value + " " + ident.value : ident.value
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

  private sortingColumn(r: TokenReader, options?: { using: boolean }) {
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
      node.append(new Node("AscOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.DESC)) {
      node.append(new Node("DescOption")
        .append(r.consume())
      )
    } else if (options?.using && r.peekIf(Keyword.USING)) {
      const using = new Node("UsingOption")
        .append(r.consume())
      const ope = r.consume(TokenType.Operator)
      using.append(ope)
      using.value = ope.text
      node.append(using)
    }
    if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
      node.append(new Node("NullsFirstOption")
        .append(r.consume())
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
      node.append(new Node("NullsLastOption")
        .append(r.consume())
        .append(r.consume())
      )
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
      node.append(table)
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
      if (r.peekIf(Keyword.INSERT)) {
        table.append(this.insertStatement(r))
      } else if (r.peekIf(Keyword.UPDATE)) {
        table.append(this.updateStatement(r))
      } else if (r.peekIf(Keyword.DELETE)) {
        table.append(this.deleteStatement(r))
      } else if (r.peekIf(Keyword.MERGE)) {
        table.append(this.mergeStatement(r))
      } else if (r.peekIf(Keyword.SELECT)) {
        table.append(this.selectStatement(r))
      } else if (r.peekIf(Keyword.VALUES)) {
        table.append(this.valuesStatement(r))
      } else {
        throw r.createParseError()
      }
      table.append(r.consume(TokenType.RightParen))

      if (r.peekIf(TokenType.Comma)) {
        node.append(r.consume())
      } else {
        break
      }
    } while (!r.peek().eos)

    if (r.peekIf(Keyword.SEARCH)) {
      const search = new Node("SearchClause")
        .append(r.consume())
      node.append(search)
      if (r.peekIf(Keyword.BREADTH)) {
        search.append(new Node("BreadthOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.WIDTH)) {
        search.append(new Node("WidthOption")
          .append(r.consume())
        )
      } else {
        throw r.createParseError()
      }
      node.append(r.consume(Keyword.FIRST))
      node.append(r.consume(Keyword.BY))

      const columns = new Node("ColumnList")
      node.append(columns)
      do {
        columns.append(this.identifier(r, "ColumnName"))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)
      node.append(this.identifier(r, "SequenceColumnName"))
    }
    if (r.peekIf(Keyword.CYCLE)) {
      const cycle = new Node("CycleClause")
        .append(r.consume())
      node.append(cycle)

      const columns = new Node("ColumnList")
      cycle.append(columns)
      do {
        columns.append(this.identifier(r, "ColumnName"))
        if (r.peekIf(TokenType.Comma)) {
          columns.append(r.consume())
        } else {
          break
        }
      } while (!r.peek().eos)

      const set = new Node("CycleDetectionClause")
        .append(r.consume(Keyword.SET))
      cycle.append(set)
      set.append(this.identifier(r, "CycleMarkColumnName"))
      if (r.peekIf(Keyword.TO)) {
        set.append(r.consume())
        set.append(new Node("CycleMarkValue")
          .append(this.expression(r))
        )
        set.append(r.consume(Keyword.DEFAULT))
        set.append(new Node("CycleMarkDefaultValue")
          .append(this.expression(r)))
      }

      if (r.peekIf(Keyword.USING)) {
        const using = new Node("UsingOption")
          .append(r.consume(Keyword.USING))
        cycle.append(using)
        using.append(this.identifier(r, "ColumnName"))
      }
    }

    return node
  }

  private selectColumns(r: TokenReader) {
    const node = new Node("SelectColumnList")
    do {
      const column = new Node("SelectColumn")
      if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
        column.append(new Node("AllColumnsOption")
          .append(r.consume())
        )
      } else if (r.peekIf(
        [TokenType.Identifier, TokenType.String], 
        TokenType.Dot, 
        { type: TokenType.Operator, text: "*" }
      )) {
        column.append(this.identifier(r, "SchemaName"))
        column.append(new Node("AllColumnsOption")
          .append(r.consume())
          .append(r.consume())
        )
      } else {
        column.append(this.expression(r))
        if (r.peekIf(Keyword.AS)) {
          column.append(r.consume())
          column.append(this.identifier(r, "ColumnAlias"))
        } else if (r.peekIf(
          [TokenType.Identifier, TokenType.String]
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
    if (r.peekIf(Keyword.USING)) {
      node.append(r.consume())
      node.name = "UsingClause"
    } else {
      node.append(r.consume(Keyword.FROM))
    }
    let hasJoinClause = false
    do {
      const table = new Node("ObjectReference")
      if (r.peekIf(Keyword.ONLY)) {
        table.append(new Node("OnlyOption")
          .append(r.consume())
        )
      } else if (r.peekIf(Keyword.LATERAL)) {
        table.append(new Node("LiteralOption")
          .append(r.consume())
        )
      }

      if (r.peekIf(TokenType.LeftParen)) {
        table.append(r.consume())
        table.name = "Subquery"
        table.append(this.selectStatement(r))
        table.append(r.consume(TokenType.RightParen))
      } else if (r.peekIf(Keyword.ROWS)) {
        //TODO
      } else {
        const ident = this.identifier(r, "ObjectName")
        table.append(ident)
        if (r.peekIf(TokenType.Dot)) {
          table.append(r.consume())
          ident.name = "SchemaName"
          table.append(this.identifier(r, "ObjectName"))
        }
        if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
          table.append(new Node("AllDescendantsOption")
            .append(r.consume())
          )
        } else if (r.peekIf(TokenType.LeftParen)) {
          table.append(r.consume())
          table.name = "Function"
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
      } else if (r.peekIf(TokenType.Identifier)) {
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
    let hasCondition = true
    if (r.peekIf(Keyword.CROSS)) {
      node.name = "CrossJoinClause"
      node.append(r.consume())
      hasCondition = false
    } else {
      if (r.peekIf(Keyword.NATURAL)) {
        node.append(new Node("NatualOption")
          .append(r.consume())
        )
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
      node.append(new Node("JoinOnClause")
        .append(r.consume())
        .append(this.expression(r))
      )
    } else if (hasCondition && r.peekIf(Keyword.USING)) {
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
    if (r.peekIf(Keyword.ALL)) {
      node.append(new Node("AllOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.DISTINCT)) {
      node.append(new Node("DistinctOption")
        .append(r.consume())
      )
    }
    do {
      if (r.peekIf(Keyword.ROLLUP)) {
        const rollup = new Node("RollupClause")
          .append(r.consume())
        //TODO
        node.append(rollup)
      } else if (r.peekIf(Keyword.CUBE)) {
        const cube = new Node("CubeClause")
          .append(r.consume())
        //TODO
        node.append(cube)
      } else if (r.peekIf(Keyword.GROUPING, Keyword.SET)) {
        const gset = new Node("GroupingSetClause")
          .append(r.consume())
        //TODO
        node.append(gset)
      } else {
        node.append(this.expression(r))
      }
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

  private orderByClause(r: TokenReader) {
    const node = new Node("OrderByClause")
      .append(r.consume(Keyword.ORDER))
      .append(r.consume(Keyword.BY))
    do {
      const column = this.sortingColumn(r, { using: true })
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
    if (r.peekIf(Keyword.ALL)) {
      node.append(new Node("AllOption")
        .append(r.consume())
      )
    } else {
      node.append(this.expression(r))
    }
    return node
  }

  private offsetClause(r: TokenReader) {
    const node = new Node("OffsetClause")
      .append(r.consume(Keyword.OFFSET))
    node.append(this.expression(r))
    if (r.peekIf(Keyword.ROW) || r.peekIf(Keyword.ROWS)) {
      node.append(r.consume())
    }
    return node
  }

  private fetchClause(r: TokenReader) {
    const node = new Node("FetchClause")
      .append(r.consume(Keyword.FETCH))
    if (r.peekIf(Keyword.FIRST)) {
      node.append(new Node("FirstOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.NEXT)) {
      node.append(new Node("NextOption")
        .append(r.consume())
      )
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
      node.append(new Node("OnlyOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.WITH)) {
      node.append(new Node("WithTiesOption")
        .append(r.consume())
        .append(r.consume(Keyword.TIES))
      )
    }
    return node
  }

  private forUpdateClause(r: TokenReader) {
    const node = new Node("ForUpdateClause")
    node.append(r.consume(Keyword.FOR))
    if (r.peekIf(Keyword.UPDATE)) {
      node.append(r.consume())
    } else if (r.peekIf(Keyword.NO, Keyword.KEY, Keyword.UPDATE)) {
      node.append(new Node("NoKeyOption")
        .append(r.consume())
        .append(r.consume())
      )
      .append(r.consume())
    } else if (r.peekIf(Keyword.SHARE)) {
      node.name = "ForShareClause"
      node.append(r.consume())
    } else if (r.peekIf(Keyword.KEY, Keyword.SHARE)) {
      node.name = "ForShareClause"
      node.append(new Node("KeyOption")
        .append(r.consume())
        .append(r.consume())
      )
    }
    if (r.peekIf(Keyword.OF)) {
      const targets = new Node("ObjectReferenceList");
      node.append(targets)
      targets.append(r.consume())
      do {
        const target = new Node("ObjectReference")
        const ident = this.identifier(r, "ObjectName")
        target.append(ident)
        if (r.peekIf(TokenType.Dot)) {
          ident.name = "SchemaName"
          target.append(r.consume())
          target.append(this.identifier(r, "ObjectName"))
        }
        if (r.peekIf(TokenType.Comma)) {
          targets.append(r.consume())
          break
        }
      } while (!r.peek().eos)
    }
    if (r.peekIf(Keyword.NOWAIT)) {
      node.append(new Node("NowaitOption")
        .append(r.consume())
      )
    } else if (r.peekIf(Keyword.SKIP)) {
      node.append(new Node("SkipLockedOption")
        .append(r.consume())
        .append(r.consume(Keyword.LOCKED))
      )
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
        if (r.peekIf(TokenType.LeftParen, [Keyword.WITH, Keyword.VALUES, Keyword.SELECT])) {
          const subquery = new Node("Subquery")
          subquery.append(r.consume())
          const prefix = []
          if (r.peekIf(Keyword.WITH)) {
            prefix.push(this.withClause(r))
          }
          if (r.peekIf(Keyword.VALUES)) {
            subquery.append(this.valuesStatement(r, prefix))
          } else {
            subquery.append(this.selectStatement(r, prefix))
          }
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
          TokenType.Identifier,
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
        } else if (r.peekIf([TokenType.Identifier, TokenType.String])) {
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
    } else if (r.peekIf(Keyword.EXISTS)) {
      node = new Node("ExistsOperation")
      node.append(r.consume())
      node.append(r.consume(TokenType.LeftParen))
      if (r.peekIf(Keyword.VALUES)) {
        node.append(this.valuesStatement(r))
      } else {
        node.append(this.selectStatement(r))
      }
      node.append(r.consume(TokenType.RightParen))
    } else if (r.peekIf(TokenType.LeftParen)) {
      node = new Node("")
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
    } else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
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
        while (!r.peek().eos) {
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
        node = new Node("PositionalBindVariable", value)
      } else {
        node = new Node("NamedBindVariable", token.text.substring(1))
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
    node.value = token.text.substring(3, token.text.length-1).replace(/''/g, "'").toUpperCase()
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