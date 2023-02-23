import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Identifier, "RELEASE", { keyword: Keyword.RELEASE, location: new SourceLocation(0, 1, 0)}),
    new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(14, 1, 14)})], location: new SourceLocation(13, 1, 13)}),
    new Token(TokenType.Identifier, "RELEASE", { keyword: Keyword.RELEASE, location: new SourceLocation(15, 2, 1)}),
    new Token(TokenType.Identifier, "SAVEPOINT", { keyword: Keyword.SAVEPOINT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(22, 2, 8)})], location: new SourceLocation(23, 2, 9)}),
    new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(32, 2, 18)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(38, 2, 24)})], location: new SourceLocation(33, 2, 19)}),
    new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(39, 3, 1)})
]
