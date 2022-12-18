import {
  TokenType,
  Token,
  Keyword,
  Operator,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
  TokenReader,
} from "../parser"
import { dequote } from "../util"
import { OracleLexer, LookAheadSet } from "./oracle_lexer"

export class OracleParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new OracleLexer(options).lex(input)
    return new OracleParser(options).parse(tokens)
  }

  constructor(
    options: Record<string, any> = {},
  ) {
    super(options)
  }

  parse(tokens: Token[]): Node {
    const r = new TokenReader(tokens)
    const root = new Node("root")
    const errors = []

    while (r.token()) {
      try {
        if (r.peekIf(TokenType.Eof)) {
          root.add(r.consume())
          break
        } else if (r.peekIf(TokenType.Delimiter) || r.peekIf(TokenType.SemiColon)) {
          root.add(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          root.add(this.command(r))
        } else {
          root.add(this.statement(r))
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

    if (r.token()) {
      for (let i = r.pos; i < r.tokens.length; i++) {
        root.add(r.tokens[i])
      }

      try {
        throw r.createParseError()
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

  private command(r: TokenReader) {
    const stmt = new Node("command")

    if (r.peekIf(TokenType.Delimiter)) {
      stmt.add(r.consume())
    }
    if (r.peekIf(TokenType.Eof)) {
      stmt.add(r.consume())
    }
    return stmt
  }

  private statement(r: TokenReader) {
    let explainPlan
    let stmt

    try {
      if (r.peekIf(Keyword.EXPLAIN)) {
        explainPlan = new Node("explain plan")
        explainPlan.add(r.consume())
        explainPlan.add(r.consume(Keyword.PLAN))

        if (r.peekIf(Keyword.SET)) {
          const childNode = new Node("statement_id")
          childNode.add(r.consume())
          childNode.add(r.consume(Keyword.STATEMENT_ID))
          childNode.add(r.consume(Operator.EQ))
          childNode.add(r.consume(TokenType.String))
          childNode.value = dequote(r.token(-1).text)
          explainPlan.add(childNode)
        }

        if (r.peekIf(Keyword.INTO)) {
          explainPlan.add(r.consume())
        }

        this.parseName(r, explainPlan)

        explainPlan.add(r.consume(Keyword.FOR))
      }

      if (r.peekIf(Keyword.CREATE)) {
        const mark = r.pos
        r.consume()

        while (r.token()
          && !r.peekIf(TokenType.Delimiter)
          && r.peekIf(TokenType.Identifier)
        ) {
          const token = r.token()
          if (LookAheadSet.has(token.type) || token.subtype && LookAheadSet.has(token.subtype)) {
            break
          } else {
            r.consume()
          }
        }

        if (r.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          r.pos = mark
          stmt = this.createAnalyticViewStatement(r)
        } else if (r.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          r.pos = mark
          stmt = this.createAttributeDimensionStatement(r)
        } else if (r.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          r.pos = mark
          stmt = this.createAuditPolicyStatement(r)
        } else if (r.peekIf(Keyword.CLUSTER)) {
          r.pos = mark
          stmt = this.createClusterStatement(r)
        } else if (r.peekIf(Keyword.CONTEXT)) {
          r.pos = mark
          stmt = this.createContextStatement(r)
        } else if (r.peekIf(Keyword.CONTROLFILE)) {
          r.pos = mark
          stmt = this.createControlfileStatement(r)
        } else if (r.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          r.pos = mark
          stmt = this.createDatabaseLinkStatement(r)
        } else if (r.peekIf(Keyword.DATABASE)) {
          r.pos = mark
          stmt = this.createDatabaseStatement(r)
        } else if (r.peekIf(Keyword.DIMENSION)) {
          r.pos = mark
          stmt = this.createDimensionStatement(r)
        } else if (r.peekIf(Keyword.DIRECTORY)) {
          r.pos = mark
          stmt = this.createDirectoryStatement(r)
        } else if (r.peekIf(Keyword.DISKGROUP)) {
          r.pos = mark
          stmt = this.createDiskgroupStatement(r)
        } else if (r.peekIf(Keyword.EDITION)) {
          r.pos = mark
          stmt = this.createEditionStatement(r)
        } else if (r.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          r.pos = mark
          stmt = this.createEditionStatement(r)
        } else if (r.peekIf(Keyword.FUNCTION)) {
          r.pos = mark
          stmt = this.createFunctionStatement(r)
        } else if (r.peekIf(Keyword.HIERARCHY)) {
          r.pos = mark
          stmt = this.createHierarchyStatement(r)
        } else if (r.peekIf(Keyword.INDEX)) {
          r.pos = mark
          stmt = this.createIndexStatement(r)
        } else if (r.peekIf(Keyword.INDEXTYPE)) {
          r.pos = mark
          stmt = this.createIndextypeStatement(r)
        } else if (r.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          r.pos = mark
          stmt = this.createInmemoryJoinGroupStatement(r)
        } else if (r.peekIf(Keyword.JAVA)) {
          r.pos = mark
          stmt = this.createJavaStatement(r)
        } else if (r.peekIf(Keyword.LIBRARY)) {
          r.pos = mark
          stmt = this.createLibraryStatement(r)
        } else if (r.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          r.pos = mark
          stmt = this.createLockdownProfileStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          r.pos = mark
          stmt = this.createMaterializedViewLogStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          r.pos = mark
          stmt = this.createMaterializedViewLogStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          r.pos = mark
          stmt = this.createMaterializedViewStatement(r)
        } else if (r.peekIf(Keyword.OPERATOR)) {
          r.pos = mark
          stmt = this.createOperatorStatement(r)
        } else if (r.peekIf(Keyword.OUTLINE)) {
          r.pos = mark
          stmt = this.createOutlineStatement(r)
        } else if (r.peekIf(Keyword.PACKAGE, Keyword.BODY)) {
          r.pos = mark
          stmt = this.createPackageBodyStatement(r)
        } else if (r.peekIf(Keyword.PACKAGE)) {
          r.pos = mark
          stmt = this.createPackageStatement(r)
        } else if (r.peekIf(Keyword.PFILE)) {
          r.pos = mark
          stmt = this.createPfileStatement(r)
        } else if (r.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          r.pos = mark
          stmt = this.createPluggableDatabaseStatement(r)
        } else if (r.peekIf(Keyword.PROCEDURE)) {
          r.pos = mark
          stmt = this.createProcedureStatement(r)
        } else if (r.peekIf(Keyword.PROFILE)) {
          r.pos = mark
          stmt = this.createProfileStatement(r)
        } else if (r.peekIf(Keyword.RESTORE, Keyword.POINT)) {
          r.pos = mark
          stmt = this.createRestorePointStatement(r)
        } else if (r.peekIf(Keyword.ROLE)) {
          r.pos = mark
          stmt = this.createRoleStatement(r)
        } else if (r.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          r.pos = mark
          stmt = this.createRollbackSegmentStatement(r)
        } else if (r.peekIf(Keyword.SCHEMA)) {
          r.pos = mark
          stmt = this.createSchemaStatement(r)
        } else if (r.peekIf(Keyword.SEQUENCE)) {
          r.pos = mark
          stmt = this.createSequenceStatement(r)
        } else if (r.peekIf(Keyword.SPFILE)) {
          r.pos = mark
          stmt = this.createSpfileStatement(r)
        } else if (r.peekIf(Keyword.SYNONYM)) {
          r.pos = mark
          stmt = this.createSynonymStatement(r)
        } else if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.createTableStatement(r)
        } else if (r.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          r.pos = mark
          stmt = this.createTablespaceSetStatement(r)
        } else if (r.peekIf(Keyword.TABLESPACE)) {
          r.pos = mark
          stmt = this.createTablespaceStatement(r)
        } else if (r.peekIf(Keyword.TRIGGER)) {
          r.pos = mark
          stmt = this.createTriggerStatement(r)
        } else if (r.peekIf(Keyword.TYPE, Keyword.BODY)) {
          r.pos = mark
          stmt = this.createTypeBodyStatement(r)
        } else if (r.peekIf(Keyword.TYPE)) {
          r.pos = mark
          stmt = this.createTypeStatement(r)
        } else if (r.peekIf(Keyword.USER)) {
          r.pos = mark
          stmt = this.createUserStatement(r)
        } else if (r.peekIf(Keyword.VIEW)) {
          r.pos = mark
          stmt = this.createViewStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.ALTER)) {
        const mark = r.pos
        r.consume()

        while (r.token()
          && !r.peekIf(TokenType.Delimiter)
          && r.peekIf(TokenType.Identifier)
        ) {
          const token = r.token()
          if (LookAheadSet.has(token.type) || token.subtype && LookAheadSet.has(token.subtype)) {
            break
          } else {
            r.consume()
          }
        }

        if (r.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          r.pos = mark
          stmt = this.alterAnalyticViewStatement(r)
        } else if (r.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          r.pos = mark
          stmt = this.alterAttributeDimensionStatement(r)
        } else if (r.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          r.pos = mark
          stmt = this.alterAuditPolicyStatement(r)
        } else if (r.peekIf(Keyword.CLUSTER)) {
          r.pos = mark
          stmt = this.alterClusterStatement(r)
        } else if (r.peekIf(Keyword.DATABASE, Keyword.DICTIONARY)) {
          r.pos = mark
          stmt = this.alterDatabaseDictionaryStatement(r)
        } else if (r.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          r.pos = mark
          stmt = this.alterDatabaseLinkStatement(r)  
        } else if (r.peekIf(Keyword.DATABASE)) {
          r.pos = mark
          stmt = this.alterDatabaseStatement(r)  
        } else if (r.peekIf(Keyword.DIMENSION)) {
          r.pos = mark
          stmt = this.alterDimensionStatement(r)
        } else if (r.peekIf(Keyword.DISKGROUP)) {
          r.pos = mark
          stmt = this.alterDiskgroupStatement(r)
        } else if (r.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          r.pos = mark
          stmt = this.alterEditionStatement(r)
        } else if (r.peekIf(Keyword.FUNCTION)) {
          r.pos = mark
          stmt = this.alterFunctionStatement(r)
        } else if (r.peekIf(Keyword.HIERARCHY)) {
          r.pos = mark
          stmt = this.alterHierarchyStatement(r)
        } else if (r.peekIf(Keyword.INDEX)) {
          r.pos = mark
          stmt = this.alterIndexStatement(r)
        } else if (r.peekIf(Keyword.INDEXTYPE)) {
          r.pos = mark
          stmt = this.alterIndextypeStatement(r)
        } else if (r.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          r.pos = mark
          stmt = this.alterInmemoryJoinGroupStatement(r)
        } else if (r.peekIf(Keyword.JAVA)) {
          r.pos = mark
          stmt = this.alterJavaStatement(r)
        } else if (r.peekIf(Keyword.LIBRARY)) {
          r.pos = mark
          stmt = this.alterLibraryStatement(r)
        } else if (r.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          r.pos = mark
          stmt = this.alterLockdownProfileStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          r.pos = mark
          stmt = this.alterMaterializedViewLogStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          r.pos = mark
          stmt = this.alterMaterializedViewLogStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          r.pos = mark
          stmt = this.alterMaterializedViewStatement(r)
        } else if (r.peekIf(Keyword.OPERATOR)) {
          r.pos = mark
          stmt = this.alterOperatorStatement(r)
        } else if (r.peekIf(Keyword.OUTLINE)) {
          r.pos = mark
          stmt = this.alterOutlineStatement(r)
        } else if (r.peekIf(Keyword.PACKAGE)) {
          r.pos = mark
          stmt = this.alterPackageStatement(r)
        } else if (r.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          r.pos = mark
          stmt = this.alterPluggableDatabaseStatement(r)
        } else if (r.peekIf(Keyword.PROCEDURE)) {
          r.pos = mark
          stmt = this.alterProcedureStatement(r)
        } else if (r.peekIf(Keyword.PROFILE)) {
          r.pos = mark
          stmt = this.alterProfileStatement(r)
        } else if (r.peekIf(Keyword.RESOURCE, Keyword.COST)) {
          r.pos = mark
          stmt = this.alterResourceCostStatement(r)
        } else if (r.peekIf(Keyword.ROLE)) {
          r.pos = mark
          stmt = this.alterRoleStatement(r)
        } else if (r.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          r.pos = mark
          stmt = this.alterRollbackSegmentStatement(r)
        } else if (r.peekIf(Keyword.SEQUENCE)) {
          r.pos = mark
          stmt = this.alterSequenceStatement(r)
        } else if (r.peekIf(Keyword.SESSION)) {
          r.pos = mark
          stmt = this.alterSessionStatement(r)
        } else if (r.peekIf(Keyword.SYNONYM)) {
          r.pos = mark
          stmt = this.alterSynonymStatement(r)
        } else if (r.peekIf(Keyword.SYSTEM)) {
          r.pos = mark
          stmt = this.alterSystemStatement(r)
        } else if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.alterTableStatement(r)
        } else if (r.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          r.pos = mark
          stmt = this.alterTablespaceSetStatement(r)
        } else if (r.peekIf(Keyword.TABLESPACE)) {
          r.pos = mark
          stmt = this.alterTablespaceStatement(r)  
        } else if (r.peekIf(Keyword.TRIGGER)) {
          r.pos = mark
          stmt = this.alterTriggerStatement(r)
        } else if (r.peekIf(Keyword.TYPE, Keyword.BODY)) {
          r.pos = mark
          stmt = this.alterTypeBodyStatement(r)
        } else if (r.peekIf(Keyword.TYPE)) {
          r.pos = mark
          stmt = this.alterTypeStatement(r)
        } else if (r.peekIf(Keyword.USER)) {
          r.pos = mark
          stmt = this.alterUserStatement(r)
        } else if (r.peekIf(Keyword.VIEW)) {
          r.pos = mark
          stmt = this.alterViewStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.DROP)) {
        const mark = r.pos
        r.consume()

        while (r.token()
          && !r.peekIf(TokenType.Delimiter)
          && r.peekIf(TokenType.Identifier)
        ) {
          const token = r.token()
          if (LookAheadSet.has(token.type) || token.subtype && LookAheadSet.has(token.subtype)) {
            break
          } else {
            r.consume()
          }
        }

        if (r.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          r.pos = mark
          stmt = this.dropAnalyticViewStatement(r)
        } else if (r.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          r.pos = mark
          stmt = this.dropAttributeDimensionStatement(r)
        } else if (r.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          r.pos = mark
          stmt = this.dropAuditPolicyStatement(r)
        } else if (r.peekIf(Keyword.CLUSTER)) {
          r.pos = mark
          stmt = this.dropClusterStatement(r)
        } else if (r.peekIf(Keyword.CONTEXT)) {
          r.pos = mark
          stmt = this.dropContextStatement(r)
        } else if (r.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          r.pos = mark
          stmt = this.dropDatabaseLinkStatement(r)  
        } else if (r.peekIf(Keyword.DATABASE)) {
          r.pos = mark
          stmt = this.dropDatabaseStatement(r)  
        } else if (r.peekIf(Keyword.DIMENSION)) {
          r.pos = mark
          stmt = this.dropDimensionStatement(r)
        } else if (r.peekIf(Keyword.DIRECTORY)) {
          r.pos = mark
          stmt = this.dropDirectoryStatement(r)
        } else if (r.peekIf(Keyword.DISKGROUP)) {
          r.pos = mark
          stmt = this.dropDiskgroupStatement(r)
        } else if (r.peekIf(Keyword.EDITION)) {
          r.pos = mark
          stmt = this.dropEditionStatement(r)
        } else if (r.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          r.pos = mark
          stmt = this.dropEditionStatement(r)
        } else if (r.peekIf(Keyword.FUNCTION)) {
          r.pos = mark
          stmt = this.dropFunctionStatement(r)
        } else if (r.peekIf(Keyword.HIERARCHY)) {
          r.pos = mark
          stmt = this.dropHierarchyStatement(r)
        } else if (r.peekIf(Keyword.INDEX)) {
          r.pos = mark
          stmt = this.dropIndexStatement(r)
        } else if (r.peekIf(Keyword.INDEXTYPE)) {
          r.pos = mark
          stmt = this.dropIndextypeStatement(r)
        } else if (r.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          r.pos = mark
          stmt = this.dropInmemoryJoinGroupStatement(r)
        } else if (r.peekIf(Keyword.JAVA)) {
          r.pos = mark
          stmt = this.dropJavaStatement(r)
        } else if (r.peekIf(Keyword.LIBRARY)) {
          r.pos = mark
          stmt = this.dropLibraryStatement(r)
        } else if (r.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          r.pos = mark
          stmt = this.dropLockdownProfileStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          r.pos = mark
          stmt = this.dropMaterializedViewLogStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          r.pos = mark
          stmt = this.dropMaterializedViewLogStatement(r)
        } else if (r.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          r.pos = mark
          stmt = this.dropMaterializedViewStatement(r)
        } else if (r.peekIf(Keyword.OPERATOR)) {
          r.pos = mark
          stmt = this.dropOperatorStatement(r)
        } else if (r.peekIf(Keyword.OUTLINE)) {
          r.pos = mark
          stmt = this.dropOutlineStatement(r)
        } else if (r.peekIf(Keyword.PACKAGE)) {
          r.pos = mark
          stmt = this.dropPackageStatement(r)
        } else if (r.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          r.pos = mark
          stmt = this.dropPluggableDatabaseStatement(r)
        } else if (r.peekIf(Keyword.PROCEDURE)) {
          r.pos = mark
          stmt = this.dropProcedureStatement(r)
        } else if (r.peekIf(Keyword.PROFILE)) {
          r.pos = mark
          stmt = this.dropProfileStatement(r)
        } else if (r.peekIf(Keyword.RESTORE, Keyword.POINT)) {
          r.pos = mark
          stmt = this.dropRestorePointStatement(r)
        } else if (r.peekIf(Keyword.ROLE)) {
          r.pos = mark
          stmt = this.dropRoleStatement(r)
        } else if (r.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          r.pos = mark
          stmt = this.dropRollbackSegmentStatement(r)
        } else if (r.peekIf(Keyword.SCHEMA)) {
          r.pos = mark
          stmt = this.dropSchemaStatement(r)
        } else if (r.peekIf(Keyword.SEQUENCE)) {
          r.pos = mark
          stmt = this.dropSequenceStatement(r)
        } else if (r.peekIf(Keyword.SYNONYM)) {
          r.pos = mark
          stmt = this.dropSynonymStatement(r)
        } else if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.dropTableStatement(r)
        } else if (r.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          r.pos = mark
          stmt = this.dropTablespaceSetStatement(r)
        } else if (r.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          r.pos = mark
          stmt = this.dropTablespaceStatement(r)  
        } else if (r.peekIf(Keyword.TRIGGER)) {
          r.pos = mark
          stmt = this.dropTriggerStatement(r)
        } else if (r.peekIf(Keyword.TYPE, Keyword.BODY)) {
          r.pos = mark
          stmt = this.dropTypeBodyStatement(r)
        } else if (r.peekIf(Keyword.TYPE)) {
          r.pos = mark
          stmt = this.dropTypeStatement(r)
        } else if (r.peekIf(Keyword.USER)) {
          r.pos = mark
          stmt = this.dropUserStatement(r)
        } else if (r.peekIf(Keyword.VIEW)) {
          r.pos = mark
          stmt = this.dropViewStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.TRUNCATE)) {
        const mark = r.pos
        r.consume()

        if (r.peekIf(Keyword.CLUSTER)) {
          r.pos = mark
          stmt = this.truncateClusterStatement(r)
        } else if (r.peekIf(Keyword.TABLE)) {
          r.pos = mark
          stmt = this.truncateTableStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.SET)) {
        const mark = r.pos
        r.consume()

        if (r.peekIf(Keyword.CONSTRAINT) || r.peekIf(Keyword.CONSTRAINTS)) {
          r.pos = mark
          stmt = this.setConstraintStatement(r)
        } else if (r.peekIf(Keyword.ROLE)) {
          r.pos = mark
          stmt = this.setRoleStatement(r)
        } else if (r.peekIf(Keyword.TRANSACTION)) {
          r.pos = mark
          stmt = this.setTransactionStatement(r)
        } else {
          r.pos = mark
        }
      } else if (r.peekIf(Keyword.ADMINISTER, Keyword.KEY, Keyword.MANAGEMENT)) {
        stmt = this.administerKeyManagementStatement(r)
      } else if (r.peekIf(Keyword.ANALYZE)) {
        stmt = this.analyzeStatement(r)
      } else if (r.peekIf(Keyword.ASSOCIATE, Keyword.STATISTICS)) {
        stmt = this.associateStatisticsStatement(r)
      } else if (r.peekIf(Keyword.AUDIT)) {
        stmt = this.auditStatement(r)
      } else if (r.peekIf(Keyword.CALL)) {
        stmt = this.callStatement(r)
      } else if (r.peekIf(Keyword.COMMENT)) {
        stmt = this.commentStatement(r)
      } else if (r.peekIf(Keyword.COMMIT)) {
        stmt = this.commitStatement(r)
      } else if (r.peekIf(Keyword.DISASSOCIATE, Keyword.STATISTICS)) {
        stmt = this.disassociateStatisticsStatement(r)
      } else if (r.peekIf(Keyword.FLASHBACK, Keyword.DATABASE)) {
        stmt = this.flashbackDatabaseStatement(r)
      } else if (r.peekIf(Keyword.FLASHBACK, Keyword.TABLE)) {
        stmt = this.flashbackTableStatement(r)
      } else if (r.peekIf(Keyword.GRANT)) {
        stmt = this.grantStatement(r)
      } else if (r.peekIf(Keyword.LOCK, Keyword.TABLE)) {
        stmt = this.lockTableStatement(r)
      } else if (r.peekIf(Keyword.NOAUDIT)) {
        stmt = this.noauditStatement(r)
      } else if (r.peekIf(Keyword.PURGE)) {
        stmt = this.purgeStatement(r)
      } else if (r.peekIf(Keyword.RENAME)) {
        stmt = this.renameStatement(r)
      } else if (r.peekIf(Keyword.REVOKE)) {
        stmt = this.revokeStatement(r)
      } else if (r.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackStatement(r)
      } else if (r.peekIf(Keyword.SAVEPOINT)) {
        stmt = this.savepointStatement(r)
      } else if (r.peekIf(Keyword.DECLARE)) {
        stmt = this.declareBlock(r)
      } else if (r.peekIf(Keyword.BEGIN)) {
        stmt = this.beginBlock(r)
      } else {
        let withNode
        if (r.peekIf(Keyword.WITH)) {
          withNode = this.withClause(r)
        }
        if (r.peekIf(Keyword.INSERT)) {
          stmt = this.insertClause(r, withNode)
        } else if (r.peekIf(Keyword.UPDATE)) {
          stmt = this.updateClause(r, withNode)
        } else if (r.peekIf(Keyword.DELETE)) {
          stmt = this.deleteClause(r, withNode)
        } else if (r.peekIf(Keyword.MERGE)) {
          stmt = this.mergeClause(r, withNode)
        } else if (r.peekIf(Keyword.SELECT)) {
          stmt = this.selectClause(r, withNode)
        }
      }

      if (!stmt) {
        throw r.createParseError()
      }

      if (explainPlan) {
        stmt = explainPlan.add(stmt)
      }

      if (r.peekIf(TokenType.Delimiter)) {
        stmt.add(r.consume())
      }
      if (r.peekIf(TokenType.Eof)) {
        stmt.add(r.consume())
      }
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (r.token() && !r.peekIf(TokenType.Delimiter)) {
          stmt.add(r.consume())
        }
        if (r.peekIf(TokenType.Delimiter)) {
          stmt.add(r.consume())
        }
        if (r.peekIf(TokenType.Eof)) {
          stmt.add(r.consume())
        }
        err.node = stmt
      }      
      throw err
    }
  }

  private createAnalyticViewStatement(r: TokenReader) {
    const node = new Node("create analytic view")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.ANALYTIC))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createAttributeDimensionStatement(r: TokenReader) {
    const node = new Node("create attribute dimension")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.ATTRIBUTE))
    node.add(r.consume(Keyword.DIMENSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createAuditPolicyStatement(r: TokenReader) {
    const node = new Node("create audit policy")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.AUDIT))
    node.add(r.consume(Keyword.POLICY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createClusterStatement(r: TokenReader) {
    const node = new Node("create cluster")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.CLUSTER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createContextStatement(r: TokenReader) {
    const node = new Node("create context")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.CONTEXT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createControlfileStatement(r: TokenReader) {
    const node = new Node("create controlfile")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.CONTROLFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createDatabaseLinkStatement(r: TokenReader) {
    const node = new Node("create database link")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.DATABASE))
    node.add(r.consume(Keyword.LINK))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createDatabaseStatement(r: TokenReader) {
    const node = new Node("create database")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createDimensionStatement(r: TokenReader) {
    const node = new Node("create dimension")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.DIMENSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createDirectoryStatement(r: TokenReader) {
    const node = new Node("create directory")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.DIRECTORY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createDiskgroupStatement(r: TokenReader) {
    const node = new Node("create diskgroup")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.DISKGROUP))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createEditionStatement(r: TokenReader) {
    const node = new Node("create edition")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.EDITION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createFunctionStatement(r: TokenReader) {
    const node = new Node("create function")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.FUNCTION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createHierarchyStatement(r: TokenReader) {
    const node = new Node("create hierarchy")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.HIERARCHY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createIndexStatement(r: TokenReader) {
    const node = new Node("create index")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.INDEX))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createIndextypeStatement(r: TokenReader) {
    const node = new Node("create indextype")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.INDEXTYPE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createInmemoryJoinGroupStatement(r: TokenReader) {
    const node = new Node("create inmemory join group")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.INMEMORY))
    node.add(r.consume(Keyword.JOIN))
    node.add(r.consume(Keyword.GROUP))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createJavaStatement(r: TokenReader) {
    const node = new Node("create java")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.JAVA))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createLibraryStatement(r: TokenReader) {
    const node = new Node("create library")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.LIBRARY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createLockdownProfileStatement(r: TokenReader) {
    const node = new Node("create lockdown profile")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.LOCKDOWN))
    node.add(r.consume(Keyword.PROFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createMaterializedViewLogStatement(r: TokenReader) {
    const node = new Node("create materialized view log")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.MATERIALIZED))
    node.add(r.consume(Keyword.VIEW))
    node.add(r.consume(Keyword.LOG))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createMaterializedViewStatement(r: TokenReader) {
    const node = new Node("create materialized view")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.MATERIALIZED))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createOperatorStatement(r: TokenReader) {
    const node = new Node("create operator")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.OPERATOR))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createOutlineStatement(r: TokenReader) {
    const node = new Node("create outline")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.OUTLINE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createPackageBodyStatement(r: TokenReader) {
    const node = new Node("create package body")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.PACKAGE))
    node.add(r.consume(Keyword.BODY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createPackageStatement(r: TokenReader) {
    const node = new Node("create package")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.PACKAGE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createPfileStatement(r: TokenReader) {
    const node = new Node("create pfile")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.PFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createPluggableDatabaseStatement(r: TokenReader) {
    const node = new Node("create pluggable database")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.PLUGGABLE))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createProcedureStatement(r: TokenReader) {
    const node = new Node("create procedure")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.PROCEDURE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createProfileStatement(r: TokenReader) {
    const node = new Node("create profile")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.PROFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createRestorePointStatement(r: TokenReader) {
    const node = new Node("create restore point")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.RESTORE))
    node.add(r.consume(Keyword.POINT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createRoleStatement(r: TokenReader) {
    const node = new Node("create role")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.ROLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }
  
  private createRollbackSegmentStatement(r: TokenReader) {
    const node = new Node("create rollback segment")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.ROLLBACK))
    node.add(r.consume(Keyword.SEGMENT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createSchemaStatement(r: TokenReader) {
    const node = new Node("create schema")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.SCHEMA))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createSequenceStatement(r: TokenReader) {
    const node = new Node("create sequence")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.SEQUENCE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createSpfileStatement(r: TokenReader) {
    const node = new Node("create spfile")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.SPFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createSynonymStatement(r: TokenReader) {
    const node = new Node("create synonym")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.SYNONYM))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createTableStatement(r: TokenReader) {
    const node = new Node("create table")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.TABLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createTablespaceSetStatement(r: TokenReader) {
    const node = new Node("create tablespace set")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.TABLESPACE))
    node.add(r.consume(Keyword.SET))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createTablespaceStatement(r: TokenReader) {
    const node = new Node("create tablespace")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.TABLESPACE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createTriggerStatement(r: TokenReader) {
    const node = new Node("create trigger")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.TRIGGER))

    while (r.token()
      && !r.peekIf(TokenType.Delimiter)
    ) {
      node.add(r.consume())
    }

    return node
  }

  private createTypeBodyStatement(r: TokenReader) {
    const node = new Node("create type body")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.TYPE))
    node.add(r.consume(Keyword.BODY))

    while (r.token()
      && !r.peekIf(TokenType.Delimiter)
    ) {
      node.add(r.consume())
    }

    return node
  }

  private createTypeStatement(r: TokenReader) {
    const node = new Node("create type")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.TYPE))

    while (r.token()
      && !r.peekIf(TokenType.Delimiter)
    ) {
      node.add(r.consume())
    }

    return node
  }

  private createUserStatement(r: TokenReader) {
    const node = new Node("create user")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.USER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private createViewStatement(r: TokenReader) {
    const node = new Node("create view")
    node.add(r.consume(Keyword.CREATE))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterAnalyticViewStatement(r: TokenReader) {
    const node = new Node("alter analytic view")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.ANALYTIC))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterAttributeDimensionStatement(r: TokenReader) {
    const node = new Node("alter attribute dimension")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.ATTRIBUTE))
    node.add(r.consume(Keyword.DIMENSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterAuditPolicyStatement(r: TokenReader) {
    const node = new Node("alter audit policy")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.AUDIT))
    node.add(r.consume(Keyword.POLICY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterClusterStatement(r: TokenReader) {
    const node = new Node("alter cluster")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.CLUSTER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterDatabaseDictionaryStatement(r: TokenReader) {
    const node = new Node("alter database dictionary")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.DATABASE))
    node.add(r.consume(Keyword.DICTIONARY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterDatabaseLinkStatement(r: TokenReader) {
    const node = new Node("alter database link")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.DATABASE))
    node.add(r.consume(Keyword.LINK))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterDatabaseStatement(r: TokenReader) {
    const node = new Node("alter database")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterDimensionStatement(r: TokenReader) {
    const node = new Node("alter dimension")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.DIMENSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterDiskgroupStatement(r: TokenReader) {
    const node = new Node("alter diskgroup")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.DISKGROUP))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterEditionStatement(r: TokenReader) {
    const node = new Node("alter edition")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.EDITION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterFunctionStatement(r: TokenReader) {
    const node = new Node("alter function")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.FUNCTION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterHierarchyStatement(r: TokenReader) {
    const node = new Node("alter hierarchy")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.HIERARCHY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterIndexStatement(r: TokenReader) {
    const node = new Node("alter index")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.INDEX))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterIndextypeStatement(r: TokenReader) {
    const node = new Node("alter indextype")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.INDEXTYPE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterInmemoryJoinGroupStatement(r: TokenReader) {
    const node = new Node("alter inmemory join group")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.INMEMORY))
    node.add(r.consume(Keyword.JOIN))
    node.add(r.consume(Keyword.GROUP))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterJavaStatement(r: TokenReader) {
    const node = new Node("alter java")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.JAVA))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterLibraryStatement(r: TokenReader) {
    const node = new Node("alter library")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.LIBRARY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterLockdownProfileStatement(r: TokenReader) {
    const node = new Node("alter lockdown profile")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.LOCKDOWN))
    node.add(r.consume(Keyword.PROFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterMaterializedViewLogStatement(r: TokenReader) {
    const node = new Node("alter materialized view log")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.MATERIALIZED))
    node.add(r.consume(Keyword.VIEW))
    node.add(r.consume(Keyword.LOG))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterMaterializedViewStatement(r: TokenReader) {
    const node = new Node("alter materialized view")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.MATERIALIZED))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterOperatorStatement(r: TokenReader) {
    const node = new Node("alter operator")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.OPERATOR))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterOutlineStatement(r: TokenReader) {
    const node = new Node("alter outline")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.OUTLINE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterPackageStatement(r: TokenReader) {
    const node = new Node("alter package")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.PACKAGE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterPluggableDatabaseStatement(r: TokenReader) {
    const node = new Node("alter pluggable database")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.PLUGGABLE))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterProcedureStatement(r: TokenReader) {
    const node = new Node("alter procedure")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.PROCEDURE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterProfileStatement(r: TokenReader) {
    const node = new Node("alter profile")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.PROFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterResourceCostStatement(r: TokenReader) {
    const node = new Node("alter resource cost")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.RESOURCE))
    node.add(r.consume(Keyword.COST))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterRoleStatement(r: TokenReader) {
    const node = new Node("alter role")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.ROLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }
  
  private alterRollbackSegmentStatement(r: TokenReader) {
    const node = new Node("alter rollback segment")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.ROLLBACK))
    node.add(r.consume(Keyword.SEGMENT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterSequenceStatement(r: TokenReader) {
    const node = new Node("alter sequence")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.SEQUENCE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterSessionStatement(r: TokenReader) {
    const node = new Node("alter session")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.SESSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterSynonymStatement(r: TokenReader) {
    const node = new Node("alter synonym")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.SYNONYM))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterSystemStatement(r: TokenReader) {
    const node = new Node("alter system")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.SYSTEM))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterTableStatement(r: TokenReader) {
    const node = new Node("alter table")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TABLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterTablespaceSetStatement(r: TokenReader) {
    const node = new Node("alter tablespace set")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TABLESPACE))
    node.add(r.consume(Keyword.SET))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterTablespaceStatement(r: TokenReader) {
    const node = new Node("alter tablespace")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TABLESPACE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterTriggerStatement(r: TokenReader) {
    const node = new Node("alter trigger")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TRIGGER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterTypeBodyStatement(r: TokenReader) {
    const node = new Node("alter type body")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TYPE))
    node.add(r.consume(Keyword.BODY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterTypeStatement(r: TokenReader) {
    const node = new Node("alter type")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.TYPE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterUserStatement(r: TokenReader) {
    const node = new Node("alter user")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.USER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private alterViewStatement(r: TokenReader) {
    const node = new Node("alter view")
    node.add(r.consume(Keyword.ALTER))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropAnalyticViewStatement(r: TokenReader) {
    const node = new Node("drop analytic view")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.ANALYTIC))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropAttributeDimensionStatement(r: TokenReader) {
    const node = new Node("drop attribute dimension")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.ATTRIBUTE))
    node.add(r.consume(Keyword.DIMENSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropAuditPolicyStatement(r: TokenReader) {
    const node = new Node("drop audit policy")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.AUDIT))
    node.add(r.consume(Keyword.POLICY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropClusterStatement(r: TokenReader) {
    const node = new Node("drop cluster")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.CLUSTER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropContextStatement(r: TokenReader) {
    const node = new Node("drop context")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.CONTEXT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropDatabaseLinkStatement(r: TokenReader) {
    const node = new Node("drop database link")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.DATABASE))
    node.add(r.consume(Keyword.LINK))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropDatabaseStatement(r: TokenReader) {
    const node = new Node("drop database")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropDimensionStatement(r: TokenReader) {
    const node = new Node("drop dimension")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.DIMENSION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropDirectoryStatement(r: TokenReader) {
    const node = new Node("drop directory")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.DIRECTORY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropDiskgroupStatement(r: TokenReader) {
    const node = new Node("drop diskgroup")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.DISKGROUP))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropEditionStatement(r: TokenReader) {
    const node = new Node("drop edition")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.EDITION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropFunctionStatement(r: TokenReader) {
    const node = new Node("drop function")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.FUNCTION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropHierarchyStatement(r: TokenReader) {
    const node = new Node("drop hierarchy")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.HIERARCHY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropIndexStatement(r: TokenReader) {
    const node = new Node("drop index")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.INDEX))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropIndextypeStatement(r: TokenReader) {
    const node = new Node("drop indextype")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.INDEXTYPE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropInmemoryJoinGroupStatement(r: TokenReader) {
    const node = new Node("drop inmemory join group")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.INMEMORY))
    node.add(r.consume(Keyword.JOIN))
    node.add(r.consume(Keyword.GROUP))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropJavaStatement(r: TokenReader) {
    const node = new Node("drop java")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.JAVA))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropLibraryStatement(r: TokenReader) {
    const node = new Node("drop library")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.LIBRARY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropLockdownProfileStatement(r: TokenReader) {
    const node = new Node("drop lockdown profile")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.LOCKDOWN))
    node.add(r.consume(Keyword.PROFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropMaterializedViewLogStatement(r: TokenReader) {
    const node = new Node("drop materialized view log")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.MATERIALIZED))
    node.add(r.consume(Keyword.VIEW))
    node.add(r.consume(Keyword.LOG))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropMaterializedViewStatement(r: TokenReader) {
    const node = new Node("drop materialized view")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.MATERIALIZED))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropOperatorStatement(r: TokenReader) {
    const node = new Node("drop operator")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.OPERATOR))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropOutlineStatement(r: TokenReader) {
    const node = new Node("drop outline")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.OUTLINE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropPackageStatement(r: TokenReader) {
    const node = new Node("drop package")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.PACKAGE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropPluggableDatabaseStatement(r: TokenReader) {
    const node = new Node("drop pluggable database")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.PLUGGABLE))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropProcedureStatement(r: TokenReader) {
    const node = new Node("drop procedure")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.PROCEDURE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropProfileStatement(r: TokenReader) {
    const node = new Node("drop profile")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.PROFILE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropRestorePointStatement(r: TokenReader) {
    const node = new Node("drop restore point")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.RESTORE))
    node.add(r.consume(Keyword.POINT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropRoleStatement(r: TokenReader) {
    const node = new Node("drop role")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.ROLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }
  
  private dropRollbackSegmentStatement(r: TokenReader) {
    const node = new Node("drop rollback segment")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.ROLLBACK))
    node.add(r.consume(Keyword.SEGMENT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropSchemaStatement(r: TokenReader) {
    const node = new Node("drop schema")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.SCHEMA))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropSequenceStatement(r: TokenReader) {
    const node = new Node("drop sequence")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.SEQUENCE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropSynonymStatement(r: TokenReader) {
    const node = new Node("drop synonym")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.SYNONYM))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropTableStatement(r: TokenReader) {
    const node = new Node("drop table")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TABLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropTablespaceSetStatement(r: TokenReader) {
    const node = new Node("drop tablespace set")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TABLESPACE))
    node.add(r.consume(Keyword.SET))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropTablespaceStatement(r: TokenReader) {
    const node = new Node("drop tablespace")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TABLESPACE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropTriggerStatement(r: TokenReader) {
    const node = new Node("drop trigger")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TRIGGER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropTypeBodyStatement(r: TokenReader) {
    const node = new Node("drop type body")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TYPE))
    node.add(r.consume(Keyword.BODY))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropTypeStatement(r: TokenReader) {
    const node = new Node("drop type")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.TYPE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropUserStatement(r: TokenReader) {
    const node = new Node("drop user")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.USER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private dropViewStatement(r: TokenReader) {
    const node = new Node("drop view")
    node.add(r.consume(Keyword.DROP))
    node.add(r.consume(Keyword.VIEW))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private truncateClusterStatement(r: TokenReader) {
    const node = new Node("truncate cluster")
    node.add(r.consume(Keyword.TRUNCATE))
    node.add(r.consume(Keyword.CLUSTER))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private truncateTableStatement(r: TokenReader) {
    const node = new Node("truncate table")
    node.add(r.consume(Keyword.TRUNCATE))
    node.add(r.consume(Keyword.TABLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private setConstraintStatement(r: TokenReader) {
    const node = new Node("set constraint")
    node.add(r.consume(Keyword.SET))

    if (r.peekIf(Keyword.CONSTRAINTS)) {
      node.add(r.consume())
    } else {
      node.add(r.consume(Keyword.CONSTRAINT))
    }

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }
    return node
  }

  private setRoleStatement(r: TokenReader) {
    const node = new Node("set role")
    node.add(r.consume(Keyword.SET))
    node.add(r.consume(Keyword.ROLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private setTransactionStatement(r: TokenReader) {
    const node = new Node("set transaction")
    node.add(r.consume(Keyword.SET))
    node.add(r.consume(Keyword.TRANSACTION))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private administerKeyManagementStatement(r: TokenReader) {
    const node = new Node("administer key management")
    node.add(r.consume(Keyword.ADMINISTER))
    node.add(r.consume(Keyword.KEY))
    node.add(r.consume(Keyword.MANAGEMENT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private analyzeStatement(r: TokenReader) {
    const node = new Node("analyze")
    node.add(r.consume(Keyword.ANALYZE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private associateStatisticsStatement(r: TokenReader) {
    const node = new Node("associate statistics")
    node.add(r.consume(Keyword.ASSOCIATE))
    node.add(r.consume(Keyword.STATISTICS))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private auditStatement(r: TokenReader) {
    const node = new Node("audit")
    node.add(r.consume(Keyword.AUDIT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private callStatement(r: TokenReader) {
    const node = new Node("call")
    node.add(r.consume(Keyword.CALL))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private commentStatement(r: TokenReader) {
    const node = new Node("comment")
    node.add(r.consume(Keyword.COMMENT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private commitStatement(r: TokenReader) {
    const node = new Node("commit")
    node.add(r.consume(Keyword.COMMIT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private disassociateStatisticsStatement(r: TokenReader) {
    const node = new Node("disassociate statistics")
    node.add(r.consume(Keyword.DISASSOCIATE))
    node.add(r.consume(Keyword.STATISTICS))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private flashbackDatabaseStatement(r: TokenReader) {
    const node = new Node("flashback database")
    node.add(r.consume(Keyword.FLASHBACK))
    node.add(r.consume(Keyword.DATABASE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private flashbackTableStatement(r: TokenReader) {
    const node = new Node("flashback table")
    node.add(r.consume(Keyword.FLASHBACK))
    node.add(r.consume(Keyword.TABLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private grantStatement(r: TokenReader) {
    const node = new Node("grant")
    node.add(r.consume(Keyword.GRANT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private lockTableStatement(r: TokenReader) {
    const node = new Node("lock table")
    node.add(r.consume(Keyword.LOCK))
    node.add(r.consume(Keyword.TABLE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private noauditStatement(r: TokenReader) {
    const node = new Node("noaudit")
    node.add(r.consume(Keyword.NOAUDIT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private purgeStatement(r: TokenReader) {
    const node = new Node("purge")
    node.add(r.consume(Keyword.PURGE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private renameStatement(r: TokenReader) {
    const node = new Node("rename")
    node.add(r.consume(Keyword.RENAME))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private revokeStatement(r: TokenReader) {
    const node = new Node("revoke")
    node.add(r.consume(Keyword.REVOKE))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private rollbackStatement(r: TokenReader) {
    const node = new Node("rollback")
    node.add(r.consume(Keyword.ROLLBACK))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private savepointStatement(r: TokenReader) {
    const node = new Node("savepoint")
    node.add(r.consume(Keyword.SAVEPOINT))

    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private declareBlock(r: TokenReader) {
    const node = new Node("block")

    const declareNode = new Node("declare")
    declareNode.add(r.consume(Keyword.DECLARE))

    while (r.token()
      && !r.peekIf(TokenType.Delimiter)
    ) {
      if (r.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock(r))
        if (r.peekIf(Keyword.EXCEPTION)) {
          node.add(this.exceptionBlock(r))
        }
        break
      } else if (r.peekIf(Keyword.PROCEDURE)) {
        declareNode.add(this.procedureBlock(r))
      } else if (r.peekIf(Keyword.FUNCTION)) {
        declareNode.add(this.functionBlock(r))
      } else {
        declareNode.add(r.token(-1))
      }
    }

    return node
  }

  private beginBlock(r: TokenReader) {
    const node = new Node("begin")
    node.add(r.consume(Keyword.BEGIN))

    while (r.token()
    && !r.peekIf(TokenType.Delimiter)
    ) {
      if (r.peekIf(Keyword.END)) {
        node.add(r.consume())
        node.add(r.consume(TokenType.SemiColon))
        break
      } else if (r.peekIf(Keyword.DECLARE)) {
        node.add(this.declareBlock(r))
      } else if (r.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock(r))
      } else if (r.peekIf(Keyword.EXCEPTION)) {
        break
      } else {
        node.add(r.consume())
      }
    }

    return node
  }

  private procedureBlock(r: TokenReader) {
    const node = new Node("nested_procedure")

    while (r.token()
    && !r.peekIf(TokenType.Delimiter)
    ) {
      if (r.peekIf(Keyword.END)) {
        node.add(r.consume())
        node.add(r.consume(TokenType.SemiColon))
        break
      } else {
        node.add(r.consume())
      }
    }
    return node
  }

  private functionBlock(r: TokenReader) {
    const node = new Node("nested_function")

    while (r.token()
    && !r.peekIf(TokenType.Delimiter)
    ) {
      if (r.peekIf(Keyword.END)) {
        node.add(r.consume())
        node.add(r.consume(TokenType.SemiColon))
        break
      } else {
        node.add(r.consume())
      }
    }
    return node
  }

  private exceptionBlock(r: TokenReader) {
    const node = new Node("exception")

    while (r.token()
    && !r.peekIf(TokenType.Delimiter)
    ) {
      if (r.peekIf(Keyword.END)) {
        node.add(r.consume())
        node.add(r.consume(TokenType.SemiColon))
        break
      } else {
        node.add(r.consume())
      }
    }
    return node
  }

  private insertClause(r: TokenReader, withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.INSERT))
    node.add(r.consume(Keyword.INTO))

    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private updateClause(r: TokenReader, withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.UPDATE))

    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private deleteClause(r: TokenReader, withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.DELETE))
    node.add(r.consume(Keyword.FROM))

    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private mergeClause(r: TokenReader, withNode?: Node) {
    const node = new Node("merge")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.MERGE))
    node.add(r.consume(Keyword.INTO))
    this.parseName(r, node)
    
    while (r.token() && !r.peekIf(TokenType.Delimiter)) {
      node.add(r.consume())
    }

    return node
  }

  private selectClause(r: TokenReader, withNode?: Node) {
    const node = new Node("select")
    if (withNode) {
      node.add(withNode)
    }
    node.add(r.consume(Keyword.SELECT))

    let depth = 0
    while (r.token()
      && !r.peekIf(TokenType.SemiColon)
      && !r.peekIf(TokenType.Delimiter)
      && (depth == 0 && !r.peekIf(TokenType.RightParen))
    ) {
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        depth++
      } else if (r.peekIf(TokenType.RightParen)) {
        node.add(r.consume())
        depth--
      } else {
        node.add(r.consume())
      }
    }

    return node
  }

  private withClause(r: TokenReader) {
    const node = new Node("with")
    node.add(r.consume(Keyword.WITH))

    while (r.token()) {
      node.add(this.identifier(r, "name"))
      if (r.peekIf(TokenType.LeftParen)) {
        node.add(r.consume())
        while (r.token()) {
          node.add(this.identifier(r, "column"))

          if (r.peekIf(TokenType.Comma)) {
            node.add(r.consume())
          } else {
            break
          }
        }
        node.add(r.consume(TokenType.RightParen))
      }

      node.add(r.consume(Keyword.AS))
      node.add(r.consume(TokenType.LeftParen))
      node.add(this.selectClause(r))
      node.add(r.consume(TokenType.RightParen))

      if (r.peekIf(TokenType.Comma)) {
        node.add(r.consume())
      } else {
        break
      }
    }
    return node
  }

  private parseName(r: TokenReader, stmt: Node) {
    const nameNode = this.identifier(r, "name")
    stmt.add(nameNode)
    if (r.peekIf(TokenType.Dot)) {
      stmt.add(r.consume())
      nameNode.name = "schema_name"
      stmt.add(this.identifier(r, "name"))
    }
    if (r.peekIf(Operator.AT)) {
      stmt.add(r.consume())
      stmt.add(this.identifier(r, "dblink"))
    }
  }

  private identifier(r: TokenReader, name: string) {
    const node = new Node(name)
    if (r.peekIf(TokenType.QuotedIdentifier)) {
      node.add(r.consume())
      node.value = dequote(r.token(-1).text)
    } else if (r.peekIf(TokenType.Identifier)) {
      node.add(r.consume())
      node.value = r.token(-1).text
    } else {
      throw r.createParseError()
    }
    return node
  }
}
