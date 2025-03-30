import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeyword, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "add", {
		keyword: SqlKeyword.ADD,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(15, 1, 15),
			}),
		],
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(19, 1, 19),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		location: new SourceLocation(20, 1, 20),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(27, 1, 27),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(28, 1, 28),
			}),
		],
		location: new SourceLocation(29, 1, 29),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(36, 1, 36),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(37, 1, 37),
			}),
		],
		location: new SourceLocation(38, 1, 38),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(45, 1, 45),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(53, 1, 53),
			}),
		],
		location: new SourceLocation(46, 1, 46),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(54, 2, 1),
			}),
		],
		location: new SourceLocation(58, 2, 5),
	}),
	new Token(SqlTokenType.String, "'select $1 + $2;'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(60, 2, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(78, 2, 25),
			}),
		],
		location: new SourceLocation(61, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "LANGUAGE", {
		keyword: SqlKeyword.LANGUAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(79, 3, 1),
			}),
		],
		location: new SourceLocation(83, 3, 5),
	}),
	new Token(SqlTokenType.Identifier, "SQL", {
		keyword: SqlKeyword.SQL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(91, 3, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(95, 3, 17),
			}),
		],
		location: new SourceLocation(92, 3, 14),
	}),
	new Token(SqlTokenType.Identifier, "IMMUTABLE", {
		keyword: SqlKeyword.IMMUTABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(96, 4, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(109, 4, 14),
			}),
		],
		location: new SourceLocation(100, 4, 5),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(110, 5, 1),
			}),
		],
		location: new SourceLocation(114, 5, 5),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeyword.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(121, 5, 12),
			}),
		],
		location: new SourceLocation(122, 5, 13),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeyword.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(126, 5, 17),
			}),
		],
		location: new SourceLocation(127, 5, 18),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeyword.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(129, 5, 20),
			}),
		],
		location: new SourceLocation(130, 5, 21),
	}),
	new Token(SqlTokenType.Identifier, "INPUT", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(134, 5, 25),
			}),
		],
		location: new SourceLocation(135, 5, 26),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(141, 5, 32),
			}),
		],
		location: new SourceLocation(140, 5, 31),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(142, 6, 1),
			}),
		],
		location: new SourceLocation(143, 7, 1),
	}),
	new Token(SqlTokenType.Identifier, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(149, 7, 7),
			}),
		],
		location: new SourceLocation(150, 7, 8),
	}),
	new Token(SqlTokenType.Identifier, "add", {
		keyword: SqlKeyword.ADD,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(158, 7, 16),
			}),
		],
		location: new SourceLocation(159, 7, 17),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(162, 7, 20),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(163, 7, 21),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(164, 7, 22),
			}),
		],
		location: new SourceLocation(165, 7, 23),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(172, 7, 30),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(173, 7, 31),
			}),
		],
		location: new SourceLocation(174, 7, 32),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(175, 7, 33),
			}),
		],
		location: new SourceLocation(176, 7, 34),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(183, 7, 41),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(184, 7, 42),
			}),
		],
		location: new SourceLocation(185, 7, 43),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(192, 7, 50),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(200, 7, 58),
			}),
		],
		location: new SourceLocation(193, 7, 51),
	}),
	new Token(SqlTokenType.Identifier, "LANGUAGE", {
		keyword: SqlKeyword.LANGUAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(201, 8, 1),
			}),
		],
		location: new SourceLocation(205, 8, 5),
	}),
	new Token(SqlTokenType.Identifier, "SQL", {
		keyword: SqlKeyword.SQL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(213, 8, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(217, 8, 17),
			}),
		],
		location: new SourceLocation(214, 8, 14),
	}),
	new Token(SqlTokenType.Identifier, "IMMUTABLE", {
		keyword: SqlKeyword.IMMUTABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(218, 9, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(231, 9, 14),
			}),
		],
		location: new SourceLocation(222, 9, 5),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(232, 10, 1),
			}),
		],
		location: new SourceLocation(236, 10, 5),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeyword.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(243, 10, 12),
			}),
		],
		location: new SourceLocation(244, 10, 13),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeyword.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(248, 10, 17),
			}),
		],
		location: new SourceLocation(249, 10, 18),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeyword.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(251, 10, 20),
			}),
		],
		location: new SourceLocation(252, 10, 21),
	}),
	new Token(SqlTokenType.Identifier, "INPUT", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(256, 10, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(262, 10, 31),
			}),
		],
		location: new SourceLocation(257, 10, 26),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(263, 11, 1),
			}),
		],
		location: new SourceLocation(267, 11, 5),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(273, 11, 11),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(275, 11, 13),
			}),
		],
		location: new SourceLocation(274, 11, 12),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(276, 11, 14),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(277, 11, 15),
			}),
		],
		location: new SourceLocation(278, 11, 16),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(280, 11, 18),
			}),
		],
		location: new SourceLocation(279, 11, 17),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(281, 12, 1),
			}),
		],
		location: new SourceLocation(282, 13, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeyword.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(288, 13, 7),
			}),
		],
		location: new SourceLocation(289, 13, 8),
	}),
	new Token(SqlTokenType.Identifier, "REPLACE", {
		keyword: SqlKeyword.REPLACE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(291, 13, 10),
			}),
		],
		location: new SourceLocation(292, 13, 11),
	}),
	new Token(SqlTokenType.Identifier, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(299, 13, 18),
			}),
		],
		location: new SourceLocation(300, 13, 19),
	}),
	new Token(SqlTokenType.Identifier, "increment", {
		keyword: SqlKeyword.INCREMENT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(308, 13, 27),
			}),
		],
		location: new SourceLocation(309, 13, 28),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(318, 13, 37),
	}),
	new Token(SqlTokenType.Identifier, "i", {
		location: new SourceLocation(319, 13, 38),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(320, 13, 39),
			}),
		],
		location: new SourceLocation(321, 13, 40),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(328, 13, 47),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(329, 13, 48),
			}),
		],
		location: new SourceLocation(330, 13, 49),
	}),
	new Token(SqlTokenType.Identifier, "integer", {
		keyword: SqlKeyword.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(337, 13, 56),
			}),
		],
		location: new SourceLocation(338, 13, 57),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(345, 13, 64),
			}),
		],
		location: new SourceLocation(346, 13, 65),
	}),
	new Token(
		SqlTokenType.String,
		"$$\n        BEGIN\n                RETURN i + 1;\n        END;\n$$",
		{
			preskips: [
				new Token(SqlTokenType.WhiteSpace, " ", {
					location: new SourceLocation(348, 13, 67),
				}),
			],
			location: new SourceLocation(349, 13, 68),
		},
	),
	new Token(SqlTokenType.Identifier, "LANGUAGE", {
		keyword: SqlKeyword.LANGUAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(411, 17, 3),
			}),
		],
		location: new SourceLocation(412, 17, 4),
	}),
	new Token(SqlTokenType.Identifier, "plpgsql", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(420, 17, 12),
			}),
		],
		location: new SourceLocation(421, 17, 13),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(429, 17, 21),
			}),
		],
		location: new SourceLocation(428, 17, 20),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(430, 18, 1),
			}),
		],
		location: new SourceLocation(431, 19, 1),
	}),
	new Token(SqlTokenType.Identifier, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(437, 19, 7),
			}),
		],
		location: new SourceLocation(438, 19, 8),
	}),
	new Token(SqlTokenType.Identifier, "dup", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(446, 19, 16),
			}),
		],
		location: new SourceLocation(447, 19, 17),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(450, 19, 20),
	}),
	new Token(SqlTokenType.Reserved, "in", {
		keyword: SqlKeyword.IN,
		location: new SourceLocation(451, 19, 21),
	}),
	new Token(SqlTokenType.Identifier, "int", {
		keyword: SqlKeyword.INT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(453, 19, 23),
			}),
		],
		location: new SourceLocation(454, 19, 24),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(457, 19, 27),
	}),
	new Token(SqlTokenType.Identifier, "out", {
		keyword: SqlKeyword.OUT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(458, 19, 28),
			}),
		],
		location: new SourceLocation(459, 19, 29),
	}),
	new Token(SqlTokenType.Identifier, "f1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(462, 19, 32),
			}),
		],
		location: new SourceLocation(463, 19, 33),
	}),
	new Token(SqlTokenType.Identifier, "int", {
		keyword: SqlKeyword.INT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(465, 19, 35),
			}),
		],
		location: new SourceLocation(466, 19, 36),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(469, 19, 39),
	}),
	new Token(SqlTokenType.Identifier, "out", {
		keyword: SqlKeyword.OUT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(470, 19, 40),
			}),
		],
		location: new SourceLocation(471, 19, 41),
	}),
	new Token(SqlTokenType.Identifier, "f2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(474, 19, 44),
			}),
		],
		location: new SourceLocation(475, 19, 45),
	}),
	new Token(SqlTokenType.Identifier, "text", {
		keyword: SqlKeyword.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(477, 19, 47),
			}),
		],
		location: new SourceLocation(478, 19, 48),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(483, 19, 53),
			}),
		],
		location: new SourceLocation(482, 19, 52),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(484, 20, 1),
			}),
		],
		location: new SourceLocation(488, 20, 5),
	}),
	new Token(
		SqlTokenType.String,
		"$$ SELECT $1, CAST($1 AS text) || ' is text' $$",
		{
			preskips: [
				new Token(SqlTokenType.WhiteSpace, " ", {
					location: new SourceLocation(490, 20, 7),
				}),
			],
			postskips: [
				new Token(SqlTokenType.LineBreak, "\n", {
					location: new SourceLocation(538, 20, 55),
				}),
			],
			location: new SourceLocation(491, 20, 8),
		},
	),
	new Token(SqlTokenType.Identifier, "LANGUAGE", {
		keyword: SqlKeyword.LANGUAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(539, 21, 1),
			}),
		],
		location: new SourceLocation(543, 21, 5),
	}),
	new Token(SqlTokenType.Identifier, "SQL", {
		keyword: SqlKeyword.SQL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(551, 21, 13),
			}),
		],
		location: new SourceLocation(552, 21, 14),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(556, 21, 18),
			}),
		],
		location: new SourceLocation(555, 21, 17),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(557, 22, 1),
			}),
		],
		location: new SourceLocation(558, 23, 1),
	}),
	new Token(SqlTokenType.Identifier, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(564, 23, 7),
			}),
		],
		location: new SourceLocation(565, 23, 8),
	}),
	new Token(SqlTokenType.Identifier, "dup", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(573, 23, 16),
			}),
		],
		location: new SourceLocation(574, 23, 17),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(577, 23, 20),
	}),
	new Token(SqlTokenType.Identifier, "int", {
		keyword: SqlKeyword.INT,
		location: new SourceLocation(578, 23, 21),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(581, 23, 24),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(582, 23, 25),
			}),
		],
		location: new SourceLocation(583, 23, 26),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeyword.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(590, 23, 33),
			}),
		],
		location: new SourceLocation(591, 23, 34),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(596, 23, 39),
	}),
	new Token(SqlTokenType.Identifier, "f1", {
		location: new SourceLocation(597, 23, 40),
	}),
	new Token(SqlTokenType.Identifier, "int", {
		keyword: SqlKeyword.INT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(599, 23, 42),
			}),
		],
		location: new SourceLocation(600, 23, 43),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(603, 23, 46),
	}),
	new Token(SqlTokenType.Identifier, "f2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(604, 23, 47),
			}),
		],
		location: new SourceLocation(605, 23, 48),
	}),
	new Token(SqlTokenType.Identifier, "text", {
		keyword: SqlKeyword.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(607, 23, 50),
			}),
		],
		location: new SourceLocation(608, 23, 51),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(613, 23, 56),
			}),
		],
		location: new SourceLocation(612, 23, 55),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(614, 24, 1),
			}),
		],
		location: new SourceLocation(618, 24, 5),
	}),
	new Token(
		SqlTokenType.String,
		"$$ SELECT $1, CAST($1 AS text) || ' is text' $$",
		{
			preskips: [
				new Token(SqlTokenType.WhiteSpace, " ", {
					location: new SourceLocation(620, 24, 7),
				}),
			],
			postskips: [
				new Token(SqlTokenType.LineBreak, "\n", {
					location: new SourceLocation(668, 24, 55),
				}),
			],
			location: new SourceLocation(621, 24, 8),
		},
	),
	new Token(SqlTokenType.Identifier, "LANGUAGE", {
		keyword: SqlKeyword.LANGUAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(669, 25, 1),
			}),
		],
		location: new SourceLocation(673, 25, 5),
	}),
	new Token(SqlTokenType.Identifier, "SQL", {
		keyword: SqlKeyword.SQL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(681, 25, 13),
			}),
		],
		location: new SourceLocation(682, 25, 14),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(686, 25, 18),
			}),
		],
		location: new SourceLocation(685, 25, 17),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(687, 26, 1),
			}),
		],
		location: new SourceLocation(688, 27, 1),
	}),
	new Token(SqlTokenType.Identifier, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(694, 27, 7),
			}),
		],
		location: new SourceLocation(695, 27, 8),
	}),
	new Token(SqlTokenType.Identifier, "check_password", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(703, 27, 16),
			}),
		],
		location: new SourceLocation(704, 27, 17),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(718, 27, 31),
	}),
	new Token(SqlTokenType.Identifier, "uname", {
		location: new SourceLocation(719, 27, 32),
	}),
	new Token(SqlTokenType.Identifier, "TEXT", {
		keyword: SqlKeyword.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(724, 27, 37),
			}),
		],
		location: new SourceLocation(725, 27, 38),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(729, 27, 42),
	}),
	new Token(SqlTokenType.Identifier, "pass", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(730, 27, 43),
			}),
		],
		location: new SourceLocation(731, 27, 44),
	}),
	new Token(SqlTokenType.Identifier, "TEXT", {
		keyword: SqlKeyword.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(735, 27, 48),
			}),
		],
		location: new SourceLocation(736, 27, 49),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(741, 27, 54),
			}),
		],
		location: new SourceLocation(740, 27, 53),
	}),
	new Token(SqlTokenType.Identifier, "RETURNS", {
		location: new SourceLocation(742, 28, 1),
	}),
	new Token(SqlTokenType.Identifier, "BOOLEAN", {
		keyword: SqlKeyword.BOOLEAN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(749, 28, 8),
			}),
		],
		location: new SourceLocation(750, 28, 9),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(757, 28, 16),
			}),
		],
		location: new SourceLocation(758, 28, 17),
	}),
	new Token(
		SqlTokenType.String,
		"$$\nDECLARE passed BOOLEAN;\nBEGIN\n        SELECT  (pwd = $2) INTO passed\n        FROM    pwds\n        WHERE   username = $1;\n\n        RETURN passed;\nEND;\n$$",
		{
			preskips: [
				new Token(SqlTokenType.WhiteSpace, " ", {
					location: new SourceLocation(760, 28, 19),
				}),
			],
			location: new SourceLocation(761, 28, 20),
		},
	),
	new Token(SqlTokenType.Identifier, "LANGUAGE", {
		keyword: SqlKeyword.LANGUAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(916, 37, 3),
			}),
		],
		location: new SourceLocation(918, 37, 5),
	}),
	new Token(SqlTokenType.Identifier, "plpgsql", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(926, 37, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(934, 37, 21),
			}),
		],
		location: new SourceLocation(927, 37, 14),
	}),
	new Token(SqlTokenType.Identifier, "SECURITY", {
		keyword: SqlKeyword.SECURITY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(935, 38, 1),
			}),
		],
		location: new SourceLocation(939, 38, 5),
	}),
	new Token(SqlTokenType.Identifier, "DEFINER", {
		keyword: SqlKeyword.DEFINER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(947, 38, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(955, 38, 21),
			}),
		],
		location: new SourceLocation(948, 38, 14),
	}),
	new Token(SqlTokenType.Identifier, "SET", {
		keyword: SqlKeyword.SET,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(956, 39, 1),
			}),
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(957, 40, 1),
			}),
		],
		location: new SourceLocation(961, 40, 5),
	}),
	new Token(SqlTokenType.Identifier, "search_path", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(964, 40, 8),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(976, 40, 20),
			}),
		],
		location: new SourceLocation(965, 40, 9),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(977, 40, 21),
	}),
	new Token(SqlTokenType.Identifier, "admin", {
		keyword: SqlKeyword.ADMIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(978, 40, 22),
			}),
		],
		location: new SourceLocation(979, 40, 23),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(984, 40, 28),
	}),
	new Token(SqlTokenType.Identifier, "pg_temp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(985, 40, 29),
			}),
		],
		location: new SourceLocation(986, 40, 30),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(994, 40, 38),
			}),
		],
		location: new SourceLocation(993, 40, 37),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(995, 41, 1),
			}),
		],
		location: new SourceLocation(996, 42, 1),
	}),
];
