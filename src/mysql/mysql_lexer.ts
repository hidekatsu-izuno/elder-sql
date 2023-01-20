
import semver from "semver"
import { escapeRegExp } from "../util.js"
import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
} from "../lexer.js"

const ReservedSet = new Set<Keyword>([
  Keyword.ACCESSIBLE,
  Keyword.ADD,
  Keyword.ALL,
  Keyword.ALTER,
  Keyword.ANALYZE,
  Keyword.AND,
  Keyword.AS,
  Keyword.ASC,
  Keyword.ASENSITIVE,
  Keyword.BEFORE,
  Keyword.BETWEEN,
  Keyword.BIGINT,
  Keyword.BINARY,
  Keyword.BLOB,
  Keyword.BOTH,
  Keyword.BY,
  Keyword.CALL,
  Keyword.CASCADE,
  Keyword.CASE,
  Keyword.CHANGE,
  Keyword.CHAR,
  Keyword.CHARACTER,
  Keyword.CHECK,
  Keyword.COLLATE,
  Keyword.COLUMN,
  Keyword.CONDITION,
  Keyword.CONSTRAINT,
  Keyword.CONTINUE,
  Keyword.CONVERT,
  Keyword.CREATE,
  Keyword.CROSS,
  Keyword.CURRENT_DATE,
  Keyword.CURRENT_TIME,
  Keyword.CURRENT_TIMESTAMP,
  Keyword.CURRENT_USER,
  Keyword.CURSOR,
  Keyword.DATABASE,
  Keyword.DATABASES,
  Keyword.DAY_HOUR,
  Keyword.DAY_MICROSECOND,
  Keyword.DAY_MINUTE,
  Keyword.DAY_SECOND,
  Keyword.DEC,
  Keyword.DECIMAL,
  Keyword.DECLARE,
  Keyword.DEFAULT,
  Keyword.DELAYED,
  Keyword.DELETE,
  Keyword.DESC,
  Keyword.DESCRIBE,
  Keyword.DETERMINISTIC,
  Keyword.DISTINCT,
  Keyword.DISTINCTROW,
  Keyword.DIV,
  Keyword.DOUBLE,
  Keyword.DROP,
  Keyword.DUAL,
  Keyword.EACH,
  Keyword.ELSE,
  Keyword.ELSEIF,
  Keyword.ENCLOSED,
  Keyword.ESCAPED,
  Keyword.EXCEPT,
  Keyword.EXISTS,
  Keyword.EXIT,
  Keyword.EXPLAIN,
  Keyword.FALSE,
  Keyword.FETCH,
  Keyword.FLOAT,
  Keyword.FOR,
  Keyword.FORCE,
  Keyword.FOREIGN,
  Keyword.FROM,
  Keyword.FULLTEXT,
  Keyword.GENERATED,
  Keyword.GET,
  Keyword.GRANT,
  Keyword.GROUP,
  Keyword.HAVING,
  Keyword.HIGH_PRIORITY,
  Keyword.HOUR_MICROSECOND,
  Keyword.HOUR_MINUTE,
  Keyword.HOUR_SECOND,
  Keyword.IF,
  Keyword.IGNORE,
  Keyword.IN,
  Keyword.INDEX,
  Keyword.INFILE,
  Keyword.INNER,
  Keyword.INOUT,
  Keyword.INSENSITIVE,
  Keyword.INSERT,
  Keyword.INT,
  Keyword.INTEGER,
  Keyword.INTERVAL,
  Keyword.INTO,
  Keyword.IO_AFTER_GTIDS,
  Keyword.IO_BEFORE_GTIDS,
  Keyword.IS,
  Keyword.ITERATE,
  Keyword.JOIN,
  Keyword.KEY,
  Keyword.KEYS,
  Keyword.KILL,
  Keyword.LEADING,
  Keyword.LEAVE,
  Keyword.LEFT,
  Keyword.LIKE,
  Keyword.LIMIT,
  Keyword.LINEAR,
  Keyword.LINES,
  Keyword.LOAD,
  Keyword.LOCALTIME,
  Keyword.LOCALTIMESTAMP,
  Keyword.LOCK,
  Keyword.LONG,
  Keyword.LONGBLOB,
  Keyword.LONGTEXT,
  Keyword.LOOP,
  Keyword.LOW_PRIORITY,
  Keyword.MASTER_BIND,
  Keyword.MASTER_SSL_VERIFY_SERVER_CERT,
  Keyword.MATCH,
  Keyword.MAXVALUE,
  Keyword.MEDIUMBLOB,
  Keyword.MEDIUMINT,
  Keyword.MEDIUMTEXT,
  Keyword.MIDDLEINT,
  Keyword.MINUTE_MICROSECOND,
  Keyword.MINUTE_SECOND,
  Keyword.MOD,
  Keyword.MODIFIES,
  Keyword.NATURAL,
  Keyword.NOT,
  Keyword.NO_WRITE_TO_BINLOG,
  Keyword.NULL,
  Keyword.NUMERIC,
  Keyword.ON,
  Keyword.OPTIMIZE,
  Keyword.OPTIMIZER_COSTS,
  Keyword.OPTION,
  Keyword.OPTIONALLY,
  Keyword.OR,
  Keyword.ORDER,
  Keyword.OUT,
  Keyword.OUTER,
  Keyword.OUTFILE,
  Keyword.PARTITION,
  Keyword.PRECISION,
  Keyword.PRIMARY,
  Keyword.PROCEDURE,
  Keyword.PURGE,
  Keyword.RANGE,
  Keyword.READ,
  Keyword.READS,
  Keyword.READ_WRITE,
  Keyword.REAL,
  Keyword.REFERENCES,
  Keyword.REGEXP,
  Keyword.RELEASE,
  Keyword.RENAME,
  Keyword.REPEAT,
  Keyword.REPLACE,
  Keyword.REQUIRE,
  Keyword.RESIGNAL,
  Keyword.RESTRICT,
  Keyword.RETURN,
  Keyword.REVOKE,
  Keyword.RIGHT,
  Keyword.RLIKE,
  Keyword.SCHEMA,
  Keyword.SCHEMAS,
  Keyword.SECOND_MICROSECOND,
  Keyword.SELECT,
  Keyword.SENSITIVE,
  Keyword.SEPARATOR,
  Keyword.SET,
  Keyword.SHOW,
  Keyword.SIGNAL,
  Keyword.SMALLINT,
  Keyword.SPATIAL,
  Keyword.SPECIFIC,
  Keyword.SQL,
  Keyword.SQLEXCEPTION,
  Keyword.SQLSTATE,
  Keyword.SQLWARNING,
  Keyword.SQL_BIG_RESULT,
  Keyword.SQL_CALC_FOUND_ROWS,
  Keyword.SQL_SMALL_RESULT,
  Keyword.SSL,
  Keyword.STARTING,
  Keyword.STORED,
  Keyword.STRAIGHT_JOIN,
  Keyword.TABLE,
  Keyword.TERMINATED,
  Keyword.THEN,
  Keyword.TINYBLOB,
  Keyword.TINYINT,
  Keyword.TINYTEXT,
  Keyword.TO,
  Keyword.TRAILING,
  Keyword.TRIGGER,
  Keyword.TRUE,
  Keyword.UNDO,
  Keyword.UNION,
  Keyword.UNIQUE,
  Keyword.UNLOCK,
  Keyword.UNSIGNED,
  Keyword.UPDATE,
  Keyword.USAGE,
  Keyword.USE,
  Keyword.USING,
  Keyword.UTC_DATE,
  Keyword.UTC_TIME,
  Keyword.UTC_TIMESTAMP,
  Keyword.VALUES,
  Keyword.VARBINARY,
  Keyword.VARCHAR,
  Keyword.VARCHARACTER,
  Keyword.VARYING,
  Keyword.VIRTUAL,
  Keyword.WHEN,
  Keyword.WHERE,
  Keyword.WHILE,
  Keyword.WITH,
  Keyword.WRITE,
  Keyword.XOR,
  Keyword.YEAR_MONTH,
  Keyword.ZEROFILL,
])

