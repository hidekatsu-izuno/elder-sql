import fs from "node:fs"
import { Sqlite3Lexer, Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser"
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

describe("test sqlite3 parser", () => {
  test.each([
    "create_table",
    "select",
  ])("%s", (target) => {
    const module = require("./parser/" + target)
    const node = Sqlite3Parser.parse(module.actual)

    if (target === "") {
      fs.writeFileSync("temp.txt", toJSString(node))
    }

    expect(node).toStrictEqual(module.expected)
  })
})