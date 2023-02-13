import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("DeleteStatement").apply(node => {
    node.append(new Node("DeleteClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "DELETE", { keyword: Keyword.DELETE, location: new SourceLocation(0, 1, 0)}))
      node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(7, 1, 7)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"sample"}
        node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(11, 1, 11)})], location: new SourceLocation(12, 1, 12)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(19, 1, 19)})], location: new SourceLocation(18, 1, 18)}))
  node.append(new Node("DeleteStatement").apply(node => {
    node.append(new Node("DeleteClause").apply(node => {
      node.append(new Token(TokenType.Reserved, "DELETE", { keyword: Keyword.DELETE, location: new SourceLocation(20, 2, 1)}))
      node.append(new Token(TokenType.Reserved, "FROM", { keyword: Keyword.FROM, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(26, 2, 7)})], location: new SourceLocation(27, 2, 8)}))
      node.append(new Node("SchemaName").apply(node => {
        node.data = {"value":"main"}
        node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(31, 2, 12)})], location: new SourceLocation(32, 2, 13)}))
      }))
      node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(36, 2, 17)}))
      node.append(new Node("ObjectName").apply(node => {
        node.data = {"value":"sample"}
        node.append(new Token(TokenType.Identifier, "sample", { keyword: Keyword.SAMPLE, location: new SourceLocation(37, 2, 18)}))
      }))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, location: new SourceLocation(43, 2, 24)}))
})
