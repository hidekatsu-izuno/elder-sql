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

const KeywordMap = new Map<string, Keyword>()
export class Keyword extends TokenType {
  static ABORT = new Keyword("ABORT")
  static ACCESS = new Keyword("ACCESS", { reserved: true })
  static ACCESSED = new Keyword("ACCESSED")
  static ACCESSIBLE = new Keyword("ACCESSIBLE")
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
  static AGENT = new Keyword("AGENT")
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
  static AUTONOMOUS_TRANSACTION = new Keyword("AUTONOMOUS_TRANSACTION")
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
  static BINARY_INTEGER = new Keyword("BINARY_INTEGER")
  static BITMAP = new Keyword("BITMAP")
  static BLOB = new Keyword("BLOB")
  static BLOCK = new Keyword("BLOCK")
  static BLOCKCHAIN = new Keyword("BLOCKCHAIN")
  static BLOCKSIZE = new Keyword("BLOCKSIZE")
  static BODY = new Keyword("BODY")
  static BOTH = new Keyword("BOTH")
  static BREADTH = new Keyword("BREADTH")
  static BUFFER_CACHE = new Keyword("BUFFER_CACHE")
  static BULK = new Keyword("BULK")
  static BULK_ROWCOUNT = new Keyword("BULK_ROWCOUNT")
  static BULK_EXCEPTIONS = new Keyword("BULK_EXCEPTIONS")
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
  static CHARSETID = new Keyword("CHARSETID")
  static CHARSETFORM = new Keyword("CHARSETFORM")
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
  static COLLECT = new Keyword("COLLECT")
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
  static COUNT = new Keyword("COUNT")
  static COVERAGE = new Keyword("COVERAGE")
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
  static DEBUG = new Keyword("DEBUG")
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
  static DELETING = new Keyword("DELETING")
  static DELIGATE = new Keyword("DELIGATE")
  static DEMAND = new Keyword("DEMAND")
  static DEPENDENT = new Keyword("DEPENDENT")
  static DEPTH = new Keyword("DEPTH")
  static DEPLICATE = new Keyword("DEPLICATE")
  static DESC = new Keyword("DESC", { reserved: true })
  static DESCRIPTION = new Keyword("DESCRIPTION")
  static DETERMINES = new Keyword("DETERMINES")
  static DETERMINISTIC = new Keyword("DETERMINISTIC")
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
  static DURATION = new Keyword("DURATION")
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
  static ELSIF = new Keyword("ELSIF")
  static ENABLE = new Keyword("ENABLE")
  static ENABLE_ALL = new Keyword("ENABLE_ALL")
  static ENCRYPT = new Keyword("ENCRYPT")
  static ENCRYPTION = new Keyword("ENCRYPTION")
  static END = new Keyword("END", { reserved: true })
  static ENFORCED = new Keyword("ENFORCED")
  static ENTERPRISE = new Keyword("ENTERPRISE")
  static ERROR_CODE = new Keyword("ERROR_CODE")
  static ERROR_INDEX = new Keyword("ERROR_INDEX")
  static ERRORS = new Keyword("ERRORS")
  static EXCEPT = new Keyword("EXCEPT")
  static EXCEPTION = new Keyword("EXCEPTION", { reserved: true })
  static EXCEPTION_INIT = new Keyword("EXCEPTION_INIT")
  static EXCEPTIONS = new Keyword("EXCEPTIONS")
  static EXCHANGE = new Keyword("EXCHANGE")
  static EXCLUDE = new Keyword("EXCLUDE")
  static EXCLUSIVE = new Keyword("EXCLUSIVE", { reserved: true })
  static EXISTS = new Keyword("EXISTS", { reserved: true })
  static EXIT = new Keyword("EXIT")
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
  static FORALL = new Keyword("FORALL")
  static FORCE = new Keyword("FORCE")
  static FOREIGN = new Keyword("FOREIGN")
  static FOUND = new Keyword("FOUND")
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
  static INDICES = new Keyword("INDICES")
  static INDICATOR = new Keyword("INDICATOR")
  static INITIAL = new Keyword("INITIAL", { reserved: true })
  static INITIALIZED = new Keyword("INITIALIZED")
  static INITRANS = new Keyword("INITRANS")
  static INLINE = new Keyword("INLINE")
  static INMEMORY = new Keyword("INMEMORY")
  static INNER = new Keyword("INNER")
  static INOUT = new Keyword("INOUT")
  static INSERT = new Keyword("INSERT", { reserved: true })
  static INSERTING = new Keyword("INSERTING")
  static INSTALL = new Keyword("INSTALL")
  static INSTANCE = new Keyword("INSTANCE")
  static INSTANCES = new Keyword("INSTANCES")
  static INSTANTIABLE = new Keyword("INSTANTIABLE")
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
  static ISOPEN = new Keyword("ISOPEN")
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
  static LENGTH = new Keyword("LENGTH")
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
  static MAP = new Keyword("MAP")
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
  static MAXLEN = new Keyword("MAXLEN")
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
  static NOT_FEASIBLE = new Keyword("NOT_FEASIBLE")
  static NOT_FEASIBLE_START = new Keyword("NOT_FEASIBLE_START")
  static NOT_FEASIBLE_END = new Keyword("NOT_FEASIBLE_END")
  static NOTFOUND = new Keyword("NOTFOUND")
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
  static OUT = new Keyword("OUT")
  static OUTER = new Keyword("OUTER")
  static OUTLINE = new Keyword("OUTLINE")
  static OVERFLOW = new Keyword("OVERFLOW")
  static OVERLAPS = new Keyword("OVERLAPS", { reserved: true })
  static OVERRIDING = new Keyword("OVERRIDING")
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
  static PARALLEL_ENABLE = new Keyword("PARALLEL_ENABLE")
  static PARTITION = new Keyword("PARTITION")
  static PARTITIONSET = new Keyword("PARTITIONSET")
  static PFILE = new Keyword("PFILE")
  static PHYSICAL = new Keyword("PHYSICAL")
  static PIPE = new Keyword("PIPE")
  static PIPELINED = new Keyword("PIPELINED")
  static PIVOT = new Keyword("PIVOT")
  static PLAN = new Keyword("PLAN")
  static PLS_INTEGER = new Keyword("PLS_INTEGER")
  static PLUGGABLE = new Keyword("PLUGGABLE")
  static POINT = new Keyword("POINT")
  static POLICY = new Keyword("POLICY")
  static POLYMORPHIC = new Keyword("POLYMORPHIC")
  static PORT = new Keyword("PORT")
  static POST_TRANSACTION = new Keyword("POST_TRANSACTION")
  static POWER = new Keyword("POWER")
  static PRAGMA = new Keyword("PRAGMA")
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
  static RAISE = new Keyword("RAISE")
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
  static RELIES_ON = new Keyword("RELIES_ON")
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
  static RESTRICT_REFERENCES = new Keyword("RESTRICT_REFERENCES")
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
  static RNDS = new Keyword("RNDS")
  static RNPS = new Keyword("RNPS")
  static ROLE = new Keyword("ROLE")
  static ROLES = new Keyword("ROLES")
  static ROLLBACK = new Keyword("ROLLBACK")
  static ROLLING = new Keyword("ROLLING")
  static ROLLUP = new Keyword("ROLLUP")
  static ROOT = new Keyword("ROOT")
  static ROW = new Keyword("ROW", { reserved: true })
  static ROWCOUNT = new Keyword("ROWCOUNT")
  static ROWDEPENDENCIES = new Keyword("ROWDEPENDENCIES")
  static ROWID = new Keyword("ROWID", { reserved: true })
  static ROWNUM = new Keyword("ROWNUM", { reserved: true })
  static ROWS = new Keyword("ROWS", { reserved: true })
  static ROWTYPE = new Keyword("ROWTYPE")
  static RULES = new Keyword("RULES")
  static RUNNING = new Keyword("RUNNING")
  static SALT = new Keyword("SALT")
  static SAMPLE = new Keyword("SAMPLE")
  static SAVE = new Keyword("SAVE")
  static SAVEPOINT = new Keyword("SAVEPOINT")
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
  static SELF = new Keyword("SELF")
  static SESSION = new Keyword("SESSION", { reserved: true })
  static SESSIONS_PER_USER = new Keyword("SESSIONS_PER_USER")
  static SET = new Keyword("SET", { reserved: true })
  static SETS = new Keyword("SETS")
  static SETTINGS = new Keyword("SETTINGS")
  static SEQUENCE = new Keyword("SEQUENCE")
  static SEQUENTIAL = new Keyword("SEQUENTIAL")
  static SERIALIZABLE = new Keyword("SERIALIZABLE")
  static SERIALLY_REUSABLE = new Keyword("SERIALLY_REUSABLE")
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
  static SPECIFICATION = new Keyword("SPECIFICATION")
  static SPFILE = new Keyword("SPFILE")
  static SPLIT = new Keyword("SPLIT")
  static SOURCE = new Keyword("SOURCE")
  static SOURCE_FILE_DIRECTORY = new Keyword("SOURCE_FILE_DIRECTORY")
  static SOURCE_FILE_NAME_CONVERT = new Keyword("SOURCE_FILE_NAME_CONVERT")
  static SQL = new Keyword("SQL", { reserved: true })
  static SQL_MACRO = new Keyword("SQL_MACRO")
  static SQLCODE = new Keyword("SQLCODE")
  static SQLERRM = new Keyword("SQLERRM")
  static STANDARD = new Keyword("STANDARD")
  static STANDBY = new Keyword("STANDBY")
  static STANDBYS = new Keyword("STANDBYS")
  static START = new Keyword("START", { reserved: true })
  static STATE = new Keyword("STATE")
  static STATEMENT = new Keyword("STATEMENT")
  static STATEMENT_ID = new Keyword("STATEMENT_ID")
  static STATEMENTS = new Keyword("STATEMENTS")
  static STATIC = new Keyword("STATIC")
  static STATISTICS = new Keyword("STATISTICS")
  static STORAGE = new Keyword("STORAGE")
  static STORE = new Keyword("STORE")
  static STRING = new Keyword("STRING")
  static STRIPE_WIDTH = new Keyword("STRIPE_WIDTH")
  static STRIPE_COLUMNS = new Keyword("STRIPE_COLUMNS")
  static STRUCT = new Keyword("STRUCT")
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
  static TDO = new Keyword("TDO")
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
  static TRIM = new Keyword("TRIM")
  static TRUST = new Keyword("TRUST")
  static TRUSTED = new Keyword("TRUSTED")
  static TRUNCATE = new Keyword("TRUNCATE")
  static TRANSLATION = new Keyword("TRANSLATION")
  static TRANSACTION = new Keyword("TRANSACTION")
  static TRUE = new Keyword("TRUE")
  static TYPE = new Keyword("TYPE", { reserved: true })
  static TYPES = new Keyword("TYPES")
  static UDF = new Keyword("UDF")
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
  static UPDATING = new Keyword("UPDATING")
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
  static USING_NLS_COMP = new Keyword("USING_NLS_COMP")
  static VARRAY = new Keyword("VARRAY")
  static VARRAYS = new Keyword("VARRAYS")
  static VALIDATE = new Keyword("VALIDATE", { reserved: true })
  static VALUE = new Keyword("VALUE")
  static VALUES = new Keyword("VALUES", { reserved: true })
  static VARYING = new Keyword("VARYING")
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
  static WNDS = new Keyword("WNDS")
  static WNPS = new Keyword("WNPS")
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
  static OPE_PERCENT = new Keyword("OPE_PERCENT", { value: "%" })

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
      const max = Math.min(tokens.length, 5)
      for (let i = 1; i < max; i++) {
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
    }
    return false
  }
}

