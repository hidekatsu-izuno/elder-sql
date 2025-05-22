import assert from "node:assert/strict";
import fs, { readFileSync } from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import {
	AggregateParseError,
	CstBuilder,
	type CstNode,
} from "../../src/parser.ts";
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
				actual = new Sqlite3Parser().parse(script);
			} catch (err) {
				if (target === "unknown" && err instanceof AggregateParseError) {
					actual = err.node;
				} else {
					throw err;
				}
			}
			const actualXml = CstBuilder.toXMLString(actual, { trivia: false });
			writeDebugFile(
				`dump/sqlite3/parser/${target}.xml`,
				actualXml,
			);

			const actualJson = CstBuilder.toJSONString(actual, { trivia: false });
			writeDebugFile(
				`dump/sqlite3/parser/${target}.json`,
				CstBuilder.toJSONString(actual, { trivia: false }),
			);

			const expectedXml = fs.readFileSync(
				path.join(__dirname, "parser", `${target}.xml`),
				"utf8",
			);
			const expectedJson = fs.readFileSync(
				path.join(__dirname, "parser", `${target}.json`),
				"utf8",
			);

			assert.equal(actualXml, expectedXml);
			assert.equal(actualJson, expectedJson);
		});
	}

	test("perforance test", () => {
		let time1 = Date.now();
		CstBuilder.parseJSON(
			readFileSync(`dump/sqlite3/parser/select.json`, { encoding: "utf8" }),
		);
		time1 = Date.now() - time1;

		let time2 = Date.now();
		cheerio.load(
			readFileSync(`dump/sqlite3/parser/select.xml`, { encoding: "utf8" }),
			{ xml: true },
		);
		time2 = Date.now() - time2;

		assert.equal(time1, time2);
	});
});
