import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("PragmaName", {"value":"analysis_limit"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("analysis_limit")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("PragmaName", {"value":"analysis_limit"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("analysis_limit")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"Operator"}, [new Text("=")]),
    new Element("PragmaValue", {}, [
      new Element("NumericLiteral", {"value":"3"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Numeric"}, [new Text("3")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("PragmaName", {"value":"application_id"}, [
      new Element("token", {"type":"Identifier"}, [new Text("application_id")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("PragmaName", {"value":"application_id"}, [
      new Element("token", {"type":"Identifier"}, [new Text("application_id")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"Operator"}, [new Text("=")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("PragmaValue", {}, [
      new Element("NumericLiteral", {"value":"-3"}, [
        new Element("token", {"type":"Operator"}, [new Text("-")]),
        new Element("token", {"type":"Numeric"}, [new Text("3")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"Test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("Test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("PragmaName", {"value":"auto_vacuum"}, [
      new Element("token", {"type":"Identifier"}, [new Text("auto_vacuum")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"Test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("Test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("PragmaName", {"value":"auto_vacuum"}, [
      new Element("token", {"type":"Identifier"}, [new Text("auto_vacuum")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"Operator"}, [new Text("=")]),
    new Element("PragmaValue", {}, [
      new Element("PragmaLiteral", {"value":"NONE"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"NONE"}, [new Text("NONE")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("pragma")]),
    new Element("PragmaName", {"value":"automatic_index"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("automatic_index")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("pragma")]),
    new Element("PragmaName", {"value":"automatic_index"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("automatic_index")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"Operator"}, [new Text("=")]),
    new Element("PragmaValue", {}, [
      new Element("PragmaLiteral", {"value":"true"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"TRUE"}, [new Text("true")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("PragmaStatement", {}, [
    new Element("token", {"type":"Identifier","value":"PRAGMA"}, [new Text("PRAGMA")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("PragmaName", {"value":"index_info"}, [
      new Element("token", {"type":"Identifier"}, [new Text("index_info")]),
    ]),
    new Element("token", {"type":"LeftParen"}, [new Text("(")]),
    new Element("PragmaValue", {}, [
      new Element("StringLiteral", {"value":"test.pk_test"}, [
        new Element("token", {"type":"String"}, [new Text("'test.pk_test'")]),
      ]),
    ]),
    new Element("token", {"type":"RightParen"}, [new Text(")")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
])
