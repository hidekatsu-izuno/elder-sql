import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
} from "../lexer.js";
import { SqlKeyword, SqlTokenType } from "../sql.js";

export const ReservedSet = new Set<Keyword>([
	SqlKeyword.ACCESS,
	SqlKeyword.ADD,
	SqlKeyword.ALL,
	SqlKeyword.ALTER,
	SqlKeyword.AND,
	SqlKeyword.ANY,
	SqlKeyword.AS,
	SqlKeyword.ASC,
	SqlKeyword.AT,
	SqlKeyword.AUDIT,
	SqlKeyword.BEGIN,
	SqlKeyword.BETWEEN,
	SqlKeyword.BY,
	SqlKeyword.CASE,
	SqlKeyword.CHAR,
	SqlKeyword.CHECK,
	SqlKeyword.CLUSTER,
	SqlKeyword.CLUSTERS,
	SqlKeyword.COLAUTH,
	SqlKeyword.COLUMN,
	SqlKeyword.COLUMNS,
	SqlKeyword.COMMENT,
	SqlKeyword.COMPRESS,
	SqlKeyword.CONNECT,
	SqlKeyword.CRASH,
	SqlKeyword.CREATE,
	SqlKeyword.CURRENT,
	SqlKeyword.CURSOR,
	SqlKeyword.DATE,
	SqlKeyword.DECIMAL,
	SqlKeyword.DECLARE,
	SqlKeyword.DEFAULT,
	SqlKeyword.DELETE,
	SqlKeyword.DESC,
	SqlKeyword.DISTINCT,
	SqlKeyword.DROP,
	SqlKeyword.ELSE,
	SqlKeyword.END,
	SqlKeyword.EXCEPTION,
	SqlKeyword.EXCLUSIVE,
	SqlKeyword.EXISTS,
	SqlKeyword.FETCH,
	SqlKeyword.FILE,
	SqlKeyword.FLOAT,
	SqlKeyword.FOR,
	SqlKeyword.FROM,
	SqlKeyword.FUNCTION,
	SqlKeyword.GOTO,
	SqlKeyword.GRANT,
	SqlKeyword.GROUP,
	SqlKeyword.HAVING,
	SqlKeyword.IDENTIFIED,
	SqlKeyword.IF,
	SqlKeyword.IMMEDIATE,
	SqlKeyword.IN,
	SqlKeyword.INCREMENT,
	SqlKeyword.INDEX,
	SqlKeyword.INDEXES,
	SqlKeyword.INITIAL,
	SqlKeyword.INSERT,
	SqlKeyword.INTEGER,
	SqlKeyword.INTERSECT,
	SqlKeyword.INTO,
	SqlKeyword.IS,
	SqlKeyword.LEVEL,
	SqlKeyword.LIKE,
	SqlKeyword.LOCK,
	SqlKeyword.LONG,
	SqlKeyword.MAXEXTENTS,
	SqlKeyword.MINUS,
	SqlKeyword.MLSLABEL,
	SqlKeyword.MODE,
	SqlKeyword.MODIFY,
	SqlKeyword.NOAUDIT,
	SqlKeyword.NOCOMPRESS,
	SqlKeyword.NOT,
	SqlKeyword.NOWAIT,
	SqlKeyword.NULL,
	SqlKeyword.NUMBER,
	SqlKeyword.OF,
	SqlKeyword.OFFLINE,
	SqlKeyword.ON,
	SqlKeyword.ONLINE,
	SqlKeyword.OPTION,
	SqlKeyword.OR,
	SqlKeyword.ORDER,
	SqlKeyword.OVERLAPS,
	SqlKeyword.PCTFREE,
	SqlKeyword.PRIOR,
	SqlKeyword.PROCEDURE,
	SqlKeyword.PUBLIC,
	SqlKeyword.RAW,
	SqlKeyword.RENAME,
	SqlKeyword.RESOURCE,
	SqlKeyword.REVOKE,
	SqlKeyword.ROW,
	SqlKeyword.ROWID,
	SqlKeyword.ROWNUM,
	SqlKeyword.ROWS,
	SqlKeyword.SELECT,
	SqlKeyword.SESSION,
	SqlKeyword.SET,
	SqlKeyword.SHARE,
	SqlKeyword.SIZE,
	SqlKeyword.SMALLINT,
	SqlKeyword.SQL,
	SqlKeyword.START,
	SqlKeyword.SUBTYPE,
	SqlKeyword.SUCCESSFUL,
	SqlKeyword.SYNONYM,
	SqlKeyword.SYSDATE,
	SqlKeyword.TABAUTH,
	SqlKeyword.TABLE,
	SqlKeyword.THEN,
	SqlKeyword.TO,
	SqlKeyword.TRIGGER,
	SqlKeyword.TYPE,
	SqlKeyword.UID,
	SqlKeyword.UNION,
	SqlKeyword.UNIQUE,
	SqlKeyword.UPDATE,
	SqlKeyword.USER,
	SqlKeyword.VALIDATE,
	SqlKeyword.VALUES,
	SqlKeyword.VARCHAR,
	SqlKeyword.VARCHAR2,
	SqlKeyword.VIEW,
	SqlKeyword.VIEWS,
	SqlKeyword.WHEN,
	SqlKeyword.WHENEVER,
	SqlKeyword.WHERE,
	SqlKeyword.WITH,
]);