export class OracleParser extends Parser {
  static parse: ParseFunction = (input: string, options: Record<string, any> = {}) => {
    const tokens = new OracleLexer(options).lex(input)
    return new OracleParser(tokens, options).root()
  }

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

  command() {
    const stmt = new Node("command")
    return stmt
  }

  statement() {
    let explainPlan
    let stmt

    try {
      if (this.peekIf(Keyword.EXPLAIN)) {
        explainPlan = new Node("explain plan")
        explainPlan.add(this.consume())
        explainPlan.add(this.consume(Keyword.PLAN))

        if (this.peekIf(Keyword.SET)) {
          explainPlan.add(this.consume())
          explainPlan.add(this.consume(Keyword.STATEMENT_ID))
          explainPlan.add(this.consume(Keyword.OPE_EQ))
          explainPlan.add(this.consume(TokenType.String))
        }

        if (this.peekIf(Keyword.INTO)) {
          explainPlan.add(this.consume())
        }

        explainPlan.add(this.consume(Keyword.FOR))
      }

      if (this.peekIf(Keyword.CREATE)) {
        const mark = this.pos
        this.consume()

        while (this.token()
          && !this.peekIf(TokenType.SemiColon)
          && !this.peekIf(TokenType.Delimiter)
        ) {
          if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.createAnalyticViewStatement()
            break
          } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.createAttributeDimensionStatement()
            break
          } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.createAuditPolicyStatement()
            break
          } else if (this.peekIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.createClusterStatement()
            break
          } else if (this.peekIf(Keyword.CONTEXT)) {
            this.pos = mark
            stmt = this.createContextStatement()
            break
          } else if (this.peekIf(Keyword.CONTROLFILE)) {
            this.pos = mark
            stmt = this.createControlfileStatement()
            break
          } else if (this.peekIf(Keyword.DATABASE)) {
            this.consume()
            if (this.peekIf(Keyword.LINK)) {
              this.pos = mark
              stmt = this.createDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.createDatabaseStatement()  
            }
            break
          } else if (this.peekIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.createDimensionStatement()
            break
          } else if (this.peekIf(Keyword.DIRECTORY)) {
            this.pos = mark
            stmt = this.createDirectoryStatement()
            break
          } else if (this.peekIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.createDiskgroupStatement()
            break
          } else if (this.peekIf(Keyword.EDITION)) {
            this.pos = mark
            stmt = this.createEditionStatement()
            break
          } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.createEditionStatement()
            break
          } else if (this.peekIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.createFunctionStatement()
            break
          } else if (this.peekIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.createHierarchyStatement()
            break
          } else if (this.peekIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.createIndexStatement()
            break
          } else if (this.peekIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.createIndextypeStatement()
            break
          } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.createInmemoryJoinGroupStatement()
            break
          } else if (this.peekIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.createJavaStatement()
            break
          } else if (this.peekIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.createLibraryStatement()
            break
          } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.createLockdownProfileStatement()
            break
          } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.LOG)) {
              stmt = this.createMaterializedViewLogStatement()
            } else if (this.peekIf(Keyword.ZONEMAP)) {
              stmt = this.createMaterializedViewLogStatement()
            } else {
              stmt = this.createMaterializedViewStatement()
            }
            break
          } else if (this.peekIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.createOperatorStatement()
            break
          } else if (this.peekIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.createOutlineStatement()
            break
          } else if (this.peekIf(Keyword.PACKAGE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.BODY)) {
              stmt = this.createPackageBodyStatement()
            } else {
              stmt = this.createPackageStatement()
            }
            break
          } else if (this.peekIf(Keyword.PFILE)) {
            this.pos = mark
            stmt = this.createPfileStatement()
            break
          } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.createPluggableDatabaseStatement()
            break
          } else if (this.peekIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.createProcedureStatement()
            break
          } else if (this.peekIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.createProfileStatement()
            break
          } else if (this.peekIf(Keyword.RESTORE, Keyword.POINT)) {
            this.pos = mark
            stmt = this.createRestorePointStatement()
            break
          } else if (this.peekIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.createRoleStatement()
            break
          } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.createRollbackSegmentStatement()
            break
          } else if (this.peekIf(Keyword.SCHEMA)) {
            this.pos = mark
            stmt = this.createSchemaStatement()
            break
          } else if (this.peekIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.createSequenceStatement()
            break
          } else if (this.peekIf(Keyword.SPFILE)) {
            this.pos = mark
            stmt = this.createSpfileStatement()
            break
          } else if (this.peekIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.createSynonymStatement()
            break
          } else if (this.peekIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.createTableStatement()
            break
          } else if (this.peekIf(Keyword.TABLESPACE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.SET)) {
              stmt = this.createTablespaceSetStatement()
            } else {
              stmt = this.createTablespaceStatement()  
            }
            break
          } else if (this.peekIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.createTriggerStatement()
            break
          } else if (this.peekIf(Keyword.TYPE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.BODY)) {
              stmt = this.createTypeBodyStatement()
            } else {
              stmt = this.createTypeStatement()
            }
            break
          } else if (this.peekIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.createUserStatement()
            break
          } else if (this.peekIf(Keyword.VIEW)) {
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
          if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.alterAnalyticViewStatement()
            break
          } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.alterAttributeDimensionStatement()
            break
          } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.alterAuditPolicyStatement()
            break
          } else if (this.peekIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.alterClusterStatement()
            break
          } else if (this.peekIf(Keyword.DATABASE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.DICTIONARY)) {
              stmt = this.alterDatabaseDictionaryStatement()
            } else if (this.peekIf(Keyword.LINK)) {
              stmt = this.alterDatabaseLinkStatement()  
            } else {
              stmt = this.alterDatabaseStatement()  
            }
            break
          } else if (this.peekIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.alterDimensionStatement()
            break
          } else if (this.peekIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.alterDiskgroupStatement()
            break
          } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.alterEditionStatement()
            break
          } else if (this.peekIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.alterFunctionStatement()
            break
          } else if (this.peekIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.alterHierarchyStatement()
            break
          } else if (this.peekIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.alterIndexStatement()
            break
          } else if (this.peekIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.alterIndextypeStatement()
            break
          } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.alterInmemoryJoinGroupStatement()
            break
          } else if (this.peekIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.alterJavaStatement()
            break
          } else if (this.peekIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.alterLibraryStatement()
            break
          } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.alterLockdownProfileStatement()
            break
          } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.LOG)) {
              stmt = this.alterMaterializedViewLogStatement()
            } else if (this.peekIf(Keyword.ZONEMAP)) {
              stmt = this.alterMaterializedViewLogStatement()
            } else {
              stmt = this.alterMaterializedViewStatement()
            }
            break
          } else if (this.peekIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.alterOperatorStatement()
            break
          } else if (this.peekIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.alterOutlineStatement()
            break
          } else if (this.peekIf(Keyword.PACKAGE)) {
            this.pos = mark
            stmt = this.alterPackageStatement()
            break
          } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.alterPluggableDatabaseStatement()
            break
          } else if (this.peekIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.alterProcedureStatement()
            break
          } else if (this.peekIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.alterProfileStatement()
            break
          } else if (this.peekIf(Keyword.RESOURCE, Keyword.COST)) {
            this.pos = mark
            stmt = this.alterResourceCostStatement()
            break
          } else if (this.peekIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.alterRoleStatement()
            break
          } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.alterRollbackSegmentStatement()
            break
          } else if (this.peekIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.alterSequenceStatement()
            break
          } else if (this.peekIf(Keyword.SESSION)) {
            this.pos = mark
            stmt = this.alterSessionStatement()
            break
          } else if (this.peekIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.alterSynonymStatement()
            break
          } else if (this.peekIf(Keyword.SYSTEM)) {
            this.pos = mark
            stmt = this.alterSystemStatement()
            break
          } else if (this.peekIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.alterTableStatement()
            break
          } else if (this.peekIf(Keyword.TABLESPACE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.SET)) {
              stmt = this.alterTablespaceSetStatement()
            } else {
              stmt = this.alterTablespaceStatement()  
            }
            break
          } else if (this.peekIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.alterTriggerStatement()
            break
          } else if (this.peekIf(Keyword.TYPE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.BODY)) {
              stmt = this.alterTypeBodyStatement()
            } else {
              stmt = this.alterTypeStatement()
            }
            break
          } else if (this.peekIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.alterUserStatement()
            break
          } else if (this.peekIf(Keyword.VIEW)) {
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
          if (this.peekIf(Keyword.ANALYTIC, Keyword.VIEW)) {
            this.pos = mark
            stmt = this.dropAnalyticViewStatement()
            break
          } else if (this.peekIf(Keyword.ATTRIBUTE, Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.dropAttributeDimensionStatement()
            break
          } else if (this.peekIf(Keyword.AUDIT, Keyword.POLICY)) {
            this.pos = mark
            stmt = this.dropAuditPolicyStatement()
            break
          } else if (this.peekIf(Keyword.CLUSTER)) {
            this.pos = mark
            stmt = this.dropClusterStatement()
            break
          } else if (this.peekIf(Keyword.CONTEXT)) {
            this.pos = mark
            stmt = this.dropContextStatement()
            break
          } else if (this.peekIf(Keyword.DATABASE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.LINK)) {
              stmt = this.dropDatabaseLinkStatement()  
            } else {
              this.pos = mark
              stmt = this.dropDatabaseStatement()  
            }
            break
          } else if (this.peekIf(Keyword.DIMENSION)) {
            this.pos = mark
            stmt = this.dropDimensionStatement()
            break
          } else if (this.peekIf(Keyword.DIRECTORY)) {
            this.pos = mark
            stmt = this.dropDirectoryStatement()
            break
          } else if (this.peekIf(Keyword.DISKGROUP)) {
            this.pos = mark
            stmt = this.dropDiskgroupStatement()
            break
          } else if (this.peekIf(Keyword.EDITION)) {
            this.pos = mark
            stmt = this.dropEditionStatement()
            break
          } else if (this.peekIf(Keyword.FLASHBACK, Keyword.ARCHIVE)) {
            this.pos = mark
            stmt = this.dropEditionStatement()
            break
          } else if (this.peekIf(Keyword.FUNCTION)) {
            this.pos = mark
            stmt = this.dropFunctionStatement()
            break
          } else if (this.peekIf(Keyword.HIERARCHY)) {
            this.pos = mark
            stmt = this.dropHierarchyStatement()
            break
          } else if (this.peekIf(Keyword.INDEX)) {
            this.pos = mark
            stmt = this.dropIndexStatement()
            break
          } else if (this.peekIf(Keyword.INDEXTYPE)) {
            this.pos = mark
            stmt = this.dropIndextypeStatement()
            break
          } else if (this.peekIf(Keyword.INMEMORY, Keyword.JOIN, Keyword.GROUP)) {
            this.pos = mark
            stmt = this.dropInmemoryJoinGroupStatement()
            break
          } else if (this.peekIf(Keyword.JAVA)) {
            this.pos = mark
            stmt = this.dropJavaStatement()
            break
          } else if (this.peekIf(Keyword.LIBRARY)) {
            this.pos = mark
            stmt = this.dropLibraryStatement()
            break
          } else if (this.peekIf(Keyword.LOCKDOWN, Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.dropLockdownProfileStatement()
            break
          } else if (this.peekIf(Keyword.MATERIALIZED, Keyword.VIEW)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.LOG)) {
              stmt = this.dropMaterializedViewLogStatement()
            } else if (this.peekIf(Keyword.ZONEMAP)) {
              stmt = this.dropMaterializedViewLogStatement()
            } else {
              stmt = this.dropMaterializedViewStatement()
            }
            break
          } else if (this.peekIf(Keyword.OPERATOR)) {
            this.pos = mark
            stmt = this.dropOperatorStatement()
            break
          } else if (this.peekIf(Keyword.OUTLINE)) {
            this.pos = mark
            stmt = this.dropOutlineStatement()
            break
          } else if (this.peekIf(Keyword.PACKAGE)) {
            this.pos = mark
            stmt = this.dropPackageStatement()
            break
          } else if (this.peekIf(Keyword.PLUGGABLE, Keyword.DATABASE)) {
            this.pos = mark
            stmt = this.dropPluggableDatabaseStatement()
            break
          } else if (this.peekIf(Keyword.PROCEDURE)) {
            this.pos = mark
            stmt = this.dropProcedureStatement()
            break
          } else if (this.peekIf(Keyword.PROFILE)) {
            this.pos = mark
            stmt = this.dropProfileStatement()
            break
          } else if (this.peekIf(Keyword.RESTORE, Keyword.POINT)) {
            this.pos = mark
            stmt = this.dropRestorePointStatement()
            break
          } else if (this.peekIf(Keyword.ROLE)) {
            this.pos = mark
            stmt = this.dropRoleStatement()
            break
          } else if (this.peekIf(Keyword.ROLLBACK, Keyword.SEGMENT)) {
            this.pos = mark
            stmt = this.dropRollbackSegmentStatement()
            break
          } else if (this.peekIf(Keyword.SCHEMA)) {
            this.pos = mark
            stmt = this.dropSchemaStatement()
            break
          } else if (this.peekIf(Keyword.SEQUENCE)) {
            this.pos = mark
            stmt = this.dropSequenceStatement()
            break
          } else if (this.peekIf(Keyword.SYNONYM)) {
            this.pos = mark
            stmt = this.dropSynonymStatement()
            break
          } else if (this.peekIf(Keyword.TABLE)) {
            this.pos = mark
            stmt = this.dropTableStatement()
            break
          } else if (this.peekIf(Keyword.TABLESPACE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.SET)) {
              stmt = this.dropTablespaceSetStatement()
            } else {
              stmt = this.dropTablespaceStatement()  
            }
            break
          } else if (this.peekIf(Keyword.TRIGGER)) {
            this.pos = mark
            stmt = this.dropTriggerStatement()
            break
          } else if (this.peekIf(Keyword.TYPE)) {
            this.consume()
            this.pos = mark
            if (this.peekIf(Keyword.BODY)) {
              stmt = this.dropTypeBodyStatement()
            } else {
              stmt = this.dropTypeStatement()
            }
            break
          } else if (this.peekIf(Keyword.USER)) {
            this.pos = mark
            stmt = this.dropUserStatement()
            break
          } else if (this.peekIf(Keyword.VIEW)) {
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

        if (this.peekIf(Keyword.CLUSTER)) {
          this.pos = mark
          stmt = this.truncateClusterStatement()
        } else if (this.peekIf(Keyword.TABLE)) {
          this.pos = mark
          stmt = this.truncateTableStatement()
        }
        if (!stmt) {
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
      && !this.peekIf(TokenType.SemiColon)
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
      && !this.peekIf(TokenType.Delimiter)
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
      && !this.peekIf(TokenType.SemiColon)
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