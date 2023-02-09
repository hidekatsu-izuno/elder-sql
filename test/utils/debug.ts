import { Token } from "../../src/lexer.js"
import { Node } from "../../src/parser.js"

export function toJSScript(target: Node | Token | (Node | Token)[]) {
  let imports = 'import { SourceLocation, Token, TokenType, Keyword } from "../../../src/lexer"\n'
  if (target instanceof Node) {
    imports += 'import { Node } from "../../../src/parser"\n'
  }

  return (
    '' + imports + '\n' +
    'export default ' + toJSString(target) + '\n'
  )
}

export function toJSString(target: Node | Token | (Node | Token)[], options: {
  space?: number,
} = {}) {
  const space = options.space ?? 0

  let text = ""
  if (Array.isArray(target)) {
    text += " ".repeat(space * 2) + "[\n"
    let index = 0
    for (const item of target) {
      if (index > 0) {
        text += ",\n"
      }
      text += " ".repeat((space + 1) * 2) + toJSString(item, { space: space + 1 })
      index++
    }
    text += "\n" + " ".repeat(space * 2) + "]"
  } else if (target instanceof Node) {
    text += " ".repeat(space * 2) + "new Node(" + JSON.stringify(target.name)
    if (Object.keys(target.data).length > 0 || target.children.length > 0) {
      text += ", node => {\n"
      if (Object.keys(target.data).length > 0) {
        text += " ".repeat((space + 1) * 2) + "node.data = " + JSON.stringify(target.data) + "\n"
      }
      for (const child of target.children) {
        const ctext = toJSString(child, { space: space + 1 }).trimStart()
        text += " ".repeat((space + 1) * 2) + "node.append(" + ctext + ")\n"
      }
      text += " ".repeat(space * 2) + "})"
    } else {
      text += ")"
    }
  } else if (target instanceof Token) {
    text += " ".repeat(space * 2) + "new Token("
    text += "TokenType." + target.type.name
    text += ", " + JSON.stringify(target.text)
    if (target.keyword || target.preskips.length || target.postskips.length || target.location) {
      text += ", { "
      const elems = new Array<string>()
      if (target.keyword) {
        elems.push("keyword: Keyword." + target.keyword.name)
      }
      if (target.eos) {
        elems.push("eos: " + target.eos)
      }
      if (target.preskips.length) {
        elems.push("preskips: [" + target.preskips.map(t => toJSString(t)).join(", ") + "]")
      }
      if (target.postskips.length) {
        elems.push("postskips: [" + target.postskips.map(t => toJSString(t)).join(", ") + "]")
      }
      if (target.location) {
        let elem = "location: new SourceLocation("
        if (target.location.fileName != null) {
          elem += (target.location.position ?? 'undefined') + ", "
            + (target.location.lineNumber ?? 'undefined') + ", "
            + (target.location.columnNumber ?? 'undefined') + ", "
            + JSON.stringify(target.location.fileName)
        } else if (target.location.columnNumber != null) {
          elem += (target.location.position ?? 'undefined') + ", "
            + (target.location.lineNumber ?? 'undefined') + ", "
            + target.location.columnNumber
        } else if (target.location.lineNumber != null) {
          elem += (target.location.position ?? 'undefined') + ", "
            + target.location.lineNumber
        } else if (target.location.position != null) {
          elem += target.location.position
        }
        elem += ")"
        elems.push(elem)
      }
      text += elems.join(", ")
      text += "}"
    }
    text += ")"
  } else {
    text += space + target
  }
  return text
}