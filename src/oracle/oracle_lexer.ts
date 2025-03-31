import {
	type Keyword,
	Lexer,
	type LexerOptions,
	SourceLocation,
	Token,
} from "../lexer.js";
import { SqlKeywords, SqlTokenType } from "../sql.js";

export const ReservedSet = new Set<Keyword>([
	SqlKeywords.ACCESS,
	SqlKeywords.ADD,
	SqlKeywords.ALL,
	SqlKeywords.ALTER,
	SqlKeywords.AND,
	SqlKeywords.ANY,
	SqlKeywords.AS,
	SqlKeywords.ASC,
	SqlKeywords.AT,
	SqlKeywords.AUDIT,
	SqlKeywords.BEGIN,
	SqlKeywords.BETWEEN,
	SqlKeywords.BY,
	SqlKeywords.CASE,
	SqlKeywords.CHAR,
	SqlKeywords.CHECK,
	SqlKeywords.CLUSTER,
	SqlKeywords.CLUSTERS,
	SqlKeywords.COLAUTH,
	SqlKeywords.COLUMN,
	SqlKeywords.COLUMNS,
	SqlKeywords.COMMENT,
	SqlKeywords.COMPRESS,
	SqlKeywords.CONNECT,
	SqlKeywords.CRASH,
	SqlKeywords.CREATE,
	SqlKeywords.CURRENT,
	SqlKeywords.CURSOR,
	SqlKeywords.DATE,
	SqlKeywords.DECIMAL,
	SqlKeywords.DECLARE,
	SqlKeywords.DEFAULT,
	SqlKeywords.DELETE,
	SqlKeywords.DESC,
	SqlKeywords.DISTINCT,
	SqlKeywords.DROP,
	SqlKeywords.ELSE,
	SqlKeywords.END,
	SqlKeywords.EXCEPTION,
	SqlKeywords.EXCLUSIVE,
	SqlKeywords.EXISTS,
	SqlKeywords.FETCH,
	SqlKeywords.FILE,
	SqlKeywords.FLOAT,
	SqlKeywords.FOR,
	SqlKeywords.FROM,
	SqlKeywords.FUNCTION,
	SqlKeywords.GOTO,
	SqlKeywords.GRANT,
	SqlKeywords.GROUP,
	SqlKeywords.HAVING,
	SqlKeywords.IDENTIFIED,
	SqlKeywords.IF,
	SqlKeywords.IMMEDIATE,
	SqlKeywords.IN,
	SqlKeywords.INCREMENT,
	SqlKeywords.INDEX,
	SqlKeywords.INDEXES,
	SqlKeywords.INITIAL,
	SqlKeywords.INSERT,
	SqlKeywords.INTEGER,
	SqlKeywords.INTERSECT,
	SqlKeywords.INTO,
	SqlKeywords.IS,
	SqlKeywords.LEVEL,
	SqlKeywords.LIKE,
	SqlKeywords.LOCK,
	SqlKeywords.LONG,
	SqlKeywords.MAXEXTENTS,
	SqlKeywords.MINUS,
	SqlKeywords.MLSLABEL,
	SqlKeywords.MODE,
	SqlKeywords.MODIFY,
	SqlKeywords.NOAUDIT,
	SqlKeywords.NOCOMPRESS,
	SqlKeywords.NOT,
	SqlKeywords.NOWAIT,
	SqlKeywords.NULL,
	SqlKeywords.NUMBER,
	SqlKeywords.OF,
	SqlKeywords.OFFLINE,
	SqlKeywords.ON,
	SqlKeywords.ONLINE,
	SqlKeywords.OPTION,
	SqlKeywords.OR,
	SqlKeywords.ORDER,
	SqlKeywords.OVERLAPS,
	SqlKeywords.PCTFREE,
	SqlKeywords.PRIOR,
	SqlKeywords.PROCEDURE,
	SqlKeywords.PUBLIC,
	SqlKeywords.RAW,
	SqlKeywords.RENAME,
	SqlKeywords.RESOURCE,
	SqlKeywords.REVOKE,
	SqlKeywords.ROW,
	SqlKeywords.ROWID,
	SqlKeywords.ROWNUM,
	SqlKeywords.ROWS,
	SqlKeywords.SELECT,
	SqlKeywords.SESSION,
	SqlKeywords.SET,
	SqlKeywords.SHARE,
	SqlKeywords.SIZE,
	SqlKeywords.SMALLINT,
	SqlKeywords.SQL,
	SqlKeywords.START,
	SqlKeywords.SUBTYPE,
	SqlKeywords.SUCCESSFUL,
	SqlKeywords.SYNONYM,
	SqlKeywords.SYSDATE,
	SqlKeywords.TABAUTH,
	SqlKeywords.TABLE,
	SqlKeywords.THEN,
	SqlKeywords.TO,
	SqlKeywords.TRIGGER,
	SqlKeywords.TYPE,
	SqlKeywords.UID,
	SqlKeywords.UNION,
	SqlKeywords.UNIQUE,
	SqlKeywords.UPDATE,
	SqlKeywords.USER,
	SqlKeywords.VALIDATE,
	SqlKeywords.VALUES,
	SqlKeywords.VARCHAR,
	SqlKeywords.VARCHAR2,
	SqlKeywords.VIEW,
	SqlKeywords.VIEWS,
	SqlKeywords.WHEN,
	SqlKeywords.WHENEVER,
	SqlKeywords.WHERE,
	SqlKeywords.WITH,
]);

