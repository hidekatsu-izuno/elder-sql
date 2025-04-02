import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
	TokenType,
} from "../lexer.ts";
import { SqlKeywords, SqlTokenType } from "../sql.ts";

const keywords = new SqlKeywords();
keywords.options(SqlKeywords.ALL).reserved = true;
keywords.options(SqlKeywords.ANALYSE).reserved = true;
keywords.options(SqlKeywords.ANALYZE).reserved = true;
keywords.options(SqlKeywords.AND).reserved = true;
keywords.options(SqlKeywords.ANY).reserved = true;
keywords.options(SqlKeywords.ARRAY).reserved = true;
keywords.options(SqlKeywords.AS).reserved = true;
keywords.options(SqlKeywords.ASC).reserved = true;
keywords.options(SqlKeywords.ASYMMETRIC).reserved = true;
keywords.options(SqlKeywords.BOTH).reserved = true;
keywords.options(SqlKeywords.CASE).reserved = true;
keywords.options(SqlKeywords.CAST).reserved = true;
keywords.options(SqlKeywords.CHECK).reserved = true;
keywords.options(SqlKeywords.COLLATE).reserved = true;
keywords.options(SqlKeywords.COLUMN).reserved = true;
keywords.options(SqlKeywords.CONSTRAINT).reserved = true;
keywords.options(SqlKeywords.CREATE).reserved = true;
keywords.options(SqlKeywords.CURRENT_CATALOG).reserved = true;
keywords.options(SqlKeywords.CURRENT_DATE).reserved = true;
keywords.options(SqlKeywords.CURRENT_ROLE).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIME).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIMESTAMP).reserved = true;
keywords.options(SqlKeywords.CURRENT_USER).reserved = true;
keywords.options(SqlKeywords.DEFAULT).reserved = true;
keywords.options(SqlKeywords.DEFERRABLE).reserved = true;
keywords.options(SqlKeywords.DESC).reserved = true;
keywords.options(SqlKeywords.DISTINCT).reserved = true;
keywords.options(SqlKeywords.DO).reserved = true;
keywords.options(SqlKeywords.ELSE).reserved = true;
keywords.options(SqlKeywords.END).reserved = true;
keywords.options(SqlKeywords.EXCEPT).reserved = true;
keywords.options(SqlKeywords.FALSE).reserved = true;
keywords.options(SqlKeywords.FETCH).reserved = true;
keywords.options(SqlKeywords.FOR).reserved = true;
keywords.options(SqlKeywords.FOREIGN).reserved = true;
keywords.options(SqlKeywords.FROM).reserved = true;
keywords.options(SqlKeywords.GRANT).reserved = true;
keywords.options(SqlKeywords.GROUP).reserved = true;
keywords.options(SqlKeywords.HAVING).reserved = true;
keywords.options(SqlKeywords.IN).reserved = true;
keywords.options(SqlKeywords.INITIALLY).reserved = true;
keywords.options(SqlKeywords.INTERSECT).reserved = true;
keywords.options(SqlKeywords.INTO).reserved = true;
keywords.options(SqlKeywords.LATERAL).reserved = true;
keywords.options(SqlKeywords.LEADING).reserved = true;
keywords.options(SqlKeywords.LIMIT).reserved = true;
keywords.options(SqlKeywords.LOCALTIME).reserved = true;
keywords.options(SqlKeywords.LOCALTIMESTAMP).reserved = true;
keywords.options(SqlKeywords.NOT).reserved = true;
keywords.options(SqlKeywords.NULL).reserved = true;
keywords.options(SqlKeywords.OFFSET).reserved = true;
keywords.options(SqlKeywords.ON).reserved = true;
keywords.options(SqlKeywords.ONLY).reserved = true;
keywords.options(SqlKeywords.OR).reserved = true;
keywords.options(SqlKeywords.ORDER).reserved = true;
keywords.options(SqlKeywords.PLACING).reserved = true;
keywords.options(SqlKeywords.PRIMARY).reserved = true;
keywords.options(SqlKeywords.REFERENCES).reserved = true;
keywords.options(SqlKeywords.RETURNING).reserved = true;
keywords.options(SqlKeywords.SELECT).reserved = true;
keywords.options(SqlKeywords.SESSION_USER).reserved = true;
keywords.options(SqlKeywords.SOME).reserved = true;
keywords.options(SqlKeywords.SYMMETRIC).reserved = true;
keywords.options(SqlKeywords.TABLE).reserved = true;
keywords.options(SqlKeywords.THEN).reserved = true;
keywords.options(SqlKeywords.TO).reserved = true;
keywords.options(SqlKeywords.TRAILING).reserved = true;
keywords.options(SqlKeywords.TRUE).reserved = true;
keywords.options(SqlKeywords.UNION).reserved = true;
keywords.options(SqlKeywords.UNIQUE).reserved = true;
keywords.options(SqlKeywords.USER).reserved = true;
keywords.options(SqlKeywords.USING).reserved = true;
keywords.options(SqlKeywords.VARIADIC).reserved = true;
keywords.options(SqlKeywords.WHEN).reserved = true;
keywords.options(SqlKeywords.WHERE).reserved = true;
keywords.options(SqlKeywords.WINDOW).reserved = true;
keywords.options(SqlKeywords.WITH).reserved = true;

