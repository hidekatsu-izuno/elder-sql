import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../../../src/sql.ts";

export default [
	new Token(SqlLexer.Identifier, "REINDEX", {
		keyword: SqlLexer.REINDEX,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(7, 1, 7) }),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(8, 1, 8),
			}),
		],
	}),
	new Token(SqlLexer.Identifier, "REINDEX", {
		keyword: SqlLexer.REINDEX,
		location: new SourceLocation(9, 2, 1),
	}),
	new Token(SqlLexer.Identifier, "test_collation", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(16, 2, 8),
			}),
		],
		location: new SourceLocation(17, 2, 9),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(31, 2, 23),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(32, 2, 24),
			}),
		],
	}),
	new Token(SqlLexer.Identifier, "REINDEX", {
		keyword: SqlLexer.REINDEX,
		location: new SourceLocation(33, 3, 1),
	}),
	new Token(SqlLexer.Identifier, "test", {
		keyword: SqlLexer.TEST,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(40, 3, 8),
			}),
		],
		location: new SourceLocation(41, 3, 9),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(45, 3, 13) }),
	new Token(SqlLexer.Identifier, "sample", {
		keyword: SqlLexer.SAMPLE,
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(52, 3, 20),
			}),
		],
		location: new SourceLocation(46, 3, 14),
	}),
	new Token(SqlLexer.EoF, "", { location: new SourceLocation(53, 4, 1) }),
];
