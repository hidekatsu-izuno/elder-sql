import { Lexer, type LexerOptions, SourceLocation, Token } from "../lexer.ts";
import { SqlKeywords, SqlTokenType } from "../sql.ts";

const keywords = new SqlKeywords();
keywords.options(SqlKeywords.ADD).reserved = true;
keywords.options(SqlKeywords.ALL).reserved = true;
keywords.options(SqlKeywords.ALTER).reserved = true;
keywords.options(SqlKeywords.AND).reserved = true;
keywords.options(SqlKeywords.AS).reserved = true;
keywords.options(SqlKeywords.AUTOINCREMENT).reserved = true;
keywords.options(SqlKeywords.BETWEEN).reserved = true;
keywords.options(SqlKeywords.CASE).reserved = true;
keywords.options(SqlKeywords.CHECK).reserved = true;
keywords.options(SqlKeywords.COLLATE).reserved = true;
keywords.options(SqlKeywords.COMMIT).reserved = true;
keywords.options(SqlKeywords.CONSTRAINT).reserved = true;
keywords.options(SqlKeywords.CREATE).reserved = true;
keywords.options(SqlKeywords.CROSS).reserved = true;
keywords.options(SqlKeywords.CURRENT_DATE).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIME).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIMESTAMP).reserved = true;
keywords.options(SqlKeywords.DEFAULT).reserved = true;
keywords.options(SqlKeywords.DEFERRABLE).reserved = true;
keywords.options(SqlKeywords.DELETE).reserved = true;
keywords.options(SqlKeywords.DISTINCT).reserved = true;
keywords.options(SqlKeywords.ELSE).reserved = true;
keywords.options(SqlKeywords.ESCAPE).reserved = true;
keywords.options(SqlKeywords.EXISTS).reserved = true;
keywords.options(SqlKeywords.FILTER).reserved = true;
keywords.options(SqlKeywords.FOREIGN).reserved = true;
keywords.options(SqlKeywords.FROM).reserved = true;
keywords.options(SqlKeywords.GLOB).reserved = true;
keywords.options(SqlKeywords.GROUP).reserved = true;
keywords.options(SqlKeywords.HAVING).reserved = true;
keywords.options(SqlKeywords.IN).reserved = true;
keywords.options(SqlKeywords.INDEX).reserved = true;
keywords.options(SqlKeywords.INDEXED).reserved = true;
keywords.options(SqlKeywords.INNER).reserved = true;
keywords.options(SqlKeywords.INSERT).reserved = true;
keywords.options(SqlKeywords.INTO).reserved = true;
keywords.options(SqlKeywords.IS).reserved = true;
keywords.options(SqlKeywords.ISNULL).reserved = true;
keywords.options(SqlKeywords.JOIN).reserved = true;
keywords.options(SqlKeywords.LEFT).reserved = true;
keywords.options(SqlKeywords.LIMIT).reserved = true;
keywords.options(SqlKeywords.NATURAL).reserved = true;
keywords.options(SqlKeywords.NOT).reserved = true;
keywords.options(SqlKeywords.NOTHING).reserved = true;
keywords.options(SqlKeywords.NOTNULL).reserved = true;
keywords.options(SqlKeywords.NULL).reserved = true;
keywords.options(SqlKeywords.ON).reserved = true;
keywords.options(SqlKeywords.OR).reserved = true;
keywords.options(SqlKeywords.ORDER).reserved = true;
keywords.options(SqlKeywords.PRIMARY).reserved = true;
keywords.options(SqlKeywords.OUTER).reserved = true;
keywords.options(SqlKeywords.OVER).reserved = true;
keywords.options(SqlKeywords.REFERENCES).reserved = true;
keywords.options(SqlKeywords.REGEXP).reserved = true;
keywords.options(SqlKeywords.RETURNING).reserved = true;
keywords.options(SqlKeywords.RIGHT).reserved = true;
keywords.options(SqlKeywords.SELECT).reserved = true;
keywords.options(SqlKeywords.SET).reserved = true;
keywords.options(SqlKeywords.TABLE).reserved = true;
keywords.options(SqlKeywords.TEMPORARY).reserved = true;
keywords.options(SqlKeywords.THEN).reserved = true;
keywords.options(SqlKeywords.TO).reserved = true;
keywords.options(SqlKeywords.TRANSACTION).reserved = true;
keywords.options(SqlKeywords.UNIQUE).reserved = true;
keywords.options(SqlKeywords.UPDATE).reserved = true;
keywords.options(SqlKeywords.USING).reserved = true;
keywords.options(SqlKeywords.VALUES).reserved = true;
keywords.options(SqlKeywords.WHEN).reserved = true;
keywords.options(SqlKeywords.WHERE).reserved = true;
keywords.options(SqlKeywords.WINDOW).reserved = true;

