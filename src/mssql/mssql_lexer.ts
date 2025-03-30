import {
	type Keyword,
	Lexer,
	type LexerOptions,
	type Token,
} from "../lexer.js";
import { SqlKeyword, SqlTokenType } from "../sql.js";

const ReservedSet = new Set<Keyword>([
	SqlKeyword.ADD,
	SqlKeyword.ALL,
	SqlKeyword.ALTER,
	SqlKeyword.AND,
	SqlKeyword.ANY,
	SqlKeyword.AS,
	SqlKeyword.ASC,
	SqlKeyword.AUTHORIZATION,
	SqlKeyword.BACKUP,
	SqlKeyword.BEGIN,
	SqlKeyword.BETWEEN,
	SqlKeyword.BREAK,
	SqlKeyword.BROWSE,
	SqlKeyword.BULK,
	SqlKeyword.BY,
	SqlKeyword.CASCADE,
	SqlKeyword.CASE,
	SqlKeyword.CHECK,
	SqlKeyword.CHECKPOINT,
	SqlKeyword.CLOSE,
	SqlKeyword.CLUSTERED,
	SqlKeyword.COALESCE,
	SqlKeyword.COLLATE,
	SqlKeyword.COLUMN,
	SqlKeyword.COMMIT,
	SqlKeyword.COMPUTE,
	SqlKeyword.CONSTRAINT,
	SqlKeyword.CONTAINS,
	SqlKeyword.CONTAINSTABLE,
	SqlKeyword.CONTINUE,
	SqlKeyword.CONVERT,
	SqlKeyword.CREATE,
	SqlKeyword.CROSS,
	SqlKeyword.CURRENT,
	SqlKeyword.CURRENT_DATE,
	SqlKeyword.CURRENT_TIME,
	SqlKeyword.CURRENT_TIMESTAMP,
	SqlKeyword.CURRENT_USER,
	SqlKeyword.CURSOR,
	SqlKeyword.DATABASE,
	SqlKeyword.DBCC,
	SqlKeyword.DEALLOCATE,
	SqlKeyword.DECLARE,
	SqlKeyword.DEFAULT,
	SqlKeyword.DELETE,
	SqlKeyword.DENY,
	SqlKeyword.DESC,
	SqlKeyword.DISK,
	SqlKeyword.DISTINCT,
	SqlKeyword.DISTRIBUTED,
	SqlKeyword.DOUBLE,
	SqlKeyword.DROP,
	SqlKeyword.DUMP,
	SqlKeyword.ELSE,
	SqlKeyword.END,
	SqlKeyword.ERRLVL,
	SqlKeyword.ESCAPE,
	SqlKeyword.EXCEPT,
	SqlKeyword.EXEC,
	SqlKeyword.EXECUTE,
	SqlKeyword.EXISTS,
	SqlKeyword.EXIT,
	SqlKeyword.EXTERNAL,
	SqlKeyword.FETCH,
	SqlKeyword.FILE,
	SqlKeyword.FILLFACTOR,
	SqlKeyword.FOR,
	SqlKeyword.FOREIGN,
	SqlKeyword.FREETEXT,
	SqlKeyword.FREETEXTTABLE,
	SqlKeyword.FROM,
	SqlKeyword.FULL,
	SqlKeyword.FUNCTION,
	SqlKeyword.GOTO,
	SqlKeyword.GRANT,
	SqlKeyword.GROUP,
	SqlKeyword.HAVING,
	SqlKeyword.HOLDLOCK,
	SqlKeyword.IDENTITY,
	SqlKeyword.IDENTITYCOL,
	SqlKeyword.IDENTITY_INSERT,
	SqlKeyword.IF,
	SqlKeyword.IN,
	SqlKeyword.INDEX,
	SqlKeyword.INNER,
	SqlKeyword.INSERT,
	SqlKeyword.INTERSECT,
	SqlKeyword.INTO,
	SqlKeyword.IS,
	SqlKeyword.JOIN,
	SqlKeyword.KEY,
	SqlKeyword.KILL,
	SqlKeyword.LEFT,
	SqlKeyword.LIKE,
	SqlKeyword.LINENO,
	SqlKeyword.LOAD,
	SqlKeyword.MERGE,
	SqlKeyword.NATIONAL,
	SqlKeyword.NOCHECK,
	SqlKeyword.NONCLUSTERED,
	SqlKeyword.NOT,
	SqlKeyword.NULL,
	SqlKeyword.NULLIF,
	SqlKeyword.OF,
	SqlKeyword.OFF,
	SqlKeyword.OFFSETS,
	SqlKeyword.ON,
	SqlKeyword.OPEN,
	SqlKeyword.OPENDATASOURCE,
	SqlKeyword.OPENQUERY,
	SqlKeyword.OPENROWSET,
	SqlKeyword.OPENXML,
	SqlKeyword.OPTION,
	SqlKeyword.OR,
	SqlKeyword.ORDER,
	SqlKeyword.OUTER,
	SqlKeyword.OVER,
	SqlKeyword.PERCENT,
	SqlKeyword.PIVOT,
	SqlKeyword.PLAN,
	SqlKeyword.PRECISION,
	SqlKeyword.PRIMARY,
	SqlKeyword.PRINT,
	SqlKeyword.PROC,
	SqlKeyword.PROCEDURE,
	SqlKeyword.PUBLIC,
	SqlKeyword.RAISERROR,
	SqlKeyword.READ,
	SqlKeyword.READTEXT,
	SqlKeyword.RECONFIGURE,
	SqlKeyword.REFERENCES,
	SqlKeyword.REPLICATION,
	SqlKeyword.RESTORE,
	SqlKeyword.RESTRICT,
	SqlKeyword.RETURN,
	SqlKeyword.REVERT,
	SqlKeyword.REVOKE,
	SqlKeyword.RIGHT,
	SqlKeyword.ROLLBACK,
	SqlKeyword.ROWCOUNT,
	SqlKeyword.ROWGUIDCOL,
	SqlKeyword.RULE,
	SqlKeyword.SAVE,
	SqlKeyword.SCHEMA,
	SqlKeyword.SECURITYAUDIT,
	SqlKeyword.SELECT,
	SqlKeyword.SEMANTICKEYPHRASETABLE,
	SqlKeyword.SEMANTICSIMILARITYDETAILSTABLE,
	SqlKeyword.SEMANTICSIMILARITYTABLE,
	SqlKeyword.SESSION_USER,
	SqlKeyword.SET,
	SqlKeyword.SETUSER,
	SqlKeyword.SHUTDOWN,
	SqlKeyword.SOME,
	SqlKeyword.STATISTICS,
	SqlKeyword.SYSTEM_USER,
	SqlKeyword.TABLE,
	SqlKeyword.TABLESAMPLE,
	SqlKeyword.TEXTSIZE,
	SqlKeyword.THEN,
	SqlKeyword.TO,
	SqlKeyword.TOP,
	SqlKeyword.TRAN,
	SqlKeyword.TRANSACTION,
	SqlKeyword.TRIGGER,
	SqlKeyword.TRUNCATE,
	SqlKeyword.TRY_CONVERT,
	SqlKeyword.TSEQUAL,
	SqlKeyword.UNION,
	SqlKeyword.UNIQUE,
	SqlKeyword.UNPIVOT,
	SqlKeyword.UPDATE,
	SqlKeyword.UPDATETEXT,
	SqlKeyword.USE,
	SqlKeyword.USER,
	SqlKeyword.VALUES,
	SqlKeyword.VARYING,
	SqlKeyword.VIEW,
	SqlKeyword.WAITFOR,
	SqlKeyword.WHEN,
	SqlKeyword.WHERE,
	SqlKeyword.WHILE,
	SqlKeyword.WITH,
	SqlKeyword.WITHIN,
	SqlKeyword.WRITETEXT,
]);

