import { type Lexer, type Token, TokenType } from "./lexer.ts";
import { escapeXml } from "./utils.ts";

export declare type ParserOptions = {
	[key: string]: string;
};

export abstract class Parser {
	private lexer: Lexer;
	private options: ParserOptions;

	constructor(lexer: typeof this.lexer, options: typeof this.options = {}) {
		this.lexer = lexer;
		this.options = options;
	}

	parse(script: string | Token[], filename?: string) {
		const tokens = Array.isArray(script)
			? script
			: this.lexer.lex(script, filename);
		const builder = new CstBuilder(this.options);
		this.parseTokens(tokens, builder);
		return builder.root;
	}

	abstract parseTokens(tokens: Token[], builder: CstBuilder): void;
}

export class AggregateParseError extends Error {
	node: CstNode;
	errors: Error[];

	constructor(node: CstNode, errors: Error[], message: string) {
		super(message);
		this.node = node;
		this.errors = errors;
	}
}

export declare type CstBuilderOptions = {
	token?: boolean;
	trivia?: boolean;
	marker?: boolean;
};

export type CstAttributes = {
	type: string;
	value?: string | number | boolean;
};

export interface CstNode extends Array<CstAttributes | CstNode | string | undefined> {
	parent?: CstNode;
	0: string;
	1: CstAttributes;
}

const EMPTY_NODE: CstNode = ["node", { type: "" }];
export class CstBuilder {
	root: CstNode;
	current: CstNode;
	options: {
		token: boolean;
		trivia: boolean;
		marker: boolean;
	};

	constructor(options: CstBuilderOptions = {}) {
		this.root = EMPTY_NODE;
		this.current = EMPTY_NODE;
		this.options = {
			token: options.token ?? true,
			trivia: options.trivia ?? true,
			marker: options.marker ?? true,
		};
	}

	start(type: string, value?: string | number | boolean) {
		const elem: CstNode = ["node", { type }];
		if (value != null) {
			elem[1].value = value;
		}
		if (this.current === EMPTY_NODE) {
			this.root = elem;
		} else {
			this.current.push(elem);
			elem.parent = this.current;
		}
		this.current = elem;
		return this.current;
	}

	type(type: string, context?: CstNode) {
		const current = context ?? this.current;
		current[1].type = type;
		return current[1].type;
	}

	value(value: string | number | boolean, context?: CstNode) {
		const current = context ?? this.current;
		current[1].value = value.toString();
		return current[1].value;
	}

	append(child: CstNode, context?: CstNode) {
        const current = context ?? this.current;
        if (child.parent) {
            const index = child.parent.indexOf(child);
            if (index !== -1) {
                child.parent.splice(index, 1);
            }
        }
        current.push(child);
        child.parent = current;
		return child;
	}

	token(token: Token, context?: CstNode) {
		const elem: CstNode = ["token", { type: token.type.name }];
		if (this.options.trivia) {
			for (const skip of token.preskips) {
				const trivia: CstNode = ["trivia", { type: skip.type.name }];
				if (skip.text) {
					trivia.push(skip.text);
				}
				elem.push(trivia);
				trivia.parent = elem;
			}
		}
		if (token.text) {
			elem.push(token.text);
		}
		if (this.options.trivia) {
			for (const skip of token.postskips) {
				const trivia: CstNode = ["trivia", { type: skip.type.name }];
				if (skip.text) {
					trivia.push(skip.text);
				}
				elem.push(trivia);
				trivia.parent = elem;
			}
		}
		if (
			!this.options.token ||
			this.options.marker ||
			token.text ||
			(this.options.trivia &&
				(token.preskips.length !== 0 || token.postskips.length !== 0))
		) {
			const current = context ?? this.current;
			current.push(elem);
			elem.parent = current;
		}
		return token;
	}

