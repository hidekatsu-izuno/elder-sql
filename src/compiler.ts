import { MysqlLexer } from "./mysql/mysql_lexer"
import { OracleLexer } from "./oracle/oracle_lexer"
import { Token, TokenType, Lexer } from "./lexer"
import { TokenReader } from "./parser"
import { PostgresLexer } from "./postgres/postgres_lexer"
import { Sqlite3Lexer } from "./sqlite3/sqlite3_lexer"

export type ElderSqlCompilerOptions = {
  dialect: 'sqlite3' | 'mysql' | 'postgres' | 'oracle'
  lexer?: Record<string, any>
}

class ElderSqlType extends TokenType {
  static Import = new ElderSqlType("Import")
  static Define = new ElderSqlType("Define")
  static If = new ElderSqlType("If")
  static Elif = new ElderSqlType("Elif")
  static Else = new ElderSqlType("Else")
  static For = new ElderSqlType("For")
  static End = new ElderSqlType("End")
  static TypeHint = new ElderSqlType("TypeHint")
  static BindVariable = new ElderSqlType("BindVariable")
  static ReplacementVariable = new ElderSqlType("ReplacementVariable")
  static Comment = new ElderSqlType("Comment")
  static Uncomment = new ElderSqlType("Uncomment")
  
  constructor(
    name: string, 
    options: Record<string, any> = {}
  ) {
    super(name, options)
  }
}

export class ElderSqlCompiler {
  private lexer: Lexer

  constructor(public options: ElderSqlCompilerOptions) {
    if (options.dialect === 'sqlite3') {
      this.lexer = new Sqlite3Lexer(options.lexer)
    } else if (options.dialect === 'mysql') {
      this.lexer = new MysqlLexer(options.lexer)
    } else if (options.dialect === 'postgres') {
      this.lexer = new PostgresLexer(options.lexer)
    } else if (options.dialect === 'oracle') {
      this.lexer = new OracleLexer(options.lexer)
    } else {
      throw new TypeError(`Unknown dialect: ${options.dialect}`)
    }
  }

  compile(input: string, fileName?: string) {
    let text = ""

    const tokens = this.lexer.lex(input, fileName)
    const segment = new Array<Token>()
    for (const token of tokens) {
      if (token.is(TokenType.Delimiter) || token.is(TokenType.Eof)) {
        text += this.compileSegment(segment)
        segment.length = 0
      } else {
        for (let j = 0; j < token.skips.length; j++) {
          const skipToken = token.skips[j]
          const elderSqlType = this.getElderSqlType(skipToken)
          if (elderSqlType) {
            skipToken.type = elderSqlType
            if (j > 0) {
              skipToken.skips = token.skips.splice(0, j)
            }
            token.skips.splice(0, 1)
            segment.push(skipToken)
            j = 0
          }
        }
        segment.push(token)
      }
    }

    if (text) {
      text += `function sandbox(context, expr) {\n`
      text += `  return (new Function("context", "with (context) " + expr))(context)\n`
      text += `}\n`
    }

    return new ElderSqlCompileResult(text, {})
  }

