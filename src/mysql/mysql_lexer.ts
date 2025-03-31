import semver from "semver";
import {
	type Keyword,
	Lexer,
	type LexerOptions,
	type Token,
} from "../lexer.ts";
import { SqlKeywords, SqlTokenType } from "../sql.ts";
import { escapeRegExp } from "../utils.ts";

const ReservedSet = new Set<Keyword>([
	SqlKeywords.ACCESSIBLE,
	SqlKeywords.ADD,
	SqlKeywords.ALL,
	SqlKeywords.ALTER,
	SqlKeywords.ANALYZE,
	SqlKeywords.AND,
	SqlKeywords.AS,
	SqlKeywords.ASC,
	SqlKeywords.ASENSITIVE,
	SqlKeywords.BEFORE,
	SqlKeywords.BETWEEN,
	SqlKeywords.BIGINT,
	SqlKeywords.BINARY,
	SqlKeywords.BLOB,
	SqlKeywords.BOTH,
	SqlKeywords.BY,
	SqlKeywords.CALL,
	SqlKeywords.CASCADE,
	SqlKeywords.CASE,
	SqlKeywords.CHANGE,
	SqlKeywords.CHAR,
	SqlKeywords.CHARACTER,
	SqlKeywords.CHECK,
	SqlKeywords.COLLATE,
	SqlKeywords.COLUMN,
	SqlKeywords.CONDITION,
	SqlKeywords.CONSTRAINT,
	SqlKeywords.CONTINUE,
	SqlKeywords.CONVERT,
	SqlKeywords.CREATE,
	SqlKeywords.CROSS,
	SqlKeywords.CURRENT_DATE,
	SqlKeywords.CURRENT_TIME,
	SqlKeywords.CURRENT_TIMESTAMP,
	SqlKeywords.CURRENT_USER,
	SqlKeywords.CURSOR,
	SqlKeywords.DATABASE,
	SqlKeywords.DATABASES,
	SqlKeywords.DAY_HOUR,
	SqlKeywords.DAY_MICROSECOND,
	SqlKeywords.DAY_MINUTE,
	SqlKeywords.DAY_SECOND,
	SqlKeywords.DEC,
	SqlKeywords.DECIMAL,
	SqlKeywords.DECLARE,
	SqlKeywords.DEFAULT,
	SqlKeywords.DELAYED,
	SqlKeywords.DELETE,
	SqlKeywords.DESC,
	SqlKeywords.DESCRIBE,
	SqlKeywords.DETERMINISTIC,
	SqlKeywords.DISTINCT,
	SqlKeywords.DISTINCTROW,
	SqlKeywords.DIV,
	SqlKeywords.DOUBLE,
	SqlKeywords.DROP,
	SqlKeywords.DUAL,
	SqlKeywords.EACH,
	SqlKeywords.ELSE,
	SqlKeywords.ELSEIF,
	SqlKeywords.ENCLOSED,
	SqlKeywords.ESCAPED,
	SqlKeywords.EXCEPT,
	SqlKeywords.EXISTS,
	SqlKeywords.EXIT,
	SqlKeywords.EXPLAIN,
	SqlKeywords.FALSE,
	SqlKeywords.FETCH,
	SqlKeywords.FLOAT,
	SqlKeywords.FOR,
	SqlKeywords.FORCE,
	SqlKeywords.FOREIGN,
	SqlKeywords.FROM,
	SqlKeywords.FULLTEXT,
	SqlKeywords.GENERATED,
	SqlKeywords.GET,
	SqlKeywords.GRANT,
	SqlKeywords.GROUP,
	SqlKeywords.HAVING,
	SqlKeywords.HIGH_PRIORITY,
	SqlKeywords.HOUR_MICROSECOND,
	SqlKeywords.HOUR_MINUTE,
	SqlKeywords.HOUR_SECOND,
	SqlKeywords.IF,
	SqlKeywords.IGNORE,
	SqlKeywords.IN,
	SqlKeywords.INDEX,
	SqlKeywords.INFILE,
	SqlKeywords.INNER,
	SqlKeywords.INOUT,
	SqlKeywords.INSENSITIVE,
	SqlKeywords.INSERT,
	SqlKeywords.INT,
	SqlKeywords.INTEGER,
	SqlKeywords.INTERVAL,
	SqlKeywords.INTO,
	SqlKeywords.IO_AFTER_GTIDS,
	SqlKeywords.IO_BEFORE_GTIDS,
	SqlKeywords.IS,
	SqlKeywords.ITERATE,
	SqlKeywords.JOIN,
	SqlKeywords.KEY,
	SqlKeywords.KEYS,
	SqlKeywords.KILL,
	SqlKeywords.LEADING,
	SqlKeywords.LEAVE,
	SqlKeywords.LEFT,
	SqlKeywords.LIKE,
	SqlKeywords.LIMIT,
	SqlKeywords.LINEAR,
	SqlKeywords.LINES,
	SqlKeywords.LOAD,
	SqlKeywords.LOCALTIME,
	SqlKeywords.LOCALTIMESTAMP,
	SqlKeywords.LOCK,
	SqlKeywords.LONG,
	SqlKeywords.LONGBLOB,
	SqlKeywords.LONGTEXT,
	SqlKeywords.LOOP,
	SqlKeywords.LOW_PRIORITY,
	SqlKeywords.MASTER_BIND,
	SqlKeywords.MASTER_SSL_VERIFY_SERVER_CERT,
	SqlKeywords.MATCH,
	SqlKeywords.MAXVALUE,
	SqlKeywords.MEDIUMBLOB,
	SqlKeywords.MEDIUMINT,
	SqlKeywords.MEDIUMTEXT,
	SqlKeywords.MIDDLEINT,
	SqlKeywords.MINUTE_MICROSECOND,
	SqlKeywords.MINUTE_SECOND,
	SqlKeywords.MOD,
	SqlKeywords.MODIFIES,
	SqlKeywords.NATURAL,
	SqlKeywords.NOT,
	SqlKeywords.NO_WRITE_TO_BINLOG,
	SqlKeywords.NULL,
	SqlKeywords.NUMERIC,
	SqlKeywords.ON,
	SqlKeywords.OPTIMIZE,
	SqlKeywords.OPTIMIZER_COSTS,
	SqlKeywords.OPTION,
	SqlKeywords.OPTIONALLY,
	SqlKeywords.OR,
	SqlKeywords.ORDER,
	SqlKeywords.OUT,
	SqlKeywords.OUTER,
	SqlKeywords.OUTFILE,
	SqlKeywords.PARTITION,
	SqlKeywords.PRECISION,
	SqlKeywords.PRIMARY,
	SqlKeywords.PROCEDURE,
	SqlKeywords.PURGE,
	SqlKeywords.RANGE,
	SqlKeywords.READ,
	SqlKeywords.READS,
	SqlKeywords.READ_WRITE,
	SqlKeywords.REAL,
	SqlKeywords.REFERENCES,
	SqlKeywords.REGEXP,
	SqlKeywords.RELEASE,
	SqlKeywords.RENAME,
	SqlKeywords.REPEAT,
	SqlKeywords.REPLACE,
	SqlKeywords.REQUIRE,
	SqlKeywords.RESIGNAL,
	SqlKeywords.RESTRICT,
	SqlKeywords.RETURN,
	SqlKeywords.REVOKE,
	SqlKeywords.RIGHT,
	SqlKeywords.RLIKE,
	SqlKeywords.SCHEMA,
	SqlKeywords.SCHEMAS,
	SqlKeywords.SECOND_MICROSECOND,
	SqlKeywords.SELECT,
	SqlKeywords.SENSITIVE,
	SqlKeywords.SEPARATOR,
	SqlKeywords.SET,
	SqlKeywords.SHOW,
	SqlKeywords.SIGNAL,
	SqlKeywords.SMALLINT,
	SqlKeywords.SPATIAL,
	SqlKeywords.SPECIFIC,
	SqlKeywords.SQL,
	SqlKeywords.SQLEXCEPTION,
	SqlKeywords.SQLSTATE,
	SqlKeywords.SQLWARNING,
	SqlKeywords.SQL_BIG_RESULT,
	SqlKeywords.SQL_CALC_FOUND_ROWS,
	SqlKeywords.SQL_SMALL_RESULT,
	SqlKeywords.SSL,
	SqlKeywords.STARTING,
	SqlKeywords.STORED,
	SqlKeywords.STRAIGHT_JOIN,
	SqlKeywords.TABLE,
	SqlKeywords.TERMINATED,
	SqlKeywords.THEN,
	SqlKeywords.TINYBLOB,
	SqlKeywords.TINYINT,
	SqlKeywords.TINYTEXT,
	SqlKeywords.TO,
	SqlKeywords.TRAILING,
	SqlKeywords.TRIGGER,
	SqlKeywords.TRUE,
	SqlKeywords.UNDO,
	SqlKeywords.UNION,
	SqlKeywords.UNIQUE,
	SqlKeywords.UNLOCK,
	SqlKeywords.UNSIGNED,
	SqlKeywords.UPDATE,
	SqlKeywords.USAGE,
	SqlKeywords.USE,
	SqlKeywords.USING,
	SqlKeywords.UTC_DATE,
	SqlKeywords.UTC_TIME,
	SqlKeywords.UTC_TIMESTAMP,
	SqlKeywords.VALUES,
	SqlKeywords.VARBINARY,
	SqlKeywords.VARCHAR,
	SqlKeywords.VARCHARACTER,
	SqlKeywords.VARYING,
	SqlKeywords.VIRTUAL,
	SqlKeywords.WHEN,
	SqlKeywords.WHERE,
	SqlKeywords.WHILE,
	SqlKeywords.WITH,
	SqlKeywords.WRITE,
	SqlKeywords.XOR,
	SqlKeywords.YEAR_MONTH,
	SqlKeywords.ZEROFILL,
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

		if (
			options.package === "mysql" &&
			semver.satisfies("<8.0.0", options.version || "0")
		) {
			this.reserved.add(SqlKeywords.ANALYSE);
			this.reserved.add(SqlKeywords.DES_KEY_FILE);
			this.reserved.add(SqlKeywords.ANALYSE);
			this.reserved.add(SqlKeywords.MASTER_SERVER_ID);
			this.reserved.add(SqlKeywords.PARSE_GCOL_EXPR);
			this.reserved.add(SqlKeywords.REDOFILE);
			this.reserved.add(SqlKeywords.SQL_CACHE);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.1", options.version || "0")
		) {
			this.reserved.add(SqlKeywords.CUBE);
			this.reserved.add(SqlKeywords.FUNCTION);
			this.reserved.add(SqlKeywords.GROUPING);
			this.reserved.add(SqlKeywords.OF);
			this.reserved.add(SqlKeywords.RECURSIVE);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.2", options.version || "0")
		) {
			this.reserved.add(SqlKeywords.CUME_DIST);
			this.reserved.add(SqlKeywords.DENSE_RANK);
			this.reserved.add(SqlKeywords.FIRST_VALUE);
			this.reserved.add(SqlKeywords.GROUPS);
			this.reserved.add(SqlKeywords.LAG);
			this.reserved.add(SqlKeywords.LAST_VALUE);
			this.reserved.add(SqlKeywords.LEAD);
			this.reserved.add(SqlKeywords.NTH_VALUE);
			this.reserved.add(SqlKeywords.NTILE);
			this.reserved.add(SqlKeywords.OVER);
			this.reserved.add(SqlKeywords.PERCENT_RANK);
			this.reserved.add(SqlKeywords.RANK);
			this.reserved.add(SqlKeywords.ROW);
			this.reserved.add(SqlKeywords.ROWS);
			this.reserved.add(SqlKeywords.ROW_NUMBER);
			this.reserved.add(SqlKeywords.WINDOW);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.3", options.version || "0")
		) {
			this.reserved.add(SqlKeywords.SYSTEM);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.4", options.version || "0")
		) {
			this.reserved.add(SqlKeywords.EMPTY);
			this.reserved.add(SqlKeywords.JSON_TABLE);
		}
		if (
			options.package === "mysql" &&
			semver.satisfies(">=8.0.14", options.version || "0")
		) {
			this.reserved.add(SqlKeywords.LATERAL);
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
		const keyword = SqlKeywords.for(token.text);
		if (keyword) {
			token.keyword = keyword;
			if (this.isReserved(keyword)) {
				token.type = SqlTokenType.Reserved;
			}
			if (state.mode === Mode.SQL_START) {
				state.mode = Mode.SQL_PART;
			}

			if (state.mode === Mode.SQL_START) {
				if (keyword === SqlKeywords.CREATE) {
					state.mode = Mode.SQL_OBJECT_DEF;
				} else {
					state.mode = Mode.SQL_PART;
				}
			} else if (
				state.mode === Mode.SQL_OBJECT_DEF &&
				(keyword === SqlKeywords.DATABASE ||
					keyword === SqlKeywords.SCHEMA ||
					keyword === SqlKeywords.EVENT ||
					keyword === SqlKeywords.FUNCTION ||
					keyword === SqlKeywords.INDEX ||
					keyword === SqlKeywords.INSTANCE ||
					keyword === SqlKeywords.LOGFILE ||
					keyword === SqlKeywords.PROCEDURE ||
					keyword === SqlKeywords.SERVER ||
					keyword === SqlKeywords.SPATIAL ||
					keyword === SqlKeywords.TABLE ||
					keyword === SqlKeywords.TABLESPACE ||
					keyword === SqlKeywords.TRIGGER ||
					keyword === SqlKeywords.VIEW)
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

	private toSemverString(version: string) {
		const value = Number.parseInt(version, 10);
		const major = Math.trunc(value / 10000);
		const minor = Math.trunc((value / 100) % 100);
		const patch = Math.trunc(value % 100);
		return `${major}.${minor}.${patch}`;
	}
}
