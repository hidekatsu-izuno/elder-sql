import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"CommitTransactionStatement"}, [
    new Element("token", {"type":"Reserved","value":"COMMIT"}, [new Text("COMMIT")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CommitTransactionStatement"}, [
    new Element("token", {"type":"Reserved","value":"COMMIT"}, [new Text("COMMIT")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRANSACTION"),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CommitTransactionStatement"}, [
    new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CommitTransactionStatement"}, [
    new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
    new Element("token", {"type":"Reserved","value":"TRANSACTION"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRANSACTION"),
      new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
