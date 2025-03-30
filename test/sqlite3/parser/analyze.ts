import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"AnalyzeStatement"}, [
    new Element("token", {"type":"Identifier","value":"ANALYZE"}, [new Text("analyze")]),
    new Element("node", {"type":"ObjectName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AnalyzeStatement"}, [
    new Element("token", {"type":"Identifier","value":"ANALYZE"}, [new Text("ANALYZE")]),
    new Element("node", {"type":"SchemaName","value":"main"}, [
      new Element("token", {"type":"Identifier","value":"MAIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Text("test"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
