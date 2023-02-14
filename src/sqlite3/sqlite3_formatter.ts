import { EOL } from "node:os"
import { Token, TokenType } from "../lexer.js";
import { Node } from "../parser.js";
import { Formatter, FormatterOptions } from "../formatter.js";
import { Sqlite3Parser } from "./sqlite3_parser.js";

export class Sqlite3Formatter extends Formatter {
  private indent: string
  private eol: string

  constructor(
    options: FormatterOptions = {},
  ) {
    super(options.parser ?? new Sqlite3Parser(options), options)
    if (this.options.useTabs) {
      this.indent = "\t"
    } else {
      this.indent = " ".repeat(this.options.tabWidth)
    }
    if (this.options.endOfLine === "lf") {
      this.eol = "\n"
    } else if (this.options.endOfLine === "crlf") {
      this.eol = "\r\n"
    } else if (this.options.endOfLine === "cr") {
      this.eol = "\r"
    } else {
      this.eol = EOL
    }
  }

  formatNode(node: Node): string {
    const out = new Array<string>()

    const formatTokens = (tokens: Token[], level: number) => {
      let text = ""
      if (level > 0) {
        text += this.indent.repeat(level)
      }
      
      for (const token of tokens) {
        if (/[A-Za-z0-9)]$/.test(text) && /^[A-Za-z0-9]/.test(token.text)) {
          text += " "
        }
        text += token.text
      }
      text += this.eol
      return text
    }

    const flatten = (child: Token | Node, tokens: Token[]) => {
      if (child instanceof Node) {
        for (const child2 of child.children) {
          flatten(child2, tokens)
        }
      } else {
        for (const skip of child.preskips) {
          if (skip.type !== TokenType.WhiteSpace) {
            tokens.push(skip)
          }
        }
        tokens.push(child)
        for (const skip of child.postskips) {
          if (skip.type !== TokenType.WhiteSpace) {
            tokens.push(skip)
          }
        }  
      }
    }

    const formatter = (current: Node, level: number) => {
      let delta = 0
      let tokens = [] as Token[]
      for (const child of current.children) {
        if (child instanceof Node) {
          if (/(Column|Name|Expression)$/.test(child.name)) {
            flatten(child, tokens)
          } else {
            if (tokens.length > 0) {
              out.push(formatTokens(tokens, level))
              tokens = []
            }
            formatter(child, level + delta)  
          }
        } else {
          if (current.name === "Script") {
            // no handle
          } else {
            delta = 1
          }
          flatten(child, tokens)
        }
      }
      if (tokens.length > 0) {
        out.push(formatTokens(tokens, level))
        tokens = []  
      }
    }
    formatter(node, 0)
    return out.join("")
  }
}