import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import type { Element } from "domhandler";
import { AggregateParseError, DomhandlerCstBuilder } from "../../src/parser.ts";
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
			let node: Element;
			try {
				node = new Sqlite3Parser().parse(script);
			} catch (err) {
				if (target === "unknown" && err instanceof AggregateParseError) {
					node = err.node;
				} else {
					throw err;
				}
			}
			const actual = new DomhandlerCstBuilder({ trivia: false }).toString(node);
			writeDebugFile(`dump/sqlite3/parser/${target}.xml`, actual);

			const expected = fs.readFileSync(
				path.join(__dirname, "parser", `${target}.xml`),
				"utf8",
			);

			assert.strictEqual(actual, expected);
		});
	}
});
