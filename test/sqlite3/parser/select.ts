import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("SubtractOperation", {}, [
              new Element("AddOperation", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("+")]),
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("-")]),
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("token", {"type":"Numeric"}, [new Text("3")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("DivideOperation", {}, [
              new Element("MultiplyOperation", {}, [
                new Element("UnaryMinusOperation", {}, [
                  new Element("token", {"type":"Operator"}, [new Text("-")]),
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("token", {"type":"Numeric"}, [new Text("1")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("*")]),
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("/")]),
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("token", {"type":"Numeric"}, [new Text("3")]),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"c1"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier"}, [new Text("c1")]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("SubtractOperation", {}, [
              new Element("UnaryPlusOperation", {}, [
                new Element("token", {"type":"Operator"}, [new Text("+")]),
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("-")]),
              new Element("MultiplyOperation", {}, [
                new Element("NumericLiteral", {"value":"2"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("2")]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("*")]),
                new Element("NumericLiteral", {"value":"3"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("3")]),
                ]),
              ]),
            ]),
          ]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
          new Element("ColumnAlias", {"value":"c2"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier"}, [new Text("c2")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("FromObjectList", {}, [
          new Element("SubqueryExpression", {}, [
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("SelectStatement", {}, [
              new Element("SelectClause", {}, [
                new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("SelectColumnList", {}, [
                  new Element("SelectColumn", {}, [
                    new Element("AllColumnsOption", {}, [
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
                        new Element("ObjectName", {"value":"sample"}, [
                          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
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
      new Element("GroupByClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"GROUP"}, [new Text("GROUP")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"BY"}, [new Text("BY")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("WithClause", {}, [
      new Element("token", {"type":"Identifier","value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableExpression", {}, [
        new Element("ObjectName", {"value":"x"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("x")]),
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
                new Element("SchemaName", {"value":"s"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("s")]),
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
                    new Element("ObjectName", {"value":"sample"}, [
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
                    ]),
                  ]),
                  new Element("ObjectAlias", {"value":"s"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("s")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("AllColumnsOption", {}, [
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
              new Element("ObjectName", {"value":"x"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("x")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("AndOperation", {}, [
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"x"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("x")]),
                ]),
                new Element("token", {"type":"Dot"}, [new Text(".")]),
                new Element("ColumnName", {"value":"col1"}, [
                  new Element("token", {"type":"Identifier"}, [new Text("col1")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("2")]),
              ]),
            ]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AND"}, [new Text("AND")]),
            new Element("NotOperation", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("ParenthesesOperation", {}, [
                new Element("token", {"type":"LeftParen"}, [new Text("(")]),
                new Element("Expression", {}, [
                  new Element("OrOperation", {}, [
                    new Element("NotLikeOperation", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"x"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("ColumnName", {"value":"col2"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier","value":"LIKE"}, [new Text("LIKE")]),
                      new Element("StringLiteral", {"value":"%x%"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"String"}, [new Text("'%x%'")]),
                      ]),
                    ]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Reserved","value":"OR"}, [new Text("OR")]),
                    new Element("IsOperation", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"x"}, [
                          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("ColumnName", {"value":"col2"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("col2")]),
                        ]),
                      ]),
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Reserved","value":"IS"}, [new Text("IS")]),
                      new Element("NullLiteral", {}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("token", {"type":"RightParen"}, [new Text(")")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("OrderByClause", {}, [
      new Element("token", {"type":"Reserved","value":"ORDER"}, [new Text("ORDER")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"BY"}, [new Text("BY")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ObjectName", {"value":"x"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("x")]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("ColumnName", {"value":"col3"}, [
                new Element("token", {"type":"Identifier"}, [new Text("col3")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("LimitClause", {}, [
      new Element("token", {"type":"Reserved","value":"LIMIT"}, [new Text("LIMIT")]),
      new Element("LimitOption", {}, [
        new Element("Expression", {}, [
          new Element("NumericLiteral", {"value":"1"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Numeric"}, [new Text("1")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("AllColumnsOption", {}, [
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
              new Element("ObjectName", {"value":"a"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("a")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("SchemaName", {"value":"main"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
              ]),
              new Element("token", {"type":"Dot"}, [new Text(".")]),
              new Element("ObjectName", {"value":"b"}, [
                new Element("token", {"type":"Identifier"}, [new Text("b")]),
              ]),
            ]),
            new Element("ObjectAlias", {"value":"x"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("x")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"c"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
              ]),
            ]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AS"}, [new Text("as")]),
            new Element("ObjectAlias", {"value":"y"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("y")]),
            ]),
          ]),
        ]),
      ]),
      new Element("WhereClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
        new Element("Expression", {}, [
          new Element("AndOperation", {}, [
            new Element("AndOperation", {}, [
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"a"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("a")]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("=")]),
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"x"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  ]),
                ]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"AND"}, [new Text("AND")]),
              new Element("EqualOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"x"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("=")]),
                new Element("ColumnReference", {}, [
                  new Element("ObjectName", {"value":"y"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("y")]),
                  ]),
                  new Element("token", {"type":"Dot"}, [new Text(".")]),
                  new Element("ColumnName", {"value":"x"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AND"}, [new Text("AND")]),
            new Element("EqualOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"y"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("y")]),
                ]),
                new Element("token", {"type":"Dot"}, [new Text(".")]),
                new Element("ColumnName", {"value":"y"}, [
                  new Element("token", {"type":"Identifier"}, [new Text("y")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("=")]),
              new Element("NumericLiteral", {"value":"0"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("0")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NamedBindVariable", {"value":"aaa"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"BindVariable"}, [new Text(":aaa")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("PositionalBindVariable", {"value":"1"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"BindVariable"}, [new Text("?")]),
              new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
            ]),
          ]),
        ]),
      ]),
      new Element("FromClause", {}, [
        new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("FromObjectList", {}, [
          new Element("FromObject", {}, [
            new Element("ObjectReference", {}, [
              new Element("ObjectName", {"value":"a"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Element("token", {"type":"Identifier"}, [new Text("a")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
            new Element("CrossJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"CROSS"}, [new Text("CROSS")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"b"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("b")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"c"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("c")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"INNER"}, [new Text("INNER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"c1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c1")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c1"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("c1")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("InnerJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Element("token", {"type":"Reserved","value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"INNER"}, [new Text("INNER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"c2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c2")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"c2"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("c2")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"LEFT"}, [new Text("LEFT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"d"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"D"}, [new Text("d")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier","value":"D"}, [new Text("d")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"LEFT"}, [new Text("LEFT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"OUTER"}, [new Text("OUTER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"d1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("d1")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d1"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("d1")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("LeftOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Element("token", {"type":"Reserved","value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"LEFT"}, [new Text("LEFT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"OUTER"}, [new Text("OUTER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"d2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("d2")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"d2"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("d2")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"RIGHT"}, [new Text("RIGHT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"e"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"E"}, [new Text("e")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier","value":"E"}, [new Text("e")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Reserved","value":"RIGHT"}, [new Text("RIGHT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"OUTER"}, [new Text("OUTER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"e1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("e1")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e1"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("e1")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Element("token", {"type":"Reserved","value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"RIGHT"}, [new Text("RIGHT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"OUTER"}, [new Text("OUTER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"e2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("e2")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"e2"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("e2")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Identifier","value":"FULL"}, [new Text("FULL")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"f"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("f")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("f")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Element("token", {"type":"Identifier","value":"FULL"}, [new Text("FULL")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"OUTER"}, [new Text("OUTER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"f1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("f1")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f1"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("f1")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("FullOuterJoinClause", {}, [
              new Element("NatualOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
                new Element("token", {"type":"Reserved","value":"NATURAL"}, [new Text("NATURAL")]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier","value":"FULL"}, [new Text("FULL")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"OUTER"}, [new Text("OUTER")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"JOIN"}, [new Text("JOIN")]),
              new Element("ObjectName", {"value":"f2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("f2")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
              new Element("JoinOnClause", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
                new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
                new Element("Expression", {}, [
                  new Element("EqualOperation", {}, [
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"f2"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("f2")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                    new Element("token", {"type":"Operator"}, [new Text("=")]),
                    new Element("ColumnReference", {}, [
                      new Element("ObjectName", {"value":"a"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Identifier"}, [new Text("a")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("ColumnName", {"value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
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
      new Element("token", {"type":"Reserved","value":"LIMIT"}, [new Text("LIMIT")]),
      new Element("LimitOption", {}, [
        new Element("Expression", {}, [
          new Element("NumericLiteral", {"value":"1"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Numeric"}, [new Text("1")]),
          ]),
        ]),
      ]),
      new Element("OffsetOption", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"OFFSET"}, [new Text("OFFSET")]),
        new Element("Expression", {}, [
          new Element("NumericLiteral", {"value":"2"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Numeric"}, [new Text("2")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
