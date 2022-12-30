import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export const actual = `
SELECT 1 FROM DUAL
`.trim()
export const expected = [
  new Token(Keyword.SELECT, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(0, 1, 0) }),
  new Token(TokenType.Number, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6) })], location: new SourceLocation(7, 1, 7) }),
  new Token(Keyword.FROM, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(8, 1, 8) })], location: new SourceLocation(9, 1, 9) }),
  new Token(TokenType.Identifier, "DUAL", { keyword: Keyword.DUAL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(13, 1, 13) })], location: new SourceLocation(14, 1, 14) }),
  new Token(TokenType.Eof, "", { eos: true, location: new SourceLocation(18, 1, 18) })
]