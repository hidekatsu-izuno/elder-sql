import { Keyword, Token, TokenType } from "../lexer.js";
import { Node } from "../parser.js";
import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), [
      { node: ["AlterTableStatement", "ObjectName"], after: "indent" },
      { node: ["AlterTableStatement"], after: "unindent" },
      { node: [/^(Argument|TypeOption)List$/], token: TokenType.LeftParen, before: "nospace", after: "nospace" },
      { node: [/^(Argument|TypeOption)List$/], token: TokenType.RightParen, before: "nospace" },
      { node: ["Expression"], token: TokenType.LeftParen, after: "nospace" },
      { node: ["Expression"], token: TokenType.RightParen, before: "nospace" },
      { node: ["SortingColumnList"], token: TokenType.LeftParen, after: "indent" },
      { node: ["SortingColumnList"], token: TokenType.RightParen, before: "unindent" },
      { node: [/^(Begin)Block$/], token: Keyword.BEGIN, after: "indent" },
      { node: [/^(Begin)Block$/], token: Keyword.END, before: "unindent" },
      { token: TokenType.Dot, before: "nospace", after: "nospace" },
      { token: TokenType.Comma, before: "nospace" },
      { token: TokenType.SemiColon, before: "nospace" },
    ], options)
  }
}