  private compileSegment(segment: Token[]) {
    let text = ""

    const reader = new TokenReader(segment)
    let m
    while (reader.peekIf(ElderSqlType.Import)) {
      const importToken = reader.consume()
      if (!(m = /^\/\*#import[ \t](.*?)\*\/$/su.exec(importToken.text))) {
        throw reader.createParseError()
      }
      text += `import ${m[1]}/\n`
    }
    if (reader.peekIf(ElderSqlType.Define)) {
      const defineToken = reader.consume()
      if (!(m = /^\/\*#define[ \t]([^ \t\r\n]+)[ \t]*\r?\n(.*?)\*\/$/su.exec(defineToken.text))) {
        throw reader.createParseError()
      }
      if (!this.checkIdentifier(m[1])) {
        throw reader.createParseError()
      }
      text += `\n`
      text += `/**\n${m[2].trimStart()}*/\n`
      text += `export function ${m[1]}(engine, params) {\n`
      text += `  const text = ""\n`
      text += `  const args = []\n`
      text += `  const context0 = {...params}\n`
      const blocks = []
      let buffer = ""
      const params = []
      while (reader.token()) {
        if (reader.peekIf(ElderSqlType.If)) {
          const ifToken = reader.consume()
          if (!(m = /^\/\*#if[ \t](.*?)\*\/$/s.exec(ifToken.text))) {
            throw reader.createParseError()
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)}\n`
            buffer = ""
          }
          text += `  ${"  ".repeat(blocks.length)}if (${m[1].trim()}) {\n`
          blocks.push(ElderSqlType.If)
        } else if (reader.peekIf(ElderSqlType.Elif)) {
          const elifToken = reader.consume()
          if (!(blocks[blocks.length-1] === ElderSqlType.If || blocks[blocks.length-1] === ElderSqlType.Elif)) {
            throw reader.createParseError()
          }
          if (!(m = /^\/\*#elif[ \t](.*?)\*\/$/s.exec(elifToken.text))) {
            throw reader.createParseError()
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)}\n`
            buffer = ""
          }
          blocks.pop()
          text += `  ${"  ".repeat(blocks.length)}} else if (${m[1].trim()}) {\n`
          blocks.push(ElderSqlType.Elif)
        } else if (reader.peekIf(ElderSqlType.Else)) {
          reader.consume()
          if (!(blocks[blocks.length-1] === ElderSqlType.If
            || blocks[blocks.length-1] === ElderSqlType.Elif)) {
            throw reader.createParseError()
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)}\n`
            buffer = ""
          }
          blocks.pop()
          text += `  ${"  ".repeat(blocks.length)}} else {\n`
          blocks.push(ElderSqlType.Else)
        } else if (reader.peekIf(ElderSqlType.For)) {
          const forToken = reader.consume()
          if (!(m = /^\/\*#for[ \t](?:[ \t\r\n]*\((.+?)(?:,(.+?))?\)[ \t\r\n]*|.+?):(.+?)\*\/$/s.exec(forToken.text))) {
            throw reader.createParseError()
          }
          if ((m[1] && !this.checkIdentifier(m[1])) ||
            (m[2] && !this.checkIdentifier(m[2])) ||
            (m[3] && !this.checkIdentifier(m[3]))) {
            throw reader.createParseError()
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)}\n`
            buffer = ""
          }
          const items = m[4].trim()
          const item = m[3] ? m[3].trim() : m[2] ? `${m[1].trim()}, ${m[2].trim()}` : m[1].trim()
          text += `  ${"  ".repeat(blocks.length)}(${items}).forEach((${item}) => {\n`
          blocks.push(ElderSqlType.For)
          const depth = blocks.reduce((n, t) => t === ElderSqlType.For ? n + 1 : n, 0)
          text += `  ${"  ".repeat(blocks.length)}const context${depth} = {...params, ${item}}\n`
        } else if (reader.peekIf(ElderSqlType.End)) {
          reader.consume()
          if (!(
            blocks[blocks.length-1] === ElderSqlType.If
            || blocks[blocks.length-1] === ElderSqlType.Elif
            || blocks[blocks.length-1] === ElderSqlType.Else
          )) {
            if (buffer.length) {
              text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)}\n`
              buffer = ""
            }
            blocks.pop()
            text += `  ${"  ".repeat(blocks.length)}\n`
          } else if (!(
            blocks[blocks.length-1] === ElderSqlType.For
          )) {
            blocks.pop()
            if (buffer.length) {
              text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)}\n`
              buffer = ""
            }
            text += `  ${"  ".repeat(blocks.length)})\n`
          } else {
            throw reader.createParseError()
          }
        } else if (reader.peekIf(ElderSqlType.BindVariable)) {
          const bindToken = reader.consume()
          if (!(m = /^\/\*#{(.*)}\*\/$/s.exec(bindToken.text))) {
            throw reader.createParseError()
          }
          const depth = blocks.reduce((n, t) => t === ElderSqlType.For ? n + 1 : n, 0)
          text += `  ${"  ".repeat(blocks.length)}text += "?"\n`
          text += `  ${"  ".repeat(blocks.length)}args.push(sandbox(context${depth}, ${JSON.stringify(m[1].trim())}))\n`
        } else if (reader.peekIf(ElderSqlType.ReplacementVariable)) {
          const bindToken = reader.consume()
          if (!(m = /^\/\*\${(.*)}\*\/$/s.exec(bindToken.text))) {
            throw reader.createParseError()
          }
          const depth = blocks.reduce((n, t) => t === ElderSqlType.For ? n + 1 : n, 0)
          text += `  ${"  ".repeat(blocks.length)}text += sandbox(context${depth}, ${JSON.stringify(m[1].trim())})\n`
        } else {
          const otherToken = reader.consume()
          for (const skip of otherToken.skips) {
            buffer += skip.text
          }
          buffer += otherToken.text
        }
      }
      if (blocks.length) {
        throw reader.createParseError()
      }
      if (buffer.length) {
        text += `  text += ${JSON.stringify(buffer)}\n`
      }
      text += `  return engine.execute(text, args)\n`
      text += `}\n`
    }

    return text
  }

  private getElderSqlType(token: Token) {
    if (token.is(TokenType.BlockComment)) {
      if (/^\/\*#import[ \t\r\n]/s.test(token.text)) {
        return ElderSqlType.Define
      } else if (/^\/\*#define[ \t]/s.test(token.text)) {
        return ElderSqlType.Define
      } else if (/^\/\*#if[ \t\r\n]/s.test(token.text)) {
        return ElderSqlType.If
      } else if (/^\/\*#elif[ \t\r\n]/s.test(token.text)) {
        return ElderSqlType.Elif
      } else if (/^\/\*#else([ \t\r\n]|\*\/$)/s.test(token.text)) {
        return ElderSqlType.Else
      } else if (/^\/\*#for[ \t\r\n]/s.test(token.text)) {
        return ElderSqlType.For
      } else if (/^\/\*#end([ \t\r\n]|\*\/$)/s.test(token.text)) {
        return ElderSqlType.End
      } else if (/^\/\*:/s.test(token.text)) {
        return ElderSqlType.TypeHint
      } else if (/^\/\*#{[^}]*}\*\/$/s.test(token.text)) {
        return ElderSqlType.BindVariable
      } else if (/^\/\*\${.*}\*\/$/s.test(token.text)) {
        return ElderSqlType.ReplacementVariable
      }
    } else if (token.is(TokenType.LineComment)) {
      if (token.text.startsWith("--#")) {
        return ElderSqlType.Comment
      } else if (token.text.startsWith("--*")) {
        return ElderSqlType.Uncomment
      }
    }
    return undefined
  }

  private checkIdentifier(text: string) {
    return true
    //return /^[$_p{ID_Start}][$u200cu200dp{ID_Continue}]*$/u.test(text)
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
