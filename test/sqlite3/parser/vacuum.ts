import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("VacuumStatement", {}, [
    new Element("Identifier", {"value":"VACUUM"}, [new Text("VACUUM")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("VacuumStatement", {}, [
    new Element("Identifier", {"value":"VACUUM"}, [new Text("VACUUM")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("VacuumStatement", {}, [
    new Element("Identifier", {"value":"VACUUM"}, [new Text("VACUUM")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"INTO"}, [new Text("INTO")]),
    new Element("FileName", {}, [
      new Element("StringLiteral", {"value":"database.dat"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("String", {}, [new Text("'database.dat'")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("VacuumStatement", {}, [
    new Element("Identifier", {"value":"VACUUM"}, [new Text("VACUUM")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"INTO"}, [new Text("INTO")]),
    new Element("FileName", {}, [
      new Element("StringLiteral", {"value":"database.dat"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("\"database.dat\"")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
