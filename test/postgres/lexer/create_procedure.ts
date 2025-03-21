import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.Identifier, "PROCEDURE", {
		keyword: Keyword.PROCEDURE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(TokenType.Identifier, "insert_data", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(16, 1, 16),
			}),
		],
		location: new SourceLocation(17, 1, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(28, 1, 28),
	}),
	new Token(TokenType.Identifier, "a", {
		location: new SourceLocation(29, 1, 29),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(30, 1, 30),
			}),
		],
		location: new SourceLocation(31, 1, 31),
	}),
	new Token(TokenType.Comma, ",", { location: new SourceLocation(38, 1, 38) }),
	new Token(TokenType.Identifier, "b", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(39, 1, 39),
			}),
		],
		location: new SourceLocation(40, 1, 40),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(41, 1, 41),
			}),
		],
		location: new SourceLocation(42, 1, 42),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(50, 1, 50),
			}),
		],
		location: new SourceLocation(49, 1, 49),
	}),
	new Token(TokenType.Identifier, "LANGUAGE", {
		keyword: Keyword.LANGUAGE,
		location: new SourceLocation(51, 2, 1),
	}),
	new Token(TokenType.Identifier, "SQL", {
		keyword: Keyword.SQL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(59, 2, 9),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(63, 2, 13),
			}),
		],
		location: new SourceLocation(60, 2, 10),
	}),
	new Token(TokenType.Reserved, "AS", {
		keyword: Keyword.AS,
		location: new SourceLocation(64, 3, 1),
	}),
	new Token(
		TokenType.String,
		"$$\nINSERT INTO tbl VALUES (a);\nINSERT INTO tbl VALUES (b);\n$$",
		{
			preskips: [
				new Token(TokenType.WhiteSpace, " ", {
					location: new SourceLocation(66, 3, 3),
				}),
			],
			location: new SourceLocation(67, 3, 4),
		},
	),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(129, 6, 4),
			}),
		],
		location: new SourceLocation(128, 6, 3),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(130, 7, 1),
			}),
		],
		location: new SourceLocation(131, 8, 1),
	}),
	new Token(TokenType.Identifier, "PROCEDURE", {
		keyword: Keyword.PROCEDURE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(137, 8, 7),
			}),
		],
		location: new SourceLocation(138, 8, 8),
	}),
	new Token(TokenType.Identifier, "insert_data", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(147, 8, 17),
			}),
		],
		location: new SourceLocation(148, 8, 18),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(159, 8, 29),
	}),
	new Token(TokenType.Identifier, "a", {
		location: new SourceLocation(160, 8, 30),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(161, 8, 31),
			}),
		],
		location: new SourceLocation(162, 8, 32),
	}),
	new Token(TokenType.Comma, ",", { location: new SourceLocation(169, 8, 39) }),
	new Token(TokenType.Identifier, "b", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(170, 8, 40),
			}),
		],
		location: new SourceLocation(171, 8, 41),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(172, 8, 42),
			}),
		],
		location: new SourceLocation(173, 8, 43),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(181, 8, 51),
			}),
		],
		location: new SourceLocation(180, 8, 50),
	}),
	new Token(TokenType.Identifier, "LANGUAGE", {
		keyword: Keyword.LANGUAGE,
		location: new SourceLocation(182, 9, 1),
	}),
	new Token(TokenType.Identifier, "SQL", {
		keyword: Keyword.SQL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(190, 9, 9),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(194, 9, 13),
			}),
		],
		location: new SourceLocation(191, 9, 10),
	}),
	new Token(TokenType.Identifier, "BEGIN", {
		keyword: Keyword.BEGIN,
		location: new SourceLocation(195, 10, 1),
	}),
	new Token(TokenType.Identifier, "ATOMIC", {
		keyword: Keyword.ATOMIC,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(200, 10, 6),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(207, 10, 13),
			}),
		],
		location: new SourceLocation(201, 10, 7),
	}),
	new Token(TokenType.Identifier, "INSERT", {
		keyword: Keyword.INSERT,
		preskips: [
			new Token(TokenType.WhiteSpace, "  ", {
				location: new SourceLocation(208, 11, 1),
			}),
		],
		location: new SourceLocation(210, 11, 3),
	}),
	new Token(TokenType.Reserved, "INTO", {
		keyword: Keyword.INTO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(216, 11, 9),
			}),
		],
		location: new SourceLocation(217, 11, 10),
	}),
	new Token(TokenType.Identifier, "tbl", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(221, 11, 14),
			}),
		],
		location: new SourceLocation(222, 11, 15),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(225, 11, 18),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(232, 11, 25),
			}),
		],
		location: new SourceLocation(226, 11, 19),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(233, 11, 26),
	}),
	new Token(TokenType.Identifier, "a", {
		location: new SourceLocation(234, 11, 27),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(235, 11, 28),
	}),
	new Token(TokenType.SemiColon, ";", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(237, 11, 30),
			}),
		],
		location: new SourceLocation(236, 11, 29),
	}),
	new Token(TokenType.Identifier, "INSERT", {
		keyword: Keyword.INSERT,
		preskips: [
			new Token(TokenType.WhiteSpace, "  ", {
				location: new SourceLocation(238, 12, 1),
			}),
		],
		location: new SourceLocation(240, 12, 3),
	}),
	new Token(TokenType.Reserved, "INTO", {
		keyword: Keyword.INTO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(246, 12, 9),
			}),
		],
		location: new SourceLocation(247, 12, 10),
	}),
	new Token(TokenType.Identifier, "tbl", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(251, 12, 14),
			}),
		],
		location: new SourceLocation(252, 12, 15),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(255, 12, 18),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(262, 12, 25),
			}),
		],
		location: new SourceLocation(256, 12, 19),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(263, 12, 26),
	}),
	new Token(TokenType.Identifier, "b", {
		location: new SourceLocation(264, 12, 27),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(265, 12, 28),
	}),
	new Token(TokenType.SemiColon, ";", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(267, 12, 30),
			}),
		],
		location: new SourceLocation(266, 12, 29),
	}),
	new Token(TokenType.Reserved, "END", {
		keyword: Keyword.END,
		location: new SourceLocation(268, 13, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		location: new SourceLocation(271, 13, 4),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(272, 13, 5),
	}),
];
