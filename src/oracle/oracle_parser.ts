import type { CstNode } from "elder-parse";
import type { Token } from "elder-parse";
import { ParseError, TokenReader } from "elder-parse";
import type { CstBuilder } from "elder-parse";
import { AggregateParseError, Parser } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../sql.ts";
import { dequote } from "../utils.ts";
import { OracleLexer } from "./oracle_lexer.ts";

export class OracleParser extends Parser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new OracleLexer(options), options);
	}

	parseTokens(tokens: Token[], b: CstBuilder) {
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

		return root;
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
					SqlKeywords.ANALYTIC,
					SqlKeywords.ATTRIBUTE,
					SqlKeywords.AUDIT,
					SqlKeywords.CLUSTER,
					SqlKeywords.CONTEXT,
					SqlKeywords.CONTROLFILE,
					SqlKeywords.DATABASE,
					SqlKeywords.DIMENSION,
					SqlKeywords.DIRECTORY,
					SqlKeywords.DISKGROUP,
					SqlKeywords.EDITION,
					SqlKeywords.FLASHBACK,
					SqlKeywords.FUNCTION,
					SqlKeywords.HIERARCHY,
					SqlKeywords.INDEX,
					SqlKeywords.INDEXTYPE,
					SqlKeywords.INMEMORY,
					SqlKeywords.JAVA,
					SqlKeywords.LIBRARY,
					SqlKeywords.LOCKDOWN,
					SqlKeywords.MATERIALIZED,
					SqlKeywords.OPERATOR,
					SqlKeywords.OUTLINE,
					SqlKeywords.PACKAGE,
					SqlKeywords.PFILE,
					SqlKeywords.PLUGGABLE,
					SqlKeywords.PROCEDURE,
					SqlKeywords.PROFILE,
					SqlKeywords.RESTORE,
					SqlKeywords.ROLE,
					SqlKeywords.ROLLBACK,
					SqlKeywords.SCHEMA,
					SqlKeywords.SEQUENCE,
					SqlKeywords.SPFILE,
					SqlKeywords.SYNONYM,
					SqlKeywords.TABLE,
					SqlKeywords.TABLESPACE,
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

	private unknown(b: CstBuilder, r: TokenReader, base: CstNode) {
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
}
