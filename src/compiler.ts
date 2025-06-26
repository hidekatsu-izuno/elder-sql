import type { Lexer, Token } from "elder-parse";
import { TokenReader, TokenType } from "elder-parse";
import { MssqlLexer } from "./mssql/mssql_lexer.ts";
import { MysqlLexer } from "./mysql/mysql_lexer.ts";
import { OracleLexer } from "./oracle/oracle_lexer.ts";
import { PostgresLexer } from "./postgres/postgres_lexer.ts";
import { SqlKeywords, SqlTokenType } from "./sql.ts";
import { Sqlite3Lexer } from "./sqlite3/sqlite3_lexer.ts";
import { isJSExpression, isJSIdentifier } from "./utils.ts";

export type ElderSqlCompilerOptions = {
	dialect: "sqlite3" | "mysql" | "postgres" | "oracle" | "mssql";
	lexer?: Record<string, any>;
};

const ElderSqlTokenType = {
	Import: new TokenType("Import"),
	Define: new TokenType("Define"),
	If: new TokenType("If"),
	Elif: new TokenType("Elif"),
	Else: new TokenType("Else"),
	For: new TokenType("For"),
	End: new TokenType("End"),
	TypeHint: new TokenType("TypeHint"),
	BindVariable: new TokenType("BindVariable"),
	ReplacementVariable: new TokenType("ReplacementVariable"),
	Comment: new TokenType("Comment"),
};

export class ElderSqlCompiler {
	options: ElderSqlCompilerOptions;
	private lexer: Lexer;

	constructor(options: ElderSqlCompilerOptions) {
		this.options = options;
		if (options.dialect === "sqlite3") {
			this.lexer = new Sqlite3Lexer(options.lexer);
		} else if (options.dialect === "mysql") {
			this.lexer = new MysqlLexer(options.lexer);
		} else if (options.dialect === "postgres") {
			this.lexer = new PostgresLexer(options.lexer);
		} else if (options.dialect === "oracle") {
			this.lexer = new OracleLexer(options.lexer);
		} else if (options.dialect === "mssql") {
			this.lexer = new MssqlLexer(options.lexer);
		} else {
			throw new TypeError(`Unknown dialect: ${options.dialect}`);
		}
	}

	compile(input: string, source?: string) {
		let text = "";

		const tokens = this.lexer.lex(input.replace(/^--\*/gm, "   "), source);
		const segment: Token[] = [];
		for (const token of tokens) {
			for (let i = 0; i < token.preskips.length; i++) {
				const skipToken = token.preskips[i];
				const elderSqlType = this.getElderSqlType(skipToken);
				if (elderSqlType) {
					skipToken.type = elderSqlType;
					if (i > 0) {
						skipToken.preskips = token.preskips.splice(0, i);
					}
					token.preskips.splice(0, 1);
					segment.push(skipToken);
					i = 0;
				}
			}
			segment.push(token);
			if (token.is(SqlTokenType.Delimiter) || token.is(SqlTokenType.EoF)) {
				text += this.compileSegment(segment);
				segment.length = 0;
			}
		}

		return new ElderSqlCompileResult(text, {});
	}

