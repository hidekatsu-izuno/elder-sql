import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export const actual = `
SELECT 1
`.trim()
export const expected = [
  new Token(Keyword.SELECT, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(0, 1, 0) }),
  new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6) })], location: new SourceLocation(7, 1, 7) }),
  new Token(TokenType.Eof, "", { eos: true, location: new SourceLocation(8, 1, 8) })
]