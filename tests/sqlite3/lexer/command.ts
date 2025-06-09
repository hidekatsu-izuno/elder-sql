import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Command, ".print", {
		preskips: [
			new Token(SqlTokenType.BlockComment, "/*test\n.print test\n*/", {
				location: new SourceLocation(0, 1, 0),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(21, 3, 3),
			}),
		],
		location: new SourceLocation(22, 4, 1),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		eos: true,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(28, 4, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(33, 4, 12),
			}),
		],
		location: new SourceLocation(29, 4, 8),
	}),
	new Token(SqlTokenType.Reserved, "select", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(34, 5, 1),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(40, 5, 7),
			}),
		],
		location: new SourceLocation(41, 5, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(43, 5, 10),
			}),
		],
		location: new SourceLocation(42, 5, 9),
	}),
	new Token(SqlTokenType.Reserved, "select", {
		keyword: SqlKeywords.SELECT,
		location: new SourceLocation(44, 6, 1),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(50, 6, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(52, 6, 9),
			}),
		],
		location: new SourceLocation(51, 6, 8),
	}),
	new Token(SqlTokenType.Operator, "+", {
		location: new SourceLocation(53, 6, 10),
	}),
	new Token(SqlTokenType.Identifier, "x", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(54, 6, 11),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(56, 6, 13),
			}),
		],
		location: new SourceLocation(55, 6, 12),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(57, 7, 1) }),
	new Token(SqlTokenType.Identifier, "print", {
		keyword: SqlKeywords.PRINT,
		location: new SourceLocation(58, 7, 2),
	}),
	new Token(SqlTokenType.Identifier, "test", {
		keyword: SqlKeywords.TEST,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(63, 7, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(68, 7, 12),
			}),
		],
		location: new SourceLocation(64, 7, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(70, 8, 2),
			}),
		],
		location: new SourceLocation(69, 8, 1),
	}),
	new Token(SqlTokenType.Reserved, "select", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.BlockComment, "/*.print*/", {
				location: new SourceLocation(71, 9, 1),
			}),
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(81, 9, 11),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(84, 9, 14),
			}),
		],
		location: new SourceLocation(85, 10, 1),
	}),
	new Token(SqlTokenType.Numeric, "3", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(91, 10, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(93, 10, 9),
			}),
		],
		location: new SourceLocation(92, 10, 8),
	}),
	new Token(SqlTokenType.Delimiter, "/", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(95, 11, 2),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(97, 11, 4),
			}),
		],
		location: new SourceLocation(94, 11, 1),
	}),
	new Token(SqlTokenType.Reserved, "select", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(98, 12, 1),
			}),
		],
		location: new SourceLocation(99, 13, 1),
	}),
	new Token(SqlTokenType.Numeric, "4", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(105, 13, 7),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(107, 13, 9),
			}),
			new Token(SqlTokenType.BlockComment, "/*.print*/", {
				location: new SourceLocation(108, 13, 10),
			}),
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(118, 13, 20),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(119, 13, 21),
			}),
		],
		location: new SourceLocation(106, 13, 8),
	}),
	new Token(SqlTokenType.Delimiter, "GO", {
		eos: true,
		preskips: [
			new Token(SqlTokenType.LineComment, "-- aaa", {
				location: new SourceLocation(120, 14, 1),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(126, 14, 7),
			}),
			new Token(SqlTokenType.LineComment, "-- bbb", {
				location: new SourceLocation(127, 15, 1),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(133, 15, 7),
			}),
		],
		location: new SourceLocation(134, 16, 1),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(136, 16, 3),
	}),
];
