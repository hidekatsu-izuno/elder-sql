import semver from "semver"
import {
  TokenType,
  Token,
  Lexer,
  SourceLocation,
  Keyword,
  Operator,
  Variable,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
} from "../parser"
import { dequote, escapeRegExp, ucase } from "../util"

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

const VariableMap = new Map([
  [ "@@GLOBAL", Variable.GLOBAL ],
  [ "@@SESSION", Variable.SESSION ],
  [ "@@LOCAL", Variable.LOCAL ],
])

const CommandPattern = "^(\\?|\\\\[!-~]|clear|connect|delimiter|edit|ego|exit|go|help|nopager|notee|pager|print|prompt|quit|rehash|source|status|system|tee|use|charset|warnings|nowarning)(?:[ \\t]*.*)"

export class MysqlLexer extends Lexer {
  private reserved = new Set<Keyword>()
  private reCommand = new RegExp(`${CommandPattern}(;|$)`, "imy")
  private reDelimiter = new RegExp(";", "y")

  constructor(
    options: Record<string, any> = {}
  ) {
    super("mysql", [
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /(#.*|--([ \t].*)$)/my },
      { type: TokenType.Command, re: () => this.reCommand },
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.Delimiter, re: () => this.reDelimiter },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Size, re: /(0|[1-9][0-9]*)[KMG]/iy },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /([bBnN]|_[a-zA-Z]+)?'([^']|'')*'/y },
      { type: TokenType.QuotedValue, re: /([bBnN]|_[a-zA-Z]+)?"([^"]|"")*"/y },
      { type: TokenType.QuotedIdentifier, re: /`([^`]|``)*`/y },
      { type: TokenType.BindVariable, re: /\?/y },
      { type: TokenType.Variable, re: /@@?([a-zA-Z0-9._$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]+|`([^`]|``)*`|'([^']|'')*'|"([^"]|"")*")/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\|&&|<=>|<<|>>|<>|->>?|[=<>!:]=?|[~&|^*/%+-]/y },
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

  protected filter(input: string) {
    return input.replace(/\/\*!([0-9]*)(.*?)\*\//sg, (m, p1, p2) => {
      if (this.options.version && p1) {
        if (semver.lt(this.options.version, this.toSemverString(p1))) {
          return m
        }
      }
      return " ".repeat((p1 ? p1.length : 0) + 2) + p2 + "  "
    })
  }

  protected process(token: Token) {
    if (token.type === TokenType.Identifier) {
      const keyword = Keyword.from(token.text)
      if (keyword) {
        if (ReservedSet.has(keyword)) {
          token.type = keyword
        } else {
          token.subtype = keyword
        }
      }
    } else if (token.type === TokenType.Operator) {
      const operator = Operator.from(token.text)
      if (operator) {
        token.subtype = operator
      }
    } else if (token.type === TokenType.Variable) {
      const variable = VariableMap.get(token.text.toUpperCase())
      if (variable) {
        token.subtype = variable
      }
    } else if (token.type === TokenType.Command) {
      const m = /^(?:\\d|[Dd][Ee][Ll][Ii][Mm][Ii][Tt][Ee][Rr])[ \t]+(.+)$/.exec(token.text)
      if (m) {
        const sep = escapeRegExp(m[1])
        this.reCommand = new RegExp(`${CommandPattern}(${sep}|$)`, "imy")
        this.reDelimiter = new RegExp(sep, "y")
      }
    }
    return token
  }
  
  private toSemverString(version: string) {
    const value = Number.parseInt(version, 10)
    const major = Math.trunc(value / 10000)
    const minor = Math.trunc(value / 100 % 100)
    const patch = Math.trunc(value % 100)
    return `${major}.${minor}.${patch}`
  }
}

