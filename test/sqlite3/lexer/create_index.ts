import { SourceLocation, Token } from "../../../src/lexer.ts";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(12, 1, 12),
			}),
		],
		location: new SourceLocation(13, 1, 13),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(22, 1, 22),
			}),
		],
		location: new SourceLocation(23, 1, 23),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(25, 1, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(32, 1, 32),
			}),
		],
		location: new SourceLocation(26, 1, 26),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(33, 1, 33),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(34, 1, 34),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(35, 1, 35),
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
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(38, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(44, 2, 7),
			}),
		],
		location: new SourceLocation(45, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(50, 2, 13),
			}),
		],
		location: new SourceLocation(51, 2, 14),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(55, 2, 18) }),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		location: new SourceLocation(56, 2, 19),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(65, 2, 28),
			}),
		],
		location: new SourceLocation(66, 2, 29),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(68, 2, 31),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(75, 2, 38),
			}),
		],
		location: new SourceLocation(69, 2, 32),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(76, 2, 39),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(77, 2, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(78, 2, 41),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(79, 2, 42),
			}),
		],
		location: new SourceLocation(80, 2, 43),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(81, 2, 44),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(82, 2, 45),
			}),
		],
		location: new SourceLocation(83, 2, 46),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(84, 2, 47),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(86, 2, 49),
			}),
		],
		location: new SourceLocation(85, 2, 48),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(87, 3, 1),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(93, 3, 7),
			}),
		],
		location: new SourceLocation(94, 3, 8),
	}),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(99, 3, 13),
			}),
		],
		location: new SourceLocation(100, 3, 14),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(109, 3, 23),
			}),
		],
		location: new SourceLocation(110, 3, 24),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(112, 3, 26),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(119, 3, 33),
			}),
		],
		location: new SourceLocation(113, 3, 27),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(120, 3, 34),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(121, 3, 35),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(122, 3, 36),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(123, 3, 37),
			}),
		],
		location: new SourceLocation(124, 3, 38),
	}),
	new Token(SqlTokenType.Identifier, "ASC", {
		keyword: SqlKeywords.ASC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(125, 3, 39),
			}),
		],
		location: new SourceLocation(126, 3, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(129, 3, 43),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(130, 3, 44),
			}),
		],
		location: new SourceLocation(131, 3, 45),
	}),
	new Token(SqlTokenType.Identifier, "DESC", {
		keyword: SqlKeywords.DESC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(132, 3, 46),
			}),
		],
		location: new SourceLocation(133, 3, 47),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(137, 3, 51),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(139, 3, 53),
			}),
		],
		location: new SourceLocation(138, 3, 52),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(140, 4, 1),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(146, 4, 7),
			}),
		],
		location: new SourceLocation(147, 4, 8),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeywords.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(152, 4, 13),
			}),
		],
		location: new SourceLocation(153, 4, 14),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(155, 4, 16),
			}),
		],
		location: new SourceLocation(156, 4, 17),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeywords.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(159, 4, 20),
			}),
		],
		location: new SourceLocation(160, 4, 21),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(166, 4, 27),
			}),
		],
		location: new SourceLocation(167, 4, 28),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(171, 4, 32),
	}),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		location: new SourceLocation(172, 4, 33),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(181, 4, 42),
			}),
		],
		location: new SourceLocation(182, 4, 43),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(184, 4, 45),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(191, 4, 52),
			}),
		],
		location: new SourceLocation(185, 4, 46),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(192, 4, 53),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(194, 4, 55),
			}),
		],
		location: new SourceLocation(193, 4, 54),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(195, 4, 56),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(196, 4, 57),
			}),
		],
		location: new SourceLocation(197, 4, 58),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(198, 4, 59),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(199, 4, 60),
			}),
		],
		location: new SourceLocation(200, 4, 61),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(205, 4, 66),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(207, 4, 68),
			}),
		],
		location: new SourceLocation(206, 4, 67),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(208, 4, 69),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(209, 4, 70),
			}),
		],
		location: new SourceLocation(210, 4, 71),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(212, 4, 73),
			}),
		],
		location: new SourceLocation(211, 4, 72),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(213, 5, 1),
	}),
	new Token(SqlTokenType.Reserved, "UNIQUE", {
		keyword: SqlKeywords.UNIQUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(219, 5, 7),
			}),
		],
		location: new SourceLocation(220, 5, 8),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(226, 5, 14),
			}),
		],
		location: new SourceLocation(227, 5, 15),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(232, 5, 20),
			}),
		],
		location: new SourceLocation(233, 5, 21),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(237, 5, 25),
	}),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		location: new SourceLocation(238, 5, 26),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(247, 5, 35),
			}),
		],
		location: new SourceLocation(248, 5, 36),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(250, 5, 38),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(257, 5, 45),
			}),
		],
		location: new SourceLocation(251, 5, 39),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(258, 5, 46),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(260, 5, 48),
			}),
		],
		location: new SourceLocation(259, 5, 47),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(261, 5, 49),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(262, 5, 50),
			}),
		],
		location: new SourceLocation(263, 5, 51),
	}),
	new Token(SqlTokenType.Identifier, "ASC", {
		keyword: SqlKeywords.ASC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(264, 5, 52),
			}),
		],
		location: new SourceLocation(265, 5, 53),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(268, 5, 56),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(269, 5, 57),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(271, 5, 59),
			}),
		],
		location: new SourceLocation(270, 5, 58),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(272, 5, 60),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(273, 5, 61),
			}),
		],
		location: new SourceLocation(274, 5, 62),
	}),
	new Token(SqlTokenType.Identifier, "DESC", {
		keyword: SqlKeywords.DESC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(275, 5, 63),
			}),
		],
		location: new SourceLocation(276, 5, 64),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(280, 5, 68),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(281, 5, 69),
			}),
		],
		location: new SourceLocation(282, 5, 70),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(283, 5, 71),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(285, 5, 73),
			}),
		],
		location: new SourceLocation(284, 5, 72),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(286, 6, 1),
	}),
	new Token(SqlTokenType.Reserved, "UNIQUE", {
		keyword: SqlKeywords.UNIQUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(292, 6, 7),
			}),
		],
		location: new SourceLocation(293, 6, 8),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(299, 6, 14),
			}),
		],
		location: new SourceLocation(300, 6, 15),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeywords.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(305, 6, 20),
			}),
		],
		location: new SourceLocation(306, 6, 21),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(308, 6, 23),
			}),
		],
		location: new SourceLocation(309, 6, 24),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeywords.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(312, 6, 27),
			}),
		],
		location: new SourceLocation(313, 6, 28),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(319, 6, 34),
			}),
		],
		location: new SourceLocation(320, 6, 35),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(324, 6, 39),
	}),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		location: new SourceLocation(325, 6, 40),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(334, 6, 49),
			}),
		],
		location: new SourceLocation(335, 6, 50),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(337, 6, 52),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(344, 6, 59),
			}),
		],
		location: new SourceLocation(338, 6, 53),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(345, 6, 60),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(346, 6, 61),
	}),
	new Token(SqlTokenType.Reserved, "COLLATE", {
		keyword: SqlKeywords.COLLATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(347, 6, 62),
			}),
		],
		location: new SourceLocation(348, 6, 63),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeywords.TEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(355, 6, 70),
			}),
		],
		location: new SourceLocation(356, 6, 71),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(360, 6, 75),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(361, 6, 76),
			}),
		],
		location: new SourceLocation(362, 6, 77),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(367, 6, 82),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(369, 6, 84),
			}),
		],
		location: new SourceLocation(368, 6, 83),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(370, 6, 85),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(371, 6, 86),
			}),
		],
		location: new SourceLocation(372, 6, 87),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(374, 6, 89),
			}),
		],
		location: new SourceLocation(373, 6, 88),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(375, 7, 1),
	}),
	new Token(SqlTokenType.Reserved, "UNIQUE", {
		keyword: SqlKeywords.UNIQUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(381, 7, 7),
			}),
		],
		location: new SourceLocation(382, 7, 8),
	}),
	new Token(SqlTokenType.Reserved, "INDEX", {
		keyword: SqlKeywords.INDEX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(388, 7, 14),
			}),
		],
		location: new SourceLocation(389, 7, 15),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeywords.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(394, 7, 20),
			}),
		],
		location: new SourceLocation(395, 7, 21),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(397, 7, 23),
			}),
		],
		location: new SourceLocation(398, 7, 24),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeywords.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(401, 7, 27),
			}),
		],
		location: new SourceLocation(402, 7, 28),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(408, 7, 34),
			}),
		],
		location: new SourceLocation(409, 7, 35),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(413, 7, 39),
	}),
	new Token(SqlTokenType.Identifier, "ix_sample", {
		location: new SourceLocation(414, 7, 40),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(423, 7, 49),
			}),
		],
		location: new SourceLocation(424, 7, 50),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(426, 7, 52),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(433, 7, 59),
			}),
		],
		location: new SourceLocation(427, 7, 53),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(434, 7, 60),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(436, 7, 62),
			}),
		],
		location: new SourceLocation(435, 7, 61),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(437, 7, 63),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(438, 7, 64),
			}),
		],
		location: new SourceLocation(439, 7, 65),
	}),
	new Token(SqlTokenType.Reserved, "COLLATE", {
		keyword: SqlKeywords.COLLATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(440, 7, 66),
			}),
		],
		location: new SourceLocation(441, 7, 67),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeywords.TEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(448, 7, 74),
			}),
		],
		location: new SourceLocation(449, 7, 75),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(453, 7, 79),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(454, 7, 80),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(456, 7, 82),
			}),
		],
		location: new SourceLocation(455, 7, 81),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(457, 7, 83),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(458, 7, 84),
			}),
		],
		location: new SourceLocation(459, 7, 85),
	}),
	new Token(SqlTokenType.Reserved, "COLLATE", {
		keyword: SqlKeywords.COLLATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(460, 7, 86),
			}),
		],
		location: new SourceLocation(461, 7, 87),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeywords.TEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(468, 7, 94),
			}),
		],
		location: new SourceLocation(469, 7, 95),
	}),
	new Token(SqlTokenType.Identifier, "ASC", {
		keyword: SqlKeywords.ASC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(473, 7, 99),
			}),
		],
		location: new SourceLocation(474, 7, 100),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(477, 7, 103),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(478, 7, 104),
			}),
		],
		location: new SourceLocation(479, 7, 105),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(484, 7, 110),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(486, 7, 112),
			}),
		],
		location: new SourceLocation(485, 7, 111),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(487, 7, 113),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(488, 7, 114),
			}),
		],
		location: new SourceLocation(489, 7, 115),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(490, 7, 116),
	}),
];