const ObjectStartSet = new Set<Keyword>([]);

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
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				(keyword === SqlKeywords.ANALYTIC ||
					keyword === SqlKeywords.ATTRIBUTE ||
					keyword === SqlKeywords.AUDIT ||
					keyword === SqlKeywords.CLUSTER ||
					keyword === SqlKeywords.CONTEXT ||
					keyword === SqlKeywords.CONTROLFILE ||
					keyword === SqlKeywords.DATABASE ||
					keyword === SqlKeywords.DIMENSION ||
					keyword === SqlKeywords.DIRECTORY ||
					keyword === SqlKeywords.DISKGROUP ||
					keyword === SqlKeywords.EDITION ||
					keyword === SqlKeywords.FLASHBACK ||
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.HIERARCHY ||
					keyword === SqlKeywords.INDEX ||
					keyword === SqlKeywords.INDEXTYPE ||
					keyword === SqlKeywords.INMEMORY ||
					keyword === SqlKeywords.JAVA ||
					keyword === SqlKeywords.LIBRARY ||
					keyword === SqlKeywords.LOCKDOWN ||
					keyword === SqlKeywords.MATERIALIZED ||
					keyword === SqlKeywords.OPERATOR ||
					keyword === SqlKeywords.OUTLINE ||
					keyword === SqlKeywords.PACKAGE ||
					keyword === SqlKeywords.PFILE ||
					keyword === SqlKeywords.PLUGGABLE ||
					keyword === SqlKeywords.PROCEDURE ||
					keyword === SqlKeywords.PROFILE ||
					keyword === SqlKeywords.RESTORE ||
					keyword === SqlKeywords.ROLE ||
					keyword === SqlKeywords.ROLLBACK ||
					keyword === SqlKeywords.SCHEMA ||
					keyword === SqlKeywords.SEQUENCE ||
					keyword === SqlKeywords.SPFILE ||
					keyword === SqlKeywords.SYNONYM ||
					keyword === SqlKeywords.TABLE ||
					keyword === SqlKeywords.TABLESPACE ||
					keyword === SqlKeywords.TRIGGER ||
					keyword === SqlKeywords.TYPE ||
					keyword === SqlKeywords.USER ||
					keyword === SqlKeywords.VIEW)
			) {
				if (
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.LIBRARY ||
					keyword === SqlKeywords.PACKAGE ||
					keyword === SqlKeywords.PROCEDURE ||
					keyword === SqlKeywords.TRIGGER ||
					keyword === SqlKeywords.TYPE
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			}
		}
	}
}
