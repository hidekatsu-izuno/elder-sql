import { TokenType, Token } from './lexer'

export class Node {
  parent?: Node
  children: (Node | Token)[] = []

  constructor(
    public name: string,
    public value?: string,
  ) {
  }

  add(...child: (Node | Token)[]) {
    for (const elem of child) {
      if (elem instanceof Node) {
        elem.parent = this
      }
      this.children.push(elem)
    }
    return this
  }

  has(name: string) {
    return this.children.some(child => {
      return child instanceof Node && child.name === name
    })
  }

  filter(name: string) {
    return this.children.filter(child => {
      return child instanceof Node && child.name === name
    })
  }
}

export class TokenReader {
  public pos = 0

  constructor(
    public tokens: Token[]
  ) {
  }

  token(pos = 0) {
    return this.tokens[this.pos + pos]
  }

  peekIf(...types: TokenType[]) {
    for (let i = 0; i < types.length; i++) {
      const type = types[i]
      if (!type) {
        continue
      }

      const token = this.token(i)
      if (!token) {
        return false
      }
      if (type !== token.type && type !== token.subtype) {
        return false
      }
    }
    return true
  }

  consume(type?: TokenType) {
    const token = this.token()
    if (token == null) {
      throw this.createParseError()
    }
    if (type && !token.is(type)) {
      throw this.createParseError()
    }
    this.pos++
    return token
  }

  createParseError(message?: string) {
    const token = this.token()
    let fileName = token.location?.fileName
    let lineNumber = token.location?.lineNumber
    let columnNumber = token.location?.columnNumber

    if (message == null) {
      const lines = []
      lineNumber = 1
      for (let i = 0; i < this.pos - 1; i++) {
        const token = this.tokens[i]
        if (token.type === TokenType.LineBreak) {
          lineNumber++
        } else {
          if (!lines[lineNumber-1]) {
            lines[lineNumber-1] = ""
          }
          for (const skipToken of token.skips) {
            lines[lineNumber-1] += skipToken.text
          }
          if (token.type === TokenType.Eof) {
            lines[lineNumber-1] += "<EOF>"
          } else {
            lines[lineNumber-1] += token.text
          }
        }
      }
      let line = lines[lines.length-1] || ""
      if (line && lines.length > 1) {
        let preLine = lines[lines.length-1]
        line = `${preLine.substring(preLine.length - 16)}\u21B5 ${line}`
      }
      message = `Unexpected token: ${line}`
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

export type ParseFunction = (input: string, options?: Record<string, any>) => Node

export abstract class Parser extends TokenReader {
  constructor(
    tokens: Token[],
    protected options: Record<string, any> = {},
  ) {
    super(tokens)
  }

  abstract parse(): Node
}

export class AggregateParseError extends Error {
  node?: Node
  
  constructor(
    public errors: Error[],
    message: string
  ) {
    super(message)
  }
}

export class ParseError extends Error {
  node?: Node
  fileName?: string
  lineNumber?: number
  columnNumber?: number

  constructor(message: string) {
    super(message)
  }
}
