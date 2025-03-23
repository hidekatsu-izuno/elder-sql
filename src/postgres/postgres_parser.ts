import { appendChild, replaceElement } from "domutils";
import {
	Keyword,
	ParseError,
	Token,
	TokenReader,
	TokenType,
} from "../lexer.js";
import { SyntaxNode, TokenNode, Text, AggregateParseError, Parser } from "../parser.js";
import { apply, dequote } from "../utils.js";
import { PostgresLexer } from "./postgres_lexer.js";

export class PostgresParser extends Parser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new PostgresLexer(options), options);
	}

	parseTokens(tokens: Token[]) {
		const r = new TokenReader(tokens);

		const root = new SyntaxNode("Script", {});
		const errors = [];

		while (r.peek()) {
			try {
				if (
					r.peekIf({
						type: [TokenType.SemiColon, TokenType.Delimiter, TokenType.EoF],
					})
				) {
					this.append(root, r.consume());
				} else if (r.peekIf(TokenType.Command)) {
					this.command(root, r);
				} else if (r.peekIf(Keyword.EXPLAIN)) {
					this.explainStatement(root, r);
				} else {
					this.statement(root, r);
				}
			} catch (err) {
				if (err instanceof ParseError) {
					this.unknown(root, r);
					errors.push(err);
				} else {
					throw err;
				}
			}
		}

		if (errors.length) {
			throw new AggregateParseError(
				root,
				errors,
				`${errors.length} error found\n${errors.map((e) => e.message).join("\n")}`,
			);
		}

		return root;
	}

	private explainStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("ExplainStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.EXPLAIN));
				if (r.peekIf(TokenType.LeftParen)) {
					apply(
						this.append(node, new SyntaxNode("ExplainOptionList", {})),
						(node) => {
							this.append(node, r.consume());
							do {
								if (r.peekIf(Keyword.ANALYZE)) {
									apply(
										this.append(node, new SyntaxNode("AnalyzeOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.VERBOSE)) {
									apply(
										this.append(node, new SyntaxNode("VerboseOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.COSTS)) {
									apply(
										this.append(node, new SyntaxNode("CostsOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.SETTINGS)) {
									apply(
										this.append(node, new SyntaxNode("SettingsOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.BUFFERS)) {
									apply(
										this.append(node, new SyntaxNode("BuffersOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.WAL)) {
									apply(
										this.append(node, new SyntaxNode("WalOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.TIMING)) {
									apply(
										this.append(node, new SyntaxNode("TimingOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.SUMMARY)) {
									apply(
										this.append(node, new SyntaxNode("SummaryOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(Keyword.FORMAT)) {
									apply(
										this.append(node, new SyntaxNode("FormatOption", {})),
										(node) => {
											this.append(node, r.consume());
											if (
												r.peekIf({
													type: [
														Keyword.TEXT,
														Keyword.XML,
														Keyword.JSON,
														Keyword.YAML,
													],
												})
											) {
												this.identifier(node, r, "FormatType");
											} else {
												throw r.createParseError();
											}
										},
									);
								} else {
									throw r.createParseError();
								}
								if (r.peekIf(TokenType.RightParen)) {
									break;
								}
							} while (!r.peek().eos);
							this.append(node, r.consume(TokenType.RightParen));
						},
					);
				} else {
					if (r.peekIf(Keyword.ANALYZE)) {
						apply(
							this.append(node, new SyntaxNode("AnalyzeOption", {})),
							(node) => {
								this.append(node, r.consume());
							},
						);
					}
					if (r.peekIf(Keyword.VERBOSE)) {
						apply(
							this.append(node, new SyntaxNode("VerboseOption", {})),
							(node) => {
								this.append(node, r.consume());
							},
						);
					}
				}
				this.statement(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private statement(parent: SyntaxNode, r: TokenReader) {
		let stmt: unknown;
		if (r.peekIf(Keyword.CREATE)) {
			const mark = r.pos;
			r.consume();
			while (!r.peek().eos && !PostgresLexer.isObjectStart(r.peek().keyword)) {
				r.consume();
			}
		} else if (r.peekIf(Keyword.ALTER)) {
			const mark = r.pos;
			r.consume();
		} else if (r.peekIf(Keyword.DROP)) {
			const mark = r.pos;
			r.consume();
		} else {
		}

		if (!stmt) {
			throw r.createParseError();
		}
		return stmt;
	}

	private unknown(parent: SyntaxNode, r: TokenReader) {
		if (!r.peek().eos) {
			return apply(this.append(parent, new SyntaxNode("Unknown", {})), (node) => {
				while (!r.peek().eos) {
					this.append(node, r.consume());
				}
			});
		}
	}

	private command(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("CommandStatement", {}));
		try {
			return apply(current, (node) => {
				apply(this.append(node, new SyntaxNode("CommandName", {})), (node) => {
					const token = r.consume(TokenType.Command);
					this.append(node, token);
					node.attribs.value = token.text;
				});
				if (!r.peek(-1).eos) {
					apply(
						this.append(node, new SyntaxNode("CommandArgumentList", {})),
						(node) => {
							do {
								apply(
									this.append(node, new SyntaxNode("CommandArgument", {})),
									(node) => {
										const token = r.consume();
										this.append(node, token);
										node.attribs.value = dequote(token.text);
									},
								);
							} while (!r.peek(-1).eos);
						},
					);
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private identifier(parent: SyntaxNode, r: TokenReader, name: string) {
		return apply(this.append(parent, new SyntaxNode(name, {})), (node) => {
			if (r.peekIf(TokenType.Identifier)) {
				const token = r.consume();
				this.append(node, token);
				node.attribs.value = dequote(token.text);
			} else {
				throw r.createParseError();
			}
		});
	}

	private booleanLiteral(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("BooleanLiteral", {})),
			(node) => {
				if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
					const token = r.consume();
					this.append(node, token);
					node.attribs.value = token.text.toUpperCase();
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private wrap(elem: SyntaxNode, wrapper: SyntaxNode) {
		replaceElement(elem, wrapper);
		appendChild(wrapper, elem);
		return wrapper;
	}

	private append(parent: SyntaxNode, child: SyntaxNode | Token) {
		if (child instanceof Token) {
			const token = new TokenNode(child.type.name, {
				...(child.keyword && { value: child.keyword.name }),
			});
			appendChild(parent, token);

			for (const skip of child.preskips) {
				const skipToken = new TokenNode(skip.type.name, {
					...(skip.keyword && { value: skip.keyword.name }),
				});
				appendChild(token, skipToken);
				if (skip.text) {
					appendChild(skipToken, new Text(skip.text));
				}
			}
			if (child.text) {
				appendChild(token, new Text(child.text));
			}
			for (const skip of child.postskips) {
				const skipToken = new TokenNode(skip.type.name, {
					...(skip.keyword && { value: skip.keyword.name }),
				});
				appendChild(token, skipToken);
				if (skip.text) {
					appendChild(skipToken, new Text(skip.text));
				}
			}
			return token;
		} else {
			appendChild(parent, child);
			return child;
		}
	}
}
