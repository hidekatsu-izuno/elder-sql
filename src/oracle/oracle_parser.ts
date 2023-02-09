import {
  TokenType,
  Token,
  Keyword,
} from "../lexer.js"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser.js"
import { dequote } from "../utils.js"
import { OracleLexer } from "./oracle_lexer.js"

export class OracleParser extends Parser {
  constructor(
    options: Record<string, any> = {},
  ) {
    super(options, options.lexer ?? new OracleLexer(options))
  }

  processTokens(tokens: Token[]): Node {
    const r = new TokenReader(tokens)
    const root = new Node("root")
    const errors = []

    while (r.peek()) {
      try {
        if (r.peekIf(TokenType.EoF)) {
          root.append(r.consume())
          break
        } else if (r.peekIf(TokenType.Delimiter) || r.peekIf(TokenType.SemiColon)) {
          root.append(r.consume())
        } else if (r.peekIf(TokenType.Command)) {
          root.append(this.command(r))
        } else {
          root.append(this.statement(r))
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            root.append(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (r.peek()) {
      for (let i = r.pos; i < r.tokens.length; i++) {
        root.append(r.tokens[i])
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
    return new Node("CommandStatement").apply(node => {
      node.append(new Node("CommandName")).apply(node => {
        const command = r.consume(TokenType.Command)
        node.append(command)
        node.data.value = command.text
      })
      node.append(new Node("CommandArgumentList")).apply(node => {
        while (!r.peek().eos) {
          node.append(new Node("CommandArgument")).apply(node => {
            const arg = r.consume()
            node.append(arg)
            node.data.value = dequote(arg.text)
          })
        }
      })
      if (r.peekIf(TokenType.EoF)) {
        node.append(r.consume())
      }
    })
  }

  private statement(r: TokenReader) {
    let explainPlan
    let stmt: Node | undefined

    try {
      if (r.peekIf(Keyword.EXPLAIN)) {
        explainPlan = new Node("ExplainPlan").apply(node => {
          node.append(r.consume())
          node.append(r.consume(Keyword.PLAN))

          if (r.peekIf(Keyword.SET)) {
            node.append(new Node("statement_id")).apply(node => {
              node.append(r.consume())
              node.append(r.consume(Keyword.STATEMENT_ID))
              node.append(r.consume({ type: TokenType.Operator, text: "=" }))
              node.append(r.consume(TokenType.String))
              node.data.value = dequote(r.peek(-1).text)
            })
          }

          if (r.peekIf(Keyword.INTO)) {
            node.append(r.consume())
          }

          this.parseName(r, node)

          node.append(r.consume(Keyword.FOR))
        })
      }

      if (r.peekIf(Keyword.CREATE)) {
        const mark = r.pos
        r.consume()

        while (r.peek()
          && !r.peekIf(TokenType.Delimiter)
          && r.peekIf(TokenType.Identifier)
        ) {
          const token = r.peek()
          if (token.keyword && OracleLexer.isObjectStart(token.keyword)) {
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

        while (r.peek()
          && !r.peekIf(TokenType.Delimiter)
          && r.peekIf(TokenType.Identifier)
        ) {
          const token = r.peek()
          if (token.keyword && OracleLexer.isObjectStart(token.keyword)) {
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

        while (!r.peek().eos && r.peekIf(TokenType.Identifier)) {
          const token = r.peek()
          if (token.keyword && OracleLexer.isObjectStart(token.keyword)) {
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
        explainPlan.append(stmt)
        stmt = explainPlan
      }

      if (r.peekIf(TokenType.Delimiter)) {
        stmt.append(r.consume())
      }
      if (r.peekIf(TokenType.EoF)) {
        stmt.append(r.consume())
      }
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("Unknown")
        }
        while (!r.peek().eos) {
          stmt.append(r.consume())
        }
        if (r.peekIf(TokenType.Delimiter)) {
          stmt.append(r.consume())
        }
        if (r.peekIf(TokenType.EoF)) {
          stmt.append(r.consume())
        }
        err.node = stmt
      }
      throw err
    }
  }

  private createAnalyticViewStatement(r: TokenReader) {
    return new Node("CreateAnalyticView").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.ANALYTIC))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createAttributeDimensionStatement(r: TokenReader) {
    return new Node("CreateAttributeDimension").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.ATTRIBUTE))
      node.append(r.consume(Keyword.DIMENSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createAuditPolicyStatement(r: TokenReader) {
    return new Node("CreateAuditPolicy").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.AUDIT))
      node.append(r.consume(Keyword.POLICY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createClusterStatement(r: TokenReader) {
    return new Node("CreateCluster").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.CLUSTER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createContextStatement(r: TokenReader) {
    return new Node("CreateContext").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.CONTEXT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createControlfileStatement(r: TokenReader) {
    return new Node("CreateControlfile").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.CONTROLFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createDatabaseLinkStatement(r: TokenReader) {
    return new Node("CreateDatabaseLink").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.DATABASE))
      node.append(r.consume(Keyword.LINK))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createDatabaseStatement(r: TokenReader) {
    return new Node("CreateDatabase").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createDimensionStatement(r: TokenReader) {
    return new Node("CreateDimension").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.DIMENSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createDirectoryStatement(r: TokenReader) {
    return new Node("CreateDirectory").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.DIRECTORY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createDiskgroupStatement(r: TokenReader) {
    return new Node("CreateDiskgroup").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.DISKGROUP))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createEditionStatement(r: TokenReader) {
    return new Node("CreateEdition").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.EDITION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createFunctionStatement(r: TokenReader) {
    return new Node("CreateFunction").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.FUNCTION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createHierarchyStatement(r: TokenReader) {
    return new Node("CreateHierarchy").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.HIERARCHY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createIndexStatement(r: TokenReader) {
    return new Node("CreateIndex").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.INDEX))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createIndextypeStatement(r: TokenReader) {
    return new Node("CreateIndextype").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.INDEXTYPE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createInmemoryJoinGroupStatement(r: TokenReader) {
    return new Node("CreateInmemoryJoinGroup").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.INMEMORY))
      node.append(r.consume(Keyword.JOIN))
      node.append(r.consume(Keyword.GROUP))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createJavaStatement(r: TokenReader) {
    return new Node("CreateJava").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.JAVA))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createLibraryStatement(r: TokenReader) {
    return new Node("CreateLibrary").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.LIBRARY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createLockdownProfileStatement(r: TokenReader) {
    return new Node("CreateLockdownProfile").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.LOCKDOWN))
      node.append(r.consume(Keyword.PROFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createMaterializedViewLogStatement(r: TokenReader) {
    return new Node("CreateMaterializedViewLog").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.MATERIALIZED))
      node.append(r.consume(Keyword.VIEW))
      node.append(r.consume(Keyword.LOG))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createMaterializedViewStatement(r: TokenReader) {
    return new Node("CreateMaterializedView").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.MATERIALIZED))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createOperatorStatement(r: TokenReader) {
    return new Node("CreateOperator").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.OPERATOR))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createOutlineStatement(r: TokenReader) {
    return new Node("CreateOutline").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.OUTLINE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createPackageBodyStatement(r: TokenReader) {
    return new Node("CreatePackageBody").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.PACKAGE))
      node.append(r.consume(Keyword.BODY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createPackageStatement(r: TokenReader) {
    return new Node("CreatePackage").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.PACKAGE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createPfileStatement(r: TokenReader) {
    return new Node("CreatePfile").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.PFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createPluggableDatabaseStatement(r: TokenReader) {
    return new Node("CreatePluggableDatabase").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.PLUGGABLE))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createProcedureStatement(r: TokenReader) {
    return new Node("CreateProcedure").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.PROCEDURE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createProfileStatement(r: TokenReader) {
    return new Node("CreateProfile").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.PROFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createRestorePointStatement(r: TokenReader) {
    return new Node("CreateRestorePoint").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.RESTORE))
      node.append(r.consume(Keyword.POINT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createRoleStatement(r: TokenReader) {
    return new Node("CreateRole").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.ROLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createRollbackSegmentStatement(r: TokenReader) {
    return new Node("CreateRollbackSegment").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.ROLLBACK))
      node.append(r.consume(Keyword.SEGMENT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createSchemaStatement(r: TokenReader) {
    return new Node("CreateSchema").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.SCHEMA))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createSequenceStatement(r: TokenReader) {
    return new Node("CreateSequence").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.SEQUENCE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createSpfileStatement(r: TokenReader) {
    return new Node("CreateSpfile").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.SPFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createSynonymStatement(r: TokenReader) {
    return new Node("CreateSynonym").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.SYNONYM))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createTableStatement(r: TokenReader) {
    return new Node("CreateTable").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.TABLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createTablespaceSetStatement(r: TokenReader) {
    return new Node("CreateTablespaceSet").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.TABLESPACE))
      node.append(r.consume(Keyword.SET))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createTablespaceStatement(r: TokenReader) {
    return new Node("CreateTablespace").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.TABLESPACE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createTriggerStatement(r: TokenReader) {
    return new Node("CreateTrigger").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.TRIGGER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createTypeBodyStatement(r: TokenReader) {
    return new Node("CreateTypeBody").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.TYPE))
      node.append(r.consume(Keyword.BODY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createTypeStatement(r: TokenReader) {
    return new Node("CreateType").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.TYPE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createUserStatement(r: TokenReader) {
    return new Node("CreateUser").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.USER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private createViewStatement(r: TokenReader) {
    return new Node("CreateView").apply(node => {
      node.append(r.consume(Keyword.CREATE))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private alterAnalyticViewStatement(r: TokenReader) {
    return new Node("AlterAnalyticView").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.ANALYTIC))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private alterAttributeDimensionStatement(r: TokenReader) {
    return new Node("AlterAttributeDimension").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.ATTRIBUTE))
      node.append(r.consume(Keyword.DIMENSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private alterAuditPolicyStatement(r: TokenReader) {
    return new Node("AlterAuditPolicy").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.AUDIT))
      node.append(r.consume(Keyword.POLICY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private alterClusterStatement(r: TokenReader) {
    return new Node("AlterCluster").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.CLUSTER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private alterDatabaseDictionaryStatement(r: TokenReader) {
    return new Node("AlterDatabaseDictionary").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.DATABASE))
      node.append(r.consume(Keyword.DICTIONARY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private alterDatabaseLinkStatement(r: TokenReader) {
    return new Node("alter database link").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.DATABASE))
      node.append(r.consume(Keyword.LINK))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterDatabaseStatement(r: TokenReader) {
    return new Node("alter database").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterDimensionStatement(r: TokenReader) {
    return new Node("alter dimension").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.DIMENSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterDiskgroupStatement(r: TokenReader) {
    return new Node("alter diskgroup").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.DISKGROUP))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterEditionStatement(r: TokenReader) {
    return new Node("alter edition").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.EDITION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterFunctionStatement(r: TokenReader) {
    return new Node("alter function").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.FUNCTION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterHierarchyStatement(r: TokenReader) {
    return new Node("alter hierarchy").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.HIERARCHY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterIndexStatement(r: TokenReader) {
    return new Node("alter index").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.INDEX))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterIndextypeStatement(r: TokenReader) {
    return new Node("alter indextype").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.INDEXTYPE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterInmemoryJoinGroupStatement(r: TokenReader) {
    return new Node("alter inmemory join group").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.INMEMORY))
      node.append(r.consume(Keyword.JOIN))
      node.append(r.consume(Keyword.GROUP))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterJavaStatement(r: TokenReader) {
    return new Node("alter java").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.JAVA))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterLibraryStatement(r: TokenReader) {
    return new Node("alter library").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.LIBRARY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterLockdownProfileStatement(r: TokenReader) {
    return new Node("alter lockdown profile").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.LOCKDOWN))
      node.append(r.consume(Keyword.PROFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterMaterializedViewLogStatement(r: TokenReader) {
    return new Node("alter materialized view log").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.MATERIALIZED))
      node.append(r.consume(Keyword.VIEW))
      node.append(r.consume(Keyword.LOG))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterMaterializedViewStatement(r: TokenReader) {
    return new Node("alter materialized view").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.MATERIALIZED))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterOperatorStatement(r: TokenReader) {
    return new Node("alter operator").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.OPERATOR))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterOutlineStatement(r: TokenReader) {
    return new Node("alter outline").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.OUTLINE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterPackageStatement(r: TokenReader) {
    return new Node("alter package").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.PACKAGE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterPluggableDatabaseStatement(r: TokenReader) {
    return new Node("alter pluggable database").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.PLUGGABLE))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterProcedureStatement(r: TokenReader) {
    return new Node("alter procedure").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.PROCEDURE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterProfileStatement(r: TokenReader) {
    return new Node("alter profile").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.PROFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterResourceCostStatement(r: TokenReader) {
    return new Node("alter resource cost").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.RESOURCE))
      node.append(r.consume(Keyword.COST))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterRoleStatement(r: TokenReader) {
    return new Node("alter role").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.ROLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterRollbackSegmentStatement(r: TokenReader) {
    return new Node("alter rollback segment").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.ROLLBACK))
      node.append(r.consume(Keyword.SEGMENT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterSequenceStatement(r: TokenReader) {
    return new Node("alter sequence").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.SEQUENCE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterSessionStatement(r: TokenReader) {
    return new Node("alter session").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.SESSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterSynonymStatement(r: TokenReader) {
    return new Node("alter synonym").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.SYNONYM))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterSystemStatement(r: TokenReader) {
    return new Node("alter system").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.SYSTEM))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterTableStatement(r: TokenReader) {
    return new Node("alter table").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TABLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterTablespaceSetStatement(r: TokenReader) {
    return new Node("alter tablespace set").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TABLESPACE))
      node.append(r.consume(Keyword.SET))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterTablespaceStatement(r: TokenReader) {
    return new Node("alter tablespace").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TABLESPACE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterTriggerStatement(r: TokenReader) {
    return new Node("alter trigger").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TRIGGER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterTypeBodyStatement(r: TokenReader) {
    return new Node("alter type body").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TYPE))
      node.append(r.consume(Keyword.BODY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterTypeStatement(r: TokenReader) {
    return new Node("alter type").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.TYPE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterUserStatement(r: TokenReader) {
    return new Node("alter user").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.USER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private alterViewStatement(r: TokenReader) {
    return new Node("alter view").apply(node => {
      node.append(r.consume(Keyword.ALTER))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropAnalyticViewStatement(r: TokenReader) {
    return new Node("drop analytic view").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.ANALYTIC))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropAttributeDimensionStatement(r: TokenReader) {
    return new Node("drop attribute dimension").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.ATTRIBUTE))
      node.append(r.consume(Keyword.DIMENSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropAuditPolicyStatement(r: TokenReader) {
    return new Node("drop audit policy").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.AUDIT))
      node.append(r.consume(Keyword.POLICY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropClusterStatement(r: TokenReader) {
    return new Node("drop cluster").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.CLUSTER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropContextStatement(r: TokenReader) {
    return new Node("drop context").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.CONTEXT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropDatabaseLinkStatement(r: TokenReader) {
    return new Node("drop database link").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.DATABASE))
      node.append(r.consume(Keyword.LINK))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropDatabaseStatement(r: TokenReader) {
    return new Node("drop database").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropDimensionStatement(r: TokenReader) {
    return new Node("drop dimension").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.DIMENSION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropDirectoryStatement(r: TokenReader) {
    return new Node("drop directory").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.DIRECTORY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropDiskgroupStatement(r: TokenReader) {
    return new Node("drop diskgroup").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.DISKGROUP))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropEditionStatement(r: TokenReader) {
    return new Node("drop edition").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.EDITION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropFunctionStatement(r: TokenReader) {
    return new Node("drop function").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.FUNCTION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropHierarchyStatement(r: TokenReader) {
    return new Node("drop hierarchy").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.HIERARCHY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropIndexStatement(r: TokenReader) {
    return new Node("drop index").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.INDEX))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropIndextypeStatement(r: TokenReader) {
    return new Node("drop indextype").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.INDEXTYPE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropInmemoryJoinGroupStatement(r: TokenReader) {
    return new Node("drop inmemory join group").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.INMEMORY))
      node.append(r.consume(Keyword.JOIN))
      node.append(r.consume(Keyword.GROUP))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropJavaStatement(r: TokenReader) {
    return new Node("drop java").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.JAVA))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropLibraryStatement(r: TokenReader) {
    return new Node("drop library").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.LIBRARY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropLockdownProfileStatement(r: TokenReader) {
    return new Node("drop lockdown profile").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.LOCKDOWN))
      node.append(r.consume(Keyword.PROFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropMaterializedViewLogStatement(r: TokenReader) {
    return new Node("drop materialized view log").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.MATERIALIZED))
      node.append(r.consume(Keyword.VIEW))
      node.append(r.consume(Keyword.LOG))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropMaterializedViewStatement(r: TokenReader) {
    return new Node("drop materialized view").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.MATERIALIZED))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropOperatorStatement(r: TokenReader) {
    return new Node("drop operator").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.OPERATOR))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropOutlineStatement(r: TokenReader) {
    return new Node("drop outline").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.OUTLINE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropPackageStatement(r: TokenReader) {
    return new Node("drop package").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.PACKAGE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropPluggableDatabaseStatement(r: TokenReader) {
    return new Node("drop pluggable database").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.PLUGGABLE))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropProcedureStatement(r: TokenReader) {
    return new Node("drop procedure").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.PROCEDURE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropProfileStatement(r: TokenReader) {
    return new Node("drop profile").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.PROFILE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropRestorePointStatement(r: TokenReader) {
    return new Node("drop restore point").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.RESTORE))
      node.append(r.consume(Keyword.POINT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropRoleStatement(r: TokenReader) {
    return new Node("drop role").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.ROLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropRollbackSegmentStatement(r: TokenReader) {
    return new Node("drop rollback segment").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.ROLLBACK))
      node.append(r.consume(Keyword.SEGMENT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropSchemaStatement(r: TokenReader) {
    return new Node("drop schema").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.SCHEMA))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropSequenceStatement(r: TokenReader) {
    return new Node("drop sequence").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.SEQUENCE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropSynonymStatement(r: TokenReader) {
    return new Node("drop synonym").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.SYNONYM))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropTableStatement(r: TokenReader) {
    return new Node("drop table").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TABLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropTablespaceSetStatement(r: TokenReader) {
    return new Node("drop tablespace set").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TABLESPACE))
      node.append(r.consume(Keyword.SET))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropTablespaceStatement(r: TokenReader) {
    return new Node("drop tablespace").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TABLESPACE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropTriggerStatement(r: TokenReader) {
    return new Node("drop trigger").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TRIGGER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropTypeBodyStatement(r: TokenReader) {
    return new Node("drop type body").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TYPE))
      node.append(r.consume(Keyword.BODY))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropTypeStatement(r: TokenReader) {
    return new Node("drop type").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.TYPE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropUserStatement(r: TokenReader) {
    return new Node("drop user").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.USER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private dropViewStatement(r: TokenReader) {
    return new Node("drop view").apply(node => {
      node.append(r.consume(Keyword.DROP))
      node.append(r.consume(Keyword.VIEW))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private truncateClusterStatement(r: TokenReader) {
    return new Node("truncate cluster").apply(node => {
      node.append(r.consume(Keyword.TRUNCATE))
      node.append(r.consume(Keyword.CLUSTER))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private truncateTableStatement(r: TokenReader) {
    return new Node("truncate table").apply(node => {
      node.append(r.consume(Keyword.TRUNCATE))
      node.append(r.consume(Keyword.TABLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private setConstraintStatement(r: TokenReader) {
    return new Node("set constraint").apply(node => {
      node.append(r.consume(Keyword.SET))

      if (r.peekIf(Keyword.CONSTRAINTS)) {
        node.append(r.consume())
      } else {
        node.append(r.consume(Keyword.CONSTRAINT))
      }

      while (!r.peek().eos) {
        node.append(r.consume())
      }
    })
  }

  private setRoleStatement(r: TokenReader) {
    return new Node("set role").apply(node => {
      node.append(r.consume(Keyword.SET))
      node.append(r.consume(Keyword.ROLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private setTransactionStatement(r: TokenReader) {
    return new Node("set transaction").apply(node => {
      node.append(r.consume(Keyword.SET))
      node.append(r.consume(Keyword.TRANSACTION))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private administerKeyManagementStatement(r: TokenReader) {
    return new Node("administer key management").apply(node => {
      node.append(r.consume(Keyword.ADMINISTER))
      node.append(r.consume(Keyword.KEY))
      node.append(r.consume(Keyword.MANAGEMENT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private analyzeStatement(r: TokenReader) {
    return new Node("analyze").apply(node => {
      node.append(r.consume(Keyword.ANALYZE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private associateStatisticsStatement(r: TokenReader) {
    return new Node("associate statistics").apply(node => {
      node.append(r.consume(Keyword.ASSOCIATE))
      node.append(r.consume(Keyword.STATISTICS))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private auditStatement(r: TokenReader) {
    return new Node("audit").apply(node => {
      node.append(r.consume(Keyword.AUDIT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private callStatement(r: TokenReader) {
    return new Node("call").apply(node => {
      node.append(r.consume(Keyword.CALL))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private commentStatement(r: TokenReader) {
    return new Node("comment").apply(node => {
      node.append(r.consume(Keyword.COMMENT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private commitStatement(r: TokenReader) {
    return new Node("commit").apply(node => {
      node.append(r.consume(Keyword.COMMIT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private disassociateStatisticsStatement(r: TokenReader) {
    return new Node("disassociate statistics").apply(node => {
      node.append(r.consume(Keyword.DISASSOCIATE))
      node.append(r.consume(Keyword.STATISTICS))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private flashbackDatabaseStatement(r: TokenReader) {
    return new Node("flashback database").apply(node => {
      node.append(r.consume(Keyword.FLASHBACK))
      node.append(r.consume(Keyword.DATABASE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private flashbackTableStatement(r: TokenReader) {
    return new Node("flashback table").apply(node => {
      node.append(r.consume(Keyword.FLASHBACK))
      node.append(r.consume(Keyword.TABLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private grantStatement(r: TokenReader) {
    return new Node("grant").apply(node => {
      node.append(r.consume(Keyword.GRANT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private lockTableStatement(r: TokenReader) {
    return new Node("lock table").apply(node => {
      node.append(r.consume(Keyword.LOCK))
      node.append(r.consume(Keyword.TABLE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private noauditStatement(r: TokenReader) {
    return new Node("noaudit").apply(node => {
      node.append(r.consume(Keyword.NOAUDIT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private purgeStatement(r: TokenReader) {
    return new Node("purge").apply(node => {
      node.append(r.consume(Keyword.PURGE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private renameStatement(r: TokenReader) {
    return new Node("rename").apply(node => {
      node.append(r.consume(Keyword.RENAME))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private revokeStatement(r: TokenReader) {
    return new Node("revoke").apply(node => {
      node.append(r.consume(Keyword.REVOKE))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private rollbackStatement(r: TokenReader) {
    return new Node("rollback").apply(node => {
      node.append(r.consume(Keyword.ROLLBACK))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private savepointStatement(r: TokenReader) {
    return new Node("savepoint").apply(node => {
      node.append(r.consume(Keyword.SAVEPOINT))

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private declareBlock(r: TokenReader) {
    return new Node("block").apply(node => {

      const declareNode = new Node("declare")
      declareNode.append(r.consume(Keyword.DECLARE))

      while (r.peek()
        && !r.peekIf(TokenType.Delimiter)
      ) {
        if (r.peekIf(Keyword.BEGIN)) {
          node.append(this.beginBlock(r))
          if (r.peekIf(Keyword.EXCEPTION)) {
            node.append(this.exceptionBlock(r))
          }
          break
        } else if (r.peekIf(Keyword.PROCEDURE)) {
          declareNode.append(this.procedureBlock(r))
        } else if (r.peekIf(Keyword.FUNCTION)) {
          declareNode.append(this.functionBlock(r))
        } else {
          declareNode.append(r.peek(-1))
        }
      }

    })
  }

  private beginBlock(r: TokenReader) {
    return new Node("begin").apply(node => {
      node.append(r.consume(Keyword.BEGIN))

      while (r.peek()
        && !r.peekIf(TokenType.Delimiter)
      ) {
        if (r.peekIf(Keyword.END)) {
          node.append(r.consume())
          node.append(r.consume(TokenType.SemiColon))
          break
        } else if (r.peekIf(Keyword.DECLARE)) {
          node.append(this.declareBlock(r))
        } else if (r.peekIf(Keyword.BEGIN)) {
          node.append(this.beginBlock(r))
        } else if (r.peekIf(Keyword.EXCEPTION)) {
          break
        } else {
          node.append(r.consume())
        }
      }

    })
  }

  private procedureBlock(r: TokenReader) {
    return new Node("nested_procedure").apply(node => {

      while (r.peek()
        && !r.peekIf(TokenType.Delimiter)
      ) {
        if (r.peekIf(Keyword.END)) {
          node.append(r.consume())
          node.append(r.consume(TokenType.SemiColon))
          break
        } else {
          node.append(r.consume())
        }
      }
    })
  }

  private functionBlock(r: TokenReader) {
    return new Node("nested_function").apply(node => {

      while (r.peek()
        && !r.peekIf(TokenType.Delimiter)
      ) {
        if (r.peekIf(Keyword.END)) {
          node.append(r.consume())
          node.append(r.consume(TokenType.SemiColon))
          break
        } else {
          node.append(r.consume())
        }
      }
    })
  }

  private exceptionBlock(r: TokenReader) {
    return new Node("exception").apply(node => {

      while (r.peek()
        && !r.peekIf(TokenType.Delimiter)
      ) {
        if (r.peekIf(Keyword.END)) {
          node.append(r.consume())
          node.append(r.consume(TokenType.SemiColon))
          break
        } else {
          node.append(r.consume())
        }
      }
    })
  }

  private insertClause(r: TokenReader, withNode?: Node) {
    return new Node("insert").apply(node => {
      if (withNode) {
        node.append(withNode)
      }
      node.append(r.consume(Keyword.INSERT))
      node.append(r.consume(Keyword.INTO))

      this.parseName(r, node)

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private updateClause(r: TokenReader, withNode?: Node) {
    return new Node("update").apply(node => {
      if (withNode) {
        node.append(withNode)
      }
      node.append(r.consume(Keyword.UPDATE))

      this.parseName(r, node)

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private deleteClause(r: TokenReader, withNode?: Node) {
    return new Node("delete").apply(node => {
      if (withNode) {
        node.append(withNode)
      }
      node.append(r.consume(Keyword.DELETE))
      node.append(r.consume(Keyword.FROM))

      this.parseName(r, node)

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private mergeClause(r: TokenReader, withNode?: Node) {
    return new Node("merge").apply(node => {
      if (withNode) {
        node.append(withNode)
      }
      node.append(r.consume(Keyword.MERGE))
      node.append(r.consume(Keyword.INTO))
      this.parseName(r, node)

      while (!r.peek().eos) {
        node.append(r.consume())
      }

    })
  }

  private selectClause(r: TokenReader, withNode?: Node) {
    return new Node("select").apply(node => {
      if (withNode) {
        node.append(withNode)
      }
      node.append(r.consume(Keyword.SELECT))

      let depth = 0
      while (r.peek()
        && !r.peekIf(TokenType.SemiColon)
        && !r.peekIf(TokenType.Delimiter)
        && (depth == 0 && !r.peekIf(TokenType.RightParen))
      ) {
        if (r.peekIf(TokenType.LeftParen)) {
          node.append(r.consume())
          depth++
        } else if (r.peekIf(TokenType.RightParen)) {
          node.append(r.consume())
          depth--
        } else {
          node.append(r.consume())
        }
      }

    })
  }

  private withClause(r: TokenReader) {
    return new Node("with").apply(node => {
      node.append(r.consume(Keyword.WITH))

      while (r.peek()) {
        node.append(this.identifier(r, "name"))
        if (r.peekIf(TokenType.LeftParen)) {
          node.append(r.consume())
          while (r.peek()) {
            node.append(this.identifier(r, "column"))

            if (r.peekIf(TokenType.Comma)) {
              node.append(r.consume())
            } else {
              break
            }
          }
          node.append(r.consume(TokenType.RightParen))
        }

        node.append(r.consume(Keyword.AS))
        node.append(r.consume(TokenType.LeftParen))
        node.append(this.selectClause(r))
        node.append(r.consume(TokenType.RightParen))

        if (r.peekIf(TokenType.Comma)) {
          node.append(r.consume())
        } else {
          break
        }
      }
    })
  }

  private parseName(r: TokenReader, stmt: Node) {
    const nameNode = this.identifier(r, "name")
    stmt.append(nameNode)
    if (r.peekIf(TokenType.Dot)) {
      stmt.append(r.consume())
      nameNode.name = "schema_name"
      stmt.append(this.identifier(r, "name"))
    }
    if (r.peekIf({ type: TokenType.Operator, text: "@" })) {
      stmt.append(r.consume())
      stmt.append(this.identifier(r, "dblink"))
    }
  }

  private identifier(r: TokenReader, name: string) {
    return new Node(name).apply(node => {
      if (r.peekIf(TokenType.Identifier)) {
        node.append(r.consume())
        node.data.value = dequote(r.peek(-1).text)
      } else {
        throw r.createParseError()
      }
    })
  }
}
