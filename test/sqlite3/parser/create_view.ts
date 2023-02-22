import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateViewStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"VIEW"}, [new Text("VIEW")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("v_sample")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"VIEW"}, [new Text("VIEW")]),
    new Element("IfNotExistsOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"IF"}, [new Text("IF")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("Identifier", {}, [new Text("v_sample")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    ]),
    new Element("LeftParen", {}, [new Text("(")]),
    new Element("ColumnList", {}, [
      new Element("ColumnName", {"value":"x"}, [
        new Element("Identifier", {}, [new Text("x")]),
      ]),
    ]),
    new Element("RightParen", {}, [new Text(")")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEMP"}, [new Text("TEMP")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"VIEW"}, [new Text("VIEW")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("Identifier", {}, [new Text("v_sample")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"TEMPORARY"}, [new Text("TEMPORARY")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"VIEW"}, [new Text("VIEW")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("Identifier", {}, [new Text("v_sample")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    ]),
    new Element("LeftParen", {}, [new Text("(")]),
    new Element("ColumnList", {}, [
      new Element("ColumnName", {"value":"a"}, [
        new Element("Identifier", {}, [new Text("a")]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("ColumnName", {"value":"b"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("b")]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("ColumnName", {"value":"c"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("c")]),
      ]),
    ]),
    new Element("RightParen", {}, [new Text(")")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("2")]),
              ]),
            ]),
          ]),
          new Element("Comma", {}, [new Text(",")]),
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"3"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("3")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateViewStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"TEMPORARY"}, [new Text("TEMPORARY")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"VIEW"}, [new Text("VIEW")]),
    new Element("IfNotExistsOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"IF"}, [new Text("IF")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"v_sample"}, [
      new Element("Identifier", {}, [new Text("v_sample")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
    new Element("SelectStatement", {}, [
      new Element("SelectClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"SELECT"}, [new Text("SELECT")]),
        new Element("SelectColumnList", {}, [
          new Element("SelectColumn", {}, [
            new Element("Expression", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
])
