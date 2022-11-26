import Decimal from "decimal.js"
import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
} from "../parser"

const KeywordMap = new Map<string, Keyword>()
export class Keyword extends TokenType {
  static ABORT = new Keyword("ABORT")
  static ADD = new Keyword("ADD", { reserved: true })
  static ALL = new Keyword("ALL", { reserved: true })
  static ALTER = new Keyword("ALTER", { reserved: true })
  static ALWAYS = new Keyword("ALWAYS", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_GENERATED_COLUMNS")
    }
  })
  static AND = new Keyword("AND", { reserved: true })
  static ANALYZE = new Keyword("ANALYZE")
  static AS = new Keyword("AS", { reserved: true })
  static ASC = new Keyword("ASC")
  static ATTACH = new Keyword("ATTACH")
  static AUTOINCREMENT = new Keyword("AUTOINCREMENT", { reserved: true })
  static BEGIN = new Keyword("BEGIN")
  static BETWEEN = new Keyword("BETWEEN", { reserved: true })
  static CASE = new Keyword("CASE", { reserved: true })
  static CHECK = new Keyword("CHECK", { reserved: true })
  static COLLATE = new Keyword("COLLATE", { reserved: true })
  static COLUMN = new Keyword("COLUMN")
  static COMMIT = new Keyword("COMMIT", { reserved: true })
  static CONFLICT = new Keyword("CONFLICT")
  static CONSTRAINT = new Keyword("CONSTRAINT", { reserved: true })
  static CREATE = new Keyword("CREATE", { reserved: true })
  static CROSS = new Keyword("CROSS", { reserved: true })
  static CURRENT = new Keyword("CURRENT", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static CURRENT_DATE = new Keyword("CURRENT_DATE", { reserved: true })
  static CURRENT_TIME = new Keyword("CURRENT_TIME", { reserved: true })
  static CURRENT_TIMESTAMP = new Keyword("CURRENT_TIMESTAMP", { reserved: true })
  static DATABASE = new Keyword("DATABASE")
  static DEFAULT = new Keyword("DEFAULT", { reserved: true })
  static DEFERRED = new Keyword("DEFERRED")
  static DEFERRABLE = new Keyword("DEFERRABLE", { reserved: true })
  static DELETE = new Keyword("DELETE", { reserved: true })
  static DESC = new Keyword("DESC")
  static DETACH = new Keyword("DETACH")
  static DISTINCT = new Keyword("DISTINCT", { reserved: true })
  static DROP = new Keyword("DROP")
  static ELSE = new Keyword("ELSE", { reserved: true })
  static ESCAPE = new Keyword("ESCAPE", { reserved: true })
  static EXCEPT = new Keyword("EXCEPT", {
    reserved: function (options: { [key: string]: any }) {
      return !options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")
    }
  })
  static EXISTS = new Keyword("EXISTS", { reserved: true })
  static EXCLUDE = new Keyword("EXCLUDE", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static EXCLUSIVE = new Keyword("EXCLUSIVE")
  static END = new Keyword("END")
  static EXPLAIN = new Keyword("EXPLAIN")
  static FAIL = new Keyword("FAIL")
  static FALSE = new Keyword("FALSE")
  static FILTER = new Keyword("FILTER", { reserved: true })
  static FOLLOWING = new Keyword("FOLLOWING", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static FOREIGN = new Keyword("FOREIGN", { reserved: true })
  static FROM = new Keyword("FROM", { reserved: true })
  static GENERATED = new Keyword("GENERATED", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_GENERATED_COLUMNS")
    }
  })
  static GLOB = new Keyword("GLOB", { reserved: true })
  static GROUP = new Keyword("GROUP", { reserved: true })
  static GROUPS = new Keyword("GROUPS", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static HAVING = new Keyword("HAVING", { reserved: true })
  static IGNORE = new Keyword("IGNORE")
  static IMMEDIATE = new Keyword("IMMEDIATE")
  static IN = new Keyword("IN", { reserved: true })
  static INDEX = new Keyword("INDEX", { reserved: true })
  static INDEXED = new Keyword("INDEXED", { reserved: true })
  static INNER = new Keyword("INNER", { reserved: true })
  static INSERT = new Keyword("INSERT", { reserved: true })
  static INTERSECT = new Keyword("INTERSECT", {
    reserved: function (options: { [key: string]: any }) {
      return !options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")
    }
  })
  static INTO = new Keyword("INTO", { reserved: true })
  static IF = new Keyword("IF")
  static IS = new Keyword("IS", { reserved: true })
  static ISNULL = new Keyword("ISNULL", { reserved: true })
  static JOIN = new Keyword("JOIN", { reserved: true })
  static KEY = new Keyword("KEY")
  static LEFT = new Keyword("LEFT", { reserved: true })
  static LIMIT = new Keyword("LIMIT", { reserved: true })
  static MATERIALIZED = new Keyword("MATERIALIZED")
  static NATURAL = new Keyword("NATURAL", { reserved: true })
  static NOT = new Keyword("NOT", { reserved: true })
  static NOTHING = new Keyword("NOTHING", { reserved: true })
  static NOTNULL = new Keyword("NOTNULL", { reserved: true })
  static NULL = new Keyword("NULL", { reserved: true })
  static ON = new Keyword("ON", { reserved: true })
  static OR = new Keyword("OR", { reserved: true })
  static ORDER = new Keyword("ORDER", { reserved: true })
  static OTHERS = new Keyword("OTHERS", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static OUTER = new Keyword("OUTER", { reserved: true })
  static OVER = new Keyword("OVER", { reserved: true })
  static PARTITION = new Keyword("PARTITION", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static PRAGMA = new Keyword("PRAGMA")
  static PRECEDING = new Keyword("PRECEDING", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static PRIMARY = new Keyword("PRIMARY", { reserved: true })
  static PLAN = new Keyword("PLAN")
  static QUERY = new Keyword("QUERY")
  static RANGE = new Keyword("RANGE", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static RECURSIVE = new Keyword("RECURSIVE")
  static REFERENCES = new Keyword("REFERENCES", { reserved: true })
  static REGEXP = new Keyword("REGEXP", { reserved: true })
  static RENAME = new Keyword("RENAME")
  static RELEASE = new Keyword("RELEASE")
  static REINDEX = new Keyword("REINDEX")
  static REPLACE = new Keyword("REPLACE")
  static RETURNING = new Keyword("RETURNING", { reserved: true })
  static RIGHT = new Keyword("RIGHT", { reserved: true })
  static ROLLBACK = new Keyword("ROLLBACK")
  static ROWID = new Keyword("ROWID")
  static SAVEPOINT = new Keyword("SAVEPOINT")
  static SCHEMA = new Keyword("SCHEMA")
  static SELECT = new Keyword("SELECT", { reserved: true })
  static SET = new Keyword("SET", { reserved: true })
  static STORED = new Keyword("STORED")
  static TABLE = new Keyword("TABLE", { reserved: true })
  static TEMP = new Keyword("TEMP")
  static TEMPORARY = new Keyword("TEMPORARY", { reserved: true })
  static THEN = new Keyword("THEN", { reserved: true })
  static TIES = new Keyword("TIES", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static TO = new Keyword("TO", { reserved: true })
  static TRANSACTION = new Keyword("TRANSACTION", { reserved: true })
  static TRIGGER = new Keyword("TRIGGER")
  static TRUE = new Keyword("TRUE")
  static UNBOUNDED = new Keyword("UNBOUNDED", {
    reserved: function (options: { [key: string]: any }) {
      return options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")
    }
  })
  static UNION = new Keyword("UNION", {
    reserved: function (options: { [key: string]: any }) {
      return !options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")
    }
  })
  static UNIQUE = new Keyword("UNIQUE", { reserved: true })
  static UPDATE = new Keyword("UPDATE", { reserved: true })
  static USING = new Keyword("USING", { reserved: true })
  static VACUUM = new Keyword("VACUUM")
  static VALUES = new Keyword("VALUES", { reserved: true })
  static VIEW = new Keyword("VIEW")
  static VIRTUAL = new Keyword("VIRTUAL")
  static WHEN = new Keyword("WHEN", { reserved: true })
  static WHERE = new Keyword("WHERE", { reserved: true })
  static WINDOW = new Keyword("WINDOW", { reserved: true })
  static WITH = new Keyword("WITH")
  static WITHOUT = new Keyword("WITHOUT")

  static OPE_EQ = new Keyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new Keyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new Keyword("OPE_MINUS", { value: "-" })

  constructor(
    public name: string,
    public options: { [key: string]: any } = {}
  ) {
    super(name, options)
    KeywordMap.set(options.value ?? name, this)
  }
}

export class Sqlite3Lexer extends Lexer {
  private reserved = new Set<Keyword>()

  constructor(
    private options: { [key: string]: any } = {}
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
    ])

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

export class Sqlite3Parser extends Parser {
  constructor(
    input: string,
    options: { [key: string]: any } = {},
  ) {
    super(input, new Sqlite3Lexer(options), options)
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
      const re = /([ \t]+)|("[^"]*"|'[^']*')|([^ \t"']+)/y
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

    return stmt
  }

  statement(): Node {
    const stmt = new Node("")

    try {
      let explain
      if (this.consumeIf(Keyword.EXPLAIN)) {
        explain = new Node("explain").add(this.token(-1))
        if (this.consumeIf(Keyword.QUERY)) {
          this.consume(Keyword.PLAN)
          explain.add(new Node("query plan").add(this.token(-2), this.token(-1)))
        }
      }

      if (this.consumeIf(Keyword.CREATE)) {
        stmt.add(this.token(-1))
        if (
          this.consumeIf(Keyword.TEMPORARY) ||
          this.consumeIf(Keyword.TEMP)
        ) {
          stmt.add(new Node("temporary").add(this.token(-1)))
          if (this.consumeIf(Keyword.TABLE)) {
            stmt.add(this.token(-1))
            stmt.name = "create table"
            this.parseCreateTableStatement(stmt)
          } else if (this.consumeIf(Keyword.VIEW)) {
            stmt.add(this.token(-1))
            stmt.name = "create view"
            this.parseCreateViewStatement(stmt)
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            stmt.add(this.token(-1))
            stmt.name = "create trigger"
            this.parseCreateTriggerStatement(stmt)
          }
        } else if (this.consumeIf(Keyword.VIRTUAL)) {
          stmt.add(new Node("virtual").add(this.token(-1)))
          if (this.consumeIf(Keyword.TABLE)) {
            stmt.add(this.token(-1))
            stmt.name = "create table"
            this.parseCreateTableStatement(stmt)
          }
        } else if (this.consumeIf(Keyword.TABLE)) {
          stmt.add(this.token(-1))
          stmt.name = "create table"
          this.parseCreateTableStatement(stmt)
        } else if (this.consumeIf(Keyword.VIEW)) {
          stmt.add(this.token(-1))
          stmt.name = "create view"
          this.parseCreateViewStatement(stmt)
        } else if (this.consumeIf(Keyword.TRIGGER)) {
          stmt.add(this.token(-1))
          stmt.name = "create trigger"
          this.parseCreateTriggerStatement(stmt)
        } else if (this.consumeIf(Keyword.UNIQUE)) {
          stmt.add(new Node("unique").add(this.token(-1)))
          if (this.consumeIf(Keyword.INDEX)) {
            stmt.add(this.token(-1))
            stmt.name = "create index"
            this.parseCreateIndexStatement(stmt)
          }
        } else if (this.consumeIf(Keyword.INDEX)) {
          stmt.add(this.token(-1))
          stmt.name = "create index"
          this.parseCreateIndexStatement(stmt)
        }
      } else if (this.consumeIf(Keyword.ALTER)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.TABLE)) {
          stmt.add(this.token(-1))
          stmt.name = "alter table"
          this.parseAlterTableStatement(stmt)
        }
      } else if (this.consumeIf(Keyword.DROP)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.TABLE)) {
          stmt.add(this.token(-1))
          stmt.name = "drop table"
          this.parseDropTableStatement(stmt)
        } else if (this.consumeIf(Keyword.VIEW)) {
          stmt.add(this.token(-1))
          stmt.name = "drop view"
          this.parseDropViewStatement(stmt)
        } else if (this.consumeIf(Keyword.TRIGGER)) {
          stmt.add(this.token(-1))
          stmt.name = "drop trigger"
          this.parseDropTriggerStatement(stmt)
        } else if (this.consumeIf(Keyword.INDEX)) {
          stmt.add(this.token(-1))
          stmt.name = "drop index"
          this.parseDropIndexStatement(stmt)
        }
      } else if (this.consumeIf(Keyword.ATTACH)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.DATABASE)) {
          stmt.add(this.token(-1))
          stmt.name = "attach database"
          this.parseAttachDatabaseStatement(stmt)
        }
      } else if (this.consumeIf(Keyword.DETACH)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.DATABASE)) {
          stmt.add(this.token(-1))
          stmt.name = "detach database"
          this.parseDetachDatabaseStatement(stmt)
        }
      } else if (this.consumeIf(Keyword.ANALYZE)) {
        stmt.add(this.token(-1))
        stmt.name = "analyze"
        this.parseAnalyzeStatement(stmt)
      } else if (this.consumeIf(Keyword.REINDEX)) {
        stmt.add(this.token(-1))
        stmt.name = "reindex"
        this.parseReindexStatement(stmt)
      } else if (this.consumeIf(Keyword.VACUUM)) {
        stmt.add(this.token(-1))
        stmt.name = "vacuum"
        this.parseVacuumStatement(stmt)
      } else if (this.consumeIf(Keyword.PRAGMA)) {
        stmt.add(this.token(-1))
        stmt.name = "pragma"
        this.parsePragmaStatement(stmt)
      } else if (this.consumeIf(Keyword.BEGIN)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.DEFERRED)) {
          stmt.add(new Node("deferred").add(this.token(-1)))
        } else if (this.consumeIf(Keyword.IMMEDIATE)) {
          stmt.add(new Node("immediate").add(this.token(-1)))
        } else if (this.consumeIf(Keyword.EXCLUSIVE)) {
          stmt.add(new Node("exclusive").add(this.token(-1)))
        }
        if (this.consumeIf(Keyword.TRANSACTION)) {
          stmt.add(this.token(-1))
        }
        stmt.name = "begin transaction"
        this.parseBeginTransactionStatement(stmt)
      } else if (this.consumeIf(Keyword.SAVEPOINT)) {
        stmt.add(this.token(-1))
        stmt.name = "savepoint"
        this.parseSavepointStatement(stmt)
      } else if (this.consumeIf(Keyword.RELEASE)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.SAVEPOINT)) {
          stmt.add(this.token(-1))
        }
        stmt.name = "release savepoint"
        this.parseReleaseSavepointStatement(stmt)
      } else if (this.consumeIf(Keyword.COMMIT) || this.consumeIf(Keyword.END)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.TRANSACTION)) {
          stmt.add(this.token(-1))
        }
        stmt.name = "commit transaction"
        this.parseCommitTransactionStatement(stmt)
      } else if (this.consumeIf(Keyword.ROLLBACK)) {
        stmt.add(this.token(-1))
        if (this.consumeIf(Keyword.TRANSACTION)) {
          stmt.add(this.token(-1))
        }
        stmt.name = "rollback transaction"
        this.parseRollbackTransactionStatement(stmt)
      } else {
        if (this.peekIf(Keyword.WITH)) {
          stmt.add(this.withClause())
        }
        if (this.consumeIf(Keyword.INSERT)) {
          stmt.add(this.token(-1))
          stmt.name = "insert"

          if (this.consumeIf(Keyword.OR)) {
            stmt.add(this.token(-1))
            stmt.add(this.conflictAction())
          }
          this.parseInsertStatement(stmt)
        } else if (this.consumeIf(Keyword.REPLACE)) {
          stmt.add(new Node("replace").add(this.token(-1)))
          stmt.name = "insert"
          this.parseInsertStatement(stmt)
        } else if (this.consumeIf(Keyword.UPDATE)) {
          stmt.add(this.token(-1))
          stmt.name = "update"
          if (this.consumeIf(Keyword.OR)) {
            stmt.add(this.token(-1))
            stmt.add(this.conflictAction())
          }
          this.parseUpdateStatement(stmt)
        } else if (this.consumeIf(Keyword.DELETE)) {
          this.consume(Keyword.FROM)
          stmt.add(this.token(-2), this.token(-1))
          stmt.name = "delete"
          this.parseDeleteStatement(stmt)
        } else if (this.peekIf(Keyword.SELECT)) {
          const selectNode = this.selectClause()
          stmt.name = selectNode.name
          stmt.value = selectNode.value
          stmt.children.push(...selectNode.children)
        }
      }

      if (!stmt.name) {
        throw this.createParseError()
      }
  
      if (explain) {
        return explain.add(stmt)
      }
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (this.token() && !this.peekIf(TokenType.SemiColon)) {
          this.consume()
          stmt.add(this.token(-1))
        }
        err.node = stmt
      }      
      throw err
    }

    return stmt
  }

  private parseCreateTableStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.NOT, Keyword.EXISTS)
      stmt.add(new Node("if not exists").add(this.token(-3), this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }

    if (stmt.has('virtual')) {
      this.consume(Keyword.USING)
      stmt.add(this.token(-1))

      const moduleNode = new Node("module")
      moduleNode.add(this.identifier("name"))
      if (this.consumeIf(TokenType.LeftParen)) {
        moduleNode.add(this.token(-1))
        while (this.token()) {
          const moduleArg = new Node("arg")
          while (
            this.token() &&
            !this.peekIf(TokenType.Comma) &&
            !this.peekIf(TokenType.RightParen)
          ) {
            this.consume()
            moduleArg.add(this.token(-1))
          }
          moduleNode.add(moduleArg)
          if (this.consumeIf(TokenType.Comma)) {
            moduleNode.add(this.token(-1))
          } else {
            break
          }
        }
        this.consume(TokenType.RightParen)
        moduleNode.add(this.token(-1))
      }
      stmt.add(moduleNode)
    } else if (this.consumeIf(TokenType.LeftParen)) {
      stmt.add(this.token(-1))
      stmt.add(this.tableColumn())

      while (this.consumeIf(TokenType.Comma)) {
        stmt.add(this.token(-1))

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
          stmt.add(this.tableColumn())
        } else {
          stmt.add(this.tableConstraint())
          while (this.consumeIf(TokenType.Comma)) {
            stmt.add(this.token(-1))
            stmt.add(this.tableConstraint())
          }
          break
        }
      }

      this.consume(TokenType.RightParen)
      stmt.add(this.token(-1))
      while (this.token() && !this.peekIf(TokenType.SemiColon)) {
        if (this.consumeIf(Keyword.WITHOUT)) {
          this.consume(Keyword.ROWID)
          stmt.add(new Node("without rowid").add(this.token(-2), this.token(-1)))
        } else {
          this.consume()
          stmt.add(this.token(-1))
        }
      }
    } else if (this.consumeIf(Keyword.AS)) {
      stmt.add(this.token(-1))
      stmt.add(this.selectClause())
    } else {
      throw this.createParseError()
    }
  }

  private parseCreateViewStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.NOT, Keyword.EXISTS)
      stmt.add(new Node("if not exists").add(this.token(-3), this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }

    this.consume(Keyword.AS)
    stmt.add(this.token(-1))

    if (this.consumeIf(TokenType.LeftParen)) {
      stmt.add(this.token(-1))
      while (this.token()) {
        stmt.add(this.identifier("column_name"))
        if (this.consumeIf(TokenType.Comma)) {
          stmt.add(this.token(-1))
        } else {
          break
        }
      }
      this.consume(TokenType.RightParen)
      stmt.add(this.token(-1))
    }
    stmt.add(this.selectClause())
  }

  private parseCreateTriggerStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.NOT, Keyword.EXISTS)
      stmt.add(new Node("if not exists").add(this.token(-3), this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }

    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      if (this.consumeIf(Keyword.BEGIN)) {
        stmt.add(this.token(-1))
        while (this.token() && !this.peekIf(Keyword.END)) {
          this.consume()
          stmt.add(this.token(-1))
        }
      } else {
        this.consume()
        stmt.add(this.token(-1))
      }
    }
  }

  private parseCreateIndexStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.NOT, Keyword.EXISTS)
      stmt.add(new Node("if not exists").add(this.token(-3), this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }

    this.consume(Keyword.ON)
    stmt.add(this.token(-1))

    stmt.add(this.identifier("table_name"))

    this.consume(TokenType.LeftParen)
    stmt.add(this.token(-1))
    while (this.token()) {
      stmt.add(this.indexColumn())
      if (this.consumeIf(TokenType.Comma)) {
        stmt.add(this.token(-1))
      } else {
        break
      }
    }
    this.consume(TokenType.RightParen)
    stmt.add(this.token(-1))

    if (this.consumeIf(Keyword.WHERE)) {
      const whereNode = new Node("where")
      whereNode.add(this.token(-1))
      while (this.token() && !this.peekIf(TokenType.SemiColon)) {
        this.consume()
        whereNode.add(this.token(-1))
      }
      stmt.add(whereNode)
    }
  }

  private parseAlterTableStatement(stmt: Node) {
    if (this.consumeIf(Keyword.RENAME)) {
      if (this.consumeIf(Keyword.TO)) {
        const node = new Node("rename to")
        node.add(this.token(-2), this.token(-1))
        node.add(this.identifier("table_name"))
        stmt.add(node)
      } else if (this.consumeIf(Keyword.COLUMN)) {
        const node = new Node("rename column")
        node.add(this.token(-2), this.token(-1))
        node.add(this.identifier("from_column_name"))
        this.consume(Keyword.TO)
        node.add(this.token(-1))
        node.add(this.identifier("to_column_name"))
        stmt.add(node)
      } else {
        throw this.createParseError()
      }
    } else if (this.consumeIf(Keyword.ADD)) {
      this.consumeIf(Keyword.COLUMN)
      const node = new Node("add column")
      node.add(this.token(-2), this.token(-1))
      node.add(this.tableColumn())
      stmt.add(node)
    } else if (this.consumeIf(Keyword.DROP)) {
      this.consumeIf(Keyword.COLUMN)
      const node = new Node("drop column")
      node.add(this.token(-2), this.token(-1))
      node.add(this.identifier("column_name"))
      stmt.add(node)
    } else {
      throw this.createParseError()
    }
  }

  private parseDropTableStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.EXISTS)
      stmt.add(new Node("if exists").add(this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private parseDropViewStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.EXISTS)
      stmt.add(new Node("if exists").add(this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private parseDropTriggerStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.EXISTS)
      stmt.add(new Node("if exists").add(this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private parseDropIndexStatement(stmt: Node) {
    if (this.consumeIf(Keyword.IF)) {
      this.consume(Keyword.EXISTS)
      stmt.add(new Node("if exists").add(this.token(-2), this.token(-1)))
    }

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private parseAttachDatabaseStatement(stmt: Node) {
    stmt.add(this.expression())
    this.consume(Keyword.AS)
    stmt.add(this.token(-1))
    stmt.add(this.identifier("name"))
  }

  private parseDetachDatabaseStatement(stmt: Node) {
    stmt.add(this.identifier("name"))
  }

  private parseAnalyzeStatement(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private parseReindexStatement(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private parseVacuumStatement(stmt: Node) {
    if (this.token() && !this.peekIf(Keyword.TO)) {
      stmt.add(this.identifier("schema_name"))
    }
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      this.consume()
      stmt.add(this.token(-1))
    }
  }

  private parsePragmaStatement(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
    if (this.consumeIf(Keyword.OPE_EQ)) {
      stmt.add(this.token(-1))
      stmt.add(this.pragmaValue())
    } else if (this.consumeIf(TokenType.LeftParen)) {
      stmt.add(this.token(-1))
      stmt.add(this.pragmaValue())
      this.consume(TokenType.RightParen)
      stmt.add(this.token(-1))
    }
  }

  private parseBeginTransactionStatement(stmt: Node) {
    // do nothing
  }

  private parseSavepointStatement(stmt: Node) {
    stmt.add(this.identifier("name"))
  }

  private parseReleaseSavepointStatement(stmt: Node) {
    stmt.add(this.identifier("name"))
  }

  private parseCommitTransactionStatement(stmt: Node) {
    // do nothing
  }

  private parseRollbackTransactionStatement(stmt: Node) {
    if (this.consumeIf(Keyword.TO)) {
      this.consumeIf(Keyword.SAVEPOINT)
      stmt.add(this.token(-2), this.token(-1))
      stmt.add(this.identifier("name"))
    }
  }

  private parseInsertStatement(stmt: Node) {
    this.consume(Keyword.INTO)
    stmt.add(this.token(-1))

    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      this.consume()
      stmt.add(this.token(-1))
    }
  }

  private parseUpdateStatement(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      this.consume()
      stmt.add(this.token(-1))
    }
  }

  private parseDeleteStatement(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
    while (this.token() && !this.peekIf(TokenType.SemiColon)) {
      this.consume()
      stmt.add(this.token(-1))
    }
  }

  private selectClause() {
    const node = new Node("select")

    if (this.peekIf(Keyword.WITH)) {
      node.add(this.withClause())
    }
    this.consume(Keyword.SELECT)
    node.add(this.token(-1))

    let depth = 0
    while (this.token() &&
      !this.peekIf(TokenType.SemiColon) &&
      (depth == 0 && !this.peekIf(TokenType.RightParen))
    ) {
      if (this.consumeIf(TokenType.LeftParen)) {
        node.add(this.token(-1))
        depth++
      } else if (this.consumeIf(TokenType.RightParen)) {
        node.add(this.token(-1))
        depth--
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }

    return node
  }

  private withClause() {
    const node = new Node("with")

    this.consume(Keyword.WITH)
    node.add(this.token(-1))

    if (this.consumeIf(Keyword.RECURSIVE)) {
      node.add(new Node("recursive").add(this.token(-1)))
    }

    while (this.token()) {
      node.add(this.identifier("name"))
      if (this.consumeIf(TokenType.LeftParen)) {
        while (this.token()) {
          node.add(this.identifier("column"))

          if (this.consumeIf(TokenType.Comma)) {
            node.add(this.token(-1))
          } else {
            break
          }
        }

        this.consume(TokenType.RightParen)
        node.add(this.token(-1))
      }

      this.consume(Keyword.AS)
      node.add(this.token(-1))

      if (this.consumeIf(Keyword.NOT)) {
        this.consume(Keyword.MATERIALIZED)
        node.add(new Node("not materialized").add(this.token(-2), this.token(-1)))
      } else if (this.consumeIf(Keyword.MATERIALIZED)) {
        node.add(new Node("materialized").add(this.token(-1)))
      }
      this.consume(TokenType.LeftParen)
      node.add(this.token(-1))

      node.add(this.selectClause())

      this.consume(TokenType.RightParen)
      node.add(this.token(-1))

      if (this.consumeIf(TokenType.Comma)) {
        node.add(this.token(-1))
      } else {
        break
      }
    }

    return node
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
    if (this.consumeIf(Keyword.CONSTRAINT)) {
      node.add(this.token(-1))
      node.add(this.identifier("name"))
    }
    if (this.consumeIf(Keyword.PRIMARY)) {
      this.consume(Keyword.KEY)
      node.name = "primary key"
      node.add(this.token(-2), this.token(-1))

      if (this.consumeIf(Keyword.ASC)) {
        node.add(new Node("asc").add(this.token(-2), this.token(-1)))
      } else if (this.consumeIf(Keyword.DESC)) {
        node.add(new Node("desc").add(this.token(-2), this.token(-1)))
      }
      if (this.consumeIf(Keyword.ON)) {
        this.consume(Keyword.CONFLICT)
        node.add(this.token(-2), this.token(-1))
        node.add(this.conflictAction())
      }
      if (this.consumeIf(Keyword.AUTOINCREMENT)) {
        node.add(new Node("autoincrement").add(this.token(-1)))
      }
    } else if (this.consumeIf(Keyword.NOT)) {
      this.consume(Keyword.NULL)

      node.name = "not null"
      node.add(this.token(-2), this.token(-1))

      if (this.consumeIf(Keyword.ON)) {
        this.consume(Keyword.CONFLICT)
        node.add(this.token(-2), this.token(-1))
        node.add(this.conflictAction())
      }
    } else if (this.consumeIf(Keyword.NULL)) {
      node.name = "null"
      node.add(this.token(-1))

      if (this.consumeIf(Keyword.ON)) {
        this.consume(Keyword.CONFLICT)
        node.add(this.token(-2), this.token(-1))
        node.add(this.conflictAction())
      }
    } else if (this.consumeIf(Keyword.UNIQUE)) {
      node.name = "unique"
      node.add(this.token(-1))

      if (this.consumeIf(Keyword.ON)) {
        this.consume(Keyword.CONFLICT)
        node.add(this.token(-2), this.token(-1))
        node.add(this.conflictAction())
      }
    } else if (this.consumeIf(Keyword.CHECK)) {
      node.name = "check"
      node.add(this.token(-1))

      this.consume(TokenType.LeftParen)
      node.add(this.token(-1))
      node.add(this.expression())
      this.consume(TokenType.RightParen)
      node.add(this.token(-1))
    } else if (this.consumeIf(Keyword.DEFAULT)) {
      node.name = "default"
      node.add(this.token(-1))

      if (this.consumeIf(TokenType.LeftParen)) {
        node.add(this.token(-1))
        node.add(this.expression())
        this.consume(TokenType.RightParen)
        node.add(this.token(-1))
      } else {
        node.add(this.expression())
      }
    } else if (this.consumeIf(Keyword.COLLATE)) {
      node.name = "collate"
      node.add(this.token(-1))

      node.add(this.identifier("collate_name"))
    } else if (this.consumeIf(Keyword.REFERENCES)) {
      node.name = "references"
      node.add(this.token(-1))

      node.add(this.identifier("table_name"))

      this.consume(TokenType.LeftParen)
      node.add(this.token(-1))
      while (this.token()) {
        node.add(this.identifier("column_name"))
        if (this.consumeIf(TokenType.Comma)) {
          node.add(this.token(-1))
        } else {
          break
        }
      }
      this.consume(TokenType.RightParen)
      node.add(this.token(-1))
    } else if (this.peekIf(Keyword.GENERATED) || this.peekIf(Keyword.AS)) {
      node.name = "generated always"
      if (this.consumeIf(Keyword.GENERATED)) {
        this.consume(Keyword.ALWAYS)
        node.add(this.token(-2), this.token(-1))
      }
      this.consume(Keyword.AS)
      node.add(this.token(-1))

      this.consume(TokenType.LeftParen)
      node.add(this.token(-1))
      node.add(this.expression())
      this.consume(TokenType.RightParen)
      node.add(this.token(-1))

      if (this.consumeIf(Keyword.STORED)) {
        node.add(new Node("stored").add(this.token(-1)))
      } else if (this.consumeIf(Keyword.VIRTUAL)) {
        node.add(new Node("virtual").add(this.token(-1)))
      }
    } else {
      throw this.createParseError()
    }

    return node
  }

  private tableConstraint() {
    const node = new Node("constraint")

    if (this.consumeIf(Keyword.CONSTRAINT)) {
      const nameNode = this.identifier("name")
      node.value = nameNode.value
      node.add(nameNode)
    }
    if (this.consumeIf(Keyword.PRIMARY)) {
      this.consume(Keyword.KEY)
      const constraintNode = new Node("primary key")
      constraintNode.add(this.token(-2), this.token(-1))

      this.consume(TokenType.LeftParen)
      constraintNode.add(this.token(-1))
      while (this.token()) {
        constraintNode.add(this.indexColumn())
        if (this.consumeIf(TokenType.Comma)) {
          constraintNode.add(this.token(-1))
        } else {
          break
        }
      }
      this.consume(TokenType.RightParen)
      constraintNode.add(this.token(-1))

      if (this.consumeIf(Keyword.ON)) {
        this.consume(Keyword.CONFLICT)
        constraintNode.add(this.token(-2), this.token(-1))
        constraintNode.add(this.conflictAction())
      }

      node.add(constraintNode)
    } else if (this.consumeIf(Keyword.UNIQUE)) {
      const constraintNode = new Node("unique")
      constraintNode.add(this.token(-1))

      this.consume(TokenType.LeftParen)
      constraintNode.add(this.token(-1))
      while (this.token()) {
        constraintNode.add(this.indexColumn())
        if (this.consumeIf(TokenType.Comma)) {
          constraintNode.add(this.token(-1))
        } else {
          break
        }
      }
      this.consume(TokenType.RightParen)
      constraintNode.add(this.token(-1))

      if (this.consumeIf(Keyword.ON)) {
        this.consume(Keyword.CONFLICT)
        constraintNode.add(this.token(-2), this.token(-1))
        constraintNode.add(this.conflictAction())
      }

      node.add(constraintNode)
    } else if (this.consumeIf(Keyword.CHECK)) {
      const constraintNode = new Node("check")
      constraintNode.add(this.token(-1))

      this.consume(TokenType.LeftParen)
      constraintNode.add(this.token(-1))
      constraintNode.add(this.expression())
      this.consume(TokenType.RightParen)
      constraintNode.add(this.token(-1))

      node.add(constraintNode)
    } else if (this.consumeIf(Keyword.FOREIGN)) {
      this.consume(Keyword.KEY)
      const constraintNode = new Node("foreign key")
      constraintNode.add(this.token(-2), this.token(-1))

      this.consume(TokenType.LeftParen)
      constraintNode.add(this.token(-1))
      constraintNode.add(this.identifier("column_name"))
      while (this.token()) {
        constraintNode.add(this.identifier("column_name"))
        if (this.consumeIf(TokenType.Comma)) {
          constraintNode.add(this.token(-1))
        } else {
          break
        }
      }
      this.consume(TokenType.RightParen)
      constraintNode.add(this.token(-1))

      node.add(constraintNode)
    } else {
      throw this.createParseError()
    }
    return node
  }

  private dataType() {
    const node = new Node("type")

    const name = new Node("name")
    let identifier = this.identifier("")
    name.add(...identifier.children)
    name.value = identifier.value
    while (
      this.peekIf(TokenType.QuotedIdentifier) ||
      this.peekIf(TokenType.QuotedValue) ||
      this.peekIf(TokenType.Identifier)
    ) {
      identifier = this.identifier("")
      name.add(...identifier.children)
      name.value = " " + identifier.value
    }
    node.add(name)

    if (this.consumeIf(TokenType.LeftParen)) {
      node.add(this.numberValue("length"))
      if (this.consumeIf(TokenType.Comma)) {
        node.add(this.numberValue("scale"))
      }
      this.consume(TokenType.RightParen)
      node.add(this.token(-1))
    }
    return node
  }

  private conflictAction() {
    if (this.consumeIf(Keyword.ROLLBACK)) {
      return new Node("rollback").add(this.token(-1))
    } else if (this.consumeIf(Keyword.ABORT)) {
      return new Node("abort").add(this.token(-1))
    } else if (this.consumeIf(Keyword.FAIL)) {
      return new Node("fail").add(this.token(-1))
    } else if (this.consumeIf(Keyword.IGNORE)) {
      return new Node("ignore").add(this.token(-1))
    } else if (this.consumeIf(Keyword.REPLACE)) {
      return new Node("replace").add(this.token(-1))
    } else {
      throw this.createParseError()
    }
  }

  private indexColumn() {
    const node = new Node("index_column")
    const start = this.pos
    const expressionNode = this.expression()
    if (expressionNode.children.length === 1) {
      this.pos = start
      node.add(this.identifier("name"))
    } else {
      node.add(expressionNode)
    }
    if (this.consumeIf(Keyword.ASC)) {
      node.add(new Node("asc").add(this.token(-1)))
    } else if (this.consumeIf(Keyword.DESC)) {
      node.add(new Node("desc").add(this.token(-1)))
    }
    return node
  }

  private pragmaValue() {
    const node = new Node("pragma_value")
    if (this.consumeIf(Keyword.OPE_PLUS) || this.consumeIf(Keyword.OPE_MINUS)) {
      const token1 = this.token(-1)
      node.add(token1)
      this.consume(TokenType.Number)
      const token2 = this.token(-1)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else if (this.consumeIf(TokenType.Number)) {
      const token = this.token(-1)
      node.add(token)
      node.value = new Decimal(token.text).toString()
    } else if (this.consumeIf(TokenType.String) || this.consumeIf(TokenType.QuotedValue)) {
      const token = this.token(-1)
      node.add(token)
      node.value = dequote(token.text)
    } else if (this.consumeIf(TokenType.Identifier)) {
      const token = this.token(-1)
      node.add(token)
      node.value = token.text
    } else {
      throw this.createParseError()
    }
    return node
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.consumeIf(TokenType.QuotedIdentifier)) {
      node.add(this.token(-1))
      node.value = dequote(this.token(-1).text)
    } else if (this.consumeIf(TokenType.QuotedValue)) {
      node.add(this.token(-1))
      node.value = dequote(this.token(-1).text)
    } else if (this.consumeIf(TokenType.String)) {
      node.add(this.token(-1))
      node.value = dequote(this.token(-1).text)
    } else if (this.consumeIf(TokenType.Identifier)) {
      node.add(this.token(-1))
      node.value = this.token(-1).text
    } else {
      throw this.createParseError()
    }
    return node
  }

  private numberValue(name: string) {
    const node = new Node(name)
    if (this.consumeIf(Keyword.OPE_PLUS) || this.consumeIf(Keyword.OPE_MINUS)) {
      const token1 = this.token(-1)
      node.add(token1)
      this.consume(TokenType.Number)
      const token2 = this.token(-1)
      node.add(token2)
      node.value = new Decimal(token1.text + token2.text).toString()
    } else {
      this.consume(TokenType.Number)
      const token = this.token(-1)
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
      if (this.consumeIf(TokenType.LeftParen)) {
        node.add(this.token(-1))
        depth++
      } else if (this.consumeIf(TokenType.RightParen)) {
        node.add(this.token(-1))
        depth--
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }
}

const ReplaceReMap: { [key: string]: RegExp } = {
  '"': /""/g,
  "'": /''/g,
  "`": /``/g,
}

function dequote(text: string) {
  if (text.length >= 2) {
    const sc = text.charAt(0)
    const ec = text.charAt(text.length - 1)
    if (sc === "[" && ec === "]" || sc === ec) {
      const re = ReplaceReMap[sc]
      let value = text.substring(1, text.length - 1)
      if (re != null) {
        value = value.replace(re, sc)
      }
      return value
    }
  }
  return text
}
