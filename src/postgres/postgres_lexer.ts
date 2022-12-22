import {
  TokenType,
  Token,
  Lexer,
  Keyword,
} from "../lexer"

const ReservedSet = new Set<Keyword>([
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

export class PostgresLexer extends Lexer {
  constructor(
    options: { [key: string]: any } = {}
  ) {
    super("postgres", [
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.Command, re: /^\\[^ \t]+([ \t]+('([^\\']|\\')*'|"([^\\"]|\\")*"|`([^\\`]|\\`)*`|[^ \t'"`]+))*(\\|$)/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.LeftBracket, re: /\[/y },
      { type: TokenType.RightBracket, re: /\]/y },
      { type: TokenType.String, re: /([uU]&|[bBxX])?'([^']|'')*'/y },
      { type: TokenType.String, re: /\$([^$]+)\$.*\$\1\$/my },
      { type: TokenType.String, re: /\$\$.*\$\$/my },
      { type: TokenType.QuotedIdentifier, re: /([uU]&)?"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /\$([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /::|[*/<>=~!@#%^&|`?+-]+/y },
      { type: TokenType.Error, re: /./y },
    ], options)
  }

  protected process(token: Token, tokens: Token[]) {
    if (token.type === TokenType.Identifier) {
      const keyword = Keyword.from(token.text)
      if (keyword) {
        if (ReservedSet.has(keyword)) {
          token.type = keyword
        } else {
          token.subtype = token.type
          token.type = keyword
        }
      }
    } else if (token.type === TokenType.LineBreak) {
      const last = tokens[tokens.length - 1]
      if (last && last.type === TokenType.Command) {
        last.subtype = token.type
        last.type = TokenType.Delimiter
      }
    }
    return token
  }
}