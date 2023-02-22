import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("Numeric", {}, [new Text("1")]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("Numeric", {}, [new Text("1")]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"2"}, [
              new Element("String", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("'2'"),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("NullLiteral", {}, [
              new Element("Reserved", {"value":"NULL"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("NULL"),
              ]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("Reserved", {"value":"OR"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("AbortOption", {}, [
          new Element("Identifier", {"value":"ABORT"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("ABORT"),
          ]),
        ]),
      ]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Text("sample"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
      ]),
      new Element("LeftParen", {}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("Identifier", {}, [new Text("a")]),
        ]),
      ]),
      new Element("RightParen", {}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("Numeric", {}, [new Text("1")]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("Reserved", {"value":"OR"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("FailOption", {}, [
          new Element("Identifier", {"value":"FAIL"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("FAIL"),
          ]),
        ]),
      ]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("Reserved", {"value":"AS"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("AS"),
      ]),
      new Element("ObjectAlias", {"value":"sample2"}, [
        new Element("Identifier", {}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample2"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
      ]),
      new Element("LeftParen", {}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("Identifier", {}, [new Text("a")]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("ColumnName", {"value":"b"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("b"),
          ]),
        ]),
      ]),
      new Element("RightParen", {}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("Numeric", {}, [new Text("1")]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"2"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("\"2\""),
              ]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("Reserved", {"value":"OR"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("IgnoreOption", {}, [
          new Element("Identifier", {"value":"IGNORE"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("IGNORE"),
          ]),
        ]),
      ]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("Reserved", {"value":"AS"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("AS"),
      ]),
      new Element("ObjectAlias", {"value":"sample2"}, [
        new Element("Identifier", {}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample2"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
      ]),
      new Element("LeftParen", {}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("Identifier", {}, [new Text("a")]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("ColumnName", {"value":"b"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("b"),
          ]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("ColumnName", {"value":"c"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("c"),
          ]),
        ]),
      ]),
      new Element("RightParen", {}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionGroupList", {}, [
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"TRUE"}, [
                new Element("Identifier", {"value":"TRUE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("TRUE"),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [
            new Text(","),
            new Element("WhiteSpace", {}, [new Text(" ")]),
          ]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("String", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("'2'"),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"FALSE"}, [
                new Element("Identifier", {"value":"FALSE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("FALSE"),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("Reserved", {"value":"OR"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("ReplaceOption", {}, [
          new Element("Identifier", {"value":"REPLACE"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("REPLACE"),
          ]),
        ]),
      ]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionGroupList", {}, [
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("NullLiteral", {}, [
                new Element("Reserved", {"value":"NULL"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("NULL"),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [
            new Text(","),
            new Element("WhiteSpace", {}, [new Text(" ")]),
          ]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("String", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("'2'"),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"TRUE"}, [
                new Element("Identifier", {"value":"TRUE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("TRUE"),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
          new Element("Comma", {}, [
            new Text(","),
            new Element("WhiteSpace", {}, [new Text(" ")]),
          ]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("Identifier", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"FALSE"}, [
                new Element("Identifier", {"value":"FALSE"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("FALSE"),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("Reserved", {"value":"OR"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("RollbackOption", {}, [
          new Element("Identifier", {"value":"ROLLBACK"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("ROLLBACK"),
          ]),
        ]),
      ]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("Reserved", {"value":"SELECT"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
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
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("DefaultValuesOption", {}, [
        new Element("Reserved", {"value":"DEFAULT"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("DEFAULT"),
        ]),
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("Reserved", {"value":"SELECT"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
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
          new Element("FromClause", {}, [
            new Element("Reserved", {"value":"FROM"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("FROM"),
            ]),
            new Element("FromObjectList", {}, [
              new Element("FromObject", {}, [
                new Element("ObjectReference", {}, [
                  new Element("ObjectName", {"value":"sample2"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("sample2"),
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
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("ReplaceOption", {}, [
        new Element("Identifier", {"value":"REPLACE"}, [new Text("REPLACE")]),
      ]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Text("sample"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
      ]),
      new Element("LeftParen", {}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("Identifier", {}, [new Text("a")]),
        ]),
      ]),
      new Element("RightParen", {}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("Numeric", {}, [new Text("1")]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("WithClause", {}, [
      new Element("Identifier", {"value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableExpression", {}, [
        new Element("ObjectName", {"value":"X"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("X"),
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
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("Numeric", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("1"),
                    ]),
                  ]),
                ]),
                new Element("Reserved", {"value":"AS"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("AS"),
                ]),
                new Element("ColumnAlias", {"value":"Y"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("Y"),
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
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
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
                  new Element("ColumnName", {"value":"Y"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("Y"),
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
                  new Element("ObjectName", {"value":"X"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("X"),
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
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("WithClause", {}, [
          new Element("Identifier", {"value":"WITH"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("WITH"),
          ]),
          new Element("CommonTableExpression", {}, [
            new Element("ObjectName", {"value":"X"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("X"),
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
                    new Element("Expression", {}, [
                      new Element("NumericLiteral", {"value":"1"}, [
                        new Element("Numeric", {}, [
                          new Element("WhiteSpace", {}, [new Text(" ")]),
                          new Text("1"),
                        ]),
                      ]),
                    ]),
                    new Element("Reserved", {"value":"AS"}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("AS"),
                    ]),
                    new Element("ColumnAlias", {"value":"Y"}, [
                      new Element("Identifier", {}, [
                        new Element("WhiteSpace", {}, [new Text(" ")]),
                        new Text("Y"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightParen", {}, [new Text(")")]),
          ]),
        ]),
        new Element("SelectClause", {}, [
          new Element("Reserved", {"value":"SELECT"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"Y"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("Y"),
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
                  new Element("ObjectName", {"value":"X"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("X"),
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
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("LeftParen", {}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("Numeric", {}, [new Text("1")]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"2"}, [
              new Element("String", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("'2'"),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("NullLiteral", {}, [
              new Element("Reserved", {"value":"NULL"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("NULL"),
              ]),
            ]),
          ]),
        ]),
        new Element("RightParen", {}, [new Text(")")]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("Reserved", {"value":"RETURNING"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RETURNING"),
          new Element("WhiteSpace", {}, [new Text(" ")]),
        ]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("Operator", {}, [new Text("*")]),
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
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
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
                  new Element("ColumnName", {"value":"Y"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("Y"),
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
                  new Element("ObjectName", {"value":"X"}, [
                    new Element("Identifier", {}, [
                      new Element("WhiteSpace", {}, [new Text(" ")]),
                      new Text("X"),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("Reserved", {"value":"RETURNING"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RETURNING"),
        ]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"Y"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("Y"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("1"),
                ]),
              ]),
            ]),
            new Element("Reserved", {"value":"AS"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("AS"),
            ]),
            new Element("ColumnAlias", {"value":"Z"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("Z"),
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
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("Reserved", {"value":"INTO"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("DefaultValuesOption", {}, [
        new Element("Reserved", {"value":"DEFAULT"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("DEFAULT"),
        ]),
        new Element("Reserved", {"value":"VALUES"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("VALUES"),
        ]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("Reserved", {"value":"RETURNING"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RETURNING"),
        ]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("1"),
                ]),
              ]),
            ]),
            new Element("Reserved", {"value":"AS"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("AS"),
            ]),
            new Element("ColumnAlias", {"value":"Z"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("Z"),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [
            new Text(","),
            new Element("WhiteSpace", {}, [new Text(" ")]),
          ]),
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("Operator", {}, [new Text("*")]),
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
])
