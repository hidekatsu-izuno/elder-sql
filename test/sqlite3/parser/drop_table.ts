import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("DropTableStatement", {}, [
    new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"t_sample"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("t_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("DropTableStatement", {}, [
    new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"t_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("t_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("DropTableStatement", {}, [
    new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("IfExistsOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IF"}, [new Text("IF")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"t_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("t_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
])
