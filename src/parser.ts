import { Element, Text } from "domhandler";
import { appendChild, replaceElement } from "domutils";
import type { Lexer, Token } from "./lexer.js";

export class SyntaxNode extends Element {
	append(child: SyntaxNode | TokenNode | TriviaNode) {
		appendChild(this, child);
	}

	replaceWith(replacement: SyntaxNode) {
		replaceElement(this, replacement);
	}
}

export class TokenNode extends Element {
	constructor(name: string, attribs: { [name: string]: string }) {
		super(name, attribs);
		
	}

	append(child: string | TriviaNode) {
		if (child instanceof TriviaNode) {
			appendChild(this, child);
		} else {
			appendChild(this, new Text(child));
		}
	}
}

export class TriviaNode extends Element {
	constructor(name: string, attribs: { [name: string]: string }) {
		super(name, attribs);
		
	}

	append(text: string) {
		appendChild(this, new Text(text));
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
