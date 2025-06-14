import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		postskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(6, 1, 6),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(7, 1, 7),
			}),
		],
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(8, 2, 1),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(11, 2, 4),
			}),
		],
		location: new SourceLocation(10, 2, 3),
	}),
	new Token(SqlTokenType.Operator, "+", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(12, 3, 1),
			}),
			new Token(SqlTokenType.WhiteSpace, "         ", {
				location: new SourceLocation(14, 3, 3),
			}),
		],
		location: new SourceLocation(23, 3, 12),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(24, 3, 13),
			}),
		],
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(26, 3, 15),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(29, 3, 18),
			}),
		],
		location: new SourceLocation(25, 3, 14),
	}),
	new Token(SqlTokenType.Operator, "+", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(30, 4, 1),
			}),
			new Token(SqlTokenType.BlockComment, "/*!80000 - 1 */", {
				location: new SourceLocation(32, 4, 3),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(47, 4, 18),
			}),
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(48, 5, 1),
			}),
			new Token(SqlTokenType.WhiteSpace, "    ", {
				location: new SourceLocation(50, 5, 3),
			}),
		],
		location: new SourceLocation(54, 5, 7),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		postskips: [
			new Token(SqlTokenType.WhiteSpace, "   ", {
				location: new SourceLocation(56, 5, 9),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(59, 5, 12),
			}),
		],
		location: new SourceLocation(55, 5, 8),
	}),
	new Token(SqlTokenType.Reserved, "AS", {
		keyword: SqlKeywords.AS,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(60, 6, 1),
			}),
			new Token(SqlTokenType.BlockComment, "/*!32302 - 2*/", {
				location: new SourceLocation(62, 6, 3),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(76, 6, 17),
			}),
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(77, 7, 1),
			}),
			new Token(SqlTokenType.BlockComment, "/*!80000-3 */", {
				location: new SourceLocation(79, 7, 3),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(92, 7, 16),
			}),
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(93, 8, 1),
			}),
			new Token(SqlTokenType.BlockComment, "/*!- 4 */", {
				location: new SourceLocation(95, 8, 3),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(104, 8, 12),
			}),
			new Token(SqlTokenType.WhiteSpace, "  ", {
				location: new SourceLocation(105, 9, 1),
			}),
			new Token(SqlTokenType.BlockComment, "/*! -5*/", {
				location: new SourceLocation(107, 9, 3),
			}),
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(115, 9, 11),
			}),
		],
		location: new SourceLocation(116, 10, 1),
	}),
	new Token(SqlTokenType.Identifier, "c2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(118, 10, 3),
			}),
		],
		location: new SourceLocation(119, 10, 4),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(121, 10, 6),
	}),
];
