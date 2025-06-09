import { Lexer, type LexerOptions, type Token } from "elder-parse";
import { SqlKeywords, SqlTokenType } from "../sql.ts";

const keywords = new SqlKeywords();
keywords.options(SqlKeywords.ADD).reserved = true;
keywords.options(SqlKeywords.ALL).reserved = true;
keywords.options(SqlKeywords.ALTER).reserved = true;
keywords.options(SqlKeywords.AND).reserved = true;
keywords.options(SqlKeywords.ANY).reserved = true;
keywords.options(SqlKeywords.AS).reserved = true;
keywords.options(SqlKeywords.ASC).reserved = true;
keywords.options(SqlKeywords.AUTHORIZATION).reserved = true;
keywords.options(SqlKeywords.BACKUP).reserved = true;
keywords.options(SqlKeywords.BEGIN).reserved = true;
keywords.options(SqlKeywords.BETWEEN).reserved = true;
keywords.options(SqlKeywords.BREAK).reserved = true;
keywords.options(SqlKeywords.BROWSE).reserved = true;
keywords.options(SqlKeywords.BULK).reserved = true;
keywords.options(SqlKeywords.BY).reserved = true;
keywords.options(SqlKeywords.CASCADE).reserved = true;
keywords.options(SqlKeywords.CASE).reserved = true;
keywords.options(SqlKeywords.CHECK).reserved = true;
keywords.options(SqlKeywords.CHECKPOINT).reserved = true;
keywords.options(SqlKeywords.CLOSE).reserved = true;
keywords.options(SqlKeywords.CLUSTERED).reserved = true;
keywords.options(SqlKeywords.COALESCE).reserved = true;
keywords.options(SqlKeywords.COLLATE).reserved = true;
keywords.options(SqlKeywords.COLUMN).reserved = true;
keywords.options(SqlKeywords.COMMIT).reserved = true;
keywords.options(SqlKeywords.COMPUTE).reserved = true;
keywords.options(SqlKeywords.CONSTRAINT).reserved = true;
keywords.options(SqlKeywords.CONTAINS).reserved = true;
keywords.options(SqlKeywords.CONTAINSTABLE).reserved = true;
keywords.options(SqlKeywords.CONTINUE).reserved = true;
keywords.options(SqlKeywords.CONVERT).reserved = true;
keywords.options(SqlKeywords.CREATE).reserved = true;
keywords.options(SqlKeywords.CROSS).reserved = true;
keywords.options(SqlKeywords.CURRENT).reserved = true;
keywords.options(SqlKeywords.CURRENT_DATE).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIME).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIMESTAMP).reserved = true;
keywords.options(SqlKeywords.CURRENT_USER).reserved = true;
keywords.options(SqlKeywords.CURSOR).reserved = true;
keywords.options(SqlKeywords.DATABASE).reserved = true;
keywords.options(SqlKeywords.DBCC).reserved = true;
keywords.options(SqlKeywords.DEALLOCATE).reserved = true;
keywords.options(SqlKeywords.DECLARE).reserved = true;
keywords.options(SqlKeywords.DEFAULT).reserved = true;
keywords.options(SqlKeywords.DELETE).reserved = true;
keywords.options(SqlKeywords.DENY).reserved = true;
keywords.options(SqlKeywords.DESC).reserved = true;
keywords.options(SqlKeywords.DISK).reserved = true;
keywords.options(SqlKeywords.DISTINCT).reserved = true;
keywords.options(SqlKeywords.DISTRIBUTED).reserved = true;
keywords.options(SqlKeywords.DOUBLE).reserved = true;
keywords.options(SqlKeywords.DROP).reserved = true;
keywords.options(SqlKeywords.DUMP).reserved = true;
keywords.options(SqlKeywords.ELSE).reserved = true;
keywords.options(SqlKeywords.END).reserved = true;
keywords.options(SqlKeywords.ERRLVL).reserved = true;
keywords.options(SqlKeywords.ESCAPE).reserved = true;
keywords.options(SqlKeywords.EXCEPT).reserved = true;
keywords.options(SqlKeywords.EXEC).reserved = true;
keywords.options(SqlKeywords.EXECUTE).reserved = true;
keywords.options(SqlKeywords.EXISTS).reserved = true;
keywords.options(SqlKeywords.EXIT).reserved = true;
keywords.options(SqlKeywords.EXTERNAL).reserved = true;
keywords.options(SqlKeywords.FETCH).reserved = true;
keywords.options(SqlKeywords.FILE).reserved = true;
keywords.options(SqlKeywords.FILLFACTOR).reserved = true;
keywords.options(SqlKeywords.FOR).reserved = true;
keywords.options(SqlKeywords.FOREIGN).reserved = true;
keywords.options(SqlKeywords.FREETEXT).reserved = true;
keywords.options(SqlKeywords.FREETEXTTABLE).reserved = true;
keywords.options(SqlKeywords.FROM).reserved = true;
keywords.options(SqlKeywords.FULL).reserved = true;
keywords.options(SqlKeywords.FUNCTION).reserved = true;
keywords.options(SqlKeywords.GOTO).reserved = true;
keywords.options(SqlKeywords.GRANT).reserved = true;
keywords.options(SqlKeywords.GROUP).reserved = true;
keywords.options(SqlKeywords.HAVING).reserved = true;
keywords.options(SqlKeywords.HOLDLOCK).reserved = true;
keywords.options(SqlKeywords.IDENTITY).reserved = true;
keywords.options(SqlKeywords.IDENTITYCOL).reserved = true;
keywords.options(SqlKeywords.IDENTITY_INSERT).reserved = true;
keywords.options(SqlKeywords.IF).reserved = true;
keywords.options(SqlKeywords.IN).reserved = true;
keywords.options(SqlKeywords.INDEX).reserved = true;
keywords.options(SqlKeywords.INNER).reserved = true;
keywords.options(SqlKeywords.INSERT).reserved = true;
keywords.options(SqlKeywords.INTERSECT).reserved = true;
keywords.options(SqlKeywords.INTO).reserved = true;
keywords.options(SqlKeywords.IS).reserved = true;
keywords.options(SqlKeywords.JOIN).reserved = true;
keywords.options(SqlKeywords.KEY).reserved = true;
keywords.options(SqlKeywords.KILL).reserved = true;
keywords.options(SqlKeywords.LEFT).reserved = true;
keywords.options(SqlKeywords.LIKE).reserved = true;
keywords.options(SqlKeywords.LINENO).reserved = true;
keywords.options(SqlKeywords.LOAD).reserved = true;
keywords.options(SqlKeywords.MERGE).reserved = true;
keywords.options(SqlKeywords.NATIONAL).reserved = true;
keywords.options(SqlKeywords.NOCHECK).reserved = true;
keywords.options(SqlKeywords.NONCLUSTERED).reserved = true;
keywords.options(SqlKeywords.NOT).reserved = true;
keywords.options(SqlKeywords.NULL).reserved = true;
keywords.options(SqlKeywords.NULLIF).reserved = true;
keywords.options(SqlKeywords.OF).reserved = true;
keywords.options(SqlKeywords.OFF).reserved = true;
keywords.options(SqlKeywords.OFFSETS).reserved = true;
keywords.options(SqlKeywords.ON).reserved = true;
keywords.options(SqlKeywords.OPEN).reserved = true;
keywords.options(SqlKeywords.OPENDATASOURCE).reserved = true;
keywords.options(SqlKeywords.OPENQUERY).reserved = true;
keywords.options(SqlKeywords.OPENROWSET).reserved = true;
keywords.options(SqlKeywords.OPENXML).reserved = true;
keywords.options(SqlKeywords.OPTION).reserved = true;
keywords.options(SqlKeywords.OR).reserved = true;
keywords.options(SqlKeywords.ORDER).reserved = true;
keywords.options(SqlKeywords.OUTER).reserved = true;
keywords.options(SqlKeywords.OVER).reserved = true;
keywords.options(SqlKeywords.PERCENT).reserved = true;
keywords.options(SqlKeywords.PIVOT).reserved = true;
keywords.options(SqlKeywords.PLAN).reserved = true;
keywords.options(SqlKeywords.PRECISION).reserved = true;
keywords.options(SqlKeywords.PRIMARY).reserved = true;
keywords.options(SqlKeywords.PRINT).reserved = true;
keywords.options(SqlKeywords.PROC).reserved = true;
keywords.options(SqlKeywords.PROCEDURE).reserved = true;
keywords.options(SqlKeywords.PUBLIC).reserved = true;
keywords.options(SqlKeywords.RAISERROR).reserved = true;
keywords.options(SqlKeywords.READ).reserved = true;
keywords.options(SqlKeywords.READTEXT).reserved = true;
keywords.options(SqlKeywords.RECONFIGURE).reserved = true;
keywords.options(SqlKeywords.REFERENCES).reserved = true;
keywords.options(SqlKeywords.REPLICATION).reserved = true;
keywords.options(SqlKeywords.RESTORE).reserved = true;
keywords.options(SqlKeywords.RESTRICT).reserved = true;
keywords.options(SqlKeywords.RETURN).reserved = true;
keywords.options(SqlKeywords.REVERT).reserved = true;
keywords.options(SqlKeywords.REVOKE).reserved = true;
keywords.options(SqlKeywords.RIGHT).reserved = true;
keywords.options(SqlKeywords.ROLLBACK).reserved = true;
keywords.options(SqlKeywords.ROWCOUNT).reserved = true;
keywords.options(SqlKeywords.ROWGUIDCOL).reserved = true;
keywords.options(SqlKeywords.RULE).reserved = true;
keywords.options(SqlKeywords.SAVE).reserved = true;
keywords.options(SqlKeywords.SCHEMA).reserved = true;
keywords.options(SqlKeywords.SECURITYAUDIT).reserved = true;
keywords.options(SqlKeywords.SELECT).reserved = true;
keywords.options(SqlKeywords.SEMANTICKEYPHRASETABLE).reserved = true;
keywords.options(SqlKeywords.SEMANTICSIMILARITYDETAILSTABLE).reserved = true;
keywords.options(SqlKeywords.SEMANTICSIMILARITYTABLE).reserved = true;
keywords.options(SqlKeywords.SESSION_USER).reserved = true;
keywords.options(SqlKeywords.SET).reserved = true;
keywords.options(SqlKeywords.SETUSER).reserved = true;
keywords.options(SqlKeywords.SHUTDOWN).reserved = true;
keywords.options(SqlKeywords.SOME).reserved = true;
keywords.options(SqlKeywords.STATISTICS).reserved = true;
keywords.options(SqlKeywords.SYSTEM_USER).reserved = true;
keywords.options(SqlKeywords.TABLE).reserved = true;
keywords.options(SqlKeywords.TABLESAMPLE).reserved = true;
keywords.options(SqlKeywords.TEXTSIZE).reserved = true;
keywords.options(SqlKeywords.THEN).reserved = true;
keywords.options(SqlKeywords.TO).reserved = true;
keywords.options(SqlKeywords.TOP).reserved = true;
keywords.options(SqlKeywords.TRAN).reserved = true;
keywords.options(SqlKeywords.TRANSACTION).reserved = true;
keywords.options(SqlKeywords.TRIGGER).reserved = true;
keywords.options(SqlKeywords.TRUNCATE).reserved = true;
keywords.options(SqlKeywords.TRY_CONVERT).reserved = true;
keywords.options(SqlKeywords.TSEQUAL).reserved = true;
keywords.options(SqlKeywords.UNION).reserved = true;
keywords.options(SqlKeywords.UNIQUE).reserved = true;
keywords.options(SqlKeywords.UNPIVOT).reserved = true;
keywords.options(SqlKeywords.UPDATE).reserved = true;
keywords.options(SqlKeywords.UPDATETEXT).reserved = true;
keywords.options(SqlKeywords.USE).reserved = true;
keywords.options(SqlKeywords.USER).reserved = true;
keywords.options(SqlKeywords.VALUES).reserved = true;
keywords.options(SqlKeywords.VARYING).reserved = true;
keywords.options(SqlKeywords.VIEW).reserved = true;
keywords.options(SqlKeywords.WAITFOR).reserved = true;
keywords.options(SqlKeywords.WHEN).reserved = true;
keywords.options(SqlKeywords.WHERE).reserved = true;
keywords.options(SqlKeywords.WHILE).reserved = true;
keywords.options(SqlKeywords.WITH).reserved = true;
keywords.options(SqlKeywords.WITHIN).reserved = true;
keywords.options(SqlKeywords.WRITETEXT).reserved = true;

