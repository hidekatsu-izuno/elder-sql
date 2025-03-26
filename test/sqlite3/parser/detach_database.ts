import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"DetachDatabaseStatement"}, [
    new Element("token", {"value":"DETACH","type":"Identifier"}, [new Text("DETACH")]),
    new Element("token", {"value":"DATABASE","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("DATABASE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"mem_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("mem_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DetachDatabaseStatement"}, [
    new Element("token", {"value":"DETACH","type":"Identifier"}, [new Text("DETACH")]),
    new Element("node", {"type":"SchemaName","value":"new_db"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("new_db"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
