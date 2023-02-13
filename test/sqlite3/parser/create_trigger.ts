import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("CreateTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(0, 1, 0)}))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"update_customer_address"}
      node.append(new Token(TokenType.Identifier, "update_customer_address", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(14, 1, 14)})], location: new SourceLocation(15, 1, 15)}))
    }))
    node.append(new Node("UpdateOnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(38, 1, 38)})], location: new SourceLocation(39, 1, 39)}))
      node.append(new Node("ColumnList").apply(node => {
        node.append(new Token(TokenType.Identifier, "OF", { keyword: Keyword.OF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(45, 1, 45)})], location: new SourceLocation(46, 1, 46)}))
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"address"}
          node.append(new Token(TokenType.Identifier, "address", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(48, 1, 48)})], location: new SourceLocation(49, 1, 49)}))
        }))
      }))
      node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(56, 1, 56)})], location: new SourceLocation(57, 1, 57)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"customers"}
        node.append(new Token(TokenType.Identifier, "customers", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(59, 1, 59)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(69, 1, 69)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(70, 1, 70)})], location: new SourceLocation(60, 1, 60)}))
      }))
    }))
    node.append(new Node("BeginStatement").apply(node => {
      node.append(new Node("BeginBlock").apply(node => {
        node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(76, 2, 6)})], location: new SourceLocation(71, 2, 1)}))
        node.append(new Node("UpdateStatement").apply(node => {
          node.append(new Node("UpdateClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(77, 3, 1)})], location: new SourceLocation(79, 3, 3)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"orders"}
              node.append(new Token(TokenType.Identifier, "orders", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(85, 3, 9)})], location: new SourceLocation(86, 3, 10)}))
            }))
            node.append(new Node("SetClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(92, 3, 16)})], location: new SourceLocation(93, 3, 17)}))
              node.append(new Node("ColumnAssignment").apply(node => {
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"address"}
                  node.append(new Token(TokenType.Identifier, "address", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(96, 3, 20)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(104, 3, 28)})], location: new SourceLocation(97, 3, 21)}))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(105, 3, 29)}))
                node.append(new Node("ColumnValue").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"new"}
                      node.append(new Token(TokenType.Identifier, "new", { keyword: Keyword.NEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(106, 3, 30)})], location: new SourceLocation(107, 3, 31)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(110, 3, 34)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"address"}
                      node.append(new Token(TokenType.Identifier, "address", { location: new SourceLocation(111, 3, 35)}))
                    }))
                  }))
                }))
              }))
            }))
            node.append(new Node("WhereClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(118, 3, 42)})], location: new SourceLocation(119, 3, 43)}))
              node.append(new Node("EqualOperation").apply(node => {
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"customer_name"}
                    node.append(new Token(TokenType.Identifier, "customer_name", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(124, 3, 48)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(138, 3, 62)})], location: new SourceLocation(125, 3, 49)}))
                  }))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(139, 3, 63)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"old"}
                    node.append(new Token(TokenType.Identifier, "old", { keyword: Keyword.OLD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(140, 3, 64)})], location: new SourceLocation(141, 3, 65)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(144, 3, 68)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"name"}
                    node.append(new Token(TokenType.Identifier, "name", { keyword: Keyword.NAME, location: new SourceLocation(145, 3, 69)}))
                  }))
                }))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.SemiColon, ";", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(150, 3, 74)})], location: new SourceLocation(149, 3, 73)}))
        node.append(new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(151, 4, 1)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(155, 4, 5)})], location: new SourceLocation(154, 4, 4)}))
  node.append(new Node("CreateTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(156, 5, 1)}))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(162, 5, 7)})], location: new SourceLocation(163, 5, 8)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"cust_addr_chng"}
      node.append(new Token(TokenType.Identifier, "cust_addr_chng", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(170, 5, 15)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(185, 5, 30)})], location: new SourceLocation(171, 5, 16)}))
    }))
    node.append(new Node("InsteadOfOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "INSTEAD", { keyword: Keyword.INSTEAD, location: new SourceLocation(186, 6, 1)}))
      node.append(new Token(TokenType.Identifier, "OF", { keyword: Keyword.OF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(193, 6, 8)})], location: new SourceLocation(194, 6, 9)}))
    }))
    node.append(new Node("UpdateOnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(196, 6, 11)})], location: new SourceLocation(197, 6, 12)}))
      node.append(new Node("ColumnList").apply(node => {
        node.append(new Token(TokenType.Identifier, "OF", { keyword: Keyword.OF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(203, 6, 18)})], location: new SourceLocation(204, 6, 19)}))
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"cust_addr"}
          node.append(new Token(TokenType.Identifier, "cust_addr", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(206, 6, 21)})], location: new SourceLocation(207, 6, 22)}))
        }))
      }))
      node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(216, 6, 31)})], location: new SourceLocation(217, 6, 32)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"customer_address"}
        node.append(new Token(TokenType.Identifier, "customer_address", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(219, 6, 34)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(236, 6, 51)})], location: new SourceLocation(220, 6, 35)}))
      }))
    }))
    node.append(new Node("BeginStatement").apply(node => {
      node.append(new Node("BeginBlock").apply(node => {
        node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(242, 7, 6)})], location: new SourceLocation(237, 7, 1)}))
        node.append(new Node("UpdateStatement").apply(node => {
          node.append(new Node("UpdateClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(243, 8, 1)})], location: new SourceLocation(245, 8, 3)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"customer"}
              node.append(new Token(TokenType.Identifier, "customer", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(251, 8, 9)})], location: new SourceLocation(252, 8, 10)}))
            }))
            node.append(new Node("SetClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(260, 8, 18)})], location: new SourceLocation(261, 8, 19)}))
              node.append(new Node("ColumnAssignment").apply(node => {
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"cust_addr"}
                  node.append(new Token(TokenType.Identifier, "cust_addr", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(264, 8, 22)})], location: new SourceLocation(265, 8, 23)}))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(274, 8, 32)}))
                node.append(new Node("ColumnValue").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"NEW"}
                      node.append(new Token(TokenType.Identifier, "NEW", { keyword: Keyword.NEW, location: new SourceLocation(275, 8, 33)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(278, 8, 36)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"cust_addr"}
                      node.append(new Token(TokenType.Identifier, "cust_addr", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(288, 8, 46)})], location: new SourceLocation(279, 8, 37)}))
                    }))
                  }))
                }))
              }))
            }))
            node.append(new Node("WhereClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(289, 9, 1)})], location: new SourceLocation(292, 9, 4)}))
              node.append(new Node("EqualOperation").apply(node => {
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"cust_id"}
                    node.append(new Token(TokenType.Identifier, "cust_id", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(297, 9, 9)})], location: new SourceLocation(298, 9, 10)}))
                  }))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(305, 9, 17)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"NEW"}
                    node.append(new Token(TokenType.Identifier, "NEW", { keyword: Keyword.NEW, location: new SourceLocation(306, 9, 18)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(309, 9, 21)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"cust_id"}
                    node.append(new Token(TokenType.Identifier, "cust_id", { location: new SourceLocation(310, 9, 22)}))
                  }))
                }))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.SemiColon, ";", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(318, 9, 30)})], location: new SourceLocation(317, 9, 29)}))
        node.append(new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(319, 10, 1)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(323, 10, 5)})], location: new SourceLocation(322, 10, 4)}))
  node.append(new Node("CreateTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(324, 11, 1)}))
    node.append(new Node("TemporaryOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "TEMP", { keyword: Keyword.TEMP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(330, 11, 7)})], location: new SourceLocation(331, 11, 8)}))
    }))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(335, 11, 12)})], location: new SourceLocation(336, 11, 13)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"ex1"}
      node.append(new Token(TokenType.Identifier, "ex1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(343, 11, 20)})], location: new SourceLocation(344, 11, 21)}))
    }))
    node.append(new Node("AfterOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "AFTER", { keyword: Keyword.AFTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(347, 11, 24)})], location: new SourceLocation(348, 11, 25)}))
    }))
    node.append(new Node("InsertOnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "INSERT", { keyword: Keyword.INSERT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(353, 11, 30)})], location: new SourceLocation(354, 11, 31)}))
      node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(360, 11, 37)})], location: new SourceLocation(361, 11, 38)}))
      node.append(new Node("SchemaName").apply(node => {
        node.data = {"value":"main"}
        node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(363, 11, 40)})], location: new SourceLocation(364, 11, 41)}))
      }))
      node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(368, 11, 45)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"tab1"}
        node.append(new Token(TokenType.Identifier, "tab1", { location: new SourceLocation(369, 11, 46)}))
      }))
    }))
    node.append(new Node("BeginStatement").apply(node => {
      node.append(new Node("BeginBlock").apply(node => {
        node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(373, 11, 50)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(379, 11, 56)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(380, 11, 57)})], location: new SourceLocation(374, 11, 51)}))
        node.append(new Node("InsertStatement").apply(node => {
          node.append(new Node("InsertClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "INSERT", { keyword: Keyword.INSERT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(381, 12, 1)})], location: new SourceLocation(383, 12, 3)}))
            node.append(new Token(TokenType.Reserved, "INTO", { keyword: Keyword.INTO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(389, 12, 9)})], location: new SourceLocation(390, 12, 10)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"sample"}
              node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(394, 12, 14)})], location: new SourceLocation(395, 12, 15)}))
            }))
            node.append(new Node("DefaultValuesOption").apply(node => {
              node.append(new Token(TokenType.Reserved, "DEFAULT", { keyword: Keyword.DEFAULT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(401, 12, 21)})], location: new SourceLocation(402, 12, 22)}))
              node.append(new Token(TokenType.Reserved, "VALUES", { keyword: Keyword.VALUES, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(409, 12, 29)})], location: new SourceLocation(410, 12, 30)}))
            }))
          }))
        }))
        node.append(new Token(TokenType.SemiColon, ";", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(417, 12, 37)})], location: new SourceLocation(416, 12, 36)}))
        node.append(new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(418, 13, 1)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(421, 13, 4)}))
})
