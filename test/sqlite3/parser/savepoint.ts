import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("SavepointStatement", {}, [
    new Element("Identifier", {"value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("sect1"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("SavepointStatement", {}, [
    new Element("Identifier", {"value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect2"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("sect2"),
      ]),
    ]),
  ]),
  new Element("EoF", {}),
])
