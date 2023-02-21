import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), [
      { pattern: 'Script > token:is([type=SemiColon], [type=Delimiter])', before: "nospace", after: ["reset", "forcebreak"] },
      { pattern: 'UnaryPlusOpeation > token[type=Operator]', after: "nospace" },
      { pattern: 'UnaryMinusOpeation > token[type=Operator]', after: "nospace" },
      { pattern: 'ArgumentList, OptionList', before: "nospace", after: "nospace" },
      { pattern: 'ColumnType > token[type=RightParen]', before: "nospace" },
      { pattern: 'ParenthesesOperation > token[type=LeftParen]', after: "nospace" },
      { pattern: 'ParenthesesOperation > token[type=RightParen]', before: "nospace" },
      { pattern: ':is(CreateTriggerStatement, AlterTableStatement) > ObjectName', after: "indent" },
      { pattern: 'CreateTriggerStatement > BeginStatement', before: "reset" },
      { pattern: 'CreateViewStatement > SelectStatement', before: "reset" },
      { pattern: 'BeginBlock, FromObjectList, ExpressionList, ColumnList, TableColumnList, SelectColumnList, UpdateColumnList, SortColumnList', before: "indent", after: "unindent" },
      { pattern: ':is(FromObjectList, ExpressionList, ColumnList, TableColumnList, SelectColumnList, UpdateColumnList, SortColumnList) > token[type=Comma]', before: "nospace", after: "break" },
      { pattern: ':is(CommonTableExpression, SubqueryExpression) > SelectStatement', before: "indent", after: "unindent" },
      { pattern: ':is(WhereClause, HavingClause, JoinOnClause) > Expression', before: "indent", after: "unindent" },
      { pattern: 'FromClause, JoinClause, SetClause, WhereClause, GroupByClause, HavingClause, OrderByClause, LimitClause, ReturningClause', before: "break" },
      { pattern: 'Expression :is(AndOperation > token[value=AND], OrOperation > token[value=OR])', before: "break"},
      { pattern: "token[type=Dot]", before: "nospace", after: "nospace" },
      { pattern: "token[type=Comma]", before: "nospace" },
      { pattern: "token[type=SemiColon]", before: "nospace", after: "break" },
    ], options)
  }
}