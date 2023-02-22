import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("DeferredOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"DEFERRED"}, [new Text("DEFERRED")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ImmediateOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"IMMEDIATE"}, [new Text("IMMEDIATE")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ExclusiveOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"EXCLUSIVE"}, [new Text("EXCLUSIVE")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("DeferredOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"DEFERRED"}, [new Text("DEFERRED")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ImmediateOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"IMMEDIATE"}, [new Text("IMMEDIATE")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ExclusiveOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"EXCLUSIVE"}, [new Text("EXCLUSIVE")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  ]),
  new Element("SectionBreak", {}),
])
