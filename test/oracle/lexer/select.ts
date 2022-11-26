import { Token, TokenType } from "../../../src/parser"
import { Keyword } from "../../../src/oracle/oracle_parser"

export const actual = `
SELECT 1
`.trim()
export const expected = [
  new Token(Keyword.SELECT, "SELECT", 0,),
  new Token(TokenType.Number, "1", 7, [
    new Token(TokenType.WhiteSpace, " ", 6)
  ]),
  new Token(TokenType.Eof, "", 8),
]