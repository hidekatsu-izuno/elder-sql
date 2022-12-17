import {
  TokenType,
  Token,
  Lexer,
  SourceLocation,
  Keyword,
  Operator,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
} from "../parser"
import { dequote } from "../util"

const LookAheadSet = new Set<Keyword>([
  Keyword.CLUSTER,
  Keyword.CONTEXT,
  Keyword.CONTROLFILE,
  Keyword.DATABASE,
  Keyword.DIMENSION,
  Keyword.DIRECTORY,
  Keyword.DISKGROUP,
  Keyword.EDITION,
  Keyword.FLASHBACK,
  Keyword.FUNCTION,
  Keyword.HIERARCHY,
  Keyword.INDEX,
  Keyword.INDEXTYPE,
  Keyword.INMEMORY,
  Keyword.JAVA,
  Keyword.LIBRARY,
  Keyword.LOCKDOWN,
  Keyword.MATERIALIZED,
  Keyword.OPERATOR,
  Keyword.OUTLINE,
  Keyword.PACKAGE,
  Keyword.PFILE,
  Keyword.PROCEDURE,
  Keyword.PROFILE,
  Keyword.RESTORE,
  Keyword.ROLE,
  Keyword.ROLLBACK,
  Keyword.SCHEMA,
  Keyword.SEQUENCE,
  Keyword.SPFILE,
  Keyword.SYNONYM,
  Keyword.TABLE,
  Keyword.TABLESPACE,
  Keyword.TRIGGER,
  Keyword.TYPE,
  Keyword.USER,
  Keyword.VIEW,
])

const ReservedSet = new Set<Keyword>([
  Keyword.ACCESS,
  Keyword.ADD,
  Keyword.ALL,
  Keyword.ALTER,
  Keyword.AND,
  Keyword.ANY,
  Keyword.AS,
  Keyword.ASC,
  Keyword.AT,
  Keyword.AUDIT,
  Keyword.BEGIN,
  Keyword.BETWEEN,
  Keyword.BY,
  Keyword.CASE,
  Keyword.CHAR,
  Keyword.CHECK,
  Keyword.CLUSTER,
  Keyword.CLUSTERS,
  Keyword.COLAUTH,
  Keyword.COLUMN,
  Keyword.COLUMNS,
  Keyword.COMMENT,
  Keyword.COMPRESS,
  Keyword.CONNECT,
  Keyword.CRASH,
  Keyword.CREATE,
  Keyword.CURRENT,
  Keyword.CURSOR,
  Keyword.DATE,
  Keyword.DECIMAL,
  Keyword.DECLARE,
  Keyword.DEFAULT,
  Keyword.DELETE,
  Keyword.DESC,
  Keyword.DISTINCT,
  Keyword.DROP,
  Keyword.ELSE,
  Keyword.END,
  Keyword.EXCEPTION,
  Keyword.EXCLUSIVE,
  Keyword.EXISTS,
  Keyword.FETCH,
  Keyword.FILE,
  Keyword.FLOAT,
  Keyword.FOR,
  Keyword.FROM,
  Keyword.FUNCTION,
  Keyword.GOTO,
  Keyword.GRANT,
  Keyword.GROUP,
  Keyword.HAVING,
  Keyword.IDENTIFIED,
  Keyword.IF,
  Keyword.IMMEDIATE,
  Keyword.IN,
  Keyword.INCREMENT,
  Keyword.INDEX,
  Keyword.INDEXES,
  Keyword.INITIAL,
  Keyword.INSERT,
  Keyword.INTEGER,
  Keyword.INTERSECT,
  Keyword.INTO,
  Keyword.IS,
  Keyword.LEVEL,
  Keyword.LIKE,
  Keyword.LOCK,
  Keyword.LONG,
  Keyword.MAXEXTENTS,
  Keyword.MINUS,
  Keyword.MLSLABEL,
  Keyword.MODE,
  Keyword.MODIFY,
  Keyword.NOAUDIT,
  Keyword.NOCOMPRESS,
  Keyword.NOT,
  Keyword.NOWAIT,
  Keyword.NULL,
  Keyword.NUMBER,
  Keyword.OF,
  Keyword.OFFLINE,
  Keyword.ON,
  Keyword.ONLINE,
  Keyword.OPTION,
  Keyword.OR,
  Keyword.ORDER,
  Keyword.OVERLAPS,
  Keyword.PCTFREE,
  Keyword.PRIOR,
  Keyword.PROCEDURE,
  Keyword.PUBLIC,
  Keyword.RAW,
  Keyword.RENAME,
  Keyword.RESOURCE,
  Keyword.REVOKE,
  Keyword.ROW,
  Keyword.ROWID,
  Keyword.ROWNUM,
  Keyword.ROWS,
  Keyword.SELECT,
  Keyword.SESSION,
  Keyword.SET,
  Keyword.SHARE,
  Keyword.SIZE,
  Keyword.SMALLINT,
  Keyword.SQL,
  Keyword.START,
  Keyword.SUBTYPE,
  Keyword.SUCCESSFUL,
  Keyword.SYNONYM,
  Keyword.SYSDATE,
  Keyword.TABAUTH,
  Keyword.TABLE,
  Keyword.THEN,
  Keyword.TO,
  Keyword.TRIGGER,
  Keyword.TYPE,
  Keyword.UID,
  Keyword.UNION,
  Keyword.UNIQUE,
  Keyword.UPDATE,
  Keyword.USER,
  Keyword.VALIDATE,
  Keyword.VALUES,
  Keyword.VARCHAR,
  Keyword.VARCHAR2,
  Keyword.VIEW,
  Keyword.VIEWS,
  Keyword.WHEN,
  Keyword.WHENEVER,
  Keyword.WHERE,
  Keyword.WITH,    
])
export class OracleLexer extends Lexer {
  private state = 0; // 0 CREATE 1 STATEMENT 2 BODY 3 END

