import {
	type Keyword,
	Lexer,
	type LexerOptions,
	type Token,
} from "../lexer.js";
import { SqlKeywords, SqlTokenType } from "../sql.js";

const ReservedSet = new Set<Keyword>([
	SqlKeywords.ADD,
	SqlKeywords.ALL,
	SqlKeywords.ALTER,
	SqlKeywords.AND,
	SqlKeywords.ANY,
	SqlKeywords.AS,
	SqlKeywords.ASC,
	SqlKeywords.AUTHORIZATION,
	SqlKeywords.BACKUP,
	SqlKeywords.BEGIN,
	SqlKeywords.BETWEEN,
	SqlKeywords.BREAK,
	SqlKeywords.BROWSE,
	SqlKeywords.BULK,
	SqlKeywords.BY,
	SqlKeywords.CASCADE,
	SqlKeywords.CASE,
	SqlKeywords.CHECK,
	SqlKeywords.CHECKPOINT,
	SqlKeywords.CLOSE,
	SqlKeywords.CLUSTERED,
	SqlKeywords.COALESCE,
	SqlKeywords.COLLATE,
	SqlKeywords.COLUMN,
	SqlKeywords.COMMIT,
	SqlKeywords.COMPUTE,
	SqlKeywords.CONSTRAINT,
	SqlKeywords.CONTAINS,
	SqlKeywords.CONTAINSTABLE,
	SqlKeywords.CONTINUE,
	SqlKeywords.CONVERT,
	SqlKeywords.CREATE,
	SqlKeywords.CROSS,
	SqlKeywords.CURRENT,
	SqlKeywords.CURRENT_DATE,
	SqlKeywords.CURRENT_TIME,
	SqlKeywords.CURRENT_TIMESTAMP,
	SqlKeywords.CURRENT_USER,
	SqlKeywords.CURSOR,
	SqlKeywords.DATABASE,
	SqlKeywords.DBCC,
	SqlKeywords.DEALLOCATE,
	SqlKeywords.DECLARE,
	SqlKeywords.DEFAULT,
	SqlKeywords.DELETE,
	SqlKeywords.DENY,
	SqlKeywords.DESC,
	SqlKeywords.DISK,
	SqlKeywords.DISTINCT,
	SqlKeywords.DISTRIBUTED,
	SqlKeywords.DOUBLE,
	SqlKeywords.DROP,
	SqlKeywords.DUMP,
	SqlKeywords.ELSE,
	SqlKeywords.END,
	SqlKeywords.ERRLVL,
	SqlKeywords.ESCAPE,
	SqlKeywords.EXCEPT,
	SqlKeywords.EXEC,
	SqlKeywords.EXECUTE,
	SqlKeywords.EXISTS,
	SqlKeywords.EXIT,
	SqlKeywords.EXTERNAL,
	SqlKeywords.FETCH,
	SqlKeywords.FILE,
	SqlKeywords.FILLFACTOR,
	SqlKeywords.FOR,
	SqlKeywords.FOREIGN,
	SqlKeywords.FREETEXT,
	SqlKeywords.FREETEXTTABLE,
	SqlKeywords.FROM,
	SqlKeywords.FULL,
	SqlKeywords.FUNCTION,
	SqlKeywords.GOTO,
	SqlKeywords.GRANT,
	SqlKeywords.GROUP,
	SqlKeywords.HAVING,
	SqlKeywords.HOLDLOCK,
	SqlKeywords.IDENTITY,
	SqlKeywords.IDENTITYCOL,
	SqlKeywords.IDENTITY_INSERT,
	SqlKeywords.IF,
	SqlKeywords.IN,
	SqlKeywords.INDEX,
	SqlKeywords.INNER,
	SqlKeywords.INSERT,
	SqlKeywords.INTERSECT,
	SqlKeywords.INTO,
	SqlKeywords.IS,
	SqlKeywords.JOIN,
	SqlKeywords.KEY,
	SqlKeywords.KILL,
	SqlKeywords.LEFT,
	SqlKeywords.LIKE,
	SqlKeywords.LINENO,
	SqlKeywords.LOAD,
	SqlKeywords.MERGE,
	SqlKeywords.NATIONAL,
	SqlKeywords.NOCHECK,
	SqlKeywords.NONCLUSTERED,
	SqlKeywords.NOT,
	SqlKeywords.NULL,
	SqlKeywords.NULLIF,
	SqlKeywords.OF,
	SqlKeywords.OFF,
	SqlKeywords.OFFSETS,
	SqlKeywords.ON,
	SqlKeywords.OPEN,
	SqlKeywords.OPENDATASOURCE,
	SqlKeywords.OPENQUERY,
	SqlKeywords.OPENROWSET,
	SqlKeywords.OPENXML,
	SqlKeywords.OPTION,
	SqlKeywords.OR,
	SqlKeywords.ORDER,
	SqlKeywords.OUTER,
	SqlKeywords.OVER,
	SqlKeywords.PERCENT,
	SqlKeywords.PIVOT,
	SqlKeywords.PLAN,
	SqlKeywords.PRECISION,
	SqlKeywords.PRIMARY,
	SqlKeywords.PRINT,
	SqlKeywords.PROC,
	SqlKeywords.PROCEDURE,
	SqlKeywords.PUBLIC,
	SqlKeywords.RAISERROR,
	SqlKeywords.READ,
	SqlKeywords.READTEXT,
	SqlKeywords.RECONFIGURE,
	SqlKeywords.REFERENCES,
	SqlKeywords.REPLICATION,
	SqlKeywords.RESTORE,
	SqlKeywords.RESTRICT,
	SqlKeywords.RETURN,
	SqlKeywords.REVERT,
	SqlKeywords.REVOKE,
	SqlKeywords.RIGHT,
	SqlKeywords.ROLLBACK,
	SqlKeywords.ROWCOUNT,
	SqlKeywords.ROWGUIDCOL,
	SqlKeywords.RULE,
	SqlKeywords.SAVE,
	SqlKeywords.SCHEMA,
	SqlKeywords.SECURITYAUDIT,
	SqlKeywords.SELECT,
	SqlKeywords.SEMANTICKEYPHRASETABLE,
	SqlKeywords.SEMANTICSIMILARITYDETAILSTABLE,
	SqlKeywords.SEMANTICSIMILARITYTABLE,
	SqlKeywords.SESSION_USER,
	SqlKeywords.SET,
	SqlKeywords.SETUSER,
	SqlKeywords.SHUTDOWN,
	SqlKeywords.SOME,
	SqlKeywords.STATISTICS,
	SqlKeywords.SYSTEM_USER,
	SqlKeywords.TABLE,
	SqlKeywords.TABLESAMPLE,
	SqlKeywords.TEXTSIZE,
	SqlKeywords.THEN,
	SqlKeywords.TO,
	SqlKeywords.TOP,
	SqlKeywords.TRAN,
	SqlKeywords.TRANSACTION,
	SqlKeywords.TRIGGER,
	SqlKeywords.TRUNCATE,
	SqlKeywords.TRY_CONVERT,
	SqlKeywords.TSEQUAL,
	SqlKeywords.UNION,
	SqlKeywords.UNIQUE,
	SqlKeywords.UNPIVOT,
	SqlKeywords.UPDATE,
	SqlKeywords.UPDATETEXT,
	SqlKeywords.USE,
	SqlKeywords.USER,
	SqlKeywords.VALUES,
	SqlKeywords.VARYING,
	SqlKeywords.VIEW,
	SqlKeywords.WAITFOR,
	SqlKeywords.WHEN,
	SqlKeywords.WHERE,
	SqlKeywords.WHILE,
	SqlKeywords.WITH,
	SqlKeywords.WITHIN,
	SqlKeywords.WRITETEXT,
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
				{
					type: SqlTokenType.LineBreak,
					re: /\n|\r\n?/y,
					skip: true,
					separator: true,
				},
				{
					type: SqlTokenType.WhiteSpace,
					skip: true,
					re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y,
				},
				{
					type: SqlTokenType.Delimiter,
					re: /(?<=^|[\r\n])[ \t]*GO[ \t]*(\n|\r\n?|$)/iy,
					separator: true,
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
					separator: true,
					onMatch: (state, token) => this.onMatchSemiColon(state, token),
				},
				{ type: SqlTokenType.LeftBrace, re: /\{/y, separator: true },
				{ type: SqlTokenType.RightBrace, re: /\}/y, separator: true },
				{ type: SqlTokenType.LeftParen, re: /\(/y, separator: true },
				{ type: SqlTokenType.RightParen, re: /\)/y, separator: true },
				{ type: SqlTokenType.Comma, re: /,/y, separator: true },
				{
					type: SqlTokenType.Label,
					re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*:/y,
				},
				{ type: SqlTokenType.Blob, re: /0[xX][0-9a-fA-F]*/y },
				{
					type: SqlTokenType.Numeric,
					re: /([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Dot, re: /\./y, separator: true },
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
					separator: true,
				},
				{
					type: SqlTokenType.Identifier,
					re: /(@@)?[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
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
		const keyword = SqlKeywords.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (this.isReserved(keyword)) {
				token.type = SqlTokenType.Reserved;
			}

			if (state.mode === Mode.SQL_START) {
				if (keyword === SqlKeywords.CREATE || keyword === SqlKeywords.ALTER) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					keyword === SqlKeywords.IF ||
					keyword === SqlKeywords.WHILE
				) {
					state.mode = Mode.SQL_PROC;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				(keyword === SqlKeywords.AGGREGATE ||
					keyword === SqlKeywords.APPICATION ||
					keyword === SqlKeywords.ASSEMBLY ||
					keyword === SqlKeywords.ASYMMETRIC ||
					keyword === SqlKeywords.AVAILABILITY ||
					keyword === SqlKeywords.BROKER ||
					keyword === SqlKeywords.CERTIFICATE ||
					keyword === SqlKeywords.COLUMNSTORE ||
					keyword === SqlKeywords.COLUMN ||
					keyword === SqlKeywords.CONTRACT ||
					keyword === SqlKeywords.CREDENTIAL ||
					keyword === SqlKeywords.CRYPTOGRAPHIC ||
					keyword === SqlKeywords.DATABASE ||
					keyword === SqlKeywords.DEFAULT ||
					keyword === SqlKeywords.ENDPOINT ||
					keyword === SqlKeywords.EVENT ||
					keyword === SqlKeywords.EXTERNAL ||
					keyword === SqlKeywords.FULLTEXT ||
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.INDEX ||
					keyword === SqlKeywords.LOGIN ||
					keyword === SqlKeywords.MASTER ||
					keyword === SqlKeywords.MESSAGE ||
					keyword === SqlKeywords.PARTITION ||
					keyword === SqlKeywords.PROCEDURE ||
					keyword === SqlKeywords.QUEUE ||
					keyword === SqlKeywords.REMOTE ||
					keyword === SqlKeywords.RESOURCE ||
					keyword === SqlKeywords.ROLE ||
					keyword === SqlKeywords.ROUTE ||
					keyword === SqlKeywords.RULE ||
					keyword === SqlKeywords.SCHEMA ||
					keyword === SqlKeywords.SEARCH ||
					keyword === SqlKeywords.SECURITY ||
					keyword === SqlKeywords.SELECTIVE ||
					keyword === SqlKeywords.SEQUENCE ||
					keyword === SqlKeywords.SERVICE ||
					keyword === SqlKeywords.SIGNATURE ||
					keyword === SqlKeywords.SPATIAL ||
					keyword === SqlKeywords.STATISTICS ||
					keyword === SqlKeywords.SYMMETRIC ||
					keyword === SqlKeywords.SYNONYM ||
					keyword === SqlKeywords.TABLE ||
					keyword === SqlKeywords.TRIGGER ||
					keyword === SqlKeywords.TYPE ||
					keyword === SqlKeywords.USER ||
					keyword === SqlKeywords.VIEW ||
					keyword === SqlKeywords.WORKLOAD ||
					keyword === SqlKeywords.XML)
			) {
				if (
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.PROCEDURE ||
					keyword === SqlKeywords.TRIGGER
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
