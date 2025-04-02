import { Element, Text } from "domhandler";
import { appendChild } from "domutils";
import type { Lexer, Token } from "./lexer.ts";
import { escapeXml } from "./utils.ts";

export declare type ParserOptions = {
	[key: string]: string;
};

export abstract class Parser {
	lexer: Lexer;
	builder: CstBuilder;
	options: ParserOptions;

	constructor(lexer: Lexer, builder: CstBuilder, options: ParserOptions = {}) {
		this.lexer = lexer;
		this.builder = builder;
		this.options = options;
	}

	parse(script: string | Token[], filename?: string) {
		const tokens = Array.isArray(script)
			? script
			: this.lexer.lex(script, filename);
		return this.parseTokens(tokens);
	}

	abstract parseTokens(tokens: Token[]): Element;
}

export class AggregateParseError extends Error {
	node: Element;
	errors: Error[];

	constructor(node: Element, errors: Error[], message: string) {
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

const EMPTY_NODE = new Element("node", {});
export class CstBuilder {
	root: Element;
	current: Element;
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
		const elem = new Element("node", {
			type,
			...(value != null ? { value: value.toString() } : {}),
		});
		if (this.current === EMPTY_NODE) {
			this.root = elem;
		} else {
			appendChild(this.current, elem);
		}
		this.current = elem;
		return this.current;
	}

	type(type: string, context?: Element) {
		if (context) {
			context.attribs.type = type;
			return context.attribs.type;
		} else {
			this.current.attribs.type = type;
			return this.current.attribs.type;
		}
	}

	value(value: string | number | boolean, context?: Element) {
		if (context) {
			context.attribs.value = value.toString();
			return context.attribs.value;
		} else {
			this.current.attribs.value = value.toString();
			return this.current.attribs.value;
		}
	}

	append(child: Element, context?: Element) {
		if (context) {
			appendChild(context, child);
		} else {
			appendChild(this.current, child);
		}
		return child;
	}

	token(token: Token, context?: Element) {
		const elem = new Element("token", {
			type: token.type.name,
			...(token.keyword != null ? { value: token.keyword.name } : {}),
		});
		if (this.options.trivia) {
			for (const skip of token.preskips) {
				const trivia = new Element("trivia", {
					type: skip.type.name,
					...(skip.keyword != null ? { value: skip.keyword.name } : {}),
				});
				if (skip.text) {
					appendChild(trivia, new Text(skip.text));
				}
				appendChild(elem, trivia);
			}
		}
		if (token.text) {
			appendChild(elem, new Text(token.text));
		}
		if (this.options.trivia) {
			for (const skip of token.postskips) {
				const trivia = new Element("trivia", {
					type: skip.type.name,
					...(skip.keyword != null ? { value: skip.keyword.name } : {}),
				});
				if (skip.text) {
					appendChild(trivia, new Text(skip.text));
				}
				appendChild(elem, trivia);
			}
		}
		if (
			!this.options.token ||
			this.options.marker || token.text ||
			(this.options.trivia &&
				(token.preskips.length !== 0 || token.postskips.length !== 0))
		) {
			if (context) {
				appendChild(context, elem);
			} else {
				appendChild(this.current, elem);
			}
		}
		return token;
	}

	end(start?: Element) {
		if (start && start !== this.current) {
			throw new Error("Start and end elements do not match");
		}
		if (this.current.parent instanceof Element) {
			const current = this.current;
			this.current = this.current.parent;
			return current;
		} else {
			return this.root;
		}
	}

	toString(context?: Element) {
		return this.traverseToString(context ?? this.current, 0);
	}

	private traverseToString(elem: Element, depth: number): string {
		const node = elem.name === "node";
		const token = elem.name === "token";
		const trivia = elem.name === "trivia";
		const marker = token && elem.children.length === 0;

		if (
			(token && !this.options.token) ||
			(trivia && !this.options.trivia) ||
			(marker && !this.options.marker)
		) {
			return "";
		}

		const indent = "  ".repeat(depth);

		let str = "";
		str += `${node || token ? indent : ""}<${escapeXml(elem.name)}`;
		const keys = Object.keys(elem.attribs);
		keys.sort();
		for (const key of keys) {
			str += ` ${escapeXml(key)}="${escapeXml(elem.attribs[key])}"`;
		}
		str += `>${node ? "\n" : ""}`;
		for (const child of elem.children) {
			if (child instanceof Text) {
				str += escapeXml(child.data, { control: true });
			} else if (child instanceof Element) {
				str += this.traverseToString(child, depth + 1);
			}
		}
		str += `${node ? indent : ""}</${escapeXml(elem.name)}>${node || token ? "\n" : ""}`;
		return str;
	}
}
