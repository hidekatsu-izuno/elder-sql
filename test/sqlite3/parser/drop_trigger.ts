import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DropTriggerStatement", {}, [
    new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"r_sample"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("DropTriggerStatement", {}, [
    new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"r_sample"}, [
      new Element("Identifier", {}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("DropTriggerStatement", {}, [
    new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("IfExistsOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"IF"}, [new Text("IF")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"r_sample"}, [
      new Element("Identifier", {}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
])
