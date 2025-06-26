import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../../../src/sql.ts";

export default [
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlLexer.Operator, "+", { location: new SourceLocation(8, 1, 8) }),
	new Token(SqlLexer.Numeric, "2", { location: new SourceLocation(9, 1, 9) }),
	new Token(SqlLexer.Operator, "-", {
		location: new SourceLocation(10, 1, 10),
	}),
	new Token(SqlLexer.Numeric, "3", { location: new SourceLocation(11, 1, 11) }),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(13, 1, 13),
			}),
		],
		location: new SourceLocation(12, 1, 12),
	}),
	new Token(SqlLexer.Operator, "-", {
		location: new SourceLocation(14, 1, 14),
	}),
	new Token(SqlLexer.Numeric, "1", { location: new SourceLocation(15, 1, 15) }),
	new Token(SqlLexer.Operator, "*", {
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlLexer.Numeric, "2", { location: new SourceLocation(17, 1, 17) }),
	new Token(SqlLexer.Operator, "/", {
		location: new SourceLocation(18, 1, 18),
	}),
	new Token(SqlLexer.Numeric, "3", { location: new SourceLocation(19, 1, 19) }),
	new Token(SqlLexer.Identifier, "c1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
		location: new SourceLocation(21, 1, 21),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(24, 1, 24),
			}),
		],
		location: new SourceLocation(23, 1, 23),
	}),
	new Token(SqlLexer.Operator, "+", {
		location: new SourceLocation(25, 1, 25),
	}),
	new Token(SqlLexer.Numeric, "1", { location: new SourceLocation(26, 1, 26) }),
	new Token(SqlLexer.Operator, "-", {
		location: new SourceLocation(27, 1, 27),
	}),
	new Token(SqlLexer.Numeric, "2", { location: new SourceLocation(28, 1, 28) }),
	new Token(SqlLexer.Operator, "*", {
		location: new SourceLocation(29, 1, 29),
	}),
	new Token(SqlLexer.Numeric, "3", { location: new SourceLocation(30, 1, 30) }),
	new Token(SqlLexer.Reserved, "AS", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(31, 1, 31),
			}),
		],
		location: new SourceLocation(32, 1, 32),
	}),
	new Token(SqlLexer.Identifier, "c2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(34, 1, 34),
			}),
		],
		location: new SourceLocation(35, 1, 35),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(37, 1, 37),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(38, 1, 38),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(39, 2, 1),
	}),
	new Token(SqlLexer.Identifier, "c1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(45, 2, 7),
			}),
		],
		location: new SourceLocation(46, 2, 8),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(48, 2, 10),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(53, 2, 15),
			}),
		],
		location: new SourceLocation(49, 2, 11),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(54, 2, 16),
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(61, 2, 23),
			}),
		],
		location: new SourceLocation(55, 2, 17),
	}),
	new Token(SqlLexer.Operator, "*", {
		location: new SourceLocation(62, 2, 24),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(63, 2, 25),
			}),
		],
		location: new SourceLocation(64, 2, 26),
	}),
	new Token(SqlLexer.Identifier, "sample", {
		keyword: SqlLexer.SAMPLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(68, 2, 30),
			}),
		],
		location: new SourceLocation(69, 2, 31),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(75, 2, 37),
	}),
	new Token(SqlLexer.Reserved, "GROUP", {
		keyword: SqlLexer.GROUP,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(76, 2, 38),
			}),
		],
		location: new SourceLocation(77, 2, 39),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(82, 2, 44),
			}),
		],
		location: new SourceLocation(83, 2, 45),
	}),
	new Token(SqlLexer.Identifier, "c1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(85, 2, 47),
			}),
		],
		location: new SourceLocation(86, 2, 48),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(88, 2, 50),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(89, 2, 51),
			}),
		],
	}),
	new Token(SqlLexer.Identifier, "WITH", {
		keyword: SqlLexer.WITH,
		location: new SourceLocation(90, 3, 1),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(94, 3, 5),
			}),
		],
		location: new SourceLocation(95, 3, 6),
	}),
	new Token(SqlLexer.Reserved, "AS", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(96, 3, 7),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(99, 3, 10),
			}),
		],
		location: new SourceLocation(97, 3, 8),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(100, 3, 11),
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(101, 3, 12),
	}),
	new Token(SqlLexer.Identifier, "s", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(107, 3, 18),
			}),
		],
		location: new SourceLocation(108, 3, 19),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(109, 3, 20) }),
	new Token(SqlLexer.Operator, "*", {
		location: new SourceLocation(110, 3, 21),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(111, 3, 22),
			}),
		],
		location: new SourceLocation(112, 3, 23),
	}),
	new Token(SqlLexer.Identifier, "sample", {
		keyword: SqlLexer.SAMPLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(116, 3, 27),
			}),
		],
		location: new SourceLocation(117, 3, 28),
	}),
	new Token(SqlLexer.Identifier, "s", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(123, 3, 34),
			}),
		],
		location: new SourceLocation(124, 3, 35),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(126, 3, 37),
			}),
		],
		location: new SourceLocation(125, 3, 36),
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(133, 4, 7),
			}),
		],
		location: new SourceLocation(127, 4, 1),
	}),
	new Token(SqlLexer.Operator, "*", {
		location: new SourceLocation(134, 4, 8),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(135, 4, 9),
			}),
		],
		location: new SourceLocation(136, 4, 10),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(140, 4, 14),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(142, 4, 16),
			}),
		],
		location: new SourceLocation(141, 4, 15),
	}),
	new Token(SqlLexer.Reserved, "WHERE", {
		keyword: SqlLexer.WHERE,
		location: new SourceLocation(143, 5, 1),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(148, 5, 6),
			}),
		],
		location: new SourceLocation(149, 5, 7),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(150, 5, 8) }),
	new Token(SqlLexer.Identifier, "col1", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(155, 5, 13),
			}),
		],
		location: new SourceLocation(151, 5, 9),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(156, 5, 14),
	}),
	new Token(SqlLexer.Numeric, "2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(157, 5, 15),
			}),
		],
		location: new SourceLocation(158, 5, 16),
	}),
	new Token(SqlLexer.Reserved, "AND", {
		keyword: SqlLexer.AND,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(159, 5, 17),
			}),
		],
		location: new SourceLocation(160, 5, 18),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(163, 5, 21),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(167, 5, 25),
			}),
		],
		location: new SourceLocation(164, 5, 22),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(168, 5, 26),
	}),
	new Token(SqlLexer.Identifier, "x", {
		location: new SourceLocation(169, 5, 27),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(170, 5, 28) }),
	new Token(SqlLexer.Identifier, "col2", {
		location: new SourceLocation(171, 5, 29),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(175, 5, 33),
			}),
		],
		location: new SourceLocation(176, 5, 34),
	}),
	new Token(SqlLexer.Identifier, "LIKE", {
		keyword: SqlLexer.LIKE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(179, 5, 37),
			}),
		],
		location: new SourceLocation(180, 5, 38),
	}),
	new Token(SqlLexer.String, "'%x%'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(184, 5, 42),
			}),
		],
		location: new SourceLocation(185, 5, 43),
	}),
	new Token(SqlLexer.Reserved, "OR", {
		keyword: SqlLexer.OR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(190, 5, 48),
			}),
		],
		location: new SourceLocation(191, 5, 49),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(193, 5, 51),
			}),
		],
		location: new SourceLocation(194, 5, 52),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(195, 5, 53) }),
	new Token(SqlLexer.Identifier, "col2", {
		location: new SourceLocation(196, 5, 54),
	}),
	new Token(SqlLexer.Reserved, "IS", {
		keyword: SqlLexer.IS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(200, 5, 58),
			}),
		],
		location: new SourceLocation(201, 5, 59),
	}),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(203, 5, 61),
			}),
		],
		location: new SourceLocation(204, 5, 62),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(209, 5, 67),
			}),
		],
		location: new SourceLocation(208, 5, 66),
	}),
	new Token(SqlLexer.Reserved, "ORDER", {
		keyword: SqlLexer.ORDER,
		location: new SourceLocation(210, 6, 1),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(215, 6, 6),
			}),
		],
		location: new SourceLocation(216, 6, 7),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(218, 6, 9),
			}),
		],
		location: new SourceLocation(219, 6, 10),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(220, 6, 11) }),
	new Token(SqlLexer.Identifier, "col3", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(225, 6, 16),
			}),
		],
		location: new SourceLocation(221, 6, 12),
	}),
	new Token(SqlLexer.Reserved, "LIMIT", {
		keyword: SqlLexer.LIMIT,
		location: new SourceLocation(226, 7, 1),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(231, 7, 6),
			}),
		],
		location: new SourceLocation(232, 7, 7),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(233, 7, 8),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(234, 7, 9),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(241, 8, 7),
			}),
		],
		location: new SourceLocation(235, 8, 1),
	}),
	new Token(SqlLexer.Operator, "*", {
		location: new SourceLocation(242, 8, 8),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(243, 8, 9),
			}),
		],
		location: new SourceLocation(244, 8, 10),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(248, 8, 14),
			}),
		],
		location: new SourceLocation(249, 8, 15),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(250, 8, 16) }),
	new Token(SqlLexer.Identifier, "main", {
		keyword: SqlLexer.MAIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(251, 8, 17),
			}),
		],
		location: new SourceLocation(252, 8, 18),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(256, 8, 22) }),
	new Token(SqlLexer.Identifier, "b", {
		location: new SourceLocation(257, 8, 23),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(258, 8, 24),
			}),
		],
		location: new SourceLocation(259, 8, 25),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(260, 8, 26) }),
	new Token(SqlLexer.Identifier, "c", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(261, 8, 27),
			}),
		],
		location: new SourceLocation(262, 8, 28),
	}),
	new Token(SqlLexer.Reserved, "as", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(263, 8, 29),
			}),
		],
		location: new SourceLocation(264, 8, 30),
	}),
	new Token(SqlLexer.Identifier, "y", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(266, 8, 32),
			}),
		],
		location: new SourceLocation(267, 8, 33),
	}),
	new Token(SqlLexer.Reserved, "WHERE", {
		keyword: SqlLexer.WHERE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(268, 8, 34),
			}),
		],
		location: new SourceLocation(269, 8, 35),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(274, 8, 40),
			}),
		],
		location: new SourceLocation(275, 8, 41),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(276, 8, 42) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(278, 8, 44),
			}),
		],
		location: new SourceLocation(277, 8, 43),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(279, 8, 45),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(280, 8, 46),
			}),
		],
		location: new SourceLocation(281, 8, 47),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(282, 8, 48) }),
	new Token(SqlLexer.Identifier, "x", {
		location: new SourceLocation(283, 8, 49),
	}),
	new Token(SqlLexer.Reserved, "AND", {
		keyword: SqlLexer.AND,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(284, 8, 50),
			}),
		],
		location: new SourceLocation(285, 8, 51),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(288, 8, 54),
			}),
		],
		location: new SourceLocation(289, 8, 55),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(290, 8, 56) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(292, 8, 58),
			}),
		],
		location: new SourceLocation(291, 8, 57),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(293, 8, 59),
	}),
	new Token(SqlLexer.Identifier, "y", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(294, 8, 60),
			}),
		],
		location: new SourceLocation(295, 8, 61),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(296, 8, 62) }),
	new Token(SqlLexer.Identifier, "x", {
		location: new SourceLocation(297, 8, 63),
	}),
	new Token(SqlLexer.Reserved, "AND", {
		keyword: SqlLexer.AND,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(298, 8, 64),
			}),
		],
		location: new SourceLocation(299, 8, 65),
	}),
	new Token(SqlLexer.Identifier, "y", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(302, 8, 68),
			}),
		],
		location: new SourceLocation(303, 8, 69),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(304, 8, 70) }),
	new Token(SqlLexer.Identifier, "y", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(306, 8, 72),
			}),
		],
		location: new SourceLocation(305, 8, 71),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(307, 8, 73),
	}),
	new Token(SqlLexer.Numeric, "0", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(308, 8, 74),
			}),
		],
		location: new SourceLocation(309, 8, 75),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(310, 8, 76),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(311, 8, 77),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(318, 9, 7),
			}),
		],
		location: new SourceLocation(312, 9, 1),
	}),
	new Token(SqlLexer.Operator, "-", {
		location: new SourceLocation(319, 9, 8),
	}),
	new Token(SqlLexer.Numeric, "1", { location: new SourceLocation(320, 9, 9) }),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(321, 9, 10) }),
	new Token(SqlLexer.Identifier, "TRUE", {
		keyword: SqlLexer.TRUE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(322, 9, 11),
			}),
		],
		location: new SourceLocation(323, 9, 12),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(327, 9, 16) }),
	new Token(SqlLexer.Identifier, "FALSE", {
		keyword: SqlLexer.FALSE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(328, 9, 17),
			}),
		],
		location: new SourceLocation(329, 9, 18),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(334, 9, 23) }),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(335, 9, 24),
			}),
		],
		location: new SourceLocation(336, 9, 25),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(340, 9, 29) }),
	new Token(SqlLexer.Reserved, "CURRENT_TIME", {
		keyword: SqlLexer.CURRENT_TIME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(341, 9, 30),
			}),
		],
		location: new SourceLocation(342, 9, 31),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(354, 9, 43) }),
	new Token(SqlLexer.Reserved, "CURRENT_DATE", {
		keyword: SqlLexer.CURRENT_DATE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(355, 9, 44),
			}),
		],
		location: new SourceLocation(356, 9, 45),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(368, 9, 57) }),
	new Token(SqlLexer.Reserved, "CURRENT_TIMESTAMP", {
		keyword: SqlLexer.CURRENT_TIMESTAMP,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(369, 9, 58),
			}),
		],
		location: new SourceLocation(370, 9, 59),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(387, 9, 76) }),
	new Token(SqlLexer.String, "'aaa'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(388, 9, 77),
			}),
		],
		location: new SourceLocation(389, 9, 78),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(394, 9, 83) }),
	new Token(SqlLexer.Identifier, '"aaa"', {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(395, 9, 84),
			}),
		],
		location: new SourceLocation(396, 9, 85),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(401, 9, 90) }),
	new Token(SqlLexer.Blob, "x'53514C697465'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(402, 9, 91),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(418, 9, 107),
			}),
		],
		location: new SourceLocation(403, 9, 92),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(419, 9, 108),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(420, 9, 109),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(421, 10, 1),
	}),
	new Token(SqlLexer.BindVariable, "?1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(427, 10, 7),
			}),
		],
		location: new SourceLocation(428, 10, 8),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(430, 10, 10) }),
	new Token(SqlLexer.BindVariable, "?", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(431, 10, 11),
			}),
		],
		location: new SourceLocation(432, 10, 12),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(433, 10, 13) }),
	new Token(SqlLexer.BindVariable, ":param", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(434, 10, 14),
			}),
		],
		location: new SourceLocation(435, 10, 15),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(441, 10, 21) }),
	new Token(SqlLexer.BindVariable, "@param", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(442, 10, 22),
			}),
		],
		location: new SourceLocation(443, 10, 23),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(449, 10, 29) }),
	new Token(SqlLexer.BindVariable, "$param", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(450, 10, 30),
			}),
		],
		location: new SourceLocation(451, 10, 31),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(457, 10, 37),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(458, 10, 38),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(459, 11, 1),
	}),
	new Token(SqlLexer.Reserved, "CASE", {
		keyword: SqlLexer.CASE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(465, 11, 7),
			}),
		],
		location: new SourceLocation(466, 11, 8),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(470, 11, 12),
			}),
		],
		location: new SourceLocation(471, 11, 13),
	}),
	new Token(SqlLexer.Reserved, "WHEN", {
		keyword: SqlLexer.WHEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(472, 11, 14),
			}),
		],
		location: new SourceLocation(473, 11, 15),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(477, 11, 19),
			}),
		],
		location: new SourceLocation(478, 11, 20),
	}),
	new Token(SqlLexer.Reserved, "THEN", {
		keyword: SqlLexer.THEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(479, 11, 21),
			}),
		],
		location: new SourceLocation(480, 11, 22),
	}),
	new Token(SqlLexer.String, "'a'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(484, 11, 26),
			}),
		],
		location: new SourceLocation(485, 11, 27),
	}),
	new Token(SqlLexer.Identifier, "END", {
		keyword: SqlLexer.END,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(488, 11, 30),
			}),
		],
		location: new SourceLocation(489, 11, 31),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(492, 11, 34),
			}),
		],
		location: new SourceLocation(493, 11, 35),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(494, 11, 36),
			}),
		],
		location: new SourceLocation(495, 11, 37),
	}),
	new Token(SqlLexer.Identifier, "test", {
		keyword: SqlLexer.TEST,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(499, 11, 41),
			}),
		],
		location: new SourceLocation(500, 11, 42),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(504, 11, 46),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(505, 11, 47),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(506, 12, 1),
	}),
	new Token(SqlLexer.Reserved, "CASE", {
		keyword: SqlLexer.CASE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(512, 12, 7),
			}),
		],
		location: new SourceLocation(513, 12, 8),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(517, 12, 12),
			}),
		],
		location: new SourceLocation(518, 12, 13),
	}),
	new Token(SqlLexer.Reserved, "WHEN", {
		keyword: SqlLexer.WHEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(519, 12, 14),
			}),
		],
		location: new SourceLocation(520, 12, 15),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(524, 12, 19),
			}),
		],
		location: new SourceLocation(525, 12, 20),
	}),
	new Token(SqlLexer.Reserved, "THEN", {
		keyword: SqlLexer.THEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(526, 12, 21),
			}),
		],
		location: new SourceLocation(527, 12, 22),
	}),
	new Token(SqlLexer.String, "'a'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(531, 12, 26),
			}),
		],
		location: new SourceLocation(532, 12, 27),
	}),
	new Token(SqlLexer.Reserved, "WHEN", {
		keyword: SqlLexer.WHEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(535, 12, 30),
			}),
		],
		location: new SourceLocation(536, 12, 31),
	}),
	new Token(SqlLexer.Numeric, "2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(540, 12, 35),
			}),
		],
		location: new SourceLocation(541, 12, 36),
	}),
	new Token(SqlLexer.Reserved, "THEN", {
		keyword: SqlLexer.THEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(542, 12, 37),
			}),
		],
		location: new SourceLocation(543, 12, 38),
	}),
	new Token(SqlLexer.String, "'b'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(547, 12, 42),
			}),
		],
		location: new SourceLocation(548, 12, 43),
	}),
	new Token(SqlLexer.Reserved, "ELSE", {
		keyword: SqlLexer.ELSE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(551, 12, 46),
			}),
		],
		location: new SourceLocation(552, 12, 47),
	}),
	new Token(SqlLexer.String, "'c'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(556, 12, 51),
			}),
		],
		location: new SourceLocation(557, 12, 52),
	}),
	new Token(SqlLexer.Identifier, "END", {
		keyword: SqlLexer.END,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(560, 12, 55),
			}),
		],
		location: new SourceLocation(561, 12, 56),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(564, 12, 59),
			}),
		],
		location: new SourceLocation(565, 12, 60),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(566, 12, 61),
			}),
		],
		location: new SourceLocation(567, 12, 62),
	}),
	new Token(SqlLexer.Identifier, "test", {
		keyword: SqlLexer.TEST,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(571, 12, 66),
			}),
		],
		location: new SourceLocation(572, 12, 67),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(576, 12, 71),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(577, 12, 72),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(578, 13, 1),
	}),
	new Token(SqlLexer.Reserved, "CASE", {
		keyword: SqlLexer.CASE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(584, 13, 7),
			}),
		],
		location: new SourceLocation(585, 13, 8),
	}),
	new Token(SqlLexer.Reserved, "WHEN", {
		keyword: SqlLexer.WHEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(589, 13, 12),
			}),
		],
		location: new SourceLocation(590, 13, 13),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(594, 13, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(596, 13, 19),
			}),
		],
		location: new SourceLocation(595, 13, 18),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(597, 13, 20),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(598, 13, 21),
			}),
		],
		location: new SourceLocation(599, 13, 22),
	}),
	new Token(SqlLexer.Reserved, "THEN", {
		keyword: SqlLexer.THEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(600, 13, 23),
			}),
		],
		location: new SourceLocation(601, 13, 24),
	}),
	new Token(SqlLexer.String, "'a'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(605, 13, 28),
			}),
		],
		location: new SourceLocation(606, 13, 29),
	}),
	new Token(SqlLexer.Identifier, "END", {
		keyword: SqlLexer.END,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(609, 13, 32),
			}),
		],
		location: new SourceLocation(610, 13, 33),
	}),
	new Token(SqlLexer.Reserved, "AS", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(613, 13, 36),
			}),
		],
		location: new SourceLocation(614, 13, 37),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(616, 13, 39),
			}),
		],
		location: new SourceLocation(617, 13, 40),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(618, 13, 41),
			}),
		],
		location: new SourceLocation(619, 13, 42),
	}),
	new Token(SqlLexer.Identifier, "test", {
		keyword: SqlLexer.TEST,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(623, 13, 46),
			}),
		],
		location: new SourceLocation(624, 13, 47),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(628, 13, 51),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(629, 13, 52),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(630, 14, 1),
	}),
	new Token(SqlLexer.Reserved, "CASE", {
		keyword: SqlLexer.CASE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(636, 14, 7),
			}),
		],
		location: new SourceLocation(637, 14, 8),
	}),
	new Token(SqlLexer.Reserved, "WHEN", {
		keyword: SqlLexer.WHEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(641, 14, 12),
			}),
		],
		location: new SourceLocation(642, 14, 13),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(646, 14, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(648, 14, 19),
			}),
		],
		location: new SourceLocation(647, 14, 18),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(649, 14, 20),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(650, 14, 21),
			}),
		],
		location: new SourceLocation(651, 14, 22),
	}),
	new Token(SqlLexer.Reserved, "THEN", {
		keyword: SqlLexer.THEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(652, 14, 23),
			}),
		],
		location: new SourceLocation(653, 14, 24),
	}),
	new Token(SqlLexer.String, "'a'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(657, 14, 28),
			}),
		],
		location: new SourceLocation(658, 14, 29),
	}),
	new Token(SqlLexer.Reserved, "WHEN", {
		keyword: SqlLexer.WHEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(661, 14, 32),
			}),
		],
		location: new SourceLocation(662, 14, 33),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(666, 14, 37),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(668, 14, 39),
			}),
		],
		location: new SourceLocation(667, 14, 38),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(669, 14, 40),
	}),
	new Token(SqlLexer.Numeric, "2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(670, 14, 41),
			}),
		],
		location: new SourceLocation(671, 14, 42),
	}),
	new Token(SqlLexer.Reserved, "THEN", {
		keyword: SqlLexer.THEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(672, 14, 43),
			}),
		],
		location: new SourceLocation(673, 14, 44),
	}),
	new Token(SqlLexer.String, "'b'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(677, 14, 48),
			}),
		],
		location: new SourceLocation(678, 14, 49),
	}),
	new Token(SqlLexer.Reserved, "ELSE", {
		keyword: SqlLexer.ELSE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(681, 14, 52),
			}),
		],
		location: new SourceLocation(682, 14, 53),
	}),
	new Token(SqlLexer.String, "'c'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(686, 14, 57),
			}),
		],
		location: new SourceLocation(687, 14, 58),
	}),
	new Token(SqlLexer.Identifier, "END", {
		keyword: SqlLexer.END,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(690, 14, 61),
			}),
		],
		location: new SourceLocation(691, 14, 62),
	}),
	new Token(SqlLexer.Reserved, "AS", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(694, 14, 65),
			}),
		],
		location: new SourceLocation(695, 14, 66),
	}),
	new Token(SqlLexer.Identifier, "x", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(697, 14, 68),
			}),
		],
		location: new SourceLocation(698, 14, 69),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(699, 14, 70),
			}),
		],
		location: new SourceLocation(700, 14, 71),
	}),
	new Token(SqlLexer.Identifier, "test", {
		keyword: SqlLexer.TEST,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(704, 14, 75),
			}),
		],
		location: new SourceLocation(705, 14, 76),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(709, 14, 80),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(710, 14, 81),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "SELECT", {
		keyword: SqlLexer.SELECT,
		location: new SourceLocation(711, 15, 1),
	}),
	new Token(SqlLexer.Reserved, "DISTINCT", {
		keyword: SqlLexer.DISTINCT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(717, 15, 7),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(726, 15, 16),
			}),
		],
		location: new SourceLocation(718, 15, 8),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(727, 16, 1),
			}),
		],
		location: new SourceLocation(729, 16, 3),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(730, 16, 4) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(732, 16, 6),
			}),
		],
		location: new SourceLocation(731, 16, 5),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(737, 17, 5),
			}),
		],
		location: new SourceLocation(733, 17, 1),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(738, 18, 1),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(741, 18, 4),
			}),
		],
		location: new SourceLocation(740, 18, 3),
	}),
	new Token(SqlLexer.Reserved, "CROSS", {
		keyword: SqlLexer.CROSS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(742, 19, 1),
			}),
		],
		location: new SourceLocation(744, 19, 3),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(749, 19, 8),
			}),
		],
		location: new SourceLocation(750, 19, 9),
	}),
	new Token(SqlLexer.Identifier, "b", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(754, 19, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(756, 19, 15),
			}),
		],
		location: new SourceLocation(755, 19, 14),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(757, 20, 1),
			}),
		],
		location: new SourceLocation(759, 20, 3),
	}),
	new Token(SqlLexer.Identifier, "c", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(763, 20, 7),
			}),
		],
		location: new SourceLocation(764, 20, 8),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(765, 20, 9),
			}),
		],
		location: new SourceLocation(766, 20, 10),
	}),
	new Token(SqlLexer.Identifier, "c", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(768, 20, 12),
			}),
		],
		location: new SourceLocation(769, 20, 13),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(770, 20, 14) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(772, 20, 16),
			}),
		],
		location: new SourceLocation(771, 20, 15),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(773, 20, 17),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(774, 20, 18),
			}),
		],
		location: new SourceLocation(775, 20, 19),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(776, 20, 20) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(778, 20, 22),
			}),
		],
		location: new SourceLocation(777, 20, 21),
	}),
	new Token(SqlLexer.Reserved, "INNER", {
		keyword: SqlLexer.INNER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(779, 21, 1),
			}),
		],
		location: new SourceLocation(781, 21, 3),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(786, 21, 8),
			}),
		],
		location: new SourceLocation(787, 21, 9),
	}),
	new Token(SqlLexer.Identifier, "c1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(791, 21, 13),
			}),
		],
		location: new SourceLocation(792, 21, 14),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(794, 21, 16),
			}),
		],
		location: new SourceLocation(795, 21, 17),
	}),
	new Token(SqlLexer.Identifier, "c1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(797, 21, 19),
			}),
		],
		location: new SourceLocation(798, 21, 20),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(800, 21, 22) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(802, 21, 24),
			}),
		],
		location: new SourceLocation(801, 21, 23),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(803, 21, 25),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(804, 21, 26),
			}),
		],
		location: new SourceLocation(805, 21, 27),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(806, 21, 28) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(808, 21, 30),
			}),
		],
		location: new SourceLocation(807, 21, 29),
	}),
	new Token(SqlLexer.Reserved, "NATURAL", {
		keyword: SqlLexer.NATURAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(809, 22, 1),
			}),
		],
		location: new SourceLocation(811, 22, 3),
	}),
	new Token(SqlLexer.Reserved, "INNER", {
		keyword: SqlLexer.INNER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(818, 22, 10),
			}),
		],
		location: new SourceLocation(819, 22, 11),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(824, 22, 16),
			}),
		],
		location: new SourceLocation(825, 22, 17),
	}),
	new Token(SqlLexer.Identifier, "c2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(829, 22, 21),
			}),
		],
		location: new SourceLocation(830, 22, 22),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(832, 22, 24),
			}),
		],
		location: new SourceLocation(833, 22, 25),
	}),
	new Token(SqlLexer.Identifier, "c2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(835, 22, 27),
			}),
		],
		location: new SourceLocation(836, 22, 28),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(838, 22, 30) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(840, 22, 32),
			}),
		],
		location: new SourceLocation(839, 22, 31),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(841, 22, 33),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(842, 22, 34),
			}),
		],
		location: new SourceLocation(843, 22, 35),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(844, 22, 36) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(846, 22, 38),
			}),
		],
		location: new SourceLocation(845, 22, 37),
	}),
	new Token(SqlLexer.Reserved, "LEFT", {
		keyword: SqlLexer.LEFT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(847, 23, 1),
			}),
		],
		location: new SourceLocation(849, 23, 3),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(853, 23, 7),
			}),
		],
		location: new SourceLocation(854, 23, 8),
	}),
	new Token(SqlLexer.Identifier, "d", {
		keyword: SqlLexer.D,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(858, 23, 12),
			}),
		],
		location: new SourceLocation(859, 23, 13),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(860, 23, 14),
			}),
		],
		location: new SourceLocation(861, 23, 15),
	}),
	new Token(SqlLexer.Identifier, "d", {
		keyword: SqlLexer.D,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(863, 23, 17),
			}),
		],
		location: new SourceLocation(864, 23, 18),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(865, 23, 19) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(867, 23, 21),
			}),
		],
		location: new SourceLocation(866, 23, 20),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(868, 23, 22),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(869, 23, 23),
			}),
		],
		location: new SourceLocation(870, 23, 24),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(871, 23, 25) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(873, 23, 27),
			}),
		],
		location: new SourceLocation(872, 23, 26),
	}),
	new Token(SqlLexer.Reserved, "LEFT", {
		keyword: SqlLexer.LEFT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(874, 24, 1),
			}),
		],
		location: new SourceLocation(876, 24, 3),
	}),
	new Token(SqlLexer.Reserved, "OUTER", {
		keyword: SqlLexer.OUTER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(880, 24, 7),
			}),
		],
		location: new SourceLocation(881, 24, 8),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(886, 24, 13),
			}),
		],
		location: new SourceLocation(887, 24, 14),
	}),
	new Token(SqlLexer.Identifier, "d1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(891, 24, 18),
			}),
		],
		location: new SourceLocation(892, 24, 19),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(894, 24, 21),
			}),
		],
		location: new SourceLocation(895, 24, 22),
	}),
	new Token(SqlLexer.Identifier, "d1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(897, 24, 24),
			}),
		],
		location: new SourceLocation(898, 24, 25),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(900, 24, 27) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(902, 24, 29),
			}),
		],
		location: new SourceLocation(901, 24, 28),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(903, 24, 30),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(904, 24, 31),
			}),
		],
		location: new SourceLocation(905, 24, 32),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(906, 24, 33) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(908, 24, 35),
			}),
		],
		location: new SourceLocation(907, 24, 34),
	}),
	new Token(SqlLexer.Reserved, "NATURAL", {
		keyword: SqlLexer.NATURAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(909, 25, 1),
			}),
		],
		location: new SourceLocation(911, 25, 3),
	}),
	new Token(SqlLexer.Reserved, "LEFT", {
		keyword: SqlLexer.LEFT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(918, 25, 10),
			}),
		],
		location: new SourceLocation(919, 25, 11),
	}),
	new Token(SqlLexer.Reserved, "OUTER", {
		keyword: SqlLexer.OUTER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(923, 25, 15),
			}),
		],
		location: new SourceLocation(924, 25, 16),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(929, 25, 21),
			}),
		],
		location: new SourceLocation(930, 25, 22),
	}),
	new Token(SqlLexer.Identifier, "d2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(934, 25, 26),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(937, 25, 29),
			}),
		],
		location: new SourceLocation(935, 25, 27),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(938, 26, 1),
			}),
		],
		location: new SourceLocation(942, 26, 5),
	}),
	new Token(SqlLexer.Identifier, "d2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(944, 26, 7),
			}),
		],
		location: new SourceLocation(945, 26, 8),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(947, 26, 10) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(949, 26, 12),
			}),
		],
		location: new SourceLocation(948, 26, 11),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(950, 26, 13),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(951, 26, 14),
			}),
		],
		location: new SourceLocation(952, 26, 15),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(953, 26, 16) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(955, 26, 18),
			}),
		],
		location: new SourceLocation(954, 26, 17),
	}),
	new Token(SqlLexer.Reserved, "RIGHT", {
		keyword: SqlLexer.RIGHT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(956, 27, 1),
			}),
		],
		location: new SourceLocation(958, 27, 3),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(963, 27, 8),
			}),
		],
		location: new SourceLocation(964, 27, 9),
	}),
	new Token(SqlLexer.Identifier, "e", {
		keyword: SqlLexer.E,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(968, 27, 13),
			}),
		],
		location: new SourceLocation(969, 27, 14),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(970, 27, 15),
			}),
		],
		location: new SourceLocation(971, 27, 16),
	}),
	new Token(SqlLexer.Identifier, "e", {
		keyword: SqlLexer.E,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(973, 27, 18),
			}),
		],
		location: new SourceLocation(974, 27, 19),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(975, 27, 20) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(977, 27, 22),
			}),
		],
		location: new SourceLocation(976, 27, 21),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(978, 27, 23),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(979, 27, 24),
			}),
		],
		location: new SourceLocation(980, 27, 25),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(981, 27, 26) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(983, 27, 28),
			}),
		],
		location: new SourceLocation(982, 27, 27),
	}),
	new Token(SqlLexer.Reserved, "RIGHT", {
		keyword: SqlLexer.RIGHT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(984, 28, 1),
			}),
		],
		location: new SourceLocation(986, 28, 3),
	}),
	new Token(SqlLexer.Reserved, "OUTER", {
		keyword: SqlLexer.OUTER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(991, 28, 8),
			}),
		],
		location: new SourceLocation(992, 28, 9),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(997, 28, 14),
			}),
		],
		location: new SourceLocation(998, 28, 15),
	}),
	new Token(SqlLexer.Identifier, "e1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1002, 28, 19),
			}),
		],
		location: new SourceLocation(1003, 28, 20),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1005, 28, 22),
			}),
		],
		location: new SourceLocation(1006, 28, 23),
	}),
	new Token(SqlLexer.Identifier, "e1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1008, 28, 25),
			}),
		],
		location: new SourceLocation(1009, 28, 26),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1011, 28, 28) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1013, 28, 30),
			}),
		],
		location: new SourceLocation(1012, 28, 29),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1014, 28, 31),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1015, 28, 32),
			}),
		],
		location: new SourceLocation(1016, 28, 33),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1017, 28, 34) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1019, 28, 36),
			}),
		],
		location: new SourceLocation(1018, 28, 35),
	}),
	new Token(SqlLexer.Reserved, "NATURAL", {
		keyword: SqlLexer.NATURAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(1020, 29, 1),
			}),
		],
		location: new SourceLocation(1022, 29, 3),
	}),
	new Token(SqlLexer.Reserved, "RIGHT", {
		keyword: SqlLexer.RIGHT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1029, 29, 10),
			}),
		],
		location: new SourceLocation(1030, 29, 11),
	}),
	new Token(SqlLexer.Reserved, "OUTER", {
		keyword: SqlLexer.OUTER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1035, 29, 16),
			}),
		],
		location: new SourceLocation(1036, 29, 17),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1041, 29, 22),
			}),
		],
		location: new SourceLocation(1042, 29, 23),
	}),
	new Token(SqlLexer.Identifier, "e2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1046, 29, 27),
			}),
		],
		location: new SourceLocation(1047, 29, 28),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1049, 29, 30),
			}),
		],
		location: new SourceLocation(1050, 29, 31),
	}),
	new Token(SqlLexer.Identifier, "e2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1052, 29, 33),
			}),
		],
		location: new SourceLocation(1053, 29, 34),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1055, 29, 36) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1057, 29, 38),
			}),
		],
		location: new SourceLocation(1056, 29, 37),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1058, 29, 39),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1059, 29, 40),
			}),
		],
		location: new SourceLocation(1060, 29, 41),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1061, 29, 42) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1063, 29, 44),
			}),
		],
		location: new SourceLocation(1062, 29, 43),
	}),
	new Token(SqlLexer.Identifier, "FULL", {
		keyword: SqlLexer.FULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(1064, 30, 1),
			}),
		],
		location: new SourceLocation(1066, 30, 3),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1070, 30, 7),
			}),
		],
		location: new SourceLocation(1071, 30, 8),
	}),
	new Token(SqlLexer.Identifier, "f", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1075, 30, 12),
			}),
		],
		location: new SourceLocation(1076, 30, 13),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1077, 30, 14),
			}),
		],
		location: new SourceLocation(1078, 30, 15),
	}),
	new Token(SqlLexer.Identifier, "f", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1080, 30, 17),
			}),
		],
		location: new SourceLocation(1081, 30, 18),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1082, 30, 19) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1084, 30, 21),
			}),
		],
		location: new SourceLocation(1083, 30, 20),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1085, 30, 22),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1086, 30, 23),
			}),
		],
		location: new SourceLocation(1087, 30, 24),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1088, 30, 25) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1090, 30, 27),
			}),
		],
		location: new SourceLocation(1089, 30, 26),
	}),
	new Token(SqlLexer.Identifier, "FULL", {
		keyword: SqlLexer.FULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(1091, 31, 1),
			}),
		],
		location: new SourceLocation(1093, 31, 3),
	}),
	new Token(SqlLexer.Reserved, "OUTER", {
		keyword: SqlLexer.OUTER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1097, 31, 7),
			}),
		],
		location: new SourceLocation(1098, 31, 8),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1103, 31, 13),
			}),
		],
		location: new SourceLocation(1104, 31, 14),
	}),
	new Token(SqlLexer.Identifier, "f1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1108, 31, 18),
			}),
		],
		location: new SourceLocation(1109, 31, 19),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1111, 31, 21),
			}),
		],
		location: new SourceLocation(1112, 31, 22),
	}),
	new Token(SqlLexer.Identifier, "f1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1114, 31, 24),
			}),
		],
		location: new SourceLocation(1115, 31, 25),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1117, 31, 27) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1119, 31, 29),
			}),
		],
		location: new SourceLocation(1118, 31, 28),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1120, 31, 30),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1121, 31, 31),
			}),
		],
		location: new SourceLocation(1122, 31, 32),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1123, 31, 33) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1125, 31, 35),
			}),
		],
		location: new SourceLocation(1124, 31, 34),
	}),
	new Token(SqlLexer.Reserved, "NATURAL", {
		keyword: SqlLexer.NATURAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(1126, 32, 1),
			}),
		],
		location: new SourceLocation(1128, 32, 3),
	}),
	new Token(SqlLexer.Identifier, "FULL", {
		keyword: SqlLexer.FULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1135, 32, 10),
			}),
		],
		location: new SourceLocation(1136, 32, 11),
	}),
	new Token(SqlLexer.Reserved, "OUTER", {
		keyword: SqlLexer.OUTER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1140, 32, 15),
			}),
		],
		location: new SourceLocation(1141, 32, 16),
	}),
	new Token(SqlLexer.Reserved, "JOIN", {
		keyword: SqlLexer.JOIN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1146, 32, 21),
			}),
		],
		location: new SourceLocation(1147, 32, 22),
	}),
	new Token(SqlLexer.Identifier, "f2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1151, 32, 26),
			}),
		],
		location: new SourceLocation(1152, 32, 27),
	}),
	new Token(SqlLexer.Reserved, "ON", {
		keyword: SqlLexer.ON,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1154, 32, 29),
			}),
		],
		location: new SourceLocation(1155, 32, 30),
	}),
	new Token(SqlLexer.Identifier, "f2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1157, 32, 32),
			}),
		],
		location: new SourceLocation(1158, 32, 33),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1160, 32, 35) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1162, 32, 37),
			}),
		],
		location: new SourceLocation(1161, 32, 36),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1163, 32, 38),
	}),
	new Token(SqlLexer.Identifier, "a", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1164, 32, 39),
			}),
		],
		location: new SourceLocation(1165, 32, 40),
	}),
	new Token(SqlLexer.Dot, ".", { location: new SourceLocation(1166, 32, 41) }),
	new Token(SqlLexer.Identifier, "x", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1168, 32, 43),
			}),
		],
		location: new SourceLocation(1167, 32, 42),
	}),
	new Token(SqlLexer.Reserved, "LIMIT", {
		keyword: SqlLexer.LIMIT,
		location: new SourceLocation(1169, 33, 1),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1174, 33, 6),
			}),
		],
		location: new SourceLocation(1175, 33, 7),
	}),
	new Token(SqlLexer.Identifier, "OFFSET", {
		keyword: SqlLexer.OFFSET,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1176, 33, 8),
			}),
		],
		location: new SourceLocation(1177, 33, 9),
	}),
	new Token(SqlLexer.Numeric, "2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1183, 33, 15),
			}),
		],
		location: new SourceLocation(1184, 33, 16),
	}),
	new Token(SqlLexer.EoF, "", { location: new SourceLocation(1185, 33, 17) }),
];
