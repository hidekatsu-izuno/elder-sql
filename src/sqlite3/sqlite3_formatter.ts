import { Node } from "../parser";
import { Formatter } from "../formatter";
import { Sqlite3Parser } from "./sqlite3_parser";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: Record<string, any> = {},
  ) {
    super(options, options.parser ?? new Sqlite3Parser(options))
  }

  indent(text: string): string {
    const node = this.parser.parse(text)
    this.indentNode(node, 0)
    return node.toString()
  }

  format(text: string) {
    const node = this.parser.parse(text)
    return node.toString()
  }
  
  private indentNode(node: Node, level: number) {
    if (node.name === "SelectNode") {

    }

    for (const child of node.children) {
      if (child instanceof Node) {
        this.indentNode(child, level)
      }
    }
  }
}