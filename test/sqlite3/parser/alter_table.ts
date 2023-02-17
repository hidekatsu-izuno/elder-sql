import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(0, 1, 0)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(5, 1, 5)})], location: new SourceLocation(6, 1, 6)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(11, 1, 11)})], location: new SourceLocation(12, 1, 12)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(16, 1, 16)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(17, 1, 17)}))
    }))
    node.append(new Node("RenameToObjectClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "RENAME", { keyword: Keyword.RENAME, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(23, 1, 23)})], location: new SourceLocation(24, 1, 24)}))
      node.append(new Token(TokenType.Reserved, "TO", { keyword: Keyword.TO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(30, 1, 30)})], location: new SourceLocation(31, 1, 31)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"new_table"}
        node.append(new Token(TokenType.Identifier, "new_table", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(33, 1, 33)})], location: new SourceLocation(34, 1, 34)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(44, 1, 44)})], location: new SourceLocation(43, 1, 43)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(45, 2, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(50, 2, 6)})], location: new SourceLocation(51, 2, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(56, 2, 12)})], location: new SourceLocation(57, 2, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(61, 2, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(62, 2, 18)}))
    }))
    node.append(new Node("RenameColumnClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "RENAME", { keyword: Keyword.RENAME, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(68, 2, 24)})], location: new SourceLocation(69, 2, 25)}))
      node.append(new Token(TokenType.Identifier, "COLUMN", { keyword: Keyword.COLUMN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(75, 2, 31)})], location: new SourceLocation(76, 2, 32)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"old_column"}
        node.append(new Token(TokenType.Identifier, "old_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(82, 2, 38)})], location: new SourceLocation(83, 2, 39)}))
      }))
      node.append(new Node("RenameToColumnClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "TO", { keyword: Keyword.TO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(93, 2, 49)})], location: new SourceLocation(94, 2, 50)}))
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(96, 2, 52)})], location: new SourceLocation(97, 2, 53)}))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(108, 2, 64)})], location: new SourceLocation(107, 2, 63)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(109, 3, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(114, 3, 6)})], location: new SourceLocation(115, 3, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(120, 3, 12)})], location: new SourceLocation(121, 3, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(125, 3, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(126, 3, 18)}))
    }))
    node.append(new Node("RenameColumnClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "RENAME", { keyword: Keyword.RENAME, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(132, 3, 24)})], location: new SourceLocation(133, 3, 25)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"old_column"}
        node.append(new Token(TokenType.Identifier, "old_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(139, 3, 31)})], location: new SourceLocation(140, 3, 32)}))
      }))
      node.append(new Node("RenameToColumnClause").apply(node => {
        node.append(new Token(TokenType.Reserved, "TO", { keyword: Keyword.TO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(150, 3, 42)})], location: new SourceLocation(151, 3, 43)}))
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(153, 3, 45)})], location: new SourceLocation(154, 3, 46)}))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(165, 3, 57)})], location: new SourceLocation(164, 3, 56)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(166, 4, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(171, 4, 6)})], location: new SourceLocation(172, 4, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(177, 4, 12)})], location: new SourceLocation(178, 4, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(182, 4, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(183, 4, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(189, 4, 24)})], location: new SourceLocation(190, 4, 25)}))
      node.append(new Token(TokenType.Identifier, "COLUMN", { keyword: Keyword.COLUMN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(193, 4, 28)})], location: new SourceLocation(194, 4, 29)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(200, 4, 35)})], location: new SourceLocation(201, 4, 36)}))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(212, 4, 47)})], location: new SourceLocation(211, 4, 46)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(213, 5, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(218, 5, 6)})], location: new SourceLocation(219, 5, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(224, 5, 12)})], location: new SourceLocation(225, 5, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(229, 5, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(230, 5, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(236, 5, 24)})], location: new SourceLocation(237, 5, 25)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(240, 5, 28)})], location: new SourceLocation(241, 5, 29)}))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(252, 5, 40)})], location: new SourceLocation(251, 5, 39)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(253, 6, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(258, 6, 6)})], location: new SourceLocation(259, 6, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(264, 6, 12)})], location: new SourceLocation(265, 6, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(269, 6, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(270, 6, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(276, 6, 24)})], location: new SourceLocation(277, 6, 25)}))
      node.append(new Token(TokenType.Identifier, "COLUMN", { keyword: Keyword.COLUMN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(280, 6, 28)})], location: new SourceLocation(281, 6, 29)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(287, 6, 35)})], location: new SourceLocation(288, 6, 36)}))
        }))
        node.append(new Node("ColumnConstraint").apply(node => {
          node.append(new Node("DefaultOption").apply(node => {
            node.append(new Token(TokenType.Reserved, "DEFAULT", { keyword: Keyword.DEFAULT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(298, 6, 46)})], location: new SourceLocation(299, 6, 47)}))
            node.append(new Node("Expression").apply(node => {
              node.append(new Node("NullLiteral").apply(node => {
                node.append(new Token(TokenType.Reserved, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(306, 6, 54)})], location: new SourceLocation(307, 6, 55)}))
              }))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(312, 6, 60)})], location: new SourceLocation(311, 6, 59)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(313, 7, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(318, 7, 6)})], location: new SourceLocation(319, 7, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(324, 7, 12)})], location: new SourceLocation(325, 7, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(329, 7, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(330, 7, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(336, 7, 24)})], location: new SourceLocation(337, 7, 25)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(340, 7, 28)})], location: new SourceLocation(341, 7, 29)}))
        }))
        node.append(new Node("ColumnConstraint").apply(node => {
          node.append(new Node("PrimaryKeyConstraint").apply(node => {
            node.append(new Token(TokenType.Reserved, "PRIMARY", { keyword: Keyword.PRIMARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(351, 7, 39)})], location: new SourceLocation(352, 7, 40)}))
            node.append(new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(359, 7, 47)})], location: new SourceLocation(360, 7, 48)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(364, 7, 52)})], location: new SourceLocation(363, 7, 51)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(365, 8, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(370, 8, 6)})], location: new SourceLocation(371, 8, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(376, 8, 12)})], location: new SourceLocation(377, 8, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(381, 8, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(382, 8, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(388, 8, 24)})], location: new SourceLocation(389, 8, 25)}))
      node.append(new Token(TokenType.Identifier, "COLUMN", { keyword: Keyword.COLUMN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(392, 8, 28)})], location: new SourceLocation(393, 8, 29)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(399, 8, 35)})], location: new SourceLocation(400, 8, 36)}))
        }))
        node.append(new Node("ColumnType").apply(node => {
          node.append(new Node("TypeName").apply(node => {
            node.data = {"value":"TEXT"}
            node.append(new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(410, 8, 46)})], location: new SourceLocation(411, 8, 47)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(416, 8, 52)})], location: new SourceLocation(415, 8, 51)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(417, 9, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(422, 9, 6)})], location: new SourceLocation(423, 9, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(428, 9, 12)})], location: new SourceLocation(429, 9, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(433, 9, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(434, 9, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(440, 9, 24)})], location: new SourceLocation(441, 9, 25)}))
      node.append(new Token(TokenType.Identifier, "COLUMN", { keyword: Keyword.COLUMN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(444, 9, 28)})], location: new SourceLocation(445, 9, 29)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(451, 9, 35)})], location: new SourceLocation(452, 9, 36)}))
        }))
        node.append(new Node("ColumnType").apply(node => {
          node.append(new Node("TypeName").apply(node => {
            node.data = {"value":"VARING CHARACTER"}
            node.append(new Token(TokenType.Identifier, "VARING", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(462, 9, 46)})], location: new SourceLocation(463, 9, 47)}))
            node.append(new Token(TokenType.Identifier, "CHARACTER", { keyword: Keyword.CHARACTER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(469, 9, 53)})], location: new SourceLocation(470, 9, 54)}))
          }))
        }))
        node.append(new Node("ColumnConstraint").apply(node => {
          node.append(new Node("GeneratedColumnOption").apply(node => {
            node.append(new Token(TokenType.Reserved, "GENERATED", { keyword: Keyword.GENERATED, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(479, 9, 63)})], location: new SourceLocation(480, 9, 64)}))
            node.append(new Token(TokenType.Reserved, "ALWAYS", { keyword: Keyword.ALWAYS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(489, 9, 73)})], location: new SourceLocation(490, 9, 74)}))
            node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(496, 9, 80)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(499, 9, 83)})], location: new SourceLocation(497, 9, 81)}))
            node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(500, 9, 84)}))
            node.append(new Node("GeneratedColumn").apply(node => {
              node.append(new Node("Expression").apply(node => {
                node.append(new Node("NumericLiteral").apply(node => {
                  node.data = {"value":"1"}
                  node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(501, 9, 85)}))
                }))
              }))
            }))
            node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(502, 9, 86)}))
            node.append(new Node("StoredOption").apply(node => {
              node.append(new Token(TokenType.Identifier, "STORED", { keyword: Keyword.STORED, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(503, 9, 87)})], location: new SourceLocation(504, 9, 88)}))
            }))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(511, 9, 95)})], location: new SourceLocation(510, 9, 94)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(512, 10, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(517, 10, 6)})], location: new SourceLocation(518, 10, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(523, 10, 12)})], location: new SourceLocation(524, 10, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(528, 10, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(529, 10, 18)}))
    }))
    node.append(new Node("AddColumnClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "ADD", { keyword: Keyword.ADD, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(535, 10, 24)})], location: new SourceLocation(536, 10, 25)}))
      node.append(new Node("TableColumn").apply(node => {
        node.append(new Node("ColumnName").apply(node => {
          node.data = {"value":"new_column"}
          node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(539, 10, 28)})], location: new SourceLocation(540, 10, 29)}))
        }))
        node.append(new Node("ColumnType").apply(node => {
          node.append(new Node("TypeName").apply(node => {
            node.data = {"value":"NUMERIC"}
            node.append(new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(550, 10, 39)})], location: new SourceLocation(551, 10, 40)}))
          }))
          node.append(new Node("TypeOptionList").apply(node => {
            node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(558, 10, 47)}))
            node.append(new Node("LengthOption").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"1"}
                node.append(new Token(TokenType.Numeric, "1", { location: new SourceLocation(559, 10, 48)}))
              }))
            }))
            node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(560, 10, 49)}))
            node.append(new Node("ScaleOption").apply(node => {
              node.append(new Node("NumericLiteral").apply(node => {
                node.data = {"value":"0"}
                node.append(new Token(TokenType.Numeric, "0", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(561, 10, 50)})], location: new SourceLocation(562, 10, 51)}))
              }))
            }))
            node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(563, 10, 52)}))
          }))
        }))
        node.append(new Node("ColumnConstraint").apply(node => {
          node.append(new Node("PrimaryKeyConstraint").apply(node => {
            node.append(new Token(TokenType.Reserved, "PRIMARY", { keyword: Keyword.PRIMARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(564, 10, 53)})], location: new SourceLocation(565, 10, 54)}))
            node.append(new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(572, 10, 61)})], location: new SourceLocation(573, 10, 62)}))
          }))
        }))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(577, 10, 66)})], location: new SourceLocation(576, 10, 65)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(578, 11, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(583, 11, 6)})], location: new SourceLocation(584, 11, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(589, 11, 12)})], location: new SourceLocation(590, 11, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(594, 11, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(595, 11, 18)}))
    }))
    node.append(new Node("DropColumnClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(601, 11, 24)})], location: new SourceLocation(602, 11, 25)}))
      node.append(new Token(TokenType.Identifier, "COLUMN", { keyword: Keyword.COLUMN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(606, 11, 29)})], location: new SourceLocation(607, 11, 30)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"new_column"}
        node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(613, 11, 36)})], location: new SourceLocation(614, 11, 37)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(625, 11, 48)})], location: new SourceLocation(624, 11, 47)}))
  node.append(new Node("AlterTableStatement").apply(node => {
    node.append(new Token(TokenType.Reserved, "ALTER", { keyword: Keyword.ALTER, location: new SourceLocation(626, 12, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(631, 12, 6)})], location: new SourceLocation(632, 12, 7)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(637, 12, 12)})], location: new SourceLocation(638, 12, 13)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(642, 12, 17)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"sample"}
      node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(643, 12, 18)}))
    }))
    node.append(new Node("DropColumnClause").apply(node => {
      node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(649, 12, 24)})], location: new SourceLocation(650, 12, 25)}))
      node.append(new Node("ColumnName").apply(node => {
        node.data = {"value":"new_column"}
        node.append(new Token(TokenType.Identifier, "new_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(654, 12, 29)})], location: new SourceLocation(655, 12, 30)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(665, 12, 40)}))
})
