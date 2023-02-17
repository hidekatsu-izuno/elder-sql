import { Keyword, Token, TokenType } from "../lexer.js";
import { Node } from "../parser.js";
import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), [
      { node: [/^(Argument|TypeOption)List$/], token: TokenType.LeftParen, before: "nospace", after: "nospace" },
      { node: [/^(Argument|TypeOption)List$/], token: TokenType.RightParen, before: "nospace" },
      { node: ["Expression"], token: TokenType.LeftParen, after: "nospace" },
      { node: ["Expression"], token: TokenType.RightParen, before: "nospace" },
      { node: ["AlterTableStatement", "ObjectName"], after: "indent" },
      { node: ["AlterTableStatement"], after: "unindent" },
      { node: [/^(Table|Sorting)ColumnList$/], token: TokenType.LeftParen, after: "indent" },
      { node: [/^(Table|Sorting)ColumnList$/], token: TokenType.Comma, before: "nospace", after: "break" },
      { node: [/^(Table|Sorting)ColumnList$/], token: TokenType.RightParen, before: "unindent" },
      { node: [/^(Select)ColumnList$/], before: "indent", after: "unindent" },
      { node: [/^(Select)ColumnList$/], token: TokenType.Comma, before: "nospace", after: "break" },
      { node: [/^(Begin)Block$/], token: Keyword.BEGIN, after: "indent" },
      { node: [/^(Begin)Block$/], token: Keyword.END, before: "unindent" },
      { node: [/^(CommonTable|Subquery)Expression$/], token: TokenType.LeftParen, after: "indent" },
      { node: [/^(CommonTable|Subquery)Expression$/], token: TokenType.RightParen, before: "unindent" },
      { node: ['FromClause'], before: "break", after: "unindent" },
      { node: ['FromClause'], token: Keyword.FROM, after: "indent" },
      { node: ['SetClause'], before: "break", after: "unindent" },
      { node: ['SetClause'], token: Keyword.SET, after: "indent" },
      { node: ['WhereClause'], before: "break", after: "unindent" },
      { node: ['WhereClause'], token: Keyword.WHERE, after: "indent" },
      { node: ['HavingClause'], before: "break", after: "unindent" },
      { node: ['HavingClause'], token: Keyword.HAVING, after: "indent" },
      { node: [/^(Group|Order)ByClause$/], before: "break", after: "unindent" },
      { node: [/^(Group|Order)ByClause$/], token: Keyword.BY, after: "indent" },
      { node: ['LimitClause'], before: "break" },
      { node: ['ReturningClause'], before: "break", after: "unindent" },
      { node: ['ReturningClause'], token: Keyword.RETURNING, after: "indent" },
      { token: TokenType.Dot, before: "nospace", after: "nospace" },
      { token: TokenType.Comma, before: "nospace" },
      { token: TokenType.SemiColon, before: "nospace" },
    ], options)
  }
}