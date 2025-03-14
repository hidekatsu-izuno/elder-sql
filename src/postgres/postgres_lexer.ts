import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
  SourceLocation,
} from "../lexer.js"

const ObjectStartSet = new Set<Keyword>([
  Keyword.ACCESS,
  Keyword.AGGREGATE,
  Keyword.CAST,
  Keyword.COLLATION,
  Keyword.CONVERSION,
  Keyword.DATABASE,
  Keyword.DEFAULT,
  Keyword.DOMAIN,
  Keyword.EVENT,
  Keyword.EXTENSION,
  Keyword.FOREIGN,
  Keyword.FUNCTION,
  Keyword.GROUP,
  Keyword.INDEX,
  Keyword.LANGUAGE,
  Keyword.LARGE,
  Keyword.MATERIALIZED,
  Keyword.OPERATOR,
  Keyword.POLICY,
  Keyword.PROCEDURE,
  Keyword.PUBLICATION,
  Keyword.ROLE,
  Keyword.ROUTINE,
  Keyword.RULE,
  Keyword.SCHEMA,
  Keyword.SEQUENCE,
  Keyword.SERVER,
  Keyword.STATISTICS,
  Keyword.SUBSCRIPTION,
  Keyword.SYSTEM,
  Keyword.TABLE,
  Keyword.TABLESPACE,
  Keyword.TEXT,
  Keyword.TRANSFORM,
  Keyword.TRIGGER,
  Keyword.TYPE,
  Keyword.USER,
  Keyword.VIEW,
])

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

const Mode = {
  INITIAL: 0,
  SQL_START: 1,
  SQL_OBJECT_DEF: 2,
  SQL_PROC_DEF: 3,
  SQL_PROC_BODY: 4,
  SQL_PART: Number.MAX_SAFE_INTEGER,
} as const

export declare type PostgresLexerOptions = LexerOptions

export class PostgresLexer extends Lexer {
  static isObjectStart(keyword?: Keyword) {
    return keyword != null && ObjectStartSet.has(keyword)
  }

  private reserved = new Set<Keyword>()
  
  constructor(
    options: PostgresLexerOptions = {}
  ) {
    super("postgres", [
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*(?:(?!\/\*|\*\/).)*\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.LineBreak, re: /\n|\r\n?/y },
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.Command,
        re: (state) => state.mode === Mode.INITIAL ? /(?<=^|[\r\n])\\.+(\n|\r\n?|$)/y : false,
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
      { type: TokenType.LeftBracket, re: /\[/y },
      { type: TokenType.RightBracket, re: /\]/y },
      { type: TokenType.Label, re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y },
      { type: TokenType.Blob, re: /'\\x([^']|'')*'/y },
      { type: TokenType.String, re: /([uU]&|[bBxX])?'([^']|'')*'/y },
      { type: TokenType.String, re: /\$([^$]*)\$.*?\$\1\$/sy },
      { type: TokenType.Identifier, re: /([uU]&)?"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /\?/y },
      { type: TokenType.BindVariable, re: /\$([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /::|[*/<>=~!@#%^&|`?+-]+/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
        onMatch: (state, token) => this.onMatchIdentifier(state, token)
      },
      { type: TokenType.Error, re: /./y },
    ], options)
  }

  isReserved(keyword?: Keyword) {
    return keyword != null && (ReservedSet.has(keyword) || this.reserved.has(keyword))
  }

  protected initState(state: Record<string, any>) {
    state.mode = Mode.INITIAL
  }

  private onMatchCommand(state: Record<string, any>, token: Token) {
    state.mode = Mode.INITIAL

    const tokens = []
    let location = token.location

    const re = /(\n|\r\n?)|([ \t]+)|("[^"]*"|'[^']*'|`[^`]*`)|([^ \t\r\n"'`]+)/y
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
            token.location.source,
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
    tokens.push(new Token(TokenType.EoF, "", { eos: true }))

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
        } else if (keyword === Keyword.DECLARE || keyword === Keyword.BEGIN) {
          state.mode = Mode.SQL_PROC_BODY
          state.stack = [{ isSentenceStart: true, type: keyword }]
        } else {
          state.mode = Mode.SQL_PART
        }
      } else if (state.mode === Mode.SQL_OBJECT_DEF && PostgresLexer.isObjectStart(keyword)) {
        if (keyword === Keyword.FUNCTION || keyword === Keyword.PROCEDURE) {
          state.mode = Mode.SQL_PROC_DEF
        } else {
          state.mode = Mode.SQL_PART
        }
      } else if (state.mode === Mode.SQL_PROC_DEF) {
        if (state.last === Keyword.BEGIN && keyword === Keyword.ATOMIC) {
          state.mode = Mode.SQL_PROC_BODY
          state.stack = [{ isSentenceStart: true, type: state.last }]
          delete state.last
        } else {
          state.last = keyword
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
          } else if (keyword === Keyword.IF || keyword === Keyword.CASE || keyword === Keyword.WHILE || keyword === Keyword.FOR) {
            ctx.isSentenceStart = false
            state.stack.push({ isSentenceStart: false, type: keyword })
          } else if (keyword === Keyword.LOOP) {
            ctx.isSentenceStart = false
            state.stack.push({ isSentenceStart: true, type: keyword })
          } else {
            ctx.isSentenceStart = false
          }
        } else if (keyword === Keyword.THEN || keyword === Keyword.ELSE) {
          if (ctx.type === Keyword.IF || ctx.type === Keyword.CASE) {
            ctx.isSentenceStart = true
          }
        } else if (keyword === Keyword.LOOP) {
          if (ctx.type === Keyword.WHILE || ctx.type === Keyword.FOR) {
            ctx.isSentenceStart = true
          }
        }
      }
    }
  }
}