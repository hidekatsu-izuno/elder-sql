export class TokenType {
	static EoF = new TokenType("EoF", { separator: true });
	static Reserved = new TokenType("Reserved");
	static WhiteSpace = new TokenType("WhiteSpace", { skip: true });
	static LineComment = new TokenType("LineComment", { skip: true });
	static BlockComment = new TokenType("BlockComment", { skip: true });
	static HintComment = new TokenType("HintComment", { skip: true });
	static LineBreak = new TokenType("LineBreak", {
		skip: true,
		separator: true,
	});
	static Command = new TokenType("Command");
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
	static Label = new TokenType("Label");
	static Operator = new TokenType("Operator", { separator: true });
	static Numeric = new TokenType("Numeric");
	static Size = new TokenType("Size");
	static Blob = new TokenType("Blob");
	static String = new TokenType("String");
	static BindVariable = new TokenType("BindVariable");
	static Variable = new TokenType("Variable");
	static Identifier = new TokenType("Identifier");
	static Error = new TokenType("Error", { separator: true });

	public name: string;
	skip: boolean;
	separator: boolean;

	constructor(
		name: string,
		options?: {
			skip?: boolean;
			separator?: boolean;
		},
	) {
		this.name = name;
		this.skip = !!options?.skip;
		this.separator = !!options?.separator;
	}

	toString() {
		return this.name;
	}
}

export class SourceLocation {
	public position: number;
	public lineNumber: number;
	public columnNumber: number;
	public source?: string;

	constructor(position = 0, lineNumber = 1, columnNumber = 0, source?: string) {
		this.position = position;
		this.lineNumber = lineNumber;
		this.columnNumber = columnNumber;
		this.source = source;
	}

	clone() {
		return new SourceLocation(
			this.position,
			this.lineNumber,
			this.columnNumber,
			this.source,
		);
	}

	toString() {
		let out = "";
		if (this.source != null) {
			out += this.source;
		}
		if (this.lineNumber != null) {
			out += `[${this.lineNumber}`;
			if (this.columnNumber != null) {
				out += `,${this.columnNumber}`;
			}
			out += "] ";
		} else if (this.position != null) {
			out += `:${this.position}`;
		}
		return out;
	}
}

export declare type TokenQuery = {
	type?: TokenType | Keyword | (TokenType | Keyword)[];
	text?: string | string[] | RegExp;
	match?: (token: Token) => boolean;
};

export class Token {
	public type: TokenType;
	public text: string;
	keyword?: Keyword;
	eos: boolean;
	preskips: Token[];
	postskips: Token[];
	location?: SourceLocation;

	constructor(
		type: TokenType,
		text: string,
		options?: {
			keyword?: Keyword;
			eos?: boolean;
			preskips?: Token[];
			postskips?: Token[];
			location?: SourceLocation;
		},
	) {
		this.type = type;
		this.text = text;
		this.keyword = options?.keyword;
		this.eos = !!options?.eos;
		this.preskips = options?.preskips ?? [];
		this.postskips = options?.postskips ?? [];
		this.location = options?.location;
	}

	is(condition: TokenType | Keyword | TokenQuery) {
		if ("name" in condition) {
			if (condition === this.keyword || condition === this.type) {
				return true;
			}
		} else {
			let result = true;
			if (result && condition.type) {
				if (Array.isArray(condition.type)) {
					if (
						!condition.type.some(
							(type) => type === this.keyword || type === this.type,
						)
					) {
						result = false;
					}
				} else {
					if (condition.type !== this.keyword && condition.type !== this.type) {
						result = false;
					}
				}
			}
			if (result && condition.text) {
				if (Array.isArray(condition.text)) {
					if (!condition.text.some((text) => text === this.text)) {
						result = false;
					}
				} else if (condition.text instanceof RegExp) {
					if (!condition.text.test(this.text)) {
						result = false;
					}
				} else {
					if (condition.text !== this.text) {
						result = false;
					}
				}
			}
			if (result && condition.match) {
				if (!condition.match(this)) {
					result = false;
				}
			}
			if (result) {
				return true;
			}
		}
		return false;
	}

	clone() {
		return new Token(this.type, this.text, {
			keyword: this.keyword,
			eos: this.eos,
			preskips: [...this.preskips],
			postskips: [...this.postskips],
			location: this.location?.clone(),
		});
	}

	toString() {
		if (this.preskips.length > 0 || this.postskips.length > 0) {
			let out = "";
			for (let i = 0; i < this.preskips.length; i++) {
				out += this.preskips[i].text;
			}
			out += this.text;
			for (let i = 0; i < this.postskips.length; i++) {
				out += this.postskips[i].text;
			}
			return out;
		}
		return this.text;
	}
}

export declare type TokenPattern = {
	type: TokenType;
	re: RegExp | ((state: Record<string, any>) => RegExp | false);
	onMatch?: (state: Record<string, any>, token: Token) => Token[] | undefined;
	onUnmatch?: (state: Record<string, any>) => void;
};

export declare type LexerOptions = {
	skipTokenStrategy?: "ignore" | "next" | "adaptive";
	[key: string]: any;
};

export abstract class Lexer {
	public name: string;
	public patterns: TokenPattern[];
	public options: LexerOptions = {};

	constructor(
		name: string,
		patterns: TokenPattern[],
		options: LexerOptions = {},
	) {
		this.name = name;
		this.patterns = patterns;
		this.options = options;
		if (!options.skipTokenStrategy) {
			options.skipTokenStrategy = "adaptive";
		}
		if (options.patternFilter) {
			this.patterns = options.patternFilter(this.patterns);
		}
	}

	lex(input: string, fileName?: string) {
		let pos = 0;
		if (input.charAt(0) === "\uFEFF") {
			pos++;
		}
		const state = {};
		this.initState(state);
		return this.sublex(state, input, new SourceLocation(pos, 1, 0, fileName));
	}

	isReserved(keyword?: Keyword) {
		return false;
	}

	protected initState(state: Record<string, any>) {}

	protected sublex(
		state: Record<string, any>,
		input: string,
		start?: SourceLocation,
	) {
		const tokens = new Array<Token>();
		let pos = 0;
		let lineNumber = start?.lineNumber ?? 1;
		let columnNumber = start?.columnNumber ?? 0;
		const fileName = start?.source;

		let skips = [];
		while (pos < input.length) {
			let pattern: TokenPattern | undefined;
			let text: string | undefined;
			let location: SourceLocation | undefined;
			for (const pat of this.patterns) {
				const re = typeof pat.re === "function" ? pat.re(state) : pat.re;
				if (re) {
					re.lastIndex = pos;
					const m = re.exec(input);
					if (m) {
						pattern = pat;
						text = m[0];
						if (start) {
							location = new SourceLocation(
								pos + start.position,
								lineNumber,
								columnNumber,
								fileName,
							);
						}

						pos = re.lastIndex;
						break;
					}
				}
				if (pat.onUnmatch) {
					pat.onUnmatch(state);
				}
			}

			if (pattern == null || text == null) {
				throw new Error(`Failed to tokenize: ${pos}`);
			}

			const token = new Token(pattern.type, text, {
				location,
			});
			const newTokens = pattern.onMatch?.(state, token);
			if (newTokens && newTokens.length > 0) {
				skips.push(...newTokens[0].preskips);
				newTokens[0].preskips = [];
			}
			for (const newToken of newTokens || [token]) {
				if (newToken.type.skip) {
					if (this.options.skipTokenStrategy !== "ignore") {
						skips.push(newToken);
					}
				}

				if (this.options.skipTokenStrategy === "adaptive") {
					if (newToken.type.separator) {
						const last = tokens[tokens.length - 1];
						if (last && last.postskips.length === 0 && skips.length > 0) {
							last.postskips.push(...skips);
							skips = [];
						}
					}
				}

				if (!newToken.type.skip) {
					if (skips.length > 0) {
						newToken.preskips.push(...skips);
						skips = [];
					}
					tokens.push(newToken);
				}
			}
			if (newTokens && newTokens.length > 0) {
				const last = tokens[tokens.length - 1];
				if (last && last.type === TokenType.EoF) {
					if (this.options.skipTokenStrategy !== "ignore") {
						skips.push(...last.preskips);
						skips.push(...last.postskips);
					}
					tokens.pop();
				}
			}

			if (start) {
				let index = text.indexOf("\n");
				if (index !== -1) {
					let lastIndex: number;
					do {
						lastIndex = index;
						lineNumber++;
						index = text.indexOf("\n", lastIndex + 1);
					} while (index !== -1);
					columnNumber = text.length - lastIndex;
				} else {
					columnNumber += text.length;
				}
			}
		}

		tokens.push(
			new Token(TokenType.EoF, "", {
				eos: true,
				preskips: skips,
				location: start
					? new SourceLocation(
							pos + start.position,
							lineNumber,
							columnNumber,
							fileName,
						)
					: undefined,
			}),
		);

		return tokens;
	}
}

