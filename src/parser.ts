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

  peek(pos = 0) {
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

      const token = this.peek(i)
      if (!token || !this.matchToken(condition, token)) {
        return false
      }
    }
    return true
  }

  consume(condition?: TokenCondition) {
    const token = this.peek()
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
      if (typeof condition.text === "string") {
        if (condition.text !== token.text) {
          return false
        }
      } else if (typeof condition.text === "function") {
        if (!condition.text(token.text)) {
          return false
        }
      } else if (condition.text instanceof RegExp) {
        if (!condition.text.test(token.text)) {
          return false
        }
      } else if (!condition.text) {
        return false
      }
    }
    return true
  }

  createParseError(message?: string) {
    const token = this.peek()
    const fileName = token?.location?.fileName
    let lineNumber = token?.location?.lineNumber
    let columnNumber = token?.location?.columnNumber

    if (message == null) {
      let start = this.pos
      let end = this.pos
      for (; start >= 0; start--) {
        if (this.tokens[start].text.lastIndexOf('\n') != -1) {
          if (start === end) {
            start = Math.max(start - 3, 0)
          }
          break
        }
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
