import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser.js"
import { toJSScript, toJSString } from "../utils/debug.js"

describe("test sqlite3 parser", () => {
  test.each([
    "command",
    "create_table",
    "explain",
    "pragma",
    "select",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./parser/" + target + ".js")).default
    const node = new Sqlite3Parser().parse(script)

    if (target === "command") {
      fs.writeFileSync("sample.txt", toJSScript(node))
    }

    expect(toJSString(node)).toStrictEqual(toJSString(expected))
  })
})