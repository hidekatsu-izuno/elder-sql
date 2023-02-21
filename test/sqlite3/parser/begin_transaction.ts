import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("DeferredOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"DEFERRED"}, [new Text("DEFERRED")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ImmediateOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IMMEDIATE"}, [new Text("IMMEDIATE")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ExclusiveOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"EXCLUSIVE"}, [new Text("EXCLUSIVE")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("DeferredOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"DEFERRED"}, [new Text("DEFERRED")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ImmediateOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IMMEDIATE"}, [new Text("IMMEDIATE")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("BeginTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
    new Element("ExclusiveOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"EXCLUSIVE"}, [new Text("EXCLUSIVE")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
