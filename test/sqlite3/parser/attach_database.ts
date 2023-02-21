import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AttachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"DATABASE"}, [new Text("DATABASE")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("StringLiteral", {"value":":memory:"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"String"}, [new Text("':memory:'")]),
        ]),
      ]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
    new Element("SchemaName", {"value":"mem_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("mem_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"DATABASE"}, [new Text("DATABASE")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("StringLiteral", {"value":"new_database.db"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"String"}, [new Text("'new_database.db'")]),
        ]),
      ]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("new_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"DATABASE"}, [new Text("DATABASE")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("FunctionExpression", {}, [
          new Element("ObjectName", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"CONCAT"}, [new Text("CONCAT")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("ArgumentList", {}, [
            new Element("Argument", {}, [
              new Element("Expression", {}, [
                new Element("StringLiteral", {"value":"new_database"}, [
                  new Element("token", {"type":"String"}, [new Text("'new_database'")]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Argument", {}, [
              new Element("Expression", {}, [
                new Element("StringLiteral", {"value":".db"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"String"}, [new Text("'.db'")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("new_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"DATABASE"}, [new Text("DATABASE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("ParenthesesOperation", {}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("Expression", {}, [
            new Element("ConcatenateOperation", {}, [
              new Element("ConcatenateOperation", {}, [
                new Element("StringLiteral", {"value":"database_"}, [
                  new Element("token", {"type":"String"}, [new Text("'database_'")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("||")]),
                new Element("FunctionExpression", {}, [
                  new Element("ObjectName", {}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier","value":"STRFTIME"}, [new Text("strftime")]),
                  ]),
                  new Element("token", {"type":"LeftParen"}, [new Text("(")]),
                  new Element("ArgumentList", {}, [
                    new Element("Argument", {}, [
                      new Element("Expression", {}, [
                        new Element("StringLiteral", {"value":"%Y%m%d"}, [
                          new Element("token", {"type":"String"}, [new Text("'%Y%m%d'")]),
                        ]),
                      ]),
                    ]),
                    new Element("token", {"type":"Comma"}, [new Text(",")]),
                    new Element("Argument", {}, [
                      new Element("Expression", {}, [
                        new Element("StringLiteral", {"value":"now"}, [
                          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Element("token", {"type":"String"}, [new Text("'now'")]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"RightParen"}, [new Text(")")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("||")]),
              new Element("StringLiteral", {"value":".db"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"String"}, [new Text("'.db'")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("new_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("StringLiteral", {"value":"new_database.db"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"String"}, [new Text("'new_database.db'")]),
        ]),
      ]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("new_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AttachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ATTACH"}, [new Text("ATTACH")]),
    new Element("Database", {}, [
      new Element("Expression", {}, [
        new Element("ConcatenateOperation", {}, [
          new Element("StringLiteral", {"value":"database_"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"String"}, [new Text("'database_'")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("token", {"type":"Operator"}, [new Text("||")]),
          new Element("StringLiteral", {"value":".db"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"String"}, [new Text("'.db'")]),
          ]),
        ]),
      ]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("new_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
])
