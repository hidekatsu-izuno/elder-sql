import {
  TokenType,
  Token,
  Lexer,
  SourceLocation,
  Keyword,
  Operator,
} from "../lexer"

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

export class Sqlite3Lexer extends Lexer {
  private reserved = new Set<Keyword>();

  constructor(
    options: { [key: string]: any } = {}
  ) {
    super("sqlite3", [
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.Command, re: /^\..+$/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /[Xx]?'([^']|'')*'/y },
      { type: TokenType.QuotedValue, re: /"([^"]|"")*"/y },
      { type: TokenType.QuotedIdentifier, re: /(`([^`]|``)*`|\[[^\]]*\])/y },
      { type: TokenType.BindVariable, re: /\?([1-9][0-9]*)?/y },
      { type: TokenType.BindVariable, re: /[$@:#][a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|->>?|[=<>!]=?|[~&|*/%+-]/y },
      { type: TokenType.Error, re: /./y },
    ], options)

    if (!options.compileOptions?.has("SQLITE_OMIT_GENERATED_COLUMNS")) {
      this.reserved.add(Keyword.ALWAYS)
      this.reserved.add(Keyword.GENERATED)
    }
    if (!options.compileOptions?.has("SQLITE_OMIT_WINDOWFUNC")) {
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
    if (!options.compileOptions?.has("SQLITE_OMIT_COMPOUND_SELECT")) {
      this.reserved.add(Keyword.EXCEPT)
      this.reserved.add(Keyword.INTERSECT)
      this.reserved.add(Keyword.UNION)
    }
  }

  protected process(token: Token, tokens: Token[]) {
    if (token.type === TokenType.Identifier) {
      const keyword = Keyword.from(token.text)
      if (keyword) {
        if (ReservedSet.has(keyword) || this.reserved.has(keyword)) {
          token.type = keyword
        } else {
          token.subtype = token.type
          token.type = keyword
        }
      }
    } else if (token.type === TokenType.Operator) {
      const operator = Operator.from(token.text)
      if (operator) {
        token.subtype = token.type
        token.type = operator
      }
    } else if (token.type === TokenType.SemiColon) {
      token.subtype = token.type
      token.type = TokenType.Delimiter
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