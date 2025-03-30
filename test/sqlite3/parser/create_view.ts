import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"CreateViewStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("v_sample"),
      ]),
    ]),
    new Element("token", {"type":"Reserved","value":"AS"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateViewStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"IfNotExistsOption"}, [
      new Element("token", {"type":"Identifier","value":"IF"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("IF"),
      ]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("NOT"),
      ]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EXISTS"),
      ]),
    ]),
    new Element("node", {"type":"SchemaName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [
        new Text("v_sample"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
    ]),
    new Element("token", {"type":"LeftParen"}, [new Text("(")]),
    new Element("node", {"type":"ColumnList"}, [
      new Element("node", {"type":"ColumnName","value":"x"}, [
        new Element("token", {"type":"Identifier"}, [new Text("x")]),
      ]),
    ]),
    new Element("token", {"type":"RightParen"}, [new Text(")")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateViewStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"type":"Identifier","value":"TEMP"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMP"),
      ]),
    ]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"SchemaName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
    new Element("token", {"type":"Reserved","value":"AS"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateViewStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"type":"Reserved","value":"TEMPORARY"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMPORARY"),
      ]),
    ]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"SchemaName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [
        new Text("v_sample"),
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
    new Element("token", {"type":"Reserved","value":"AS"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
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
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"2"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("2"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("node", {"type":"SelectColumn"}, [
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NumericLiteral","value":"3"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("3"),
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
  new Element("node", {"type":"CreateViewStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"type":"Reserved","value":"TEMPORARY"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMPORARY"),
      ]),
    ]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"IfNotExistsOption"}, [
      new Element("token", {"type":"Identifier","value":"IF"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("IF"),
      ]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("NOT"),
      ]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EXISTS"),
      ]),
    ]),
    new Element("node", {"type":"SchemaName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
    new Element("token", {"type":"Reserved","value":"AS"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("AS"),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("token", {"type":"EoF"}),
])
