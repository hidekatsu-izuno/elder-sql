import path from "node:path"
import fs from "node:fs"
import { OracleLexer } from "../../src/oracle/oracle_lexer"
import { toJSScript, toJSString } from "../utils/debug"

describe("test oracle lexer", () => {
  test.each([
    "select",
    "create_package",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target)).default
    const tokens = new OracleLexer().lex(script)

    if (target === "") {
      fs.writeFileSync("temp.txt", toJSScript(tokens))
    }

    expect(toJSString(tokens)).toStrictEqual(toJSString(expected))
  })
})
