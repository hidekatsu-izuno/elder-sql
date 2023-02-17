import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("UpdateStatement").apply(node => {
    node.append(new Node("UpdateClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, location: new SourceLocation(0, 1, 0)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"sample"}
        node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}))
      }))
      node.append(new Node("SetClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(13, 1, 13)})], location: new SourceLocation(14, 1, 14)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"a"}
            node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(17, 1, 17)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(19, 1, 19)})], location: new SourceLocation(18, 1, 18)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(20, 1, 20)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(21, 1, 21)})], location: new SourceLocation(22, 1, 22)}))
              }))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(24, 1, 24)})], location: new SourceLocation(23, 1, 23)}))
  node.append(new Node("UpdateStatement").apply(node => {
    node.append(new Node("UpdateClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, location: new SourceLocation(25, 2, 1)}))
      node.append(new Node("SchemaName").apply(node => {
        node.data = {"value":"main"}
        node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(31, 2, 7)})], location: new SourceLocation(32, 2, 8)}))
      }))
      node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(36, 2, 12)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"sample"}
        node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(37, 2, 13)}))
      }))
      node.append(new Node("SetClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(43, 2, 19)})], location: new SourceLocation(44, 2, 20)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"a"}
            node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(47, 2, 23)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(49, 2, 25)})], location: new SourceLocation(48, 2, 24)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(50, 2, 26)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(51, 2, 27)})], location: new SourceLocation(52, 2, 28)}))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(53, 2, 29)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"b"}
            node.append(new Token(TokenType.Identifier, "b", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(54, 2, 30)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(56, 2, 32)})], location: new SourceLocation(55, 2, 31)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(57, 2, 33)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"2"}
                node.append(new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(58, 2, 34)})], location: new SourceLocation(59, 2, 35)}))
              }))
            }))
          }))
        }))
      }))
      node.append(new Node("WhereClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(60, 2, 36)})], location: new SourceLocation(61, 2, 37)}))
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("EqualOperation").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"c"}
                node.append(new Token(TokenType.Identifier, "c", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(66, 2, 42)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(68, 2, 44)})], location: new SourceLocation(67, 2, 43)}))
              }))
            }))
            node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(69, 2, 45)}))
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"3"}
              node.append(new Token(TokenType.Numeric, "3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(70, 2, 46)})], location: new SourceLocation(71, 2, 47)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(73, 2, 49)})], location: new SourceLocation(72, 2, 48)}))
  node.append(new Node("UpdateStatement").apply(node => {
    node.append(new Node("WithClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "WITH", { keyword: Keyword.WITH, location: new SourceLocation(74, 3, 1)}))
      node.append(new Node("CommonTableExpression").apply(node => {
        node.append(new Node("ObjectName").apply(node => {
          node.data = {"value":"X"}
          node.append(new Token(TokenType.Identifier, "X", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(78, 3, 5)})], location: new SourceLocation(79, 3, 6)}))
        }))
        node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(80, 3, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(83, 3, 10)})], location: new SourceLocation(81, 3, 8)}))
        node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(84, 3, 11)}))
        node.append(new Node("SelectStatement").apply(node => {
          node.append(new Node("SelectClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(85, 3, 12)}))
            node.append(new Node("SelectColumnList").apply(node => {
              node.append(new Node("SelectColumn").apply(node => {
                node.append(new Node("Expression").apply(node => {
                  node.append(new Node("NumericLiteral").apply(node => {
                    node.data = {"value":"1"}
                    node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(91, 3, 18)})], location: new SourceLocation(92, 3, 19)}))
                  }))
                }))
                node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(93, 3, 20)})], location: new SourceLocation(94, 3, 21)}))
                node.append(new Node("ColumnAlias").apply(node => {
                  node.data = {"value":"Y"}
                  node.append(new Token(TokenType.Identifier, "Y", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(96, 3, 23)})], location: new SourceLocation(97, 3, 24)}))
                }))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(99, 3, 26)})], location: new SourceLocation(98, 3, 25)}))
      }))
    }))
    node.append(new Node("UpdateClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, location: new SourceLocation(100, 4, 1)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"sample"}
        node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(106, 4, 7)})], location: new SourceLocation(107, 4, 8)}))
      }))
      node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(113, 4, 14)})], location: new SourceLocation(114, 4, 15)}))
      node.append(new Node("ObjectAlias").apply(node => {
        node.data = {"value":"dest"}
        node.append(new Token(TokenType.Identifier, "dest", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(116, 4, 17)})], location: new SourceLocation(117, 4, 18)}))
      }))
      node.append(new Node("SetClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(121, 4, 22)})], location: new SourceLocation(122, 4, 23)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"a"}
            node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(125, 4, 26)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(127, 4, 28)})], location: new SourceLocation(126, 4, 27)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(128, 4, 29)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(129, 4, 30)})], location: new SourceLocation(130, 4, 31)}))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(131, 4, 32)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"b"}
            node.append(new Token(TokenType.Identifier, "b", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(132, 4, 33)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(134, 4, 35)})], location: new SourceLocation(133, 4, 34)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(135, 4, 36)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"2"}
                node.append(new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(136, 4, 37)})], location: new SourceLocation(137, 4, 38)}))
              }))
            }))
          }))
        }))
      }))
      node.append(new Node("FromClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(138, 4, 39)})], location: new SourceLocation(139, 4, 40)}))
        node.append(new Node("ObjectReference").apply(node => {
          node.append(new Node("ObjectName").apply(node => {
            node.data = {"value":"X"}
            node.append(new Token(TokenType.Identifier, "X", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(143, 4, 44)})], location: new SourceLocation(144, 4, 45)}))
          }))
        }))
      }))
      node.append(new Node("WhereClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(145, 4, 46)})], location: new SourceLocation(146, 4, 47)}))
        node.append(new Node("Expression").apply(node => {
          node.append(new Node("EqualOperation").apply(node => {
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ObjectName").apply(node => {
                node.data = {"value":"dest"}
                node.append(new Token(TokenType.Identifier, "dest", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(151, 4, 52)})], location: new SourceLocation(152, 4, 53)}))
              }))
              node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(156, 4, 57)}))
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"c"}
                node.append(new Token(TokenType.Identifier, "c", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(158, 4, 59)})], location: new SourceLocation(157, 4, 58)}))
              }))
            }))
            node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(159, 4, 60)}))
            node.append(new Node("ColumnReference").apply(node => {
              node.append(new Node("ObjectName").apply(node => {
                node.data = {"value":"X"}
                node.append(new Token(TokenType.Identifier, "X", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(160, 4, 61)})], location: new SourceLocation(161, 4, 62)}))
              }))
              node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(162, 4, 63)}))
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"c"}
                node.append(new Token(TokenType.Identifier, "c", { location: new SourceLocation(163, 4, 64)}))
              }))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(165, 4, 66)})], location: new SourceLocation(164, 4, 65)}))
  node.append(new Node("UpdateStatement").apply(node => {
    node.append(new Node("UpdateClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, location: new SourceLocation(166, 5, 1)}))
      node.append(new Node("SchemaName").apply(node => {
        node.data = {"value":"main"}
        node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(172, 5, 7)})], location: new SourceLocation(173, 5, 8)}))
      }))
      node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(177, 5, 12)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"sample"}
        node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(178, 5, 13)}))
      }))
      node.append(new Node("SetClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(184, 5, 19)})], location: new SourceLocation(185, 5, 20)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"a"}
            node.append(new Token(TokenType.Identifier, "a", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(188, 5, 23)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(190, 5, 25)})], location: new SourceLocation(189, 5, 24)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(191, 5, 26)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(192, 5, 27)})], location: new SourceLocation(193, 5, 28)}))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(194, 5, 29)}))
        node.append(new Node("ColumnAssignment").apply(node => {
          node.append(new Node("ColumnName").apply(node => {
            node.data = {"value":"b"}
            node.append(new Token(TokenType.Identifier, "b", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(195, 5, 30)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(197, 5, 32)})], location: new SourceLocation(196, 5, 31)}))
          }))
          node.append(new Token(TokenType.Operator, "=", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(199, 5, 34)})], location: new SourceLocation(198, 5, 33)}))
          node.append(new Node("ColumnValue").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("SubqueryExpression").apply(node => {
                node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(200, 5, 35)}))
                node.append(new Node("SelectStatement").apply(node => {
                  node.append(new Node("SelectClause").apply(node => {
                    node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, location: new SourceLocation(201, 5, 36)}))
                    node.append(new Node("SelectColumnList").apply(node => {
                      node.append(new Node("SelectColumn").apply(node => {
                        node.append(new Node("Expression").apply(node => {
                          node.append(new Node("NumericLiteral").apply(node => {
                            node.data = {"value":"1"}
                            node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(207, 5, 42)})], location: new SourceLocation(208, 5, 43)}))
                          }))
                        }))
                      }))
                    }))
                  }))
                }))
                node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(209, 5, 44)}))
              }))
            }))
          }))
        }))
      }))
      node.append(new Node("ReturningClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "RETURNING", { keyword: Keyword.RETURNING, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(210, 5, 45)})], location: new SourceLocation(211, 5, 46)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("ColumnReference").apply(node => {
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"Y"}
                  node.append(new Token(TokenType.Identifier, "Y", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(220, 5, 55)})], location: new SourceLocation(221, 5, 56)}))
                }))
              }))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(222, 5, 57)}))
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(223, 5, 58)})], location: new SourceLocation(224, 5, 59)}))
              }))
            }))
            node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(225, 5, 60)})], location: new SourceLocation(226, 5, 61)}))
            node.append(new Node("ColumnAlias").apply(node => {
              node.data = {"value":"Z"}
              node.append(new Token(TokenType.Identifier, "Z", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(228, 5, 63)})], location: new SourceLocation(229, 5, 64)}))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(231, 5, 66)})], location: new SourceLocation(230, 5, 65)}))
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("AllColumnsOption").apply(node => {
              node.append(new Token(TokenType.Operator, "*", { location: new SourceLocation(232, 5, 67)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(234, 5, 69)})], location: new SourceLocation(233, 5, 68)}))
})
