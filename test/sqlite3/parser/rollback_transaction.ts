import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("RollbackTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [new Text("ROLLBACK")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TO"}, [new Text("TO")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("sect1")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TO"}, [new Text("TO")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("sect1")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
])