const ObjectStartSet = new Set<Keyword>([
	SqlKeyword.ANALYTIC,
	SqlKeyword.ATTRIBUTE,
	SqlKeyword.AUDIT,
	SqlKeyword.CLUSTER,
	SqlKeyword.CONTEXT,
	SqlKeyword.CONTROLFILE,
	SqlKeyword.DATABASE,
	SqlKeyword.DIMENSION,
	SqlKeyword.DIRECTORY,
	SqlKeyword.DISKGROUP,
	SqlKeyword.EDITION,
	SqlKeyword.FLASHBACK,
	SqlKeyword.FUNCTION,
	SqlKeyword.HIERARCHY,
	SqlKeyword.INDEX,
	SqlKeyword.INDEXTYPE,
	SqlKeyword.INMEMORY,
	SqlKeyword.JAVA,
	SqlKeyword.LIBRARY,
	SqlKeyword.LOCKDOWN,
	SqlKeyword.MATERIALIZED,
	SqlKeyword.OPERATOR,
	SqlKeyword.OUTLINE,
	SqlKeyword.PACKAGE,
	SqlKeyword.PFILE,
	SqlKeyword.PLUGGABLE,
	SqlKeyword.PROCEDURE,
	SqlKeyword.PROFILE,
	SqlKeyword.RESTORE,
	SqlKeyword.ROLE,
	SqlKeyword.ROLLBACK,
	SqlKeyword.SCHEMA,
	SqlKeyword.SEQUENCE,
	SqlKeyword.SPFILE,
	SqlKeyword.SYNONYM,
	SqlKeyword.TABLE,
	SqlKeyword.TABLESPACE,
	SqlKeyword.TRIGGER,
	SqlKeyword.TYPE,
	SqlKeyword.USER,
	SqlKeyword.VIEW,
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

export class OracleLexer extends Lexer {
	static isObjectStart(keyword?: Keyword) {
		return keyword != null && ObjectStartSet.has(keyword);
	}

	private reserved = new Set<Keyword>();

	constructor(options: OracleLexerOptions = {}) {
		super(
			"oracle",
			[
				{ type: SqlTokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
				{ type: SqlTokenType.BlockComment, re: /\/\*.*?\*\//sy, skip: true },
				{ type: SqlTokenType.LineComment, re: /--.*/y, skip: true },
				{ type: SqlTokenType.LineBreak, re: /\n|\r\n?/y, skip: true, separator: true },
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
				{ type: SqlTokenType.Operator, re: /[（(][＋+][）)]|\.\./y, separator: true },
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
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				OracleLexer.isObjectStart(keyword)
			) {
				if (
					keyword === SqlKeyword.FUNCTION ||
					keyword === SqlKeyword.LIBRARY ||
					keyword === SqlKeyword.PACKAGE ||
					keyword === SqlKeyword.PROCEDURE ||
					keyword === SqlKeyword.TRIGGER ||
					keyword === SqlKeyword.TYPE
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			}
		}
	}
}