	end(start?: CstNode) {
		if (start && start !== this.current) {
			throw new Error("Start and end elements do not match");
		}
		if (this.current.parent) {
			const current = this.current;
			this.current = this.current.parent;
			return current;
		} else {
			return this.root;
		}
	}

	static parseJSON(text: string) {
		const node = JSON.parse(text);
		function traverse(current: CstNode) {
			for (let i = 2; i < current.length; i++) {
				const child = current[i];
				if (Array.isArray(child)) {
					child.parent = current;
					traverse(child);
				}
			}
		}
		traverse(node);
		return node;
	}

	static toJSONString(node: CstNode, options?: CstBuilderOptions) {
		let out = "";
		function print(elem: CstNode, indent: number) {
			for (let i = 0; i < indent; i++) {
				out += "\t";
			}
			out += `[${JSON.stringify(elem[0])}, { "type": ${JSON.stringify(elem[1].type)}`;
			if (elem[1].value != null) {
				out += `, "value": ${JSON.stringify(elem[1].value)}`;
			}
			out += " }";
			for (let i = 2; i < elem.length; i++) {
				const child = elem[i];
				if (Array.isArray(child)) {
					const token = child[0] === "token";
					const trivia = child[0] === "trivia";
					const marker = token && child.length <= 1;
					if (
						(token && options?.token === false) ||
						(trivia && options?.trivia === false) ||
						(marker && options?.marker === false)
					) {
						continue;
					}
					out += ",\n";
					print(child, indent + 1);
				} else if (child) {
					out += ",";
					if (elem[0] === "node") {
						out += "\n";
						for (let i = 0; i < indent + 1; i++) {
							out += "\t";
						}
					} else {
						out += " ";
					}
					out += JSON.stringify(child);
				}
			}
			if (elem[0] === "node") {
				out += "\n";
				for (let i = 0; i < indent; i++) {
					out += "\t";
				}
			}
			out += "]";
		}
		print(node, 0);
		return out;
	}

	static toXMLString(node: CstNode, options?: CstBuilderOptions) {
		let out = "";
		function print(elem: CstNode, indent: number) {
			for (let i = 0; i < indent; i++) {
				out += "\t";
			}
			out += `<${escapeXml(elem[0])} type="${escapeXml(elem[1].type)}"`;
			if (elem[1].value != null) {
				out += ` value="${escapeXml(elem[1].value.toString())}"`;
			}
			out += ">";
			for (let i = 2; i < elem.length; i++) {
				const child = elem[i];
				if (Array.isArray(child)) {
					const token = child[0] === "token";
					const trivia = child[0] === "trivia";
					const marker = token && child.length <= 1;
					if (
						(token && options?.token === false) ||
						(trivia && options?.trivia === false) ||
						(marker && options?.marker === false)
					) {
						continue;
					}
					out += "\n";
					print(child, indent + 1);
				} else if (child) {
					if (elem[0] === "node") {
						out += "\n";
						for (let i = 0; i < indent + 1; i++) {
							out += "\t";
						}
					}
					out += escapeXml(child.toString());
				}
			}
			if (elem[0] === "node") {
				out += "\n";
				for (let i = 0; i < indent; i++) {
					out += "\t";
				}
			}
			out += `</${escapeXml(elem[0])}>`;
		}
		print(node, 0);
		return out;
	}

	static toTextString(node: CstNode, options?: CstBuilderOptions) {
		let out = "";
		function print(elem: CstNode, indent: number) {
			for (let i = 2; i < elem.length; i++) {
				const child = elem[i];
				if (Array.isArray(child)) {
					const token = child[0] === "token";
					const trivia = child[0] === "trivia";
					const marker = token && child.length <= 1;
					if (
						(token && options?.token === false) ||
						(trivia && options?.trivia === false) ||
						(marker && options?.marker === false)
					) {
						continue;
					}
					print(child, indent + 1);
				} else if (child) {
					out += child.toString();
				}
			}
		}
		print(node, 0);
		return out;
	}
}
