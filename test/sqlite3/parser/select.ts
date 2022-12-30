import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export const actual = `
SELECT 1+2-3, -1*2/3, +1-2*3
`.trim()
export const expected = new Node("root")