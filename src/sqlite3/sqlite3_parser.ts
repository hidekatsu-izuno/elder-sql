import { dequote } from "../util"
import Decimal from "decimal.js"
import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
  Splitter,
  SplitFunction,
  SourceLocation,
} from "../parser"

const KeywordMap = new Map<string, Sqlite3Keyword>()
export class Sqlite3Keyword extends TokenType {
  static ABORT = new Sqlite3Keyword("ABORT")
  static ADD = new Sqlite3Keyword("ADD", { reserved: true })
  static ALL = new Sqlite3Keyword("ALL", { reserved: true })
  static ALTER = new Sqlite3Keyword("ALTER", { reserved: true })
  static ALWAYS = new Sqlite3Keyword("ALWAYS", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_GENERATED_COLUMNS")
    }
  })
  static AND = new Sqlite3Keyword("AND", { reserved: true })
  static ANALYZE = new Sqlite3Keyword("ANALYZE")
  static AS = new Sqlite3Keyword("AS", { reserved: true })
  static ASC = new Sqlite3Keyword("ASC")
  static ATTACH = new Sqlite3Keyword("ATTACH")
  static AUTOINCREMENT = new Sqlite3Keyword("AUTOINCREMENT", { reserved: true })
  static BEGIN = new Sqlite3Keyword("BEGIN")
  static BETWEEN = new Sqlite3Keyword("BETWEEN", { reserved: true })
  static CASE = new Sqlite3Keyword("CASE", { reserved: true })
  static CHECK = new Sqlite3Keyword("CHECK", { reserved: true })
  static COLLATE = new Sqlite3Keyword("COLLATE", { reserved: true })
  static COLUMN = new Sqlite3Keyword("COLUMN")
  static COMMIT = new Sqlite3Keyword("COMMIT", { reserved: true })
  static CONFLICT = new Sqlite3Keyword("CONFLICT")
  static CONSTRAINT = new Sqlite3Keyword("CONSTRAINT", { reserved: true })
  static CREATE = new Sqlite3Keyword("CREATE", { reserved: true })
  static CROSS = new Sqlite3Keyword("CROSS", { reserved: true })
  static CURRENT = new Sqlite3Keyword("CURRENT", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static CURRENT_DATE = new Sqlite3Keyword("CURRENT_DATE", { reserved: true })
  static CURRENT_TIME = new Sqlite3Keyword("CURRENT_TIME", { reserved: true })
  static CURRENT_TIMESTAMP = new Sqlite3Keyword("CURRENT_TIMESTAMP", { reserved: true })
  static DATABASE = new Sqlite3Keyword("DATABASE")
  static DEFAULT = new Sqlite3Keyword("DEFAULT", { reserved: true })
  static DEFERRED = new Sqlite3Keyword("DEFERRED")
  static DEFERRABLE = new Sqlite3Keyword("DEFERRABLE", { reserved: true })
  static DELETE = new Sqlite3Keyword("DELETE", { reserved: true })
  static DESC = new Sqlite3Keyword("DESC")
  static DETACH = new Sqlite3Keyword("DETACH")
  static DISTINCT = new Sqlite3Keyword("DISTINCT", { reserved: true })
  static DROP = new Sqlite3Keyword("DROP")
  static ELSE = new Sqlite3Keyword("ELSE", { reserved: true })
  static ESCAPE = new Sqlite3Keyword("ESCAPE", { reserved: true })
  static EXCEPT = new Sqlite3Keyword("EXCEPT", {
    reserved: function (options: { [key: string]: any }) {
      return !options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")
    }
  })
  static EXISTS = new Sqlite3Keyword("EXISTS", { reserved: true })
  static EXCLUDE = new Sqlite3Keyword("EXCLUDE", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static EXCLUSIVE = new Sqlite3Keyword("EXCLUSIVE")
  static END = new Sqlite3Keyword("END")
  static EXPLAIN = new Sqlite3Keyword("EXPLAIN")
  static FAIL = new Sqlite3Keyword("FAIL")
  static FALSE = new Sqlite3Keyword("FALSE")
  static FILTER = new Sqlite3Keyword("FILTER", { reserved: true })
  static FOLLOWING = new Sqlite3Keyword("FOLLOWING", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static FOREIGN = new Sqlite3Keyword("FOREIGN", { reserved: true })
  static FROM = new Sqlite3Keyword("FROM", { reserved: true })
  static GENERATED = new Sqlite3Keyword("GENERATED", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_GENERATED_COLUMNS")
    }
  })
  static GLOB = new Sqlite3Keyword("GLOB", { reserved: true })
  static GROUP = new Sqlite3Keyword("GROUP", { reserved: true })
  static GROUPS = new Sqlite3Keyword("GROUPS", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static HAVING = new Sqlite3Keyword("HAVING", { reserved: true })
  static IGNORE = new Sqlite3Keyword("IGNORE")
  static IMMEDIATE = new Sqlite3Keyword("IMMEDIATE")
  static IN = new Sqlite3Keyword("IN", { reserved: true })
  static INDEX = new Sqlite3Keyword("INDEX", { reserved: true })
  static INDEXED = new Sqlite3Keyword("INDEXED", { reserved: true })
  static INNER = new Sqlite3Keyword("INNER", { reserved: true })
  static INSERT = new Sqlite3Keyword("INSERT", { reserved: true })
  static INTERSECT = new Sqlite3Keyword("INTERSECT", {
    reserved: function (options: { [key: string]: any }) {
      return !options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")
    }
  })
  static INTO = new Sqlite3Keyword("INTO", { reserved: true })
  static IF = new Sqlite3Keyword("IF")
  static IS = new Sqlite3Keyword("IS", { reserved: true })
  static ISNULL = new Sqlite3Keyword("ISNULL", { reserved: true })
  static JOIN = new Sqlite3Keyword("JOIN", { reserved: true })
  static KEY = new Sqlite3Keyword("KEY")
  static LEFT = new Sqlite3Keyword("LEFT", { reserved: true })
  static LIMIT = new Sqlite3Keyword("LIMIT", { reserved: true })
  static MATERIALIZED = new Sqlite3Keyword("MATERIALIZED")
  static NATURAL = new Sqlite3Keyword("NATURAL", { reserved: true })
  static NOT = new Sqlite3Keyword("NOT", { reserved: true })
  static NOTHING = new Sqlite3Keyword("NOTHING", { reserved: true })
  static NOTNULL = new Sqlite3Keyword("NOTNULL", { reserved: true })
  static NULL = new Sqlite3Keyword("NULL", { reserved: true })
  static ON = new Sqlite3Keyword("ON", { reserved: true })
  static OR = new Sqlite3Keyword("OR", { reserved: true })
  static ORDER = new Sqlite3Keyword("ORDER", { reserved: true })
  static OTHERS = new Sqlite3Keyword("OTHERS", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static OUTER = new Sqlite3Keyword("OUTER", { reserved: true })
  static OVER = new Sqlite3Keyword("OVER", { reserved: true })
  static PARTITION = new Sqlite3Keyword("PARTITION", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static PRAGMA = new Sqlite3Keyword("PRAGMA")
  static PRECEDING = new Sqlite3Keyword("PRECEDING", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static PRIMARY = new Sqlite3Keyword("PRIMARY", { reserved: true })
  static PLAN = new Sqlite3Keyword("PLAN")
  static QUERY = new Sqlite3Keyword("QUERY")
  static RANGE = new Sqlite3Keyword("RANGE", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static RECURSIVE = new Sqlite3Keyword("RECURSIVE")
  static REFERENCES = new Sqlite3Keyword("REFERENCES", { reserved: true })
  static REGEXP = new Sqlite3Keyword("REGEXP", { reserved: true })
  static RENAME = new Sqlite3Keyword("RENAME")
  static RELEASE = new Sqlite3Keyword("RELEASE")
  static REINDEX = new Sqlite3Keyword("REINDEX")
  static REPLACE = new Sqlite3Keyword("REPLACE")
  static RETURNING = new Sqlite3Keyword("RETURNING", { reserved: true })
  static RIGHT = new Sqlite3Keyword("RIGHT", { reserved: true })
  static ROLLBACK = new Sqlite3Keyword("ROLLBACK")
  static ROWID = new Sqlite3Keyword("ROWID")
  static SAVEPOINT = new Sqlite3Keyword("SAVEPOINT")
  static SCHEMA = new Sqlite3Keyword("SCHEMA")
  static SELECT = new Sqlite3Keyword("SELECT", { reserved: true })
  static SET = new Sqlite3Keyword("SET", { reserved: true })
  static STORED = new Sqlite3Keyword("STORED")
  static TABLE = new Sqlite3Keyword("TABLE", { reserved: true })
  static TEMP = new Sqlite3Keyword("TEMP")
  static TEMPORARY = new Sqlite3Keyword("TEMPORARY", { reserved: true })
  static THEN = new Sqlite3Keyword("THEN", { reserved: true })
  static TIES = new Sqlite3Keyword("TIES", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static TO = new Sqlite3Keyword("TO", { reserved: true })
  static TRANSACTION = new Sqlite3Keyword("TRANSACTION", { reserved: true })
  static TRIGGER = new Sqlite3Keyword("TRIGGER")
  static TRUE = new Sqlite3Keyword("TRUE")
  static UNBOUNDED = new Sqlite3Keyword("UNBOUNDED", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static UNION = new Sqlite3Keyword("UNION", {
    reserved: function (options: { [key: string]: any }) {
      return !options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")
    }
  })
  static UNIQUE = new Sqlite3Keyword("UNIQUE", { reserved: true })
  static UPDATE = new Sqlite3Keyword("UPDATE", { reserved: true })
  static USING = new Sqlite3Keyword("USING", { reserved: true })
  static VACUUM = new Sqlite3Keyword("VACUUM")
  static VALUES = new Sqlite3Keyword("VALUES", { reserved: true })
  static VIEW = new Sqlite3Keyword("VIEW")
  static VIRTUAL = new Sqlite3Keyword("VIRTUAL")
  static WHEN = new Sqlite3Keyword("WHEN", { reserved: true })
  static WHERE = new Sqlite3Keyword("WHERE", { reserved: true })
  static WINDOW = new Sqlite3Keyword("WINDOW", { reserved: true })
  static WITH = new Sqlite3Keyword("WITH")
  static WITHOUT = new Sqlite3Keyword("WITHOUT")

  static OPE_EQ = new Sqlite3Keyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new Sqlite3Keyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new Sqlite3Keyword("OPE_MINUS", { value: "-" })

  constructor(
    name: string,
    options: { [key: string]: any } = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

const Keyword = Sqlite3Keyword
export class Sqlite3Lexer extends Lexer {
  private reserved = new Set<Sqlite3Keyword>()

  constructor(
    options: { [key: string]: any } = {}
  ) {
    super("sqlite3", [
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.Command, re: /^\..+$/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /[Xx]?'([^']|'')*'/y },
      { type: TokenType.QuotedValue, re: /"([^"]|"")*"/y },
      { type: TokenType.QuotedIdentifier, re: /(`([^`]|``)*`|\[[^\]]*\])/y },
      { type: TokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|[=<>!]=?|[~&|*/%+-]/y },
      { type: TokenType.Error, re: /./y },
    ], options)

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

export class Sqlite3Splitter extends Splitter {
  static split: SplitFunction = function(input: string, options?: Record<string, any>) {
    const tokens = new Sqlite3Lexer(options).lex(input)
    const stmts = new Sqlite3Splitter(options).split(tokens)
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

export class Sqlite3Parser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new Sqlite3Lexer(options).lex(input)
    const rootNode = new Sqlite3Parser(tokens, options).parse()
    return rootNode
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
        if (this.peekIf(TokenType.SemiColon) || this.peekIf(TokenType.Eof)) {
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

    const token = this.consume(TokenType.Command)
    const sep = token.text.indexOf(" ")
    if (sep === -1) {
      stmt.add(new Node("name", token.text).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), token.skips, token.location)
      stmt.add(new Node("name", nameToken.text).add(nameToken))

      const args = token.text.substring(sep)
      const argTokens = []
      const re = /([ \t]+)|("[^"]*"|'[^']*')|([^ \t"']+)/y
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

    return stmt
  }

  private statement(): Node {
    let explain
    let stmt

    try {
      if (this.peekIf(Keyword.EXPLAIN)) {
        explain = new Node("explain")
        explain.add(this.consume())
        if (this.peekIf(Keyword.QUERY)) {
          explain.add(new Node("query plan").add(
            this.consume(), 
            this.consume(Keyword.PLAN)
          ))
        }
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.TEMPORARY) || this.peekIf(Keyword.TEMP)) {
          this.consume()
        }

        if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.createTableStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createViewStatement()
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.createTriggerStatement()
        } else if (
          this.peekIf(Keyword.UNIQUE, Keyword.INDEX) ||
          this.peekIf(Keyword.INDEX)
        ) {
          this.pos = mark
          stmt = this.createIndexStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ALTER)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.alterTableStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.DROP)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.dropTableStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropViewStatement()
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.dropTriggerStatement()
        } else if (this.peekIf(Keyword.INDEX)) {
          this.pos = mark
          stmt = this.dropIndexStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ATTACH, Keyword.DATABASE)) {
        stmt = this.attachDatabaseStatement()
      } else if (this.peekIf(Keyword.DETACH, Keyword.DATABASE)) {
        stmt = this.detachDatabaseStatement()
      } else if (this.peekIf(Keyword.ANALYZE)) {
        stmt = this.analyzeStatement()
      } else if (this.peekIf(Keyword.REINDEX)) {
        stmt = this.reindexStatement()
      } else if (this.peekIf(Keyword.VACUUM)) {
        stmt = this.vacuumStatement()
      } else if (this.peekIf(Keyword.PRAGMA)) {
        stmt = this.pragmaStatement()
      } else if (this.peekIf(Keyword.BEGIN)) {
        stmt = this.beginTransactionStatement()
      } else if (this.peekIf(Keyword.SAVEPOINT)) {
        stmt = this.savepointStatement()
      } else if (this.peekIf(Keyword.RELEASE)) {
        stmt = this.releaseSavepointStatement()
      } else if (this.peekIf(Keyword.COMMIT) || this.peekIf(Keyword.END)) {
        stmt = this.commitTransactionStatement()
      } else if (this.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackTransactionStatement()
      } else {
        let withNode
        if (this.peekIf(Keyword.WITH)) {
          withNode = this.withClause()
        }
        if (this.peekIf(Keyword.INSERT) || this.peekIf(Keyword.REPLACE)) {
          stmt = this.insertClause(withNode)
        } else if (this.peekIf(Keyword.UPDATE)) {
          stmt = this.updateClause(withNode)
        } else if (this.peekIf(Keyword.DELETE)) {
          stmt = this.deleteClause(withNode)
        } else if (this.peekIf(Keyword.SELECT)) {
          stmt = this.selectClause(withNode)
        }
      }

      if (!stmt) {
        throw this.createParseError()
      }
      
      if (explain) {
        stmt = explain.add(stmt)
      }

      if (this.peekIf(TokenType.SemiColon)) {
        stmt.add(this.consume())
      }
      if (this.peekIf(TokenType.Eof)) {
        stmt.add(this.consume())
      }
  
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (this.token() && !this.peekIf(TokenType.SemiColon)) {
          stmt.add(this.consume())
        }
        err.node = stmt
      }      
      throw err
    }

    return stmt
  }

  private createTableStatement() {
    const node = new Node("create table")
    let virtual = false
    
    node.add(this.consume(Keyword.CREATE))
    if (this.peekIf(Keyword.TEMPORARY) || this.peekIf(Keyword.TEMP)) {
      node.add(new Node("temporary").add(this.consume()))
    } else if (this.peekIf(Keyword.VIRTUAL)) {
      node.add(new Node("virtual").add(this.consume()))
      virtual = true
    }
    node.add(this.consume(Keyword.TABLE))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    if (virtual) {
      node.add(this.consume(Keyword.USING))

      const moduleNode = new Node("module")
      moduleNode.add(this.identifier("name"))
      if (this.peekIf(TokenType.LeftParen)) {
        moduleNode.add(this.consume())
        while (this.token()) {
          const moduleArg = new Node("arg")
          while (
            this.token() &&
            !this.peekIf(TokenType.Comma) &&
            !this.peekIf(TokenType.RightParen)
          ) {
            moduleArg.add(this.consume())
          }
          moduleNode.add(moduleArg)
          if (this.peekIf(TokenType.Comma)) {
            moduleNode.add(this.consume())
          } else {
            break
          }
        }
        moduleNode.add(this.consume(TokenType.RightParen))
      }
      node.add(moduleNode)
    } else if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      node.add(this.tableColumn())

      while (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())

        if (
          !this.peekIf(Keyword.CONSTRAINT) &&
          !this.peekIf(Keyword.PRIMARY) &&
          !this.peekIf(Keyword.NOT) &&
          !this.peekIf(Keyword.NULL) &&
          !this.peekIf(Keyword.UNIQUE) &&
          !this.peekIf(Keyword.CHECK) &&
          !this.peekIf(Keyword.DEFAULT) &&
          !this.peekIf(Keyword.COLLATE) &&
          !this.peekIf(Keyword.REFERENCES) &&
          !this.peekIf(Keyword.GENERATED) &&
          !this.peekIf(Keyword.AS)
        ) {
          node.add(this.tableColumn())
        } else {
          node.add(this.tableConstraint())
          while (this.peekIf(TokenType.Comma)) {
            node.add(this.consume())
            node.add(this.tableConstraint())
          }
          break
        }
      }

      node.add(this.consume(TokenType.RightParen))
      while (this.token() && !this.peekIf(TokenType.SemiColon)) {
        if (this.peekIf(Keyword.WITHOUT)) {
          node.add(new Node("without rowid").add(
            this.consume(), 
            this.consume(Keyword.ROWID)
          ))
        } else {
          node.add(this.consume())
        }
      }
    } else if (this.peekIf(Keyword.AS)) {
      node.add(this.consume())
      node.add(this.selectClause())
    } else {
      throw this.createParseError()
    }

    return node
  }

  private createViewStatement() {
    const node = new Node("create view")

    node.add(this.consume(Keyword.CREATE))
    if (
      this.peekIf(Keyword.TEMPORARY) ||
      this.peekIf(Keyword.TEMP)
    ) {
      node.add(new Node("temporary").add(this.consume()))
    }
    node.add(this.consume(Keyword.VIEW))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    node.add(this.consume(Keyword.AS))

    if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      while (this.token()) {
        node.add(this.identifier("column_name"))
        if (this.peekIf(TokenType.Comma)) {
          node.add(this.consume())
        } else {
          break
        }
      }
      node.add(this.consume(TokenType.RightParen))
    }
    node.add(this.selectClause())

    return node
  }

  private createTriggerStatement() {
    const node = new Node("create trigger")

    node.add(this.consume(Keyword.CREATE))
    if (this.peekIf(Keyword.TEMPORARY) || this.peekIf(Keyword.TEMP)) {
      node.add(new Node("temporary").add(this.consume()))
    }
    node.add(this.consume(Keyword.TRIGGER))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.consume())
        while (this.token() && !this.peekIf(Keyword.END)) {
          node.add(this.consume())
        }
      } else {
        node.add(this.consume())
      }
    }

    return node
  }

  private createIndexStatement() {
    const node = new Node("create index")

    node.add(this.consume(Keyword.CREATE))
    if (this.peekIf(Keyword.UNIQUE)) {
      node.add(new Node("unique").add(this.consume()))
    }
    node.add(this.consume(Keyword.INDEX))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if not exists").add(
        this.consume(),
        this.consume(Keyword.NOT),
        this.consume(Keyword.EXISTS)
      ))
    }
    this.parseName(node)

    node.add(this.consume(Keyword.ON))
    node.add(this.identifier("table_name"))

    node.add(this.consume(TokenType.LeftParen))
    while (this.token()) {
      node.add(this.indexColumn())
      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
      } else {
        break
      }
    }
    node.add(this.consume(TokenType.RightParen))

    if (this.peekIf(Keyword.WHERE)) {
      const whereNode = new Node("where")
      whereNode.add(this.consume())
      while (this.token() && !this.peekIf(TokenType.SemiColon)) {
        whereNode.add(this.consume())
      }
      node.add(whereNode)
    }

    return node
  }

  private alterTableStatement() {
    const node = new Node("alter table")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLE))

    if (this.peekIf(Keyword.RENAME, Keyword.TO)) {
      node.add(new Node("rename to").add(
        this.consume(),
        this.consume(),
        this.identifier("table_name")
      ))
    } else  if (this.peekIf(Keyword.RENAME, Keyword.COLUMN)) {
      node.add(new Node("rename column").add(
        this.consume(),
        this.consume(),
        this.identifier("from_column_name"),
        this.consume(Keyword.TO),
        this.identifier("to_column_name")
      ))
    } else if (this.peekIf(Keyword.ADD)) {
      const child = new Node("add column")
      child.add(this.consume())
      if (this.peekIf(Keyword.COLUMN)) {
        child.add(this.consume())
      }
      child.add(this.tableColumn())
      node.add(child)
    } else if (this.peekIf(Keyword.DROP)) {
      const child = new Node("drop column")
      child.add(this.consume())
      if (this.peekIf(Keyword.COLUMN)) {
        child.add(this.consume())
      }
      child.add(this.identifier("column_name"))
      node.add(child)
    } else {
      throw this.createParseError()
    }
    return node
  }

  private dropTableStatement() {
    const node = new Node("drop table")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLE))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private dropViewStatement() {
    const node = new Node("drop view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.VIEW))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private dropTriggerStatement() {
    const node = new Node("drop trigger")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TRIGGER))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private dropIndexStatement() {
    const node = new Node("drop index")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INDEX))

    if (this.peekIf(Keyword.IF)) {
      node.add(new Node("if exists").add(
        this.consume(),
        this.consume(Keyword.EXISTS)
      ))
    }

    this.parseName(node)
    return node
  }

  private attachDatabaseStatement() {
    const node = new Node("attach database")
    node.add(this.consume(Keyword.ATTACH))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.expression())
    node.add(this.consume(Keyword.AS))
    node.add(this.identifier("name"))
    return node
  }

  private detachDatabaseStatement() {
    const node = new Node("detach database")
    node.add(this.consume(Keyword.DETACH))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.identifier("name"))
    return node
  }

  private analyzeStatement() {
    const node = new Node("analyze")
    node.add(this.consume(Keyword.ANALYZE))
    this.parseName(node)
    return node
  }

  private reindexStatement() {
    const node = new Node("reindex")
    node.add(this.consume(Keyword.REINDEX))
    this.parseName(node)    
    return node
  }

  private vacuumStatement() {
    const node = new Node("vacuum")
    node.add(this.consume(Keyword.VACUUM))

    if (this.token() && !this.peekIf(Keyword.TO)) {
      node.add(this.identifier("schema_name"))
    }
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      node.add(this.consume())
    }
    return node
  }

  private pragmaStatement() {
    const node = new Node("pragma")
    node.add(this.consume(Keyword.PRAGMA))

    this.parseName(node)
    if (this.peekIf(Keyword.OPE_EQ)) {
      node.add(this.consume())
      node.add(this.pragmaValue())
    } else if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      node.add(this.pragmaValue())
      node.add(this.consume(TokenType.RightParen))
    }
    return node
  }

  private beginTransactionStatement() {
    const node = new Node("begin transaction")

    node.add(this.consume(Keyword.BEGIN))
    if (this.peekIf(Keyword.DEFERRED)) {
      node.add(new Node("deferred").add(this.consume()))
    } else if (this.peekIf(Keyword.IMMEDIATE)) {
      node.add(new Node("immediate").add(this.consume()))
    } else if (this.peekIf(Keyword.EXCLUSIVE)) {
      node.add(new Node("exclusive").add(this.consume()))
    }
    if (this.peekIf(Keyword.TRANSACTION)) {
      node.add(this.consume())
    }

    return node
  }

  private savepointStatement() {
    const node = new Node("savepoint")
    node.add(this.consume(Keyword.SAVEPOINT))
    node.add(this.identifier("name"))
    return node
  }

  private releaseSavepointStatement() {
    const node = new Node("release savepoint")
    node.add(this.consume(Keyword.RELEASE))
    if (this.peekIf(Keyword.SAVEPOINT)) {
      node.add(this.consume())
    }
    node.add(this.identifier("name"))
    return node
  }

  private commitTransactionStatement() {
    const node = new Node("commit transaction")
    if (this.peekIf(Keyword.END)) {
      node.add(this.consume())
    } else {
      node.add(this.consume(Keyword.COMMIT))  
    }
    if (this.peekIf(Keyword.TRANSACTION)) {
      node.add(this.consume())
    }
    return node
  }

  private rollbackTransactionStatement() {
    const node = new Node("rollback transaction")
    node.add(this.consume(Keyword.ROLLBACK))
    if (this.peekIf(Keyword.TRANSACTION)) {
      node.add(this.consume())
    }
    if (this.peekIf(Keyword.TO)) {
      node.add(this.consume())
      if (this.peekIf(Keyword.SAVEPOINT)) {
        node.add(this.consume())
      }
      node.add(this.identifier("name"))
    }
    return node
  }

  private insertClause(withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    if (this.peekIf(Keyword.REPLACE)) {
      node.add(new Node("replace").add(this.consume()))
    } else {
      node.add(this.consume(Keyword.INSERT))
      if (this.peekIf(Keyword.OR)) {
        node.add(this.consume())
        node.add(this.conflictAction())
      }
    }
    node.add(this.consume(Keyword.INTO))
    this.parseName(node)
    
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      node.add(this.consume())
    }
    return node
  }

  private updateClause(withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.UPDATE))
    this.parseName(node)
    
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      node.add(this.consume())
    }
    return node
  }

  private deleteClause(withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.DELETE))
    node.add(this.consume(Keyword.FROM))
    this.parseName(node)
    
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      node.add(this.consume())
    }
    return node
  }
    
  private selectClause(withNode?: Node) {
    const node = new Node("select")
    if (withNode != null) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.SELECT))

    let depth = 0
    while (this.token() &&
      !this.peekIf(TokenType.SemiColon) &&
      (depth == 0 && !this.peekIf(TokenType.RightParen))
    ) {
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        depth++
      } else if (this.peekIf(TokenType.RightParen)) {
        node.add(this.consume())
        depth--
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private withClause() {
    const node = new Node("with")
    node.add(this.consume(Keyword.WITH))

    if (this.peekIf(Keyword.RECURSIVE)) {
      node.add(new Node("recursive").add(this.consume()))
    }

    while (this.token()) {
      node.add(this.identifier("name"))
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        while (this.token()) {
          node.add(this.identifier("column"))
          if (this.peekIf(TokenType.Comma)) {
            node.add(this.consume())
          } else {
            break
          }
        }
        node.add(this.consume(TokenType.RightParen))
      }

      node.add(this.consume(Keyword.AS))

      if (this.peekIf(Keyword.NOT)) {
        node.add(new Node("not materialized").add(
          this.consume(), 
          this.consume(Keyword.MATERIALIZED)
        ))
      } else if (this.peekIf(Keyword.MATERIALIZED)) {
        node.add(new Node("materialized").add(this.token(-1)))
      }
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.selectClause())
      node.add(this.consume(TokenType.RightParen))

      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
      } else {
        break
      }
    }
    return node
  }

  private parseName(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.peekIf(TokenType.Dot)) {
      stmt.add(this.consume())
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private tableColumn() {
    const node = new Node("column")
    node.add(this.identifier("name"))

    if (
      this.peekIf(TokenType.QuotedIdentifier) ||
      this.peekIf(TokenType.Identifier) ||
      this.peekIf(TokenType.QuotedValue)
    ) {
      node.add(this.dataType())
    }

    while (
      this.token() &&
      !this.peekIf(TokenType.SemiColon) &&
      !this.peekIf(TokenType.RightParen) &&
      !this.peekIf(TokenType.Comma)
    ) {
      node.add(this.columnConstraint())
    }

    return node
  }

  private columnConstraint() {
    const node = new Node("")
    if (this.peekIf(Keyword.CONSTRAINT)) {
      node.add(this.consume())
      node.add(this.identifier("name"))
    }
    if (this.peekIf(Keyword.PRIMARY)) {
      node.add(this.consume())
      node.add(this.consume(Keyword.KEY))
      node.name = "primary key"

      if (this.peekIf(Keyword.ASC)) {
        node.add(new Node("asc").add(this.consume()))
      } else if (this.peekIf(Keyword.DESC)) {
        node.add(new Node("desc").add(this.consume()))
      }
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
      if (this.peekIf(Keyword.AUTOINCREMENT)) {
        node.add(new Node("autoincrement").add(this.consume()))
      }
    } else if (this.peekIf(Keyword.NOT)) {
      node.add(this.consume())
      node.add(this.consume(Keyword.NULL))
      node.name = "not null"
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
    } else if (this.peekIf(Keyword.NULL)) {
      node.add(this.consume())
      node.name = "null"
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
    } else if (this.peekIf(Keyword.UNIQUE)) {
      node.add(this.consume())
      node.name = "unique"
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        node.add(this.conflictAction())
      }
    } else if (this.peekIf(Keyword.CHECK)) {
      node.add(this.consume())
      node.name = "check"
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.expression())
      node.add(this.consume(TokenType.RightParen))
    } else if (this.peekIf(Keyword.DEFAULT)) {
      node.add(this.consume())
      node.name = "default"
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        node.add(this.expression())
        node.add(this.consume(TokenType.RightParen))
      } else {
        node.add(this.expression())
      }
    } else if (this.peekIf(Keyword.COLLATE)) {
      node.add(this.consume())
      node.name = "collate"
      node.add(this.identifier("collate_name"))
    } else if (this.peekIf(Keyword.REFERENCES)) {
      node.add(this.consume())
      node.name = "references"
      node.add(this.identifier("table_name"))
      node.add(this.consume(TokenType.LeftParen))
      while (this.token()) {
        node.add(this.identifier("column_name"))
        if (this.peekIf(TokenType.Comma)) {
          node.add(this.consume())
        } else {
          break
        }
      }
      node.add(this.consume(TokenType.RightParen))
    } else if (this.peekIf(Keyword.GENERATED) || this.peekIf(Keyword.AS)) {
      node.name = "generated always"
      if (this.peekIf(Keyword.GENERATED)) {
        node.add(this.consume(), this.consume(Keyword.ALWAYS))
      }
      node.add(this.consume(Keyword.AS))
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.expression())
      node.add(this.consume(TokenType.RightParen))

      if (this.peekIf(Keyword.STORED)) {
        node.add(new Node("stored").add(this.consume()))
      } else if (this.peekIf(Keyword.VIRTUAL)) {
        node.add(new Node("virtual").add(this.consume()))
      }
    } else {
      throw this.createParseError()
    }

    return node
  }

  private tableConstraint() {
    const node = new Node("constraint")

    if (this.peekIf(Keyword.CONSTRAINT)) {
      node.add(this.consume())
      const nameNode = this.identifier("name")
      node.value = nameNode.value
      node.add(nameNode)
    }
    if (this.peekIf(Keyword.PRIMARY)) {
      const childNode = new Node("primary key")
      childNode.add(this.consume())
      childNode.add(this.consume(Keyword.KEY))
      childNode.add(this.consume(TokenType.LeftParen))
      while (this.token()) {
        childNode.add(this.indexColumn())
        if (this.peekIf(TokenType.Comma)) {
          childNode.add(this.consume())
        } else {
          break
        }
      }
      childNode.add(this.consume(TokenType.RightParen))
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        childNode.add(this.conflictAction())
      }
      node.add(childNode)
    } else if (this.peekIf(Keyword.UNIQUE)) {
      const childNode = new Node("unique")
      childNode.add(this.consume())
      childNode.add(this.consume(TokenType.LeftParen))
      while (this.token()) {
        childNode.add(this.indexColumn())
        if (this.peekIf(TokenType.Comma)) {
          childNode.add(this.consume())
        } else {
          break
        }
      }
      childNode.add(this.consume(TokenType.RightParen))
      if (this.peekIf(Keyword.ON, Keyword.CONFLICT)) {
        childNode.add(this.conflictAction())
      }
      node.add(childNode)
    } else if (this.peekIf(Keyword.CHECK)) {
      const childNode = new Node("check")
      childNode.add(this.consume())
      childNode.add(this.consume(TokenType.LeftParen))
      childNode.add(this.expression())
      childNode.add(this.consume(TokenType.RightParen))
      node.add(childNode)
    } else if (this.peekIf(Keyword.FOREIGN)) {
      const childNode = new Node("foreign key")
      childNode.add(this.consume())
      childNode.add(this.consume(Keyword.KEY))
      childNode.add(this.consume(TokenType.LeftParen))
      childNode.add(this.identifier("column_name"))
      while (this.token()) {
        childNode.add(this.identifier("column_name"))
        if (this.peekIf(TokenType.Comma)) {
          childNode.add(this.consume())
        } else {
          break
        }
      }
      childNode.add(this.consume(TokenType.RightParen))
      node.add(childNode)
    } else {
      throw this.createParseError()
    }
    return node
  }

  private dataType() {
    const node = new Node("type")

    const nameNode = new Node("name")
    let identifier = this.identifier("")
    nameNode.add(...identifier.children)
    nameNode.value = identifier.value
    while (
      this.peekIf(TokenType.QuotedIdentifier) ||
      this.peekIf(TokenType.QuotedValue) ||
      this.peekIf(TokenType.Identifier)
    ) {
      identifier = this.identifier("")
      nameNode.add(...identifier.children)
      nameNode.value = " " + identifier.value
    }
    node.add(nameNode)

    if (this.peekIf(TokenType.LeftParen)) {
      node.add(this.consume())
      node.add(this.numberValue("length"))
      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
        node.add(this.numberValue("scale"))
      }
      node.add(this.consume(TokenType.RightParen))
    }
    return node
  }

  private conflictAction() {
    const node = new Node("")
    if (this.peekIf(Keyword.ON)) {
      node.add(this.consume())
      node.add(this.consume(Keyword.CONFLICT))
    }
    if (this.peekIf(Keyword.ROLLBACK)) {
      node.name = "rollback"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.ABORT)) {
      node.name = "abort"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.FAIL)) {
      node.name = "fail"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.IGNORE)) {
      node.name = "ignore"
      node.add(this.consume())
    } else if (this.peekIf(Keyword.REPLACE)) {
      node.name = "replace"
      node.add(this.consume())
    } else {
      throw this.createParseError()
    }
    return node
  }

  private indexColumn() {
    const node = new Node("index_column")
    const mark = this.pos
    const expressionNode = this.expression()
    if (expressionNode.children.length === 1) {
      this.pos = mark
      node.add(this.identifier("name"))
    } else {
      node.add(expressionNode)
    }
    if (this.peekIf(Keyword.ASC)) {
      node.add(new Node("asc").add(this.consume()))
    } else if (this.peekIf(Keyword.DESC)) {
      node.add(new Node("desc").add(this.consume()))
    }
    return node
  }

  private pragmaValue() {
    const node = new Node("pragma_value")
    if (this.peekIf(Keyword.OPE_PLUS) || this.peekIf(Keyword.OPE_MINUS)) {
      const token1 = this.consume()
      node.add(token1)
      const token2 = this.consume(TokenType.Number)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else if (this.peekIf(TokenType.Number)) {
      const token = this.consume()
      node.add(token)
      node.value = new Decimal(token.text).toString()
    } else if (this.peekIf(TokenType.String) || this.peekIf(TokenType.QuotedValue)) {
      const token = this.consume()
      node.add(token)
      node.value = dequote(token.text)
    } else if (this.peekIf(TokenType.Identifier)) {
      const token = this.consume()
      node.add(token)
      node.value = token.text
    } else {
      throw this.createParseError()
    }
    return node
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.peekIf(TokenType.QuotedIdentifier)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.QuotedValue)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.String)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.Identifier)) {
      node.add(this.consume())
      node.value = this.token(-1).text
    } else {
      throw this.createParseError()
    }
    return node
  }

  private numberValue(name: string) {
    const node = new Node(name)
    if (this.peekIf(Keyword.OPE_PLUS) || this.peekIf(Keyword.OPE_MINUS)) {
      const token1 = this.consume()
      node.add(token1)
      const token2 = this.consume(TokenType.Number)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else {
      const token = this.consume(TokenType.Number)
      node.add(token)
      node.value = new Decimal(token.text).toString()
    }
    return node
  }

  private expression() {
    const node = new Node("expression")
    let depth = 0
    while (this.token() &&
      (depth == 0 && !this.peekIf(TokenType.Comma)) &&
      (depth == 0 && !this.peekIf(TokenType.RightParen)) &&
      (depth == 0 && !this.peekIf(Keyword.AS)) &&
      (depth == 0 && !this.peekIf(Keyword.ASC)) &&
      (depth == 0 && !this.peekIf(Keyword.DESC)) &&
      !this.peekIf(TokenType.SemiColon)
    ) {
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        depth++
      } else if (this.peekIf(TokenType.RightParen)) {
        node.add(this.consume())
        depth--
      } else {
        node.add(this.consume())
      }
    }
    return node
  }
}
