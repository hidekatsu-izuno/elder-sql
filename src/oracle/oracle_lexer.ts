import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
} from "elder-parse";
import { SqlLexer } from "../sql.ts";

const DefaultReservedSet = new Set([
	SqlLexer.ACCESS,
	SqlLexer.ADD,
	SqlLexer.ALL,
	SqlLexer.ALTER,
	SqlLexer.AND,
	SqlLexer.ANY,
	SqlLexer.AS,
	SqlLexer.ASC,
	SqlLexer.AT,
	SqlLexer.AUDIT,
	SqlLexer.BEGIN,
	SqlLexer.BETWEEN,
	SqlLexer.BY,
	SqlLexer.CASE,
	SqlLexer.CHAR,
	SqlLexer.CHECK,
	SqlLexer.CLUSTER,
	SqlLexer.CLUSTERS,
	SqlLexer.COLAUTH,
	SqlLexer.COLUMN,
	SqlLexer.COLUMNS,
	SqlLexer.COMMENT,
	SqlLexer.COMPRESS,
	SqlLexer.CONNECT,
	SqlLexer.CRASH,
	SqlLexer.CREATE,
	SqlLexer.CURRENT,
	SqlLexer.CURSOR,
	SqlLexer.DATE,
	SqlLexer.DECIMAL,
	SqlLexer.DECLARE,
	SqlLexer.DEFAULT,
	SqlLexer.DELETE,
	SqlLexer.DESC,
	SqlLexer.DISTINCT,
	SqlLexer.DROP,
	SqlLexer.ELSE,
	SqlLexer.END,
	SqlLexer.EXCEPTION,
	SqlLexer.EXCLUSIVE,
	SqlLexer.EXISTS,
	SqlLexer.FETCH,
	SqlLexer.FILE,
	SqlLexer.FLOAT,
	SqlLexer.FOR,
	SqlLexer.FROM,
	SqlLexer.FUNCTION,
	SqlLexer.GOTO,
	SqlLexer.GRANT,
	SqlLexer.GROUP,
	SqlLexer.HAVING,
	SqlLexer.IDENTIFIED,
	SqlLexer.IF,
	SqlLexer.IMMEDIATE,
	SqlLexer.IN,
	SqlLexer.INCREMENT,
	SqlLexer.INDEX,
	SqlLexer.INDEXES,
	SqlLexer.INITIAL,
	SqlLexer.INSERT,
	SqlLexer.INTEGER,
	SqlLexer.INTERSECT,
	SqlLexer.INTO,
	SqlLexer.IS,
	SqlLexer.LEVEL,
	SqlLexer.LIKE,
	SqlLexer.LOCK,
	SqlLexer.LONG,
	SqlLexer.MAXEXTENTS,
	SqlLexer.MINUS,
	SqlLexer.MLSLABEL,
	SqlLexer.MODE,
	SqlLexer.MODIFY,
	SqlLexer.NOAUDIT,
	SqlLexer.NOCOMPRESS,
	SqlLexer.NOT,
	SqlLexer.NOWAIT,
	SqlLexer.NULL,
	SqlLexer.NUMBER,
	SqlLexer.OF,
	SqlLexer.OFFLINE,
	SqlLexer.ON,
	SqlLexer.ONLINE,
	SqlLexer.OPTION,
	SqlLexer.OR,
	SqlLexer.ORDER,
	SqlLexer.OVERLAPS,
	SqlLexer.PCTFREE,
	SqlLexer.PRIOR,
	SqlLexer.PROCEDURE,
	SqlLexer.PUBLIC,
	SqlLexer.RAW,
	SqlLexer.RENAME,
	SqlLexer.RESOURCE,
	SqlLexer.REVOKE,
	SqlLexer.ROW,
	SqlLexer.ROWID,
	SqlLexer.ROWNUM,
	SqlLexer.ROWS,
	SqlLexer.SELECT,
	SqlLexer.SESSION,
	SqlLexer.SET,
	SqlLexer.SHARE,
	SqlLexer.SIZE,
	SqlLexer.SMALLINT,
	SqlLexer.SQL,
	SqlLexer.START,
	SqlLexer.SUBTYPE,
	SqlLexer.SUCCESSFUL,
	SqlLexer.SYNONYM,
	SqlLexer.SYSDATE,
	SqlLexer.TABAUTH,
	SqlLexer.TABLE,
	SqlLexer.THEN,
	SqlLexer.TO,
	SqlLexer.TRIGGER,
	SqlLexer.TYPE,
	SqlLexer.UID,
	SqlLexer.UNION,
	SqlLexer.UNIQUE,
	SqlLexer.UPDATE,
	SqlLexer.USER,
	SqlLexer.VALIDATE,
	SqlLexer.VALUES,
	SqlLexer.VARCHAR,
	SqlLexer.VARCHAR2,
	SqlLexer.VIEW,
	SqlLexer.VIEWS,
	SqlLexer.WHEN,
	SqlLexer.WHENEVER,
	SqlLexer.WHERE,
	SqlLexer.WITH,
]);