keywords.options(SqlKeywords.TABLE).objectStart = true;
keywords.options(SqlKeywords.VIEW).objectStart = true;
keywords.options(SqlKeywords.TRIGGER).objectStart = true;
keywords.options(SqlKeywords.INDEX).objectStart = true;

const Mode = {
	INITIAL: 0,
	SQL_START: 1,
	SQL_OBJECT_DEF: 2,
	SQL_PROC_DEF: 3,
	SQL_PROC_BODY: 4,
	SQL_PART: Number.MAX_SAFE_INTEGER,
} as const;

export declare type Sqlite3LexerOptions = LexerOptions & {
	compileOptions?: string[];
};

export class Sqlite3Lexer extends Lexer {
	constructor(options: Sqlite3LexerOptions = {}) {
		super(
			"sqlite3",
			[
				{ type: SqlTokenType.BlockComment, re: /\/\*.*?\*\//sy, skip: true },
				{ type: SqlTokenType.LineComment, re: /--.*/y, skip: true },
				{
					type: SqlTokenType.LineBreak,
					re: /\n|\r\n?/y,
					skip: true,
					separator: true,
				},
				{ type: SqlTokenType.WhiteSpace, re: /[ \t\f]+/y, skip: true },
				{
					type: SqlTokenType.Delimiter,
					re: /(?<=^|[\r\n])([/]|GO)[ \t\f]*(\n|\r\n?|$)/iy,
					separator: true,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlTokenType.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n])\..+(\n|\r\n?|$)/y
							: false,
					onMatch: (state, token) => this.onMatchCommand(state, token),
					onUnmatch: (state) => this.onUnmatchCommand(state),
				},
				{
					type: SqlTokenType.SemiColon,
					re: /;/y,
					separator: true,
					onMatch: (state, token) => this.onMatchSemiColon(state, token),
				},
				{ type: SqlTokenType.LeftBrace, re: /\{/y, separator: true },
				{ type: SqlTokenType.RightBrace, re: /\}/y, separator: true },
				{ type: SqlTokenType.LeftParen, re: /\(/y, separator: true },
				{ type: SqlTokenType.RightParen, re: /\)/y, separator: true },
				{ type: SqlTokenType.Comma, re: /,/y, separator: true },
				{
					type: SqlTokenType.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Dot, re: /\./y, separator: true },
				{ type: SqlTokenType.Blob, re: /[Xx]'([^']|'')*'/y },
				{ type: SqlTokenType.String, re: /'([^']|'')*'/y },
				{
					type: SqlTokenType.Identifier,
					re: /("([^"]|"")*"|`([^`]|``)*`|\[[^\]]*\])/y,
				},
				{ type: SqlTokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
				{
					type: SqlTokenType.BindVariable,
					re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlTokenType.Operator,
					re: /\|\||<<|>>|<>|->>?|[=<>!]=?|[~&|*/%+-]/y,
					separator: true,
				},
				{
					type: SqlTokenType.Identifier,
					re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);

		if (!this.options.keywords) {
			let newKeywords: SqlKeywords | undefined;
			const compileOptions = new Set(options.compileOptions || []);
			if (!compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS")) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.ALWAYS).reserved = true;
				newKeywords.options(SqlKeywords.GENERATED).reserved = true;
			}
			if (!compileOptions.has("SQLITE_OMIT_WINDOWFUNC")) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.CURRENT).reserved = true;
				newKeywords.options(SqlKeywords.EXCLUDE).reserved = true;
				newKeywords.options(SqlKeywords.FOLLOWING).reserved = true;
				newKeywords.options(SqlKeywords.GROUPS).reserved = true;
				newKeywords.options(SqlKeywords.OTHERS).reserved = true;
				newKeywords.options(SqlKeywords.PARTITION).reserved = true;
				newKeywords.options(SqlKeywords.PRECEDING).reserved = true;
				newKeywords.options(SqlKeywords.RANGE).reserved = true;
				newKeywords.options(SqlKeywords.TIES).reserved = true;
				newKeywords.options(SqlKeywords.UNBOUNDED).reserved = true;
			}
			if (!compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT")) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.EXCEPT).reserved = true;
				newKeywords.options(SqlKeywords.INTERSECT).reserved = true;
				newKeywords.options(SqlKeywords.UNION).reserved = true;
			}
			this.options.keywords = newKeywords ? newKeywords : keywords;
		}
	}

	protected initState(state: Record<string, any>): void {
		state.mode = Mode.INITIAL;
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;
		token.eos = true;

		const m = /^([^ \t\f\r\n]+)([ \t\f]*)(\n|\r\n?)?$/.exec(token.text);
		if (m) {
			let location = token.location;
			token.text = m[1];
			if (location) {
				location = new SourceLocation(
					location.position + m[1].length,
					location.lineNumber,
					location.columnNumber + m[1].length,
					location.source,
				);
			}
			if (m[2]) {
				token.postskips.push(
					new Token(SqlTokenType.WhiteSpace, m[2], {
						location,
					}),
				);
			}
			if (location && m[3]) {
				location = new SourceLocation(
					location.position + m[2].length,
					location.lineNumber,
					location.columnNumber + m[2].length,
					location.source,
				);
			}
			if (m[3]) {
				token.postskips.push(
					new Token(SqlTokenType.LineBreak, m[3], {
						location,
					}),
				);
			}
		}
	}

	private onMatchCommand(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;

		const tokens = [];
		let location = token.location;

		const re = /(\n|\r\n?)|([ \t\f]+)|("[^"]*"|'[^']*')|([^ \t\f\r\n"']+)/y;
		let pos = 0;
		let skips = [];
		while (pos < token.text.length) {
			re.lastIndex = pos;
			const m = re.exec(token.text);
			if (m) {
				const type = m[1]
					? SqlTokenType.LineBreak
					: m[2]
						? SqlTokenType.WhiteSpace
						: m[3]
							? SqlTokenType.String
							: pos === 0
								? SqlTokenType.Command
								: SqlTokenType.Identifier;

				if (token.location) {
					location = new SourceLocation(
						token.location.position + pos,
						token.location.lineNumber,
						token.location.columnNumber + pos,
						token.location.source,
					);
				}

				const newToken = new Token(type, m[0], {
					location,
				});

				if (
					type === SqlTokenType.WhiteSpace ||
					type === SqlTokenType.LineBreak
				) {
					skips.push(newToken);
				} else {
					newToken.preskips = skips;
					skips = [];
					tokens.push(newToken);
				}

				pos = re.lastIndex;
			} else {
				throw new Error("Unexpected error caused!");
			}
		}

		if (skips.length > 0) {
			tokens[tokens.length - 1].postskips = skips;
		}
		tokens[tokens.length - 1].eos = true;

		return tokens;
	}

	private onUnmatchCommand(state: Record<string, any>) {
		if (state.mode === Mode.INITIAL) {
			state.mode = Mode.SQL_START;
		}
	}

	private onMatchSemiColon(state: Record<string, any>, token: Token) {
		if (state.mode === Mode.SQL_PROC_BODY) {
			state.stack[state.stack.length - 1].isSentenceStart = true;
		} else {
			state.mode = Mode.INITIAL;
			token.eos = true;
		}
	}

	private onMatchIdentifier(state: Record<string, any>, token: Token) {
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				if (token.keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				this.options.keywords?.options(token.keyword).objectStart
			) {
				if (token.keyword === SqlKeywords.TRIGGER) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (token.keyword === SqlKeywords.BEGIN) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: token.keyword }];
				}
			} else if (state.mode === Mode.SQL_PROC_BODY) {
				const ctx = state.stack[state.stack.length - 1];
				if (ctx.isSentenceStart) {
					if (token.keyword === SqlKeywords.END) {
						state.stack.pop();
						if (state.stack.length === 0) {
							state.mode = Mode.SQL_PART;
							delete state.stack;
						}
					}
				}
			}
		}
	}
}
