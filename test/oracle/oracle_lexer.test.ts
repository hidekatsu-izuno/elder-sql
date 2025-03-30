import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { OracleLexer } from "../../src/oracle/oracle_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

describe("test oracle lexer", () => {
	test.each(["select", "create_package"])("%s", async (target) => {
		const script = fs.readFileSync(
			path.join(__dirname, "scripts", `${target}.sql`),
			"utf8",
		);
		const tokens = new OracleLexer().lex(script);

		writeDebugFile(`test/dump/oracle/lexer/${target}.ts`, toJSScript(tokens));

		const expected = (await import(`./lexer/${target}.ts`)).default;
		expect(toJSString(tokens)).toStrictEqual(toJSString(expected));
	});
});
