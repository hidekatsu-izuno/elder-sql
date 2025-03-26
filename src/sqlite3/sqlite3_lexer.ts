import { SqlTokenType, SqlKeyword } from "../sql.js"
import {
	Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
} from "../lexer.js";

const ObjectStartSet = new Set<Keyword>([
	SqlKeyword.TABLE,
	SqlKeyword.VIEW,
	SqlKeyword.TRIGGER,
	SqlKeyword.INDEX,
]);

const ReservedSet = new Set<Keyword>([
	SqlKeyword.ADD,
	SqlKeyword.ALL,
	SqlKeyword.ALTER,
	SqlKeyword.AND,
	SqlKeyword.AS,
	SqlKeyword.AUTOINCREMENT,
	SqlKeyword.BETWEEN,
	SqlKeyword.CASE,
	SqlKeyword.CHECK,
	SqlKeyword.COLLATE,
	SqlKeyword.COMMIT,
	SqlKeyword.CONSTRAINT,
	SqlKeyword.CREATE,
	SqlKeyword.CROSS,
	SqlKeyword.CURRENT_DATE,
	SqlKeyword.CURRENT_TIME,
	SqlKeyword.CURRENT_TIMESTAMP,
	SqlKeyword.DEFAULT,
	SqlKeyword.DEFERRABLE,
	SqlKeyword.DELETE,
	SqlKeyword.DISTINCT,
	SqlKeyword.ELSE,
	SqlKeyword.ESCAPE,
	SqlKeyword.EXISTS,
	SqlKeyword.FILTER,
	SqlKeyword.FOREIGN,
	SqlKeyword.FROM,
	SqlKeyword.GLOB,
	SqlKeyword.GROUP,
	SqlKeyword.HAVING,
	SqlKeyword.IN,
	SqlKeyword.INDEX,
	SqlKeyword.INDEXED,
	SqlKeyword.INNER,
	SqlKeyword.INSERT,
	SqlKeyword.INTO,
	SqlKeyword.IS,
	SqlKeyword.ISNULL,
	SqlKeyword.JOIN,
	SqlKeyword.LEFT,
	SqlKeyword.LIMIT,
	SqlKeyword.NATURAL,
	SqlKeyword.NOT,
	SqlKeyword.NOTHING,
	SqlKeyword.NOTNULL,
	SqlKeyword.NULL,
	SqlKeyword.ON,
	SqlKeyword.OR,
	SqlKeyword.ORDER,
	SqlKeyword.PRIMARY,
	SqlKeyword.OUTER,
	SqlKeyword.OVER,
	SqlKeyword.REFERENCES,
	SqlKeyword.REGEXP,
	SqlKeyword.RETURNING,
	SqlKeyword.RIGHT,
	SqlKeyword.SELECT,
	SqlKeyword.SET,
	SqlKeyword.TABLE,
	SqlKeyword.TEMPORARY,
	SqlKeyword.THEN,
	SqlKeyword.TO,
	SqlKeyword.TRANSACTION,
	SqlKeyword.UNIQUE,
	SqlKeyword.UPDATE,
	SqlKeyword.USING,
	SqlKeyword.VALUES,
	SqlKeyword.WHEN,
	SqlKeyword.WHERE,
	SqlKeyword.WINDOW,
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
	static isObjectStart(keyword?: Keyword) {
		return keyword != null && ObjectStartSet.has(keyword);
	}

	private reserved = new Set<Keyword>();

	constructor(options: Sqlite3LexerOptions = {}) {
		super(
			"sqlite3",
			[
				{ type: SqlTokenType.BlockComment, re: /\/\*.*?\*\//sy, skip: true },
				{ type: SqlTokenType.LineComment, re: /--.*/y, skip: true },
				{ type: SqlTokenType.LineBreak, re: /\n|\r\n?/y, skip: true },
				{ type: SqlTokenType.WhiteSpace, re: /[ \t\f]+/y, skip: true },
				{
					type: SqlTokenType.Delimiter,
					re: /(?<=^|[\r\n])([/]|GO)[ \t\f]*(\n|\r\n?|$)/iy,
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
					onMatch: (state, token) => this.onMatchSemiColon(state, token),
				},
				{ type: SqlTokenType.LeftBrace, re: /\{/y },
				{ type: SqlTokenType.RightBrace, re: /\}/y },
				{ type: SqlTokenType.LeftParen, re: /\(/y },
				{ type: SqlTokenType.RightParen, re: /\)/y },
				{ type: SqlTokenType.Comma, re: /,/y },
				{
					type: SqlTokenType.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Dot, re: /\./y },
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
				},
				{
					type: SqlTokenType.Identifier,
					re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
				{ type: SqlTokenType.Error, re: /./y },
			],
			options,
		);

		const compileOptions = new Set(options.compileOptions || []);
		if (!compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS")) {
			this.reserved.add(SqlKeyword.ALWAYS);
			this.reserved.add(SqlKeyword.GENERATED);
		}
		if (!compileOptions.has("SQLITE_OMIT_WINDOWFUNC")) {
			this.reserved.add(SqlKeyword.CURRENT);
			this.reserved.add(SqlKeyword.EXCLUDE);
			this.reserved.add(SqlKeyword.FOLLOWING);
			this.reserved.add(SqlKeyword.GROUPS);
			this.reserved.add(SqlKeyword.OTHERS);
			this.reserved.add(SqlKeyword.PARTITION);
			this.reserved.add(SqlKeyword.PRECEDING);
			this.reserved.add(SqlKeyword.RANGE);
			this.reserved.add(SqlKeyword.TIES);
			this.reserved.add(SqlKeyword.UNBOUNDED);
		}
		if (!compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT")) {
			this.reserved.add(SqlKeyword.EXCEPT);
			this.reserved.add(SqlKeyword.INTERSECT);
			this.reserved.add(SqlKeyword.UNION);
		}
	}

	isReserved(keyword?: Keyword) {
		return (
			keyword != null &&
			(ReservedSet.has(keyword) || this.reserved.has(keyword))
		);
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

				if (type === SqlTokenType.WhiteSpace || type === SqlTokenType.LineBreak) {
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
		const keyword = SqlKeyword.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (this.isReserved(keyword)) {
				token.type = SqlTokenType.Reserved;
			}

			if (state.mode === Mode.SQL_START) {
				if (keyword === SqlKeyword.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				Sqlite3Lexer.isObjectStart(keyword)
			) {
				if (keyword === SqlKeyword.TRIGGER) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (keyword === SqlKeyword.BEGIN) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: keyword }];
				}
			} else if (state.mode === Mode.SQL_PROC_BODY) {
				const ctx = state.stack[state.stack.length - 1];
				if (ctx.isSentenceStart) {
					if (keyword === SqlKeyword.END) {
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
