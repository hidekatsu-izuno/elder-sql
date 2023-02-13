import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(0, 1, 0)}))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(6, 1, 6)})], location: new SourceLocation(5, 1, 5)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(7, 2, 1)}))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(12, 2, 6)})], location: new SourceLocation(13, 2, 7)}))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(25, 2, 19)})], location: new SourceLocation(24, 2, 18)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(26, 3, 1)}))
    node.append(new Node("DeferredOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "DEFERRED", { keyword: Keyword.DEFERRED, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(31, 3, 6)})], location: new SourceLocation(32, 3, 7)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(41, 3, 16)})], location: new SourceLocation(40, 3, 15)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(42, 4, 1)}))
    node.append(new Node("ImmediateOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "IMMEDIATE", { keyword: Keyword.IMMEDIATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(47, 4, 6)})], location: new SourceLocation(48, 4, 7)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(58, 4, 17)})], location: new SourceLocation(57, 4, 16)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(59, 5, 1)}))
    node.append(new Node("ExclusiveOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "EXCLUSIVE", { keyword: Keyword.EXCLUSIVE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(64, 5, 6)})], location: new SourceLocation(65, 5, 7)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(75, 5, 17)})], location: new SourceLocation(74, 5, 16)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(76, 6, 1)}))
    node.append(new Node("DeferredOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "DEFERRED", { keyword: Keyword.DEFERRED, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(81, 6, 6)})], location: new SourceLocation(82, 6, 7)}))
    }))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(90, 6, 15)})], location: new SourceLocation(91, 6, 16)}))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(103, 6, 28)})], location: new SourceLocation(102, 6, 27)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(104, 7, 1)}))
    node.append(new Node("ImmediateOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "IMMEDIATE", { keyword: Keyword.IMMEDIATE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(109, 7, 6)})], location: new SourceLocation(110, 7, 7)}))
    }))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(119, 7, 16)})], location: new SourceLocation(120, 7, 17)}))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(132, 7, 29)})], location: new SourceLocation(131, 7, 28)}))
  node.append(new Node("BeginTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "BEGIN", { keyword: Keyword.BEGIN, location: new SourceLocation(133, 8, 1)}))
    node.append(new Node("ExclusiveOption").apply(node => {
      node.append(new Token(TokenType.Identifier, "EXCLUSIVE", { keyword: Keyword.EXCLUSIVE, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(138, 8, 6)})], location: new SourceLocation(139, 8, 7)}))
    }))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(148, 8, 16)})], postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(160, 8, 28)})], location: new SourceLocation(149, 8, 17)}))
  }))
  node.append(new Token(TokenType.SectionBreak, "", { eos: true, location: new SourceLocation(161, 9, 1)}))
})
