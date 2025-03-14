import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Identifier, "VACUUM", {
		keyword: Keyword.VACUUM,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(7, 1, 7),
			}),
		],
		location: new SourceLocation(6, 1, 6),
	}),
	new Token(TokenType.Identifier, "VACUUM", {
		keyword: Keyword.VACUUM,
		location: new SourceLocation(8, 2, 1),
	}),
	new Token(TokenType.Identifier, "main", {
		keyword: Keyword.MAIN,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(14, 2, 7),
			}),
		],
		location: new SourceLocation(15, 2, 8),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(20, 2, 13),
			}),
		],
		location: new SourceLocation(19, 2, 12),
	}),
	new Token(TokenType.Identifier, "VACUUM", {
		keyword: Keyword.VACUUM,
		location: new SourceLocation(21, 3, 1),
	}),
	new Token(TokenType.Identifier, "main", {
		keyword: Keyword.MAIN,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(27, 3, 7),
			}),
		],
		location: new SourceLocation(28, 3, 8),
	}),
	new Token(TokenType.Reserved, "INTO", {
		keyword: Keyword.INTO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(32, 3, 12),
			}),
		],
		location: new SourceLocation(33, 3, 13),
	}),
	new Token(TokenType.String, "'database.dat'", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(37, 3, 17),
			}),
		],
		location: new SourceLocation(38, 3, 18),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(53, 3, 33),
			}),
		],
		location: new SourceLocation(52, 3, 32),
	}),
	new Token(TokenType.Identifier, "VACUUM", {
		keyword: Keyword.VACUUM,
		location: new SourceLocation(54, 4, 1),
	}),
	new Token(TokenType.Reserved, "INTO", {
		keyword: Keyword.INTO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(60, 4, 7),
			}),
		],
		location: new SourceLocation(61, 4, 8),
	}),
	new Token(TokenType.Identifier, '"database.dat"', {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(65, 4, 12),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(80, 4, 27),
			}),
		],
		location: new SourceLocation(66, 4, 13),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(81, 5, 1),
	}),
];
