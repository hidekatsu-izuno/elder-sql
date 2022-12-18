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
  ParseFunction,
  TokenReader,
} from "../parser"
import { dequote } from "../util"
import { PostgresLexer } from "./postgres_lexer"

export class PostgresParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new PostgresLexer(options).lex(input, options.fileName)
    return new PostgresParser(options).parse(tokens)
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

    while (r.token()) {
      try {
        if (r.peekIf(TokenType.Eof)) {
          root.add(r.consume())
          break
        } else if (r.peekIf(TokenType.Delimiter)) {
          root.add(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          root.add(this.command(r))
        } else {
          root.add(this.statement(r))
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

    if (r.token() != null) {
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

    r.consume(TokenType.Command)
    const token = r.token(-1)
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.add(new Node("name", token.text).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), token.skips, token.location)
      stmt.add(new Node("name", nameToken.text).add(nameToken))

      const args = token.text.substring(sep)
      const argTokens = []
      const re = /([ \t]+)|("[^"]*"|'[^']*'|`[^`]*`)|([^ \t"']+)/y
      let pos = 0
      while (pos < args.length) {
        re.lastIndex = pos
        const m = re.exec(args)
        if (m) {
          const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier

          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = re.lastIndex
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(type, m[0], [], loc))
          pos = re.lastIndex
        }
      }

      const skips = new Array<Token>()
      for (const argToken of argTokens) {
        if (argToken.type.options.skip) {
          skips.push(argToken)
        } else {
          argToken.skips.push(...skips)
          skips.length = 0
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    if (r.peekIf(TokenType.Delimiter)) {
      stmt.add(r.consume())
    }
    if (r.peekIf(TokenType.Eof)) {
      stmt.add(r.consume())
    }
    return stmt
  }

  private statement(r: TokenReader) {
    const stmt = new Node("")

    try {
      if (r.peekIf(TokenType.Delimiter)) {
        stmt.add(r.consume())
      }
      if (r.peekIf(TokenType.Eof)) {
        stmt.add(r.consume())
      }
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (r.token() && !r.peekIf(TokenType.Delimiter)) {
          stmt.add(r.consume())
        }
        if (r.peekIf(TokenType.Delimiter)) {
          stmt.add(r.consume())
        }
        if (r.peekIf(TokenType.Eof)) {
          stmt.add(r.consume())
        }
        err.node = stmt
      }
      throw err
    }
    return stmt
  }
}