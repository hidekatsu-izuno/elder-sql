import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../../../src/sql.ts";

export default [
	new Token(SqlLexer.Identifier, "DETACH", {
		keyword: SqlLexer.DETACH,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlLexer.Identifier, "DATABASE", {
		keyword: SqlLexer.DATABASE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlLexer.Identifier, "mem_db", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(15, 1, 15),
			}),
		],
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(22, 1, 22),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(23, 1, 23),
			}),
		],
	}),
	new Token(SqlLexer.Identifier, "DETACH", {
		keyword: SqlLexer.DETACH,
		location: new SourceLocation(24, 2, 1),
	}),
	new Token(SqlLexer.Identifier, "new_db", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(30, 2, 7),
			}),
		],
		location: new SourceLocation(31, 2, 8),
	}),
	new Token(SqlLexer.EoF, "", { location: new SourceLocation(37, 2, 14) }),
];
