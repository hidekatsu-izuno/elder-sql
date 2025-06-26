import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import type { CstNode } from "elder-parse";
import { AggregateParseError } from "elder-parse";
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser.ts";
import { writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

suite("test sqlite3 parser", () => {
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
		test(`test for ${target}`, () => {
			const script = fs.readFileSync(
				path.join(__dirname, "scripts", `${target}.sql`),
				"utf8",
			);
			let actual: CstNode;
			try {
				actual = new Sqlite3Parser({ trivia: false }).parse(script);
			} catch (err) {
				if (target === "unknown" && err instanceof AggregateParseError) {
					actual = err.node;
				} else {
					throw err;
				}
			}

			const actualJson = actual.toJSONString();
			writeDebugFile(`dump/sqlite3/parser/${target}.json`, actualJson);
			const expectedJson = fs.readFileSync(
				path.join(__dirname, "parser", `${target}.json`),
				"utf8",
			);
			assert.equal(actualJson, expectedJson);
		});
	}
});
