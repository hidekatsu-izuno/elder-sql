import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(0, 1, 0)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("SubtractOperation").apply(node => {
            node.append(new Node("AddOperation").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}))
              }))
              node.append(new Token(TokenType.Operator, "+", { location: new SourceLocation(8, 1, 8)}))
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"2"}
                node.append(new Token(TokenType.Numeric, "2", { location: new SourceLocation(9, 1, 9)}))
              }))
            }))
            node.append(new Token(TokenType.Operator, "-", { location: new SourceLocation(10, 1, 10)}))
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"3"}
              node.append(new Token(TokenType.Numeric, "3", { location: new SourceLocation(11, 1, 11)}))
            }))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(13, 1, 13)})], location: new SourceLocation(12, 1, 12)}))
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("UnaryMinusOperation").apply(node => {
            node.append(new Token(TokenType.Operator, "-", { location: new SourceLocation(14, 1, 14)}))
            node.append(new Node("DivideOperation").apply(node => {
              node.append(new Node("MultiplyOperation").apply(node => {
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"1"}
                  node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(15, 1, 15)}))
                }))
                node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(16, 1, 16)}))
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"2"}
                  node.append(new Token(TokenType.Numeric, "2", { location: new SourceLocation(17, 1, 17)}))
                }))
              }))
              node.append(new Token(TokenType.Operator, "/", { location: new SourceLocation(18, 1, 18)}))
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"3"}
                node.append(new Token(TokenType.Numeric, "3", { location: new SourceLocation(19, 1, 19)}))
              }))
            }))
          }))
          node.append(new Node("ColumnAlias").apply(node => {
            node.data = {"value":"c1"}
            node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(20, 1, 20)})], location: new SourceLocation(21, 1, 21)}))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(24, 1, 24)})], location: new SourceLocation(23, 1, 23)}))
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("UnaryPlusOperation").apply(node => {
            node.append(new Token(TokenType.Operator, "+", { location: new SourceLocation(25, 1, 25)}))
            node.append(new Node("MultiplyOperation").apply(node => {
              node.append(new Node("SubtractOperation").apply(node => {
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"1"}
                  node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(26, 1, 26)}))
                }))
                node.append(new Token(TokenType.Operator, "-", { location: new SourceLocation(27, 1, 27)}))
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"2"}
                  node.append(new Token(TokenType.Numeric, "2", { location: new SourceLocation(28, 1, 28)}))
                }))
              }))
              node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(29, 1, 29)}))
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"3"}
                node.append(new Token(TokenType.Numeric, "3", { location: new SourceLocation(30, 1, 30)}))
              }))
            }))
          }))
          node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(31, 1, 31)})], location: new SourceLocation(32, 1, 32)}))
          node.append(new Node("ColumnAlias").apply(node => {
            node.data = {"value":"c2"}
            node.append(new Token(TokenType.Identifier, "c2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(34, 1, 34)})], location: new SourceLocation(35, 1, 35)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(37, 1, 37)}))
})
