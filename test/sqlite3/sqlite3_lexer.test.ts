import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { Sqlite3Lexer } from "../../src/sqlite3/sqlite3_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("test sqlite3 lexer", () => {
	test("test by file", { concurrency: true }, async (t) => {
		const targets = [
			"alter_table",
			"analyze",
			"attach_database",
			"begin_transaction",
			"command",
			"commit_transaction",
			"create_index",
			"create_table",
			"create_trigger",
			"create_view",
			"delete",
			"detach_database",
			"drop_index",
			"drop_table",
			"drop_trigger",
			"drop_view",
			"explain",
			"insert",
			"pragma",
			"reindex",
			"release_savepoint",
			"rollback_transaction",
			"savepoint",
			"select",
			"update",
			"vacuum",
			"unknown",
		];
		for (const target of targets) {
			await t.test(`${target}`, async () => {
				const script = fs.readFileSync(
					path.join(__dirname, "scripts", `${target}.sql`),
					"utf8",
				);
				const tokens = new Sqlite3Lexer().lex(script);

				writeDebugFile(`dump/sqlite3/lexer/${target}.ts`, toJSScript(tokens));

				const expected = (await import(`./lexer/${target}.ts`)).default;
				assert.strictEqual(toJSString(tokens), toJSString(expected));
			});
		}
	});
});
