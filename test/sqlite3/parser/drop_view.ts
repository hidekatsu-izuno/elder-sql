import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("DropViewStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, location: new SourceLocation(0, 1, 0)}))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(4, 1, 4)})], location: new SourceLocation(5, 1, 5)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(9, 1, 9)})], location: new SourceLocation(10, 1, 10)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(19, 1, 19)})], location: new SourceLocation(18, 1, 18)}))
  node.append(new Node("DropViewStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, location: new SourceLocation(20, 2, 1)}))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(24, 2, 5)})], location: new SourceLocation(25, 2, 6)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(29, 2, 10)})], location: new SourceLocation(30, 2, 11)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(34, 2, 15)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { location: new SourceLocation(35, 2, 16)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(44, 2, 25)})], location: new SourceLocation(43, 2, 24)}))
  node.append(new Node("DropViewStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "DROP", { keyword: Keyword.DROP, location: new SourceLocation(45, 3, 1)}))
    node.append(new Token(TokenType.Identifier, "VIEW", { keyword: Keyword.VIEW, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(49, 3, 5)})], location: new SourceLocation(50, 3, 6)}))
    node.append(new Node("IfExistsOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "IF", { keyword: Keyword.IF, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(54, 3, 10)})], location: new SourceLocation(55, 3, 11)}))
      node.append(new Token(TokenType.Reserved, "EXISTS", { keyword: Keyword.EXISTS, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(57, 3, 13)})], location: new SourceLocation(58, 3, 14)}))
    }))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(64, 3, 20)})], location: new SourceLocation(65, 3, 21)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(69, 3, 25)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"v_sample"}
      node.append(new Token(TokenType.Identifier, "v_sample", { location: new SourceLocation(70, 3, 26)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(78, 3, 34)}))
})
