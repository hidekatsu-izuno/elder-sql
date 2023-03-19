import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("SubtractOperation", {}, [
              new Element("AddOperation", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("Numeric", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("1"),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("+")]),
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("Numeric", {}, [new Text("2")]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("-")]),
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("Numeric", {}, [new Text("3")]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [
          new Text(","),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("DivideOperation", {}, [
              new Element("MultiplyOperation", {}, [
                new Element("UnaryMinusOperation", {}, [
                  new Element("Operator", {}, [new Text("-")]),
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("Numeric", {}, [new Text("1")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("*")]),
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("Numeric", {}, [new Text("2")]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("/")]),
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("Numeric", {}, [new Text("3")]),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"c1"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("c1"),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [
          new Text(","),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("SubtractOperation", {}, [
              new Element("UnaryPlusOperation", {}, [
                new Element("Operator", {}, [new Text("+")]),
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("-")]),
              new Element("MultiplyOperation", {}, [
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("Numeric", {}, [new Text("2")]),
                ]),
                new Element("Operator", {}, [new Text("*")]),
                new Element("NumericLiteral", {"value":"3"}, [
                  new Element("Numeric", {}, [new Text("3")]),
                ]),
              ]),
            ]),
          ]),
          new Element("Reserved", {"value":"AS"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("AS"),
          ]),
          new Element("ColumnAlias", {"value":"c2"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("c2"),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c1"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("c1"),
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
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("LeftParen", {}, [new Text("(")]),
            new Element("SubqueryExpression", {}, [
              new Element("SelectStatement", {}, [
                new Element("SelectClause", {}, [
                  new Element("Reserved", {"value":"SELECT"}, [
                    new Text("SELECT"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                  new Element("SelectColumnList", {}, [
                    new Element("SelectColumn", {}, [
                      new Element("AllColumnsOption", {}, [
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
                          new Element("ObjectName", {"value":"sample"}, [
                            new Element("Identifier", {"value":"SAMPLE"}, [
                              new Element("WhiteSpace", {}, [new Text(" ")]),
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
            new Element("RightParen", {}, [new Text(")")]),
          ]),
        ]),
      ]),
      new Element("GroupByClause", {}, [
        new Element("Reserved", {"value":"GROUP"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("GROUP"),
        ]),
        new Element("Identifier", {"value":"BY"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("BY"),
        ]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c1"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("c1"),
                ]),
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
  new Element("SelectStatement", {}, [
    new Element("WithClause", {}, [
      new Element("Identifier", {"value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableList", {}, [
        new Element("CommonTable", {}, [
          new Element("ObjectName", {"value":"x"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("x"),
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
                  new Element("AllColumnsOption", {}, [
                    new Element("SchemaName", {"value":"s"}, [
                      new Element("Identifier", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("s"),
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
                      new Element("ObjectName", {"value":"sample"}, [
                        new Element("Identifier", {"value":"SAMPLE"}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("sample"),
                        ]),
                      ]),
                    ]),
                    new Element("ObjectAlias", {"value":"s"}, [
                      new Element("Identifier", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("s"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [
            new Text(")"),
            new Element("LineBreak", {}, [new Text("\n")]),
          ]),
        ]),
      ]),
    ]),
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [
        new Text("SELECT"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("AllColumnsOption", {}, [
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
              new Element("ObjectName", {"value":"x"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("x"),
                  new Element("LineBreak", {}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("AndOperation", {}, [
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"x"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("x"),
                  ]),
                ]),
                new Element("Dot", {}, [new Text(".")]),
                new Element("ColumnName", {"value":"col1"}, [
                  new Element("Identifier", {}, [
                    new Text("col1"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("2"),
                ]),
              ]),
            ]),
            new Element("Reserved", {"value":"AND"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("AND"),
            ]),
            new Element("NotOperation", {}, [
              new Element("Reserved", {"value":"NOT"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("NOT"),
                new Element("WhiteSpace", {}, [new Text(" ")]),
              ]),
              new Element("ParenthesesOperation", {}, [
                new Element("LeftParen", {}, [new Text("(")]),
                new Element("Expression", {}, [
                  new Element("OrOperation", {}, [
                    new Element("NotLikeOperation", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"x"}, [
                          new Element("Identifier", {}, [new Text("x")]),
                        ]),
                        new Element("Dot", {}, [new Text(".")]),
                        new Element("ColumnName", {"value":"col2"}, [
                          new Element("Identifier", {}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("Reserved", {"value":"NOT"}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("NOT"),
                      ]),
                      new Element("Identifier", {"value":"LIKE"}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("LIKE"),
                      ]),
                      new Element("StringLiteral", {"value":"%x%"}, [
                        new Element("String", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("'%x%'"),
                        ]),
                      ]),
                    ]),
                    new Element("Reserved", {"value":"OR"}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("OR"),
                    ]),
                    new Element("IsOperation", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"x"}, [
                          new Element("Identifier", {}, [
                            new Element("WhiteSpace", {}, [new Text(" ")]),
                            new Text("x"),
                          ]),
                        ]),
                        new Element("Dot", {}, [new Text(".")]),
                        new Element("ColumnName", {"value":"col2"}, [
                          new Element("Identifier", {}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("Reserved", {"value":"IS"}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("IS"),
                      ]),
                      new Element("NullLiteral", {}, [
                        new Element("Reserved", {"value":"NULL"}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("NULL"),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("RightParen", {}, [
                  new Text(")"),
                  new Element("LineBreak", {}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("OrderByClause", {}, [
      new Element("Reserved", {"value":"ORDER"}, [new Text("ORDER")]),
      new Element("Identifier", {"value":"BY"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("BY"),
      ]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"x"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("x"),
                ]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ColumnName", {"value":"col3"}, [
                new Element("Identifier", {}, [
                  new Text("col3"),
                  new Element("LineBreak", {}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("LimitClause", {}, [
      new Element("Reserved", {"value":"LIMIT"}, [new Text("LIMIT")]),
      new Element("LimitOption", {}, [
        new Element("Expression", {}, [
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
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [
        new Text("SELECT"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("AllColumnsOption", {}, [
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
              new Element("ObjectName", {"value":"a"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("a"),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("SchemaName", {"value":"main"}, [
                new Element("Identifier", {"value":"MAIN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("main"),
                ]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ObjectName", {"value":"b"}, [
                new Element("Identifier", {}, [new Text("b")]),
              ]),
            ]),
            new Element("ObjectAlias", {"value":"x"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("x"),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"c"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("c"),
                ]),
              ]),
            ]),
            new Element("Reserved", {"value":"AS"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("as"),
            ]),
            new Element("ObjectAlias", {"value":"y"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("y"),
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
            new Element("AndOperation", {}, [
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"a"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("a"),
                    ]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [
                      new Text("x"),
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                    ]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("=")]),
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"x"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                ]),
              ]),
              new Element("Reserved", {"value":"AND"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("AND"),
              ]),
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"x"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [
                      new Text("x"),
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                    ]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("=")]),
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"y"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("y"),
                    ]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("Reserved", {"value":"AND"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("AND"),
            ]),
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"y"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("y"),
                  ]),
                ]),
                new Element("Dot", {}, [new Text(".")]),
                new Element("ColumnName", {"value":"y"}, [
                  new Element("Identifier", {}, [
                    new Text("y"),
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"0"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("0"),
                ]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [
        new Text("SELECT"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("UnaryMinusOperation", {}, [
              new Element("Operator", {}, [new Text("-")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("BooleanLiteral", {"value":"TRUE"}, [
              new Element("Identifier", {"value":"TRUE"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("TRUE"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("BooleanLiteral", {"value":"FALSE"}, [
              new Element("Identifier", {"value":"FALSE"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("FALSE"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NullLiteral", {}, [
              new Element("Reserved", {"value":"NULL"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("NULL"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("FunctionExpression", {}, [
              new Element("ObjectName", {"value":"CURRENT_TIME"}, [
                new Element("Reserved", {"value":"CURRENT_TIME"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("CURRENT_TIME"),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("FunctionExpression", {}, [
              new Element("ObjectName", {"value":"CURRENT_DATE"}, [
                new Element("Reserved", {"value":"CURRENT_DATE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("CURRENT_DATE"),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("FunctionExpression", {}, [
              new Element("ObjectName", {"value":"CURRENT_TIMESTAMP"}, [
                new Element("Reserved", {"value":"CURRENT_TIMESTAMP"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("CURRENT_TIMESTAMP"),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"aaa"}, [
              new Element("String", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("'aaa'"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"aaa"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("\"aaa\""),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("BlobLiteral", {"value":"53514C697465"}, [
              new Element("Blob", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("x'53514C697465'"),
                new Element("WhiteSpace", {}, [new Text(" ")]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("PositionalBindVariable", {"value":"1"}, [
              new Element("BindVariable", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("?1"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("PositionalBindVariable", {"value":"2"}, [
              new Element("BindVariable", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("?"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"param"}, [
              new Element("BindVariable", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text(":param"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"param"}, [
              new Element("BindVariable", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("@param"),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"param"}, [
              new Element("BindVariable", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("$param"),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("Reserved", {"value":"CASE"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("WhenClause", {}, [
                new Element("Reserved", {"value":"WHEN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("WHEN"),
                ]),
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("Numeric", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("1"),
                    ]),
                  ]),
                ]),
                new Element("ThenClause", {}, [
                  new Element("Reserved", {"value":"THEN"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("Expression", {}, [
                    new Element("StringLiteral", {"value":"a"}, [
                      new Element("String", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("Identifier", {"value":"END"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("x"),
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
              new Element("ObjectName", {"value":"test"}, [
                new Element("Identifier", {"value":"TEST"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("Reserved", {"value":"CASE"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("x"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("WhenClause", {}, [
                new Element("Reserved", {"value":"WHEN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("WHEN"),
                ]),
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("Numeric", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("1"),
                    ]),
                  ]),
                ]),
                new Element("ThenClause", {}, [
                  new Element("Reserved", {"value":"THEN"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("Expression", {}, [
                    new Element("StringLiteral", {"value":"a"}, [
                      new Element("String", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("WhenClause", {}, [
                new Element("Reserved", {"value":"WHEN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("WHEN"),
                ]),
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"2"}, [
                    new Element("Numeric", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("2"),
                    ]),
                  ]),
                ]),
                new Element("ThenClause", {}, [
                  new Element("Reserved", {"value":"THEN"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("Expression", {}, [
                    new Element("StringLiteral", {"value":"b"}, [
                      new Element("String", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("'b'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("ElseClause", {}, [
                new Element("Reserved", {"value":"ELSE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ELSE"),
                ]),
                new Element("Expression", {}, [
                  new Element("StringLiteral", {"value":"c"}, [
                    new Element("String", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("'c'"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("Identifier", {"value":"END"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("x"),
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
              new Element("ObjectName", {"value":"test"}, [
                new Element("Identifier", {"value":"TEST"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("Reserved", {"value":"CASE"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("WhenClause", {}, [
                new Element("Reserved", {"value":"WHEN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("WHEN"),
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
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("NumericLiteral", {"value":"1"}, [
                      new Element("Numeric", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("ThenClause", {}, [
                  new Element("Reserved", {"value":"THEN"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("Expression", {}, [
                    new Element("StringLiteral", {"value":"a"}, [
                      new Element("String", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("Identifier", {"value":"END"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("Reserved", {"value":"AS"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("AS"),
          ]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("x"),
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
              new Element("ObjectName", {"value":"test"}, [
                new Element("Identifier", {"value":"TEST"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("Reserved", {"value":"CASE"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("CASE"),
              ]),
              new Element("WhenClause", {}, [
                new Element("Reserved", {"value":"WHEN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("WHEN"),
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
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("NumericLiteral", {"value":"1"}, [
                      new Element("Numeric", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("ThenClause", {}, [
                  new Element("Reserved", {"value":"THEN"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("Expression", {}, [
                    new Element("StringLiteral", {"value":"a"}, [
                      new Element("String", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("'a'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("WhenClause", {}, [
                new Element("Reserved", {"value":"WHEN"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("WHEN"),
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
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("NumericLiteral", {"value":"2"}, [
                      new Element("Numeric", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("2"),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("ThenClause", {}, [
                  new Element("Reserved", {"value":"THEN"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("THEN"),
                  ]),
                  new Element("Expression", {}, [
                    new Element("StringLiteral", {"value":"b"}, [
                      new Element("String", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("'b'"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("ElseClause", {}, [
                new Element("Reserved", {"value":"ELSE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ELSE"),
                ]),
                new Element("Expression", {}, [
                  new Element("StringLiteral", {"value":"c"}, [
                    new Element("String", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("'c'"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("Identifier", {"value":"END"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("END"),
              ]),
            ]),
          ]),
          new Element("Reserved", {"value":"AS"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("AS"),
          ]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("x"),
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
              new Element("ObjectName", {"value":"test"}, [
                new Element("Identifier", {"value":"TEST"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("test"),
                ]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("DistinctOption", {}, [
        new Element("Reserved", {"value":"DISTINCT"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("DISTINCT"),
          new Element("LineBreak", {}, [new Text("\n")]),
        ]),
      ]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"a"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text("  ")]),
                  new Text("a"),
                ]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ColumnName", {"value":"x"}, [
                new Element("Identifier", {}, [
                  new Text("x"),
                  new Element("LineBreak", {}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("Reserved", {"value":"FROM"}, [
          new Text("FROM"),
          new Element("LineBreak", {}, [new Text("\n")]),
        ]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"a"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text("  ")]),
                  new Text("a"),
                  new Element("LineBreak", {}, [new Text("\n")]),
                ]),
              ]),
            ]),
            new Element("CrossJoinClause", {}, [
              new Element("Reserved", {"value":"CROSS"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("CROSS"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"b"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("b"),
                      new Element("LineBreak", {}, [new Text("\n")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"c"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("c"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("c"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("Reserved", {"value":"INNER"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("INNER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"c1"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("c1"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c1"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("c1"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("Reserved", {"value":"NATURAL"}, [
                  new Element("WhiteSpace", {}, [new Text("  ")]),
                  new Text("NATURAL"),
                ]),
              ]),
              new Element("Reserved", {"value":"INNER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("INNER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"c2"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("c2"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c2"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("c2"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("Reserved", {"value":"LEFT"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("LEFT"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"d"}, [
                    new Element("Identifier", {"value":"D"}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("d"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d"}, [
                        new Element("Identifier", {"value":"D"}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("d"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("Reserved", {"value":"LEFT"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("LEFT"),
              ]),
              new Element("Reserved", {"value":"OUTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("OUTER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"d1"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("d1"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d1"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("d1"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("Reserved", {"value":"NATURAL"}, [
                  new Element("WhiteSpace", {}, [new Text("  ")]),
                  new Text("NATURAL"),
                ]),
              ]),
              new Element("Reserved", {"value":"LEFT"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("LEFT"),
              ]),
              new Element("Reserved", {"value":"OUTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("OUTER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"d2"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("d2"),
                      new Element("LineBreak", {}, [new Text("\n")]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text("    ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d2"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("d2"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("Reserved", {"value":"RIGHT"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("RIGHT"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"e"}, [
                    new Element("Identifier", {"value":"E"}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("e"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e"}, [
                        new Element("Identifier", {"value":"E"}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("e"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("Reserved", {"value":"RIGHT"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("RIGHT"),
              ]),
              new Element("Reserved", {"value":"OUTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("OUTER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"e1"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("e1"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e1"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("e1"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("Reserved", {"value":"NATURAL"}, [
                  new Element("WhiteSpace", {}, [new Text("  ")]),
                  new Text("NATURAL"),
                ]),
              ]),
              new Element("Reserved", {"value":"RIGHT"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("RIGHT"),
              ]),
              new Element("Reserved", {"value":"OUTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("OUTER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"e2"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("e2"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e2"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("e2"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("Identifier", {"value":"FULL"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("FULL"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"f"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("f"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("f"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("Identifier", {"value":"FULL"}, [
                new Element("WhiteSpace", {}, [new Text("  ")]),
                new Text("FULL"),
              ]),
              new Element("Reserved", {"value":"OUTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("OUTER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"f1"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("f1"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f1"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("f1"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("Reserved", {"value":"NATURAL"}, [
                  new Element("WhiteSpace", {}, [new Text("  ")]),
                  new Text("NATURAL"),
                ]),
              ]),
              new Element("Identifier", {"value":"FULL"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("FULL"),
              ]),
              new Element("Reserved", {"value":"OUTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("OUTER"),
              ]),
              new Element("Reserved", {"value":"JOIN"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("JOIN"),
              ]),
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"f2"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("f2"),
                    ]),
                  ]),
                ]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("Reserved", {"value":"ON"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("ON"),
                ]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f2"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("f2"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                        ]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("Identifier", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("a"),
                        ]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [
                          new Text("x"),
                          new Element("LineBreak", {}, [new Text("\n")]),
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
    ]),
    new Element("LimitClause", {}, [
      new Element("Reserved", {"value":"LIMIT"}, [new Text("LIMIT")]),
      new Element("LimitOption", {}, [
        new Element("Expression", {}, [
          new Element("NumericLiteral", {"value":"1"}, [
            new Element("Numeric", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("1"),
            ]),
          ]),
        ]),
      ]),
      new Element("OffsetOption", {}, [
        new Element("Identifier", {"value":"OFFSET"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("OFFSET"),
        ]),
        new Element("Expression", {}, [
          new Element("NumericLiteral", {"value":"2"}, [
            new Element("Numeric", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("2"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("EoF", {}),
])
