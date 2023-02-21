import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("ReindexStatement", {}, [
    new Element("token", {"type":"Identifier","value":"REINDEX"}, [new Text("REINDEX")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("ReindexStatement", {}, [
    new Element("token", {"type":"Identifier","value":"REINDEX"}, [new Text("REINDEX")]),
    new Element("ObjectName", {"value":"test_collation"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("test_collation")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("ReindexStatement", {}, [
    new Element("token", {"type":"Identifier","value":"REINDEX"}, [new Text("REINDEX")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
