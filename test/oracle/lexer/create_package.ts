import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeyword, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(
				SqlTokenType.LineComment,
				"-- create the audit table to track changes",
				{ location: new SourceLocation(0, 1, 0) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(42, 1, 42),
			}),
		],
		location: new SourceLocation(43, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "TABLE", {
		keyword: SqlKeyword.TABLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(49, 2, 7),
			}),
		],
		location: new SourceLocation(50, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "emp_audit", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(55, 2, 13),
			}),
		],
		location: new SourceLocation(56, 2, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(65, 2, 23),
	}),
	new Token(SqlTokenType.Identifier, "date_of_action", {
		location: new SourceLocation(66, 2, 24),
	}),
	new Token(SqlTokenType.Reserved, "DATE", {
		keyword: SqlKeyword.DATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(80, 2, 38),
			}),
		],
		location: new SourceLocation(81, 2, 39),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(85, 2, 43),
	}),
	new Token(SqlTokenType.Identifier, "user_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(86, 2, 44),
			}),
		],
		location: new SourceLocation(87, 2, 45),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(94, 2, 52),
			}),
		],
		location: new SourceLocation(95, 2, 53),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(103, 2, 61),
	}),
	new Token(SqlTokenType.Numeric, "20", {
		location: new SourceLocation(104, 2, 62),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(106, 2, 64),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(108, 2, 66),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(109, 2, 67),
			}),
		],
		location: new SourceLocation(107, 2, 65),
	}),
	new Token(SqlTokenType.Identifier, "package_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "                       ", {
				location: new SourceLocation(110, 3, 1),
			}),
		],
		location: new SourceLocation(133, 3, 24),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(145, 3, 36),
			}),
		],
		location: new SourceLocation(146, 3, 37),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(154, 3, 45),
	}),
	new Token(SqlTokenType.Numeric, "30", {
		location: new SourceLocation(155, 3, 46),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(157, 3, 48),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(158, 3, 49),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(160, 3, 51),
			}),
		],
		location: new SourceLocation(159, 3, 50),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(161, 4, 1),
			}),
		],
		location: new SourceLocation(162, 5, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeyword.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(168, 5, 7),
			}),
		],
		location: new SourceLocation(169, 5, 8),
	}),
	new Token(SqlTokenType.Identifier, "REPLACE", {
		keyword: SqlKeyword.REPLACE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(171, 5, 10),
			}),
		],
		location: new SourceLocation(172, 5, 11),
	}),
	new Token(SqlTokenType.Identifier, "PACKAGE", {
		keyword: SqlKeyword.PACKAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(179, 5, 18),
			}),
		],
		location: new SourceLocation(180, 5, 19),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(187, 5, 26),
			}),
		],
		location: new SourceLocation(188, 5, 27),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(197, 5, 36),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(200, 5, 39),
			}),
		],
		location: new SourceLocation(198, 5, 37),
	}),
	new Token(SqlTokenType.Reserved, "TYPE", {
		keyword: SqlKeyword.TYPE,
		preskips: [
			new Token(
				SqlTokenType.LineComment,
				"-- Declare externally visible types, cursor, exception",
				{ location: new SourceLocation(201, 6, 1) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(255, 6, 55),
			}),
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(256, 7, 1),
			}),
		],
		location: new SourceLocation(259, 7, 4),
	}),
	new Token(SqlTokenType.Identifier, "EmpRecTyp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(263, 7, 8),
			}),
		],
		location: new SourceLocation(264, 7, 9),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(273, 7, 18),
			}),
		],
		location: new SourceLocation(274, 7, 19),
	}),
	new Token(SqlTokenType.Identifier, "RECORD", {
		keyword: SqlKeyword.RECORD,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(276, 7, 21),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(283, 7, 28),
			}),
		],
		location: new SourceLocation(277, 7, 22),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(284, 7, 29),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		location: new SourceLocation(285, 7, 30),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(291, 7, 36),
			}),
		],
		location: new SourceLocation(292, 7, 37),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(298, 7, 43),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(299, 7, 44),
			}),
		],
		location: new SourceLocation(300, 7, 45),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(303, 7, 48),
			}),
		],
		location: new SourceLocation(304, 7, 49),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(310, 7, 55),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(312, 7, 57),
			}),
		],
		location: new SourceLocation(311, 7, 56),
	}),
	new Token(SqlTokenType.Reserved, "CURSOR", {
		keyword: SqlKeyword.CURSOR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(313, 8, 1),
			}),
		],
		location: new SourceLocation(316, 8, 4),
	}),
	new Token(SqlTokenType.Identifier, "desc_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(322, 8, 10),
			}),
		],
		location: new SourceLocation(323, 8, 11),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(334, 8, 22),
			}),
		],
		location: new SourceLocation(335, 8, 23),
	}),
	new Token(SqlTokenType.Identifier, "EmpRecTyp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(341, 8, 29),
			}),
		],
		location: new SourceLocation(342, 8, 30),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(352, 8, 40),
			}),
		],
		location: new SourceLocation(351, 8, 39),
	}),
	new Token(SqlTokenType.Identifier, "invalid_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(353, 9, 1),
			}),
		],
		location: new SourceLocation(356, 9, 4),
	}),
	new Token(SqlTokenType.Reserved, "EXCEPTION", {
		keyword: SqlKeyword.EXCEPTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(370, 9, 18),
			}),
		],
		location: new SourceLocation(371, 9, 19),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(381, 9, 29),
			}),
		],
		location: new SourceLocation(380, 9, 28),
	}),
	new Token(SqlTokenType.Reserved, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(
				SqlTokenType.LineComment,
				"-- Declare externally callable subprograms",
				{ location: new SourceLocation(382, 10, 1) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(424, 10, 43),
			}),
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(425, 11, 1),
			}),
		],
		location: new SourceLocation(428, 11, 4),
	}),
	new Token(SqlTokenType.Identifier, "hire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(436, 11, 12),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(450, 11, 26),
			}),
		],
		location: new SourceLocation(437, 11, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(451, 11, 27),
	}),
	new Token(SqlTokenType.Identifier, "last_name", {
		location: new SourceLocation(452, 11, 28),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(461, 11, 37),
			}),
		],
		location: new SourceLocation(462, 11, 38),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(470, 11, 46),
	}),
	new Token(SqlTokenType.Identifier, "first_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(471, 11, 47),
			}),
		],
		location: new SourceLocation(472, 11, 48),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(482, 11, 58),
			}),
		],
		location: new SourceLocation(483, 11, 59),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(492, 11, 68),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(493, 11, 69),
			}),
		],
		location: new SourceLocation(491, 11, 67),
	}),
	new Token(SqlTokenType.Identifier, "email", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(494, 12, 1),
			}),
		],
		location: new SourceLocation(499, 12, 6),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(504, 12, 11),
			}),
		],
		location: new SourceLocation(505, 12, 12),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(513, 12, 20),
	}),
	new Token(SqlTokenType.Identifier, "phone_number", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(514, 12, 21),
			}),
		],
		location: new SourceLocation(515, 12, 22),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(527, 12, 34),
			}),
		],
		location: new SourceLocation(528, 12, 35),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(536, 12, 43),
	}),
	new Token(SqlTokenType.Identifier, "job_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(537, 12, 44),
			}),
		],
		location: new SourceLocation(538, 12, 45),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(544, 12, 51),
			}),
		],
		location: new SourceLocation(545, 12, 52),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(553, 12, 60),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(554, 12, 61),
			}),
		],
		location: new SourceLocation(555, 12, 62),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(561, 12, 68),
			}),
		],
		location: new SourceLocation(562, 12, 69),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(569, 12, 76),
			}),
		],
		location: new SourceLocation(568, 12, 75),
	}),
	new Token(SqlTokenType.Identifier, "commission_pct", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(570, 13, 1),
			}),
		],
		location: new SourceLocation(575, 13, 6),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(589, 13, 20),
			}),
		],
		location: new SourceLocation(590, 13, 21),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(596, 13, 27),
	}),
	new Token(SqlTokenType.Identifier, "manager_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(597, 13, 28),
			}),
		],
		location: new SourceLocation(598, 13, 29),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(608, 13, 39),
			}),
		],
		location: new SourceLocation(609, 13, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(615, 13, 46),
	}),
	new Token(SqlTokenType.Identifier, "department_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(616, 13, 47),
			}),
		],
		location: new SourceLocation(617, 13, 48),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(630, 13, 61),
			}),
		],
		location: new SourceLocation(631, 13, 62),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(638, 13, 69),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(639, 13, 70),
			}),
		],
		location: new SourceLocation(637, 13, 68),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(640, 14, 1),
			}),
		],
		location: new SourceLocation(645, 14, 6),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(651, 14, 12),
			}),
		],
		location: new SourceLocation(652, 14, 13),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(659, 14, 20),
			}),
		],
		location: new SourceLocation(658, 14, 19),
	}),
	new Token(SqlTokenType.Reserved, "PROCEDURE", {
		keyword: SqlKeyword.PROCEDURE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(660, 15, 1),
			}),
		],
		location: new SourceLocation(663, 15, 4),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(672, 15, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(686, 15, 27),
			}),
		],
		location: new SourceLocation(673, 15, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(687, 15, 28),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		location: new SourceLocation(688, 15, 29),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(694, 15, 35),
			}),
		],
		location: new SourceLocation(695, 15, 36),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(701, 15, 42),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(703, 15, 44),
			}),
			new Token(SqlTokenType.LineComment, "-- overloaded subprogram", {
				location: new SourceLocation(704, 15, 45),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(728, 15, 69),
			}),
		],
		location: new SourceLocation(702, 15, 43),
	}),
	new Token(SqlTokenType.Reserved, "PROCEDURE", {
		keyword: SqlKeyword.PROCEDURE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(729, 16, 1),
			}),
		],
		location: new SourceLocation(732, 16, 4),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(741, 16, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(755, 16, 27),
			}),
		],
		location: new SourceLocation(742, 16, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(756, 16, 28),
	}),
	new Token(SqlTokenType.Identifier, "emp_email", {
		location: new SourceLocation(757, 16, 29),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(766, 16, 38),
			}),
		],
		location: new SourceLocation(767, 16, 39),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(775, 16, 47),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(777, 16, 49),
			}),
			new Token(SqlTokenType.LineComment, "-- overloaded subprogram", {
				location: new SourceLocation(778, 16, 50),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(802, 16, 74),
			}),
		],
		location: new SourceLocation(776, 16, 48),
	}),
	new Token(SqlTokenType.Reserved, "PROCEDURE", {
		keyword: SqlKeyword.PROCEDURE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(803, 17, 1),
			}),
		],
		location: new SourceLocation(806, 17, 4),
	}),
	new Token(SqlTokenType.Identifier, "raise_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(815, 17, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(828, 17, 26),
			}),
		],
		location: new SourceLocation(816, 17, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(829, 17, 27),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		location: new SourceLocation(830, 17, 28),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(836, 17, 34),
			}),
		],
		location: new SourceLocation(837, 17, 35),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(843, 17, 41),
	}),
	new Token(SqlTokenType.Identifier, "amount", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(844, 17, 42),
			}),
		],
		location: new SourceLocation(845, 17, 43),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(851, 17, 49),
			}),
		],
		location: new SourceLocation(852, 17, 50),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(858, 17, 56),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(860, 17, 58),
			}),
		],
		location: new SourceLocation(859, 17, 57),
	}),
	new Token(SqlTokenType.Reserved, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(861, 18, 1),
			}),
		],
		location: new SourceLocation(864, 18, 4),
	}),
	new Token(SqlTokenType.Identifier, "nth_highest_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(872, 18, 12),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(891, 18, 31),
			}),
		],
		location: new SourceLocation(873, 18, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(892, 18, 32),
	}),
	new Token(SqlTokenType.Identifier, "n", {
		location: new SourceLocation(893, 18, 33),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(894, 18, 34),
			}),
		],
		location: new SourceLocation(895, 18, 35),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(901, 18, 41),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(902, 18, 42),
			}),
		],
		location: new SourceLocation(903, 18, 43),
	}),
	new Token(SqlTokenType.Identifier, "EmpRecTyp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(909, 18, 49),
			}),
		],
		location: new SourceLocation(910, 18, 50),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(920, 18, 60),
			}),
		],
		location: new SourceLocation(919, 18, 59),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		location: new SourceLocation(921, 19, 1),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(924, 19, 4),
			}),
		],
		location: new SourceLocation(925, 19, 5),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(935, 19, 15),
			}),
		],
		location: new SourceLocation(934, 19, 14),
	}),
	new Token(SqlTokenType.Delimiter, "/", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(937, 20, 2),
			}),
		],
		location: new SourceLocation(936, 20, 1),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeyword.CREATE,
		location: new SourceLocation(938, 21, 1),
	}),
	new Token(SqlTokenType.Reserved, "OR", {
		keyword: SqlKeyword.OR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(944, 21, 7),
			}),
		],
		location: new SourceLocation(945, 21, 8),
	}),
	new Token(SqlTokenType.Identifier, "REPLACE", {
		keyword: SqlKeyword.REPLACE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(947, 21, 10),
			}),
		],
		location: new SourceLocation(948, 21, 11),
	}),
	new Token(SqlTokenType.Identifier, "PACKAGE", {
		keyword: SqlKeyword.PACKAGE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(955, 21, 18),
			}),
		],
		location: new SourceLocation(956, 21, 19),
	}),
	new Token(SqlTokenType.Identifier, "BODY", {
		keyword: SqlKeyword.BODY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(963, 21, 26),
			}),
		],
		location: new SourceLocation(964, 21, 27),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(968, 21, 31),
			}),
		],
		location: new SourceLocation(969, 21, 32),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(978, 21, 41),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(981, 21, 44),
			}),
		],
		location: new SourceLocation(979, 21, 42),
	}),
	new Token(SqlTokenType.Identifier, "number_hired", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(982, 22, 1),
			}),
		],
		location: new SourceLocation(985, 22, 4),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(997, 22, 16),
			}),
		],
		location: new SourceLocation(998, 22, 17),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(1005, 22, 24),
			}),
			new Token(SqlTokenType.LineComment, "-- visible only in this package", {
				location: new SourceLocation(1007, 22, 26),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1038, 22, 57),
			}),
		],
		location: new SourceLocation(1004, 22, 23),
	}),
	new Token(SqlTokenType.Reserved, "CURSOR", {
		keyword: SqlKeyword.CURSOR,
		preskips: [
			new Token(
				SqlTokenType.LineComment,
				"-- Fully define cursor specified in package",
				{ location: new SourceLocation(1039, 23, 1) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1082, 23, 44),
			}),
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1083, 24, 1),
			}),
		],
		location: new SourceLocation(1086, 24, 4),
	}),
	new Token(SqlTokenType.Identifier, "desc_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1092, 24, 10),
			}),
		],
		location: new SourceLocation(1093, 24, 11),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1104, 24, 22),
			}),
		],
		location: new SourceLocation(1105, 24, 23),
	}),
	new Token(SqlTokenType.Identifier, "EmpRecTyp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1111, 24, 29),
			}),
		],
		location: new SourceLocation(1112, 24, 30),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1121, 24, 39),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1124, 24, 42),
			}),
		],
		location: new SourceLocation(1122, 24, 40),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeyword.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1125, 25, 1),
			}),
		],
		location: new SourceLocation(1131, 25, 7),
	}),
	new Token(SqlTokenType.Identifier, "employee_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1137, 25, 13),
			}),
		],
		location: new SourceLocation(1138, 25, 14),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1149, 25, 25),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1150, 25, 26),
			}),
		],
		location: new SourceLocation(1151, 25, 27),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1157, 25, 33),
			}),
		],
		location: new SourceLocation(1158, 25, 34),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1162, 25, 38),
			}),
		],
		location: new SourceLocation(1163, 25, 39),
	}),
	new Token(SqlTokenType.Reserved, "ORDER", {
		keyword: SqlKeyword.ORDER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1172, 25, 48),
			}),
		],
		location: new SourceLocation(1173, 25, 49),
	}),
	new Token(SqlTokenType.Reserved, "BY", {
		keyword: SqlKeyword.BY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1178, 25, 54),
			}),
		],
		location: new SourceLocation(1179, 25, 55),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1181, 25, 57),
			}),
		],
		location: new SourceLocation(1182, 25, 58),
	}),
	new Token(SqlTokenType.Reserved, "DESC", {
		keyword: SqlKeyword.DESC,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1188, 25, 64),
			}),
		],
		location: new SourceLocation(1189, 25, 65),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1194, 25, 70),
			}),
		],
		location: new SourceLocation(1193, 25, 69),
	}),
	new Token(SqlTokenType.Reserved, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(
				SqlTokenType.LineComment,
				"-- Fully define subprograms specified in package",
				{ location: new SourceLocation(1195, 26, 1) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1243, 26, 49),
			}),
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1244, 27, 1),
			}),
		],
		location: new SourceLocation(1247, 27, 4),
	}),
	new Token(SqlTokenType.Identifier, "hire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1255, 27, 12),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1269, 27, 26),
			}),
		],
		location: new SourceLocation(1256, 27, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1270, 27, 27),
	}),
	new Token(SqlTokenType.Identifier, "last_name", {
		location: new SourceLocation(1271, 27, 28),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1280, 27, 37),
			}),
		],
		location: new SourceLocation(1281, 27, 38),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1289, 27, 46),
	}),
	new Token(SqlTokenType.Identifier, "first_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1290, 27, 47),
			}),
		],
		location: new SourceLocation(1291, 27, 48),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1301, 27, 58),
			}),
		],
		location: new SourceLocation(1302, 27, 59),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1311, 27, 68),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1312, 27, 69),
			}),
		],
		location: new SourceLocation(1310, 27, 67),
	}),
	new Token(SqlTokenType.Identifier, "email", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1313, 28, 1),
			}),
		],
		location: new SourceLocation(1318, 28, 6),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1323, 28, 11),
			}),
		],
		location: new SourceLocation(1324, 28, 12),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1332, 28, 20),
	}),
	new Token(SqlTokenType.Identifier, "phone_number", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1333, 28, 21),
			}),
		],
		location: new SourceLocation(1334, 28, 22),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1346, 28, 34),
			}),
		],
		location: new SourceLocation(1347, 28, 35),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1355, 28, 43),
	}),
	new Token(SqlTokenType.Identifier, "job_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1356, 28, 44),
			}),
		],
		location: new SourceLocation(1357, 28, 45),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1363, 28, 51),
			}),
		],
		location: new SourceLocation(1364, 28, 52),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1372, 28, 60),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1373, 28, 61),
			}),
		],
		location: new SourceLocation(1374, 28, 62),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1380, 28, 68),
			}),
		],
		location: new SourceLocation(1381, 28, 69),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1388, 28, 76),
			}),
		],
		location: new SourceLocation(1387, 28, 75),
	}),
	new Token(SqlTokenType.Identifier, "commission_pct", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1389, 29, 1),
			}),
		],
		location: new SourceLocation(1394, 29, 6),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1408, 29, 20),
			}),
		],
		location: new SourceLocation(1409, 29, 21),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1415, 29, 27),
	}),
	new Token(SqlTokenType.Identifier, "manager_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1416, 29, 28),
			}),
		],
		location: new SourceLocation(1417, 29, 29),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1427, 29, 39),
			}),
		],
		location: new SourceLocation(1428, 29, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1434, 29, 46),
	}),
	new Token(SqlTokenType.Identifier, "department_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1435, 29, 47),
			}),
		],
		location: new SourceLocation(1436, 29, 48),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1449, 29, 61),
			}),
		],
		location: new SourceLocation(1450, 29, 62),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1457, 29, 69),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1458, 29, 70),
			}),
		],
		location: new SourceLocation(1456, 29, 68),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1459, 30, 1),
			}),
		],
		location: new SourceLocation(1464, 30, 6),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1470, 30, 12),
			}),
		],
		location: new SourceLocation(1471, 30, 13),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1477, 30, 19),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1480, 30, 22),
			}),
		],
		location: new SourceLocation(1478, 30, 20),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(1481, 31, 1),
			}),
		],
		location: new SourceLocation(1486, 31, 6),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1496, 31, 16),
			}),
		],
		location: new SourceLocation(1497, 31, 17),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1504, 31, 24),
			}),
		],
		location: new SourceLocation(1503, 31, 23),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1505, 32, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1513, 32, 9),
			}),
		],
		location: new SourceLocation(1508, 32, 4),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeyword.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1514, 33, 1),
			}),
		],
		location: new SourceLocation(1520, 33, 7),
	}),
	new Token(SqlTokenType.Identifier, "employees_seq", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1526, 33, 13),
			}),
		],
		location: new SourceLocation(1527, 33, 14),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1540, 33, 27),
	}),
	new Token(SqlTokenType.Identifier, "NEXTVAL", {
		keyword: SqlKeyword.NEXTVAL,
		location: new SourceLocation(1541, 33, 28),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeyword.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1548, 33, 35),
			}),
		],
		location: new SourceLocation(1549, 33, 36),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1553, 33, 40),
			}),
		],
		location: new SourceLocation(1554, 33, 41),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1564, 33, 51),
			}),
		],
		location: new SourceLocation(1565, 33, 52),
	}),
	new Token(SqlTokenType.Identifier, "dual", {
		keyword: SqlKeyword.DUAL,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1569, 33, 56),
			}),
		],
		location: new SourceLocation(1570, 33, 57),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1575, 33, 62),
			}),
		],
		location: new SourceLocation(1574, 33, 61),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeyword.INSERT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1576, 34, 1),
			}),
		],
		location: new SourceLocation(1582, 34, 7),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeyword.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1588, 34, 13),
			}),
		],
		location: new SourceLocation(1589, 34, 14),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1593, 34, 18),
			}),
		],
		location: new SourceLocation(1594, 34, 19),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeyword.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1603, 34, 28),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1610, 34, 35),
			}),
		],
		location: new SourceLocation(1604, 34, 29),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1611, 34, 36),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		location: new SourceLocation(1612, 34, 37),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1622, 34, 47),
	}),
	new Token(SqlTokenType.Identifier, "last_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1623, 34, 48),
			}),
		],
		location: new SourceLocation(1624, 34, 49),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1633, 34, 58),
	}),
	new Token(SqlTokenType.Identifier, "first_name", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1634, 34, 59),
			}),
		],
		location: new SourceLocation(1635, 34, 60),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1645, 34, 70),
	}),
	new Token(SqlTokenType.Identifier, "email", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1646, 34, 71),
			}),
		],
		location: new SourceLocation(1647, 34, 72),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1653, 34, 78),
			}),
		],
		location: new SourceLocation(1652, 34, 77),
	}),
	new Token(SqlTokenType.Identifier, "phone_number", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "        ", {
				location: new SourceLocation(1654, 35, 1),
			}),
		],
		location: new SourceLocation(1662, 35, 9),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1674, 35, 21),
	}),
	new Token(SqlTokenType.Reserved, "SYSDATE", {
		keyword: SqlKeyword.SYSDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1675, 35, 22),
			}),
		],
		location: new SourceLocation(1676, 35, 23),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1683, 35, 30),
	}),
	new Token(SqlTokenType.Identifier, "job_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1684, 35, 31),
			}),
		],
		location: new SourceLocation(1685, 35, 32),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1691, 35, 38),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1692, 35, 39),
			}),
		],
		location: new SourceLocation(1693, 35, 40),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1699, 35, 46),
	}),
	new Token(SqlTokenType.Identifier, "commission_pct", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1700, 35, 47),
			}),
		],
		location: new SourceLocation(1701, 35, 48),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(1715, 35, 62),
	}),
	new Token(SqlTokenType.Identifier, "manager_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1716, 35, 63),
			}),
		],
		location: new SourceLocation(1717, 35, 64),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1728, 35, 75),
			}),
		],
		location: new SourceLocation(1727, 35, 74),
	}),
	new Token(SqlTokenType.Identifier, "department_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "        ", {
				location: new SourceLocation(1729, 36, 1),
			}),
		],
		location: new SourceLocation(1737, 36, 9),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1750, 36, 22),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1752, 36, 24),
			}),
		],
		location: new SourceLocation(1751, 36, 23),
	}),
	new Token(SqlTokenType.Identifier, "number_hired", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1753, 37, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1771, 37, 19),
			}),
		],
		location: new SourceLocation(1759, 37, 7),
	}),
	new Token(SqlTokenType.Operator, ":=", {
		location: new SourceLocation(1772, 37, 20),
	}),
	new Token(SqlTokenType.Identifier, "number_hired", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1774, 37, 22),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1787, 37, 35),
			}),
		],
		location: new SourceLocation(1775, 37, 23),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(1788, 37, 36),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1789, 37, 37),
			}),
		],
		location: new SourceLocation(1790, 37, 38),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1792, 37, 40),
			}),
		],
		location: new SourceLocation(1791, 37, 39),
	}),
	new Token(SqlTokenType.Identifier, "DBMS_OUTPUT", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1793, 38, 1),
			}),
		],
		location: new SourceLocation(1799, 38, 7),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(1810, 38, 18),
	}),
	new Token(SqlTokenType.Identifier, "PUT_LINE", {
		location: new SourceLocation(1811, 38, 19),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1819, 38, 27),
	}),
	new Token(SqlTokenType.String, "'The number of employees hired is '", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1855, 38, 63),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1856, 38, 64),
			}),
		],
		location: new SourceLocation(1820, 38, 28),
	}),
	new Token(SqlTokenType.Operator, "||", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "                           ", {
				location: new SourceLocation(1857, 39, 1),
			}),
		],
		location: new SourceLocation(1884, 39, 28),
	}),
	new Token(SqlTokenType.Identifier, "TO_CHAR", {
		keyword: SqlKeyword.TO_CHAR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1886, 39, 30),
			}),
		],
		location: new SourceLocation(1887, 39, 31),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1894, 39, 38),
	}),
	new Token(SqlTokenType.Identifier, "number_hired", {
		location: new SourceLocation(1895, 39, 39),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1908, 39, 52),
			}),
		],
		location: new SourceLocation(1907, 39, 51),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(1909, 39, 53),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1911, 39, 55),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1914, 39, 58),
			}),
		],
		location: new SourceLocation(1910, 39, 54),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(1915, 40, 1),
			}),
		],
		location: new SourceLocation(1921, 40, 7),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1927, 40, 13),
			}),
		],
		location: new SourceLocation(1928, 40, 14),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1939, 40, 25),
			}),
		],
		location: new SourceLocation(1938, 40, 24),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1940, 41, 1),
			}),
		],
		location: new SourceLocation(1943, 41, 4),
	}),
	new Token(SqlTokenType.Identifier, "hire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1946, 41, 7),
			}),
		],
		location: new SourceLocation(1947, 41, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(1961, 41, 22),
			}),
		],
		location: new SourceLocation(1960, 41, 21),
	}),
	new Token(SqlTokenType.Reserved, "PROCEDURE", {
		keyword: SqlKeyword.PROCEDURE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(1962, 42, 1),
			}),
		],
		location: new SourceLocation(1965, 42, 4),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1974, 42, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1988, 42, 27),
			}),
		],
		location: new SourceLocation(1975, 42, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(1989, 42, 28),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		location: new SourceLocation(1990, 42, 29),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(1996, 42, 35),
			}),
		],
		location: new SourceLocation(1997, 42, 36),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2003, 42, 42),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2004, 42, 43),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2007, 42, 46),
			}),
		],
		location: new SourceLocation(2005, 42, 44),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2008, 43, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2016, 43, 9),
			}),
		],
		location: new SourceLocation(2011, 43, 4),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeyword.DELETE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2017, 44, 1),
			}),
		],
		location: new SourceLocation(2023, 44, 7),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2029, 44, 13),
			}),
		],
		location: new SourceLocation(2030, 44, 14),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2034, 44, 18),
			}),
		],
		location: new SourceLocation(2035, 44, 19),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2044, 44, 28),
			}),
		],
		location: new SourceLocation(2045, 44, 29),
	}),
	new Token(SqlTokenType.Identifier, "employee_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2050, 44, 34),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2062, 44, 46),
			}),
		],
		location: new SourceLocation(2051, 44, 35),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(2063, 44, 47),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2064, 44, 48),
			}),
		],
		location: new SourceLocation(2065, 44, 49),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2072, 44, 56),
			}),
		],
		location: new SourceLocation(2071, 44, 55),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2073, 45, 1),
			}),
		],
		location: new SourceLocation(2076, 45, 4),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2079, 45, 7),
			}),
		],
		location: new SourceLocation(2080, 45, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2094, 45, 22),
			}),
		],
		location: new SourceLocation(2093, 45, 21),
	}),
	new Token(SqlTokenType.Reserved, "PROCEDURE", {
		keyword: SqlKeyword.PROCEDURE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2095, 46, 1),
			}),
		],
		location: new SourceLocation(2098, 46, 4),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2107, 46, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2121, 46, 27),
			}),
		],
		location: new SourceLocation(2108, 46, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2122, 46, 28),
	}),
	new Token(SqlTokenType.Identifier, "emp_email", {
		location: new SourceLocation(2123, 46, 29),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2132, 46, 38),
			}),
		],
		location: new SourceLocation(2133, 46, 39),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2141, 46, 47),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2142, 46, 48),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2145, 46, 51),
			}),
		],
		location: new SourceLocation(2143, 46, 49),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2146, 47, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2154, 47, 9),
			}),
		],
		location: new SourceLocation(2149, 47, 4),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeyword.DELETE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2155, 48, 1),
			}),
		],
		location: new SourceLocation(2161, 48, 7),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2167, 48, 13),
			}),
		],
		location: new SourceLocation(2168, 48, 14),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2172, 48, 18),
			}),
		],
		location: new SourceLocation(2173, 48, 19),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2182, 48, 28),
			}),
		],
		location: new SourceLocation(2183, 48, 29),
	}),
	new Token(SqlTokenType.Identifier, "email", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2188, 48, 34),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2194, 48, 40),
			}),
		],
		location: new SourceLocation(2189, 48, 35),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(2195, 48, 41),
	}),
	new Token(SqlTokenType.Identifier, "emp_email", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2196, 48, 42),
			}),
		],
		location: new SourceLocation(2197, 48, 43),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2207, 48, 53),
			}),
		],
		location: new SourceLocation(2206, 48, 52),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2208, 49, 1),
			}),
		],
		location: new SourceLocation(2211, 49, 4),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2214, 49, 7),
			}),
		],
		location: new SourceLocation(2215, 49, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2229, 49, 22),
			}),
		],
		location: new SourceLocation(2228, 49, 21),
	}),
	new Token(SqlTokenType.Reserved, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(2230, 50, 1),
			}),
			new Token(
				SqlTokenType.LineComment,
				"-- Define local function, available only inside package",
				{ location: new SourceLocation(2232, 50, 3) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2287, 50, 58),
			}),
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2288, 51, 1),
			}),
		],
		location: new SourceLocation(2291, 51, 4),
	}),
	new Token(SqlTokenType.Identifier, "sal_ok", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2299, 51, 12),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2306, 51, 19),
			}),
		],
		location: new SourceLocation(2300, 51, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2307, 51, 20),
	}),
	new Token(SqlTokenType.Identifier, "jobid", {
		location: new SourceLocation(2308, 51, 21),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2313, 51, 26),
			}),
		],
		location: new SourceLocation(2314, 51, 27),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2322, 51, 35),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2323, 51, 36),
			}),
		],
		location: new SourceLocation(2324, 51, 37),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2327, 51, 40),
			}),
		],
		location: new SourceLocation(2328, 51, 41),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2334, 51, 47),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2335, 51, 48),
			}),
		],
		location: new SourceLocation(2336, 51, 49),
	}),
	new Token(SqlTokenType.Identifier, "BOOLEAN", {
		keyword: SqlKeyword.BOOLEAN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2342, 51, 55),
			}),
		],
		location: new SourceLocation(2343, 51, 56),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2350, 51, 63),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2353, 51, 66),
			}),
		],
		location: new SourceLocation(2351, 51, 64),
	}),
	new Token(SqlTokenType.Identifier, "min_sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2354, 52, 1),
			}),
		],
		location: new SourceLocation(2360, 52, 7),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2367, 52, 14),
			}),
		],
		location: new SourceLocation(2368, 52, 15),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2375, 52, 22),
			}),
		],
		location: new SourceLocation(2374, 52, 21),
	}),
	new Token(SqlTokenType.Identifier, "max_sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2376, 53, 1),
			}),
		],
		location: new SourceLocation(2382, 53, 7),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2389, 53, 14),
			}),
		],
		location: new SourceLocation(2390, 53, 15),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2397, 53, 22),
			}),
		],
		location: new SourceLocation(2396, 53, 21),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2398, 54, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2406, 54, 9),
			}),
		],
		location: new SourceLocation(2401, 54, 4),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeyword.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2407, 55, 1),
			}),
		],
		location: new SourceLocation(2413, 55, 7),
	}),
	new Token(SqlTokenType.Identifier, "MIN", {
		keyword: SqlKeyword.MIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2419, 55, 13),
			}),
		],
		location: new SourceLocation(2420, 55, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2423, 55, 17),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		location: new SourceLocation(2424, 55, 18),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2430, 55, 24),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2431, 55, 25),
	}),
	new Token(SqlTokenType.Identifier, "MAX", {
		keyword: SqlKeyword.MAX,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2432, 55, 26),
			}),
		],
		location: new SourceLocation(2433, 55, 27),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2436, 55, 30),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		location: new SourceLocation(2437, 55, 31),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2443, 55, 37),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeyword.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2444, 55, 38),
			}),
		],
		location: new SourceLocation(2445, 55, 39),
	}),
	new Token(SqlTokenType.Identifier, "min_sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2449, 55, 43),
			}),
		],
		location: new SourceLocation(2450, 55, 44),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2457, 55, 51),
	}),
	new Token(SqlTokenType.Identifier, "max_sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2458, 55, 52),
			}),
		],
		location: new SourceLocation(2459, 55, 53),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2466, 55, 60),
			}),
		],
		location: new SourceLocation(2467, 55, 61),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2471, 55, 65),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2481, 55, 75),
			}),
		],
		location: new SourceLocation(2472, 55, 66),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "         ", {
				location: new SourceLocation(2482, 56, 1),
			}),
		],
		location: new SourceLocation(2491, 56, 10),
	}),
	new Token(SqlTokenType.Identifier, "job_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2496, 56, 15),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2503, 56, 22),
			}),
		],
		location: new SourceLocation(2497, 56, 16),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(2504, 56, 23),
	}),
	new Token(SqlTokenType.Identifier, "jobid", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2505, 56, 24),
			}),
		],
		location: new SourceLocation(2506, 56, 25),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2512, 56, 31),
			}),
		],
		location: new SourceLocation(2511, 56, 30),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2513, 57, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2525, 57, 13),
			}),
		],
		location: new SourceLocation(2519, 57, 7),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2526, 57, 14),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2530, 57, 18),
			}),
		],
		location: new SourceLocation(2527, 57, 15),
	}),
	new Token(SqlTokenType.Operator, ">=", {
		location: new SourceLocation(2531, 57, 19),
	}),
	new Token(SqlTokenType.Identifier, "min_sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2533, 57, 21),
			}),
		],
		location: new SourceLocation(2534, 57, 22),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2541, 57, 29),
	}),
	new Token(SqlTokenType.Reserved, "AND", {
		keyword: SqlKeyword.AND,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2542, 57, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2546, 57, 34),
			}),
		],
		location: new SourceLocation(2543, 57, 31),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2547, 57, 35),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2551, 57, 39),
			}),
		],
		location: new SourceLocation(2548, 57, 36),
	}),
	new Token(SqlTokenType.Operator, "<=", {
		location: new SourceLocation(2552, 57, 40),
	}),
	new Token(SqlTokenType.Identifier, "max_sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2554, 57, 42),
			}),
		],
		location: new SourceLocation(2555, 57, 43),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2562, 57, 50),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2564, 57, 52),
			}),
		],
		location: new SourceLocation(2563, 57, 51),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2565, 58, 1),
			}),
		],
		location: new SourceLocation(2568, 58, 4),
	}),
	new Token(SqlTokenType.Identifier, "sal_ok", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2571, 58, 7),
			}),
		],
		location: new SourceLocation(2572, 58, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2579, 58, 15),
			}),
		],
		location: new SourceLocation(2578, 58, 14),
	}),
	new Token(SqlTokenType.Reserved, "PROCEDURE", {
		keyword: SqlKeyword.PROCEDURE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2580, 59, 1),
			}),
		],
		location: new SourceLocation(2583, 59, 4),
	}),
	new Token(SqlTokenType.Identifier, "raise_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2592, 59, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2605, 59, 26),
			}),
		],
		location: new SourceLocation(2593, 59, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2606, 59, 27),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		location: new SourceLocation(2607, 59, 28),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2613, 59, 34),
			}),
		],
		location: new SourceLocation(2614, 59, 35),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2620, 59, 41),
	}),
	new Token(SqlTokenType.Identifier, "amount", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2621, 59, 42),
			}),
		],
		location: new SourceLocation(2622, 59, 43),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2628, 59, 49),
			}),
		],
		location: new SourceLocation(2629, 59, 50),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2635, 59, 56),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2636, 59, 57),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2639, 59, 60),
			}),
		],
		location: new SourceLocation(2637, 59, 58),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2640, 60, 1),
			}),
		],
		location: new SourceLocation(2646, 60, 7),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2649, 60, 10),
			}),
		],
		location: new SourceLocation(2650, 60, 11),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2656, 60, 17),
	}),
	new Token(SqlTokenType.Numeric, "8", {
		location: new SourceLocation(2657, 60, 18),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2658, 60, 19),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		location: new SourceLocation(2659, 60, 20),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2660, 60, 21),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2662, 60, 23),
			}),
		],
		location: new SourceLocation(2661, 60, 22),
	}),
	new Token(SqlTokenType.Identifier, "jobid", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2663, 61, 1),
			}),
		],
		location: new SourceLocation(2669, 61, 7),
	}),
	new Token(SqlTokenType.Reserved, "VARCHAR2", {
		keyword: SqlKeyword.VARCHAR2,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2674, 61, 12),
			}),
		],
		location: new SourceLocation(2675, 61, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2683, 61, 21),
	}),
	new Token(SqlTokenType.Numeric, "10", {
		location: new SourceLocation(2684, 61, 22),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2686, 61, 24),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2688, 61, 26),
			}),
		],
		location: new SourceLocation(2687, 61, 25),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2689, 62, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2697, 62, 9),
			}),
		],
		location: new SourceLocation(2692, 62, 4),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeyword.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2698, 63, 1),
			}),
		],
		location: new SourceLocation(2704, 63, 7),
	}),
	new Token(SqlTokenType.Identifier, "job_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2710, 63, 13),
			}),
		],
		location: new SourceLocation(2711, 63, 14),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2717, 63, 20),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2718, 63, 21),
			}),
		],
		location: new SourceLocation(2719, 63, 22),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeyword.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2725, 63, 28),
			}),
		],
		location: new SourceLocation(2726, 63, 29),
	}),
	new Token(SqlTokenType.Identifier, "jobid", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2730, 63, 33),
			}),
		],
		location: new SourceLocation(2731, 63, 34),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2736, 63, 39),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2737, 63, 40),
			}),
		],
		location: new SourceLocation(2738, 63, 41),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2741, 63, 44),
			}),
		],
		location: new SourceLocation(2742, 63, 45),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2746, 63, 49),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2756, 63, 59),
			}),
		],
		location: new SourceLocation(2747, 63, 50),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "             ", {
				location: new SourceLocation(2757, 64, 1),
			}),
		],
		location: new SourceLocation(2770, 64, 14),
	}),
	new Token(SqlTokenType.Identifier, "employee_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2775, 64, 19),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2787, 64, 31),
			}),
		],
		location: new SourceLocation(2776, 64, 20),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(2788, 64, 32),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2789, 64, 33),
			}),
		],
		location: new SourceLocation(2790, 64, 34),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2797, 64, 41),
			}),
		],
		location: new SourceLocation(2796, 64, 40),
	}),
	new Token(SqlTokenType.Reserved, "IF", {
		keyword: SqlKeyword.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2798, 65, 1),
			}),
		],
		location: new SourceLocation(2804, 65, 7),
	}),
	new Token(SqlTokenType.Identifier, "sal_ok", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2806, 65, 9),
			}),
		],
		location: new SourceLocation(2807, 65, 10),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(2813, 65, 16),
	}),
	new Token(SqlTokenType.Identifier, "jobid", {
		location: new SourceLocation(2814, 65, 17),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(2819, 65, 22),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2820, 65, 23),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2824, 65, 27),
			}),
		],
		location: new SourceLocation(2821, 65, 24),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(2825, 65, 28),
	}),
	new Token(SqlTokenType.Identifier, "amount", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2826, 65, 29),
			}),
		],
		location: new SourceLocation(2827, 65, 30),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(2833, 65, 36),
	}),
	new Token(SqlTokenType.Reserved, "THEN", {
		keyword: SqlKeyword.THEN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2834, 65, 37),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2839, 65, 42),
			}),
		],
		location: new SourceLocation(2835, 65, 38),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeyword.UPDATE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "         ", {
				location: new SourceLocation(2840, 66, 1),
			}),
		],
		location: new SourceLocation(2849, 66, 10),
	}),
	new Token(SqlTokenType.Identifier, "employees", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2855, 66, 16),
			}),
		],
		location: new SourceLocation(2856, 66, 17),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeyword.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2865, 66, 26),
			}),
		],
		location: new SourceLocation(2866, 66, 27),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2869, 66, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2876, 66, 37),
			}),
		],
		location: new SourceLocation(2870, 66, 31),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(2877, 66, 38),
	}),
	new Token(SqlTokenType.Identifier, "salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2878, 66, 39),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2885, 66, 46),
			}),
		],
		location: new SourceLocation(2879, 66, 40),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(2886, 66, 47),
	}),
	new Token(SqlTokenType.Identifier, "amount", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2887, 66, 48),
			}),
		],
		location: new SourceLocation(2888, 66, 49),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2894, 66, 55),
			}),
		],
		location: new SourceLocation(2895, 66, 56),
	}),
	new Token(SqlTokenType.Identifier, "employee_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2900, 66, 61),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2912, 66, 73),
			}),
		],
		location: new SourceLocation(2901, 66, 62),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(2913, 66, 74),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2914, 66, 75),
			}),
		],
		location: new SourceLocation(2915, 66, 76),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2922, 66, 83),
			}),
		],
		location: new SourceLocation(2921, 66, 82),
	}),
	new Token(SqlTokenType.Reserved, "ELSE", {
		keyword: SqlKeyword.ELSE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2923, 67, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2933, 67, 11),
			}),
		],
		location: new SourceLocation(2929, 67, 7),
	}),
	new Token(SqlTokenType.Identifier, "RAISE", {
		keyword: SqlKeyword.RAISE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "         ", {
				location: new SourceLocation(2934, 68, 1),
			}),
		],
		location: new SourceLocation(2943, 68, 10),
	}),
	new Token(SqlTokenType.Identifier, "invalid_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2948, 68, 15),
			}),
		],
		location: new SourceLocation(2949, 68, 16),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2964, 68, 31),
			}),
		],
		location: new SourceLocation(2963, 68, 30),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(2965, 69, 1),
			}),
		],
		location: new SourceLocation(2971, 69, 7),
	}),
	new Token(SqlTokenType.Reserved, "IF", {
		keyword: SqlKeyword.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(2974, 69, 10),
			}),
		],
		location: new SourceLocation(2975, 69, 11),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(2978, 69, 14),
			}),
		],
		location: new SourceLocation(2977, 69, 13),
	}),
	new Token(SqlTokenType.Reserved, "EXCEPTION", {
		keyword: SqlKeyword.EXCEPTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(2979, 70, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(2991, 70, 13),
			}),
			new Token(
				SqlTokenType.LineComment,
				"-- exception-handling part starts here",
				{ location: new SourceLocation(2993, 70, 15) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3031, 70, 53),
			}),
		],
		location: new SourceLocation(2982, 70, 4),
	}),
	new Token(SqlTokenType.Reserved, "WHEN", {
		keyword: SqlKeyword.WHEN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "     ", {
				location: new SourceLocation(3032, 71, 1),
			}),
		],
		location: new SourceLocation(3037, 71, 6),
	}),
	new Token(SqlTokenType.Identifier, "invalid_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3041, 71, 10),
			}),
		],
		location: new SourceLocation(3042, 71, 11),
	}),
	new Token(SqlTokenType.Reserved, "THEN", {
		keyword: SqlKeyword.THEN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3056, 71, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3061, 71, 30),
			}),
		],
		location: new SourceLocation(3057, 71, 26),
	}),
	new Token(SqlTokenType.Identifier, "DBMS_OUTPUT", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "       ", {
				location: new SourceLocation(3062, 72, 1),
			}),
		],
		location: new SourceLocation(3069, 72, 8),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(3080, 72, 19),
	}),
	new Token(SqlTokenType.Identifier, "PUT_LINE", {
		location: new SourceLocation(3081, 72, 20),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3089, 72, 28),
	}),
	new Token(
		SqlTokenType.String,
		"'The salary is out of the specified range.'",
		{ location: new SourceLocation(3090, 72, 29) },
	),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3133, 72, 72),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3135, 72, 74),
			}),
		],
		location: new SourceLocation(3134, 72, 73),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(3136, 73, 1),
			}),
		],
		location: new SourceLocation(3139, 73, 4),
	}),
	new Token(SqlTokenType.Identifier, "raise_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3142, 73, 7),
			}),
		],
		location: new SourceLocation(3143, 73, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3156, 73, 21),
			}),
		],
		location: new SourceLocation(3155, 73, 20),
	}),
	new Token(SqlTokenType.Reserved, "FUNCTION", {
		keyword: SqlKeyword.FUNCTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(3157, 74, 1),
			}),
		],
		location: new SourceLocation(3160, 74, 4),
	}),
	new Token(SqlTokenType.Identifier, "nth_highest_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3168, 74, 12),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3187, 74, 31),
			}),
		],
		location: new SourceLocation(3169, 74, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3188, 74, 32),
	}),
	new Token(SqlTokenType.Identifier, "n", {
		location: new SourceLocation(3189, 74, 33),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3190, 74, 34),
			}),
		],
		location: new SourceLocation(3191, 74, 35),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3197, 74, 41),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3198, 74, 42),
			}),
		],
		location: new SourceLocation(3199, 74, 43),
	}),
	new Token(SqlTokenType.Identifier, "EmpRecTyp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3205, 74, 49),
			}),
		],
		location: new SourceLocation(3206, 74, 50),
	}),
	new Token(SqlTokenType.Reserved, "IS", {
		keyword: SqlKeyword.IS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3215, 74, 59),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3218, 74, 62),
			}),
		],
		location: new SourceLocation(3216, 74, 60),
	}),
	new Token(SqlTokenType.Identifier, "emp_rec", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(3219, 75, 1),
			}),
		],
		location: new SourceLocation(3225, 75, 7),
	}),
	new Token(SqlTokenType.Identifier, "EmpRecTyp", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3232, 75, 14),
			}),
		],
		location: new SourceLocation(3233, 75, 15),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3243, 75, 25),
			}),
		],
		location: new SourceLocation(3242, 75, 24),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(3244, 76, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3252, 76, 9),
			}),
		],
		location: new SourceLocation(3247, 76, 4),
	}),
	new Token(SqlTokenType.Identifier, "OPEN", {
		keyword: SqlKeyword.OPEN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(3253, 77, 1),
			}),
		],
		location: new SourceLocation(3259, 77, 7),
	}),
	new Token(SqlTokenType.Identifier, "desc_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3263, 77, 11),
			}),
		],
		location: new SourceLocation(3264, 77, 12),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3276, 77, 24),
			}),
		],
		location: new SourceLocation(3275, 77, 23),
	}),
	new Token(SqlTokenType.Reserved, "FOR", {
		keyword: SqlKeyword.FOR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(3277, 78, 1),
			}),
		],
		location: new SourceLocation(3283, 78, 7),
	}),
	new Token(SqlTokenType.Identifier, "i", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3286, 78, 10),
			}),
		],
		location: new SourceLocation(3287, 78, 11),
	}),
	new Token(SqlTokenType.Reserved, "IN", {
		keyword: SqlKeyword.IN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3288, 78, 12),
			}),
		],
		location: new SourceLocation(3289, 78, 13),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3291, 78, 15),
			}),
		],
		location: new SourceLocation(3292, 78, 16),
	}),
	new Token(SqlTokenType.Operator, "..", {
		location: new SourceLocation(3293, 78, 17),
	}),
	new Token(SqlTokenType.Identifier, "n", {
		location: new SourceLocation(3295, 78, 19),
	}),
	new Token(SqlTokenType.Identifier, "LOOP", {
		keyword: SqlKeyword.LOOP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3296, 78, 20),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3301, 78, 25),
			}),
		],
		location: new SourceLocation(3297, 78, 21),
	}),
	new Token(SqlTokenType.Reserved, "FETCH", {
		keyword: SqlKeyword.FETCH,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "         ", {
				location: new SourceLocation(3302, 79, 1),
			}),
		],
		location: new SourceLocation(3311, 79, 10),
	}),
	new Token(SqlTokenType.Identifier, "desc_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3316, 79, 15),
			}),
		],
		location: new SourceLocation(3317, 79, 16),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeyword.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3328, 79, 27),
			}),
		],
		location: new SourceLocation(3329, 79, 28),
	}),
	new Token(SqlTokenType.Identifier, "emp_rec", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3333, 79, 32),
			}),
		],
		location: new SourceLocation(3334, 79, 33),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3342, 79, 41),
			}),
		],
		location: new SourceLocation(3341, 79, 40),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(3343, 80, 1),
			}),
		],
		location: new SourceLocation(3349, 80, 7),
	}),
	new Token(SqlTokenType.Identifier, "LOOP", {
		keyword: SqlKeyword.LOOP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3352, 80, 10),
			}),
		],
		location: new SourceLocation(3353, 80, 11),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3358, 80, 16),
			}),
		],
		location: new SourceLocation(3357, 80, 15),
	}),
	new Token(SqlTokenType.Identifier, "CLOSE", {
		keyword: SqlKeyword.CLOSE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(3359, 81, 1),
			}),
		],
		location: new SourceLocation(3365, 81, 7),
	}),
	new Token(SqlTokenType.Identifier, "desc_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3370, 81, 12),
			}),
		],
		location: new SourceLocation(3371, 81, 13),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3383, 81, 25),
			}),
		],
		location: new SourceLocation(3382, 81, 24),
	}),
	new Token(SqlTokenType.Identifier, "RETURN", {
		keyword: SqlKeyword.RETURN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "      ", {
				location: new SourceLocation(3384, 82, 1),
			}),
		],
		location: new SourceLocation(3390, 82, 7),
	}),
	new Token(SqlTokenType.Identifier, "emp_rec", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3396, 82, 13),
			}),
		],
		location: new SourceLocation(3397, 82, 14),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3405, 82, 22),
			}),
		],
		location: new SourceLocation(3404, 82, 21),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(3406, 83, 1),
			}),
		],
		location: new SourceLocation(3409, 83, 4),
	}),
	new Token(SqlTokenType.Identifier, "nth_highest_salary", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3412, 83, 7),
			}),
		],
		location: new SourceLocation(3413, 83, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3432, 83, 27),
			}),
		],
		location: new SourceLocation(3431, 83, 26),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(3438, 84, 6),
			}),
			new Token(
				SqlTokenType.LineComment,
				"-- initialization part starts here",
				{ location: new SourceLocation(3440, 84, 8) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3474, 84, 42),
			}),
		],
		location: new SourceLocation(3433, 84, 1),
	}),
	new Token(SqlTokenType.Reserved, "INSERT", {
		keyword: SqlKeyword.INSERT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(3475, 85, 1),
			}),
		],
		location: new SourceLocation(3478, 85, 4),
	}),
	new Token(SqlTokenType.Reserved, "INTO", {
		keyword: SqlKeyword.INTO,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3484, 85, 10),
			}),
		],
		location: new SourceLocation(3485, 85, 11),
	}),
	new Token(SqlTokenType.Identifier, "emp_audit", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3489, 85, 15),
			}),
		],
		location: new SourceLocation(3490, 85, 16),
	}),
	new Token(SqlTokenType.Reserved, "VALUES", {
		keyword: SqlKeyword.VALUES,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3499, 85, 25),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3506, 85, 32),
			}),
		],
		location: new SourceLocation(3500, 85, 26),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3507, 85, 33),
	}),
	new Token(SqlTokenType.Reserved, "SYSDATE", {
		keyword: SqlKeyword.SYSDATE,
		location: new SourceLocation(3508, 85, 34),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3515, 85, 41),
	}),
	new Token(SqlTokenType.Reserved, "USER", {
		keyword: SqlKeyword.USER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3516, 85, 42),
			}),
		],
		location: new SourceLocation(3517, 85, 43),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3521, 85, 47),
	}),
	new Token(SqlTokenType.String, "'EMP_ADMIN'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3522, 85, 48),
			}),
		],
		location: new SourceLocation(3523, 85, 49),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3534, 85, 60),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3536, 85, 62),
			}),
		],
		location: new SourceLocation(3535, 85, 61),
	}),
	new Token(SqlTokenType.Identifier, "number_hired", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(3537, 86, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3552, 86, 16),
			}),
		],
		location: new SourceLocation(3540, 86, 4),
	}),
	new Token(SqlTokenType.Operator, ":=", {
		location: new SourceLocation(3553, 86, 17),
	}),
	new Token(SqlTokenType.Numeric, "0", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3555, 86, 19),
			}),
		],
		location: new SourceLocation(3556, 86, 20),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3558, 86, 22),
			}),
		],
		location: new SourceLocation(3557, 86, 21),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		location: new SourceLocation(3559, 87, 1),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3562, 87, 4),
			}),
		],
		location: new SourceLocation(3563, 87, 5),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3573, 87, 15),
			}),
		],
		location: new SourceLocation(3572, 87, 14),
	}),
	new Token(SqlTokenType.Delimiter, "/", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3575, 88, 2),
			}),
		],
		location: new SourceLocation(3574, 88, 1),
	}),
	new Token(SqlTokenType.Reserved, "DECLARE", {
		keyword: SqlKeyword.DECLARE,
		preskips: [
			new Token(SqlTokenType.LineComment, "-- calling the package procedures", {
				location: new SourceLocation(3576, 89, 1),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3609, 89, 34),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3617, 90, 8),
			}),
		],
		location: new SourceLocation(3610, 90, 1),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(3618, 91, 1),
			}),
		],
		location: new SourceLocation(3620, 91, 3),
	}),
	new Token(SqlTokenType.Reserved, "NUMBER", {
		keyword: SqlKeyword.NUMBER,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3630, 91, 13),
			}),
		],
		location: new SourceLocation(3631, 91, 14),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3637, 91, 20),
	}),
	new Token(SqlTokenType.Numeric, "6", {
		location: new SourceLocation(3638, 91, 21),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3639, 91, 22),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3641, 91, 24),
			}),
		],
		location: new SourceLocation(3640, 91, 23),
	}),
	new Token(SqlTokenType.Reserved, "BEGIN", {
		keyword: SqlKeyword.BEGIN,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3647, 92, 6),
			}),
		],
		location: new SourceLocation(3642, 92, 1),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(3648, 93, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3660, 93, 13),
			}),
		],
		location: new SourceLocation(3650, 93, 3),
	}),
	new Token(SqlTokenType.Operator, ":=", {
		location: new SourceLocation(3661, 93, 14),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3663, 93, 16),
			}),
		],
		location: new SourceLocation(3664, 93, 17),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(3673, 93, 26),
	}),
	new Token(SqlTokenType.Identifier, "hire_employee", {
		location: new SourceLocation(3674, 93, 27),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3687, 93, 40),
	}),
	new Token(SqlTokenType.String, "'Belden'", {
		location: new SourceLocation(3688, 93, 41),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3696, 93, 49),
	}),
	new Token(SqlTokenType.String, "'Enrique'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3697, 93, 50),
			}),
		],
		location: new SourceLocation(3698, 93, 51),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3707, 93, 60),
	}),
	new Token(SqlTokenType.String, "'EBELDEN'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3708, 93, 61),
			}),
		],
		location: new SourceLocation(3709, 93, 62),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3719, 93, 72),
			}),
		],
		location: new SourceLocation(3718, 93, 71),
	}),
	new Token(SqlTokenType.String, "'555.111.2222'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "                   ", {
				location: new SourceLocation(3720, 94, 1),
			}),
		],
		location: new SourceLocation(3739, 94, 20),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3753, 94, 34),
	}),
	new Token(SqlTokenType.String, "'ST_CLERK'", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3754, 94, 35),
			}),
		],
		location: new SourceLocation(3755, 94, 36),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3765, 94, 46),
	}),
	new Token(SqlTokenType.Numeric, "2500", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3766, 94, 47),
			}),
		],
		location: new SourceLocation(3767, 94, 48),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3771, 94, 52),
	}),
	new Token(SqlTokenType.Numeric, ".1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3772, 94, 53),
			}),
		],
		location: new SourceLocation(3773, 94, 54),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3775, 94, 56),
	}),
	new Token(SqlTokenType.Numeric, "101", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3776, 94, 57),
			}),
		],
		location: new SourceLocation(3777, 94, 58),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3780, 94, 61),
	}),
	new Token(SqlTokenType.Numeric, "110", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3781, 94, 62),
			}),
		],
		location: new SourceLocation(3782, 94, 63),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3785, 94, 66),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3787, 94, 68),
			}),
		],
		location: new SourceLocation(3786, 94, 67),
	}),
	new Token(SqlTokenType.Identifier, "DBMS_OUTPUT", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(3788, 95, 1),
			}),
		],
		location: new SourceLocation(3790, 95, 3),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(3801, 95, 14),
	}),
	new Token(SqlTokenType.Identifier, "PUT_LINE", {
		location: new SourceLocation(3802, 95, 15),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3810, 95, 23),
	}),
	new Token(SqlTokenType.String, "'The new employee id is '", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3836, 95, 49),
			}),
		],
		location: new SourceLocation(3811, 95, 24),
	}),
	new Token(SqlTokenType.Operator, "||", {
		location: new SourceLocation(3837, 95, 50),
	}),
	new Token(SqlTokenType.Identifier, "TO_CHAR", {
		keyword: SqlKeyword.TO_CHAR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3839, 95, 52),
			}),
		],
		location: new SourceLocation(3840, 95, 53),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3847, 95, 60),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		location: new SourceLocation(3848, 95, 61),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3859, 95, 72),
			}),
		],
		location: new SourceLocation(3858, 95, 71),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3860, 95, 73),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3862, 95, 75),
			}),
		],
		location: new SourceLocation(3861, 95, 74),
	}),
	new Token(SqlTokenType.Identifier, "EMP_ADMIN", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(3863, 96, 1),
			}),
		],
		location: new SourceLocation(3865, 96, 3),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(3874, 96, 12),
	}),
	new Token(SqlTokenType.Identifier, "raise_salary", {
		location: new SourceLocation(3875, 96, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3887, 96, 25),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		location: new SourceLocation(3888, 96, 26),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(3898, 96, 36),
	}),
	new Token(SqlTokenType.Numeric, "100", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3899, 96, 37),
			}),
		],
		location: new SourceLocation(3900, 96, 38),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(3903, 96, 41),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3905, 96, 43),
			}),
		],
		location: new SourceLocation(3904, 96, 42),
	}),
	new Token(SqlTokenType.Identifier, "DBMS_OUTPUT", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(3906, 97, 1),
			}),
		],
		location: new SourceLocation(3908, 97, 3),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(3919, 97, 14),
	}),
	new Token(SqlTokenType.Identifier, "PUT_LINE", {
		location: new SourceLocation(3920, 97, 15),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3928, 97, 23),
	}),
	new Token(SqlTokenType.String, "'The 10th highest salary is '", {
		location: new SourceLocation(3929, 97, 24),
	}),
	new Token(SqlTokenType.Operator, "||", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(3960, 97, 55),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(3961, 97, 56),
			}),
		],
		location: new SourceLocation(3958, 97, 53),
	}),
	new Token(SqlTokenType.Identifier, "TO_CHAR", {
		keyword: SqlKeyword.TO_CHAR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(3962, 98, 1),
			}),
		],
		location: new SourceLocation(3966, 98, 5),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(3973, 98, 12),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		location: new SourceLocation(3974, 98, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(3983, 98, 22),
	}),
	new Token(SqlTokenType.Identifier, "nth_highest_salary", {
		location: new SourceLocation(3984, 98, 23),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(4002, 98, 41),
	}),
	new Token(SqlTokenType.Numeric, "10", {
		location: new SourceLocation(4003, 98, 42),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(4005, 98, 44),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(4006, 98, 45),
	}),
	new Token(SqlTokenType.Identifier, "sal", {
		location: new SourceLocation(4007, 98, 46),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4011, 98, 50),
			}),
		],
		location: new SourceLocation(4010, 98, 49),
	}),
	new Token(SqlTokenType.Operator, "||", {
		location: new SourceLocation(4012, 98, 51),
	}),
	new Token(SqlTokenType.String, "', belonging to employee: '", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4014, 98, 53),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4042, 98, 81),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4043, 98, 82),
			}),
		],
		location: new SourceLocation(4015, 98, 54),
	}),
	new Token(SqlTokenType.Operator, "||", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(4044, 99, 1),
			}),
		],
		location: new SourceLocation(4048, 99, 5),
	}),
	new Token(SqlTokenType.Identifier, "TO_CHAR", {
		keyword: SqlKeyword.TO_CHAR,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4050, 99, 7),
			}),
		],
		location: new SourceLocation(4051, 99, 8),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(4058, 99, 15),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		location: new SourceLocation(4059, 99, 16),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(4068, 99, 25),
	}),
	new Token(SqlTokenType.Identifier, "nth_highest_salary", {
		location: new SourceLocation(4069, 99, 26),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(4087, 99, 44),
	}),
	new Token(SqlTokenType.Numeric, "10", {
		location: new SourceLocation(4088, 99, 45),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(4090, 99, 47),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(4091, 99, 48),
	}),
	new Token(SqlTokenType.Identifier, "emp_id", {
		location: new SourceLocation(4092, 99, 49),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(4099, 99, 56),
			}),
		],
		location: new SourceLocation(4098, 99, 55),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(4100, 99, 57),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4102, 99, 59),
			}),
		],
		location: new SourceLocation(4101, 99, 58),
	}),
	new Token(SqlTokenType.Identifier, "emp_admin", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(4103, 100, 1),
			}),
		],
		location: new SourceLocation(4105, 100, 3),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(4114, 100, 12),
	}),
	new Token(SqlTokenType.Identifier, "fire_employee", {
		location: new SourceLocation(4115, 100, 13),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(4128, 100, 26),
	}),
	new Token(SqlTokenType.Identifier, "new_emp_id", {
		location: new SourceLocation(4129, 100, 27),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(4139, 100, 37),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4141, 100, 39),
			}),
		],
		location: new SourceLocation(4140, 100, 38),
	}),
	new Token(SqlTokenType.Reserved, "END", {
		keyword: SqlKeyword.END,
		preskips: [
			new Token(
				SqlTokenType.LineComment,
				"-- you could also delete the newly added employee as follows:",
				{ location: new SourceLocation(4142, 101, 1) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4203, 101, 62),
			}),
			new Token(
				SqlTokenType.LineComment,
				"--  emp_admin.fire_employee('EBELDEN');",
				{ location: new SourceLocation(4204, 102, 1) },
			),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4243, 102, 40),
			}),
		],
		location: new SourceLocation(4244, 103, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4248, 103, 5),
			}),
		],
		location: new SourceLocation(4247, 103, 4),
	}),
	new Token(SqlTokenType.Delimiter, "/", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(4250, 104, 2),
			}),
		],
		location: new SourceLocation(4249, 104, 1),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(4251, 105, 1),
	}),
];
