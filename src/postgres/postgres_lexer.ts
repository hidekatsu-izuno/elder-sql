import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
	TokenType,
} from "../lexer.js";
import { SqlKeywords, SqlTokenType } from "../sql.js";

const ObjectStartSet = new Set<Keyword>([
	SqlKeywords.ACCESS,
	SqlKeywords.AGGREGATE,
	SqlKeywords.CAST,
	SqlKeywords.COLLATION,
	SqlKeywords.CONVERSION,
	SqlKeywords.DATABASE,
	SqlKeywords.DEFAULT,
	SqlKeywords.DOMAIN,
	SqlKeywords.EVENT,
	SqlKeywords.EXTENSION,
	SqlKeywords.FOREIGN,
	SqlKeywords.FUNCTION,
	SqlKeywords.GROUP,
	SqlKeywords.INDEX,
	SqlKeywords.LANGUAGE,
	SqlKeywords.LARGE,
	SqlKeywords.MATERIALIZED,
	SqlKeywords.OPERATOR,
	SqlKeywords.POLICY,
	SqlKeywords.PROCEDURE,
	SqlKeywords.PUBLICATION,
	SqlKeywords.ROLE,
	SqlKeywords.ROUTINE,
	SqlKeywords.RULE,
	SqlKeywords.SCHEMA,
	SqlKeywords.SEQUENCE,
	SqlKeywords.SERVER,
	SqlKeywords.STATISTICS,
	SqlKeywords.SUBSCRIPTION,
	SqlKeywords.SYSTEM,
	SqlKeywords.TABLE,
	SqlKeywords.TABLESPACE,
	SqlKeywords.TEXT,
	SqlKeywords.TRANSFORM,
	SqlKeywords.TRIGGER,
	SqlKeywords.TYPE,
	SqlKeywords.USER,
	SqlKeywords.VIEW,
]);

