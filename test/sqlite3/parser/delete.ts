import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
])
