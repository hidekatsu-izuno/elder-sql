import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("token", {"value":"TRANSACTION","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("node", {"type":"DeferredOption"}, [
      new Element("token", {"value":"DEFERRED","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("DEFERRED"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("node", {"type":"ImmediateOption"}, [
      new Element("token", {"value":"IMMEDIATE","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("IMMEDIATE"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("node", {"type":"ExclusiveOption"}, [
      new Element("token", {"value":"EXCLUSIVE","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EXCLUSIVE"),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("node", {"type":"DeferredOption"}, [
      new Element("token", {"value":"DEFERRED","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("DEFERRED"),
      ]),
    ]),
    new Element("token", {"value":"TRANSACTION","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("node", {"type":"ImmediateOption"}, [
      new Element("token", {"value":"IMMEDIATE","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("IMMEDIATE"),
      ]),
    ]),
    new Element("token", {"value":"TRANSACTION","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"BeginTransactionStatement"}, [
    new Element("token", {"value":"BEGIN","type":"Identifier"}, [new Text("BEGIN")]),
    new Element("node", {"type":"ExclusiveOption"}, [
      new Element("token", {"value":"EXCLUSIVE","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EXCLUSIVE"),
      ]),
    ]),
    new Element("token", {"value":"TRANSACTION","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRANSACTION"),
      new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
