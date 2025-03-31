import { SourceLocation, Token } from "../../../src/lexer.ts";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Identifier, "REINDEX", {
		keyword: SqlKeywords.REINDEX,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(8, 1, 8),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "REINDEX", {
		keyword: SqlKeywords.REINDEX,
		location: new SourceLocation(9, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "test_collation", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(16, 2, 8),
			}),
		],
		location: new SourceLocation(17, 2, 9),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(32, 2, 24),
			}),
		],
		location: new SourceLocation(31, 2, 23),
	}),
	new Token(SqlTokenType.Identifier, "REINDEX", {
		keyword: SqlKeywords.REINDEX,
		location: new SourceLocation(33, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeywords.TEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(40, 3, 8),
			}),
		],
		location: new SourceLocation(41, 3, 9),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(45, 3, 13) }),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(52, 3, 20),
			}),
		],
		location: new SourceLocation(46, 3, 14),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(53, 4, 1),
	}),
];
