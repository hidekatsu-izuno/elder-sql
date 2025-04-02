import semver from "semver";
import {
	type Keyword,
	Lexer,
	type LexerOptions,
	type Token,
} from "../lexer.ts";
import { SqlKeywords, SqlTokenType } from "../sql.ts";
import { escapeRegExp } from "../utils.ts";

const keywords = new SqlKeywords();
keywords.options(SqlKeywords.ACCESSIBLE).reserved = true;
keywords.options(SqlKeywords.ADD).reserved = true;
keywords.options(SqlKeywords.ALL).reserved = true;
keywords.options(SqlKeywords.ALTER).reserved = true;
keywords.options(SqlKeywords.ANALYZE).reserved = true;
keywords.options(SqlKeywords.AND).reserved = true;
keywords.options(SqlKeywords.AS).reserved = true;
keywords.options(SqlKeywords.ASC).reserved = true;
keywords.options(SqlKeywords.ASENSITIVE).reserved = true;
keywords.options(SqlKeywords.BEFORE).reserved = true;
keywords.options(SqlKeywords.BETWEEN).reserved = true;
keywords.options(SqlKeywords.BIGINT).reserved = true;
keywords.options(SqlKeywords.BINARY).reserved = true;
keywords.options(SqlKeywords.BLOB).reserved = true;
keywords.options(SqlKeywords.BOTH).reserved = true;
keywords.options(SqlKeywords.BY).reserved = true;
keywords.options(SqlKeywords.CALL).reserved = true;
keywords.options(SqlKeywords.CASCADE).reserved = true;
keywords.options(SqlKeywords.CASE).reserved = true;
keywords.options(SqlKeywords.CHANGE).reserved = true;
keywords.options(SqlKeywords.CHAR).reserved = true;
keywords.options(SqlKeywords.CHARACTER).reserved = true;
keywords.options(SqlKeywords.CHECK).reserved = true;
keywords.options(SqlKeywords.COLLATE).reserved = true;
keywords.options(SqlKeywords.COLUMN).reserved = true;
keywords.options(SqlKeywords.CONDITION).reserved = true;
keywords.options(SqlKeywords.CONSTRAINT).reserved = true;
keywords.options(SqlKeywords.CONTINUE).reserved = true;
keywords.options(SqlKeywords.CONVERT).reserved = true;
keywords.options(SqlKeywords.CREATE).reserved = true;
keywords.options(SqlKeywords.CROSS).reserved = true;
keywords.options(SqlKeywords.CURRENT_DATE).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIME).reserved = true;
keywords.options(SqlKeywords.CURRENT_TIMESTAMP).reserved = true;
keywords.options(SqlKeywords.CURRENT_USER).reserved = true;
keywords.options(SqlKeywords.CURSOR).reserved = true;
keywords.options(SqlKeywords.DATABASE).reserved = true;
keywords.options(SqlKeywords.DATABASES).reserved = true;
keywords.options(SqlKeywords.DAY_HOUR).reserved = true;
keywords.options(SqlKeywords.DAY_MICROSECOND).reserved = true;
keywords.options(SqlKeywords.DAY_MINUTE).reserved = true;
keywords.options(SqlKeywords.DAY_SECOND).reserved = true;
keywords.options(SqlKeywords.DEC).reserved = true;
keywords.options(SqlKeywords.DECIMAL).reserved = true;
keywords.options(SqlKeywords.DECLARE).reserved = true;
keywords.options(SqlKeywords.DEFAULT).reserved = true;
keywords.options(SqlKeywords.DELAYED).reserved = true;
keywords.options(SqlKeywords.DELETE).reserved = true;
keywords.options(SqlKeywords.DESC).reserved = true;
keywords.options(SqlKeywords.DESCRIBE).reserved = true;
keywords.options(SqlKeywords.DETERMINISTIC).reserved = true;
keywords.options(SqlKeywords.DISTINCT).reserved = true;
keywords.options(SqlKeywords.DISTINCTROW).reserved = true;
keywords.options(SqlKeywords.DIV).reserved = true;
keywords.options(SqlKeywords.DOUBLE).reserved = true;
keywords.options(SqlKeywords.DROP).reserved = true;
keywords.options(SqlKeywords.DUAL).reserved = true;
keywords.options(SqlKeywords.EACH).reserved = true;
keywords.options(SqlKeywords.ELSE).reserved = true;
keywords.options(SqlKeywords.ELSEIF).reserved = true;
keywords.options(SqlKeywords.ENCLOSED).reserved = true;
keywords.options(SqlKeywords.ESCAPED).reserved = true;
keywords.options(SqlKeywords.EXCEPT).reserved = true;
keywords.options(SqlKeywords.EXISTS).reserved = true;
keywords.options(SqlKeywords.EXIT).reserved = true;
keywords.options(SqlKeywords.EXPLAIN).reserved = true;
keywords.options(SqlKeywords.FALSE).reserved = true;
keywords.options(SqlKeywords.FETCH).reserved = true;
keywords.options(SqlKeywords.FLOAT).reserved = true;
keywords.options(SqlKeywords.FOR).reserved = true;
keywords.options(SqlKeywords.FORCE).reserved = true;
keywords.options(SqlKeywords.FOREIGN).reserved = true;
keywords.options(SqlKeywords.FROM).reserved = true;
keywords.options(SqlKeywords.FULLTEXT).reserved = true;
keywords.options(SqlKeywords.GENERATED).reserved = true;
keywords.options(SqlKeywords.GET).reserved = true;
keywords.options(SqlKeywords.GRANT).reserved = true;
keywords.options(SqlKeywords.GROUP).reserved = true;
keywords.options(SqlKeywords.HAVING).reserved = true;
keywords.options(SqlKeywords.HIGH_PRIORITY).reserved = true;
keywords.options(SqlKeywords.HOUR_MICROSECOND).reserved = true;
keywords.options(SqlKeywords.HOUR_MINUTE).reserved = true;
keywords.options(SqlKeywords.HOUR_SECOND).reserved = true;
keywords.options(SqlKeywords.IF).reserved = true;
keywords.options(SqlKeywords.IGNORE).reserved = true;
keywords.options(SqlKeywords.IN).reserved = true;
keywords.options(SqlKeywords.INDEX).reserved = true;
keywords.options(SqlKeywords.INFILE).reserved = true;
keywords.options(SqlKeywords.INNER).reserved = true;
keywords.options(SqlKeywords.INOUT).reserved = true;
keywords.options(SqlKeywords.INSENSITIVE).reserved = true;
keywords.options(SqlKeywords.INSERT).reserved = true;
keywords.options(SqlKeywords.INT).reserved = true;
keywords.options(SqlKeywords.INTEGER).reserved = true;
keywords.options(SqlKeywords.INTERVAL).reserved = true;
keywords.options(SqlKeywords.INTO).reserved = true;
keywords.options(SqlKeywords.IO_AFTER_GTIDS).reserved = true;
keywords.options(SqlKeywords.IO_BEFORE_GTIDS).reserved = true;
keywords.options(SqlKeywords.IS).reserved = true;
keywords.options(SqlKeywords.ITERATE).reserved = true;
keywords.options(SqlKeywords.JOIN).reserved = true;
keywords.options(SqlKeywords.KEY).reserved = true;
keywords.options(SqlKeywords.KEYS).reserved = true;
keywords.options(SqlKeywords.KILL).reserved = true;
keywords.options(SqlKeywords.LEADING).reserved = true;
keywords.options(SqlKeywords.LEAVE).reserved = true;
keywords.options(SqlKeywords.LEFT).reserved = true;
keywords.options(SqlKeywords.LIKE).reserved = true;
keywords.options(SqlKeywords.LIMIT).reserved = true;
keywords.options(SqlKeywords.LINEAR).reserved = true;
keywords.options(SqlKeywords.LINES).reserved = true;
keywords.options(SqlKeywords.LOAD).reserved = true;
keywords.options(SqlKeywords.LOCALTIME).reserved = true;
keywords.options(SqlKeywords.LOCALTIMESTAMP).reserved = true;
keywords.options(SqlKeywords.LOCK).reserved = true;
keywords.options(SqlKeywords.LONG).reserved = true;
keywords.options(SqlKeywords.LONGBLOB).reserved = true;
keywords.options(SqlKeywords.LONGTEXT).reserved = true;
keywords.options(SqlKeywords.LOOP).reserved = true;
keywords.options(SqlKeywords.LOW_PRIORITY).reserved = true;
keywords.options(SqlKeywords.MASTER_BIND).reserved = true;
keywords.options(SqlKeywords.MASTER_SSL_VERIFY_SERVER_CERT).reserved = true;
keywords.options(SqlKeywords.MATCH).reserved = true;
keywords.options(SqlKeywords.MAXVALUE).reserved = true;
keywords.options(SqlKeywords.MEDIUMBLOB).reserved = true;
keywords.options(SqlKeywords.MEDIUMINT).reserved = true;
keywords.options(SqlKeywords.MEDIUMTEXT).reserved = true;
keywords.options(SqlKeywords.MIDDLEINT).reserved = true;
keywords.options(SqlKeywords.MINUTE_MICROSECOND).reserved = true;
keywords.options(SqlKeywords.MINUTE_SECOND).reserved = true;
keywords.options(SqlKeywords.MOD).reserved = true;
keywords.options(SqlKeywords.MODIFIES).reserved = true;
keywords.options(SqlKeywords.NATURAL).reserved = true;
keywords.options(SqlKeywords.NOT).reserved = true;
keywords.options(SqlKeywords.NO_WRITE_TO_BINLOG).reserved = true;
keywords.options(SqlKeywords.NULL).reserved = true;
keywords.options(SqlKeywords.NUMERIC).reserved = true;
keywords.options(SqlKeywords.ON).reserved = true;
keywords.options(SqlKeywords.OPTIMIZE).reserved = true;
keywords.options(SqlKeywords.OPTIMIZER_COSTS).reserved = true;
keywords.options(SqlKeywords.OPTION).reserved = true;
keywords.options(SqlKeywords.OPTIONALLY).reserved = true;
keywords.options(SqlKeywords.OR).reserved = true;
keywords.options(SqlKeywords.ORDER).reserved = true;
keywords.options(SqlKeywords.OUT).reserved = true;
keywords.options(SqlKeywords.OUTER).reserved = true;
keywords.options(SqlKeywords.OUTFILE).reserved = true;
keywords.options(SqlKeywords.PARTITION).reserved = true;
keywords.options(SqlKeywords.PRECISION).reserved = true;
keywords.options(SqlKeywords.PRIMARY).reserved = true;
keywords.options(SqlKeywords.PROCEDURE).reserved = true;
keywords.options(SqlKeywords.PURGE).reserved = true;
keywords.options(SqlKeywords.RANGE).reserved = true;
keywords.options(SqlKeywords.READ).reserved = true;
keywords.options(SqlKeywords.READS).reserved = true;
keywords.options(SqlKeywords.READ_WRITE).reserved = true;
keywords.options(SqlKeywords.REAL).reserved = true;
keywords.options(SqlKeywords.REFERENCES).reserved = true;
keywords.options(SqlKeywords.REGEXP).reserved = true;
keywords.options(SqlKeywords.RELEASE).reserved = true;
keywords.options(SqlKeywords.RENAME).reserved = true;
keywords.options(SqlKeywords.REPEAT).reserved = true;
keywords.options(SqlKeywords.REPLACE).reserved = true;
keywords.options(SqlKeywords.REQUIRE).reserved = true;
keywords.options(SqlKeywords.RESIGNAL).reserved = true;
keywords.options(SqlKeywords.RESTRICT).reserved = true;
keywords.options(SqlKeywords.RETURN).reserved = true;
keywords.options(SqlKeywords.REVOKE).reserved = true;
keywords.options(SqlKeywords.RIGHT).reserved = true;
keywords.options(SqlKeywords.RLIKE).reserved = true;
keywords.options(SqlKeywords.SCHEMA).reserved = true;
keywords.options(SqlKeywords.SCHEMAS).reserved = true;
keywords.options(SqlKeywords.SECOND_MICROSECOND).reserved = true;
keywords.options(SqlKeywords.SELECT).reserved = true;
keywords.options(SqlKeywords.SENSITIVE).reserved = true;
keywords.options(SqlKeywords.SEPARATOR).reserved = true;
keywords.options(SqlKeywords.SET).reserved = true;
keywords.options(SqlKeywords.SHOW).reserved = true;
keywords.options(SqlKeywords.SIGNAL).reserved = true;
keywords.options(SqlKeywords.SMALLINT).reserved = true;
keywords.options(SqlKeywords.SPATIAL).reserved = true;
keywords.options(SqlKeywords.SPECIFIC).reserved = true;
keywords.options(SqlKeywords.SQL).reserved = true;
keywords.options(SqlKeywords.SQLEXCEPTION).reserved = true;
keywords.options(SqlKeywords.SQLSTATE).reserved = true;
keywords.options(SqlKeywords.SQLWARNING).reserved = true;
keywords.options(SqlKeywords.SQL_BIG_RESULT).reserved = true;
keywords.options(SqlKeywords.SQL_CALC_FOUND_ROWS).reserved = true;
keywords.options(SqlKeywords.SQL_SMALL_RESULT).reserved = true;
keywords.options(SqlKeywords.SSL).reserved = true;
keywords.options(SqlKeywords.STARTING).reserved = true;
keywords.options(SqlKeywords.STORED).reserved = true;
keywords.options(SqlKeywords.STRAIGHT_JOIN).reserved = true;
keywords.options(SqlKeywords.TABLE).reserved = true;
keywords.options(SqlKeywords.TERMINATED).reserved = true;
keywords.options(SqlKeywords.THEN).reserved = true;
keywords.options(SqlKeywords.TINYBLOB).reserved = true;
keywords.options(SqlKeywords.TINYINT).reserved = true;
keywords.options(SqlKeywords.TINYTEXT).reserved = true;
keywords.options(SqlKeywords.TO).reserved = true;
keywords.options(SqlKeywords.TRAILING).reserved = true;
keywords.options(SqlKeywords.TRIGGER).reserved = true;
keywords.options(SqlKeywords.TRUE).reserved = true;
keywords.options(SqlKeywords.UNDO).reserved = true;
keywords.options(SqlKeywords.UNION).reserved = true;
keywords.options(SqlKeywords.UNIQUE).reserved = true;
keywords.options(SqlKeywords.UNLOCK).reserved = true;
keywords.options(SqlKeywords.UNSIGNED).reserved = true;
keywords.options(SqlKeywords.UPDATE).reserved = true;
keywords.options(SqlKeywords.USAGE).reserved = true;
keywords.options(SqlKeywords.USE).reserved = true;
keywords.options(SqlKeywords.USING).reserved = true;
keywords.options(SqlKeywords.UTC_DATE).reserved = true;
keywords.options(SqlKeywords.UTC_TIME).reserved = true;
keywords.options(SqlKeywords.UTC_TIMESTAMP).reserved = true;
keywords.options(SqlKeywords.VALUES).reserved = true;
keywords.options(SqlKeywords.VARBINARY).reserved = true;
keywords.options(SqlKeywords.VARCHAR).reserved = true;
keywords.options(SqlKeywords.VARCHARACTER).reserved = true;
keywords.options(SqlKeywords.VARYING).reserved = true;
keywords.options(SqlKeywords.VIRTUAL).reserved = true;
keywords.options(SqlKeywords.WHEN).reserved = true;
keywords.options(SqlKeywords.WHERE).reserved = true;
keywords.options(SqlKeywords.WHILE).reserved = true;
keywords.options(SqlKeywords.WITH).reserved = true;
keywords.options(SqlKeywords.WRITE).reserved = true;
keywords.options(SqlKeywords.XOR).reserved = true;
keywords.options(SqlKeywords.YEAR_MONTH).reserved = true;
keywords.options(SqlKeywords.ZEROFILL).reserved = true;

