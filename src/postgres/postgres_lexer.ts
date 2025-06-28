import {
	type Keyword,
	type LexerOptions,
	SourceLocation,
	Token,
} from "elder-parse";
import { SqlLexer } from "../sql.ts";

const DefaultReservedSet = new Set([
	SqlLexer.ALL,
	SqlLexer.ANALYSE,
	SqlLexer.ANALYZE,
	SqlLexer.AND,
	SqlLexer.ANY,
	SqlLexer.ARRAY,
	SqlLexer.AS,
	SqlLexer.ASC,
	SqlLexer.ASYMMETRIC,
	SqlLexer.BOTH,
	SqlLexer.CASE,
	SqlLexer.CAST,
	SqlLexer.CHECK,
	SqlLexer.COLLATE,
	SqlLexer.COLUMN,
	SqlLexer.CONSTRAINT,
	SqlLexer.CREATE,
	SqlLexer.CURRENT_CATALOG,
	SqlLexer.CURRENT_DATE,
	SqlLexer.CURRENT_ROLE,
	SqlLexer.CURRENT_TIME,
	SqlLexer.CURRENT_TIMESTAMP,
	SqlLexer.CURRENT_USER,
	SqlLexer.DEFAULT,
	SqlLexer.DEFERRABLE,
	SqlLexer.DESC,
	SqlLexer.DISTINCT,
	SqlLexer.DO,
	SqlLexer.ELSE,
	SqlLexer.END,
	SqlLexer.EXCEPT,
	SqlLexer.FALSE,
	SqlLexer.FETCH,
	SqlLexer.FOR,
	SqlLexer.FOREIGN,
	SqlLexer.FROM,
	SqlLexer.GRANT,
	SqlLexer.GROUP,
	SqlLexer.HAVING,
	SqlLexer.IN,
	SqlLexer.INITIALLY,
	SqlLexer.INTERSECT,
	SqlLexer.INTO,
	SqlLexer.LATERAL,
	SqlLexer.LEADING,
	SqlLexer.LIMIT,
	SqlLexer.LOCALTIME,
	SqlLexer.LOCALTIMESTAMP,
	SqlLexer.NOT,
	SqlLexer.NULL,
	SqlLexer.OFFSET,
	SqlLexer.ON,
	SqlLexer.ONLY,
	SqlLexer.OR,
	SqlLexer.ORDER,
	SqlLexer.PLACING,
	SqlLexer.PRIMARY,
	SqlLexer.REFERENCES,
	SqlLexer.RETURNING,
	SqlLexer.SELECT,
	SqlLexer.SESSION_USER,
	SqlLexer.SOME,
	SqlLexer.SYMMETRIC,
	SqlLexer.TABLE,
	SqlLexer.THEN,
	SqlLexer.TO,
	SqlLexer.TRAILING,
	SqlLexer.TRUE,
	SqlLexer.UNION,
	SqlLexer.UNIQUE,
	SqlLexer.USER,
	SqlLexer.USING,
	SqlLexer.VARIADIC,
	SqlLexer.WHEN,
	SqlLexer.WHERE,
	SqlLexer.WINDOW,
	SqlLexer.WITH,
]);

const ObjectStartSet = new Set([
	SqlLexer.ACCESS,
	SqlLexer.AGGREGATE,
	SqlLexer.CAST,
	SqlLexer.COLLATION,
	SqlLexer.CONVERSION,
	SqlLexer.DATABASE,
	SqlLexer.DEFAULT,
	SqlLexer.DOMAIN,
	SqlLexer.EVENT,
	SqlLexer.EXTENSION,
	SqlLexer.FOREIGN,
	SqlLexer.FUNCTION,
	SqlLexer.GROUP,
	SqlLexer.INDEX,
	SqlLexer.LANGUAGE,
	SqlLexer.LARGE,
	SqlLexer.MATERIALIZED,
	SqlLexer.OPERATOR,
	SqlLexer.POLICY,
	SqlLexer.PROCEDURE,
	SqlLexer.PUBLICATION,
	SqlLexer.ROLE,
	SqlLexer.ROUTINE,
	SqlLexer.RULE,
	SqlLexer.SCHEMA,
	SqlLexer.SEQUENCE,
	SqlLexer.SERVER,
	SqlLexer.STATISTICS,
	SqlLexer.SUBSCRIPTION,
	SqlLexer.SYSTEM,
	SqlLexer.TABLE,
	SqlLexer.TABLESPACE,
	SqlLexer.TEXT,
	SqlLexer.TRANSFORM,
	SqlLexer.TRIGGER,
	SqlLexer.TYPE,
	SqlLexer.USER,
	SqlLexer.VIEW,
]);

