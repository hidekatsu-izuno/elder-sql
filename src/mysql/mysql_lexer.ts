import semver from "semver";
import {
	type Keyword,
	Lexer,
	type LexerOptions,
	type Token,
} from "../lexer.js";
import { SqlKeyword, SqlTokenType } from "../sql.js";
import { escapeRegExp } from "../utils.js";

const ReservedSet = new Set<Keyword>([
	SqlKeyword.ACCESSIBLE,
	SqlKeyword.ADD,
	SqlKeyword.ALL,
	SqlKeyword.ALTER,
	SqlKeyword.ANALYZE,
	SqlKeyword.AND,
	SqlKeyword.AS,
	SqlKeyword.ASC,
	SqlKeyword.ASENSITIVE,
	SqlKeyword.BEFORE,
	SqlKeyword.BETWEEN,
	SqlKeyword.BIGINT,
	SqlKeyword.BINARY,
	SqlKeyword.BLOB,
	SqlKeyword.BOTH,
	SqlKeyword.BY,
	SqlKeyword.CALL,
	SqlKeyword.CASCADE,
	SqlKeyword.CASE,
	SqlKeyword.CHANGE,
	SqlKeyword.CHAR,
	SqlKeyword.CHARACTER,
	SqlKeyword.CHECK,
	SqlKeyword.COLLATE,
	SqlKeyword.COLUMN,
	SqlKeyword.CONDITION,
	SqlKeyword.CONSTRAINT,
	SqlKeyword.CONTINUE,
	SqlKeyword.CONVERT,
	SqlKeyword.CREATE,
	SqlKeyword.CROSS,
	SqlKeyword.CURRENT_DATE,
	SqlKeyword.CURRENT_TIME,
	SqlKeyword.CURRENT_TIMESTAMP,
	SqlKeyword.CURRENT_USER,
	SqlKeyword.CURSOR,
	SqlKeyword.DATABASE,
	SqlKeyword.DATABASES,
	SqlKeyword.DAY_HOUR,
	SqlKeyword.DAY_MICROSECOND,
	SqlKeyword.DAY_MINUTE,
	SqlKeyword.DAY_SECOND,
	SqlKeyword.DEC,
	SqlKeyword.DECIMAL,
	SqlKeyword.DECLARE,
	SqlKeyword.DEFAULT,
	SqlKeyword.DELAYED,
	SqlKeyword.DELETE,
	SqlKeyword.DESC,
	SqlKeyword.DESCRIBE,
	SqlKeyword.DETERMINISTIC,
	SqlKeyword.DISTINCT,
	SqlKeyword.DISTINCTROW,
	SqlKeyword.DIV,
	SqlKeyword.DOUBLE,
	SqlKeyword.DROP,
	SqlKeyword.DUAL,
	SqlKeyword.EACH,
	SqlKeyword.ELSE,
	SqlKeyword.ELSEIF,
	SqlKeyword.ENCLOSED,
	SqlKeyword.ESCAPED,
	SqlKeyword.EXCEPT,
	SqlKeyword.EXISTS,
	SqlKeyword.EXIT,
	SqlKeyword.EXPLAIN,
	SqlKeyword.FALSE,
	SqlKeyword.FETCH,
	SqlKeyword.FLOAT,
	SqlKeyword.FOR,
	SqlKeyword.FORCE,
	SqlKeyword.FOREIGN,
	SqlKeyword.FROM,
	SqlKeyword.FULLTEXT,
	SqlKeyword.GENERATED,
	SqlKeyword.GET,
	SqlKeyword.GRANT,
	SqlKeyword.GROUP,
	SqlKeyword.HAVING,
	SqlKeyword.HIGH_PRIORITY,
	SqlKeyword.HOUR_MICROSECOND,
	SqlKeyword.HOUR_MINUTE,
	SqlKeyword.HOUR_SECOND,
	SqlKeyword.IF,
	SqlKeyword.IGNORE,
	SqlKeyword.IN,
	SqlKeyword.INDEX,
	SqlKeyword.INFILE,
	SqlKeyword.INNER,
	SqlKeyword.INOUT,
	SqlKeyword.INSENSITIVE,
	SqlKeyword.INSERT,
	SqlKeyword.INT,
	SqlKeyword.INTEGER,
	SqlKeyword.INTERVAL,
	SqlKeyword.INTO,
	SqlKeyword.IO_AFTER_GTIDS,
	SqlKeyword.IO_BEFORE_GTIDS,
	SqlKeyword.IS,
	SqlKeyword.ITERATE,
	SqlKeyword.JOIN,
	SqlKeyword.KEY,
	SqlKeyword.KEYS,
	SqlKeyword.KILL,
	SqlKeyword.LEADING,
	SqlKeyword.LEAVE,
	SqlKeyword.LEFT,
	SqlKeyword.LIKE,
	SqlKeyword.LIMIT,
	SqlKeyword.LINEAR,
	SqlKeyword.LINES,
	SqlKeyword.LOAD,
	SqlKeyword.LOCALTIME,
	SqlKeyword.LOCALTIMESTAMP,
	SqlKeyword.LOCK,
	SqlKeyword.LONG,
	SqlKeyword.LONGBLOB,
	SqlKeyword.LONGTEXT,
	SqlKeyword.LOOP,
	SqlKeyword.LOW_PRIORITY,
	SqlKeyword.MASTER_BIND,
	SqlKeyword.MASTER_SSL_VERIFY_SERVER_CERT,
	SqlKeyword.MATCH,
	SqlKeyword.MAXVALUE,
	SqlKeyword.MEDIUMBLOB,
	SqlKeyword.MEDIUMINT,
	SqlKeyword.MEDIUMTEXT,
	SqlKeyword.MIDDLEINT,
	SqlKeyword.MINUTE_MICROSECOND,
	SqlKeyword.MINUTE_SECOND,
	SqlKeyword.MOD,
	SqlKeyword.MODIFIES,
	SqlKeyword.NATURAL,
	SqlKeyword.NOT,
	SqlKeyword.NO_WRITE_TO_BINLOG,
	SqlKeyword.NULL,
	SqlKeyword.NUMERIC,
	SqlKeyword.ON,
	SqlKeyword.OPTIMIZE,
	SqlKeyword.OPTIMIZER_COSTS,
	SqlKeyword.OPTION,
	SqlKeyword.OPTIONALLY,
	SqlKeyword.OR,
	SqlKeyword.ORDER,
	SqlKeyword.OUT,
	SqlKeyword.OUTER,
	SqlKeyword.OUTFILE,
	SqlKeyword.PARTITION,
	SqlKeyword.PRECISION,
	SqlKeyword.PRIMARY,
	SqlKeyword.PROCEDURE,
	SqlKeyword.PURGE,
	SqlKeyword.RANGE,
	SqlKeyword.READ,
	SqlKeyword.READS,
	SqlKeyword.READ_WRITE,
	SqlKeyword.REAL,
	SqlKeyword.REFERENCES,
	SqlKeyword.REGEXP,
	SqlKeyword.RELEASE,
	SqlKeyword.RENAME,
	SqlKeyword.REPEAT,
	SqlKeyword.REPLACE,
	SqlKeyword.REQUIRE,
	SqlKeyword.RESIGNAL,
	SqlKeyword.RESTRICT,
	SqlKeyword.RETURN,
	SqlKeyword.REVOKE,
	SqlKeyword.RIGHT,
	SqlKeyword.RLIKE,
	SqlKeyword.SCHEMA,
	SqlKeyword.SCHEMAS,
	SqlKeyword.SECOND_MICROSECOND,
	SqlKeyword.SELECT,
	SqlKeyword.SENSITIVE,
	SqlKeyword.SEPARATOR,
	SqlKeyword.SET,
	SqlKeyword.SHOW,
	SqlKeyword.SIGNAL,
	SqlKeyword.SMALLINT,
	SqlKeyword.SPATIAL,
	SqlKeyword.SPECIFIC,
	SqlKeyword.SQL,
	SqlKeyword.SQLEXCEPTION,
	SqlKeyword.SQLSTATE,
	SqlKeyword.SQLWARNING,
	SqlKeyword.SQL_BIG_RESULT,
	SqlKeyword.SQL_CALC_FOUND_ROWS,
	SqlKeyword.SQL_SMALL_RESULT,
	SqlKeyword.SSL,
	SqlKeyword.STARTING,
	SqlKeyword.STORED,
	SqlKeyword.STRAIGHT_JOIN,
	SqlKeyword.TABLE,
	SqlKeyword.TERMINATED,
	SqlKeyword.THEN,
	SqlKeyword.TINYBLOB,
	SqlKeyword.TINYINT,
	SqlKeyword.TINYTEXT,
	SqlKeyword.TO,
	SqlKeyword.TRAILING,
	SqlKeyword.TRIGGER,
	SqlKeyword.TRUE,
	SqlKeyword.UNDO,
	SqlKeyword.UNION,
	SqlKeyword.UNIQUE,
	SqlKeyword.UNLOCK,
	SqlKeyword.UNSIGNED,
	SqlKeyword.UPDATE,
	SqlKeyword.USAGE,
	SqlKeyword.USE,
	SqlKeyword.USING,
	SqlKeyword.UTC_DATE,
	SqlKeyword.UTC_TIME,
	SqlKeyword.UTC_TIMESTAMP,
	SqlKeyword.VALUES,
	SqlKeyword.VARBINARY,
	SqlKeyword.VARCHAR,
	SqlKeyword.VARCHARACTER,
	SqlKeyword.VARYING,
	SqlKeyword.VIRTUAL,
	SqlKeyword.WHEN,
	SqlKeyword.WHERE,
	SqlKeyword.WHILE,
	SqlKeyword.WITH,
	SqlKeyword.WRITE,
	SqlKeyword.XOR,
	SqlKeyword.YEAR_MONTH,
	SqlKeyword.ZEROFILL,
]);

