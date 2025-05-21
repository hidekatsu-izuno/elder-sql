import type { Element } from "domhandler";
import { ParseError, type Token, TokenReader } from "../lexer.ts";
import {
	AggregateParseError,
	type CstBuilder,
	Parser,
} from "../parser.ts";
import { SqlKeywords, SqlTokenType } from "../sql.ts";
import { dequote } from "../utils.ts";
import { MysqlLexer } from "./mysql_lexer.ts";
import { DomhandlerCstBuilder } from "../cst/domhandler_cst_builder.ts"

export class OracleParser<CstNode = Element> extends Parser<CstNode> {
	constructor(options: Record<string, any> = {}) {
		super(
			options.lexer ?? new MysqlLexer(options),
			options.builderFactory ?? (() => new DomhandlerCstBuilder(options)),
			options,
		);
	}

	parseTokens(tokens: Token[], b: CstBuilder<CstNode>) {
		const r = new TokenReader(tokens);
		const errors = [];
		b.start("Script");
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
		const root = b.end();
		if (root !== b.root) {
			throw new Error("The current position is invalid.");
		}

		if (errors.length) {
			throw new AggregateParseError(
				root,
				errors,
				`${errors.length} error found\n${errors.map((e) => e.message).join("\n")}`,
			);
		}
	}

	private explainStatement(b: CstBuilder<CstNode>, r: TokenReader) {
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

	private statement(b: CstBuilder<CstNode>, r: TokenReader) {
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

	private unknown(b: CstBuilder<CstNode>, r: TokenReader, base: CstNode) {
		b.current = base;
		let node: ReturnType<typeof b.end> | undefined;
		if (!r.peek().eos) {
			b.start("Unknown");
			while (!r.peek().eos) {
				b.token(r.consume());
			}
			node = b.end();
		}
		b.current = b.root;
		return node;
	}

	private command(b: CstBuilder<CstNode>, r: TokenReader) {
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
