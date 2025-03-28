export class TokenType {
	static EoF = new TokenType("EoF", { separator: true });
	static Error = new TokenType("Error", { separator: true });

	name: string;
	separator: boolean;

	constructor(
		name: string,
		options?: {
			separator?: boolean;
		},
	) {
		this.name = name;
		this.separator = !!options?.separator;
	}

	toString() {
		return this.name;
	}
}

export class Keyword {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	toString() {
		return this.name;
	}
}

export class SourceLocation {
	position: number;
	lineNumber: number;
	columnNumber: number;
	source?: string;

	constructor(position = 0, lineNumber = 1, columnNumber = 0, source?: string) {
		this.position = position;
		this.lineNumber = lineNumber;
		this.columnNumber = columnNumber;
		this.source = source;
	}

	clone() {
		return new SourceLocation(
			this.position,
			this.lineNumber,
			this.columnNumber,
			this.source,
		);
	}

	toString() {
		let out = "";
		if (this.source != null) {
			out += this.source;
		}
		if (this.lineNumber != null) {
			out += `[${this.lineNumber}`;
			if (this.columnNumber != null) {
				out += `,${this.columnNumber}`;
			}
			out += "] ";
		} else if (this.position != null) {
			out += `:${this.position}`;
		}
		return out;
	}
}

export declare type TokenQuery = {
	type?: TokenType | Keyword | (TokenType | Keyword)[];
	text?: string | string[] | RegExp;
	match?: (token: Token) => boolean;
};

export class Token {
	type: TokenType;
	text: string;
	keyword?: Keyword;
	eos: boolean;
	preskips: Token[];
	postskips: Token[];
	location?: SourceLocation;

	constructor(
		type: TokenType,
		text: string,
		options?: {
			keyword?: Keyword;
			eos?: boolean;
			preskips?: Token[];
			postskips?: Token[];
			location?: SourceLocation;
		},
	) {
		this.type = type;
		this.text = text;
		this.keyword = options?.keyword;
		this.eos = !!options?.eos;
		this.preskips = options?.preskips ?? [];
		this.postskips = options?.postskips ?? [];
		this.location = options?.location;
	}

	is(condition: TokenType | Keyword | TokenQuery) {
		if ("name" in condition) {
			if (condition === this.keyword || condition === this.type) {
				return true;
			}
		} else {
			let result = true;
			if (result && condition.type) {
				if (Array.isArray(condition.type)) {
					if (
						!condition.type.some(
							(type) => type === this.keyword || type === this.type,
						)
					) {
						result = false;
					}
				} else {
					if (condition.type !== this.keyword && condition.type !== this.type) {
						result = false;
					}
				}
			}
			if (result && condition.text) {
				if (Array.isArray(condition.text)) {
					if (!condition.text.some((text) => text === this.text)) {
						result = false;
					}
				} else if (condition.text instanceof RegExp) {
					if (!condition.text.test(this.text)) {
						result = false;
					}
				} else {
					if (condition.text !== this.text) {
						result = false;
					}
				}
			}
			if (result && condition.match) {
				if (!condition.match(this)) {
					result = false;
				}
			}
			if (result) {
				return true;
			}
		}
		return false;
	}

	clone() {
		return new Token(this.type, this.text, {
			keyword: this.keyword,
			eos: this.eos,
			preskips: [...this.preskips],
			postskips: [...this.postskips],
			location: this.location?.clone(),
		});
	}

	toString() {
		if (this.preskips.length > 0 || this.postskips.length > 0) {
			let out = "";
			for (let i = 0; i < this.preskips.length; i++) {
				out += this.preskips[i].text;
			}
			out += this.text;
			for (let i = 0; i < this.postskips.length; i++) {
				out += this.postskips[i].text;
			}
			return out;
		}
		return this.text;
	}
}

export declare type TokenPattern = {
	type: TokenType;
	re: RegExp | ((state: Record<string, any>) => RegExp | false);
	skip?: boolean;
	onMatch?: (state: Record<string, any>, token: Token) => Token[] | void;
	onUnmatch?: (state: Record<string, any>) => void;
};

export declare type LexerOptions = {
	skipTokenStrategy?: "ignore" | "next" | "adaptive";
	[key: string]: any;
};

export abstract class Lexer {
	name: string;
	patterns: TokenPattern[];
	options: LexerOptions = {};

	constructor(
		name: string,
		patterns: TokenPattern[],
		options: LexerOptions = {},
	) {
		this.name = name;
		this.patterns = patterns;
		this.options = options;
		if (!options.skipTokenStrategy) {
			options.skipTokenStrategy = "adaptive";
		}
		if (options.patternFilter) {
			this.patterns = options.patternFilter(this.patterns);
		}
	}

	lex(input: string, source?: string) {
		let pos = 0;
		if (input.charAt(0) === "\uFEFF") {
			pos++;
		}
		const state = {};
		this.initState(state);
		return this.sublex(state, input, new SourceLocation(pos, 1, 0, source));
	}

	isReserved(keyword?: Keyword) {
		return false;
	}

	protected initState(state: Record<string, any>) {}