	private compileSegment(segment: Token[]) {
		let text = "";

		const tr = new TokenReader(segment);
		while (tr.peekIf(ElderSqlTokenType.Import)) {
			const importToken = tr.peek();
			const m = /^\/\*#import[ \t](.*?)\*\/$/su.exec(importToken.text);
			if (!m) {
				throw tr.createParseError();
			}

			tr.consume();
			if (tr.peek()?.preskips[0]?.is(SqlTokenType.LineBreak)) {
				tr.peek().preskips.shift();
			}

			text += `import ${m[1]};/\n`;
		}
		if (tr.peekIf(ElderSqlTokenType.Define)) {
			const defineToken = tr.peek();
			const m = /^\/\*#define[ \t]([^\r\n]*)\r?\n(.*?)\*\/$/su.exec(
				defineToken.text,
			);
			if (!m) {
				throw tr.createParseError();
			}
			const ident = m[1].trim();
			if (!isJSIdentifier(ident)) {
				throw tr.createParseError();
			}

			tr.consume();
			if (tr.peek()?.preskips[0]?.is(SqlTokenType.LineBreak)) {
				tr.peek().preskips.shift();
			}

			text += `/**\n${m[2]}*/\n`;
			text += `export function ${m[1]}(engine, params) {\n`;
			text += `  let text = "";\n`;
			text += `  const args = [];\n`;
			text += `  const ctx0 = { ...params };\n`;
			const blocks = [];
			let buffer = "";
			while (tr.peek()) {
				if (tr.peekIf(ElderSqlTokenType.If)) {
					const token = tr.peek();
					const m = /^\/\*#if[ \t](.*)\*\/$/s.exec(token.text);
					if (!m) {
						throw tr.createParseError();
					}
					const expr = m[1].trim();
					if (!isJSExpression(expr)) {
						throw tr.createParseError();
					}

					tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}

					text += `  ${"  ".repeat(blocks.length)}if (sandbox(${expr})) {\n`;
					blocks.push(ElderSqlTokenType.If);
				} else if (tr.peekIf(ElderSqlTokenType.Elif)) {
					const token = tr.peek();
					if (
						blocks[blocks.length - 1] !== ElderSqlTokenType.If &&
						blocks[blocks.length - 1] !== ElderSqlTokenType.Elif
					) {
						throw tr.createParseError();
					}
					const m = /^\/\*#elif[ \t](.*?)\*\/$/s.exec(token.text);
					if (!m) {
						throw tr.createParseError();
					}
					const expr = m[1].trim();
					if (!isJSExpression(expr)) {
						throw tr.createParseError();
					}

					tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}

					blocks.pop();
					text += `  ${"  ".repeat(blocks.length)}} else if (${expr}) {\n`;
					blocks.push(ElderSqlTokenType.Elif);
				} else if (tr.peekIf(ElderSqlTokenType.Else)) {
					if (
						blocks[blocks.length - 1] !== ElderSqlTokenType.If &&
						blocks[blocks.length - 1] !== ElderSqlTokenType.Elif
					) {
						throw tr.createParseError();
					}

					const token = tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}

