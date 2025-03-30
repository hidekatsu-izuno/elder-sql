import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeyword, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Identifier, "DROP", {
		keyword: SqlKeyword.DROP,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeyword.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4, 1, 4),
			}),
		],
		location: new SourceLocation(5, 1, 5),
	}),
	new Token(SqlTokenType.Identifier, "v_sample", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(9, 1, 9),
			}),
		],
		location: new SourceLocation(10, 1, 10),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(19, 1, 19),
			}),
		],
		location: new SourceLocation(18, 1, 18),
	}),
	new Token(SqlTokenType.Identifier, "DROP", {
		keyword: SqlKeyword.DROP,
		location: new SourceLocation(20, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeyword.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(24, 2, 5),
			}),
		],
		location: new SourceLocation(25, 2, 6),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(29, 2, 10),
			}),
		],
		location: new SourceLocation(30, 2, 11),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(34, 2, 15) }),
	new Token(SqlTokenType.Identifier, "v_sample", {
		location: new SourceLocation(35, 2, 16),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(44, 2, 25),
			}),
		],
		location: new SourceLocation(43, 2, 24),
	}),
	new Token(SqlTokenType.Identifier, "DROP", {
		keyword: SqlKeyword.DROP,
		location: new SourceLocation(45, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeyword.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(49, 3, 5),
			}),
		],
		location: new SourceLocation(50, 3, 6),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeyword.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(54, 3, 10),
			}),
		],
		location: new SourceLocation(55, 3, 11),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeyword.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(57, 3, 13),
			}),
		],
		location: new SourceLocation(58, 3, 14),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(64, 3, 20),
			}),
		],
		location: new SourceLocation(65, 3, 21),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(69, 3, 25) }),
	new Token(SqlTokenType.Identifier, "v_sample", {
		location: new SourceLocation(70, 3, 26),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		location: new SourceLocation(78, 3, 34),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(79, 3, 35),
	}),
];