const ReservedSet = new Set<Keyword>([
	SqlKeywords.ALL,
	SqlKeywords.ANALYSE,
	SqlKeywords.ANALYZE,
	SqlKeywords.AND,
	SqlKeywords.ANY,
	SqlKeywords.ARRAY,
	SqlKeywords.AS,
	SqlKeywords.ASC,
	SqlKeywords.ASYMMETRIC,
	SqlKeywords.BOTH,
	SqlKeywords.CASE,
	SqlKeywords.CAST,
	SqlKeywords.CHECK,
	SqlKeywords.COLLATE,
	SqlKeywords.COLUMN,
	SqlKeywords.CONSTRAINT,
	SqlKeywords.CREATE,
	SqlKeywords.CURRENT_CATALOG,
	SqlKeywords.CURRENT_DATE,
	SqlKeywords.CURRENT_ROLE,
	SqlKeywords.CURRENT_TIME,
	SqlKeywords.CURRENT_TIMESTAMP,
	SqlKeywords.CURRENT_USER,
	SqlKeywords.DEFAULT,
	SqlKeywords.DEFERRABLE,
	SqlKeywords.DESC,
	SqlKeywords.DISTINCT,
	SqlKeywords.DO,
	SqlKeywords.ELSE,
	SqlKeywords.END,
	SqlKeywords.EXCEPT,
	SqlKeywords.FALSE,
	SqlKeywords.FETCH,
	SqlKeywords.FOR,
	SqlKeywords.FOREIGN,
	SqlKeywords.FROM,
	SqlKeywords.GRANT,
	SqlKeywords.GROUP,
	SqlKeywords.HAVING,
	SqlKeywords.IN,
	SqlKeywords.INITIALLY,
	SqlKeywords.INTERSECT,
	SqlKeywords.INTO,
	SqlKeywords.LATERAL,
	SqlKeywords.LEADING,
	SqlKeywords.LIMIT,
	SqlKeywords.LOCALTIME,
	SqlKeywords.LOCALTIMESTAMP,
	SqlKeywords.NOT,
	SqlKeywords.NULL,
	SqlKeywords.OFFSET,
	SqlKeywords.ON,
	SqlKeywords.ONLY,
	SqlKeywords.OR,
	SqlKeywords.ORDER,
	SqlKeywords.PLACING,
	SqlKeywords.PRIMARY,
	SqlKeywords.REFERENCES,
	SqlKeywords.RETURNING,
	SqlKeywords.SELECT,
	SqlKeywords.SESSION_USER,
	SqlKeywords.SOME,
	SqlKeywords.SYMMETRIC,
	SqlKeywords.TABLE,
	SqlKeywords.THEN,
	SqlKeywords.TO,
	SqlKeywords.TRAILING,
	SqlKeywords.TRUE,
	SqlKeywords.UNION,
	SqlKeywords.UNIQUE,
	SqlKeywords.USER,
	SqlKeywords.USING,
	SqlKeywords.VARIADIC,
	SqlKeywords.WHEN,
	SqlKeywords.WHERE,
	SqlKeywords.WINDOW,
	SqlKeywords.WITH,
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
				{
					type: SqlTokenType.LineBreak,
					re: /\n|\r\n?/y,
					skip: true,
					separator: true,
				},
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
				{ type: SqlTokenType.LeftBracket, re: /\[/y, separator: true },
				{ type: SqlTokenType.RightBracket, re: /\]/y, separator: true },
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
				{
					type: SqlTokenType.Operator,
					re: /::|[*/<>=~!@#%^&|`?+-]+/y,
					separator: true,
				},
				{
					type: SqlTokenType.Identifier,
					re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
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
		const keyword = SqlKeywords.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (ReservedSet.has(keyword) || this.reserved.has(keyword)) {
				token.type = SqlTokenType.Reserved;
			}
			if (state.mode === Mode.SQL_START) {
				if (keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					keyword === SqlKeywords.DECLARE ||
					keyword === SqlKeywords.BEGIN
				) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: keyword }];
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				(keyword === SqlKeywords.ACCESS ||
					keyword === SqlKeywords.AGGREGATE ||
					keyword === SqlKeywords.CAST ||
					keyword === SqlKeywords.COLLATION ||
					keyword === SqlKeywords.CONVERSION ||
					keyword === SqlKeywords.DATABASE ||
					keyword === SqlKeywords.DEFAULT ||
					keyword === SqlKeywords.DOMAIN ||
					keyword === SqlKeywords.EVENT ||
					keyword === SqlKeywords.EXTENSION ||
					keyword === SqlKeywords.FOREIGN ||
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.GROUP ||
					keyword === SqlKeywords.INDEX ||
					keyword === SqlKeywords.LANGUAGE ||
					keyword === SqlKeywords.LARGE ||
					keyword === SqlKeywords.MATERIALIZED ||
					keyword === SqlKeywords.OPERATOR ||
					keyword === SqlKeywords.POLICY ||
					keyword === SqlKeywords.PROCEDURE ||
					keyword === SqlKeywords.PUBLICATION ||
					keyword === SqlKeywords.ROLE ||
					keyword === SqlKeywords.ROUTINE ||
					keyword === SqlKeywords.RULE ||
					keyword === SqlKeywords.SCHEMA ||
					keyword === SqlKeywords.SEQUENCE ||
					keyword === SqlKeywords.SERVER ||
					keyword === SqlKeywords.STATISTICS ||
					keyword === SqlKeywords.SUBSCRIPTION ||
					keyword === SqlKeywords.SYSTEM ||
					keyword === SqlKeywords.TABLE ||
					keyword === SqlKeywords.TABLESPACE ||
					keyword === SqlKeywords.TEXT ||
					keyword === SqlKeywords.TRANSFORM ||
					keyword === SqlKeywords.TRIGGER ||
					keyword === SqlKeywords.TYPE ||
					keyword === SqlKeywords.USER ||
					keyword === SqlKeywords.VIEW)
			) {
				if (
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.PROCEDURE
				) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (
					state.last === SqlKeywords.BEGIN &&
					keyword === SqlKeywords.ATOMIC
				) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: state.last }];
					delete state.last;
				} else {
					state.last = keyword;
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
					} else if (
						keyword === SqlKeywords.IF ||
						keyword === SqlKeywords.CASE ||
						keyword === SqlKeywords.WHILE ||
						keyword === SqlKeywords.FOR
					) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: false, type: keyword });
					} else if (keyword === SqlKeywords.LOOP) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: true, type: keyword });
					} else {
						ctx.isSentenceStart = false;
					}
				} else if (
					keyword === SqlKeywords.THEN ||
					keyword === SqlKeywords.ELSE
				) {
					if (ctx.type === SqlKeywords.IF || ctx.type === SqlKeywords.CASE) {
						ctx.isSentenceStart = true;
					}
				} else if (keyword === SqlKeywords.LOOP) {
					if (ctx.type === SqlKeywords.WHILE || ctx.type === SqlKeywords.FOR) {
						ctx.isSentenceStart = true;
					}
				}
			}
		}
	}
}
