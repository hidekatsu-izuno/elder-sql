import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"SelectStatement"}, [
    new Element("node", {"type":"SelectClause"}, [
      new Element("token", {"type":"Reserved","value":"SELECT"}, [
        new Text("SELECT"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"SelectColumnList"}, [
        new Element("node", {"type":"SelectColumn"}, [
          new Element("node", {"type":"Expression"}),
        ]),
      ]),
    ]),
    new Element("node", {"type":"Unknown"}, [
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [
        new Text("UPDATE"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("token", {"type":"Reserved","value":"SELECT"}, [new Text("select")]),
      new Element("token", {"type":"Numeric"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("1"),
      ]),
      new Element("token", {"type":"Numeric"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("2"),
      ]),
      new Element("token", {"type":"Numeric"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("3"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
      new Element("token", {"type":"Reserved","value":"TABLE"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TABLE"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"Unknown"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [
      new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      new Text("CREATE"),
    ]),
    new Element("token", {"type":"BindVariable"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("@aaa"),
    ]),
    new Element("token", {"type":"Error"}, [new Text("@")]),
    new Element("token", {"type":"Reserved","value":"FROM"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("FROM"),
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"Error"}, [new Text("#")]),
    new Element("token", {"type":"Error"}, [new Text("#")]),
    new Element("token", {"type":"Error"}, [new Text("#")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("token", {"type":"EoF"}),
])
