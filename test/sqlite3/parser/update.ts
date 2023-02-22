import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("UpdateStatement", {}, [
    new Element("UpdateClause", {}, [
      new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SetClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("a")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("UpdateStatement", {}, [
    new Element("UpdateClause", {}, [
      new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SetClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("a")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"b"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("b")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("EqualOperation", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              ]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("NumericLiteral", {"value":"3"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Numeric", {}, [new Text("3")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("UpdateStatement", {}, [
    new Element("WithClause", {}, [
      new Element("Identifier", {"value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableExpression", {}, [
        new Element("ObjectName", {"value":"X"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("X")]),
        ]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("SelectStatement", {}, [
          new Element("SelectClause", {}, [
            new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
            new Element("SelectColumnList", {}, [
              new Element("SelectColumn", {}, [
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Numeric", {}, [new Text("1")]),
                  ]),
                ]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
                new Element("ColumnAlias", {"value":"Y"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {}, [new Text("Y")]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
    ]),
    new Element("UpdateClause", {}, [
      new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
      new Element("ObjectAlias", {"value":"dest"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("dest")]),
      ]),
      new Element("SetClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("a")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"b"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("b")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"X"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("X")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("EqualOperation", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"dest"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("dest")]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ColumnName", {"value":"c"}, [
                new Element("Identifier", {}, [new Text("c")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              ]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"X"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("X")]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ColumnName", {"value":"c"}, [
                new Element("Identifier", {}, [new Text("c")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("UpdateStatement", {}, [
    new Element("UpdateClause", {}, [
      new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SetClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("a")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"b"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("b")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("Operator", {}, [new Text("=")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("SubqueryExpression", {}, [
                  new Element("LeftParen", {}, [new Text("(")]),
                  new Element("SelectStatement", {}, [
                    new Element("SelectClause", {}, [
                      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
                      new Element("SelectColumnList", {}, [
                        new Element("SelectColumn", {}, [
                          new Element("Expression", {}, [
                            new Element("NumericLiteral", {"value":"1"}, [
                              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                              new Element("Numeric", {}, [new Text("1")]),
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
      new Element("ReturningClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"RETURNING"}, [new Text("RETURNING")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"Y"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {}, [new Text("Y")]),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
            new Element("ColumnAlias", {"value":"Z"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("Z")]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("Operator", {}, [new Text("*")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
])
