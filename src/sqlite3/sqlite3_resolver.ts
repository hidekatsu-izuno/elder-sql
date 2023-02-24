import { Element } from "domhandler"
import { Repository, ResolvedColumn, Resolver, ResolverOptions } from "../resolver.js"
import { Sqlite3Parser } from "./sqlite3_parser.js"



export class Sqlite3Resolver extends Resolver {

  constructor(
    repo: Repository,
    options: ResolverOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), repo, options)
  }

  protected resolveNode(statement: Element): ResolvedColumn[] {
    const columns = new Array<ResolvedColumn>()
    if (statement.name === "SelectStatement") {
      this.resolveSelectStatement(statement)
    } else if (statement.name === "InsertStatement") {

    } else if (statement.name === "UpdateStatement") {

    } else if (statement.name === "DeleteStatement") {

    }
    return columns
  }

  private resolveSelectStatement(node: Element) {
    let withClause
    let selectClause
    for (const child of node.childNodes) {
      if (child instanceof Element) {
        if (child.name === "WithClase") {
          for (const child of node.childNodes) {
            if (child instanceof Element) {
              if (child.name === "CommonTableList") {
                for (const child of node.childNodes) {
                  if (child instanceof Element) {
                    if (child.name === "CommonTable") {
                      for (const child of node.childNodes) {
                        if (child instanceof Element) {
                          if (child.name === "ObjectName") {
                            
                          } else if (child.name === "ColumnList") {

                          } else if (child.name === "SelectStatement") {

                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (child.name === "SelectClase") {
          selectClause = child
        }
      }
      if (withClause && selectClause) {
        break
      }
    }
  }

}