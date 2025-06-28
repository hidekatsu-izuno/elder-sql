import { type Keyword, Lexer, type LexerOptions, Token } from "elder-parse";
import { SqlLexer } from "../sql.ts";

const DefaultReservedSet = new Set([
	SqlLexer.ADD,
	SqlLexer.ALL,
	SqlLexer.ALTER,
	SqlLexer.AND,
	SqlLexer.ANY,
	SqlLexer.AS,
	SqlLexer.ASC,
	SqlLexer.AUTHORIZATION,
	SqlLexer.BACKUP,
	SqlLexer.BEGIN,
	SqlLexer.BETWEEN,
	SqlLexer.BREAK,
	SqlLexer.BROWSE,
	SqlLexer.BULK,
	SqlLexer.BY,
	SqlLexer.CASCADE,
	SqlLexer.CASE,
	SqlLexer.CHECK,
	SqlLexer.CHECKPOINT,
	SqlLexer.CLOSE,
	SqlLexer.CLUSTERED,
	SqlLexer.COALESCE,
	SqlLexer.COLLATE,
	SqlLexer.COLUMN,
	SqlLexer.COMMIT,
	SqlLexer.COMPUTE,
	SqlLexer.CONSTRAINT,
	SqlLexer.CONTAINS,
	SqlLexer.CONTAINSTABLE,
	SqlLexer.CONTINUE,
	SqlLexer.CONVERT,
	SqlLexer.CREATE,
	SqlLexer.CROSS,
	SqlLexer.CURRENT,
	SqlLexer.CURRENT_DATE,
	SqlLexer.CURRENT_TIME,
	SqlLexer.CURRENT_TIMESTAMP,
	SqlLexer.CURRENT_USER,
	SqlLexer.CURSOR,
	SqlLexer.DATABASE,
	SqlLexer.DBCC,
	SqlLexer.DEALLOCATE,
	SqlLexer.DECLARE,
	SqlLexer.DEFAULT,
	SqlLexer.DELETE,
	SqlLexer.DENY,
	SqlLexer.DESC,
	SqlLexer.DISK,
	SqlLexer.DISTINCT,
	SqlLexer.DISTRIBUTED,
	SqlLexer.DOUBLE,
	SqlLexer.DROP,
	SqlLexer.DUMP,
	SqlLexer.ELSE,
	SqlLexer.END,
	SqlLexer.ERRLVL,
	SqlLexer.ESCAPE,
	SqlLexer.EXCEPT,
	SqlLexer.EXEC,
	SqlLexer.EXECUTE,
	SqlLexer.EXISTS,
	SqlLexer.EXIT,
	SqlLexer.EXTERNAL,
	SqlLexer.FETCH,
	SqlLexer.FILE,
	SqlLexer.FILLFACTOR,
	SqlLexer.FOR,
	SqlLexer.FOREIGN,
	SqlLexer.FREETEXT,
	SqlLexer.FREETEXTTABLE,
	SqlLexer.FROM,
	SqlLexer.FULL,
	SqlLexer.FUNCTION,
	SqlLexer.GOTO,
	SqlLexer.GRANT,
	SqlLexer.GROUP,
	SqlLexer.HAVING,
	SqlLexer.HOLDLOCK,
	SqlLexer.IDENTITY,
	SqlLexer.IDENTITYCOL,
	SqlLexer.IDENTITY_INSERT,
	SqlLexer.IF,
	SqlLexer.IN,
	SqlLexer.INDEX,
	SqlLexer.INNER,
	SqlLexer.INSERT,
	SqlLexer.INTERSECT,
	SqlLexer.INTO,
	SqlLexer.IS,
	SqlLexer.JOIN,
	SqlLexer.KEY,
	SqlLexer.KILL,
	SqlLexer.LEFT,
	SqlLexer.LIKE,
	SqlLexer.LINENO,
	SqlLexer.LOAD,
	SqlLexer.MERGE,
	SqlLexer.NATIONAL,
	SqlLexer.NOCHECK,
	SqlLexer.NONCLUSTERED,
	SqlLexer.NOT,
	SqlLexer.NULL,
	SqlLexer.NULLIF,
	SqlLexer.OF,
	SqlLexer.OFF,
	SqlLexer.OFFSETS,
	SqlLexer.ON,
	SqlLexer.OPEN,
	SqlLexer.OPENDATASOURCE,
	SqlLexer.OPENQUERY,
	SqlLexer.OPENROWSET,
	SqlLexer.OPENXML,
	SqlLexer.OPTION,
	SqlLexer.OR,
	SqlLexer.ORDER,
	SqlLexer.OUTER,
	SqlLexer.OVER,
	SqlLexer.PERCENT,
	SqlLexer.PIVOT,
	SqlLexer.PLAN,
	SqlLexer.PRECISION,
	SqlLexer.PRIMARY,
	SqlLexer.PRINT,
	SqlLexer.PROC,
	SqlLexer.PROCEDURE,
	SqlLexer.PUBLIC,
	SqlLexer.RAISERROR,
	SqlLexer.READ,
	SqlLexer.READTEXT,
	SqlLexer.RECONFIGURE,
	SqlLexer.REFERENCES,
	SqlLexer.REPLICATION,
	SqlLexer.RESTORE,
	SqlLexer.RESTRICT,
	SqlLexer.RETURN,
	SqlLexer.REVERT,
	SqlLexer.REVOKE,
	SqlLexer.RIGHT,
	SqlLexer.ROLLBACK,
	SqlLexer.ROWCOUNT,
	SqlLexer.ROWGUIDCOL,
	SqlLexer.RULE,
	SqlLexer.SAVE,
	SqlLexer.SCHEMA,
	SqlLexer.SECURITYAUDIT,
	SqlLexer.SELECT,
	SqlLexer.SEMANTICKEYPHRASETABLE,
	SqlLexer.SEMANTICSIMILARITYDETAILSTABLE,
	SqlLexer.SEMANTICSIMILARITYTABLE,
	SqlLexer.SESSION_USER,
	SqlLexer.SET,
	SqlLexer.SETUSER,
	SqlLexer.SHUTDOWN,
	SqlLexer.SOME,
	SqlLexer.STATISTICS,
	SqlLexer.SYSTEM_USER,
	SqlLexer.TABLE,
	SqlLexer.TABLESAMPLE,
	SqlLexer.TEXTSIZE,
	SqlLexer.THEN,
	SqlLexer.TO,
	SqlLexer.TOP,
	SqlLexer.TRAN,
	SqlLexer.TRANSACTION,
	SqlLexer.TRIGGER,
	SqlLexer.TRUNCATE,
	SqlLexer.TRY_CONVERT,
	SqlLexer.TSEQUAL,
	SqlLexer.UNION,
	SqlLexer.UNIQUE,
	SqlLexer.UNPIVOT,
	SqlLexer.UPDATE,
	SqlLexer.UPDATETEXT,
	SqlLexer.USE,
	SqlLexer.USER,
	SqlLexer.VALUES,
	SqlLexer.VARYING,
	SqlLexer.VIEW,
	SqlLexer.WAITFOR,
	SqlLexer.WHEN,
	SqlLexer.WHERE,
	SqlLexer.WHILE,
	SqlLexer.WITH,
	SqlLexer.WITHIN,
	SqlLexer.WRITETEXT,
]);

