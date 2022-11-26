import fs from "node:fs"
import { OracleLexer, OracleParser } from "../../src/oracle/oracle_parser"
import { toJSString } from "../../src/util"

describe("test oracle lexer", () => {
  test.each([
    "select",
    "create_package",
  ])("%s", (target) => {
    const module = require("./lexer/" + target)
    const tokens = new OracleLexer().lex(module.actual)

    if (target === "") {
      fs.writeFileSync("node.txt", toJSString(tokens))
    }

    expect(tokens).toStrictEqual(module.expected)
  })
})