keywords.options(SqlKeywords.DATABASE).objectStart = true;
keywords.options(SqlKeywords.SCHEMA).objectStart = true;
keywords.options(SqlKeywords.EVENT).objectStart = true;
keywords.options(SqlKeywords.FUNCTION).objectStart = true;
keywords.options(SqlKeywords.INDEX).objectStart = true;
keywords.options(SqlKeywords.INSTANCE).objectStart = true;
keywords.options(SqlKeywords.LOGFILE).objectStart = true;
keywords.options(SqlKeywords.PROCEDURE).objectStart = true;
keywords.options(SqlKeywords.SERVER).objectStart = true;
keywords.options(SqlKeywords.SPATIAL).objectStart = true;
keywords.options(SqlKeywords.TABLE).objectStart = true;
keywords.options(SqlKeywords.TABLESPACE).objectStart = true;
keywords.options(SqlKeywords.TRIGGER).objectStart = true;
keywords.options(SqlKeywords.VIEW).objectStart = true;

const CommandPattern = [
	"\\?",
	"\\\\[!-~]",
	"CLEAR",
	"CONNECT",
	"DELIMITER",
	"EDIT",
	"EGO",
	"EXIT",
	"GO",
	"HELP",
	"NOPAGER",
	"NOTEE",
	"PAGER",
	"PRINT",
	"PROMPT",
	"QUIT",
	"REHASH",
	"SOURCE",
	"STATUS",
	"SYSTEM",
	"TEE",
	"USE",
	"CHARSET",
	"WARNINGS",
	"NOWARNING",
].join("|");

