import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
  SourceLocation,
} from "../lexer"

const ObjectStartSet = new Set<Keyword>([
  Keyword.TABLE,
  Keyword.VIEW,
  Keyword.TRIGGER,
  Keyword.INDEX,
  Keyword.UNIQUE,
])

const ReservedSet = new Set<Keyword>([
  Keyword.ADD,
  Keyword.ALL,
  Keyword.ALTER,
  Keyword.AND,
  Keyword.AS,
  Keyword.AUTOINCREMENT,
  Keyword.BETWEEN,
  Keyword.CASE,
  Keyword.CHECK,
  Keyword.COLLATE,
  Keyword.COMMIT,
  Keyword.CONSTRAINT,
  Keyword.CREATE,
  Keyword.CROSS,
  Keyword.CURRENT_DATE,
  Keyword.CURRENT_TIME,
  Keyword.CURRENT_TIMESTAMP,
  Keyword.DEFAULT,
  Keyword.DEFERRABLE,
  Keyword.DELETE,
  Keyword.DISTINCT,
  Keyword.ELSE,
  Keyword.ESCAPE,
  Keyword.EXISTS,
  Keyword.FILTER,
  Keyword.FOREIGN,
  Keyword.FROM,
  Keyword.GLOB,
  Keyword.GROUP,
  Keyword.HAVING,
  Keyword.IN,
  Keyword.INDEX,
  Keyword.INDEXED,
  Keyword.INNER,
  Keyword.INSERT,
  Keyword.INTO,
  Keyword.IS,
  Keyword.ISNULL,
  Keyword.JOIN,
  Keyword.LEFT,
  Keyword.LIMIT,
  Keyword.NATURAL,
  Keyword.NOT,
  Keyword.NOTHING,
  Keyword.NOTNULL,
  Keyword.NULL,
  Keyword.ON,
  Keyword.OR,
  Keyword.ORDER,
  Keyword.PRIMARY,
  Keyword.OUTER,
  Keyword.OVER,
  Keyword.REFERENCES,
  Keyword.REGEXP,
  Keyword.RETURNING,
  Keyword.RIGHT,
  Keyword.SELECT,
  Keyword.SET,
  Keyword.TABLE,
  Keyword.TEMPORARY,
  Keyword.THEN,
  Keyword.TO,
  Keyword.TRANSACTION,
  Keyword.UNIQUE,
  Keyword.UPDATE,
  Keyword.USING,
  Keyword.VALUES,
  Keyword.WHEN,
  Keyword.WHERE,
  Keyword.WINDOW,
]);

export declare type Sqlite3LexerOptions = LexerOptions & {
  compileOptions?: string[]
}

export class Sqlite3Lexer extends Lexer {
  private reserved = new Set<Keyword>()

  constructor(
    options: Sqlite3LexerOptions = {}
  ) {
    super("sqlite3", [
      { type: TokenType.SemiColon, re: /;/y,
        action: (state, token ) => this.processSemiColon(state, token) },
      { type: TokenType.WhiteSpace, re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y },
      { type: TokenType.LineBreak, re: /\r?\n/y },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.Command, re: /(?<=^|\n)\..+(\r?\n|$)/y,
        action: (state, token) => this.processCommand(state, token) },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Numeric, re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.Blob, re: /[Xx]'([^']|'')*'/y },
      { type: TokenType.String, re: /'([^']|'')*'/y },
      { type: TokenType.QuotedValue, re: /"([^"]|"")*"/y },
      { type: TokenType.QuotedIdentifier, re: /(`([^`]|``)*`|\[[^\]]*\])/y },
      { type: TokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|->>?|[=<>!]=?|[~&|*/%+-]/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y, 
        action: (state, token) => this.processIdentifier(state, token)
      },
      { type: TokenType.Error, re: /./y },
    ], options)

    if (options.compileOptions) {
      const compileOptions = new Set<string>(options.compileOptions)
      if (!compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS")) {
        this.reserved.add(Keyword.ALWAYS)
        this.reserved.add(Keyword.GENERATED)
      }
      if (!compileOptions.has("SQLITE_OMIT_WINDOWFUNC")) {
        this.reserved.add(Keyword.CURRENT)
        this.reserved.add(Keyword.EXCLUDE)
        this.reserved.add(Keyword.FOLLOWING)
        this.reserved.add(Keyword.GROUPS)
        this.reserved.add(Keyword.OTHERS)
        this.reserved.add(Keyword.PARTITION)
        this.reserved.add(Keyword.PRECEDING)
        this.reserved.add(Keyword.RANGE)
        this.reserved.add(Keyword.TIES)
        this.reserved.add(Keyword.UNBOUNDED)
      }
      if (!compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT")) {
        this.reserved.add(Keyword.EXCEPT)
        this.reserved.add(Keyword.INTERSECT)
        this.reserved.add(Keyword.UNION)
      }
    }
  }

  isReserved(keyword?: Keyword) {
    return keyword != null && (ReservedSet.has(keyword) || this.reserved.has(keyword))
  }

  isObjectStart(keyword?: Keyword) {
    return keyword != null && ObjectStartSet.has(keyword)
  }

  private processIdentifier(state: Record<string, any>, token: Token) {
    const keyword = Keyword.for(token.text)
    if (keyword) {
      token.keyword = keyword
      if (this.isReserved(keyword)) {
        token.type = TokenType.Reserved
      }
      // 0 CREATE 1 OBJECT 2 ... END 3 ;
      if (!state.pos) {
        if (token.keyword === Keyword.CREATE) {
          state.pos = 1
        } else {
          state.pos = 3
        }
      } else if (state.pos === 1 && this.isObjectStart(token.keyword)) {
        if (token.keyword === Keyword.TRIGGER) {
          state.pos = 2
        } else {
          state.pos = 3
        }
      } else if (state.pos === 2 && token.keyword === Keyword.END) {
        state.pos = 3
      }
    }
  }

  private processSemiColon(state: Record<string, any>, token: Token) {
    if (state.pos !== 2) {
      state.pos = 0
      token.eos = true
    }
  }

  private processCommand(state: Record<string, any>, token: Token) {
    state.pos = 0

    const m = /[ \t]/.exec(token.text)
    if (!m) {
      token.eos = true
      return
    }

    const tokens = []
    tokens.push(new Token(TokenType.Command, token.text.substring(0, m.index), {
      preskips: token.preskips, 
      postskips: token.postskips,
      location: token.location,
    }))

    const args = token.text.substring(m.index)
    const argTokens = []
    const re = /([ \t\r\n]+)|("[^"]*"|'[^']*')|([^ \t"']+)/y
    let pos = 0
    while (pos < args.length) {
      re.lastIndex = pos
      const m = re.exec(args)
      if (m) {
        const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier

        argTokens.push(new Token(type, m[0], {
          location: new SourceLocation(
            (token.location?.position ?? 0) + re.lastIndex,
            (token.location?.lineNumber ?? 1),
            (token.location?.columnNumber ?? 0) + pos,
            token.location?.fileName,
          )
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
        tokens.push(argToken)
      }
    }
    if (skips.length > 0) {
      tokens[tokens.length - 1].postskips = skips
    }
    tokens[tokens.length - 1].eos = true

    return tokens
  }
}
