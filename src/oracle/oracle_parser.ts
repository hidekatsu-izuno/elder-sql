import {
  TokenType,
  Token,
  Node,
  Lexer,
  Parser,
  ParseError,
  AggregateParseError,
  ParseFunction,
  Splitter,
  SplitFunction,
} from "../parser"
import { dequote } from "../util"

const KeywordMap = new Map<string, OracleKeyword>()
export class OracleKeyword extends TokenType {
  static ABORT = new OracleKeyword("ABORT")
  static ACCESS = new OracleKeyword("ACCESS", { reserved: true })
  static ACCESSED = new OracleKeyword("ACCESSED")
  static ACCESSIBLE = new OracleKeyword("ACCESSIBLE")
  static ACCOUNT = new OracleKeyword("ACCOUNT")
  static ACTIONS = new OracleKeyword("ACTIONS")
  static ACTIVE = new OracleKeyword("ACTIVE")
  static ADD = new OracleKeyword("ADD", { reserved: true })
  static ADMIN = new OracleKeyword("ADMIN")
  static ADMINISTER = new OracleKeyword("ADMINISTER")
  static ADVANCED = new OracleKeyword("ADVANCED")
  static ADVISE = new OracleKeyword("ADVISE")
  static AFFINITY = new OracleKeyword("AFFINITY")
  static AFTER = new OracleKeyword("AFTER")
  static AGENT = new OracleKeyword("AGENT")
  static AGGREGATE = new OracleKeyword("AGGREGATE")
  static ALGORITHM = new OracleKeyword("ALGORITHM")
  static ALIAS = new OracleKeyword("ALIAS")
  static ALL = new OracleKeyword("ALL", { reserved: true })
  static ALTER = new OracleKeyword("ALTER", { reserved: true })
  static ALTERNATE = new OracleKeyword("ALTERNATE")
  static ANALYTIC = new OracleKeyword("ANALYTIC")
  static ANCILLARY = new OracleKeyword("ANCILLARY")
  static ANYSCHEMA = new OracleKeyword("ANYSCHEMA")
  static ALLOW = new OracleKeyword("ALLOW")
  static ALLOCATE = new OracleKeyword("ALLOCATE")
  static ALWAYS = new OracleKeyword("ALWAYS")
  static ANALYZE = new OracleKeyword("ANALYZE")
  static AND = new OracleKeyword("AND", { reserved: true })
  static ANY = new OracleKeyword("ANY", { reserved: true })
  static APPICATION = new OracleKeyword("APPICATION")
  static APPLY = new OracleKeyword("APPLY")
  static ARCHIVAL = new OracleKeyword("ARCHIVAL")
  static ARCHIVE = new OracleKeyword("ARCHIVE")
  static ARCHIVED = new OracleKeyword("ARCHIVED")
  static ARCHIVELOG = new OracleKeyword("ARCHIVELOG")
  static ARRAY = new OracleKeyword("ARRAY")
  static AS = new OracleKeyword("AS", { reserved: true })
  static ASC = new OracleKeyword("ASC", { reserved: true })
  static ASSOCIATE = new OracleKeyword("ASSOCIATE")
  static ASYNCHRONOUS = new OracleKeyword("ASYNCHRONOUS")
  static AT = new OracleKeyword("AT", { reserved: true })
  static ATTRIBUTE = new OracleKeyword("ATTRIBUTE")
  static ATTRIBUTES = new OracleKeyword("ATTRIBUTES")
  static AUDIT = new OracleKeyword("AUDIT", { reserved: true })
  static AUTHENTICATED = new OracleKeyword("AUTHENTICATED")
  static AUTHENTICATION = new OracleKeyword("AUTHENTICATION")
  static AUTHID = new OracleKeyword("AUTHID")
  static AUTO = new OracleKeyword("AUTO")
  static AUTO_LOGIN = new OracleKeyword("AUTO_LOGIN")
  static AUTOALLOCATE = new OracleKeyword("AUTOALLOCATE")
  static AUTOEXTEND = new OracleKeyword("AUTOEXTEND")
  static AUTOMATIC = new OracleKeyword("AUTOMATIC")
  static AUTONOMOUS_TRANSACTION = new OracleKeyword("AUTONOMOUS_TRANSACTION")
  static AVAILABILITY = new OracleKeyword("AVAILABILITY")
  static AZURE_ROLE = new OracleKeyword("AZURE_ROLE")
  static AZURE_USER = new OracleKeyword("AZURE_USER")
  static BACKUP = new OracleKeyword("BACKUP")
  static BASICFILE = new OracleKeyword("BASICFILE")
  static BADFILE = new OracleKeyword("BADFILE")
  static BATCH = new OracleKeyword("BATCH")
  static BEFORE = new OracleKeyword("BEFORE")
  static BEGIN = new OracleKeyword("BEGIN", { reserved: true })
  static BEGINNING = new OracleKeyword("BEGINNING")
  static BEQUEATH = new OracleKeyword("BEQUEATH")
  static BETWEEN = new OracleKeyword("BETWEEN", { reserved: true })
  static BFILE = new OracleKeyword("BFILE")
  static BIGFILE = new OracleKeyword("BIGFILE")
  static BINDING = new OracleKeyword("BINDING")
  static BINARY_INTEGER = new OracleKeyword("BINARY_INTEGER")
  static BITMAP = new OracleKeyword("BITMAP")
  static BLOB = new OracleKeyword("BLOB")
  static BLOCK = new OracleKeyword("BLOCK")
  static BLOCKCHAIN = new OracleKeyword("BLOCKCHAIN")
  static BLOCKSIZE = new OracleKeyword("BLOCKSIZE")
  static BODY = new OracleKeyword("BODY")
  static BOTH = new OracleKeyword("BOTH")
  static BREADTH = new OracleKeyword("BREADTH")
  static BUFFER_CACHE = new OracleKeyword("BUFFER_CACHE")
  static BULK = new OracleKeyword("BULK")
  static BULK_ROWCOUNT = new OracleKeyword("BULK_ROWCOUNT")
  static BULK_EXCEPTIONS = new OracleKeyword("BULK_EXCEPTIONS")
  static BY = new OracleKeyword("BY", { reserved: true })
  static CACHE = new OracleKeyword("CACHE")
  static CACHING = new OracleKeyword("CACHING")
  static CAPTION = new OracleKeyword("CAPTION")
  static CASE = new OracleKeyword("CASE", { reserved: true })
  static CALL = new OracleKeyword("CALL")
  static CANCEL = new OracleKeyword("CANCEL")
  static CAPACITY = new OracleKeyword("CAPACITY")
  static CASCADE = new OracleKeyword("CASCADE")
  static CATEGORY = new OracleKeyword("CATEGORY")
  static CHAR = new OracleKeyword("CHAR", { reserved: true })
  static CHARACTER = new OracleKeyword("CHARACTER")
  static CHARSETID = new OracleKeyword("CHARSETID")
  static CHARSETFORM = new OracleKeyword("CHARSETFORM")
  static CHANGE = new OracleKeyword("CHANGE")
  static CHECK = new OracleKeyword("CHECK", { reserved: true })
  static CHAINED = new OracleKeyword("CHAINED")
  static CHECKPOINT = new OracleKeyword("CHECKPOINT")
  static CHILD = new OracleKeyword("CHILD")
  static CHUNK = new OracleKeyword("CHUNK")
  static CLASS = new OracleKeyword("CLASS")
  static CLASSIFIER = new OracleKeyword("CLASSIFIER")
  static CLASSIFICATION = new OracleKeyword("CLASSIFICATION")
  static CLAUSE = new OracleKeyword("CLAUSE")
  static CLIENT = new OracleKeyword("CLIENT")
  static CLOB = new OracleKeyword("CLOB")
  static CLONE = new OracleKeyword("CLONE")
  static CLOSE = new OracleKeyword("CLOSE")
  static CLUSTER = new OracleKeyword("CLUSTER", { reserved: true })
  static CLUSTERING = new OracleKeyword("CLUSTERING")
  static CLUSTERS = new OracleKeyword("CLUSTERS", { reserved: true })
  static CLEAR = new OracleKeyword("CLEAR")
  static CLEAN = new OracleKeyword("CLEAN")
  static CLEANUP = new OracleKeyword("CLEANUP")
  static CLS = new OracleKeyword("CLS")
  static CN = new OracleKeyword("CN")
  static COARSE = new OracleKeyword("COARSE")
  static COLAUTH = new OracleKeyword("COLAUTH", { reserved: true })
  static COALESCE = new OracleKeyword("COALESCE")
  static COLD = new OracleKeyword("COLD")
  static COLLATION = new OracleKeyword("COLLATION")
  static COLLATE = new OracleKeyword("COLLATE")
  static COLLECT = new OracleKeyword("COLLECT")
  static COLUMN = new OracleKeyword("COLUMN", { reserved: true })
  static COLUMNS = new OracleKeyword("COLUMNS", { reserved: true })
  static COLUMN_VALUE = new OracleKeyword("COLUMN_VALUE")
  static CORRUPTION = new OracleKeyword("CORRUPTION")
  static COMMENT = new OracleKeyword("COMMENT", { reserved: true })
  static COMMIT = new OracleKeyword("COMMIT")
  static COMMITTED = new OracleKeyword("COMMITTED")
  static COMPACT = new OracleKeyword("COMPACT")
  static COMPATIBILITY = new OracleKeyword("COMPATIBILITY")
  static COMPILE = new OracleKeyword("COMPILE")
  static COMPLETE = new OracleKeyword("COMPLETE")
  static COMPRESS = new OracleKeyword("COMPRESS", { reserved: true })
  static COMPONENT = new OracleKeyword("COMPONENT")
  static COMPOSITE_LIMIT = new OracleKeyword("COMPOSITE_LIMIT")
  static COMPUTATION = new OracleKeyword("COMPUTATION")
  static COMPUTE = new OracleKeyword("COMPUTE")
  static CONFIRM = new OracleKeyword("CONFIRM")
  static CONNECT = new OracleKeyword("CONNECT", { reserved: true })
  static CONNECT_TIME = new OracleKeyword("CONNECT_TIME")
  static CONSIDER = new OracleKeyword("CONSIDER")
  static CONSTRAINT = new OracleKeyword("CONSTRAINT")
  static CONSTRAINTS = new OracleKeyword("CONSTRAINTS")
  static CONSISTENT = new OracleKeyword("CONSISTENT")
  static CONTAINER = new OracleKeyword("CONTAINER")
  static CONTAINER_DATA = new OracleKeyword("CONTAINER_DATA")
  static CONTAINER_MAP = new OracleKeyword("CONTAINER_MAP")
  static CONTAINERS = new OracleKeyword("CONTAINERS")
  static CONTAINERS_DEFAULT = new OracleKeyword("CONTAINERS_DEFAULT")
  static CONTINUE = new OracleKeyword("CONTINUE")
  static CONTENTS = new OracleKeyword("CONTENTS")
  static CONTEXT = new OracleKeyword("CONTEXT")
  static CONTROLFILE = new OracleKeyword("CONTROLFILE")
  static CONVERT = new OracleKeyword("CONVERT")
  static COPY = new OracleKeyword("COPY")
  static COST = new OracleKeyword("COST")
  static COUNT = new OracleKeyword("COUNT")
  static COVERAGE = new OracleKeyword("COVERAGE")
  static CPU_PER_CALL = new OracleKeyword("CPU_PER_CALL")
  static CPU_PER_SESSION = new OracleKeyword("CPU_PER_SESSION")
  static CRASH = new OracleKeyword("CRASH", { reserved: true })
  static CREATE = new OracleKeyword("CREATE", { reserved: true })
  static CREATE_FILE_DEST = new OracleKeyword("CREATE_FILE_DEST")
  static CREATION = new OracleKeyword("CREATION")
  static CREDENTIALS = new OracleKeyword("CREDENTIALS")
  static CRITICAL = new OracleKeyword("CRITICAL")
  static CROSS = new OracleKeyword("CROSS")
  static CURRENT = new OracleKeyword("CURRENT", { reserved: true })
  static CURRENT_USER = new OracleKeyword("CURRENT_USER")
  static CURSOR = new OracleKeyword("CURSOR", { reserved: true })
  static CUVE = new OracleKeyword("CUVE")
  static CYCLE = new OracleKeyword("CYCLE")
  static DANGLING = new OracleKeyword("DANGLING")
  static DATA = new OracleKeyword("DATA")
  static DATABASE = new OracleKeyword("DATABASE")
  static DATAFILE = new OracleKeyword("DATAFILE")
  static DATAFILES = new OracleKeyword("DATAFILES")
  static DATAPUMP = new OracleKeyword("DATAPUMP")
  static DATE = new OracleKeyword("DATE", { reserved: true })
  static DAY = new OracleKeyword("DAY")
  static DAYS = new OracleKeyword("DAYS")
  static DBA_RECYCLEBIN = new OracleKeyword("DBA_RECYCLEBIN")
  static DDL = new OracleKeyword("DDL")
  static DEALLOCATE = new OracleKeyword("DEALLOCATE")
  static DEBUG = new OracleKeyword("DEBUG")
  static DECIMAL = new OracleKeyword("DECIMAL", { reserved: true })
  static DECLARE = new OracleKeyword("DECLARE", { reserved: true })
  static DECREMENT = new OracleKeyword("DECREMENT")
  static DECRYPT = new OracleKeyword("DECRYPT")
  static DEDUPLICATE = new OracleKeyword("DEDUPLICATE")
  static DEFAULT = new OracleKeyword("DEFAULT", { reserved: true })
  static DEFAULT_CREDENTIAL = new OracleKeyword("DEFAULT_CREDENTIAL")
  static DEFAULT_COLLATION = new OracleKeyword("DEFAULT_COLLATION")
  static DEFERRED = new OracleKeyword("DEFERRED")
  static DEFINITION = new OracleKeyword("DEFINITION")
  static DEFINE = new OracleKeyword("DEFINE")
  static DEFINER = new OracleKeyword("DEFINER")
  static DELETE = new OracleKeyword("DELETE", { reserved: true })
  static DELETE_ALL = new OracleKeyword("DELETE_ALL")
  static DELETING = new OracleKeyword("DELETING")
  static DELIGATE = new OracleKeyword("DELIGATE")
  static DEMAND = new OracleKeyword("DEMAND")
  static DEPENDENT = new OracleKeyword("DEPENDENT")
  static DEPTH = new OracleKeyword("DEPTH")
  static DEPLICATE = new OracleKeyword("DEPLICATE")
  static DESC = new OracleKeyword("DESC", { reserved: true })
  static DESCRIPTION = new OracleKeyword("DESCRIPTION")
  static DETERMINES = new OracleKeyword("DETERMINES")
  static DETERMINISTIC = new OracleKeyword("DETERMINISTIC")
  static DICTIONARY = new OracleKeyword("DICTIONARY")
  static DIGEST = new OracleKeyword("DIGEST")
  static DISCARDFILE = new OracleKeyword("DISCARDFILE")
  static DISALLOW = new OracleKeyword("DISALLOW")
  static DISASSOCIATE = new OracleKeyword("DISASSOCIATE")
  static DISABLE = new OracleKeyword("DISABLE")
  static DISABLE_ALL = new OracleKeyword("DISABLE_ALL")
  static DISCARD = new OracleKeyword("DISCARD")
  static DIMENSION = new OracleKeyword("DIMENSION")
  static DIRECT_LOAD = new OracleKeyword("DIRECT_LOAD")
  static DIRECT_PATH = new OracleKeyword("DIRECT_PATH")
  static DIRECTORY = new OracleKeyword("DIRECTORY")
  static DISCONNECT = new OracleKeyword("DISCONNECT")
  static DISK = new OracleKeyword("DISK")
  static DISKS = new OracleKeyword("DISKS")
  static DISKGROUP = new OracleKeyword("DISKGROUP")
  static DISMOUNT = new OracleKeyword("DISMOUNT")
  static DISTINCT = new OracleKeyword("DISTINCT", { reserved: true })
  static DISTRIBUTE = new OracleKeyword("DISTRIBUTE")
  static DISTRIBUTED = new OracleKeyword("DISTRIBUTED")
  static DML = new OracleKeyword("DML")
  static DOWNGRADE = new OracleKeyword("DOWNGRADE")
  static DROP = new OracleKeyword("DROP", { reserved: true })
  static DURATION = new OracleKeyword("DURATION")
  static DUPLICATE = new OracleKeyword("DUPLICATE")
  static DUPLICATED = new OracleKeyword("DUPLICATED")
  static DV = new OracleKeyword("DV")
  static E = new OracleKeyword("E")
  static EDITION = new OracleKeyword("EDITION")
  static EDITIONS = new OracleKeyword("EDITIONS")
  static EDITIONABLE = new OracleKeyword("EDITIONABLE")
  static EDITIONING = new OracleKeyword("EDITIONING")
  static ELEMENT = new OracleKeyword("ELEMENT")
  static ELSE = new OracleKeyword("ELSE", { reserved: true })
  static ELSIF = new OracleKeyword("ELSIF")
  static ENABLE = new OracleKeyword("ENABLE")
  static ENABLE_ALL = new OracleKeyword("ENABLE_ALL")
  static ENCRYPT = new OracleKeyword("ENCRYPT")
  static ENCRYPTION = new OracleKeyword("ENCRYPTION")
  static END = new OracleKeyword("END", { reserved: true })
  static ENFORCED = new OracleKeyword("ENFORCED")
  static ENTERPRISE = new OracleKeyword("ENTERPRISE")
  static ERROR_CODE = new OracleKeyword("ERROR_CODE")
  static ERROR_INDEX = new OracleKeyword("ERROR_INDEX")
  static ERRORS = new OracleKeyword("ERRORS")
  static EXCEPT = new OracleKeyword("EXCEPT")
  static EXCEPTION = new OracleKeyword("EXCEPTION", { reserved: true })
  static EXCEPTION_INIT = new OracleKeyword("EXCEPTION_INIT")
  static EXCEPTIONS = new OracleKeyword("EXCEPTIONS")
  static EXCHANGE = new OracleKeyword("EXCHANGE")
  static EXCLUDE = new OracleKeyword("EXCLUDE")
  static EXCLUSIVE = new OracleKeyword("EXCLUSIVE", { reserved: true })
  static EXISTS = new OracleKeyword("EXISTS", { reserved: true })
  static EXIT = new OracleKeyword("EXIT")
  static EXPIRE = new OracleKeyword("EXPIRE")
  static EXPLAIN = new OracleKeyword("EXPLAIN")
  static EXPORT = new OracleKeyword("EXPORT")
  static EXTENDED = new OracleKeyword("EXTENDED")
  static EXTENT = new OracleKeyword("EXTENT")
  static EXTERNAL = new OracleKeyword("EXTERNAL")
  static EXTERNALLY = new OracleKeyword("EXTERNALLY")
  static EVALUATE = new OracleKeyword("EVALUATE")
  static EVERY = new OracleKeyword("EVERY")
  static FAILOVER = new OracleKeyword("FAILOVER")
  static FAILED = new OracleKeyword("FAILED")
  static FAILED_LOGIN_ATTEMPTS = new OracleKeyword("FAILED_LOGIN_ATTEMPTS")
  static FAILGROUP = new OracleKeyword("FAILGROUP")
  static FALSE = new OracleKeyword("FALSE")
  static FACT = new OracleKeyword("FACT")
  static FAR = new OracleKeyword("FAR")
  static FAST = new OracleKeyword("FAST")
  static FEATURE = new OracleKeyword("FEATURE")
  static FETCH = new OracleKeyword("FETCH", { reserved: true })
  static FIRST = new OracleKeyword("FIRST")
  static FILE = new OracleKeyword("FILE", { reserved: true })
  static FILE_NAME_CONVERT = new OracleKeyword("FILE_NAME_CONVERT")
  static FILEGROUP = new OracleKeyword("FILEGROUP")
  static FILESYSTEM_LIKE_LOGGING = new OracleKeyword("FILESYSTEM_LIKE_LOGGING")
  static FILTER = new OracleKeyword("FILTER")
  static FINAL = new OracleKeyword("FINAL")
  static FINE = new OracleKeyword("FINE")
  static FINISH = new OracleKeyword("FINISH")
  static FLASH_CACHE = new OracleKeyword("FLASH_CACHE")
  static FLASHBACK = new OracleKeyword("FLASHBACK")
  static FLEX = new OracleKeyword("FLEX")
  static FLOAT = new OracleKeyword("FLOAT", { reserved: true })
  static FLUSH = new OracleKeyword("FLUSH")
  static FOR = new OracleKeyword("FOR", { reserved: true })
  static FORALL = new OracleKeyword("FORALL")
  static FORCE = new OracleKeyword("FORCE")
  static FOREIGN = new OracleKeyword("FOREIGN")
  static FOUND = new OracleKeyword("FOUND")
  static FRESH = new OracleKeyword("FRESH")
  static FREEPOOLS = new OracleKeyword("FREEPOOLS")
  static FROM = new OracleKeyword("FROM", { reserved: true })
  static FUNCTION = new OracleKeyword("FUNCTION", { reserved: true })
  static FUNCTIONS = new OracleKeyword("FUNCTIONS")
  static FULL = new OracleKeyword("FULL")
  static G = new OracleKeyword("G")
  static GUARANTEE = new OracleKeyword("GUARANTEE")
  static GENERATED = new OracleKeyword("GENERATED")
  static GLOBAL = new OracleKeyword("GLOBAL")
  static GLOBAL_NAME = new OracleKeyword("GLOBAL_NAME")
  static GLOBAL_TOPIC_ENABLED = new OracleKeyword("GLOBAL_TOPIC_ENABLED")
  static GLOBALLY = new OracleKeyword("GLOBALLY")
  static GOTO = new OracleKeyword("GOTO", { reserved: true })
  static GRANT = new OracleKeyword("GRANT", { reserved: true })
  static GRANTED = new OracleKeyword("GRANTED")
  static GROUP = new OracleKeyword("GROUP", { reserved: true })
  static GROUPING = new OracleKeyword("GROUPING")
  static GUARD = new OracleKeyword("GUARD")
  static H = new OracleKeyword("H")
  static HALF_YEARS = new OracleKeyword("HALF_YEARS")
  static HASH = new OracleKeyword("HASH")
  static HASHING = new OracleKeyword("HASHING")
  static HASHKEYS = new OracleKeyword("HASHKEYS")
  static HAVING = new OracleKeyword("HAVING", { reserved: true })
  static HEAP = new OracleKeyword("HEAP")
  static HIGH = new OracleKeyword("HIGH")
  static HIER_ORDER = new OracleKeyword("HIER_ORDER")
  static HIERARCHY = new OracleKeyword("HIERARCHY")
  static HIERARCHIES = new OracleKeyword("HIERARCHIES")
  static HOT = new OracleKeyword("HOT")
  static HOST = new OracleKeyword("HOST")
  static HOURS = new OracleKeyword("HOURS")
  static HTTP = new OracleKeyword("HTTP")
  static IAM_GROUP_NAME = new OracleKeyword("IAM_GROUP_NAME")
  static IAM_PRINCIPAL_NAME = new OracleKeyword("IAM_PRINCIPAL_NAME")
  static ID = new OracleKeyword("ID")
  static IDLE_TIME = new OracleKeyword("IDLE_TIME")
  static IDENTIFIED = new OracleKeyword("IDENTIFIED", { reserved: true })
  static IDENTITY = new OracleKeyword("IDENTITY")
  static IF = new OracleKeyword("IF", { reserved: true })
  static IGNORE = new OracleKeyword("IGNORE")
  static IMMEDIATE = new OracleKeyword("IMMEDIATE", { reserved: true })
  static IMMUTABLE = new OracleKeyword("IMMUTABLE")
  static IMPORT = new OracleKeyword("IMPORT")
  static IN = new OracleKeyword("IN", { reserved: true })
  static INACTIVE_ACCOUNT_TIME = new OracleKeyword("INACTIVE_ACCOUNT_TIME")
  static INCREMENT = new OracleKeyword("INCREMENT", { reserved: true })
  static INCLUDE = new OracleKeyword("INCLUDE")
  static INCLUDING = new OracleKeyword("INCLUDING")
  static INDEX = new OracleKeyword("INDEX", { reserved: true })
  static INDEXES = new OracleKeyword("INDEXES", { reserved: true })
  static INDEXING = new OracleKeyword("INDEXING")
  static INDEXTYPE = new OracleKeyword("INDEXTYPE")
  static INDEXTYPES = new OracleKeyword("INDEXTYPES")
  static INDICES = new OracleKeyword("INDICES")
  static INDICATOR = new OracleKeyword("INDICATOR")
  static INITIAL = new OracleKeyword("INITIAL", { reserved: true })
  static INITIALIZED = new OracleKeyword("INITIALIZED")
  static INITRANS = new OracleKeyword("INITRANS")
  static INLINE = new OracleKeyword("INLINE")
  static INMEMORY = new OracleKeyword("INMEMORY")
  static INNER = new OracleKeyword("INNER")
  static INOUT = new OracleKeyword("INOUT")
  static INSERT = new OracleKeyword("INSERT", { reserved: true })
  static INSERTING = new OracleKeyword("INSERTING")
  static INSTALL = new OracleKeyword("INSTALL")
  static INSTANCE = new OracleKeyword("INSTANCE")
  static INSTANCES = new OracleKeyword("INSTANCES")
  static INSTANTIABLE = new OracleKeyword("INSTANTIABLE")
  static INTEGER = new OracleKeyword("INTEGER", { reserved: true })
  static INTERLEAVED = new OracleKeyword("INTERLEAVED")
  static INTERSECT = new OracleKeyword("INTERSECT", { reserved: true })
  static INTERNAL = new OracleKeyword("INTERNAL")
  static INTERVAL = new OracleKeyword("INTERVAL")
  static INTO = new OracleKeyword("INTO", { reserved: true })
  static INVALIDATION = new OracleKeyword("INVALIDATION")
  static INVISIBLE = new OracleKeyword("INVISIBLE")
  static IS = new OracleKeyword("IS", { reserved: true })
  static IS_LEAF = new OracleKeyword("IS_LEAF")
  static ISOLATE = new OracleKeyword("ISOLATE")
  static ISOLATION = new OracleKeyword("ISOLATION")
  static ISOPEN = new OracleKeyword("ISOPEN")
  static ITERATE = new OracleKeyword("ITERATE")
  static JAVA = new OracleKeyword("JAVA")
  static JOIN = new OracleKeyword("JOIN")
  static KEEP = new OracleKeyword("KEEP")
  static KEEP_DUPLICATES = new OracleKeyword("KEEP_DUPLICATES")
  static KEY = new OracleKeyword("KEY")
  static KEYS = new OracleKeyword("KEYS")
  static KEYSTORE = new OracleKeyword("KEYSTORE")
  static KILL = new OracleKeyword("KILL")
  static LANGUAGE = new OracleKeyword("LANGUAGE")
  static LAST = new OracleKeyword("LAST")
  static LEAD_CDB = new OracleKeyword("LEAD_CDB")
  static LEAD_CDB_URI = new OracleKeyword("LEAD_CDB_URI")
  static LEAF = new OracleKeyword("LEAF")
  static LEFT = new OracleKeyword("LEFT")
  static LENGTH = new OracleKeyword("LENGTH")
  static LESS = new OracleKeyword("LESS")
  static LEVEL = new OracleKeyword("LEVEL", { reserved: true })
  static LEVEL_NAME = new OracleKeyword("LEVEL_NAME")
  static LEVELS = new OracleKeyword("LEVELS")
  static LIBRARY = new OracleKeyword("LIBRARY")
  static LIKE = new OracleKeyword("LIKE", { reserved: true })
  static LIKE2 = new OracleKeyword("LIKE2")
  static LIKE4 = new OracleKeyword("LIKE4")
  static LIKEC = new OracleKeyword("LIKEC")
  static LIMIT = new OracleKeyword("LIMIT")
  static LINEAR = new OracleKeyword("LINEAR")
  static LINK = new OracleKeyword("LINK")
  static LIST = new OracleKeyword("LIST")
  static LITERAL = new OracleKeyword("LITERAL")
  static LOAD = new OracleKeyword("LOAD")
  static LOCATION = new OracleKeyword("LOCATION")
  static LOB = new OracleKeyword("LOB")
  static LOBS = new OracleKeyword("LOBS")
  static LOCAL = new OracleKeyword("LOCAL")
  static LOCATOR = new OracleKeyword("LOCATOR")
  static LOCK = new OracleKeyword("LOCK", { reserved: true })
  static LOCKDOWN = new OracleKeyword("LOCKDOWN")
  static LOCKED = new OracleKeyword("LOCKED")
  static LOCKING = new OracleKeyword("LOCKING")
  static LONG = new OracleKeyword("LONG", { reserved: true })
  static LOG = new OracleKeyword("LOG")
  static LOGICAL = new OracleKeyword("LOGICAL")
  static LOGICAL_READS_PER_CALL = new OracleKeyword("LOGICAL_READS_PER_CALL")
  static LOGICAL_READS_PER_SESSION = new OracleKeyword("LOGICAL_READS_PER_SESSION")
  static LOGFILE = new OracleKeyword("LOGFILE")
  static LOGFILES = new OracleKeyword("LOGFILES")
  static LOGGING = new OracleKeyword("LOGGING")
  static LOOP = new OracleKeyword("LOOP")
  static LOST = new OracleKeyword("LOST")
  static LOW = new OracleKeyword("LOW")
  static M = new OracleKeyword("M")
  static MAIN = new OracleKeyword("MAIN")
  static MANAGED = new OracleKeyword("MANAGED")
  static MANAGEMENT = new OracleKeyword("MANAGEMENT")
  static MANUAL = new OracleKeyword("MANUAL")
  static MAP = new OracleKeyword("MAP")
  static MAPPING = new OracleKeyword("MAPPING")
  static MASTER = new OracleKeyword("MASTER")
  static MATCH = new OracleKeyword("MATCH")
  static MATCH_NUMBER = new OracleKeyword("MATCH_NUMBER")
  static MATCH_RECOGNIZE = new OracleKeyword("MATCH_RECOGNIZE")
  static MATCHED = new OracleKeyword("MATCHED")
  static MATERIALIZED = new OracleKeyword("MATERIALIZED")
  static MAX = new OracleKeyword("MAX")
  static MAX_AUDIT_SIZE = new OracleKeyword("MAX_AUDIT_SIZE")
  static MAX_DIAG_SIZE = new OracleKeyword("MAX_DIAG_SIZE")
  static MAXIMIZE = new OracleKeyword("MAXIMIZE")
  static MAXINSTANCES = new OracleKeyword("MAXINSTANCES")
  static MAXDATAFILES = new OracleKeyword("MAXDATAFILES")
  static MAXLEN = new OracleKeyword("MAXLEN")
  static MAXLOGFILES = new OracleKeyword("MAXLOGFILES")
  static MAXLOGMEMBERS = new OracleKeyword("MAXLOGMEMBERS")
  static MAXLOGHISTORY= new OracleKeyword("MAXLOGHISTORY")
  static MAXSIZE = new OracleKeyword("MAXSIZE")
  static MAXEXTENTS = new OracleKeyword("MAXEXTENTS", { reserved: true })
  static MAXVALUE = new OracleKeyword("MAXVALUE")
  static MEASURE = new OracleKeyword("MEASURE")
  static MEASURES = new OracleKeyword("MEASURES")
  static MEDIUM = new OracleKeyword("MEDIUM")
  static METADATA = new OracleKeyword("METADATA")
  static MEMBER = new OracleKeyword("MEMBER")
  static MEMBER_CAPTION = new OracleKeyword("MEMBER_CAPTION")
  static MEMBER_DESCRIPTION = new OracleKeyword("MEMBER_DESCRIPTION")
  static MEMBER_NAME = new OracleKeyword("MEMBER_NAME")
  static MEMBER_UNIQUE_NAME = new OracleKeyword("MEMBER_UNIQUE_NAME")
  static MEMCOMPRESS = new OracleKeyword("MEMCOMPRESS")
  static MEMOPTIMIZE = new OracleKeyword("MEMOPTIMIZE")
  static MEMORY = new OracleKeyword("MEMORY")
  static MERGE = new OracleKeyword("MERGE")
  static MIGRATE = new OracleKeyword("MIGRATE")
  static MIGRATION = new OracleKeyword("MIGRATION")
  static MINIMUM = new OracleKeyword("MINIMUM")
  static MINING = new OracleKeyword("MINING")
  static MINUS = new OracleKeyword("MINUS", { reserved: true })
  static MINUTES = new OracleKeyword("MINUTES")
  static MINVALUE = new OracleKeyword("MINVALUE")
  static MIRROR = new OracleKeyword("MIRROR")
  static MIRRORHOT = new OracleKeyword("MIRRORHOT")
  static MIRRORCOLD = new OracleKeyword("MIRRORCOLD")
  static MLSLABEL = new OracleKeyword("MLSLABEL", { reserved: true })
  static MODE = new OracleKeyword("MODE", { reserved: true })
  static MODEL = new OracleKeyword("MODEL")
  static MODIFY = new OracleKeyword("MODIFY", { reserved: true })
  static MODIFICATION = new OracleKeyword("MODIFICATION")
  static MONITORING = new OracleKeyword("MONITORING")
  static MONTH = new OracleKeyword("MONTH")
  static MONTHS = new OracleKeyword("MONTHS")
  static MOUNT = new OracleKeyword("MOUNT")
  static MOUNTPATH = new OracleKeyword("MOUNTPATH")
  static MOVE = new OracleKeyword("MOVE")
  static MOVEMENT = new OracleKeyword("MOVEMENT")
  static NAME = new OracleKeyword("NAME")
  static NAMED = new OracleKeyword("NAMED")
  static NAMESPACE = new OracleKeyword("NAMESPACE")
  static NATIONAL = new OracleKeyword("NATIONAL")
  static NATURAL = new OracleKeyword("NATURAL")
  static NAV = new OracleKeyword("NAV")
  static NESTED = new OracleKeyword("NESTED")
  static NESTED_TABLE_ID = new OracleKeyword("NESTED_TABLE_ID", { partial: true })
  static NETWORK = new OracleKeyword("NETWORK")
  static NEVER = new OracleKeyword("NEVER")
  static NEW = new OracleKeyword("NEW")
  static NEXT = new OracleKeyword("NEXT")
  static NO = new OracleKeyword("NO")
  static NOARCHIVELOG = new OracleKeyword("NOARCHIVELOG")
  static NOAUDIT = new OracleKeyword("NOAUDIT", { reserved: true })
  static NOCACHE = new OracleKeyword("NOCACHE")
  static NOCOMPRESS = new OracleKeyword("NOCOMPRESS", { reserved: true })
  static NOCOPY = new OracleKeyword("NOCOPY")
  static NOCYCLE = new OracleKeyword("NOCYCLE")
  static NODELAY = new OracleKeyword("NODELAY")
  static NOFORCE = new OracleKeyword("NOFORCE")
  static NOGUARANTEE = new OracleKeyword("NOGUARANTEE")
  static NOKEEP = new OracleKeyword("NOKEEP")
  static NOMAPPING = new OracleKeyword("NOMAPPING")
  static NOMAXVALUE = new OracleKeyword("NOMAXVALUE")
  static NOMINVALUE = new OracleKeyword("NOMINVALUE")
  static NOMONITORING = new OracleKeyword("NOMONITORING")
  static NON$CDB = new OracleKeyword("NON$CDB")
  static NONE = new OracleKeyword("NONE")
  static NONSCHEMA = new OracleKeyword("NONSCHEMA")
  static NOORDER = new OracleKeyword("NOORDER")
  static NOPARALLEL = new OracleKeyword("NOPARALLEL")
  static NORELOCATE = new OracleKeyword("NORELOCATE")
  static NORELY = new OracleKeyword("NORELY")
  static NOREPAIR = new OracleKeyword("NOREPAIR")
  static NOREPLY = new OracleKeyword("NOREPLY")
  static NORESETLOGS = new OracleKeyword("NORESETLOGS")
  static NOREVERSE = new OracleKeyword("NOREVERSE")
  static NORMAL = new OracleKeyword("NORMAL")
  static NOROWDEPENDENCIES = new OracleKeyword("NOROWDEPENDENCIES")
  static NOSCALE = new OracleKeyword("NOSCALE")
  static NOSHARED = new OracleKeyword("NOSHARED")
  static NOSORT = new OracleKeyword("NOSORT")
  static NOSWITCH = new OracleKeyword("NOSWITCH")
  static NOT = new OracleKeyword("NOT", { reserved: true })
  static NOT_FEASIBLE = new OracleKeyword("NOT_FEASIBLE")
  static NOT_FEASIBLE_START = new OracleKeyword("NOT_FEASIBLE_START")
  static NOT_FEASIBLE_END = new OracleKeyword("NOT_FEASIBLE_END")
  static NOTFOUND = new OracleKeyword("NOTFOUND")
  static NOVALIDATE = new OracleKeyword("NOVALIDATE")
  static NOWAIT = new OracleKeyword("NOWAIT", { reserved: true })
  static NULL = new OracleKeyword("NULL", { reserved: true })
  static NULLS = new OracleKeyword("NULLS")
  static NUMBER = new OracleKeyword("NUMBER", { reserved: true })
  static NONEDITIONABLE = new OracleKeyword("NONEDITIONABLE")
  static OBJECT = new OracleKeyword("OBJECT")
  static OF = new OracleKeyword("OF", { reserved: true })
  static OFF = new OracleKeyword("OFF")
  static OFFLINE = new OracleKeyword("OFFLINE", { reserved: true })
  static OFFSET = new OracleKeyword("OFFSET")
  static OIDINDEX = new OracleKeyword("OIDINDEX")
  static OLTP = new OracleKeyword("OLTP")
  static ON = new OracleKeyword("ON", { reserved: true })
  static ONE = new OracleKeyword("ONE")
  static ONLINE = new OracleKeyword("ONLINE", { reserved: true })
  static ONLY = new OracleKeyword("ONLY")
  static OPAQUE = new OracleKeyword("OPAQUE")
  static OPTION = new OracleKeyword("OPTION", { reserved: true })
  static OPEN = new OracleKeyword("OPEN")
  static OPERATOR = new OracleKeyword("OPERATOR")
  static OPTIION = new OracleKeyword("OPTIION")
  static OPTIMIZE = new OracleKeyword("OPTIMIZE")
  static OR = new OracleKeyword("OR", { reserved: true })
  static ORDER = new OracleKeyword("ORDER", { reserved: true })
  static ORGANIZATION = new OracleKeyword("ORGANIZATION")
  static OTHER = new OracleKeyword("OTHER")
  static OUT = new OracleKeyword("OUT")
  static OUTER = new OracleKeyword("OUTER")
  static OUTLINE = new OracleKeyword("OUTLINE")
  static OVERFLOW = new OracleKeyword("OVERFLOW")
  static OVERLAPS = new OracleKeyword("OVERLAPS", { reserved: true })
  static OVERRIDING = new OracleKeyword("OVERRIDING")
  static OWNER = new OracleKeyword("OWNER")
  static OWNERSHIP = new OracleKeyword("OWNERSHIP")
  static P = new OracleKeyword("P")
  static PACKAGE = new OracleKeyword("PACKAGE")
  static PACKAGES = new OracleKeyword("PACKAGES")
  static PARAMETERS = new OracleKeyword("PARAMETERS")
  static PARENT_LEVEL_NAME = new OracleKeyword("PARENT_LEVEL_NAME")
  static PARENT_UNIQUE_NAME = new OracleKeyword("PARENT_UNIQUE_NAME")
  static PARTIAL = new OracleKeyword("PARTIAL")
  static PARITY = new OracleKeyword("PARITY")
  static PASSWORD = new OracleKeyword("PASSWORD")
  static PASSWORD_GRACE_TIME = new OracleKeyword("PASSWORD_GRACE_TIME")
  static PASSWORD_LIFE_TIME = new OracleKeyword("PASSWORD_LIFE_TIME")
  static PASSWORD_LOCK_TIME = new OracleKeyword("PASSWORD_LOCK_TIME")
  static PASSWORD_REUSE_TIME = new OracleKeyword("PASSWORD_REUSE_TIME")
  static PASSWORD_REUSE_MAX = new OracleKeyword("PASSWORD_REUSE_MAX")
  static PASSWORD_ROLLOVER_TIME = new OracleKeyword("PASSWORD_ROLLOVER_TIME")
  static PASSWORD_VERIFY_FUNCTION = new OracleKeyword("PASSWORD_VERIFY_FUNCTION")
  static PASSWORDFILE_METADATA_CACHE = new OracleKeyword("PASSWORDFILE_METADATA_CACHE")
  static PATCH = new OracleKeyword("PATCH")
  static PATH = new OracleKeyword("PATH")
  static PATH_PREFIX = new OracleKeyword("PATH_PREFIX")
  static PATTERN = new OracleKeyword("PATTERN")
  static PCTFREE = new OracleKeyword("PCTFREE", { reserved: true })
  static PCTTHRESHOLD = new OracleKeyword("PCTTHRESHOLD")
  static PCTUSED = new OracleKeyword("PCTUSED")
  static PCTVERSION = new OracleKeyword("PCTVERSION")
  static PER = new OracleKeyword("PER")
  static PERFORMANCE = new OracleKeyword("PERFORMANCE")
  static PERMANENT = new OracleKeyword("PERMANENT")
  static PERMISSION = new OracleKeyword("PERMISSION")
  static PARALLEL = new OracleKeyword("PARALLEL")
  static PARALLEL_ENABLE = new OracleKeyword("PARALLEL_ENABLE")
  static PARTITION = new OracleKeyword("PARTITION")
  static PARTITIONSET = new OracleKeyword("PARTITIONSET")
  static PFILE = new OracleKeyword("PFILE")
  static PHYSICAL = new OracleKeyword("PHYSICAL")
  static PIPE = new OracleKeyword("PIPE")
  static PIPELINED = new OracleKeyword("PIPELINED")
  static PIVOT = new OracleKeyword("PIVOT")
  static PLAN = new OracleKeyword("PLAN")
  static PLS_INTEGER = new OracleKeyword("PLS_INTEGER")
  static PLUGGABLE = new OracleKeyword("PLUGGABLE")
  static POINT = new OracleKeyword("POINT")
  static POLICY = new OracleKeyword("POLICY")
  static POLYMORPHIC = new OracleKeyword("POLYMORPHIC")
  static PORT = new OracleKeyword("PORT")
  static POST_TRANSACTION = new OracleKeyword("POST_TRANSACTION")
  static POWER = new OracleKeyword("POWER")
  static PRAGMA = new OracleKeyword("PRAGMA")
  static PRECISION = new OracleKeyword("PRECISION")
  static PREPARE = new OracleKeyword("PREPARE")
  static PERIOD = new OracleKeyword("PERIOD")
  static PREBUILD = new OracleKeyword("PREBUILD")
  static PRESERVE = new OracleKeyword("PRESERVE")
  static PREV = new OracleKeyword("PREV")
  static PRIMARY = new OracleKeyword("PRIMARY")
  static PRIOR = new OracleKeyword("PRIOR", { reserved: true })
  static PRIORITY = new OracleKeyword("PRIORITY")
  static PRIVATE = new OracleKeyword("PRIVATE")
  static PRIVATE_SGA = new OracleKeyword("PRIVATE_SGA")
  static PRIVILEGES = new OracleKeyword("PRIVILEGES")
  static PROCEDURAL = new OracleKeyword("PROCEDURAL")
  static PROCEDURE = new OracleKeyword("PROCEDURE", { reserved: true })
  static PROFILE = new OracleKeyword("PROFILE")
  static PROJECT = new OracleKeyword("PROJECT")
  static PROPERTY = new OracleKeyword("PROPERTY")
  static PROTECTION = new OracleKeyword("PROTECTION")
  static PROXY = new OracleKeyword("PROXY")
  static PRUNING = new OracleKeyword("PRUNING")
  static PUBLIC = new OracleKeyword("PUBLIC", { reserved: true })
  static PURGE = new OracleKeyword("PURGE")
  static QUERY = new OracleKeyword("QUERY")
  static QUIESCE = new OracleKeyword("QUIESCE")
  static QUORUM = new OracleKeyword("QUORUM")
  static QUOTA = new OracleKeyword("QUOTA")
  static QUOTAGROUP = new OracleKeyword("QUOTAGROUP")
  static QUARTERS = new OracleKeyword("QUARTERS")
  static RAISE = new OracleKeyword("RAISE")
  static RANGE = new OracleKeyword("RANGE")
  static RAW = new OracleKeyword("RAW", { reserved: true })
  static READ = new OracleKeyword("READ")
  static READS = new OracleKeyword("READS")
  static REBUILD = new OracleKeyword("REBUILD")
  static RECORD = new OracleKeyword("RECORD")
  static RECOVER = new OracleKeyword("RECOVER")
  static RECYCLEBIN = new OracleKeyword("RECYCLEBIN")
  static REDO = new OracleKeyword("REDO")
  static REDUCED = new OracleKeyword("REDUCED")
  static REDUNDANCY = new OracleKeyword("REDUNDANCY")
  static REF = new OracleKeyword("REF")
  static REFERENCE = new OracleKeyword("REFERENCE")
  static REFERENCED = new OracleKeyword("REFERENCED")
  static REFERENCES = new OracleKeyword("REFERENCES")
  static REFRESH = new OracleKeyword("REFRESH")
  static REGISTER = new OracleKeyword("REGISTER")
  static REGULAR = new OracleKeyword("REGULAR")
  static REJECT = new OracleKeyword("REJECT")
  static REKEY = new OracleKeyword("REKEY")
  static RELATIONAL = new OracleKeyword("RELATIONAL")
  static RELIES_ON = new OracleKeyword("RELIES_ON")
  static RELY = new OracleKeyword("RELY")
  static RELOCATE = new OracleKeyword("RELOCATE")
  static RENAME = new OracleKeyword("RENAME", { reserved: true })
  static REPAIR = new OracleKeyword("REPAIR")
  static REPEAT = new OracleKeyword("REPEAT")
  static REPLACE = new OracleKeyword("REPLACE")
  static REPLICATION = new OracleKeyword("REPLICATION")
  static REQUIRED = new OracleKeyword("REQUIRED")
  static RESETLOGS = new OracleKeyword("RESETLOGS")
  static RESIZE = new OracleKeyword("RESIZE")
  static RESOLVE = new OracleKeyword("RESOLVE")
  static RESOLVER = new OracleKeyword("RESOLVER")
  static RESOURCE = new OracleKeyword("RESOURCE", { reserved: true })
  static RESTART = new OracleKeyword("RESTART")
  static RESTORE = new OracleKeyword("RESTORE")
  static RESTRICT_REFERENCES = new OracleKeyword("RESTRICT_REFERENCES")
  static RESTRICTED = new OracleKeyword("RESTRICTED")
  static RESUMABLE = new OracleKeyword("RESUMABLE")
  static RESULT_CACHE = new OracleKeyword("RESULT_CACHE")
  static RESUME = new OracleKeyword("RESUME")
  static RETENTION = new OracleKeyword("RETENTION")
  static RETURN = new OracleKeyword("RETURN")
  static RETURNING = new OracleKeyword("RETURNING")
  static REUSE = new OracleKeyword("REUSE")
  static REVERSE = new OracleKeyword("REVERSE")
  static REVOKE = new OracleKeyword("REVOKE", { reserved: true })
  static REWRITE = new OracleKeyword("REWRITE")
  static RIGHT = new OracleKeyword("RIGHT")
  static RNDS = new OracleKeyword("RNDS")
  static RNPS = new OracleKeyword("RNPS")
  static ROLE = new OracleKeyword("ROLE")
  static ROLES = new OracleKeyword("ROLES")
  static ROLLBACK = new OracleKeyword("ROLLBACK")
  static ROLLING = new OracleKeyword("ROLLING")
  static ROLLUP = new OracleKeyword("ROLLUP")
  static ROOT = new OracleKeyword("ROOT")
  static ROW = new OracleKeyword("ROW", { reserved: true })
  static ROWCOUNT = new OracleKeyword("ROWCOUNT")
  static ROWDEPENDENCIES = new OracleKeyword("ROWDEPENDENCIES")
  static ROWID = new OracleKeyword("ROWID", { reserved: true })
  static ROWNUM = new OracleKeyword("ROWNUM", { reserved: true })
  static ROWS = new OracleKeyword("ROWS", { reserved: true })
  static ROWTYPE = new OracleKeyword("ROWTYPE")
  static RULES = new OracleKeyword("RULES")
  static RUNNING = new OracleKeyword("RUNNING")
  static SALT = new OracleKeyword("SALT")
  static SAMPLE = new OracleKeyword("SAMPLE")
  static SAVE = new OracleKeyword("SAVE")
  static SAVEPOINT = new OracleKeyword("SAVEPOINT")
  static SCHEMA = new OracleKeyword("SCHEMA")
  static SCALE = new OracleKeyword("SCALE")
  static SCAN = new OracleKeyword("SCAN")
  static SCN = new OracleKeyword("SCN")
  static SCOPE = new OracleKeyword("SCOPE")
  static SCRUB = new OracleKeyword("SCRUB")
  static SEARCH = new OracleKeyword("SEARCH")
  static SECONDS = new OracleKeyword("SECONDS")
  static SECRET = new OracleKeyword("SECRET")
  static SECUREFILE = new OracleKeyword("SECUREFILE")
  static SEED = new OracleKeyword("SEED")
  static SEGMENT = new OracleKeyword("SEGMENT")
  static SELECT = new OracleKeyword("SELECT", { reserved: true })
  static SELECTIVITY = new OracleKeyword("SELECTIVITY")
  static SELF = new OracleKeyword("SELF")
  static SESSION = new OracleKeyword("SESSION", { reserved: true })
  static SESSIONS_PER_USER = new OracleKeyword("SESSIONS_PER_USER")
  static SET = new OracleKeyword("SET", { reserved: true })
  static SETS = new OracleKeyword("SETS")
  static SETTINGS = new OracleKeyword("SETTINGS")
  static SEQUENCE = new OracleKeyword("SEQUENCE")
  static SEQUENTIAL = new OracleKeyword("SEQUENTIAL")
  static SERIALIZABLE = new OracleKeyword("SERIALIZABLE")
  static SERIALLY_REUSABLE = new OracleKeyword("SERIALLY_REUSABLE")
  static SERVICE = new OracleKeyword("SERVICE")
  static SERVICE_NAME_CONVERT = new OracleKeyword("SERVICE_NAME_CONVERT")
  static SHARE = new OracleKeyword("SHARE", { reserved: true })
  static SHARING = new OracleKeyword("SHARING")
  static SHARED = new OracleKeyword("SHARED")
  static SHARED_POOL = new OracleKeyword("SHARED_POOL")
  static SHAREDSPACE = new OracleKeyword("SHAREDSPACE")
  static SHRINK = new OracleKeyword("SHRINK")
  static SHUTDOWN = new OracleKeyword("SHUTDOWN")
  static SID = new OracleKeyword("SID")
  static SINGLE = new OracleKeyword("SINGLE")
  static SITE = new OracleKeyword("SITE")
  static SIZE = new OracleKeyword("SIZE", { reserved: true })
  static SKIP = new OracleKeyword("SKIP")
  static SMALLFILE = new OracleKeyword("SMALLFILE")
  static SMALLINT = new OracleKeyword("SMALLINT", { reserved: true })
  static SNAPSHOT = new OracleKeyword("SNAPSHOT")
  static SORT = new OracleKeyword("SORT")
  static SPACE = new OracleKeyword("SPACE")
  static SPECIFICATION = new OracleKeyword("SPECIFICATION")
  static SPFILE = new OracleKeyword("SPFILE")
  static SPLIT = new OracleKeyword("SPLIT")
  static SOURCE = new OracleKeyword("SOURCE")
  static SOURCE_FILE_DIRECTORY = new OracleKeyword("SOURCE_FILE_DIRECTORY")
  static SOURCE_FILE_NAME_CONVERT = new OracleKeyword("SOURCE_FILE_NAME_CONVERT")
  static SQL = new OracleKeyword("SQL", { reserved: true })
  static SQL_MACRO = new OracleKeyword("SQL_MACRO")
  static SQLCODE = new OracleKeyword("SQLCODE")
  static SQLERRM = new OracleKeyword("SQLERRM")
  static STANDARD = new OracleKeyword("STANDARD")
  static STANDBY = new OracleKeyword("STANDBY")
  static STANDBYS = new OracleKeyword("STANDBYS")
  static START = new OracleKeyword("START", { reserved: true })
  static STATE = new OracleKeyword("STATE")
  static STATEMENT = new OracleKeyword("STATEMENT")
  static STATEMENT_ID = new OracleKeyword("STATEMENT_ID")
  static STATEMENTS = new OracleKeyword("STATEMENTS")
  static STATIC = new OracleKeyword("STATIC")
  static STATISTICS = new OracleKeyword("STATISTICS")
  static STORAGE = new OracleKeyword("STORAGE")
  static STORE = new OracleKeyword("STORE")
  static STRING = new OracleKeyword("STRING")
  static STRIPE_WIDTH = new OracleKeyword("STRIPE_WIDTH")
  static STRIPE_COLUMNS = new OracleKeyword("STRIPE_COLUMNS")
  static STRUCT = new OracleKeyword("STRUCT")
  static STRUCTURE = new OracleKeyword("STRUCTURE")
  static SUBSET = new OracleKeyword("SUBSET")
  static SUBSTITUTABLE = new OracleKeyword("SUBSTITUTABLE")
  static SUBPARTITION = new OracleKeyword("SUBPARTITION")
  static SUBPARTITIONS = new OracleKeyword("SUBPARTITIONS")
  static SUBTYPE = new OracleKeyword("SUBTYPE", { reserved: true })
  static SUCCESSFUL = new OracleKeyword("SUCCESSFUL", { reserved: true })
  static SUPPLEMENTAL = new OracleKeyword("SUPPLEMENTAL")
  static SUSPEND = new OracleKeyword("SUSPEND")
  static SWITCH = new OracleKeyword("SWITCH")
  static SWITCHOVER = new OracleKeyword("SWITCHOVER")
  static SYNC = new OracleKeyword("SYNC")
  static SYNCHRONOUS = new OracleKeyword("SYNCHRONOUS")
  static SYNONYM = new OracleKeyword("SYNONYM", { reserved: true })
  static SYS = new OracleKeyword("SYS")
  static SYSAUX = new OracleKeyword("SYSAUX")
  static SYSDATE = new OracleKeyword("SYSDATE", { reserved: true })
  static SYSTEM = new OracleKeyword("SYSTEM")
  static T = new OracleKeyword("T")
  static TABAUTH = new OracleKeyword("TABAUTH", { reserved: true })
  static TABLE = new OracleKeyword("TABLE", { reserved: true })
  static TABLES = new OracleKeyword("TABLES")
  static TABLESPACE = new OracleKeyword("TABLESPACE")
  static TAG = new OracleKeyword("TAG")
  static TARGET = new OracleKeyword("TARGET")
  static TDO = new OracleKeyword("TDO")
  static TEMPFILE = new OracleKeyword("TEMPFILE")
  static TEMPLATE = new OracleKeyword("TEMPLATE")
  static TEMPORARY = new OracleKeyword("TEMPORARY")
  static TEST = new OracleKeyword("TEST")
  static THAN = new OracleKeyword("THAN")
  static THEN = new OracleKeyword("THEN", { reserved: true })
  static THREAD = new OracleKeyword("THREAD")
  static THROUGH = new OracleKeyword("THROUGH")
  static TIME = new OracleKeyword("TIME")
  static TIME_ZONE = new OracleKeyword("TIME_ZONE")
  static TIMESTAMP = new OracleKeyword("TIMESTAMP")
  static TIMEOUT = new OracleKeyword("TIMEOUT")
  static TIER = new OracleKeyword("TIER")
  static TO = new OracleKeyword("TO", { reserved: true })
  static TOPLEVEL = new OracleKeyword("TOPLEVEL")
  static TRACE = new OracleKeyword("TRACE")
  static TRACKING = new OracleKeyword("TRACKING")
  static TRIGGER = new OracleKeyword("TRIGGER", { reserved: true })
  static TRIGGERS = new OracleKeyword("TRIGGERS")
  static TRIM = new OracleKeyword("TRIM")
  static TRUST = new OracleKeyword("TRUST")
  static TRUSTED = new OracleKeyword("TRUSTED")
  static TRUNCATE = new OracleKeyword("TRUNCATE")
  static TRANSLATION = new OracleKeyword("TRANSLATION")
  static TRANSACTION = new OracleKeyword("TRANSACTION")
  static TRUE = new OracleKeyword("TRUE")
  static TYPE = new OracleKeyword("TYPE", { reserved: true })
  static TYPES = new OracleKeyword("TYPES")
  static UDF = new OracleKeyword("UDF")
  static UID = new OracleKeyword("UID", { reserved: true })
  static UNARCHIVED = new OracleKeyword("UNARCHIVED")
  static UNRECOVERABLE = new OracleKeyword("UNRECOVERABLE")
  static UNDER = new OracleKeyword("UNDER")
  static UNDO = new OracleKeyword("UNDO")
  static UNDROP = new OracleKeyword("UNDROP")
  static UNION = new OracleKeyword("UNION", { reserved: true })
  static UNITE = new OracleKeyword("UNITE")
  static UNPLUG = new OracleKeyword("UNPLUG")
  static UNQUIESCE = new OracleKeyword("UNQUIESCE")
  static UNPROTECTED = new OracleKeyword("UNPROTECTED")
  static UNINSTALL = new OracleKeyword("UNINSTALL")
  static UNIFORM = new OracleKeyword("UNIFORM")
  static UNIQUE = new OracleKeyword("UNIQUE", { reserved: true })
  static UNLIMITED = new OracleKeyword("UNLIMITED")
  static UNLOCK = new OracleKeyword("UNLOCK")
  static UNTIL = new OracleKeyword("UNTIL")
  static UNPIVOT = new OracleKeyword("UNPIVOT")
  static UNUSABLE = new OracleKeyword("UNUSABLE")
  static UNUSED = new OracleKeyword("UNUSED")
  static UPDATE = new OracleKeyword("UPDATE", { reserved: true })
  static UPDATED = new OracleKeyword("UPDATED")
  static UPDATING = new OracleKeyword("UPDATING")
  static UPGRADE = new OracleKeyword("UPGRADE")
  static UPSERT = new OracleKeyword("UPSERT")
  static USAGE = new OracleKeyword("USAGE")
  static USE = new OracleKeyword("USE")
  static USE_STORED_OUTLINES = new OracleKeyword("USE_STORED_OUTLINES")
  static USER = new OracleKeyword("USER", { reserved: true })
  static USER_DATA = new OracleKeyword("USER_DATA")
  static USER_TABLESPACES = new OracleKeyword("USER_TABLESPACES")
  static USERS = new OracleKeyword("USERS")
  static USERGROUP = new OracleKeyword("USERGROUP")
  static USING = new OracleKeyword("USING")
  static USING_NLS_COMP = new OracleKeyword("USING_NLS_COMP")
  static VARRAY = new OracleKeyword("VARRAY")
  static VARRAYS = new OracleKeyword("VARRAYS")
  static VALIDATE = new OracleKeyword("VALIDATE", { reserved: true })
  static VALUE = new OracleKeyword("VALUE")
  static VALUES = new OracleKeyword("VALUES", { reserved: true })
  static VARYING = new OracleKeyword("VARYING")
  static VARCHAR = new OracleKeyword("VARCHAR", { reserved: true })
  static VARCHAR2 = new OracleKeyword("VARCHAR2", { reserved: true })
  static VERIFY = new OracleKeyword("VERIFY")
  static VERSION = new OracleKeyword("VERSION")
  static VERSIONS = new OracleKeyword("VERSIONS")
  static VIEW = new OracleKeyword("VIEW", { reserved: true })
  static VIEWS = new OracleKeyword("VIEWS", { reserved: true })
  static VIRTUAL = new OracleKeyword("VIRTUAL")
  static VISIBLE = new OracleKeyword("VISIBLE")
  static VISIBLITY = new OracleKeyword("VISIBLITY")
  static VOLUME = new OracleKeyword("VOLUME")
  static WAIT = new OracleKeyword("WAIT")
  static WALLET = new OracleKeyword("WALLET")
  static WEEKS = new OracleKeyword("WEEKS")
  static WHEN = new OracleKeyword("WHEN", { reserved: true })
  static WHENEVER = new OracleKeyword("WHENEVER", { reserved: true })
  static WHERE = new OracleKeyword("WHERE", { reserved: true })
  static WITH = new OracleKeyword("WITH", { reserved: true })
  static WITHOUT = new OracleKeyword("WITHOUT")
  static WNDS = new OracleKeyword("WNDS")
  static WNPS = new OracleKeyword("WNPS")
  static WORK = new OracleKeyword("WORK")
  static WRITE = new OracleKeyword("WRITE")
  static XDB = new OracleKeyword("XDB")
  static XML = new OracleKeyword("XML")
  static XMLSCHEMA = new OracleKeyword("XMLSCHEMA")
  static XMLTYPE = new OracleKeyword("XMLTYPE")
  static XS = new OracleKeyword("XS")
  static YEAR = new OracleKeyword("YEAR")
  static YEARS = new OracleKeyword("YEARS")
  static ZONEMAP = new OracleKeyword("ZONEMAP")

