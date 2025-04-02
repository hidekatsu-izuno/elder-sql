import { Keyword, KeywordMap, TokenType } from "./lexer.ts";

export class SqlTokenType extends TokenType {
	static WhiteSpace = new TokenType("WhiteSpace", { skip: true });
	static LineComment = new TokenType("LineComment", { skip: true });
	static BlockComment = new TokenType("BlockComment", { skip: true });
	static HintComment = new TokenType("HintComment", { skip: true });
	static LineBreak = new TokenType("LineBreak", {
		skip: true,
		separator: true,
	});
	static Delimiter = new TokenType("Delimiter", { separator: true });
	static SemiColon = new TokenType("SemiColon", { separator: true });
	static LeftParen = new TokenType("LeftParen", { separator: true });
	static RightParen = new TokenType("RightParen", { separator: true });
	static LeftBracket = new TokenType("LeftBracket", { separator: true });
	static RightBracket = new TokenType("RightBracket", { separator: true });
	static LeftBrace = new TokenType("LeftBrace", { separator: true });
	static RightBrace = new TokenType("RightBrace", { separator: true });
	static Comma = new TokenType("Comma", { separator: true });
	static Dot = new TokenType("Dot", { separator: true });
	static Operator = new TokenType("Operator", { separator: true });
	static Label = new TokenType("Label");
	static Numeric = new TokenType("Numeric");
	static Size = new TokenType("Size");
	static Blob = new TokenType("Blob");
	static String = new TokenType("String");
	static BindVariable = new TokenType("BindVariable");
	static Variable = new TokenType("Variable");
	static Command = new TokenType("Command");
	static Identifier = new TokenType("Identifier", { keyword: true });
}

