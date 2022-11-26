import { Node, Token } from "./parser"

export function toJSString(target: Node | Token | (Node |Token)[], space: number = 0) {
    const spaces = " ".repeat(space)
    let text = ""
    if (Array.isArray(target)) {
      text += spaces + "[\n"
      let index = 0
      for (const item of target) {
        if (index > 0) {
          text += ",\n"
        }
        text += spaces + spaces + toJSString(item, space + 1)
        index++
      }
      text += "\n" + spaces + "]"
    } else if (target instanceof Node) {
        text += spaces + "new Node(" + JSON.stringify(target.name)
        if (target.value !== undefined) {
            text += ", " + JSON.stringify(target.value)
        }
        text += ")"
        for (const child of target.children) {
            const ctext = toJSString(child, space + 1).trimStart()
            text += "\n" + spaces + spaces + ".add(" + ctext
            if (ctext.includes("\n")) {
                if (child instanceof Node) {
                    text += "\n" + spaces + ")"
                } else {
                    text += ")"
                }
            } else {
                text += ")"
            }
        }
    } else if (target instanceof Token) {
        text += spaces + "new Token("
        if (target.subtype !== undefined) {
            text += "[" 
                + target.type.constructor.name + "." + target.type.name + ", " 
                + target.subtype.constructor.name + "." + target.subtype.name + "]"
        } else {
            text += target.type.constructor.name + "." + target.type.name
        }
        text += ", " + JSON.stringify(target.text)
        text += ", " + target.pos
        if (target.before.length) {
            text += ", ["
            for (let i = 0; i < target.before.length; i++) {
                if (i > 0) {
                    text += ","
                }
                const ctext = toJSString(target.before[i], space + 1).trimStart()
                text += "\n" + spaces + spaces + ctext
            }
            text += "\n" + spaces + "]"
        }
        text += ")"
    } else {
        text += space + target
    }
    return text
}