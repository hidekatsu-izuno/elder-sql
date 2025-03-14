import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Reserved, "SELECT", {
		keyword: Keyword.SELECT,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.Reserved, "UPDATE", {
		keyword: Keyword.UPDATE,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(13, 2, 7),
			}),
		],
		location: new SourceLocation(7, 2, 1),
	}),
	new Token(TokenType.Reserved, "select", {
		keyword: Keyword.SELECT,
		location: new SourceLocation(14, 3, 1),
	}),
	new Token(TokenType.Numeric, "1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(20, 3, 7),
			}),
		],
		location: new SourceLocation(21, 3, 8),
	}),
	new Token(TokenType.Numeric, "2", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(22, 3, 9),
			}),
		],
		location: new SourceLocation(23, 3, 10),
	}),
	new Token(TokenType.Numeric, "3", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(24, 3, 11),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(26, 3, 13),
			}),
		],
		location: new SourceLocation(25, 3, 12),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		location: new SourceLocation(27, 4, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(33, 4, 7),
			}),
		],
		location: new SourceLocation(34, 4, 8),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(40, 4, 14),
			}),
		],
		location: new SourceLocation(39, 4, 13),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(41, 5, 1),
			}),
		],
		location: new SourceLocation(42, 6, 1),
	}),
	new Token(TokenType.BindVariable, "@aaa", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(48, 6, 7),
			}),
		],
		location: new SourceLocation(49, 6, 8),
	}),
	new Token(TokenType.Error, "@", { location: new SourceLocation(53, 6, 12) }),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(54, 6, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(59, 6, 18),
			}),
		],
		location: new SourceLocation(55, 6, 14),
	}),
	new Token(TokenType.Error, "#", { location: new SourceLocation(60, 6, 19) }),
	new Token(TokenType.Error, "#", { location: new SourceLocation(61, 6, 20) }),
	new Token(TokenType.Error, "#", { location: new SourceLocation(62, 6, 21) }),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(64, 6, 23),
			}),
		],
		location: new SourceLocation(63, 6, 22),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(65, 7, 1),
	}),
];
