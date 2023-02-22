import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CommitTransactionStatement", {}, [
    new Element("Reserved", {"value":"COMMIT"}, [new Text("COMMIT")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CommitTransactionStatement", {}, [
    new Element("Reserved", {"value":"COMMIT"}, [new Text("COMMIT")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CommitTransactionStatement", {}, [
    new Element("Identifier", {"value":"END"}, [new Text("END")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CommitTransactionStatement", {}, [
    new Element("Identifier", {"value":"END"}, [new Text("END")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  ]),
  new Element("SectionBreak", {}),
])
