import { Parser } from "./parser.js";

export abstract class Formatter {
  constructor(
    public options: Record<string, any> = {},
    public parser: Parser,
  ) {
  }

  abstract indent(text: string): string

  abstract format(text: string): string
}