const Mode = {
	INITIAL: 0,
	SQL_START: 1,
	SQL_OBJECT_DEF: 2,
	SQL_PROC_DEF: 3,
	SQL_PROC_BODY: 4,
	SQL_PART: Number.MAX_SAFE_INTEGER,
} as const;

export declare type PostgresLexerOptions = LexerOptions;

export class PostgresLexer extends SqlLexer {
	constructor(options: PostgresLexerOptions = {}) {
		super(
			"postgres",
			[
				{ type: SqlLexer.HintComment, re: /\/\*\+.*?\*\//sy },
				{
					type: SqlLexer.BlockComment,
					re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy,
				},
				{ type: SqlLexer.LineComment, re: /--.*/y },
				{
					type: SqlLexer.LineBreak,
					re: /\n|\r\n?/y,
				},
				{ type: SqlLexer.WhiteSpace, re: /[ \t]+/y },
				{
					type: SqlLexer.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n])\\.+(\n|\r\n?|$)/y
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
				{ type: SqlLexer.LeftBracket, re: /\[/y },
				{ type: SqlLexer.RightBracket, re: /\]/y },
				{
					type: SqlLexer.Label,
					re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y,
				},
				{ type: SqlLexer.Blob, re: /'\\x([^']|'')*'/y },
				{ type: SqlLexer.String, re: /([uU]&|[bBxX])?'([^']|'')*'/y },
				{ type: SqlLexer.String, re: /\$([^$]*)\$.*?\$\1\$/sy },
				{ type: SqlLexer.Identifier, re: /([uU]&)?"([^"]|"")*"/y },
				{ type: SqlLexer.BindVariable, re: /\?/y },
				{ type: SqlLexer.BindVariable, re: /\$([1-9][0-9]*)?/y },
				{
					type: SqlLexer.BindVariable,
					re: /:[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlLexer.Operator,
					re: /::|[*/<>=~!@#%^&|`?+-]+/y,
				},
				{
					type: SqlLexer.Identifier,
					re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);
	}

	isReserved(keyword: Keyword) {
		return keyword.reserved || DefaultReservedSet.has(keyword);
	}

	protected initState(state: Record<string, any>) {
		state.mode = Mode.INITIAL;
	}

	private onMatchCommand(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;

		const tokens = [];
		let location = token.location;

		const re =
			/(\n|\r\n?)|([ \t]+)|("[^"]*"|'[^']*'|`[^`]*`)|([^ \t\r\n"'`]+)/y;
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
				} else if (
					token.keyword === SqlLexer.DECLARE ||
					token.keyword === SqlLexer.BEGIN
				) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: token.keyword }];
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				ObjectStartSet.has(token.keyword)
			) {
				if (
					token.keyword === SqlLexer.FUNCTION ||
					token.keyword === SqlLexer.PROCEDURE
				) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (
					state.last === SqlLexer.BEGIN &&
					token.keyword === SqlLexer.ATOMIC
				) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: state.last }];
					delete state.last;
				} else {
					state.last = token.keyword;
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
					} else if (
						token.keyword === SqlLexer.IF ||
						token.keyword === SqlLexer.CASE ||
						token.keyword === SqlLexer.WHILE ||
						token.keyword === SqlLexer.FOR
					) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: false, type: token.keyword });
					} else if (token.keyword === SqlLexer.LOOP) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: true, type: token.keyword });
					} else {
						ctx.isSentenceStart = false;
					}
				} else if (
					token.keyword === SqlLexer.THEN ||
					token.keyword === SqlLexer.ELSE
				) {
					if (ctx.type === SqlLexer.IF || ctx.type === SqlLexer.CASE) {
						ctx.isSentenceStart = true;
					}
				} else if (token.keyword === SqlLexer.LOOP) {
					if (ctx.type === SqlLexer.WHILE || ctx.type === SqlLexer.FOR) {
						ctx.isSentenceStart = true;
					}
				}
			}
		}
	}
}
