import { EOL } from "node:os"
import { Keyword, Token, TokenType } from "./lexer.js"
import { Node, Parser } from "./parser.js"

export declare type FormatPattern = {
  node?: (string | RegExp)[]
  token?: TokenType | Keyword
  before?: "reset" | "indent" | "unindent" | "break" | "nospace"
  after?: "reset" | "indent" | "unindent" | "break" | "nospace"
}

export declare type FormatterOptions = { 
  printWidth?: number
  tabWidth?: number
  useTabs?: boolean
  endOfLine?: "lf" | "crlf" | "cr" | "auto"
  [key: string]: any
}

export abstract class Formatter {
  constructor(
    public parser: Parser,
    public patterns: FormatPattern[],
    public options: FormatterOptions = {},
  ) {
  }

  format(text: string, filename?: string): string {
    const out = new FormatWriter(this.options)
    this.formatNode(this.parser.parse(text, filename), out)
    return out.toString()
  }

  formatNode(node: Node, out: FormatWriter) {
    let before
    let after
    for (const item of this.patterns) {
      if (item.node && !item.token) {
        let hit = true
        let current: Node | undefined = node
        for (let i = 0; i < item.node.length; i++) {
          const pattern = item.node[item.node.length - i - 1]
          if (current && current.is(pattern)) {
            current = current.parent()
          } else {
            hit = false
            break
          }
        }
        if (hit) {
          before = item.before
          after = item.after
          break
        }
      }
    }

    if (before) {
      out.control(before)
    }
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      if (child instanceof Node) {
        this.formatNode(child, out)
      } else {
        let before
        let after
        for (const item of this.patterns) {
          if (item.token && child.is(item.token)) {
            let hit = true
            if (item.node) {
              let current: Node | undefined = node
              for (let i = 0; i < item.node.length; i++) {
                const pattern = item.node[item.node.length - i - 1]
                if (current && current.is(pattern)) {
                  current = current.parent()
                } else {
                  hit = false
                  break
                }
              }  
            }
            if (hit) {
              before = item.before
              after = item.after
              break
            }
          }
        }

        if (before) {
          out.control(before)
        }
        for (const skip of child.preskips) {
          if (skip.type === TokenType.LineComment) {
            out.write(skip)
          } else if (skip.type === TokenType.BlockComment || skip.type === TokenType.HintComment) {
            const segments = skip.text.split(/\r\n?|\n/g)
            for (let i = 0; i = segments.length; i++) {
              if (i > 0) {
                out.control("break", true)
              }
              out.write(new Token(skip.type, segments[i]))
            }
          } else if (skip.type === TokenType.LineBreak) {
            out.control("break")
          }
        }
        out.write(child)
        for (const skip of child.postskips) {
          if (skip.type === TokenType.LineComment) {
            out.write(skip)
          } else if (skip.type === TokenType.BlockComment || skip.type === TokenType.HintComment) {
            const segments = skip.text.split(/\r\n?|\n/g)
            for (let i = 0; i = segments.length; i++) {
              if (i > 0) {
                out.control("break", true)
              }
              out.write(new Token(skip.type, segments[i]))
            }
          } else if (skip.type === TokenType.LineBreak) {
            out.control("break")
          }
        }
        if (after) {
          out.control(after)
        }
        if (child.eos) {
          out.control("break", true)
          out.control("reset")
        }
      }
    }
    if (after) {
      out.control(after)
    }
  }
}

type FormatToken = {
  token: Token,
  nospace: boolean,
}

class FormatWriter {
  private printWidth: number
  private indent: string
  private indentWidth: number
  private eol: string

  private text = ""
  private depth = 0
  private line: FormatToken[] = []
  private action?: "reset" | "indent" | "unindent" | "break" | "nospace"

  constructor(options: FormatterOptions) {
    this.printWidth = options.printWidth ?? 80
    if (options.useTabs) {
      this.indent = "\t"
      this.indentWidth = options.tabWidth ?? 2
    } else {
      this.indent = " ".repeat(options.tabWidth ?? 2)
      this.indentWidth = options.tabWidth ?? 2
    }
    if (options.endOfLine === "crlf") {
      this.eol = "\r\n"
    } else if (options.endOfLine === "cr") {
      this.eol = "\r"
    } else if (options.endOfLine === "auto") {
      this.eol = EOL
    } else {
      this.eol = "\n"
    }
  }

  control(action: "reset" | "indent" | "unindent" | "break" | "nospace", force: boolean = false) {
    if (action === "reset") {
      if (this.line.length > 0) {
        this.flushLine()
      }
      this.depth = 0
      action = "break"
    } else if (action === "indent") {
      if (this.line.length > 0) {
        this.flushLine()
      }
      this.depth++
      action = "break"
    } else if (action === "unindent") {
      if (this.line.length > 0) {
        this.flushLine()
      }
      this.depth--
      action = "break"
    } else if (action === "break") {
      if (force || this.line.length > 0 || this.action !== "break") {
        this.flushLine()
      }
    }
    this.action = action
  }

  write(token: Token) {
    if (token.type.skip) {
      this.line.push({
        token: token,
        nospace: false,
      })
    } else {
      this.line.push({
        token: token,
        nospace: this.action === "nospace",
      })
      this.action = undefined  
    }
  }

  toString() {
    this.flushLine()
    return this.text
  }

  private flushLine() {
    let first = true
    let width = this.indentWidth * (this.depth + (first ? 0 : 1))
    let text = this.indent.repeat((this.depth + (first ? 0 : 1)))
    for (let i = 0; i < this.line.length; i++) {
      const item = this.line[i]
      const nospace = i === 0 || item.nospace
      if (width + item.token.text.length + (nospace ? 0 : 1) < this.printWidth) {
        width += (nospace ? 0 : 1) + item.token.text.length
        text += (nospace ? "" : " ") + item.token.text
      } else {
        this.text += text + this.eol
        first = false

        width = this.indentWidth * (this.depth + (first ? 0 : 1)) + (nospace ? 0 : 1) + item.token.text.length
        text = this.indent.repeat((this.depth + (first ? 0 : 1))) + (nospace ? "" : " ") + item.token.text
      }
    }
    this.text += text + this.eol
    this.line.length = 0
  }
}