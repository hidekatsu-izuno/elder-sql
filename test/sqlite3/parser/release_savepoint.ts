import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("ReleaseSavepointStatement", {}, [
    new Element("Identifier", {"value":"RELEASE"}, [new Text("RELEASE")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("sect1")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("ReleaseSavepointStatement", {}, [
    new Element("Identifier", {"value":"RELEASE"}, [new Text("RELEASE")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("sect1")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
