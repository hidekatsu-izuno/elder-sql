import { Element, Text } from "domhandler";
import { appendChild, replaceElement } from "domutils";
import {
	Keyword,
	ParseError,
	Token,
	TokenReader,
	TokenType,
} from "../lexer.js";
import { AggregateParseError, Parser } from "../parser.js";
import { apply, dequote } from "../utils.js";
import { Sqlite3Lexer } from "./sqlite3_lexer.js";

export class Sqlite3Parser extends Parser {
	public compileOptions: Set<string>;

	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new Sqlite3Lexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}

	parseTokens(tokens: Token[]): Element {
		const r = new TokenReader(tokens);

		const root = new Element("Script", {});
		const errors = [];

		while (r.peek()) {
			try {
				if (
					r.peekIf({
						type: [TokenType.SemiColon, TokenType.Delimiter, TokenType.EoF],
					})
				) {
					this.append(root, r.consume());
				} else if (r.peekIf(TokenType.Command)) {
					this.command(root, r);
				} else if (r.peekIf(Keyword.EXPLAIN)) {
					this.explainStatement(root, r);
				} else {
					this.statement(root, r);
				}
			} catch (err) {
				if (err instanceof ParseError) {
					this.unknown(root, r);
					errors.push(err);
				} else {
					throw err;
				}
			}
		}

		if (errors.length) {
			throw new AggregateParseError(
				root,
				errors,
				`${errors.length} error found\n${errors.map((e) => e.message).join("\n")}`,
			);
		}

		return root;
	}

	private unknown(parent: Element, r: TokenReader) {
		if (!r.peek().eos) {
			return apply(this.append(parent, new Element("Unknown", {})), (node) => {
				while (!r.peek().eos) {
					this.append(node, r.consume());
				}
			});
		}
	}

	private command(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("CommandStatement", {}));
		try {
			return apply(current, (node) => {
				apply(this.append(node, new Element("CommandName", {})), (node) => {
					const token = r.consume(TokenType.Command);
					this.append(node, token);
					node.attribs.value = token.text;
				});
				if (!r.peek(-1).eos) {
					apply(
						this.append(node, new Element("CommandArgumentList", {})),
						(node) => {
							do {
								apply(
									this.append(node, new Element("CommandArgument", {})),
									(node) => {
										const token = r.consume();
										this.append(node, token);
										node.attribs.value = dequote(token.text);
									},
								);
							} while (!r.peek(-1).eos);
						},
					);
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private explainStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("ExplainStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.EXPLAIN));
				if (r.peekIf(Keyword.QUERY)) {
					apply(
						this.append(node, new Element("QueryPlanOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.PLAN));
						},
					);
				}
				this.statement(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private statement(parent: Element, r: TokenReader) {
		let stmt: unknown;
		if (r.peekIf(Keyword.CREATE)) {
			const mark = r.pos;
			r.consume();
			while (!r.peek().eos && !Sqlite3Lexer.isObjectStart(r.peek().keyword)) {
				r.consume();
			}

			if (r.peekIf(Keyword.TABLE)) {
				r.pos = mark;
				stmt = this.createTableStatement(parent, r);
			} else if (r.peekIf(Keyword.VIEW)) {
				r.pos = mark;
				stmt = this.createViewStatement(parent, r);
			} else if (r.peekIf(Keyword.TRIGGER)) {
				r.pos = mark;
				stmt = this.createTriggerStatement(parent, r);
			} else if (r.peekIf(Keyword.INDEX)) {
				r.pos = mark;
				stmt = this.createIndexStatement(parent, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(Keyword.ALTER)) {
			const mark = r.pos;
			r.consume();

			if (r.peekIf(Keyword.TABLE)) {
				r.pos = mark;
				stmt = this.alterTableStatement(parent, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(Keyword.DROP)) {
			const mark = r.pos;
			r.consume();

			if (r.peekIf(Keyword.TABLE)) {
				r.pos = mark;
				stmt = this.dropTableStatement(parent, r);
			} else if (r.peekIf(Keyword.VIEW)) {
				r.pos = mark;
				stmt = this.dropViewStatement(parent, r);
			} else if (r.peekIf(Keyword.TRIGGER)) {
				r.pos = mark;
				stmt = this.dropTriggerStatement(parent, r);
			} else if (r.peekIf(Keyword.INDEX)) {
				r.pos = mark;
				stmt = this.dropIndexStatement(parent, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(Keyword.ATTACH)) {
			stmt = this.attachDatabaseStatement(parent, r);
		} else if (r.peekIf(Keyword.DETACH)) {
			stmt = this.detachDatabaseStatement(parent, r);
		} else if (r.peekIf(Keyword.ANALYZE)) {
			stmt = this.analyzeStatement(parent, r);
		} else if (r.peekIf(Keyword.REINDEX)) {
			stmt = this.reindexStatement(parent, r);
		} else if (r.peekIf(Keyword.VACUUM)) {
			stmt = this.vacuumStatement(parent, r);
		} else if (r.peekIf(Keyword.PRAGMA)) {
			stmt = this.pragmaStatement(parent, r);
		} else if (r.peekIf(Keyword.BEGIN)) {
			stmt = this.beginTransactionStatement(parent, r);
		} else if (r.peekIf(Keyword.SAVEPOINT)) {
			stmt = this.savepointStatement(parent, r);
		} else if (r.peekIf(Keyword.RELEASE)) {
			stmt = this.releaseSavepointStatement(parent, r);
		} else if (r.peekIf({ type: [Keyword.COMMIT, Keyword.END] })) {
			stmt = this.commitTransactionStatement(parent, r);
		} else if (r.peekIf(Keyword.ROLLBACK)) {
			stmt = this.rollbackTransactionStatement(parent, r);
		} else {
			if (r.peekIf(Keyword.WITH)) {
				this.withClause(parent, r);
			}
			if (r.peekIf({ type: [Keyword.INSERT, Keyword.REPLACE] })) {
				stmt = this.insertStatement(parent, r);
			} else if (r.peekIf(Keyword.UPDATE)) {
				stmt = this.updateStatement(parent, r);
			} else if (r.peekIf(Keyword.DELETE)) {
				stmt = this.deleteStatement(parent, r);
			} else if (r.peekIf({ type: [Keyword.SELECT, Keyword.VALUES] })) {
				stmt = this.selectStatement(parent, r);
			}
		}

		if (!stmt) {
			throw r.createParseError();
		}
		return stmt;
	}

	private createTableStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("CreateTableStatement", {}),
		);
		try {
			return apply(current, (node) => {
				let virtual = false;

				this.append(node, r.consume(Keyword.CREATE));
				if (r.peekIf({ type: [Keyword.TEMPORARY, Keyword.TEMP] })) {
					apply(
						this.append(node, new Element("TemporaryOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.VIRTUAL)) {
					apply(this.append(node, new Element("VirtualOption", {})), (node) => {
						this.append(node, r.consume());
					});
					virtual = true;
				}
				this.append(node, r.consume(Keyword.TABLE));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfNotExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.NOT));
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (virtual) {
					apply(
						this.append(node, new Element("UsingModuleClause", {})),
						(node) => {
							this.append(node, r.consume(Keyword.USING));
							this.identifier(node, r, "ModuleName");
							if (r.peekIf(TokenType.LeftParen)) {
								this.append(node, r.consume());
								apply(
									this.append(node, new Element("ModuleArgumentList", {})),
									(node) => {
										do {
											apply(
												this.append(node, new Element("ModuleArgument", {})),
												(node) => {
													do {
														this.append(node, r.consume());
													} while (
														!r.peek().eos &&
														!r.peekIf({
															type: [TokenType.RightParen, TokenType.Comma],
														})
													);
												},
											);
											if (r.peekIf(TokenType.Comma)) {
												this.append(node, r.consume());
											} else {
												break;
											}
										} while (!r.peek().eos);
									},
								);
								this.append(node, r.consume(TokenType.RightParen));
							}
						},
					);
				} else if (r.peekIf(TokenType.LeftParen)) {
					this.append(node, r.consume());
					apply(
						this.append(node, new Element("TableColumnList", {})),
						(node) => {
							let hasTableConstraint = false;
							do {
								if (!hasTableConstraint) {
									if (
										r.peekIf({
											type: [
												Keyword.CONSTRAINT,
												Keyword.UNIQUE,
												Keyword.CHECK,
												Keyword.FOREIGN,
											],
										}) ||
										r.peekIf(Keyword.PRIMARY, Keyword.KEY)
									) {
										hasTableConstraint = true;
									} else {
										this.tableColumn(node, r);
									}
								}
								if (hasTableConstraint) {
									this.tableConstraint(node, r);
								}
								if (r.peekIf(TokenType.Comma)) {
									this.append(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.append(node, r.consume(TokenType.RightParen));

					while (r.peekIf({ type: [Keyword.WITHOUT, Keyword.STRICT] })) {
						if (r.peekIf(Keyword.WITHOUT)) {
							apply(
								this.append(node, new Element("WithoutRowidOption", {})),
								(node) => {
									this.append(node, r.consume());
									this.append(node, r.consume(Keyword.ROWID));
								},
							);
						} else if (r.peekIf(Keyword.STRICT)) {
							apply(
								this.append(node, new Element("StrictOption", {})),
								(node) => {
									this.append(node, r.consume());
								},
							);
						}
						if (r.peekIf(TokenType.Comma)) {
							this.append(node, r.consume());
						} else {
							break;
						}
					}
				} else if (r.peekIf(Keyword.AS)) {
					this.append(node, r.consume());
					this.selectStatement(node, r);
				} else {
					throw r.createParseError();
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private createViewStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("CreateViewStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.CREATE));
				if (r.peekIf({ type: [Keyword.TEMPORARY, Keyword.TEMP] })) {
					apply(
						this.append(node, new Element("TemporaryOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				}
				this.append(node, r.consume(Keyword.VIEW));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfNotExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.NOT));
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(TokenType.LeftParen)) {
					this.append(node, r.consume());
					this.columnList(node, r);
					this.append(node, r.consume(TokenType.RightParen));
				}

				this.append(node, r.consume(Keyword.AS));
				this.selectStatement(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private createTriggerStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("CreateTriggerStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.CREATE));
				if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
					apply(
						this.append(node, new Element("TemporaryOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				}
				this.append(node, r.consume(Keyword.TRIGGER));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfNotExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.NOT));
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				let hasOption = false;
				if (r.peekIf(Keyword.BEFORE)) {
					apply(this.append(node, new Element("BeforeOption", {})), (node) => {
						this.append(node, r.consume());
					});
					hasOption = true;
				} else if (r.peekIf(Keyword.AFTER)) {
					apply(this.append(node, new Element("AfterOption", {})), (node) => {
						this.append(node, r.consume());
					});
					hasOption = true;
				} else if (r.peekIf(Keyword.INSTEAD)) {
					apply(
						this.append(node, new Element("InsteadOfOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.OF));
						},
					);
					hasOption = true;
				}

				if (r.peekIf(Keyword.INSERT)) {
					let current = new Element("InsertOnClause", {});
					const last = node.lastChild;
					if (last instanceof Element && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.append(node, r.consume());
						this.append(node, r.consume(Keyword.ON));

						const ident = this.identifier(node, r, "ObjectName");
						if (r.peekIf(TokenType.Dot)) {
							ident.name = "SchemaName";
							this.append(node, r.consume());
							this.identifier(node, r, "ObjectName");
						}
					});
				} else if (r.peekIf(Keyword.UPDATE)) {
					let current = new Element("UpdateOnClause", {});
					const last = node.lastChild;
					if (last instanceof Element && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.append(node, r.consume());
						if (r.peekIf(Keyword.OF)) {
							apply(
								this.append(node, new Element("ColumnList", {})),
								(node) => {
									this.append(node, r.consume());
									do {
										this.identifier(node, r, "ColumnName");
										if (r.peekIf(TokenType.Comma)) {
											this.append(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.append(node, r.consume(Keyword.ON));
							const ident = this.identifier(node, r, "ObjectName");
							if (r.peekIf(TokenType.Dot)) {
								ident.name = "SchemaName";
								this.append(node, r.consume());
								this.identifier(node, r, "ObjectName");
							}
						}
					});
				} else if (r.peekIf(Keyword.DELETE)) {
					let current = new Element("DeleteOnClause", {});
					const last = node.lastChild;
					if (last instanceof Element && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.append(node, r.consume());
						this.append(node, r.consume(Keyword.ON));
						const ident = this.identifier(node, r, "ObjectName");
						if (r.peekIf(TokenType.Dot)) {
							ident.name = "SchemaName";
							this.append(node, r.consume());
							this.identifier(node, r, "ObjectName");
						}
					});
				} else {
					throw r.createParseError();
				}

				if (r.peekIf(Keyword.FOR)) {
					apply(
						this.append(node, new Element("ForEachRowOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.EACH));
							this.append(node, r.consume(Keyword.ROW));
						},
					);
				}

				if (r.peekIf(Keyword.WHEN)) {
					apply(this.append(node, new Element("WhenClause", {})), (node) => {
						this.append(node, r.consume());
						this.expression(node, r);
					});
				}

				apply(this.append(node, new Element("BeginStatement", {})), (node) => {
					this.append(node, r.consume(Keyword.BEGIN));
					apply(this.append(node, new Element("BeginBlock", {})), (node) => {
						if (r.peekIf(Keyword.WITH)) {
							this.withClause(node, r);
						}
						if (r.peekIf(Keyword.INSERT) || r.peekIf(Keyword.REPLACE)) {
							this.insertStatement(node, r);
						} else if (r.peekIf(Keyword.UPDATE)) {
							this.updateStatement(node, r);
						} else if (r.peekIf(Keyword.DELETE)) {
							this.deleteStatement(node, r);
						} else if (r.peekIf(Keyword.SELECT)) {
							this.selectStatement(node, r);
						} else {
							throw r.createParseError();
						}
						this.append(node, r.consume(TokenType.SemiColon));
					});
					this.append(node, r.consume(Keyword.END));
				});
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private createIndexStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("CreateIndexStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.CREATE));
				if (r.peekIf(Keyword.UNIQUE)) {
					apply(this.append(node, new Element("UniqueOption", {})), (node) => {
						this.append(node, r.consume());
					});
				}
				this.append(node, r.consume(Keyword.INDEX));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfNotExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.NOT));
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				apply(this.append(node, new Element("IndexOnClause", {})), (node) => {
					this.append(node, r.consume(Keyword.ON));
					this.identifier(node, r, "ObjectName");
					this.append(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new Element("SortColumnList", {})),
						(node) => {
							do {
								this.sortColumn(node, r);
								if (r.peekIf(TokenType.Comma)) {
									this.append(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.append(node, r.consume(TokenType.RightParen));
				});

				if (r.peekIf(Keyword.WHERE)) {
					this.whereClause(node, r);
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private alterTableStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("AlterTableStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.ALTER));
				this.append(node, r.consume(Keyword.TABLE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
					apply(
						this.append(node, new Element("RenameToObjectClause", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume());
							this.identifier(node, r, "ObjectName");
						},
					);
				} else if (r.peekIf(Keyword.RENAME)) {
					apply(
						this.append(node, new Element("RenameColumnClause", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.COLUMN)) {
								this.append(node, r.consume());
							}
							this.identifier(node, r, "ColumnName");
							apply(
								this.append(node, new Element("RenameToColumnClause", {})),
								(node) => {
									this.append(node, r.consume(Keyword.TO));
									this.identifier(node, r, "ColumnName");
								},
							);
						},
					);
				} else if (r.peekIf(Keyword.ADD)) {
					apply(
						this.append(node, new Element("AddColumnClause", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.COLUMN)) {
								this.append(node, r.consume());
							}
							this.tableColumn(node, r);
						},
					);
				} else if (r.peekIf(Keyword.DROP)) {
					apply(
						this.append(node, new Element("DropColumnClause", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.COLUMN)) {
								this.append(node, r.consume());
							}
							this.identifier(node, r, "ColumnName");
						},
					);
				} else {
					throw r.createParseError();
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private dropTableStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("DropTableStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.DROP));
				this.append(node, r.consume(Keyword.TABLE));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private dropViewStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("DropViewStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.DROP));
				this.append(node, r.consume(Keyword.VIEW));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private dropTriggerStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("DropTriggerStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.DROP));
				this.append(node, r.consume(Keyword.TRIGGER));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new Element("IfExistsOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private dropIndexStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("DropIndexStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.DROP));
				this.append(node, r.consume(Keyword.INDEX));

				if (r.peekIf(Keyword.IF)) {
					apply(this.append(node, new Element("IfExists", {})), (node) => {
						this.append(node, r.consume());
						this.append(node, r.consume(Keyword.EXISTS));
					});
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private attachDatabaseStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("AttachDatabaseStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.ATTACH));
				if (r.peekIf(Keyword.DATABASE)) {
					this.append(node, r.consume());
				}
				apply(this.append(node, new Element("Database", {})), (node) => {
					this.expression(node, r);
				});
				this.append(node, r.consume(Keyword.AS));
				this.identifier(node, r, "SchemaName");
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private detachDatabaseStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("DetachDatabaseStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.DETACH));
				if (r.peekIf(Keyword.DATABASE)) {
					this.append(node, r.consume());
				}
				this.identifier(node, r, "SchemaName");
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private analyzeStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("AnalyzeStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.ANALYZE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private reindexStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("ReindexStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.REINDEX));

				if (r.peekIf({ type: [TokenType.Identifier, TokenType.String] })) {
					const ident = this.identifier(node, r, "ObjectName");
					if (r.peekIf(TokenType.Dot)) {
						ident.name = "SchemaName";
						this.append(node, r.consume());
						this.identifier(node, r, "ObjectName");
					}
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private vacuumStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("VacuumStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.VACUUM));

				if (r.peekIf({ type: [TokenType.Identifier, TokenType.String] })) {
					this.identifier(node, r, "SchemaName");
				}

				if (r.peekIf(Keyword.INTO)) {
					this.append(node, r.consume());
					apply(this.append(node, new Element("FileName", {})), (node) => {
						this.stringLiteral(node, r);
					});
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private pragmaStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("PragmaStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.PRAGMA));

				const ident = this.identifier(node, r, "PragmaName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "PragmaName");
				}

				if (r.peekIf({ type: TokenType.Operator, text: "=" })) {
					this.append(node, r.consume());
					this.pragmaValue(node, r);
				} else if (r.peekIf(TokenType.LeftParen)) {
					this.append(node, r.consume());
					apply(
						this.append(node, new Element("PragmaArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new Element("PragmaArgument", {})),
								(node) => {
									this.pragmaValue(node, r);
								},
							);
						},
					);
					this.append(node, r.consume(TokenType.RightParen));
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private beginTransactionStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("BeginTransactionStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.BEGIN));
				if (r.peekIf(Keyword.DEFERRED)) {
					apply(
						this.append(node, new Element("DeferredOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.IMMEDIATE)) {
					apply(
						this.append(node, new Element("ImmediateOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.EXCLUSIVE)) {
					apply(
						this.append(node, new Element("ExclusiveOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				}
				if (r.peekIf(Keyword.TRANSACTION)) {
					this.append(node, r.consume());
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private savepointStatement(parent: Element, r: TokenReader) {
		const current = this.append(parent, new Element("SavepointStatement", {}));
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.SAVEPOINT));
				this.identifier(node, r, "SavepointName");
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private releaseSavepointStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("ReleaseSavepointStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.RELEASE));
				if (r.peekIf(Keyword.SAVEPOINT)) {
					this.append(node, r.consume());
				}
				this.identifier(node, r, "SavepointName");
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private commitTransactionStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("CommitTransactionStatement", {}),
		);
		try {
			return apply(current, (node) => {
				if (r.peekIf(Keyword.END)) {
					this.append(node, r.consume());
				} else {
					this.append(node, r.consume(Keyword.COMMIT));
				}
				if (r.peekIf(Keyword.TRANSACTION)) {
					this.append(node, r.consume());
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private rollbackTransactionStatement(parent: Element, r: TokenReader) {
		const current = this.append(
			parent,
			new Element("RollbackTransactionStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.append(node, r.consume(Keyword.ROLLBACK));
				if (r.peekIf(Keyword.TRANSACTION)) {
					this.append(node, r.consume());
				}
				if (r.peekIf(Keyword.TO)) {
					this.append(node, r.consume());
					if (r.peekIf(Keyword.SAVEPOINT)) {
						this.append(node, r.consume());
					}
					this.identifier(node, r, "SavepointName");
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private insertStatement(parent: Element, r: TokenReader) {
		let current = new Element("InsertStatement", {});
		const last = parent.lastChild;
		if (last instanceof Element && last.name === "WithClause") {
			this.wrap(last, current);
		} else {
			current = this.append(parent, current);
		}
		try {
			return apply(current, (node) => {
				this.insertClause(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private insertClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("InsertClause", {})),
			(node) => {
				if (r.peekIf(Keyword.REPLACE)) {
					apply(this.append(node, new Element("ReplaceOption", {})), (node) => {
						this.append(node, r.consume());
					});
				} else {
					this.append(node, r.consume(Keyword.INSERT));
					if (r.peekIf(Keyword.OR)) {
						apply(
							this.append(node, new Element("OrConflictClause", {})),
							(node) => {
								this.append(node, r.consume());
								this.conflictAction(node, r);
							},
						);
					}
				}
				this.append(node, r.consume(Keyword.INTO));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.AS)) {
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				}

				if (r.peekIf(TokenType.LeftParen)) {
					this.append(node, r.consume());
					this.columnList(node, r);
					this.append(node, r.consume(TokenType.RightParen));
				}

				if (r.peekIf(Keyword.DEFAULT)) {
					apply(
						this.append(node, new Element("DefaultValuesOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.VALUES));
						},
					);
				} else {
					if (r.peekIf(Keyword.VALUES)) {
						apply(
							this.append(node, new Element("ValuesClause", {})),
							(node) => {
								this.append(node, r.consume());
								apply(
									this.append(node, new Element("ExpressionListGroup", {})),
									(node) => {
										do {
											this.append(node, r.consume(TokenType.LeftParen));
											const current = this.expressionList(node, r);
											this.append(node, r.consume(TokenType.RightParen));

											if (r.peekIf(TokenType.Comma)) {
												this.append(node, r.consume());
											} else {
												break;
											}
										} while (!r.peek().eos);
									},
								);
							},
						);
					} else {
						if (r.peekIf(Keyword.WITH)) {
							this.withClause(node, r);
						}
						this.selectStatement(node, r);
					}

					do {
						if (r.peekIf(Keyword.ON)) {
							this.onConflictClause(node, r);
						} else {
							break;
						}
					} while (!r.peek().eos);
				}

				if (r.peekIf(Keyword.RETURNING)) {
					this.returningClause(node, r);
				}
			},
		);
	}

	private onConflictClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("OnConflictClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.ON));
				this.append(node, r.consume(Keyword.CONFLICT));
				if (r.peekIf(TokenType.LeftParen)) {
					this.append(node, r.consume());
					apply(
						this.append(node, new Element("SortColumnList", {})),
						(node) => {
							do {
								this.sortColumn(node, r);
								if (r.peekIf(TokenType.Comma)) {
									this.append(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.append(node, r.consume(TokenType.RightParen));
					if (r.peekIf(Keyword.WHERE)) {
						this.whereClause(node, r);
					}
				}
				this.append(node, r.consume(Keyword.DO));
				if (r.peekIf(Keyword.NOTHING)) {
					apply(
						this.append(node, new Element("DoNothingOption", {})),
						(node) => {
							this.append(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.UPDATE)) {
					apply(
						this.append(node, new Element("DoUpdateOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.setClause(node, r);
							if (r.peekIf(Keyword.WHERE)) {
								this.whereClause(node, r);
							}
						},
					);
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private updateStatement(parent: Element, r: TokenReader) {
		let current = new Element("UpdateStatement", {});
		const last = parent.lastChild;
		if (last instanceof Element && last.name === "WithClause") {
			this.wrap(last, current);
		} else {
			current = this.append(parent, current);
		}
		try {
			return apply(current, (node) => {
				this.updateClause(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private updateClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("UpdateClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.UPDATE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.AS)) {
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				}

				if (r.peekIf(Keyword.INDEXED)) {
					apply(
						this.append(node, new Element("IndexedByOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.BY));
							this.identifier(node, r, "ObjectName");
						},
					);
				} else if (r.peekIf(Keyword.NOT)) {
					apply(
						this.append(node, new Element("NotIndexedOption", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.INDEXED));
						},
					);
				}

				this.setClause(node, r);
				if (r.peekIf(Keyword.FROM)) {
					this.fromClause(node, r);
				}
				if (r.peekIf(Keyword.WHERE)) {
					this.whereClause(node, r);
				}
				if (r.peekIf(Keyword.RETURNING)) {
					this.returningClause(node, r);
				}
				if (r.peekIf(Keyword.ORDER)) {
					this.orderByClause(node, r);
				}
				if (r.peekIf(Keyword.LIMIT)) {
					this.limitClause(node, r);
				}
			},
		);
	}

	private setClause(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("SetClause", {})), (node) => {
			this.append(node, r.consume(Keyword.SET));
			apply(this.append(node, new Element("UpdateColumnList", {})), (node) => {
				do {
					apply(this.append(node, new Element("UpdateColumn", {})), (node) => {
						if (r.peekIf(TokenType.LeftParen)) {
							this.append(node, r.consume());
							this.columnList(node, r);
							this.append(node, r.consume(TokenType.RightParen));
						} else {
							this.identifier(node, r, "ColumnName");
						}
						this.append(
							node,
							r.consume({ type: TokenType.Operator, text: "=" }),
						);
						apply(this.append(node, new Element("ColumnValue", {})), (node) => {
							this.expression(node, r);
						});
					});

					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			});
		});
	}

	private deleteStatement(parent: Element, r: TokenReader) {
		let current = new Element("DeleteStatement", {});
		const last = parent.lastChild;
		if (last instanceof Element && last.name === "WithClause") {
			this.wrap(last, current);
		} else {
			current = this.append(parent, current);
		}
		try {
			return apply(current, (node) => {
				this.deleteClause(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private deleteClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("DeleteClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.DELETE));
				this.append(node, r.consume(Keyword.FROM));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.append(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.WHERE)) {
					this.whereClause(node, r);
				}
				if (r.peekIf(Keyword.RETURNING)) {
					this.returningClause(node, r);
				}
			},
		);
	}

	private selectStatement(parent: Element, r: TokenReader) {
		let current = new Element("SelectStatement", {});
		const last = parent.lastChild;
		if (last instanceof Element && last.name === "WithClause") {
			this.wrap(last, current);
		} else {
			current = this.append(parent, current);
		}
		try {
			return apply(current, (node) => {
				let current = this.selectClause(node, r);
				while (
					!this.compileOptions.has("SQLITE_OMIT_COMPOUND_SELECT") &&
					!r.peek().eos
				) {
					if (r.peekIf(Keyword.UNION)) {
						current = apply(
							this.wrap(current, new Element("UnionOperation", {})),
							(node) => {
								this.append(node, r.consume());
								if (r.peekIf(Keyword.ALL)) {
									apply(
										this.append(node, new Element("AllOption", {})),
										(node) => {
											this.append(node, r.consume());
										},
									);
								}
								this.selectClause(node, r);
							},
						);
					} else if (r.peekIf(Keyword.INTERSECT)) {
						current = apply(
							this.wrap(current, new Element("IntersectOperation", {})),
							(node) => {
								this.append(node, r.consume());
								this.selectClause(node, r);
							},
						);
					} else if (r.peekIf(Keyword.EXCEPT)) {
						current = apply(
							this.wrap(current, new Element("ExceptOperation", {})),
							(node) => {
								this.append(node, r.consume());
								this.selectClause(node, r);
							},
						);
					} else {
						break;
					}
				}

				if (r.peekIf(Keyword.ORDER)) {
					this.orderByClause(node, r);
				}
				if (r.peekIf(Keyword.LIMIT)) {
					this.limitClause(node, r);
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private selectClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("SelectClause", {})),
			(node) => {
				if (r.peekIf(Keyword.VALUES)) {
					apply(this.append(node, new Element("ValuesClause", {})), (node) => {
						this.append(node, r.consume(Keyword.VALUES));
						this.append(node, r.consume(TokenType.LeftParen));
						this.expressionList(node, r);
						this.append(node, r.consume(TokenType.RightParen));
					});
				} else {
					this.append(node, r.consume(Keyword.SELECT));
					if (r.peekIf(Keyword.DISTINCT)) {
						apply(
							this.append(node, new Element("DistinctOption", {})),
							(node) => {
								this.append(node, r.consume());
							},
						);
					} else if (r.peekIf(Keyword.ALL)) {
						apply(this.append(node, new Element("AllOption", {})), (node) => {
							this.append(node, r.consume());
						});
					}
					this.selectColumnList(node, r);

					if (r.peekIf(Keyword.FROM)) {
						this.fromClause(node, r);
					}
					if (r.peekIf(Keyword.WHERE)) {
						this.whereClause(node, r);
					}
					if (r.peekIf(Keyword.GROUP)) {
						this.gropuByClause(node, r);
					}
					if (r.peekIf(Keyword.HAVING)) {
						this.havingClause(node, r);
					}
					if (
						!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
						r.peekIf(Keyword.WINDOW)
					) {
						this.windowClause(node, r);
					}
				}
			},
		);
	}

	private withClause(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("WithClause", {})), (node) => {
			this.append(node, r.consume(Keyword.WITH));

			if (r.peekIf(Keyword.RECURSIVE)) {
				apply(this.append(node, new Element("RecursiveOption", {})), (node) => {
					this.append(node, r.consume());
				});
			}

			apply(this.append(node, new Element("CommonTableList", {})), (node) => {
				do {
					apply(this.append(node, new Element("CommonTable", {})), (node) => {
						this.identifier(node, r, "ObjectName");
						if (r.peekIf(TokenType.LeftParen)) {
							this.append(node, r.consume());
							this.columnList(node, r);
							this.append(node, r.consume(TokenType.RightParen));
						}
						this.append(node, r.consume(Keyword.AS));

						if (
							r.peekIf(Keyword.MATERIALIZED) ||
							r.peekIf(Keyword.NOT, Keyword.MATERIALIZED)
						) {
							apply(
								this.append(node, new Element("MaterializedOption", {})),
								(node) => {
									if (r.peekIf(Keyword.NOT)) {
										node.name = "NotMaterializedOption";
										this.append(node, r.consume());
									}
									this.append(node, r.consume());
								},
							);
						}

						this.append(node, r.consume(TokenType.LeftParen));
						this.selectStatement(node, r);
						this.append(node, r.consume(TokenType.RightParen));
					});

					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			});
		});
	}

	private selectColumnList(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("SelectColumnList", {})),
			(node) => {
				do {
					apply(this.append(node, new Element("SelectColumn", {})), (node) => {
						if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
							apply(
								this.append(node, new Element("AllColumnsOption", {})),
								(node) => {
									this.append(node, r.consume());
								},
							);
						} else if (
							r.peekIf(
								{ type: [TokenType.Identifier, TokenType.String] },
								TokenType.Dot,
								{ type: TokenType.Operator, text: "*" },
							)
						) {
							apply(
								this.append(node, new Element("AllColumnsOption", {})),
								(node) => {
									this.identifier(node, r, "SchemaName");
									this.append(node, r.consume());
									this.append(node, r.consume());
								},
							);
						} else {
							this.expression(node, r);
							if (r.peekIf(Keyword.AS)) {
								this.append(node, r.consume());
								this.identifier(node, r, "ColumnAlias");
							} else if (
								r.peekIf({ type: [TokenType.Identifier, TokenType.String] })
							) {
								this.identifier(node, r, "ColumnAlias");
							}
						}
					});
					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private fromClause(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("FromClause", {})), (node) => {
			this.append(node, r.consume(Keyword.FROM));
			apply(this.append(node, new Element("FromObjectList", {})), (node) => {
				let hasJoinClause = false;
				do {
					const fromObject = this.fromObject(node, r);

					while (
						r.peekIf({
							type: [
								Keyword.NATURAL,
								Keyword.JOIN,
								Keyword.CROSS,
								Keyword.INNER,
								Keyword.LEFT,
								Keyword.RIGHT,
								Keyword.FULL,
							],
						})
					) {
						hasJoinClause = true;
						this.joinClause(fromObject, r);
					}

					if (!hasJoinClause && r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			});
		});
	}

	private fromObject(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("FromObject", {})), (node) => {
			if (r.peekIf(TokenType.LeftParen)) {
				this.append(node, r.consume());
				apply(
					this.append(node, new Element("SubqueryExpression", {})),
					(node) => {
						if (r.peekIf({ type: [Keyword.WITH, Keyword.SELECT] })) {
							if (r.peekIf(Keyword.WITH)) {
								this.withClause(node, r);
							}
							this.selectStatement(node, r);
						} else {
							this.fromClause(node, r);
						}
					},
				);
				this.append(node, r.consume(TokenType.RightParen));
			} else {
				apply(this.append(node, new Element("ObjectReference", {})), (node) => {
					const ident = this.identifier(node, r, "ObjectName");
					if (r.peekIf(TokenType.Dot)) {
						ident.name = "SchemaName";
						this.append(node, r.consume());
						this.identifier(node, r, "ObjectName");
					}
					if (r.peekIf(TokenType.LeftParen)) {
						node.name = "FunctionExpression";
						this.append(node, r.consume());
						apply(
							this.append(node, new Element("FunctionArgumentList", {})),
							(node) => {
								while (!r.peekIf(TokenType.RightParen)) {
									apply(
										this.append(node, new Element("FunctionArgument", {})),
										(node) => {
											this.expression(node, r);
										},
									);
									if (r.peekIf(TokenType.Comma)) {
										this.append(node, r.consume());
									} else {
										break;
									}
								}
							},
						);
						this.append(node, r.consume(TokenType.RightParen));
					}
				});
			}

			if (r.peekIf(Keyword.AS)) {
				this.append(node, r.consume());
				this.identifier(node, r, "ObjectAlias");
			} else if (r.peekIf(TokenType.Identifier)) {
				this.identifier(node, r, "ObjectAlias");
			}
		});
	}

	private joinClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("InnerJoinClause", {})),
			(node) => {
				if (r.peekIf(Keyword.CROSS)) {
					node.name = "CrossJoinClause";
					this.append(node, r.consume());
				} else {
					if (r.peekIf(Keyword.NATURAL)) {
						apply(
							this.append(node, new Element("NatualOption", {})),
							(node) => {
								this.append(node, r.consume());
							},
						);
					}
					if (r.peekIf(Keyword.LEFT)) {
						node.name = "LeftOuterJoinClause";
						this.append(node, r.consume());
						if (r.peekIf(Keyword.OUTER)) {
							this.append(node, r.consume());
						}
					} else if (r.peekIf(Keyword.RIGHT)) {
						node.name = "RightOuterJoinClause";
						this.append(node, r.consume());
						if (r.peekIf(Keyword.OUTER)) {
							this.append(node, r.consume());
						}
					} else if (r.peekIf(Keyword.FULL)) {
						node.name = "FullOuterJoinClause";
						this.append(node, r.consume());
						if (r.peekIf(Keyword.OUTER)) {
							this.append(node, r.consume());
						}
					} else if (r.peekIf(Keyword.INNER)) {
						this.append(node, r.consume());
					}
				}
				this.append(node, r.consume(Keyword.JOIN));

				this.fromObject(node, r);

				if (r.peekIf(Keyword.ON)) {
					apply(this.append(node, new Element("JoinOnClause", {})), (node) => {
						this.append(node, r.consume());
						this.expression(node, r);
					});
				} else if (r.peekIf(Keyword.USING)) {
					apply(this.append(node, new Element("UsingClause", {})), (node) => {
						this.append(node, r.consume());
						this.append(node, r.consume(TokenType.LeftParen));
						this.append(node, r.consume(TokenType.RightParen));
					});
				}
			},
		);
	}

	private whereClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("WhereClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.WHERE));
				this.expression(node, r);
			},
		);
	}

	private gropuByClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("GroupByClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.GROUP));
				this.append(node, r.consume(Keyword.BY));
				this.expressionList(node, r);
			},
		);
	}

	private havingClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("HavingClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.HAVING));
				this.expression(node, r);
			},
		);
	}

	private windowClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("WindowClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.WINDOW));
				do {
					this.identifier(node, r, "WindowName");
					this.append(node, r.consume(Keyword.AS));
					this.window(node, r);
					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private window(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("Window", {})), (node) => {
			if (!r.peekIf(Keyword.PARTITION)) {
				this.identifier(node, r, "BaseWindowName");
			}
			if (r.peekIf(Keyword.PARTITION)) {
				this.partitionByClause(node, r);
			}
			if (r.peekIf(Keyword.ORDER)) {
				this.orderByClause(node, r);
			}
			apply(this.append(node, new Element("FrameClause", {})), (node) => {
				if (r.peekIf(Keyword.RANGE)) {
					apply(this.append(node, new Element("RangeOption", {})), (node) => {
						this.append(node, r.consume());
					});
				} else if (r.peekIf(Keyword.ROWS)) {
					apply(this.append(node, new Element("RowsOption", {})), (node) => {
						this.append(node, r.consume());
					});
				} else if (r.peekIf(Keyword.GROUPS)) {
					apply(this.append(node, new Element("GroupsOption", {})), (node) => {
						this.append(node, r.consume());
					});
				}
				if (r.peekIf(Keyword.CURRENT)) {
					apply(
						this.append(node, new Element("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new Element("CurrentRowOption", {})),
								(node) => {
									this.append(node, r.consume());
									this.append(node, r.consume(Keyword.ROW));
								},
							);
						},
					);
				} else if (r.peekIf(Keyword.UNBOUNDED)) {
					apply(
						this.append(node, new Element("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new Element("UnboundedPrecedingOption", {})),
								(node) => {
									this.append(node, r.consume());
									this.append(node, r.consume(Keyword.PRECEDING));
								},
							);
						},
					);
				} else if (r.peekIf(Keyword.BETWEEN)) {
					this.append(node, r.consume());
					apply(
						this.append(node, new Element("FrameStartClause", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.CURRENT)) {
								apply(
									this.append(node, new Element("CurrentRowOption", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.ROW));
									},
								);
							} else if (r.peekIf(Keyword.UNBOUNDED)) {
								apply(
									this.append(
										node,
										new Element("UnboundedPrecedingOption", {}),
									),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.PRECEDING));
									},
								);
							} else {
								if (r.peekIf(Keyword.PRECEDING)) {
									apply(
										this.append(node, new Element("PrecedingOption", {})),
										(node) => {
											this.expression(node, r);
											this.append(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.FOLLOWING)) {
									apply(
										this.append(node, new Element("FollowingOption", {})),
										(node) => {
											this.expression(node, r);
											this.append(node, r.consume());
										},
									);
								} else {
									throw r.createParseError();
								}
							}
						},
					);
					this.append(node, r.consume(Keyword.AND));
					apply(
						this.append(node, new Element("FrameEndClause", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.CURRENT)) {
								apply(
									this.append(node, new Element("CurrentRowOption", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.ROW));
									},
								);
							} else if (r.peekIf(Keyword.UNBOUNDED)) {
								apply(
									this.append(
										node,
										new Element("UnboundedFollowingOption", {}),
									),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.FOLLOWING));
									},
								);
							} else {
								if (r.peekIf(Keyword.PRECEDING)) {
									apply(
										this.append(node, new Element("PrecedingOption", {})),
										(node) => {
											this.expression(node, r);
											this.append(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.FOLLOWING)) {
									apply(
										this.append(node, new Element("FollowingOption", {})),
										(node) => {
											this.expression(node, r);
											this.append(node, r.consume());
										},
									);
								} else {
									throw r.createParseError();
								}
							}
						},
					);
				} else {
					apply(
						this.append(node, new Element("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new Element("PrecedingOption", {})),
								(node) => {
									this.expression(node, r);
									this.append(node, r.consume(Keyword.PRECEDING));
								},
							);
						},
					);
				}
			});
			if (r.peekIf(Keyword.EXCLUDE)) {
				apply(this.append(node, new Element("ExcludeClause", {})), (node) => {
					this.append(node, r.consume());
					if (r.peekIf(Keyword.NO)) {
						apply(
							this.append(node, new Element("NoOthersOption", {})),
							(node) => {
								this.append(node, r.consume());
								this.append(node, r.consume(Keyword.OTHERS));
							},
						);
					} else if (r.peekIf(Keyword.CURRENT)) {
						apply(
							this.append(node, new Element("CurrentRowOption", {})),
							(node) => {
								this.append(node, r.consume());
								this.append(node, r.consume(Keyword.ROW));
							},
						);
					} else if (r.peekIf(Keyword.GROUP)) {
						apply(this.append(node, new Element("GroupOption", {})), (node) => {
							this.append(node, r.consume());
						});
					} else if (r.peekIf(Keyword.TIES)) {
						apply(this.append(node, new Element("TiesOption", {})), (node) => {
							this.append(node, r.consume());
						});
					} else {
						throw r.createParseError();
					}
				});
			}
		});
	}

	private partitionByClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("PartitionByClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.PARTITION));
				this.append(node, r.consume(Keyword.BY));
				do {
					this.expression(node, r);
					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private returningClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("ReturningClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.RETURNING));
				this.selectColumnList(node, r);
			},
		);
	}

	private orderByClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("OrderByClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.ORDER));
				this.append(node, r.consume(Keyword.BY));
				apply(this.append(node, new Element("SortColumnList", {})), (node) => {
					do {
						apply(this.sortColumn(node, r), (node) => {
							if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
								apply(
									this.append(node, new Element("NullsFirstOption", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
								apply(
									this.append(node, new Element("NullsLastOption", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume());
									},
								);
							}
						});

						if (r.peekIf(TokenType.Comma)) {
							this.append(node, r.consume());
						} else {
							break;
						}
					} while (!r.peek().eos);
				});
			},
		);
	}

	private limitClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("LimitClause", {})),
			(node) => {
				this.append(node, r.consume(Keyword.LIMIT));
				apply(this.append(node, new Element("LimitOption", {})), (node) => {
					this.expression(node, r);
				});
				if (r.peekIf(Keyword.OFFSET)) {
					apply(this.append(node, new Element("OffsetOption", {})), (node) => {
						this.append(node, r.consume());
						this.expression(node, r);
					});
				} else if (r.peekIf(TokenType.Comma)) {
					node.name = "OffsetOption";
					this.append(node, r.consume());
					apply(this.append(node, new Element("LimitOption", {})), (node) => {
						this.expression(node, r);
					});
				}
			},
		);
	}

	private tableColumn(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("TableColumn", {})),
			(node) => {
				this.identifier(node, r, "ColumnName");
				if (r.peekIf(TokenType.Identifier)) {
					this.columnType(node, r);
				}

				while (
					r.peekIf({
						type: [
							Keyword.CONSTRAINT,
							Keyword.PRIMARY,
							Keyword.NOT,
							Keyword.UNIQUE,
							Keyword.CHECK,
							Keyword.DEFAULT,
							Keyword.COLLATE,
							Keyword.REFERENCES,
						],
					}) ||
					(!this.compileOptions.has("SQLITE_OMIT_GENERATED_COLUMNS") &&
						r.peekIf({ type: [Keyword.GENERATED, Keyword.AS] }))
				) {
					this.columnConstraint(node, r);
				}
			},
		);
	}

	private columnType(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("ColumnType", {})), (node) => {
			apply(this.append(node, new Element("TypeName", {})), (node) => {
				const token = r.consume();
				this.append(node, token);
				node.attribs.value = token.text;
				while (r.peekIf(TokenType.Identifier)) {
					const token = r.consume();
					this.append(node, token);
					node.attribs.value = `${node.attribs.value} ${token.text}`;
				}
			});
			if (r.peekIf(TokenType.LeftParen)) {
				this.append(node, r.consume());
				apply(this.append(node, new Element("TypeOptionList", {})), (node) => {
					apply(this.append(node, new Element("LengthOption", {})), (node) => {
						this.numericLiteral(node, r);
					});
					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
						apply(this.append(node, new Element("ScaleOption", {})), (node) => {
							this.numericLiteral(node, r);
						});
					}
				});
				this.append(node, r.consume(TokenType.RightParen));
			}
		});
	}

	private columnConstraint(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("ColumnConstraint", {})),
			(node) => {
				if (r.peekIf(Keyword.CONSTRAINT)) {
					this.append(node, r.consume());
					this.identifier(node, r, "ConstraintName");
				}
				if (r.peekIf(Keyword.PRIMARY)) {
					apply(
						this.append(node, new Element("PrimaryKeyConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.KEY));

							if (r.peekIf(Keyword.ASC)) {
								apply(
									this.append(node, new Element("AscOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.DESC)) {
								apply(
									this.append(node, new Element("DescOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							}
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new Element("OnConflictClause", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
							if (r.peekIf(Keyword.AUTOINCREMENT)) {
								apply(
									this.append(node, new Element("AutoincrementOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.NOT)) {
					apply(
						this.append(node, new Element("NotNullConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.NULL));
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new Element("OnConflictClause", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.NULL)) {
					apply(
						this.append(node, new Element("NullConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new Element("OnConflictClause", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.UNIQUE)) {
					apply(
						this.append(node, new Element("UniqueConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new Element("OnConflictClause", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.CHECK)) {
					apply(
						this.append(node, new Element("CheckConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(TokenType.LeftParen));
							this.expression(node, r);
							this.append(node, r.consume(TokenType.RightParen));
						},
					);
				} else if (r.peekIf(Keyword.DEFAULT)) {
					apply(this.append(node, new Element("DefaultOption", {})), (node) => {
						this.append(node, r.consume());
						if (r.peekIf(TokenType.LeftParen)) {
							this.append(node, r.consume());
							this.expression(node, r);
							this.append(node, r.consume(TokenType.RightParen));
						} else {
							this.expression(node, r);
						}
					});
				} else if (r.peekIf(Keyword.COLLATE)) {
					apply(this.append(node, new Element("CollateOption", {})), (node) => {
						this.append(node, r.consume());
						this.identifier(node, r, "CollateName");
					});
				} else if (r.peekIf(Keyword.REFERENCES)) {
					apply(
						this.append(node, new Element("ForeignKeyConstraint", {})),
						(node) => {
							this.referencesClause(node, r);
						},
					);
				} else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
					apply(
						this.append(node, new Element("GeneratedColumnOption", {})),
						(node) => {
							if (r.peekIf(Keyword.GENERATED)) {
								this.append(node, r.consume());
								this.append(node, r.consume(Keyword.ALWAYS));
							}
							this.append(node, r.consume(Keyword.AS));
							this.append(node, r.consume(TokenType.LeftParen));
							apply(
								this.append(node, new Element("GeneratedColumn", {})),
								(node) => {
									this.expression(node, r);
								},
							);
							this.append(node, r.consume(TokenType.RightParen));

							if (r.peekIf(Keyword.STORED)) {
								apply(
									this.append(node, new Element("StoredOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.VIRTUAL)) {
								apply(
									this.append(node, new Element("virtual option", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							}
						},
					);
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private tableConstraint(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("TableConstraint", {})),
			(node) => {
				if (r.peekIf(Keyword.CONSTRAINT)) {
					this.append(node, r.consume());
					this.identifier(node, r, "ConstraintName");
				}
				if (r.peekIf(Keyword.PRIMARY)) {
					apply(
						this.append(node, new Element("PrimaryKeyConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.KEY));
							this.append(node, r.consume(TokenType.LeftParen));
							apply(
								this.append(node, new Element("SortColumnList", {})),
								(node) => {
									do {
										this.sortColumn(node, r);
										if (r.peekIf(TokenType.Comma)) {
											this.append(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.append(node, r.consume(TokenType.RightParen));
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new Element("OnConflictClause", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.UNIQUE)) {
					apply(
						this.append(node, new Element("UniqueConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(TokenType.LeftParen));
							apply(
								this.append(node, new Element("SortColumnList", {})),
								(node) => {
									do {
										this.sortColumn(node, r);
										if (r.peekIf(TokenType.Comma)) {
											this.append(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.append(node, r.consume(TokenType.RightParen));
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new Element("OnConflictClause", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.CHECK)) {
					apply(
						this.append(node, new Element("CheckConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(TokenType.LeftParen));
							this.expression(node, r);
							this.append(node, r.consume(TokenType.RightParen));
						},
					);
				} else if (r.peekIf(Keyword.FOREIGN)) {
					apply(
						this.append(node, new Element("ForeignKeyConstraint", {})),
						(node) => {
							this.append(node, r.consume());
							this.append(node, r.consume(Keyword.KEY));
							this.append(node, r.consume(TokenType.LeftParen));
							this.columnList(node, r);
							this.append(node, r.consume(TokenType.RightParen));
							this.referencesClause(node, r);
						},
					);
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private referencesClause(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("ReferencesClause", {})),
			(node) => {
				this.append(node, r.consume());
				this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.LeftParen)) {
					this.append(node, r.consume());
					this.columnList(node, r);
					this.append(node, r.consume(TokenType.RightParen));
				}

				while (
					!r.peek().eos &&
					r.peekIf({ type: [Keyword.ON, Keyword.MATCH] })
				) {
					if (r.peekIf(Keyword.ON)) {
						apply(
							this.append(node, new Element("OnUpdateClause", {})),
							(node) => {
								this.append(node, r.consume());
								if (r.peekIf(Keyword.DELETE)) {
									node.name = "OnDeleteClause";
									this.append(node, r.consume());
								} else {
									this.append(node, r.consume(Keyword.UPDATE));
								}
								if (r.peekIf(Keyword.SET, Keyword.NULL)) {
									apply(
										this.append(node, new Element("SetNullOption", {})),
										(node) => {
											this.append(node, r.consume());
											this.append(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.SET, Keyword.DEFAULT)) {
									apply(
										this.append(node, new Element("SetDefaultOption", {})),
										(node) => {
											this.append(node, r.consume());
											this.append(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.CASCADE)) {
									apply(
										this.append(node, new Element("CascadeOption", {})),
										(node) => {
											this.append(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.RESTRICT)) {
									apply(
										this.append(node, new Element("RestrictOption", {})),
										(node) => {
											this.append(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.NO, Keyword.ACTION)) {
									apply(
										this.append(node, new Element("NoActionOption", {})),
										(node) => {
											this.append(node, r.consume());
											this.append(node, r.consume());
										},
									);
								} else {
									throw r.createParseError();
								}
							},
						);
					} else if (r.peekIf(Keyword.MATCH)) {
						apply(this.append(node, new Element("MatchClause", {})), (node) => {
							this.append(node, r.consume());
							if (r.peekIf(Keyword.SIMPLE)) {
								apply(
									this.append(node, new Element("SimpleOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.FULL)) {
								apply(
									this.append(node, new Element("FullOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.PARTIAL)) {
								apply(
									this.append(node, new Element("PartialOption", {})),
									(node) => {
										this.append(node, r.consume());
									},
								);
							} else {
								throw r.createParseError();
							}
						});
					} else {
						throw r.createParseError();
					}
				}

				if (
					r.peekIf(Keyword.DEFERRABLE) ||
					r.peekIf(Keyword.NOT, Keyword.DEFERRABLE)
				) {
					apply(
						this.append(node, new Element("DeferrableOption", {})),
						(node) => {
							if (r.peekIf(Keyword.NOT)) {
								node.name = "NotDeferrableOption";
								this.append(node, r.consume());
							}
							this.append(node, r.consume());

							if (r.peekIf(Keyword.INITIALLY, Keyword.DEFERRED)) {
								apply(
									this.append(node, new Element("InitiallyDeferredOption", {})),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.INITIALLY, Keyword.IMMEDIATE)) {
								apply(
									this.append(
										node,
										new Element("InitiallyImmediateOption", {}),
									),
									(node) => {
										this.append(node, r.consume());
										this.append(node, r.consume());
									},
								);
							}
						},
					);
				}
			},
		);
	}

	private conflictAction(parent: Element, r: TokenReader) {
		if (r.peekIf(Keyword.ROLLBACK)) {
			return apply(
				this.append(parent, new Element("RollbackOption", {})),
				(node) => {
					this.append(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.ABORT)) {
			return apply(
				this.append(parent, new Element("AbortOption", {})),
				(node) => {
					this.append(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.FAIL)) {
			return apply(
				this.append(parent, new Element("FailOption", {})),
				(node) => {
					this.append(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.IGNORE)) {
			return apply(
				this.append(parent, new Element("IgnoreOption", {})),
				(node) => {
					this.append(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.REPLACE)) {
			return apply(
				this.append(parent, new Element("ReplaceOption", {})),
				(node) => {
					this.append(node, r.consume());
				},
			);
		} else {
			throw r.createParseError();
		}
	}

	private pragmaValue(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("PragmaValue", {})),
			(node) => {
				if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
					apply(this.append(node, new Element("Expression", {})), (node) => {
						apply(
							this.append(node, new Element("UnaryPlusOperation", {})),
							(node) => {
								this.append(node, r.consume());
								this.numericLiteral(node, r);
							},
						);
					});
				} else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
					apply(this.append(node, new Element("Expression", {})), (node) => {
						apply(
							this.append(node, new Element("UnaryMinusOperation", {})),
							(node) => {
								this.append(node, r.consume());
								this.numericLiteral(node, r);
							},
						);
					});
				} else if (r.peekIf(TokenType.Numeric)) {
					this.numericLiteral(node, r);
				} else if (r.peekIf(TokenType.String)) {
					this.stringLiteral(node, r);
				} else if (r.peekIf(TokenType.Identifier)) {
					this.identifier(node, r, "PragmaLiteral");
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private expressionList(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("ExpressionList", {})),
			(node) => {
				do {
					this.expression(node, r);
					if (r.peekIf(TokenType.Comma)) {
						this.append(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private expression(parent: Element, r: TokenReader, precedence = 0) {
		let current: Element = parent;
		if (precedence === 0) {
			current = this.append(parent, new Element("Expression", {}));
		}
		if (r.peekIf(Keyword.NOT)) {
			current = apply(
				this.append(current, new Element("NotOperation", {})),
				(node) => {
					this.append(node, r.consume());
					this.expression(node, r, 3);
				},
			);
		} else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
			current = apply(
				this.append(current, new Element("BitwiseNotOperation", {})),
				(node) => {
					this.append(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
			current = apply(
				this.append(current, new Element("UnaryPlusOperation", {})),
				(node) => {
					this.append(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
			current = apply(
				this.append(current, new Element("UnaryMinusOperation", {})),
				(node) => {
					this.append(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else {
			current = this.expressionValue(current, r);
		}

		while (!r.peek().eos) {
			if (precedence < 1 && r.peekIf(Keyword.OR)) {
				current = apply(
					this.wrap(current, new Element("OrOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 1);
					},
				);
			} else if (precedence < 2 && r.peekIf(Keyword.AND)) {
				current = apply(
					this.wrap(current, new Element("AndOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 2);
					},
				);
			} else if (
				precedence < 4 &&
				r.peekIf({ type: TokenType.Operator, text: ["=", "=="] })
			) {
				current = apply(
					this.wrap(current, new Element("EqualOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				r.peekIf({ type: TokenType.Operator, text: ["<>", "!="] })
			) {
				current = apply(
					this.wrap(current, new Element("NotEqualOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.IS)) {
				current = apply(this.wrap(current, new Element("Is", {})), (node) => {
					this.append(node, r.consume());
					if (r.peekIf(Keyword.NOT)) {
						this.append(node, r.consume());
						node.name += "Not";
					}
					if (r.peekIf(Keyword.DISTINCT)) {
						this.append(node, r.consume());
						this.append(node, r.consume(Keyword.FROM));
						node.name += "DistinctFromOperation";
					} else {
						node.name += "Operation";
					}
					this.expression(node, r, 4);
				});
			} else if (
				(precedence < 4 && r.peekIf(Keyword.BETWEEN)) ||
				r.peekIf(Keyword.NOT, Keyword.BETWEEN)
			) {
				current = apply(
					this.wrap(current, new Element("BetweenOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.append(node, r.consume());
							node.name = `Not${node.name}`;
						}
						this.append(node, r.consume());
						this.expression(node, r, 4);
						this.append(node, r.consume(Keyword.AND));
						this.expression(node, r, 4);
					},
				);
			} else if (
				(precedence < 4 && r.peekIf(Keyword.IN)) ||
				r.peekIf(Keyword.NOT, Keyword.IN)
			) {
				current = apply(
					this.wrap(current, new Element("InOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.append(node, r.consume());
							node.name = `Not${node.name}`;
						}
						this.append(node, r.consume());
						if (
							r.peekIf(TokenType.LeftParen, {
								type: [Keyword.WITH, Keyword.SELECT],
							})
						) {
							apply(
								this.append(node, new Element("SubqueryExpression", {})),
								(node) => {
									this.append(node, r.consume());
									if (r.peekIf(Keyword.WITH)) {
										this.withClause(node, r);
									}
									this.selectStatement(node, r);
									this.append(node, r.consume(TokenType.RightParen));
								},
							);
						} else if (r.peekIf(TokenType.LeftParen)) {
							this.append(node, r.consume());
							this.expressionList(node, r);
							this.append(node, r.consume(TokenType.RightParen));
						} else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
							apply(
								this.append(node, new Element("FunctionExpression", {})),
								(node) => {
									apply(
										this.append(node, new Element("ObjectName", {})),
										(node) => {
											this.append(node, r.consume());
										},
									);
									this.append(node, r.consume(TokenType.LeftParen));
									apply(
										this.append(node, new Element("FunctionArgumentList", {})),
										(node) => {
											while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
												apply(
													this.append(
														node,
														new Element("FunctionArgument", {}),
													),
													(node) => {
														this.expression(node, r);
													},
												);
												if (r.peekIf(TokenType.Comma)) {
													this.append(node, r.consume());
												} else {
													break;
												}
											}
										},
									);
									this.append(node, r.consume(TokenType.RightParen));
								},
							);
						} else if (
							r.peekIf({ type: [TokenType.Identifier, TokenType.String] })
						) {
							this.columnReference(node, r);
						} else {
							throw r.createParseError();
						}
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(Keyword.MATCH) || r.peekIf(Keyword.NOT, Keyword.MATCH))
			) {
				current = apply(
					this.wrap(current, new Element("MatchOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.append(node, r.consume());
							node.name = `Not${node.name}`;
						}
						this.append(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE))
			) {
				current = apply(
					this.wrap(current, new Element("LikeOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.append(node, r.consume());
							node.name = `Not${node.name}`;
						}
						this.append(node, r.consume());
						this.expression(node, r, 4);
						if (r.peekIf(Keyword.ESCAPE)) {
							apply(
								this.append(node, new Element("EscapeOption", {})),
								(node) => {
									this.expression(node, r, 6);
								},
							);
						}
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP))
			) {
				current = apply(
					this.wrap(current, new Element("RegexpOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.append(node, r.consume());
							node.name = `Not${node.name}`;
						}
						this.append(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB))
			) {
				current = apply(
					this.wrap(current, new Element("GlobOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.append(node, r.consume());
							node.name = `Not${node.name}`;
						}
						this.append(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.ISNULL)) {
				current = apply(
					this.wrap(current, new Element("IsNullOperation", {})),
					(node) => {
						this.append(node, r.consume());
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.NOTNULL)) {
				current = apply(
					this.wrap(current, new Element("IsNotNullOperation", {})),
					(node) => {
						this.append(node, r.consume());
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
				current = apply(
					this.wrap(current, new Element("IsNotNullOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.append(node, r.consume());
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: TokenType.Operator, text: "<" })
			) {
				current = apply(
					this.wrap(current, new Element("LessThanOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: TokenType.Operator, text: ">" })
			) {
				current = apply(
					this.wrap(current, new Element("GreaterThanOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: TokenType.Operator, text: "<=" })
			) {
				current = apply(
					this.wrap(current, new Element("LessThanOrEqualOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: TokenType.Operator, text: ">=" })
			) {
				current = apply(
					this.wrap(current, new Element("GreaterThanOrEqualOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: TokenType.Operator, text: "&" })
			) {
				current = apply(
					this.wrap(current, new Element("BitwiseAndOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: TokenType.Operator, text: "|" })
			) {
				current = apply(
					this.wrap(current, new Element("BitwiseOrOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: TokenType.Operator, text: "<<" })
			) {
				current = apply(
					this.wrap(current, new Element("BitwiseLeftShiftOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: TokenType.Operator, text: ">>" })
			) {
				current = apply(
					this.wrap(current, new Element("BitwiseRightShiftOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 8 &&
				r.peekIf({ type: TokenType.Operator, text: "+" })
			) {
				current = apply(
					this.wrap(current, new Element("AddOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 8);
					},
				);
			} else if (
				precedence < 8 &&
				r.peekIf({ type: TokenType.Operator, text: "-" })
			) {
				current = apply(
					this.wrap(current, new Element("SubtractOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 8);
					},
				);
			} else if (
				precedence < 9 &&
				r.peekIf({ type: TokenType.Operator, text: "*" })
			) {
				current = apply(
					this.wrap(current, new Element("MultiplyOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 9);
					},
				);
			} else if (
				precedence < 9 &&
				r.peekIf({ type: TokenType.Operator, text: "/" })
			) {
				current = apply(
					this.wrap(current, new Element("DivideOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 9);
					},
				);
			} else if (
				precedence < 9 &&
				r.peekIf({ type: TokenType.Operator, text: "%" })
			) {
				current = apply(
					this.wrap(current, new Element("ModuloOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 9);
					},
				);
			} else if (
				precedence < 10 &&
				r.peekIf({ type: TokenType.Operator, text: "||" })
			) {
				current = apply(
					this.wrap(current, new Element("ConcatenateOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (
				precedence < 10 &&
				r.peekIf({ type: TokenType.Operator, text: "->" })
			) {
				current = apply(
					this.wrap(current, new Element("JsonExtractOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (
				precedence < 10 &&
				r.peekIf({ type: TokenType.Operator, text: "->>" })
			) {
				current = apply(
					this.wrap(current, new Element("JsonExtractValueOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (precedence < 11 && r.peekIf(Keyword.COLLATE)) {
				current = apply(
					this.wrap(current, new Element("CollateOperation", {})),
					(node) => {
						this.append(node, r.consume());
						this.identifier(node, r, "CollationName");
					},
				);
			} else {
				break;
			}
		}
		return current;
	}

	private expressionValue(parent: Element, r: TokenReader) {
		if (r.peekIf(Keyword.NULL)) {
			return apply(
				this.append(parent, new Element("NullLiteral", {})),
				(node) => {
					this.append(node, r.consume());
				},
			);
		} else if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
			return this.booleanLiteral(parent, r);
		} else if (
			r.peekIf({
				type: [
					Keyword.CURRENT_DATE,
					Keyword.CURRENT_TIME,
					Keyword.CURRENT_TIMESTAMP,
				],
			})
		) {
			return apply(
				this.append(parent, new Element("FunctionExpression", {})),
				(node) => {
					apply(this.append(node, new Element("ObjectName", {})), (node) => {
						const token = r.consume();
						this.append(node, token);
						node.attribs.value = token.text.toUpperCase();
					});
				},
			);
		} else if (r.peekIf(Keyword.CASE)) {
			return apply(
				this.append(parent, new Element("CaseExpression", {})),
				(node) => {
					this.append(node, r.consume());
					if (!r.peekIf(Keyword.WHEN)) {
						this.expression(node, r);
					}
					do {
						apply(this.append(node, new Element("WhenClause", {})), (node) => {
							this.append(node, r.consume(Keyword.WHEN));
							this.expression(node, r);
							apply(
								this.append(node, new Element("ThenClause", {})),
								(node) => {
									this.append(node, r.consume(Keyword.THEN));
									this.expression(node, r);
								},
							);
						});
					} while (r.peekIf(Keyword.WHEN));
					if (r.peekIf(Keyword.ELSE)) {
						apply(this.append(node, new Element("ElseClause", {})), (node) => {
							this.append(node, r.consume());
							this.expression(node, r);
						});
					}
					this.append(node, r.consume(Keyword.END));
				},
			);
		} else if (r.peekIf(Keyword.CAST)) {
			return apply(
				this.append(parent, new Element("FunctionExpression", {})),
				(node) => {
					const token = r.consume();
					apply(this.append(node, new Element("ObjectName", {})), (node) => {
						node.attribs.value = token.text.toUpperCase();
						this.append(node, token);
					});
					this.append(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new Element("FunctionArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new Element("FunctionArgument", {})),
								(node) => {
									this.expression(node, r);
								},
							);
							this.append(node, r.consume(Keyword.AS));
							this.columnType(node, r);
						},
					);
					this.append(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(Keyword.RAISE)) {
			return apply(
				this.append(parent, new Element("FunctionExpression", {})),
				(node) => {
					const token = r.consume();
					apply(this.append(node, new Element("ObjectName", {})), (node) => {
						this.append(node, token);
						node.attribs.value = token.text.toUpperCase();
					});
					this.append(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new Element("FunctionArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new Element("FunctionArgument", {})),
								(node) => {
									this.conflictAction(node, r);
								},
							);
							this.append(node, r.consume(TokenType.Comma));
							apply(
								this.append(node, new Element("FunctionArgument", {})),
								(node) => {
									this.expression(node, r);
								},
							);
						},
					);
					this.append(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(Keyword.EXISTS)) {
			return apply(
				this.append(parent, new Element("ExistsOperation", {})),
				(node) => {
					this.append(node, r.consume());
					this.append(node, r.consume(TokenType.LeftParen));
					this.selectStatement(node, r);
					this.append(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.LeftParen, Keyword.VALUES)) {
			return apply(
				this.append(parent, new Element("SubqueryExpression", {})),
				(node) => {
					this.append(node, r.consume());
					apply(this.append(node, new Element("ValuesClause", {})), (node) => {
						this.append(node, r.consume(Keyword.VALUES));
						this.append(node, r.consume(TokenType.LeftParen));
						this.expressionList(node, r);
						this.append(node, r.consume(TokenType.RightParen));
					});
					this.append(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.LeftParen, Keyword.SELECT)) {
			return apply(
				this.append(parent, new Element("SubqueryExpression", {})),
				(node) => {
					this.append(node, r.consume());
					this.selectStatement(node, r);
					this.append(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.LeftParen)) {
			return apply(
				this.append(parent, new Element("ParenthesesOperation", {})),
				(node) => {
					this.append(node, r.consume());
					this.expression(node, r);
					if (r.peekIf(TokenType.Comma)) {
						node.name = "ExpressionList";
						this.append(node, r.consume());
						do {
							this.expression(node, r);
							if (r.peekIf(TokenType.Comma)) {
								this.append(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					}
					this.append(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
			return apply(
				this.append(parent, new Element("FunctionExpression", {})),
				(node) => {
					apply(this.append(node, new Element("ObjectName", {})), (node) => {
						this.append(node, r.consume());
					});

					this.append(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new Element("FunctionArgumentList", {})),
						(node) => {
							if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
								apply(
									this.append(node, new Element("FunctionArgument", {})),
									(node) => {
										apply(
											this.append(node, new Element("AllColumnsOption", {})),
											(node) => {
												this.append(node, r.consume());
											},
										);
									},
								);
							} else {
								if (r.peekIf(Keyword.DISTINCT)) {
									apply(
										this.append(node, new Element("DistinctOption", {})),
										(node) => {
											this.append(node, r.consume());
										},
									);
								}
								while (!r.peek().eos) {
									apply(
										this.append(node, new Element("Argument", {})),
										(node) => {
											this.expression(node, r);
										},
									);
									if (r.peekIf(TokenType.Comma)) {
										this.append(node, r.consume());
									} else {
										break;
									}
								}
							}
						},
					);
					this.append(node, r.consume(TokenType.RightParen));
					if (r.peekIf(Keyword.FILTER)) {
						apply(
							this.append(node, new Element("FilterClause", {})),
							(node) => {
								this.append(node, r.consume());
								this.append(node, r.consume(TokenType.LeftParen));
								this.whereClause(node, r);
								this.append(node, r.consume(TokenType.RightParen));
							},
						);
					}
					if (
						!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
						r.peekIf(Keyword.OVER)
					) {
						apply(this.append(node, new Element("OverClause", {})), (node) => {
							this.append(node, r.consume());
							if (r.peekIf(TokenType.LeftParen)) {
								this.append(node, r.consume());
								this.window(node, r);
								this.append(node, r.consume(TokenType.RightParen));
							} else {
								this.identifier(node, r, "WindowName");
							}
						});
					}
				},
			);
		} else if (r.peekIf(TokenType.Numeric)) {
			return this.numericLiteral(parent, r);
		} else if (
			r.peekIf(TokenType.String) ||
			r.peekIf({ type: TokenType.Identifier, text: /^"/ })
		) {
			return this.stringLiteral(parent, r);
		} else if (r.peekIf(TokenType.Blob)) {
			return this.blobLiteral(parent, r);
		} else if (
			r.peekIf(TokenType.Identifier) ||
			r.peekIf(TokenType.String, TokenType.Dot)
		) {
			return this.columnReference(parent, r);
		} else if (r.peekIf(TokenType.BindVariable)) {
			const token = r.consume();
			if (token.text.startsWith("?")) {
				return apply(
					this.append(parent, new Element("PositionalBindVariable", {})),
					(node) => {
						this.append(node, token);

						let value = token.text.substring(1);
						if (value) {
							r.state.bindPosition = Number.parseInt(value, 10);
						} else {
							const pos = r.state.bindPosition ? r.state.bindPosition + 1 : 1;
							value = `${pos}`;
							r.state.bindPosition = pos;
						}
						node.attribs.value = value;
					},
				);
			} else {
				return apply(
					this.append(parent, new Element("NamedBindVariable", {})),
					(node) => {
						this.append(node, token);
						node.attribs.value = token.text.substring(1);
					},
				);
			}
		} else {
			throw r.createParseError();
		}
	}

	private sortColumn(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("SortColumn", {})), (node) => {
			this.expression(node, r);
			if (r.peekIf(Keyword.COLLATE)) {
				this.append(node, r.consume());
				this.identifier(node, r, "CollationName");
			}
			if (r.peekIf(Keyword.ASC)) {
				apply(this.append(node, new Element("AscOption", {})), (node) => {
					this.append(node, r.consume());
				});
			} else if (r.peekIf(Keyword.DESC)) {
				apply(this.append(node, new Element("DescOption", {})), (node) => {
					this.append(node, r.consume());
				});
			}
		});
	}

	private columnList(parent: Element, r: TokenReader) {
		return apply(this.append(parent, new Element("ColumnList", {})), (node) => {
			do {
				this.identifier(node, r, "ColumnName");
				if (r.peekIf(TokenType.Comma)) {
					this.append(node, r.consume());
				} else {
					break;
				}
			} while (!r.peek().eos);
		});
	}

	private columnReference(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("ColumnReference", {})),
			(node) => {
				const ident1 = this.identifier(node, r, "ColumnName");
				if (r.peekIf(TokenType.Dot)) {
					this.append(node, r.consume());
					ident1.name = "ObjectName";
					const ident2 = this.identifier(node, r, "ColumnName");
					if (r.peekIf(TokenType.Dot)) {
						this.append(node, r.consume());
						ident1.name = "SchemaName";
						ident2.name = "ObjectName";
						this.identifier(node, r, "ColumnName");
					}
				}
			},
		);
	}

	private identifier(parent: Element, r: TokenReader, name: string) {
		return apply(this.append(parent, new Element(name, {})), (node) => {
			if (r.peekIf({ type: [TokenType.Identifier, TokenType.String] })) {
				const token = r.consume();
				this.append(node, token);
				node.attribs.value = dequote(token.text);
			} else {
				throw r.createParseError();
			}
		});
	}

	private numericLiteral(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("NumericLiteral", {})),
			(node) => {
				const token = r.consume(TokenType.Numeric);
				this.append(node, token);
				node.attribs.value = token.text.toLowerCase();
			},
		);
	}

	private stringLiteral(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("StringLiteral", {})),
			(node) => {
				if (r.peekIf({ type: TokenType.Identifier, text: /^"/ })) {
					const token = r.consume();
					this.append(node, token);
					node.attribs.value = dequote(token.text);
				} else {
					const token = r.consume(TokenType.String);
					this.append(node, token);
					node.attribs.value = dequote(token.text);
				}
			},
		);
	}

	private blobLiteral(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("BlobLiteral", {})),
			(node) => {
				const token = r.consume(TokenType.Blob);
				this.append(node, token);
				node.attribs.value = token.text
					.substring(2, token.text.length - 1)
					.toUpperCase();
			},
		);
	}

	private booleanLiteral(parent: Element, r: TokenReader) {
		return apply(
			this.append(parent, new Element("BooleanLiteral", {})),
			(node) => {
				if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
					const token = r.consume();
					this.append(node, token);
					node.attribs.value = token.text.toUpperCase();
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private wrap(elem: Element, wrapper: Element) {
		replaceElement(elem, wrapper);
		appendChild(wrapper, elem);
		return wrapper;
	}

	private append(parent: Element, child: Element | Token) {
		if (child instanceof Token) {
			const token = new Element(child.type.name, {
				...(child.keyword && { value: child.keyword.name }),
			});
			appendChild(parent, token);

			for (const skip of child.preskips) {
				const skipToken = new Element(skip.type.name, {
					...(skip.keyword && { value: skip.keyword.name }),
				});
				appendChild(token, skipToken);
				if (skip.text) {
					appendChild(skipToken, new Text(skip.text));
				}
			}
			if (child.text) {
				appendChild(token, new Text(child.text));
			}
			for (const skip of child.postskips) {
				const skipToken = new Element(skip.type.name, {
					...(skip.keyword && { value: skip.keyword.name }),
				});
				appendChild(token, skipToken);
				if (skip.text) {
					appendChild(skipToken, new Text(skip.text));
				}
			}
			return token;
		} else {
			appendChild(parent, child);
			return child;
		}
	}
}
