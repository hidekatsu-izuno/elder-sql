import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
} from "../lexer"

const ReservedSet = new Set<TokenType>([
  Keyword.ALL,
  Keyword.ANALYSE,
  Keyword.ANALYZE,
  Keyword.AND,
  Keyword.ANY,
  Keyword.ARRAY,
  Keyword.AS,
  Keyword.ASC,
  Keyword.ASYMMETRIC,
  Keyword.BOTH,
  Keyword.CASE,
  Keyword.CAST,
  Keyword.CHECK,
  Keyword.COLLATE,
  Keyword.COLUMN,
  Keyword.CONSTRAINT,
  Keyword.CREATE,
  Keyword.CURRENT_CATALOG,
  Keyword.CURRENT_DATE,
  Keyword.CURRENT_ROLE,
  Keyword.CURRENT_TIME,
  Keyword.CURRENT_TIMESTAMP,
  Keyword.CURRENT_USER,
  Keyword.DEFAULT,
  Keyword.DEFERRABLE,
  Keyword.DESC,
  Keyword.DISTINCT,
  Keyword.DO,
  Keyword.ELSE,
  Keyword.END,
  Keyword.EXCEPT,
  Keyword.FALSE,
  Keyword.FETCH,
  Keyword.FOR,
  Keyword.FOREIGN,
  Keyword.FROM,
  Keyword.GRANT,
  Keyword.GROUP,
  Keyword.HAVING,
  Keyword.IN,
  Keyword.INITIALLY,
  Keyword.INTERSECT,
  Keyword.INTO,
  Keyword.LATERAL,
  Keyword.LEADING,
  Keyword.LIMIT,
  Keyword.LOCALTIME,
  Keyword.LOCALTIMESTAMP,
  Keyword.NOT,
  Keyword.NULL,
  Keyword.OFFSET,
  Keyword.ON,
  Keyword.ONLY,
  Keyword.OR,
  Keyword.ORDER,
  Keyword.PLACING,
  Keyword.PRIMARY,
  Keyword.REFERENCES,
  Keyword.RETURNING,
  Keyword.SELECT,
  Keyword.SESSION_USER,
  Keyword.SOME,
  Keyword.SYMMETRIC,
  Keyword.TABLE,
  Keyword.THEN,
  Keyword.TO,
  Keyword.TRAILING,
  Keyword.TRUE,
  Keyword.UNION,
  Keyword.UNIQUE,
  Keyword.USER,
  Keyword.USING,
  Keyword.VARIADIC,
  Keyword.WHEN,
  Keyword.WHERE,
  Keyword.WINDOW,
  Keyword.WITH,
])

export declare type PostgresLexerOptions = LexerOptions & {
}

export class PostgresLexer extends Lexer {
  constructor(
    options: PostgresLexerOptions = {}
  ) {
    super("postgres", [
      { type: TokenType.SemiColon, re: /;/y, eos: true, separator: true },
      { type: TokenType.WhiteSpace, re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y, skip: true },
      { type: TokenType.LineBreak, re: /\r?\n/y, skip: true, separator: true },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
      { type: TokenType.BlockComment, re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy, skip: true },
      { type: TokenType.LineComment, re: /--.*/y, skip: true },
      { type: TokenType.Command, re: /^\\[^ \t]+([ \t]+('([^\\']|\\')*'|"([^\\"]|\\")*"|`([^\\`]|\\`)*`|[^ \t'"`]+))*(\\|$)/my, eos: true },
      { type: TokenType.LeftParen, re: /\(/y, separator: true },
      { type: TokenType.RightParen, re: /\)/y, separator: true },
      { type: TokenType.Comma, re: /,/y, separator: true },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y, separator: true },
      { type: TokenType.LeftBracket, re: /\[/y, separator: true },
      { type: TokenType.RightBracket, re: /\]/y, separator: true },
      { type: TokenType.String, re: /([uU]&|[bBxX])?'([^']|'')*'/y },
      { type: TokenType.String, re: /\$([^$]+)\$.*\$\1\$/my },
      { type: TokenType.String, re: /\$\$.*\$\$/my },
      { type: TokenType.QuotedIdentifier, re: /([uU]&)?"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /\$([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /::|[*/<>=~!@#%^&|`?+-]+/y, separator: true },
      { type: TokenType.Error, re: /./y, separator: true },
    ], options)
  }

  protected processToken(state: Record<string, any>, token: Token) {
    if (token.type === TokenType.Identifier) {
      const keyword = Keyword[token.text.toUpperCase()]
      if (keyword) {
        token.keyword = keyword
        if (ReservedSet.has(keyword)) {
          token.type = keyword
        }
      }
    }
    return token
  }
}