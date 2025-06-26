import type { CstBuilder, CstNode, Lexer, ParserOptions } from "elder-parse";
import {
	AggregateParseError,
	ParseError,
	Parser,
	type TokenReader,
} from "elder-parse";
import { SqlLexer } from "./sql.ts";
import { dequote } from "./utils.ts";

export abstract class SqlParser extends Parser<SqlLexer> {
	compileOptions: Set<string>;

	constructor(lexer: Lexer, options: ParserOptions = {}) {
		super(lexer, options);
		this.compileOptions = new Set(options.compileOptions || []);
	}

	parseTokens(r: TokenReader, b: CstBuilder) {
		const errors = [];
		const root = b.start("Script");
		while (r.peek()) {
			try {
				if (r.peekIf([SqlLexer.SemiColon, SqlLexer.Delimiter, SqlLexer.EoF])) {
					b.token(r.consume());
				} else if (r.peekIf(SqlLexer.Command)) {
					this.command(b, r);
				} else if (r.peekIf(SqlLexer.EXPLAIN)) {
					this.explainStatement(b, r);
				} else {
					this.statement(b, r);
				}
			} catch (err) {
				if (err instanceof ParseError) {
					this.unknown(b, r, root);
					errors.push(err);
				} else {
					throw err;
				}
			}
		}
		b.end(root);
		if (errors.length) {
			throw new AggregateParseError(
				root,
				errors,
				`${errors.length} error found\n${errors.map((e) => e.message).join("\n")}`,
			);
		}
	}

	private unknown(b: CstBuilder, r: TokenReader, base: CstNode) {
		b.current = base;
		let node: ReturnType<typeof b.end> | undefined;
		if (r.peek() && !r.peekIf(SqlLexer.EoS)) {
			b.start("Unknown");
			while (r.peek() && !r.peekIf(SqlLexer.EoS)) {
				b.token(r.consume());
			}
			node = b.end();
		}
		b.current = b.root;
		return node;
	}

