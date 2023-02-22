import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), [
      { pattern: 'Script > SemiColon', before: "nospace", after: ["reset", "forcebreak"] },
      { pattern: 'Delimiter', before: "reset", after: ["forcebreak", "forcebreak"] },
      { pattern: 'SectionBreak', before: "reset", after: "forcebreak" },
      { pattern: 'UnaryPlusOperation > Operator', after: "nospace" },
      { pattern: 'UnaryMinusOperation > Operator', after: "nospace" },
      { pattern: 'FunctionArgumentList, ModuleArgumentList, PragmaArgumentList, TypeOptionList, ReferencesOptionList', before: "nospace", after: "nospace" },
      { pattern: 'ModuleName, FunctionExpression > ObjectName', after: "nospace" },
      { pattern: ':is(PragmaName, TypeName) + LeftParen', before: "nospace" },
      { pattern: ':is(CheckConstraint, GeneratedColumn) > Expression', before: "nospace", after: "nospace" },
      { pattern: 'ColumnType > RightParen', before: "nospace" },
      { pattern: 'ParenthesesOperation:has(AndOperation, OrOperation) > Expression', before: "indent", after: "unindent" },
      { pattern: 'ParenthesesOperation > LeftParen', after: "nospace" },
      { pattern: 'ParenthesesOperation > RightParen', before: "nospace" },
      { pattern: 'AlterTableOptionList, UsingModuleClause', before: "indent", after: "indent"},
      { pattern: 'CreateTriggerStatement > :is(InsertOnClause, UpdateOnClause, DeleteOnClause, ForEachRowOption)', before: "indent", after: "indent" },
      { pattern: 'CreateTriggerStatement > BeginStatement', before: "break" },
      { pattern: ':is(CreateViewStatement, InsertClause) > SelectStatement', before: "break" },
      { pattern: 'InsertClause > ObjectName + ValuesClause', before: "break" },
      { pattern: 'InsertClause > DefaultValuesOption', before: "indent", after: "unindent" },
      { pattern: 'UniqueConstraint > SortColumnList', before: "nospace", after: "nospace" },
      { pattern: 'ReferencesClause', before: "indent", after: "unindent" },
      { pattern: 'ExplainStatement > Statement', before: "break" },
      { pattern: 'BeginBlock, FromObjectList, ExpressionList, TableColumnList, SelectColumnList, UpdateColumnList, SortColumnList', before: "indent", after: "unindent" },
      { pattern: ':is(FromObjectList, ExpressionList, TableColumnList, SelectColumnList, UpdateColumnList, SortColumnList) > Comma', before: "nospace", after: "break" },
      { pattern: ':is(CommonTableExpression, SubqueryExpression) > SelectStatement', before: "indent", after: "unindent" },
      { pattern: ':is(WhereClause, HavingClause, JoinOnClause) > Expression', before: "indent", after: "unindent" },
      { pattern: 'JoinOnClause', before: "nobreak" },
      { pattern: 'FromClause, JoinClause, SetClause, WhereClause, GroupByClause, HavingClause, OrderByClause, LimitClause, ReturningClause', before: "break" },
      { pattern: 'Expression :is(AndOperation > [value=AND], OrOperation > [value=OR])', before: "break"},
      { pattern: "Dot", before: "nospace", after: "nospace" },
      { pattern: "Comma", before: "nospace" },
      { pattern: "SemiColon", before: "nospace", after: "break" },
    ], options)
  }
}