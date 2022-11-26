import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
} from "../parser"
import { dequote, ucase } from "../util"

const KeywordMap = new Map<string, Keyword>()
export class Keyword extends TokenType {
  static ABORT = new Keyword("ABORT")
  static ACCESS = new Keyword("ACCESS")
  static AGGREGATE = new Keyword("AGGREGATE")
  static ALL = new Keyword("ALL", { reserved: true })
  static ALLOW_CONNECTIONS = new Keyword("ALLOW_CONNECTIONS")
  static ALTER = new Keyword("ALTER")
  static ANALYSE = new Keyword("ANALYSE", { reserved: true })
  static ANALYZE = new Keyword("ANALYZE", { reserved: true })
  static AND = new Keyword("AND", { reserved: true })
  static ANY = new Keyword("ANY", { reserved: true })
  static ARRAY = new Keyword("ARRAY", { reserved: true })
  static AS = new Keyword("AS", { reserved: true })
  static ASC = new Keyword("ASC", { reserved: true })
  static ASYMMETRIC = new Keyword("ASYMMETRIC", { reserved: true })
  static AUTHORIZATION = new Keyword("AUTHORIZATION")
  static BEGIN = new Keyword("BEGIN")
  static BINARY = new Keyword("BINARY")
  static BOTH = new Keyword("BOTH", { reserved: true })
  static BY = new Keyword("BY")
  static CALL = new Keyword("CALL")
  static CASCADE = new Keyword("CASCADE")
  static CASE = new Keyword("CASE", { reserved: true })
  static CAST = new Keyword("CAST", { reserved: true })
  static CHECK = new Keyword("CHECK", { reserved: true })
  static CHECKPOINT = new Keyword("CHECKPOINT")
  static CLASS = new Keyword("CLASS")
  static CLOSE = new Keyword("CLOSE")
  static CLUSTER = new Keyword("CLUSTER")
  static COLLATE = new Keyword("COLLATE", { reserved: true })
  static COLLATION = new Keyword("COLLATION")
  static COLUMN = new Keyword("COLUMN", { reserved: true })
  static COMMENT = new Keyword("COMMENT")
  static COMMIT = new Keyword("COMMIT")
  static CONCURRENTLY = new Keyword("CONCURRENTLY")
  static CONFIGURATION = new Keyword("CONFIGURATION")
  static CONNECTION = new Keyword("CONNECTION")
  static CONSTRAINT = new Keyword("CONSTRAINT", { reserved: true })
  static CONVERSION = new Keyword("CONVERSION")
  static COPY = new Keyword("COPY")
  static CREATE = new Keyword("CREATE", { reserved: true })
  static CROSS = new Keyword("CROSS")
  static CURRENT_CATALOG = new Keyword("CURRENT_CATALOG", { reserved: true })
  static CURRENT_DATE = new Keyword("CURRENT_DATE", { reserved: true })
  static CURRENT_ROLE = new Keyword("CURRENT_ROLE", { reserved: true })
  static CURRENT_SCHEMA = new Keyword("CURRENT_SCHEMA")
  static CURRENT_TIME = new Keyword("CURRENT_TIME", { reserved: true })
  static CURRENT_TIMESTAMP = new Keyword("CURRENT_TIMESTAMP", { reserved: true })
  static CURRENT_USER = new Keyword("CURRENT_USER", { reserved: true })
  static DATA = new Keyword("DATA")
  static DATABASE = new Keyword("DATABASE")
  static DEALLOCATE = new Keyword("DEALLOCATE")
  static DECLARE = new Keyword("DECLARE")
  static DEFAULT = new Keyword("DEFAULT", { reserved: true })
  static DEFERRABLE = new Keyword("DEFERRABLE", { reserved: true })
  static DELETE = new Keyword("DELETE")
  static DESC = new Keyword("DESC", { reserved: true })
  static DICTIONARY = new Keyword("DICTIONARY")
  static DISCARD = new Keyword("DISCARD")
  static DISTINCT = new Keyword("DISTINCT", { reserved: true })
  static DO = new Keyword("DO", { reserved: true })
  static DOMAIN = new Keyword("DOMAIN")
  static DROP = new Keyword("DROP")
  static ELSE = new Keyword("ELSE", { reserved: true })
  static ENCODING = new Keyword("ENCODING")
  static END = new Keyword("END", { reserved: true })
  static EVENT = new Keyword("EVENT")
  static EXCEPT = new Keyword("EXCEPT", { reserved: true })
  static EXISTS = new Keyword("EXISTS")
  static EXECUTE = new Keyword("EXECUTE")
  static EXTENSION = new Keyword("EXTENSION")
  static EXPLAIN = new Keyword("EXPLAIN")
  static FALSE = new Keyword("FALSE", { reserved: true })
  static FAMILY = new Keyword("FAMILY")
  static FETCH = new Keyword("FETCH", { reserved: true })
  static FOR = new Keyword("FOR", { reserved: true })
  static FOREIGN = new Keyword("FOREIGN", { reserved: true })
  static FUNCTION = new Keyword("FUNCTION")
  static FREEZE = new Keyword("FREEZE")
  static FROM = new Keyword("FROM", { reserved: true })
  static FULL = new Keyword("FULL")
  static GLOBAL = new Keyword("GLOBAL")
  static GRANT = new Keyword("GRANT", { reserved: true })
  static GROUP = new Keyword("GROUP", { reserved: true })
  static HAVING = new Keyword("HAVING", { reserved: true })
  static IF = new Keyword("IF")
  static ILIKE = new Keyword("ILIKE")
  static IMPORT = new Keyword("IMPORT")
  static IN = new Keyword("IN", { reserved: true })
  static INOUT = new Keyword("INOUT")
  static INITIALLY = new Keyword("INITIALLY", { reserved: true })
  static INDEX = new Keyword("INDEX")
  static INNER = new Keyword("INNER")
  static INSERT = new Keyword("INSERT")
  static INTERSECT = new Keyword("INTERSECT", { reserved: true })
  static INTO = new Keyword("INTO", { reserved: true })
  static IS = new Keyword("IS")
  static IS_TEMPLATE = new Keyword("IS_TEMPLATE")
  static ISNULL = new Keyword("ISNULL")
  static JOIN = new Keyword("JOIN")
  static LABEL = new Keyword("LABEL")
  static LANGUAGE = new Keyword("LANGUAGE")
  static LATERAL = new Keyword("LATERAL", { reserved: true })
  static LARGE = new Keyword("LARGE")
  static LC_COLLATE = new Keyword("LC_COLLATE")
  static LC_CTYPE = new Keyword("LC_CTYPE")
  static LEADING = new Keyword("LEADING", { reserved: true })
  static LEFT = new Keyword("LEFT")
  static LIKE = new Keyword("LIKE")
  static LIMIT = new Keyword("LIMIT", { reserved: true })
  static LISTEN = new Keyword("LISTEN")
  static LOCAL = new Keyword("LOCAL")
  static LOCALTIME = new Keyword("LOCALTIME", { reserved: true })
  static LOCALTIMESTAMP = new Keyword("LOCALTIMESTAMP", { reserved: true })
  static LOCK = new Keyword("LOCK")
  static LOAD = new Keyword("LOAD")
  static MATERIALIZED = new Keyword("MATERIALIZED")
  static MAPPING = new Keyword("MAPPING")
  static METHOD = new Keyword("METHOD")
  static MOVE = new Keyword("MOVE")
  static NATURAL = new Keyword("NATURAL")
  static NONE = new Keyword("NONE")
  static NOT = new Keyword("NOT", { reserved: true })
  static NOTIFY = new Keyword("NOTIFY")
  static NOTNULL = new Keyword("NOTNULL")
  static NULL = new Keyword("NULL", { reserved: true })
  static OBJECT = new Keyword("OBJECT")
  static OFF = new Keyword("OFF")
  static OFFSET = new Keyword("OFFSET", { reserved: true })
  static ON = new Keyword("ON", { reserved: true })
  static ONLY = new Keyword("ONLY", { reserved: true })
  static OPERATOR = new Keyword("OPERATOR")
  static OR = new Keyword("OR", { reserved: true })
  static ORDER = new Keyword("ORDER", { reserved: true })
  static OUT = new Keyword("OUT")
  static OUTER = new Keyword("OUTER")
  static OVERLAPS = new Keyword("OVERLAPS")
  static OWNED = new Keyword("OWNED")
  static OWNER = new Keyword("OWNER")
  static PARSER = new Keyword("PARSER")
  static PLACING = new Keyword("PLACING", { reserved: true })
  static POLICY = new Keyword("POLICY")
  static PREPARE = new Keyword("PREPARE")
  static PREPARED = new Keyword("PREPARED")
  static PRIMARY = new Keyword("PRIMARY", { reserved: true })
  static PRIVILEGES = new Keyword("PRIVILEGES")
  static PROCEDURAL = new Keyword("PROCEDURAL")
  static PROCEDURE = new Keyword("PROCEDURE")
  static PUBLIC = new Keyword("PUBLIC")
  static PUBLICATION = new Keyword("PUBLICATION")
  static REASSIGN = new Keyword("REASSIGN")
  static RECURSIVE = new Keyword("RECURSIVE")
  static REFERENCES = new Keyword("REFERENCES", { reserved: true })
  static REFRESH = new Keyword("REFRESH")
  static REINDEX = new Keyword("REINDEX")
  static RELEASE = new Keyword("RELEASE")
  static RESET = new Keyword("RESET")
  static RESTRICT = new Keyword("RESTRICT")
  static RETURNING = new Keyword("RETURNING", { reserved: true })
  static REVOKE = new Keyword("REVOKE")
  static RIGHT = new Keyword("RIGHT")
  static ROLE = new Keyword("ROLE")
  static ROLLBACK = new Keyword("ROLLBACK")
  static ROUTINE = new Keyword("ROUTINE")
  static RULE = new Keyword("RULE")
  static REPLACE = new Keyword("REPLACE")
  static SAVEPOINT = new Keyword("SAVEPOINT")
  static SCHEMA = new Keyword("SCHEMA")
  static SEARCH = new Keyword("SEARCH")
  static SECURITY = new Keyword("SECURITY")
  static SERVER = new Keyword("SERVER")
  static SELECT = new Keyword("SELECT", { reserved: true })
  static SEQUENCE = new Keyword("SEQUENCE")
  static SHOW = new Keyword("SHOW")
  static SESSION = new Keyword("SESSION")
  static SESSION_USER = new Keyword("SESSION_USER", { reserved: true })
  static SET = new Keyword("SET")
  static SIMILAR = new Keyword("SIMILAR")
  static SKIP_LOCKED = new Keyword("SKIP_LOCKED")
  static SOME = new Keyword("SOME", { reserved: true })
  static START = new Keyword("START")
  static STATISTICS = new Keyword("STATISTICS")
  static SUBSCRIPTION = new Keyword("SUBSCRIPTION")
  static SYMMETRIC = new Keyword("SYMMETRIC", { reserved: true })
  static SYSTEM = new Keyword("SYSTEM")
  static TABLE = new Keyword("TABLE", { reserved: true })
  static TABLESPACE  = new Keyword("TABLESPACE")
  static TEMP = new Keyword("TEMP")
  static TEMPLATE = new Keyword("TEMPLATE")
  static TEMPORARY = new Keyword("TEMPORARY")
  static TEXT = new Keyword("TEXT")
  static THEN = new Keyword("THEN", { reserved: true })
  static TO = new Keyword("TO", { reserved: true })
  static TRAILING = new Keyword("TRAILING", { reserved: true })
  static TRANSACTION = new Keyword("TRANSACTION")
  static TRANSFORM = new Keyword("TRANSFORM")
  static TRIGGER = new Keyword("TRIGGER")
  static TRUE = new Keyword("TRUE", { reserved: true })
  static TRUNCATE = new Keyword("TRUNCATE")
  static TRUSTED = new Keyword("TRUSTED")
  static TYPE = new Keyword("TYPE")
  static UNION = new Keyword("UNION", { reserved: true })
  static UNIQUE = new Keyword("UNIQUE", { reserved: true })
  static UNLISTEN = new Keyword("UNLISTEN")
  static UNLOGGED = new Keyword("UNLOGGED")
  static UPDATE = new Keyword("UPDATE")
  static USER = new Keyword("USER", { reserved: true })
  static USING = new Keyword("USING", { reserved: true })
  static VACUUM = new Keyword("VACUUM")
  static VALUES = new Keyword("VALUES")
  static VARIADIC = new Keyword("VARIADIC", { reserved: true })
  static VERBOSE = new Keyword("VERBOSE")
  static VIEW = new Keyword("VIEW")
  static WRAPPER = new Keyword("WRAPPER")
  static WHEN = new Keyword("WHEN", { reserved: true })
  static WHERE = new Keyword("WHERE", { reserved: true })
  static WINDOW = new Keyword("WINDOW", { reserved: true })
  static WITH = new Keyword("WITH", { reserved: true })