const ObjectStartSet = new Set<Keyword>([
  Keyword.DATABASE,
  Keyword.SCHEMA,
  Keyword.EVENT,
  Keyword.FUNCTION,
  Keyword.INDEX,
  Keyword.INSTANCE,
  Keyword.LOGFILE,
  Keyword.PROCEDURE,
  Keyword.SERVER,
  Keyword.SPATIAL,
  Keyword.TABLE,
  Keyword.TABLESPACE,
  Keyword.TRIGGER,
  Keyword.VIEW,
])

const CommandPattern = "^(\\?|\\\\[!-~]|clear|connect|delimiter|edit|ego|exit|go|help|nopager|notee|pager|print|prompt|quit|rehash|source|status|system|tee|use|charset|warnings|nowarning)(?:[ \\t]*.*)"

const Mode = {
  INITIAL: 0,
  SQL_START: 1,
  SQL_OBJECT_DEF: 2,
  SQL_PROC: 3,
  SQL_PART: Number.MAX_SAFE_INTEGER,
} as const

export declare type MysqlLexerOptions = LexerOptions & {
  package?: string
  version?: string
}

export class MysqlLexer extends Lexer {
  static isObjectStart(keyword?: Keyword) {
    return keyword != null && ObjectStartSet.has(keyword)
  }

