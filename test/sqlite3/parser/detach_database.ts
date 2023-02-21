import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DetachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"DETACH"}, [new Text("DETACH")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"DATABASE"}, [new Text("DATABASE")]),
    new Element("SchemaName", {"value":"mem_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("mem_db")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("DetachDatabaseStatement", {}, [
    new Element("token", {"type":"Identifier","value":"DETACH"}, [new Text("DETACH")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("new_db")]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
