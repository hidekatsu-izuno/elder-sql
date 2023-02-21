import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateViewStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [new Text("VIEW")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
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
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [new Text("VIEW")]),
    new Element("IfNotExistsOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IF"}, [new Text("IF")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"LeftParen"}, [new Text("(")]),
    new Element("ColumnList", {}, [
      new Element("ColumnName", {"value":"x"}, [
        new Element("token", {"type":"Identifier"}, [new Text("x")]),
      ]),
    ]),
    new Element("token", {"type":"RightParen"}, [new Text(")")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
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
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEMP"}, [new Text("TEMP")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [new Text("VIEW")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
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
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"TEMPORARY"}, [new Text("TEMPORARY")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [new Text("VIEW")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
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
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
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
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("2")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"Comma"}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("3")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"TEMPORARY"}, [new Text("TEMPORARY")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"VIEW"}, [new Text("VIEW")]),
    new Element("IfNotExistsOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IF"}, [new Text("IF")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
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
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
])
