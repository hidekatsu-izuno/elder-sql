export class TokenType {
  static Eof = new TokenType("Eof")
  static Command = new TokenType("Command")
  static Delimiter = new TokenType("Delimiter")
  static SemiColon = new TokenType("SemiColon")
  static WhiteSpace = new TokenType("WhiteSpace", { skip: true })
  static LineBreak = new TokenType("LineBreak", { skip: true })
  static LineComment = new TokenType("LineComment", { skip: true })
  static BlockComment = new TokenType("BlockComment", { skip: true })
  static HintComment = new TokenType("HintComment", { skip: true })
  static LeftParen = new TokenType("LeftParen")
  static RightParen = new TokenType("RightParen")
  static LeftBracket = new TokenType("LeftBracket")
  static RightBracket = new TokenType("RightBracket")
  static Comma = new TokenType("Comma")
  static Dot = new TokenType("Dot")
  static Operator = new TokenType("Operator")
  static Number = new TokenType("Number")
  static Size = new TokenType("Size")
  static String = new TokenType("String")
  static BindVariable = new TokenType("BindVariable")
  static SessionVariable = new TokenType("SessionVariable")
  static UserVariable = new TokenType("UserVariable")
  static QuotedValue = new TokenType("QuotedValue")
  static QuotedIdentifier = new TokenType("QuotedIdentifier")
  static Identifier = new TokenType("Identifier")
  static Error = new TokenType("Error")

  constructor(
    public name: string,
    public options: { [key: string]: any } = {},
  ) {
  }
}

export class Token {
  public type: TokenType
  public subtype?: TokenType

  constructor(
    type: TokenType | [TokenType, TokenType],
    public text: string,
    public pos: number = -1,
    public before: Token[] = [],
  ) {
    if (Array.isArray(type)) {
      this.type = type[0]
      this.subtype = type[1]
    } else {
      this.type = type
    }
  }
}

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
}

export abstract class Lexer {
  constructor(
    public type: string,
    private patterns: {type: TokenType, re: RegExp | (() => RegExp) }[]
  ) {
  }

  lex(input: string) {
    const tokens = []
    let pos = 0

    input = input.replace(/(\/\*<elder-sql>)(.*?)(<\/elder-sql>\*\/)/sg, (m, p1, p2, p3) => {
      return `${" ".repeat(p1.length)}${p2.replace(/\/\+(.*)\+\//sg, "/*$1*/")}${" ".repeat(p3.length)}`
    })
    input = input.replace(/\/\*(<no-elder-sql>\*\/)(.*?)(\/\*<\/no-elder-sql>)\*\//sg, (m, p1, p2, p3) => {
      return `/*${" ".repeat(p1.length)}${p2.replace(/\/\*(.*)\*\//sg, "/+$1+/")}${" ".repeat(p3.length)}*/`
    })
    input = this.filter(input)

    if (input.startsWith("\uFEFF")) {
      pos = 1
    }

    const before = new Array<Token>()
    while (pos < input.length) {
      let token
      for (const pattern of this.patterns) {
        const re = (typeof pattern.re  === 'function') ?
          pattern.re() : pattern.re

        re.lastIndex = pos
        const m = re.exec(input)
        if (m) {
          token = new Token(pattern.type, m[0], pos)
          pos = re.lastIndex
          break
        }
      }

      if (!token) {
        throw new Error(`Failed to tokenize: ${pos}`)
      }

      token = this.process(token)
      if (token.type.options.skip) {
        before.push(token)
      } else {
        token.before.push(...before)
        before.length = 0
        tokens.push(token)
      }
    }

    tokens.push(new Token(TokenType.Eof, "", pos, before))
    return tokens
  }

  protected filter(input: string) {
    return input
  }

  protected process(token: Token) {
    return token
  }
}

export type ParseFunction = (input: string, options?: Record<string, any>) => Node

export abstract class Parser {
  protected pos = 0

  constructor(
    protected tokens: Token[],
    protected options: Record<string, any> = {},
  ) {
  }

  abstract root(): Node

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

  consumeIf(...types: TokenType[]) {
    if (!this.peekIf(...types)) {
      return false
    }
    this.pos += types.length
    return true
  }

  consume(...types: TokenType[]) {
    if (types.length > 0) {
      if (!this.consumeIf(...types)) {
        throw this.createParseError()
      }
    } else {
      const token = this.token()
      if (token == null) {
        throw this.createParseError()
      }
      this.pos++
    }
    return true
  }

  createParseError(message?: string) {
    const token = this.token()
    let lines = [0]
    let rows = 1
    let cols = 0
    for (let i = 0; i < this.pos; i++) {
      const token = this.tokens[i]
      if (token.type === TokenType.LineBreak) {
        if (i + 1 < this.pos) {
          lines.push(i + 1)
          rows++
        }
      }
    }
    for (let i = lines[lines.length-1]; i < this.pos; i++) {
      const token = this.tokens[i]
        for (const skipToken of token.before) {
          cols += skipToken.text.length
        }
        cols += token.text.length
    }

    if (!message) {
      let line = ""
      for (let i = lines[lines.length-1]; i < this.pos; i++) {
        const token = this.tokens[i]
        for (const skipToken of token.before) {
          line += skipToken.text
        }
        line += token.text
      }
      if (!line && lines.length > 1) {
        let line2 = ""
        for (let i = lines[lines.length-2]; i < lines[lines.length-1] - 1; i++) {
          const token = this.tokens[i]
          for (const skipToken of token.before) {
            line2 += skipToken.text
          }
          line2 += token.text
        }
        line = `${line2.substring(line2.length - 16)}\u21B5 ${line}`
      }
      message = `Unexpected token: ${line}"${token && token.type !== TokenType.Eof ? token.text : "<EOF>"}"`
    }

    const fileName = this.options.fileName || ""
    return new ParseError(
      `${fileName}[${rows},${cols}] ${message}`,
      fileName,
      rows,
      cols
    )
  }
}

export class AggregateParseError extends Error {
  constructor(
    public errors: Error[],
    message: string
  ) {
    super(message)
  }
}

export class ParseError extends Error {
  node?: Node

  constructor(
    public message: string,
    public fileName: string,
    public lineNumber: number,
    public columnNumber: number,
  ) {
    super(message)
  }
}
