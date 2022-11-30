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
  Segment,
  SplitFunction,
} from "../parser"
import { dequote } from "../util"

const KeywordMap = new Map<string, Keyword>()
export class Keyword extends TokenType {
  static ABORT = new Keyword("ABORT")
  static ACCESS = new Keyword("ACCESS", { reserved: true })
  static ACCESSED = new Keyword("ACCESSED")
  static ACCOUNT = new Keyword("ACCOUNT")
  static ACTIONS = new Keyword("ACTIONS")
  static ACTIVE = new Keyword("ACTIVE")
  static ADD = new Keyword("ADD", { reserved: true })
  static ADMIN = new Keyword("ADMIN")
  static ADMINISTER = new Keyword("ADMINISTER")
  static ADVANCED = new Keyword("ADVANCED")
  static ADVISE = new Keyword("ADVISE")
  static AFFINITY = new Keyword("AFFINITY")
  static AFTER = new Keyword("AFTER")
  static AGGREGATE = new Keyword("AGGREGATE")
  static ALGORITHM = new Keyword("ALGORITHM")
  static ALIAS = new Keyword("ALIAS")
  static ALL = new Keyword("ALL", { reserved: true })
  static ALTER = new Keyword("ALTER", { reserved: true })
  static ALTERNATE = new Keyword("ALTERNATE")
  static ANALYTIC = new Keyword("ANALYTIC")
  static ANCILLARY = new Keyword("ANCILLARY")
  static ANYSCHEMA = new Keyword("ANYSCHEMA")
  static ALLOW = new Keyword("ALLOW")
  static ALLOCATE = new Keyword("ALLOCATE")
  static ALWAYS = new Keyword("ALWAYS")
  static ANALYZE = new Keyword("ANALYZE")
  static AND = new Keyword("AND", { reserved: true })
  static ANY = new Keyword("ANY", { reserved: true })
  static APPICATION = new Keyword("APPICATION")
  static APPLY = new Keyword("APPLY")
  static ARCHIVAL = new Keyword("ARCHIVAL")
  static ARCHIVE = new Keyword("ARCHIVE")
  static ARCHIVED = new Keyword("ARCHIVED")
  static ARCHIVELOG = new Keyword("ARCHIVELOG")
  static ARRAY = new Keyword("ARRAY")
  static AS = new Keyword("AS", { reserved: true })
  static ASC = new Keyword("ASC", { reserved: true })
  static ASSOCIATE = new Keyword("ASSOCIATE")
  static ASYNCHRONOUS = new Keyword("ASYNCHRONOUS")
  static AT = new Keyword("AT", { reserved: true })
  static ATTRIBUTE = new Keyword("ATTRIBUTE")
  static ATTRIBUTES = new Keyword("ATTRIBUTES")
  static AUDIT = new Keyword("AUDIT", { reserved: true })
  static AUTHENTICATED = new Keyword("AUTHENTICATED")
  static AUTHENTICATION = new Keyword("AUTHENTICATION")
  static AUTHID = new Keyword("AUTHID")
  static AUTO = new Keyword("AUTO")
  static AUTO_LOGIN = new Keyword("AUTO_LOGIN")
  static AUTOALLOCATE = new Keyword("AUTOALLOCATE")
  static AUTOEXTEND = new Keyword("AUTOEXTEND")
  static AUTOMATIC = new Keyword("AUTOMATIC")
  static AVAILABILITY = new Keyword("AVAILABILITY")
  static AZURE_ROLE = new Keyword("AZURE_ROLE")
  static AZURE_USER = new Keyword("AZURE_USER")
  static BACKUP = new Keyword("BACKUP")
  static BASICFILE = new Keyword("BASICFILE")
  static BADFILE = new Keyword("BADFILE")
  static BATCH = new Keyword("BATCH")
  static BEFORE = new Keyword("BEFORE")
  static BEGIN = new Keyword("BEGIN", { reserved: true })
  static BEGINNING = new Keyword("BEGINNING")
  static BEQUEATH = new Keyword("BEQUEATH")
  static BETWEEN = new Keyword("BETWEEN", { reserved: true })
  static BFILE = new Keyword("BFILE")
  static BIGFILE = new Keyword("BIGFILE")
  static BINDING = new Keyword("BINDING")
  static BITMAP = new Keyword("BITMAP")
  static BLOB = new Keyword("BLOB")
  static BLOCK = new Keyword("BLOCK")
  static BLOCKCHAIN = new Keyword("BLOCKCHAIN")
  static BLOCKSIZE = new Keyword("BLOCKSIZE")
  static BODY = new Keyword("BODY")
  static BOTH = new Keyword("BOTH")
  static BREADTH = new Keyword("BREADTH")
  static BUFFER_CACHE = new Keyword("BUFFER_CACHE")
  static BY = new Keyword("BY", { reserved: true })
  static CACHE = new Keyword("CACHE")
  static CACHING = new Keyword("CACHING")
  static CAPTION = new Keyword("CAPTION")
  static CASE = new Keyword("CASE", { reserved: true })
  static CALL = new Keyword("CALL")
  static CANCEL = new Keyword("CANCEL")
  static CAPACITY = new Keyword("CAPACITY")
  static CASCADE = new Keyword("CASCADE")
  static CATEGORY = new Keyword("CATEGORY")
  static CHAR = new Keyword("CHAR", { reserved: true })
  static CHARACTER = new Keyword("CHARACTER")
  static CHANGE = new Keyword("CHANGE")
  static CHECK = new Keyword("CHECK", { reserved: true })
  static CHAINED = new Keyword("CHAINED")
  static CHECKPOINT = new Keyword("CHECKPOINT")
  static CHILD = new Keyword("CHILD")
  static CHUNK = new Keyword("CHUNK")
  static CLASS = new Keyword("CLASS")
  static CLASSIFIER = new Keyword("CLASSIFIER")
  static CLASSIFICATION = new Keyword("CLASSIFICATION")
  static CLAUSE = new Keyword("CLAUSE")
  static CLIENT = new Keyword("CLIENT")
  static CLOB = new Keyword("CLOB")
  static CLONE = new Keyword("CLONE")
  static CLOSE = new Keyword("CLOSE")
  static CLUSTER = new Keyword("CLUSTER", { reserved: true })
  static CLUSTERING = new Keyword("CLUSTERING")
  static CLUSTERS = new Keyword("CLUSTERS", { reserved: true })
  static CLEAR = new Keyword("CLEAR")
  static CLEAN = new Keyword("CLEAN")
  static CLEANUP = new Keyword("CLEANUP")
  static CLS = new Keyword("CLS")
  static CN = new Keyword("CN")
  static COARSE = new Keyword("COARSE")
  static COLAUTH = new Keyword("COLAUTH", { reserved: true })
  static COALESCE = new Keyword("COALESCE")
  static COLD = new Keyword("COLD")
  static COLLATION = new Keyword("COLLATION")
  static COLLATE = new Keyword("COLLATE")
  static COLUMN = new Keyword("COLUMN", { reserved: true })
  static COLUMNS = new Keyword("COLUMNS", { reserved: true })
  static COLUMN_VALUE = new Keyword("COLUMN_VALUE")
  static CORRUPTION = new Keyword("CORRUPTION")
  static COMMENT = new Keyword("COMMENT", { reserved: true })
  static COMMIT = new Keyword("COMMIT")
  static COMMITTED = new Keyword("COMMITTED")
  static COMPACT = new Keyword("COMPACT")
  static COMPATIBILITY = new Keyword("COMPATIBILITY")
  static COMPILE = new Keyword("COMPILE")
  static COMPLETE = new Keyword("COMPLETE")
  static COMPRESS = new Keyword("COMPRESS", { reserved: true })
  static COMPONENT = new Keyword("COMPONENT")
  static COMPOSITE_LIMIT = new Keyword("COMPOSITE_LIMIT")
  static COMPUTATION = new Keyword("COMPUTATION")
  static COMPUTE = new Keyword("COMPUTE")
  static CONFIRM = new Keyword("CONFIRM")
  static CONNECT = new Keyword("CONNECT", { reserved: true })
  static CONNECT_TIME = new Keyword("CONNECT_TIME")
  static CONSIDER = new Keyword("CONSIDER")
  static CONSTRAINT = new Keyword("CONSTRAINT")
  static CONSTRAINTS = new Keyword("CONSTRAINTS")
  static CONSISTENT = new Keyword("CONSISTENT")
  static CONTAINER = new Keyword("CONTAINER")
  static CONTAINER_DATA = new Keyword("CONTAINER_DATA")
  static CONTAINER_MAP = new Keyword("CONTAINER_MAP")
  static CONTAINERS = new Keyword("CONTAINERS")
  static CONTAINERS_DEFAULT = new Keyword("CONTAINERS_DEFAULT")
  static CONTINUE = new Keyword("CONTINUE")
  static CONTENTS = new Keyword("CONTENTS")
  static CONTEXT = new Keyword("CONTEXT")
  static CONTROLFILE = new Keyword("CONTROLFILE")
  static CONVERT = new Keyword("CONVERT")
  static COPY = new Keyword("COPY")
  static COST = new Keyword("COST")
  static CPU_PER_CALL = new Keyword("CPU_PER_CALL")
  static CPU_PER_SESSION = new Keyword("CPU_PER_SESSION")
  static CRASH = new Keyword("CRASH", { reserved: true })
  static CREATE = new Keyword("CREATE", { reserved: true })
  static CREATE_FILE_DEST = new Keyword("CREATE_FILE_DEST")
  static CREATION = new Keyword("CREATION")
  static CREDENTIALS = new Keyword("CREDENTIALS")
  static CRITICAL = new Keyword("CRITICAL")
  static CROSS = new Keyword("CROSS")
  static CURRENT = new Keyword("CURRENT", { reserved: true })
  static CURRENT_USER = new Keyword("CURRENT_USER")
  static CURSOR = new Keyword("CURSOR", { reserved: true })
  static CUVE = new Keyword("CUVE")
  static CYCLE = new Keyword("CYCLE")
  static DANGLING = new Keyword("DANGLING")
  static DATA = new Keyword("DATA")
  static DATABASE = new Keyword("DATABASE")
  static DATAFILE = new Keyword("DATAFILE")
  static DATAFILES = new Keyword("DATAFILES")
  static DATAPUMP = new Keyword("DATAPUMP")
  static DATE = new Keyword("DATE", { reserved: true })
  static DAY = new Keyword("DAY")
  static DAYS = new Keyword("DAYS")
  static DBA_RECYCLEBIN = new Keyword("DBA_RECYCLEBIN")
  static DDL = new Keyword("DDL")
  static DEALLOCATE = new Keyword("DEALLOCATE")
  static DECIMAL = new Keyword("DECIMAL", { reserved: true })
  static DECLARE = new Keyword("DECLARE", { reserved: true })
  static DECREMENT = new Keyword("DECREMENT")
  static DECRYPT = new Keyword("DECRYPT")
  static DEDUPLICATE = new Keyword("DEDUPLICATE")
  static DEFAULT = new Keyword("DEFAULT", { reserved: true })
  static DEFAULT_CREDENTIAL = new Keyword("DEFAULT_CREDENTIAL")
  static DEFAULT_COLLATION = new Keyword("DEFAULT_COLLATION")
  static DEFERRED = new Keyword("DEFERRED")
  static DEFINITION = new Keyword("DEFINITION")
  static DEFINE = new Keyword("DEFINE")
  static DEFINER = new Keyword("DEFINER")
  static DELETE = new Keyword("DELETE", { reserved: true })
  static DELETE_ALL = new Keyword("DELETE_ALL")
  static DELIGATE = new Keyword("DELIGATE")
  static DEMAND = new Keyword("DEMAND")
  static DEPENDENT = new Keyword("DEPENDENT")
  static DEPTH = new Keyword("DEPTH")
  static DESC = new Keyword("DESC", { reserved: true })
  static DESCRIPTION = new Keyword("DESCRIPTION")
  static DETERMINES = new Keyword("DETERMINES")
  static DICTIONARY = new Keyword("DICTIONARY")
  static DIGEST = new Keyword("DIGEST")
  static DISCARDFILE = new Keyword("DISCARDFILE")
  static DISALLOW = new Keyword("DISALLOW")
  static DISASSOCIATE = new Keyword("DISASSOCIATE")
  static DISABLE = new Keyword("DISABLE")
  static DISABLE_ALL = new Keyword("DISABLE_ALL")
  static DISCARD = new Keyword("DISCARD")
  static DIMENSION = new Keyword("DIMENSION")
  static DIRECT_LOAD = new Keyword("DIRECT_LOAD")
  static DIRECT_PATH = new Keyword("DIRECT_PATH")
  static DIRECTORY = new Keyword("DIRECTORY")
  static DISCONNECT = new Keyword("DISCONNECT")
  static DISK = new Keyword("DISK")
  static DISKS = new Keyword("DISKS")
  static DISKGROUP = new Keyword("DISKGROUP")
  static DISMOUNT = new Keyword("DISMOUNT")
  static DISTINCT = new Keyword("DISTINCT", { reserved: true })
  static DISTRIBUTE = new Keyword("DISTRIBUTE")
  static DISTRIBUTED = new Keyword("DISTRIBUTED")
  static DML = new Keyword("DML")
  static DOWNGRADE = new Keyword("DOWNGRADE")
  static DROP = new Keyword("DROP", { reserved: true })
  static DUPLICATE = new Keyword("DUPLICATE")
  static DUPLICATED = new Keyword("DUPLICATED")
  static DV = new Keyword("DV")
  static E = new Keyword("E")
  static EDITION = new Keyword("EDITION")
  static EDITIONS = new Keyword("EDITIONS")
  static EDITIONABLE = new Keyword("EDITIONABLE")
  static EDITIONING = new Keyword("EDITIONING")
  static ELEMENT = new Keyword("ELEMENT")
  static ELSE = new Keyword("ELSE", { reserved: true })
  static ENABLE = new Keyword("ENABLE")
  static ENABLE_ALL = new Keyword("ENABLE_ALL")
  static ENCRYPT = new Keyword("ENCRYPT")
  static ENCRYPTION = new Keyword("ENCRYPTION")
  static END = new Keyword("END", { reserved: true })
  static ENFORCED = new Keyword("ENFORCED")
  static ENTERPRISE = new Keyword("ENTERPRISE")
  static ERRORS = new Keyword("ERRORS")
  static EXCEPT = new Keyword("EXCEPT")
  static EXCEPTION = new Keyword("EXCEPTION", { reserved: true })
  static EXCEPTIONS = new Keyword("EXCEPTIONS")
  static EXCHANGE = new Keyword("EXCHANGE")
  static EXCLUDE = new Keyword("EXCLUDE")
  static EXCLUSIVE = new Keyword("EXCLUSIVE", { reserved: true })
  static EXISTS = new Keyword("EXISTS", { reserved: true })
  static EXPIRE = new Keyword("EXPIRE")
  static EXPLAIN = new Keyword("EXPLAIN")
  static EXPORT = new Keyword("EXPORT")
  static EXTENDED = new Keyword("EXTENDED")
  static EXTENT = new Keyword("EXTENT")
  static EXTERNAL = new Keyword("EXTERNAL")
  static EXTERNALLY = new Keyword("EXTERNALLY")
  static EVALUATE = new Keyword("EVALUATE")
  static EVERY = new Keyword("EVERY")
  static FAILOVER = new Keyword("FAILOVER")
  static FAILED = new Keyword("FAILED")
  static FAILED_LOGIN_ATTEMPTS = new Keyword("FAILED_LOGIN_ATTEMPTS")
  static FAILGROUP = new Keyword("FAILGROUP")
  static FALSE = new Keyword("FALSE")
  static FACT = new Keyword("FACT")
  static FAR = new Keyword("FAR")
  static FAST = new Keyword("FAST")
  static FEATURE = new Keyword("FEATURE")
  static FETCH = new Keyword("FETCH", { reserved: true })
  static FIRST = new Keyword("FIRST")
  static FILE = new Keyword("FILE", { reserved: true })
  static FILE_NAME_CONVERT = new Keyword("FILE_NAME_CONVERT")
  static FILEGROUP = new Keyword("FILEGROUP")
  static FILESYSTEM_LIKE_LOGGING = new Keyword("FILESYSTEM_LIKE_LOGGING")
  static FILTER = new Keyword("FILTER")
  static FINAL = new Keyword("FINAL")
  static FINE = new Keyword("FINE")
  static FINISH = new Keyword("FINISH")
  static FLASH_CACHE = new Keyword("FLASH_CACHE")
  static FLASHBACK = new Keyword("FLASHBACK")
  static FLEX = new Keyword("FLEX")
  static FLOAT = new Keyword("FLOAT", { reserved: true })
  static FLUSH = new Keyword("FLUSH")
  static FOR = new Keyword("FOR", { reserved: true })
  static FORCE = new Keyword("FORCE")
  static FOREIGN = new Keyword("FOREIGN")
  static FRESH = new Keyword("FRESH")
  static FREEPOOLS = new Keyword("FREEPOOLS")
  static FROM = new Keyword("FROM", { reserved: true })
  static FUNCTION = new Keyword("FUNCTION", { reserved: true })
  static FUNCTIONS = new Keyword("FUNCTIONS")
  static FULL = new Keyword("FULL")
  static G = new Keyword("G")
  static GUARANTEE = new Keyword("GUARANTEE")
  static GENERATED = new Keyword("GENERATED")
  static GLOBAL = new Keyword("GLOBAL")
  static GLOBAL_NAME = new Keyword("GLOBAL_NAME")
  static GLOBAL_TOPIC_ENABLED = new Keyword("GLOBAL_TOPIC_ENABLED")
  static GLOBALLY = new Keyword("GLOBALLY")
  static GOTO = new Keyword("GOTO", { reserved: true })
  static GRANT = new Keyword("GRANT", { reserved: true })
  static GRANTED = new Keyword("GRANTED")
  static GROUP = new Keyword("GROUP", { reserved: true })
  static GROUPING = new Keyword("GROUPING")
  static GUARD = new Keyword("GUARD")
  static H = new Keyword("H")
  static HALF_YEARS = new Keyword("HALF_YEARS")
  static HASH = new Keyword("HASH")
  static HASHING = new Keyword("HASHING")
  static HASHKEYS = new Keyword("HASHKEYS")
  static HAVING = new Keyword("HAVING", { reserved: true })
  static HEAP = new Keyword("HEAP")
  static HIGH = new Keyword("HIGH")
  static HIER_ORDER = new Keyword("HIER_ORDER")
  static HIERARCHY = new Keyword("HIERARCHY")
  static HIERARCHIES = new Keyword("HIERARCHIES")
  static HOT = new Keyword("HOT")
  static HOST = new Keyword("HOST")
  static HOURS = new Keyword("HOURS")
  static HTTP = new Keyword("HTTP")
  static IAM_GROUP_NAME = new Keyword("IAM_GROUP_NAME")
  static IAM_PRINCIPAL_NAME = new Keyword("IAM_PRINCIPAL_NAME")
  static ID = new Keyword("ID")
  static IDLE_TIME = new Keyword("IDLE_TIME")
  static IDENTIFIED = new Keyword("IDENTIFIED", { reserved: true })
  static IDENTITY = new Keyword("IDENTITY")
  static IF = new Keyword("IF", { reserved: true })
  static IGNORE = new Keyword("IGNORE")
  static IMMEDIATE = new Keyword("IMMEDIATE", { reserved: true })
  static IMMUTABLE = new Keyword("IMMUTABLE")
  static IMPORT = new Keyword("IMPORT")
  static IN = new Keyword("IN", { reserved: true })
  static INACTIVE_ACCOUNT_TIME = new Keyword("INACTIVE_ACCOUNT_TIME")
  static INCREMENT = new Keyword("INCREMENT", { reserved: true })
  static INCLUDE = new Keyword("INCLUDE")
  static INCLUDING = new Keyword("INCLUDING")
  static INDEX = new Keyword("INDEX", { reserved: true })
  static INDEXES = new Keyword("INDEXES", { reserved: true })
  static INDEXING = new Keyword("INDEXING")
  static INDEXTYPE = new Keyword("INDEXTYPE")
  static INDEXTYPES = new Keyword("INDEXTYPES")
  static INDICATOR = new Keyword("INDICATOR")
  static INITIAL = new Keyword("INITIAL", { reserved: true })
  static INITIALIZED = new Keyword("INITIALIZED")
  static INITRANS = new Keyword("INITRANS")
  static INMEMORY = new Keyword("INMEMORY")
  static INNER = new Keyword("INNER")
  static INSERT = new Keyword("INSERT", { reserved: true })
  static INSTALL = new Keyword("INSTALL")
  static INSTANCE = new Keyword("INSTANCE")
  static INSTANCES = new Keyword("INSTANCES")
  static INTEGER = new Keyword("INTEGER", { reserved: true })
  static INTERLEAVED = new Keyword("INTERLEAVED")
  static INTERSECT = new Keyword("INTERSECT", { reserved: true })
  static INTERNAL = new Keyword("INTERNAL")
  static INTERVAL = new Keyword("INTERVAL")
  static INTO = new Keyword("INTO", { reserved: true })
  static INVALIDATION = new Keyword("INVALIDATION")
  static INVISIBLE = new Keyword("INVISIBLE")
  static IS = new Keyword("IS", { reserved: true })
  static IS_LEAF = new Keyword("IS_LEAF")
  static ISOLATE = new Keyword("ISOLATE")
  static ISOLATION = new Keyword("ISOLATION")
  static ITERATE = new Keyword("ITERATE")
  static JAVA = new Keyword("JAVA")
  static JOIN = new Keyword("JOIN")
  static KEEP = new Keyword("KEEP")
  static KEEP_DUPLICATES = new Keyword("KEEP_DUPLICATES")
  static KEY = new Keyword("KEY")
  static KEYS = new Keyword("KEYS")
  static KEYSTORE = new Keyword("KEYSTORE")
  static KILL = new Keyword("KILL")
  static LANGUAGE = new Keyword("LANGUAGE")
  static LAST = new Keyword("LAST")
  static LEAD_CDB = new Keyword("LEAD_CDB")
  static LEAD_CDB_URI = new Keyword("LEAD_CDB_URI")
  static LEAF = new Keyword("LEAF")
  static LEFT = new Keyword("LEFT")
  static LESS = new Keyword("LESS")
  static LEVEL = new Keyword("LEVEL", { reserved: true })
  static LEVEL_NAME = new Keyword("LEVEL_NAME")
  static LEVELS = new Keyword("LEVELS")
  static LIBRARY = new Keyword("LIBRARY")
  static LIKE = new Keyword("LIKE", { reserved: true })
  static LIKE2 = new Keyword("LIKE2")
  static LIKE4 = new Keyword("LIKE4")
  static LIKEC = new Keyword("LIKEC")
  static LIMIT = new Keyword("LIMIT")
  static LINEAR = new Keyword("LINEAR")
  static LINK = new Keyword("LINK")
  static LIST = new Keyword("LIST")
  static LITERAL = new Keyword("LITERAL")
  static LOAD = new Keyword("LOAD")
  static LOCATION = new Keyword("LOCATION")
  static LOB = new Keyword("LOB")
  static LOBS = new Keyword("LOBS")
  static LOCAL = new Keyword("LOCAL")
  static LOCATOR = new Keyword("LOCATOR")
  static LOCK = new Keyword("LOCK", { reserved: true })
  static LOCKDOWN = new Keyword("LOCKDOWN")
  static LOCKED = new Keyword("LOCKED")
  static LOCKING = new Keyword("LOCKING")
  static LONG = new Keyword("LONG", { reserved: true })
  static LOG = new Keyword("LOG")
  static LOGICAL = new Keyword("LOGICAL")
  static LOGICAL_READS_PER_CALL = new Keyword("LOGICAL_READS_PER_CALL")
  static LOGICAL_READS_PER_SESSION = new Keyword("LOGICAL_READS_PER_SESSION")
  static LOGFILE = new Keyword("LOGFILE")
  static LOGFILES = new Keyword("LOGFILES")
  static LOGGING = new Keyword("LOGGING")
  static LOOP = new Keyword("LOOP")
  static LOST = new Keyword("LOST")
  static LOW = new Keyword("LOW")
  static M = new Keyword("M")
  static MAIN = new Keyword("MAIN")
  static MANAGED = new Keyword("MANAGED")
  static MANAGEMENT = new Keyword("MANAGEMENT")
  static MANUAL = new Keyword("MANUAL")
  static MAPPING = new Keyword("MAPPING")
  static MASTER = new Keyword("MASTER")
  static MATCH = new Keyword("MATCH")
  static MATCH_NUMBER = new Keyword("MATCH_NUMBER")
  static MATCH_RECOGNIZE = new Keyword("MATCH_RECOGNIZE")
  static MATCHED = new Keyword("MATCHED")
  static MATERIALIZED = new Keyword("MATERIALIZED")
  static MAX = new Keyword("MAX")
  static MAX_AUDIT_SIZE = new Keyword("MAX_AUDIT_SIZE")
  static MAX_DIAG_SIZE = new Keyword("MAX_DIAG_SIZE")
  static MAXIMIZE = new Keyword("MAXIMIZE")
  static MAXINSTANCES = new Keyword("MAXINSTANCES")
  static MAXDATAFILES = new Keyword("MAXDATAFILES")
  static MAXLOGFILES = new Keyword("MAXLOGFILES")
  static MAXLOGMEMBERS = new Keyword("MAXLOGMEMBERS")
  static MAXLOGHISTORY= new Keyword("MAXLOGHISTORY")
  static MAXSIZE = new Keyword("MAXSIZE")
  static MAXEXTENTS = new Keyword("MAXEXTENTS", { reserved: true })
  static MAXVALUE = new Keyword("MAXVALUE")
  static MEASURE = new Keyword("MEASURE")
  static MEASURES = new Keyword("MEASURES")
  static MEDIUM = new Keyword("MEDIUM")
  static METADATA = new Keyword("METADATA")
  static MEMBER = new Keyword("MEMBER")
  static MEMBER_CAPTION = new Keyword("MEMBER_CAPTION")
  static MEMBER_DESCRIPTION = new Keyword("MEMBER_DESCRIPTION")
  static MEMBER_NAME = new Keyword("MEMBER_NAME")
  static MEMBER_UNIQUE_NAME = new Keyword("MEMBER_UNIQUE_NAME")
  static MEMCOMPRESS = new Keyword("MEMCOMPRESS")
  static MEMOPTIMIZE = new Keyword("MEMOPTIMIZE")
  static MEMORY = new Keyword("MEMORY")
  static MERGE = new Keyword("MERGE")
  static MIGRATE = new Keyword("MIGRATE")
  static MIGRATION = new Keyword("MIGRATION")
  static MINIMUM = new Keyword("MINIMUM")
  static MINING = new Keyword("MINING")
  static MINUS = new Keyword("MINUS", { reserved: true })
  static MINUTES = new Keyword("MINUTES")
  static MINVALUE = new Keyword("MINVALUE")
  static MIRROR = new Keyword("MIRROR")
  static MIRRORHOT = new Keyword("MIRRORHOT")
  static MIRRORCOLD = new Keyword("MIRRORCOLD")
  static MLSLABEL = new Keyword("MLSLABEL", { reserved: true })
  static MODE = new Keyword("MODE", { reserved: true })
  static MODEL = new Keyword("MODEL")
  static MODIFY = new Keyword("MODIFY", { reserved: true })
  static MODIFICATION = new Keyword("MODIFICATION")
  static MONITORING = new Keyword("MONITORING")
  static MONTH = new Keyword("MONTH")
  static MONTHS = new Keyword("MONTHS")
  static MOUNT = new Keyword("MOUNT")
  static MOUNTPATH = new Keyword("MOUNTPATH")
  static MOVE = new Keyword("MOVE")
  static MOVEMENT = new Keyword("MOVEMENT")
  static NAME = new Keyword("NAME")
  static NAMED = new Keyword("NAMED")
  static NAMESPACE = new Keyword("NAMESPACE")
  static NATIONAL = new Keyword("NATIONAL")
  static NATURAL = new Keyword("NATURAL")
  static NAV = new Keyword("NAV")
  static NESTED = new Keyword("NESTED")
  static NESTED_TABLE_ID = new Keyword("NESTED_TABLE_ID", { partial: true })
  static NETWORK = new Keyword("NETWORK")
  static NEVER = new Keyword("NEVER")
  static NEW = new Keyword("NEW")
  static NEXT = new Keyword("NEXT")
  static NO = new Keyword("NO")
  static NOARCHIVELOG = new Keyword("NOARCHIVELOG")
  static NOAUDIT = new Keyword("NOAUDIT", { reserved: true })
  static NOCACHE = new Keyword("NOCACHE")
  static NOCOMPRESS = new Keyword("NOCOMPRESS", { reserved: true })
  static NOCOPY = new Keyword("NOCOPY")
  static NOCYCLE = new Keyword("NOCYCLE")
  static NODELAY = new Keyword("NODELAY")
  static NOFORCE = new Keyword("NOFORCE")
  static NOGUARANTEE = new Keyword("NOGUARANTEE")
  static NOKEEP = new Keyword("NOKEEP")
  static NOMAPPING = new Keyword("NOMAPPING")
  static NOMAXVALUE = new Keyword("NOMAXVALUE")
  static NOMINVALUE = new Keyword("NOMINVALUE")
  static NOMONITORING = new Keyword("NOMONITORING")
  static NON$CDB = new Keyword("NON$CDB")
  static NONE = new Keyword("NONE")
  static NONSCHEMA = new Keyword("NONSCHEMA")
  static NOORDER = new Keyword("NOORDER")
  static NOPARALLEL = new Keyword("NOPARALLEL")
  static NORELOCATE = new Keyword("NORELOCATE")
  static NORELY = new Keyword("NORELY")
  static NOREPAIR = new Keyword("NOREPAIR")
  static NOREPLY = new Keyword("NOREPLY")
  static NORESETLOGS = new Keyword("NORESETLOGS")
  static NOREVERSE = new Keyword("NOREVERSE")
  static NORMAL = new Keyword("NORMAL")
  static NOROWDEPENDENCIES = new Keyword("NOROWDEPENDENCIES")
  static NOSCALE = new Keyword("NOSCALE")
  static NOSHARED = new Keyword("NOSHARED")
  static NOSORT = new Keyword("NOSORT")
  static NOSWITCH = new Keyword("NOSWITCH")
  static NOT = new Keyword("NOT", { reserved: true })
  static NOVALIDATE = new Keyword("NOVALIDATE")
  static NOWAIT = new Keyword("NOWAIT", { reserved: true })
  static NULL = new Keyword("NULL", { reserved: true })
  static NULLS = new Keyword("NULLS")
  static NUMBER = new Keyword("NUMBER", { reserved: true })
  static NONEDITIONALBE = new Keyword("NONEDITIONALBE")
  static OBJECT = new Keyword("OBJECT")
  static OF = new Keyword("OF", { reserved: true })
  static OFF = new Keyword("OFF")
  static OFFLINE = new Keyword("OFFLINE", { reserved: true })
  static OFFSET = new Keyword("OFFSET")
  static OIDINDEX = new Keyword("OIDINDEX")
  static OLTP = new Keyword("OLTP")
  static ON = new Keyword("ON", { reserved: true })
  static ONE = new Keyword("ONE")
  static ONLINE = new Keyword("ONLINE", { reserved: true })
  static ONLY = new Keyword("ONLY")
  static OPAQUE = new Keyword("OPAQUE")
  static OPTION = new Keyword("OPTION", { reserved: true })
  static OPEN = new Keyword("OPEN")
  static OPERATOR = new Keyword("OPERATOR")
  static OPTIION = new Keyword("OPTIION")
  static OPTIMIZE = new Keyword("OPTIMIZE")
  static OR = new Keyword("OR", { reserved: true })
  static ORDER = new Keyword("ORDER", { reserved: true })
  static ORGANIZATION = new Keyword("ORGANIZATION")
  static OTHER = new Keyword("OTHER")
  static OUTER = new Keyword("OUTER")
  static OUTLINE = new Keyword("OUTLINE")
  static OVERFLOW = new Keyword("OVERFLOW")
  static OVERLAPS = new Keyword("OVERLAPS", { reserved: true })
  static OWNER = new Keyword("OWNER")
  static OWNERSHIP = new Keyword("OWNERSHIP")
  static P = new Keyword("P")
  static PACKAGE = new Keyword("PACKAGE")
  static PACKAGES = new Keyword("PACKAGES")
  static PARAMETERS = new Keyword("PARAMETERS")
  static PARENT_LEVEL_NAME = new Keyword("PARENT_LEVEL_NAME")
  static PARENT_UNIQUE_NAME = new Keyword("PARENT_UNIQUE_NAME")
  static PARTIAL = new Keyword("PARTIAL")
  static PARITY = new Keyword("PARITY")
  static PASSWORD = new Keyword("PASSWORD")
  static PASSWORD_GRACE_TIME = new Keyword("PASSWORD_GRACE_TIME")
  static PASSWORD_LIFE_TIME = new Keyword("PASSWORD_LIFE_TIME")
  static PASSWORD_LOCK_TIME = new Keyword("PASSWORD_LOCK_TIME")
  static PASSWORD_REUSE_TIME = new Keyword("PASSWORD_REUSE_TIME")
  static PASSWORD_REUSE_MAX = new Keyword("PASSWORD_REUSE_MAX")
  static PASSWORD_ROLLOVER_TIME = new Keyword("PASSWORD_ROLLOVER_TIME")
  static PASSWORD_VERIFY_FUNCTION = new Keyword("PASSWORD_VERIFY_FUNCTION")
  static PASSWORDFILE_METADATA_CACHE = new Keyword("PASSWORDFILE_METADATA_CACHE")
  static PATCH = new Keyword("PATCH")
  static PATH = new Keyword("PATH")
  static PATH_PREFIX = new Keyword("PATH_PREFIX")
  static PATTERN = new Keyword("PATTERN")
  static PCTFREE = new Keyword("PCTFREE", { reserved: true })
  static PCTTHRESHOLD = new Keyword("PCTTHRESHOLD")
  static PCTUSED = new Keyword("PCTUSED")
  static PCTVERSION = new Keyword("PCTVERSION")
  static PER = new Keyword("PER")
  static PERFORMANCE = new Keyword("PERFORMANCE")
  static PERMANENT = new Keyword("PERMANENT")
  static PERMISSION = new Keyword("PERMISSION")
  static PARALLEL = new Keyword("PARALLEL")
  static PARTITION = new Keyword("PARTITION")
  static PARTITIONSET = new Keyword("PARTITIONSET")
  static PFILE = new Keyword("PFILE")
  static PHYSICAL = new Keyword("PHYSICAL")
  static PIVOT = new Keyword("PIVOT")
  static PLAN = new Keyword("PLAN")
  static PLUGGABLE = new Keyword("PLUGGABLE")
  static POINT = new Keyword("POINT")
  static POLICY = new Keyword("POLICY")
  static PORT = new Keyword("PORT")
  static POST_TRANSACTION = new Keyword("POST_TRANSACTION")
  static POWER = new Keyword("POWER")
  static PRECISION = new Keyword("PRECISION")
  static PREPARE = new Keyword("PREPARE")
  static PERIOD = new Keyword("PERIOD")
  static PREBUILD = new Keyword("PREBUILD")
  static PRESERVE = new Keyword("PRESERVE")
  static PREV = new Keyword("PREV")
  static PRIMARY = new Keyword("PRIMARY")
  static PRIOR = new Keyword("PRIOR", { reserved: true })
  static PRIORITY = new Keyword("PRIORITY")
  static PRIVATE = new Keyword("PRIVATE")
  static PRIVATE_SGA = new Keyword("PRIVATE_SGA")
  static PRIVILEGES = new Keyword("PRIVILEGES")
  static PROCEDURAL = new Keyword("PROCEDURAL")
  static PROCEDURE = new Keyword("PROCEDURE", { reserved: true })
  static PROFILE = new Keyword("PROFILE")
  static PROJECT = new Keyword("PROJECT")
  static PROPERTY = new Keyword("PROPERTY")
  static PROTECTION = new Keyword("PROTECTION")
  static PROXY = new Keyword("PROXY")
  static PRUNING = new Keyword("PRUNING")
  static PUBLIC = new Keyword("PUBLIC", { reserved: true })
  static PURGE = new Keyword("PURGE")
  static QUERY = new Keyword("QUERY")
  static QUIESCE = new Keyword("QUIESCE")
  static QUORUM = new Keyword("QUORUM")
  static QUOTA = new Keyword("QUOTA")
  static QUOTAGROUP = new Keyword("QUOTAGROUP")
  static QUARTERS = new Keyword("QUARTERS")
  static RANGE = new Keyword("RANGE")
  static RAW = new Keyword("RAW", { reserved: true })
  static READ = new Keyword("READ")
  static READS = new Keyword("READS")
  static REBUILD = new Keyword("REBUILD")
  static RECORD = new Keyword("RECORD")
  static RECOVER = new Keyword("RECOVER")
  static RECYCLEBIN = new Keyword("RECYCLEBIN")
  static REDO = new Keyword("REDO")
  static REDUCED = new Keyword("REDUCED")
  static REDUNDANCY = new Keyword("REDUNDANCY")
  static REF = new Keyword("REF")
  static REFERENCE = new Keyword("REFERENCE")
  static REFERENCED = new Keyword("REFERENCED")
  static REFERENCES = new Keyword("REFERENCES")
  static REFRESH = new Keyword("REFRESH")
  static REGISTER = new Keyword("REGISTER")
  static REGULAR = new Keyword("REGULAR")
  static REJECT = new Keyword("REJECT")
  static REKEY = new Keyword("REKEY")
  static RELATIONAL = new Keyword("RELATIONAL")
  static RELY = new Keyword("RELY")
  static RELOCATE = new Keyword("RELOCATE")
  static RENAME = new Keyword("RENAME", { reserved: true })
  static REPAIR = new Keyword("REPAIR")
  static REPEAT = new Keyword("REPEAT")
  static REPLACE = new Keyword("REPLACE")
  static REPLICATION = new Keyword("REPLICATION")
  static REQUIRED = new Keyword("REQUIRED")
  static RESETLOGS = new Keyword("RESETLOGS")
  static RESIZE = new Keyword("RESIZE")
  static RESOLVE = new Keyword("RESOLVE")
  static RESOLVER = new Keyword("RESOLVER")
  static RESOURCE = new Keyword("RESOURCE", { reserved: true })
  static RESTART = new Keyword("RESTART")
  static RESTORE = new Keyword("RESTORE")
  static RESTRICTED = new Keyword("RESTRICTED")
  static RESUMABLE = new Keyword("RESUMABLE")
  static RESULT_CACHE = new Keyword("RESULT_CACHE")
  static RESUME = new Keyword("RESUME")
  static RETENTION = new Keyword("RETENTION")
  static RETURN = new Keyword("RETURN")
  static RETURNING = new Keyword("RETURNING")
  static REUSE = new Keyword("REUSE")
  static REVERSE = new Keyword("REVERSE")
  static REVOKE = new Keyword("REVOKE", { reserved: true })
  static REWRITE = new Keyword("REWRITE")
  static RIGHT = new Keyword("RIGHT")
  static ROLE = new Keyword("ROLE")
  static ROLES = new Keyword("ROLES")
  static ROLLBACK = new Keyword("ROLLBACK")
  static ROLLING = new Keyword("ROLLING")
  static ROLLUP = new Keyword("ROLLUP")
  static ROOT = new Keyword("ROOT")
  static ROW = new Keyword("ROW", { reserved: true })
  static ROWDEPENDENCIES = new Keyword("ROWDEPENDENCIES")
  static ROWID = new Keyword("ROWID", { reserved: true })
  static ROWNUM = new Keyword("ROWNUM", { reserved: true })
  static ROWS = new Keyword("ROWS", { reserved: true })
  static RULES = new Keyword("RULES")
  static RUNNING = new Keyword("RUNNING")
  static SALT = new Keyword("SALT")
  static SAMPLE = new Keyword("SAMPLE")
  static SAVEPOINT = new Keyword("SAVEPOINT")
  static SAVE = new Keyword("SAVE")
  static SCHEMA = new Keyword("SCHEMA")
  static SCALE = new Keyword("SCALE")
  static SCAN = new Keyword("SCAN")
  static SCN = new Keyword("SCN")
  static SCOPE = new Keyword("SCOPE")
  static SCRUB = new Keyword("SCRUB")
  static SEARCH = new Keyword("SEARCH")
  static SECONDS = new Keyword("SECONDS")
  static SECRET = new Keyword("SECRET")
  static SECUREFILE = new Keyword("SECUREFILE")
  static SEED = new Keyword("SEED")
  static SEGMENT = new Keyword("SEGMENT")
  static SELECT = new Keyword("SELECT", { reserved: true })
  static SELECTIVITY = new Keyword("SELECTIVITY")
  static SESSION = new Keyword("SESSION", { reserved: true })
  static SESSIONS_PER_USER = new Keyword("SESSIONS_PER_USER")
  static SET = new Keyword("SET", { reserved: true })
  static SETS = new Keyword("SETS")
  static SEQUENCE = new Keyword("SEQUENCE")
  static SEQUENTIAL = new Keyword("SEQUENTIAL")
  static SERIALIZABLE = new Keyword("SERIALIZABLE")
  static SERVICE = new Keyword("SERVICE")
  static SERVICE_NAME_CONVERT = new Keyword("SERVICE_NAME_CONVERT")
  static SHARE = new Keyword("SHARE", { reserved: true })
  static SHARING = new Keyword("SHARING")
  static SHARED = new Keyword("SHARED")
  static SHARED_POOL = new Keyword("SHARED_POOL")
  static SHAREDSPACE = new Keyword("SHAREDSPACE")
  static SHRINK = new Keyword("SHRINK")
  static SHUTDOWN = new Keyword("SHUTDOWN")
  static SID = new Keyword("SID")
  static SINGLE = new Keyword("SINGLE")
  static SITE = new Keyword("SITE")
  static SIZE = new Keyword("SIZE", { reserved: true })
  static SKIP = new Keyword("SKIP")
  static SMALLFILE = new Keyword("SMALLFILE")
  static SMALLINT = new Keyword("SMALLINT", { reserved: true })
  static SNAPSHOT = new Keyword("SNAPSHOT")
  static SORT = new Keyword("SORT")
  static SPACE = new Keyword("SPACE")
  static SPFILE = new Keyword("SPFILE")
  static SPLIT = new Keyword("SPLIT")
  static SOURCE = new Keyword("SOURCE")
  static SOURCE_FILE_DIRECTORY = new Keyword("SOURCE_FILE_DIRECTORY")
  static SOURCE_FILE_NAME_CONVERT = new Keyword("SOURCE_FILE_NAME_CONVERT")
  static SQL = new Keyword("SQL", { reserved: true })
  static STANDARD = new Keyword("STANDARD")
  static STANDBY = new Keyword("STANDBY")
  static STANDBYS = new Keyword("STANDBYS")
  static START = new Keyword("START", { reserved: true })
  static STATE = new Keyword("STATE")
  static STATEMENT = new Keyword("STATEMENT")
  static STATEMENT_ID = new Keyword("STATEMENT_ID")
  static STATEMENTS = new Keyword("STATEMENTS")
  static STATISTICS = new Keyword("STATISTICS")
  static STORAGE = new Keyword("STORAGE")
  static STORE = new Keyword("STORE")
  static STRIPE_WIDTH = new Keyword("STRIPE_WIDTH")
  static STRIPE_COLUMNS = new Keyword("STRIPE_COLUMNS")
  static STRUCTURE = new Keyword("STRUCTURE")
  static SUBSET = new Keyword("SUBSET")
  static SUBSTITUTABLE = new Keyword("SUBSTITUTABLE")
  static SUBPARTITION = new Keyword("SUBPARTITION")
  static SUBPARTITIONS = new Keyword("SUBPARTITIONS")
  static SUBTYPE = new Keyword("SUBTYPE", { reserved: true })
  static SUCCESSFUL = new Keyword("SUCCESSFUL", { reserved: true })
  static SUPPLEMENTAL = new Keyword("SUPPLEMENTAL")
  static SUSPEND = new Keyword("SUSPEND")
  static SWITCH = new Keyword("SWITCH")
  static SWITCHOVER = new Keyword("SWITCHOVER")
  static SYNC = new Keyword("SYNC")
  static SYNCHRONOUS = new Keyword("SYNCHRONOUS")
  static SYNONYM = new Keyword("SYNONYM", { reserved: true })
  static SYS = new Keyword("SYS")
  static SYSAUX = new Keyword("SYSAUX")
  static SYSDATE = new Keyword("SYSDATE", { reserved: true })
  static SYSTEM = new Keyword("SYSTEM")
  static T = new Keyword("T")
  static TABAUTH = new Keyword("TABAUTH", { reserved: true })
  static TABLE = new Keyword("TABLE", { reserved: true })
  static TABLES = new Keyword("TABLES")
  static TABLESPACE = new Keyword("TABLESPACE")
  static TAG = new Keyword("TAG")
  static TARGET = new Keyword("TARGET")
  static TEMPFILE = new Keyword("TEMPFILE")
  static TEMPLATE = new Keyword("TEMPLATE")
  static TEMPORARY = new Keyword("TEMPORARY")
  static TEST = new Keyword("TEST")
  static THAN = new Keyword("THAN")
  static THEN = new Keyword("THEN", { reserved: true })
  static THREAD = new Keyword("THREAD")
  static THROUGH = new Keyword("THROUGH")
  static TIME = new Keyword("TIME")
  static TIME_ZONE = new Keyword("TIME_ZONE")
  static TIMESTAMP = new Keyword("TIMESTAMP")
  static TIMEOUT = new Keyword("TIMEOUT")
  static TIER = new Keyword("TIER")
  static TO = new Keyword("TO", { reserved: true })
  static TOPLEVEL = new Keyword("TOPLEVEL")
  static TRACE = new Keyword("TRACE")
  static TRACKING = new Keyword("TRACKING")
  static TRIGGER = new Keyword("TRIGGER", { reserved: true })
  static TRIGGERS = new Keyword("TRIGGERS")
  static TRUSTED = new Keyword("TRUSTED")
  static TRUNCATE = new Keyword("TRUNCATE")
  static TRANSLATION = new Keyword("TRANSLATION")
  static TRANSACTION = new Keyword("TRANSACTION")
  static TRUE = new Keyword("TRUE")
  static TYPE = new Keyword("TYPE", { reserved: true })
  static TYPES = new Keyword("TYPES")
  static UID = new Keyword("UID", { reserved: true })
  static UNARCHIVED = new Keyword("UNARCHIVED")
  static UNRECOVERABLE = new Keyword("UNRECOVERABLE")
  static UNDER = new Keyword("UNDER")
  static UNDO = new Keyword("UNDO")
  static UNDROP = new Keyword("UNDROP")
  static UNION = new Keyword("UNION", { reserved: true })
  static UNITE = new Keyword("UNITE")
  static UNPLUG = new Keyword("UNPLUG")
  static UNQUIESCE = new Keyword("UNQUIESCE")
  static UNPROTECTED = new Keyword("UNPROTECTED")
  static UNINSTALL = new Keyword("UNINSTALL")
  static UNIFORM = new Keyword("UNIFORM")
  static UNIQUE = new Keyword("UNIQUE", { reserved: true })
  static UNLIMITED = new Keyword("UNLIMITED")
  static UNLOCK = new Keyword("UNLOCK")
  static UNTIL = new Keyword("UNTIL")
  static UNPIVOT = new Keyword("UNPIVOT")
  static UNUSABLE = new Keyword("UNUSABLE")
  static UNUSED = new Keyword("UNUSED")
  static UPDATE = new Keyword("UPDATE", { reserved: true })
  static UPDATED = new Keyword("UPDATED")
  static UPGRADE = new Keyword("UPGRADE")
  static UPSERT = new Keyword("UPSERT")
  static USAGE = new Keyword("USAGE")
  static USE = new Keyword("USE")
  static USE_STORED_OUTLINES = new Keyword("USE_STORED_OUTLINES")
  static USER = new Keyword("USER", { reserved: true })
  static USER_DATA = new Keyword("USER_DATA")
  static USER_TABLESPACES = new Keyword("USER_TABLESPACES")
  static USERS = new Keyword("USERS")
  static USERGROUP = new Keyword("USERGROUP")
  static USING = new Keyword("USING")
  static VARRAY = new Keyword("VARRAY")
  static VARRAYS = new Keyword("VARRAYS")
  static VALIDATE = new Keyword("VALIDATE", { reserved: true })
  static VALUE = new Keyword("VALUE")
  static VALUES = new Keyword("VALUES", { reserved: true })
  static VARCHAR = new Keyword("VARCHAR", { reserved: true })
  static VARCHAR2 = new Keyword("VARCHAR2", { reserved: true })
  static VERIFY = new Keyword("VERIFY")
  static VERSION = new Keyword("VERSION")
  static VERSIONS = new Keyword("VERSIONS")
  static VIEW = new Keyword("VIEW", { reserved: true })
  static VIEWS = new Keyword("VIEWS", { reserved: true })
  static VIRTUAL = new Keyword("VIRTUAL")
  static VISIBLE = new Keyword("VISIBLE")
  static VISIBLITY = new Keyword("VISIBLITY")
  static VOLUME = new Keyword("VOLUME")
  static WAIT = new Keyword("WAIT")
  static WALLET = new Keyword("WALLET")
  static WEEKS = new Keyword("WEEKS")
  static WHEN = new Keyword("WHEN", { reserved: true })
  static WHENEVER = new Keyword("WHENEVER", { reserved: true })
  static WHERE = new Keyword("WHERE", { reserved: true })
  static WITH = new Keyword("WITH", { reserved: true })
  static WITHOUT = new Keyword("WITHOUT")
  static WORK = new Keyword("WORK")
  static WRITE = new Keyword("WRITE")
  static XDB = new Keyword("XDB")
  static XML = new Keyword("XML")
  static XMLSCHEMA = new Keyword("XMLSCHEMA")
  static XMLTYPE = new Keyword("XMLTYPE")
  static XS = new Keyword("XS")
  static YEAR = new Keyword("YEAR")
  static YEARS = new Keyword("YEARS")
  static ZONEMAP = new Keyword("ZONEMAP")

