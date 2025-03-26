import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "CreateTableStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Element("trivia", { type: "BlockComment" }, [
				new Text("/* test table_1 */"),
			]),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("token", { value: "TABLE", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "table_1" }, [
			new Element("token", { type: "Identifier" }, [
				new Text("table_1"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "LeftParen" }, [
			new Text("("),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
		]),
		new Element("node", { type: "TableColumnList" }, [
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "text_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("text_column"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "TEXT" }, [
						new Element("token", { value: "TEXT", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("TEXT"),
						]),
					]),
				]),
				new Element("node", { type: "ColumnConstraint" }, [
					new Element("node", { type: "NotNullConstraint" }, [
						new Element("token", { value: "NOT", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NOT"),
						]),
						new Element("token", { value: "NULL", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NULL"),
						]),
					]),
				]),
				new Element("node", { type: "ColumnConstraint" }, [
					new Element("node", { type: "PrimaryKeyConstraint" }, [
						new Element("token", { value: "PRIMARY", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("PRIMARY"),
						]),
						new Element("token", { value: "KEY", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("KEY"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "LineComment" }, [
					new Text("-- text affinity"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "num_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("num_column"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "NUMERIC" }, [
						new Element("token", { value: "NUMERIC", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NUMERIC"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "LineComment" }, [
					new Text("-- numeric affinity"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "int_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("int_column"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "INTEGER" }, [
						new Element("token", { value: "INTEGER", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "LineComment" }, [
					new Text("-- integer affinity"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "real_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("real_column"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "INTEGER" }, [
						new Element("token", { value: "INTEGER", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "LineComment" }, [
					new Text("-- real affinity"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "blob_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("blob_column"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "BLOB" }, [
						new Element("token", { value: "BLOB", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("BLOB"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text("   ")]),
				new Element("trivia", { type: "LineComment" }, [
					new Text("-- no affinity"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element(
					"node",
					{ type: "ColumnName", value: "no_affinity_column" },
					[
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
							new Text("no_affinity_column"),
							new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
							new Element("trivia", { type: "LineComment" }, [
								new Text("-- no affinity"),
							]),
							new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
						]),
					],
				),
			]),
		]),
		new Element("token", { type: "RightParen" }, [new Text(")")]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateTableStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			new Element("trivia", { type: "BlockComment" }, [
				new Text("/* test table_2 */"),
			]),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("node", { type: "TemporaryOption" }, [
			new Element("token", { value: "TEMP", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("temp"),
			]),
		]),
		new Element("token", { value: "TABLE", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("node", { type: "ObjectName", value: "table_2" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("table_2"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "LeftParen" }, [
			new Text("("),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
		]),
		new Element("node", { type: "TableColumnList" }, [
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "text_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text('"text_column"'),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "TEXT" }, [
						new Element("token", { value: "TEXT", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("TEXT"),
						]),
					]),
				]),
				new Element("node", { type: "ColumnConstraint" }, [
					new Element("node", { type: "NotNullConstraint" }, [
						new Element("token", { value: "NOT", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NOT"),
						]),
						new Element("token", { value: "NULL", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NULL"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "BlockComment" }, [
					new Text("/*text affinity*/"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "num_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("[num_column]"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "NUMERIC" }, [
						new Element("token", { value: "NUMERIC", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NUMERIC"),
						]),
					]),
				]),
				new Element("node", { type: "ColumnConstraint" }, [
					new Element("node", { type: "NotNullConstraint" }, [
						new Element("token", { value: "NOT", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NOT"),
						]),
						new Element("token", { value: "NULL", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NULL"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "BlockComment" }, [
					new Text("/*numeric affinity*/"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "int_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("`int_column`"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "INTEGER" }, [
						new Element("token", { value: "INTEGER", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "BlockComment" }, [
					new Text("/*integer affinity*/"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "real_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text('"real_column"'),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "INTEGER" }, [
						new Element("token", { value: "INTEGER", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("INTEGER"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Element("trivia", { type: "BlockComment" }, [
					new Text("/*real affinity*/"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "blob_column" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("[blob_column]"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "BLOB" }, [
						new Element("token", { value: "BLOB", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("BLOB"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text("   ")]),
				new Element("trivia", { type: "BlockComment" }, [
					new Text("/*no affinity*/"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element(
					"node",
					{ type: "ColumnName", value: "no_affinity_column" },
					[
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
							new Text("`no_affinity_column`"),
						]),
					],
				),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
				new Element("trivia", { type: "BlockComment" }, [
					new Text("/*no affinity*/"),
				]),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableConstraint" }, [
				new Element("node", { type: "PrimaryKeyConstraint" }, [
					new Element("token", { value: "PRIMARY", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("PRIMARY"),
					]),
					new Element("token", { value: "KEY", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("KEY"),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "SortColumnList" }, [
						new Element("node", { type: "SortColumn" }, [
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element(
										"node",
										{ type: "ColumnName", value: "text_column" },
										[
											new Element("token", { type: "Identifier" }, [
												new Text("text_column"),
											]),
										],
									),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "SortColumn" }, [
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element(
										"node",
										{ type: "ColumnName", value: "num_column" },
										[
											new Element("token", { type: "Identifier" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("num_column"),
											]),
										],
									),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [
						new Text(")"),
						new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
					]),
				]),
			]),
		]),
		new Element("token", { type: "RightParen" }, [
			new Text(")"),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateTableStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Element("trivia", { type: "BlockComment" }, [
				new Text("/* test table_3 */"),
			]),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("node", { type: "TemporaryOption" }, [
			new Element("token", { value: "TEMPORARY", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("temporary"),
			]),
		]),
		new Element("token", { value: "TABLE", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("node", { type: "ObjectName", value: "table_3" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("table_3"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "LeftParen" }, [
			new Text("("),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
		]),
		new Element("node", { type: "TableColumnList" }, [
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "col_1" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("col_1"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "TEXT" }, [
						new Element("token", { value: "TEXT", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("TEXT"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableColumn" }, [
				new Element("node", { type: "ColumnName", value: "col_2" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
						new Text("col_2"),
					]),
				]),
				new Element("node", { type: "ColumnType" }, [
					new Element("node", { type: "TypeName", value: "NUMERIC" }, [
						new Element("token", { value: "NUMERIC", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("NUMERIC"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableConstraint" }, [
				new Element("token", { value: "CONSTRAINT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
					new Text("CONSTRAINT"),
				]),
				new Element("node", { type: "ConstraintName", value: "c_001" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("c_001"),
					]),
				]),
				new Element("node", { type: "UniqueConstraint" }, [
					new Element("token", { value: "UNIQUE", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("UNIQUE"),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "SortColumnList" }, [
						new Element("node", { type: "SortColumn" }, [
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "col_1" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("col_1"),
										]),
									]),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "SortColumn" }, [
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "col_2" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("col_2"),
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
										]),
									]),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [
						new Text(")"),
						new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
					]),
					new Element("node", { type: "OnConflictClause" }, [
						new Element("token", { value: "ON", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text("    ")]),
							new Text("ON"),
						]),
						new Element("token", { value: "CONFLICT", type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("CONFLICT"),
						]),
						new Element("node", { type: "RollbackOption" }, [
							new Element("token", { value: "ROLLBACK", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("ROLLBACK"),
							]),
						]),
					]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableConstraint" }, [
				new Element("token", { value: "CONSTRAINT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
					new Text("CONSTRAINT"),
				]),
				new Element("node", { type: "ConstraintName", value: "c_002" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("c_002"),
					]),
				]),
				new Element("node", { type: "CheckConstraint" }, [
					new Element("token", { value: "CHECK", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("CHECK"),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "GreaterThanOperation" }, [
							new Element("node", { type: "AddOperation" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "col_1" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("col_1"),
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
										]),
									]),
								]),
								new Element("token", { type: "Operator" }, [new Text("+")]),
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "col_2" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("col_2"),
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text(">")]),
							new Element("node", { type: "NumericLiteral", value: "0" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("0"),
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
			new Element("token", { type: "Comma" }, [
				new Text(","),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "TableConstraint" }, [
				new Element("token", { value: "CONSTRAINT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
					new Text("CONSTRAINT"),
				]),
				new Element("node", { type: "ConstraintName", value: "c_003" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("c_003"),
					]),
				]),
				new Element("node", { type: "ForeignKeyConstraint" }, [
					new Element("token", { value: "FOREIGN", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("FOREIGN"),
					]),
					new Element("token", { value: "KEY", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("KEY"),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ColumnList" }, [
						new Element("node", { type: "ColumnName", value: "col_1" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("col_1"),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "ColumnName", value: "col_2" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("col_2"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [
						new Text(")"),
						new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
					]),
					new Element("node", { type: "ReferencesClause" }, [
						new Element("token", { value: "REFERENCES", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text("    ")]),
							new Text("REFERENCES"),
						]),
						new Element("node", { type: "ObjectName", value: "table_1" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("table_1"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
						]),
						new Element("token", { type: "LeftParen" }, [new Text("(")]),
						new Element("node", { type: "ColumnList" }, [
							new Element(
								"node",
								{ type: "ColumnName", value: "text_column" },
								[
									new Element("token", { type: "Identifier" }, [
										new Text("text_column"),
									]),
								],
							),
							new Element("token", { type: "Comma" }, [new Text(",")]),
							new Element("node", { type: "ColumnName", value: "num_column" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("num_column"),
								]),
							]),
						]),
						new Element("token", { type: "RightParen" }, [
							new Text(")"),
							new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
						]),
						new Element("node", { type: "OnDeleteClause" }, [
							new Element("token", { value: "ON", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [
									new Text("    "),
								]),
								new Text("ON"),
							]),
							new Element("token", { value: "DELETE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("DELETE"),
							]),
							new Element("node", { type: "SetNullOption" }, [
								new Element("token", { value: "SET", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("SET"),
								]),
								new Element("token", { value: "NULL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("NULL"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
						new Element("node", { type: "MatchClause" }, [
							new Element("token", { value: "MATCH", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [
									new Text("    "),
								]),
								new Text("MATCH"),
							]),
							new Element("node", { type: "SimpleOption" }, [
								new Element("token", { value: "SIMPLE", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("SIMPLE"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
						new Element("node", { type: "OnUpdateClause" }, [
							new Element("token", { value: "ON", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [
									new Text("    "),
								]),
								new Text("ON"),
							]),
							new Element("token", { value: "UPDATE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("UPDATE"),
							]),
							new Element("node", { type: "CascadeOption" }, [
								new Element("token", { value: "CASCADE", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("CASCADE"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
						new Element("node", { type: "NotDeferrableOption" }, [
							new Element("token", { value: "NOT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [
									new Text("    "),
								]),
								new Text("NOT"),
							]),
							new Element("token", { value: "DEFERRABLE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("DEFERRABLE"),
							]),
							new Element("node", { type: "InitiallyDeferredOption" }, [
								new Element(
									"token",
									{ value: "INITIALLY", type: "Identifier" },
									[
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("INITIALLY"),
									],
								),
								new Element(
									"token",
									{ value: "DEFERRED", type: "Identifier" },
									[
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("DEFERRED"),
										new Element("trivia", { type: "LineBreak" }, [
											new Text("\n"),
										]),
									],
								),
							]),
						]),
					]),
				]),
			]),
		]),
		new Element("token", { type: "RightParen" }, [new Text(")")]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateTableStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("node", { type: "VirtualOption" }, [
			new Element("token", { value: "VIRTUAL", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("VIRTUAL"),
			]),
		]),
		new Element("token", { value: "TABLE", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("node", { type: "ObjectName", value: "tablename" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("tablename"),
			]),
		]),
		new Element("node", { type: "UsingModuleClause" }, [
			new Element("token", { value: "USING", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("USING"),
			]),
			new Element("node", { type: "ModuleName", value: "modulename" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("modulename"),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateTableStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "VirtualOption" }, [
			new Element("token", { value: "VIRTUAL", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("VIRTUAL"),
			]),
		]),
		new Element("token", { value: "TABLE", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "temp" }, [
			new Element("token", { value: "TEMP", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("temp"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "t1" }, [
			new Element("token", { type: "Identifier" }, [new Text("t1")]),
		]),
		new Element("node", { type: "UsingModuleClause" }, [
			new Element("token", { value: "USING", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("USING"),
			]),
			new Element("node", { type: "ModuleName", value: "csv" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("csv"),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "ModuleArgumentList" }, [
				new Element("node", { type: "ModuleArgument" }, [
					new Element("token", { type: "Identifier" }, [
						new Text("filename"),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "Operator" }, [new Text("=")]),
					new Element("token", { type: "String" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("'thefile.csv'"),
					]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateTableStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "VirtualOption" }, [
			new Element("token", { value: "VIRTUAL", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("VIRTUAL"),
			]),
		]),
		new Element("token", { value: "TABLE", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TABLE"),
		]),
		new Element("node", { type: "ObjectName", value: "email" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("email"),
			]),
		]),
		new Element("node", { type: "UsingModuleClause" }, [
			new Element("token", { value: "USING", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("USING"),
			]),
			new Element("node", { type: "ModuleName", value: "fts5" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("fts5"),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "ModuleArgumentList" }, [
				new Element("node", { type: "ModuleArgument" }, [
					new Element("token", { type: "Identifier" }, [new Text("sender")]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "ModuleArgument" }, [
					new Element("token", { type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("title"),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "ModuleArgument" }, [
					new Element("token", { value: "BODY", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("body"),
					]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [new Text(";")]),
	new Element("token", { type: "EoF" }),
]);
