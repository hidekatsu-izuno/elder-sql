import { Node, Token, TokenType } from "../../../src/parser"
import { Keyword } from "../../../src/sqlite3/sqlite3_parser"

export const actual = `
CREATE TABLE test (
    text TEXT PRIMARY KEY,
    age INT
)
`.trim()
export const expected = new Node("root")
  .add(new Node("create table")
    .add(new Token(Keyword.CREATE, "CREATE", 0))
    .add(new Token(Keyword.TABLE, "TABLE", 7, [
      new Token(TokenType.WhiteSpace, " ", 6)
    ]))
    .add(new Node("name", "test")
      .add(new Token(TokenType.Identifier, "test", 13, [
        new Token(TokenType.WhiteSpace, " ", 12)
      ]))
    )
    .add(new Token(TokenType.LeftParen, "(", 18, [
      new Token(TokenType.WhiteSpace, " ", 17)
    ]))
    .add(new Node("column")
      .add(new Node("name", "text")
        .add(new Token(TokenType.Identifier, "text", 24, [
          new Token(TokenType.LineBreak, "\n", 19),
          new Token(TokenType.WhiteSpace, "    ", 20)
        ]))
      )
      .add(new Node("type")
        .add(new Node("name", "TEXT")
          .add(new Token(TokenType.Identifier, "TEXT", 29, [
            new Token(TokenType.WhiteSpace, " ", 28)
          ]))
        )
      )
      .add(new Node("primary key")
        .add(new Token(Keyword.PRIMARY, "PRIMARY", 34, [
          new Token(TokenType.WhiteSpace, " ", 33)
        ]))
        .add(new Token([TokenType.Identifier, Keyword.KEY], "KEY", 42, [
          new Token(TokenType.WhiteSpace, " ", 41)
        ]))
      )
    )
    .add(new Token(TokenType.Comma, ",", 45))
    .add(new Node("column")
      .add(new Node("name", "age")
        .add(new Token(TokenType.Identifier, "age", 51, [
          new Token(TokenType.LineBreak, "\n", 46),
          new Token(TokenType.WhiteSpace, "    ", 47)
        ]))
      )
      .add(new Node("type")
        .add(new Node("name", "INT")
          .add(new Token(TokenType.Identifier, "INT", 55, [
            new Token(TokenType.WhiteSpace, " ", 54)
          ]))
        )
      )
    )
    .add(new Token(TokenType.RightParen, ")", 59, [
      new Token(TokenType.LineBreak, "\n", 58)
    ]))
    .add(new Token(TokenType.Eof, "", 60))
  )