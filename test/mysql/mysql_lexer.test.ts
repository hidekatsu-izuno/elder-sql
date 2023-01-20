import path from "node:path"
import fs from "node:fs"
import { MysqlLexer } from "../../src/mysql/mysql_lexer.js"
import { toJSScript, toJSString } from "../utils/debug.js"

describe("test mysql lexer", () => {
  test.each([
    "version_comment",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target)).default
    const tokens = new MysqlLexer({
      version: "5.7.0"
    }).lex(script)

    if (target === "") {
      fs.writeFileSync("temp.txt", toJSScript(tokens))
    }

    expect(toJSString(tokens)).toStrictEqual(toJSString(expected))
  })
})
