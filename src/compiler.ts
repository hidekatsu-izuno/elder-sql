import { Parser, Token, Node, TokenType, Lexer } from "./parser"

export class ElderSqlCompiler {
  constructor(
    public options = {}
  ) {

  }

  compile(filePath: string) {
    return new ElderSqlCompileResult("", {})
  }
}

export class ElderSqlCompileResult {
  constructor(
    public js: string,
    public map: object,
  ) {
  }
}

export class ElderSqlError extends Error {
  constructor(err: Error) {
    super(err.message)

    this.name = "ElderSqlError"
  }
}

export class ElderSqlParser extends Parser {
  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    return root
  }
}
