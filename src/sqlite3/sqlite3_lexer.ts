import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
  SourceLocation,
} from "../lexer.js"

const ObjectStartSet = new Set<Keyword>([
  Keyword.TABLE,
  Keyword.VIEW,
  Keyword.TRIGGER,
  Keyword.INDEX,
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

const Mode = {
  INITIAL: 0,
  SQL_START: 1,
  SQL_OBJECT_DEF: 2,
  SQL_PROC_DEF: 3,
  SQL_PROC_BODY: 4,
  SQL_PART: Number.MAX_SAFE_INTEGER,
} as const

export declare type Sqlite3LexerOptions = LexerOptions & {
  compileOptions?: string[]
}

export class Sqlite3Lexer extends Lexer {
  static isObjectStart(keyword?: Keyword) {
    return keyword != null && ObjectStartSet.has(keyword)
  }

  private reserved = new Set<Keyword>()

  constructor(
    options: Sqlite3LexerOptions = {}
  ) {
    super("sqlite3", [
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.LineBreak, re: /\n|\r\n?/y },
      { type: TokenType.WhiteSpace, re: /[ \t\f]+/y },
      { type: TokenType.Delimiter, re: /(?<=^|[\r\n])([/]|GO)[ \t\f]*(\n|\r\n?|$)/iy,
        onMatch: (state, token) => this.onMatchDelimiter(state, token)
      },
      { type: TokenType.Command,
        re: (state) => state.mode === Mode.INITIAL ? /(?<=^|[\r\n])\..+(\n|\r\n?|$)/y : false,
        onMatch: (state, token) => this.onMatchCommand(state, token),
        onUnmatch: (state) => this.onUnmatchCommand(state)
      },
      { type: TokenType.SemiColon, re: /;/y,
        onMatch: (state, token) => this.onMatchSemiColon(state, token)
      },
      { type: TokenType.LeftBrace, re: /\{/y },
      { type: TokenType.RightBrace, re: /\}/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Numeric, re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.Blob, re: /[Xx]'([^']|'')*'/y },
      { type: TokenType.String, re: /'([^']|'')*'/y },
      { type: TokenType.Identifier, re: /("([^"]|"")*"|`([^`]|``)*`|\[[^\]]*\])/y },
      { type: TokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|->>?|[=<>!]=?|[~&|*/%+-]/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y, 
        onMatch: (state, token) => this.onMatchIdentifier(state, token)
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

  protected initState(state: Record<string, any>): void {
    state.mode = Mode.INITIAL
  }

  private onMatchDelimiter(state: Record<string, any>, token: Token) {
    state.mode = Mode.INITIAL
    token.eos = true

    const m = /^([^ \t\f\r\n]+)([ \t\f]*)(\n|\r\n?)?$/.exec(token.text)
    if (m) {
      let location = token.location
      token.text = m[1]
      if (location) {
        location = new SourceLocation(
          location.position + m[1].length,
          location.lineNumber,
          location.columnNumber + m[1].length,
          location.fileName,
        )
      }
      if (m[2]) {
        token.postskips.push(new Token(TokenType.WhiteSpace, m[2], {
          location
        }))
      }
      if (location && m[3]) {
        location = new SourceLocation(
          location.position + m[2].length,
          location.lineNumber,
          location.columnNumber + m[2].length,
          location.fileName,
        )  
      }
      if (m[3]) {
        token.postskips.push(new Token(TokenType.LineBreak, m[3], {
          location
        }))
      }
    }
  }

  private onMatchCommand(state: Record<string, any>, token: Token) {
    state.mode = Mode.INITIAL

    const tokens = []
    let location = token.location

    const re = /(\n|\r\n?)|([ \t\f]+)|("[^"]*"|'[^']*')|([^ \t\f\r\n"']+)/y
    let pos = 0
    let skips = []
    while (pos < token.text.length) {
      re.lastIndex = pos
      const m = re.exec(token.text)
      if (m) {
        const type = m[1] ? TokenType.LineBreak
          : m[2] ? TokenType.WhiteSpace
          : m[3] ? TokenType.String
          : pos === 0 ? TokenType.Command
          : TokenType.Identifier

        if (token.location) {
          location = new SourceLocation(
            token.location.position + pos,
            token.location.lineNumber,
            token.location.columnNumber + pos,
            token.location.fileName,
          )
        }
        
        const newToken = new Token(type, m[0], {
          location
        })

        if (newToken.type.skip) {
          skips.push(newToken)
        } else {
          newToken.preskips = skips
          skips = []
          tokens.push(newToken)
        }

        pos = re.lastIndex
      } else {
        throw new Error("Unexpected error caused!")
      }
    }

    if (skips.length > 0) {
      tokens[tokens.length - 1].postskips = skips
    }
    tokens.push(new Token(TokenType.SectionBreak, "", {
      eos: true,
      location: tokens[tokens.length - 1].location?.clone()
    }))

    return tokens
  }

  private onUnmatchCommand(state: Record<string, any>) {
    if (state.mode === Mode.INITIAL) {
      state.mode = Mode.SQL_START
    }
  }

  private onMatchSemiColon(state: Record<string, any>, token: Token) {
    if (state.mode === Mode.SQL_PROC_BODY) {
      state.stack[state.stack.length - 1].isSentenceStart = true
    } else {
      state.mode = Mode.INITIAL
      token.eos = true
    }
  }

  private onMatchIdentifier(state: Record<string, any>, token: Token) {
    const keyword = Keyword.for(token.text)
    if (keyword) {
      token.keyword = keyword
      if (this.isReserved(keyword)) {
        token.type = TokenType.Reserved
      }

      if (state.mode === Mode.SQL_START) {
        if (keyword === Keyword.CREATE) {
          state.mode = Mode.SQL_OBJECT_DEF
        } else {
          state.mode = Mode.SQL_PART
        }
      } else if (state.mode === Mode.SQL_OBJECT_DEF && Sqlite3Lexer.isObjectStart(keyword)) {
        if (keyword === Keyword.TRIGGER) {
          state.mode = Mode.SQL_PROC_DEF
        } else {
          state.mode = Mode.SQL_PART
        }
      } else if (state.mode === Mode.SQL_PROC_DEF) {
        if (keyword === Keyword.BEGIN) {
          state.mode = Mode.SQL_PROC_BODY
          state.stack = [{ isSentenceStart: true, type: keyword }]
        }
      } else if (state.mode === Mode.SQL_PROC_BODY) {
        const ctx = state.stack[state.stack.length - 1]
        if (ctx.isSentenceStart) {
          if (keyword === Keyword.END) {
            state.stack.pop()
            if (state.stack.length === 0) {
              state.mode = Mode.SQL_PART
              delete state.stack
            }
          }
        }
      }
    }
  }
}
