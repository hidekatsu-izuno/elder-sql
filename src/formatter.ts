import { EOL } from "node:os"
import { Node, Element, Text } from 'domhandler'
import { textContent } from 'domutils'
import { compile } from 'css-select'
import { Parser } from "./parser.js"

export declare type FormatActionType = "reset" | "indent" | "unindent" | "break" | "forcebreak" | "nospace" | "nobreak"

export declare type FormatPattern = {
  pattern: string
  before?: FormatActionType | FormatActionType[]
  after?: FormatActionType | FormatActionType[]
}

export declare type FormatterOptions = { 
  printWidth?: number
  tabWidth?: number
  useTabs?: boolean
  endOfLine?: "lf" | "crlf" | "cr" | "auto"
  [key: string]: any
}

export abstract class Formatter {
  private patterns = new Array<FormatPattern & {
    selecter: any
  }>()

  constructor(
    public parser: Parser,
    patterns: FormatPattern[],
    public options: FormatterOptions = {},
  ) {
    for (const pattern of patterns) {
      this.patterns.push({
        ...pattern,
        selecter: compile<Node, Element>(pattern.pattern, { xmlMode: true })
      })
    }
  }

  format(text: string, filename?: string): string {
    const out = new FormatWriter(this.options)
    this.formatElement(this.parser.parse(text, filename), out)
    return out.toString()
  }

  formatElement(node: Element, out: FormatWriter) {
    let before
    let after
    for (const pattern of this.patterns) {
      if (pattern.selecter(node)) {
        before = pattern.before
        after = pattern.after
        break
      }
    }

    if (before) {
      if (Array.isArray(before)) {
        for (const action of before) {
          out.control(action)
        }
      } else {
        out.control(before)
      }
    }
    if (node.name === "LineComment") {
      out.write(textContent(node), true)
    } else if (node.name === "BlockComment" || node.name === "HintComment") {
      const segments = textContent(node).split(/\r\n?|\n/g)
      for (let i = 0; i < segments.length; i++) {
        if (i > 0) {
          out.control("forcebreak")
        }
        out.write(segments[i], true)
      }
    } else if (node.name === "LineBreak") {
      out.control("break")
    } else if (node.name === "WhiteSpace") {
      // no handle
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i]
        if (child instanceof Element) {
          this.formatElement(child, out)
        } else if (child instanceof Text) {
          out.write(child.data, false)
        }
      }
    }
    if (after) {
      if (Array.isArray(after)) {
        for (const action of after) {
          out.control(action)
        }
      } else {
        out.control(after)
      }
    }
  }
}

class FormatWriter {
  private printWidth: number
  private indent: string
  private indentWidth: number
  private eol: string

  private text = ""
  private depth = 0
  private line = new Array<{ text: string, action?: string }>()
  private actions = new Array<FormatActionType>()

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

  control(action: FormatActionType) {
    this.actions.push(action)
  }

  write(text: string, skip: boolean) {
    const action = this.performActions()
    if (skip) {
      this.line.push({ text })
    } else {
      this.line.push({ text, action })
    }
  }

  toString() {
    this.control("break")
    this.performActions()
    return this.text.replace(/(\r\n?|\n)*$/, this.eol)
  }

  private performActions() {
    if (this.actions.length === 0) {
      return undefined
    }

    let action
    if (this.actions.some(action => action === "nospace")) {
      action = "nospace"
    } else if (this.actions.some(action => action === "nobreak")) {
      // no handle
    } else {
      let breaked = false
      for (const action of this.actions) {
        if (action === "reset") {
          this.flushLine()
          if (!breaked) {
            this.text += this.eol
            breaked = true
          }
          this.depth = 0
        } else if (action === "indent") {
          this.flushLine()
          if (!breaked) {
            this.text += this.eol
            breaked = true
          }
          this.depth++
        } else if (action === "unindent") {
          this.flushLine()
          if (!breaked) {
            this.text += this.eol
            breaked = true
          }
          this.depth--
        } else if (action === "forcebreak") {
          this.flushLine()
          this.text += this.eol
          breaked = true
        } else if (action === "break") {
          this.flushLine()
          if (!breaked) {
            this.text += this.eol
            breaked = true
          }
        } 
      }
    }
    this.actions.length = 0
    return action
  }

  private flushLine() {
    if (this.line.length === 0) {
      return
    }

    let first = true
    let width = this.indentWidth * (this.depth + (first ? 0 : 1))
    let text = this.indent.repeat((this.depth + (first ? 0 : 1)))
    for (let i = 0; i < this.line.length; i++) {
      const item = this.line[i]
      const nospace = i === 0 || item.action === "nospace"
      if (width + item.text.length + (nospace ? 0 : 1) < this.printWidth) {
        width += (nospace ? 0 : 1) + item.text.length
        text += (nospace ? "" : " ") + item.text
      } else {
        this.text += text + this.eol
        first = false

        width = this.indentWidth * (this.depth + (first ? 0 : 1)) + (nospace ? 0 : 1) + item.text.length
        text = this.indent.repeat((this.depth + (first ? 0 : 1))) + (nospace ? "" : " ") + item.text
      }
    }
    this.text += text
    this.line.length = 0
  }
}
