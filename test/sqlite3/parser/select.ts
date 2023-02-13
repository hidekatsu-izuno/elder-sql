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
          node.append(new Node("DivideOperation").apply(node => {
            node.append(new Node("MultiplyOperation").apply(node => {
              node.append(new Node("UnaryMinusOperation").apply(node => {
                node.append(new Token(TokenType.Operator, "-", { location: new SourceLocation(14, 1, 14)}))
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"1"}
                  node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(15, 1, 15)}))
                }))
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
          node.append(new Node("ColumnAlias").apply(node => {
            node.data = {"value":"c1"}
            node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(20, 1, 20)})], location: new SourceLocation(21, 1, 21)}))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(24, 1, 24)})], location: new SourceLocation(23, 1, 23)}))
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("SubtractOperation").apply(node => {
            node.append(new Node("UnaryPlusOperation").apply(node => {
              node.append(new Token(TokenType.Operator, "+", { location: new SourceLocation(25, 1, 25)}))
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(26, 1, 26)}))
              }))
            }))
            node.append(new Token(TokenType.Operator, "-", { location: new SourceLocation(27, 1, 27)}))
            node.append(new Node("MultiplyOperation").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"2"}
                node.append(new Token(TokenType.Numeric, "2", { location: new SourceLocation(28, 1, 28)}))
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
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(38, 1, 38)})], location: new SourceLocation(37, 1, 37)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(39, 2, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("ColumnReference").apply(node => {
            node.append(new Node("ColumnName").apply(node => {
              node.data = {"value":"c1"}
              node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(45, 2, 7)})], location: new SourceLocation(46, 2, 8)}))
            }))
          }))
        }))
      }))
      node.append(new Node("FromClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(48, 2, 10)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(53, 2, 15)})], location: new SourceLocation(49, 2, 11)}))
        node.append(new Node("Subquery").apply(node => {
          node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(54, 2, 16)}))
          node.append(new Node("SelectStatement").apply(node => {
            node.append(new Node("SelectClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(61, 2, 23)})], location: new SourceLocation(55, 2, 17)}))
              node.append(new Node("SelectColumnList").apply(node => {
                node.append(new Node("SelectColumn").apply(node => {
                  node.append(new Node("AllColumnsOption").apply(node => {
                    node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(62, 2, 24)}))
                  }))
                }))
              }))
              node.append(new Node("FromClause").apply(node => {
                node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(63, 2, 25)})], location: new SourceLocation(64, 2, 26)}))
                node.append(new Node("ObjectReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"sample"}
                    node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(68, 2, 30)})], location: new SourceLocation(69, 2, 31)}))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(75, 2, 37)}))
        }))
      }))
      node.append(new Node("GroupByClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "GROUP", { keyword: Keyword.GROUP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(76, 2, 38)})], location: new SourceLocation(77, 2, 39)}))
        node.append(new Token(TokenType.Identifier, "BY", { keyword: Keyword.BY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(82, 2, 44)})], location: new SourceLocation(83, 2, 45)}))
        node.append(new Node("ColumnReference").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"c1"}
            node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(85, 2, 47)})], location: new SourceLocation(86, 2, 48)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(89, 2, 51)})], location: new SourceLocation(88, 2, 50)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("WithClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "WITH", { keyword: Keyword.WITH, location: new SourceLocation(90, 3, 1)}))
      node.append(new Node("CommonTable").apply(node => {
        node.append(new Node("ObjectName").apply(node => {
          node.data = {"value":"x"}
          node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(94, 3, 5)})], location: new SourceLocation(95, 3, 6)}))
        }))
        node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(96, 3, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(99, 3, 10)})], location: new SourceLocation(97, 3, 8)}))
        node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(100, 3, 11)}))
        node.append(new Node("SelectStatement").apply(node => {
          node.append(new Node("SelectClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(101, 3, 12)}))
            node.append(new Node("SelectColumnList").apply(node => {
              node.append(new Node("SelectColumn").apply(node => {
                node.append(new Node("SchemaName").apply(node => {
                  node.data = {"value":"s"}
                  node.append(new Token(TokenType.Identifier, "s", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(107, 3, 18)})], location: new SourceLocation(108, 3, 19)}))
                }))
                node.append(new Node("AllColumnsOption").apply(node => {
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(109, 3, 20)}))
                  node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(110, 3, 21)}))
                }))
              }))
            }))
            node.append(new Node("FromClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(111, 3, 22)})], location: new SourceLocation(112, 3, 23)}))
              node.append(new Node("ObjectReference").apply(node => {
                node.append(new Node("ObjectName").apply(node => {
                  node.data = {"value":"sample"}
                  node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(116, 3, 27)})], location: new SourceLocation(117, 3, 28)}))
                }))
                node.append(new Node("ObjectAlias").apply(node => {
                  node.data = {"value":"s"}
                  node.append(new Token(TokenType.Identifier, "s", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(123, 3, 34)})], location: new SourceLocation(124, 3, 35)}))
                }))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(126, 3, 37)})], location: new SourceLocation(125, 3, 36)}))
      }))
    }))
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(133, 4, 7)})], location: new SourceLocation(127, 4, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("AllColumnsOption").apply(node => {
            node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(134, 4, 8)}))
          }))
        }))
      }))
      node.append(new Node("FromClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(135, 4, 9)})], location: new SourceLocation(136, 4, 10)}))
        node.append(new Node("ObjectReference").apply(node => {
          node.append(new Node("ObjectName").apply(node => {
            node.data = {"value":"x"}
            node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(140, 4, 14)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(142, 4, 16)})], location: new SourceLocation(141, 4, 15)}))
          }))
        }))
      }))
      node.append(new Node("WhereClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, location: new SourceLocation(143, 5, 1)}))
        node.append(new Node("AndOperation").apply(node => {
          node.append(new Node("EqualOperation").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ObjectName").apply(node => {
                node.data = {"value":"x"}
                node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(148, 5, 6)})], location: new SourceLocation(149, 5, 7)}))
              }))
              node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(150, 5, 8)}))
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"col1"}
                node.append(new Token(TokenType.Identifier, "col1", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(155, 5, 13)})], location: new SourceLocation(151, 5, 9)}))
              }))
            }))
            node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(156, 5, 14)}))
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"2"}
              node.append(new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(157, 5, 15)})], location: new SourceLocation(158, 5, 16)}))
            }))
          }))
          node.append(new Token(TokenType.Reserved, "AND", { keyword: Keyword.AND, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(159, 5, 17)})], location: new SourceLocation(160, 5, 18)}))
          node.append(new Node("NotOperation").apply(node => {
            node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(163, 5, 21)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(167, 5, 25)})], location: new SourceLocation(164, 5, 22)}))
            node.append(new Node("Expression").apply(node => {
              node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(168, 5, 26)}))
              node.append(new Node("OrOperation").apply(node => {
                node.append(new Node("NotLikeOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { location: new SourceLocation(169, 5, 27)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(170, 5, 28)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"col2"}
                      node.append(new Token(TokenType.Identifier, "col2", { location: new SourceLocation(171, 5, 29)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(175, 5, 33)})], location: new SourceLocation(176, 5, 34)}))
                  node.append(new Token(TokenType.Identifier, "LIKE", { keyword: Keyword.LIKE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(179, 5, 37)})], location: new SourceLocation(180, 5, 38)}))
                  node.append(new Node("StringLiteral").apply(node => {
                    node.data = {"value":"%x%"}
                    node.append(new Token(TokenType.String, "'%x%'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(184, 5, 42)})], location: new SourceLocation(185, 5, 43)}))
                  }))
                }))
                node.append(new Token(TokenType.Reserved, "OR", { keyword: Keyword.OR, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(190, 5, 48)})], location: new SourceLocation(191, 5, 49)}))
                node.append(new Node("IsOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(193, 5, 51)})], location: new SourceLocation(194, 5, 52)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(195, 5, 53)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"col2"}
                      node.append(new Token(TokenType.Identifier, "col2", { location: new SourceLocation(196, 5, 54)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Reserved, "IS", { keyword: Keyword.IS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(200, 5, 58)})], location: new SourceLocation(201, 5, 59)}))
                  node.append(new Node("NullLiteral").apply(node => {
                    node.append(new Token(TokenType.Reserved, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(203, 5, 61)})], location: new SourceLocation(204, 5, 62)}))
                  }))
                }))
              }))
              node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(209, 5, 67)})], location: new SourceLocation(208, 5, 66)}))
            }))
          }))
        }))
      }))
    }))
    node.append(new Node("OrderByClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ORDER", { keyword: Keyword.ORDER, location: new SourceLocation(210, 6, 1)}))
      node.append(new Token(TokenType.Identifier, "BY", { keyword: Keyword.BY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(215, 6, 6)})], location: new SourceLocation(216, 6, 7)}))
      node.append(new Node("SortingColumnList").apply(node => {
        node.append(new Node("SortingColumn").apply(node => {
          node.append(new Node("ColumnReference").apply(node => {
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"x"}
              node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(218, 6, 9)})], location: new SourceLocation(219, 6, 10)}))
            }))
            node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(220, 6, 11)}))
            node.append(new Node("ColumnName").apply(node => {
              node.data = {"value":"col3"}
              node.append(new Token(TokenType.Identifier, "col3", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(225, 6, 16)})], location: new SourceLocation(221, 6, 12)}))
            }))
          }))
        }))
      }))
    }))
    node.append(new Node("LimitClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "LIMIT", { keyword: Keyword.LIMIT, location: new SourceLocation(226, 7, 1)}))
      node.append(new Node("LimitOption").apply(node => {
        node.append(new Node("NumericLiteral").apply(node => {
          node.data = {"value":"1"}
          node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(231, 7, 6)})], location: new SourceLocation(232, 7, 7)}))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(233, 7, 8)}))
})
