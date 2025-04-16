import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import { ElderSqlCompiler } from "../../src/compiler.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

suite("test compiler", () => {
	for (const target of ["select"]) {
		test(`test for ${target}`, async () => {
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
