import {
  TokenType,
  Token,
  SourceLocation,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser"
import { dequote } from "../util"
import { PostgresLexer } from "./postgres_lexer"

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
        if (r.peekIf(TokenType.Eof)) {
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
    const stmt = new Node("command")

    r.consume(TokenType.Command)
    const token = r.peek(-1)
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.append(new Node("name", token.text).append(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), {
        preskips: token.preskips,
        location: token.location,
      })
      stmt.append(new Node("name", nameToken.text).append(nameToken))

      const args = token.text.substring(sep)
      const argTokens = []
      const re = /([ \t]+)|("[^"]*"|'[^']*'|`[^`]*`)|([^ \t"']+)/y
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

      const skips = token.postskips
      for (const argToken of argTokens) {
        if (argToken.type.skip) {
          skips.push(argToken)
        } else {
          argToken.preskips.push(...skips)
          skips.length = 0
          stmt.append(new Node("arg", dequote(argToken.text)).append(argToken))
        }
      }
    }

    if (r.peekIf(TokenType.Delimiter)) {
      stmt.append(r.consume())
    }
    if (r.peekIf(TokenType.Eof)) {
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
      if (r.peekIf(TokenType.Eof)) {
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
        if (r.peekIf(TokenType.Eof)) {
          stmt.append(r.consume())
        }
        err.node = stmt
      }
      throw err
    }
    return stmt
  }
}