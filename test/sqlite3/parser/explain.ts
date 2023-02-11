import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("ExplainStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "EXPLAIN", { keyword: Keyword.EXPLAIN, location: new SourceLocation(0, 1, 0)}))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"a"}
                node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(14, 1, 14)})], location: new SourceLocation(15, 1, 15)}))
              }))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(16, 1, 16)}))
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"b"}
                node.append(new Token(TokenType.Identifier, "b", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(17, 1, 17)})], location: new SourceLocation(18, 1, 18)}))
              }))
            }))
          }))
        }))
        node.append(new Node("FromClause").apply(node => {
          node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(19, 1, 19)})], location: new SourceLocation(20, 1, 20)}))
          node.append(new Node("ObjectReference").apply(node => {
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"t1"}
              node.append(new Token(TokenType.Identifier, "t1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(24, 1, 24)})], location: new SourceLocation(25, 1, 25)}))
            }))
          }))
        }))
        node.append(new Node("WhereClause").apply(node => {
          node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(27, 1, 27)})], location: new SourceLocation(28, 1, 28)}))
          node.append(new Node("EqualOperation").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"a"}
                node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(33, 1, 33)})], location: new SourceLocation(34, 1, 34)}))
              }))
            }))
            node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(35, 1, 35)}))
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(36, 1, 36)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(38, 1, 38)})], location: new SourceLocation(37, 1, 37)}))
  node.append(new Node("ExplainStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "EXPLAIN", { keyword: Keyword.EXPLAIN, preskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(39, 2, 1)})], location: new SourceLocation(40, 3, 1)}))
    node.append(new Node("QueryPlanOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "QUERY", { keyword: Keyword.QUERY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(47, 3, 8)})], location: new SourceLocation(48, 3, 9)}))
      node.append(new Token(TokenType.Identifier, "PLAN", { keyword: Keyword.PLAN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(53, 3, 14)})], location: new SourceLocation(54, 3, 15)}))
    }))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(58, 3, 19)})], location: new SourceLocation(59, 3, 20)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("SchemaName").apply(node => {
              node.data = {"value":"t1"}
              node.append(new Token(TokenType.Identifier, "t1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(65, 3, 26)})], location: new SourceLocation(66, 3, 27)}))
            }))
            node.append(new Node("AllColumnsOption").apply(node => {
              node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(68, 3, 29)}))
              node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(69, 3, 30)}))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(70, 3, 31)}))
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("SchemaName").apply(node => {
              node.data = {"value":"t2"}
              node.append(new Token(TokenType.Identifier, "t2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(71, 3, 32)})], location: new SourceLocation(72, 3, 33)}))
            }))
            node.append(new Node("AllColumnsOption").apply(node => {
              node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(74, 3, 35)}))
              node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(75, 3, 36)}))
            }))
          }))
        }))
        node.append(new Node("FromClause").apply(node => {
          node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(76, 3, 37)})], location: new SourceLocation(77, 3, 38)}))
          node.append(new Node("ObjectReference").apply(node => {
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"t1"}
              node.append(new Token(TokenType.Identifier, "t1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(81, 3, 42)})], location: new SourceLocation(82, 3, 43)}))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(84, 3, 45)}))
          node.append(new Node("ObjectReference").apply(node => {
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"t2"}
              node.append(new Token(TokenType.Identifier, "t2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(85, 3, 46)})], location: new SourceLocation(86, 3, 47)}))
            }))
          }))
        }))
        node.append(new Node("WhereClause").apply(node => {
          node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(88, 3, 49)})], location: new SourceLocation(89, 3, 50)}))
          node.append(new Node("GreaterThanOperation").apply(node => {
            node.append(new Node("EqualOperation").apply(node => {
              node.append(new Node("ColumnReference").apply(node => {
                node.append(new Node("ObjectName").apply(node => {
                  node.data = {"value":"t1"}
                  node.append(new Token(TokenType.Identifier, "t1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(94, 3, 55)})], location: new SourceLocation(95, 3, 56)}))
                }))
                node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(97, 3, 58)}))
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"a"}
                  node.append(new Token(TokenType.Identifier, "a", { location: new SourceLocation(98, 3, 59)}))
                }))
              }))
              node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(99, 3, 60)}))
              node.append(new Node("AndOperation").apply(node => {
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"1"}
                  node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(100, 3, 61)}))
                }))
                node.append(new Token(TokenType.Reserved, "AND", { keyword: Keyword.AND, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(101, 3, 62)})], location: new SourceLocation(102, 3, 63)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"t1"}
                    node.append(new Token(TokenType.Identifier, "t1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(105, 3, 66)})], location: new SourceLocation(106, 3, 67)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(108, 3, 69)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"b"}
                    node.append(new Token(TokenType.Identifier, "b", { location: new SourceLocation(109, 3, 70)}))
                  }))
                }))
              }))
            }))
            node.append(new Token(TokenType.Operator, ">", { location: new SourceLocation(110, 3, 71)}))
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"2"}
              node.append(new Token(TokenType.Numeric, "2", { location: new SourceLocation(111, 3, 72)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(112, 3, 73)}))
})
