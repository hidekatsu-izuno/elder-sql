import { type Keyword, Lexer, type LexerOptions, Token } from "elder-parse";
import { SqlLexer } from "../sql.ts";
import { compareVersion, escapeRegExp } from "../utils.ts";

const DefaultReservedSet = new Set([
	SqlLexer.ACCESSIBLE,
	SqlLexer.ADD,
	SqlLexer.ALL,
	SqlLexer.ALTER,
	SqlLexer.ANALYZE,
	SqlLexer.AND,
	SqlLexer.AS,
	SqlLexer.ASC,
	SqlLexer.ASENSITIVE,
	SqlLexer.BEFORE,
	SqlLexer.BETWEEN,
	SqlLexer.BIGINT,
	SqlLexer.BINARY,
	SqlLexer.BLOB,
	SqlLexer.BOTH,
	SqlLexer.BY,
	SqlLexer.CALL,
	SqlLexer.CASCADE,
	SqlLexer.CASE,
	SqlLexer.CHANGE,
	SqlLexer.CHAR,
	SqlLexer.CHARACTER,
	SqlLexer.CHECK,
	SqlLexer.COLLATE,
	SqlLexer.COLUMN,
	SqlLexer.CONDITION,
	SqlLexer.CONSTRAINT,
	SqlLexer.CONTINUE,
	SqlLexer.CONVERT,
	SqlLexer.CREATE,
	SqlLexer.CROSS,
	SqlLexer.CURRENT_DATE,
	SqlLexer.CURRENT_TIME,
	SqlLexer.CURRENT_TIMESTAMP,
	SqlLexer.CURRENT_USER,
	SqlLexer.CURSOR,
	SqlLexer.DATABASE,
	SqlLexer.DATABASES,
	SqlLexer.DAY_HOUR,
	SqlLexer.DAY_MICROSECOND,
	SqlLexer.DAY_MINUTE,
	SqlLexer.DAY_SECOND,
	SqlLexer.DEC,
	SqlLexer.DECIMAL,
	SqlLexer.DECLARE,
	SqlLexer.DEFAULT,
	SqlLexer.DELAYED,
	SqlLexer.DELETE,
	SqlLexer.DESC,
	SqlLexer.DESCRIBE,
	SqlLexer.DETERMINISTIC,
	SqlLexer.DISTINCT,
	SqlLexer.DISTINCTROW,
	SqlLexer.DIV,
	SqlLexer.DOUBLE,
	SqlLexer.DROP,
	SqlLexer.DUAL,
	SqlLexer.EACH,
	SqlLexer.ELSE,
	SqlLexer.ELSEIF,
	SqlLexer.ENCLOSED,
	SqlLexer.ESCAPED,
	SqlLexer.EXCEPT,
	SqlLexer.EXISTS,
	SqlLexer.EXIT,
	SqlLexer.EXPLAIN,
	SqlLexer.FALSE,
	SqlLexer.FETCH,
	SqlLexer.FLOAT,
	SqlLexer.FOR,
	SqlLexer.FORCE,
	SqlLexer.FOREIGN,
	SqlLexer.FROM,
	SqlLexer.FULLTEXT,
	SqlLexer.GENERATED,
	SqlLexer.GET,
	SqlLexer.GRANT,
	SqlLexer.GROUP,
	SqlLexer.HAVING,
	SqlLexer.HIGH_PRIORITY,
	SqlLexer.HOUR_MICROSECOND,
	SqlLexer.HOUR_MINUTE,
	SqlLexer.HOUR_SECOND,
	SqlLexer.IF,
	SqlLexer.IGNORE,
	SqlLexer.IN,
	SqlLexer.INDEX,
	SqlLexer.INFILE,
	SqlLexer.INNER,
	SqlLexer.INOUT,
	SqlLexer.INSENSITIVE,
	SqlLexer.INSERT,
	SqlLexer.INT,
	SqlLexer.INTEGER,
	SqlLexer.INTERVAL,
	SqlLexer.INTO,
	SqlLexer.IO_AFTER_GTIDS,
	SqlLexer.IO_BEFORE_GTIDS,
	SqlLexer.IS,
	SqlLexer.ITERATE,
	SqlLexer.JOIN,
	SqlLexer.KEY,
	SqlLexer.KEYS,
	SqlLexer.KILL,
	SqlLexer.LEADING,
	SqlLexer.LEAVE,
	SqlLexer.LEFT,
	SqlLexer.LIKE,
	SqlLexer.LIMIT,
	SqlLexer.LINEAR,
	SqlLexer.LINES,
	SqlLexer.LOAD,
	SqlLexer.LOCALTIME,
	SqlLexer.LOCALTIMESTAMP,
	SqlLexer.LOCK,
	SqlLexer.LONG,
	SqlLexer.LONGBLOB,
	SqlLexer.LONGTEXT,
	SqlLexer.LOOP,
	SqlLexer.LOW_PRIORITY,
	SqlLexer.MATCH,
	SqlLexer.MAXVALUE,
	SqlLexer.MEDIUMBLOB,
	SqlLexer.MEDIUMINT,
	SqlLexer.MEDIUMTEXT,
	SqlLexer.MIDDLEINT,
	SqlLexer.MINUTE_MICROSECOND,
	SqlLexer.MINUTE_SECOND,
	SqlLexer.MOD,
	SqlLexer.MODIFIES,
	SqlLexer.NATURAL,
	SqlLexer.NOT,
	SqlLexer.NO_WRITE_TO_BINLOG,
	SqlLexer.NULL,
	SqlLexer.NUMERIC,
	SqlLexer.ON,
	SqlLexer.OPTIMIZE,
	SqlLexer.OPTIMIZER_COSTS,
	SqlLexer.OPTION,
	SqlLexer.OPTIONALLY,
	SqlLexer.OR,
	SqlLexer.ORDER,
	SqlLexer.OUT,
	SqlLexer.OUTER,
	SqlLexer.OUTFILE,
	SqlLexer.PARTITION,
	SqlLexer.PRECISION,
	SqlLexer.PRIMARY,
	SqlLexer.PROCEDURE,
	SqlLexer.PURGE,
	SqlLexer.RANGE,
	SqlLexer.READ,
	SqlLexer.READS,
	SqlLexer.READ_WRITE,
	SqlLexer.REAL,
	SqlLexer.REFERENCES,
	SqlLexer.REGEXP,
	SqlLexer.RELEASE,
	SqlLexer.RENAME,
	SqlLexer.REPEAT,
	SqlLexer.REPLACE,
	SqlLexer.REQUIRE,
	SqlLexer.RESIGNAL,
	SqlLexer.RESTRICT,
	SqlLexer.RETURN,
	SqlLexer.REVOKE,
	SqlLexer.RIGHT,
	SqlLexer.RLIKE,
	SqlLexer.SCHEMA,
	SqlLexer.SCHEMAS,
	SqlLexer.SECOND_MICROSECOND,
	SqlLexer.SELECT,
	SqlLexer.SENSITIVE,
	SqlLexer.SEPARATOR,
	SqlLexer.SET,
	SqlLexer.SHOW,
	SqlLexer.SIGNAL,
	SqlLexer.SMALLINT,
	SqlLexer.SPATIAL,
	SqlLexer.SPECIFIC,
	SqlLexer.SQL,
	SqlLexer.SQLEXCEPTION,
	SqlLexer.SQLSTATE,
	SqlLexer.SQLWARNING,
	SqlLexer.SQL_BIG_RESULT,
	SqlLexer.SQL_CALC_FOUND_ROWS,
	SqlLexer.SQL_SMALL_RESULT,
	SqlLexer.SSL,
	SqlLexer.STARTING,
	SqlLexer.STORED,
	SqlLexer.STRAIGHT_JOIN,
	SqlLexer.TABLE,
	SqlLexer.TERMINATED,
	SqlLexer.THEN,
	SqlLexer.TINYBLOB,
	SqlLexer.TINYINT,
	SqlLexer.TINYTEXT,
	SqlLexer.TO,
	SqlLexer.TRAILING,
	SqlLexer.TRIGGER,
	SqlLexer.TRUE,
	SqlLexer.UNDO,
	SqlLexer.UNION,
	SqlLexer.UNIQUE,
	SqlLexer.UNLOCK,
	SqlLexer.UNSIGNED,
	SqlLexer.UPDATE,
	SqlLexer.USAGE,
	SqlLexer.USE,
	SqlLexer.USING,
	SqlLexer.UTC_DATE,
	SqlLexer.UTC_TIME,
	SqlLexer.UTC_TIMESTAMP,
	SqlLexer.VALUES,
	SqlLexer.VARBINARY,
	SqlLexer.VARCHAR,
	SqlLexer.VARCHARACTER,
	SqlLexer.VARYING,
	SqlLexer.VIRTUAL,
	SqlLexer.WHEN,
	SqlLexer.WHERE,
	SqlLexer.WHILE,
	SqlLexer.WITH,
	SqlLexer.WRITE,
	SqlLexer.XOR,
	SqlLexer.YEAR_MONTH,
	SqlLexer.ZEROFILL,
]);

