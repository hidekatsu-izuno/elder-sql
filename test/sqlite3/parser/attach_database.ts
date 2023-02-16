import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("AttachDatabaseStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ATTACH", { keyword: Keyword.ATTACH, location: new SourceLocation(0, 1, 0)}))
    node.append(new Token(TokenType.Identifier, "DATABASE", { keyword: Keyword.DATABASE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}))
    node.append(new Node("DatabaseExpression").apply(node => {
      node.append(new Node("StringLiteral").apply(node => {
        node.data = {"value":":memory:"}
        node.append(new Token(TokenType.String, "':memory:'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(15, 1, 15)})], location: new SourceLocation(16, 1, 16)}))
      }))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(26, 1, 26)})], location: new SourceLocation(27, 1, 27)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"mem_db"}
      node.append(new Token(TokenType.Identifier, "mem_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(29, 1, 29)})], location: new SourceLocation(30, 1, 30)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(37, 1, 37)})], location: new SourceLocation(36, 1, 36)}))
  node.append(new Node("AttachDatabaseStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ATTACH", { keyword: Keyword.ATTACH, location: new SourceLocation(38, 2, 1)}))
    node.append(new Token(TokenType.Identifier, "DATABASE", { keyword: Keyword.DATABASE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(44, 2, 7)})], location: new SourceLocation(45, 2, 8)}))
    node.append(new Node("DatabaseExpression").apply(node => {
      node.append(new Node("StringLiteral").apply(node => {
        node.data = {"value":"new_database.db"}
        node.append(new Token(TokenType.String, "'new_database.db'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(53, 2, 16)})], location: new SourceLocation(54, 2, 17)}))
      }))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(71, 2, 34)})], location: new SourceLocation(72, 2, 35)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"new_db"}
      node.append(new Token(TokenType.Identifier, "new_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(74, 2, 37)})], location: new SourceLocation(75, 2, 38)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(82, 2, 45)})], location: new SourceLocation(81, 2, 44)}))
  node.append(new Node("AttachDatabaseStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ATTACH", { keyword: Keyword.ATTACH, location: new SourceLocation(83, 3, 1)}))
    node.append(new Token(TokenType.Identifier, "DATABASE", { keyword: Keyword.DATABASE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(89, 3, 7)})], location: new SourceLocation(90, 3, 8)}))
    node.append(new Node("DatabaseExpression").apply(node => {
      node.append(new Node("FunctionExpression").apply(node => {
        node.append(new Node("ObjectName").apply(node => {
          node.append(new Token(TokenType.Identifier, "CONCAT", { keyword: Keyword.CONCAT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(98, 3, 16)})], location: new SourceLocation(99, 3, 17)}))
        }))
        node.append(new Node("ArgumentList").apply(node => {
          node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(105, 3, 23)}))
          node.append(new Node("Argument").apply(node => {
            node.append(new Node("StringLiteral").apply(node => {
              node.data = {"value":"new_database"}
              node.append(new Token(TokenType.String, "'new_database'", { location: new SourceLocation(106, 3, 24)}))
            }))
          }))
          node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(120, 3, 38)}))
          node.append(new Node("Argument").apply(node => {
            node.append(new Node("StringLiteral").apply(node => {
              node.data = {"value":".db"}
              node.append(new Token(TokenType.String, "'.db'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(121, 3, 39)})], location: new SourceLocation(122, 3, 40)}))
            }))
          }))
          node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(127, 3, 45)}))
        }))
      }))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(128, 3, 46)})], location: new SourceLocation(129, 3, 47)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"new_db"}
      node.append(new Token(TokenType.Identifier, "new_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(131, 3, 49)})], location: new SourceLocation(132, 3, 50)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(139, 3, 57)})], location: new SourceLocation(138, 3, 56)}))
  node.append(new Node("AttachDatabaseStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ATTACH", { keyword: Keyword.ATTACH, location: new SourceLocation(140, 4, 1)}))
    node.append(new Token(TokenType.Identifier, "DATABASE", { keyword: Keyword.DATABASE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(146, 4, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(155, 4, 16)})], location: new SourceLocation(147, 4, 8)}))
    node.append(new Node("DatabaseExpression").apply(node => {
      node.append(new Node("Expression").apply(node => {
        node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(156, 4, 17)}))
        node.append(new Node("ConcatenateOperation").apply(node => {
          node.append(new Node("ConcatenateOperation").apply(node => {
            node.append(new Node("StringLiteral").apply(node => {
              node.data = {"value":"database_"}
              node.append(new Token(TokenType.String, "'database_'", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(168, 4, 29)})], location: new SourceLocation(157, 4, 18)}))
            }))
            node.append(new Token(TokenType.Operator, "||", { location: new SourceLocation(169, 4, 30)}))
            node.append(new Node("FunctionExpression").apply(node => {
              node.append(new Node("ObjectName").apply(node => {
                node.append(new Token(TokenType.Identifier, "strftime", { keyword: Keyword.STRFTIME, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(171, 4, 32)})], location: new SourceLocation(172, 4, 33)}))
              }))
              node.append(new Node("ArgumentList").apply(node => {
                node.append(new Token(TokenType.LeftParen, "(", { location: new SourceLocation(180, 4, 41)}))
                node.append(new Node("Argument").apply(node => {
                  node.append(new Node("StringLiteral").apply(node => {
                    node.data = {"value":"%Y%m%d"}
                    node.append(new Token(TokenType.String, "'%Y%m%d'", { location: new SourceLocation(181, 4, 42)}))
                  }))
                }))
                node.append(new Token(TokenType.Comma, ",", { location: new SourceLocation(189, 4, 50)}))
                node.append(new Node("Argument").apply(node => {
                  node.append(new Node("StringLiteral").apply(node => {
                    node.data = {"value":"now"}
                    node.append(new Token(TokenType.String, "'now'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(190, 4, 51)})], location: new SourceLocation(191, 4, 52)}))
                  }))
                }))
                node.append(new Token(TokenType.RightParen, ")", { postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(197, 4, 58)})], location: new SourceLocation(196, 4, 57)}))
              }))
            }))
          }))
          node.append(new Token(TokenType.Operator, "||", { location: new SourceLocation(198, 4, 59)}))
          node.append(new Node("StringLiteral").apply(node => {
            node.data = {"value":".db"}
            node.append(new Token(TokenType.String, "'.db'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(200, 4, 61)})], location: new SourceLocation(201, 4, 62)}))
          }))
        }))
        node.append(new Token(TokenType.RightParen, ")", { location: new SourceLocation(206, 4, 67)}))
      }))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(207, 4, 68)})], location: new SourceLocation(208, 4, 69)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"new_db"}
      node.append(new Token(TokenType.Identifier, "new_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(210, 4, 71)})], location: new SourceLocation(211, 4, 72)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(218, 4, 79)})], location: new SourceLocation(217, 4, 78)}))
  node.append(new Node("AttachDatabaseStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ATTACH", { keyword: Keyword.ATTACH, location: new SourceLocation(219, 5, 1)}))
    node.append(new Node("DatabaseExpression").apply(node => {
      node.append(new Node("StringLiteral").apply(node => {
        node.data = {"value":"new_database.db"}
        node.append(new Token(TokenType.String, "'new_database.db'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(225, 5, 7)})], location: new SourceLocation(226, 5, 8)}))
      }))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(243, 5, 25)})], location: new SourceLocation(244, 5, 26)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"new_db"}
      node.append(new Token(TokenType.Identifier, "new_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(246, 5, 28)})], location: new SourceLocation(247, 5, 29)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(254, 5, 36)})], location: new SourceLocation(253, 5, 35)}))
  node.append(new Node("AttachDatabaseStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ATTACH", { keyword: Keyword.ATTACH, location: new SourceLocation(255, 6, 1)}))
    node.append(new Node("DatabaseExpression").apply(node => {
      node.append(new Node("ConcatenateOperation").apply(node => {
        node.append(new Node("StringLiteral").apply(node => {
          node.data = {"value":"database_"}
          node.append(new Token(TokenType.String, "'database_'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(261, 6, 7)})], postskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(273, 6, 19)})], location: new SourceLocation(262, 6, 8)}))
        }))
        node.append(new Token(TokenType.Operator, "||", { location: new SourceLocation(274, 6, 20)}))
        node.append(new Node("StringLiteral").apply(node => {
          node.data = {"value":".db"}
          node.append(new Token(TokenType.String, "'.db'", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(276, 6, 22)})], location: new SourceLocation(277, 6, 23)}))
        }))
      }))
    }))
    node.append(new Token(TokenType.Reserved, "AS", { keyword: Keyword.AS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(282, 6, 28)})], location: new SourceLocation(283, 6, 29)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"new_db"}
      node.append(new Token(TokenType.Identifier, "new_db", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(285, 6, 31)})], location: new SourceLocation(286, 6, 32)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(293, 6, 39)})], location: new SourceLocation(292, 6, 38)}))
})