const StatementStartSet = new Set<Keyword>([
	SqlKeyword.ADD,
	SqlKeyword.ALTER,
	SqlKeyword.BACKUP,
	SqlKeyword.BEGIN,
	SqlKeyword.BULK,
	SqlKeyword.CLOSE,
	SqlKeyword.CREATE,
	SqlKeyword.DECLARE,
	SqlKeyword.DELETE,
	SqlKeyword.DENY,
	SqlKeyword.DISABLE,
	SqlKeyword.DROP,
	SqlKeyword.ENABLE,
	SqlKeyword.END,
	SqlKeyword.GRANT,
	SqlKeyword.GET,
	SqlKeyword.INSERT,
	SqlKeyword.UPDATE,
	SqlKeyword.UPDATETEXT,
	SqlKeyword.MERGE,
	SqlKeyword.MOVE,
	SqlKeyword.OPEN,
	SqlKeyword.READTEXT,
	SqlKeyword.RECEIVE,
	SqlKeyword.REVERT,
	SqlKeyword.REVOKE,
	SqlKeyword.RESTORE,
	SqlKeyword.SEND,
	SqlKeyword.SET,
	SqlKeyword.SETUSER,
	SqlKeyword.TRUNCATE,
	SqlKeyword.WAITFOR,
	SqlKeyword.WITH,
	SqlKeyword.WRITETEXT,
]);

