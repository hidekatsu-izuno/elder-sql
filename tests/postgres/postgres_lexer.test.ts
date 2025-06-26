import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import { PostgresLexer } from "../../src/postgres/postgres_lexer.ts";
import { toJSScript, writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

suite("test postgres lexer", () => {
	for (const target of [
		"create_function",
		"create_procedure",
		"create_table",
		"select",
	]) {
		test(`test for ${target}`, async () => {
			const script = fs.readFileSync(
				path.join(__dirname, "scripts", `${target}.sql`),
				"utf8",
			);
			const tokens = new PostgresLexer().lex(script);

			writeDebugFile(`dump/postgres/lexer/${target}.ts`, toJSScript(tokens));

			const expected = (await import(`./lexer/${target}.ts`)).default;
			assert.deepEqual(tokens, expected);
		});
	}
});
