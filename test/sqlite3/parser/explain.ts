import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("ExplainStatement", {}, [
    new Element("token", {"type":"Identifier","value":"EXPLAIN"}, [new Text("EXPLAIN")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("a")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"b"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("b")]),
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
                new Element("ObjectName", {"value":"t1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("t1")]),
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
                new Element("ColumnName", {"value":"a"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("a")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("ExplainStatement", {}, [
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("token", {"type":"Identifier","value":"EXPLAIN"}, [new Text("EXPLAIN")]),
    new Element("QueryPlanOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"QUERY"}, [new Text("QUERY")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"PLAN"}, [new Text("PLAN")]),
    ]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("SchemaName", {"value":"t1"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("t1")]),
            ]),
            new Element("AllColumnsOption", {}, [
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("SchemaName", {"value":"t2"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("t2")]),
            ]),
            new Element("AllColumnsOption", {}, [
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
        ]),
        new Element("FromClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
          new Element("FromObjectList", {}, [
            new Element("FromObject", {}, [
              new Element("ObjectReference", {}, [
                new Element("ObjectName", {"value":"t1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("t1")]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("FromObject", {}, [
              new Element("ObjectReference", {}, [
                new Element("ObjectName", {"value":"t2"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("t2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("WhereClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
          new Element("Expression", {}, [
            new Element("AndOperation", {}, [
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"t1"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("t1")]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("ColumnName", {"value":"a"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("a")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("=")]),
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"AND"}, [new Text("AND")]),
              new Element("GreaterThanOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"t1"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("t1")]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("ColumnName", {"value":"b"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("b")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text(">")]),
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
])
