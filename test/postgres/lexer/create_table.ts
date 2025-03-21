import { Keyword, SourceLocation, Token, TokenType } from "../../../src/lexer";

export default [
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(TokenType.Identifier, "films", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(12, 1, 12),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(18, 1, 18),
			}),
		],
		location: new SourceLocation(13, 1, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(TokenType.Identifier, "code", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(21, 2, 1),
			}),
		],
		location: new SourceLocation(25, 2, 5),
	}),
	new Token(TokenType.Identifier, "char", {
		keyword: Keyword.CHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(29, 2, 9),
			}),
		],
		location: new SourceLocation(37, 2, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(41, 2, 21),
	}),
	new Token(TokenType.Numeric, "5", {
		location: new SourceLocation(42, 2, 22),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(43, 2, 23),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(44, 2, 24),
			}),
		],
		location: new SourceLocation(45, 2, 25),
	}),
	new Token(TokenType.Identifier, "firstkey", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(55, 2, 35),
			}),
		],
		location: new SourceLocation(56, 2, 36),
	}),
	new Token(TokenType.Reserved, "PRIMARY", {
		keyword: Keyword.PRIMARY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(64, 2, 44),
			}),
		],
		location: new SourceLocation(65, 2, 45),
	}),
	new Token(TokenType.Identifier, "KEY", {
		keyword: Keyword.KEY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(72, 2, 52),
			}),
		],
		location: new SourceLocation(73, 2, 53),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(77, 2, 57),
			}),
		],
		location: new SourceLocation(76, 2, 56),
	}),
	new Token(TokenType.Identifier, "title", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(78, 3, 1),
			}),
		],
		location: new SourceLocation(82, 3, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(87, 3, 10),
			}),
		],
		location: new SourceLocation(94, 3, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(101, 3, 24),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(102, 3, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(104, 3, 27),
	}),
	new Token(TokenType.Reserved, "NOT", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(105, 3, 28),
			}),
		],
		location: new SourceLocation(106, 3, 29),
	}),
	new Token(TokenType.Reserved, "NULL", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(109, 3, 32),
			}),
		],
		location: new SourceLocation(110, 3, 33),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(115, 3, 38),
			}),
		],
		location: new SourceLocation(114, 3, 37),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(116, 4, 1),
			}),
		],
		location: new SourceLocation(120, 4, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(123, 4, 8),
			}),
		],
		location: new SourceLocation(132, 4, 17),
	}),
	new Token(TokenType.Reserved, "NOT", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(139, 4, 24),
			}),
		],
		location: new SourceLocation(140, 4, 25),
	}),
	new Token(TokenType.Reserved, "NULL", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(143, 4, 28),
			}),
		],
		location: new SourceLocation(144, 4, 29),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(149, 4, 34),
			}),
		],
		location: new SourceLocation(148, 4, 33),
	}),
	new Token(TokenType.Identifier, "date_prod", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(150, 5, 1),
			}),
		],
		location: new SourceLocation(154, 5, 5),
	}),
	new Token(TokenType.Identifier, "date", {
		keyword: Keyword.DATE,
		preskips: [
			new Token(TokenType.WhiteSpace, "   ", {
				location: new SourceLocation(163, 5, 14),
			}),
		],
		location: new SourceLocation(166, 5, 17),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(171, 5, 22),
			}),
		],
		location: new SourceLocation(170, 5, 21),
	}),
	new Token(TokenType.Identifier, "kind", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(172, 6, 1),
			}),
		],
		location: new SourceLocation(176, 6, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(180, 6, 9),
			}),
		],
		location: new SourceLocation(188, 6, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(195, 6, 24),
	}),
	new Token(TokenType.Numeric, "10", {
		location: new SourceLocation(196, 6, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(198, 6, 27),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(200, 6, 29),
			}),
		],
		location: new SourceLocation(199, 6, 28),
	}),
	new Token(TokenType.Identifier, "len", {
		keyword: Keyword.LEN,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(201, 7, 1),
			}),
		],
		location: new SourceLocation(205, 7, 5),
	}),
	new Token(TokenType.Identifier, "interval", {
		keyword: Keyword.INTERVAL,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(208, 7, 8),
			}),
		],
		location: new SourceLocation(217, 7, 17),
	}),
	new Token(TokenType.Identifier, "hour", {
		keyword: Keyword.HOUR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(225, 7, 25),
			}),
		],
		location: new SourceLocation(226, 7, 26),
	}),
	new Token(TokenType.Reserved, "to", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(230, 7, 30),
			}),
		],
		location: new SourceLocation(231, 7, 31),
	}),
	new Token(TokenType.Identifier, "minute", {
		keyword: Keyword.MINUTE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(233, 7, 33),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(240, 7, 40),
			}),
		],
		location: new SourceLocation(234, 7, 34),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(241, 8, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(243, 8, 3),
			}),
		],
		location: new SourceLocation(242, 8, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(244, 9, 1),
			}),
		],
		location: new SourceLocation(245, 10, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(251, 10, 7),
			}),
		],
		location: new SourceLocation(252, 10, 8),
	}),
	new Token(TokenType.Identifier, "films", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(257, 10, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(263, 10, 19),
			}),
		],
		location: new SourceLocation(258, 10, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(265, 10, 21),
			}),
		],
		location: new SourceLocation(264, 10, 20),
	}),
	new Token(TokenType.Identifier, "code", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(266, 11, 1),
			}),
		],
		location: new SourceLocation(270, 11, 5),
	}),
	new Token(TokenType.Identifier, "char", {
		keyword: Keyword.CHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(274, 11, 9),
			}),
		],
		location: new SourceLocation(282, 11, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(286, 11, 21),
	}),
	new Token(TokenType.Numeric, "5", {
		location: new SourceLocation(287, 11, 22),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(288, 11, 23),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(290, 11, 25),
			}),
		],
		location: new SourceLocation(289, 11, 24),
	}),
	new Token(TokenType.Identifier, "title", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(291, 12, 1),
			}),
		],
		location: new SourceLocation(295, 12, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(300, 12, 10),
			}),
		],
		location: new SourceLocation(307, 12, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(314, 12, 24),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(315, 12, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(317, 12, 27),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(319, 12, 29),
			}),
		],
		location: new SourceLocation(318, 12, 28),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(320, 13, 1),
			}),
		],
		location: new SourceLocation(324, 13, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(327, 13, 8),
			}),
		],
		location: new SourceLocation(336, 13, 17),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(344, 13, 25),
			}),
		],
		location: new SourceLocation(343, 13, 24),
	}),
	new Token(TokenType.Identifier, "date_prod", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(345, 14, 1),
			}),
		],
		location: new SourceLocation(349, 14, 5),
	}),
	new Token(TokenType.Identifier, "date", {
		keyword: Keyword.DATE,
		preskips: [
			new Token(TokenType.WhiteSpace, "   ", {
				location: new SourceLocation(358, 14, 14),
			}),
		],
		location: new SourceLocation(361, 14, 17),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(366, 14, 22),
			}),
		],
		location: new SourceLocation(365, 14, 21),
	}),
	new Token(TokenType.Identifier, "kind", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(367, 15, 1),
			}),
		],
		location: new SourceLocation(371, 15, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(375, 15, 9),
			}),
		],
		location: new SourceLocation(383, 15, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(390, 15, 24),
	}),
	new Token(TokenType.Numeric, "10", {
		location: new SourceLocation(391, 15, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(393, 15, 27),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(395, 15, 29),
			}),
		],
		location: new SourceLocation(394, 15, 28),
	}),
	new Token(TokenType.Identifier, "len", {
		keyword: Keyword.LEN,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(396, 16, 1),
			}),
		],
		location: new SourceLocation(400, 16, 5),
	}),
	new Token(TokenType.Identifier, "interval", {
		keyword: Keyword.INTERVAL,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(403, 16, 8),
			}),
		],
		location: new SourceLocation(412, 16, 17),
	}),
	new Token(TokenType.Identifier, "hour", {
		keyword: Keyword.HOUR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(420, 16, 25),
			}),
		],
		location: new SourceLocation(421, 16, 26),
	}),
	new Token(TokenType.Reserved, "to", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(425, 16, 30),
			}),
		],
		location: new SourceLocation(426, 16, 31),
	}),
	new Token(TokenType.Identifier, "minute", {
		keyword: Keyword.MINUTE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(428, 16, 33),
			}),
		],
		location: new SourceLocation(429, 16, 34),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(436, 16, 41),
			}),
		],
		location: new SourceLocation(435, 16, 40),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(437, 17, 1),
			}),
		],
		location: new SourceLocation(441, 17, 5),
	}),
	new Token(TokenType.Identifier, "production", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(451, 17, 15),
			}),
		],
		location: new SourceLocation(452, 17, 16),
	}),
	new Token(TokenType.Reserved, "UNIQUE", {
		keyword: Keyword.UNIQUE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(462, 17, 26),
			}),
		],
		location: new SourceLocation(463, 17, 27),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(469, 17, 33),
	}),
	new Token(TokenType.Identifier, "date_prod", {
		location: new SourceLocation(470, 17, 34),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(480, 17, 44),
			}),
		],
		location: new SourceLocation(479, 17, 43),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(481, 18, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(483, 18, 3),
			}),
		],
		location: new SourceLocation(482, 18, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(484, 19, 1),
			}),
		],
		location: new SourceLocation(485, 20, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(491, 20, 7),
			}),
		],
		location: new SourceLocation(492, 20, 8),
	}),
	new Token(TokenType.Identifier, "films", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(497, 20, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(503, 20, 19),
			}),
		],
		location: new SourceLocation(498, 20, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(505, 20, 21),
			}),
		],
		location: new SourceLocation(504, 20, 20),
	}),
	new Token(TokenType.Identifier, "code", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(506, 21, 1),
			}),
		],
		location: new SourceLocation(510, 21, 5),
	}),
	new Token(TokenType.Identifier, "char", {
		keyword: Keyword.CHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(514, 21, 9),
			}),
		],
		location: new SourceLocation(522, 21, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(526, 21, 21),
	}),
	new Token(TokenType.Numeric, "5", {
		location: new SourceLocation(527, 21, 22),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(528, 21, 23),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(530, 21, 25),
			}),
		],
		location: new SourceLocation(529, 21, 24),
	}),
	new Token(TokenType.Identifier, "title", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(531, 22, 1),
			}),
		],
		location: new SourceLocation(535, 22, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(540, 22, 10),
			}),
		],
		location: new SourceLocation(547, 22, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(554, 22, 24),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(555, 22, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(557, 22, 27),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(559, 22, 29),
			}),
		],
		location: new SourceLocation(558, 22, 28),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(560, 23, 1),
			}),
		],
		location: new SourceLocation(564, 23, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(567, 23, 8),
			}),
		],
		location: new SourceLocation(576, 23, 17),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(584, 23, 25),
			}),
		],
		location: new SourceLocation(583, 23, 24),
	}),
	new Token(TokenType.Identifier, "date_prod", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(585, 24, 1),
			}),
		],
		location: new SourceLocation(589, 24, 5),
	}),
	new Token(TokenType.Identifier, "date", {
		keyword: Keyword.DATE,
		preskips: [
			new Token(TokenType.WhiteSpace, "   ", {
				location: new SourceLocation(598, 24, 14),
			}),
		],
		location: new SourceLocation(601, 24, 17),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(606, 24, 22),
			}),
		],
		location: new SourceLocation(605, 24, 21),
	}),
	new Token(TokenType.Identifier, "kind", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(607, 25, 1),
			}),
		],
		location: new SourceLocation(611, 25, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(615, 25, 9),
			}),
		],
		location: new SourceLocation(623, 25, 17),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(630, 25, 24),
	}),
	new Token(TokenType.Numeric, "10", {
		location: new SourceLocation(631, 25, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(633, 25, 27),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(635, 25, 29),
			}),
		],
		location: new SourceLocation(634, 25, 28),
	}),
	new Token(TokenType.Identifier, "len", {
		keyword: Keyword.LEN,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(636, 26, 1),
			}),
		],
		location: new SourceLocation(640, 26, 5),
	}),
	new Token(TokenType.Identifier, "interval", {
		keyword: Keyword.INTERVAL,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(643, 26, 8),
			}),
		],
		location: new SourceLocation(652, 26, 17),
	}),
	new Token(TokenType.Identifier, "hour", {
		keyword: Keyword.HOUR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(660, 26, 25),
			}),
		],
		location: new SourceLocation(661, 26, 26),
	}),
	new Token(TokenType.Reserved, "to", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(665, 26, 30),
			}),
		],
		location: new SourceLocation(666, 26, 31),
	}),
	new Token(TokenType.Identifier, "minute", {
		keyword: Keyword.MINUTE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(668, 26, 33),
			}),
		],
		location: new SourceLocation(669, 26, 34),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(676, 26, 41),
			}),
		],
		location: new SourceLocation(675, 26, 40),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(677, 27, 1),
			}),
		],
		location: new SourceLocation(681, 27, 5),
	}),
	new Token(TokenType.Identifier, "code_title", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(691, 27, 15),
			}),
		],
		location: new SourceLocation(692, 27, 16),
	}),
	new Token(TokenType.Reserved, "PRIMARY", {
		keyword: Keyword.PRIMARY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(702, 27, 26),
			}),
		],
		location: new SourceLocation(703, 27, 27),
	}),
	new Token(TokenType.Identifier, "KEY", {
		keyword: Keyword.KEY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(710, 27, 34),
			}),
		],
		location: new SourceLocation(711, 27, 35),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(714, 27, 38),
	}),
	new Token(TokenType.Identifier, "code", {
		location: new SourceLocation(715, 27, 39),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(719, 27, 43),
	}),
	new Token(TokenType.Identifier, "title", {
		location: new SourceLocation(720, 27, 44),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(726, 27, 50),
			}),
		],
		location: new SourceLocation(725, 27, 49),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(727, 28, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(729, 28, 3),
			}),
		],
		location: new SourceLocation(728, 28, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(730, 29, 1),
			}),
		],
		location: new SourceLocation(731, 30, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(737, 30, 7),
			}),
		],
		location: new SourceLocation(738, 30, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(743, 30, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(756, 30, 26),
			}),
		],
		location: new SourceLocation(744, 30, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(758, 30, 28),
			}),
		],
		location: new SourceLocation(757, 30, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(759, 31, 1),
			}),
		],
		location: new SourceLocation(764, 31, 6),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(767, 31, 9),
			}),
		],
		location: new SourceLocation(771, 31, 13),
	}),
	new Token(TokenType.Reserved, "PRIMARY", {
		keyword: Keyword.PRIMARY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(778, 31, 20),
			}),
		],
		location: new SourceLocation(779, 31, 21),
	}),
	new Token(TokenType.Identifier, "KEY", {
		keyword: Keyword.KEY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(786, 31, 28),
			}),
		],
		location: new SourceLocation(787, 31, 29),
	}),
	new Token(TokenType.Identifier, "GENERATED", {
		keyword: Keyword.GENERATED,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(790, 31, 32),
			}),
		],
		location: new SourceLocation(791, 31, 33),
	}),
	new Token(TokenType.Identifier, "BY", {
		keyword: Keyword.BY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(800, 31, 42),
			}),
		],
		location: new SourceLocation(801, 31, 43),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(803, 31, 45),
			}),
		],
		location: new SourceLocation(804, 31, 46),
	}),
	new Token(TokenType.Reserved, "AS", {
		keyword: Keyword.AS,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(811, 31, 53),
			}),
		],
		location: new SourceLocation(812, 31, 54),
	}),
	new Token(TokenType.Identifier, "IDENTITY", {
		keyword: Keyword.IDENTITY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(814, 31, 56),
			}),
		],
		location: new SourceLocation(815, 31, 57),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(824, 31, 66),
			}),
		],
		location: new SourceLocation(823, 31, 65),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(825, 32, 1),
			}),
		],
		location: new SourceLocation(830, 32, 6),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "   ", {
				location: new SourceLocation(834, 32, 10),
			}),
		],
		location: new SourceLocation(837, 32, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(844, 32, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(845, 32, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(847, 32, 23),
	}),
	new Token(TokenType.Reserved, "NOT", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(848, 32, 24),
			}),
		],
		location: new SourceLocation(849, 32, 25),
	}),
	new Token(TokenType.Reserved, "NULL", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(852, 32, 28),
			}),
		],
		location: new SourceLocation(853, 32, 29),
	}),
	new Token(TokenType.Reserved, "CHECK", {
		keyword: Keyword.CHECK,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(857, 32, 33),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(863, 32, 39),
			}),
		],
		location: new SourceLocation(858, 32, 34),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(864, 32, 40),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(869, 32, 45),
			}),
		],
		location: new SourceLocation(865, 32, 41),
	}),
	new Token(TokenType.Operator, "<>", {
		location: new SourceLocation(870, 32, 46),
	}),
	new Token(TokenType.String, "''", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(872, 32, 48),
			}),
		],
		location: new SourceLocation(873, 32, 49),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(876, 32, 52),
			}),
		],
		location: new SourceLocation(875, 32, 51),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(877, 33, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(879, 33, 3),
			}),
		],
		location: new SourceLocation(878, 33, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(880, 34, 1),
			}),
		],
		location: new SourceLocation(881, 35, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(887, 35, 7),
			}),
		],
		location: new SourceLocation(888, 35, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(893, 35, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(906, 35, 26),
			}),
		],
		location: new SourceLocation(894, 35, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(908, 35, 28),
			}),
		],
		location: new SourceLocation(907, 35, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(909, 36, 1),
			}),
		],
		location: new SourceLocation(913, 36, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(916, 36, 8),
			}),
		],
		location: new SourceLocation(921, 36, 13),
	}),
	new Token(TokenType.Reserved, "CHECK", {
		keyword: Keyword.CHECK,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(928, 36, 20),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(934, 36, 26),
			}),
		],
		location: new SourceLocation(929, 36, 21),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(935, 36, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(939, 36, 31),
			}),
		],
		location: new SourceLocation(936, 36, 28),
	}),
	new Token(TokenType.Operator, ">", {
		location: new SourceLocation(940, 36, 32),
	}),
	new Token(TokenType.Numeric, "100", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(941, 36, 33),
			}),
		],
		location: new SourceLocation(942, 36, 34),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(945, 36, 37),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(947, 36, 39),
			}),
		],
		location: new SourceLocation(946, 36, 38),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(948, 37, 1),
			}),
		],
		location: new SourceLocation(952, 37, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(956, 37, 9),
			}),
		],
		location: new SourceLocation(960, 37, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(967, 37, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(968, 37, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(971, 37, 24),
			}),
		],
		location: new SourceLocation(970, 37, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(972, 38, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(974, 38, 3),
			}),
		],
		location: new SourceLocation(973, 38, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(975, 39, 1),
			}),
		],
		location: new SourceLocation(976, 40, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(982, 40, 7),
			}),
		],
		location: new SourceLocation(983, 40, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(988, 40, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1001, 40, 26),
			}),
		],
		location: new SourceLocation(989, 40, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1003, 40, 28),
			}),
		],
		location: new SourceLocation(1002, 40, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1004, 41, 1),
			}),
		],
		location: new SourceLocation(1008, 41, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1011, 41, 8),
			}),
		],
		location: new SourceLocation(1016, 41, 13),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1024, 41, 21),
			}),
		],
		location: new SourceLocation(1023, 41, 20),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1025, 42, 1),
			}),
		],
		location: new SourceLocation(1029, 42, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1033, 42, 9),
			}),
		],
		location: new SourceLocation(1037, 42, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1044, 42, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1045, 42, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1047, 42, 23),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1049, 42, 25),
			}),
		],
		location: new SourceLocation(1048, 42, 24),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1050, 43, 1),
			}),
		],
		location: new SourceLocation(1054, 43, 5),
	}),
	new Token(TokenType.Identifier, "con1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1064, 43, 15),
			}),
		],
		location: new SourceLocation(1065, 43, 16),
	}),
	new Token(TokenType.Reserved, "CHECK", {
		keyword: Keyword.CHECK,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1069, 43, 20),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1075, 43, 26),
			}),
		],
		location: new SourceLocation(1070, 43, 21),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1076, 43, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1080, 43, 31),
			}),
		],
		location: new SourceLocation(1077, 43, 28),
	}),
	new Token(TokenType.Operator, ">", {
		location: new SourceLocation(1081, 43, 32),
	}),
	new Token(TokenType.Numeric, "100", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1082, 43, 33),
			}),
		],
		location: new SourceLocation(1083, 43, 34),
	}),
	new Token(TokenType.Reserved, "AND", {
		keyword: Keyword.AND,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1086, 43, 37),
			}),
		],
		location: new SourceLocation(1087, 43, 38),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1090, 43, 41),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1095, 43, 46),
			}),
		],
		location: new SourceLocation(1091, 43, 42),
	}),
	new Token(TokenType.Operator, "<>", {
		location: new SourceLocation(1096, 43, 47),
	}),
	new Token(TokenType.String, "''", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1098, 43, 49),
			}),
		],
		location: new SourceLocation(1099, 43, 50),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1102, 43, 53),
			}),
		],
		location: new SourceLocation(1101, 43, 52),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1103, 44, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1105, 44, 3),
			}),
		],
		location: new SourceLocation(1104, 44, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1106, 45, 1),
			}),
		],
		location: new SourceLocation(1107, 46, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1113, 46, 7),
			}),
		],
		location: new SourceLocation(1114, 46, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1119, 46, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1132, 46, 26),
			}),
		],
		location: new SourceLocation(1120, 46, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1134, 46, 28),
			}),
		],
		location: new SourceLocation(1133, 46, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1135, 47, 1),
			}),
		],
		location: new SourceLocation(1139, 47, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1142, 47, 8),
			}),
		],
		location: new SourceLocation(1147, 47, 13),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1155, 47, 21),
			}),
		],
		location: new SourceLocation(1154, 47, 20),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1156, 48, 1),
			}),
		],
		location: new SourceLocation(1160, 48, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1164, 48, 9),
			}),
		],
		location: new SourceLocation(1168, 48, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1175, 48, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1176, 48, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1178, 48, 23),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1180, 48, 25),
			}),
		],
		location: new SourceLocation(1179, 48, 24),
	}),
	new Token(TokenType.Reserved, "PRIMARY", {
		keyword: Keyword.PRIMARY,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1181, 49, 1),
			}),
		],
		location: new SourceLocation(1185, 49, 5),
	}),
	new Token(TokenType.Identifier, "KEY", {
		keyword: Keyword.KEY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1192, 49, 12),
			}),
		],
		location: new SourceLocation(1193, 49, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1196, 49, 16),
	}),
	new Token(TokenType.Identifier, "did", {
		location: new SourceLocation(1197, 49, 17),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1201, 49, 21),
			}),
		],
		location: new SourceLocation(1200, 49, 20),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1202, 50, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1204, 50, 3),
			}),
		],
		location: new SourceLocation(1203, 50, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1205, 51, 1),
			}),
		],
		location: new SourceLocation(1206, 52, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1212, 52, 7),
			}),
		],
		location: new SourceLocation(1213, 52, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1218, 52, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1231, 52, 26),
			}),
		],
		location: new SourceLocation(1219, 52, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1233, 52, 28),
			}),
		],
		location: new SourceLocation(1232, 52, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1234, 53, 1),
			}),
		],
		location: new SourceLocation(1238, 53, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1241, 53, 8),
			}),
		],
		location: new SourceLocation(1246, 53, 13),
	}),
	new Token(TokenType.Reserved, "PRIMARY", {
		keyword: Keyword.PRIMARY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1253, 53, 20),
			}),
		],
		location: new SourceLocation(1254, 53, 21),
	}),
	new Token(TokenType.Identifier, "KEY", {
		keyword: Keyword.KEY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1261, 53, 28),
			}),
		],
		location: new SourceLocation(1262, 53, 29),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1266, 53, 33),
			}),
		],
		location: new SourceLocation(1265, 53, 32),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1267, 54, 1),
			}),
		],
		location: new SourceLocation(1271, 54, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1275, 54, 9),
			}),
		],
		location: new SourceLocation(1279, 54, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1286, 54, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1287, 54, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1290, 54, 24),
			}),
		],
		location: new SourceLocation(1289, 54, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1291, 55, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1293, 55, 3),
			}),
		],
		location: new SourceLocation(1292, 55, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1294, 56, 1),
			}),
		],
		location: new SourceLocation(1295, 57, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1301, 57, 7),
			}),
		],
		location: new SourceLocation(1302, 57, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1307, 57, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1320, 57, 26),
			}),
		],
		location: new SourceLocation(1308, 57, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1322, 57, 28),
			}),
		],
		location: new SourceLocation(1321, 57, 27),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1323, 58, 1),
			}),
		],
		location: new SourceLocation(1327, 58, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1331, 58, 9),
			}),
		],
		location: new SourceLocation(1337, 58, 15),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1344, 58, 22),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1345, 58, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1347, 58, 25),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1348, 58, 26),
			}),
		],
		location: new SourceLocation(1349, 58, 27),
	}),
	new Token(TokenType.String, "'Luso Films'", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1356, 58, 34),
			}),
		],
		location: new SourceLocation(1357, 58, 35),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1370, 58, 48),
			}),
		],
		location: new SourceLocation(1369, 58, 47),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1371, 59, 1),
			}),
		],
		location: new SourceLocation(1375, 59, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(1378, 59, 8),
			}),
		],
		location: new SourceLocation(1385, 59, 15),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1392, 59, 22),
			}),
		],
		location: new SourceLocation(1393, 59, 23),
	}),
	new Token(TokenType.Identifier, "nextval", {
		keyword: Keyword.NEXTVAL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1400, 59, 30),
			}),
		],
		location: new SourceLocation(1401, 59, 31),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1408, 59, 38),
	}),
	new Token(TokenType.String, "'distributors_serial'", {
		location: new SourceLocation(1409, 59, 39),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1430, 59, 60),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1432, 59, 62),
			}),
		],
		location: new SourceLocation(1431, 59, 61),
	}),
	new Token(TokenType.Identifier, "modtime", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1433, 60, 1),
			}),
		],
		location: new SourceLocation(1437, 60, 5),
	}),
	new Token(TokenType.Identifier, "timestamp", {
		keyword: Keyword.TIMESTAMP,
		preskips: [
			new Token(TokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1444, 60, 12),
			}),
		],
		location: new SourceLocation(1447, 60, 15),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1456, 60, 24),
			}),
		],
		location: new SourceLocation(1457, 60, 25),
	}),
	new Token(TokenType.Reserved, "current_timestamp", {
		keyword: Keyword.CURRENT_TIMESTAMP,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1464, 60, 32),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1482, 60, 50),
			}),
		],
		location: new SourceLocation(1465, 60, 33),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1483, 61, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1485, 61, 3),
			}),
		],
		location: new SourceLocation(1484, 61, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1486, 62, 1),
			}),
		],
		location: new SourceLocation(1487, 63, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1493, 63, 7),
			}),
		],
		location: new SourceLocation(1494, 63, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1499, 63, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1512, 63, 26),
			}),
		],
		location: new SourceLocation(1500, 63, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1514, 63, 28),
			}),
		],
		location: new SourceLocation(1513, 63, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1515, 64, 1),
			}),
		],
		location: new SourceLocation(1519, 64, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1522, 64, 8),
			}),
		],
		location: new SourceLocation(1527, 64, 13),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1534, 64, 20),
			}),
		],
		location: new SourceLocation(1535, 64, 21),
	}),
	new Token(TokenType.Identifier, "no_null", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1545, 64, 31),
			}),
		],
		location: new SourceLocation(1546, 64, 32),
	}),
	new Token(TokenType.Reserved, "NOT", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1553, 64, 39),
			}),
		],
		location: new SourceLocation(1554, 64, 40),
	}),
	new Token(TokenType.Reserved, "NULL", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1557, 64, 43),
			}),
		],
		location: new SourceLocation(1558, 64, 44),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1563, 64, 49),
			}),
		],
		location: new SourceLocation(1562, 64, 48),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1564, 65, 1),
			}),
		],
		location: new SourceLocation(1568, 65, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1572, 65, 9),
			}),
		],
		location: new SourceLocation(1576, 65, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1583, 65, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1584, 65, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1586, 65, 23),
	}),
	new Token(TokenType.Reserved, "NOT", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1587, 65, 24),
			}),
		],
		location: new SourceLocation(1588, 65, 25),
	}),
	new Token(TokenType.Reserved, "NULL", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1591, 65, 28),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1596, 65, 33),
			}),
		],
		location: new SourceLocation(1592, 65, 29),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1597, 66, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1599, 66, 3),
			}),
		],
		location: new SourceLocation(1598, 66, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1600, 67, 1),
			}),
		],
		location: new SourceLocation(1601, 68, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1607, 68, 7),
			}),
		],
		location: new SourceLocation(1608, 68, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1613, 68, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1626, 68, 26),
			}),
		],
		location: new SourceLocation(1614, 68, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1628, 68, 28),
			}),
		],
		location: new SourceLocation(1627, 68, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1629, 69, 1),
			}),
		],
		location: new SourceLocation(1633, 69, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1636, 69, 8),
			}),
		],
		location: new SourceLocation(1641, 69, 13),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1649, 69, 21),
			}),
		],
		location: new SourceLocation(1648, 69, 20),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1650, 70, 1),
			}),
		],
		location: new SourceLocation(1654, 70, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1658, 70, 9),
			}),
		],
		location: new SourceLocation(1662, 70, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1669, 70, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1670, 70, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1672, 70, 23),
	}),
	new Token(TokenType.Reserved, "UNIQUE", {
		keyword: Keyword.UNIQUE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1673, 70, 24),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1680, 70, 31),
			}),
		],
		location: new SourceLocation(1674, 70, 25),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1681, 71, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1683, 71, 3),
			}),
		],
		location: new SourceLocation(1682, 71, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1684, 72, 1),
			}),
		],
		location: new SourceLocation(1685, 73, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1691, 73, 7),
			}),
		],
		location: new SourceLocation(1692, 73, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1697, 73, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1710, 73, 26),
			}),
		],
		location: new SourceLocation(1698, 73, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1712, 73, 28),
			}),
		],
		location: new SourceLocation(1711, 73, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1713, 74, 1),
			}),
		],
		location: new SourceLocation(1717, 74, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1720, 74, 8),
			}),
		],
		location: new SourceLocation(1725, 74, 13),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1733, 74, 21),
			}),
		],
		location: new SourceLocation(1732, 74, 20),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1734, 75, 1),
			}),
		],
		location: new SourceLocation(1738, 75, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1742, 75, 9),
			}),
		],
		location: new SourceLocation(1746, 75, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1753, 75, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1754, 75, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1756, 75, 23),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1758, 75, 25),
			}),
		],
		location: new SourceLocation(1757, 75, 24),
	}),
	new Token(TokenType.Reserved, "UNIQUE", {
		keyword: Keyword.UNIQUE,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1759, 76, 1),
			}),
		],
		location: new SourceLocation(1763, 76, 5),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1769, 76, 11),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		location: new SourceLocation(1770, 76, 12),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1775, 76, 17),
			}),
		],
		location: new SourceLocation(1774, 76, 16),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1776, 77, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1778, 77, 3),
			}),
		],
		location: new SourceLocation(1777, 77, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1779, 78, 1),
			}),
		],
		location: new SourceLocation(1780, 79, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1786, 79, 7),
			}),
		],
		location: new SourceLocation(1787, 79, 8),
	}),
	new Token(TokenType.Identifier, "distributors", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1792, 79, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1805, 79, 26),
			}),
		],
		location: new SourceLocation(1793, 79, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1807, 79, 28),
			}),
		],
		location: new SourceLocation(1806, 79, 27),
	}),
	new Token(TokenType.Identifier, "did", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1808, 80, 1),
			}),
		],
		location: new SourceLocation(1812, 80, 5),
	}),
	new Token(TokenType.Identifier, "integer", {
		keyword: Keyword.INTEGER,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1815, 80, 8),
			}),
		],
		location: new SourceLocation(1820, 80, 13),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1828, 80, 21),
			}),
		],
		location: new SourceLocation(1827, 80, 20),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1829, 81, 1),
			}),
		],
		location: new SourceLocation(1833, 81, 5),
	}),
	new Token(TokenType.Identifier, "varchar", {
		keyword: Keyword.VARCHAR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1837, 81, 9),
			}),
		],
		location: new SourceLocation(1841, 81, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1848, 81, 20),
	}),
	new Token(TokenType.Numeric, "40", {
		location: new SourceLocation(1849, 81, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1851, 81, 23),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1853, 81, 25),
			}),
		],
		location: new SourceLocation(1852, 81, 24),
	}),
	new Token(TokenType.Reserved, "UNIQUE", {
		keyword: Keyword.UNIQUE,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1854, 82, 1),
			}),
		],
		location: new SourceLocation(1858, 82, 5),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1864, 82, 11),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		location: new SourceLocation(1865, 82, 12),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1869, 82, 16),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1870, 82, 17),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1875, 82, 22),
			}),
		],
		location: new SourceLocation(1871, 82, 18),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1876, 82, 23),
	}),
	new Token(TokenType.Identifier, "fillfactor", {
		keyword: Keyword.FILLFACTOR,
		location: new SourceLocation(1877, 82, 24),
	}),
	new Token(TokenType.Operator, "=", {
		location: new SourceLocation(1887, 82, 34),
	}),
	new Token(TokenType.Numeric, "70", {
		location: new SourceLocation(1888, 82, 35),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1891, 82, 38),
			}),
		],
		location: new SourceLocation(1890, 82, 37),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1893, 83, 2),
			}),
		],
		location: new SourceLocation(1892, 83, 1),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1898, 84, 5),
			}),
		],
		location: new SourceLocation(1894, 84, 1),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(1899, 84, 6),
	}),
	new Token(TokenType.Identifier, "fillfactor", {
		keyword: Keyword.FILLFACTOR,
		location: new SourceLocation(1900, 84, 7),
	}),
	new Token(TokenType.Operator, "=", {
		location: new SourceLocation(1910, 84, 17),
	}),
	new Token(TokenType.Numeric, "70", {
		location: new SourceLocation(1911, 84, 18),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1913, 84, 20),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1915, 84, 22),
			}),
		],
		location: new SourceLocation(1914, 84, 21),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1916, 85, 1),
			}),
		],
		location: new SourceLocation(1917, 86, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1923, 86, 7),
			}),
		],
		location: new SourceLocation(1924, 86, 8),
	}),
	new Token(TokenType.Identifier, "array_int", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1929, 86, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1939, 86, 23),
			}),
		],
		location: new SourceLocation(1930, 86, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1941, 86, 25),
			}),
		],
		location: new SourceLocation(1940, 86, 24),
	}),
	new Token(TokenType.Identifier, "vector", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1942, 87, 1),
			}),
		],
		location: new SourceLocation(1946, 87, 5),
	}),
	new Token(TokenType.Identifier, "int", {
		keyword: Keyword.INT,
		preskips: [
			new Token(TokenType.WhiteSpace, "  ", {
				location: new SourceLocation(1952, 87, 11),
			}),
		],
		location: new SourceLocation(1954, 87, 13),
	}),
	new Token(TokenType.LeftBracket, "[", {
		location: new SourceLocation(1957, 87, 16),
	}),
	new Token(TokenType.RightBracket, "]", {
		location: new SourceLocation(1958, 87, 17),
	}),
	new Token(TokenType.LeftBracket, "[", {
		location: new SourceLocation(1959, 87, 18),
	}),
	new Token(TokenType.RightBracket, "]", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1961, 87, 20),
			}),
		],
		location: new SourceLocation(1960, 87, 19),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(1962, 88, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1964, 88, 3),
			}),
		],
		location: new SourceLocation(1963, 88, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1965, 89, 1),
			}),
		],
		location: new SourceLocation(1966, 90, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1972, 90, 7),
			}),
		],
		location: new SourceLocation(1973, 90, 8),
	}),
	new Token(TokenType.Identifier, "circles", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1978, 90, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1986, 90, 21),
			}),
		],
		location: new SourceLocation(1979, 90, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(1988, 90, 23),
			}),
		],
		location: new SourceLocation(1987, 90, 22),
	}),
	new Token(TokenType.Identifier, "c", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1989, 91, 1),
			}),
		],
		location: new SourceLocation(1993, 91, 5),
	}),
	new Token(TokenType.Identifier, "circle", {
		keyword: Keyword.CIRCLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(1994, 91, 6),
			}),
		],
		location: new SourceLocation(1995, 91, 7),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2002, 91, 14),
			}),
		],
		location: new SourceLocation(2001, 91, 13),
	}),
	new Token(TokenType.Identifier, "EXCLUDE", {
		keyword: Keyword.EXCLUDE,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2003, 92, 1),
			}),
		],
		location: new SourceLocation(2007, 92, 5),
	}),
	new Token(TokenType.Reserved, "USING", {
		keyword: Keyword.USING,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2014, 92, 12),
			}),
		],
		location: new SourceLocation(2015, 92, 13),
	}),
	new Token(TokenType.Identifier, "gist", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2020, 92, 18),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2025, 92, 23),
			}),
		],
		location: new SourceLocation(2021, 92, 19),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2026, 92, 24),
	}),
	new Token(TokenType.Identifier, "c", {
		location: new SourceLocation(2027, 92, 25),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2028, 92, 26),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2033, 92, 31),
			}),
		],
		location: new SourceLocation(2029, 92, 27),
	}),
	new Token(TokenType.Operator, "&&", {
		location: new SourceLocation(2034, 92, 32),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2037, 92, 35),
			}),
		],
		location: new SourceLocation(2036, 92, 34),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2038, 93, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2040, 93, 3),
			}),
		],
		location: new SourceLocation(2039, 93, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2041, 94, 1),
			}),
		],
		location: new SourceLocation(2042, 95, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2048, 95, 7),
			}),
		],
		location: new SourceLocation(2049, 95, 8),
	}),
	new Token(TokenType.Identifier, "cinemas", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2054, 95, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2062, 95, 21),
			}),
		],
		location: new SourceLocation(2055, 95, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2064, 95, 23),
			}),
		],
		location: new SourceLocation(2063, 95, 22),
	}),
	new Token(TokenType.Identifier, "id", {
		keyword: Keyword.ID,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(2065, 96, 1),
			}),
		],
		location: new SourceLocation(2073, 96, 9),
	}),
	new Token(TokenType.Identifier, "serial", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2075, 96, 11),
			}),
		],
		location: new SourceLocation(2076, 96, 12),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2083, 96, 19),
			}),
		],
		location: new SourceLocation(2082, 96, 18),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(2084, 97, 1),
			}),
		],
		location: new SourceLocation(2092, 97, 9),
	}),
	new Token(TokenType.Identifier, "text", {
		keyword: Keyword.TEXT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2096, 97, 13),
			}),
		],
		location: new SourceLocation(2097, 97, 14),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2102, 97, 19),
			}),
		],
		location: new SourceLocation(2101, 97, 18),
	}),
	new Token(TokenType.Identifier, "location", {
		keyword: Keyword.LOCATION,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(2103, 98, 1),
			}),
		],
		location: new SourceLocation(2111, 98, 9),
	}),
	new Token(TokenType.Identifier, "text", {
		keyword: Keyword.TEXT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2119, 98, 17),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2124, 98, 22),
			}),
		],
		location: new SourceLocation(2120, 98, 18),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2125, 99, 1),
	}),
	new Token(TokenType.Identifier, "TABLESPACE", {
		keyword: Keyword.TABLESPACE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2126, 99, 2),
			}),
		],
		location: new SourceLocation(2127, 99, 3),
	}),
	new Token(TokenType.Identifier, "diskvol1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2137, 99, 13),
			}),
		],
		location: new SourceLocation(2138, 99, 14),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2147, 99, 23),
			}),
		],
		location: new SourceLocation(2146, 99, 22),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2148, 100, 1),
			}),
		],
		location: new SourceLocation(2149, 101, 1),
	}),
	new Token(TokenType.Identifier, "TYPE", {
		keyword: Keyword.TYPE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2155, 101, 7),
			}),
		],
		location: new SourceLocation(2156, 101, 8),
	}),
	new Token(TokenType.Identifier, "employee_type", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2160, 101, 12),
			}),
		],
		location: new SourceLocation(2161, 101, 13),
	}),
	new Token(TokenType.Reserved, "AS", {
		keyword: Keyword.AS,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2174, 101, 26),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2177, 101, 29),
			}),
		],
		location: new SourceLocation(2175, 101, 27),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2178, 101, 30),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		location: new SourceLocation(2179, 101, 31),
	}),
	new Token(TokenType.Identifier, "text", {
		keyword: Keyword.TEXT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2183, 101, 35),
			}),
		],
		location: new SourceLocation(2184, 101, 36),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(2188, 101, 40),
	}),
	new Token(TokenType.Identifier, "salary", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2189, 101, 41),
			}),
		],
		location: new SourceLocation(2190, 101, 42),
	}),
	new Token(TokenType.Identifier, "numeric", {
		keyword: Keyword.NUMERIC,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2196, 101, 48),
			}),
		],
		location: new SourceLocation(2197, 101, 49),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2204, 101, 56),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2206, 101, 58),
			}),
		],
		location: new SourceLocation(2205, 101, 57),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2207, 102, 1),
			}),
		],
		location: new SourceLocation(2208, 103, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2214, 103, 7),
			}),
		],
		location: new SourceLocation(2215, 103, 8),
	}),
	new Token(TokenType.Identifier, "employees", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2220, 103, 13),
			}),
		],
		location: new SourceLocation(2221, 103, 14),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2230, 103, 23),
			}),
		],
		location: new SourceLocation(2231, 103, 24),
	}),
	new Token(TokenType.Identifier, "employee_type", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2233, 103, 26),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2247, 103, 40),
			}),
		],
		location: new SourceLocation(2234, 103, 27),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2249, 103, 42),
			}),
		],
		location: new SourceLocation(2248, 103, 41),
	}),
	new Token(TokenType.Reserved, "PRIMARY", {
		keyword: Keyword.PRIMARY,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2250, 104, 1),
			}),
		],
		location: new SourceLocation(2254, 104, 5),
	}),
	new Token(TokenType.Identifier, "KEY", {
		keyword: Keyword.KEY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2261, 104, 12),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2265, 104, 16),
			}),
		],
		location: new SourceLocation(2262, 104, 13),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2266, 104, 17),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		location: new SourceLocation(2267, 104, 18),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2271, 104, 22),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2273, 104, 24),
			}),
		],
		location: new SourceLocation(2272, 104, 23),
	}),
	new Token(TokenType.Identifier, "salary", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2274, 105, 1),
			}),
		],
		location: new SourceLocation(2278, 105, 5),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2284, 105, 11),
			}),
		],
		location: new SourceLocation(2285, 105, 12),
	}),
	new Token(TokenType.Identifier, "OPTIONS", {
		keyword: Keyword.OPTIONS,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2289, 105, 16),
			}),
		],
		location: new SourceLocation(2290, 105, 17),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2297, 105, 24),
			}),
		],
		location: new SourceLocation(2298, 105, 25),
	}),
	new Token(TokenType.Numeric, "1000", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2305, 105, 32),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2310, 105, 37),
			}),
		],
		location: new SourceLocation(2306, 105, 33),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2311, 106, 1),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2313, 106, 3),
			}),
		],
		location: new SourceLocation(2312, 106, 2),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2314, 107, 1),
			}),
		],
		location: new SourceLocation(2315, 108, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2321, 108, 7),
			}),
		],
		location: new SourceLocation(2322, 108, 8),
	}),
	new Token(TokenType.Identifier, "measurement", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2327, 108, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2339, 108, 25),
			}),
		],
		location: new SourceLocation(2328, 108, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2341, 108, 27),
			}),
		],
		location: new SourceLocation(2340, 108, 26),
	}),
	new Token(TokenType.Identifier, "logdate", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2342, 109, 1),
			}),
		],
		location: new SourceLocation(2346, 109, 5),
	}),
	new Token(TokenType.Identifier, "date", {
		keyword: Keyword.DATE,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(2353, 109, 12),
			}),
		],
		location: new SourceLocation(2362, 109, 21),
	}),
	new Token(TokenType.Reserved, "not", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2366, 109, 25),
			}),
		],
		location: new SourceLocation(2367, 109, 26),
	}),
	new Token(TokenType.Reserved, "null", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2370, 109, 29),
			}),
		],
		location: new SourceLocation(2371, 109, 30),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2376, 109, 35),
			}),
		],
		location: new SourceLocation(2375, 109, 34),
	}),
	new Token(TokenType.Identifier, "peaktemp", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2377, 110, 1),
			}),
		],
		location: new SourceLocation(2381, 110, 5),
	}),
	new Token(TokenType.Identifier, "int", {
		keyword: Keyword.INT,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(2389, 110, 13),
			}),
		],
		location: new SourceLocation(2397, 110, 21),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2401, 110, 25),
			}),
		],
		location: new SourceLocation(2400, 110, 24),
	}),
	new Token(TokenType.Identifier, "unitsales", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2402, 111, 1),
			}),
		],
		location: new SourceLocation(2406, 111, 5),
	}),
	new Token(TokenType.Identifier, "int", {
		keyword: Keyword.INT,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(2415, 111, 14),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2425, 111, 24),
			}),
		],
		location: new SourceLocation(2422, 111, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2426, 112, 1),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2427, 112, 2),
			}),
		],
		location: new SourceLocation(2428, 112, 3),
	}),
	new Token(TokenType.Identifier, "BY", {
		keyword: Keyword.BY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2437, 112, 12),
			}),
		],
		location: new SourceLocation(2438, 112, 13),
	}),
	new Token(TokenType.Identifier, "RANGE", {
		keyword: Keyword.RANGE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2440, 112, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2446, 112, 21),
			}),
		],
		location: new SourceLocation(2441, 112, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2447, 112, 22),
	}),
	new Token(TokenType.Identifier, "logdate", {
		location: new SourceLocation(2448, 112, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2455, 112, 30),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2457, 112, 32),
			}),
		],
		location: new SourceLocation(2456, 112, 31),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2458, 113, 1),
			}),
		],
		location: new SourceLocation(2459, 114, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2465, 114, 7),
			}),
		],
		location: new SourceLocation(2466, 114, 8),
	}),
	new Token(TokenType.Identifier, "measurement_year_month", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2471, 114, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2494, 114, 36),
			}),
		],
		location: new SourceLocation(2472, 114, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2496, 114, 38),
			}),
		],
		location: new SourceLocation(2495, 114, 37),
	}),
	new Token(TokenType.Identifier, "logdate", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2497, 115, 1),
			}),
		],
		location: new SourceLocation(2501, 115, 5),
	}),
	new Token(TokenType.Identifier, "date", {
		keyword: Keyword.DATE,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(2508, 115, 12),
			}),
		],
		location: new SourceLocation(2517, 115, 21),
	}),
	new Token(TokenType.Reserved, "not", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2521, 115, 25),
			}),
		],
		location: new SourceLocation(2522, 115, 26),
	}),
	new Token(TokenType.Reserved, "null", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2525, 115, 29),
			}),
		],
		location: new SourceLocation(2526, 115, 30),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2531, 115, 35),
			}),
		],
		location: new SourceLocation(2530, 115, 34),
	}),
	new Token(TokenType.Identifier, "peaktemp", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2532, 116, 1),
			}),
		],
		location: new SourceLocation(2536, 116, 5),
	}),
	new Token(TokenType.Identifier, "int", {
		keyword: Keyword.INT,
		preskips: [
			new Token(TokenType.WhiteSpace, "        ", {
				location: new SourceLocation(2544, 116, 13),
			}),
		],
		location: new SourceLocation(2552, 116, 21),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2556, 116, 25),
			}),
		],
		location: new SourceLocation(2555, 116, 24),
	}),
	new Token(TokenType.Identifier, "unitsales", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2557, 117, 1),
			}),
		],
		location: new SourceLocation(2561, 117, 5),
	}),
	new Token(TokenType.Identifier, "int", {
		keyword: Keyword.INT,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(2570, 117, 14),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2580, 117, 24),
			}),
		],
		location: new SourceLocation(2577, 117, 21),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2581, 118, 1),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2582, 118, 2),
			}),
		],
		location: new SourceLocation(2583, 118, 3),
	}),
	new Token(TokenType.Identifier, "BY", {
		keyword: Keyword.BY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2592, 118, 12),
			}),
		],
		location: new SourceLocation(2593, 118, 13),
	}),
	new Token(TokenType.Identifier, "RANGE", {
		keyword: Keyword.RANGE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2595, 118, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2601, 118, 21),
			}),
		],
		location: new SourceLocation(2596, 118, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2602, 118, 22),
	}),
	new Token(TokenType.Identifier, "EXTRACT", {
		keyword: Keyword.EXTRACT,
		location: new SourceLocation(2603, 118, 23),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2610, 118, 30),
	}),
	new Token(TokenType.Identifier, "YEAR", {
		keyword: Keyword.YEAR,
		location: new SourceLocation(2611, 118, 31),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2615, 118, 35),
			}),
		],
		location: new SourceLocation(2616, 118, 36),
	}),
	new Token(TokenType.Identifier, "logdate", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2620, 118, 40),
			}),
		],
		location: new SourceLocation(2621, 118, 41),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2628, 118, 48),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(2629, 118, 49),
	}),
	new Token(TokenType.Identifier, "EXTRACT", {
		keyword: Keyword.EXTRACT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2630, 118, 50),
			}),
		],
		location: new SourceLocation(2631, 118, 51),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2638, 118, 58),
	}),
	new Token(TokenType.Identifier, "MONTH", {
		keyword: Keyword.MONTH,
		location: new SourceLocation(2639, 118, 59),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2644, 118, 64),
			}),
		],
		location: new SourceLocation(2645, 118, 65),
	}),
	new Token(TokenType.Identifier, "logdate", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2649, 118, 69),
			}),
		],
		location: new SourceLocation(2650, 118, 70),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2657, 118, 77),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2658, 118, 78),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2660, 118, 80),
			}),
		],
		location: new SourceLocation(2659, 118, 79),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2661, 119, 1),
			}),
		],
		location: new SourceLocation(2662, 120, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2668, 120, 7),
			}),
		],
		location: new SourceLocation(2669, 120, 8),
	}),
	new Token(TokenType.Identifier, "cities", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2674, 120, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2681, 120, 20),
			}),
		],
		location: new SourceLocation(2675, 120, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2683, 120, 22),
			}),
		],
		location: new SourceLocation(2682, 120, 21),
	}),
	new Token(TokenType.Identifier, "city_id", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2684, 121, 1),
			}),
		],
		location: new SourceLocation(2688, 121, 5),
	}),
	new Token(TokenType.Identifier, "bigserial", {
		preskips: [
			new Token(TokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2695, 121, 12),
			}),
		],
		location: new SourceLocation(2701, 121, 18),
	}),
	new Token(TokenType.Reserved, "not", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2710, 121, 27),
			}),
		],
		location: new SourceLocation(2711, 121, 28),
	}),
	new Token(TokenType.Reserved, "null", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2714, 121, 31),
			}),
		],
		location: new SourceLocation(2715, 121, 32),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2720, 121, 37),
			}),
		],
		location: new SourceLocation(2719, 121, 36),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2721, 122, 1),
			}),
		],
		location: new SourceLocation(2725, 122, 5),
	}),
	new Token(TokenType.Identifier, "text", {
		keyword: Keyword.TEXT,
		preskips: [
			new Token(TokenType.WhiteSpace, "         ", {
				location: new SourceLocation(2729, 122, 9),
			}),
		],
		location: new SourceLocation(2738, 122, 18),
	}),
	new Token(TokenType.Reserved, "not", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2742, 122, 22),
			}),
		],
		location: new SourceLocation(2743, 122, 23),
	}),
	new Token(TokenType.Reserved, "null", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2746, 122, 26),
			}),
		],
		location: new SourceLocation(2747, 122, 27),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2752, 122, 32),
			}),
		],
		location: new SourceLocation(2751, 122, 31),
	}),
	new Token(TokenType.Identifier, "population", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2753, 123, 1),
			}),
		],
		location: new SourceLocation(2757, 123, 5),
	}),
	new Token(TokenType.Identifier, "bigint", {
		keyword: Keyword.BIGINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2767, 123, 15),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2776, 123, 24),
			}),
		],
		location: new SourceLocation(2770, 123, 18),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2777, 124, 1),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2778, 124, 2),
			}),
		],
		location: new SourceLocation(2779, 124, 3),
	}),
	new Token(TokenType.Identifier, "BY", {
		keyword: Keyword.BY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2788, 124, 12),
			}),
		],
		location: new SourceLocation(2789, 124, 13),
	}),
	new Token(TokenType.Identifier, "LIST", {
		keyword: Keyword.LIST,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2791, 124, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2796, 124, 20),
			}),
		],
		location: new SourceLocation(2792, 124, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2797, 124, 21),
	}),
	new Token(TokenType.Identifier, "left", {
		keyword: Keyword.LEFT,
		location: new SourceLocation(2798, 124, 22),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2802, 124, 26),
	}),
	new Token(TokenType.Identifier, "lower", {
		keyword: Keyword.LOWER,
		location: new SourceLocation(2803, 124, 27),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2808, 124, 32),
	}),
	new Token(TokenType.Identifier, "name", {
		keyword: Keyword.NAME,
		location: new SourceLocation(2809, 124, 33),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2813, 124, 37),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(2814, 124, 38),
	}),
	new Token(TokenType.Numeric, "1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2815, 124, 39),
			}),
		],
		location: new SourceLocation(2816, 124, 40),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2817, 124, 41),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2818, 124, 42),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2820, 124, 44),
			}),
		],
		location: new SourceLocation(2819, 124, 43),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2821, 125, 1),
			}),
		],
		location: new SourceLocation(2822, 126, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2828, 126, 7),
			}),
		],
		location: new SourceLocation(2829, 126, 8),
	}),
	new Token(TokenType.Identifier, "orders", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2834, 126, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2841, 126, 20),
			}),
		],
		location: new SourceLocation(2835, 126, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2843, 126, 22),
			}),
		],
		location: new SourceLocation(2842, 126, 21),
	}),
	new Token(TokenType.Identifier, "order_id", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2844, 127, 1),
			}),
		],
		location: new SourceLocation(2848, 127, 5),
	}),
	new Token(TokenType.Identifier, "bigint", {
		keyword: Keyword.BIGINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "     ", {
				location: new SourceLocation(2856, 127, 13),
			}),
		],
		location: new SourceLocation(2861, 127, 18),
	}),
	new Token(TokenType.Reserved, "not", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2867, 127, 24),
			}),
		],
		location: new SourceLocation(2868, 127, 25),
	}),
	new Token(TokenType.Reserved, "null", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2871, 127, 28),
			}),
		],
		location: new SourceLocation(2872, 127, 29),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2877, 127, 34),
			}),
		],
		location: new SourceLocation(2876, 127, 33),
	}),
	new Token(TokenType.Identifier, "cust_id", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2878, 128, 1),
			}),
		],
		location: new SourceLocation(2882, 128, 5),
	}),
	new Token(TokenType.Identifier, "bigint", {
		keyword: Keyword.BIGINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2889, 128, 12),
			}),
		],
		location: new SourceLocation(2895, 128, 18),
	}),
	new Token(TokenType.Reserved, "not", {
		keyword: Keyword.NOT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2901, 128, 24),
			}),
		],
		location: new SourceLocation(2902, 128, 25),
	}),
	new Token(TokenType.Reserved, "null", {
		keyword: Keyword.NULL,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2905, 128, 28),
			}),
		],
		location: new SourceLocation(2906, 128, 29),
	}),
	new Token(TokenType.Comma, ",", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2911, 128, 34),
			}),
		],
		location: new SourceLocation(2910, 128, 33),
	}),
	new Token(TokenType.Identifier, "status", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(2912, 129, 1),
			}),
		],
		location: new SourceLocation(2916, 129, 5),
	}),
	new Token(TokenType.Identifier, "text", {
		keyword: Keyword.TEXT,
		preskips: [
			new Token(TokenType.WhiteSpace, "       ", {
				location: new SourceLocation(2922, 129, 11),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2933, 129, 22),
			}),
		],
		location: new SourceLocation(2929, 129, 18),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2934, 130, 1),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2935, 130, 2),
			}),
		],
		location: new SourceLocation(2936, 130, 3),
	}),
	new Token(TokenType.Identifier, "BY", {
		keyword: Keyword.BY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2945, 130, 12),
			}),
		],
		location: new SourceLocation(2946, 130, 13),
	}),
	new Token(TokenType.Identifier, "HASH", {
		keyword: Keyword.HASH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2948, 130, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2953, 130, 20),
			}),
		],
		location: new SourceLocation(2949, 130, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(2954, 130, 21),
	}),
	new Token(TokenType.Identifier, "order_id", {
		location: new SourceLocation(2955, 130, 22),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(2963, 130, 30),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2965, 130, 32),
			}),
		],
		location: new SourceLocation(2964, 130, 31),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(2966, 131, 1),
			}),
		],
		location: new SourceLocation(2967, 132, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2973, 132, 7),
			}),
		],
		location: new SourceLocation(2974, 132, 8),
	}),
	new Token(TokenType.Identifier, "measurement_y2016m07", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(2979, 132, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3000, 132, 34),
			}),
		],
		location: new SourceLocation(2980, 132, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3001, 133, 1),
			}),
		],
		location: new SourceLocation(3005, 133, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3014, 133, 14),
			}),
		],
		location: new SourceLocation(3015, 133, 15),
	}),
	new Token(TokenType.Identifier, "measurement", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3017, 133, 17),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3029, 133, 29),
			}),
		],
		location: new SourceLocation(3018, 133, 18),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3031, 133, 31),
			}),
		],
		location: new SourceLocation(3030, 133, 30),
	}),
	new Token(TokenType.Identifier, "unitsales", {
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3032, 134, 1),
			}),
		],
		location: new SourceLocation(3036, 134, 5),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3045, 134, 14),
			}),
		],
		location: new SourceLocation(3046, 134, 15),
	}),
	new Token(TokenType.Numeric, "0", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3053, 134, 22),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3055, 134, 24),
			}),
		],
		location: new SourceLocation(3054, 134, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3056, 135, 1),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3057, 135, 2),
			}),
		],
		location: new SourceLocation(3058, 135, 3),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3061, 135, 6),
			}),
		],
		location: new SourceLocation(3062, 135, 7),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3068, 135, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3073, 135, 18),
			}),
		],
		location: new SourceLocation(3069, 135, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3074, 135, 19),
	}),
	new Token(TokenType.String, "'2016-07-01'", {
		location: new SourceLocation(3075, 135, 20),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3087, 135, 32),
	}),
	new Token(TokenType.Reserved, "TO", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3088, 135, 33),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3091, 135, 36),
			}),
		],
		location: new SourceLocation(3089, 135, 34),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3092, 135, 37),
	}),
	new Token(TokenType.String, "'2016-08-01'", {
		location: new SourceLocation(3093, 135, 38),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3105, 135, 50),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3107, 135, 52),
			}),
		],
		location: new SourceLocation(3106, 135, 51),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3108, 136, 1),
			}),
		],
		location: new SourceLocation(3109, 137, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3115, 137, 7),
			}),
		],
		location: new SourceLocation(3116, 137, 8),
	}),
	new Token(TokenType.Identifier, "measurement_ym_older", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3121, 137, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3142, 137, 34),
			}),
		],
		location: new SourceLocation(3122, 137, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3143, 138, 1),
			}),
		],
		location: new SourceLocation(3147, 138, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3156, 138, 14),
			}),
		],
		location: new SourceLocation(3157, 138, 15),
	}),
	new Token(TokenType.Identifier, "measurement_year_month", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3159, 138, 17),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3182, 138, 40),
			}),
		],
		location: new SourceLocation(3160, 138, 18),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3183, 139, 1),
			}),
		],
		location: new SourceLocation(3187, 139, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3190, 139, 8),
			}),
		],
		location: new SourceLocation(3191, 139, 9),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3197, 139, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3202, 139, 20),
			}),
		],
		location: new SourceLocation(3198, 139, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3203, 139, 21),
	}),
	new Token(TokenType.Identifier, "MINVALUE", {
		keyword: Keyword.MINVALUE,
		location: new SourceLocation(3204, 139, 22),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3212, 139, 30),
	}),
	new Token(TokenType.Identifier, "MINVALUE", {
		keyword: Keyword.MINVALUE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3213, 139, 31),
			}),
		],
		location: new SourceLocation(3214, 139, 32),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3222, 139, 40),
	}),
	new Token(TokenType.Reserved, "TO", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3223, 139, 41),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3226, 139, 44),
			}),
		],
		location: new SourceLocation(3224, 139, 42),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3227, 139, 45),
	}),
	new Token(TokenType.Numeric, "2016", {
		location: new SourceLocation(3228, 139, 46),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3232, 139, 50),
	}),
	new Token(TokenType.Numeric, "11", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3233, 139, 51),
			}),
		],
		location: new SourceLocation(3234, 139, 52),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3236, 139, 54),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3238, 139, 56),
			}),
		],
		location: new SourceLocation(3237, 139, 55),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3239, 140, 1),
			}),
		],
		location: new SourceLocation(3240, 141, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3246, 141, 7),
			}),
		],
		location: new SourceLocation(3247, 141, 8),
	}),
	new Token(TokenType.Identifier, "measurement_ym_y2016m11", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3252, 141, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3276, 141, 37),
			}),
		],
		location: new SourceLocation(3253, 141, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3277, 142, 1),
			}),
		],
		location: new SourceLocation(3281, 142, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3290, 142, 14),
			}),
		],
		location: new SourceLocation(3291, 142, 15),
	}),
	new Token(TokenType.Identifier, "measurement_year_month", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3293, 142, 17),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3316, 142, 40),
			}),
		],
		location: new SourceLocation(3294, 142, 18),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3317, 143, 1),
			}),
		],
		location: new SourceLocation(3321, 143, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3324, 143, 8),
			}),
		],
		location: new SourceLocation(3325, 143, 9),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3331, 143, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3336, 143, 20),
			}),
		],
		location: new SourceLocation(3332, 143, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3337, 143, 21),
	}),
	new Token(TokenType.Numeric, "2016", {
		location: new SourceLocation(3338, 143, 22),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3342, 143, 26),
	}),
	new Token(TokenType.Numeric, "11", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3343, 143, 27),
			}),
		],
		location: new SourceLocation(3344, 143, 28),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3346, 143, 30),
	}),
	new Token(TokenType.Reserved, "TO", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3347, 143, 31),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3350, 143, 34),
			}),
		],
		location: new SourceLocation(3348, 143, 32),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3351, 143, 35),
	}),
	new Token(TokenType.Numeric, "2016", {
		location: new SourceLocation(3352, 143, 36),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3356, 143, 40),
	}),
	new Token(TokenType.Numeric, "12", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3357, 143, 41),
			}),
		],
		location: new SourceLocation(3358, 143, 42),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3360, 143, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3362, 143, 46),
			}),
		],
		location: new SourceLocation(3361, 143, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3363, 144, 1),
			}),
		],
		location: new SourceLocation(3364, 145, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3370, 145, 7),
			}),
		],
		location: new SourceLocation(3371, 145, 8),
	}),
	new Token(TokenType.Identifier, "measurement_ym_y2016m12", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3376, 145, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3400, 145, 37),
			}),
		],
		location: new SourceLocation(3377, 145, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3401, 146, 1),
			}),
		],
		location: new SourceLocation(3405, 146, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3414, 146, 14),
			}),
		],
		location: new SourceLocation(3415, 146, 15),
	}),
	new Token(TokenType.Identifier, "measurement_year_month", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3417, 146, 17),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3440, 146, 40),
			}),
		],
		location: new SourceLocation(3418, 146, 18),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3441, 147, 1),
			}),
		],
		location: new SourceLocation(3445, 147, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3448, 147, 8),
			}),
		],
		location: new SourceLocation(3449, 147, 9),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3455, 147, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3460, 147, 20),
			}),
		],
		location: new SourceLocation(3456, 147, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3461, 147, 21),
	}),
	new Token(TokenType.Numeric, "2016", {
		location: new SourceLocation(3462, 147, 22),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3466, 147, 26),
	}),
	new Token(TokenType.Numeric, "12", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3467, 147, 27),
			}),
		],
		location: new SourceLocation(3468, 147, 28),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3470, 147, 30),
	}),
	new Token(TokenType.Reserved, "TO", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3471, 147, 31),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3474, 147, 34),
			}),
		],
		location: new SourceLocation(3472, 147, 32),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3475, 147, 35),
	}),
	new Token(TokenType.Numeric, "2017", {
		location: new SourceLocation(3476, 147, 36),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3480, 147, 40),
	}),
	new Token(TokenType.Numeric, "01", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3481, 147, 41),
			}),
		],
		location: new SourceLocation(3482, 147, 42),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3484, 147, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3486, 147, 46),
			}),
		],
		location: new SourceLocation(3485, 147, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3487, 148, 1),
			}),
		],
		location: new SourceLocation(3488, 149, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3494, 149, 7),
			}),
		],
		location: new SourceLocation(3495, 149, 8),
	}),
	new Token(TokenType.Identifier, "measurement_ym_y2017m01", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3500, 149, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3524, 149, 37),
			}),
		],
		location: new SourceLocation(3501, 149, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3525, 150, 1),
			}),
		],
		location: new SourceLocation(3529, 150, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3538, 150, 14),
			}),
		],
		location: new SourceLocation(3539, 150, 15),
	}),
	new Token(TokenType.Identifier, "measurement_year_month", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3541, 150, 17),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3564, 150, 40),
			}),
		],
		location: new SourceLocation(3542, 150, 18),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3565, 151, 1),
			}),
		],
		location: new SourceLocation(3569, 151, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3572, 151, 8),
			}),
		],
		location: new SourceLocation(3573, 151, 9),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3579, 151, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3584, 151, 20),
			}),
		],
		location: new SourceLocation(3580, 151, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3585, 151, 21),
	}),
	new Token(TokenType.Numeric, "2017", {
		location: new SourceLocation(3586, 151, 22),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3590, 151, 26),
	}),
	new Token(TokenType.Numeric, "01", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3591, 151, 27),
			}),
		],
		location: new SourceLocation(3592, 151, 28),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3594, 151, 30),
	}),
	new Token(TokenType.Reserved, "TO", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3595, 151, 31),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3598, 151, 34),
			}),
		],
		location: new SourceLocation(3596, 151, 32),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3599, 151, 35),
	}),
	new Token(TokenType.Numeric, "2017", {
		location: new SourceLocation(3600, 151, 36),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3604, 151, 40),
	}),
	new Token(TokenType.Numeric, "02", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3605, 151, 41),
			}),
		],
		location: new SourceLocation(3606, 151, 42),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3608, 151, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3610, 151, 46),
			}),
		],
		location: new SourceLocation(3609, 151, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3611, 152, 1),
			}),
		],
		location: new SourceLocation(3612, 153, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3618, 153, 7),
			}),
		],
		location: new SourceLocation(3619, 153, 8),
	}),
	new Token(TokenType.Identifier, "cities_ab", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3624, 153, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3634, 153, 23),
			}),
		],
		location: new SourceLocation(3625, 153, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3635, 154, 1),
			}),
		],
		location: new SourceLocation(3639, 154, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3648, 154, 14),
			}),
		],
		location: new SourceLocation(3649, 154, 15),
	}),
	new Token(TokenType.Identifier, "cities", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3651, 154, 17),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3658, 154, 24),
			}),
		],
		location: new SourceLocation(3652, 154, 18),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3660, 154, 26),
			}),
		],
		location: new SourceLocation(3659, 154, 25),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3661, 155, 1),
			}),
		],
		location: new SourceLocation(3665, 155, 5),
	}),
	new Token(TokenType.Identifier, "city_id_nonzero", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3675, 155, 15),
			}),
		],
		location: new SourceLocation(3676, 155, 16),
	}),
	new Token(TokenType.Reserved, "CHECK", {
		keyword: Keyword.CHECK,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3691, 155, 31),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3697, 155, 37),
			}),
		],
		location: new SourceLocation(3692, 155, 32),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3698, 155, 38),
	}),
	new Token(TokenType.Identifier, "city_id", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3706, 155, 46),
			}),
		],
		location: new SourceLocation(3699, 155, 39),
	}),
	new Token(TokenType.Operator, "!=", {
		location: new SourceLocation(3707, 155, 47),
	}),
	new Token(TokenType.Numeric, "0", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3709, 155, 49),
			}),
		],
		location: new SourceLocation(3710, 155, 50),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3712, 155, 52),
			}),
		],
		location: new SourceLocation(3711, 155, 51),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3713, 156, 1),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3714, 156, 2),
			}),
		],
		location: new SourceLocation(3715, 156, 3),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3718, 156, 6),
			}),
		],
		location: new SourceLocation(3719, 156, 7),
	}),
	new Token(TokenType.Reserved, "IN", {
		keyword: Keyword.IN,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3725, 156, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3728, 156, 16),
			}),
		],
		location: new SourceLocation(3726, 156, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3729, 156, 17),
	}),
	new Token(TokenType.String, "'a'", {
		location: new SourceLocation(3730, 156, 18),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3733, 156, 21),
	}),
	new Token(TokenType.String, "'b'", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3734, 156, 22),
			}),
		],
		location: new SourceLocation(3735, 156, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3738, 156, 26),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3740, 156, 28),
			}),
		],
		location: new SourceLocation(3739, 156, 27),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3741, 157, 1),
			}),
		],
		location: new SourceLocation(3742, 158, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3748, 158, 7),
			}),
		],
		location: new SourceLocation(3749, 158, 8),
	}),
	new Token(TokenType.Identifier, "cities_ab", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3754, 158, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3764, 158, 23),
			}),
		],
		location: new SourceLocation(3755, 158, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3765, 159, 1),
			}),
		],
		location: new SourceLocation(3769, 159, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3778, 159, 14),
			}),
		],
		location: new SourceLocation(3779, 159, 15),
	}),
	new Token(TokenType.Identifier, "cities", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3781, 159, 17),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3788, 159, 24),
			}),
		],
		location: new SourceLocation(3782, 159, 18),
	}),
	new Token(TokenType.LeftParen, "(", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3790, 159, 26),
			}),
		],
		location: new SourceLocation(3789, 159, 25),
	}),
	new Token(TokenType.Reserved, "CONSTRAINT", {
		keyword: Keyword.CONSTRAINT,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3791, 160, 1),
			}),
		],
		location: new SourceLocation(3795, 160, 5),
	}),
	new Token(TokenType.Identifier, "city_id_nonzero", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3805, 160, 15),
			}),
		],
		location: new SourceLocation(3806, 160, 16),
	}),
	new Token(TokenType.Reserved, "CHECK", {
		keyword: Keyword.CHECK,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3821, 160, 31),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3827, 160, 37),
			}),
		],
		location: new SourceLocation(3822, 160, 32),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3828, 160, 38),
	}),
	new Token(TokenType.Identifier, "city_id", {
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3836, 160, 46),
			}),
		],
		location: new SourceLocation(3829, 160, 39),
	}),
	new Token(TokenType.Operator, "!=", {
		location: new SourceLocation(3837, 160, 47),
	}),
	new Token(TokenType.Numeric, "0", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3839, 160, 49),
			}),
		],
		location: new SourceLocation(3840, 160, 50),
	}),
	new Token(TokenType.RightParen, ")", {
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3842, 160, 52),
			}),
		],
		location: new SourceLocation(3841, 160, 51),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3843, 161, 1),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3844, 161, 2),
			}),
		],
		location: new SourceLocation(3845, 161, 3),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3848, 161, 6),
			}),
		],
		location: new SourceLocation(3849, 161, 7),
	}),
	new Token(TokenType.Reserved, "IN", {
		keyword: Keyword.IN,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3855, 161, 13),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3858, 161, 16),
			}),
		],
		location: new SourceLocation(3856, 161, 14),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3859, 161, 17),
	}),
	new Token(TokenType.String, "'a'", {
		location: new SourceLocation(3860, 161, 18),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(3863, 161, 21),
	}),
	new Token(TokenType.String, "'b'", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3864, 161, 22),
			}),
		],
		location: new SourceLocation(3865, 161, 23),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3868, 161, 26),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3869, 161, 27),
			}),
		],
		location: new SourceLocation(3870, 161, 28),
	}),
	new Token(TokenType.Identifier, "BY", {
		keyword: Keyword.BY,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3879, 161, 37),
			}),
		],
		location: new SourceLocation(3880, 161, 38),
	}),
	new Token(TokenType.Identifier, "RANGE", {
		keyword: Keyword.RANGE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3882, 161, 40),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3888, 161, 46),
			}),
		],
		location: new SourceLocation(3883, 161, 41),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3889, 161, 47),
	}),
	new Token(TokenType.Identifier, "population", {
		location: new SourceLocation(3890, 161, 48),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3900, 161, 58),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3902, 161, 60),
			}),
		],
		location: new SourceLocation(3901, 161, 59),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3903, 162, 1),
			}),
		],
		location: new SourceLocation(3904, 163, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3910, 163, 7),
			}),
		],
		location: new SourceLocation(3911, 163, 8),
	}),
	new Token(TokenType.Identifier, "cities_ab_10000_to_100000", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3916, 163, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(3942, 163, 39),
			}),
		],
		location: new SourceLocation(3917, 163, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3943, 164, 1),
			}),
		],
		location: new SourceLocation(3947, 164, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3956, 164, 14),
			}),
		],
		location: new SourceLocation(3957, 164, 15),
	}),
	new Token(TokenType.Identifier, "cities_ab", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3959, 164, 17),
			}),
		],
		location: new SourceLocation(3960, 164, 18),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3969, 164, 27),
			}),
		],
		location: new SourceLocation(3970, 164, 28),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3973, 164, 31),
			}),
		],
		location: new SourceLocation(3974, 164, 32),
	}),
	new Token(TokenType.Reserved, "FROM", {
		keyword: Keyword.FROM,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3980, 164, 38),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3985, 164, 43),
			}),
		],
		location: new SourceLocation(3981, 164, 39),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3986, 164, 44),
	}),
	new Token(TokenType.Numeric, "10000", {
		location: new SourceLocation(3987, 164, 45),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(3992, 164, 50),
	}),
	new Token(TokenType.Reserved, "TO", {
		keyword: Keyword.TO,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3993, 164, 51),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(3996, 164, 54),
			}),
		],
		location: new SourceLocation(3994, 164, 52),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(3997, 164, 55),
	}),
	new Token(TokenType.Numeric, "100000", {
		location: new SourceLocation(3998, 164, 56),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(4004, 164, 62),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4006, 164, 64),
			}),
		],
		location: new SourceLocation(4005, 164, 63),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4007, 165, 1),
			}),
		],
		location: new SourceLocation(4008, 166, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4014, 166, 7),
			}),
		],
		location: new SourceLocation(4015, 166, 8),
	}),
	new Token(TokenType.Identifier, "orders_p1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4020, 166, 13),
			}),
		],
		location: new SourceLocation(4021, 166, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4030, 166, 23),
			}),
		],
		location: new SourceLocation(4031, 166, 24),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4040, 166, 33),
			}),
		],
		location: new SourceLocation(4041, 166, 34),
	}),
	new Token(TokenType.Identifier, "orders", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4043, 166, 36),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4050, 166, 43),
			}),
		],
		location: new SourceLocation(4044, 166, 37),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(4051, 167, 1),
			}),
		],
		location: new SourceLocation(4055, 167, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4058, 167, 8),
			}),
		],
		location: new SourceLocation(4059, 167, 9),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4065, 167, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4070, 167, 20),
			}),
		],
		location: new SourceLocation(4066, 167, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(4071, 167, 21),
	}),
	new Token(TokenType.Identifier, "MODULUS", {
		location: new SourceLocation(4072, 167, 22),
	}),
	new Token(TokenType.Numeric, "4", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4079, 167, 29),
			}),
		],
		location: new SourceLocation(4080, 167, 30),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(4081, 167, 31),
	}),
	new Token(TokenType.Identifier, "REMAINDER", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4082, 167, 32),
			}),
		],
		location: new SourceLocation(4083, 167, 33),
	}),
	new Token(TokenType.Numeric, "0", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4092, 167, 42),
			}),
		],
		location: new SourceLocation(4093, 167, 43),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(4094, 167, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4096, 167, 46),
			}),
		],
		location: new SourceLocation(4095, 167, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		location: new SourceLocation(4097, 168, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4103, 168, 7),
			}),
		],
		location: new SourceLocation(4104, 168, 8),
	}),
	new Token(TokenType.Identifier, "orders_p2", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4109, 168, 13),
			}),
		],
		location: new SourceLocation(4110, 168, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4119, 168, 23),
			}),
		],
		location: new SourceLocation(4120, 168, 24),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4129, 168, 33),
			}),
		],
		location: new SourceLocation(4130, 168, 34),
	}),
	new Token(TokenType.Identifier, "orders", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4132, 168, 36),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4139, 168, 43),
			}),
		],
		location: new SourceLocation(4133, 168, 37),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(4140, 169, 1),
			}),
		],
		location: new SourceLocation(4144, 169, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4147, 169, 8),
			}),
		],
		location: new SourceLocation(4148, 169, 9),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4154, 169, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4159, 169, 20),
			}),
		],
		location: new SourceLocation(4155, 169, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(4160, 169, 21),
	}),
	new Token(TokenType.Identifier, "MODULUS", {
		location: new SourceLocation(4161, 169, 22),
	}),
	new Token(TokenType.Numeric, "4", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4168, 169, 29),
			}),
		],
		location: new SourceLocation(4169, 169, 30),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(4170, 169, 31),
	}),
	new Token(TokenType.Identifier, "REMAINDER", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4171, 169, 32),
			}),
		],
		location: new SourceLocation(4172, 169, 33),
	}),
	new Token(TokenType.Numeric, "1", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4181, 169, 42),
			}),
		],
		location: new SourceLocation(4182, 169, 43),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(4183, 169, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4185, 169, 46),
			}),
		],
		location: new SourceLocation(4184, 169, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		location: new SourceLocation(4186, 170, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4192, 170, 7),
			}),
		],
		location: new SourceLocation(4193, 170, 8),
	}),
	new Token(TokenType.Identifier, "orders_p3", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4198, 170, 13),
			}),
		],
		location: new SourceLocation(4199, 170, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4208, 170, 23),
			}),
		],
		location: new SourceLocation(4209, 170, 24),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4218, 170, 33),
			}),
		],
		location: new SourceLocation(4219, 170, 34),
	}),
	new Token(TokenType.Identifier, "orders", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4221, 170, 36),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4228, 170, 43),
			}),
		],
		location: new SourceLocation(4222, 170, 37),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(4229, 171, 1),
			}),
		],
		location: new SourceLocation(4233, 171, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4236, 171, 8),
			}),
		],
		location: new SourceLocation(4237, 171, 9),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4243, 171, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4248, 171, 20),
			}),
		],
		location: new SourceLocation(4244, 171, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(4249, 171, 21),
	}),
	new Token(TokenType.Identifier, "MODULUS", {
		location: new SourceLocation(4250, 171, 22),
	}),
	new Token(TokenType.Numeric, "4", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4257, 171, 29),
			}),
		],
		location: new SourceLocation(4258, 171, 30),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(4259, 171, 31),
	}),
	new Token(TokenType.Identifier, "REMAINDER", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4260, 171, 32),
			}),
		],
		location: new SourceLocation(4261, 171, 33),
	}),
	new Token(TokenType.Numeric, "2", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4270, 171, 42),
			}),
		],
		location: new SourceLocation(4271, 171, 43),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(4272, 171, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4274, 171, 46),
			}),
		],
		location: new SourceLocation(4273, 171, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		location: new SourceLocation(4275, 172, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4281, 172, 7),
			}),
		],
		location: new SourceLocation(4282, 172, 8),
	}),
	new Token(TokenType.Identifier, "orders_p4", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4287, 172, 13),
			}),
		],
		location: new SourceLocation(4288, 172, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4297, 172, 23),
			}),
		],
		location: new SourceLocation(4298, 172, 24),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4307, 172, 33),
			}),
		],
		location: new SourceLocation(4308, 172, 34),
	}),
	new Token(TokenType.Identifier, "orders", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4310, 172, 36),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4317, 172, 43),
			}),
		],
		location: new SourceLocation(4311, 172, 37),
	}),
	new Token(TokenType.Reserved, "FOR", {
		keyword: Keyword.FOR,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(4318, 173, 1),
			}),
		],
		location: new SourceLocation(4322, 173, 5),
	}),
	new Token(TokenType.Identifier, "VALUES", {
		keyword: Keyword.VALUES,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4325, 173, 8),
			}),
		],
		location: new SourceLocation(4326, 173, 9),
	}),
	new Token(TokenType.Reserved, "WITH", {
		keyword: Keyword.WITH,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4332, 173, 15),
			}),
		],
		postskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4337, 173, 20),
			}),
		],
		location: new SourceLocation(4333, 173, 16),
	}),
	new Token(TokenType.LeftParen, "(", {
		location: new SourceLocation(4338, 173, 21),
	}),
	new Token(TokenType.Identifier, "MODULUS", {
		location: new SourceLocation(4339, 173, 22),
	}),
	new Token(TokenType.Numeric, "4", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4346, 173, 29),
			}),
		],
		location: new SourceLocation(4347, 173, 30),
	}),
	new Token(TokenType.Comma, ",", {
		location: new SourceLocation(4348, 173, 31),
	}),
	new Token(TokenType.Identifier, "REMAINDER", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4349, 173, 32),
			}),
		],
		location: new SourceLocation(4350, 173, 33),
	}),
	new Token(TokenType.Numeric, "3", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4359, 173, 42),
			}),
		],
		location: new SourceLocation(4360, 173, 43),
	}),
	new Token(TokenType.RightParen, ")", {
		location: new SourceLocation(4361, 173, 44),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4363, 173, 46),
			}),
		],
		location: new SourceLocation(4362, 173, 45),
	}),
	new Token(TokenType.Reserved, "CREATE", {
		keyword: Keyword.CREATE,
		preskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4364, 174, 1),
			}),
		],
		location: new SourceLocation(4365, 175, 1),
	}),
	new Token(TokenType.Reserved, "TABLE", {
		keyword: Keyword.TABLE,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4371, 175, 7),
			}),
		],
		location: new SourceLocation(4372, 175, 8),
	}),
	new Token(TokenType.Identifier, "cities_partdef", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4377, 175, 13),
			}),
		],
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4392, 175, 28),
			}),
		],
		location: new SourceLocation(4378, 175, 14),
	}),
	new Token(TokenType.Identifier, "PARTITION", {
		keyword: Keyword.PARTITION,
		preskips: [
			new Token(TokenType.WhiteSpace, "    ", {
				location: new SourceLocation(4393, 176, 1),
			}),
		],
		location: new SourceLocation(4397, 176, 5),
	}),
	new Token(TokenType.Identifier, "OF", {
		keyword: Keyword.OF,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4406, 176, 14),
			}),
		],
		location: new SourceLocation(4407, 176, 15),
	}),
	new Token(TokenType.Identifier, "cities", {
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4409, 176, 17),
			}),
		],
		location: new SourceLocation(4410, 176, 18),
	}),
	new Token(TokenType.Reserved, "DEFAULT", {
		keyword: Keyword.DEFAULT,
		preskips: [
			new Token(TokenType.WhiteSpace, " ", {
				location: new SourceLocation(4416, 176, 24),
			}),
		],
		location: new SourceLocation(4417, 176, 25),
	}),
	new Token(TokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(TokenType.LineBreak, "\n", {
				location: new SourceLocation(4425, 176, 33),
			}),
		],
		location: new SourceLocation(4424, 176, 32),
	}),
	new Token(TokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(4426, 177, 1),
	}),
];
