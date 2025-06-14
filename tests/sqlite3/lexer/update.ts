import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(13, 1, 13),
			}),
		],
		location: new SourceLocation(14, 1, 14),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(17, 1, 17),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(19, 1, 19),
			}),
		],
		location: new SourceLocation(18, 1, 18),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(20, 1, 20),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(21, 1, 21),
			}),
		],
		location: new SourceLocation(22, 1, 22),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(24, 1, 24),
			}),
		],
		location: new SourceLocation(23, 1, 23),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		location: new SourceLocation(25, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(31, 2, 7),
			}),
		],
		location: new SourceLocation(32, 2, 8),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(36, 2, 12) }),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(37, 2, 13),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(43, 2, 19),
			}),
		],
		location: new SourceLocation(44, 2, 20),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(47, 2, 23),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(49, 2, 25),
			}),
		],
		location: new SourceLocation(48, 2, 24),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(50, 2, 26),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(51, 2, 27),
			}),
		],
		location: new SourceLocation(52, 2, 28),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(53, 2, 29),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(54, 2, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(56, 2, 32),
			}),
		],
		location: new SourceLocation(55, 2, 31),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(57, 2, 33),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(58, 2, 34),
			}),
		],
		location: new SourceLocation(59, 2, 35),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(60, 2, 36),
			}),
		],
		location: new SourceLocation(61, 2, 37),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(66, 2, 42),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(68, 2, 44),
			}),
		],
		location: new SourceLocation(67, 2, 43),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(69, 2, 45),
	}),
	new Token(SqlTokenType.Numeric, "3", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(70, 2, 46),
			}),
		],
		location: new SourceLocation(71, 2, 47),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(73, 2, 49),
			}),
		],
		location: new SourceLocation(72, 2, 48),
	}),
	new Token(SqlTokenType.Identifier, "WITH", {
		keyword: SqlKeywords.WITH,
		location: new SourceLocation(74, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(78, 3, 5),
			}),
		],
		location: new SourceLocation(79, 3, 6),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(80, 3, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(83, 3, 10),
			}),
		],
		location: new SourceLocation(81, 3, 8),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(84, 3, 11),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(85, 3, 12),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(91, 3, 18),
			}),
		],
		location: new SourceLocation(92, 3, 19),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(93, 3, 20),
			}),
		],
		location: new SourceLocation(94, 3, 21),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(96, 3, 23),
			}),
		],
		location: new SourceLocation(97, 3, 24),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(99, 3, 26),
			}),
		],
		location: new SourceLocation(98, 3, 25),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		location: new SourceLocation(100, 4, 1),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(106, 4, 7),
			}),
		],
		location: new SourceLocation(107, 4, 8),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(113, 4, 14),
			}),
		],
		location: new SourceLocation(114, 4, 15),
	}),
	new Token(SqlTokenType.Identifier, "dest", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(116, 4, 17),
			}),
		],
		location: new SourceLocation(117, 4, 18),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(121, 4, 22),
			}),
		],
		location: new SourceLocation(122, 4, 23),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(125, 4, 26),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(127, 4, 28),
			}),
		],
		location: new SourceLocation(126, 4, 27),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(128, 4, 29),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(129, 4, 30),
			}),
		],
		location: new SourceLocation(130, 4, 31),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(131, 4, 32),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(132, 4, 33),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(134, 4, 35),
			}),
		],
		location: new SourceLocation(133, 4, 34),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(135, 4, 36),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(136, 4, 37),
			}),
		],
		location: new SourceLocation(137, 4, 38),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(138, 4, 39),
			}),
		],
		location: new SourceLocation(139, 4, 40),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(143, 4, 44),
			}),
		],
		location: new SourceLocation(144, 4, 45),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(145, 4, 46),
			}),
		],
		location: new SourceLocation(146, 4, 47),
	}),
	new Token(SqlTokenType.Identifier, "dest", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(151, 4, 52),
			}),
		],
		location: new SourceLocation(152, 4, 53),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(156, 4, 57),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(158, 4, 59),
			}),
		],
		location: new SourceLocation(157, 4, 58),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(159, 4, 60),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(160, 4, 61),
			}),
		],
		location: new SourceLocation(161, 4, 62),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(162, 4, 63),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		location: new SourceLocation(163, 4, 64),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(165, 4, 66),
			}),
		],
		location: new SourceLocation(164, 4, 65),
	}),
	new Token(SqlTokenType.Reserved, "UPDATE", {
		keyword: SqlKeywords.UPDATE,
		location: new SourceLocation(166, 5, 1),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(172, 5, 7),
			}),
		],
		location: new SourceLocation(173, 5, 8),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(177, 5, 12),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeywords.SAMPLE,
		location: new SourceLocation(178, 5, 13),
	}),
	new Token(SqlTokenType.Reserved, "SET", {
		keyword: SqlKeywords.SET,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(184, 5, 19),
			}),
		],
		location: new SourceLocation(185, 5, 20),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(188, 5, 23),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(190, 5, 25),
			}),
		],
		location: new SourceLocation(189, 5, 24),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(191, 5, 26),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(192, 5, 27),
			}),
		],
		location: new SourceLocation(193, 5, 28),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(194, 5, 29),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(195, 5, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(197, 5, 32),
			}),
		],
		location: new SourceLocation(196, 5, 31),
	}),
	new Token(SqlTokenType.Operator, "=", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(199, 5, 34),
			}),
		],
		location: new SourceLocation(198, 5, 33),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(200, 5, 35),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(201, 5, 36),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(207, 5, 42),
			}),
		],
		location: new SourceLocation(208, 5, 43),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(209, 5, 44),
	}),
	new Token(SqlTokenType.Reserved, "RETURNING", {
		keyword: SqlKeywords.RETURNING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(210, 5, 45),
			}),
		],
		location: new SourceLocation(211, 5, 46),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(220, 5, 55),
			}),
		],
		location: new SourceLocation(221, 5, 56),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(222, 5, 57),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(223, 5, 58),
			}),
		],
		location: new SourceLocation(224, 5, 59),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(225, 5, 60),
			}),
		],
		location: new SourceLocation(226, 5, 61),
	}),
	new Token(SqlTokenType.Identifier, "Z", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(228, 5, 63),
			}),
		],
		location: new SourceLocation(229, 5, 64),
	}),
	new Token(SqlTokenType.Comma, ",", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(231, 5, 66),
			}),
		],
		location: new SourceLocation(230, 5, 65),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(232, 5, 67),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(234, 5, 69),
			}),
		],
		location: new SourceLocation(233, 5, 68),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(235, 6, 1),
	}),
];
