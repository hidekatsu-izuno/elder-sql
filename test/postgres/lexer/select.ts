import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeywords, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "f", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(8, 1, 8) }),
	new Token(SqlTokenType.Identifier, "title", {
		location: new SourceLocation(9, 1, 9),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(14, 1, 14),
	}),
	new Token(SqlTokenType.Identifier, "f", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(15, 1, 15),
			}),
		],
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(17, 1, 17) }),
	new Token(SqlTokenType.Identifier, "did", {
		location: new SourceLocation(18, 1, 18),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(21, 1, 21),
	}),
	new Token(SqlTokenType.Identifier, "d", {
		keyword: SqlKeywords.D,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(22, 1, 22),
			}),
		],
		location: new SourceLocation(23, 1, 23),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(24, 1, 24) }),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		location: new SourceLocation(25, 1, 25),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(29, 1, 29),
	}),
	new Token(SqlTokenType.Identifier, "f", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(30, 1, 30),
			}),
		],
		location: new SourceLocation(31, 1, 31),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(32, 1, 32) }),
	new Token(SqlTokenType.Identifier, "date_prod", {
		location: new SourceLocation(33, 1, 33),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(42, 1, 42),
	}),
	new Token(SqlTokenType.Identifier, "f", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(43, 1, 43),
			}),
		],
		location: new SourceLocation(44, 1, 44),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(45, 1, 45) }),
	new Token(SqlTokenType.Identifier, "kind", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(50, 1, 50),
			}),
		],
		location: new SourceLocation(46, 1, 46),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(51, 2, 1),
			}),
		],
		location: new SourceLocation(55, 2, 5),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(59, 2, 9),
			}),
		],
		location: new SourceLocation(60, 2, 10),
	}),
	new Token(SqlTokenType.Identifier, "d", {
		keyword: SqlKeywords.D,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(72, 2, 22),
			}),
		],
		location: new SourceLocation(73, 2, 23),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(74, 2, 24),
	}),
	new Token(SqlTokenType.Identifier, "films", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(75, 2, 25),
			}),
		],
		location: new SourceLocation(76, 2, 26),
	}),
	new Token(SqlTokenType.Identifier, "f", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(81, 2, 31),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(83, 2, 33),
			}),
		],
		location: new SourceLocation(82, 2, 32),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(84, 3, 1),
			}),
		],
		location: new SourceLocation(88, 3, 5),
	}),
	new Token(SqlTokenType.Identifier, "f", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(93, 3, 10),
			}),
		],
		location: new SourceLocation(94, 3, 11),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(95, 3, 12) }),
	new Token(SqlTokenType.Identifier, "did", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(99, 3, 16),
			}),
		],
		location: new SourceLocation(96, 3, 13),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(100, 3, 17),
	}),
	new Token(SqlTokenType.Identifier, "d", {
		keyword: SqlKeywords.D,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(101, 3, 18),
			}),
		],
		location: new SourceLocation(102, 3, 19),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(103, 3, 20),
	}),
	new Token(SqlTokenType.Identifier, "did", {
		location: new SourceLocation(104, 3, 21),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(108, 3, 25),
			}),
		],
		location: new SourceLocation(107, 3, 24),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(109, 4, 1),
			}),
		],
		location: new SourceLocation(110, 5, 1),
	}),
	new Token(SqlTokenType.Identifier, "kind", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(116, 5, 7),
			}),
		],
		location: new SourceLocation(117, 5, 8),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(121, 5, 12),
	}),
	new Token(SqlTokenType.Identifier, "sum", {
		keyword: SqlKeywords.SUM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(122, 5, 13),
			}),
		],
		location: new SourceLocation(123, 5, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(126, 5, 17),
	}),
	new Token(SqlTokenType.Identifier, "len", {
		keyword: SqlKeywords.LEN,
		location: new SourceLocation(127, 5, 18),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(130, 5, 21),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(131, 5, 22),
			}),
		],
		location: new SourceLocation(132, 5, 23),
	}),
	new Token(SqlTokenType.Identifier, "total", {
		keyword: SqlKeywords.TOTAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(134, 5, 25),
			}),
		],
		location: new SourceLocation(135, 5, 26),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(140, 5, 31),
			}),
		],
		location: new SourceLocation(141, 5, 32),
	}),
	new Token(SqlTokenType.Identifier, "films", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(145, 5, 36),
			}),
		],
		location: new SourceLocation(146, 5, 37),
	}),
	new Token(SqlTokenType.Reserved, "GROUP", {
		keyword: SqlKeywords.GROUP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(151, 5, 42),
			}),
		],
		location: new SourceLocation(152, 5, 43),
	}),
	new Token(SqlTokenType.Identifier, "BY", {
		keyword: SqlKeywords.BY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(157, 5, 48),
			}),
		],
		location: new SourceLocation(158, 5, 49),
	}),
	new Token(SqlTokenType.Identifier, "kind", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(160, 5, 51),
			}),
		],
		location: new SourceLocation(161, 5, 52),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(166, 5, 57),
			}),
		],
		location: new SourceLocation(165, 5, 56),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(167, 6, 1),
			}),
		],
		location: new SourceLocation(168, 7, 1),
	}),
	new Token(SqlTokenType.Identifier, "kind", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(174, 7, 7),
			}),
		],
		location: new SourceLocation(175, 7, 8),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(179, 7, 12),
	}),
	new Token(SqlTokenType.Identifier, "sum", {
		keyword: SqlKeywords.SUM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(180, 7, 13),
			}),
		],
		location: new SourceLocation(181, 7, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(184, 7, 17),
	}),
	new Token(SqlTokenType.Identifier, "len", {
		keyword: SqlKeywords.LEN,
		location: new SourceLocation(185, 7, 18),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(188, 7, 21),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(189, 7, 22),
			}),
		],
		location: new SourceLocation(190, 7, 23),
	}),
	new Token(SqlTokenType.Identifier, "total", {
		keyword: SqlKeywords.TOTAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(192, 7, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(198, 7, 31),
			}),
		],
		location: new SourceLocation(193, 7, 26),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(199, 8, 1),
			}),
		],
		location: new SourceLocation(203, 8, 5),
	}),
	new Token(SqlTokenType.Identifier, "films", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(207, 8, 9),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(213, 8, 15),
			}),
		],
		location: new SourceLocation(208, 8, 10),
	}),
	new Token(SqlTokenType.Reserved, "GROUP", {
		keyword: SqlKeywords.GROUP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(214, 9, 1),
			}),
		],
		location: new SourceLocation(218, 9, 5),
	}),
	new Token(SqlTokenType.Identifier, "BY", {
		keyword: SqlKeywords.BY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(223, 9, 10),
			}),
		],
		location: new SourceLocation(224, 9, 11),
	}),
	new Token(SqlTokenType.Identifier, "kind", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(226, 9, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(231, 9, 18),
			}),
		],
		location: new SourceLocation(227, 9, 14),
	}),
	new Token(SqlTokenType.Reserved, "HAVING", {
		keyword: SqlKeywords.HAVING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(232, 10, 1),
			}),
		],
		location: new SourceLocation(236, 10, 5),
	}),
	new Token(SqlTokenType.Identifier, "sum", {
		keyword: SqlKeywords.SUM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(242, 10, 11),
			}),
		],
		location: new SourceLocation(243, 10, 12),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(246, 10, 15),
	}),
	new Token(SqlTokenType.Identifier, "len", {
		keyword: SqlKeywords.LEN,
		location: new SourceLocation(247, 10, 16),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(251, 10, 20),
			}),
		],
		location: new SourceLocation(250, 10, 19),
	}),
	new Token(SqlTokenType.Operator, "<", {
		location: new SourceLocation(252, 10, 21),
	}),
	new Token(SqlTokenType.Identifier, "interval", {
		keyword: SqlKeywords.INTERVAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(253, 10, 22),
			}),
		],
		location: new SourceLocation(254, 10, 23),
	}),
	new Token(SqlTokenType.String, "'5 hours'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(262, 10, 31),
			}),
		],
		location: new SourceLocation(263, 10, 32),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(273, 10, 42),
			}),
		],
		location: new SourceLocation(272, 10, 41),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(274, 11, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(281, 12, 7),
			}),
		],
		location: new SourceLocation(275, 12, 1),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(282, 12, 8),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(283, 12, 9),
			}),
		],
		location: new SourceLocation(284, 12, 10),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(288, 12, 14),
			}),
		],
		location: new SourceLocation(289, 12, 15),
	}),
	new Token(SqlTokenType.Reserved, "ORDER", {
		keyword: SqlKeywords.ORDER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(301, 12, 27),
			}),
		],
		location: new SourceLocation(302, 12, 28),
	}),
	new Token(SqlTokenType.Identifier, "BY", {
		keyword: SqlKeywords.BY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(307, 12, 33),
			}),
		],
		location: new SourceLocation(308, 12, 34),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(310, 12, 36),
			}),
		],
		location: new SourceLocation(311, 12, 37),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(316, 12, 42),
			}),
		],
		location: new SourceLocation(315, 12, 41),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(323, 13, 7),
			}),
		],
		location: new SourceLocation(317, 13, 1),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(324, 13, 8),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(325, 13, 9),
			}),
		],
		location: new SourceLocation(326, 13, 10),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(330, 13, 14),
			}),
		],
		location: new SourceLocation(331, 13, 15),
	}),
	new Token(SqlTokenType.Reserved, "ORDER", {
		keyword: SqlKeywords.ORDER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(343, 13, 27),
			}),
		],
		location: new SourceLocation(344, 13, 28),
	}),
	new Token(SqlTokenType.Identifier, "BY", {
		keyword: SqlKeywords.BY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(349, 13, 33),
			}),
		],
		location: new SourceLocation(350, 13, 34),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(352, 13, 36),
			}),
		],
		location: new SourceLocation(353, 13, 37),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(355, 13, 39),
			}),
		],
		location: new SourceLocation(354, 13, 38),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(356, 14, 1),
			}),
		],
		location: new SourceLocation(357, 15, 1),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(363, 15, 7),
			}),
		],
		location: new SourceLocation(364, 15, 8),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(376, 15, 20),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(381, 15, 25),
			}),
		],
		location: new SourceLocation(377, 15, 21),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(382, 16, 1),
			}),
		],
		location: new SourceLocation(386, 16, 5),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(390, 16, 9),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(403, 16, 22),
			}),
		],
		location: new SourceLocation(391, 16, 10),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(404, 17, 1),
			}),
		],
		location: new SourceLocation(408, 17, 5),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(413, 17, 10),
			}),
		],
		location: new SourceLocation(414, 17, 11),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(426, 17, 23),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		location: new SourceLocation(427, 17, 24),
	}),
	new Token(SqlTokenType.Identifier, "LIKE", {
		keyword: SqlKeywords.LIKE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(431, 17, 28),
			}),
		],
		location: new SourceLocation(432, 17, 29),
	}),
	new Token(SqlTokenType.String, "'W%'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(436, 17, 33),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(441, 17, 38),
			}),
		],
		location: new SourceLocation(437, 17, 34),
	}),
	new Token(SqlTokenType.Reserved, "UNION", {
		keyword: SqlKeywords.UNION,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(447, 18, 6),
			}),
		],
		location: new SourceLocation(442, 18, 1),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(448, 19, 1),
	}),
	new Token(SqlTokenType.Identifier, "actors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(454, 19, 7),
			}),
		],
		location: new SourceLocation(455, 19, 8),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(461, 19, 14),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(466, 19, 19),
			}),
		],
		location: new SourceLocation(462, 19, 15),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(467, 20, 1),
			}),
		],
		location: new SourceLocation(471, 20, 5),
	}),
	new Token(SqlTokenType.Identifier, "actors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(475, 20, 9),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(482, 20, 16),
			}),
		],
		location: new SourceLocation(476, 20, 10),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(483, 21, 1),
			}),
		],
		location: new SourceLocation(487, 21, 5),
	}),
	new Token(SqlTokenType.Identifier, "actors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(492, 21, 10),
			}),
		],
		location: new SourceLocation(493, 21, 11),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(499, 21, 17),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		location: new SourceLocation(500, 21, 18),
	}),
	new Token(SqlTokenType.Identifier, "LIKE", {
		keyword: SqlKeywords.LIKE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(504, 21, 22),
			}),
		],
		location: new SourceLocation(505, 21, 23),
	}),
	new Token(SqlTokenType.String, "'W%'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(509, 21, 27),
			}),
		],
		location: new SourceLocation(510, 21, 28),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(515, 21, 33),
			}),
		],
		location: new SourceLocation(514, 21, 32),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(516, 22, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(523, 23, 7),
			}),
		],
		location: new SourceLocation(517, 23, 1),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(524, 23, 8),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(525, 23, 9),
			}),
		],
		location: new SourceLocation(526, 23, 10),
	}),
	new Token(SqlTokenType.Identifier, "distributors", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(530, 23, 14),
			}),
		],
		location: new SourceLocation(531, 23, 15),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(543, 23, 27),
	}),
	new Token(SqlTokenType.Numeric, "111", {
		location: new SourceLocation(544, 23, 28),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(547, 23, 31),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(549, 23, 33),
			}),
		],
		location: new SourceLocation(548, 23, 32),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(550, 24, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(557, 25, 7),
			}),
		],
		location: new SourceLocation(551, 25, 1),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(558, 25, 8),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(559, 25, 9),
			}),
		],
		location: new SourceLocation(560, 25, 10),
	}),
	new Token(SqlTokenType.Identifier, "unnest", {
		keyword: SqlKeywords.UNNEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(564, 25, 14),
			}),
		],
		location: new SourceLocation(565, 25, 15),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(571, 25, 21),
	}),
	new Token(SqlTokenType.Reserved, "ARRAY", {
		keyword: SqlKeywords.ARRAY,
		location: new SourceLocation(572, 25, 22),
	}),
	new Token(SqlTokenType.LeftBracket, "[", {
		location: new SourceLocation(577, 25, 27),
	}),
	new Token(SqlTokenType.String, "'a'", {
		location: new SourceLocation(578, 25, 28),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(581, 25, 31),
	}),
	new Token(SqlTokenType.String, "'b'", {
		location: new SourceLocation(582, 25, 32),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(585, 25, 35),
	}),
	new Token(SqlTokenType.String, "'c'", {
		location: new SourceLocation(586, 25, 36),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(589, 25, 39),
	}),
	new Token(SqlTokenType.String, "'d'", {
		location: new SourceLocation(590, 25, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(593, 25, 43),
	}),
	new Token(SqlTokenType.String, "'e'", {
		location: new SourceLocation(594, 25, 44),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(597, 25, 47),
	}),
	new Token(SqlTokenType.String, "'f'", {
		location: new SourceLocation(598, 25, 48),
	}),
	new Token(SqlTokenType.RightBracket, "]", {
		location: new SourceLocation(601, 25, 51),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(602, 25, 52),
	}),
	new Token(SqlTokenType.Reserved, "WITH", {
		keyword: SqlKeywords.WITH,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(603, 25, 53),
			}),
		],
		location: new SourceLocation(604, 25, 54),
	}),
	new Token(SqlTokenType.Identifier, "ORDINALITY", {
		keyword: SqlKeywords.ORDINALITY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(608, 25, 58),
			}),
		],
		location: new SourceLocation(609, 25, 59),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(620, 25, 70),
			}),
		],
		location: new SourceLocation(619, 25, 69),
	}),
	new Token(SqlTokenType.Reserved, "WITH", {
		keyword: SqlKeywords.WITH,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(621, 26, 1),
			}),
		],
		location: new SourceLocation(622, 27, 1),
	}),
	new Token(SqlTokenType.Identifier, "t", {
		keyword: SqlKeywords.T,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(626, 27, 5),
			}),
		],
		location: new SourceLocation(627, 27, 6),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(628, 27, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(631, 27, 10),
			}),
		],
		location: new SourceLocation(629, 27, 8),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(633, 27, 12),
			}),
		],
		location: new SourceLocation(632, 27, 11),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(634, 28, 1),
			}),
		],
		location: new SourceLocation(638, 28, 5),
	}),
	new Token(SqlTokenType.Identifier, "random", {
		keyword: SqlKeywords.RANDOM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(644, 28, 11),
			}),
		],
		location: new SourceLocation(645, 28, 12),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(651, 28, 18),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(652, 28, 19),
	}),
	new Token(SqlTokenType.Reserved, "as", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(653, 28, 20),
			}),
		],
		location: new SourceLocation(654, 28, 21),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(656, 28, 23),
			}),
		],
		location: new SourceLocation(657, 28, 24),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(658, 28, 25),
			}),
		],
		location: new SourceLocation(659, 28, 26),
	}),
	new Token(SqlTokenType.Identifier, "generate_series", {
		keyword: SqlKeywords.GENERATE_SERIES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(663, 28, 30),
			}),
		],
		location: new SourceLocation(664, 28, 31),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(679, 28, 46),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(680, 28, 47),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(681, 28, 48),
	}),
	new Token(SqlTokenType.Numeric, "3", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(682, 28, 49),
			}),
		],
		location: new SourceLocation(683, 28, 50),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(685, 28, 52),
			}),
		],
		location: new SourceLocation(684, 28, 51),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(686, 29, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(689, 29, 4),
			}),
		],
		location: new SourceLocation(688, 29, 3),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(696, 30, 7),
			}),
		],
		location: new SourceLocation(690, 30, 1),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(697, 30, 8),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(698, 30, 9),
			}),
		],
		location: new SourceLocation(699, 30, 10),
	}),
	new Token(SqlTokenType.Identifier, "t", {
		keyword: SqlKeywords.T,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(703, 30, 14),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(705, 30, 16),
			}),
		],
		location: new SourceLocation(704, 30, 15),
	}),
	new Token(SqlTokenType.Reserved, "UNION", {
		keyword: SqlKeywords.UNION,
		location: new SourceLocation(706, 31, 1),
	}),
	new Token(SqlTokenType.Reserved, "ALL", {
		keyword: SqlKeywords.ALL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(711, 31, 6),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(715, 31, 10),
			}),
		],
		location: new SourceLocation(712, 31, 7),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(722, 32, 7),
			}),
		],
		location: new SourceLocation(716, 32, 1),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(723, 32, 8),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(724, 32, 9),
			}),
		],
		location: new SourceLocation(725, 32, 10),
	}),
	new Token(SqlTokenType.Identifier, "t", {
		keyword: SqlKeywords.T,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(729, 32, 14),
			}),
		],
		location: new SourceLocation(730, 32, 15),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(732, 32, 17),
			}),
		],
		location: new SourceLocation(731, 32, 16),
	}),
	new Token(SqlTokenType.Reserved, "WITH", {
		keyword: SqlKeywords.WITH,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(733, 33, 1),
			}),
		],
		location: new SourceLocation(734, 34, 1),
	}),
	new Token(SqlTokenType.Identifier, "RECURSIVE", {
		keyword: SqlKeywords.RECURSIVE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(738, 34, 5),
			}),
		],
		location: new SourceLocation(739, 34, 6),
	}),
	new Token(SqlTokenType.Identifier, "employee_recursive", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(748, 34, 15),
			}),
		],
		location: new SourceLocation(749, 34, 16),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(767, 34, 34),
	}),
	new Token(SqlTokenType.Identifier, "distance", {
		location: new SourceLocation(768, 34, 35),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(776, 34, 43),
	}),
	new Token(SqlTokenType.Identifier, "employee_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(777, 34, 44),
			}),
		],
		location: new SourceLocation(778, 34, 45),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(791, 34, 58),
	}),
	new Token(SqlTokenType.Identifier, "manager_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(792, 34, 59),
			}),
		],
		location: new SourceLocation(793, 34, 60),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(805, 34, 72),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(806, 34, 73),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(809, 34, 76),
			}),
		],
		location: new SourceLocation(807, 34, 74),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(811, 34, 78),
			}),
		],
		location: new SourceLocation(810, 34, 77),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(812, 35, 1),
			}),
		],
		location: new SourceLocation(816, 35, 5),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(822, 35, 11),
			}),
		],
		location: new SourceLocation(823, 35, 12),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(824, 35, 13),
	}),
	new Token(SqlTokenType.Identifier, "employee_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(825, 35, 14),
			}),
		],
		location: new SourceLocation(826, 35, 15),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(839, 35, 28),
	}),
	new Token(SqlTokenType.Identifier, "manager_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(840, 35, 29),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(853, 35, 42),
			}),
		],
		location: new SourceLocation(841, 35, 30),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(854, 36, 1),
			}),
		],
		location: new SourceLocation(858, 36, 5),
	}),
	new Token(SqlTokenType.Identifier, "employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(862, 36, 9),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(871, 36, 18),
			}),
		],
		location: new SourceLocation(863, 36, 10),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(872, 37, 1),
			}),
		],
		location: new SourceLocation(876, 37, 5),
	}),
	new Token(SqlTokenType.Identifier, "manager_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(881, 37, 10),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(894, 37, 23),
			}),
		],
		location: new SourceLocation(882, 37, 11),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(895, 37, 24),
	}),
	new Token(SqlTokenType.String, "'Mary'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(896, 37, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(903, 37, 32),
			}),
		],
		location: new SourceLocation(897, 37, 26),
	}),
	new Token(SqlTokenType.Reserved, "UNION", {
		keyword: SqlKeywords.UNION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(904, 38, 1),
			}),
		],
		location: new SourceLocation(906, 38, 3),
	}),
	new Token(SqlTokenType.Reserved, "ALL", {
		keyword: SqlKeywords.ALL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(911, 38, 8),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(915, 38, 12),
			}),
		],
		location: new SourceLocation(912, 38, 9),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(916, 39, 1),
			}),
		],
		location: new SourceLocation(920, 39, 5),
	}),
	new Token(SqlTokenType.Identifier, "er", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(926, 39, 11),
			}),
		],
		location: new SourceLocation(927, 39, 12),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(929, 39, 14),
	}),
	new Token(SqlTokenType.Identifier, "distance", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(938, 39, 23),
			}),
		],
		location: new SourceLocation(930, 39, 15),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(939, 39, 24),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(940, 39, 25),
			}),
		],
		location: new SourceLocation(941, 39, 26),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(942, 39, 27),
	}),
	new Token(SqlTokenType.Identifier, "e", {
		keyword: SqlKeywords.E,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(943, 39, 28),
			}),
		],
		location: new SourceLocation(944, 39, 29),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(945, 39, 30),
	}),
	new Token(SqlTokenType.Identifier, "employee_name", {
		location: new SourceLocation(946, 39, 31),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(959, 39, 44),
	}),
	new Token(SqlTokenType.Identifier, "e", {
		keyword: SqlKeywords.E,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(960, 39, 45),
			}),
		],
		location: new SourceLocation(961, 39, 46),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(962, 39, 47),
	}),
	new Token(SqlTokenType.Identifier, "manager_name", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(975, 39, 60),
			}),
		],
		location: new SourceLocation(963, 39, 48),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(976, 40, 1),
			}),
		],
		location: new SourceLocation(980, 40, 5),
	}),
	new Token(SqlTokenType.Identifier, "employee_recursive", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(984, 40, 9),
			}),
		],
		location: new SourceLocation(985, 40, 10),
	}),
	new Token(SqlTokenType.Identifier, "er", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1003, 40, 28),
			}),
		],
		location: new SourceLocation(1004, 40, 29),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1006, 40, 31),
	}),
	new Token(SqlTokenType.Identifier, "employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1007, 40, 32),
			}),
		],
		location: new SourceLocation(1008, 40, 33),
	}),
	new Token(SqlTokenType.Identifier, "e", {
		keyword: SqlKeywords.E,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1016, 40, 41),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1018, 40, 43),
			}),
		],
		location: new SourceLocation(1017, 40, 42),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1019, 41, 1),
			}),
		],
		location: new SourceLocation(1023, 41, 5),
	}),
	new Token(SqlTokenType.Identifier, "er", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1028, 41, 10),
			}),
		],
		location: new SourceLocation(1029, 41, 11),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1031, 41, 13),
	}),
	new Token(SqlTokenType.Identifier, "employee_name", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1045, 41, 27),
			}),
		],
		location: new SourceLocation(1032, 41, 14),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(1046, 41, 28),
	}),
	new Token(SqlTokenType.Identifier, "e", {
		keyword: SqlKeywords.E,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1047, 41, 29),
			}),
		],
		location: new SourceLocation(1048, 41, 30),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1049, 41, 31),
	}),
	new Token(SqlTokenType.Identifier, "manager_name", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1062, 41, 44),
			}),
		],
		location: new SourceLocation(1050, 41, 32),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(1063, 42, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1066, 42, 4),
			}),
		],
		location: new SourceLocation(1065, 42, 3),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(1067, 43, 1),
	}),
	new Token(SqlTokenType.Identifier, "distance", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1073, 43, 7),
			}),
		],
		location: new SourceLocation(1074, 43, 8),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1082, 43, 16),
	}),
	new Token(SqlTokenType.Identifier, "employee_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1083, 43, 17),
			}),
		],
		location: new SourceLocation(1084, 43, 18),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1097, 43, 31),
			}),
		],
		location: new SourceLocation(1098, 43, 32),
	}),
	new Token(SqlTokenType.Identifier, "employee_recursive", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1102, 43, 36),
			}),
		],
		location: new SourceLocation(1103, 43, 37),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1122, 43, 56),
			}),
		],
		location: new SourceLocation(1121, 43, 55),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1123, 44, 1),
			}),
		],
		location: new SourceLocation(1124, 45, 1),
	}),
	new Token(SqlTokenType.Identifier, "m", {
		keyword: SqlKeywords.M,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1130, 45, 7),
			}),
		],
		location: new SourceLocation(1131, 45, 8),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1132, 45, 9),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		location: new SourceLocation(1133, 45, 10),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1137, 45, 14),
			}),
		],
		location: new SourceLocation(1138, 45, 15),
	}),
	new Token(SqlTokenType.Identifier, "mname", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1140, 45, 17),
			}),
		],
		location: new SourceLocation(1141, 45, 18),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1146, 45, 23),
	}),
	new Token(SqlTokenType.Identifier, "pname", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1147, 45, 24),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1153, 45, 30),
			}),
		],
		location: new SourceLocation(1148, 45, 25),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		location: new SourceLocation(1154, 46, 1),
	}),
	new Token(SqlTokenType.Identifier, "manufacturers", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1158, 46, 5),
			}),
		],
		location: new SourceLocation(1159, 46, 6),
	}),
	new Token(SqlTokenType.Identifier, "m", {
		keyword: SqlKeywords.M,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1172, 46, 19),
			}),
		],
		location: new SourceLocation(1173, 46, 20),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1174, 46, 21),
	}),
	new Token(SqlTokenType.Reserved, "LATERAL", {
		keyword: SqlKeywords.LATERAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1175, 46, 22),
			}),
		],
		location: new SourceLocation(1176, 46, 23),
	}),
	new Token(SqlTokenType.Identifier, "get_product_names", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1183, 46, 30),
			}),
		],
		location: new SourceLocation(1184, 46, 31),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1201, 46, 48),
	}),
	new Token(SqlTokenType.Identifier, "m", {
		keyword: SqlKeywords.M,
		location: new SourceLocation(1202, 46, 49),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1203, 46, 50),
	}),
	new Token(SqlTokenType.Identifier, "id", {
		keyword: SqlKeywords.ID,
		location: new SourceLocation(1204, 46, 51),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1206, 46, 53),
	}),
	new Token(SqlTokenType.Identifier, "pname", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1207, 46, 54),
			}),
		],
		location: new SourceLocation(1208, 46, 55),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1214, 46, 61),
			}),
		],
		location: new SourceLocation(1213, 46, 60),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1215, 47, 1),
			}),
		],
		location: new SourceLocation(1216, 48, 1),
	}),
	new Token(SqlTokenType.Identifier, "m", {
		keyword: SqlKeywords.M,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1222, 48, 7),
			}),
		],
		location: new SourceLocation(1223, 48, 8),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1224, 48, 9),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		location: new SourceLocation(1225, 48, 10),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1229, 48, 14),
			}),
		],
		location: new SourceLocation(1230, 48, 15),
	}),
	new Token(SqlTokenType.Identifier, "mname", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1232, 48, 17),
			}),
		],
		location: new SourceLocation(1233, 48, 18),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1238, 48, 23),
	}),
	new Token(SqlTokenType.Identifier, "pname", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1239, 48, 24),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1245, 48, 30),
			}),
		],
		location: new SourceLocation(1240, 48, 25),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		location: new SourceLocation(1246, 49, 1),
	}),
	new Token(SqlTokenType.Identifier, "manufacturers", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1250, 49, 5),
			}),
		],
		location: new SourceLocation(1251, 49, 6),
	}),
	new Token(SqlTokenType.Identifier, "m", {
		keyword: SqlKeywords.M,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1264, 49, 19),
			}),
		],
		location: new SourceLocation(1265, 49, 20),
	}),
	new Token(SqlTokenType.Identifier, "LEFT", {
		keyword: SqlKeywords.LEFT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1266, 49, 21),
			}),
		],
		location: new SourceLocation(1267, 49, 22),
	}),
	new Token(SqlTokenType.Identifier, "JOIN", {
		keyword: SqlKeywords.JOIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1271, 49, 26),
			}),
		],
		location: new SourceLocation(1272, 49, 27),
	}),
	new Token(SqlTokenType.Reserved, "LATERAL", {
		keyword: SqlKeywords.LATERAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1276, 49, 31),
			}),
		],
		location: new SourceLocation(1277, 49, 32),
	}),
	new Token(SqlTokenType.Identifier, "get_product_names", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1284, 49, 39),
			}),
		],
		location: new SourceLocation(1285, 49, 40),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1302, 49, 57),
	}),
	new Token(SqlTokenType.Identifier, "m", {
		keyword: SqlKeywords.M,
		location: new SourceLocation(1303, 49, 58),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1304, 49, 59),
	}),
	new Token(SqlTokenType.Identifier, "id", {
		keyword: SqlKeywords.ID,
		location: new SourceLocation(1305, 49, 60),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1307, 49, 62),
	}),
	new Token(SqlTokenType.Identifier, "pname", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1308, 49, 63),
			}),
		],
		location: new SourceLocation(1309, 49, 64),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1314, 49, 69),
			}),
		],
		location: new SourceLocation(1315, 49, 70),
	}),
	new Token(SqlTokenType.Reserved, "true", {
		keyword: SqlKeywords.TRUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1317, 49, 72),
			}),
		],
		location: new SourceLocation(1318, 49, 73),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1323, 49, 78),
			}),
		],
		location: new SourceLocation(1322, 49, 77),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1324, 50, 1),
			}),
		],
		location: new SourceLocation(1325, 51, 1),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1331, 51, 7),
			}),
		],
		location: new SourceLocation(1332, 51, 8),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(1333, 51, 9),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		location: new SourceLocation(1334, 51, 10),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(1335, 51, 11),
	}),
];
