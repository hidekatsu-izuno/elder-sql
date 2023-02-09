import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("CreateTableStatement")).apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, preskips: [new Token(TokenType.BlockComment, "/* test table_1 */", { location: new SourceLocation(0, 1, 0)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(18, 1, 18)})], location: new SourceLocation(19, 2, 1)}))
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(25, 2, 7)})], location: new SourceLocation(26, 2, 8)}))
    node.append(new Node("SchemaName")).apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(31, 2, 13)})], location: new SourceLocation(32, 2, 14)}))
    })
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(36, 2, 18)}))
    node.append(new Node("ObjectName")).apply(node => {
      node.data = {"value":"table_1"}
      node.append(new Token(TokenType.Identifier, "table_1", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(44, 2, 26)})], location: new SourceLocation(37, 2, 19)}))
    })
    node.append(new Token(TokenType.LeftParen, "(", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(46, 2, 28)})], location: new SourceLocation(45, 2, 27)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"text_column"}
        node.append(new Token(TokenType.Identifier, "text_column", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(47, 3, 1)})], location: new SourceLocation(49, 3, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"TEXT"}
          node.append(new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(60, 3, 14)})], location: new SourceLocation(61, 3, 15)}))
        })
      })
      node.append(new Node("ColumnConstraint")).apply(node => {
        node.append(new Node("NotNullConstraint")).apply(node => {
          node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(65, 3, 19)})], location: new SourceLocation(66, 3, 20)}))
          node.append(new Token(TokenType.Reserved, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(69, 3, 23)})], location: new SourceLocation(70, 3, 24)}))
        })
      })
      node.append(new Node("ColumnConstraint")).apply(node => {
        node.append(new Node("PrimaryKeyConstraint")).apply(node => {
          node.append(new Token(TokenType.Reserved, "PRIMARY", { keyword: Keyword.PRIMARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(74, 3, 28)})], location: new SourceLocation(75, 3, 29)}))
          node.append(new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(82, 3, 36)})], location: new SourceLocation(83, 3, 37)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(87, 3, 41)}), new Token(TokenType.LineComment, "-- text affinity", { location: new SourceLocation(88, 3, 42)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(104, 3, 58)})], location: new SourceLocation(86, 3, 40)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"num_column"}
        node.append(new Token(TokenType.Identifier, "num_column", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(105, 4, 1)})], location: new SourceLocation(107, 4, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"NUMERIC"}
          node.append(new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(117, 4, 13)})], location: new SourceLocation(118, 4, 14)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(126, 4, 22)}), new Token(TokenType.LineComment, "-- numeric affinity", { location: new SourceLocation(127, 4, 23)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(146, 4, 42)})], location: new SourceLocation(125, 4, 21)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"int_column"}
        node.append(new Token(TokenType.Identifier, "int_column", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(147, 5, 1)})], location: new SourceLocation(149, 5, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"INTEGER"}
          node.append(new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(159, 5, 13)})], location: new SourceLocation(160, 5, 14)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(168, 5, 22)}), new Token(TokenType.LineComment, "-- integer affinity", { location: new SourceLocation(169, 5, 23)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(188, 5, 42)})], location: new SourceLocation(167, 5, 21)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"real_column"}
        node.append(new Token(TokenType.Identifier, "real_column", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(189, 6, 1)})], location: new SourceLocation(191, 6, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"INTEGER"}
          node.append(new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(202, 6, 14)})], location: new SourceLocation(203, 6, 15)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(211, 6, 23)}), new Token(TokenType.LineComment, "-- real affinity", { location: new SourceLocation(212, 6, 24)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(228, 6, 40)})], location: new SourceLocation(210, 6, 22)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"blob_column"}
        node.append(new Token(TokenType.Identifier, "blob_column", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(229, 7, 1)})], location: new SourceLocation(231, 7, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"BLOB"}
          node.append(new Token(TokenType.Identifier, "BLOB", { keyword: Keyword.BLOB, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(242, 7, 14)})], location: new SourceLocation(243, 7, 15)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(248, 7, 20)}), new Token(TokenType.LineComment, "-- no affinity", { location: new SourceLocation(251, 7, 23)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(265, 7, 37)})], location: new SourceLocation(247, 7, 19)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"no_affinity_column"}
        node.append(new Token(TokenType.Identifier, "no_affinity_column", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(266, 8, 1)})], postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(286, 8, 21)}), new Token(TokenType.LineComment, "-- no affinity", { location: new SourceLocation(288, 8, 23)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(302, 8, 37)})], location: new SourceLocation(268, 8, 3)}))
      })
    })
    node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(303, 9, 1)}))
    node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.BlockComment, "/* test table_2 */", { location: new SourceLocation(307, 11, 1)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(325, 11, 19)})], location: new SourceLocation(304, 9, 2)}))
  })
  node.append(new Node("CreateTableStatement")).apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(326, 12, 1)}))
    node.append(new Node("TemporaryOption")).apply(node => {
      node.append(new Token(TokenType.Identifier, "temp", { keyword: Keyword.TEMP, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(332, 12, 7)})], location: new SourceLocation(333, 12, 8)}))
    })
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(337, 12, 12)})], location: new SourceLocation(338, 12, 13)}))
    node.append(new Node("ObjectName")).apply(node => {
      node.data = {"value":"table_2"}
      node.append(new Token(TokenType.Identifier, "table_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(343, 12, 18)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(351, 12, 26)})], location: new SourceLocation(344, 12, 19)}))
    })
    node.append(new Token(TokenType.LeftParen, "(", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(353, 12, 28)})], location: new SourceLocation(352, 12, 27)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"text_column"}
        node.append(new Token(TokenType.Identifier, "\"text_column\"", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(354, 13, 1)})], location: new SourceLocation(356, 13, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"TEXT"}
          node.append(new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(369, 13, 16)})], location: new SourceLocation(370, 13, 17)}))
        })
      })
      node.append(new Node("ColumnConstraint")).apply(node => {
        node.append(new Node("NotNullConstraint")).apply(node => {
          node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(374, 13, 21)})], location: new SourceLocation(375, 13, 22)}))
          node.append(new Token(TokenType.Reserved, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(378, 13, 25)})], location: new SourceLocation(379, 13, 26)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(384, 13, 31)}), new Token(TokenType.BlockComment, "/*text affinity*/", { location: new SourceLocation(385, 13, 32)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(402, 13, 49)})], location: new SourceLocation(383, 13, 30)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"num_column"}
        node.append(new Token(TokenType.Identifier, "[num_column]", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(403, 14, 1)})], location: new SourceLocation(405, 14, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"NUMERIC"}
          node.append(new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(417, 14, 15)})], location: new SourceLocation(418, 14, 16)}))
        })
      })
      node.append(new Node("ColumnConstraint")).apply(node => {
        node.append(new Node("NotNullConstraint")).apply(node => {
          node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(425, 14, 23)})], location: new SourceLocation(426, 14, 24)}))
          node.append(new Token(TokenType.Reserved, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(429, 14, 27)})], location: new SourceLocation(430, 14, 28)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(435, 14, 33)}), new Token(TokenType.BlockComment, "/*numeric affinity*/", { location: new SourceLocation(436, 14, 34)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(456, 14, 54)})], location: new SourceLocation(434, 14, 32)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"int_column"}
        node.append(new Token(TokenType.Identifier, "`int_column`", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(457, 15, 1)})], location: new SourceLocation(459, 15, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"INTEGER"}
          node.append(new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(471, 15, 15)})], location: new SourceLocation(472, 15, 16)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(480, 15, 24)}), new Token(TokenType.BlockComment, "/*integer affinity*/", { location: new SourceLocation(481, 15, 25)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(501, 15, 45)})], location: new SourceLocation(479, 15, 23)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"real_column"}
        node.append(new Token(TokenType.Identifier, "\"real_column\"", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(502, 16, 1)})], location: new SourceLocation(504, 16, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"INTEGER"}
          node.append(new Token(TokenType.Identifier, "INTEGER", { keyword: Keyword.INTEGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(517, 16, 16)})], location: new SourceLocation(518, 16, 17)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(526, 16, 25)}), new Token(TokenType.BlockComment, "/*real affinity*/", { location: new SourceLocation(527, 16, 26)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(544, 16, 43)})], location: new SourceLocation(525, 16, 24)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"blob_column"}
        node.append(new Token(TokenType.Identifier, "[blob_column]", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(545, 17, 1)})], location: new SourceLocation(547, 17, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"BLOB"}
          node.append(new Token(TokenType.Identifier, "BLOB", { keyword: Keyword.BLOB, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(560, 17, 16)})], location: new SourceLocation(561, 17, 17)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, "   ", { location: new SourceLocation(566, 17, 22)}), new Token(TokenType.BlockComment, "/*no affinity*/", { location: new SourceLocation(569, 17, 25)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(584, 17, 40)})], location: new SourceLocation(565, 17, 21)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"no_affinity_column"}
        node.append(new Token(TokenType.Identifier, "`no_affinity_column`", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(585, 18, 1)})], location: new SourceLocation(587, 18, 3)}))
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(608, 18, 24)}), new Token(TokenType.BlockComment, "/*no affinity*/", { location: new SourceLocation(610, 18, 26)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(625, 18, 41)})], location: new SourceLocation(607, 18, 23)}))
    node.append(new Node("TableConstraint")).apply(node => {
      node.append(new Node("PrimaryKeyConstraint")).apply(node => {
        node.append(new Token(TokenType.Reserved, "PRIMARY", { keyword: Keyword.PRIMARY, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(626, 19, 1)})], location: new SourceLocation(628, 19, 3)}))
        node.append(new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(635, 19, 10)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(639, 19, 14)})], location: new SourceLocation(636, 19, 11)}))
        node.append(new Node("SortingColumnList")).apply(node => {
          node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(640, 19, 15)}))
          node.append(new Node("SortingColumn")).apply(node => {
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"text_column"}
              node.append(new Token(TokenType.Identifier, "text_column", { location: new SourceLocation(641, 19, 16)}))
            })
          })
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(652, 19, 27)}))
          node.append(new Node("SortingColumn")).apply(node => {
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"num_column"}
              node.append(new Token(TokenType.Identifier, "num_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(653, 19, 28)})], location: new SourceLocation(654, 19, 29)}))
            })
          })
          node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(665, 19, 40)})], location: new SourceLocation(664, 19, 39)}))
        })
      })
    })
    node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(667, 20, 2)})], location: new SourceLocation(666, 20, 1)}))
    node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.BlockComment, "/* test table_3 */", { location: new SourceLocation(670, 22, 1)}), new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(688, 22, 19)})], location: new SourceLocation(668, 21, 1)}))
  })
  node.append(new Node("CreateTableStatement")).apply(node => {
    node.append(new Token(TokenType.Reserved, "CREATE", { keyword: Keyword.CREATE, location: new SourceLocation(689, 23, 1)}))
    node.append(new Node("TemporaryOption")).apply(node => {
      node.append(new Token(TokenType.Reserved, "temporary", { keyword: Keyword.TEMPORARY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(695, 23, 7)})], location: new SourceLocation(696, 23, 8)}))
    })
    node.append(new Token(TokenType.Reserved, "TABLE", { keyword: Keyword.TABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(705, 23, 17)})], location: new SourceLocation(706, 23, 18)}))
    node.append(new Node("ObjectName")).apply(node => {
      node.data = {"value":"table_3"}
      node.append(new Token(TokenType.Identifier, "table_3", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(711, 23, 23)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(719, 23, 31)})], location: new SourceLocation(712, 23, 24)}))
    })
    node.append(new Token(TokenType.LeftParen, "(", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(721, 23, 33)})], location: new SourceLocation(720, 23, 32)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"col_1"}
        node.append(new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(722, 24, 1)})], location: new SourceLocation(724, 24, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"TEXT"}
          node.append(new Token(TokenType.Identifier, "TEXT", { keyword: Keyword.TEXT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(729, 24, 8)})], location: new SourceLocation(730, 24, 9)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(735, 24, 14)})], location: new SourceLocation(734, 24, 13)}))
    node.append(new Node("TableColumn")).apply(node => {
      node.append(new Node("ColumnName")).apply(node => {
        node.data = {"value":"col_2"}
        node.append(new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(736, 25, 1)})], location: new SourceLocation(738, 25, 3)}))
      })
      node.append(new Node("ColumnType")).apply(node => {
        node.append(new Node("TypeName")).apply(node => {
          node.data = {"value":"NUMERIC"}
          node.append(new Token(TokenType.Identifier, "NUMERIC", { keyword: Keyword.NUMERIC, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(743, 25, 8)})], location: new SourceLocation(744, 25, 9)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(752, 25, 17)})], location: new SourceLocation(751, 25, 16)}))
    node.append(new Node("TableConstraint")).apply(node => {
      node.append(new Token(TokenType.Reserved, "CONSTRAINT", { keyword: Keyword.CONSTRAINT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(753, 26, 1)})], location: new SourceLocation(755, 26, 3)}))
      node.append(new Node("ConstraintName")).apply(node => {
        node.data = {"value":"c_001"}
        node.append(new Token(TokenType.Identifier, "c_001", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(765, 26, 13)})], location: new SourceLocation(766, 26, 14)}))
      })
      node.append(new Node("UniqueConstraint")).apply(node => {
        node.append(new Token(TokenType.Reserved, "UNIQUE", { keyword: Keyword.UNIQUE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(771, 26, 19)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(778, 26, 26)})], location: new SourceLocation(772, 26, 20)}))
        node.append(new Node("SortingColumnList")).apply(node => {
          node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(779, 26, 27)}))
          node.append(new Node("SortingColumn")).apply(node => {
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"col_1"}
              node.append(new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(780, 26, 28)})], location: new SourceLocation(781, 26, 29)}))
            })
          })
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(786, 26, 34)}))
          node.append(new Node("SortingColumn")).apply(node => {
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"col_2"}
              node.append(new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(787, 26, 35)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(793, 26, 41)})], location: new SourceLocation(788, 26, 36)}))
            })
          })
          node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(794, 26, 42)}))
        })
        node.append(new Node("RollbackOption")).apply(node => {
          node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(795, 26, 43)})], location: new SourceLocation(796, 26, 44)}))
          node.append(new Token(TokenType.Identifier, "CONFLICT", { keyword: Keyword.CONFLICT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(798, 26, 46)})], location: new SourceLocation(799, 26, 47)}))
          node.append(new Token(TokenType.Identifier, "ROLLBACK", { keyword: Keyword.ROLLBACK, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(807, 26, 55)})], location: new SourceLocation(808, 26, 56)}))
        })
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(817, 26, 65)})], location: new SourceLocation(816, 26, 64)}))
    node.append(new Node("TableConstraint")).apply(node => {
      node.append(new Token(TokenType.Reserved, "CONSTRAINT", { keyword: Keyword.CONSTRAINT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(818, 27, 1)})], location: new SourceLocation(820, 27, 3)}))
      node.append(new Node("ConstraintName")).apply(node => {
        node.data = {"value":"c_002"}
        node.append(new Token(TokenType.Identifier, "c_002", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(830, 27, 13)})], location: new SourceLocation(831, 27, 14)}))
      })
      node.append(new Node("CheckConstraint")).apply(node => {
        node.append(new Token(TokenType.Reserved, "CHECK", { keyword: Keyword.CHECK, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(836, 27, 19)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(842, 27, 25)})], location: new SourceLocation(837, 27, 20)}))
        node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(843, 27, 26)}))
        node.append(new Node("AddOperation")).apply(node => {
          node.append(new Node("ColumnReference")).apply(node => {
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"col_1"}
              node.append(new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(844, 27, 27)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(850, 27, 33)})], location: new SourceLocation(845, 27, 28)}))
            })
          })
          node.append(new Token(TokenType.Operator, "+", { location: new SourceLocation(851, 27, 34)}))
          node.append(new Node("GreaterThanOperation")).apply(node => {
            node.append(new Node("ColumnReference")).apply(node => {
              node.append(new Node("ColumnName")).apply(node => {
                node.data = {"value":"col_2"}
                node.append(new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(852, 27, 35)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(858, 27, 41)})], location: new SourceLocation(853, 27, 36)}))
              })
            })
            node.append(new Token(TokenType.Operator, ">", { location: new SourceLocation(859, 27, 42)}))
            node.append(new Node("NumericLiteral")).apply(node => {
              node.data = {"value":"0"}
              node.append(new Token(TokenType.Numeric, "0", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(860, 27, 43)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(862, 27, 45)})], location: new SourceLocation(861, 27, 44)}))
            })
          })
        })
        node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(863, 27, 46)}))
      })
    })
    node.append(new Token(TokenType.Comma, ",", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(865, 27, 48)})], location: new SourceLocation(864, 27, 47)}))
    node.append(new Node("TableConstraint")).apply(node => {
      node.append(new Token(TokenType.Reserved, "CONSTRAINT", { keyword: Keyword.CONSTRAINT, preskips: [new Token(TokenType.WhiteSpace, "  ", { location: new SourceLocation(866, 28, 1)})], location: new SourceLocation(868, 28, 3)}))
      node.append(new Node("ConstraintName")).apply(node => {
        node.data = {"value":"c_003"}
        node.append(new Token(TokenType.Identifier, "c_003", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(878, 28, 13)})], location: new SourceLocation(879, 28, 14)}))
      })
      node.append(new Node("ForeignKeyConstraint")).apply(node => {
        node.append(new Token(TokenType.Reserved, "FOREIGN", { keyword: Keyword.FOREIGN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(884, 28, 19)})], location: new SourceLocation(885, 28, 20)}))
        node.append(new Token(TokenType.Identifier, "KEY", { keyword: Keyword.KEY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(892, 28, 27)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(896, 28, 31)})], location: new SourceLocation(893, 28, 28)}))
        node.append(new Node("ColumnList")).apply(node => {
          node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(897, 28, 32)}))
          node.append(new Node("ColumnName")).apply(node => {
            node.data = {"value":"col_1"}
            node.append(new Token(TokenType.Identifier, "col_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(898, 28, 33)})], location: new SourceLocation(899, 28, 34)}))
          })
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(904, 28, 39)}))
          node.append(new Node("ColumnName")).apply(node => {
            node.data = {"value":"col_2"}
            node.append(new Token(TokenType.Identifier, "col_2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(905, 28, 40)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(911, 28, 46)})], location: new SourceLocation(906, 28, 41)}))
          })
          node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(913, 28, 48)})], location: new SourceLocation(912, 28, 47)}))
        })
        node.append(new Node("ReferencesClause")).apply(node => {
          node.append(new Token(TokenType.Reserved, "REFERENCES", { keyword: Keyword.REFERENCES, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(914, 29, 1)})], location: new SourceLocation(918, 29, 5)}))
          node.append(new Node("ObjectName")).apply(node => {
            node.data = {"value":"table_1"}
            node.append(new Token(TokenType.Identifier, "table_1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(928, 29, 15)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(936, 29, 23)})], location: new SourceLocation(929, 29, 16)}))
          })
          node.append(new Node("ColumnList")).apply(node => {
            node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(937, 29, 24)}))
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"text_column"}
              node.append(new Token(TokenType.Identifier, "text_column", { location: new SourceLocation(938, 29, 25)}))
            })
            node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(949, 29, 36)}))
            node.append(new Node("ColumnName")).apply(node => {
              node.data = {"value":"num_column"}
              node.append(new Token(TokenType.Identifier, "num_column", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(950, 29, 37)})], location: new SourceLocation(951, 29, 38)}))
            })
            node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(962, 29, 49)})], location: new SourceLocation(961, 29, 48)}))
          })
          node.append(new Node("OnDeleteClause")).apply(node => {
            node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(963, 30, 1)})], location: new SourceLocation(967, 30, 5)}))
            node.append(new Token(TokenType.Reserved, "DELETE", { keyword: Keyword.DELETE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(969, 30, 7)})], location: new SourceLocation(970, 30, 8)}))
            node.append(new Node("SetNullOption")).apply(node => {
              node.append(new Token(TokenType.Reserved, "SET", { keyword: Keyword.SET, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(976, 30, 14)})], location: new SourceLocation(977, 30, 15)}))
              node.append(new Token(TokenType.Reserved, "NULL", { keyword: Keyword.NULL, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(980, 30, 18)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(985, 30, 23)})], location: new SourceLocation(981, 30, 19)}))
            })
          })
          node.append(new Node("MatchSimpleOption")).apply(node => {
            node.append(new Token(TokenType.Identifier, "MATCH", { keyword: Keyword.MATCH, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(986, 31, 1)})], location: new SourceLocation(990, 31, 5)}))
            node.append(new Token(TokenType.Identifier, "SIMPLE", { keyword: Keyword.SIMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(995, 31, 10)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1002, 31, 17)})], location: new SourceLocation(996, 31, 11)}))
          })
          node.append(new Node("OnUpdateClause")).apply(node => {
            node.append(new Token(TokenType.Reserved, "ON", { keyword: Keyword.ON, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(1003, 32, 1)})], location: new SourceLocation(1007, 32, 5)}))
            node.append(new Token(TokenType.Reserved, "UPDATE", { keyword: Keyword.UPDATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1009, 32, 7)})], location: new SourceLocation(1010, 32, 8)}))
            node.append(new Node("CascadeOption")).apply(node => {
              node.append(new Token(TokenType.Identifier, "CASCADE", { keyword: Keyword.CASCADE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1016, 32, 14)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1024, 32, 22)})], location: new SourceLocation(1017, 32, 15)}))
            })
          })
          node.append(new Node("NotDeferrableOption")).apply(node => {
            node.append(new Token(TokenType.Reserved, "NOT", { keyword: Keyword.NOT, preskips: [new Token(TokenType.WhiteSpace, "    ", { location: new SourceLocation(1025, 33, 1)})], location: new SourceLocation(1029, 33, 5)}))
            node.append(new Token(TokenType.Reserved, "DEFERRABLE", { keyword: Keyword.DEFERRABLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1032, 33, 8)})], location: new SourceLocation(1033, 33, 9)}))
            node.append(new Node("InitiallyDeferredOption")).apply(node => {
              node.append(new Token(TokenType.Identifier, "INITIALLY", { keyword: Keyword.INITIALLY, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1043, 33, 19)})], location: new SourceLocation(1044, 33, 20)}))
              node.append(new Token(TokenType.Identifier, "DEFERRED", { keyword: Keyword.DEFERRED, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(1053, 33, 29)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1062, 33, 38)})], location: new SourceLocation(1054, 33, 30)}))
            })
          })
        })
      })
    })
    node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(1064, 34, 2)})], location: new SourceLocation(1063, 34, 1)}))
    node.append(new Token(TokenType.EoF, "", { eos: true, location: new SourceLocation(1065, 35, 1)}))
  })
})
