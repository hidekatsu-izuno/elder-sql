import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Identifier, "DETACH", { keyword: Keyword.DETACH, location: new SourceLocation(0, 1, 0)}),
    new Token(TokenType.Identifier, "DATABASE", { keyword: Keyword.DATABASE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}),
    new Token(TokenType.Identifier, "mem_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(15, 1, 15)})], location: new SourceLocation(16, 1, 16)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(23, 1, 23)})], location: new SourceLocation(22, 1, 22)}),
    new Token(TokenType.Identifier, "DETACH", { keyword: Keyword.DETACH, location: new SourceLocation(24, 2, 1)}),
    new Token(TokenType.Identifier, "new_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(30, 2, 7)})], location: new SourceLocation(31, 2, 8)}),
    new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(37, 2, 14)})
]
