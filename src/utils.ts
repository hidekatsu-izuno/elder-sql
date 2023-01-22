import { parseExpressionAt } from "acorn"

const acornOption: acorn.Options = {
  ecmaVersion: "latest"
}

export function lcase(text: string) {
  return text.toLowerCase()
}

export function ucase(text: string) {
  return text.toUpperCase()
}

export function lcamel(text: string) {
  return text.replace(/(^|[_ \t-]+)([a-zA-Z])|(.)/g, (m, g1, g2, g3) => {
    if (g2) {
      if (g1) {
        return g2.toUpperCase()
      } else {
        return g2.toLowerCase()
      }
    } else {
      return g3.toLowerCase()
    }
  })
}

export function ucamel(text: string) {
  return text.replace(/(^|[_ \t-]+)([a-zA-Z])|(.)/g, (m, g1, g2, g3) => {
    if (g2) {
      return g2.toUpperCase()
    } else {
      return g3.toLowerCase()
    }
  })
}

export function squote(text: string) {
  return "'" + text.replace(/"/g, "''") + "'"
}

export function dquote(text: string) {
  return '"' + text.replace(/"/g, '""') + '"'
}

export function bquote(text: string) {
  return "`" + text.replace(/`/g, "``") + "`"
}

export function dequote(text: string) {
  if (text.length >= 2) {
    const sc = text.charAt(0)
    const ec = text.charAt(text.length-1)
    if (sc === "[" && ec === "]") {
      return text.substring(1, text.length - 1)
    } else if (sc === "`" && sc === ec) {
      return text.substring(1, text.length - 1).replace(/``/g, sc)
    } else if (sc === '"' && sc === ec) {
      return text.substring(1, text.length - 1).replace(/""/g, sc)
    } else if (sc === "'" && sc === ec) {
      return text.substring(1, text.length - 1).replace(/''/g, sc)
    }
  }
  return text
}

export function escapeRegExp(text: string) {
  return text.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')
}

export function escapeXml(text: string) {
  return text.replace(/[&<>"]/g, m => {
    switch (m) {
      case '&': return '&amp;'
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '"': return '&quot;'
    }
    return m
  })
}

export function unescapeXml(text: string) {
  return text.replace(/&(amp|lt|gt|quot);/g, m => {
    switch (m) {
      case '&amp;': return '&'
      case '&lt;': return '<'
      case '&gt;': return '>'
      case '&quot;': return '"'
    }
    return m
  })
}

const sandboxProxies = new WeakMap()

export function sandbox(src: string) {
  const code = new Function('sandbox', 'with (sandbox) {' + src + '}')

  return function (context: Record<string, any>) {
    if (!sandboxProxies.has(context)) {
      const sandboxProxy = new Proxy(context, {
        has(_target: Record<string | symbol, any>, _p: string | symbol) {
          return true
        },
        get(target: Record<string | symbol, any>, p: string | symbol) {
          if (p !== Symbol.unscopables) {
            return target[p]
          }
        },
      })
      sandboxProxies.set(sandbox, sandboxProxy)
    }
    return code(sandboxProxies.get(context))
  }
}

export function isJSIdentifier(text: string) {
  const result = parseExpressionAt(text, 0, acornOption)
  return result.end === text.length && result.type === "Identifier"
}

export function isJSExpression(text: string) {
  const result = parseExpressionAt(text, 0, acornOption)
  return result.end === text.length
}
