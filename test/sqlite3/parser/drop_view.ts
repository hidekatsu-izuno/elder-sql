import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"DropViewStatement"}, [
    new Element("token", {"value":"DROP","type":"Identifier"}, [new Text("DROP")]),
    new Element("token", {"value":"VIEW","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("v_sample"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DropViewStatement"}, [
    new Element("token", {"value":"DROP","type":"Identifier"}, [new Text("DROP")]),
    new Element("token", {"value":"VIEW","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"main"}, [
      new Element("token", {"value":"MAIN","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"DropViewStatement"}, [
    new Element("token", {"value":"DROP","type":"Identifier"}, [new Text("DROP")]),
    new Element("token", {"value":"VIEW","type":"Identifier"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("VIEW"),
    ]),
    new Element("node", {"type":"IfExistsOption"}, [
      new Element("token", {"value":"IF","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("IF"),
      ]),
      new Element("token", {"value":"EXISTS","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EXISTS"),
      ]),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"main"}, [
      new Element("token", {"value":"MAIN","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("main"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"v_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("v_sample")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("token", {"type":"EoF"}),
])
