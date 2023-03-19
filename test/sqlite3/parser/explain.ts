import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("ExplainStatement", {}, [
    new Element("Identifier", {"value":"EXPLAIN"}, [new Text("EXPLAIN")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("Reserved", {"value":"SELECT"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("SELECT"),
        ]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("a"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"b"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("b"),
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
                new Element("ObjectName", {"value":"t1"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("t1"),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("WhereClause", {}, [
          new Element("Reserved", {"value":"WHERE"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("WHERE"),
          ]),
          new Element("Expression", {}, [
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("a"),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
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
  new Element("ExplainStatement", {}, [
    new Element("Identifier", {"value":"EXPLAIN"}, [
      new Element("LineBreak", {}, [new Text("\n")]),
      new Text("EXPLAIN"),
    ]),
    new Element("QueryPlanOption", {}, [
      new Element("Identifier", {"value":"QUERY"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("QUERY"),
      ]),
      new Element("Identifier", {"value":"PLAN"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("PLAN"),
      ]),
    ]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("Reserved", {"value":"SELECT"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("SELECT"),
        ]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("SchemaName", {"value":"t1"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("t1"),
                ]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("Operator", {}, [new Text("*")]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("SchemaName", {"value":"t2"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("t2"),
                ]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("Operator", {}, [new Text("*")]),
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
                new Element("ObjectName", {"value":"t1"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("t1"),
                  ]),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("FromObject", {}, [
              new Element("ObjectReference", {}, [
                new Element("ObjectName", {"value":"t2"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("t2"),
                  ]),
                ]),
              ]),
            ]),
          ]),
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
                  new Element("ObjectName", {"value":"t1"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("t1"),
                    ]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"a"}, [
                    new Element("Identifier", {}, [new Text("a")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("=")]),
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
              new Element("Reserved", {"value":"AND"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("AND"),
              ]),
              new Element("GreaterThanOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"t1"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("t1"),
                    ]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"b"}, [
                    new Element("Identifier", {}, [new Text("b")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text(">")]),
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("Numeric", {}, [new Text("2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("EoF", {}),
])
