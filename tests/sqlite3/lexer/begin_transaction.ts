// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(5, 1, 5)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(6, 1, 6)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(7, 2, 1)}),
    new Token(SqlLexer.Reserved, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(12, 2, 6)})], location: new SourceLocation(13, 2, 7)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(24, 2, 18)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(25, 2, 19)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(26, 3, 1)}),
    new Token(SqlLexer.Identifier, "DEFERRED", { keyword: SqlLexer.DEFERRED, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(31, 3, 6)})], location: new SourceLocation(32, 3, 7)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(40, 3, 15)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(41, 3, 16)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(42, 4, 1)}),
    new Token(SqlLexer.Identifier, "IMMEDIATE", { keyword: SqlLexer.IMMEDIATE, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(47, 4, 6)})], location: new SourceLocation(48, 4, 7)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(57, 4, 16)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(58, 4, 17)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(59, 5, 1)}),
    new Token(SqlLexer.Identifier, "EXCLUSIVE", { keyword: SqlLexer.EXCLUSIVE, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(64, 5, 6)})], location: new SourceLocation(65, 5, 7)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(74, 5, 16)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(75, 5, 17)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(76, 6, 1)}),
    new Token(SqlLexer.Identifier, "DEFERRED", { keyword: SqlLexer.DEFERRED, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(81, 6, 6)})], location: new SourceLocation(82, 6, 7)}),
    new Token(SqlLexer.Reserved, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(90, 6, 15)})], location: new SourceLocation(91, 6, 16)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(102, 6, 27)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(103, 6, 28)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(104, 7, 1)}),
    new Token(SqlLexer.Identifier, "IMMEDIATE", { keyword: SqlLexer.IMMEDIATE, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(109, 7, 6)})], location: new SourceLocation(110, 7, 7)}),
    new Token(SqlLexer.Reserved, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(119, 7, 16)})], location: new SourceLocation(120, 7, 17)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(131, 7, 28)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(132, 7, 29)})]}),
    new Token(SqlLexer.Identifier, "BEGIN", { keyword: SqlLexer.BEGIN, location: new SourceLocation(133, 8, 1)}),
    new Token(SqlLexer.Identifier, "EXCLUSIVE", { keyword: SqlLexer.EXCLUSIVE, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(138, 8, 6)})], location: new SourceLocation(139, 8, 7)}),
    new Token(SqlLexer.Reserved, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(148, 8, 16)})], postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(160, 8, 28)})], location: new SourceLocation(149, 8, 17)}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(161, 9, 1)})
]
