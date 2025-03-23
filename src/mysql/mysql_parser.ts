import {
	Keyword,
	ParseError,
	Token,
	TokenReader,
	TokenType,
} from "../lexer.js";
import { SyntaxNode, TokenNode, TriviaNode, AggregateParseError, Parser } from "../parser.js";
import { apply, dequote } from "../utils.js";
import { MysqlLexer } from "./mysql_lexer.js";

export class OracleParser extends Parser {
	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new MysqlLexer(options), options);
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
					this.appendToken(root, r.consume());
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
				this.appendToken(node, r.consume(Keyword.EXPLAIN));
				if (r.peekIf(Keyword.QUERY)) {
					apply(
						this.append(node, new SyntaxNode("QueryPlanOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.PLAN));
						},
					);
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
			while (!r.peek().eos && !MysqlLexer.isObjectStart(r.peek().keyword)) {
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
					this.appendToken(node, r.consume());
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
		const token = new TokenNode(child.type.name, {
			...(child.keyword && { value: child.keyword.name }),
		});
		for (const skip of child.preskips) {
			const skipToken = new TriviaNode(skip.type.name, {
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
			const skipToken = new TriviaNode(skip.type.name, {
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
