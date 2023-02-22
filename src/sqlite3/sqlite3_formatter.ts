import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), [
      { pattern: 'Script > SemiColon', before: "nospace", after: ["reset", "break"] },
      { pattern: 'Delimiter', before: "reset", after: ["softbreak", "break"] },
      { pattern: 'SectionBreak', before: "reset" },
      { pattern: 'RenameToObjectClause, RenameColumnClause, AddColumnClause, DropColumnClause, UsingModuleClause, ColumnConstraintList', before: "indent", after: "unindent"},
      { pattern: ':is(PragmaName, TypeName) + LeftParen', before: "nospace" },
      { pattern: 'TypeOptionList, FunctionArgumentList, ModuleArgumentList, PragmaArgumentList, ReferencesOptionList, :is(CheckConstraint, GeneratedColumn) > Expression', before: "nospace", after: "nospace" },
      { pattern: 'ColumnConstraint', after: 'softbreak'},


      /*
      { pattern: ':is(UnaryPlusOperation, UnaryMinusOperation) > Operator', after: "nospace" },
      { pattern: 'ModuleName, FunctionExpression > ObjectName', after: "nospace" },
      { pattern: 'ParenthesesOperation:has(AndOperation, OrOperation) > Expression', before: "indent", after: "unindent" },
      { pattern: 'ParenthesesOperation > LeftParen', after: "nospace" },
      { pattern: 'ParenthesesOperation > RightParen', before: "nospace" },
      { pattern: 'CreateTriggerStatement > :is(InsertOnClause, UpdateOnClause, DeleteOnClause, ForEachRowOption)', before: "indent", after: "unindent" },
      { pattern: 'CreateTriggerStatement > BeginStatement', before: "softbreak" },
      { pattern: ':is(CreateViewStatement, InsertClause) > SelectStatement', before: "softbreak" },
      { pattern: 'InsertClause > ObjectName + ValuesClause', before: "softbreak" },
      { pattern: ':is(CreateViewStatement, InsertClause) > :is(ColumnList, DefaultValuesOption)', before: "indent", after: "unindent" },
      { pattern: ':is(CreateViewStatement, InsertClause) > ColumnList > Comma', before: "nospace", after: "softbreak" },
      { pattern: 'UniqueConstraint > SortColumnList', before: "nospace", after: "nospace" },
      { pattern: 'ReferencesClause, WhenClause, ThenClause, ElseClause', before: "indent", after: "unindent" },
      { pattern: 'ExplainStatement > Statement', before: "softbreak" },
      { pattern: 'BeginBlock, FromObjectList, ExpressionList, TableColumnList, SelectColumnList, UpdateColumnList, SortColumnList, ColumnConstraintList', before: "indent", after: "unindent" },
      { pattern: ':is(FromObjectList, ExpressionList, TableColumnList, SelectColumnList, UpdateColumnList, SortColumnList) > Comma', before: "nospace", after: "softbreak" },
      { pattern: ':is(CommonTableExpression, SubqueryExpression) > SelectStatement', before: "indent", after: "unindent" },
      { pattern: ':is(WhereClause, HavingClause, JoinOnClause) > Expression', before: "indent", after: "unindent" },
      { pattern: 'JoinOnClause', before: "nobreak" },
      { pattern: 'FromClause, JoinClause, SetClause, WhereClause, GroupByClause, HavingClause, OrderByClause, LimitClause, ReturningClause', before: "softbreak" },
      { pattern: 'Expression :is(AndOperation > [value=AND], OrOperation > [value=OR])', before: "softbreak"},
*/
      { pattern: "Dot", before: "nospace", after: "nospace" },
      { pattern: "Comma", before: "nospace" },
      { pattern: "SemiColon", before: "nospace", after: "softbreak" },
    ], options)
  }
}