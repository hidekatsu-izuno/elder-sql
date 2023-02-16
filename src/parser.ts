import { TokenType, Token, Lexer, Keyword } from './lexer.js'

export class Node {
  private parentNode?: Node
  children: (Node | Token)[] = []
  data: Record<string | symbol, any> = {}

  constructor(public name: string) {
  }

  apply(fn: (node: Node) => void) {
    const ret = fn(this)
    if (ret !== undefined) {
      return ret
    }
    return this
  }

  append<T extends (Node | Token)>(child: T): T {
    if (child instanceof Node) {
      if (child.parentNode) {
        child.remove()
      }
      child.parentNode = this
    }
    this.children.push(child)
    return child
  }

  wrap(node: Node) {
    const parent = this.parent()
    if (parent) {
      const index = parent.children.lastIndexOf(this)
      parent.children[index] = node  
    }
    node.parentNode = parent
    node.append(this)
    return node
  }

  remove() {
    const parent = this.parent()
    if (parent) {
      for (let i = parent.children.length-1; i >= 0; i--) {
        const child = parent.children[i]
        if (child === this) {
          parent.children.splice(i, 1)
          child.parentNode = undefined
          break
        }
      }  
    }
  }

  parent() {
    return this.parentNode  
  }

  first() {
    return this.children[0]
  }

  last() {
    return this.children[this.children.length - 1]
  }

  is(name: string | string[] | RegExp) {
    if (Array.isArray(name)) {
      return name.some(val => val === this.name)
    } else if (name instanceof RegExp) {
      return name.test(this.name)
    }
    return name === this.name
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

  toString() {
    let text = ""
    for (const child of this.children) {
      text += child.toString()
    }
    return text
  }
}

export declare type TokenCondition = Keyword | 
  TokenType | 
  (Keyword | TokenType)[] | 
  {
    type?: TokenType | TokenType[],
    text?: string | string[] | RegExp
  } |
  ((token: Token) => boolean)

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

  peekIf(...conditions: TokenCondition[]) {
    if (conditions.length === 0) {
      throw new RangeError("conditions must be at least one.")
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
    if (condition instanceof TokenType || condition instanceof Keyword) {
      if (!token.is(condition)) {
        return false
      }
    } else if (Array.isArray(condition)) {
      if (!token.is(...condition)) {
        return false
      }
    } else if (typeof condition === "function") {
      if (!condition(token)) {
        return false
      }
    } else {
      if (condition.type) {
        if (Array.isArray(condition.type)) {
          if (!token.is(...condition.type)) {
            return false
          }
        } else {
          if (!token.is(condition.type)) {
            return false
          }
        }
      }
      if (condition.text) {
        if (typeof condition.text === "string") {
          if (condition.text !== token.text) {
            return false
          }
        } else if (Array.isArray(condition.text)) {
          if (!condition.text.some(value => value === token.text)) {
            return false
          }
        } else if (condition.text instanceof RegExp) {
          if (!condition.text.test(token.text)) {
            return false
          }
        } else {
          throw new RangeError("condition.text is invalid.")          
        }
      }
    }
    return true
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

  abstract parseTokens(tokens: Token[]): Node
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
