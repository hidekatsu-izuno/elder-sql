import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Reserved, "COMMIT", { keyword: Keyword.COMMIT, location: new SourceLocation(0, 1, 0)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(6, 1, 6)}),
    new Token(TokenType.Reserved, "COMMIT", { keyword: Keyword.COMMIT, location: new SourceLocation(8, 2, 1)}),
    new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(14, 2, 7)})], location: new SourceLocation(15, 2, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(27, 2, 20)})], location: new SourceLocation(26, 2, 19)}),
    new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(28, 3, 1)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(32, 3, 5)})], location: new SourceLocation(31, 3, 4)}),
    new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(33, 4, 1)}),
    new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(36, 4, 4)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(48, 4, 16)})], location: new SourceLocation(37, 4, 5)}),
    new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(49, 5, 1)})
]
