import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"DropTriggerStatement"}, [
    new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"ObjectName","value":"r_sample"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("r_sample"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DropTriggerStatement"}, [
    new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"SchemaName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"r_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DropTriggerStatement"}, [
    new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"IfExistsOption"}, [
      new Element("token", {"type":"Identifier","value":"IF"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("IF"),
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
    new Element("node", {"type":"ObjectName","value":"r_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("token", {"type":"EoF"}),
])
