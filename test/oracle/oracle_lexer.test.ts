import fs from "node:fs"
import { OracleLexer } from "../../src/oracle/oracle_lexer"
import { toJSString } from "../../src/util"

describe("test oracle lexer", () => {
  test.each([
    "select",
    "create_package",
  ])("%s", (target) => {
    const module = require("./lexer/" + target)
    const tokens = new OracleLexer().lex(module.actual)

    if (target === "") {
      fs.writeFileSync("temp.txt", toJSString(tokens))
    }

    expect(tokens).toStrictEqual(module.expected)
  })
})