  constructor(
    options: Record<string, any> = {}
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
    ], options)
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
        if (this.state === 0 && keyword === Keyword.CREATE) {
          this.state = 1
        } else if (this.state === 1 && LookAheadSet.has(keyword)) {
          if (
            keyword === Keyword.FUNCTION
            || keyword === Keyword.LIBRARY
            || keyword === Keyword.PACKAGE
            || keyword === Keyword.PROCEDURE
            || keyword === Keyword.TRIGGER
            || keyword === Keyword.TYPE
          ) {
            this.state = 2
          } else {
            this.state = 3
          }
        }
      }
    } else if (token.type === TokenType.Operator) {
      const operator = Operator.from(token.text)
      if (operator) {
        token.subtype = operator
      }
    } else if (token.type === TokenType.SemiColon) {
      if (this.state !== 2) {
        this.state = 0
        token.subtype = TokenType.Delimiter
      }
    } else if (token.type === TokenType.Delimiter) {
      this.state = 0
    }
    return token
  }
}

export class OracleParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new OracleLexer(options).lex(input)
    return new OracleParser(tokens, options).parse()
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
        } else if (this.peekIf(TokenType.Delimiter) || this.peekIf(TokenType.SemiColon)) {
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

    if (this.token()) {
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
    return stmt
  }

  private statement() {
    let explainPlan
    let stmt
    let isBlock = false

    try {
      if (this.peekIf(Keyword.EXPLAIN)) {
        explainPlan = new Node("explain plan")
        explainPlan.add(this.consume())
        explainPlan.add(this.consume(Keyword.PLAN))

        if (this.peekIf(Keyword.SET)) {
          const childNode = new Node("statement_id")
          childNode.add(this.consume())
          childNode.add(this.consume(Keyword.STATEMENT_ID))
          childNode.add(this.consume(Operator.EQ))
          childNode.add(this.consume(TokenType.String))
          childNode.value = dequote(this.token(-1).text)
          explainPlan.add(childNode)
        }

        if (this.peekIf(Keyword.INTO)) {
          explainPlan.add(this.consume())
        }

        this.parseName(explainPlan)

        explainPlan.add(this.consume(Keyword.FOR))
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.OR, Keyword.REPLACE)) {
          this.consume()
          this.consume()
        } else if (this.peekIf(Keyword.BIGFILE) || this.peekIf(Keyword.SMALLFILE)) {
          this.consume()
        }
        if (
          this.peekIf(Keyword.AND, Keyword.RESOLVE) ||
          this.peekIf(Keyword.AND, Keyword.COMPILE)
        ) {
          this.consume()
          this.consume()
        }
        if (this.peekIf(Keyword.NO, Keyword.FORCE)) {
          this.consume()
          this.consume()
        } else if (this.peekIf(Keyword.FORCE) || this.peekIf(Keyword.NOFORCE)) {
          this.consume()
        }
        if (this.peekIf(Keyword.EDITIONABLE) || this.peekIf(Keyword.NONEDITIONABLE)) {
          this.consume()
        }

        if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createAnalyticViewStatement()
        } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.createAttributeDimensionStatement()
        } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          this.pos = mark
          stmt = this.createAuditPolicyStatement()
        } else if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.createClusterStatement()
        } else if (this.peekIf(Keyword.CONTEXT)) {
          this.pos = mark
          stmt = this.createContextStatement()
        } else if (this.peekIf(Keyword.CONTROLFILE)) {
          this.pos = mark
          stmt = this.createControlfileStatement()
        } else if (
          this.peekIf(Keyword.SHARED, Keyword.PUBLIC, Keyword.DATABASE, Keyword.LINK) ||
          this.peekIf(Keyword.SHARED, Keyword.DATABASE, Keyword.LINK) ||
          this.peekIf(Keyword.PUBLIC, Keyword.DATABASE, Keyword.LINK) ||
          this.peekIf(Keyword.DATABASE, Keyword.LINK)
        ) {
          this.pos = mark
          stmt = this.createDatabaseLinkStatement()
        } else if (this.peekIf(Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.createDatabaseStatement()
        } else if (this.peekIf(Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.createDimensionStatement()
        } else if (this.peekIf(Keyword.DIRECTORY)) {
          this.pos = mark
          stmt = this.createDirectoryStatement()
        } else if (this.peekIf(Keyword.DISKGROUP)) {
          this.pos = mark
          stmt = this.createDiskgroupStatement()
        } else if (this.peekIf(Keyword.EDITION)) {
          this.pos = mark
          stmt = this.createEditionStatement()
        } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          this.pos = mark
          stmt = this.createEditionStatement()
        } else if (this.peekIf(Keyword.FUNCTION)) {
          isBlock = true
          this.pos = mark
          stmt = this.createFunctionStatement()
        } else if (this.peekIf(Keyword.HIERARCHY)) {
          this.pos = mark
          stmt = this.createHierarchyStatement()
        } else if (
          this.peekIf(Keyword.UNIQUE, Keyword.INDEX) || 
          this.peekIf(Keyword.BITMAP, Keyword.INDEX) ||
          this.peekIf(Keyword.INDEX)
        ) {
          this.pos = mark
          stmt = this.createIndexStatement()
        } else if (this.peekIf(Keyword.INDEXTYPE)) {
          this.pos = mark
          stmt = this.createIndextypeStatement()
        } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          this.pos = mark
          stmt = this.createInmemoryJoinGroupStatement()
        } else if (this.peekIf(Keyword.JAVA)) {
          this.pos = mark
          stmt = this.createJavaStatement()
        } else if (this.peekIf(Keyword.LIBRARY)) {
          isBlock = true
          this.pos = mark
          stmt = this.createLibraryStatement()
        } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.createLockdownProfileStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          this.pos = mark
          stmt = this.createMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          this.pos = mark
          stmt = this.createMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createMaterializedViewStatement()
        } else if (this.peekIf(Keyword.OPERATOR)) {
          this.pos = mark
          stmt = this.createOperatorStatement()
        } else if (
          this.peekIf(Keyword.PUBLIC, Keyword.OUTLINE) ||
          this.peekIf(Keyword.PRIVATE, Keyword.OUTLINE) ||
          this.peekIf(Keyword.OUTLINE)
        ) {
          this.pos = mark
          stmt = this.createOutlineStatement()
        } else if (this.peekIf(Keyword.PACKAGE, Keyword.BODY)) {
          isBlock = true
          this.pos = mark
          stmt = this.createPackageBodyStatement()
        } else if (this.peekIf(Keyword.PACKAGE)) {
          isBlock = true
          this.pos = mark
          stmt = this.createPackageStatement()
        } else if (this.peekIf(Keyword.PFILE)) {
          this.pos = mark
          stmt = this.createPfileStatement()
        } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.createPluggableDatabaseStatement()
        } else if (this.peekIf(Keyword.PROCEDURE)) {
          isBlock = true
          this.pos = mark
          stmt = this.createProcedureStatement()
        } else if (this.peekIf(Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.createProfileStatement()
        } else if (
          this.peekIf(Keyword.CLEAN, Keyword.RESTORE, Keyword.POINT) ||
          this.peekIf(Keyword.RESTORE, Keyword.POINT)
        ) {
          this.pos = mark
          stmt = this.createRestorePointStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.createRoleStatement()
        } else if (
          this.peekIf(Keyword.PUBLIC, Keyword.ROLLBACK, Keyword.SEGMENT) ||
          this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)
        ) {
          this.pos = mark
          stmt = this.createRollbackSegmentStatement()
        } else if (this.peekIf(Keyword.SCHEMA)) {
          this.pos = mark
          stmt = this.createSchemaStatement()
        } else if (this.peekIf(Keyword.SEQUENCE)) {
          this.pos = mark
          stmt = this.createSequenceStatement()
        } else if (this.peekIf(Keyword.SPFILE)) {
          this.pos = mark
          stmt = this.createSpfileStatement()
        } else if (
          this.peekIf(Keyword.PUBLIC, Keyword.SYNONYM) ||
          this.peekIf(Keyword.SYNONYM)
        ) {
          this.pos = mark
          stmt = this.createSynonymStatement()
        } else if (
          this.peekIf(Keyword.GLOBAL, Keyword.TEMPORARY, Keyword.TABLE) ||
          this.peekIf(Keyword.PRIVATE, Keyword.TEMPORARY, Keyword.TABLE) ||
          this.peekIf(Keyword.SHARED, Keyword.TABLE) ||
          this.peekIf(Keyword.DUPLICATED, Keyword.TABLE) ||
          this.peekIf(Keyword.IMMUTABLE, Keyword.BLOCKCHAIN, Keyword.TABLE) ||
          this.peekIf(Keyword.BLOCKCHAIN, Keyword.TABLE) ||
          this.peekIf(Keyword.IMMUTABLE, Keyword.TABLE) ||
          this.peekIf(Keyword.TABLE)
        ) {
          this.pos = mark
          stmt = this.createTableStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.createTablespaceSetStatement()
        } else if (
          this.peekIf(Keyword.LOCAL, Keyword.TEMPORARY, Keyword.TABLESPACE) ||
          this.peekIf(Keyword.TEMPORARY, Keyword.TABLESPACE) ||
          this.peekIf(Keyword.UNDO, Keyword.TABLESPACE) ||
          this.peekIf(Keyword.TABLESPACE)
        ) {
          this.pos = mark
          stmt = this.createTablespaceStatement()
        } else if (this.peekIf(Keyword.TRIGGER)) {
          isBlock = true
          this.pos = mark
          stmt = this.createTriggerStatement()
        } else if (this.peekIf(Keyword.TYPE, Keyword.BODY)) {
          isBlock = true
          this.pos = mark
          stmt = this.createTypeBodyStatement()
        } else if (this.peekIf(Keyword.TYPE)) {
          isBlock = true
          this.pos = mark
          stmt = this.createTypeStatement()
        } else if (this.peekIf(Keyword.USER)) {
          this.pos = mark
          stmt = this.createUserStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createViewStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ALTER)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.SHARED)) {
          this.consume()
        }
        if (this.peekIf(Keyword.PUBLIC)) {
          this.consume()
        }

        if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.alterAnalyticViewStatement()
        } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.alterAttributeDimensionStatement()
        } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          this.pos = mark
          stmt = this.alterAuditPolicyStatement()
        } else if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.alterClusterStatement()
        } else if (this.peekIf(Keyword.DATABASE, Keyword.DICTIONARY)) {
          this.pos = mark
          stmt = this.alterDatabaseDictionaryStatement()
        } else if (this.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          this.pos = mark
          stmt = this.alterDatabaseLinkStatement()  
        } else if (this.peekIf(Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.alterDatabaseStatement()  
        } else if (this.peekIf(Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.alterDimensionStatement()
        } else if (this.peekIf(Keyword.DISKGROUP)) {
          this.pos = mark
          stmt = this.alterDiskgroupStatement()
        } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          this.pos = mark
          stmt = this.alterEditionStatement()
        } else if (this.peekIf(Keyword.FUNCTION)) {
          this.pos = mark
          stmt = this.alterFunctionStatement()
        } else if (this.peekIf(Keyword.HIERARCHY)) {
          this.pos = mark
          stmt = this.alterHierarchyStatement()
        } else if (this.peekIf(Keyword.INDEX)) {
          this.pos = mark
          stmt = this.alterIndexStatement()
        } else if (this.peekIf(Keyword.INDEXTYPE)) {
          this.pos = mark
          stmt = this.alterIndextypeStatement()
        } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          this.pos = mark
          stmt = this.alterInmemoryJoinGroupStatement()
        } else if (this.peekIf(Keyword.JAVA)) {
          this.pos = mark
          stmt = this.alterJavaStatement()
        } else if (this.peekIf(Keyword.LIBRARY)) {
          this.pos = mark
          stmt = this.alterLibraryStatement()
        } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.alterLockdownProfileStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          this.pos = mark
          stmt = this.alterMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          this.pos = mark
          stmt = this.alterMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.alterMaterializedViewStatement()
        } else if (this.peekIf(Keyword.OPERATOR)) {
          this.pos = mark
          stmt = this.alterOperatorStatement()
        } else if (this.peekIf(Keyword.OUTLINE)) {
          this.pos = mark
          stmt = this.alterOutlineStatement()
        } else if (this.peekIf(Keyword.PACKAGE)) {
          this.pos = mark
          stmt = this.alterPackageStatement()
        } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.alterPluggableDatabaseStatement()
        } else if (this.peekIf(Keyword.PROCEDURE)) {
          this.pos = mark
          stmt = this.alterProcedureStatement()
        } else if (this.peekIf(Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.alterProfileStatement()
        } else if (this.peekIf(Keyword.RESOURCE, Keyword.COST)) {
          this.pos = mark
          stmt = this.alterResourceCostStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.alterRoleStatement()
        } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          this.pos = mark
          stmt = this.alterRollbackSegmentStatement()
        } else if (this.peekIf(Keyword.SEQUENCE)) {
          this.pos = mark
          stmt = this.alterSequenceStatement()
        } else if (this.peekIf(Keyword.SESSION)) {
          this.pos = mark
          stmt = this.alterSessionStatement()
        } else if (this.peekIf(Keyword.SYNONYM)) {
          this.pos = mark
          stmt = this.alterSynonymStatement()
        } else if (this.peekIf(Keyword.SYSTEM)) {
          this.pos = mark
          stmt = this.alterSystemStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.alterTableStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.alterTablespaceSetStatement()
        } else if (this.peekIf(Keyword.TABLESPACE)) {
          this.pos = mark
          stmt = this.alterTablespaceStatement()  
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.alterTriggerStatement()
        } else if (this.peekIf(Keyword.TYPE, Keyword.BODY)) {
          this.pos = mark
          stmt = this.alterTypeBodyStatement()
        } else if (this.peekIf(Keyword.TYPE)) {
          this.pos = mark
          stmt = this.alterTypeStatement()
        } else if (this.peekIf(Keyword.USER)) {
          this.pos = mark
          stmt = this.alterUserStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.alterViewStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.DROP)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.PUBLIC)) {
          this.consume()
        }

        if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropAnalyticViewStatement()
        } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.dropAttributeDimensionStatement()
        } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          this.pos = mark
          stmt = this.dropAuditPolicyStatement()
        } else if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.dropClusterStatement()
        } else if (this.peekIf(Keyword.CONTEXT)) {
          this.pos = mark
          stmt = this.dropContextStatement()
        } else if (this.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          this.pos = mark
          stmt = this.dropDatabaseLinkStatement()  
        } else if (this.peekIf(Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.dropDatabaseStatement()  
        } else if (this.peekIf(Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.dropDimensionStatement()
        } else if (this.peekIf(Keyword.DIRECTORY)) {
          this.pos = mark
          stmt = this.dropDirectoryStatement()
        } else if (this.peekIf(Keyword.DISKGROUP)) {
          this.pos = mark
          stmt = this.dropDiskgroupStatement()
        } else if (this.peekIf(Keyword.EDITION)) {
          this.pos = mark
          stmt = this.dropEditionStatement()
        } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          this.pos = mark
          stmt = this.dropEditionStatement()
        } else if (this.peekIf(Keyword.FUNCTION)) {
          this.pos = mark
          stmt = this.dropFunctionStatement()
        } else if (this.peekIf(Keyword.HIERARCHY)) {
          this.pos = mark
          stmt = this.dropHierarchyStatement()
        } else if (this.peekIf(Keyword.INDEX)) {
          this.pos = mark
          stmt = this.dropIndexStatement()
        } else if (this.peekIf(Keyword.INDEXTYPE)) {
          this.pos = mark
          stmt = this.dropIndextypeStatement()
        } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          this.pos = mark
          stmt = this.dropInmemoryJoinGroupStatement()
        } else if (this.peekIf(Keyword.JAVA)) {
          this.pos = mark
          stmt = this.dropJavaStatement()
        } else if (this.peekIf(Keyword.LIBRARY)) {
          this.pos = mark
          stmt = this.dropLibraryStatement()
        } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.dropLockdownProfileStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          this.pos = mark
          stmt = this.dropMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          this.pos = mark
          stmt = this.dropMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropMaterializedViewStatement()
        } else if (this.peekIf(Keyword.OPERATOR)) {
          this.pos = mark
          stmt = this.dropOperatorStatement()
        } else if (this.peekIf(Keyword.OUTLINE)) {
          this.pos = mark
          stmt = this.dropOutlineStatement()
        } else if (this.peekIf(Keyword.PACKAGE)) {
          this.pos = mark
          stmt = this.dropPackageStatement()
        } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.dropPluggableDatabaseStatement()
        } else if (this.peekIf(Keyword.PROCEDURE)) {
          this.pos = mark
          stmt = this.dropProcedureStatement()
        } else if (this.peekIf(Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.dropProfileStatement()
        } else if (this.peekIf(Keyword.RESTORE, Keyword.POINT)) {
          this.pos = mark
          stmt = this.dropRestorePointStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.dropRoleStatement()
        } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          this.pos = mark
          stmt = this.dropRollbackSegmentStatement()
        } else if (this.peekIf(Keyword.SCHEMA)) {
          this.pos = mark
          stmt = this.dropSchemaStatement()
        } else if (this.peekIf(Keyword.SEQUENCE)) {
          this.pos = mark
          stmt = this.dropSequenceStatement()
        } else if (this.peekIf(Keyword.SYNONYM)) {
          this.pos = mark
          stmt = this.dropSynonymStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.dropTableStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.dropTablespaceSetStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.dropTablespaceStatement()  
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.dropTriggerStatement()
        } else if (this.peekIf(Keyword.TYPE, Keyword.BODY)) {
          this.pos = mark
          stmt = this.dropTypeBodyStatement()
        } else if (this.peekIf(Keyword.TYPE)) {
          this.pos = mark
          stmt = this.dropTypeStatement()
        } else if (this.peekIf(Keyword.USER)) {
          this.pos = mark
          stmt = this.dropUserStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropViewStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.TRUNCATE)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.truncateClusterStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.truncateTableStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.SET)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.CONSTRAINT) || this.peekIf(Keyword.CONSTRAINTS)) {
          this.pos = mark
          stmt = this.setConstraintStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.setRoleStatement()
        } else if (this.peekIf(Keyword.TRANSACTION)) {
          this.pos = mark
          stmt = this.setTransactionStatement()
        } else {
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
        let withNode
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

      if (explainPlan) {
        stmt = explainPlan.add(stmt)
      }

      if (this.peekIf(TokenType.SemiColon)) {
        stmt.add(this.consume())
      }
      if (this.peekIf(TokenType.Delimiter)) {
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
        while (this.token()
          && !(!isBlock && this.peekIf(TokenType.SemiColon))
          && !this.peekIf(TokenType.Delimiter)
        ) {
          stmt.add(this.consume())
        }
        err.node = stmt
      }      
      throw err
    }
  }

  private createAnalyticViewStatement() {
    const node = new Node("create analytic view")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ANALYTIC))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createAttributeDimensionStatement() {
    const node = new Node("create attribute dimension")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ATTRIBUTE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createAuditPolicyStatement() {
    const node = new Node("create audit policy")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.AUDIT))
    node.add(this.consume(Keyword.POLICY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createClusterStatement() {
    const node = new Node("create cluster")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createContextStatement() {
    const node = new Node("create context")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.CONTEXT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createControlfileStatement() {
    const node = new Node("create controlfile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.CONTROLFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDatabaseLinkStatement() {
    const node = new Node("create database link")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.LINK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDatabaseStatement() {
    const node = new Node("create database")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDimensionStatement() {
    const node = new Node("create dimension")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDirectoryStatement() {
    const node = new Node("create directory")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DIRECTORY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDiskgroupStatement() {
    const node = new Node("create diskgroup")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DISKGROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createEditionStatement() {
    const node = new Node("create edition")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.EDITION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createFunctionStatement() {
    const node = new Node("create function")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.FUNCTION))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createHierarchyStatement() {
    const node = new Node("create hierarchy")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.HIERARCHY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createIndexStatement() {
    const node = new Node("create index")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.INDEX))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createIndextypeStatement() {
    const node = new Node("create indextype")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.INDEXTYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createInmemoryJoinGroupStatement() {
    const node = new Node("create inmemory join group")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.INMEMORY))
    node.add(this.consume(Keyword.JOIN))
    node.add(this.consume(Keyword.GROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createJavaStatement() {
    const node = new Node("create java")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.JAVA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createLibraryStatement() {
    const node = new Node("create library")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.LIBRARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createLockdownProfileStatement() {
    const node = new Node("create lockdown profile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.LOCKDOWN))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createMaterializedViewLogStatement() {
    const node = new Node("create materialized view log")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))
    node.add(this.consume(Keyword.LOG))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createMaterializedViewStatement() {
    const node = new Node("create materialized view")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createOperatorStatement() {
    const node = new Node("create operator")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.OPERATOR))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createOutlineStatement() {
    const node = new Node("create outline")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.OUTLINE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPackageBodyStatement() {
    const node = new Node("create package body")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PACKAGE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPackageStatement() {
    const node = new Node("create package")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PACKAGE))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPfileStatement() {
    const node = new Node("create pfile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPluggableDatabaseStatement() {
    const node = new Node("create pluggable database")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PLUGGABLE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createProcedureStatement() {
    const node = new Node("create procedure")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PROCEDURE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createProfileStatement() {
    const node = new Node("create profile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createRestorePointStatement() {
    const node = new Node("create restore point")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.RESTORE))
    node.add(this.consume(Keyword.POINT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createRoleStatement() {
    const node = new Node("create role")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }
  
  private createRollbackSegmentStatement() {
    const node = new Node("create rollback segment")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ROLLBACK))
    node.add(this.consume(Keyword.SEGMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSchemaStatement() {
    const node = new Node("create schema")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SCHEMA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSequenceStatement() {
    const node = new Node("create sequence")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SEQUENCE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSpfileStatement() {
    const node = new Node("create spfile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SPFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSynonymStatement() {
    const node = new Node("create synonym")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SYNONYM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTableStatement() {
    const node = new Node("create table")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTablespaceSetStatement() {
    const node = new Node("create tablespace set")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TABLESPACE))
    node.add(this.consume(Keyword.SET))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTablespaceStatement() {
    const node = new Node("create tablespace")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TABLESPACE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTriggerStatement() {
    const node = new Node("create trigger")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TRIGGER))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTypeBodyStatement() {
    const node = new Node("create type body")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TYPE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTypeStatement() {
    const node = new Node("create type")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TYPE))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createUserStatement() {
    const node = new Node("create user")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.USER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createViewStatement() {
    const node = new Node("create view")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterAnalyticViewStatement() {
    const node = new Node("alter analytic view")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ANALYTIC))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterAttributeDimensionStatement() {
    const node = new Node("alter attribute dimension")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ATTRIBUTE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterAuditPolicyStatement() {
    const node = new Node("alter audit policy")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.AUDIT))
    node.add(this.consume(Keyword.POLICY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterClusterStatement() {
    const node = new Node("alter cluster")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDatabaseDictionaryStatement() {
    const node = new Node("alter database dictionary")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.DICTIONARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDatabaseLinkStatement() {
    const node = new Node("alter database link")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.LINK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDatabaseStatement() {
    const node = new Node("alter database")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDimensionStatement() {
    const node = new Node("alter dimension")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDiskgroupStatement() {
    const node = new Node("alter diskgroup")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DISKGROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterEditionStatement() {
    const node = new Node("alter edition")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.EDITION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterFunctionStatement() {
    const node = new Node("alter function")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.FUNCTION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterHierarchyStatement() {
    const node = new Node("alter hierarchy")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.HIERARCHY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterIndexStatement() {
    const node = new Node("alter index")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.INDEX))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterIndextypeStatement() {
    const node = new Node("alter indextype")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.INDEXTYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterInmemoryJoinGroupStatement() {
    const node = new Node("alter inmemory join group")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.INMEMORY))
    node.add(this.consume(Keyword.JOIN))
    node.add(this.consume(Keyword.GROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterJavaStatement() {
    const node = new Node("alter java")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.JAVA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterLibraryStatement() {
    const node = new Node("alter library")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.LIBRARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterLockdownProfileStatement() {
    const node = new Node("alter lockdown profile")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.LOCKDOWN))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterMaterializedViewLogStatement() {
    const node = new Node("alter materialized view log")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))
    node.add(this.consume(Keyword.LOG))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterMaterializedViewStatement() {
    const node = new Node("alter materialized view")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterOperatorStatement() {
    const node = new Node("alter operator")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.OPERATOR))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterOutlineStatement() {
    const node = new Node("alter outline")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.OUTLINE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterPackageStatement() {
    const node = new Node("alter package")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PACKAGE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterPluggableDatabaseStatement() {
    const node = new Node("alter pluggable database")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PLUGGABLE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterProcedureStatement() {
    const node = new Node("alter procedure")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PROCEDURE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterProfileStatement() {
    const node = new Node("alter profile")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterResourceCostStatement() {
    const node = new Node("alter resource cost")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.RESOURCE))
    node.add(this.consume(Keyword.COST))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterRoleStatement() {
    const node = new Node("alter role")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }
  
  private alterRollbackSegmentStatement() {
    const node = new Node("alter rollback segment")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ROLLBACK))
    node.add(this.consume(Keyword.SEGMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSequenceStatement() {
    const node = new Node("alter sequence")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SEQUENCE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSessionStatement() {
    const node = new Node("alter session")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SESSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSynonymStatement() {
    const node = new Node("alter synonym")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SYNONYM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSystemStatement() {
    const node = new Node("alter system")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SYSTEM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTableStatement() {
    const node = new Node("alter table")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTablespaceSetStatement() {
    const node = new Node("alter tablespace set")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLESPACE))
    node.add(this.consume(Keyword.SET))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTablespaceStatement() {
    const node = new Node("alter tablespace")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLESPACE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTriggerStatement() {
    const node = new Node("alter trigger")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TRIGGER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTypeBodyStatement() {
    const node = new Node("alter type body")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TYPE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTypeStatement() {
    const node = new Node("alter type")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterUserStatement() {
    const node = new Node("alter user")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.USER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterViewStatement() {
    const node = new Node("alter view")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropAnalyticViewStatement() {
    const node = new Node("drop analytic view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ANALYTIC))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropAttributeDimensionStatement() {
    const node = new Node("drop attribute dimension")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ATTRIBUTE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropAuditPolicyStatement() {
    const node = new Node("drop audit policy")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.AUDIT))
    node.add(this.consume(Keyword.POLICY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropClusterStatement() {
    const node = new Node("drop cluster")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropContextStatement() {
    const node = new Node("drop context")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.CONTEXT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDatabaseLinkStatement() {
    const node = new Node("drop database link")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.LINK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDatabaseStatement() {
    const node = new Node("drop database")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDimensionStatement() {
    const node = new Node("drop dimension")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDirectoryStatement() {
    const node = new Node("drop directory")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DIRECTORY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDiskgroupStatement() {
    const node = new Node("drop diskgroup")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DISKGROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropEditionStatement() {
    const node = new Node("drop edition")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.EDITION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropFunctionStatement() {
    const node = new Node("drop function")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.FUNCTION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropHierarchyStatement() {
    const node = new Node("drop hierarchy")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.HIERARCHY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropIndexStatement() {
    const node = new Node("drop index")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INDEX))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropIndextypeStatement() {
    const node = new Node("drop indextype")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INDEXTYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropInmemoryJoinGroupStatement() {
    const node = new Node("drop inmemory join group")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INMEMORY))
    node.add(this.consume(Keyword.JOIN))
    node.add(this.consume(Keyword.GROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropJavaStatement() {
    const node = new Node("drop java")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.JAVA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropLibraryStatement() {
    const node = new Node("drop library")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.LIBRARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropLockdownProfileStatement() {
    const node = new Node("drop lockdown profile")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.LOCKDOWN))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropMaterializedViewLogStatement() {
    const node = new Node("drop materialized view log")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))
    node.add(this.consume(Keyword.LOG))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropMaterializedViewStatement() {
    const node = new Node("drop materialized view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropOperatorStatement() {
    const node = new Node("drop operator")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.OPERATOR))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropOutlineStatement() {
    const node = new Node("drop outline")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.OUTLINE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropPackageStatement() {
    const node = new Node("drop package")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PACKAGE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropPluggableDatabaseStatement() {
    const node = new Node("drop pluggable database")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PLUGGABLE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropProcedureStatement() {
    const node = new Node("drop procedure")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PROCEDURE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropProfileStatement() {
    const node = new Node("drop profile")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropRestorePointStatement() {
    const node = new Node("drop restore point")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.RESTORE))
    node.add(this.consume(Keyword.POINT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropRoleStatement() {
    const node = new Node("drop role")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }
  
  private dropRollbackSegmentStatement() {
    const node = new Node("drop rollback segment")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ROLLBACK))
    node.add(this.consume(Keyword.SEGMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropSchemaStatement() {
    const node = new Node("drop schema")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.SCHEMA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropSequenceStatement() {
    const node = new Node("drop sequence")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.SEQUENCE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropSynonymStatement() {
    const node = new Node("drop synonym")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.SYNONYM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTableStatement() {
    const node = new Node("drop table")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTablespaceSetStatement() {
    const node = new Node("drop tablespace set")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLESPACE))
    node.add(this.consume(Keyword.SET))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTablespaceStatement() {
    const node = new Node("drop tablespace")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLESPACE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTriggerStatement() {
    const node = new Node("drop trigger")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TRIGGER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTypeBodyStatement() {
    const node = new Node("drop type body")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TYPE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTypeStatement() {
    const node = new Node("drop type")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropUserStatement() {
    const node = new Node("drop user")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.USER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropViewStatement() {
    const node = new Node("drop view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private truncateClusterStatement() {
    const node = new Node("truncate cluster")
    node.add(this.consume(Keyword.TRUNCATE))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private truncateTableStatement() {
    const node = new Node("truncate table")
    node.add(this.consume(Keyword.TRUNCATE))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private setConstraintStatement() {
    const node = new Node("set constraint")
    node.add(this.consume(Keyword.SET))

    if (this.peekIf(Keyword.CONSTRAINTS)) {
      node.add(this.consume())
    } else {
      node.add(this.consume(Keyword.CONSTRAINT))
    }

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }
    return node
  }

  private setRoleStatement() {
    const node = new Node("set role")
    node.add(this.consume(Keyword.SET))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private setTransactionStatement() {
    const node = new Node("set transaction")
    node.add(this.consume(Keyword.SET))
    node.add(this.consume(Keyword.TRANSACTION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private administerKeyManagementStatement() {
    const node = new Node("administer key management")
    node.add(this.consume(Keyword.ADMINISTER))
    node.add(this.consume(Keyword.KEY))
    node.add(this.consume(Keyword.MANAGEMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private analyzeStatement() {
    const node = new Node("analyze")
    node.add(this.consume(Keyword.ANALYZE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private associateStatisticsStatement() {
    const node = new Node("associate statistics")
    node.add(this.consume(Keyword.ASSOCIATE))
    node.add(this.consume(Keyword.STATISTICS))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private auditStatement() {
    const node = new Node("audit")
    node.add(this.consume(Keyword.AUDIT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private callStatement() {
    const node = new Node("call")
    node.add(this.consume(Keyword.CALL))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private commentStatement() {
    const node = new Node("comment")
    node.add(this.consume(Keyword.COMMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private commitStatement() {
    const node = new Node("commit")
    node.add(this.consume(Keyword.COMMIT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private disassociateStatisticsStatement() {
    const node = new Node("disassociate statistics")
    node.add(this.consume(Keyword.DISASSOCIATE))
    node.add(this.consume(Keyword.STATISTICS))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private flashbackDatabaseStatement() {
    const node = new Node("flashback database")
    node.add(this.consume(Keyword.FLASHBACK))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private flashbackTableStatement() {
    const node = new Node("flashback table")
    node.add(this.consume(Keyword.FLASHBACK))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private grantStatement() {
    const node = new Node("grant")
    node.add(this.consume(Keyword.GRANT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private lockTableStatement() {
    const node = new Node("lock table")
    node.add(this.consume(Keyword.LOCK))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private noauditStatement() {
    const node = new Node("noaudit")
    node.add(this.consume(Keyword.NOAUDIT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private purgeStatement() {
    const node = new Node("purge")
    node.add(this.consume(Keyword.PURGE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private renameStatement() {
    const node = new Node("rename")
    node.add(this.consume(Keyword.RENAME))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private revokeStatement() {
    const node = new Node("revoke")
    node.add(this.consume(Keyword.REVOKE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private rollbackStatement() {
    const node = new Node("rollback")
    node.add(this.consume(Keyword.ROLLBACK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private savepointStatement() {
    const node = new Node("savepoint")
    node.add(this.consume(Keyword.SAVEPOINT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private declareBlock() {
    const node = new Node("block")

    const declareNode = new Node("declare")
    declareNode.add(this.consume(Keyword.DECLARE))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
        if (this.peekIf(Keyword.EXCEPTION)) {
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
    node.add(this.consume(Keyword.BEGIN))

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else if (this.peekIf(Keyword.DECLARE)) {
        node.add(this.declareBlock())
      } else if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
      } else if (this.peekIf(Keyword.EXCEPTION)) {
        break
      } else {
        node.add(this.consume())
      }
    }

    return node
  }

  private procedureBlock() {
    const node = new Node("nested_procedure")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private functionBlock() {
    const node = new Node("nested_function")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private exceptionBlock() {
    const node = new Node("exception")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private insertClause(withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.INSERT))
    node.add(this.consume(Keyword.INTO))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
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
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
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
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private mergeClause(withNode?: Node) {
    const node = new Node("merge")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.MERGE))
    node.add(this.consume(Keyword.INTO))
    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private selectClause(withNode?: Node) {
    const node = new Node("select")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.SELECT))

    let depth = 0
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
      && (depth == 0 && !this.peekIf(TokenType.RightParen))
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
    if (this.peekIf(Operator.AT)) {
      stmt.add(this.consume())
      stmt.add(this.identifier("dblink"))
    }
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.peekIf(TokenType.QuotedIdentifier)) {
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
}
