import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("DropTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, location: new SourceLocation(0, 1, 0)}))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(4, 1, 4)})], location: new SourceLocation(5, 1, 5)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"r_sample"}
      node.append(new Token(TokenType.Identifier, "r_sample", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(12, 1, 12)})], location: new SourceLocation(13, 1, 13)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(22, 1, 22)})], location: new SourceLocation(21, 1, 21)}))
  node.append(new Node("DropTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, location: new SourceLocation(23, 2, 1)}))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(27, 2, 5)})], location: new SourceLocation(28, 2, 6)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(35, 2, 13)})], location: new SourceLocation(36, 2, 14)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(40, 2, 18)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"r_sample"}
      node.append(new Token(TokenType.Identifier, "r_sample", { location: new SourceLocation(41, 2, 19)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(50, 2, 28)})], location: new SourceLocation(49, 2, 27)}))
  node.append(new Node("DropTriggerStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, location: new SourceLocation(51, 3, 1)}))
    node.append(new Token(TokenType.Identifier, "TRIGGER", { keyword: Keyword.TRIGGER, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(55, 3, 5)})], location: new SourceLocation(56, 3, 6)}))
    node.append(new Node("IfExistsOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "IF", { keyword: Keyword.IF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(63, 3, 13)})], location: new SourceLocation(64, 3, 14)}))
      node.append(new Token(TokenType.Reserved, "EXISTS", { keyword: Keyword.EXISTS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(66, 3, 16)})], location: new SourceLocation(67, 3, 17)}))
    }))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(73, 3, 23)})], location: new SourceLocation(74, 3, 24)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(78, 3, 28)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"r_sample"}
      node.append(new Token(TokenType.Identifier, "r_sample", { location: new SourceLocation(79, 3, 29)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(87, 3, 37)}))
})
