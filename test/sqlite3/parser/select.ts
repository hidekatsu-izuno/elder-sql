import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export const actual = `
SELECT 1
`.trim()
export const expected = new Node("root")
  .add(new Node("select")
    .add(new Token(Keyword.SELECT, "SELECT", [], new SourceLocation(0, 1, 0, undefined)))
    .add(new Token(TokenType.Number, "1", [
      new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(6, 1, 6, undefined))
    ], new SourceLocation(7, 1, 7, undefined)))
    .add(new Token(TokenType.Eof, "", [], new SourceLocation(8, 1, 8, undefined)))
  )