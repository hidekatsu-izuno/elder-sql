import { SqlTokenType, SqlKeyword } from "../sql.js"
import {
	ParseError,
	type Token,
	TokenReader,
} from "../lexer.js"
import {
	AggregateParseError,
	CstBuilder,
	Parser,
} from "../parser.js"
import { dequote } from "../utils.js"
import { Sqlite3Lexer } from "./sqlite3_lexer.js"
import { Element } from "domhandler"

export class Sqlite3Parser extends Parser {
	compileOptions: Set<string>

	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new Sqlite3Lexer(options), options)
		this.compileOptions = new Set(options.compileOptions || [])
	}

	parseTokens(tokens: Token[]) {
		const r = new TokenReader(tokens)

		const b = new CstBuilder("Script")
		const errors = []
		while (r.peek()) {
			try {
				if (
					r.peekIf({
						type: [SqlTokenType.SemiColon, SqlTokenType.Delimiter, SqlTokenType.EoF],
					})
				) {
					b.token(r.consume())
				} else if (r.peekIf(SqlTokenType.Command)) {
					this.command(b, r)
				} else if (r.peekIf(SqlKeyword.EXPLAIN)) {
					this.explainStatement(b, r)
				} else {
					this.statement(b, r)
				}
			} catch (err) {
				if (err instanceof ParseError) {
					this.unknown(b, r)
					errors.push(err)
				} else {
					throw err
				}
			}
		}

		if (errors.length) {
			throw new AggregateParseError(
				b.root,
				errors,
				`${errors.length} error found\n${errors.map((e) => e.message).join("\n")}`,
			)
		}

		return b.root
	}

	private unknown(b: CstBuilder, r: TokenReader, base?: Element) {
		if (base) {
			while (b.current !== base) {
				b.end()
			}
		}
		let node
		if (!r.peek().eos) {
			b.start("Unknown")
			while (!r.peek().eos) {
				b.token(r.consume())
			}
			node = b.end()		
		}
		if (base?.parent) {
			while (b.current !== base.parent) {
				b.end()
			}
		}
		return node
	}

	private command(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CommandStatement")
		try {
			b.start("CommandName")
			b.value(b.token(r.consume(SqlTokenType.Command)).text)
			b.end()
			if (!r.peek(-1).eos) {
				b.start("CommandArgumentList")
				do {
					b.start("CommandArgument")
					b.value(b.token(r.consume()).text)
					b.end()
				} while (!r.peek(-1).eos)
				b.end()
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private explainStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ExplainStatement")
		try {
			b.token(r.consume(SqlKeyword.EXPLAIN))
			if (r.peekIf(SqlKeyword.QUERY)) {
				b.start("QueryPlanOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.PLAN))
				b.end()
			}
			this.statement(b, r)
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private statement(b: CstBuilder, r: TokenReader) {
		let stmt: Element | undefined
		if (r.peekIf(SqlKeyword.CREATE)) {
			const mark = r.pos
			r.consume()
			while (!r.peek().eos && !Sqlite3Lexer.isObjectStart(r.peek().keyword)) {
				r.consume()
			}

			if (r.peekIf(SqlKeyword.TABLE)) {
				r.pos = mark
				stmt = this.createTableStatement(b, r)
			} else if (r.peekIf(SqlKeyword.VIEW)) {
				r.pos = mark
				stmt = this.createViewStatement(b, r)
			} else if (r.peekIf(SqlKeyword.TRIGGER)) {
				r.pos = mark
				stmt = this.createTriggerStatement(b, r)
			} else if (r.peekIf(SqlKeyword.INDEX)) {
				r.pos = mark
				stmt = this.createIndexStatement(b, r)
			} else {
				r.pos = mark
			}
		} else if (r.peekIf(SqlKeyword.ALTER)) {
			const mark = r.pos
			r.consume()

			if (r.peekIf(SqlKeyword.TABLE)) {
				r.pos = mark
				stmt = this.alterTableStatement(b, r)
			} else {
				r.pos = mark
			}
		} else if (r.peekIf(SqlKeyword.DROP)) {
			const mark = r.pos
			r.consume()

			if (r.peekIf(SqlKeyword.TABLE)) {
				r.pos = mark
				stmt = this.dropTableStatement(b, r)
			} else if (r.peekIf(SqlKeyword.VIEW)) {
				r.pos = mark
				stmt = this.dropViewStatement(b, r)
			} else if (r.peekIf(SqlKeyword.TRIGGER)) {
				r.pos = mark
				stmt = this.dropTriggerStatement(b, r)
			} else if (r.peekIf(SqlKeyword.INDEX)) {
				r.pos = mark
				stmt = this.dropIndexStatement(b, r)
			} else {
				r.pos = mark
			}
		} else if (r.peekIf(SqlKeyword.ATTACH)) {
			stmt = this.attachDatabaseStatement(b, r)
		} else if (r.peekIf(SqlKeyword.DETACH)) {
			stmt = this.detachDatabaseStatement(b, r)
		} else if (r.peekIf(SqlKeyword.ANALYZE)) {
			stmt = this.analyzeStatement(b, r)
		} else if (r.peekIf(SqlKeyword.REINDEX)) {
			stmt = this.reindexStatement(b, r)
		} else if (r.peekIf(SqlKeyword.VACUUM)) {
			stmt = this.vacuumStatement(b, r)
		} else if (r.peekIf(SqlKeyword.PRAGMA)) {
			stmt = this.pragmaStatement(b, r)
		} else if (r.peekIf(SqlKeyword.BEGIN)) {
			stmt = this.beginTransactionStatement(b, r)
		} else if (r.peekIf(SqlKeyword.SAVEPOINT)) {
			stmt = this.savepointStatement(b, r)
		} else if (r.peekIf(SqlKeyword.RELEASE)) {
			stmt = this.releaseSavepointStatement(b, r)
		} else if (r.peekIf({ type: [SqlKeyword.COMMIT, SqlKeyword.END] })) {
			stmt = this.commitTransactionStatement(b, r)
		} else if (r.peekIf(SqlKeyword.ROLLBACK)) {
			stmt = this.rollbackTransactionStatement(b, r)
		} else {
			let withClause;
			if (r.peekIf(SqlKeyword.WITH)) {
				withClause = this.withClause(b, r)
			}
			if (r.peekIf({ type: [SqlKeyword.INSERT, SqlKeyword.REPLACE] })) {
				stmt = this.insertStatement(b, r, withClause)
			} else if (r.peekIf(SqlKeyword.UPDATE)) {
				stmt = this.updateStatement(b, r, withClause)
			} else if (r.peekIf(SqlKeyword.DELETE)) {
				stmt = this.deleteStatement(b, r, withClause)
			} else if (r.peekIf({ type: [SqlKeyword.SELECT, SqlKeyword.VALUES] })) {
				stmt = this.selectStatement(b, r, withClause)
			}
		}

		if (!stmt) {
			throw r.createParseError()
		}
		return stmt
	}

	private createTableStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateTableStatement")
		try {
			b.token(r.consume(SqlKeyword.CREATE))
			let virtual = false
			if (r.peekIf({ type: [SqlKeyword.TEMPORARY, SqlKeyword.TEMP] })) {
				b.start("TemporaryOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.VIRTUAL)) {
				b.start("VirtualOption")
				b.token(r.consume())
				b.end()
				virtual = true
			}
			b.token(r.consume(SqlKeyword.TABLE))
			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfNotExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.NOT))
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
			if (virtual) {
				b.start("UsingModuleClause")
				b.token(r.consume(SqlKeyword.USING))
				this.identifier(b, r, "ModuleName")
				if (r.peekIf(SqlTokenType.LeftParen)) {
					b.token(r.consume())
					{
						b.start("ModuleArgumentList")
						do {
							b.start("ModuleArgument")
							do {
								b.token(r.consume())
							} while (
								!r.peek().eos &&
								!r.peekIf({
									type: [SqlTokenType.RightParen, SqlTokenType.Comma],
								})
							)
							b.end()
	
							if (r.peekIf(SqlTokenType.Comma)) {
								b.token(r.consume())
							} else {
								break
							}
						} while (!r.peek().eos)
						b.end()	
					}
					b.token(r.consume(SqlTokenType.RightParen))
				}
				b.end()
			} else if (r.peekIf(SqlTokenType.LeftParen)) {
				b.token(r.consume())
				{
					b.start("TableColumnList")
					let hasTableConstraint = false
					do {
						if (!hasTableConstraint) {
							if (
								r.peekIf({
									type: [
										SqlKeyword.CONSTRAINT,
										SqlKeyword.UNIQUE,
										SqlKeyword.CHECK,
										SqlKeyword.FOREIGN,
									],
								}) ||
								r.peekIf(SqlKeyword.PRIMARY, SqlKeyword.KEY)
							) {
								hasTableConstraint = true
							} else {
								this.tableColumn(b, r)
							}
						}
						if (hasTableConstraint) {
							this.tableConstraint(b, r)
						}
						if (r.peekIf(SqlTokenType.Comma)) {
							b.token(r.consume())
						} else {
							break
						}
					} while (!r.peek().eos)
					b.end()	
				}
				b.token(r.consume(SqlTokenType.RightParen))

				while (r.peekIf({ type: [SqlKeyword.WITHOUT, SqlKeyword.STRICT] })) {
					if (r.peekIf(SqlKeyword.WITHOUT)) {
						b.start("WithoutRowidOption")
						b.token(r.consume())
						b.token(r.consume(SqlKeyword.ROWID))
						b.end()
					} else if (r.peekIf(SqlKeyword.STRICT)) {
						b.start("StrictOption")
						b.token(r.consume())
						b.end()
					}
					if (r.peekIf(SqlTokenType.Comma)) {
						b.token(r.consume())
					} else {
						break
					}
				}
			} else if (r.peekIf(SqlKeyword.AS)) {
				b.token(r.consume())
				this.selectStatement(b, r)
			} else {
				throw r.createParseError()
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private createViewStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateViewStatement")
		try {
			b.token(r.consume(SqlKeyword.CREATE))
			if (r.peekIf({ type: [SqlKeyword.TEMPORARY, SqlKeyword.TEMP] })) {
				b.start("TemporaryOption")
				b.token(r.consume())
				b.end()
			}
			b.token(r.consume(SqlKeyword.VIEW))
			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfNotExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.NOT))
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
			if (r.peekIf(SqlTokenType.LeftParen)) {
				b.token(r.consume())
				this.columnList(b, r)
				b.token(r.consume(SqlTokenType.RightParen))
			}
			b.token(r.consume(SqlKeyword.AS))
			this.selectStatement(b, r)
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private createTriggerStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateTriggerStatement")
		try {
			b.token(r.consume(SqlKeyword.CREATE))
			if (r.peekIf(SqlKeyword.TEMPORARY) || r.peekIf(SqlKeyword.TEMP)) {
				b.start("TemporaryOption")
				b.token(r.consume())
				b.end()
			}
			b.token(r.consume(SqlKeyword.TRIGGER))
			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfNotExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.NOT))
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
			let option;
			if (r.peekIf(SqlKeyword.BEFORE)) {
				b.start("BeforeOption")
				b.token(r.consume())
				option = b.end()
			} else if (r.peekIf(SqlKeyword.AFTER)) {
				option = b.start("AfterOption")
				b.token(r.consume())
				option = b.end()
			} else if (r.peekIf(SqlKeyword.INSTEAD)) {
				option = b.start("InsteadOfOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.OF))
				option = b.end()
			}
			if (r.peekIf(SqlKeyword.INSERT)) {
				b.start("InsertOnClause")
				if (option) {
					b.append(option);
				}
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ON))
				const ident = this.identifier(b, r, "ObjectName")
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName"
					b.token(r.consume())
					this.identifier(b, r, "ObjectName")
				}
				b.end()
			} else if (r.peekIf(SqlKeyword.UPDATE)) {
				b.start("UpdateOnClause")
				if (option) {
					b.append(option);
				}
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.OF)) {
					b.start("ColumnList")
					b.token(r.consume())
					do {
						this.identifier(b, r, "ColumnName")
						if (r.peekIf(SqlTokenType.Comma)) {
							b.token(r.consume())
						} else {
							break
						}
					} while (!r.peek().eos)
					b.end()
				}
				b.token(r.consume(SqlKeyword.ON))
				const ident = this.identifier(b, r, "ObjectName")
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName"
					b.token(r.consume())
					this.identifier(b, r, "ObjectName")
				}
				b.end()
			} else if (r.peekIf(SqlKeyword.DELETE)) {
				b.start("DeleteOnClause")
				if (option) {
					b.append(option);
				}
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ON))
				const ident = this.identifier(b, r, "ObjectName")
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName"
					b.token(r.consume())
					this.identifier(b, r, "ObjectName")
				}
				b.end()
			} else {
				throw r.createParseError()
			}
			if (r.peekIf(SqlKeyword.FOR)) {
				b.start("ForEachRowOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.EACH))
				b.token(r.consume(SqlKeyword.ROW))
				b.end()
			}
			if (r.peekIf(SqlKeyword.WHEN)) {
				b.start("WhenClause")
				b.token(r.consume())
				this.expression(b, r)
				b.end()
			}
			{
				b.start("BeginStatement")
				b.token(r.consume(SqlKeyword.BEGIN))
				{
					b.start("BeginBlock")
					let withClause
					if (r.peekIf(SqlKeyword.WITH)) {
						withClause = this.withClause(b, r)
					}
					if (r.peekIf(SqlKeyword.INSERT) || r.peekIf(SqlKeyword.REPLACE)) {
						this.insertStatement(b, r, withClause)
					} else if (r.peekIf(SqlKeyword.UPDATE)) {
						this.updateStatement(b, r, withClause)
					} else if (r.peekIf(SqlKeyword.DELETE)) {
						this.deleteStatement(b, r, withClause)
					} else if (r.peekIf(SqlKeyword.SELECT)) {
						this.selectStatement(b, r, withClause)
					} else {
						throw r.createParseError()
					}
					b.token(r.consume(SqlTokenType.SemiColon))
					b.end()
				}
				b.token(r.consume(SqlKeyword.END))
				b.end()	
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private createIndexStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateIndexStatement");
		try {
			b.token(r.consume(SqlKeyword.CREATE))
			if (r.peekIf(SqlKeyword.UNIQUE)) {
				b.start("UniqueOption")
				b.token(r.consume())
				b.end()
			}
			b.token(r.consume(SqlKeyword.INDEX))
			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfNotExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.NOT))
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
			{
				b.start("IndexOnClause")
				b.token(r.consume(SqlKeyword.ON))
				this.identifier(b, r, "ObjectName")
				b.token(r.consume(SqlTokenType.LeftParen))
				{
					b.start("SortColumnList")
					do {
						this.sortColumn(b, r)
						if (r.peekIf(SqlTokenType.Comma)) {
							b.token(r.consume())
						} else {
							break
						}
					} while (!r.peek().eos)
					b.end()	
				}
				b.token(r.consume(SqlTokenType.RightParen))
				b.end()	
			}
			if (r.peekIf(SqlKeyword.WHERE)) {
				this.whereClause(b, r)
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private alterTableStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("AlterTableStatement");
		try {
			b.token(r.consume(SqlKeyword.ALTER))
			b.token(r.consume(SqlKeyword.TABLE))
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
			if (r.peekIf(SqlKeyword.RENAME, SqlKeyword.TO)) {
				b.start("RenameToObjectClause")
				b.token(r.consume())
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
				b.end()
			} else if (r.peekIf(SqlKeyword.RENAME)) {
				b.start("RenameColumnClause")
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.COLUMN)) {
					b.token(r.consume())
				}
				this.identifier(b, r, "ColumnName")
				{
					b.start("RenameToColumnClause")
					b.token(r.consume(SqlKeyword.TO))
					this.identifier(b, r, "ColumnName")
					b.end()	
				}
				b.end()
			} else if (r.peekIf(SqlKeyword.ADD)) {
				b.start("AddColumnClause")
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.COLUMN)) {
					b.token(r.consume())
				}
				this.tableColumn(b, r)
				b.end()
			} else if (r.peekIf(SqlKeyword.DROP)) {
				b.start("DropColumnClause")
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.COLUMN)) {
					b.token(r.consume())
				}
				this.identifier(b, r, "ColumnName")
				b.end()
			} else {
				throw r.createParseError()
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private dropTableStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropTableStatement")
		try {
			b.token(r.consume(SqlKeyword.DROP))
			b.token(r.consume(SqlKeyword.TABLE))
			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private dropViewStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropViewStatement")
		try {
			b.token(r.consume(SqlKeyword.DROP))
			b.token(r.consume(SqlKeyword.VIEW))

			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}

			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private dropTriggerStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropTriggerStatement")
		try {
			b.token(r.consume(SqlKeyword.DROP))
			b.token(r.consume(SqlKeyword.TRIGGER))

			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfExistsOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}

			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private dropIndexStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropIndexStatement")
		try {
			b.token(r.consume(SqlKeyword.DROP))
			b.token(r.consume(SqlKeyword.INDEX))

			if (r.peekIf(SqlKeyword.IF)) {
				b.start("IfExists")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.EXISTS))
				b.end()
			}

			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private attachDatabaseStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("AttachDatabaseStatement")
		try {
			b.token(r.consume(SqlKeyword.ATTACH))
			if (r.peekIf(SqlKeyword.DATABASE)) {
				b.token(r.consume())
			}
			{
				b.start("Database")
				this.expression(b, r)
				b.end()	
			}
			b.token(r.consume(SqlKeyword.AS))
			this.identifier(b, r, "SchemaName")
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private detachDatabaseStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DetachDatabaseStatement")
		try {
			b.token(r.consume(SqlKeyword.DETACH))
			if (r.peekIf(SqlKeyword.DATABASE)) {
				b.token(r.consume())
			}

			this.identifier(b, r, "SchemaName")			
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private analyzeStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("AnalyzeStatement")
		try {
			b.token(r.consume(SqlKeyword.ANALYZE))

			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private reindexStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ReindexStatement")
		try {
			b.token(r.consume(SqlKeyword.REINDEX))
			if (r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })) {
				const ident = this.identifier(b, r, "ObjectName")
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName"
					b.token(r.consume())
					this.identifier(b, r, "ObjectName")
				}
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private vacuumStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("VacuumStatement")
		try {
			b.token(r.consume(SqlKeyword.VACUUM))

			if (r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })) {
				this.identifier(b, r, "SchemaName")
			}

			if (r.peekIf(SqlKeyword.INTO)) {
				b.token(r.consume())
				b.start("FileName")
				this.stringLiteral(b, r)
				b.end()
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private pragmaStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("PragmaStatement")
		try {
			b.token(r.consume(SqlKeyword.PRAGMA))

			const ident = this.identifier(b, r, "PragmaName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "PragmaName")
			}

			if (r.peekIf({ type: SqlTokenType.Operator, text: "=" })) {
				b.token(r.consume())
				this.pragmaValue(b, r)
			} else if (r.peekIf(SqlTokenType.LeftParen)) {
				b.token(r.consume())
				b.start("PragmaArgumentList")
				{
					b.start("PragmaArgument")
					this.pragmaValue(b, r)
					b.end()	
				}
				b.end()
				b.token(r.consume(SqlTokenType.RightParen))
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private beginTransactionStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("BeginTransactionStatement")
		try {
			b.token(r.consume(SqlKeyword.BEGIN))
			if (r.peekIf(SqlKeyword.DEFERRED)) {
				b.start("DeferredOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.IMMEDIATE)) {
				b.start("ImmediateOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.EXCLUSIVE)) {
				b.start("ExclusiveOption")
				b.token(r.consume())
				b.end()
			}
			if (r.peekIf(SqlKeyword.TRANSACTION)) {
				b.token(r.consume())
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private savepointStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("SavepointStatement")
		try {
			b.token(r.consume(SqlKeyword.SAVEPOINT))
			this.identifier(b, r, "SavepointName")
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private releaseSavepointStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ReleaseSavepointStatement")
		try {
			b.token(r.consume(SqlKeyword.RELEASE))
			if (r.peekIf(SqlKeyword.SAVEPOINT)) {
				b.token(r.consume())
			}
			this.identifier(b, r, "SavepointName")
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private commitTransactionStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CommitTransactionStatement")
		try {
			if (r.peekIf(SqlKeyword.END)) {
				b.token(r.consume())
			} else {
				b.token(r.consume(SqlKeyword.COMMIT))
			}
			if (r.peekIf(SqlKeyword.TRANSACTION)) {
				b.token(r.consume())
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private rollbackTransactionStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("RollbackTransactionStatement")
		try {
			b.token(r.consume(SqlKeyword.ROLLBACK))
			if (r.peekIf(SqlKeyword.TRANSACTION)) {
				b.token(r.consume())
			}
			if (r.peekIf(SqlKeyword.TO)) {
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.SAVEPOINT)) {
					b.token(r.consume())
				}
				this.identifier(b, r, "SavepointName")
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private insertStatement(b: CstBuilder, r: TokenReader, withClause?: Element) {
		const stmt = b.start("InsertStatement")
		try {
			if (withClause) {
				b.append(withClause)
			}
			this.insertClause(b, r)
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private insertClause(b: CstBuilder, r: TokenReader) {
		b.start("InsertClause")
		if (r.peekIf(SqlKeyword.REPLACE)) {
			b.start("ReplaceOption")
			b.token(r.consume())
			b.end()
		} else {
			b.token(r.consume(SqlKeyword.INSERT))
			if (r.peekIf(SqlKeyword.OR)) {
				b.start("OrConflictClause")
				b.token(r.consume())
				this.conflictAction(b, r)
				b.end()
			}
		}
		b.token(r.consume(SqlKeyword.INTO))

		const ident = this.identifier(b, r, "ObjectName")
		if (r.peekIf(SqlTokenType.Dot)) {
			ident.attribs.type = "SchemaName"
			b.token(r.consume())
			this.identifier(b, r, "ObjectName")
		}

		if (r.peekIf(SqlKeyword.AS)) {
			b.token(r.consume())
			this.identifier(b, r, "ObjectAlias")
		}

		if (r.peekIf(SqlTokenType.LeftParen)) {
			b.token(r.consume())
			this.columnList(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
		}

		if (r.peekIf(SqlKeyword.DEFAULT)) {
			b.start("DefaultValuesOption")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.VALUES))
			b.end()
		} else {
			if (r.peekIf(SqlKeyword.VALUES)) {
				b.start("ValuesClause")
				b.token(r.consume())

				{
					b.start("ExpressionListGroup")
					do {
						b.token(r.consume(SqlTokenType.LeftParen))
						const current = this.expressionList(b, r)
						b.token(r.consume(SqlTokenType.RightParen))
	
						if (r.peekIf(SqlTokenType.Comma)) {
							b.token(r.consume())
						} else {
							break
						}
					} while (!r.peek().eos)
					b.end()	
				}

				b.end()
			} else {
				let withClause;
				if (r.peekIf(SqlKeyword.WITH)) {
					withClause = this.withClause(b, r)
				}
				this.selectStatement(b, r, withClause)
			}

			do {
				if (r.peekIf(SqlKeyword.ON)) {
					this.onConflictClause(b, r)
				} else {
					break
				}
			} while (!r.peek().eos)
		}

		if (r.peekIf(SqlKeyword.RETURNING)) {
			this.returningClause(b, r)
		}

		return b.end()
	}

	private onConflictClause(b: CstBuilder, r: TokenReader) {
		b.start("OnConflictClause")
		b.token(r.consume(SqlKeyword.ON))
		b.token(r.consume(SqlKeyword.CONFLICT))

		if (r.peekIf(SqlTokenType.LeftParen)) {
			b.token(r.consume())

			b.start("SortColumnList")
			do {
				this.sortColumn(b, r)
				if (r.peekIf(SqlTokenType.Comma)) {
					b.token(r.consume())
				} else {
					break
				}
			} while (!r.peek().eos)
			b.end()

			b.token(r.consume(SqlTokenType.RightParen))
			if (r.peekIf(SqlKeyword.WHERE)) {
				this.whereClause(b, r)
			}
		}
		b.token(r.consume(SqlKeyword.DO))
		if (r.peekIf(SqlKeyword.NOTHING)) {
			b.start("DoNothingOption")
			b.token(r.consume())
			b.end()
		} else if (r.peekIf(SqlKeyword.UPDATE)) {
			b.start("DoUpdateOption")
			b.token(r.consume())
			this.setClause(b, r)
			if (r.peekIf(SqlKeyword.WHERE)) {
				this.whereClause(b, r)
			}
			b.end()
		} else {
			throw r.createParseError()
		}
		return b.end()
	}

	private updateStatement(b: CstBuilder, r: TokenReader, withClause?: Element) {
		const stmt = b.start("UpdateStatement")
		try {
			if (withClause) {
				b.append(withClause)
			}
			this.updateClause(b, r)
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private updateClause(b: CstBuilder, r: TokenReader) {
		b.start("UpdateClause")
		b.token(r.consume(SqlKeyword.UPDATE))

		const ident = this.identifier(b, r, "ObjectName")
		if (r.peekIf(SqlTokenType.Dot)) {
			ident.attribs.type = "SchemaName"
			b.token(r.consume())
			this.identifier(b, r, "ObjectName")
		}

		if (r.peekIf(SqlKeyword.AS)) {
			b.token(r.consume())
			this.identifier(b, r, "ObjectAlias")
		}

		if (r.peekIf(SqlKeyword.INDEXED)) {
			b.start("IndexedByOption")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.BY))
			this.identifier(b, r, "ObjectName")
			b.end()
		} else if (r.peekIf(SqlKeyword.NOT)) {
			b.start("NotIndexedOption")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.INDEXED))
			b.end()
		}

		this.setClause(b, r)
		if (r.peekIf(SqlKeyword.FROM)) {
			this.fromClause(b, r)
		}
		if (r.peekIf(SqlKeyword.WHERE)) {
			this.whereClause(b, r)
		}
		if (r.peekIf(SqlKeyword.RETURNING)) {
			this.returningClause(b, r)
		}
		if (r.peekIf(SqlKeyword.ORDER)) {
			this.orderByClause(b, r)
		}
		if (r.peekIf(SqlKeyword.LIMIT)) {
			this.limitClause(b, r)
		}

		return b.end()
	}

	private setClause(b: CstBuilder, r: TokenReader) {
		b.start("SetClause")
		b.token(r.consume(SqlKeyword.SET))

		{
			b.start("UpdateColumnList")
			do {
				b.start("UpdateColumn")
	
				if (r.peekIf(SqlTokenType.LeftParen)) {
					b.token(r.consume())
					this.columnList(b, r)
					b.token(r.consume(SqlTokenType.RightParen))
				} else {
					this.identifier(b, r, "ColumnName")
				}
				b.token(r.consume({ type: SqlTokenType.Operator, text: "=" }))

				{
					b.start("ColumnValue")
					this.expression(b, r)
					b.end()	
				}

				b.end()
	
				if (r.peekIf(SqlTokenType.Comma)) {
					b.token(r.consume())
				} else {
					break
				}
			} while (!r.peek().eos)
			b.end()	
		}

		return b.end()
	}

	private deleteStatement(b: CstBuilder, r: TokenReader, withClause?: Element) {
		const stmt = b.start("DeleteStatement")
		try {
			if (withClause) {
				b.append(withClause)
			}
			this.deleteClause(b, r)
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private deleteClause(b: CstBuilder, r: TokenReader) {
		b.start("DeleteClause")
		b.token(r.consume(SqlKeyword.DELETE))
		b.token(r.consume(SqlKeyword.FROM))
		const ident = this.identifier(b, r, "ObjectName")
		if (r.peekIf(SqlTokenType.Dot)) {
			ident.attribs.type = "SchemaName"
			b.token(r.consume())
			this.identifier(b, r, "ObjectName")
		}
		if (r.peekIf(SqlKeyword.WHERE)) {
			this.whereClause(b, r)
		}
		if (r.peekIf(SqlKeyword.RETURNING)) {
			this.returningClause(b, r)
		}
		return b.end()
	}

	private selectStatement(b: CstBuilder, r: TokenReader, withClause?: Element) {
		const stmt = b.start("SelectStatement")
		try {
			if (withClause) {
				b.append(withClause)
			}
			let current = this.selectClause(b, r)
			while (
				!this.compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT") &&
				!r.peek().eos
			) {
				if (r.peekIf(SqlKeyword.UNION)) {
					b.start("UnionOperation")
					b.append(current)
					b.token(r.consume())
					if (r.peekIf(SqlKeyword.ALL)) {
						b.start("AllOption")
						b.token(r.consume())
						b.end()
					}
					this.selectClause(b, r)
					current = b.end()
				} else if (r.peekIf(SqlKeyword.INTERSECT)) {
					b.start("IntersectOperation")
					b.append(current)
					b.token(r.consume())
					this.selectClause(b, r)
					current = b.end()
				} else if (r.peekIf(SqlKeyword.EXCEPT)) {
					b.start("ExceptOperation")
					b.append(current)
					b.token(r.consume())
					this.selectClause(b, r)
					current = b.end()
				} else {
					break
				}
			}

			if (r.peekIf(SqlKeyword.ORDER)) {
				this.orderByClause(b, r)
			}
			if (r.peekIf(SqlKeyword.LIMIT)) {
				this.limitClause(b, r)
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt)
			}
			throw err
		}
		return b.end()
	}

	private selectClause(b: CstBuilder, r: TokenReader) {
		b.start("SelectClause")

		if (r.peekIf(SqlKeyword.VALUES)) {
			b.start("ValuesClause")
			b.token(r.consume(SqlKeyword.VALUES))
			b.token(r.consume(SqlTokenType.LeftParen))
			this.expressionList(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			b.end()
		} else {
			b.token(r.consume(SqlKeyword.SELECT))
			if (r.peekIf(SqlKeyword.DISTINCT)) {
				b.start("DistinctOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.ALL)) {
				b.start("AllOption")
				b.token(r.consume())
				b.end()
			}
			this.selectColumnList(b, r)

			if (r.peekIf(SqlKeyword.FROM)) {
				this.fromClause(b, r)
			}
			if (r.peekIf(SqlKeyword.WHERE)) {
				this.whereClause(b, r)
			}
			if (r.peekIf(SqlKeyword.GROUP)) {
				this.gropuByClause(b, r)
			}
			if (r.peekIf(SqlKeyword.HAVING)) {
				this.havingClause(b, r)
			}
			if (
				!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
				r.peekIf(SqlKeyword.WINDOW)
			) {
				this.windowClause(b, r)
			}
		}
		return b.end()
	}

	private withClause(b: CstBuilder, r: TokenReader) {
		b.start("WithClause")
		b.token(r.consume(SqlKeyword.WITH))

		if (r.peekIf(SqlKeyword.RECURSIVE)) {
			b.start("RecursiveOption")
			b.token(r.consume())
			b.end()
		}

		b.start("CommonTableList")
		do {
			b.start("CommonTable")
			this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.LeftParen)) {
				b.token(r.consume())
				this.columnList(b, r)
				b.token(r.consume(SqlTokenType.RightParen))
			}
			b.token(r.consume(SqlKeyword.AS))

			if (r.peekIf(SqlKeyword.MATERIALIZED)) {
				const option = b.start("MaterializedOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.NOT, SqlKeyword.MATERIALIZED)) {
				const option = b.start("NotMaterializedOption")
				b.token(r.consume())
				b.token(r.consume())
				b.end()
			}

			b.token(r.consume(SqlTokenType.LeftParen))
			this.selectStatement(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			b.end()

			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		b.end()
		return b.end()
	}

	private selectColumnList(b: CstBuilder, r: TokenReader) {
		b.start("SelectColumnList")

		do {
			b.start("SelectColumn")
			if (r.peekIf({ type: SqlTokenType.Operator, text: "*" })) {
				b.start("AllColumnsOption")
				b.token(r.consume())
				b.end()
			} else if (
				r.peekIf(
					{ type: [SqlTokenType.Identifier, SqlTokenType.String] },
					SqlTokenType.Dot,
					{ type: SqlTokenType.Operator, text: "*" },
				)
			) {
				b.start("AllColumnsOption")
				this.identifier(b, r, "SchemaName")
				b.token(r.consume())
				b.token(r.consume())
				b.end()
			} else {
				this.expression(b, r)
				if (r.peekIf(SqlKeyword.AS)) {
					b.token(r.consume())
					this.identifier(b, r, "ColumnAlias")
				} else if (
					r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })
				) {
					this.identifier(b, r, "ColumnAlias")
				}
			}
			b.end()
			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		return b.end()
	}

	private fromClause(b: CstBuilder, r: TokenReader) {
		b.start("FromClause")
		b.token(r.consume(SqlKeyword.FROM))
		{
			b.start("FromObjectList")

			let hasJoinClause = false
			do {
				this.fromObject(b, r)
				while (
					r.peekIf({
						type: [
							SqlKeyword.NATURAL,
							SqlKeyword.JOIN,
							SqlKeyword.CROSS,
							SqlKeyword.INNER,
							SqlKeyword.LEFT,
							SqlKeyword.RIGHT,
							SqlKeyword.FULL,
						],
					})
				) {
					hasJoinClause = true
					this.joinClause(b, r)
				}
	
				if (!hasJoinClause && r.peekIf(SqlTokenType.Comma)) {
					b.token(r.consume())
				} else {
					break
				}
			} while (!r.peek().eos)
			b.end()	
		}
		return b.end()
	}

	private fromObject(b: CstBuilder, r: TokenReader) {
		b.start("FromObject")

		if (r.peekIf(SqlTokenType.LeftParen)) {
			b.token(r.consume())
			{
				b.start("SubqueryExpression")
				if (r.peekIf({ type: [SqlKeyword.WITH, SqlKeyword.SELECT] })) {
					let withClause;
					if (r.peekIf(SqlKeyword.WITH)) {
						withClause = this.withClause(b, r)
					}
					this.selectStatement(b, r, withClause)
				} else {
					this.fromClause(b, r)
				}
				b.end()	
			}
			b.token(r.consume(SqlTokenType.RightParen))
		} else {
			const node = b.start("ObjectReference")
			const ident = this.identifier(b, r, "ObjectName")
			if (r.peekIf(SqlTokenType.Dot)) {
				ident.attribs.type = "SchemaName"
				b.token(r.consume())
				this.identifier(b, r, "ObjectName")
			}
			if (r.peekIf(SqlTokenType.LeftParen)) {
				node.attribs.type = "FunctionExpression"
				b.token(r.consume())
				{
					b.start("FunctionArgumentList")
					while (!r.peekIf(SqlTokenType.RightParen)) {
						b.start("FunctionArgument")
						this.expression(b, r)
						b.end()
	
						if (r.peekIf(SqlTokenType.Comma)) {
							b.token(r.consume())
						} else {
							break
						}
					}
					b.end()
				}
				b.token(r.consume(SqlTokenType.RightParen))
			}
			b.end()
		}

		if (r.peekIf(SqlKeyword.AS)) {
			b.token(r.consume())
			this.identifier(b, r, "ObjectAlias")
		} else if (r.peekIf(SqlTokenType.Identifier)) {
			this.identifier(b, r, "ObjectAlias")
		}
		return b.end()
	}

	private joinClause(b: CstBuilder, r: TokenReader) {
		if (r.peekIf(SqlKeyword.CROSS)) {
			b.start("CrossJoinClause")
			b.token(r.consume())
		} else {
			let option
			if (r.peekIf(SqlKeyword.NATURAL)) {
				b.start("NatualOption")
				b.token(r.consume())
				option = b.end()
			}
			if (r.peekIf(SqlKeyword.LEFT)) {
				b.start("LeftOuterJoinClause")
				if (option) {
					b.append(option)
				}
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.OUTER)) {
					b.token(r.consume())
				}
			} else if (r.peekIf(SqlKeyword.RIGHT)) {
				b.start("RightOuterJoinClause")
				if (option) {
					b.append(option)
				}
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.OUTER)) {
					b.token(r.consume())
				}
			} else if (r.peekIf(SqlKeyword.FULL)) {
				b.start("FullOuterJoinClause")
				if (option) {
					b.append(option)
				}
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.OUTER)) {
					b.token(r.consume())
				}
			} else {
				b.start("InnerJoinClause")
				if (option) {
					b.append(option)
				}
				if (r.peekIf(SqlKeyword.INNER)) {
					b.token(r.consume())
				}
			}
		}
		b.token(r.consume(SqlKeyword.JOIN))

		this.fromObject(b, r)

		if (r.peekIf(SqlKeyword.ON)) {
			b.start("JoinOnClause")
			b.token(r.consume())
			this.expression(b, r)
			b.end()
		} else if (r.peekIf(SqlKeyword.USING)) {
			b.start("UsingClause")
			b.token(r.consume())
			b.token(r.consume(SqlTokenType.LeftParen))
			b.token(r.consume(SqlTokenType.RightParen))
			b.end()
		}

		return b.end()
	}

	private whereClause(b: CstBuilder, r: TokenReader) {
		b.start("WhereClause")
		b.token(r.consume(SqlKeyword.WHERE))
		this.expression(b, r)
		return b.end()
	}

	private gropuByClause(b: CstBuilder, r: TokenReader) {
		b.start("GroupByClause")
		b.token(r.consume(SqlKeyword.GROUP))
		b.token(r.consume(SqlKeyword.BY))
		this.expressionList(b, r)
		return b.end()
	}

	private havingClause(b: CstBuilder, r: TokenReader) {
		b.start("HavingClause")
		b.token(r.consume(SqlKeyword.HAVING))
		this.expression(b, r)
		return b.end()
	}

	private windowClause(b: CstBuilder, r: TokenReader) {
		b.start("WindowClause")
		b.token(r.consume(SqlKeyword.WINDOW))
		do {
			this.identifier(b, r, "WindowName")
			b.token(r.consume(SqlKeyword.AS))
			this.window(b, r)
			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		return b.end()
	}

	private window(b: CstBuilder, r: TokenReader) {
		b.start("Window")
		if (!r.peekIf(SqlKeyword.PARTITION)) {
			this.identifier(b, r, "BaseWindowName")
		}
		if (r.peekIf(SqlKeyword.PARTITION)) {
			this.partitionByClause(b, r)
		}
		if (r.peekIf(SqlKeyword.ORDER)) {
			this.orderByClause(b, r)
		}
		b.start("FrameClause")
		if (r.peekIf(SqlKeyword.RANGE)) {
			b.start("RangeOption")
			b.token(r.consume())
			b.end()
		} else if (r.peekIf(SqlKeyword.ROWS)) {
			b.start("RowsOption")
			b.token(r.consume())
			b.end()
		} else if (r.peekIf(SqlKeyword.GROUPS)) {
			b.start("GroupsOption")
			b.token(r.consume())
			b.end()
		}
		if (r.peekIf(SqlKeyword.CURRENT)) {
			b.start("FrameStartClause")
			{
				b.start("CurrentRowOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ROW))
				b.end()
			}
			b.end()
		} else if (r.peekIf(SqlKeyword.UNBOUNDED)) {
			b.start("FrameStartClause")
			{
				b.start("UnboundedPrecedingOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.PRECEDING))
				b.end()	
			}
			b.end()
		} else if (r.peekIf(SqlKeyword.BETWEEN)) {
			b.token(r.consume())

			b.start("FrameStartClause")
			b.token(r.consume())
			if (r.peekIf(SqlKeyword.CURRENT)) {
				b.start("CurrentRowOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ROW))
				b.end()
			} else if (r.peekIf(SqlKeyword.UNBOUNDED)) {
				b.start("UnboundedPrecedingOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.PRECEDING))
				b.end()
			} else {
				if (r.peekIf(SqlKeyword.PRECEDING)) {
					b.start("PrecedingOption")
					this.expression(b, r)
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.FOLLOWING)) {
					b.start("FollowingOption")
					this.expression(b, r)
					b.token(r.consume())
					b.end()
				} else {
					throw r.createParseError()
				}
			}
			b.end()
			b.token(r.consume(SqlKeyword.AND))

			b.start("FrameEndClause")

			b.token(r.consume())
			if (r.peekIf(SqlKeyword.CURRENT)) {
				b.start("CurrentRowOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ROW))
				b.end()
			} else if (r.peekIf(SqlKeyword.UNBOUNDED)) {
				b.start("UnboundedFollowingOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.FOLLOWING))
				b.end()
			} else {
				if (r.peekIf(SqlKeyword.PRECEDING)) {
					b.start("PrecedingOption")
					this.expression(b, r)
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.FOLLOWING)) {
					b.start("FollowingOption")
					this.expression(b, r)
					b.token(r.consume())
					b.end()
				} else {
					throw r.createParseError()
				}
			}
			b.end()
		} else {
			b.start("FrameStartClause")
			{
				b.start("PrecedingOption")
				this.expression(b, r)
				b.token(r.consume(SqlKeyword.PRECEDING))
				b.end()	
			}
			b.end()
		}
		b.end()
		if (r.peekIf(SqlKeyword.EXCLUDE)) {
			b.start("ExcludeClause")
			b.token(r.consume())
			if (r.peekIf(SqlKeyword.NO)) {
				b.start("NoOthersOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.OTHERS))
				b.end()
			} else if (r.peekIf(SqlKeyword.CURRENT)) {
				b.start("CurrentRowOption")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ROW))
				b.end()
			} else if (r.peekIf(SqlKeyword.GROUP)) {
				b.start("GroupOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.TIES)) {
				b.start("TiesOption")
				b.token(r.consume())
				b.end()
			} else {
				throw r.createParseError()
			}
			b.end()
		}
		return b.end()
	}

	private partitionByClause(b: CstBuilder, r: TokenReader) {
		b.start("PartitionByClause")
		b.token(r.consume(SqlKeyword.PARTITION))
		b.token(r.consume(SqlKeyword.BY))
		do {
			this.expression(b, r)
			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		return b.end()
	}

	private returningClause(b: CstBuilder, r: TokenReader) {
		b.start("ReturningClause")
		b.token(r.consume(SqlKeyword.RETURNING))
		this.selectColumnList(b, r)
		return b.end()
	}

	private orderByClause(b: CstBuilder, r: TokenReader) {
		b.start("OrderByClause")
		b.token(r.consume(SqlKeyword.ORDER))
		b.token(r.consume(SqlKeyword.BY))

		b.start("SortColumnList")
		do {
			this.sortColumn(b, r)
			if (r.peekIf(SqlKeyword.NULLS, SqlKeyword.FIRST)) {
				b.start("NullsFirstOption")
				b.token(r.consume())
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.NULLS, SqlKeyword.LAST)) {
				b.start("NullsLastOption")
				b.token(r.consume())
				b.token(r.consume())
				b.end()
			}

			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		b.end()
		return b.end()
	}

	private limitClause(b: CstBuilder, r: TokenReader) {
		b.start("LimitClause")
		b.token(r.consume(SqlKeyword.LIMIT))
		const node = this.expression(b, r)
		if (r.peekIf(SqlKeyword.OFFSET)) {
			b.start("LimitOption")
			b.append(node)
			b.end()

			b.start("OffsetOption")
			b.token(r.consume())
			this.expression(b, r)
			b.end()
		} else if (r.peekIf(SqlTokenType.Comma)) {				
			b.start("OffsetOption")
			b.append(node)
			b.end()

			b.token(r.consume())

			b.start("LimitOption")
			this.expression(b, r)
			b.end()
		} else {
			b.start("LimitOption")
			b.append(node)
			b.end()
		}
		return b.end()
	}

	private tableColumn(b: CstBuilder, r: TokenReader) {
		b.start("TableColumn")
		this.identifier(b, r, "ColumnName")
		if (r.peekIf(SqlTokenType.Identifier)) {
			this.columnType(b, r)
		}

		while (
			r.peekIf({
				type: [
					SqlKeyword.CONSTRAINT,
					SqlKeyword.PRIMARY,
					SqlKeyword.NOT,
					SqlKeyword.UNIQUE,
					SqlKeyword.CHECK,
					SqlKeyword.DEFAULT,
					SqlKeyword.COLLATE,
					SqlKeyword.REFERENCES,
				],
			}) ||
			(!this.compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS") &&
				r.peekIf({ type: [SqlKeyword.GENERATED, SqlKeyword.AS] }))
		) {
			this.columnConstraint(b, r)
		}
		return b.end()
	}

	private columnType(b: CstBuilder, r: TokenReader) {
		b.start("ColumnType")

		const node = b.start("TypeName")
		let text = b.token(r.consume()).text
		while (r.peekIf(SqlTokenType.Identifier)) {
			text += ` ${b.token(r.consume()).text}`
		}
		b.value(text)
		b.end()

		if (r.peekIf(SqlTokenType.LeftParen)) {
			b.token(r.consume())

			b.start("TypeOptionList")
			{
				b.start("LengthOption")
				this.numericLiteral(b, r)
				b.end()
			}

			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())

				b.start("ScaleOption")
				this.numericLiteral(b, r)
				b.end()
			}

			b.end()
			b.token(r.consume(SqlTokenType.RightParen))
		}
		return b.end()
	}

	private columnConstraint(b: CstBuilder, r: TokenReader) {
		b.start("ColumnConstraint")
		if (r.peekIf(SqlKeyword.CONSTRAINT)) {
			b.token(r.consume())
			this.identifier(b, r, "ConstraintName")
		}
		if (r.peekIf(SqlKeyword.PRIMARY)) {
			b.start("PrimaryKeyConstraint")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.KEY))

			if (r.peekIf(SqlKeyword.ASC)) {
				b.start("AscOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.DESC)) {
				b.start("DescOption")
				b.token(r.consume())
				b.end()
			}
			if (r.peekIf(SqlKeyword.ON)) {
				b.start("OnConflictClause")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.CONFLICT))
				this.conflictAction(b, r)
				b.end()
			}
			if (r.peekIf(SqlKeyword.AUTOINCREMENT)) {
				b.start("AutoincrementOption")
				b.token(r.consume())
				b.end()
			}
			b.end()
		} else if (r.peekIf(SqlKeyword.NOT)) {
			b.start("NotNullConstraint")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.NULL))

			if (r.peekIf(SqlKeyword.ON)) {
				b.start("OnConflictClause")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.CONFLICT))
				this.conflictAction(b, r)
				b.end()
			}

			b.end()
		} else if (r.peekIf(SqlKeyword.NULL)) {
			b.start("NullConstraint")
			b.token(r.consume())
			if (r.peekIf(SqlKeyword.ON)) {
				b.start("OnConflictClause")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.CONFLICT))
				this.conflictAction(b, r)
				b.end()
			}
			b.end()
		} else if (r.peekIf(SqlKeyword.UNIQUE)) {
			b.start("UniqueConstraint")
			b.token(r.consume())
			if (r.peekIf(SqlKeyword.ON)) {
				b.start("OnConflictClause")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.CONFLICT))
				this.conflictAction(b, r)
				b.end()
			}
			b.end()
		} else if (r.peekIf(SqlKeyword.CHECK)) {
			b.start("CheckConstraint")
			b.token(r.consume())
			b.token(r.consume(SqlTokenType.LeftParen))
			this.expression(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			b.end()
		} else if (r.peekIf(SqlKeyword.DEFAULT)) {
			b.start("DefaultOption")
			b.token(r.consume())
			if (r.peekIf(SqlTokenType.LeftParen)) {
				b.token(r.consume())
				this.expression(b, r)
				b.token(r.consume(SqlTokenType.RightParen))
			} else {
				this.expression(b, r)
			}
			b.end()
		} else if (r.peekIf(SqlKeyword.COLLATE)) {
			b.start("CollateOption")
			b.token(r.consume())
			this.identifier(b, r, "CollateName")
			b.end()
		} else if (r.peekIf(SqlKeyword.REFERENCES)) {
			b.start("ForeignKeyConstraint")
			this.referencesClause(b, r)
			b.end()
		} else if (r.peekIf(SqlKeyword.GENERATED) || r.peekIf(SqlKeyword.AS)) {
			b.start("GeneratedColumnOption")
			if (r.peekIf(SqlKeyword.GENERATED)) {
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.ALWAYS))
			}
			b.token(r.consume(SqlKeyword.AS))
			b.token(r.consume(SqlTokenType.LeftParen))

			{
				b.start("GeneratedColumn")
				this.expression(b, r)
				b.end()
			}

			b.token(r.consume(SqlTokenType.RightParen))

			if (r.peekIf(SqlKeyword.STORED)) {
				b.start("StoredOption")
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.VIRTUAL)) {
				b.start("virtual option")
				b.token(r.consume())
				b.end()
			}

			b.end()
		} else {
			throw r.createParseError()
		}
		return b.end()
	}

	private tableConstraint(b: CstBuilder, r: TokenReader) {
		b.start("TableConstraint")
		if (r.peekIf(SqlKeyword.CONSTRAINT)) {
			b.token(r.consume())
			this.identifier(b, r, "ConstraintName")
		}
		if (r.peekIf(SqlKeyword.PRIMARY)) {
			b.start("PrimaryKeyConstraint")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.KEY))
			b.token(r.consume(SqlTokenType.LeftParen))

			{
				b.start("SortColumnList")
				do {
					this.sortColumn(b, r)
					if (r.peekIf(SqlTokenType.Comma)) {
						b.token(r.consume())
					} else {
						break
					}
				} while (!r.peek().eos)
				b.end()	
			}

			b.token(r.consume(SqlTokenType.RightParen))

			if (r.peekIf(SqlKeyword.ON)) {
				b.start("OnConflictClause")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.CONFLICT))
				this.conflictAction(b, r)
				b.end()
			}

			b.end()
		} else if (r.peekIf(SqlKeyword.UNIQUE)) {
			b.start("UniqueConstraint")
			b.token(r.consume())

			b.token(r.consume(SqlTokenType.LeftParen))
			{
				b.start("SortColumnList")
				do {
					this.sortColumn(b, r)
					if (r.peekIf(SqlTokenType.Comma)) {
						b.token(r.consume())
					} else {
						break
					}
				} while (!r.peek().eos)
				b.end()	
			}
			b.token(r.consume(SqlTokenType.RightParen))

			if (r.peekIf(SqlKeyword.ON)) {
				b.start("OnConflictClause")
				b.token(r.consume())
				b.token(r.consume(SqlKeyword.CONFLICT))
				this.conflictAction(b, r)
				b.end()
			}

			b.end()
		} else if (r.peekIf(SqlKeyword.CHECK)) {
			b.start("CheckConstraint")
			b.token(r.consume())
			b.token(r.consume(SqlTokenType.LeftParen))
			this.expression(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			b.end()
		} else if (r.peekIf(SqlKeyword.FOREIGN)) {
			b.start("ForeignKeyConstraint")
			b.token(r.consume())
			b.token(r.consume(SqlKeyword.KEY))
			b.token(r.consume(SqlTokenType.LeftParen))
			this.columnList(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			this.referencesClause(b, r)
			b.end()
		} else {
			throw r.createParseError()
		}
		return b.end()
	}

	private referencesClause(b: CstBuilder, r: TokenReader) {
		b.start("ReferencesClause")
		b.token(r.consume())
		this.identifier(b, r, "ObjectName")
		if (r.peekIf(SqlTokenType.LeftParen)) {
			b.token(r.consume())
			this.columnList(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
		}

		while (
			!r.peek().eos &&
			r.peekIf({ type: [SqlKeyword.ON, SqlKeyword.MATCH] })
		) {
			if (r.peekIf(SqlKeyword.ON)) {
				const token = r.consume()
				if (r.peekIf(SqlKeyword.DELETE)) {
					b.start("OnDeleteClause")
					b.token(token)
					b.token(r.consume())
				} else {
					b.start("OnUpdateClause")
					b.token(token)
					b.token(r.consume(SqlKeyword.UPDATE))
				}
				if (r.peekIf(SqlKeyword.SET, SqlKeyword.NULL)) {
					b.start("SetNullOption")
					b.token(r.consume())
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.SET, SqlKeyword.DEFAULT)) {
					b.start("SetDefaultOption")
					b.token(r.consume())
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.CASCADE)) {
					b.start("CascadeOption")
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.RESTRICT)) {
					b.start("RestrictOption")
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.NO, SqlKeyword.ACTION)) {
					b.start("NoActionOption")
					b.token(r.consume())
					b.token(r.consume())
					b.end()
				} else {
					throw r.createParseError()
				}
				b.end()
			} else if (r.peekIf(SqlKeyword.MATCH)) {
				b.start("MatchClause")
				b.token(r.consume())
				if (r.peekIf(SqlKeyword.SIMPLE)) {
					b.start("SimpleOption")
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.FULL)) {
					b.start("FullOption")
					b.token(r.consume())
					b.end()
				} else if (r.peekIf(SqlKeyword.PARTIAL)) {
					b.start("PartialOption")
					b.token(r.consume())
					b.end()
				} else {
					throw r.createParseError()
				}
				b.end()
			} else {
				throw r.createParseError()
			}
		}

		if (
			r.peekIf(SqlKeyword.DEFERRABLE) ||
			r.peekIf(SqlKeyword.NOT, SqlKeyword.DEFERRABLE)
		) {
			if (r.peekIf(SqlKeyword.NOT)) {
				b.start("NotDeferrableOption")
				b.token(r.consume())
			} else {
				b.start("DeferrableOption")
			}
			b.token(r.consume())

			if (r.peekIf(SqlKeyword.INITIALLY, SqlKeyword.DEFERRED)) {
				b.start("InitiallyDeferredOption")
				b.token(r.consume())
				b.token(r.consume())
				b.end()
			} else if (r.peekIf(SqlKeyword.INITIALLY, SqlKeyword.IMMEDIATE)) {
				b.start("InitiallyImmediateOption")
				b.token(r.consume())
				b.token(r.consume())
				b.end()
			}
			b.end()
		}
		return b.end()
	}

	private conflictAction(b: CstBuilder, r: TokenReader) {
		if (r.peekIf(SqlKeyword.ROLLBACK)) {
			b.start("RollbackOption")
			b.token(r.consume())
			return b.end()
		} else if (r.peekIf(SqlKeyword.ABORT)) {
			b.start("AbortOption")
			b.token(r.consume())
			return b.end()
		} else if (r.peekIf(SqlKeyword.FAIL)) {
			b.start("FailOption")
			b.token(r.consume())
			return b.end()
		} else if (r.peekIf(SqlKeyword.IGNORE)) {
			b.start("IgnoreOption")
			b.token(r.consume())
			return b.end()
		} else if (r.peekIf(SqlKeyword.REPLACE)) {
			b.start("ReplaceOption")
			b.token(r.consume())
			return b.end()
		} else {
			throw r.createParseError()
		}
	}

	private pragmaValue(b: CstBuilder, r: TokenReader) {
		b.start("PragmaValue")
		if (r.peekIf({ type: SqlTokenType.Operator, text: "+" })) {
			b.start("Expression")
			{
				b.start("UnaryPlusOperation")
				b.token(r.consume())
				this.numericLiteral(b, r)
				b.end()	
			}
			b.end()
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "-" })) {
			b.start("Expression")
			{
				b.start("UnaryMinusOperation")
				b.token(r.consume())
				this.numericLiteral(b, r)
				b.end()	
			}
			b.end()
		} else if (r.peekIf(SqlTokenType.Numeric)) {
			this.numericLiteral(b, r)
		} else if (r.peekIf(SqlTokenType.String)) {
			this.stringLiteral(b, r)
		} else if (r.peekIf(SqlTokenType.Identifier)) {
			this.identifier(b, r, "PragmaLiteral")
		} else {
			throw r.createParseError()
		}
		return b.end()
	}

	private expressionList(b: CstBuilder, r: TokenReader) {
		b.start("ExpressionList")
		do {
			this.expression(b, r)
			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		return b.end()
	}

	private expression(b: CstBuilder, r: TokenReader, precedence = 0) {
		if (precedence === 0) {
			b.start("Expression")
		}
		let current
		if (r.peekIf(SqlKeyword.NOT)) {
			b.start("NotOperation")
			b.token(r.consume())
			this.expression(b, r, 3)
			current = b.end()
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "~" })) {
			b.start("BitwiseNotOperation")
			b.token(r.consume())
			this.expression(b, r, 16)
			current = b.end()
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "+" })) {
			b.start("UnaryPlusOperation")
			b.token(r.consume())
			this.expression(b, r, 16)
			current = b.end()
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "-" })) {
			b.start("UnaryMinusOperation")
			b.token(r.consume())
			this.expression(b, r, 16)
			current = b.end()
		} else {
			current = this.expressionValue(b, r)
		}

		while (!r.peek().eos) {
			if (precedence < 1 && r.peekIf(SqlKeyword.OR)) {
				b.start("OrOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 1)
				current = b.end()
			} else if (precedence < 2 && r.peekIf(SqlKeyword.AND)) {
				b.start("AndOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 2)
				current = b.end()
			} else if (
				precedence < 4 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ["=", "=="] })
			) {
				b.start("EqualOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 4)
				current = b.end()
			} else if (
				precedence < 4 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ["<>", "!="] })
			) {
				b.start("NotEqualOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 4)
				current = b.end()
			} else if (precedence < 4 && r.peekIf(SqlKeyword.IS)) {
				const token = r.consume();
				if (r.peekIf(SqlKeyword.NOT, SqlKeyword.DISTINCT)) {
					b.start("IsNotDistinctFromOperation")
					b.append(current)
					b.token(token)
					b.token(r.consume())
					b.token(r.consume())
					b.token(r.consume(SqlKeyword.FROM))
				} else if (r.peekIf(SqlKeyword.DISTINCT)) {
					b.start("IsDistinctFromOperation")
					b.append(current)
					b.token(token)
					b.token(r.consume())
					b.token(r.consume(SqlKeyword.FROM))
				} else if (r.peekIf(SqlKeyword.NOT)) {
					b.start("IsNotOperation")
					b.append(current)
					b.token(token)
					b.token(r.consume())
				} else {
					b.start("IsOperation")
					b.append(current)
					b.token(token)
				}
				this.expression(b, r, 4)
				current = b.end()
			} else if (
				precedence < 4 && (r.peekIf(SqlKeyword.BETWEEN)) || r.peekIf(SqlKeyword.NOT, SqlKeyword.BETWEEN)
			) {
				if (r.peekIf(SqlKeyword.NOT)) {
					b.start("NotBetweenOperation")
					b.append(current)
					b.token(r.consume())
				} else {
					b.start("BetweenOperation")
					b.append(current)
				}
				b.token(r.consume())
				this.expression(b, r, 4)
				b.token(r.consume(SqlKeyword.AND))
				this.expression(b, r, 4)
				current = b.end()
			} else if (
				precedence < 4 && (r.peekIf(SqlKeyword.IN) ||
				r.peekIf(SqlKeyword.NOT, SqlKeyword.IN))
			) {
				if (r.peekIf(SqlKeyword.NOT)) {
					b.start("NotInOperation")
					b.append(current)
					b.token(r.consume())
				} else {
					b.start("InOperation")
					b.append(current)
				}
				b.token(r.consume())
				if (
					r.peekIf(SqlTokenType.LeftParen, {
						type: [SqlKeyword.WITH, SqlKeyword.SELECT],
					})
				) {
					b.start("SubqueryExpression")
					b.token(r.consume())
					let withClause
					if (r.peekIf(SqlKeyword.WITH)) {
						withClause = this.withClause(b, r)
					}
					this.selectStatement(b, r, withClause)
					b.token(r.consume(SqlTokenType.RightParen))
					b.end()
				} else if (r.peekIf(SqlTokenType.LeftParen)) {
					b.token(r.consume())
					this.expressionList(b, r)
					b.token(r.consume(SqlTokenType.RightParen))
				} else if (r.peekIf(SqlTokenType.Identifier, SqlTokenType.LeftParen)) {
					b.start("FunctionExpression")

					{
						b.start("ObjectName")
						b.token(r.consume())
						b.end()
					}
					
					b.token(r.consume(SqlTokenType.LeftParen))
					{
						b.start("FunctionArgumentList")
						while (!r.peek().eos && !r.peekIf(SqlTokenType.RightParen)) {
							b.start("FunctionArgument")
							this.expression(b, r)
							b.end()
							if (r.peekIf(SqlTokenType.Comma)) {
								b.token(r.consume())
							} else {
								break
							}
						}
						b.end()	
					}
					b.token(r.consume(SqlTokenType.RightParen))
					
					b.end()
				} else if (
					r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })
				) {
					this.columnReference(b, r)
				} else {
					throw r.createParseError()
				}
				current = b.end()
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.MATCH) || r.peekIf(SqlKeyword.NOT, SqlKeyword.MATCH))
			) {
				if (r.peekIf(SqlKeyword.NOT)) {
					b.start("NotMatchOperation")
					b.append(current)
					b.token(r.consume())
				} else {
					b.start("MatchOperation")
					b.append(current)
				}
				b.token(r.consume())
				this.expression(b, r, 4)
				current = b.end()
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.LIKE) || r.peekIf(SqlKeyword.NOT, SqlKeyword.LIKE))
			) {
				if (r.peekIf(SqlKeyword.NOT)) {
					b.start("NotLikeOperation")
					b.append(current)
					b.token(r.consume())
				} else {
					b.start("LikeOperation")
					b.append(current)
				}
				b.token(r.consume())
				this.expression(b, r, 4)
				if (r.peekIf(SqlKeyword.ESCAPE)) {

					b.start("EscapeOption")

					this.expression(b, r, 6)
					b.end()
				}
				current = b.end()
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.REGEXP) || r.peekIf(SqlKeyword.NOT, SqlKeyword.REGEXP))
			) {
				if (r.peekIf(SqlKeyword.NOT)) {
					b.start("NotRegexpOperation")
					b.append(current)
					b.token(r.consume())
				} else {
					b.start("RegexpOperation")
					b.append(current)
				}
				b.token(r.consume())
				this.expression(b, r, 4)
				current = b.end()
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.GLOB) || r.peekIf(SqlKeyword.NOT, SqlKeyword.GLOB))
			) {
				if (r.peekIf(SqlKeyword.NOT)) {
					b.start("NotGlobOperation")
					b.append(current)
					b.token(r.consume())
				} else {
					b.start("GlobOperation")
					b.append(current)
					b.token(r.consume())
				}
				b.token(r.consume())
				this.expression(b, r, 4)
				current = b.end()
			} else if (precedence < 4 && r.peekIf(SqlKeyword.ISNULL)) {
				b.start("IsNullOperation")
				b.append(current)
				b.token(r.consume())
				current = b.end()
			} else if (precedence < 4 && r.peekIf(SqlKeyword.NOTNULL)) {
				b.start("IsNotNullOperation")
				b.append(current)
				b.token(r.consume())
				current = b.end()
			} else if (precedence < 4 && r.peekIf(SqlKeyword.NOT, SqlKeyword.NULL)) {
				b.start("IsNotNullOperation")
				b.append(current)
				b.token(r.consume())
				b.token(r.consume())
				current = b.end()
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "<" })
			) {
				b.start("LessThanOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 5)
				current = b.end()
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ">" })
			) {
				b.start("GreaterThanOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 5)
				current = b.end()
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "<=" })
			) {
				b.start("LessThanOrEqualOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 5)
				current = b.end()
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ">=" })
			) {
				b.start("GreaterThanOrEqualOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 5)
				current = b.end()
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "&" })
			) {
				b.start("BitwiseAndOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 7)
				current = b.end()
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "|" })
			) {
				b.start("BitwiseOrOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 7)
				current = b.end()
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "<<" })
			) {
				b.start("BitwiseLeftShiftOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 7)
				current = b.end()
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ">>" })
			) {
				b.start("BitwiseRightShiftOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 7)
				current = b.end()
			} else if (
				precedence < 8 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "+" })
			) {
				b.start("AddOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 8)
				current = b.end()
			} else if (
				precedence < 8 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "-" })
			) {
				b.start("SubtractOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 8)
				current = b.end()
			} else if (
				precedence < 9 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "*" })
			) {
				b.start("MultiplyOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 9)
				current = b.end()
			} else if (
				precedence < 9 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "/" })
			) {
				b.start("DivideOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 9)
				current = b.end()
			} else if (
				precedence < 9 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "%" })
			) {
				b.start("ModuloOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 9)
				current = b.end()
			} else if (
				precedence < 10 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "||" })
			) {
				b.start("ConcatenateOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 10)
				current = b.end()
			} else if (
				precedence < 10 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "->" })
			) {
				b.start("JsonExtractOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 10)
				current = b.end()
			} else if (
				precedence < 10 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "->>" })
			) {
				b.start("JsonExtractValueOperation")
				b.append(current)
				b.token(r.consume())
				this.expression(b, r, 10)
				current = b.end()
			} else if (precedence < 11 && r.peekIf(SqlKeyword.COLLATE)) {
				b.start("CollateOperation")
				b.append(current)
				b.token(r.consume())
				this.identifier(b, r, "CollationName")
				current = b.end()
			} else {
				break
			}
		}
		if (precedence === 0) {
			return b.end();
		}
		return current;
	}

	private expressionValue(b: CstBuilder, r: TokenReader) {
		if (r.peekIf(SqlKeyword.NULL)) {
			b.start("NullLiteral")
			b.token(r.consume())
			return b.end()
		} else if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
			return this.booleanLiteral(b, r)
		} else if (
			r.peekIf({
				type: [
					SqlKeyword.CURRENT_DATE,
					SqlKeyword.CURRENT_TIME,
					SqlKeyword.CURRENT_TIMESTAMP,
				],
			})
		) {
			b.start("FunctionExpression")
			{
				b.start("ObjectName")
				b.value(b.token(r.consume()).text.toUpperCase())
				b.end()	
			}
			return b.end()
		} else if (r.peekIf(SqlKeyword.CASE)) {
			b.start("CaseExpression")
			b.token(r.consume())
			if (!r.peekIf(SqlKeyword.WHEN)) {
				this.expression(b, r)
			}
			do {
				b.start("WhenClause")
				b.token(r.consume(SqlKeyword.WHEN))
				this.expression(b, r)
				{
					b.start("ThenClause")
					b.token(r.consume(SqlKeyword.THEN))
					this.expression(b, r)
					b.end()	
				}
				b.end()
			} while (r.peekIf(SqlKeyword.WHEN))
			if (r.peekIf(SqlKeyword.ELSE)) {
				b.start("ElseClause")
				b.token(r.consume())
				this.expression(b, r)
				b.end()
			}
			b.token(r.consume(SqlKeyword.END))
			return b.end()
		} else if (r.peekIf(SqlKeyword.CAST)) {
			b.start("FunctionExpression")
			{
				b.start("ObjectName")
				b.value(b.token(r.consume()).text.toUpperCase())
				b.end()	
			}
			b.token(r.consume(SqlTokenType.LeftParen))
			{

				b.start("FunctionArgumentList")
				{
					b.start("FunctionArgument")
					this.expression(b, r)
					b.end()	
				}	
				b.token(r.consume(SqlKeyword.AS))
				this.columnType(b, r)
				b.end()
			}
			b.token(r.consume(SqlTokenType.RightParen))
			return b.end()
		} else if (r.peekIf(SqlKeyword.RAISE)) {
			b.start("FunctionExpression")

			{
				b.start("ObjectName")
				b.value(b.token(r.consume()).text.toUpperCase())
				b.end()	
			}

			b.token(r.consume(SqlTokenType.LeftParen))
			{
				b.start("FunctionArgumentList")
				{
					b.start("FunctionArgument")
					this.conflictAction(b, r)
					b.end()
				}
				b.token(r.consume(SqlTokenType.Comma))
				{
					b.start("FunctionArgument")
					this.expression(b, r)
					b.end()	
				}
				b.end()
			}
			b.token(r.consume(SqlTokenType.RightParen))
			return b.end()
		} else if (r.peekIf(SqlKeyword.EXISTS)) {
			b.start("ExistsOperation")
			b.token(r.consume())
			b.token(r.consume(SqlTokenType.LeftParen))
			this.selectStatement(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			return b.end()
		} else if (r.peekIf(SqlTokenType.LeftParen, SqlKeyword.VALUES)) {
			b.start("SubqueryExpression")
			b.token(r.consume())
			{
				b.start("ValuesClause")
				b.token(r.consume(SqlKeyword.VALUES))
				b.token(r.consume(SqlTokenType.LeftParen))
				this.expressionList(b, r)
				b.token(r.consume(SqlTokenType.RightParen))
				b.end()	
			}
			b.token(r.consume(SqlTokenType.RightParen))
			return b.end()
		} else if (r.peekIf(SqlTokenType.LeftParen, SqlKeyword.SELECT)) {
			b.start("SubqueryExpression")
			b.token(r.consume())
			this.selectStatement(b, r)
			b.token(r.consume(SqlTokenType.RightParen))
			return b.end()
		} else if (r.peekIf(SqlTokenType.LeftParen)) {
			const node = b.start("ParenthesesOperation")
			b.token(r.consume())
			this.expression(b, r)
			if (r.peekIf(SqlTokenType.Comma)) {
				node.attribs.type = "ExpressionList"
				b.token(r.consume())
				do {
					this.expression(b, r)
					if (r.peekIf(SqlTokenType.Comma)) {
						b.token(r.consume())
					} else {
						break
					}
				} while (!r.peek().eos)
			}
			b.token(r.consume(SqlTokenType.RightParen))
			return b.end()
		} else if (r.peekIf(SqlTokenType.Identifier, SqlTokenType.LeftParen)) {
			b.start("FunctionExpression")
			{
				b.start("ObjectName")
				b.token(r.consume())
				b.end()	
			}
			b.token(r.consume(SqlTokenType.LeftParen))
			{
				b.start("FunctionArgumentList")
				if (r.peekIf({ type: SqlTokenType.Operator, text: "*" })) {
					b.start("FunctionArgument")
					{
						b.start("AllColumnsOption")
						b.token(r.consume())
						b.end()	
					}
					b.end()
				} else {
					if (r.peekIf(SqlKeyword.DISTINCT)) {
						b.start("DistinctOption")
						b.token(r.consume())
						b.end()
					}
					while (!r.peek().eos) {
						b.start("Argument")
						this.expression(b, r)
						b.end()
						if (r.peekIf(SqlTokenType.Comma)) {
							b.token(r.consume())
						} else {
							break
						}
					}
				}
				b.end()
			}
			b.token(r.consume(SqlTokenType.RightParen))
			if (r.peekIf(SqlKeyword.FILTER)) {
				b.start("FilterClause")
				b.token(r.consume())
				b.token(r.consume(SqlTokenType.LeftParen))
				this.whereClause(b, r)
				b.token(r.consume(SqlTokenType.RightParen))
				b.end()
			}
			if (
				!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
				r.peekIf(SqlKeyword.OVER)
			) {
				b.start("OverClause")
				b.token(r.consume())
				if (r.peekIf(SqlTokenType.LeftParen)) {
					b.token(r.consume())
					this.window(b, r)
					b.token(r.consume(SqlTokenType.RightParen))
				} else {
					this.identifier(b, r, "WindowName")
				}
				b.end()
			}
			return b.end()
		} else if (r.peekIf(SqlTokenType.Numeric)) {
			return this.numericLiteral(b, r)
		} else if (
			r.peekIf(SqlTokenType.String) ||
			r.peekIf({ type: SqlTokenType.Identifier, text: /^"/ })
		) {
			return this.stringLiteral(b, r)
		} else if (r.peekIf(SqlTokenType.Blob)) {
			return this.blobLiteral(b, r)
		} else if (
			r.peekIf(SqlTokenType.Identifier) ||
			r.peekIf(SqlTokenType.String, SqlTokenType.Dot)
		) {
			return this.columnReference(b, r)
		} else if (r.peekIf(SqlTokenType.BindVariable)) {
			const token = r.consume()
			if (token.text.startsWith("?")) {
				b.start("PositionalBindVariable")
				b.token(token)
				let value = token.text.substring(1)
				if (value) {
					r.state.bindPosition = Number.parseInt(value, 10)
				} else {
					const pos = r.state.bindPosition ? r.state.bindPosition + 1 : 1
					value = `${pos}`
					r.state.bindPosition = pos
				}
				b.value(value)
				return b.end()
			} else {
				b.start("NamedBindVariable")
				b.token(token)
				b.value(token.text.substring(1))
				return b.end()
			}
		} else {
			throw r.createParseError()
		}
	}

	private sortColumn(b: CstBuilder, r: TokenReader) {
		b.start("SortColumn")
		this.expression(b, r)
		if (r.peekIf(SqlKeyword.COLLATE)) {
			b.token(r.consume())
			this.identifier(b, r, "CollationName")
		}
		if (r.peekIf(SqlKeyword.ASC)) {
			b.start("AscOption")
			b.token(r.consume())
			b.end()
		} else if (r.peekIf(SqlKeyword.DESC)) {
			b.start("DescOption")
			b.token(r.consume())
			b.end()
		}
		return b.end()
	}

	private columnList(b: CstBuilder, r: TokenReader) {
		b.start("ColumnList")
		do {
			this.identifier(b, r, "ColumnName")
			if (r.peekIf(SqlTokenType.Comma)) {
				b.token(r.consume())
			} else {
				break
			}
		} while (!r.peek().eos)
		return b.end()
	}

	private columnReference(b: CstBuilder, r: TokenReader) {
		b.start("ColumnReference")
		const ident1 = this.identifier(b, r, "ColumnName")
		if (r.peekIf(SqlTokenType.Dot)) {
			b.token(r.consume())
			ident1.attribs.type = "ObjectName"
			const ident2 = this.identifier(b, r, "ColumnName")
			if (r.peekIf(SqlTokenType.Dot)) {
				b.token(r.consume())
				ident1.attribs.type = "SchemaName"
				ident2.attribs.type = "ObjectName"
				this.identifier(b, r, "ColumnName")
			}
		}
		return b.end()
	}

	private identifier(b: CstBuilder, r: TokenReader, name: string) {
		b.start(name)
		if (r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })) {
			b.value(dequote(b.token(r.consume()).text))
		} else {
			throw r.createParseError()
		}
		return b.end()
	}

	private numericLiteral(b: CstBuilder, r: TokenReader) {
		b.start("NumericLiteral")
		b.value(b.token(r.consume(SqlTokenType.Numeric)).text.toLowerCase())
		return b.end()
	}

	private stringLiteral(b: CstBuilder, r: TokenReader) {
		b.start("StringLiteral")
		if (r.peekIf({ type: SqlTokenType.Identifier, text: /^"/ })) {
			b.value(dequote(b.token(r.consume()).text)) //TODO
		} else {
			b.value(dequote(b.token(r.consume(SqlTokenType.String)).text))
		}
		return b.end()
	}

	private blobLiteral(b: CstBuilder, r: TokenReader) {
		b.start("BlobLiteral")
		const token = r.consume(SqlTokenType.Blob)
		b.token(token)
		b.value(token.text
			.substring(2, token.text.length - 1)
			.toUpperCase())
		return b.end()
	}

	private booleanLiteral(b: CstBuilder, r: TokenReader) {
		b.start("BooleanLiteral")
		if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
			b.value(b.token(r.consume()).text.toUpperCase())
		} else {
			throw r.createParseError()
		}
		return b.end()
	}
}