  private reserved = new Set<Keyword>()
  private reCommandPattern = new RegExp(`${CommandPattern}(;|$)`, "imy")
  private reDelimiterPattern = new RegExp(";", "y")

  constructor(
    options: MysqlLexerOptions = {}
  ) {
    super("mysql", [
      { type: TokenType.Delimiter, 
        re: (state) => this.reDelimiterPattern,
        onMatch: (state, token) => this.onMatchDelimiter(state, token)
      },
      { type: TokenType.WhiteSpace, re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y },
      { type: TokenType.LineBreak, re: /\r?\n/y },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy,
        onMatch: (state, token) => this.onMatchBlockComment(state, token)
      },
      { type: TokenType.LineComment, re: /(#.*|--([ \f\t\v].*)$)/my },
      { type: TokenType.Command, 
        re: (state) => state.mode === Mode.INITIAL ? this.reCommandPattern : false,
        onMatch: (state, token) => this.onMatchCommand(state, token),
        onUnmatch: (state) => this.onUnmatchCommand(state)
      },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Label, re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*:/y },
      { type: TokenType.Numeric, re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Size, re: /(0|[1-9][0-9]*)[KMG]/iy },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /([bBnN]|_[a-zA-Z]+)?('([^']|'')*'|"([^"]|"")*")/y },
      { type: TokenType.Identifier, re: /"([^"]|"")*"|`([^`]|``)*`/y },
      { type: TokenType.BindVariable, re: /\?/y },
      { type: TokenType.Variable, re: /@@?([a-zA-Z0-9._$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]+|`([^`]|``)*`|'([^']|'')*'|"([^"]|"")*")/y },
      { type: TokenType.Operator, re: /\|\|&&|<=>|<<|>>|<>|->>?|[=<>!:]=?|[~&|^*/%+-]/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
        onMatch: (state, token) => this.onMatchIdentifier(state, token)
      },
      { type: TokenType.Error, re: /./y },
    ], options)

    if (options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")) {
      this.reserved.add(Keyword.ANALYSE)
      this.reserved.add(Keyword.DES_KEY_FILE)
      this.reserved.add(Keyword.ANALYSE)
      this.reserved.add(Keyword.MASTER_SERVER_ID)
      this.reserved.add(Keyword.PARSE_GCOL_EXPR)
      this.reserved.add(Keyword.REDOFILE)
      this.reserved.add(Keyword.SQL_CACHE)
    }
    if (options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")) {
      this.reserved.add(Keyword.CUBE)
      this.reserved.add(Keyword.FUNCTION)
      this.reserved.add(Keyword.GROUPING)
      this.reserved.add(Keyword.OF)
      this.reserved.add(Keyword.RECURSIVE)
    }
    if (options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")) {
      this.reserved.add(Keyword.CUME_DIST)
      this.reserved.add(Keyword.DENSE_RANK)
      this.reserved.add(Keyword.FIRST_VALUE)
      this.reserved.add(Keyword.GROUPS)
      this.reserved.add(Keyword.LAG)
      this.reserved.add(Keyword.LAST_VALUE)
      this.reserved.add(Keyword.LEAD)
      this.reserved.add(Keyword.NTH_VALUE)
      this.reserved.add(Keyword.NTILE)
      this.reserved.add(Keyword.OVER)
      this.reserved.add(Keyword.PERCENT_RANK)
      this.reserved.add(Keyword.RANK)
      this.reserved.add(Keyword.ROW)
      this.reserved.add(Keyword.ROWS)
      this.reserved.add(Keyword.ROW_NUMBER)
      this.reserved.add(Keyword.WINDOW)
    }
    if (options.package === "mysql" && semver.satisfies(">=8.0.3", options.version || "0")) {
      this.reserved.add(Keyword.SYSTEM)
    }
    if (options.package === "mysql" && semver.satisfies(">=8.0.4", options.version || "0")) {
      this.reserved.add(Keyword.EMPTY)
      this.reserved.add(Keyword.JSON_TABLE)
    }
    if (options.package === "mysql" && semver.satisfies(">=8.0.14", options.version || "0")) {
      this.reserved.add(Keyword.LATERAL)
    }
  }
  
  isReserved(keyword?: Keyword) {
    return keyword != null && (ReservedSet.has(keyword) || this.reserved.has(keyword))
  }

  protected initState(state: Record<string, any>) {
    state.mode = Mode.INITIAL
  }

  private onMatchDelimiter(state: Record<string, any>, token: Token) {
    state.mode = Mode.INITIAL
    token.eos = true
  }

  private onMatchBlockComment(state: Record<string, any>, token: Token) {
    if (token.text.startsWith('/*!')) {
      const m = /^\/\*!([0-9]{5})?[ \f\t\v\r\n](.*)[ \f\t\v\r\n]\*\/$/s.exec(token.text)
      if (m && (!m[1] || !this.options.version || semver.gte(this.options.version, this.toSemverString(m[1])))) {
        const start = (m[1] ? m[1].length : 0) + 3
        return this.sublex(
          state,
          " ".repeat(start) + token.text.substring(start, token.text.length-2) + "  ",
          token.location,
        )
      }
    }
  }
  
  private onMatchCommand(state: Record<string, any>, token: Token) {
    state.mode = Mode.INITIAL
    token.eos = true

    const m = /^(?:\\d|[Dd][Ee][Ll][Ii][Mm][Ii][Tt][Ee][Rr])[ \t]+(.+)$/.exec(token.text)
    if (m) {
      const sep = escapeRegExp(m[1])
      this.reCommandPattern = new RegExp(`${CommandPattern}(${sep}|$)`, "imy")
      this.reDelimiterPattern = new RegExp(sep, "y")
    }
  }

  private onUnmatchCommand(state: Record<string, any>) {
    if (state.mode === Mode.INITIAL) {
      state.mode = Mode.SQL_START
    }
  }

  private onMatchIdentifier(state: Record<string, any>, token: Token) {
    const keyword = Keyword.for(token.text)
    if (keyword) {
      token.keyword = keyword
      if (this.isReserved(keyword)) {
        token.type = TokenType.Reserved
      }
      if (state.mode === Mode.SQL_START) {
        state.mode = Mode.SQL_PART
      }

      if (state.mode === Mode.SQL_START) {
        if (keyword === Keyword.CREATE) {
          state.mode = Mode.SQL_OBJECT_DEF
        } else {
          state.mode = Mode.SQL_PART
        }
      } else if (state.mode === Mode.SQL_OBJECT_DEF && MysqlLexer.isObjectStart(keyword)) {
        if (
          keyword === Keyword.FUNCTION
          || keyword === Keyword.PROCEDURE
          || keyword === Keyword.TRIGGER
        ) {
          state.mode = Mode.SQL_PROC
        } else {
          state.mode = Mode.SQL_PART
        }
      }
    }
  }

  private toSemverString(version: string) {
    const value = Number.parseInt(version, 10)
    const major = Math.trunc(value / 10000)
    const minor = Math.trunc(value / 100 % 100)
    const patch = Math.trunc(value % 100)
    return `${major}.${minor}.${patch}`
  }
}