  static OPE_EQ = new Keyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new Keyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new Keyword("OPE_MINUS", { value: "-" })
  static OPE_ASTER = new Keyword("OPE_ASTER", { value: "*" })

  constructor(
    public name: string,
    public options: { [key: string]: any } = {}
  ) {
    super(name, options)
    KeywordMap.set(options.value ?? name, this)
  }
}

export class PostgresLexer extends Lexer {
  private reserved = new Set<Keyword>()

  constructor(
    private options: { [key: string]: any } = {}
  ) {
    super("postgres", [
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.Command, re: /^\\[^ \t]+([ \t]+('([^\\']|\\')*'|"([^\\"]|\\")*"|`([^\\`]|\\`)*`|[^ \t'"`]+))*(\\|$)/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.BlockComment, re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.LeftBracket, re: /\[/y },
      { type: TokenType.RightBracket, re: /\]/y },
      { type: TokenType.String, re: /([uU]&|[bBxX])?'([^']|'')*'/y },
      { type: TokenType.String, re: /\$([^$]+)\$.*\$\1\$/my },
      { type: TokenType.String, re: /\$\$.*\$\$/my },
      { type: TokenType.QuotedIdentifier, re: /([uU]&)?"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /\$([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /::|[*/<>=~!@#%^&|`?+-]+/y },
      { type: TokenType.Error, re: /./y },
    ])

