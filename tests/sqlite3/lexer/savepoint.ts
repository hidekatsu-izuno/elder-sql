// biome-ignore format: auto generated
import { SourceLocation, Token } from "elder-parse"
import { SqlLexer } from "../../../src/sql.ts"

export default [
    new Token(SqlLexer.Identifier, "SAVEPOINT", { keyword: SqlLexer.SAVEPOINT, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlLexer.Identifier, "sect1", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(9, 1, 9)})], location: new SourceLocation(10, 1, 10)}),
    new Token(SqlLexer.SemiColon, ";", { location: new SourceLocation(15, 1, 15)}),
    new Token(SqlLexer.EoS, "", { postskips: [new Token(SqlLexer.LineBreak, "\n", { location: new SourceLocation(16, 1, 16)})]}),
    new Token(SqlLexer.Identifier, "SAVEPOINT", { keyword: SqlLexer.SAVEPOINT, location: new SourceLocation(17, 2, 1)}),
    new Token(SqlLexer.Identifier, "sect2", { preskips: [new Token(SqlLexer.WhiteSpace, " ", { location: new SourceLocation(26, 2, 10)})], location: new SourceLocation(27, 2, 11)}),
    new Token(SqlLexer.EoF, "", { location: new SourceLocation(32, 2, 16)})
]
