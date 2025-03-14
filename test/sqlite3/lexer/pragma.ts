import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.Identifier, "analysis_limit", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(22, 1, 22),
			}),
		],
		location: new SourceLocation(21, 1, 21),
	}),
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(23, 2, 1),
	}),
	new Token(TokenType.Identifier, "analysis_limit", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(29, 2, 7),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(44, 2, 22),
			}),
		],
		location: new SourceLocation(30, 2, 8),
	}),
	new Token(TokenType.Operator, "=", {
		location: new SourceLocation(45, 2, 23),
	}),
	new Token(TokenType.Numeric, "3", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(46, 2, 24),
			}),
		],
		location: new SourceLocation(47, 2, 25),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(49, 2, 27),
			}),
		],
		location: new SourceLocation(48, 2, 26),
	}),
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(50, 3, 1),
	}),
	new Token(TokenType.Identifier, "test", {
		keyword: Keyword.TEST,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(56, 3, 7),
			}),
		],
		location: new SourceLocation(57, 3, 8),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(61, 3, 12) }),
	new Token(TokenType.Identifier, "application_id", {
		location: new SourceLocation(62, 3, 13),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(77, 3, 28),
			}),
		],
		location: new SourceLocation(76, 3, 27),
	}),
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(78, 4, 1),
	}),
	new Token(TokenType.Identifier, "test", {
		keyword: Keyword.TEST,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(84, 4, 7),
			}),
		],
		location: new SourceLocation(85, 4, 8),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(89, 4, 12) }),
	new Token(TokenType.Identifier, "application_id", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(104, 4, 27),
			}),
		],
		location: new SourceLocation(90, 4, 13),
	}),
	new Token(TokenType.Operator, "=", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(106, 4, 29),
			}),
		],
		location: new SourceLocation(105, 4, 28),
	}),
	new Token(TokenType.Operator, "-", {
		location: new SourceLocation(107, 4, 30),
	}),
	new Token(TokenType.Numeric, "3", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(109, 4, 32),
			}),
		],
		location: new SourceLocation(108, 4, 31),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(111, 4, 34),
			}),
		],
		location: new SourceLocation(110, 4, 33),
	}),
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(112, 5, 1),
	}),
	new Token(TokenType.Identifier, "Test", {
		keyword: Keyword.TEST,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(118, 5, 7),
			}),
		],
		location: new SourceLocation(119, 5, 8),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(123, 5, 12) }),
	new Token(TokenType.Identifier, "auto_vacuum", {
		location: new SourceLocation(124, 5, 13),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(136, 5, 25),
			}),
		],
		location: new SourceLocation(135, 5, 24),
	}),
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(137, 6, 1),
	}),
	new Token(TokenType.Identifier, "Test", {
		keyword: Keyword.TEST,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(143, 6, 7),
			}),
		],
		location: new SourceLocation(144, 6, 8),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(148, 6, 12) }),
	new Token(TokenType.Identifier, "auto_vacuum", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(160, 6, 24),
			}),
		],
		location: new SourceLocation(149, 6, 13),
	}),
	new Token(TokenType.Operator, "=", {
		location: new SourceLocation(161, 6, 25),
	}),
	new Token(TokenType.Identifier, "NONE", {
		keyword: Keyword.NONE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(162, 6, 26),
			}),
		],
		location: new SourceLocation(163, 6, 27),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(168, 6, 32),
			}),
		],
		location: new SourceLocation(167, 6, 31),
	}),
	new Token(TokenType.Identifier, "pragma", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(169, 7, 1),
	}),
	new Token(TokenType.Identifier, "automatic_index", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(175, 7, 7),
			}),
		],
		location: new SourceLocation(176, 7, 8),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(192, 7, 24),
			}),
		],
		location: new SourceLocation(191, 7, 23),
	}),
	new Token(TokenType.Identifier, "pragma", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(193, 8, 1),
	}),
	new Token(TokenType.Identifier, "automatic_index", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(199, 8, 7),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(215, 8, 23),
			}),
		],
		location: new SourceLocation(200, 8, 8),
	}),
	new Token(TokenType.Operator, "=", {
		location: new SourceLocation(216, 8, 24),
	}),
	new Token(TokenType.Identifier, "true", {
		keyword: Keyword.TRUE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(217, 8, 25),
			}),
		],
		location: new SourceLocation(218, 8, 26),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(223, 8, 31),
			}),
		],
		location: new SourceLocation(222, 8, 30),
	}),
	new Token(TokenType.Identifier, "PRAGMA", {
		keyword: Keyword.PRAGMA,
		location: new SourceLocation(224, 9, 1),
	}),
	new Token(TokenType.Identifier, "test", {
		keyword: Keyword.TEST,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(230, 9, 7),
			}),
		],
		location: new SourceLocation(231, 9, 8),
	}),
	new Token(TokenType.Dot, ".", { location: new SourceLocation(235, 9, 12) }),
	new Token(TokenType.Identifier, "index_info", {
		location: new SourceLocation(236, 9, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(246, 9, 23),
	}),
	new Token(TokenType.String, "'test.pk_test'", {
		location: new SourceLocation(247, 9, 24),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(261, 9, 38),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(263, 9, 40),
			}),
		],
		location: new SourceLocation(262, 9, 39),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(264, 10, 1),
	}),
];
