import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
  new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(0, 1, 0)}),
  new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(8, 2, 1)})], postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(12, 3, 1)}), new Token(TokenType.WhiteSpace, "         ", { location: new SourceLocation(14, 3, 3)})], location: new SourceLocation(10, 2, 3)}),
  new Token(TokenType.Operator, "+", { location: new SourceLocation(23, 3, 12)}),
  new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(24, 3, 13)})], postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(48, 5, 1)}), new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(50, 5, 3)})], location: new SourceLocation(25, 3, 14)}),
  new Token(TokenType.Operator, "+", { location: new SourceLocation(54, 5, 7)}),
  new Token(TokenType.Numeric, "2", { postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(105, 9, 1)}), new Token(TokenType.BlockComment, "/*! -5*/", { location: new SourceLocation(107, 9, 3)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(115, 9, 11)})], location: new SourceLocation(55, 5, 8)}),
  new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, location: new SourceLocation(116, 10, 1)}),
  new Token(TokenType.Identifier, "c2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(118, 10, 3)})], location: new SourceLocation(119, 10, 4)}),
  new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(121, 10, 6)})
]