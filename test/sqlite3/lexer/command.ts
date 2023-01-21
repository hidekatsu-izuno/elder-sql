import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Command, ".print", { preskips: [new Token(TokenType.BlockComment, "/*test\n.print test\n*/", { location: new SourceLocation(0, 1, 0)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(21, 3, 3)})], location: new SourceLocation(22, 4, 1)}),
    new Token(TokenType.Identifier, "test", { eos: true, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(28, 4, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(33, 4, 12)})], location: new SourceLocation(29, 4, 8)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(34, 5, 1)}),
    new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 5, 7)})], location: new SourceLocation(41, 5, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(43, 5, 10)})], location: new SourceLocation(42, 5, 9)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(44, 6, 1)}),
    new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(50, 6, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(52, 6, 9)})], location: new SourceLocation(51, 6, 8)}),
    new Token(TokenType.Dot, ".", { location: new SourceLocation(53, 7, 1)}),
    new Token(TokenType.Identifier, "print", { keyword: Keyword.PRINT, location: new SourceLocation(54, 7, 2)}),
    new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(59, 7, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(64, 7, 12)})], location: new SourceLocation(60, 7, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(66, 8, 2)})], location: new SourceLocation(65, 8, 1)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(67, 9, 1)}),
    new Token(TokenType.Numeric, "3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(73, 9, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(75, 9, 9)})], location: new SourceLocation(74, 9, 8)}),
    new Token(TokenType.Delimiter, "/", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(80, 11, 1)})], location: new SourceLocation(76, 10, 1)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(81, 12, 1)}),
    new Token(TokenType.Numeric, "4", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(87, 12, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(89, 12, 9)})], location: new SourceLocation(88, 12, 8)}),
    new Token(TokenType.Delimiter, "GO", { eos: true, postskips: [new Token(TokenType.WhiteSpace, "", { location: new SourceLocation(92, 13, 3)})], location: new SourceLocation(90, 13, 1)}),
    new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(92, 13, 3)})
]
