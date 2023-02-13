import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("AnalyzeStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "analyze", { keyword: Keyword.ANALYZE, location: new SourceLocation(0, 1, 0)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(7, 1, 7)})], location: new SourceLocation(8, 1, 8)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(13, 1, 13)})], location: new SourceLocation(12, 1, 12)}))
  node.append(new Node("AnalyzeStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ANALYZE", { keyword: Keyword.ANALYZE, location: new SourceLocation(14, 2, 1)}))
    node.append(new Node("SchemaName").apply(node => {
      node.data = {"value":"main"}
      node.append(new Token(TokenType.Identifier, "main", { keyword: Keyword.MAIN, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(21, 2, 8)})], location: new SourceLocation(22, 2, 9)}))
    }))
    node.append(new Token(TokenType.Dot, ".", { location: new SourceLocation(26, 2, 13)}))
    node.append(new Node("ObjectName").apply(node => {
      node.data = {"value":"test"}
      node.append(new Token(TokenType.Identifier, "test", { keyword: Keyword.TEST, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(31, 2, 18)})], location: new SourceLocation(27, 2, 14)}))
    }))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(32, 3, 1)}))
})
