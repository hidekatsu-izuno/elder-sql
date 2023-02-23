import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DetachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"DETACH"}, [new Text("DETACH")]),
    new Element("Identifier", {"value":"DATABASE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("SchemaName", {"value":"mem_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("mem_db"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("DetachDatabaseStatement", {}, [
    new Element("Identifier", {"value":"DETACH"}, [new Text("DETACH")]),
    new Element("SchemaName", {"value":"new_db"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("EoF", {}),
])