export class SqlKeywords extends KeywordMap {
	static ABBREV = new Keyword("ABBREV", { ignoreCase: true });
	static ABORT = new Keyword("ABORT", { ignoreCase: true });
	static ABS = new Keyword("ABS", { ignoreCase: true });
	static ACCESS = new Keyword("ACCESS", { ignoreCase: true });
	static ACCESSED = new Keyword("ACCESSED", { ignoreCase: true });
	static ACCESSIBLE = new Keyword("ACCESSIBLE", { ignoreCase: true });
	static ACCOUNT = new Keyword("ACCOUNT", { ignoreCase: true });
	static ACLDEFAULT = new Keyword("ACLDEFAULT", { ignoreCase: true });
	static ACLEXPLODE = new Keyword("ACLEXPLODE", { ignoreCase: true });
	static ACOS = new Keyword("ACOS", { ignoreCase: true });
	static ACOSD = new Keyword("ACOSD", { ignoreCase: true });
	static ACOSH = new Keyword("ACOSH", { ignoreCase: true });
	static ACTION = new Keyword("ACTION", { ignoreCase: true });
	static ACTIONS = new Keyword("ACTIONS", { ignoreCase: true });
	static ACTIVE = new Keyword("ACTIVE", { ignoreCase: true });
	static ADD = new Keyword("ADD", { ignoreCase: true });
	static ADDDATE = new Keyword("ADDDATE", { ignoreCase: true });
	static ADDTIME = new Keyword("ADDTIME", { ignoreCase: true });
	static ADMIN = new Keyword("ADMIN", { ignoreCase: true });
	static ADMINISTER = new Keyword("ADMINISTER", { ignoreCase: true });
	static ADVANCED = new Keyword("ADVANCED", { ignoreCase: true });
	static ADVISE = new Keyword("ADVISE", { ignoreCase: true });
	static AES_DECRYPT = new Keyword("AES_DECRYPT", { ignoreCase: true });
	static AES_ENCRYPT = new Keyword("AES_ENCRYPT", { ignoreCase: true });
	static AFFINITY = new Keyword("AFFINITY", { ignoreCase: true });
	static AFTER = new Keyword("AFTER", { ignoreCase: true });
	static AGAINST = new Keyword("AGAINST", { ignoreCase: true });
	static AGE = new Keyword("AGE", { ignoreCase: true });
	static AGENT = new Keyword("AGENT", { ignoreCase: true });
	static AGGREGATE = new Keyword("AGGREGATE", { ignoreCase: true });
	static ALGORITHM = new Keyword("ALGORITHM", { ignoreCase: true });
	static ALIAS = new Keyword("ALIAS", { ignoreCase: true });
	static ALL = new Keyword("ALL", { ignoreCase: true });
	static ALLOCATE = new Keyword("ALLOCATE", { ignoreCase: true });
	static ALLOW = new Keyword("ALLOW", { ignoreCase: true });
	static ALLOW_CONNECTIONS = new Keyword("ALLOW_CONNECTIONS", {
		ignoreCase: true,
	});
	static ALTER = new Keyword("ALTER", { ignoreCase: true });
	static ALTERNATE = new Keyword("ALTERNATE", { ignoreCase: true });
	static ALWAYS = new Keyword("ALWAYS", { ignoreCase: true });
	static ANALYSE = new Keyword("ANALYSE", { ignoreCase: true });
	static ANALYTIC = new Keyword("ANALYTIC", { ignoreCase: true });
	static ANALYZE = new Keyword("ANALYZE", { ignoreCase: true });
	static ANCILLARY = new Keyword("ANCILLARY", { ignoreCase: true });
	static AND = new Keyword("AND", { ignoreCase: true });
	static ANY = new Keyword("ANY", { ignoreCase: true });
	static ANYDATA = new Keyword("ANYDATA", { ignoreCase: true });
	static ANYDATASET = new Keyword("ANYDATASET", { ignoreCase: true });
	static ANYSCHEMA = new Keyword("ANYSCHEMA", { ignoreCase: true });
	static ANYTYPE = new Keyword("ANYTYPE", { ignoreCase: true });
	static ANY_VALUE = new Keyword("ANY_VALUE", { ignoreCase: true });
	static APPICATION = new Keyword("APPICATION", { ignoreCase: true });
	static APPLY = new Keyword("APPLY", { ignoreCase: true });
	static ARCHIVAL = new Keyword("ARCHIVAL", { ignoreCase: true });
	static ARCHIVE = new Keyword("ARCHIVE", { ignoreCase: true });
	static ARCHIVED = new Keyword("ARCHIVED", { ignoreCase: true });
	static ARCHIVELOG = new Keyword("ARCHIVELOG", { ignoreCase: true });
	static AREA = new Keyword("AREA", { ignoreCase: true });
	static ARRAY = new Keyword("ARRAY", { ignoreCase: true });
	static ARRAY_AGG = new Keyword("ARRAY_AGG", { ignoreCase: true });
	static ARRAY_APPEND = new Keyword("ARRAY_APPEND", { ignoreCase: true });
	static ARRAY_CAT = new Keyword("ARRAY_CAT", { ignoreCase: true });
	static ARRAY_DIMS = new Keyword("ARRAY_DIMS", { ignoreCase: true });
	static ARRAY_FILL = new Keyword("ARRAY_FILL", { ignoreCase: true });
	static ARRAY_LENGTH = new Keyword("ARRAY_LENGTH", { ignoreCase: true });
	static ARRAY_LOWER = new Keyword("ARRAY_LOWER", { ignoreCase: true });
	static ARRAY_NDIMS = new Keyword("ARRAY_NDIMS", { ignoreCase: true });
	static ARRAY_POSITION = new Keyword("ARRAY_POSITION", { ignoreCase: true });
	static ARRAY_POSITIONS = new Keyword("ARRAY_POSITIONS", { ignoreCase: true });
	static ARRAY_PREPEND = new Keyword("ARRAY_PREPEND", { ignoreCase: true });
	static ARRAY_REMOVE = new Keyword("ARRAY_REMOVE", { ignoreCase: true });
	static ARRAY_REPLACE = new Keyword("ARRAY_REPLACE", { ignoreCase: true });
	static ARRAY_TO_JSON = new Keyword("ARRAY_TO_JSON", { ignoreCase: true });
	static ARRAY_TO_STRING = new Keyword("ARRAY_TO_STRING", { ignoreCase: true });
	static ARRAY_TO_TSVECTOR = new Keyword("ARRAY_TO_TSVECTOR", {
		ignoreCase: true,
	});
	static ARRAY_UPPER = new Keyword("ARRAY_UPPER", { ignoreCase: true });
	static AS = new Keyword("AS", { ignoreCase: true });
	static ASC = new Keyword("ASC", { ignoreCase: true });
	static ASCII = new Keyword("ASCII", { ignoreCase: true });
	static ASCIISTR = new Keyword("ASCIISTR", { ignoreCase: true });
	static ASSEMBLY = new Keyword("ASSEMBLY", { ignoreCase: true });
	static ASENSITIVE = new Keyword("ASENSITIVE", { ignoreCase: true });
	static ASIN = new Keyword("ASIN", { ignoreCase: true });
	static ASIND = new Keyword("ASIND", { ignoreCase: true });
	static ASINH = new Keyword("ASINH", { ignoreCase: true });
	static ASSOCIATE = new Keyword("ASSOCIATE", { ignoreCase: true });
	static ASYMMETRIC = new Keyword("ASYMMETRIC", { ignoreCase: true });
	static ASYNCHRONOUS = new Keyword("ASYNCHRONOUS", { ignoreCase: true });
	static AT = new Keyword("AT", { ignoreCase: true });
	static ATAN = new Keyword("ATAN", { ignoreCase: true });
	static ATAN2 = new Keyword("ATAN2", { ignoreCase: true });
	static ATAN2D = new Keyword("ATAN2D", { ignoreCase: true });
	static ATAND = new Keyword("ATAND", { ignoreCase: true });
	static ATANH = new Keyword("ATANH", { ignoreCase: true });
	static ATOMIC = new Keyword("ATOMIC", { ignoreCase: true });
	static ATTACH = new Keyword("ATTACH", { ignoreCase: true });
	static ATTRIBUTE = new Keyword("ATTRIBUTE", { ignoreCase: true });
	static ATTRIBUTES = new Keyword("ATTRIBUTES", { ignoreCase: true });
	static AUDIT = new Keyword("AUDIT", { ignoreCase: true });
	static AUTHENTICATED = new Keyword("AUTHENTICATED", { ignoreCase: true });
	static AUTHENTICATION = new Keyword("AUTHENTICATION", { ignoreCase: true });
	static AUTHID = new Keyword("AUTHID", { ignoreCase: true });
	static AUTHORIZATION = new Keyword("AUTHORIZATION", { ignoreCase: true });
	static AUTO = new Keyword("AUTO", { ignoreCase: true });
	static AUTOALLOCATE = new Keyword("AUTOALLOCATE", { ignoreCase: true });
	static AUTOEXTEND = new Keyword("AUTOEXTEND", { ignoreCase: true });
	static AUTOEXTEND_SIZE = new Keyword("AUTOEXTEND_SIZE", { ignoreCase: true });
	static AUTOINCREMENT = new Keyword("AUTOINCREMENT", { ignoreCase: true });
	static AUTOMATIC = new Keyword("AUTOMATIC", { ignoreCase: true });
	static AUTONOMOUS_TRANSACTION = new Keyword("AUTONOMOUS_TRANSACTION", {
		ignoreCase: true,
	});
	static AUTO_INCREMENT = new Keyword("AUTO_INCREMENT", { ignoreCase: true });
	static AUTO_LOGIN = new Keyword("AUTO_LOGIN", { ignoreCase: true });
	static AVAILABILITY = new Keyword("AVAILABILITY", { ignoreCase: true });
	static AVG = new Keyword("AVG", { ignoreCase: true });
	static AVG_ROW_LENGTH = new Keyword("AVG_ROW_LENGTH", { ignoreCase: true });
	static AZURE_ROLE = new Keyword("AZURE_ROLE", { ignoreCase: true });
	static AZURE_USER = new Keyword("AZURE_USER", { ignoreCase: true });
	static BACKUP = new Keyword("BACKUP", { ignoreCase: true });
	static BADFILE = new Keyword("BADFILE", { ignoreCase: true });
	static BASICFILE = new Keyword("BASICFILE", { ignoreCase: true });
	static BATCH = new Keyword("BATCH", { ignoreCase: true });
	static BEFORE = new Keyword("BEFORE", { ignoreCase: true });
	static BEGIN = new Keyword("BEGIN", { ignoreCase: true });
	static BEGINNING = new Keyword("BEGINNING", { ignoreCase: true });
	static BENCHMARK = new Keyword("BENCHMARK", { ignoreCase: true });
	static BEQUEATH = new Keyword("BEQUEATH", { ignoreCase: true });
	static BETWEEN = new Keyword("BETWEEN", { ignoreCase: true });
	static BFILE = new Keyword("BFILE", { ignoreCase: true });
	static BIGFILE = new Keyword("BIGFILE", { ignoreCase: true });
	static BIGINT = new Keyword("BIGINT", { ignoreCase: true });
	static BIN = new Keyword("BIN", { ignoreCase: true });
	static BINARY = new Keyword("BINARY", { ignoreCase: true });
	static BINARY_INTEGER = new Keyword("BINARY_INTEGER", { ignoreCase: true });
	static BINDING = new Keyword("BINDING", { ignoreCase: true });
	static BINLOG = new Keyword("BINLOG", { ignoreCase: true });
	static BIN_TO_UUID = new Keyword("BIN_TO_UUID", { ignoreCase: true });
	static BIT = new Keyword("BIT", { ignoreCase: true });
	static BITMAP = new Keyword("BITMAP", { ignoreCase: true });
	static BIT_AND = new Keyword("BIT_AND", { ignoreCase: true });
	static BIT_COUNT = new Keyword("BIT_COUNT", { ignoreCase: true });
	static BIT_LENGTH = new Keyword("BIT_LENGTH", { ignoreCase: true });
	static BIT_OR = new Keyword("BIT_OR", { ignoreCase: true });
	static BIT_XOR = new Keyword("BIT_XOR", { ignoreCase: true });
	static BLOB = new Keyword("BLOB", { ignoreCase: true });
	static BLOCK = new Keyword("BLOCK", { ignoreCase: true });
	static BLOCKCHAIN = new Keyword("BLOCKCHAIN", { ignoreCase: true });
	static BLOCKSIZE = new Keyword("BLOCKSIZE", { ignoreCase: true });
	static BODY = new Keyword("BODY", { ignoreCase: true });
	static BOOL = new Keyword("BOOL", { ignoreCase: true });
	static BOOLEAN = new Keyword("BOOLEAN", { ignoreCase: true });
	static BOOL_AND = new Keyword("BOOL_AND", { ignoreCase: true });
	static BOOL_OR = new Keyword("BOOL_OR", { ignoreCase: true });
	static BOTH = new Keyword("BOTH", { ignoreCase: true });
	static BOUND_BOX = new Keyword("BOUND_BOX", { ignoreCase: true });
	static BOX = new Keyword("BOX", { ignoreCase: true });
	static BREADTH = new Keyword("BREADTH", { ignoreCase: true });
	static BREAK = new Keyword("BREAK", { ignoreCase: true });
	static BROADCAST = new Keyword("BROADCAST", { ignoreCase: true });
	static BROKER = new Keyword("BROKER", { ignoreCase: true });
	static BROWSE = new Keyword("BROWSE", { ignoreCase: true });
	static BTREE = new Keyword("BTREE", { ignoreCase: true });
	static BTRIM = new Keyword("BTRIM", { ignoreCase: true });
	static BUFFERS = new Keyword("BUFFERS", { ignoreCase: true });
	static BUFFER_CACHE = new Keyword("BUFFER_CACHE", { ignoreCase: true });
	static BULK = new Keyword("BULK", { ignoreCase: true });
	static BULK_EXCEPTIONS = new Keyword("BULK_EXCEPTIONS", { ignoreCase: true });
	static BULK_ROWCOUNT = new Keyword("BULK_ROWCOUNT", { ignoreCase: true });
	static BY = new Keyword("BY", { ignoreCase: true });
	static BYTEA = new Keyword("BYTEA", { ignoreCase: true });
	static CACHE = new Keyword("CACHE", { ignoreCase: true });
	static CACHING = new Keyword("CACHING", { ignoreCase: true });
	static CALL = new Keyword("CALL", { ignoreCase: true });
	static CANCEL = new Keyword("CANCEL", { ignoreCase: true });
	static CAPACITY = new Keyword("CAPACITY", { ignoreCase: true });
	static CAPTION = new Keyword("CAPTION", { ignoreCase: true });
	static CARDINALITY = new Keyword("CARDINALITY", { ignoreCase: true });
	static CASCADE = new Keyword("CASCADE", { ignoreCase: true });
	static CASCADED = new Keyword("CASCADED", { ignoreCase: true });
	static CASE = new Keyword("CASE", { ignoreCase: true });
	static CAST = new Keyword("CAST", { ignoreCase: true });
	static CATCH = new Keyword("CATCH", { ignoreCase: true });
	static CATEGORY = new Keyword("CATEGORY", { ignoreCase: true });
	static CBRT = new Keyword("CBRT", { ignoreCase: true });
	static CEIL = new Keyword("CEIL", { ignoreCase: true });
	static CEILING = new Keyword("CEILING", { ignoreCase: true });
	static CENTER = new Keyword("CENTER", { ignoreCase: true });
	static CENTURY = new Keyword("CENTURY", { ignoreCase: true });
	static CERTIFICATE = new Keyword("CERTIFICATE", { ignoreCase: true });
	static CHAIN = new Keyword("CHAIN", { ignoreCase: true });
	static CHAINED = new Keyword("CHAINED", { ignoreCase: true });
	static CHANGE = new Keyword("CHANGE", { ignoreCase: true });
	static CHANGES = new Keyword("CHANGES", { ignoreCase: true });
	static CHAR = new Keyword("CHAR", { ignoreCase: true });
	static CHAR2 = new Keyword("CHAR2", { ignoreCase: true });
	static CHARACTER = new Keyword("CHARACTER", { ignoreCase: true });
	static CHARACTER_LENGTH = new Keyword("CHARACTER_LENGTH", {
		ignoreCase: true,
	});
	static CHARF = new Keyword("CHARF", { ignoreCase: true });
	static CHARINDEX = new Keyword("CHARINDEX", { ignoreCase: true });
	static CHARSET = new Keyword("CHARSET", { ignoreCase: true });
	static CHARSETFORM = new Keyword("CHARSETFORM", { ignoreCase: true });
	static CHARSETID = new Keyword("CHARSETID", { ignoreCase: true });
	static CHARZ = new Keyword("CHARZ", { ignoreCase: true });
	static CHAR_LENGTH = new Keyword("CHAR_LENGTH", { ignoreCase: true });
	static CHECK = new Keyword("CHECK", { ignoreCase: true });
	static CHECKPOINT = new Keyword("CHECKPOINT", { ignoreCase: true });
	static CHECKSUM = new Keyword("CHECKSUM", { ignoreCase: true });
	static CHILD = new Keyword("CHILD", { ignoreCase: true });
	static CHOOSE = new Keyword("CHOOSE", { ignoreCase: true });
	static CHR = new Keyword("CHR", { ignoreCase: true });
	static CHUNK = new Keyword("CHUNK", { ignoreCase: true });
	static CIPHER = new Keyword("CIPHER", { ignoreCase: true });
	static CIRCLE = new Keyword("CIRCLE", { ignoreCase: true });
	static CLASS = new Keyword("CLASS", { ignoreCase: true });
	static CLASSIFICATION = new Keyword("CLASSIFICATION", { ignoreCase: true });
	static CLASSIFIER = new Keyword("CLASSIFIER", { ignoreCase: true });
	static CLAUSE = new Keyword("CLAUSE", { ignoreCase: true });
	static CLEAN = new Keyword("CLEAN", { ignoreCase: true });
	static CLEANUP = new Keyword("CLEANUP", { ignoreCase: true });
	static CLEAR = new Keyword("CLEAR", { ignoreCase: true });
	static CLIENT = new Keyword("CLIENT", { ignoreCase: true });
	static CLOB = new Keyword("CLOB", { ignoreCase: true });
	static CLOCK_TIMESTAMP = new Keyword("CLOCK_TIMESTAMP", { ignoreCase: true });
	static CLONE = new Keyword("CLONE", { ignoreCase: true });
	static CLOSE = new Keyword("CLOSE", { ignoreCase: true });
	static CLS = new Keyword("CLS", { ignoreCase: true });
	static CLUSTER = new Keyword("CLUSTER", { ignoreCase: true });
	static CLUSTERED = new Keyword("CLUSTERED", { ignoreCase: true });
	static CLUSTERING = new Keyword("CLUSTERING", { ignoreCase: true });
	static CLUSTERS = new Keyword("CLUSTERS", { ignoreCase: true });
	static CN = new Keyword("CN", { ignoreCase: true });
	static COALESCE = new Keyword("COALESCE", { ignoreCase: true });
	static COARSE = new Keyword("COARSE", { ignoreCase: true });
	static COERCIBILITY = new Keyword("COERCIBILITY", { ignoreCase: true });
	static COLAUTH = new Keyword("COLAUTH", { ignoreCase: true });
	static COLD = new Keyword("COLD", { ignoreCase: true });
	static COLLATE = new Keyword("COLLATE", { ignoreCase: true });
	static COLLATION = new Keyword("COLLATION", { ignoreCase: true });
	static COLLECT = new Keyword("COLLECT", { ignoreCase: true });
	static COLLECTION = new Keyword("COLLECTION", { ignoreCase: true });
	static COLUMN = new Keyword("COLUMN", { ignoreCase: true });
	static COLUMNS = new Keyword("COLUMNS", { ignoreCase: true });
	static COLUMNSTORE = new Keyword("COLUMNSTORE", { ignoreCase: true });
	static COLUMNS_UPDATED = new Keyword("COLUMNS_UPDATED", { ignoreCase: true });
	static COLUMN_FORMAT = new Keyword("COLUMN_FORMAT", { ignoreCase: true });
	static COLUMN_VALUE = new Keyword("COLUMN_VALUE", { ignoreCase: true });
	static COMMENT = new Keyword("COMMENT", { ignoreCase: true });
	static COMMIT = new Keyword("COMMIT", { ignoreCase: true });
	static COMMITTED = new Keyword("COMMITTED", { ignoreCase: true });
	static COMPACT = new Keyword("COMPACT", { ignoreCase: true });
	static COMPATIBILITY = new Keyword("COMPATIBILITY", { ignoreCase: true });
	static COMPILE = new Keyword("COMPILE", { ignoreCase: true });
	static COMPLETE = new Keyword("COMPLETE", { ignoreCase: true });
	static COMPLETION = new Keyword("COMPLETION", { ignoreCase: true });
	static COMPONENT = new Keyword("COMPONENT", { ignoreCase: true });
	static COMPOSITE_LIMIT = new Keyword("COMPOSITE_LIMIT", { ignoreCase: true });
	static COMPRESS = new Keyword("COMPRESS", { ignoreCase: true });
	static COMPRESSED = new Keyword("COMPRESSED", { ignoreCase: true });
	static COMPRESSION = new Keyword("COMPRESSION", { ignoreCase: true });
	static COMPUTATION = new Keyword("COMPUTATION", { ignoreCase: true });
	static COMPUTE = new Keyword("COMPUTE", { ignoreCase: true });
	static CONCAT = new Keyword("CONCAT", { ignoreCase: true });
	static CONCAT_WS = new Keyword("CONCAT_WS", { ignoreCase: true });
	static CONCURRENT = new Keyword("CONCURRENT", { ignoreCase: true });
	static CONCURRENTLY = new Keyword("CONCURRENTLY", { ignoreCase: true });
	static CONDITION = new Keyword("CONDITION", { ignoreCase: true });
	static CONFIGURATION = new Keyword("CONFIGURATION", { ignoreCase: true });
	static CONFIRM = new Keyword("CONFIRM", { ignoreCase: true });
	static CONFLICT = new Keyword("CONFLICT", { ignoreCase: true });
	static CONNECT = new Keyword("CONNECT", { ignoreCase: true });
	static CONNECTION = new Keyword("CONNECTION", { ignoreCase: true });
	static CONNECTION_ID = new Keyword("CONNECTION_ID", { ignoreCase: true });
	static CONNECT_BY_ISCYCLE = new Keyword("CONNECT_BY_ISCYCLE", {
		ignoreCase: true,
	});
	static CONNECT_BY_ISLEAF = new Keyword("CONNECT_BY_ISLEAF", {
		ignoreCase: true,
	});
	static CONNECT_TIME = new Keyword("CONNECT_TIME", { ignoreCase: true });
	static CONSIDER = new Keyword("CONSIDER", { ignoreCase: true });
	static CONSISTENT = new Keyword("CONSISTENT", { ignoreCase: true });
	static CONSTANT = new Keyword("CONSTANT", { ignoreCase: true });
	static CONSTRAINT = new Keyword("CONSTRAINT", { ignoreCase: true });
	static CONSTRAINTS = new Keyword("CONSTRAINTS", { ignoreCase: true });
	static CONTAINER = new Keyword("CONTAINER", { ignoreCase: true });
	static CONTAINERS = new Keyword("CONTAINERS", { ignoreCase: true });
	static CONTAINERS_DEFAULT = new Keyword("CONTAINERS_DEFAULT", {
		ignoreCase: true,
	});
	static CONTAINER_DATA = new Keyword("CONTAINER_DATA", { ignoreCase: true });
	static CONTAINER_MAP = new Keyword("CONTAINER_MAP", { ignoreCase: true });
	static CONTAINS = new Keyword("CONTAINS", { ignoreCase: true });
	static CONTAINSTABLE = new Keyword("CONTAINSTABLE", { ignoreCase: true });
	static CONTENTS = new Keyword("CONTENTS", { ignoreCase: true });
	static CONTEXT = new Keyword("CONTEXT", { ignoreCase: true });
	static CONTINUE = new Keyword("CONTINUE", { ignoreCase: true });
	static CONTRACT = new Keyword("CONTRACT", { ignoreCase: true });
	static CONTROLFILE = new Keyword("CONTROLFILE", { ignoreCase: true });
	static CONV = new Keyword("CONV", { ignoreCase: true });
	static CONVERSION = new Keyword("CONVERSION", { ignoreCase: true });
	static CONVERT = new Keyword("CONVERT", { ignoreCase: true });
	static CONVERT_FROM = new Keyword("CONVERT_FROM", { ignoreCase: true });
	static CONVERT_TO = new Keyword("CONVERT_TO", { ignoreCase: true });
	static CONVERT_TZ = new Keyword("CONVERT_TZ", { ignoreCase: true });
	static COPY = new Keyword("COPY", { ignoreCase: true });
	static CORR = new Keyword("CORR", { ignoreCase: true });
	static CORRUPTION = new Keyword("CORRUPTION", { ignoreCase: true });
	static COS = new Keyword("COS", { ignoreCase: true });
	static COSD = new Keyword("COSD", { ignoreCase: true });
	static COSH = new Keyword("COSH", { ignoreCase: true });
	static COST = new Keyword("COST", { ignoreCase: true });
	static COSTS = new Keyword("COSTS", { ignoreCase: true });
	static COT = new Keyword("COT", { ignoreCase: true });
	static COTD = new Keyword("COTD", { ignoreCase: true });
	static COUNT = new Keyword("COUNT", { ignoreCase: true });
	static COVAR_POP = new Keyword("COVAR_POP", { ignoreCase: true });
	static COVAR_SAMP = new Keyword("COVAR_SAMP", { ignoreCase: true });
	static COVERAGE = new Keyword("COVERAGE", { ignoreCase: true });
	static CPU_PER_CALL = new Keyword("CPU_PER_CALL", { ignoreCase: true });
	static CPU_PER_SESSION = new Keyword("CPU_PER_SESSION", { ignoreCase: true });
	static CRASH = new Keyword("CRASH", { ignoreCase: true });
	static CRC32 = new Keyword("CRC32", { ignoreCase: true });
	static CREATE = new Keyword("CREATE", { ignoreCase: true });
	static CREATE_FILE_DEST = new Keyword("CREATE_FILE_DEST", {
		ignoreCase: true,
	});
	static CREATION = new Keyword("CREATION", { ignoreCase: true });
	static CREDENTIAL = new Keyword("CREDENTIAL", { ignoreCase: true });
	static CREDENTIALS = new Keyword("CREDENTIALS", { ignoreCase: true });
	static CRITICAL = new Keyword("CRITICAL", { ignoreCase: true });
	static CROSS = new Keyword("CROSS", { ignoreCase: true });
	static CRYPTOGRAPHIC = new Keyword("CRYPTOGRAPHIC", { ignoreCase: true });
	static CUBE = new Keyword("CUBE", { ignoreCase: true });
	static CUME_DIST = new Keyword("CUME_DIST", { ignoreCase: true });
	static CURDATE = new Keyword("CURDATE", { ignoreCase: true });
	static CURRENT = new Keyword("CURRENT", { ignoreCase: true });
	static CURRENT_CATALOG = new Keyword("CURRENT_CATALOG", { ignoreCase: true });
	static CURRENT_DATABASE = new Keyword("CURRENT_DATABASE", {
		ignoreCase: true,
	});
	static CURRENT_DATE = new Keyword("CURRENT_DATE", { ignoreCase: true });
	static CURRENT_QUERY = new Keyword("CURRENT_QUERY", { ignoreCase: true });
	static CURRENT_ROLE = new Keyword("CURRENT_ROLE", { ignoreCase: true });
	static CURRENT_SCHEMA = new Keyword("CURRENT_SCHEMA", { ignoreCase: true });
	static CURRENT_SCHEMAS = new Keyword("CURRENT_SCHEMAS", { ignoreCase: true });
	static CURRENT_TIME = new Keyword("CURRENT_TIME", { ignoreCase: true });
	static CURRENT_TIMESTAMP = new Keyword("CURRENT_TIMESTAMP", {
		ignoreCase: true,
	});
	static CURRENT_TIMEZONE = new Keyword("CURRENT_TIMEZONE", {
		ignoreCase: true,
	});
	static CURRENT_TIMEZONE_ID = new Keyword("CURRENT_TIMEZONE_ID", {
		ignoreCase: true,
	});
	static CURRENT_USER = new Keyword("CURRENT_USER", { ignoreCase: true });
	static CURRVAL = new Keyword("CURRVAL", { ignoreCase: true });
	static CURSOR = new Keyword("CURSOR", { ignoreCase: true });
	static CURSOR_TO_XML = new Keyword("CURSOR_TO_XML", { ignoreCase: true });
	static CURSOR_TO_XMLSCHEMA = new Keyword("CURSOR_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static CURTIME = new Keyword("CURTIME", { ignoreCase: true });
	static CYCLE = new Keyword("CYCLE", { ignoreCase: true });
	static D = new Keyword("D", { ignoreCase: true });
	static DANGLING = new Keyword("DANGLING", { ignoreCase: true });
	static DATA = new Keyword("DATA", { ignoreCase: true });
	static DATABASE = new Keyword("DATABASE", { ignoreCase: true });
	static DATABASES = new Keyword("DATABASES", { ignoreCase: true });
	static DATABASE_TO_XML = new Keyword("DATABASE_TO_XML", { ignoreCase: true });
	static DATABASE_TO_XMLSCHEMA = new Keyword("DATABASE_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static DATABASE_TO_XML_AND_XMLSCHEMA = new Keyword(
		"DATABASE_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static DATAFILE = new Keyword("DATAFILE", { ignoreCase: true });
	static DATAFILES = new Keyword("DATAFILES", { ignoreCase: true });
	static DATALENGTH = new Keyword("DATALENGTH", { ignoreCase: true });
	static DATAPUMP = new Keyword("DATAPUMP", { ignoreCase: true });
	static DATATYPE = new Keyword("DATATYPE", { ignoreCase: true });
	static DATE = new Keyword("DATE", { ignoreCase: true });
	static DATEADD = new Keyword("DATEADD", { ignoreCase: true });
	static DATEDIFF = new Keyword("DATEDIFF", { ignoreCase: true });
	static DATEDIFF_BIG = new Keyword("DATEDIFF_BIG", { ignoreCase: true });
	static DATEFROMPARTS = new Keyword("DATEFROMPARTS", { ignoreCase: true });
	static DATENAME = new Keyword("DATENAME", { ignoreCase: true });
	static DATEPART = new Keyword("DATEPART", { ignoreCase: true });
	static DATETIME = new Keyword("DATETIME", { ignoreCase: true });
	static DATETIMEFROMPARTS = new Keyword("DATETIMEFROMPARTS", {
		ignoreCase: true,
	});
	static DATETIMEOFFSET = new Keyword("DATETIMEOFFSET", { ignoreCase: true });
	static DATETIMEOFFSETFROMPARTS = new Keyword("DATETIMEOFFSETFROMPARTS", {
		ignoreCase: true,
	});
	static DATETIME2 = new Keyword("DATETIME2", { ignoreCase: true });
	static DATETIME2FROMPARTS = new Keyword("DATETIME2FROMPARTS", {
		ignoreCase: true,
	});
	static DATE_ADD = new Keyword("DATE_ADD", { ignoreCase: true });
	static DATE_BIN = new Keyword("DATE_BIN", { ignoreCase: true });
	static DATE_BUCKET = new Keyword("DATE_BUCKET", { ignoreCase: true });
	static DATE_FORMAT = new Keyword("DATE_FORMAT", { ignoreCase: true });
	static DATE_PART = new Keyword("DATE_PART", { ignoreCase: true });
	static DATE_SUB = new Keyword("DATE_SUB", { ignoreCase: true });
	static DATE_TRUNC = new Keyword("DATE_TRUNC", { ignoreCase: true });
	static DAY = new Keyword("DAY", { ignoreCase: true });
	static DAYNAME = new Keyword("DAYNAME", { ignoreCase: true });
	static DAYOFMONTH = new Keyword("DAYOFMONTH", { ignoreCase: true });
	static DAYOFWEEK = new Keyword("DAYOFWEEK", { ignoreCase: true });
	static DAYOFYEAR = new Keyword("DAYOFYEAR", { ignoreCase: true });
	static DAYS = new Keyword("DAYS", { ignoreCase: true });
	static DAY_HOUR = new Keyword("DAY_HOUR", { ignoreCase: true });
	static DAY_MICROSECOND = new Keyword("DAY_MICROSECOND", { ignoreCase: true });
	static DAY_MINUTE = new Keyword("DAY_MINUTE", { ignoreCase: true });
	static DAY_SECOND = new Keyword("DAY_SECOND", { ignoreCase: true });
	static DBA_RECYCLEBIN = new Keyword("DBA_RECYCLEBIN", { ignoreCase: true });
	static DBCC = new Keyword("DBCC", { ignoreCase: true });
	static DBURITYPE = new Keyword("DBURITYPE", { ignoreCase: true });
	static DDL = new Keyword("DDL", { ignoreCase: true });
	static DEALLOCATE = new Keyword("DEALLOCATE", { ignoreCase: true });
	static DEBUG = new Keyword("DEBUG", { ignoreCase: true });
	static DEC = new Keyword("DEC", { ignoreCase: true });
	static DECADE = new Keyword("DECADE", { ignoreCase: true });
	static DECIMAL = new Keyword("DECIMAL", { ignoreCase: true });
	static DECLARE = new Keyword("DECLARE", { ignoreCase: true });
	static DECODE = new Keyword("DECODE", { ignoreCase: true });
	static DECREMENT = new Keyword("DECREMENT", { ignoreCase: true });
	static DECRYPT = new Keyword("DECRYPT", { ignoreCase: true });
	static DEDUPLICATE = new Keyword("DEDUPLICATE", { ignoreCase: true });
	static DEFAULT = new Keyword("DEFAULT", { ignoreCase: true });
	static DEFAULT_COLLATION = new Keyword("DEFAULT_COLLATION", {
		ignoreCase: true,
	});
	static DEFAULT_CREDENTIAL = new Keyword("DEFAULT_CREDENTIAL", {
		ignoreCase: true,
	});
	static DEFERRABLE = new Keyword("DEFERRABLE", { ignoreCase: true });
	static DEFERRED = new Keyword("DEFERRED", { ignoreCase: true });
	static DEFINE = new Keyword("DEFINE", { ignoreCase: true });
	static DEFINER = new Keyword("DEFINER", { ignoreCase: true });
	static DEFINITION = new Keyword("DEFINITION", { ignoreCase: true });
	static DEGREES = new Keyword("DEGREES", { ignoreCase: true });
	static DELAYED = new Keyword("DELAYED", { ignoreCase: true });
	static DELAY_KEY_WRITE = new Keyword("DELAY_KEY_WRITE", { ignoreCase: true });
	static DELETE = new Keyword("DELETE", { ignoreCase: true });
	static DELETE_ALL = new Keyword("DELETE_ALL", { ignoreCase: true });
	static DELETING = new Keyword("DELETING", { ignoreCase: true });
	static DELIGATE = new Keyword("DELIGATE", { ignoreCase: true });
	static DEMAND = new Keyword("DEMAND", { ignoreCase: true });
	static DENSE_RANK = new Keyword("DENSE_RANK", { ignoreCase: true });
	static DENY = new Keyword("DENY", { ignoreCase: true });
	static DEPENDENT = new Keyword("DEPENDENT", { ignoreCase: true });
	static DEPLICATE = new Keyword("DEPLICATE", { ignoreCase: true });
	static DEPTH = new Keyword("DEPTH", { ignoreCase: true });
	static DESC = new Keyword("DESC", { ignoreCase: true });
	static DESCRIBE = new Keyword("DESCRIBE", { ignoreCase: true });
	static DESCRIPTION = new Keyword("DESCRIPTION", { ignoreCase: true });
	static DES_KEY_FILE = new Keyword("DES_KEY_FILE", { ignoreCase: true });
	static DETACH = new Keyword("DETACH", { ignoreCase: true });
	static DETAIL = new Keyword("DETAIL", { ignoreCase: true });
	static DETERMINES = new Keyword("DETERMINES", { ignoreCase: true });
	static DETERMINISTIC = new Keyword("DETERMINISTIC", { ignoreCase: true });
	static DIAGONAL = new Keyword("DIAGONAL", { ignoreCase: true });
	static DIAMETER = new Keyword("DIAMETER", { ignoreCase: true });
	static DICTIONARY = new Keyword("DICTIONARY", { ignoreCase: true });
	static DIFFERENCE = new Keyword("DIFFERENCE", { ignoreCase: true });
	static DIGEST = new Keyword("DIGEST", { ignoreCase: true });
	static DIMENSION = new Keyword("DIMENSION", { ignoreCase: true });
	static DIRECTORY = new Keyword("DIRECTORY", { ignoreCase: true });
	static DIRECT_LOAD = new Keyword("DIRECT_LOAD", { ignoreCase: true });
	static DIRECT_PATH = new Keyword("DIRECT_PATH", { ignoreCase: true });
	static DISABLE = new Keyword("DISABLE", { ignoreCase: true });
	static DISABLE_ALL = new Keyword("DISABLE_ALL", { ignoreCase: true });
	static DISALLOW = new Keyword("DISALLOW", { ignoreCase: true });
	static DISASSOCIATE = new Keyword("DISASSOCIATE", { ignoreCase: true });
	static DISCARD = new Keyword("DISCARD", { ignoreCase: true });
	static DISCARDFILE = new Keyword("DISCARDFILE", { ignoreCase: true });
	static DISCONNECT = new Keyword("DISCONNECT", { ignoreCase: true });
	static DISK = new Keyword("DISK", { ignoreCase: true });
	static DISKGROUP = new Keyword("DISKGROUP", { ignoreCase: true });
	static DISKS = new Keyword("DISKS", { ignoreCase: true });
	static DISMOUNT = new Keyword("DISMOUNT", { ignoreCase: true });
	static DISPLAY = new Keyword("DISPLAY", { ignoreCase: true });
	static DISTINCT = new Keyword("DISTINCT", { ignoreCase: true });
	static DISTINCTROW = new Keyword("DISTINCTROW", { ignoreCase: true });
	static DISTRIBUTE = new Keyword("DISTRIBUTE", { ignoreCase: true });
	static DISTRIBUTED = new Keyword("DISTRIBUTED", { ignoreCase: true });
	static DIV = new Keyword("DIV", { ignoreCase: true });
	static DML = new Keyword("DML", { ignoreCase: true });
	static DO = new Keyword("DO", { ignoreCase: true });
	static DOCUMENT = new Keyword("DOCUMENT", { ignoreCase: true });
	static DOMAIN = new Keyword("DOMAIN", { ignoreCase: true });
	static DOUBLE = new Keyword("DOUBLE", { ignoreCase: true });
	static DOW = new Keyword("DOW", { ignoreCase: true });
	static DOWNGRADE = new Keyword("DOWNGRADE", { ignoreCase: true });
	static DOY = new Keyword("DOY", { ignoreCase: true });
	static DROP = new Keyword("DROP", { ignoreCase: true });
	static DUAL = new Keyword("DUAL", { ignoreCase: true });
	static DUMP = new Keyword("DUMP", { ignoreCase: true });
	static DUPLICATE = new Keyword("DUPLICATE", { ignoreCase: true });
	static DUPLICATED = new Keyword("DUPLICATED", { ignoreCase: true });
	static DURATION = new Keyword("DURATION", { ignoreCase: true });
	static DV = new Keyword("DV", { ignoreCase: true });
	static DYNAMIC = new Keyword("DYNAMIC", { ignoreCase: true });
	static E = new Keyword("E", { ignoreCase: true });
	static EACH = new Keyword("EACH", { ignoreCase: true });
	static EDITION = new Keyword("EDITION", { ignoreCase: true });
	static EDITIONABLE = new Keyword("EDITIONABLE", { ignoreCase: true });
	static EDITIONING = new Keyword("EDITIONING", { ignoreCase: true });
	static EDITIONS = new Keyword("EDITIONS", { ignoreCase: true });
	static ELEMENT = new Keyword("ELEMENT", { ignoreCase: true });
	static ELSE = new Keyword("ELSE", { ignoreCase: true });
	static ELSEIF = new Keyword("ELSEIF", { ignoreCase: true });
	static ELSIF = new Keyword("ELSIF", { ignoreCase: true });
	static ELT = new Keyword("ELT", { ignoreCase: true });
	static EMPTY = new Keyword("EMPTY", { ignoreCase: true });
	static EMPTY_BLOB = new Keyword("EMPTY_BLOB", { ignoreCase: true });
	static EMPTY_CLOB = new Keyword("EMPTY_CLOB", { ignoreCase: true });
	static ENABLE = new Keyword("ENABLE", { ignoreCase: true });
	static ENABLE_ALL = new Keyword("ENABLE_ALL", { ignoreCase: true });
	static ENCLOSED = new Keyword("ENCLOSED", { ignoreCase: true });
	static ENCODE = new Keyword("ENCODE", { ignoreCase: true });
	static ENCODING = new Keyword("ENCODING", { ignoreCase: true });
	static ENCRYPT = new Keyword("ENCRYPT", { ignoreCase: true });
	static ENCRYPTED = new Keyword("ENCRYPTED", { ignoreCase: true });
	static ENCRYPTION = new Keyword("ENCRYPTION", { ignoreCase: true });
	static ENCRYPTION_KEY_ID = new Keyword("ENCRYPTION_KEY_ID", {
		ignoreCase: true,
	});
	static END = new Keyword("END", { ignoreCase: true });
	static ENDPOINT = new Keyword("ENDPOINT", { ignoreCase: true });
	static ENDS = new Keyword("ENDS", { ignoreCase: true });
	static ENFORCED = new Keyword("ENFORCED", { ignoreCase: true });
	static ENGINE = new Keyword("ENGINE", { ignoreCase: true });
	static ENGINE_ATTRIBUTE = new Keyword("ENGINE_ATTRIBUTE", {
		ignoreCase: true,
	});
	static EOMONTH = new Keyword("EOMONTH", { ignoreCase: true });
	static ENTERPRISE = new Keyword("ENTERPRISE", { ignoreCase: true });
	static ENUM = new Keyword("ENUM", { ignoreCase: true });
	static ENUM_FIRST = new Keyword("ENUM_FIRST", { ignoreCase: true });
	static ENUM_LAST = new Keyword("ENUM_LAST", { ignoreCase: true });
	static ENUM_RANGE = new Keyword("ENUM_RANGE", { ignoreCase: true });
	static EPOCH = new Keyword("EPOCH", { ignoreCase: true });
	static ERRCODE = new Keyword("ERRCODE", { ignoreCase: true });
	static ERRLVL = new Keyword("ERRLVL", { ignoreCase: true });
	static ERRORS = new Keyword("ERRORS", { ignoreCase: true });
	static ERROR_CODE = new Keyword("ERROR_CODE", { ignoreCase: true });
	static ERROR_INDEX = new Keyword("ERROR_INDEX", { ignoreCase: true });
	static ESCAPE = new Keyword("ESCAPE", { ignoreCase: true });
	static ESCAPED = new Keyword("ESCAPED", { ignoreCase: true });
	static EVALUATE = new Keyword("EVALUATE", { ignoreCase: true });
	static EVENT = new Keyword("EVENT", { ignoreCase: true });
	static EVENTDATA = new Keyword("EVENTDATA", { ignoreCase: true });
	static EVERY = new Keyword("EVERY", { ignoreCase: true });
	static EXCEPT = new Keyword("EXCEPT", { ignoreCase: true });
	static EXCEPTION = new Keyword("EXCEPTION", { ignoreCase: true });
	static EXCEPTIONS = new Keyword("EXCEPTIONS", { ignoreCase: true });
	static EXCEPTION_INIT = new Keyword("EXCEPTION_INIT", { ignoreCase: true });
	static EXCHANGE = new Keyword("EXCHANGE", { ignoreCase: true });
	static EXCLUDE = new Keyword("EXCLUDE", { ignoreCase: true });
	static EXCLUSIVE = new Keyword("EXCLUSIVE", { ignoreCase: true });
	static EXEC = new Keyword("EXEC", { ignoreCase: true });
	static EXECUTE = new Keyword("EXECUTE", { ignoreCase: true });
	static EXISTS = new Keyword("EXISTS", { ignoreCase: true });
	static EXIT = new Keyword("EXIT", { ignoreCase: true });
	static EXP = new Keyword("EXP", { ignoreCase: true });
	static EXPANSION = new Keyword("EXPANSION", { ignoreCase: true });
	static EXPIRE = new Keyword("EXPIRE", { ignoreCase: true });
	static EXPLAIN = new Keyword("EXPLAIN", { ignoreCase: true });
	static EXPORT = new Keyword("EXPORT", { ignoreCase: true });
	static EXPORT_SET = new Keyword("EXPORT_SET", { ignoreCase: true });
	static EXPRESSION = new Keyword("EXPRESSION", { ignoreCase: true });
	static EXTEND = new Keyword("EXTEND", { ignoreCase: true });
	static EXTENDED = new Keyword("EXTENDED", { ignoreCase: true });
	static EXTENSION = new Keyword("EXTENSION", { ignoreCase: true });
	static EXTENT = new Keyword("EXTENT", { ignoreCase: true });
	static EXTENT_SIZE = new Keyword("EXTENT_SIZE", { ignoreCase: true });
	static EXTERNAL = new Keyword("EXTERNAL", { ignoreCase: true });
	static EXTERNALLY = new Keyword("EXTERNALLY", { ignoreCase: true });
	static EXTRACT = new Keyword("EXTRACT", { ignoreCase: true });
	static EXTRACTVALUE = new Keyword("EXTRACTVALUE", { ignoreCase: true });
	static FACT = new Keyword("FACT", { ignoreCase: true });
	static FACTORIAL = new Keyword("FACTORIAL", { ignoreCase: true });
	static FAIL = new Keyword("FAIL", { ignoreCase: true });
	static FAILED = new Keyword("FAILED", { ignoreCase: true });
	static FAILED_LOGIN_ATTEMPTS = new Keyword("FAILED_LOGIN_ATTEMPTS", {
		ignoreCase: true,
	});
	static FAILGROUP = new Keyword("FAILGROUP", { ignoreCase: true });
	static FAILOVER = new Keyword("FAILOVER", { ignoreCase: true });
	static FALSE = new Keyword("FALSE", { ignoreCase: true });
	static FAMILY = new Keyword("FAMILY", { ignoreCase: true });
	static FAR = new Keyword("FAR", { ignoreCase: true });
	static FAST = new Keyword("FAST", { ignoreCase: true });
	static FEATURE = new Keyword("FEATURE", { ignoreCase: true });
	static FETCH = new Keyword("FETCH", { ignoreCase: true });
	static FIELD = new Keyword("FIELD", { ignoreCase: true });
	static FILE = new Keyword("FILE", { ignoreCase: true });
	static FILEGROUP = new Keyword("FILEGROUP", { ignoreCase: true });
	static FILESYSTEM_LIKE_LOGGING = new Keyword("FILESYSTEM_LIKE_LOGGING", {
		ignoreCase: true,
	});
	static FILE_BLOCK_SIZE = new Keyword("FILE_BLOCK_SIZE", { ignoreCase: true });
	static FILE_NAME_CONVERT = new Keyword("FILE_NAME_CONVERT", {
		ignoreCase: true,
	});
	static FILLFACTOR = new Keyword("FILLFACTOR", { ignoreCase: true });
	static FILTER = new Keyword("FILTER", { ignoreCase: true });
	static FINAL = new Keyword("FINAL", { ignoreCase: true });
	static FIND_IN_SET = new Keyword("FIND_IN_SET", { ignoreCase: true });
	static FINE = new Keyword("FINE", { ignoreCase: true });
	static FINISH = new Keyword("FINISH", { ignoreCase: true });
	static FIRST = new Keyword("FIRST", { ignoreCase: true });
	static FIRST_VALUE = new Keyword("FIRST_VALUE", { ignoreCase: true });
	static FIXED = new Keyword("FIXED", { ignoreCase: true });
	static FLASHBACK = new Keyword("FLASHBACK", { ignoreCase: true });
	static FLASH_CACHE = new Keyword("FLASH_CACHE", { ignoreCase: true });
	static FLEX = new Keyword("FLEX", { ignoreCase: true });
	static FLOAT = new Keyword("FLOAT", { ignoreCase: true });
	static FLOOR = new Keyword("FLOOR", { ignoreCase: true });
	static FLUSH = new Keyword("FLUSH", { ignoreCase: true });
	static FOLLOWING = new Keyword("FOLLOWING", { ignoreCase: true });
	static FOLLOWS = new Keyword("FOLLOWS", { ignoreCase: true });
	static FOR = new Keyword("FOR", { ignoreCase: true });
	static FORALL = new Keyword("FORALL", { ignoreCase: true });
	static FORCE = new Keyword("FORCE", { ignoreCase: true });
	static FOREIGN = new Keyword("FOREIGN", { ignoreCase: true });
	static FORMAT = new Keyword("FORMAT", { ignoreCase: true });
	static FORMAT_BYTES = new Keyword("FORMAT_BYTES", { ignoreCase: true });
	static FORMAT_PICO_TIME = new Keyword("FORMAT_PICO_TIME", {
		ignoreCase: true,
	});
	static FOUND = new Keyword("FOUND", { ignoreCase: true });
	static FOUND_ROWS = new Keyword("FOUND_ROWS", { ignoreCase: true });
	static FREEPOOLS = new Keyword("FREEPOOLS", { ignoreCase: true });
	static FREETEXT = new Keyword("FREETEXT", { ignoreCase: true });
	static FREETEXTTABLE = new Keyword("FREETEXTTABLE", { ignoreCase: true });
	static FREEZE = new Keyword("FREEZE", { ignoreCase: true });
	static FRESH = new Keyword("FRESH", { ignoreCase: true });
	static FROM = new Keyword("FROM", { ignoreCase: true });
	static FROM_BASE64 = new Keyword("FROM_BASE64", { ignoreCase: true });
	static FROM_DAYS = new Keyword("FROM_DAYS", { ignoreCase: true });
	static FROM_UNIXTIME = new Keyword("FROM_UNIXTIME", { ignoreCase: true });
	static FULL = new Keyword("FULL", { ignoreCase: true });
	static FULLTEXT = new Keyword("FULLTEXT", { ignoreCase: true });
	static FUNCTION = new Keyword("FUNCTION", { ignoreCase: true });
	static FUNCTIONS = new Keyword("FUNCTIONS", { ignoreCase: true });
	static G = new Keyword("G", { ignoreCase: true });
	static GCD = new Keyword("GCD", { ignoreCase: true });
	static GENERATED = new Keyword("GENERATED", { ignoreCase: true });
	static GENERATE_SERIES = new Keyword("GENERATE_SERIES", { ignoreCase: true });
	static GEN_RANDOM_UUID = new Keyword("GEN_RANDOM_UUID", { ignoreCase: true });
	static GEOGRAPHY = new Keyword("GEOGRAPHY", { ignoreCase: true });
	static GEOMCOLLECTION = new Keyword("GEOMCOLLECTION", { ignoreCase: true });
	static GEOMETRY = new Keyword("GEOMETRY", { ignoreCase: true });
	static GEOMETRYCOLLECTION = new Keyword("GEOMETRYCOLLECTION", {
		ignoreCase: true,
	});
	static GET = new Keyword("GET", { ignoreCase: true });
	static GETDATE = new Keyword("GETDATE", { ignoreCase: true });
	static GETUTCDATE = new Keyword("GETUTCDATE", { ignoreCase: true });
	static GET_BIT = new Keyword("GET_BIT", { ignoreCase: true });
	static GET_BYTE = new Keyword("GET_BYTE", { ignoreCase: true });
	static GET_CURRENT_TS_CONFIG = new Keyword("GET_CURRENT_TS_CONFIG", {
		ignoreCase: true,
	});
	static GET_FORMAT = new Keyword("GET_FORMAT", { ignoreCase: true });
	static GET_LOCK = new Keyword("GET_LOCK", { ignoreCase: true });
	static GLOB = new Keyword("GLOB", { ignoreCase: true });
	static GLOBAL = new Keyword("GLOBAL", { ignoreCase: true });
	static GLOBALLY = new Keyword("GLOBALLY", { ignoreCase: true });
	static GLOBAL_NAME = new Keyword("GLOBAL_NAME", { ignoreCase: true });
	static GLOBAL_TOPIC_ENABLED = new Keyword("GLOBAL_TOPIC_ENABLED", {
		ignoreCase: true,
	});
	static GO = new Keyword("GO", { ignoreCase: true });
	static GOTO = new Keyword("GOTO", { ignoreCase: true });
	static GRANT = new Keyword("GRANT", { ignoreCase: true });
	static GRANTED = new Keyword("GRANTED", { ignoreCase: true });
	static GREATEST = new Keyword("GREATEST", { ignoreCase: true });
	static GROUP = new Keyword("GROUP", { ignoreCase: true });
	static GROUPING = new Keyword("GROUPING", { ignoreCase: true });
	static GROUPING_ID = new Keyword("GROUPING_ID", { ignoreCase: true });
	static GROUPS = new Keyword("GROUPS", { ignoreCase: true });
	static GROUP_CONCAT = new Keyword("GROUP_CONCAT", { ignoreCase: true });
	static GROUP_ID = new Keyword("GROUP_ID", { ignoreCase: true });
	static GUARANTEE = new Keyword("GUARANTEE", { ignoreCase: true });
	static GUARD = new Keyword("GUARD", { ignoreCase: true });
	static H = new Keyword("H", { ignoreCase: true });
	static HALF_YEARS = new Keyword("HALF_YEARS", { ignoreCase: true });
	static HANDLER = new Keyword("HANDLER", { ignoreCase: true });
	static HASH = new Keyword("HASH", { ignoreCase: true });
	static HASHING = new Keyword("HASHING", { ignoreCase: true });
	static HASHKEYS = new Keyword("HASHKEYS", { ignoreCase: true });
	static HAS_ANY_COLUMN_PRIVILEGE = new Keyword("HAS_ANY_COLUMN_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_COLUMN_PRIVILEGE = new Keyword("HAS_COLUMN_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_DATABASE_PRIVILEGE = new Keyword("HAS_DATABASE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE = new Keyword(
		"HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE",
		{ ignoreCase: true },
	);
	static HAS_FUNCTION_PRIVILEGE = new Keyword("HAS_FUNCTION_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_LANGUAGE_PRIVILEGE = new Keyword("HAS_LANGUAGE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_PARAMETER_PRIVILEGE = new Keyword("HAS_PARAMETER_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_SCHEMA_PRIVILEGE = new Keyword("HAS_SCHEMA_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_SEQUENCE_PRIVILEGE = new Keyword("HAS_SEQUENCE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_SERVER_PRIVILEGE = new Keyword("HAS_SERVER_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_TABLESPACE_PRIVILEGE = new Keyword("HAS_TABLESPACE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_TABLE_PRIVILEGE = new Keyword("HAS_TABLE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAS_TYPE_PRIVILEGE = new Keyword("HAS_TYPE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAVING = new Keyword("HAVING", { ignoreCase: true });
	static HEAP = new Keyword("HEAP", { ignoreCase: true });
	static HEIGHT = new Keyword("HEIGHT", { ignoreCase: true });
	static HELP = new Keyword("HELP", { ignoreCase: true });
	static HEX = new Keyword("HEX", { ignoreCase: true });
	static HIERARCHIES = new Keyword("HIERARCHIES", { ignoreCase: true });
	static HIERARCHY = new Keyword("HIERARCHY", { ignoreCase: true });
	static HIERARCHYID = new Keyword("HIERARCHYID", { ignoreCase: true });
	static HIER_ORDER = new Keyword("HIER_ORDER", { ignoreCase: true });
	static HIGH = new Keyword("HIGH", { ignoreCase: true });
	static HIGH_PRIORITY = new Keyword("HIGH_PRIORITY", { ignoreCase: true });
	static HINT = new Keyword("HINT", { ignoreCase: true });
	static HISTORY = new Keyword("HISTORY", { ignoreCase: true });
	static HOLDLOCK = new Keyword("HOLDLOCK", { ignoreCase: true });
	static HOST = new Keyword("HOST", { ignoreCase: true });
	static HOSTMASK = new Keyword("HOSTMASK", { ignoreCase: true });
	static HOT = new Keyword("HOT", { ignoreCase: true });
	static HOUR = new Keyword("HOUR", { ignoreCase: true });
	static HOURS = new Keyword("HOURS", { ignoreCase: true });
	static HOUR_MICROSECOND = new Keyword("HOUR_MICROSECOND", {
		ignoreCase: true,
	});
	static HOUR_MINUTE = new Keyword("HOUR_MINUTE", { ignoreCase: true });
	static HOUR_SECOND = new Keyword("HOUR_SECOND", { ignoreCase: true });
	static HTTP = new Keyword("HTTP", { ignoreCase: true });
	static HTTPURITYPE = new Keyword("HTTPURITYPE", { ignoreCase: true });
	static IAM_GROUP_NAME = new Keyword("IAM_GROUP_NAME", { ignoreCase: true });
	static IAM_PRINCIPAL_NAME = new Keyword("IAM_PRINCIPAL_NAME", {
		ignoreCase: true,
	});
	static ICU_VERSION = new Keyword("ICU_VERSION", { ignoreCase: true });
	static ID = new Keyword("ID", { ignoreCase: true });
	static IDENT_CURRENT = new Keyword("IDENT_CURRENT", { ignoreCase: true });
	static IDENT_INCR = new Keyword("IDENT_INCR", { ignoreCase: true });
	static IDENT_SEED = new Keyword("IDENT_SEED", { ignoreCase: true });
	static IDENTIFIED = new Keyword("IDENTIFIED", { ignoreCase: true });
	static IDENTITY = new Keyword("IDENTITY", { ignoreCase: true });
	static IDENTITYCOL = new Keyword("IDENTITYCOL", { ignoreCase: true });
	static IDENTITY_INSERT = new Keyword("IDENTITY_INSERT", { ignoreCase: true });
	static IDLE_TIME = new Keyword("IDLE_TIME", { ignoreCase: true });
	static IETF_QUOTES = new Keyword("IETF_QUOTES", { ignoreCase: true });
	static IF = new Keyword("IF", { ignoreCase: true });
	static IFNULL = new Keyword("IFNULL", { ignoreCase: true });
	static IGNORE = new Keyword("IGNORE", { ignoreCase: true });
	static IGNORED = new Keyword("IGNORED", { ignoreCase: true });
	static IIF = new Keyword("IIF", { ignoreCase: true });
	static ILIKE = new Keyword("ILIKE", { ignoreCase: true });
	static IMMEDIATE = new Keyword("IMMEDIATE", { ignoreCase: true });
	static IMMUTABLE = new Keyword("IMMUTABLE", { ignoreCase: true });
	static IMPORT = new Keyword("IMPORT", { ignoreCase: true });
	static IN = new Keyword("IN", { ignoreCase: true });
	static INACTIVE = new Keyword("INACTIVE", { ignoreCase: true });
	static INACTIVE_ACCOUNT_TIME = new Keyword("INACTIVE_ACCOUNT_TIME", {
		ignoreCase: true,
	});
	static INCLUDE = new Keyword("INCLUDE", { ignoreCase: true });
	static INCLUDING = new Keyword("INCLUDING", { ignoreCase: true });
	static INCREMENT = new Keyword("INCREMENT", { ignoreCase: true });
	static INDEX = new Keyword("INDEX", { ignoreCase: true });
	static INDEXED = new Keyword("INDEXED", { ignoreCase: true });
	static INDEXES = new Keyword("INDEXES", { ignoreCase: true });
	static INDEXING = new Keyword("INDEXING", { ignoreCase: true });
	static INDEXTYPE = new Keyword("INDEXTYPE", { ignoreCase: true });
	static INDEXTYPES = new Keyword("INDEXTYPES", { ignoreCase: true });
	static INDICATOR = new Keyword("INDICATOR", { ignoreCase: true });
	static INDICES = new Keyword("INDICES", { ignoreCase: true });
	static INET6_ATON = new Keyword("INET6_ATON", { ignoreCase: true });
	static INET6_NTOA = new Keyword("INET6_NTOA", { ignoreCase: true });
	static INET_ATON = new Keyword("INET_ATON", { ignoreCase: true });
	static INET_CLIENT_ADDR = new Keyword("INET_CLIENT_ADDR", {
		ignoreCase: true,
	});
	static INET_CLIENT_PORT = new Keyword("INET_CLIENT_PORT", {
		ignoreCase: true,
	});
	static INET_MERGE = new Keyword("INET_MERGE", { ignoreCase: true });
	static INET_NTOA = new Keyword("INET_NTOA", { ignoreCase: true });
	static INET_SAME_FAMILY = new Keyword("INET_SAME_FAMILY", {
		ignoreCase: true,
	});
	static INET_SERVER_ADDR = new Keyword("INET_SERVER_ADDR", {
		ignoreCase: true,
	});
	static INET_SERVER_PORT = new Keyword("INET_SERVER_PORT", {
		ignoreCase: true,
	});
	static INFILE = new Keyword("INFILE", { ignoreCase: true });
	static INITCAP = new Keyword("INITCAP", { ignoreCase: true });
	static INITIAL = new Keyword("INITIAL", { ignoreCase: true });
	static INITIALIZED = new Keyword("INITIALIZED", { ignoreCase: true });
	static INITIALLY = new Keyword("INITIALLY", { ignoreCase: true });
	static INITIAL_SIZE = new Keyword("INITIAL_SIZE", { ignoreCase: true });
	static INITRANS = new Keyword("INITRANS", { ignoreCase: true });
	static INLINE = new Keyword("INLINE", { ignoreCase: true });
	static INMEMORY = new Keyword("INMEMORY", { ignoreCase: true });
	static INNER = new Keyword("INNER", { ignoreCase: true });
	static INOUT = new Keyword("INOUT", { ignoreCase: true });
	static INPLACE = new Keyword("INPLACE", { ignoreCase: true });
	static INSTEAD = new Keyword("INSTEAD", { ignoreCase: true });
	static INSENSITIVE = new Keyword("INSENSITIVE", { ignoreCase: true });
	static INSERT = new Keyword("INSERT", { ignoreCase: true });
	static INSERTING = new Keyword("INSERTING", { ignoreCase: true });
	static INSERT_METHOD = new Keyword("INSERT_METHOD", { ignoreCase: true });
	static INSTALL = new Keyword("INSTALL", { ignoreCase: true });
	static INSTANCE = new Keyword("INSTANCE", { ignoreCase: true });
	static INSTANCES = new Keyword("INSTANCES", { ignoreCase: true });
	static INSTANTIABLE = new Keyword("INSTANTIABLE", { ignoreCase: true });
	static INSTR = new Keyword("INSTR", { ignoreCase: true });
	static INSTR4 = new Keyword("INSTR4", { ignoreCase: true });
	static INSTRB = new Keyword("INSTRB", { ignoreCase: true });
	static INT = new Keyword("INT", { ignoreCase: true });
	static INTEGER = new Keyword("INTEGER", { ignoreCase: true });
	static INTERLEAVED = new Keyword("INTERLEAVED", { ignoreCase: true });
	static INTERNAL = new Keyword("INTERNAL", { ignoreCase: true });
	static INTERSECT = new Keyword("INTERSECT", { ignoreCase: true });
	static INTERVAL = new Keyword("INTERVAL", { ignoreCase: true });
	static INTO = new Keyword("INTO", { ignoreCase: true });
	static INVALIDATION = new Keyword("INVALIDATION", { ignoreCase: true });
	static INVISIBLE = new Keyword("INVISIBLE", { ignoreCase: true });
	static INVOKER = new Keyword("INVOKER", { ignoreCase: true });
	static IO_AFTER_GTIDS = new Keyword("IO_AFTER_GTIDS", { ignoreCase: true });
	static IO_BEFORE_GTIDS = new Keyword("IO_BEFORE_GTIDS", { ignoreCase: true });
	static IS = new Keyword("IS", { ignoreCase: true });
	static ISCLOSED = new Keyword("ISCLOSED", { ignoreCase: true });
	static ISDATE = new Keyword("ISDATE", { ignoreCase: true });
	static ISEMPTY = new Keyword("ISEMPTY", { ignoreCase: true });
	static ISFINITE = new Keyword("ISFINITE", { ignoreCase: true });
	static ISJSON = new Keyword("ISJSON", { ignoreCase: true });
	static ISNULL = new Keyword("ISNULL", { ignoreCase: true });
	static ISNUMERIC = new Keyword("ISNUMERIC", { ignoreCase: true });
	static ISODOW = new Keyword("ISODOW", { ignoreCase: true });
	static ISOLATE = new Keyword("ISOLATE", { ignoreCase: true });
	static ISOLATION = new Keyword("ISOLATION", { ignoreCase: true });
	static ISOPEN = new Keyword("ISOPEN", { ignoreCase: true });
	static ISOYEAR = new Keyword("ISOYEAR", { ignoreCase: true });
	static ISSUER = new Keyword("ISSUER", { ignoreCase: true });
	static IS_FREE_LOCK = new Keyword("IS_FREE_LOCK", { ignoreCase: true });
	static IS_IPV4 = new Keyword("IS_IPV4", { ignoreCase: true });
	static IS_IPV4_COMPAT = new Keyword("IS_IPV4_COMPAT", { ignoreCase: true });
	static IS_IPV4_MAPPED = new Keyword("IS_IPV4_MAPPED", { ignoreCase: true });
	static IS_IPV6 = new Keyword("IS_IPV6", { ignoreCase: true });
	static IS_LEAF = new Keyword("IS_LEAF", { ignoreCase: true });
	static IS_TEMPLATE = new Keyword("IS_TEMPLATE", { ignoreCase: true });
	static IS_USED_LOCK = new Keyword("IS_USED_LOCK", { ignoreCase: true });
	static IS_UUID = new Keyword("IS_UUID", { ignoreCase: true });
	static ITERATE = new Keyword("ITERATE", { ignoreCase: true });
	static JAVA = new Keyword("JAVA", { ignoreCase: true });
	static JOB = new Keyword("JOB", { ignoreCase: true });
	static JOIN = new Keyword("JOIN", { ignoreCase: true });
	static JSON = new Keyword("JSON", { ignoreCase: true });
	static JSONB_AGG = new Keyword("JSONB_AGG", { ignoreCase: true });
	static JSONB_ARRAY_ELEMENTS = new Keyword("JSONB_ARRAY_ELEMENTS", {
		ignoreCase: true,
	});
	static JSONB_ARRAY_ELEMENTS_TEXT = new Keyword("JSONB_ARRAY_ELEMENTS_TEXT", {
		ignoreCase: true,
	});
	static JSONB_ARRAY_LENGTH = new Keyword("JSONB_ARRAY_LENGTH", {
		ignoreCase: true,
	});
	static JSONB_BUILD_ARRAY = new Keyword("JSONB_BUILD_ARRAY", {
		ignoreCase: true,
	});
	static JSONB_BUILD_OBJECT = new Keyword("JSONB_BUILD_OBJECT", {
		ignoreCase: true,
	});
	static JSONB_EACH = new Keyword("JSONB_EACH", { ignoreCase: true });
	static JSONB_EACH_TEXT = new Keyword("JSONB_EACH_TEXT", { ignoreCase: true });
	static JSONB_EXTRACT_PATH = new Keyword("JSONB_EXTRACT_PATH", {
		ignoreCase: true,
	});
	static JSONB_EXTRACT_PATH_TEXT = new Keyword("JSONB_EXTRACT_PATH_TEXT", {
		ignoreCase: true,
	});
	static JSONB_INSERT = new Keyword("JSONB_INSERT", { ignoreCase: true });
	static JSONB_OBJECT = new Keyword("JSONB_OBJECT", { ignoreCase: true });
	static JSONB_OBJECT_AGG = new Keyword("JSONB_OBJECT_AGG", {
		ignoreCase: true,
	});
	static JSONB_OBJECT_KEYS = new Keyword("JSONB_OBJECT_KEYS", {
		ignoreCase: true,
	});
	static JSONB_PATH_EXISTS = new Keyword("JSONB_PATH_EXISTS", {
		ignoreCase: true,
	});
	static JSONB_PATH_EXISTS_TZ = new Keyword("JSONB_PATH_EXISTS_TZ", {
		ignoreCase: true,
	});
	static JSONB_PATH_MATCH = new Keyword("JSONB_PATH_MATCH", {
		ignoreCase: true,
	});
	static JSONB_PATH_MATCH_TZ = new Keyword("JSONB_PATH_MATCH_TZ", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY = new Keyword("JSONB_PATH_QUERY", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY_ARRAY = new Keyword("JSONB_PATH_QUERY_ARRAY", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY_ARRAY_TZ = new Keyword("JSONB_PATH_QUERY_ARRAY_TZ", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY_FIRST = new Keyword("JSONB_PATH_QUERY_FIRST", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY_FIRST_TZ = new Keyword("JSONB_PATH_QUERY_FIRST_TZ", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY_TZ = new Keyword("JSONB_PATH_QUERY_TZ", {
		ignoreCase: true,
	});
	static JSONB_POPULATE_RECORD = new Keyword("JSONB_POPULATE_RECORD", {
		ignoreCase: true,
	});
	static JSONB_POPULATE_RECORDSET = new Keyword("JSONB_POPULATE_RECORDSET", {
		ignoreCase: true,
	});
	static JSONB_PRETTY = new Keyword("JSONB_PRETTY", { ignoreCase: true });
	static JSONB_SET = new Keyword("JSONB_SET", { ignoreCase: true });
	static JSONB_SET_LAX = new Keyword("JSONB_SET_LAX", { ignoreCase: true });
	static JSONB_STRIP_NULLS = new Keyword("JSONB_STRIP_NULLS", {
		ignoreCase: true,
	});
	static JSONB_TO_RECORD = new Keyword("JSONB_TO_RECORD", { ignoreCase: true });
	static JSONB_TO_RECORDSET = new Keyword("JSONB_TO_RECORDSET", {
		ignoreCase: true,
	});
	static JSONB_TO_TSVECTOR = new Keyword("JSONB_TO_TSVECTOR", {
		ignoreCase: true,
	});
	static JSONB_TYPEOF = new Keyword("JSONB_TYPEOF", { ignoreCase: true });
	static JSON_AGG = new Keyword("JSON_AGG", { ignoreCase: true });
	static JSON_ARRAY = new Keyword("JSON_ARRAY", { ignoreCase: true });
	static JSON_ARRAYAGG = new Keyword("JSON_ARRAYAGG", { ignoreCase: true });
	static JSON_ARRAY_APPEND = new Keyword("JSON_ARRAY_APPEND", {
		ignoreCase: true,
	});
	static JSON_ARRAY_ELEMENTS = new Keyword("JSON_ARRAY_ELEMENTS", {
		ignoreCase: true,
	});
	static JSON_ARRAY_ELEMENTS_TEXT = new Keyword("JSON_ARRAY_ELEMENTS_TEXT", {
		ignoreCase: true,
	});
	static JSON_ARRAY_INSERT = new Keyword("JSON_ARRAY_INSERT", {
		ignoreCase: true,
	});
	static JSON_ARRAY_LENGTH = new Keyword("JSON_ARRAY_LENGTH", {
		ignoreCase: true,
	});
	static JSON_BUILD_ARRAY = new Keyword("JSON_BUILD_ARRAY", {
		ignoreCase: true,
	});
	static JSON_BUILD_OBJECT = new Keyword("JSON_BUILD_OBJECT", {
		ignoreCase: true,
	});
	static JSON_CONTAINS = new Keyword("JSON_CONTAINS", { ignoreCase: true });
	static JSON_CONTAINS_PATH = new Keyword("JSON_CONTAINS_PATH", {
		ignoreCase: true,
	});
	static JSON_DEPTH = new Keyword("JSON_DEPTH", { ignoreCase: true });
	static JSON_EACH = new Keyword("JSON_EACH", { ignoreCase: true });
	static JSON_EACH_TEXT = new Keyword("JSON_EACH_TEXT", { ignoreCase: true });
	static JSON_EXTRACT = new Keyword("JSON_EXTRACT", { ignoreCase: true });
	static JSON_EXTRACT_PATH = new Keyword("JSON_EXTRACT_PATH", {
		ignoreCase: true,
	});
	static JSON_EXTRACT_PATH_TEXT = new Keyword("JSON_EXTRACT_PATH_TEXT", {
		ignoreCase: true,
	});
	static JSON_GROUP_ARRAY = new Keyword("JSON_GROUP_ARRAY", {
		ignoreCase: true,
	});
	static JSON_GROUP_OBJECT = new Keyword("JSON_GROUP_OBJECT", {
		ignoreCase: true,
	});
	static JSON_INSERT = new Keyword("JSON_INSERT", { ignoreCase: true });
	static JSON_KEYS = new Keyword("JSON_KEYS", { ignoreCase: true });
	static JSON_LENGTH = new Keyword("JSON_LENGTH", { ignoreCase: true });
	static JSON_MERGE = new Keyword("JSON_MERGE", { ignoreCase: true });
	static JSON_MERGE_PATCH = new Keyword("JSON_MERGE_PATCH", {
		ignoreCase: true,
	});
	static JSON_MERGE_PRESERVE = new Keyword("JSON_MERGE_PRESERVE", {
		ignoreCase: true,
	});
	static JSON_MODIFY = new Keyword("JSON_MODIFY", { ignoreCase: true });
	static JSON_OBJECT = new Keyword("JSON_OBJECT", { ignoreCase: true });
	static JSON_OBJECTAGG = new Keyword("JSON_OBJECTAGG", { ignoreCase: true });
	static JSON_OBJECT_AGG = new Keyword("JSON_OBJECT_AGG", { ignoreCase: true });
	static JSON_OBJECT_KEYS = new Keyword("JSON_OBJECT_KEYS", {
		ignoreCase: true,
	});
	static JSON_OVERLAPS = new Keyword("JSON_OVERLAPS", { ignoreCase: true });
	static JSON_PATCH = new Keyword("JSON_PATCH", { ignoreCase: true });
	static JSON_PATH_EXISTS = new Keyword("JSON_PATH_EXISTS", {
		ignoreCase: true,
	});
	static JSON_POPULATE_RECORD = new Keyword("JSON_POPULATE_RECORD", {
		ignoreCase: true,
	});
	static JSON_POPULATE_RECORDSET = new Keyword("JSON_POPULATE_RECORDSET", {
		ignoreCase: true,
	});
	static JSON_PRETTY = new Keyword("JSON_PRETTY", { ignoreCase: true });
	static JSON_QUERY = new Keyword("JSON_QUERY", { ignoreCase: true });
	static JSON_QUOTE = new Keyword("JSON_QUOTE", { ignoreCase: true });
	static JSON_REMOVE = new Keyword("JSON_REMOVE", { ignoreCase: true });
	static JSON_REPLACE = new Keyword("JSON_REPLACE", { ignoreCase: true });
	static JSON_SCHEMA_VALID = new Keyword("JSON_SCHEMA_VALID", {
		ignoreCase: true,
	});
	static JSON_SCHEMA_VALIDATION_REPORT = new Keyword(
		"JSON_SCHEMA_VALIDATION_REPORT",
		{ ignoreCase: true },
	);
	static JSON_SEARCH = new Keyword("JSON_SEARCH", { ignoreCase: true });
	static JSON_SET = new Keyword("JSON_SET", { ignoreCase: true });
	static JSON_STORAGE_FREE = new Keyword("JSON_STORAGE_FREE", {
		ignoreCase: true,
	});
	static JSON_STORAGE_SIZE = new Keyword("JSON_STORAGE_SIZE", {
		ignoreCase: true,
	});
	static JSON_STRIP_NULLS = new Keyword("JSON_STRIP_NULLS", {
		ignoreCase: true,
	});
	static JSON_TABLE = new Keyword("JSON_TABLE", { ignoreCase: true });
	static JSON_TO_RECORD = new Keyword("JSON_TO_RECORD", { ignoreCase: true });
	static JSON_TO_RECORDSET = new Keyword("JSON_TO_RECORDSET", {
		ignoreCase: true,
	});
	static JSON_TO_TSVECTOR = new Keyword("JSON_TO_TSVECTOR", {
		ignoreCase: true,
	});
	static JSON_TREE = new Keyword("JSON_TREE", { ignoreCase: true });
	static JSON_TYPE = new Keyword("JSON_TYPE", { ignoreCase: true });
	static JSON_TYPEOF = new Keyword("JSON_TYPEOF", { ignoreCase: true });
	static JSON_UNQUOTE = new Keyword("JSON_UNQUOTE", { ignoreCase: true });
	static JSON_VALID = new Keyword("JSON_VALID", { ignoreCase: true });
	static JSON_VALUE = new Keyword("JSON_VALUE", { ignoreCase: true });
	static JULIAN = new Keyword("JULIAN", { ignoreCase: true });
	static JULIANDAY = new Keyword("JULIANDAY", { ignoreCase: true });
	static JUSTIFY_DAYS = new Keyword("JUSTIFY_DAYS", { ignoreCase: true });
	static JUSTIFY_HOURS = new Keyword("JUSTIFY_HOURS", { ignoreCase: true });
	static JUSTIFY_INTERVAL = new Keyword("JUSTIFY_INTERVAL", {
		ignoreCase: true,
	});
	static KEEP = new Keyword("KEEP", { ignoreCase: true });
	static KEEP_DUPLICATES = new Keyword("KEEP_DUPLICATES", { ignoreCase: true });
	static KEY = new Keyword("KEY", { ignoreCase: true });
	static KEYS = new Keyword("KEYS", { ignoreCase: true });
	static KEYSTORE = new Keyword("KEYSTORE", { ignoreCase: true });
	static KEY_BLOCK_SIZE = new Keyword("KEY_BLOCK_SIZE", { ignoreCase: true });
	static KILL = new Keyword("KILL", { ignoreCase: true });
	static LABEL = new Keyword("LABEL", { ignoreCase: true });
	static LAG = new Keyword("LAG", { ignoreCase: true });
	static LANGUAGE = new Keyword("LANGUAGE", { ignoreCase: true });
	static LARGE = new Keyword("LARGE", { ignoreCase: true });
	static LAST = new Keyword("LAST", { ignoreCase: true });
	static LASTVAL = new Keyword("LASTVAL", { ignoreCase: true });
	static LAST_DAY = new Keyword("LAST_DAY", { ignoreCase: true });
	static LAST_INSERT_ID = new Keyword("LAST_INSERT_ID", { ignoreCase: true });
	static LAST_INSERT_ROWID = new Keyword("LAST_INSERT_ROWID", {
		ignoreCase: true,
	});
	static LAST_VALUE = new Keyword("LAST_VALUE", { ignoreCase: true });
	static LATERAL = new Keyword("LATERAL", { ignoreCase: true });
	static LCASE = new Keyword("LCASE", { ignoreCase: true });
	static LCM = new Keyword("LCM", { ignoreCase: true });
	static LC_COLLATE = new Keyword("LC_COLLATE", { ignoreCase: true });
	static LC_CTYPE = new Keyword("LC_CTYPE", { ignoreCase: true });
	static LEAD = new Keyword("LEAD", { ignoreCase: true });
	static LEADING = new Keyword("LEADING", { ignoreCase: true });
	static LEAD_CDB = new Keyword("LEAD_CDB", { ignoreCase: true });
	static LEAD_CDB_URI = new Keyword("LEAD_CDB_URI", { ignoreCase: true });
	static LEAF = new Keyword("LEAF", { ignoreCase: true });
	static LEAST = new Keyword("LEAST", { ignoreCase: true });
	static LEAVE = new Keyword("LEAVE", { ignoreCase: true });
	static LEFT = new Keyword("LEFT", { ignoreCase: true });
	static LEN = new Keyword("LEN", { ignoreCase: true });
	static LENGTH = new Keyword("LENGTH", { ignoreCase: true });
	static LENGTH4 = new Keyword("LENGTH4", { ignoreCase: true });
	static LENGTHB = new Keyword("LENGTHB", { ignoreCase: true });
	static LESS = new Keyword("LESS", { ignoreCase: true });
	static LEVEL = new Keyword("LEVEL", { ignoreCase: true });
	static LEVELS = new Keyword("LEVELS", { ignoreCase: true });
	static LEVEL_NAME = new Keyword("LEVEL_NAME", { ignoreCase: true });
	static LIBRARY = new Keyword("LIBRARY", { ignoreCase: true });
	static LIKE = new Keyword("LIKE", { ignoreCase: true });
	static LIKE2 = new Keyword("LIKE2", { ignoreCase: true });
	static LIKE4 = new Keyword("LIKE4", { ignoreCase: true });
	static LIKEC = new Keyword("LIKEC", { ignoreCase: true });
	static LIKELIHOOD = new Keyword("LIKELIHOOD", { ignoreCase: true });
	static LIKELY = new Keyword("LIKELY", { ignoreCase: true });
	static LIMIT = new Keyword("LIMIT", { ignoreCase: true });
	static LINE = new Keyword("LINE", { ignoreCase: true });
	static LINEAR = new Keyword("LINEAR", { ignoreCase: true });
	static LINENO = new Keyword("LINENO", { ignoreCase: true });
	static LINES = new Keyword("LINES", { ignoreCase: true });
	static LINESTRING = new Keyword("LINESTRING", { ignoreCase: true });
	static LINK = new Keyword("LINK", { ignoreCase: true });
	static LIST = new Keyword("LIST", { ignoreCase: true });
	static LISTEN = new Keyword("LISTEN", { ignoreCase: true });
	static LITERAL = new Keyword("LITERAL", { ignoreCase: true });
	static LN = new Keyword("LN", { ignoreCase: true });
	static LNNVL = new Keyword("LNNVL", { ignoreCase: true });
	static LOAD = new Keyword("LOAD", { ignoreCase: true });
	static LOAD_EXTENSION = new Keyword("LOAD_EXTENSION", { ignoreCase: true });
	static LOAD_FILE = new Keyword("LOAD_FILE", { ignoreCase: true });
	static LOB = new Keyword("LOB", { ignoreCase: true });
	static LOBS = new Keyword("LOBS", { ignoreCase: true });
	static LOCAL = new Keyword("LOCAL", { ignoreCase: true });
	static LOCALTIME = new Keyword("LOCALTIME", { ignoreCase: true });
	static LOCALTIMESTAMP = new Keyword("LOCALTIMESTAMP", { ignoreCase: true });
	static LOCATE = new Keyword("LOCATE", { ignoreCase: true });
	static LOCATION = new Keyword("LOCATION", { ignoreCase: true });
	static LOCATOR = new Keyword("LOCATOR", { ignoreCase: true });
	static LOCK = new Keyword("LOCK", { ignoreCase: true });
	static LOCKDOWN = new Keyword("LOCKDOWN", { ignoreCase: true });
	static LOCKED = new Keyword("LOCKED", { ignoreCase: true });
	static LOCKING = new Keyword("LOCKING", { ignoreCase: true });
	static LOG = new Keyword("LOG", { ignoreCase: true });
	static LOG10 = new Keyword("LOG10", { ignoreCase: true });
	static LOG2 = new Keyword("LOG2", { ignoreCase: true });
	static LOGFILE = new Keyword("LOGFILE", { ignoreCase: true });
	static LOGFILES = new Keyword("LOGFILES", { ignoreCase: true });
	static LOGGING = new Keyword("LOGGING", { ignoreCase: true });
	static LOGICAL = new Keyword("LOGICAL", { ignoreCase: true });
	static LOGICAL_READS_PER_CALL = new Keyword("LOGICAL_READS_PER_CALL", {
		ignoreCase: true,
	});
	static LOGICAL_READS_PER_SESSION = new Keyword("LOGICAL_READS_PER_SESSION", {
		ignoreCase: true,
	});
	static LOGIN = new Keyword("LOGIN", { ignoreCase: true });
	static LOGS = new Keyword("LOGS", { ignoreCase: true });
	static LONG = new Keyword("LONG", { ignoreCase: true });
	static LONGBLOB = new Keyword("LONGBLOB", { ignoreCase: true });
	static LONGTEXT = new Keyword("LONGTEXT", { ignoreCase: true });
	static LOOP = new Keyword("LOOP", { ignoreCase: true });
	static LOST = new Keyword("LOST", { ignoreCase: true });
	static LOW = new Keyword("LOW", { ignoreCase: true });
	static LOWER = new Keyword("LOWER", { ignoreCase: true });
	static LOWER_INC = new Keyword("LOWER_INC", { ignoreCase: true });
	static LOWER_INF = new Keyword("LOWER_INF", { ignoreCase: true });
	static LOW_PRIORITY = new Keyword("LOW_PRIORITY", { ignoreCase: true });
	static LPAD = new Keyword("LPAD", { ignoreCase: true });
	static LSEG = new Keyword("LSEG", { ignoreCase: true });
	static LTRIM = new Keyword("LTRIM", { ignoreCase: true });
	static M = new Keyword("M", { ignoreCase: true });
	static MACADDR8_SET7BIT = new Keyword("MACADDR8_SET7BIT", {
		ignoreCase: true,
	});
	static MAIN = new Keyword("MAIN", { ignoreCase: true });
	static MAKEACLITEM = new Keyword("MAKEACLITEM", { ignoreCase: true });
	static MAKEDATE = new Keyword("MAKEDATE", { ignoreCase: true });
	static MAKETIME = new Keyword("MAKETIME", { ignoreCase: true });
	static MAKE_DATE = new Keyword("MAKE_DATE", { ignoreCase: true });
	static MAKE_INTERVAL = new Keyword("MAKE_INTERVAL", { ignoreCase: true });
	static MAKE_SET = new Keyword("MAKE_SET", { ignoreCase: true });
	static MAKE_TIME = new Keyword("MAKE_TIME", { ignoreCase: true });
	static MAKE_TIMESTAMP = new Keyword("MAKE_TIMESTAMP", { ignoreCase: true });
	static MAKE_TIMESTAMPTZ = new Keyword("MAKE_TIMESTAMPTZ", {
		ignoreCase: true,
	});
	static MANAGED = new Keyword("MANAGED", { ignoreCase: true });
	static MANAGEMENT = new Keyword("MANAGEMENT", { ignoreCase: true });
	static MANUAL = new Keyword("MANUAL", { ignoreCase: true });
	static MAP = new Keyword("MAP", { ignoreCase: true });
	static MAPPING = new Keyword("MAPPING", { ignoreCase: true });
	static MASKLEN = new Keyword("MASKLEN", { ignoreCase: true });
	static MASTER = new Keyword("MASTER", { ignoreCase: true });
	static MASTER_BIND = new Keyword("MASTER_BIND", { ignoreCase: true });
	static MASTER_POS_WAIT = new Keyword("MASTER_POS_WAIT", { ignoreCase: true });
	static MASTER_SERVER_ID = new Keyword("MASTER_SERVER_ID", {
		ignoreCase: true,
	});
	static MASTER_SSL_VERIFY_SERVER_CERT = new Keyword(
		"MASTER_SSL_VERIFY_SERVER_CERT",
		{ ignoreCase: true },
	);
	static MATCH = new Keyword("MATCH", { ignoreCase: true });
	static MATCHED = new Keyword("MATCHED", { ignoreCase: true });
	static MATCH_NUMBER = new Keyword("MATCH_NUMBER", { ignoreCase: true });
	static MATCH_RECOGNIZE = new Keyword("MATCH_RECOGNIZE", { ignoreCase: true });
	static MATERIALIZED = new Keyword("MATERIALIZED", { ignoreCase: true });
	static MAX = new Keyword("MAX", { ignoreCase: true });
	static MAXDATAFILES = new Keyword("MAXDATAFILES", { ignoreCase: true });
	static MAXEXTENTS = new Keyword("MAXEXTENTS", { ignoreCase: true });
	static MAXIMIZE = new Keyword("MAXIMIZE", { ignoreCase: true });
	static MAXINSTANCES = new Keyword("MAXINSTANCES", { ignoreCase: true });
	static MAXLEN = new Keyword("MAXLEN", { ignoreCase: true });
	static MAXLOGFILES = new Keyword("MAXLOGFILES", { ignoreCase: true });
	static MAXLOGHISTORY = new Keyword("MAXLOGHISTORY", { ignoreCase: true });
	static MAXLOGMEMBERS = new Keyword("MAXLOGMEMBERS", { ignoreCase: true });
	static MAXSIZE = new Keyword("MAXSIZE", { ignoreCase: true });
	static MAXVALUE = new Keyword("MAXVALUE", { ignoreCase: true });
	static MAX_AUDIT_SIZE = new Keyword("MAX_AUDIT_SIZE", { ignoreCase: true });
	static MAX_CONNECTIONS_PER_HOUR = new Keyword("MAX_CONNECTIONS_PER_HOUR", {
		ignoreCase: true,
	});
	static MAX_DIAG_SIZE = new Keyword("MAX_DIAG_SIZE", { ignoreCase: true });
	static MAX_QUERIES_PER_HOUR = new Keyword("MAX_QUERIES_PER_HOUR", {
		ignoreCase: true,
	});
	static MAX_ROWS = new Keyword("MAX_ROWS", { ignoreCase: true });
	static MAX_SIZE = new Keyword("MAX_SIZE", { ignoreCase: true });
	static MAX_UPDATES_PER_HOUR = new Keyword("MAX_UPDATES_PER_HOUR", {
		ignoreCase: true,
	});
	static MAX_USER_CONNECTIONS = new Keyword("MAX_USER_CONNECTIONS", {
		ignoreCase: true,
	});
	static MBRCONTAINS = new Keyword("MBRCONTAINS", { ignoreCase: true });
	static MBRCOVEREDBY = new Keyword("MBRCOVEREDBY", { ignoreCase: true });
	static MBRCOVERS = new Keyword("MBRCOVERS", { ignoreCase: true });
	static MBRDISJOINT = new Keyword("MBRDISJOINT", { ignoreCase: true });
	static MBREQUALS = new Keyword("MBREQUALS", { ignoreCase: true });
	static MBRINTERSECTS = new Keyword("MBRINTERSECTS", { ignoreCase: true });
	static MBROVERLAPS = new Keyword("MBROVERLAPS", { ignoreCase: true });
	static MBRTOUCHES = new Keyword("MBRTOUCHES", { ignoreCase: true });
	static MBRWITHIN = new Keyword("MBRWITHIN", { ignoreCase: true });
	static MD5 = new Keyword("MD5", { ignoreCase: true });
	static MEASURE = new Keyword("MEASURE", { ignoreCase: true });
	static MEASURES = new Keyword("MEASURES", { ignoreCase: true });
	static MEDIUM = new Keyword("MEDIUM", { ignoreCase: true });
	static MEDIUMBLOB = new Keyword("MEDIUMBLOB", { ignoreCase: true });
	static MEDIUMINT = new Keyword("MEDIUMINT", { ignoreCase: true });
	static MEDIUMTEXT = new Keyword("MEDIUMTEXT", { ignoreCase: true });
	static MEMBER = new Keyword("MEMBER", { ignoreCase: true });
	static MEMBER_CAPTION = new Keyword("MEMBER_CAPTION", { ignoreCase: true });
	static MEMBER_DESCRIPTION = new Keyword("MEMBER_DESCRIPTION", {
		ignoreCase: true,
	});
	static MEMBER_NAME = new Keyword("MEMBER_NAME", { ignoreCase: true });
	static MEMBER_OF = new Keyword("MEMBER_OF", { ignoreCase: true });
	static MEMBER_UNIQUE_NAME = new Keyword("MEMBER_UNIQUE_NAME", {
		ignoreCase: true,
	});
	static MEMCOMPRESS = new Keyword("MEMCOMPRESS", { ignoreCase: true });
	static MEMOPTIMIZE = new Keyword("MEMOPTIMIZE", { ignoreCase: true });
	static MEMORY = new Keyword("MEMORY", { ignoreCase: true });
	static MERGE = new Keyword("MERGE", { ignoreCase: true });
	static MESSAGE = new Keyword("MESSAGE", { ignoreCase: true });
	static METADATA = new Keyword("METADATA", { ignoreCase: true });
	static METHOD = new Keyword("METHOD", { ignoreCase: true });
	static MICROSECOND = new Keyword("MICROSECOND", { ignoreCase: true });
	static MICROSECONDS = new Keyword("MICROSECONDS", { ignoreCase: true });
	static MID = new Keyword("MID", { ignoreCase: true });
	static MIDDLEINT = new Keyword("MIDDLEINT", { ignoreCase: true });
	static MIGRATE = new Keyword("MIGRATE", { ignoreCase: true });
	static MIGRATION = new Keyword("MIGRATION", { ignoreCase: true });
	static MILLENNIUM = new Keyword("MILLENNIUM", { ignoreCase: true });
	static MILLISECONDS = new Keyword("MILLISECONDS", { ignoreCase: true });
	static MIN = new Keyword("MIN", { ignoreCase: true });
	static MINIMUM = new Keyword("MINIMUM", { ignoreCase: true });
	static MINING = new Keyword("MINING", { ignoreCase: true });
	static MINUS = new Keyword("MINUS", { ignoreCase: true });
	static MINUTE = new Keyword("MINUTE", { ignoreCase: true });
	static MINUTES = new Keyword("MINUTES", { ignoreCase: true });
	static MINUTE_MICROSECOND = new Keyword("MINUTE_MICROSECOND", {
		ignoreCase: true,
	});
	static MINUTE_SECOND = new Keyword("MINUTE_SECOND", { ignoreCase: true });
	static MINVALUE = new Keyword("MINVALUE", { ignoreCase: true });
	static MIN_ROWS = new Keyword("MIN_ROWS", { ignoreCase: true });
	static MIN_SCALE = new Keyword("MIN_SCALE", { ignoreCase: true });
	static MIRROR = new Keyword("MIRROR", { ignoreCase: true });
	static MIRRORCOLD = new Keyword("MIRRORCOLD", { ignoreCase: true });
	static MIRRORHOT = new Keyword("MIRRORHOT", { ignoreCase: true });
	static MLSLABEL = new Keyword("MLSLABEL", { ignoreCase: true });
	static MOD = new Keyword("MOD", { ignoreCase: true });
	static MODE = new Keyword("MODE", { ignoreCase: true });
	static MODEL = new Keyword("MODEL", { ignoreCase: true });
	static MODIFICATION = new Keyword("MODIFICATION", { ignoreCase: true });
	static MODIFIES = new Keyword("MODIFIES", { ignoreCase: true });
	static MODIFY = new Keyword("MODIFY", { ignoreCase: true });
	static MONEY = new Keyword("MONEY", { ignoreCase: true });
	static MONITORING = new Keyword("MONITORING", { ignoreCase: true });
	static MONTH = new Keyword("MONTH", { ignoreCase: true });
	static MONTHNAME = new Keyword("MONTHNAME", { ignoreCase: true });
	static MONTHS = new Keyword("MONTHS", { ignoreCase: true });
	static MONTHS_BETWEEN = new Keyword("MONTHS_BETWEEN", { ignoreCase: true });
	static MOUNT = new Keyword("MOUNT", { ignoreCase: true });
	static MOUNTPATH = new Keyword("MOUNTPATH", { ignoreCase: true });
	static MOVE = new Keyword("MOVE", { ignoreCase: true });
	static MOVEMENT = new Keyword("MOVEMENT", { ignoreCase: true });
	static MULTILINESTRING = new Keyword("MULTILINESTRING", { ignoreCase: true });
	static MULTIPOINT = new Keyword("MULTIPOINT", { ignoreCase: true });
	static MULTIPOLYGON = new Keyword("MULTIPOLYGON", { ignoreCase: true });
	static MULTIRANGE = new Keyword("MULTIRANGE", { ignoreCase: true });
	static NAME = new Keyword("NAME", { ignoreCase: true });
	static NAMED = new Keyword("NAMED", { ignoreCase: true });
	static NAMES = new Keyword("NAMES", { ignoreCase: true });
	static NAMESPACE = new Keyword("NAMESPACE", { ignoreCase: true });
	static NAME_CONST = new Keyword("NAME_CONST", { ignoreCase: true });
	static NATIONAL = new Keyword("NATIONAL", { ignoreCase: true });
	static NATURAL = new Keyword("NATURAL", { ignoreCase: true });
	static NATURALN = new Keyword("NATURALN", { ignoreCase: true });
	static NAV = new Keyword("NAV", { ignoreCase: true });
	static NCHAR = new Keyword("NCHAR", { ignoreCase: true });
	static NCHR = new Keyword("NCHR", { ignoreCase: true });
	static NESTED = new Keyword("NESTED", { ignoreCase: true });
	static NESTED_TABLE_ID = new Keyword("NESTED_TABLE_ID", { ignoreCase: true });
	static NETMASK = new Keyword("NETMASK", { ignoreCase: true });
	static NETWORK = new Keyword("NETWORK", { ignoreCase: true });
	static NEVER = new Keyword("NEVER", { ignoreCase: true });
	static NEW = new Keyword("NEW", { ignoreCase: true });
	static NEXT = new Keyword("NEXT", { ignoreCase: true });
	static NEXTVAL = new Keyword("NEXTVAL", { ignoreCase: true });
	static NFC = new Keyword("NFC", { ignoreCase: true });
	static NFD = new Keyword("NFD", { ignoreCase: true });
	static NFKC = new Keyword("NFKC", { ignoreCase: true });
	static NFKD = new Keyword("NFKD", { ignoreCase: true });
	static NLSSORT = new Keyword("NLSSORT", { ignoreCase: true });
	static NLS_CHARSET_ID = new Keyword("NLS_CHARSET_ID", { ignoreCase: true });
	static NLS_CHARSET_NAME = new Keyword("NLS_CHARSET_NAME", {
		ignoreCase: true,
	});
	static NO = new Keyword("NO", { ignoreCase: true });
	static NOARCHIVELOG = new Keyword("NOARCHIVELOG", { ignoreCase: true });
	static NOAUDIT = new Keyword("NOAUDIT", { ignoreCase: true });
	static NOCACHE = new Keyword("NOCACHE", { ignoreCase: true });
	static NOCASE = new Keyword("NOCASE", { ignoreCase: true });
	static NOCHECK = new Keyword("NOCHECK", { ignoreCase: true });
	static NOCOMPRESS = new Keyword("NOCOMPRESS", { ignoreCase: true });
	static NOCOPY = new Keyword("NOCOPY", { ignoreCase: true });
	static NOCYCLE = new Keyword("NOCYCLE", { ignoreCase: true });
	static NODEGROUP = new Keyword("NODEGROUP", { ignoreCase: true });
	static NODELAY = new Keyword("NODELAY", { ignoreCase: true });
	static NOFORCE = new Keyword("NOFORCE", { ignoreCase: true });
	static NOGUARANTEE = new Keyword("NOGUARANTEE", { ignoreCase: true });
	static NOKEEP = new Keyword("NOKEEP", { ignoreCase: true });
	static NOMAPPING = new Keyword("NOMAPPING", { ignoreCase: true });
	static NOMAXVALUE = new Keyword("NOMAXVALUE", { ignoreCase: true });
	static NOMINVALUE = new Keyword("NOMINVALUE", { ignoreCase: true });
	static NOMONITORING = new Keyword("NOMONITORING", { ignoreCase: true });
	static NON = new Keyword("NON", { ignoreCase: true });
	static NONCLUSTERED = new Keyword("NONCLUSTERED", { ignoreCase: true });
	static NONE = new Keyword("NONE", { ignoreCase: true });
	static NONEDITIONABLE = new Keyword("NONEDITIONABLE", { ignoreCase: true });
	static NONSCHEMA = new Keyword("NONSCHEMA", { ignoreCase: true });
	static NOORDER = new Keyword("NOORDER", { ignoreCase: true });
	static NOPARALLEL = new Keyword("NOPARALLEL", { ignoreCase: true });
	static NORELOCATE = new Keyword("NORELOCATE", { ignoreCase: true });
	static NORELY = new Keyword("NORELY", { ignoreCase: true });
	static NOREPAIR = new Keyword("NOREPAIR", { ignoreCase: true });
	static NOREPLY = new Keyword("NOREPLY", { ignoreCase: true });
	static NORESETLOGS = new Keyword("NORESETLOGS", { ignoreCase: true });
	static NOREVERSE = new Keyword("NOREVERSE", { ignoreCase: true });
	static NORMAL = new Keyword("NORMAL", { ignoreCase: true });
	static NORMALIZED = new Keyword("NORMALIZED", { ignoreCase: true });
	static NOROWDEPENDENCIES = new Keyword("NOROWDEPENDENCIES", {
		ignoreCase: true,
	});
	static NOSCALE = new Keyword("NOSCALE", { ignoreCase: true });
	static NOSHARED = new Keyword("NOSHARED", { ignoreCase: true });
	static NOSORT = new Keyword("NOSORT", { ignoreCase: true });
	static NOSWITCH = new Keyword("NOSWITCH", { ignoreCase: true });
	static NOT = new Keyword("NOT", { ignoreCase: true });
	static NOTFOUND = new Keyword("NOTFOUND", { ignoreCase: true });
	static NOTHING = new Keyword("NOTHING", { ignoreCase: true });
	static NOTIFY = new Keyword("NOTIFY", { ignoreCase: true });
	static NOTIFICATION = new Keyword("NOTIFICATION", { ignoreCase: true });
	static NOTNULL = new Keyword("NOTNULL", { ignoreCase: true });
	static NOT_FEASIBLE = new Keyword("NOT_FEASIBLE", { ignoreCase: true });
	static NOT_FEASIBLE_END = new Keyword("NOT_FEASIBLE_END", {
		ignoreCase: true,
	});
	static NOT_FEASIBLE_START = new Keyword("NOT_FEASIBLE_START", {
		ignoreCase: true,
	});
	static NOVALIDATE = new Keyword("NOVALIDATE", { ignoreCase: true });
	static NOW = new Keyword("NOW", { ignoreCase: true });
	static NOWAIT = new Keyword("NOWAIT", { ignoreCase: true });
	static NO_WRITE_TO_BINLOG = new Keyword("NO_WRITE_TO_BINLOG", {
		ignoreCase: true,
	});
	static NPOINTS = new Keyword("NPOINTS", { ignoreCase: true });
	static NTH_VALUE = new Keyword("NTH_VALUE", { ignoreCase: true });
	static NTILE = new Keyword("NTILE", { ignoreCase: true });
	static NULL = new Keyword("NULL", { ignoreCase: true });
	static NULLIF = new Keyword("NULLIF", { ignoreCase: true });
	static NULLS = new Keyword("NULLS", { ignoreCase: true });
	static NUMBER = new Keyword("NUMBER", { ignoreCase: true });
	static NUMERIC = new Keyword("NUMERIC", { ignoreCase: true });
	static NUMNODE = new Keyword("NUMNODE", { ignoreCase: true });
	static NUMTODSINTERVAL = new Keyword("NUMTODSINTERVAL", { ignoreCase: true });
	static NUMTOYMINTERVAL = new Keyword("NUMTOYMINTERVAL", { ignoreCase: true });
	static NUM_NONNULLS = new Keyword("NUM_NONNULLS", { ignoreCase: true });
	static NUM_NULLS = new Keyword("NUM_NULLS", { ignoreCase: true });
	static NVARCHAR = new Keyword("NVARCHAR", { ignoreCase: true });
	static NVARCHAR2 = new Keyword("NVARCHAR2", { ignoreCase: true });
	static NVL = new Keyword("NVL", { ignoreCase: true });
	static NVL2 = new Keyword("NVL2", { ignoreCase: true });
	static OBJECT = new Keyword("OBJECT", { ignoreCase: true });
	static OBJECT_ID = new Keyword("OBJECT_ID", { ignoreCase: true });
	static OBJECT_VALUE = new Keyword("OBJECT_VALUE", { ignoreCase: true });
	static OCT = new Keyword("OCT", { ignoreCase: true });
	static OCTET_LENGTH = new Keyword("OCTET_LENGTH", { ignoreCase: true });
	static OF = new Keyword("OF", { ignoreCase: true });
	static OFF = new Keyword("OFF", { ignoreCase: true });
	static OFFLINE = new Keyword("OFFLINE", { ignoreCase: true });
	static OFFSET = new Keyword("OFFSET", { ignoreCase: true });
	static OFFSETS = new Keyword("OFFSETS", { ignoreCase: true });
	static OID = new Keyword("OID", { ignoreCase: true });
	static OIDINDEX = new Keyword("OIDINDEX", { ignoreCase: true });
	static OLD = new Keyword("OLD", { ignoreCase: true });
	static OLTP = new Keyword("OLTP", { ignoreCase: true });
	static ON = new Keyword("ON", { ignoreCase: true });
	static ONE = new Keyword("ONE", { ignoreCase: true });
	static ONLINE = new Keyword("ONLINE", { ignoreCase: true });
	static ONLY = new Keyword("ONLY", { ignoreCase: true });
	static OPAQUE = new Keyword("OPAQUE", { ignoreCase: true });
	static OPEN = new Keyword("OPEN", { ignoreCase: true });
	static OPENDATASOURCE = new Keyword("OPENDATASOURCE", { ignoreCase: true });
	static OPENJSON = new Keyword("OPENJSON", { ignoreCase: true });
	static OPENQUERY = new Keyword("OPENQUERY", { ignoreCase: true });
	static OPENROWSET = new Keyword("OPENROWSET", { ignoreCase: true });
	static OPENXML = new Keyword("OPENXML", { ignoreCase: true });
	static OPERATOR = new Keyword("OPERATOR", { ignoreCase: true });
	static OPTIMIZE = new Keyword("OPTIMIZE", { ignoreCase: true });
	static OPTIMIZER_COSTS = new Keyword("OPTIMIZER_COSTS", { ignoreCase: true });
	static OPTION = new Keyword("OPTION", { ignoreCase: true });
	static OPTIONAL = new Keyword("OPTIONAL", { ignoreCase: true });
	static OPTIONALLY = new Keyword("OPTIONALLY", { ignoreCase: true });
	static OPTIONS = new Keyword("OPTIONS", { ignoreCase: true });
	static OR = new Keyword("OR", { ignoreCase: true });
	static ORA_ROWSCN = new Keyword("ORA_ROWSCN", { ignoreCase: true });
	static ORD = new Keyword("ORD", { ignoreCase: true });
	static ORDAUDIO = new Keyword("ORDAUDIO", { ignoreCase: true });
	static ORDDICOM = new Keyword("ORDDICOM", { ignoreCase: true });
	static ORDDOC = new Keyword("ORDDOC", { ignoreCase: true });
	static ORDER = new Keyword("ORDER", { ignoreCase: true });
	static ORDIMAGE = new Keyword("ORDIMAGE", { ignoreCase: true });
	static ORDIMAGESIGNATURE = new Keyword("ORDIMAGESIGNATURE", {
		ignoreCase: true,
	});
	static ORDINALITY = new Keyword("ORDINALITY", { ignoreCase: true });
	static ORDVIDEO = new Keyword("ORDVIDEO", { ignoreCase: true });
	static ORGANIZATION = new Keyword("ORGANIZATION", { ignoreCase: true });
	static OTHER = new Keyword("OTHER", { ignoreCase: true });
	static OTHERS = new Keyword("OTHERS", { ignoreCase: true });
	static OUT = new Keyword("OUT", { ignoreCase: true });
	static OUTER = new Keyword("OUTER", { ignoreCase: true });
	static OUTFILE = new Keyword("OUTFILE", { ignoreCase: true });
	static OUTLINE = new Keyword("OUTLINE", { ignoreCase: true });
	static OVER = new Keyword("OVER", { ignoreCase: true });
	static OVERFLOW = new Keyword("OVERFLOW", { ignoreCase: true });
	static OVERLAPS = new Keyword("OVERLAPS", { ignoreCase: true });
	static OVERLAY = new Keyword("OVERLAY", { ignoreCase: true });
	static OVERRIDING = new Keyword("OVERRIDING", { ignoreCase: true });
	static OWNED = new Keyword("OWNED", { ignoreCase: true });
	static OWNER = new Keyword("OWNER", { ignoreCase: true });
	static OWNERSHIP = new Keyword("OWNERSHIP", { ignoreCase: true });
	static P = new Keyword("P", { ignoreCase: true });
	static PACKAGE = new Keyword("PACKAGE", { ignoreCase: true });
	static PACKAGES = new Keyword("PACKAGES", { ignoreCase: true });
	static PACK_KEYS = new Keyword("PACK_KEYS", { ignoreCase: true });
	static PAGE_CHECKSUM = new Keyword("PAGE_CHECKSUM", { ignoreCase: true });
	static PAGE_COMPRESSED = new Keyword("PAGE_COMPRESSED", { ignoreCase: true });
	static PAGE_COMPRESSION_LEVEL = new Keyword("PAGE_COMPRESSION_LEVEL", {
		ignoreCase: true,
	});
	static PARALLEL = new Keyword("PARALLEL", { ignoreCase: true });
	static PARALLEL_ENABLE = new Keyword("PARALLEL_ENABLE", { ignoreCase: true });
	static PARAMETERS = new Keyword("PARAMETERS", { ignoreCase: true });
	static PARENT_LEVEL_NAME = new Keyword("PARENT_LEVEL_NAME", {
		ignoreCase: true,
	});
	static PARENT_UNIQUE_NAME = new Keyword("PARENT_UNIQUE_NAME", {
		ignoreCase: true,
	});
	static PARITY = new Keyword("PARITY", { ignoreCase: true });
	static PARSE = new Keyword("PARSE", { ignoreCase: true });
	static PARSER = new Keyword("PARSER", { ignoreCase: true });
	static PARSE_GCOL_EXPR = new Keyword("PARSE_GCOL_EXPR", { ignoreCase: true });
	static PARSE_IDENT = new Keyword("PARSE_IDENT", { ignoreCase: true });
	static PARTIAL = new Keyword("PARTIAL", { ignoreCase: true });
	static PARTITION = new Keyword("PARTITION", { ignoreCase: true });
	static PARTITIONS = new Keyword("PARTITIONS", { ignoreCase: true });
	static PARTITIONSET = new Keyword("PARTITIONSET", { ignoreCase: true });
	static PASSING = new Keyword("PASSING", { ignoreCase: true });
	static PASSWORD = new Keyword("PASSWORD", { ignoreCase: true });
	static PASSWORDFILE_METADATA_CACHE = new Keyword(
		"PASSWORDFILE_METADATA_CACHE",
		{ ignoreCase: true },
	);
	static PASSWORD_GRACE_TIME = new Keyword("PASSWORD_GRACE_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_LIFE_TIME = new Keyword("PASSWORD_LIFE_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_LOCK_TIME = new Keyword("PASSWORD_LOCK_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_REUSE_MAX = new Keyword("PASSWORD_REUSE_MAX", {
		ignoreCase: true,
	});
	static PASSWORD_REUSE_TIME = new Keyword("PASSWORD_REUSE_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_ROLLOVER_TIME = new Keyword("PASSWORD_ROLLOVER_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_VERIFY_FUNCTION = new Keyword("PASSWORD_VERIFY_FUNCTION", {
		ignoreCase: true,
	});
	static PATCH = new Keyword("PATCH", { ignoreCase: true });
	static PATH = new Keyword("PATH", { ignoreCase: true });
	static PATH_PREFIX = new Keyword("PATH_PREFIX", { ignoreCase: true });
	static PATINDEX = new Keyword("PATINDEX", { ignoreCase: true });
	static PATTERN = new Keyword("PATTERN", { ignoreCase: true });
	static PCLOSE = new Keyword("PCLOSE", { ignoreCase: true });
	static PCTFREE = new Keyword("PCTFREE", { ignoreCase: true });
	static PCTTHRESHOLD = new Keyword("PCTTHRESHOLD", { ignoreCase: true });
	static PCTUSED = new Keyword("PCTUSED", { ignoreCase: true });
	static PCTVERSION = new Keyword("PCTVERSION", { ignoreCase: true });
	static PER = new Keyword("PER", { ignoreCase: true });
	static PERCENT = new Keyword("PERCENT", { ignoreCase: true });
	static PERCENTILE_CONT = new Keyword("PERCENTILE_CONT", { ignoreCase: true });
	static PERCENTILE_DISC = new Keyword("PERCENTILE_DISC", { ignoreCase: true });
	static PERCENT_RANK = new Keyword("PERCENT_RANK", { ignoreCase: true });
	static PERFORMANCE = new Keyword("PERFORMANCE", { ignoreCase: true });
	static PERIOD = new Keyword("PERIOD", { ignoreCase: true });
	static PERIOD_ADD = new Keyword("PERIOD_ADD", { ignoreCase: true });
	static PERIOD_DIFF = new Keyword("PERIOD_DIFF", { ignoreCase: true });
	static PERMANENT = new Keyword("PERMANENT", { ignoreCase: true });
	static PERMISSION = new Keyword("PERMISSION", { ignoreCase: true });
	static PFILE = new Keyword("PFILE", { ignoreCase: true });
	static PG_ADVISORY_LOCK = new Keyword("PG_ADVISORY_LOCK", {
		ignoreCase: true,
	});
	static PG_ADVISORY_LOCK_SHARED = new Keyword("PG_ADVISORY_LOCK_SHARED", {
		ignoreCase: true,
	});
	static PG_ADVISORY_UNLOCK = new Keyword("PG_ADVISORY_UNLOCK", {
		ignoreCase: true,
	});
	static PG_ADVISORY_UNLOCK_ALL = new Keyword("PG_ADVISORY_UNLOCK_ALL", {
		ignoreCase: true,
	});
	static PG_ADVISORY_UNLOCK_SHARED = new Keyword("PG_ADVISORY_UNLOCK_SHARED", {
		ignoreCase: true,
	});
	static PG_ADVISORY_XACT_LOCK = new Keyword("PG_ADVISORY_XACT_LOCK", {
		ignoreCase: true,
	});
	static PG_ADVISORY_XACT_LOCK_SHARED = new Keyword(
		"PG_ADVISORY_XACT_LOCK_SHARED",
		{ ignoreCase: true },
	);
	static PG_BACKEND_PID = new Keyword("PG_BACKEND_PID", { ignoreCase: true });
	static PG_BLOCKING_PIDS = new Keyword("PG_BLOCKING_PIDS", {
		ignoreCase: true,
	});
	static PG_CLIENT_ENCODING = new Keyword("PG_CLIENT_ENCODING", {
		ignoreCase: true,
	});
	static PG_COLLATION_IS_VISIBLE = new Keyword("PG_COLLATION_IS_VISIBLE", {
		ignoreCase: true,
	});
	static PG_CONF_LOAD_TIME = new Keyword("PG_CONF_LOAD_TIME", {
		ignoreCase: true,
	});
	static PG_CONVERSION_IS_VISIBLE = new Keyword("PG_CONVERSION_IS_VISIBLE", {
		ignoreCase: true,
	});
	static PG_CURRENT_LOGFILE = new Keyword("PG_CURRENT_LOGFILE", {
		ignoreCase: true,
	});
	static PG_EVENT_TRIGGER_DDL_COMMANDS = new Keyword(
		"PG_EVENT_TRIGGER_DDL_COMMANDS",
		{ ignoreCase: true },
	);
	static PG_EVENT_TRIGGER_DROPPED_OBJECTS = new Keyword(
		"PG_EVENT_TRIGGER_DROPPED_OBJECTS",
		{ ignoreCase: true },
	);
	static PG_EVENT_TRIGGER_TABLE_REWRITE_OID = new Keyword(
		"PG_EVENT_TRIGGER_TABLE_REWRITE_OID",
		{ ignoreCase: true },
	);
	static PG_EVENT_TRIGGER_TABLE_REWRITE_REASON = new Keyword(
		"PG_EVENT_TRIGGER_TABLE_REWRITE_REASON",
		{ ignoreCase: true },
	);
	static PG_HAS_ROLE = new Keyword("PG_HAS_ROLE", { ignoreCase: true });
	static PG_IS_OTHER_TEMP_SCHEMA = new Keyword("PG_IS_OTHER_TEMP_SCHEMA", {
		ignoreCase: true,
	});
	static PG_JIT_AVAILABLE = new Keyword("PG_JIT_AVAILABLE", {
		ignoreCase: true,
	});
	static PG_LISTENING_CHANNELS = new Keyword("PG_LISTENING_CHANNELS", {
		ignoreCase: true,
	});
	static PG_LS_ARCHIVE_STATUSDIR = new Keyword("PG_LS_ARCHIVE_STATUSDIR", {
		ignoreCase: true,
	});
	static PG_LS_DIR = new Keyword("PG_LS_DIR", { ignoreCase: true });
	static PG_LS_LOGDIR = new Keyword("PG_LS_LOGDIR", { ignoreCase: true });
	static PG_LS_LOGICALMAPDIR = new Keyword("PG_LS_LOGICALMAPDIR", {
		ignoreCase: true,
	});
	static PG_LS_LOGICALSNAPDIR = new Keyword("PG_LS_LOGICALSNAPDIR", {
		ignoreCase: true,
	});
	static PG_LS_REPLSLOTDIR = new Keyword("PG_LS_REPLSLOTDIR", {
		ignoreCase: true,
	});
	static PG_LS_TMPDIR = new Keyword("PG_LS_TMPDIR", { ignoreCase: true });
	static PG_LS_WALDIR = new Keyword("PG_LS_WALDIR", { ignoreCase: true });
	static PG_MCV_LIST_ITEMS = new Keyword("PG_MCV_LIST_ITEMS", {
		ignoreCase: true,
	});
	static PG_MY_TEMP_SCHEMA = new Keyword("PG_MY_TEMP_SCHEMA", {
		ignoreCase: true,
	});
	static PG_NOTIFICATION_QUEUE_USAGE = new Keyword(
		"PG_NOTIFICATION_QUEUE_USAGE",
		{ ignoreCase: true },
	);
	static PG_POSTMASTER_START_TIME = new Keyword("PG_POSTMASTER_START_TIME", {
		ignoreCase: true,
	});
	static PG_READ_BINARY_FILE = new Keyword("PG_READ_BINARY_FILE", {
		ignoreCase: true,
	});
	static PG_READ_FILE = new Keyword("PG_READ_FILE", { ignoreCase: true });
	static PG_SAFE_SNAPSHOT_BLOCKING_PIDS = new Keyword(
		"PG_SAFE_SNAPSHOT_BLOCKING_PIDS",
		{ ignoreCase: true },
	);
	static PG_SLEEP = new Keyword("PG_SLEEP", { ignoreCase: true });
	static PG_SLEEP_FOR = new Keyword("PG_SLEEP_FOR", { ignoreCase: true });
	static PG_SLEEP_UNTIL = new Keyword("PG_SLEEP_UNTIL", { ignoreCase: true });
	static PG_STAT_FILE = new Keyword("PG_STAT_FILE", { ignoreCase: true });
	static PG_TRIGGER_DEPTH = new Keyword("PG_TRIGGER_DEPTH", {
		ignoreCase: true,
	});
	static PG_TRY_ADVISORY_LOCK = new Keyword("PG_TRY_ADVISORY_LOCK", {
		ignoreCase: true,
	});
	static PG_TRY_ADVISORY_LOCK_SHARED = new Keyword(
		"PG_TRY_ADVISORY_LOCK_SHARED",
		{ ignoreCase: true },
	);
	static PG_TRY_ADVISORY_XACT_LOCK = new Keyword("PG_TRY_ADVISORY_XACT_LOCK", {
		ignoreCase: true,
	});
	static PG_TRY_ADVISORY_XACT_LOCK_SHARED = new Keyword(
		"PG_TRY_ADVISORY_XACT_LOCK_SHARED",
		{ ignoreCase: true },
	);
	static PHRASETO_TSQUERY = new Keyword("PHRASETO_TSQUERY", {
		ignoreCase: true,
	});
	static PHYSICAL = new Keyword("PHYSICAL", { ignoreCase: true });
	static PI = new Keyword("PI", { ignoreCase: true });
	static PIPE = new Keyword("PIPE", { ignoreCase: true });
	static PIPELINED = new Keyword("PIPELINED", { ignoreCase: true });
	static PIVOT = new Keyword("PIVOT", { ignoreCase: true });
	static PLACING = new Keyword("PLACING", { ignoreCase: true });
	static PLAINTO_TSQUERY = new Keyword("PLAINTO_TSQUERY", { ignoreCase: true });
	static PLAN = new Keyword("PLAN", { ignoreCase: true });
	static PLS_INTEGER = new Keyword("PLS_INTEGER", { ignoreCase: true });
	static PLUGGABLE = new Keyword("PLUGGABLE", { ignoreCase: true });
	static PLUGIN = new Keyword("PLUGIN", { ignoreCase: true });
	static POINT = new Keyword("POINT", { ignoreCase: true });
	static POLICY = new Keyword("POLICY", { ignoreCase: true });
	static POLYGON = new Keyword("POLYGON", { ignoreCase: true });
	static POLYMORPHIC = new Keyword("POLYMORPHIC", { ignoreCase: true });
	static POPEN = new Keyword("POPEN", { ignoreCase: true });
	static PORT = new Keyword("PORT", { ignoreCase: true });
	static POSITION = new Keyword("POSITION", { ignoreCase: true });
	static POSITIVE = new Keyword("POSITIVE", { ignoreCase: true });
	static POSITIVEN = new Keyword("POSITIVEN", { ignoreCase: true });
	static POST_TRANSACTION = new Keyword("POST_TRANSACTION", {
		ignoreCase: true,
	});
	static POW = new Keyword("POW", { ignoreCase: true });
	static POWER = new Keyword("POWER", { ignoreCase: true });
	static PRAGMA = new Keyword("PRAGMA", { ignoreCase: true });
	static PREBUILD = new Keyword("PREBUILD", { ignoreCase: true });
	static PRECEDES = new Keyword("PRECEDES", { ignoreCase: true });
	static PRECEDING = new Keyword("PRECEDING", { ignoreCase: true });
	static PRECISION = new Keyword("PRECISION", { ignoreCase: true });
	static PREDICT = new Keyword("PREDICT", { ignoreCase: true });
	static PREPARE = new Keyword("PREPARE", { ignoreCase: true });
	static PREPARED = new Keyword("PREPARED", { ignoreCase: true });
	static PRESERVE = new Keyword("PRESERVE", { ignoreCase: true });
	static PREV = new Keyword("PREV", { ignoreCase: true });
	static PRIMARY = new Keyword("PRIMARY", { ignoreCase: true });
	static PRINT = new Keyword("PRINT", { ignoreCase: true });
	static PRINTF = new Keyword("PRINTF", { ignoreCase: true });
	static PRIOR = new Keyword("PRIOR", { ignoreCase: true });
	static PRIORITY = new Keyword("PRIORITY", { ignoreCase: true });
	static PRIVATE = new Keyword("PRIVATE", { ignoreCase: true });
	static PRIVATE_SGA = new Keyword("PRIVATE_SGA", { ignoreCase: true });
	static PRIVILEGES = new Keyword("PRIVILEGES", { ignoreCase: true });
	static PROC = new Keyword("PROC", { ignoreCase: true });
	static PROCEDURAL = new Keyword("PROCEDURAL", { ignoreCase: true });
	static PROCEDURE = new Keyword("PROCEDURE", { ignoreCase: true });
	static PROFILE = new Keyword("PROFILE", { ignoreCase: true });
	static PROJECT = new Keyword("PROJECT", { ignoreCase: true });
	static PROPERTY = new Keyword("PROPERTY", { ignoreCase: true });
	static PROTECTION = new Keyword("PROTECTION", { ignoreCase: true });
	static PROXY = new Keyword("PROXY", { ignoreCase: true });
	static PRUNING = new Keyword("PRUNING", { ignoreCase: true });
	static PS_CURRENT_THREAD_ID = new Keyword("PS_CURRENT_THREAD_ID", {
		ignoreCase: true,
	});
	static PS_THREAD_ID = new Keyword("PS_THREAD_ID", { ignoreCase: true });
	static PUBLIC = new Keyword("PUBLIC", { ignoreCase: true });
	static PUBLICATION = new Keyword("PUBLICATION", { ignoreCase: true });
	static PURGE = new Keyword("PURGE", { ignoreCase: true });
	static QUARTER = new Keyword("QUARTER", { ignoreCase: true });
	static QUARTERS = new Keyword("QUARTERS", { ignoreCase: true });
	static QUERY = new Keyword("QUERY", { ignoreCase: true });
	static QUERYTREE = new Keyword("QUERYTREE", { ignoreCase: true });
	static QUERY_TO_XML = new Keyword("QUERY_TO_XML", { ignoreCase: true });
	static QUERY_TO_XMLSCHEMA = new Keyword("QUERY_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static QUERY_TO_XML_AND_XMLSCHEMA = new Keyword(
		"QUERY_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static QUEUE = new Keyword("QUEUE", { ignoreCase: true });
	static QUICK = new Keyword("QUICK", { ignoreCase: true });
	static QUIESCE = new Keyword("QUIESCE", { ignoreCase: true });
	static QUORUM = new Keyword("QUORUM", { ignoreCase: true });
	static QUOTA = new Keyword("QUOTA", { ignoreCase: true });
	static QUOTAGROUP = new Keyword("QUOTAGROUP", { ignoreCase: true });
	static QUOTE = new Keyword("QUOTE", { ignoreCase: true });
	static QUOTENAME = new Keyword("QUOTENAME", { ignoreCase: true });
	static QUOTE_IDENT = new Keyword("QUOTE_IDENT", { ignoreCase: true });
	static QUOTE_LITERAL = new Keyword("QUOTE_LITERAL", { ignoreCase: true });
	static QUOTE_NULLABLE = new Keyword("QUOTE_NULLABLE", { ignoreCase: true });
	static RADIANS = new Keyword("RADIANS", { ignoreCase: true });
	static RADIUS = new Keyword("RADIUS", { ignoreCase: true });
	static RAISE = new Keyword("RAISE", { ignoreCase: true });
	static RAISE_APPLICATION_ERROR = new Keyword("RAISE_APPLICATION_ERROR", {
		ignoreCase: true,
	});
	static RAISERROR = new Keyword("RAISERROR", { ignoreCase: true });
	static RAND = new Keyword("RAND", { ignoreCase: true });
	static RANDOM = new Keyword("RANDOM", { ignoreCase: true });
	static RANDOMBLOB = new Keyword("RANDOMBLOB", { ignoreCase: true });
	static RANDOM_BYTES = new Keyword("RANDOM_BYTES", { ignoreCase: true });
	static RANGE = new Keyword("RANGE", { ignoreCase: true });
	static RANGE_AGG = new Keyword("RANGE_AGG", { ignoreCase: true });
	static RANGE_INTERSECT_AGG = new Keyword("RANGE_INTERSECT_AGG", {
		ignoreCase: true,
	});
	static RANGE_MERGE = new Keyword("RANGE_MERGE", { ignoreCase: true });
	static RANK = new Keyword("RANK", { ignoreCase: true });
	static RAW = new Keyword("RAW", { ignoreCase: true });
	static READ = new Keyword("READ", { ignoreCase: true });
	static READS = new Keyword("READS", { ignoreCase: true });
	static READTEXT = new Keyword("READTEXT", { ignoreCase: true });
	static READ_WRITE = new Keyword("READ_WRITE", { ignoreCase: true });
	static REAL = new Keyword("REAL", { ignoreCase: true });
	static REASSIGN = new Keyword("REASSIGN", { ignoreCase: true });
	static REBUILD = new Keyword("REBUILD", { ignoreCase: true });
	static RECEIVE = new Keyword("RECEIVE", { ignoreCase: true });
	static RECONFIGURE = new Keyword("RECONFIGURE", { ignoreCase: true });
	static RECORD = new Keyword("RECORD", { ignoreCase: true });
	static RECOVER = new Keyword("RECOVER", { ignoreCase: true });
	static RECURSIVE = new Keyword("RECURSIVE", { ignoreCase: true });
	static RECYCLEBIN = new Keyword("RECYCLEBIN", { ignoreCase: true });
	static REDO = new Keyword("REDO", { ignoreCase: true });
	static REDOFILE = new Keyword("REDOFILE", { ignoreCase: true });
	static REDO_BUFFER_SIZE = new Keyword("REDO_BUFFER_SIZE", {
		ignoreCase: true,
	});
	static REDUCED = new Keyword("REDUCED", { ignoreCase: true });
	static REDUNDANCY = new Keyword("REDUNDANCY", { ignoreCase: true });
	static REDUNDANT = new Keyword("REDUNDANT", { ignoreCase: true });
	static REF = new Keyword("REF", { ignoreCase: true });
	static REFCURSOR = new Keyword("REFCURSOR", { ignoreCase: true });
	static REFERENCE = new Keyword("REFERENCE", { ignoreCase: true });
	static REFERENCED = new Keyword("REFERENCED", { ignoreCase: true });
	static REFERENCES = new Keyword("REFERENCES", { ignoreCase: true });
	static REFRESH = new Keyword("REFRESH", { ignoreCase: true });
	static REGEXP = new Keyword("REGEXP", { ignoreCase: true });
	static REGEXP_COUNT = new Keyword("REGEXP_COUNT", { ignoreCase: true });
	static REGEXP_INSTR = new Keyword("REGEXP_INSTR", { ignoreCase: true });
	static REGEXP_LIKE = new Keyword("REGEXP_LIKE", { ignoreCase: true });
	static REGEXP_MATCH = new Keyword("REGEXP_MATCH", { ignoreCase: true });
	static REGEXP_MATCHES = new Keyword("REGEXP_MATCHES", { ignoreCase: true });
	static REGEXP_REPLACE = new Keyword("REGEXP_REPLACE", { ignoreCase: true });
	static REGEXP_SPLIT_TO_ARRAY = new Keyword("REGEXP_SPLIT_TO_ARRAY", {
		ignoreCase: true,
	});
	static REGEXP_SPLIT_TO_TABLE = new Keyword("REGEXP_SPLIT_TO_TABLE", {
		ignoreCase: true,
	});
	static REGEXP_SUBSTR = new Keyword("REGEXP_SUBSTR", { ignoreCase: true });
	static REGISTER = new Keyword("REGISTER", { ignoreCase: true });
	static REGR_AVGX = new Keyword("REGR_AVGX", { ignoreCase: true });
	static REGR_AVGY = new Keyword("REGR_AVGY", { ignoreCase: true });
	static REGR_COUNT = new Keyword("REGR_COUNT", { ignoreCase: true });
	static REGR_INTERCEPT = new Keyword("REGR_INTERCEPT", { ignoreCase: true });
	static REGR_R2 = new Keyword("REGR_R2", { ignoreCase: true });
	static REGR_SLOPE = new Keyword("REGR_SLOPE", { ignoreCase: true });
	static REGR_SXX = new Keyword("REGR_SXX", { ignoreCase: true });
	static REGR_SXY = new Keyword("REGR_SXY", { ignoreCase: true });
	static REGR_SYY = new Keyword("REGR_SYY", { ignoreCase: true });
	static REGULAR = new Keyword("REGULAR", { ignoreCase: true });
	static REINDEX = new Keyword("REINDEX", { ignoreCase: true });
	static REJECT = new Keyword("REJECT", { ignoreCase: true });
	static REKEY = new Keyword("REKEY", { ignoreCase: true });
	static RELATIONAL = new Keyword("RELATIONAL", { ignoreCase: true });
	static RELEASE = new Keyword("RELEASE", { ignoreCase: true });
	static RELEASE_ALL_LOCKS = new Keyword("RELEASE_ALL_LOCKS", {
		ignoreCase: true,
	});
	static RELEASE_LOCK = new Keyword("RELEASE_LOCK", { ignoreCase: true });
	static RELIES_ON = new Keyword("RELIES_ON", { ignoreCase: true });
	static RELOCATE = new Keyword("RELOCATE", { ignoreCase: true });
	static RELY = new Keyword("RELY", { ignoreCase: true });
	static REMOTE = new Keyword("REMOTE", { ignoreCase: true });
	static RENAME = new Keyword("RENAME", { ignoreCase: true });
	static REPAIR = new Keyword("REPAIR", { ignoreCase: true });
	static REPEAT = new Keyword("REPEAT", { ignoreCase: true });
	static REPEATABLE = new Keyword("REPEATABLE", { ignoreCase: true });
	static REPLACE = new Keyword("REPLACE", { ignoreCase: true });
	static REPLICA = new Keyword("REPLICA", { ignoreCase: true });
	static REPLICATE = new Keyword("REPLICATE", { ignoreCase: true });
	static REPLICATION = new Keyword("REPLICATION", { ignoreCase: true });
	static REQUIRE = new Keyword("REQUIRE", { ignoreCase: true });
	static REQUIRED = new Keyword("REQUIRED", { ignoreCase: true });
	static RESET = new Keyword("RESET", { ignoreCase: true });
	static RESETLOGS = new Keyword("RESETLOGS", { ignoreCase: true });
	static RESIGNAL = new Keyword("RESIGNAL", { ignoreCase: true });
	static RESIZE = new Keyword("RESIZE", { ignoreCase: true });
	static RESOLVE = new Keyword("RESOLVE", { ignoreCase: true });
	static RESOLVER = new Keyword("RESOLVER", { ignoreCase: true });
	static RESOURCE = new Keyword("RESOURCE", { ignoreCase: true });
	static RESTART = new Keyword("RESTART", { ignoreCase: true });
	static RESTORE = new Keyword("RESTORE", { ignoreCase: true });
	static RESTRICT = new Keyword("RESTRICT", { ignoreCase: true });
	static RESTRICTED = new Keyword("RESTRICTED", { ignoreCase: true });
	static RESTRICT_REFERENCES = new Keyword("RESTRICT_REFERENCES", {
		ignoreCase: true,
	});
	static RESULT_CACHE = new Keyword("RESULT_CACHE", { ignoreCase: true });
	static RESUMABLE = new Keyword("RESUMABLE", { ignoreCase: true });
	static RESUME = new Keyword("RESUME", { ignoreCase: true });
	static RETAIN = new Keyword("RETAIN", { ignoreCase: true });
	static RETENTION = new Keyword("RETENTION", { ignoreCase: true });
	static RETURN = new Keyword("RETURN", { ignoreCase: true });
	static RETURNING = new Keyword("RETURNING", { ignoreCase: true });
	static REUSE = new Keyword("REUSE", { ignoreCase: true });
	static REVERSE = new Keyword("REVERSE", { ignoreCase: true });
	static REVERT = new Keyword("REVERT", { ignoreCase: true });
	static REVOKE = new Keyword("REVOKE", { ignoreCase: true });
	static REWRITE = new Keyword("REWRITE", { ignoreCase: true });
	static RIGHT = new Keyword("RIGHT", { ignoreCase: true });
	static RLIKE = new Keyword("RLIKE", { ignoreCase: true });
	static RNDS = new Keyword("RNDS", { ignoreCase: true });
	static RNPS = new Keyword("RNPS", { ignoreCase: true });
	static ROLE = new Keyword("ROLE", { ignoreCase: true });
	static ROLES = new Keyword("ROLES", { ignoreCase: true });
	static ROLES_GRAPHML = new Keyword("ROLES_GRAPHML", { ignoreCase: true });
	static ROLLBACK = new Keyword("ROLLBACK", { ignoreCase: true });
	static ROLLING = new Keyword("ROLLING", { ignoreCase: true });
	static ROLLUP = new Keyword("ROLLUP", { ignoreCase: true });
	static ROOT = new Keyword("ROOT", { ignoreCase: true });
	static ROUND = new Keyword("ROUND", { ignoreCase: true });
	static ROUTE = new Keyword("ROUTE", { ignoreCase: true });
	static ROUTINE = new Keyword("ROUTINE", { ignoreCase: true });
	static ROW = new Keyword("ROW", { ignoreCase: true });
	static ROWCOUNT = new Keyword("ROWCOUNT", { ignoreCase: true });
	static ROWDEPENDENCIES = new Keyword("ROWDEPENDENCIES", { ignoreCase: true });
	static ROWGUIDCOL = new Keyword("ROWGUIDCOL", { ignoreCase: true });
	static ROWID = new Keyword("ROWID", { ignoreCase: true });
	static ROWLABEL = new Keyword("ROWLABEL", { ignoreCase: true });
	static ROWNUM = new Keyword("ROWNUM", { ignoreCase: true });
	static ROWS = new Keyword("ROWS", { ignoreCase: true });
	static ROWTYPE = new Keyword("ROWTYPE", { ignoreCase: true });
	static ROWVERSION = new Keyword("ROWVERSION", { ignoreCase: true });
	static ROW_COUNT = new Keyword("ROW_COUNT", { ignoreCase: true });
	static ROW_FORMAT = new Keyword("ROW_FORMAT", { ignoreCase: true });
	static ROW_NUMBER = new Keyword("ROW_NUMBER", { ignoreCase: true });
	static ROW_SECURITY_ACTIVE = new Keyword("ROW_SECURITY_ACTIVE", {
		ignoreCase: true,
	});
	static ROW_TO_JSON = new Keyword("ROW_TO_JSON", { ignoreCase: true });
	static RPAD = new Keyword("RPAD", { ignoreCase: true });
	static RTREE = new Keyword("RTREE", { ignoreCase: true });
	static RTRIM = new Keyword("RTRIM", { ignoreCase: true });
	static RULE = new Keyword("RULE", { ignoreCase: true });
	static RULES = new Keyword("RULES", { ignoreCase: true });
	static RUNNING = new Keyword("RUNNING", { ignoreCase: true });
	static SALT = new Keyword("SALT", { ignoreCase: true });
	static SAMPLE = new Keyword("SAMPLE", { ignoreCase: true });
	static SAVE = new Keyword("SAVE", { ignoreCase: true });
	static SAVEPOINT = new Keyword("SAVEPOINT", { ignoreCase: true });
	static SCALE = new Keyword("SCALE", { ignoreCase: true });
	static SCAN = new Keyword("SCAN", { ignoreCase: true });
	static SCHEDULE = new Keyword("SCHEDULE", { ignoreCase: true });
	static SCHEMA = new Keyword("SCHEMA", { ignoreCase: true });
	static SCHEMAS = new Keyword("SCHEMAS", { ignoreCase: true });
	static SCHEMA_TO_XML = new Keyword("SCHEMA_TO_XML", { ignoreCase: true });
	static SCHEMA_TO_XMLSCHEMA = new Keyword("SCHEMA_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static SCHEMA_TO_XML_AND_XMLSCHEMA = new Keyword(
		"SCHEMA_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static SCN = new Keyword("SCN", { ignoreCase: true });
	static SCOPE = new Keyword("SCOPE", { ignoreCase: true });
	static SCRUB = new Keyword("SCRUB", { ignoreCase: true });
	static SDO_GEOMETRY = new Keyword("SDO_GEOMETRY", { ignoreCase: true });
	static SDO_GEORASTER = new Keyword("SDO_GEORASTER", { ignoreCase: true });
	static SDO_TOPO_GEOMETRY = new Keyword("SDO_TOPO_GEOMETRY", {
		ignoreCase: true,
	});
	static SEARCH = new Keyword("SEARCH", { ignoreCase: true });
	static SECOND = new Keyword("SECOND", { ignoreCase: true });
	static SECONDARY_ENGINE_ATTRIBUTE = new Keyword(
		"SECONDARY_ENGINE_ATTRIBUTE",
		{ ignoreCase: true },
	);
	static SECONDS = new Keyword("SECONDS", { ignoreCase: true });
	static SECOND_MICROSECOND = new Keyword("SECOND_MICROSECOND", {
		ignoreCase: true,
	});
	static SECRET = new Keyword("SECRET", { ignoreCase: true });
	static SECUREFILE = new Keyword("SECUREFILE", { ignoreCase: true });
	static SECURITY = new Keyword("SECURITY", { ignoreCase: true });
	static SECURITYAUDIT = new Keyword("SECURITYAUDIT", { ignoreCase: true });
	static SEC_TO_TIME = new Keyword("SEC_TO_TIME", { ignoreCase: true });
	static SEED = new Keyword("SEED", { ignoreCase: true });
	static SEGMENT = new Keyword("SEGMENT", { ignoreCase: true });
	static SELECT = new Keyword("SELECT", { ignoreCase: true });
	static SELECTIVE = new Keyword("SELECTIVE", { ignoreCase: true });
	static SELECTIVITY = new Keyword("SELECTIVITY", { ignoreCase: true });
	static SELF = new Keyword("SELF", { ignoreCase: true });
	static SEMANTICKEYPHRASETABLE = new Keyword("SEMANTICKEYPHRASETABLE", {
		ignoreCase: true,
	});
	static SEMANTICSIMILARITYDETAILSTABLE = new Keyword(
		"SEMANTICSIMILARITYDETAILSTABLE",
		{ ignoreCase: true },
	);
	static SEMANTICSIMILARITYTABLE = new Keyword("SEMANTICSIMILARITYTABLE", {
		ignoreCase: true,
	});
	static SEND = new Keyword("SEND", { ignoreCase: true });
	static SENSITIVE = new Keyword("SENSITIVE", { ignoreCase: true });
	static SEPARATOR = new Keyword("SEPARATOR", { ignoreCase: true });
	static SEQUENCE = new Keyword("SEQUENCE", { ignoreCase: true });
	static SEQUENTIAL = new Keyword("SEQUENTIAL", { ignoreCase: true });
	static SERIALIZABLE = new Keyword("SERIALIZABLE", { ignoreCase: true });
	static SERIALLY_REUSABLE = new Keyword("SERIALLY_REUSABLE", {
		ignoreCase: true,
	});
	static SERVER = new Keyword("SERVER", { ignoreCase: true });
	static SERVICE = new Keyword("SERVICE", { ignoreCase: true });
	static SERVICE_NAME_CONVERT = new Keyword("SERVICE_NAME_CONVERT", {
		ignoreCase: true,
	});
	static SESSION = new Keyword("SESSION", { ignoreCase: true });
	static SESSIONPROPERTY = new Keyword("SESSIONPROPERTY", { ignoreCase: true });
	static SESSIONS_PER_USER = new Keyword("SESSIONS_PER_USER", {
		ignoreCase: true,
	});
	static SESSION_USER = new Keyword("SESSION_USER", { ignoreCase: true });
	static SET = new Keyword("SET", { ignoreCase: true });
	static SETOF = new Keyword("SETOF", { ignoreCase: true });
	static SETS = new Keyword("SETS", { ignoreCase: true });
	static SETSEED = new Keyword("SETSEED", { ignoreCase: true });
	static SETTINGS = new Keyword("SETTINGS", { ignoreCase: true });
	static SETUSER = new Keyword("SETUSER", { ignoreCase: true });
	static SETVAL = new Keyword("SETVAL", { ignoreCase: true });
	static SETWEIGHT = new Keyword("SETWEIGHT", { ignoreCase: true });
	static SET_BIT = new Keyword("SET_BIT", { ignoreCase: true });
	static SET_BYTE = new Keyword("SET_BYTE", { ignoreCase: true });
	static SET_MASKLEN = new Keyword("SET_MASKLEN", { ignoreCase: true });
	static SHA1 = new Keyword("SHA1", { ignoreCase: true });
	static SHA2 = new Keyword("SHA2", { ignoreCase: true });
	static SHA224 = new Keyword("SHA224", { ignoreCase: true });
	static SHA256 = new Keyword("SHA256", { ignoreCase: true });
	static SHA384 = new Keyword("SHA384", { ignoreCase: true });
	static SHA512 = new Keyword("SHA512", { ignoreCase: true });
	static SHARE = new Keyword("SHARE", { ignoreCase: true });
	static SHARED = new Keyword("SHARED", { ignoreCase: true });
	static SHAREDSPACE = new Keyword("SHAREDSPACE", { ignoreCase: true });
	static SHARED_POOL = new Keyword("SHARED_POOL", { ignoreCase: true });
	static SHARING = new Keyword("SHARING", { ignoreCase: true });
	static SHOW = new Keyword("SHOW", { ignoreCase: true });
	static SHRINK = new Keyword("SHRINK", { ignoreCase: true });
	static SHUTDOWN = new Keyword("SHUTDOWN", { ignoreCase: true });
	static SID = new Keyword("SID", { ignoreCase: true });
	static SIGN = new Keyword("SIGN", { ignoreCase: true });
	static SIGNAL = new Keyword("SIGNAL", { ignoreCase: true });
	static SIGNATURE = new Keyword("SIGNATURE", { ignoreCase: true });
	static SIGNED = new Keyword("SIGNED", { ignoreCase: true });
	static SIGNTYPE = new Keyword("SIGNTYPE", { ignoreCase: true });
	static SIMILAR = new Keyword("SIMILAR", { ignoreCase: true });
	static SIMPLE = new Keyword("SIMPLE", { ignoreCase: true });
	static SIMPLE_INTEGER = new Keyword("SIMPLE_INTEGER", { ignoreCase: true });
	static SIN = new Keyword("SIN", { ignoreCase: true });
	static SIND = new Keyword("SIND", { ignoreCase: true });
	static SINGLE = new Keyword("SINGLE", { ignoreCase: true });
	static SINH = new Keyword("SINH", { ignoreCase: true });
	static SITE = new Keyword("SITE", { ignoreCase: true });
	static SIZE = new Keyword("SIZE", { ignoreCase: true });
	static SI_AVERAGECOLOR = new Keyword("SI_AVERAGECOLOR", { ignoreCase: true });
	static SI_COLOR = new Keyword("SI_COLOR", { ignoreCase: true });
	static SI_COLORHISTOGRAM = new Keyword("SI_COLORHISTOGRAM", {
		ignoreCase: true,
	});
	static SI_FEATURELIST = new Keyword("SI_FEATURELIST", { ignoreCase: true });
	static SI_POSITIONALCOLOR = new Keyword("SI_POSITIONALCOLOR", {
		ignoreCase: true,
	});
	static SI_STILLIMAGE = new Keyword("SI_STILLIMAGE", { ignoreCase: true });
	static SI_TEXTURE = new Keyword("SI_TEXTURE", { ignoreCase: true });
	static SKIP = new Keyword("SKIP", { ignoreCase: true });
	static SKIP_LOCKED = new Keyword("SKIP_LOCKED", { ignoreCase: true });
	static SLAVE = new Keyword("SLAVE", { ignoreCase: true });
	static SLEEP = new Keyword("SLEEP", { ignoreCase: true });
	static SLOPE = new Keyword("SLOPE", { ignoreCase: true });
	static SMALLDATETIME = new Keyword("SMALLDATETIME", { ignoreCase: true });
	static SMALLDATETIMEFROMPARTS = new Keyword("SMALLDATETIMEFROMPARTS", {
		ignoreCase: true,
	});
	static SMALLFILE = new Keyword("SMALLFILE", { ignoreCase: true });
	static SMALLINT = new Keyword("SMALLINT", { ignoreCase: true });
	static SMALLMONEY = new Keyword("SMALLMONEY", { ignoreCase: true });
	static SNAPSHOT = new Keyword("SNAPSHOT", { ignoreCase: true });
	static SOCKET = new Keyword("SOCKET", { ignoreCase: true });
	static SOME = new Keyword("SOME", { ignoreCase: true });
	static SORT = new Keyword("SORT", { ignoreCase: true });
	static SOUNDEX = new Keyword("SOUNDEX", { ignoreCase: true });
	static SOUNDS = new Keyword("SOUNDS", { ignoreCase: true });
	static SOURCE = new Keyword("SOURCE", { ignoreCase: true });
	static SOURCE_FILE_DIRECTORY = new Keyword("SOURCE_FILE_DIRECTORY", {
		ignoreCase: true,
	});
	static SOURCE_FILE_NAME_CONVERT = new Keyword("SOURCE_FILE_NAME_CONVERT", {
		ignoreCase: true,
	});
	static SPACE = new Keyword("SPACE", { ignoreCase: true });
	static SPATIAL = new Keyword("SPATIAL", { ignoreCase: true });
	static SPECIFIC = new Keyword("SPECIFIC", { ignoreCase: true });
	static SPECIFICATION = new Keyword("SPECIFICATION", { ignoreCase: true });
	static SPFILE = new Keyword("SPFILE", { ignoreCase: true });
	static SPLIT = new Keyword("SPLIT", { ignoreCase: true });
	static SPLIT_PART = new Keyword("SPLIT_PART", { ignoreCase: true });
	static SQL = new Keyword("SQL", { ignoreCase: true });
	static SQLCODE = new Keyword("SQLCODE", { ignoreCase: true });
	static SQLERRM = new Keyword("SQLERRM", { ignoreCase: true });
	static SQLEXCEPTION = new Keyword("SQLEXCEPTION", { ignoreCase: true });
	static SQLITE_COMPILEOPTION_GET = new Keyword("SQLITE_COMPILEOPTION_GET", {
		ignoreCase: true,
	});
	static SQLITE_COMPILEOPTION_USED = new Keyword("SQLITE_COMPILEOPTION_USED", {
		ignoreCase: true,
	});
	static SQLITE_OFFSET = new Keyword("SQLITE_OFFSET", { ignoreCase: true });
	static SQLITE_SOURCE_ID = new Keyword("SQLITE_SOURCE_ID", {
		ignoreCase: true,
	});
	static SQLITE_VERSION = new Keyword("SQLITE_VERSION", { ignoreCase: true });
	static SQLSTATE = new Keyword("SQLSTATE", { ignoreCase: true });
	static SQLWARNING = new Keyword("SQLWARNING", { ignoreCase: true });
	static SQUARE = new Keyword("SQUARE", { ignoreCase: true });
	static SQL_BIG_RESULT = new Keyword("SQL_BIG_RESULT", { ignoreCase: true });
	static SQL_CACHE = new Keyword("SQL_CACHE", { ignoreCase: true });
	static SQL_CALC_FOUND_ROWS = new Keyword("SQL_CALC_FOUND_ROWS", {
		ignoreCase: true,
	});
	static SQL_MACRO = new Keyword("SQL_MACRO", { ignoreCase: true });
	static SQL_SMALL_RESULT = new Keyword("SQL_SMALL_RESULT", {
		ignoreCase: true,
	});
	static SQL_VARIANT = new Keyword("SQL_VARIANT", { ignoreCase: true });
	static SQL_VARIANT_PROPERTY = new Keyword("SQL_VARIANT_PROPERTY", {
		ignoreCase: true,
	});
	static SQRT = new Keyword("SQRT", { ignoreCase: true });
	static SSL = new Keyword("SSL", { ignoreCase: true });
	static STANDARD = new Keyword("STANDARD", { ignoreCase: true });
	static STANDBY = new Keyword("STANDBY", { ignoreCase: true });
	static STANDBYS = new Keyword("STANDBYS", { ignoreCase: true });
	static START = new Keyword("START", { ignoreCase: true });
	static STARTING = new Keyword("STARTING", { ignoreCase: true });
	static STARTS = new Keyword("STARTS", { ignoreCase: true });
	static STARTS_WITH = new Keyword("STARTS_WITH", { ignoreCase: true });
	static STATE = new Keyword("STATE", { ignoreCase: true });
	static STATEMENT = new Keyword("STATEMENT", { ignoreCase: true });
	static STATEMENTS = new Keyword("STATEMENTS", { ignoreCase: true });
	static STATEMENT_DIGEST = new Keyword("STATEMENT_DIGEST", {
		ignoreCase: true,
	});
	static STATEMENT_DIGEST_TEXT = new Keyword("STATEMENT_DIGEST_TEXT", {
		ignoreCase: true,
	});
	static STATEMENT_ID = new Keyword("STATEMENT_ID", { ignoreCase: true });
	static STATEMENT_TIMESTAMP = new Keyword("STATEMENT_TIMESTAMP", {
		ignoreCase: true,
	});
	static STATIC = new Keyword("STATIC", { ignoreCase: true });
	static STATISTICS = new Keyword("STATISTICS", { ignoreCase: true });
	static STATS = new Keyword("STATS", { ignoreCase: true });
	static STATS_AUTO_RECALC = new Keyword("STATS_AUTO_RECALC", {
		ignoreCase: true,
	});
	static STATS_PERSISTENT = new Keyword("STATS_PERSISTENT", {
		ignoreCase: true,
	});
	static STATS_SAMPLE_PAGES = new Keyword("STATS_SAMPLE_PAGES", {
		ignoreCase: true,
	});
	static STD = new Keyword("STD", { ignoreCase: true });
	static STDDEV = new Keyword("STDDEV", { ignoreCase: true });
	static STDDEV_POP = new Keyword("STDDEV_POP", { ignoreCase: true });
	static STDDEV_SAMP = new Keyword("STDDEV_SAMP", { ignoreCase: true });
	static STOP = new Keyword("STOP", { ignoreCase: true });
	static STORAGE = new Keyword("STORAGE", { ignoreCase: true });
	static STORE = new Keyword("STORE", { ignoreCase: true });
	static STORED = new Keyword("STORED", { ignoreCase: true });
	static STR = new Keyword("STR", { ignoreCase: true });
	static STRAIGHT_JOIN = new Keyword("STRAIGHT_JOIN", { ignoreCase: true });
	static STRCMP = new Keyword("STRCMP", { ignoreCase: true });
	static STRICT = new Keyword("STRICT", { ignoreCase: true });
	static STRFTIME = new Keyword("STRFTIME", { ignoreCase: true });
	static STRING = new Keyword("STRING", { ignoreCase: true });
	static STRING_AGG = new Keyword("STRING_AGG", { ignoreCase: true });
	static STRING_SPLIT = new Keyword("STRING_SPLIT", { ignoreCase: true });
	static STRING_TO_ARRAY = new Keyword("STRING_TO_ARRAY", { ignoreCase: true });
	static STRING_TO_TABLE = new Keyword("STRING_TO_TABLE", { ignoreCase: true });
	static STRIP = new Keyword("STRIP", { ignoreCase: true });
	static STRIPE_COLUMNS = new Keyword("STRIPE_COLUMNS", { ignoreCase: true });
	static STRIPE_WIDTH = new Keyword("STRIPE_WIDTH", { ignoreCase: true });
	static STRPOS = new Keyword("STRPOS", { ignoreCase: true });
	static STRUCT = new Keyword("STRUCT", { ignoreCase: true });
	static STRUCTURE = new Keyword("STRUCTURE", { ignoreCase: true });
	static STR_TO_DATE = new Keyword("STR_TO_DATE", { ignoreCase: true });
	static STUFF = new Keyword("STUFF", { ignoreCase: true });
	static ST_AREA = new Keyword("ST_AREA", { ignoreCase: true });
	static ST_ASBINARY = new Keyword("ST_ASBINARY", { ignoreCase: true });
	static ST_ASGEOJSON = new Keyword("ST_ASGEOJSON", { ignoreCase: true });
	static ST_ASTEXT = new Keyword("ST_ASTEXT", { ignoreCase: true });
	static ST_BUFFER = new Keyword("ST_BUFFER", { ignoreCase: true });
	static ST_BUFFER_STRATEGY = new Keyword("ST_BUFFER_STRATEGY", {
		ignoreCase: true,
	});
	static ST_CENTROID = new Keyword("ST_CENTROID", { ignoreCase: true });
	static ST_COLLECT = new Keyword("ST_COLLECT", { ignoreCase: true });
	static ST_CONTAINS = new Keyword("ST_CONTAINS", { ignoreCase: true });
	static ST_CONVEXHULL = new Keyword("ST_CONVEXHULL", { ignoreCase: true });
	static ST_CROSSES = new Keyword("ST_CROSSES", { ignoreCase: true });
	static ST_DIFFERENCE = new Keyword("ST_DIFFERENCE", { ignoreCase: true });
	static ST_DIMENSION = new Keyword("ST_DIMENSION", { ignoreCase: true });
	static ST_DISJOINT = new Keyword("ST_DISJOINT", { ignoreCase: true });
	static ST_DISTANCE = new Keyword("ST_DISTANCE", { ignoreCase: true });
	static ST_DISTANCE_SPHERE = new Keyword("ST_DISTANCE_SPHERE", {
		ignoreCase: true,
	});
	static ST_ENDPOINT = new Keyword("ST_ENDPOINT", { ignoreCase: true });
	static ST_ENVELOPE = new Keyword("ST_ENVELOPE", { ignoreCase: true });
	static ST_EQUALS = new Keyword("ST_EQUALS", { ignoreCase: true });
	static ST_EXTERIORRING = new Keyword("ST_EXTERIORRING", { ignoreCase: true });
	static ST_FRECHETDISTANCE = new Keyword("ST_FRECHETDISTANCE", {
		ignoreCase: true,
	});
	static ST_GEOHASH = new Keyword("ST_GEOHASH", { ignoreCase: true });
	static ST_GEOMCOLLFROMTEXT = new Keyword("ST_GEOMCOLLFROMTEXT", {
		ignoreCase: true,
	});
	static ST_GEOMCOLLFROMWKB = new Keyword("ST_GEOMCOLLFROMWKB", {
		ignoreCase: true,
	});
	static ST_GEOMETRYN = new Keyword("ST_GEOMETRYN", { ignoreCase: true });
	static ST_GEOMETRYTYPE = new Keyword("ST_GEOMETRYTYPE", { ignoreCase: true });
	static ST_GEOMFROMGEOJSON = new Keyword("ST_GEOMFROMGEOJSON", {
		ignoreCase: true,
	});
	static ST_GEOMFROMTEXT = new Keyword("ST_GEOMFROMTEXT", { ignoreCase: true });
	static ST_GEOMFROMWKB = new Keyword("ST_GEOMFROMWKB", { ignoreCase: true });
	static ST_HAUSDORFFDISTANCE = new Keyword("ST_HAUSDORFFDISTANCE", {
		ignoreCase: true,
	});
	static ST_INTERIORRINGN = new Keyword("ST_INTERIORRINGN", {
		ignoreCase: true,
	});
	static ST_INTERSECTION = new Keyword("ST_INTERSECTION", { ignoreCase: true });
	static ST_INTERSECTS = new Keyword("ST_INTERSECTS", { ignoreCase: true });
	static ST_ISCLOSED = new Keyword("ST_ISCLOSED", { ignoreCase: true });
	static ST_ISEMPTY = new Keyword("ST_ISEMPTY", { ignoreCase: true });
	static ST_ISSIMPLE = new Keyword("ST_ISSIMPLE", { ignoreCase: true });
	static ST_ISVALID = new Keyword("ST_ISVALID", { ignoreCase: true });
	static ST_LATFROMGEOHASH = new Keyword("ST_LATFROMGEOHASH", {
		ignoreCase: true,
	});
	static ST_LATITUDE = new Keyword("ST_LATITUDE", { ignoreCase: true });
	static ST_LENGTH = new Keyword("ST_LENGTH", { ignoreCase: true });
	static ST_LINEFROMTEXT = new Keyword("ST_LINEFROMTEXT", { ignoreCase: true });
	static ST_LINEFROMWKB = new Keyword("ST_LINEFROMWKB", { ignoreCase: true });
	static ST_LINEINTERPOLATEPOINT = new Keyword("ST_LINEINTERPOLATEPOINT", {
		ignoreCase: true,
	});
	static ST_LINEINTERPOLATEPOINTS = new Keyword("ST_LINEINTERPOLATEPOINTS", {
		ignoreCase: true,
	});
	static ST_LONGFROMGEOHASH = new Keyword("ST_LONGFROMGEOHASH", {
		ignoreCase: true,
	});
	static ST_LONGITUDE = new Keyword("ST_LONGITUDE", { ignoreCase: true });
	static ST_MAKEENVELOPE = new Keyword("ST_MAKEENVELOPE", { ignoreCase: true });
	static ST_MLINEFROMTEXT = new Keyword("ST_MLINEFROMTEXT", {
		ignoreCase: true,
	});
	static ST_MLINEFROMWKB = new Keyword("ST_MLINEFROMWKB", { ignoreCase: true });
	static ST_MPOINTFROMTEXT = new Keyword("ST_MPOINTFROMTEXT", {
		ignoreCase: true,
	});
	static ST_MPOINTFROMWKB = new Keyword("ST_MPOINTFROMWKB", {
		ignoreCase: true,
	});
	static ST_MPOLYFROMTEXT = new Keyword("ST_MPOLYFROMTEXT", {
		ignoreCase: true,
	});
	static ST_MPOLYFROMWKB = new Keyword("ST_MPOLYFROMWKB", { ignoreCase: true });
	static ST_NUMGEOMETRIES = new Keyword("ST_NUMGEOMETRIES", {
		ignoreCase: true,
	});
	static ST_NUMINTERIORRING = new Keyword("ST_NUMINTERIORRING", {
		ignoreCase: true,
	});
	static ST_NUMPOINTS = new Keyword("ST_NUMPOINTS", { ignoreCase: true });
	static ST_OVERLAPS = new Keyword("ST_OVERLAPS", { ignoreCase: true });
	static ST_POINTATDISTANCE = new Keyword("ST_POINTATDISTANCE", {
		ignoreCase: true,
	});
	static ST_POINTFROMGEOHASH = new Keyword("ST_POINTFROMGEOHASH", {
		ignoreCase: true,
	});
	static ST_POINTFROMTEXT = new Keyword("ST_POINTFROMTEXT", {
		ignoreCase: true,
	});
	static ST_POINTFROMWKB = new Keyword("ST_POINTFROMWKB", { ignoreCase: true });
	static ST_POINTN = new Keyword("ST_POINTN", { ignoreCase: true });
	static ST_POLYFROMTEXT = new Keyword("ST_POLYFROMTEXT", { ignoreCase: true });
	static ST_POLYFROMWKB = new Keyword("ST_POLYFROMWKB", { ignoreCase: true });
	static ST_SIMPLIFY = new Keyword("ST_SIMPLIFY", { ignoreCase: true });
	static ST_SRID = new Keyword("ST_SRID", { ignoreCase: true });
	static ST_STARTPOINT = new Keyword("ST_STARTPOINT", { ignoreCase: true });
	static ST_SWAPXY = new Keyword("ST_SWAPXY", { ignoreCase: true });
	static ST_SYMDIFFERENCE = new Keyword("ST_SYMDIFFERENCE", {
		ignoreCase: true,
	});
	static ST_TOUCHES = new Keyword("ST_TOUCHES", { ignoreCase: true });
	static ST_TRANSFORM = new Keyword("ST_TRANSFORM", { ignoreCase: true });
	static ST_UNION = new Keyword("ST_UNION", { ignoreCase: true });
	static ST_VALIDATE = new Keyword("ST_VALIDATE", { ignoreCase: true });
	static ST_WITHIN = new Keyword("ST_WITHIN", { ignoreCase: true });
	static ST_X = new Keyword("ST_X", { ignoreCase: true });
	static ST_Y = new Keyword("ST_Y", { ignoreCase: true });
	static SUBDATE = new Keyword("SUBDATE", { ignoreCase: true });
	static SUBJECT = new Keyword("SUBJECT", { ignoreCase: true });
	static SUBPARTITION = new Keyword("SUBPARTITION", { ignoreCase: true });
	static SUBPARTITIONS = new Keyword("SUBPARTITIONS", { ignoreCase: true });
	static SUBSCRIPTION = new Keyword("SUBSCRIPTION", { ignoreCase: true });
	static SUBSET = new Keyword("SUBSET", { ignoreCase: true });
	static SUBSTITUTABLE = new Keyword("SUBSTITUTABLE", { ignoreCase: true });
	static SUBSTR = new Keyword("SUBSTR", { ignoreCase: true });
	static SUBSTR4 = new Keyword("SUBSTR4", { ignoreCase: true });
	static SUBSTRB = new Keyword("SUBSTRB", { ignoreCase: true });
	static SUBSTRING = new Keyword("SUBSTRING", { ignoreCase: true });
	static SUBSTRING_INDEX = new Keyword("SUBSTRING_INDEX", { ignoreCase: true });
	static SUBTIME = new Keyword("SUBTIME", { ignoreCase: true });
	static SUBTYPE = new Keyword("SUBTYPE", { ignoreCase: true });
	static SUCCESSFUL = new Keyword("SUCCESSFUL", { ignoreCase: true });
	static SUM = new Keyword("SUM", { ignoreCase: true });
	static SUMMARY = new Keyword("SUMMARY", { ignoreCase: true });
	static SUPPLEMENTAL = new Keyword("SUPPLEMENTAL", { ignoreCase: true });
	static SUPPRESS_REDUNDANT_UPDATES_TRIGGER = new Keyword(
		"SUPPRESS_REDUNDANT_UPDATES_TRIGGER",
		{ ignoreCase: true },
	);
	static SUSPEND = new Keyword("SUSPEND", { ignoreCase: true });
	static SWITCH = new Keyword("SWITCH", { ignoreCase: true });
	static SWITCHOFFSET = new Keyword("SWITCHOFFSET", { ignoreCase: true });
	static SWITCHOVER = new Keyword("SWITCHOVER", { ignoreCase: true });
	static SYMMETRIC = new Keyword("SYMMETRIC", { ignoreCase: true });
	static SYNC = new Keyword("SYNC", { ignoreCase: true });
	static SYNCHRONOUS = new Keyword("SYNCHRONOUS", { ignoreCase: true });
	static SYNONYM = new Keyword("SYNONYM", { ignoreCase: true });
	static SYS = new Keyword("SYS", { ignoreCase: true });
	static SYSAUX = new Keyword("SYSAUX", { ignoreCase: true });
	static SYSDATE = new Keyword("SYSDATE", { ignoreCase: true });
	static SYSDATETIME = new Keyword("SYSDATETIME", { ignoreCase: true });
	static SYSDATETIMEOFFSET = new Keyword("SYSDATETIMEOFFSET", {
		ignoreCase: true,
	});
	static SYSTEM = new Keyword("SYSTEM", { ignoreCase: true });
	static SYSTEM_USER = new Keyword("SYSTEM_USER", { ignoreCase: true });
	static SYSTIMESTAMP = new Keyword("SYSTIMESTAMP", { ignoreCase: true });
	static SYSUTCDATETIME = new Keyword("SYSUTCDATETIME", { ignoreCase: true });
	static SYS_CONTEXT = new Keyword("SYS_CONTEXT", { ignoreCase: true });
	static T = new Keyword("T", { ignoreCase: true });
	static TABAUTH = new Keyword("TABAUTH", { ignoreCase: true });
	static TABLE = new Keyword("TABLE", { ignoreCase: true });
	static TABLES = new Keyword("TABLES", { ignoreCase: true });
	static TABLESAMPLE = new Keyword("TABLESAMPLE", { ignoreCase: true });
	static TABLESPACE = new Keyword("TABLESPACE", { ignoreCase: true });
	static TABLE_TO_XML = new Keyword("TABLE_TO_XML", { ignoreCase: true });
	static TABLE_TO_XMLSCHEMA = new Keyword("TABLE_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static TABLE_TO_XML_AND_XMLSCHEMA = new Keyword(
		"TABLE_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static TAG = new Keyword("TAG", { ignoreCase: true });
	static TAN = new Keyword("TAN", { ignoreCase: true });
	static TAND = new Keyword("TAND", { ignoreCase: true });
	static TANH = new Keyword("TANH", { ignoreCase: true });
	static TARGET = new Keyword("TARGET", { ignoreCase: true });
	static TDO = new Keyword("TDO", { ignoreCase: true });
	static TEMP = new Keyword("TEMP", { ignoreCase: true });
	static TEMPFILE = new Keyword("TEMPFILE", { ignoreCase: true });
	static TEMPLATE = new Keyword("TEMPLATE", { ignoreCase: true });
	static TEMPORARY = new Keyword("TEMPORARY", { ignoreCase: true });
	static TEMPTABLE = new Keyword("TEMPTABLE", { ignoreCase: true });
	static TERMINATED = new Keyword("TERMINATED", { ignoreCase: true });
	static TEST = new Keyword("TEST", { ignoreCase: true });
	static TEXT = new Keyword("TEXT", { ignoreCase: true });
	static TEXTSIZE = new Keyword("TEXTSIZE", { ignoreCase: true });
	static TEXTPTR = new Keyword("TEXTPTR", { ignoreCase: true });
	static TEXTVALID = new Keyword("TEXTVALID", { ignoreCase: true });
	static THAN = new Keyword("THAN", { ignoreCase: true });
	static THEN = new Keyword("THEN", { ignoreCase: true });
	static THREAD = new Keyword("THREAD", { ignoreCase: true });
	static THREAD_PRIORITY = new Keyword("THREAD_PRIORITY", { ignoreCase: true });
	static THROUGH = new Keyword("THROUGH", { ignoreCase: true });
	static THROW = new Keyword("THROW", { ignoreCase: true });
	static TIER = new Keyword("TIER", { ignoreCase: true });
	static TIES = new Keyword("TIES", { ignoreCase: true });
	static TIME = new Keyword("TIME", { ignoreCase: true });
	static TIMEDIFF = new Keyword("TIMEDIFF", { ignoreCase: true });
	static TIMEFROMPARTS = new Keyword("TIMEFROMPARTS", { ignoreCase: true });
	static TIMEOFDAY = new Keyword("TIMEOFDAY", { ignoreCase: true });
	static TIMEOUT = new Keyword("TIMEOUT", { ignoreCase: true });
	static TIMESTAMP = new Keyword("TIMESTAMP", { ignoreCase: true });
	static TIMESTAMPADD = new Keyword("TIMESTAMPADD", { ignoreCase: true });
	static TIMESTAMPDIFF = new Keyword("TIMESTAMPDIFF", { ignoreCase: true });
	static TIMESTAMPZ = new Keyword("TIMESTAMPZ", { ignoreCase: true });
	static TIMEZONE_HOUR = new Keyword("TIMEZONE_HOUR", { ignoreCase: true });
	static TIMEZONE_MINUTE = new Keyword("TIMEZONE_MINUTE", { ignoreCase: true });
	static TIME_FORMAT = new Keyword("TIME_FORMAT", { ignoreCase: true });
	static TIME_TO_SEC = new Keyword("TIME_TO_SEC", { ignoreCase: true });
	static TIME_ZONE = new Keyword("TIME_ZONE", { ignoreCase: true });
	static TIMING = new Keyword("TIMING", { ignoreCase: true });
	static TINYBLOB = new Keyword("TINYBLOB", { ignoreCase: true });
	static TINYINT = new Keyword("TINYINT", { ignoreCase: true });
	static TINYTEXT = new Keyword("TINYTEXT", { ignoreCase: true });
	static TO = new Keyword("TO", { ignoreCase: true });
	static TODATETIMEOFFSET = new Keyword("TODATETIMEOFFSET", {
		ignoreCase: true,
	});
	static TOP = new Keyword("TOP", { ignoreCase: true });
	static TOPLEVEL = new Keyword("TOPLEVEL", { ignoreCase: true });
	static TOTAL = new Keyword("TOTAL", { ignoreCase: true });
	static TOTAL_CHANGES = new Keyword("TOTAL_CHANGES", { ignoreCase: true });
	static TO_ASCII = new Keyword("TO_ASCII", { ignoreCase: true });
	static TO_BASE64 = new Keyword("TO_BASE64", { ignoreCase: true });
	static TO_BLOB = new Keyword("TO_BLOB", { ignoreCase: true });
	static TO_CHAR = new Keyword("TO_CHAR", { ignoreCase: true });
	static TO_CLOB = new Keyword("TO_CLOB", { ignoreCase: true });
	static TO_DATE = new Keyword("TO_DATE", { ignoreCase: true });
	static TO_DAYS = new Keyword("TO_DAYS", { ignoreCase: true });
	static TO_HEX = new Keyword("TO_HEX", { ignoreCase: true });
	static TO_JSON = new Keyword("TO_JSON", { ignoreCase: true });
	static TO_LOB = new Keyword("TO_LOB", { ignoreCase: true });
	static TO_NCLOB = new Keyword("TO_NCLOB", { ignoreCase: true });
	static TO_NUMBER = new Keyword("TO_NUMBER", { ignoreCase: true });
	static TO_SECONDS = new Keyword("TO_SECONDS", { ignoreCase: true });
	static TO_TIMESTAMP = new Keyword("TO_TIMESTAMP", { ignoreCase: true });
	static TO_TSQUERY = new Keyword("TO_TSQUERY", { ignoreCase: true });
	static TO_TSVECTOR = new Keyword("TO_TSVECTOR", { ignoreCase: true });
	static TRACE = new Keyword("TRACE", { ignoreCase: true });
	static TRACKING = new Keyword("TRACKING", { ignoreCase: true });
	static TRAILING = new Keyword("TRAILING", { ignoreCase: true });
	static TRAN = new Keyword("TRAN", { ignoreCase: true });
	static TRANSACTION = new Keyword("TRANSACTION", { ignoreCase: true });
	static TRANSACTIONAL = new Keyword("TRANSACTIONAL", { ignoreCase: true });
	static TRANSACTION_TIMESTAMP = new Keyword("TRANSACTION_TIMESTAMP", {
		ignoreCase: true,
	});
	static TRANSFORM = new Keyword("TRANSFORM", { ignoreCase: true });
	static TRANSLATE = new Keyword("TRANSLATE", { ignoreCase: true });
	static TRANSLATION = new Keyword("TRANSLATION", { ignoreCase: true });
	static TRIGGER = new Keyword("TRIGGER", { ignoreCase: true });
	static TRIGGERS = new Keyword("TRIGGERS", { ignoreCase: true });
	static TRIGGER_NESTLEVEL = new Keyword("TRIGGER_NESTLEVEL", {
		ignoreCase: true,
	});
	static TRIM = new Keyword("TRIM", { ignoreCase: true });
	static TRIM_ARRAY = new Keyword("TRIM_ARRAY", { ignoreCase: true });
	static TRIM_SCALE = new Keyword("TRIM_SCALE", { ignoreCase: true });
	static TRUE = new Keyword("TRUE", { ignoreCase: true });
	static TRUNC = new Keyword("TRUNC", { ignoreCase: true });
	static TRUNCATE = new Keyword("TRUNCATE", { ignoreCase: true });
	static TRUST = new Keyword("TRUST", { ignoreCase: true });
	static TRUSTED = new Keyword("TRUSTED", { ignoreCase: true });
	static TRY_CAST = new Keyword("TRY_CAST", { ignoreCase: true });
	static TRY_CONVERT = new Keyword("TRY_CONVERT", { ignoreCase: true });
	static TRY_PARSE = new Keyword("TRY_PARSE", { ignoreCase: true });
	static TS = new Keyword("TS", { ignoreCase: true });
	static TSEQUAL = new Keyword("TSEQUAL", { ignoreCase: true });
	static TSQUERY_PHRASE = new Keyword("TSQUERY_PHRASE", { ignoreCase: true });
	static TSVECTOR_TO_ARRAY = new Keyword("TSVECTOR_TO_ARRAY", {
		ignoreCase: true,
	});
	static TSVECTOR_UPDATE_TRIGGER = new Keyword("TSVECTOR_UPDATE_TRIGGER", {
		ignoreCase: true,
	});
	static TSVECTOR_UPDATE_TRIGGER_COLUMN = new Keyword(
		"TSVECTOR_UPDATE_TRIGGER_COLUMN",
		{ ignoreCase: true },
	);
	static TS_DEBUG = new Keyword("TS_DEBUG", { ignoreCase: true });
	static TS_DELETE = new Keyword("TS_DELETE", { ignoreCase: true });
	static TS_FILTER = new Keyword("TS_FILTER", { ignoreCase: true });
	static TS_HEADLINE = new Keyword("TS_HEADLINE", { ignoreCase: true });
	static TS_LEXIZE = new Keyword("TS_LEXIZE", { ignoreCase: true });
	static TS_PARSE = new Keyword("TS_PARSE", { ignoreCase: true });
	static TS_RANK = new Keyword("TS_RANK", { ignoreCase: true });
	static TS_RANK_CD = new Keyword("TS_RANK_CD", { ignoreCase: true });
	static TS_REWRITE = new Keyword("TS_REWRITE", { ignoreCase: true });
	static TS_STAT = new Keyword("TS_STAT", { ignoreCase: true });
	static TS_TOKEN_TYPE = new Keyword("TS_TOKEN_TYPE", { ignoreCase: true });
	static TTGRIDMEMBERID = new Keyword("TTGRIDMEMBERID", { ignoreCase: true });
	static TTGRIDNODENAME = new Keyword("TTGRIDNODENAME", { ignoreCase: true });
	static TTGRIDUSERASSIGNEDNAME = new Keyword("TTGRIDUSERASSIGNEDNAME", {
		ignoreCase: true,
	});
	static TYPE = new Keyword("TYPE", { ignoreCase: true });
	static TYPEOF = new Keyword("TYPEOF", { ignoreCase: true });
	static TYPES = new Keyword("TYPES", { ignoreCase: true });
	static UCASE = new Keyword("UCASE", { ignoreCase: true });
	static UDF = new Keyword("UDF", { ignoreCase: true });
	static UID = new Keyword("UID", { ignoreCase: true });
	static UNARCHIVED = new Keyword("UNARCHIVED", { ignoreCase: true });
	static UNBOUNDED = new Keyword("UNBOUNDED", { ignoreCase: true });
	static UNCOMMITTED = new Keyword("UNCOMMITTED", { ignoreCase: true });
	static UNCOMPRESS = new Keyword("UNCOMPRESS", { ignoreCase: true });
	static UNCOMPRESSED_LENGTH = new Keyword("UNCOMPRESSED_LENGTH", {
		ignoreCase: true,
	});
	static UNDEFINED = new Keyword("UNDEFINED", { ignoreCase: true });
	static UNDER = new Keyword("UNDER", { ignoreCase: true });
	static UNDO = new Keyword("UNDO", { ignoreCase: true });
	static UNDOFILE = new Keyword("UNDOFILE", { ignoreCase: true });
	static UNDO_BUFFER_SIZE = new Keyword("UNDO_BUFFER_SIZE", {
		ignoreCase: true,
	});
	static UNDROP = new Keyword("UNDROP", { ignoreCase: true });
	static UNHEX = new Keyword("UNHEX", { ignoreCase: true });
	static UNICODE = new Keyword("UNICODE", { ignoreCase: true });
	static UNIFORM = new Keyword("UNIFORM", { ignoreCase: true });
	static UNINSTALL = new Keyword("UNINSTALL", { ignoreCase: true });
	static UNION = new Keyword("UNION", { ignoreCase: true });
	static UNIQUE = new Keyword("UNIQUE", { ignoreCase: true });
	static UNIQUEIDENTIFIER = new Keyword("UNIQUEIDENTIFIER", {
		ignoreCase: true,
	});
	static UNISTR = new Keyword("UNISTR", { ignoreCase: true });
	static UNITE = new Keyword("UNITE", { ignoreCase: true });
	static UNIXEPOCH = new Keyword("UNIXEPOCH", { ignoreCase: true });
	static UNIX_TIMESTAMP = new Keyword("UNIX_TIMESTAMP", { ignoreCase: true });
	static UNKNOWN = new Keyword("UNKNOWN", { ignoreCase: true });
	static UNLIKELY = new Keyword("UNLIKELY", { ignoreCase: true });
	static UNLIMITED = new Keyword("UNLIMITED", { ignoreCase: true });
	static UNLISTEN = new Keyword("UNLISTEN", { ignoreCase: true });
	static UNLOCK = new Keyword("UNLOCK", { ignoreCase: true });
	static UNLOGGED = new Keyword("UNLOGGED", { ignoreCase: true });
	static UNNEST = new Keyword("UNNEST", { ignoreCase: true });
	static UNPIVOT = new Keyword("UNPIVOT", { ignoreCase: true });
	static UNPLUG = new Keyword("UNPLUG", { ignoreCase: true });
	static UNPROTECTED = new Keyword("UNPROTECTED", { ignoreCase: true });
	static UNQUIESCE = new Keyword("UNQUIESCE", { ignoreCase: true });
	static UNRECOVERABLE = new Keyword("UNRECOVERABLE", { ignoreCase: true });
	static UNSIGNED = new Keyword("UNSIGNED", { ignoreCase: true });
	static UNTIL = new Keyword("UNTIL", { ignoreCase: true });
	static UNUSABLE = new Keyword("UNUSABLE", { ignoreCase: true });
	static UNUSED = new Keyword("UNUSED", { ignoreCase: true });
	static UPDATE = new Keyword("UPDATE", { ignoreCase: true });
	static UPDATED = new Keyword("UPDATED", { ignoreCase: true });
	static UPDATETEXT = new Keyword("UPDATETEXT", { ignoreCase: true });
	static UPDATEXML = new Keyword("UPDATEXML", { ignoreCase: true });
	static UPDATING = new Keyword("UPDATING", { ignoreCase: true });
	static UPGRADE = new Keyword("UPGRADE", { ignoreCase: true });
	static UPPER = new Keyword("UPPER", { ignoreCase: true });
	static UPPER_INC = new Keyword("UPPER_INC", { ignoreCase: true });
	static UPPER_INF = new Keyword("UPPER_INF", { ignoreCase: true });
	static UPSERT = new Keyword("UPSERT", { ignoreCase: true });
	static URITYPE = new Keyword("URITYPE", { ignoreCase: true });
	static UROWID = new Keyword("UROWID", { ignoreCase: true });
	static USAGE = new Keyword("USAGE", { ignoreCase: true });
	static USE = new Keyword("USE", { ignoreCase: true });
	static USER = new Keyword("USER", { ignoreCase: true });
	static USERGROUP = new Keyword("USERGROUP", { ignoreCase: true });
	static USERS = new Keyword("USERS", { ignoreCase: true });
	static USER_DATA = new Keyword("USER_DATA", { ignoreCase: true });
	static USER_NAME = new Keyword("USER_NAME", { ignoreCase: true });
	static USER_TABLESPACES = new Keyword("USER_TABLESPACES", {
		ignoreCase: true,
	});
	static USE_STORED_OUTLINES = new Keyword("USE_STORED_OUTLINES", {
		ignoreCase: true,
	});
	static USING = new Keyword("USING", { ignoreCase: true });
	static USING_NLS_COMP = new Keyword("USING_NLS_COMP", { ignoreCase: true });
	static UTC_DATE = new Keyword("UTC_DATE", { ignoreCase: true });
	static UTC_TIME = new Keyword("UTC_TIME", { ignoreCase: true });
	static UTC_TIMESTAMP = new Keyword("UTC_TIMESTAMP", { ignoreCase: true });
	static UUID = new Keyword("UUID", { ignoreCase: true });
	static UUID_SHORT = new Keyword("UUID_SHORT", { ignoreCase: true });
	static UUID_TO_BIN = new Keyword("UUID_TO_BIN", { ignoreCase: true });
	static VACUUM = new Keyword("VACUUM", { ignoreCase: true });
	static VALIDATE = new Keyword("VALIDATE", { ignoreCase: true });
	static VALIDATE_PASSWORD_STRENGTH = new Keyword(
		"VALIDATE_PASSWORD_STRENGTH",
		{ ignoreCase: true },
	);
	static VALUE = new Keyword("VALUE", { ignoreCase: true });
	static VALUES = new Keyword("VALUES", { ignoreCase: true });
	static VARBINARY = new Keyword("VARBINARY", { ignoreCase: true });
	static VARCHAR = new Keyword("VARCHAR", { ignoreCase: true });
	static VARCHAR2 = new Keyword("VARCHAR2", { ignoreCase: true });
	static VARCHARACTER = new Keyword("VARCHARACTER", { ignoreCase: true });
	static VARIADIC = new Keyword("VARIADIC", { ignoreCase: true });
	static VARIANCE = new Keyword("VARIANCE", { ignoreCase: true });
	static VARNUM = new Keyword("VARNUM", { ignoreCase: true });
	static VARRAW = new Keyword("VARRAW", { ignoreCase: true });
	static VARRAY = new Keyword("VARRAY", { ignoreCase: true });
	static VARRAYS = new Keyword("VARRAYS", { ignoreCase: true });
	static VARYING = new Keyword("VARYING", { ignoreCase: true });
	static VAR_POP = new Keyword("VAR_POP", { ignoreCase: true });
	static VAR_SAMP = new Keyword("VAR_SAMP", { ignoreCase: true });
	static VCPU = new Keyword("VCPU", { ignoreCase: true });
	static VERBOSE = new Keyword("VERBOSE", { ignoreCase: true });
	static VERIFY = new Keyword("VERIFY", { ignoreCase: true });
	static VERSION = new Keyword("VERSION", { ignoreCase: true });
	static VERSIONING = new Keyword("VERSIONING", { ignoreCase: true });
	static VERSIONS = new Keyword("VERSIONS", { ignoreCase: true });
	static VERSIONS_ENDSCN = new Keyword("VERSIONS_ENDSCN", { ignoreCase: true });
	static VERSIONS_ENDTIME = new Keyword("VERSIONS_ENDTIME", {
		ignoreCase: true,
	});
	static VERSIONS_OPERATION = new Keyword("VERSIONS_OPERATION", {
		ignoreCase: true,
	});
	static VERSIONS_STARTSCN = new Keyword("VERSIONS_STARTSCN", {
		ignoreCase: true,
	});
	static VERSIONS_STARTTIME = new Keyword("VERSIONS_STARTTIME", {
		ignoreCase: true,
	});
	static VERSIONS_XID = new Keyword("VERSIONS_XID", { ignoreCase: true });
	static VIEW = new Keyword("VIEW", { ignoreCase: true });
	static VIEWS = new Keyword("VIEWS", { ignoreCase: true });
	static VIRTUAL = new Keyword("VIRTUAL", { ignoreCase: true });
	static VISIBILITY = new Keyword("VISIBILITY", { ignoreCase: true });
	static VISIBLE = new Keyword("VISIBLE", { ignoreCase: true });
	static VOLUME = new Keyword("VOLUME", { ignoreCase: true });
	static WAIT = new Keyword("WAIT", { ignoreCase: true });
	static WAITFOR = new Keyword("WAITFOR", { ignoreCase: true });
	static WAL = new Keyword("WAL", { ignoreCase: true });
	static WALLET = new Keyword("WALLET", { ignoreCase: true });
	static WEBSEARCH_TO_TSQUERY = new Keyword("WEBSEARCH_TO_TSQUERY", {
		ignoreCase: true,
	});
	static WEEK = new Keyword("WEEK", { ignoreCase: true });
	static WEEKDAY = new Keyword("WEEKDAY", { ignoreCase: true });
	static WEEKOFYEAR = new Keyword("WEEKOFYEAR", { ignoreCase: true });
	static WEEKS = new Keyword("WEEKS", { ignoreCase: true });
	static WEIGHT_STRING = new Keyword("WEIGHT_STRING", { ignoreCase: true });
	static WHEN = new Keyword("WHEN", { ignoreCase: true });
	static WHENEVER = new Keyword("WHENEVER", { ignoreCase: true });
	static WHERE = new Keyword("WHERE", { ignoreCase: true });
	static WHILE = new Keyword("WHILE", { ignoreCase: true });
	static WIDTH = new Keyword("WIDTH", { ignoreCase: true });
	static WIDTH_BUCKET = new Keyword("WIDTH_BUCKET", { ignoreCase: true });
	static WINDOW = new Keyword("WINDOW", { ignoreCase: true });
	static WITH = new Keyword("WITH", { ignoreCase: true });
	static WITHIN = new Keyword("WITHIN", { ignoreCase: true });
	static WITHOUT = new Keyword("WITHOUT", { ignoreCase: true });
	static WNDS = new Keyword("WNDS", { ignoreCase: true });
	static WNPS = new Keyword("WNPS", { ignoreCase: true });
	static WORK = new Keyword("WORK", { ignoreCase: true });
	static WORKLOAD = new Keyword("WORKLOAD", { ignoreCase: true });
	static WRAPPER = new Keyword("WRAPPER", { ignoreCase: true });
	static WRITE = new Keyword("WRITE", { ignoreCase: true });
	static WRITETEXT = new Keyword("WRITETEXT", { ignoreCase: true });
	static X509 = new Keyword("X509", { ignoreCase: true });
	static XA = new Keyword("XA", { ignoreCase: true });
	static XDB = new Keyword("XDB", { ignoreCase: true });
	static XDBURITYPE = new Keyword("XDBURITYPE", { ignoreCase: true });
	static XML = new Keyword("XML", { ignoreCase: true });
	static XMLAGG = new Keyword("XMLAGG", { ignoreCase: true });
	static XMLCOMMENT = new Keyword("XMLCOMMENT", { ignoreCase: true });
	static XMLCONCAT = new Keyword("XMLCONCAT", { ignoreCase: true });
	static XMLELEMENT = new Keyword("XMLELEMENT", { ignoreCase: true });
	static XMLEXISTS = new Keyword("XMLEXISTS", { ignoreCase: true });
	static XMLFOREST = new Keyword("XMLFOREST", { ignoreCase: true });
	static XMLNAMESPACES = new Keyword("XMLNAMESPACES", { ignoreCase: true });
	static XMLPI = new Keyword("XMLPI", { ignoreCase: true });
	static XMLROOT = new Keyword("XMLROOT", { ignoreCase: true });
	static XMLSCHEMA = new Keyword("XMLSCHEMA", { ignoreCase: true });
	static XMLTABLE = new Keyword("XMLTABLE", { ignoreCase: true });
	static XMLTYPE = new Keyword("XMLTYPE", { ignoreCase: true });
	static XML_IS_WELL_FORMED = new Keyword("XML_IS_WELL_FORMED", {
		ignoreCase: true,
	});
	static XML_IS_WELL_FORMED_CONTENT = new Keyword(
		"XML_IS_WELL_FORMED_CONTENT",
		{ ignoreCase: true },
	);
	static XML_IS_WELL_FORMED_DOCUMENT = new Keyword(
		"XML_IS_WELL_FORMED_DOCUMENT",
		{ ignoreCase: true },
	);
	static XOR = new Keyword("XOR", { ignoreCase: true });
	static XPATH = new Keyword("XPATH", { ignoreCase: true });
	static XPATH_EXISTS = new Keyword("XPATH_EXISTS", { ignoreCase: true });
	static XS = new Keyword("XS", { ignoreCase: true });
	static YAML = new Keyword("YAML", { ignoreCase: true });
	static YEAR = new Keyword("YEAR", { ignoreCase: true });
	static YEARS = new Keyword("YEARS", { ignoreCase: true });
	static YEARWEEK = new Keyword("YEARWEEK", { ignoreCase: true });
	static YEAR_MONTH = new Keyword("YEAR_MONTH", { ignoreCase: true });
	static YES = new Keyword("YES", { ignoreCase: true });
	static ZEROBLOB = new Keyword("ZEROBLOB", { ignoreCase: true });
	static ZEROFILL = new Keyword("ZEROFILL", { ignoreCase: true });
	static ZONE = new Keyword("ZONE", { ignoreCase: true });
	static ZONEMAP = new Keyword("ZONEMAP", { ignoreCase: true });
	static _ROWID_ = new Keyword("_ROWID_", { ignoreCase: true });
}
