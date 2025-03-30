import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"SubtractOperation"}, [
              new Element("node", {"type":"AddOperation"}, [
                new Element("node", {"type":"NumericLiteral","value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("1"),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("+")]),
                new Element("node", {"type":"NumericLiteral","value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("-")]),
              new Element("node", {"type":"NumericLiteral","value":"3"}, [
                new Element("token", {"type":"Numeric"}, [new Text("3")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [
          new Text(","),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"DivideOperation"}, [
              new Element("node", {"type":"MultiplyOperation"}, [
                new Element("node", {"type":"UnaryMinusOperation"}, [
                  new Element("token", {"type":"Operator"}, [new Text("-")]),
                  new Element("node", {"type":"NumericLiteral","value":"1"}, [
                    new Element("token", {"type":"Numeric"}, [new Text("1")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("*")]),
                new Element("node", {"type":"NumericLiteral","value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("/")]),
              new Element("node", {"type":"NumericLiteral","value":"3"}, [
                new Element("token", {"type":"Numeric"}, [new Text("3")]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"c1"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("c1"),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [
          new Text(","),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"SubtractOperation"}, [
              new Element("node", {"type":"UnaryPlusOperation"}, [
                new Element("token", {"type":"Operator"}, [new Text("+")]),
                new Element("node", {"type":"NumericLiteral","value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("-")]),
              new Element("node", {"type":"MultiplyOperation"}, [
                new Element("node", {"type":"NumericLiteral","value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("*")]),
                new Element("node", {"type":"NumericLiteral","value":"3"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("3")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Reserved","value":"AS"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("AS"),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"c2"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("c2"),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"ColumnReference"}, [
              new Element("node", {"type":"ColumnName","value":"c1"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("c1"),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("node", {"type":"SubqueryExpression"}, [
              new Element("node", {"type":"SelectStatement"}, [
                new Element("node", {"type":"SelectClause"}, [
                  new Element("token", {"type":"Reserved","value":"SELECT"}, [
                    new Text("SELECT"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                  new Element("node", {"type":"SelectColumnList"}, [
                    new Element("node", {"type":"SelectColumn"}, [
                      new Element("node", {"type":"AllColumnsOption"}, [
                        new Element("token", {"type":"Operator"}, [new Text("*")]),
                      ]),
                    ]),
                  ]),
                  new Element("node", {"type":"FromClause"}, [
                    new Element("token", {"type":"Reserved","value":"FROM"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("FROM"),
                    ]),
                    new Element("node", {"type":"FromObjectList"}, [
                      new Element("node", {"type":"FromObject"}, [
                        new Element("node", {"type":"ObjectReference"}, [
                          new Element("node", {"type":"ObjectName","value":"sample"}, [
                            new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
                              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                              new Text("sample"),
                            ]),
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
      new Element("node", {"type":"GroupByClause"}, [
        new Element("token", {"type":"Reserved","value":"GROUP"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("GROUP"),
        ]),
        new Element("token", {"type":"Identifier","value":"BY"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("BY"),
        ]),
        new Element("node", {"type":"ExpressionList"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"ColumnReference"}, [
              new Element("node", {"type":"ColumnName","value":"c1"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("c1"),
                ]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"WithClause"}, [
      new Element("token", {"type":"Identifier","value":"WITH"}, [new Text("WITH")]),
      new Element("node", {"type":"CommonTableList"}, [
        new Element("node", {"type":"CommonTable"}, [
          new Element("node", {"type":"ObjectName","value":"x"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("x"),
            ]),
          ]),
          new Element("token", {"type":"Reserved","value":"AS"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("AS"),
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"SelectStatement"}, [
            new Element("node", {"type":"SelectClause"}, [
              new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
              new Element("node", {"type":"SelectColumnList"}, [
                new Element("node", {"type":"SelectColumn"}, [
                  new Element("node", {"type":"AllColumnsOption"}, [
                    new Element("node", {"type":"SchemaName","value":"s"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("s"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("token", {"type":"Operator"}, [new Text("*")]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"FromClause"}, [
                new Element("token", {"type":"Reserved","value":"FROM"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("FROM"),
                ]),
                new Element("node", {"type":"FromObjectList"}, [
                  new Element("node", {"type":"FromObject"}, [
                    new Element("node", {"type":"ObjectReference"}, [
                      new Element("node", {"type":"ObjectName","value":"sample"}, [
                        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
                          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Text("sample"),
                        ]),
                      ]),
                    ]),
                    new Element("node", {"type":"ObjectAlias","value":"s"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("s"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [
            new Text(")"),
            new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
          ]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [
        new Text("SELECT"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"AllColumnsOption"}, [
            new Element("token", {"type":"Operator"}, [new Text("*")]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"x"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("x"),
                  new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"WhereClause"}, [
        new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
        new Element("node", {"type":"Expression"}, [
          new Element("node", {"type":"AndOperation"}, [
            new Element("node", {"type":"EqualOperation"}, [
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ObjectName","value":"x"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("x"),
                  ]),
                ]),
                new Element("token", {"type":"Dot"}, [new Text(".")]),
                new Element("node", {"type":"ColumnName","value":"col1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Text("col1"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("node", {"type":"NumericLiteral","value":"2"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("2"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"AND"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("AND"),
            ]),
            new Element("node", {"type":"NotOperation"}, [
              new Element("token", {"type":"Reserved","value":"NOT"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("NOT"),
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
              new Element("node", {"type":"ParenthesesOperation"}, [
                new Element("token", {"type":"LeftParen"}, [new Text("(")]),
                new Element("node", {"type":"Expression"}, [
                  new Element("node", {"type":"OrOperation"}, [
                    new Element("node", {"type":"NotLikeOperation"}, [
                      new Element("node", {"type":"ColumnReference"}, [
                        new Element("node", {"type":"ObjectName","value":"x"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("node", {"type":"ColumnName","value":"col2"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("token", {"type":"Reserved","value":"NOT"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("NOT"),
                      ]),
                      new Element("token", {"type":"Identifier","value":"LIKE"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("LIKE"),
                      ]),
                      new Element("node", {"type":"StringLiteral","value":"%x%"}, [
                        new Element("token", {"type":"String"}, [
                          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Text("'%x%'"),
                        ]),
                      ]),
                    ]),
                    new Element("token", {"type":"Reserved","value":"OR"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("OR"),
                    ]),
                    new Element("node", {"type":"IsOperation"}, [
                      new Element("node", {"type":"ColumnReference"}, [
                        new Element("node", {"type":"ObjectName","value":"x"}, [
                          new Element("token", {"type":"Identifier"}, [
                            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                            new Text("x"),
                          ]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("node", {"type":"ColumnName","value":"col2"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("token", {"type":"Reserved","value":"IS"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("IS"),
                      ]),
                      new Element("node", {"type":"NullLiteral"}, [
                        new Element("token", {"type":"Reserved","value":"NULL"}, [
                          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Text("NULL"),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("token", {"type":"RightParen"}, [
                  new Text(")"),
                  new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"OrderByClause"}, [
      new Element("token", {"type":"Reserved","value":"ORDER"}, [new Text("ORDER")]),
      new Element("token", {"type":"Identifier","value":"BY"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("BY"),
      ]),
      new Element("node", {"type":"SortColumnList"}, [
        new Element("node", {"type":"SortColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"ColumnReference"}, [
              new Element("node", {"type":"ObjectName","value":"x"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("x"),
                ]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("node", {"type":"ColumnName","value":"col3"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Text("col3"),
                  new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"LimitClause"}, [
      new Element("token", {"type":"Reserved","value":"LIMIT"}, [new Text("LIMIT")]),
      new Element("node", {"type":"LimitOption"}, [
        new Element("node", {"type":"Expression"}, [
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [
        new Text("SELECT"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"AllColumnsOption"}, [
            new Element("token", {"type":"Operator"}, [new Text("*")]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"a"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("a"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"SchemaName","value":"main"}, [
                new Element("token", {"type":"Identifier","value":"MAIN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("main"),
                ]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("node", {"type":"ObjectName","value":"b"}, [
                new Element("token", {"type":"Identifier"}, [new Text("b")]),
              ]),
            ]),
            new Element("node", {"type":"ObjectAlias","value":"x"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("x"),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"c"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("c"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"AS"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("as"),
            ]),
            new Element("node", {"type":"ObjectAlias","value":"y"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("y"),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"WhereClause"}, [
        new Element("token", {"type":"Reserved","value":"WHERE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("WHERE"),
        ]),
        new Element("node", {"type":"Expression"}, [
          new Element("node", {"type":"AndOperation"}, [
            new Element("node", {"type":"AndOperation"}, [
              new Element("node", {"type":"EqualOperation"}, [
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ObjectName","value":"a"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("a"),
                    ]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("node", {"type":"ColumnName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Text("x"),
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    ]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("=")]),
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ObjectName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("node", {"type":"ColumnName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Reserved","value":"AND"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("AND"),
              ]),
              new Element("node", {"type":"EqualOperation"}, [
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ObjectName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("node", {"type":"ColumnName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Text("x"),
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    ]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("=")]),
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ObjectName","value":"y"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("y"),
                    ]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("node", {"type":"ColumnName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"AND"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("AND"),
            ]),
            new Element("node", {"type":"EqualOperation"}, [
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ObjectName","value":"y"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("y"),
                  ]),
                ]),
                new Element("token", {"type":"Dot"}, [new Text(".")]),
                new Element("node", {"type":"ColumnName","value":"y"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Text("y"),
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("node", {"type":"NumericLiteral","value":"0"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("0"),
                ]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [
        new Text("SELECT"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"UnaryMinusOperation"}, [
              new Element("token", {"type":"Operator"}, [new Text("-")]),
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"BooleanLiteral","value":"TRUE"}, [
              new Element("token", {"type":"Identifier","value":"TRUE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("TRUE"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"BooleanLiteral","value":"FALSE"}, [
              new Element("token", {"type":"Identifier","value":"FALSE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("FALSE"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"NullLiteral"}, [
              new Element("token", {"type":"Reserved","value":"NULL"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("NULL"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"FunctionExpression"}, [
              new Element("node", {"type":"ObjectName","value":"CURRENT_TIME"}, [
                new Element("token", {"type":"Reserved","value":"CURRENT_TIME"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("CURRENT_TIME"),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"FunctionExpression"}, [
              new Element("node", {"type":"ObjectName","value":"CURRENT_DATE"}, [
                new Element("token", {"type":"Reserved","value":"CURRENT_DATE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("CURRENT_DATE"),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"FunctionExpression"}, [
              new Element("node", {"type":"ObjectName","value":"CURRENT_TIMESTAMP"}, [
                new Element("token", {"type":"Reserved","value":"CURRENT_TIMESTAMP"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("CURRENT_TIMESTAMP"),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"StringLiteral","value":"aaa"}, [
              new Element("token", {"type":"String"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("'aaa'"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"StringLiteral","value":"aaa"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("\"aaa\""),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"BlobLiteral","value":"53514C697465"}, [
              new Element("token", {"type":"Blob"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("x'53514C697465'"),
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"PositionalBindVariable","value":"1"}, [
              new Element("token", {"type":"BindVariable"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("?1"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"PositionalBindVariable","value":"2"}, [
              new Element("token", {"type":"BindVariable"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("?"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"NamedBindVariable","value":"param"}, [
              new Element("token", {"type":"BindVariable"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text(":param"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"NamedBindVariable","value":"param"}, [
              new Element("token", {"type":"BindVariable"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("@param"),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"NamedBindVariable","value":"param"}, [
              new Element("token", {"type":"BindVariable"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("$param"),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"CaseExpression"}, [
              new Element("token", {"type":"Reserved","value":"CASE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ColumnName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"WhenClause"}, [
                new Element("token", {"type":"Reserved","value":"WHEN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("WHEN"),
                ]),
                new Element("node", {"type":"Expression"}, [
                  new Element("node", {"type":"NumericLiteral","value":"1"}, [
                    new Element("token", {"type":"Numeric"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("1"),
                    ]),
                  ]),
                ]),
                new Element("node", {"type":"ThenClause"}, [
                  new Element("token", {"type":"Reserved","value":"THEN"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"StringLiteral","value":"a"}, [
                      new Element("token", {"type":"String"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Identifier","value":"END"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"x"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("x"),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"test"}, [
                new Element("token", {"type":"Identifier","value":"TEST"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"CaseExpression"}, [
              new Element("token", {"type":"Reserved","value":"CASE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"ColumnReference"}, [
                  new Element("node", {"type":"ColumnName","value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"WhenClause"}, [
                new Element("token", {"type":"Reserved","value":"WHEN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("WHEN"),
                ]),
                new Element("node", {"type":"Expression"}, [
                  new Element("node", {"type":"NumericLiteral","value":"1"}, [
                    new Element("token", {"type":"Numeric"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("1"),
                    ]),
                  ]),
                ]),
                new Element("node", {"type":"ThenClause"}, [
                  new Element("token", {"type":"Reserved","value":"THEN"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"StringLiteral","value":"a"}, [
                      new Element("token", {"type":"String"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"WhenClause"}, [
                new Element("token", {"type":"Reserved","value":"WHEN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("WHEN"),
                ]),
                new Element("node", {"type":"Expression"}, [
                  new Element("node", {"type":"NumericLiteral","value":"2"}, [
                    new Element("token", {"type":"Numeric"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("2"),
                    ]),
                  ]),
                ]),
                new Element("node", {"type":"ThenClause"}, [
                  new Element("token", {"type":"Reserved","value":"THEN"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"StringLiteral","value":"b"}, [
                      new Element("token", {"type":"String"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("'b'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"ElseClause"}, [
                new Element("token", {"type":"Reserved","value":"ELSE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("ELSE"),
                ]),
                new Element("node", {"type":"Expression"}, [
                  new Element("node", {"type":"StringLiteral","value":"c"}, [
                    new Element("token", {"type":"String"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("'c'"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Identifier","value":"END"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"x"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("x"),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"test"}, [
                new Element("token", {"type":"Identifier","value":"TEST"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"CaseExpression"}, [
              new Element("token", {"type":"Reserved","value":"CASE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("node", {"type":"WhenClause"}, [
                new Element("token", {"type":"Reserved","value":"WHEN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("WHEN"),
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
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("node", {"type":"NumericLiteral","value":"1"}, [
                      new Element("token", {"type":"Numeric"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("node", {"type":"ThenClause"}, [
                  new Element("token", {"type":"Reserved","value":"THEN"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"StringLiteral","value":"a"}, [
                      new Element("token", {"type":"String"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Identifier","value":"END"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Reserved","value":"AS"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("AS"),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"x"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("x"),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"test"}, [
                new Element("token", {"type":"Identifier","value":"TEST"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"CaseExpression"}, [
              new Element("token", {"type":"Reserved","value":"CASE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("node", {"type":"WhenClause"}, [
                new Element("token", {"type":"Reserved","value":"WHEN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("WHEN"),
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
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("node", {"type":"NumericLiteral","value":"1"}, [
                      new Element("token", {"type":"Numeric"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("node", {"type":"ThenClause"}, [
                  new Element("token", {"type":"Reserved","value":"THEN"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"StringLiteral","value":"a"}, [
                      new Element("token", {"type":"String"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"WhenClause"}, [
                new Element("token", {"type":"Reserved","value":"WHEN"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("WHEN"),
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
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("node", {"type":"NumericLiteral","value":"2"}, [
                      new Element("token", {"type":"Numeric"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("2"),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("node", {"type":"ThenClause"}, [
                  new Element("token", {"type":"Reserved","value":"THEN"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"StringLiteral","value":"b"}, [
                      new Element("token", {"type":"String"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("'b'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("node", {"type":"ElseClause"}, [
                new Element("token", {"type":"Reserved","value":"ELSE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("ELSE"),
                ]),
                new Element("node", {"type":"Expression"}, [
                  new Element("node", {"type":"StringLiteral","value":"c"}, [
                    new Element("token", {"type":"String"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("'c'"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Identifier","value":"END"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Reserved","value":"AS"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("AS"),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"x"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("x"),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("FROM"),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"test"}, [
                new Element("token", {"type":"Identifier","value":"TEST"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("node", {"type":"DistinctOption"}, [
        new Element("token", {"type":"Reserved","value":"DISTINCT"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("DISTINCT"),
          new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"ColumnReference"}, [
              new Element("node", {"type":"ObjectName","value":"a"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
                  new Text("a"),
                ]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("node", {"type":"ColumnName","value":"x"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Text("x"),
                  new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"FromClause"}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [
          new Text("FROM"),
          new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
        new Element("node", {"type":"FromObjectList"}, [
          new Element("node", {"type":"FromObject"}, [
            new Element("node", {"type":"ObjectReference"}, [
              new Element("node", {"type":"ObjectName","value":"a"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
                  new Text("a"),
                  new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"CrossJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"CROSS"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("CROSS"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"b"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("b"),
                    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"InnerJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"c"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("c"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"c"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("c"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"InnerJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"INNER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("INNER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"c1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("c1"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"c1"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("c1"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"InnerJoinClause"}, [
            new Element("node", {"type":"NatualOption"}, [
              new Element("token", {"type":"Reserved","value":"NATURAL"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Text("NATURAL"),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"INNER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("INNER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"c2"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("c2"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"c2"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("c2"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"LeftOuterJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"LEFT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("LEFT"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"d"}, [
                  new Element("token", {"type":"Identifier","value":"D"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("d"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"d"}, [
                      new Element("token", {"type":"Identifier","value":"D"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("d"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"LeftOuterJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"LEFT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("LEFT"),
            ]),
            new Element("token", {"type":"Reserved","value":"OUTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("OUTER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"d1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("d1"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"d1"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("d1"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"LeftOuterJoinClause"}, [
            new Element("node", {"type":"NatualOption"}, [
              new Element("token", {"type":"Reserved","value":"NATURAL"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Text("NATURAL"),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"LEFT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("LEFT"),
            ]),
            new Element("token", {"type":"Reserved","value":"OUTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("OUTER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"d2"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("d2"),
                    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"d2"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("d2"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"RightOuterJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"RIGHT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("RIGHT"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"e"}, [
                  new Element("token", {"type":"Identifier","value":"E"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("e"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"e"}, [
                      new Element("token", {"type":"Identifier","value":"E"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("e"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"RightOuterJoinClause"}, [
            new Element("token", {"type":"Reserved","value":"RIGHT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("RIGHT"),
            ]),
            new Element("token", {"type":"Reserved","value":"OUTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("OUTER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"e1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("e1"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"e1"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("e1"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"RightOuterJoinClause"}, [
            new Element("node", {"type":"NatualOption"}, [
              new Element("token", {"type":"Reserved","value":"NATURAL"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Text("NATURAL"),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"RIGHT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("RIGHT"),
            ]),
            new Element("token", {"type":"Reserved","value":"OUTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("OUTER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"e2"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("e2"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"e2"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("e2"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"FullOuterJoinClause"}, [
            new Element("token", {"type":"Identifier","value":"FULL"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("FULL"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"f"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("f"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"f"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("f"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"FullOuterJoinClause"}, [
            new Element("token", {"type":"Identifier","value":"FULL"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("FULL"),
            ]),
            new Element("token", {"type":"Reserved","value":"OUTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("OUTER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"f1"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("f1"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"f1"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("f1"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"FullOuterJoinClause"}, [
            new Element("node", {"type":"NatualOption"}, [
              new Element("token", {"type":"Reserved","value":"NATURAL"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Text("NATURAL"),
              ]),
            ]),
            new Element("token", {"type":"Identifier","value":"FULL"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("FULL"),
            ]),
            new Element("token", {"type":"Reserved","value":"OUTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("OUTER"),
            ]),
            new Element("token", {"type":"Reserved","value":"JOIN"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("JOIN"),
            ]),
            new Element("node", {"type":"FromObject"}, [
              new Element("node", {"type":"ObjectReference"}, [
                new Element("node", {"type":"ObjectName","value":"f2"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("f2"),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"JoinOnClause"}, [
              new Element("token", {"type":"Reserved","value":"ON"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("ON"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"f2"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("f2"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"a"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("a"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"LimitClause"}, [
      new Element("token", {"type":"Reserved","value":"LIMIT"}, [new Text("LIMIT")]),
      new Element("node", {"type":"LimitOption"}, [
        new Element("node", {"type":"Expression"}, [
          new Element("node", {"type":"NumericLiteral","value":"1"}, [
            new Element("token", {"type":"Numeric"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("1"),
            ]),
          ]),
        ]),
      ]),
      new Element("node", {"type":"OffsetOption"}, [
        new Element("token", {"type":"Identifier","value":"OFFSET"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OFFSET"),
        ]),
        new Element("node", {"type":"Expression"}, [
          new Element("node", {"type":"NumericLiteral","value":"2"}, [
            new Element("token", {"type":"Numeric"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("2"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
