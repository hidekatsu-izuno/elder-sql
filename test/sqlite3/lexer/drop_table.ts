import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Identifier, "DROP", {
		keyword: Keyword.DROP,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4, 1, 4),
			}),
		],
		location: new SourceLocation(5, 1, 5),
	}),
	new Token(TokenType.Identifier, "t_sample", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(10, 1, 10),
			}),
		],
		location: new SourceLocation(11, 1, 11),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(TokenType.Identifier, "DROP", {
		keyword: Keyword.DROP,
		location: new SourceLocation(21, 2, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(25, 2, 5),
			}),
		],
		location: new SourceLocation(26, 2, 6),
	}),
	new Token(TokenType.Identifier, "main", {
		keyword: Keyword.MAIN,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(31, 2, 11),
			}),
		],
		location: new SourceLocation(32, 2, 12),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(36, 2, 16) }),
	new Token(TokenType.Identifier, "t_sample", {
		location: new SourceLocation(37, 2, 17),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(46, 2, 26),
			}),
		],
		location: new SourceLocation(45, 2, 25),
	}),
	new Token(TokenType.Identifier, "DROP", {
		keyword: Keyword.DROP,
		location: new SourceLocation(47, 3, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(51, 3, 5),
			}),
		],
		location: new SourceLocation(52, 3, 6),
	}),
	new Token(TokenType.Identifier, "IF", {
		keyword: Keyword.IF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(57, 3, 11),
			}),
		],
		location: new SourceLocation(58, 3, 12),
	}),
	new Token(TokenType.Reserved, "EXISTS", {
		keyword: Keyword.EXISTS,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(60, 3, 14),
			}),
		],
		location: new SourceLocation(61, 3, 15),
	}),
	new Token(TokenType.Identifier, "main", {
		keyword: Keyword.MAIN,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(67, 3, 21),
			}),
		],
		location: new SourceLocation(68, 3, 22),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(72, 3, 26) }),
	new Token(TokenType.Identifier, "t_sample", {
		location: new SourceLocation(73, 3, 27),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		location: new SourceLocation(81, 3, 35),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(82, 3, 36),
	}),
];
