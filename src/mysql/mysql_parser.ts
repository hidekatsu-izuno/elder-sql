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
} from "../parser"
import { dequote, escapeRegExp, ucase } from "../util"

const KeywordMap = new Map<string, Keyword>()
export class Keyword extends TokenType {
  static ACCESSIBLE = new Keyword("ACCESSIBLE", { reserved: true })
  static ACCOUNT = new Keyword("ACCOUNT")
  static ACTION = new Keyword("ACTION")
  static ACTIVE = new Keyword("ACTIVE")
  static ADD = new Keyword("ADD", { reserved: true })
  static ADMIN = new Keyword("ADMIN")
  static AFTER = new Keyword("AFTER")
  static AGGREGATE = new Keyword("AGGREGATE")
  static ALGORITHM = new Keyword("ALGORITHM")
  static ALL = new Keyword("ALL", { reserved: true })
  static ALTER = new Keyword("ALTER", { reserved: true })
  static ALWAYS = new Keyword("ALWAYS")
  static ANALYSE = new Keyword("ANALYSE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static ANALYZE = new Keyword("ANALYZE", { reserved: true })
  static AND = new Keyword("AND", { reserved: true })
  static AS = new Keyword("AS", { reserved: true })
  static ASC = new Keyword("ASC", { reserved: true })
  static ASCII = new Keyword("ASCII")
  static ASENSITIVE = new Keyword("ASENSITIVE", { reserved: true })
  static AT = new Keyword("AT")
  static ATTRIBUTE = new Keyword("ATTRIBUTE")
  static AUTO_INCREMENT = new Keyword("AUTO_INCREMENT")
  static AUTOEXTEND_SIZE = new Keyword("AUTOEXTEND_SIZE")
  static AVG_ROW_LENGTH = new Keyword("AVG_ROW_LENGTH")
  static BEFORE = new Keyword("BEFORE", { reserved: true })
  static BEGIN = new Keyword("BEGIN")
  static BETWEEN = new Keyword("BETWEEN", { reserved: true })
  static BIGINT = new Keyword("BIGINT", { reserved: true })
  static BINARY = new Keyword("BINARY", { reserved: true })
  static BINLOG = new Keyword("BINLOG")
  static BIT = new Keyword("BIT")
  static BLOB = new Keyword("BLOB", { reserved: true })
  static BODY = new Keyword("BODY")
  static BOOL = new Keyword("BOOL")
  static BOOLEAN = new Keyword("BOOLEAN")
  static BOTH = new Keyword("BOTH", { reserved: true })
  static BTREE = new Keyword("BTREE")
  static BY = new Keyword("BY", { reserved: true })
  static CALL = new Keyword("CALL", { reserved: true })
  static CACHE = new Keyword("CACHE")
  static CASCADE = new Keyword("CASCADE", { reserved: true })
  static CASCADED = new Keyword("CASCADED")
  static CASE = new Keyword("CASE", { reserved: true })
  static CHAIN = new Keyword("CHAIN")
  static CHANGE = new Keyword("CHANGE", { reserved: true })
  static CHAR = new Keyword("CHAR", { reserved: true })
  static CHARACTER = new Keyword("CHARACTER", { reserved: true })
  static CHARSET = new Keyword("CHARSET")
  static CHECK = new Keyword("CHECK", { reserved: true })
  static CHECKSUM = new Keyword("CHECKSUM")
  static CIPHER = new Keyword("CIPHER")
  static COLLATE = new Keyword("COLLATE", { reserved: true })
  static CLONE = new Keyword("CLONE")
  static CLUSTERING = new Keyword("CLUSTERING")
  static COLUMN = new Keyword("COLUMN", { reserved: true })
  static COLUMN_FORMAT = new Keyword("COLUMN_FORMAT")
  static COLUMNS = new Keyword("COLUMNS")
  static COMMENT = new Keyword("COMMENT")
  static COMMIT = new Keyword("COMMIT")
  static COMMITTED = new Keyword("COMMITTED")
  static COMPACT = new Keyword("COMPACT")
  static COMPLETION = new Keyword("COMPLETION")
  static COMPRESSED = new Keyword("COMPRESSED")
  static COMPRESSION = new Keyword("COMPRESSION")
  static COMPONENT = new Keyword("COMPONENT")
  static CONCURRENT = new Keyword("CONCURRENT")
  static CONDITION = new Keyword("CONDITION", { reserved: true })
  static CONNECTION = new Keyword("CONNECTION")
  static CONSISTENT = new Keyword("CONSISTENT")
  static CONSTRAINT = new Keyword("CONSTRAINT", { reserved: true })
  static CONTAINS = new Keyword("CONTAINS")
  static CONTINUE = new Keyword("CONTINUE", { reserved: true })
  static CONVERT = new Keyword("CONVERT", { reserved: true })
  static COPY = new Keyword("COPY")
  static CREATE = new Keyword("CREATE", { reserved: true })
  static CROSS = new Keyword("CROSS", { reserved: true })
  static CUBE = new Keyword("CUBE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static CUME_DIST = new Keyword("CUME_DIST", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static CURRENT = new Keyword("CURRENT")
  static CURRENT_DATE = new Keyword("CURRENT_DATE", { reserved: true })
  static CURRENT_TIME = new Keyword("CURRENT_TIME", { reserved: true })
  static CURRENT_TIMESTAMP = new Keyword("CURRENT_TIMESTAMP", { reserved: true })
  static CURRENT_USER = new Keyword("CURRENT_USER", { reserved: true })
  static CURRENT_ROLE = new Keyword("CURRENT_ROLE")
  static CURSOR = new Keyword("CURSOR", { reserved: true })
  static CYCLE = new Keyword("CYCLE")
  static D = new Keyword("D")
  static DATA = new Keyword("DATA")
  static DATABASE = new Keyword("DATABASE", { reserved: true })
  static DATABASES = new Keyword("DATABASES", { reserved: true })
  static DATAFILE = new Keyword("DATAFILE")
  static DATE = new Keyword("DATE")
  static DATETIME = new Keyword("DATETIME")
  static DAY = new Keyword("DAY")
  static DAY_HOUR = new Keyword("DAY_HOUR", { reserved: true })
  static DAY_MICROSECOND = new Keyword("DAY_MICROSECOND", { reserved: true })
  static DAY_MINUTE = new Keyword("DAY_MINUTE", { reserved: true })
  static DAY_SECOND = new Keyword("DAY_SECOND", { reserved: true })
  static DEALLOCATE = new Keyword("DEALLOCATE")
  static DEC = new Keyword("DEC", { reserved: true })
  static DECIMAL = new Keyword("DECIMAL", { reserved: true })
  static DECLARE = new Keyword("DECLARE", { reserved: true })
  static DEFAULT = new Keyword("DEFAULT", { reserved: true })
  static DEFINER = new Keyword("DEFINER")
  static DEFINITION = new Keyword("DEFINITION")
  static DELAYED = new Keyword("DELAYED", { reserved: true })
  static DELAY_KEY_WRITE = new Keyword("DELAY_KEY_WRITE")
  static DELETE = new Keyword("DELETE", { reserved: true })
  static DENSE_RANK = new Keyword("DENSE_RANK", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static DESC = new Keyword("DESC", { reserved: true })
  static DESCRIBE = new Keyword("DESCRIBE", { reserved: true })
  static DESCRIPTION = new Keyword("DESCRIPTION")
  static DES_KEY_FILE = new Keyword("DES_KEY_FILE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static DETERMINISTIC = new Keyword("DETERMINISTIC", { reserved: true })
  static DIRECTORY = new Keyword("DIRECTORY")
  static DISABLE = new Keyword("DISABLE")
  static DISCARD = new Keyword("DISCARD")
  static DISK = new Keyword("DISK")
  static DISTINCT = new Keyword("DISTINCT", { reserved: true })
  static DISTINCTROW = new Keyword("DISTINCTROW", { reserved: true })
  static DIV = new Keyword("DIV", { reserved: true })
  static DO = new Keyword("DO")
  static DOUBLE = new Keyword("DOUBLE", { reserved: true })
  static DROP = new Keyword("DROP", { reserved: true })
  static DUAL = new Keyword("DUAL", { reserved: true })
  static DYNAMIC = new Keyword("DYNAMIC")
  static EACH = new Keyword("EACH", { reserved: true })
  static ELSE = new Keyword("ELSE", { reserved: true })
  static ELSEIF = new Keyword("ELSEIF", { reserved: true })
  static EMPTY = new Keyword("EMPTY", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.4", options.version || "0")
  } })
  static ENABLE = new Keyword("ENABLE")
  static ENUM = new Keyword("ENUM")
  static ENCLOSED = new Keyword("ENCLOSED", { reserved: true })
  static ENCRYPTED  = new Keyword("ENCRYPTED")
  static ENCRYPTION = new Keyword("ENCRYPTION")
  static ENCRYPTION_KEY_ID = new Keyword("ENCRYPTION_KEY_ID")
  static END = new Keyword("END")
  static ENDS = new Keyword("ENDS")
  static ENFORCED = new Keyword("ENFORCED")
  static ENGINE = new Keyword("ENGINE")
  static ENGINE_ATTRIBUTE = new Keyword("ENGINE_ATTRIBUTE")
  static ESCAPED = new Keyword("ESCAPED", { reserved: true })
  static EVENT = new Keyword("EVENT")
  static EVERY = new Keyword("EVERY")
  static EXCEPT = new Keyword("EXCEPT", { reserved: true })
  static EXCLUSIVE = new Keyword("EXCLUSIVE")
  static EXECUTE = new Keyword("EXECUTE")
  static EXISTS = new Keyword("EXISTS", { reserved: true })
  static EXIT = new Keyword("EXIT", { reserved: true })
  static EXPIRE = new Keyword("EXPIRE")
  static EXPLAIN = new Keyword("EXPLAIN", { reserved: true })
  static EXTENT_SIZE = new Keyword("EXTENT_SIZE")
  static FAILED_LOGIN_ATTEMPTS = new Keyword("FAILED_LOGIN_ATTEMPTS")
  static FALSE = new Keyword("FALSE", { reserved: true })
  static FETCH = new Keyword("FETCH", { reserved: true })
  static FILE_BLOCK_SIZE = new Keyword("FILE_BLOCK_SIZE")
  static FIRST = new Keyword("FIRST")
  static FIRST_VALUE = new Keyword("FIRST_VALUE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static FIXED = new Keyword("FIXED")
  static FLOAT = new Keyword("FLOAT", { reserved: true })
  static FLUSH = new Keyword("FLUSH")
  static FOLLOWS = new Keyword("FOLLOWS")
  static FOR = new Keyword("FOR", { reserved: true })
  static FORCE = new Keyword("FORCE", { reserved: true })
  static FOREIGN = new Keyword("FOREIGN", { reserved: true })
  static FROM = new Keyword("FROM", { reserved: true })
  static FULL = new Keyword("FULL")
  static FULLTEXT = new Keyword("FULLTEXT", { reserved: true })
  static FUNCTION = new Keyword("FUNCTION", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static GENERATED = new Keyword("GENERATED", { reserved: true })
  static GET = new Keyword("GET", { reserved: true })
  static GLOBAL = new Keyword("GLOBAL")
  static GRANT = new Keyword("GRANT", { reserved: true })
  static GROUP = new Keyword("GROUP", { reserved: true })
  static GROUPING = new Keyword("GROUPING", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static GROUPS = new Keyword("GROUPS", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static HANDLER = new Keyword("HANDLER")
  static HASH = new Keyword("HASH")
  static HAVING = new Keyword("HAVING", { reserved: true })
  static HELP = new Keyword("HELP")
  static HIGH_PRIORITY = new Keyword("HIGH_PRIORITY", { reserved: true })
  static HISTORY = new Keyword("HISTORY")
  static HOUR = new Keyword("HOUR")
  static HOUR_MICROSECOND = new Keyword("HOUR_MICROSECOND", { reserved: true })
  static HOUR_MINUTE = new Keyword("HOUR_MINUTE", { reserved: true })
  static HOUR_SECOND = new Keyword("HOUR_SECOND", { reserved: true })
  static HOST = new Keyword("HOST")
  static IDENTIFIED = new Keyword("IDENTIFIED")
  static IETF_QUOTES = new Keyword("IETF_QUOTES")
  static IF = new Keyword("IF", { reserved: true })
  static IGNORE = new Keyword("IGNORE", { reserved: true })
  static IGNORED = new Keyword("IGNORED")
  static INCREMENT = new Keyword("INCREMENT")
  static INPLACE = new Keyword("INPLACE")
  static IMPORT = new Keyword("IMPORT")
  static IN = new Keyword("IN", { reserved: true })
  static INACTIVE = new Keyword("INACTIVE")
  static INDEX = new Keyword("INDEX", { reserved: true })
  static INFILE = new Keyword("INFILE", { reserved: true })
  static INITIAL_SIZE = new Keyword("INITIAL_SIZE")
  static INNER = new Keyword("INNER", { reserved: true })
  static INOUT = new Keyword("INOUT", { reserved: true })
  static INSENSITIVE = new Keyword("INSENSITIVE", { reserved: true })
  static INSERT = new Keyword("INSERT", { reserved: true })
  static INSERT_METHOD = new Keyword("INSERT_METHOD")
  static INSTANCE = new Keyword("INSTANCE")
  static INSTALL = new Keyword("INSTALL")
  static INT = new Keyword("INT", { reserved: true })
  static INTEGER = new Keyword("INTEGER", { reserved: true })
  static INTERVAL = new Keyword("INTERVAL", { reserved: true })
  static INTO = new Keyword("INTO", { reserved: true })
  static INVOKER = new Keyword("INVOKER")
  static IO_AFTER_GTIDS = new Keyword("IO_AFTER_GTIDS", { reserved: true })
  static IO_BEFORE_GTIDS = new Keyword("IO_BEFORE_GTIDS", { reserved: true })
  static IS = new Keyword("IS", { reserved: true })
  static ISOLATION = new Keyword("ISOLATION")
  static ISSUER = new Keyword("ISSUER")
  static ITERATE = new Keyword("ITERATE", { reserved: true })
  static JOIN = new Keyword("JOIN", { reserved: true })
  static JSON_TABLE = new Keyword("JSON_TABLE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.4", options.version || "0")
  } })
  static KEY = new Keyword("KEY", { reserved: true })
  static KEY_BLOCK_SIZE = new Keyword("KEY_BLOCK_SIZE")
  static KEYS = new Keyword("KEYS", { reserved: true })
  static KILL = new Keyword("KILL", { reserved: true })
  static LAG = new Keyword("LAG", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static LANGUAGE = new Keyword("LANGUAGE")
  static LAST = new Keyword("LAST")
  static LAST_VALUE = new Keyword("LAST_VALUE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static LATERAL = new Keyword("LATERAL", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.14", options.version || "0")
  } })
  static LEAD = new Keyword("LEAD", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static LEADING = new Keyword("LEADING", { reserved: true })
  static LEAVE = new Keyword("LEAVE", { reserved: true })
  static LEFT = new Keyword("LEFT", { reserved: true })
  static LESS = new Keyword("LESS")
  static LEVEL = new Keyword("LEVEL")
  static LIKE = new Keyword("LIKE", { reserved: true })
  static LIMIT = new Keyword("LIMIT", { reserved: true })
  static LINEAR = new Keyword("LINEAR", { reserved: true })
  static LINES = new Keyword("LINES", { reserved: true })
  static LIST = new Keyword("LIST")
  static LOAD = new Keyword("LOAD", { reserved: true })
  static LOCAL = new Keyword("LOCAL")
  static LOCALTIME = new Keyword("LOCALTIME", { reserved: true })
  static LOCALTIMESTAMP = new Keyword("LOCALTIMESTAMP", { reserved: true })
  static LOCK = new Keyword("LOCK", { reserved: true })
  static LOGFILE = new Keyword("LOGFILE")
  static LOGS = new Keyword("LOGS")
  static LONG = new Keyword("LONG", { reserved: true })
  static LONGBLOB = new Keyword("LONGBLOB", { reserved: true })
  static LONGTEXT = new Keyword("LONGTEXT", { reserved: true })
  static LOOP = new Keyword("LOOP", { reserved: true })
  static LOW_PRIORITY = new Keyword("LOW_PRIORITY", { reserved: true })
  static MASTER = new Keyword("MASTER")
  static MASTER_BIND = new Keyword("MASTER_BIND", { reserved: true })
  static MASTER_SERVER_ID = new Keyword("MASTER_SERVER_ID", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static MASTER_SSL_VERIFY_SERVER_CERT = new Keyword("MASTER_SSL_VERIFY_SERVER_CERT", { reserved: true })
  static MATCH = new Keyword("MATCH", { reserved: true })
  static MAX_CONNECTIONS_PER_HOUR = new Keyword("MAX_CONNECTIONS_PER_HOUR")
  static MAX_QUERIES_PER_HOUR = new Keyword("MAX_QUERIES_PER_HOUR")
  static MAX_ROWS = new Keyword("MAX_ROWS")
  static MAX_SIZE = new Keyword("MAX_SIZE")
  static MAX_UPDATES_PER_HOUR = new Keyword("MAX_UPDATES_PER_HOUR")
  static MAX_USER_CONNECTIONS = new Keyword("MAX_USER_CONNECTIONS")
  static MAXVALUE = new Keyword("MAXVALUE", { reserved: true })
  static MEDIUMBLOB = new Keyword("MEDIUMBLOB", { reserved: true })
  static MEDIUMINT = new Keyword("MEDIUMINT", { reserved: true })
  static MEDIUMTEXT = new Keyword("MEDIUMTEXT", { reserved: true })
  static MEMORY = new Keyword("MEMORY")
  static MERGE = new Keyword("MERGE")
  static MIDDLEINT = new Keyword("MIDDLEINT", { reserved: true })
  static MIN_ROWS = new Keyword("MIN_ROWS")
  static MINVALUE = new Keyword("MINVALUE")
  static MINUTE = new Keyword("MINUTE")
  static MINUTE_MICROSECOND = new Keyword("MINUTE_MICROSECOND", { reserved: true })
  static MINUTE_SECOND = new Keyword("MINUTE_SECOND", { reserved: true })
  static MOD = new Keyword("MOD", { reserved: true })
  static MODIFIES = new Keyword("MODIFIES", { reserved: true })
  static MODIFY = new Keyword("MODIFY")
  static MONTH = new Keyword("MONTH")
  static NAME = new Keyword("NAME")
  static NAMES = new Keyword("NAMES")
  static NATIONAL = new Keyword("NATIONAL")
  static NATURAL = new Keyword("NATURAL", { reserved: true })
  static NCHAR = new Keyword("NCHAR")
  static NEVER = new Keyword("NEVER")
  static NONE = new Keyword("NONE")
  static NO = new Keyword("NO")
  static NOT = new Keyword("NOT", { reserved: true })
  static NO_WRITE_TO_BINLOG = new Keyword("NO_WRITE_TO_BINLOG", { reserved: true })
  static NOCACHE = new Keyword("NOCACHE")
  static NOCYCLE = new Keyword("NOCYCLE")
  static NODEGROUP = new Keyword("NODEGROUP")
  static NOMINVALUE = new Keyword("NOMINVALUE")
  static NOMAXVALUE = new Keyword("NOMAXVALUE")
  static NTH_VALUE = new Keyword("NTH_VALUE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static NTILE = new Keyword("NTILE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static NULL = new Keyword("NULL", { reserved: true })
  static NUMERIC = new Keyword("NUMERIC", { reserved: true })
  static NVARCHAR = new Keyword("NVARCHAR")
  static OF = new Keyword("OF", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static OLD = new Keyword("OLD")
  static ON = new Keyword("ON", { reserved: true })
  static ONLY = new Keyword("ONLY")
  static OPTIMIZE = new Keyword("OPTIMIZE", { reserved: true })
  static OPTIMIZER_COSTS = new Keyword("OPTIMIZER_COSTS", { reserved: true })
  static OPTION = new Keyword("OPTION", { reserved: true })
  static OPTIONAL = new Keyword("OPTIONAL")
  static OPTIONS = new Keyword("OPTIONS")
  static OPTIONALLY = new Keyword("OPTIONALLY", { reserved: true })
  static OR = new Keyword("OR", { reserved: true })
  static ORDER = new Keyword("ORDER", { reserved: true })
  static ORGANIZATION = new Keyword("ORGANIZATION")
  static OUT = new Keyword("OUT", { reserved: true })
  static OUTER = new Keyword("OUTER", { reserved: true })
  static OUTFILE = new Keyword("OUTFILE", { reserved: true })
  static OVER = new Keyword("OVER", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static OWNER = new Keyword("OWNER")
  static PACK_KEYS = new Keyword("PACK_KEYS")
  static PACKAGE = new Keyword("PACKAGE")
  static PAGE_CHECKSUM = new Keyword("PAGE_CHECKSUM")
  static PAGE_COMPRESSED = new Keyword("PAGE_COMPRESSED")
  static PAGE_COMPRESSION_LEVEL = new Keyword("PAGE_COMPRESSION_LEVEL")
  static PARSE_GCOL_EXPR = new Keyword("PARSE_GCOL_EXPR", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static PARSER = new Keyword("PARSER")
  static PARTIAL = new Keyword("PARTIAL")
  static PARTITION = new Keyword("PARTITION", { reserved: true })
  static PARTITIONS = new Keyword("PARTITIONS")
  static PASSWORD = new Keyword("PASSWORD")
  static PASSWORD_LOCK_TIME = new Keyword("PASSWORD_LOCK_TIME")
  static PERCENT_RANK = new Keyword("PERCENT_RANK", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static PLUGIN = new Keyword("PLUGIN")
  static PORT = new Keyword("PORT")
  static PRECEDES = new Keyword("PRECEDES")
  static PRECISION = new Keyword("PRECISION", { reserved: true })
  static PREPARE = new Keyword("PREPARE")
  static PRESERVE  = new Keyword("PRESERVE")
  static PRIMARY = new Keyword("PRIMARY", { reserved: true })
  static PROCEDURE = new Keyword("PROCEDURE", { reserved: true })
  static PURGE = new Keyword("PURGE", { reserved: true })
  static QUARTER = new Keyword("QUARTER")
  static QUICK = new Keyword("QUICK")
  static RANDOM = new Keyword("RANDOM")
  static RANGE = new Keyword("RANGE", { reserved: true })
  static RANK = new Keyword("RANK", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static READ = new Keyword("READ", { reserved: true })
  static READS = new Keyword("READS", { reserved: true })
  static READ_WRITE = new Keyword("READ_WRITE", { reserved: true })
  static REAL = new Keyword("REAL", { reserved: true })
  static RECOVER = new Keyword("RECOVER")
  static RECURSIVE = new Keyword("RECURSIVE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.1", options.version || "0")
  } })
  static REDO_BUFFER_SIZE = new Keyword("REDO_BUFFER_SIZE")
  static REDOFILE = new Keyword("REDOFILE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static REDUNDANT = new Keyword("REDUNDANT")
  static REFERENCE = new Keyword("REFERENCE")
  static REFERENCES = new Keyword("REFERENCES", { reserved: true })
  static REGEXP = new Keyword("REGEXP", { reserved: true })
  static RELEASE = new Keyword("RELEASE", { reserved: true })
  static RENAME = new Keyword("RENAME", { reserved: true })
  static REPAIR = new Keyword("REPAIR")
  static REPEAT = new Keyword("REPEAT", { reserved: true })
  static REPEATABLE = new Keyword("REPEATABLE")
  static REPLACE = new Keyword("REPLACE", { reserved: true })
  static REPLICA = new Keyword("REPLICA")
  static REQUIRE = new Keyword("REQUIRE", { reserved: true })
  static RESET = new Keyword("RESET")
  static RESIGNAL = new Keyword("RESIGNAL", { reserved: true })
  static RESOURCE = new Keyword("RESOURCE")
  static RESTART = new Keyword("RESTART")
  static RESTRICT = new Keyword("RESTRICT", { reserved: true })
  static RETAIN = new Keyword("RETAIN")
  static RETURN = new Keyword("RETURN", { reserved: true })
  static REUSE = new Keyword("REUSE")
  static REVOKE = new Keyword("REVOKE", { reserved: true })
  static RIGHT = new Keyword("RIGHT", { reserved: true })
  static RLIKE = new Keyword("RLIKE", { reserved: true })
  static ROLE = new Keyword("ROLE")
  static ROLLBACK = new Keyword("ROLLBACK")
  static ROW = new Keyword("ROW", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static ROW_FORMAT = new Keyword("ROW_FORMAT")
  static ROWS = new Keyword("ROWS", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static ROW_NUMBER = new Keyword("ROW_NUMBER", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static RTREE = new Keyword("RTREE")
  static SAVEPOINT = new Keyword("SAVEPOINT")
  static SECURITY = new Keyword("SECURITY")
  static SCHEDULE = new Keyword("SCHEDULE")
  static SCHEMA = new Keyword("SCHEMA", { reserved: true })
  static SCHEMAS = new Keyword("SCHEMAS", { reserved: true })
  static SECOND = new Keyword("SECOND")
  static SECOND_MICROSECOND = new Keyword("SECOND_MICROSECOND", { reserved: true })
  static SECONDARY_ENGINE_ATTRIBUTE = new Keyword("SECONDARY_ENGINE_ATTRIBUTE")
  static SELECT = new Keyword("SELECT", { reserved: true })
  static SENSITIVE = new Keyword("SENSITIVE", { reserved: true })
  static SEPARATOR = new Keyword("SEPARATOR", { reserved: true })
  static SEQUENCE = new Keyword("SEQUENCE")
  static SERIALIZABLE = new Keyword("SERIALIZABLE")
  static SERVER = new Keyword("SERVER")
  static SESSION = new Keyword("SESSION")
  static SET = new Keyword("SET", { reserved: true })
  static SHARED = new Keyword("SHARED")
  static SHOW = new Keyword("SHOW", { reserved: true })
  static SHUTDOWN = new Keyword("SHUTDOWN")
  static SIGNAL = new Keyword("SIGNAL", { reserved: true })
  static SIGNED = new Keyword("SIGNED")
  static SIMPLE = new Keyword("SIMPLE")
  static SLAVE = new Keyword("SLAVE")
  static SMALLINT = new Keyword("SMALLINT", { reserved: true })
  static SNAPSHOT = new Keyword("SNAPSHOT")
  static SOCKET = new Keyword("SOCKET")
  static SPATIAL = new Keyword("SPATIAL", { reserved: true })
  static SPECIFIC = new Keyword("SPECIFIC", { reserved: true })
  static SQL = new Keyword("SQL", { reserved: true })
  static SQLEXCEPTION = new Keyword("SQLEXCEPTION", { reserved: true })
  static SQLSTATE = new Keyword("SQLSTATE", { reserved: true })
  static SQLWARNING = new Keyword("SQLWARNING", { reserved: true })
  static SQL_BIG_RESULT = new Keyword("SQL_BIG_RESULT", { reserved: true })
  static SQL_CACHE = new Keyword("SQL_CACHE", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies("<8.0.0", options.version || "0")
  } })
  static SQL_CALC_FOUND_ROWS = new Keyword("SQL_CALC_FOUND_ROWS", { reserved: true })
  static SQL_SMALL_RESULT = new Keyword("SQL_SMALL_RESULT", { reserved: true })
  static SSL = new Keyword("SSL", { reserved: true })
  static START = new Keyword("START")
  static STARTING = new Keyword("STARTING", { reserved: true })
  static STARTS = new Keyword("STARTS")
  static STATS_AUTO_RECALC = new Keyword("STATS_AUTO_RECALC")
  static STATS_PERSISTENT = new Keyword("STATS_PERSISTENT")
  static STATS_SAMPLE_PAGES = new Keyword("STATS_SAMPLE_PAGES")
  static STOP = new Keyword("STOP")
  static STORAGE = new Keyword("STORAGE")
  static STORED = new Keyword("STORED", { reserved: true })
  static STRAIGHT_JOIN = new Keyword("STRAIGHT_JOIN", { reserved: true })
  static SUBJECT = new Keyword("SUBJECT")
  static SUBPARTITION = new Keyword("SUBPARTITION")
  static SYSTEM = new Keyword("SYSTEM", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.3", options.version || "0")
  } })
  static T = new Keyword("T")
  static TABLE = new Keyword("TABLE", { reserved: true })
  static TABLES = new Keyword("TABLES")
  static TABLESPACE = new Keyword("TABLESPACE")
  static TEMPORARY = new Keyword("TEMPORARY")
  static TEMPTABLE = new Keyword("TEMPTABLE")
  static TERMINATED = new Keyword("TERMINATED", { reserved: true })
  static TEXT = new Keyword("TEXT")
  static THAN = new Keyword("THAN")
  static THEN = new Keyword("THEN", { reserved: true })
  static THREAD_PRIORITY = new Keyword("THREAD_PRIORITY")
  static TIME = new Keyword("TIME")
  static TIMESTAMP = new Keyword("TIMESTAMP")
  static TINYBLOB = new Keyword("TINYBLOB", { reserved: true })
  static TINYINT = new Keyword("TINYINT", { reserved: true })
  static TINYTEXT = new Keyword("TINYTEXT", { reserved: true })
  static TO = new Keyword("TO", { reserved: true })
  static TRAILING = new Keyword("TRAILING", { reserved: true })
  static TRANSACTION = new Keyword("TRANSACTION")
  static TRANSACTIONAL = new Keyword("TRANSACTIONAL")
  static TRIGGER = new Keyword("TRIGGER", { reserved: true })
  static TRUE = new Keyword("TRUE", { reserved: true })
  static TRUNCATE = new Keyword("TRUNCATE")
  static TS = new Keyword("TS")
  static TYPE = new Keyword("TYPE")
  static UNBOUNDED = new Keyword("UNBOUNDED")
  static UNCOMMITTED = new Keyword("UNCOMMITTED")
  static UNDEFINED = new Keyword("UNDEFINED")
  static UNDO = new Keyword("UNDO", { reserved: true })
  static UNDO_BUFFER_SIZE = new Keyword("UNDO_BUFFER_SIZE")
  static UNDOFILE = new Keyword("UNDOFILE")
  static UNICODE = new Keyword("UNICODE")
  static UNINSTALL = new Keyword("UNINSTALL")
  static UNION = new Keyword("UNION", { reserved: true })
  static UNIQUE = new Keyword("UNIQUE", { reserved: true })
  static UNKNOWN = new Keyword("UNKNOWN")
  static UNLOCK = new Keyword("UNLOCK", { reserved: true })
  static UNSIGNED = new Keyword("UNSIGNED", { reserved: true })
  static UPDATE = new Keyword("UPDATE", { reserved: true })
  static USAGE = new Keyword("USAGE", { reserved: true })
  static USE = new Keyword("USE", { reserved: true })
  static USER = new Keyword("USER")
  static USING = new Keyword("USING", { reserved: true })
  static UTC_DATE = new Keyword("UTC_DATE", { reserved: true })
  static UTC_TIME = new Keyword("UTC_TIME", { reserved: true })
  static UTC_TIMESTAMP = new Keyword("UTC_TIMESTAMP", { reserved: true })
  static VALUES = new Keyword("VALUES", { reserved: true })
  static VARBINARY = new Keyword("VARBINARY", { reserved: true })
  static VARCHAR = new Keyword("VARCHAR", { reserved: true })
  static VARCHARACTER = new Keyword("VARCHARACTER", { reserved: true })
  static VARYING = new Keyword("VARYING", { reserved: true })
  static VCPU = new Keyword("VCPU")
  static VERSIONING = new Keyword("VERSIONING")
  static VIEW = new Keyword("VIEW")
  static VIRTUAL = new Keyword("VIRTUAL", { reserved: true })
  static VISIBLE = new Keyword("VISIBLE")
  static WITHOUT = new Keyword("WITHOUT")
  static INVISIBLE = new Keyword("INVISIBLE")
  static WAIT = new Keyword("WAIT")
  static WEEK = new Keyword("WEEK")
  static WHEN = new Keyword("WHEN", { reserved: true })
  static WHERE = new Keyword("WHERE", { reserved: true })
  static WHILE = new Keyword("WHILE", { reserved: true })
  static WINDOW = new Keyword("WINDOW", { reserved: function(options: { [ key:string]:any}) {
    return options.package === "mysql" && semver.satisfies(">=8.0.2", options.version || "0")
  } })
  static WITH = new Keyword("WITH", { reserved: true })
  static WORK = new Keyword("WORK")
  static WRAPPER = new Keyword("WRAPPER")
  static WRITE = new Keyword("WRITE", { reserved: true })
  static X509 = new Keyword("X509")
  static XA = new Keyword("XA")
  static XML = new Keyword("XML")
  static XOR = new Keyword("XOR", { reserved: true })
  static YES = new Keyword("YES")
  static YEAR = new Keyword("YEAR")
  static YEAR_MONTH = new Keyword("YEAR_MONTH", { reserved: true })
  static ZEROFILL = new Keyword("ZEROFILL", { reserved: true })

  static OPE_ASSIGN = new Keyword("OPE_EQ", { value: ":=" })
  static OPE_EQ = new Keyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new Keyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new Keyword("OPE_MINUS", { value: "-" })

  static VAR_GLOBAL = new Keyword("VAR_GLOBAL", { value: "@@GLOBAL" })
  static VAR_SESSION = new Keyword("VAR_SESSION", { value: "@@SESSION" })
  static VAR_LOCAL = new Keyword("VAR_LOCAL", { value: "@@LOCAL" })

  constructor(
    public name: string,
    public options: Record<string, any> = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

export class MysqlLexer extends Lexer {
  private static COMMAND_PATTERN = "^(\\?|\\\\[!-~]|clear|connect|delimiter|edit|ego|exit|go|help|nopager|notee|pager|print|prompt|quit|rehash|source|status|system|tee|use|charset|warnings|nowarning)(?:[ \\t]*.*)"

  private reserved = new Set<Keyword>()
  private reCommand = new RegExp(MysqlLexer.COMMAND_PATTERN + "(;|$)", "imy")
  private reDelimiter = new RegExp(";", "y")

  constructor(
    private options: Record<string, any> = {}
  ) {
    super("mysql", [
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /(#.*|--([ \t].*)$)/my },
      { type: TokenType.Command, re: () => this.reCommand },
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
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
    ])

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

export class MysqlParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new MysqlLexer(options).lex(input)
    return new MysqlParser(tokens, options).root()
  }

  private sqlMode = new Set<string>()

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
    this.setSqlMode(options.sqlMode)
  }

  root(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.consumeIf(TokenType.Eof)) {
          root.add(this.token(-1))
          break
        } else if (this.consumeIf(TokenType.Delimiter)) {
          root.add(this.token(-1))
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          root.add(this.statement())
          if (this.consumeIf(TokenType.Eof)) {
            root.add(this.token(-1))
            break
          } else if (this.consumeIf(TokenType.Delimiter)) {
            root.add(this.token(-1))
          } else {
            break
          }
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

  command() {
    const stmt = new Node("command")
    this.consume(TokenType.Command)
    const token = this.token(-1)

    const sep = Math.max(token.text.indexOf(" "), token.text.indexOf("\t"))
    if (sep === -1) {
      stmt.add(new Node("name", this.getLongCommandName(token.text)).add(token))
    } else {
      const nameToken = new Token(TokenType.Identifier, token.text.substring(0, sep), token.pos)
      const name = this.getLongCommandName(nameToken.text)
      stmt.add(new Node("name", name).add(nameToken))

      const argTokens = []
      const args = token.text.substring(sep)

      if (name === "prompt") {
        const m = /^[ \t]*/.exec(args)
        let sep2 = sep
        if (m) {
          argTokens.push(new Token(TokenType.WhiteSpace, m[0], sep))
          sep2 += m[0].length
        }
        if (sep2 < args.length) {
          argTokens.push(new Token(TokenType.Identifier, args.substring(sep2), sep2))
        }
      } else {
        const re = /([ \t]+)|('(?:''|[^']+)*'|`(?:``|[^`]+)*`)|([^ \t'`]+)/y
        let pos = 0
        while (pos < args.length) {
          re.lastIndex = pos
          const m = re.exec(args)
          if (m) {
            const type = m[1] ? TokenType.WhiteSpace : m[2] ? TokenType.String : TokenType.Identifier
            argTokens.push(new Token(type, m[0], re.lastIndex))
            pos = re.lastIndex
          }
        }
      }

      const before = new Array<Token>()
      for (const argToken of argTokens) {
        if (argToken.type.options.skip) {
          before.push(argToken)
        } else {
          argToken.before.push(...before)
          before.length = 0
          stmt.add(new Node("arg", dequote(argToken.text)).add(argToken))
        }
      }
    }

    return stmt
  }

  statement() {
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