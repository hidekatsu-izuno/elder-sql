import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { MysqlLexer } from "../../src/mysql/mysql_lexer.ts";
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.ts";

describe("test mysql lexer", () => {
	test.each(["version_comment"])("%s", async (target) => {
		const script = fs.readFileSync(
			path.join(__dirname, "scripts", `${target}.sql`),
			"utf8",
		);
		const tokens = new MysqlLexer({
			version: "5.7.0",
		}).lex(script);

		writeDebugFile(
			`test/dump/mysql/lexer/${target}.ts`,
			toJSScript(tokens),
		);

		const expected = (await import(`./lexer/${target}.ts`)).default;
		expect(toJSString(tokens)).toStrictEqual(toJSString(expected));
	});
});
