import { SourceLocation, Token, TokenType } from "../../../src/parser"
import { OracleKeyword as Keyword } from "../../../src/oracle/oracle_parser"

export const actual = `
SELECT 1
`.trim()
export const expected = [
  new Token(Keyword.SELECT, "SELECT", [], new SourceLocation(0, 1, 0, undefined)),
  new Token(TokenType.Number, "1", [
   new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(6, 1, 6, undefined))
  ], new SourceLocation(7, 1, 7, undefined)),
  new Token(TokenType.Eof, "", [], new SourceLocation(8, 1, 8, undefined))
 ]