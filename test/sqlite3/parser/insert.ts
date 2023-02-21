import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("token", {"type":"Numeric"}, [new Text("1")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("token", {"type":"Numeric"}, [new Text("1")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"2"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"String"}, [new Text("'2'")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("NullLiteral", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"OR"}, [new Text("OR")]),
        new Element("AbortOption", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"ABORT"}, [new Text("ABORT")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("token", {"type":"Numeric"}, [new Text("1")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"OR"}, [new Text("OR")]),
        new Element("FailOption", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"FAIL"}, [new Text("FAIL")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
      new Element("ObjectAlias", {"value":"sample2"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("sample2")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("ColumnName", {"value":"b"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("b")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("token", {"type":"Numeric"}, [new Text("1")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"2"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("\"2\"")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"OR"}, [new Text("OR")]),
        new Element("IgnoreOption", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"IGNORE"}, [new Text("IGNORE")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
      new Element("ObjectAlias", {"value":"sample2"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("sample2")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("ColumnName", {"value":"b"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("b")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("ColumnName", {"value":"c"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("c")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionGroupList", {}, [
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("\"2\"")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"TRUE"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"TRUE"}, [new Text("TRUE")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"String"}, [new Text("'2'")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"FALSE"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"FALSE"}, [new Text("FALSE")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"OR"}, [new Text("OR")]),
        new Element("ReplaceOption", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"REPLACE"}, [new Text("REPLACE")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionGroupList", {}, [
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("\"2\"")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("NullLiteral", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"String"}, [new Text("'2'")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"TRUE"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"TRUE"}, [new Text("TRUE")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("ExpressionList", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("StringLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("\"2\"")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("Expression", {}, [
              new Element("BooleanLiteral", {"value":"FALSE"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"FALSE"}, [new Text("FALSE")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("OrConflictClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"OR"}, [new Text("OR")]),
        new Element("RollbackOption", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [new Text("ROLLBACK")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("DefaultValuesOption", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"DEFAULT"}, [new Text("DEFAULT")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
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
                  new Element("ObjectName", {"value":"sample2"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("sample2")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("ReplaceOption", {}, [
        new Element("token", {"type":"Identifier","value":"REPLACE"}, [new Text("REPLACE")]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("ColumnList", {}, [
        new Element("ColumnName", {"value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("token", {"type":"Numeric"}, [new Text("1")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("WithClause", {}, [
      new Element("token", {"type":"Identifier","value":"WITH"}, [new Text("WITH")]),
      new Element("CommonTableExpression", {}, [
        new Element("ObjectName", {"value":"X"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("X")]),
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
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Numeric"}, [new Text("1")]),
                  ]),
                ]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
                new Element("ColumnAlias", {"value":"Y"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("Y")]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"Y"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("Y")]),
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
                  new Element("ObjectName", {"value":"X"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("X")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("WithClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"WITH"}, [new Text("WITH")]),
          new Element("CommonTableExpression", {}, [
            new Element("ObjectName", {"value":"X"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("X")]),
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
                    new Element("Expression", {}, [
                      new Element("NumericLiteral", {"value":"1"}, [
                        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Element("token", {"type":"Numeric"}, [new Text("1")]),
                      ]),
                    ]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
                    new Element("ColumnAlias", {"value":"Y"}, [
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier"}, [new Text("Y")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"RightParen"}, [new Text(")")]),
          ]),
        ]),
        new Element("SelectClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"Y"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("Y")]),
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
                  new Element("ObjectName", {"value":"X"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("X")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("ValuesClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"LeftParen"}, [new Text("(")]),
        new Element("ExpressionList", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"1"}, [
              new Element("token", {"type":"Numeric"}, [new Text("1")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("StringLiteral", {"value":"2"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"String"}, [new Text("'2'")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("Expression", {}, [
            new Element("NullLiteral", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"RightParen"}, [new Text(")")]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [new Text("RETURNING")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("SelectStatement", {}, [
        new Element("SelectClause", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("SELECT")]),
          new Element("SelectColumnList", {}, [
            new Element("SelectColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"Y"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("Y")]),
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
                  new Element("ObjectName", {"value":"X"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("X")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [new Text("RETURNING")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"Y"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("Y")]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
            new Element("ColumnAlias", {"value":"Z"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("Z")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("InsertStatement", {}, [
    new Element("InsertClause", {}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("DefaultValuesOption", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"DEFAULT"}, [new Text("DEFAULT")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
      ]),
      new Element("ReturningClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [new Text("RETURNING")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
            new Element("ColumnAlias", {"value":"Z"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("Z")]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("SelectColumn", {}, [
            new Element("AllColumnsOption", {}, [
              new Element("token", {"type":"Operator"}, [new Text("*")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
])
