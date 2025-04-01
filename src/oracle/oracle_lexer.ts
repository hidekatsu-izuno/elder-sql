import {
	Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
} from "../lexer.ts";
import { SqlKeywords, SqlTokenType } from "../sql.ts";

const keywords = new SqlKeywords();
keywords.options(SqlKeywords.ACCESS).reserved = true;
keywords.options(SqlKeywords.ADD).reserved = true;
keywords.options(SqlKeywords.ALL).reserved = true;
keywords.options(SqlKeywords.ALTER).reserved = true;
keywords.options(SqlKeywords.AND).reserved = true;
keywords.options(SqlKeywords.ANY).reserved = true;
keywords.options(SqlKeywords.AS).reserved = true;
keywords.options(SqlKeywords.ASC).reserved = true;
keywords.options(SqlKeywords.AT).reserved = true;
keywords.options(SqlKeywords.AUDIT).reserved = true;
keywords.options(SqlKeywords.BEGIN).reserved = true;
keywords.options(SqlKeywords.BETWEEN).reserved = true;
keywords.options(SqlKeywords.BY).reserved = true;
keywords.options(SqlKeywords.CASE).reserved = true;
keywords.options(SqlKeywords.CHAR).reserved = true;
keywords.options(SqlKeywords.CHECK).reserved = true;
keywords.options(SqlKeywords.CLUSTER).reserved = true;
keywords.options(SqlKeywords.CLUSTERS).reserved = true;
keywords.options(SqlKeywords.COLAUTH).reserved = true;
keywords.options(SqlKeywords.COLUMN).reserved = true;
keywords.options(SqlKeywords.COLUMNS).reserved = true;
keywords.options(SqlKeywords.COMMENT).reserved = true;
keywords.options(SqlKeywords.COMPRESS).reserved = true;
keywords.options(SqlKeywords.CONNECT).reserved = true;
keywords.options(SqlKeywords.CRASH).reserved = true;
keywords.options(SqlKeywords.CREATE).reserved = true;
keywords.options(SqlKeywords.CURRENT).reserved = true;
keywords.options(SqlKeywords.CURSOR).reserved = true;
keywords.options(SqlKeywords.DATE).reserved = true;
keywords.options(SqlKeywords.DECIMAL).reserved = true;
keywords.options(SqlKeywords.DECLARE).reserved = true;
keywords.options(SqlKeywords.DEFAULT).reserved = true;
keywords.options(SqlKeywords.DELETE).reserved = true;
keywords.options(SqlKeywords.DESC).reserved = true;
keywords.options(SqlKeywords.DISTINCT).reserved = true;
keywords.options(SqlKeywords.DROP).reserved = true;
keywords.options(SqlKeywords.ELSE).reserved = true;
keywords.options(SqlKeywords.END).reserved = true;
keywords.options(SqlKeywords.EXCEPTION).reserved = true;
keywords.options(SqlKeywords.EXCLUSIVE).reserved = true;
keywords.options(SqlKeywords.EXISTS).reserved = true;
keywords.options(SqlKeywords.FETCH).reserved = true;
keywords.options(SqlKeywords.FILE).reserved = true;
keywords.options(SqlKeywords.FLOAT).reserved = true;
keywords.options(SqlKeywords.FOR).reserved = true;
keywords.options(SqlKeywords.FROM).reserved = true;
keywords.options(SqlKeywords.FUNCTION).reserved = true;
keywords.options(SqlKeywords.GOTO).reserved = true;
keywords.options(SqlKeywords.GRANT).reserved = true;
keywords.options(SqlKeywords.GROUP).reserved = true;
keywords.options(SqlKeywords.HAVING).reserved = true;
keywords.options(SqlKeywords.IDENTIFIED).reserved = true;
keywords.options(SqlKeywords.IF).reserved = true;
keywords.options(SqlKeywords.IMMEDIATE).reserved = true;
keywords.options(SqlKeywords.IN).reserved = true;
keywords.options(SqlKeywords.INCREMENT).reserved = true;
keywords.options(SqlKeywords.INDEX).reserved = true;
keywords.options(SqlKeywords.INDEXES).reserved = true;
keywords.options(SqlKeywords.INITIAL).reserved = true;
keywords.options(SqlKeywords.INSERT).reserved = true;
keywords.options(SqlKeywords.INTEGER).reserved = true;
keywords.options(SqlKeywords.INTERSECT).reserved = true;
keywords.options(SqlKeywords.INTO).reserved = true;
keywords.options(SqlKeywords.IS).reserved = true;
keywords.options(SqlKeywords.LEVEL).reserved = true;
keywords.options(SqlKeywords.LIKE).reserved = true;
keywords.options(SqlKeywords.LOCK).reserved = true;
keywords.options(SqlKeywords.LONG).reserved = true;
keywords.options(SqlKeywords.MAXEXTENTS).reserved = true;
keywords.options(SqlKeywords.MINUS).reserved = true;
keywords.options(SqlKeywords.MLSLABEL).reserved = true;
keywords.options(SqlKeywords.MODE).reserved = true;
keywords.options(SqlKeywords.MODIFY).reserved = true;
keywords.options(SqlKeywords.NOAUDIT).reserved = true;
keywords.options(SqlKeywords.NOCOMPRESS).reserved = true;
keywords.options(SqlKeywords.NOT).reserved = true;
keywords.options(SqlKeywords.NOWAIT).reserved = true;
keywords.options(SqlKeywords.NULL).reserved = true;
keywords.options(SqlKeywords.NUMBER).reserved = true;
keywords.options(SqlKeywords.OF).reserved = true;
keywords.options(SqlKeywords.OFFLINE).reserved = true;
keywords.options(SqlKeywords.ON).reserved = true;
keywords.options(SqlKeywords.ONLINE).reserved = true;
keywords.options(SqlKeywords.OPTION).reserved = true;
keywords.options(SqlKeywords.OR).reserved = true;
keywords.options(SqlKeywords.ORDER).reserved = true;
keywords.options(SqlKeywords.OVERLAPS).reserved = true;
keywords.options(SqlKeywords.PCTFREE).reserved = true;
keywords.options(SqlKeywords.PRIOR).reserved = true;
keywords.options(SqlKeywords.PROCEDURE).reserved = true;
keywords.options(SqlKeywords.PUBLIC).reserved = true;
keywords.options(SqlKeywords.RAW).reserved = true;
keywords.options(SqlKeywords.RENAME).reserved = true;
keywords.options(SqlKeywords.RESOURCE).reserved = true;
keywords.options(SqlKeywords.REVOKE).reserved = true;
keywords.options(SqlKeywords.ROW).reserved = true;
keywords.options(SqlKeywords.ROWID).reserved = true;
keywords.options(SqlKeywords.ROWNUM).reserved = true;
keywords.options(SqlKeywords.ROWS).reserved = true;
keywords.options(SqlKeywords.SELECT).reserved = true;
keywords.options(SqlKeywords.SESSION).reserved = true;
keywords.options(SqlKeywords.SET).reserved = true;
keywords.options(SqlKeywords.SHARE).reserved = true;
keywords.options(SqlKeywords.SIZE).reserved = true;
keywords.options(SqlKeywords.SMALLINT).reserved = true;
keywords.options(SqlKeywords.SQL).reserved = true;
keywords.options(SqlKeywords.START).reserved = true;
keywords.options(SqlKeywords.SUBTYPE).reserved = true;
keywords.options(SqlKeywords.SUCCESSFUL).reserved = true;
keywords.options(SqlKeywords.SYNONYM).reserved = true;
keywords.options(SqlKeywords.SYSDATE).reserved = true;
keywords.options(SqlKeywords.TABAUTH).reserved = true;
keywords.options(SqlKeywords.TABLE).reserved = true;
keywords.options(SqlKeywords.THEN).reserved = true;
keywords.options(SqlKeywords.TO).reserved = true;
keywords.options(SqlKeywords.TRIGGER).reserved = true;
keywords.options(SqlKeywords.TYPE).reserved = true;
keywords.options(SqlKeywords.UID).reserved = true;
keywords.options(SqlKeywords.UNION).reserved = true;
keywords.options(SqlKeywords.UNIQUE).reserved = true;
keywords.options(SqlKeywords.UPDATE).reserved = true;
keywords.options(SqlKeywords.USER).reserved = true;
keywords.options(SqlKeywords.VALIDATE).reserved = true;
keywords.options(SqlKeywords.VALUES).reserved = true;
keywords.options(SqlKeywords.VARCHAR).reserved = true;
keywords.options(SqlKeywords.VARCHAR2).reserved = true;
keywords.options(SqlKeywords.VIEW).reserved = true;
keywords.options(SqlKeywords.VIEWS).reserved = true;
keywords.options(SqlKeywords.WHEN).reserved = true;
keywords.options(SqlKeywords.WHENEVER).reserved = true;
keywords.options(SqlKeywords.WHERE).reserved = true;
keywords.options(SqlKeywords.WITH).reserved = true;

