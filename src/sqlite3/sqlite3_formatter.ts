import type { FormatterOptions } from "elder-parse";
import { Formatter } from "elder-parse";
import type { Sqlite3Lexer } from "./sqlite3_lexer.ts";
import { Sqlite3Parser } from "./sqlite3_parser.ts";

export class Sqlite3Formatter extends Formatter<Sqlite3Lexer> {
	constructor(options: FormatterOptions = {}) {
		super(
			options.parser ?? new Sqlite3Parser(options),
			[
				{ pattern: "[type=Unknown]", before: "reset", content: "multiline" },
				{ pattern: "[type=WhiteSpace]", content: "noprint" },
				{ pattern: "[type=LineComment]", after: "softbreak" },
				{
					pattern: ":is([type=BlockComment],[type=HintComment])",
					content: "multiline",
				},
				{ pattern: "[type=EoF]", before: "nospace", after: "break" },
				{
					pattern: "[type=Delimiter]",
					before: "reset",
					after: ["softbreak", "break"],
				},
				{ pattern: "[type=CommandStatement]", after: "reset" },
				{
					pattern: [
						":is([type=BlockComment], [type=HintComment]) + [type=LineBreak]",
						":is([type=BlockComment], [type=HintComment]) + [type=WhiteSpace] + [type=LineBreak]",
					].join(","),
					content: "noprint",
					after: "break",
				},
				{ pattern: "[type=LineBreak]", content: "noprint" },
				{ pattern: "[type=EoS]", content: "noprint", after: ["reset", "break"] },
				{
					pattern: [
						"[type=CreateViewStatement] > [type=SelectStatement]",
						"[type=ExplainStatement] > :is([type$=Statement])",
						"[type=WithClause] + :is([type=SelectClause], [type=InsertClause], [type=UpdateClause], [type=DeleteClause])",
						"[type=InsertClause] > [type=ObjectName] + :is([type=ValuesClause], [type=SelectStatement])",
					].join(","),
					before: "softbreak",
				},
				{
					pattern:
						"[type=TableConstraint] :is([type=SortColumnList], [type=ColumnList])",
					before: "nospace",
					after: "nospace",
				},
				{ pattern: "[type=UpdateOnClause] > [type=ColumnList]" },
				{
					pattern:
						":is([type=TableConstraint], [type=UpdateOnClause]) :is([type=SortColumnList], [type=ColumnList]) > [type=Comma]",
					before: "nospace",
				},
				{
					pattern: [
						"[type=RenameToObjectClause]",
						"[type=RenameColumnClause]",
						"[type=AddColumnClause]",
						"[type=DropColumnClause]",
						"[type=UsingModuleClause]",
						"[type=OnConflictClause]",
						"[type=OnUpdateClause]",
						"[type=OnDeleteClause]",
						"[type=MatchClause]",
						"[type=DeferrableOption]",
						"[type=NotDeferrableOption]",
						"[type=DefaultValuesOption]",
						"[type=ReferencesClause]",
						"[type=ColumnConstraint]",
						"[type=InsertOnClause]",
						"[type=UpdateOnClause]",
						"[type=DeleteOnClause]",
						"[type=WhenClause]",
						"[type=ElseClause]",
						"[type=ForEachRowOption]",
						"[type=BeginBlock]",
						"[type=TableColumnList]",
						"[type=SelectColumnList]",
						"[type=FromObjectList]",
						"[type=SortColumnList]",
						"[type=UpdateColumnList]",
						"[type=ColumnList]",
						"[type=ExpressionList]",
						":is([type=CommonTable], [type=SubqueryExpression]) > [type=SelectStatement]",
						":is([type=WhereClause], [type=HavingClause], [type=JoinOnClause]) > [type=Expression]",
						"[type=ParenthesesOperation] > [type=Expression]:has([type=AndOperation], [type=OrOperation])",
					].join(","),
					before: "indent",
					after: "unindent",
				},
				{
					pattern: `:is(${[
						"[type=TableColumnList]",
						"[type=SelectColumnList]",
						"[type=FromObjectList]",
						"[type=SortColumnList]",
						"[type=UpdateColumnList]",
						"[type=ColumnList]",
						"[type=ExpressionList]",
					].join(",")}) > [type=Comma]`,
					before: "nospace",
					after: "softbreak",
				},
				{
					pattern: `:is(${[
						"[type=PragmaName]",
						"[type=TypeName]",
						"[type=ModuleName]",
						"[type=FunctionExpression] > [type=ObjectName]",
					].join(",")}) + [type=LeftParen]`,
					before: "nospace",
				},
				{
					pattern: [
						"[type=TypeOptionList]",
						"[type=FunctionArgumentList]",
						"[type=ModuleArgumentList]",
						"[type=PragmaArgumentList]",
						":is([type=CheckConstraint], [type=GeneratedColumn]) > [type=Expression]",
						"[type=ParenthesesOperation] > [type=Expression]",
					].join(","),
					before: "nospace",
					after: "nospace",
				},
				{
					pattern: [
						"[type=FromClause]",
						"[type=CrossJoinClause]",
						"[type=InnerJoinClause]",
						"[type=LeftOuterJoinClause]",
						"[type=RightOuterJoinClause]",
						"[type=FullOuterJoinClause]",
						"[type=SetClause]",
						"[type=WhereClause]",
						"[type=GroupByClause]",
						"[type=HavingClause]",
						"[type=OrderByClause]",
						"[type=LimitClause]",
						"[type=ReturningClause]",
					].join(","),
					before: "softbreak",
				},
				{
					pattern: [
						"[type=ColumnConstraint]",
						"[type=Expression] [type=AndOperation] > node:first-of-type",
						"[type=Expression] [type=OrOperation] > node:first-of-type",
					].join(","),
					after: "softbreak",
				},
				{
					pattern:
						":is([type=UnaryPlusOperation], [type=UnaryMinusOperation]) > [type=Operator]",
					after: "nospace",
				},
				{ pattern: "[type=Dot]", before: "nospace", after: "nospace" },
				{ pattern: "[type=Comma]", before: "nospace" },
				{ pattern: "[type=SemiColon]", before: "nospace", after: "softbreak" },
			],
			options,
		);
	}
}
