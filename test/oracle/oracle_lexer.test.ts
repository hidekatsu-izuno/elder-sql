import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { OracleLexer } from "../../src/oracle/oracle_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("test oracle lexer", () => {
	test("test by file", { concurrency: true }, async t => {
		const targets = [
			"select", 
			"create_package",
		];
		for (const target of targets) {
			await t.test(`${target}`, async () => {
				const script = fs.readFileSync(
					path.join(__dirname, "scripts", `${target}.sql`),
					"utf8",
				);
				const tokens = new OracleLexer().lex(script);
		
				writeDebugFile(`dump/oracle/lexer/${target}.ts`, toJSScript(tokens));
		
				const expected = (await import(`./lexer/${target}.ts`)).default;
				assert.strictEqual(toJSString(tokens), toJSString(expected));
			});
		}
	});
});
