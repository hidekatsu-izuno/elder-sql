import path from "node:path"
import fs from "node:fs"
import { MysqlLexer } from "../../src/mysql/mysql_lexer"
import { toJSString } from "../utils/debug"

describe("test mysql lexer", () => {
  test.each([
    "version_comment",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = (await import("./lexer/" + target)).default
    const tokens = new MysqlLexer({
      version: "5.7.0"
    }).lex(script)

    if (target === "version_comment") {
      fs.writeFileSync("temp.txt", toJSString(tokens))
    }

    expect(tokens).toStrictEqual(expected)
  })
})
