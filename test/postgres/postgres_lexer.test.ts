import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { PostgresLexer } from "../../src/postgres/postgres_lexer.js"
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.js"

describe("test postgres lexer", () => {
  test.each([
    "create_function",
    "create_procedure",
    "create_table",
    "select",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target + ".js")).default
    const tokens = new PostgresLexer().lex(script)

    writeDebugFile(`test/dump/postgres/lexer/${target}.js.txt`, toJSScript(tokens))

    expect(toJSString(tokens)).toStrictEqual(toJSString(expected))
  })
})
