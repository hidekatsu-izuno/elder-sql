import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("ReleaseSavepointStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "RELEASE", { keyword: Keyword.RELEASE, location: new SourceLocation(0, 1, 0)}))
    node.append(new Node("SavepointName").apply(node => {
      node.data = {"value":"sect1"}
      node.append(new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(14, 1, 14)})], location: new SourceLocation(13, 1, 13)}))
  node.append(new Node("ReleaseSavepointStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "RELEASE", { keyword: Keyword.RELEASE, location: new SourceLocation(15, 2, 1)}))
    node.append(new Token(TokenType.Identifier, "SAVEPOINT", { keyword: Keyword.SAVEPOINT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(22, 2, 8)})], location: new SourceLocation(23, 2, 9)}))
    node.append(new Node("SavepointName").apply(node => {
      node.data = {"value":"sect1"}
      node.append(new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(32, 2, 18)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(38, 2, 24)})], location: new SourceLocation(33, 2, 19)}))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(39, 3, 1)}))
})
