import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
  SourceLocation,
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

export declare type PostgresLexerOptions = LexerOptions & {
}

export class PostgresLexer extends Lexer {
  private reserved = new Set<Keyword>()
  
  constructor(
    options: PostgresLexerOptions = {}
  ) {
    super("postgres", [
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.WhiteSpace, re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y },
      { type: TokenType.LineBreak, re: /\r?\n/y },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.Command, re: /(?<=^|\n)\\[^ \t]+([ \t]+('([^\\']|\\')*'|"([^\\"]|\\")*"|`([^\\`]|\\`)*`|[^ \t'"`]+))*(\r?\n|$)/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Numeric, re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.LeftBracket, re: /\[/y },
      { type: TokenType.RightBracket, re: /\]/y },
      { type: TokenType.Label, re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y },
      { type: TokenType.Blob, re: /'\\x([^']|'')*'/y },
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

  isReserved(keyword?: Keyword) {
    return keyword != null && (ReservedSet.has(keyword) || this.reserved.has(keyword))
  }

  protected processToken(state: Record<string, any>, token: Token) {
    if (token.type === TokenType.Identifier) {
      const keyword = Keyword.for(token.text)
      if (keyword) {
        token.keyword = keyword
        if (this.isReserved(keyword)) {
          token.type = TokenType.Reserved
        }
      }
    } else if (token.type === TokenType.SemiColon) {
      token.eos = true
    } else if (token.type === TokenType.Command) {
      return this.parseCommand(token)
    }
    return [ token ]
  }

  private parseCommand(token: Token) {
    const m = /[ \t]/.exec(token.text)
    if (!m) {
      return [ token ]
    }

    const command = []
    const nameToken = new Token(TokenType.Command, token.text.substring(0, m.index), {
      preskips: token.preskips, 
      postskips: token.postskips,
      location: token.location,
    })
    command.push(nameToken)

    const args = token.text.substring(m.index)
    const argTokens = []
    const re = /([ \t]+)|("[^"]*"|'[^']*'|`[^`]*`)|([^ \t"']+)/y
    let pos = 0
    while (pos < args.length) {
      re.lastIndex = pos
      const m = re.exec(args)
      if (m) {
        const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier

        const location = new SourceLocation()
        location.fileName = token.location?.fileName
        location.position = re.lastIndex
        location.lineNumber = token.location?.lineNumber
        if (token.location?.columnNumber != null) {
          location.columnNumber = token.location?.columnNumber + location.position
        }

        argTokens.push(new Token(type, m[0], {
          location
        }))
        pos = re.lastIndex
      }
    }

    let skips = []
    for (const argToken of argTokens) {
      if (argToken.is(TokenType.WhiteSpace)) {
        skips.push(argToken)
      } else {
        argToken.preskips = skips
        skips = []
        command.push(argToken)
      }
    }
    if (skips.length > 0) {
      command[command.length - 1].postskips = skips
    }
    command[command.length - 1].eos = true

    return command
  }
}