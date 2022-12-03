import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
  SourceLocation,
  Splitter,
  SplitFunction,
} from "../parser"
import { dequote, ucase } from "../util"

const KeywordMap = new Map<string, PostgresKeyword>()
export class PostgresKeyword extends TokenType {
  static ABORT = new PostgresKeyword("ABORT")
  static ACCESS = new PostgresKeyword("ACCESS")
  static AGGREGATE = new PostgresKeyword("AGGREGATE")
  static ALL = new PostgresKeyword("ALL", { reserved: true })
  static ALLOW_CONNECTIONS = new PostgresKeyword("ALLOW_CONNECTIONS")
  static ALTER = new PostgresKeyword("ALTER")
  static ANALYSE = new PostgresKeyword("ANALYSE", { reserved: true })
  static ANALYZE = new PostgresKeyword("ANALYZE", { reserved: true })
  static AND = new PostgresKeyword("AND", { reserved: true })
  static ANY = new PostgresKeyword("ANY", { reserved: true })
  static ARRAY = new PostgresKeyword("ARRAY", { reserved: true })
  static AS = new PostgresKeyword("AS", { reserved: true })
  static ASC = new PostgresKeyword("ASC", { reserved: true })
  static ASYMMETRIC = new PostgresKeyword("ASYMMETRIC", { reserved: true })
  static AUTHORIZATION = new PostgresKeyword("AUTHORIZATION")
  static BEGIN = new PostgresKeyword("BEGIN")
  static BINARY = new PostgresKeyword("BINARY")
  static BOTH = new PostgresKeyword("BOTH", { reserved: true })
  static BY = new PostgresKeyword("BY")
  static CALL = new PostgresKeyword("CALL")
  static CASCADE = new PostgresKeyword("CASCADE")
  static CASE = new PostgresKeyword("CASE", { reserved: true })
  static CAST = new PostgresKeyword("CAST", { reserved: true })
  static CHECK = new PostgresKeyword("CHECK", { reserved: true })
  static CHECKPOINT = new PostgresKeyword("CHECKPOINT")
  static CLASS = new PostgresKeyword("CLASS")
  static CLOSE = new PostgresKeyword("CLOSE")
  static CLUSTER = new PostgresKeyword("CLUSTER")
  static COLLATE = new PostgresKeyword("COLLATE", { reserved: true })
  static COLLATION = new PostgresKeyword("COLLATION")
  static COLUMN = new PostgresKeyword("COLUMN", { reserved: true })
  static COMMENT = new PostgresKeyword("COMMENT")
  static COMMIT = new PostgresKeyword("COMMIT")
  static CONCURRENTLY = new PostgresKeyword("CONCURRENTLY")
  static CONFIGURATION = new PostgresKeyword("CONFIGURATION")
  static CONNECTION = new PostgresKeyword("CONNECTION")
  static CONSTRAINT = new PostgresKeyword("CONSTRAINT", { reserved: true })
  static CONVERSION = new PostgresKeyword("CONVERSION")
  static COPY = new PostgresKeyword("COPY")
  static CREATE = new PostgresKeyword("CREATE", { reserved: true })
  static CROSS = new PostgresKeyword("CROSS")
  static CURRENT_CATALOG = new PostgresKeyword("CURRENT_CATALOG", { reserved: true })
  static CURRENT_DATE = new PostgresKeyword("CURRENT_DATE", { reserved: true })
  static CURRENT_ROLE = new PostgresKeyword("CURRENT_ROLE", { reserved: true })
  static CURRENT_SCHEMA = new PostgresKeyword("CURRENT_SCHEMA")
  static CURRENT_TIME = new PostgresKeyword("CURRENT_TIME", { reserved: true })
  static CURRENT_TIMESTAMP = new PostgresKeyword("CURRENT_TIMESTAMP", { reserved: true })
  static CURRENT_USER = new PostgresKeyword("CURRENT_USER", { reserved: true })
  static DATA = new PostgresKeyword("DATA")
  static DATABASE = new PostgresKeyword("DATABASE")
  static DEALLOCATE = new PostgresKeyword("DEALLOCATE")
  static DECLARE = new PostgresKeyword("DECLARE")
  static DEFAULT = new PostgresKeyword("DEFAULT", { reserved: true })
  static DEFERRABLE = new PostgresKeyword("DEFERRABLE", { reserved: true })
  static DELETE = new PostgresKeyword("DELETE")
  static DESC = new PostgresKeyword("DESC", { reserved: true })
  static DICTIONARY = new PostgresKeyword("DICTIONARY")
  static DISCARD = new PostgresKeyword("DISCARD")
  static DISTINCT = new PostgresKeyword("DISTINCT", { reserved: true })
  static DO = new PostgresKeyword("DO", { reserved: true })
  static DOMAIN = new PostgresKeyword("DOMAIN")
  static DROP = new PostgresKeyword("DROP")
  static ELSE = new PostgresKeyword("ELSE", { reserved: true })
  static ENCODING = new PostgresKeyword("ENCODING")
  static END = new PostgresKeyword("END", { reserved: true })
  static EVENT = new PostgresKeyword("EVENT")
  static EXCEPT = new PostgresKeyword("EXCEPT", { reserved: true })
  static EXISTS = new PostgresKeyword("EXISTS")
  static EXECUTE = new PostgresKeyword("EXECUTE")
  static EXTENSION = new PostgresKeyword("EXTENSION")
  static EXPLAIN = new PostgresKeyword("EXPLAIN")
  static FALSE = new PostgresKeyword("FALSE", { reserved: true })
  static FAMILY = new PostgresKeyword("FAMILY")
  static FETCH = new PostgresKeyword("FETCH", { reserved: true })
  static FOR = new PostgresKeyword("FOR", { reserved: true })
  static FOREIGN = new PostgresKeyword("FOREIGN", { reserved: true })
  static FUNCTION = new PostgresKeyword("FUNCTION")
  static FREEZE = new PostgresKeyword("FREEZE")
  static FROM = new PostgresKeyword("FROM", { reserved: true })
  static FULL = new PostgresKeyword("FULL")
  static GLOBAL = new PostgresKeyword("GLOBAL")
  static GRANT = new PostgresKeyword("GRANT", { reserved: true })
  static GROUP = new PostgresKeyword("GROUP", { reserved: true })
  static HAVING = new PostgresKeyword("HAVING", { reserved: true })
  static IF = new PostgresKeyword("IF")
  static ILIKE = new PostgresKeyword("ILIKE")
  static IMPORT = new PostgresKeyword("IMPORT")
  static IN = new PostgresKeyword("IN", { reserved: true })
  static INOUT = new PostgresKeyword("INOUT")
  static INITIALLY = new PostgresKeyword("INITIALLY", { reserved: true })
  static INDEX = new PostgresKeyword("INDEX")
  static INNER = new PostgresKeyword("INNER")
  static INSERT = new PostgresKeyword("INSERT")
  static INTERSECT = new PostgresKeyword("INTERSECT", { reserved: true })
  static INTO = new PostgresKeyword("INTO", { reserved: true })
  static IS = new PostgresKeyword("IS")
  static IS_TEMPLATE = new PostgresKeyword("IS_TEMPLATE")
  static ISNULL = new PostgresKeyword("ISNULL")
  static JOIN = new PostgresKeyword("JOIN")
  static LABEL = new PostgresKeyword("LABEL")
  static LANGUAGE = new PostgresKeyword("LANGUAGE")
  static LATERAL = new PostgresKeyword("LATERAL", { reserved: true })
  static LARGE = new PostgresKeyword("LARGE")
  static LC_COLLATE = new PostgresKeyword("LC_COLLATE")
  static LC_CTYPE = new PostgresKeyword("LC_CTYPE")
  static LEADING = new PostgresKeyword("LEADING", { reserved: true })
  static LEFT = new PostgresKeyword("LEFT")
  static LIKE = new PostgresKeyword("LIKE")
  static LIMIT = new PostgresKeyword("LIMIT", { reserved: true })
  static LISTEN = new PostgresKeyword("LISTEN")
  static LOCAL = new PostgresKeyword("LOCAL")
  static LOCALTIME = new PostgresKeyword("LOCALTIME", { reserved: true })
  static LOCALTIMESTAMP = new PostgresKeyword("LOCALTIMESTAMP", { reserved: true })
  static LOCK = new PostgresKeyword("LOCK")
  static LOAD = new PostgresKeyword("LOAD")
  static MATERIALIZED = new PostgresKeyword("MATERIALIZED")
  static MAPPING = new PostgresKeyword("MAPPING")
  static METHOD = new PostgresKeyword("METHOD")
  static MOVE = new PostgresKeyword("MOVE")
  static NATURAL = new PostgresKeyword("NATURAL")
  static NONE = new PostgresKeyword("NONE")
  static NOT = new PostgresKeyword("NOT", { reserved: true })
  static NOTIFY = new PostgresKeyword("NOTIFY")
  static NOTNULL = new PostgresKeyword("NOTNULL")
  static NULL = new PostgresKeyword("NULL", { reserved: true })
  static OBJECT = new PostgresKeyword("OBJECT")
  static OFF = new PostgresKeyword("OFF")
  static OFFSET = new PostgresKeyword("OFFSET", { reserved: true })
  static ON = new PostgresKeyword("ON", { reserved: true })
  static ONLY = new PostgresKeyword("ONLY", { reserved: true })
  static OPERATOR = new PostgresKeyword("OPERATOR")
  static OR = new PostgresKeyword("OR", { reserved: true })
  static ORDER = new PostgresKeyword("ORDER", { reserved: true })
  static OUT = new PostgresKeyword("OUT")
  static OUTER = new PostgresKeyword("OUTER")
  static OVERLAPS = new PostgresKeyword("OVERLAPS")
  static OWNED = new PostgresKeyword("OWNED")
  static OWNER = new PostgresKeyword("OWNER")
  static PARSER = new PostgresKeyword("PARSER")
  static PLACING = new PostgresKeyword("PLACING", { reserved: true })
  static POLICY = new PostgresKeyword("POLICY")
  static PREPARE = new PostgresKeyword("PREPARE")
  static PREPARED = new PostgresKeyword("PREPARED")
  static PRIMARY = new PostgresKeyword("PRIMARY", { reserved: true })
  static PRIVILEGES = new PostgresKeyword("PRIVILEGES")
  static PROCEDURAL = new PostgresKeyword("PROCEDURAL")
  static PROCEDURE = new PostgresKeyword("PROCEDURE")
  static PUBLIC = new PostgresKeyword("PUBLIC")
  static PUBLICATION = new PostgresKeyword("PUBLICATION")
  static REASSIGN = new PostgresKeyword("REASSIGN")
  static RECURSIVE = new PostgresKeyword("RECURSIVE")
  static REFERENCES = new PostgresKeyword("REFERENCES", { reserved: true })
  static REFRESH = new PostgresKeyword("REFRESH")
  static REINDEX = new PostgresKeyword("REINDEX")
  static RELEASE = new PostgresKeyword("RELEASE")
  static RESET = new PostgresKeyword("RESET")
  static RESTRICT = new PostgresKeyword("RESTRICT")
  static RETURNING = new PostgresKeyword("RETURNING", { reserved: true })
  static REVOKE = new PostgresKeyword("REVOKE")
  static RIGHT = new PostgresKeyword("RIGHT")
  static ROLE = new PostgresKeyword("ROLE")
  static ROLLBACK = new PostgresKeyword("ROLLBACK")
  static ROUTINE = new PostgresKeyword("ROUTINE")
  static RULE = new PostgresKeyword("RULE")
  static REPLACE = new PostgresKeyword("REPLACE")
  static SAVEPOINT = new PostgresKeyword("SAVEPOINT")
  static SCHEMA = new PostgresKeyword("SCHEMA")
  static SEARCH = new PostgresKeyword("SEARCH")
  static SECURITY = new PostgresKeyword("SECURITY")
  static SERVER = new PostgresKeyword("SERVER")
  static SELECT = new PostgresKeyword("SELECT", { reserved: true })
  static SEQUENCE = new PostgresKeyword("SEQUENCE")
  static SHOW = new PostgresKeyword("SHOW")
  static SESSION = new PostgresKeyword("SESSION")
  static SESSION_USER = new PostgresKeyword("SESSION_USER", { reserved: true })
  static SET = new PostgresKeyword("SET")
  static SIMILAR = new PostgresKeyword("SIMILAR")
  static SKIP_LOCKED = new PostgresKeyword("SKIP_LOCKED")
  static SOME = new PostgresKeyword("SOME", { reserved: true })
  static START = new PostgresKeyword("START")
  static STATISTICS = new PostgresKeyword("STATISTICS")
  static SUBSCRIPTION = new PostgresKeyword("SUBSCRIPTION")
  static SYMMETRIC = new PostgresKeyword("SYMMETRIC", { reserved: true })
  static SYSTEM = new PostgresKeyword("SYSTEM")
  static TABLE = new PostgresKeyword("TABLE", { reserved: true })
  static TABLESPACE  = new PostgresKeyword("TABLESPACE")
  static TEMP = new PostgresKeyword("TEMP")
  static TEMPLATE = new PostgresKeyword("TEMPLATE")
  static TEMPORARY = new PostgresKeyword("TEMPORARY")
  static TEXT = new PostgresKeyword("TEXT")
  static THEN = new PostgresKeyword("THEN", { reserved: true })
  static TO = new PostgresKeyword("TO", { reserved: true })
  static TRAILING = new PostgresKeyword("TRAILING", { reserved: true })
  static TRANSACTION = new PostgresKeyword("TRANSACTION")
  static TRANSFORM = new PostgresKeyword("TRANSFORM")
  static TRIGGER = new PostgresKeyword("TRIGGER")
  static TRUE = new PostgresKeyword("TRUE", { reserved: true })
  static TRUNCATE = new PostgresKeyword("TRUNCATE")
  static TRUSTED = new PostgresKeyword("TRUSTED")
  static TYPE = new PostgresKeyword("TYPE")
  static UNION = new PostgresKeyword("UNION", { reserved: true })
  static UNIQUE = new PostgresKeyword("UNIQUE", { reserved: true })
  static UNLISTEN = new PostgresKeyword("UNLISTEN")
  static UNLOGGED = new PostgresKeyword("UNLOGGED")
  static UPDATE = new PostgresKeyword("UPDATE")
  static USER = new PostgresKeyword("USER", { reserved: true })
  static USING = new PostgresKeyword("USING", { reserved: true })
  static VACUUM = new PostgresKeyword("VACUUM")
  static VALUES = new PostgresKeyword("VALUES")
  static VARIADIC = new PostgresKeyword("VARIADIC", { reserved: true })
  static VERBOSE = new PostgresKeyword("VERBOSE")
  static VIEW = new PostgresKeyword("VIEW")
  static WRAPPER = new PostgresKeyword("WRAPPER")
  static WHEN = new PostgresKeyword("WHEN", { reserved: true })
  static WHERE = new PostgresKeyword("WHERE", { reserved: true })
  static WINDOW = new PostgresKeyword("WINDOW", { reserved: true })
  static WITH = new PostgresKeyword("WITH", { reserved: true })

