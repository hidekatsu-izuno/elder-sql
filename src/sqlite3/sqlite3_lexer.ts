import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
} from "../lexer"

const ReservedSet = new Set<TokenType>([
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
  private reserved = new Set<TokenType>()

  constructor(
    options: Sqlite3LexerOptions = {}
  ) {
    super("sqlite3", [
      { type: TokenType.SemiColon, re: /;/y, eos: true, separator: true },
      { type: TokenType.WhiteSpace, re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y, skip: true },
      { type: TokenType.LineBreak, re: /\r?\n/y, skip: true, separator: true },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy, skip: true },
      { type: TokenType.LineComment, re: /--.*/y, skip: true },
      { type: TokenType.Command, re: /^\..+/my, eos: true },
      { type: TokenType.LeftParen, re: /\(/y, separator: true },
      { type: TokenType.RightParen, re: /\)/y, separator: true },
      { type: TokenType.Comma, re: /,/y, separator: true },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y, separator: true },
      { type: TokenType.String, re: /[Xx]'([^']|'')*'/y },
      { type: TokenType.String, re: /'([^']|'')*'/y },
      { type: TokenType.QuotedValue, re: /"([^"]|"")*"/y },
      { type: TokenType.QuotedIdentifier, re: /(`([^`]|``)*`|\[[^\]]*\])/y },
      { type: TokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|->>?|[=<>!]=?|[~&|*/%+-]/y, separator: true },
      { type: TokenType.Error, re: /./y, separator: true },
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

  protected processToken(state: Record<string, any>, token: Token) {
    if (token.type === TokenType.Identifier) {
      const keyword = Keyword[token.text.toUpperCase()]
      if (keyword) {
        token.keyword = keyword
        if (ReservedSet.has(keyword) || this.reserved.has(keyword)) {
          token.type = keyword
        }
      }
    }

    return token
  }
}
