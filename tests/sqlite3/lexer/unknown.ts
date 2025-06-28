// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Reserved, "SELECT", { keyword: SqlLexer.SELECT, postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.Reserved, "UPDATE", { keyword: SqlLexer.UPDATE, postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(13, 2, 7)})], location: new SourceLocation(7, 2, 1)}),
    new Token(SqlLexer.Reserved, "select", { keyword: SqlLexer.SELECT, location: new SourceLocation(14, 3, 1)}),
    new Token(SqlLexer.Numeric, "1", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(20, 3, 7)})], location: new SourceLocation(21, 3, 8)}),
    new Token(SqlLexer.Numeric, "2", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(22, 3, 9)})], location: new SourceLocation(23, 3, 10)}),
    new Token(SqlLexer.Numeric, "3", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(24, 3, 11)})], postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(26, 3, 13)})], location: new SourceLocation(25, 3, 12)}),
    new Token(SqlLexer.Reserved, "CREATE", { keyword: SqlLexer.CREATE, location: new SourceLocation(27, 4, 1)}),
    new Token(SqlLexer.Reserved, "TABLE", { keyword: SqlLexer.TABLE, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(33, 4, 7)})], location: new SourceLocation(34, 4, 8)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(39, 4, 13)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(40, 4, 14)})]}),
    new Token(SqlLexer.Reserved, "CREATE", { keyword: SqlLexer.CREATE, preskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(41, 5, 1)})], location: new SourceLocation(42, 6, 1)}),
    new Token(SqlLexer.BindVariable, "@aaa", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(48, 6, 7)})], location: new SourceLocation(49, 6, 8)}),
    new Token(SqlLexer.Error, "@", { location: new SourceLocation(53, 6, 12)}),
    new Token(SqlLexer.Reserved, "FROM", { keyword: SqlLexer.FROM, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(54, 6, 13)})], postskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(59, 6, 18)})], location: new SourceLocation(55, 6, 14)}),
    new Token(SqlLexer.Error, "#", { location: new SourceLocation(60, 6, 19)}),
    new Token(SqlLexer.Error, "#", { location: new SourceLocation(61, 6, 20)}),
    new Token(SqlLexer.Error, "#", { location: new SourceLocation(62, 6, 21)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(63, 6, 22)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(64, 6, 23)})]}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(65, 7, 1)})
]