export class MysqlParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new MysqlLexer(options).lex(input)
    return new MysqlParser(tokens, options).parse()
  }

  private sqlMode = new Set<string>()

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
    this.setSqlMode(options.sqlMode)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Eof)) {
          root.add(this.consume())
          break
        } else if (this.peekIf(TokenType.Delimiter)) {
          root.add(this.consume())
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          root.add(this.statement())
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            root.add(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (this.token() != null) {
      for (let i = this.pos; i < this.tokens.length; i++) {
        root.add(this.tokens[i])
      }
      
      try {
        throw this.createParseError()
      } catch (e) {
        if (e instanceof ParseError) {
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (errors.length) {
      const err = new AggregateParseError(errors, `${errors.length} error found\n${errors.map(
        e => e.message
      ).join("\n")}`)
      err.node = root
      throw err
    }

    return root
  }

  private command() {
    const stmt = new Node("command")
    this.consume(TokenType.Command)
    const token = this.token(-1)

    const sep = Math.max(token.text.indexOf(" "), token.text.indexOf("\t"))
    if (sep === -1) {
      stmt.add(new Node("name", this.getLongCommandName(token.text)).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), [], token.location)
      const name = this.getLongCommandName(nameToken.text)
      stmt.add(new Node("name", name).add(nameToken))

      const argTokens = []
      const args = token.text.substring(sep)

      if (name === "prompt") {
        const m = /^[ \t]*/.exec(args)
        let sep2 = sep
        if (m) {
          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = sep2
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(TokenType.WhiteSpace, m[0], [], token.location))
          sep2 += m[0].length
        }
        if (sep2 < args.length) {
          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = sep2
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(TokenType.Identifier, args.substring(sep2), [], loc))
        }
      } else {
        const re = /([ \t]+)|('(?:''|[^']+)*'|`(?:``|[^`]+)*`)|([^ \t'`]+)/y
        let pos = 0
        while (pos < args.length) {
          re.lastIndex = pos
          const m = re.exec(args)
          if (m) {
            const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier

            const loc = new SourceLocation()
            loc.fileName = token.location?.fileName
            loc.position = re.lastIndex
            loc.lineNumber = token.location?.lineNumber
            if (token.location?.columnNumber != null) {
              loc.columnNumber = token.location?.columnNumber + loc.position
            }

            argTokens.push(new Token(type, m[0], [], loc))
            pos = re.lastIndex
          }
        }
      }

      const skips = new Array<Token>()
      for (const argToken of argTokens) {
        if (argToken.type.options.skip) {
          skips.push(argToken)
        } else {
          argToken.skips.push(...skips)
          skips.length = 0
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    return stmt
  }

  private statement() {
    const stmt = new Node("")

    try {
      //TODO
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (this.token() && !this.peekIf(TokenType.Delimiter)) {
          this.consume()
          stmt.add(this.token(-1))
        }
        err.node = stmt
      }
      throw err
    }

    return stmt
  }

  private setSqlMode(text: string) {
    this.sqlMode.clear()
    if (text) {
      for (let mode of text.split(/,/g)) {
        mode = ucase(mode)
        if (mode === "ANSI") {
          this.sqlMode.add("REAL_AS_FLOAT")
          this.sqlMode.add("PIPES_AS_CONCAT")
          this.sqlMode.add("ANSI_QUOTES")
          this.sqlMode.add("IGNORE_SPACE")
          if (this.options.variant === "mysql") {
            if (!this.options.version || semver.gte(this.options.version, "8.0.0")) {
              this.sqlMode.add("ONLY_FULL_GROUP_BY")
            }
          }
        } else if (mode === "TRADITIONAL") {
          this.sqlMode.add("STRICT_TRANS_TABLES")
          this.sqlMode.add("STRICT_ALL_TABLES")
          this.sqlMode.add("NO_ZERO_IN_DATE")
          this.sqlMode.add("NO_ZERO_DATE")
          this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
          this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
        } else {
          if (this.options.variant === "mariadb" || semver.lt(this.options.version, "8.0.0")) {
            if (mode === "DB2" || mode === "MAXDB" || mode === "MSSQL" || mode === "ORACLE" || mode === "POSTGRESQL") {
              if (mode === "DB2") {
                this.sqlMode.add("DB2")
              } else if (mode === "MAXDB") {
                this.sqlMode.add("MAXDB")
                this.sqlMode.add("NO_AUTO_CREATE_USER")
              } else if (mode === "ORACLE") {
                this.sqlMode.add("NO_AUTO_CREATE_USER")
                this.sqlMode.add("SIMULTANEOUS_ASSIGNMENT")
              } else if (mode === "POSTGRESQL") {
                this.sqlMode.add("POSTGRESQL")
              }
              this.sqlMode.add("PIPES_AS_CONCAT")
              this.sqlMode.add("ANSI_QUOTES")
              this.sqlMode.add("IGNORE_SPACE")
              this.sqlMode.add("NO_KEY_OPTIONS")
              this.sqlMode.add("NO_TABLE_OPTIONS")
              this.sqlMode.add("NO_FIELD_OPTIONS")
            } else if (mode === "MYSQL323" || mode === "MYSQL40") {
              this.sqlMode.add("NO_FIELD_OPTIONS")
              this.sqlMode.add("HIGH_NOT_PRECEDENCE")
            } else {
              this.sqlMode.add(mode)
            }
          } else {
            this.sqlMode.add(mode)
          }
        }
      }
    } else if (this.options.variant === "mariadb") {
      if (!this.options.version || semver.gte(this.options.version, "10.2.4")) {
        this.sqlMode.add("STRICT_TRANS_TABLES")
        this.sqlMode.add("NO_AUTO_CREATE_USER")
        this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      } else if (semver.gte(this.options.version, "10.1.7")) {
        this.sqlMode.add("NO_AUTO_CREATE_USER")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      }
    } else {
      if (!this.options.version || semver.gte(this.options.version, "8.0.0")) {
        this.sqlMode.add("ONLY_FULL_GROUP_BY")
        this.sqlMode.add("STRICT_TRANS_TABLES")
        this.sqlMode.add("NO_ZERO_IN_DATE")
        this.sqlMode.add("NO_ZERO_DATE")
        this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      } else if (semver.gte(this.options.version, "5.7.0")) {
        this.sqlMode.add("ONLY_FULL_GROUP_BY")
        this.sqlMode.add("STRICT_TRANS_TABLES")
        this.sqlMode.add("NO_ZERO_IN_DATE")
        this.sqlMode.add("NO_ZERO_DATE")
        this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
        this.sqlMode.add("NO_AUTO_CREATE_USER")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      } else if (semver.gte(this.options.version, "5.6.6")) {
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      }
    }
  }

  private getLongCommandName(name: string) {
    if (name === "?" || name === "\\?" || name === "\\h" || /^help$/i.test(name)) {
      return "help"
    } else if (name === "\\c" || /^clear$/i.test(name)) {
      return "clear"
    } else if (name === "\\r" || /^connect$/i.test(name)) {
      return "connect"
    } else if (name === "\\d" || /^delimiter$/i.test(name)) {
      return "delimiter"
    } else if (name === "\\e" || /^edit$/i.test(name)) {
      return "edit"
    } else if (name === "\\G" || /^ego$/i.test(name)) {
      return "ego"
    } else if (name === "\\q" || /^exit$/i.test(name)) {
      return "exit"
    } else if (name === "\\g" || /^go$/i.test(name)) {
      return "go"
    } else if (name === "\\n" || /^nopager$/i.test(name)) {
      return "nopager"
    } else if (name === "\\t" || /^notee$/i.test(name)) {
      return "notee"
    } else if (name === "\\P" || /^pager$/i.test(name)) {
      return "pager"
    } else if (name === "\\p" || /^print$/i.test(name)) {
      return "print"
    } else if (name === "\\R" || /^prompt$/i.test(name)) {
      return "prompt"
    } else if (name === "\\q" || /^quit$/i.test(name)) {
      return "quit"
    } else if (name === "\\#" || /^rehash$/i.test(name)) {
      return "rehash"
    } else if (name === "\\." || /^source$/i.test(name)) {
      return "source"
    } else if (name === "\\s" || /^status$/i.test(name)) {
      return "status"
    } else if (name === "\\!" || /^system$/i.test(name)) {
      return "system"
    } else if (name === "\\T" || /^tee$/i.test(name)) {
      return "tee"
    } else if (name === "\\u" || /^use$/i.test(name)) {
      return "use"
    } else if (name === "\\C" || /^charset$/i.test(name)) {
      return "charset"
    } else if (name === "\\W" || /^warnings$/i.test(name)) {
      return "warnings"
    } else if (name === "\\w" || /^nowarning$/i.test(name)) {
      return "nowarning"
    } else {
      return name
    }
  }
}