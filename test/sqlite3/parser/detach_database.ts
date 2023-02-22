import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DetachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"DETACH"}, [new Text("DETACH")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"DATABASE"}, [new Text("DATABASE")]),
    new Element("SchemaName", {"value":"mem_db"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("mem_db")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("DetachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"DETACH"}, [new Text("DETACH")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("new_db")]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
