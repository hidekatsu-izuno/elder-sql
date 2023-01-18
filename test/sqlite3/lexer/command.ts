import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Command, ".print", { preskips: [new Token(TokenType.BlockComment, "/*test\n.print test\n*/", { location: new SourceLocation(0, 1, 0)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(21, 3, 3)})], location: new SourceLocation(22, 4, 1)}),
    new Token(TokenType.Identifier, "test\n", { eos: true, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(23, 4, 1)})], location: new SourceLocation(28, 4, 2)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(34, 5, 1)}),
    new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 5, 7)})], location: new SourceLocation(41, 5, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(43, 5, 10)})], location: new SourceLocation(42, 5, 9)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(44, 6, 1)}),
    new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(50, 6, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(55, 6, 12)})], location: new SourceLocation(51, 6, 8)}),
    new Token(TokenType.Dot, ".", { location: new SourceLocation(56, 7, 1)}),
    new Token(TokenType.Identifier, "print", { keyword: Keyword.PRINT, location: new SourceLocation(57, 7, 2)}),
    new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(62, 7, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(67, 7, 12)})], location: new SourceLocation(63, 7, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(68, 8, 1)}),
    new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(69, 8, 2)})
]
