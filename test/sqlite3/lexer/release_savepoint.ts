import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeywords, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Identifier, "RELEASE", {
		keyword: SqlKeywords.RELEASE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "sect1", {
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
				location: new SourceLocation(14, 1, 14),
			}),
		],
		location: new SourceLocation(13, 1, 13),
	}),
	new Token(SqlTokenType.Identifier, "RELEASE", {
		keyword: SqlKeywords.RELEASE,
		location: new SourceLocation(15, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "SAVEPOINT", {
		keyword: SqlKeywords.SAVEPOINT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(22, 2, 8),
			}),
		],
		location: new SourceLocation(23, 2, 9),
	}),
	new Token(SqlTokenType.Identifier, "sect1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(32, 2, 18),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(38, 2, 24),
			}),
		],
		location: new SourceLocation(33, 2, 19),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(39, 3, 1),
	}),
];
