import { Element } from "domhandler"
import { Parser } from "./parser.js"

export declare type ResolverOptions = {
  global?: FromObject[],
  [key: string]: any
}

export class ResolverContext {
  public parent?: ResolverContext
  public children: ResolverContext[] = []

  constructor(fos: FromObject[] = []) {

  }
}

export class FromObject {
  schemaName?: string
  objectName?: string
  columns = new Array<ResolvedColumn>()
  children = new Array<FromObject>()

  constructor(public objectType: string) {
  }
}

export declare type ResolvedColumn = {
  schemaName?: string,
  objectName?: string,
  objectType?: string,
  columnName: string,
  columnTypeSchema?: string,
  columnTypeName: string,
  length?: number,
  precision?: number,
}

export abstract class Resolver {
  constructor(
    public parser: Parser,
    public options: ResolverOptions = {},
  ) {
  }

  resolve(query: string | Element, filename?: string): ResolvedColumn[] {
    const node = query instanceof Element ? query : this.parser.parse(query, filename)
    const statement = this.findStatement(node)
    if (!statement) {
      throw new TypeError("Statement node is not found.")
    }
    const fo = this.extractNode(statement)
    const columns = new Array<ResolvedColumn>()
    if (fo) {
      // resolve
    }
    return columns
  }

  protected abstract extractNode(statement: Element): FromObject | undefined

  private findStatement(elem: Element): Element | undefined {
    if (/(\\s|^)Statement(\\s|$)/.test(elem.attribs.class)) {
      return elem
    } else {
      for (const child of elem.childNodes) {
        if (child instanceof Element) {
          const result = this.findStatement(child)
          if (result) {
            return result
          }
        }
      }
    }
  }
}
