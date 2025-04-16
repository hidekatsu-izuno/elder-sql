import { SourceLocation, Token } from "../../../src/lexer.ts";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Identifier, "DROP", {
		keyword: SqlKeywords.DROP,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4, 1, 4),
			}),
		],
		location: new SourceLocation(5, 1, 5),
	}),
	new Token(SqlTokenType.Identifier, "i_sample", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(10, 1, 10),
			}),
		],
		location: new SourceLocation(11, 1, 11),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(SqlTokenType.Identifier, "DROP", {
		keyword: SqlKeywords.DROP,
		location: new SourceLocation(21, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(25, 2, 5),
			}),
		],
		location: new SourceLocation(26, 2, 6),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(31, 2, 11),
			}),
		],
		location: new SourceLocation(32, 2, 12),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(36, 2, 16) }),
	new Token(SqlTokenType.Identifier, "i_sample", {
		location: new SourceLocation(37, 2, 17),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(46, 2, 26),
			}),
		],
		location: new SourceLocation(45, 2, 25),
	}),
	new Token(SqlTokenType.Identifier, "DROP", {
		keyword: SqlKeywords.DROP,
		location: new SourceLocation(47, 3, 1),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(51, 3, 5),
			}),
		],
		location: new SourceLocation(52, 3, 6),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeywords.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(57, 3, 11),
			}),
		],
		location: new SourceLocation(58, 3, 12),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeywords.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(60, 3, 14),
			}),
		],
		location: new SourceLocation(61, 3, 15),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(67, 3, 21),
			}),
		],
		location: new SourceLocation(68, 3, 22),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(72, 3, 26) }),
	new Token(SqlTokenType.Identifier, "i_sample", {
		location: new SourceLocation(73, 3, 27),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(82, 3, 36),
			}),
		],
		location: new SourceLocation(81, 3, 35),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(83, 4, 1),
	}),
];
