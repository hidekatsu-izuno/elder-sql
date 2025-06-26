import type { Keyword, LexerOptions } from "elder-parse";
import { SourceLocation, Token } from "elder-parse";
import { SqlLexer } from "../sql.ts";

const DefaultReservedSet = new Set([
	SqlLexer.ADD,
	SqlLexer.ALL,
	SqlLexer.ALTER,
	SqlLexer.AND,
	SqlLexer.AS,
	SqlLexer.AUTOINCREMENT,
	SqlLexer.BETWEEN,
	SqlLexer.CASE,
	SqlLexer.CHECK,
	SqlLexer.COLLATE,
	SqlLexer.COMMIT,
	SqlLexer.CONSTRAINT,
	SqlLexer.CREATE,
	SqlLexer.CROSS,
	SqlLexer.CURRENT_DATE,
	SqlLexer.CURRENT_TIME,
	SqlLexer.CURRENT_TIMESTAMP,
	SqlLexer.DEFAULT,
	SqlLexer.DEFERRABLE,
	SqlLexer.DELETE,
	SqlLexer.DISTINCT,
	SqlLexer.ELSE,
	SqlLexer.ESCAPE,
	SqlLexer.EXISTS,
	SqlLexer.FILTER,
	SqlLexer.FOREIGN,
	SqlLexer.FROM,
	SqlLexer.GLOB,
	SqlLexer.GROUP,
	SqlLexer.HAVING,
	SqlLexer.IN,
	SqlLexer.INDEX,
	SqlLexer.INDEXED,
	SqlLexer.INNER,
	SqlLexer.INSERT,
	SqlLexer.INTO,
	SqlLexer.IS,
	SqlLexer.ISNULL,
	SqlLexer.JOIN,
	SqlLexer.LEFT,
	SqlLexer.LIMIT,
	SqlLexer.NATURAL,
	SqlLexer.NOT,
	SqlLexer.NOTHING,
	SqlLexer.NOTNULL,
	SqlLexer.NULL,
	SqlLexer.ON,
	SqlLexer.OR,
	SqlLexer.ORDER,
	SqlLexer.PRIMARY,
	SqlLexer.OUTER,
	SqlLexer.OVER,
	SqlLexer.REFERENCES,
	SqlLexer.REGEXP,
	SqlLexer.RETURNING,
	SqlLexer.RIGHT,
	SqlLexer.SELECT,
	SqlLexer.SET,
	SqlLexer.TABLE,
	SqlLexer.TEMPORARY,
	SqlLexer.THEN,
	SqlLexer.TO,
	SqlLexer.TRANSACTION,
	SqlLexer.UNIQUE,
	SqlLexer.UPDATE,
	SqlLexer.USING,
	SqlLexer.VALUES,
	SqlLexer.WHEN,
	SqlLexer.WHERE,
	SqlLexer.WINDOW,
]);

