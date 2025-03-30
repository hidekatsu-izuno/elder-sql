import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
	TokenType,
} from "../lexer.js";
import { SqlKeyword, SqlTokenType } from "../sql.js";

const ObjectStartSet = new Set<Keyword>([
	SqlKeyword.ACCESS,
	SqlKeyword.AGGREGATE,
	SqlKeyword.CAST,
	SqlKeyword.COLLATION,
	SqlKeyword.CONVERSION,
	SqlKeyword.DATABASE,
	SqlKeyword.DEFAULT,
	SqlKeyword.DOMAIN,
	SqlKeyword.EVENT,
	SqlKeyword.EXTENSION,
	SqlKeyword.FOREIGN,
	SqlKeyword.FUNCTION,
	SqlKeyword.GROUP,
	SqlKeyword.INDEX,
	SqlKeyword.LANGUAGE,
	SqlKeyword.LARGE,
	SqlKeyword.MATERIALIZED,
	SqlKeyword.OPERATOR,
	SqlKeyword.POLICY,
	SqlKeyword.PROCEDURE,
	SqlKeyword.PUBLICATION,
	SqlKeyword.ROLE,
	SqlKeyword.ROUTINE,
	SqlKeyword.RULE,
	SqlKeyword.SCHEMA,
	SqlKeyword.SEQUENCE,
	SqlKeyword.SERVER,
	SqlKeyword.STATISTICS,
	SqlKeyword.SUBSCRIPTION,
	SqlKeyword.SYSTEM,
	SqlKeyword.TABLE,
	SqlKeyword.TABLESPACE,
	SqlKeyword.TEXT,
	SqlKeyword.TRANSFORM,
	SqlKeyword.TRIGGER,
	SqlKeyword.TYPE,
	SqlKeyword.USER,
	SqlKeyword.VIEW,
]);