keywords.options(SqlKeywords.ANALYTIC).objectStart = true;
keywords.options(SqlKeywords.ATTRIBUTE).objectStart = true;
keywords.options(SqlKeywords.AUDIT).objectStart = true;
keywords.options(SqlKeywords.CLUSTER).objectStart = true;
keywords.options(SqlKeywords.CONTEXT).objectStart = true;
keywords.options(SqlKeywords.CONTROLFILE).objectStart = true;
keywords.options(SqlKeywords.DATABASE).objectStart = true;
keywords.options(SqlKeywords.DIMENSION).objectStart = true;
keywords.options(SqlKeywords.DIRECTORY).objectStart = true;
keywords.options(SqlKeywords.DISKGROUP).objectStart = true;
keywords.options(SqlKeywords.EDITION).objectStart = true;
keywords.options(SqlKeywords.FLASHBACK).objectStart = true;
keywords.options(SqlKeywords.FUNCTION).objectStart = true;
keywords.options(SqlKeywords.HIERARCHY).objectStart = true;
keywords.options(SqlKeywords.INDEX).objectStart = true;
keywords.options(SqlKeywords.INDEXTYPE).objectStart = true;
keywords.options(SqlKeywords.INMEMORY).objectStart = true;
keywords.options(SqlKeywords.JAVA).objectStart = true;
keywords.options(SqlKeywords.LIBRARY).objectStart = true;
keywords.options(SqlKeywords.LOCKDOWN).objectStart = true;
keywords.options(SqlKeywords.MATERIALIZED).objectStart = true;
keywords.options(SqlKeywords.OPERATOR).objectStart = true;
keywords.options(SqlKeywords.OUTLINE).objectStart = true;
keywords.options(SqlKeywords.PACKAGE).objectStart = true;
keywords.options(SqlKeywords.PFILE).objectStart = true;
keywords.options(SqlKeywords.PLUGGABLE).objectStart = true;
keywords.options(SqlKeywords.PROCEDURE).objectStart = true;
keywords.options(SqlKeywords.PROFILE).objectStart = true;
keywords.options(SqlKeywords.RESTORE).objectStart = true;
keywords.options(SqlKeywords.ROLE).objectStart = true;
keywords.options(SqlKeywords.ROLLBACK).objectStart = true;
keywords.options(SqlKeywords.SCHEMA).objectStart = true;
keywords.options(SqlKeywords.SEQUENCE).objectStart = true;
keywords.options(SqlKeywords.SPFILE).objectStart = true;
keywords.options(SqlKeywords.SYNONYM).objectStart = true;
keywords.options(SqlKeywords.TABLE).objectStart = true;
keywords.options(SqlKeywords.TABLESPACE).objectStart = true;
keywords.options(SqlKeywords.TRIGGER).objectStart = true;
keywords.options(SqlKeywords.TYPE).objectStart = true;
keywords.options(SqlKeywords.USER).objectStart = true;
keywords.options(SqlKeywords.VIEW).objectStart = true;

