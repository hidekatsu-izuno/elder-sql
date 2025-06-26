import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../../../src/sql.ts";

export default [
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlLexer.Identifier, "films", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(12, 1, 12),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(18, 1, 18),
			}),
		],
		location: new SourceLocation(13, 1, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(SqlLexer.Identifier, "code", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(21, 2, 1),
			}),
		],
		location: new SourceLocation(25, 2, 5),
	}),
	new Token(SqlLexer.Identifier, "char", {
		keyword: SqlLexer.CHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(29, 2, 9),
			}),
		],
		location: new SourceLocation(37, 2, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(41, 2, 21),
	}),
	new Token(SqlLexer.Numeric, "5", { location: new SourceLocation(42, 2, 22) }),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(43, 2, 23),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(44, 2, 24),
			}),
		],
		location: new SourceLocation(45, 2, 25),
	}),
	new Token(SqlLexer.Identifier, "firstkey", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(55, 2, 35),
			}),
		],
		location: new SourceLocation(56, 2, 36),
	}),
	new Token(SqlLexer.Reserved, "PRIMARY", {
		keyword: SqlLexer.PRIMARY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(64, 2, 44),
			}),
		],
		location: new SourceLocation(65, 2, 45),
	}),
	new Token(SqlLexer.Identifier, "KEY", {
		keyword: SqlLexer.KEY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(72, 2, 52),
			}),
		],
		location: new SourceLocation(73, 2, 53),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(77, 2, 57),
			}),
		],
		location: new SourceLocation(76, 2, 56),
	}),
	new Token(SqlLexer.Identifier, "title", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(78, 3, 1),
			}),
		],
		location: new SourceLocation(82, 3, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(87, 3, 10),
			}),
		],
		location: new SourceLocation(94, 3, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(101, 3, 24),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(102, 3, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(104, 3, 27),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(105, 3, 28),
			}),
		],
		location: new SourceLocation(106, 3, 29),
	}),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(109, 3, 32),
			}),
		],
		location: new SourceLocation(110, 3, 33),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(115, 3, 38),
			}),
		],
		location: new SourceLocation(114, 3, 37),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(116, 4, 1),
			}),
		],
		location: new SourceLocation(120, 4, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(123, 4, 8),
			}),
		],
		location: new SourceLocation(132, 4, 17),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(139, 4, 24),
			}),
		],
		location: new SourceLocation(140, 4, 25),
	}),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(143, 4, 28),
			}),
		],
		location: new SourceLocation(144, 4, 29),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(149, 4, 34),
			}),
		],
		location: new SourceLocation(148, 4, 33),
	}),
	new Token(SqlLexer.Identifier, "date_prod", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(150, 5, 1),
			}),
		],
		location: new SourceLocation(154, 5, 5),
	}),
	new Token(SqlLexer.Identifier, "date", {
		keyword: SqlLexer.DATE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "   ", {
				location: new SourceLocation(163, 5, 14),
			}),
		],
		location: new SourceLocation(166, 5, 17),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(171, 5, 22),
			}),
		],
		location: new SourceLocation(170, 5, 21),
	}),
	new Token(SqlLexer.Identifier, "kind", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(172, 6, 1),
			}),
		],
		location: new SourceLocation(176, 6, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(180, 6, 9),
			}),
		],
		location: new SourceLocation(188, 6, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(195, 6, 24),
	}),
	new Token(SqlLexer.Numeric, "10", {
		location: new SourceLocation(196, 6, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(198, 6, 27),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(200, 6, 29),
			}),
		],
		location: new SourceLocation(199, 6, 28),
	}),
	new Token(SqlLexer.Identifier, "len", {
		keyword: SqlLexer.LEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(201, 7, 1),
			}),
		],
		location: new SourceLocation(205, 7, 5),
	}),
	new Token(SqlLexer.Identifier, "interval", {
		keyword: SqlLexer.INTERVAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(208, 7, 8),
			}),
		],
		location: new SourceLocation(217, 7, 17),
	}),
	new Token(SqlLexer.Identifier, "hour", {
		keyword: SqlLexer.HOUR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(225, 7, 25),
			}),
		],
		location: new SourceLocation(226, 7, 26),
	}),
	new Token(SqlLexer.Reserved, "to", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(230, 7, 30),
			}),
		],
		location: new SourceLocation(231, 7, 31),
	}),
	new Token(SqlLexer.Identifier, "minute", {
		keyword: SqlLexer.MINUTE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(233, 7, 33),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(240, 7, 40),
			}),
		],
		location: new SourceLocation(234, 7, 34),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(241, 8, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(242, 8, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(243, 8, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(244, 9, 1),
			}),
		],
		location: new SourceLocation(245, 10, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(251, 10, 7),
			}),
		],
		location: new SourceLocation(252, 10, 8),
	}),
	new Token(SqlLexer.Identifier, "films", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(257, 10, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(263, 10, 19),
			}),
		],
		location: new SourceLocation(258, 10, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(265, 10, 21),
			}),
		],
		location: new SourceLocation(264, 10, 20),
	}),
	new Token(SqlLexer.Identifier, "code", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(266, 11, 1),
			}),
		],
		location: new SourceLocation(270, 11, 5),
	}),
	new Token(SqlLexer.Identifier, "char", {
		keyword: SqlLexer.CHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(274, 11, 9),
			}),
		],
		location: new SourceLocation(282, 11, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(286, 11, 21),
	}),
	new Token(SqlLexer.Numeric, "5", {
		location: new SourceLocation(287, 11, 22),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(288, 11, 23),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(290, 11, 25),
			}),
		],
		location: new SourceLocation(289, 11, 24),
	}),
	new Token(SqlLexer.Identifier, "title", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(291, 12, 1),
			}),
		],
		location: new SourceLocation(295, 12, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(300, 12, 10),
			}),
		],
		location: new SourceLocation(307, 12, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(314, 12, 24),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(315, 12, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(317, 12, 27),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(319, 12, 29),
			}),
		],
		location: new SourceLocation(318, 12, 28),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(320, 13, 1),
			}),
		],
		location: new SourceLocation(324, 13, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(327, 13, 8),
			}),
		],
		location: new SourceLocation(336, 13, 17),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(344, 13, 25),
			}),
		],
		location: new SourceLocation(343, 13, 24),
	}),
	new Token(SqlLexer.Identifier, "date_prod", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(345, 14, 1),
			}),
		],
		location: new SourceLocation(349, 14, 5),
	}),
	new Token(SqlLexer.Identifier, "date", {
		keyword: SqlLexer.DATE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "   ", {
				location: new SourceLocation(358, 14, 14),
			}),
		],
		location: new SourceLocation(361, 14, 17),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(366, 14, 22),
			}),
		],
		location: new SourceLocation(365, 14, 21),
	}),
	new Token(SqlLexer.Identifier, "kind", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(367, 15, 1),
			}),
		],
		location: new SourceLocation(371, 15, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(375, 15, 9),
			}),
		],
		location: new SourceLocation(383, 15, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(390, 15, 24),
	}),
	new Token(SqlLexer.Numeric, "10", {
		location: new SourceLocation(391, 15, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(393, 15, 27),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(395, 15, 29),
			}),
		],
		location: new SourceLocation(394, 15, 28),
	}),
	new Token(SqlLexer.Identifier, "len", {
		keyword: SqlLexer.LEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(396, 16, 1),
			}),
		],
		location: new SourceLocation(400, 16, 5),
	}),
	new Token(SqlLexer.Identifier, "interval", {
		keyword: SqlLexer.INTERVAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(403, 16, 8),
			}),
		],
		location: new SourceLocation(412, 16, 17),
	}),
	new Token(SqlLexer.Identifier, "hour", {
		keyword: SqlLexer.HOUR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(420, 16, 25),
			}),
		],
		location: new SourceLocation(421, 16, 26),
	}),
	new Token(SqlLexer.Reserved, "to", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(425, 16, 30),
			}),
		],
		location: new SourceLocation(426, 16, 31),
	}),
	new Token(SqlLexer.Identifier, "minute", {
		keyword: SqlLexer.MINUTE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(428, 16, 33),
			}),
		],
		location: new SourceLocation(429, 16, 34),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(436, 16, 41),
			}),
		],
		location: new SourceLocation(435, 16, 40),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(437, 17, 1),
			}),
		],
		location: new SourceLocation(441, 17, 5),
	}),
	new Token(SqlLexer.Identifier, "production", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(451, 17, 15),
			}),
		],
		location: new SourceLocation(452, 17, 16),
	}),
	new Token(SqlLexer.Reserved, "UNIQUE", {
		keyword: SqlLexer.UNIQUE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(462, 17, 26),
			}),
		],
		location: new SourceLocation(463, 17, 27),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(469, 17, 33),
	}),
	new Token(SqlLexer.Identifier, "date_prod", {
		location: new SourceLocation(470, 17, 34),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(480, 17, 44),
			}),
		],
		location: new SourceLocation(479, 17, 43),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(481, 18, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(482, 18, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(483, 18, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(484, 19, 1),
			}),
		],
		location: new SourceLocation(485, 20, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(491, 20, 7),
			}),
		],
		location: new SourceLocation(492, 20, 8),
	}),
	new Token(SqlLexer.Identifier, "films", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(497, 20, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(503, 20, 19),
			}),
		],
		location: new SourceLocation(498, 20, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(505, 20, 21),
			}),
		],
		location: new SourceLocation(504, 20, 20),
	}),
	new Token(SqlLexer.Identifier, "code", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(506, 21, 1),
			}),
		],
		location: new SourceLocation(510, 21, 5),
	}),
	new Token(SqlLexer.Identifier, "char", {
		keyword: SqlLexer.CHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(514, 21, 9),
			}),
		],
		location: new SourceLocation(522, 21, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(526, 21, 21),
	}),
	new Token(SqlLexer.Numeric, "5", {
		location: new SourceLocation(527, 21, 22),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(528, 21, 23),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(530, 21, 25),
			}),
		],
		location: new SourceLocation(529, 21, 24),
	}),
	new Token(SqlLexer.Identifier, "title", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(531, 22, 1),
			}),
		],
		location: new SourceLocation(535, 22, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(540, 22, 10),
			}),
		],
		location: new SourceLocation(547, 22, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(554, 22, 24),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(555, 22, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(557, 22, 27),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(559, 22, 29),
			}),
		],
		location: new SourceLocation(558, 22, 28),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(560, 23, 1),
			}),
		],
		location: new SourceLocation(564, 23, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(567, 23, 8),
			}),
		],
		location: new SourceLocation(576, 23, 17),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(584, 23, 25),
			}),
		],
		location: new SourceLocation(583, 23, 24),
	}),
	new Token(SqlLexer.Identifier, "date_prod", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(585, 24, 1),
			}),
		],
		location: new SourceLocation(589, 24, 5),
	}),
	new Token(SqlLexer.Identifier, "date", {
		keyword: SqlLexer.DATE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "   ", {
				location: new SourceLocation(598, 24, 14),
			}),
		],
		location: new SourceLocation(601, 24, 17),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(606, 24, 22),
			}),
		],
		location: new SourceLocation(605, 24, 21),
	}),
	new Token(SqlLexer.Identifier, "kind", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(607, 25, 1),
			}),
		],
		location: new SourceLocation(611, 25, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(615, 25, 9),
			}),
		],
		location: new SourceLocation(623, 25, 17),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(630, 25, 24),
	}),
	new Token(SqlLexer.Numeric, "10", {
		location: new SourceLocation(631, 25, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(633, 25, 27),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(635, 25, 29),
			}),
		],
		location: new SourceLocation(634, 25, 28),
	}),
	new Token(SqlLexer.Identifier, "len", {
		keyword: SqlLexer.LEN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(636, 26, 1),
			}),
		],
		location: new SourceLocation(640, 26, 5),
	}),
	new Token(SqlLexer.Identifier, "interval", {
		keyword: SqlLexer.INTERVAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(643, 26, 8),
			}),
		],
		location: new SourceLocation(652, 26, 17),
	}),
	new Token(SqlLexer.Identifier, "hour", {
		keyword: SqlLexer.HOUR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(660, 26, 25),
			}),
		],
		location: new SourceLocation(661, 26, 26),
	}),
	new Token(SqlLexer.Reserved, "to", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(665, 26, 30),
			}),
		],
		location: new SourceLocation(666, 26, 31),
	}),
	new Token(SqlLexer.Identifier, "minute", {
		keyword: SqlLexer.MINUTE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(668, 26, 33),
			}),
		],
		location: new SourceLocation(669, 26, 34),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(676, 26, 41),
			}),
		],
		location: new SourceLocation(675, 26, 40),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(677, 27, 1),
			}),
		],
		location: new SourceLocation(681, 27, 5),
	}),
	new Token(SqlLexer.Identifier, "code_title", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(691, 27, 15),
			}),
		],
		location: new SourceLocation(692, 27, 16),
	}),
	new Token(SqlLexer.Reserved, "PRIMARY", {
		keyword: SqlLexer.PRIMARY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(702, 27, 26),
			}),
		],
		location: new SourceLocation(703, 27, 27),
	}),
	new Token(SqlLexer.Identifier, "KEY", {
		keyword: SqlLexer.KEY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(710, 27, 34),
			}),
		],
		location: new SourceLocation(711, 27, 35),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(714, 27, 38),
	}),
	new Token(SqlLexer.Identifier, "code", {
		location: new SourceLocation(715, 27, 39),
	}),
	new Token(SqlLexer.Comma, ",", { location: new SourceLocation(719, 27, 43) }),
	new Token(SqlLexer.Identifier, "title", {
		location: new SourceLocation(720, 27, 44),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(726, 27, 50),
			}),
		],
		location: new SourceLocation(725, 27, 49),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(727, 28, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(728, 28, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(729, 28, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(730, 29, 1),
			}),
		],
		location: new SourceLocation(731, 30, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(737, 30, 7),
			}),
		],
		location: new SourceLocation(738, 30, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(743, 30, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(756, 30, 26),
			}),
		],
		location: new SourceLocation(744, 30, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(758, 30, 28),
			}),
		],
		location: new SourceLocation(757, 30, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(759, 31, 1),
			}),
		],
		location: new SourceLocation(764, 31, 6),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(767, 31, 9),
			}),
		],
		location: new SourceLocation(771, 31, 13),
	}),
	new Token(SqlLexer.Reserved, "PRIMARY", {
		keyword: SqlLexer.PRIMARY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(778, 31, 20),
			}),
		],
		location: new SourceLocation(779, 31, 21),
	}),
	new Token(SqlLexer.Identifier, "KEY", {
		keyword: SqlLexer.KEY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(786, 31, 28),
			}),
		],
		location: new SourceLocation(787, 31, 29),
	}),
	new Token(SqlLexer.Identifier, "GENERATED", {
		keyword: SqlLexer.GENERATED,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(790, 31, 32),
			}),
		],
		location: new SourceLocation(791, 31, 33),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(800, 31, 42),
			}),
		],
		location: new SourceLocation(801, 31, 43),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(803, 31, 45),
			}),
		],
		location: new SourceLocation(804, 31, 46),
	}),
	new Token(SqlLexer.Reserved, "AS", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(811, 31, 53),
			}),
		],
		location: new SourceLocation(812, 31, 54),
	}),
	new Token(SqlLexer.Identifier, "IDENTITY", {
		keyword: SqlLexer.IDENTITY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(814, 31, 56),
			}),
		],
		location: new SourceLocation(815, 31, 57),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(824, 31, 66),
			}),
		],
		location: new SourceLocation(823, 31, 65),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(825, 32, 1),
			}),
		],
		location: new SourceLocation(830, 32, 6),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "   ", {
				location: new SourceLocation(834, 32, 10),
			}),
		],
		location: new SourceLocation(837, 32, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(844, 32, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(845, 32, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(847, 32, 23),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(848, 32, 24),
			}),
		],
		location: new SourceLocation(849, 32, 25),
	}),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(852, 32, 28),
			}),
		],
		location: new SourceLocation(853, 32, 29),
	}),
	new Token(SqlLexer.Reserved, "CHECK", {
		keyword: SqlLexer.CHECK,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(857, 32, 33),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(863, 32, 39),
			}),
		],
		location: new SourceLocation(858, 32, 34),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(864, 32, 40),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(869, 32, 45),
			}),
		],
		location: new SourceLocation(865, 32, 41),
	}),
	new Token(SqlLexer.Operator, "<>", {
		location: new SourceLocation(870, 32, 46),
	}),
	new Token(SqlLexer.String, "''", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(872, 32, 48),
			}),
		],
		location: new SourceLocation(873, 32, 49),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(876, 32, 52),
			}),
		],
		location: new SourceLocation(875, 32, 51),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(877, 33, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(878, 33, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(879, 33, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(880, 34, 1),
			}),
		],
		location: new SourceLocation(881, 35, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(887, 35, 7),
			}),
		],
		location: new SourceLocation(888, 35, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(893, 35, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(906, 35, 26),
			}),
		],
		location: new SourceLocation(894, 35, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(908, 35, 28),
			}),
		],
		location: new SourceLocation(907, 35, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(909, 36, 1),
			}),
		],
		location: new SourceLocation(913, 36, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(916, 36, 8),
			}),
		],
		location: new SourceLocation(921, 36, 13),
	}),
	new Token(SqlLexer.Reserved, "CHECK", {
		keyword: SqlLexer.CHECK,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(928, 36, 20),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(934, 36, 26),
			}),
		],
		location: new SourceLocation(929, 36, 21),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(935, 36, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(939, 36, 31),
			}),
		],
		location: new SourceLocation(936, 36, 28),
	}),
	new Token(SqlLexer.Operator, ">", {
		location: new SourceLocation(940, 36, 32),
	}),
	new Token(SqlLexer.Numeric, "100", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(941, 36, 33),
			}),
		],
		location: new SourceLocation(942, 36, 34),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(945, 36, 37),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(947, 36, 39),
			}),
		],
		location: new SourceLocation(946, 36, 38),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(948, 37, 1),
			}),
		],
		location: new SourceLocation(952, 37, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(956, 37, 9),
			}),
		],
		location: new SourceLocation(960, 37, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(967, 37, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(968, 37, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(971, 37, 24),
			}),
		],
		location: new SourceLocation(970, 37, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(972, 38, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(973, 38, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(974, 38, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(975, 39, 1),
			}),
		],
		location: new SourceLocation(976, 40, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(982, 40, 7),
			}),
		],
		location: new SourceLocation(983, 40, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(988, 40, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1001, 40, 26),
			}),
		],
		location: new SourceLocation(989, 40, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1003, 40, 28),
			}),
		],
		location: new SourceLocation(1002, 40, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1004, 41, 1),
			}),
		],
		location: new SourceLocation(1008, 41, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1011, 41, 8),
			}),
		],
		location: new SourceLocation(1016, 41, 13),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1024, 41, 21),
			}),
		],
		location: new SourceLocation(1023, 41, 20),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1025, 42, 1),
			}),
		],
		location: new SourceLocation(1029, 42, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1033, 42, 9),
			}),
		],
		location: new SourceLocation(1037, 42, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1044, 42, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1045, 42, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1047, 42, 23),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1049, 42, 25),
			}),
		],
		location: new SourceLocation(1048, 42, 24),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1050, 43, 1),
			}),
		],
		location: new SourceLocation(1054, 43, 5),
	}),
	new Token(SqlLexer.Identifier, "con1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1064, 43, 15),
			}),
		],
		location: new SourceLocation(1065, 43, 16),
	}),
	new Token(SqlLexer.Reserved, "CHECK", {
		keyword: SqlLexer.CHECK,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1069, 43, 20),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1075, 43, 26),
			}),
		],
		location: new SourceLocation(1070, 43, 21),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1076, 43, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1080, 43, 31),
			}),
		],
		location: new SourceLocation(1077, 43, 28),
	}),
	new Token(SqlLexer.Operator, ">", {
		location: new SourceLocation(1081, 43, 32),
	}),
	new Token(SqlLexer.Numeric, "100", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1082, 43, 33),
			}),
		],
		location: new SourceLocation(1083, 43, 34),
	}),
	new Token(SqlLexer.Reserved, "AND", {
		keyword: SqlLexer.AND,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1086, 43, 37),
			}),
		],
		location: new SourceLocation(1087, 43, 38),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1090, 43, 41),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1095, 43, 46),
			}),
		],
		location: new SourceLocation(1091, 43, 42),
	}),
	new Token(SqlLexer.Operator, "<>", {
		location: new SourceLocation(1096, 43, 47),
	}),
	new Token(SqlLexer.String, "''", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1098, 43, 49),
			}),
		],
		location: new SourceLocation(1099, 43, 50),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1102, 43, 53),
			}),
		],
		location: new SourceLocation(1101, 43, 52),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1103, 44, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1104, 44, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1105, 44, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1106, 45, 1),
			}),
		],
		location: new SourceLocation(1107, 46, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1113, 46, 7),
			}),
		],
		location: new SourceLocation(1114, 46, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1119, 46, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1132, 46, 26),
			}),
		],
		location: new SourceLocation(1120, 46, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1134, 46, 28),
			}),
		],
		location: new SourceLocation(1133, 46, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1135, 47, 1),
			}),
		],
		location: new SourceLocation(1139, 47, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1142, 47, 8),
			}),
		],
		location: new SourceLocation(1147, 47, 13),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1155, 47, 21),
			}),
		],
		location: new SourceLocation(1154, 47, 20),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1156, 48, 1),
			}),
		],
		location: new SourceLocation(1160, 48, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1164, 48, 9),
			}),
		],
		location: new SourceLocation(1168, 48, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1175, 48, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1176, 48, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1178, 48, 23),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1180, 48, 25),
			}),
		],
		location: new SourceLocation(1179, 48, 24),
	}),
	new Token(SqlLexer.Reserved, "PRIMARY", {
		keyword: SqlLexer.PRIMARY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1181, 49, 1),
			}),
		],
		location: new SourceLocation(1185, 49, 5),
	}),
	new Token(SqlLexer.Identifier, "KEY", {
		keyword: SqlLexer.KEY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1192, 49, 12),
			}),
		],
		location: new SourceLocation(1193, 49, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1196, 49, 16),
	}),
	new Token(SqlLexer.Identifier, "did", {
		location: new SourceLocation(1197, 49, 17),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1201, 49, 21),
			}),
		],
		location: new SourceLocation(1200, 49, 20),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1202, 50, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1203, 50, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1204, 50, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1205, 51, 1),
			}),
		],
		location: new SourceLocation(1206, 52, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1212, 52, 7),
			}),
		],
		location: new SourceLocation(1213, 52, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1218, 52, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1231, 52, 26),
			}),
		],
		location: new SourceLocation(1219, 52, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1233, 52, 28),
			}),
		],
		location: new SourceLocation(1232, 52, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1234, 53, 1),
			}),
		],
		location: new SourceLocation(1238, 53, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1241, 53, 8),
			}),
		],
		location: new SourceLocation(1246, 53, 13),
	}),
	new Token(SqlLexer.Reserved, "PRIMARY", {
		keyword: SqlLexer.PRIMARY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1253, 53, 20),
			}),
		],
		location: new SourceLocation(1254, 53, 21),
	}),
	new Token(SqlLexer.Identifier, "KEY", {
		keyword: SqlLexer.KEY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1261, 53, 28),
			}),
		],
		location: new SourceLocation(1262, 53, 29),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1266, 53, 33),
			}),
		],
		location: new SourceLocation(1265, 53, 32),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1267, 54, 1),
			}),
		],
		location: new SourceLocation(1271, 54, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1275, 54, 9),
			}),
		],
		location: new SourceLocation(1279, 54, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1286, 54, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1287, 54, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1290, 54, 24),
			}),
		],
		location: new SourceLocation(1289, 54, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1291, 55, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1292, 55, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1293, 55, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1294, 56, 1),
			}),
		],
		location: new SourceLocation(1295, 57, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1301, 57, 7),
			}),
		],
		location: new SourceLocation(1302, 57, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1307, 57, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1320, 57, 26),
			}),
		],
		location: new SourceLocation(1308, 57, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1322, 57, 28),
			}),
		],
		location: new SourceLocation(1321, 57, 27),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1323, 58, 1),
			}),
		],
		location: new SourceLocation(1327, 58, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "      ", {
				location: new SourceLocation(1331, 58, 9),
			}),
		],
		location: new SourceLocation(1337, 58, 15),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1344, 58, 22),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1345, 58, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1347, 58, 25),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1348, 58, 26),
			}),
		],
		location: new SourceLocation(1349, 58, 27),
	}),
	new Token(SqlLexer.String, "'Luso Films'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1356, 58, 34),
			}),
		],
		location: new SourceLocation(1357, 58, 35),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1370, 58, 48),
			}),
		],
		location: new SourceLocation(1369, 58, 47),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1371, 59, 1),
			}),
		],
		location: new SourceLocation(1375, 59, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(1378, 59, 8),
			}),
		],
		location: new SourceLocation(1385, 59, 15),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1392, 59, 22),
			}),
		],
		location: new SourceLocation(1393, 59, 23),
	}),
	new Token(SqlLexer.Identifier, "nextval", {
		keyword: SqlLexer.NEXTVAL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1400, 59, 30),
			}),
		],
		location: new SourceLocation(1401, 59, 31),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1408, 59, 38),
	}),
	new Token(SqlLexer.String, "'distributors_serial'", {
		location: new SourceLocation(1409, 59, 39),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1430, 59, 60),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1432, 59, 62),
			}),
		],
		location: new SourceLocation(1431, 59, 61),
	}),
	new Token(SqlLexer.Identifier, "modtime", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1433, 60, 1),
			}),
		],
		location: new SourceLocation(1437, 60, 5),
	}),
	new Token(SqlLexer.Identifier, "timestamp", {
		keyword: SqlLexer.TIMESTAMP,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "   ", {
				location: new SourceLocation(1444, 60, 12),
			}),
		],
		location: new SourceLocation(1447, 60, 15),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1456, 60, 24),
			}),
		],
		location: new SourceLocation(1457, 60, 25),
	}),
	new Token(SqlLexer.Reserved, "current_timestamp", {
		keyword: SqlLexer.CURRENT_TIMESTAMP,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1464, 60, 32),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1482, 60, 50),
			}),
		],
		location: new SourceLocation(1465, 60, 33),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1483, 61, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1484, 61, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1485, 61, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1486, 62, 1),
			}),
		],
		location: new SourceLocation(1487, 63, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1493, 63, 7),
			}),
		],
		location: new SourceLocation(1494, 63, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1499, 63, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1512, 63, 26),
			}),
		],
		location: new SourceLocation(1500, 63, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1514, 63, 28),
			}),
		],
		location: new SourceLocation(1513, 63, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1515, 64, 1),
			}),
		],
		location: new SourceLocation(1519, 64, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1522, 64, 8),
			}),
		],
		location: new SourceLocation(1527, 64, 13),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1534, 64, 20),
			}),
		],
		location: new SourceLocation(1535, 64, 21),
	}),
	new Token(SqlLexer.Identifier, "no_null", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1545, 64, 31),
			}),
		],
		location: new SourceLocation(1546, 64, 32),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1553, 64, 39),
			}),
		],
		location: new SourceLocation(1554, 64, 40),
	}),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1557, 64, 43),
			}),
		],
		location: new SourceLocation(1558, 64, 44),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1563, 64, 49),
			}),
		],
		location: new SourceLocation(1562, 64, 48),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1564, 65, 1),
			}),
		],
		location: new SourceLocation(1568, 65, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1572, 65, 9),
			}),
		],
		location: new SourceLocation(1576, 65, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1583, 65, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1584, 65, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1586, 65, 23),
	}),
	new Token(SqlLexer.Reserved, "NOT", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1587, 65, 24),
			}),
		],
		location: new SourceLocation(1588, 65, 25),
	}),
	new Token(SqlLexer.Reserved, "NULL", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1591, 65, 28),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1596, 65, 33),
			}),
		],
		location: new SourceLocation(1592, 65, 29),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1597, 66, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1598, 66, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1599, 66, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1600, 67, 1),
			}),
		],
		location: new SourceLocation(1601, 68, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1607, 68, 7),
			}),
		],
		location: new SourceLocation(1608, 68, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1613, 68, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1626, 68, 26),
			}),
		],
		location: new SourceLocation(1614, 68, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1628, 68, 28),
			}),
		],
		location: new SourceLocation(1627, 68, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1629, 69, 1),
			}),
		],
		location: new SourceLocation(1633, 69, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1636, 69, 8),
			}),
		],
		location: new SourceLocation(1641, 69, 13),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1649, 69, 21),
			}),
		],
		location: new SourceLocation(1648, 69, 20),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1650, 70, 1),
			}),
		],
		location: new SourceLocation(1654, 70, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1658, 70, 9),
			}),
		],
		location: new SourceLocation(1662, 70, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1669, 70, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1670, 70, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1672, 70, 23),
	}),
	new Token(SqlLexer.Reserved, "UNIQUE", {
		keyword: SqlLexer.UNIQUE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1673, 70, 24),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1680, 70, 31),
			}),
		],
		location: new SourceLocation(1674, 70, 25),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1681, 71, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1682, 71, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1683, 71, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1684, 72, 1),
			}),
		],
		location: new SourceLocation(1685, 73, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1691, 73, 7),
			}),
		],
		location: new SourceLocation(1692, 73, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1697, 73, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1710, 73, 26),
			}),
		],
		location: new SourceLocation(1698, 73, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1712, 73, 28),
			}),
		],
		location: new SourceLocation(1711, 73, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1713, 74, 1),
			}),
		],
		location: new SourceLocation(1717, 74, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1720, 74, 8),
			}),
		],
		location: new SourceLocation(1725, 74, 13),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1733, 74, 21),
			}),
		],
		location: new SourceLocation(1732, 74, 20),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1734, 75, 1),
			}),
		],
		location: new SourceLocation(1738, 75, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1742, 75, 9),
			}),
		],
		location: new SourceLocation(1746, 75, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1753, 75, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1754, 75, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1756, 75, 23),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1758, 75, 25),
			}),
		],
		location: new SourceLocation(1757, 75, 24),
	}),
	new Token(SqlLexer.Reserved, "UNIQUE", {
		keyword: SqlLexer.UNIQUE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1759, 76, 1),
			}),
		],
		location: new SourceLocation(1763, 76, 5),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1769, 76, 11),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		location: new SourceLocation(1770, 76, 12),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1775, 76, 17),
			}),
		],
		location: new SourceLocation(1774, 76, 16),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1776, 77, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1777, 77, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1778, 77, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1779, 78, 1),
			}),
		],
		location: new SourceLocation(1780, 79, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1786, 79, 7),
			}),
		],
		location: new SourceLocation(1787, 79, 8),
	}),
	new Token(SqlLexer.Identifier, "distributors", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1792, 79, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1805, 79, 26),
			}),
		],
		location: new SourceLocation(1793, 79, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1807, 79, 28),
			}),
		],
		location: new SourceLocation(1806, 79, 27),
	}),
	new Token(SqlLexer.Identifier, "did", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1808, 80, 1),
			}),
		],
		location: new SourceLocation(1812, 80, 5),
	}),
	new Token(SqlLexer.Identifier, "integer", {
		keyword: SqlLexer.INTEGER,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(1815, 80, 8),
			}),
		],
		location: new SourceLocation(1820, 80, 13),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1828, 80, 21),
			}),
		],
		location: new SourceLocation(1827, 80, 20),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1829, 81, 1),
			}),
		],
		location: new SourceLocation(1833, 81, 5),
	}),
	new Token(SqlLexer.Identifier, "varchar", {
		keyword: SqlLexer.VARCHAR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1837, 81, 9),
			}),
		],
		location: new SourceLocation(1841, 81, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1848, 81, 20),
	}),
	new Token(SqlLexer.Numeric, "40", {
		location: new SourceLocation(1849, 81, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1851, 81, 23),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1853, 81, 25),
			}),
		],
		location: new SourceLocation(1852, 81, 24),
	}),
	new Token(SqlLexer.Reserved, "UNIQUE", {
		keyword: SqlLexer.UNIQUE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1854, 82, 1),
			}),
		],
		location: new SourceLocation(1858, 82, 5),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1864, 82, 11),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		location: new SourceLocation(1865, 82, 12),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1869, 82, 16),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1870, 82, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1875, 82, 22),
			}),
		],
		location: new SourceLocation(1871, 82, 18),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1876, 82, 23),
	}),
	new Token(SqlLexer.Identifier, "fillfactor", {
		keyword: SqlLexer.FILLFACTOR,
		location: new SourceLocation(1877, 82, 24),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1887, 82, 34),
	}),
	new Token(SqlLexer.Numeric, "70", {
		location: new SourceLocation(1888, 82, 35),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1891, 82, 38),
			}),
		],
		location: new SourceLocation(1890, 82, 37),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1893, 83, 2),
			}),
		],
		location: new SourceLocation(1892, 83, 1),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1898, 84, 5),
			}),
		],
		location: new SourceLocation(1894, 84, 1),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(1899, 84, 6),
	}),
	new Token(SqlLexer.Identifier, "fillfactor", {
		keyword: SqlLexer.FILLFACTOR,
		location: new SourceLocation(1900, 84, 7),
	}),
	new Token(SqlLexer.Operator, "=", {
		location: new SourceLocation(1910, 84, 17),
	}),
	new Token(SqlLexer.Numeric, "70", {
		location: new SourceLocation(1911, 84, 18),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1913, 84, 20),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1914, 84, 21),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1915, 84, 22),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1916, 85, 1),
			}),
		],
		location: new SourceLocation(1917, 86, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1923, 86, 7),
			}),
		],
		location: new SourceLocation(1924, 86, 8),
	}),
	new Token(SqlLexer.Identifier, "array_int", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1929, 86, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1939, 86, 23),
			}),
		],
		location: new SourceLocation(1930, 86, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1941, 86, 25),
			}),
		],
		location: new SourceLocation(1940, 86, 24),
	}),
	new Token(SqlLexer.Identifier, "vector_data", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1942, 87, 1),
			}),
		],
		location: new SourceLocation(1946, 87, 5),
	}),
	new Token(SqlLexer.Identifier, "int", {
		keyword: SqlLexer.INT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "  ", {
				location: new SourceLocation(1957, 87, 16),
			}),
		],
		location: new SourceLocation(1959, 87, 18),
	}),
	new Token(SqlLexer.LeftBracket, "[", {
		location: new SourceLocation(1962, 87, 21),
	}),
	new Token(SqlLexer.RightBracket, "]", {
		location: new SourceLocation(1963, 87, 22),
	}),
	new Token(SqlLexer.LeftBracket, "[", {
		location: new SourceLocation(1964, 87, 23),
	}),
	new Token(SqlLexer.RightBracket, "]", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1966, 87, 25),
			}),
		],
		location: new SourceLocation(1965, 87, 24),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(1967, 88, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(1968, 88, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1969, 88, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1970, 89, 1),
			}),
		],
		location: new SourceLocation(1971, 90, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1977, 90, 7),
			}),
		],
		location: new SourceLocation(1978, 90, 8),
	}),
	new Token(SqlLexer.Identifier, "circles", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1983, 90, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1991, 90, 21),
			}),
		],
		location: new SourceLocation(1984, 90, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(1993, 90, 23),
			}),
		],
		location: new SourceLocation(1992, 90, 22),
	}),
	new Token(SqlLexer.Identifier, "c", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(1994, 91, 1),
			}),
		],
		location: new SourceLocation(1998, 91, 5),
	}),
	new Token(SqlLexer.Identifier, "circle", {
		keyword: SqlLexer.CIRCLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(1999, 91, 6),
			}),
		],
		location: new SourceLocation(2000, 91, 7),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2007, 91, 14),
			}),
		],
		location: new SourceLocation(2006, 91, 13),
	}),
	new Token(SqlLexer.Identifier, "EXCLUDE", {
		keyword: SqlLexer.EXCLUDE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2008, 92, 1),
			}),
		],
		location: new SourceLocation(2012, 92, 5),
	}),
	new Token(SqlLexer.Reserved, "USING", {
		keyword: SqlLexer.USING,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2019, 92, 12),
			}),
		],
		location: new SourceLocation(2020, 92, 13),
	}),
	new Token(SqlLexer.Identifier, "gist", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2025, 92, 18),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2030, 92, 23),
			}),
		],
		location: new SourceLocation(2026, 92, 19),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2031, 92, 24),
	}),
	new Token(SqlLexer.Identifier, "c", {
		location: new SourceLocation(2032, 92, 25),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2033, 92, 26),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2038, 92, 31),
			}),
		],
		location: new SourceLocation(2034, 92, 27),
	}),
	new Token(SqlLexer.Operator, "&&", {
		location: new SourceLocation(2039, 92, 32),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2042, 92, 35),
			}),
		],
		location: new SourceLocation(2041, 92, 34),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2043, 93, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2044, 93, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2045, 93, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2046, 94, 1),
			}),
		],
		location: new SourceLocation(2047, 95, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2053, 95, 7),
			}),
		],
		location: new SourceLocation(2054, 95, 8),
	}),
	new Token(SqlLexer.Identifier, "cinemas", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2059, 95, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2067, 95, 21),
			}),
		],
		location: new SourceLocation(2060, 95, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2069, 95, 23),
			}),
		],
		location: new SourceLocation(2068, 95, 22),
	}),
	new Token(SqlLexer.Identifier, "id", {
		keyword: SqlLexer.ID,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(2070, 96, 1),
			}),
		],
		location: new SourceLocation(2078, 96, 9),
	}),
	new Token(SqlLexer.Identifier, "serial", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2080, 96, 11),
			}),
		],
		location: new SourceLocation(2081, 96, 12),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2088, 96, 19),
			}),
		],
		location: new SourceLocation(2087, 96, 18),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(2089, 97, 1),
			}),
		],
		location: new SourceLocation(2097, 97, 9),
	}),
	new Token(SqlLexer.Identifier, "text", {
		keyword: SqlLexer.TEXT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2101, 97, 13),
			}),
		],
		location: new SourceLocation(2102, 97, 14),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2107, 97, 19),
			}),
		],
		location: new SourceLocation(2106, 97, 18),
	}),
	new Token(SqlLexer.Identifier, "location", {
		keyword: SqlLexer.LOCATION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(2108, 98, 1),
			}),
		],
		location: new SourceLocation(2116, 98, 9),
	}),
	new Token(SqlLexer.Identifier, "text", {
		keyword: SqlLexer.TEXT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2124, 98, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2129, 98, 22),
			}),
		],
		location: new SourceLocation(2125, 98, 18),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2130, 99, 1),
	}),
	new Token(SqlLexer.Identifier, "TABLESPACE", {
		keyword: SqlLexer.TABLESPACE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2131, 99, 2),
			}),
		],
		location: new SourceLocation(2132, 99, 3),
	}),
	new Token(SqlLexer.Identifier, "diskvol1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2142, 99, 13),
			}),
		],
		location: new SourceLocation(2143, 99, 14),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2151, 99, 22),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2152, 99, 23),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2153, 100, 1),
			}),
		],
		location: new SourceLocation(2154, 101, 1),
	}),
	new Token(SqlLexer.Identifier, "TYPE", {
		keyword: SqlLexer.TYPE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2160, 101, 7),
			}),
		],
		location: new SourceLocation(2161, 101, 8),
	}),
	new Token(SqlLexer.Identifier, "employee_type", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2165, 101, 12),
			}),
		],
		location: new SourceLocation(2166, 101, 13),
	}),
	new Token(SqlLexer.Reserved, "AS", {
		keyword: SqlLexer.AS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2179, 101, 26),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2182, 101, 29),
			}),
		],
		location: new SourceLocation(2180, 101, 27),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2183, 101, 30),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		location: new SourceLocation(2184, 101, 31),
	}),
	new Token(SqlLexer.Identifier, "text", {
		keyword: SqlLexer.TEXT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2188, 101, 35),
			}),
		],
		location: new SourceLocation(2189, 101, 36),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(2193, 101, 40),
	}),
	new Token(SqlLexer.Identifier, "salary", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2194, 101, 41),
			}),
		],
		location: new SourceLocation(2195, 101, 42),
	}),
	new Token(SqlLexer.Identifier, "numeric", {
		keyword: SqlLexer.NUMERIC,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2201, 101, 48),
			}),
		],
		location: new SourceLocation(2202, 101, 49),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2209, 101, 56),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2210, 101, 57),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2211, 101, 58),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2212, 102, 1),
			}),
		],
		location: new SourceLocation(2213, 103, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2219, 103, 7),
			}),
		],
		location: new SourceLocation(2220, 103, 8),
	}),
	new Token(SqlLexer.Identifier, "employees", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2225, 103, 13),
			}),
		],
		location: new SourceLocation(2226, 103, 14),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2235, 103, 23),
			}),
		],
		location: new SourceLocation(2236, 103, 24),
	}),
	new Token(SqlLexer.Identifier, "employee_type", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2238, 103, 26),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2252, 103, 40),
			}),
		],
		location: new SourceLocation(2239, 103, 27),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2254, 103, 42),
			}),
		],
		location: new SourceLocation(2253, 103, 41),
	}),
	new Token(SqlLexer.Reserved, "PRIMARY", {
		keyword: SqlLexer.PRIMARY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2255, 104, 1),
			}),
		],
		location: new SourceLocation(2259, 104, 5),
	}),
	new Token(SqlLexer.Identifier, "KEY", {
		keyword: SqlLexer.KEY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2266, 104, 12),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2270, 104, 16),
			}),
		],
		location: new SourceLocation(2267, 104, 13),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2271, 104, 17),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		location: new SourceLocation(2272, 104, 18),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2276, 104, 22),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2278, 104, 24),
			}),
		],
		location: new SourceLocation(2277, 104, 23),
	}),
	new Token(SqlLexer.Identifier, "salary", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2279, 105, 1),
			}),
		],
		location: new SourceLocation(2283, 105, 5),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2289, 105, 11),
			}),
		],
		location: new SourceLocation(2290, 105, 12),
	}),
	new Token(SqlLexer.Identifier, "OPTIONS", {
		keyword: SqlLexer.OPTIONS,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2294, 105, 16),
			}),
		],
		location: new SourceLocation(2295, 105, 17),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2302, 105, 24),
			}),
		],
		location: new SourceLocation(2303, 105, 25),
	}),
	new Token(SqlLexer.Numeric, "1000", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2310, 105, 32),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2315, 105, 37),
			}),
		],
		location: new SourceLocation(2311, 105, 33),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2316, 106, 1),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2317, 106, 2),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2318, 106, 3),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2319, 107, 1),
			}),
		],
		location: new SourceLocation(2320, 108, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2326, 108, 7),
			}),
		],
		location: new SourceLocation(2327, 108, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2332, 108, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2344, 108, 25),
			}),
		],
		location: new SourceLocation(2333, 108, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2346, 108, 27),
			}),
		],
		location: new SourceLocation(2345, 108, 26),
	}),
	new Token(SqlLexer.Identifier, "logdate", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2347, 109, 1),
			}),
		],
		location: new SourceLocation(2351, 109, 5),
	}),
	new Token(SqlLexer.Identifier, "date", {
		keyword: SqlLexer.DATE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(2358, 109, 12),
			}),
		],
		location: new SourceLocation(2367, 109, 21),
	}),
	new Token(SqlLexer.Reserved, "not", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2371, 109, 25),
			}),
		],
		location: new SourceLocation(2372, 109, 26),
	}),
	new Token(SqlLexer.Reserved, "null", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2375, 109, 29),
			}),
		],
		location: new SourceLocation(2376, 109, 30),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2381, 109, 35),
			}),
		],
		location: new SourceLocation(2380, 109, 34),
	}),
	new Token(SqlLexer.Identifier, "peaktemp", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2382, 110, 1),
			}),
		],
		location: new SourceLocation(2386, 110, 5),
	}),
	new Token(SqlLexer.Identifier, "int", {
		keyword: SqlLexer.INT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(2394, 110, 13),
			}),
		],
		location: new SourceLocation(2402, 110, 21),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2406, 110, 25),
			}),
		],
		location: new SourceLocation(2405, 110, 24),
	}),
	new Token(SqlLexer.Identifier, "unitsales", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2407, 111, 1),
			}),
		],
		location: new SourceLocation(2411, 111, 5),
	}),
	new Token(SqlLexer.Identifier, "int", {
		keyword: SqlLexer.INT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(2420, 111, 14),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2430, 111, 24),
			}),
		],
		location: new SourceLocation(2427, 111, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2431, 112, 1),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2432, 112, 2),
			}),
		],
		location: new SourceLocation(2433, 112, 3),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2442, 112, 12),
			}),
		],
		location: new SourceLocation(2443, 112, 13),
	}),
	new Token(SqlLexer.Identifier, "RANGE", {
		keyword: SqlLexer.RANGE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2445, 112, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2451, 112, 21),
			}),
		],
		location: new SourceLocation(2446, 112, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2452, 112, 22),
	}),
	new Token(SqlLexer.Identifier, "logdate", {
		location: new SourceLocation(2453, 112, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2460, 112, 30),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2461, 112, 31),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2462, 112, 32),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2463, 113, 1),
			}),
		],
		location: new SourceLocation(2464, 114, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2470, 114, 7),
			}),
		],
		location: new SourceLocation(2471, 114, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement_year_month", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2476, 114, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2499, 114, 36),
			}),
		],
		location: new SourceLocation(2477, 114, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2501, 114, 38),
			}),
		],
		location: new SourceLocation(2500, 114, 37),
	}),
	new Token(SqlLexer.Identifier, "logdate", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2502, 115, 1),
			}),
		],
		location: new SourceLocation(2506, 115, 5),
	}),
	new Token(SqlLexer.Identifier, "date", {
		keyword: SqlLexer.DATE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(2513, 115, 12),
			}),
		],
		location: new SourceLocation(2522, 115, 21),
	}),
	new Token(SqlLexer.Reserved, "not", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2526, 115, 25),
			}),
		],
		location: new SourceLocation(2527, 115, 26),
	}),
	new Token(SqlLexer.Reserved, "null", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2530, 115, 29),
			}),
		],
		location: new SourceLocation(2531, 115, 30),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2536, 115, 35),
			}),
		],
		location: new SourceLocation(2535, 115, 34),
	}),
	new Token(SqlLexer.Identifier, "peaktemp", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2537, 116, 1),
			}),
		],
		location: new SourceLocation(2541, 116, 5),
	}),
	new Token(SqlLexer.Identifier, "int", {
		keyword: SqlLexer.INT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "        ", {
				location: new SourceLocation(2549, 116, 13),
			}),
		],
		location: new SourceLocation(2557, 116, 21),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2561, 116, 25),
			}),
		],
		location: new SourceLocation(2560, 116, 24),
	}),
	new Token(SqlLexer.Identifier, "unitsales", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2562, 117, 1),
			}),
		],
		location: new SourceLocation(2566, 117, 5),
	}),
	new Token(SqlLexer.Identifier, "int", {
		keyword: SqlLexer.INT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(2575, 117, 14),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2585, 117, 24),
			}),
		],
		location: new SourceLocation(2582, 117, 21),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2586, 118, 1),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2587, 118, 2),
			}),
		],
		location: new SourceLocation(2588, 118, 3),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2597, 118, 12),
			}),
		],
		location: new SourceLocation(2598, 118, 13),
	}),
	new Token(SqlLexer.Identifier, "RANGE", {
		keyword: SqlLexer.RANGE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2600, 118, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2606, 118, 21),
			}),
		],
		location: new SourceLocation(2601, 118, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2607, 118, 22),
	}),
	new Token(SqlLexer.Identifier, "EXTRACT", {
		keyword: SqlLexer.EXTRACT,
		location: new SourceLocation(2608, 118, 23),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2615, 118, 30),
	}),
	new Token(SqlLexer.Identifier, "YEAR", {
		keyword: SqlLexer.YEAR,
		location: new SourceLocation(2616, 118, 31),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2620, 118, 35),
			}),
		],
		location: new SourceLocation(2621, 118, 36),
	}),
	new Token(SqlLexer.Identifier, "logdate", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2625, 118, 40),
			}),
		],
		location: new SourceLocation(2626, 118, 41),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2633, 118, 48),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(2634, 118, 49),
	}),
	new Token(SqlLexer.Identifier, "EXTRACT", {
		keyword: SqlLexer.EXTRACT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2635, 118, 50),
			}),
		],
		location: new SourceLocation(2636, 118, 51),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2643, 118, 58),
	}),
	new Token(SqlLexer.Identifier, "MONTH", {
		keyword: SqlLexer.MONTH,
		location: new SourceLocation(2644, 118, 59),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2649, 118, 64),
			}),
		],
		location: new SourceLocation(2650, 118, 65),
	}),
	new Token(SqlLexer.Identifier, "logdate", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2654, 118, 69),
			}),
		],
		location: new SourceLocation(2655, 118, 70),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2662, 118, 77),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2663, 118, 78),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2664, 118, 79),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2665, 118, 80),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2666, 119, 1),
			}),
		],
		location: new SourceLocation(2667, 120, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2673, 120, 7),
			}),
		],
		location: new SourceLocation(2674, 120, 8),
	}),
	new Token(SqlLexer.Identifier, "cities", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2679, 120, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2686, 120, 20),
			}),
		],
		location: new SourceLocation(2680, 120, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2688, 120, 22),
			}),
		],
		location: new SourceLocation(2687, 120, 21),
	}),
	new Token(SqlLexer.Identifier, "city_id", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2689, 121, 1),
			}),
		],
		location: new SourceLocation(2693, 121, 5),
	}),
	new Token(SqlLexer.Identifier, "bigserial", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "      ", {
				location: new SourceLocation(2700, 121, 12),
			}),
		],
		location: new SourceLocation(2706, 121, 18),
	}),
	new Token(SqlLexer.Reserved, "not", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2715, 121, 27),
			}),
		],
		location: new SourceLocation(2716, 121, 28),
	}),
	new Token(SqlLexer.Reserved, "null", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2719, 121, 31),
			}),
		],
		location: new SourceLocation(2720, 121, 32),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2725, 121, 37),
			}),
		],
		location: new SourceLocation(2724, 121, 36),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2726, 122, 1),
			}),
		],
		location: new SourceLocation(2730, 122, 5),
	}),
	new Token(SqlLexer.Identifier, "text", {
		keyword: SqlLexer.TEXT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "         ", {
				location: new SourceLocation(2734, 122, 9),
			}),
		],
		location: new SourceLocation(2743, 122, 18),
	}),
	new Token(SqlLexer.Reserved, "not", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2747, 122, 22),
			}),
		],
		location: new SourceLocation(2748, 122, 23),
	}),
	new Token(SqlLexer.Reserved, "null", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2751, 122, 26),
			}),
		],
		location: new SourceLocation(2752, 122, 27),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2757, 122, 32),
			}),
		],
		location: new SourceLocation(2756, 122, 31),
	}),
	new Token(SqlLexer.Identifier, "population", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2758, 123, 1),
			}),
		],
		location: new SourceLocation(2762, 123, 5),
	}),
	new Token(SqlLexer.Identifier, "bigint", {
		keyword: SqlLexer.BIGINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "   ", {
				location: new SourceLocation(2772, 123, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2781, 123, 24),
			}),
		],
		location: new SourceLocation(2775, 123, 18),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2782, 124, 1),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2783, 124, 2),
			}),
		],
		location: new SourceLocation(2784, 124, 3),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2793, 124, 12),
			}),
		],
		location: new SourceLocation(2794, 124, 13),
	}),
	new Token(SqlLexer.Identifier, "LIST", {
		keyword: SqlLexer.LIST,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2796, 124, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2801, 124, 20),
			}),
		],
		location: new SourceLocation(2797, 124, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2802, 124, 21),
	}),
	new Token(SqlLexer.Identifier, "left", {
		keyword: SqlLexer.LEFT,
		location: new SourceLocation(2803, 124, 22),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2807, 124, 26),
	}),
	new Token(SqlLexer.Identifier, "lower", {
		keyword: SqlLexer.LOWER,
		location: new SourceLocation(2808, 124, 27),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2813, 124, 32),
	}),
	new Token(SqlLexer.Identifier, "name", {
		keyword: SqlLexer.NAME,
		location: new SourceLocation(2814, 124, 33),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2818, 124, 37),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(2819, 124, 38),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2820, 124, 39),
			}),
		],
		location: new SourceLocation(2821, 124, 40),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2822, 124, 41),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2823, 124, 42),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2824, 124, 43),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2825, 124, 44),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2826, 125, 1),
			}),
		],
		location: new SourceLocation(2827, 126, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2833, 126, 7),
			}),
		],
		location: new SourceLocation(2834, 126, 8),
	}),
	new Token(SqlLexer.Identifier, "orders", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2839, 126, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2846, 126, 20),
			}),
		],
		location: new SourceLocation(2840, 126, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2848, 126, 22),
			}),
		],
		location: new SourceLocation(2847, 126, 21),
	}),
	new Token(SqlLexer.Identifier, "order_id", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2849, 127, 1),
			}),
		],
		location: new SourceLocation(2853, 127, 5),
	}),
	new Token(SqlLexer.Identifier, "bigint", {
		keyword: SqlLexer.BIGINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "     ", {
				location: new SourceLocation(2861, 127, 13),
			}),
		],
		location: new SourceLocation(2866, 127, 18),
	}),
	new Token(SqlLexer.Reserved, "not", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2872, 127, 24),
			}),
		],
		location: new SourceLocation(2873, 127, 25),
	}),
	new Token(SqlLexer.Reserved, "null", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2876, 127, 28),
			}),
		],
		location: new SourceLocation(2877, 127, 29),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2882, 127, 34),
			}),
		],
		location: new SourceLocation(2881, 127, 33),
	}),
	new Token(SqlLexer.Identifier, "cust_id", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2883, 128, 1),
			}),
		],
		location: new SourceLocation(2887, 128, 5),
	}),
	new Token(SqlLexer.Identifier, "bigint", {
		keyword: SqlLexer.BIGINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "      ", {
				location: new SourceLocation(2894, 128, 12),
			}),
		],
		location: new SourceLocation(2900, 128, 18),
	}),
	new Token(SqlLexer.Reserved, "not", {
		keyword: SqlLexer.NOT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2906, 128, 24),
			}),
		],
		location: new SourceLocation(2907, 128, 25),
	}),
	new Token(SqlLexer.Reserved, "null", {
		keyword: SqlLexer.NULL,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2910, 128, 28),
			}),
		],
		location: new SourceLocation(2911, 128, 29),
	}),
	new Token(SqlLexer.Comma, ",", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2916, 128, 34),
			}),
		],
		location: new SourceLocation(2915, 128, 33),
	}),
	new Token(SqlLexer.Identifier, "status", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(2917, 129, 1),
			}),
		],
		location: new SourceLocation(2921, 129, 5),
	}),
	new Token(SqlLexer.Identifier, "text", {
		keyword: SqlLexer.TEXT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "       ", {
				location: new SourceLocation(2927, 129, 11),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2938, 129, 22),
			}),
		],
		location: new SourceLocation(2934, 129, 18),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2939, 130, 1),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2940, 130, 2),
			}),
		],
		location: new SourceLocation(2941, 130, 3),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2950, 130, 12),
			}),
		],
		location: new SourceLocation(2951, 130, 13),
	}),
	new Token(SqlLexer.Identifier, "HASH", {
		keyword: SqlLexer.HASH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2953, 130, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2958, 130, 20),
			}),
		],
		location: new SourceLocation(2954, 130, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(2959, 130, 21),
	}),
	new Token(SqlLexer.Identifier, "order_id", {
		location: new SourceLocation(2960, 130, 22),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(2968, 130, 30),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(2969, 130, 31),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2970, 130, 32),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(2971, 131, 1),
			}),
		],
		location: new SourceLocation(2972, 132, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2978, 132, 7),
			}),
		],
		location: new SourceLocation(2979, 132, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement_y2016m07", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(2984, 132, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3005, 132, 34),
			}),
		],
		location: new SourceLocation(2985, 132, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3006, 133, 1),
			}),
		],
		location: new SourceLocation(3010, 133, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3019, 133, 14),
			}),
		],
		location: new SourceLocation(3020, 133, 15),
	}),
	new Token(SqlLexer.Identifier, "measurement", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3022, 133, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3034, 133, 29),
			}),
		],
		location: new SourceLocation(3023, 133, 18),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3036, 133, 31),
			}),
		],
		location: new SourceLocation(3035, 133, 30),
	}),
	new Token(SqlLexer.Identifier, "unitsales", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3037, 134, 1),
			}),
		],
		location: new SourceLocation(3041, 134, 5),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3050, 134, 14),
			}),
		],
		location: new SourceLocation(3051, 134, 15),
	}),
	new Token(SqlLexer.Numeric, "0", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3058, 134, 22),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3060, 134, 24),
			}),
		],
		location: new SourceLocation(3059, 134, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3061, 135, 1),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3062, 135, 2),
			}),
		],
		location: new SourceLocation(3063, 135, 3),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3066, 135, 6),
			}),
		],
		location: new SourceLocation(3067, 135, 7),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3073, 135, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3078, 135, 18),
			}),
		],
		location: new SourceLocation(3074, 135, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3079, 135, 19),
	}),
	new Token(SqlLexer.String, "'2016-07-01'", {
		location: new SourceLocation(3080, 135, 20),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3092, 135, 32),
	}),
	new Token(SqlLexer.Reserved, "TO", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3093, 135, 33),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3096, 135, 36),
			}),
		],
		location: new SourceLocation(3094, 135, 34),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3097, 135, 37),
	}),
	new Token(SqlLexer.String, "'2016-08-01'", {
		location: new SourceLocation(3098, 135, 38),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3110, 135, 50),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3111, 135, 51),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3112, 135, 52),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3113, 136, 1),
			}),
		],
		location: new SourceLocation(3114, 137, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3120, 137, 7),
			}),
		],
		location: new SourceLocation(3121, 137, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement_ym_older", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3126, 137, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3147, 137, 34),
			}),
		],
		location: new SourceLocation(3127, 137, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3148, 138, 1),
			}),
		],
		location: new SourceLocation(3152, 138, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3161, 138, 14),
			}),
		],
		location: new SourceLocation(3162, 138, 15),
	}),
	new Token(SqlLexer.Identifier, "measurement_year_month", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3164, 138, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3187, 138, 40),
			}),
		],
		location: new SourceLocation(3165, 138, 18),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3188, 139, 1),
			}),
		],
		location: new SourceLocation(3192, 139, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3195, 139, 8),
			}),
		],
		location: new SourceLocation(3196, 139, 9),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3202, 139, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3207, 139, 20),
			}),
		],
		location: new SourceLocation(3203, 139, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3208, 139, 21),
	}),
	new Token(SqlLexer.Identifier, "MINVALUE", {
		keyword: SqlLexer.MINVALUE,
		location: new SourceLocation(3209, 139, 22),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3217, 139, 30),
	}),
	new Token(SqlLexer.Identifier, "MINVALUE", {
		keyword: SqlLexer.MINVALUE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3218, 139, 31),
			}),
		],
		location: new SourceLocation(3219, 139, 32),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3227, 139, 40),
	}),
	new Token(SqlLexer.Reserved, "TO", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3228, 139, 41),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3231, 139, 44),
			}),
		],
		location: new SourceLocation(3229, 139, 42),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3232, 139, 45),
	}),
	new Token(SqlLexer.Numeric, "2016", {
		location: new SourceLocation(3233, 139, 46),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3237, 139, 50),
	}),
	new Token(SqlLexer.Numeric, "11", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3238, 139, 51),
			}),
		],
		location: new SourceLocation(3239, 139, 52),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3241, 139, 54),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3242, 139, 55),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3243, 139, 56),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3244, 140, 1),
			}),
		],
		location: new SourceLocation(3245, 141, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3251, 141, 7),
			}),
		],
		location: new SourceLocation(3252, 141, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement_ym_y2016m11", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3257, 141, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3281, 141, 37),
			}),
		],
		location: new SourceLocation(3258, 141, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3282, 142, 1),
			}),
		],
		location: new SourceLocation(3286, 142, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3295, 142, 14),
			}),
		],
		location: new SourceLocation(3296, 142, 15),
	}),
	new Token(SqlLexer.Identifier, "measurement_year_month", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3298, 142, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3321, 142, 40),
			}),
		],
		location: new SourceLocation(3299, 142, 18),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3322, 143, 1),
			}),
		],
		location: new SourceLocation(3326, 143, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3329, 143, 8),
			}),
		],
		location: new SourceLocation(3330, 143, 9),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3336, 143, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3341, 143, 20),
			}),
		],
		location: new SourceLocation(3337, 143, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3342, 143, 21),
	}),
	new Token(SqlLexer.Numeric, "2016", {
		location: new SourceLocation(3343, 143, 22),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3347, 143, 26),
	}),
	new Token(SqlLexer.Numeric, "11", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3348, 143, 27),
			}),
		],
		location: new SourceLocation(3349, 143, 28),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3351, 143, 30),
	}),
	new Token(SqlLexer.Reserved, "TO", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3352, 143, 31),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3355, 143, 34),
			}),
		],
		location: new SourceLocation(3353, 143, 32),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3356, 143, 35),
	}),
	new Token(SqlLexer.Numeric, "2016", {
		location: new SourceLocation(3357, 143, 36),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3361, 143, 40),
	}),
	new Token(SqlLexer.Numeric, "12", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3362, 143, 41),
			}),
		],
		location: new SourceLocation(3363, 143, 42),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3365, 143, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3366, 143, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3367, 143, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3368, 144, 1),
			}),
		],
		location: new SourceLocation(3369, 145, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3375, 145, 7),
			}),
		],
		location: new SourceLocation(3376, 145, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement_ym_y2016m12", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3381, 145, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3405, 145, 37),
			}),
		],
		location: new SourceLocation(3382, 145, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3406, 146, 1),
			}),
		],
		location: new SourceLocation(3410, 146, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3419, 146, 14),
			}),
		],
		location: new SourceLocation(3420, 146, 15),
	}),
	new Token(SqlLexer.Identifier, "measurement_year_month", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3422, 146, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3445, 146, 40),
			}),
		],
		location: new SourceLocation(3423, 146, 18),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3446, 147, 1),
			}),
		],
		location: new SourceLocation(3450, 147, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3453, 147, 8),
			}),
		],
		location: new SourceLocation(3454, 147, 9),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3460, 147, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3465, 147, 20),
			}),
		],
		location: new SourceLocation(3461, 147, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3466, 147, 21),
	}),
	new Token(SqlLexer.Numeric, "2016", {
		location: new SourceLocation(3467, 147, 22),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3471, 147, 26),
	}),
	new Token(SqlLexer.Numeric, "12", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3472, 147, 27),
			}),
		],
		location: new SourceLocation(3473, 147, 28),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3475, 147, 30),
	}),
	new Token(SqlLexer.Reserved, "TO", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3476, 147, 31),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3479, 147, 34),
			}),
		],
		location: new SourceLocation(3477, 147, 32),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3480, 147, 35),
	}),
	new Token(SqlLexer.Numeric, "2017", {
		location: new SourceLocation(3481, 147, 36),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3485, 147, 40),
	}),
	new Token(SqlLexer.Numeric, "01", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3486, 147, 41),
			}),
		],
		location: new SourceLocation(3487, 147, 42),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3489, 147, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3490, 147, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3491, 147, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3492, 148, 1),
			}),
		],
		location: new SourceLocation(3493, 149, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3499, 149, 7),
			}),
		],
		location: new SourceLocation(3500, 149, 8),
	}),
	new Token(SqlLexer.Identifier, "measurement_ym_y2017m01", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3505, 149, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3529, 149, 37),
			}),
		],
		location: new SourceLocation(3506, 149, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3530, 150, 1),
			}),
		],
		location: new SourceLocation(3534, 150, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3543, 150, 14),
			}),
		],
		location: new SourceLocation(3544, 150, 15),
	}),
	new Token(SqlLexer.Identifier, "measurement_year_month", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3546, 150, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3569, 150, 40),
			}),
		],
		location: new SourceLocation(3547, 150, 18),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3570, 151, 1),
			}),
		],
		location: new SourceLocation(3574, 151, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3577, 151, 8),
			}),
		],
		location: new SourceLocation(3578, 151, 9),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3584, 151, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3589, 151, 20),
			}),
		],
		location: new SourceLocation(3585, 151, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3590, 151, 21),
	}),
	new Token(SqlLexer.Numeric, "2017", {
		location: new SourceLocation(3591, 151, 22),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3595, 151, 26),
	}),
	new Token(SqlLexer.Numeric, "01", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3596, 151, 27),
			}),
		],
		location: new SourceLocation(3597, 151, 28),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3599, 151, 30),
	}),
	new Token(SqlLexer.Reserved, "TO", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3600, 151, 31),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3603, 151, 34),
			}),
		],
		location: new SourceLocation(3601, 151, 32),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3604, 151, 35),
	}),
	new Token(SqlLexer.Numeric, "2017", {
		location: new SourceLocation(3605, 151, 36),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3609, 151, 40),
	}),
	new Token(SqlLexer.Numeric, "02", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3610, 151, 41),
			}),
		],
		location: new SourceLocation(3611, 151, 42),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3613, 151, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3614, 151, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3615, 151, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3616, 152, 1),
			}),
		],
		location: new SourceLocation(3617, 153, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3623, 153, 7),
			}),
		],
		location: new SourceLocation(3624, 153, 8),
	}),
	new Token(SqlLexer.Identifier, "cities_ab", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3629, 153, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3639, 153, 23),
			}),
		],
		location: new SourceLocation(3630, 153, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3640, 154, 1),
			}),
		],
		location: new SourceLocation(3644, 154, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3653, 154, 14),
			}),
		],
		location: new SourceLocation(3654, 154, 15),
	}),
	new Token(SqlLexer.Identifier, "cities", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3656, 154, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3663, 154, 24),
			}),
		],
		location: new SourceLocation(3657, 154, 18),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3665, 154, 26),
			}),
		],
		location: new SourceLocation(3664, 154, 25),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3666, 155, 1),
			}),
		],
		location: new SourceLocation(3670, 155, 5),
	}),
	new Token(SqlLexer.Identifier, "city_id_nonzero", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3680, 155, 15),
			}),
		],
		location: new SourceLocation(3681, 155, 16),
	}),
	new Token(SqlLexer.Reserved, "CHECK", {
		keyword: SqlLexer.CHECK,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3696, 155, 31),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3702, 155, 37),
			}),
		],
		location: new SourceLocation(3697, 155, 32),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3703, 155, 38),
	}),
	new Token(SqlLexer.Identifier, "city_id", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3711, 155, 46),
			}),
		],
		location: new SourceLocation(3704, 155, 39),
	}),
	new Token(SqlLexer.Operator, "!=", {
		location: new SourceLocation(3712, 155, 47),
	}),
	new Token(SqlLexer.Numeric, "0", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3714, 155, 49),
			}),
		],
		location: new SourceLocation(3715, 155, 50),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3717, 155, 52),
			}),
		],
		location: new SourceLocation(3716, 155, 51),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3718, 156, 1),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3719, 156, 2),
			}),
		],
		location: new SourceLocation(3720, 156, 3),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3723, 156, 6),
			}),
		],
		location: new SourceLocation(3724, 156, 7),
	}),
	new Token(SqlLexer.Reserved, "IN", {
		keyword: SqlLexer.IN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3730, 156, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3733, 156, 16),
			}),
		],
		location: new SourceLocation(3731, 156, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3734, 156, 17),
	}),
	new Token(SqlLexer.String, "'a'", {
		location: new SourceLocation(3735, 156, 18),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3738, 156, 21),
	}),
	new Token(SqlLexer.String, "'b'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3739, 156, 22),
			}),
		],
		location: new SourceLocation(3740, 156, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3743, 156, 26),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3744, 156, 27),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3745, 156, 28),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3746, 157, 1),
			}),
		],
		location: new SourceLocation(3747, 158, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3753, 158, 7),
			}),
		],
		location: new SourceLocation(3754, 158, 8),
	}),
	new Token(SqlLexer.Identifier, "cities_ab", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3759, 158, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3769, 158, 23),
			}),
		],
		location: new SourceLocation(3760, 158, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3770, 159, 1),
			}),
		],
		location: new SourceLocation(3774, 159, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3783, 159, 14),
			}),
		],
		location: new SourceLocation(3784, 159, 15),
	}),
	new Token(SqlLexer.Identifier, "cities", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3786, 159, 17),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3793, 159, 24),
			}),
		],
		location: new SourceLocation(3787, 159, 18),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3795, 159, 26),
			}),
		],
		location: new SourceLocation(3794, 159, 25),
	}),
	new Token(SqlLexer.Reserved, "CONSTRAINT", {
		keyword: SqlLexer.CONSTRAINT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3796, 160, 1),
			}),
		],
		location: new SourceLocation(3800, 160, 5),
	}),
	new Token(SqlLexer.Identifier, "city_id_nonzero", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3810, 160, 15),
			}),
		],
		location: new SourceLocation(3811, 160, 16),
	}),
	new Token(SqlLexer.Reserved, "CHECK", {
		keyword: SqlLexer.CHECK,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3826, 160, 31),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3832, 160, 37),
			}),
		],
		location: new SourceLocation(3827, 160, 32),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3833, 160, 38),
	}),
	new Token(SqlLexer.Identifier, "city_id", {
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3841, 160, 46),
			}),
		],
		location: new SourceLocation(3834, 160, 39),
	}),
	new Token(SqlLexer.Operator, "!=", {
		location: new SourceLocation(3842, 160, 47),
	}),
	new Token(SqlLexer.Numeric, "0", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3844, 160, 49),
			}),
		],
		location: new SourceLocation(3845, 160, 50),
	}),
	new Token(SqlLexer.RightParen, ")", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3847, 160, 52),
			}),
		],
		location: new SourceLocation(3846, 160, 51),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3848, 161, 1),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3849, 161, 2),
			}),
		],
		location: new SourceLocation(3850, 161, 3),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3853, 161, 6),
			}),
		],
		location: new SourceLocation(3854, 161, 7),
	}),
	new Token(SqlLexer.Reserved, "IN", {
		keyword: SqlLexer.IN,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3860, 161, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3863, 161, 16),
			}),
		],
		location: new SourceLocation(3861, 161, 14),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3864, 161, 17),
	}),
	new Token(SqlLexer.String, "'a'", {
		location: new SourceLocation(3865, 161, 18),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(3868, 161, 21),
	}),
	new Token(SqlLexer.String, "'b'", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3869, 161, 22),
			}),
		],
		location: new SourceLocation(3870, 161, 23),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3873, 161, 26),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3874, 161, 27),
			}),
		],
		location: new SourceLocation(3875, 161, 28),
	}),
	new Token(SqlLexer.Identifier, "BY", {
		keyword: SqlLexer.BY,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3884, 161, 37),
			}),
		],
		location: new SourceLocation(3885, 161, 38),
	}),
	new Token(SqlLexer.Identifier, "RANGE", {
		keyword: SqlLexer.RANGE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3887, 161, 40),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3893, 161, 46),
			}),
		],
		location: new SourceLocation(3888, 161, 41),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3894, 161, 47),
	}),
	new Token(SqlLexer.Identifier, "population", {
		location: new SourceLocation(3895, 161, 48),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3905, 161, 58),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(3906, 161, 59),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3907, 161, 60),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3908, 162, 1),
			}),
		],
		location: new SourceLocation(3909, 163, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3915, 163, 7),
			}),
		],
		location: new SourceLocation(3916, 163, 8),
	}),
	new Token(SqlLexer.Identifier, "cities_ab_10000_to_100000", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3921, 163, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(3947, 163, 39),
			}),
		],
		location: new SourceLocation(3922, 163, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(3948, 164, 1),
			}),
		],
		location: new SourceLocation(3952, 164, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3961, 164, 14),
			}),
		],
		location: new SourceLocation(3962, 164, 15),
	}),
	new Token(SqlLexer.Identifier, "cities_ab", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3964, 164, 17),
			}),
		],
		location: new SourceLocation(3965, 164, 18),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3974, 164, 27),
			}),
		],
		location: new SourceLocation(3975, 164, 28),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3978, 164, 31),
			}),
		],
		location: new SourceLocation(3979, 164, 32),
	}),
	new Token(SqlLexer.Reserved, "FROM", {
		keyword: SqlLexer.FROM,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3985, 164, 38),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3990, 164, 43),
			}),
		],
		location: new SourceLocation(3986, 164, 39),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(3991, 164, 44),
	}),
	new Token(SqlLexer.Numeric, "10000", {
		location: new SourceLocation(3992, 164, 45),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(3997, 164, 50),
	}),
	new Token(SqlLexer.Reserved, "TO", {
		keyword: SqlLexer.TO,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(3998, 164, 51),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4001, 164, 54),
			}),
		],
		location: new SourceLocation(3999, 164, 52),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(4002, 164, 55),
	}),
	new Token(SqlLexer.Numeric, "100000", {
		location: new SourceLocation(4003, 164, 56),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(4009, 164, 62),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(4010, 164, 63),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4011, 164, 64),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4012, 165, 1),
			}),
		],
		location: new SourceLocation(4013, 166, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4019, 166, 7),
			}),
		],
		location: new SourceLocation(4020, 166, 8),
	}),
	new Token(SqlLexer.Identifier, "orders_p1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4025, 166, 13),
			}),
		],
		location: new SourceLocation(4026, 166, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4035, 166, 23),
			}),
		],
		location: new SourceLocation(4036, 166, 24),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4045, 166, 33),
			}),
		],
		location: new SourceLocation(4046, 166, 34),
	}),
	new Token(SqlLexer.Identifier, "orders", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4048, 166, 36),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4055, 166, 43),
			}),
		],
		location: new SourceLocation(4049, 166, 37),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(4056, 167, 1),
			}),
		],
		location: new SourceLocation(4060, 167, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4063, 167, 8),
			}),
		],
		location: new SourceLocation(4064, 167, 9),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4070, 167, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4075, 167, 20),
			}),
		],
		location: new SourceLocation(4071, 167, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(4076, 167, 21),
	}),
	new Token(SqlLexer.Identifier, "MODULUS", {
		location: new SourceLocation(4077, 167, 22),
	}),
	new Token(SqlLexer.Numeric, "4", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4084, 167, 29),
			}),
		],
		location: new SourceLocation(4085, 167, 30),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(4086, 167, 31),
	}),
	new Token(SqlLexer.Identifier, "REMAINDER", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4087, 167, 32),
			}),
		],
		location: new SourceLocation(4088, 167, 33),
	}),
	new Token(SqlLexer.Numeric, "0", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4097, 167, 42),
			}),
		],
		location: new SourceLocation(4098, 167, 43),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(4099, 167, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(4100, 167, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4101, 167, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		location: new SourceLocation(4102, 168, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4108, 168, 7),
			}),
		],
		location: new SourceLocation(4109, 168, 8),
	}),
	new Token(SqlLexer.Identifier, "orders_p2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4114, 168, 13),
			}),
		],
		location: new SourceLocation(4115, 168, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4124, 168, 23),
			}),
		],
		location: new SourceLocation(4125, 168, 24),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4134, 168, 33),
			}),
		],
		location: new SourceLocation(4135, 168, 34),
	}),
	new Token(SqlLexer.Identifier, "orders", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4137, 168, 36),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4144, 168, 43),
			}),
		],
		location: new SourceLocation(4138, 168, 37),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(4145, 169, 1),
			}),
		],
		location: new SourceLocation(4149, 169, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4152, 169, 8),
			}),
		],
		location: new SourceLocation(4153, 169, 9),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4159, 169, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4164, 169, 20),
			}),
		],
		location: new SourceLocation(4160, 169, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(4165, 169, 21),
	}),
	new Token(SqlLexer.Identifier, "MODULUS", {
		location: new SourceLocation(4166, 169, 22),
	}),
	new Token(SqlLexer.Numeric, "4", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4173, 169, 29),
			}),
		],
		location: new SourceLocation(4174, 169, 30),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(4175, 169, 31),
	}),
	new Token(SqlLexer.Identifier, "REMAINDER", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4176, 169, 32),
			}),
		],
		location: new SourceLocation(4177, 169, 33),
	}),
	new Token(SqlLexer.Numeric, "1", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4186, 169, 42),
			}),
		],
		location: new SourceLocation(4187, 169, 43),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(4188, 169, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(4189, 169, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4190, 169, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		location: new SourceLocation(4191, 170, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4197, 170, 7),
			}),
		],
		location: new SourceLocation(4198, 170, 8),
	}),
	new Token(SqlLexer.Identifier, "orders_p3", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4203, 170, 13),
			}),
		],
		location: new SourceLocation(4204, 170, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4213, 170, 23),
			}),
		],
		location: new SourceLocation(4214, 170, 24),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4223, 170, 33),
			}),
		],
		location: new SourceLocation(4224, 170, 34),
	}),
	new Token(SqlLexer.Identifier, "orders", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4226, 170, 36),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4233, 170, 43),
			}),
		],
		location: new SourceLocation(4227, 170, 37),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(4234, 171, 1),
			}),
		],
		location: new SourceLocation(4238, 171, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4241, 171, 8),
			}),
		],
		location: new SourceLocation(4242, 171, 9),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4248, 171, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4253, 171, 20),
			}),
		],
		location: new SourceLocation(4249, 171, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(4254, 171, 21),
	}),
	new Token(SqlLexer.Identifier, "MODULUS", {
		location: new SourceLocation(4255, 171, 22),
	}),
	new Token(SqlLexer.Numeric, "4", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4262, 171, 29),
			}),
		],
		location: new SourceLocation(4263, 171, 30),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(4264, 171, 31),
	}),
	new Token(SqlLexer.Identifier, "REMAINDER", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4265, 171, 32),
			}),
		],
		location: new SourceLocation(4266, 171, 33),
	}),
	new Token(SqlLexer.Numeric, "2", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4275, 171, 42),
			}),
		],
		location: new SourceLocation(4276, 171, 43),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(4277, 171, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(4278, 171, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4279, 171, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		location: new SourceLocation(4280, 172, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4286, 172, 7),
			}),
		],
		location: new SourceLocation(4287, 172, 8),
	}),
	new Token(SqlLexer.Identifier, "orders_p4", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4292, 172, 13),
			}),
		],
		location: new SourceLocation(4293, 172, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4302, 172, 23),
			}),
		],
		location: new SourceLocation(4303, 172, 24),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4312, 172, 33),
			}),
		],
		location: new SourceLocation(4313, 172, 34),
	}),
	new Token(SqlLexer.Identifier, "orders", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4315, 172, 36),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4322, 172, 43),
			}),
		],
		location: new SourceLocation(4316, 172, 37),
	}),
	new Token(SqlLexer.Reserved, "FOR", {
		keyword: SqlLexer.FOR,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(4323, 173, 1),
			}),
		],
		location: new SourceLocation(4327, 173, 5),
	}),
	new Token(SqlLexer.Identifier, "VALUES", {
		keyword: SqlLexer.VALUES,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4330, 173, 8),
			}),
		],
		location: new SourceLocation(4331, 173, 9),
	}),
	new Token(SqlLexer.Reserved, "WITH", {
		keyword: SqlLexer.WITH,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4337, 173, 15),
			}),
		],
		postskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4342, 173, 20),
			}),
		],
		location: new SourceLocation(4338, 173, 16),
	}),
	new Token(SqlLexer.LeftParen, "(", {
		location: new SourceLocation(4343, 173, 21),
	}),
	new Token(SqlLexer.Identifier, "MODULUS", {
		location: new SourceLocation(4344, 173, 22),
	}),
	new Token(SqlLexer.Numeric, "4", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4351, 173, 29),
			}),
		],
		location: new SourceLocation(4352, 173, 30),
	}),
	new Token(SqlLexer.Comma, ",", {
		location: new SourceLocation(4353, 173, 31),
	}),
	new Token(SqlLexer.Identifier, "REMAINDER", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4354, 173, 32),
			}),
		],
		location: new SourceLocation(4355, 173, 33),
	}),
	new Token(SqlLexer.Numeric, "3", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4364, 173, 42),
			}),
		],
		location: new SourceLocation(4365, 173, 43),
	}),
	new Token(SqlLexer.RightParen, ")", {
		location: new SourceLocation(4366, 173, 44),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(4367, 173, 45),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4368, 173, 46),
			}),
		],
	}),
	new Token(SqlLexer.Reserved, "CREATE", {
		keyword: SqlLexer.CREATE,
		preskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4369, 174, 1),
			}),
		],
		location: new SourceLocation(4370, 175, 1),
	}),
	new Token(SqlLexer.Reserved, "TABLE", {
		keyword: SqlLexer.TABLE,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4376, 175, 7),
			}),
		],
		location: new SourceLocation(4377, 175, 8),
	}),
	new Token(SqlLexer.Identifier, "cities_partdef", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4382, 175, 13),
			}),
		],
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4397, 175, 28),
			}),
		],
		location: new SourceLocation(4383, 175, 14),
	}),
	new Token(SqlLexer.Identifier, "PARTITION", {
		keyword: SqlLexer.PARTITION,
		preskips: [
			new Token(SqlLexer.WhiteSpace, "    ", {
				location: new SourceLocation(4398, 176, 1),
			}),
		],
		location: new SourceLocation(4402, 176, 5),
	}),
	new Token(SqlLexer.Identifier, "OF", {
		keyword: SqlLexer.OF,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4411, 176, 14),
			}),
		],
		location: new SourceLocation(4412, 176, 15),
	}),
	new Token(SqlLexer.Identifier, "cities", {
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4414, 176, 17),
			}),
		],
		location: new SourceLocation(4415, 176, 18),
	}),
	new Token(SqlLexer.Reserved, "DEFAULT", {
		keyword: SqlLexer.DEFAULT,
		preskips: [
			new Token(SqlLexer.WhiteSpace, " ", {
				location: new SourceLocation(4421, 176, 24),
			}),
		],
		location: new SourceLocation(4422, 176, 25),
	}),
	new Token(SqlLexer.SemiColon, ";", {
		location: new SourceLocation(4429, 176, 32),
	}),
	new Token(SqlLexer.EoS, "", {
		postskips: [
			new Token(SqlLexer.LineBreak, "\n", {
				location: new SourceLocation(4430, 176, 33),
			}),
		],
	}),
	new Token(SqlLexer.EoF, "", { location: new SourceLocation(4431, 177, 1) }),
];
