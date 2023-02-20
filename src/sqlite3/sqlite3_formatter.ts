import { Keyword, Token, TokenType } from "../lexer.js";
import { Node } from "../parser.js";
import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), [
      { node: [/^(Argument|Option)List$/], before: "nospace", after: "nospace" },
      { node: ["ColumnType"], token: TokenType.RightParen, before: "nospace" },
      { node: ["ParenthesesOperation"], token: TokenType.LeftParen, after: "nospace" },
      { node: ["ParenthesesOperation"], token: TokenType.RightParen, before: "nospace" },
      { node: ["AlterTableStatement", "ObjectName"], after: "indent" },
      { node: ["AlterTableStatement"], after: "unindent" },
      { node: [/^(Table|Select|Update|Sort)?ColumnList$/], before: "indent", after: "unindent" },
      { node: [/^(Table|Select|Update|Sort)?ColumnList$/], token: TokenType.Comma, before: "nospace", after: "break" },
      { node: [/^(Table|Select|Update|Sort)?ColumnList$/], before: "indent", after: "unindent" },
      { node: [/^(CommonTable|Subquery)Expression$/, 'SelectStatement'], before: "indent", after: "unindent" },
      { node: [/^(Begin)Block$/], token: Keyword.BEGIN, after: "indent" },
      { node: [/^(Begin)Block$/], token: Keyword.END, before: "unindent" },
      { node: ["Expression", 'AndOperation'], token: Keyword.AND, before: "break" },
      { node: ["Expression", /^(And|Or)Operation$/, 'AndOperation'], token: Keyword.AND, before: "break" },
      { node: ["Expression", 'OrOperation'], token: Keyword.OR, before: "break" },
      { node: [/^(Where|Having)Clause$/, "Expression"], before: "indent", after: "unindent" },
      { node: [/^(From|Set|Where|GroupBy|Having|OrderBy|Limit|Returning)Clause$/], before: "break" },
      { token: TokenType.Dot, before: "nospace", after: "nospace" },
      { token: TokenType.Comma, before: "nospace" },
      { token: TokenType.SemiColon, before: "nospace" },
    ], options)
  }
}