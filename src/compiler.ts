import type { Lexer, Token } from "elder-parse";
import { TokenReader, TokenType } from "elder-parse";
import { MssqlLexer } from "./mssql/mssql_lexer.ts";
import { MysqlLexer } from "./mysql/mysql_lexer.ts";
import { OracleLexer } from "./oracle/oracle_lexer.ts";
import { PostgresLexer } from "./postgres/postgres_lexer.ts";
import { SqlLexer } from "./sql.ts";
import { Sqlite3Lexer } from "./sqlite3/sqlite3_lexer.ts";
import { isJSExpression, isJSIdentifier } from "./utils.ts";

export type ElderSqlCompilerOptions = {
	dialect: "sqlite3" | "mysql" | "postgres" | "oracle" | "mssql";
	lexer?: Record<string, any>;
};

const ElderSqlLexer = {
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
			if (token.is(SqlLexer.Delimiter) || token.is(SqlLexer.EoF)) {
				text += this.compileSegment(segment);
				segment.length = 0;
			}
		}

		return new ElderSqlCompileResult(text, {});
	}

	private compileSegment(segment: Token[]) {
		let text = "";

		const tr = new TokenReader(segment);
		while (tr.peekIf(ElderSqlLexer.Import)) {
			const importToken = tr.peek();
			const m = /^\/\*#import[ \t](.*?)\*\/$/su.exec(importToken.text);
			if (!m) {
				throw tr.createParseError();
			}

			tr.consume();
			if (tr.peek()?.preskips[0]?.is(SqlLexer.LineBreak)) {
				tr.peek().preskips.shift();
			}

			text += `import ${m[1]};/\n`;
		}
		if (tr.peekIf(ElderSqlLexer.Define)) {
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
			if (tr.peek()?.preskips[0]?.is(SqlLexer.LineBreak)) {
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
				if (tr.peekIf(ElderSqlLexer.If)) {
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
					blocks.push(ElderSqlLexer.If);
				} else if (tr.peekIf(ElderSqlLexer.Elif)) {
					const token = tr.peek();
					if (
						blocks[blocks.length - 1] !== ElderSqlLexer.If &&
						blocks[blocks.length - 1] !== ElderSqlLexer.Elif
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
					blocks.push(ElderSqlLexer.Elif);
				} else if (tr.peekIf(ElderSqlLexer.Else)) {
					if (
						blocks[blocks.length - 1] !== ElderSqlLexer.If &&
						blocks[blocks.length - 1] !== ElderSqlLexer.Elif
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
					blocks.push(ElderSqlLexer.Else);
				} else if (tr.peekIf(ElderSqlLexer.For)) {
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
					blocks.push(ElderSqlLexer.For);
					const depth = blocks.reduce(
						(n, t) => (t === ElderSqlLexer.For ? n + 1 : n),
						0,
					);
					text += `  ${"  ".repeat(blocks.length)}const ctx${depth} = {...ctx${depth - 1}, ${index ? `${ident}, ${index}` : ident}};\n`;
				} else if (tr.peekIf(ElderSqlLexer.End)) {
					const token = tr.consume();

					for (const skip of token.preskips) {
						buffer += skip.text;
					}
					if (buffer.length) {
						text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`;
						buffer = "";
					}

					if (
						blocks[blocks.length - 1] === ElderSqlLexer.If ||
						blocks[blocks.length - 1] === ElderSqlLexer.Elif ||
						blocks[blocks.length - 1] === ElderSqlLexer.Else
					) {
						blocks.pop();
						text += `  ${"  ".repeat(blocks.length)}}\n`;
					} else if (blocks[blocks.length - 1] === ElderSqlLexer.For) {
						blocks.pop();
						text += `  ${"  ".repeat(blocks.length)}})\n`;
					} else {
						throw tr.createParseError();
					}
				} else if (tr.peekIf(ElderSqlLexer.BindVariable)) {
					const token = tr.peek();
					const m = /^\/\*#\{(.*)\}\*\/$/s.exec(token.text);
					if (!m) {
						throw tr.createParseError();
					}

					const isInOperator = tr.peek(-1)?.is(SqlLexer.IN);

					const expr = m[1].trim();
					tr.consume();
					if (tr.peek()?.preskips.length === 0) {
						if (tr.peekIf(SqlLexer.LeftParen)) {
							tr.consume();
							let depth = 0;
							while (
								tr.peek() &&
								!tr.peekIf(SqlLexer.Delimiter) &&
								!tr.peekIf(SqlLexer.EoF)
							) {
								if (tr.peekIf(SqlLexer.LeftParen)) {
									tr.consume();
									depth++;
								} else if (tr.peekIf(SqlLexer.RightParen)) {
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
								(token) => token.is(SqlLexer.Operator) && token.is(["+", "-"]),
								SqlLexer.Numeric,
							)
						) {
							tr.consume();
							tr.consume();
						} else if (
							tr.peekIf(SqlLexer.String) ||
							tr.peekIf(SqlLexer.Numeric) ||
							tr.peekIf(SqlLexer.TRUE) ||
							tr.peekIf(SqlLexer.FALSE) ||
							tr.peekIf(SqlLexer.NULL)
						) {
							tr.consume();
						}
					}

					const depth = blocks.reduce(
						(n, t) => (t === ElderSqlLexer.For ? n + 1 : n),
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
				} else if (tr.peekIf(ElderSqlLexer.ReplacementVariable)) {
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
						(n, t) => (t === ElderSqlLexer.For ? n + 1 : n),
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
		if (token.is(SqlLexer.BlockComment)) {
			if (/^\/\*#import[ \t\r\n]/s.test(token.text)) {
				return ElderSqlLexer.Define;
			} else if (/^\/\*#define[ \t]/s.test(token.text)) {
				return ElderSqlLexer.Define;
			} else if (/^\/\*#if[ \t\r\n]/s.test(token.text)) {
				return ElderSqlLexer.If;
			} else if (/^\/\*#elif[ \t\r\n]/s.test(token.text)) {
				return ElderSqlLexer.Elif;
			} else if (/^\/\*#else([ \t\r\n]|\*\/$)/s.test(token.text)) {
				return ElderSqlLexer.Else;
			} else if (/^\/\*#for[ \t\r\n]/s.test(token.text)) {
				return ElderSqlLexer.For;
			} else if (/^\/\*#end([ \t\r\n]|\*\/$)/s.test(token.text)) {
				return ElderSqlLexer.End;
			} else if (/^\/\*:/s.test(token.text)) {
				return ElderSqlLexer.TypeHint;
			} else if (/^\/\*#\{.*\}\*\/$/s.test(token.text)) {
				return ElderSqlLexer.BindVariable;
			} else if (/^\/\*\$\{.*\}\*\/$/s.test(token.text)) {
				return ElderSqlLexer.ReplacementVariable;
			}
		} else if (token.is(SqlLexer.LineComment)) {
			if (token.text.startsWith("--#")) {
				return ElderSqlLexer.Comment;
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
