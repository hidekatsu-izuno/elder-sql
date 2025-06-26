import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../../../src/sql.ts";

export default [
	new Token(SqlLexer.Identifier, "DROP", {
		keyword: SqlLexer.DROP,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlLexer.Reserved, "INDEX", {
		keyword: SqlLexer.INDEX,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4, 1, 4),
			}),
		],
		location: new SourceLocation(5, 1, 5),
	}),
	new Token(SqlLexer.Identifier, "i_sample", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(10, 1, 10),
			}),
		],
		location: new SourceLocation(11, 1, 11),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
	}),
	new Token(SqlLexer.Identifier, "DROP", {
		keyword: SqlLexer.DROP,
		location: new SourceLocation(21, 2, 1),
	}),
	new Token(SqlLexer.Reserved, "INDEX", {
		keyword: SqlLexer.INDEX,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(25, 2, 5),
			}),
		],
		location: new SourceLocation(26, 2, 6),
	}),
	new Token(SqlLexer.Identifier, "main", {
		keyword: SqlLexer.MAIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(31, 2, 11),
			}),
		],
		location: new SourceLocation(32, 2, 12),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(36, 2, 16) }),
	new Token(SqlLexer.Identifier, "i_sample", {
		location: new SourceLocation(37, 2, 17),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(45, 2, 25),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(46, 2, 26),
			}),
		],
	}),
	new Token(SqlLexer.Identifier, "DROP", {
		keyword: SqlLexer.DROP,
		location: new SourceLocation(47, 3, 1),
	}),
	new Token(SqlLexer.Reserved, "INDEX", {
		keyword: SqlLexer.INDEX,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(51, 3, 5),
			}),
		],
		location: new SourceLocation(52, 3, 6),
	}),
	new Token(SqlLexer.Identifier, "IF", {
		keyword: SqlLexer.IF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(57, 3, 11),
			}),
		],
		location: new SourceLocation(58, 3, 12),
	}),
	new Token(SqlLexer.Reserved, "EXISTS", {
		keyword: SqlLexer.EXISTS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(60, 3, 14),
			}),
		],
		location: new SourceLocation(61, 3, 15),
	}),
	new Token(SqlLexer.Identifier, "main", {
		keyword: SqlLexer.MAIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(67, 3, 21),
			}),
		],
		location: new SourceLocation(68, 3, 22),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(72, 3, 26) }),
	new Token(SqlLexer.Identifier, "i_sample", {
		location: new SourceLocation(73, 3, 27),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(81, 3, 35),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(82, 3, 36),
			}),
		],
	}),
	new Token(SqlLexer.EoF, "", { location: new SourceLocation(83, 4, 1) }),
];
