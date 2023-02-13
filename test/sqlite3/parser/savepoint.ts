import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("SavepointStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "SAVEPOINT", { keyword: Keyword.SAVEPOINT, location: new SourceLocation(0, 1, 0)}))
    node.append(new Node("SavepointName").apply(node => {
      node.data = {"value":"sect1"}
      node.append(new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(9, 1, 9)})], location: new SourceLocation(10, 1, 10)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(16, 1, 16)})], location: new SourceLocation(15, 1, 15)}))
  node.append(new Node("SavepointStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "SAVEPOINT", { keyword: Keyword.SAVEPOINT, location: new SourceLocation(17, 2, 1)}))
    node.append(new Node("SavepointName").apply(node => {
      node.data = {"value":"sect2"}
      node.append(new Token(TokenType.Identifier, "sect2", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(26, 2, 10)})], location: new SourceLocation(27, 2, 11)}))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(32, 2, 16)}))
})