  static OPE_ASSIGN = new OracleKeyword("OPE_ASSIGN", { value: ":=" })
  static OPE_EQ = new OracleKeyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new OracleKeyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new OracleKeyword("OPE_MINUS", { value: "-" })
  static OPE_AT = new OracleKeyword("OPE_AT", { value: "@" })
  static OPE_PERCENT = new OracleKeyword("OPE_PERCENT", { value: "%" })

  constructor(
    public name: string,
    public options: Record<string, any> = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

const Keyword = OracleKeyword
export class OracleLexer extends Lexer {
  private reserved = new Set<OracleKeyword>()

  constructor(
    options: Record<string, any> = {}
  ) {
    super("oracle", [
      { type: TokenType.WhiteSpace, re: /[ \t]+/y },
      { type: TokenType.HintComment, re: /\/\*\+.*?\*\//sy },
      { type: TokenType.BlockComment, re: /\/\*.*?\*\//sy },
      { type: TokenType.LineComment, re: /--.*/y },
      { type: TokenType.Delimiter, re: /^[ \t]*[./](?=[ \t]|$)/my },
      { type: TokenType.LineBreak, re: /(?:\r\n?|\n)/y },
      { type: TokenType.SemiColon, re: /;/y },
      { type: TokenType.Operator, re: /\(\+\)=?/y },
      { type: TokenType.LeftParen, re: /\(/y },
      { type: TokenType.RightParen, re: /\)/y },
      { type: TokenType.Comma, re: /,/y },
      { type: TokenType.Number, re: /0[xX][0-9a-fA-F]+|((0|[1-9][0-9]*)(\.[0-9]+)?|(\.[0-9]+))([eE][+-]?[0-9]+)?/y },
      { type: TokenType.Dot, re: /\./y },
      { type: TokenType.String, re: /'([^']|'')*'/y },
      { type: TokenType.QuotedIdentifier, re: /"([^"]|"")*"/y },
      { type: TokenType.BindVariable, re: /:[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Identifier, re: /[a-zA-Z\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF][a-zA-Z0-9_$#\u8000-\uFFEE\uFFF0-\uFFFD\uFFFF]*/y },
      { type: TokenType.Operator, re: /\|\||<<|>>|<>|[=<>!^:]=?|[~&|*/+-]/y },
      { type: TokenType.Error, re: /./y },
    ], options)

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

  protected process(token: Token) {
    if (
      token.type === TokenType.Identifier ||
      token.type === TokenType.Operator
    ) {
      const keyword = KeywordMap.get(token.text.toUpperCase())
      if (keyword) {
        if (this.reserved.has(keyword)) {
          token.type = keyword
        } else {
          token.subtype = keyword
        }
      }
    }
    return token
  }
}

export class OracleSplitter extends Splitter {
  static split: SplitFunction = function(input: string, options?: Record<string, any>) {
    const tokens = new OracleLexer(options).lex(input)
    const stmts = new OracleSplitter(options).split(tokens)
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
    let isBlock = false
    for (const token of tokens) {
      if (!segment) {
        segment = []
        isBlock = false
        segments.push(segment)
      }
      if (token.is(TokenType.Command)) {
        segment = []
        segment.push(token)
        segments.push(segment)
        segment = undefined
      } else if (token.is(TokenType.SemiColon)) {
        segment.push(token)
        if (isBlock || this.isBlock(segment)) {
          isBlock = true
        } else {
          segment = undefined
        }
      } else if (token.is(TokenType.Delimiter) || token.is(TokenType.Eof)) {
        segment.push(token)
        segment = undefined
      } else {
        segment.push(token)
      }
    }

    return segments
  }

  private isBlock(tokens: Token[]) {
    if (tokens.length === 0) {
      return false
    } else if (tokens[0].is(Keyword.DECLARE) || tokens[0].is(Keyword.BEGIN)) {
      return true
    } else if (tokens[0].is(Keyword.CREATE)) {
      let i = 1
      if (tokens[i]?.is(Keyword.OR)) {
        i++
        if (tokens[i]?.is(Keyword.REPLACE)) {
          i++
        } else {
          return false
        }
      }
      if (tokens[i]?.is(Keyword.EDITIONABLE) || tokens[i]?.is(Keyword.NONEDITIONABLE)) {
        i++
      }
      if (
        tokens[i].is(Keyword.FUNCTION)
        || tokens[i].is(Keyword.LIBRARY)
        || tokens[i].is(Keyword.PACKAGE)
        || tokens[i].is(Keyword.PROCEDURE)
        || tokens[i].is(Keyword.TRIGGER)
        || tokens[i].is(Keyword.TYPE)
      ) {
        return true
      }
    }
    return false
  }
}

export class OracleParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new OracleLexer(options).lex(input)
    return new OracleParser(tokens, options).parse()
  }

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  parse(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.peekIf(TokenType.Eof)) {
          root.add(this.consume())
          break
        } else if (this.peekIf(TokenType.Delimiter) || this.peekIf(TokenType.SemiColon)) {
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

    if (this.token()) {
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
    return stmt
  }

  private statement() {
    let explainPlan
    let stmt
    let isBlock = false

    try {
      if (this.peekIf(Keyword.EXPLAIN)) {
        explainPlan = new Node("explain plan")
        explainPlan.add(this.consume())
        explainPlan.add(this.consume(Keyword.PLAN))

        if (this.peekIf(Keyword.SET)) {
          const childNode = new Node("statement_id")
          childNode.add(this.consume())
          childNode.add(this.consume(Keyword.STATEMENT_ID))
          childNode.add(this.consume(Keyword.OPE_EQ))
          childNode.add(this.consume(TokenType.String))
          childNode.value = dequote(this.token(-1).text)
          explainPlan.add(childNode)
        }

        if (this.peekIf(Keyword.INTO)) {
          explainPlan.add(this.consume())
        }

        this.parseName(explainPlan)

        explainPlan.add(this.consume(Keyword.FOR))
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.OR, Keyword.REPLACE)) {
          this.consume()
          this.consume()
        } else if (this.peekIf(Keyword.BIGFILE) || this.peekIf(Keyword.SMALLFILE)) {
          this.consume()
        }
        if (
          this.peekIf(Keyword.AND, Keyword.RESOLVE) ||
          this.peekIf(Keyword.AND, Keyword.COMPILE)
        ) {
          this.consume()
          this.consume()
        }
        if (this.peekIf(Keyword.NO, Keyword.FORCE)) {
          this.consume()
          this.consume()
        } else if (this.peekIf(Keyword.FORCE) || this.peekIf(Keyword.NOFORCE)) {
          this.consume()
        }
        if (this.peekIf(Keyword.EDITIONABLE) || this.peekIf(Keyword.NONEDITIONABLE)) {
          this.consume()
        }

        if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createAnalyticViewStatement()
        } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.createAttributeDimensionStatement()
        } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          this.pos = mark
          stmt = this.createAuditPolicyStatement()
        } else if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.createClusterStatement()
        } else if (this.peekIf(Keyword.CONTEXT)) {
          this.pos = mark
          stmt = this.createContextStatement()
        } else if (this.peekIf(Keyword.CONTROLFILE)) {
          this.pos = mark
          stmt = this.createControlfileStatement()
        } else if (
          this.peekIf(Keyword.SHARED, Keyword.PUBLIC, Keyword.DATABASE, Keyword.LINK) ||
          this.peekIf(Keyword.SHARED, Keyword.DATABASE, Keyword.LINK) ||
          this.peekIf(Keyword.PUBLIC, Keyword.DATABASE, Keyword.LINK) ||
          this.peekIf(Keyword.DATABASE, Keyword.LINK)
        ) {
          this.pos = mark
          stmt = this.createDatabaseLinkStatement()
        } else if (this.peekIf(Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.createDatabaseStatement()
        } else if (this.peekIf(Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.createDimensionStatement()
        } else if (this.peekIf(Keyword.DIRECTORY)) {
          this.pos = mark
          stmt = this.createDirectoryStatement()
        } else if (this.peekIf(Keyword.DISKGROUP)) {
          this.pos = mark
          stmt = this.createDiskgroupStatement()
        } else if (this.peekIf(Keyword.EDITION)) {
          this.pos = mark
          stmt = this.createEditionStatement()
        } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          this.pos = mark
          stmt = this.createEditionStatement()
        } else if (this.peekIf(Keyword.FUNCTION)) {
          isBlock = true
          this.pos = mark
          stmt = this.createFunctionStatement()
        } else if (this.peekIf(Keyword.HIERARCHY)) {
          this.pos = mark
          stmt = this.createHierarchyStatement()
        } else if (
          this.peekIf(Keyword.UNIQUE, Keyword.INDEX) || 
          this.peekIf(Keyword.BITMAP, Keyword.INDEX) ||
          this.peekIf(Keyword.INDEX)
        ) {
          this.pos = mark
          stmt = this.createIndexStatement()
        } else if (this.peekIf(Keyword.INDEXTYPE)) {
          this.pos = mark
          stmt = this.createIndextypeStatement()
        } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          this.pos = mark
          stmt = this.createInmemoryJoinGroupStatement()
        } else if (this.peekIf(Keyword.JAVA)) {
          this.pos = mark
          stmt = this.createJavaStatement()
        } else if (this.peekIf(Keyword.LIBRARY)) {
          isBlock = true
          this.pos = mark
          stmt = this.createLibraryStatement()
        } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.createLockdownProfileStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          this.pos = mark
          stmt = this.createMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          this.pos = mark
          stmt = this.createMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createMaterializedViewStatement()
        } else if (this.peekIf(Keyword.OPERATOR)) {
          this.pos = mark
          stmt = this.createOperatorStatement()
        } else if (
          this.peekIf(Keyword.PUBLIC, Keyword.OUTLINE) ||
          this.peekIf(Keyword.PRIVATE, Keyword.OUTLINE) ||
          this.peekIf(Keyword.OUTLINE)
        ) {
          this.pos = mark
          stmt = this.createOutlineStatement()
        } else if (this.peekIf(Keyword.PACKAGE, Keyword.BODY)) {
          isBlock = true
          this.pos = mark
          stmt = this.createPackageBodyStatement()
        } else if (this.peekIf(Keyword.PACKAGE)) {
          isBlock = true
          this.pos = mark
          stmt = this.createPackageStatement()
        } else if (this.peekIf(Keyword.PFILE)) {
          this.pos = mark
          stmt = this.createPfileStatement()
        } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.createPluggableDatabaseStatement()
        } else if (this.peekIf(Keyword.PROCEDURE)) {
          isBlock = true
          this.pos = mark
          stmt = this.createProcedureStatement()
        } else if (this.peekIf(Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.createProfileStatement()
        } else if (
          this.peekIf(Keyword.CLEAN, Keyword.RESTORE, Keyword.POINT) ||
          this.peekIf(Keyword.RESTORE, Keyword.POINT)
        ) {
          this.pos = mark
          stmt = this.createRestorePointStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.createRoleStatement()
        } else if (
          this.peekIf(Keyword.PUBLIC, Keyword.ROLLBACK, Keyword.SEGMENT) ||
          this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)
        ) {
          this.pos = mark
          stmt = this.createRollbackSegmentStatement()
        } else if (this.peekIf(Keyword.SCHEMA)) {
          this.pos = mark
          stmt = this.createSchemaStatement()
        } else if (this.peekIf(Keyword.SEQUENCE)) {
          this.pos = mark
          stmt = this.createSequenceStatement()
        } else if (this.peekIf(Keyword.SPFILE)) {
          this.pos = mark
          stmt = this.createSpfileStatement()
        } else if (
          this.peekIf(Keyword.PUBLIC, Keyword.SYNONYM) ||
          this.peekIf(Keyword.SYNONYM)
        ) {
          this.pos = mark
          stmt = this.createSynonymStatement()
        } else if (
          this.peekIf(Keyword.GLOBAL, Keyword.TEMPORARY, Keyword.TABLE) ||
          this.peekIf(Keyword.PRIVATE, Keyword.TEMPORARY, Keyword.TABLE) ||
          this.peekIf(Keyword.SHARED, Keyword.TABLE) ||
          this.peekIf(Keyword.DUPLICATED, Keyword.TABLE) ||
          this.peekIf(Keyword.IMMUTABLE, Keyword.BLOCKCHAIN, Keyword.TABLE) ||
          this.peekIf(Keyword.BLOCKCHAIN, Keyword.TABLE) ||
          this.peekIf(Keyword.IMMUTABLE, Keyword.TABLE) ||
          this.peekIf(Keyword.TABLE)
        ) {
          this.pos = mark
          stmt = this.createTableStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.createTablespaceSetStatement()
        } else if (
          this.peekIf(Keyword.LOCAL, Keyword.TEMPORARY, Keyword.TABLESPACE) ||
          this.peekIf(Keyword.TEMPORARY, Keyword.TABLESPACE) ||
          this.peekIf(Keyword.UNDO, Keyword.TABLESPACE) ||
          this.peekIf(Keyword.TABLESPACE)
        ) {
          this.pos = mark
          stmt = this.createTablespaceStatement()
        } else if (this.peekIf(Keyword.TRIGGER)) {
          isBlock = true
          this.pos = mark
          stmt = this.createTriggerStatement()
        } else if (this.peekIf(Keyword.TYPE, Keyword.BODY)) {
          isBlock = true
          this.pos = mark
          stmt = this.createTypeBodyStatement()
        } else if (this.peekIf(Keyword.TYPE)) {
          isBlock = true
          this.pos = mark
          stmt = this.createTypeStatement()
        } else if (this.peekIf(Keyword.USER)) {
          this.pos = mark
          stmt = this.createUserStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.createViewStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ALTER)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.SHARED)) {
          this.consume()
        }
        if (this.peekIf(Keyword.PUBLIC)) {
          this.consume()
        }

        if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.alterAnalyticViewStatement()
        } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.alterAttributeDimensionStatement()
        } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          this.pos = mark
          stmt = this.alterAuditPolicyStatement()
        } else if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.alterClusterStatement()
        } else if (this.peekIf(Keyword.DATABASE, Keyword.DICTIONARY)) {
          this.pos = mark
          stmt = this.alterDatabaseDictionaryStatement()
        } else if (this.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          this.pos = mark
          stmt = this.alterDatabaseLinkStatement()  
        } else if (this.peekIf(Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.alterDatabaseStatement()  
        } else if (this.peekIf(Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.alterDimensionStatement()
        } else if (this.peekIf(Keyword.DISKGROUP)) {
          this.pos = mark
          stmt = this.alterDiskgroupStatement()
        } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          this.pos = mark
          stmt = this.alterEditionStatement()
        } else if (this.peekIf(Keyword.FUNCTION)) {
          this.pos = mark
          stmt = this.alterFunctionStatement()
        } else if (this.peekIf(Keyword.HIERARCHY)) {
          this.pos = mark
          stmt = this.alterHierarchyStatement()
        } else if (this.peekIf(Keyword.INDEX)) {
          this.pos = mark
          stmt = this.alterIndexStatement()
        } else if (this.peekIf(Keyword.INDEXTYPE)) {
          this.pos = mark
          stmt = this.alterIndextypeStatement()
        } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          this.pos = mark
          stmt = this.alterInmemoryJoinGroupStatement()
        } else if (this.peekIf(Keyword.JAVA)) {
          this.pos = mark
          stmt = this.alterJavaStatement()
        } else if (this.peekIf(Keyword.LIBRARY)) {
          this.pos = mark
          stmt = this.alterLibraryStatement()
        } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.alterLockdownProfileStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          this.pos = mark
          stmt = this.alterMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          this.pos = mark
          stmt = this.alterMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.alterMaterializedViewStatement()
        } else if (this.peekIf(Keyword.OPERATOR)) {
          this.pos = mark
          stmt = this.alterOperatorStatement()
        } else if (this.peekIf(Keyword.OUTLINE)) {
          this.pos = mark
          stmt = this.alterOutlineStatement()
        } else if (this.peekIf(Keyword.PACKAGE)) {
          this.pos = mark
          stmt = this.alterPackageStatement()
        } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.alterPluggableDatabaseStatement()
        } else if (this.peekIf(Keyword.PROCEDURE)) {
          this.pos = mark
          stmt = this.alterProcedureStatement()
        } else if (this.peekIf(Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.alterProfileStatement()
        } else if (this.peekIf(Keyword.RESOURCE, Keyword.COST)) {
          this.pos = mark
          stmt = this.alterResourceCostStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.alterRoleStatement()
        } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          this.pos = mark
          stmt = this.alterRollbackSegmentStatement()
        } else if (this.peekIf(Keyword.SEQUENCE)) {
          this.pos = mark
          stmt = this.alterSequenceStatement()
        } else if (this.peekIf(Keyword.SESSION)) {
          this.pos = mark
          stmt = this.alterSessionStatement()
        } else if (this.peekIf(Keyword.SYNONYM)) {
          this.pos = mark
          stmt = this.alterSynonymStatement()
        } else if (this.peekIf(Keyword.SYSTEM)) {
          this.pos = mark
          stmt = this.alterSystemStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.alterTableStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.alterTablespaceSetStatement()
        } else if (this.peekIf(Keyword.TABLESPACE)) {
          this.pos = mark
          stmt = this.alterTablespaceStatement()  
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.alterTriggerStatement()
        } else if (this.peekIf(Keyword.TYPE, Keyword.BODY)) {
          this.pos = mark
          stmt = this.alterTypeBodyStatement()
        } else if (this.peekIf(Keyword.TYPE)) {
          this.pos = mark
          stmt = this.alterTypeStatement()
        } else if (this.peekIf(Keyword.USER)) {
          this.pos = mark
          stmt = this.alterUserStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.alterViewStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.DROP)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.PUBLIC)) {
          this.consume()
        }

        if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropAnalyticViewStatement()
        } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.dropAttributeDimensionStatement()
        } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
          this.pos = mark
          stmt = this.dropAuditPolicyStatement()
        } else if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.dropClusterStatement()
        } else if (this.peekIf(Keyword.CONTEXT)) {
          this.pos = mark
          stmt = this.dropContextStatement()
        } else if (this.peekIf(Keyword.DATABASE, Keyword.LINK)) {
          this.pos = mark
          stmt = this.dropDatabaseLinkStatement()  
        } else if (this.peekIf(Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.dropDatabaseStatement()  
        } else if (this.peekIf(Keyword.DIMENSION)) {
          this.pos = mark
          stmt = this.dropDimensionStatement()
        } else if (this.peekIf(Keyword.DIRECTORY)) {
          this.pos = mark
          stmt = this.dropDirectoryStatement()
        } else if (this.peekIf(Keyword.DISKGROUP)) {
          this.pos = mark
          stmt = this.dropDiskgroupStatement()
        } else if (this.peekIf(Keyword.EDITION)) {
          this.pos = mark
          stmt = this.dropEditionStatement()
        } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
          this.pos = mark
          stmt = this.dropEditionStatement()
        } else if (this.peekIf(Keyword.FUNCTION)) {
          this.pos = mark
          stmt = this.dropFunctionStatement()
        } else if (this.peekIf(Keyword.HIERARCHY)) {
          this.pos = mark
          stmt = this.dropHierarchyStatement()
        } else if (this.peekIf(Keyword.INDEX)) {
          this.pos = mark
          stmt = this.dropIndexStatement()
        } else if (this.peekIf(Keyword.INDEXTYPE)) {
          this.pos = mark
          stmt = this.dropIndextypeStatement()
        } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
          this.pos = mark
          stmt = this.dropInmemoryJoinGroupStatement()
        } else if (this.peekIf(Keyword.JAVA)) {
          this.pos = mark
          stmt = this.dropJavaStatement()
        } else if (this.peekIf(Keyword.LIBRARY)) {
          this.pos = mark
          stmt = this.dropLibraryStatement()
        } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.dropLockdownProfileStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)) {
          this.pos = mark
          stmt = this.dropMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW, Keyword.ZONEMAP)) {
          this.pos = mark
          stmt = this.dropMaterializedViewLogStatement()
        } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropMaterializedViewStatement()
        } else if (this.peekIf(Keyword.OPERATOR)) {
          this.pos = mark
          stmt = this.dropOperatorStatement()
        } else if (this.peekIf(Keyword.OUTLINE)) {
          this.pos = mark
          stmt = this.dropOutlineStatement()
        } else if (this.peekIf(Keyword.PACKAGE)) {
          this.pos = mark
          stmt = this.dropPackageStatement()
        } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
          this.pos = mark
          stmt = this.dropPluggableDatabaseStatement()
        } else if (this.peekIf(Keyword.PROCEDURE)) {
          this.pos = mark
          stmt = this.dropProcedureStatement()
        } else if (this.peekIf(Keyword.PROFILE)) {
          this.pos = mark
          stmt = this.dropProfileStatement()
        } else if (this.peekIf(Keyword.RESTORE, Keyword.POINT)) {
          this.pos = mark
          stmt = this.dropRestorePointStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.dropRoleStatement()
        } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
          this.pos = mark
          stmt = this.dropRollbackSegmentStatement()
        } else if (this.peekIf(Keyword.SCHEMA)) {
          this.pos = mark
          stmt = this.dropSchemaStatement()
        } else if (this.peekIf(Keyword.SEQUENCE)) {
          this.pos = mark
          stmt = this.dropSequenceStatement()
        } else if (this.peekIf(Keyword.SYNONYM)) {
          this.pos = mark
          stmt = this.dropSynonymStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.dropTableStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.dropTablespaceSetStatement()
        } else if (this.peekIf(Keyword.TABLESPACE, Keyword.SET)) {
          this.pos = mark
          stmt = this.dropTablespaceStatement()  
        } else if (this.peekIf(Keyword.TRIGGER)) {
          this.pos = mark
          stmt = this.dropTriggerStatement()
        } else if (this.peekIf(Keyword.TYPE, Keyword.BODY)) {
          this.pos = mark
          stmt = this.dropTypeBodyStatement()
        } else if (this.peekIf(Keyword.TYPE)) {
          this.pos = mark
          stmt = this.dropTypeStatement()
        } else if (this.peekIf(Keyword.USER)) {
          this.pos = mark
          stmt = this.dropUserStatement()
        } else if (this.peekIf(Keyword.VIEW)) {
          this.pos = mark
          stmt = this.dropViewStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.TRUNCATE)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.truncateClusterStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.truncateTableStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.SET)) {
        const mark = this.pos
        this.consume()

        if (this.peekIf(Keyword.CONSTRAINT) || this.peekIf(Keyword.CONSTRAINTS)) {
          this.pos = mark
          stmt = this.setConstraintStatement()
        } else if (this.peekIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.setRoleStatement()
        } else if (this.peekIf(Keyword.TRANSACTION)) {
          this.pos = mark
          stmt = this.setTransactionStatement()
        } else {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ADMINISTER, Keyword.KEY, Keyword.MANAGEMENT)) {
        stmt = this.administerKeyManagementStatement()
      } else if (this.peekIf(Keyword.ANALYZE)) {
        stmt = this.analyzeStatement()
      } else if (this.peekIf(Keyword.ASSOCIATE, Keyword.STATISTICS)) {
        stmt = this.associateStatisticsStatement()
      } else if (this.peekIf(Keyword.AUDIT)) {
        stmt = this.auditStatement()
      } else if (this.peekIf(Keyword.CALL)) {
        stmt = this.callStatement()
      } else if (this.peekIf(Keyword.COMMENT)) {
        stmt = this.commentStatement()
      } else if (this.peekIf(Keyword.COMMIT)) {
        stmt = this.commitStatement()
      } else if (this.peekIf(Keyword.DISASSOCIATE, Keyword.STATISTICS)) {
        stmt = this.disassociateStatisticsStatement()
      } else if (this.peekIf(Keyword.FLASHBACK, Keyword.DATABASE)) {
        stmt = this.flashbackDatabaseStatement()
      } else if (this.peekIf(Keyword.FLASHBACK, Keyword.TABLE)) {
        stmt = this.flashbackTableStatement()
      } else if (this.peekIf(Keyword.GRANT)) {
        stmt = this.grantStatement()
      } else if (this.peekIf(Keyword.LOCK, Keyword.TABLE)) {
        stmt = this.lockTableStatement()
      } else if (this.peekIf(Keyword.NOAUDIT)) {
        stmt = this.noauditStatement()
      } else if (this.peekIf(Keyword.PURGE)) {
        stmt = this.purgeStatement()
      } else if (this.peekIf(Keyword.RENAME)) {
        stmt = this.renameStatement()
      } else if (this.peekIf(Keyword.REVOKE)) {
        stmt = this.revokeStatement()
      } else if (this.peekIf(Keyword.ROLLBACK)) {
        stmt = this.rollbackStatement()
      } else if (this.peekIf(Keyword.SAVEPOINT)) {
        stmt = this.savepointStatement()
      } else if (this.peekIf(Keyword.DECLARE)) {
        stmt = this.declareBlock()
      } else if (this.peekIf(Keyword.BEGIN)) {
        stmt = this.beginBlock()
      } else {
        let withNode
        if (this.peekIf(Keyword.WITH)) {
          withNode = this.withClause()
        }
        if (this.peekIf(Keyword.INSERT)) {
          stmt = this.insertClause(withNode)
        } else if (this.peekIf(Keyword.UPDATE)) {
          stmt = this.updateClause(withNode)
        } else if (this.peekIf(Keyword.DELETE)) {
          stmt = this.deleteClause(withNode)
        } else if (this.peekIf(Keyword.MERGE)) {
          stmt = this.mergeClause(withNode)
        } else if (this.peekIf(Keyword.SELECT)) {
          stmt = this.selectClause(withNode)
        }
      }

      if (!stmt) {
        throw this.createParseError()
      }

      if (explainPlan) {
        stmt = explainPlan.add(stmt)
      }

      if (this.peekIf(TokenType.SemiColon)) {
        stmt.add(this.consume())
      }
      if (this.peekIf(TokenType.Delimiter)) {
        stmt.add(this.consume())
      }
      if (this.peekIf(TokenType.Eof)) {
        stmt.add(this.consume())
      }
  
      return stmt
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (this.token()
          && !(!isBlock && this.peekIf(TokenType.SemiColon))
          && !this.peekIf(TokenType.Delimiter)
        ) {
          stmt.add(this.consume())
        }
        err.node = stmt
      }      
      throw err
    }
  }

  private createAnalyticViewStatement() {
    const node = new Node("create analytic view")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ANALYTIC))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createAttributeDimensionStatement() {
    const node = new Node("create attribute dimension")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ATTRIBUTE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createAuditPolicyStatement() {
    const node = new Node("create audit policy")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.AUDIT))
    node.add(this.consume(Keyword.POLICY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createClusterStatement() {
    const node = new Node("create cluster")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createContextStatement() {
    const node = new Node("create context")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.CONTEXT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createControlfileStatement() {
    const node = new Node("create controlfile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.CONTROLFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDatabaseLinkStatement() {
    const node = new Node("create database link")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.LINK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDatabaseStatement() {
    const node = new Node("create database")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDimensionStatement() {
    const node = new Node("create dimension")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDirectoryStatement() {
    const node = new Node("create directory")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DIRECTORY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createDiskgroupStatement() {
    const node = new Node("create diskgroup")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.DISKGROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createEditionStatement() {
    const node = new Node("create edition")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.EDITION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createFunctionStatement() {
    const node = new Node("create function")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.FUNCTION))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createHierarchyStatement() {
    const node = new Node("create hierarchy")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.HIERARCHY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createIndexStatement() {
    const node = new Node("create index")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.INDEX))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createIndextypeStatement() {
    const node = new Node("create indextype")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.INDEXTYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createInmemoryJoinGroupStatement() {
    const node = new Node("create inmemory join group")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.INMEMORY))
    node.add(this.consume(Keyword.JOIN))
    node.add(this.consume(Keyword.GROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createJavaStatement() {
    const node = new Node("create java")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.JAVA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createLibraryStatement() {
    const node = new Node("create library")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.LIBRARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createLockdownProfileStatement() {
    const node = new Node("create lockdown profile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.LOCKDOWN))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createMaterializedViewLogStatement() {
    const node = new Node("create materialized view log")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))
    node.add(this.consume(Keyword.LOG))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createMaterializedViewStatement() {
    const node = new Node("create materialized view")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createOperatorStatement() {
    const node = new Node("create operator")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.OPERATOR))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createOutlineStatement() {
    const node = new Node("create outline")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.OUTLINE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPackageBodyStatement() {
    const node = new Node("create package body")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PACKAGE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPackageStatement() {
    const node = new Node("create package")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PACKAGE))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPfileStatement() {
    const node = new Node("create pfile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createPluggableDatabaseStatement() {
    const node = new Node("create pluggable database")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PLUGGABLE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createProcedureStatement() {
    const node = new Node("create procedure")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PROCEDURE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createProfileStatement() {
    const node = new Node("create profile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createRestorePointStatement() {
    const node = new Node("create restore point")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.RESTORE))
    node.add(this.consume(Keyword.POINT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createRoleStatement() {
    const node = new Node("create role")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }
  
  private createRollbackSegmentStatement() {
    const node = new Node("create rollback segment")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.ROLLBACK))
    node.add(this.consume(Keyword.SEGMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSchemaStatement() {
    const node = new Node("create schema")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SCHEMA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSequenceStatement() {
    const node = new Node("create sequence")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SEQUENCE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSpfileStatement() {
    const node = new Node("create spfile")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SPFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createSynonymStatement() {
    const node = new Node("create synonym")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.SYNONYM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTableStatement() {
    const node = new Node("create table")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTablespaceSetStatement() {
    const node = new Node("create tablespace set")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TABLESPACE))
    node.add(this.consume(Keyword.SET))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTablespaceStatement() {
    const node = new Node("create tablespace")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TABLESPACE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTriggerStatement() {
    const node = new Node("create trigger")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TRIGGER))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTypeBodyStatement() {
    const node = new Node("create type body")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TYPE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createTypeStatement() {
    const node = new Node("create type")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.TYPE))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createUserStatement() {
    const node = new Node("create user")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.USER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private createViewStatement() {
    const node = new Node("create view")
    node.add(this.consume(Keyword.CREATE))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterAnalyticViewStatement() {
    const node = new Node("alter analytic view")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ANALYTIC))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterAttributeDimensionStatement() {
    const node = new Node("alter attribute dimension")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ATTRIBUTE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterAuditPolicyStatement() {
    const node = new Node("alter audit policy")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.AUDIT))
    node.add(this.consume(Keyword.POLICY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterClusterStatement() {
    const node = new Node("alter cluster")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDatabaseDictionaryStatement() {
    const node = new Node("alter database dictionary")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.DICTIONARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDatabaseLinkStatement() {
    const node = new Node("alter database link")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.LINK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDatabaseStatement() {
    const node = new Node("alter database")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDimensionStatement() {
    const node = new Node("alter dimension")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterDiskgroupStatement() {
    const node = new Node("alter diskgroup")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.DISKGROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterEditionStatement() {
    const node = new Node("alter edition")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.EDITION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterFunctionStatement() {
    const node = new Node("alter function")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.FUNCTION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterHierarchyStatement() {
    const node = new Node("alter hierarchy")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.HIERARCHY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterIndexStatement() {
    const node = new Node("alter index")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.INDEX))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterIndextypeStatement() {
    const node = new Node("alter indextype")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.INDEXTYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterInmemoryJoinGroupStatement() {
    const node = new Node("alter inmemory join group")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.INMEMORY))
    node.add(this.consume(Keyword.JOIN))
    node.add(this.consume(Keyword.GROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterJavaStatement() {
    const node = new Node("alter java")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.JAVA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterLibraryStatement() {
    const node = new Node("alter library")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.LIBRARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterLockdownProfileStatement() {
    const node = new Node("alter lockdown profile")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.LOCKDOWN))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterMaterializedViewLogStatement() {
    const node = new Node("alter materialized view log")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))
    node.add(this.consume(Keyword.LOG))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterMaterializedViewStatement() {
    const node = new Node("alter materialized view")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterOperatorStatement() {
    const node = new Node("alter operator")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.OPERATOR))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterOutlineStatement() {
    const node = new Node("alter outline")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.OUTLINE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterPackageStatement() {
    const node = new Node("alter package")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PACKAGE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterPluggableDatabaseStatement() {
    const node = new Node("alter pluggable database")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PLUGGABLE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterProcedureStatement() {
    const node = new Node("alter procedure")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PROCEDURE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterProfileStatement() {
    const node = new Node("alter profile")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterResourceCostStatement() {
    const node = new Node("alter resource cost")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.RESOURCE))
    node.add(this.consume(Keyword.COST))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterRoleStatement() {
    const node = new Node("alter role")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }
  
  private alterRollbackSegmentStatement() {
    const node = new Node("alter rollback segment")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.ROLLBACK))
    node.add(this.consume(Keyword.SEGMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSequenceStatement() {
    const node = new Node("alter sequence")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SEQUENCE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSessionStatement() {
    const node = new Node("alter session")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SESSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSynonymStatement() {
    const node = new Node("alter synonym")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SYNONYM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterSystemStatement() {
    const node = new Node("alter system")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.SYSTEM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTableStatement() {
    const node = new Node("alter table")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTablespaceSetStatement() {
    const node = new Node("alter tablespace set")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLESPACE))
    node.add(this.consume(Keyword.SET))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTablespaceStatement() {
    const node = new Node("alter tablespace")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TABLESPACE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTriggerStatement() {
    const node = new Node("alter trigger")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TRIGGER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTypeBodyStatement() {
    const node = new Node("alter type body")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TYPE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterTypeStatement() {
    const node = new Node("alter type")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.TYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterUserStatement() {
    const node = new Node("alter user")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.USER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private alterViewStatement() {
    const node = new Node("alter view")
    node.add(this.consume(Keyword.ALTER))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropAnalyticViewStatement() {
    const node = new Node("drop analytic view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ANALYTIC))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropAttributeDimensionStatement() {
    const node = new Node("drop attribute dimension")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ATTRIBUTE))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropAuditPolicyStatement() {
    const node = new Node("drop audit policy")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.AUDIT))
    node.add(this.consume(Keyword.POLICY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropClusterStatement() {
    const node = new Node("drop cluster")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropContextStatement() {
    const node = new Node("drop context")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.CONTEXT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDatabaseLinkStatement() {
    const node = new Node("drop database link")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DATABASE))
    node.add(this.consume(Keyword.LINK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDatabaseStatement() {
    const node = new Node("drop database")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDimensionStatement() {
    const node = new Node("drop dimension")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DIMENSION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDirectoryStatement() {
    const node = new Node("drop directory")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DIRECTORY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropDiskgroupStatement() {
    const node = new Node("drop diskgroup")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.DISKGROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropEditionStatement() {
    const node = new Node("drop edition")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.EDITION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropFunctionStatement() {
    const node = new Node("drop function")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.FUNCTION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropHierarchyStatement() {
    const node = new Node("drop hierarchy")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.HIERARCHY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropIndexStatement() {
    const node = new Node("drop index")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INDEX))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropIndextypeStatement() {
    const node = new Node("drop indextype")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INDEXTYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropInmemoryJoinGroupStatement() {
    const node = new Node("drop inmemory join group")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.INMEMORY))
    node.add(this.consume(Keyword.JOIN))
    node.add(this.consume(Keyword.GROUP))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropJavaStatement() {
    const node = new Node("drop java")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.JAVA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropLibraryStatement() {
    const node = new Node("drop library")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.LIBRARY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropLockdownProfileStatement() {
    const node = new Node("drop lockdown profile")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.LOCKDOWN))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropMaterializedViewLogStatement() {
    const node = new Node("drop materialized view log")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))
    node.add(this.consume(Keyword.LOG))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropMaterializedViewStatement() {
    const node = new Node("drop materialized view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.MATERIALIZED))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropOperatorStatement() {
    const node = new Node("drop operator")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.OPERATOR))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropOutlineStatement() {
    const node = new Node("drop outline")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.OUTLINE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropPackageStatement() {
    const node = new Node("drop package")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PACKAGE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropPluggableDatabaseStatement() {
    const node = new Node("drop pluggable database")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PLUGGABLE))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropProcedureStatement() {
    const node = new Node("drop procedure")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PROCEDURE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropProfileStatement() {
    const node = new Node("drop profile")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.PROFILE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropRestorePointStatement() {
    const node = new Node("drop restore point")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.RESTORE))
    node.add(this.consume(Keyword.POINT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropRoleStatement() {
    const node = new Node("drop role")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }
  
  private dropRollbackSegmentStatement() {
    const node = new Node("drop rollback segment")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.ROLLBACK))
    node.add(this.consume(Keyword.SEGMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropSchemaStatement() {
    const node = new Node("drop schema")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.SCHEMA))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropSequenceStatement() {
    const node = new Node("drop sequence")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.SEQUENCE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropSynonymStatement() {
    const node = new Node("drop synonym")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.SYNONYM))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTableStatement() {
    const node = new Node("drop table")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTablespaceSetStatement() {
    const node = new Node("drop tablespace set")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLESPACE))
    node.add(this.consume(Keyword.SET))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTablespaceStatement() {
    const node = new Node("drop tablespace")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TABLESPACE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTriggerStatement() {
    const node = new Node("drop trigger")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TRIGGER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTypeBodyStatement() {
    const node = new Node("drop type body")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TYPE))
    node.add(this.consume(Keyword.BODY))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropTypeStatement() {
    const node = new Node("drop type")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.TYPE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropUserStatement() {
    const node = new Node("drop user")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.USER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private dropViewStatement() {
    const node = new Node("drop view")
    node.add(this.consume(Keyword.DROP))
    node.add(this.consume(Keyword.VIEW))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private truncateClusterStatement() {
    const node = new Node("truncate cluster")
    node.add(this.consume(Keyword.TRUNCATE))
    node.add(this.consume(Keyword.CLUSTER))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private truncateTableStatement() {
    const node = new Node("truncate table")
    node.add(this.consume(Keyword.TRUNCATE))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private setConstraintStatement() {
    const node = new Node("set constraint")
    node.add(this.consume(Keyword.SET))

    if (this.peekIf(Keyword.CONSTRAINTS)) {
      node.add(this.consume())
    } else {
      node.add(this.consume(Keyword.CONSTRAINT))
    }

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }
    return node
  }

  private setRoleStatement() {
    const node = new Node("set role")
    node.add(this.consume(Keyword.SET))
    node.add(this.consume(Keyword.ROLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private setTransactionStatement() {
    const node = new Node("set transaction")
    node.add(this.consume(Keyword.SET))
    node.add(this.consume(Keyword.TRANSACTION))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private administerKeyManagementStatement() {
    const node = new Node("administer key management")
    node.add(this.consume(Keyword.ADMINISTER))
    node.add(this.consume(Keyword.KEY))
    node.add(this.consume(Keyword.MANAGEMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private analyzeStatement() {
    const node = new Node("analyze")
    node.add(this.consume(Keyword.ANALYZE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private associateStatisticsStatement() {
    const node = new Node("associate statistics")
    node.add(this.consume(Keyword.ASSOCIATE))
    node.add(this.consume(Keyword.STATISTICS))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private auditStatement() {
    const node = new Node("audit")
    node.add(this.consume(Keyword.AUDIT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private callStatement() {
    const node = new Node("call")
    node.add(this.consume(Keyword.CALL))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private commentStatement() {
    const node = new Node("comment")
    node.add(this.consume(Keyword.COMMENT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private commitStatement() {
    const node = new Node("commit")
    node.add(this.consume(Keyword.COMMIT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private disassociateStatisticsStatement() {
    const node = new Node("disassociate statistics")
    node.add(this.consume(Keyword.DISASSOCIATE))
    node.add(this.consume(Keyword.STATISTICS))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private flashbackDatabaseStatement() {
    const node = new Node("flashback database")
    node.add(this.consume(Keyword.FLASHBACK))
    node.add(this.consume(Keyword.DATABASE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private flashbackTableStatement() {
    const node = new Node("flashback table")
    node.add(this.consume(Keyword.FLASHBACK))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private grantStatement() {
    const node = new Node("grant")
    node.add(this.consume(Keyword.GRANT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private lockTableStatement() {
    const node = new Node("lock table")
    node.add(this.consume(Keyword.LOCK))
    node.add(this.consume(Keyword.TABLE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private noauditStatement() {
    const node = new Node("noaudit")
    node.add(this.consume(Keyword.NOAUDIT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private purgeStatement() {
    const node = new Node("purge")
    node.add(this.consume(Keyword.PURGE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private renameStatement() {
    const node = new Node("rename")
    node.add(this.consume(Keyword.RENAME))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private revokeStatement() {
    const node = new Node("revoke")
    node.add(this.consume(Keyword.REVOKE))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private rollbackStatement() {
    const node = new Node("rollback")
    node.add(this.consume(Keyword.ROLLBACK))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private savepointStatement() {
    const node = new Node("savepoint")
    node.add(this.consume(Keyword.SAVEPOINT))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private declareBlock() {
    const node = new Node("block")

    const declareNode = new Node("declare")
    declareNode.add(this.consume(Keyword.DECLARE))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
        if (this.peekIf(Keyword.EXCEPTION)) {
          node.add(this.exceptionBlock())
        }
        break
      } else if (this.peekIf(Keyword.PROCEDURE)) {
        declareNode.add(this.procedureBlock())
      } else if (this.peekIf(Keyword.FUNCTION)) {
        declareNode.add(this.functionBlock())
      } else {
        declareNode.add(this.token(-1))
      }
    }

    return node
  }

  private beginBlock() {
    const node = new Node("begin")
    node.add(this.consume(Keyword.BEGIN))

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else if (this.peekIf(Keyword.DECLARE)) {
        node.add(this.declareBlock())
      } else if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
      } else if (this.peekIf(Keyword.EXCEPTION)) {
        break
      } else {
        node.add(this.consume())
      }
    }

    return node
  }

  private procedureBlock() {
    const node = new Node("nested_procedure")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private functionBlock() {
    const node = new Node("nested_function")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private exceptionBlock() {
    const node = new Node("exception")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.END)) {
        node.add(this.consume())
        node.add(this.consume(TokenType.SemiColon))
        break
      } else {
        node.add(this.consume())
      }
    }
    return node
  }

  private insertClause(withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.INSERT))
    node.add(this.consume(Keyword.INTO))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private updateClause(withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.UPDATE))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private deleteClause(withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.DELETE))
    node.add(this.consume(Keyword.FROM))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private mergeClause(withNode?: Node) {
    const node = new Node("merge")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.MERGE))
    node.add(this.consume(Keyword.INTO))
    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      node.add(this.consume())
    }

    return node
  }

  private selectClause(withNode?: Node) {
    const node = new Node("select")
    if (withNode) {
      node.add(withNode)
    }
    node.add(this.consume(Keyword.SELECT))

    let depth = 0
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
      && (depth == 0 && !this.peekIf(TokenType.RightParen))
    ) {
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        depth++
      } else if (this.peekIf(TokenType.RightParen)) {
        node.add(this.consume())
        depth--
      } else {
        node.add(this.consume())
      }
    }

    return node
  }

  private withClause() {
    const node = new Node("with")
    node.add(this.consume(Keyword.WITH))

    while (this.token()) {
      node.add(this.identifier("name"))
      if (this.peekIf(TokenType.LeftParen)) {
        node.add(this.consume())
        while (this.token()) {
          node.add(this.identifier("column"))

          if (this.peekIf(TokenType.Comma)) {
            node.add(this.consume())
          } else {
            break
          }
        }
        node.add(this.consume(TokenType.RightParen))
      }

      node.add(this.consume(Keyword.AS))
      node.add(this.consume(TokenType.LeftParen))
      node.add(this.selectClause())
      node.add(this.consume(TokenType.RightParen))

      if (this.peekIf(TokenType.Comma)) {
        node.add(this.consume())
      } else {
        break
      }
    }
    return node
  }

  private parseName(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.peekIf(TokenType.Dot)) {
      stmt.add(this.consume())
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
    if (this.peekIf(Keyword.OPE_AT)) {
      stmt.add(this.consume())
      stmt.add(this.identifier("dblink"))
    }
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.peekIf(TokenType.QuotedIdentifier)) {
      node.add(this.consume())
      node.value = dequote(this.token(-1).text)
    } else if (this.peekIf(TokenType.Identifier)) {
      node.add(this.consume())
      node.value = this.token(-1).text
    } else {
      throw this.createParseError()
    }
    return node
  }
}
