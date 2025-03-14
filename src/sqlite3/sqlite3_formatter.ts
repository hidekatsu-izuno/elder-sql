import { Formatter, type FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
	constructor(options: FormatterOptions = {}) {
		super(
			options.parser ?? new Sqlite3Parser(options),
			[
				{
					pattern: "Script > SemiColon",
					before: "nospace",
					after: ["reset", "break"],
				},
				{ pattern: "EoF", before: "nospace", after: "break" },
				{
					pattern: "Delimiter",
					before: "reset",
					after: ["softbreak", "break"],
				},
				{ pattern: "CommandStatement", after: "reset" },
				{
					pattern: [
						":is(BlockComment, HintComment) + LineBreak",
						":is(BlockComment, HintComment) + WhiteSpace + LineBreak",
					].join(","),
					after: "break",
				},
				{
					pattern: [
						"CreateViewStatement > SelectStatement",
						"ExplainStatement > :is(" +
							"AlterTableStatement, " +
							"AnalyzeStatement, " +
							"AttachStatement, " +
							"BeginStatement, " +
							"CommitStatement, " +
							"CreateIndexStatement, " +
							"CreateTableStatement, " +
							"CreateTriggerStatement, " +
							"CreateViewStatement, " +
							"DeleteStatement, " +
							"DetachStatement, " +
							"DropIndexStatement, " +
							"DropTableStatement, " +
							"DropTriggerStatement, " +
							"DropViewStatement, " +
							"InsertStatement, " +
							"PragmaStatement, " +
							"ReindexStatement, " +
							"ReleaseStatement, " +
							"RollbackStatement, " +
							"SavepointStatement, " +
							"SelectStatement, " +
							"UpdateStatement, " +
							"VacuumStatement)",
						"WithClause + :is(SelectClause, InsertClause, UpdateClause, DeleteClause)",
						"InsertClause > ObjectName + :is(ValuesClause, SelectStatement)",
					].join(","),
					before: "softbreak",
				},
				{
					pattern: "TableConstraint :is(SortColumnList, ColumnList)",
					before: "nospace",
					after: "nospace",
				},
				{ pattern: "UpdateOnClause > ColumnList" },
				{
					pattern:
						":is(TableConstraint, UpdateOnClause) :is(SortColumnList, ColumnList) > Comma",
					before: "nospace",
				},
				{
					pattern: [
						"RenameToObjectClause",
						"RenameColumnClause",
						"AddColumnClause",
						"DropColumnClause",
						"UsingModuleClause",
						"OnConflictClause",
						"OnUpdateClause",
						"OnDeleteClause",
						"MatchClause",
						"DeferrableOption",
						"NotDeferrableOption",
						"DefaultValuesOption",
						"ReferencesClause",
						"ColumnConstraint",
						"InsertOnClause",
						"UpdateOnClause",
						"DeleteOnClause",
						"WhenClause",
						"ElseClause",
						"ForEachRowOption",
						"BeginBlock",
						"TableColumnList",
						"SelectColumnList",
						"FromObjectList",
						"SortColumnList",
						"UpdateColumnList",
						"ColumnList",
						"ExpressionList",
						":is(CommonTable, SubqueryExpression) > SelectStatement",
						":is(WhereClause, HavingClause, JoinOnClause) > Expression",
						"ParenthesesOperation > Expression:has(AndOperation, OrOperation)",
					].join(","),
					before: "indent",
					after: "unindent",
				},
				{
					pattern: `:is(${[
						"TableColumnList",
						"SelectColumnList",
						"FromObjectList",
						"SortColumnList",
						"UpdateColumnList",
						"ColumnList",
						"ExpressionList",
					].join(",")}) > Comma`,
					before: "nospace",
					after: "softbreak",
				},
				{
					pattern: `:is(${[
						"PragmaName",
						"TypeName",
						"ModuleName",
						"FunctionExpression > ObjectName",
					].join(",")}) + LeftParen`,
					before: "nospace",
				},
				{
					pattern: [
						"TypeOptionList",
						"FunctionArgumentList",
						"ModuleArgumentList",
						"PragmaArgumentList",
						":is(CheckConstraint, GeneratedColumn) > Expression",
						"ParenthesesOperation > Expression",
					].join(","),
					before: "nospace",
					after: "nospace",
				},
				{
					pattern: [
						"FromClause",
						"CrossJoinClause",
						"InnerJoinClause",
						"LeftOuterJoinClause",
						"RightOuterJoinClause",
						"FullOuterJoinClause",
						"SetClause",
						"WhereClause",
						"GroupByClause",
						"HavingClause",
						"OrderByClause",
						"LimitClause",
						"ReturningClause",
						"Expression :is(AndOperation > [value=AND], OrOperation > [value=OR])",
					].join(","),
					before: "softbreak",
				},
				{ pattern: "ColumnConstraint", after: "softbreak" },
				{
					pattern: ":is(UnaryPlusOperation, UnaryMinusOperation) > Operator",
					after: "nospace",
				},
				{ pattern: "Dot", before: "nospace", after: "nospace" },
				{ pattern: "Comma", before: "nospace" },
				{ pattern: "SemiColon", before: "nospace", after: "softbreak" },
			],
			options,
		);
	}
}
