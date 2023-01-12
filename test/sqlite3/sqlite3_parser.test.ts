import path from "node:path"
import fs from "node:fs"
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser"
import { toJSString } from "../utils/debug"

describe("test sqlite3 parser", () => {
  test.each([
    "create_table",
    "pragma",
    "select",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./parser/" + target)).default
    const node = new Sqlite3Parser().parse(script)

    if (target === "pragma") {
      fs.writeFileSync("temp.txt", toJSString(node))
    }

    expect(node).toStrictEqual(expected)
  })
})