const ObjectStartSet = new Set([
	SqlLexer.AGGREGATE,
	SqlLexer.APPICATION,
	SqlLexer.ASSEMBLY,
	SqlLexer.ASYMMETRIC,
	SqlLexer.AVAILABILITY,
	SqlLexer.BROKER,
	SqlLexer.CERTIFICATE,
	SqlLexer.COLUMNSTORE,
	SqlLexer.COLUMN,
	SqlLexer.CONTRACT,
	SqlLexer.CREDENTIAL,
	SqlLexer.CRYPTOGRAPHIC,
	SqlLexer.DATABASE,
	SqlLexer.DEFAULT,
	SqlLexer.ENDPOINT,
	SqlLexer.EVENT,
	SqlLexer.EXTERNAL,
	SqlLexer.FULLTEXT,
	SqlLexer.FUNCTION,
	SqlLexer.INDEX,
	SqlLexer.LOGIN,
	SqlLexer.MASTER,
	SqlLexer.MESSAGE,
	SqlLexer.PARTITION,
	SqlLexer.PROCEDURE,
	SqlLexer.QUEUE,
	SqlLexer.REMOTE,
	SqlLexer.RESOURCE,
	SqlLexer.ROLE,
	SqlLexer.ROUTE,
	SqlLexer.RULE,
	SqlLexer.SCHEMA,
	SqlLexer.SEARCH,
	SqlLexer.SECURITY,
	SqlLexer.SELECTIVE,
	SqlLexer.SEQUENCE,
	SqlLexer.SERVICE,
	SqlLexer.SIGNATURE,
	SqlLexer.SPATIAL,
	SqlLexer.STATISTICS,
	SqlLexer.SYMMETRIC,
	SqlLexer.SYNONYM,
	SqlLexer.TABLE,
	SqlLexer.TRIGGER,
	SqlLexer.TYPE,
	SqlLexer.USER,
	SqlLexer.VIEW,
	SqlLexer.WORKLOAD,
	SqlLexer.XML,
]);

