import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Identifier, "ATTACH", {
		keyword: SqlKeywords.ATTACH,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "DATABASE", {
		keyword: SqlKeywords.DATABASE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.String, "':memory:'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(15, 1, 15),
			}),
		],
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(26, 1, 26),
			}),
		],
		location: new SourceLocation(27, 1, 27),
	}),
	new Token(SqlTokenType.Identifier, "mem_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(29, 1, 29),
			}),
		],
		location: new SourceLocation(30, 1, 30),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(37, 1, 37),
			}),
		],
		location: new SourceLocation(36, 1, 36),
	}),
	new Token(SqlTokenType.Identifier, "ATTACH", {
		keyword: SqlKeywords.ATTACH,
		location: new SourceLocation(38, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "DATABASE", {
		keyword: SqlKeywords.DATABASE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(44, 2, 7),
			}),
		],
		location: new SourceLocation(45, 2, 8),
	}),
	new Token(SqlTokenType.String, "'new_database.db'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(53, 2, 16),
			}),
		],
		location: new SourceLocation(54, 2, 17),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(71, 2, 34),
			}),
		],
		location: new SourceLocation(72, 2, 35),
	}),
	new Token(SqlTokenType.Identifier, "new_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(74, 2, 37),
			}),
		],
		location: new SourceLocation(75, 2, 38),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(82, 2, 45),
			}),
		],
		location: new SourceLocation(81, 2, 44),
	}),
	new Token(SqlTokenType.Identifier, "ATTACH", {
		keyword: SqlKeywords.ATTACH,
		location: new SourceLocation(83, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "DATABASE", {
		keyword: SqlKeywords.DATABASE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(89, 3, 7),
			}),
		],
		location: new SourceLocation(90, 3, 8),
	}),
	new Token(SqlTokenType.Identifier, "CONCAT", {
		keyword: SqlKeywords.CONCAT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(98, 3, 16),
			}),
		],
		location: new SourceLocation(99, 3, 17),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(105, 3, 23),
	}),
	new Token(SqlTokenType.String, "'new_database'", {
		location: new SourceLocation(106, 3, 24),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(120, 3, 38),
	}),
	new Token(SqlTokenType.String, "'.db'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(121, 3, 39),
			}),
		],
		location: new SourceLocation(122, 3, 40),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(127, 3, 45),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(128, 3, 46),
			}),
		],
		location: new SourceLocation(129, 3, 47),
	}),
	new Token(SqlTokenType.Identifier, "new_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(131, 3, 49),
			}),
		],
		location: new SourceLocation(132, 3, 50),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(139, 3, 57),
			}),
		],
		location: new SourceLocation(138, 3, 56),
	}),
	new Token(SqlTokenType.Identifier, "ATTACH", {
		keyword: SqlKeywords.ATTACH,
		location: new SourceLocation(140, 4, 1),
	}),
	new Token(SqlTokenType.Identifier, "DATABASE", {
		keyword: SqlKeywords.DATABASE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(146, 4, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(155, 4, 16),
			}),
		],
		location: new SourceLocation(147, 4, 8),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(156, 4, 17),
	}),
	new Token(SqlTokenType.String, "'database_'", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(168, 4, 29),
			}),
		],
		location: new SourceLocation(157, 4, 18),
	}),
	new Token(SqlTokenType.Operator, "||", {
		location: new SourceLocation(169, 4, 30),
	}),
	new Token(SqlTokenType.Identifier, "strftime", {
		keyword: SqlKeywords.STRFTIME,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(171, 4, 32),
			}),
		],
		location: new SourceLocation(172, 4, 33),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(180, 4, 41),
	}),
	new Token(SqlTokenType.String, "'%Y%m%d'", {
		location: new SourceLocation(181, 4, 42),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(189, 4, 50),
	}),
	new Token(SqlTokenType.String, "'now'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(190, 4, 51),
			}),
		],
		location: new SourceLocation(191, 4, 52),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(197, 4, 58),
			}),
		],
		location: new SourceLocation(196, 4, 57),
	}),
	new Token(SqlTokenType.Operator, "||", {
		location: new SourceLocation(198, 4, 59),
	}),
	new Token(SqlTokenType.String, "'.db'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(200, 4, 61),
			}),
		],
		location: new SourceLocation(201, 4, 62),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(206, 4, 67),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(207, 4, 68),
			}),
		],
		location: new SourceLocation(208, 4, 69),
	}),
	new Token(SqlTokenType.Identifier, "new_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(210, 4, 71),
			}),
		],
		location: new SourceLocation(211, 4, 72),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(218, 4, 79),
			}),
		],
		location: new SourceLocation(217, 4, 78),
	}),
	new Token(SqlTokenType.Identifier, "ATTACH", {
		keyword: SqlKeywords.ATTACH,
		location: new SourceLocation(219, 5, 1),
	}),
	new Token(SqlTokenType.String, "'new_database.db'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(225, 5, 7),
			}),
		],
		location: new SourceLocation(226, 5, 8),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(243, 5, 25),
			}),
		],
		location: new SourceLocation(244, 5, 26),
	}),
	new Token(SqlTokenType.Identifier, "new_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(246, 5, 28),
			}),
		],
		location: new SourceLocation(247, 5, 29),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(254, 5, 36),
			}),
		],
		location: new SourceLocation(253, 5, 35),
	}),
	new Token(SqlTokenType.Identifier, "ATTACH", {
		keyword: SqlKeywords.ATTACH,
		location: new SourceLocation(255, 6, 1),
	}),
	new Token(SqlTokenType.String, "'database_'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(261, 6, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(273, 6, 19),
			}),
		],
		location: new SourceLocation(262, 6, 8),
	}),
	new Token(SqlTokenType.Operator, "||", {
		location: new SourceLocation(274, 6, 20),
	}),
	new Token(SqlTokenType.String, "'.db'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(276, 6, 22),
			}),
		],
		location: new SourceLocation(277, 6, 23),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(282, 6, 28),
			}),
		],
		location: new SourceLocation(283, 6, 29),
	}),
	new Token(SqlTokenType.Identifier, "new_db", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(285, 6, 31),
			}),
		],
		location: new SourceLocation(286, 6, 32),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(293, 6, 39),
			}),
		],
		location: new SourceLocation(292, 6, 38),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(294, 7, 1),
	}),
];
