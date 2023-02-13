import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("CreateViewStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(0, 1, 0)}))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(11, 1, 11)})], location: new SourceLocation(12, 1, 12)}))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(20, 1, 20)})], location: new SourceLocation(21, 1, 21)}))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(23, 1, 23)})], location: new SourceLocation(24, 1, 24)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(30, 1, 30)})], location: new SourceLocation(31, 1, 31)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(33, 1, 33)})], location: new SourceLocation(32, 1, 32)}))
  node.append(new Node("CreateViewStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(34, 2, 1)}))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 2, 7)})], location: new SourceLocation(41, 2, 8)}))
    node.append(new Node("IfNotExistsOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "IF", { keyword: Keyword.IF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(45, 2, 12)})], location: new SourceLocation(46, 2, 13)}))
      node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(48, 2, 15)})], location: new SourceLocation(49, 2, 16)}))
      node.append(new Token(TokenType.Reserved, "EXISTS", { keyword: Keyword.EXISTS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(52, 2, 19)})], location: new SourceLocation(53, 2, 20)}))
    }))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(59, 2, 26)})], location: new SourceLocation(60, 2, 27)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(64, 2, 31)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(73, 2, 40)})], location: new SourceLocation(65, 2, 32)}))
    }))
    node.append(new Node("ColumnList").apply(node => {
      node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(74, 2, 41)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"x"}
        node.append(new Token(TokenType.Identifier, "x", { location: new SourceLocation(75, 2, 42)}))
      }))
      node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(76, 2, 43)}))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(77, 2, 44)})], location: new SourceLocation(78, 2, 45)}))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(80, 2, 47)})], location: new SourceLocation(81, 2, 48)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(87, 2, 54)})], location: new SourceLocation(88, 2, 55)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(90, 2, 57)})], location: new SourceLocation(89, 2, 56)}))
  node.append(new Node("CreateViewStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(91, 3, 1)}))
    node.append(new Node("TemporaryOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "TEMP", { keyword: Keyword.TEMP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(97, 3, 7)})], location: new SourceLocation(98, 3, 8)}))
    }))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(102, 3, 12)})], location: new SourceLocation(103, 3, 13)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(107, 3, 17)})], location: new SourceLocation(108, 3, 18)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(112, 3, 22)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { location: new SourceLocation(113, 3, 23)}))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(121, 3, 31)})], location: new SourceLocation(122, 3, 32)}))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(124, 3, 34)})], location: new SourceLocation(125, 3, 35)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(131, 3, 41)})], location: new SourceLocation(132, 3, 42)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(134, 3, 44)})], location: new SourceLocation(133, 3, 43)}))
  node.append(new Node("CreateViewStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(135, 4, 1)}))
    node.append(new Node("TemporaryOption").apply(node => {
      node.append(new Token(TokenType.Reserved, "TEMPORARY", { keyword: Keyword.TEMPORARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(141, 4, 7)})], location: new SourceLocation(142, 4, 8)}))
    }))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(151, 4, 17)})], location: new SourceLocation(152, 4, 18)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(156, 4, 22)})], location: new SourceLocation(157, 4, 23)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(161, 4, 27)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(170, 4, 36)})], location: new SourceLocation(162, 4, 28)}))
    }))
    node.append(new Node("ColumnList").apply(node => {
      node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(171, 4, 37)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"a"}
        node.append(new Token(TokenType.Identifier, "a", { location: new SourceLocation(172, 4, 38)}))
      }))
      node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(173, 4, 39)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"b"}
        node.append(new Token(TokenType.Identifier, "b", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(174, 4, 40)})], location: new SourceLocation(175, 4, 41)}))
      }))
      node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(176, 4, 42)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"c"}
        node.append(new Token(TokenType.Identifier, "c", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(177, 4, 43)})], location: new SourceLocation(178, 4, 44)}))
      }))
      node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(179, 4, 45)}))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(180, 4, 46)})], location: new SourceLocation(181, 4, 47)}))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(183, 4, 49)})], location: new SourceLocation(184, 4, 50)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(190, 4, 56)})], location: new SourceLocation(191, 4, 57)}))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(192, 4, 58)}))
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"2"}
              node.append(new Token(TokenType.Numeric, "2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(193, 4, 59)})], location: new SourceLocation(194, 4, 60)}))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(195, 4, 61)}))
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"3"}
              node.append(new Token(TokenType.Numeric, "3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(196, 4, 62)})], location: new SourceLocation(197, 4, 63)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(199, 4, 65)})], location: new SourceLocation(198, 4, 64)}))
  node.append(new Node("CreateViewStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(200, 5, 1)}))
    node.append(new Node("TemporaryOption").apply(node => {
      node.append(new Token(TokenType.Reserved, "TEMPORARY", { keyword: Keyword.TEMPORARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(206, 5, 7)})], location: new SourceLocation(207, 5, 8)}))
    }))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(216, 5, 17)})], location: new SourceLocation(217, 5, 18)}))
    node.append(new Node("IfNotExistsOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "IF", { keyword: Keyword.IF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(221, 5, 22)})], location: new SourceLocation(222, 5, 23)}))
      node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(224, 5, 25)})], location: new SourceLocation(225, 5, 26)}))
      node.append(new Token(TokenType.Reserved, "EXISTS", { keyword: Keyword.EXISTS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(228, 5, 29)})], location: new SourceLocation(229, 5, 30)}))
    }))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(235, 5, 36)})], location: new SourceLocation(236, 5, 37)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(240, 5, 41)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { location: new SourceLocation(241, 5, 42)}))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(249, 5, 50)})], location: new SourceLocation(250, 5, 51)}))
    node.append(new Node("SelectStatement").apply(node => {
      node.append(new Node("SelectClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "SELECT", { keyword: Keyword.SELECT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(252, 5, 53)})], location: new SourceLocation(253, 5, 54)}))
        node.append(new Node("SelectColumnList").apply(node => {
          node.append(new Node("SelectColumn").apply(node => {
            node.append(new Node("NumericLiteral").apply(node => {
              node.data = {"value":"1"}
              node.append(new Token(TokenType.Numeric, "1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(259, 5, 60)})], location: new SourceLocation(260, 5, 61)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(262, 5, 63)})], location: new SourceLocation(261, 5, 62)}))
})
