import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CommandStatement", {}, [
    new Element("CommandName", {"value":".print"}, [
      new Element("Command", {}, [
        new Element("BlockComment", {}, [new Text("/*test\n.print test\n*/")]),
        new Element("LineBreak", {}, [new Text("\n")]),
        new Text(".print"),
      ]),
    ]),
    new Element("CommandArgumentList", {}, [
      new Element("CommandArgument", {"value":"test"}, [
        new Element("Identifier", {}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("test"),
          new Element("LineBreak", {}, [new Text("\n")]),
        ]),
      ]),
      new Element("CommandArgument", {"value":"select"}, [
        new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      ]),
      new Element("CommandArgument", {"value":"1"}, [
        new Element("Numeric", {}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("1"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("Numeric", {}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("2"),
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                ]),
              ]),
              new Element("Operator", {}, [new Text("+")]),
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"x"}, [
                  new Element("Identifier", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("x"),
                    new Element("LineBreak", {}, [new Text("\n")]),
                  ]),
                ]),
                new Element("Dot", {}, [new Text(".")]),
                new Element("ColumnName", {"value":"print"}, [
                  new Element("Identifier", {"value":"PRINT"}, [new Text("print")]),
                ]),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"test"}, [
            new Element("Identifier", {"value":"TEST"}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("test"),
              new Element("LineBreak", {}, [new Text("\n")]),
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
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"3"}, [
              new Element("Numeric", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("3"),
                new Element("LineBreak", {}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("Delimiter", {}, [
    new Text("/"),
    new Element("WhiteSpace", {}, [new Text("  ")]),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("Reserved", {"value":"SELECT"}, [
        new Element("LineBreak", {}, [new Text("\n")]),
        new Text("select"),
      ]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"4"}, [
              new Element("Numeric", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("4"),
                new Element("LineBreak", {}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("Delimiter", {}, [new Text("GO")]),
])
