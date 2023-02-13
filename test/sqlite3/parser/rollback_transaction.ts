import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"
import { Node } from "../../../src/parser"

export default new Node("Script").apply(node => {
  node.append(new Node("RollbackTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ROLLBACK", { keyword: Keyword.ROLLBACK, location: new SourceLocation(0, 1, 0)}))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(9, 1, 9)})], location: new SourceLocation(8, 1, 8)}))
  node.append(new Node("RollbackTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ROLLBACK", { keyword: Keyword.ROLLBACK, location: new SourceLocation(10, 2, 1)}))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(18, 2, 9)})], location: new SourceLocation(19, 2, 10)}))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(31, 2, 22)})], location: new SourceLocation(30, 2, 21)}))
  node.append(new Node("RollbackTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ROLLBACK", { keyword: Keyword.ROLLBACK, location: new SourceLocation(32, 3, 1)}))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(40, 3, 9)})], location: new SourceLocation(41, 3, 10)}))
    node.append(new Token(TokenType.Reserved, "TO", { keyword: Keyword.TO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(52, 3, 21)})], location: new SourceLocation(53, 3, 22)}))
    node.append(new Node("SavepointName").apply(node => {
      node.data = {"value":"sect1"}
      node.append(new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(55, 3, 24)})], location: new SourceLocation(56, 3, 25)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(62, 3, 31)})], location: new SourceLocation(61, 3, 30)}))
  node.append(new Node("RollbackTransactionStatement").apply(node => {
    node.append(new Token(TokenType.Identifier, "ROLLBACK", { keyword: Keyword.ROLLBACK, location: new SourceLocation(63, 4, 1)}))
    node.append(new Token(TokenType.Reserved, "TRANSACTION", { keyword: Keyword.TRANSACTION, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(71, 4, 9)})], location: new SourceLocation(72, 4, 10)}))
    node.append(new Token(TokenType.Reserved, "TO", { keyword: Keyword.TO, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(83, 4, 21)})], location: new SourceLocation(84, 4, 22)}))
    node.append(new Token(TokenType.Identifier, "SAVEPOINT", { keyword: Keyword.SAVEPOINT, preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(86, 4, 24)})], location: new SourceLocation(87, 4, 25)}))
    node.append(new Node("SavepointName").apply(node => {
      node.data = {"value":"sect1"}
      node.append(new Token(TokenType.Identifier, "sect1", { preskips: [new Token(TokenType.WhiteSpace, " ", { location: new SourceLocation(96, 4, 34)})], location: new SourceLocation(97, 4, 35)}))
    }))
  }))
  node.append(new Token(TokenType.SemiColon, ";", { eos: true, postskips: [new Token(TokenType.LineBreak, "\n", { location: new SourceLocation(103, 4, 41)})], location: new SourceLocation(102, 4, 40)}))
})
