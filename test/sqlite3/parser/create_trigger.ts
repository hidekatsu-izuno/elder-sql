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
    node.append(new Node("TemporaryOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "TEMP", { keyword: Keyword.TEMP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(162, 5, 7)})], location: new SourceLocation(163, 5, 8)}))
    }))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(167, 5, 12)})], location: new SourceLocation(168, 5, 13)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"ex1"}
      node.append(new Token(TokenType.Identifier, "ex1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(175, 5, 20)})], location: new SourceLocation(176, 5, 21)}))
    }))
    node.append(new Node("AfterOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "AFTER", { keyword: Keyword.AFTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(179, 5, 24)})], location: new SourceLocation(180, 5, 25)}))
    }))
    node.append(new Node("InsertOnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "INSERT", { keyword: Keyword.INSERT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(185, 5, 30)})], location: new SourceLocation(186, 5, 31)}))
      node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(192, 5, 37)})], location: new SourceLocation(193, 5, 38)}))
      node.append(new Node("SchemaName").apply(node => {
        node.data = {"value":"main"}
        node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(195, 5, 40)})], location: new SourceLocation(196, 5, 41)}))
      }))
      node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(200, 5, 45)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"tab1"}
        node.append(new Token(TokenType.Identifier, "tab1", { location: new SourceLocation(201, 5, 46)}))
      }))
    }))
    node.append(new Node("BeginStatement").apply(node => {
      node.append(new Node("BeginBlock").apply(node => {
        node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(205, 5, 50)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(211, 5, 56)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(212, 5, 57)})], location: new SourceLocation(206, 5, 51)}))
        node.append(new Node("InsertStatement").apply(node => {
          node.append(new Node("InsertClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "INSERT", { keyword: Keyword.INSERT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(213, 6, 1)})], location: new SourceLocation(215, 6, 3)}))
            node.append(new Token(TokenType.Reserved, "INTO", { keyword: Keyword.INTO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(221, 6, 9)})], location: new SourceLocation(222, 6, 10)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"sample"}
              node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(226, 6, 14)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(233, 6, 21)})], location: new SourceLocation(227, 6, 15)}))
            }))
            node.append(new Node("ColumnList").apply(node => {
              node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(234, 6, 22)}))
              node.append(new Node("ColumnName").apply(node => {
                node.data = {"value":"x"}
                node.append(new Token(TokenType.Identifier, "x", { location: new SourceLocation(235, 6, 23)}))
              }))
              node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(236, 6, 24)}))
            }))
            node.append(new Node("ValuesClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "VALUES", { keyword: Keyword.VALUES, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(237, 6, 25)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(244, 6, 32)})], location: new SourceLocation(238, 6, 26)}))
              node.append(new Node("ExpressionList").apply(node => {
                node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(245, 6, 33)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"NEW"}
                    node.append(new Token(TokenType.Identifier, "NEW", { keyword: Keyword.NEW, location: new SourceLocation(246, 6, 34)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(249, 6, 37)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { location: new SourceLocation(250, 6, 38)}))
                  }))
                }))
                node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(251, 6, 39)}))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.SemiColon, ";", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(253, 6, 41)})], location: new SourceLocation(252, 6, 40)}))
        node.append(new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(254, 7, 1)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(258, 7, 5)})], location: new SourceLocation(257, 7, 4)}))
  node.append(new Node("CreateTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(259, 8, 1)}))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(265, 8, 7)})], location: new SourceLocation(266, 8, 8)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"cust_addr_chng"}
      node.append(new Token(TokenType.Identifier, "cust_addr_chng", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(273, 8, 15)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(288, 8, 30)})], location: new SourceLocation(274, 8, 16)}))
    }))
    node.append(new Node("InsteadOfOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "INSTEAD", { keyword: Keyword.INSTEAD, location: new SourceLocation(289, 9, 1)}))
      node.append(new Token(TokenType.Identifier, "OF", { keyword: Keyword.OF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(296, 9, 8)})], location: new SourceLocation(297, 9, 9)}))
    }))
    node.append(new Node("UpdateOnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(299, 9, 11)})], location: new SourceLocation(300, 9, 12)}))
      node.append(new Node("ColumnList").apply(node => {
        node.append(new Token(TokenType.Identifier, "OF", { keyword: Keyword.OF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(306, 9, 18)})], location: new SourceLocation(307, 9, 19)}))
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"cust_addr"}
          node.append(new Token(TokenType.Identifier, "cust_addr", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(309, 9, 21)})], location: new SourceLocation(310, 9, 22)}))
        }))
      }))
      node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(319, 9, 31)})], location: new SourceLocation(320, 9, 32)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"customer_address"}
        node.append(new Token(TokenType.Identifier, "customer_address", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(322, 9, 34)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(339, 9, 51)})], location: new SourceLocation(323, 9, 35)}))
      }))
    }))
    node.append(new Node("BeginStatement").apply(node => {
      node.append(new Node("BeginBlock").apply(node => {
        node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(345, 10, 6)})], location: new SourceLocation(340, 10, 1)}))
        node.append(new Node("UpdateStatement").apply(node => {
          node.append(new Node("UpdateClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(346, 11, 1)})], location: new SourceLocation(348, 11, 3)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"customer"}
              node.append(new Token(TokenType.Identifier, "customer", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(354, 11, 9)})], location: new SourceLocation(355, 11, 10)}))
            }))
            node.append(new Node("SetClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(363, 11, 18)})], location: new SourceLocation(364, 11, 19)}))
              node.append(new Node("ColumnAssignment").apply(node => {
                node.append(new Node("ColumnName").apply(node => {
                  node.data = {"value":"cust_addr"}
                  node.append(new Token(TokenType.Identifier, "cust_addr", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(367, 11, 22)})], location: new SourceLocation(368, 11, 23)}))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(377, 11, 32)}))
                node.append(new Node("ColumnValue").apply(node => {
                  node.append(new Node("ColumnReference").apply(node => {
                    node.append(new Node("ObjectName").apply(node => {
                      node.data = {"value":"NEW"}
                      node.append(new Token(TokenType.Identifier, "NEW", { keyword: Keyword.NEW, location: new SourceLocation(378, 11, 33)}))
                    }))
                    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(381, 11, 36)}))
                    node.append(new Node("ColumnName").apply(node => {
                      node.data = {"value":"cust_addr"}
                      node.append(new Token(TokenType.Identifier, "cust_addr", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(391, 11, 46)})], location: new SourceLocation(382, 11, 37)}))
                    }))
                  }))
                }))
              }))
            }))
            node.append(new Node("WhereClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(392, 12, 1)})], location: new SourceLocation(395, 12, 4)}))
              node.append(new Node("EqualOperation").apply(node => {
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"cust_id"}
                    node.append(new Token(TokenType.Identifier, "cust_id", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(400, 12, 9)})], location: new SourceLocation(401, 12, 10)}))
                  }))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(408, 12, 17)}))
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"OLD"}
                    node.append(new Token(TokenType.Identifier, "OLD", { keyword: Keyword.OLD, location: new SourceLocation(409, 12, 18)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(412, 12, 21)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"cust_id"}
                    node.append(new Token(TokenType.Identifier, "cust_id", { location: new SourceLocation(413, 12, 22)}))
                  }))
                }))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.SemiColon, ";", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(421, 12, 30)})], location: new SourceLocation(420, 12, 29)}))
        node.append(new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(422, 13, 1)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(426, 13, 5)})], location: new SourceLocation(425, 13, 4)}))
  node.append(new Node("CreateTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(427, 14, 1)}))
    node.append(new Node("TemporaryOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "TEMP", { keyword: Keyword.TEMP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(433, 14, 7)})], location: new SourceLocation(434, 14, 8)}))
    }))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(438, 14, 12)})], location: new SourceLocation(439, 14, 13)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"ex2"}
      node.append(new Token(TokenType.Identifier, "ex2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(446, 14, 20)})], location: new SourceLocation(447, 14, 21)}))
    }))
    node.append(new Node("BeforeOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "BEFORE", { keyword: Keyword.BEFORE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(450, 14, 24)})], location: new SourceLocation(451, 14, 25)}))
    }))
    node.append(new Node("InsertOnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "INSERT", { keyword: Keyword.INSERT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(457, 14, 31)})], location: new SourceLocation(458, 14, 32)}))
      node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(464, 14, 38)})], location: new SourceLocation(465, 14, 39)}))
      node.append(new Node("SchemaName").apply(node => {
        node.data = {"value":"main"}
        node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(467, 14, 41)})], location: new SourceLocation(468, 14, 42)}))
      }))
      node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(472, 14, 46)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"tab1"}
        node.append(new Token(TokenType.Identifier, "tab1", { location: new SourceLocation(473, 14, 47)}))
      }))
    }))
    node.append(new Node("BeginStatement").apply(node => {
      node.append(new Node("BeginBlock").apply(node => {
        node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(477, 14, 51)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(483, 14, 57)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(484, 14, 58)})], location: new SourceLocation(478, 14, 52)}))
        node.append(new Node("DeleteStatement").apply(node => {
          node.append(new Node("DeleteClause").apply(node => {
            node.append(new Token(TokenType.Reserved, "DELETE", { keyword: Keyword.DELETE, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(485, 15, 1)})], location: new SourceLocation(487, 15, 3)}))
            node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(493, 15, 9)})], location: new SourceLocation(494, 15, 10)}))
            node.append(new Node("ObjectName").apply(node => {
              node.data = {"value":"sample"}
              node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(498, 15, 14)})], location: new SourceLocation(499, 15, 15)}))
            }))
            node.append(new Node("WhereClause").apply(node => {
              node.append(new Token(TokenType.Reserved, "WHERE", { keyword: Keyword.WHERE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(505, 15, 21)})], location: new SourceLocation(506, 15, 22)}))
              node.append(new Node("EqualOperation").apply(node => {
                node.append(new Node("ColumnReference").apply(node => {
                  node.append(new Node("ObjectName").apply(node => {
                    node.data = {"value":"OLD"}
                    node.append(new Token(TokenType.Identifier, "OLD", { keyword: Keyword.OLD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(511, 15, 27)})], location: new SourceLocation(512, 15, 28)}))
                  }))
                  node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(515, 15, 31)}))
                  node.append(new Node("ColumnName").apply(node => {
                    node.data = {"value":"x"}
                    node.append(new Token(TokenType.Identifier, "x", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(517, 15, 33)})], location: new SourceLocation(516, 15, 32)}))
                  }))
                }))
                node.append(new Token(TokenType.Operator, "=", { location: new SourceLocation(518, 15, 34)}))
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"1"}
                  node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(519, 15, 35)})], location: new SourceLocation(520, 15, 36)}))
                }))
              }))
            }))
          }))
        }))
        node.append(new Token(TokenType.SemiColon, ";", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(522, 15, 38)})], location: new SourceLocation(521, 15, 37)}))
        node.append(new Token(TokenType.Identifier, "END", { keyword: Keyword.END, location: new SourceLocation(523, 16, 1)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(526, 16, 4)}))
})
