import { SourceLocation, Token } from "../../../src/lexer"
import { SqlTokenType, SqlKeyword } from "../../../src/sql"

export default [
    new Token(SqlTokenType.Reserved, "SELECT", { keyword: SqlKeyword.SELECT, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(0, 1, 0)}),
    new Token(SqlTokenType.Reserved, "UPDATE", { keyword: SqlKeyword.UPDATE, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(13, 2, 7)})], location: new SourceLocation(7, 2, 1)}),
    new Token(SqlTokenType.Reserved, "select", { keyword: SqlKeyword.SELECT, location: new SourceLocation(14, 3, 1)}),
    new Token(SqlTokenType.Numeric, "1", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(20, 3, 7)})], location: new SourceLocation(21, 3, 8)}),
    new Token(SqlTokenType.Numeric, "2", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(22, 3, 9)})], location: new SourceLocation(23, 3, 10)}),
    new Token(SqlTokenType.Numeric, "3", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(24, 3, 11)})], postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(26, 3, 13)})], location: new SourceLocation(25, 3, 12)}),
    new Token(SqlTokenType.Reserved, "CREATE", { keyword: SqlKeyword.CREATE, location: new SourceLocation(27, 4, 1)}),
    new Token(SqlTokenType.Reserved, "TABLE", { keyword: SqlKeyword.TABLE, preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(33, 4, 7)})], location: new SourceLocation(34, 4, 8)}),
    new Token(SqlTokenType.SemiColon, ";", { eos: true, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(40, 4, 14)})], location: new SourceLocation(39, 4, 13)}),
    new Token(SqlTokenType.Reserved, "CREATE", { keyword: SqlKeyword.CREATE, preskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(41, 5, 1)})], location: new SourceLocation(42, 6, 1)}),
    new Token(SqlTokenType.BindVariable, "@aaa", { preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(48, 6, 7)})], location: new SourceLocation(49, 6, 8)}),
    new Token(SqlTokenType.Error, "@", { location: new SourceLocation(53, 6, 12)}),
    new Token(SqlTokenType.Reserved, "FROM", { keyword: SqlKeyword.FROM, preskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(54, 6, 13)})], postskips: [new Token(SqlTokenType.WhiteSpace, " ", { location: new SourceLocation(59, 6, 18)})], location: new SourceLocation(55, 6, 14)}),
    new Token(SqlTokenType.Error, "#", { location: new SourceLocation(60, 6, 19)}),
    new Token(SqlTokenType.Error, "#", { location: new SourceLocation(61, 6, 20)}),
    new Token(SqlTokenType.Error, "#", { location: new SourceLocation(62, 6, 21)}),
    new Token(SqlTokenType.SemiColon, ";", { eos: true, postskips: [new Token(SqlTokenType.LineBreak, "\n", { location: new SourceLocation(64, 6, 23)})], location: new SourceLocation(63, 6, 22)}),
    new Token(SqlTokenType.EoF, "", { eos: true, location: new SourceLocation(65, 7, 1)})
]
