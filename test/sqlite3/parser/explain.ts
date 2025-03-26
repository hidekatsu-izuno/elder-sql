import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"ExplainStatement"}, [
    new Element("token", {"value":"EXPLAIN","type":"Identifier"}, [new Text("EXPLAIN")]),
    new Element("node", {"type":"SelectStatement"}, [
      new Element("node", {"type":"SelectClause"}, [
        new Element("token", {"value":"SELECT","type":"Reserved"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("SELECT"),
        ]),
        new Element("node", {"type":"SelectColumnList"}, [
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ColumnName","value":"a"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("a"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ColumnName","value":"b"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("b"),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("node", {"type":"FromClause"}, [
          new Element("token", {"value":"FROM","type":"Reserved"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("FROM"),
          ]),
          new Element("node", {"type":"FromObjectList"}, [
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"t1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("t1"),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("node", {"type":"WhereClause"}, [
          new Element("token", {"value":"WHERE","type":"Reserved"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("WHERE"),
          ]),
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"EqualOperation"}, [
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ColumnName","value":"a"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("a"),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"ExplainStatement"}, [
    new Element("token", {"value":"EXPLAIN","type":"Identifier"}, [
      new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      new Text("EXPLAIN"),
    ]),
    new Element("node", {"type":"QueryPlanOption"}, [
      new Element("token", {"value":"QUERY","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("QUERY"),
      ]),
      new Element("token", {"value":"PLAN","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("PLAN"),
      ]),
    ]),
    new Element("node", {"type":"SelectStatement"}, [
      new Element("node", {"type":"SelectClause"}, [
        new Element("token", {"value":"SELECT","type":"Reserved"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("SELECT"),
        ]),
        new Element("node", {"type":"SelectColumnList"}, [
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"AllColumnsOption"}, [
              new Element("node", {"type":"SchemaName","value":"t1"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("t1"),
                ]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"AllColumnsOption"}, [
              new Element("node", {"type":"SchemaName","value":"t2"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("t2"),
                ]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
        ]),
        new Element("node", {"type":"FromClause"}, [
          new Element("token", {"value":"FROM","type":"Reserved"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("FROM"),
          ]),
          new Element("node", {"type":"FromObjectList"}, [
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"t1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("t1"),
                  ]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"t2"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("t2"),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("node", {"type":"WhereClause"}, [
          new Element("token", {"value":"WHERE","type":"Reserved"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("WHERE"),
          ]),
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"AndOperation"}, [
              new Element("node", {"type":"EqualOperation"}, [
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ObjectName","value":"t1"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("t1"),
                    ]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("node", {"type":"ColumnName","value":"a"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("a")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("=")]),
                new Element("node", {"type":"NumericLiteral","value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
              new Element("token", {"value":"AND","type":"Reserved"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("AND"),
              ]),
              new Element("node", {"type":"GreaterThanOperation"}, [
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ObjectName","value":"t1"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("t1"),
                    ]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("node", {"type":"ColumnName","value":"b"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("b")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text(">")]),
                new Element("node", {"type":"NumericLiteral","value":"2"}, [
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
  new Element("token", {"type":"EoF"}),
])
