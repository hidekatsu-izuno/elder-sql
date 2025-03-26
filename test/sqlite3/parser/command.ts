import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"CommandStatement"}, [
    new Element("node", {"type":"CommandName","value":".print"}, [
      new Element("token", {"type":"Command"}, [
        new Element("trivia", {"type":"BlockComment"}, [new Text("/*test\n.print test\n*/")]),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        new Text(".print"),
      ]),
    ]),
    new Element("node", {"type":"CommandArgumentList"}, [
      new Element("node", {"type":"CommandArgument","value":"test"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("test"),
          new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
    ]),
  ]),
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"value":"SELECT","type":"Reserved"}, [new Text("select")]),
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
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"value":"SELECT","type":"Reserved"}, [new Text("select")]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"AddOperation"}, [
              new Element("node", {"type":"NumericLiteral","value":"2"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("2"),
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("node", {"type":"ColumnReference"}, [
                new Element("node", {"type":"ObjectName","value":"x"}, [
                  new Element("token", {"type":"Identifier"}, [
                    new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Text("x"),
                    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                  ]),
                ]),
                new Element("token", {"type":"Dot"}, [new Text(".")]),
                new Element("node", {"type":"ColumnName","value":"print"}, [
                  new Element("token", {"value":"PRINT","type":"Identifier"}, [new Text("print")]),
                ]),
              ]),
            ]),
          ]),
          new Element("node", {"type":"ColumnAlias","value":"test"}, [
            new Element("token", {"value":"TEST","type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("test"),
              new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
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
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"value":"SELECT","type":"Reserved"}, [
        new Element("trivia", {"type":"BlockComment"}, [new Text("/*.print*/")]),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text("   ")]),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        new Text("select"),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"NumericLiteral","value":"3"}, [
              new Element("token", {"type":"Numeric"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("3"),
                new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"Delimiter"}, [
    new Text("/"),
    new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"value":"SELECT","type":"Reserved"}, [
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        new Text("select"),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}, [
            new Element("node", {"type":"NumericLiteral","value":"4"}, [
              new Element("token", {"type":"Numeric"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("4"),
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("trivia", {"type":"BlockComment"}, [new Text("/*.print*/")]),
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"Delimiter"}, [
    new Element("trivia", {"type":"LineComment"}, [new Text("-- aaa")]),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("trivia", {"type":"LineComment"}, [new Text("-- bbb")]),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
    new Text("GO"),
  ]),
  new Element("token", {"type":"EoF"}),
])
