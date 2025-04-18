import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { suite, test } from "node:test";
import { fileURLToPath } from "node:url";
import { OracleLexer } from "../../src/oracle/oracle_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

suite("test oracle lexer", () => {
	for (const target of ["select", "create_package"]) {
		test(`test for ${target}`, async () => {
			const script = fs.readFileSync(
				path.join(__dirname, "scripts", `${target}.sql`),
				"utf8",
			);
			const tokens = new OracleLexer().lex(script);

			writeDebugFile(`dump/oracle/lexer/${target}.ts`, toJSScript(tokens));

			const expected = (await import(`./lexer/${target}.ts`)).default;
			assert.equal(toJSString(tokens), toJSString(expected));
		});
	}
});
