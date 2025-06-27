// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "analyze", { keyword: SqlLexer.ANALYZE, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.Identifier, "main", { keyword: SqlLexer.MAIN, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(12, 1, 12)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(13, 1, 13)})]}),
    new Token(SqlLexer.Identifier, "ANALYZE", { keyword: SqlLexer.ANALYZE, location: new SourceLocation(14, 2, 1)}),
    new Token(SqlLexer.Identifier, "main", { keyword: SqlLexer.MAIN, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(21, 2, 8)})], location: new SourceLocation(22, 2, 9)}),
    new Token(SqlLexer.Dot, ".", { location: new SourceLocation(26, 2, 13)}),
    new Token(SqlLexer.Identifier, "test", { keyword: SqlLexer.TEST, postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(31, 2, 18)})], location: new SourceLocation(27, 2, 14)}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(32, 3, 1)})
]
