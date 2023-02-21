import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AnalyzeStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ANALYZE"}, [new Text("analyze")]),
    new Element("ObjectName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AnalyzeStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ANALYZE"}, [new Text("ANALYZE")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
