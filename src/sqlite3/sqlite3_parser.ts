import {
	Keyword,
	ParseError,
	Token,
	TokenReader,
	TokenType,
} from "../lexer.js";
import { SyntaxNode, SyntaxToken, SyntaxTrivia, AggregateParseError, Parser } from "../parser.js";
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
						type: [TokenType.SemiColon, TokenType.Delimiter, TokenType.EoF],
					})
				) {
					this.appendToken(root, r.consume());
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

	private unknown(parent: SyntaxNode, r: TokenReader) {
		if (!r.peek().eos) {
			return apply(this.append(parent, new SyntaxNode("Unknown", {})), (node) => {
				while (!r.peek().eos) {
					this.appendToken(node, r.consume());
				}
			});
		}
	}

	private command(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("CommandStatement", {}));
		try {
			return apply(current, (node) => {
				apply(this.append(node, new SyntaxNode("CommandName", {})), (node) => {
					const token = r.consume(TokenType.Command);
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
				this.appendToken(node, r.consume(Keyword.EXPLAIN));
				if (r.peekIf(Keyword.QUERY)) {
					apply(
						this.append(node, new SyntaxNode("QueryPlanOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.PLAN));
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

	private createTableStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(
			parent,
			new SyntaxNode("CreateTableStatement", {}),
		);
		try {
			return apply(current, (node) => {
				let virtual = false;

				this.appendToken(node, r.consume(Keyword.CREATE));
				if (r.peekIf({ type: [Keyword.TEMPORARY, Keyword.TEMP] })) {
					apply(
						this.append(node, new SyntaxNode("TemporaryOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.VIRTUAL)) {
					apply(this.append(node, new SyntaxNode("VirtualOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
					virtual = true;
				}
				this.appendToken(node, r.consume(Keyword.TABLE));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.NOT));
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (virtual) {
					apply(
						this.append(node, new SyntaxNode("UsingModuleClause", {})),
						(node) => {
							this.appendToken(node, r.consume(Keyword.USING));
							this.identifier(node, r, "ModuleName");
							if (r.peekIf(TokenType.LeftParen)) {
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
															type: [TokenType.RightParen, TokenType.Comma],
														})
													);
												},
											);
											if (r.peekIf(TokenType.Comma)) {
												this.appendToken(node, r.consume());
											} else {
												break;
											}
										} while (!r.peek().eos);
									},
								);
								this.appendToken(node, r.consume(TokenType.RightParen));
							}
						},
					);
				} else if (r.peekIf(TokenType.LeftParen)) {
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
									this.appendToken(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.appendToken(node, r.consume(TokenType.RightParen));

					while (r.peekIf({ type: [Keyword.WITHOUT, Keyword.STRICT] })) {
						if (r.peekIf(Keyword.WITHOUT)) {
							apply(
								this.append(node, new SyntaxNode("WithoutRowidOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(Keyword.ROWID));
								},
							);
						} else if (r.peekIf(Keyword.STRICT)) {
							apply(
								this.append(node, new SyntaxNode("StrictOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
								},
							);
						}
						if (r.peekIf(TokenType.Comma)) {
							this.appendToken(node, r.consume());
						} else {
							break;
						}
					}
				} else if (r.peekIf(Keyword.AS)) {
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
		const current = this.append(parent, new SyntaxNode("CreateViewStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(Keyword.CREATE));
				if (r.peekIf({ type: [Keyword.TEMPORARY, Keyword.TEMP] })) {
					apply(
						this.append(node, new SyntaxNode("TemporaryOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				this.appendToken(node, r.consume(Keyword.VIEW));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.NOT));
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(TokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					this.columnList(node, r);
					this.appendToken(node, r.consume(TokenType.RightParen));
				}

				this.appendToken(node, r.consume(Keyword.AS));
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
				this.appendToken(node, r.consume(Keyword.CREATE));
				if (r.peekIf(Keyword.TEMPORARY) || r.peekIf(Keyword.TEMP)) {
					apply(
						this.append(node, new SyntaxNode("TemporaryOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				this.appendToken(node, r.consume(Keyword.TRIGGER));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.NOT));
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				let hasOption = false;
				if (r.peekIf(Keyword.BEFORE)) {
					apply(this.append(node, new SyntaxNode("BeforeOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
					hasOption = true;
				} else if (r.peekIf(Keyword.AFTER)) {
					apply(this.append(node, new SyntaxNode("AfterOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
					hasOption = true;
				} else if (r.peekIf(Keyword.INSTEAD)) {
					apply(
						this.append(node, new SyntaxNode("InsteadOfOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.OF));
						},
					);
					hasOption = true;
				}

				if (r.peekIf(Keyword.INSERT)) {
					let current = new SyntaxNode("InsertOnClause", {});
					const last = node.lastChild;
					if (last instanceof SyntaxNode && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(Keyword.ON));

						const ident = this.identifier(node, r, "ObjectName");
						if (r.peekIf(TokenType.Dot)) {
							ident.name = "SchemaName";
							this.appendToken(node, r.consume());
							this.identifier(node, r, "ObjectName");
						}
					});
				} else if (r.peekIf(Keyword.UPDATE)) {
					let current = new SyntaxNode("UpdateOnClause", {});
					const last = node.lastChild;
					if (last instanceof SyntaxNode && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.appendToken(node, r.consume());
						if (r.peekIf(Keyword.OF)) {
							apply(
								this.append(node, new SyntaxNode("ColumnList", {})),
								(node) => {
									this.appendToken(node, r.consume());
									do {
										this.identifier(node, r, "ColumnName");
										if (r.peekIf(TokenType.Comma)) {
											this.appendToken(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.appendToken(node, r.consume(Keyword.ON));
							const ident = this.identifier(node, r, "ObjectName");
							if (r.peekIf(TokenType.Dot)) {
								ident.name = "SchemaName";
								this.appendToken(node, r.consume());
								this.identifier(node, r, "ObjectName");
							}
						}
					});
				} else if (r.peekIf(Keyword.DELETE)) {
					let current = new SyntaxNode("DeleteOnClause", {});
					const last = node.lastChild;
					if (last instanceof SyntaxNode && hasOption) {
						this.wrap(last, current);
					} else {
						current = this.append(node, current);
					}

					apply(current, (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(Keyword.ON));
						const ident = this.identifier(node, r, "ObjectName");
						if (r.peekIf(TokenType.Dot)) {
							ident.name = "SchemaName";
							this.appendToken(node, r.consume());
							this.identifier(node, r, "ObjectName");
						}
					});
				} else {
					throw r.createParseError();
				}

				if (r.peekIf(Keyword.FOR)) {
					apply(
						this.append(node, new SyntaxNode("ForEachRowOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.EACH));
							this.appendToken(node, r.consume(Keyword.ROW));
						},
					);
				}

				if (r.peekIf(Keyword.WHEN)) {
					apply(this.append(node, new SyntaxNode("WhenClause", {})), (node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r);
					});
				}

				apply(this.append(node, new SyntaxNode("BeginStatement", {})), (node) => {
					this.appendToken(node, r.consume(Keyword.BEGIN));
					apply(this.append(node, new SyntaxNode("BeginBlock", {})), (node) => {
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
						this.appendToken(node, r.consume(TokenType.SemiColon));
					});
					this.appendToken(node, r.consume(Keyword.END));
				});
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
				this.appendToken(node, r.consume(Keyword.CREATE));
				if (r.peekIf(Keyword.UNIQUE)) {
					apply(this.append(node, new SyntaxNode("UniqueOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				}
				this.appendToken(node, r.consume(Keyword.INDEX));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfNotExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.NOT));
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				apply(this.append(node, new SyntaxNode("IndexOnClause", {})), (node) => {
					this.appendToken(node, r.consume(Keyword.ON));
					this.identifier(node, r, "ObjectName");
					this.appendToken(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("SortColumnList", {})),
						(node) => {
							do {
								this.sortColumn(node, r);
								if (r.peekIf(TokenType.Comma)) {
									this.appendToken(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.appendToken(node, r.consume(TokenType.RightParen));
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

	private alterTableStatement(parent: SyntaxNode, r: TokenReader) {
		const current = this.append(parent, new SyntaxNode("AlterTableStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(Keyword.ALTER));
				this.appendToken(node, r.consume(Keyword.TABLE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.RENAME, Keyword.TO)) {
					apply(
						this.append(node, new SyntaxNode("RenameToObjectClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume());
							this.identifier(node, r, "ObjectName");
						},
					);
				} else if (r.peekIf(Keyword.RENAME)) {
					apply(
						this.append(node, new SyntaxNode("RenameColumnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.COLUMN)) {
								this.appendToken(node, r.consume());
							}
							this.identifier(node, r, "ColumnName");
							apply(
								this.append(node, new SyntaxNode("RenameToColumnClause", {})),
								(node) => {
									this.appendToken(node, r.consume(Keyword.TO));
									this.identifier(node, r, "ColumnName");
								},
							);
						},
					);
				} else if (r.peekIf(Keyword.ADD)) {
					apply(
						this.append(node, new SyntaxNode("AddColumnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.COLUMN)) {
								this.appendToken(node, r.consume());
							}
							this.tableColumn(node, r);
						},
					);
				} else if (r.peekIf(Keyword.DROP)) {
					apply(
						this.append(node, new SyntaxNode("DropColumnClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.COLUMN)) {
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
		const current = this.append(parent, new SyntaxNode("DropTableStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(Keyword.DROP));
				this.appendToken(node, r.consume(Keyword.TABLE));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
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
		const current = this.append(parent, new SyntaxNode("DropViewStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(Keyword.DROP));
				this.appendToken(node, r.consume(Keyword.VIEW));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
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
				this.appendToken(node, r.consume(Keyword.DROP));
				this.appendToken(node, r.consume(Keyword.TRIGGER));

				if (r.peekIf(Keyword.IF)) {
					apply(
						this.append(node, new SyntaxNode("IfExistsOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.EXISTS));
						},
					);
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
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
		const current = this.append(parent, new SyntaxNode("DropIndexStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(Keyword.DROP));
				this.appendToken(node, r.consume(Keyword.INDEX));

				if (r.peekIf(Keyword.IF)) {
					apply(this.append(node, new SyntaxNode("IfExists", {})), (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(Keyword.EXISTS));
					});
				}

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
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
				this.appendToken(node, r.consume(Keyword.ATTACH));
				if (r.peekIf(Keyword.DATABASE)) {
					this.appendToken(node, r.consume());
				}
				apply(this.append(node, new SyntaxNode("Database", {})), (node) => {
					this.expression(node, r);
				});
				this.appendToken(node, r.consume(Keyword.AS));
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
				this.appendToken(node, r.consume(Keyword.DETACH));
				if (r.peekIf(Keyword.DATABASE)) {
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
				this.appendToken(node, r.consume(Keyword.ANALYZE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
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
				this.appendToken(node, r.consume(Keyword.REINDEX));

				if (r.peekIf({ type: [TokenType.Identifier, TokenType.String] })) {
					const ident = this.identifier(node, r, "ObjectName");
					if (r.peekIf(TokenType.Dot)) {
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
				this.appendToken(node, r.consume(Keyword.VACUUM));

				if (r.peekIf({ type: [TokenType.Identifier, TokenType.String] })) {
					this.identifier(node, r, "SchemaName");
				}

				if (r.peekIf(Keyword.INTO)) {
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
				this.appendToken(node, r.consume(Keyword.PRAGMA));

				const ident = this.identifier(node, r, "PragmaName");
				if (r.peekIf(TokenType.Dot)) {
					ident.name = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "PragmaName");
				}

				if (r.peekIf({ type: TokenType.Operator, text: "=" })) {
					this.appendToken(node, r.consume());
					this.pragmaValue(node, r);
				} else if (r.peekIf(TokenType.LeftParen)) {
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
					this.appendToken(node, r.consume(TokenType.RightParen));
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
				this.appendToken(node, r.consume(Keyword.BEGIN));
				if (r.peekIf(Keyword.DEFERRED)) {
					apply(
						this.append(node, new SyntaxNode("DeferredOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.IMMEDIATE)) {
					apply(
						this.append(node, new SyntaxNode("ImmediateOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.EXCLUSIVE)) {
					apply(
						this.append(node, new SyntaxNode("ExclusiveOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				}
				if (r.peekIf(Keyword.TRANSACTION)) {
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
		const current = this.append(parent, new SyntaxNode("SavepointStatement", {}));
		try {
			return apply(current, (node) => {
				this.appendToken(node, r.consume(Keyword.SAVEPOINT));
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
				this.appendToken(node, r.consume(Keyword.RELEASE));
				if (r.peekIf(Keyword.SAVEPOINT)) {
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
				if (r.peekIf(Keyword.END)) {
					this.appendToken(node, r.consume());
				} else {
					this.appendToken(node, r.consume(Keyword.COMMIT));
				}
				if (r.peekIf(Keyword.TRANSACTION)) {
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
				this.appendToken(node, r.consume(Keyword.ROLLBACK));
				if (r.peekIf(Keyword.TRANSACTION)) {
					this.appendToken(node, r.consume());
				}
				if (r.peekIf(Keyword.TO)) {
					this.appendToken(node, r.consume());
					if (r.peekIf(Keyword.SAVEPOINT)) {
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
				if (r.peekIf(Keyword.REPLACE)) {
					apply(this.append(node, new SyntaxNode("ReplaceOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				} else {
					this.appendToken(node, r.consume(Keyword.INSERT));
					if (r.peekIf(Keyword.OR)) {
						apply(
							this.append(node, new SyntaxNode("OrConflictClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.conflictAction(node, r);
							},
						);
					}
				}
				this.appendToken(node, r.consume(Keyword.INTO));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.attribs.type = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.AS)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				}

				if (r.peekIf(TokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					this.columnList(node, r);
					this.appendToken(node, r.consume(TokenType.RightParen));
				}

				if (r.peekIf(Keyword.DEFAULT)) {
					apply(
						this.append(node, new SyntaxNode("DefaultValuesOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.VALUES));
						},
					);
				} else {
					if (r.peekIf(Keyword.VALUES)) {
						apply(
							this.append(node, new SyntaxNode("ValuesClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								apply(
									this.append(node, new SyntaxNode("ExpressionListGroup", {})),
									(node) => {
										do {
											this.appendToken(node, r.consume(TokenType.LeftParen));
											const current = this.expressionList(node, r);
											this.appendToken(node, r.consume(TokenType.RightParen));

											if (r.peekIf(TokenType.Comma)) {
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

	private onConflictClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("OnConflictClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.ON));
				this.appendToken(node, r.consume(Keyword.CONFLICT));
				if (r.peekIf(TokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("SortColumnList", {})),
						(node) => {
							do {
								this.sortColumn(node, r);
								if (r.peekIf(TokenType.Comma)) {
									this.appendToken(node, r.consume());
								} else {
									break;
								}
							} while (!r.peek().eos);
						},
					);
					this.appendToken(node, r.consume(TokenType.RightParen));
					if (r.peekIf(Keyword.WHERE)) {
						this.whereClause(node, r);
					}
				}
				this.appendToken(node, r.consume(Keyword.DO));
				if (r.peekIf(Keyword.NOTHING)) {
					apply(
						this.append(node, new SyntaxNode("DoNothingOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
						},
					);
				} else if (r.peekIf(Keyword.UPDATE)) {
					apply(
						this.append(node, new SyntaxNode("DoUpdateOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
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
				this.appendToken(node, r.consume(Keyword.UPDATE));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.attribs.type = "SchemaName";
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectName");
				}

				if (r.peekIf(Keyword.AS)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ObjectAlias");
				}

				if (r.peekIf(Keyword.INDEXED)) {
					apply(
						this.append(node, new SyntaxNode("IndexedByOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.BY));
							this.identifier(node, r, "ObjectName");
						},
					);
				} else if (r.peekIf(Keyword.NOT)) {
					apply(
						this.append(node, new SyntaxNode("NotIndexedOption", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.INDEXED));
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

	private setClause(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("SetClause", {})), (node) => {
			this.appendToken(node, r.consume(Keyword.SET));
			apply(this.append(node, new SyntaxNode("UpdateColumnList", {})), (node) => {
				do {
					apply(this.append(node, new SyntaxNode("UpdateColumn", {})), (node) => {
						if (r.peekIf(TokenType.LeftParen)) {
							this.appendToken(node, r.consume());
							this.columnList(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
						} else {
							this.identifier(node, r, "ColumnName");
						}
						this.appendToken(
							node,
							r.consume({ type: TokenType.Operator, text: "=" }),
						);
						apply(this.append(node, new SyntaxNode("ColumnValue", {})), (node) => {
							this.expression(node, r);
						});
					});

					if (r.peekIf(TokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			});
		});
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
				this.appendToken(node, r.consume(Keyword.DELETE));
				this.appendToken(node, r.consume(Keyword.FROM));

				const ident = this.identifier(node, r, "ObjectName");
				if (r.peekIf(TokenType.Dot)) {
					ident.attribs.type = "SchemaName";
					this.appendToken(node, r.consume());
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
					if (r.peekIf(Keyword.UNION)) {
						current = apply(
							this.wrap(current, new SyntaxNode("UnionOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								if (r.peekIf(Keyword.ALL)) {
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
					} else if (r.peekIf(Keyword.INTERSECT)) {
						current = apply(
							this.wrap(current, new SyntaxNode("IntersectOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.selectClause(node, r);
							},
						);
					} else if (r.peekIf(Keyword.EXCEPT)) {
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

	private selectClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("SelectClause", {})),
			(node) => {
				if (r.peekIf(Keyword.VALUES)) {
					apply(this.append(node, new SyntaxNode("ValuesClause", {})), (node) => {
						this.appendToken(node, r.consume(Keyword.VALUES));
						this.appendToken(node, r.consume(TokenType.LeftParen));
						this.expressionList(node, r);
						this.appendToken(node, r.consume(TokenType.RightParen));
					});
				} else {
					this.appendToken(node, r.consume(Keyword.SELECT));
					if (r.peekIf(Keyword.DISTINCT)) {
						apply(
							this.append(node, new SyntaxNode("DistinctOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
							},
						);
					} else if (r.peekIf(Keyword.ALL)) {
						apply(this.append(node, new SyntaxNode("AllOption", {})), (node) => {
							this.appendToken(node, r.consume());
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

	private withClause(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("WithClause", {})), (node) => {
			this.appendToken(node, r.consume(Keyword.WITH));

			if (r.peekIf(Keyword.RECURSIVE)) {
				apply(this.append(node, new SyntaxNode("RecursiveOption", {})), (node) => {
					this.appendToken(node, r.consume());
				});
			}

			apply(this.append(node, new SyntaxNode("CommonTableList", {})), (node) => {
				do {
					apply(this.append(node, new SyntaxNode("CommonTable", {})), (node) => {
						this.identifier(node, r, "ObjectName");
						if (r.peekIf(TokenType.LeftParen)) {
							this.appendToken(node, r.consume());
							this.columnList(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
						}
						this.appendToken(node, r.consume(Keyword.AS));

						if (
							r.peekIf(Keyword.MATERIALIZED) ||
							r.peekIf(Keyword.NOT, Keyword.MATERIALIZED)
						) {
							apply(
								this.append(node, new SyntaxNode("MaterializedOption", {})),
								(node) => {
									if (r.peekIf(Keyword.NOT)) {
										node.attribs.type = "NotMaterializedOption";
										this.appendToken(node, r.consume());
									}
									this.appendToken(node, r.consume());
								},
							);
						}

						this.appendToken(node, r.consume(TokenType.LeftParen));
						this.selectStatement(node, r);
						this.appendToken(node, r.consume(TokenType.RightParen));
					});

					if (r.peekIf(TokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			});
		});
	}

	private selectColumnList(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("SelectColumnList", {})),
			(node) => {
				do {
					apply(this.append(node, new SyntaxNode("SelectColumn", {})), (node) => {
						if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
							apply(
								this.append(node, new SyntaxNode("AllColumnsOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
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
								this.append(node, new SyntaxNode("AllColumnsOption", {})),
								(node) => {
									this.identifier(node, r, "SchemaName");
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume());
								},
							);
						} else {
							this.expression(node, r);
							if (r.peekIf(Keyword.AS)) {
								this.appendToken(node, r.consume());
								this.identifier(node, r, "ColumnAlias");
							} else if (
								r.peekIf({ type: [TokenType.Identifier, TokenType.String] })
							) {
								this.identifier(node, r, "ColumnAlias");
							}
						}
					});
					if (r.peekIf(TokenType.Comma)) {
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			},
		);
	}

	private fromClause(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("FromClause", {})), (node) => {
			this.appendToken(node, r.consume(Keyword.FROM));
			apply(this.append(node, new SyntaxNode("FromObjectList", {})), (node) => {
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
						this.appendToken(node, r.consume());
					} else {
						break;
					}
				} while (!r.peek().eos);
			});
		});
	}

	private fromObject(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("FromObject", {})), (node) => {
			if (r.peekIf(TokenType.LeftParen)) {
				this.appendToken(node, r.consume());
				apply(
					this.append(node, new SyntaxNode("SubqueryExpression", {})),
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
				this.appendToken(node, r.consume(TokenType.RightParen));
			} else {
				apply(this.append(node, new SyntaxNode("ObjectReference", {})), (node) => {
					const ident = this.identifier(node, r, "ObjectName");
					if (r.peekIf(TokenType.Dot)) {
						ident.attribs.type = "SchemaName";
						this.appendToken(node, r.consume());
						this.identifier(node, r, "ObjectName");
					}
					if (r.peekIf(TokenType.LeftParen)) {
						node.attribs.type = "FunctionExpression";
						this.appendToken(node, r.consume());
						apply(
							this.append(node, new SyntaxNode("FunctionArgumentList", {})),
							(node) => {
								while (!r.peekIf(TokenType.RightParen)) {
									apply(
										this.append(node, new SyntaxNode("FunctionArgument", {})),
										(node) => {
											this.expression(node, r);
										},
									);
									if (r.peekIf(TokenType.Comma)) {
										this.appendToken(node, r.consume());
									} else {
										break;
									}
								}
							},
						);
						this.appendToken(node, r.consume(TokenType.RightParen));
					}
				});
			}

			if (r.peekIf(Keyword.AS)) {
				this.appendToken(node, r.consume());
				this.identifier(node, r, "ObjectAlias");
			} else if (r.peekIf(TokenType.Identifier)) {
				this.identifier(node, r, "ObjectAlias");
			}
		});
	}

	private joinClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("InnerJoinClause", {})),
			(node) => {
				if (r.peekIf(Keyword.CROSS)) {
					node.attribs.type = "CrossJoinClause";
					this.appendToken(node, r.consume());
				} else {
					if (r.peekIf(Keyword.NATURAL)) {
						apply(
							this.append(node, new SyntaxNode("NatualOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
							},
						);
					}
					if (r.peekIf(Keyword.LEFT)) {
						node.attribs.type = "LeftOuterJoinClause";
						this.appendToken(node, r.consume());
						if (r.peekIf(Keyword.OUTER)) {
							this.appendToken(node, r.consume());
						}
					} else if (r.peekIf(Keyword.RIGHT)) {
						node.attribs.type = "RightOuterJoinClause";
						this.appendToken(node, r.consume());
						if (r.peekIf(Keyword.OUTER)) {
							this.appendToken(node, r.consume());
						}
					} else if (r.peekIf(Keyword.FULL)) {
						node.attribs.type = "FullOuterJoinClause";
						this.appendToken(node, r.consume());
						if (r.peekIf(Keyword.OUTER)) {
							this.appendToken(node, r.consume());
						}
					} else if (r.peekIf(Keyword.INNER)) {
						this.appendToken(node, r.consume());
					}
				}
				this.appendToken(node, r.consume(Keyword.JOIN));

				this.fromObject(node, r);

				if (r.peekIf(Keyword.ON)) {
					apply(this.append(node, new SyntaxNode("JoinOnClause", {})), (node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r);
					});
				} else if (r.peekIf(Keyword.USING)) {
					apply(this.append(node, new SyntaxNode("UsingClause", {})), (node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(TokenType.LeftParen));
						this.appendToken(node, r.consume(TokenType.RightParen));
					});
				}
			},
		);
	}

	private whereClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("WhereClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.WHERE));
				this.expression(node, r);
			},
		);
	}

	private gropuByClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("GroupByClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.GROUP));
				this.appendToken(node, r.consume(Keyword.BY));
				this.expressionList(node, r);
			},
		);
	}

	private havingClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("HavingClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.HAVING));
				this.expression(node, r);
			},
		);
	}

	private windowClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("WindowClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.WINDOW));
				do {
					this.identifier(node, r, "WindowName");
					this.appendToken(node, r.consume(Keyword.AS));
					this.window(node, r);
					if (r.peekIf(TokenType.Comma)) {
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
			if (!r.peekIf(Keyword.PARTITION)) {
				this.identifier(node, r, "BaseWindowName");
			}
			if (r.peekIf(Keyword.PARTITION)) {
				this.partitionByClause(node, r);
			}
			if (r.peekIf(Keyword.ORDER)) {
				this.orderByClause(node, r);
			}
			apply(this.append(node, new SyntaxNode("FrameClause", {})), (node) => {
				if (r.peekIf(Keyword.RANGE)) {
					apply(this.append(node, new SyntaxNode("RangeOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				} else if (r.peekIf(Keyword.ROWS)) {
					apply(this.append(node, new SyntaxNode("RowsOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				} else if (r.peekIf(Keyword.GROUPS)) {
					apply(this.append(node, new SyntaxNode("GroupsOption", {})), (node) => {
						this.appendToken(node, r.consume());
					});
				}
				if (r.peekIf(Keyword.CURRENT)) {
					apply(
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("CurrentRowOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(Keyword.ROW));
								},
							);
						},
					);
				} else if (r.peekIf(Keyword.UNBOUNDED)) {
					apply(
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("UnboundedPrecedingOption", {})),
								(node) => {
									this.appendToken(node, r.consume());
									this.appendToken(node, r.consume(Keyword.PRECEDING));
								},
							);
						},
					);
				} else if (r.peekIf(Keyword.BETWEEN)) {
					this.appendToken(node, r.consume());
					apply(
						this.append(node, new SyntaxNode("FrameStartClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.CURRENT)) {
								apply(
									this.append(node, new SyntaxNode("CurrentRowOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.ROW));
									},
								);
							} else if (r.peekIf(Keyword.UNBOUNDED)) {
								apply(
									this.append(
										node,
										new SyntaxNode("UnboundedPrecedingOption", {}),
									),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.PRECEDING));
									},
								);
							} else {
								if (r.peekIf(Keyword.PRECEDING)) {
									apply(
										this.append(node, new SyntaxNode("PrecedingOption", {})),
										(node) => {
											this.expression(node, r);
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.FOLLOWING)) {
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
					this.appendToken(node, r.consume(Keyword.AND));
					apply(
						this.append(node, new SyntaxNode("FrameEndClause", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.CURRENT)) {
								apply(
									this.append(node, new SyntaxNode("CurrentRowOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.ROW));
									},
								);
							} else if (r.peekIf(Keyword.UNBOUNDED)) {
								apply(
									this.append(
										node,
										new SyntaxNode("UnboundedFollowingOption", {}),
									),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.FOLLOWING));
									},
								);
							} else {
								if (r.peekIf(Keyword.PRECEDING)) {
									apply(
										this.append(node, new SyntaxNode("PrecedingOption", {})),
										(node) => {
											this.expression(node, r);
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.FOLLOWING)) {
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
									this.appendToken(node, r.consume(Keyword.PRECEDING));
								},
							);
						},
					);
				}
			});
			if (r.peekIf(Keyword.EXCLUDE)) {
				apply(this.append(node, new SyntaxNode("ExcludeClause", {})), (node) => {
					this.appendToken(node, r.consume());
					if (r.peekIf(Keyword.NO)) {
						apply(
							this.append(node, new SyntaxNode("NoOthersOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.appendToken(node, r.consume(Keyword.OTHERS));
							},
						);
					} else if (r.peekIf(Keyword.CURRENT)) {
						apply(
							this.append(node, new SyntaxNode("CurrentRowOption", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.appendToken(node, r.consume(Keyword.ROW));
							},
						);
					} else if (r.peekIf(Keyword.GROUP)) {
						apply(this.append(node, new SyntaxNode("GroupOption", {})), (node) => {
							this.appendToken(node, r.consume());
						});
					} else if (r.peekIf(Keyword.TIES)) {
						apply(this.append(node, new SyntaxNode("TiesOption", {})), (node) => {
							this.appendToken(node, r.consume());
						});
					} else {
						throw r.createParseError();
					}
				});
			}
		});
	}

	private partitionByClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("PartitionByClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.PARTITION));
				this.appendToken(node, r.consume(Keyword.BY));
				do {
					this.expression(node, r);
					if (r.peekIf(TokenType.Comma)) {
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
				this.appendToken(node, r.consume(Keyword.RETURNING));
				this.selectColumnList(node, r);
			},
		);
	}

	private orderByClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("OrderByClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.ORDER));
				this.appendToken(node, r.consume(Keyword.BY));
				apply(this.append(node, new SyntaxNode("SortColumnList", {})), (node) => {
					do {
						apply(this.sortColumn(node, r), (node) => {
							if (r.peekIf(Keyword.NULLS, Keyword.FIRST)) {
								apply(
									this.append(node, new SyntaxNode("NullsFirstOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.NULLS, Keyword.LAST)) {
								apply(
									this.append(node, new SyntaxNode("NullsLastOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume());
									},
								);
							}
						});

						if (r.peekIf(TokenType.Comma)) {
							this.appendToken(node, r.consume());
						} else {
							break;
						}
					} while (!r.peek().eos);
				});
			},
		);
	}

	private limitClause(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("LimitClause", {})),
			(node) => {
				this.appendToken(node, r.consume(Keyword.LIMIT));
				apply(this.append(node, new SyntaxNode("LimitOption", {})), (node) => {
					this.expression(node, r);
				});
				if (r.peekIf(Keyword.OFFSET)) {
					apply(this.append(node, new SyntaxNode("OffsetOption", {})), (node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r);
					});
				} else if (r.peekIf(TokenType.Comma)) {
					node.attribs.type = "OffsetOption";
					this.appendToken(node, r.consume());
					apply(this.append(node, new SyntaxNode("LimitOption", {})), (node) => {
						this.expression(node, r);
					});
				}
			},
		);
	}

	private tableColumn(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("TableColumn", {})),
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

	private columnType(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("ColumnType", {})), (node) => {
			apply(this.append(node, new SyntaxNode("TypeName", {})), (node) => {
				const token = r.consume();
				this.appendToken(node, token);
				node.attribs.value = token.text;
				while (r.peekIf(TokenType.Identifier)) {
					const token = r.consume();
					this.appendToken(node, token);
					node.attribs.value = `${node.attribs.value} ${token.text}`;
				}
			});
			if (r.peekIf(TokenType.LeftParen)) {
				this.appendToken(node, r.consume());
				apply(this.append(node, new SyntaxNode("TypeOptionList", {})), (node) => {
					apply(this.append(node, new SyntaxNode("LengthOption", {})), (node) => {
						this.numericLiteral(node, r);
					});
					if (r.peekIf(TokenType.Comma)) {
						this.appendToken(node, r.consume());
						apply(this.append(node, new SyntaxNode("ScaleOption", {})), (node) => {
							this.numericLiteral(node, r);
						});
					}
				});
				this.appendToken(node, r.consume(TokenType.RightParen));
			}
		});
	}

	private columnConstraint(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ColumnConstraint", {})),
			(node) => {
				if (r.peekIf(Keyword.CONSTRAINT)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ConstraintName");
				}
				if (r.peekIf(Keyword.PRIMARY)) {
					apply(
						this.append(node, new SyntaxNode("PrimaryKeyConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.KEY));

							if (r.peekIf(Keyword.ASC)) {
								apply(
									this.append(node, new SyntaxNode("AscOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.DESC)) {
								apply(
									this.append(node, new SyntaxNode("DescOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							}
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
							if (r.peekIf(Keyword.AUTOINCREMENT)) {
								apply(
									this.append(node, new SyntaxNode("AutoincrementOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.NOT)) {
					apply(
						this.append(node, new SyntaxNode("NotNullConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.NULL));
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.NULL)) {
					apply(
						this.append(node, new SyntaxNode("NullConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.UNIQUE)) {
					apply(
						this.append(node, new SyntaxNode("UniqueConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.CHECK)) {
					apply(
						this.append(node, new SyntaxNode("CheckConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(TokenType.LeftParen));
							this.expression(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
						},
					);
				} else if (r.peekIf(Keyword.DEFAULT)) {
					apply(this.append(node, new SyntaxNode("DefaultOption", {})), (node) => {
						this.appendToken(node, r.consume());
						if (r.peekIf(TokenType.LeftParen)) {
							this.appendToken(node, r.consume());
							this.expression(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
						} else {
							this.expression(node, r);
						}
					});
				} else if (r.peekIf(Keyword.COLLATE)) {
					apply(this.append(node, new SyntaxNode("CollateOption", {})), (node) => {
						this.appendToken(node, r.consume());
						this.identifier(node, r, "CollateName");
					});
				} else if (r.peekIf(Keyword.REFERENCES)) {
					apply(
						this.append(node, new SyntaxNode("ForeignKeyConstraint", {})),
						(node) => {
							this.referencesClause(node, r);
						},
					);
				} else if (r.peekIf(Keyword.GENERATED) || r.peekIf(Keyword.AS)) {
					apply(
						this.append(node, new SyntaxNode("GeneratedColumnOption", {})),
						(node) => {
							if (r.peekIf(Keyword.GENERATED)) {
								this.appendToken(node, r.consume());
								this.appendToken(node, r.consume(Keyword.ALWAYS));
							}
							this.appendToken(node, r.consume(Keyword.AS));
							this.appendToken(node, r.consume(TokenType.LeftParen));
							apply(
								this.append(node, new SyntaxNode("GeneratedColumn", {})),
								(node) => {
									this.expression(node, r);
								},
							);
							this.appendToken(node, r.consume(TokenType.RightParen));

							if (r.peekIf(Keyword.STORED)) {
								apply(
									this.append(node, new SyntaxNode("StoredOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.VIRTUAL)) {
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
				if (r.peekIf(Keyword.CONSTRAINT)) {
					this.appendToken(node, r.consume());
					this.identifier(node, r, "ConstraintName");
				}
				if (r.peekIf(Keyword.PRIMARY)) {
					apply(
						this.append(node, new SyntaxNode("PrimaryKeyConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.KEY));
							this.appendToken(node, r.consume(TokenType.LeftParen));
							apply(
								this.append(node, new SyntaxNode("SortColumnList", {})),
								(node) => {
									do {
										this.sortColumn(node, r);
										if (r.peekIf(TokenType.Comma)) {
											this.appendToken(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.appendToken(node, r.consume(TokenType.RightParen));
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.UNIQUE)) {
					apply(
						this.append(node, new SyntaxNode("UniqueConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(TokenType.LeftParen));
							apply(
								this.append(node, new SyntaxNode("SortColumnList", {})),
								(node) => {
									do {
										this.sortColumn(node, r);
										if (r.peekIf(TokenType.Comma)) {
											this.appendToken(node, r.consume());
										} else {
											break;
										}
									} while (!r.peek().eos);
								},
							);
							this.appendToken(node, r.consume(TokenType.RightParen));
							if (r.peekIf(Keyword.ON)) {
								apply(
									this.append(node, new SyntaxNode("OnConflictClause", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume(Keyword.CONFLICT));
										this.conflictAction(node, r);
									},
								);
							}
						},
					);
				} else if (r.peekIf(Keyword.CHECK)) {
					apply(
						this.append(node, new SyntaxNode("CheckConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(TokenType.LeftParen));
							this.expression(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
						},
					);
				} else if (r.peekIf(Keyword.FOREIGN)) {
					apply(
						this.append(node, new SyntaxNode("ForeignKeyConstraint", {})),
						(node) => {
							this.appendToken(node, r.consume());
							this.appendToken(node, r.consume(Keyword.KEY));
							this.appendToken(node, r.consume(TokenType.LeftParen));
							this.columnList(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
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
				if (r.peekIf(TokenType.LeftParen)) {
					this.appendToken(node, r.consume());
					this.columnList(node, r);
					this.appendToken(node, r.consume(TokenType.RightParen));
				}

				while (
					!r.peek().eos &&
					r.peekIf({ type: [Keyword.ON, Keyword.MATCH] })
				) {
					if (r.peekIf(Keyword.ON)) {
						apply(
							this.append(node, new SyntaxNode("OnUpdateClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								if (r.peekIf(Keyword.DELETE)) {
									node.attribs.type = "OnDeleteClause";
									this.appendToken(node, r.consume());
								} else {
									this.appendToken(node, r.consume(Keyword.UPDATE));
								}
								if (r.peekIf(Keyword.SET, Keyword.NULL)) {
									apply(
										this.append(node, new SyntaxNode("SetNullOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.SET, Keyword.DEFAULT)) {
									apply(
										this.append(node, new SyntaxNode("SetDefaultOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.CASCADE)) {
									apply(
										this.append(node, new SyntaxNode("CascadeOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.RESTRICT)) {
									apply(
										this.append(node, new SyntaxNode("RestrictOption", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
								} else if (r.peekIf(Keyword.NO, Keyword.ACTION)) {
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
					} else if (r.peekIf(Keyword.MATCH)) {
						apply(this.append(node, new SyntaxNode("MatchClause", {})), (node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(Keyword.SIMPLE)) {
								apply(
									this.append(node, new SyntaxNode("SimpleOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.FULL)) {
								apply(
									this.append(node, new SyntaxNode("FullOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.PARTIAL)) {
								apply(
									this.append(node, new SyntaxNode("PartialOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
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
						this.append(node, new SyntaxNode("DeferrableOption", {})),
						(node) => {
							if (r.peekIf(Keyword.NOT)) {
								node.attribs.type = "NotDeferrableOption";
								this.appendToken(node, r.consume());
							}
							this.appendToken(node, r.consume());

							if (r.peekIf(Keyword.INITIALLY, Keyword.DEFERRED)) {
								apply(
									this.append(node, new SyntaxNode("InitiallyDeferredOption", {})),
									(node) => {
										this.appendToken(node, r.consume());
										this.appendToken(node, r.consume());
									},
								);
							} else if (r.peekIf(Keyword.INITIALLY, Keyword.IMMEDIATE)) {
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
		if (r.peekIf(Keyword.ROLLBACK)) {
			return apply(
				this.append(parent, new SyntaxNode("RollbackOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.ABORT)) {
			return apply(
				this.append(parent, new SyntaxNode("AbortOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.FAIL)) {
			return apply(
				this.append(parent, new SyntaxNode("FailOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.IGNORE)) {
			return apply(
				this.append(parent, new SyntaxNode("IgnoreOption", {})),
				(node) => {
					this.appendToken(node, r.consume());
				},
			);
		} else if (r.peekIf(Keyword.REPLACE)) {
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
				if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
					apply(this.append(node, new SyntaxNode("Expression", {})), (node) => {
						apply(
							this.append(node, new SyntaxNode("UnaryPlusOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.numericLiteral(node, r);
							},
						);
					});
				} else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
					apply(this.append(node, new SyntaxNode("Expression", {})), (node) => {
						apply(
							this.append(node, new SyntaxNode("UnaryMinusOperation", {})),
							(node) => {
								this.appendToken(node, r.consume());
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

	private expressionList(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ExpressionList", {})),
			(node) => {
				do {
					this.expression(node, r);
					if (r.peekIf(TokenType.Comma)) {
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
		if (r.peekIf(Keyword.NOT)) {
			current = apply(
				this.append(current, new SyntaxNode("NotOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 3);
				},
			);
		} else if (r.peekIf({ type: TokenType.Operator, text: "~" })) {
			current = apply(
				this.append(current, new SyntaxNode("BitwiseNotOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else if (r.peekIf({ type: TokenType.Operator, text: "+" })) {
			current = apply(
				this.append(current, new SyntaxNode("UnaryPlusOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r, 16);
				},
			);
		} else if (r.peekIf({ type: TokenType.Operator, text: "-" })) {
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
			if (precedence < 1 && r.peekIf(Keyword.OR)) {
				current = apply(
					this.wrap(current, new SyntaxNode("OrOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 1);
					},
				);
			} else if (precedence < 2 && r.peekIf(Keyword.AND)) {
				current = apply(
					this.wrap(current, new SyntaxNode("AndOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 2);
					},
				);
			} else if (
				precedence < 4 &&
				r.peekIf({ type: TokenType.Operator, text: ["=", "=="] })
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
				r.peekIf({ type: TokenType.Operator, text: ["<>", "!="] })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("NotEqualOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.IS)) {
				current = apply(this.wrap(current, new SyntaxNode("Is", {})), (node) => {
					this.appendToken(node, r.consume());
					if (r.peekIf(Keyword.NOT)) {
						this.appendToken(node, r.consume());
						node.attribs.type += "Not";
					}
					if (r.peekIf(Keyword.DISTINCT)) {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume(Keyword.FROM));
						node.attribs.type += "DistinctFromOperation";
					} else {
						node.attribs.type += "Operation";
					}
					this.expression(node, r, 4);
				});
			} else if (
				(precedence < 4 && r.peekIf(Keyword.BETWEEN)) ||
				r.peekIf(Keyword.NOT, Keyword.BETWEEN)
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("BetweenOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
						this.appendToken(node, r.consume(Keyword.AND));
						this.expression(node, r, 4);
					},
				);
			} else if (
				(precedence < 4 && r.peekIf(Keyword.IN)) ||
				r.peekIf(Keyword.NOT, Keyword.IN)
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("InOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						if (
							r.peekIf(TokenType.LeftParen, {
								type: [Keyword.WITH, Keyword.SELECT],
							})
						) {
							apply(
								this.append(node, new SyntaxNode("SubqueryExpression", {})),
								(node) => {
									this.appendToken(node, r.consume());
									if (r.peekIf(Keyword.WITH)) {
										this.withClause(node, r);
									}
									this.selectStatement(node, r);
									this.appendToken(node, r.consume(TokenType.RightParen));
								},
							);
						} else if (r.peekIf(TokenType.LeftParen)) {
							this.appendToken(node, r.consume());
							this.expressionList(node, r);
							this.appendToken(node, r.consume(TokenType.RightParen));
						} else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
							apply(
								this.append(node, new SyntaxNode("FunctionExpression", {})),
								(node) => {
									apply(
										this.append(node, new SyntaxNode("ObjectName", {})),
										(node) => {
											this.appendToken(node, r.consume());
										},
									);
									this.appendToken(node, r.consume(TokenType.LeftParen));
									apply(
										this.append(node, new SyntaxNode("FunctionArgumentList", {})),
										(node) => {
											while (!r.peek().eos && !r.peekIf(TokenType.RightParen)) {
												apply(
													this.append(
														node,
														new SyntaxNode("FunctionArgument", {}),
													),
													(node) => {
														this.expression(node, r);
													},
												);
												if (r.peekIf(TokenType.Comma)) {
													this.appendToken(node, r.consume());
												} else {
													break;
												}
											}
										},
									);
									this.appendToken(node, r.consume(TokenType.RightParen));
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
					this.wrap(current, new SyntaxNode("MatchOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(Keyword.LIKE) || r.peekIf(Keyword.NOT, Keyword.LIKE))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("LikeOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
						if (r.peekIf(Keyword.ESCAPE)) {
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
				(r.peekIf(Keyword.REGEXP) || r.peekIf(Keyword.NOT, Keyword.REGEXP))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("RegexpOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (
				precedence < 4 &&
				(r.peekIf(Keyword.GLOB) || r.peekIf(Keyword.NOT, Keyword.GLOB))
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("GlobOperation", {})),
					(node) => {
						if (r.peekIf(Keyword.NOT)) {
							this.appendToken(node, r.consume());
							node.attribs.type = `Not${node.attribs.type}`;
						}
						this.appendToken(node, r.consume());
						this.expression(node, r, 4);
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.ISNULL)) {
				current = apply(
					this.wrap(current, new SyntaxNode("IsNullOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.NOTNULL)) {
				current = apply(
					this.wrap(current, new SyntaxNode("IsNotNullOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
					},
				);
			} else if (precedence < 4 && r.peekIf(Keyword.NOT, Keyword.NULL)) {
				current = apply(
					this.wrap(current, new SyntaxNode("IsNotNullOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.appendToken(node, r.consume());
					},
				);
			} else if (
				precedence < 5 &&
				r.peekIf({ type: TokenType.Operator, text: "<" })
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
				r.peekIf({ type: TokenType.Operator, text: ">" })
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
				r.peekIf({ type: TokenType.Operator, text: "<=" })
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
				r.peekIf({ type: TokenType.Operator, text: ">=" })
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
				r.peekIf({ type: TokenType.Operator, text: "&" })
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
				r.peekIf({ type: TokenType.Operator, text: "|" })
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
				r.peekIf({ type: TokenType.Operator, text: "<<" })
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
				r.peekIf({ type: TokenType.Operator, text: ">>" })
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
				r.peekIf({ type: TokenType.Operator, text: "+" })
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
				r.peekIf({ type: TokenType.Operator, text: "-" })
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
				r.peekIf({ type: TokenType.Operator, text: "*" })
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
				r.peekIf({ type: TokenType.Operator, text: "/" })
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
				r.peekIf({ type: TokenType.Operator, text: "%" })
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
				r.peekIf({ type: TokenType.Operator, text: "||" })
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
				r.peekIf({ type: TokenType.Operator, text: "->" })
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
				r.peekIf({ type: TokenType.Operator, text: "->>" })
			) {
				current = apply(
					this.wrap(current, new SyntaxNode("JsonExtractValueOperation", {})),
					(node) => {
						this.appendToken(node, r.consume());
						this.expression(node, r, 10);
					},
				);
			} else if (precedence < 11 && r.peekIf(Keyword.COLLATE)) {
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
		if (r.peekIf(Keyword.NULL)) {
			return apply(
				this.append(parent, new SyntaxNode("NullLiteral", {})),
				(node) => {
					this.appendToken(node, r.consume());
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
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						const token = r.consume();
						this.appendToken(node, token);
						node.attribs.value = token.text.toUpperCase();
					});
				},
			);
		} else if (r.peekIf(Keyword.CASE)) {
			return apply(
				this.append(parent, new SyntaxNode("CaseExpression", {})),
				(node) => {
					this.appendToken(node, r.consume());
					if (!r.peekIf(Keyword.WHEN)) {
						this.expression(node, r);
					}
					do {
						apply(this.append(node, new SyntaxNode("WhenClause", {})), (node) => {
							this.appendToken(node, r.consume(Keyword.WHEN));
							this.expression(node, r);
							apply(
								this.append(node, new SyntaxNode("ThenClause", {})),
								(node) => {
									this.appendToken(node, r.consume(Keyword.THEN));
									this.expression(node, r);
								},
							);
						});
					} while (r.peekIf(Keyword.WHEN));
					if (r.peekIf(Keyword.ELSE)) {
						apply(this.append(node, new SyntaxNode("ElseClause", {})), (node) => {
							this.appendToken(node, r.consume());
							this.expression(node, r);
						});
					}
					this.appendToken(node, r.consume(Keyword.END));
				},
			);
		} else if (r.peekIf(Keyword.CAST)) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					const token = r.consume();
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						node.attribs.value = token.text.toUpperCase();
						this.appendToken(node, token);
					});
					this.appendToken(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("FunctionArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("FunctionArgument", {})),
								(node) => {
									this.expression(node, r);
								},
							);
							this.appendToken(node, r.consume(Keyword.AS));
							this.columnType(node, r);
						},
					);
					this.appendToken(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(Keyword.RAISE)) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					const token = r.consume();
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						this.appendToken(node, token);
						node.attribs.value = token.text.toUpperCase();
					});
					this.appendToken(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("FunctionArgumentList", {})),
						(node) => {
							apply(
								this.append(node, new SyntaxNode("FunctionArgument", {})),
								(node) => {
									this.conflictAction(node, r);
								},
							);
							this.appendToken(node, r.consume(TokenType.Comma));
							apply(
								this.append(node, new SyntaxNode("FunctionArgument", {})),
								(node) => {
									this.expression(node, r);
								},
							);
						},
					);
					this.appendToken(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(Keyword.EXISTS)) {
			return apply(
				this.append(parent, new SyntaxNode("ExistsOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.appendToken(node, r.consume(TokenType.LeftParen));
					this.selectStatement(node, r);
					this.appendToken(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.LeftParen, Keyword.VALUES)) {
			return apply(
				this.append(parent, new SyntaxNode("SubqueryExpression", {})),
				(node) => {
					this.appendToken(node, r.consume());
					apply(this.append(node, new SyntaxNode("ValuesClause", {})), (node) => {
						this.appendToken(node, r.consume(Keyword.VALUES));
						this.appendToken(node, r.consume(TokenType.LeftParen));
						this.expressionList(node, r);
						this.appendToken(node, r.consume(TokenType.RightParen));
					});
					this.appendToken(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.LeftParen, Keyword.SELECT)) {
			return apply(
				this.append(parent, new SyntaxNode("SubqueryExpression", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.selectStatement(node, r);
					this.appendToken(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.LeftParen)) {
			return apply(
				this.append(parent, new SyntaxNode("ParenthesesOperation", {})),
				(node) => {
					this.appendToken(node, r.consume());
					this.expression(node, r);
					if (r.peekIf(TokenType.Comma)) {
						node.attribs.type = "ExpressionList";
						this.appendToken(node, r.consume());
						do {
							this.expression(node, r);
							if (r.peekIf(TokenType.Comma)) {
								this.appendToken(node, r.consume());
							} else {
								break;
							}
						} while (!r.peek().eos);
					}
					this.appendToken(node, r.consume(TokenType.RightParen));
				},
			);
		} else if (r.peekIf(TokenType.Identifier, TokenType.LeftParen)) {
			return apply(
				this.append(parent, new SyntaxNode("FunctionExpression", {})),
				(node) => {
					apply(this.append(node, new SyntaxNode("ObjectName", {})), (node) => {
						this.appendToken(node, r.consume());
					});

					this.appendToken(node, r.consume(TokenType.LeftParen));
					apply(
						this.append(node, new SyntaxNode("FunctionArgumentList", {})),
						(node) => {
							if (r.peekIf({ type: TokenType.Operator, text: "*" })) {
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
								if (r.peekIf(Keyword.DISTINCT)) {
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
									if (r.peekIf(TokenType.Comma)) {
										this.appendToken(node, r.consume());
									} else {
										break;
									}
								}
							}
						},
					);
					this.appendToken(node, r.consume(TokenType.RightParen));
					if (r.peekIf(Keyword.FILTER)) {
						apply(
							this.append(node, new SyntaxNode("FilterClause", {})),
							(node) => {
								this.appendToken(node, r.consume());
								this.appendToken(node, r.consume(TokenType.LeftParen));
								this.whereClause(node, r);
								this.appendToken(node, r.consume(TokenType.RightParen));
							},
						);
					}
					if (
						!this.compileOptions.has("SQLITE_OMIT_WINDOWFUNC") &&
						r.peekIf(Keyword.OVER)
					) {
						apply(this.append(node, new SyntaxNode("OverClause", {})), (node) => {
							this.appendToken(node, r.consume());
							if (r.peekIf(TokenType.LeftParen)) {
								this.appendToken(node, r.consume());
								this.window(node, r);
								this.appendToken(node, r.consume(TokenType.RightParen));
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
		return apply(this.append(parent, new SyntaxNode("SortColumn", {})), (node) => {
			this.expression(node, r);
			if (r.peekIf(Keyword.COLLATE)) {
				this.appendToken(node, r.consume());
				this.identifier(node, r, "CollationName");
			}
			if (r.peekIf(Keyword.ASC)) {
				apply(this.append(node, new SyntaxNode("AscOption", {})), (node) => {
					this.appendToken(node, r.consume());
				});
			} else if (r.peekIf(Keyword.DESC)) {
				apply(this.append(node, new SyntaxNode("DescOption", {})), (node) => {
					this.appendToken(node, r.consume());
				});
			}
		});
	}

	private columnList(parent: SyntaxNode, r: TokenReader) {
		return apply(this.append(parent, new SyntaxNode("ColumnList", {})), (node) => {
			do {
				this.identifier(node, r, "ColumnName");
				if (r.peekIf(TokenType.Comma)) {
					this.appendToken(node, r.consume());
				} else {
					break;
				}
			} while (!r.peek().eos);
		});
	}

	private columnReference(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("ColumnReference", {})),
			(node) => {
				const ident1 = this.identifier(node, r, "ColumnName");
				if (r.peekIf(TokenType.Dot)) {
					this.appendToken(node, r.consume());
					ident1.attribs.type = "ObjectName";
					const ident2 = this.identifier(node, r, "ColumnName");
					if (r.peekIf(TokenType.Dot)) {
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
			if (r.peekIf({ type: [TokenType.Identifier, TokenType.String] })) {
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
				const token = r.consume(TokenType.Numeric);
				this.appendToken(node, token);
				node.attribs.value = token.text.toLowerCase();
			},
		);
	}

	private stringLiteral(parent: SyntaxNode, r: TokenReader) {
		return apply(
			this.append(parent, new SyntaxNode("StringLiteral", {})),
			(node) => {
				if (r.peekIf({ type: TokenType.Identifier, text: /^"/ })) {
					const token = r.consume();
					this.appendToken(node, token);
					node.attribs.value = dequote(token.text);
				} else {
					const token = r.consume(TokenType.String);
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
				const token = r.consume(TokenType.Blob);
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
				if (r.peekIf({ type: [Keyword.TRUE, Keyword.FALSE] })) {
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
