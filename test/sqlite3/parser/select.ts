import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(0, 1, 0)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
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
        }))
        node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(13, 1, 13)})], location: new SourceLocation(12, 1, 12)}))
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
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
          }))
          node.append(new Node("ColumnAlias").apply(node => {
            node.data = {"value":"c1"}
            node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(20, 1, 20)})], location: new SourceLocation(21, 1, 21)}))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(24, 1, 24)})], location: new SourceLocation(23, 1, 23)}))
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
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
          node.append(new Node("Expression").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"c1"}
                node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(45, 2, 7)})], location: new SourceLocation(46, 2, 8)}))
              }))
            }))
          }))
        }))
      }))
      node.append(new Node("FromClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(48, 2, 10)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(53, 2, 15)})], location: new SourceLocation(49, 2, 11)}))
        node.append(new Node("SubqueryExpression").apply(node => {
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
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("ColumnReference").apply(node => {
            node.append(new Node("ColumnName").apply(node => {
              node.data = {"value":"c1"}
              node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(85, 2, 47)})], location: new SourceLocation(86, 2, 48)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(89, 2, 51)})], location: new SourceLocation(88, 2, 50)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("WithClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "WITH", { keyword: Keyword.WITH, location: new SourceLocation(90, 3, 1)}))
      node.append(new Node("CommonTableExpression").apply(node => {
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
        node.append(new Node("Expression").apply(node => {
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
                node.append(new Node("Expression").apply(node => {
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
                }))
                node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(209, 5, 67)})], location: new SourceLocation(208, 5, 66)}))
              }))
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
          node.append(new Node("Expression").apply(node => {
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
    }))
    node.append(new Node("LimitClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "LIMIT", { keyword: Keyword.LIMIT, location: new SourceLocation(226, 7, 1)}))
      node.append(new Node("LimitOption").apply(node => {
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("NumericLiteral").apply(node => {
            node.data = {"value":"1"}
            node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(231, 7, 6)})], location: new SourceLocation(232, 7, 7)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(234, 7, 9)})], location: new SourceLocation(233, 7, 8)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(241, 8, 7)})], location: new SourceLocation(235, 8, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("AllColumnsOption").apply(node => {
            node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(242, 8, 8)}))
          }))
        }))
      }))
      node.append(new Node("FromClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(243, 8, 9)})], location: new SourceLocation(244, 8, 10)}))
        node.append(new Node("ObjectReference").apply(node => {
          node.append(new Node("ObjectName").apply(node => {
            node.data = {"value":"a"}
            node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(248, 8, 14)})], location: new SourceLocation(249, 8, 15)}))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(250, 8, 16)}))
        node.append(new Node("ObjectReference").apply(node => {
          node.append(new Node("SchemaName").apply(node => {
            node.data = {"value":"main"}
            node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(251, 8, 17)})], location: new SourceLocation(252, 8, 18)}))
          }))
          node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(256, 8, 22)}))
          node.append(new Node("ObjectName").apply(node => {
            node.data = {"value":"b"}
            node.append(new Token(TokenType.Identifier, "b", { location: new SourceLocation(257, 8, 23)}))
          }))
          node.append(new Node("ObjectAlias").apply(node => {
            node.data = {"value":"x"}
            node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(258, 8, 24)})], location: new SourceLocation(259, 8, 25)}))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(260, 8, 26)}))
        node.append(new Node("ObjectReference").apply(node => {
          node.append(new Node("ObjectName").apply(node => {
            node.data = {"value":"c"}
            node.append(new Token(TokenType.Identifier, "c", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(261, 8, 27)})], location: new SourceLocation(262, 8, 28)}))
          }))
          node.append(new Token(TokenType.Reserved, "as", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(263, 8, 29)})], location: new SourceLocation(264, 8, 30)}))
          node.append(new Node("ObjectAlias").apply(node => {
            node.data = {"value":"y"}
            node.append(new Token(TokenType.Identifier, "y", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(266, 8, 32)})], location: new SourceLocation(267, 8, 33)}))
          }))
        }))
      }))
      node.append(new Node("WhereClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(268, 8, 34)})], location: new SourceLocation(269, 8, 35)}))
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("AndOperation").apply(node => {
            node.append(new Node("AndOperation").apply(node => {
              node.append(new Node("EqualOperation").apply(node => {
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"a"}
                    node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(274, 8, 40)})], location: new SourceLocation(275, 8, 41)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(276, 8, 42)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(278, 8, 44)})], location: new SourceLocation(277, 8, 43)}))
                  }))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(279, 8, 45)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(280, 8, 46)})], location: new SourceLocation(281, 8, 47)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(282, 8, 48)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { location: new SourceLocation(283, 8, 49)}))
                  }))
                }))
              }))
              node.append(new Token(TokenType.Reserved, "AND", { keyword: Keyword.AND, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(284, 8, 50)})], location: new SourceLocation(285, 8, 51)}))
              node.append(new Node("EqualOperation").apply(node => {
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(288, 8, 54)})], location: new SourceLocation(289, 8, 55)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(290, 8, 56)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(292, 8, 58)})], location: new SourceLocation(291, 8, 57)}))
                  }))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(293, 8, 59)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"y"}
                    node.append(new Token(TokenType.Identifier, "y", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(294, 8, 60)})], location: new SourceLocation(295, 8, 61)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(296, 8, 62)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { location: new SourceLocation(297, 8, 63)}))
                  }))
                }))
              }))
            }))
            node.append(new Token(TokenType.Reserved, "AND", { keyword: Keyword.AND, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(298, 8, 64)})], location: new SourceLocation(299, 8, 65)}))
            node.append(new Node("EqualOperation").apply(node => {
              node.append(new Node("ColumnReference").apply(node => {
                node.append(new Node("ObjectName").apply(node => {
                  node.data = {"value":"y"}
                  node.append(new Token(TokenType.Identifier, "y", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(302, 8, 68)})], location: new SourceLocation(303, 8, 69)}))
                }))
                node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(304, 8, 70)}))
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"y"}
                  node.append(new Token(TokenType.Identifier, "y", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(306, 8, 72)})], location: new SourceLocation(305, 8, 71)}))
                }))
              }))
              node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(307, 8, 73)}))
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"0"}
                node.append(new Token(TokenType.Numeric, "0", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(308, 8, 74)})], location: new SourceLocation(309, 8, 75)}))
              }))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(311, 8, 77)})], location: new SourceLocation(310, 8, 76)}))
  node.append(new Node("SelectStatement").apply(node => {
    node.append(new Node("SelectClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(318, 9, 7)})], location: new SourceLocation(312, 9, 1)}))
      node.append(new Node("SelectColumnList").apply(node => {
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
            node.append(new Node("NamedBindVariable").apply(node => {
              node.data = {"value":"aaa"}
              node.append(new Token(TokenType.BindVariable, ":aaa", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(319, 10, 1)})], location: new SourceLocation(321, 10, 3)}))
            }))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(326, 10, 8)})], location: new SourceLocation(325, 10, 7)}))
        node.append(new Node("SelectColumn").apply(node => {
          node.append(new Node("Expression").apply(node => {
            node.append(new Node("PositionalBindVariable").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.BindVariable, "?", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(327, 11, 1)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(330, 11, 4)})], location: new SourceLocation(329, 11, 3)}))
            }))
          }))
        }))
      }))
      node.append(new Node("FromClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(335, 12, 5)})], location: new SourceLocation(331, 12, 1)}))
        node.append(new Node("ObjectReference").apply(node => {
          node.append(new Node("ObjectName").apply(node => {
            node.data = {"value":"a"}
            node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(336, 13, 1)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(339, 13, 4)})], location: new SourceLocation(338, 13, 3)}))
          }))
          node.append(new Node("CrossJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "CROSS", { keyword: Keyword.CROSS, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(340, 14, 1)})], location: new SourceLocation(342, 14, 3)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(347, 14, 8)})], location: new SourceLocation(348, 14, 9)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"b"}
              node.append(new Token(TokenType.Identifier, "b", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(352, 14, 13)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(354, 14, 15)})], location: new SourceLocation(353, 14, 14)}))
            }))
          }))
          node.append(new Node("InnerJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(355, 15, 1)})], location: new SourceLocation(357, 15, 3)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"c"}
              node.append(new Token(TokenType.Identifier, "c", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(361, 15, 7)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(363, 15, 9)})], location: new SourceLocation(362, 15, 8)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(364, 16, 1)})], location: new SourceLocation(368, 16, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"c"}
                      node.append(new Token(TokenType.Identifier, "c", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(370, 16, 7)})], location: new SourceLocation(371, 16, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(372, 16, 9)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(374, 16, 11)})], location: new SourceLocation(373, 16, 10)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(375, 16, 12)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(376, 16, 13)})], location: new SourceLocation(377, 16, 14)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(378, 16, 15)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(380, 16, 17)})], location: new SourceLocation(379, 16, 16)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("InnerJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "INNER", { keyword: Keyword.INNER, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(381, 17, 1)})], location: new SourceLocation(383, 17, 3)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(388, 17, 8)})], location: new SourceLocation(389, 17, 9)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"c1"}
              node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(393, 17, 13)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(396, 17, 16)})], location: new SourceLocation(394, 17, 14)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(397, 18, 1)})], location: new SourceLocation(401, 18, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"c1"}
                      node.append(new Token(TokenType.Identifier, "c1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(403, 18, 7)})], location: new SourceLocation(404, 18, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(406, 18, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(408, 18, 12)})], location: new SourceLocation(407, 18, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(409, 18, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(410, 18, 14)})], location: new SourceLocation(411, 18, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(412, 18, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(414, 18, 18)})], location: new SourceLocation(413, 18, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("InnerJoinClause").apply(node => {
            node.append(new Node("NatualOption").apply(node => {
              node.append(new Token(TokenType.Reserved, "NATURAL", { keyword: Keyword.NATURAL, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(415, 19, 1)})], location: new SourceLocation(417, 19, 3)}))
            }))
            node.append(new Token(TokenType.Reserved, "INNER", { keyword: Keyword.INNER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(424, 19, 10)})], location: new SourceLocation(425, 19, 11)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(430, 19, 16)})], location: new SourceLocation(431, 19, 17)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"c2"}
              node.append(new Token(TokenType.Identifier, "c2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(435, 19, 21)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(438, 19, 24)})], location: new SourceLocation(436, 19, 22)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(439, 20, 1)})], location: new SourceLocation(443, 20, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"c2"}
                      node.append(new Token(TokenType.Identifier, "c2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(445, 20, 7)})], location: new SourceLocation(446, 20, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(448, 20, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(450, 20, 12)})], location: new SourceLocation(449, 20, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(451, 20, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(452, 20, 14)})], location: new SourceLocation(453, 20, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(454, 20, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(456, 20, 18)})], location: new SourceLocation(455, 20, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("LeftOuterJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "LEFT", { keyword: Keyword.LEFT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(457, 21, 1)})], location: new SourceLocation(459, 21, 3)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(463, 21, 7)})], location: new SourceLocation(464, 21, 8)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"d"}
              node.append(new Token(TokenType.Identifier, "d", { keyword: Keyword.D, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(468, 21, 12)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(470, 21, 14)})], location: new SourceLocation(469, 21, 13)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(471, 22, 1)})], location: new SourceLocation(475, 22, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"d"}
                      node.append(new Token(TokenType.Identifier, "d", { keyword: Keyword.D, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(477, 22, 7)})], location: new SourceLocation(478, 22, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(479, 22, 9)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(481, 22, 11)})], location: new SourceLocation(480, 22, 10)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(482, 22, 12)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(483, 22, 13)})], location: new SourceLocation(484, 22, 14)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(485, 22, 15)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(487, 22, 17)})], location: new SourceLocation(486, 22, 16)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("LeftOuterJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "LEFT", { keyword: Keyword.LEFT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(488, 23, 1)})], location: new SourceLocation(490, 23, 3)}))
            node.append(new Token(TokenType.Reserved, "OUTER", { keyword: Keyword.OUTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(494, 23, 7)})], location: new SourceLocation(495, 23, 8)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(500, 23, 13)})], location: new SourceLocation(501, 23, 14)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"d1"}
              node.append(new Token(TokenType.Identifier, "d1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(505, 23, 18)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(508, 23, 21)})], location: new SourceLocation(506, 23, 19)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(509, 24, 1)})], location: new SourceLocation(513, 24, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"d1"}
                      node.append(new Token(TokenType.Identifier, "d1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(515, 24, 7)})], location: new SourceLocation(516, 24, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(518, 24, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(520, 24, 12)})], location: new SourceLocation(519, 24, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(521, 24, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(522, 24, 14)})], location: new SourceLocation(523, 24, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(524, 24, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(526, 24, 18)})], location: new SourceLocation(525, 24, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("LeftOuterJoinClause").apply(node => {
            node.append(new Node("NatualOption").apply(node => {
              node.append(new Token(TokenType.Reserved, "NATURAL", { keyword: Keyword.NATURAL, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(527, 25, 1)})], location: new SourceLocation(529, 25, 3)}))
            }))
            node.append(new Token(TokenType.Reserved, "LEFT", { keyword: Keyword.LEFT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(536, 25, 10)})], location: new SourceLocation(537, 25, 11)}))
            node.append(new Token(TokenType.Reserved, "OUTER", { keyword: Keyword.OUTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(541, 25, 15)})], location: new SourceLocation(542, 25, 16)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(547, 25, 21)})], location: new SourceLocation(548, 25, 22)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"d2"}
              node.append(new Token(TokenType.Identifier, "d2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(552, 25, 26)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(555, 25, 29)})], location: new SourceLocation(553, 25, 27)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(556, 26, 1)})], location: new SourceLocation(560, 26, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"d2"}
                      node.append(new Token(TokenType.Identifier, "d2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(562, 26, 7)})], location: new SourceLocation(563, 26, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(565, 26, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(567, 26, 12)})], location: new SourceLocation(566, 26, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(568, 26, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(569, 26, 14)})], location: new SourceLocation(570, 26, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(571, 26, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(573, 26, 18)})], location: new SourceLocation(572, 26, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("RightOuterJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "RIGHT", { keyword: Keyword.RIGHT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(574, 27, 1)})], location: new SourceLocation(576, 27, 3)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(581, 27, 8)})], location: new SourceLocation(582, 27, 9)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"e"}
              node.append(new Token(TokenType.Identifier, "e", { keyword: Keyword.E, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(586, 27, 13)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(588, 27, 15)})], location: new SourceLocation(587, 27, 14)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(589, 28, 1)})], location: new SourceLocation(593, 28, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"e"}
                      node.append(new Token(TokenType.Identifier, "e", { keyword: Keyword.E, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(595, 28, 7)})], location: new SourceLocation(596, 28, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(597, 28, 9)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(599, 28, 11)})], location: new SourceLocation(598, 28, 10)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(600, 28, 12)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(601, 28, 13)})], location: new SourceLocation(602, 28, 14)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(603, 28, 15)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(605, 28, 17)})], location: new SourceLocation(604, 28, 16)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("RightOuterJoinClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "RIGHT", { keyword: Keyword.RIGHT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(606, 29, 1)})], location: new SourceLocation(608, 29, 3)}))
            node.append(new Token(TokenType.Reserved, "OUTER", { keyword: Keyword.OUTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(613, 29, 8)})], location: new SourceLocation(614, 29, 9)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(619, 29, 14)})], location: new SourceLocation(620, 29, 15)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"e1"}
              node.append(new Token(TokenType.Identifier, "e1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(624, 29, 19)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(627, 29, 22)})], location: new SourceLocation(625, 29, 20)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(628, 30, 1)})], location: new SourceLocation(632, 30, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"e1"}
                      node.append(new Token(TokenType.Identifier, "e1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(634, 30, 7)})], location: new SourceLocation(635, 30, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(637, 30, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(639, 30, 12)})], location: new SourceLocation(638, 30, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(640, 30, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(641, 30, 14)})], location: new SourceLocation(642, 30, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(643, 30, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(645, 30, 18)})], location: new SourceLocation(644, 30, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("RightOuterJoinClause").apply(node => {
            node.append(new Node("NatualOption").apply(node => {
              node.append(new Token(TokenType.Reserved, "NATURAL", { keyword: Keyword.NATURAL, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(646, 31, 1)})], location: new SourceLocation(648, 31, 3)}))
            }))
            node.append(new Token(TokenType.Reserved, "RIGHT", { keyword: Keyword.RIGHT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(655, 31, 10)})], location: new SourceLocation(656, 31, 11)}))
            node.append(new Token(TokenType.Reserved, "OUTER", { keyword: Keyword.OUTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(661, 31, 16)})], location: new SourceLocation(662, 31, 17)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(667, 31, 22)})], location: new SourceLocation(668, 31, 23)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"e2"}
              node.append(new Token(TokenType.Identifier, "e2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(672, 31, 27)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(675, 31, 30)})], location: new SourceLocation(673, 31, 28)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(676, 32, 1)})], location: new SourceLocation(680, 32, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"e2"}
                      node.append(new Token(TokenType.Identifier, "e2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(682, 32, 7)})], location: new SourceLocation(683, 32, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(685, 32, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(687, 32, 12)})], location: new SourceLocation(686, 32, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(688, 32, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(689, 32, 14)})], location: new SourceLocation(690, 32, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(691, 32, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(693, 32, 18)})], location: new SourceLocation(692, 32, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("FullOuterJoinClause").apply(node => {
            node.append(new Token(TokenType.Identifier, "FULL", { keyword: Keyword.FULL, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(694, 33, 1)})], location: new SourceLocation(696, 33, 3)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(700, 33, 7)})], location: new SourceLocation(701, 33, 8)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"f"}
              node.append(new Token(TokenType.Identifier, "f", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(705, 33, 12)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(707, 33, 14)})], location: new SourceLocation(706, 33, 13)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(708, 34, 1)})], location: new SourceLocation(712, 34, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"f"}
                      node.append(new Token(TokenType.Identifier, "f", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(714, 34, 7)})], location: new SourceLocation(715, 34, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(716, 34, 9)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(718, 34, 11)})], location: new SourceLocation(717, 34, 10)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(719, 34, 12)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(720, 34, 13)})], location: new SourceLocation(721, 34, 14)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(722, 34, 15)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(724, 34, 17)})], location: new SourceLocation(723, 34, 16)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("FullOuterJoinClause").apply(node => {
            node.append(new Token(TokenType.Identifier, "FULL", { keyword: Keyword.FULL, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(725, 35, 1)})], location: new SourceLocation(727, 35, 3)}))
            node.append(new Token(TokenType.Reserved, "OUTER", { keyword: Keyword.OUTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(731, 35, 7)})], location: new SourceLocation(732, 35, 8)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(737, 35, 13)})], location: new SourceLocation(738, 35, 14)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"f1"}
              node.append(new Token(TokenType.Identifier, "f1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(742, 35, 18)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(745, 35, 21)})], location: new SourceLocation(743, 35, 19)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(746, 36, 1)})], location: new SourceLocation(750, 36, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"f1"}
                      node.append(new Token(TokenType.Identifier, "f1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(752, 36, 7)})], location: new SourceLocation(753, 36, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(755, 36, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(757, 36, 12)})], location: new SourceLocation(756, 36, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(758, 36, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(759, 36, 14)})], location: new SourceLocation(760, 36, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(761, 36, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(763, 36, 18)})], location: new SourceLocation(762, 36, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
          node.append(new Node("FullOuterJoinClause").apply(node => {
            node.append(new Node("NatualOption").apply(node => {
              node.append(new Token(TokenType.Reserved, "NATURAL", { keyword: Keyword.NATURAL, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(764, 37, 1)})], location: new SourceLocation(766, 37, 3)}))
            }))
            node.append(new Token(TokenType.Identifier, "FULL", { keyword: Keyword.FULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(773, 37, 10)})], location: new SourceLocation(774, 37, 11)}))
            node.append(new Token(TokenType.Reserved, "OUTER", { keyword: Keyword.OUTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(778, 37, 15)})], location: new SourceLocation(779, 37, 16)}))
            node.append(new Token(TokenType.Reserved, "JOIN", { keyword: Keyword.JOIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(784, 37, 21)})], location: new SourceLocation(785, 37, 22)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"f2"}
              node.append(new Token(TokenType.Identifier, "f2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(789, 37, 26)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(792, 37, 29)})], location: new SourceLocation(790, 37, 27)}))
            }))
            node.append(new Node("JoinOnClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(793, 38, 1)})], location: new SourceLocation(797, 38, 5)}))
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("EqualOperation").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"f2"}
                      node.append(new Token(TokenType.Identifier, "f2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(799, 38, 7)})], location: new SourceLocation(800, 38, 8)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(802, 38, 10)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(804, 38, 12)})], location: new SourceLocation(803, 38, 11)}))
                    }))
                  }))
                  node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(805, 38, 13)}))
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"a"}
                      node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(806, 38, 14)})], location: new SourceLocation(807, 38, 15)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(808, 38, 16)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"x"}
                      node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(810, 38, 18)})], location: new SourceLocation(809, 38, 17)}))
                    }))
                  }))
                }))
              }))
            }))
          }))
        }))
      }))
    }))
    node.append(new Node("LimitClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "LIMIT", { keyword: Keyword.LIMIT, location: new SourceLocation(811, 39, 1)}))
      node.append(new Node("LimitOption").apply(node => {
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("NumericLiteral").apply(node => {
            node.data = {"value":"1"}
            node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(816, 39, 6)})], location: new SourceLocation(817, 39, 7)}))
          }))
        }))
      }))
      node.append(new Node("OffsetOption").apply(node => {
        node.append(new Token(TokenType.Identifier, "OFFSET", { keyword: Keyword.OFFSET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(818, 39, 8)})], location: new SourceLocation(819, 39, 9)}))
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("NumericLiteral").apply(node => {
            node.data = {"value":"2"}
            node.append(new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(825, 39, 15)})], location: new SourceLocation(826, 39, 16)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(827, 39, 17)}))
})
