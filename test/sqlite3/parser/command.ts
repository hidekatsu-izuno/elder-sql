import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("CommandStatement").apply(node => {
    node.append(new Node("CommandName").apply(node => {
      node.data = {"value":".print"}
      node.append(new Token(TokenType.Command, ".print", { preskips: [new Token(TokenType.BlockComment, "/*test\n.print test\n*/", { location: new SourceLocation(0, 1, 0)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(21, 3, 3)})], location: new SourceLocation(22, 4, 1)}))
    }))
    node.append(new Node("CommandArgumentList").apply(node => {
      node.append(new Node("CommandArgument").apply(node => {
        node.data = {"value":"test"}
        node.append(new Token(TokenType.Identifier, "test", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(28, 4, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(33, 4, 12)})], location: new SourceLocation(29, 4, 8)}))
      }))
      node.append(new Node("CommandArgument").apply(node => {
        node.data = {"value":"select"}
        node.append(new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(34, 5, 1)}))
      }))
      node.append(new Node("CommandArgument").apply(node => {
        node.data = {"value":"1"}
        node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 5, 7)})], location: new SourceLocation(41, 5, 8)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(43, 5, 10)})], location: new SourceLocation(42, 5, 9)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(44, 6, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
            node.append(new Node("AddOperation").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"2"}
                node.append(new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(50, 6, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(52, 6, 9)})], location: new SourceLocation(51, 6, 8)}))
              }))
              node.append(new Token(TokenType.Operator, "+", { location: new SourceLocation(53, 6, 10)}))
              node.append(new Node("ColumnReference").apply(node => {
                node.append(new Node("ObjectName").apply(node => {
                  node.data = {"value":"x"}
                  node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(54, 6, 11)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(56, 6, 13)})], location: new SourceLocation(55, 6, 12)}))
                }))
                node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(57, 7, 1)}))
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"print"}
                  node.append(new Token(TokenType.Identifier, "print", { keyword: Keyword.PRINT, location: new SourceLocation(58, 7, 2)}))
                }))
              }))
            }))
          }))
          node.append(new Node("ColumnAlias").apply(node => {
            node.data = {"value":"test"}
            node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(63, 7, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(68, 7, 12)})], location: new SourceLocation(64, 7, 8)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(70, 8, 2)})], location: new SourceLocation(69, 8, 1)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, location: new SourceLocation(71, 9, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"3"}
              node.append(new Token(TokenType.Numeric, "3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(77, 9, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(79, 9, 9)})], location: new SourceLocation(78, 9, 8)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.Delimiter, "/", { eos: true, postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(81, 10, 2)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(83, 10, 4)})], location: new SourceLocation(80, 10, 1)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "select", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(84, 11, 1)})], location: new SourceLocation(85, 12, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"4"}
              node.append(new Token(TokenType.Numeric, "4", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(91, 12, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(93, 12, 9)})], location: new SourceLocation(92, 12, 8)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.Delimiter, "GO", { eos: true, location: new SourceLocation(94, 13, 1)}))
})
