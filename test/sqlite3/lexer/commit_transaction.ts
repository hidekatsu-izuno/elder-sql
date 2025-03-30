import { SourceLocation, Token } from "../../../src/lexer";
import { SqlKeyword, SqlTokenType } from "../../../src/sql";

export default [
	new Token(SqlTokenType.Reserved, "COMMIT", {
		keyword: SqlKeyword.COMMIT,
		location: new SourceLocation(0, 1, 0),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(7, 1, 7),
			}),
		],
		location: new SourceLocation(6, 1, 6),
	}),
	new Token(SqlTokenType.Reserved, "COMMIT", {
		keyword: SqlKeyword.COMMIT,
		location: new SourceLocation(8, 2, 1),
	}),
	new Token(SqlTokenType.Reserved, "TRANSACTION", {
		keyword: SqlKeyword.TRANSACTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(14, 2, 7),
			}),
		],
		location: new SourceLocation(15, 2, 8),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(27, 2, 20),
			}),
		],
		location: new SourceLocation(26, 2, 19),
	}),
	new Token(SqlTokenType.Identifier, "END", {
		keyword: SqlKeyword.END,
		location: new SourceLocation(28, 3, 1),
	}),
	new Token(SqlTokenType.SemiColon, ";", {
		eos: true,
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(32, 3, 5),
			}),
		],
		location: new SourceLocation(31, 3, 4),
	}),
	new Token(SqlTokenType.Identifier, "END", {
		keyword: SqlKeyword.END,
		location: new SourceLocation(33, 4, 1),
	}),
	new Token(SqlTokenType.Reserved, "TRANSACTION", {
		keyword: SqlKeyword.TRANSACTION,
		preskips: [
			new Token(SqlTokenType.WhiteSpace, " ", {
				location: new SourceLocation(36, 4, 4),
			}),
		],
		postskips: [
			new Token(SqlTokenType.LineBreak, "\n", {
				location: new SourceLocation(48, 4, 16),
			}),
		],
		location: new SourceLocation(37, 4, 5),
	}),
	new Token(SqlTokenType.EoF, "", {
		eos: true,
		location: new SourceLocation(49, 5, 1),
	}),
];
