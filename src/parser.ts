import { Element, Text } from "domhandler";
import { appendChild, replaceElement } from "domutils";
import type { Lexer, Token } from "./lexer.ts";

export abstract class Parser {
	lexer: Lexer;
	options: Record<string, any>;

	constructor(lexer: Lexer, options: Record<string, any> = {}) {
		this.lexer = lexer;
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

const EMPTY_NODE = new Element("node", {});
export class CstBuilder {
	root: Element;
	current: Element;

	constructor() {
		this.root = EMPTY_NODE;
		this.current = EMPTY_NODE;
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
		for (const skip of token.preskips) {
			const skipToken = new Element("trivia", {
				type: skip.type.name,
				...(skip.keyword != null ? { value: skip.keyword.name } : {}),
			});
			if (skip.text) {
				appendChild(skipToken, new Text(skip.text));
			}
			appendChild(elem, skipToken);
		}
		if (token.text) {
			appendChild(elem, new Text(token.text));
		}
		for (const skip of token.postskips) {
			const skipToken = new Element("trivia", {
				type: skip.type.name,
				...(skip.keyword != null ? { value: skip.keyword.name } : {}),
			});
			if (skip.text) {
				appendChild(skipToken, new Text(skip.text));
			}
			appendChild(elem, skipToken);
		}
		if (context) {
			appendChild(context, elem);
		} else {
			appendChild(this.current, elem);
		}
		return token;
	}

	end() {
		if (this.current.parent instanceof Element) {
			const current = this.current;
			this.current = this.current.parent;
			return current;
		} else {
			return this.root;
		}
	}
}