const CommandPattern = new RegExp(
	`(${[
		"\\?",
		"@@?(\"[^\"]*\"|'[^']*'|[^ \f\t\v\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+)",
		"ACC(EPT)?",
		"A(PPEND)?",
		"ARCHIVE",
		"ATTR(IBUTE)?",
		"BRE(AK)?",
		"BTI(TLE)?",
		"C(HANGE)?",
		"CL(EAR)?",
		"COL(UMN)?",
		"COMP(UTE)?",
		"CONN(ECT)?",
		"COPY",
		"DEF(INE)?",
		"DEL",
		"DESC(RIBE)?",
		"DISC(ONNECT)?",
		"ED(IT)?",
		"EXEC(UTE)?",
		"EXIT",
		"QUIT",
		"GET",
		"HELP",
		"HIST(ORY)?",
		"HO(ST)?",
		"I(NPUT)?",
		"L(IST)?",
		"PASSW(ORD)?",
		"PAU(SE)?",
		"PRINT",
		"PRO(MPT)?",
		"RECOVER",
		"REM(ARK)?",
		"REPF(OOTER)?",
		"REPH(EADER)?",
		"SAVE?",
		"SET",
		"SHOW?",
		"SHUTDOWN",
		"SPO(OL)?",
		"STA(RT)?",
		"STARTUP",
		"STORE",
		"TIMI(NG)?",
		"TTI(TLE)?",
		"UNDEF(INE)?",
		"VAR(IABLE)?",
		"WHENEVER",
		"XQUERY",
	].join("|")})\\b(-(\n|\r\n?)|[^\r\n])*(\n|\r\n?|$)`,
	"iy",
);

const Mode = {
	INITIAL: 0,
	SQL_START: 1,
	SQL_OBJECT_DEF: 2,
	SQL_PROC: 3,
	SQL_PART: Number.MAX_SAFE_INTEGER,
} as const;

export declare type OracleLexerOptions = LexerOptions & {};

export class OracleLexer extends Lexer {
	private reserved = new Set<Keyword>();

