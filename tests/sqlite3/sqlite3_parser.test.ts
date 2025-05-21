import assert from "node:assert/strict";
import fs, { readFileSync } from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import type { Element } from "domhandler";
import { AggregateParseError } from "../../src/parser.ts";
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser.ts";
import { writeDebugFile } from "../utils/debug.ts";
import { DomhandlerCstBuilder } from "../../src/cst/domhandler_cst_builder.ts";
import { JsonCstBuilder, type Element as Element2 } from "../../src/cst/json_cst_builder.ts";
import * as cheerio from 'cheerio';

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

			let node2: Element2;
			try {
				node2 = new Sqlite3Parser<Element2>({
					builderFactory() {
						return new JsonCstBuilder();
					}
				}).parse(script);
			} catch (err) {
				if (target === "unknown" && err instanceof AggregateParseError) {
					node2 = err.node;
				} else {
					throw err;
				}
			}
			const actual2 = new JsonCstBuilder({ trivia: false }).toString(node2);
			writeDebugFile(`dump/sqlite3/parser/${target}.json`, actual2);

			const expected = fs.readFileSync(
				path.join(__dirname, "parser", `${target}.xml`),
				"utf8",
			);

			assert.equal(actual, expected);
		});
	}

	test("perforance test", () => {
		let time1 = Date.now();
		JSON.parse(readFileSync(`dump/sqlite3/parser/select.json`, { encoding: "utf8" }));
		time1 = Date.now() - time1;

		let time2 = Date.now();
		cheerio.load(readFileSync(`dump/sqlite3/parser/select.xml`, { encoding: "utf8" }), { xml: true });
		time2 = Date.now() - time2;

		assert.equal(time1, time2);
	});
});