const Mode = {
	INITIAL: 0,
	SQL_START: 1,
	SQL_OBJECT_DEF: 2,
	SQL_PROC: 3,
	SQL_PART: Number.MAX_SAFE_INTEGER,
} as const;

export declare type MysqlLexerOptions = LexerOptions & {
	package?: string;
	version?: string;
};

export class MysqlLexer extends Lexer {
	private reserved = new Set<Keyword>();
	private reCommandPattern = new RegExp(
		`^(${CommandPattern})\\b.*?(;|$)`,
		"isy",
	);
	private reDelimiterPattern = /;/y;

	constructor(options: MysqlLexerOptions = {}) {
		super(
			"mysql",
			[
				{
					type: SqlTokenType.LineBreak,
					re: /\n|\r\n?/y,
					skip: true,
					separator: true,
				},
				{ type: SqlTokenType.WhiteSpace, re: /[ \t\v\f]+/y, skip: true },
				{ type: SqlTokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
				{
					type: SqlTokenType.BlockComment,
					re: /\/\*.*?\*\//sy,
					skip: true,
					onMatch: (state, token) => this.onMatchBlockComment(state, token),
				},
				{
					type: SqlTokenType.LineComment,
					re: /(#|--[ \t\v\f]).*/y,
					skip: true,
				},
				{
					type: SqlTokenType.Delimiter,
					re: () => this.reDelimiterPattern,
					separator: true,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlTokenType.Command,
					re: (state) =>
						state.mode === Mode.INITIAL ? this.reCommandPattern : false,
					onMatch: (state, token) => this.onMatchCommand(state, token),
					onUnmatch: (state) => this.onUnmatchCommand(state),
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
				{
					type: SqlTokenType.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Size, re: /(0|[1-9][0-9]*)[KMG]/iy },
				{ type: SqlTokenType.Dot, re: /\./y, separator: true },
				{
					type: SqlTokenType.String,
					re: /([bBnN]|_[a-zA-Z]+)?('([^']|'')*'|"([^"]|"")*")/y,
				},
				{ type: SqlTokenType.Identifier, re: /"([^"]|"")*"|`([^`]|``)*`/y },
				{ type: SqlTokenType.BindVariable, re: /\?/y },
				{
					type: SqlTokenType.BindVariable,
					re: /:[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlTokenType.Variable,
					re: /@@?([a-zA-Z0-9._$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]+|`([^`]|``)*`|'([^']|'')*'|"([^"]|"")*")/y,
				},
				{
					type: SqlTokenType.Operator,
					re: /\|\|&&|<=>|<<|>>|<>|->>?|[=<>!:]=?|[~&|^*/%+-]/y,
				},
				{
					type: SqlTokenType.Identifier,
					re: /[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);

		if (!this.options.keywords) {
			let newKeywords: SqlKeywords | undefined;
			if (
				options.package === "mysql" &&
				semver.satisfies("<8.0.0", options.version || "0")
			) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.ANALYSE).reserved = true;
				newKeywords.options(SqlKeywords.DES_KEY_FILE).reserved = true;
				newKeywords.options(SqlKeywords.ANALYSE).reserved = true;
				newKeywords.options(SqlKeywords.MASTER_SERVER_ID).reserved = true;
				newKeywords.options(SqlKeywords.PARSE_GCOL_EXPR).reserved = true;
				newKeywords.options(SqlKeywords.REDOFILE).reserved = true;
				newKeywords.options(SqlKeywords.SQL_CACHE).reserved = true;
			}
			if (
				options.package === "mysql" &&
				semver.satisfies(">=8.0.1", options.version || "0")
			) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.CUBE).reserved = true;
				newKeywords.options(SqlKeywords.FUNCTION).reserved = true;
				newKeywords.options(SqlKeywords.GROUPING).reserved = true;
				newKeywords.options(SqlKeywords.OF).reserved = true;
				newKeywords.options(SqlKeywords.RECURSIVE).reserved = true;
			}
			if (
				options.package === "mysql" &&
				semver.satisfies(">=8.0.2", options.version || "0")
			) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.CUME_DIST).reserved = true;
				newKeywords.options(SqlKeywords.DENSE_RANK).reserved = true;
				newKeywords.options(SqlKeywords.FIRST_VALUE).reserved = true;
				newKeywords.options(SqlKeywords.GROUPS).reserved = true;
				newKeywords.options(SqlKeywords.LAG).reserved = true;
				newKeywords.options(SqlKeywords.LAST_VALUE).reserved = true;
				newKeywords.options(SqlKeywords.LEAD).reserved = true;
				newKeywords.options(SqlKeywords.NTH_VALUE).reserved = true;
				newKeywords.options(SqlKeywords.NTILE).reserved = true;
				newKeywords.options(SqlKeywords.OVER).reserved = true;
				newKeywords.options(SqlKeywords.PERCENT_RANK).reserved = true;
				newKeywords.options(SqlKeywords.RANK).reserved = true;
				newKeywords.options(SqlKeywords.ROW).reserved = true;
				newKeywords.options(SqlKeywords.ROWS).reserved = true;
				newKeywords.options(SqlKeywords.ROW_NUMBER).reserved = true;
				newKeywords.options(SqlKeywords.WINDOW).reserved = true;
			}
			if (
				options.package === "mysql" &&
				semver.satisfies(">=8.0.3", options.version || "0")
			) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.SYSTEM).reserved = true;
			}
			if (
				options.package === "mysql" &&
				semver.satisfies(">=8.0.4", options.version || "0")
			) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.EMPTY).reserved = true;
				newKeywords.options(SqlKeywords.JSON_TABLE).reserved = true;
			}
			if (
				options.package === "mysql" &&
				semver.satisfies(">=8.0.14", options.version || "0")
			) {
				if (!newKeywords) {
					newKeywords = new SqlKeywords(keywords);
				}
				newKeywords.options(SqlKeywords.LATERAL).reserved = true;
			}
			this.options.keywords = newKeywords ? newKeywords : keywords;
		}
	}

	protected initState(state: Record<string, any>) {
		state.mode = Mode.INITIAL;
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;
		token.eos = true;
	}

	private onMatchBlockComment(state: Record<string, any>, token: Token) {
		if (token.text.startsWith("/*!")) {
			const m = /^\/\*!([0-9]{5})?[ \f\t\v\r\n](.*)[ \f\t\v\r\n]\*\/$/s.exec(
				token.text,
			);
			if (
				m &&
				(!m[1] ||
					!this.options.version ||
					semver.gte(this.options.version, this.toSemverString(m[1])))
			) {
				const start = (m[1] ? m[1].length : 0) + 3;
				const tokens = this.sublex(
					state,
					`${" ".repeat(start)}${token.text.substring(start, token.text.length - 2)}  `,
					token.location,
				);
				return tokens;
			}
		}
	}

	private onMatchCommand(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;
		token.eos = true;

		const m = /^(?:\\d|[Dd][Ee][Ll][Ii][Mm][Ii][Tt][Ee][Rr])[ \t]+(.+)$/.exec(
			token.text,
		);
		if (m) {
			const sep = escapeRegExp(m[1]);
			this.reCommandPattern = new RegExp(
				`(${CommandPattern})\\b.*?(${sep}|$)`,
				"isy",
			);
			this.reDelimiterPattern = new RegExp(sep, "y");
		}
	}

	private onUnmatchCommand(state: Record<string, any>) {
		if (state.mode === Mode.INITIAL) {
			state.mode = Mode.SQL_START;
		}
	}

	private onMatchIdentifier(state: Record<string, any>, token: Token) {
		if (token.keyword) {
			if (state.mode === Mode.SQL_START) {
				state.mode = Mode.SQL_PART;
			}

			if (state.mode === Mode.SQL_START) {
				if (token.keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
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

	private toSemverString(version: string) {
		const value = Number.parseInt(version, 10);
		const major = Math.trunc(value / 10000);
		const minor = Math.trunc((value / 100) % 100);
		const patch = Math.trunc(value % 100);
		return `${major}.${minor}.${patch}`;
	}
}
