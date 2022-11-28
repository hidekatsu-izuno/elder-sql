import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
} from "../parser"
import { dequote } from "../util"

const KeywordMap = new Map<string, Keyword>()
export class Keyword extends TokenType {
  static ACCESS = new Keyword("ACCESS", { reserved: true })
  static ADD = new Keyword("ADD", { reserved: true })
  static ADMINISTER = new Keyword("ADMINISTER")
  static ALL = new Keyword("ALL", { reserved: true })
  static ALTER = new Keyword("ALTER", { reserved: true })
  static ANALYTIC = new Keyword("ANALYTIC")
  static ANALYZE = new Keyword("ANALYZE")
  static AND = new Keyword("AND", { reserved: true })
  static ANY = new Keyword("ANY", { reserved: true })
  static ARCHIVE = new Keyword("ARCHIVE")
  static AS = new Keyword("AS", { reserved: true })
  static ASC = new Keyword("ASC", { reserved: true })
  static ASSOCIATE = new Keyword("ASSOCIATE")
  static AT = new Keyword("AT", { reserved: true })
  static ATTRIBUTE = new Keyword("ATTRIBUTE")
  static AUDIT = new Keyword("AUDIT", { reserved: true })
  static BEGIN = new Keyword("BEGIN", { reserved: true })
  static BETWEEN = new Keyword("BETWEEN", { reserved: true })
  static BLOCKCHAIN = new Keyword("BLOCKCHAIN")
  static BODY = new Keyword("BODY")
  static BY = new Keyword("BY", { reserved: true })
  static CASE = new Keyword("CASE", { reserved: true })
  static CALL = new Keyword("CALL")
  static CHAR = new Keyword("CHAR", { reserved: true })
  static CHECK = new Keyword("CHECK", { reserved: true })
  static CLOSE = new Keyword("CLOSE")
  static CLUSTER = new Keyword("CLUSTER", { reserved: true })
  static CLUSTERS = new Keyword("CLUSTERS", { reserved: true })
  static COLAUTH = new Keyword("COLAUTH", { reserved: true })
  static COLUMN = new Keyword("COLUMN", { reserved: true })
  static COLUMNS = new Keyword("COLUMNS", { reserved: true })
  static COLUMN_VALUE = new Keyword("COLUMN_VALUE")
  static COMMENT = new Keyword("COMMENT", { reserved: true })
  static COMMIT = new Keyword("COMMIT")
  static COMPRESS = new Keyword("COMPRESS", { reserved: true })
  static CONNECT = new Keyword("CONNECT", { reserved: true })
  static CONTEXT = new Keyword("CONTEXT")
  static CONTROLFILE = new Keyword("CONTROLFILE")
  static COST = new Keyword("COST")
  static CONSTRAINT = new Keyword("CONSTRAINT")
  static CONSTRAINTS = new Keyword("CONSTRAINTS")
  static CRASH = new Keyword("CRASH", { reserved: true })
  static CREATE = new Keyword("CREATE", { reserved: true })
  static CURRENT = new Keyword("CURRENT", { reserved: true })
  static CURSOR = new Keyword("CURSOR", { reserved: true })
  static DATABASE = new Keyword("DATABASE")
  static DATE = new Keyword("DATE", { reserved: true })
  static DECIMAL = new Keyword("DECIMAL", { reserved: true })
  static DECLARE = new Keyword("DECLARE", { reserved: true })
  static DEFAULT = new Keyword("DEFAULT", { reserved: true })
  static DELETE = new Keyword("DELETE", { reserved: true })
  static DESC = new Keyword("DESC", { reserved: true })
  static DICTIONARY = new Keyword("DICTIONARY")
  static DISASSOCIATE = new Keyword("DISASSOCIATE")
  static DIMENSION = new Keyword("DIMENSION")
  static DIRECTORY = new Keyword("DIRECTORY")
  static DISKGROUP = new Keyword("DISKGROUP")
  static DISTINCT = new Keyword("DISTINCT", { reserved: true })
  static DROP = new Keyword("DROP", { reserved: true })
  static DUPLICATED = new Keyword("DUPLICATED")
  static EDITION = new Keyword("EDITION")
  static EDITIONABLE = new Keyword("EDITIONABLE")
  static EDITIONING = new Keyword("EDITIONING")
  static ELSE = new Keyword("ELSE", { reserved: true })
  static END = new Keyword("END", { reserved: true })
  static EXCEPTION = new Keyword("EXCEPTION", { reserved: true })
  static EXCLUSIVE = new Keyword("EXCLUSIVE", { reserved: true })
  static EXISTS = new Keyword("EXISTS", { reserved: true })
  static EXPLAIN = new Keyword("EXPLAIN")
  static FETCH = new Keyword("FETCH", { reserved: true })
  static FILE = new Keyword("FILE", { reserved: true })
  static FLASHBACK = new Keyword("FLASHBACK")
  static FLOAT = new Keyword("FLOAT", { reserved: true })
  static FOR = new Keyword("FOR", { reserved: true })
  static FORCE = new Keyword("FORCE")
  static FROM = new Keyword("FROM", { reserved: true })
  static FUNCTION = new Keyword("FUNCTION", { reserved: true })
  static GLOBAL = new Keyword("GLOBAL")
  static GOTO = new Keyword("GOTO", { reserved: true })
  static GRANT = new Keyword("GRANT", { reserved: true })
  static GROUP = new Keyword("GROUP", { reserved: true })
  static HAVING = new Keyword("HAVING", { reserved: true })
  static HIERARCHY = new Keyword("HIERARCHY")
  static IDENTIFIED = new Keyword("IDENTIFIED", { reserved: true })
  static IF = new Keyword("IF", { reserved: true })
  static IMMEDIATE = new Keyword("IMMEDIATE", { reserved: true })
  static IMMUTABLE = new Keyword("IMMUTABLE")
  static IN = new Keyword("IN", { reserved: true })
  static INCREMENT = new Keyword("INCREMENT", { reserved: true })
  static INDEX = new Keyword("INDEX", { reserved: true })
  static INDEXES = new Keyword("INDEXES", { reserved: true })
  static INDEXTYPE = new Keyword("INDEXTYPE")
  static INITIAL = new Keyword("INITIAL", { reserved: true })
  static INMEMORY = new Keyword("INMEMORY")
  static INSERT = new Keyword("INSERT", { reserved: true })
  static INTEGER = new Keyword("INTEGER", { reserved: true })
  static INTERSECT = new Keyword("INTERSECT", { reserved: true })
  static INTO = new Keyword("INTO", { reserved: true })
  static IS = new Keyword("IS", { reserved: true })
  static JAVA = new Keyword("JAVA")
  static JOIN = new Keyword("JOIN")
  static KEY = new Keyword("KEY")
  static LEVEL = new Keyword("LEVEL", { reserved: true })
  static LIKE = new Keyword("LIKE", { reserved: true })
  static LINK = new Keyword("LINK")
  static LIBRARY = new Keyword("LIBRARY")
  static LOCK = new Keyword("LOCK", { reserved: true })
  static LOCKDOWN = new Keyword("LOCKDOWN")
  static LONG = new Keyword("LONG", { reserved: true })
  static LOG = new Keyword("LOG")
  static LOOP = new Keyword("LOOP")
  static MANAGEMENT = new Keyword("MANAGEMENT")
  static MATERIALIZED = new Keyword("MATERIALIZED")
  static MAXEXTENTS = new Keyword("MAXEXTENTS", { reserved: true })
  static MERGE = new Keyword("MERGE")
  static MINUS = new Keyword("MINUS", { reserved: true })
  static MLSLABEL = new Keyword("MLSLABEL", { reserved: true })
  static MODE = new Keyword("MODE", { reserved: true })
  static MODIFY = new Keyword("MODIFY", { reserved: true })
  static NESTED_TABLE_ID = new Keyword("NESTED_TABLE_ID", { partial: true })
  static NO = new Keyword("NO")
  static NOAUDIT = new Keyword("NOAUDIT", { reserved: true })
  static NOCOMPRESS = new Keyword("NOCOMPRESS", { reserved: true })
  static NOT = new Keyword("NOT", { reserved: true })
  static NOWAIT = new Keyword("NOWAIT", { reserved: true })
  static NULL = new Keyword("NULL", { reserved: true })
  static NUMBER = new Keyword("NUMBER", { reserved: true })
  static NONEDITIONALBE = new Keyword("NONEDITIONALBE")
  static OF = new Keyword("OF", { reserved: true })
  static OFFLINE = new Keyword("OFFLINE", { reserved: true })
  static ON = new Keyword("ON", { reserved: true })
  static ONLINE = new Keyword("ONLINE", { reserved: true })
  static OPTION = new Keyword("OPTION", { reserved: true })
  static OPERATOR = new Keyword("OPERATOR")
  static OR = new Keyword("OR", { reserved: true })
  static ORDER = new Keyword("ORDER", { reserved: true })
  static OUTLINE = new Keyword("OUTLINE")
  static OVERLAPS = new Keyword("OVERLAPS", { reserved: true })
  static PACKAGE = new Keyword("PACKAGE")
  static PCTFREE = new Keyword("PCTFREE", { reserved: true })
  static PFILE = new Keyword("PFILE")
  static PLAN = new Keyword("PLAN")
  static PLUGGABLE = new Keyword("PLUGGABLE")
  static POINT = new Keyword("POINT")
  static POLICY = new Keyword("POLICY")
  static PRIOR = new Keyword("PRIOR", { reserved: true })
  static PRIVATE = new Keyword("PRIVATE")
  static PROCEDURE = new Keyword("PROCEDURE", { reserved: true })
  static PROFILE = new Keyword("PROFILE")
  static PUBLIC = new Keyword("PUBLIC", { reserved: true })
  static PURGE = new Keyword("PURGE")
  static RAW = new Keyword("RAW", { reserved: true })
  static RECORD = new Keyword("RECORD")
  static RENAME = new Keyword("RENAME", { reserved: true })
  static REPLACE = new Keyword("REPLACE")
  static RESOURCE = new Keyword("RESOURCE", { reserved: true })
  static RESTORE = new Keyword("RESTORE")
  static RETURN = new Keyword("RETURN")
  static REVOKE = new Keyword("REVOKE", { reserved: true })
  static ROLE = new Keyword("ROLE")
  static ROLLBACK = new Keyword("ROLLBACK")
  static ROW = new Keyword("ROW", { reserved: true })
  static ROWID = new Keyword("ROWID", { reserved: true })
  static ROWNUM = new Keyword("ROWNUM", { reserved: true })
  static ROWS = new Keyword("ROWS", { reserved: true })
  static SAVEPOINT = new Keyword("SAVEPOINT")
  static SCHEMA = new Keyword("SCHEMA")
  static SEGMENT = new Keyword("SEGMENT")
  static SELECT = new Keyword("SELECT", { reserved: true })
  static SESSION = new Keyword("SESSION", { reserved: true })
  static SET = new Keyword("SET", { reserved: true })
  static SEQUENCE = new Keyword("SEQUENCE")
  static SHARE = new Keyword("SHARE", { reserved: true })
  static SHARED = new Keyword("SHARED")
  static SIZE = new Keyword("SIZE", { reserved: true })
  static SMALLINT = new Keyword("SMALLINT", { reserved: true })
  static SPFILE = new Keyword("SPFILE")
  static SQL = new Keyword("SQL", { reserved: true })
  static START = new Keyword("START", { reserved: true })
  static STATEMENT_ID = new Keyword("STATEMENT_ID")
  static STATISTICS = new Keyword("STATISTICS")
  static SUBTYPE = new Keyword("SUBTYPE", { reserved: true })
  static SUCCESSFUL = new Keyword("SUCCESSFUL", { reserved: true })
  static SYNONYM = new Keyword("SYNONYM", { reserved: true })
  static SYSDATE = new Keyword("SYSDATE", { reserved: true })
  static SYSTEM = new Keyword("SYSTEM")
  static TABAUTH = new Keyword("TABAUTH", { reserved: true })
  static TABLE = new Keyword("TABLE", { reserved: true })
  static TABLESPACE = new Keyword("TABLESPACE")
  static TEMPORARY = new Keyword("TEMPORARY")
  static THEN = new Keyword("THEN", { reserved: true })
  static TO = new Keyword("TO", { reserved: true })
  static TRIGGER = new Keyword("TRIGGER", { reserved: true })
  static TRUNCATE = new Keyword("TRUNCATE")
  static TRANSACTION = new Keyword("TRANSACTION")
  static TYPE = new Keyword("TYPE", { reserved: true })
  static UID = new Keyword("UID", { reserved: true })
  static UNION = new Keyword("UNION", { reserved: true })
  static UNIQUE = new Keyword("UNIQUE", { reserved: true })
  static UPDATE = new Keyword("UPDATE", { reserved: true })
  static USER = new Keyword("USER", { reserved: true })
  static VALIDATE = new Keyword("VALIDATE", { reserved: true })
  static VALUES = new Keyword("VALUES", { reserved: true })
  static VARCHAR = new Keyword("VARCHAR", { reserved: true })
  static VARCHAR2 = new Keyword("VARCHAR2", { reserved: true })
  static VIEW = new Keyword("VIEW", { reserved: true })
  static VIEWS = new Keyword("VIEWS", { reserved: true })
  static WHEN = new Keyword("WHEN", { reserved: true })
  static WHENEVER = new Keyword("WHENEVER", { reserved: true })
  static WHERE = new Keyword("WHERE", { reserved: true })
  static WITH = new Keyword("WITH", { reserved: true })
  static ZONEMAP = new Keyword("ZONEMAP")

