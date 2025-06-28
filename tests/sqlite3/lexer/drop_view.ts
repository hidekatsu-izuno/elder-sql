// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "DROP", { keyword: SqlLexer.DROP, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.Identifier, "VIEW", { keyword: SqlLexer.VIEW, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(4, 1, 4)})], location: new SourceLocation(5, 1, 5)}),
    new Token(SqlLexer.Identifier, "v_sample", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(9, 1, 9)})], location: new SourceLocation(10, 1, 10)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(18, 1, 18)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(19, 1, 19)})]}),
    new Token(SqlLexer.Identifier, "DROP", { keyword: SqlLexer.DROP, location: new SourceLocation(20, 2, 1)}),
    new Token(SqlLexer.Identifier, "VIEW", { keyword: SqlLexer.VIEW, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(24, 2, 5)})], location: new SourceLocation(25, 2, 6)}),
    new Token(SqlLexer.Identifier, "main", { keyword: SqlLexer.MAIN, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(29, 2, 10)})], location: new SourceLocation(30, 2, 11)}),
    new Token(SqlLexer.Dot, ".", { location: new SourceLocation(34, 2, 15)}),
    new Token(SqlLexer.Identifier, "v_sample", { location: new SourceLocation(35, 2, 16)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(43, 2, 24)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(44, 2, 25)})]}),
    new Token(SqlLexer.Identifier, "DROP", { keyword: SqlLexer.DROP, location: new SourceLocation(45, 3, 1)}),
    new Token(SqlLexer.Identifier, "VIEW", { keyword: SqlLexer.VIEW, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(49, 3, 5)})], location: new SourceLocation(50, 3, 6)}),
    new Token(SqlLexer.Identifier, "IF", { keyword: SqlLexer.IF, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(54, 3, 10)})], location: new SourceLocation(55, 3, 11)}),
    new Token(SqlLexer.Reserved, "EXISTS", { keyword: SqlLexer.EXISTS, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(57, 3, 13)})], location: new SourceLocation(58, 3, 14)}),
    new Token(SqlLexer.Identifier, "main", { keyword: SqlLexer.MAIN, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(64, 3, 20)})], location: new SourceLocation(65, 3, 21)}),
    new Token(SqlLexer.Dot, ".", { location: new SourceLocation(69, 3, 25)}),
    new Token(SqlLexer.Identifier, "v_sample", { location: new SourceLocation(70, 3, 26)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(78, 3, 34)}),
    new Token(SqlLexer.EoS, ""),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(79, 3, 35)})
]
