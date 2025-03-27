import { Element, Text } from "domhandler";
import { appendChild, replaceElement } from "domutils";
import type { Lexer, Token } from "./lexer.js";

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

export class CstBuilder {
	private _root: Element;
	private _current: Element;

	constructor(type: string, value?: string | number | boolean) {
		const elem = new Element("node", {
			type,
			...(value != null ? { value: value.toString() } : {}),
		});
		this._root = elem;
		this._current = this._root;
	}

	get root() {
		return this._root;
	}

	get current() {
		return this._current;
	}

	start(type: string, value?: string | number | boolean) {
		const elem = new Element("node", {
			type,
			...(value != null ? { value: value.toString() } : {}),
		});
		appendChild(this._current, elem);
		this._current = elem;
		return this;
	}

	wrapWith(type: string, value?: string | number | boolean) {
		const elem = new Element("node", {
			type,
			...(value != null ? { value: value.toString() } : {}),
		});
		replaceElement(this._current, elem);
		appendChild(elem, this._current);
		this._current = elem;
		return this;
	}

	value(value: string | number | boolean) {
		this.current.attribs.value = value.toString();
	}

	token(token: Token) {
		const elem = new Element("token", {
			type: token.type.name,
			...(token.keyword != null ? { value: token.keyword.name } : {}),
		});
		for (const skip of token.preskips) {
			const skipToken = new Element("trivia", {
				type: token.type.name,
				...(token.keyword != null ? { value: token.keyword.name } : {}),
			});
			if (skip.text) {
				appendChild(elem, new Text(token.text));
			}
			appendChild(elem, skipToken);
		}
		if (token.text) {
			appendChild(elem, new Text(token.text));
		}
		for (const skip of token.postskips) {
			const skipToken = new Element("trivia", {
				type: token.type.name,
				...(token.keyword != null ? { value: token.keyword.name } : {}),
			});
			if (skip.text) {
				appendChild(elem, new Text(token.text));
			}
			appendChild(elem, skipToken);
		}
		if (!this._current) {
			throw new Error("Parent node is required.");
		}
		appendChild(this._current, elem);
		return token;
	}

	end() {
		if (!(this._current.parent instanceof Element)) {
			throw new Error(`Parent node is required: ${this._current}`);
		}
		this._current = this._current.parent;
		return this;
	}
}