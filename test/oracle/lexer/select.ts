import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeywords, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(8, 1, 8),
			}),
		],
		location: new SourceLocation(9, 1, 9),
	}),
	new Token(SqlTokenType.Identifier, "DUAL", {
		keyword: SqlKeywords.DUAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(13, 1, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(18, 1, 18),
			}),
		],
		location: new SourceLocation(14, 1, 14),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(19, 2, 1),
	}),
];
