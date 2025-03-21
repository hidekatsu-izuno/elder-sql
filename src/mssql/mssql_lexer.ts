import {
	Keyword,
	Lexer,
	type LexerOptions,
	type Token,
	TokenType,
} from "../lexer.js";

const ReservedSet = new Set<Keyword>([
	Keyword.ADD,
	Keyword.ALL,
	Keyword.ALTER,
	Keyword.AND,
	Keyword.ANY,
	Keyword.AS,
	Keyword.ASC,
	Keyword.AUTHORIZATION,
	Keyword.BACKUP,
	Keyword.BEGIN,
	Keyword.BETWEEN,
	Keyword.BREAK,
	Keyword.BROWSE,
	Keyword.BULK,
	Keyword.BY,
	Keyword.CASCADE,
	Keyword.CASE,
	Keyword.CHECK,
	Keyword.CHECKPOINT,
	Keyword.CLOSE,
	Keyword.CLUSTERED,
	Keyword.COALESCE,
	Keyword.COLLATE,
	Keyword.COLUMN,
	Keyword.COMMIT,
	Keyword.COMPUTE,
	Keyword.CONSTRAINT,
	Keyword.CONTAINS,
	Keyword.CONTAINSTABLE,
	Keyword.CONTINUE,
	Keyword.CONVERT,
	Keyword.CREATE,
	Keyword.CROSS,
	Keyword.CURRENT,
	Keyword.CURRENT_DATE,
	Keyword.CURRENT_TIME,
	Keyword.CURRENT_TIMESTAMP,
	Keyword.CURRENT_USER,
	Keyword.CURSOR,
	Keyword.DATABASE,
	Keyword.DBCC,
	Keyword.DEALLOCATE,
	Keyword.DECLARE,
	Keyword.DEFAULT,
	Keyword.DELETE,
	Keyword.DENY,
	Keyword.DESC,
	Keyword.DISK,
	Keyword.DISTINCT,
	Keyword.DISTRIBUTED,
	Keyword.DOUBLE,
	Keyword.DROP,
	Keyword.DUMP,
	Keyword.ELSE,
	Keyword.END,
	Keyword.ERRLVL,
	Keyword.ESCAPE,
	Keyword.EXCEPT,
	Keyword.EXEC,
	Keyword.EXECUTE,
	Keyword.EXISTS,
	Keyword.EXIT,
	Keyword.EXTERNAL,
	Keyword.FETCH,
	Keyword.FILE,
	Keyword.FILLFACTOR,
	Keyword.FOR,
	Keyword.FOREIGN,
	Keyword.FREETEXT,
	Keyword.FREETEXTTABLE,
	Keyword.FROM,
	Keyword.FULL,
	Keyword.FUNCTION,
	Keyword.GOTO,
	Keyword.GRANT,
	Keyword.GROUP,
	Keyword.HAVING,
	Keyword.HOLDLOCK,
	Keyword.IDENTITY,
	Keyword.IDENTITYCOL,
	Keyword.IDENTITY_INSERT,
	Keyword.IF,
	Keyword.IN,
	Keyword.INDEX,
	Keyword.INNER,
	Keyword.INSERT,
	Keyword.INTERSECT,
	Keyword.INTO,
	Keyword.IS,
	Keyword.JOIN,
	Keyword.KEY,
	Keyword.KILL,
	Keyword.LEFT,
	Keyword.LIKE,
	Keyword.LINENO,
	Keyword.LOAD,
	Keyword.MERGE,
	Keyword.NATIONAL,
	Keyword.NOCHECK,
	Keyword.NONCLUSTERED,
	Keyword.NOT,
	Keyword.NULL,
	Keyword.NULLIF,
	Keyword.OF,
	Keyword.OFF,
	Keyword.OFFSETS,
	Keyword.ON,
	Keyword.OPEN,
	Keyword.OPENDATASOURCE,
	Keyword.OPENQUERY,
	Keyword.OPENROWSET,
	Keyword.OPENXML,
	Keyword.OPTION,
	Keyword.OR,
	Keyword.ORDER,
	Keyword.OUTER,
	Keyword.OVER,
	Keyword.PERCENT,
	Keyword.PIVOT,
	Keyword.PLAN,
	Keyword.PRECISION,
	Keyword.PRIMARY,
	Keyword.PRINT,
	Keyword.PROC,
	Keyword.PROCEDURE,
	Keyword.PUBLIC,
	Keyword.RAISERROR,
	Keyword.READ,
	Keyword.READTEXT,
	Keyword.RECONFIGURE,
	Keyword.REFERENCES,
	Keyword.REPLICATION,
	Keyword.RESTORE,
	Keyword.RESTRICT,
	Keyword.RETURN,
	Keyword.REVERT,
	Keyword.REVOKE,
	Keyword.RIGHT,
	Keyword.ROLLBACK,
	Keyword.ROWCOUNT,
	Keyword.ROWGUIDCOL,
	Keyword.RULE,
	Keyword.SAVE,
	Keyword.SCHEMA,
	Keyword.SECURITYAUDIT,
	Keyword.SELECT,
	Keyword.SEMANTICKEYPHRASETABLE,
	Keyword.SEMANTICSIMILARITYDETAILSTABLE,
	Keyword.SEMANTICSIMILARITYTABLE,
	Keyword.SESSION_USER,
	Keyword.SET,
	Keyword.SETUSER,
	Keyword.SHUTDOWN,
	Keyword.SOME,
	Keyword.STATISTICS,
	Keyword.SYSTEM_USER,
	Keyword.TABLE,
	Keyword.TABLESAMPLE,
	Keyword.TEXTSIZE,
	Keyword.THEN,
	Keyword.TO,
	Keyword.TOP,
	Keyword.TRAN,
	Keyword.TRANSACTION,
	Keyword.TRIGGER,
	Keyword.TRUNCATE,
	Keyword.TRY_CONVERT,
	Keyword.TSEQUAL,
	Keyword.UNION,
	Keyword.UNIQUE,
	Keyword.UNPIVOT,
	Keyword.UPDATE,
	Keyword.UPDATETEXT,
	Keyword.USE,
	Keyword.USER,
	Keyword.VALUES,
	Keyword.VARYING,
	Keyword.VIEW,
	Keyword.WAITFOR,
	Keyword.WHEN,
	Keyword.WHERE,
	Keyword.WHILE,
	Keyword.WITH,
	Keyword.WITHIN,
	Keyword.WRITETEXT,
]);

