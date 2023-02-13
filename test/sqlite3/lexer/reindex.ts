import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Identifier, "REINDEX", { keyword: Keyword.REINDEX, location: new SourceLocation(0, 1, 0)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(8, 1, 8)})], location: new SourceLocation(7, 1, 7)}),
    new Token(TokenType.Identifier, "REINDEX", { keyword: Keyword.REINDEX, location: new SourceLocation(9, 2, 1)}),
    new Token(TokenType.Identifier, "test_collation", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(16, 2, 8)})], location: new SourceLocation(17, 2, 9)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(32, 2, 24)})], location: new SourceLocation(31, 2, 23)}),
    new Token(TokenType.Identifier, "REINDEX", { keyword: Keyword.REINDEX, location: new SourceLocation(33, 3, 1)}),
    new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 3, 8)})], location: new SourceLocation(41, 3, 9)}),
    new Token(TokenType.Dot, ".", { location: new SourceLocation(45, 3, 13)}),
    new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(52, 3, 20)})], location: new SourceLocation(46, 3, 14)}),
    new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(53, 4, 1)})
]
