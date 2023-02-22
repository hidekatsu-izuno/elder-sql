import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DropTriggerStatement", {}, [
    new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
    new Element("Identifier", {"value":"TRIGGER"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("ObjectName", {"value":"r_sample"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("r_sample"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DropTriggerStatement", {}, [
    new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
    new Element("Identifier", {"value":"TRIGGER"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("Identifier", {"value":"MAIN"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"r_sample"}, [
      new Element("Identifier", {}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DropTriggerStatement", {}, [
    new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
    new Element("Identifier", {"value":"TRIGGER"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("IfExistsOption", {}, [
      new Element("Identifier", {"value":"IF"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("IF"),
      ]),
      new Element("Reserved", {"value":"EXISTS"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("EXISTS"),
      ]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("Identifier", {"value":"MAIN"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"r_sample"}, [
      new Element("Identifier", {}, [new Text("r_sample")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
])
