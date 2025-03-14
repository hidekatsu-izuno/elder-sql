import { Element } from 'domhandler'
import { Token, Lexer } from './lexer.js'

export abstract class Parser {
  constructor(
    public lexer: Lexer,
    public options: Record<string, any> = {},
  ) {
  }

  parse(script: string | Token[], filename?: string) {
    const tokens = Array.isArray(script) ? script : this.lexer.lex(script, filename)
    return this.parseTokens(tokens)
  }

  abstract parseTokens(tokens: Token[]): Element
}

export class AggregateParseError extends Error {
  public node: Element
  public errors: Error[]

  constructor(
    node: Element,
    errors: Error[],
    message: string
  ) {
    super(message)
    this.node = node;
    this.errors = errors;
  }
}
