import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("SavepointStatement", {}, [
    new Element("Identifier", {"value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("sect1")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("SavepointStatement", {}, [
    new Element("Identifier", {"value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect2"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("sect2")]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
