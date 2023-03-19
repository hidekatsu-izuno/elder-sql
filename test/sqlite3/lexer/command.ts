import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"

export default [
    new Token(TokenType.Command, ".print", { preskips: [new Token(TokenType.BlockComment, "/*test\n.print test\n*/", { location: new SourceLocation(0, 1, 0)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(21, 3, 3)})], location: new SourceLocation(22, 4, 1)}),
    new Token(TokenType.Identifier, "test", { eos: true, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(28, 4, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(33, 4, 12)})], location: new SourceLocation(29, 4, 8)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(34, 5, 1)}),
    new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 5, 7)})], location: new SourceLocation(41, 5, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(43, 5, 10)})], location: new SourceLocation(42, 5, 9)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(44, 6, 1)}),
    new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(50, 6, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(52, 6, 9)})], location: new SourceLocation(51, 6, 8)}),
    new Token(TokenType.Operator, "+", { location: new SourceLocation(53, 6, 10)}),
    new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(54, 6, 11)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(56, 6, 13)})], location: new SourceLocation(55, 6, 12)}),
    new Token(TokenType.Dot, ".", { location: new SourceLocation(57, 7, 1)}),
    new Token(TokenType.Identifier, "print", { keyword: Keyword.PRINT, location: new SourceLocation(58, 7, 2)}),
    new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(63, 7, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(68, 7, 12)})], location: new SourceLocation(64, 7, 8)}),
    new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(70, 8, 2)})], location: new SourceLocation(69, 8, 1)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.BlockComment, "/*.print*/", { location: new SourceLocation(71, 9, 1)}), new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(81, 9, 11)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(84, 9, 14)})], location: new SourceLocation(85, 10, 1)}),
    new Token(TokenType.Numeric, "3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(91, 10, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(93, 10, 9)})], location: new SourceLocation(92, 10, 8)}),
    new Token(TokenType.Delimiter, "/", { eos: true, postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(95, 11, 2)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(97, 11, 4)})], location: new SourceLocation(94, 11, 1)}),
    new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(98, 12, 1)})], location: new SourceLocation(99, 13, 1)}),
    new Token(TokenType.Numeric, "4", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(105, 13, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(107, 13, 9)}), new Token(TokenType.BlockComment, "/*.print*/", { location: new SourceLocation(108, 13, 10)}), new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(118, 13, 20)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(119, 13, 21)})], location: new SourceLocation(106, 13, 8)}),
    new Token(TokenType.Delimiter, "GO", { eos: true, preskips: [new Token(TokenType.LineComment, "-- aaa", { location: new SourceLocation(120, 14, 1)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(126, 14, 7)}), new Token(TokenType.LineComment, "-- bbb", { location: new SourceLocation(127, 15, 1)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(133, 15, 7)})], location: new SourceLocation(134, 16, 1)}),
    new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(136, 16, 3)})
]
