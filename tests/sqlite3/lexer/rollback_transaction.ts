// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "ROLLBACK", { keyword: SqlLexer.ROLLBACK, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(8, 1, 8)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(9, 1, 9)})]}),
    new Token(SqlLexer.Identifier, "ROLLBACK", { keyword: SqlLexer.ROLLBACK, location: new SourceLocation(10, 2, 1)}),
    new Token(SqlLexer.Identifier, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(18, 2, 9)})], location: new SourceLocation(19, 2, 10)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(30, 2, 21)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(31, 2, 22)})]}),
    new Token(SqlLexer.Identifier, "ROLLBACK", { keyword: SqlLexer.ROLLBACK, location: new SourceLocation(32, 3, 1)}),
    new Token(SqlLexer.Identifier, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(40, 3, 9)})], location: new SourceLocation(41, 3, 10)}),
    new Token(SqlLexer.Identifier, "TO", { keyword: SqlLexer.TO, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(52, 3, 21)})], location: new SourceLocation(53, 3, 22)}),
    new Token(SqlLexer.Identifier, "sect1", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(55, 3, 24)})], location: new SourceLocation(56, 3, 25)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(61, 3, 30)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(62, 3, 31)})]}),
    new Token(SqlLexer.Identifier, "ROLLBACK", { keyword: SqlLexer.ROLLBACK, location: new SourceLocation(63, 4, 1)}),
    new Token(SqlLexer.Identifier, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(71, 4, 9)})], location: new SourceLocation(72, 4, 10)}),
    new Token(SqlLexer.Identifier, "TO", { keyword: SqlLexer.TO, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(83, 4, 21)})], location: new SourceLocation(84, 4, 22)}),
    new Token(SqlLexer.Identifier, "SAVEPOINT", { keyword: SqlLexer.SAVEPOINT, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(86, 4, 24)})], location: new SourceLocation(87, 4, 25)}),
    new Token(SqlLexer.Identifier, "sect1", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(96, 4, 34)})], location: new SourceLocation(97, 4, 35)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(102, 4, 40)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(103, 4, 41)})]}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(104, 5, 1)})
]
