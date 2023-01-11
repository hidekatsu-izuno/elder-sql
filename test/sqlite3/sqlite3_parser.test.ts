import fs from "node:fs"
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser"
import { toJSString } from "../utils/debug"

describe("test sqlite3 parser", () => {
  test.each([
    "select",
    "create_table",
  ])("%s", (target) => {
    const module = require("./parser/" + target)
    const node = new Sqlite3Parser().parse(module.actual)

    if (target === "create_table") {
      fs.writeFileSync("temp.txt", toJSString(node))
    }

    expect(node).toStrictEqual(module.expected)
  })
})