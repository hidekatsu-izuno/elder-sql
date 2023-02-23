import { Element } from "domhandler";
import { Repository, ResolvedColumn, Resolver, ResolverOptions } from "../resolver.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Resolver extends Resolver {
  constructor(
    repo: Repository,
    options: ResolverOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), repo, options)
  }

  resolveNode(node: Element): ResolvedColumn[] {
    //TODO
    return []
  }
}