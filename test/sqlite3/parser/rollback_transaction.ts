import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TO"}, [new Text("TO")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("sect1")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TO"}, [new Text("TO")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"SAVEPOINT"}, [new Text("SAVEPOINT")]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("sect1")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
])
