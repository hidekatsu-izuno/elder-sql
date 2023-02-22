import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("ExplainStatement", {}, [
    new Element("Identifier", {"value":"EXPLAIN"}, [new Text("EXPLAIN")]),
    new Element("Statement", {}, [
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"a"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("a")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"b"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("b")]),
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
                  new Element("ObjectName", {"value":"t1"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("t1")]),
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
                  new Element("ColumnName", {"value":"a"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("a")]),
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
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("ExplainStatement", {}, [
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("Identifier", {"value":"EXPLAIN"}, [new Text("EXPLAIN")]),
    new Element("QueryPlanOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"QUERY"}, [new Text("QUERY")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"PLAN"}, [new Text("PLAN")]),
    ]),
    new Element("Statement", {}, [
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("SchemaName", {"value":"t1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("t1")]),
              ]),
              new Element("AllColumnsOption", {}, [
                new Element("Dot", {}, [new Text(".")]),
                new Element("Operator", {}, [new Text("*")]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("SelectColumn", {}, [
              new Element("SchemaName", {"value":"t2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("t2")]),
              ]),
              new Element("AllColumnsOption", {}, [
                new Element("Dot", {}, [new Text(".")]),
                new Element("Operator", {}, [new Text("*")]),
              ]),
            ]),
          ]),
          new Element("FromClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
            new Element("FromObjectList", {}, [
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"t1"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("t1")]),
                  ]),
                ]),
              ]),
              new Element("Comma", {}, [new Text(",")]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"t2"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("t2")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("WhereClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
            new Element("Expression", {}, [
              new Element("AndOperation", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"t1"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {}, [new Text("t1")]),
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
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"AND"}, [new Text("AND")]),
                new Element("GreaterThanOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"t1"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {}, [new Text("t1")]),
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
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
])
