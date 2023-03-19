import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { MysqlLexer } from "../../src/mysql/mysql_lexer.js"
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.js"

describe("test mysql lexer", () => {
  test.each([
    "version_comment",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target + ".js")).default
    const tokens = new MysqlLexer({
      version: "5.7.0"
    }).lex(script)

    writeDebugFile(`test/dump/mysql/lexer/${target}.js.txt`, toJSScript(tokens))

    expect(toJSString(tokens)).toStrictEqual(toJSString(expected))
  })
})
