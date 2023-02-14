import { Node, Parser } from "./parser.js"

export declare type FormatterOptions = {
  parser?: Parser 
  printWidth?: number
  tabWidth?: number
  useTabs?: boolean
  endOfLine?: "lf" | "crlf" | "cr" | "auto"
  [key: string]: any
}

export abstract class Formatter {
  public options

  constructor(
    public parser: Parser,
    options: FormatterOptions = {},
  ) {
    this.options = {
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      endOfLine: "lf",
      ...options
    }
  }

  format(text: string, filename?: string): string {
    return this.formatNode(this.parser.parse(text, filename))
  }

  abstract formatNode(node: Node): string
}