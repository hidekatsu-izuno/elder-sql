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
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("1")]),
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
        new Element("Comma", {}, [new Text(",")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
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
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("c1")]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
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
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
          new Element("ColumnAlias", {"value":"c2"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("c2")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("FromObjectList", {}, [
          new Element("SubqueryExpression", {}, [
            new Element("LeftParen", {}, [new Text("(")]),
            new Element("SelectStatement", {}, [
              new Element("SelectClause", {}, [
                new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("SelectColumnList", {}, [
                  new Element("SelectColumn", {}, [
                    new Element("AllColumnsOption", {}, [
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
                        new Element("ObjectName", {"value":"sample"}, [
                          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
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
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"GROUP"}, [new Text("GROUP")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"BY"}, [new Text("BY")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("WithClause", {}, [
      new Element("Identifier", {"value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableExpression", {}, [
        new Element("ObjectName", {"value":"x"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("x")]),
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
                new Element("SchemaName", {"value":"s"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {}, [new Text("s")]),
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
                    new Element("ObjectName", {"value":"sample"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
                    ]),
                  ]),
                  new Element("ObjectAlias", {"value":"s"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("s")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
    ]),
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("AllColumnsOption", {}, [
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
              new Element("ObjectName", {"value":"x"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("x")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
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
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {}, [new Text("x")]),
                ]),
                new Element("Dot", {}, [new Text(".")]),
                new Element("ColumnName", {"value":"col1"}, [
                  new Element("Identifier", {}, [new Text("col1")]),
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("2")]),
              ]),
            ]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"AND"}, [new Text("AND")]),
            new Element("NotOperation", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
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
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {"value":"LIKE"}, [new Text("LIKE")]),
                      new Element("StringLiteral", {"value":"%x%"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'%x%'")]),
                      ]),
                    ]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"OR"}, [new Text("OR")]),
                    new Element("IsOperation", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"x"}, [
                          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          new Element("Identifier", {}, [new Text("x")]),
                        ]),
                        new Element("Dot", {}, [new Text(".")]),
                        new Element("ColumnName", {"value":"col2"}, [
                          new Element("Identifier", {}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Reserved", {"value":"IS"}, [new Text("IS")]),
                      new Element("NullLiteral", {}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("RightParen", {}, [new Text(")")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("OrderByClause", {}, [
      new Element("Reserved", {"value":"ORDER"}, [new Text("ORDER")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"BY"}, [new Text("BY")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"x"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("x")]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ColumnName", {"value":"col3"}, [
                new Element("Identifier", {}, [new Text("col3")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
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
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Numeric", {}, [new Text("1")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("AllColumnsOption", {}, [
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
              new Element("ObjectName", {"value":"a"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("a")]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("SchemaName", {"value":"main"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ObjectName", {"value":"b"}, [
                new Element("Identifier", {}, [new Text("b")]),
              ]),
            ]),
            new Element("ObjectAlias", {"value":"x"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("x")]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"c"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c")]),
              ]),
            ]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"AS"}, [new Text("as")]),
            new Element("ObjectAlias", {"value":"y"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("y")]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("AndOperation", {}, [
            new Element("AndOperation", {}, [
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"a"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("a")]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [new Text("x")]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("=")]),
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"x"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                ]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"AND"}, [new Text("AND")]),
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"x"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [new Text("x")]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("=")]),
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"y"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("y")]),
                  ]),
                  new Element("Dot", {}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"AND"}, [new Text("AND")]),
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"y"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {}, [new Text("y")]),
                ]),
                new Element("Dot", {}, [new Text(".")]),
                new Element("ColumnName", {"value":"y"}, [
                  new Element("Identifier", {}, [new Text("y")]),
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"0"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("0")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
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
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"TRUE"}, [new Text("TRUE")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("BooleanLiteral", {"value":"FALSE"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"FALSE"}, [new Text("FALSE")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NullLiteral", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("FunctionExpression", {}, [
              new Element("ObjectName", {"value":"CURRENT_TIME"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"CURRENT_TIME"}, [new Text("CURRENT_TIME")]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("FunctionExpression", {}, [
              new Element("ObjectName", {"value":"CURRENT_DATE"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"CURRENT_DATE"}, [new Text("CURRENT_DATE")]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("FunctionExpression", {}, [
              new Element("ObjectName", {"value":"CURRENT_TIMESTAMP"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"CURRENT_TIMESTAMP"}, [new Text("CURRENT_TIMESTAMP")]),
              ]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"aaa"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("String", {}, [new Text("'aaa'")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"aaa"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("\"aaa\"")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("BlobLiteral", {"value":"53514C697465"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Blob", {}, [new Text("x'53514C697465'")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("PositionalBindVariable", {"value":"1"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("BindVariable", {}, [new Text("?1")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("PositionalBindVariable", {"value":"2"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("BindVariable", {}, [new Text("?")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"param"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("BindVariable", {}, [new Text(":param")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"param"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("BindVariable", {}, [new Text("@param")]),
            ]),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"param"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("BindVariable", {}, [new Text("$param")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"CASE"}, [new Text("CASE")]),
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                ]),
              ]),
              new Element("CaseConditionList", {}, [
                new Element("CaseCondition", {}, [
                  new Element("WhenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"WHEN"}, [new Text("WHEN")]),
                    new Element("Expression", {}, [
                      new Element("NumericLiteral", {"value":"1"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Numeric", {}, [new Text("1")]),
                      ]),
                    ]),
                  ]),
                  new Element("ThenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"THEN"}, [new Text("THEN")]),
                    new Element("Expression", {}, [
                      new Element("StringLiteral", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'a'")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"END"}, [new Text("END")]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("x")]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"test"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"CASE"}, [new Text("CASE")]),
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("x")]),
                  ]),
                ]),
              ]),
              new Element("CaseConditionList", {}, [
                new Element("CaseCondition", {}, [
                  new Element("WhenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"WHEN"}, [new Text("WHEN")]),
                    new Element("Expression", {}, [
                      new Element("NumericLiteral", {"value":"1"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Numeric", {}, [new Text("1")]),
                      ]),
                    ]),
                  ]),
                  new Element("ThenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"THEN"}, [new Text("THEN")]),
                    new Element("Expression", {}, [
                      new Element("StringLiteral", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'a'")]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("CaseCondition", {}, [
                  new Element("WhenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"WHEN"}, [new Text("WHEN")]),
                    new Element("Expression", {}, [
                      new Element("NumericLiteral", {"value":"2"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Numeric", {}, [new Text("2")]),
                      ]),
                    ]),
                  ]),
                  new Element("ThenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"THEN"}, [new Text("THEN")]),
                    new Element("Expression", {}, [
                      new Element("StringLiteral", {"value":"b"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'b'")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("ElseClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"ELSE"}, [new Text("ELSE")]),
                new Element("Expression", {}, [
                  new Element("StringLiteral", {"value":"c"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("String", {}, [new Text("'c'")]),
                  ]),
                ]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"END"}, [new Text("END")]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("x")]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"test"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"CASE"}, [new Text("CASE")]),
              new Element("CaseConditionList", {}, [
                new Element("CaseCondition", {}, [
                  new Element("WhenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"WHEN"}, [new Text("WHEN")]),
                    new Element("Expression", {}, [
                      new Element("EqualOperation", {}, [
                        new Element("ColumnReference", {}, [
                          new Element("ColumnName", {"value":"x"}, [
                            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                            new Element("Identifier", {}, [new Text("x")]),
                            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          ]),
                        ]),
                        new Element("Operator", {}, [new Text("=")]),
                        new Element("NumericLiteral", {"value":"1"}, [
                          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          new Element("Numeric", {}, [new Text("1")]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("ThenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"THEN"}, [new Text("THEN")]),
                    new Element("Expression", {}, [
                      new Element("StringLiteral", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'a'")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"END"}, [new Text("END")]),
            ]),
          ]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("x")]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"test"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("CaseExpression", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"CASE"}, [new Text("CASE")]),
              new Element("CaseConditionList", {}, [
                new Element("CaseCondition", {}, [
                  new Element("WhenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"WHEN"}, [new Text("WHEN")]),
                    new Element("Expression", {}, [
                      new Element("EqualOperation", {}, [
                        new Element("ColumnReference", {}, [
                          new Element("ColumnName", {"value":"x"}, [
                            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                            new Element("Identifier", {}, [new Text("x")]),
                            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          ]),
                        ]),
                        new Element("Operator", {}, [new Text("=")]),
                        new Element("NumericLiteral", {"value":"1"}, [
                          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          new Element("Numeric", {}, [new Text("1")]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("ThenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"THEN"}, [new Text("THEN")]),
                    new Element("Expression", {}, [
                      new Element("StringLiteral", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'a'")]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("CaseCondition", {}, [
                  new Element("WhenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"WHEN"}, [new Text("WHEN")]),
                    new Element("Expression", {}, [
                      new Element("EqualOperation", {}, [
                        new Element("ColumnReference", {}, [
                          new Element("ColumnName", {"value":"x"}, [
                            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                            new Element("Identifier", {}, [new Text("x")]),
                            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          ]),
                        ]),
                        new Element("Operator", {}, [new Text("=")]),
                        new Element("NumericLiteral", {"value":"2"}, [
                          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          new Element("Numeric", {}, [new Text("2")]),
                        ]),
                      ]),
                    ]),
                  ]),
                  new Element("ThenClause", {}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Reserved", {"value":"THEN"}, [new Text("THEN")]),
                    new Element("Expression", {}, [
                      new Element("StringLiteral", {"value":"b"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("String", {}, [new Text("'b'")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("ElseClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"ELSE"}, [new Text("ELSE")]),
                new Element("Expression", {}, [
                  new Element("StringLiteral", {"value":"c"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("String", {}, [new Text("'c'")]),
                  ]),
                ]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"END"}, [new Text("END")]),
            ]),
          ]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
          new Element("ColumnAlias", {"value":"x"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("x")]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"test"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
      new Element("DistinctOption", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"DISTINCT"}, [new Text("DISTINCT")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"a"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
                new Element("Identifier", {}, [new Text("a")]),
              ]),
              new Element("Dot", {}, [new Text(".")]),
              new Element("ColumnName", {"value":"x"}, [
                new Element("Identifier", {}, [new Text("x")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"a"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
                new Element("Identifier", {}, [new Text("a")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
            ]),
            new Element("CrossJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"CROSS"}, [new Text("CROSS")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"b"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("b")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"c"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("c")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"INNER"}, [new Text("INNER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"c1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c1")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c1"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("c1")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
                new Element("Reserved", {"value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"INNER"}, [new Text("INNER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"c2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("c2")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c2"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("c2")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"LEFT"}, [new Text("LEFT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"d"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"D"}, [new Text("d")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {"value":"D"}, [new Text("d")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"LEFT"}, [new Text("LEFT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"OUTER"}, [new Text("OUTER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"d1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("d1")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d1"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("d1")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
                new Element("Reserved", {"value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"LEFT"}, [new Text("LEFT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"OUTER"}, [new Text("OUTER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"d2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("d2")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d2"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("d2")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"RIGHT"}, [new Text("RIGHT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"e"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"E"}, [new Text("e")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {"value":"E"}, [new Text("e")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Reserved", {"value":"RIGHT"}, [new Text("RIGHT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"OUTER"}, [new Text("OUTER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"e1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("e1")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e1"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("e1")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
                new Element("Reserved", {"value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"RIGHT"}, [new Text("RIGHT")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"OUTER"}, [new Text("OUTER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"e2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("e2")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e2"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("e2")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Identifier", {"value":"FULL"}, [new Text("FULL")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"f"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("f")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("f")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
              new Element("Identifier", {"value":"FULL"}, [new Text("FULL")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"OUTER"}, [new Text("OUTER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"f1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("f1")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f1"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("f1")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
                new Element("Reserved", {"value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"FULL"}, [new Text("FULL")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"OUTER"}, [new Text("OUTER")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"f2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("f2")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f2"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("f2")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("Operator", {}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                        new Element("Identifier", {}, [new Text("a")]),
                      ]),
                      new Element("Dot", {}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("Identifier", {}, [new Text("x")]),
                        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
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
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Numeric", {}, [new Text("1")]),
          ]),
        ]),
      ]),
      new Element("OffsetOption", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"OFFSET"}, [new Text("OFFSET")]),
        new Element("Expression", {}, [
          new Element("NumericLiteral", {"value":"2"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Numeric", {}, [new Text("2")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
