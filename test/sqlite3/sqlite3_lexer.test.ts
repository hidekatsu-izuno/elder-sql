import path from "node:path"
import fs from "node:fs"
import { Sqlite3Lexer } from "../../src/sqlite3/sqlite3_lexer"
import { toJSString } from "../utils/debug"

describe("test sqlite3 lexer", () => {
  test.each([
    "create_table",
    "pragma",
    "select",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target)).default
    const tokens = new Sqlite3Lexer().lex(script)

    if (target === "pragma") {
      fs.writeFileSync("temp.txt", toJSString(tokens))
    }

    expect(tokens).toStrictEqual(expected)
  })
})
