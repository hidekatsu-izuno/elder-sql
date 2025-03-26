import { Element, Text } from "domhandler";
import { appendChild, replaceElement, textContent } from "domutils";
import type { Lexer, Token } from "./lexer.js";

export abstract class SyntaxElement extends Element {
	append(child: Element | string) {
		if (child instanceof Element) {
			appendChild(this, child);
		} else {
			appendChild(this, new Text(child));
		}
		return this;
	}

	replaceWith(replacement: Element) {
		replaceElement(this, replacement);
		return this;
	}

	textContent() {
		return textContent(this);
	}
}

export class SyntaxNode extends SyntaxElement {
	constructor(type: string, attribs: { [name: string]: string } = {}) {
		super("node", { ...attribs, type });
	}
}

export class SyntaxToken extends SyntaxElement {
	constructor(type: string, attribs: { [name: string]: string } = {}) {
		super("token", { ...attribs, type });
	}
}

export class SyntaxTrivia extends SyntaxElement {
	constructor(type: string, attribs: { [name: string]: string } = {}) {
		super("trivia", { ...attribs, type });
	}
}

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

	abstract parseTokens(tokens: Token[]): SyntaxNode;
}

export class AggregateParseError extends Error {
	node: SyntaxNode;
	errors: Error[];

	constructor(node: SyntaxNode, errors: Error[], message: string) {
		super(message);
		this.node = node;
		this.errors = errors;
	}
}