const ObjectStartSet = new Set([
	SqlLexer.DATABASE,
	SqlLexer.SCHEMA,
	SqlLexer.EVENT,
	SqlLexer.FUNCTION,
	SqlLexer.INDEX,
	SqlLexer.INSTANCE,
	SqlLexer.LOGFILE,
	SqlLexer.PROCEDURE,
	SqlLexer.SERVER,
	SqlLexer.SPATIAL,
	SqlLexer.TABLE,
	SqlLexer.TABLESPACE,
	SqlLexer.TRIGGER,
	SqlLexer.VIEW,
]);

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
	private reservedSet = new Set<Keyword>();
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
					type: SqlLexer.LineBreak,
					re: /\n|\r\n?/y,
				},
				{ type: SqlLexer.WhiteSpace, re: /[ \t\v\f]+/y },
				{ type: SqlLexer.HintComment, re: /\/\*\+.*?\*\//sy },
				{
					type: SqlLexer.BlockComment,
					re: /\/\*.*?\*\//sy,
					onMatch: (state, token) => this.onMatchBlockComment(state, token),
				},
				{
					type: SqlLexer.LineComment,
					re: /(#|--[ \t\v\f]).*/y,
				},
				{
					type: SqlLexer.Delimiter,
					re: () => this.reDelimiterPattern,
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlLexer.Command,
					re: (state) =>
						state.mode === Mode.INITIAL ? this.reCommandPattern : false,
					onMatch: (state, token) => this.onMatchCommand(state, token),
					onUnmatch: (state) => this.onUnmatchCommand(state),
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
				{
					type: SqlLexer.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlLexer.Size, re: /(0|[1-9][0-9]*)[KMG]/iy },
				{ type: SqlLexer.Dot, re: /\./y },
				{
					type: SqlLexer.String,
					re: /([bBnN]|_[a-zA-Z]+)?('([^']|'')*'|"([^"]|"")*")/y,
				},
				{ type: SqlLexer.Identifier, re: /"([^"]|"")*"|`([^`]|``)*`/y },
				{ type: SqlLexer.BindVariable, re: /\?/y },
				{
					type: SqlLexer.BindVariable,
					re: /:[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
				},
				{
					type: SqlLexer.Variable,
					re: /@@?([a-zA-Z0-9._$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]+|`([^`]|``)*`|'([^']|'')*'|"([^"]|"")*")/y,
				},
				{
					type: SqlLexer.Operator,
					re: /\|\|&&|<=>|<<|>>|<>|->>?|[=<>!:]=?|[~&|^*/%+-]/y,
				},
				{
					type: SqlLexer.Identifier,
					re: /[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
					onMatch: (state, token) => this.onMatchIdentifier(state, token),
				},
			],
			options,
		);

		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8") < 0
		) {
			this.reservedSet.add(SqlLexer.ANALYSE);
			this.reservedSet.add(SqlLexer.DES_KEY_FILE);
			this.reservedSet.add(SqlLexer.MASTER_SERVER_ID);
			this.reservedSet.add(SqlLexer.MASTER_BIND);
			this.reservedSet.add(SqlLexer.MASTER_SSL_VERIFY_SERVER_CERT);
			this.reservedSet.add(SqlLexer.PARSE_GCOL_EXPR);
			this.reservedSet.add(SqlLexer.REDOFILE);
			this.reservedSet.add(SqlLexer.SQL_CACHE);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.4") < 0
		) {
			this.reservedSet.add(SqlLexer.MASTER_BIND);
			this.reservedSet.add(SqlLexer.MASTER_SSL_VERIFY_SERVER_CERT);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.0.1") >= 0
		) {
			this.reservedSet.add(SqlLexer.CUBE);
			this.reservedSet.add(SqlLexer.FUNCTION);
			this.reservedSet.add(SqlLexer.GROUPING);
			this.reservedSet.add(SqlLexer.OF);
			this.reservedSet.add(SqlLexer.RECURSIVE);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.0.2") >= 0
		) {
			this.reservedSet.add(SqlLexer.CUME_DIST);
			this.reservedSet.add(SqlLexer.DENSE_RANK);
			this.reservedSet.add(SqlLexer.FIRST_VALUE);
			this.reservedSet.add(SqlLexer.GROUPS);
			this.reservedSet.add(SqlLexer.LAG);
			this.reservedSet.add(SqlLexer.LAST_VALUE);
			this.reservedSet.add(SqlLexer.LEAD);
			this.reservedSet.add(SqlLexer.NTH_VALUE);
			this.reservedSet.add(SqlLexer.NTILE);
			this.reservedSet.add(SqlLexer.OVER);
			this.reservedSet.add(SqlLexer.PERCENT_RANK);
			this.reservedSet.add(SqlLexer.RANK);
			this.reservedSet.add(SqlLexer.ROW);
			this.reservedSet.add(SqlLexer.ROWS);
			this.reservedSet.add(SqlLexer.ROW_NUMBER);
			this.reservedSet.add(SqlLexer.WINDOW);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.0.3") >= 0
		) {
			this.reservedSet.add(SqlLexer.SYSTEM);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.0.4") >= 0
		) {
			this.reservedSet.add(SqlLexer.EMPTY);
			this.reservedSet.add(SqlLexer.JSON_TABLE);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.0.14") >= 0
		) {
			this.reservedSet.add(SqlLexer.LATERAL);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "8.4") >= 0
		) {
			this.reservedSet.add(SqlLexer.MANUAL);
			this.reservedSet.add(SqlLexer.PARALLEL);
			this.reservedSet.add(SqlLexer.QUALIFY);
			this.reservedSet.add(SqlLexer.TABLESAMPLE);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "9") >= 0
		) {
			this.reservedSet.add(SqlLexer.VECTOR);
		}
		if (
			options.package === "mysql" &&
			compareVersion(options.version, "9.2") >= 0
		) {
			this.reservedSet.add(SqlLexer.LIBRARY);
		}
	}

	reserved(keyword: Keyword) {
		return (
			keyword.reserved ||
			DefaultReservedSet.has(keyword) ||
			this.reservedSet.has(keyword)
		);
	}

	protected initState(state: Record<string, any>) {
		state.mode = Mode.INITIAL;
	}

	private onMatchDelimiter(state: Record<string, any>, token: Token) {
		state.mode = Mode.INITIAL;
		return [token, new Token(SqlLexer.EoS, "")];
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
					compareVersion(this.options.version, this.toSemverString(m[1])) >= 0)
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
				state.mode = Mode.SQL_PART;
			}

			if (state.mode === Mode.SQL_START) {
				if (token.keyword === SqlLexer.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
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

	private toSemverString(version: string) {
		const value = Number.parseInt(version, 10);
		const major = Math.trunc(value / 10000);
		const minor = Math.trunc((value / 100) % 100);
		const patch = Math.trunc(value % 100);
		return `${major}.${minor}.${patch}`;
	}
}
