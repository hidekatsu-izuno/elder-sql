import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("CreateTableStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [
			new Element("BlockComment", {}, [new Text("/* test table_1 */")]),
			new Element("LineBreak", {}, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("Reserved", { value: "TABLE" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("SchemaName", { value: "test" }, [
			new Element("Identifier", { value: "TEST" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "table_1" }, [
			new Element("Identifier", {}, [
				new Text("table_1"),
				new Element("WhiteSpace", {}, [new Text(" ")]),
			]),
		]),
		new Element("LeftParen", {}, [
			new Text("("),
			new Element("LineBreak", {}, [new Text("\n")]),
		]),
		new Element("TableColumnList", {}, [
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "text_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("text_column"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "TEXT" }, [
						new Element("Identifier", { value: "TEXT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("TEXT"),
						]),
					]),
				]),
				new Element("ColumnConstraint", {}, [
					new Element("NotNullConstraint", {}, [
						new Element("Reserved", { value: "NOT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NOT"),
						]),
						new Element("Reserved", { value: "NULL" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NULL"),
						]),
					]),
				]),
				new Element("ColumnConstraint", {}, [
					new Element("PrimaryKeyConstraint", {}, [
						new Element("Reserved", { value: "PRIMARY" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("PRIMARY"),
						]),
						new Element("Identifier", { value: "KEY" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("KEY"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("LineComment", {}, [new Text("-- text affinity")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "num_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("num_column"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "NUMERIC" }, [
						new Element("Identifier", { value: "NUMERIC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NUMERIC"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("LineComment", {}, [new Text("-- numeric affinity")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "int_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("int_column"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "INTEGER" }, [
						new Element("Identifier", { value: "INTEGER" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("LineComment", {}, [new Text("-- integer affinity")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "real_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("real_column"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "INTEGER" }, [
						new Element("Identifier", { value: "INTEGER" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("LineComment", {}, [new Text("-- real affinity")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "blob_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("blob_column"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "BLOB" }, [
						new Element("Identifier", { value: "BLOB" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("BLOB"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text("   ")]),
				new Element("LineComment", {}, [new Text("-- no affinity")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "no_affinity_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("no_affinity_column"),
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Element("LineComment", {}, [new Text("-- no affinity")]),
						new Element("LineBreak", {}, [new Text("\n")]),
					]),
				]),
			]),
		]),
		new Element("RightParen", {}, [new Text(")")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateTableStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [
			new Element("LineBreak", {}, [new Text("\n")]),
			new Element("BlockComment", {}, [new Text("/* test table_2 */")]),
			new Element("LineBreak", {}, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("TemporaryOption", {}, [
			new Element("Identifier", { value: "TEMP" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("temp"),
			]),
		]),
		new Element("Reserved", { value: "TABLE" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("ObjectName", { value: "table_2" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("table_2"),
				new Element("WhiteSpace", {}, [new Text(" ")]),
			]),
		]),
		new Element("LeftParen", {}, [
			new Text("("),
			new Element("LineBreak", {}, [new Text("\n")]),
		]),
		new Element("TableColumnList", {}, [
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "text_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text('"text_column"'),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "TEXT" }, [
						new Element("Identifier", { value: "TEXT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("TEXT"),
						]),
					]),
				]),
				new Element("ColumnConstraint", {}, [
					new Element("NotNullConstraint", {}, [
						new Element("Reserved", { value: "NOT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NOT"),
						]),
						new Element("Reserved", { value: "NULL" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NULL"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("BlockComment", {}, [new Text("/*text affinity*/")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "num_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("[num_column]"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "NUMERIC" }, [
						new Element("Identifier", { value: "NUMERIC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NUMERIC"),
						]),
					]),
				]),
				new Element("ColumnConstraint", {}, [
					new Element("NotNullConstraint", {}, [
						new Element("Reserved", { value: "NOT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NOT"),
						]),
						new Element("Reserved", { value: "NULL" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NULL"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("BlockComment", {}, [new Text("/*numeric affinity*/")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "int_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("`int_column`"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "INTEGER" }, [
						new Element("Identifier", { value: "INTEGER" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("BlockComment", {}, [new Text("/*integer affinity*/")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "real_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text('"real_column"'),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "INTEGER" }, [
						new Element("Identifier", { value: "INTEGER" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Element("BlockComment", {}, [new Text("/*real affinity*/")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "blob_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("[blob_column]"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "BLOB" }, [
						new Element("Identifier", { value: "BLOB" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("BLOB"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text("   ")]),
				new Element("BlockComment", {}, [new Text("/*no affinity*/")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "no_affinity_column" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("`no_affinity_column`"),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("WhiteSpace", {}, [new Text("  ")]),
				new Element("BlockComment", {}, [new Text("/*no affinity*/")]),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableConstraint", {}, [
				new Element("PrimaryKeyConstraint", {}, [
					new Element("Reserved", { value: "PRIMARY" }, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("PRIMARY"),
					]),
					new Element("Identifier", { value: "KEY" }, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("KEY"),
						new Element("WhiteSpace", {}, [new Text(" ")]),
					]),
					new Element("LeftParen", {}, [new Text("(")]),
					new Element("SortColumnList", {}, [
						new Element("SortColumn", {}, [
							new Element("Expression", {}, [
								new Element("ColumnReference", {}, [
									new Element("ColumnName", { value: "text_column" }, [
										new Element("Identifier", {}, [new Text("text_column")]),
									]),
								]),
							]),
						]),
						new Element("Comma", {}, [new Text(",")]),
						new Element("SortColumn", {}, [
							new Element("Expression", {}, [
								new Element("ColumnReference", {}, [
									new Element("ColumnName", { value: "num_column" }, [
										new Element("Identifier", {}, [
											new Element("WhiteSpace", {}, [new Text(" ")]),
											new Text("num_column"),
										]),
									]),
								]),
							]),
						]),
					]),
					new Element("RightParen", {}, [
						new Text(")"),
						new Element("LineBreak", {}, [new Text("\n")]),
					]),
				]),
			]),
		]),
		new Element("RightParen", {}, [
			new Text(")"),
			new Element("LineBreak", {}, [new Text("\n")]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateTableStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [
			new Element("BlockComment", {}, [new Text("/* test table_3 */")]),
			new Element("LineBreak", {}, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("TemporaryOption", {}, [
			new Element("Reserved", { value: "TEMPORARY" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("temporary"),
			]),
		]),
		new Element("Reserved", { value: "TABLE" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("ObjectName", { value: "table_3" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("table_3"),
				new Element("WhiteSpace", {}, [new Text(" ")]),
			]),
		]),
		new Element("LeftParen", {}, [
			new Text("("),
			new Element("LineBreak", {}, [new Text("\n")]),
		]),
		new Element("TableColumnList", {}, [
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "col_1" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("col_1"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "TEXT" }, [
						new Element("Identifier", { value: "TEXT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("TEXT"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableColumn", {}, [
				new Element("ColumnName", { value: "col_2" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text("  ")]),
						new Text("col_2"),
					]),
				]),
				new Element("ColumnType", {}, [
					new Element("TypeName", { value: "NUMERIC" }, [
						new Element("Identifier", { value: "NUMERIC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("NUMERIC"),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableConstraint", {}, [
				new Element("Reserved", { value: "CONSTRAINT" }, [
					new Element("WhiteSpace", {}, [new Text("  ")]),
					new Text("CONSTRAINT"),
				]),
				new Element("ConstraintName", { value: "c_001" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("c_001"),
					]),
				]),
				new Element("UniqueConstraint", {}, [
					new Element("Reserved", { value: "UNIQUE" }, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("UNIQUE"),
						new Element("WhiteSpace", {}, [new Text(" ")]),
					]),
					new Element("LeftParen", {}, [new Text("(")]),
					new Element("SortColumnList", {}, [
						new Element("SortColumn", {}, [
							new Element("Expression", {}, [
								new Element("ColumnReference", {}, [
									new Element("ColumnName", { value: "col_1" }, [
										new Element("Identifier", {}, [
											new Element("WhiteSpace", {}, [new Text(" ")]),
											new Text("col_1"),
										]),
									]),
								]),
							]),
						]),
						new Element("Comma", {}, [new Text(",")]),
						new Element("SortColumn", {}, [
							new Element("Expression", {}, [
								new Element("ColumnReference", {}, [
									new Element("ColumnName", { value: "col_2" }, [
										new Element("Identifier", {}, [
											new Element("WhiteSpace", {}, [new Text(" ")]),
											new Text("col_2"),
											new Element("WhiteSpace", {}, [new Text(" ")]),
										]),
									]),
								]),
							]),
						]),
					]),
					new Element("RightParen", {}, [
						new Text(")"),
						new Element("LineBreak", {}, [new Text("\n")]),
					]),
					new Element("OnConflictClause", {}, [
						new Element("Reserved", { value: "ON" }, [
							new Element("WhiteSpace", {}, [new Text("    ")]),
							new Text("ON"),
						]),
						new Element("Identifier", { value: "CONFLICT" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("CONFLICT"),
						]),
						new Element("RollbackOption", {}, [
							new Element("Identifier", { value: "ROLLBACK" }, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("ROLLBACK"),
							]),
						]),
					]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableConstraint", {}, [
				new Element("Reserved", { value: "CONSTRAINT" }, [
					new Element("WhiteSpace", {}, [new Text("  ")]),
					new Text("CONSTRAINT"),
				]),
				new Element("ConstraintName", { value: "c_002" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("c_002"),
					]),
				]),
				new Element("CheckConstraint", {}, [
					new Element("Reserved", { value: "CHECK" }, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("CHECK"),
						new Element("WhiteSpace", {}, [new Text(" ")]),
					]),
					new Element("LeftParen", {}, [new Text("(")]),
					new Element("Expression", {}, [
						new Element("GreaterThanOperation", {}, [
							new Element("AddOperation", {}, [
								new Element("ColumnReference", {}, [
									new Element("ColumnName", { value: "col_1" }, [
										new Element("Identifier", {}, [
											new Element("WhiteSpace", {}, [new Text(" ")]),
											new Text("col_1"),
											new Element("WhiteSpace", {}, [new Text(" ")]),
										]),
									]),
								]),
								new Element("Operator", {}, [new Text("+")]),
								new Element("ColumnReference", {}, [
									new Element("ColumnName", { value: "col_2" }, [
										new Element("Identifier", {}, [
											new Element("WhiteSpace", {}, [new Text(" ")]),
											new Text("col_2"),
											new Element("WhiteSpace", {}, [new Text(" ")]),
										]),
									]),
								]),
							]),
							new Element("Operator", {}, [new Text(">")]),
							new Element("NumericLiteral", { value: "0" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("0"),
									new Element("WhiteSpace", {}, [new Text(" ")]),
								]),
							]),
						]),
					]),
					new Element("RightParen", {}, [new Text(")")]),
				]),
			]),
			new Element("Comma", {}, [
				new Text(","),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("TableConstraint", {}, [
				new Element("Reserved", { value: "CONSTRAINT" }, [
					new Element("WhiteSpace", {}, [new Text("  ")]),
					new Text("CONSTRAINT"),
				]),
				new Element("ConstraintName", { value: "c_003" }, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("c_003"),
					]),
				]),
				new Element("ForeignKeyConstraint", {}, [
					new Element("Reserved", { value: "FOREIGN" }, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("FOREIGN"),
					]),
					new Element("Identifier", { value: "KEY" }, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("KEY"),
						new Element("WhiteSpace", {}, [new Text(" ")]),
					]),
					new Element("LeftParen", {}, [new Text("(")]),
					new Element("ColumnList", {}, [
						new Element("ColumnName", { value: "col_1" }, [
							new Element("Identifier", {}, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("col_1"),
							]),
						]),
						new Element("Comma", {}, [new Text(",")]),
						new Element("ColumnName", { value: "col_2" }, [
							new Element("Identifier", {}, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("col_2"),
								new Element("WhiteSpace", {}, [new Text(" ")]),
							]),
						]),
					]),
					new Element("RightParen", {}, [
						new Text(")"),
						new Element("LineBreak", {}, [new Text("\n")]),
					]),
					new Element("ReferencesClause", {}, [
						new Element("Reserved", { value: "REFERENCES" }, [
							new Element("WhiteSpace", {}, [new Text("    ")]),
							new Text("REFERENCES"),
						]),
						new Element("ObjectName", { value: "table_1" }, [
							new Element("Identifier", {}, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("table_1"),
								new Element("WhiteSpace", {}, [new Text(" ")]),
							]),
						]),
						new Element("LeftParen", {}, [new Text("(")]),
						new Element("ColumnList", {}, [
							new Element("ColumnName", { value: "text_column" }, [
								new Element("Identifier", {}, [new Text("text_column")]),
							]),
							new Element("Comma", {}, [new Text(",")]),
							new Element("ColumnName", { value: "num_column" }, [
								new Element("Identifier", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("num_column"),
								]),
							]),
						]),
						new Element("RightParen", {}, [
							new Text(")"),
							new Element("LineBreak", {}, [new Text("\n")]),
						]),
						new Element("OnDeleteClause", {}, [
							new Element("Reserved", { value: "ON" }, [
								new Element("WhiteSpace", {}, [new Text("    ")]),
								new Text("ON"),
							]),
							new Element("Reserved", { value: "DELETE" }, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("DELETE"),
							]),
							new Element("SetNullOption", {}, [
								new Element("Reserved", { value: "SET" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("SET"),
								]),
								new Element("Reserved", { value: "NULL" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("NULL"),
									new Element("LineBreak", {}, [new Text("\n")]),
								]),
							]),
						]),
						new Element("MatchClause", {}, [
							new Element("Identifier", { value: "MATCH" }, [
								new Element("WhiteSpace", {}, [new Text("    ")]),
								new Text("MATCH"),
							]),
							new Element("SimpleOption", {}, [
								new Element("Identifier", { value: "SIMPLE" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("SIMPLE"),
									new Element("LineBreak", {}, [new Text("\n")]),
								]),
							]),
						]),
						new Element("OnUpdateClause", {}, [
							new Element("Reserved", { value: "ON" }, [
								new Element("WhiteSpace", {}, [new Text("    ")]),
								new Text("ON"),
							]),
							new Element("Reserved", { value: "UPDATE" }, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("UPDATE"),
							]),
							new Element("CascadeOption", {}, [
								new Element("Identifier", { value: "CASCADE" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("CASCADE"),
									new Element("LineBreak", {}, [new Text("\n")]),
								]),
							]),
						]),
						new Element("NotDeferrableOption", {}, [
							new Element("Reserved", { value: "NOT" }, [
								new Element("WhiteSpace", {}, [new Text("    ")]),
								new Text("NOT"),
							]),
							new Element("Reserved", { value: "DEFERRABLE" }, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("DEFERRABLE"),
							]),
							new Element("InitiallyDeferredOption", {}, [
								new Element("Identifier", { value: "INITIALLY" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("INITIALLY"),
								]),
								new Element("Identifier", { value: "DEFERRED" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("DEFERRED"),
									new Element("LineBreak", {}, [new Text("\n")]),
								]),
							]),
						]),
					]),
				]),
			]),
		]),
		new Element("RightParen", {}, [new Text(")")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateTableStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [
			new Element("LineBreak", {}, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("VirtualOption", {}, [
			new Element("Identifier", { value: "VIRTUAL" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("VIRTUAL"),
			]),
		]),
		new Element("Reserved", { value: "TABLE" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("ObjectName", { value: "tablename" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("tablename"),
			]),
		]),
		new Element("UsingModuleClause", {}, [
			new Element("Reserved", { value: "USING" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("USING"),
			]),
			new Element("ModuleName", { value: "modulename" }, [
				new Element("Identifier", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("modulename"),
				]),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateTableStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("VirtualOption", {}, [
			new Element("Identifier", { value: "VIRTUAL" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("VIRTUAL"),
			]),
		]),
		new Element("Reserved", { value: "TABLE" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("SchemaName", { value: "temp" }, [
			new Element("Identifier", { value: "TEMP" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("temp"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "t1" }, [
			new Element("Identifier", {}, [new Text("t1")]),
		]),
		new Element("UsingModuleClause", {}, [
			new Element("Reserved", { value: "USING" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("USING"),
			]),
			new Element("ModuleName", { value: "csv" }, [
				new Element("Identifier", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("csv"),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("ModuleArgumentList", {}, [
				new Element("ModuleArgument", {}, [
					new Element("Identifier", {}, [
						new Text("filename"),
						new Element("WhiteSpace", {}, [new Text(" ")]),
					]),
					new Element("Operator", {}, [new Text("=")]),
					new Element("String", {}, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("'thefile.csv'"),
					]),
				]),
			]),
			new Element("RightParen", {}, [new Text(")")]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateTableStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("VirtualOption", {}, [
			new Element("Identifier", { value: "VIRTUAL" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("VIRTUAL"),
			]),
		]),
		new Element("Reserved", { value: "TABLE" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("ObjectName", { value: "email" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("email"),
			]),
		]),
		new Element("UsingModuleClause", {}, [
			new Element("Reserved", { value: "USING" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("USING"),
			]),
			new Element("ModuleName", { value: "fts5" }, [
				new Element("Identifier", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("fts5"),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("ModuleArgumentList", {}, [
				new Element("ModuleArgument", {}, [
					new Element("Identifier", {}, [new Text("sender")]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("ModuleArgument", {}, [
					new Element("Identifier", {}, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("title"),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("ModuleArgument", {}, [
					new Element("Identifier", { value: "BODY" }, [
						new Element("WhiteSpace", {}, [new Text(" ")]),
						new Text("body"),
					]),
				]),
			]),
			new Element("RightParen", {}, [new Text(")")]),
		]),
	]),
	new Element("SemiColon", {}, [new Text(";")]),
	new Element("EoF", {}),
]);
