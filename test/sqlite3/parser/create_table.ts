import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export const actual = `
CREATE TABLE test (
    text TEXT PRIMARY KEY,
    age INT
)
`.trim()
export const expected = new Node("root")
  .add(new Node("create table")
    .add(new Token(Keyword.CREATE, "CREATE", [], new SourceLocation(0, 1, 0, undefined)))
    .add(new Token(Keyword.TABLE, "TABLE", [
      new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(6, 1, 6, undefined))
    ], new SourceLocation(7, 1, 7, undefined)))
    .add(new Node("name", "test")
      .add(new Token([Keyword.TEST, TokenType.Identifier], "test", [
        new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(12, 1, 12, undefined))
      ], new SourceLocation(13, 1, 13, undefined)))
    )
    .add(new Token(TokenType.LeftParen, "(", [
      new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(17, 1, 17, undefined))
    ], new SourceLocation(18, 1, 18, undefined)))
    .add(new Node("column")
      .add(new Node("name", "text")
        .add(new Token([Keyword.TEXT, TokenType.Identifier], "text", [
          new Token(TokenType.LineBreak, "\n", [], new SourceLocation(19, 1, 19, undefined)),
          new Token(TokenType.WhiteSpace, "    ", [], new SourceLocation(20, 2, 0, undefined))
        ], new SourceLocation(24, 2, 4, undefined)))
      )
      .add(new Node("type")
        .add(new Node("name", "TEXT")
          .add(new Token([Keyword.TEXT, TokenType.Identifier], "TEXT", [
            new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(28, 2, 8, undefined))
          ], new SourceLocation(29, 2, 9, undefined)))
        )
      )
      .add(new Node("primary key")
        .add(new Token(Keyword.PRIMARY, "PRIMARY", [
          new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(33, 2, 13, undefined))
        ], new SourceLocation(34, 2, 14, undefined)))
        .add(new Token([Keyword.KEY, TokenType.Identifier], "KEY", [
          new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(41, 2, 21, undefined))
        ], new SourceLocation(42, 2, 22, undefined)))
      )
    )
    .add(new Token(TokenType.Comma, ",", [], new SourceLocation(45, 2, 25, undefined)))
    .add(new Node("column")
      .add(new Node("name", "age")
        .add(new Token([Keyword.AGE, TokenType.Identifier], "age", [
          new Token(TokenType.LineBreak, "\n", [], new SourceLocation(46, 2, 26, undefined)),
          new Token(TokenType.WhiteSpace, "    ", [], new SourceLocation(47, 3, 0, undefined))
        ], new SourceLocation(51, 3, 4, undefined)))
      )
      .add(new Node("type")
        .add(new Node("name", "INT")
          .add(new Token([Keyword.INT, TokenType.Identifier], "INT", [
            new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(54, 3, 7, undefined))
          ], new SourceLocation(55, 3, 8, undefined)))
        )
      )
    )
    .add(new Token(TokenType.RightParen, ")", [
      new Token(TokenType.LineBreak, "\n", [], new SourceLocation(58, 3, 11, undefined))
    ], new SourceLocation(59, 4, 0, undefined)))
    .add(new Token(TokenType.Eof, "", [], new SourceLocation(60, 4, 1, undefined)))
  )