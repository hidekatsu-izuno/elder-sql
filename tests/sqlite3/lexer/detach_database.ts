import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Identifier, "DETACH", {
		keyword: SqlKeywords.DETACH,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "DATABASE", {
		keyword: SqlKeywords.DATABASE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "mem_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(15, 1, 15),
			}),
		],
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(23, 1, 23),
			}),
		],
		location: new SourceLocation(22, 1, 22),
	}),
	new Token(SqlTokenType.Identifier, "DETACH", {
		keyword: SqlKeywords.DETACH,
		location: new SourceLocation(24, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "new_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(30, 2, 7),
			}),
		],
		location: new SourceLocation(31, 2, 8),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(37, 2, 14),
	}),
];
