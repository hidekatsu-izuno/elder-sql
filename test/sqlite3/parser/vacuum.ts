import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("VacuumStatement", {}, [
    new Element("token", {"type":"Identifier","value":"VACUUM"}, [new Text("VACUUM")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("VacuumStatement", {}, [
    new Element("token", {"type":"Identifier","value":"VACUUM"}, [new Text("VACUUM")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("VacuumStatement", {}, [
    new Element("token", {"type":"Identifier","value":"VACUUM"}, [new Text("VACUUM")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
    new Element("FileName", {}, [
      new Element("StringLiteral", {"value":"database.dat"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"String"}, [new Text("'database.dat'")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("VacuumStatement", {}, [
    new Element("token", {"type":"Identifier","value":"VACUUM"}, [new Text("VACUUM")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
    new Element("FileName", {}, [
      new Element("StringLiteral", {"value":"database.dat"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("\"database.dat\"")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
