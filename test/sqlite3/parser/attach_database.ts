import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"AttachDatabaseStatement"}, [
    new Element("token", {"value":"ATTACH","type":"Identifier"}, [new Text("ATTACH")]),
    new Element("token", {"value":"DATABASE","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("node", {"type":"Database"}, [
      new Element("node", {"type":"Expression"}, [
        new Element("node", {"type":"StringLiteral","value":":memory:"}, [
          new Element("token", {"type":"String"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("':memory:'"),
          ]),
        ]),
      ]),
    ]),
    new Element("token", {"value":"AS","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("node", {"type":"SchemaName","value":"mem_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("mem_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AttachDatabaseStatement"}, [
    new Element("token", {"value":"ATTACH","type":"Identifier"}, [new Text("ATTACH")]),
    new Element("token", {"value":"DATABASE","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("node", {"type":"Database"}, [
      new Element("node", {"type":"Expression"}, [
        new Element("node", {"type":"StringLiteral","value":"new_database.db"}, [
          new Element("token", {"type":"String"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("'new_database.db'"),
          ]),
        ]),
      ]),
    ]),
    new Element("token", {"value":"AS","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("node", {"type":"SchemaName","value":"new_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AttachDatabaseStatement"}, [
    new Element("token", {"value":"ATTACH","type":"Identifier"}, [new Text("ATTACH")]),
    new Element("token", {"value":"DATABASE","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("node", {"type":"Database"}, [
      new Element("node", {"type":"Expression"}, [
        new Element("node", {"type":"FunctionExpression"}, [
          new Element("node", {"type":"ObjectName"}, [
            new Element("token", {"value":"CONCAT","type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("CONCAT"),
            ]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"FunctionArgumentList"}, [
            new Element("node", {"type":"Argument"}, [
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"StringLiteral","value":"new_database"}, [
                  new Element("token", {"type":"String"}, [new Text("'new_database'")]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Argument"}, [
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"StringLiteral","value":".db"}, [
                  new Element("token", {"type":"String"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("'.db'"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("token", {"value":"AS","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("node", {"type":"SchemaName","value":"new_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AttachDatabaseStatement"}, [
    new Element("token", {"value":"ATTACH","type":"Identifier"}, [new Text("ATTACH")]),
    new Element("token", {"value":"DATABASE","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("DATABASE"),
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("node", {"type":"Database"}, [
      new Element("node", {"type":"Expression"}, [
        new Element("node", {"type":"ParenthesesOperation"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"ConcatenateOperation"}, [
              new Element("node", {"type":"ConcatenateOperation"}, [
                new Element("node", {"type":"StringLiteral","value":"database_"}, [
                  new Element("token", {"type":"String"}, [
                    new Text("'database_'"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("||")]),
                new Element("node", {"type":"FunctionExpression"}, [
                  new Element("node", {"type":"ObjectName"}, [
                    new Element("token", {"value":"STRFTIME","type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("strftime"),
                    ]),
                  ]),
                  new Element("token", {"type":"LeftParen"}, [new Text("(")]),
                  new Element("node", {"type":"FunctionArgumentList"}, [
                    new Element("node", {"type":"Argument"}, [
                      new Element("node", {"type":"Expression"}, [
                        new Element("node", {"type":"StringLiteral","value":"%Y%m%d"}, [
                          new Element("token", {"type":"String"}, [new Text("'%Y%m%d'")]),
                        ]),
                      ]),
                    ]),
                    new Element("token", {"type":"Comma"}, [new Text(",")]),
                    new Element("node", {"type":"Argument"}, [
                      new Element("node", {"type":"Expression"}, [
                        new Element("node", {"type":"StringLiteral","value":"now"}, [
                          new Element("token", {"type":"String"}, [
                            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                            new Text("'now'"),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"RightParen"}, [
                    new Text(")"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("||")]),
              new Element("node", {"type":"StringLiteral","value":".db"}, [
                new Element("token", {"type":"String"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("'.db'"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("token", {"value":"AS","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("node", {"type":"SchemaName","value":"new_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AttachDatabaseStatement"}, [
    new Element("token", {"value":"ATTACH","type":"Identifier"}, [new Text("ATTACH")]),
    new Element("node", {"type":"Database"}, [
      new Element("node", {"type":"Expression"}, [
        new Element("node", {"type":"StringLiteral","value":"new_database.db"}, [
          new Element("token", {"type":"String"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("'new_database.db'"),
          ]),
        ]),
      ]),
    ]),
    new Element("token", {"value":"AS","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("node", {"type":"SchemaName","value":"new_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AttachDatabaseStatement"}, [
    new Element("token", {"value":"ATTACH","type":"Identifier"}, [new Text("ATTACH")]),
    new Element("node", {"type":"Database"}, [
      new Element("node", {"type":"Expression"}, [
        new Element("node", {"type":"ConcatenateOperation"}, [
          new Element("node", {"type":"StringLiteral","value":"database_"}, [
            new Element("token", {"type":"String"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("'database_'"),
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
          ]),
          new Element("token", {"type":"Operator"}, [new Text("||")]),
          new Element("node", {"type":"StringLiteral","value":".db"}, [
            new Element("token", {"type":"String"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("'.db'"),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("token", {"value":"AS","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("node", {"type":"SchemaName","value":"new_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("token", {"type":"EoF"}),
])
