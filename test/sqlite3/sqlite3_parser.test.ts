import { Sqlite3Lexer, Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser"
import { toJSString } from "../../src/util"

describe("test sqlite3 lexer", () => {
  test.each([
    "select"
  ])("%s", (target) => {
    const module = require("./lexer/" + target)
    const tokens = new Sqlite3Lexer().lex(module.actual)
    expect(tokens).toStrictEqual(module.expected)
  })
})

describe("test sqlite3 parser", () => {
  test.each([
    "create_table",
    "select",
  ])("%s", (target) => {
    const module = require("./parser/" + target)
    expect(new Sqlite3Parser(module.actual).root()).toStrictEqual(module.expected)
  })
})