const ObjectStartSet = new Set<Keyword>([
	SqlKeyword.DATABASE,
	SqlKeyword.SCHEMA,
	SqlKeyword.EVENT,
	SqlKeyword.FUNCTION,
	SqlKeyword.INDEX,
	SqlKeyword.INSTANCE,
	SqlKeyword.LOGFILE,
	SqlKeyword.PROCEDURE,
	SqlKeyword.SERVER,
	SqlKeyword.SPATIAL,
	SqlKeyword.TABLE,
	SqlKeyword.TABLESPACE,
	SqlKeyword.TRIGGER,
	SqlKeyword.VIEW,
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
	static isObjectStart(keyword?: Keyword) {
		return keyword != null && ObjectStartSet.has(keyword);
	}

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
				{ type: SqlTokenType.LineBreak, re: /\n|\r\n?/y, skip: true },
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
					onMatch: (state, token) => this.onMatchDelimiter(state, token),
				},
				{
					type: SqlTokenType.Command,
					re: (state) =>
						state.mode === Mode.INITIAL ? this.reCommandPattern : false,
					onMatch: (state, token) => this.onMatchCommand(state, token),
					onUnmatch: (state) => this.onUnmatchCommand(state),
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
				{
					type: SqlTokenType.Numeric,
					re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y,
				},
				{ type: SqlTokenType.Size, re: /(0|[1-9][0-9]*)[KMG]/iy },
				{ type: SqlTokenType.Dot, re: /\./y },
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
				{ type: SqlTokenType.Error, re: /./y },
			],
			options,
		);

		if (
			options.package === "mysql" &&
			semver.satisfies("<8.0.0", options.version || "0")
		) {
			this.reserved.add(SqlKeyword.ANALYSE);
			this.reserved.add(SqlKeyword.DES_KEY_FILE);
			this.reserved.add(SqlKeyword.ANALYSE);
			this.reserved.add(SqlKeyword.MASTER_SERVER_ID);
			this.reserved.add(SqlKeyword.PARSE_GCOL_EXPR);
			this.reserved.add(SqlKeyword.REDOFILE);
			this.reserved.add(SqlKeyword.SQL_CACHE);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.1", options.version || "0")
		) {
			this.reserved.add(SqlKeyword.CUBE);
			this.reserved.add(SqlKeyword.FUNCTION);
			this.reserved.add(SqlKeyword.GROUPING);
			this.reserved.add(SqlKeyword.OF);
			this.reserved.add(SqlKeyword.RECURSIVE);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.2", options.version || "0")
		) {
			this.reserved.add(SqlKeyword.CUME_DIST);
			this.reserved.add(SqlKeyword.DENSE_RANK);
			this.reserved.add(SqlKeyword.FIRST_VALUE);
			this.reserved.add(SqlKeyword.GROUPS);
			this.reserved.add(SqlKeyword.LAG);
			this.reserved.add(SqlKeyword.LAST_VALUE);
			this.reserved.add(SqlKeyword.LEAD);
			this.reserved.add(SqlKeyword.NTH_VALUE);
			this.reserved.add(SqlKeyword.NTILE);
			this.reserved.add(SqlKeyword.OVER);
			this.reserved.add(SqlKeyword.PERCENT_RANK);
			this.reserved.add(SqlKeyword.RANK);
			this.reserved.add(SqlKeyword.ROW);
			this.reserved.add(SqlKeyword.ROWS);
			this.reserved.add(SqlKeyword.ROW_NUMBER);
			this.reserved.add(SqlKeyword.WINDOW);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.3", options.version || "0")
		) {
			this.reserved.add(SqlKeyword.SYSTEM);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.4", options.version || "0")
		) {
			this.reserved.add(SqlKeyword.EMPTY);
			this.reserved.add(SqlKeyword.JSON_TABLE);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.14", options.version || "0")
		) {
			this.reserved.add(SqlKeyword.LATERAL);
		}
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
		const keyword = SqlKeyword.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (this.isReserved(keyword)) {
				token.type = SqlTokenType.Reserved;
			}
			if (state.mode === Mode.SQL_START) {
				state.mode = Mode.SQL_PART;
			}

			if (state.mode === Mode.SQL_START) {
				if (keyword === SqlKeyword.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				MysqlLexer.isObjectStart(keyword)
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

	private toSemverString(version: string) {
		const value = Number.parseInt(version, 10);
		const major = Math.trunc(value / 10000);
		const minor = Math.trunc((value / 100) % 100);
		const patch = Math.trunc(value % 100);
		return `${major}.${minor}.${patch}`;
	}
}
