import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AttachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Identifier", {"value":"DATABASE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("StringLiteral", {"value":":memory:"}, [
          new Element("String", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("':memory:'"),
          ]),
        ]),
      ]),
    ]),
    new Element("Reserved", {"value":"AS"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("SchemaName", {"value":"mem_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("mem_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Identifier", {"value":"DATABASE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("StringLiteral", {"value":"new_database.db"}, [
          new Element("String", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("'new_database.db'"),
          ]),
        ]),
      ]),
    ]),
    new Element("Reserved", {"value":"AS"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Identifier", {"value":"DATABASE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("FunctionExpression", {}, [
          new Element("ObjectName", {}, [
            new Element("Identifier", {"value":"CONCAT"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("CONCAT"),
            ]),
          ]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("FunctionArgumentList", {}, [
            new Element("Argument", {}, [
              new Element("Expression", {}, [
                new Element("StringLiteral", {"value":"new_database"}, [
                  new Element("String", {}, [new Text("'new_database'")]),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Argument", {}, [
              new Element("Expression", {}, [
                new Element("StringLiteral", {"value":".db"}, [
                  new Element("String", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("'.db'"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("Reserved", {"value":"AS"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Identifier", {"value":"DATABASE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("DATABASE"),
      new Element("WhiteSpace", {}, [new Text(" ")]),
    ]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("ParenthesesOperation", {}, [
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("Expression", {}, [
            new Element("ConcatenateOperation", {}, [
              new Element("ConcatenateOperation", {}, [
                new Element("StringLiteral", {"value":"database_"}, [
                  new Element("String", {}, [
                    new Text("'database_'"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("||")]),
                new Element("FunctionExpression", {}, [
                  new Element("ObjectName", {}, [
                    new Element("Identifier", {"value":"STRFTIME"}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("strftime"),
                    ]),
                  ]),
                  new Element("LeftParen", {}, [new Text("(")]),
                  new Element("FunctionArgumentList", {}, [
                    new Element("Argument", {}, [
                      new Element("Expression", {}, [
                        new Element("StringLiteral", {"value":"%Y%m%d"}, [
                          new Element("String", {}, [new Text("'%Y%m%d'")]),
                        ]),
                      ]),
                    ]),
                    new Element("Comma", {}, [new Text(",")]),
                    new Element("Argument", {}, [
                      new Element("Expression", {}, [
                        new Element("StringLiteral", {"value":"now"}, [
                          new Element("String", {}, [
                            new Element("WhiteSpace", {}, [new Text(" ")]),
                            new Text("'now'"),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("RightParen", {}, [
                    new Text(")"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("||")]),
              new Element("StringLiteral", {"value":".db"}, [
                new Element("String", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("'.db'"),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("Reserved", {"value":"AS"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("StringLiteral", {"value":"new_database.db"}, [
          new Element("String", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("'new_database.db'"),
          ]),
        ]),
      ]),
    ]),
    new Element("Reserved", {"value":"AS"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("ConcatenateOperation", {}, [
          new Element("StringLiteral", {"value":"database_"}, [
            new Element("String", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("'database_'"),
              new Element("WhiteSpace", {}, [new Text(" ")]),
            ]),
          ]),
          new Element("Operator", {}, [new Text("||")]),
          new Element("StringLiteral", {"value":".db"}, [
            new Element("String", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("'.db'"),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("Reserved", {"value":"AS"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("AS"),
    ]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("EoF", {}),
])
