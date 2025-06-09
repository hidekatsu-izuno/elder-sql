import { PostgresLexer } from "./postgres_lexer.ts";
import { SqlParser } from "../parser.ts"

export class PostgresParser extends SqlParser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new PostgresLexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}
}
