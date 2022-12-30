import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export const actual = `
CREATE TABLE test (
    text TEXT PRIMARY KEY,
    age INT
)
`.trim()
export const expected = new Node("root")