import { SqlParser } from "../parser.ts";
import { MysqlLexer } from "./mysql_lexer.ts";

export class MysqlParser extends SqlParser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new MysqlLexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}
}
