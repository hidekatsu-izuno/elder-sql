import { Node, Token, TokenType } from "../../src/parser"
import { Keyword, Sqlite3Lexer, Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser"

describe("test sqlite3 lexer", () => {
    test("select literal", () => {
        const lexer = new Sqlite3Lexer()
        expect(lexer.lex("SELECT 1")).toStrictEqual([
            new Token(Keyword.SELECT, "SELECT", 0, 6),
            new Token(TokenType.Number, "1", 7, 8, [new Token(TokenType.WhiteSpace, " ", 6, 7)]),
            new Token(TokenType.EOF, "", 8, 8),
        ])
    })
})

describe("test sqlite3 parser", () => {
    test("select literal", () => {
        const parser = new Sqlite3Parser(`
            SELECT 1
        `.trim())
        expect(parser.root()).toStrictEqual(new Node("root")
            .add(new Node("select")
                .add(new Token(Keyword.SELECT, "select", 0, 6))
                .add(new Token(TokenType.Number, "1", 7, 8, [new Token(TokenType.WhiteSpace, " ", 6, 7)]))
            )
            .add(new Token(TokenType.EOF, "", 8, 8))
        )
    })
})