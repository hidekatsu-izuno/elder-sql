import semver from "semver"

import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
  SourceLocation,
  Splitter,
  SplitFunction,
} from "../parser"
import { dequote, escapeRegExp, ucase } from "../util"

const KeywordMap = new Map<string, MysqlKeyword>()
export class MysqlKeyword extends TokenType {
  static ACCESSIBLE = new MysqlKeyword("ACCESSIBLE", { reserved: true })
  static ACCOUNT = new MysqlKeyword("ACCOUNT")
  static ACTION = new MysqlKeyword("ACTION")
  static ACTIVE = new MysqlKeyword("ACTIVE")
  static ADD = new MysqlKeyword("ADD", { reserved: true })
  static ADMIN = new MysqlKeyword("ADMIN")
  static AFTER = new MysqlKeyword("AFTER")
  static AGGREGATE = new MysqlKeyword("AGGREGATE")
  static ALGORITHM = new MysqlKeyword("ALGORITHM")
  static ALL = new MysqlKeyword("ALL", { reserved: true })
  static ALTER = new MysqlKeyword("ALTER", { reserved: true })
  static ALWAYS = new MysqlKeyword("ALWAYS")
  static ANALYSE = new MysqlKeyword("ANALYSE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static ANALYZE = new MysqlKeyword("ANALYZE", { reserved: true })
  static AND = new MysqlKeyword("AND", { reserved: true })
  static AS = new MysqlKeyword("AS", { reserved: true })
  static ASC = new MysqlKeyword("ASC", { reserved: true })
  static ASCII = new MysqlKeyword("ASCII")
  static ASENSITIVE = new MysqlKeyword("ASENSITIVE", { reserved: true })
  static AT = new MysqlKeyword("AT")
  static ATTRIBUTE = new MysqlKeyword("ATTRIBUTE")
  static AUTO_INCREMENT = new MysqlKeyword("AUTO_INCREMENT")
  static AUTOEXTEND_SIZE = new MysqlKeyword("AUTOEXTEND_SIZE")
  static AVG_ROW_LENGTH = new MysqlKeyword("AVG_ROW_LENGTH")
  static BEFORE = new MysqlKeyword("BEFORE", { reserved: true })
  static BEGIN = new MysqlKeyword("BEGIN")
  static BETWEEN = new MysqlKeyword("BETWEEN", { reserved: true })
  static BIGINT = new MysqlKeyword("BIGINT", { reserved: true })
  static BINARY = new MysqlKeyword("BINARY", { reserved: true })
  static BINLOG = new MysqlKeyword("BINLOG")
  static BIT = new MysqlKeyword("BIT")
  static BLOB = new MysqlKeyword("BLOB", { reserved: true })
  static BODY = new MysqlKeyword("BODY")
  static BOOL = new MysqlKeyword("BOOL")
  static BOOLEAN = new MysqlKeyword("BOOLEAN")
  static BOTH = new MysqlKeyword("BOTH", { reserved: true })
  static BTREE = new MysqlKeyword("BTREE")
  static BY = new MysqlKeyword("BY", { reserved: true })
  static CALL = new MysqlKeyword("CALL", { reserved: true })
  static CACHE = new MysqlKeyword("CACHE")
  static CASCADE = new MysqlKeyword("CASCADE", { reserved: true })
  static CASCADED = new MysqlKeyword("CASCADED")
  static CASE = new MysqlKeyword("CASE", { reserved: true })
  static CHAIN = new MysqlKeyword("CHAIN")
  static CHANGE = new MysqlKeyword("CHANGE", { reserved: true })
  static CHAR = new MysqlKeyword("CHAR", { reserved: true })
  static CHARACTER = new MysqlKeyword("CHARACTER", { reserved: true })
  static CHARSET = new MysqlKeyword("CHARSET")
  static CHECK = new MysqlKeyword("CHECK", { reserved: true })
  static CHECKSUM = new MysqlKeyword("CHECKSUM")
  static CIPHER = new MysqlKeyword("CIPHER")
  static COLLATE = new MysqlKeyword("COLLATE", { reserved: true })
  static CLONE = new MysqlKeyword("CLONE")
  static CLUSTERING = new MysqlKeyword("CLUSTERING")
  static COLUMN = new MysqlKeyword("COLUMN", { reserved: true })
  static COLUMN_FORMAT = new MysqlKeyword("COLUMN_FORMAT")
  static COLUMNS = new MysqlKeyword("COLUMNS")
  static COMMENT = new MysqlKeyword("COMMENT")
  static COMMIT = new MysqlKeyword("COMMIT")
  static COMMITTED = new MysqlKeyword("COMMITTED")
  static COMPACT = new MysqlKeyword("COMPACT")
  static COMPLETION = new MysqlKeyword("COMPLETION")
  static COMPRESSED = new MysqlKeyword("COMPRESSED")
  static COMPRESSION = new MysqlKeyword("COMPRESSION")
  static COMPONENT = new MysqlKeyword("COMPONENT")
  static CONCURRENT = new MysqlKeyword("CONCURRENT")
  static CONDITION = new MysqlKeyword("CONDITION", { reserved: true })
  static CONNECTION = new MysqlKeyword("CONNECTION")
  static CONSISTENT = new MysqlKeyword("CONSISTENT")
  static CONSTRAINT = new MysqlKeyword("CONSTRAINT", { reserved: true })
  static CONTAINS = new MysqlKeyword("CONTAINS")
  static CONTINUE = new MysqlKeyword("CONTINUE", { reserved: true })
  static CONVERT = new MysqlKeyword("CONVERT", { reserved: true })
  static COPY = new MysqlKeyword("COPY")
  static CREATE = new MysqlKeyword("CREATE", { reserved: true })
  static CROSS = new MysqlKeyword("CROSS", { reserved: true })
  static CUBE = new MysqlKeyword("CUBE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static CUME_DIST = new MysqlKeyword("CUME_DIST", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static CURRENT = new MysqlKeyword("CURRENT")
  static CURRENT_DATE = new MysqlKeyword("CURRENT_DATE", { reserved: true })
  static CURRENT_TIME = new MysqlKeyword("CURRENT_TIME", { reserved: true })
  static CURRENT_TIMESTAMP = new MysqlKeyword("CURRENT_TIMESTAMP", { reserved: true })
  static CURRENT_USER = new MysqlKeyword("CURRENT_USER", { reserved: true })
  static CURRENT_ROLE = new MysqlKeyword("CURRENT_ROLE")
  static CURSOR = new MysqlKeyword("CURSOR", { reserved: true })
  static CYCLE = new MysqlKeyword("CYCLE")
  static D = new MysqlKeyword("D")
  static DATA = new MysqlKeyword("DATA")
  static DATABASE = new MysqlKeyword("DATABASE", { reserved: true })
  static DATABASES = new MysqlKeyword("DATABASES", { reserved: true })
  static DATAFILE = new MysqlKeyword("DATAFILE")
  static DATE = new MysqlKeyword("DATE")
  static DATETIME = new MysqlKeyword("DATETIME")
  static DAY = new MysqlKeyword("DAY")
  static DAY_HOUR = new MysqlKeyword("DAY_HOUR", { reserved: true })
  static DAY_MICROSECOND = new MysqlKeyword("DAY_MICROSECOND", { reserved: true })
  static DAY_MINUTE = new MysqlKeyword("DAY_MINUTE", { reserved: true })
  static DAY_SECOND = new MysqlKeyword("DAY_SECOND", { reserved: true })
  static DEALLOCATE = new MysqlKeyword("DEALLOCATE")
  static DEC = new MysqlKeyword("DEC", { reserved: true })
  static DECIMAL = new MysqlKeyword("DECIMAL", { reserved: true })
  static DECLARE = new MysqlKeyword("DECLARE", { reserved: true })
  static DEFAULT = new MysqlKeyword("DEFAULT", { reserved: true })
  static DEFINER = new MysqlKeyword("DEFINER")
  static DEFINITION = new MysqlKeyword("DEFINITION")
  static DELAYED = new MysqlKeyword("DELAYED", { reserved: true })
  static DELAY_KEY_WRITE = new MysqlKeyword("DELAY_KEY_WRITE")
  static DELETE = new MysqlKeyword("DELETE", { reserved: true })
  static DENSE_RANK = new MysqlKeyword("DENSE_RANK", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static DESC = new MysqlKeyword("DESC", { reserved: true })
  static DESCRIBE = new MysqlKeyword("DESCRIBE", { reserved: true })
  static DESCRIPTION = new MysqlKeyword("DESCRIPTION")
  static DES_KEY_FILE = new MysqlKeyword("DES_KEY_FILE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static DETERMINISTIC = new MysqlKeyword("DETERMINISTIC", { reserved: true })
  static DIRECTORY = new MysqlKeyword("DIRECTORY")
  static DISABLE = new MysqlKeyword("DISABLE")
  static DISCARD = new MysqlKeyword("DISCARD")
  static DISK = new MysqlKeyword("DISK")
  static DISTINCT = new MysqlKeyword("DISTINCT", { reserved: true })
  static DISTINCTROW = new MysqlKeyword("DISTINCTROW", { reserved: true })
  static DIV = new MysqlKeyword("DIV", { reserved: true })
  static DO = new MysqlKeyword("DO")
  static DOUBLE = new MysqlKeyword("DOUBLE", { reserved: true })
  static DROP = new MysqlKeyword("DROP", { reserved: true })
  static DUAL = new MysqlKeyword("DUAL", { reserved: true })
  static DYNAMIC = new MysqlKeyword("DYNAMIC")
  static EACH = new MysqlKeyword("EACH", { reserved: true })
  static ELSE = new MysqlKeyword("ELSE", { reserved: true })
  static ELSEIF = new MysqlKeyword("ELSEIF", { reserved: true })
  static EMPTY = new MysqlKeyword("EMPTY", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.4", options.version || "0")
  } })
  static ENABLE = new MysqlKeyword("ENABLE")
  static ENUM = new MysqlKeyword("ENUM")
  static ENCLOSED = new MysqlKeyword("ENCLOSED", { reserved: true })
  static ENCRYPTED  = new MysqlKeyword("ENCRYPTED")
  static ENCRYPTION = new MysqlKeyword("ENCRYPTION")
  static ENCRYPTION_KEY_ID = new MysqlKeyword("ENCRYPTION_KEY_ID")
  static END = new MysqlKeyword("END")
  static ENDS = new MysqlKeyword("ENDS")
  static ENFORCED = new MysqlKeyword("ENFORCED")
  static ENGINE = new MysqlKeyword("ENGINE")
  static ENGINE_ATTRIBUTE = new MysqlKeyword("ENGINE_ATTRIBUTE")
  static ESCAPED = new MysqlKeyword("ESCAPED", { reserved: true })
  static EVENT = new MysqlKeyword("EVENT")
  static EVERY = new MysqlKeyword("EVERY")
  static EXCEPT = new MysqlKeyword("EXCEPT", { reserved: true })
  static EXCLUSIVE = new MysqlKeyword("EXCLUSIVE")
  static EXECUTE = new MysqlKeyword("EXECUTE")
  static EXISTS = new MysqlKeyword("EXISTS", { reserved: true })
  static EXIT = new MysqlKeyword("EXIT", { reserved: true })
  static EXPIRE = new MysqlKeyword("EXPIRE")
  static EXPLAIN = new MysqlKeyword("EXPLAIN", { reserved: true })
  static EXTENT_SIZE = new MysqlKeyword("EXTENT_SIZE")
  static FAILED_LOGIN_ATTEMPTS = new MysqlKeyword("FAILED_LOGIN_ATTEMPTS")
  static FALSE = new MysqlKeyword("FALSE", { reserved: true })
  static FETCH = new MysqlKeyword("FETCH", { reserved: true })
  static FILE_BLOCK_SIZE = new MysqlKeyword("FILE_BLOCK_SIZE")
  static FIRST = new MysqlKeyword("FIRST")
  static FIRST_VALUE = new MysqlKeyword("FIRST_VALUE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static FIXED = new MysqlKeyword("FIXED")
  static FLOAT = new MysqlKeyword("FLOAT", { reserved: true })
  static FLUSH = new MysqlKeyword("FLUSH")
  static FOLLOWS = new MysqlKeyword("FOLLOWS")
  static FOR = new MysqlKeyword("FOR", { reserved: true })
  static FORCE = new MysqlKeyword("FORCE", { reserved: true })
  static FOREIGN = new MysqlKeyword("FOREIGN", { reserved: true })
  static FROM = new MysqlKeyword("FROM", { reserved: true })
  static FULL = new MysqlKeyword("FULL")
  static FULLTEXT = new MysqlKeyword("FULLTEXT", { reserved: true })
  static FUNCTION = new MysqlKeyword("FUNCTION", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static GENERATED = new MysqlKeyword("GENERATED", { reserved: true })
  static GET = new MysqlKeyword("GET", { reserved: true })
  static GLOBAL = new MysqlKeyword("GLOBAL")
  static GRANT = new MysqlKeyword("GRANT", { reserved: true })
  static GROUP = new MysqlKeyword("GROUP", { reserved: true })
  static GROUPING = new MysqlKeyword("GROUPING", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static GROUPS = new MysqlKeyword("GROUPS", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static HANDLER = new MysqlKeyword("HANDLER")
  static HASH = new MysqlKeyword("HASH")
  static HAVING = new MysqlKeyword("HAVING", { reserved: true })
  static HELP = new MysqlKeyword("HELP")
  static HIGH_PRIORITY = new MysqlKeyword("HIGH_PRIORITY", { reserved: true })
  static HISTORY = new MysqlKeyword("HISTORY")
  static HOUR = new MysqlKeyword("HOUR")
  static HOUR_MICROSECOND = new MysqlKeyword("HOUR_MICROSECOND", { reserved: true })
  static HOUR_MINUTE = new MysqlKeyword("HOUR_MINUTE", { reserved: true })
  static HOUR_SECOND = new MysqlKeyword("HOUR_SECOND", { reserved: true })
  static HOST = new MysqlKeyword("HOST")
  static IDENTIFIED = new MysqlKeyword("IDENTIFIED")
  static IETF_QUOTES = new MysqlKeyword("IETF_QUOTES")
  static IF = new MysqlKeyword("IF", { reserved: true })
  static IGNORE = new MysqlKeyword("IGNORE", { reserved: true })
  static IGNORED = new MysqlKeyword("IGNORED")
  static INCREMENT = new MysqlKeyword("INCREMENT")
  static INPLACE = new MysqlKeyword("INPLACE")
  static IMPORT = new MysqlKeyword("IMPORT")
  static IN = new MysqlKeyword("IN", { reserved: true })
  static INACTIVE = new MysqlKeyword("INACTIVE")
  static INDEX = new MysqlKeyword("INDEX", { reserved: true })
  static INFILE = new MysqlKeyword("INFILE", { reserved: true })
  static INITIAL_SIZE = new MysqlKeyword("INITIAL_SIZE")
  static INNER = new MysqlKeyword("INNER", { reserved: true })
  static INOUT = new MysqlKeyword("INOUT", { reserved: true })
  static INSENSITIVE = new MysqlKeyword("INSENSITIVE", { reserved: true })
  static INSERT = new MysqlKeyword("INSERT", { reserved: true })
  static INSERT_METHOD = new MysqlKeyword("INSERT_METHOD")
  static INSTANCE = new MysqlKeyword("INSTANCE")
  static INSTALL = new MysqlKeyword("INSTALL")
  static INT = new MysqlKeyword("INT", { reserved: true })
  static INTEGER = new MysqlKeyword("INTEGER", { reserved: true })
  static INTERVAL = new MysqlKeyword("INTERVAL", { reserved: true })
  static INTO = new MysqlKeyword("INTO", { reserved: true })
  static INVOKER = new MysqlKeyword("INVOKER")
  static IO_AFTER_GTIDS = new MysqlKeyword("IO_AFTER_GTIDS", { reserved: true })
  static IO_BEFORE_GTIDS = new MysqlKeyword("IO_BEFORE_GTIDS", { reserved: true })
  static IS = new MysqlKeyword("IS", { reserved: true })
  static ISOLATION = new MysqlKeyword("ISOLATION")
  static ISSUER = new MysqlKeyword("ISSUER")
  static ITERATE = new MysqlKeyword("ITERATE", { reserved: true })
  static JOIN = new MysqlKeyword("JOIN", { reserved: true })
  static JSON_TABLE = new MysqlKeyword("JSON_TABLE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.4", options.version || "0")
  } })
  static KEY = new MysqlKeyword("KEY", { reserved: true })
  static KEY_BLOCK_SIZE = new MysqlKeyword("KEY_BLOCK_SIZE")
  static KEYS = new MysqlKeyword("KEYS", { reserved: true })
  static KILL = new MysqlKeyword("KILL", { reserved: true })
  static LAG = new MysqlKeyword("LAG", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static LANGUAGE = new MysqlKeyword("LANGUAGE")
  static LAST = new MysqlKeyword("LAST")
  static LAST_VALUE = new MysqlKeyword("LAST_VALUE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static LATERAL = new MysqlKeyword("LATERAL", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.14", options.version || "0")
  } })
  static LEAD = new MysqlKeyword("LEAD", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static LEADING = new MysqlKeyword("LEADING", { reserved: true })
  static LEAVE = new MysqlKeyword("LEAVE", { reserved: true })
  static LEFT = new MysqlKeyword("LEFT", { reserved: true })
  static LESS = new MysqlKeyword("LESS")
  static LEVEL = new MysqlKeyword("LEVEL")
  static LIKE = new MysqlKeyword("LIKE", { reserved: true })
  static LIMIT = new MysqlKeyword("LIMIT", { reserved: true })
  static LINEAR = new MysqlKeyword("LINEAR", { reserved: true })
  static LINES = new MysqlKeyword("LINES", { reserved: true })
  static LIST = new MysqlKeyword("LIST")
  static LOAD = new MysqlKeyword("LOAD", { reserved: true })
  static LOCAL = new MysqlKeyword("LOCAL")
  static LOCALTIME = new MysqlKeyword("LOCALTIME", { reserved: true })
  static LOCALTIMESTAMP = new MysqlKeyword("LOCALTIMESTAMP", { reserved: true })
  static LOCK = new MysqlKeyword("LOCK", { reserved: true })
  static LOGFILE = new MysqlKeyword("LOGFILE")
  static LOGS = new MysqlKeyword("LOGS")
  static LONG = new MysqlKeyword("LONG", { reserved: true })
  static LONGBLOB = new MysqlKeyword("LONGBLOB", { reserved: true })
  static LONGTEXT = new MysqlKeyword("LONGTEXT", { reserved: true })
  static LOOP = new MysqlKeyword("LOOP", { reserved: true })
  static LOW_PRIORITY = new MysqlKeyword("LOW_PRIORITY", { reserved: true })
  static MASTER = new MysqlKeyword("MASTER")
  static MASTER_BIND = new MysqlKeyword("MASTER_BIND", { reserved: true })
  static MASTER_SERVER_ID = new MysqlKeyword("MASTER_SERVER_ID", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static MASTER_SSL_VERIFY_SERVER_CERT = new MysqlKeyword("MASTER_SSL_VERIFY_SERVER_CERT", { reserved: true })
  static MATCH = new MysqlKeyword("MATCH", { reserved: true })
  static MAX_CONNECTIONS_PER_HOUR = new MysqlKeyword("MAX_CONNECTIONS_PER_HOUR")
  static MAX_QUERIES_PER_HOUR = new MysqlKeyword("MAX_QUERIES_PER_HOUR")
  static MAX_ROWS = new MysqlKeyword("MAX_ROWS")
  static MAX_SIZE = new MysqlKeyword("MAX_SIZE")
  static MAX_UPDATES_PER_HOUR = new MysqlKeyword("MAX_UPDATES_PER_HOUR")
  static MAX_USER_CONNECTIONS = new MysqlKeyword("MAX_USER_CONNECTIONS")
  static MAXVALUE = new MysqlKeyword("MAXVALUE", { reserved: true })
  static MEDIUMBLOB = new MysqlKeyword("MEDIUMBLOB", { reserved: true })
  static MEDIUMINT = new MysqlKeyword("MEDIUMINT", { reserved: true })
  static MEDIUMTEXT = new MysqlKeyword("MEDIUMTEXT", { reserved: true })
  static MEMORY = new MysqlKeyword("MEMORY")
  static MERGE = new MysqlKeyword("MERGE")
  static MIDDLEINT = new MysqlKeyword("MIDDLEINT", { reserved: true })
  static MIN_ROWS = new MysqlKeyword("MIN_ROWS")
  static MINVALUE = new MysqlKeyword("MINVALUE")
  static MINUTE = new MysqlKeyword("MINUTE")
  static MINUTE_MICROSECOND = new MysqlKeyword("MINUTE_MICROSECOND", { reserved: true })
  static MINUTE_SECOND = new MysqlKeyword("MINUTE_SECOND", { reserved: true })
  static MOD = new MysqlKeyword("MOD", { reserved: true })
  static MODIFIES = new MysqlKeyword("MODIFIES", { reserved: true })
  static MODIFY = new MysqlKeyword("MODIFY")
  static MONTH = new MysqlKeyword("MONTH")
  static NAME = new MysqlKeyword("NAME")
  static NAMES = new MysqlKeyword("NAMES")
  static NATIONAL = new MysqlKeyword("NATIONAL")
  static NATURAL = new MysqlKeyword("NATURAL", { reserved: true })
  static NCHAR = new MysqlKeyword("NCHAR")
  static NEVER = new MysqlKeyword("NEVER")
  static NONE = new MysqlKeyword("NONE")
  static NO = new MysqlKeyword("NO")
  static NOT = new MysqlKeyword("NOT", { reserved: true })
  static NO_WRITE_TO_BINLOG = new MysqlKeyword("NO_WRITE_TO_BINLOG", { reserved: true })
  static NOCACHE = new MysqlKeyword("NOCACHE")
  static NOCYCLE = new MysqlKeyword("NOCYCLE")
  static NODEGROUP = new MysqlKeyword("NODEGROUP")
  static NOMINVALUE = new MysqlKeyword("NOMINVALUE")
  static NOMAXVALUE = new MysqlKeyword("NOMAXVALUE")
  static NTH_VALUE = new MysqlKeyword("NTH_VALUE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static NTILE = new MysqlKeyword("NTILE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static NULL = new MysqlKeyword("NULL", { reserved: true })
  static NUMERIC = new MysqlKeyword("NUMERIC", { reserved: true })
  static NVARCHAR = new MysqlKeyword("NVARCHAR")
  static OF = new MysqlKeyword("OF", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static OLD = new MysqlKeyword("OLD")
  static ON = new MysqlKeyword("ON", { reserved: true })
  static ONLY = new MysqlKeyword("ONLY")
  static OPTIMIZE = new MysqlKeyword("OPTIMIZE", { reserved: true })
  static OPTIMIZER_COSTS = new MysqlKeyword("OPTIMIZER_COSTS", { reserved: true })
  static OPTION = new MysqlKeyword("OPTION", { reserved: true })
  static OPTIONAL = new MysqlKeyword("OPTIONAL")
  static OPTIONS = new MysqlKeyword("OPTIONS")
  static OPTIONALLY = new MysqlKeyword("OPTIONALLY", { reserved: true })
  static OR = new MysqlKeyword("OR", { reserved: true })
  static ORDER = new MysqlKeyword("ORDER", { reserved: true })
  static ORGANIZATION = new MysqlKeyword("ORGANIZATION")
  static OUT = new MysqlKeyword("OUT", { reserved: true })
  static OUTER = new MysqlKeyword("OUTER", { reserved: true })
  static OUTFILE = new MysqlKeyword("OUTFILE", { reserved: true })
  static OVER = new MysqlKeyword("OVER", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static OWNER = new MysqlKeyword("OWNER")
  static PACK_KEYS = new MysqlKeyword("PACK_KEYS")
  static PACKAGE = new MysqlKeyword("PACKAGE")
  static PAGE_CHECKSUM = new MysqlKeyword("PAGE_CHECKSUM")
  static PAGE_COMPRESSED = new MysqlKeyword("PAGE_COMPRESSED")
  static PAGE_COMPRESSION_LEVEL = new MysqlKeyword("PAGE_COMPRESSION_LEVEL")
  static PARSE_GCOL_EXPR = new MysqlKeyword("PARSE_GCOL_EXPR", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static PARSER = new MysqlKeyword("PARSER")
  static PARTIAL = new MysqlKeyword("PARTIAL")
  static PARTITION = new MysqlKeyword("PARTITION", { reserved: true })
  static PARTITIONS = new MysqlKeyword("PARTITIONS")
  static PASSWORD = new MysqlKeyword("PASSWORD")
  static PASSWORD_LOCK_TIME = new MysqlKeyword("PASSWORD_LOCK_TIME")
  static PERCENT_RANK = new MysqlKeyword("PERCENT_RANK", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static PLUGIN = new MysqlKeyword("PLUGIN")
  static PORT = new MysqlKeyword("PORT")
  static PRECEDES = new MysqlKeyword("PRECEDES")
  static PRECISION = new MysqlKeyword("PRECISION", { reserved: true })
  static PREPARE = new MysqlKeyword("PREPARE")
  static PRESERVE  = new MysqlKeyword("PRESERVE")
  static PRIMARY = new MysqlKeyword("PRIMARY", { reserved: true })
  static PROCEDURE = new MysqlKeyword("PROCEDURE", { reserved: true })
  static PURGE = new MysqlKeyword("PURGE", { reserved: true })
  static QUARTER = new MysqlKeyword("QUARTER")
  static QUICK = new MysqlKeyword("QUICK")
  static RANDOM = new MysqlKeyword("RANDOM")
  static RANGE = new MysqlKeyword("RANGE", { reserved: true })
  static RANK = new MysqlKeyword("RANK", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static READ = new MysqlKeyword("READ", { reserved: true })
  static READS = new MysqlKeyword("READS", { reserved: true })
  static READ_WRITE = new MysqlKeyword("READ_WRITE", { reserved: true })
  static REAL = new MysqlKeyword("REAL", { reserved: true })
  static RECOVER = new MysqlKeyword("RECOVER")
  static RECURSIVE = new MysqlKeyword("RECURSIVE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static REDO_BUFFER_SIZE = new MysqlKeyword("REDO_BUFFER_SIZE")
  static REDOFILE = new MysqlKeyword("REDOFILE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static REDUNDANT = new MysqlKeyword("REDUNDANT")
  static REFERENCE = new MysqlKeyword("REFERENCE")
  static REFERENCES = new MysqlKeyword("REFERENCES", { reserved: true })
  static REGEXP = new MysqlKeyword("REGEXP", { reserved: true })
  static RELEASE = new MysqlKeyword("RELEASE", { reserved: true })
  static RENAME = new MysqlKeyword("RENAME", { reserved: true })
  static REPAIR = new MysqlKeyword("REPAIR")
  static REPEAT = new MysqlKeyword("REPEAT", { reserved: true })
  static REPEATABLE = new MysqlKeyword("REPEATABLE")
  static REPLACE = new MysqlKeyword("REPLACE", { reserved: true })
  static REPLICA = new MysqlKeyword("REPLICA")
  static REQUIRE = new MysqlKeyword("REQUIRE", { reserved: true })
  static RESET = new MysqlKeyword("RESET")
  static RESIGNAL = new MysqlKeyword("RESIGNAL", { reserved: true })
  static RESOURCE = new MysqlKeyword("RESOURCE")
  static RESTART = new MysqlKeyword("RESTART")
  static RESTRICT = new MysqlKeyword("RESTRICT", { reserved: true })
  static RETAIN = new MysqlKeyword("RETAIN")
  static RETURN = new MysqlKeyword("RETURN", { reserved: true })
  static REUSE = new MysqlKeyword("REUSE")
  static REVOKE = new MysqlKeyword("REVOKE", { reserved: true })
  static RIGHT = new MysqlKeyword("RIGHT", { reserved: true })
  static RLIKE = new MysqlKeyword("RLIKE", { reserved: true })
  static ROLE = new MysqlKeyword("ROLE")
  static ROLLBACK = new MysqlKeyword("ROLLBACK")
  static ROW = new MysqlKeyword("ROW", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static ROW_FORMAT = new MysqlKeyword("ROW_FORMAT")
  static ROWS = new MysqlKeyword("ROWS", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static ROW_NUMBER = new MysqlKeyword("ROW_NUMBER", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static RTREE = new MysqlKeyword("RTREE")
  static SAVEPOINT = new MysqlKeyword("SAVEPOINT")
  static SECURITY = new MysqlKeyword("SECURITY")
  static SCHEDULE = new MysqlKeyword("SCHEDULE")
  static SCHEMA = new MysqlKeyword("SCHEMA", { reserved: true })
  static SCHEMAS = new MysqlKeyword("SCHEMAS", { reserved: true })
  static SECOND = new MysqlKeyword("SECOND")
  static SECOND_MICROSECOND = new MysqlKeyword("SECOND_MICROSECOND", { reserved: true })
  static SECONDARY_ENGINE_ATTRIBUTE = new MysqlKeyword("SECONDARY_ENGINE_ATTRIBUTE")
  static SELECT = new MysqlKeyword("SELECT", { reserved: true })
  static SENSITIVE = new MysqlKeyword("SENSITIVE", { reserved: true })
  static SEPARATOR = new MysqlKeyword("SEPARATOR", { reserved: true })
  static SEQUENCE = new MysqlKeyword("SEQUENCE")
  static SERIALIZABLE = new MysqlKeyword("SERIALIZABLE")
  static SERVER = new MysqlKeyword("SERVER")
  static SESSION = new MysqlKeyword("SESSION")
  static SET = new MysqlKeyword("SET", { reserved: true })
  static SHARED = new MysqlKeyword("SHARED")
  static SHOW = new MysqlKeyword("SHOW", { reserved: true })
  static SHUTDOWN = new MysqlKeyword("SHUTDOWN")
  static SIGNAL = new MysqlKeyword("SIGNAL", { reserved: true })
  static SIGNED = new MysqlKeyword("SIGNED")
  static SIMPLE = new MysqlKeyword("SIMPLE")
  static SLAVE = new MysqlKeyword("SLAVE")
  static SMALLINT = new MysqlKeyword("SMALLINT", { reserved: true })
  static SNAPSHOT = new MysqlKeyword("SNAPSHOT")
  static SOCKET = new MysqlKeyword("SOCKET")
  static SPATIAL = new MysqlKeyword("SPATIAL", { reserved: true })
  static SPECIFIC = new MysqlKeyword("SPECIFIC", { reserved: true })
  static SQL = new MysqlKeyword("SQL", { reserved: true })
  static SQLEXCEPTION = new MysqlKeyword("SQLEXCEPTION", { reserved: true })
  static SQLSTATE = new MysqlKeyword("SQLSTATE", { reserved: true })
  static SQLWARNING = new MysqlKeyword("SQLWARNING", { reserved: true })
  static SQL_BIG_RESULT = new MysqlKeyword("SQL_BIG_RESULT", { reserved: true })
  static SQL_CACHE = new MysqlKeyword("SQL_CACHE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static SQL_CALC_FOUND_ROWS = new MysqlKeyword("SQL_CALC_FOUND_ROWS", { reserved: true })
  static SQL_SMALL_RESULT = new MysqlKeyword("SQL_SMALL_RESULT", { reserved: true })
  static SSL = new MysqlKeyword("SSL", { reserved: true })
  static START = new MysqlKeyword("START")
  static STARTING = new MysqlKeyword("STARTING", { reserved: true })
  static STARTS = new MysqlKeyword("STARTS")
  static STATS_AUTO_RECALC = new MysqlKeyword("STATS_AUTO_RECALC")
  static STATS_PERSISTENT = new MysqlKeyword("STATS_PERSISTENT")
  static STATS_SAMPLE_PAGES = new MysqlKeyword("STATS_SAMPLE_PAGES")
  static STOP = new MysqlKeyword("STOP")
  static STORAGE = new MysqlKeyword("STORAGE")
  static STORED = new MysqlKeyword("STORED", { reserved: true })
  static STRAIGHT_JOIN = new MysqlKeyword("STRAIGHT_JOIN", { reserved: true })
  static SUBJECT = new MysqlKeyword("SUBJECT")
  static SUBPARTITION = new MysqlKeyword("SUBPARTITION")
  static SYSTEM = new MysqlKeyword("SYSTEM", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.3", options.version || "0")
  } })
  static T = new MysqlKeyword("T")
  static TABLE = new MysqlKeyword("TABLE", { reserved: true })
  static TABLES = new MysqlKeyword("TABLES")
  static TABLESPACE = new MysqlKeyword("TABLESPACE")
  static TEMPORARY = new MysqlKeyword("TEMPORARY")
  static TEMPTABLE = new MysqlKeyword("TEMPTABLE")
  static TERMINATED = new MysqlKeyword("TERMINATED", { reserved: true })
  static TEXT = new MysqlKeyword("TEXT")
  static THAN = new MysqlKeyword("THAN")
  static THEN = new MysqlKeyword("THEN", { reserved: true })
  static THREAD_PRIORITY = new MysqlKeyword("THREAD_PRIORITY")
  static TIME = new MysqlKeyword("TIME")
  static TIMESTAMP = new MysqlKeyword("TIMESTAMP")
  static TINYBLOB = new MysqlKeyword("TINYBLOB", { reserved: true })
  static TINYINT = new MysqlKeyword("TINYINT", { reserved: true })
  static TINYTEXT = new MysqlKeyword("TINYTEXT", { reserved: true })
  static TO = new MysqlKeyword("TO", { reserved: true })
  static TRAILING = new MysqlKeyword("TRAILING", { reserved: true })
  static TRANSACTION = new MysqlKeyword("TRANSACTION")
  static TRANSACTIONAL = new MysqlKeyword("TRANSACTIONAL")
  static TRIGGER = new MysqlKeyword("TRIGGER", { reserved: true })
  static TRUE = new MysqlKeyword("TRUE", { reserved: true })
  static TRUNCATE = new MysqlKeyword("TRUNCATE")
  static TS = new MysqlKeyword("TS")
  static TYPE = new MysqlKeyword("TYPE")
  static UNBOUNDED = new MysqlKeyword("UNBOUNDED")
  static UNCOMMITTED = new MysqlKeyword("UNCOMMITTED")
  static UNDEFINED = new MysqlKeyword("UNDEFINED")
  static UNDO = new MysqlKeyword("UNDO", { reserved: true })
  static UNDO_BUFFER_SIZE = new MysqlKeyword("UNDO_BUFFER_SIZE")
  static UNDOFILE = new MysqlKeyword("UNDOFILE")
  static UNICODE = new MysqlKeyword("UNICODE")
  static UNINSTALL = new MysqlKeyword("UNINSTALL")
  static UNION = new MysqlKeyword("UNION", { reserved: true })
  static UNIQUE = new MysqlKeyword("UNIQUE", { reserved: true })
  static UNKNOWN = new MysqlKeyword("UNKNOWN")
  static UNLOCK = new MysqlKeyword("UNLOCK", { reserved: true })
  static UNSIGNED = new MysqlKeyword("UNSIGNED", { reserved: true })
  static UPDATE = new MysqlKeyword("UPDATE", { reserved: true })
  static USAGE = new MysqlKeyword("USAGE", { reserved: true })
  static USE = new MysqlKeyword("USE", { reserved: true })
  static USER = new MysqlKeyword("USER")
  static USING = new MysqlKeyword("USING", { reserved: true })
  static UTC_DATE = new MysqlKeyword("UTC_DATE", { reserved: true })
  static UTC_TIME = new MysqlKeyword("UTC_TIME", { reserved: true })
  static UTC_TIMESTAMP = new MysqlKeyword("UTC_TIMESTAMP", { reserved: true })
  static VALUES = new MysqlKeyword("VALUES", { reserved: true })
  static VARBINARY = new MysqlKeyword("VARBINARY", { reserved: true })
  static VARCHAR = new MysqlKeyword("VARCHAR", { reserved: true })
  static VARCHARACTER = new MysqlKeyword("VARCHARACTER", { reserved: true })
  static VARYING = new MysqlKeyword("VARYING", { reserved: true })
  static VCPU = new MysqlKeyword("VCPU")
  static VERSIONING = new MysqlKeyword("VERSIONING")
  static VIEW = new MysqlKeyword("VIEW")
  static VIRTUAL = new MysqlKeyword("VIRTUAL", { reserved: true })
  static VISIBLE = new MysqlKeyword("VISIBLE")
  static WITHOUT = new MysqlKeyword("WITHOUT")
  static INVISIBLE = new MysqlKeyword("INVISIBLE")
  static WAIT = new MysqlKeyword("WAIT")
  static WEEK = new MysqlKeyword("WEEK")
  static WHEN = new MysqlKeyword("WHEN", { reserved: true })
  static WHERE = new MysqlKeyword("WHERE", { reserved: true })
  static WHILE = new MysqlKeyword("WHILE", { reserved: true })
  static WINDOW = new MysqlKeyword("WINDOW", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static WITH = new MysqlKeyword("WITH", { reserved: true })
  static WORK = new MysqlKeyword("WORK")
  static WRAPPER = new MysqlKeyword("WRAPPER")
  static WRITE = new MysqlKeyword("WRITE", { reserved: true })
  static X509 = new MysqlKeyword("X509")
  static XA = new MysqlKeyword("XA")
  static XML = new MysqlKeyword("XML")
  static XOR = new MysqlKeyword("XOR", { reserved: true })
  static YES = new MysqlKeyword("YES")
  static YEAR = new MysqlKeyword("YEAR")
  static YEAR_MONTH = new MysqlKeyword("YEAR_MONTH", { reserved: true })
  static ZEROFILL = new MysqlKeyword("ZEROFILL", { reserved: true })

  static OPE_ASSIGN = new MysqlKeyword("OPE_EQ", { value: ":=" })
  static OPE_EQ = new MysqlKeyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new MysqlKeyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new MysqlKeyword("OPE_MINUS", { value: "-" })

  static VAR_GLOBAL = new MysqlKeyword("VAR_GLOBAL", { value: "@@GLOBAL" })
  static VAR_SESSION = new MysqlKeyword("VAR_SESSION", { value: "@@SESSION" })
  static VAR_LOCAL = new MysqlKeyword("VAR_LOCAL", { value: "@@LOCAL" })

  constructor(
    name: string,
    options: Record<string, any> = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

const Keyword = MysqlKeyword
export class MysqlLexer extends Lexer {
  private static COMMAND_PATTERN = "^(\\?|\\\\[!-~]|clear|connect|delimiter|edit|ego|exit|go|help|nopager|notee|pager|print|prompt|quit|rehash|source|status|system|tee|use|charset|warnings|nowarning)(?:[ \\t]*.*)"

  private reserved = new Set<MysqlKeyword>()
  private reCommand = new RegExp(MysqlLexer.COMMAND_PATTERN + "(;|$)", "imy")
  private reDelimiter = new RegExp(";", "y")

  constructor(
    options: Record<string, any> = {}
  ) {
    super("mysql", [
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy, skip: true },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy, skip: true },
      { type: TokenType.LineComment, re: /(#.*|--([ \t].*)$)/my, skip: true },
      { type: TokenType.Command, re: () => this.reCommand },
      { type: TokenType.WhiteSpace, re: /[ \t]+/y, skip: true },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y, skip: true },
      { type: TokenType.Delimiter, re: () => this.reDelimiter },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Size, re: /(0|[1-9][0-9]*)[KMG]/iy },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /([bBnN]|_[a-zA-Z]+)?'([^']|'')*'/y },
      { type: TokenType.QuotedValue, re: /([bBnN]|_[a-zA-Z]+)?"([^"]|"")*"/y },
      { type: TokenType.QuotedIdentifier, re: /`([^`]|``)*`/y },
      { type: TokenType.BindVariable, re: /\?/y },
      { type: TokenType.SessionVariable, re: /@@([a-zA-Z0-9._$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]+|`([^`]|``)*`|'([^']|'')*'|"([^"]|"")*")/y },
      { type: TokenType.UserVariable, re: /@([a-zA-Z0-9._$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]+|`([^`]|``)*`|'([^']|'')*'|"([^"]|"")*")/y },
      { type: TokenType.Identifier, re: /[a-zA-Z_$\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\|&&|<=>|<<|>>|<>|->>?|[=<>!:]=?|[~&|^*/%+-]/y },
      { type: TokenType.Error, re: /./y },
    ], options)

    if (Array.isArray(options.reservedWords)) {
      const reserved = new Set<string>()
      for (const keyword of options.reservedWords) {
        reserved.add(ucase(keyword))
      }
      for (const keyword of KeywordMap.values()) {
        if (reserved.has(keyword.name)) {
          this.reserved.add(keyword)
        }
      }
    } else {
      for (const keyword of KeywordMap.values()) {
        if (typeof keyword.options.reserved === "function") {
          if (keyword.options.reserved(options)) {
            this.reserved.add(keyword)
          }
        } else if (keyword.options.reserved === true) {
          this.reserved.add(keyword)
        }
      }
    }
  }

  protected filter(input: string) {
    return input.replace(/\/\*!([0-9]*)(.*?)\*\//sg, (m, p1, p2) => {
      if (this.options.version && p1) {
        if (semver.lt(this.options.version, this.toSemverString(p1))) {
          return m
        }
      }
      return " ".repeat((p1 ? p1.length : 0) + 2) + p2 + "  "
    })
  }

  protected process(token: Token) {
    if (
      token.type === TokenType.Identifier ||
      token.type === TokenType.Operator ||
      token.type === TokenType.SessionVariable
    ) {
      const keyword = KeywordMap.get(token.text.toUpperCase())
      if (keyword) {
        if (this.reserved.has(keyword)) {
          token.type = keyword
        } else {
          token.subtype = keyword
        }
      }
    } else if (token.type === TokenType.Command) {
      const m = /^(?:\\d|[Dd][Ee][Ll][Ii][Mm][Ii][Tt][Ee][Rr])[ \t]+(.+)$/.exec(token.text)
      if (m) {
        const sep = escapeRegExp(m[1])
        this.reCommand = new RegExp(`${MysqlLexer.COMMAND_PATTERN}(${sep}|$)`, "imy")
        this.reDelimiter = new RegExp(sep, "y")
      }
    }
    return token
  }
  
  private toSemverString(version: string) {
    const value = Number.parseInt(version, 10)
    const major = Math.trunc(value / 10000)
    const minor = Math.trunc(value / 100 % 100)
    const patch = Math.trunc(value % 100)
    return `${major}.${minor}.${patch}`
  }  
}

export class MysqlSplitter extends Splitter {
  static split: SplitFunction = function(input: string, options: Record<string, any> = {}) {
    const tokens = new MysqlLexer(options).lex(input, options.fileName)
    const stmts = new MysqlSplitter(options).split(tokens)
    return stmts
  }

  constructor(
    options: Record<string, any> = {},
  ) {
    super(options)
  }

  split(tokens: Token[]): Token[][] {
    const segments = new Array<Token[]>()

    let segment: Token[] | undefined
    for (const token of tokens) {
      if (!segment) {
        segment = []
        segments.push(segment)
      }
      if (token.is(TokenType.Command)) {
        segment = []
        segment.push(token)
        segments.push(segment)
        segment = undefined
      } else if (token.is(TokenType.Delimiter) || token.is(TokenType.Eof)) {
        segment.push(token)
        segment = undefined
      } else {
        segment.push(token)
      }
    }

    return segments
  }
}

export class MysqlParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new MysqlLexer(options).lex(input)
    return new MysqlParser(tokens, options).parse()
  }

  private sqlMode = new Set<string>()

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
    this.setSqlMode(options.sqlMode)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Eof)) {
          root.add(this.consume())
          break
        } else if (this.peekIf(TokenType.Delimiter)) {
          root.add(this.consume())
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          root.add(this.statement())
        }
      } catch (e) {
        if (e instanceof ParseError) {
          if (e.node) {
            root.add(e.node)
          }
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (this.token() != null) {
      for (let i = this.pos; i < this.tokens.length; i++) {
        root.add(this.tokens[i])
      }
      
      try {
        throw this.createParseError()
      } catch (e) {
        if (e instanceof ParseError) {
          errors.push(e)
        } else {
          throw e
        }
      }
    }

    if (errors.length) {
      const err = new AggregateParseError(errors, `${errors.length} error found\n${errors.map(
        e => e.message
      ).join("\n")}`)
      err.node = root
      throw err
    }

    return root
  }

  private command() {
    const stmt = new Node("command")
    this.consume(TokenType.Command)
    const token = this.token(-1)

    const sep = Math.max(token.text.indexOf(" "), token.text.indexOf("\t"))
    if (sep === -1) {
      stmt.add(new Node("name", this.getLongCommandName(token.text)).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), [], token.location)
      const name = this.getLongCommandName(nameToken.text)
      stmt.add(new Node("name", name).add(nameToken))

      const argTokens = []
      const args = token.text.substring(sep)

      if (name === "prompt") {
        const m = /^[ \t]*/.exec(args)
        let sep2 = sep
        if (m) {
          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = sep2
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(TokenType.WhiteSpace, m[0], [], token.location))
          sep2 += m[0].length
        }
        if (sep2 < args.length) {
          const loc = new SourceLocation()
          loc.fileName = token.location?.fileName
          loc.position = sep2
          loc.lineNumber = token.location?.lineNumber
          if (token.location?.columnNumber != null) {
            loc.columnNumber = token.location?.columnNumber + loc.position
          }

          argTokens.push(new Token(TokenType.Identifier, args.substring(sep2), [], loc))
        }
      } else {
        const re = /([ \t]+)|('(?:''|[^']+)*'|`(?:``|[^`]+)*`)|([^ \t'`]+)/y
        let pos = 0
        while (pos < args.length) {
          re.lastIndex = pos
          const m = re.exec(args)
          if (m) {
            const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier

            const loc = new SourceLocation()
            loc.fileName = token.location?.fileName
            loc.position = re.lastIndex
            loc.lineNumber = token.location?.lineNumber
            if (token.location?.columnNumber != null) {
              loc.columnNumber = token.location?.columnNumber + loc.position
            }

            argTokens.push(new Token(type, m[0], [], loc))
            pos = re.lastIndex
          }
        }
      }

      const skips = new Array<Token>()
      for (const argToken of argTokens) {
        if (argToken.type.options.skip) {
          skips.push(argToken)
        } else {
          argToken.skips.push(...skips)
          skips.length = 0
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    return stmt
  }

  private statement() {
    const stmt = new Node("")

    try {
      //TODO
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        while (this.token() && !this.peekIf(TokenType.Delimiter)) {
          this.consume()
          stmt.add(this.token(-1))
        }
        err.node = stmt
      }
      throw err
    }

    return stmt
  }

  private setSqlMode(text: string) {
    this.sqlMode.clear()
    if (text) {
      for (let mode of text.split(/,/g)) {
        mode = ucase(mode)
        if (mode === "ANSI") {
          this.sqlMode.add("REAL_AS_FLOAT")
          this.sqlMode.add("PIPES_AS_CONCAT")
          this.sqlMode.add("ANSI_QUOTES")
          this.sqlMode.add("IGNORE_SPACE")
          if (this.options.variant === "mysql") {
            if (!this.options.version || semver.gte(this.options.version, "8.0.0")) {
              this.sqlMode.add("ONLY_FULL_GROUP_BY")
            }
          }
        } else if (mode === "TRADITIONAL") {
          this.sqlMode.add("STRICT_TRANS_TABLES")
          this.sqlMode.add("STRICT_ALL_TABLES")
          this.sqlMode.add("NO_ZERO_IN_DATE")
          this.sqlMode.add("NO_ZERO_DATE")
          this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
          this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
        } else {
          if (this.options.variant === "mariadb" || semver.lt(this.options.version, "8.0.0")) {
            if (mode === "DB2" || mode === "MAXDB" || mode === "MSSQL" || mode === "ORACLE" || mode === "POSTGRESQL") {
              if (mode === "DB2") {
                this.sqlMode.add("DB2")
              } else if (mode === "MAXDB") {
                this.sqlMode.add("MAXDB")
                this.sqlMode.add("NO_AUTO_CREATE_USER")
              } else if (mode === "ORACLE") {
                this.sqlMode.add("NO_AUTO_CREATE_USER")
                this.sqlMode.add("SIMULTANEOUS_ASSIGNMENT")
              } else if (mode === "POSTGRESQL") {
                this.sqlMode.add("POSTGRESQL")
              }
              this.sqlMode.add("PIPES_AS_CONCAT")
              this.sqlMode.add("ANSI_QUOTES")
              this.sqlMode.add("IGNORE_SPACE")
              this.sqlMode.add("NO_KEY_OPTIONS")
              this.sqlMode.add("NO_TABLE_OPTIONS")
              this.sqlMode.add("NO_FIELD_OPTIONS")
            } else if (mode === "MYSQL323" || mode === "MYSQL40") {
              this.sqlMode.add("NO_FIELD_OPTIONS")
              this.sqlMode.add("HIGH_NOT_PRECEDENCE")
            } else {
              this.sqlMode.add(mode)
            }
          } else {
            this.sqlMode.add(mode)
          }
        }
      }
    } else if (this.options.variant === "mariadb") {
      if (!this.options.version || semver.gte(this.options.version, "10.2.4")) {
        this.sqlMode.add("STRICT_TRANS_TABLES")
        this.sqlMode.add("NO_AUTO_CREATE_USER")
        this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      } else if (semver.gte(this.options.version, "10.1.7")) {
        this.sqlMode.add("NO_AUTO_CREATE_USER")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      }
    } else {
      if (!this.options.version || semver.gte(this.options.version, "8.0.0")) {
        this.sqlMode.add("ONLY_FULL_GROUP_BY")
        this.sqlMode.add("STRICT_TRANS_TABLES")
        this.sqlMode.add("NO_ZERO_IN_DATE")
        this.sqlMode.add("NO_ZERO_DATE")
        this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      } else if (semver.gte(this.options.version, "5.7.0")) {
        this.sqlMode.add("ONLY_FULL_GROUP_BY")
        this.sqlMode.add("STRICT_TRANS_TABLES")
        this.sqlMode.add("NO_ZERO_IN_DATE")
        this.sqlMode.add("NO_ZERO_DATE")
        this.sqlMode.add("ERROR_FOR_DIVISION_BY_ZERO")
        this.sqlMode.add("NO_AUTO_CREATE_USER")
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      } else if (semver.gte(this.options.version, "5.6.6")) {
        this.sqlMode.add("NO_ENGINE_SUBSTITUTION")
      }
    }
  }

  private getLongCommandName(name: string) {
    if (name === "?" || name === "\\?" || name === "\\h" || /^help$/i.test(name)) {
      return "help"
    } else if (name === "\\c" || /^clear$/i.test(name)) {
      return "clear"
    } else if (name === "\\r" || /^connect$/i.test(name)) {
      return "connect"
    } else if (name === "\\d" || /^delimiter$/i.test(name)) {
      return "delimiter"
    } else if (name === "\\e" || /^edit$/i.test(name)) {
      return "edit"
    } else if (name === "\\G" || /^ego$/i.test(name)) {
      return "ego"
    } else if (name === "\\q" || /^exit$/i.test(name)) {
      return "exit"
    } else if (name === "\\g" || /^go$/i.test(name)) {
      return "go"
    } else if (name === "\\n" || /^nopager$/i.test(name)) {
      return "nopager"
    } else if (name === "\\t" || /^notee$/i.test(name)) {
      return "notee"
    } else if (name === "\\P" || /^pager$/i.test(name)) {
      return "pager"
    } else if (name === "\\p" || /^print$/i.test(name)) {
      return "print"
    } else if (name === "\\R" || /^prompt$/i.test(name)) {
      return "prompt"
    } else if (name === "\\q" || /^quit$/i.test(name)) {
      return "quit"
    } else if (name === "\\#" || /^rehash$/i.test(name)) {
      return "rehash"
    } else if (name === "\\." || /^source$/i.test(name)) {
      return "source"
    } else if (name === "\\s" || /^status$/i.test(name)) {
      return "status"
    } else if (name === "\\!" || /^system$/i.test(name)) {
      return "system"
    } else if (name === "\\T" || /^tee$/i.test(name)) {
      return "tee"
    } else if (name === "\\u" || /^use$/i.test(name)) {
      return "use"
    } else if (name === "\\C" || /^charset$/i.test(name)) {
      return "charset"
    } else if (name === "\\W" || /^warnings$/i.test(name)) {
      return "warnings"
    } else if (name === "\\w" || /^nowarning$/i.test(name)) {
      return "nowarning"
    } else {
      return name
    }
  }
}