    if (Array.isArray(options.reservedWords)) {
      const reserved = new Set<string>()
      for (const keyword of options.reservedWords) {
        reserved.add(ucase(keyword))
      }
      for (const keyword of KeywordMap.values()) {
        if (reserved.has(keyword.name)) {
          this.reserved.add(keyword)
        }
      }
    } else {
      for (const keyword of KeywordMap.values()) {
        if (typeof keyword.options.reserved === "function") {
          if (keyword.options.reserved(options)) {
            this.reserved.add(keyword)
          }
        } else if (keyword.options.reserved === true) {
          this.reserved.add(keyword)
        }
      }
    }
  }

  protected process(token: Token) {
    if (
      token.type === TokenType.Identifier ||
      token.type === TokenType.Operator
    ) {
      const keyword = KeywordMap.get(token.text.toUpperCase())
      if (keyword) {
        if (this.reserved.has(keyword)) {
          token.type = keyword
        } else {
          token.subtype = keyword
        }
      }
    }
    return token
  }
}

export class PostgresParser extends Parser {
  constructor(
    input: string,
    options: { [key: string]: any} = {},
  ) {
    super(input, new PostgresLexer(options), options)
  }

  root(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Eof)) {
          this.consume()
          root.add(this.token(-1))
          break
        } else if (this.peekIf(TokenType.SemiColon)) {
          this.consume()
          root.add(this.token(-1))
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          root.add(this.statement())
          if (this.consumeIf(TokenType.SemiColon)) {
            root.add(this.token(-1))
          } else {
            break
          }
        }
      } catch (e) {
        if (e instanceof ParseError) {
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (this.token() != null) {
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
      throw new AggregateParseError(errors, `${errors.length} error found\n${errors.map(
        e => e.message
      ).join("\n")}`)
    }

    return root
  }

  command() {
    const stmt = new Node("command")

    this.consume(TokenType.Command)
    const token = this.token(-1)
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.add(new Node("name", token.text).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), token.pos, token.before)
      stmt.add(new Node("name", nameToken.text).add(nameToken))

      const args = token.text.substring(sep)
      const argTokens = []
      const re = /([ \t]+)|("[^"]*"|'[^']*'|`[^`]*`)|([^ \t"']+)/y
      let pos = 0
      while (pos < args.length) {
        re.lastIndex = pos
        const m = re.exec(args)
        if (m) {
          const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier
          argTokens.push(new Token(type, m[0], re.lastIndex))
          pos = re.lastIndex
        }
      }

      const before = new Array<Token>()
      for (const argToken of argTokens) {
        if (argToken.type.options.skip) {
          before.push(argToken)
        } else {
          argToken.before.push(...before)
          before.length = 0
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    //TODO
    return stmt
  }

  statement() {
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
}