import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("PragmaName", {"value":"analysis_limit"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("analysis_limit"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("PragmaName", {"value":"analysis_limit"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("analysis_limit"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
    ]),
    new Element("Operator", {}, [new Text("=")]),
    new Element("PragmaValue", {}, [
      new Element("NumericLiteral", {"value":"3"}, [
        new Element("Numeric", {}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("3"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("PragmaName", {"value":"application_id"}, [
      new Element("Identifier", {}, [new Text("application_id")]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("PragmaName", {"value":"application_id"}, [
      new Element("Identifier", {}, [
        new Text("application_id"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
    ]),
    new Element("Operator", {}, [
      new Text("="),
      new Element("WhiteSpace", {}, [new Text(" ")]),
    ]),
    new Element("PragmaValue", {}, [
      new Element("Expression", {}, [
        new Element("UnaryMinusOperation", {}, [
          new Element("Operator", {}, [new Text("-")]),
          new Element("NumericLiteral", {"value":"3"}, [
            new Element("Numeric", {}, [
              new Text("3"),
              new Element("WhiteSpace", {}, [new Text(" ")]),
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
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"Test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("Test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("PragmaName", {"value":"auto_vacuum"}, [
      new Element("Identifier", {}, [new Text("auto_vacuum")]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"Test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("Test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("PragmaName", {"value":"auto_vacuum"}, [
      new Element("Identifier", {}, [
        new Text("auto_vacuum"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
    ]),
    new Element("Operator", {}, [new Text("=")]),
    new Element("PragmaValue", {}, [
      new Element("PragmaLiteral", {"value":"NONE"}, [
        new Element("Identifier", {"value":"NONE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("NONE"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("pragma")]),
    new Element("PragmaName", {"value":"automatic_index"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("automatic_index"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("pragma")]),
    new Element("PragmaName", {"value":"automatic_index"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("automatic_index"),
        new Element("WhiteSpace", {}, [new Text(" ")]),
      ]),
    ]),
    new Element("Operator", {}, [new Text("=")]),
    new Element("PragmaValue", {}, [
      new Element("PragmaLiteral", {"value":"true"}, [
        new Element("Identifier", {"value":"TRUE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("true"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("PragmaStatement", {}, [
    new Element("Identifier", {"value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("PragmaName", {"value":"index_info"}, [
      new Element("Identifier", {}, [new Text("index_info")]),
    ]),
    new Element("LeftParen", {}, [new Text("(")]),
    new Element("PragmaArgumentList", {}, [
      new Element("PragmaArgument", {}, [
        new Element("PragmaValue", {}, [
          new Element("StringLiteral", {"value":"test.pk_test"}, [
            new Element("String", {}, [new Text("'test.pk_test'")]),
          ]),
        ]),
      ]),
    ]),
    new Element("RightParen", {}, [new Text(")")]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
])
