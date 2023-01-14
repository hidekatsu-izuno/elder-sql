import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
  new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(0, 1, 0)}),
  new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(7, 1, 7)}), new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(8, 2, 1)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(11, 2, 4)}), new Token(TokenType.WhiteSpace, "         ", { location: new SourceLocation(12, 2, 5)})], location: new SourceLocation(10, 2, 3)}),
  new Token(TokenType.Operator, "-", { location: new SourceLocation(21, 2, 14)}),
  new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(22, 2, 15)})], postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(24, 2, 17)}), new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(26, 2, 19)}), new Token(TokenType.BlockComment, "/*!80000 + 2 */", { location: new SourceLocation(27, 2, 20)}), new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(42, 2, 35)}), new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(43, 2, 36)})], location: new SourceLocation(23, 2, 16)}),
  new Token(TokenType.Operator, "-", { location: new SourceLocation(46, 2, 39)}),
  new Token(TokenType.Numeric, "3", { location: new SourceLocation(47, 2, 40)}),
  new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(48, 2, 41)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(50, 2, 43)})], location: new SourceLocation(51, 3, 1)}),
  new Token(TokenType.Identifier, "c2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(53, 3, 3)})], location: new SourceLocation(54, 3, 4)}),
  new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(56, 3, 6)})
]