const ReservedSet = new Set<Keyword>([
	SqlKeyword.ALL,
	SqlKeyword.ANALYSE,
	SqlKeyword.ANALYZE,
	SqlKeyword.AND,
	SqlKeyword.ANY,
	SqlKeyword.ARRAY,
	SqlKeyword.AS,
	SqlKeyword.ASC,
	SqlKeyword.ASYMMETRIC,
	SqlKeyword.BOTH,
	SqlKeyword.CASE,
	SqlKeyword.CAST,
	SqlKeyword.CHECK,
	SqlKeyword.COLLATE,
	SqlKeyword.COLUMN,
	SqlKeyword.CONSTRAINT,
	SqlKeyword.CREATE,
	SqlKeyword.CURRENT_CATALOG,
	SqlKeyword.CURRENT_DATE,
	SqlKeyword.CURRENT_ROLE,
	SqlKeyword.CURRENT_TIME,
	SqlKeyword.CURRENT_TIMESTAMP,
	SqlKeyword.CURRENT_USER,
	SqlKeyword.DEFAULT,
	SqlKeyword.DEFERRABLE,
	SqlKeyword.DESC,
	SqlKeyword.DISTINCT,
	SqlKeyword.DO,
	SqlKeyword.ELSE,
	SqlKeyword.END,
	SqlKeyword.EXCEPT,
	SqlKeyword.FALSE,
	SqlKeyword.FETCH,
	SqlKeyword.FOR,
	SqlKeyword.FOREIGN,
	SqlKeyword.FROM,
	SqlKeyword.GRANT,
	SqlKeyword.GROUP,
	SqlKeyword.HAVING,
	SqlKeyword.IN,
	SqlKeyword.INITIALLY,
	SqlKeyword.INTERSECT,
	SqlKeyword.INTO,
	SqlKeyword.LATERAL,
	SqlKeyword.LEADING,
	SqlKeyword.LIMIT,
	SqlKeyword.LOCALTIME,
	SqlKeyword.LOCALTIMESTAMP,
	SqlKeyword.NOT,
	SqlKeyword.NULL,
	SqlKeyword.OFFSET,
	SqlKeyword.ON,
	SqlKeyword.ONLY,
	SqlKeyword.OR,
	SqlKeyword.ORDER,
	SqlKeyword.PLACING,
	SqlKeyword.PRIMARY,
	SqlKeyword.REFERENCES,
	SqlKeyword.RETURNING,
	SqlKeyword.SELECT,
	SqlKeyword.SESSION_USER,
	SqlKeyword.SOME,
	SqlKeyword.SYMMETRIC,
	SqlKeyword.TABLE,
	SqlKeyword.THEN,
	SqlKeyword.TO,
	SqlKeyword.TRAILING,
	SqlKeyword.TRUE,
	SqlKeyword.UNION,
	SqlKeyword.UNIQUE,
	SqlKeyword.USER,
	SqlKeyword.USING,
	SqlKeyword.VARIADIC,
	SqlKeyword.WHEN,
	SqlKeyword.WHERE,
	SqlKeyword.WINDOW,
	SqlKeyword.WITH,
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

export class PostgresLexer extends Lexer {
	static isObjectStart(keyword?: Keyword) {
		return keyword != null && ObjectStartSet.has(keyword);
	}

	private reserved = new Set<Keyword>();

	constructor(options: PostgresLexerOptions = {}) {
		super(
			"postgres",
			[
				{ type: SqlTokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
				{
					type: SqlTokenType.BlockComment,
					re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy,
					skip: true,
				},
				{ type: SqlTokenType.LineComment, re: /--.*/y, skip: true },
				{ type: SqlTokenType.LineBreak, re: /\n|\r\n?/y, skip: true },
				{ type: SqlTokenType.WhiteSpace, re: /[ \t]+/y, skip: true },
				{
					type: SqlTokenType.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n])\\.+(\n|\r\n?|$)/y
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
				{ type: SqlTokenType.LeftBracket, re: /\[/y },
				{ type: SqlTokenType.RightBracket, re: /\]/y },
				{
					type: SqlTokenType.Label,
					re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y,
				},
				{ type: SqlTokenType.Blob, re: /'\\x([^']|'')*'/y },
				{ type: SqlTokenType.String, re: /([uU]&|[bBxX])?'([^']|'')*'/y },
				{ type: SqlTokenType.String, re: /\$([^$]*)\$.*?\$\1\$/sy },
				{ type: SqlTokenType.Identifier, re: /([uU]&)?"([^"]|"")*"/y },
				{ type: SqlTokenType.BindVariable, re: /\?/y },
				{ type: SqlTokenType.BindVariable, re: /\$([1-9][0-9]*)?/y },
				{
					type: SqlTokenType.BindVariable,
					re: /:[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{ type: SqlTokenType.Operator, re: /::|[*/<>=~!@#%^&|`?+-]+/y },
				{
					type: SqlTokenType.Identifier,
					re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
				{ type: SqlTokenType.Error, re: /./y },
			],
			options,
		);
	}

	isReserved(keyword?: Keyword) {
		return (
			keyword != null &&
			(ReservedSet.has(keyword) || this.reserved.has(keyword))
		);
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
		tokens.push(new Token(SqlTokenType.EoF, "", { eos: true }));

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
				} else if (
					keyword === SqlKeyword.DECLARE ||
					keyword === SqlKeyword.BEGIN
				) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: keyword }];
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				PostgresLexer.isObjectStart(keyword)
			) {
				if (
					keyword === SqlKeyword.FUNCTION ||
					keyword === SqlKeyword.PROCEDURE
				) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (state.last === SqlKeyword.BEGIN && keyword === SqlKeyword.ATOMIC) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: state.last }];
					delete state.last;
				} else {
					state.last = keyword;
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
					} else if (
						keyword === SqlKeyword.IF ||
						keyword === SqlKeyword.CASE ||
						keyword === SqlKeyword.WHILE ||
						keyword === SqlKeyword.FOR
					) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: false, type: keyword });
					} else if (keyword === SqlKeyword.LOOP) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: true, type: keyword });
					} else {
						ctx.isSentenceStart = false;
					}
				} else if (keyword === SqlKeyword.THEN || keyword === SqlKeyword.ELSE) {
					if (ctx.type === SqlKeyword.IF || ctx.type === SqlKeyword.CASE) {
						ctx.isSentenceStart = true;
					}
				} else if (keyword === SqlKeyword.LOOP) {
					if (ctx.type === SqlKeyword.WHILE || ctx.type === SqlKeyword.FOR) {
						ctx.isSentenceStart = true;
					}
				}
			}
		}
	}
}
