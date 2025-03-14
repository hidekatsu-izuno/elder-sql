import { Token, TokenType, Lexer, Keyword } from "./lexer.js"
import { TokenReader } from "./lexer.js"
import { MysqlLexer } from "./mysql/mysql_lexer.js"
import { OracleLexer } from "./oracle/oracle_lexer.js"
import { PostgresLexer } from "./postgres/postgres_lexer.js"
import { Sqlite3Lexer } from "./sqlite3/sqlite3_lexer.js"
import { MssqlLexer } from "./mssql/mssql_lexer.js"
import { isJSIdentifier, isJSExpression } from './utils.js'

export type ElderSqlCompilerOptions = {
  dialect: "sqlite3" | "mysql" | "postgres" | "oracle" | "mssql"
  lexer?: Record<string, any>
}

const ElderSqlType = {
  Import: new TokenType("Import"),
  Define: new TokenType("Define"),
  If: new TokenType("If"),
  Elif: new TokenType("Elif"),
  Else: new TokenType("Else"),
  For: new TokenType("For"),
  End: new TokenType("End"),
  TypeHint: new TokenType("TypeHint"),
  BindVariable: new TokenType("BindVariable"),
  ReplacementVariable: new TokenType("ReplacementVariable"),
  Comment: new TokenType("Comment"),
}

export class ElderSqlCompiler {
  public options: ElderSqlCompilerOptions
  private lexer: Lexer

  constructor(options: ElderSqlCompilerOptions) {
    this.options = options;
    if (options.dialect === 'sqlite3') {
      this.lexer = new Sqlite3Lexer(options.lexer)
    } else if (options.dialect === 'mysql') {
      this.lexer = new MysqlLexer(options.lexer)
    } else if (options.dialect === 'postgres') {
      this.lexer = new PostgresLexer(options.lexer)
    } else if (options.dialect === 'oracle') {
      this.lexer = new OracleLexer(options.lexer)
    } else if (options.dialect === 'mssql') {
      this.lexer = new MssqlLexer(options.lexer)
    } else {
      throw new TypeError(`Unknown dialect: ${options.dialect}`)
    }
  }

  compile(input: string, fileName?: string) {
    let text = ""

    const tokens = this.lexer.lex(input.replace(/^--\*/mg, '   '), fileName)
    const segment = new Array<Token>()
    for (const token of tokens) {
      for (let i = 0; i < token.preskips.length; i++) {
        const skipToken = token.preskips[i]
        const elderSqlType = this.getElderSqlType(skipToken)
        if (elderSqlType) {
          skipToken.type = elderSqlType
          if (i > 0) {
            skipToken.preskips = token.preskips.splice(0, i)
          }
          token.preskips.splice(0, 1)
          segment.push(skipToken)
          i = 0
        }
      }
      segment.push(token)
      if (token.is(TokenType.Delimiter) || token.is(TokenType.EoF)) {
        text += this.compileSegment(segment)
        segment.length = 0
      }
    }

    return new ElderSqlCompileResult(text, {})
  }