  static OPE_ASSIGN = new Keyword("OPE_ASSIGN", { value: ":=" })
  static OPE_EQ = new Keyword("OPE_EQ", { value: "=" })
  static OPE_PLUS = new Keyword("OPE_PLUS", { value: "+" })
  static OPE_MINUS = new Keyword("OPE_MINUS", { value: "-" })
  static OPE_AT = new Keyword("OPE_AT", { value: "@" })

  constructor(
    public name: string,
    public options: Record<string, any> = {}
  ) {
    super(name, { ...options, keyword: true })
    KeywordMap.set(options.value ?? name, this)
  }
}

export class OracleLexer extends Lexer {
  private reserved = new Set<Keyword>()

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

  split(tokens: Token[]): Segment[] {
    const stmts = new Array<Segment>()

    let stmt = null
    let lineNumber = 1
    for (const token of tokens) {
      if (!stmt) {
        stmt = new Segment(lineNumber)
        stmts.push(stmt)
      }
      for (const skip of token.skips) {
        if (token.is(TokenType.LineBreak)) {
          lineNumber++
        }
      }
      if (token.is(TokenType.Command)) {
        stmt = new Segment(lineNumber)
        stmt.tokens.push(token)
        stmts.push(stmt)
        stmt = null
      } else if (token.is(TokenType.SemiColon)) {
        if (stmt.tokens[0]?.is(Keyword.DECLARE) || stmt.tokens[0]?.is(Keyword.BEGIN)) {
          stmt.tokens.push(token)
        } else if (stmt.tokens[0]?.is(Keyword.CREATE)) {
          let isBlock = false
          for (let i = 1; i < stmt.tokens.length; i++) {
            const stoken = stmt.tokens[i]
            if (stoken.is(Keyword.FUNCTION)
              || stoken.is(Keyword.LIBRARY)
              || stoken.is(Keyword.PACKAGE)
              || stoken.is(Keyword.PROCEDURE)
              || stoken.is(Keyword.TRIGGER)
              || stoken.is(Keyword.TYPE)) {
              isBlock = true
              break
            }
          }
          if (isBlock) {
            stmt.tokens.push(token)
          } else {
            stmt.tokens.push(token)
            stmt = null
          }
        } else {
          stmt.tokens.push(token)
          stmt = null
        }
      } else if (token.is(TokenType.Delimiter) || token.is(TokenType.Eof)) {
        stmt.tokens.push(token)
        stmt = null
      } else {
        stmt.tokens.push(token)
      }
    }

    return stmts
  }
}

