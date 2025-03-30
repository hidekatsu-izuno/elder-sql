import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeyword, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Identifier, "analyze", {
		keyword: SqlKeyword.ANALYZE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(7, 1, 7),
			}),
		],
		location: new SourceLocation(8, 1, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(13, 1, 13),
			}),
		],
		location: new SourceLocation(12, 1, 12),
	}),
	new Token(SqlTokenType.Identifier, "ANALYZE", {
		keyword: SqlKeyword.ANALYZE,
		location: new SourceLocation(14, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(21, 2, 8),
			}),
		],
		location: new SourceLocation(22, 2, 9),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(26, 2, 13) }),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeyword.TEST,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(31, 2, 18),
			}),
		],
		location: new SourceLocation(27, 2, 14),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(32, 3, 1),
	}),
];
