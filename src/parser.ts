import type { Lexer, Token } from "./lexer.ts";;

export declare type ParserOptions = {
	[key: string]: string;
};

export abstract class Parser<CstNode> {
	private lexer: Lexer;
	private builderFactory: () => CstBuilder<CstNode>;
	private options: ParserOptions;

	constructor(
		lexer: typeof this.lexer,
		builderFactory: typeof this.builderFactory,
		options: typeof this.options = {},
	) {
		this.lexer = lexer;
		this.builderFactory = builderFactory;
		this.options = options;
	}

	parse(script: string | Token[], filename?: string) {
		const tokens = Array.isArray(script)
			? script
			: this.lexer.lex(script, filename);
		const builder = this.builderFactory();
		this.parseTokens(tokens, builder);
		return builder.root;
	}

	abstract parseTokens(tokens: Token[], builder: CstBuilder<CstNode>): void;
}

export class AggregateParseError<CstNode> extends Error {
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

export interface CstBuilder<CstNode> {
	root: CstNode;
	current: CstNode;
	start(type: string, value?: string | number | boolean): CstNode;
	type(type: string, context?: CstNode): string;
	value(value: string | number | boolean, context?: CstNode): string;
	append(child: CstNode, context?: CstNode): CstNode;
	token(token: Token, context?: CstNode): Token;
	end(start?: CstNode): CstNode;
	toString(context?: CstNode): string;
}