const ObjectStartSet = new Set([
	SqlLexer.TABLE,
	SqlLexer.VIEW,
	SqlLexer.TRIGGER,
	SqlLexer.INDEX,
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

export class Sqlite3Lexer extends SqlLexer {
	private reservedSet = new Set<Keyword>();

	constructor(options: Sqlite3LexerOptions = {}) {
		super(
			"sqlite3",
			[
				{ type: SqlLexer.BlockComment, re: /\/\*.*?\*\//sy },
				{ type: SqlLexer.LineComment, re: /--.*/y },
				{
					type: SqlLexer.LineBreak,
					re: /\n|\r\n?/y,
				},
				{ type: SqlLexer.WhiteSpace, re: /[ \t\f]+/y },
				{
					type: SqlLexer.Delimiter,
					re: /(?<=^|[\r\n])([/]|GO)[ \t\f]*(\n|\r\n?|$)/iy,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlLexer.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n])\..+(\n|\r\n?|$)/y
							: false,
					onMatch: (state, token) => this.onMatchCommand(state, token),
					onUnmatch: (state) => this.onUnmatchCommand(state),
				},
				{
					type: SqlLexer.SemiColon,
					re: /;/y,
					onMatch: (state, token) => this.onMatchSemiColon(state, token),
				},
				{ type: SqlLexer.LeftBrace, re: /\{/y },
				{ type: SqlLexer.RightBrace, re: /\}/y },
				{ type: SqlLexer.LeftParen, re: /\(/y },
				{ type: SqlLexer.RightParen, re: /\)/y },
				{ type: SqlLexer.Comma, re: /,/y },
				{
					type: SqlLexer.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlLexer.Dot, re: /\./y },
				{ type: SqlLexer.Blob, re: /[Xx]'([^']|'')*'/y },
				{ type: SqlLexer.String, re: /'([^']|'')*'/y },
				{
					type: SqlLexer.Identifier,
					re: /("([^"]|"")*"|`([^`]|``)*`|\[[^\]]*\])/y,
				},
				{ type: SqlLexer.BindVariable, re: /\?([1-9][0-9]*)?/y },
				{
					type: SqlLexer.BindVariable,
					re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlLexer.Operator,
					re: /\|\||<<|>>|<>|->>?|[=<>!]=?|[~&|*/%+-]/y,
				},
				{
					type: SqlLexer.Identifier,
					re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);

		const compileOptions = new Set(options.compileOptions || []);
		if (!compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS")) {
			this.reservedSet.add(SqlLexer.ALWAYS);
			this.reservedSet.add(SqlLexer.GENERATED);
		}
		if (!compileOptions.has("SQLITE_OMIT_WINDOWFUNC")) {
			this.reservedSet.add(SqlLexer.CURRENT);
			this.reservedSet.add(SqlLexer.EXCLUDE);
			this.reservedSet.add(SqlLexer.FOLLOWING);
			this.reservedSet.add(SqlLexer.GROUPS);
			this.reservedSet.add(SqlLexer.OTHERS);
			this.reservedSet.add(SqlLexer.PARTITION);
			this.reservedSet.add(SqlLexer.PRECEDING);
			this.reservedSet.add(SqlLexer.RANGE);
			this.reservedSet.add(SqlLexer.TIES);
			this.reservedSet.add(SqlLexer.UNBOUNDED);
		}
		if (!compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT")) {
			this.reservedSet.add(SqlLexer.EXCEPT);
			this.reservedSet.add(SqlLexer.INTERSECT);
			this.reservedSet.add(SqlLexer.UNION);
		}
	}

	reserved(keyword: Keyword) {
		return (
			keyword.reserved ||
			DefaultReservedSet.has(keyword) ||
			this.reservedSet.has(keyword)
		);
	}

	protected initState(state: Record<string, any>): void {
		state.mode = Mode.INITIAL;
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;

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
					new Token(SqlLexer.WhiteSpace, m[2], {
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
					new Token(SqlLexer.LineBreak, m[3], {
						location,
					}),
				);
			}
		}

		return [token, new Token(SqlLexer.EoS, "")];
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
					? SqlLexer.LineBreak
					: m[2]
						? SqlLexer.WhiteSpace
						: m[3]
							? SqlLexer.String
							: pos === 0
								? SqlLexer.Command
								: SqlLexer.Identifier;

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

				if (type === SqlLexer.WhiteSpace || type === SqlLexer.LineBreak) {
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
		tokens.push(new Token(SqlLexer.EoS, ""));

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
			return [token, new Token(SqlLexer.EoS, "")];
		}
	}

	private onMatchIdentifier(state: Record<string, any>, token: Token) {
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				if (token.keyword === SqlLexer.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				ObjectStartSet.has(token.keyword)
			) {
				if (token.keyword === SqlLexer.TRIGGER) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (token.keyword === SqlLexer.BEGIN) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: token.keyword }];
				}
			} else if (state.mode === Mode.SQL_PROC_BODY) {
				const ctx = state.stack[state.stack.length - 1];
				if (ctx.isSentenceStart) {
					if (token.keyword === SqlLexer.END) {
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
