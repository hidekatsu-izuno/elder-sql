import { Element as DomHandlerElement, Text as DomHandlerText } from "domhandler";
import type { Lexer, Token } from "./lexer.js";

export class Element extends DomHandlerElement {

}

export class Text extends DomHandlerText {
	
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
