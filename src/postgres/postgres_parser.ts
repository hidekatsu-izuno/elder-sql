import {
  TokenType,
  Token,
} from "../lexer.js"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser.js"
import { dequote } from "../util.js"
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
    const stmt = new Node("")

    try {
      if (r.peekIf(TokenType.Delimiter)) {
        stmt.append(r.consume())
      }
      if (r.peekIf(TokenType.EoF)) {
        stmt.append(r.consume())
      }
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (r.peek() && !r.peekIf(TokenType.Delimiter)) {
          stmt.append(r.consume())
        }
        if (r.peekIf(TokenType.Delimiter)) {
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
}