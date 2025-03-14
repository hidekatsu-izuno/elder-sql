import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Identifier, "SAVEPOINT", {
		keyword: Keyword.SAVEPOINT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.Identifier, "sect1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(9, 1, 9),
			}),
		],
		location: new SourceLocation(10, 1, 10),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(16, 1, 16),
			}),
		],
		location: new SourceLocation(15, 1, 15),
	}),
	new Token(TokenType.Identifier, "SAVEPOINT", {
		keyword: Keyword.SAVEPOINT,
		location: new SourceLocation(17, 2, 1),
	}),
	new Token(TokenType.Identifier, "sect2", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(26, 2, 10),
			}),
		],
		location: new SourceLocation(27, 2, 11),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(32, 2, 16),
	}),
];