const ObjectStartSet = new Set([
	SqlLexer.ANALYTIC,
	SqlLexer.ATTRIBUTE,
	SqlLexer.AUDIT,
	SqlLexer.CLUSTER,
	SqlLexer.CONTEXT,
	SqlLexer.CONTROLFILE,
	SqlLexer.DATABASE,
	SqlLexer.DIMENSION,
	SqlLexer.DIRECTORY,
	SqlLexer.DISKGROUP,
	SqlLexer.EDITION,
	SqlLexer.FLASHBACK,
	SqlLexer.FUNCTION,
	SqlLexer.HIERARCHY,
	SqlLexer.INDEX,
	SqlLexer.INDEXTYPE,
	SqlLexer.INMEMORY,
	SqlLexer.JAVA,
	SqlLexer.LIBRARY,
	SqlLexer.LOCKDOWN,
	SqlLexer.MATERIALIZED,
	SqlLexer.OPERATOR,
	SqlLexer.OUTLINE,
	SqlLexer.PACKAGE,
	SqlLexer.PFILE,
	SqlLexer.PLUGGABLE,
	SqlLexer.PROCEDURE,
	SqlLexer.PROFILE,
	SqlLexer.RESTORE,
	SqlLexer.ROLE,
	SqlLexer.ROLLBACK,
	SqlLexer.SCHEMA,
	SqlLexer.SEQUENCE,
	SqlLexer.SPFILE,
	SqlLexer.SYNONYM,
	SqlLexer.TABLE,
	SqlLexer.TABLESPACE,
	SqlLexer.TRIGGER,
	SqlLexer.TYPE,
	SqlLexer.USER,
	SqlLexer.VIEW,
]);

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

export class OracleLexer extends SqlLexer {
	constructor(options: OracleLexerOptions = {}) {
		super(
			"oracle",
			[
				{ type: SqlLexer.HintComment, re: /\/\*\+.*?\*\//sy },
				{ type: SqlLexer.BlockComment, re: /\/\*.*?\*\//sy },
				{ type: SqlLexer.LineComment, re: /--.*/y },
				{
					type: SqlLexer.LineBreak,
					re: /\n|\r\n?/y,
				},
				{
					type: SqlLexer.WhiteSpace,
					re: /[ \f\t\v\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/y,
				},
				{
					type: SqlLexer.Delimiter,
					re: /(?<=^|[\r\n])[ \t]*([./]|R(UN)?)[ \t]*(\n|\r\n?|$)/iy,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlLexer.Command,
					re: (state) => (state.mode === Mode.INITIAL ? CommandPattern : false),
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
				{
					type: SqlLexer.Operator,
					re: /[（(][＋+][）)]|\.\./y,
				},
				{ type: SqlLexer.LeftParen, re: /[（(]/y },
				{ type: SqlLexer.RightParen, re: /[）)]/y },
				{ type: SqlLexer.Comma, re: /[，,]/y },
				{
					type: SqlLexer.Label,
					re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y,
				},
				{
					type: SqlLexer.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlLexer.Dot, re: /[．.]/y },
				{ type: SqlLexer.String, re: /[ＮｎNn]?'([^']|'')*'/y },
				{
					type: SqlLexer.String,
					re: /[ＮｎNn]?[Qq]'(?:\[.*?\]|\{.*?\}|\(.*?\)|([^ \t\r\n]).*?\1)'/my,
				},
				{ type: SqlLexer.Identifier, re: /"([^"]|"")*"/y },
				{ type: SqlLexer.BindVariable, re: /\?/y },
				{
					type: SqlLexer.BindVariable,
					re: /[：:][a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlLexer.Operator,
					re: /｜｜|\|\||＜＞|<>|[＝＜＞！＾：=<>!^:][＝=]?|[％～＆｜＊／＋－%~&|*/+-]/y,
				},
				{
					type: SqlLexer.Identifier,
					re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);
	}

	isReserved(keyword: Keyword) {
		return super.isReserved(keyword) || DefaultReservedSet.has(keyword);
	}

	protected initState(state: Record<string, any>) {
		state.mode = Mode.INITIAL;
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;

		const m = /^([ \t\f]*)([^ \t\f\r\n]+)([ \t\f]*)(\r?\n)?$/.exec(token.text);
		if (m) {
			let location = token.location;
			if (m[1]) {
				token.preskips.push(
					new Token(SqlLexer.WhiteSpace, m[1], {
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
					new Token(SqlLexer.WhiteSpace, m[3], {
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
					new Token(SqlLexer.LineBreak, m[4], {
						location,
					}),
				);
			}
		}

		return [token, new Token(SqlLexer.EoF, "")];
	}

	private onMatchSemiColon(state: Record<string, any>, token: Token) {
		if (state.mode !== Mode.SQL_PROC) {
			state.mode = Mode.INITIAL;
			return [token, new Token(SqlLexer.EoS, "")];
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
		tokens.push(new Token(SqlLexer.EoF, ""));

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
				if (token.keyword === SqlLexer.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					token.keyword === SqlLexer.DECLARE ||
					token.keyword === SqlLexer.BEGIN
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				ObjectStartSet.has(token.keyword)
			) {
				if (
					token.keyword === SqlLexer.FUNCTION ||
					token.keyword === SqlLexer.LIBRARY ||
					token.keyword === SqlLexer.PACKAGE ||
					token.keyword === SqlLexer.PROCEDURE ||
					token.keyword === SqlLexer.TRIGGER ||
					token.keyword === SqlLexer.TYPE
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			}
		}
	}
}
