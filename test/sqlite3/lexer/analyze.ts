import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Identifier, "analyze", { keyword: Keyword.ANALYZE, location: new SourceLocation(0, 1, 0)}),
    new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(13, 1, 13)})], location: new SourceLocation(12, 1, 12)}),
    new Token(TokenType.Identifier, "ANALYZE", { keyword: Keyword.ANALYZE, location: new SourceLocation(14, 2, 1)}),
    new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(21, 2, 8)})], location: new SourceLocation(22, 2, 9)}),
    new Token(TokenType.Dot, ".", { location: new SourceLocation(26, 2, 13)}),
    new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(31, 2, 18)})], location: new SourceLocation(27, 2, 14)}),
    new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(32, 3, 1)})
]