  static OPE_ASSIGN = new Keyword("OPE_ASSIGN", { value: ":=" })
  static OPE_EQ = new Keyword("OPE_EQ", { value: "=" })

  constructor(
    public name: string,
    public options: Record<string, any> = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

export class OracleLexer extends Lexer {
  private reserved = new Set<Keyword>()

  constructor(
    private options: Record<string, any> = {}
  ) {
    super("oracle", [
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.Delimiter, re: /^[ \t]*[./](?=[ \t]|$)/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.Operator, re: /\(\+\)=?/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /'([^']|'')*'/y },
      { type: TokenType.QuotedIdentifier, re: /"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|[=<>!^:]=?|[~&|*/+-]/y },
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

export class OracleParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new OracleLexer(options).lex(input)
    return new OracleParser(tokens, options).root()
  }

  private static BLOCK_STATEMENTS = new Set<string>([
    "declare",
    "begin",
    "create function",
    "create library",
    "create package",
    "create package body",
    "create procedure",
    "create trigger",
    "create type",
  ])

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  root(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.consumeIf(TokenType.Eof)) {
          root.add(this.token(-1))
          break
        } else if (this.peekIf(TokenType.Delimiter) || this.peekIf(TokenType.SemiColon)) {
          this.consume()
          root.add(this.token(-1))
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          const stmt = this.statement()
          root.add(stmt)
          if (this.consumeIf(TokenType.Eof)) {
            root.add(this.token(-1))
            break
          } else if (this.consumeIf(TokenType.Delimiter)) {
            root.add(this.token(-1))
          } else if (!OracleParser.BLOCK_STATEMENTS.has(stmt.name) && this.consumeIf(TokenType.SemiColon)) {
            root.add(this.token(-1))
          } else {
            break
          }
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

  command() {
    const stmt = new Node("command")
    return stmt
  }

  statement() {
    let explainPlan
    let stmt

    try {
      if (this.consumeIf(Keyword.EXPLAIN)) {
        this.consume(Keyword.PLAN)
        explainPlan = new Node("explain plan").add(this.token(-2), this.token(-1))

        if (this.consumeIf(Keyword.SET)) {
          explainPlan.add(this.token(-1))
          this.consume(Keyword.STATEMENT_ID, Keyword.OPE_EQ, TokenType.String)
          explainPlan.add(this.token(-3), this.token(-2), this.token(-1))
        }

        if (this.consumeIf(Keyword.INTO)) {
          explainPlan.add(this.token(-1))
        }

        this.consume(Keyword.FOR)
        explainPlan.add(this.token(-1))
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.consumeIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.createAnalyticViewStatement()
            break
          } else if (this.consumeIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.createAttributeDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.createAuditPolicyStatement()
            break
          } else if (this.consumeIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.createClusterStatement()
            break
          } else if (this.consumeIf(Keyword.CONTEXT)) {
            this.pos = mark
            stmt = this.createContextStatement()
            break
          } else if (this.consumeIf(Keyword.CONTROLFILE)) {
            this.pos = mark
            stmt = this.createControlfileStatement()
            break
          } else if (this.consumeIf(Keyword.DATABASE)) {
            if (this.consumeIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.createDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.createDatabaseStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.createDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.DIRECTORY)) {
            this.pos = mark
            stmt = this.createDirectoryStatement()
            break
          } else if (this.consumeIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.createDiskgroupStatement()
            break
          } else if (this.consumeIf(Keyword.EDITION)) {
            this.pos = mark
            stmt = this.createEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.createEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.createFunctionStatement()
            break
          } else if (this.consumeIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.createHierarchyStatement()
            break
          } else if (this.consumeIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.createIndexStatement()
            break
          } else if (this.consumeIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.createIndextypeStatement()
            break
          } else if (this.consumeIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.createInmemoryJoinGroupStatement()
            break
          } else if (this.consumeIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.createJavaStatement()
            break
          } else if (this.consumeIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.createLibraryStatement()
            break
          } else if (this.consumeIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.createLockdownProfileStatement()
            break
          } else if (this.consumeIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            if (this.consumeIf(Keyword.LOG)) {
              this.pos = mark
              stmt = this.createMaterializedViewLogStatement()
            } else if (this.consumeIf(Keyword.ZONEMAP)) {
              this.pos = mark
              stmt = this.createMaterializedViewLogStatement()
            } else {
              this.pos = mark
              stmt = this.createMaterializedViewStatement()
            }
            break
          } else if (this.consumeIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.createOperatorStatement()
            break
          } else if (this.consumeIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.createOutlineStatement()
            break
          } else if (this.consumeIf(Keyword.PACKAGE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.createPackageBodyStatement()
            } else {
              this.pos = mark
              stmt = this.createPackageStatement()
            }
            break
          } else if (this.consumeIf(Keyword.PFILE)) {
            this.pos = mark
            stmt = this.createPfileStatement()
            break
          } else if (this.consumeIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.createPluggableDatabaseStatement()
            break
          } else if (this.consumeIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.createProcedureStatement()
            break
          } else if (this.consumeIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.createProfileStatement()
            break
          } else if (this.consumeIf(Keyword.RESTORE, Keyword.POINT)) {
            this.pos = mark
            stmt = this.createRestorePointStatement()
            break
          } else if (this.consumeIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.createRoleStatement()
            break
          } else if (this.consumeIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.createRollbackSegmentStatement()
            break
          } else if (this.consumeIf(Keyword.SCHEMA)) {
            this.pos = mark
            stmt = this.createSchemaStatement()
            break
          } else if (this.consumeIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.createSequenceStatement()
            break
          } else if (this.consumeIf(Keyword.SPFILE)) {
            this.pos = mark
            stmt = this.createSpfileStatement()
            break
          } else if (this.consumeIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.createSynonymStatement()
            break
          } else if (this.consumeIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.createTableStatement()
            break
          } else if (this.consumeIf(Keyword.TABLESPACE)) {
            if (this.consumeIf(Keyword.SET)) {
              this.pos = mark
              stmt = this.createTablespaceSetStatement()
            } else {
              this.pos = mark
              stmt = this.createTablespaceStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.createTriggerStatement()
            break
          } else if (this.consumeIf(Keyword.TYPE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.createTypeBodyStatement()
            } else {
              this.pos = mark
              stmt = this.createTypeStatement()
            }
            break
          } else if (this.consumeIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.createUserStatement()
            break
          } else if (this.consumeIf(Keyword.VIEW)) {
            this.pos = mark
            stmt = this.createViewStatement()
            break
          }
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ALTER)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.consumeIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.alterAnalyticViewStatement()
            break
          } else if (this.consumeIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.alterAttributeDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.alterAuditPolicyStatement()
            break
          } else if (this.consumeIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.alterClusterStatement()
            break
          } else if (this.consumeIf(Keyword.DATABASE)) {
            if (this.consumeIf(Keyword.DICTIONARY)) {
              this.pos = mark
              stmt = this.alterDatabaseDictionaryStatement()
            } else if (this.consumeIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.alterDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.alterDatabaseStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.alterDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.alterDiskgroupStatement()
            break
          } else if (this.consumeIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.alterEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.alterFunctionStatement()
            break
          } else if (this.consumeIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.alterHierarchyStatement()
            break
          } else if (this.consumeIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.alterIndexStatement()
            break
          } else if (this.consumeIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.alterIndextypeStatement()
            break
          } else if (this.consumeIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.alterInmemoryJoinGroupStatement()
            break
          } else if (this.consumeIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.alterJavaStatement()
            break
          } else if (this.consumeIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.alterLibraryStatement()
            break
          } else if (this.consumeIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.alterLockdownProfileStatement()
            break
          } else if (this.consumeIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            if (this.consumeIf(Keyword.LOG)) {
              this.pos = mark
              stmt = this.alterMaterializedViewLogStatement()
            } else if (this.consumeIf(Keyword.ZONEMAP)) {
              this.pos = mark
              stmt = this.alterMaterializedViewLogStatement()
            } else {
              this.pos = mark
              stmt = this.alterMaterializedViewStatement()
            }
            break
          } else if (this.consumeIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.alterOperatorStatement()
            break
          } else if (this.consumeIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.alterOutlineStatement()
            break
          } else if (this.consumeIf(Keyword.PACKAGE)) {
            this.pos = mark
            stmt = this.alterPackageStatement()
            break
          } else if (this.consumeIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.alterPluggableDatabaseStatement()
            break
          } else if (this.consumeIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.alterProcedureStatement()
            break
          } else if (this.consumeIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.alterProfileStatement()
            break
          } else if (this.consumeIf(Keyword.RESOURCE, Keyword.COST)) {
            this.pos = mark
            stmt = this.alterResourceCostStatement()
            break
          } else if (this.consumeIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.alterRoleStatement()
            break
          } else if (this.consumeIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.alterRollbackSegmentStatement()
            break
          } else if (this.consumeIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.alterSequenceStatement()
            break
          } else if (this.consumeIf(Keyword.SESSION)) {
            this.pos = mark
            stmt = this.alterSessionStatement()
            break
          } else if (this.consumeIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.alterSynonymStatement()
            break
          } else if (this.consumeIf(Keyword.SYSTEM)) {
            this.pos = mark
            stmt = this.alterSystemStatement()
            break
          } else if (this.consumeIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.alterTableStatement()
            break
          } else if (this.consumeIf(Keyword.TABLESPACE)) {
            if (this.consumeIf(Keyword.SET)) {
              this.pos = mark
              stmt = this.alterTablespaceSetStatement()
            } else {
              this.pos = mark
              stmt = this.alterTablespaceStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.alterTriggerStatement()
            break
          } else if (this.consumeIf(Keyword.TYPE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.alterTypeBodyStatement()
            } else {
              this.pos = mark
              stmt = this.alterTypeStatement()
            }
            break
          } else if (this.consumeIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.alterUserStatement()
            break
          } else if (this.consumeIf(Keyword.VIEW)) {
            this.pos = mark
            stmt = this.alterViewStatement()
            break
          }
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.DROP)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.consumeIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.dropAnalyticViewStatement()
            break
          } else if (this.consumeIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.dropAttributeDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.dropAuditPolicyStatement()
            break
          } else if (this.consumeIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.dropClusterStatement()
            break
          } else if (this.consumeIf(Keyword.CONTEXT)) {
            this.pos = mark
            stmt = this.dropContextStatement()
            break
          } else if (this.consumeIf(Keyword.DATABASE)) {
            if (this.consumeIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.dropDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.dropDatabaseStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.dropDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.DIRECTORY)) {
            this.pos = mark
            stmt = this.dropDirectoryStatement()
            break
          } else if (this.consumeIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.dropDiskgroupStatement()
            break
          } else if (this.consumeIf(Keyword.EDITION)) {
            this.pos = mark
            stmt = this.dropEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.dropEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.dropFunctionStatement()
            break
          } else if (this.consumeIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.dropHierarchyStatement()
            break
          } else if (this.consumeIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.dropIndexStatement()
            break
          } else if (this.consumeIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.dropIndextypeStatement()
            break
          } else if (this.consumeIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.dropInmemoryJoinGroupStatement()
            break
          } else if (this.consumeIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.dropJavaStatement()
            break
          } else if (this.consumeIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.dropLibraryStatement()
            break
          } else if (this.consumeIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.dropLockdownProfileStatement()
            break
          } else if (this.consumeIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            if (this.consumeIf(Keyword.LOG)) {
              this.pos = mark
              stmt = this.dropMaterializedViewLogStatement()
            } else if (this.consumeIf(Keyword.ZONEMAP)) {
              this.pos = mark
              stmt = this.dropMaterializedViewLogStatement()
            } else {
              this.pos = mark
              stmt = this.dropMaterializedViewStatement()
            }
            break
          } else if (this.consumeIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.dropOperatorStatement()
            break
          } else if (this.consumeIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.dropOutlineStatement()
            break
          } else if (this.consumeIf(Keyword.PACKAGE)) {
            this.pos = mark
            stmt = this.dropPackageStatement()
            break
          } else if (this.consumeIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.dropPluggableDatabaseStatement()
            break
          } else if (this.consumeIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.dropProcedureStatement()
            break
          } else if (this.consumeIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.dropProfileStatement()
            break
          } else if (this.consumeIf(Keyword.RESTORE, Keyword.POINT)) {
            this.pos = mark
            stmt = this.dropRestorePointStatement()
            break
          } else if (this.consumeIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.dropRoleStatement()
            break
          } else if (this.consumeIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.dropRollbackSegmentStatement()
            break
          } else if (this.consumeIf(Keyword.SCHEMA)) {
            this.pos = mark
            stmt = this.dropSchemaStatement()
            break
          } else if (this.consumeIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.dropSequenceStatement()
            break
          } else if (this.consumeIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.dropSynonymStatement()
            break
          } else if (this.consumeIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.dropTableStatement()
            break
          } else if (this.consumeIf(Keyword.TABLESPACE)) {
            if (this.consumeIf(Keyword.SET)) {
              this.pos = mark
              stmt = this.dropTablespaceSetStatement()
            } else {
              this.pos = mark
              stmt = this.dropTablespaceStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.dropTriggerStatement()
            break
          } else if (this.consumeIf(Keyword.TYPE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.dropTypeBodyStatement()
            } else {
              this.pos = mark
              stmt = this.dropTypeStatement()
            }
            break
          } else if (this.consumeIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.dropUserStatement()
            break
          } else if (this.consumeIf(Keyword.VIEW)) {
            this.pos = mark
            stmt = this.dropViewStatement()
            break
          }
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.TRUNCATE)) {
        const mark = this.pos
        this.consume()

        if (this.consumeIf(Keyword.CLUSTER)) {
          stmt = this.truncateClusterStatement()
        } else if (this.consumeIf(Keyword.TABLE)) {
          stmt = this.truncateTableStatement()
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.SET)) {
        const mark = this.pos
        this.consume()

        if (this.consumeIf(Keyword.CONSTRAINT) || this.consumeIf(Keyword.CONSTRAINTS)) {
          this.pos = mark
          stmt = this.setConstraintStatement()
        } else if (this.consumeIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.setRoleStatement()
        } else if (this.consumeIf(Keyword.TRANSACTION)) {
          this.pos = mark
          stmt = this.setTransactionStatement()
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ADMINISTER, Keyword.KEY, Keyword.MANAGEMENT)) {
        stmt = this.administerKeyManagementStatement()
      } else if (this.peekIf(Keyword.ANALYZE)) {
        stmt = this.analyzeStatement()
      } else if (this.peekIf(Keyword.ASSOCIATE, Keyword.STATISTICS)) {
        stmt = this.associateStatisticsStatement()
      } else if (this.peekIf(Keyword.AUDIT)) {
        stmt = this.auditStatement()
      } else if (this.peekIf(Keyword.CALL)) {
        stmt = this.callStatement()
      } else if (this.peekIf(Keyword.COMMENT)) {
        stmt = this.commentStatement()
      } else if (this.peekIf(Keyword.COMMIT)) {
        stmt = this.commitStatement()
      } else if (this.peekIf(Keyword.DISASSOCIATE, Keyword.STATISTICS)) {
        stmt = this.disassociateStatisticsStatement()
      } else if (this.peekIf(Keyword.FLASHBACK, Keyword.DATABASE)) {
        stmt = this.flashbackDatabaseStatement()
      } else if (this.peekIf(Keyword.FLASHBACK, Keyword.TABLE)) {
        stmt = this.flashbackTableStatement()
      } else if (this.peekIf(Keyword.GRANT)) {
        stmt = this.grantStatement()
      } else if (this.peekIf(Keyword.LOCK, Keyword.TABLE)) {
        stmt = this.lockTableStatement()
      } else if (this.peekIf(Keyword.NOAUDIT)) {
        stmt = this.noauditStatement()
      } else if (this.peekIf(Keyword.PURGE)) {
        stmt = this.purgeStatement()
      } else if (this.peekIf(Keyword.RENAME)) {
        stmt = this.renameStatement()
      } else if (this.peekIf(Keyword.REVOKE)) {
        stmt = this.revokeStatement()
      } else if (this.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackStatement()
      } else if (this.peekIf(Keyword.SAVEPOINT)) {
        stmt = this.savepointStatement()
      } else if (this.peekIf(Keyword.DECLARE)) {
        stmt = this.declareBlock()
      } else if (this.peekIf(Keyword.BEGIN)) {
        stmt = this.beginBlock()
      } else {
        let withNode = undefined
        if (this.peekIf(Keyword.WITH)) {
          withNode = this.withClause()
        }
        if (this.peekIf(Keyword.INSERT)) {
          stmt = this.insertClause(withNode)
        } else if (this.peekIf(Keyword.UPDATE)) {
          stmt = this.updateClause(withNode)
        } else if (this.peekIf(Keyword.DELETE)) {
          stmt = this.deleteClause(withNode)
        } else if (this.peekIf(Keyword.MERGE)) {
          stmt = this.mergeClause(withNode)
        } else if (this.peekIf(Keyword.SELECT)) {
          stmt = this.selectClause(withNode)
        }
      }

      if (!stmt) {
        throw this.createParseError()
      }
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("error")
        }
        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          this.consume()
          stmt.add(this.token(-1))
        }
        err.node = stmt
      }      
      throw err
    }

