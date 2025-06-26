import type { ParserOptions } from "elder-parse";
import { SqlParser } from "../parser.ts";
import { PostgresLexer } from "./postgres_lexer.ts";

export class PostgresParser extends SqlParser {
	constructor(options: ParserOptions = {}) {
		super(options.lexer ?? new PostgresLexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}
}
