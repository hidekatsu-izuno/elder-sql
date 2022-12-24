import fs from "node:fs"
import { TokenType } from "../../src/lexer"
import { OracleLexer } from "../../src/oracle/oracle_lexer"
import { TokenReader } from "../../src/parser"
import { toJSString } from "../../src/util"

describe("test oracle lexer", () => {
  test.each([
    "select",
    "create_package",
  ])("%s", (target) => {
    const module = require("./lexer/" + target)
    const tokens = new OracleLexer().lex(module.actual)

    if (target === "create_package") {
      fs.writeFileSync("temp.txt", toJSString(tokens))
    }

    expect(tokens).toStrictEqual(module.expected)
  })
})
