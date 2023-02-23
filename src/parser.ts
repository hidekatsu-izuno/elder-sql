import { Element } from 'domhandler'
import { TokenType, Token, Lexer, Keyword, TokenQuery } from './lexer.js'

export class TokenReader {
  pos = 0
  state: Record<string, any> = {}

  constructor(
    public tokens: Token[]
  ) {
  }

  peek(pos = 0) {
    return this.tokens[this.pos + pos]
  }

  peekIf(...conditions: (Keyword | TokenType | TokenQuery)[]) {
    if (conditions.length === 0) {
      throw new RangeError("conditions must be at least one.")
    }
    
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i]
      if (!condition) {
        continue
      }

      const token = this.peek(i)
      if (!token || !token.is(condition)) {
        return false
      }
    }
    return true
  }

  consume(condition?: Keyword | TokenType | TokenQuery) {
    const token = this.peek()
    if (token == null) {
      throw this.createParseError()
    }
    if (condition && !token.is(condition)) {
      throw this.createParseError()
    }
    this.pos++
    return token
  }

  createParseError(options: { message?: string } = {}) {
    const token = this.peek()
    const fileName = token?.location?.fileName
    let lineNumber = token?.location?.lineNumber
    let columnNumber = token?.location?.columnNumber
    let message = options.message

    if (message == null) {
      const end = Math.min(this.pos, this.tokens.length - 1)
      let start = end
      while (start >= 0) {
        if (start === 0 || this.tokens[start].toString().indexOf('\n') != -1) {
          if (start === end) {
            start = Math.max(start - 3, 0)
          }
          break
        }
        start--
      }
      let line = ""
      for (let i = start; i <= end; i++ ) {
        line += this.tokens[i].toString()
      }
      message = `Unexpected token: ${line.replace(/\r?\n/g, "\u21B5")}\u261C`
    }

    if (lineNumber == null) {
      lineNumber = 1
      for (let i = 0; i < this.pos; i++) {
        const token = this.tokens[i]
        if (token.type === TokenType.LineBreak) {
          lineNumber++
        }
      }
    }

    let prefix = ""
    if (fileName != null) {
      prefix += fileName
    }
    prefix += "[" + lineNumber
    if (columnNumber != null) {
      prefix += "," + columnNumber
    }
    prefix += "] "

    const err = new ParseError(prefix + message)
    err.fileName = fileName
    err.lineNumber = lineNumber
    err.columnNumber = columnNumber
    return err
  }
}

export abstract class Parser {
  constructor(
    public lexer: Lexer,
    public options: Record<string, any> = {},
  ) {
  }

  parse(text: string, filename?: string) {
    return this.parseTokens(this.lexer.lex(text, filename))
  }

  abstract parseTokens(tokens: Token[]): Element
}

export class AggregateParseError extends Error {
  constructor(
    public node: Element,
    public errors: Error[],
    message: string
  ) {
    super(message)
  }
}

export class ParseError extends Error {
  fileName?: string
  lineNumber?: number
  columnNumber?: number

  constructor(message: string) {
    super(message)
  }
}
