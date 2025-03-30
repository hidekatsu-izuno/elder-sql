import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"String"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("'2'"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NullLiteral"}, [
                new Element("token", {"type":"Reserved","value":"NULL"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("NULL"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("node", {"type":"OrConflictClause"}, [
        new Element("token", {"type":"Reserved","value":"OR"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("node", {"type":"AbortOption"}, [
          new Element("token", {"type":"Identifier","value":"ABORT"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("ABORT"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Text("sample"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("node", {"type":"ColumnName","value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("node", {"type":"OrConflictClause"}, [
        new Element("token", {"type":"Reserved","value":"OR"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("node", {"type":"FailOption"}, [
          new Element("token", {"type":"Identifier","value":"FAIL"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("FAIL"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"AS"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("AS"),
      ]),
      new Element("node", {"type":"ObjectAlias","value":"sample2"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample2"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("node", {"type":"ColumnName","value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"ColumnName","value":"b"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("b"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("node", {"type":"OrConflictClause"}, [
        new Element("token", {"type":"Reserved","value":"OR"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("node", {"type":"IgnoreOption"}, [
          new Element("token", {"type":"Identifier","value":"IGNORE"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("IGNORE"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("token", {"type":"Reserved","value":"AS"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("AS"),
      ]),
      new Element("node", {"type":"ObjectAlias","value":"sample2"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample2"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("node", {"type":"ColumnName","value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"ColumnName","value":"b"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("b"),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("node", {"type":"ColumnName","value":"c"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("c"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"BooleanLiteral","value":"TRUE"}, [
                new Element("token", {"type":"Identifier","value":"TRUE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("TRUE"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("token", {"type":"Comma"}, [
            new Text(","),
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"String"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("'2'"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"BooleanLiteral","value":"FALSE"}, [
                new Element("token", {"type":"Identifier","value":"FALSE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("FALSE"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("node", {"type":"OrConflictClause"}, [
        new Element("token", {"type":"Reserved","value":"OR"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("node", {"type":"ReplaceOption"}, [
          new Element("token", {"type":"Identifier","value":"REPLACE"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("REPLACE"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NullLiteral"}, [
                new Element("token", {"type":"Reserved","value":"NULL"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("NULL"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("token", {"type":"Comma"}, [
            new Text(","),
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"String"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("'2'"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"BooleanLiteral","value":"TRUE"}, [
                new Element("token", {"type":"Identifier","value":"TRUE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("TRUE"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("token", {"type":"Comma"}, [
            new Text(","),
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("\"2\""),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"BooleanLiteral","value":"FALSE"}, [
                new Element("token", {"type":"Identifier","value":"FALSE"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("FALSE"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("node", {"type":"OrConflictClause"}, [
        new Element("token", {"type":"Reserved","value":"OR"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OR"),
        ]),
        new Element("node", {"type":"RollbackOption"}, [
          new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("ROLLBACK"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"SelectStatement"}, [
        new Element("node", {"type":"SelectClause"}, [
          new Element("token", {"type":"Reserved","value":"SELECT"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
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
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("node", {"type":"DefaultValuesOption"}, [
        new Element("token", {"type":"Reserved","value":"DEFAULT"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("DEFAULT"),
        ]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"SelectStatement"}, [
        new Element("node", {"type":"SelectClause"}, [
          new Element("token", {"type":"Reserved","value":"SELECT"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
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
                  new Element("node", {"type":"ObjectName","value":"sample2"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("node", {"type":"ReplaceOption"}, [
        new Element("token", {"type":"Identifier","value":"REPLACE"}, [new Text("REPLACE")]),
      ]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Text("sample"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("node", {"type":"ColumnName","value":"a"}, [
          new Element("token", {"type":"Identifier"}, [new Text("a")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"WithClause"}, [
      new Element("token", {"type":"Identifier","value":"WITH"}, [new Text("WITH")]),
      new Element("node", {"type":"CommonTableList"}, [
        new Element("node", {"type":"CommonTable"}, [
          new Element("node", {"type":"ObjectName","value":"X"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("X"),
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
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"NumericLiteral","value":"1"}, [
                      new Element("token", {"type":"Numeric"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("1"),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Reserved","value":"AS"}, [
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
          new Element("token", {"type":"RightParen"}, [
            new Text(")"),
            new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
          ]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"SelectStatement"}, [
        new Element("node", {"type":"SelectClause"}, [
          new Element("token", {"type":"Reserved","value":"SELECT"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
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
            new Element("token", {"type":"Reserved","value":"FROM"}, [
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
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"SelectStatement"}, [
        new Element("node", {"type":"WithClause"}, [
          new Element("token", {"type":"Identifier","value":"WITH"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("WITH"),
          ]),
          new Element("node", {"type":"CommonTableList"}, [
            new Element("node", {"type":"CommonTable"}, [
              new Element("node", {"type":"ObjectName","value":"X"}, [
                new Element("token", {"type":"Identifier"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("X"),
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
                      new Element("node", {"type":"Expression"}, [
                        new Element("node", {"type":"NumericLiteral","value":"1"}, [
                          new Element("token", {"type":"Numeric"}, [
                            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                            new Text("1"),
                          ]),
                        ]),
                      ]),
                      new Element("token", {"type":"Reserved","value":"AS"}, [
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
        new Element("node", {"type":"SelectClause"}, [
          new Element("token", {"type":"Reserved","value":"SELECT"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
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
            new Element("token", {"type":"Reserved","value":"FROM"}, [
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
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"ValuesClause"}, [
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        ]),
        new Element("node", {"type":"ExpressionListGroup"}, [
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"ExpressionList"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"StringLiteral","value":"2"}, [
                new Element("token", {"type":"String"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("'2'"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NullLiteral"}, [
                new Element("token", {"type":"Reserved","value":"NULL"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("NULL"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
      new Element("node", {"type":"ReturningClause"}, [
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
      new Element("node", {"type":"SelectStatement"}, [
        new Element("node", {"type":"SelectClause"}, [
          new Element("token", {"type":"Reserved","value":"SELECT"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("SELECT"),
          ]),
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
            new Element("token", {"type":"Reserved","value":"FROM"}, [
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
      new Element("node", {"type":"ReturningClause"}, [
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("RETURNING"),
        ]),
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
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("1"),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Reserved","value":"AS"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("AS"),
            ]),
            new Element("node", {"type":"ColumnAlias","value":"Z"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("Z"),
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
  new Element("node", {"type":"InsertStatement"}, [
    new Element("node", {"type":"InsertClause"}, [
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("token", {"type":"Reserved","value":"INTO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INTO"),
      ]),
      new Element("node", {"type":"ObjectName","value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
      new Element("node", {"type":"DefaultValuesOption"}, [
        new Element("token", {"type":"Reserved","value":"DEFAULT"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("DEFAULT"),
        ]),
        new Element("token", {"type":"Reserved","value":"VALUES"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("VALUES"),
        ]),
      ]),
      new Element("node", {"type":"ReturningClause"}, [
        new Element("token", {"type":"Reserved","value":"RETURNING"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("RETURNING"),
        ]),
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
            new Element("token", {"type":"Reserved","value":"AS"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("AS"),
            ]),
            new Element("node", {"type":"ColumnAlias","value":"Z"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("Z"),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [
            new Text(","),
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          ]),
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"AllColumnsOption"}, [
              new Element("token", {"type":"Operator"}, [new Text("*")]),
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
  new Element("token", {"type":"EoF"}),
])
