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

export declare type TokenCondition = TokenType | {
  type?: TokenType,
  text?: string | RegExp | ((text: string) => boolean)
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

  peekIf(...conditions: TokenCondition[]) {
    if (conditions.length === 0) {
      throw new RangeError("conditions must be at least 1 length.")
    }
    
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i]
      if (!condition) {
        continue
      }

      const token = this.token(i)
      if (!token || !this.matchToken(condition, token)) {
        return false
      }
    }
    return true
  }

  consume(condition?: TokenCondition) {
    const token = this.token()
    if (token == null) {
      throw this.createParseError()
    }
    if (condition && !this.matchToken(condition, token)) {
      throw this.createParseError()
    }
    this.pos++
    return token
  }

  private matchToken(condition: TokenCondition, token: Token) {
    if (condition instanceof TokenType) {
      if (!token.is(condition)) {
        return false
      }  
    } else {
      if (condition.type && !token.is(condition.type)) {
        return false
      }
      if (typeof condition.text === "function" && !condition.text(token.text)) {
        return false
      } else if (condition.text instanceof RegExp && !condition.text.test(token.text)) {
        return false
      } else if (condition.text !== token.text) {
        return false
      }
    }
    return true
  }

  createParseError(message?: string) {
    const token = this.token()
    let fileName = token.location?.fileName
    let lineNumber = token.location?.lineNumber
    let columnNumber = token.location?.columnNumber

    if (message == null) {
      const lines = []
      lineNumber = 1
      for (let i = 0; i <= this.pos; i++) {
        const token = this.tokens[i]
        for (const skipToken of token.skips) {
          if (skipToken.type === TokenType.LineBreak) {
            lineNumber++
          } else {
            if (!lines[lineNumber-1]) {
              lines[lineNumber-1] = ""
            }
            if (skipToken.type === TokenType.Eof) {
              lines[lineNumber-1] += "<EOF>"
            } else {
              lines[lineNumber-1] += skipToken.text
            }
          }
        }
        if (token.type === TokenType.LineBreak) {
          lineNumber++
        } else {
          if (!lines[lineNumber-1]) {
            lines[lineNumber-1] = ""
          }
          if (token.type === TokenType.Eof) {
            lines[lineNumber-1] += "<EOF>"
          } else {
            lines[lineNumber-1] += token.text
          }
        }
      }
      let line = lines[lines.length-1] || ""
      if (!line && lines.length > 1) {
        const preLine = lines[lines.length-1]
        line = `${preLine.substring(preLine.length - 16)}\u21B5 ${line}`
      }
      message = `Unexpected token: ${line}\u261C`
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

export abstract class Parser {
  constructor(
    public options: Record<string, any> = {},
  ) {
  }

  abstract parse(tokens: Token[]): Node
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
