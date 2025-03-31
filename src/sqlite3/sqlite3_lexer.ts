import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
} from "../lexer.js";
import { SqlKeywords, SqlTokenType } from "../sql.js";

const keywords = new SqlKeywords();
keywords.options(SqlKeywords.TABLE).reserved = true;

const ReservedSet = new Set<Keyword>([
	SqlKeywords.ADD,
	SqlKeywords.ALL,
	SqlKeywords.ALTER,
	SqlKeywords.AND,
	SqlKeywords.AS,
	SqlKeywords.AUTOINCREMENT,
	SqlKeywords.BETWEEN,
	SqlKeywords.CASE,
	SqlKeywords.CHECK,
	SqlKeywords.COLLATE,
	SqlKeywords.COMMIT,
	SqlKeywords.CONSTRAINT,
	SqlKeywords.CREATE,
	SqlKeywords.CROSS,
	SqlKeywords.CURRENT_DATE,
	SqlKeywords.CURRENT_TIME,
	SqlKeywords.CURRENT_TIMESTAMP,
	SqlKeywords.DEFAULT,
	SqlKeywords.DEFERRABLE,
	SqlKeywords.DELETE,
	SqlKeywords.DISTINCT,
	SqlKeywords.ELSE,
	SqlKeywords.ESCAPE,
	SqlKeywords.EXISTS,
	SqlKeywords.FILTER,
	SqlKeywords.FOREIGN,
	SqlKeywords.FROM,
	SqlKeywords.GLOB,
	SqlKeywords.GROUP,
	SqlKeywords.HAVING,
	SqlKeywords.IN,
	SqlKeywords.INDEX,
	SqlKeywords.INDEXED,
	SqlKeywords.INNER,
	SqlKeywords.INSERT,
	SqlKeywords.INTO,
	SqlKeywords.IS,
	SqlKeywords.ISNULL,
	SqlKeywords.JOIN,
	SqlKeywords.LEFT,
	SqlKeywords.LIMIT,
	SqlKeywords.NATURAL,
	SqlKeywords.NOT,
	SqlKeywords.NOTHING,
	SqlKeywords.NOTNULL,
	SqlKeywords.NULL,
	SqlKeywords.ON,
	SqlKeywords.OR,
	SqlKeywords.ORDER,
	SqlKeywords.PRIMARY,
	SqlKeywords.OUTER,
	SqlKeywords.OVER,
	SqlKeywords.REFERENCES,
	SqlKeywords.REGEXP,
	SqlKeywords.RETURNING,
	SqlKeywords.RIGHT,
	SqlKeywords.SELECT,
	SqlKeywords.SET,
	SqlKeywords.TABLE,
	SqlKeywords.TEMPORARY,
	SqlKeywords.THEN,
	SqlKeywords.TO,
	SqlKeywords.TRANSACTION,
	SqlKeywords.UNIQUE,
	SqlKeywords.UPDATE,
	SqlKeywords.USING,
	SqlKeywords.VALUES,
	SqlKeywords.WHEN,
	SqlKeywords.WHERE,
	SqlKeywords.WINDOW,
]);

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
	private reserved = new Set<Keyword>();

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

		const compileOptions = new Set(options.compileOptions || []);
		if (!compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS")) {
			this.reserved.add(SqlKeywords.ALWAYS);
			this.reserved.add(SqlKeywords.GENERATED);
		}
		if (!compileOptions.has("SQLITE_OMIT_WINDOWFUNC")) {
			this.reserved.add(SqlKeywords.CURRENT);
			this.reserved.add(SqlKeywords.EXCLUDE);
			this.reserved.add(SqlKeywords.FOLLOWING);
			this.reserved.add(SqlKeywords.GROUPS);
			this.reserved.add(SqlKeywords.OTHERS);
			this.reserved.add(SqlKeywords.PARTITION);
			this.reserved.add(SqlKeywords.PRECEDING);
			this.reserved.add(SqlKeywords.RANGE);
			this.reserved.add(SqlKeywords.TIES);
			this.reserved.add(SqlKeywords.UNBOUNDED);
		}
		if (!compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT")) {
			this.reserved.add(SqlKeywords.EXCEPT);
			this.reserved.add(SqlKeywords.INTERSECT);
			this.reserved.add(SqlKeywords.UNION);
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
		const keyword = SqlKeywords.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (ReservedSet.has(keyword) || this.reserved.has(keyword)) {
				token.type = SqlTokenType.Reserved;
			}

			if (state.mode === Mode.SQL_START) {
				if (keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				(keyword === SqlKeywords.TABLE ||
					keyword === SqlKeywords.VIEW ||
					keyword === SqlKeywords.TRIGGER ||
					keyword === SqlKeywords.INDEX)
			) {
				if (keyword === SqlKeywords.TRIGGER) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (keyword === SqlKeywords.BEGIN) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: keyword }];
				}
			} else if (state.mode === Mode.SQL_PROC_BODY) {
				const ctx = state.stack[state.stack.length - 1];
				if (ctx.isSentenceStart) {
					if (keyword === SqlKeywords.END) {
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
