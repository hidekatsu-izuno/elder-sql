import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import { Sqlite3Formatter } from "../../src/sqlite3/sqlite3_formatter.ts";
import { writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

suite("test sqlite3 formatter", () => {
	for (const target of [
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
	]) {
		test(`test for ${target}`, async () => {
			const script = fs.readFileSync(
				path.join(__dirname, "scripts", `${target}.sql`),
				"utf8",
			);

			const formatted = new Sqlite3Formatter().format(script);

			writeDebugFile(`dump/sqlite3/formatter/${target}.sql`, formatted);

			const expected = fs.readFileSync(
				path.join(__dirname, "formatter", `${target}.sql`),
				"utf8",
			);
			assert.equal(formatted, expected);
		});
	}
});
