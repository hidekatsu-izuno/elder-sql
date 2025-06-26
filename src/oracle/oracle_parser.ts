import { SqlParser } from "../parser.ts";
import { OracleLexer } from "./oracle_lexer.ts";

export class OracleParser extends SqlParser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new OracleLexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}
}
