import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { PostgresLexer } from "../../src/postgres/postgres_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("test postgres lexer", () => {
	test("test by file", { concurrency: true }, async (t) => {
		const targets = [
			"create_function",
			"create_procedure",
			"create_table",
			"select",
		];
		for (const target of targets) {
			await t.test(`${target}`, async () => {
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
});
