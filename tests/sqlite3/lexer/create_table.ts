import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		preskips: [
			new Token(SqlTokenType.BlockComment, "/* test table_1 */", {
				location: new SourceLocation(0, 1, 0),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(18, 1, 18),
			}),
		],
		location: new SourceLocation(19, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeywords.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(25, 2, 7),
			}),
		],
		location: new SourceLocation(26, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeywords.TEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(31, 2, 13),
			}),
		],
		location: new SourceLocation(32, 2, 14),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(36, 2, 18) }),
	new Token(SqlTokenType.Identifier, "table_1", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(44, 2, 26),
			}),
		],
		location: new SourceLocation(37, 2, 19),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(46, 2, 28),
			}),
		],
		location: new SourceLocation(45, 2, 27),
	}),
	new Token(SqlTokenType.Identifier, "text_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(47, 3, 1),
			}),
		],
		location: new SourceLocation(49, 3, 3),
	}),
	new Token(SqlTokenType.Identifier, "TEXT", {
		keyword: SqlKeywords.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(60, 3, 14),
			}),
		],
		location: new SourceLocation(61, 3, 15),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(65, 3, 19),
			}),
		],
		location: new SourceLocation(66, 3, 20),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(69, 3, 23),
			}),
		],
		location: new SourceLocation(70, 3, 24),
	}),
	new Token(SqlTokenType.Reserved, "PRIMARY", {
		keyword: SqlKeywords.PRIMARY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(74, 3, 28),
			}),
		],
		location: new SourceLocation(75, 3, 29),
	}),
	new Token(SqlTokenType.Identifier, "KEY", {
		keyword: SqlKeywords.KEY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(82, 3, 36),
			}),
		],
		location: new SourceLocation(83, 3, 37),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(87, 3, 41),
			}),
			new Token(SqlTokenType.LineComment, "-- text affinity", {
				location: new SourceLocation(88, 3, 42),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(104, 3, 58),
			}),
		],
		location: new SourceLocation(86, 3, 40),
	}),
	new Token(SqlTokenType.Identifier, "num_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(105, 4, 1),
			}),
		],
		location: new SourceLocation(107, 4, 3),
	}),
	new Token(SqlTokenType.Identifier, "NUMERIC", {
		keyword: SqlKeywords.NUMERIC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(117, 4, 13),
			}),
		],
		location: new SourceLocation(118, 4, 14),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(126, 4, 22),
			}),
			new Token(SqlTokenType.LineComment, "-- numeric affinity", {
				location: new SourceLocation(127, 4, 23),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(146, 4, 42),
			}),
		],
		location: new SourceLocation(125, 4, 21),
	}),
	new Token(SqlTokenType.Identifier, "int_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(147, 5, 1),
			}),
		],
		location: new SourceLocation(149, 5, 3),
	}),
	new Token(SqlTokenType.Identifier, "INTEGER", {
		keyword: SqlKeywords.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(159, 5, 13),
			}),
		],
		location: new SourceLocation(160, 5, 14),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(168, 5, 22),
			}),
			new Token(SqlTokenType.LineComment, "-- integer affinity", {
				location: new SourceLocation(169, 5, 23),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(188, 5, 42),
			}),
		],
		location: new SourceLocation(167, 5, 21),
	}),
	new Token(SqlTokenType.Identifier, "real_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(189, 6, 1),
			}),
		],
		location: new SourceLocation(191, 6, 3),
	}),
	new Token(SqlTokenType.Identifier, "INTEGER", {
		keyword: SqlKeywords.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(202, 6, 14),
			}),
		],
		location: new SourceLocation(203, 6, 15),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(211, 6, 23),
			}),
			new Token(SqlTokenType.LineComment, "-- real affinity", {
				location: new SourceLocation(212, 6, 24),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(228, 6, 40),
			}),
		],
		location: new SourceLocation(210, 6, 22),
	}),
	new Token(SqlTokenType.Identifier, "blob_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(229, 7, 1),
			}),
		],
		location: new SourceLocation(231, 7, 3),
	}),
	new Token(SqlTokenType.Identifier, "BLOB", {
		keyword: SqlKeywords.BLOB,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(242, 7, 14),
			}),
		],
		location: new SourceLocation(243, 7, 15),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(248, 7, 20),
			}),
			new Token(SqlTokenType.LineComment, "-- no affinity", {
				location: new SourceLocation(251, 7, 23),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(265, 7, 37),
			}),
		],
		location: new SourceLocation(247, 7, 19),
	}),
	new Token(SqlTokenType.Identifier, "no_affinity_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(266, 8, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(286, 8, 21),
			}),
			new Token(SqlTokenType.LineComment, "-- no affinity", {
				location: new SourceLocation(288, 8, 23),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(302, 8, 37),
			}),
		],
		location: new SourceLocation(268, 8, 3),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(303, 9, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(305, 9, 3),
			}),
		],
		location: new SourceLocation(304, 9, 2),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(306, 10, 1),
			}),
			new Token(SqlTokenType.BlockComment, "/* test table_2 */", {
				location: new SourceLocation(307, 11, 1),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(325, 11, 19),
			}),
		],
		location: new SourceLocation(326, 12, 1),
	}),
	new Token(SqlTokenType.Identifier, "temp", {
		keyword: SqlKeywords.TEMP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(332, 12, 7),
			}),
		],
		location: new SourceLocation(333, 12, 8),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeywords.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(337, 12, 12),
			}),
		],
		location: new SourceLocation(338, 12, 13),
	}),
	new Token(SqlTokenType.Identifier, "table_2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(343, 12, 18),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(351, 12, 26),
			}),
		],
		location: new SourceLocation(344, 12, 19),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(353, 12, 28),
			}),
		],
		location: new SourceLocation(352, 12, 27),
	}),
	new Token(SqlTokenType.Identifier, '"text_column"', {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(354, 13, 1),
			}),
		],
		location: new SourceLocation(356, 13, 3),
	}),
	new Token(SqlTokenType.Identifier, "TEXT", {
		keyword: SqlKeywords.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(369, 13, 16),
			}),
		],
		location: new SourceLocation(370, 13, 17),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(374, 13, 21),
			}),
		],
		location: new SourceLocation(375, 13, 22),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(378, 13, 25),
			}),
		],
		location: new SourceLocation(379, 13, 26),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(384, 13, 31),
			}),
			new Token(SqlTokenType.BlockComment, "/*text affinity*/", {
				location: new SourceLocation(385, 13, 32),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(402, 13, 49),
			}),
		],
		location: new SourceLocation(383, 13, 30),
	}),
	new Token(SqlTokenType.Identifier, "[num_column]", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(403, 14, 1),
			}),
		],
		location: new SourceLocation(405, 14, 3),
	}),
	new Token(SqlTokenType.Identifier, "NUMERIC", {
		keyword: SqlKeywords.NUMERIC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(417, 14, 15),
			}),
		],
		location: new SourceLocation(418, 14, 16),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(425, 14, 23),
			}),
		],
		location: new SourceLocation(426, 14, 24),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(429, 14, 27),
			}),
		],
		location: new SourceLocation(430, 14, 28),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(435, 14, 33),
			}),
			new Token(SqlTokenType.BlockComment, "/*numeric affinity*/", {
				location: new SourceLocation(436, 14, 34),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(456, 14, 54),
			}),
		],
		location: new SourceLocation(434, 14, 32),
	}),
	new Token(SqlTokenType.Identifier, "`int_column`", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(457, 15, 1),
			}),
		],
		location: new SourceLocation(459, 15, 3),
	}),
	new Token(SqlTokenType.Identifier, "INTEGER", {
		keyword: SqlKeywords.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(471, 15, 15),
			}),
		],
		location: new SourceLocation(472, 15, 16),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(480, 15, 24),
			}),
			new Token(SqlTokenType.BlockComment, "/*integer affinity*/", {
				location: new SourceLocation(481, 15, 25),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(501, 15, 45),
			}),
		],
		location: new SourceLocation(479, 15, 23),
	}),
	new Token(SqlTokenType.Identifier, '"real_column"', {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(502, 16, 1),
			}),
		],
		location: new SourceLocation(504, 16, 3),
	}),
	new Token(SqlTokenType.Identifier, "INTEGER", {
		keyword: SqlKeywords.INTEGER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(517, 16, 16),
			}),
		],
		location: new SourceLocation(518, 16, 17),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(526, 16, 25),
			}),
			new Token(SqlTokenType.BlockComment, "/*real affinity*/", {
				location: new SourceLocation(527, 16, 26),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(544, 16, 43),
			}),
		],
		location: new SourceLocation(525, 16, 24),
	}),
	new Token(SqlTokenType.Identifier, "[blob_column]", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(545, 17, 1),
			}),
		],
		location: new SourceLocation(547, 17, 3),
	}),
	new Token(SqlTokenType.Identifier, "BLOB", {
		keyword: SqlKeywords.BLOB,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(560, 17, 16),
			}),
		],
		location: new SourceLocation(561, 17, 17),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(566, 17, 22),
			}),
			new Token(SqlTokenType.BlockComment, "/*no affinity*/", {
				location: new SourceLocation(569, 17, 25),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(584, 17, 40),
			}),
		],
		location: new SourceLocation(565, 17, 21),
	}),
	new Token(SqlTokenType.Identifier, "`no_affinity_column`", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(585, 18, 1),
			}),
		],
		location: new SourceLocation(587, 18, 3),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(608, 18, 24),
			}),
			new Token(SqlTokenType.BlockComment, "/*no affinity*/", {
				location: new SourceLocation(610, 18, 26),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(625, 18, 41),
			}),
		],
		location: new SourceLocation(607, 18, 23),
	}),
	new Token(SqlTokenType.Reserved, "PRIMARY", {
		keyword: SqlKeywords.PRIMARY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(626, 19, 1),
			}),
		],
		location: new SourceLocation(628, 19, 3),
	}),
	new Token(SqlTokenType.Identifier, "KEY", {
		keyword: SqlKeywords.KEY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(635, 19, 10),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(639, 19, 14),
			}),
		],
		location: new SourceLocation(636, 19, 11),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(640, 19, 15),
	}),
	new Token(SqlTokenType.Identifier, "text_column", {
		location: new SourceLocation(641, 19, 16),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(652, 19, 27),
	}),
	new Token(SqlTokenType.Identifier, "num_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(653, 19, 28),
			}),
		],
		location: new SourceLocation(654, 19, 29),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(665, 19, 40),
			}),
		],
		location: new SourceLocation(664, 19, 39),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(667, 20, 2),
			}),
		],
		location: new SourceLocation(666, 20, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(669, 21, 2),
			}),
		],
		location: new SourceLocation(668, 21, 1),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		preskips: [
			new Token(SqlTokenType.BlockComment, "/* test table_3 */", {
				location: new SourceLocation(670, 22, 1),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(688, 22, 19),
			}),
		],
		location: new SourceLocation(689, 23, 1),
	}),
	new Token(SqlTokenType.Reserved, "temporary", {
		keyword: SqlKeywords.TEMPORARY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(695, 23, 7),
			}),
		],
		location: new SourceLocation(696, 23, 8),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeywords.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(705, 23, 17),
			}),
		],
		location: new SourceLocation(706, 23, 18),
	}),
	new Token(SqlTokenType.Identifier, "table_3", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(711, 23, 23),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(719, 23, 31),
			}),
		],
		location: new SourceLocation(712, 23, 24),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(721, 23, 33),
			}),
		],
		location: new SourceLocation(720, 23, 32),
	}),
	new Token(SqlTokenType.Identifier, "col_1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(722, 24, 1),
			}),
		],
		location: new SourceLocation(724, 24, 3),
	}),
	new Token(SqlTokenType.Identifier, "TEXT", {
		keyword: SqlKeywords.TEXT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(729, 24, 8),
			}),
		],
		location: new SourceLocation(730, 24, 9),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(735, 24, 14),
			}),
		],
		location: new SourceLocation(734, 24, 13),
	}),
	new Token(SqlTokenType.Identifier, "col_2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(736, 25, 1),
			}),
		],
		location: new SourceLocation(738, 25, 3),
	}),
	new Token(SqlTokenType.Identifier, "NUMERIC", {
		keyword: SqlKeywords.NUMERIC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(743, 25, 8),
			}),
		],
		location: new SourceLocation(744, 25, 9),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(752, 25, 17),
			}),
		],
		location: new SourceLocation(751, 25, 16),
	}),
	new Token(SqlTokenType.Reserved, "CONSTRAINT", {
		keyword: SqlKeywords.CONSTRAINT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(753, 26, 1),
			}),
		],
		location: new SourceLocation(755, 26, 3),
	}),
	new Token(SqlTokenType.Identifier, "c_001", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(765, 26, 13),
			}),
		],
		location: new SourceLocation(766, 26, 14),
	}),
	new Token(SqlTokenType.Reserved, "UNIQUE", {
		keyword: SqlKeywords.UNIQUE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(771, 26, 19),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(778, 26, 26),
			}),
		],
		location: new SourceLocation(772, 26, 20),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(779, 26, 27),
	}),
	new Token(SqlTokenType.Identifier, "col_1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(780, 26, 28),
			}),
		],
		location: new SourceLocation(781, 26, 29),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(786, 26, 34),
	}),
	new Token(SqlTokenType.Identifier, "col_2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(787, 26, 35),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(793, 26, 41),
			}),
		],
		location: new SourceLocation(788, 26, 36),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(795, 26, 43),
			}),
		],
		location: new SourceLocation(794, 26, 42),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(796, 27, 1),
			}),
		],
		location: new SourceLocation(800, 27, 5),
	}),
	new Token(SqlTokenType.Identifier, "CONFLICT", {
		keyword: SqlKeywords.CONFLICT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(802, 27, 7),
			}),
		],
		location: new SourceLocation(803, 27, 8),
	}),
	new Token(SqlTokenType.Identifier, "ROLLBACK", {
		keyword: SqlKeywords.ROLLBACK,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(811, 27, 16),
			}),
		],
		location: new SourceLocation(812, 27, 17),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(821, 27, 26),
			}),
		],
		location: new SourceLocation(820, 27, 25),
	}),
	new Token(SqlTokenType.Reserved, "CONSTRAINT", {
		keyword: SqlKeywords.CONSTRAINT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(822, 28, 1),
			}),
		],
		location: new SourceLocation(824, 28, 3),
	}),
	new Token(SqlTokenType.Identifier, "c_002", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(834, 28, 13),
			}),
		],
		location: new SourceLocation(835, 28, 14),
	}),
	new Token(SqlTokenType.Reserved, "CHECK", {
		keyword: SqlKeywords.CHECK,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(840, 28, 19),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(846, 28, 25),
			}),
		],
		location: new SourceLocation(841, 28, 20),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(847, 28, 26),
	}),
	new Token(SqlTokenType.Identifier, "col_1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(848, 28, 27),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(854, 28, 33),
			}),
		],
		location: new SourceLocation(849, 28, 28),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(855, 28, 34),
	}),
	new Token(SqlTokenType.Identifier, "col_2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(856, 28, 35),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(862, 28, 41),
			}),
		],
		location: new SourceLocation(857, 28, 36),
	}),
	new Token(SqlTokenType.Operator, ">", {
		location: new SourceLocation(863, 28, 42),
	}),
	new Token(SqlTokenType.Numeric, "0", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(864, 28, 43),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(866, 28, 45),
			}),
		],
		location: new SourceLocation(865, 28, 44),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(867, 28, 46),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(869, 28, 48),
			}),
		],
		location: new SourceLocation(868, 28, 47),
	}),
	new Token(SqlTokenType.Reserved, "CONSTRAINT", {
		keyword: SqlKeywords.CONSTRAINT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(870, 29, 1),
			}),
		],
		location: new SourceLocation(872, 29, 3),
	}),
	new Token(SqlTokenType.Identifier, "c_003", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(882, 29, 13),
			}),
		],
		location: new SourceLocation(883, 29, 14),
	}),
	new Token(SqlTokenType.Reserved, "FOREIGN", {
		keyword: SqlKeywords.FOREIGN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(888, 29, 19),
			}),
		],
		location: new SourceLocation(889, 29, 20),
	}),
	new Token(SqlTokenType.Identifier, "KEY", {
		keyword: SqlKeywords.KEY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(896, 29, 27),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(900, 29, 31),
			}),
		],
		location: new SourceLocation(897, 29, 28),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(901, 29, 32),
	}),
	new Token(SqlTokenType.Identifier, "col_1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(902, 29, 33),
			}),
		],
		location: new SourceLocation(903, 29, 34),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(908, 29, 39),
	}),
	new Token(SqlTokenType.Identifier, "col_2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(909, 29, 40),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(915, 29, 46),
			}),
		],
		location: new SourceLocation(910, 29, 41),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(917, 29, 48),
			}),
		],
		location: new SourceLocation(916, 29, 47),
	}),
	new Token(SqlTokenType.Reserved, "REFERENCES", {
		keyword: SqlKeywords.REFERENCES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(918, 30, 1),
			}),
		],
		location: new SourceLocation(922, 30, 5),
	}),
	new Token(SqlTokenType.Identifier, "table_1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(932, 30, 15),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(940, 30, 23),
			}),
		],
		location: new SourceLocation(933, 30, 16),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(941, 30, 24),
	}),
	new Token(SqlTokenType.Identifier, "text_column", {
		location: new SourceLocation(942, 30, 25),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(953, 30, 36),
	}),
	new Token(SqlTokenType.Identifier, "num_column", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(954, 30, 37),
			}),
		],
		location: new SourceLocation(955, 30, 38),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(966, 30, 49),
			}),
		],
		location: new SourceLocation(965, 30, 48),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(967, 31, 1),
			}),
		],
		location: new SourceLocation(971, 31, 5),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeywords.DELETE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(973, 31, 7),
			}),
		],
		location: new SourceLocation(974, 31, 8),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(980, 31, 14),
			}),
		],
		location: new SourceLocation(981, 31, 15),
	}),
	new Token(SqlTokenType.Reserved, "NULL", {
		keyword: SqlKeywords.NULL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(984, 31, 18),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(989, 31, 23),
			}),
		],
		location: new SourceLocation(985, 31, 19),
	}),
	new Token(SqlTokenType.Identifier, "MATCH", {
		keyword: SqlKeywords.MATCH,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(990, 32, 1),
			}),
		],
		location: new SourceLocation(994, 32, 5),
	}),
	new Token(SqlTokenType.Identifier, "SIMPLE", {
		keyword: SqlKeywords.SIMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(999, 32, 10),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1006, 32, 17),
			}),
		],
		location: new SourceLocation(1000, 32, 11),
	}),
	new Token(SqlTokenType.Reserved, "ON", {
		keyword: SqlKeywords.ON,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1007, 33, 1),
			}),
		],
		location: new SourceLocation(1011, 33, 5),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1013, 33, 7),
			}),
		],
		location: new SourceLocation(1014, 33, 8),
	}),
	new Token(SqlTokenType.Identifier, "CASCADE", {
		keyword: SqlKeywords.CASCADE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1020, 33, 14),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1028, 33, 22),
			}),
		],
		location: new SourceLocation(1021, 33, 15),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(1029, 34, 1),
			}),
		],
		location: new SourceLocation(1033, 34, 5),
	}),
	new Token(SqlTokenType.Reserved, "DEFERRABLE", {
		keyword: SqlKeywords.DEFERRABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1036, 34, 8),
			}),
		],
		location: new SourceLocation(1037, 34, 9),
	}),
	new Token(SqlTokenType.Identifier, "INITIALLY", {
		keyword: SqlKeywords.INITIALLY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1047, 34, 19),
			}),
		],
		location: new SourceLocation(1048, 34, 20),
	}),
	new Token(SqlTokenType.Identifier, "DEFERRED", {
		keyword: SqlKeywords.DEFERRED,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1057, 34, 29),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1066, 34, 38),
			}),
		],
		location: new SourceLocation(1058, 34, 30),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1067, 35, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1069, 35, 3),
			}),
		],
		location: new SourceLocation(1068, 35, 2),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1070, 36, 1),
			}),
		],
		location: new SourceLocation(1071, 37, 1),
	}),
	new Token(SqlTokenType.Identifier, "VIRTUAL", {
		keyword: SqlKeywords.VIRTUAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1077, 37, 7),
			}),
		],
		location: new SourceLocation(1078, 37, 8),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeywords.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1085, 37, 15),
			}),
		],
		location: new SourceLocation(1086, 37, 16),
	}),
	new Token(SqlTokenType.Identifier, "tablename", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1091, 37, 21),
			}),
		],
		location: new SourceLocation(1092, 37, 22),
	}),
	new Token(SqlTokenType.Reserved, "USING", {
		keyword: SqlKeywords.USING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1101, 37, 31),
			}),
		],
		location: new SourceLocation(1102, 37, 32),
	}),
	new Token(SqlTokenType.Identifier, "modulename", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1107, 37, 37),
			}),
		],
		location: new SourceLocation(1108, 37, 38),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1119, 37, 49),
			}),
		],
		location: new SourceLocation(1118, 37, 48),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(1120, 38, 1),
	}),
	new Token(SqlTokenType.Identifier, "VIRTUAL", {
		keyword: SqlKeywords.VIRTUAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1126, 38, 7),
			}),
		],
		location: new SourceLocation(1127, 38, 8),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeywords.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1134, 38, 15),
			}),
		],
		location: new SourceLocation(1135, 38, 16),
	}),
	new Token(SqlTokenType.Identifier, "temp", {
		keyword: SqlKeywords.TEMP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1140, 38, 21),
			}),
		],
		location: new SourceLocation(1141, 38, 22),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1145, 38, 26),
	}),
	new Token(SqlTokenType.Identifier, "t1", {
		location: new SourceLocation(1146, 38, 27),
	}),
	new Token(SqlTokenType.Reserved, "USING", {
		keyword: SqlKeywords.USING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1148, 38, 29),
			}),
		],
		location: new SourceLocation(1149, 38, 30),
	}),
	new Token(SqlTokenType.Identifier, "csv", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1154, 38, 35),
			}),
		],
		location: new SourceLocation(1155, 38, 36),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1158, 38, 39),
	}),
	new Token(SqlTokenType.Identifier, "filename", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1167, 38, 48),
			}),
		],
		location: new SourceLocation(1159, 38, 40),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(1168, 38, 49),
	}),
	new Token(SqlTokenType.String, "'thefile.csv'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1169, 38, 50),
			}),
		],
		location: new SourceLocation(1170, 38, 51),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1183, 38, 64),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1185, 38, 66),
			}),
		],
		location: new SourceLocation(1184, 38, 65),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(1186, 39, 1),
	}),
	new Token(SqlTokenType.Identifier, "VIRTUAL", {
		keyword: SqlKeywords.VIRTUAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1192, 39, 7),
			}),
		],
		location: new SourceLocation(1193, 39, 8),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeywords.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1200, 39, 15),
			}),
		],
		location: new SourceLocation(1201, 39, 16),
	}),
	new Token(SqlTokenType.Identifier, "email", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1206, 39, 21),
			}),
		],
		location: new SourceLocation(1207, 39, 22),
	}),
	new Token(SqlTokenType.Reserved, "USING", {
		keyword: SqlKeywords.USING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1212, 39, 27),
			}),
		],
		location: new SourceLocation(1213, 39, 28),
	}),
	new Token(SqlTokenType.Identifier, "fts5", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1218, 39, 33),
			}),
		],
		location: new SourceLocation(1219, 39, 34),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1223, 39, 38),
	}),
	new Token(SqlTokenType.Identifier, "sender", {
		location: new SourceLocation(1224, 39, 39),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1230, 39, 45),
	}),
	new Token(SqlTokenType.Identifier, "title", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1231, 39, 46),
			}),
		],
		location: new SourceLocation(1232, 39, 47),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1237, 39, 52),
	}),
	new Token(SqlTokenType.Identifier, "body", {
		keyword: SqlKeywords.BODY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1238, 39, 53),
			}),
		],
		location: new SourceLocation(1239, 39, 54),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1243, 39, 58),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		location: new SourceLocation(1244, 39, 59),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(1245, 39, 60),
	}),
];
