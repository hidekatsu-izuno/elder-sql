import { Node, Token, TokenType } from "../../src/parser"
import { Keyword, Sqlite3Lexer, Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser"
import { toJSString } from "../../src/util"

describe("test sqlite3 lexer", () => {
    test("select literal", () => {
        const lexer = new Sqlite3Lexer()
        expect(lexer.lex("SELECT 1")).toStrictEqual([
            new Token(Keyword.SELECT, "SELECT", 0,),
            new Token(TokenType.Number, "1", 7, [new Token(TokenType.WhiteSpace, " ", 6)]),
            new Token(TokenType.Eof, "", 8),
        ])
    })
})

describe("test sqlite3 parser", () => {
    test("create table", () => {
        const node = new Sqlite3Parser(`
CREATE TABLE test (
    text TEXT PRIMARY KEY,
    age INT
)
        `.trim()).root()
        expect(node).toStrictEqual(
            new Node("root")
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
        )
    })

    test("select literal", () => {
        const parser = new Sqlite3Parser(`
            SELECT 1
        `.trim())
        expect(parser.root()).toStrictEqual(new Node("root")
            .add(new Node("select")
                .add(new Token(Keyword.SELECT, "select", 0))
                .add(new Token(TokenType.Number, "1", 7, [new Token(TokenType.WhiteSpace, " ", 6)]))
            )
            .add(new Token(TokenType.Eof, "", 8))
        )
    })
})