import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("token", {"type":"Reserved","value":"DELETE"}, [new Text("DELETE")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("DeleteStatement", {}, [
    new Element("DeleteClause", {}, [
      new Element("token", {"type":"Reserved","value":"DELETE"}, [new Text("DELETE")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
])
