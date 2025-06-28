// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "DROP", { keyword: SqlLexer.DROP, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.Identifier, "TRIGGER", { keyword: SqlLexer.TRIGGER, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(4, 1, 4)})], location: new SourceLocation(5, 1, 5)}),
    new Token(SqlLexer.Identifier, "r_sample", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(12, 1, 12)})], location: new SourceLocation(13, 1, 13)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(21, 1, 21)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(22, 1, 22)})]}),
    new Token(SqlLexer.Identifier, "DROP", { keyword: SqlLexer.DROP, location: new SourceLocation(23, 2, 1)}),
    new Token(SqlLexer.Identifier, "TRIGGER", { keyword: SqlLexer.TRIGGER, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(27, 2, 5)})], location: new SourceLocation(28, 2, 6)}),
    new Token(SqlLexer.Identifier, "main", { keyword: SqlLexer.MAIN, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(35, 2, 13)})], location: new SourceLocation(36, 2, 14)}),
    new Token(SqlLexer.Dot, ".", { location: new SourceLocation(40, 2, 18)}),
    new Token(SqlLexer.Identifier, "r_sample", { location: new SourceLocation(41, 2, 19)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(49, 2, 27)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(50, 2, 28)})]}),
    new Token(SqlLexer.Identifier, "DROP", { keyword: SqlLexer.DROP, location: new SourceLocation(51, 3, 1)}),
    new Token(SqlLexer.Identifier, "TRIGGER", { keyword: SqlLexer.TRIGGER, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(55, 3, 5)})], location: new SourceLocation(56, 3, 6)}),
    new Token(SqlLexer.Identifier, "IF", { keyword: SqlLexer.IF, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(63, 3, 13)})], location: new SourceLocation(64, 3, 14)}),
    new Token(SqlLexer.Reserved, "EXISTS", { keyword: SqlLexer.EXISTS, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(66, 3, 16)})], location: new SourceLocation(67, 3, 17)}),
    new Token(SqlLexer.Identifier, "main", { keyword: SqlLexer.MAIN, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(73, 3, 23)})], location: new SourceLocation(74, 3, 24)}),
    new Token(SqlLexer.Dot, ".", { location: new SourceLocation(78, 3, 28)}),
    new Token(SqlLexer.Identifier, "r_sample", { location: new SourceLocation(79, 3, 29)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(87, 3, 37)}),
    new Token(SqlLexer.EoS, ""),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(88, 3, 38)})
]