  static OPE_EQ = new PostgresKeyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new PostgresKeyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new PostgresKeyword("OPE_MINUS", { value: "-" })
  static OPE_ASTER = new PostgresKeyword("OPE_ASTER", { value: "*" })

  constructor(
    name: string,
    options: { [key: string]: any } = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

const Keyword = PostgresKeyword
export class PostgresLexer extends Lexer {
  private reserved = new Set<PostgresKeyword>()

  constructor(
    options: { [key: string]: any } = {}
  ) {
    super("postgres", [
      { type: TokenType.WhiteSpace, re: /[ \t]+/y, skip: true },
      { type: TokenType.Command, re: /^\\[^ \t]+([ \t]+('([^\\']|\\')*'|"([^\\"]|\\")*"|`([^\\`]|\\`)*`|[^ \t'"`]+))*(\\|$)/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y, skip: true },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
      { type: TokenType.BlockComment, re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy, skip: true },
      { type: TokenType.LineComment, re: /--.*/y, skip: true },
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
    ], options)

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

export class PostgresSplitter extends Splitter {
  static split: SplitFunction = function(input: string, options: Record<string, any> = {}) {
    const tokens = new PostgresLexer(options).lex(input, options.fileName)
    const stmts = new PostgresSplitter(options).split(tokens)
    return stmts
  }

  constructor(
    options: Record<string, any> = {},
  ) {
    super(options)
  }

  split(tokens: Token[]): Token[][] {
    const segments = new Array<Token[]>()

    let segment: Token[] | undefined
    for (const token of tokens) {
      if (!segment) {
        segment = []
        segments.push(segment)
      }
      if (token.is(TokenType.Command)) {
        segment = []
        segment.push(token)
        segments.push(segment)
        segment = undefined
      } else if (token.is(TokenType.SemiColon) || token.is(TokenType.Eof)) {
        segment.push(token)
        segment = undefined
      } else {
        segment.push(token)
      }
    }

    return segments
  }
}

export class PostgresParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new PostgresLexer(options).lex(input, options.fileName)
    return new PostgresParser(tokens, options).parse()
  }

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Eof)) {
          root.add(this.consume())
          break
        } else if (this.peekIf(TokenType.SemiColon)) {
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
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.add(new Node("name", token.text).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), token.skips, token.location)
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

    //TODO
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
}