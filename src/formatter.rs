export abstract class Formatter {
  constructor(
    public options: Record<string, any> = {},
  ) {
  }

  abstract indent(node: Node): Node

  abstract format(node: Node): Node
}