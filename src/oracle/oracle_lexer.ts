import {
  TokenType,
  Token,
  Lexer,
  Keyword,
  LexerOptions,
} from "../lexer"

const ObjectStartSet = new Set<Keyword>([
  Keyword.ANALYTIC,
  Keyword.ATTRIBUTE,
  Keyword.AUDIT,
  Keyword.CLUSTER,
  Keyword.CONTEXT,
  Keyword.CONTROLFILE,
  Keyword.DATABASE,
  Keyword.DIMENSION,
  Keyword.DIRECTORY,
  Keyword.DISKGROUP,
  Keyword.EDITION,
  Keyword.FLASHBACK,
  Keyword.FUNCTION,
  Keyword.HIERARCHY,
  Keyword.INDEX,
  Keyword.INDEXTYPE,
  Keyword.INMEMORY,
  Keyword.JAVA,
  Keyword.LIBRARY,
  Keyword.LOCKDOWN,
  Keyword.MATERIALIZED,
  Keyword.OPERATOR,
  Keyword.OUTLINE,
  Keyword.PACKAGE,
  Keyword.PFILE,
  Keyword.PLUGGABLE,
  Keyword.PROCEDURE,
  Keyword.PROFILE,
  Keyword.RESTORE,
  Keyword.ROLE,
  Keyword.ROLLBACK,
  Keyword.SCHEMA,
  Keyword.SEQUENCE,
  Keyword.SPFILE,
  Keyword.SYNONYM,
  Keyword.TABLE,
  Keyword.TABLESPACE,
  Keyword.TRIGGER,
  Keyword.TYPE,
  Keyword.USER,
  Keyword.VIEW,
])

export const ReservedSet = new Set<Keyword>([
  Keyword.ACCESS,
  Keyword.ADD,
  Keyword.ALL,
  Keyword.ALTER,
  Keyword.AND,
  Keyword.ANY,
  Keyword.AS,
  Keyword.ASC,
  Keyword.AT,
  Keyword.AUDIT,
  Keyword.BEGIN,
  Keyword.BETWEEN,
  Keyword.BY,
  Keyword.CASE,
  Keyword.CHAR,
  Keyword.CHECK,
  Keyword.CLUSTER,
  Keyword.CLUSTERS,
  Keyword.COLAUTH,
  Keyword.COLUMN,
  Keyword.COLUMNS,
  Keyword.COMMENT,
  Keyword.COMPRESS,
  Keyword.CONNECT,
  Keyword.CRASH,
  Keyword.CREATE,
  Keyword.CURRENT,
  Keyword.CURSOR,
  Keyword.DATE,
  Keyword.DECIMAL,
  Keyword.DECLARE,
  Keyword.DEFAULT,
  Keyword.DELETE,
  Keyword.DESC,
  Keyword.DISTINCT,
  Keyword.DROP,
  Keyword.ELSE,
  Keyword.END,
  Keyword.EXCEPTION,
  Keyword.EXCLUSIVE,
  Keyword.EXISTS,
  Keyword.FETCH,
  Keyword.FILE,
  Keyword.FLOAT,
  Keyword.FOR,
  Keyword.FROM,
  Keyword.FUNCTION,
  Keyword.GOTO,
  Keyword.GRANT,
  Keyword.GROUP,
  Keyword.HAVING,
  Keyword.IDENTIFIED,
  Keyword.IF,
  Keyword.IMMEDIATE,
  Keyword.IN,
  Keyword.INCREMENT,
  Keyword.INDEX,
  Keyword.INDEXES,
  Keyword.INITIAL,
  Keyword.INSERT,
  Keyword.INTEGER,
  Keyword.INTERSECT,
  Keyword.INTO,
  Keyword.IS,
  Keyword.LEVEL,
  Keyword.LIKE,
  Keyword.LOCK,
  Keyword.LONG,
  Keyword.MAXEXTENTS,
  Keyword.MINUS,
  Keyword.MLSLABEL,
  Keyword.MODE,
  Keyword.MODIFY,
  Keyword.NOAUDIT,
  Keyword.NOCOMPRESS,
  Keyword.NOT,
  Keyword.NOWAIT,
  Keyword.NULL,
  Keyword.NUMBER,
  Keyword.OF,
  Keyword.OFFLINE,
  Keyword.ON,
  Keyword.ONLINE,
  Keyword.OPTION,
  Keyword.OR,
  Keyword.ORDER,
  Keyword.OVERLAPS,
  Keyword.PCTFREE,
  Keyword.PRIOR,
  Keyword.PROCEDURE,
  Keyword.PUBLIC,
  Keyword.RAW,
  Keyword.RENAME,
  Keyword.RESOURCE,
  Keyword.REVOKE,
  Keyword.ROW,
  Keyword.ROWID,
  Keyword.ROWNUM,
  Keyword.ROWS,
  Keyword.SELECT,
  Keyword.SESSION,
  Keyword.SET,
  Keyword.SHARE,
  Keyword.SIZE,
  Keyword.SMALLINT,
  Keyword.SQL,
  Keyword.START,
  Keyword.SUBTYPE,
  Keyword.SUCCESSFUL,
  Keyword.SYNONYM,
  Keyword.SYSDATE,
  Keyword.TABAUTH,
  Keyword.TABLE,
  Keyword.THEN,
  Keyword.TO,
  Keyword.TRIGGER,
  Keyword.TYPE,
  Keyword.UID,
  Keyword.UNION,
  Keyword.UNIQUE,
  Keyword.UPDATE,
  Keyword.USER,
  Keyword.VALIDATE,
  Keyword.VALUES,
  Keyword.VARCHAR,
  Keyword.VARCHAR2,
  Keyword.VIEW,
  Keyword.VIEWS,
  Keyword.WHEN,
  Keyword.WHENEVER,
  Keyword.WHERE,
  Keyword.WITH,    
])

