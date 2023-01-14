import { LexerOptions, TokenPattern, TokenType } from "@/lexer";

export function adaptKnex(options: LexerOptions): LexerOptions {
  options.patternFilter = knexPatternFilter
  return options
}

function knexPatternFilter(patterns: TokenPattern[]) {
  let pos = patterns.findIndex(p => p.type === TokenType.BindVariable)
  if (pos === -1) {
    pos = patterns.findIndex(p => p.type === TokenType.Operator)
  }
  if (pos === -1) {
    pos = 0
  }
  return [
    ...patterns.slice(0, pos),
    { type: TokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
    ...patterns.slice(pos),
  ]
}