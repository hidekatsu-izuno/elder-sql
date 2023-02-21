import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("SavepointStatement", {}, [
    new Element("token", {"type":"Identifier","value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("sect1")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("SavepointStatement", {}, [
    new Element("token", {"type":"Identifier","value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect2"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("sect2")]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
