import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { MysqlLexer } from "../../src/mysql/mysql_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("test mysql lexer", () => {
	test("test by file", { concurrency: true }, async (t) => {
		const targets = ["version_comment"];
		for (const target of targets) {
			await t.test(`${target}`, async () => {
				const script = fs.readFileSync(
					path.join(__dirname, "scripts", `${target}.sql`),
					"utf8",
				);
				const tokens = new MysqlLexer({
					version: "5.7.0",
				}).lex(script);

				writeDebugFile(`dump/mysql/lexer/${target}.ts`, toJSScript(tokens));

				const expected = (await import(`./lexer/${target}.ts`)).default;
				assert.strictEqual(toJSString(tokens), toJSString(expected));
			});
		}
	});
});
