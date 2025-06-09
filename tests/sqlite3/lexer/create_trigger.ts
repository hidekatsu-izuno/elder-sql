import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "TRIGGER", {
		keyword: SqlKeywords.TRIGGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "update_customer_address", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(14, 1, 14),
			}),
		],
		location: new SourceLocation(15, 1, 15),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(38, 1, 38),
			}),
		],
		location: new SourceLocation(39, 1, 39),
	}),
	new Token(SqlTokenType.Identifier, "OF", {
		keyword: SqlKeywords.OF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(45, 1, 45),
			}),
		],
		location: new SourceLocation(46, 1, 46),
	}),
	new Token(SqlTokenType.Identifier, "address", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(48, 1, 48),
			}),
		],
		location: new SourceLocation(49, 1, 49),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(56, 1, 56),
			}),
		],
		location: new SourceLocation(57, 1, 57),
	}),
	new Token(SqlTokenType.Identifier, "customers", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(59, 1, 59),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(69, 1, 69),
			}),
		],
		location: new SourceLocation(60, 1, 60),
	}),
	new Token(SqlTokenType.Identifier, "FOR", {
		keyword: SqlKeywords.FOR,
		location: new SourceLocation(70, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "EACH", {
		keyword: SqlKeywords.EACH,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(73, 2, 4),
			}),
		],
		location: new SourceLocation(74, 2, 5),
	}),
	new Token(SqlTokenType.Identifier, "ROW", {
		keyword: SqlKeywords.ROW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(78, 2, 9),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(82, 2, 13),
			}),
		],
		location: new SourceLocation(79, 2, 10),
	}),
	new Token(SqlTokenType.Identifier, "BEGIN", {
		keyword: SqlKeywords.BEGIN,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(88, 3, 6),
			}),
		],
		location: new SourceLocation(83, 3, 1),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(89, 4, 1),
			}),
		],
		location: new SourceLocation(91, 4, 3),
	}),
	new Token(SqlTokenType.Identifier, "orders", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(97, 4, 9),
			}),
		],
		location: new SourceLocation(98, 4, 10),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(104, 4, 16),
			}),
		],
		location: new SourceLocation(105, 4, 17),
	}),
	new Token(SqlTokenType.Identifier, "address", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(108, 4, 20),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(116, 4, 28),
			}),
		],
		location: new SourceLocation(109, 4, 21),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(117, 4, 29),
	}),
	new Token(SqlTokenType.Identifier, "new", {
		keyword: SqlKeywords.NEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(118, 4, 30),
			}),
		],
		location: new SourceLocation(119, 4, 31),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(122, 4, 34),
	}),
	new Token(SqlTokenType.Identifier, "address", {
		location: new SourceLocation(123, 4, 35),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(130, 4, 42),
			}),
		],
		location: new SourceLocation(131, 4, 43),
	}),
	new Token(SqlTokenType.Identifier, "customer_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(136, 4, 48),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(150, 4, 62),
			}),
		],
		location: new SourceLocation(137, 4, 49),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(151, 4, 63),
	}),
	new Token(SqlTokenType.Identifier, "old", {
		keyword: SqlKeywords.OLD,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(152, 4, 64),
			}),
		],
		location: new SourceLocation(153, 4, 65),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(156, 4, 68),
	}),
	new Token(SqlTokenType.Identifier, "name", {
		keyword: SqlKeywords.NAME,
		location: new SourceLocation(157, 4, 69),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(162, 4, 74),
			}),
		],
		location: new SourceLocation(161, 4, 73),
	}),
	new Token(SqlTokenType.Identifier, "END", {
		keyword: SqlKeywords.END,
		location: new SourceLocation(163, 5, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(167, 5, 5),
			}),
		],
		location: new SourceLocation(166, 5, 4),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(168, 6, 1),
	}),
	new Token(SqlTokenType.Identifier, "TEMP", {
		keyword: SqlKeywords.TEMP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(174, 6, 7),
			}),
		],
		location: new SourceLocation(175, 6, 8),
	}),
	new Token(SqlTokenType.Identifier, "TRIGGER", {
		keyword: SqlKeywords.TRIGGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(179, 6, 12),
			}),
		],
		location: new SourceLocation(180, 6, 13),
	}),
	new Token(SqlTokenType.Identifier, "ex1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(187, 6, 20),
			}),
		],
		location: new SourceLocation(188, 6, 21),
	}),
	new Token(SqlTokenType.Identifier, "AFTER", {
		keyword: SqlKeywords.AFTER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(191, 6, 24),
			}),
		],
		location: new SourceLocation(192, 6, 25),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(197, 6, 30),
			}),
		],
		location: new SourceLocation(198, 6, 31),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(204, 6, 37),
			}),
		],
		location: new SourceLocation(205, 6, 38),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(207, 6, 40),
			}),
		],
		location: new SourceLocation(208, 6, 41),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(212, 6, 45),
	}),
	new Token(SqlTokenType.Identifier, "tab1", {
		location: new SourceLocation(213, 6, 46),
	}),
	new Token(SqlTokenType.Identifier, "BEGIN", {
		keyword: SqlKeywords.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(217, 6, 50),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(223, 6, 56),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(224, 6, 57),
			}),
		],
		location: new SourceLocation(218, 6, 51),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(225, 7, 1),
			}),
		],
		location: new SourceLocation(227, 7, 3),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeywords.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(233, 7, 9),
			}),
		],
		location: new SourceLocation(234, 7, 10),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(238, 7, 14),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(245, 7, 21),
			}),
		],
		location: new SourceLocation(239, 7, 15),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(246, 7, 22),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		location: new SourceLocation(247, 7, 23),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(248, 7, 24),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeywords.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(249, 7, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(256, 7, 32),
			}),
		],
		location: new SourceLocation(250, 7, 26),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(257, 7, 33),
	}),
	new Token(SqlTokenType.Identifier, "NEW", {
		keyword: SqlKeywords.NEW,
		location: new SourceLocation(258, 7, 34),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(261, 7, 37),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		location: new SourceLocation(262, 7, 38),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(263, 7, 39),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(265, 7, 41),
			}),
		],
		location: new SourceLocation(264, 7, 40),
	}),
	new Token(SqlTokenType.Identifier, "END", {
		keyword: SqlKeywords.END,
		location: new SourceLocation(266, 8, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(270, 8, 5),
			}),
		],
		location: new SourceLocation(269, 8, 4),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(271, 9, 1),
	}),
	new Token(SqlTokenType.Identifier, "TRIGGER", {
		keyword: SqlKeywords.TRIGGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(277, 9, 7),
			}),
		],
		location: new SourceLocation(278, 9, 8),
	}),
	new Token(SqlTokenType.Identifier, "cust_addr_chng", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(285, 9, 15),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(300, 9, 30),
			}),
		],
		location: new SourceLocation(286, 9, 16),
	}),
	new Token(SqlTokenType.Identifier, "INSTEAD", {
		keyword: SqlKeywords.INSTEAD,
		location: new SourceLocation(301, 10, 1),
	}),
	new Token(SqlTokenType.Identifier, "OF", {
		keyword: SqlKeywords.OF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(308, 10, 8),
			}),
		],
		location: new SourceLocation(309, 10, 9),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(311, 10, 11),
			}),
		],
		location: new SourceLocation(312, 10, 12),
	}),
	new Token(SqlTokenType.Identifier, "OF", {
		keyword: SqlKeywords.OF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(318, 10, 18),
			}),
		],
		location: new SourceLocation(319, 10, 19),
	}),
	new Token(SqlTokenType.Identifier, "cust_addr", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(321, 10, 21),
			}),
		],
		location: new SourceLocation(322, 10, 22),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(331, 10, 31),
			}),
		],
		location: new SourceLocation(332, 10, 32),
	}),
	new Token(SqlTokenType.Identifier, "customer_address", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(334, 10, 34),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(351, 10, 51),
			}),
		],
		location: new SourceLocation(335, 10, 35),
	}),
	new Token(SqlTokenType.Identifier, "BEGIN", {
		keyword: SqlKeywords.BEGIN,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(357, 11, 6),
			}),
		],
		location: new SourceLocation(352, 11, 1),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(358, 12, 1),
			}),
		],
		location: new SourceLocation(360, 12, 3),
	}),
	new Token(SqlTokenType.Identifier, "customer", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(366, 12, 9),
			}),
		],
		location: new SourceLocation(367, 12, 10),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(375, 12, 18),
			}),
		],
		location: new SourceLocation(376, 12, 19),
	}),
	new Token(SqlTokenType.Identifier, "cust_addr", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(379, 12, 22),
			}),
		],
		location: new SourceLocation(380, 12, 23),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(389, 12, 32),
	}),
	new Token(SqlTokenType.Identifier, "NEW", {
		keyword: SqlKeywords.NEW,
		location: new SourceLocation(390, 12, 33),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(393, 12, 36),
	}),
	new Token(SqlTokenType.Identifier, "cust_addr", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(403, 12, 46),
			}),
		],
		location: new SourceLocation(394, 12, 37),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(404, 13, 1),
			}),
		],
		location: new SourceLocation(407, 13, 4),
	}),
	new Token(SqlTokenType.Identifier, "cust_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(412, 13, 9),
			}),
		],
		location: new SourceLocation(413, 13, 10),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(420, 13, 17),
	}),
	new Token(SqlTokenType.Identifier, "OLD", {
		keyword: SqlKeywords.OLD,
		location: new SourceLocation(421, 13, 18),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(424, 13, 21),
	}),
	new Token(SqlTokenType.Identifier, "cust_id", {
		location: new SourceLocation(425, 13, 22),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(433, 13, 30),
			}),
		],
		location: new SourceLocation(432, 13, 29),
	}),
	new Token(SqlTokenType.Identifier, "END", {
		keyword: SqlKeywords.END,
		location: new SourceLocation(434, 14, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(438, 14, 5),
			}),
		],
		location: new SourceLocation(437, 14, 4),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(439, 15, 1),
	}),
	new Token(SqlTokenType.Identifier, "TEMP", {
		keyword: SqlKeywords.TEMP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(445, 15, 7),
			}),
		],
		location: new SourceLocation(446, 15, 8),
	}),
	new Token(SqlTokenType.Identifier, "TRIGGER", {
		keyword: SqlKeywords.TRIGGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(450, 15, 12),
			}),
		],
		location: new SourceLocation(451, 15, 13),
	}),
	new Token(SqlTokenType.Identifier, "ex2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(458, 15, 20),
			}),
		],
		location: new SourceLocation(459, 15, 21),
	}),
	new Token(SqlTokenType.Identifier, "BEFORE", {
		keyword: SqlKeywords.BEFORE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(462, 15, 24),
			}),
		],
		location: new SourceLocation(463, 15, 25),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeywords.INSERT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(469, 15, 31),
			}),
		],
		location: new SourceLocation(470, 15, 32),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(476, 15, 38),
			}),
		],
		location: new SourceLocation(477, 15, 39),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(479, 15, 41),
			}),
		],
		location: new SourceLocation(480, 15, 42),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(484, 15, 46),
	}),
	new Token(SqlTokenType.Identifier, "tab1", {
		location: new SourceLocation(485, 15, 47),
	}),
	new Token(SqlTokenType.Identifier, "BEGIN", {
		keyword: SqlKeywords.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(489, 15, 51),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(495, 15, 57),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(496, 15, 58),
			}),
		],
		location: new SourceLocation(490, 15, 52),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeywords.DELETE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(497, 16, 1),
			}),
		],
		location: new SourceLocation(499, 16, 3),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(505, 16, 9),
			}),
		],
		location: new SourceLocation(506, 16, 10),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(510, 16, 14),
			}),
		],
		location: new SourceLocation(511, 16, 15),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(517, 16, 21),
			}),
		],
		location: new SourceLocation(518, 16, 22),
	}),
	new Token(SqlTokenType.Identifier, "OLD", {
		keyword: SqlKeywords.OLD,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(523, 16, 27),
			}),
		],
		location: new SourceLocation(524, 16, 28),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(527, 16, 31),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(529, 16, 33),
			}),
		],
		location: new SourceLocation(528, 16, 32),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(530, 16, 34),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(531, 16, 35),
			}),
		],
		location: new SourceLocation(532, 16, 36),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(534, 16, 38),
			}),
		],
		location: new SourceLocation(533, 16, 37),
	}),
	new Token(SqlTokenType.Identifier, "END", {
		keyword: SqlKeywords.END,
		location: new SourceLocation(535, 17, 1),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(538, 17, 4),
	}),
];