	private command(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CommandStatement");
		try {
			b.start("CommandName");
			b.attr("value", b.token(r.consume(SqlLexer.Command)).text);
			b.end();
			if (r.peek() && !r.peekIf(SqlLexer.EoS)) {
				b.start("CommandArgumentList");
				do {
					b.start("CommandArgument");
					b.attr("value", b.token(r.consume()).text);
					b.end();
				} while (r.peek() && !r.peekIf(SqlLexer.EoS));
				b.end();
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private explainStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ExplainStatement");
		try {
			b.token(r.consume(SqlLexer.EXPLAIN));
			if (r.peekIf(SqlLexer.QUERY)) {
				b.start("QueryPlanOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.PLAN));
				b.end();
			}
			this.statement(b, r);
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private statement(b: CstBuilder, r: TokenReader) {
		let stmt: CstNode | undefined;
		if (r.peekIf(SqlLexer.CREATE)) {
			const mark = r.pos;
			r.consume();
			while (
				r.peek() &&
				!r.peekIf([
					SqlLexer.EoS,
					SqlLexer.TABLE,
					SqlLexer.VIEW,
					SqlLexer.TRIGGER,
					SqlLexer.INDEX,
				])
			) {
				r.consume();
			}

			if (r.peekIf(SqlLexer.TABLE)) {
				r.pos = mark;
				stmt = this.createTableStatement(b, r);
			} else if (r.peekIf(SqlLexer.VIEW)) {
				r.pos = mark;
				stmt = this.createViewStatement(b, r);
			} else if (r.peekIf(SqlLexer.TRIGGER)) {
				r.pos = mark;
				stmt = this.createTriggerStatement(b, r);
			} else if (r.peekIf(SqlLexer.INDEX)) {
				r.pos = mark;
				stmt = this.createIndexStatement(b, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(SqlLexer.ALTER)) {
			const mark = r.pos;
			r.consume();

			if (r.peekIf(SqlLexer.TABLE)) {
				r.pos = mark;
				stmt = this.alterTableStatement(b, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(SqlLexer.DROP)) {
			const mark = r.pos;
			r.consume();

			if (r.peekIf(SqlLexer.TABLE)) {
				r.pos = mark;
				stmt = this.dropTableStatement(b, r);
			} else if (r.peekIf(SqlLexer.VIEW)) {
				r.pos = mark;
				stmt = this.dropViewStatement(b, r);
			} else if (r.peekIf(SqlLexer.TRIGGER)) {
				r.pos = mark;
				stmt = this.dropTriggerStatement(b, r);
			} else if (r.peekIf(SqlLexer.INDEX)) {
				r.pos = mark;
				stmt = this.dropIndexStatement(b, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(SqlLexer.ATTACH)) {
			stmt = this.attachDatabaseStatement(b, r);
		} else if (r.peekIf(SqlLexer.DETACH)) {
			stmt = this.detachDatabaseStatement(b, r);
		} else if (r.peekIf(SqlLexer.ANALYZE)) {
			stmt = this.analyzeStatement(b, r);
		} else if (r.peekIf(SqlLexer.REINDEX)) {
			stmt = this.reindexStatement(b, r);
		} else if (r.peekIf(SqlLexer.VACUUM)) {
			stmt = this.vacuumStatement(b, r);
		} else if (r.peekIf(SqlLexer.PRAGMA)) {
			stmt = this.pragmaStatement(b, r);
		} else if (r.peekIf(SqlLexer.BEGIN)) {
			stmt = this.beginTransactionStatement(b, r);
		} else if (r.peekIf(SqlLexer.SAVEPOINT)) {
			stmt = this.savepointStatement(b, r);
		} else if (r.peekIf(SqlLexer.RELEASE)) {
			stmt = this.releaseSavepointStatement(b, r);
		} else if (r.peekIf([SqlLexer.COMMIT, SqlLexer.END])) {
			stmt = this.commitTransactionStatement(b, r);
		} else if (r.peekIf(SqlLexer.ROLLBACK)) {
			stmt = this.rollbackTransactionStatement(b, r);
		} else {
			let withClause: ReturnType<typeof this.withClause> | undefined;
			if (r.peekIf(SqlLexer.WITH)) {
				withClause = this.withClause(b, r);
			}
			if (r.peekIf([SqlLexer.INSERT, SqlLexer.REPLACE])) {
				stmt = this.insertStatement(b, r, withClause);
			} else if (r.peekIf(SqlLexer.UPDATE)) {
				stmt = this.updateStatement(b, r, withClause);
			} else if (r.peekIf(SqlLexer.DELETE)) {
				stmt = this.deleteStatement(b, r, withClause);
			} else if (r.peekIf([SqlLexer.SELECT, SqlLexer.VALUES])) {
				stmt = this.selectStatement(b, r, withClause);
			}
		}

		if (!stmt) {
			throw r.createParseError();
		}
		return stmt;
	}

	private createTableStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateTableStatement");
		try {
			b.token(r.consume(SqlLexer.CREATE));
			let virtual = false;
			if (r.peekIf([SqlLexer.TEMPORARY, SqlLexer.TEMP])) {
				b.start("TemporaryOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.VIRTUAL)) {
				b.start("VirtualOption");
				b.token(r.consume());
				b.end();
				virtual = true;
			}
			b.token(r.consume(SqlLexer.TABLE));
			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfNotExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.NOT));
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
			if (virtual) {
				b.start("UsingModuleClause");
				b.token(r.consume(SqlLexer.USING));
				this.identifier(b, r, "ModuleName");
				if (r.peekIf(SqlLexer.LeftParen)) {
					b.token(r.consume());
					b.start("ModuleArgumentList");
					do {
						b.start("ModuleArgument");
						do {
							b.token(r.consume());
						} while (
							r.peek() &&
							!r.peekIf([SqlLexer.EoS, SqlLexer.RightParen, SqlLexer.Comma])
						);
						b.end();

						if (r.peekIf(SqlLexer.Comma)) {
							b.token(r.consume());
						} else {
							break;
						}
					} while (r.peek() && !r.peekIf(SqlLexer.EoS));
					b.end();
					b.token(r.consume(SqlLexer.RightParen));
				}
				b.end();
			} else if (r.peekIf(SqlLexer.LeftParen)) {
				b.token(r.consume());
				{
					b.start("TableColumnList");
					let hasTableConstraint = false;
					do {
						if (!hasTableConstraint) {
							if (
								r.peekIf([
									SqlLexer.CONSTRAINT,
									SqlLexer.UNIQUE,
									SqlLexer.CHECK,
									SqlLexer.FOREIGN,
								]) ||
								r.peekIf(SqlLexer.PRIMARY, SqlLexer.KEY)
							) {
								hasTableConstraint = true;
							} else {
								this.tableColumn(b, r);
							}
						}
						if (hasTableConstraint) {
							this.tableConstraint(b, r);
						}
						if (r.peekIf(SqlLexer.Comma)) {
							b.token(r.consume());
						} else {
							break;
						}
					} while (r.peek() && !r.peekIf(SqlLexer.EoS));
					b.end();
				}
				b.token(r.consume(SqlLexer.RightParen));

				while (r.peekIf([SqlLexer.WITHOUT, SqlLexer.STRICT])) {
					if (r.peekIf(SqlLexer.WITHOUT)) {
						b.start("WithoutRowidOption");
						b.token(r.consume());
						b.token(r.consume(SqlLexer.ROWID));
						b.end();
					} else if (r.peekIf(SqlLexer.STRICT)) {
						b.start("StrictOption");
						b.token(r.consume());
						b.end();
					}
					if (r.peekIf(SqlLexer.Comma)) {
						b.token(r.consume());
					} else {
						break;
					}
				}
			} else if (r.peekIf(SqlLexer.AS)) {
				b.token(r.consume());
				this.selectStatement(b, r);
			} else {
				throw r.createParseError();
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private createViewStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateViewStatement");
		try {
			b.token(r.consume(SqlLexer.CREATE));
			if (r.peekIf([SqlLexer.TEMPORARY, SqlLexer.TEMP])) {
				b.start("TemporaryOption");
				b.token(r.consume());
				b.end();
			}
			b.token(r.consume(SqlLexer.VIEW));
			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfNotExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.NOT));
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
			if (r.peekIf(SqlLexer.LeftParen)) {
				b.token(r.consume());
				this.columnList(b, r);
				b.token(r.consume(SqlLexer.RightParen));
			}
			b.token(r.consume(SqlLexer.AS));
			this.selectStatement(b, r);
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private createTriggerStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateTriggerStatement");
		try {
			b.token(r.consume(SqlLexer.CREATE));
			if (r.peekIf(SqlLexer.TEMPORARY) || r.peekIf(SqlLexer.TEMP)) {
				b.start("TemporaryOption");
				b.token(r.consume());
				b.end();
			}
			b.token(r.consume(SqlLexer.TRIGGER));
			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfNotExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.NOT));
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
			let option: ReturnType<typeof b.end> | undefined;
			if (r.peekIf(SqlLexer.BEFORE)) {
				b.start("BeforeOption");
				b.token(r.consume());
				option = b.end();
			} else if (r.peekIf(SqlLexer.AFTER)) {
				option = b.start("AfterOption");
				b.token(r.consume());
				option = b.end();
			} else if (r.peekIf(SqlLexer.INSTEAD)) {
				option = b.start("InsteadOfOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.OF));
				option = b.end();
			}
			if (r.peekIf(SqlLexer.INSERT)) {
				b.start("InsertOnClause");
				if (option) {
					b.append(option);
				}
				b.token(r.consume());
				b.token(r.consume(SqlLexer.ON));
				const ident = this.identifier(b, r, "ObjectName");
				if (r.peekIf(SqlLexer.Dot)) {
					b.attr("type", "SchemaName", ident);
					b.token(r.consume());
					this.identifier(b, r, "ObjectName");
				}
				b.end();
			} else if (r.peekIf(SqlLexer.UPDATE)) {
				b.start("UpdateOnClause");
				if (option) {
					b.append(option);
				}
				b.token(r.consume());
				if (r.peekIf(SqlLexer.OF)) {
					b.start("ColumnList");
					b.token(r.consume());
					do {
						this.identifier(b, r, "ColumnName");
						if (r.peekIf(SqlLexer.Comma)) {
							b.token(r.consume());
						} else {
							break;
						}
					} while (r.peek() && !r.peekIf(SqlLexer.EoS));
					b.end();
				}
				b.token(r.consume(SqlLexer.ON));
				const ident = this.identifier(b, r, "ObjectName");
				if (r.peekIf(SqlLexer.Dot)) {
					b.attr("type", "SchemaName", ident);
					b.token(r.consume());
					this.identifier(b, r, "ObjectName");
				}
				b.end();
			} else if (r.peekIf(SqlLexer.DELETE)) {
				b.start("DeleteOnClause");
				if (option) {
					b.append(option);
				}
				b.token(r.consume());
				b.token(r.consume(SqlLexer.ON));
				const ident = this.identifier(b, r, "ObjectName");
				if (r.peekIf(SqlLexer.Dot)) {
					b.attr("type", "SchemaName", ident);
					b.token(r.consume());
					this.identifier(b, r, "ObjectName");
				}
				b.end();
			} else {
				throw r.createParseError();
			}
			if (r.peekIf(SqlLexer.FOR)) {
				b.start("ForEachRowOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.EACH));
				b.token(r.consume(SqlLexer.ROW));
				b.end();
			}
			if (r.peekIf(SqlLexer.WHEN)) {
				b.start("WhenClause");
				b.token(r.consume());
				this.expression(b, r);
				b.end();
			}
			b.start("BeginStatement");
			b.token(r.consume(SqlLexer.BEGIN));
			{
				b.start("BeginBlock");
				let withClause: ReturnType<typeof this.withClause> | undefined;
				if (r.peekIf(SqlLexer.WITH)) {
					withClause = this.withClause(b, r);
				}
				if (r.peekIf([SqlLexer.INSERT, SqlLexer.REPLACE])) {
					this.insertStatement(b, r, withClause);
				} else if (r.peekIf(SqlLexer.UPDATE)) {
					this.updateStatement(b, r, withClause);
				} else if (r.peekIf(SqlLexer.DELETE)) {
					this.deleteStatement(b, r, withClause);
				} else if (r.peekIf(SqlLexer.SELECT)) {
					this.selectStatement(b, r, withClause);
				} else {
					throw r.createParseError();
				}
				b.token(r.consume(SqlLexer.SemiColon));
				b.end();
			}
			b.token(r.consume(SqlLexer.END));
			b.end();
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private createIndexStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CreateIndexStatement");
		try {
			b.token(r.consume(SqlLexer.CREATE));
			if (r.peekIf(SqlLexer.UNIQUE)) {
				b.start("UniqueOption");
				b.token(r.consume());
				b.end();
			}
			b.token(r.consume(SqlLexer.INDEX));
			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfNotExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.NOT));
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
			b.start("IndexOnClause");
			b.token(r.consume(SqlLexer.ON));
			this.identifier(b, r, "ObjectName");
			b.token(r.consume(SqlLexer.LeftParen));
			b.start("SortColumnList");
			do {
				this.sortColumn(b, r);
				if (r.peekIf(SqlLexer.Comma)) {
					b.token(r.consume());
				} else {
					break;
				}
			} while (r.peek() && !r.peekIf(SqlLexer.EoS));
			b.end();
			b.token(r.consume(SqlLexer.RightParen));
			b.end();
			if (r.peekIf(SqlLexer.WHERE)) {
				this.whereClause(b, r);
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private alterTableStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("AlterTableStatement");
		try {
			b.token(r.consume(SqlLexer.ALTER));
			b.token(r.consume(SqlLexer.TABLE));
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
			if (r.peekIf(SqlLexer.RENAME, SqlLexer.TO)) {
				b.start("RenameToObjectClause");
				b.token(r.consume());
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
				b.end();
			} else if (r.peekIf(SqlLexer.RENAME)) {
				b.start("RenameColumnClause");
				b.token(r.consume());
				if (r.peekIf(SqlLexer.COLUMN)) {
					b.token(r.consume());
				}
				this.identifier(b, r, "ColumnName");
				b.start("RenameToColumnClause");
				b.token(r.consume(SqlLexer.TO));
				this.identifier(b, r, "ColumnName");
				b.end();
				b.end();
			} else if (r.peekIf(SqlLexer.ADD)) {
				b.start("AddColumnClause");
				b.token(r.consume());
				if (r.peekIf(SqlLexer.COLUMN)) {
					b.token(r.consume());
				}
				this.tableColumn(b, r);
				b.end();
			} else if (r.peekIf(SqlLexer.DROP)) {
				b.start("DropColumnClause");
				b.token(r.consume());
				if (r.peekIf(SqlLexer.COLUMN)) {
					b.token(r.consume());
				}
				this.identifier(b, r, "ColumnName");
				b.end();
			} else {
				throw r.createParseError();
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private dropTableStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropTableStatement");
		try {
			b.token(r.consume(SqlLexer.DROP));
			b.token(r.consume(SqlLexer.TABLE));
			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private dropViewStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropViewStatement");
		try {
			b.token(r.consume(SqlLexer.DROP));
			b.token(r.consume(SqlLexer.VIEW));

			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}

			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private dropTriggerStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropTriggerStatement");
		try {
			b.token(r.consume(SqlLexer.DROP));
			b.token(r.consume(SqlLexer.TRIGGER));

			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfExistsOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}

			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private dropIndexStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DropIndexStatement");
		try {
			b.token(r.consume(SqlLexer.DROP));
			b.token(r.consume(SqlLexer.INDEX));

			if (r.peekIf(SqlLexer.IF)) {
				b.start("IfExists");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.EXISTS));
				b.end();
			}

			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private attachDatabaseStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("AttachDatabaseStatement");
		try {
			b.token(r.consume(SqlLexer.ATTACH));
			if (r.peekIf(SqlLexer.DATABASE)) {
				b.token(r.consume());
			}
			b.start("Database");
			this.expression(b, r);
			b.end();
			b.token(r.consume(SqlLexer.AS));
			this.identifier(b, r, "SchemaName");
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private detachDatabaseStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("DetachDatabaseStatement");
		try {
			b.token(r.consume(SqlLexer.DETACH));
			if (r.peekIf(SqlLexer.DATABASE)) {
				b.token(r.consume());
			}

			this.identifier(b, r, "SchemaName");
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private analyzeStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("AnalyzeStatement");
		try {
			b.token(r.consume(SqlLexer.ANALYZE));

			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private reindexStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ReindexStatement");
		try {
			b.token(r.consume(SqlLexer.REINDEX));
			if (r.peekIf([SqlLexer.Identifier, SqlLexer.String])) {
				const ident = this.identifier(b, r, "ObjectName");
				if (r.peekIf(SqlLexer.Dot)) {
					b.attr("type", "SchemaName", ident);
					b.token(r.consume());
					this.identifier(b, r, "ObjectName");
				}
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private vacuumStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("VacuumStatement");
		try {
			b.token(r.consume(SqlLexer.VACUUM));

			if (r.peekIf([SqlLexer.Identifier, SqlLexer.String])) {
				this.identifier(b, r, "SchemaName");
			}

			if (r.peekIf(SqlLexer.INTO)) {
				b.token(r.consume());
				b.start("FileName");
				this.stringLiteral(b, r);
				b.end();
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private pragmaStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("PragmaStatement");
		try {
			b.token(r.consume(SqlLexer.PRAGMA));

			const ident = this.identifier(b, r, "PragmaName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "PragmaName");
			}

			if (r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("="))) {
				b.token(r.consume());
				this.pragmaValue(b, r);
			} else if (r.peekIf(SqlLexer.LeftParen)) {
				b.token(r.consume());
				b.start("PragmaArgumentList");
				b.start("PragmaArgument");
				this.pragmaValue(b, r);
				b.end();
				b.end();
				b.token(r.consume(SqlLexer.RightParen));
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private beginTransactionStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("BeginTransactionStatement");
		try {
			b.token(r.consume(SqlLexer.BEGIN));
			if (r.peekIf(SqlLexer.DEFERRED)) {
				b.start("DeferredOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.IMMEDIATE)) {
				b.start("ImmediateOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.EXCLUSIVE)) {
				b.start("ExclusiveOption");
				b.token(r.consume());
				b.end();
			}
			if (r.peekIf(SqlLexer.TRANSACTION)) {
				b.token(r.consume());
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private savepointStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("SavepointStatement");
		try {
			b.token(r.consume(SqlLexer.SAVEPOINT));
			this.identifier(b, r, "SavepointName");
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private releaseSavepointStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("ReleaseSavepointStatement");
		try {
			b.token(r.consume(SqlLexer.RELEASE));
			if (r.peekIf(SqlLexer.SAVEPOINT)) {
				b.token(r.consume());
			}
			this.identifier(b, r, "SavepointName");
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private commitTransactionStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("CommitTransactionStatement");
		try {
			if (r.peekIf(SqlLexer.END)) {
				b.token(r.consume());
			} else {
				b.token(r.consume(SqlLexer.COMMIT));
			}
			if (r.peekIf(SqlLexer.TRANSACTION)) {
				b.token(r.consume());
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private rollbackTransactionStatement(b: CstBuilder, r: TokenReader) {
		const stmt = b.start("RollbackTransactionStatement");
		try {
			b.token(r.consume(SqlLexer.ROLLBACK));
			if (r.peekIf(SqlLexer.TRANSACTION)) {
				b.token(r.consume());
			}
			if (r.peekIf(SqlLexer.TO)) {
				b.token(r.consume());
				if (r.peekIf(SqlLexer.SAVEPOINT)) {
					b.token(r.consume());
				}
				this.identifier(b, r, "SavepointName");
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private insertStatement(b: CstBuilder, r: TokenReader, withClause?: CstNode) {
		const stmt = b.start("InsertStatement");
		try {
			if (withClause) {
				b.append(withClause);
			}
			this.insertClause(b, r);
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private updateStatement(b: CstBuilder, r: TokenReader, withClause?: CstNode) {
		const stmt = b.start("UpdateStatement");
		try {
			if (withClause) {
				b.append(withClause);
			}
			this.updateClause(b, r);
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private deleteStatement(b: CstBuilder, r: TokenReader, withClause?: CstNode) {
		const stmt = b.start("DeleteStatement");
		try {
			if (withClause) {
				b.append(withClause);
			}
			this.deleteClause(b, r);
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private selectStatement(b: CstBuilder, r: TokenReader, withClause?: CstNode) {
		const stmt = b.start("SelectStatement");
		try {
			if (withClause) {
				b.append(withClause);
			}
			let current = this.selectClause(b, r);
			while (
				!this.compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT") &&
				r.peek() &&
				!r.peekIf(SqlLexer.EoS)
			) {
				if (r.peekIf(SqlLexer.UNION)) {
					b.start("UnionOperation");
					b.append(current);
					b.token(r.consume());
					if (r.peekIf(SqlLexer.ALL)) {
						b.start("AllOption");
						b.token(r.consume());
						b.end();
					}
					this.selectClause(b, r);
					current = b.end();
				} else if (r.peekIf(SqlLexer.INTERSECT)) {
					b.start("IntersectOperation");
					b.append(current);
					b.token(r.consume());
					this.selectClause(b, r);
					current = b.end();
				} else if (r.peekIf(SqlLexer.EXCEPT)) {
					b.start("ExceptOperation");
					b.append(current);
					b.token(r.consume());
					this.selectClause(b, r);
					current = b.end();
				} else {
					break;
				}
			}

			if (r.peekIf(SqlLexer.ORDER)) {
				this.orderByClause(b, r);
			}
			if (r.peekIf(SqlLexer.LIMIT)) {
				this.limitClause(b, r);
			}
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(b, r, stmt);
			}
			throw err;
		}
		return b.end(stmt);
	}

	private insertClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("InsertClause");
		if (r.peekIf(SqlLexer.REPLACE)) {
			b.start("ReplaceOption");
			b.token(r.consume());
			b.end();
		} else {
			b.token(r.consume(SqlLexer.INSERT));
			if (r.peekIf(SqlLexer.OR)) {
				b.start("OrConflictClause");
				b.token(r.consume());
				this.conflictAction(b, r);
				b.end();
			}
		}
		b.token(r.consume(SqlLexer.INTO));

		const ident = this.identifier(b, r, "ObjectName");
		if (r.peekIf(SqlLexer.Dot)) {
			b.attr("type", "SchemaName", ident);
			b.token(r.consume());
			this.identifier(b, r, "ObjectName");
		}

		if (r.peekIf(SqlLexer.AS)) {
			b.token(r.consume());
			this.identifier(b, r, "ObjectAlias");
		}

		if (r.peekIf(SqlLexer.LeftParen)) {
			b.token(r.consume());
			this.columnList(b, r);
			b.token(r.consume(SqlLexer.RightParen));
		}

		if (r.peekIf(SqlLexer.DEFAULT)) {
			b.start("DefaultValuesOption");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.VALUES));
			b.end();
		} else {
			if (r.peekIf(SqlLexer.VALUES)) {
				b.start("ValuesClause");
				b.token(r.consume());
				b.start("ExpressionListGroup");
				do {
					b.token(r.consume(SqlLexer.LeftParen));
					this.expressionList(b, r);
					b.token(r.consume(SqlLexer.RightParen));

					if (r.peekIf(SqlLexer.Comma)) {
						b.token(r.consume());
					} else {
						break;
					}
				} while (r.peek() && !r.peekIf(SqlLexer.EoS));
				b.end();

				b.end();
			} else {
				let withClause: ReturnType<typeof this.withClause> | undefined;
				if (r.peekIf(SqlLexer.WITH)) {
					withClause = this.withClause(b, r);
				}
				this.selectStatement(b, r, withClause);
			}

			do {
				if (r.peekIf(SqlLexer.ON)) {
					this.onConflictClause(b, r);
				} else {
					break;
				}
			} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		}

		if (r.peekIf(SqlLexer.RETURNING)) {
			this.returningClause(b, r);
		}

		return b.end(start);
	}

	private onConflictClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("OnConflictClause");
		b.token(r.consume(SqlLexer.ON));
		b.token(r.consume(SqlLexer.CONFLICT));

		if (r.peekIf(SqlLexer.LeftParen)) {
			b.token(r.consume());

			b.start("SortColumnList");
			do {
				this.sortColumn(b, r);
				if (r.peekIf(SqlLexer.Comma)) {
					b.token(r.consume());
				} else {
					break;
				}
			} while (r.peek() && !r.peekIf(SqlLexer.EoS));
			b.end();

			b.token(r.consume(SqlLexer.RightParen));
			if (r.peekIf(SqlLexer.WHERE)) {
				this.whereClause(b, r);
			}
		}
		b.token(r.consume(SqlLexer.DO));
		if (r.peekIf(SqlLexer.NOTHING)) {
			b.start("DoNothingOption");
			b.token(r.consume());
			b.end();
		} else if (r.peekIf(SqlLexer.UPDATE)) {
			b.start("DoUpdateOption");
			b.token(r.consume());
			this.setClause(b, r);
			if (r.peekIf(SqlLexer.WHERE)) {
				this.whereClause(b, r);
			}
			b.end();
		} else {
			throw r.createParseError();
		}
		return b.end(start);
	}

	private updateClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("UpdateClause");
		b.token(r.consume(SqlLexer.UPDATE));

		const ident = this.identifier(b, r, "ObjectName");
		if (r.peekIf(SqlLexer.Dot)) {
			b.attr("type", "SchemaName", ident);
			b.token(r.consume());
			this.identifier(b, r, "ObjectName");
		}

		if (r.peekIf(SqlLexer.AS)) {
			b.token(r.consume());
			this.identifier(b, r, "ObjectAlias");
		}

		if (r.peekIf(SqlLexer.INDEXED)) {
			b.start("IndexedByOption");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.BY));
			this.identifier(b, r, "ObjectName");
			b.end();
		} else if (r.peekIf(SqlLexer.NOT)) {
			b.start("NotIndexedOption");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.INDEXED));
			b.end();
		}

		this.setClause(b, r);
		if (r.peekIf(SqlLexer.FROM)) {
			this.fromClause(b, r);
		}
		if (r.peekIf(SqlLexer.WHERE)) {
			this.whereClause(b, r);
		}
		if (r.peekIf(SqlLexer.RETURNING)) {
			this.returningClause(b, r);
		}
		if (r.peekIf(SqlLexer.ORDER)) {
			this.orderByClause(b, r);
		}
		if (r.peekIf(SqlLexer.LIMIT)) {
			this.limitClause(b, r);
		}

		return b.end(start);
	}

	private setClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("SetClause");
		b.token(r.consume(SqlLexer.SET));
		b.start("UpdateColumnList");
		do {
			b.start("UpdateColumn");

			if (r.peekIf(SqlLexer.LeftParen)) {
				b.token(r.consume());
				this.columnList(b, r);
				b.token(r.consume(SqlLexer.RightParen));
			} else {
				this.identifier(b, r, "ColumnName");
			}
			b.token(
				r.consume((token) => token.is(SqlLexer.Operator) && token.is("=")),
			);
			b.start("ColumnValue");
			this.expression(b, r);
			b.end();

			b.end();

			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		b.end();

		return b.end(start);
	}

	private deleteClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("DeleteClause");
		b.token(r.consume(SqlLexer.DELETE));
		b.token(r.consume(SqlLexer.FROM));
		const ident = this.identifier(b, r, "ObjectName");
		if (r.peekIf(SqlLexer.Dot)) {
			b.attr("type", "SchemaName", ident);
			b.token(r.consume());
			this.identifier(b, r, "ObjectName");
		}
		if (r.peekIf(SqlLexer.WHERE)) {
			this.whereClause(b, r);
		}
		if (r.peekIf(SqlLexer.RETURNING)) {
			this.returningClause(b, r);
		}
		return b.end(start);
	}

	private selectClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("SelectClause");

		if (r.peekIf(SqlLexer.VALUES)) {
			b.start("ValuesClause");
			b.token(r.consume(SqlLexer.VALUES));
			b.token(r.consume(SqlLexer.LeftParen));
			this.expressionList(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			b.end();
		} else {
			b.token(r.consume(SqlLexer.SELECT));
			if (r.peekIf(SqlLexer.DISTINCT)) {
				b.start("DistinctOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.ALL)) {
				b.start("AllOption");
				b.token(r.consume());
				b.end();
			}
			this.selectColumnList(b, r);

			if (r.peekIf(SqlLexer.FROM)) {
				this.fromClause(b, r);
			}
			if (r.peekIf(SqlLexer.WHERE)) {
				this.whereClause(b, r);
			}
			if (r.peekIf(SqlLexer.GROUP)) {
				this.gropuByClause(b, r);
			}
			if (r.peekIf(SqlLexer.HAVING)) {
				this.havingClause(b, r);
			}
			if (
				!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
				r.peekIf(SqlLexer.WINDOW)
			) {
				this.windowClause(b, r);
			}
		}
		return b.end(start);
	}

	private withClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("WithClause");
		b.token(r.consume(SqlLexer.WITH));

		if (r.peekIf(SqlLexer.RECURSIVE)) {
			b.start("RecursiveOption");
			b.token(r.consume());
			b.end();
		}

		b.start("CommonTableList");
		do {
			b.start("CommonTable");
			this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.LeftParen)) {
				b.token(r.consume());
				this.columnList(b, r);
				b.token(r.consume(SqlLexer.RightParen));
			}
			b.token(r.consume(SqlLexer.AS));

			if (r.peekIf(SqlLexer.MATERIALIZED)) {
				b.start("MaterializedOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.NOT, SqlLexer.MATERIALIZED)) {
				b.start("NotMaterializedOption");
				b.token(r.consume());
				b.token(r.consume());
				b.end();
			}

			b.token(r.consume(SqlLexer.LeftParen));
			this.selectStatement(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			b.end();

			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		b.end();

		return b.end(start);
	}

	private selectColumnList(b: CstBuilder, r: TokenReader) {
		const start = b.start("SelectColumnList");

		do {
			b.start("SelectColumn");
			if (r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("*"))) {
				b.start("AllColumnsOption");
				b.token(r.consume());
				b.end();
			} else if (
				r.peekIf(
					[SqlLexer.Identifier, SqlLexer.String],
					SqlLexer.Dot,
					(token) => token.is(SqlLexer.Operator) && token.is("*"),
				)
			) {
				b.start("AllColumnsOption");
				this.identifier(b, r, "SchemaName");
				b.token(r.consume());
				b.token(r.consume());
				b.end();
			} else {
				this.expression(b, r);
				if (r.peekIf(SqlLexer.AS)) {
					b.token(r.consume());
					this.identifier(b, r, "ColumnAlias");
				} else if (r.peekIf([SqlLexer.Identifier, SqlLexer.String])) {
					this.identifier(b, r, "ColumnAlias");
				}
			}
			b.end();
			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));

		return b.end(start);
	}

	private fromClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("FromClause");
		b.token(r.consume(SqlLexer.FROM));
		{
			b.start("FromObjectList");

			let hasJoinClause = false;
			do {
				this.fromObject(b, r);
				while (
					r.peekIf([
						SqlLexer.NATURAL,
						SqlLexer.JOIN,
						SqlLexer.CROSS,
						SqlLexer.INNER,
						SqlLexer.LEFT,
						SqlLexer.RIGHT,
						SqlLexer.FULL,
					])
				) {
					hasJoinClause = true;
					this.joinClause(b, r);
				}

				if (!hasJoinClause && r.peekIf(SqlLexer.Comma)) {
					b.token(r.consume());
				} else {
					break;
				}
			} while (r.peek() && !r.peekIf(SqlLexer.EoS));
			b.end();
		}
		return b.end(start);
	}

	private fromObject(b: CstBuilder, r: TokenReader) {
		const start = b.start("FromObject");

		if (r.peekIf(SqlLexer.LeftParen)) {
			b.token(r.consume());
			b.start("SubqueryExpression");
			if (r.peekIf([SqlLexer.WITH, SqlLexer.SELECT])) {
				let withClause: ReturnType<typeof this.withClause> | undefined;
				if (r.peekIf(SqlLexer.WITH)) {
					withClause = this.withClause(b, r);
				}
				this.selectStatement(b, r, withClause);
			} else {
				this.fromClause(b, r);
			}
			b.end();
			b.token(r.consume(SqlLexer.RightParen));
		} else {
			const node = b.start("ObjectReference");
			const ident = this.identifier(b, r, "ObjectName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.attr("type", "SchemaName", ident);
				b.token(r.consume());
				this.identifier(b, r, "ObjectName");
			}
			if (r.peekIf(SqlLexer.LeftParen)) {
				b.attr("type", "FunctionName", node);
				b.token(r.consume());
				b.start("FunctionArgumentList");
				while (!r.peekIf(SqlLexer.RightParen)) {
					b.start("FunctionArgument");
					this.expression(b, r);
					b.end();

					if (r.peekIf(SqlLexer.Comma)) {
						b.token(r.consume());
					} else {
						break;
					}
				}
				b.end();
				b.token(r.consume(SqlLexer.RightParen));
			}
			b.end();
		}

		if (r.peekIf(SqlLexer.AS)) {
			b.token(r.consume());
			this.identifier(b, r, "ObjectAlias");
		} else if (r.peekIf(SqlLexer.Identifier)) {
			this.identifier(b, r, "ObjectAlias");
		}
		return b.end(start);
	}

	private joinClause(b: CstBuilder, r: TokenReader) {
		let start: ReturnType<typeof b.start> | undefined;
		if (r.peekIf(SqlLexer.CROSS)) {
			start = b.start("CrossJoinClause");
			b.token(r.consume());
		} else {
			let option: ReturnType<typeof b.end> | undefined;
			if (r.peekIf(SqlLexer.NATURAL)) {
				b.start("NatualOption");
				b.token(r.consume());
				option = b.end();
			}
			if (r.peekIf(SqlLexer.LEFT)) {
				start = b.start("LeftOuterJoinClause");
				if (option) {
					b.append(option);
				}
				b.token(r.consume());
				if (r.peekIf(SqlLexer.OUTER)) {
					b.token(r.consume());
				}
			} else if (r.peekIf(SqlLexer.RIGHT)) {
				start = b.start("RightOuterJoinClause");
				if (option) {
					b.append(option);
				}
				b.token(r.consume());
				if (r.peekIf(SqlLexer.OUTER)) {
					b.token(r.consume());
				}
			} else if (r.peekIf(SqlLexer.FULL)) {
				start = b.start("FullOuterJoinClause");
				if (option) {
					b.append(option);
				}
				b.token(r.consume());
				if (r.peekIf(SqlLexer.OUTER)) {
					b.token(r.consume());
				}
			} else {
				start = b.start("InnerJoinClause");
				if (option) {
					b.append(option);
				}
				if (r.peekIf(SqlLexer.INNER)) {
					b.token(r.consume());
				}
			}
		}
		b.token(r.consume(SqlLexer.JOIN));

		this.fromObject(b, r);

		if (r.peekIf(SqlLexer.ON)) {
			b.start("JoinOnClause");
			b.token(r.consume());
			this.expression(b, r);
			b.end();
		} else if (r.peekIf(SqlLexer.USING)) {
			b.start("UsingClause");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.LeftParen));
			b.token(r.consume(SqlLexer.RightParen));
			b.end();
		}

		return b.end(start);
	}

	private whereClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("WhereClause");
		b.token(r.consume(SqlLexer.WHERE));
		this.expression(b, r);
		return b.end(start);
	}

	private gropuByClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("GroupByClause");
		b.token(r.consume(SqlLexer.GROUP));
		b.token(r.consume(SqlLexer.BY));
		this.expressionList(b, r);
		return b.end(start);
	}

	private havingClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("HavingClause");
		b.token(r.consume(SqlLexer.HAVING));
		this.expression(b, r);
		return b.end(start);
	}

	private windowClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("WindowClause");
		b.token(r.consume(SqlLexer.WINDOW));
		do {
			this.identifier(b, r, "WindowName");
			b.token(r.consume(SqlLexer.AS));
			this.window(b, r);
			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		return b.end(start);
	}

	private window(b: CstBuilder, r: TokenReader) {
		const start = b.start("Window");
		if (!r.peekIf(SqlLexer.PARTITION)) {
			this.identifier(b, r, "BaseWindowName");
		}
		if (r.peekIf(SqlLexer.PARTITION)) {
			this.partitionByClause(b, r);
		}
		if (r.peekIf(SqlLexer.ORDER)) {
			this.orderByClause(b, r);
		}
		b.start("FrameClause");
		if (r.peekIf(SqlLexer.RANGE)) {
			b.start("RangeOption");
			b.token(r.consume());
			b.end();
		} else if (r.peekIf(SqlLexer.ROWS)) {
			b.start("RowsOption");
			b.token(r.consume());
			b.end();
		} else if (r.peekIf(SqlLexer.GROUPS)) {
			b.start("GroupsOption");
			b.token(r.consume());
			b.end();
		}
		if (r.peekIf(SqlLexer.CURRENT)) {
			b.start("FrameStartClause");
			b.start("CurrentRowOption");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.ROW));
			b.end();
			b.end();
		} else if (r.peekIf(SqlLexer.UNBOUNDED)) {
			b.start("FrameStartClause");
			b.start("UnboundedPrecedingOption");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.PRECEDING));
			b.end();
			b.end();
		} else if (r.peekIf(SqlLexer.BETWEEN)) {
			b.token(r.consume());

			b.start("FrameStartClause");
			b.token(r.consume());
			if (r.peekIf(SqlLexer.CURRENT)) {
				b.start("CurrentRowOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.ROW));
				b.end();
			} else if (r.peekIf(SqlLexer.UNBOUNDED)) {
				b.start("UnboundedPrecedingOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.PRECEDING));
				b.end();
			} else {
				if (r.peekIf(SqlLexer.PRECEDING)) {
					b.start("PrecedingOption");
					this.expression(b, r);
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.FOLLOWING)) {
					b.start("FollowingOption");
					this.expression(b, r);
					b.token(r.consume());
					b.end();
				} else {
					throw r.createParseError();
				}
			}
			b.end();
			b.token(r.consume(SqlLexer.AND));

			b.start("FrameEndClause");

			b.token(r.consume());
			if (r.peekIf(SqlLexer.CURRENT)) {
				b.start("CurrentRowOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.ROW));
				b.end();
			} else if (r.peekIf(SqlLexer.UNBOUNDED)) {
				b.start("UnboundedFollowingOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.FOLLOWING));
				b.end();
			} else {
				if (r.peekIf(SqlLexer.PRECEDING)) {
					b.start("PrecedingOption");
					this.expression(b, r);
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.FOLLOWING)) {
					b.start("FollowingOption");
					this.expression(b, r);
					b.token(r.consume());
					b.end();
				} else {
					throw r.createParseError();
				}
			}
			b.end();
		} else {
			b.start("FrameStartClause");
			b.start("PrecedingOption");
			this.expression(b, r);
			b.token(r.consume(SqlLexer.PRECEDING));
			b.end();
			b.end();
		}
		b.end();
		if (r.peekIf(SqlLexer.EXCLUDE)) {
			b.start("ExcludeClause");
			b.token(r.consume());
			if (r.peekIf(SqlLexer.NO)) {
				b.start("NoOthersOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.OTHERS));
				b.end();
			} else if (r.peekIf(SqlLexer.CURRENT)) {
				b.start("CurrentRowOption");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.ROW));
				b.end();
			} else if (r.peekIf(SqlLexer.GROUP)) {
				b.start("GroupOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.TIES)) {
				b.start("TiesOption");
				b.token(r.consume());
				b.end();
			} else {
				throw r.createParseError();
			}
			b.end();
		}
		return b.end(start);
	}

	private partitionByClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("PartitionByClause");
		b.token(r.consume(SqlLexer.PARTITION));
		b.token(r.consume(SqlLexer.BY));
		do {
			this.expression(b, r);
			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		return b.end(start);
	}

	private returningClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("ReturningClause");
		b.token(r.consume(SqlLexer.RETURNING));
		this.selectColumnList(b, r);
		return b.end(start);
	}

	private orderByClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("OrderByClause");
		b.token(r.consume(SqlLexer.ORDER));
		b.token(r.consume(SqlLexer.BY));

		b.start("SortColumnList");
		do {
			this.sortColumn(b, r);
			if (r.peekIf(SqlLexer.NULLS, SqlLexer.FIRST)) {
				b.start("NullsFirstOption");
				b.token(r.consume());
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.NULLS, SqlLexer.LAST)) {
				b.start("NullsLastOption");
				b.token(r.consume());
				b.token(r.consume());
				b.end();
			}

			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		b.end();
		return b.end(start);
	}

	private limitClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("LimitClause");
		b.token(r.consume(SqlLexer.LIMIT));
		const node = this.expression(b, r);
		if (r.peekIf(SqlLexer.OFFSET)) {
			b.start("LimitOption");
			b.append(node);
			b.end();

			b.start("OffsetOption");
			b.token(r.consume());
			this.expression(b, r);
			b.end();
		} else if (r.peekIf(SqlLexer.Comma)) {
			b.start("OffsetOption");
			b.append(node);
			b.end();

			b.token(r.consume());

			b.start("LimitOption");
			this.expression(b, r);
			b.end();
		} else {
			b.start("LimitOption");
			b.append(node);
			b.end();
		}
		return b.end(start);
	}

	private tableColumn(b: CstBuilder, r: TokenReader) {
		const start = b.start("TableColumn");
		this.identifier(b, r, "ColumnName");
		if (r.peekIf(SqlLexer.Identifier)) {
			this.columnType(b, r);
		}

		while (
			r.peekIf([
				SqlLexer.CONSTRAINT,
				SqlLexer.PRIMARY,
				SqlLexer.NOT,
				SqlLexer.UNIQUE,
				SqlLexer.CHECK,
				SqlLexer.DEFAULT,
				SqlLexer.COLLATE,
				SqlLexer.REFERENCES,
			]) ||
			(!this.compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS") &&
				r.peekIf([SqlLexer.GENERATED, SqlLexer.AS]))
		) {
			this.columnConstraint(b, r);
		}
		return b.end(start);
	}

	private columnType(b: CstBuilder, r: TokenReader) {
		const start = b.start("ColumnType");

		{
			b.start("TypeName");
			let text = b.token(r.consume()).text;
			while (r.peekIf(SqlLexer.Identifier)) {
				text += ` ${b.token(r.consume()).text}`;
			}
			b.attr("value", text);
			b.end();
		}

		if (r.peekIf(SqlLexer.LeftParen)) {
			b.token(r.consume());

			b.start("TypeOptionList");
			b.start("LengthOption");
			this.numericLiteral(b, r);
			b.end();

			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());

				b.start("ScaleOption");
				this.numericLiteral(b, r);
				b.end();
			}

			b.end();
			b.token(r.consume(SqlLexer.RightParen));
		}
		return b.end(start);
	}

	private columnConstraint(b: CstBuilder, r: TokenReader) {
		const start = b.start("ColumnConstraint");
		if (r.peekIf(SqlLexer.CONSTRAINT)) {
			b.token(r.consume());
			this.identifier(b, r, "ConstraintName");
		}
		if (r.peekIf(SqlLexer.PRIMARY)) {
			b.start("PrimaryKeyConstraint");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.KEY));

			if (r.peekIf(SqlLexer.ASC)) {
				b.start("AscOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.DESC)) {
				b.start("DescOption");
				b.token(r.consume());
				b.end();
			}
			if (r.peekIf(SqlLexer.ON)) {
				b.start("OnConflictClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.CONFLICT));
				this.conflictAction(b, r);
				b.end();
			}
			if (r.peekIf(SqlLexer.AUTOINCREMENT)) {
				b.start("AutoincrementOption");
				b.token(r.consume());
				b.end();
			}
			b.end();
		} else if (r.peekIf(SqlLexer.NOT)) {
			b.start("NotNullConstraint");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.NULL));

			if (r.peekIf(SqlLexer.ON)) {
				b.start("OnConflictClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.CONFLICT));
				this.conflictAction(b, r);
				b.end();
			}

			b.end();
		} else if (r.peekIf(SqlLexer.NULL)) {
			b.start("NullConstraint");
			b.token(r.consume());
			if (r.peekIf(SqlLexer.ON)) {
				b.start("OnConflictClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.CONFLICT));
				this.conflictAction(b, r);
				b.end();
			}
			b.end();
		} else if (r.peekIf(SqlLexer.UNIQUE)) {
			b.start("UniqueConstraint");
			b.token(r.consume());
			if (r.peekIf(SqlLexer.ON)) {
				b.start("OnConflictClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.CONFLICT));
				this.conflictAction(b, r);
				b.end();
			}
			b.end();
		} else if (r.peekIf(SqlLexer.CHECK)) {
			b.start("CheckConstraint");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.LeftParen));
			this.expression(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			b.end();
		} else if (r.peekIf(SqlLexer.DEFAULT)) {
			b.start("DefaultOption");
			b.token(r.consume());
			if (r.peekIf(SqlLexer.LeftParen)) {
				b.token(r.consume());
				this.expression(b, r);
				b.token(r.consume(SqlLexer.RightParen));
			} else {
				this.expression(b, r);
			}
			b.end();
		} else if (r.peekIf(SqlLexer.COLLATE)) {
			b.start("CollateOption");
			b.token(r.consume());
			this.identifier(b, r, "CollateName");
			b.end();
		} else if (r.peekIf(SqlLexer.REFERENCES)) {
			b.start("ForeignKeyConstraint");
			this.referencesClause(b, r);
			b.end();
		} else if (r.peekIf([SqlLexer.GENERATED, SqlLexer.AS])) {
			b.start("GeneratedColumnOption");
			if (r.peekIf(SqlLexer.GENERATED)) {
				b.token(r.consume());
				b.token(r.consume(SqlLexer.ALWAYS));
			}
			b.token(r.consume(SqlLexer.AS));
			b.token(r.consume(SqlLexer.LeftParen));
			b.start("GeneratedColumn");
			this.expression(b, r);
			b.end();

			b.token(r.consume(SqlLexer.RightParen));

			if (r.peekIf(SqlLexer.STORED)) {
				b.start("StoredOption");
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.VIRTUAL)) {
				b.start("virtual option");
				b.token(r.consume());
				b.end();
			}

			b.end();
		} else {
			throw r.createParseError();
		}
		return b.end(start);
	}

	private tableConstraint(b: CstBuilder, r: TokenReader) {
		const start = b.start("TableConstraint");
		if (r.peekIf(SqlLexer.CONSTRAINT)) {
			b.token(r.consume());
			this.identifier(b, r, "ConstraintName");
		}
		if (r.peekIf(SqlLexer.PRIMARY)) {
			b.start("PrimaryKeyConstraint");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.KEY));
			b.token(r.consume(SqlLexer.LeftParen));
			b.start("SortColumnList");
			do {
				this.sortColumn(b, r);
				if (r.peekIf(SqlLexer.Comma)) {
					b.token(r.consume());
				} else {
					break;
				}
			} while (r.peek() && !r.peekIf(SqlLexer.EoS));
			b.end();

			b.token(r.consume(SqlLexer.RightParen));

			if (r.peekIf(SqlLexer.ON)) {
				b.start("OnConflictClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.CONFLICT));
				this.conflictAction(b, r);
				b.end();
			}

			b.end();
		} else if (r.peekIf(SqlLexer.UNIQUE)) {
			b.start("UniqueConstraint");
			b.token(r.consume());

			b.token(r.consume(SqlLexer.LeftParen));
			b.start("SortColumnList");
			do {
				this.sortColumn(b, r);
				if (r.peekIf(SqlLexer.Comma)) {
					b.token(r.consume());
				} else {
					break;
				}
			} while (r.peek() && !r.peekIf(SqlLexer.EoS));
			b.end();
			b.token(r.consume(SqlLexer.RightParen));

			if (r.peekIf(SqlLexer.ON)) {
				b.start("OnConflictClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.CONFLICT));
				this.conflictAction(b, r);
				b.end();
			}

			b.end();
		} else if (r.peekIf(SqlLexer.CHECK)) {
			b.start("CheckConstraint");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.LeftParen));
			this.expression(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			b.end();
		} else if (r.peekIf(SqlLexer.FOREIGN)) {
			b.start("ForeignKeyConstraint");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.KEY));
			b.token(r.consume(SqlLexer.LeftParen));
			this.columnList(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			this.referencesClause(b, r);
			b.end();
		} else {
			throw r.createParseError();
		}
		return b.end(start);
	}

	private referencesClause(b: CstBuilder, r: TokenReader) {
		const start = b.start("ReferencesClause");
		b.token(r.consume());
		this.identifier(b, r, "ObjectName");
		if (r.peekIf(SqlLexer.LeftParen)) {
			b.token(r.consume());
			this.columnList(b, r);
			b.token(r.consume(SqlLexer.RightParen));
		}

		while (r.peekIf([SqlLexer.ON, SqlLexer.MATCH])) {
			if (r.peekIf(SqlLexer.ON)) {
				const token = r.consume();
				if (r.peekIf(SqlLexer.DELETE)) {
					b.start("OnDeleteClause");
					b.token(token);
					b.token(r.consume());
				} else {
					b.start("OnUpdateClause");
					b.token(token);
					b.token(r.consume(SqlLexer.UPDATE));
				}
				if (r.peekIf(SqlLexer.SET, SqlLexer.NULL)) {
					b.start("SetNullOption");
					b.token(r.consume());
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.SET, SqlLexer.DEFAULT)) {
					b.start("SetDefaultOption");
					b.token(r.consume());
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.CASCADE)) {
					b.start("CascadeOption");
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.RESTRICT)) {
					b.start("RestrictOption");
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.NO, SqlLexer.ACTION)) {
					b.start("NoActionOption");
					b.token(r.consume());
					b.token(r.consume());
					b.end();
				} else {
					throw r.createParseError();
				}
				b.end();
			} else if (r.peekIf(SqlLexer.MATCH)) {
				b.start("MatchClause");
				b.token(r.consume());
				if (r.peekIf(SqlLexer.SIMPLE)) {
					b.start("SimpleOption");
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.FULL)) {
					b.start("FullOption");
					b.token(r.consume());
					b.end();
				} else if (r.peekIf(SqlLexer.PARTIAL)) {
					b.start("PartialOption");
					b.token(r.consume());
					b.end();
				} else {
					throw r.createParseError();
				}
				b.end();
			} else {
				throw r.createParseError();
			}
		}

		if (r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.DEFERRABLE)) {
			if (r.peekIf(SqlLexer.NOT)) {
				b.start("NotDeferrableOption");
				b.token(r.consume());
			} else {
				b.start("DeferrableOption");
			}
			b.token(r.consume());

			if (r.peekIf(SqlLexer.INITIALLY, SqlLexer.DEFERRED)) {
				b.start("InitiallyDeferredOption");
				b.token(r.consume());
				b.token(r.consume());
				b.end();
			} else if (r.peekIf(SqlLexer.INITIALLY, SqlLexer.IMMEDIATE)) {
				b.start("InitiallyImmediateOption");
				b.token(r.consume());
				b.token(r.consume());
				b.end();
			}
			b.end();
		}
		return b.end(start);
	}

	private conflictAction(b: CstBuilder, r: TokenReader) {
		if (r.peekIf(SqlLexer.ROLLBACK)) {
			b.start("RollbackOption");
			b.token(r.consume());
			return b.end();
		} else if (r.peekIf(SqlLexer.ABORT)) {
			b.start("AbortOption");
			b.token(r.consume());
			return b.end();
		} else if (r.peekIf(SqlLexer.FAIL)) {
			b.start("FailOption");
			b.token(r.consume());
			return b.end();
		} else if (r.peekIf(SqlLexer.IGNORE)) {
			b.start("IgnoreOption");
			b.token(r.consume());
			return b.end();
		} else if (r.peekIf(SqlLexer.REPLACE)) {
			b.start("ReplaceOption");
			b.token(r.consume());
			return b.end();
		} else {
			throw r.createParseError();
		}
	}

	private pragmaValue(b: CstBuilder, r: TokenReader) {
		const start = b.start("PragmaValue");
		if (r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("+"))) {
			b.start("Expression");
			b.start("UnaryPlusOperation");
			b.token(r.consume());
			this.numericLiteral(b, r);
			b.end();
			b.end();
		} else if (
			r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("-"))
		) {
			b.start("Expression");
			b.start("UnaryMinusOperation");
			b.token(r.consume());
			this.numericLiteral(b, r);
			b.end();
			b.end();
		} else if (r.peekIf(SqlLexer.Numeric)) {
			this.numericLiteral(b, r);
		} else if (r.peekIf(SqlLexer.String)) {
			this.stringLiteral(b, r);
		} else if (r.peekIf(SqlLexer.Identifier)) {
			this.identifier(b, r, "PragmaLiteral");
		} else {
			throw r.createParseError();
		}
		return b.end(start);
	}

	private expressionList(b: CstBuilder, r: TokenReader) {
		const start = b.start("ExpressionList");
		do {
			this.expression(b, r);
			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		return b.end(start);
	}

	private expression(b: CstBuilder, r: TokenReader, precedence = 0) {
		if (precedence === 0) {
			b.start("Expression");
		}
		let current: ReturnType<typeof b.end> | undefined;
		if (r.peekIf(SqlLexer.NOT)) {
			b.start("NotOperation");
			b.token(r.consume());
			this.expression(b, r, 3);
			current = b.end();
		} else if (
			r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("~"))
		) {
			b.start("BitwiseNotOperation");
			b.token(r.consume());
			this.expression(b, r, 16);
			current = b.end();
		} else if (
			r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("+"))
		) {
			b.start("UnaryPlusOperation");
			b.token(r.consume());
			this.expression(b, r, 16);
			current = b.end();
		} else if (
			r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("-"))
		) {
			b.start("UnaryMinusOperation");
			b.token(r.consume());
			this.expression(b, r, 16);
			current = b.end();
		} else {
			current = this.expressionValue(b, r);
		}

		while (r.peek() && !r.peekIf(SqlLexer.EoS)) {
			if (precedence < 1 && r.peekIf(SqlLexer.OR)) {
				b.start("OrOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 1);
				current = b.end();
			} else if (precedence < 2 && r.peekIf(SqlLexer.AND)) {
				b.start("AndOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 2);
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf(
					(token) => token.is(SqlLexer.Operator) && token.is(["=", "=="]),
				)
			) {
				b.start("EqualOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 4);
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf(
					(token) => token.is(SqlLexer.Operator) && token.is(["<>", "!="]),
				)
			) {
				b.start("NotEqualOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 4);
				current = b.end();
			} else if (precedence < 4 && r.peekIf(SqlLexer.IS)) {
				const token = r.consume();
				if (r.peekIf(SqlLexer.NOT, SqlLexer.DISTINCT)) {
					b.start("IsNotDistinctFromOperation");
					b.append(current);
					b.token(token);
					b.token(r.consume());
					b.token(r.consume());
					b.token(r.consume(SqlLexer.FROM));
				} else if (r.peekIf(SqlLexer.DISTINCT)) {
					b.start("IsDistinctFromOperation");
					b.append(current);
					b.token(token);
					b.token(r.consume());
					b.token(r.consume(SqlLexer.FROM));
				} else if (r.peekIf(SqlLexer.NOT)) {
					b.start("IsNotOperation");
					b.append(current);
					b.token(token);
					b.token(r.consume());
				} else {
					b.start("IsOperation");
					b.append(current);
					b.token(token);
				}
				this.expression(b, r, 4);
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.BETWEEN)
			) {
				if (r.peekIf(SqlLexer.NOT)) {
					b.start("NotBetweenOperation");
					b.append(current);
					b.token(r.consume());
				} else {
					b.start("BetweenOperation");
					b.append(current);
				}
				b.token(r.consume());
				this.expression(b, r, 4);
				b.token(r.consume(SqlLexer.AND));
				this.expression(b, r, 4);
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.IN)
			) {
				if (r.peekIf(SqlLexer.NOT)) {
					b.start("NotInOperation");
					b.append(current);
					b.token(r.consume());
				} else {
					b.start("InOperation");
					b.append(current);
				}
				b.token(r.consume());
				if (r.peekIf(SqlLexer.LeftParen, [SqlLexer.WITH, SqlLexer.SELECT])) {
					b.start("SubqueryExpression");
					b.token(r.consume());
					let withClause: ReturnType<typeof this.withClause> | undefined;
					if (r.peekIf(SqlLexer.WITH)) {
						withClause = this.withClause(b, r);
					}
					this.selectStatement(b, r, withClause);
					b.token(r.consume(SqlLexer.RightParen));
					b.end();
				} else if (r.peekIf(SqlLexer.LeftParen)) {
					b.token(r.consume());
					this.expressionList(b, r);
					b.token(r.consume(SqlLexer.RightParen));
				} else if (r.peekIf(SqlLexer.Identifier, SqlLexer.LeftParen)) {
					b.start("FunctionExpression");
					b.start("ObjectName");
					b.token(r.consume());
					b.end();

					b.token(r.consume(SqlLexer.LeftParen));
					b.start("FunctionArgumentList");
					while (r.peek() && !r.peekIf([SqlLexer.EoS, SqlLexer.RightParen])) {
						b.start("FunctionArgument");
						this.expression(b, r);
						b.end();
						if (r.peekIf(SqlLexer.Comma)) {
							b.token(r.consume());
						} else {
							break;
						}
					}
					b.end();
					b.token(r.consume(SqlLexer.RightParen));

					b.end();
				} else if (r.peekIf([SqlLexer.Identifier, SqlLexer.String])) {
					this.columnReference(b, r);
				} else {
					throw r.createParseError();
				}
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.MATCH)
			) {
				if (r.peekIf(SqlLexer.NOT)) {
					b.start("NotMatchOperation");
					b.append(current);
					b.token(r.consume());
				} else {
					b.start("MatchOperation");
					b.append(current);
				}
				b.token(r.consume());
				this.expression(b, r, 4);
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.LIKE)
			) {
				if (r.peekIf(SqlLexer.NOT)) {
					b.start("NotLikeOperation");
					b.append(current);
					b.token(r.consume());
				} else {
					b.start("LikeOperation");
					b.append(current);
				}
				b.token(r.consume());
				this.expression(b, r, 4);
				if (r.peekIf(SqlLexer.ESCAPE)) {
					b.start("EscapeOption");

					this.expression(b, r, 6);
					b.end();
				}
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.REGEXP)
			) {
				if (r.peekIf(SqlLexer.NOT)) {
					b.start("NotRegexpOperation");
					b.append(current);
					b.token(r.consume());
				} else {
					b.start("RegexpOperation");
					b.append(current);
				}
				b.token(r.consume());
				this.expression(b, r, 4);
				current = b.end();
			} else if (
				precedence < 4 &&
				r.peekIf({ query: SqlLexer.NOT, min: 0 }, SqlLexer.GLOB)
			) {
				if (r.peekIf(SqlLexer.NOT)) {
					b.start("NotGlobOperation");
					b.append(current);
					b.token(r.consume());
				} else {
					b.start("GlobOperation");
					b.append(current);
					b.token(r.consume());
				}
				b.token(r.consume());
				this.expression(b, r, 4);
				current = b.end();
			} else if (precedence < 4 && r.peekIf(SqlLexer.ISNULL)) {
				b.start("IsNullOperation");
				b.append(current);
				b.token(r.consume());
				current = b.end();
			} else if (precedence < 4 && r.peekIf(SqlLexer.NOTNULL)) {
				b.start("IsNotNullOperation");
				b.append(current);
				b.token(r.consume());
				current = b.end();
			} else if (precedence < 4 && r.peekIf(SqlLexer.NOT, SqlLexer.NULL)) {
				b.start("IsNotNullOperation");
				b.append(current);
				b.token(r.consume());
				b.token(r.consume());
				current = b.end();
			} else if (
				precedence < 5 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("<"))
			) {
				b.start("LessThanOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 5);
				current = b.end();
			} else if (
				precedence < 5 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is(">"))
			) {
				b.start("GreaterThanOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 5);
				current = b.end();
			} else if (
				precedence < 5 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("<="))
			) {
				b.start("LessThanOrEqualOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 5);
				current = b.end();
			} else if (
				precedence < 5 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is(">="))
			) {
				b.start("GreaterThanOrEqualOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 5);
				current = b.end();
			} else if (
				precedence < 7 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("&"))
			) {
				b.start("BitwiseAndOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 7);
				current = b.end();
			} else if (
				precedence < 7 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("|"))
			) {
				b.start("BitwiseOrOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 7);
				current = b.end();
			} else if (
				precedence < 7 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("<<"))
			) {
				b.start("BitwiseLeftShiftOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 7);
				current = b.end();
			} else if (
				precedence < 7 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is(">>"))
			) {
				b.start("BitwiseRightShiftOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 7);
				current = b.end();
			} else if (
				precedence < 8 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("+"))
			) {
				b.start("AddOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 8);
				current = b.end();
			} else if (
				precedence < 8 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("-"))
			) {
				b.start("SubtractOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 8);
				current = b.end();
			} else if (
				precedence < 9 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("*"))
			) {
				b.start("MultiplyOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 9);
				current = b.end();
			} else if (
				precedence < 9 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("/"))
			) {
				b.start("DivideOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 9);
				current = b.end();
			} else if (
				precedence < 9 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("%"))
			) {
				b.start("ModuloOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 9);
				current = b.end();
			} else if (
				precedence < 10 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("||"))
			) {
				b.start("ConcatenateOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 10);
				current = b.end();
			} else if (
				precedence < 10 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("->"))
			) {
				b.start("JsonExtractOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 10);
				current = b.end();
			} else if (
				precedence < 10 &&
				r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("->>"))
			) {
				b.start("JsonExtractValueOperation");
				b.append(current);
				b.token(r.consume());
				this.expression(b, r, 10);
				current = b.end();
			} else if (precedence < 11 && r.peekIf(SqlLexer.COLLATE)) {
				b.start("CollateOperation");
				b.append(current);
				b.token(r.consume());
				this.identifier(b, r, "CollationName");
				current = b.end();
			} else {
				break;
			}
		}
		if (precedence === 0) {
			return b.end();
		}
		return current;
	}

	private expressionValue(b: CstBuilder, r: TokenReader) {
		if (r.peekIf(SqlLexer.NULL)) {
			b.start("NullLiteral");
			b.token(r.consume());
			return b.end();
		} else if (r.peekIf([SqlLexer.TRUE, SqlLexer.FALSE])) {
			return this.booleanLiteral(b, r);
		} else if (
			r.peekIf([
				SqlLexer.CURRENT_DATE,
				SqlLexer.CURRENT_TIME,
				SqlLexer.CURRENT_TIMESTAMP,
			])
		) {
			b.start("FunctionExpression");
			b.start("ObjectName");
			b.attr("value", b.token(r.consume()).text.toUpperCase());
			b.end();
			return b.end();
		} else if (r.peekIf(SqlLexer.CASE)) {
			b.start("CaseExpression");
			b.token(r.consume());
			if (!r.peekIf(SqlLexer.WHEN)) {
				this.expression(b, r);
			}
			do {
				b.start("WhenClause");
				b.token(r.consume(SqlLexer.WHEN));
				this.expression(b, r);
				b.start("ThenClause");
				b.token(r.consume(SqlLexer.THEN));
				this.expression(b, r);
				b.end();
				b.end();
			} while (r.peekIf(SqlLexer.WHEN));
			if (r.peekIf(SqlLexer.ELSE)) {
				b.start("ElseClause");
				b.token(r.consume());
				this.expression(b, r);
				b.end();
			}
			b.token(r.consume(SqlLexer.END));
			return b.end();
		} else if (r.peekIf(SqlLexer.CAST)) {
			b.start("FunctionExpression");
			b.start("ObjectName");
			b.attr("value", b.token(r.consume()).text.toUpperCase());
			b.end();
			b.token(r.consume(SqlLexer.LeftParen));

			b.start("FunctionArgumentList");
			b.start("FunctionArgument");
			this.expression(b, r);
			b.end();
			b.token(r.consume(SqlLexer.AS));
			this.columnType(b, r);
			b.end();
			b.token(r.consume(SqlLexer.RightParen));
			return b.end();
		} else if (r.peekIf(SqlLexer.RAISE)) {
			b.start("FunctionExpression");
			b.start("ObjectName");
			b.attr("value", b.token(r.consume()).text.toUpperCase());
			b.end();

			b.token(r.consume(SqlLexer.LeftParen));
			b.start("FunctionArgumentList");
			b.start("FunctionArgument");
			this.conflictAction(b, r);
			b.end();
			b.token(r.consume(SqlLexer.Comma));
			b.start("FunctionArgument");
			this.expression(b, r);
			b.end();
			b.end();
			b.token(r.consume(SqlLexer.RightParen));
			return b.end();
		} else if (r.peekIf(SqlLexer.EXISTS)) {
			b.start("ExistsOperation");
			b.token(r.consume());
			b.token(r.consume(SqlLexer.LeftParen));
			this.selectStatement(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			return b.end();
		} else if (r.peekIf(SqlLexer.LeftParen, SqlLexer.VALUES)) {
			b.start("SubqueryExpression");
			b.token(r.consume());
			b.start("ValuesClause");
			b.token(r.consume(SqlLexer.VALUES));
			b.token(r.consume(SqlLexer.LeftParen));
			this.expressionList(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			b.end();
			b.token(r.consume(SqlLexer.RightParen));
			return b.end();
		} else if (r.peekIf(SqlLexer.LeftParen, SqlLexer.SELECT)) {
			b.start("SubqueryExpression");
			b.token(r.consume());
			this.selectStatement(b, r);
			b.token(r.consume(SqlLexer.RightParen));
			return b.end();
		} else if (r.peekIf(SqlLexer.LeftParen)) {
			const node = b.start("ParenthesesOperation");
			b.token(r.consume());
			this.expression(b, r);
			if (r.peekIf(SqlLexer.Comma)) {
				b.attr("type", "ExpressionList", node);
				b.token(r.consume());
				do {
					this.expression(b, r);
					if (r.peekIf(SqlLexer.Comma)) {
						b.token(r.consume());
					} else {
						break;
					}
				} while (r.peek() && !r.peekIf(SqlLexer.EoS));
			}
			b.token(r.consume(SqlLexer.RightParen));
			return b.end();
		} else if (r.peekIf(SqlLexer.Identifier, SqlLexer.LeftParen)) {
			b.start("FunctionExpression");
			b.start("ObjectName");
			b.token(r.consume());
			b.end();
			b.token(r.consume(SqlLexer.LeftParen));
			b.start("FunctionArgumentList");
			if (r.peekIf((token) => token.is(SqlLexer.Operator) && token.is("*"))) {
				b.start("FunctionArgument");
				b.start("AllColumnsOption");
				b.token(r.consume());
				b.end();
				b.end();
			} else {
				if (r.peekIf(SqlLexer.DISTINCT)) {
					b.start("DistinctOption");
					b.token(r.consume());
					b.end();
				}
				while (r.peek() && !r.peekIf(SqlLexer.EoS)) {
					b.start("Argument");
					this.expression(b, r);
					b.end();
					if (r.peekIf(SqlLexer.Comma)) {
						b.token(r.consume());
					} else {
						break;
					}
				}
			}
			b.end();
			b.token(r.consume(SqlLexer.RightParen));
			if (r.peekIf(SqlLexer.FILTER)) {
				b.start("FilterClause");
				b.token(r.consume());
				b.token(r.consume(SqlLexer.LeftParen));
				this.whereClause(b, r);
				b.token(r.consume(SqlLexer.RightParen));
				b.end();
			}
			if (
				!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
				r.peekIf(SqlLexer.OVER)
			) {
				b.start("OverClause");
				b.token(r.consume());
				if (r.peekIf(SqlLexer.LeftParen)) {
					b.token(r.consume());
					this.window(b, r);
					b.token(r.consume(SqlLexer.RightParen));
				} else {
					this.identifier(b, r, "WindowName");
				}
				b.end();
			}
			return b.end();
		} else if (r.peekIf(SqlLexer.Numeric)) {
			return this.numericLiteral(b, r);
		} else if (
			r.peekIf(SqlLexer.String) ||
			r.peekIf((token) => token.is(SqlLexer.Identifier) && token.is(/^"/))
		) {
			return this.stringLiteral(b, r);
		} else if (r.peekIf(SqlLexer.Blob)) {
			return this.blobLiteral(b, r);
		} else if (
			r.peekIf(SqlLexer.Identifier) ||
			r.peekIf(SqlLexer.String, SqlLexer.Dot)
		) {
			return this.columnReference(b, r);
		} else if (r.peekIf(SqlLexer.BindVariable)) {
			const token = r.consume();
			if (token.text.startsWith("?")) {
				b.start("PositionalBindVariable");
				b.token(token);
				let value = token.text.substring(1);
				if (value) {
					r.state.bindPosition = Number.parseInt(value, 10);
				} else {
					const pos = r.state.bindPosition ? r.state.bindPosition + 1 : 1;
					value = `${pos}`;
					r.state.bindPosition = pos;
				}
				b.attr("value", value);
				return b.end();
			} else {
				b.start("NamedBindVariable");
				b.token(token);
				b.attr("value", token.text.substring(1));
				return b.end();
			}
		} else {
			throw r.createParseError();
		}
	}

	private sortColumn(b: CstBuilder, r: TokenReader) {
		const start = b.start("SortColumn");
		this.expression(b, r);
		if (r.peekIf(SqlLexer.COLLATE)) {
			b.token(r.consume());
			this.identifier(b, r, "CollationName");
		}
		if (r.peekIf(SqlLexer.ASC)) {
			b.start("AscOption");
			b.token(r.consume());
			b.end();
		} else if (r.peekIf(SqlLexer.DESC)) {
			b.start("DescOption");
			b.token(r.consume());
			b.end();
		}
		return b.end(start);
	}

	private columnList(b: CstBuilder, r: TokenReader) {
		const start = b.start("ColumnList");
		do {
			this.identifier(b, r, "ColumnName");
			if (r.peekIf(SqlLexer.Comma)) {
				b.token(r.consume());
			} else {
				break;
			}
		} while (r.peek() && !r.peekIf(SqlLexer.EoS));
		return b.end(start);
	}

	private columnReference(b: CstBuilder, r: TokenReader) {
		const start = b.start("ColumnReference");
		const ident1 = this.identifier(b, r, "ColumnName");
		if (r.peekIf(SqlLexer.Dot)) {
			b.token(r.consume());
			b.attr("type", "ObjectName", ident1);
			const ident2 = this.identifier(b, r, "ColumnName");
			if (r.peekIf(SqlLexer.Dot)) {
				b.token(r.consume());
				b.attr("type", "SchemaName", ident1);
				b.attr("type", "ObjectName", ident2);
				this.identifier(b, r, "ColumnName");
			}
		}
		return b.end(start);
	}

	private identifier(b: CstBuilder, r: TokenReader, name: string) {
		const start = b.start(name);
		if (r.peekIf([SqlLexer.Identifier, SqlLexer.String])) {
			b.attr("value", dequote(b.token(r.consume()).text));
		} else {
			throw r.createParseError();
		}
		return b.end(start);
	}

	private numericLiteral(b: CstBuilder, r: TokenReader) {
		const start = b.start("NumericLiteral");
		b.attr("value", b.token(r.consume(SqlLexer.Numeric)).text.toLowerCase());
		return b.end(start);
	}

	private stringLiteral(b: CstBuilder, r: TokenReader) {
		const start = b.start("StringLiteral");
		if (r.peekIf((token) => token.is(SqlLexer.Identifier) && token.is(/^"/))) {
			b.attr("value", dequote(b.token(r.consume()).text));
		} else {
			b.attr("value", dequote(b.token(r.consume(SqlLexer.String)).text));
		}
		return b.end(start);
	}

	private blobLiteral(b: CstBuilder, r: TokenReader) {
		const start = b.start("BlobLiteral");
		const token = r.consume(SqlLexer.Blob);
		b.token(token);
		b.attr(
			"value",
			token.text.substring(2, token.text.length - 1).toUpperCase(),
		);
		return b.end(start);
	}

	private booleanLiteral(b: CstBuilder, r: TokenReader) {
		const start = b.start("BooleanLiteral");
		if (r.peekIf([SqlLexer.TRUE, SqlLexer.FALSE])) {
			b.attr("value", b.token(r.consume()).text.toUpperCase());
		} else {
			throw r.createParseError();
		}
		return b.end(start);
	}
}
