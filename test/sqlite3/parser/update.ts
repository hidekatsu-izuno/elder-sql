import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("UpdateStatement", {}, [
    new Element("UpdateClause", {}, [
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SetClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("UpdateStatement", {}, [
    new Element("UpdateClause", {}, [
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SetClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"b"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("b")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("EqualOperation", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("NumericLiteral", {"value":"3"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Numeric"}, [new Text("3")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("UpdateStatement", {}, [
    new Element("WithClause", {}, [
      new Element("token", {"type":"Identifier","value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableExpression", {}, [
        new Element("ObjectName", {"value":"X"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("X")]),
        ]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("SelectStatement", {}, [
          new Element("SelectClause", {}, [
            new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
            new Element("SelectColumnList", {}, [
              new Element("SelectColumn", {}, [
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Numeric"}, [new Text("1")]),
                  ]),
                ]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
                new Element("ColumnAlias", {"value":"Y"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("Y")]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("UpdateClause", {}, [
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
      new Element("ObjectAlias", {"value":"dest"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("dest")]),
      ]),
      new Element("SetClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"b"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("b")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"X"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("X")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("EqualOperation", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"dest"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("dest")]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("ColumnName", {"value":"c"}, [
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"X"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("X")]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("ColumnName", {"value":"c"}, [
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("UpdateStatement", {}, [
    new Element("UpdateClause", {}, [
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SetClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
        new Element("UpdateColumnList", {}, [
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("UpdateColumn", {}, [
            new Element("ColumnName", {"value":"b"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("b")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"Operator"}, [new Text("=")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("ColumnValue", {}, [
              new Element("Expression", {}, [
                new Element("SubqueryExpression", {}, [
                  new Element("token", {"type":"LeftParen"}, [new Text("(")]),
                  new Element("SelectStatement", {}, [
                    new Element("SelectClause", {}, [
                      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
                      new Element("SelectColumnList", {}, [
                        new Element("SelectColumn", {}, [
                          new Element("Expression", {}, [
                            new Element("NumericLiteral", {"value":"1"}, [
                              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                              new Element("token", {"type":"Numeric"}, [new Text("1")]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"RightParen"}, [new Text(")")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [new Text("RETURNING")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"Y"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("Y")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
            new Element("ColumnAlias", {"value":"Z"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("Z")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
])
