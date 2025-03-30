import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ix_sample"),
			]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "a" }, [
								new Element("token", { type: "Identifier" }, [new Text("a")]),
							]),
						]),
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
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("ix_sample")]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "a" }, [
								new Element("token", { type: "Identifier" }, [new Text("a")]),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "b" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("b"),
								]),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "c" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("c"),
								]),
							]),
						]),
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
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ix_sample"),
			]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "a" }, [
								new Element("token", { type: "Identifier" }, [new Text("a")]),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "b" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("b"),
								]),
							]),
						]),
					]),
					new Element("node", { type: "AscOption" }, [
						new Element("token", { type: "Identifier", value: "ASC" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("ASC"),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "c" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("c"),
								]),
							]),
						]),
					]),
					new Element("node", { type: "DescOption" }, [
						new Element("token", { type: "Identifier", value: "DESC" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("DESC"),
						]),
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
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "IfNotExistsOption" }, [
			new Element("token", { type: "Identifier", value: "IF" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("token", { type: "Reserved", value: "NOT" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("token", { type: "Reserved", value: "EXISTS" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("ix_sample")]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "AddOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "a" }, [
									new Element("token", { type: "Identifier" }, [
										new Text("a"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("+")]),
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("1"),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
		]),
		new Element("node", { type: "WhereClause" }, [
			new Element("token", { type: "Reserved", value: "WHERE" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("WHERE"),
			]),
			new Element("node", { type: "Expression" }, [
				new Element("node", { type: "EqualOperation" }, [
					new Element("node", { type: "ColumnReference" }, [
						new Element("node", { type: "ColumnName", value: "a" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("a"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
						]),
					]),
					new Element("token", { type: "Operator" }, [new Text("=")]),
					new Element("node", { type: "NumericLiteral", value: "1" }, [
						new Element("token", { type: "Numeric" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "UniqueOption" }, [
			new Element("token", { type: "Reserved", value: "UNIQUE" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("UNIQUE"),
			]),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("ix_sample")]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "AddOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "a" }, [
									new Element("token", { type: "Identifier" }, [
										new Text("a"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("+")]),
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("1"),
								]),
							]),
						]),
					]),
					new Element("node", { type: "AscOption" }, [
						new Element("token", { type: "Identifier", value: "ASC" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("ASC"),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "AddOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "b" }, [
									new Element("token", { type: "Identifier" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("b"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("+")]),
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("1"),
								]),
							]),
						]),
					]),
					new Element("node", { type: "DescOption" }, [
						new Element("token", { type: "Identifier", value: "DESC" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("DESC"),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "c" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("c"),
								]),
							]),
						]),
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
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "UniqueOption" }, [
			new Element("token", { type: "Reserved", value: "UNIQUE" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("UNIQUE"),
			]),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "IfNotExistsOption" }, [
			new Element("token", { type: "Identifier", value: "IF" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("token", { type: "Reserved", value: "NOT" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("token", { type: "Reserved", value: "EXISTS" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("ix_sample")]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "CollateOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "a" }, [
									new Element("token", { type: "Identifier" }, [new Text("a")]),
								]),
							]),
							new Element("token", { type: "Reserved", value: "COLLATE" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("COLLATE"),
							]),
							new Element("node", { type: "CollationName", value: "test" }, [
								new Element("token", { type: "Identifier", value: "TEST" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("test"),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
		]),
		new Element("node", { type: "WhereClause" }, [
			new Element("token", { type: "Reserved", value: "WHERE" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("WHERE"),
			]),
			new Element("node", { type: "Expression" }, [
				new Element("node", { type: "EqualOperation" }, [
					new Element("node", { type: "ColumnReference" }, [
						new Element("node", { type: "ColumnName", value: "a" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("a"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
						]),
					]),
					new Element("token", { type: "Operator" }, [new Text("=")]),
					new Element("node", { type: "NumericLiteral", value: "1" }, [
						new Element("token", { type: "Numeric" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateIndexStatement" }, [
		new Element("token", { type: "Reserved", value: "CREATE" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "UniqueOption" }, [
			new Element("token", { type: "Reserved", value: "UNIQUE" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("UNIQUE"),
			]),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "IfNotExistsOption" }, [
			new Element("token", { type: "Identifier", value: "IF" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("token", { type: "Reserved", value: "NOT" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("token", { type: "Reserved", value: "EXISTS" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "ix_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("ix_sample")]),
		]),
		new Element("node", { type: "IndexOnClause" }, [
			new Element("token", { type: "Reserved", value: "ON" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { type: "Identifier", value: "SAMPLE" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "AddOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "a" }, [
									new Element("token", { type: "Identifier" }, [
										new Text("a"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("+")]),
							new Element("node", { type: "CollateOperation" }, [
								new Element("node", { type: "NumericLiteral", value: "1" }, [
									new Element("token", { type: "Numeric" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("1"),
									]),
								]),
								new Element("token", { type: "Reserved", value: "COLLATE" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("COLLATE"),
								]),
								new Element("node", { type: "CollationName", value: "test" }, [
									new Element("token", { type: "Identifier", value: "TEST" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("test"),
									]),
								]),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "AddOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "b" }, [
									new Element("token", { type: "Identifier" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("b"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("+")]),
							new Element("node", { type: "CollateOperation" }, [
								new Element("node", { type: "NumericLiteral", value: "1" }, [
									new Element("token", { type: "Numeric" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("1"),
									]),
								]),
								new Element("token", { type: "Reserved", value: "COLLATE" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("COLLATE"),
								]),
								new Element("node", { type: "CollationName", value: "test" }, [
									new Element("token", { type: "Identifier", value: "TEST" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("test"),
									]),
								]),
							]),
						]),
					]),
					new Element("node", { type: "AscOption" }, [
						new Element("token", { type: "Identifier", value: "ASC" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("ASC"),
						]),
					]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
		]),
		new Element("node", { type: "WhereClause" }, [
			new Element("token", { type: "Reserved", value: "WHERE" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("WHERE"),
			]),
			new Element("node", { type: "Expression" }, [
				new Element("node", { type: "EqualOperation" }, [
					new Element("node", { type: "ColumnReference" }, [
						new Element("node", { type: "ColumnName", value: "a" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("a"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
						]),
					]),
					new Element("token", { type: "Operator" }, [new Text("=")]),
					new Element("node", { type: "NumericLiteral", value: "1" }, [
						new Element("token", { type: "Numeric" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
