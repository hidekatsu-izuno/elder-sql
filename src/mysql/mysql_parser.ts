import type { Element } from "domhandler";
import { ParseError, type Token, TokenReader } from "../lexer.js";
import { AggregateParseError, CstBuilder, Parser } from "../parser.js";
import { SqlKeywords, SqlTokenType } from "../sql.js";
import { dequote } from "../utils.js";
import { MysqlLexer } from "./mysql_lexer.js";

export class OracleParser extends Parser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new MysqlLexer(options), options);
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
			if (r.peekIf(SqlKeywords.QUERY)) {
				b.start("QueryPlanOption");
				b.token(r.consume());
				b.token(r.consume(SqlKeywords.PLAN));
				b.end();
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
					SqlKeywords.DATABASE,
					SqlKeywords.SCHEMA,
					SqlKeywords.EVENT,
					SqlKeywords.FUNCTION,
					SqlKeywords.INDEX,
					SqlKeywords.INSTANCE,
					SqlKeywords.LOGFILE,
					SqlKeywords.PROCEDURE,
					SqlKeywords.SERVER,
					SqlKeywords.SPATIAL,
					SqlKeywords.TABLE,
					SqlKeywords.TABLESPACE,
					SqlKeywords.TRIGGER,
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
			const token = r.consume(SqlTokenType.Command);
			b.value(b.token(token).text);
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
}