export declare type OracleLexerOptions = LexerOptions & {
}

export class OracleLexer extends Lexer {
  private reserved = new Set<Keyword>()
  
  constructor(
    options: OracleLexerOptions = {}
  ) {
    super("oracle", [
      { type: TokenType.Delimiter, re: /^[ \t]*[./](?=[ \t]|$)/my,
        action: (state, token) => this.processDelimiter(state, token)
      },
      { type: TokenType.SemiColon, re: /;/y,
        action: (state, token) => this.processSemiColon(state, token)
      },
      { type: TokenType.WhiteSpace, re: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/y },
      { type: TokenType.LineBreak, re: /\r?\n/y },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.Operator, re: /\(\+\)|\.\./y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Label, re: /<<[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*>>/y },
      { type: TokenType.Numeric, re: /0[xX][0-9a-fA-F]+|([0-9]+(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /[nN]?'([^']|'')*'/y },
      { type: TokenType.String, re: /[nN]?[qQ]'(?:\[.*?\]|\{.*?\}|\(.*?\)|([^ \t\r\n]).*?\1)'/my },
      { type: TokenType.QuotedIdentifier, re: /"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<>|[=<>!^:]=?|[%~&|*/+-]/y },
      { type: TokenType.Identifier, re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y,
        action: (state, token) => this.processIdentifier(state, token)
      },
      { type: TokenType.Error, re: /./y },
    ], options)
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
      if (state.pos === 0) {
        if (keyword === Keyword.CREATE) {
          state.pos = 1
        } else if (keyword === Keyword.DECLARE || keyword === Keyword.BEGIN) {
          state.pos = 2
        } else {
          state.pos = 3
        }
      } else if (state.pos === 1 && this.isObjectStart(keyword)) {
        if (
          keyword === Keyword.FUNCTION
          || keyword === Keyword.LIBRARY
          || keyword === Keyword.PACKAGE
          || keyword === Keyword.PROCEDURE
          || keyword === Keyword.TRIGGER
          || keyword === Keyword.TYPE
        ) {
          state.pos = 2
        } else {
          state.pos = 3
        }
      }
    }
  }

  private processSemiColon(state: Record<string, any>, token: Token) {
    if (state.pos !== 2) {
      state.pos = 0
      token.eos = true
    }
  }

  private processDelimiter(state: Record<string, any>, token: Token) {
    state.pos = 0
    token.eos = true
  }
}