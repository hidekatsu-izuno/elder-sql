import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AnalyzeStatement", {}, [
    new Element("Identifier", {"value":"ANALYZE"}, [new Text("analyze")]),
    new Element("ObjectName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AnalyzeStatement", {}, [
    new Element("Identifier", {"value":"ANALYZE"}, [new Text("ANALYZE")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