export class Keyword {
	static ABBREV = new Keyword("ABBREV");
	static ABORT = new Keyword("ABORT");
	static ABS = new Keyword("ABS");
	static ACCESS = new Keyword("ACCESS");
	static ACCESSED = new Keyword("ACCESSED");
	static ACCESSIBLE = new Keyword("ACCESSIBLE");
	static ACCOUNT = new Keyword("ACCOUNT");
	static ACLDEFAULT = new Keyword("ACLDEFAULT");
	static ACLEXPLODE = new Keyword("ACLEXPLODE");
	static ACOS = new Keyword("ACOS");
	static ACOSD = new Keyword("ACOSD");
	static ACOSH = new Keyword("ACOSH");
	static ACTION = new Keyword("ACTION");
	static ACTIONS = new Keyword("ACTIONS");
	static ACTIVE = new Keyword("ACTIVE");
	static ADD = new Keyword("ADD");
	static ADDDATE = new Keyword("ADDDATE");
	static ADDTIME = new Keyword("ADDTIME");
	static ADMIN = new Keyword("ADMIN");
	static ADMINISTER = new Keyword("ADMINISTER");
	static ADVANCED = new Keyword("ADVANCED");
	static ADVISE = new Keyword("ADVISE");
	static AES_DECRYPT = new Keyword("AES_DECRYPT");
	static AES_ENCRYPT = new Keyword("AES_ENCRYPT");
	static AFFINITY = new Keyword("AFFINITY");
	static AFTER = new Keyword("AFTER");
	static AGAINST = new Keyword("AGAINST");
	static AGE = new Keyword("AGE");
	static AGENT = new Keyword("AGENT");
	static AGGREGATE = new Keyword("AGGREGATE");
	static ALGORITHM = new Keyword("ALGORITHM");
	static ALIAS = new Keyword("ALIAS");
	static ALL = new Keyword("ALL");
	static ALLOCATE = new Keyword("ALLOCATE");
	static ALLOW = new Keyword("ALLOW");
	static ALLOW_CONNECTIONS = new Keyword("ALLOW_CONNECTIONS");
	static ALTER = new Keyword("ALTER");
	static ALTERNATE = new Keyword("ALTERNATE");
	static ALWAYS = new Keyword("ALWAYS");
	static ANALYSE = new Keyword("ANALYSE");
	static ANALYTIC = new Keyword("ANALYTIC");
	static ANALYZE = new Keyword("ANALYZE");
	static ANCILLARY = new Keyword("ANCILLARY");
	static AND = new Keyword("AND");
	static ANY = new Keyword("ANY");
	static ANYDATA = new Keyword("ANYDATA");
	static ANYDATASET = new Keyword("ANYDATASET");
	static ANYSCHEMA = new Keyword("ANYSCHEMA");
	static ANYTYPE = new Keyword("ANYTYPE");
	static ANY_VALUE = new Keyword("ANY_VALUE");
	static APPICATION = new Keyword("APPICATION");
	static APPLY = new Keyword("APPLY");
	static ARCHIVAL = new Keyword("ARCHIVAL");
	static ARCHIVE = new Keyword("ARCHIVE");
	static ARCHIVED = new Keyword("ARCHIVED");
	static ARCHIVELOG = new Keyword("ARCHIVELOG");
	static AREA = new Keyword("AREA");
	static ARRAY = new Keyword("ARRAY");
	static ARRAY_AGG = new Keyword("ARRAY_AGG");
	static ARRAY_APPEND = new Keyword("ARRAY_APPEND");
	static ARRAY_CAT = new Keyword("ARRAY_CAT");
	static ARRAY_DIMS = new Keyword("ARRAY_DIMS");
	static ARRAY_FILL = new Keyword("ARRAY_FILL");
	static ARRAY_LENGTH = new Keyword("ARRAY_LENGTH");
	static ARRAY_LOWER = new Keyword("ARRAY_LOWER");
	static ARRAY_NDIMS = new Keyword("ARRAY_NDIMS");
	static ARRAY_POSITION = new Keyword("ARRAY_POSITION");
	static ARRAY_POSITIONS = new Keyword("ARRAY_POSITIONS");
	static ARRAY_PREPEND = new Keyword("ARRAY_PREPEND");
	static ARRAY_REMOVE = new Keyword("ARRAY_REMOVE");
	static ARRAY_REPLACE = new Keyword("ARRAY_REPLACE");
	static ARRAY_TO_JSON = new Keyword("ARRAY_TO_JSON");
	static ARRAY_TO_STRING = new Keyword("ARRAY_TO_STRING");
	static ARRAY_TO_TSVECTOR = new Keyword("ARRAY_TO_TSVECTOR");
	static ARRAY_UPPER = new Keyword("ARRAY_UPPER");
	static AS = new Keyword("AS");
	static ASC = new Keyword("ASC");
	static ASCII = new Keyword("ASCII");
	static ASCIISTR = new Keyword("ASCIISTR");
	static ASSEMBLY = new Keyword("ASSEMBLY");
	static ASENSITIVE = new Keyword("ASENSITIVE");
	static ASIN = new Keyword("ASIN");
	static ASIND = new Keyword("ASIND");
	static ASINH = new Keyword("ASINH");
	static ASSOCIATE = new Keyword("ASSOCIATE");
	static ASYMMETRIC = new Keyword("ASYMMETRIC");
	static ASYNCHRONOUS = new Keyword("ASYNCHRONOUS");
	static AT = new Keyword("AT");
	static ATAN = new Keyword("ATAN");
	static ATAN2 = new Keyword("ATAN2");
	static ATAN2D = new Keyword("ATAN2D");
	static ATAND = new Keyword("ATAND");
	static ATANH = new Keyword("ATANH");
	static ATOMIC = new Keyword("ATOMIC");
	static ATTACH = new Keyword("ATTACH");
	static ATTRIBUTE = new Keyword("ATTRIBUTE");
	static ATTRIBUTES = new Keyword("ATTRIBUTES");
	static AUDIT = new Keyword("AUDIT");
	static AUTHENTICATED = new Keyword("AUTHENTICATED");
	static AUTHENTICATION = new Keyword("AUTHENTICATION");
	static AUTHID = new Keyword("AUTHID");
	static AUTHORIZATION = new Keyword("AUTHORIZATION");
	static AUTO = new Keyword("AUTO");
	static AUTOALLOCATE = new Keyword("AUTOALLOCATE");
	static AUTOEXTEND = new Keyword("AUTOEXTEND");
	static AUTOEXTEND_SIZE = new Keyword("AUTOEXTEND_SIZE");
	static AUTOINCREMENT = new Keyword("AUTOINCREMENT");
	static AUTOMATIC = new Keyword("AUTOMATIC");
	static AUTONOMOUS_TRANSACTION = new Keyword("AUTONOMOUS_TRANSACTION");
	static AUTO_INCREMENT = new Keyword("AUTO_INCREMENT");
	static AUTO_LOGIN = new Keyword("AUTO_LOGIN");
	static AVAILABILITY = new Keyword("AVAILABILITY");
	static AVG = new Keyword("AVG");
	static AVG_ROW_LENGTH = new Keyword("AVG_ROW_LENGTH");
	static AZURE_ROLE = new Keyword("AZURE_ROLE");
	static AZURE_USER = new Keyword("AZURE_USER");
	static BACKUP = new Keyword("BACKUP");
	static BADFILE = new Keyword("BADFILE");
	static BASICFILE = new Keyword("BASICFILE");
	static BATCH = new Keyword("BATCH");
	static BEFORE = new Keyword("BEFORE");
	static BEGIN = new Keyword("BEGIN");
	static BEGINNING = new Keyword("BEGINNING");
	static BENCHMARK = new Keyword("BENCHMARK");
	static BEQUEATH = new Keyword("BEQUEATH");
	static BETWEEN = new Keyword("BETWEEN");
	static BFILE = new Keyword("BFILE");
	static BIGFILE = new Keyword("BIGFILE");
	static BIGINT = new Keyword("BIGINT");
	static BIN = new Keyword("BIN");
	static BINARY = new Keyword("BINARY");
	static BINARY_INTEGER = new Keyword("BINARY_INTEGER");
	static BINDING = new Keyword("BINDING");
	static BINLOG = new Keyword("BINLOG");
	static BIN_TO_UUID = new Keyword("BIN_TO_UUID");
	static BIT = new Keyword("BIT");
	static BITMAP = new Keyword("BITMAP");
	static BIT_AND = new Keyword("BIT_AND");
	static BIT_COUNT = new Keyword("BIT_COUNT");
	static BIT_LENGTH = new Keyword("BIT_LENGTH");
	static BIT_OR = new Keyword("BIT_OR");
	static BIT_XOR = new Keyword("BIT_XOR");
	static BLOB = new Keyword("BLOB");
	static BLOCK = new Keyword("BLOCK");
	static BLOCKCHAIN = new Keyword("BLOCKCHAIN");
	static BLOCKSIZE = new Keyword("BLOCKSIZE");
	static BODY = new Keyword("BODY");
	static BOOL = new Keyword("BOOL");
	static BOOLEAN = new Keyword("BOOLEAN");
	static BOOL_AND = new Keyword("BOOL_AND");
	static BOOL_OR = new Keyword("BOOL_OR");
	static BOTH = new Keyword("BOTH");
	static BOUND_BOX = new Keyword("BOUND_BOX");
	static BOX = new Keyword("BOX");
	static BREADTH = new Keyword("BREADTH");
	static BREAK = new Keyword("BREAK");
	static BROADCAST = new Keyword("BROADCAST");
	static BROKER = new Keyword("BROKER");
	static BROWSE = new Keyword("BROWSE");
	static BTREE = new Keyword("BTREE");
	static BTRIM = new Keyword("BTRIM");
	static BUFFERS = new Keyword("BUFFERS");
	static BUFFER_CACHE = new Keyword("BUFFER_CACHE");
	static BULK = new Keyword("BULK");
	static BULK_EXCEPTIONS = new Keyword("BULK_EXCEPTIONS");
	static BULK_ROWCOUNT = new Keyword("BULK_ROWCOUNT");
	static BY = new Keyword("BY");
	static BYTEA = new Keyword("BYTEA");
	static CACHE = new Keyword("CACHE");
	static CACHING = new Keyword("CACHING");
	static CALL = new Keyword("CALL");
	static CANCEL = new Keyword("CANCEL");
	static CAPACITY = new Keyword("CAPACITY");
	static CAPTION = new Keyword("CAPTION");
	static CARDINALITY = new Keyword("CARDINALITY");
	static CASCADE = new Keyword("CASCADE");
	static CASCADED = new Keyword("CASCADED");
	static CASE = new Keyword("CASE");
	static CAST = new Keyword("CAST");
	static CATCH = new Keyword("CATCH");
	static CATEGORY = new Keyword("CATEGORY");
	static CBRT = new Keyword("CBRT");
	static CEIL = new Keyword("CEIL");
	static CEILING = new Keyword("CEILING");
	static CENTER = new Keyword("CENTER");
	static CENTURY = new Keyword("CENTURY");
	static CERTIFICATE = new Keyword("CERTIFICATE");
	static CHAIN = new Keyword("CHAIN");
	static CHAINED = new Keyword("CHAINED");
	static CHANGE = new Keyword("CHANGE");
	static CHANGES = new Keyword("CHANGES");
	static CHAR = new Keyword("CHAR");
	static CHAR2 = new Keyword("CHAR2");
	static CHARACTER = new Keyword("CHARACTER");
	static CHARACTER_LENGTH = new Keyword("CHARACTER_LENGTH");
	static CHARF = new Keyword("CHARF");
	static CHARINDEX = new Keyword("CHARINDEX");
	static CHARSET = new Keyword("CHARSET");
	static CHARSETFORM = new Keyword("CHARSETFORM");
	static CHARSETID = new Keyword("CHARSETID");
	static CHARZ = new Keyword("CHARZ");
	static CHAR_LENGTH = new Keyword("CHAR_LENGTH");
	static CHECK = new Keyword("CHECK");
	static CHECKPOINT = new Keyword("CHECKPOINT");
	static CHECKSUM = new Keyword("CHECKSUM");
	static CHILD = new Keyword("CHILD");
	static CHOOSE = new Keyword("CHOOSE");
	static CHR = new Keyword("CHR");
	static CHUNK = new Keyword("CHUNK");
	static CIPHER = new Keyword("CIPHER");
	static CIRCLE = new Keyword("CIRCLE");
	static CLASS = new Keyword("CLASS");
	static CLASSIFICATION = new Keyword("CLASSIFICATION");
	static CLASSIFIER = new Keyword("CLASSIFIER");
	static CLAUSE = new Keyword("CLAUSE");
	static CLEAN = new Keyword("CLEAN");
	static CLEANUP = new Keyword("CLEANUP");
	static CLEAR = new Keyword("CLEAR");
	static CLIENT = new Keyword("CLIENT");
	static CLOB = new Keyword("CLOB");
	static CLOCK_TIMESTAMP = new Keyword("CLOCK_TIMESTAMP");
	static CLONE = new Keyword("CLONE");
	static CLOSE = new Keyword("CLOSE");
	static CLS = new Keyword("CLS");
	static CLUSTER = new Keyword("CLUSTER");
	static CLUSTERED = new Keyword("CLUSTERED");
	static CLUSTERING = new Keyword("CLUSTERING");
	static CLUSTERS = new Keyword("CLUSTERS");
	static CN = new Keyword("CN");
	static COALESCE = new Keyword("COALESCE");
	static COARSE = new Keyword("COARSE");
	static COERCIBILITY = new Keyword("COERCIBILITY");
	static COLAUTH = new Keyword("COLAUTH");
	static COLD = new Keyword("COLD");
	static COLLATE = new Keyword("COLLATE");
	static COLLATION = new Keyword("COLLATION");
	static COLLECT = new Keyword("COLLECT");
	static COLLECTION = new Keyword("COLLECTION");
	static COLUMN = new Keyword("COLUMN");
	static COLUMNS = new Keyword("COLUMNS");
	static COLUMNSTORE = new Keyword("COLUMNSTORE");
	static COLUMNS_UPDATED = new Keyword("COLUMNS_UPDATED");
	static COLUMN_FORMAT = new Keyword("COLUMN_FORMAT");
	static COLUMN_VALUE = new Keyword("COLUMN_VALUE");
	static COMMENT = new Keyword("COMMENT");
	static COMMIT = new Keyword("COMMIT");
	static COMMITTED = new Keyword("COMMITTED");
	static COMPACT = new Keyword("COMPACT");
	static COMPATIBILITY = new Keyword("COMPATIBILITY");
	static COMPILE = new Keyword("COMPILE");
	static COMPLETE = new Keyword("COMPLETE");
	static COMPLETION = new Keyword("COMPLETION");
	static COMPONENT = new Keyword("COMPONENT");
	static COMPOSITE_LIMIT = new Keyword("COMPOSITE_LIMIT");
	static COMPRESS = new Keyword("COMPRESS");
	static COMPRESSED = new Keyword("COMPRESSED");
	static COMPRESSION = new Keyword("COMPRESSION");
	static COMPUTATION = new Keyword("COMPUTATION");
	static COMPUTE = new Keyword("COMPUTE");
	static CONCAT = new Keyword("CONCAT");
	static CONCAT_WS = new Keyword("CONCAT_WS");
	static CONCURRENT = new Keyword("CONCURRENT");
	static CONCURRENTLY = new Keyword("CONCURRENTLY");
	static CONDITION = new Keyword("CONDITION");
	static CONFIGURATION = new Keyword("CONFIGURATION");
	static CONFIRM = new Keyword("CONFIRM");
	static CONFLICT = new Keyword("CONFLICT");
	static CONNECT = new Keyword("CONNECT");
	static CONNECTION = new Keyword("CONNECTION");
	static CONNECTION_ID = new Keyword("CONNECTION_ID");
	static CONNECT_BY_ISCYCLE = new Keyword("CONNECT_BY_ISCYCLE");
	static CONNECT_BY_ISLEAF = new Keyword("CONNECT_BY_ISLEAF");
	static CONNECT_TIME = new Keyword("CONNECT_TIME");
	static CONSIDER = new Keyword("CONSIDER");
	static CONSISTENT = new Keyword("CONSISTENT");
	static CONSTANT = new Keyword("CONSTANT");
	static CONSTRAINT = new Keyword("CONSTRAINT");
	static CONSTRAINTS = new Keyword("CONSTRAINTS");
	static CONTAINER = new Keyword("CONTAINER");
	static CONTAINERS = new Keyword("CONTAINERS");
	static CONTAINERS_DEFAULT = new Keyword("CONTAINERS_DEFAULT");
	static CONTAINER_DATA = new Keyword("CONTAINER_DATA");
	static CONTAINER_MAP = new Keyword("CONTAINER_MAP");
	static CONTAINS = new Keyword("CONTAINS");
	static CONTAINSTABLE = new Keyword("CONTAINSTABLE");
	static CONTENTS = new Keyword("CONTENTS");
	static CONTEXT = new Keyword("CONTEXT");
	static CONTINUE = new Keyword("CONTINUE");
	static CONTRACT = new Keyword("CONTRACT");
	static CONTROLFILE = new Keyword("CONTROLFILE");
	static CONV = new Keyword("CONV");
	static CONVERSION = new Keyword("CONVERSION");
	static CONVERT = new Keyword("CONVERT");
	static CONVERT_FROM = new Keyword("CONVERT_FROM");
	static CONVERT_TO = new Keyword("CONVERT_TO");
	static CONVERT_TZ = new Keyword("CONVERT_TZ");
	static COPY = new Keyword("COPY");
	static CORR = new Keyword("CORR");
	static CORRUPTION = new Keyword("CORRUPTION");
	static COS = new Keyword("COS");
	static COSD = new Keyword("COSD");
	static COSH = new Keyword("COSH");
	static COST = new Keyword("COST");
	static COSTS = new Keyword("COSTS");
	static COT = new Keyword("COT");
	static COTD = new Keyword("COTD");
	static COUNT = new Keyword("COUNT");
	static COVAR_POP = new Keyword("COVAR_POP");
	static COVAR_SAMP = new Keyword("COVAR_SAMP");
	static COVERAGE = new Keyword("COVERAGE");
	static CPU_PER_CALL = new Keyword("CPU_PER_CALL");
	static CPU_PER_SESSION = new Keyword("CPU_PER_SESSION");
	static CRASH = new Keyword("CRASH");
	static CRC32 = new Keyword("CRC32");
	static CREATE = new Keyword("CREATE");
	static CREATE_FILE_DEST = new Keyword("CREATE_FILE_DEST");
	static CREATION = new Keyword("CREATION");
	static CREDENTIAL = new Keyword("CREDENTIAL");
	static CREDENTIALS = new Keyword("CREDENTIALS");
	static CRITICAL = new Keyword("CRITICAL");
	static CROSS = new Keyword("CROSS");
	static CRYPTOGRAPHIC = new Keyword("CRYPTOGRAPHIC");
	static CUBE = new Keyword("CUBE");
	static CUME_DIST = new Keyword("CUME_DIST");
	static CURDATE = new Keyword("CURDATE");
	static CURRENT = new Keyword("CURRENT");
	static CURRENT_CATALOG = new Keyword("CURRENT_CATALOG");
	static CURRENT_DATABASE = new Keyword("CURRENT_DATABASE");
	static CURRENT_DATE = new Keyword("CURRENT_DATE");
	static CURRENT_QUERY = new Keyword("CURRENT_QUERY");
	static CURRENT_ROLE = new Keyword("CURRENT_ROLE");
	static CURRENT_SCHEMA = new Keyword("CURRENT_SCHEMA");
	static CURRENT_SCHEMAS = new Keyword("CURRENT_SCHEMAS");
	static CURRENT_TIME = new Keyword("CURRENT_TIME");
	static CURRENT_TIMESTAMP = new Keyword("CURRENT_TIMESTAMP");
	static CURRENT_TIMEZONE = new Keyword("CURRENT_TIMEZONE");
	static CURRENT_TIMEZONE_ID = new Keyword("CURRENT_TIMEZONE_ID");
	static CURRENT_USER = new Keyword("CURRENT_USER");
	static CURRVAL = new Keyword("CURRVAL");
	static CURSOR = new Keyword("CURSOR");
	static CURSOR_TO_XML = new Keyword("CURSOR_TO_XML");
	static CURSOR_TO_XMLSCHEMA = new Keyword("CURSOR_TO_XMLSCHEMA");
	static CURTIME = new Keyword("CURTIME");
	static CYCLE = new Keyword("CYCLE");
	static D = new Keyword("D");
	static DANGLING = new Keyword("DANGLING");
	static DATA = new Keyword("DATA");
	static DATABASE = new Keyword("DATABASE");
	static DATABASES = new Keyword("DATABASES");
	static DATABASE_TO_XML = new Keyword("DATABASE_TO_XML");
	static DATABASE_TO_XMLSCHEMA = new Keyword("DATABASE_TO_XMLSCHEMA");
	static DATABASE_TO_XML_AND_XMLSCHEMA = new Keyword(
		"DATABASE_TO_XML_AND_XMLSCHEMA",
	);
	static DATAFILE = new Keyword("DATAFILE");
	static DATAFILES = new Keyword("DATAFILES");
	static DATALENGTH = new Keyword("DATALENGTH");
	static DATAPUMP = new Keyword("DATAPUMP");
	static DATATYPE = new Keyword("DATATYPE");
	static DATE = new Keyword("DATE");
	static DATEADD = new Keyword("DATEADD");
	static DATEDIFF = new Keyword("DATEDIFF");
	static DATEDIFF_BIG = new Keyword("DATEDIFF_BIG");
	static DATEFROMPARTS = new Keyword("DATEFROMPARTS");
	static DATENAME = new Keyword("DATENAME");
	static DATEPART = new Keyword("DATEPART");
	static DATETIME = new Keyword("DATETIME");
	static DATETIMEFROMPARTS = new Keyword("DATETIMEFROMPARTS");
	static DATETIMEOFFSET = new Keyword("DATETIMEOFFSET");
	static DATETIMEOFFSETFROMPARTS = new Keyword("DATETIMEOFFSETFROMPARTS");
	static DATETIME2 = new Keyword("DATETIME2");
	static DATETIME2FROMPARTS = new Keyword("DATETIME2FROMPARTS");
	static DATE_ADD = new Keyword("DATE_ADD");
	static DATE_BIN = new Keyword("DATE_BIN");
	static DATE_BUCKET = new Keyword("DATE_BUCKET");
	static DATE_FORMAT = new Keyword("DATE_FORMAT");
	static DATE_PART = new Keyword("DATE_PART");
	static DATE_SUB = new Keyword("DATE_SUB");
	static DATE_TRUNC = new Keyword("DATE_TRUNC");
	static DAY = new Keyword("DAY");
	static DAYNAME = new Keyword("DAYNAME");
	static DAYOFMONTH = new Keyword("DAYOFMONTH");
	static DAYOFWEEK = new Keyword("DAYOFWEEK");
	static DAYOFYEAR = new Keyword("DAYOFYEAR");
	static DAYS = new Keyword("DAYS");
	static DAY_HOUR = new Keyword("DAY_HOUR");
	static DAY_MICROSECOND = new Keyword("DAY_MICROSECOND");
	static DAY_MINUTE = new Keyword("DAY_MINUTE");
	static DAY_SECOND = new Keyword("DAY_SECOND");
	static DBA_RECYCLEBIN = new Keyword("DBA_RECYCLEBIN");
	static DBCC = new Keyword("DBCC");
	static DBURITYPE = new Keyword("DBURITYPE");
	static DDL = new Keyword("DDL");
	static DEALLOCATE = new Keyword("DEALLOCATE");
	static DEBUG = new Keyword("DEBUG");
	static DEC = new Keyword("DEC");
	static DECADE = new Keyword("DECADE");
	static DECIMAL = new Keyword("DECIMAL");
	static DECLARE = new Keyword("DECLARE");
	static DECODE = new Keyword("DECODE");
	static DECREMENT = new Keyword("DECREMENT");
	static DECRYPT = new Keyword("DECRYPT");
	static DEDUPLICATE = new Keyword("DEDUPLICATE");
	static DEFAULT = new Keyword("DEFAULT");
	static DEFAULT_COLLATION = new Keyword("DEFAULT_COLLATION");
	static DEFAULT_CREDENTIAL = new Keyword("DEFAULT_CREDENTIAL");
	static DEFERRABLE = new Keyword("DEFERRABLE");
	static DEFERRED = new Keyword("DEFERRED");
	static DEFINE = new Keyword("DEFINE");
	static DEFINER = new Keyword("DEFINER");
	static DEFINITION = new Keyword("DEFINITION");
	static DEGREES = new Keyword("DEGREES");
	static DELAYED = new Keyword("DELAYED");
	static DELAY_KEY_WRITE = new Keyword("DELAY_KEY_WRITE");
	static DELETE = new Keyword("DELETE");
	static DELETE_ALL = new Keyword("DELETE_ALL");
	static DELETING = new Keyword("DELETING");
	static DELIGATE = new Keyword("DELIGATE");
	static DEMAND = new Keyword("DEMAND");
	static DENSE_RANK = new Keyword("DENSE_RANK");
	static DENY = new Keyword("DENY");
	static DEPENDENT = new Keyword("DEPENDENT");
	static DEPLICATE = new Keyword("DEPLICATE");
	static DEPTH = new Keyword("DEPTH");
	static DESC = new Keyword("DESC");
	static DESCRIBE = new Keyword("DESCRIBE");
	static DESCRIPTION = new Keyword("DESCRIPTION");
	static DES_KEY_FILE = new Keyword("DES_KEY_FILE");
	static DETACH = new Keyword("DETACH");
	static DETAIL = new Keyword("DETAIL");
	static DETERMINES = new Keyword("DETERMINES");
	static DETERMINISTIC = new Keyword("DETERMINISTIC");
	static DIAGONAL = new Keyword("DIAGONAL");
	static DIAMETER = new Keyword("DIAMETER");
	static DICTIONARY = new Keyword("DICTIONARY");
	static DIFFERENCE = new Keyword("DIFFERENCE");
	static DIGEST = new Keyword("DIGEST");
	static DIMENSION = new Keyword("DIMENSION");
	static DIRECTORY = new Keyword("DIRECTORY");
	static DIRECT_LOAD = new Keyword("DIRECT_LOAD");
	static DIRECT_PATH = new Keyword("DIRECT_PATH");
	static DISABLE = new Keyword("DISABLE");
	static DISABLE_ALL = new Keyword("DISABLE_ALL");
	static DISALLOW = new Keyword("DISALLOW");
	static DISASSOCIATE = new Keyword("DISASSOCIATE");
	static DISCARD = new Keyword("DISCARD");
	static DISCARDFILE = new Keyword("DISCARDFILE");
	static DISCONNECT = new Keyword("DISCONNECT");
	static DISK = new Keyword("DISK");
	static DISKGROUP = new Keyword("DISKGROUP");
	static DISKS = new Keyword("DISKS");
	static DISMOUNT = new Keyword("DISMOUNT");
	static DISPLAY = new Keyword("DISPLAY");
	static DISTINCT = new Keyword("DISTINCT");
	static DISTINCTROW = new Keyword("DISTINCTROW");
	static DISTRIBUTE = new Keyword("DISTRIBUTE");
	static DISTRIBUTED = new Keyword("DISTRIBUTED");
	static DIV = new Keyword("DIV");
	static DML = new Keyword("DML");
	static DO = new Keyword("DO");
	static DOCUMENT = new Keyword("DOCUMENT");
	static DOMAIN = new Keyword("DOMAIN");
	static DOUBLE = new Keyword("DOUBLE");
	static DOW = new Keyword("DOW");
	static DOWNGRADE = new Keyword("DOWNGRADE");
	static DOY = new Keyword("DOY");
	static DROP = new Keyword("DROP");
	static DUAL = new Keyword("DUAL");
	static DUMP = new Keyword("DUMP");
	static DUPLICATE = new Keyword("DUPLICATE");
	static DUPLICATED = new Keyword("DUPLICATED");
	static DURATION = new Keyword("DURATION");
	static DV = new Keyword("DV");
	static DYNAMIC = new Keyword("DYNAMIC");
	static E = new Keyword("E");
	static EACH = new Keyword("EACH");
	static EDITION = new Keyword("EDITION");
	static EDITIONABLE = new Keyword("EDITIONABLE");
	static EDITIONING = new Keyword("EDITIONING");
	static EDITIONS = new Keyword("EDITIONS");
	static ELEMENT = new Keyword("ELEMENT");
	static ELSE = new Keyword("ELSE");
	static ELSEIF = new Keyword("ELSEIF");
	static ELSIF = new Keyword("ELSIF");
	static ELT = new Keyword("ELT");
	static EMPTY = new Keyword("EMPTY");
	static EMPTY_BLOB = new Keyword("EMPTY_BLOB");
	static EMPTY_CLOB = new Keyword("EMPTY_CLOB");
	static ENABLE = new Keyword("ENABLE");
	static ENABLE_ALL = new Keyword("ENABLE_ALL");
	static ENCLOSED = new Keyword("ENCLOSED");
	static ENCODE = new Keyword("ENCODE");
	static ENCODING = new Keyword("ENCODING");
	static ENCRYPT = new Keyword("ENCRYPT");
	static ENCRYPTED = new Keyword("ENCRYPTED");
	static ENCRYPTION = new Keyword("ENCRYPTION");
	static ENCRYPTION_KEY_ID = new Keyword("ENCRYPTION_KEY_ID");
	static END = new Keyword("END");
	static ENDPOINT = new Keyword("ENDPOINT");
	static ENDS = new Keyword("ENDS");
	static ENFORCED = new Keyword("ENFORCED");
	static ENGINE = new Keyword("ENGINE");
	static ENGINE_ATTRIBUTE = new Keyword("ENGINE_ATTRIBUTE");
	static EOMONTH = new Keyword("EOMONTH");
	static ENTERPRISE = new Keyword("ENTERPRISE");
	static ENUM = new Keyword("ENUM");
	static ENUM_FIRST = new Keyword("ENUM_FIRST");
	static ENUM_LAST = new Keyword("ENUM_LAST");
	static ENUM_RANGE = new Keyword("ENUM_RANGE");
	static EPOCH = new Keyword("EPOCH");
	static ERRCODE = new Keyword("ERRCODE");
	static ERRLVL = new Keyword("ERRLVL");
	static ERRORS = new Keyword("ERRORS");
	static ERROR_CODE = new Keyword("ERROR_CODE");
	static ERROR_INDEX = new Keyword("ERROR_INDEX");
	static ESCAPE = new Keyword("ESCAPE");
	static ESCAPED = new Keyword("ESCAPED");
	static EVALUATE = new Keyword("EVALUATE");
	static EVENT = new Keyword("EVENT");
	static EVENTDATA = new Keyword("EVENTDATA");
	static EVERY = new Keyword("EVERY");
	static EXCEPT = new Keyword("EXCEPT");
	static EXCEPTION = new Keyword("EXCEPTION");
	static EXCEPTIONS = new Keyword("EXCEPTIONS");
	static EXCEPTION_INIT = new Keyword("EXCEPTION_INIT");
	static EXCHANGE = new Keyword("EXCHANGE");
	static EXCLUDE = new Keyword("EXCLUDE");
	static EXCLUSIVE = new Keyword("EXCLUSIVE");
	static EXEC = new Keyword("EXEC");
	static EXECUTE = new Keyword("EXECUTE");
	static EXISTS = new Keyword("EXISTS");
	static EXIT = new Keyword("EXIT");
	static EXP = new Keyword("EXP");
	static EXPANSION = new Keyword("EXPANSION");
	static EXPIRE = new Keyword("EXPIRE");
	static EXPLAIN = new Keyword("EXPLAIN");
	static EXPORT = new Keyword("EXPORT");
	static EXPORT_SET = new Keyword("EXPORT_SET");
	static EXPRESSION = new Keyword("EXPRESSION");
	static EXTEND = new Keyword("EXTEND");
	static EXTENDED = new Keyword("EXTENDED");
	static EXTENSION = new Keyword("EXTENSION");
	static EXTENT = new Keyword("EXTENT");
	static EXTENT_SIZE = new Keyword("EXTENT_SIZE");
	static EXTERNAL = new Keyword("EXTERNAL");
	static EXTERNALLY = new Keyword("EXTERNALLY");
	static EXTRACT = new Keyword("EXTRACT");
	static EXTRACTVALUE = new Keyword("EXTRACTVALUE");
	static FACT = new Keyword("FACT");
	static FACTORIAL = new Keyword("FACTORIAL");
	static FAIL = new Keyword("FAIL");
	static FAILED = new Keyword("FAILED");
	static FAILED_LOGIN_ATTEMPTS = new Keyword("FAILED_LOGIN_ATTEMPTS");
	static FAILGROUP = new Keyword("FAILGROUP");
	static FAILOVER = new Keyword("FAILOVER");
	static FALSE = new Keyword("FALSE");
	static FAMILY = new Keyword("FAMILY");
	static FAR = new Keyword("FAR");
	static FAST = new Keyword("FAST");
	static FEATURE = new Keyword("FEATURE");
	static FETCH = new Keyword("FETCH");
	static FIELD = new Keyword("FIELD");
	static FILE = new Keyword("FILE");
	static FILEGROUP = new Keyword("FILEGROUP");
	static FILESYSTEM_LIKE_LOGGING = new Keyword("FILESYSTEM_LIKE_LOGGING");
	static FILE_BLOCK_SIZE = new Keyword("FILE_BLOCK_SIZE");
	static FILE_NAME_CONVERT = new Keyword("FILE_NAME_CONVERT");
	static FILLFACTOR = new Keyword("FILLFACTOR");
	static FILTER = new Keyword("FILTER");
	static FINAL = new Keyword("FINAL");
	static FIND_IN_SET = new Keyword("FIND_IN_SET");
	static FINE = new Keyword("FINE");
	static FINISH = new Keyword("FINISH");
	static FIRST = new Keyword("FIRST");
	static FIRST_VALUE = new Keyword("FIRST_VALUE");
	static FIXED = new Keyword("FIXED");
	static FLASHBACK = new Keyword("FLASHBACK");
	static FLASH_CACHE = new Keyword("FLASH_CACHE");
	static FLEX = new Keyword("FLEX");
	static FLOAT = new Keyword("FLOAT");
	static FLOOR = new Keyword("FLOOR");
	static FLUSH = new Keyword("FLUSH");
	static FOLLOWING = new Keyword("FOLLOWING");
	static FOLLOWS = new Keyword("FOLLOWS");
	static FOR = new Keyword("FOR");
	static FORALL = new Keyword("FORALL");
	static FORCE = new Keyword("FORCE");
	static FOREIGN = new Keyword("FOREIGN");
	static FORMAT = new Keyword("FORMAT");
	static FORMAT_BYTES = new Keyword("FORMAT_BYTES");
	static FORMAT_PICO_TIME = new Keyword("FORMAT_PICO_TIME");
	static FOUND = new Keyword("FOUND");
	static FOUND_ROWS = new Keyword("FOUND_ROWS");
	static FREEPOOLS = new Keyword("FREEPOOLS");
	static FREETEXT = new Keyword("FREETEXT");
	static FREETEXTTABLE = new Keyword("FREETEXTTABLE");
	static FREEZE = new Keyword("FREEZE");
	static FRESH = new Keyword("FRESH");
	static FROM = new Keyword("FROM");
	static FROM_BASE64 = new Keyword("FROM_BASE64");
	static FROM_DAYS = new Keyword("FROM_DAYS");
	static FROM_UNIXTIME = new Keyword("FROM_UNIXTIME");
	static FULL = new Keyword("FULL");
	static FULLTEXT = new Keyword("FULLTEXT");
	static FUNCTION = new Keyword("FUNCTION");
	static FUNCTIONS = new Keyword("FUNCTIONS");
	static G = new Keyword("G");
	static GCD = new Keyword("GCD");
	static GENERATED = new Keyword("GENERATED");
	static GENERATE_SERIES = new Keyword("GENERATE_SERIES");
	static GEN_RANDOM_UUID = new Keyword("GEN_RANDOM_UUID");
	static GEOGRAPHY = new Keyword("GEOGRAPHY");
	static GEOMCOLLECTION = new Keyword("GEOMCOLLECTION");
	static GEOMETRY = new Keyword("GEOMETRY");
	static GEOMETRYCOLLECTION = new Keyword("GEOMETRYCOLLECTION");
	static GET = new Keyword("GET");
	static GETDATE = new Keyword("GETDATE");
	static GETUTCDATE = new Keyword("GETUTCDATE");
	static GET_BIT = new Keyword("GET_BIT");
	static GET_BYTE = new Keyword("GET_BYTE");
	static GET_CURRENT_TS_CONFIG = new Keyword("GET_CURRENT_TS_CONFIG");
	static GET_FORMAT = new Keyword("GET_FORMAT");
	static GET_LOCK = new Keyword("GET_LOCK");
	static GLOB = new Keyword("GLOB");
	static GLOBAL = new Keyword("GLOBAL");
	static GLOBALLY = new Keyword("GLOBALLY");
	static GLOBAL_NAME = new Keyword("GLOBAL_NAME");
	static GLOBAL_TOPIC_ENABLED = new Keyword("GLOBAL_TOPIC_ENABLED");
	static GO = new Keyword("GO");
	static GOTO = new Keyword("GOTO");
	static GRANT = new Keyword("GRANT");
	static GRANTED = new Keyword("GRANTED");
	static GREATEST = new Keyword("GREATEST");
	static GROUP = new Keyword("GROUP");
	static GROUPING = new Keyword("GROUPING");
	static GROUPING_ID = new Keyword("GROUPING_ID");
	static GROUPS = new Keyword("GROUPS");
	static GROUP_CONCAT = new Keyword("GROUP_CONCAT");
	static GROUP_ID = new Keyword("GROUP_ID");
	static GUARANTEE = new Keyword("GUARANTEE");
	static GUARD = new Keyword("GUARD");
	static H = new Keyword("H");
	static HALF_YEARS = new Keyword("HALF_YEARS");
	static HANDLER = new Keyword("HANDLER");
	static HASH = new Keyword("HASH");
	static HASHING = new Keyword("HASHING");
	static HASHKEYS = new Keyword("HASHKEYS");
	static HAS_ANY_COLUMN_PRIVILEGE = new Keyword("HAS_ANY_COLUMN_PRIVILEGE");
	static HAS_COLUMN_PRIVILEGE = new Keyword("HAS_COLUMN_PRIVILEGE");
	static HAS_DATABASE_PRIVILEGE = new Keyword("HAS_DATABASE_PRIVILEGE");
	static HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE = new Keyword(
		"HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE",
	);
	static HAS_FUNCTION_PRIVILEGE = new Keyword("HAS_FUNCTION_PRIVILEGE");
	static HAS_LANGUAGE_PRIVILEGE = new Keyword("HAS_LANGUAGE_PRIVILEGE");
	static HAS_PARAMETER_PRIVILEGE = new Keyword("HAS_PARAMETER_PRIVILEGE");
	static HAS_SCHEMA_PRIVILEGE = new Keyword("HAS_SCHEMA_PRIVILEGE");
	static HAS_SEQUENCE_PRIVILEGE = new Keyword("HAS_SEQUENCE_PRIVILEGE");
	static HAS_SERVER_PRIVILEGE = new Keyword("HAS_SERVER_PRIVILEGE");
	static HAS_TABLESPACE_PRIVILEGE = new Keyword("HAS_TABLESPACE_PRIVILEGE");
	static HAS_TABLE_PRIVILEGE = new Keyword("HAS_TABLE_PRIVILEGE");
	static HAS_TYPE_PRIVILEGE = new Keyword("HAS_TYPE_PRIVILEGE");
	static HAVING = new Keyword("HAVING");
	static HEAP = new Keyword("HEAP");
	static HEIGHT = new Keyword("HEIGHT");
	static HELP = new Keyword("HELP");
	static HEX = new Keyword("HEX");
	static HIERARCHIES = new Keyword("HIERARCHIES");
	static HIERARCHY = new Keyword("HIERARCHY");
	static HIERARCHYID = new Keyword("HIERARCHYID");
	static HIER_ORDER = new Keyword("HIER_ORDER");
	static HIGH = new Keyword("HIGH");
	static HIGH_PRIORITY = new Keyword("HIGH_PRIORITY");
	static HINT = new Keyword("HINT");
	static HISTORY = new Keyword("HISTORY");
	static HOLDLOCK = new Keyword("HOLDLOCK");
	static HOST = new Keyword("HOST");
	static HOSTMASK = new Keyword("HOSTMASK");
	static HOT = new Keyword("HOT");
	static HOUR = new Keyword("HOUR");
	static HOURS = new Keyword("HOURS");
	static HOUR_MICROSECOND = new Keyword("HOUR_MICROSECOND");
	static HOUR_MINUTE = new Keyword("HOUR_MINUTE");
	static HOUR_SECOND = new Keyword("HOUR_SECOND");
	static HTTP = new Keyword("HTTP");
	static HTTPURITYPE = new Keyword("HTTPURITYPE");
	static IAM_GROUP_NAME = new Keyword("IAM_GROUP_NAME");
	static IAM_PRINCIPAL_NAME = new Keyword("IAM_PRINCIPAL_NAME");
	static ICU_VERSION = new Keyword("ICU_VERSION");
	static ID = new Keyword("ID");
	static IDENT_CURRENT = new Keyword("IDENT_CURRENT");
	static IDENT_INCR = new Keyword("IDENT_INCR");
	static IDENT_SEED = new Keyword("IDENT_SEED");
	static IDENTIFIED = new Keyword("IDENTIFIED");
	static IDENTITY = new Keyword("IDENTITY");
	static IDENTITYCOL = new Keyword("IDENTITYCOL");
	static IDENTITY_INSERT = new Keyword("IDENTITY_INSERT");
	static IDLE_TIME = new Keyword("IDLE_TIME");
	static IETF_QUOTES = new Keyword("IETF_QUOTES");
	static IF = new Keyword("IF");
	static IFNULL = new Keyword("IFNULL");
	static IGNORE = new Keyword("IGNORE");
	static IGNORED = new Keyword("IGNORED");
	static IIF = new Keyword("IIF");
	static ILIKE = new Keyword("ILIKE");
	static IMMEDIATE = new Keyword("IMMEDIATE");
	static IMMUTABLE = new Keyword("IMMUTABLE");
	static IMPORT = new Keyword("IMPORT");
	static IN = new Keyword("IN");
	static INACTIVE = new Keyword("INACTIVE");
	static INACTIVE_ACCOUNT_TIME = new Keyword("INACTIVE_ACCOUNT_TIME");
	static INCLUDE = new Keyword("INCLUDE");
	static INCLUDING = new Keyword("INCLUDING");
	static INCREMENT = new Keyword("INCREMENT");
	static INDEX = new Keyword("INDEX");
	static INDEXED = new Keyword("INDEXED");
	static INDEXES = new Keyword("INDEXES");
	static INDEXING = new Keyword("INDEXING");
	static INDEXTYPE = new Keyword("INDEXTYPE");
	static INDEXTYPES = new Keyword("INDEXTYPES");
	static INDICATOR = new Keyword("INDICATOR");
	static INDICES = new Keyword("INDICES");
	static INET6_ATON = new Keyword("INET6_ATON");
	static INET6_NTOA = new Keyword("INET6_NTOA");
	static INET_ATON = new Keyword("INET_ATON");
	static INET_CLIENT_ADDR = new Keyword("INET_CLIENT_ADDR");
	static INET_CLIENT_PORT = new Keyword("INET_CLIENT_PORT");
	static INET_MERGE = new Keyword("INET_MERGE");
	static INET_NTOA = new Keyword("INET_NTOA");
	static INET_SAME_FAMILY = new Keyword("INET_SAME_FAMILY");
	static INET_SERVER_ADDR = new Keyword("INET_SERVER_ADDR");
	static INET_SERVER_PORT = new Keyword("INET_SERVER_PORT");
	static INFILE = new Keyword("INFILE");
	static INITCAP = new Keyword("INITCAP");
	static INITIAL = new Keyword("INITIAL");
	static INITIALIZED = new Keyword("INITIALIZED");
	static INITIALLY = new Keyword("INITIALLY");
	static INITIAL_SIZE = new Keyword("INITIAL_SIZE");
	static INITRANS = new Keyword("INITRANS");
	static INLINE = new Keyword("INLINE");
	static INMEMORY = new Keyword("INMEMORY");
	static INNER = new Keyword("INNER");
	static INOUT = new Keyword("INOUT");
	static INPLACE = new Keyword("INPLACE");
	static INSTEAD = new Keyword("INSTEAD");
	static INSENSITIVE = new Keyword("INSENSITIVE");
	static INSERT = new Keyword("INSERT");
	static INSERTING = new Keyword("INSERTING");
	static INSERT_METHOD = new Keyword("INSERT_METHOD");
	static INSTALL = new Keyword("INSTALL");
	static INSTANCE = new Keyword("INSTANCE");
	static INSTANCES = new Keyword("INSTANCES");
	static INSTANTIABLE = new Keyword("INSTANTIABLE");
	static INSTR = new Keyword("INSTR");
	static INSTR4 = new Keyword("INSTR4");
	static INSTRB = new Keyword("INSTRB");
	static INT = new Keyword("INT");
	static INTEGER = new Keyword("INTEGER");
	static INTERLEAVED = new Keyword("INTERLEAVED");
	static INTERNAL = new Keyword("INTERNAL");
	static INTERSECT = new Keyword("INTERSECT");
	static INTERVAL = new Keyword("INTERVAL");
	static INTO = new Keyword("INTO");
	static INVALIDATION = new Keyword("INVALIDATION");
	static INVISIBLE = new Keyword("INVISIBLE");
	static INVOKER = new Keyword("INVOKER");
	static IO_AFTER_GTIDS = new Keyword("IO_AFTER_GTIDS");
	static IO_BEFORE_GTIDS = new Keyword("IO_BEFORE_GTIDS");
	static IS = new Keyword("IS");
	static ISCLOSED = new Keyword("ISCLOSED");
	static ISDATE = new Keyword("ISDATE");
	static ISEMPTY = new Keyword("ISEMPTY");
	static ISFINITE = new Keyword("ISFINITE");
	static ISJSON = new Keyword("ISJSON");
	static ISNULL = new Keyword("ISNULL");
	static ISNUMERIC = new Keyword("ISNUMERIC");
	static ISODOW = new Keyword("ISODOW");
	static ISOLATE = new Keyword("ISOLATE");
	static ISOLATION = new Keyword("ISOLATION");
	static ISOPEN = new Keyword("ISOPEN");
	static ISOYEAR = new Keyword("ISOYEAR");
	static ISSUER = new Keyword("ISSUER");
	static IS_FREE_LOCK = new Keyword("IS_FREE_LOCK");
	static IS_IPV4 = new Keyword("IS_IPV4");
	static IS_IPV4_COMPAT = new Keyword("IS_IPV4_COMPAT");
	static IS_IPV4_MAPPED = new Keyword("IS_IPV4_MAPPED");
	static IS_IPV6 = new Keyword("IS_IPV6");
	static IS_LEAF = new Keyword("IS_LEAF");
	static IS_TEMPLATE = new Keyword("IS_TEMPLATE");
	static IS_USED_LOCK = new Keyword("IS_USED_LOCK");
	static IS_UUID = new Keyword("IS_UUID");
	static ITERATE = new Keyword("ITERATE");
	static JAVA = new Keyword("JAVA");
	static JOB = new Keyword("JOB");
	static JOIN = new Keyword("JOIN");
	static JSON = new Keyword("JSON");
	static JSONB_AGG = new Keyword("JSONB_AGG");
	static JSONB_ARRAY_ELEMENTS = new Keyword("JSONB_ARRAY_ELEMENTS");
	static JSONB_ARRAY_ELEMENTS_TEXT = new Keyword("JSONB_ARRAY_ELEMENTS_TEXT");
	static JSONB_ARRAY_LENGTH = new Keyword("JSONB_ARRAY_LENGTH");
	static JSONB_BUILD_ARRAY = new Keyword("JSONB_BUILD_ARRAY");
	static JSONB_BUILD_OBJECT = new Keyword("JSONB_BUILD_OBJECT");
	static JSONB_EACH = new Keyword("JSONB_EACH");
	static JSONB_EACH_TEXT = new Keyword("JSONB_EACH_TEXT");
	static JSONB_EXTRACT_PATH = new Keyword("JSONB_EXTRACT_PATH");
	static JSONB_EXTRACT_PATH_TEXT = new Keyword("JSONB_EXTRACT_PATH_TEXT");
	static JSONB_INSERT = new Keyword("JSONB_INSERT");
	static JSONB_OBJECT = new Keyword("JSONB_OBJECT");
	static JSONB_OBJECT_AGG = new Keyword("JSONB_OBJECT_AGG");
	static JSONB_OBJECT_KEYS = new Keyword("JSONB_OBJECT_KEYS");
	static JSONB_PATH_EXISTS = new Keyword("JSONB_PATH_EXISTS");
	static JSONB_PATH_EXISTS_TZ = new Keyword("JSONB_PATH_EXISTS_TZ");
	static JSONB_PATH_MATCH = new Keyword("JSONB_PATH_MATCH");
	static JSONB_PATH_MATCH_TZ = new Keyword("JSONB_PATH_MATCH_TZ");
	static JSONB_PATH_QUERY = new Keyword("JSONB_PATH_QUERY");
	static JSONB_PATH_QUERY_ARRAY = new Keyword("JSONB_PATH_QUERY_ARRAY");
	static JSONB_PATH_QUERY_ARRAY_TZ = new Keyword("JSONB_PATH_QUERY_ARRAY_TZ");
	static JSONB_PATH_QUERY_FIRST = new Keyword("JSONB_PATH_QUERY_FIRST");
	static JSONB_PATH_QUERY_FIRST_TZ = new Keyword("JSONB_PATH_QUERY_FIRST_TZ");
	static JSONB_PATH_QUERY_TZ = new Keyword("JSONB_PATH_QUERY_TZ");
	static JSONB_POPULATE_RECORD = new Keyword("JSONB_POPULATE_RECORD");
	static JSONB_POPULATE_RECORDSET = new Keyword("JSONB_POPULATE_RECORDSET");
	static JSONB_PRETTY = new Keyword("JSONB_PRETTY");
	static JSONB_SET = new Keyword("JSONB_SET");
	static JSONB_SET_LAX = new Keyword("JSONB_SET_LAX");
	static JSONB_STRIP_NULLS = new Keyword("JSONB_STRIP_NULLS");
	static JSONB_TO_RECORD = new Keyword("JSONB_TO_RECORD");
	static JSONB_TO_RECORDSET = new Keyword("JSONB_TO_RECORDSET");
	static JSONB_TO_TSVECTOR = new Keyword("JSONB_TO_TSVECTOR");
	static JSONB_TYPEOF = new Keyword("JSONB_TYPEOF");
	static JSON_AGG = new Keyword("JSON_AGG");
	static JSON_ARRAY = new Keyword("JSON_ARRAY");
	static JSON_ARRAYAGG = new Keyword("JSON_ARRAYAGG");
	static JSON_ARRAY_APPEND = new Keyword("JSON_ARRAY_APPEND");
	static JSON_ARRAY_ELEMENTS = new Keyword("JSON_ARRAY_ELEMENTS");
	static JSON_ARRAY_ELEMENTS_TEXT = new Keyword("JSON_ARRAY_ELEMENTS_TEXT");
	static JSON_ARRAY_INSERT = new Keyword("JSON_ARRAY_INSERT");
	static JSON_ARRAY_LENGTH = new Keyword("JSON_ARRAY_LENGTH");
	static JSON_BUILD_ARRAY = new Keyword("JSON_BUILD_ARRAY");
	static JSON_BUILD_OBJECT = new Keyword("JSON_BUILD_OBJECT");
	static JSON_CONTAINS = new Keyword("JSON_CONTAINS");
	static JSON_CONTAINS_PATH = new Keyword("JSON_CONTAINS_PATH");
	static JSON_DEPTH = new Keyword("JSON_DEPTH");
	static JSON_EACH = new Keyword("JSON_EACH");
	static JSON_EACH_TEXT = new Keyword("JSON_EACH_TEXT");
	static JSON_EXTRACT = new Keyword("JSON_EXTRACT");
	static JSON_EXTRACT_PATH = new Keyword("JSON_EXTRACT_PATH");
	static JSON_EXTRACT_PATH_TEXT = new Keyword("JSON_EXTRACT_PATH_TEXT");
	static JSON_GROUP_ARRAY = new Keyword("JSON_GROUP_ARRAY");
	static JSON_GROUP_OBJECT = new Keyword("JSON_GROUP_OBJECT");
	static JSON_INSERT = new Keyword("JSON_INSERT");
	static JSON_KEYS = new Keyword("JSON_KEYS");
	static JSON_LENGTH = new Keyword("JSON_LENGTH");
	static JSON_MERGE = new Keyword("JSON_MERGE");
	static JSON_MERGE_PATCH = new Keyword("JSON_MERGE_PATCH");
	static JSON_MERGE_PRESERVE = new Keyword("JSON_MERGE_PRESERVE");
	static JSON_MODIFY = new Keyword("JSON_MODIFY");
	static JSON_OBJECT = new Keyword("JSON_OBJECT");
	static JSON_OBJECTAGG = new Keyword("JSON_OBJECTAGG");
	static JSON_OBJECT_AGG = new Keyword("JSON_OBJECT_AGG");
	static JSON_OBJECT_KEYS = new Keyword("JSON_OBJECT_KEYS");
	static JSON_OVERLAPS = new Keyword("JSON_OVERLAPS");
	static JSON_PATCH = new Keyword("JSON_PATCH");
	static JSON_PATH_EXISTS = new Keyword("JSON_PATH_EXISTS");
	static JSON_POPULATE_RECORD = new Keyword("JSON_POPULATE_RECORD");
	static JSON_POPULATE_RECORDSET = new Keyword("JSON_POPULATE_RECORDSET");
	static JSON_PRETTY = new Keyword("JSON_PRETTY");
	static JSON_QUERY = new Keyword("JSON_QUERY");
	static JSON_QUOTE = new Keyword("JSON_QUOTE");
	static JSON_REMOVE = new Keyword("JSON_REMOVE");
	static JSON_REPLACE = new Keyword("JSON_REPLACE");
	static JSON_SCHEMA_VALID = new Keyword("JSON_SCHEMA_VALID");
	static JSON_SCHEMA_VALIDATION_REPORT = new Keyword(
		"JSON_SCHEMA_VALIDATION_REPORT",
	);
	static JSON_SEARCH = new Keyword("JSON_SEARCH");
	static JSON_SET = new Keyword("JSON_SET");
	static JSON_STORAGE_FREE = new Keyword("JSON_STORAGE_FREE");
	static JSON_STORAGE_SIZE = new Keyword("JSON_STORAGE_SIZE");
	static JSON_STRIP_NULLS = new Keyword("JSON_STRIP_NULLS");
	static JSON_TABLE = new Keyword("JSON_TABLE");
	static JSON_TO_RECORD = new Keyword("JSON_TO_RECORD");
	static JSON_TO_RECORDSET = new Keyword("JSON_TO_RECORDSET");
	static JSON_TO_TSVECTOR = new Keyword("JSON_TO_TSVECTOR");
	static JSON_TREE = new Keyword("JSON_TREE");
	static JSON_TYPE = new Keyword("JSON_TYPE");
	static JSON_TYPEOF = new Keyword("JSON_TYPEOF");
	static JSON_UNQUOTE = new Keyword("JSON_UNQUOTE");
	static JSON_VALID = new Keyword("JSON_VALID");
	static JSON_VALUE = new Keyword("JSON_VALUE");
	static JULIAN = new Keyword("JULIAN");
	static JULIANDAY = new Keyword("JULIANDAY");
	static JUSTIFY_DAYS = new Keyword("JUSTIFY_DAYS");
	static JUSTIFY_HOURS = new Keyword("JUSTIFY_HOURS");
	static JUSTIFY_INTERVAL = new Keyword("JUSTIFY_INTERVAL");
	static KEEP = new Keyword("KEEP");
	static KEEP_DUPLICATES = new Keyword("KEEP_DUPLICATES");
	static KEY = new Keyword("KEY");
	static KEYS = new Keyword("KEYS");
	static KEYSTORE = new Keyword("KEYSTORE");
	static KEY_BLOCK_SIZE = new Keyword("KEY_BLOCK_SIZE");
	static KILL = new Keyword("KILL");
	static LABEL = new Keyword("LABEL");
	static LAG = new Keyword("LAG");
	static LANGUAGE = new Keyword("LANGUAGE");
	static LARGE = new Keyword("LARGE");
	static LAST = new Keyword("LAST");
	static LASTVAL = new Keyword("LASTVAL");
	static LAST_DAY = new Keyword("LAST_DAY");
	static LAST_INSERT_ID = new Keyword("LAST_INSERT_ID");
	static LAST_INSERT_ROWID = new Keyword("LAST_INSERT_ROWID");
	static LAST_VALUE = new Keyword("LAST_VALUE");
	static LATERAL = new Keyword("LATERAL");
	static LCASE = new Keyword("LCASE");
	static LCM = new Keyword("LCM");
	static LC_COLLATE = new Keyword("LC_COLLATE");
	static LC_CTYPE = new Keyword("LC_CTYPE");
	static LEAD = new Keyword("LEAD");
	static LEADING = new Keyword("LEADING");
	static LEAD_CDB = new Keyword("LEAD_CDB");
	static LEAD_CDB_URI = new Keyword("LEAD_CDB_URI");
	static LEAF = new Keyword("LEAF");
	static LEAST = new Keyword("LEAST");
	static LEAVE = new Keyword("LEAVE");
	static LEFT = new Keyword("LEFT");
	static LEN = new Keyword("LEN");
	static LENGTH = new Keyword("LENGTH");
	static LENGTH4 = new Keyword("LENGTH4");
	static LENGTHB = new Keyword("LENGTHB");
	static LESS = new Keyword("LESS");
	static LEVEL = new Keyword("LEVEL");
	static LEVELS = new Keyword("LEVELS");
	static LEVEL_NAME = new Keyword("LEVEL_NAME");
	static LIBRARY = new Keyword("LIBRARY");
	static LIKE = new Keyword("LIKE");
	static LIKE2 = new Keyword("LIKE2");
	static LIKE4 = new Keyword("LIKE4");
	static LIKEC = new Keyword("LIKEC");
	static LIKELIHOOD = new Keyword("LIKELIHOOD");
	static LIKELY = new Keyword("LIKELY");
	static LIMIT = new Keyword("LIMIT");
	static LINE = new Keyword("LINE");
	static LINEAR = new Keyword("LINEAR");
	static LINENO = new Keyword("LINENO");
	static LINES = new Keyword("LINES");
	static LINESTRING = new Keyword("LINESTRING");
	static LINK = new Keyword("LINK");
	static LIST = new Keyword("LIST");
	static LISTEN = new Keyword("LISTEN");
	static LITERAL = new Keyword("LITERAL");
	static LN = new Keyword("LN");
	static LNNVL = new Keyword("LNNVL");
	static LOAD = new Keyword("LOAD");
	static LOAD_EXTENSION = new Keyword("LOAD_EXTENSION");
	static LOAD_FILE = new Keyword("LOAD_FILE");
	static LOB = new Keyword("LOB");
	static LOBS = new Keyword("LOBS");
	static LOCAL = new Keyword("LOCAL");
	static LOCALTIME = new Keyword("LOCALTIME");
	static LOCALTIMESTAMP = new Keyword("LOCALTIMESTAMP");
	static LOCATE = new Keyword("LOCATE");
	static LOCATION = new Keyword("LOCATION");
	static LOCATOR = new Keyword("LOCATOR");
	static LOCK = new Keyword("LOCK");
	static LOCKDOWN = new Keyword("LOCKDOWN");
	static LOCKED = new Keyword("LOCKED");
	static LOCKING = new Keyword("LOCKING");
	static LOG = new Keyword("LOG");
	static LOG10 = new Keyword("LOG10");
	static LOG2 = new Keyword("LOG2");
	static LOGFILE = new Keyword("LOGFILE");
	static LOGFILES = new Keyword("LOGFILES");
	static LOGGING = new Keyword("LOGGING");
	static LOGICAL = new Keyword("LOGICAL");
	static LOGICAL_READS_PER_CALL = new Keyword("LOGICAL_READS_PER_CALL");
	static LOGICAL_READS_PER_SESSION = new Keyword("LOGICAL_READS_PER_SESSION");
	static LOGIN = new Keyword("LOGIN");
	static LOGS = new Keyword("LOGS");
	static LONG = new Keyword("LONG");
	static LONGBLOB = new Keyword("LONGBLOB");
	static LONGTEXT = new Keyword("LONGTEXT");
	static LOOP = new Keyword("LOOP");
	static LOST = new Keyword("LOST");
	static LOW = new Keyword("LOW");
	static LOWER = new Keyword("LOWER");
	static LOWER_INC = new Keyword("LOWER_INC");
	static LOWER_INF = new Keyword("LOWER_INF");
	static LOW_PRIORITY = new Keyword("LOW_PRIORITY");
	static LPAD = new Keyword("LPAD");
	static LSEG = new Keyword("LSEG");
	static LTRIM = new Keyword("LTRIM");
	static M = new Keyword("M");
	static MACADDR8_SET7BIT = new Keyword("MACADDR8_SET7BIT");
	static MAIN = new Keyword("MAIN");
	static MAKEACLITEM = new Keyword("MAKEACLITEM");
	static MAKEDATE = new Keyword("MAKEDATE");
	static MAKETIME = new Keyword("MAKETIME");
	static MAKE_DATE = new Keyword("MAKE_DATE");
	static MAKE_INTERVAL = new Keyword("MAKE_INTERVAL");
	static MAKE_SET = new Keyword("MAKE_SET");
	static MAKE_TIME = new Keyword("MAKE_TIME");
	static MAKE_TIMESTAMP = new Keyword("MAKE_TIMESTAMP");
	static MAKE_TIMESTAMPTZ = new Keyword("MAKE_TIMESTAMPTZ");
	static MANAGED = new Keyword("MANAGED");
	static MANAGEMENT = new Keyword("MANAGEMENT");
	static MANUAL = new Keyword("MANUAL");
	static MAP = new Keyword("MAP");
	static MAPPING = new Keyword("MAPPING");
	static MASKLEN = new Keyword("MASKLEN");
	static MASTER = new Keyword("MASTER");
	static MASTER_BIND = new Keyword("MASTER_BIND");
	static MASTER_POS_WAIT = new Keyword("MASTER_POS_WAIT");
	static MASTER_SERVER_ID = new Keyword("MASTER_SERVER_ID");
	static MASTER_SSL_VERIFY_SERVER_CERT = new Keyword(
		"MASTER_SSL_VERIFY_SERVER_CERT",
	);
	static MATCH = new Keyword("MATCH");
	static MATCHED = new Keyword("MATCHED");
	static MATCH_NUMBER = new Keyword("MATCH_NUMBER");
	static MATCH_RECOGNIZE = new Keyword("MATCH_RECOGNIZE");
	static MATERIALIZED = new Keyword("MATERIALIZED");
	static MAX = new Keyword("MAX");
	static MAXDATAFILES = new Keyword("MAXDATAFILES");
	static MAXEXTENTS = new Keyword("MAXEXTENTS");
	static MAXIMIZE = new Keyword("MAXIMIZE");
	static MAXINSTANCES = new Keyword("MAXINSTANCES");
	static MAXLEN = new Keyword("MAXLEN");
	static MAXLOGFILES = new Keyword("MAXLOGFILES");
	static MAXLOGHISTORY = new Keyword("MAXLOGHISTORY");
	static MAXLOGMEMBERS = new Keyword("MAXLOGMEMBERS");
	static MAXSIZE = new Keyword("MAXSIZE");
	static MAXVALUE = new Keyword("MAXVALUE");
	static MAX_AUDIT_SIZE = new Keyword("MAX_AUDIT_SIZE");
	static MAX_CONNECTIONS_PER_HOUR = new Keyword("MAX_CONNECTIONS_PER_HOUR");
	static MAX_DIAG_SIZE = new Keyword("MAX_DIAG_SIZE");
	static MAX_QUERIES_PER_HOUR = new Keyword("MAX_QUERIES_PER_HOUR");
	static MAX_ROWS = new Keyword("MAX_ROWS");
	static MAX_SIZE = new Keyword("MAX_SIZE");
	static MAX_UPDATES_PER_HOUR = new Keyword("MAX_UPDATES_PER_HOUR");
	static MAX_USER_CONNECTIONS = new Keyword("MAX_USER_CONNECTIONS");
	static MBRCONTAINS = new Keyword("MBRCONTAINS");
	static MBRCOVEREDBY = new Keyword("MBRCOVEREDBY");
	static MBRCOVERS = new Keyword("MBRCOVERS");
	static MBRDISJOINT = new Keyword("MBRDISJOINT");
	static MBREQUALS = new Keyword("MBREQUALS");
	static MBRINTERSECTS = new Keyword("MBRINTERSECTS");
	static MBROVERLAPS = new Keyword("MBROVERLAPS");
	static MBRTOUCHES = new Keyword("MBRTOUCHES");
	static MBRWITHIN = new Keyword("MBRWITHIN");
	static MD5 = new Keyword("MD5");
	static MEASURE = new Keyword("MEASURE");
	static MEASURES = new Keyword("MEASURES");
	static MEDIUM = new Keyword("MEDIUM");
	static MEDIUMBLOB = new Keyword("MEDIUMBLOB");
	static MEDIUMINT = new Keyword("MEDIUMINT");
	static MEDIUMTEXT = new Keyword("MEDIUMTEXT");
	static MEMBER = new Keyword("MEMBER");
	static MEMBER_CAPTION = new Keyword("MEMBER_CAPTION");
	static MEMBER_DESCRIPTION = new Keyword("MEMBER_DESCRIPTION");
	static MEMBER_NAME = new Keyword("MEMBER_NAME");
	static MEMBER_OF = new Keyword("MEMBER_OF");
	static MEMBER_UNIQUE_NAME = new Keyword("MEMBER_UNIQUE_NAME");
	static MEMCOMPRESS = new Keyword("MEMCOMPRESS");
	static MEMOPTIMIZE = new Keyword("MEMOPTIMIZE");
	static MEMORY = new Keyword("MEMORY");
	static MERGE = new Keyword("MERGE");
	static MESSAGE = new Keyword("MESSAGE");
	static METADATA = new Keyword("METADATA");
	static METHOD = new Keyword("METHOD");
	static MICROSECOND = new Keyword("MICROSECOND");
	static MICROSECONDS = new Keyword("MICROSECONDS");
	static MID = new Keyword("MID");
	static MIDDLEINT = new Keyword("MIDDLEINT");
	static MIGRATE = new Keyword("MIGRATE");
	static MIGRATION = new Keyword("MIGRATION");
	static MILLENNIUM = new Keyword("MILLENNIUM");
	static MILLISECONDS = new Keyword("MILLISECONDS");
	static MIN = new Keyword("MIN");
	static MINIMUM = new Keyword("MINIMUM");
	static MINING = new Keyword("MINING");
	static MINUS = new Keyword("MINUS");
	static MINUTE = new Keyword("MINUTE");
	static MINUTES = new Keyword("MINUTES");
	static MINUTE_MICROSECOND = new Keyword("MINUTE_MICROSECOND");
	static MINUTE_SECOND = new Keyword("MINUTE_SECOND");
	static MINVALUE = new Keyword("MINVALUE");
	static MIN_ROWS = new Keyword("MIN_ROWS");
	static MIN_SCALE = new Keyword("MIN_SCALE");
	static MIRROR = new Keyword("MIRROR");
	static MIRRORCOLD = new Keyword("MIRRORCOLD");
	static MIRRORHOT = new Keyword("MIRRORHOT");
	static MLSLABEL = new Keyword("MLSLABEL");
	static MOD = new Keyword("MOD");
	static MODE = new Keyword("MODE");
	static MODEL = new Keyword("MODEL");
	static MODIFICATION = new Keyword("MODIFICATION");
	static MODIFIES = new Keyword("MODIFIES");
	static MODIFY = new Keyword("MODIFY");
	static MONEY = new Keyword("MONEY");
	static MONITORING = new Keyword("MONITORING");
	static MONTH = new Keyword("MONTH");
	static MONTHNAME = new Keyword("MONTHNAME");
	static MONTHS = new Keyword("MONTHS");
	static MONTHS_BETWEEN = new Keyword("MONTHS_BETWEEN");
	static MOUNT = new Keyword("MOUNT");
	static MOUNTPATH = new Keyword("MOUNTPATH");
	static MOVE = new Keyword("MOVE");
	static MOVEMENT = new Keyword("MOVEMENT");
	static MULTILINESTRING = new Keyword("MULTILINESTRING");
	static MULTIPOINT = new Keyword("MULTIPOINT");
	static MULTIPOLYGON = new Keyword("MULTIPOLYGON");
	static MULTIRANGE = new Keyword("MULTIRANGE");
	static NAME = new Keyword("NAME");
	static NAMED = new Keyword("NAMED");
	static NAMES = new Keyword("NAMES");
	static NAMESPACE = new Keyword("NAMESPACE");
	static NAME_CONST = new Keyword("NAME_CONST");
	static NATIONAL = new Keyword("NATIONAL");
	static NATURAL = new Keyword("NATURAL");
	static NATURALN = new Keyword("NATURALN");
	static NAV = new Keyword("NAV");
	static NCHAR = new Keyword("NCHAR");
	static NCHR = new Keyword("NCHR");
	static NESTED = new Keyword("NESTED");
	static NESTED_TABLE_ID = new Keyword("NESTED_TABLE_ID");
	static NETMASK = new Keyword("NETMASK");
	static NETWORK = new Keyword("NETWORK");
	static NEVER = new Keyword("NEVER");
	static NEW = new Keyword("NEW");
	static NEXT = new Keyword("NEXT");
	static NEXTVAL = new Keyword("NEXTVAL");
	static NFC = new Keyword("NFC");
	static NFD = new Keyword("NFD");
	static NFKC = new Keyword("NFKC");
	static NFKD = new Keyword("NFKD");
	static NLSSORT = new Keyword("NLSSORT");
	static NLS_CHARSET_ID = new Keyword("NLS_CHARSET_ID");
	static NLS_CHARSET_NAME = new Keyword("NLS_CHARSET_NAME");
	static NO = new Keyword("NO");
	static NOARCHIVELOG = new Keyword("NOARCHIVELOG");
	static NOAUDIT = new Keyword("NOAUDIT");
	static NOCACHE = new Keyword("NOCACHE");
	static NOCASE = new Keyword("NOCASE");
	static NOCHECK = new Keyword("NOCHECK");
	static NOCOMPRESS = new Keyword("NOCOMPRESS");
	static NOCOPY = new Keyword("NOCOPY");
	static NOCYCLE = new Keyword("NOCYCLE");
	static NODEGROUP = new Keyword("NODEGROUP");
	static NODELAY = new Keyword("NODELAY");
	static NOFORCE = new Keyword("NOFORCE");
	static NOGUARANTEE = new Keyword("NOGUARANTEE");
	static NOKEEP = new Keyword("NOKEEP");
	static NOMAPPING = new Keyword("NOMAPPING");
	static NOMAXVALUE = new Keyword("NOMAXVALUE");
	static NOMINVALUE = new Keyword("NOMINVALUE");
	static NOMONITORING = new Keyword("NOMONITORING");
	static NON = new Keyword("NON");
	static NONCLUSTERED = new Keyword("NONCLUSTERED");
	static NONE = new Keyword("NONE");
	static NONEDITIONABLE = new Keyword("NONEDITIONABLE");
	static NONSCHEMA = new Keyword("NONSCHEMA");
	static NOORDER = new Keyword("NOORDER");
	static NOPARALLEL = new Keyword("NOPARALLEL");
	static NORELOCATE = new Keyword("NORELOCATE");
	static NORELY = new Keyword("NORELY");
	static NOREPAIR = new Keyword("NOREPAIR");
	static NOREPLY = new Keyword("NOREPLY");
	static NORESETLOGS = new Keyword("NORESETLOGS");
	static NOREVERSE = new Keyword("NOREVERSE");
	static NORMAL = new Keyword("NORMAL");
	static NORMALIZED = new Keyword("NORMALIZED");
	static NOROWDEPENDENCIES = new Keyword("NOROWDEPENDENCIES");
	static NOSCALE = new Keyword("NOSCALE");
	static NOSHARED = new Keyword("NOSHARED");
	static NOSORT = new Keyword("NOSORT");
	static NOSWITCH = new Keyword("NOSWITCH");
	static NOT = new Keyword("NOT");
	static NOTFOUND = new Keyword("NOTFOUND");
	static NOTHING = new Keyword("NOTHING");
	static NOTIFY = new Keyword("NOTIFY");
	static NOTIFICATION = new Keyword("NOTIFICATION");
	static NOTNULL = new Keyword("NOTNULL");
	static NOT_FEASIBLE = new Keyword("NOT_FEASIBLE");
	static NOT_FEASIBLE_END = new Keyword("NOT_FEASIBLE_END");
	static NOT_FEASIBLE_START = new Keyword("NOT_FEASIBLE_START");
	static NOVALIDATE = new Keyword("NOVALIDATE");
	static NOW = new Keyword("NOW");
	static NOWAIT = new Keyword("NOWAIT");
	static NO_WRITE_TO_BINLOG = new Keyword("NO_WRITE_TO_BINLOG");
	static NPOINTS = new Keyword("NPOINTS");
	static NTH_VALUE = new Keyword("NTH_VALUE");
	static NTILE = new Keyword("NTILE");
	static NULL = new Keyword("NULL");
	static NULLIF = new Keyword("NULLIF");
	static NULLS = new Keyword("NULLS");
	static NUMBER = new Keyword("NUMBER");
	static NUMERIC = new Keyword("NUMERIC");
	static NUMNODE = new Keyword("NUMNODE");
	static NUMTODSINTERVAL = new Keyword("NUMTODSINTERVAL");
	static NUMTOYMINTERVAL = new Keyword("NUMTOYMINTERVAL");
	static NUM_NONNULLS = new Keyword("NUM_NONNULLS");
	static NUM_NULLS = new Keyword("NUM_NULLS");
	static NVARCHAR = new Keyword("NVARCHAR");
	static NVARCHAR2 = new Keyword("NVARCHAR2");
	static NVL = new Keyword("NVL");
	static NVL2 = new Keyword("NVL2");
	static OBJECT = new Keyword("OBJECT");
	static OBJECT_ID = new Keyword("OBJECT_ID");
	static OBJECT_VALUE = new Keyword("OBJECT_VALUE");
	static OCT = new Keyword("OCT");
	static OCTET_LENGTH = new Keyword("OCTET_LENGTH");
	static OF = new Keyword("OF");
	static OFF = new Keyword("OFF");
	static OFFLINE = new Keyword("OFFLINE");
	static OFFSET = new Keyword("OFFSET");
	static OFFSETS = new Keyword("OFFSETS");
	static OID = new Keyword("OID");
	static OIDINDEX = new Keyword("OIDINDEX");
	static OLD = new Keyword("OLD");
	static OLTP = new Keyword("OLTP");
	static ON = new Keyword("ON");
	static ONE = new Keyword("ONE");
	static ONLINE = new Keyword("ONLINE");
	static ONLY = new Keyword("ONLY");
	static OPAQUE = new Keyword("OPAQUE");
	static OPEN = new Keyword("OPEN");
	static OPENDATASOURCE = new Keyword("OPENDATASOURCE");
	static OPENJSON = new Keyword("OPENJSON");
	static OPENQUERY = new Keyword("OPENQUERY");
	static OPENROWSET = new Keyword("OPENROWSET");
	static OPENXML = new Keyword("OPENXML");
	static OPERATOR = new Keyword("OPERATOR");
	static OPTIMIZE = new Keyword("OPTIMIZE");
	static OPTIMIZER_COSTS = new Keyword("OPTIMIZER_COSTS");
	static OPTION = new Keyword("OPTION");
	static OPTIONAL = new Keyword("OPTIONAL");
	static OPTIONALLY = new Keyword("OPTIONALLY");
	static OPTIONS = new Keyword("OPTIONS");
	static OR = new Keyword("OR");
	static ORA_ROWSCN = new Keyword("ORA_ROWSCN");
	static ORD = new Keyword("ORD");
	static ORDAUDIO = new Keyword("ORDAUDIO");
	static ORDDICOM = new Keyword("ORDDICOM");
	static ORDDOC = new Keyword("ORDDOC");
	static ORDER = new Keyword("ORDER");
	static ORDIMAGE = new Keyword("ORDIMAGE");
	static ORDIMAGESIGNATURE = new Keyword("ORDIMAGESIGNATURE");
	static ORDINALITY = new Keyword("ORDINALITY");
	static ORDVIDEO = new Keyword("ORDVIDEO");
	static ORGANIZATION = new Keyword("ORGANIZATION");
	static OTHER = new Keyword("OTHER");
	static OTHERS = new Keyword("OTHERS");
	static OUT = new Keyword("OUT");
	static OUTER = new Keyword("OUTER");
	static OUTFILE = new Keyword("OUTFILE");
	static OUTLINE = new Keyword("OUTLINE");
	static OVER = new Keyword("OVER");
	static OVERFLOW = new Keyword("OVERFLOW");
	static OVERLAPS = new Keyword("OVERLAPS");
	static OVERLAY = new Keyword("OVERLAY");
	static OVERRIDING = new Keyword("OVERRIDING");
	static OWNED = new Keyword("OWNED");
	static OWNER = new Keyword("OWNER");
	static OWNERSHIP = new Keyword("OWNERSHIP");
	static P = new Keyword("P");
	static PACKAGE = new Keyword("PACKAGE");
	static PACKAGES = new Keyword("PACKAGES");
	static PACK_KEYS = new Keyword("PACK_KEYS");
	static PAGE_CHECKSUM = new Keyword("PAGE_CHECKSUM");
	static PAGE_COMPRESSED = new Keyword("PAGE_COMPRESSED");
	static PAGE_COMPRESSION_LEVEL = new Keyword("PAGE_COMPRESSION_LEVEL");
	static PARALLEL = new Keyword("PARALLEL");
	static PARALLEL_ENABLE = new Keyword("PARALLEL_ENABLE");
	static PARAMETERS = new Keyword("PARAMETERS");
	static PARENT_LEVEL_NAME = new Keyword("PARENT_LEVEL_NAME");
	static PARENT_UNIQUE_NAME = new Keyword("PARENT_UNIQUE_NAME");
	static PARITY = new Keyword("PARITY");
	static PARSE = new Keyword("PARSE");
	static PARSER = new Keyword("PARSER");
	static PARSE_GCOL_EXPR = new Keyword("PARSE_GCOL_EXPR");
	static PARSE_IDENT = new Keyword("PARSE_IDENT");
	static PARTIAL = new Keyword("PARTIAL");
	static PARTITION = new Keyword("PARTITION");
	static PARTITIONS = new Keyword("PARTITIONS");
	static PARTITIONSET = new Keyword("PARTITIONSET");
	static PASSING = new Keyword("PASSING");
	static PASSWORD = new Keyword("PASSWORD");
	static PASSWORDFILE_METADATA_CACHE = new Keyword(
		"PASSWORDFILE_METADATA_CACHE",
	);
	static PASSWORD_GRACE_TIME = new Keyword("PASSWORD_GRACE_TIME");
	static PASSWORD_LIFE_TIME = new Keyword("PASSWORD_LIFE_TIME");
	static PASSWORD_LOCK_TIME = new Keyword("PASSWORD_LOCK_TIME");
	static PASSWORD_REUSE_MAX = new Keyword("PASSWORD_REUSE_MAX");
	static PASSWORD_REUSE_TIME = new Keyword("PASSWORD_REUSE_TIME");
	static PASSWORD_ROLLOVER_TIME = new Keyword("PASSWORD_ROLLOVER_TIME");
	static PASSWORD_VERIFY_FUNCTION = new Keyword("PASSWORD_VERIFY_FUNCTION");
	static PATCH = new Keyword("PATCH");
	static PATH = new Keyword("PATH");
	static PATH_PREFIX = new Keyword("PATH_PREFIX");
	static PATINDEX = new Keyword("PATINDEX");
	static PATTERN = new Keyword("PATTERN");
	static PCLOSE = new Keyword("PCLOSE");
	static PCTFREE = new Keyword("PCTFREE");
	static PCTTHRESHOLD = new Keyword("PCTTHRESHOLD");
	static PCTUSED = new Keyword("PCTUSED");
	static PCTVERSION = new Keyword("PCTVERSION");
	static PER = new Keyword("PER");
	static PERCENT = new Keyword("PERCENT");
	static PERCENTILE_CONT = new Keyword("PERCENTILE_CONT");
	static PERCENTILE_DISC = new Keyword("PERCENTILE_DISC");
	static PERCENT_RANK = new Keyword("PERCENT_RANK");
	static PERFORMANCE = new Keyword("PERFORMANCE");
	static PERIOD = new Keyword("PERIOD");
	static PERIOD_ADD = new Keyword("PERIOD_ADD");
	static PERIOD_DIFF = new Keyword("PERIOD_DIFF");
	static PERMANENT = new Keyword("PERMANENT");
	static PERMISSION = new Keyword("PERMISSION");
	static PFILE = new Keyword("PFILE");
	static PG_ADVISORY_LOCK = new Keyword("PG_ADVISORY_LOCK");
	static PG_ADVISORY_LOCK_SHARED = new Keyword("PG_ADVISORY_LOCK_SHARED");
	static PG_ADVISORY_UNLOCK = new Keyword("PG_ADVISORY_UNLOCK");
	static PG_ADVISORY_UNLOCK_ALL = new Keyword("PG_ADVISORY_UNLOCK_ALL");
	static PG_ADVISORY_UNLOCK_SHARED = new Keyword("PG_ADVISORY_UNLOCK_SHARED");
	static PG_ADVISORY_XACT_LOCK = new Keyword("PG_ADVISORY_XACT_LOCK");
	static PG_ADVISORY_XACT_LOCK_SHARED = new Keyword(
		"PG_ADVISORY_XACT_LOCK_SHARED",
	);
	static PG_BACKEND_PID = new Keyword("PG_BACKEND_PID");
	static PG_BLOCKING_PIDS = new Keyword("PG_BLOCKING_PIDS");
	static PG_CLIENT_ENCODING = new Keyword("PG_CLIENT_ENCODING");
	static PG_COLLATION_IS_VISIBLE = new Keyword("PG_COLLATION_IS_VISIBLE");
	static PG_CONF_LOAD_TIME = new Keyword("PG_CONF_LOAD_TIME");
	static PG_CONVERSION_IS_VISIBLE = new Keyword("PG_CONVERSION_IS_VISIBLE");
	static PG_CURRENT_LOGFILE = new Keyword("PG_CURRENT_LOGFILE");
	static PG_EVENT_TRIGGER_DDL_COMMANDS = new Keyword(
		"PG_EVENT_TRIGGER_DDL_COMMANDS",
	);
	static PG_EVENT_TRIGGER_DROPPED_OBJECTS = new Keyword(
		"PG_EVENT_TRIGGER_DROPPED_OBJECTS",
	);
	static PG_EVENT_TRIGGER_TABLE_REWRITE_OID = new Keyword(
		"PG_EVENT_TRIGGER_TABLE_REWRITE_OID",
	);
	static PG_EVENT_TRIGGER_TABLE_REWRITE_REASON = new Keyword(
		"PG_EVENT_TRIGGER_TABLE_REWRITE_REASON",
	);
	static PG_HAS_ROLE = new Keyword("PG_HAS_ROLE");
	static PG_IS_OTHER_TEMP_SCHEMA = new Keyword("PG_IS_OTHER_TEMP_SCHEMA");
	static PG_JIT_AVAILABLE = new Keyword("PG_JIT_AVAILABLE");
	static PG_LISTENING_CHANNELS = new Keyword("PG_LISTENING_CHANNELS");
	static PG_LS_ARCHIVE_STATUSDIR = new Keyword("PG_LS_ARCHIVE_STATUSDIR");
	static PG_LS_DIR = new Keyword("PG_LS_DIR");
	static PG_LS_LOGDIR = new Keyword("PG_LS_LOGDIR");
	static PG_LS_LOGICALMAPDIR = new Keyword("PG_LS_LOGICALMAPDIR");
	static PG_LS_LOGICALSNAPDIR = new Keyword("PG_LS_LOGICALSNAPDIR");
	static PG_LS_REPLSLOTDIR = new Keyword("PG_LS_REPLSLOTDIR");
	static PG_LS_TMPDIR = new Keyword("PG_LS_TMPDIR");
	static PG_LS_WALDIR = new Keyword("PG_LS_WALDIR");
	static PG_MCV_LIST_ITEMS = new Keyword("PG_MCV_LIST_ITEMS");
	static PG_MY_TEMP_SCHEMA = new Keyword("PG_MY_TEMP_SCHEMA");
	static PG_NOTIFICATION_QUEUE_USAGE = new Keyword(
		"PG_NOTIFICATION_QUEUE_USAGE",
	);
	static PG_POSTMASTER_START_TIME = new Keyword("PG_POSTMASTER_START_TIME");
	static PG_READ_BINARY_FILE = new Keyword("PG_READ_BINARY_FILE");
	static PG_READ_FILE = new Keyword("PG_READ_FILE");
	static PG_SAFE_SNAPSHOT_BLOCKING_PIDS = new Keyword(
		"PG_SAFE_SNAPSHOT_BLOCKING_PIDS",
	);
	static PG_SLEEP = new Keyword("PG_SLEEP");
	static PG_SLEEP_FOR = new Keyword("PG_SLEEP_FOR");
	static PG_SLEEP_UNTIL = new Keyword("PG_SLEEP_UNTIL");
	static PG_STAT_FILE = new Keyword("PG_STAT_FILE");
	static PG_TRIGGER_DEPTH = new Keyword("PG_TRIGGER_DEPTH");
	static PG_TRY_ADVISORY_LOCK = new Keyword("PG_TRY_ADVISORY_LOCK");
	static PG_TRY_ADVISORY_LOCK_SHARED = new Keyword(
		"PG_TRY_ADVISORY_LOCK_SHARED",
	);
	static PG_TRY_ADVISORY_XACT_LOCK = new Keyword("PG_TRY_ADVISORY_XACT_LOCK");
	static PG_TRY_ADVISORY_XACT_LOCK_SHARED = new Keyword(
		"PG_TRY_ADVISORY_XACT_LOCK_SHARED",
	);
	static PHRASETO_TSQUERY = new Keyword("PHRASETO_TSQUERY");
	static PHYSICAL = new Keyword("PHYSICAL");
	static PI = new Keyword("PI");
	static PIPE = new Keyword("PIPE");
	static PIPELINED = new Keyword("PIPELINED");
	static PIVOT = new Keyword("PIVOT");
	static PLACING = new Keyword("PLACING");
	static PLAINTO_TSQUERY = new Keyword("PLAINTO_TSQUERY");
	static PLAN = new Keyword("PLAN");
	static PLS_INTEGER = new Keyword("PLS_INTEGER");
	static PLUGGABLE = new Keyword("PLUGGABLE");
	static PLUGIN = new Keyword("PLUGIN");
	static POINT = new Keyword("POINT");
	static POLICY = new Keyword("POLICY");
	static POLYGON = new Keyword("POLYGON");
	static POLYMORPHIC = new Keyword("POLYMORPHIC");
	static POPEN = new Keyword("POPEN");
	static PORT = new Keyword("PORT");
	static POSITION = new Keyword("POSITION");
	static POSITIVE = new Keyword("POSITIVE");
	static POSITIVEN = new Keyword("POSITIVEN");
	static POST_TRANSACTION = new Keyword("POST_TRANSACTION");
	static POW = new Keyword("POW");
	static POWER = new Keyword("POWER");
	static PRAGMA = new Keyword("PRAGMA");
	static PREBUILD = new Keyword("PREBUILD");
	static PRECEDES = new Keyword("PRECEDES");
	static PRECEDING = new Keyword("PRECEDING");
	static PRECISION = new Keyword("PRECISION");
	static PREDICT = new Keyword("PREDICT");
	static PREPARE = new Keyword("PREPARE");
	static PREPARED = new Keyword("PREPARED");
	static PRESERVE = new Keyword("PRESERVE");
	static PREV = new Keyword("PREV");
	static PRIMARY = new Keyword("PRIMARY");
	static PRINT = new Keyword("PRINT");
	static PRINTF = new Keyword("PRINTF");
	static PRIOR = new Keyword("PRIOR");
	static PRIORITY = new Keyword("PRIORITY");
	static PRIVATE = new Keyword("PRIVATE");
	static PRIVATE_SGA = new Keyword("PRIVATE_SGA");
	static PRIVILEGES = new Keyword("PRIVILEGES");
	static PROC = new Keyword("PROC");
	static PROCEDURAL = new Keyword("PROCEDURAL");
	static PROCEDURE = new Keyword("PROCEDURE");
	static PROFILE = new Keyword("PROFILE");
	static PROJECT = new Keyword("PROJECT");
	static PROPERTY = new Keyword("PROPERTY");
	static PROTECTION = new Keyword("PROTECTION");
	static PROXY = new Keyword("PROXY");
	static PRUNING = new Keyword("PRUNING");
	static PS_CURRENT_THREAD_ID = new Keyword("PS_CURRENT_THREAD_ID");
	static PS_THREAD_ID = new Keyword("PS_THREAD_ID");
	static PUBLIC = new Keyword("PUBLIC");
	static PUBLICATION = new Keyword("PUBLICATION");
	static PURGE = new Keyword("PURGE");
	static QUARTER = new Keyword("QUARTER");
	static QUARTERS = new Keyword("QUARTERS");
	static QUERY = new Keyword("QUERY");
	static QUERYTREE = new Keyword("QUERYTREE");
	static QUERY_TO_XML = new Keyword("QUERY_TO_XML");
	static QUERY_TO_XMLSCHEMA = new Keyword("QUERY_TO_XMLSCHEMA");
	static QUERY_TO_XML_AND_XMLSCHEMA = new Keyword("QUERY_TO_XML_AND_XMLSCHEMA");
	static QUEUE = new Keyword("QUEUE");
	static QUICK = new Keyword("QUICK");
	static QUIESCE = new Keyword("QUIESCE");
	static QUORUM = new Keyword("QUORUM");
	static QUOTA = new Keyword("QUOTA");
	static QUOTAGROUP = new Keyword("QUOTAGROUP");
	static QUOTE = new Keyword("QUOTE");
	static QUOTENAME = new Keyword("QUOTENAME");
	static QUOTE_IDENT = new Keyword("QUOTE_IDENT");
	static QUOTE_LITERAL = new Keyword("QUOTE_LITERAL");
	static QUOTE_NULLABLE = new Keyword("QUOTE_NULLABLE");
	static RADIANS = new Keyword("RADIANS");
	static RADIUS = new Keyword("RADIUS");
	static RAISE = new Keyword("RAISE");
	static RAISE_APPLICATION_ERROR = new Keyword("RAISE_APPLICATION_ERROR");
	static RAISERROR = new Keyword("RAISERROR");
	static RAND = new Keyword("RAND");
	static RANDOM = new Keyword("RANDOM");
	static RANDOMBLOB = new Keyword("RANDOMBLOB");
	static RANDOM_BYTES = new Keyword("RANDOM_BYTES");
	static RANGE = new Keyword("RANGE");
	static RANGE_AGG = new Keyword("RANGE_AGG");
	static RANGE_INTERSECT_AGG = new Keyword("RANGE_INTERSECT_AGG");
	static RANGE_MERGE = new Keyword("RANGE_MERGE");
	static RANK = new Keyword("RANK");
	static RAW = new Keyword("RAW");
	static READ = new Keyword("READ");
	static READS = new Keyword("READS");
	static READTEXT = new Keyword("READTEXT");
	static READ_WRITE = new Keyword("READ_WRITE");
	static REAL = new Keyword("REAL");
	static REASSIGN = new Keyword("REASSIGN");
	static REBUILD = new Keyword("REBUILD");
	static RECEIVE = new Keyword("RECEIVE");
	static RECONFIGURE = new Keyword("RECONFIGURE");
	static RECORD = new Keyword("RECORD");
	static RECOVER = new Keyword("RECOVER");
	static RECURSIVE = new Keyword("RECURSIVE");
	static RECYCLEBIN = new Keyword("RECYCLEBIN");
	static REDO = new Keyword("REDO");
	static REDOFILE = new Keyword("REDOFILE");
	static REDO_BUFFER_SIZE = new Keyword("REDO_BUFFER_SIZE");
	static REDUCED = new Keyword("REDUCED");
	static REDUNDANCY = new Keyword("REDUNDANCY");
	static REDUNDANT = new Keyword("REDUNDANT");
	static REF = new Keyword("REF");
	static REFCURSOR = new Keyword("REFCURSOR");
	static REFERENCE = new Keyword("REFERENCE");
	static REFERENCED = new Keyword("REFERENCED");
	static REFERENCES = new Keyword("REFERENCES");
	static REFRESH = new Keyword("REFRESH");
	static REGEXP = new Keyword("REGEXP");
	static REGEXP_COUNT = new Keyword("REGEXP_COUNT");
	static REGEXP_INSTR = new Keyword("REGEXP_INSTR");
	static REGEXP_LIKE = new Keyword("REGEXP_LIKE");
	static REGEXP_MATCH = new Keyword("REGEXP_MATCH");
	static REGEXP_MATCHES = new Keyword("REGEXP_MATCHES");
	static REGEXP_REPLACE = new Keyword("REGEXP_REPLACE");
	static REGEXP_SPLIT_TO_ARRAY = new Keyword("REGEXP_SPLIT_TO_ARRAY");
	static REGEXP_SPLIT_TO_TABLE = new Keyword("REGEXP_SPLIT_TO_TABLE");
	static REGEXP_SUBSTR = new Keyword("REGEXP_SUBSTR");
	static REGISTER = new Keyword("REGISTER");
	static REGR_AVGX = new Keyword("REGR_AVGX");
	static REGR_AVGY = new Keyword("REGR_AVGY");
	static REGR_COUNT = new Keyword("REGR_COUNT");
	static REGR_INTERCEPT = new Keyword("REGR_INTERCEPT");
	static REGR_R2 = new Keyword("REGR_R2");
	static REGR_SLOPE = new Keyword("REGR_SLOPE");
	static REGR_SXX = new Keyword("REGR_SXX");
	static REGR_SXY = new Keyword("REGR_SXY");
	static REGR_SYY = new Keyword("REGR_SYY");
	static REGULAR = new Keyword("REGULAR");
	static REINDEX = new Keyword("REINDEX");
	static REJECT = new Keyword("REJECT");
	static REKEY = new Keyword("REKEY");
	static RELATIONAL = new Keyword("RELATIONAL");
	static RELEASE = new Keyword("RELEASE");
	static RELEASE_ALL_LOCKS = new Keyword("RELEASE_ALL_LOCKS");
	static RELEASE_LOCK = new Keyword("RELEASE_LOCK");
	static RELIES_ON = new Keyword("RELIES_ON");
	static RELOCATE = new Keyword("RELOCATE");
	static RELY = new Keyword("RELY");
	static REMOTE = new Keyword("REMOTE");
	static RENAME = new Keyword("RENAME");
	static REPAIR = new Keyword("REPAIR");
	static REPEAT = new Keyword("REPEAT");
	static REPEATABLE = new Keyword("REPEATABLE");
	static REPLACE = new Keyword("REPLACE");
	static REPLICA = new Keyword("REPLICA");
	static REPLICATE = new Keyword("REPLICATE");
	static REPLICATION = new Keyword("REPLICATION");
	static REQUIRE = new Keyword("REQUIRE");
	static REQUIRED = new Keyword("REQUIRED");
	static RESET = new Keyword("RESET");
	static RESETLOGS = new Keyword("RESETLOGS");
	static RESIGNAL = new Keyword("RESIGNAL");
	static RESIZE = new Keyword("RESIZE");
	static RESOLVE = new Keyword("RESOLVE");
	static RESOLVER = new Keyword("RESOLVER");
	static RESOURCE = new Keyword("RESOURCE");
	static RESTART = new Keyword("RESTART");
	static RESTORE = new Keyword("RESTORE");
	static RESTRICT = new Keyword("RESTRICT");
	static RESTRICTED = new Keyword("RESTRICTED");
	static RESTRICT_REFERENCES = new Keyword("RESTRICT_REFERENCES");
	static RESULT_CACHE = new Keyword("RESULT_CACHE");
	static RESUMABLE = new Keyword("RESUMABLE");
	static RESUME = new Keyword("RESUME");
	static RETAIN = new Keyword("RETAIN");
	static RETENTION = new Keyword("RETENTION");
	static RETURN = new Keyword("RETURN");
	static RETURNING = new Keyword("RETURNING");
	static REUSE = new Keyword("REUSE");
	static REVERSE = new Keyword("REVERSE");
	static REVERT = new Keyword("REVERT");
	static REVOKE = new Keyword("REVOKE");
	static REWRITE = new Keyword("REWRITE");
	static RIGHT = new Keyword("RIGHT");
	static RLIKE = new Keyword("RLIKE");
	static RNDS = new Keyword("RNDS");
	static RNPS = new Keyword("RNPS");
	static ROLE = new Keyword("ROLE");
	static ROLES = new Keyword("ROLES");
	static ROLES_GRAPHML = new Keyword("ROLES_GRAPHML");
	static ROLLBACK = new Keyword("ROLLBACK");
	static ROLLING = new Keyword("ROLLING");
	static ROLLUP = new Keyword("ROLLUP");
	static ROOT = new Keyword("ROOT");
	static ROUND = new Keyword("ROUND");
	static ROUTE = new Keyword("ROUTE");
	static ROUTINE = new Keyword("ROUTINE");
	static ROW = new Keyword("ROW");
	static ROWCOUNT = new Keyword("ROWCOUNT");
	static ROWDEPENDENCIES = new Keyword("ROWDEPENDENCIES");
	static ROWGUIDCOL = new Keyword("ROWGUIDCOL");
	static ROWID = new Keyword("ROWID");
	static ROWLABEL = new Keyword("ROWLABEL");
	static ROWNUM = new Keyword("ROWNUM");
	static ROWS = new Keyword("ROWS");
	static ROWTYPE = new Keyword("ROWTYPE");
	static ROWVERSION = new Keyword("ROWVERSION");
	static ROW_COUNT = new Keyword("ROW_COUNT");
	static ROW_FORMAT = new Keyword("ROW_FORMAT");
	static ROW_NUMBER = new Keyword("ROW_NUMBER");
	static ROW_SECURITY_ACTIVE = new Keyword("ROW_SECURITY_ACTIVE");
	static ROW_TO_JSON = new Keyword("ROW_TO_JSON");
	static RPAD = new Keyword("RPAD");
	static RTREE = new Keyword("RTREE");
	static RTRIM = new Keyword("RTRIM");
	static RULE = new Keyword("RULE");
	static RULES = new Keyword("RULES");
	static RUNNING = new Keyword("RUNNING");
	static SALT = new Keyword("SALT");
	static SAMPLE = new Keyword("SAMPLE");
	static SAVE = new Keyword("SAVE");
	static SAVEPOINT = new Keyword("SAVEPOINT");
	static SCALE = new Keyword("SCALE");
	static SCAN = new Keyword("SCAN");
	static SCHEDULE = new Keyword("SCHEDULE");
	static SCHEMA = new Keyword("SCHEMA");
	static SCHEMAS = new Keyword("SCHEMAS");
	static SCHEMA_TO_XML = new Keyword("SCHEMA_TO_XML");
	static SCHEMA_TO_XMLSCHEMA = new Keyword("SCHEMA_TO_XMLSCHEMA");
	static SCHEMA_TO_XML_AND_XMLSCHEMA = new Keyword(
		"SCHEMA_TO_XML_AND_XMLSCHEMA",
	);
	static SCN = new Keyword("SCN");
	static SCOPE = new Keyword("SCOPE");
	static SCRUB = new Keyword("SCRUB");
	static SDO_GEOMETRY = new Keyword("SDO_GEOMETRY");
	static SDO_GEORASTER = new Keyword("SDO_GEORASTER");
	static SDO_TOPO_GEOMETRY = new Keyword("SDO_TOPO_GEOMETRY");
	static SEARCH = new Keyword("SEARCH");
	static SECOND = new Keyword("SECOND");
	static SECONDARY_ENGINE_ATTRIBUTE = new Keyword("SECONDARY_ENGINE_ATTRIBUTE");
	static SECONDS = new Keyword("SECONDS");
	static SECOND_MICROSECOND = new Keyword("SECOND_MICROSECOND");
	static SECRET = new Keyword("SECRET");
	static SECUREFILE = new Keyword("SECUREFILE");
	static SECURITY = new Keyword("SECURITY");
	static SECURITYAUDIT = new Keyword("SECURITYAUDIT");
	static SEC_TO_TIME = new Keyword("SEC_TO_TIME");
	static SEED = new Keyword("SEED");
	static SEGMENT = new Keyword("SEGMENT");
	static SELECT = new Keyword("SELECT");
	static SELECTIVE = new Keyword("SELECTIVE");
	static SELECTIVITY = new Keyword("SELECTIVITY");
	static SELF = new Keyword("SELF");
	static SEMANTICKEYPHRASETABLE = new Keyword("SEMANTICKEYPHRASETABLE");
	static SEMANTICSIMILARITYDETAILSTABLE = new Keyword(
		"SEMANTICSIMILARITYDETAILSTABLE",
	);
	static SEMANTICSIMILARITYTABLE = new Keyword("SEMANTICSIMILARITYTABLE");
	static SEND = new Keyword("SEND");
	static SENSITIVE = new Keyword("SENSITIVE");
	static SEPARATOR = new Keyword("SEPARATOR");
	static SEQUENCE = new Keyword("SEQUENCE");
	static SEQUENTIAL = new Keyword("SEQUENTIAL");
	static SERIALIZABLE = new Keyword("SERIALIZABLE");
	static SERIALLY_REUSABLE = new Keyword("SERIALLY_REUSABLE");
	static SERVER = new Keyword("SERVER");
	static SERVICE = new Keyword("SERVICE");
	static SERVICE_NAME_CONVERT = new Keyword("SERVICE_NAME_CONVERT");
	static SESSION = new Keyword("SESSION");
	static SESSIONPROPERTY = new Keyword("SESSIONPROPERTY");
	static SESSIONS_PER_USER = new Keyword("SESSIONS_PER_USER");
	static SESSION_USER = new Keyword("SESSION_USER");
	static SET = new Keyword("SET");
	static SETOF = new Keyword("SETOF");
	static SETS = new Keyword("SETS");
	static SETSEED = new Keyword("SETSEED");
	static SETTINGS = new Keyword("SETTINGS");
	static SETUSER = new Keyword("SETUSER");
	static SETVAL = new Keyword("SETVAL");
	static SETWEIGHT = new Keyword("SETWEIGHT");
	static SET_BIT = new Keyword("SET_BIT");
	static SET_BYTE = new Keyword("SET_BYTE");
	static SET_MASKLEN = new Keyword("SET_MASKLEN");
	static SHA1 = new Keyword("SHA1");
	static SHA2 = new Keyword("SHA2");
	static SHA224 = new Keyword("SHA224");
	static SHA256 = new Keyword("SHA256");
	static SHA384 = new Keyword("SHA384");
	static SHA512 = new Keyword("SHA512");
	static SHARE = new Keyword("SHARE");
	static SHARED = new Keyword("SHARED");
	static SHAREDSPACE = new Keyword("SHAREDSPACE");
	static SHARED_POOL = new Keyword("SHARED_POOL");
	static SHARING = new Keyword("SHARING");
	static SHOW = new Keyword("SHOW");
	static SHRINK = new Keyword("SHRINK");
	static SHUTDOWN = new Keyword("SHUTDOWN");
	static SID = new Keyword("SID");
	static SIGN = new Keyword("SIGN");
	static SIGNAL = new Keyword("SIGNAL");
	static SIGNATURE = new Keyword("SIGNATURE");
	static SIGNED = new Keyword("SIGNED");
	static SIGNTYPE = new Keyword("SIGNTYPE");
	static SIMILAR = new Keyword("SIMILAR");
	static SIMPLE = new Keyword("SIMPLE");
	static SIMPLE_INTEGER = new Keyword("SIMPLE_INTEGER");
	static SIN = new Keyword("SIN");
	static SIND = new Keyword("SIND");
	static SINGLE = new Keyword("SINGLE");
	static SINH = new Keyword("SINH");
	static SITE = new Keyword("SITE");
	static SIZE = new Keyword("SIZE");
	static SI_AVERAGECOLOR = new Keyword("SI_AVERAGECOLOR");
	static SI_COLOR = new Keyword("SI_COLOR");
	static SI_COLORHISTOGRAM = new Keyword("SI_COLORHISTOGRAM");
	static SI_FEATURELIST = new Keyword("SI_FEATURELIST");
	static SI_POSITIONALCOLOR = new Keyword("SI_POSITIONALCOLOR");
	static SI_STILLIMAGE = new Keyword("SI_STILLIMAGE");
	static SI_TEXTURE = new Keyword("SI_TEXTURE");
	static SKIP = new Keyword("SKIP");
	static SKIP_LOCKED = new Keyword("SKIP_LOCKED");
	static SLAVE = new Keyword("SLAVE");
	static SLEEP = new Keyword("SLEEP");
	static SLOPE = new Keyword("SLOPE");
	static SMALLDATETIME = new Keyword("SMALLDATETIME");
	static SMALLDATETIMEFROMPARTS = new Keyword("SMALLDATETIMEFROMPARTS");
	static SMALLFILE = new Keyword("SMALLFILE");
	static SMALLINT = new Keyword("SMALLINT");
	static SMALLMONEY = new Keyword("SMALLMONEY");
	static SNAPSHOT = new Keyword("SNAPSHOT");
	static SOCKET = new Keyword("SOCKET");
	static SOME = new Keyword("SOME");
	static SORT = new Keyword("SORT");
	static SOUNDEX = new Keyword("SOUNDEX");
	static SOUNDS = new Keyword("SOUNDS");
	static SOURCE = new Keyword("SOURCE");
	static SOURCE_FILE_DIRECTORY = new Keyword("SOURCE_FILE_DIRECTORY");
	static SOURCE_FILE_NAME_CONVERT = new Keyword("SOURCE_FILE_NAME_CONVERT");
	static SPACE = new Keyword("SPACE");
	static SPATIAL = new Keyword("SPATIAL");
	static SPECIFIC = new Keyword("SPECIFIC");
	static SPECIFICATION = new Keyword("SPECIFICATION");
	static SPFILE = new Keyword("SPFILE");
	static SPLIT = new Keyword("SPLIT");
	static SPLIT_PART = new Keyword("SPLIT_PART");
	static SQL = new Keyword("SQL");
	static SQLCODE = new Keyword("SQLCODE");
	static SQLERRM = new Keyword("SQLERRM");
	static SQLEXCEPTION = new Keyword("SQLEXCEPTION");
	static SQLITE_COMPILEOPTION_GET = new Keyword("SQLITE_COMPILEOPTION_GET");
	static SQLITE_COMPILEOPTION_USED = new Keyword("SQLITE_COMPILEOPTION_USED");
	static SQLITE_OFFSET = new Keyword("SQLITE_OFFSET");
	static SQLITE_SOURCE_ID = new Keyword("SQLITE_SOURCE_ID");
	static SQLITE_VERSION = new Keyword("SQLITE_VERSION");
	static SQLSTATE = new Keyword("SQLSTATE");
	static SQLWARNING = new Keyword("SQLWARNING");
	static SQUARE = new Keyword("SQUARE");
	static SQL_BIG_RESULT = new Keyword("SQL_BIG_RESULT");
	static SQL_CACHE = new Keyword("SQL_CACHE");
	static SQL_CALC_FOUND_ROWS = new Keyword("SQL_CALC_FOUND_ROWS");
	static SQL_MACRO = new Keyword("SQL_MACRO");
	static SQL_SMALL_RESULT = new Keyword("SQL_SMALL_RESULT");
	static SQL_VARIANT = new Keyword("SQL_VARIANT");
	static SQL_VARIANT_PROPERTY = new Keyword("SQL_VARIANT_PROPERTY");
	static SQRT = new Keyword("SQRT");
	static SSL = new Keyword("SSL");
	static STANDARD = new Keyword("STANDARD");
	static STANDBY = new Keyword("STANDBY");
	static STANDBYS = new Keyword("STANDBYS");
	static START = new Keyword("START");
	static STARTING = new Keyword("STARTING");
	static STARTS = new Keyword("STARTS");
	static STARTS_WITH = new Keyword("STARTS_WITH");
	static STATE = new Keyword("STATE");
	static STATEMENT = new Keyword("STATEMENT");
	static STATEMENTS = new Keyword("STATEMENTS");
	static STATEMENT_DIGEST = new Keyword("STATEMENT_DIGEST");
	static STATEMENT_DIGEST_TEXT = new Keyword("STATEMENT_DIGEST_TEXT");
	static STATEMENT_ID = new Keyword("STATEMENT_ID");
	static STATEMENT_TIMESTAMP = new Keyword("STATEMENT_TIMESTAMP");
	static STATIC = new Keyword("STATIC");
	static STATISTICS = new Keyword("STATISTICS");
	static STATS = new Keyword("STATS");
	static STATS_AUTO_RECALC = new Keyword("STATS_AUTO_RECALC");
	static STATS_PERSISTENT = new Keyword("STATS_PERSISTENT");
	static STATS_SAMPLE_PAGES = new Keyword("STATS_SAMPLE_PAGES");
	static STD = new Keyword("STD");
	static STDDEV = new Keyword("STDDEV");
	static STDDEV_POP = new Keyword("STDDEV_POP");
	static STDDEV_SAMP = new Keyword("STDDEV_SAMP");
	static STOP = new Keyword("STOP");
	static STORAGE = new Keyword("STORAGE");
	static STORE = new Keyword("STORE");
	static STORED = new Keyword("STORED");
	static STR = new Keyword("STR");
	static STRAIGHT_JOIN = new Keyword("STRAIGHT_JOIN");
	static STRCMP = new Keyword("STRCMP");
	static STRICT = new Keyword("STRICT");
	static STRFTIME = new Keyword("STRFTIME");
	static STRING = new Keyword("STRING");
	static STRING_AGG = new Keyword("STRING_AGG");
	static STRING_SPLIT = new Keyword("STRING_SPLIT");
	static STRING_TO_ARRAY = new Keyword("STRING_TO_ARRAY");
	static STRING_TO_TABLE = new Keyword("STRING_TO_TABLE");
	static STRIP = new Keyword("STRIP");
	static STRIPE_COLUMNS = new Keyword("STRIPE_COLUMNS");
	static STRIPE_WIDTH = new Keyword("STRIPE_WIDTH");
	static STRPOS = new Keyword("STRPOS");
	static STRUCT = new Keyword("STRUCT");
	static STRUCTURE = new Keyword("STRUCTURE");
	static STR_TO_DATE = new Keyword("STR_TO_DATE");
	static STUFF = new Keyword("STUFF");
	static ST_AREA = new Keyword("ST_AREA");
	static ST_ASBINARY = new Keyword("ST_ASBINARY");
	static ST_ASGEOJSON = new Keyword("ST_ASGEOJSON");
	static ST_ASTEXT = new Keyword("ST_ASTEXT");
	static ST_BUFFER = new Keyword("ST_BUFFER");
	static ST_BUFFER_STRATEGY = new Keyword("ST_BUFFER_STRATEGY");
	static ST_CENTROID = new Keyword("ST_CENTROID");
	static ST_COLLECT = new Keyword("ST_COLLECT");
	static ST_CONTAINS = new Keyword("ST_CONTAINS");
	static ST_CONVEXHULL = new Keyword("ST_CONVEXHULL");
	static ST_CROSSES = new Keyword("ST_CROSSES");
	static ST_DIFFERENCE = new Keyword("ST_DIFFERENCE");
	static ST_DIMENSION = new Keyword("ST_DIMENSION");
	static ST_DISJOINT = new Keyword("ST_DISJOINT");
	static ST_DISTANCE = new Keyword("ST_DISTANCE");
	static ST_DISTANCE_SPHERE = new Keyword("ST_DISTANCE_SPHERE");
	static ST_ENDPOINT = new Keyword("ST_ENDPOINT");
	static ST_ENVELOPE = new Keyword("ST_ENVELOPE");
	static ST_EQUALS = new Keyword("ST_EQUALS");
	static ST_EXTERIORRING = new Keyword("ST_EXTERIORRING");
	static ST_FRECHETDISTANCE = new Keyword("ST_FRECHETDISTANCE");
	static ST_GEOHASH = new Keyword("ST_GEOHASH");
	static ST_GEOMCOLLFROMTEXT = new Keyword("ST_GEOMCOLLFROMTEXT");
	static ST_GEOMCOLLFROMWKB = new Keyword("ST_GEOMCOLLFROMWKB");
	static ST_GEOMETRYN = new Keyword("ST_GEOMETRYN");
	static ST_GEOMETRYTYPE = new Keyword("ST_GEOMETRYTYPE");
	static ST_GEOMFROMGEOJSON = new Keyword("ST_GEOMFROMGEOJSON");
	static ST_GEOMFROMTEXT = new Keyword("ST_GEOMFROMTEXT");
	static ST_GEOMFROMWKB = new Keyword("ST_GEOMFROMWKB");
	static ST_HAUSDORFFDISTANCE = new Keyword("ST_HAUSDORFFDISTANCE");
	static ST_INTERIORRINGN = new Keyword("ST_INTERIORRINGN");
	static ST_INTERSECTION = new Keyword("ST_INTERSECTION");
	static ST_INTERSECTS = new Keyword("ST_INTERSECTS");
	static ST_ISCLOSED = new Keyword("ST_ISCLOSED");
	static ST_ISEMPTY = new Keyword("ST_ISEMPTY");
	static ST_ISSIMPLE = new Keyword("ST_ISSIMPLE");
	static ST_ISVALID = new Keyword("ST_ISVALID");
	static ST_LATFROMGEOHASH = new Keyword("ST_LATFROMGEOHASH");
	static ST_LATITUDE = new Keyword("ST_LATITUDE");
	static ST_LENGTH = new Keyword("ST_LENGTH");
	static ST_LINEFROMTEXT = new Keyword("ST_LINEFROMTEXT");
	static ST_LINEFROMWKB = new Keyword("ST_LINEFROMWKB");
	static ST_LINEINTERPOLATEPOINT = new Keyword("ST_LINEINTERPOLATEPOINT");
	static ST_LINEINTERPOLATEPOINTS = new Keyword("ST_LINEINTERPOLATEPOINTS");
	static ST_LONGFROMGEOHASH = new Keyword("ST_LONGFROMGEOHASH");
	static ST_LONGITUDE = new Keyword("ST_LONGITUDE");
	static ST_MAKEENVELOPE = new Keyword("ST_MAKEENVELOPE");
	static ST_MLINEFROMTEXT = new Keyword("ST_MLINEFROMTEXT");
	static ST_MLINEFROMWKB = new Keyword("ST_MLINEFROMWKB");
	static ST_MPOINTFROMTEXT = new Keyword("ST_MPOINTFROMTEXT");
	static ST_MPOINTFROMWKB = new Keyword("ST_MPOINTFROMWKB");
	static ST_MPOLYFROMTEXT = new Keyword("ST_MPOLYFROMTEXT");
	static ST_MPOLYFROMWKB = new Keyword("ST_MPOLYFROMWKB");
	static ST_NUMGEOMETRIES = new Keyword("ST_NUMGEOMETRIES");
	static ST_NUMINTERIORRING = new Keyword("ST_NUMINTERIORRING");
	static ST_NUMPOINTS = new Keyword("ST_NUMPOINTS");
	static ST_OVERLAPS = new Keyword("ST_OVERLAPS");
	static ST_POINTATDISTANCE = new Keyword("ST_POINTATDISTANCE");
	static ST_POINTFROMGEOHASH = new Keyword("ST_POINTFROMGEOHASH");
	static ST_POINTFROMTEXT = new Keyword("ST_POINTFROMTEXT");
	static ST_POINTFROMWKB = new Keyword("ST_POINTFROMWKB");
	static ST_POINTN = new Keyword("ST_POINTN");
	static ST_POLYFROMTEXT = new Keyword("ST_POLYFROMTEXT");
	static ST_POLYFROMWKB = new Keyword("ST_POLYFROMWKB");
	static ST_SIMPLIFY = new Keyword("ST_SIMPLIFY");
	static ST_SRID = new Keyword("ST_SRID");
	static ST_STARTPOINT = new Keyword("ST_STARTPOINT");
	static ST_SWAPXY = new Keyword("ST_SWAPXY");
	static ST_SYMDIFFERENCE = new Keyword("ST_SYMDIFFERENCE");
	static ST_TOUCHES = new Keyword("ST_TOUCHES");
	static ST_TRANSFORM = new Keyword("ST_TRANSFORM");
	static ST_UNION = new Keyword("ST_UNION");
	static ST_VALIDATE = new Keyword("ST_VALIDATE");
	static ST_WITHIN = new Keyword("ST_WITHIN");
	static ST_X = new Keyword("ST_X");
	static ST_Y = new Keyword("ST_Y");
	static SUBDATE = new Keyword("SUBDATE");
	static SUBJECT = new Keyword("SUBJECT");
	static SUBPARTITION = new Keyword("SUBPARTITION");
	static SUBPARTITIONS = new Keyword("SUBPARTITIONS");
	static SUBSCRIPTION = new Keyword("SUBSCRIPTION");
	static SUBSET = new Keyword("SUBSET");
	static SUBSTITUTABLE = new Keyword("SUBSTITUTABLE");
	static SUBSTR = new Keyword("SUBSTR");
	static SUBSTR4 = new Keyword("SUBSTR4");
	static SUBSTRB = new Keyword("SUBSTRB");
	static SUBSTRING = new Keyword("SUBSTRING");
	static SUBSTRING_INDEX = new Keyword("SUBSTRING_INDEX");
	static SUBTIME = new Keyword("SUBTIME");
	static SUBTYPE = new Keyword("SUBTYPE");
	static SUCCESSFUL = new Keyword("SUCCESSFUL");
	static SUM = new Keyword("SUM");
	static SUMMARY = new Keyword("SUMMARY");
	static SUPPLEMENTAL = new Keyword("SUPPLEMENTAL");
	static SUPPRESS_REDUNDANT_UPDATES_TRIGGER = new Keyword(
		"SUPPRESS_REDUNDANT_UPDATES_TRIGGER",
	);
	static SUSPEND = new Keyword("SUSPEND");
	static SWITCH = new Keyword("SWITCH");
	static SWITCHOFFSET = new Keyword("SWITCHOFFSET");
	static SWITCHOVER = new Keyword("SWITCHOVER");
	static SYMMETRIC = new Keyword("SYMMETRIC");
	static SYNC = new Keyword("SYNC");
	static SYNCHRONOUS = new Keyword("SYNCHRONOUS");
	static SYNONYM = new Keyword("SYNONYM");
	static SYS = new Keyword("SYS");
	static SYSAUX = new Keyword("SYSAUX");
	static SYSDATE = new Keyword("SYSDATE");
	static SYSDATETIME = new Keyword("SYSDATETIME");
	static SYSDATETIMEOFFSET = new Keyword("SYSDATETIMEOFFSET");
	static SYSTEM = new Keyword("SYSTEM");
	static SYSTEM_USER = new Keyword("SYSTEM_USER");
	static SYSTIMESTAMP = new Keyword("SYSTIMESTAMP");
	static SYSUTCDATETIME = new Keyword("SYSUTCDATETIME");
	static SYS_CONTEXT = new Keyword("SYS_CONTEXT");
	static T = new Keyword("T");
	static TABAUTH = new Keyword("TABAUTH");
	static TABLE = new Keyword("TABLE");
	static TABLES = new Keyword("TABLES");
	static TABLESAMPLE = new Keyword("TABLESAMPLE");
	static TABLESPACE = new Keyword("TABLESPACE");
	static TABLE_TO_XML = new Keyword("TABLE_TO_XML");
	static TABLE_TO_XMLSCHEMA = new Keyword("TABLE_TO_XMLSCHEMA");
	static TABLE_TO_XML_AND_XMLSCHEMA = new Keyword("TABLE_TO_XML_AND_XMLSCHEMA");
	static TAG = new Keyword("TAG");
	static TAN = new Keyword("TAN");
	static TAND = new Keyword("TAND");
	static TANH = new Keyword("TANH");
	static TARGET = new Keyword("TARGET");
	static TDO = new Keyword("TDO");
	static TEMP = new Keyword("TEMP");
	static TEMPFILE = new Keyword("TEMPFILE");
	static TEMPLATE = new Keyword("TEMPLATE");
	static TEMPORARY = new Keyword("TEMPORARY");
	static TEMPTABLE = new Keyword("TEMPTABLE");
	static TERMINATED = new Keyword("TERMINATED");
	static TEST = new Keyword("TEST");
	static TEXT = new Keyword("TEXT");
	static TEXTSIZE = new Keyword("TEXTSIZE");
	static TEXTPTR = new Keyword("TEXTPTR");
	static TEXTVALID = new Keyword("TEXTVALID");
	static THAN = new Keyword("THAN");
	static THEN = new Keyword("THEN");
	static THREAD = new Keyword("THREAD");
	static THREAD_PRIORITY = new Keyword("THREAD_PRIORITY");
	static THROUGH = new Keyword("THROUGH");
	static THROW = new Keyword("THROW");
	static TIER = new Keyword("TIER");
	static TIES = new Keyword("TIES");
	static TIME = new Keyword("TIME");
	static TIMEDIFF = new Keyword("TIMEDIFF");
	static TIMEFROMPARTS = new Keyword("TIMEFROMPARTS");
	static TIMEOFDAY = new Keyword("TIMEOFDAY");
	static TIMEOUT = new Keyword("TIMEOUT");
	static TIMESTAMP = new Keyword("TIMESTAMP");
	static TIMESTAMPADD = new Keyword("TIMESTAMPADD");
	static TIMESTAMPDIFF = new Keyword("TIMESTAMPDIFF");
	static TIMESTAMPZ = new Keyword("TIMESTAMPZ");
	static TIMEZONE_HOUR = new Keyword("TIMEZONE_HOUR");
	static TIMEZONE_MINUTE = new Keyword("TIMEZONE_MINUTE");
	static TIME_FORMAT = new Keyword("TIME_FORMAT");
	static TIME_TO_SEC = new Keyword("TIME_TO_SEC");
	static TIME_ZONE = new Keyword("TIME_ZONE");
	static TIMING = new Keyword("TIMING");
	static TINYBLOB = new Keyword("TINYBLOB");
	static TINYINT = new Keyword("TINYINT");
	static TINYTEXT = new Keyword("TINYTEXT");
	static TO = new Keyword("TO");
	static TODATETIMEOFFSET = new Keyword("TODATETIMEOFFSET");
	static TOP = new Keyword("TOP");
	static TOPLEVEL = new Keyword("TOPLEVEL");
	static TOTAL = new Keyword("TOTAL");
	static TOTAL_CHANGES = new Keyword("TOTAL_CHANGES");
	static TO_ASCII = new Keyword("TO_ASCII");
	static TO_BASE64 = new Keyword("TO_BASE64");
	static TO_BLOB = new Keyword("TO_BLOB");
	static TO_CHAR = new Keyword("TO_CHAR");
	static TO_CLOB = new Keyword("TO_CLOB");
	static TO_DATE = new Keyword("TO_DATE");
	static TO_DAYS = new Keyword("TO_DAYS");
	static TO_HEX = new Keyword("TO_HEX");
	static TO_JSON = new Keyword("TO_JSON");
	static TO_LOB = new Keyword("TO_LOB");
	static TO_NCLOB = new Keyword("TO_NCLOB");
	static TO_NUMBER = new Keyword("TO_NUMBER");
	static TO_SECONDS = new Keyword("TO_SECONDS");
	static TO_TIMESTAMP = new Keyword("TO_TIMESTAMP");
	static TO_TSQUERY = new Keyword("TO_TSQUERY");
	static TO_TSVECTOR = new Keyword("TO_TSVECTOR");
	static TRACE = new Keyword("TRACE");
	static TRACKING = new Keyword("TRACKING");
	static TRAILING = new Keyword("TRAILING");
	static TRAN = new Keyword("TRAN");
	static TRANSACTION = new Keyword("TRANSACTION");
	static TRANSACTIONAL = new Keyword("TRANSACTIONAL");
	static TRANSACTION_TIMESTAMP = new Keyword("TRANSACTION_TIMESTAMP");
	static TRANSFORM = new Keyword("TRANSFORM");
	static TRANSLATE = new Keyword("TRANSLATE");
	static TRANSLATION = new Keyword("TRANSLATION");
	static TRIGGER = new Keyword("TRIGGER");
	static TRIGGERS = new Keyword("TRIGGERS");
	static TRIGGER_NESTLEVEL = new Keyword("TRIGGER_NESTLEVEL");
	static TRIM = new Keyword("TRIM");
	static TRIM_ARRAY = new Keyword("TRIM_ARRAY");
	static TRIM_SCALE = new Keyword("TRIM_SCALE");
	static TRUE = new Keyword("TRUE");
	static TRUNC = new Keyword("TRUNC");
	static TRUNCATE = new Keyword("TRUNCATE");
	static TRUST = new Keyword("TRUST");
	static TRUSTED = new Keyword("TRUSTED");
	static TRY_CAST = new Keyword("TRY_CAST");
	static TRY_CONVERT = new Keyword("TRY_CONVERT");
	static TRY_PARSE = new Keyword("TRY_PARSE");
	static TS = new Keyword("TS");
	static TSEQUAL = new Keyword("TSEQUAL");
	static TSQUERY_PHRASE = new Keyword("TSQUERY_PHRASE");
	static TSVECTOR_TO_ARRAY = new Keyword("TSVECTOR_TO_ARRAY");
	static TSVECTOR_UPDATE_TRIGGER = new Keyword("TSVECTOR_UPDATE_TRIGGER");
	static TSVECTOR_UPDATE_TRIGGER_COLUMN = new Keyword(
		"TSVECTOR_UPDATE_TRIGGER_COLUMN",
	);
	static TS_DEBUG = new Keyword("TS_DEBUG");
	static TS_DELETE = new Keyword("TS_DELETE");
	static TS_FILTER = new Keyword("TS_FILTER");
	static TS_HEADLINE = new Keyword("TS_HEADLINE");
	static TS_LEXIZE = new Keyword("TS_LEXIZE");
	static TS_PARSE = new Keyword("TS_PARSE");
	static TS_RANK = new Keyword("TS_RANK");
	static TS_RANK_CD = new Keyword("TS_RANK_CD");
	static TS_REWRITE = new Keyword("TS_REWRITE");
	static TS_STAT = new Keyword("TS_STAT");
	static TS_TOKEN_TYPE = new Keyword("TS_TOKEN_TYPE");
	static TTGRIDMEMBERID = new Keyword("TTGRIDMEMBERID");
	static TTGRIDNODENAME = new Keyword("TTGRIDNODENAME");
	static TTGRIDUSERASSIGNEDNAME = new Keyword("TTGRIDUSERASSIGNEDNAME");
	static TYPE = new Keyword("TYPE");
	static TYPEOF = new Keyword("TYPEOF");
	static TYPES = new Keyword("TYPES");
	static UCASE = new Keyword("UCASE");
	static UDF = new Keyword("UDF");
	static UID = new Keyword("UID");
	static UNARCHIVED = new Keyword("UNARCHIVED");
	static UNBOUNDED = new Keyword("UNBOUNDED");
	static UNCOMMITTED = new Keyword("UNCOMMITTED");
	static UNCOMPRESS = new Keyword("UNCOMPRESS");
	static UNCOMPRESSED_LENGTH = new Keyword("UNCOMPRESSED_LENGTH");
	static UNDEFINED = new Keyword("UNDEFINED");
	static UNDER = new Keyword("UNDER");
	static UNDO = new Keyword("UNDO");
	static UNDOFILE = new Keyword("UNDOFILE");
	static UNDO_BUFFER_SIZE = new Keyword("UNDO_BUFFER_SIZE");
	static UNDROP = new Keyword("UNDROP");
	static UNHEX = new Keyword("UNHEX");
	static UNICODE = new Keyword("UNICODE");
	static UNIFORM = new Keyword("UNIFORM");
	static UNINSTALL = new Keyword("UNINSTALL");
	static UNION = new Keyword("UNION");
	static UNIQUE = new Keyword("UNIQUE");
	static UNIQUEIDENTIFIER = new Keyword("UNIQUEIDENTIFIER");
	static UNISTR = new Keyword("UNISTR");
	static UNITE = new Keyword("UNITE");
	static UNIXEPOCH = new Keyword("UNIXEPOCH");
	static UNIX_TIMESTAMP = new Keyword("UNIX_TIMESTAMP");
	static UNKNOWN = new Keyword("UNKNOWN");
	static UNLIKELY = new Keyword("UNLIKELY");
	static UNLIMITED = new Keyword("UNLIMITED");
	static UNLISTEN = new Keyword("UNLISTEN");
	static UNLOCK = new Keyword("UNLOCK");
	static UNLOGGED = new Keyword("UNLOGGED");
	static UNNEST = new Keyword("UNNEST");
	static UNPIVOT = new Keyword("UNPIVOT");
	static UNPLUG = new Keyword("UNPLUG");
	static UNPROTECTED = new Keyword("UNPROTECTED");
	static UNQUIESCE = new Keyword("UNQUIESCE");
	static UNRECOVERABLE = new Keyword("UNRECOVERABLE");
	static UNSIGNED = new Keyword("UNSIGNED");
	static UNTIL = new Keyword("UNTIL");
	static UNUSABLE = new Keyword("UNUSABLE");
	static UNUSED = new Keyword("UNUSED");
	static UPDATE = new Keyword("UPDATE");
	static UPDATED = new Keyword("UPDATED");
	static UPDATETEXT = new Keyword("UPDATETEXT");
	static UPDATEXML = new Keyword("UPDATEXML");
	static UPDATING = new Keyword("UPDATING");
	static UPGRADE = new Keyword("UPGRADE");
	static UPPER = new Keyword("UPPER");
	static UPPER_INC = new Keyword("UPPER_INC");
	static UPPER_INF = new Keyword("UPPER_INF");
	static UPSERT = new Keyword("UPSERT");
	static URITYPE = new Keyword("URITYPE");
	static UROWID = new Keyword("UROWID");
	static USAGE = new Keyword("USAGE");
	static USE = new Keyword("USE");
	static USER = new Keyword("USER");
	static USERGROUP = new Keyword("USERGROUP");
	static USERS = new Keyword("USERS");
	static USER_DATA = new Keyword("USER_DATA");
	static USER_NAME = new Keyword("USER_NAME");
	static USER_TABLESPACES = new Keyword("USER_TABLESPACES");
	static USE_STORED_OUTLINES = new Keyword("USE_STORED_OUTLINES");
	static USING = new Keyword("USING");
	static USING_NLS_COMP = new Keyword("USING_NLS_COMP");
	static UTC_DATE = new Keyword("UTC_DATE");
	static UTC_TIME = new Keyword("UTC_TIME");
	static UTC_TIMESTAMP = new Keyword("UTC_TIMESTAMP");
	static UUID = new Keyword("UUID");
	static UUID_SHORT = new Keyword("UUID_SHORT");
	static UUID_TO_BIN = new Keyword("UUID_TO_BIN");
	static VACUUM = new Keyword("VACUUM");
	static VALIDATE = new Keyword("VALIDATE");
	static VALIDATE_PASSWORD_STRENGTH = new Keyword("VALIDATE_PASSWORD_STRENGTH");
	static VALUE = new Keyword("VALUE");
	static VALUES = new Keyword("VALUES");
	static VARBINARY = new Keyword("VARBINARY");
	static VARCHAR = new Keyword("VARCHAR");
	static VARCHAR2 = new Keyword("VARCHAR2");
	static VARCHARACTER = new Keyword("VARCHARACTER");
	static VARIADIC = new Keyword("VARIADIC");
	static VARIANCE = new Keyword("VARIANCE");
	static VARNUM = new Keyword("VARNUM");
	static VARRAW = new Keyword("VARRAW");
	static VARRAY = new Keyword("VARRAY");
	static VARRAYS = new Keyword("VARRAYS");
	static VARYING = new Keyword("VARYING");
	static VAR_POP = new Keyword("VAR_POP");
	static VAR_SAMP = new Keyword("VAR_SAMP");
	static VCPU = new Keyword("VCPU");
	static VERBOSE = new Keyword("VERBOSE");
	static VERIFY = new Keyword("VERIFY");
	static VERSION = new Keyword("VERSION");
	static VERSIONING = new Keyword("VERSIONING");
	static VERSIONS = new Keyword("VERSIONS");
	static VERSIONS_ENDSCN = new Keyword("VERSIONS_ENDSCN");
	static VERSIONS_ENDTIME = new Keyword("VERSIONS_ENDTIME");
	static VERSIONS_OPERATION = new Keyword("VERSIONS_OPERATION");
	static VERSIONS_STARTSCN = new Keyword("VERSIONS_STARTSCN");
	static VERSIONS_STARTTIME = new Keyword("VERSIONS_STARTTIME");
	static VERSIONS_XID = new Keyword("VERSIONS_XID");
	static VIEW = new Keyword("VIEW");
	static VIEWS = new Keyword("VIEWS");
	static VIRTUAL = new Keyword("VIRTUAL");
	static VISIBILITY = new Keyword("VISIBILITY");
	static VISIBLE = new Keyword("VISIBLE");
	static VOLUME = new Keyword("VOLUME");
	static WAIT = new Keyword("WAIT");
	static WAITFOR = new Keyword("WAITFOR");
	static WAL = new Keyword("WAL");
	static WALLET = new Keyword("WALLET");
	static WEBSEARCH_TO_TSQUERY = new Keyword("WEBSEARCH_TO_TSQUERY");
	static WEEK = new Keyword("WEEK");
	static WEEKDAY = new Keyword("WEEKDAY");
	static WEEKOFYEAR = new Keyword("WEEKOFYEAR");
	static WEEKS = new Keyword("WEEKS");
	static WEIGHT_STRING = new Keyword("WEIGHT_STRING");
	static WHEN = new Keyword("WHEN");
	static WHENEVER = new Keyword("WHENEVER");
	static WHERE = new Keyword("WHERE");
	static WHILE = new Keyword("WHILE");
	static WIDTH = new Keyword("WIDTH");
	static WIDTH_BUCKET = new Keyword("WIDTH_BUCKET");
	static WINDOW = new Keyword("WINDOW");
	static WITH = new Keyword("WITH");
	static WITHIN = new Keyword("WITHIN");
	static WITHOUT = new Keyword("WITHOUT");
	static WNDS = new Keyword("WNDS");
	static WNPS = new Keyword("WNPS");
	static WORK = new Keyword("WORK");
	static WORKLOAD = new Keyword("WORKLOAD");
	static WRAPPER = new Keyword("WRAPPER");
	static WRITE = new Keyword("WRITE");
	static WRITETEXT = new Keyword("WRITETEXT");
	static X509 = new Keyword("X509");
	static XA = new Keyword("XA");
	static XDB = new Keyword("XDB");
	static XDBURITYPE = new Keyword("XDBURITYPE");
	static XML = new Keyword("XML");
	static XMLAGG = new Keyword("XMLAGG");
	static XMLCOMMENT = new Keyword("XMLCOMMENT");
	static XMLCONCAT = new Keyword("XMLCONCAT");
	static XMLELEMENT = new Keyword("XMLELEMENT");
	static XMLEXISTS = new Keyword("XMLEXISTS");
	static XMLFOREST = new Keyword("XMLFOREST");
	static XMLNAMESPACES = new Keyword("XMLNAMESPACES");
	static XMLPI = new Keyword("XMLPI");
	static XMLROOT = new Keyword("XMLROOT");
	static XMLSCHEMA = new Keyword("XMLSCHEMA");
	static XMLTABLE = new Keyword("XMLTABLE");
	static XMLTYPE = new Keyword("XMLTYPE");
	static XML_IS_WELL_FORMED = new Keyword("XML_IS_WELL_FORMED");
	static XML_IS_WELL_FORMED_CONTENT = new Keyword("XML_IS_WELL_FORMED_CONTENT");
	static XML_IS_WELL_FORMED_DOCUMENT = new Keyword(
		"XML_IS_WELL_FORMED_DOCUMENT",
	);
	static XOR = new Keyword("XOR");
	static XPATH = new Keyword("XPATH");
	static XPATH_EXISTS = new Keyword("XPATH_EXISTS");
	static XS = new Keyword("XS");
	static YAML = new Keyword("YAML");
	static YEAR = new Keyword("YEAR");
	static YEARS = new Keyword("YEARS");
	static YEARWEEK = new Keyword("YEARWEEK");
	static YEAR_MONTH = new Keyword("YEAR_MONTH");
	static YES = new Keyword("YES");
	static ZEROBLOB = new Keyword("ZEROBLOB");
	static ZEROFILL = new Keyword("ZEROFILL");
	static ZONE = new Keyword("ZONE");
	static ZONEMAP = new Keyword("ZONEMAP");
	static _ROWID_ = new Keyword("_ROWID_");

