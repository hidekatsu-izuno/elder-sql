import fs from "node:fs"
import { Sqlite3Lexer } from "../../src/sqlite3/sqlite3_lexer"
import { toJSString } from "../../src/util"

describe("test sqlite3 lexer", () => {
  test.each([
    "select"
  ])("%s", (target) => {
    const module = require("./lexer/" + target)
    const tokens = new Sqlite3Lexer().lex(module.actual)

    if (target === "") {
      fs.writeFileSync("temp.txt", toJSString(tokens))
    }

    expect(tokens).toStrictEqual(module.expected)
  })
})
