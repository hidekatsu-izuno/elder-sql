import semver from "semver"
import {
  TokenType,
  Token,
} from "../lexer.js"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser.js"
import { dequote, ucase } from "../utils.js"
import { MysqlLexer } from "./mysql_lexer.js"

export class MysqlParser extends Parser {
  private sqlMode = new Set<string>()

  constructor(
    options: Record<string, any> = {},
  ) {
    super(options, options.lexer ?? new MysqlLexer(options))
    this.setSqlMode(options.sqlMode)
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
        } else if (r.peekIf(TokenType.Delimiter)) {
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

    if (r.peek() != null) {
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
    return new Node("CommandStatement", node => {
      node.append(new Node("CommandName", node => {
        const command = r.consume(TokenType.Command)
        node.append(command)
        node.data.value = command.text
      }))
      node.append(new Node("CommandArgumentList", node => {
        while (!r.peek().eos) {
          node.append(new Node("CommandArgument", node => {
            const arg = r.consume()
            node.append(arg)
            node.data.value = dequote(arg.text)
          }))
        }
      }))
      if (r.peekIf(TokenType.EoF)) {
        node.append(r.consume())
      }
    })
  }

  private statement(r: TokenReader) {
    const stmt = new Node("")

    try {

      if (r.peekIf(TokenType.Delimiter)) {
        stmt.append(r.consume())
      }
      if (r.peekIf(TokenType.EoF)) {
        stmt.append(r.consume())
      }
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (r.peek() && !r.peekIf(TokenType.Delimiter)) {
          r.consume()
          stmt.append(r.peek(-1))
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
}