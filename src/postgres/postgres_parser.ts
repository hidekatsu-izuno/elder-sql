import { SqlTokenType, SqlKeyword } from "../sql.js"
import {
	ParseError,
	type Token,
	TokenReader,
} from "../lexer.js";
import {
	AggregateParseError,
	Parser,
	SyntaxNode,
	SyntaxToken,
	SyntaxTrivia,
} from "../parser.js";
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
						type: [SqlTokenType.SemiColon, SqlTokenType.Delimiter, SqlTokenType.EoF],
					})
				) {
					this.appendToken(root, r.consume());
				} else if (r.peekIf(SqlTokenType.Command)) {
					this.command(root, r);
				} else if (r.peekIf(SqlKeyword.EXPLAIN)) {
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
				this.appendToken(node, r.consume(SqlKeyword.EXPLAIN));
				if (r.peekIf(SqlTokenType.LeftParen)) {
					apply(
						this.append(node, new SyntaxNode("ExplainOptionList", {})),
						(node) => {
							this.appendToken(node, r.consume());
							do {
								if (r.peekIf(SqlKeyword.ANALYZE)) {
									apply(
										this.append(node, new SyntaxNode("AnalyzeOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.VERBOSE)) {
									apply(
										this.append(node, new SyntaxNode("VerboseOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.COSTS)) {
									apply(
										this.append(node, new SyntaxNode("CostsOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.SETTINGS)) {
									apply(
										this.append(node, new SyntaxNode("SettingsOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.BUFFERS)) {
									apply(
										this.append(node, new SyntaxNode("BuffersOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.WAL)) {
									apply(
										this.append(node, new SyntaxNode("WalOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.TIMING)) {
									apply(
										this.append(node, new SyntaxNode("TimingOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.SUMMARY)) {
									apply(
										this.append(node, new SyntaxNode("SummaryOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
												this.booleanLiteral(node, r);
											}
										},
									);
								} else if (r.peekIf(SqlKeyword.FORMAT)) {
									apply(
										this.append(node, new SyntaxNode("FormatOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											if (
												r.peekIf({
													type: [
														SqlKeyword.TEXT,
														SqlKeyword.XML,
														SqlKeyword.JSON,
														SqlKeyword.YAML,
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
								if (r.peekIf(SqlTokenType.RightParen)) {
									break;
								}
							} while (!r.peek().eos);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						},
					);
				} else {
					if (r.peekIf(SqlKeyword.ANALYZE)) {
						apply(
							this.append(node, new SyntaxNode("AnalyzeOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
							},
						);
					}
					if (r.peekIf(SqlKeyword.VERBOSE)) {
						apply(
							this.append(node, new SyntaxNode("VerboseOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
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
		if (r.peekIf(SqlKeyword.CREATE)) {
			const mark = r.pos;
			r.consume();
			while (!r.peek().eos && !PostgresLexer.isObjectStart(r.peek().keyword)) {
				r.consume();
			}
		} else if (r.peekIf(SqlKeyword.ALTER)) {
			const mark = r.pos;
			r.consume();
		} else if (r.peekIf(SqlKeyword.DROP)) {
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
			return apply(
				this.append(parent, new SyntaxNode("Unknown", {})),
				(node) => {
					while (!r.peek().eos) {
						this.appendToken(node, r.consume());
					}
				},
			);
		}
	}

	private command(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("CommandStatement", {}));
		try {
			return apply(current, (node) => {
				apply(this.append(node, new SyntaxNode("CommandName", {})), (node) => {
					const token = r.consume(SqlTokenType.Command);
					this.appendToken(node, token);
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
										this.appendToken(node, token);
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
			if (r.peekIf(SqlTokenType.Identifier)) {
				const token = r.consume();
				this.appendToken(node, token);
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
				if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
					const token = r.consume();
					this.appendToken(node, token);
					node.attribs.value = token.text.toUpperCase();
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private wrap(elem: SyntaxNode, wrapper: SyntaxNode) {
		elem.replaceWith(wrapper);
		wrapper.append(elem);
		return wrapper;
	}

	private append(parent: SyntaxNode, child: SyntaxNode) {
		parent.append(child);
		return child;
	}

	private appendToken(parent: SyntaxNode, child: Token) {
		const token = new SyntaxToken(child.type.name, {
			...(child.keyword && { value: child.keyword.name }),
		});
		for (const skip of child.preskips) {
			const skipToken = new SyntaxTrivia(skip.type.name, {
				...(skip.keyword && { value: skip.keyword.name }),
			});
			if (skip.text) {
				skipToken.append(skip.text);
			}
			token.append(skipToken);
		}
		if (child.text) {
			token.append(child.text);
		}
		for (const skip of child.postskips) {
			const skipToken = new SyntaxTrivia(skip.type.name, {
				...(skip.keyword && { value: skip.keyword.name }),
			});
			if (skip.text) {
				skipToken.append(skip.text);
			}
			token.append(skipToken);
		}
		parent.append(token);
		return token;
	}
}
