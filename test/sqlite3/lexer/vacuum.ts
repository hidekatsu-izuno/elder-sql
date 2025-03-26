import { SourceLocation, Token } from "../../../src/lexer"
import { SqlTokenType, SqlKeyword } from "../../../src/sql"

export default [
    new Token(SqlTokenType.Identifier, "VACUUM", { keyword: SqlKeyword.VACUUM, location: new SourceLocation(0, 1, 0)}),
    new Token(SqlTokenType.SemiColon, ";", { eos: true, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(6, 1, 6)}),
    new Token(SqlTokenType.Identifier, "VACUUM", { keyword: SqlKeyword.VACUUM, location: new SourceLocation(8, 2, 1)}),
    new Token(SqlTokenType.Identifier, "main", { keyword: SqlKeyword.MAIN, preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(14, 2, 7)})], location: new SourceLocation(15, 2, 8)}),
    new Token(SqlTokenType.SemiColon, ";", { eos: true, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(20, 2, 13)})], location: new SourceLocation(19, 2, 12)}),
    new Token(SqlTokenType.Identifier, "VACUUM", { keyword: SqlKeyword.VACUUM, location: new SourceLocation(21, 3, 1)}),
    new Token(SqlTokenType.Identifier, "main", { keyword: SqlKeyword.MAIN, preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(27, 3, 7)})], location: new SourceLocation(28, 3, 8)}),
    new Token(SqlTokenType.Reserved, "INTO", { keyword: SqlKeyword.INTO, preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(32, 3, 12)})], location: new SourceLocation(33, 3, 13)}),
    new Token(SqlTokenType.String, "'database.dat'", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(37, 3, 17)})], location: new SourceLocation(38, 3, 18)}),
    new Token(SqlTokenType.SemiColon, ";", { eos: true, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(53, 3, 33)})], location: new SourceLocation(52, 3, 32)}),
    new Token(SqlTokenType.Identifier, "VACUUM", { keyword: SqlKeyword.VACUUM, location: new SourceLocation(54, 4, 1)}),
    new Token(SqlTokenType.Reserved, "INTO", { keyword: SqlKeyword.INTO, preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(60, 4, 7)})], location: new SourceLocation(61, 4, 8)}),
    new Token(SqlTokenType.Identifier, "\"database.dat\"", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(65, 4, 12)})], postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(80, 4, 27)})], location: new SourceLocation(66, 4, 13)}),
    new Token(SqlTokenType.EoF, "", { eos: true, location: new SourceLocation(81, 5, 1)})
]
