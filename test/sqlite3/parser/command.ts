import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CommandStatement", {}, [
    new Element("CommandName", {"value":".print"}, [
      new Element("skip", {"type":"BlockComment"}, [new Text("/*test\n.print test\n*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("token", {"type":"Command"}, [new Text(".print")]),
    ]),
    new Element("CommandArgumentList", {}, [
      new Element("CommandArgument", {"value":"test"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("test")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("CommandArgument", {"value":"select"}, [
        new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("select")]),
      ]),
      new Element("CommandArgument", {"value":"1"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Numeric"}, [new Text("1")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("NumericLiteral", {"value":"2"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("2")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("ColumnReference", {}, [
                new Element("ObjectName", {"value":"x"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("x")]),
                  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                ]),
                new Element("token", {"type":"Dot"}, [new Text(".")]),
                new Element("ColumnName", {"value":"print"}, [
                  new Element("token", {"type":"Identifier","value":"PRINT"}, [new Text("print")]),
                ]),
              ]),
            ]),
          ]),
          new Element("ColumnAlias", {"value":"test"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
            new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"3"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Numeric"}, [new Text("3")]),
              new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"Delimiter"}, [new Text("/")]),
  new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SelectStatement", {}, [
    new Element("SelectClause", {}, [
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("select")]),
      new Element("SelectColumnList", {}, [
        new Element("SelectColumn", {}, [
          new Element("Expression", {}, [
            new Element("NumericLiteral", {"value":"4"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Numeric"}, [new Text("4")]),
              new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"Delimiter"}, [new Text("GO")]),
])
