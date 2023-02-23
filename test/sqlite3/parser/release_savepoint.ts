import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("ReleaseSavepointStatement", {}, [
    new Element("Identifier", {"value":"RELEASE"}, [new Text("RELEASE")]),
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
  new Element("ReleaseSavepointStatement", {}, [
    new Element("Identifier", {"value":"RELEASE"}, [new Text("RELEASE")]),
    new Element("Identifier", {"value":"SAVEPOINT"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("SAVEPOINT"),
    ]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("sect1"),
        new Element("LineBreak", {}, [new Text("\n")]),
      ]),
    ]),
  ]),
  new Element("EoF", {}),
])
