import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { ElderSqlCompiler } from "../../src/compiler.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("test compiler", () => {
	test("test by file", { concurrency: true }, async t => {
		const targets = [
			"select",
		];
		for (const target of targets) {
			await t.test(`${target}`, async () => {
				const script = fs.readFileSync(
					path.join(__dirname, "scripts", `${target}.sql`),
					"utf8",
				);
				const expected = fs.readFileSync(
					path.join(__dirname, "expected", `${target}.ts.txt`),
					"utf8",
				);
				const result = new ElderSqlCompiler({
					dialect: "sqlite3",
				}).compile(script);
		
				if (target === "select") {
					// fs.writeFileSync("temp.txt", result.js);
				}
				assert.strictEqual(result.js, expected);		
			});
		}
	});
});