const StatementStartSet = new Set<Keyword>([
	Keyword.ADD,
	Keyword.ALTER,
	Keyword.BACKUP,
	Keyword.BEGIN,
	Keyword.BULK,
	Keyword.CLOSE,
	Keyword.CREATE,
	Keyword.DECLARE,
	Keyword.DELETE,
	Keyword.DENY,
	Keyword.DISABLE,
	Keyword.DROP,
	Keyword.ENABLE,
	Keyword.END,
	Keyword.GRANT,
	Keyword.GET,
	Keyword.INSERT,
	Keyword.UPDATE,
	Keyword.UPDATETEXT,
	Keyword.MERGE,
	Keyword.MOVE,
	Keyword.OPEN,
	Keyword.READTEXT,
	Keyword.RECEIVE,
	Keyword.REVERT,
	Keyword.REVOKE,
	Keyword.RESTORE,
	Keyword.SEND,
	Keyword.SET,
	Keyword.SETUSER,
	Keyword.TRUNCATE,
	Keyword.WAITFOR,
	Keyword.WITH,
	Keyword.WRITETEXT,
]);

const ObjectStartSet = new Set<Keyword>([
	Keyword.AGGREGATE,
	Keyword.APPICATION,
	Keyword.ASSEMBLY,
	Keyword.ASYMMETRIC,
	Keyword.AVAILABILITY,
	Keyword.BROKER,
	Keyword.CERTIFICATE,
	Keyword.COLUMNSTORE,
	Keyword.COLUMN,
	Keyword.CONTRACT,
	Keyword.CREDENTIAL,
	Keyword.CRYPTOGRAPHIC,
	Keyword.DATABASE,
	Keyword.DEFAULT,
	Keyword.ENDPOINT,
	Keyword.EVENT,
	Keyword.EXTERNAL,
	Keyword.FULLTEXT,
	Keyword.FUNCTION,
	Keyword.INDEX,
	Keyword.LOGIN,
	Keyword.MASTER,
	Keyword.MESSAGE,
	Keyword.PARTITION,
	Keyword.PROCEDURE,
	Keyword.QUEUE,
	Keyword.REMOTE,
	Keyword.RESOURCE,
	Keyword.ROLE,
	Keyword.ROUTE,
	Keyword.RULE,
	Keyword.SCHEMA,
	Keyword.SEARCH,
	Keyword.SECURITY,
	Keyword.SELECTIVE,
	Keyword.SEQUENCE,
	Keyword.SERVICE,
	Keyword.SIGNATURE,
	Keyword.SPATIAL,
	Keyword.STATISTICS,
	Keyword.SYMMETRIC,
	Keyword.SYNONYM,
	Keyword.TABLE,
	Keyword.TRIGGER,
	Keyword.TYPE,
	Keyword.USER,
	Keyword.VIEW,
	Keyword.WORKLOAD,
	Keyword.XML,
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
					type: TokenType.BlockComment,
					re: (state) =>
						state.level > 0 ? BLOCK_COMMENT_PART : BLOCK_COMMENT_START,
					onMatch: (state, token) => this.onMatchBlockComment(state, token),
				},
				{ type: TokenType.LineComment, re: /--.*/y },
				{ type: TokenType.LineBreak, re: /\n|\r\n?/y },
				{
					type: TokenType.WhiteSpace,
					re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y,
				},
				{
					type: TokenType.Delimiter,
					re: /(?<=^|[\r\n])[ \t]*GO[ \t]*(\n|\r\n?|$)/iy,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: TokenType.Command,
					re: (state) =>
						state.mode === Mode.INITIAL
							? /(?<=^|[\r\n]):.+(\n|\r\n?|$)/y
							: false,
					onMatch: (state, token) => this.onMatchCommand(state, token),
					onUnmatch: (state) => this.onUnmatchCommand(state),
				},
				{
					type: TokenType.SemiColon,
					re: /;/y,
					onMatch: (state, token) => this.onMatchSemiColon(state, token),
				},
				{ type: TokenType.LeftBrace, re: /\{/y },
				{ type: TokenType.RightBrace, re: /\}/y },
				{ type: TokenType.LeftParen, re: /\(/y },
				{ type: TokenType.RightParen, re: /\)/y },
				{ type: TokenType.Comma, re: /,/y },
				{
					type: TokenType.Label,
					re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*:/y,
				},
				{ type: TokenType.Blob, re: /0[xX][0-9a-fA-F]*/y },
				{
					type: TokenType.Numeric,
					re: /([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: TokenType.Dot, re: /\./y },
				{ type: TokenType.String, re: /[Nn]?'([^']|'')*'/y },
				{ type: TokenType.Identifier, re: /("([^"]|"")*"|\[[^\]]*\])/y },
				{ type: TokenType.BindVariable, re: /\?/y },
				{
					type: TokenType.BindVariable,
					re: /:[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: TokenType.Variable,
					re: /@[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: TokenType.Operator,
					re: /\|\||<<|>>|<>|::|[=<>!*/%^&|+-]=?|![<>]|[~]/y,
				},
				{
					type: TokenType.Identifier,
					re: /(@@)?[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
				{ type: TokenType.Error, re: /./y },
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
		const keyword = Keyword.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (this.isReserved(keyword)) {
				token.type = TokenType.Reserved;
			}

			if (state.mode === Mode.SQL_START) {
				if (keyword === Keyword.CREATE || keyword === Keyword.ALTER) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (keyword === Keyword.IF || keyword === Keyword.WHILE) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				MssqlLexer.isObjectStart(keyword)
			) {
				if (
					keyword === Keyword.FUNCTION ||
					keyword === Keyword.PROCEDURE ||
					keyword === Keyword.TRIGGER
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
