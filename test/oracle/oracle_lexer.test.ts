import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { OracleLexer } from "../../src/oracle/oracle_lexer.js"
import { toJSScript, toJSString, writeDebugFile } from "../utils/debug.js"

describe("test oracle lexer", () => {
  test.each([
    "select",
    "create_package",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target + ".js")).default
    const tokens = new OracleLexer().lex(script)

    writeDebugFile(`test/dump/oracle/lexer/${target}.js.txt`, toJSScript(tokens))

    expect(toJSString(tokens)).toStrictEqual(toJSString(expected))
  })
})