	protected sublex(
		state: Record<string, any>,
		input: string,
		start?: SourceLocation,
	) {
		const tokens = new Array<Token>();
		let pos = 0;
		let lineNumber = start?.lineNumber ?? 1;
		let columnNumber = start?.columnNumber ?? 0;
		const source = start?.source;

		let skips = [];
		while (pos < input.length) {
			let pattern: TokenPattern | undefined;
			let text: string | undefined;
			let location: SourceLocation | undefined;
			for (const pat of this.patterns) {
				const re = typeof pat.re === "function" ? pat.re(state) : pat.re;
				if (re) {
					re.lastIndex = pos;
					const m = re.exec(input);
					if (m) {
						pattern = pat;
						text = m[0];
						if (start) {
							location = new SourceLocation(
								pos + start.position,
								lineNumber,
								columnNumber,
								source,
							);
						}

						pos = re.lastIndex;
						break;
					}
				}
				if (pat.onUnmatch) {
					pat.onUnmatch(state);
				}
			}

			if (pattern == null || text == null) {
				throw new Error(`Failed to tokenize: ${pos}`);
			}

			const token = new Token(pattern.type, text, {
				location,
			});
			const newTokens = pattern.onMatch?.(state, token);
			if (newTokens && newTokens.length > 0) {
				skips.push(...newTokens[0].preskips);
				newTokens[0].preskips = [];
			}
			for (const newToken of newTokens || [token]) {
				if (!newTokens && pattern.skip) {
					if (this.options.skipTokenStrategy !== "ignore") {
						skips.push(newToken);
					}
				}

				if (this.options.skipTokenStrategy === "adaptive") {
					if (newToken.type.separator) {
						const last = tokens[tokens.length - 1];
						if (last && last.postskips.length === 0 && skips.length > 0) {
							last.postskips.push(...skips);
							skips = [];
						}
					}
				}

				if (!(!newTokens && pattern.skip)) {
					if (skips.length > 0) {
						newToken.preskips.push(...skips);
						skips = [];
					}
					tokens.push(newToken);
				}
			}
			if (newTokens && newTokens.length > 0) {
				const last = tokens[tokens.length - 1];
				if (last && last.type === TokenType.EoF) {
					if (this.options.skipTokenStrategy !== "ignore") {
						skips.push(...last.preskips);
						skips.push(...last.postskips);
					}
					tokens.pop();
				}
			}

			if (start) {
				let index = text.indexOf("\n");
				if (index !== -1) {
					let lastIndex: number;
					do {
						lastIndex = index;
						lineNumber++;
						index = text.indexOf("\n", lastIndex + 1);
					} while (index !== -1);
					columnNumber = text.length - lastIndex;
				} else {
					columnNumber += text.length;
				}
			}
		}

		tokens.push(
			new Token(TokenType.EoF, "", {
				eos: true,
				preskips: skips,
				location: start
					? new SourceLocation(
							pos + start.position,
							lineNumber,
							columnNumber,
							source,
						)
					: undefined,
			}),
		);

		return tokens;
	}
}

export class TokenReader {
	tokens: Token[];
	pos = 0;
	state: Record<string, any> = {};

	constructor(tokens: Token[]) {
		this.tokens = tokens;
	}

	peek(pos = 0) {
		return this.tokens[this.pos + pos];
	}

	peekIf(...conditions: (Keyword | TokenType | TokenQuery)[]) {
		if (conditions.length === 0) {
			throw new RangeError("conditions must be at least one.");
		}

		for (let i = 0; i < conditions.length; i++) {
			const condition = conditions[i];
			if (!condition) {
				continue;
			}

			const token = this.peek(i);
			if (!token || !token.is(condition)) {
				return false;
			}
		}
		return true;
	}

	consume(condition?: Keyword | TokenType | TokenQuery) {
		const token = this.peek();
		if (token == null) {
			throw this.createParseError();
		}
		if (condition && !token.is(condition)) {
			throw this.createParseError();
		}
		this.pos++;
		return token;
	}

	createParseError(options: { message?: string } = {}) {
		const token = this.peek();
		const source = token?.location?.source;
		let lineNumber = token?.location?.lineNumber;
		const columnNumber = token?.location?.columnNumber;
		let message = options.message;

		if (message == null) {
			const end = Math.min(this.pos, this.tokens.length - 1);
			let start = end;
			while (start >= 0) {
				if (start === 0 || this.tokens[start].toString().indexOf("\n") !== -1) {
					if (start === end) {
						start = Math.max(start - 3, 0);
					}
					break;
				}
				start--;
			}
			let line = "";
			for (let i = start; i <= end; i++) {
				line += this.tokens[i].toString();
			}
			message = `Unexpected token: ${line.replace(/\r?\n/g, "\u21B5")}\u261C`;
		}

		if (lineNumber == null) {
			lineNumber = 1;
			for (let i = 0; i < this.pos; i++) {
				const token = this.tokens[i];
				lineNumber += (token.text.match(/\r?\n/g)?.length || 0);
			}
		}

		let prefix = "";
		if (source != null) {
			prefix += source;
		}
		prefix += `[${lineNumber}`;
		if (columnNumber != null) {
			prefix += `,${columnNumber}`;
		}
		prefix += "] ";

		const err = new ParseError(prefix + message);
		err.source = source;
		err.lineNumber = lineNumber;
		err.columnNumber = columnNumber;
		return err;
	}
}

export class ParseError extends Error {
	source?: string;
	lineNumber?: number;
	columnNumber?: number;
}