keywords.options(SqlKeywords.AGGREGATE).objectStart = true;
keywords.options(SqlKeywords.APPICATION).objectStart = true;
keywords.options(SqlKeywords.ASSEMBLY).objectStart = true;
keywords.options(SqlKeywords.ASYMMETRIC).objectStart = true;
keywords.options(SqlKeywords.AVAILABILITY).objectStart = true;
keywords.options(SqlKeywords.BROKER).objectStart = true;
keywords.options(SqlKeywords.CERTIFICATE).objectStart = true;
keywords.options(SqlKeywords.COLUMNSTORE).objectStart = true;
keywords.options(SqlKeywords.COLUMN).objectStart = true;
keywords.options(SqlKeywords.CONTRACT).objectStart = true;
keywords.options(SqlKeywords.CREDENTIAL).objectStart = true;
keywords.options(SqlKeywords.CRYPTOGRAPHIC).objectStart = true;
keywords.options(SqlKeywords.DATABASE).objectStart = true;
keywords.options(SqlKeywords.DEFAULT).objectStart = true;
keywords.options(SqlKeywords.ENDPOINT).objectStart = true;
keywords.options(SqlKeywords.EVENT).objectStart = true;
keywords.options(SqlKeywords.EXTERNAL).objectStart = true;
keywords.options(SqlKeywords.FULLTEXT).objectStart = true;
keywords.options(SqlKeywords.FUNCTION).objectStart = true;
keywords.options(SqlKeywords.INDEX).objectStart = true;
keywords.options(SqlKeywords.LOGIN).objectStart = true;
keywords.options(SqlKeywords.MASTER).objectStart = true;
keywords.options(SqlKeywords.MESSAGE).objectStart = true;
keywords.options(SqlKeywords.PARTITION).objectStart = true;
keywords.options(SqlKeywords.PROCEDURE).objectStart = true;
keywords.options(SqlKeywords.QUEUE).objectStart = true;
keywords.options(SqlKeywords.REMOTE).objectStart = true;
keywords.options(SqlKeywords.RESOURCE).objectStart = true;
keywords.options(SqlKeywords.ROLE).objectStart = true;
keywords.options(SqlKeywords.ROUTE).objectStart = true;
keywords.options(SqlKeywords.RULE).objectStart = true;
keywords.options(SqlKeywords.SCHEMA).objectStart = true;
keywords.options(SqlKeywords.SEARCH).objectStart = true;
keywords.options(SqlKeywords.SECURITY).objectStart = true;
keywords.options(SqlKeywords.SELECTIVE).objectStart = true;
keywords.options(SqlKeywords.SEQUENCE).objectStart = true;
keywords.options(SqlKeywords.SERVICE).objectStart = true;
keywords.options(SqlKeywords.SIGNATURE).objectStart = true;
keywords.options(SqlKeywords.SPATIAL).objectStart = true;
keywords.options(SqlKeywords.STATISTICS).objectStart = true;
keywords.options(SqlKeywords.SYMMETRIC).objectStart = true;
keywords.options(SqlKeywords.SYNONYM).objectStart = true;
keywords.options(SqlKeywords.TABLE).objectStart = true;
keywords.options(SqlKeywords.TRIGGER).objectStart = true;
keywords.options(SqlKeywords.TYPE).objectStart = true;
keywords.options(SqlKeywords.USER).objectStart = true;
keywords.options(SqlKeywords.VIEW).objectStart = true;
keywords.options(SqlKeywords.WORKLOAD).objectStart = true;
keywords.options(SqlKeywords.XML).objectStart = true;

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

		if (!this.options.keywords) {
			this.options.keywords = keywords;
		}
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
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				if (
					token.keyword === SqlKeywords.CREATE ||
					token.keyword === SqlKeywords.ALTER
				) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else if (
					token.keyword === SqlKeywords.IF ||
					token.keyword === SqlKeywords.WHILE
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
					token.keyword === SqlKeywords.PROCEDURE ||
					token.keyword === SqlKeywords.TRIGGER
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
