// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Reserved, "COMMIT", { keyword: SqlLexer.COMMIT, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(6, 1, 6)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(7, 1, 7)})]}),
    new Token(SqlLexer.Reserved, "COMMIT", { keyword: SqlLexer.COMMIT, location: new SourceLocation(8, 2, 1)}),
    new Token(SqlLexer.Reserved, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(14, 2, 7)})], location: new SourceLocation(15, 2, 8)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(26, 2, 19)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(27, 2, 20)})]}),
    new Token(SqlLexer.Identifier, "END", { keyword: SqlLexer.END, location: new SourceLocation(28, 3, 1)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(31, 3, 4)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(32, 3, 5)})]}),
    new Token(SqlLexer.Identifier, "END", { keyword: SqlLexer.END, location: new SourceLocation(33, 4, 1)}),
    new Token(SqlLexer.Reserved, "TRANSACTION", { keyword: SqlLexer.TRANSACTION, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(36, 4, 4)})], postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(48, 4, 16)})], location: new SourceLocation(37, 4, 5)}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(49, 5, 1)})
]
