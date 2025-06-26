import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../../../src/sql.ts";

export default [
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(8, 1, 8),
			}),
		],
		location: new SourceLocation(9, 1, 9),
	}),
	new Token(SqlLexer.Identifier, "DUAL", {
		keyword: SqlLexer.DUAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(13, 1, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(18, 1, 18),
			}),
		],
		location: new SourceLocation(14, 1, 14),
	}),
	new Token(SqlLexer.EoF, "", { location: new SourceLocation(19, 2, 1) }),
];
