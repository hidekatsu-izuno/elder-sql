import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CommandStatement", {}, [
    new Element("CommandName", {"value":".print"}, [
      new Element("BlockComment", {"skip":"true"}, [new Text("/*test\n.print test\n*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("Command", {}, [new Text(".print")]),
    ]),
    new Element("CommandArgumentList", {}, [
      new Element("CommandArgument", {"value":"test"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("test")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
      new Element("CommandArgument", {"value":"select"}, [
        new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      ]),
      new Element("CommandArgument", {"value":"1"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Numeric", {}, [new Text("1")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("2")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              ]),
              new Element("Operator", {}, [new Text("+")]),
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"x"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {}, [new Text("x")]),
                  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                ]),
                new Element("Dot", {}, [new Text(".")]),
                new Element("ColumnName", {"value":"print"}, [
                  new Element("Identifier", {"value":"PRINT"}, [new Text("print")]),
                ]),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"test"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
            new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"3"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Numeric", {}, [new Text("3")]),
              new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("Delimiter", {}, [new Text("/")]),
  new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"4"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Numeric", {}, [new Text("4")]),
              new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("Delimiter", {}, [new Text("GO")]),
])
