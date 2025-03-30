import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeyword, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeyword.DELETE,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
		],
		location: new SourceLocation(7, 1, 7),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeyword.SAMPLE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(11, 1, 11),
			}),
		],
		location: new SourceLocation(12, 1, 12),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(19, 1, 19),
			}),
		],
		location: new SourceLocation(18, 1, 18),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeyword.DELETE,
		location: new SourceLocation(20, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(26, 2, 7),
			}),
		],
		location: new SourceLocation(27, 2, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(31, 2, 12),
			}),
		],
		location: new SourceLocation(32, 2, 13),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(36, 2, 17) }),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeyword.SAMPLE,
		location: new SourceLocation(37, 2, 18),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(44, 2, 25),
			}),
		],
		location: new SourceLocation(43, 2, 24),
	}),
	new Token(SqlTokenType.Identifier, "WITH", {
		keyword: SqlKeyword.WITH,
		location: new SourceLocation(45, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(49, 3, 5),
			}),
		],
		location: new SourceLocation(50, 3, 6),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(51, 3, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(54, 3, 10),
			}),
		],
		location: new SourceLocation(52, 3, 8),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(55, 3, 11),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeyword.SELECT,
		location: new SourceLocation(56, 3, 12),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(62, 3, 18),
			}),
		],
		location: new SourceLocation(63, 3, 19),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeyword.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(64, 3, 20),
			}),
		],
		location: new SourceLocation(65, 3, 21),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(67, 3, 23),
			}),
		],
		location: new SourceLocation(68, 3, 24),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(69, 3, 25),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeyword.DELETE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(70, 3, 26),
			}),
		],
		location: new SourceLocation(71, 3, 27),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(77, 3, 33),
			}),
		],
		location: new SourceLocation(78, 3, 34),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(82, 3, 38),
			}),
		],
		location: new SourceLocation(83, 3, 39),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(87, 3, 43) }),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeyword.SAMPLE,
		location: new SourceLocation(88, 3, 44),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(94, 3, 50),
			}),
		],
		location: new SourceLocation(95, 3, 51),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(100, 3, 56),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(102, 3, 58),
			}),
		],
		location: new SourceLocation(101, 3, 57),
	}),
	new Token(SqlTokenType.Operator, "=", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(104, 3, 60),
			}),
		],
		location: new SourceLocation(103, 3, 59),
	}),
	new Token(SqlTokenType.LeftParen, "(", {
		location: new SourceLocation(105, 3, 61),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeyword.SELECT,
		location: new SourceLocation(106, 3, 62),
	}),
	new Token(SqlTokenType.Identifier, "Y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(112, 3, 68),
			}),
		],
		location: new SourceLocation(113, 3, 69),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(114, 3, 70),
			}),
		],
		location: new SourceLocation(115, 3, 71),
	}),
	new Token(SqlTokenType.Identifier, "X", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(119, 3, 75),
			}),
		],
		location: new SourceLocation(120, 3, 76),
	}),
	new Token(SqlTokenType.RightParen, ")", {
		location: new SourceLocation(121, 3, 77),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(123, 3, 79),
			}),
		],
		location: new SourceLocation(122, 3, 78),
	}),
	new Token(SqlTokenType.Reserved, "DELETE", {
		keyword: SqlKeyword.DELETE,
		location: new SourceLocation(124, 4, 1),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeyword.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(130, 4, 7),
			}),
		],
		location: new SourceLocation(131, 4, 8),
	}),
	new Token(SqlTokenType.Identifier, "main", {
		keyword: SqlKeyword.MAIN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(135, 4, 12),
			}),
		],
		location: new SourceLocation(136, 4, 13),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(140, 4, 17),
	}),
	new Token(SqlTokenType.Identifier, "sample", {
		keyword: SqlKeyword.SAMPLE,
		location: new SourceLocation(141, 4, 18),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeyword.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(147, 4, 24),
			}),
		],
		location: new SourceLocation(148, 4, 25),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(153, 4, 30),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(155, 4, 32),
			}),
		],
		location: new SourceLocation(154, 4, 31),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(156, 4, 33),
	}),
	new Token(SqlTokenType.Numeric, "3", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(157, 4, 34),
			}),
		],
		location: new SourceLocation(158, 4, 35),
	}),
	new Token(SqlTokenType.Reserved, "AND", {
		keyword: SqlKeyword.AND,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(159, 4, 36),
			}),
		],
		location: new SourceLocation(160, 4, 37),
	}),
	new Token(SqlTokenType.Identifier, "y", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(163, 4, 40),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(165, 4, 42),
			}),
		],
		location: new SourceLocation(164, 4, 41),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(166, 4, 43),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(167, 4, 44),
			}),
		],
		location: new SourceLocation(168, 4, 45),
	}),
	new Token(SqlTokenType.Reserved, "RETURNING", {
		keyword: SqlKeyword.RETURNING,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(169, 4, 46),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(179, 4, 56),
			}),
		],
		location: new SourceLocation(170, 4, 47),
	}),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(180, 4, 57),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(181, 4, 58),
	}),
];
