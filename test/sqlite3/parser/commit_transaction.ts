import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CommitTransactionStatement", {}, [
    new Element("token", {"type":"Reserved","value":"COMMIT"}, [new Text("COMMIT")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CommitTransactionStatement", {}, [
    new Element("token", {"type":"Reserved","value":"COMMIT"}, [new Text("COMMIT")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CommitTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CommitTransactionStatement", {}, [
    new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [new Text("TRANSACTION")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
