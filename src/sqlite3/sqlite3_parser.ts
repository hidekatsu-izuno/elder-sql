import { SqlParser } from "../parser.ts";
import { Sqlite3Lexer } from "./sqlite3_lexer.ts";

export class Sqlite3Parser extends SqlParser {
	compileOptions: Set<string>;

	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new Sqlite3Lexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}
}
