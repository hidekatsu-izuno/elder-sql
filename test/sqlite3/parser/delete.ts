import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"DeleteStatement"}, [
    new Element("node", {"type":"DeleteClause"}, [
      new Element("token", {"value":"DELETE","type":"Reserved"}, [new Text("DELETE")]),
      new Element("token", {"value":"FROM","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"value":"SAMPLE","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DeleteStatement"}, [
    new Element("node", {"type":"DeleteClause"}, [
      new Element("token", {"value":"DELETE","type":"Reserved"}, [new Text("DELETE")]),
      new Element("token", {"value":"FROM","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"value":"MAIN","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DeleteStatement"}, [
    new Element("node", {"type":"WithClause"}, [
      new Element("token", {"value":"WITH","type":"Identifier"}, [new Text("WITH")]),
      new Element("node", {"type":"CommonTableList"}, [
        new Element("node", {"type":"CommonTable"}, [
          new Element("node", {"type":"ObjectName","value":"X"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("X"),
            ]),
          ]),
          new Element("token", {"value":"AS","type":"Reserved"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("AS"),
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"SelectStatement"}, [
            new Element("node", {"type":"SelectClause"}, [
              new Element("token", {"value":"SELECT","type":"Reserved"}, [new Text("SELECT")]),
              new Element("node", {"type":"SelectColumnList"}, [
                new Element("node", {"type":"SelectColumn"}, [
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"NumericLiteral","value":"1"}, [
                      new Element("token", {"type":"Numeric"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"value":"AS","type":"Reserved"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("AS"),
                  ]),
                  new Element("node", {"type":"ColumnAlias","value":"Y"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("Y"),
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
    new Element("node", {"type":"DeleteClause"}, [
      new Element("token", {"value":"DELETE","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("DELETE"),
      ]),
      new Element("token", {"value":"FROM","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"value":"MAIN","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"WhereClause"}, [
        new Element("token", {"value":"WHERE","type":"Reserved"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("WHERE"),
        ]),
        new Element("node", {"type":"Expression"}, [
          new Element("node", {"type":"EqualOperation"}, [
            new Element("node", {"type":"ColumnReference"}, [
              new Element("node", {"type":"ColumnName","value":"x"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("x"),
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Operator"}, [
              new Text("="),
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("node", {"type":"SubqueryExpression"}, [
              new Element("token", {"type":"LeftParen"}, [new Text("(")]),
              new Element("node", {"type":"SelectStatement"}, [
                new Element("node", {"type":"SelectClause"}, [
                  new Element("token", {"value":"SELECT","type":"Reserved"}, [new Text("SELECT")]),
                  new Element("node", {"type":"SelectColumnList"}, [
                    new Element("node", {"type":"SelectColumn"}, [
                      new Element("node", {"type":"Expression"}, [
                        new Element("node", {"type":"ColumnReference"}, [
                          new Element("node", {"type":"ColumnName","value":"Y"}, [
                            new Element("token", {"type":"Identifier"}, [
                              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                              new Text("Y"),
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
                          new Element("node", {"type":"ObjectName","value":"X"}, [
                            new Element("token", {"type":"Identifier"}, [
                              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                              new Text("X"),
                            ]),
                          ]),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DeleteStatement"}, [
    new Element("node", {"type":"DeleteClause"}, [
      new Element("token", {"value":"DELETE","type":"Reserved"}, [new Text("DELETE")]),
      new Element("token", {"value":"FROM","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"value":"MAIN","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
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
                new Element("node", {"type":"ColumnName","value":"x"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("x"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("node", {"type":"NumericLiteral","value":"3"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("3"),
                ]),
              ]),
            ]),
            new Element("token", {"value":"AND","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("AND"),
            ]),
            new Element("node", {"type":"EqualOperation"}, [
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ColumnName","value":"y"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("y"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("1"),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"ReturningClause"}, [
        new Element("token", {"value":"RETURNING","type":"Reserved"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("RETURNING"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"SelectColumnList"}, [
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"AllColumnsOption"}, [
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
