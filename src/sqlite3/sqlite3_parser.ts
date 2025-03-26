import { SqlTokenType, SqlKeyword } from "../sql.js"
import {
	ParseError,
	type Token,
	TokenReader,
} from "../lexer.js";
import {
	AggregateParseError,
	Parser,
	SyntaxNode,
	SyntaxToken,
	SyntaxTrivia,
} from "../parser.js";
import { apply, dequote } from "../utils.js";
import { Sqlite3Lexer } from "./sqlite3_lexer.js";

export class Sqlite3Parser extends Parser {
	compileOptions: Set<string>;

	constructor(options: Record<string, any> = {}) {
		super(options.lexer ?? new Sqlite3Lexer(options), options);
		this.compileOptions = new Set(options.compileOptions || []);
	}

	parseTokens(tokens: Token[]) {
		const r = new TokenReader(tokens);

		const root = new SyntaxNode("Script", {});
		const errors = [];

		while (r.peek()) {
			try {
				if (
					r.peekIf({
						type: [SqlTokenType.SemiColon, SqlTokenType.Delimiter, SqlTokenType.EoF],
					})
				) {
					this.appendToken(root, r.consume());
				} else if (r.peekIf(SqlTokenType.Command)) {
					this.command(root, r);
				} else if (r.peekIf(SqlKeyword.EXPLAIN)) {
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

	private unknown(parent: SyntaxNode, r: TokenReader) {
		if (!r.peek().eos) {
			return apply(
				this.append(parent, new SyntaxNode("Unknown", {})),
				(node) => {
					while (!r.peek().eos) {
						this.appendToken(node, r.consume());
					}
				},
			);
		}
	}

	private command(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("CommandStatement", {}));
		try {
			return apply(current, (node) => {
				apply(this.append(node, new SyntaxNode("CommandName", {})), (node) => {
					const token = r.consume(SqlTokenType.Command);
					this.appendToken(node, token);
					node.attribs.value = token.text;
				});
				if (!r.peek(-1).eos) {
					apply(
						this.append(node, new SyntaxNode("CommandArgumentList", {})),
						(node) => {
							do {
								apply(
									this.append(node, new SyntaxNode("CommandArgument", {})),
									(node) => {
										const token = r.consume();
										this.appendToken(node, token);
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

	private explainStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("ExplainStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.EXPLAIN));
				if (r.peekIf(SqlKeyword.QUERY)) {
					apply(
						this.append(node, new SyntaxNode("QueryPlanOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.PLAN));
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

	private statement(parent: SyntaxNode, r: TokenReader) {
		let stmt: unknown;
		if (r.peekIf(SqlKeyword.CREATE)) {
			const mark = r.pos;
			r.consume();
			while (!r.peek().eos && !Sqlite3Lexer.isObjectStart(r.peek().keyword)) {
				r.consume();
			}

			if (r.peekIf(SqlKeyword.TABLE)) {
				r.pos = mark;
				stmt = this.createTableStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.VIEW)) {
				r.pos = mark;
				stmt = this.createViewStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.TRIGGER)) {
				r.pos = mark;
				stmt = this.createTriggerStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.INDEX)) {
				r.pos = mark;
				stmt = this.createIndexStatement(parent, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(SqlKeyword.ALTER)) {
			const mark = r.pos;
			r.consume();

			if (r.peekIf(SqlKeyword.TABLE)) {
				r.pos = mark;
				stmt = this.alterTableStatement(parent, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(SqlKeyword.DROP)) {
			const mark = r.pos;
			r.consume();

			if (r.peekIf(SqlKeyword.TABLE)) {
				r.pos = mark;
				stmt = this.dropTableStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.VIEW)) {
				r.pos = mark;
				stmt = this.dropViewStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.TRIGGER)) {
				r.pos = mark;
				stmt = this.dropTriggerStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.INDEX)) {
				r.pos = mark;
				stmt = this.dropIndexStatement(parent, r);
			} else {
				r.pos = mark;
			}
		} else if (r.peekIf(SqlKeyword.ATTACH)) {
			stmt = this.attachDatabaseStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.DETACH)) {
			stmt = this.detachDatabaseStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.ANALYZE)) {
			stmt = this.analyzeStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.REINDEX)) {
			stmt = this.reindexStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.VACUUM)) {
			stmt = this.vacuumStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.PRAGMA)) {
			stmt = this.pragmaStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.BEGIN)) {
			stmt = this.beginTransactionStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.SAVEPOINT)) {
			stmt = this.savepointStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.RELEASE)) {
			stmt = this.releaseSavepointStatement(parent, r);
		} else if (r.peekIf({ type: [SqlKeyword.COMMIT, SqlKeyword.END] })) {
			stmt = this.commitTransactionStatement(parent, r);
		} else if (r.peekIf(SqlKeyword.ROLLBACK)) {
			stmt = this.rollbackTransactionStatement(parent, r);
		} else {
			if (r.peekIf(SqlKeyword.WITH)) {
				this.withClause(parent, r);
			}
			if (r.peekIf({ type: [SqlKeyword.INSERT, SqlKeyword.REPLACE] })) {
				stmt = this.insertStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.UPDATE)) {
				stmt = this.updateStatement(parent, r);
			} else if (r.peekIf(SqlKeyword.DELETE)) {
				stmt = this.deleteStatement(parent, r);
			} else if (r.peekIf({ type: [SqlKeyword.SELECT, SqlKeyword.VALUES] })) {
				stmt = this.selectStatement(parent, r);
			}
		}

		if (!stmt) {
			throw r.createParseError();
		}
		return stmt;
	}

	private createTableStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("CreateTableStatement", {}),
		);
		try {
			return apply(current, (node) => {
				let virtual = false;

				this.appendToken(node, r.consume(SqlKeyword.CREATE));
				if (r.peekIf({ type: [SqlKeyword.TEMPORARY, SqlKeyword.TEMP] })) {
					apply(
						this.append(node, new SyntaxNode("TemporaryOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(SqlKeyword.VIRTUAL)) {
					apply(
						this.append(node, new SyntaxNode("VirtualOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
					virtual = true;
				}
				this.appendToken(node, r.consume(SqlKeyword.TABLE));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.NOT));
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (virtual) {
					apply(
						this.append(node, new SyntaxNode("UsingModuleClause", {})),
						(node) => {
							this.appendToken(node, r.consume(SqlKeyword.USING));
							this.identifier(node, r, "ModuleName");
							if (r.peekIf(SqlTokenType.LeftParen)) {
								this.appendToken(node, r.consume());
								apply(
									this.append(node, new SyntaxNode("ModuleArgumentList", {})),
									(node) => {
										do {
											apply(
												this.append(node, new SyntaxNode("ModuleArgument", {})),
												(node) => {
													do {
														this.appendToken(node, r.consume());
													} while (
														!r.peek().eos &&
														!r.peekIf({
															type: [SqlTokenType.RightParen, SqlTokenType.Comma],
														})
													);
												},
											);
											if (r.peekIf(SqlTokenType.Comma)) {
												this.appendToken(node, r.consume());
											} else {
												break;
											}
										} while (!r.peek().eos);
									},
								);
								this.appendToken(node, r.consume(SqlTokenType.RightParen));
							}
						},
					);
				} else if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("TableColumnList", {})),
						(node) => {
							let hasTableConstraint = false;
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
										hasTableConstraint = true;
									} else {
										this.tableColumn(node, r);
									}
								}
								if (hasTableConstraint) {
									this.tableConstraint(node, r);
								}
								if (r.peekIf(SqlTokenType.Comma)) {
									this.appendToken(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));

					while (r.peekIf({ type: [SqlKeyword.WITHOUT, SqlKeyword.STRICT] })) {
						if (r.peekIf(SqlKeyword.WITHOUT)) {
							apply(
								this.append(node, new SyntaxNode("WithoutRowidOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(SqlKeyword.ROWID));
								},
							);
						} else if (r.peekIf(SqlKeyword.STRICT)) {
							apply(
								this.append(node, new SyntaxNode("StrictOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
								},
							);
						}
						if (r.peekIf(SqlTokenType.Comma)) {
							this.appendToken(node, r.consume());
						} else {
							break;
						}
					}
				} else if (r.peekIf(SqlKeyword.AS)) {
					this.appendToken(node, r.consume());
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

	private createViewStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("CreateViewStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.CREATE));
				if (r.peekIf({ type: [SqlKeyword.TEMPORARY, SqlKeyword.TEMP] })) {
					apply(
						this.append(node, new SyntaxNode("TemporaryOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				this.appendToken(node, r.consume(SqlKeyword.VIEW));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.NOT));
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					this.columnList(node, r);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				}

				this.appendToken(node, r.consume(SqlKeyword.AS));
				this.selectStatement(node, r);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private createTriggerStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("CreateTriggerStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.CREATE));
				if (r.peekIf(SqlKeyword.TEMPORARY) || r.peekIf(SqlKeyword.TEMP)) {
					apply(
						this.append(node, new SyntaxNode("TemporaryOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				this.appendToken(node, r.consume(SqlKeyword.TRIGGER));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.NOT));
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				let hasOption = false;
				if (r.peekIf(SqlKeyword.BEFORE)) {
					apply(
						this.append(node, new SyntaxNode("BeforeOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
					hasOption = true;
				} else if (r.peekIf(SqlKeyword.AFTER)) {
					apply(
						this.append(node, new SyntaxNode("AfterOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
					hasOption = true;
				} else if (r.peekIf(SqlKeyword.INSTEAD)) {
					apply(
						this.append(node, new SyntaxNode("InsteadOfOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.OF));
						},
					);
					hasOption = true;
				}

				if (r.peekIf(SqlKeyword.INSERT)) {
					let current = new SyntaxNode("InsertOnClause", {});
					const last = node.lastChild;
					if (last instanceof SyntaxNode && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(SqlKeyword.ON));

						const ident = this.identifier(node, r, "ObjectName");
						if (r.peekIf(SqlTokenType.Dot)) {
							ident.name = "SchemaName";
							this.appendToken(node, r.consume());
							this.identifier(node, r, "ObjectName");
						}
					});
				} else if (r.peekIf(SqlKeyword.UPDATE)) {
					let current = new SyntaxNode("UpdateOnClause", {});
					const last = node.lastChild;
					if (last instanceof SyntaxNode && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.appendToken(node, r.consume());
						if (r.peekIf(SqlKeyword.OF)) {
							apply(
								this.append(node, new SyntaxNode("ColumnList", {})),
								(node) => {
									this.appendToken(node, r.consume());
									do {
										this.identifier(node, r, "ColumnName");
										if (r.peekIf(SqlTokenType.Comma)) {
											this.appendToken(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.appendToken(node, r.consume(SqlKeyword.ON));
							const ident = this.identifier(node, r, "ObjectName");
							if (r.peekIf(SqlTokenType.Dot)) {
								ident.name = "SchemaName";
								this.appendToken(node, r.consume());
								this.identifier(node, r, "ObjectName");
							}
						}
					});
				} else if (r.peekIf(SqlKeyword.DELETE)) {
					let current = new SyntaxNode("DeleteOnClause", {});
					const last = node.lastChild;
					if (last instanceof SyntaxNode && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(SqlKeyword.ON));
						const ident = this.identifier(node, r, "ObjectName");
						if (r.peekIf(SqlTokenType.Dot)) {
							ident.name = "SchemaName";
							this.appendToken(node, r.consume());
							this.identifier(node, r, "ObjectName");
						}
					});
				} else {
					throw r.createParseError();
				}

				if (r.peekIf(SqlKeyword.FOR)) {
					apply(
						this.append(node, new SyntaxNode("ForEachRowOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.EACH));
							this.appendToken(node, r.consume(SqlKeyword.ROW));
						},
					);
				}

				if (r.peekIf(SqlKeyword.WHEN)) {
					apply(this.append(node, new SyntaxNode("WhenClause", {})), (node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r);
					});
				}

				apply(
					this.append(node, new SyntaxNode("BeginStatement", {})),
					(node) => {
						this.appendToken(node, r.consume(SqlKeyword.BEGIN));
						apply(
							this.append(node, new SyntaxNode("BeginBlock", {})),
							(node) => {
								if (r.peekIf(SqlKeyword.WITH)) {
									this.withClause(node, r);
								}
								if (r.peekIf(SqlKeyword.INSERT) || r.peekIf(SqlKeyword.REPLACE)) {
									this.insertStatement(node, r);
								} else if (r.peekIf(SqlKeyword.UPDATE)) {
									this.updateStatement(node, r);
								} else if (r.peekIf(SqlKeyword.DELETE)) {
									this.deleteStatement(node, r);
								} else if (r.peekIf(SqlKeyword.SELECT)) {
									this.selectStatement(node, r);
								} else {
									throw r.createParseError();
								}
								this.appendToken(node, r.consume(SqlTokenType.SemiColon));
							},
						);
						this.appendToken(node, r.consume(SqlKeyword.END));
					},
				);
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private createIndexStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("CreateIndexStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.CREATE));
				if (r.peekIf(SqlKeyword.UNIQUE)) {
					apply(
						this.append(node, new SyntaxNode("UniqueOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				this.appendToken(node, r.consume(SqlKeyword.INDEX));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.NOT));
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				apply(
					this.append(node, new SyntaxNode("IndexOnClause", {})),
					(node) => {
						this.appendToken(node, r.consume(SqlKeyword.ON));
						this.identifier(node, r, "ObjectName");
						this.appendToken(node, r.consume(SqlTokenType.LeftParen));
						apply(
							this.append(node, new SyntaxNode("SortColumnList", {})),
							(node) => {
								do {
									this.sortColumn(node, r);
									if (r.peekIf(SqlTokenType.Comma)) {
										this.appendToken(node, r.consume());
									} else {
										break;
									}
								} while (!r.peek().eos);
							},
						);
						this.appendToken(node, r.consume(SqlTokenType.RightParen));
					},
				);

				if (r.peekIf(SqlKeyword.WHERE)) {
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

	private alterTableStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("AlterTableStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.ALTER));
				this.appendToken(node, r.consume(SqlKeyword.TABLE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(SqlKeyword.RENAME, SqlKeyword.TO)) {
					apply(
						this.append(node, new SyntaxNode("RenameToObjectClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume());
							this.identifier(node, r, "ObjectName");
						},
					);
				} else if (r.peekIf(SqlKeyword.RENAME)) {
					apply(
						this.append(node, new SyntaxNode("RenameColumnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.COLUMN)) {
								this.appendToken(node, r.consume());
							}
							this.identifier(node, r, "ColumnName");
							apply(
								this.append(node, new SyntaxNode("RenameToColumnClause", {})),
								(node) => {
									this.appendToken(node, r.consume(SqlKeyword.TO));
									this.identifier(node, r, "ColumnName");
								},
							);
						},
					);
				} else if (r.peekIf(SqlKeyword.ADD)) {
					apply(
						this.append(node, new SyntaxNode("AddColumnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.COLUMN)) {
								this.appendToken(node, r.consume());
							}
							this.tableColumn(node, r);
						},
					);
				} else if (r.peekIf(SqlKeyword.DROP)) {
					apply(
						this.append(node, new SyntaxNode("DropColumnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.COLUMN)) {
								this.appendToken(node, r.consume());
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

	private dropTableStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("DropTableStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.DROP));
				this.appendToken(node, r.consume(SqlKeyword.TABLE));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
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

	private dropViewStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("DropViewStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.DROP));
				this.appendToken(node, r.consume(SqlKeyword.VIEW));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
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

	private dropTriggerStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("DropTriggerStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.DROP));
				this.appendToken(node, r.consume(SqlKeyword.TRIGGER));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
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

	private dropIndexStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("DropIndexStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.DROP));
				this.appendToken(node, r.consume(SqlKeyword.INDEX));

				if (r.peekIf(SqlKeyword.IF)) {
					apply(this.append(node, new SyntaxNode("IfExists", {})), (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(SqlKeyword.EXISTS));
					});
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
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

	private attachDatabaseStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("AttachDatabaseStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.ATTACH));
				if (r.peekIf(SqlKeyword.DATABASE)) {
					this.appendToken(node, r.consume());
				}
				apply(this.append(node, new SyntaxNode("Database", {})), (node) => {
					this.expression(node, r);
				});
				this.appendToken(node, r.consume(SqlKeyword.AS));
				this.identifier(node, r, "SchemaName");
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private detachDatabaseStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("DetachDatabaseStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.DETACH));
				if (r.peekIf(SqlKeyword.DATABASE)) {
					this.appendToken(node, r.consume());
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

	private analyzeStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("AnalyzeStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.ANALYZE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
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

	private reindexStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("ReindexStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.REINDEX));

				if (r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })) {
					const ident = this.identifier(node, r, "ObjectName");
					if (r.peekIf(SqlTokenType.Dot)) {
						ident.name = "SchemaName";
						this.appendToken(node, r.consume());
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

	private vacuumStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("VacuumStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.VACUUM));

				if (r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })) {
					this.identifier(node, r, "SchemaName");
				}

				if (r.peekIf(SqlKeyword.INTO)) {
					this.appendToken(node, r.consume());
					apply(this.append(node, new SyntaxNode("FileName", {})), (node) => {
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

	private pragmaStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("PragmaStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.PRAGMA));

				const ident = this.identifier(node, r, "PragmaName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "PragmaName");
				}

				if (r.peekIf({ type: SqlTokenType.Operator, text: "=" })) {
					this.appendToken(node, r.consume());
					this.pragmaValue(node, r);
				} else if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("PragmaArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("PragmaArgument", {})),
								(node) => {
									this.pragmaValue(node, r);
								},
							);
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private beginTransactionStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("BeginTransactionStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.BEGIN));
				if (r.peekIf(SqlKeyword.DEFERRED)) {
					apply(
						this.append(node, new SyntaxNode("DeferredOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(SqlKeyword.IMMEDIATE)) {
					apply(
						this.append(node, new SyntaxNode("ImmediateOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(SqlKeyword.EXCLUSIVE)) {
					apply(
						this.append(node, new SyntaxNode("ExclusiveOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				if (r.peekIf(SqlKeyword.TRANSACTION)) {
					this.appendToken(node, r.consume());
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private savepointStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("SavepointStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.SAVEPOINT));
				this.identifier(node, r, "SavepointName");
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private releaseSavepointStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("ReleaseSavepointStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.RELEASE));
				if (r.peekIf(SqlKeyword.SAVEPOINT)) {
					this.appendToken(node, r.consume());
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

	private commitTransactionStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("CommitTransactionStatement", {}),
		);
		try {
			return apply(current, (node) => {
				if (r.peekIf(SqlKeyword.END)) {
					this.appendToken(node, r.consume());
				} else {
					this.appendToken(node, r.consume(SqlKeyword.COMMIT));
				}
				if (r.peekIf(SqlKeyword.TRANSACTION)) {
					this.appendToken(node, r.consume());
				}
			});
		} catch (err) {
			if (err instanceof ParseError) {
				this.unknown(current, r);
			}
			throw err;
		}
	}

	private rollbackTransactionStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("RollbackTransactionStatement", {}),
		);
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(SqlKeyword.ROLLBACK));
				if (r.peekIf(SqlKeyword.TRANSACTION)) {
					this.appendToken(node, r.consume());
				}
				if (r.peekIf(SqlKeyword.TO)) {
					this.appendToken(node, r.consume());
					if (r.peekIf(SqlKeyword.SAVEPOINT)) {
						this.appendToken(node, r.consume());
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

	private insertStatement(parent: SyntaxNode, r: TokenReader) {
		let current = new SyntaxNode("InsertStatement", {});
		const last = parent.lastChild;
		if (last instanceof SyntaxNode && last.attribs.type === "WithClause") {
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

	private insertClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("InsertClause", {})),
			(node) => {
				if (r.peekIf(SqlKeyword.REPLACE)) {
					apply(
						this.append(node, new SyntaxNode("ReplaceOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else {
					this.appendToken(node, r.consume(SqlKeyword.INSERT));
					if (r.peekIf(SqlKeyword.OR)) {
						apply(
							this.append(node, new SyntaxNode("OrConflictClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.conflictAction(node, r);
							},
						);
					}
				}
				this.appendToken(node, r.consume(SqlKeyword.INTO));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(SqlKeyword.AS)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				}

				if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					this.columnList(node, r);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				}

				if (r.peekIf(SqlKeyword.DEFAULT)) {
					apply(
						this.append(node, new SyntaxNode("DefaultValuesOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.VALUES));
						},
					);
				} else {
					if (r.peekIf(SqlKeyword.VALUES)) {
						apply(
							this.append(node, new SyntaxNode("ValuesClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								apply(
									this.append(node, new SyntaxNode("ExpressionListGroup", {})),
									(node) => {
										do {
											this.appendToken(node, r.consume(SqlTokenType.LeftParen));
											const current = this.expressionList(node, r);
											this.appendToken(node, r.consume(SqlTokenType.RightParen));

											if (r.peekIf(SqlTokenType.Comma)) {
												this.appendToken(node, r.consume());
											} else {
												break;
											}
										} while (!r.peek().eos);
									},
								);
							},
						);
					} else {
						if (r.peekIf(SqlKeyword.WITH)) {
							this.withClause(node, r);
						}
						this.selectStatement(node, r);
					}

					do {
						if (r.peekIf(SqlKeyword.ON)) {
							this.onConflictClause(node, r);
						} else {
							break;
						}
					} while (!r.peek().eos);
				}

				if (r.peekIf(SqlKeyword.RETURNING)) {
					this.returningClause(node, r);
				}
			},
		);
	}

	private onConflictClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("OnConflictClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.ON));
				this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
				if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("SortColumnList", {})),
						(node) => {
							do {
								this.sortColumn(node, r);
								if (r.peekIf(SqlTokenType.Comma)) {
									this.appendToken(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
					if (r.peekIf(SqlKeyword.WHERE)) {
						this.whereClause(node, r);
					}
				}
				this.appendToken(node, r.consume(SqlKeyword.DO));
				if (r.peekIf(SqlKeyword.NOTHING)) {
					apply(
						this.append(node, new SyntaxNode("DoNothingOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(SqlKeyword.UPDATE)) {
					apply(
						this.append(node, new SyntaxNode("DoUpdateOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.setClause(node, r);
							if (r.peekIf(SqlKeyword.WHERE)) {
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

	private updateStatement(parent: SyntaxNode, r: TokenReader) {
		let current = new SyntaxNode("UpdateStatement", {});
		const last = parent.lastChild;
		if (last instanceof SyntaxNode && last.attribs.type === "WithClause") {
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

	private updateClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("UpdateClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.UPDATE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(SqlKeyword.AS)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				}

				if (r.peekIf(SqlKeyword.INDEXED)) {
					apply(
						this.append(node, new SyntaxNode("IndexedByOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.BY));
							this.identifier(node, r, "ObjectName");
						},
					);
				} else if (r.peekIf(SqlKeyword.NOT)) {
					apply(
						this.append(node, new SyntaxNode("NotIndexedOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.INDEXED));
						},
					);
				}

				this.setClause(node, r);
				if (r.peekIf(SqlKeyword.FROM)) {
					this.fromClause(node, r);
				}
				if (r.peekIf(SqlKeyword.WHERE)) {
					this.whereClause(node, r);
				}
				if (r.peekIf(SqlKeyword.RETURNING)) {
					this.returningClause(node, r);
				}
				if (r.peekIf(SqlKeyword.ORDER)) {
					this.orderByClause(node, r);
				}
				if (r.peekIf(SqlKeyword.LIMIT)) {
					this.limitClause(node, r);
				}
			},
		);
	}

	private setClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("SetClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.SET));
				apply(
					this.append(node, new SyntaxNode("UpdateColumnList", {})),
					(node) => {
						do {
							apply(
								this.append(node, new SyntaxNode("UpdateColumn", {})),
								(node) => {
									if (r.peekIf(SqlTokenType.LeftParen)) {
										this.appendToken(node, r.consume());
										this.columnList(node, r);
										this.appendToken(node, r.consume(SqlTokenType.RightParen));
									} else {
										this.identifier(node, r, "ColumnName");
									}
									this.appendToken(
										node,
										r.consume({ type: SqlTokenType.Operator, text: "=" }),
									);
									apply(
										this.append(node, new SyntaxNode("ColumnValue", {})),
										(node) => {
											this.expression(node, r);
										},
									);
								},
							);

							if (r.peekIf(SqlTokenType.Comma)) {
								this.appendToken(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					},
				);
			},
		);
	}

	private deleteStatement(parent: SyntaxNode, r: TokenReader) {
		let current = new SyntaxNode("DeleteStatement", {});
		const last = parent.lastChild;
		if (last instanceof SyntaxNode && last.attribs.type === "WithClause") {
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

	private deleteClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("DeleteClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.DELETE));
				this.appendToken(node, r.consume(SqlKeyword.FROM));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.Dot)) {
					ident.attribs.type = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(SqlKeyword.WHERE)) {
					this.whereClause(node, r);
				}
				if (r.peekIf(SqlKeyword.RETURNING)) {
					this.returningClause(node, r);
				}
			},
		);
	}

	private selectStatement(parent: SyntaxNode, r: TokenReader) {
		let current = new SyntaxNode("SelectStatement", {});
		const last = parent.lastChild;
		if (last instanceof SyntaxNode && last.attribs.type === "WithClause") {
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
					if (r.peekIf(SqlKeyword.UNION)) {
						current = apply(
							this.wrap(current, new SyntaxNode("UnionOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								if (r.peekIf(SqlKeyword.ALL)) {
									apply(
										this.append(node, new SyntaxNode("AllOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								}
								this.selectClause(node, r);
							},
						);
					} else if (r.peekIf(SqlKeyword.INTERSECT)) {
						current = apply(
							this.wrap(current, new SyntaxNode("IntersectOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.selectClause(node, r);
							},
						);
					} else if (r.peekIf(SqlKeyword.EXCEPT)) {
						current = apply(
							this.wrap(current, new SyntaxNode("ExceptOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.selectClause(node, r);
							},
						);
					} else {
						break;
					}
				}

				if (r.peekIf(SqlKeyword.ORDER)) {
					this.orderByClause(node, r);
				}
				if (r.peekIf(SqlKeyword.LIMIT)) {
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

	private selectClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("SelectClause", {})),
			(node) => {
				if (r.peekIf(SqlKeyword.VALUES)) {
					apply(
						this.append(node, new SyntaxNode("ValuesClause", {})),
						(node) => {
							this.appendToken(node, r.consume(SqlKeyword.VALUES));
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							this.expressionList(node, r);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						},
					);
				} else {
					this.appendToken(node, r.consume(SqlKeyword.SELECT));
					if (r.peekIf(SqlKeyword.DISTINCT)) {
						apply(
							this.append(node, new SyntaxNode("DistinctOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
							},
						);
					} else if (r.peekIf(SqlKeyword.ALL)) {
						apply(
							this.append(node, new SyntaxNode("AllOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
							},
						);
					}
					this.selectColumnList(node, r);

					if (r.peekIf(SqlKeyword.FROM)) {
						this.fromClause(node, r);
					}
					if (r.peekIf(SqlKeyword.WHERE)) {
						this.whereClause(node, r);
					}
					if (r.peekIf(SqlKeyword.GROUP)) {
						this.gropuByClause(node, r);
					}
					if (r.peekIf(SqlKeyword.HAVING)) {
						this.havingClause(node, r);
					}
					if (
						!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
						r.peekIf(SqlKeyword.WINDOW)
					) {
						this.windowClause(node, r);
					}
				}
			},
		);
	}

	private withClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("WithClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.WITH));

				if (r.peekIf(SqlKeyword.RECURSIVE)) {
					apply(
						this.append(node, new SyntaxNode("RecursiveOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}

				apply(
					this.append(node, new SyntaxNode("CommonTableList", {})),
					(node) => {
						do {
							apply(
								this.append(node, new SyntaxNode("CommonTable", {})),
								(node) => {
									this.identifier(node, r, "ObjectName");
									if (r.peekIf(SqlTokenType.LeftParen)) {
										this.appendToken(node, r.consume());
										this.columnList(node, r);
										this.appendToken(node, r.consume(SqlTokenType.RightParen));
									}
									this.appendToken(node, r.consume(SqlKeyword.AS));

									if (
										r.peekIf(SqlKeyword.MATERIALIZED) ||
										r.peekIf(SqlKeyword.NOT, SqlKeyword.MATERIALIZED)
									) {
										apply(
											this.append(
												node,
												new SyntaxNode("MaterializedOption", {}),
											),
											(node) => {
												if (r.peekIf(SqlKeyword.NOT)) {
													node.attribs.type = "NotMaterializedOption";
													this.appendToken(node, r.consume());
												}
												this.appendToken(node, r.consume());
											},
										);
									}

									this.appendToken(node, r.consume(SqlTokenType.LeftParen));
									this.selectStatement(node, r);
									this.appendToken(node, r.consume(SqlTokenType.RightParen));
								},
							);

							if (r.peekIf(SqlTokenType.Comma)) {
								this.appendToken(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					},
				);
			},
		);
	}

	private selectColumnList(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("SelectColumnList", {})),
			(node) => {
				do {
					apply(
						this.append(node, new SyntaxNode("SelectColumn", {})),
						(node) => {
							if (r.peekIf({ type: SqlTokenType.Operator, text: "*" })) {
								apply(
									this.append(node, new SyntaxNode("AllColumnsOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (
								r.peekIf(
									{ type: [SqlTokenType.Identifier, SqlTokenType.String] },
									SqlTokenType.Dot,
									{ type: SqlTokenType.Operator, text: "*" },
								)
							) {
								apply(
									this.append(node, new SyntaxNode("AllColumnsOption", {})),
									(node) => {
										this.identifier(node, r, "SchemaName");
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume());
									},
								);
							} else {
								this.expression(node, r);
								if (r.peekIf(SqlKeyword.AS)) {
									this.appendToken(node, r.consume());
									this.identifier(node, r, "ColumnAlias");
								} else if (
									r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })
								) {
									this.identifier(node, r, "ColumnAlias");
								}
							}
						},
					);
					if (r.peekIf(SqlTokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private fromClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("FromClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.FROM));
				apply(
					this.append(node, new SyntaxNode("FromObjectList", {})),
					(node) => {
						let hasJoinClause = false;
						do {
							const fromObject = this.fromObject(node, r);

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
								hasJoinClause = true;
								this.joinClause(fromObject, r);
							}

							if (!hasJoinClause && r.peekIf(SqlTokenType.Comma)) {
								this.appendToken(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					},
				);
			},
		);
	}

	private fromObject(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("FromObject", {})),
			(node) => {
				if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("SubqueryExpression", {})),
						(node) => {
							if (r.peekIf({ type: [SqlKeyword.WITH, SqlKeyword.SELECT] })) {
								if (r.peekIf(SqlKeyword.WITH)) {
									this.withClause(node, r);
								}
								this.selectStatement(node, r);
							} else {
								this.fromClause(node, r);
							}
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				} else {
					apply(
						this.append(node, new SyntaxNode("ObjectReference", {})),
						(node) => {
							const ident = this.identifier(node, r, "ObjectName");
							if (r.peekIf(SqlTokenType.Dot)) {
								ident.attribs.type = "SchemaName";
								this.appendToken(node, r.consume());
								this.identifier(node, r, "ObjectName");
							}
							if (r.peekIf(SqlTokenType.LeftParen)) {
								node.attribs.type = "FunctionExpression";
								this.appendToken(node, r.consume());
								apply(
									this.append(node, new SyntaxNode("FunctionArgumentList", {})),
									(node) => {
										while (!r.peekIf(SqlTokenType.RightParen)) {
											apply(
												this.append(
													node,
													new SyntaxNode("FunctionArgument", {}),
												),
												(node) => {
													this.expression(node, r);
												},
											);
											if (r.peekIf(SqlTokenType.Comma)) {
												this.appendToken(node, r.consume());
											} else {
												break;
											}
										}
									},
								);
								this.appendToken(node, r.consume(SqlTokenType.RightParen));
							}
						},
					);
				}

				if (r.peekIf(SqlKeyword.AS)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				} else if (r.peekIf(SqlTokenType.Identifier)) {
					this.identifier(node, r, "ObjectAlias");
				}
			},
		);
	}

	private joinClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("InnerJoinClause", {})),
			(node) => {
				if (r.peekIf(SqlKeyword.CROSS)) {
					node.attribs.type = "CrossJoinClause";
					this.appendToken(node, r.consume());
				} else {
					if (r.peekIf(SqlKeyword.NATURAL)) {
						apply(
							this.append(node, new SyntaxNode("NatualOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
							},
						);
					}
					if (r.peekIf(SqlKeyword.LEFT)) {
						node.attribs.type = "LeftOuterJoinClause";
						this.appendToken(node, r.consume());
						if (r.peekIf(SqlKeyword.OUTER)) {
							this.appendToken(node, r.consume());
						}
					} else if (r.peekIf(SqlKeyword.RIGHT)) {
						node.attribs.type = "RightOuterJoinClause";
						this.appendToken(node, r.consume());
						if (r.peekIf(SqlKeyword.OUTER)) {
							this.appendToken(node, r.consume());
						}
					} else if (r.peekIf(SqlKeyword.FULL)) {
						node.attribs.type = "FullOuterJoinClause";
						this.appendToken(node, r.consume());
						if (r.peekIf(SqlKeyword.OUTER)) {
							this.appendToken(node, r.consume());
						}
					} else if (r.peekIf(SqlKeyword.INNER)) {
						this.appendToken(node, r.consume());
					}
				}
				this.appendToken(node, r.consume(SqlKeyword.JOIN));

				this.fromObject(node, r);

				if (r.peekIf(SqlKeyword.ON)) {
					apply(
						this.append(node, new SyntaxNode("JoinOnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.expression(node, r);
						},
					);
				} else if (r.peekIf(SqlKeyword.USING)) {
					apply(
						this.append(node, new SyntaxNode("UsingClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						},
					);
				}
			},
		);
	}

	private whereClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("WhereClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.WHERE));
				this.expression(node, r);
			},
		);
	}

	private gropuByClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("GroupByClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.GROUP));
				this.appendToken(node, r.consume(SqlKeyword.BY));
				this.expressionList(node, r);
			},
		);
	}

	private havingClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("HavingClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.HAVING));
				this.expression(node, r);
			},
		);
	}

	private windowClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("WindowClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.WINDOW));
				do {
					this.identifier(node, r, "WindowName");
					this.appendToken(node, r.consume(SqlKeyword.AS));
					this.window(node, r);
					if (r.peekIf(SqlTokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private window(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("Window", {})), (node) => {
			if (!r.peekIf(SqlKeyword.PARTITION)) {
				this.identifier(node, r, "BaseWindowName");
			}
			if (r.peekIf(SqlKeyword.PARTITION)) {
				this.partitionByClause(node, r);
			}
			if (r.peekIf(SqlKeyword.ORDER)) {
				this.orderByClause(node, r);
			}
			apply(this.append(node, new SyntaxNode("FrameClause", {})), (node) => {
				if (r.peekIf(SqlKeyword.RANGE)) {
					apply(
						this.append(node, new SyntaxNode("RangeOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(SqlKeyword.ROWS)) {
					apply(this.append(node, new SyntaxNode("RowsOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				} else if (r.peekIf(SqlKeyword.GROUPS)) {
					apply(
						this.append(node, new SyntaxNode("GroupsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				if (r.peekIf(SqlKeyword.CURRENT)) {
					apply(
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("CurrentRowOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(SqlKeyword.ROW));
								},
							);
						},
					);
				} else if (r.peekIf(SqlKeyword.UNBOUNDED)) {
					apply(
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(
									node,
									new SyntaxNode("UnboundedPrecedingOption", {}),
								),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(SqlKeyword.PRECEDING));
								},
							);
						},
					);
				} else if (r.peekIf(SqlKeyword.BETWEEN)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.CURRENT)) {
								apply(
									this.append(node, new SyntaxNode("CurrentRowOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.ROW));
									},
								);
							} else if (r.peekIf(SqlKeyword.UNBOUNDED)) {
								apply(
									this.append(
										node,
										new SyntaxNode("UnboundedPrecedingOption", {}),
									),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.PRECEDING));
									},
								);
							} else {
								if (r.peekIf(SqlKeyword.PRECEDING)) {
									apply(
										this.append(node, new SyntaxNode("PrecedingOption", {})),
										(node) => {
											this.expression(node, r);
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.FOLLOWING)) {
									apply(
										this.append(node, new SyntaxNode("FollowingOption", {})),
										(node) => {
											this.expression(node, r);
											this.appendToken(node, r.consume());
										},
									);
								} else {
									throw r.createParseError();
								}
							}
						},
					);
					this.appendToken(node, r.consume(SqlKeyword.AND));
					apply(
						this.append(node, new SyntaxNode("FrameEndClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.CURRENT)) {
								apply(
									this.append(node, new SyntaxNode("CurrentRowOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.ROW));
									},
								);
							} else if (r.peekIf(SqlKeyword.UNBOUNDED)) {
								apply(
									this.append(
										node,
										new SyntaxNode("UnboundedFollowingOption", {}),
									),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.FOLLOWING));
									},
								);
							} else {
								if (r.peekIf(SqlKeyword.PRECEDING)) {
									apply(
										this.append(node, new SyntaxNode("PrecedingOption", {})),
										(node) => {
											this.expression(node, r);
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.FOLLOWING)) {
									apply(
										this.append(node, new SyntaxNode("FollowingOption", {})),
										(node) => {
											this.expression(node, r);
											this.appendToken(node, r.consume());
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
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("PrecedingOption", {})),
								(node) => {
									this.expression(node, r);
									this.appendToken(node, r.consume(SqlKeyword.PRECEDING));
								},
							);
						},
					);
				}
			});
			if (r.peekIf(SqlKeyword.EXCLUDE)) {
				apply(
					this.append(node, new SyntaxNode("ExcludeClause", {})),
					(node) => {
						this.appendToken(node, r.consume());
						if (r.peekIf(SqlKeyword.NO)) {
							apply(
								this.append(node, new SyntaxNode("NoOthersOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(SqlKeyword.OTHERS));
								},
							);
						} else if (r.peekIf(SqlKeyword.CURRENT)) {
							apply(
								this.append(node, new SyntaxNode("CurrentRowOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(SqlKeyword.ROW));
								},
							);
						} else if (r.peekIf(SqlKeyword.GROUP)) {
							apply(
								this.append(node, new SyntaxNode("GroupOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
								},
							);
						} else if (r.peekIf(SqlKeyword.TIES)) {
							apply(
								this.append(node, new SyntaxNode("TiesOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
								},
							);
						} else {
							throw r.createParseError();
						}
					},
				);
			}
		});
	}

	private partitionByClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("PartitionByClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.PARTITION));
				this.appendToken(node, r.consume(SqlKeyword.BY));
				do {
					this.expression(node, r);
					if (r.peekIf(SqlTokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private returningClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ReturningClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.RETURNING));
				this.selectColumnList(node, r);
			},
		);
	}

	private orderByClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("OrderByClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.ORDER));
				this.appendToken(node, r.consume(SqlKeyword.BY));
				apply(
					this.append(node, new SyntaxNode("SortColumnList", {})),
					(node) => {
						do {
							apply(this.sortColumn(node, r), (node) => {
								if (r.peekIf(SqlKeyword.NULLS, SqlKeyword.FIRST)) {
									apply(
										this.append(node, new SyntaxNode("NullsFirstOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.NULLS, SqlKeyword.LAST)) {
									apply(
										this.append(node, new SyntaxNode("NullsLastOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								}
							});

							if (r.peekIf(SqlTokenType.Comma)) {
								this.appendToken(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					},
				);
			},
		);
	}

	private limitClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("LimitClause", {})),
			(node) => {
				this.appendToken(node, r.consume(SqlKeyword.LIMIT));
				apply(this.append(node, new SyntaxNode("LimitOption", {})), (node) => {
					this.expression(node, r);
				});
				if (r.peekIf(SqlKeyword.OFFSET)) {
					apply(
						this.append(node, new SyntaxNode("OffsetOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.expression(node, r);
						},
					);
				} else if (r.peekIf(SqlTokenType.Comma)) {
					node.attribs.type = "OffsetOption";
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("LimitOption", {})),
						(node) => {
							this.expression(node, r);
						},
					);
				}
			},
		);
	}

	private tableColumn(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("TableColumn", {})),
			(node) => {
				this.identifier(node, r, "ColumnName");
				if (r.peekIf(SqlTokenType.Identifier)) {
					this.columnType(node, r);
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
					this.columnConstraint(node, r);
				}
			},
		);
	}

	private columnType(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ColumnType", {})),
			(node) => {
				apply(this.append(node, new SyntaxNode("TypeName", {})), (node) => {
					const token = r.consume();
					this.appendToken(node, token);
					node.attribs.value = token.text;
					while (r.peekIf(SqlTokenType.Identifier)) {
						const token = r.consume();
						this.appendToken(node, token);
						node.attribs.value = `${node.attribs.value} ${token.text}`;
					}
				});
				if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("TypeOptionList", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("LengthOption", {})),
								(node) => {
									this.numericLiteral(node, r);
								},
							);
							if (r.peekIf(SqlTokenType.Comma)) {
								this.appendToken(node, r.consume());
								apply(
									this.append(node, new SyntaxNode("ScaleOption", {})),
									(node) => {
										this.numericLiteral(node, r);
									},
								);
							}
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				}
			},
		);
	}

	private columnConstraint(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ColumnConstraint", {})),
			(node) => {
				if (r.peekIf(SqlKeyword.CONSTRAINT)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ConstraintName");
				}
				if (r.peekIf(SqlKeyword.PRIMARY)) {
					apply(
						this.append(node, new SyntaxNode("PrimaryKeyConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.KEY));

							if (r.peekIf(SqlKeyword.ASC)) {
								apply(
									this.append(node, new SyntaxNode("AscOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(SqlKeyword.DESC)) {
								apply(
									this.append(node, new SyntaxNode("DescOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							}
							if (r.peekIf(SqlKeyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
							if (r.peekIf(SqlKeyword.AUTOINCREMENT)) {
								apply(
									this.append(node, new SyntaxNode("AutoincrementOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.NOT)) {
					apply(
						this.append(node, new SyntaxNode("NotNullConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.NULL));
							if (r.peekIf(SqlKeyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.NULL)) {
					apply(
						this.append(node, new SyntaxNode("NullConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.UNIQUE)) {
					apply(
						this.append(node, new SyntaxNode("UniqueConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlKeyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.CHECK)) {
					apply(
						this.append(node, new SyntaxNode("CheckConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							this.expression(node, r);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						},
					);
				} else if (r.peekIf(SqlKeyword.DEFAULT)) {
					apply(
						this.append(node, new SyntaxNode("DefaultOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(SqlTokenType.LeftParen)) {
								this.appendToken(node, r.consume());
								this.expression(node, r);
								this.appendToken(node, r.consume(SqlTokenType.RightParen));
							} else {
								this.expression(node, r);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.COLLATE)) {
					apply(
						this.append(node, new SyntaxNode("CollateOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.identifier(node, r, "CollateName");
						},
					);
				} else if (r.peekIf(SqlKeyword.REFERENCES)) {
					apply(
						this.append(node, new SyntaxNode("ForeignKeyConstraint", {})),
						(node) => {
							this.referencesClause(node, r);
						},
					);
				} else if (r.peekIf(SqlKeyword.GENERATED) || r.peekIf(SqlKeyword.AS)) {
					apply(
						this.append(node, new SyntaxNode("GeneratedColumnOption", {})),
						(node) => {
							if (r.peekIf(SqlKeyword.GENERATED)) {
								this.appendToken(node, r.consume());
								this.appendToken(node, r.consume(SqlKeyword.ALWAYS));
							}
							this.appendToken(node, r.consume(SqlKeyword.AS));
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							apply(
								this.append(node, new SyntaxNode("GeneratedColumn", {})),
								(node) => {
									this.expression(node, r);
								},
							);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));

							if (r.peekIf(SqlKeyword.STORED)) {
								apply(
									this.append(node, new SyntaxNode("StoredOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(SqlKeyword.VIRTUAL)) {
								apply(
									this.append(node, new SyntaxNode("virtual option", {})),
									(node) => {
										this.appendToken(node, r.consume());
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

	private tableConstraint(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("TableConstraint", {})),
			(node) => {
				if (r.peekIf(SqlKeyword.CONSTRAINT)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ConstraintName");
				}
				if (r.peekIf(SqlKeyword.PRIMARY)) {
					apply(
						this.append(node, new SyntaxNode("PrimaryKeyConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.KEY));
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							apply(
								this.append(node, new SyntaxNode("SortColumnList", {})),
								(node) => {
									do {
										this.sortColumn(node, r);
										if (r.peekIf(SqlTokenType.Comma)) {
											this.appendToken(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
							if (r.peekIf(SqlKeyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.UNIQUE)) {
					apply(
						this.append(node, new SyntaxNode("UniqueConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							apply(
								this.append(node, new SyntaxNode("SortColumnList", {})),
								(node) => {
									do {
										this.sortColumn(node, r);
										if (r.peekIf(SqlTokenType.Comma)) {
											this.appendToken(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
							if (r.peekIf(SqlKeyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(SqlKeyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(SqlKeyword.CHECK)) {
					apply(
						this.append(node, new SyntaxNode("CheckConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							this.expression(node, r);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						},
					);
				} else if (r.peekIf(SqlKeyword.FOREIGN)) {
					apply(
						this.append(node, new SyntaxNode("ForeignKeyConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.KEY));
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							this.columnList(node, r);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
							this.referencesClause(node, r);
						},
					);
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private referencesClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ReferencesClause", {})),
			(node) => {
				this.appendToken(node, r.consume());
				this.identifier(node, r, "ObjectName");
				if (r.peekIf(SqlTokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					this.columnList(node, r);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				}

				while (
					!r.peek().eos &&
					r.peekIf({ type: [SqlKeyword.ON, SqlKeyword.MATCH] })
				) {
					if (r.peekIf(SqlKeyword.ON)) {
						apply(
							this.append(node, new SyntaxNode("OnUpdateClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								if (r.peekIf(SqlKeyword.DELETE)) {
									node.attribs.type = "OnDeleteClause";
									this.appendToken(node, r.consume());
								} else {
									this.appendToken(node, r.consume(SqlKeyword.UPDATE));
								}
								if (r.peekIf(SqlKeyword.SET, SqlKeyword.NULL)) {
									apply(
										this.append(node, new SyntaxNode("SetNullOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.SET, SqlKeyword.DEFAULT)) {
									apply(
										this.append(node, new SyntaxNode("SetDefaultOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.CASCADE)) {
									apply(
										this.append(node, new SyntaxNode("CascadeOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.RESTRICT)) {
									apply(
										this.append(node, new SyntaxNode("RestrictOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.NO, SqlKeyword.ACTION)) {
									apply(
										this.append(node, new SyntaxNode("NoActionOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								} else {
									throw r.createParseError();
								}
							},
						);
					} else if (r.peekIf(SqlKeyword.MATCH)) {
						apply(
							this.append(node, new SyntaxNode("MatchClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								if (r.peekIf(SqlKeyword.SIMPLE)) {
									apply(
										this.append(node, new SyntaxNode("SimpleOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.FULL)) {
									apply(
										this.append(node, new SyntaxNode("FullOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(SqlKeyword.PARTIAL)) {
									apply(
										this.append(node, new SyntaxNode("PartialOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else {
									throw r.createParseError();
								}
							},
						);
					} else {
						throw r.createParseError();
					}
				}

				if (
					r.peekIf(SqlKeyword.DEFERRABLE) ||
					r.peekIf(SqlKeyword.NOT, SqlKeyword.DEFERRABLE)
				) {
					apply(
						this.append(node, new SyntaxNode("DeferrableOption", {})),
						(node) => {
							if (r.peekIf(SqlKeyword.NOT)) {
								node.attribs.type = "NotDeferrableOption";
								this.appendToken(node, r.consume());
							}
							this.appendToken(node, r.consume());

							if (r.peekIf(SqlKeyword.INITIALLY, SqlKeyword.DEFERRED)) {
								apply(
									this.append(
										node,
										new SyntaxNode("InitiallyDeferredOption", {}),
									),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(SqlKeyword.INITIALLY, SqlKeyword.IMMEDIATE)) {
								apply(
									this.append(
										node,
										new SyntaxNode("InitiallyImmediateOption", {}),
									),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume());
									},
								);
							}
						},
					);
				}
			},
		);
	}

	private conflictAction(parent: SyntaxNode, r: TokenReader) {
		if (r.peekIf(SqlKeyword.ROLLBACK)) {
			return apply(
				this.append(parent, new SyntaxNode("RollbackOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(SqlKeyword.ABORT)) {
			return apply(
				this.append(parent, new SyntaxNode("AbortOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(SqlKeyword.FAIL)) {
			return apply(
				this.append(parent, new SyntaxNode("FailOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(SqlKeyword.IGNORE)) {
			return apply(
				this.append(parent, new SyntaxNode("IgnoreOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(SqlKeyword.REPLACE)) {
			return apply(
				this.append(parent, new SyntaxNode("ReplaceOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else {
			throw r.createParseError();
		}
	}

	private pragmaValue(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("PragmaValue", {})),
			(node) => {
				if (r.peekIf({ type: SqlTokenType.Operator, text: "+" })) {
					apply(this.append(node, new SyntaxNode("Expression", {})), (node) => {
						apply(
							this.append(node, new SyntaxNode("UnaryPlusOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.numericLiteral(node, r);
							},
						);
					});
				} else if (r.peekIf({ type: SqlTokenType.Operator, text: "-" })) {
					apply(this.append(node, new SyntaxNode("Expression", {})), (node) => {
						apply(
							this.append(node, new SyntaxNode("UnaryMinusOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.numericLiteral(node, r);
							},
						);
					});
				} else if (r.peekIf(SqlTokenType.Numeric)) {
					this.numericLiteral(node, r);
				} else if (r.peekIf(SqlTokenType.String)) {
					this.stringLiteral(node, r);
				} else if (r.peekIf(SqlTokenType.Identifier)) {
					this.identifier(node, r, "PragmaLiteral");
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private expressionList(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ExpressionList", {})),
			(node) => {
				do {
					this.expression(node, r);
					if (r.peekIf(SqlTokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private expression(parent: SyntaxNode, r: TokenReader, precedence = 0) {
		let current: SyntaxNode = parent;
		if (precedence === 0) {
			current = this.append(parent, new SyntaxNode("Expression", {}));
		}
		if (r.peekIf(SqlKeyword.NOT)) {
			current = apply(
				this.append(current, new SyntaxNode("NotOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 3);
				},
			);
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "~" })) {
			current = apply(
				this.append(current, new SyntaxNode("BitwiseNotOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "+" })) {
			current = apply(
				this.append(current, new SyntaxNode("UnaryPlusOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else if (r.peekIf({ type: SqlTokenType.Operator, text: "-" })) {
			current = apply(
				this.append(current, new SyntaxNode("UnaryMinusOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else {
			current = this.expressionValue(current, r);
		}

		while (!r.peek().eos) {
			if (precedence < 1 && r.peekIf(SqlKeyword.OR)) {
				current = apply(
					this.wrap(current, new SyntaxNode("OrOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 1);
					},
				);
			} else if (precedence < 2 && r.peekIf(SqlKeyword.AND)) {
				current = apply(
					this.wrap(current, new SyntaxNode("AndOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 2);
					},
				);
			} else if (
				precedence < 4 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ["=", "=="] })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("EqualOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ["<>", "!="] })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("NotEqualOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (precedence < 4 && r.peekIf(SqlKeyword.IS)) {
				current = apply(
					this.wrap(current, new SyntaxNode("Is", {})),
					(node) => {
						this.appendToken(node, r.consume());
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type += "Not";
						}
						if (r.peekIf(SqlKeyword.DISTINCT)) {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(SqlKeyword.FROM));
							node.attribs.type += "DistinctFromOperation";
						} else {
							node.attribs.type += "Operation";
						}
						this.expression(node, r, 4);
					},
				);
			} else if (
				(precedence < 4 && r.peekIf(SqlKeyword.BETWEEN)) ||
				r.peekIf(SqlKeyword.NOT, SqlKeyword.BETWEEN)
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("BetweenOperation", {})),
					(node) => {
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
						this.appendToken(node, r.consume(SqlKeyword.AND));
						this.expression(node, r, 4);
					},
				);
			} else if (
				(precedence < 4 && r.peekIf(SqlKeyword.IN)) ||
				r.peekIf(SqlKeyword.NOT, SqlKeyword.IN)
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("InOperation", {})),
					(node) => {
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						if (
							r.peekIf(SqlTokenType.LeftParen, {
								type: [SqlKeyword.WITH, SqlKeyword.SELECT],
							})
						) {
							apply(
								this.append(node, new SyntaxNode("SubqueryExpression", {})),
								(node) => {
									this.appendToken(node, r.consume());
									if (r.peekIf(SqlKeyword.WITH)) {
										this.withClause(node, r);
									}
									this.selectStatement(node, r);
									this.appendToken(node, r.consume(SqlTokenType.RightParen));
								},
							);
						} else if (r.peekIf(SqlTokenType.LeftParen)) {
							this.appendToken(node, r.consume());
							this.expressionList(node, r);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						} else if (r.peekIf(SqlTokenType.Identifier, SqlTokenType.LeftParen)) {
							apply(
								this.append(node, new SyntaxNode("FunctionExpression", {})),
								(node) => {
									apply(
										this.append(node, new SyntaxNode("ObjectName", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
									this.appendToken(node, r.consume(SqlTokenType.LeftParen));
									apply(
										this.append(
											node,
											new SyntaxNode("FunctionArgumentList", {}),
										),
										(node) => {
											while (!r.peek().eos && !r.peekIf(SqlTokenType.RightParen)) {
												apply(
													this.append(
														node,
														new SyntaxNode("FunctionArgument", {}),
													),
													(node) => {
														this.expression(node, r);
													},
												);
												if (r.peekIf(SqlTokenType.Comma)) {
													this.appendToken(node, r.consume());
												} else {
													break;
												}
											}
										},
									);
									this.appendToken(node, r.consume(SqlTokenType.RightParen));
								},
							);
						} else if (
							r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })
						) {
							this.columnReference(node, r);
						} else {
							throw r.createParseError();
						}
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.MATCH) || r.peekIf(SqlKeyword.NOT, SqlKeyword.MATCH))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("MatchOperation", {})),
					(node) => {
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.LIKE) || r.peekIf(SqlKeyword.NOT, SqlKeyword.LIKE))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("LikeOperation", {})),
					(node) => {
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
						if (r.peekIf(SqlKeyword.ESCAPE)) {
							apply(
								this.append(node, new SyntaxNode("EscapeOption", {})),
								(node) => {
									this.expression(node, r, 6);
								},
							);
						}
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.REGEXP) || r.peekIf(SqlKeyword.NOT, SqlKeyword.REGEXP))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("RegexpOperation", {})),
					(node) => {
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(SqlKeyword.GLOB) || r.peekIf(SqlKeyword.NOT, SqlKeyword.GLOB))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("GlobOperation", {})),
					(node) => {
						if (r.peekIf(SqlKeyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (precedence < 4 && r.peekIf(SqlKeyword.ISNULL)) {
				current = apply(
					this.wrap(current, new SyntaxNode("IsNullOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
					},
				);
			} else if (precedence < 4 && r.peekIf(SqlKeyword.NOTNULL)) {
				current = apply(
					this.wrap(current, new SyntaxNode("IsNotNullOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
					},
				);
			} else if (precedence < 4 && r.peekIf(SqlKeyword.NOT, SqlKeyword.NULL)) {
				current = apply(
					this.wrap(current, new SyntaxNode("IsNotNullOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume());
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "<" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("LessThanOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ">" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("GreaterThanOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "<=" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("LessThanOrEqualOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ">=" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("GreaterThanOrEqualOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 5);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "&" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("BitwiseAndOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "|" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("BitwiseOrOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "<<" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("BitwiseLeftShiftOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 7 &&
				r.peekIf({ type: SqlTokenType.Operator, text: ">>" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("BitwiseRightShiftOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 7);
					},
				);
			} else if (
				precedence < 8 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "+" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("AddOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 8);
					},
				);
			} else if (
				precedence < 8 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "-" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("SubtractOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 8);
					},
				);
			} else if (
				precedence < 9 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "*" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("MultiplyOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 9);
					},
				);
			} else if (
				precedence < 9 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "/" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("DivideOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 9);
					},
				);
			} else if (
				precedence < 9 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "%" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("ModuloOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 9);
					},
				);
			} else if (
				precedence < 10 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "||" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("ConcatenateOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (
				precedence < 10 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "->" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("JsonExtractOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (
				precedence < 10 &&
				r.peekIf({ type: SqlTokenType.Operator, text: "->>" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("JsonExtractValueOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (precedence < 11 && r.peekIf(SqlKeyword.COLLATE)) {
				current = apply(
					this.wrap(current, new SyntaxNode("CollateOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.identifier(node, r, "CollationName");
					},
				);
			} else {
				break;
			}
		}
		return current;
	}

	private expressionValue(parent: SyntaxNode, r: TokenReader) {
		if (r.peekIf(SqlKeyword.NULL)) {
			return apply(
				this.append(parent, new SyntaxNode("NullLiteral", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
			return this.booleanLiteral(parent, r);
		} else if (
			r.peekIf({
				type: [
					SqlKeyword.CURRENT_DATE,
					SqlKeyword.CURRENT_TIME,
					SqlKeyword.CURRENT_TIMESTAMP,
				],
			})
		) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						const token = r.consume();
						this.appendToken(node, token);
						node.attribs.value = token.text.toUpperCase();
					});
				},
			);
		} else if (r.peekIf(SqlKeyword.CASE)) {
			return apply(
				this.append(parent, new SyntaxNode("CaseExpression", {})),
				(node) => {
					this.appendToken(node, r.consume());
					if (!r.peekIf(SqlKeyword.WHEN)) {
						this.expression(node, r);
					}
					do {
						apply(
							this.append(node, new SyntaxNode("WhenClause", {})),
							(node) => {
								this.appendToken(node, r.consume(SqlKeyword.WHEN));
								this.expression(node, r);
								apply(
									this.append(node, new SyntaxNode("ThenClause", {})),
									(node) => {
										this.appendToken(node, r.consume(SqlKeyword.THEN));
										this.expression(node, r);
									},
								);
							},
						);
					} while (r.peekIf(SqlKeyword.WHEN));
					if (r.peekIf(SqlKeyword.ELSE)) {
						apply(
							this.append(node, new SyntaxNode("ElseClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.expression(node, r);
							},
						);
					}
					this.appendToken(node, r.consume(SqlKeyword.END));
				},
			);
		} else if (r.peekIf(SqlKeyword.CAST)) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					const token = r.consume();
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						node.attribs.value = token.text.toUpperCase();
						this.appendToken(node, token);
					});
					this.appendToken(node, r.consume(SqlTokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("FunctionArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("FunctionArgument", {})),
								(node) => {
									this.expression(node, r);
								},
							);
							this.appendToken(node, r.consume(SqlKeyword.AS));
							this.columnType(node, r);
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				},
			);
		} else if (r.peekIf(SqlKeyword.RAISE)) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					const token = r.consume();
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						this.appendToken(node, token);
						node.attribs.value = token.text.toUpperCase();
					});
					this.appendToken(node, r.consume(SqlTokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("FunctionArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("FunctionArgument", {})),
								(node) => {
									this.conflictAction(node, r);
								},
							);
							this.appendToken(node, r.consume(SqlTokenType.Comma));
							apply(
								this.append(node, new SyntaxNode("FunctionArgument", {})),
								(node) => {
									this.expression(node, r);
								},
							);
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				},
			);
		} else if (r.peekIf(SqlKeyword.EXISTS)) {
			return apply(
				this.append(parent, new SyntaxNode("ExistsOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.appendToken(node, r.consume(SqlTokenType.LeftParen));
					this.selectStatement(node, r);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				},
			);
		} else if (r.peekIf(SqlTokenType.LeftParen, SqlKeyword.VALUES)) {
			return apply(
				this.append(parent, new SyntaxNode("SubqueryExpression", {})),
				(node) => {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("ValuesClause", {})),
						(node) => {
							this.appendToken(node, r.consume(SqlKeyword.VALUES));
							this.appendToken(node, r.consume(SqlTokenType.LeftParen));
							this.expressionList(node, r);
							this.appendToken(node, r.consume(SqlTokenType.RightParen));
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				},
			);
		} else if (r.peekIf(SqlTokenType.LeftParen, SqlKeyword.SELECT)) {
			return apply(
				this.append(parent, new SyntaxNode("SubqueryExpression", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.selectStatement(node, r);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				},
			);
		} else if (r.peekIf(SqlTokenType.LeftParen)) {
			return apply(
				this.append(parent, new SyntaxNode("ParenthesesOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r);
					if (r.peekIf(SqlTokenType.Comma)) {
						node.attribs.type = "ExpressionList";
						this.appendToken(node, r.consume());
						do {
							this.expression(node, r);
							if (r.peekIf(SqlTokenType.Comma)) {
								this.appendToken(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					}
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
				},
			);
		} else if (r.peekIf(SqlTokenType.Identifier, SqlTokenType.LeftParen)) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						this.appendToken(node, r.consume());
					});

					this.appendToken(node, r.consume(SqlTokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("FunctionArgumentList", {})),
						(node) => {
							if (r.peekIf({ type: SqlTokenType.Operator, text: "*" })) {
								apply(
									this.append(node, new SyntaxNode("FunctionArgument", {})),
									(node) => {
										apply(
											this.append(node, new SyntaxNode("AllColumnsOption", {})),
											(node) => {
												this.appendToken(node, r.consume());
											},
										);
									},
								);
							} else {
								if (r.peekIf(SqlKeyword.DISTINCT)) {
									apply(
										this.append(node, new SyntaxNode("DistinctOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								}
								while (!r.peek().eos) {
									apply(
										this.append(node, new SyntaxNode("Argument", {})),
										(node) => {
											this.expression(node, r);
										},
									);
									if (r.peekIf(SqlTokenType.Comma)) {
										this.appendToken(node, r.consume());
									} else {
										break;
									}
								}
							}
						},
					);
					this.appendToken(node, r.consume(SqlTokenType.RightParen));
					if (r.peekIf(SqlKeyword.FILTER)) {
						apply(
							this.append(node, new SyntaxNode("FilterClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.appendToken(node, r.consume(SqlTokenType.LeftParen));
								this.whereClause(node, r);
								this.appendToken(node, r.consume(SqlTokenType.RightParen));
							},
						);
					}
					if (
						!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
						r.peekIf(SqlKeyword.OVER)
					) {
						apply(
							this.append(node, new SyntaxNode("OverClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								if (r.peekIf(SqlTokenType.LeftParen)) {
									this.appendToken(node, r.consume());
									this.window(node, r);
									this.appendToken(node, r.consume(SqlTokenType.RightParen));
								} else {
									this.identifier(node, r, "WindowName");
								}
							},
						);
					}
				},
			);
		} else if (r.peekIf(SqlTokenType.Numeric)) {
			return this.numericLiteral(parent, r);
		} else if (
			r.peekIf(SqlTokenType.String) ||
			r.peekIf({ type: SqlTokenType.Identifier, text: /^"/ })
		) {
			return this.stringLiteral(parent, r);
		} else if (r.peekIf(SqlTokenType.Blob)) {
			return this.blobLiteral(parent, r);
		} else if (
			r.peekIf(SqlTokenType.Identifier) ||
			r.peekIf(SqlTokenType.String, SqlTokenType.Dot)
		) {
			return this.columnReference(parent, r);
		} else if (r.peekIf(SqlTokenType.BindVariable)) {
			const token = r.consume();
			if (token.text.startsWith("?")) {
				return apply(
					this.append(parent, new SyntaxNode("PositionalBindVariable", {})),
					(node) => {
						this.appendToken(node, token);

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
					this.append(parent, new SyntaxNode("NamedBindVariable", {})),
					(node) => {
						this.appendToken(node, token);
						node.attribs.value = token.text.substring(1);
					},
				);
			}
		} else {
			throw r.createParseError();
		}
	}

	private sortColumn(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("SortColumn", {})),
			(node) => {
				this.expression(node, r);
				if (r.peekIf(SqlKeyword.COLLATE)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "CollationName");
				}
				if (r.peekIf(SqlKeyword.ASC)) {
					apply(this.append(node, new SyntaxNode("AscOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				} else if (r.peekIf(SqlKeyword.DESC)) {
					apply(this.append(node, new SyntaxNode("DescOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				}
			},
		);
	}

	private columnList(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ColumnList", {})),
			(node) => {
				do {
					this.identifier(node, r, "ColumnName");
					if (r.peekIf(SqlTokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private columnReference(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ColumnReference", {})),
			(node) => {
				const ident1 = this.identifier(node, r, "ColumnName");
				if (r.peekIf(SqlTokenType.Dot)) {
					this.appendToken(node, r.consume());
					ident1.attribs.type = "ObjectName";
					const ident2 = this.identifier(node, r, "ColumnName");
					if (r.peekIf(SqlTokenType.Dot)) {
						this.appendToken(node, r.consume());
						ident1.attribs.type = "SchemaName";
						ident2.attribs.type = "ObjectName";
						this.identifier(node, r, "ColumnName");
					}
				}
			},
		);
	}

	private identifier(parent: SyntaxNode, r: TokenReader, name: string) {
		return apply(this.append(parent, new SyntaxNode(name, {})), (node) => {
			if (r.peekIf({ type: [SqlTokenType.Identifier, SqlTokenType.String] })) {
				const token = r.consume();
				this.appendToken(node, token);
				node.attribs.value = dequote(token.text);
			} else {
				throw r.createParseError();
			}
		});
	}

	private numericLiteral(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("NumericLiteral", {})),
			(node) => {
				const token = r.consume(SqlTokenType.Numeric);
				this.appendToken(node, token);
				node.attribs.value = token.text.toLowerCase();
			},
		);
	}

	private stringLiteral(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("StringLiteral", {})),
			(node) => {
				if (r.peekIf({ type: SqlTokenType.Identifier, text: /^"/ })) {
					const token = r.consume();
					this.appendToken(node, token);
					node.attribs.value = dequote(token.text);
				} else {
					const token = r.consume(SqlTokenType.String);
					this.appendToken(node, token);
					node.attribs.value = dequote(token.text);
				}
			},
		);
	}

	private blobLiteral(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("BlobLiteral", {})),
			(node) => {
				const token = r.consume(SqlTokenType.Blob);
				this.appendToken(node, token);
				node.attribs.value = token.text
					.substring(2, token.text.length - 1)
					.toUpperCase();
			},
		);
	}

	private booleanLiteral(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("BooleanLiteral", {})),
			(node) => {
				if (r.peekIf({ type: [SqlKeyword.TRUE, SqlKeyword.FALSE] })) {
					const token = r.consume();
					this.appendToken(node, token);
					node.attribs.value = token.text.toUpperCase();
				} else {
					throw r.createParseError();
				}
			},
		);
	}

	private wrap(elem: SyntaxNode, wrapper: SyntaxNode) {
		elem.replaceWith(wrapper);
		wrapper.append(elem);
		return wrapper;
	}

	private append(parent: SyntaxNode, child: SyntaxNode) {
		parent.append(child);
		return child;
	}

	private appendToken(parent: SyntaxNode, child: Token) {
		const token = new SyntaxToken(child.type.name, {
			...(child.keyword && { value: child.keyword.name }),
		});
		for (const skip of child.preskips) {
			const skipToken = new SyntaxTrivia(skip.type.name, {
				...(skip.keyword && { value: skip.keyword.name }),
			});
			if (skip.text) {
				skipToken.append(skip.text);
			}
			token.append(skipToken);
		}
		if (child.text) {
			token.append(child.text);
		}
		for (const skip of child.postskips) {
			const skipToken = new SyntaxTrivia(skip.type.name, {
				...(skip.keyword && { value: skip.keyword.name }),
			});
			if (skip.text) {
				skipToken.append(skip.text);
			}
			token.append(skipToken);
		}
		parent.append(token);
		return token;
	}
}
