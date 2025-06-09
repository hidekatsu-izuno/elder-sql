import { SourceLocation, Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../../../src/sql.ts";

export default [
	new Token(SqlTokenType.Identifier, "EXPLAIN", {
		keyword: SqlKeywords.EXPLAIN,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(7, 1, 7),
			}),
		],
		location: new SourceLocation(8, 1, 8),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(14, 1, 14),
			}),
		],
		location: new SourceLocation(15, 1, 15),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(16, 1, 16),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(17, 1, 17),
			}),
		],
		location: new SourceLocation(18, 1, 18),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(19, 1, 19),
			}),
		],
		location: new SourceLocation(20, 1, 20),
	}),
	new Token(SqlTokenType.Identifier, "t1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(24, 1, 24),
			}),
		],
		location: new SourceLocation(25, 1, 25),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(27, 1, 27),
			}),
		],
		location: new SourceLocation(28, 1, 28),
	}),
	new Token(SqlTokenType.Identifier, "a", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(33, 1, 33),
			}),
		],
		location: new SourceLocation(34, 1, 34),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(35, 1, 35),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(36, 1, 36),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(38, 1, 38),
			}),
		],
		location: new SourceLocation(37, 1, 37),
	}),
	new Token(SqlTokenType.Identifier, "EXPLAIN", {
		keyword: SqlKeywords.EXPLAIN,
		preskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(39, 2, 1),
			}),
		],
		location: new SourceLocation(40, 3, 1),
	}),
	new Token(SqlTokenType.Identifier, "QUERY", {
		keyword: SqlKeywords.QUERY,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(47, 3, 8),
			}),
		],
		location: new SourceLocation(48, 3, 9),
	}),
	new Token(SqlTokenType.Identifier, "PLAN", {
		keyword: SqlKeywords.PLAN,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(53, 3, 14),
			}),
		],
		location: new SourceLocation(54, 3, 15),
	}),
	new Token(SqlTokenType.Reserved, "SELECT", {
		keyword: SqlKeywords.SELECT,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(58, 3, 19),
			}),
		],
		location: new SourceLocation(59, 3, 20),
	}),
	new Token(SqlTokenType.Identifier, "t1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(65, 3, 26),
			}),
		],
		location: new SourceLocation(66, 3, 27),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(68, 3, 29) }),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(69, 3, 30),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(70, 3, 31),
	}),
	new Token(SqlTokenType.Identifier, "t2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(71, 3, 32),
			}),
		],
		location: new SourceLocation(72, 3, 33),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(74, 3, 35) }),
	new Token(SqlTokenType.Operator, "*", {
		location: new SourceLocation(75, 3, 36),
	}),
	new Token(SqlTokenType.Reserved, "FROM", {
		keyword: SqlKeywords.FROM,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(76, 3, 37),
			}),
		],
		location: new SourceLocation(77, 3, 38),
	}),
	new Token(SqlTokenType.Identifier, "t1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(81, 3, 42),
			}),
		],
		location: new SourceLocation(82, 3, 43),
	}),
	new Token(SqlTokenType.Comma, ",", {
		location: new SourceLocation(84, 3, 45),
	}),
	new Token(SqlTokenType.Identifier, "t2", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(85, 3, 46),
			}),
		],
		location: new SourceLocation(86, 3, 47),
	}),
	new Token(SqlTokenType.Reserved, "WHERE", {
		keyword: SqlKeywords.WHERE,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(88, 3, 49),
			}),
		],
		location: new SourceLocation(89, 3, 50),
	}),
	new Token(SqlTokenType.Identifier, "t1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(94, 3, 55),
			}),
		],
		location: new SourceLocation(95, 3, 56),
	}),
	new Token(SqlTokenType.Dot, ".", { location: new SourceLocation(97, 3, 58) }),
	new Token(SqlTokenType.Identifier, "a", {
		location: new SourceLocation(98, 3, 59),
	}),
	new Token(SqlTokenType.Operator, "=", {
		location: new SourceLocation(99, 3, 60),
	}),
	new Token(SqlTokenType.Numeric, "1", {
		location: new SourceLocation(100, 3, 61),
	}),
	new Token(SqlTokenType.Reserved, "AND", {
		keyword: SqlKeywords.AND,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(101, 3, 62),
			}),
		],
		location: new SourceLocation(102, 3, 63),
	}),
	new Token(SqlTokenType.Identifier, "t1", {
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(105, 3, 66),
			}),
		],
		location: new SourceLocation(106, 3, 67),
	}),
	new Token(SqlTokenType.Dot, ".", {
		location: new SourceLocation(108, 3, 69),
	}),
	new Token(SqlTokenType.Identifier, "b", {
		location: new SourceLocation(109, 3, 70),
	}),
	new Token(SqlTokenType.Operator, ">", {
		location: new SourceLocation(110, 3, 71),
	}),
	new Token(SqlTokenType.Numeric, "2", {
		location: new SourceLocation(111, 3, 72),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		location: new SourceLocation(112, 3, 73),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(113, 3, 74),
	}),
];
