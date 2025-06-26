import { SqlParser } from "../parser.ts";
import { MssqlLexer } from "./mssql_lexer.ts";

export class MssqlParser extends SqlParser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new MssqlLexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}
}
