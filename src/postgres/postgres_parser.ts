import type { Element } from "domhandler";
import { ParseError, type Token, TokenReader } from "../lexer.js";
import { AggregateParseError, CstBuilder, Parser } from "../parser.js";
import { SqlKeywords, SqlTokenType } from "../sql.js";
import { dequote } from "../utils.js";
import { PostgresLexer } from "./postgres_lexer.js";

export class PostgresParser extends Parser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new PostgresLexer(options), options);
	}

	parseTokens(tokens: Token[]) {
		const r = new TokenReader(tokens);
		const b = new CstBuilder("Script");
		const errors = [];
		while (r.peek()) {
			try {
				if (
					r.peekIf([
						SqlTokenType.SemiColon,
						SqlTokenType.Delimiter,
						SqlTokenType.EoF,
					])
				) {
					b.token(r.consume());
				} else if (r.peekIf(SqlTokenType.Command)) {
					this.command(b, r);
				} else if (r.peekIf(SqlKeywords.EXPLAIN)) {
					this.explainStatement(b, r);
				} else {
					this.statement(b, r);
				}
			} catch (err) {
				if (err instanceof ParseError) {
					this.unknown(b, r, b.root);
					errors.push(err);
				} else {
					throw err;
				}
			}
		}

		if (errors.length) {
			throw new AggregateParseError(
				b.root,
				errors,
				`${errors.length} error found\n${errors.map((e) => e.message).join("\n")}`,
			);
		}

		return b.root;
	}

	private explainStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ExplainStatement");
		try {
			b.token(r.consume(SqlKeywords.EXPLAIN));
			if (r.peekIf(SqlTokenType.LeftParen)) {
				b.start("ExplainOptionList");
				b.token(r.consume());
				do {
					if (r.peekIf(SqlKeywords.ANALYZE)) {
						b.start("AnalyzeOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.VERBOSE)) {
						b.start("VerboseOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.COSTS)) {
						b.start("CostsOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.SETTINGS)) {
						b.start("SettingsOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.BUFFERS)) {
						b.start("BuffersOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.WAL)) {
						b.start("WalOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.TIMING)) {
						b.start("TimingOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.SUMMARY)) {
						b.start("SummaryOption");
						b.token(r.consume());
						if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
							this.booleanLiteral(b, r);
						}
						b.end();
					} else if (r.peekIf(SqlKeywords.FORMAT)) {
						b.start("FormatOption");
						b.token(r.consume());
						if (
							r.peekIf([
								SqlKeywords.TEXT,
								SqlKeywords.XML,
								SqlKeywords.JSON,
								SqlKeywords.YAML,
							])
						) {
							this.identifier(b, r, "FormatType");
						} else {
							throw r.createParseError();
						}
						b.end();
					} else {
						throw r.createParseError();
					}
					if (r.peekIf(SqlTokenType.RightParen)) {
						break;
					}
				} while (!r.peek().eos);
				b.token(r.consume(SqlTokenType.RightParen));
				b.end();
			} else {
				if (r.peekIf(SqlKeywords.ANALYZE)) {
					b.start("AnalyzeOption");
					b.token(r.consume());
					b.end();
				}
				if (r.peekIf(SqlKeywords.VERBOSE)) {
					b.start("VerboseOption");
					b.token(r.consume());
					b.end();
				}
			}
			this.statement(b, r);
			b.end();
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end();
	}

	private statement(b: CstBuilder, r: TokenReader) {
		let stmt: unknown;
		if (r.peekIf(SqlKeywords.CREATE)) {
			const mark = r.pos;
			r.consume();
			while (
				!r.peek().eos &&
				!r.peekIf([
					SqlKeywords.ACCESS,
					SqlKeywords.AGGREGATE,
					SqlKeywords.CAST,
					SqlKeywords.COLLATION,
					SqlKeywords.CONVERSION,
					SqlKeywords.DATABASE,
					SqlKeywords.DEFAULT,
					SqlKeywords.DOMAIN,
					SqlKeywords.EVENT,
					SqlKeywords.EXTENSION,
					SqlKeywords.FOREIGN,
					SqlKeywords.FUNCTION,
					SqlKeywords.GROUP,
					SqlKeywords.INDEX,
					SqlKeywords.LANGUAGE,
					SqlKeywords.LARGE,
					SqlKeywords.MATERIALIZED,
					SqlKeywords.OPERATOR,
					SqlKeywords.POLICY,
					SqlKeywords.PROCEDURE,
					SqlKeywords.PUBLICATION,
					SqlKeywords.ROLE,
					SqlKeywords.ROUTINE,
					SqlKeywords.RULE,
					SqlKeywords.SCHEMA,
					SqlKeywords.SEQUENCE,
					SqlKeywords.SERVER,
					SqlKeywords.STATISTICS,
					SqlKeywords.SUBSCRIPTION,
					SqlKeywords.SYSTEM,
					SqlKeywords.TABLE,
					SqlKeywords.TABLESPACE,
					SqlKeywords.TEXT,
					SqlKeywords.TRANSFORM,
					SqlKeywords.TRIGGER,
					SqlKeywords.TYPE,
					SqlKeywords.USER,
					SqlKeywords.VIEW,
				])
			) {
				r.consume();
			}
		} else if (r.peekIf(SqlKeywords.ALTER)) {
			const mark = r.pos;
			r.consume();
		} else if (r.peekIf(SqlKeywords.DROP)) {
			const mark = r.pos;
			r.consume();
		} else {
			//TODO
		}

		if (!stmt) {
			throw r.createParseError();
		}
		return stmt;
	}

	private unknown(b: CstBuilder, r: TokenReader, base: Element) {
		while (b.current !== b.root && b.current !== base) {
			b.end();
		}
		let node: ReturnType<typeof b.end> | undefined;
		if (!r.peek().eos) {
			b.start("Unknown");
			while (!r.peek().eos) {
				b.token(r.consume());
			}
			node = b.end();
		}
		if (base.parent) {
			while (b.current !== b.root && b.current !== base.parent) {
				b.end();
			}
		}
		return node;
	}

	private command(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CommandStatement");
		try {
			b.start("CommandName");
			b.value(b.token(r.consume(SqlTokenType.Command)).text);
			b.end();
			if (!r.peek(-1).eos) {
				b.start("CommandArgumentList");
				do {
					b.start("CommandArgument");
					b.value(dequote(b.token(r.consume()).text));
					b.end();
				} while (!r.peek(-1).eos);
				b.end();
			}
			b.end();
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end();
	}

	private identifier(b: CstBuilder, r: TokenReader, name: string) {
		b.start(name);
		if (r.peekIf(SqlTokenType.Identifier)) {
			b.value(dequote(b.token(r.consume()).text));
		} else {
			throw r.createParseError();
		}
		return b.end();
	}

	private booleanLiteral(b: CstBuilder, r: TokenReader) {
		b.start("BooleanLiteral");
		if (r.peekIf([SqlKeywords.TRUE, SqlKeywords.FALSE])) {
			const token = r.consume();
			b.value(b.token(token).text.toUpperCase());
		} else {
			throw r.createParseError();
		}
		return b.end();
	}
}