keywords.options(SqlKeywords.ACCESS).objectStart = true;
keywords.options(SqlKeywords.AGGREGATE).objectStart = true;
keywords.options(SqlKeywords.CAST).objectStart = true;
keywords.options(SqlKeywords.COLLATION).objectStart = true;
keywords.options(SqlKeywords.CONVERSION).objectStart = true;
keywords.options(SqlKeywords.DATABASE).objectStart = true;
keywords.options(SqlKeywords.DEFAULT).objectStart = true;
keywords.options(SqlKeywords.DOMAIN).objectStart = true;
keywords.options(SqlKeywords.EVENT).objectStart = true;
keywords.options(SqlKeywords.EXTENSION).objectStart = true;
keywords.options(SqlKeywords.FOREIGN).objectStart = true;
keywords.options(SqlKeywords.FUNCTION).objectStart = true;
keywords.options(SqlKeywords.GROUP).objectStart = true;
keywords.options(SqlKeywords.INDEX).objectStart = true;
keywords.options(SqlKeywords.LANGUAGE).objectStart = true;
keywords.options(SqlKeywords.LARGE).objectStart = true;
keywords.options(SqlKeywords.MATERIALIZED).objectStart = true;
keywords.options(SqlKeywords.OPERATOR).objectStart = true;
keywords.options(SqlKeywords.POLICY).objectStart = true;
keywords.options(SqlKeywords.PROCEDURE).objectStart = true;
keywords.options(SqlKeywords.PUBLICATION).objectStart = true;
keywords.options(SqlKeywords.ROLE).objectStart = true;
keywords.options(SqlKeywords.ROUTINE).objectStart = true;
keywords.options(SqlKeywords.RULE).objectStart = true;
keywords.options(SqlKeywords.SCHEMA).objectStart = true;
keywords.options(SqlKeywords.SEQUENCE).objectStart = true;
keywords.options(SqlKeywords.SERVER).objectStart = true;
keywords.options(SqlKeywords.STATISTICS).objectStart = true;
keywords.options(SqlKeywords.SUBSCRIPTION).objectStart = true;
keywords.options(SqlKeywords.SYSTEM).objectStart = true;
keywords.options(SqlKeywords.TABLE).objectStart = true;
keywords.options(SqlKeywords.TABLESPACE).objectStart = true;
keywords.options(SqlKeywords.TEXT).objectStart = true;
keywords.options(SqlKeywords.TRANSFORM).objectStart = true;
keywords.options(SqlKeywords.TRIGGER).objectStart = true;
keywords.options(SqlKeywords.TYPE).objectStart = true;
keywords.options(SqlKeywords.USER).objectStart = true;
keywords.options(SqlKeywords.VIEW).objectStart = true;

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

		if (!this.options.keywords) {
			this.options.keywords = keywords;
		}
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
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				if (token.keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					token.keyword === SqlKeywords.DECLARE ||
					token.keyword === SqlKeywords.BEGIN
				) {
					state.mode = Mode.SQL_PROC_BODY;
					state.stack = [{ isSentenceStart: true, type: token.keyword }];
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				this.options.keywords?.options(token.keyword).objectStart
			) {
				if (
					token.keyword === SqlKeywords.FUNCTION ||
					token.keyword === SqlKeywords.PROCEDURE
				) {
					state.mode = Mode.SQL_PROC_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (state.mode === Mode.SQL_PROC_DEF) {
				if (
					state.last === SqlKeywords.BEGIN &&
					token.keyword === SqlKeywords.ATOMIC
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
					if (token.keyword === SqlKeywords.END) {
						state.stack.pop();
						if (state.stack.length === 0) {
							state.mode = Mode.SQL_PART;
							delete state.stack;
						}
					} else if (
						token.keyword === SqlKeywords.IF ||
						token.keyword === SqlKeywords.CASE ||
						token.keyword === SqlKeywords.WHILE ||
						token.keyword === SqlKeywords.FOR
					) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: false, type: token.keyword });
					} else if (token.keyword === SqlKeywords.LOOP) {
						ctx.isSentenceStart = false;
						state.stack.push({ isSentenceStart: true, type: token.keyword });
					} else {
						ctx.isSentenceStart = false;
					}
				} else if (
					token.keyword === SqlKeywords.THEN ||
					token.keyword === SqlKeywords.ELSE
				) {
					if (ctx.type === SqlKeywords.IF || ctx.type === SqlKeywords.CASE) {
						ctx.isSentenceStart = true;
					}
				} else if (token.keyword === SqlKeywords.LOOP) {
					if (ctx.type === SqlKeywords.WHILE || ctx.type === SqlKeywords.FOR) {
						ctx.isSentenceStart = true;
					}
				}
			}
		}
	}
}
