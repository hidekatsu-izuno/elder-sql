import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeywords, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(11, 1, 11),
			}),
		],
		location: new SourceLocation(12, 1, 12),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(18, 1, 18),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(25, 1, 25),
			}),
		],
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(26, 1, 26),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(27, 1, 27),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(28, 1, 28),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(30, 1, 30),
			}),
		],
		location: new SourceLocation(29, 1, 29),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(31, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(37, 2, 7),
			}),
		],
		location: new SourceLocation(38, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(42, 2, 12),
			}),
		],
		location: new SourceLocation(43, 2, 13),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(47, 2, 17) }),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(48, 2, 18),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(54, 2, 24),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(61, 2, 31),
			}),
		],
		location: new SourceLocation(55, 2, 25),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(62, 2, 32),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(63, 2, 33),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(64, 2, 34),
	}),
	new Token(SqlTokenType.String, "'2'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(65, 2, 35),
			}),
		],
		location: new SourceLocation(66, 2, 36),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(69, 2, 39),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(70, 2, 40),
			}),
		],
		location: new SourceLocation(71, 2, 41),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(75, 2, 45),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(77, 2, 47),
			}),
		],
		location: new SourceLocation(76, 2, 46),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(78, 3, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeywords.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(84, 3, 7),
			}),
		],
		location: new SourceLocation(85, 3, 8),
	}),
	new Token(SqlTokenType.Identifier, "ABORT", {
		keyword: SqlKeywords.ABORT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(87, 3, 10),
			}),
		],
		location: new SourceLocation(88, 3, 11),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(93, 3, 16),
			}),
		],
		location: new SourceLocation(94, 3, 17),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(98, 3, 21),
			}),
		],
		location: new SourceLocation(99, 3, 22),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(103, 3, 26),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(110, 3, 33),
			}),
		],
		location: new SourceLocation(104, 3, 27),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(111, 3, 34),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(112, 3, 35),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(113, 3, 36),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(114, 3, 37),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(121, 3, 44),
			}),
		],
		location: new SourceLocation(115, 3, 38),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(122, 3, 45),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(123, 3, 46),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(124, 3, 47),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(126, 3, 49),
			}),
		],
		location: new SourceLocation(125, 3, 48),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(127, 4, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeywords.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(133, 4, 7),
			}),
		],
		location: new SourceLocation(134, 4, 8),
	}),
	new Token(SqlTokenType.Identifier, "FAIL", {
		keyword: SqlKeywords.FAIL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(136, 4, 10),
			}),
		],
		location: new SourceLocation(137, 4, 11),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(141, 4, 15),
			}),
		],
		location: new SourceLocation(142, 4, 16),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(146, 4, 20),
			}),
		],
		location: new SourceLocation(147, 4, 21),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(153, 4, 27),
			}),
		],
		location: new SourceLocation(154, 4, 28),
	}),
	new Token(SqlTokenType.Identifier, "sample2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(156, 4, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(164, 4, 38),
			}),
		],
		location: new SourceLocation(157, 4, 31),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(165, 4, 39),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(166, 4, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(167, 4, 41),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(168, 4, 42),
			}),
		],
		location: new SourceLocation(169, 4, 43),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(170, 4, 44),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(171, 4, 45),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(178, 4, 52),
			}),
		],
		location: new SourceLocation(172, 4, 46),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(179, 4, 53),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(180, 4, 54),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(181, 4, 55),
	}),
	new Token(SqlTokenType.Identifier, '"2"', {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(182, 4, 56),
			}),
		],
		location: new SourceLocation(183, 4, 57),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(186, 4, 60),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(188, 4, 62),
			}),
		],
		location: new SourceLocation(187, 4, 61),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(189, 5, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeywords.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(195, 5, 7),
			}),
		],
		location: new SourceLocation(196, 5, 8),
	}),
	new Token(SqlTokenType.Identifier, "IGNORE", {
		keyword: SqlKeywords.IGNORE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(198, 5, 10),
			}),
		],
		location: new SourceLocation(199, 5, 11),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(205, 5, 17),
			}),
		],
		location: new SourceLocation(206, 5, 18),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(210, 5, 22),
			}),
		],
		location: new SourceLocation(211, 5, 23),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(215, 5, 27),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(216, 5, 28),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(222, 5, 34),
			}),
		],
		location: new SourceLocation(223, 5, 35),
	}),
	new Token(SqlTokenType.Identifier, "sample2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(225, 5, 37),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(233, 5, 45),
			}),
		],
		location: new SourceLocation(226, 5, 38),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(234, 5, 46),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(235, 5, 47),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(236, 5, 48),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(237, 5, 49),
			}),
		],
		location: new SourceLocation(238, 5, 50),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(239, 5, 51),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(240, 5, 52),
			}),
		],
		location: new SourceLocation(241, 5, 53),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(242, 5, 54),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(243, 5, 55),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(250, 5, 62),
			}),
		],
		location: new SourceLocation(244, 5, 56),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(251, 5, 63),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(252, 5, 64),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(253, 5, 65),
	}),
	new Token(SqlTokenType.Identifier, '"2"', {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(254, 5, 66),
			}),
		],
		location: new SourceLocation(255, 5, 67),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(258, 5, 70),
	}),
	new Token(SqlTokenType.Identifier, "TRUE", {
		keyword: SqlKeywords.TRUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(259, 5, 71),
			}),
		],
		location: new SourceLocation(260, 5, 72),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(264, 5, 76),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(266, 5, 78),
			}),
		],
		location: new SourceLocation(265, 5, 77),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(267, 5, 79),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(268, 5, 80),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(269, 5, 81),
	}),
	new Token(SqlTokenType.String, "'2'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(270, 5, 82),
			}),
		],
		location: new SourceLocation(271, 5, 83),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(274, 5, 86),
	}),
	new Token(SqlTokenType.Identifier, "FALSE", {
		keyword: SqlKeywords.FALSE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(275, 5, 87),
			}),
		],
		location: new SourceLocation(276, 5, 88),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(281, 5, 93),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(283, 5, 95),
			}),
		],
		location: new SourceLocation(282, 5, 94),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(284, 6, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeywords.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(290, 6, 7),
			}),
		],
		location: new SourceLocation(291, 6, 8),
	}),
	new Token(SqlTokenType.Identifier, "REPLACE", {
		keyword: SqlKeywords.REPLACE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(293, 6, 10),
			}),
		],
		location: new SourceLocation(294, 6, 11),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(301, 6, 18),
			}),
		],
		location: new SourceLocation(302, 6, 19),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(306, 6, 23),
			}),
		],
		location: new SourceLocation(307, 6, 24),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(313, 6, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(320, 6, 37),
			}),
		],
		location: new SourceLocation(314, 6, 31),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(321, 6, 38),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(322, 6, 39),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(323, 6, 40),
	}),
	new Token(SqlTokenType.Identifier, '"2"', {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(324, 6, 41),
			}),
		],
		location: new SourceLocation(325, 6, 42),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(328, 6, 45),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(329, 6, 46),
			}),
		],
		location: new SourceLocation(330, 6, 47),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(334, 6, 51),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(336, 6, 53),
			}),
		],
		location: new SourceLocation(335, 6, 52),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(337, 6, 54),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(338, 6, 55),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(339, 6, 56),
	}),
	new Token(SqlTokenType.String, "'2'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(340, 6, 57),
			}),
		],
		location: new SourceLocation(341, 6, 58),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(344, 6, 61),
	}),
	new Token(SqlTokenType.Identifier, "TRUE", {
		keyword: SqlKeywords.TRUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(345, 6, 62),
			}),
		],
		location: new SourceLocation(346, 6, 63),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(350, 6, 67),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(352, 6, 69),
			}),
		],
		location: new SourceLocation(351, 6, 68),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(353, 6, 70),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(354, 6, 71),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(355, 6, 72),
	}),
	new Token(SqlTokenType.Identifier, '"2"', {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(356, 6, 73),
			}),
		],
		location: new SourceLocation(357, 6, 74),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(360, 6, 77),
	}),
	new Token(SqlTokenType.Identifier, "FALSE", {
		keyword: SqlKeywords.FALSE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(361, 6, 78),
			}),
		],
		location: new SourceLocation(362, 6, 79),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(367, 6, 84),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(369, 6, 86),
			}),
		],
		location: new SourceLocation(368, 6, 85),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(370, 7, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeywords.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(376, 7, 7),
			}),
		],
		location: new SourceLocation(377, 7, 8),
	}),
	new Token(SqlTokenType.Identifier, "ROLLBACK", {
		keyword: SqlKeywords.ROLLBACK,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(379, 7, 10),
			}),
		],
		location: new SourceLocation(380, 7, 11),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(388, 7, 19),
			}),
		],
		location: new SourceLocation(389, 7, 20),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(393, 7, 24),
			}),
		],
		location: new SourceLocation(394, 7, 25),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(398, 7, 29),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(399, 7, 30),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(405, 7, 36),
			}),
		],
		location: new SourceLocation(406, 7, 37),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(412, 7, 43),
			}),
		],
		location: new SourceLocation(413, 7, 44),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(415, 7, 46),
			}),
		],
		location: new SourceLocation(414, 7, 45),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(416, 8, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(422, 8, 7),
			}),
		],
		location: new SourceLocation(423, 8, 8),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(427, 8, 12),
			}),
		],
		location: new SourceLocation(428, 8, 13),
	}),
	new Token(SqlTokenType.Reserved, "DEFAULT", {
		keyword: SqlKeywords.DEFAULT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(434, 8, 19),
			}),
		],
		location: new SourceLocation(435, 8, 20),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(442, 8, 27),
			}),
		],
		location: new SourceLocation(443, 8, 28),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(450, 8, 35),
			}),
		],
		location: new SourceLocation(449, 8, 34),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(451, 9, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(457, 9, 7),
			}),
		],
		location: new SourceLocation(458, 9, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(462, 9, 12),
			}),
		],
		location: new SourceLocation(463, 9, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(467, 9, 17),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(468, 9, 18),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(474, 9, 24),
			}),
		],
		location: new SourceLocation(475, 9, 25),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(481, 9, 31),
			}),
		],
		location: new SourceLocation(482, 9, 32),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(483, 9, 33),
			}),
		],
		location: new SourceLocation(484, 9, 34),
	}),
	new Token(SqlTokenType.Identifier, "sample2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(488, 9, 38),
			}),
		],
		location: new SourceLocation(489, 9, 39),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(497, 9, 47),
			}),
		],
		location: new SourceLocation(496, 9, 46),
	}),
	new Token(SqlTokenType.Identifier, "REPLACE", {
		keyword: SqlKeywords.REPLACE,
		location: new SourceLocation(498, 10, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(505, 10, 8),
			}),
		],
		location: new SourceLocation(506, 10, 9),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(510, 10, 13),
			}),
		],
		location: new SourceLocation(511, 10, 14),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(515, 10, 18),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(522, 10, 25),
			}),
		],
		location: new SourceLocation(516, 10, 19),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(523, 10, 26),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(524, 10, 27),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(525, 10, 28),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(526, 10, 29),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(533, 10, 36),
			}),
		],
		location: new SourceLocation(527, 10, 30),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(534, 10, 37),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(535, 10, 38),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(536, 10, 39),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(538, 10, 41),
			}),
		],
		location: new SourceLocation(537, 10, 40),
	}),
	new Token(SqlTokenType.Identifier, "WITH", {
		keyword: SqlKeywords.WITH,
		location: new SourceLocation(539, 11, 1),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(543, 11, 5),
			}),
		],
		location: new SourceLocation(544, 11, 6),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(545, 11, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(548, 11, 10),
			}),
		],
		location: new SourceLocation(546, 11, 8),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(549, 11, 11),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(550, 11, 12),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(556, 11, 18),
			}),
		],
		location: new SourceLocation(557, 11, 19),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(558, 11, 20),
			}),
		],
		location: new SourceLocation(559, 11, 21),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(561, 11, 23),
			}),
		],
		location: new SourceLocation(562, 11, 24),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(564, 11, 26),
			}),
		],
		location: new SourceLocation(563, 11, 25),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(565, 12, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(571, 12, 7),
			}),
		],
		location: new SourceLocation(572, 12, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(576, 12, 12),
			}),
		],
		location: new SourceLocation(577, 12, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(581, 12, 17),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(582, 12, 18),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(588, 12, 24),
			}),
		],
		location: new SourceLocation(589, 12, 25),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(595, 12, 31),
			}),
		],
		location: new SourceLocation(596, 12, 32),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(597, 12, 33),
			}),
		],
		location: new SourceLocation(598, 12, 34),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(602, 12, 38),
			}),
		],
		location: new SourceLocation(603, 12, 39),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(605, 12, 41),
			}),
		],
		location: new SourceLocation(604, 12, 40),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(606, 13, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(612, 13, 7),
			}),
		],
		location: new SourceLocation(613, 13, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(617, 13, 12),
			}),
		],
		location: new SourceLocation(618, 13, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(622, 13, 17),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(623, 13, 18),
	}),
	new Token(SqlTokenType.Identifier, "WITH", {
		keyword: SqlKeywords.WITH,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(629, 13, 24),
			}),
		],
		location: new SourceLocation(630, 13, 25),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(634, 13, 29),
			}),
		],
		location: new SourceLocation(635, 13, 30),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(636, 13, 31),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(639, 13, 34),
			}),
		],
		location: new SourceLocation(637, 13, 32),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(640, 13, 35),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(641, 13, 36),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(647, 13, 42),
			}),
		],
		location: new SourceLocation(648, 13, 43),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(649, 13, 44),
			}),
		],
		location: new SourceLocation(650, 13, 45),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(652, 13, 47),
			}),
		],
		location: new SourceLocation(653, 13, 48),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(654, 13, 49),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(655, 13, 50),
			}),
		],
		location: new SourceLocation(656, 13, 51),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(662, 13, 57),
			}),
		],
		location: new SourceLocation(663, 13, 58),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(664, 13, 59),
			}),
		],
		location: new SourceLocation(665, 13, 60),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(669, 13, 64),
			}),
		],
		location: new SourceLocation(670, 13, 65),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(672, 13, 67),
			}),
		],
		location: new SourceLocation(671, 13, 66),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(673, 14, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(679, 14, 7),
			}),
		],
		location: new SourceLocation(680, 14, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(684, 14, 12),
			}),
		],
		location: new SourceLocation(685, 14, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(689, 14, 17),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(690, 14, 18),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(696, 14, 24),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(703, 14, 31),
			}),
		],
		location: new SourceLocation(697, 14, 25),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(704, 14, 32),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(705, 14, 33),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(706, 14, 34),
	}),
	new Token(SqlTokenType.String, "'2'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(707, 14, 35),
			}),
		],
		location: new SourceLocation(708, 14, 36),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(711, 14, 39),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(712, 14, 40),
			}),
		],
		location: new SourceLocation(713, 14, 41),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(717, 14, 45),
	}),
	new Token(SqlTokenType.Reserved, "RETURNING", {
		keyword: SqlKeywords.RETURNING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(718, 14, 46),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(728, 14, 56),
			}),
		],
		location: new SourceLocation(719, 14, 47),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(729, 14, 57),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(731, 14, 59),
			}),
		],
		location: new SourceLocation(730, 14, 58),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(732, 15, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(738, 15, 7),
			}),
		],
		location: new SourceLocation(739, 15, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(743, 15, 12),
			}),
		],
		location: new SourceLocation(744, 15, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(748, 15, 17),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(749, 15, 18),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(755, 15, 24),
			}),
		],
		location: new SourceLocation(756, 15, 25),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(762, 15, 31),
			}),
		],
		location: new SourceLocation(763, 15, 32),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(764, 15, 33),
			}),
		],
		location: new SourceLocation(765, 15, 34),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(769, 15, 38),
			}),
		],
		location: new SourceLocation(770, 15, 39),
	}),
	new Token(SqlTokenType.Reserved, "RETURNING", {
		keyword: SqlKeywords.RETURNING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(771, 15, 40),
			}),
		],
		location: new SourceLocation(772, 15, 41),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(781, 15, 50),
			}),
		],
		location: new SourceLocation(782, 15, 51),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(783, 15, 52),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(784, 15, 53),
			}),
		],
		location: new SourceLocation(785, 15, 54),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(786, 15, 55),
			}),
		],
		location: new SourceLocation(787, 15, 56),
	}),
	new Token(SqlTokenType.Identifier, "Z", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(789, 15, 58),
			}),
		],
		location: new SourceLocation(790, 15, 59),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(792, 15, 61),
			}),
		],
		location: new SourceLocation(791, 15, 60),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		location: new SourceLocation(793, 16, 1),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(799, 16, 7),
			}),
		],
		location: new SourceLocation(800, 16, 8),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(804, 16, 12),
			}),
		],
		location: new SourceLocation(805, 16, 13),
	}),
	new Token(SqlTokenType.Reserved, "DEFAULT", {
		keyword: SqlKeywords.DEFAULT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(811, 16, 19),
			}),
		],
		location: new SourceLocation(812, 16, 20),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(819, 16, 27),
			}),
		],
		location: new SourceLocation(820, 16, 28),
	}),
	new Token(SqlTokenType.Reserved, "RETURNING", {
		keyword: SqlKeywords.RETURNING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(826, 16, 34),
			}),
		],
		location: new SourceLocation(827, 16, 35),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(836, 16, 44),
			}),
		],
		location: new SourceLocation(837, 16, 45),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(838, 16, 46),
			}),
		],
		location: new SourceLocation(839, 16, 47),
	}),
	new Token(SqlTokenType.Identifier, "Z", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(841, 16, 49),
			}),
		],
		location: new SourceLocation(842, 16, 50),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(844, 16, 52),
			}),
		],
		location: new SourceLocation(843, 16, 51),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(845, 16, 53),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(847, 16, 55),
			}),
		],
		location: new SourceLocation(846, 16, 54),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(848, 17, 1),
	}),
];
