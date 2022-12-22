import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export const actual = `
SELECT 1+2-3, -1*2/3, +1-2*3
`.trim()
export const expected = new Node("root")
  .add(new Node("select")
    .add(new Token(Keyword.SELECT, "SELECT", [], new SourceLocation(0, 1, 0, undefined)))
    .add(new Token(TokenType.Number, "1", [
      new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(6, 1, 6, undefined))
    ], new SourceLocation(7, 1, 7, undefined)))
    .add(new Token(TokenType.Operator, "+", [], new SourceLocation(8, 1, 8, undefined)))
    .add(new Token(TokenType.Number, "2", [], new SourceLocation(9, 1, 9, undefined)))
    .add(new Token(TokenType.Operator, "-", [], new SourceLocation(10, 1, 10, undefined)))
    .add(new Token(TokenType.Number, "3", [], new SourceLocation(11, 1, 11, undefined)))
    .add(new Token(TokenType.Comma, ",", [], new SourceLocation(12, 1, 12, undefined)))
    .add(new Token(TokenType.Operator, "-", [
      new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(13, 1, 13, undefined))
    ], new SourceLocation(14, 1, 14, undefined)))
    .add(new Token(TokenType.Number, "1", [], new SourceLocation(15, 1, 15, undefined)))
    .add(new Token(TokenType.Operator, "*", [], new SourceLocation(16, 1, 16, undefined)))
    .add(new Token(TokenType.Number, "2", [], new SourceLocation(17, 1, 17, undefined)))
    .add(new Token(TokenType.Operator, "/", [], new SourceLocation(18, 1, 18, undefined)))
    .add(new Token(TokenType.Number, "3", [], new SourceLocation(19, 1, 19, undefined)))
    .add(new Token(TokenType.Comma, ",", [], new SourceLocation(20, 1, 20, undefined)))
    .add(new Token(TokenType.Operator, "+", [
      new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(21, 1, 21, undefined))
    ], new SourceLocation(22, 1, 22, undefined)))
    .add(new Token(TokenType.Number, "1", [], new SourceLocation(23, 1, 23, undefined)))
    .add(new Token(TokenType.Operator, "-", [], new SourceLocation(24, 1, 24, undefined)))
    .add(new Token(TokenType.Number, "2", [], new SourceLocation(25, 1, 25, undefined)))
    .add(new Token(TokenType.Operator, "*", [], new SourceLocation(26, 1, 26, undefined)))
    .add(new Token(TokenType.Number, "3", [], new SourceLocation(27, 1, 27, undefined)))
    .add(new Token(TokenType.Eof, "", [], new SourceLocation(28, 1, 28, undefined)))
  )