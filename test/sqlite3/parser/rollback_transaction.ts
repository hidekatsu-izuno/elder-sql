import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
    new Element("Reserved", {"value":"TO"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TO"),
    ]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("sect1"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("RollbackTransactionStatement", {}, [
    new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
    new Element("Reserved", {"value":"TO"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TO"),
    ]),
    new Element("Identifier", {"value":"SAVEPOINT"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("SAVEPOINT"),
    ]),
    new Element("SavepointName", {"value":"sect1"}, [
      new Element("Identifier", {}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("sect1"),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("EoF", {}),
])
