import { Lexer, TokenType } from "elder-parse";

export class SqlLexer extends Lexer {
	static EoS = new TokenType("EoS", { marker: true });
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
	static Identifier = new TokenType("Identifier");

	static ABBREV = this.Identifier.newKeyword("ABBREV", { ignoreCase: true });
	static ABORT = this.Identifier.newKeyword("ABORT", { ignoreCase: true });
	static ABS = this.Identifier.newKeyword("ABS", { ignoreCase: true });
	static ACCESS = this.Identifier.newKeyword("ACCESS", { ignoreCase: true });
	static ACCESSED = this.Identifier.newKeyword("ACCESSED", {
		ignoreCase: true,
	});
	static ACCESSIBLE = this.Identifier.newKeyword("ACCESSIBLE", {
		ignoreCase: true,
	});
	static ACCOUNT = this.Identifier.newKeyword("ACCOUNT", { ignoreCase: true });
	static ACLDEFAULT = this.Identifier.newKeyword("ACLDEFAULT", {
		ignoreCase: true,
	});
	static ACLEXPLODE = this.Identifier.newKeyword("ACLEXPLODE", {
		ignoreCase: true,
	});
	static ACOS = this.Identifier.newKeyword("ACOS", { ignoreCase: true });
	static ACOSD = this.Identifier.newKeyword("ACOSD", { ignoreCase: true });
	static ACOSH = this.Identifier.newKeyword("ACOSH", { ignoreCase: true });
	static ACTION = this.Identifier.newKeyword("ACTION", { ignoreCase: true });
	static ACTIONS = this.Identifier.newKeyword("ACTIONS", { ignoreCase: true });
	static ACTIVE = this.Identifier.newKeyword("ACTIVE", { ignoreCase: true });
	static ADD = this.Identifier.newKeyword("ADD", { ignoreCase: true });
	static ADDDATE = this.Identifier.newKeyword("ADDDATE", { ignoreCase: true });
	static ADDTIME = this.Identifier.newKeyword("ADDTIME", { ignoreCase: true });
	static ADMIN = this.Identifier.newKeyword("ADMIN", { ignoreCase: true });
	static ADMINISTER = this.Identifier.newKeyword("ADMINISTER", {
		ignoreCase: true,
	});
	static ADVANCED = this.Identifier.newKeyword("ADVANCED", {
		ignoreCase: true,
	});
	static ADVISE = this.Identifier.newKeyword("ADVISE", { ignoreCase: true });
	static AES_DECRYPT = this.Identifier.newKeyword("AES_DECRYPT", {
		ignoreCase: true,
	});
	static AES_ENCRYPT = this.Identifier.newKeyword("AES_ENCRYPT", {
		ignoreCase: true,
	});
	static AFFINITY = this.Identifier.newKeyword("AFFINITY", {
		ignoreCase: true,
	});
	static AFTER = this.Identifier.newKeyword("AFTER", { ignoreCase: true });
	static AGAINST = this.Identifier.newKeyword("AGAINST", { ignoreCase: true });
	static AGE = this.Identifier.newKeyword("AGE", { ignoreCase: true });
	static AGENT = this.Identifier.newKeyword("AGENT", { ignoreCase: true });
	static AGGREGATE = this.Identifier.newKeyword("AGGREGATE", {
		ignoreCase: true,
	});
	static ALGORITHM = this.Identifier.newKeyword("ALGORITHM", {
		ignoreCase: true,
	});
	static ALIAS = this.Identifier.newKeyword("ALIAS", { ignoreCase: true });
	static ALL = this.Identifier.newKeyword("ALL", { ignoreCase: true });
	static ALLOCATE = this.Identifier.newKeyword("ALLOCATE", {
		ignoreCase: true,
	});
	static ALLOW = this.Identifier.newKeyword("ALLOW", { ignoreCase: true });
	static ALLOW_CONNECTIONS = this.Identifier.newKeyword("ALLOW_CONNECTIONS", {
		ignoreCase: true,
	});
	static ALTER = this.Identifier.newKeyword("ALTER", { ignoreCase: true });
	static ALTERNATE = this.Identifier.newKeyword("ALTERNATE", {
		ignoreCase: true,
	});
	static ALWAYS = this.Identifier.newKeyword("ALWAYS", { ignoreCase: true });
	static ANALYSE = this.Identifier.newKeyword("ANALYSE", { ignoreCase: true });
	static ANALYTIC = this.Identifier.newKeyword("ANALYTIC", {
		ignoreCase: true,
	});
	static ANALYZE = this.Identifier.newKeyword("ANALYZE", { ignoreCase: true });
	static ANCILLARY = this.Identifier.newKeyword("ANCILLARY", {
		ignoreCase: true,
	});
	static AND = this.Identifier.newKeyword("AND", { ignoreCase: true });
	static ANY = this.Identifier.newKeyword("ANY", { ignoreCase: true });
	static ANYDATA = this.Identifier.newKeyword("ANYDATA", { ignoreCase: true });
	static ANYDATASET = this.Identifier.newKeyword("ANYDATASET", {
		ignoreCase: true,
	});
	static ANYSCHEMA = this.Identifier.newKeyword("ANYSCHEMA", {
		ignoreCase: true,
	});
	static ANYTYPE = this.Identifier.newKeyword("ANYTYPE", { ignoreCase: true });
	static ANY_VALUE = this.Identifier.newKeyword("ANY_VALUE", {
		ignoreCase: true,
	});
	static APPICATION = this.Identifier.newKeyword("APPICATION", {
		ignoreCase: true,
	});
	static APPLY = this.Identifier.newKeyword("APPLY", { ignoreCase: true });
	static ARCHIVAL = this.Identifier.newKeyword("ARCHIVAL", {
		ignoreCase: true,
	});
	static ARCHIVE = this.Identifier.newKeyword("ARCHIVE", { ignoreCase: true });
	static ARCHIVED = this.Identifier.newKeyword("ARCHIVED", {
		ignoreCase: true,
	});
	static ARCHIVELOG = this.Identifier.newKeyword("ARCHIVELOG", {
		ignoreCase: true,
	});
	static AREA = this.Identifier.newKeyword("AREA", { ignoreCase: true });
	static ARRAY = this.Identifier.newKeyword("ARRAY", { ignoreCase: true });
	static ARRAY_AGG = this.Identifier.newKeyword("ARRAY_AGG", {
		ignoreCase: true,
	});
	static ARRAY_APPEND = this.Identifier.newKeyword("ARRAY_APPEND", {
		ignoreCase: true,
	});
	static ARRAY_CAT = this.Identifier.newKeyword("ARRAY_CAT", {
		ignoreCase: true,
	});
	static ARRAY_DIMS = this.Identifier.newKeyword("ARRAY_DIMS", {
		ignoreCase: true,
	});
	static ARRAY_FILL = this.Identifier.newKeyword("ARRAY_FILL", {
		ignoreCase: true,
	});
	static ARRAY_LENGTH = this.Identifier.newKeyword("ARRAY_LENGTH", {
		ignoreCase: true,
	});
	static ARRAY_LOWER = this.Identifier.newKeyword("ARRAY_LOWER", {
		ignoreCase: true,
	});
	static ARRAY_NDIMS = this.Identifier.newKeyword("ARRAY_NDIMS", {
		ignoreCase: true,
	});
	static ARRAY_POSITION = this.Identifier.newKeyword("ARRAY_POSITION", {
		ignoreCase: true,
	});
	static ARRAY_POSITIONS = this.Identifier.newKeyword("ARRAY_POSITIONS", {
		ignoreCase: true,
	});
	static ARRAY_PREPEND = this.Identifier.newKeyword("ARRAY_PREPEND", {
		ignoreCase: true,
	});
	static ARRAY_REMOVE = this.Identifier.newKeyword("ARRAY_REMOVE", {
		ignoreCase: true,
	});
	static ARRAY_REPLACE = this.Identifier.newKeyword("ARRAY_REPLACE", {
		ignoreCase: true,
	});
	static ARRAY_TO_JSON = this.Identifier.newKeyword("ARRAY_TO_JSON", {
		ignoreCase: true,
	});
	static ARRAY_TO_STRING = this.Identifier.newKeyword("ARRAY_TO_STRING", {
		ignoreCase: true,
	});
	static ARRAY_TO_TSVECTOR = this.Identifier.newKeyword("ARRAY_TO_TSVECTOR", {
		ignoreCase: true,
	});
	static ARRAY_UPPER = this.Identifier.newKeyword("ARRAY_UPPER", {
		ignoreCase: true,
	});
	static AS = this.Identifier.newKeyword("AS", { ignoreCase: true });
	static ASC = this.Identifier.newKeyword("ASC", { ignoreCase: true });
	static ASCII = this.Identifier.newKeyword("ASCII", { ignoreCase: true });
	static ASCIISTR = this.Identifier.newKeyword("ASCIISTR", {
		ignoreCase: true,
	});
	static ASSEMBLY = this.Identifier.newKeyword("ASSEMBLY", {
		ignoreCase: true,
	});
	static ASENSITIVE = this.Identifier.newKeyword("ASENSITIVE", {
		ignoreCase: true,
	});
	static ASIN = this.Identifier.newKeyword("ASIN", { ignoreCase: true });
	static ASIND = this.Identifier.newKeyword("ASIND", { ignoreCase: true });
	static ASINH = this.Identifier.newKeyword("ASINH", { ignoreCase: true });
	static ASSOCIATE = this.Identifier.newKeyword("ASSOCIATE", {
		ignoreCase: true,
	});
	static ASYMMETRIC = this.Identifier.newKeyword("ASYMMETRIC", {
		ignoreCase: true,
	});
	static ASYNCHRONOUS = this.Identifier.newKeyword("ASYNCHRONOUS", {
		ignoreCase: true,
	});
	static AT = this.Identifier.newKeyword("AT", { ignoreCase: true });
	static ATAN = this.Identifier.newKeyword("ATAN", { ignoreCase: true });
	static ATAN2 = this.Identifier.newKeyword("ATAN2", { ignoreCase: true });
	static ATAN2D = this.Identifier.newKeyword("ATAN2D", { ignoreCase: true });
	static ATAND = this.Identifier.newKeyword("ATAND", { ignoreCase: true });
	static ATANH = this.Identifier.newKeyword("ATANH", { ignoreCase: true });
	static ATOMIC = this.Identifier.newKeyword("ATOMIC", { ignoreCase: true });
	static ATTACH = this.Identifier.newKeyword("ATTACH", { ignoreCase: true });
	static ATTRIBUTE = this.Identifier.newKeyword("ATTRIBUTE", {
		ignoreCase: true,
	});
	static ATTRIBUTES = this.Identifier.newKeyword("ATTRIBUTES", {
		ignoreCase: true,
	});
	static AUDIT = this.Identifier.newKeyword("AUDIT", { ignoreCase: true });
	static AUTHENTICATED = this.Identifier.newKeyword("AUTHENTICATED", {
		ignoreCase: true,
	});
	static AUTHENTICATION = this.Identifier.newKeyword("AUTHENTICATION", {
		ignoreCase: true,
	});
	static AUTHID = this.Identifier.newKeyword("AUTHID", { ignoreCase: true });
	static AUTHORIZATION = this.Identifier.newKeyword("AUTHORIZATION", {
		ignoreCase: true,
	});
	static AUTO = this.Identifier.newKeyword("AUTO", { ignoreCase: true });
	static AUTOALLOCATE = this.Identifier.newKeyword("AUTOALLOCATE", {
		ignoreCase: true,
	});
	static AUTOEXTEND = this.Identifier.newKeyword("AUTOEXTEND", {
		ignoreCase: true,
	});
	static AUTOEXTEND_SIZE = this.Identifier.newKeyword("AUTOEXTEND_SIZE", {
		ignoreCase: true,
	});
	static AUTOINCREMENT = this.Identifier.newKeyword("AUTOINCREMENT", {
		ignoreCase: true,
	});
	static AUTOMATIC = this.Identifier.newKeyword("AUTOMATIC", {
		ignoreCase: true,
	});
	static AUTONOMOUS_TRANSACTION = this.Identifier.newKeyword(
		"AUTONOMOUS_TRANSACTION",
		{
			ignoreCase: true,
		},
	);
	static AUTO_INCREMENT = this.Identifier.newKeyword("AUTO_INCREMENT", {
		ignoreCase: true,
	});
	static AUTO_LOGIN = this.Identifier.newKeyword("AUTO_LOGIN", {
		ignoreCase: true,
	});
	static AVAILABILITY = this.Identifier.newKeyword("AVAILABILITY", {
		ignoreCase: true,
	});
	static AVG = this.Identifier.newKeyword("AVG", { ignoreCase: true });
	static AVG_ROW_LENGTH = this.Identifier.newKeyword("AVG_ROW_LENGTH", {
		ignoreCase: true,
	});
	static AZURE_ROLE = this.Identifier.newKeyword("AZURE_ROLE", {
		ignoreCase: true,
	});
	static AZURE_USER = this.Identifier.newKeyword("AZURE_USER", {
		ignoreCase: true,
	});
	static BACKUP = this.Identifier.newKeyword("BACKUP", { ignoreCase: true });
	static BADFILE = this.Identifier.newKeyword("BADFILE", { ignoreCase: true });
	static BASICFILE = this.Identifier.newKeyword("BASICFILE", {
		ignoreCase: true,
	});
	static BATCH = this.Identifier.newKeyword("BATCH", { ignoreCase: true });
	static BEFORE = this.Identifier.newKeyword("BEFORE", { ignoreCase: true });
	static BEGIN = this.Identifier.newKeyword("BEGIN", { ignoreCase: true });
	static BEGINNING = this.Identifier.newKeyword("BEGINNING", {
		ignoreCase: true,
	});
	static BENCHMARK = this.Identifier.newKeyword("BENCHMARK", {
		ignoreCase: true,
	});
	static BEQUEATH = this.Identifier.newKeyword("BEQUEATH", {
		ignoreCase: true,
	});
	static BERNOULLI = this.Identifier.newKeyword("BERNOULLI", {
		ignoreCase: true,
	});
	static BETWEEN = this.Identifier.newKeyword("BETWEEN", { ignoreCase: true });
	static BFILE = this.Identifier.newKeyword("BFILE", { ignoreCase: true });
	static BIGFILE = this.Identifier.newKeyword("BIGFILE", { ignoreCase: true });
	static BIGINT = this.Identifier.newKeyword("BIGINT", { ignoreCase: true });
	static BIN = this.Identifier.newKeyword("BIN", { ignoreCase: true });
	static BINARY = this.Identifier.newKeyword("BINARY", { ignoreCase: true });
	static BINARY_INTEGER = this.Identifier.newKeyword("BINARY_INTEGER", {
		ignoreCase: true,
	});
	static BINDING = this.Identifier.newKeyword("BINDING", { ignoreCase: true });
	static BINLOG = this.Identifier.newKeyword("BINLOG", { ignoreCase: true });
	static BIN_TO_UUID = this.Identifier.newKeyword("BIN_TO_UUID", {
		ignoreCase: true,
	});
	static BIT = this.Identifier.newKeyword("BIT", { ignoreCase: true });
	static BITMAP = this.Identifier.newKeyword("BITMAP", { ignoreCase: true });
	static BIT_AND = this.Identifier.newKeyword("BIT_AND", { ignoreCase: true });
	static BIT_COUNT = this.Identifier.newKeyword("BIT_COUNT", {
		ignoreCase: true,
	});
	static BIT_LENGTH = this.Identifier.newKeyword("BIT_LENGTH", {
		ignoreCase: true,
	});
	static BIT_OR = this.Identifier.newKeyword("BIT_OR", { ignoreCase: true });
	static BIT_XOR = this.Identifier.newKeyword("BIT_XOR", { ignoreCase: true });
	static BLOB = this.Identifier.newKeyword("BLOB", { ignoreCase: true });
	static BLOCK = this.Identifier.newKeyword("BLOCK", { ignoreCase: true });
	static BLOCKCHAIN = this.Identifier.newKeyword("BLOCKCHAIN", {
		ignoreCase: true,
	});
	static BLOCKSIZE = this.Identifier.newKeyword("BLOCKSIZE", {
		ignoreCase: true,
	});
	static BODY = this.Identifier.newKeyword("BODY", { ignoreCase: true });
	static BOOL = this.Identifier.newKeyword("BOOL", { ignoreCase: true });
	static BOOLEAN = this.Identifier.newKeyword("BOOLEAN", { ignoreCase: true });
	static BOOL_AND = this.Identifier.newKeyword("BOOL_AND", {
		ignoreCase: true,
	});
	static BOOL_OR = this.Identifier.newKeyword("BOOL_OR", { ignoreCase: true });
	static BOTH = this.Identifier.newKeyword("BOTH", { ignoreCase: true });
	static BOUND_BOX = this.Identifier.newKeyword("BOUND_BOX", {
		ignoreCase: true,
	});
	static BOX = this.Identifier.newKeyword("BOX", { ignoreCase: true });
	static BREADTH = this.Identifier.newKeyword("BREADTH", { ignoreCase: true });
	static BREAK = this.Identifier.newKeyword("BREAK", { ignoreCase: true });
	static BROADCAST = this.Identifier.newKeyword("BROADCAST", {
		ignoreCase: true,
	});
	static BROKER = this.Identifier.newKeyword("BROKER", { ignoreCase: true });
	static BROWSE = this.Identifier.newKeyword("BROWSE", { ignoreCase: true });
	static BTREE = this.Identifier.newKeyword("BTREE", { ignoreCase: true });
	static BTRIM = this.Identifier.newKeyword("BTRIM", { ignoreCase: true });
	static BUFFERS = this.Identifier.newKeyword("BUFFERS", { ignoreCase: true });
	static BUFFER_CACHE = this.Identifier.newKeyword("BUFFER_CACHE", {
		ignoreCase: true,
	});
	static BULK = this.Identifier.newKeyword("BULK", { ignoreCase: true });
	static BULK_EXCEPTIONS = this.Identifier.newKeyword("BULK_EXCEPTIONS", {
		ignoreCase: true,
	});
	static BULK_ROWCOUNT = this.Identifier.newKeyword("BULK_ROWCOUNT", {
		ignoreCase: true,
	});
	static BY = this.Identifier.newKeyword("BY", { ignoreCase: true });
	static BYTEA = this.Identifier.newKeyword("BYTEA", { ignoreCase: true });
	static CACHE = this.Identifier.newKeyword("CACHE", { ignoreCase: true });
	static CACHING = this.Identifier.newKeyword("CACHING", { ignoreCase: true });
	static CALL = this.Identifier.newKeyword("CALL", { ignoreCase: true });
	static CANCEL = this.Identifier.newKeyword("CANCEL", { ignoreCase: true });
	static CAPACITY = this.Identifier.newKeyword("CAPACITY", {
		ignoreCase: true,
	});
	static CAPTION = this.Identifier.newKeyword("CAPTION", { ignoreCase: true });
	static CARDINALITY = this.Identifier.newKeyword("CARDINALITY", {
		ignoreCase: true,
	});
	static CASCADE = this.Identifier.newKeyword("CASCADE", { ignoreCase: true });
	static CASCADED = this.Identifier.newKeyword("CASCADED", {
		ignoreCase: true,
	});
	static CASE = this.Identifier.newKeyword("CASE", { ignoreCase: true });
	static CAST = this.Identifier.newKeyword("CAST", { ignoreCase: true });
	static CATCH = this.Identifier.newKeyword("CATCH", { ignoreCase: true });
	static CATEGORY = this.Identifier.newKeyword("CATEGORY", {
		ignoreCase: true,
	});
	static CBRT = this.Identifier.newKeyword("CBRT", { ignoreCase: true });
	static CEIL = this.Identifier.newKeyword("CEIL", { ignoreCase: true });
	static CEILING = this.Identifier.newKeyword("CEILING", { ignoreCase: true });
	static CENTER = this.Identifier.newKeyword("CENTER", { ignoreCase: true });
	static CENTURY = this.Identifier.newKeyword("CENTURY", { ignoreCase: true });
	static CERTIFICATE = this.Identifier.newKeyword("CERTIFICATE", {
		ignoreCase: true,
	});
	static CHAIN = this.Identifier.newKeyword("CHAIN", { ignoreCase: true });
	static CHAINED = this.Identifier.newKeyword("CHAINED", { ignoreCase: true });
	static CHANGE = this.Identifier.newKeyword("CHANGE", { ignoreCase: true });
	static CHANGES = this.Identifier.newKeyword("CHANGES", { ignoreCase: true });
	static CHAR = this.Identifier.newKeyword("CHAR", { ignoreCase: true });
	static CHAR2 = this.Identifier.newKeyword("CHAR2", { ignoreCase: true });
	static CHARACTER = this.Identifier.newKeyword("CHARACTER", {
		ignoreCase: true,
	});
	static CHARACTER_LENGTH = this.Identifier.newKeyword("CHARACTER_LENGTH", {
		ignoreCase: true,
	});
	static CHARF = this.Identifier.newKeyword("CHARF", { ignoreCase: true });
	static CHARINDEX = this.Identifier.newKeyword("CHARINDEX", {
		ignoreCase: true,
	});
	static CHARSET = this.Identifier.newKeyword("CHARSET", { ignoreCase: true });
	static CHARSETFORM = this.Identifier.newKeyword("CHARSETFORM", {
		ignoreCase: true,
	});
	static CHARSETID = this.Identifier.newKeyword("CHARSETID", {
		ignoreCase: true,
	});
	static CHARZ = this.Identifier.newKeyword("CHARZ", { ignoreCase: true });
	static CHAR_LENGTH = this.Identifier.newKeyword("CHAR_LENGTH", {
		ignoreCase: true,
	});
	static CHECK = this.Identifier.newKeyword("CHECK", { ignoreCase: true });
	static CHECKPOINT = this.Identifier.newKeyword("CHECKPOINT", {
		ignoreCase: true,
	});
	static CHECKSUM = this.Identifier.newKeyword("CHECKSUM", {
		ignoreCase: true,
	});
	static CHILD = this.Identifier.newKeyword("CHILD", { ignoreCase: true });
	static CHOOSE = this.Identifier.newKeyword("CHOOSE", { ignoreCase: true });
	static CHR = this.Identifier.newKeyword("CHR", { ignoreCase: true });
	static CHUNK = this.Identifier.newKeyword("CHUNK", { ignoreCase: true });
	static CIPHER = this.Identifier.newKeyword("CIPHER", { ignoreCase: true });
	static CIRCLE = this.Identifier.newKeyword("CIRCLE", { ignoreCase: true });
	static CLASS = this.Identifier.newKeyword("CLASS", { ignoreCase: true });
	static CLASSIFICATION = this.Identifier.newKeyword("CLASSIFICATION", {
		ignoreCase: true,
	});
	static CLASSIFIER = this.Identifier.newKeyword("CLASSIFIER", {
		ignoreCase: true,
	});
	static CLAUSE = this.Identifier.newKeyword("CLAUSE", { ignoreCase: true });
	static CLEAN = this.Identifier.newKeyword("CLEAN", { ignoreCase: true });
	static CLEANUP = this.Identifier.newKeyword("CLEANUP", { ignoreCase: true });
	static CLEAR = this.Identifier.newKeyword("CLEAR", { ignoreCase: true });
	static CLIENT = this.Identifier.newKeyword("CLIENT", { ignoreCase: true });
	static CLOB = this.Identifier.newKeyword("CLOB", { ignoreCase: true });
	static CLOCK_TIMESTAMP = this.Identifier.newKeyword("CLOCK_TIMESTAMP", {
		ignoreCase: true,
	});
	static CLONE = this.Identifier.newKeyword("CLONE", { ignoreCase: true });
	static CLOSE = this.Identifier.newKeyword("CLOSE", { ignoreCase: true });
	static CLS = this.Identifier.newKeyword("CLS", { ignoreCase: true });
	static CLUSTER = this.Identifier.newKeyword("CLUSTER", { ignoreCase: true });
	static CLUSTERED = this.Identifier.newKeyword("CLUSTERED", {
		ignoreCase: true,
	});
	static CLUSTERING = this.Identifier.newKeyword("CLUSTERING", {
		ignoreCase: true,
	});
	static CLUSTERS = this.Identifier.newKeyword("CLUSTERS", {
		ignoreCase: true,
	});
	static CN = this.Identifier.newKeyword("CN", { ignoreCase: true });
	static COALESCE = this.Identifier.newKeyword("COALESCE", {
		ignoreCase: true,
	});
	static COARSE = this.Identifier.newKeyword("COARSE", { ignoreCase: true });
	static COERCIBILITY = this.Identifier.newKeyword("COERCIBILITY", {
		ignoreCase: true,
	});
	static COLAUTH = this.Identifier.newKeyword("COLAUTH", { ignoreCase: true });
	static COLD = this.Identifier.newKeyword("COLD", { ignoreCase: true });
	static COLLATE = this.Identifier.newKeyword("COLLATE", { ignoreCase: true });
	static COLLATION = this.Identifier.newKeyword("COLLATION", {
		ignoreCase: true,
	});
	static COLLECT = this.Identifier.newKeyword("COLLECT", { ignoreCase: true });
	static COLLECTION = this.Identifier.newKeyword("COLLECTION", {
		ignoreCase: true,
	});
	static COLUMN = this.Identifier.newKeyword("COLUMN", { ignoreCase: true });
	static COLUMNS = this.Identifier.newKeyword("COLUMNS", { ignoreCase: true });
	static COLUMNSTORE = this.Identifier.newKeyword("COLUMNSTORE", {
		ignoreCase: true,
	});
	static COLUMNS_UPDATED = this.Identifier.newKeyword("COLUMNS_UPDATED", {
		ignoreCase: true,
	});
	static COLUMN_FORMAT = this.Identifier.newKeyword("COLUMN_FORMAT", {
		ignoreCase: true,
	});
	static COLUMN_VALUE = this.Identifier.newKeyword("COLUMN_VALUE", {
		ignoreCase: true,
	});
	static COMMENT = this.Identifier.newKeyword("COMMENT", { ignoreCase: true });
	static COMMIT = this.Identifier.newKeyword("COMMIT", { ignoreCase: true });
	static COMMITTED = this.Identifier.newKeyword("COMMITTED", {
		ignoreCase: true,
	});
	static COMPACT = this.Identifier.newKeyword("COMPACT", { ignoreCase: true });
	static COMPATIBILITY = this.Identifier.newKeyword("COMPATIBILITY", {
		ignoreCase: true,
	});
	static COMPILE = this.Identifier.newKeyword("COMPILE", { ignoreCase: true });
	static COMPLETE = this.Identifier.newKeyword("COMPLETE", {
		ignoreCase: true,
	});
	static COMPLETION = this.Identifier.newKeyword("COMPLETION", {
		ignoreCase: true,
	});
	static COMPONENT = this.Identifier.newKeyword("COMPONENT", {
		ignoreCase: true,
	});
	static COMPOSITE_LIMIT = this.Identifier.newKeyword("COMPOSITE_LIMIT", {
		ignoreCase: true,
	});
	static COMPRESS = this.Identifier.newKeyword("COMPRESS", {
		ignoreCase: true,
	});
	static COMPRESSED = this.Identifier.newKeyword("COMPRESSED", {
		ignoreCase: true,
	});
	static COMPRESSION = this.Identifier.newKeyword("COMPRESSION", {
		ignoreCase: true,
	});
	static COMPUTATION = this.Identifier.newKeyword("COMPUTATION", {
		ignoreCase: true,
	});
	static COMPUTE = this.Identifier.newKeyword("COMPUTE", { ignoreCase: true });
	static CONCAT = this.Identifier.newKeyword("CONCAT", { ignoreCase: true });
	static CONCAT_WS = this.Identifier.newKeyword("CONCAT_WS", {
		ignoreCase: true,
	});
	static CONCURRENT = this.Identifier.newKeyword("CONCURRENT", {
		ignoreCase: true,
	});
	static CONCURRENTLY = this.Identifier.newKeyword("CONCURRENTLY", {
		ignoreCase: true,
	});
	static CONDITION = this.Identifier.newKeyword("CONDITION", {
		ignoreCase: true,
	});
	static CONFIGURATION = this.Identifier.newKeyword("CONFIGURATION", {
		ignoreCase: true,
	});
	static CONFIRM = this.Identifier.newKeyword("CONFIRM", { ignoreCase: true });
	static CONFLICT = this.Identifier.newKeyword("CONFLICT", {
		ignoreCase: true,
	});
	static CONNECT = this.Identifier.newKeyword("CONNECT", { ignoreCase: true });
	static CONNECTION = this.Identifier.newKeyword("CONNECTION", {
		ignoreCase: true,
	});
	static CONNECTION_ID = this.Identifier.newKeyword("CONNECTION_ID", {
		ignoreCase: true,
	});
	static CONNECT_BY_ISCYCLE = this.Identifier.newKeyword("CONNECT_BY_ISCYCLE", {
		ignoreCase: true,
	});
	static CONNECT_BY_ISLEAF = this.Identifier.newKeyword("CONNECT_BY_ISLEAF", {
		ignoreCase: true,
	});
	static CONNECT_TIME = this.Identifier.newKeyword("CONNECT_TIME", {
		ignoreCase: true,
	});
	static CONSIDER = this.Identifier.newKeyword("CONSIDER", {
		ignoreCase: true,
	});
	static CONSISTENT = this.Identifier.newKeyword("CONSISTENT", {
		ignoreCase: true,
	});
	static CONSTANT = this.Identifier.newKeyword("CONSTANT", {
		ignoreCase: true,
	});
	static CONSTRAINT = this.Identifier.newKeyword("CONSTRAINT", {
		ignoreCase: true,
	});
	static CONSTRAINTS = this.Identifier.newKeyword("CONSTRAINTS", {
		ignoreCase: true,
	});
	static CONTAINER = this.Identifier.newKeyword("CONTAINER", {
		ignoreCase: true,
	});
	static CONTAINERS = this.Identifier.newKeyword("CONTAINERS", {
		ignoreCase: true,
	});
	static CONTAINERS_DEFAULT = this.Identifier.newKeyword("CONTAINERS_DEFAULT", {
		ignoreCase: true,
	});
	static CONTAINER_DATA = this.Identifier.newKeyword("CONTAINER_DATA", {
		ignoreCase: true,
	});
	static CONTAINER_MAP = this.Identifier.newKeyword("CONTAINER_MAP", {
		ignoreCase: true,
	});
	static CONTAINS = this.Identifier.newKeyword("CONTAINS", {
		ignoreCase: true,
	});
	static CONTAINSTABLE = this.Identifier.newKeyword("CONTAINSTABLE", {
		ignoreCase: true,
	});
	static CONTENTS = this.Identifier.newKeyword("CONTENTS", {
		ignoreCase: true,
	});
	static CONTEXT = this.Identifier.newKeyword("CONTEXT", { ignoreCase: true });
	static CONTINUE = this.Identifier.newKeyword("CONTINUE", {
		ignoreCase: true,
	});
	static CONTRACT = this.Identifier.newKeyword("CONTRACT", {
		ignoreCase: true,
	});
	static CONTROLFILE = this.Identifier.newKeyword("CONTROLFILE", {
		ignoreCase: true,
	});
	static CONV = this.Identifier.newKeyword("CONV", { ignoreCase: true });
	static CONVERSION = this.Identifier.newKeyword("CONVERSION", {
		ignoreCase: true,
	});
	static CONVERT = this.Identifier.newKeyword("CONVERT", { ignoreCase: true });
	static CONVERT_FROM = this.Identifier.newKeyword("CONVERT_FROM", {
		ignoreCase: true,
	});
	static CONVERT_TO = this.Identifier.newKeyword("CONVERT_TO", {
		ignoreCase: true,
	});
	static CONVERT_TZ = this.Identifier.newKeyword("CONVERT_TZ", {
		ignoreCase: true,
	});
	static COPY = this.Identifier.newKeyword("COPY", { ignoreCase: true });
	static CORR = this.Identifier.newKeyword("CORR", { ignoreCase: true });
	static CORRUPTION = this.Identifier.newKeyword("CORRUPTION", {
		ignoreCase: true,
	});
	static COS = this.Identifier.newKeyword("COS", { ignoreCase: true });
	static COSD = this.Identifier.newKeyword("COSD", { ignoreCase: true });
	static COSH = this.Identifier.newKeyword("COSH", { ignoreCase: true });
	static COST = this.Identifier.newKeyword("COST", { ignoreCase: true });
	static COSTS = this.Identifier.newKeyword("COSTS", { ignoreCase: true });
	static COT = this.Identifier.newKeyword("COT", { ignoreCase: true });
	static COTD = this.Identifier.newKeyword("COTD", { ignoreCase: true });
	static COUNT = this.Identifier.newKeyword("COUNT", { ignoreCase: true });
	static COVAR_POP = this.Identifier.newKeyword("COVAR_POP", {
		ignoreCase: true,
	});
	static COVAR_SAMP = this.Identifier.newKeyword("COVAR_SAMP", {
		ignoreCase: true,
	});
	static COVERAGE = this.Identifier.newKeyword("COVERAGE", {
		ignoreCase: true,
	});
	static CPU_PER_CALL = this.Identifier.newKeyword("CPU_PER_CALL", {
		ignoreCase: true,
	});
	static CPU_PER_SESSION = this.Identifier.newKeyword("CPU_PER_SESSION", {
		ignoreCase: true,
	});
	static CRASH = this.Identifier.newKeyword("CRASH", { ignoreCase: true });
	static CRC32 = this.Identifier.newKeyword("CRC32", { ignoreCase: true });
	static CREATE = this.Identifier.newKeyword("CREATE", { ignoreCase: true });
	static CREATE_FILE_DEST = this.Identifier.newKeyword("CREATE_FILE_DEST", {
		ignoreCase: true,
	});
	static CREATION = this.Identifier.newKeyword("CREATION", {
		ignoreCase: true,
	});
	static CREDENTIAL = this.Identifier.newKeyword("CREDENTIAL", {
		ignoreCase: true,
	});
	static CREDENTIALS = this.Identifier.newKeyword("CREDENTIALS", {
		ignoreCase: true,
	});
	static CRITICAL = this.Identifier.newKeyword("CRITICAL", {
		ignoreCase: true,
	});
	static CROSS = this.Identifier.newKeyword("CROSS", { ignoreCase: true });
	static CRYPTOGRAPHIC = this.Identifier.newKeyword("CRYPTOGRAPHIC", {
		ignoreCase: true,
	});
	static CUBE = this.Identifier.newKeyword("CUBE", { ignoreCase: true });
	static CUME_DIST = this.Identifier.newKeyword("CUME_DIST", {
		ignoreCase: true,
	});
	static CURDATE = this.Identifier.newKeyword("CURDATE", { ignoreCase: true });
	static CURRENT = this.Identifier.newKeyword("CURRENT", { ignoreCase: true });
	static CURRENT_CATALOG = this.Identifier.newKeyword("CURRENT_CATALOG", {
		ignoreCase: true,
	});
	static CURRENT_DATABASE = this.Identifier.newKeyword("CURRENT_DATABASE", {
		ignoreCase: true,
	});
	static CURRENT_DATE = this.Identifier.newKeyword("CURRENT_DATE", {
		ignoreCase: true,
	});
	static CURRENT_QUERY = this.Identifier.newKeyword("CURRENT_QUERY", {
		ignoreCase: true,
	});
	static CURRENT_ROLE = this.Identifier.newKeyword("CURRENT_ROLE", {
		ignoreCase: true,
	});
	static CURRENT_SCHEMA = this.Identifier.newKeyword("CURRENT_SCHEMA", {
		ignoreCase: true,
	});
	static CURRENT_SCHEMAS = this.Identifier.newKeyword("CURRENT_SCHEMAS", {
		ignoreCase: true,
	});
	static CURRENT_TIME = this.Identifier.newKeyword("CURRENT_TIME", {
		ignoreCase: true,
	});
	static CURRENT_TIMESTAMP = this.Identifier.newKeyword("CURRENT_TIMESTAMP", {
		ignoreCase: true,
	});
	static CURRENT_TIMEZONE = this.Identifier.newKeyword("CURRENT_TIMEZONE", {
		ignoreCase: true,
	});
	static CURRENT_TIMEZONE_ID = this.Identifier.newKeyword(
		"CURRENT_TIMEZONE_ID",
		{
			ignoreCase: true,
		},
	);
	static CURRENT_USER = this.Identifier.newKeyword("CURRENT_USER", {
		ignoreCase: true,
	});
	static CURRVAL = this.Identifier.newKeyword("CURRVAL", { ignoreCase: true });
	static CURSOR = this.Identifier.newKeyword("CURSOR", { ignoreCase: true });
	static CURSOR_TO_XML = this.Identifier.newKeyword("CURSOR_TO_XML", {
		ignoreCase: true,
	});
	static CURSOR_TO_XMLSCHEMA = this.Identifier.newKeyword(
		"CURSOR_TO_XMLSCHEMA",
		{
			ignoreCase: true,
		},
	);
	static CURTIME = this.Identifier.newKeyword("CURTIME", { ignoreCase: true });
	static CYCLE = this.Identifier.newKeyword("CYCLE", { ignoreCase: true });
	static D = this.Identifier.newKeyword("D", { ignoreCase: true });
	static DANGLING = this.Identifier.newKeyword("DANGLING", {
		ignoreCase: true,
	});
	static DATA = this.Identifier.newKeyword("DATA", { ignoreCase: true });
	static DATABASE = this.Identifier.newKeyword("DATABASE", {
		ignoreCase: true,
	});
	static DATABASES = this.Identifier.newKeyword("DATABASES", {
		ignoreCase: true,
	});
	static DATABASE_TO_XML = this.Identifier.newKeyword("DATABASE_TO_XML", {
		ignoreCase: true,
	});
	static DATABASE_TO_XMLSCHEMA = this.Identifier.newKeyword(
		"DATABASE_TO_XMLSCHEMA",
		{
			ignoreCase: true,
		},
	);
	static DATABASE_TO_XML_AND_XMLSCHEMA = this.Identifier.newKeyword(
		"DATABASE_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static DATAFILE = this.Identifier.newKeyword("DATAFILE", {
		ignoreCase: true,
	});
	static DATAFILES = this.Identifier.newKeyword("DATAFILES", {
		ignoreCase: true,
	});
	static DATALENGTH = this.Identifier.newKeyword("DATALENGTH", {
		ignoreCase: true,
	});
	static DATAPUMP = this.Identifier.newKeyword("DATAPUMP", {
		ignoreCase: true,
	});
	static DATATYPE = this.Identifier.newKeyword("DATATYPE", {
		ignoreCase: true,
	});
	static DATE = this.Identifier.newKeyword("DATE", { ignoreCase: true });
	static DATEADD = this.Identifier.newKeyword("DATEADD", { ignoreCase: true });
	static DATEDIFF = this.Identifier.newKeyword("DATEDIFF", {
		ignoreCase: true,
	});
	static DATEDIFF_BIG = this.Identifier.newKeyword("DATEDIFF_BIG", {
		ignoreCase: true,
	});
	static DATEFROMPARTS = this.Identifier.newKeyword("DATEFROMPARTS", {
		ignoreCase: true,
	});
	static DATENAME = this.Identifier.newKeyword("DATENAME", {
		ignoreCase: true,
	});
	static DATEPART = this.Identifier.newKeyword("DATEPART", {
		ignoreCase: true,
	});
	static DATETIME = this.Identifier.newKeyword("DATETIME", {
		ignoreCase: true,
	});
	static DATETIMEFROMPARTS = this.Identifier.newKeyword("DATETIMEFROMPARTS", {
		ignoreCase: true,
	});
	static DATETIMEOFFSET = this.Identifier.newKeyword("DATETIMEOFFSET", {
		ignoreCase: true,
	});
	static DATETIMEOFFSETFROMPARTS = this.Identifier.newKeyword(
		"DATETIMEOFFSETFROMPARTS",
		{
			ignoreCase: true,
		},
	);
	static DATETIME2 = this.Identifier.newKeyword("DATETIME2", {
		ignoreCase: true,
	});
	static DATETIME2FROMPARTS = this.Identifier.newKeyword("DATETIME2FROMPARTS", {
		ignoreCase: true,
	});
	static DATE_ADD = this.Identifier.newKeyword("DATE_ADD", {
		ignoreCase: true,
	});
	static DATE_BIN = this.Identifier.newKeyword("DATE_BIN", {
		ignoreCase: true,
	});
	static DATE_BUCKET = this.Identifier.newKeyword("DATE_BUCKET", {
		ignoreCase: true,
	});
	static DATE_FORMAT = this.Identifier.newKeyword("DATE_FORMAT", {
		ignoreCase: true,
	});
	static DATE_PART = this.Identifier.newKeyword("DATE_PART", {
		ignoreCase: true,
	});
	static DATE_SUB = this.Identifier.newKeyword("DATE_SUB", {
		ignoreCase: true,
	});
	static DATE_TRUNC = this.Identifier.newKeyword("DATE_TRUNC", {
		ignoreCase: true,
	});
	static DAY = this.Identifier.newKeyword("DAY", { ignoreCase: true });
	static DAYNAME = this.Identifier.newKeyword("DAYNAME", { ignoreCase: true });
	static DAYOFMONTH = this.Identifier.newKeyword("DAYOFMONTH", {
		ignoreCase: true,
	});
	static DAYOFWEEK = this.Identifier.newKeyword("DAYOFWEEK", {
		ignoreCase: true,
	});
	static DAYOFYEAR = this.Identifier.newKeyword("DAYOFYEAR", {
		ignoreCase: true,
	});
	static DAYS = this.Identifier.newKeyword("DAYS", { ignoreCase: true });
	static DAY_HOUR = this.Identifier.newKeyword("DAY_HOUR", {
		ignoreCase: true,
	});
	static DAY_MICROSECOND = this.Identifier.newKeyword("DAY_MICROSECOND", {
		ignoreCase: true,
	});
	static DAY_MINUTE = this.Identifier.newKeyword("DAY_MINUTE", {
		ignoreCase: true,
	});
	static DAY_SECOND = this.Identifier.newKeyword("DAY_SECOND", {
		ignoreCase: true,
	});
	static DBA_RECYCLEBIN = this.Identifier.newKeyword("DBA_RECYCLEBIN", {
		ignoreCase: true,
	});
	static DBCC = this.Identifier.newKeyword("DBCC", { ignoreCase: true });
	static DBURITYPE = this.Identifier.newKeyword("DBURITYPE", {
		ignoreCase: true,
	});
	static DDL = this.Identifier.newKeyword("DDL", { ignoreCase: true });
	static DEALLOCATE = this.Identifier.newKeyword("DEALLOCATE", {
		ignoreCase: true,
	});
	static DEBUG = this.Identifier.newKeyword("DEBUG", { ignoreCase: true });
	static DEC = this.Identifier.newKeyword("DEC", { ignoreCase: true });
	static DECADE = this.Identifier.newKeyword("DECADE", { ignoreCase: true });
	static DECIMAL = this.Identifier.newKeyword("DECIMAL", { ignoreCase: true });
	static DECLARE = this.Identifier.newKeyword("DECLARE", { ignoreCase: true });
	static DECODE = this.Identifier.newKeyword("DECODE", { ignoreCase: true });
	static DECREMENT = this.Identifier.newKeyword("DECREMENT", {
		ignoreCase: true,
	});
	static DECRYPT = this.Identifier.newKeyword("DECRYPT", { ignoreCase: true });
	static DEDUPLICATE = this.Identifier.newKeyword("DEDUPLICATE", {
		ignoreCase: true,
	});
	static DEFAULT = this.Identifier.newKeyword("DEFAULT", { ignoreCase: true });
	static DEFAULT_COLLATION = this.Identifier.newKeyword("DEFAULT_COLLATION", {
		ignoreCase: true,
	});
	static DEFAULT_CREDENTIAL = this.Identifier.newKeyword("DEFAULT_CREDENTIAL", {
		ignoreCase: true,
	});
	static DEFERRABLE = this.Identifier.newKeyword("DEFERRABLE", {
		ignoreCase: true,
	});
	static DEFERRED = this.Identifier.newKeyword("DEFERRED", {
		ignoreCase: true,
	});
	static DEFINE = this.Identifier.newKeyword("DEFINE", { ignoreCase: true });
	static DEFINER = this.Identifier.newKeyword("DEFINER", { ignoreCase: true });
	static DEFINITION = this.Identifier.newKeyword("DEFINITION", {
		ignoreCase: true,
	});
	static DEGREES = this.Identifier.newKeyword("DEGREES", { ignoreCase: true });
	static DELAYED = this.Identifier.newKeyword("DELAYED", { ignoreCase: true });
	static DELAY_KEY_WRITE = this.Identifier.newKeyword("DELAY_KEY_WRITE", {
		ignoreCase: true,
	});
	static DELETE = this.Identifier.newKeyword("DELETE", { ignoreCase: true });
	static DELETE_ALL = this.Identifier.newKeyword("DELETE_ALL", {
		ignoreCase: true,
	});
	static DELETING = this.Identifier.newKeyword("DELETING", {
		ignoreCase: true,
	});
	static DELIGATE = this.Identifier.newKeyword("DELIGATE", {
		ignoreCase: true,
	});
	static DEMAND = this.Identifier.newKeyword("DEMAND", { ignoreCase: true });
	static DENSE_RANK = this.Identifier.newKeyword("DENSE_RANK", {
		ignoreCase: true,
	});
	static DENY = this.Identifier.newKeyword("DENY", { ignoreCase: true });
	static DEPENDENT = this.Identifier.newKeyword("DEPENDENT", {
		ignoreCase: true,
	});
	static DEPLICATE = this.Identifier.newKeyword("DEPLICATE", {
		ignoreCase: true,
	});
	static DEPTH = this.Identifier.newKeyword("DEPTH", { ignoreCase: true });
	static DESC = this.Identifier.newKeyword("DESC", { ignoreCase: true });
	static DESCRIBE = this.Identifier.newKeyword("DESCRIBE", {
		ignoreCase: true,
	});
	static DESCRIPTION = this.Identifier.newKeyword("DESCRIPTION", {
		ignoreCase: true,
	});
	static DES_KEY_FILE = this.Identifier.newKeyword("DES_KEY_FILE", {
		ignoreCase: true,
	});
	static DETACH = this.Identifier.newKeyword("DETACH", { ignoreCase: true });
	static DETAIL = this.Identifier.newKeyword("DETAIL", { ignoreCase: true });
	static DETERMINES = this.Identifier.newKeyword("DETERMINES", {
		ignoreCase: true,
	});
	static DETERMINISTIC = this.Identifier.newKeyword("DETERMINISTIC", {
		ignoreCase: true,
	});
	static DIAGONAL = this.Identifier.newKeyword("DIAGONAL", {
		ignoreCase: true,
	});
	static DIAMETER = this.Identifier.newKeyword("DIAMETER", {
		ignoreCase: true,
	});
	static DICTIONARY = this.Identifier.newKeyword("DICTIONARY", {
		ignoreCase: true,
	});
	static DIFFERENCE = this.Identifier.newKeyword("DIFFERENCE", {
		ignoreCase: true,
	});
	static DIGEST = this.Identifier.newKeyword("DIGEST", { ignoreCase: true });
	static DIMENSION = this.Identifier.newKeyword("DIMENSION", {
		ignoreCase: true,
	});
	static DIRECTORY = this.Identifier.newKeyword("DIRECTORY", {
		ignoreCase: true,
	});
	static DIRECT_LOAD = this.Identifier.newKeyword("DIRECT_LOAD", {
		ignoreCase: true,
	});
	static DIRECT_PATH = this.Identifier.newKeyword("DIRECT_PATH", {
		ignoreCase: true,
	});
	static DISABLE = this.Identifier.newKeyword("DISABLE", { ignoreCase: true });
	static DISABLE_ALL = this.Identifier.newKeyword("DISABLE_ALL", {
		ignoreCase: true,
	});
	static DISALLOW = this.Identifier.newKeyword("DISALLOW", {
		ignoreCase: true,
	});
	static DISASSOCIATE = this.Identifier.newKeyword("DISASSOCIATE", {
		ignoreCase: true,
	});
	static DISCARD = this.Identifier.newKeyword("DISCARD", { ignoreCase: true });
	static DISCARDFILE = this.Identifier.newKeyword("DISCARDFILE", {
		ignoreCase: true,
	});
	static DISCONNECT = this.Identifier.newKeyword("DISCONNECT", {
		ignoreCase: true,
	});
	static DISK = this.Identifier.newKeyword("DISK", { ignoreCase: true });
	static DISKGROUP = this.Identifier.newKeyword("DISKGROUP", {
		ignoreCase: true,
	});
	static DISKS = this.Identifier.newKeyword("DISKS", { ignoreCase: true });
	static DISMOUNT = this.Identifier.newKeyword("DISMOUNT", {
		ignoreCase: true,
	});
	static DISPLAY = this.Identifier.newKeyword("DISPLAY", { ignoreCase: true });
	static DISTINCT = this.Identifier.newKeyword("DISTINCT", {
		ignoreCase: true,
	});
	static DISTINCTROW = this.Identifier.newKeyword("DISTINCTROW", {
		ignoreCase: true,
	});
	static DISTRIBUTE = this.Identifier.newKeyword("DISTRIBUTE", {
		ignoreCase: true,
	});
	static DISTRIBUTED = this.Identifier.newKeyword("DISTRIBUTED", {
		ignoreCase: true,
	});
	static DIV = this.Identifier.newKeyword("DIV", { ignoreCase: true });
	static DML = this.Identifier.newKeyword("DML", { ignoreCase: true });
	static DO = this.Identifier.newKeyword("DO", { ignoreCase: true });
	static DOCUMENT = this.Identifier.newKeyword("DOCUMENT", {
		ignoreCase: true,
	});
	static DOMAIN = this.Identifier.newKeyword("DOMAIN", { ignoreCase: true });
	static DOUBLE = this.Identifier.newKeyword("DOUBLE", { ignoreCase: true });
	static DOW = this.Identifier.newKeyword("DOW", { ignoreCase: true });
	static DOWNGRADE = this.Identifier.newKeyword("DOWNGRADE", {
		ignoreCase: true,
	});
	static DOY = this.Identifier.newKeyword("DOY", { ignoreCase: true });
	static DROP = this.Identifier.newKeyword("DROP", { ignoreCase: true });
	static DUAL = this.Identifier.newKeyword("DUAL", { ignoreCase: true });
	static DUMP = this.Identifier.newKeyword("DUMP", { ignoreCase: true });
	static DUPLICATE = this.Identifier.newKeyword("DUPLICATE", {
		ignoreCase: true,
	});
	static DUPLICATED = this.Identifier.newKeyword("DUPLICATED", {
		ignoreCase: true,
	});
	static DURATION = this.Identifier.newKeyword("DURATION", {
		ignoreCase: true,
	});
	static DV = this.Identifier.newKeyword("DV", { ignoreCase: true });
	static DYNAMIC = this.Identifier.newKeyword("DYNAMIC", { ignoreCase: true });
	static E = this.Identifier.newKeyword("E", { ignoreCase: true });
	static EACH = this.Identifier.newKeyword("EACH", { ignoreCase: true });
	static EDITION = this.Identifier.newKeyword("EDITION", { ignoreCase: true });
	static EDITIONABLE = this.Identifier.newKeyword("EDITIONABLE", {
		ignoreCase: true,
	});
	static EDITIONING = this.Identifier.newKeyword("EDITIONING", {
		ignoreCase: true,
	});
	static EDITIONS = this.Identifier.newKeyword("EDITIONS", {
		ignoreCase: true,
	});
	static ELEMENT = this.Identifier.newKeyword("ELEMENT", { ignoreCase: true });
	static ELSE = this.Identifier.newKeyword("ELSE", { ignoreCase: true });
	static ELSEIF = this.Identifier.newKeyword("ELSEIF", { ignoreCase: true });
	static ELSIF = this.Identifier.newKeyword("ELSIF", { ignoreCase: true });
	static ELT = this.Identifier.newKeyword("ELT", { ignoreCase: true });
	static EMPTY = this.Identifier.newKeyword("EMPTY", { ignoreCase: true });
	static EMPTY_BLOB = this.Identifier.newKeyword("EMPTY_BLOB", {
		ignoreCase: true,
	});
	static EMPTY_CLOB = this.Identifier.newKeyword("EMPTY_CLOB", {
		ignoreCase: true,
	});
	static ENABLE = this.Identifier.newKeyword("ENABLE", { ignoreCase: true });
	static ENABLE_ALL = this.Identifier.newKeyword("ENABLE_ALL", {
		ignoreCase: true,
	});
	static ENCLOSED = this.Identifier.newKeyword("ENCLOSED", {
		ignoreCase: true,
	});
	static ENCODE = this.Identifier.newKeyword("ENCODE", { ignoreCase: true });
	static ENCODING = this.Identifier.newKeyword("ENCODING", {
		ignoreCase: true,
	});
	static ENCRYPT = this.Identifier.newKeyword("ENCRYPT", { ignoreCase: true });
	static ENCRYPTED = this.Identifier.newKeyword("ENCRYPTED", {
		ignoreCase: true,
	});
	static ENCRYPTION = this.Identifier.newKeyword("ENCRYPTION", {
		ignoreCase: true,
	});
	static ENCRYPTION_KEY_ID = this.Identifier.newKeyword("ENCRYPTION_KEY_ID", {
		ignoreCase: true,
	});
	static END = this.Identifier.newKeyword("END", { ignoreCase: true });
	static ENDPOINT = this.Identifier.newKeyword("ENDPOINT", {
		ignoreCase: true,
	});
	static ENDS = this.Identifier.newKeyword("ENDS", { ignoreCase: true });
	static ENFORCED = this.Identifier.newKeyword("ENFORCED", {
		ignoreCase: true,
	});
	static ENGINE = this.Identifier.newKeyword("ENGINE", { ignoreCase: true });
	static ENGINE_ATTRIBUTE = this.Identifier.newKeyword("ENGINE_ATTRIBUTE", {
		ignoreCase: true,
	});
	static EOMONTH = this.Identifier.newKeyword("EOMONTH", { ignoreCase: true });
	static ENTERPRISE = this.Identifier.newKeyword("ENTERPRISE", {
		ignoreCase: true,
	});
	static ENUM = this.Identifier.newKeyword("ENUM", { ignoreCase: true });
	static ENUM_FIRST = this.Identifier.newKeyword("ENUM_FIRST", {
		ignoreCase: true,
	});
	static ENUM_LAST = this.Identifier.newKeyword("ENUM_LAST", {
		ignoreCase: true,
	});
	static ENUM_RANGE = this.Identifier.newKeyword("ENUM_RANGE", {
		ignoreCase: true,
	});
	static EPOCH = this.Identifier.newKeyword("EPOCH", { ignoreCase: true });
	static ERRCODE = this.Identifier.newKeyword("ERRCODE", { ignoreCase: true });
	static ERRLVL = this.Identifier.newKeyword("ERRLVL", { ignoreCase: true });
	static ERRORS = this.Identifier.newKeyword("ERRORS", { ignoreCase: true });
	static ERROR_CODE = this.Identifier.newKeyword("ERROR_CODE", {
		ignoreCase: true,
	});
	static ERROR_INDEX = this.Identifier.newKeyword("ERROR_INDEX", {
		ignoreCase: true,
	});
	static ESCAPE = this.Identifier.newKeyword("ESCAPE", { ignoreCase: true });
	static ESCAPED = this.Identifier.newKeyword("ESCAPED", { ignoreCase: true });
	static EVALUATE = this.Identifier.newKeyword("EVALUATE", {
		ignoreCase: true,
	});
	static EVENT = this.Identifier.newKeyword("EVENT", { ignoreCase: true });
	static EVENTDATA = this.Identifier.newKeyword("EVENTDATA", {
		ignoreCase: true,
	});
	static EVERY = this.Identifier.newKeyword("EVERY", { ignoreCase: true });
	static EXCEPT = this.Identifier.newKeyword("EXCEPT", { ignoreCase: true });
	static EXCEPTION = this.Identifier.newKeyword("EXCEPTION", {
		ignoreCase: true,
	});
	static EXCEPTIONS = this.Identifier.newKeyword("EXCEPTIONS", {
		ignoreCase: true,
	});
	static EXCEPTION_INIT = this.Identifier.newKeyword("EXCEPTION_INIT", {
		ignoreCase: true,
	});
	static EXCHANGE = this.Identifier.newKeyword("EXCHANGE", {
		ignoreCase: true,
	});
	static EXCLUDE = this.Identifier.newKeyword("EXCLUDE", { ignoreCase: true });
	static EXCLUSIVE = this.Identifier.newKeyword("EXCLUSIVE", {
		ignoreCase: true,
	});
	static EXEC = this.Identifier.newKeyword("EXEC", { ignoreCase: true });
	static EXECUTE = this.Identifier.newKeyword("EXECUTE", { ignoreCase: true });
	static EXISTS = this.Identifier.newKeyword("EXISTS", { ignoreCase: true });
	static EXIT = this.Identifier.newKeyword("EXIT", { ignoreCase: true });
	static EXP = this.Identifier.newKeyword("EXP", { ignoreCase: true });
	static EXPANSION = this.Identifier.newKeyword("EXPANSION", {
		ignoreCase: true,
	});
	static EXPIRE = this.Identifier.newKeyword("EXPIRE", { ignoreCase: true });
	static EXPLAIN = this.Identifier.newKeyword("EXPLAIN", { ignoreCase: true });
	static EXPORT = this.Identifier.newKeyword("EXPORT", { ignoreCase: true });
	static EXPORT_SET = this.Identifier.newKeyword("EXPORT_SET", {
		ignoreCase: true,
	});
	static EXPRESSION = this.Identifier.newKeyword("EXPRESSION", {
		ignoreCase: true,
	});
	static EXTEND = this.Identifier.newKeyword("EXTEND", { ignoreCase: true });
	static EXTENDED = this.Identifier.newKeyword("EXTENDED", {
		ignoreCase: true,
	});
	static EXTENSION = this.Identifier.newKeyword("EXTENSION", {
		ignoreCase: true,
	});
	static EXTENT = this.Identifier.newKeyword("EXTENT", { ignoreCase: true });
	static EXTENT_SIZE = this.Identifier.newKeyword("EXTENT_SIZE", {
		ignoreCase: true,
	});
	static EXTERNAL = this.Identifier.newKeyword("EXTERNAL", {
		ignoreCase: true,
	});
	static EXTERNALLY = this.Identifier.newKeyword("EXTERNALLY", {
		ignoreCase: true,
	});
	static EXTRACT = this.Identifier.newKeyword("EXTRACT", { ignoreCase: true });
	static EXTRACTVALUE = this.Identifier.newKeyword("EXTRACTVALUE", {
		ignoreCase: true,
	});
	static FACT = this.Identifier.newKeyword("FACT", { ignoreCase: true });
	static FACTORIAL = this.Identifier.newKeyword("FACTORIAL", {
		ignoreCase: true,
	});
	static FAIL = this.Identifier.newKeyword("FAIL", { ignoreCase: true });
	static FAILED = this.Identifier.newKeyword("FAILED", { ignoreCase: true });
	static FAILED_LOGIN_ATTEMPTS = this.Identifier.newKeyword(
		"FAILED_LOGIN_ATTEMPTS",
		{
			ignoreCase: true,
		},
	);
	static FAILGROUP = this.Identifier.newKeyword("FAILGROUP", {
		ignoreCase: true,
	});
	static FAILOVER = this.Identifier.newKeyword("FAILOVER", {
		ignoreCase: true,
	});
	static FALSE = this.Identifier.newKeyword("FALSE", { ignoreCase: true });
	static FAMILY = this.Identifier.newKeyword("FAMILY", { ignoreCase: true });
	static FAR = this.Identifier.newKeyword("FAR", { ignoreCase: true });
	static FAST = this.Identifier.newKeyword("FAST", { ignoreCase: true });
	static FEATURE = this.Identifier.newKeyword("FEATURE", { ignoreCase: true });
	static FETCH = this.Identifier.newKeyword("FETCH", { ignoreCase: true });
	static FIELD = this.Identifier.newKeyword("FIELD", { ignoreCase: true });
	static FILE = this.Identifier.newKeyword("FILE", { ignoreCase: true });
	static FILEGROUP = this.Identifier.newKeyword("FILEGROUP", {
		ignoreCase: true,
	});
	static FILESYSTEM_LIKE_LOGGING = this.Identifier.newKeyword(
		"FILESYSTEM_LIKE_LOGGING",
		{
			ignoreCase: true,
		},
	);
	static FILE_BLOCK_SIZE = this.Identifier.newKeyword("FILE_BLOCK_SIZE", {
		ignoreCase: true,
	});
	static FILE_NAME_CONVERT = this.Identifier.newKeyword("FILE_NAME_CONVERT", {
		ignoreCase: true,
	});
	static FILLFACTOR = this.Identifier.newKeyword("FILLFACTOR", {
		ignoreCase: true,
	});
	static FILTER = this.Identifier.newKeyword("FILTER", { ignoreCase: true });
	static FINAL = this.Identifier.newKeyword("FINAL", { ignoreCase: true });
	static FIND_IN_SET = this.Identifier.newKeyword("FIND_IN_SET", {
		ignoreCase: true,
	});
	static FINE = this.Identifier.newKeyword("FINE", { ignoreCase: true });
	static FINISH = this.Identifier.newKeyword("FINISH", { ignoreCase: true });
	static FIRST = this.Identifier.newKeyword("FIRST", { ignoreCase: true });
	static FIRST_VALUE = this.Identifier.newKeyword("FIRST_VALUE", {
		ignoreCase: true,
	});
	static FIXED = this.Identifier.newKeyword("FIXED", { ignoreCase: true });
	static FLASHBACK = this.Identifier.newKeyword("FLASHBACK", {
		ignoreCase: true,
	});
	static FLASH_CACHE = this.Identifier.newKeyword("FLASH_CACHE", {
		ignoreCase: true,
	});
	static FLEX = this.Identifier.newKeyword("FLEX", { ignoreCase: true });
	static FLOAT = this.Identifier.newKeyword("FLOAT", { ignoreCase: true });
	static FLOOR = this.Identifier.newKeyword("FLOOR", { ignoreCase: true });
	static FLUSH = this.Identifier.newKeyword("FLUSH", { ignoreCase: true });
	static FOLLOWING = this.Identifier.newKeyword("FOLLOWING", {
		ignoreCase: true,
	});
	static FOLLOWS = this.Identifier.newKeyword("FOLLOWS", { ignoreCase: true });
	static FOR = this.Identifier.newKeyword("FOR", { ignoreCase: true });
	static FORALL = this.Identifier.newKeyword("FORALL", { ignoreCase: true });
	static FORCE = this.Identifier.newKeyword("FORCE", { ignoreCase: true });
	static FOREIGN = this.Identifier.newKeyword("FOREIGN", { ignoreCase: true });
	static FORMAT = this.Identifier.newKeyword("FORMAT", { ignoreCase: true });
	static FORMAT_BYTES = this.Identifier.newKeyword("FORMAT_BYTES", {
		ignoreCase: true,
	});
	static FORMAT_PICO_TIME = this.Identifier.newKeyword("FORMAT_PICO_TIME", {
		ignoreCase: true,
	});
	static FOUND = this.Identifier.newKeyword("FOUND", { ignoreCase: true });
	static FOUND_ROWS = this.Identifier.newKeyword("FOUND_ROWS", {
		ignoreCase: true,
	});
	static FREEPOOLS = this.Identifier.newKeyword("FREEPOOLS", {
		ignoreCase: true,
	});
	static FREETEXT = this.Identifier.newKeyword("FREETEXT", {
		ignoreCase: true,
	});
	static FREETEXTTABLE = this.Identifier.newKeyword("FREETEXTTABLE", {
		ignoreCase: true,
	});
	static FREEZE = this.Identifier.newKeyword("FREEZE", { ignoreCase: true });
	static FRESH = this.Identifier.newKeyword("FRESH", { ignoreCase: true });
	static FROM = this.Identifier.newKeyword("FROM", { ignoreCase: true });
	static FROM_BASE64 = this.Identifier.newKeyword("FROM_BASE64", {
		ignoreCase: true,
	});
	static FROM_DAYS = this.Identifier.newKeyword("FROM_DAYS", {
		ignoreCase: true,
	});
	static FROM_UNIXTIME = this.Identifier.newKeyword("FROM_UNIXTIME", {
		ignoreCase: true,
	});
	static FULL = this.Identifier.newKeyword("FULL", { ignoreCase: true });
	static FULLTEXT = this.Identifier.newKeyword("FULLTEXT", {
		ignoreCase: true,
	});
	static FUNCTION = this.Identifier.newKeyword("FUNCTION", {
		ignoreCase: true,
	});
	static FUNCTIONS = this.Identifier.newKeyword("FUNCTIONS", {
		ignoreCase: true,
	});
	static G = this.Identifier.newKeyword("G", { ignoreCase: true });
	static GCD = this.Identifier.newKeyword("GCD", { ignoreCase: true });
	static GENERATED = this.Identifier.newKeyword("GENERATED", {
		ignoreCase: true,
	});
	static GENERATE_SERIES = this.Identifier.newKeyword("GENERATE_SERIES", {
		ignoreCase: true,
	});
	static GEN_RANDOM_UUID = this.Identifier.newKeyword("GEN_RANDOM_UUID", {
		ignoreCase: true,
	});
	static GEOGRAPHY = this.Identifier.newKeyword("GEOGRAPHY", {
		ignoreCase: true,
	});
	static GEOMCOLLECTION = this.Identifier.newKeyword("GEOMCOLLECTION", {
		ignoreCase: true,
	});
	static GEOMETRY = this.Identifier.newKeyword("GEOMETRY", {
		ignoreCase: true,
	});
	static GEOMETRYCOLLECTION = this.Identifier.newKeyword("GEOMETRYCOLLECTION", {
		ignoreCase: true,
	});
	static GET = this.Identifier.newKeyword("GET", { ignoreCase: true });
	static GETDATE = this.Identifier.newKeyword("GETDATE", { ignoreCase: true });
	static GETUTCDATE = this.Identifier.newKeyword("GETUTCDATE", {
		ignoreCase: true,
	});
	static GET_BIT = this.Identifier.newKeyword("GET_BIT", { ignoreCase: true });
	static GET_BYTE = this.Identifier.newKeyword("GET_BYTE", {
		ignoreCase: true,
	});
	static GET_CURRENT_TS_CONFIG = this.Identifier.newKeyword(
		"GET_CURRENT_TS_CONFIG",
		{
			ignoreCase: true,
		},
	);
	static GET_FORMAT = this.Identifier.newKeyword("GET_FORMAT", {
		ignoreCase: true,
	});
	static GET_LOCK = this.Identifier.newKeyword("GET_LOCK", {
		ignoreCase: true,
	});
	static GLOB = this.Identifier.newKeyword("GLOB", { ignoreCase: true });
	static GLOBAL = this.Identifier.newKeyword("GLOBAL", { ignoreCase: true });
	static GLOBALLY = this.Identifier.newKeyword("GLOBALLY", {
		ignoreCase: true,
	});
	static GLOBAL_NAME = this.Identifier.newKeyword("GLOBAL_NAME", {
		ignoreCase: true,
	});
	static GLOBAL_TOPIC_ENABLED = this.Identifier.newKeyword(
		"GLOBAL_TOPIC_ENABLED",
		{
			ignoreCase: true,
		},
	);
	static GO = this.Identifier.newKeyword("GO", { ignoreCase: true });
	static GOTO = this.Identifier.newKeyword("GOTO", { ignoreCase: true });
	static GRANT = this.Identifier.newKeyword("GRANT", { ignoreCase: true });
	static GRANTED = this.Identifier.newKeyword("GRANTED", { ignoreCase: true });
	static GREATEST = this.Identifier.newKeyword("GREATEST", {
		ignoreCase: true,
	});
	static GROUP = this.Identifier.newKeyword("GROUP", { ignoreCase: true });
	static GROUPING = this.Identifier.newKeyword("GROUPING", {
		ignoreCase: true,
	});
	static GROUPING_ID = this.Identifier.newKeyword("GROUPING_ID", {
		ignoreCase: true,
	});
	static GROUPS = this.Identifier.newKeyword("GROUPS", { ignoreCase: true });
	static GROUP_CONCAT = this.Identifier.newKeyword("GROUP_CONCAT", {
		ignoreCase: true,
	});
	static GROUP_ID = this.Identifier.newKeyword("GROUP_ID", {
		ignoreCase: true,
	});
	static GTIDS = this.Identifier.newKeyword("GTIDS", { ignoreCase: true });
	static GUARANTEE = this.Identifier.newKeyword("GUARANTEE", {
		ignoreCase: true,
	});
	static GUARD = this.Identifier.newKeyword("GUARD", { ignoreCase: true });
	static H = this.Identifier.newKeyword("H", { ignoreCase: true });
	static HALF_YEARS = this.Identifier.newKeyword("HALF_YEARS", {
		ignoreCase: true,
	});
	static HANDLER = this.Identifier.newKeyword("HANDLER", { ignoreCase: true });
	static HASH = this.Identifier.newKeyword("HASH", { ignoreCase: true });
	static HASHING = this.Identifier.newKeyword("HASHING", { ignoreCase: true });
	static HASHKEYS = this.Identifier.newKeyword("HASHKEYS", {
		ignoreCase: true,
	});
	static HAS_ANY_COLUMN_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_ANY_COLUMN_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_COLUMN_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_COLUMN_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_DATABASE_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_DATABASE_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE",
		{ ignoreCase: true },
	);
	static HAS_FUNCTION_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_FUNCTION_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_LANGUAGE_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_LANGUAGE_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_PARAMETER_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_PARAMETER_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_SCHEMA_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_SCHEMA_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_SEQUENCE_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_SEQUENCE_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_SERVER_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_SERVER_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_TABLESPACE_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_TABLESPACE_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_TABLE_PRIVILEGE = this.Identifier.newKeyword(
		"HAS_TABLE_PRIVILEGE",
		{
			ignoreCase: true,
		},
	);
	static HAS_TYPE_PRIVILEGE = this.Identifier.newKeyword("HAS_TYPE_PRIVILEGE", {
		ignoreCase: true,
	});
	static HAVING = this.Identifier.newKeyword("HAVING", { ignoreCase: true });
	static HEAP = this.Identifier.newKeyword("HEAP", { ignoreCase: true });
	static HEIGHT = this.Identifier.newKeyword("HEIGHT", { ignoreCase: true });
	static HELP = this.Identifier.newKeyword("HELP", { ignoreCase: true });
	static HEX = this.Identifier.newKeyword("HEX", { ignoreCase: true });
	static HIERARCHIES = this.Identifier.newKeyword("HIERARCHIES", {
		ignoreCase: true,
	});
	static HIERARCHY = this.Identifier.newKeyword("HIERARCHY", {
		ignoreCase: true,
	});
	static HIERARCHYID = this.Identifier.newKeyword("HIERARCHYID", {
		ignoreCase: true,
	});
	static HIER_ORDER = this.Identifier.newKeyword("HIER_ORDER", {
		ignoreCase: true,
	});
	static HIGH = this.Identifier.newKeyword("HIGH", { ignoreCase: true });
	static HIGH_PRIORITY = this.Identifier.newKeyword("HIGH_PRIORITY", {
		ignoreCase: true,
	});
	static HINT = this.Identifier.newKeyword("HINT", { ignoreCase: true });
	static HISTORY = this.Identifier.newKeyword("HISTORY", { ignoreCase: true });
	static HOLDLOCK = this.Identifier.newKeyword("HOLDLOCK", {
		ignoreCase: true,
	});
	static HOST = this.Identifier.newKeyword("HOST", { ignoreCase: true });
	static HOSTMASK = this.Identifier.newKeyword("HOSTMASK", {
		ignoreCase: true,
	});
	static HOT = this.Identifier.newKeyword("HOT", { ignoreCase: true });
	static HOUR = this.Identifier.newKeyword("HOUR", { ignoreCase: true });
	static HOURS = this.Identifier.newKeyword("HOURS", { ignoreCase: true });
	static HOUR_MICROSECOND = this.Identifier.newKeyword("HOUR_MICROSECOND", {
		ignoreCase: true,
	});
	static HOUR_MINUTE = this.Identifier.newKeyword("HOUR_MINUTE", {
		ignoreCase: true,
	});
	static HOUR_SECOND = this.Identifier.newKeyword("HOUR_SECOND", {
		ignoreCase: true,
	});
	static HTTP = this.Identifier.newKeyword("HTTP", { ignoreCase: true });
	static HTTPURITYPE = this.Identifier.newKeyword("HTTPURITYPE", {
		ignoreCase: true,
	});
	static IAM_GROUP_NAME = this.Identifier.newKeyword("IAM_GROUP_NAME", {
		ignoreCase: true,
	});
	static IAM_PRINCIPAL_NAME = this.Identifier.newKeyword("IAM_PRINCIPAL_NAME", {
		ignoreCase: true,
	});
	static ICU_VERSION = this.Identifier.newKeyword("ICU_VERSION", {
		ignoreCase: true,
	});
	static ID = this.Identifier.newKeyword("ID", { ignoreCase: true });
	static IDENT_CURRENT = this.Identifier.newKeyword("IDENT_CURRENT", {
		ignoreCase: true,
	});
	static IDENT_INCR = this.Identifier.newKeyword("IDENT_INCR", {
		ignoreCase: true,
	});
	static IDENT_SEED = this.Identifier.newKeyword("IDENT_SEED", {
		ignoreCase: true,
	});
	static IDENTIFIED = this.Identifier.newKeyword("IDENTIFIED", {
		ignoreCase: true,
	});
	static IDENTITY = this.Identifier.newKeyword("IDENTITY", {
		ignoreCase: true,
	});
	static IDENTITYCOL = this.Identifier.newKeyword("IDENTITYCOL", {
		ignoreCase: true,
	});
	static IDENTITY_INSERT = this.Identifier.newKeyword("IDENTITY_INSERT", {
		ignoreCase: true,
	});
	static IDLE_TIME = this.Identifier.newKeyword("IDLE_TIME", {
		ignoreCase: true,
	});
	static IETF_QUOTES = this.Identifier.newKeyword("IETF_QUOTES", {
		ignoreCase: true,
	});
	static IF = this.Identifier.newKeyword("IF", { ignoreCase: true });
	static IFNULL = this.Identifier.newKeyword("IFNULL", { ignoreCase: true });
	static IGNORE = this.Identifier.newKeyword("IGNORE", { ignoreCase: true });
	static IGNORED = this.Identifier.newKeyword("IGNORED", { ignoreCase: true });
	static IIF = this.Identifier.newKeyword("IIF", { ignoreCase: true });
	static ILIKE = this.Identifier.newKeyword("ILIKE", { ignoreCase: true });
	static IMMEDIATE = this.Identifier.newKeyword("IMMEDIATE", {
		ignoreCase: true,
	});
	static IMMUTABLE = this.Identifier.newKeyword("IMMUTABLE", {
		ignoreCase: true,
	});
	static IMPORT = this.Identifier.newKeyword("IMPORT", { ignoreCase: true });
	static IN = this.Identifier.newKeyword("IN", { ignoreCase: true });
	static INACTIVE = this.Identifier.newKeyword("INACTIVE", {
		ignoreCase: true,
	});
	static INACTIVE_ACCOUNT_TIME = this.Identifier.newKeyword(
		"INACTIVE_ACCOUNT_TIME",
		{
			ignoreCase: true,
		},
	);
	static INCLUDE = this.Identifier.newKeyword("INCLUDE", { ignoreCase: true });
	static INCLUDING = this.Identifier.newKeyword("INCLUDING", {
		ignoreCase: true,
	});
	static INCREMENT = this.Identifier.newKeyword("INCREMENT", {
		ignoreCase: true,
	});
	static INDEX = this.Identifier.newKeyword("INDEX", { ignoreCase: true });
	static INDEXED = this.Identifier.newKeyword("INDEXED", { ignoreCase: true });
	static INDEXES = this.Identifier.newKeyword("INDEXES", { ignoreCase: true });
	static INDEXING = this.Identifier.newKeyword("INDEXING", {
		ignoreCase: true,
	});
	static INDEXTYPE = this.Identifier.newKeyword("INDEXTYPE", {
		ignoreCase: true,
	});
	static INDEXTYPES = this.Identifier.newKeyword("INDEXTYPES", {
		ignoreCase: true,
	});
	static INDICATOR = this.Identifier.newKeyword("INDICATOR", {
		ignoreCase: true,
	});
	static INDICES = this.Identifier.newKeyword("INDICES", { ignoreCase: true });
	static INET6_ATON = this.Identifier.newKeyword("INET6_ATON", {
		ignoreCase: true,
	});
	static INET6_NTOA = this.Identifier.newKeyword("INET6_NTOA", {
		ignoreCase: true,
	});
	static INET_ATON = this.Identifier.newKeyword("INET_ATON", {
		ignoreCase: true,
	});
	static INET_CLIENT_ADDR = this.Identifier.newKeyword("INET_CLIENT_ADDR", {
		ignoreCase: true,
	});
	static INET_CLIENT_PORT = this.Identifier.newKeyword("INET_CLIENT_PORT", {
		ignoreCase: true,
	});
	static INET_MERGE = this.Identifier.newKeyword("INET_MERGE", {
		ignoreCase: true,
	});
	static INET_NTOA = this.Identifier.newKeyword("INET_NTOA", {
		ignoreCase: true,
	});
	static INET_SAME_FAMILY = this.Identifier.newKeyword("INET_SAME_FAMILY", {
		ignoreCase: true,
	});
	static INET_SERVER_ADDR = this.Identifier.newKeyword("INET_SERVER_ADDR", {
		ignoreCase: true,
	});
	static INET_SERVER_PORT = this.Identifier.newKeyword("INET_SERVER_PORT", {
		ignoreCase: true,
	});
	static INFILE = this.Identifier.newKeyword("INFILE", { ignoreCase: true });
	static INITCAP = this.Identifier.newKeyword("INITCAP", { ignoreCase: true });
	static INITIAL = this.Identifier.newKeyword("INITIAL", { ignoreCase: true });
	static INITIALIZED = this.Identifier.newKeyword("INITIALIZED", {
		ignoreCase: true,
	});
	static INITIALLY = this.Identifier.newKeyword("INITIALLY", {
		ignoreCase: true,
	});
	static INITIAL_SIZE = this.Identifier.newKeyword("INITIAL_SIZE", {
		ignoreCase: true,
	});
	static INITRANS = this.Identifier.newKeyword("INITRANS", {
		ignoreCase: true,
	});
	static INLINE = this.Identifier.newKeyword("INLINE", { ignoreCase: true });
	static INMEMORY = this.Identifier.newKeyword("INMEMORY", {
		ignoreCase: true,
	});
	static INNER = this.Identifier.newKeyword("INNER", { ignoreCase: true });
	static INOUT = this.Identifier.newKeyword("INOUT", { ignoreCase: true });
	static INPLACE = this.Identifier.newKeyword("INPLACE", { ignoreCase: true });
	static INSTEAD = this.Identifier.newKeyword("INSTEAD", { ignoreCase: true });
	static INSENSITIVE = this.Identifier.newKeyword("INSENSITIVE", {
		ignoreCase: true,
	});
	static INSERT = this.Identifier.newKeyword("INSERT", { ignoreCase: true });
	static INSERTING = this.Identifier.newKeyword("INSERTING", {
		ignoreCase: true,
	});
	static INSERT_METHOD = this.Identifier.newKeyword("INSERT_METHOD", {
		ignoreCase: true,
	});
	static INSTALL = this.Identifier.newKeyword("INSTALL", { ignoreCase: true });
	static INSTANCE = this.Identifier.newKeyword("INSTANCE", {
		ignoreCase: true,
	});
	static INSTANCES = this.Identifier.newKeyword("INSTANCES", {
		ignoreCase: true,
	});
	static INSTANTIABLE = this.Identifier.newKeyword("INSTANTIABLE", {
		ignoreCase: true,
	});
	static INSTR = this.Identifier.newKeyword("INSTR", { ignoreCase: true });
	static INSTR4 = this.Identifier.newKeyword("INSTR4", { ignoreCase: true });
	static INSTRB = this.Identifier.newKeyword("INSTRB", { ignoreCase: true });
	static INT = this.Identifier.newKeyword("INT", { ignoreCase: true });
	static INTEGER = this.Identifier.newKeyword("INTEGER", { ignoreCase: true });
	static INTERLEAVED = this.Identifier.newKeyword("INTERLEAVED", {
		ignoreCase: true,
	});
	static INTERNAL = this.Identifier.newKeyword("INTERNAL", {
		ignoreCase: true,
	});
	static INTERSECT = this.Identifier.newKeyword("INTERSECT", {
		ignoreCase: true,
	});
	static INTERVAL = this.Identifier.newKeyword("INTERVAL", {
		ignoreCase: true,
	});
	static INTO = this.Identifier.newKeyword("INTO", { ignoreCase: true });
	static INVALIDATION = this.Identifier.newKeyword("INVALIDATION", {
		ignoreCase: true,
	});
	static INVISIBLE = this.Identifier.newKeyword("INVISIBLE", {
		ignoreCase: true,
	});
	static INVOKER = this.Identifier.newKeyword("INVOKER", { ignoreCase: true });
	static IO_AFTER_GTIDS = this.Identifier.newKeyword("IO_AFTER_GTIDS", {
		ignoreCase: true,
	});
	static IO_BEFORE_GTIDS = this.Identifier.newKeyword("IO_BEFORE_GTIDS", {
		ignoreCase: true,
	});
	static IS = this.Identifier.newKeyword("IS", { ignoreCase: true });
	static ISCLOSED = this.Identifier.newKeyword("ISCLOSED", {
		ignoreCase: true,
	});
	static ISDATE = this.Identifier.newKeyword("ISDATE", { ignoreCase: true });
	static ISEMPTY = this.Identifier.newKeyword("ISEMPTY", { ignoreCase: true });
	static ISFINITE = this.Identifier.newKeyword("ISFINITE", {
		ignoreCase: true,
	});
	static ISJSON = this.Identifier.newKeyword("ISJSON", { ignoreCase: true });
	static ISNULL = this.Identifier.newKeyword("ISNULL", { ignoreCase: true });
	static ISNUMERIC = this.Identifier.newKeyword("ISNUMERIC", {
		ignoreCase: true,
	});
	static ISODOW = this.Identifier.newKeyword("ISODOW", { ignoreCase: true });
	static ISOLATE = this.Identifier.newKeyword("ISOLATE", { ignoreCase: true });
	static ISOLATION = this.Identifier.newKeyword("ISOLATION", {
		ignoreCase: true,
	});
	static ISOPEN = this.Identifier.newKeyword("ISOPEN", { ignoreCase: true });
	static ISOYEAR = this.Identifier.newKeyword("ISOYEAR", { ignoreCase: true });
	static ISSUER = this.Identifier.newKeyword("ISSUER", { ignoreCase: true });
	static IS_FREE_LOCK = this.Identifier.newKeyword("IS_FREE_LOCK", {
		ignoreCase: true,
	});
	static IS_IPV4 = this.Identifier.newKeyword("IS_IPV4", { ignoreCase: true });
	static IS_IPV4_COMPAT = this.Identifier.newKeyword("IS_IPV4_COMPAT", {
		ignoreCase: true,
	});
	static IS_IPV4_MAPPED = this.Identifier.newKeyword("IS_IPV4_MAPPED", {
		ignoreCase: true,
	});
	static IS_IPV6 = this.Identifier.newKeyword("IS_IPV6", { ignoreCase: true });
	static IS_LEAF = this.Identifier.newKeyword("IS_LEAF", { ignoreCase: true });
	static IS_TEMPLATE = this.Identifier.newKeyword("IS_TEMPLATE", {
		ignoreCase: true,
	});
	static IS_USED_LOCK = this.Identifier.newKeyword("IS_USED_LOCK", {
		ignoreCase: true,
	});
	static IS_UUID = this.Identifier.newKeyword("IS_UUID", { ignoreCase: true });
	static ITERATE = this.Identifier.newKeyword("ITERATE", { ignoreCase: true });
	static JAVA = this.Identifier.newKeyword("JAVA", { ignoreCase: true });
	static JOB = this.Identifier.newKeyword("JOB", { ignoreCase: true });
	static JOIN = this.Identifier.newKeyword("JOIN", { ignoreCase: true });
	static JSON = this.Identifier.newKeyword("JSON", { ignoreCase: true });
	static JSONB_AGG = this.Identifier.newKeyword("JSONB_AGG", {
		ignoreCase: true,
	});
	static JSONB_ARRAY_ELEMENTS = this.Identifier.newKeyword(
		"JSONB_ARRAY_ELEMENTS",
		{
			ignoreCase: true,
		},
	);
	static JSONB_ARRAY_ELEMENTS_TEXT = this.Identifier.newKeyword(
		"JSONB_ARRAY_ELEMENTS_TEXT",
		{
			ignoreCase: true,
		},
	);
	static JSONB_ARRAY_LENGTH = this.Identifier.newKeyword("JSONB_ARRAY_LENGTH", {
		ignoreCase: true,
	});
	static JSONB_BUILD_ARRAY = this.Identifier.newKeyword("JSONB_BUILD_ARRAY", {
		ignoreCase: true,
	});
	static JSONB_BUILD_OBJECT = this.Identifier.newKeyword("JSONB_BUILD_OBJECT", {
		ignoreCase: true,
	});
	static JSONB_EACH = this.Identifier.newKeyword("JSONB_EACH", {
		ignoreCase: true,
	});
	static JSONB_EACH_TEXT = this.Identifier.newKeyword("JSONB_EACH_TEXT", {
		ignoreCase: true,
	});
	static JSONB_EXTRACT_PATH = this.Identifier.newKeyword("JSONB_EXTRACT_PATH", {
		ignoreCase: true,
	});
	static JSONB_EXTRACT_PATH_TEXT = this.Identifier.newKeyword(
		"JSONB_EXTRACT_PATH_TEXT",
		{
			ignoreCase: true,
		},
	);
	static JSONB_INSERT = this.Identifier.newKeyword("JSONB_INSERT", {
		ignoreCase: true,
	});
	static JSONB_OBJECT = this.Identifier.newKeyword("JSONB_OBJECT", {
		ignoreCase: true,
	});
	static JSONB_OBJECT_AGG = this.Identifier.newKeyword("JSONB_OBJECT_AGG", {
		ignoreCase: true,
	});
	static JSONB_OBJECT_KEYS = this.Identifier.newKeyword("JSONB_OBJECT_KEYS", {
		ignoreCase: true,
	});
	static JSONB_PATH_EXISTS = this.Identifier.newKeyword("JSONB_PATH_EXISTS", {
		ignoreCase: true,
	});
	static JSONB_PATH_EXISTS_TZ = this.Identifier.newKeyword(
		"JSONB_PATH_EXISTS_TZ",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PATH_MATCH = this.Identifier.newKeyword("JSONB_PATH_MATCH", {
		ignoreCase: true,
	});
	static JSONB_PATH_MATCH_TZ = this.Identifier.newKeyword(
		"JSONB_PATH_MATCH_TZ",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PATH_QUERY = this.Identifier.newKeyword("JSONB_PATH_QUERY", {
		ignoreCase: true,
	});
	static JSONB_PATH_QUERY_ARRAY = this.Identifier.newKeyword(
		"JSONB_PATH_QUERY_ARRAY",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PATH_QUERY_ARRAY_TZ = this.Identifier.newKeyword(
		"JSONB_PATH_QUERY_ARRAY_TZ",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PATH_QUERY_FIRST = this.Identifier.newKeyword(
		"JSONB_PATH_QUERY_FIRST",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PATH_QUERY_FIRST_TZ = this.Identifier.newKeyword(
		"JSONB_PATH_QUERY_FIRST_TZ",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PATH_QUERY_TZ = this.Identifier.newKeyword(
		"JSONB_PATH_QUERY_TZ",
		{
			ignoreCase: true,
		},
	);
	static JSONB_POPULATE_RECORD = this.Identifier.newKeyword(
		"JSONB_POPULATE_RECORD",
		{
			ignoreCase: true,
		},
	);
	static JSONB_POPULATE_RECORDSET = this.Identifier.newKeyword(
		"JSONB_POPULATE_RECORDSET",
		{
			ignoreCase: true,
		},
	);
	static JSONB_PRETTY = this.Identifier.newKeyword("JSONB_PRETTY", {
		ignoreCase: true,
	});
	static JSONB_SET = this.Identifier.newKeyword("JSONB_SET", {
		ignoreCase: true,
	});
	static JSONB_SET_LAX = this.Identifier.newKeyword("JSONB_SET_LAX", {
		ignoreCase: true,
	});
	static JSONB_STRIP_NULLS = this.Identifier.newKeyword("JSONB_STRIP_NULLS", {
		ignoreCase: true,
	});
	static JSONB_TO_RECORD = this.Identifier.newKeyword("JSONB_TO_RECORD", {
		ignoreCase: true,
	});
	static JSONB_TO_RECORDSET = this.Identifier.newKeyword("JSONB_TO_RECORDSET", {
		ignoreCase: true,
	});
	static JSONB_TO_TSVECTOR = this.Identifier.newKeyword("JSONB_TO_TSVECTOR", {
		ignoreCase: true,
	});
	static JSONB_TYPEOF = this.Identifier.newKeyword("JSONB_TYPEOF", {
		ignoreCase: true,
	});
	static JSON_AGG = this.Identifier.newKeyword("JSON_AGG", {
		ignoreCase: true,
	});
	static JSON_ARRAY = this.Identifier.newKeyword("JSON_ARRAY", {
		ignoreCase: true,
	});
	static JSON_ARRAYAGG = this.Identifier.newKeyword("JSON_ARRAYAGG", {
		ignoreCase: true,
	});
	static JSON_ARRAY_APPEND = this.Identifier.newKeyword("JSON_ARRAY_APPEND", {
		ignoreCase: true,
	});
	static JSON_ARRAY_ELEMENTS = this.Identifier.newKeyword(
		"JSON_ARRAY_ELEMENTS",
		{
			ignoreCase: true,
		},
	);
	static JSON_ARRAY_ELEMENTS_TEXT = this.Identifier.newKeyword(
		"JSON_ARRAY_ELEMENTS_TEXT",
		{
			ignoreCase: true,
		},
	);
	static JSON_ARRAY_INSERT = this.Identifier.newKeyword("JSON_ARRAY_INSERT", {
		ignoreCase: true,
	});
	static JSON_ARRAY_LENGTH = this.Identifier.newKeyword("JSON_ARRAY_LENGTH", {
		ignoreCase: true,
	});
	static JSON_BUILD_ARRAY = this.Identifier.newKeyword("JSON_BUILD_ARRAY", {
		ignoreCase: true,
	});
	static JSON_BUILD_OBJECT = this.Identifier.newKeyword("JSON_BUILD_OBJECT", {
		ignoreCase: true,
	});
	static JSON_CONTAINS = this.Identifier.newKeyword("JSON_CONTAINS", {
		ignoreCase: true,
	});
	static JSON_CONTAINS_PATH = this.Identifier.newKeyword("JSON_CONTAINS_PATH", {
		ignoreCase: true,
	});
	static JSON_DEPTH = this.Identifier.newKeyword("JSON_DEPTH", {
		ignoreCase: true,
	});
	static JSON_EACH = this.Identifier.newKeyword("JSON_EACH", {
		ignoreCase: true,
	});
	static JSON_EACH_TEXT = this.Identifier.newKeyword("JSON_EACH_TEXT", {
		ignoreCase: true,
	});
	static JSON_EXTRACT = this.Identifier.newKeyword("JSON_EXTRACT", {
		ignoreCase: true,
	});
	static JSON_EXTRACT_PATH = this.Identifier.newKeyword("JSON_EXTRACT_PATH", {
		ignoreCase: true,
	});
	static JSON_EXTRACT_PATH_TEXT = this.Identifier.newKeyword(
		"JSON_EXTRACT_PATH_TEXT",
		{
			ignoreCase: true,
		},
	);
	static JSON_GROUP_ARRAY = this.Identifier.newKeyword("JSON_GROUP_ARRAY", {
		ignoreCase: true,
	});
	static JSON_GROUP_OBJECT = this.Identifier.newKeyword("JSON_GROUP_OBJECT", {
		ignoreCase: true,
	});
	static JSON_INSERT = this.Identifier.newKeyword("JSON_INSERT", {
		ignoreCase: true,
	});
	static JSON_KEYS = this.Identifier.newKeyword("JSON_KEYS", {
		ignoreCase: true,
	});
	static JSON_LENGTH = this.Identifier.newKeyword("JSON_LENGTH", {
		ignoreCase: true,
	});
	static JSON_MERGE = this.Identifier.newKeyword("JSON_MERGE", {
		ignoreCase: true,
	});
	static JSON_MERGE_PATCH = this.Identifier.newKeyword("JSON_MERGE_PATCH", {
		ignoreCase: true,
	});
	static JSON_MERGE_PRESERVE = this.Identifier.newKeyword(
		"JSON_MERGE_PRESERVE",
		{
			ignoreCase: true,
		},
	);
	static JSON_MODIFY = this.Identifier.newKeyword("JSON_MODIFY", {
		ignoreCase: true,
	});
	static JSON_OBJECT = this.Identifier.newKeyword("JSON_OBJECT", {
		ignoreCase: true,
	});
	static JSON_OBJECTAGG = this.Identifier.newKeyword("JSON_OBJECTAGG", {
		ignoreCase: true,
	});
	static JSON_OBJECT_AGG = this.Identifier.newKeyword("JSON_OBJECT_AGG", {
		ignoreCase: true,
	});
	static JSON_OBJECT_KEYS = this.Identifier.newKeyword("JSON_OBJECT_KEYS", {
		ignoreCase: true,
	});
	static JSON_OVERLAPS = this.Identifier.newKeyword("JSON_OVERLAPS", {
		ignoreCase: true,
	});
	static JSON_PATCH = this.Identifier.newKeyword("JSON_PATCH", {
		ignoreCase: true,
	});
	static JSON_PATH_EXISTS = this.Identifier.newKeyword("JSON_PATH_EXISTS", {
		ignoreCase: true,
	});
	static JSON_POPULATE_RECORD = this.Identifier.newKeyword(
		"JSON_POPULATE_RECORD",
		{
			ignoreCase: true,
		},
	);
	static JSON_POPULATE_RECORDSET = this.Identifier.newKeyword(
		"JSON_POPULATE_RECORDSET",
		{
			ignoreCase: true,
		},
	);
	static JSON_PRETTY = this.Identifier.newKeyword("JSON_PRETTY", {
		ignoreCase: true,
	});
	static JSON_QUERY = this.Identifier.newKeyword("JSON_QUERY", {
		ignoreCase: true,
	});
	static JSON_QUOTE = this.Identifier.newKeyword("JSON_QUOTE", {
		ignoreCase: true,
	});
	static JSON_REMOVE = this.Identifier.newKeyword("JSON_REMOVE", {
		ignoreCase: true,
	});
	static JSON_REPLACE = this.Identifier.newKeyword("JSON_REPLACE", {
		ignoreCase: true,
	});
	static JSON_SCHEMA_VALID = this.Identifier.newKeyword("JSON_SCHEMA_VALID", {
		ignoreCase: true,
	});
	static JSON_SCHEMA_VALIDATION_REPORT = this.Identifier.newKeyword(
		"JSON_SCHEMA_VALIDATION_REPORT",
		{ ignoreCase: true },
	);
	static JSON_SEARCH = this.Identifier.newKeyword("JSON_SEARCH", {
		ignoreCase: true,
	});
	static JSON_SET = this.Identifier.newKeyword("JSON_SET", {
		ignoreCase: true,
	});
	static JSON_STORAGE_FREE = this.Identifier.newKeyword("JSON_STORAGE_FREE", {
		ignoreCase: true,
	});
	static JSON_STORAGE_SIZE = this.Identifier.newKeyword("JSON_STORAGE_SIZE", {
		ignoreCase: true,
	});
	static JSON_STRIP_NULLS = this.Identifier.newKeyword("JSON_STRIP_NULLS", {
		ignoreCase: true,
	});
	static JSON_TABLE = this.Identifier.newKeyword("JSON_TABLE", {
		ignoreCase: true,
	});
	static JSON_TO_RECORD = this.Identifier.newKeyword("JSON_TO_RECORD", {
		ignoreCase: true,
	});
	static JSON_TO_RECORDSET = this.Identifier.newKeyword("JSON_TO_RECORDSET", {
		ignoreCase: true,
	});
	static JSON_TO_TSVECTOR = this.Identifier.newKeyword("JSON_TO_TSVECTOR", {
		ignoreCase: true,
	});
	static JSON_TREE = this.Identifier.newKeyword("JSON_TREE", {
		ignoreCase: true,
	});
	static JSON_TYPE = this.Identifier.newKeyword("JSON_TYPE", {
		ignoreCase: true,
	});
	static JSON_TYPEOF = this.Identifier.newKeyword("JSON_TYPEOF", {
		ignoreCase: true,
	});
	static JSON_UNQUOTE = this.Identifier.newKeyword("JSON_UNQUOTE", {
		ignoreCase: true,
	});
	static JSON_VALID = this.Identifier.newKeyword("JSON_VALID", {
		ignoreCase: true,
	});
	static JSON_VALUE = this.Identifier.newKeyword("JSON_VALUE", {
		ignoreCase: true,
	});
	static JULIAN = this.Identifier.newKeyword("JULIAN", { ignoreCase: true });
	static JULIANDAY = this.Identifier.newKeyword("JULIANDAY", {
		ignoreCase: true,
	});
	static JUSTIFY_DAYS = this.Identifier.newKeyword("JUSTIFY_DAYS", {
		ignoreCase: true,
	});
	static JUSTIFY_HOURS = this.Identifier.newKeyword("JUSTIFY_HOURS", {
		ignoreCase: true,
	});
	static JUSTIFY_INTERVAL = this.Identifier.newKeyword("JUSTIFY_INTERVAL", {
		ignoreCase: true,
	});
	static KEEP = this.Identifier.newKeyword("KEEP", { ignoreCase: true });
	static KEEP_DUPLICATES = this.Identifier.newKeyword("KEEP_DUPLICATES", {
		ignoreCase: true,
	});
	static KEY = this.Identifier.newKeyword("KEY", { ignoreCase: true });
	static KEYS = this.Identifier.newKeyword("KEYS", { ignoreCase: true });
	static KEYSTORE = this.Identifier.newKeyword("KEYSTORE", {
		ignoreCase: true,
	});
	static KEY_BLOCK_SIZE = this.Identifier.newKeyword("KEY_BLOCK_SIZE", {
		ignoreCase: true,
	});
	static KILL = this.Identifier.newKeyword("KILL", { ignoreCase: true });
	static LABEL = this.Identifier.newKeyword("LABEL", { ignoreCase: true });
	static LAG = this.Identifier.newKeyword("LAG", { ignoreCase: true });
	static LANGUAGE = this.Identifier.newKeyword("LANGUAGE", {
		ignoreCase: true,
	});
	static LARGE = this.Identifier.newKeyword("LARGE", { ignoreCase: true });
	static LAST = this.Identifier.newKeyword("LAST", { ignoreCase: true });
	static LASTVAL = this.Identifier.newKeyword("LASTVAL", { ignoreCase: true });
	static LAST_DAY = this.Identifier.newKeyword("LAST_DAY", {
		ignoreCase: true,
	});
	static LAST_INSERT_ID = this.Identifier.newKeyword("LAST_INSERT_ID", {
		ignoreCase: true,
	});
	static LAST_INSERT_ROWID = this.Identifier.newKeyword("LAST_INSERT_ROWID", {
		ignoreCase: true,
	});
	static LAST_VALUE = this.Identifier.newKeyword("LAST_VALUE", {
		ignoreCase: true,
	});
	static LATERAL = this.Identifier.newKeyword("LATERAL", { ignoreCase: true });
	static LCASE = this.Identifier.newKeyword("LCASE", { ignoreCase: true });
	static LCM = this.Identifier.newKeyword("LCM", { ignoreCase: true });
	static LC_COLLATE = this.Identifier.newKeyword("LC_COLLATE", {
		ignoreCase: true,
	});
	static LC_CTYPE = this.Identifier.newKeyword("LC_CTYPE", {
		ignoreCase: true,
	});
	static LEAD = this.Identifier.newKeyword("LEAD", { ignoreCase: true });
	static LEADING = this.Identifier.newKeyword("LEADING", { ignoreCase: true });
	static LEAD_CDB = this.Identifier.newKeyword("LEAD_CDB", {
		ignoreCase: true,
	});
	static LEAD_CDB_URI = this.Identifier.newKeyword("LEAD_CDB_URI", {
		ignoreCase: true,
	});
	static LEAF = this.Identifier.newKeyword("LEAF", { ignoreCase: true });
	static LEAST = this.Identifier.newKeyword("LEAST", { ignoreCase: true });
	static LEAVE = this.Identifier.newKeyword("LEAVE", { ignoreCase: true });
	static LEFT = this.Identifier.newKeyword("LEFT", { ignoreCase: true });
	static LEN = this.Identifier.newKeyword("LEN", { ignoreCase: true });
	static LENGTH = this.Identifier.newKeyword("LENGTH", { ignoreCase: true });
	static LENGTH4 = this.Identifier.newKeyword("LENGTH4", { ignoreCase: true });
	static LENGTHB = this.Identifier.newKeyword("LENGTHB", { ignoreCase: true });
	static LESS = this.Identifier.newKeyword("LESS", { ignoreCase: true });
	static LEVEL = this.Identifier.newKeyword("LEVEL", { ignoreCase: true });
	static LEVELS = this.Identifier.newKeyword("LEVELS", { ignoreCase: true });
	static LEVEL_NAME = this.Identifier.newKeyword("LEVEL_NAME", {
		ignoreCase: true,
	});
	static LIBRARY = this.Identifier.newKeyword("LIBRARY", { ignoreCase: true });
	static LIKE = this.Identifier.newKeyword("LIKE", { ignoreCase: true });
	static LIKE2 = this.Identifier.newKeyword("LIKE2", { ignoreCase: true });
	static LIKE4 = this.Identifier.newKeyword("LIKE4", { ignoreCase: true });
	static LIKEC = this.Identifier.newKeyword("LIKEC", { ignoreCase: true });
	static LIKELIHOOD = this.Identifier.newKeyword("LIKELIHOOD", {
		ignoreCase: true,
	});
	static LIKELY = this.Identifier.newKeyword("LIKELY", { ignoreCase: true });
	static LIMIT = this.Identifier.newKeyword("LIMIT", { ignoreCase: true });
	static LINE = this.Identifier.newKeyword("LINE", { ignoreCase: true });
	static LINEAR = this.Identifier.newKeyword("LINEAR", { ignoreCase: true });
	static LINENO = this.Identifier.newKeyword("LINENO", { ignoreCase: true });
	static LINES = this.Identifier.newKeyword("LINES", { ignoreCase: true });
	static LINESTRING = this.Identifier.newKeyword("LINESTRING", {
		ignoreCase: true,
	});
	static LINK = this.Identifier.newKeyword("LINK", { ignoreCase: true });
	static LIST = this.Identifier.newKeyword("LIST", { ignoreCase: true });
	static LISTEN = this.Identifier.newKeyword("LISTEN", { ignoreCase: true });
	static LITERAL = this.Identifier.newKeyword("LITERAL", { ignoreCase: true });
	static LN = this.Identifier.newKeyword("LN", { ignoreCase: true });
	static LNNVL = this.Identifier.newKeyword("LNNVL", { ignoreCase: true });
	static LOAD = this.Identifier.newKeyword("LOAD", { ignoreCase: true });
	static LOAD_EXTENSION = this.Identifier.newKeyword("LOAD_EXTENSION", {
		ignoreCase: true,
	});
	static LOAD_FILE = this.Identifier.newKeyword("LOAD_FILE", {
		ignoreCase: true,
	});
	static LOB = this.Identifier.newKeyword("LOB", { ignoreCase: true });
	static LOBS = this.Identifier.newKeyword("LOBS", { ignoreCase: true });
	static LOCAL = this.Identifier.newKeyword("LOCAL", { ignoreCase: true });
	static LOCALTIME = this.Identifier.newKeyword("LOCALTIME", {
		ignoreCase: true,
	});
	static LOCALTIMESTAMP = this.Identifier.newKeyword("LOCALTIMESTAMP", {
		ignoreCase: true,
	});
	static LOCATE = this.Identifier.newKeyword("LOCATE", { ignoreCase: true });
	static LOCATION = this.Identifier.newKeyword("LOCATION", {
		ignoreCase: true,
	});
	static LOCATOR = this.Identifier.newKeyword("LOCATOR", { ignoreCase: true });
	static LOCK = this.Identifier.newKeyword("LOCK", { ignoreCase: true });
	static LOCKDOWN = this.Identifier.newKeyword("LOCKDOWN", {
		ignoreCase: true,
	});
	static LOCKED = this.Identifier.newKeyword("LOCKED", { ignoreCase: true });
	static LOCKING = this.Identifier.newKeyword("LOCKING", { ignoreCase: true });
	static LOG = this.Identifier.newKeyword("LOG", { ignoreCase: true });
	static LOG10 = this.Identifier.newKeyword("LOG10", { ignoreCase: true });
	static LOG2 = this.Identifier.newKeyword("LOG2", { ignoreCase: true });
	static LOGFILE = this.Identifier.newKeyword("LOGFILE", { ignoreCase: true });
	static LOGFILES = this.Identifier.newKeyword("LOGFILES", {
		ignoreCase: true,
	});
	static LOGGING = this.Identifier.newKeyword("LOGGING", { ignoreCase: true });
	static LOGICAL = this.Identifier.newKeyword("LOGICAL", { ignoreCase: true });
	static LOGICAL_READS_PER_CALL = this.Identifier.newKeyword(
		"LOGICAL_READS_PER_CALL",
		{
			ignoreCase: true,
		},
	);
	static LOGICAL_READS_PER_SESSION = this.Identifier.newKeyword(
		"LOGICAL_READS_PER_SESSION",
		{
			ignoreCase: true,
		},
	);
	static LOGIN = this.Identifier.newKeyword("LOGIN", { ignoreCase: true });
	static LOGS = this.Identifier.newKeyword("LOGS", { ignoreCase: true });
	static LONG = this.Identifier.newKeyword("LONG", { ignoreCase: true });
	static LONGBLOB = this.Identifier.newKeyword("LONGBLOB", {
		ignoreCase: true,
	});
	static LONGTEXT = this.Identifier.newKeyword("LONGTEXT", {
		ignoreCase: true,
	});
	static LOOP = this.Identifier.newKeyword("LOOP", { ignoreCase: true });
	static LOST = this.Identifier.newKeyword("LOST", { ignoreCase: true });
	static LOW = this.Identifier.newKeyword("LOW", { ignoreCase: true });
	static LOWER = this.Identifier.newKeyword("LOWER", { ignoreCase: true });
	static LOWER_INC = this.Identifier.newKeyword("LOWER_INC", {
		ignoreCase: true,
	});
	static LOWER_INF = this.Identifier.newKeyword("LOWER_INF", {
		ignoreCase: true,
	});
	static LOW_PRIORITY = this.Identifier.newKeyword("LOW_PRIORITY", {
		ignoreCase: true,
	});
	static LPAD = this.Identifier.newKeyword("LPAD", { ignoreCase: true });
	static LSEG = this.Identifier.newKeyword("LSEG", { ignoreCase: true });
	static LTRIM = this.Identifier.newKeyword("LTRIM", { ignoreCase: true });
	static M = this.Identifier.newKeyword("M", { ignoreCase: true });
	static MACADDR8_SET7BIT = this.Identifier.newKeyword("MACADDR8_SET7BIT", {
		ignoreCase: true,
	});
	static MAIN = this.Identifier.newKeyword("MAIN", { ignoreCase: true });
	static MAKEACLITEM = this.Identifier.newKeyword("MAKEACLITEM", {
		ignoreCase: true,
	});
	static MAKEDATE = this.Identifier.newKeyword("MAKEDATE", {
		ignoreCase: true,
	});
	static MAKETIME = this.Identifier.newKeyword("MAKETIME", {
		ignoreCase: true,
	});
	static MAKE_DATE = this.Identifier.newKeyword("MAKE_DATE", {
		ignoreCase: true,
	});
	static MAKE_INTERVAL = this.Identifier.newKeyword("MAKE_INTERVAL", {
		ignoreCase: true,
	});
	static MAKE_SET = this.Identifier.newKeyword("MAKE_SET", {
		ignoreCase: true,
	});
	static MAKE_TIME = this.Identifier.newKeyword("MAKE_TIME", {
		ignoreCase: true,
	});
	static MAKE_TIMESTAMP = this.Identifier.newKeyword("MAKE_TIMESTAMP", {
		ignoreCase: true,
	});
	static MAKE_TIMESTAMPTZ = this.Identifier.newKeyword("MAKE_TIMESTAMPTZ", {
		ignoreCase: true,
	});
	static MANAGED = this.Identifier.newKeyword("MANAGED", { ignoreCase: true });
	static MANAGEMENT = this.Identifier.newKeyword("MANAGEMENT", {
		ignoreCase: true,
	});
	static MANUAL = this.Identifier.newKeyword("MANUAL", { ignoreCase: true });
	static MAP = this.Identifier.newKeyword("MAP", { ignoreCase: true });
	static MAPPING = this.Identifier.newKeyword("MAPPING", { ignoreCase: true });
	static MASKLEN = this.Identifier.newKeyword("MASKLEN", { ignoreCase: true });
	static MASTER = this.Identifier.newKeyword("MASTER", { ignoreCase: true });
	static MASTER_BIND = this.Identifier.newKeyword("MASTER_BIND", {
		ignoreCase: true,
	});
	static MASTER_POS_WAIT = this.Identifier.newKeyword("MASTER_POS_WAIT", {
		ignoreCase: true,
	});
	static MASTER_SERVER_ID = this.Identifier.newKeyword("MASTER_SERVER_ID", {
		ignoreCase: true,
	});
	static MASTER_SSL_VERIFY_SERVER_CERT = this.Identifier.newKeyword(
		"MASTER_SSL_VERIFY_SERVER_CERT",
		{ ignoreCase: true },
	);
	static MATCH = this.Identifier.newKeyword("MATCH", { ignoreCase: true });
	static MATCHED = this.Identifier.newKeyword("MATCHED", { ignoreCase: true });
	static MATCH_NUMBER = this.Identifier.newKeyword("MATCH_NUMBER", {
		ignoreCase: true,
	});
	static MATCH_RECOGNIZE = this.Identifier.newKeyword("MATCH_RECOGNIZE", {
		ignoreCase: true,
	});
	static MATERIALIZED = this.Identifier.newKeyword("MATERIALIZED", {
		ignoreCase: true,
	});
	static MAX = this.Identifier.newKeyword("MAX", { ignoreCase: true });
	static MAXDATAFILES = this.Identifier.newKeyword("MAXDATAFILES", {
		ignoreCase: true,
	});
	static MAXEXTENTS = this.Identifier.newKeyword("MAXEXTENTS", {
		ignoreCase: true,
	});
	static MAXIMIZE = this.Identifier.newKeyword("MAXIMIZE", {
		ignoreCase: true,
	});
	static MAXINSTANCES = this.Identifier.newKeyword("MAXINSTANCES", {
		ignoreCase: true,
	});
	static MAXLEN = this.Identifier.newKeyword("MAXLEN", { ignoreCase: true });
	static MAXLOGFILES = this.Identifier.newKeyword("MAXLOGFILES", {
		ignoreCase: true,
	});
	static MAXLOGHISTORY = this.Identifier.newKeyword("MAXLOGHISTORY", {
		ignoreCase: true,
	});
	static MAXLOGMEMBERS = this.Identifier.newKeyword("MAXLOGMEMBERS", {
		ignoreCase: true,
	});
	static MAXSIZE = this.Identifier.newKeyword("MAXSIZE", { ignoreCase: true });
	static MAXVALUE = this.Identifier.newKeyword("MAXVALUE", {
		ignoreCase: true,
	});
	static MAX_AUDIT_SIZE = this.Identifier.newKeyword("MAX_AUDIT_SIZE", {
		ignoreCase: true,
	});
	static MAX_CONNECTIONS_PER_HOUR = this.Identifier.newKeyword(
		"MAX_CONNECTIONS_PER_HOUR",
		{
			ignoreCase: true,
		},
	);
	static MAX_DIAG_SIZE = this.Identifier.newKeyword("MAX_DIAG_SIZE", {
		ignoreCase: true,
	});
	static MAX_QUERIES_PER_HOUR = this.Identifier.newKeyword(
		"MAX_QUERIES_PER_HOUR",
		{
			ignoreCase: true,
		},
	);
	static MAX_ROWS = this.Identifier.newKeyword("MAX_ROWS", {
		ignoreCase: true,
	});
	static MAX_SIZE = this.Identifier.newKeyword("MAX_SIZE", {
		ignoreCase: true,
	});
	static MAX_UPDATES_PER_HOUR = this.Identifier.newKeyword(
		"MAX_UPDATES_PER_HOUR",
		{
			ignoreCase: true,
		},
	);
	static MAX_USER_CONNECTIONS = this.Identifier.newKeyword(
		"MAX_USER_CONNECTIONS",
		{
			ignoreCase: true,
		},
	);
	static MBRCONTAINS = this.Identifier.newKeyword("MBRCONTAINS", {
		ignoreCase: true,
	});
	static MBRCOVEREDBY = this.Identifier.newKeyword("MBRCOVEREDBY", {
		ignoreCase: true,
	});
	static MBRCOVERS = this.Identifier.newKeyword("MBRCOVERS", {
		ignoreCase: true,
	});
	static MBRDISJOINT = this.Identifier.newKeyword("MBRDISJOINT", {
		ignoreCase: true,
	});
	static MBREQUALS = this.Identifier.newKeyword("MBREQUALS", {
		ignoreCase: true,
	});
	static MBRINTERSECTS = this.Identifier.newKeyword("MBRINTERSECTS", {
		ignoreCase: true,
	});
	static MBROVERLAPS = this.Identifier.newKeyword("MBROVERLAPS", {
		ignoreCase: true,
	});
	static MBRTOUCHES = this.Identifier.newKeyword("MBRTOUCHES", {
		ignoreCase: true,
	});
	static MBRWITHIN = this.Identifier.newKeyword("MBRWITHIN", {
		ignoreCase: true,
	});
	static MD5 = this.Identifier.newKeyword("MD5", { ignoreCase: true });
	static MEASURE = this.Identifier.newKeyword("MEASURE", { ignoreCase: true });
	static MEASURES = this.Identifier.newKeyword("MEASURES", {
		ignoreCase: true,
	});
	static MEDIUM = this.Identifier.newKeyword("MEDIUM", { ignoreCase: true });
	static MEDIUMBLOB = this.Identifier.newKeyword("MEDIUMBLOB", {
		ignoreCase: true,
	});
	static MEDIUMINT = this.Identifier.newKeyword("MEDIUMINT", {
		ignoreCase: true,
	});
	static MEDIUMTEXT = this.Identifier.newKeyword("MEDIUMTEXT", {
		ignoreCase: true,
	});
	static MEMBER = this.Identifier.newKeyword("MEMBER", { ignoreCase: true });
	static MEMBER_CAPTION = this.Identifier.newKeyword("MEMBER_CAPTION", {
		ignoreCase: true,
	});
	static MEMBER_DESCRIPTION = this.Identifier.newKeyword("MEMBER_DESCRIPTION", {
		ignoreCase: true,
	});
	static MEMBER_NAME = this.Identifier.newKeyword("MEMBER_NAME", {
		ignoreCase: true,
	});
	static MEMBER_OF = this.Identifier.newKeyword("MEMBER_OF", {
		ignoreCase: true,
	});
	static MEMBER_UNIQUE_NAME = this.Identifier.newKeyword("MEMBER_UNIQUE_NAME", {
		ignoreCase: true,
	});
	static MEMCOMPRESS = this.Identifier.newKeyword("MEMCOMPRESS", {
		ignoreCase: true,
	});
	static MEMOPTIMIZE = this.Identifier.newKeyword("MEMOPTIMIZE", {
		ignoreCase: true,
	});
	static MEMORY = this.Identifier.newKeyword("MEMORY", { ignoreCase: true });
	static MERGE = this.Identifier.newKeyword("MERGE", { ignoreCase: true });
	static MESSAGE = this.Identifier.newKeyword("MESSAGE", { ignoreCase: true });
	static METADATA = this.Identifier.newKeyword("METADATA", {
		ignoreCase: true,
	});
	static METHOD = this.Identifier.newKeyword("METHOD", { ignoreCase: true });
	static MICROSECOND = this.Identifier.newKeyword("MICROSECOND", {
		ignoreCase: true,
	});
	static MICROSECONDS = this.Identifier.newKeyword("MICROSECONDS", {
		ignoreCase: true,
	});
	static MID = this.Identifier.newKeyword("MID", { ignoreCase: true });
	static MIDDLEINT = this.Identifier.newKeyword("MIDDLEINT", {
		ignoreCase: true,
	});
	static MIGRATE = this.Identifier.newKeyword("MIGRATE", { ignoreCase: true });
	static MIGRATION = this.Identifier.newKeyword("MIGRATION", {
		ignoreCase: true,
	});
	static MILLENNIUM = this.Identifier.newKeyword("MILLENNIUM", {
		ignoreCase: true,
	});
	static MILLISECONDS = this.Identifier.newKeyword("MILLISECONDS", {
		ignoreCase: true,
	});
	static MIN = this.Identifier.newKeyword("MIN", { ignoreCase: true });
	static MINIMUM = this.Identifier.newKeyword("MINIMUM", { ignoreCase: true });
	static MINING = this.Identifier.newKeyword("MINING", { ignoreCase: true });
	static MINUS = this.Identifier.newKeyword("MINUS", { ignoreCase: true });
	static MINUTE = this.Identifier.newKeyword("MINUTE", { ignoreCase: true });
	static MINUTES = this.Identifier.newKeyword("MINUTES", { ignoreCase: true });
	static MINUTE_MICROSECOND = this.Identifier.newKeyword("MINUTE_MICROSECOND", {
		ignoreCase: true,
	});
	static MINUTE_SECOND = this.Identifier.newKeyword("MINUTE_SECOND", {
		ignoreCase: true,
	});
	static MINVALUE = this.Identifier.newKeyword("MINVALUE", {
		ignoreCase: true,
	});
	static MIN_ROWS = this.Identifier.newKeyword("MIN_ROWS", {
		ignoreCase: true,
	});
	static MIN_SCALE = this.Identifier.newKeyword("MIN_SCALE", {
		ignoreCase: true,
	});
	static MIRROR = this.Identifier.newKeyword("MIRROR", { ignoreCase: true });
	static MIRRORCOLD = this.Identifier.newKeyword("MIRRORCOLD", {
		ignoreCase: true,
	});
	static MIRRORHOT = this.Identifier.newKeyword("MIRRORHOT", {
		ignoreCase: true,
	});
	static MLSLABEL = this.Identifier.newKeyword("MLSLABEL", {
		ignoreCase: true,
	});
	static MOD = this.Identifier.newKeyword("MOD", { ignoreCase: true });
	static MODE = this.Identifier.newKeyword("MODE", { ignoreCase: true });
	static MODEL = this.Identifier.newKeyword("MODEL", { ignoreCase: true });
	static MODIFICATION = this.Identifier.newKeyword("MODIFICATION", {
		ignoreCase: true,
	});
	static MODIFIES = this.Identifier.newKeyword("MODIFIES", {
		ignoreCase: true,
	});
	static MODIFY = this.Identifier.newKeyword("MODIFY", { ignoreCase: true });
	static MONEY = this.Identifier.newKeyword("MONEY", { ignoreCase: true });
	static MONITORING = this.Identifier.newKeyword("MONITORING", {
		ignoreCase: true,
	});
	static MONTH = this.Identifier.newKeyword("MONTH", { ignoreCase: true });
	static MONTHNAME = this.Identifier.newKeyword("MONTHNAME", {
		ignoreCase: true,
	});
	static MONTHS = this.Identifier.newKeyword("MONTHS", { ignoreCase: true });
	static MONTHS_BETWEEN = this.Identifier.newKeyword("MONTHS_BETWEEN", {
		ignoreCase: true,
	});
	static MOUNT = this.Identifier.newKeyword("MOUNT", { ignoreCase: true });
	static MOUNTPATH = this.Identifier.newKeyword("MOUNTPATH", {
		ignoreCase: true,
	});
	static MOVE = this.Identifier.newKeyword("MOVE", { ignoreCase: true });
	static MOVEMENT = this.Identifier.newKeyword("MOVEMENT", {
		ignoreCase: true,
	});
	static MULTILINESTRING = this.Identifier.newKeyword("MULTILINESTRING", {
		ignoreCase: true,
	});
	static MULTIPOINT = this.Identifier.newKeyword("MULTIPOINT", {
		ignoreCase: true,
	});
	static MULTIPOLYGON = this.Identifier.newKeyword("MULTIPOLYGON", {
		ignoreCase: true,
	});
	static MULTIRANGE = this.Identifier.newKeyword("MULTIRANGE", {
		ignoreCase: true,
	});
	static NAME = this.Identifier.newKeyword("NAME", { ignoreCase: true });
	static NAMED = this.Identifier.newKeyword("NAMED", { ignoreCase: true });
	static NAMES = this.Identifier.newKeyword("NAMES", { ignoreCase: true });
	static NAMESPACE = this.Identifier.newKeyword("NAMESPACE", {
		ignoreCase: true,
	});
	static NAME_CONST = this.Identifier.newKeyword("NAME_CONST", {
		ignoreCase: true,
	});
	static NATIONAL = this.Identifier.newKeyword("NATIONAL", {
		ignoreCase: true,
	});
	static NATURAL = this.Identifier.newKeyword("NATURAL", { ignoreCase: true });
	static NATURALN = this.Identifier.newKeyword("NATURALN", {
		ignoreCase: true,
	});
	static NAV = this.Identifier.newKeyword("NAV", { ignoreCase: true });
	static NCHAR = this.Identifier.newKeyword("NCHAR", { ignoreCase: true });
	static NCHR = this.Identifier.newKeyword("NCHR", { ignoreCase: true });
	static NESTED = this.Identifier.newKeyword("NESTED", { ignoreCase: true });
	static NESTED_TABLE_ID = this.Identifier.newKeyword("NESTED_TABLE_ID", {
		ignoreCase: true,
	});
	static NETMASK = this.Identifier.newKeyword("NETMASK", { ignoreCase: true });
	static NETWORK = this.Identifier.newKeyword("NETWORK", { ignoreCase: true });
	static NEVER = this.Identifier.newKeyword("NEVER", { ignoreCase: true });
	static NEW = this.Identifier.newKeyword("NEW", { ignoreCase: true });
	static NEXT = this.Identifier.newKeyword("NEXT", { ignoreCase: true });
	static NEXTVAL = this.Identifier.newKeyword("NEXTVAL", { ignoreCase: true });
	static NFC = this.Identifier.newKeyword("NFC", { ignoreCase: true });
	static NFD = this.Identifier.newKeyword("NFD", { ignoreCase: true });
	static NFKC = this.Identifier.newKeyword("NFKC", { ignoreCase: true });
	static NFKD = this.Identifier.newKeyword("NFKD", { ignoreCase: true });
	static NLSSORT = this.Identifier.newKeyword("NLSSORT", { ignoreCase: true });
	static NLS_CHARSET_ID = this.Identifier.newKeyword("NLS_CHARSET_ID", {
		ignoreCase: true,
	});
	static NLS_CHARSET_NAME = this.Identifier.newKeyword("NLS_CHARSET_NAME", {
		ignoreCase: true,
	});
	static NO = this.Identifier.newKeyword("NO", { ignoreCase: true });
	static NOARCHIVELOG = this.Identifier.newKeyword("NOARCHIVELOG", {
		ignoreCase: true,
	});
	static NOAUDIT = this.Identifier.newKeyword("NOAUDIT", { ignoreCase: true });
	static NOCACHE = this.Identifier.newKeyword("NOCACHE", { ignoreCase: true });
	static NOCASE = this.Identifier.newKeyword("NOCASE", { ignoreCase: true });
	static NOCHECK = this.Identifier.newKeyword("NOCHECK", { ignoreCase: true });
	static NOCOMPRESS = this.Identifier.newKeyword("NOCOMPRESS", {
		ignoreCase: true,
	});
	static NOCOPY = this.Identifier.newKeyword("NOCOPY", { ignoreCase: true });
	static NOCYCLE = this.Identifier.newKeyword("NOCYCLE", { ignoreCase: true });
	static NODEGROUP = this.Identifier.newKeyword("NODEGROUP", {
		ignoreCase: true,
	});
	static NODELAY = this.Identifier.newKeyword("NODELAY", { ignoreCase: true });
	static NOFORCE = this.Identifier.newKeyword("NOFORCE", { ignoreCase: true });
	static NOGUARANTEE = this.Identifier.newKeyword("NOGUARANTEE", {
		ignoreCase: true,
	});
	static NOKEEP = this.Identifier.newKeyword("NOKEEP", { ignoreCase: true });
	static NOMAPPING = this.Identifier.newKeyword("NOMAPPING", {
		ignoreCase: true,
	});
	static NOMAXVALUE = this.Identifier.newKeyword("NOMAXVALUE", {
		ignoreCase: true,
	});
	static NOMINVALUE = this.Identifier.newKeyword("NOMINVALUE", {
		ignoreCase: true,
	});
	static NOMONITORING = this.Identifier.newKeyword("NOMONITORING", {
		ignoreCase: true,
	});
	static NON = this.Identifier.newKeyword("NON", { ignoreCase: true });
	static NONCLUSTERED = this.Identifier.newKeyword("NONCLUSTERED", {
		ignoreCase: true,
	});
	static NONE = this.Identifier.newKeyword("NONE", { ignoreCase: true });
	static NONEDITIONABLE = this.Identifier.newKeyword("NONEDITIONABLE", {
		ignoreCase: true,
	});
	static NONSCHEMA = this.Identifier.newKeyword("NONSCHEMA", {
		ignoreCase: true,
	});
	static NOORDER = this.Identifier.newKeyword("NOORDER", { ignoreCase: true });
	static NOPARALLEL = this.Identifier.newKeyword("NOPARALLEL", {
		ignoreCase: true,
	});
	static NORELOCATE = this.Identifier.newKeyword("NORELOCATE", {
		ignoreCase: true,
	});
	static NORELY = this.Identifier.newKeyword("NORELY", { ignoreCase: true });
	static NOREPAIR = this.Identifier.newKeyword("NOREPAIR", {
		ignoreCase: true,
	});
	static NOREPLY = this.Identifier.newKeyword("NOREPLY", { ignoreCase: true });
	static NORESETLOGS = this.Identifier.newKeyword("NORESETLOGS", {
		ignoreCase: true,
	});
	static NOREVERSE = this.Identifier.newKeyword("NOREVERSE", {
		ignoreCase: true,
	});
	static NORMAL = this.Identifier.newKeyword("NORMAL", { ignoreCase: true });
	static NORMALIZED = this.Identifier.newKeyword("NORMALIZED", {
		ignoreCase: true,
	});
	static NOROWDEPENDENCIES = this.Identifier.newKeyword("NOROWDEPENDENCIES", {
		ignoreCase: true,
	});
	static NOSCALE = this.Identifier.newKeyword("NOSCALE", { ignoreCase: true });
	static NOSHARED = this.Identifier.newKeyword("NOSHARED", {
		ignoreCase: true,
	});
	static NOSORT = this.Identifier.newKeyword("NOSORT", { ignoreCase: true });
	static NOSWITCH = this.Identifier.newKeyword("NOSWITCH", {
		ignoreCase: true,
	});
	static NOT = this.Identifier.newKeyword("NOT", { ignoreCase: true });
	static NOTFOUND = this.Identifier.newKeyword("NOTFOUND", {
		ignoreCase: true,
	});
	static NOTHING = this.Identifier.newKeyword("NOTHING", { ignoreCase: true });
	static NOTIFY = this.Identifier.newKeyword("NOTIFY", { ignoreCase: true });
	static NOTIFICATION = this.Identifier.newKeyword("NOTIFICATION", {
		ignoreCase: true,
	});
	static NOTNULL = this.Identifier.newKeyword("NOTNULL", { ignoreCase: true });
	static NOT_FEASIBLE = this.Identifier.newKeyword("NOT_FEASIBLE", {
		ignoreCase: true,
	});
	static NOT_FEASIBLE_END = this.Identifier.newKeyword("NOT_FEASIBLE_END", {
		ignoreCase: true,
	});
	static NOT_FEASIBLE_START = this.Identifier.newKeyword("NOT_FEASIBLE_START", {
		ignoreCase: true,
	});
	static NOVALIDATE = this.Identifier.newKeyword("NOVALIDATE", {
		ignoreCase: true,
	});
	static NOW = this.Identifier.newKeyword("NOW", { ignoreCase: true });
	static NOWAIT = this.Identifier.newKeyword("NOWAIT", { ignoreCase: true });
	static NO_WRITE_TO_BINLOG = this.Identifier.newKeyword("NO_WRITE_TO_BINLOG", {
		ignoreCase: true,
	});
	static NPOINTS = this.Identifier.newKeyword("NPOINTS", { ignoreCase: true });
	static NTH_VALUE = this.Identifier.newKeyword("NTH_VALUE", {
		ignoreCase: true,
	});
	static NTILE = this.Identifier.newKeyword("NTILE", { ignoreCase: true });
	static NULL = this.Identifier.newKeyword("NULL", { ignoreCase: true });
	static NULLIF = this.Identifier.newKeyword("NULLIF", { ignoreCase: true });
	static NULLS = this.Identifier.newKeyword("NULLS", { ignoreCase: true });
	static NUMBER = this.Identifier.newKeyword("NUMBER", { ignoreCase: true });
	static NUMERIC = this.Identifier.newKeyword("NUMERIC", { ignoreCase: true });
	static NUMNODE = this.Identifier.newKeyword("NUMNODE", { ignoreCase: true });
	static NUMTODSINTERVAL = this.Identifier.newKeyword("NUMTODSINTERVAL", {
		ignoreCase: true,
	});
	static NUMTOYMINTERVAL = this.Identifier.newKeyword("NUMTOYMINTERVAL", {
		ignoreCase: true,
	});
	static NUM_NONNULLS = this.Identifier.newKeyword("NUM_NONNULLS", {
		ignoreCase: true,
	});
	static NUM_NULLS = this.Identifier.newKeyword("NUM_NULLS", {
		ignoreCase: true,
	});
	static NVARCHAR = this.Identifier.newKeyword("NVARCHAR", {
		ignoreCase: true,
	});
	static NVARCHAR2 = this.Identifier.newKeyword("NVARCHAR2", {
		ignoreCase: true,
	});
	static NVL = this.Identifier.newKeyword("NVL", { ignoreCase: true });
	static NVL2 = this.Identifier.newKeyword("NVL2", { ignoreCase: true });
	static OBJECT = this.Identifier.newKeyword("OBJECT", { ignoreCase: true });
	static OBJECT_ID = this.Identifier.newKeyword("OBJECT_ID", {
		ignoreCase: true,
	});
	static OBJECT_VALUE = this.Identifier.newKeyword("OBJECT_VALUE", {
		ignoreCase: true,
	});
	static OCT = this.Identifier.newKeyword("OCT", { ignoreCase: true });
	static OCTET_LENGTH = this.Identifier.newKeyword("OCTET_LENGTH", {
		ignoreCase: true,
	});
	static OF = this.Identifier.newKeyword("OF", { ignoreCase: true });
	static OFF = this.Identifier.newKeyword("OFF", { ignoreCase: true });
	static OFFLINE = this.Identifier.newKeyword("OFFLINE", { ignoreCase: true });
	static OFFSET = this.Identifier.newKeyword("OFFSET", { ignoreCase: true });
	static OFFSETS = this.Identifier.newKeyword("OFFSETS", { ignoreCase: true });
	static OID = this.Identifier.newKeyword("OID", { ignoreCase: true });
	static OIDINDEX = this.Identifier.newKeyword("OIDINDEX", {
		ignoreCase: true,
	});
	static OLD = this.Identifier.newKeyword("OLD", { ignoreCase: true });
	static OLTP = this.Identifier.newKeyword("OLTP", { ignoreCase: true });
	static ON = this.Identifier.newKeyword("ON", { ignoreCase: true });
	static ONE = this.Identifier.newKeyword("ONE", { ignoreCase: true });
	static ONLINE = this.Identifier.newKeyword("ONLINE", { ignoreCase: true });
	static ONLY = this.Identifier.newKeyword("ONLY", { ignoreCase: true });
	static OPAQUE = this.Identifier.newKeyword("OPAQUE", { ignoreCase: true });
	static OPEN = this.Identifier.newKeyword("OPEN", { ignoreCase: true });
	static OPENDATASOURCE = this.Identifier.newKeyword("OPENDATASOURCE", {
		ignoreCase: true,
	});
	static OPENJSON = this.Identifier.newKeyword("OPENJSON", {
		ignoreCase: true,
	});
	static OPENQUERY = this.Identifier.newKeyword("OPENQUERY", {
		ignoreCase: true,
	});
	static OPENROWSET = this.Identifier.newKeyword("OPENROWSET", {
		ignoreCase: true,
	});
	static OPENXML = this.Identifier.newKeyword("OPENXML", { ignoreCase: true });
	static OPERATOR = this.Identifier.newKeyword("OPERATOR", {
		ignoreCase: true,
	});
	static OPTIMIZE = this.Identifier.newKeyword("OPTIMIZE", {
		ignoreCase: true,
	});
	static OPTIMIZER_COSTS = this.Identifier.newKeyword("OPTIMIZER_COSTS", {
		ignoreCase: true,
	});
	static OPTION = this.Identifier.newKeyword("OPTION", { ignoreCase: true });
	static OPTIONAL = this.Identifier.newKeyword("OPTIONAL", {
		ignoreCase: true,
	});
	static OPTIONALLY = this.Identifier.newKeyword("OPTIONALLY", {
		ignoreCase: true,
	});
	static OPTIONS = this.Identifier.newKeyword("OPTIONS", { ignoreCase: true });
	static OR = this.Identifier.newKeyword("OR", { ignoreCase: true });
	static ORA_ROWSCN = this.Identifier.newKeyword("ORA_ROWSCN", {
		ignoreCase: true,
	});
	static ORD = this.Identifier.newKeyword("ORD", { ignoreCase: true });
	static ORDAUDIO = this.Identifier.newKeyword("ORDAUDIO", {
		ignoreCase: true,
	});
	static ORDDICOM = this.Identifier.newKeyword("ORDDICOM", {
		ignoreCase: true,
	});
	static ORDDOC = this.Identifier.newKeyword("ORDDOC", { ignoreCase: true });
	static ORDER = this.Identifier.newKeyword("ORDER", { ignoreCase: true });
	static ORDIMAGE = this.Identifier.newKeyword("ORDIMAGE", {
		ignoreCase: true,
	});
	static ORDIMAGESIGNATURE = this.Identifier.newKeyword("ORDIMAGESIGNATURE", {
		ignoreCase: true,
	});
	static ORDINALITY = this.Identifier.newKeyword("ORDINALITY", {
		ignoreCase: true,
	});
	static ORDVIDEO = this.Identifier.newKeyword("ORDVIDEO", {
		ignoreCase: true,
	});
	static ORGANIZATION = this.Identifier.newKeyword("ORGANIZATION", {
		ignoreCase: true,
	});
	static OTHER = this.Identifier.newKeyword("OTHER", { ignoreCase: true });
	static OTHERS = this.Identifier.newKeyword("OTHERS", { ignoreCase: true });
	static OUT = this.Identifier.newKeyword("OUT", { ignoreCase: true });
	static OUTER = this.Identifier.newKeyword("OUTER", { ignoreCase: true });
	static OUTFILE = this.Identifier.newKeyword("OUTFILE", { ignoreCase: true });
	static OUTLINE = this.Identifier.newKeyword("OUTLINE", { ignoreCase: true });
	static OVER = this.Identifier.newKeyword("OVER", { ignoreCase: true });
	static OVERFLOW = this.Identifier.newKeyword("OVERFLOW", {
		ignoreCase: true,
	});
	static OVERLAPS = this.Identifier.newKeyword("OVERLAPS", {
		ignoreCase: true,
	});
	static OVERLAY = this.Identifier.newKeyword("OVERLAY", { ignoreCase: true });
	static OVERRIDING = this.Identifier.newKeyword("OVERRIDING", {
		ignoreCase: true,
	});
	static OWNED = this.Identifier.newKeyword("OWNED", { ignoreCase: true });
	static OWNER = this.Identifier.newKeyword("OWNER", { ignoreCase: true });
	static OWNERSHIP = this.Identifier.newKeyword("OWNERSHIP", {
		ignoreCase: true,
	});
	static P = this.Identifier.newKeyword("P", { ignoreCase: true });
	static PACKAGE = this.Identifier.newKeyword("PACKAGE", { ignoreCase: true });
	static PACKAGES = this.Identifier.newKeyword("PACKAGES", {
		ignoreCase: true,
	});
	static PACK_KEYS = this.Identifier.newKeyword("PACK_KEYS", {
		ignoreCase: true,
	});
	static PAGE_CHECKSUM = this.Identifier.newKeyword("PAGE_CHECKSUM", {
		ignoreCase: true,
	});
	static PAGE_COMPRESSED = this.Identifier.newKeyword("PAGE_COMPRESSED", {
		ignoreCase: true,
	});
	static PAGE_COMPRESSION_LEVEL = this.Identifier.newKeyword(
		"PAGE_COMPRESSION_LEVEL",
		{
			ignoreCase: true,
		},
	);
	static PARALLEL = this.Identifier.newKeyword("PARALLEL", {
		ignoreCase: true,
	});
	static PARALLEL_ENABLE = this.Identifier.newKeyword("PARALLEL_ENABLE", {
		ignoreCase: true,
	});
	static PARAMETERS = this.Identifier.newKeyword("PARAMETERS", {
		ignoreCase: true,
	});
	static PARENT_LEVEL_NAME = this.Identifier.newKeyword("PARENT_LEVEL_NAME", {
		ignoreCase: true,
	});
	static PARENT_UNIQUE_NAME = this.Identifier.newKeyword("PARENT_UNIQUE_NAME", {
		ignoreCase: true,
	});
	static PARITY = this.Identifier.newKeyword("PARITY", { ignoreCase: true });
	static PARSE = this.Identifier.newKeyword("PARSE", { ignoreCase: true });
	static PARSE_TREE = this.Identifier.newKeyword("PARSE_TREE", {
		ignoreCase: true,
	});
	static PARSER = this.Identifier.newKeyword("PARSER", { ignoreCase: true });
	static PARSE_GCOL_EXPR = this.Identifier.newKeyword("PARSE_GCOL_EXPR", {
		ignoreCase: true,
	});
	static PARSE_IDENT = this.Identifier.newKeyword("PARSE_IDENT", {
		ignoreCase: true,
	});
	static PARTIAL = this.Identifier.newKeyword("PARTIAL", { ignoreCase: true });
	static PARTITION = this.Identifier.newKeyword("PARTITION", {
		ignoreCase: true,
	});
	static PARTITIONS = this.Identifier.newKeyword("PARTITIONS", {
		ignoreCase: true,
	});
	static PARTITIONSET = this.Identifier.newKeyword("PARTITIONSET", {
		ignoreCase: true,
	});
	static PASSING = this.Identifier.newKeyword("PASSING", { ignoreCase: true });
	static PASSWORD = this.Identifier.newKeyword("PASSWORD", {
		ignoreCase: true,
	});
	static PASSWORDFILE_METADATA_CACHE = this.Identifier.newKeyword(
		"PASSWORDFILE_METADATA_CACHE",
		{ ignoreCase: true },
	);
	static PASSWORD_GRACE_TIME = this.Identifier.newKeyword(
		"PASSWORD_GRACE_TIME",
		{
			ignoreCase: true,
		},
	);
	static PASSWORD_LIFE_TIME = this.Identifier.newKeyword("PASSWORD_LIFE_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_LOCK_TIME = this.Identifier.newKeyword("PASSWORD_LOCK_TIME", {
		ignoreCase: true,
	});
	static PASSWORD_REUSE_MAX = this.Identifier.newKeyword("PASSWORD_REUSE_MAX", {
		ignoreCase: true,
	});
	static PASSWORD_REUSE_TIME = this.Identifier.newKeyword(
		"PASSWORD_REUSE_TIME",
		{
			ignoreCase: true,
		},
	);
	static PASSWORD_ROLLOVER_TIME = this.Identifier.newKeyword(
		"PASSWORD_ROLLOVER_TIME",
		{
			ignoreCase: true,
		},
	);
	static PASSWORD_VERIFY_FUNCTION = this.Identifier.newKeyword(
		"PASSWORD_VERIFY_FUNCTION",
		{
			ignoreCase: true,
		},
	);
	static PATCH = this.Identifier.newKeyword("PATCH", { ignoreCase: true });
	static PATH = this.Identifier.newKeyword("PATH", { ignoreCase: true });
	static PATH_PREFIX = this.Identifier.newKeyword("PATH_PREFIX", {
		ignoreCase: true,
	});
	static PATINDEX = this.Identifier.newKeyword("PATINDEX", {
		ignoreCase: true,
	});
	static PATTERN = this.Identifier.newKeyword("PATTERN", { ignoreCase: true });
	static PCLOSE = this.Identifier.newKeyword("PCLOSE", { ignoreCase: true });
	static PCTFREE = this.Identifier.newKeyword("PCTFREE", { ignoreCase: true });
	static PCTTHRESHOLD = this.Identifier.newKeyword("PCTTHRESHOLD", {
		ignoreCase: true,
	});
	static PCTUSED = this.Identifier.newKeyword("PCTUSED", { ignoreCase: true });
	static PCTVERSION = this.Identifier.newKeyword("PCTVERSION", {
		ignoreCase: true,
	});
	static PER = this.Identifier.newKeyword("PER", { ignoreCase: true });
	static PERCENT = this.Identifier.newKeyword("PERCENT", { ignoreCase: true });
	static PERCENTILE_CONT = this.Identifier.newKeyword("PERCENTILE_CONT", {
		ignoreCase: true,
	});
	static PERCENTILE_DISC = this.Identifier.newKeyword("PERCENTILE_DISC", {
		ignoreCase: true,
	});
	static PERCENT_RANK = this.Identifier.newKeyword("PERCENT_RANK", {
		ignoreCase: true,
	});
	static PERFORMANCE = this.Identifier.newKeyword("PERFORMANCE", {
		ignoreCase: true,
	});
	static PERIOD = this.Identifier.newKeyword("PERIOD", { ignoreCase: true });
	static PERIOD_ADD = this.Identifier.newKeyword("PERIOD_ADD", {
		ignoreCase: true,
	});
	static PERIOD_DIFF = this.Identifier.newKeyword("PERIOD_DIFF", {
		ignoreCase: true,
	});
	static PERMANENT = this.Identifier.newKeyword("PERMANENT", {
		ignoreCase: true,
	});
	static PERMISSION = this.Identifier.newKeyword("PERMISSION", {
		ignoreCase: true,
	});
	static PFILE = this.Identifier.newKeyword("PFILE", { ignoreCase: true });
	static PG_ADVISORY_LOCK = this.Identifier.newKeyword("PG_ADVISORY_LOCK", {
		ignoreCase: true,
	});
	static PG_ADVISORY_LOCK_SHARED = this.Identifier.newKeyword(
		"PG_ADVISORY_LOCK_SHARED",
		{
			ignoreCase: true,
		},
	);
	static PG_ADVISORY_UNLOCK = this.Identifier.newKeyword("PG_ADVISORY_UNLOCK", {
		ignoreCase: true,
	});
	static PG_ADVISORY_UNLOCK_ALL = this.Identifier.newKeyword(
		"PG_ADVISORY_UNLOCK_ALL",
		{
			ignoreCase: true,
		},
	);
	static PG_ADVISORY_UNLOCK_SHARED = this.Identifier.newKeyword(
		"PG_ADVISORY_UNLOCK_SHARED",
		{
			ignoreCase: true,
		},
	);
	static PG_ADVISORY_XACT_LOCK = this.Identifier.newKeyword(
		"PG_ADVISORY_XACT_LOCK",
		{
			ignoreCase: true,
		},
	);
	static PG_ADVISORY_XACT_LOCK_SHARED = this.Identifier.newKeyword(
		"PG_ADVISORY_XACT_LOCK_SHARED",
		{ ignoreCase: true },
	);
	static PG_BACKEND_PID = this.Identifier.newKeyword("PG_BACKEND_PID", {
		ignoreCase: true,
	});
	static PG_BLOCKING_PIDS = this.Identifier.newKeyword("PG_BLOCKING_PIDS", {
		ignoreCase: true,
	});
	static PG_CLIENT_ENCODING = this.Identifier.newKeyword("PG_CLIENT_ENCODING", {
		ignoreCase: true,
	});
	static PG_COLLATION_IS_VISIBLE = this.Identifier.newKeyword(
		"PG_COLLATION_IS_VISIBLE",
		{
			ignoreCase: true,
		},
	);
	static PG_CONF_LOAD_TIME = this.Identifier.newKeyword("PG_CONF_LOAD_TIME", {
		ignoreCase: true,
	});
	static PG_CONVERSION_IS_VISIBLE = this.Identifier.newKeyword(
		"PG_CONVERSION_IS_VISIBLE",
		{
			ignoreCase: true,
		},
	);
	static PG_CURRENT_LOGFILE = this.Identifier.newKeyword("PG_CURRENT_LOGFILE", {
		ignoreCase: true,
	});
	static PG_EVENT_TRIGGER_DDL_COMMANDS = this.Identifier.newKeyword(
		"PG_EVENT_TRIGGER_DDL_COMMANDS",
		{ ignoreCase: true },
	);
	static PG_EVENT_TRIGGER_DROPPED_OBJECTS = this.Identifier.newKeyword(
		"PG_EVENT_TRIGGER_DROPPED_OBJECTS",
		{ ignoreCase: true },
	);
	static PG_EVENT_TRIGGER_TABLE_REWRITE_OID = this.Identifier.newKeyword(
		"PG_EVENT_TRIGGER_TABLE_REWRITE_OID",
		{ ignoreCase: true },
	);
	static PG_EVENT_TRIGGER_TABLE_REWRITE_REASON = this.Identifier.newKeyword(
		"PG_EVENT_TRIGGER_TABLE_REWRITE_REASON",
		{ ignoreCase: true },
	);
	static PG_HAS_ROLE = this.Identifier.newKeyword("PG_HAS_ROLE", {
		ignoreCase: true,
	});
	static PG_IS_OTHER_TEMP_SCHEMA = this.Identifier.newKeyword(
		"PG_IS_OTHER_TEMP_SCHEMA",
		{
			ignoreCase: true,
		},
	);
	static PG_JIT_AVAILABLE = this.Identifier.newKeyword("PG_JIT_AVAILABLE", {
		ignoreCase: true,
	});
	static PG_LISTENING_CHANNELS = this.Identifier.newKeyword(
		"PG_LISTENING_CHANNELS",
		{
			ignoreCase: true,
		},
	);
	static PG_LS_ARCHIVE_STATUSDIR = this.Identifier.newKeyword(
		"PG_LS_ARCHIVE_STATUSDIR",
		{
			ignoreCase: true,
		},
	);
	static PG_LS_DIR = this.Identifier.newKeyword("PG_LS_DIR", {
		ignoreCase: true,
	});
	static PG_LS_LOGDIR = this.Identifier.newKeyword("PG_LS_LOGDIR", {
		ignoreCase: true,
	});
	static PG_LS_LOGICALMAPDIR = this.Identifier.newKeyword(
		"PG_LS_LOGICALMAPDIR",
		{
			ignoreCase: true,
		},
	);
	static PG_LS_LOGICALSNAPDIR = this.Identifier.newKeyword(
		"PG_LS_LOGICALSNAPDIR",
		{
			ignoreCase: true,
		},
	);
	static PG_LS_REPLSLOTDIR = this.Identifier.newKeyword("PG_LS_REPLSLOTDIR", {
		ignoreCase: true,
	});
	static PG_LS_TMPDIR = this.Identifier.newKeyword("PG_LS_TMPDIR", {
		ignoreCase: true,
	});
	static PG_LS_WALDIR = this.Identifier.newKeyword("PG_LS_WALDIR", {
		ignoreCase: true,
	});
	static PG_MCV_LIST_ITEMS = this.Identifier.newKeyword("PG_MCV_LIST_ITEMS", {
		ignoreCase: true,
	});
	static PG_MY_TEMP_SCHEMA = this.Identifier.newKeyword("PG_MY_TEMP_SCHEMA", {
		ignoreCase: true,
	});
	static PG_NOTIFICATION_QUEUE_USAGE = this.Identifier.newKeyword(
		"PG_NOTIFICATION_QUEUE_USAGE",
		{ ignoreCase: true },
	);
	static PG_POSTMASTER_START_TIME = this.Identifier.newKeyword(
		"PG_POSTMASTER_START_TIME",
		{
			ignoreCase: true,
		},
	);
	static PG_READ_BINARY_FILE = this.Identifier.newKeyword(
		"PG_READ_BINARY_FILE",
		{
			ignoreCase: true,
		},
	);
	static PG_READ_FILE = this.Identifier.newKeyword("PG_READ_FILE", {
		ignoreCase: true,
	});
	static PG_SAFE_SNAPSHOT_BLOCKING_PIDS = this.Identifier.newKeyword(
		"PG_SAFE_SNAPSHOT_BLOCKING_PIDS",
		{ ignoreCase: true },
	);
	static PG_SLEEP = this.Identifier.newKeyword("PG_SLEEP", {
		ignoreCase: true,
	});
	static PG_SLEEP_FOR = this.Identifier.newKeyword("PG_SLEEP_FOR", {
		ignoreCase: true,
	});
	static PG_SLEEP_UNTIL = this.Identifier.newKeyword("PG_SLEEP_UNTIL", {
		ignoreCase: true,
	});
	static PG_STAT_FILE = this.Identifier.newKeyword("PG_STAT_FILE", {
		ignoreCase: true,
	});
	static PG_TRIGGER_DEPTH = this.Identifier.newKeyword("PG_TRIGGER_DEPTH", {
		ignoreCase: true,
	});
	static PG_TRY_ADVISORY_LOCK = this.Identifier.newKeyword(
		"PG_TRY_ADVISORY_LOCK",
		{
			ignoreCase: true,
		},
	);
	static PG_TRY_ADVISORY_LOCK_SHARED = this.Identifier.newKeyword(
		"PG_TRY_ADVISORY_LOCK_SHARED",
		{ ignoreCase: true },
	);
	static PG_TRY_ADVISORY_XACT_LOCK = this.Identifier.newKeyword(
		"PG_TRY_ADVISORY_XACT_LOCK",
		{
			ignoreCase: true,
		},
	);
	static PG_TRY_ADVISORY_XACT_LOCK_SHARED = this.Identifier.newKeyword(
		"PG_TRY_ADVISORY_XACT_LOCK_SHARED",
		{ ignoreCase: true },
	);
	static PHRASETO_TSQUERY = this.Identifier.newKeyword("PHRASETO_TSQUERY", {
		ignoreCase: true,
	});
	static PHYSICAL = this.Identifier.newKeyword("PHYSICAL", {
		ignoreCase: true,
	});
	static PI = this.Identifier.newKeyword("PI", { ignoreCase: true });
	static PIPE = this.Identifier.newKeyword("PIPE", { ignoreCase: true });
	static PIPELINED = this.Identifier.newKeyword("PIPELINED", {
		ignoreCase: true,
	});
	static PIVOT = this.Identifier.newKeyword("PIVOT", { ignoreCase: true });
	static PLACING = this.Identifier.newKeyword("PLACING", { ignoreCase: true });
	static PLAINTO_TSQUERY = this.Identifier.newKeyword("PLAINTO_TSQUERY", {
		ignoreCase: true,
	});
	static PLAN = this.Identifier.newKeyword("PLAN", { ignoreCase: true });
	static PLS_INTEGER = this.Identifier.newKeyword("PLS_INTEGER", {
		ignoreCase: true,
	});
	static PLUGGABLE = this.Identifier.newKeyword("PLUGGABLE", {
		ignoreCase: true,
	});
	static PLUGIN = this.Identifier.newKeyword("PLUGIN", { ignoreCase: true });
	static POINT = this.Identifier.newKeyword("POINT", { ignoreCase: true });
	static POLICY = this.Identifier.newKeyword("POLICY", { ignoreCase: true });
	static POLYGON = this.Identifier.newKeyword("POLYGON", { ignoreCase: true });
	static POLYMORPHIC = this.Identifier.newKeyword("POLYMORPHIC", {
		ignoreCase: true,
	});
	static POPEN = this.Identifier.newKeyword("POPEN", { ignoreCase: true });
	static PORT = this.Identifier.newKeyword("PORT", { ignoreCase: true });
	static POSITION = this.Identifier.newKeyword("POSITION", {
		ignoreCase: true,
	});
	static POSITIVE = this.Identifier.newKeyword("POSITIVE", {
		ignoreCase: true,
	});
	static POSITIVEN = this.Identifier.newKeyword("POSITIVEN", {
		ignoreCase: true,
	});
	static POST_TRANSACTION = this.Identifier.newKeyword("POST_TRANSACTION", {
		ignoreCase: true,
	});
	static POW = this.Identifier.newKeyword("POW", { ignoreCase: true });
	static POWER = this.Identifier.newKeyword("POWER", { ignoreCase: true });
	static PRAGMA = this.Identifier.newKeyword("PRAGMA", { ignoreCase: true });
	static PREBUILD = this.Identifier.newKeyword("PREBUILD", {
		ignoreCase: true,
	});
	static PRECEDES = this.Identifier.newKeyword("PRECEDES", {
		ignoreCase: true,
	});
	static PRECEDING = this.Identifier.newKeyword("PRECEDING", {
		ignoreCase: true,
	});
	static PRECISION = this.Identifier.newKeyword("PRECISION", {
		ignoreCase: true,
	});
	static PREDICT = this.Identifier.newKeyword("PREDICT", { ignoreCase: true });
	static PREPARE = this.Identifier.newKeyword("PREPARE", { ignoreCase: true });
	static PREPARED = this.Identifier.newKeyword("PREPARED", {
		ignoreCase: true,
	});
	static PRESERVE = this.Identifier.newKeyword("PRESERVE", {
		ignoreCase: true,
	});
	static PREV = this.Identifier.newKeyword("PREV", { ignoreCase: true });
	static PRIMARY = this.Identifier.newKeyword("PRIMARY", { ignoreCase: true });
	static PRINT = this.Identifier.newKeyword("PRINT", { ignoreCase: true });
	static PRINTF = this.Identifier.newKeyword("PRINTF", { ignoreCase: true });
	static PRIOR = this.Identifier.newKeyword("PRIOR", { ignoreCase: true });
	static PRIORITY = this.Identifier.newKeyword("PRIORITY", {
		ignoreCase: true,
	});
	static PRIVATE = this.Identifier.newKeyword("PRIVATE", { ignoreCase: true });
	static PRIVATE_SGA = this.Identifier.newKeyword("PRIVATE_SGA", {
		ignoreCase: true,
	});
	static PRIVILEGES = this.Identifier.newKeyword("PRIVILEGES", {
		ignoreCase: true,
	});
	static PROC = this.Identifier.newKeyword("PROC", { ignoreCase: true });
	static PROCEDURAL = this.Identifier.newKeyword("PROCEDURAL", {
		ignoreCase: true,
	});
	static PROCEDURE = this.Identifier.newKeyword("PROCEDURE", {
		ignoreCase: true,
	});
	static PROFILE = this.Identifier.newKeyword("PROFILE", { ignoreCase: true });
	static PROJECT = this.Identifier.newKeyword("PROJECT", { ignoreCase: true });
	static PROPERTY = this.Identifier.newKeyword("PROPERTY", {
		ignoreCase: true,
	});
	static PROTECTION = this.Identifier.newKeyword("PROTECTION", {
		ignoreCase: true,
	});
	static PROXY = this.Identifier.newKeyword("PROXY", { ignoreCase: true });
	static PRUNING = this.Identifier.newKeyword("PRUNING", { ignoreCase: true });
	static PS_CURRENT_THREAD_ID = this.Identifier.newKeyword(
		"PS_CURRENT_THREAD_ID",
		{
			ignoreCase: true,
		},
	);
	static PS_THREAD_ID = this.Identifier.newKeyword("PS_THREAD_ID", {
		ignoreCase: true,
	});
	static PUBLIC = this.Identifier.newKeyword("PUBLIC", { ignoreCase: true });
	static PUBLICATION = this.Identifier.newKeyword("PUBLICATION", {
		ignoreCase: true,
	});
	static PURGE = this.Identifier.newKeyword("PURGE", { ignoreCase: true });
	static QUALIFY = this.Identifier.newKeyword("QUALIFY", { ignoreCase: true });
	static QUARTER = this.Identifier.newKeyword("QUARTER", { ignoreCase: true });
	static QUARTERS = this.Identifier.newKeyword("QUARTERS", {
		ignoreCase: true,
	});
	static QUERY = this.Identifier.newKeyword("QUERY", { ignoreCase: true });
	static QUERYTREE = this.Identifier.newKeyword("QUERYTREE", {
		ignoreCase: true,
	});
	static QUERY_TO_XML = this.Identifier.newKeyword("QUERY_TO_XML", {
		ignoreCase: true,
	});
	static QUERY_TO_XMLSCHEMA = this.Identifier.newKeyword("QUERY_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static QUERY_TO_XML_AND_XMLSCHEMA = this.Identifier.newKeyword(
		"QUERY_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static QUEUE = this.Identifier.newKeyword("QUEUE", { ignoreCase: true });
	static QUICK = this.Identifier.newKeyword("QUICK", { ignoreCase: true });
	static QUIESCE = this.Identifier.newKeyword("QUIESCE", { ignoreCase: true });
	static QUORUM = this.Identifier.newKeyword("QUORUM", { ignoreCase: true });
	static QUOTA = this.Identifier.newKeyword("QUOTA", { ignoreCase: true });
	static QUOTAGROUP = this.Identifier.newKeyword("QUOTAGROUP", {
		ignoreCase: true,
	});
	static QUOTE = this.Identifier.newKeyword("QUOTE", { ignoreCase: true });
	static QUOTENAME = this.Identifier.newKeyword("QUOTENAME", {
		ignoreCase: true,
	});
	static QUOTE_IDENT = this.Identifier.newKeyword("QUOTE_IDENT", {
		ignoreCase: true,
	});
	static QUOTE_LITERAL = this.Identifier.newKeyword("QUOTE_LITERAL", {
		ignoreCase: true,
	});
	static QUOTE_NULLABLE = this.Identifier.newKeyword("QUOTE_NULLABLE", {
		ignoreCase: true,
	});
	static RADIANS = this.Identifier.newKeyword("RADIANS", { ignoreCase: true });
	static RADIUS = this.Identifier.newKeyword("RADIUS", { ignoreCase: true });
	static RAISE = this.Identifier.newKeyword("RAISE", { ignoreCase: true });
	static RAISE_APPLICATION_ERROR = this.Identifier.newKeyword(
		"RAISE_APPLICATION_ERROR",
		{
			ignoreCase: true,
		},
	);
	static RAISERROR = this.Identifier.newKeyword("RAISERROR", {
		ignoreCase: true,
	});
	static RAND = this.Identifier.newKeyword("RAND", { ignoreCase: true });
	static RANDOM = this.Identifier.newKeyword("RANDOM", { ignoreCase: true });
	static RANDOMBLOB = this.Identifier.newKeyword("RANDOMBLOB", {
		ignoreCase: true,
	});
	static RANDOM_BYTES = this.Identifier.newKeyword("RANDOM_BYTES", {
		ignoreCase: true,
	});
	static RANGE = this.Identifier.newKeyword("RANGE", { ignoreCase: true });
	static RANGE_AGG = this.Identifier.newKeyword("RANGE_AGG", {
		ignoreCase: true,
	});
	static RANGE_INTERSECT_AGG = this.Identifier.newKeyword(
		"RANGE_INTERSECT_AGG",
		{
			ignoreCase: true,
		},
	);
	static RANGE_MERGE = this.Identifier.newKeyword("RANGE_MERGE", {
		ignoreCase: true,
	});
	static RANK = this.Identifier.newKeyword("RANK", { ignoreCase: true });
	static RAW = this.Identifier.newKeyword("RAW", { ignoreCase: true });
	static READ = this.Identifier.newKeyword("READ", { ignoreCase: true });
	static READS = this.Identifier.newKeyword("READS", { ignoreCase: true });
	static READTEXT = this.Identifier.newKeyword("READTEXT", {
		ignoreCase: true,
	});
	static READ_WRITE = this.Identifier.newKeyword("READ_WRITE", {
		ignoreCase: true,
	});
	static REAL = this.Identifier.newKeyword("REAL", { ignoreCase: true });
	static REASSIGN = this.Identifier.newKeyword("REASSIGN", {
		ignoreCase: true,
	});
	static REBUILD = this.Identifier.newKeyword("REBUILD", { ignoreCase: true });
	static RECEIVE = this.Identifier.newKeyword("RECEIVE", { ignoreCase: true });
	static RECONFIGURE = this.Identifier.newKeyword("RECONFIGURE", {
		ignoreCase: true,
	});
	static RECORD = this.Identifier.newKeyword("RECORD", { ignoreCase: true });
	static RECOVER = this.Identifier.newKeyword("RECOVER", { ignoreCase: true });
	static RECURSIVE = this.Identifier.newKeyword("RECURSIVE", {
		ignoreCase: true,
	});
	static RECYCLEBIN = this.Identifier.newKeyword("RECYCLEBIN", {
		ignoreCase: true,
	});
	static REDO = this.Identifier.newKeyword("REDO", { ignoreCase: true });
	static REDOFILE = this.Identifier.newKeyword("REDOFILE", {
		ignoreCase: true,
	});
	static REDO_BUFFER_SIZE = this.Identifier.newKeyword("REDO_BUFFER_SIZE", {
		ignoreCase: true,
	});
	static REDUCED = this.Identifier.newKeyword("REDUCED", { ignoreCase: true });
	static REDUNDANCY = this.Identifier.newKeyword("REDUNDANCY", {
		ignoreCase: true,
	});
	static REDUNDANT = this.Identifier.newKeyword("REDUNDANT", {
		ignoreCase: true,
	});
	static REF = this.Identifier.newKeyword("REF", { ignoreCase: true });
	static REFCURSOR = this.Identifier.newKeyword("REFCURSOR", {
		ignoreCase: true,
	});
	static REFERENCE = this.Identifier.newKeyword("REFERENCE", {
		ignoreCase: true,
	});
	static REFERENCED = this.Identifier.newKeyword("REFERENCED", {
		ignoreCase: true,
	});
	static REFERENCES = this.Identifier.newKeyword("REFERENCES", {
		ignoreCase: true,
	});
	static REFRESH = this.Identifier.newKeyword("REFRESH", { ignoreCase: true });
	static REGEXP = this.Identifier.newKeyword("REGEXP", { ignoreCase: true });
	static REGEXP_COUNT = this.Identifier.newKeyword("REGEXP_COUNT", {
		ignoreCase: true,
	});
	static REGEXP_INSTR = this.Identifier.newKeyword("REGEXP_INSTR", {
		ignoreCase: true,
	});
	static REGEXP_LIKE = this.Identifier.newKeyword("REGEXP_LIKE", {
		ignoreCase: true,
	});
	static REGEXP_MATCH = this.Identifier.newKeyword("REGEXP_MATCH", {
		ignoreCase: true,
	});
	static REGEXP_MATCHES = this.Identifier.newKeyword("REGEXP_MATCHES", {
		ignoreCase: true,
	});
	static REGEXP_REPLACE = this.Identifier.newKeyword("REGEXP_REPLACE", {
		ignoreCase: true,
	});
	static REGEXP_SPLIT_TO_ARRAY = this.Identifier.newKeyword(
		"REGEXP_SPLIT_TO_ARRAY",
		{
			ignoreCase: true,
		},
	);
	static REGEXP_SPLIT_TO_TABLE = this.Identifier.newKeyword(
		"REGEXP_SPLIT_TO_TABLE",
		{
			ignoreCase: true,
		},
	);
	static REGEXP_SUBSTR = this.Identifier.newKeyword("REGEXP_SUBSTR", {
		ignoreCase: true,
	});
	static REGISTER = this.Identifier.newKeyword("REGISTER", {
		ignoreCase: true,
	});
	static REGR_AVGX = this.Identifier.newKeyword("REGR_AVGX", {
		ignoreCase: true,
	});
	static REGR_AVGY = this.Identifier.newKeyword("REGR_AVGY", {
		ignoreCase: true,
	});
	static REGR_COUNT = this.Identifier.newKeyword("REGR_COUNT", {
		ignoreCase: true,
	});
	static REGR_INTERCEPT = this.Identifier.newKeyword("REGR_INTERCEPT", {
		ignoreCase: true,
	});
	static REGR_R2 = this.Identifier.newKeyword("REGR_R2", { ignoreCase: true });
	static REGR_SLOPE = this.Identifier.newKeyword("REGR_SLOPE", {
		ignoreCase: true,
	});
	static REGR_SXX = this.Identifier.newKeyword("REGR_SXX", {
		ignoreCase: true,
	});
	static REGR_SXY = this.Identifier.newKeyword("REGR_SXY", {
		ignoreCase: true,
	});
	static REGR_SYY = this.Identifier.newKeyword("REGR_SYY", {
		ignoreCase: true,
	});
	static REGULAR = this.Identifier.newKeyword("REGULAR", { ignoreCase: true });
	static REINDEX = this.Identifier.newKeyword("REINDEX", { ignoreCase: true });
	static REJECT = this.Identifier.newKeyword("REJECT", { ignoreCase: true });
	static REKEY = this.Identifier.newKeyword("REKEY", { ignoreCase: true });
	static RELATIONAL = this.Identifier.newKeyword("RELATIONAL", {
		ignoreCase: true,
	});
	static RELEASE = this.Identifier.newKeyword("RELEASE", { ignoreCase: true });
	static RELEASE_ALL_LOCKS = this.Identifier.newKeyword("RELEASE_ALL_LOCKS", {
		ignoreCase: true,
	});
	static RELEASE_LOCK = this.Identifier.newKeyword("RELEASE_LOCK", {
		ignoreCase: true,
	});
	static RELIES_ON = this.Identifier.newKeyword("RELIES_ON", {
		ignoreCase: true,
	});
	static RELOCATE = this.Identifier.newKeyword("RELOCATE", {
		ignoreCase: true,
	});
	static RELY = this.Identifier.newKeyword("RELY", { ignoreCase: true });
	static REMOTE = this.Identifier.newKeyword("REMOTE", { ignoreCase: true });
	static RENAME = this.Identifier.newKeyword("RENAME", { ignoreCase: true });
	static REPAIR = this.Identifier.newKeyword("REPAIR", { ignoreCase: true });
	static REPEAT = this.Identifier.newKeyword("REPEAT", { ignoreCase: true });
	static REPEATABLE = this.Identifier.newKeyword("REPEATABLE", {
		ignoreCase: true,
	});
	static REPLACE = this.Identifier.newKeyword("REPLACE", { ignoreCase: true });
	static REPLICA = this.Identifier.newKeyword("REPLICA", { ignoreCase: true });
	static REPLICATE = this.Identifier.newKeyword("REPLICATE", {
		ignoreCase: true,
	});
	static REPLICATION = this.Identifier.newKeyword("REPLICATION", {
		ignoreCase: true,
	});
	static REQUIRE = this.Identifier.newKeyword("REQUIRE", { ignoreCase: true });
	static REQUIRED = this.Identifier.newKeyword("REQUIRED", {
		ignoreCase: true,
	});
	static RESET = this.Identifier.newKeyword("RESET", { ignoreCase: true });
	static RESETLOGS = this.Identifier.newKeyword("RESETLOGS", {
		ignoreCase: true,
	});
	static RESIGNAL = this.Identifier.newKeyword("RESIGNAL", {
		ignoreCase: true,
	});
	static RESIZE = this.Identifier.newKeyword("RESIZE", { ignoreCase: true });
	static RESOLVE = this.Identifier.newKeyword("RESOLVE", { ignoreCase: true });
	static RESOLVER = this.Identifier.newKeyword("RESOLVER", {
		ignoreCase: true,
	});
	static RESOURCE = this.Identifier.newKeyword("RESOURCE", {
		ignoreCase: true,
	});
	static RESTART = this.Identifier.newKeyword("RESTART", { ignoreCase: true });
	static RESTORE = this.Identifier.newKeyword("RESTORE", { ignoreCase: true });
	static RESTRICT = this.Identifier.newKeyword("RESTRICT", {
		ignoreCase: true,
	});
	static RESTRICTED = this.Identifier.newKeyword("RESTRICTED", {
		ignoreCase: true,
	});
	static RESTRICT_REFERENCES = this.Identifier.newKeyword(
		"RESTRICT_REFERENCES",
		{
			ignoreCase: true,
		},
	);
	static RESULT_CACHE = this.Identifier.newKeyword("RESULT_CACHE", {
		ignoreCase: true,
	});
	static RESUMABLE = this.Identifier.newKeyword("RESUMABLE", {
		ignoreCase: true,
	});
	static RESUME = this.Identifier.newKeyword("RESUME", { ignoreCase: true });
	static RETAIN = this.Identifier.newKeyword("RETAIN", { ignoreCase: true });
	static RETENTION = this.Identifier.newKeyword("RETENTION", {
		ignoreCase: true,
	});
	static RETURN = this.Identifier.newKeyword("RETURN", { ignoreCase: true });
	static RETURNING = this.Identifier.newKeyword("RETURNING", {
		ignoreCase: true,
	});
	static REUSE = this.Identifier.newKeyword("REUSE", { ignoreCase: true });
	static REVERSE = this.Identifier.newKeyword("REVERSE", { ignoreCase: true });
	static REVERT = this.Identifier.newKeyword("REVERT", { ignoreCase: true });
	static REVOKE = this.Identifier.newKeyword("REVOKE", { ignoreCase: true });
	static REWRITE = this.Identifier.newKeyword("REWRITE", { ignoreCase: true });
	static RIGHT = this.Identifier.newKeyword("RIGHT", { ignoreCase: true });
	static RLIKE = this.Identifier.newKeyword("RLIKE", { ignoreCase: true });
	static RNDS = this.Identifier.newKeyword("RNDS", { ignoreCase: true });
	static RNPS = this.Identifier.newKeyword("RNPS", { ignoreCase: true });
	static ROLE = this.Identifier.newKeyword("ROLE", { ignoreCase: true });
	static ROLES = this.Identifier.newKeyword("ROLES", { ignoreCase: true });
	static ROLES_GRAPHML = this.Identifier.newKeyword("ROLES_GRAPHML", {
		ignoreCase: true,
	});
	static ROLLBACK = this.Identifier.newKeyword("ROLLBACK", {
		ignoreCase: true,
	});
	static ROLLING = this.Identifier.newKeyword("ROLLING", { ignoreCase: true });
	static ROLLUP = this.Identifier.newKeyword("ROLLUP", { ignoreCase: true });
	static ROOT = this.Identifier.newKeyword("ROOT", { ignoreCase: true });
	static ROUND = this.Identifier.newKeyword("ROUND", { ignoreCase: true });
	static ROUTE = this.Identifier.newKeyword("ROUTE", { ignoreCase: true });
	static ROUTINE = this.Identifier.newKeyword("ROUTINE", { ignoreCase: true });
	static ROW = this.Identifier.newKeyword("ROW", { ignoreCase: true });
	static ROWCOUNT = this.Identifier.newKeyword("ROWCOUNT", {
		ignoreCase: true,
	});
	static ROWDEPENDENCIES = this.Identifier.newKeyword("ROWDEPENDENCIES", {
		ignoreCase: true,
	});
	static ROWGUIDCOL = this.Identifier.newKeyword("ROWGUIDCOL", {
		ignoreCase: true,
	});
	static ROWID = this.Identifier.newKeyword("ROWID", { ignoreCase: true });
	static ROWLABEL = this.Identifier.newKeyword("ROWLABEL", {
		ignoreCase: true,
	});
	static ROWNUM = this.Identifier.newKeyword("ROWNUM", { ignoreCase: true });
	static ROWS = this.Identifier.newKeyword("ROWS", { ignoreCase: true });
	static ROWTYPE = this.Identifier.newKeyword("ROWTYPE", { ignoreCase: true });
	static ROWVERSION = this.Identifier.newKeyword("ROWVERSION", {
		ignoreCase: true,
	});
	static ROW_COUNT = this.Identifier.newKeyword("ROW_COUNT", {
		ignoreCase: true,
	});
	static ROW_FORMAT = this.Identifier.newKeyword("ROW_FORMAT", {
		ignoreCase: true,
	});
	static ROW_NUMBER = this.Identifier.newKeyword("ROW_NUMBER", {
		ignoreCase: true,
	});
	static ROW_SECURITY_ACTIVE = this.Identifier.newKeyword(
		"ROW_SECURITY_ACTIVE",
		{
			ignoreCase: true,
		},
	);
	static ROW_TO_JSON = this.Identifier.newKeyword("ROW_TO_JSON", {
		ignoreCase: true,
	});
	static RPAD = this.Identifier.newKeyword("RPAD", { ignoreCase: true });
	static RTREE = this.Identifier.newKeyword("RTREE", { ignoreCase: true });
	static RTRIM = this.Identifier.newKeyword("RTRIM", { ignoreCase: true });
	static RULE = this.Identifier.newKeyword("RULE", { ignoreCase: true });
	static RULES = this.Identifier.newKeyword("RULES", { ignoreCase: true });
	static RUNNING = this.Identifier.newKeyword("RUNNING", { ignoreCase: true });
	static S3 = this.Identifier.newKeyword("S3", { ignoreCase: true });
	static SALT = this.Identifier.newKeyword("SALT", { ignoreCase: true });
	static SAMPLE = this.Identifier.newKeyword("SAMPLE", { ignoreCase: true });
	static SAVE = this.Identifier.newKeyword("SAVE", { ignoreCase: true });
	static SAVEPOINT = this.Identifier.newKeyword("SAVEPOINT", {
		ignoreCase: true,
	});
	static SCALE = this.Identifier.newKeyword("SCALE", { ignoreCase: true });
	static SCAN = this.Identifier.newKeyword("SCAN", { ignoreCase: true });
	static SCHEDULE = this.Identifier.newKeyword("SCHEDULE", {
		ignoreCase: true,
	});
	static SCHEMA = this.Identifier.newKeyword("SCHEMA", { ignoreCase: true });
	static SCHEMAS = this.Identifier.newKeyword("SCHEMAS", { ignoreCase: true });
	static SCHEMA_TO_XML = this.Identifier.newKeyword("SCHEMA_TO_XML", {
		ignoreCase: true,
	});
	static SCHEMA_TO_XMLSCHEMA = this.Identifier.newKeyword(
		"SCHEMA_TO_XMLSCHEMA",
		{
			ignoreCase: true,
		},
	);
	static SCHEMA_TO_XML_AND_XMLSCHEMA = this.Identifier.newKeyword(
		"SCHEMA_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static SCN = this.Identifier.newKeyword("SCN", { ignoreCase: true });
	static SCOPE = this.Identifier.newKeyword("SCOPE", { ignoreCase: true });
	static SCRUB = this.Identifier.newKeyword("SCRUB", { ignoreCase: true });
	static SDO_GEOMETRY = this.Identifier.newKeyword("SDO_GEOMETRY", {
		ignoreCase: true,
	});
	static SDO_GEORASTER = this.Identifier.newKeyword("SDO_GEORASTER", {
		ignoreCase: true,
	});
	static SDO_TOPO_GEOMETRY = this.Identifier.newKeyword("SDO_TOPO_GEOMETRY", {
		ignoreCase: true,
	});
	static SEARCH = this.Identifier.newKeyword("SEARCH", { ignoreCase: true });
	static SECOND = this.Identifier.newKeyword("SECOND", { ignoreCase: true });
	static SECONDARY_ENGINE_ATTRIBUTE = this.Identifier.newKeyword(
		"SECONDARY_ENGINE_ATTRIBUTE",
		{ ignoreCase: true },
	);
	static SECONDS = this.Identifier.newKeyword("SECONDS", { ignoreCase: true });
	static SECOND_MICROSECOND = this.Identifier.newKeyword("SECOND_MICROSECOND", {
		ignoreCase: true,
	});
	static SECRET = this.Identifier.newKeyword("SECRET", { ignoreCase: true });
	static SECUREFILE = this.Identifier.newKeyword("SECUREFILE", {
		ignoreCase: true,
	});
	static SECURITY = this.Identifier.newKeyword("SECURITY", {
		ignoreCase: true,
	});
	static SECURITYAUDIT = this.Identifier.newKeyword("SECURITYAUDIT", {
		ignoreCase: true,
	});
	static SEC_TO_TIME = this.Identifier.newKeyword("SEC_TO_TIME", {
		ignoreCase: true,
	});
	static SEED = this.Identifier.newKeyword("SEED", { ignoreCase: true });
	static SEGMENT = this.Identifier.newKeyword("SEGMENT", { ignoreCase: true });
	static SELECT = this.Identifier.newKeyword("SELECT", { ignoreCase: true });
	static SELECTIVE = this.Identifier.newKeyword("SELECTIVE", {
		ignoreCase: true,
	});
	static SELECTIVITY = this.Identifier.newKeyword("SELECTIVITY", {
		ignoreCase: true,
	});
	static SELF = this.Identifier.newKeyword("SELF", { ignoreCase: true });
	static SEMANTICKEYPHRASETABLE = this.Identifier.newKeyword(
		"SEMANTICKEYPHRASETABLE",
		{
			ignoreCase: true,
		},
	);
	static SEMANTICSIMILARITYDETAILSTABLE = this.Identifier.newKeyword(
		"SEMANTICSIMILARITYDETAILSTABLE",
		{ ignoreCase: true },
	);
	static SEMANTICSIMILARITYTABLE = this.Identifier.newKeyword(
		"SEMANTICSIMILARITYTABLE",
		{
			ignoreCase: true,
		},
	);
	static SEND = this.Identifier.newKeyword("SEND", { ignoreCase: true });
	static SENSITIVE = this.Identifier.newKeyword("SENSITIVE", {
		ignoreCase: true,
	});
	static SEPARATOR = this.Identifier.newKeyword("SEPARATOR", {
		ignoreCase: true,
	});
	static SEQUENCE = this.Identifier.newKeyword("SEQUENCE", {
		ignoreCase: true,
	});
	static SEQUENTIAL = this.Identifier.newKeyword("SEQUENTIAL", {
		ignoreCase: true,
	});
	static SERIALIZABLE = this.Identifier.newKeyword("SERIALIZABLE", {
		ignoreCase: true,
	});
	static SERIALLY_REUSABLE = this.Identifier.newKeyword("SERIALLY_REUSABLE", {
		ignoreCase: true,
	});
	static SERVER = this.Identifier.newKeyword("SERVER", { ignoreCase: true });
	static SERVICE = this.Identifier.newKeyword("SERVICE", { ignoreCase: true });
	static SERVICE_NAME_CONVERT = this.Identifier.newKeyword(
		"SERVICE_NAME_CONVERT",
		{
			ignoreCase: true,
		},
	);
	static SESSION = this.Identifier.newKeyword("SESSION", { ignoreCase: true });
	static SESSIONPROPERTY = this.Identifier.newKeyword("SESSIONPROPERTY", {
		ignoreCase: true,
	});
	static SESSIONS_PER_USER = this.Identifier.newKeyword("SESSIONS_PER_USER", {
		ignoreCase: true,
	});
	static SESSION_USER = this.Identifier.newKeyword("SESSION_USER", {
		ignoreCase: true,
	});
	static SET = this.Identifier.newKeyword("SET", { ignoreCase: true });
	static SETOF = this.Identifier.newKeyword("SETOF", { ignoreCase: true });
	static SETS = this.Identifier.newKeyword("SETS", { ignoreCase: true });
	static SETSEED = this.Identifier.newKeyword("SETSEED", { ignoreCase: true });
	static SETTINGS = this.Identifier.newKeyword("SETTINGS", {
		ignoreCase: true,
	});
	static SETUSER = this.Identifier.newKeyword("SETUSER", { ignoreCase: true });
	static SETVAL = this.Identifier.newKeyword("SETVAL", { ignoreCase: true });
	static SETWEIGHT = this.Identifier.newKeyword("SETWEIGHT", {
		ignoreCase: true,
	});
	static SET_BIT = this.Identifier.newKeyword("SET_BIT", { ignoreCase: true });
	static SET_BYTE = this.Identifier.newKeyword("SET_BYTE", {
		ignoreCase: true,
	});
	static SET_MASKLEN = this.Identifier.newKeyword("SET_MASKLEN", {
		ignoreCase: true,
	});
	static SHA1 = this.Identifier.newKeyword("SHA1", { ignoreCase: true });
	static SHA2 = this.Identifier.newKeyword("SHA2", { ignoreCase: true });
	static SHA224 = this.Identifier.newKeyword("SHA224", { ignoreCase: true });
	static SHA256 = this.Identifier.newKeyword("SHA256", { ignoreCase: true });
	static SHA384 = this.Identifier.newKeyword("SHA384", { ignoreCase: true });
	static SHA512 = this.Identifier.newKeyword("SHA512", { ignoreCase: true });
	static SHARE = this.Identifier.newKeyword("SHARE", { ignoreCase: true });
	static SHARED = this.Identifier.newKeyword("SHARED", { ignoreCase: true });
	static SHAREDSPACE = this.Identifier.newKeyword("SHAREDSPACE", {
		ignoreCase: true,
	});
	static SHARED_POOL = this.Identifier.newKeyword("SHARED_POOL", {
		ignoreCase: true,
	});
	static SHARING = this.Identifier.newKeyword("SHARING", { ignoreCase: true });
	static SHOW = this.Identifier.newKeyword("SHOW", { ignoreCase: true });
	static SHRINK = this.Identifier.newKeyword("SHRINK", { ignoreCase: true });
	static SHUTDOWN = this.Identifier.newKeyword("SHUTDOWN", {
		ignoreCase: true,
	});
	static SID = this.Identifier.newKeyword("SID", { ignoreCase: true });
	static SIGN = this.Identifier.newKeyword("SIGN", { ignoreCase: true });
	static SIGNAL = this.Identifier.newKeyword("SIGNAL", { ignoreCase: true });
	static SIGNATURE = this.Identifier.newKeyword("SIGNATURE", {
		ignoreCase: true,
	});
	static SIGNED = this.Identifier.newKeyword("SIGNED", { ignoreCase: true });
	static SIGNTYPE = this.Identifier.newKeyword("SIGNTYPE", {
		ignoreCase: true,
	});
	static SIMILAR = this.Identifier.newKeyword("SIMILAR", { ignoreCase: true });
	static SIMPLE = this.Identifier.newKeyword("SIMPLE", { ignoreCase: true });
	static SIMPLE_INTEGER = this.Identifier.newKeyword("SIMPLE_INTEGER", {
		ignoreCase: true,
	});
	static SIN = this.Identifier.newKeyword("SIN", { ignoreCase: true });
	static SIND = this.Identifier.newKeyword("SIND", { ignoreCase: true });
	static SINGLE = this.Identifier.newKeyword("SINGLE", { ignoreCase: true });
	static SINH = this.Identifier.newKeyword("SINH", { ignoreCase: true });
	static SITE = this.Identifier.newKeyword("SITE", { ignoreCase: true });
	static SIZE = this.Identifier.newKeyword("SIZE", { ignoreCase: true });
	static SI_AVERAGECOLOR = this.Identifier.newKeyword("SI_AVERAGECOLOR", {
		ignoreCase: true,
	});
	static SI_COLOR = this.Identifier.newKeyword("SI_COLOR", {
		ignoreCase: true,
	});
	static SI_COLORHISTOGRAM = this.Identifier.newKeyword("SI_COLORHISTOGRAM", {
		ignoreCase: true,
	});
	static SI_FEATURELIST = this.Identifier.newKeyword("SI_FEATURELIST", {
		ignoreCase: true,
	});
	static SI_POSITIONALCOLOR = this.Identifier.newKeyword("SI_POSITIONALCOLOR", {
		ignoreCase: true,
	});
	static SI_STILLIMAGE = this.Identifier.newKeyword("SI_STILLIMAGE", {
		ignoreCase: true,
	});
	static SI_TEXTURE = this.Identifier.newKeyword("SI_TEXTURE", {
		ignoreCase: true,
	});
	static SKIP = this.Identifier.newKeyword("SKIP", { ignoreCase: true });
	static SKIP_LOCKED = this.Identifier.newKeyword("SKIP_LOCKED", {
		ignoreCase: true,
	});
	static SLAVE = this.Identifier.newKeyword("SLAVE", { ignoreCase: true });
	static SLEEP = this.Identifier.newKeyword("SLEEP", { ignoreCase: true });
	static SLOPE = this.Identifier.newKeyword("SLOPE", { ignoreCase: true });
	static SMALLDATETIME = this.Identifier.newKeyword("SMALLDATETIME", {
		ignoreCase: true,
	});
	static SMALLDATETIMEFROMPARTS = this.Identifier.newKeyword(
		"SMALLDATETIMEFROMPARTS",
		{
			ignoreCase: true,
		},
	);
	static SMALLFILE = this.Identifier.newKeyword("SMALLFILE", {
		ignoreCase: true,
	});
	static SMALLINT = this.Identifier.newKeyword("SMALLINT", {
		ignoreCase: true,
	});
	static SMALLMONEY = this.Identifier.newKeyword("SMALLMONEY", {
		ignoreCase: true,
	});
	static SNAPSHOT = this.Identifier.newKeyword("SNAPSHOT", {
		ignoreCase: true,
	});
	static SOCKET = this.Identifier.newKeyword("SOCKET", { ignoreCase: true });
	static SOME = this.Identifier.newKeyword("SOME", { ignoreCase: true });
	static SORT = this.Identifier.newKeyword("SORT", { ignoreCase: true });
	static SOUNDEX = this.Identifier.newKeyword("SOUNDEX", { ignoreCase: true });
	static SOUNDS = this.Identifier.newKeyword("SOUNDS", { ignoreCase: true });
	static SOURCE = this.Identifier.newKeyword("SOURCE", { ignoreCase: true });
	static SOURCE_FILE_DIRECTORY = this.Identifier.newKeyword(
		"SOURCE_FILE_DIRECTORY",
		{
			ignoreCase: true,
		},
	);
	static SOURCE_FILE_NAME_CONVERT = this.Identifier.newKeyword(
		"SOURCE_FILE_NAME_CONVERT",
		{
			ignoreCase: true,
		},
	);
	static SPACE = this.Identifier.newKeyword("SPACE", { ignoreCase: true });
	static SPATIAL = this.Identifier.newKeyword("SPATIAL", { ignoreCase: true });
	static SPECIFIC = this.Identifier.newKeyword("SPECIFIC", {
		ignoreCase: true,
	});
	static SPECIFICATION = this.Identifier.newKeyword("SPECIFICATION", {
		ignoreCase: true,
	});
	static SPFILE = this.Identifier.newKeyword("SPFILE", { ignoreCase: true });
	static SPLIT = this.Identifier.newKeyword("SPLIT", { ignoreCase: true });
	static SPLIT_PART = this.Identifier.newKeyword("SPLIT_PART", {
		ignoreCase: true,
	});
	static SQL = this.Identifier.newKeyword("SQL", { ignoreCase: true });
	static SQLCODE = this.Identifier.newKeyword("SQLCODE", { ignoreCase: true });
	static SQLERRM = this.Identifier.newKeyword("SQLERRM", { ignoreCase: true });
	static SQLEXCEPTION = this.Identifier.newKeyword("SQLEXCEPTION", {
		ignoreCase: true,
	});
	static SQLITE_COMPILEOPTION_GET = this.Identifier.newKeyword(
		"SQLITE_COMPILEOPTION_GET",
		{
			ignoreCase: true,
		},
	);
	static SQLITE_COMPILEOPTION_USED = this.Identifier.newKeyword(
		"SQLITE_COMPILEOPTION_USED",
		{
			ignoreCase: true,
		},
	);
	static SQLITE_OFFSET = this.Identifier.newKeyword("SQLITE_OFFSET", {
		ignoreCase: true,
	});
	static SQLITE_SOURCE_ID = this.Identifier.newKeyword("SQLITE_SOURCE_ID", {
		ignoreCase: true,
	});
	static SQLITE_VERSION = this.Identifier.newKeyword("SQLITE_VERSION", {
		ignoreCase: true,
	});
	static SQLSTATE = this.Identifier.newKeyword("SQLSTATE", {
		ignoreCase: true,
	});
	static SQLWARNING = this.Identifier.newKeyword("SQLWARNING", {
		ignoreCase: true,
	});
	static SQUARE = this.Identifier.newKeyword("SQUARE", { ignoreCase: true });
	static SQL_BIG_RESULT = this.Identifier.newKeyword("SQL_BIG_RESULT", {
		ignoreCase: true,
	});
	static SQL_CACHE = this.Identifier.newKeyword("SQL_CACHE", {
		ignoreCase: true,
	});
	static SQL_CALC_FOUND_ROWS = this.Identifier.newKeyword(
		"SQL_CALC_FOUND_ROWS",
		{
			ignoreCase: true,
		},
	);
	static SQL_MACRO = this.Identifier.newKeyword("SQL_MACRO", {
		ignoreCase: true,
	});
	static SQL_SMALL_RESULT = this.Identifier.newKeyword("SQL_SMALL_RESULT", {
		ignoreCase: true,
	});
	static SQL_VARIANT = this.Identifier.newKeyword("SQL_VARIANT", {
		ignoreCase: true,
	});
	static SQL_VARIANT_PROPERTY = this.Identifier.newKeyword(
		"SQL_VARIANT_PROPERTY",
		{
			ignoreCase: true,
		},
	);
	static SQRT = this.Identifier.newKeyword("SQRT", { ignoreCase: true });
	static SSL = this.Identifier.newKeyword("SSL", { ignoreCase: true });
	static STANDARD = this.Identifier.newKeyword("STANDARD", {
		ignoreCase: true,
	});
	static STANDBY = this.Identifier.newKeyword("STANDBY", { ignoreCase: true });
	static STANDBYS = this.Identifier.newKeyword("STANDBYS", {
		ignoreCase: true,
	});
	static START = this.Identifier.newKeyword("START", { ignoreCase: true });
	static STARTING = this.Identifier.newKeyword("STARTING", {
		ignoreCase: true,
	});
	static STARTS = this.Identifier.newKeyword("STARTS", { ignoreCase: true });
	static STARTS_WITH = this.Identifier.newKeyword("STARTS_WITH", {
		ignoreCase: true,
	});
	static STATE = this.Identifier.newKeyword("STATE", { ignoreCase: true });
	static STATEMENT = this.Identifier.newKeyword("STATEMENT", {
		ignoreCase: true,
	});
	static STATEMENTS = this.Identifier.newKeyword("STATEMENTS", {
		ignoreCase: true,
	});
	static STATEMENT_DIGEST = this.Identifier.newKeyword("STATEMENT_DIGEST", {
		ignoreCase: true,
	});
	static STATEMENT_DIGEST_TEXT = this.Identifier.newKeyword(
		"STATEMENT_DIGEST_TEXT",
		{
			ignoreCase: true,
		},
	);
	static STATEMENT_ID = this.Identifier.newKeyword("STATEMENT_ID", {
		ignoreCase: true,
	});
	static STATEMENT_TIMESTAMP = this.Identifier.newKeyword(
		"STATEMENT_TIMESTAMP",
		{
			ignoreCase: true,
		},
	);
	static STATIC = this.Identifier.newKeyword("STATIC", { ignoreCase: true });
	static STATISTICS = this.Identifier.newKeyword("STATISTICS", {
		ignoreCase: true,
	});
	static STATS = this.Identifier.newKeyword("STATS", { ignoreCase: true });
	static STATS_AUTO_RECALC = this.Identifier.newKeyword("STATS_AUTO_RECALC", {
		ignoreCase: true,
	});
	static STATS_PERSISTENT = this.Identifier.newKeyword("STATS_PERSISTENT", {
		ignoreCase: true,
	});
	static STATS_SAMPLE_PAGES = this.Identifier.newKeyword("STATS_SAMPLE_PAGES", {
		ignoreCase: true,
	});
	static STD = this.Identifier.newKeyword("STD", { ignoreCase: true });
	static STDDEV = this.Identifier.newKeyword("STDDEV", { ignoreCase: true });
	static STDDEV_POP = this.Identifier.newKeyword("STDDEV_POP", {
		ignoreCase: true,
	});
	static STDDEV_SAMP = this.Identifier.newKeyword("STDDEV_SAMP", {
		ignoreCase: true,
	});
	static STOP = this.Identifier.newKeyword("STOP", { ignoreCase: true });
	static STORAGE = this.Identifier.newKeyword("STORAGE", { ignoreCase: true });
	static STORE = this.Identifier.newKeyword("STORE", { ignoreCase: true });
	static STORED = this.Identifier.newKeyword("STORED", { ignoreCase: true });
	static STR = this.Identifier.newKeyword("STR", { ignoreCase: true });
	static STRAIGHT_JOIN = this.Identifier.newKeyword("STRAIGHT_JOIN", {
		ignoreCase: true,
	});
	static STRCMP = this.Identifier.newKeyword("STRCMP", { ignoreCase: true });
	static STRICT = this.Identifier.newKeyword("STRICT", { ignoreCase: true });
	static STRFTIME = this.Identifier.newKeyword("STRFTIME", {
		ignoreCase: true,
	});
	static STRING = this.Identifier.newKeyword("STRING", { ignoreCase: true });
	static STRING_AGG = this.Identifier.newKeyword("STRING_AGG", {
		ignoreCase: true,
	});
	static STRING_SPLIT = this.Identifier.newKeyword("STRING_SPLIT", {
		ignoreCase: true,
	});
	static STRING_TO_ARRAY = this.Identifier.newKeyword("STRING_TO_ARRAY", {
		ignoreCase: true,
	});
	static STRING_TO_TABLE = this.Identifier.newKeyword("STRING_TO_TABLE", {
		ignoreCase: true,
	});
	static STRIP = this.Identifier.newKeyword("STRIP", { ignoreCase: true });
	static STRIPE_COLUMNS = this.Identifier.newKeyword("STRIPE_COLUMNS", {
		ignoreCase: true,
	});
	static STRIPE_WIDTH = this.Identifier.newKeyword("STRIPE_WIDTH", {
		ignoreCase: true,
	});
	static STRPOS = this.Identifier.newKeyword("STRPOS", { ignoreCase: true });
	static STRUCT = this.Identifier.newKeyword("STRUCT", { ignoreCase: true });
	static STRUCTURE = this.Identifier.newKeyword("STRUCTURE", {
		ignoreCase: true,
	});
	static STR_TO_DATE = this.Identifier.newKeyword("STR_TO_DATE", {
		ignoreCase: true,
	});
	static STUFF = this.Identifier.newKeyword("STUFF", { ignoreCase: true });
	static ST_AREA = this.Identifier.newKeyword("ST_AREA", { ignoreCase: true });
	static ST_ASBINARY = this.Identifier.newKeyword("ST_ASBINARY", {
		ignoreCase: true,
	});
	static ST_ASGEOJSON = this.Identifier.newKeyword("ST_ASGEOJSON", {
		ignoreCase: true,
	});
	static ST_ASTEXT = this.Identifier.newKeyword("ST_ASTEXT", {
		ignoreCase: true,
	});
	static ST_BUFFER = this.Identifier.newKeyword("ST_BUFFER", {
		ignoreCase: true,
	});
	static ST_BUFFER_STRATEGY = this.Identifier.newKeyword("ST_BUFFER_STRATEGY", {
		ignoreCase: true,
	});
	static ST_CENTROID = this.Identifier.newKeyword("ST_CENTROID", {
		ignoreCase: true,
	});
	static ST_COLLECT = this.Identifier.newKeyword("ST_COLLECT", {
		ignoreCase: true,
	});
	static ST_CONTAINS = this.Identifier.newKeyword("ST_CONTAINS", {
		ignoreCase: true,
	});
	static ST_CONVEXHULL = this.Identifier.newKeyword("ST_CONVEXHULL", {
		ignoreCase: true,
	});
	static ST_CROSSES = this.Identifier.newKeyword("ST_CROSSES", {
		ignoreCase: true,
	});
	static ST_DIFFERENCE = this.Identifier.newKeyword("ST_DIFFERENCE", {
		ignoreCase: true,
	});
	static ST_DIMENSION = this.Identifier.newKeyword("ST_DIMENSION", {
		ignoreCase: true,
	});
	static ST_DISJOINT = this.Identifier.newKeyword("ST_DISJOINT", {
		ignoreCase: true,
	});
	static ST_DISTANCE = this.Identifier.newKeyword("ST_DISTANCE", {
		ignoreCase: true,
	});
	static ST_DISTANCE_SPHERE = this.Identifier.newKeyword("ST_DISTANCE_SPHERE", {
		ignoreCase: true,
	});
	static ST_ENDPOINT = this.Identifier.newKeyword("ST_ENDPOINT", {
		ignoreCase: true,
	});
	static ST_ENVELOPE = this.Identifier.newKeyword("ST_ENVELOPE", {
		ignoreCase: true,
	});
	static ST_EQUALS = this.Identifier.newKeyword("ST_EQUALS", {
		ignoreCase: true,
	});
	static ST_EXTERIORRING = this.Identifier.newKeyword("ST_EXTERIORRING", {
		ignoreCase: true,
	});
	static ST_FRECHETDISTANCE = this.Identifier.newKeyword("ST_FRECHETDISTANCE", {
		ignoreCase: true,
	});
	static ST_GEOHASH = this.Identifier.newKeyword("ST_GEOHASH", {
		ignoreCase: true,
	});
	static ST_GEOMCOLLFROMTEXT = this.Identifier.newKeyword(
		"ST_GEOMCOLLFROMTEXT",
		{
			ignoreCase: true,
		},
	);
	static ST_GEOMCOLLFROMWKB = this.Identifier.newKeyword("ST_GEOMCOLLFROMWKB", {
		ignoreCase: true,
	});
	static ST_GEOMETRYN = this.Identifier.newKeyword("ST_GEOMETRYN", {
		ignoreCase: true,
	});
	static ST_GEOMETRYTYPE = this.Identifier.newKeyword("ST_GEOMETRYTYPE", {
		ignoreCase: true,
	});
	static ST_GEOMFROMGEOJSON = this.Identifier.newKeyword("ST_GEOMFROMGEOJSON", {
		ignoreCase: true,
	});
	static ST_GEOMFROMTEXT = this.Identifier.newKeyword("ST_GEOMFROMTEXT", {
		ignoreCase: true,
	});
	static ST_GEOMFROMWKB = this.Identifier.newKeyword("ST_GEOMFROMWKB", {
		ignoreCase: true,
	});
	static ST_HAUSDORFFDISTANCE = this.Identifier.newKeyword(
		"ST_HAUSDORFFDISTANCE",
		{
			ignoreCase: true,
		},
	);
	static ST_INTERIORRINGN = this.Identifier.newKeyword("ST_INTERIORRINGN", {
		ignoreCase: true,
	});
	static ST_INTERSECTION = this.Identifier.newKeyword("ST_INTERSECTION", {
		ignoreCase: true,
	});
	static ST_INTERSECTS = this.Identifier.newKeyword("ST_INTERSECTS", {
		ignoreCase: true,
	});
	static ST_ISCLOSED = this.Identifier.newKeyword("ST_ISCLOSED", {
		ignoreCase: true,
	});
	static ST_ISEMPTY = this.Identifier.newKeyword("ST_ISEMPTY", {
		ignoreCase: true,
	});
	static ST_ISSIMPLE = this.Identifier.newKeyword("ST_ISSIMPLE", {
		ignoreCase: true,
	});
	static ST_ISVALID = this.Identifier.newKeyword("ST_ISVALID", {
		ignoreCase: true,
	});
	static ST_LATFROMGEOHASH = this.Identifier.newKeyword("ST_LATFROMGEOHASH", {
		ignoreCase: true,
	});
	static ST_LATITUDE = this.Identifier.newKeyword("ST_LATITUDE", {
		ignoreCase: true,
	});
	static ST_LENGTH = this.Identifier.newKeyword("ST_LENGTH", {
		ignoreCase: true,
	});
	static ST_LINEFROMTEXT = this.Identifier.newKeyword("ST_LINEFROMTEXT", {
		ignoreCase: true,
	});
	static ST_LINEFROMWKB = this.Identifier.newKeyword("ST_LINEFROMWKB", {
		ignoreCase: true,
	});
	static ST_LINEINTERPOLATEPOINT = this.Identifier.newKeyword(
		"ST_LINEINTERPOLATEPOINT",
		{
			ignoreCase: true,
		},
	);
	static ST_LINEINTERPOLATEPOINTS = this.Identifier.newKeyword(
		"ST_LINEINTERPOLATEPOINTS",
		{
			ignoreCase: true,
		},
	);
	static ST_LONGFROMGEOHASH = this.Identifier.newKeyword("ST_LONGFROMGEOHASH", {
		ignoreCase: true,
	});
	static ST_LONGITUDE = this.Identifier.newKeyword("ST_LONGITUDE", {
		ignoreCase: true,
	});
	static ST_MAKEENVELOPE = this.Identifier.newKeyword("ST_MAKEENVELOPE", {
		ignoreCase: true,
	});
	static ST_MLINEFROMTEXT = this.Identifier.newKeyword("ST_MLINEFROMTEXT", {
		ignoreCase: true,
	});
	static ST_MLINEFROMWKB = this.Identifier.newKeyword("ST_MLINEFROMWKB", {
		ignoreCase: true,
	});
	static ST_MPOINTFROMTEXT = this.Identifier.newKeyword("ST_MPOINTFROMTEXT", {
		ignoreCase: true,
	});
	static ST_MPOINTFROMWKB = this.Identifier.newKeyword("ST_MPOINTFROMWKB", {
		ignoreCase: true,
	});
	static ST_MPOLYFROMTEXT = this.Identifier.newKeyword("ST_MPOLYFROMTEXT", {
		ignoreCase: true,
	});
	static ST_MPOLYFROMWKB = this.Identifier.newKeyword("ST_MPOLYFROMWKB", {
		ignoreCase: true,
	});
	static ST_NUMGEOMETRIES = this.Identifier.newKeyword("ST_NUMGEOMETRIES", {
		ignoreCase: true,
	});
	static ST_NUMINTERIORRING = this.Identifier.newKeyword("ST_NUMINTERIORRING", {
		ignoreCase: true,
	});
	static ST_NUMPOINTS = this.Identifier.newKeyword("ST_NUMPOINTS", {
		ignoreCase: true,
	});
	static ST_OVERLAPS = this.Identifier.newKeyword("ST_OVERLAPS", {
		ignoreCase: true,
	});
	static ST_POINTATDISTANCE = this.Identifier.newKeyword("ST_POINTATDISTANCE", {
		ignoreCase: true,
	});
	static ST_POINTFROMGEOHASH = this.Identifier.newKeyword(
		"ST_POINTFROMGEOHASH",
		{
			ignoreCase: true,
		},
	);
	static ST_POINTFROMTEXT = this.Identifier.newKeyword("ST_POINTFROMTEXT", {
		ignoreCase: true,
	});
	static ST_POINTFROMWKB = this.Identifier.newKeyword("ST_POINTFROMWKB", {
		ignoreCase: true,
	});
	static ST_POINTN = this.Identifier.newKeyword("ST_POINTN", {
		ignoreCase: true,
	});
	static ST_POLYFROMTEXT = this.Identifier.newKeyword("ST_POLYFROMTEXT", {
		ignoreCase: true,
	});
	static ST_POLYFROMWKB = this.Identifier.newKeyword("ST_POLYFROMWKB", {
		ignoreCase: true,
	});
	static ST_SIMPLIFY = this.Identifier.newKeyword("ST_SIMPLIFY", {
		ignoreCase: true,
	});
	static ST_SRID = this.Identifier.newKeyword("ST_SRID", { ignoreCase: true });
	static ST_STARTPOINT = this.Identifier.newKeyword("ST_STARTPOINT", {
		ignoreCase: true,
	});
	static ST_SWAPXY = this.Identifier.newKeyword("ST_SWAPXY", {
		ignoreCase: true,
	});
	static ST_SYMDIFFERENCE = this.Identifier.newKeyword("ST_SYMDIFFERENCE", {
		ignoreCase: true,
	});
	static ST_TOUCHES = this.Identifier.newKeyword("ST_TOUCHES", {
		ignoreCase: true,
	});
	static ST_TRANSFORM = this.Identifier.newKeyword("ST_TRANSFORM", {
		ignoreCase: true,
	});
	static ST_UNION = this.Identifier.newKeyword("ST_UNION", {
		ignoreCase: true,
	});
	static ST_VALIDATE = this.Identifier.newKeyword("ST_VALIDATE", {
		ignoreCase: true,
	});
	static ST_WITHIN = this.Identifier.newKeyword("ST_WITHIN", {
		ignoreCase: true,
	});
	static ST_X = this.Identifier.newKeyword("ST_X", { ignoreCase: true });
	static ST_Y = this.Identifier.newKeyword("ST_Y", { ignoreCase: true });
	static SUBDATE = this.Identifier.newKeyword("SUBDATE", { ignoreCase: true });
	static SUBJECT = this.Identifier.newKeyword("SUBJECT", { ignoreCase: true });
	static SUBPARTITION = this.Identifier.newKeyword("SUBPARTITION", {
		ignoreCase: true,
	});
	static SUBPARTITIONS = this.Identifier.newKeyword("SUBPARTITIONS", {
		ignoreCase: true,
	});
	static SUBSCRIPTION = this.Identifier.newKeyword("SUBSCRIPTION", {
		ignoreCase: true,
	});
	static SUBSET = this.Identifier.newKeyword("SUBSET", { ignoreCase: true });
	static SUBSTITUTABLE = this.Identifier.newKeyword("SUBSTITUTABLE", {
		ignoreCase: true,
	});
	static SUBSTR = this.Identifier.newKeyword("SUBSTR", { ignoreCase: true });
	static SUBSTR4 = this.Identifier.newKeyword("SUBSTR4", { ignoreCase: true });
	static SUBSTRB = this.Identifier.newKeyword("SUBSTRB", { ignoreCase: true });
	static SUBSTRING = this.Identifier.newKeyword("SUBSTRING", {
		ignoreCase: true,
	});
	static SUBSTRING_INDEX = this.Identifier.newKeyword("SUBSTRING_INDEX", {
		ignoreCase: true,
	});
	static SUBTIME = this.Identifier.newKeyword("SUBTIME", { ignoreCase: true });
	static SUBTYPE = this.Identifier.newKeyword("SUBTYPE", { ignoreCase: true });
	static SUCCESSFUL = this.Identifier.newKeyword("SUCCESSFUL", {
		ignoreCase: true,
	});
	static SUM = this.Identifier.newKeyword("SUM", { ignoreCase: true });
	static SUMMARY = this.Identifier.newKeyword("SUMMARY", { ignoreCase: true });
	static SUPPLEMENTAL = this.Identifier.newKeyword("SUPPLEMENTAL", {
		ignoreCase: true,
	});
	static SUPPRESS_REDUNDANT_UPDATES_TRIGGER = this.Identifier.newKeyword(
		"SUPPRESS_REDUNDANT_UPDATES_TRIGGER",
		{ ignoreCase: true },
	);
	static SUSPEND = this.Identifier.newKeyword("SUSPEND", { ignoreCase: true });
	static SWITCH = this.Identifier.newKeyword("SWITCH", { ignoreCase: true });
	static SWITCHOFFSET = this.Identifier.newKeyword("SWITCHOFFSET", {
		ignoreCase: true,
	});
	static SWITCHOVER = this.Identifier.newKeyword("SWITCHOVER", {
		ignoreCase: true,
	});
	static SYMMETRIC = this.Identifier.newKeyword("SYMMETRIC", {
		ignoreCase: true,
	});
	static SYNC = this.Identifier.newKeyword("SYNC", { ignoreCase: true });
	static SYNCHRONOUS = this.Identifier.newKeyword("SYNCHRONOUS", {
		ignoreCase: true,
	});
	static SYNONYM = this.Identifier.newKeyword("SYNONYM", { ignoreCase: true });
	static SYS = this.Identifier.newKeyword("SYS", { ignoreCase: true });
	static SYSAUX = this.Identifier.newKeyword("SYSAUX", { ignoreCase: true });
	static SYSDATE = this.Identifier.newKeyword("SYSDATE", { ignoreCase: true });
	static SYSDATETIME = this.Identifier.newKeyword("SYSDATETIME", {
		ignoreCase: true,
	});
	static SYSDATETIMEOFFSET = this.Identifier.newKeyword("SYSDATETIMEOFFSET", {
		ignoreCase: true,
	});
	static SYSTEM = this.Identifier.newKeyword("SYSTEM", { ignoreCase: true });
	static SYSTEM_USER = this.Identifier.newKeyword("SYSTEM_USER", {
		ignoreCase: true,
	});
	static SYSTIMESTAMP = this.Identifier.newKeyword("SYSTIMESTAMP", {
		ignoreCase: true,
	});
	static SYSUTCDATETIME = this.Identifier.newKeyword("SYSUTCDATETIME", {
		ignoreCase: true,
	});
	static SYS_CONTEXT = this.Identifier.newKeyword("SYS_CONTEXT", {
		ignoreCase: true,
	});
	static T = this.Identifier.newKeyword("T", { ignoreCase: true });
	static TABAUTH = this.Identifier.newKeyword("TABAUTH", { ignoreCase: true });
	static TABLE = this.Identifier.newKeyword("TABLE", { ignoreCase: true });
	static TABLES = this.Identifier.newKeyword("TABLES", { ignoreCase: true });
	static TABLESAMPLE = this.Identifier.newKeyword("TABLESAMPLE", {
		ignoreCase: true,
	});
	static TABLESPACE = this.Identifier.newKeyword("TABLESPACE", {
		ignoreCase: true,
	});
	static TABLE_TO_XML = this.Identifier.newKeyword("TABLE_TO_XML", {
		ignoreCase: true,
	});
	static TABLE_TO_XMLSCHEMA = this.Identifier.newKeyword("TABLE_TO_XMLSCHEMA", {
		ignoreCase: true,
	});
	static TABLE_TO_XML_AND_XMLSCHEMA = this.Identifier.newKeyword(
		"TABLE_TO_XML_AND_XMLSCHEMA",
		{ ignoreCase: true },
	);
	static TAG = this.Identifier.newKeyword("TAG", { ignoreCase: true });
	static TAN = this.Identifier.newKeyword("TAN", { ignoreCase: true });
	static TAND = this.Identifier.newKeyword("TAND", { ignoreCase: true });
	static TANH = this.Identifier.newKeyword("TANH", { ignoreCase: true });
	static TARGET = this.Identifier.newKeyword("TARGET", { ignoreCase: true });
	static TDO = this.Identifier.newKeyword("TDO", { ignoreCase: true });
	static TEMP = this.Identifier.newKeyword("TEMP", { ignoreCase: true });
	static TEMPFILE = this.Identifier.newKeyword("TEMPFILE", {
		ignoreCase: true,
	});
	static TEMPLATE = this.Identifier.newKeyword("TEMPLATE", {
		ignoreCase: true,
	});
	static TEMPORARY = this.Identifier.newKeyword("TEMPORARY", {
		ignoreCase: true,
	});
	static TEMPTABLE = this.Identifier.newKeyword("TEMPTABLE", {
		ignoreCase: true,
	});
	static TERMINATED = this.Identifier.newKeyword("TERMINATED", {
		ignoreCase: true,
	});
	static TEST = this.Identifier.newKeyword("TEST", { ignoreCase: true });
	static TEXT = this.Identifier.newKeyword("TEXT", { ignoreCase: true });
	static TEXTSIZE = this.Identifier.newKeyword("TEXTSIZE", {
		ignoreCase: true,
	});
	static TEXTPTR = this.Identifier.newKeyword("TEXTPTR", { ignoreCase: true });
	static TEXTVALID = this.Identifier.newKeyword("TEXTVALID", {
		ignoreCase: true,
	});
	static THAN = this.Identifier.newKeyword("THAN", { ignoreCase: true });
	static THEN = this.Identifier.newKeyword("THEN", { ignoreCase: true });
	static THREAD = this.Identifier.newKeyword("THREAD", { ignoreCase: true });
	static THREAD_PRIORITY = this.Identifier.newKeyword("THREAD_PRIORITY", {
		ignoreCase: true,
	});
	static THROUGH = this.Identifier.newKeyword("THROUGH", { ignoreCase: true });
	static THROW = this.Identifier.newKeyword("THROW", { ignoreCase: true });
	static TIER = this.Identifier.newKeyword("TIER", { ignoreCase: true });
	static TIES = this.Identifier.newKeyword("TIES", { ignoreCase: true });
	static TIME = this.Identifier.newKeyword("TIME", { ignoreCase: true });
	static TIMEDIFF = this.Identifier.newKeyword("TIMEDIFF", {
		ignoreCase: true,
	});
	static TIMEFROMPARTS = this.Identifier.newKeyword("TIMEFROMPARTS", {
		ignoreCase: true,
	});
	static TIMEOFDAY = this.Identifier.newKeyword("TIMEOFDAY", {
		ignoreCase: true,
	});
	static TIMEOUT = this.Identifier.newKeyword("TIMEOUT", { ignoreCase: true });
	static TIMESTAMP = this.Identifier.newKeyword("TIMESTAMP", {
		ignoreCase: true,
	});
	static TIMESTAMPADD = this.Identifier.newKeyword("TIMESTAMPADD", {
		ignoreCase: true,
	});
	static TIMESTAMPDIFF = this.Identifier.newKeyword("TIMESTAMPDIFF", {
		ignoreCase: true,
	});
	static TIMESTAMPZ = this.Identifier.newKeyword("TIMESTAMPZ", {
		ignoreCase: true,
	});
	static TIMEZONE_HOUR = this.Identifier.newKeyword("TIMEZONE_HOUR", {
		ignoreCase: true,
	});
	static TIMEZONE_MINUTE = this.Identifier.newKeyword("TIMEZONE_MINUTE", {
		ignoreCase: true,
	});
	static TIME_FORMAT = this.Identifier.newKeyword("TIME_FORMAT", {
		ignoreCase: true,
	});
	static TIME_TO_SEC = this.Identifier.newKeyword("TIME_TO_SEC", {
		ignoreCase: true,
	});
	static TIME_ZONE = this.Identifier.newKeyword("TIME_ZONE", {
		ignoreCase: true,
	});
	static TIMING = this.Identifier.newKeyword("TIMING", { ignoreCase: true });
	static TINYBLOB = this.Identifier.newKeyword("TINYBLOB", {
		ignoreCase: true,
	});
	static TINYINT = this.Identifier.newKeyword("TINYINT", { ignoreCase: true });
	static TINYTEXT = this.Identifier.newKeyword("TINYTEXT", {
		ignoreCase: true,
	});
	static TO = this.Identifier.newKeyword("TO", { ignoreCase: true });
	static TODATETIMEOFFSET = this.Identifier.newKeyword("TODATETIMEOFFSET", {
		ignoreCase: true,
	});
	static TOP = this.Identifier.newKeyword("TOP", { ignoreCase: true });
	static TOPLEVEL = this.Identifier.newKeyword("TOPLEVEL", {
		ignoreCase: true,
	});
	static TOTAL = this.Identifier.newKeyword("TOTAL", { ignoreCase: true });
	static TOTAL_CHANGES = this.Identifier.newKeyword("TOTAL_CHANGES", {
		ignoreCase: true,
	});
	static TO_ASCII = this.Identifier.newKeyword("TO_ASCII", {
		ignoreCase: true,
	});
	static TO_BASE64 = this.Identifier.newKeyword("TO_BASE64", {
		ignoreCase: true,
	});
	static TO_BLOB = this.Identifier.newKeyword("TO_BLOB", { ignoreCase: true });
	static TO_CHAR = this.Identifier.newKeyword("TO_CHAR", { ignoreCase: true });
	static TO_CLOB = this.Identifier.newKeyword("TO_CLOB", { ignoreCase: true });
	static TO_DATE = this.Identifier.newKeyword("TO_DATE", { ignoreCase: true });
	static TO_DAYS = this.Identifier.newKeyword("TO_DAYS", { ignoreCase: true });
	static TO_HEX = this.Identifier.newKeyword("TO_HEX", { ignoreCase: true });
	static TO_JSON = this.Identifier.newKeyword("TO_JSON", { ignoreCase: true });
	static TO_LOB = this.Identifier.newKeyword("TO_LOB", { ignoreCase: true });
	static TO_NCLOB = this.Identifier.newKeyword("TO_NCLOB", {
		ignoreCase: true,
	});
	static TO_NUMBER = this.Identifier.newKeyword("TO_NUMBER", {
		ignoreCase: true,
	});
	static TO_SECONDS = this.Identifier.newKeyword("TO_SECONDS", {
		ignoreCase: true,
	});
	static TO_TIMESTAMP = this.Identifier.newKeyword("TO_TIMESTAMP", {
		ignoreCase: true,
	});
	static TO_TSQUERY = this.Identifier.newKeyword("TO_TSQUERY", {
		ignoreCase: true,
	});
	static TO_TSVECTOR = this.Identifier.newKeyword("TO_TSVECTOR", {
		ignoreCase: true,
	});
	static TRACE = this.Identifier.newKeyword("TRACE", { ignoreCase: true });
	static TRACKING = this.Identifier.newKeyword("TRACKING", {
		ignoreCase: true,
	});
	static TRAILING = this.Identifier.newKeyword("TRAILING", {
		ignoreCase: true,
	});
	static TRAN = this.Identifier.newKeyword("TRAN", { ignoreCase: true });
	static TRANSACTION = this.Identifier.newKeyword("TRANSACTION", {
		ignoreCase: true,
	});
	static TRANSACTIONAL = this.Identifier.newKeyword("TRANSACTIONAL", {
		ignoreCase: true,
	});
	static TRANSACTION_TIMESTAMP = this.Identifier.newKeyword(
		"TRANSACTION_TIMESTAMP",
		{
			ignoreCase: true,
		},
	);
	static TRANSFORM = this.Identifier.newKeyword("TRANSFORM", {
		ignoreCase: true,
	});
	static TRANSLATE = this.Identifier.newKeyword("TRANSLATE", {
		ignoreCase: true,
	});
	static TRANSLATION = this.Identifier.newKeyword("TRANSLATION", {
		ignoreCase: true,
	});
	static TRIGGER = this.Identifier.newKeyword("TRIGGER", { ignoreCase: true });
	static TRIGGERS = this.Identifier.newKeyword("TRIGGERS", {
		ignoreCase: true,
	});
	static TRIGGER_NESTLEVEL = this.Identifier.newKeyword("TRIGGER_NESTLEVEL", {
		ignoreCase: true,
	});
	static TRIM = this.Identifier.newKeyword("TRIM", { ignoreCase: true });
	static TRIM_ARRAY = this.Identifier.newKeyword("TRIM_ARRAY", {
		ignoreCase: true,
	});
	static TRIM_SCALE = this.Identifier.newKeyword("TRIM_SCALE", {
		ignoreCase: true,
	});
	static TRUE = this.Identifier.newKeyword("TRUE", { ignoreCase: true });
	static TRUNC = this.Identifier.newKeyword("TRUNC", { ignoreCase: true });
	static TRUNCATE = this.Identifier.newKeyword("TRUNCATE", {
		ignoreCase: true,
	});
	static TRUST = this.Identifier.newKeyword("TRUST", { ignoreCase: true });
	static TRUSTED = this.Identifier.newKeyword("TRUSTED", { ignoreCase: true });
	static TRY_CAST = this.Identifier.newKeyword("TRY_CAST", {
		ignoreCase: true,
	});
	static TRY_CONVERT = this.Identifier.newKeyword("TRY_CONVERT", {
		ignoreCase: true,
	});
	static TRY_PARSE = this.Identifier.newKeyword("TRY_PARSE", {
		ignoreCase: true,
	});
	static TS = this.Identifier.newKeyword("TS", { ignoreCase: true });
	static TSEQUAL = this.Identifier.newKeyword("TSEQUAL", { ignoreCase: true });
	static TSQUERY_PHRASE = this.Identifier.newKeyword("TSQUERY_PHRASE", {
		ignoreCase: true,
	});
	static TSVECTOR_TO_ARRAY = this.Identifier.newKeyword("TSVECTOR_TO_ARRAY", {
		ignoreCase: true,
	});
	static TSVECTOR_UPDATE_TRIGGER = this.Identifier.newKeyword(
		"TSVECTOR_UPDATE_TRIGGER",
		{
			ignoreCase: true,
		},
	);
	static TSVECTOR_UPDATE_TRIGGER_COLUMN = this.Identifier.newKeyword(
		"TSVECTOR_UPDATE_TRIGGER_COLUMN",
		{ ignoreCase: true },
	);
	static TS_DEBUG = this.Identifier.newKeyword("TS_DEBUG", {
		ignoreCase: true,
	});
	static TS_DELETE = this.Identifier.newKeyword("TS_DELETE", {
		ignoreCase: true,
	});
	static TS_FILTER = this.Identifier.newKeyword("TS_FILTER", {
		ignoreCase: true,
	});
	static TS_HEADLINE = this.Identifier.newKeyword("TS_HEADLINE", {
		ignoreCase: true,
	});
	static TS_LEXIZE = this.Identifier.newKeyword("TS_LEXIZE", {
		ignoreCase: true,
	});
	static TS_PARSE = this.Identifier.newKeyword("TS_PARSE", {
		ignoreCase: true,
	});
	static TS_RANK = this.Identifier.newKeyword("TS_RANK", { ignoreCase: true });
	static TS_RANK_CD = this.Identifier.newKeyword("TS_RANK_CD", {
		ignoreCase: true,
	});
	static TS_REWRITE = this.Identifier.newKeyword("TS_REWRITE", {
		ignoreCase: true,
	});
	static TS_STAT = this.Identifier.newKeyword("TS_STAT", { ignoreCase: true });
	static TS_TOKEN_TYPE = this.Identifier.newKeyword("TS_TOKEN_TYPE", {
		ignoreCase: true,
	});
	static TTGRIDMEMBERID = this.Identifier.newKeyword("TTGRIDMEMBERID", {
		ignoreCase: true,
	});
	static TTGRIDNODENAME = this.Identifier.newKeyword("TTGRIDNODENAME", {
		ignoreCase: true,
	});
	static TTGRIDUSERASSIGNEDNAME = this.Identifier.newKeyword(
		"TTGRIDUSERASSIGNEDNAME",
		{
			ignoreCase: true,
		},
	);
	static TYPE = this.Identifier.newKeyword("TYPE", { ignoreCase: true });
	static TYPEOF = this.Identifier.newKeyword("TYPEOF", { ignoreCase: true });
	static TYPES = this.Identifier.newKeyword("TYPES", { ignoreCase: true });
	static UCASE = this.Identifier.newKeyword("UCASE", { ignoreCase: true });
	static UDF = this.Identifier.newKeyword("UDF", { ignoreCase: true });
	static UID = this.Identifier.newKeyword("UID", { ignoreCase: true });
	static UNARCHIVED = this.Identifier.newKeyword("UNARCHIVED", {
		ignoreCase: true,
	});
	static UNBOUNDED = this.Identifier.newKeyword("UNBOUNDED", {
		ignoreCase: true,
	});
	static UNCOMMITTED = this.Identifier.newKeyword("UNCOMMITTED", {
		ignoreCase: true,
	});
	static UNCOMPRESS = this.Identifier.newKeyword("UNCOMPRESS", {
		ignoreCase: true,
	});
	static UNCOMPRESSED_LENGTH = this.Identifier.newKeyword(
		"UNCOMPRESSED_LENGTH",
		{
			ignoreCase: true,
		},
	);
	static UNDEFINED = this.Identifier.newKeyword("UNDEFINED", {
		ignoreCase: true,
	});
	static UNDER = this.Identifier.newKeyword("UNDER", { ignoreCase: true });
	static UNDO = this.Identifier.newKeyword("UNDO", { ignoreCase: true });
	static UNDOFILE = this.Identifier.newKeyword("UNDOFILE", {
		ignoreCase: true,
	});
	static UNDO_BUFFER_SIZE = this.Identifier.newKeyword("UNDO_BUFFER_SIZE", {
		ignoreCase: true,
	});
	static UNDROP = this.Identifier.newKeyword("UNDROP", { ignoreCase: true });
	static UNHEX = this.Identifier.newKeyword("UNHEX", { ignoreCase: true });
	static UNICODE = this.Identifier.newKeyword("UNICODE", { ignoreCase: true });
	static UNIFORM = this.Identifier.newKeyword("UNIFORM", { ignoreCase: true });
	static UNINSTALL = this.Identifier.newKeyword("UNINSTALL", {
		ignoreCase: true,
	});
	static UNION = this.Identifier.newKeyword("UNION", { ignoreCase: true });
	static UNIQUE = this.Identifier.newKeyword("UNIQUE", { ignoreCase: true });
	static UNIQUEIDENTIFIER = this.Identifier.newKeyword("UNIQUEIDENTIFIER", {
		ignoreCase: true,
	});
	static UNISTR = this.Identifier.newKeyword("UNISTR", { ignoreCase: true });
	static UNITE = this.Identifier.newKeyword("UNITE", { ignoreCase: true });
	static UNIXEPOCH = this.Identifier.newKeyword("UNIXEPOCH", {
		ignoreCase: true,
	});
	static UNIX_TIMESTAMP = this.Identifier.newKeyword("UNIX_TIMESTAMP", {
		ignoreCase: true,
	});
	static UNKNOWN = this.Identifier.newKeyword("UNKNOWN", { ignoreCase: true });
	static UNLIKELY = this.Identifier.newKeyword("UNLIKELY", {
		ignoreCase: true,
	});
	static UNLIMITED = this.Identifier.newKeyword("UNLIMITED", {
		ignoreCase: true,
	});
	static UNLISTEN = this.Identifier.newKeyword("UNLISTEN", {
		ignoreCase: true,
	});
	static UNLOCK = this.Identifier.newKeyword("UNLOCK", { ignoreCase: true });
	static UNLOGGED = this.Identifier.newKeyword("UNLOGGED", {
		ignoreCase: true,
	});
	static UNNEST = this.Identifier.newKeyword("UNNEST", { ignoreCase: true });
	static UNPIVOT = this.Identifier.newKeyword("UNPIVOT", { ignoreCase: true });
	static UNPLUG = this.Identifier.newKeyword("UNPLUG", { ignoreCase: true });
	static UNPROTECTED = this.Identifier.newKeyword("UNPROTECTED", {
		ignoreCase: true,
	});
	static UNQUIESCE = this.Identifier.newKeyword("UNQUIESCE", {
		ignoreCase: true,
	});
	static UNRECOVERABLE = this.Identifier.newKeyword("UNRECOVERABLE", {
		ignoreCase: true,
	});
	static UNSIGNED = this.Identifier.newKeyword("UNSIGNED", {
		ignoreCase: true,
	});
	static UNTIL = this.Identifier.newKeyword("UNTIL", { ignoreCase: true });
	static UNUSABLE = this.Identifier.newKeyword("UNUSABLE", {
		ignoreCase: true,
	});
	static UNUSED = this.Identifier.newKeyword("UNUSED", { ignoreCase: true });
	static UPDATE = this.Identifier.newKeyword("UPDATE", { ignoreCase: true });
	static UPDATED = this.Identifier.newKeyword("UPDATED", { ignoreCase: true });
	static UPDATETEXT = this.Identifier.newKeyword("UPDATETEXT", {
		ignoreCase: true,
	});
	static UPDATEXML = this.Identifier.newKeyword("UPDATEXML", {
		ignoreCase: true,
	});
	static UPDATING = this.Identifier.newKeyword("UPDATING", {
		ignoreCase: true,
	});
	static UPGRADE = this.Identifier.newKeyword("UPGRADE", { ignoreCase: true });
	static UPPER = this.Identifier.newKeyword("UPPER", { ignoreCase: true });
	static UPPER_INC = this.Identifier.newKeyword("UPPER_INC", {
		ignoreCase: true,
	});
	static UPPER_INF = this.Identifier.newKeyword("UPPER_INF", {
		ignoreCase: true,
	});
	static UPSERT = this.Identifier.newKeyword("UPSERT", { ignoreCase: true });
	static URITYPE = this.Identifier.newKeyword("URITYPE", { ignoreCase: true });
	static UROWID = this.Identifier.newKeyword("UROWID", { ignoreCase: true });
	static USAGE = this.Identifier.newKeyword("USAGE", { ignoreCase: true });
	static USE = this.Identifier.newKeyword("USE", { ignoreCase: true });
	static USER = this.Identifier.newKeyword("USER", { ignoreCase: true });
	static USERGROUP = this.Identifier.newKeyword("USERGROUP", {
		ignoreCase: true,
	});
	static USERS = this.Identifier.newKeyword("USERS", { ignoreCase: true });
	static USER_DATA = this.Identifier.newKeyword("USER_DATA", {
		ignoreCase: true,
	});
	static USER_NAME = this.Identifier.newKeyword("USER_NAME", {
		ignoreCase: true,
	});
	static USER_TABLESPACES = this.Identifier.newKeyword("USER_TABLESPACES", {
		ignoreCase: true,
	});
	static USE_STORED_OUTLINES = this.Identifier.newKeyword(
		"USE_STORED_OUTLINES",
		{
			ignoreCase: true,
		},
	);
	static USING = this.Identifier.newKeyword("USING", { ignoreCase: true });
	static USING_NLS_COMP = this.Identifier.newKeyword("USING_NLS_COMP", {
		ignoreCase: true,
	});
	static UTC_DATE = this.Identifier.newKeyword("UTC_DATE", {
		ignoreCase: true,
	});
	static UTC_TIME = this.Identifier.newKeyword("UTC_TIME", {
		ignoreCase: true,
	});
	static UTC_TIMESTAMP = this.Identifier.newKeyword("UTC_TIMESTAMP", {
		ignoreCase: true,
	});
	static UUID = this.Identifier.newKeyword("UUID", { ignoreCase: true });
	static UUID_SHORT = this.Identifier.newKeyword("UUID_SHORT", {
		ignoreCase: true,
	});
	static UUID_TO_BIN = this.Identifier.newKeyword("UUID_TO_BIN", {
		ignoreCase: true,
	});
	static VACUUM = this.Identifier.newKeyword("VACUUM", { ignoreCase: true });
	static VALIDATE = this.Identifier.newKeyword("VALIDATE", {
		ignoreCase: true,
	});
	static VALIDATE_PASSWORD_STRENGTH = this.Identifier.newKeyword(
		"VALIDATE_PASSWORD_STRENGTH",
		{ ignoreCase: true },
	);
	static VALUE = this.Identifier.newKeyword("VALUE", { ignoreCase: true });
	static VALUES = this.Identifier.newKeyword("VALUES", { ignoreCase: true });
	static VARBINARY = this.Identifier.newKeyword("VARBINARY", {
		ignoreCase: true,
	});
	static VARCHAR = this.Identifier.newKeyword("VARCHAR", { ignoreCase: true });
	static VARCHAR2 = this.Identifier.newKeyword("VARCHAR2", {
		ignoreCase: true,
	});
	static VARCHARACTER = this.Identifier.newKeyword("VARCHARACTER", {
		ignoreCase: true,
	});
	static VARIADIC = this.Identifier.newKeyword("VARIADIC", {
		ignoreCase: true,
	});
	static VARIANCE = this.Identifier.newKeyword("VARIANCE", {
		ignoreCase: true,
	});
	static VARNUM = this.Identifier.newKeyword("VARNUM", { ignoreCase: true });
	static VARRAW = this.Identifier.newKeyword("VARRAW", { ignoreCase: true });
	static VARRAY = this.Identifier.newKeyword("VARRAY", { ignoreCase: true });
	static VARRAYS = this.Identifier.newKeyword("VARRAYS", { ignoreCase: true });
	static VARYING = this.Identifier.newKeyword("VARYING", { ignoreCase: true });
	static VAR_POP = this.Identifier.newKeyword("VAR_POP", { ignoreCase: true });
	static VAR_SAMP = this.Identifier.newKeyword("VAR_SAMP", {
		ignoreCase: true,
	});
	static VCPU = this.Identifier.newKeyword("VCPU", { ignoreCase: true });
	static VECTOR = this.Identifier.newKeyword("VECTOR", { ignoreCase: true });
	static VERBOSE = this.Identifier.newKeyword("VERBOSE", { ignoreCase: true });
	static VERIFY = this.Identifier.newKeyword("VERIFY", { ignoreCase: true });
	static VERSION = this.Identifier.newKeyword("VERSION", { ignoreCase: true });
	static VERSIONING = this.Identifier.newKeyword("VERSIONING", {
		ignoreCase: true,
	});
	static VERSIONS = this.Identifier.newKeyword("VERSIONS", {
		ignoreCase: true,
	});
	static VERSIONS_ENDSCN = this.Identifier.newKeyword("VERSIONS_ENDSCN", {
		ignoreCase: true,
	});
	static VERSIONS_ENDTIME = this.Identifier.newKeyword("VERSIONS_ENDTIME", {
		ignoreCase: true,
	});
	static VERSIONS_OPERATION = this.Identifier.newKeyword("VERSIONS_OPERATION", {
		ignoreCase: true,
	});
	static VERSIONS_STARTSCN = this.Identifier.newKeyword("VERSIONS_STARTSCN", {
		ignoreCase: true,
	});
	static VERSIONS_STARTTIME = this.Identifier.newKeyword("VERSIONS_STARTTIME", {
		ignoreCase: true,
	});
	static VERSIONS_XID = this.Identifier.newKeyword("VERSIONS_XID", {
		ignoreCase: true,
	});
	static VIEW = this.Identifier.newKeyword("VIEW", { ignoreCase: true });
	static VIEWS = this.Identifier.newKeyword("VIEWS", { ignoreCase: true });
	static VIRTUAL = this.Identifier.newKeyword("VIRTUAL", { ignoreCase: true });
	static VISIBILITY = this.Identifier.newKeyword("VISIBILITY", {
		ignoreCase: true,
	});
	static VISIBLE = this.Identifier.newKeyword("VISIBLE", { ignoreCase: true });
	static VOLUME = this.Identifier.newKeyword("VOLUME", { ignoreCase: true });
	static WAIT = this.Identifier.newKeyword("WAIT", { ignoreCase: true });
	static WAITFOR = this.Identifier.newKeyword("WAITFOR", { ignoreCase: true });
	static WAL = this.Identifier.newKeyword("WAL", { ignoreCase: true });
	static WALLET = this.Identifier.newKeyword("WALLET", { ignoreCase: true });
	static WEBSEARCH_TO_TSQUERY = this.Identifier.newKeyword(
		"WEBSEARCH_TO_TSQUERY",
		{
			ignoreCase: true,
		},
	);
	static WEEK = this.Identifier.newKeyword("WEEK", { ignoreCase: true });
	static WEEKDAY = this.Identifier.newKeyword("WEEKDAY", { ignoreCase: true });
	static WEEKOFYEAR = this.Identifier.newKeyword("WEEKOFYEAR", {
		ignoreCase: true,
	});
	static WEEKS = this.Identifier.newKeyword("WEEKS", { ignoreCase: true });
	static WEIGHT_STRING = this.Identifier.newKeyword("WEIGHT_STRING", {
		ignoreCase: true,
	});
	static WHEN = this.Identifier.newKeyword("WHEN", { ignoreCase: true });
	static WHENEVER = this.Identifier.newKeyword("WHENEVER", {
		ignoreCase: true,
	});
	static WHERE = this.Identifier.newKeyword("WHERE", { ignoreCase: true });
	static WHILE = this.Identifier.newKeyword("WHILE", { ignoreCase: true });
	static WIDTH = this.Identifier.newKeyword("WIDTH", { ignoreCase: true });
	static WIDTH_BUCKET = this.Identifier.newKeyword("WIDTH_BUCKET", {
		ignoreCase: true,
	});
	static WINDOW = this.Identifier.newKeyword("WINDOW", { ignoreCase: true });
	static WITH = this.Identifier.newKeyword("WITH", { ignoreCase: true });
	static WITHIN = this.Identifier.newKeyword("WITHIN", { ignoreCase: true });
	static WITHOUT = this.Identifier.newKeyword("WITHOUT", { ignoreCase: true });
	static WNDS = this.Identifier.newKeyword("WNDS", { ignoreCase: true });
	static WNPS = this.Identifier.newKeyword("WNPS", { ignoreCase: true });
	static WORK = this.Identifier.newKeyword("WORK", { ignoreCase: true });
	static WORKLOAD = this.Identifier.newKeyword("WORKLOAD", {
		ignoreCase: true,
	});
	static WRAPPER = this.Identifier.newKeyword("WRAPPER", { ignoreCase: true });
	static WRITE = this.Identifier.newKeyword("WRITE", { ignoreCase: true });
	static WRITETEXT = this.Identifier.newKeyword("WRITETEXT", {
		ignoreCase: true,
	});
	static X509 = this.Identifier.newKeyword("X509", { ignoreCase: true });
	static XA = this.Identifier.newKeyword("XA", { ignoreCase: true });
	static XDB = this.Identifier.newKeyword("XDB", { ignoreCase: true });
	static XDBURITYPE = this.Identifier.newKeyword("XDBURITYPE", {
		ignoreCase: true,
	});
	static XML = this.Identifier.newKeyword("XML", { ignoreCase: true });
	static XMLAGG = this.Identifier.newKeyword("XMLAGG", { ignoreCase: true });
	static XMLCOMMENT = this.Identifier.newKeyword("XMLCOMMENT", {
		ignoreCase: true,
	});
	static XMLCONCAT = this.Identifier.newKeyword("XMLCONCAT", {
		ignoreCase: true,
	});
	static XMLELEMENT = this.Identifier.newKeyword("XMLELEMENT", {
		ignoreCase: true,
	});
	static XMLEXISTS = this.Identifier.newKeyword("XMLEXISTS", {
		ignoreCase: true,
	});
	static XMLFOREST = this.Identifier.newKeyword("XMLFOREST", {
		ignoreCase: true,
	});
	static XMLNAMESPACES = this.Identifier.newKeyword("XMLNAMESPACES", {
		ignoreCase: true,
	});
	static XMLPI = this.Identifier.newKeyword("XMLPI", { ignoreCase: true });
	static XMLROOT = this.Identifier.newKeyword("XMLROOT", { ignoreCase: true });
	static XMLSCHEMA = this.Identifier.newKeyword("XMLSCHEMA", {
		ignoreCase: true,
	});
	static XMLTABLE = this.Identifier.newKeyword("XMLTABLE", {
		ignoreCase: true,
	});
	static XMLTYPE = this.Identifier.newKeyword("XMLTYPE", { ignoreCase: true });
	static XML_IS_WELL_FORMED = this.Identifier.newKeyword("XML_IS_WELL_FORMED", {
		ignoreCase: true,
	});
	static XML_IS_WELL_FORMED_CONTENT = this.Identifier.newKeyword(
		"XML_IS_WELL_FORMED_CONTENT",
		{ ignoreCase: true },
	);
	static XML_IS_WELL_FORMED_DOCUMENT = this.Identifier.newKeyword(
		"XML_IS_WELL_FORMED_DOCUMENT",
		{ ignoreCase: true },
	);
	static XOR = this.Identifier.newKeyword("XOR", { ignoreCase: true });
	static XPATH = this.Identifier.newKeyword("XPATH", { ignoreCase: true });
	static XPATH_EXISTS = this.Identifier.newKeyword("XPATH_EXISTS", {
		ignoreCase: true,
	});
	static XS = this.Identifier.newKeyword("XS", { ignoreCase: true });
	static YAML = this.Identifier.newKeyword("YAML", { ignoreCase: true });
	static YEAR = this.Identifier.newKeyword("YEAR", { ignoreCase: true });
	static YEARS = this.Identifier.newKeyword("YEARS", { ignoreCase: true });
	static YEARWEEK = this.Identifier.newKeyword("YEARWEEK", {
		ignoreCase: true,
	});
	static YEAR_MONTH = this.Identifier.newKeyword("YEAR_MONTH", {
		ignoreCase: true,
	});
	static YES = this.Identifier.newKeyword("YES", { ignoreCase: true });
	static ZEROBLOB = this.Identifier.newKeyword("ZEROBLOB", {
		ignoreCase: true,
	});
	static ZEROFILL = this.Identifier.newKeyword("ZEROFILL", {
		ignoreCase: true,
	});
	static ZONE = this.Identifier.newKeyword("ZONE", { ignoreCase: true });
	static ZONEMAP = this.Identifier.newKeyword("ZONEMAP", { ignoreCase: true });
	static _ROWID_ = this.Identifier.newKeyword("_ROWID_", { ignoreCase: true });
}
