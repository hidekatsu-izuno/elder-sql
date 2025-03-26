import fs from "node:fs";
import path from "node:path";
import type { Element } from "domhandler";
import { describe, expect, test } from "vitest";
import { AggregateParseError } from "../../src/parser.js";
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser.js";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.js";

describe("test sqlite3 parser", () => {
	test.each([
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
	])("%s", async (target) => {
		const script = fs.readFileSync(
			path.join(__dirname, "scripts", `${target}.sql`),
			"utf8",
		);
		const expected = (await import(`./parser/${target}.ts`)).default;
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

		writeDebugFile(
			`test/dump/sqlite3/parser/${target}.ts`,
			toJSScript(node),
		);

		expect(toJSString(node)).toStrictEqual(toJSString(expected));
	});
});