	constructor(options: OracleLexerOptions = {}) {
		super(
			"oracle",
			[
				{ type: SqlTokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
				{ type: SqlTokenType.BlockComment, re: /\/\*.*?\*\//sy, skip: true },
				{ type: SqlTokenType.LineComment, re: /--.*/y, skip: true },
				{
					type: SqlTokenType.LineBreak,
					re: /\n|\r\n?/y,
					skip: true,
					separator: true,
				},
				{
					type: SqlTokenType.WhiteSpace,
					re: /[ \f\t\v\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/y,
					skip: true,
				},
				{
					type: SqlTokenType.Delimiter,
					re: /(?<=^|[\r\n])[ \t]*([./]|R(UN)?)[ \t]*(\n|\r\n?|$)/iy,
					separator: true,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlTokenType.Command,
					re: (state) => (state.mode === Mode.INITIAL ? CommandPattern : false),
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
				{
					type: SqlTokenType.Operator,
					re: /[（(][＋+][）)]|\.\./y,
					separator: true,
				},
				{ type: SqlTokenType.LeftParen, re: /[（(]/y, separator: true },
				{ type: SqlTokenType.RightParen, re: /[）)]/y, separator: true },
				{ type: SqlTokenType.Comma, re: /[，,]/y, separator: true },
				{
					type: SqlTokenType.Label,
					re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y,
				},
				{
					type: SqlTokenType.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Dot, re: /[．.]/y, separator: true },
				{ type: SqlTokenType.String, re: /[ＮｎNn]?'([^']|'')*'/y },
				{
					type: SqlTokenType.String,
					re: /[ＮｎNn]?[Qq]'(?:\[.*?\]|\{.*?\}|\(.*?\)|([^ \t\r\n]).*?\1)'/my,
				},
				{ type: SqlTokenType.Identifier, re: /"([^"]|"")*"/y },
				{ type: SqlTokenType.BindVariable, re: /\?/y },
				{
					type: SqlTokenType.BindVariable,
					re: /[：:][a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlTokenType.Operator,
					separator: true,
					re: /｜｜|\|\||＜＞|<>|[＝＜＞！＾：=<>!^:][＝=]?|[％～＆｜＊／＋－%~&|*/+-]/y,
				},
				{
					type: SqlTokenType.Identifier,
					re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
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

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;
		token.eos = true;

		const m = /^([ \t\f]*)([^ \t\f\r\n]+)([ \t\f]*)(\r?\n)?$/.exec(token.text);
		if (m) {
			let location = token.location;
			if (m[1]) {
				token.preskips.push(
					new Token(SqlTokenType.WhiteSpace, m[1], {
						location,
					}),
				);
				if (location) {
					location = new SourceLocation(
						location.position + m[1].length,
						location.lineNumber,
						location.columnNumber + m[1].length,
						location.source,
					);
				}
			}
			token.text = m[2];
			token.location = location;
			if (location && (m[3] || m[4])) {
				location = new SourceLocation(
					location.position + m[2].length,
					location.lineNumber,
					location.columnNumber + m[2].length,
					location.source,
				);
			}
			if (m[3]) {
				token.postskips.push(
					new Token(SqlTokenType.WhiteSpace, m[3], {
						location,
					}),
				);
				if (location && m[4]) {
					location = new SourceLocation(
						location.position + m[3].length,
						location.lineNumber,
						location.columnNumber + m[3].length,
						location.source,
					);
				}
			}
			if (m[4]) {
				token.postskips.push(
					new Token(SqlTokenType.LineBreak, m[4], {
						location,
					}),
				);
			}
		}
	}

	private onMatchSemiColon(state: Record<string, any>, token: Token) {
		if (state.mode !== Mode.SQL_PROC) {
			state.mode = Mode.INITIAL;
			token.eos = true;
		}
	}

	private onMatchCommand(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;

		const tokens = [];
		let location = token.location;

		const re =
			/(\n|\r\n?)|([ \f\t\v\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+)|("[^"]*"|'[^']*')|([^ \f\t\v\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\r\n"']+)/y;
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

	private onMatchIdentifier(state: Record<string, any>, token: Token) {
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				if (token.keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					token.keyword === SqlKeywords.DECLARE ||
					token.keyword === SqlKeywords.BEGIN
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				this.options.keywords?.options(token.keyword).objectStart
			) {
				if (
					token.keyword === SqlKeywords.FUNCTION ||
					token.keyword === SqlKeywords.LIBRARY ||
					token.keyword === SqlKeywords.PACKAGE ||
					token.keyword === SqlKeywords.PROCEDURE ||
					token.keyword === SqlKeywords.TRIGGER ||
					token.keyword === SqlKeywords.TYPE
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			}
		}
	}
}
