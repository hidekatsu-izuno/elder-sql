// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "RELEASE", { keyword: SqlLexer.RELEASE, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.Identifier, "sect1", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(13, 1, 13)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(14, 1, 14)})]}),
    new Token(SqlLexer.Identifier, "RELEASE", { keyword: SqlLexer.RELEASE, location: new SourceLocation(15, 2, 1)}),
    new Token(SqlLexer.Identifier, "SAVEPOINT", { keyword: SqlLexer.SAVEPOINT, preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(22, 2, 8)})], location: new SourceLocation(23, 2, 9)}),
    new Token(SqlLexer.Identifier, "sect1", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(32, 2, 18)})], postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(38, 2, 24)})], location: new SourceLocation(33, 2, 19)}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(39, 3, 1)})
]
