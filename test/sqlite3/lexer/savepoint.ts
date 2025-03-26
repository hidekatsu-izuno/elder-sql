import { SourceLocation, Token } from "../../../src/lexer"
import { SqlTokenType, SqlKeyword } from "../../../src/sql"

export default [
    new Token(SqlTokenType.Identifier, "SAVEPOINT", { keyword: SqlKeyword.SAVEPOINT, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlTokenType.Identifier, "sect1", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(9, 1, 9)})], location: new SourceLocation(10, 1, 10)}),
    new Token(SqlTokenType.SemiColon, ";", { eos: true, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(16, 1, 16)})], location: new SourceLocation(15, 1, 15)}),
    new Token(SqlTokenType.Identifier, "SAVEPOINT", { keyword: SqlKeyword.SAVEPOINT, location: new SourceLocation(17, 2, 1)}),
    new Token(SqlTokenType.Identifier, "sect2", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(26, 2, 10)})], location: new SourceLocation(27, 2, 11)}),
    new Token(SqlTokenType.EoF, "", { eos: true, location: new SourceLocation(32, 2, 16)})
]
