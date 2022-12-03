import { MysqlLexer, MysqlSplitter } from "./mysql/mysql_parser"
import { OracleLexer, OracleSplitter } from "./oracle/oracle_parser"
import { Parser, Token, Node, TokenType, Lexer, Splitter } from "./parser"
import { PostgresLexer, PostgresSplitter } from "./postgres/postgres_parser"
import { Sqlite3Lexer, Sqlite3Splitter } from "./sqlite3/sqlite3_parser"

export type ElderSqlCompilerOptions = {
  dialect: 'sqlite3' | 'mysql' | 'postgres' | 'oracle'
  lexer?: Record<string, any>
}

export class ElderSqlCompiler {
  private lexer: Lexer
  private splitter: Splitter

  constructor(public options: ElderSqlCompilerOptions) {
    if (options.dialect === 'sqlite3') {
      this.lexer = new Sqlite3Lexer(options.lexer)
      this.splitter = new Sqlite3Splitter(options.lexer)
    } else if (options.dialect === 'mysql') {
      this.lexer = new MysqlLexer(options.lexer)
      this.splitter = new MysqlSplitter(options.lexer)
    } else if (options.dialect === 'postgres') {
      this.lexer = new PostgresLexer(options.lexer)
      this.splitter = new PostgresSplitter(options.lexer)
    } else if (options.dialect === 'oracle') {
      this.lexer = new OracleLexer(options.lexer)
      this.splitter = new OracleSplitter(options.lexer)
    } else {
      throw new TypeError(`Unknown dialect: ${options.dialect}`)
    }
  }

  compile(input: string, fileName?: string) {
    const segments = this.splitter.split(this.lexer.lex(input, fileName))
    let text = ""
    for (const segment of segments) {
      const parser = new ElderSqlParser(segment)
      const root = parser.parse()
      for (let i = 0; i < root.children.length; i++) {
        const child = root.children[i]
        if (child instanceof Node) {
          if (child.name === 'import') {
            text += 'import ' + (child.value ?? '') + ';'
          } else if (child.name === 'define') {
/*
            text += this.define(child)
            for () {

            }
            text += this.block(root.children[i+1])
            text += '}\n'
*/
          }
        } else if (child instanceof Token) {
          text += child.text
        }
      }
    }
    return new ElderSqlCompileResult(text, {})
  }

  private block(node: Node) {
    let text = ''
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      if (child instanceof Node) {
        if (child.name === 'if') {
          text += this.ifCondition(child, i)
        } else if (child.name === 'elif') {
        } else if (child.name === 'else') {
        } else if (child.name === 'for') {

        }
      } else if (child instanceof Token) {
        text += child.text
      }
    }
    return text
  }

  private ifCondition(node: Node, index: number) {
    let text = 'if (' + node.value + ') {'

    if (node.parent) {
      const next = node.parent.children[index + 1]
      if (!(next instanceof Node) || (next.name !== "elif" && next.name !== "else")) {
        text += '}'
      }
    }
    return text
  }
}

export class ElderSqlCompileResult {
  constructor(
    public js: string,
    public map: object,
  ) {
  }
}

export class ElderSqlError extends Error {
  constructor(err: Error) {
    super(err.message)

    this.name = "ElderSqlError"
  }
}

class ElderSqlLexer extends Lexer {
  constructor(
    options: { [key: string]: any } = {}
  ) {
    super("sqlite3", [
      { type: TokenType.BindVariable, re: /\/\*:.*?+*\*\//sy },
      { type: TokenType.ReplacementVariable, re: /\/\*\$.*?+*\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*%.+?\*\//sy },
      { type: TokenType.LineComment, re: /--%.*/y },
      { type: TokenType.String, re: /.+?(?\/\*[%:$].*?\*\/|$)/sy },
    ], options)
  }
}

class ElderSqlParser extends Parser {
  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  parse(): Node {
    const root = new Node("root")

    let current: Node | undefined = root
    while (this.token()) {
      if (!current) {
        throw this.createParseError()
      }
      if (this.peekIf(TokenType.BlockComment)) {
        const token = this.consume()
        let m
        if (m = /^\/\*%if([ \t\r\n(].+)\*\/$/.exec(token.text)) {
          const ifNode = new Node("if", m[1].trim())
          current = current.add(ifNode)
        } else if (m = /^\/\*%else[ /t/r/n]+if([ \t\r\n(].+)\*\/$/.exec(token.text)) {
          if (current.parent && (current.name === 'if' || current.name === 'else if')) {
            const elseIfNode = new Node("else if", m[1].trim())
            current = current.parent.add(elseIfNode)
          } else {
            throw this.createParseError()
          }
        } else if (m = /^\/\*%else[ \t\r\n]*\*\/$/.exec(token.text)) {
          if (current.parent && (current.name === 'if' || current.name === 'else if')) {
            const elseNode = new Node("else", m[1].trim())
            current = current.parent.add(elseNode)
          } else {
            throw this.createParseError()
          }
        } else if (m = /^\/\*%for([ \t\r\n(].+?:.+)\*\/$/.exec(token.text)) {
          current = current.add(new Node("for", m[1].trim()))
        } else if (m = /^\/\*%end[ \t\r\n]*\*\/$/.exec(token.text)) {
          if (current.name === 'if' || current.name === 'else if' || current.name === 'else' || current.name === 'for') {
            current = current.parent
          } else {
            throw this.createParseError()
          }
        } else if (m = /^\/\*%import([ \t\r\n].+?)\*\/$/.exec(token.text)) {
          if (current.name === 'root') {
            current.add(new Node("import", m[1].trim()))
          } else {
            throw this.createParseError()
          }
        } else {
          throw this.createParseError()
        }
      } else if (this.peekIf(TokenType.BindVariable)) {
        const token = this.consume()
        const childNode = new Node("bind_variable", 
          token.text.replace(/^\/\*:(.+)\*\/$/, "$1")
        ).add(token)
        current.add(childNode)
      } else if (this.peekIf(TokenType.ReplacementVariable)) {
        const token = this.consume()
        const childNode = new Node("replacement_variable", 
          token.text.replace(/^\/\*\$(.+)\*\/$/, "$1")
        ).add(token)
        current.add(childNode)
      } else if (this.peekIf(TokenType.LineComment)) {
        const token = this.consume()
        token.type = TokenType.String
        token.text = token.text.replace(/^--%/, '   ')
        current.add(token)
      } else {
        current.add(this.consume())
      }
    }

    return root
  }
}