  private compileSegment(segment: Token[]) {
    let text = ""

    const tr = new TokenReader(segment)
    let m
    while (tr.peekIf(ElderSqlType.Import)) {
      const importToken = tr.peek()
      if (!(m = /^\/\*#import[ \t](.*?)\*\/$/su.exec(importToken.text))) {
        throw tr.createParseError()
      }

      tr.consume()
      if (tr.peek()?.preskips[0]?.is(TokenType.LineBreak)) {
        tr.peek().preskips.shift()
      }

      text += `import ${m[1]};/\n`
    }
    if (tr.peekIf(ElderSqlType.Define)) {
      const defineToken = tr.peek()
      if (!(m = /^\/\*#define[ \t]([^\r\n]*)\r?\n(.*?)\*\/$/su.exec(defineToken.text))) {
        throw tr.createParseError()
      }
      const ident = m[1].trim()
      if (!isJSIdentifier(ident)) {
        throw tr.createParseError()
      }

      tr.consume()
      if (tr.peek()?.preskips[0]?.is(TokenType.LineBreak)) {
        tr.peek().preskips.shift()
      }

      text += `/**\n${m[2]}*/\n`
      text += `export function ${m[1]}(engine, params) {\n`
      text += `  let text = "";\n`
      text += `  const args = [];\n`
      text += `  const ctx0 = { ...params };\n`
      const blocks = []
      let buffer = ""
      while (tr.peek()) {
        if (tr.peekIf(ElderSqlType.If)) {
          const token = tr.peek()
          if (!(m = /^\/\*#if[ \t](.*)\*\/$/s.exec(token.text))) {
            throw tr.createParseError()
          }
          const expr = m[1].trim()
          if (!isJSExpression(expr)) {
            throw tr.createParseError()
          }

          tr.consume()
          
          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }

          text += `  ${"  ".repeat(blocks.length)}if (sandbox(${expr})) {\n`
          blocks.push(ElderSqlType.If)
        } else if (tr.peekIf(ElderSqlType.Elif)) {
          const token = tr.peek()
          if (blocks[blocks.length-1] !== ElderSqlType.If && blocks[blocks.length-1] !== ElderSqlType.Elif) {
            throw tr.createParseError()
          }
          if (!(m = /^\/\*#elif[ \t](.*?)\*\/$/s.exec(token.text))) {
            throw tr.createParseError()
          }
          const expr = m[1].trim()
          if (!isJSExpression(expr)) {
            throw tr.createParseError()
          }

          tr.consume()
          
          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }

          blocks.pop()
          text += `  ${"  ".repeat(blocks.length)}} else if (${expr}) {\n`
          blocks.push(ElderSqlType.Elif)
        } else if (tr.peekIf(ElderSqlType.Else)) {
          if (blocks[blocks.length-1] !== ElderSqlType.If && blocks[blocks.length-1] !== ElderSqlType.Elif) {
            throw tr.createParseError()
          }

          const token = tr.consume()
          
          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }

          blocks.pop()
          text += `  ${"  ".repeat(blocks.length)}} else {\n`
          blocks.push(ElderSqlType.Else)
        } else if (tr.peekIf(ElderSqlType.For)) {
          const token = tr.peek()
          if (!(m = /^\/\*#for[ \t\r\n]([^:]+):(.*)\*\/$/s.exec(token.text))) {
            throw tr.createParseError()
          }
          const parts = m[1].split(',')
          const ident = parts[0].trim()
          const index = parts[1]?.trim()
          const expr = m[2].trim()
          if (!isJSIdentifier(ident) || !(index == null || isJSIdentifier(index))) {
            throw tr.createParseError()
          }
          if (!isJSExpression(expr)) {
            throw tr.createParseError()
          }

          tr.consume()
          
          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }

          text += `  ${"  ".repeat(blocks.length)}(${expr}).forEach((${index ? ident + ", " + index : ident}) => {\n`
          blocks.push(ElderSqlType.For)
          const depth = blocks.reduce((n, t) => t === ElderSqlType.For ? n + 1 : n, 0)
          text += `  ${"  ".repeat(blocks.length)}const ctx${depth} = {...ctx${depth-1}, ${index ? ident + ", " + index : ident}};\n`
        } else if (tr.peekIf(ElderSqlType.End)) {
          const token = tr.consume()

          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }

          if (blocks[blocks.length-1] === ElderSqlType.If
            || blocks[blocks.length-1] === ElderSqlType.Elif
            || blocks[blocks.length-1] === ElderSqlType.Else) {
            blocks.pop()
            text += `  ${"  ".repeat(blocks.length)}}\n`
          } else if (blocks[blocks.length-1] === ElderSqlType.For) {
            blocks.pop()
            text += `  ${"  ".repeat(blocks.length)}})\n`
          } else {
            throw tr.createParseError()
          }
        } else if (tr.peekIf(ElderSqlType.BindVariable)) {
          const token = tr.peek()
          if (!(m = /^\/\*#\{(.*)\}\*\/$/s.exec(token.text))) {
            throw tr.createParseError()
          }

          const isInOperator = tr.peek(-1)?.is(Keyword.IN)

          const expr = m[1].trim()
          tr.consume()
          if (tr.peek()?.preskips.length === 0) {
            if (tr.peekIf(TokenType.LeftParen)) {
              tr.consume()
              let depth = 0
              while (tr.peek()
                && !tr.peekIf(TokenType.Delimiter)
                && !tr.peekIf(TokenType.EoF)) {
                if (tr.peekIf(TokenType.LeftParen)) {
                  tr.consume()
                  depth++
                } else if (tr.peekIf(TokenType.RightParen)) {
                  tr.consume()
                  if (depth === 0) {
                    break
                  }
                  depth--
                } else {
                  tr.consume()
                }
              }
            } else if (tr.peekIf({ type: TokenType.Operator, text: /^[+-]$/ }, TokenType.Numeric)) {
              tr.consume()
              tr.consume()
            } else if (tr.peekIf(TokenType.String)
              || tr.peekIf(TokenType.Numeric)
              || tr.peekIf(Keyword.TRUE)
              || tr.peekIf(Keyword.FALSE)
              || tr.peekIf(Keyword.NULL)) {
              tr.consume()
            }
          }

          const depth = blocks.reduce((n, t) => t === ElderSqlType.For ? n + 1 : n, 0)
          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length > 0) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }
          if (isInOperator) {
            text += `  ${"  ".repeat(blocks.length)}text += "(";\n`
            text += `  ${"  ".repeat(blocks.length)}args.push((new Function("ctx", ${JSON.stringify("with (ctx) return (" + expr + ")")}))(ctx${depth}));\n`
            text += `  ${"  ".repeat(blocks.length)}text += ",?".repeat(Array.isArray(args[args.length - 1]) ? args[args.length - 1].length : 1).substring(1);\n`
            text += `  ${"  ".repeat(blocks.length)}text += ")";\n`
          } else {
            text += `  ${"  ".repeat(blocks.length)}args.push((new Function("ctx", ${JSON.stringify("with (ctx) return (" + expr + ")")}))(ctx${depth}));\n`
            text += `  ${"  ".repeat(blocks.length)}text += "?";\n`
          }
        } else if (tr.peekIf(ElderSqlType.ReplacementVariable)) {
          const token = tr.peek()
          if (!(m = /^\/\*\$\{(.*)\}\*\/$/s.exec(token.text))) {
            throw tr.createParseError()
          }
          const repl = m[1].trim()

          tr.consume()

          for (const skip of token.preskips) {
            buffer += skip.text
          }
          if (buffer.length) {
            text += `  ${"  ".repeat(blocks.length)}text += ${JSON.stringify(buffer)};\n`
            buffer = ""
          }
          const depth = blocks.reduce((n, t) => t === ElderSqlType.For ? n + 1 : n, 0)
          text += `  ${"  ".repeat(blocks.length)}text += (new Function("ctx", ${JSON.stringify("with (ctx) return (" + repl + ")")}))(ctx${depth});\n`
        } else {
          const token = tr.consume()
          for (const skip of token.preskips) {
            buffer += skip.text
          }
          buffer += token.text
        }
      }
      if (blocks.length) {
        throw tr.createParseError()
      }
      if (buffer.length) {
        text += `  text += ${JSON.stringify(buffer)};\n`
      }
      text += `  return engine.execute(text, args);\n`
      text += `}\n`
      text += `\n`
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
      } else if (/^\/\*#\{.*\}\*\/$/s.test(token.text)) {
        return ElderSqlType.BindVariable
      } else if (/^\/\*\$\{.*\}\*\/$/s.test(token.text)) {
        return ElderSqlType.ReplacementVariable
      }
    } else if (token.is(TokenType.LineComment)) {
      if (token.text.startsWith("--#")) {
        return ElderSqlType.Comment
      }
    }
    return undefined
  }
}

export class ElderSqlCompileResult {
  public js: string
  public map: object

  constructor(
    js: string,
    map: object,
  ) {
    this.js = js;
    this.map = map;
  }
}

export class ElderSqlError extends Error {
  constructor(err: Error) {
    super(err.message)

    this.name = "ElderSqlError"
  }
}
