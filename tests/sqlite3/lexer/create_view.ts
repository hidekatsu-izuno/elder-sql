import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeywords.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "v_sample", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(11, 1, 11),
			}),
		],
		location: new SourceLocation(12, 1, 12),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(20, 1, 20),
			}),
		],
		location: new SourceLocation(21, 1, 21),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(23, 1, 23),
			}),
		],
		location: new SourceLocation(24, 1, 24),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(30, 1, 30),
			}),
		],
		location: new SourceLocation(31, 1, 31),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(33, 1, 33),
			}),
		],
		location: new SourceLocation(32, 1, 32),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(34, 2, 1),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeywords.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(40, 2, 7),
			}),
		],
		location: new SourceLocation(41, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeywords.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(45, 2, 12),
			}),
		],
		location: new SourceLocation(46, 2, 13),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(48, 2, 15),
			}),
		],
		location: new SourceLocation(49, 2, 16),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeywords.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(52, 2, 19),
			}),
		],
		location: new SourceLocation(53, 2, 20),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(59, 2, 26),
			}),
		],
		location: new SourceLocation(60, 2, 27),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(64, 2, 31) }),
	new Token(SqlTokenType.Identifier, "v_sample", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(73, 2, 40),
			}),
		],
		location: new SourceLocation(65, 2, 32),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(74, 2, 41),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		location: new SourceLocation(75, 2, 42),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(76, 2, 43),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(77, 2, 44),
			}),
		],
		location: new SourceLocation(78, 2, 45),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(80, 2, 47),
			}),
		],
		location: new SourceLocation(81, 2, 48),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(87, 2, 54),
			}),
		],
		location: new SourceLocation(88, 2, 55),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(90, 2, 57),
			}),
		],
		location: new SourceLocation(89, 2, 56),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(91, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "TEMP", {
		keyword: SqlKeywords.TEMP,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(97, 3, 7),
			}),
		],
		location: new SourceLocation(98, 3, 8),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeywords.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(102, 3, 12),
			}),
		],
		location: new SourceLocation(103, 3, 13),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(107, 3, 17),
			}),
		],
		location: new SourceLocation(108, 3, 18),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(112, 3, 22),
	}),
	new Token(SqlTokenType.Identifier, "v_sample", {
		location: new SourceLocation(113, 3, 23),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(121, 3, 31),
			}),
		],
		location: new SourceLocation(122, 3, 32),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(124, 3, 34),
			}),
		],
		location: new SourceLocation(125, 3, 35),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(131, 3, 41),
			}),
		],
		location: new SourceLocation(132, 3, 42),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(134, 3, 44),
			}),
		],
		location: new SourceLocation(133, 3, 43),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(135, 4, 1),
	}),
	new Token(SqlTokenType.Reserved, "TEMPORARY", {
		keyword: SqlKeywords.TEMPORARY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(141, 4, 7),
			}),
		],
		location: new SourceLocation(142, 4, 8),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeywords.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(151, 4, 17),
			}),
		],
		location: new SourceLocation(152, 4, 18),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(156, 4, 22),
			}),
		],
		location: new SourceLocation(157, 4, 23),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(161, 4, 27),
	}),
	new Token(SqlTokenType.Identifier, "v_sample", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(170, 4, 36),
			}),
		],
		location: new SourceLocation(162, 4, 28),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(171, 4, 37),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(172, 4, 38),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(173, 4, 39),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(174, 4, 40),
			}),
		],
		location: new SourceLocation(175, 4, 41),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(176, 4, 42),
	}),
	new Token(SqlTokenType.Identifier, "c", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(177, 4, 43),
			}),
		],
		location: new SourceLocation(178, 4, 44),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(179, 4, 45),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(180, 4, 46),
			}),
		],
		location: new SourceLocation(181, 4, 47),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(183, 4, 49),
			}),
		],
		location: new SourceLocation(184, 4, 50),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(190, 4, 56),
			}),
		],
		location: new SourceLocation(191, 4, 57),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(192, 4, 58),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(193, 4, 59),
			}),
		],
		location: new SourceLocation(194, 4, 60),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(195, 4, 61),
	}),
	new Token(SqlTokenType.Numeric, "3", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(196, 4, 62),
			}),
		],
		location: new SourceLocation(197, 4, 63),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(199, 4, 65),
			}),
		],
		location: new SourceLocation(198, 4, 64),
	}),
	new Token(SqlTokenType.Reserved, "CREATE", {
		keyword: SqlKeywords.CREATE,
		location: new SourceLocation(200, 5, 1),
	}),
	new Token(SqlTokenType.Reserved, "TEMPORARY", {
		keyword: SqlKeywords.TEMPORARY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(206, 5, 7),
			}),
		],
		location: new SourceLocation(207, 5, 8),
	}),
	new Token(SqlTokenType.Identifier, "VIEW", {
		keyword: SqlKeywords.VIEW,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(216, 5, 17),
			}),
		],
		location: new SourceLocation(217, 5, 18),
	}),
	new Token(SqlTokenType.Identifier, "IF", {
		keyword: SqlKeywords.IF,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(221, 5, 22),
			}),
		],
		location: new SourceLocation(222, 5, 23),
	}),
	new Token(SqlTokenType.Reserved, "NOT", {
		keyword: SqlKeywords.NOT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(224, 5, 25),
			}),
		],
		location: new SourceLocation(225, 5, 26),
	}),
	new Token(SqlTokenType.Reserved, "EXISTS", {
		keyword: SqlKeywords.EXISTS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(228, 5, 29),
			}),
		],
		location: new SourceLocation(229, 5, 30),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeywords.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(235, 5, 36),
			}),
		],
		location: new SourceLocation(236, 5, 37),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(240, 5, 41),
	}),
	new Token(SqlTokenType.Identifier, "v_sample", {
		location: new SourceLocation(241, 5, 42),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(249, 5, 50),
			}),
		],
		location: new SourceLocation(250, 5, 51),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(252, 5, 53),
			}),
		],
		location: new SourceLocation(253, 5, 54),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(259, 5, 60),
			}),
		],
		location: new SourceLocation(260, 5, 61),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(262, 5, 63),
			}),
		],
		location: new SourceLocation(261, 5, 62),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(263, 6, 1),
	}),
];
