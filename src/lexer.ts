export class TokenType {
	static Reserved = new TokenType("Reserved");
	static EoF = new TokenType("EoF");
	static Error = new TokenType("Error");

	name: string;

	constructor(name: string) {
		this.name = name;
	}

	toString() {
		return this.name;
	}
}

declare type KeywordMapEntry = {
	keyword: Keyword;
	options?: Record<string, any>;
};

export class KeywordMap {
	private map = new Map<string, KeywordMapEntry>();
	private imap = new Map<string, KeywordMapEntry>();

	constructor() {
		for (const key of Object.keys(this.constructor)) {
			const keyword = (this.constructor as any)[key];
			if (keyword instanceof Keyword) {
				if (keyword.ignoreCase) {
					this.imap.set(keyword.name.toLowerCase(), { keyword });
				} else {
					this.map.set(keyword.name, { keyword });
				}
			}
		}
	}

	get(name: string): Keyword | undefined {
		let entry = this.map.get(name);
		if (entry) {
			return entry.keyword;
		}

		const iname = name.toLowerCase();
		entry = this.imap.get(iname);
		if (entry) {
			return entry.keyword;
		}
	}

	options(keyword: Keyword, options?: Record<string, any>) {
		let entry: ReturnType<typeof this.map.get>;
		if (keyword.ignoreCase) {
			entry = this.imap.get(keyword.name.toLowerCase());
		} else {
			entry = this.map.get(keyword.name);
		}
		if (options) {
			if (entry) {
				entry.options = options;
			} else {
				this.map.set(keyword.name, {
					keyword,
					options,
				});
			}
		}
		return entry?.options;
	}
}

export class Keyword {
	name: string;
	ignoreCase: boolean;

	constructor(
		name: string,
		options?: {
			ignoreCase?: boolean;
		},
	) {
		this.name = name;
		this.ignoreCase = !!options?.ignoreCase;
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

export declare type TokenQuery =
	| TokenType
	| Keyword
	| string
	| RegExp
	| ((token: Token) => boolean)
	| TokenQuery[];

export class Token {
	type: TokenType;
	text: string;
	keyword?: Keyword;
	eos: boolean;
	skip: boolean;
	separator: boolean;
	preskips: Token[];
	postskips: Token[];
	location?: SourceLocation;

	constructor(
		type: TokenType,
		text: string,
		options?: {
			keyword?: Keyword;
			eos?: boolean;
			skip?: boolean;
			separator?: boolean;
			preskips?: Token[];
			postskips?: Token[];
			location?: SourceLocation;
		},
	) {
		this.type = type;
		this.text = text;
		this.keyword = options?.keyword;
		this.eos = !!options?.eos;
		this.skip = !!options?.skip;
		this.separator = !!options?.separator;
		this.preskips = options?.preskips ?? [];
		this.postskips = options?.postskips ?? [];
		this.location = options?.location;
	}

	is(query: TokenQuery) {
		if (Array.isArray(query)) {
			for (const item of query) {
				if (this.is(item)) {
					return true;
				}
			}
			return false;
		} else if (query instanceof Keyword) {
			return this.keyword === query;
		} else if (query instanceof TokenType) {
			return this.type === query;
		} else if (typeof query === "string") {
			return this.text === query;
		} else if (query instanceof RegExp) {
			return query.test(this.text);
		} else if (typeof query === "function") {
			return !!query(this);
		} else {
			throw new Error(`Invalid query: ${query}`);
		}
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
	separator?: boolean;
	keywords?: KeywordMap;
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
		this.patterns = [
			...patterns,
			{ type: TokenType.Error, re: /./y, separator: true },
		];
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
				skip: pattern.skip,
				separator: pattern.separator,
				location,
			});
			const newTokens = pattern.onMatch?.(state, token);
			if (newTokens && newTokens.length > 0) {
				skips.push(...newTokens[0].preskips);
				newTokens[0].preskips = [];
			}
			for (const newToken of newTokens || [token]) {
				if (newToken.skip) {
					if (this.options.skipTokenStrategy !== "ignore") {
						skips.push(newToken);
					}
				}

				if (this.options.skipTokenStrategy === "adaptive") {
					if (newToken.separator) {
						const last = tokens[tokens.length - 1];
						if (last && last.postskips.length === 0 && skips.length > 0) {
							last.postskips.push(...skips);
							skips = [];
						}
					}
				}

				if (!newToken.skip) {
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

	peekIf(
		...queries: (TokenQuery | { query: TokenQuery; optional: boolean })[]
	) {
		if (queries.length === 0) {
			throw new RangeError("conditions must be at least one.");
		}

		let pos = 0;
		for (const query of queries) {
			if (!query) {
				throw new RangeError("condition must not be empty.");
			}

			const token = this.peek(pos);
			if (typeof query === "object" && query != null && "query" in query) {
				if (token?.is(query.query)) {
					pos++;
				}
			} else if (token?.is(query)) {
				pos++;
			} else {
				return false;
			}
		}
		return true;
	}

	consume(condition?: TokenQuery) {
		const token = this.peek();
		if (token == null) {
			throw this.createParseError();
		}
		if (condition != null && !token.is(condition)) {
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
			message = `Unexpected token: ${token.text}\n${line.replace(/\r?\n/g, "\u21B5\n")}\u261C`;
		}

		if (lineNumber == null) {
			lineNumber = 1;
			for (let i = 0; i < this.pos; i++) {
				const token = this.tokens[i];
				lineNumber += token.text.match(/\r?\n/g)?.length || 0;
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
