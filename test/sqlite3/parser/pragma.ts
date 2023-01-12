import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script")
  .append(new Node("PragmaStatement")
    .append(new Token(TokenType.Identifier, "PRAGMA", { keyword: Keyword.PRAGMA, location: new SourceLocation(0, 1, 0) }))
    .append(new Node("PragmaName", "foreign_keys")
      .append(new Token(TokenType.Identifier, "foreign_keys", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6) })], location: new SourceLocation(7, 1, 7) }))
    )
    .append(new Token(TokenType.Operator, "=", { location: new SourceLocation(19, 1, 19) }))
    .append(new Node("PragmaValue", "off")
      .append(new Token(TokenType.Identifier, "off", { keyword: Keyword.OFF, location: new SourceLocation(20, 1, 20) }))
    )
    .append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(23, 1, 23) }))
    .append(new Token(TokenType.Eof, "", { eos: true, location: new SourceLocation(24, 1, 24) }))
  )