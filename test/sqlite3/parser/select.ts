import { Node, Token, TokenType } from "../../../src/parser"
import { Keyword } from "../../../src/sqlite3/sqlite3_parser"

export const actual = `
SELECT 1
`.trim()
export const expected = new Node("root")
  .add(new Node("select")
    .add(new Token(Keyword.SELECT, "SELECT", 0))
    .add(new Token(TokenType.Number, "1", 7, [
      new Token(TokenType.WhiteSpace, " ", 6)
    ]))
    .add(new Token(TokenType.Eof, "", 8))
  )