export declare type MssqlLexerOptions = LexerOptions & {};

const Mode = {
	INITIAL: 0,
	SQL_START: 1,
	SQL_OBJECT_DEF: 2,
	SQL_PROC: 3,
	SQL_PART: Number.MAX_SAFE_INTEGER,
} as const;

const BLOCK_COMMENT_START = /\/\*.*?\*\//sy;
const BLOCK_COMMENT_PART = /.*?(?<!\/)\*\//sy;

export class MssqlLexer extends SqlLexer {
	constructor(options: { [key: string]: any } = {}) {
		super(
			"mssql",
			[
				{
					type: SqlLexer.BlockComment,
					re: (state) =>
						state.level > 0 ? BLOCK_COMMENT_PART : BLOCK_COMMENT_START,
					onMatch: (state, token) => this.onMatchBlockComment(state, token),
				},
				{ type: SqlLexer.LineComment, re: /--.*/y },
				{
					type: SqlLexer.LineBreak,
					re: /\n|\r\n?/y,
				},
				{
					type: SqlLexer.WhiteSpace,
					re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y,
				},
				{
					type: SqlLexer.Delimiter,
					re: /(?<=^|[\r\n])[ \t]*GO[ \t]*(\n|\r\n?|$)/iy,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlLexer.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n]):.+(\n|\r\n?|$)/y
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
					type: SqlLexer.Label,
					re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*:/y,
				},
				{ type: SqlLexer.Blob, re: /0[xX][0-9a-fA-F]*/y },
				{
					type: SqlLexer.Numeric,
					re: /([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlLexer.Dot, re: /\./y },
				{ type: SqlLexer.String, re: /[Nn]?'([^']|'')*'/y },
				{ type: SqlLexer.Identifier, re: /("([^"]|"")*"|\[[^\]]*\])/y },
				{ type: SqlLexer.BindVariable, re: /\?/y },
				{
					type: SqlLexer.BindVariable,
					re: /:[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlLexer.Variable,
					re: /@[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlLexer.Operator,
					re: /\|\||<<|>>|<>|::|[=<>!*/%^&|+-]=?|![<>]|[~]/y,
				},
				{
					type: SqlLexer.Identifier,
					re: /(@@)?[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);
	}

	isReserved(keyword: Keyword) {
		return super.isReserved(keyword) || DefaultReservedSet.has(keyword);
	}

	private onMatchBlockComment(state: Record<string, any>, token: Token) {
		if (state.comment) {
			let pos = 0;
			do {
				pos = token.text.indexOf("/*", pos);
				if (pos !== -1) {
					state.level++;
				}
			} while (pos !== -1);
			state.level--;

			state.comment.text += token.text;
			if (state.level === 0) {
				delete state.comment;
			}
			return [];
		} else {
			state.level = 0;
			let pos = 2;
			do {
				pos = token.text.indexOf("/*", pos);
				if (pos !== -1) {
					state.level++;
				}
			} while (pos !== -1);

			if (state.level > 0) {
				state.comment = token;
			}
		}
	}

	private onMatchCommand(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;
		return [token, new Token(SqlLexer.EoS, "")];
	}

	private onUnmatchCommand(state: Record<string, any>) {
		if (state.mode === Mode.INITIAL) {
			state.mode = Mode.SQL_START;
		}
	}

	private onMatchIdentifier(state: Record<string, any>, token: Token) {
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				if (
					token.keyword === SqlLexer.CREATE ||
					token.keyword === SqlLexer.ALTER
				) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					token.keyword === SqlLexer.IF ||
					token.keyword === SqlLexer.WHILE
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
					token.keyword === SqlLexer.PROCEDURE ||
					token.keyword === SqlLexer.TRIGGER
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			}
		}
	}

	private onMatchSemiColon(state: Record<string, any>, token: Token) {
		if (state.mode !== Mode.SQL_PROC) {
			state.mode = Mode.INITIAL;
			return [token, new Token(SqlLexer.EoS, "")];
		}
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		return [token, new Token(SqlLexer.EoS, "")];
	}
}
