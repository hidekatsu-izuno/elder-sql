import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("Reserved", {"value":"FROM"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("Reserved", {"value":"FROM"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DeleteStatement", {}, [
    new Element("WithClause", {}, [
      new Element("Identifier", {"value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableList", {}, [
        new Element("CommonTable", {}, [
          new Element("ObjectName", {"value":"X"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("X"),
            ]),
          ]),
          new Element("Reserved", {"value":"AS"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("AS"),
            new Element("WhiteSpace", {}, [new Text(" ")]),
          ]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("SelectStatement", {}, [
            new Element("SelectClause", {}, [
              new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
              new Element("SelectColumnList", {}, [
                new Element("SelectColumn", {}, [
                  new Element("Expression", {}, [
                    new Element("NumericLiteral", {"value":"1"}, [
                      new Element("Numeric", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                  new Element("Reserved", {"value":"AS"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("AS"),
                  ]),
                  new Element("ColumnAlias", {"value":"Y"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("Y"),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
        ]),
      ]),
    ]),
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("DELETE"),
      ]),
      new Element("Reserved", {"value":"FROM"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("WhereClause", {}, [
        new Element("Reserved", {"value":"WHERE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("WHERE"),
        ]),
        new Element("Expression", {}, [
          new Element("EqualOperation", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"x"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("x"),
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                ]),
              ]),
            ]),
            new Element("Operator", {}, [
              new Text("="),
              new Element("WhiteSpace", {}, [new Text(" ")]),
            ]),
            new Element("SubqueryExpression", {}, [
              new Element("LeftParen", {}, [new Text("(")]),
              new Element("SelectStatement", {}, [
                new Element("SelectClause", {}, [
                  new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
                  new Element("SelectColumnList", {}, [
                    new Element("SelectColumn", {}, [
                      new Element("Expression", {}, [
                        new Element("ColumnReference", {}, [
                          new Element("ColumnName", {"value":"Y"}, [
                            new Element("Identifier", {}, [
                              new Element("WhiteSpace", {}, [new Text(" ")]),
                              new Text("Y"),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("FromClause", {}, [
                    new Element("Reserved", {"value":"FROM"}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("FROM"),
                    ]),
                    new Element("FromObjectList", {}, [
                      new Element("FromObject", {}, [
                        new Element("ObjectReference", {}, [
                          new Element("ObjectName", {"value":"X"}, [
                            new Element("Identifier", {}, [
                              new Element("WhiteSpace", {}, [new Text(" ")]),
                              new Text("X"),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("RightParen", {}, [new Text(")")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("Reserved", {"value":"FROM"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("WhereClause", {}, [
        new Element("Reserved", {"value":"WHERE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("WHERE"),
        ]),
        new Element("Expression", {}, [
          new Element("AndOperation", {}, [
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"x"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("x"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("3"),
                ]),
              ]),
            ]),
            new Element("Reserved", {"value":"AND"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("AND"),
            ]),
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"y"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("y"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("1"),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("Reserved", {"value":"RETURNING"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RETURNING"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("Operator", {}, [new Text("*")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("EoF", {}),
])