export class OracleParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new OracleLexer(options).lex(input)
    return new OracleParser(tokens, options).root()
  }

  private static BLOCK_STATEMENTS = new Set<string>([
    "declare",
    "begin",
    "create function",
    "create library",
    "create package",
    "create package body",
    "create procedure",
    "create trigger",
    "create type",
  ])

  constructor(
    tokens: Token[],
    options: Record<string, any> = {},
  ) {
    super(tokens, options)
  }

  root(): Node {
    const root = new Node("root")
    const errors = []

    while (this.token()) {
      try {
        if (this.consumeIf(TokenType.Eof)) {
          root.add(this.token(-1))
          break
        } else if (this.peekIf(TokenType.Delimiter) || this.peekIf(TokenType.SemiColon)) {
          this.consume()
          root.add(this.token(-1))
        } else if (this.peekIf(TokenType.Command)) {
          root.add(this.command())
        } else {
          const stmt = this.statement()
          root.add(stmt)
          if (this.consumeIf(TokenType.Eof)) {
            root.add(this.token(-1))
            break
          } else if (this.consumeIf(TokenType.Delimiter)) {
            root.add(this.token(-1))
          } else if (!OracleParser.BLOCK_STATEMENTS.has(stmt.name) && this.consumeIf(TokenType.SemiColon)) {
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
    return stmt
  }

  statement() {
    let explainPlan
    let stmt

    try {
      if (this.consumeIf(Keyword.EXPLAIN)) {
        this.consume(Keyword.PLAN)
        explainPlan = new Node("explain plan")
        explainPlan.add(this.token(-2), this.token(-1))

        if (this.consumeIf(Keyword.SET)) {
          explainPlan.add(this.token(-1))
          this.consume(Keyword.STATEMENT_ID, Keyword.OPE_EQ, TokenType.String)
          explainPlan.add(this.token(-3), this.token(-2), this.token(-1))
        }

        if (this.consumeIf(Keyword.INTO)) {
          explainPlan.add(this.token(-1))
        }

        this.consume(Keyword.FOR)
        explainPlan.add(this.token(-1))
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.consumeIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.createAnalyticViewStatement()
            break
          } else if (this.consumeIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.createAttributeDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.createAuditPolicyStatement()
            break
          } else if (this.consumeIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.createClusterStatement()
            break
          } else if (this.consumeIf(Keyword.CONTEXT)) {
            this.pos = mark
            stmt = this.createContextStatement()
            break
          } else if (this.consumeIf(Keyword.CONTROLFILE)) {
            this.pos = mark
            stmt = this.createControlfileStatement()
            break
          } else if (this.consumeIf(Keyword.DATABASE)) {
            if (this.consumeIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.createDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.createDatabaseStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.createDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.DIRECTORY)) {
            this.pos = mark
            stmt = this.createDirectoryStatement()
            break
          } else if (this.consumeIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.createDiskgroupStatement()
            break
          } else if (this.consumeIf(Keyword.EDITION)) {
            this.pos = mark
            stmt = this.createEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.createEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.createFunctionStatement()
            break
          } else if (this.consumeIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.createHierarchyStatement()
            break
          } else if (this.consumeIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.createIndexStatement()
            break
          } else if (this.consumeIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.createIndextypeStatement()
            break
          } else if (this.consumeIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.createInmemoryJoinGroupStatement()
            break
          } else if (this.consumeIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.createJavaStatement()
            break
          } else if (this.consumeIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.createLibraryStatement()
            break
          } else if (this.consumeIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.createLockdownProfileStatement()
            break
          } else if (this.consumeIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            if (this.consumeIf(Keyword.LOG)) {
              this.pos = mark
              stmt = this.createMaterializedViewLogStatement()
            } else if (this.consumeIf(Keyword.ZONEMAP)) {
              this.pos = mark
              stmt = this.createMaterializedViewLogStatement()
            } else {
              this.pos = mark
              stmt = this.createMaterializedViewStatement()
            }
            break
          } else if (this.consumeIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.createOperatorStatement()
            break
          } else if (this.consumeIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.createOutlineStatement()
            break
          } else if (this.consumeIf(Keyword.PACKAGE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.createPackageBodyStatement()
            } else {
              this.pos = mark
              stmt = this.createPackageStatement()
            }
            break
          } else if (this.consumeIf(Keyword.PFILE)) {
            this.pos = mark
            stmt = this.createPfileStatement()
            break
          } else if (this.consumeIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.createPluggableDatabaseStatement()
            break
          } else if (this.consumeIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.createProcedureStatement()
            break
          } else if (this.consumeIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.createProfileStatement()
            break
          } else if (this.consumeIf(Keyword.RESTORE, Keyword.POINT)) {
            this.pos = mark
            stmt = this.createRestorePointStatement()
            break
          } else if (this.consumeIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.createRoleStatement()
            break
          } else if (this.consumeIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.createRollbackSegmentStatement()
            break
          } else if (this.consumeIf(Keyword.SCHEMA)) {
            this.pos = mark
            stmt = this.createSchemaStatement()
            break
          } else if (this.consumeIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.createSequenceStatement()
            break
          } else if (this.consumeIf(Keyword.SPFILE)) {
            this.pos = mark
            stmt = this.createSpfileStatement()
            break
          } else if (this.consumeIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.createSynonymStatement()
            break
          } else if (this.consumeIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.createTableStatement()
            break
          } else if (this.consumeIf(Keyword.TABLESPACE)) {
            if (this.consumeIf(Keyword.SET)) {
              this.pos = mark
              stmt = this.createTablespaceSetStatement()
            } else {
              this.pos = mark
              stmt = this.createTablespaceStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.createTriggerStatement()
            break
          } else if (this.consumeIf(Keyword.TYPE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.createTypeBodyStatement()
            } else {
              this.pos = mark
              stmt = this.createTypeStatement()
            }
            break
          } else if (this.consumeIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.createUserStatement()
            break
          } else if (this.consumeIf(Keyword.VIEW)) {
            this.pos = mark
            stmt = this.createViewStatement()
            break
          } else {
            this.consume()
          }
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.ALTER)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.consumeIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.alterAnalyticViewStatement()
            break
          } else if (this.consumeIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.alterAttributeDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.alterAuditPolicyStatement()
            break
          } else if (this.consumeIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.alterClusterStatement()
            break
          } else if (this.consumeIf(Keyword.DATABASE)) {
            if (this.consumeIf(Keyword.DICTIONARY)) {
              this.pos = mark
              stmt = this.alterDatabaseDictionaryStatement()
            } else if (this.consumeIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.alterDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.alterDatabaseStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.alterDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.alterDiskgroupStatement()
            break
          } else if (this.consumeIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.alterEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.alterFunctionStatement()
            break
          } else if (this.consumeIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.alterHierarchyStatement()
            break
          } else if (this.consumeIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.alterIndexStatement()
            break
          } else if (this.consumeIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.alterIndextypeStatement()
            break
          } else if (this.consumeIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.alterInmemoryJoinGroupStatement()
            break
          } else if (this.consumeIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.alterJavaStatement()
            break
          } else if (this.consumeIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.alterLibraryStatement()
            break
          } else if (this.consumeIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.alterLockdownProfileStatement()
            break
          } else if (this.consumeIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            if (this.consumeIf(Keyword.LOG)) {
              this.pos = mark
              stmt = this.alterMaterializedViewLogStatement()
            } else if (this.consumeIf(Keyword.ZONEMAP)) {
              this.pos = mark
              stmt = this.alterMaterializedViewLogStatement()
            } else {
              this.pos = mark
              stmt = this.alterMaterializedViewStatement()
            }
            break
          } else if (this.consumeIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.alterOperatorStatement()
            break
          } else if (this.consumeIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.alterOutlineStatement()
            break
          } else if (this.consumeIf(Keyword.PACKAGE)) {
            this.pos = mark
            stmt = this.alterPackageStatement()
            break
          } else if (this.consumeIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.alterPluggableDatabaseStatement()
            break
          } else if (this.consumeIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.alterProcedureStatement()
            break
          } else if (this.consumeIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.alterProfileStatement()
            break
          } else if (this.consumeIf(Keyword.RESOURCE, Keyword.COST)) {
            this.pos = mark
            stmt = this.alterResourceCostStatement()
            break
          } else if (this.consumeIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.alterRoleStatement()
            break
          } else if (this.consumeIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.alterRollbackSegmentStatement()
            break
          } else if (this.consumeIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.alterSequenceStatement()
            break
          } else if (this.consumeIf(Keyword.SESSION)) {
            this.pos = mark
            stmt = this.alterSessionStatement()
            break
          } else if (this.consumeIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.alterSynonymStatement()
            break
          } else if (this.consumeIf(Keyword.SYSTEM)) {
            this.pos = mark
            stmt = this.alterSystemStatement()
            break
          } else if (this.consumeIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.alterTableStatement()
            break
          } else if (this.consumeIf(Keyword.TABLESPACE)) {
            if (this.consumeIf(Keyword.SET)) {
              this.pos = mark
              stmt = this.alterTablespaceSetStatement()
            } else {
              this.pos = mark
              stmt = this.alterTablespaceStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.alterTriggerStatement()
            break
          } else if (this.consumeIf(Keyword.TYPE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.alterTypeBodyStatement()
            } else {
              this.pos = mark
              stmt = this.alterTypeStatement()
            }
            break
          } else if (this.consumeIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.alterUserStatement()
            break
          } else if (this.consumeIf(Keyword.VIEW)) {
            this.pos = mark
            stmt = this.alterViewStatement()
            break
          } else {
            this.consume()
          }
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.DROP)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.consumeIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.dropAnalyticViewStatement()
            break
          } else if (this.consumeIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.dropAttributeDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.dropAuditPolicyStatement()
            break
          } else if (this.consumeIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.dropClusterStatement()
            break
          } else if (this.consumeIf(Keyword.CONTEXT)) {
            this.pos = mark
            stmt = this.dropContextStatement()
            break
          } else if (this.consumeIf(Keyword.DATABASE)) {
            if (this.consumeIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.dropDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.dropDatabaseStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.dropDimensionStatement()
            break
          } else if (this.consumeIf(Keyword.DIRECTORY)) {
            this.pos = mark
            stmt = this.dropDirectoryStatement()
            break
          } else if (this.consumeIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.dropDiskgroupStatement()
            break
          } else if (this.consumeIf(Keyword.EDITION)) {
            this.pos = mark
            stmt = this.dropEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.dropEditionStatement()
            break
          } else if (this.consumeIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.dropFunctionStatement()
            break
          } else if (this.consumeIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.dropHierarchyStatement()
            break
          } else if (this.consumeIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.dropIndexStatement()
            break
          } else if (this.consumeIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.dropIndextypeStatement()
            break
          } else if (this.consumeIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.dropInmemoryJoinGroupStatement()
            break
          } else if (this.consumeIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.dropJavaStatement()
            break
          } else if (this.consumeIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.dropLibraryStatement()
            break
          } else if (this.consumeIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.dropLockdownProfileStatement()
            break
          } else if (this.consumeIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            if (this.consumeIf(Keyword.LOG)) {
              this.pos = mark
              stmt = this.dropMaterializedViewLogStatement()
            } else if (this.consumeIf(Keyword.ZONEMAP)) {
              this.pos = mark
              stmt = this.dropMaterializedViewLogStatement()
            } else {
              this.pos = mark
              stmt = this.dropMaterializedViewStatement()
            }
            break
          } else if (this.consumeIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.dropOperatorStatement()
            break
          } else if (this.consumeIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.dropOutlineStatement()
            break
          } else if (this.consumeIf(Keyword.PACKAGE)) {
            this.pos = mark
            stmt = this.dropPackageStatement()
            break
          } else if (this.consumeIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.dropPluggableDatabaseStatement()
            break
          } else if (this.consumeIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.dropProcedureStatement()
            break
          } else if (this.consumeIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.dropProfileStatement()
            break
          } else if (this.consumeIf(Keyword.RESTORE, Keyword.POINT)) {
            this.pos = mark
            stmt = this.dropRestorePointStatement()
            break
          } else if (this.consumeIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.dropRoleStatement()
            break
          } else if (this.consumeIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.dropRollbackSegmentStatement()
            break
          } else if (this.consumeIf(Keyword.SCHEMA)) {
            this.pos = mark
            stmt = this.dropSchemaStatement()
            break
          } else if (this.consumeIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.dropSequenceStatement()
            break
          } else if (this.consumeIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.dropSynonymStatement()
            break
          } else if (this.consumeIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.dropTableStatement()
            break
          } else if (this.consumeIf(Keyword.TABLESPACE)) {
            if (this.consumeIf(Keyword.SET)) {
              this.pos = mark
              stmt = this.dropTablespaceSetStatement()
            } else {
              this.pos = mark
              stmt = this.dropTablespaceStatement()  
            }
            break
          } else if (this.consumeIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.dropTriggerStatement()
            break
          } else if (this.consumeIf(Keyword.TYPE)) {
            if (this.consumeIf(Keyword.BODY)) {
              this.pos = mark
              stmt = this.dropTypeBodyStatement()
            } else {
              this.pos = mark
              stmt = this.dropTypeStatement()
            }
            break
          } else if (this.consumeIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.dropUserStatement()
            break
          } else if (this.consumeIf(Keyword.VIEW)) {
            this.pos = mark
            stmt = this.dropViewStatement()
            break
          } else {
            this.consume()
          }
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.TRUNCATE)) {
        const mark = this.pos
        this.consume()

        if (this.consumeIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.truncateClusterStatement()
        } else if (this.consumeIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.truncateTableStatement()
        }
        if (!stmt) {
          this.pos = mark
        }
      } else if (this.peekIf(Keyword.SET)) {
        const mark = this.pos
        this.consume()

        if (this.consumeIf(Keyword.CONSTRAINT) || this.consumeIf(Keyword.CONSTRAINTS)) {
          this.pos = mark
          stmt = this.setConstraintStatement()
        } else if (this.consumeIf(Keyword.ROLE)) {
          this.pos = mark
          stmt = this.setRoleStatement()
        } else if (this.consumeIf(Keyword.TRANSACTION)) {
          this.pos = mark
          stmt = this.setTransactionStatement()
        }
        if (!stmt) {
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
        let withNode = undefined
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
    } catch (err) {
      if (err instanceof ParseError) {
        // skip tokens
        if (!stmt) {
          stmt = new Node("unknown")
        }
        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          this.consume()
          stmt.add(this.token(-1))
        }
        err.node = stmt
      }      
      throw err
    }

    if (explainPlan) {
      return explainPlan.add(stmt)
    }

    return stmt
  }

  private createAnalyticViewStatement() {
    const node = new Node("create analytic view")
    this.consume(Keyword.CREATE, Keyword.ANALYTIC, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createAttributeDimensionStatement() {
    const node = new Node("create attribute dimension")
    this.consume(Keyword.CREATE, Keyword.ATTRIBUTE, Keyword.DIMENSION)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createAuditPolicyStatement() {
    const node = new Node("create audit policy")
    this.consume(Keyword.CREATE, Keyword.AUDIT, Keyword.POLICY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createClusterStatement() {
    const node = new Node("create cluster")
    this.consume(Keyword.CREATE, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createContextStatement() {
    const node = new Node("create context")
    this.consume(Keyword.CREATE, Keyword.CONTEXT)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createControlfileStatement() {
    const node = new Node("create controlfile")
    this.consume(Keyword.CREATE, Keyword.CONTROLFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDatabaseLinkStatement() {
    const node = new Node("create database link")
    this.consume(Keyword.CREATE, Keyword.DATABASE, Keyword.LINK)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDatabaseStatement() {
    const node = new Node("create database")
    this.consume(Keyword.CREATE, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDimensionStatement() {
    const node = new Node("create dimension")
    this.consume(Keyword.CREATE, Keyword.DIMENSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDirectoryStatement() {
    const node = new Node("create directory")
    this.consume(Keyword.CREATE, Keyword.DIRECTORY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createDiskgroupStatement() {
    const node = new Node("create diskgroup")
    this.consume(Keyword.CREATE, Keyword.DISKGROUP)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createEditionStatement() {
    const node = new Node("create edition")
    this.consume(Keyword.CREATE, Keyword.EDITION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createFunctionStatement() {
    const node = new Node("create function")
    this.consume(Keyword.CREATE, Keyword.FUNCTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createHierarchyStatement() {
    const node = new Node("create hierarchy")
    this.consume(Keyword.CREATE, Keyword.HIERARCHY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createIndexStatement() {
    const node = new Node("create index")
    this.consume(Keyword.CREATE, Keyword.INDEX)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createIndextypeStatement() {
    const node = new Node("create indextype")
    this.consume(Keyword.CREATE, Keyword.INDEXTYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createInmemoryJoinGroupStatement() {
    const node = new Node("create inmemory join group")
    this.consume(Keyword.CREATE, Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createJavaStatement() {
    const node = new Node("create java")
    this.consume(Keyword.CREATE, Keyword.JAVA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createLibraryStatement() {
    const node = new Node("create library")
    this.consume(Keyword.CREATE, Keyword.LIBRARY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createLockdownProfileStatement() {
    const node = new Node("create lockdown profile")
    this.consume(Keyword.CREATE, Keyword.LOCKDOWN, Keyword.PROFILE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createMaterializedViewLogStatement() {
    const node = new Node("create materialized view log")
    this.consume(Keyword.CREATE, Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createMaterializedViewStatement() {
    const node = new Node("create materialized view")
    this.consume(Keyword.CREATE, Keyword.MATERIALIZED, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createOperatorStatement() {
    const node = new Node("create operator")
    this.consume(Keyword.CREATE, Keyword.OPERATOR)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createOutlineStatement() {
    const node = new Node("create outline")
    this.consume(Keyword.CREATE, Keyword.OUTLINE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPackageBodyStatement() {
    const node = new Node("create package body")
    this.consume(Keyword.CREATE, Keyword.PACKAGE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPackageStatement() {
    const node = new Node("create package")
    this.consume(Keyword.CREATE, Keyword.PACKAGE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPfileStatement() {
    const node = new Node("create pfile")
    this.consume(Keyword.CREATE, Keyword.PFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createPluggableDatabaseStatement() {
    const node = new Node("create pluggable database")
    this.consume(Keyword.CREATE, Keyword.PLUGGABLE, Keyword.DATABASE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createProcedureStatement() {
    const node = new Node("create procedure")
    this.consume(Keyword.CREATE, Keyword.PROCEDURE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createProfileStatement() {
    const node = new Node("create profile")
    this.consume(Keyword.CREATE, Keyword.PROFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createRestorePointStatement() {
    const node = new Node("create restore point")
    this.consume(Keyword.CREATE, Keyword.RESTORE, Keyword.POINT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createRoleStatement() {
    const node = new Node("create role")
    this.consume(Keyword.CREATE, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }
  
  private createRollbackSegmentStatement() {
    const node = new Node("create rollback segment")
    this.consume(Keyword.CREATE, Keyword.ROLLBACK, Keyword.SEGMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSchemaStatement() {
    const node = new Node("create schema")
    this.consume(Keyword.CREATE, Keyword.SCHEMA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSequenceStatement() {
    const node = new Node("create sequence")
    this.consume(Keyword.CREATE, Keyword.SEQUENCE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSpfileStatement() {
    const node = new Node("create spfile")
    this.consume(Keyword.CREATE, Keyword.SPFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createSynonymStatement() {
    const node = new Node("create synonym")
    this.consume(Keyword.CREATE, Keyword.SYNONYM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTableStatement() {
    const node = new Node("create table")
    this.consume(Keyword.CREATE, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTablespaceSetStatement() {
    const node = new Node("create tablespace set")
    this.consume(Keyword.CREATE, Keyword.TABLESPACE, Keyword.SET)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTablespaceStatement() {
    const node = new Node("create tablespace")
    this.consume(Keyword.CREATE, Keyword.TABLESPACE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTriggerStatement() {
    const node = new Node("create trigger")
    this.consume(Keyword.CREATE, Keyword.TRIGGER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTypeBodyStatement() {
    const node = new Node("create type body")
    this.consume(Keyword.CREATE, Keyword.TYPE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createTypeStatement() {
    const node = new Node("create type")
    this.consume(Keyword.CREATE, Keyword.TYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createUserStatement() {
    const node = new Node("create user")
    this.consume(Keyword.CREATE, Keyword.USER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private createViewStatement() {
    const node = new Node("create view")
    this.consume(Keyword.CREATE, Keyword.VIEW)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterAnalyticViewStatement() {
    const node = new Node("alter analytic view")
    this.consume(Keyword.ALTER, Keyword.ANALYTIC, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterAttributeDimensionStatement() {
    const node = new Node("alter attribute dimension")
    this.consume(Keyword.ALTER, Keyword.ATTRIBUTE, Keyword.DIMENSION)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterAuditPolicyStatement() {
    const node = new Node("alter audit policy")
    this.consume(Keyword.ALTER, Keyword.AUDIT, Keyword.POLICY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterClusterStatement() {
    const node = new Node("alter cluster")
    this.consume(Keyword.ALTER, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDatabaseDictionaryStatement() {
    const node = new Node("alter database dictionary")
    this.consume(Keyword.ALTER, Keyword.DATABASE, Keyword.DICTIONARY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDatabaseLinkStatement() {
    const node = new Node("alter database link")
    this.consume(Keyword.ALTER, Keyword.DATABASE, Keyword.LINK)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDatabaseStatement() {
    const node = new Node("alter database")
    this.consume(Keyword.ALTER, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDimensionStatement() {
    const node = new Node("alter dimension")
    this.consume(Keyword.ALTER, Keyword.DIMENSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterDiskgroupStatement() {
    const node = new Node("alter diskgroup")
    this.consume(Keyword.ALTER, Keyword.DISKGROUP)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterEditionStatement() {
    const node = new Node("alter edition")
    this.consume(Keyword.ALTER, Keyword.EDITION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterFunctionStatement() {
    const node = new Node("alter function")
    this.consume(Keyword.ALTER, Keyword.FUNCTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterHierarchyStatement() {
    const node = new Node("alter hierarchy")
    this.consume(Keyword.ALTER, Keyword.HIERARCHY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterIndexStatement() {
    const node = new Node("alter index")
    this.consume(Keyword.ALTER, Keyword.INDEX)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterIndextypeStatement() {
    const node = new Node("alter indextype")
    this.consume(Keyword.ALTER, Keyword.INDEXTYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterInmemoryJoinGroupStatement() {
    const node = new Node("alter inmemory join group")
    this.consume(Keyword.ALTER, Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterJavaStatement() {
    const node = new Node("alter java")
    this.consume(Keyword.ALTER, Keyword.JAVA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterLibraryStatement() {
    const node = new Node("alter library")
    this.consume(Keyword.ALTER, Keyword.LIBRARY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterLockdownProfileStatement() {
    const node = new Node("alter lockdown profile")
    this.consume(Keyword.ALTER, Keyword.LOCKDOWN, Keyword.PROFILE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterMaterializedViewLogStatement() {
    const node = new Node("alter materialized view log")
    this.consume(Keyword.ALTER, Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterMaterializedViewStatement() {
    const node = new Node("alter materialized view")
    this.consume(Keyword.ALTER, Keyword.MATERIALIZED, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterOperatorStatement() {
    const node = new Node("alter operator")
    this.consume(Keyword.ALTER, Keyword.OPERATOR)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterOutlineStatement() {
    const node = new Node("alter outline")
    this.consume(Keyword.ALTER, Keyword.OUTLINE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterPackageStatement() {
    const node = new Node("alter package")
    this.consume(Keyword.ALTER, Keyword.PACKAGE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterPluggableDatabaseStatement() {
    const node = new Node("alter pluggable database")
    this.consume(Keyword.ALTER, Keyword.PLUGGABLE, Keyword.DATABASE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterProcedureStatement() {
    const node = new Node("alter procedure")
    this.consume(Keyword.ALTER, Keyword.PROCEDURE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterProfileStatement() {
    const node = new Node("alter profile")
    this.consume(Keyword.ALTER, Keyword.PROFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterResourceCostStatement() {
    const node = new Node("alter resource cost")
    this.consume(Keyword.ALTER, Keyword.RESOURCE, Keyword.COST)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterRoleStatement() {
    const node = new Node("alter role")
    this.consume(Keyword.ALTER, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }
  
  private alterRollbackSegmentStatement() {
    const node = new Node("alter rollback segment")
    this.consume(Keyword.ALTER, Keyword.ROLLBACK, Keyword.SEGMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSequenceStatement() {
    const node = new Node("alter sequence")
    this.consume(Keyword.ALTER, Keyword.SEQUENCE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSessionStatement() {
    const node = new Node("alter session")
    this.consume(Keyword.ALTER, Keyword.SESSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSynonymStatement() {
    const node = new Node("alter synonym")
    this.consume(Keyword.ALTER, Keyword.SYNONYM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterSystemStatement() {
    const node = new Node("alter system")
    this.consume(Keyword.ALTER, Keyword.SYSTEM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTableStatement() {
    const node = new Node("alter table")
    this.consume(Keyword.ALTER, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTablespaceSetStatement() {
    const node = new Node("alter tablespace set")
    this.consume(Keyword.ALTER, Keyword.TABLESPACE, Keyword.SET)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTablespaceStatement() {
    const node = new Node("alter tablespace")
    this.consume(Keyword.ALTER, Keyword.TABLESPACE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTriggerStatement() {
    const node = new Node("alter trigger")
    this.consume(Keyword.ALTER, Keyword.TRIGGER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTypeBodyStatement() {
    const node = new Node("alter type body")
    this.consume(Keyword.ALTER, Keyword.TYPE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterTypeStatement() {
    const node = new Node("alter type")
    this.consume(Keyword.ALTER, Keyword.TYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterUserStatement() {
    const node = new Node("alter user")
    this.consume(Keyword.ALTER, Keyword.USER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private alterViewStatement() {
    const node = new Node("alter view")
    this.consume(Keyword.ALTER, Keyword.VIEW)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropAnalyticViewStatement() {
    const node = new Node("drop analytic view")
    this.consume(Keyword.DROP, Keyword.ANALYTIC, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropAttributeDimensionStatement() {
    const node = new Node("drop attribute dimension")
    this.consume(Keyword.DROP, Keyword.ATTRIBUTE, Keyword.DIMENSION)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropAuditPolicyStatement() {
    const node = new Node("drop audit policy")
    this.consume(Keyword.DROP, Keyword.AUDIT, Keyword.POLICY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropClusterStatement() {
    const node = new Node("drop cluster")
    this.consume(Keyword.DROP, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropContextStatement() {
    const node = new Node("drop context")
    this.consume(Keyword.DROP, Keyword.CONTEXT)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDatabaseLinkStatement() {
    const node = new Node("drop database link")
    this.consume(Keyword.DROP, Keyword.DATABASE, Keyword.LINK)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDatabaseStatement() {
    const node = new Node("drop database")
    this.consume(Keyword.DROP, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDimensionStatement() {
    const node = new Node("drop dimension")
    this.consume(Keyword.DROP, Keyword.DIMENSION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDirectoryStatement() {
    const node = new Node("drop directory")
    this.consume(Keyword.DROP, Keyword.DIRECTORY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropDiskgroupStatement() {
    const node = new Node("drop diskgroup")
    this.consume(Keyword.DROP, Keyword.DISKGROUP)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropEditionStatement() {
    const node = new Node("drop edition")
    this.consume(Keyword.DROP, Keyword.EDITION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropFunctionStatement() {
    const node = new Node("drop function")
    this.consume(Keyword.DROP, Keyword.FUNCTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropHierarchyStatement() {
    const node = new Node("drop hierarchy")
    this.consume(Keyword.DROP, Keyword.HIERARCHY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropIndexStatement() {
    const node = new Node("drop index")
    this.consume(Keyword.DROP, Keyword.INDEX)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropIndextypeStatement() {
    const node = new Node("drop indextype")
    this.consume(Keyword.DROP, Keyword.INDEXTYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropInmemoryJoinGroupStatement() {
    const node = new Node("drop inmemory join group")
    this.consume(Keyword.DROP, Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropJavaStatement() {
    const node = new Node("drop java")
    this.consume(Keyword.DROP, Keyword.JAVA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropLibraryStatement() {
    const node = new Node("drop library")
    this.consume(Keyword.DROP, Keyword.LIBRARY)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropLockdownProfileStatement() {
    const node = new Node("drop lockdown profile")
    this.consume(Keyword.DROP, Keyword.LOCKDOWN, Keyword.PROFILE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropMaterializedViewLogStatement() {
    const node = new Node("drop materialized view log")
    this.consume(Keyword.DROP, Keyword.MATERIALIZED, Keyword.VIEW, Keyword.LOG)
    node.add(this.token(-4), this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropMaterializedViewStatement() {
    const node = new Node("drop materialized view")
    this.consume(Keyword.DROP, Keyword.MATERIALIZED, Keyword.VIEW)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropOperatorStatement() {
    const node = new Node("drop operator")
    this.consume(Keyword.DROP, Keyword.OPERATOR)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropOutlineStatement() {
    const node = new Node("drop outline")
    this.consume(Keyword.DROP, Keyword.OUTLINE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropPackageStatement() {
    const node = new Node("drop package")
    this.consume(Keyword.DROP, Keyword.PACKAGE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropPluggableDatabaseStatement() {
    const node = new Node("drop pluggable database")
    this.consume(Keyword.DROP, Keyword.PLUGGABLE, Keyword.DATABASE)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropProcedureStatement() {
    const node = new Node("drop procedure")
    this.consume(Keyword.DROP, Keyword.PROCEDURE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropProfileStatement() {
    const node = new Node("drop profile")
    this.consume(Keyword.DROP, Keyword.PROFILE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropRestorePointStatement() {
    const node = new Node("drop restore point")
    this.consume(Keyword.DROP, Keyword.RESTORE, Keyword.POINT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropRoleStatement() {
    const node = new Node("drop role")
    this.consume(Keyword.DROP, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }
  
  private dropRollbackSegmentStatement() {
    const node = new Node("drop rollback segment")
    this.consume(Keyword.DROP, Keyword.ROLLBACK, Keyword.SEGMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropSchemaStatement() {
    const node = new Node("drop schema")
    this.consume(Keyword.DROP, Keyword.SCHEMA)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropSequenceStatement() {
    const node = new Node("drop sequence")
    this.consume(Keyword.DROP, Keyword.SEQUENCE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropSynonymStatement() {
    const node = new Node("drop synonym")
    this.consume(Keyword.DROP, Keyword.SYNONYM)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTableStatement() {
    const node = new Node("drop table")
    this.consume(Keyword.DROP, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTablespaceSetStatement() {
    const node = new Node("drop tablespace set")
    this.consume(Keyword.DROP, Keyword.TABLESPACE, Keyword.SET)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTablespaceStatement() {
    const node = new Node("drop tablespace")
    this.consume(Keyword.DROP, Keyword.TABLESPACE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTriggerStatement() {
    const node = new Node("drop trigger")
    this.consume(Keyword.DROP, Keyword.TRIGGER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTypeBodyStatement() {
    const node = new Node("drop type body")
    this.consume(Keyword.DROP, Keyword.TYPE, Keyword.BODY)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropTypeStatement() {
    const node = new Node("drop type")
    this.consume(Keyword.DROP, Keyword.TYPE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropUserStatement() {
    const node = new Node("drop user")
    this.consume(Keyword.DROP, Keyword.USER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private dropViewStatement() {
    const node = new Node("drop view")
    this.consume(Keyword.DROP, Keyword.VIEW)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private truncateClusterStatement() {
    const node = new Node("truncate cluster")
    this.consume(Keyword.TRUNCATE, Keyword.CLUSTER)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private truncateTableStatement() {
    const node = new Node("truncate table")
    this.consume(Keyword.TRUNCATE, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private setConstraintStatement() {
    const node = new Node("set constraint")
    this.consume(Keyword.SET)
    node.add(this.token(-1))

    if (this.consumeIf(Keyword.CONSTRAINTS)) {
      node.add(this.token(-1))
    } else {
      this.consume(Keyword.CONSTRAINT)
      node.add(this.token(-1))
    }

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private setRoleStatement() {
    const node = new Node("set role")
    this.consume(Keyword.SET, Keyword.ROLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private setTransactionStatement() {
    const node = new Node("set transaction")
    this.consume(Keyword.SET, Keyword.TRANSACTION)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private administerKeyManagementStatement() {
    const node = new Node("administer key management")
    this.consume(Keyword.ADMINISTER, Keyword.KEY, Keyword.MANAGEMENT)
    node.add(this.token(-3), this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private analyzeStatement() {
    const node = new Node("analyze")
    this.consume(Keyword.ANALYZE)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private associateStatisticsStatement() {
    const node = new Node("associate statistics")
    this.consume(Keyword.ASSOCIATE, Keyword.STATISTICS)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private auditStatement() {
    const node = new Node("audit")
    this.consume(Keyword.AUDIT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private callStatement() {
    const node = new Node("call")
    this.consume(Keyword.CALL)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private commentStatement() {
    const node = new Node("comment")
    this.consume(Keyword.COMMENT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private commitStatement() {
    const node = new Node("commit")
    this.consume(Keyword.COMMIT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private disassociateStatisticsStatement() {
    const node = new Node("disassociate statistics")
    this.consume(Keyword.DISASSOCIATE, Keyword.STATISTICS)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private flashbackDatabaseStatement() {
    const node = new Node("flashback database")
    this.consume(Keyword.FLASHBACK, Keyword.DATABASE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private flashbackTableStatement() {
    const node = new Node("flashback table")
    this.consume(Keyword.FLASHBACK, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private grantStatement() {
    const node = new Node("grant")
    this.consume(Keyword.GRANT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private lockTableStatement() {
    const node = new Node("lock table")
    this.consume(Keyword.LOCK, Keyword.TABLE)
    node.add(this.token(-2), this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private noauditStatement() {
    const node = new Node("noaudit")
    this.consume(Keyword.NOAUDIT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private purgeStatement() {
    const node = new Node("purge")
    this.consume(Keyword.PURGE)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private renameStatement() {
    const node = new Node("rename")
    this.consume(Keyword.RENAME)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private revokeStatement() {
    const node = new Node("revoke")
    this.consume(Keyword.REVOKE)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private rollbackStatement() {
    const node = new Node("rollback")
    this.consume(Keyword.ROLLBACK)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private savepointStatement() {
    const node = new Node("savepoint")
    this.consume(Keyword.SAVEPOINT)
    node.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private declareBlock() {
    const node = new Node("block")

    const declareNode = new Node("declare")
    this.consume(Keyword.DECLARE)
    declareNode.add(this.token(-1))

    while (this.token()
      && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
        if (this.consumeIf(Keyword.EXCEPTION)) {
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
    this.consume(Keyword.BEGIN)
    node.add(this.token(-1))

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else if (this.peekIf(Keyword.DECLARE)) {
        node.add(this.declareBlock())
      } else if (this.peekIf(Keyword.BEGIN)) {
        node.add(this.beginBlock())
      } else if (this.peekIf(Keyword.EXCEPTION)) {
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }

    return node
  }

  private procedureBlock() {
    const node = new Node("nested_procedure")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }

  private functionBlock() {
    const node = new Node("nested_function")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }

  private exceptionBlock() {
    const node = new Node("exception")

    while (this.token()
    && !this.peekIf(TokenType.Delimiter)
    ) {
      if (this.consumeIf(Keyword.END)) {
        node.add(this.token(-1))
        this.consume(TokenType.SemiColon)
        node.add(this.token(-1))
        break
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }
    return node
  }

  private insertClause(withNode?: Node) {
    const node = new Node("insert")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.INSERT, Keyword.INTO)
    node.add(this.token(-2), this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private updateClause(withNode?: Node) {
    const node = new Node("update")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.UPDATE)
    node.add(this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private deleteClause(withNode?: Node) {
    const node = new Node("delete")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.DELETE, Keyword.FROM)
    node.add(this.token(-2), this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private mergeClause(withNode?: Node) {
    const node = new Node("merge")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.MERGE, Keyword.INTO)
    node.add(this.token(-2), this.token(-1))

    this.parseName(node)
    
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
    ) {
      this.consume()
      node.add(this.token(-1))
    }

    return node
  }

  private selectClause(withNode?: Node) {
    const node = new Node("select")
    if (withNode) {
      node.add(withNode)
    }
    this.consume(Keyword.SELECT)
    node.add(this.token(-1))

    let depth = 0
    while (this.token()
      && !this.peekIf(TokenType.SemiColon)
      && !this.peekIf(TokenType.Delimiter)
      && (depth == 0 && !this.peekIf(TokenType.RightParen))
    ) {
      if (this.consumeIf(TokenType.LeftParen)) {
        node.add(this.token(-1))
        depth++
      } else if (this.consumeIf(TokenType.RightParen)) {
        node.add(this.token(-1))
        depth--
      } else {
        this.consume()
        node.add(this.token(-1))
      }
    }

    return node
  }

  private withClause() {
    const node = new Node("with")

    this.consume(Keyword.WITH)
    node.add(this.token(-1))

    while (this.token()) {
      node.add(this.identifier("name"))
      if (this.consumeIf(TokenType.LeftParen)) {
        while (this.token()) {
          node.add(this.identifier("column"))

          if (this.consumeIf(TokenType.Comma)) {
            node.add(this.token(-1))
          } else {
            break
          }
        }

        this.consume(TokenType.RightParen)
        node.add(this.token(-1))
      }

      this.consume(Keyword.AS)
      node.add(this.token(-1))

      this.consume(TokenType.LeftParen)
      node.add(this.token(-1))

      node.add(this.selectClause())

      this.consume(TokenType.RightParen)
      node.add(this.token(-1))

      if (this.consumeIf(TokenType.Comma)) {
        node.add(this.token(-1))
      } else {
        break
      }
    }

    return node
  }

  private parseName(stmt: Node) {
    const nameNode = this.identifier("name")
    stmt.add(nameNode)
    if (this.consumeIf(TokenType.Dot)) {
      stmt.add(this.token(-1))
      nameNode.name = "schema_name"
      stmt.add(this.identifier("name"))
    }
  }

  private identifier(name: string) {
    const node = new Node(name)
    if (this.consumeIf(TokenType.QuotedIdentifier)) {
      node.add(this.token(-1))
      node.value = dequote(this.token(-1).text)
    } else if (this.consumeIf(TokenType.Identifier)) {
      node.add(this.token(-1))
      node.value = this.token(-1).text
    } else {
      throw this.createParseError()
    }
    return node
  }
}