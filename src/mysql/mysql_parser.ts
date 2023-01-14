import semver from "semver"
import {
  TokenType,
  Token,
  SourceLocation,
} from "../lexer"
import {
  Node,
  Parser,
  ParseError,
  AggregateParseError,
  TokenReader,
} from "../parser"
import { dequote, ucase } from "../util"
import { MysqlLexer } from "./mysql_lexer"

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
    const stmt = new Node("CommandStatement")
    const command = r.consume(TokenType.Command)
    stmt.append(new Node("CommandName", command.text)
      .append(command)
    )
    const args = new Node("CommandArgumentList")
    while (r.peek()) {
      const arg = r.consume()
      args.append(new Node("CommandArgument", dequote(arg.text))
        .append(arg)
      )
      if (!r.peek().eos) {
        break
      }
    }
    stmt.append(args)
    if (r.peekIf(TokenType.EoF)) {
      stmt.append(r.consume())
    }
    return stmt
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