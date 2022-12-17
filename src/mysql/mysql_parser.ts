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
  ParseFunction,
} from "../parser"
import { dequote, ucase } from "../util"
import { MysqlLexer } from "./mysql_lexer"

export class MysqlParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new MysqlLexer(options).lex(input)
    return new MysqlParser(tokens, options).parse()
  }

  private sqlMode = new Set<string>()

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
    this.setSqlMode(options.sqlMode)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Eof)) {
          root.add(this.consume())
          break
        } else if (this.peekIf(TokenType.Delimiter)) {
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

    const sep = Math.max(token.text.indexOf(" "), token.text.indexOf("\t"))
    if (sep === -1) {
      stmt.add(new Node("name", this.getLongCommandName(token.text)).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), [], token.location)
      const name = this.getLongCommandName(nameToken.text)
      stmt.add(new Node("name", name).add(nameToken))

      const argTokens = []
      const args = token.text.substring(sep)

      if (name === "prompt") {
        const m = /^[ \t]*/.exec(args)
        let sep2 = sep
        if (m) {
          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = sep2
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(TokenType.WhiteSpace, m[0], [], token.location))
          sep2 += m[0].length
        }
        if (sep2 < args.length) {
          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = sep2
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(TokenType.Identifier, args.substring(sep2), [], loc))
        }
      } else {
        const re = /([ \t]+)|('(?:''|[^']+)*'|`(?:``|[^`]+)*`)|([^ \t'`]+)/y
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

    if (this.peekIf(TokenType.Delimiter)) {
      stmt.add(this.consume())
    }
    if (this.peekIf(TokenType.Eof)) {
      stmt.add(this.consume())
    }
    return stmt
  }

  private statement() {
    const stmt = new Node("")

    try {

      if (this.peekIf(TokenType.Delimiter)) {
        stmt.add(this.consume())
      }
      if (this.peekIf(TokenType.Eof)) {
        stmt.add(this.consume())
      }
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (this.token() && !this.peekIf(TokenType.Delimiter)) {
          this.consume()
          stmt.add(this.token(-1))
        }
        if (this.peekIf(TokenType.Delimiter)) {
          stmt.add(this.consume())
        }
        if (this.peekIf(TokenType.Eof)) {
          stmt.add(this.consume())
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