	static for(name: string) {
		const keyword = Keyword[name.toUpperCase() as keyof Keyword] as any;
		if (keyword instanceof Keyword) {
			return keyword;
		}
		return undefined;
	}

	public name: string;

	constructor(name: string) {
		this.name = name;
	}
}

export class TokenReader {
	public tokens: Token[];
	pos = 0;
	state: Record<string, any> = {};

	constructor(tokens: Token[]) {
		this.tokens = tokens;
	}

	peek(pos = 0) {
		return this.tokens[this.pos + pos];
	}

	peekIf(...conditions: (Keyword | TokenType | TokenQuery)[]) {
		if (conditions.length === 0) {
			throw new RangeError("conditions must be at least one.");
		}

		for (let i = 0; i < conditions.length; i++) {
			const condition = conditions[i];
			if (!condition) {
				continue;
			}

			const token = this.peek(i);
			if (!token || !token.is(condition)) {
				return false;
			}
		}
		return true;
	}

	consume(condition?: Keyword | TokenType | TokenQuery) {
		const token = this.peek();
		if (token == null) {
			throw this.createParseError();
		}
		if (condition && !token.is(condition)) {
			throw this.createParseError();
		}
		this.pos++;
		return token;
	}

	createParseError(options: { message?: string } = {}) {
		const token = this.peek();
		const fileName = token?.location?.source;
		let lineNumber = token?.location?.lineNumber;
		const columnNumber = token?.location?.columnNumber;
		let message = options.message;

		if (message == null) {
			const end = Math.min(this.pos, this.tokens.length - 1);
			let start = end;
			while (start >= 0) {
				if (start === 0 || this.tokens[start].toString().indexOf("\n") !== -1) {
					if (start === end) {
						start = Math.max(start - 3, 0);
					}
					break;
				}
				start--;
			}
			let line = "";
			for (let i = start; i <= end; i++) {
				line += this.tokens[i].toString();
			}
			message = `Unexpected token: ${line.replace(/\r?\n/g, "\u21B5")}\u261C`;
		}

		if (lineNumber == null) {
			lineNumber = 1;
			for (let i = 0; i < this.pos; i++) {
				const token = this.tokens[i];
				if (token.type === TokenType.LineBreak) {
					lineNumber++;
				}
			}
		}

		let prefix = "";
		if (fileName != null) {
			prefix += fileName;
		}
		prefix += `[${lineNumber}`;
		if (columnNumber != null) {
			prefix += `,${columnNumber}`;
		}
		prefix += "] ";

		const err = new ParseError(prefix + message);
		err.fileName = fileName;
		err.lineNumber = lineNumber;
		err.columnNumber = columnNumber;
		return err;
	}
}

export class ParseError extends Error {
	fileName?: string;
	lineNumber?: number;
	columnNumber?: number;
}