					blocks.pop();
					text += `  ${"  ".repeat(blocks.length)}} else {\n`;
					blocks.push(ElderSqlTokenType.Else);
				} else if (tr.peekIf(ElderSqlTokenType.For)) {
					const token = tr.peek();
					const m = /^\/\*#for[ \t\r\n]([^:]+):(.*)\*\/$/s.exec(token.text);
					if (!m) {
						throw tr.createParseError();
					}
					const parts = m[1].split(",");
					const ident = parts[0].trim();
					const index = parts[1]?.trim();
					const expr = m[2].trim();
					if (
						!isJSIdentifier(ident) ||
						!(index == null || isJSIdentifier(index))
					) {
						throw tr.createParseError();
					}
					if (!isJSExpression(expr)) {
						throw tr.createParseError();
					}

					tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}

					text += `  ${"  ".repeat(blocks.length)}(${expr}).forEach((${index ? `${ident}, ${index}` : ident}) => {\n`;
					blocks.push(ElderSqlTokenType.For);
					const depth = blocks.reduce(
						(n, t) => (t === ElderSqlTokenType.For ? n + 1 : n),
						0,
					);
					text += `  ${"  ".repeat(blocks.length)}const ctx${depth} = {...ctx${depth - 1}, ${index ? `${ident}, ${index}` : ident}};\n`;
				} else if (tr.peekIf(ElderSqlTokenType.End)) {
					const token = tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}

					if (
						blocks[blocks.length - 1] === ElderSqlTokenType.If ||
						blocks[blocks.length - 1] === ElderSqlTokenType.Elif ||
						blocks[blocks.length - 1] === ElderSqlTokenType.Else
					) {
						blocks.pop();
						text += `  ${"  ".repeat(blocks.length)}}\n`;
					} else if (blocks[blocks.length - 1] === ElderSqlTokenType.For) {
						blocks.pop();
						text += `  ${"  ".repeat(blocks.length)}})\n`;
					} else {
						throw tr.createParseError();
					}
				} else if (tr.peekIf(ElderSqlTokenType.BindVariable)) {
					const token = tr.peek();
					const m = /^\/\*#\{(.*)\}\*\/$/s.exec(token.text);
					if (!m) {
						throw tr.createParseError();
					}

					const isInOperator = tr.peek(-1)?.is(SqlKeywords.IN);

					const expr = m[1].trim();
					tr.consume();
					if (tr.peek()?.preskips.length === 0) {
						if (tr.peekIf(SqlTokenType.LeftParen)) {
							tr.consume();
							let depth = 0;
							while (
								tr.peek() &&
								!tr.peekIf(SqlTokenType.Delimiter) &&
								!tr.peekIf(SqlTokenType.EoF)
							) {
								if (tr.peekIf(SqlTokenType.LeftParen)) {
									tr.consume();
									depth++;
								} else if (tr.peekIf(SqlTokenType.RightParen)) {
									tr.consume();
									if (depth === 0) {
										break;
									}
									depth--;
								} else {
									tr.consume();
								}
							}
						} else if (
							tr.peekIf(
								(token) =>
									token.is(SqlTokenType.Operator) && token.is(["+", "-"]),
								SqlTokenType.Numeric,
							)
						) {
							tr.consume();
							tr.consume();
						} else if (
							tr.peekIf(SqlTokenType.String) ||
							tr.peekIf(SqlTokenType.Numeric) ||
							tr.peekIf(SqlKeywords.TRUE) ||
							tr.peekIf(SqlKeywords.FALSE) ||
							tr.peekIf(SqlKeywords.NULL)
						) {
							tr.consume();
						}
					}

					const depth = blocks.reduce(
						(n, t) => (t === ElderSqlTokenType.For ? n + 1 : n),
						0,
					);
					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length > 0) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}
					if (isInOperator) {
						text += `  ${"  ".repeat(blocks.length)}text += "(";\n`;
						text += `  ${"  ".repeat(blocks.length)}args.push((new Function("ctx", ${JSON.stringify(`with (ctx) return (${expr})`)}))(ctx${depth}));\n`;
						text += `  ${"  ".repeat(blocks.length)}text += ",?".repeat(Array.isArray(args[args.length - 1]) ? args[args.length - 1].length : 1).substring(1);\n`;
						text += `  ${"  ".repeat(blocks.length)}text += ")";\n`;
					} else {
						text += `  ${"  ".repeat(blocks.length)}args.push((new Function("ctx", ${JSON.stringify(`with (ctx) return (${expr})`)}))(ctx${depth}));\n`;
						text += `  ${"  ".repeat(blocks.length)}text += "?";\n`;
					}
				} else if (tr.peekIf(ElderSqlTokenType.ReplacementVariable)) {
					const token = tr.peek();
					const m = /^\/\*\$\{(.*)\}\*\/$/s.exec(token.text);
					if (!m) {
						throw tr.createParseError();
					}
					const repl = m[1].trim();

					tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}
					const depth = blocks.reduce(
						(n, t) => (t === ElderSqlTokenType.For ? n + 1 : n),
						0,
					);
					text += `  ${"  ".repeat(blocks.length)}text += (new Function("ctx", ${JSON.stringify(`with (ctx) return (${repl})`)}))(ctx${depth});\n`;
				} else {
					const token = tr.consume();
					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					buffer += token.text;
				}
			}
			if (blocks.length) {
				throw tr.createParseError();
			}
			if (buffer.length) {
				text += `  text += ${JSON.stringify(buffer)};\n`;
			}
			text += `  return engine.execute(text, args);\n`;
			text += `}\n`;
			text += `\n`;
		}

		return text;
	}

	private getElderSqlType(token: Token) {
		if (token.is(SqlTokenType.BlockComment)) {
			if (/^\/\*#import[ \t\r\n]/s.test(token.text)) {
				return ElderSqlTokenType.Define;
			} else if (/^\/\*#define[ \t]/s.test(token.text)) {
				return ElderSqlTokenType.Define;
			} else if (/^\/\*#if[ \t\r\n]/s.test(token.text)) {
				return ElderSqlTokenType.If;
			} else if (/^\/\*#elif[ \t\r\n]/s.test(token.text)) {
				return ElderSqlTokenType.Elif;
			} else if (/^\/\*#else([ \t\r\n]|\*\/$)/s.test(token.text)) {
				return ElderSqlTokenType.Else;
			} else if (/^\/\*#for[ \t\r\n]/s.test(token.text)) {
				return ElderSqlTokenType.For;
			} else if (/^\/\*#end([ \t\r\n]|\*\/$)/s.test(token.text)) {
				return ElderSqlTokenType.End;
			} else if (/^\/\*:/s.test(token.text)) {
				return ElderSqlTokenType.TypeHint;
			} else if (/^\/\*#\{.*\}\*\/$/s.test(token.text)) {
				return ElderSqlTokenType.BindVariable;
			} else if (/^\/\*\$\{.*\}\*\/$/s.test(token.text)) {
				return ElderSqlTokenType.ReplacementVariable;
			}
		} else if (token.is(SqlTokenType.LineComment)) {
			if (token.text.startsWith("--#")) {
				return ElderSqlTokenType.Comment;
			}
		}
		return undefined;
	}
}

export class ElderSqlCompileResult {
	js: string;
	map: object;

	constructor(js: string, map: object) {
		this.js = js;
		this.map = map;
	}
}

export class ElderSqlError extends Error {
	constructor(err: Error) {
		super(err.message);

		this.name = "ElderSqlError";
	}
}