    if (explainPlan) {
      return explainPlan.add(stmt)
    }

    return stmt
  }

  private createAnalyticViewStatement() {
    const node = new Node("create analytic view")
    this.consume(Keyword.CREATE, Keyword.ANALYTIC, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createAttributeDimensionStatement() {
    const node = new Node("create attribute dimension")
    this.consume(Keyword.CREATE, Keyword.ATTRIBUTE, Keyword.DIMENSION)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createAuditPolicyStatement() {
    const node = new Node("create audit policy")
    this.consume(Keyword.CREATE, Keyword.AUDIT, Keyword.POLICY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createClusterStatement() {
    const node = new Node("create cluster")
    this.consume(Keyword.CREATE, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createContextStatement() {
    const node = new Node("create context")
    this.consume(Keyword.CREATE, Keyword.CONTEXT)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createControlfileStatement() {
    const node = new Node("create controlfile")
    this.consume(Keyword.CREATE, Keyword.CONTROLFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDatabaseLinkStatement() {
    const node = new Node("create database link")
    this.consume(Keyword.CREATE, Keyword.DATABASE, Keyword.LINK)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDatabaseStatement() {
    const node = new Node("create database")
    this.consume(Keyword.CREATE, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDimensionStatement() {
    const node = new Node("create dimension")
    this.consume(Keyword.CREATE, Keyword.DIMENSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDirectoryStatement() {
    const node = new Node("create directory")
    this.consume(Keyword.CREATE, Keyword.DIRECTORY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDiskgroupStatement() {
    const node = new Node("create diskgroup")
    this.consume(Keyword.CREATE, Keyword.DISKGROUP)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createEditionStatement() {
    const node = new Node("create edition")
    this.consume(Keyword.CREATE, Keyword.EDITION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createFunctionStatement() {
    const node = new Node("create function")
    this.consume(Keyword.CREATE, Keyword.FUNCTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createHierarchyStatement() {
    const node = new Node("create hierarchy")
    this.consume(Keyword.CREATE, Keyword.HIERARCHY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createIndexStatement() {
    const node = new Node("create index")
    this.consume(Keyword.CREATE, Keyword.INDEX)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createIndextypeStatement() {
    const node = new Node("create indextype")
    this.consume(Keyword.CREATE, Keyword.INDEXTYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createInmemoryJoinGroupStatement() {
    const node = new Node("create inmemory join group")
    this.consume(Keyword.CREATE, Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createJavaStatement() {
    const node = new Node("create java")
    this.consume(Keyword.CREATE, Keyword.JAVA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createLibraryStatement() {
    const node = new Node("create library")
    this.consume(Keyword.CREATE, Keyword.LIBRARY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createLockdownProfileStatement() {
    const node = new Node("create lockdown profile")
    this.consume(Keyword.CREATE, Keyword.LOCKDOWN, Keyword.PROFILE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createMaterializedViewLogStatement() {
    const node = new Node("create materialized view log")
    this.consume(Keyword.CREATE, Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createMaterializedViewStatement() {
    const node = new Node("create materialized view")
    this.consume(Keyword.CREATE, Keyword.MATERIALIZED, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createOperatorStatement() {
    const node = new Node("create operator")
    this.consume(Keyword.CREATE, Keyword.OPERATOR)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createOutlineStatement() {
    const node = new Node("create outline")
    this.consume(Keyword.CREATE, Keyword.OUTLINE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPackageBodyStatement() {
    const node = new Node("create package body")
    this.consume(Keyword.CREATE, Keyword.PACKAGE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPackageStatement() {
    const node = new Node("create package")
    this.consume(Keyword.CREATE, Keyword.PACKAGE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPfileStatement() {
    const node = new Node("create pfile")
    this.consume(Keyword.CREATE, Keyword.PFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPluggableDatabaseStatement() {
    const node = new Node("create pluggable database")
    this.consume(Keyword.CREATE, Keyword.PLUGGABLE, Keyword.DATABASE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createProcedureStatement() {
    const node = new Node("create procedure")
    this.consume(Keyword.CREATE, Keyword.PROCEDURE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createProfileStatement() {
    const node = new Node("create profile")
    this.consume(Keyword.CREATE, Keyword.PROFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createRestorePointStatement() {
    const node = new Node("create restore point")
    this.consume(Keyword.CREATE, Keyword.RESTORE, Keyword.POINT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createRoleStatement() {
    const node = new Node("create role")
    this.consume(Keyword.CREATE, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }
  
  private createRollbackSegmentStatement() {
    const node = new Node("create rollback segment")
    this.consume(Keyword.CREATE, Keyword.ROLLBACK, Keyword.SEGMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSchemaStatement() {
    const node = new Node("create schema")
    this.consume(Keyword.CREATE, Keyword.SCHEMA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSequenceStatement() {
    const node = new Node("create sequence")
    this.consume(Keyword.CREATE, Keyword.SEQUENCE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSpfileStatement() {
    const node = new Node("create spfile")
    this.consume(Keyword.CREATE, Keyword.SPFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSynonymStatement() {
    const node = new Node("create synonym")
    this.consume(Keyword.CREATE, Keyword.SYNONYM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTableStatement() {
    const node = new Node("create table")
    this.consume(Keyword.CREATE, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTablespaceSetStatement() {
    const node = new Node("create tablespace set")
    this.consume(Keyword.CREATE, Keyword.TABLESPACE, Keyword.SET)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTablespaceStatement() {
    const node = new Node("create tablespace")
    this.consume(Keyword.CREATE, Keyword.TABLESPACE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTriggerStatement() {
    const node = new Node("create trigger")
    this.consume(Keyword.CREATE, Keyword.TRIGGER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTypeBodyStatement() {
    const node = new Node("create type body")
    this.consume(Keyword.CREATE, Keyword.TYPE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTypeStatement() {
    const node = new Node("create type")
    this.consume(Keyword.CREATE, Keyword.TYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createUserStatement() {
    const node = new Node("create user")
    this.consume(Keyword.CREATE, Keyword.USER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createViewStatement() {
    const node = new Node("create view")
    this.consume(Keyword.CREATE, Keyword.VIEW)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterAnalyticViewStatement() {
    const node = new Node("alter analytic view")
    this.consume(Keyword.ALTER, Keyword.ANALYTIC, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterAttributeDimensionStatement() {
    const node = new Node("alter attribute dimension")
    this.consume(Keyword.ALTER, Keyword.ATTRIBUTE, Keyword.DIMENSION)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterAuditPolicyStatement() {
    const node = new Node("alter audit policy")
    this.consume(Keyword.ALTER, Keyword.AUDIT, Keyword.POLICY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterClusterStatement() {
    const node = new Node("alter cluster")
    this.consume(Keyword.ALTER, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDatabaseDictionaryStatement() {
    const node = new Node("alter database dictionary")
    this.consume(Keyword.ALTER, Keyword.DATABASE, Keyword.DICTIONARY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDatabaseLinkStatement() {
    const node = new Node("alter database link")
    this.consume(Keyword.ALTER, Keyword.DATABASE, Keyword.LINK)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDatabaseStatement() {
    const node = new Node("alter database")
    this.consume(Keyword.ALTER, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDimensionStatement() {
    const node = new Node("alter dimension")
    this.consume(Keyword.ALTER, Keyword.DIMENSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDiskgroupStatement() {
    const node = new Node("alter diskgroup")
    this.consume(Keyword.ALTER, Keyword.DISKGROUP)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterEditionStatement() {
    const node = new Node("alter edition")
    this.consume(Keyword.ALTER, Keyword.EDITION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterFunctionStatement() {
    const node = new Node("alter function")
    this.consume(Keyword.ALTER, Keyword.FUNCTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterHierarchyStatement() {
    const node = new Node("alter hierarchy")
    this.consume(Keyword.ALTER, Keyword.HIERARCHY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterIndexStatement() {
    const node = new Node("alter index")
    this.consume(Keyword.ALTER, Keyword.INDEX)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterIndextypeStatement() {
    const node = new Node("alter indextype")
    this.consume(Keyword.ALTER, Keyword.INDEXTYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterInmemoryJoinGroupStatement() {
    const node = new Node("alter inmemory join group")
    this.consume(Keyword.ALTER, Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterJavaStatement() {
    const node = new Node("alter java")
    this.consume(Keyword.ALTER, Keyword.JAVA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterLibraryStatement() {
    const node = new Node("alter library")
    this.consume(Keyword.ALTER, Keyword.LIBRARY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterLockdownProfileStatement() {
    const node = new Node("alter lockdown profile")
    this.consume(Keyword.ALTER, Keyword.LOCKDOWN, Keyword.PROFILE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterMaterializedViewLogStatement() {
    const node = new Node("alter materialized view log")
    this.consume(Keyword.ALTER, Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterMaterializedViewStatement() {
    const node = new Node("alter materialized view")
    this.consume(Keyword.ALTER, Keyword.MATERIALIZED, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterOperatorStatement() {
    const node = new Node("alter operator")
    this.consume(Keyword.ALTER, Keyword.OPERATOR)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterOutlineStatement() {
    const node = new Node("alter outline")
    this.consume(Keyword.ALTER, Keyword.OUTLINE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterPackageStatement() {
    const node = new Node("alter package")
    this.consume(Keyword.ALTER, Keyword.PACKAGE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterPluggableDatabaseStatement() {
    const node = new Node("alter pluggable database")
    this.consume(Keyword.ALTER, Keyword.PLUGGABLE, Keyword.DATABASE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterProcedureStatement() {
    const node = new Node("alter procedure")
    this.consume(Keyword.ALTER, Keyword.PROCEDURE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterProfileStatement() {
    const node = new Node("alter profile")
    this.consume(Keyword.ALTER, Keyword.PROFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterResourceCostStatement() {
    const node = new Node("alter resource cost")
    this.consume(Keyword.ALTER, Keyword.RESOURCE, Keyword.COST)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterRoleStatement() {
    const node = new Node("alter role")
    this.consume(Keyword.ALTER, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }
  
  private alterRollbackSegmentStatement() {
    const node = new Node("alter rollback segment")
    this.consume(Keyword.ALTER, Keyword.ROLLBACK, Keyword.SEGMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSequenceStatement() {
    const node = new Node("alter sequence")
    this.consume(Keyword.ALTER, Keyword.SEQUENCE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSessionStatement() {
    const node = new Node("alter session")
    this.consume(Keyword.ALTER, Keyword.SESSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSynonymStatement() {
    const node = new Node("alter synonym")
    this.consume(Keyword.ALTER, Keyword.SYNONYM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSystemStatement() {
    const node = new Node("alter system")
    this.consume(Keyword.ALTER, Keyword.SYSTEM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTableStatement() {
    const node = new Node("alter table")
    this.consume(Keyword.ALTER, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTablespaceSetStatement() {
    const node = new Node("alter tablespace set")
    this.consume(Keyword.ALTER, Keyword.TABLESPACE, Keyword.SET)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTablespaceStatement() {
    const node = new Node("alter tablespace")
    this.consume(Keyword.ALTER, Keyword.TABLESPACE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTriggerStatement() {
    const node = new Node("alter trigger")
    this.consume(Keyword.ALTER, Keyword.TRIGGER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTypeBodyStatement() {
    const node = new Node("alter type body")
    this.consume(Keyword.ALTER, Keyword.TYPE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTypeStatement() {
    const node = new Node("alter type")
    this.consume(Keyword.ALTER, Keyword.TYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterUserStatement() {
    const node = new Node("alter user")
    this.consume(Keyword.ALTER, Keyword.USER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterViewStatement() {
    const node = new Node("alter view")
    this.consume(Keyword.ALTER, Keyword.VIEW)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropAnalyticViewStatement() {
    const node = new Node("drop analytic view")
    this.consume(Keyword.DROP, Keyword.ANALYTIC, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropAttributeDimensionStatement() {
    const node = new Node("drop attribute dimension")
    this.consume(Keyword.DROP, Keyword.ATTRIBUTE, Keyword.DIMENSION)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropAuditPolicyStatement() {
    const node = new Node("drop audit policy")
    this.consume(Keyword.DROP, Keyword.AUDIT, Keyword.POLICY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropClusterStatement() {
    const node = new Node("drop cluster")
    this.consume(Keyword.DROP, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropContextStatement() {
    const node = new Node("drop context")
    this.consume(Keyword.DROP, Keyword.CONTEXT)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDatabaseLinkStatement() {
    const node = new Node("drop database link")
    this.consume(Keyword.DROP, Keyword.DATABASE, Keyword.LINK)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDatabaseStatement() {
    const node = new Node("drop database")
    this.consume(Keyword.DROP, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDimensionStatement() {
    const node = new Node("drop dimension")
    this.consume(Keyword.DROP, Keyword.DIMENSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDirectoryStatement() {
    const node = new Node("drop directory")
    this.consume(Keyword.DROP, Keyword.DIRECTORY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDiskgroupStatement() {
    const node = new Node("drop diskgroup")
    this.consume(Keyword.DROP, Keyword.DISKGROUP)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropEditionStatement() {
    const node = new Node("drop edition")
    this.consume(Keyword.DROP, Keyword.EDITION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropFunctionStatement() {
    const node = new Node("drop function")
    this.consume(Keyword.DROP, Keyword.FUNCTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropHierarchyStatement() {
    const node = new Node("drop hierarchy")
    this.consume(Keyword.DROP, Keyword.HIERARCHY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropIndexStatement() {
    const node = new Node("drop index")
    this.consume(Keyword.DROP, Keyword.INDEX)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropIndextypeStatement() {
    const node = new Node("drop indextype")
    this.consume(Keyword.DROP, Keyword.INDEXTYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropInmemoryJoinGroupStatement() {
    const node = new Node("drop inmemory join group")
    this.consume(Keyword.DROP, Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropJavaStatement() {
    const node = new Node("drop java")
    this.consume(Keyword.DROP, Keyword.JAVA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropLibraryStatement() {
    const node = new Node("drop library")
    this.consume(Keyword.DROP, Keyword.LIBRARY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropLockdownProfileStatement() {
    const node = new Node("drop lockdown profile")
    this.consume(Keyword.DROP, Keyword.LOCKDOWN, Keyword.PROFILE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropMaterializedViewLogStatement() {
    const node = new Node("drop materialized view log")
    this.consume(Keyword.DROP, Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropMaterializedViewStatement() {
    const node = new Node("drop materialized view")
    this.consume(Keyword.DROP, Keyword.MATERIALIZED, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropOperatorStatement() {
    const node = new Node("drop operator")
    this.consume(Keyword.DROP, Keyword.OPERATOR)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropOutlineStatement() {
    const node = new Node("drop outline")
    this.consume(Keyword.DROP, Keyword.OUTLINE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropPackageStatement() {
    const node = new Node("drop package")
    this.consume(Keyword.DROP, Keyword.PACKAGE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropPluggableDatabaseStatement() {
    const node = new Node("drop pluggable database")
    this.consume(Keyword.DROP, Keyword.PLUGGABLE, Keyword.DATABASE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropProcedureStatement() {
    const node = new Node("drop procedure")
    this.consume(Keyword.DROP, Keyword.PROCEDURE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropProfileStatement() {
    const node = new Node("drop profile")
    this.consume(Keyword.DROP, Keyword.PROFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropRestorePointStatement() {
    const node = new Node("drop restore point")
    this.consume(Keyword.DROP, Keyword.RESTORE, Keyword.POINT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropRoleStatement() {
    const node = new Node("drop role")
    this.consume(Keyword.DROP, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }
  
  private dropRollbackSegmentStatement() {
    const node = new Node("drop rollback segment")
    this.consume(Keyword.DROP, Keyword.ROLLBACK, Keyword.SEGMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropSchemaStatement() {
    const node = new Node("drop schema")
    this.consume(Keyword.DROP, Keyword.SCHEMA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropSequenceStatement() {
    const node = new Node("drop sequence")
    this.consume(Keyword.DROP, Keyword.SEQUENCE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropSynonymStatement() {
    const node = new Node("drop synonym")
    this.consume(Keyword.DROP, Keyword.SYNONYM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTableStatement() {
    const node = new Node("drop table")
    this.consume(Keyword.DROP, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTablespaceSetStatement() {
    const node = new Node("drop tablespace set")
    this.consume(Keyword.DROP, Keyword.TABLESPACE, Keyword.SET)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTablespaceStatement() {
    const node = new Node("drop tablespace")
    this.consume(Keyword.DROP, Keyword.TABLESPACE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTriggerStatement() {
    const node = new Node("drop trigger")
    this.consume(Keyword.DROP, Keyword.TRIGGER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTypeBodyStatement() {
    const node = new Node("drop type body")
    this.consume(Keyword.DROP, Keyword.TYPE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTypeStatement() {
    const node = new Node("drop type")
    this.consume(Keyword.DROP, Keyword.TYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropUserStatement() {
    const node = new Node("drop user")
    this.consume(Keyword.DROP, Keyword.USER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropViewStatement() {
    const node = new Node("drop view")
    this.consume(Keyword.DROP, Keyword.VIEW)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private truncateClusterStatement() {
    const node = new Node("truncate cluster")
    this.consume(Keyword.TRUNCATE, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private truncateTableStatement() {
    const node = new Node("truncate table")
    this.consume(Keyword.TRUNCATE, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private setConstraintStatement() {
    const node = new Node("set constraint")
    this.consume(Keyword.SET)
    node.add(this.token(-1))

    if (this.consumeIf(Keyword.CONSTRAINTS)) {
      node.add(this.token(-1))
    } else {
      this.consume(Keyword.CONSTRAINT)
      node.add(this.token(-1))
    }

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private setRoleStatement() {
    const node = new Node("set role")
    this.consume(Keyword.SET, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private setTransactionStatement() {
    const node = new Node("set transaction")
    this.consume(Keyword.SET, Keyword.TRANSACTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private administerKeyManagementStatement() {
    const node = new Node("administer key management")
    this.consume(Keyword.ADMINISTER, Keyword.KEY, Keyword.MANAGEMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private analyzeStatement() {
    const node = new Node("analyze")
    this.consume(Keyword.ANALYZE)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private associateStatisticsStatement() {
    const node = new Node("associate statistics")
    this.consume(Keyword.ASSOCIATE, Keyword.STATISTICS)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private auditStatement() {
    const node = new Node("audit")
    this.consume(Keyword.AUDIT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private callStatement() {
    const node = new Node("call")
    this.consume(Keyword.CALL)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private commentStatement() {
    const node = new Node("comment")
    this.consume(Keyword.COMMENT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private commitStatement() {
    const node = new Node("commit")
    this.consume(Keyword.COMMIT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private disassociateStatisticsStatement() {
    const node = new Node("disassociate statistics")
    this.consume(Keyword.DISASSOCIATE, Keyword.STATISTICS)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private flashbackDatabaseStatement() {
    const node = new Node("flashback database")
    this.consume(Keyword.FLASHBACK, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private flashbackTableStatement() {
    const node = new Node("flashback table")
    this.consume(Keyword.FLASHBACK, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private grantStatement() {
    const node = new Node("grant")
    this.consume(Keyword.GRANT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private lockTableStatement() {
    const node = new Node("lock table")
    this.consume(Keyword.LOCK, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private noauditStatement() {
    const node = new Node("noaudit")
    this.consume(Keyword.NOAUDIT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private purgeStatement() {
    const node = new Node("purge")
    this.consume(Keyword.PURGE)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private renameStatement() {
    const node = new Node("rename")
    this.consume(Keyword.RENAME)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private revokeStatement() {
    const node = new Node("revoke")
    this.consume(Keyword.REVOKE)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private rollbackStatement() {
    const node = new Node("rollback")
    this.consume(Keyword.ROLLBACK)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private savepointStatement() {
    const node = new Node("savepoint")
    this.consume(Keyword.SAVEPOINT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private declareBlock() {
    const node = new Node("block")

    const declareNode = new Node("declare")
    this.consume(Keyword.DECLARE)
    declareNode.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
        if (this.consumeIf(Keyword.EXCEPTION)) {
          node.add(this.exceptionBlock())
        }
        break
      } else if (this.peekIf(Keyword.PROCEDURE)) {
        declareNode.add(this.procedureBlock())
      } else if (this.peekIf(Keyword.FUNCTION)) {
        declareNode.add(this.functionBlock())
      } else {
        declareNode.add(this.token(-1))
      }
    }

    return node
  }

  private beginBlock() {
    const node = new Node("begin")
    this.consume(Keyword.BEGIN)
    node.add(this.token(-1))

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else if (this.peekIf(Keyword.DECLARE)) {
        node.add(this.declareBlock())
      } else if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
      } else if (this.peekIf(Keyword.EXCEPTION)) {
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }

    return node
  }

  private procedureBlock() {
    const node = new Node("nested_procedure")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }

  private functionBlock() {
    const node = new Node("nested_function")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }

  private exceptionBlock() {
    const node = new Node("exception")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }

  private insertClause(withNode?: Node) {
    const node = new Node("insert")
    this.consume(Keyword.INSERT, Keyword.INTO)
    node.add(this.token(-2), this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private updateClause(withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.UPDATE)
    node.add(this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private deleteClause(withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.DELETE, Keyword.FROM)
    node.add(this.token(-2), this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private mergeClause(withNode?: Node) {
    const node = new Node("merge")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.MERGE, Keyword.INTO)
    node.add(this.token(-2), this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private selectClause(withNode?: Node) {
    const node = new Node("select")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.SELECT)
    node.add(this.token(-1))

    let depth = 0
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
      && (depth == 0 && !this.peekIf(TokenType.RightParen))
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

  private parseName(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.consumeIf(TokenType.QuotedIdentifier)) {
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
}