const ObjectStartSet = new Set<Keyword>([
	SqlKeyword.AGGREGATE,
	SqlKeyword.APPICATION,
	SqlKeyword.ASSEMBLY,
	SqlKeyword.ASYMMETRIC,
	SqlKeyword.AVAILABILITY,
	SqlKeyword.BROKER,
	SqlKeyword.CERTIFICATE,
	SqlKeyword.COLUMNSTORE,
	SqlKeyword.COLUMN,
	SqlKeyword.CONTRACT,
	SqlKeyword.CREDENTIAL,
	SqlKeyword.CRYPTOGRAPHIC,
	SqlKeyword.DATABASE,
	SqlKeyword.DEFAULT,
	SqlKeyword.ENDPOINT,
	SqlKeyword.EVENT,
	SqlKeyword.EXTERNAL,
	SqlKeyword.FULLTEXT,
	SqlKeyword.FUNCTION,
	SqlKeyword.INDEX,
	SqlKeyword.LOGIN,
	SqlKeyword.MASTER,
	SqlKeyword.MESSAGE,
	SqlKeyword.PARTITION,
	SqlKeyword.PROCEDURE,
	SqlKeyword.QUEUE,
	SqlKeyword.REMOTE,
	SqlKeyword.RESOURCE,
	SqlKeyword.ROLE,
	SqlKeyword.ROUTE,
	SqlKeyword.RULE,
	SqlKeyword.SCHEMA,
	SqlKeyword.SEARCH,
	SqlKeyword.SECURITY,
	SqlKeyword.SELECTIVE,
	SqlKeyword.SEQUENCE,
	SqlKeyword.SERVICE,
	SqlKeyword.SIGNATURE,
	SqlKeyword.SPATIAL,
	SqlKeyword.STATISTICS,
	SqlKeyword.SYMMETRIC,
	SqlKeyword.SYNONYM,
	SqlKeyword.TABLE,
	SqlKeyword.TRIGGER,
	SqlKeyword.TYPE,
	SqlKeyword.USER,
	SqlKeyword.VIEW,
	SqlKeyword.WORKLOAD,
	SqlKeyword.XML,
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

export class MssqlLexer extends Lexer {
	static isStatementStart(keyword: Keyword) {
		return keyword != null && StatementStartSet.has(keyword);
	}

	static isObjectStart(keyword?: Keyword) {
		return keyword != null && ObjectStartSet.has(keyword);
	}

	constructor(options: { [key: string]: any } = {}) {
		super(
			"mssql",
			[
				{
					type: SqlTokenType.BlockComment,
					re: (state) =>
						state.level > 0 ? BLOCK_COMMENT_PART : BLOCK_COMMENT_START,
					skip: true,
					onMatch: (state, token) => this.onMatchBlockComment(state, token),
				},
				{ type: SqlTokenType.LineComment, re: /--.*/y, skip: true },
				{ type: SqlTokenType.LineBreak, re: /\n|\r\n?/y, skip: true },
				{
					type: SqlTokenType.WhiteSpace,
					skip: true,
					re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y,
				},
				{
					type: SqlTokenType.Delimiter,
					re: /(?<=^|[\r\n])[ \t]*GO[ \t]*(\n|\r\n?|$)/iy,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlTokenType.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n]):.+(\n|\r\n?|$)/y
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
					type: SqlTokenType.Label,
					re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*:/y,
				},
				{ type: SqlTokenType.Blob, re: /0[xX][0-9a-fA-F]*/y },
				{
					type: SqlTokenType.Numeric,
					re: /([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Dot, re: /\./y },
				{ type: SqlTokenType.String, re: /[Nn]?'([^']|'')*'/y },
				{ type: SqlTokenType.Identifier, re: /("([^"]|"")*"|\[[^\]]*\])/y },
				{ type: SqlTokenType.BindVariable, re: /\?/y },
				{
					type: SqlTokenType.BindVariable,
					re: /:[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlTokenType.Variable,
					re: /@[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlTokenType.Operator,
					re: /\|\||<<|>>|<>|::|[=<>!*/%^&|+-]=?|![<>]|[~]/y,
				},
				{
					type: SqlTokenType.Identifier,
					re: /(@@)?[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
				{ type: SqlTokenType.Error, re: /./y },
			],
			options,
		);
	}

	isReserved(keyword: Keyword) {
		return keyword != null && ReservedSet.has(keyword);
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
		//TODO
		token.eos = true;
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
				if (keyword === SqlKeyword.CREATE || keyword === SqlKeyword.ALTER) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (keyword === SqlKeyword.IF || keyword === SqlKeyword.WHILE) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				MssqlLexer.isObjectStart(keyword)
			) {
				if (
					keyword === SqlKeyword.FUNCTION ||
					keyword === SqlKeyword.PROCEDURE ||
					keyword === SqlKeyword.TRIGGER
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
			token.eos = true;
		}
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		token.eos = true;
	}
}
