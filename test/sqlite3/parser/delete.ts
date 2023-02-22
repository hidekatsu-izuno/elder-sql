import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("Reserved", {"value":"FROM"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("sample"),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("Reserved", {"value":"FROM"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("FROM"),
      ]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("Identifier", {"value":"MAIN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
])
