import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ix_sample"),
			]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "a" }, [
								new Element("Identifier", {}, [new Text("a")]),
							]),
						]),
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
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [new Text("ix_sample")]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "a" }, [
								new Element("Identifier", {}, [new Text("a")]),
							]),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "b" }, [
								new Element("Identifier", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("b"),
								]),
							]),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "c" }, [
								new Element("Identifier", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("c"),
								]),
							]),
						]),
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
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ix_sample"),
			]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "a" }, [
								new Element("Identifier", {}, [new Text("a")]),
							]),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "b" }, [
								new Element("Identifier", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("b"),
								]),
							]),
						]),
					]),
					new Element("AscOption", {}, [
						new Element("Identifier", { value: "ASC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("ASC"),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "c" }, [
								new Element("Identifier", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("c"),
								]),
							]),
						]),
					]),
					new Element("DescOption", {}, [
						new Element("Identifier", { value: "DESC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("DESC"),
						]),
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
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("IfNotExistsOption", {}, [
			new Element("Identifier", { value: "IF" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("Reserved", { value: "NOT" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("Reserved", { value: "EXISTS" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [new Text("ix_sample")]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("AddOperation", {}, [
							new Element("ColumnReference", {}, [
								new Element("ColumnName", { value: "a" }, [
									new Element("Identifier", {}, [
										new Text("a"),
										new Element("WhiteSpace", {}, [new Text(" ")]),
									]),
								]),
							]),
							new Element("Operator", {}, [new Text("+")]),
							new Element("NumericLiteral", { value: "1" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("1"),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("RightParen", {}, [new Text(")")]),
		]),
		new Element("WhereClause", {}, [
			new Element("Reserved", { value: "WHERE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("WHERE"),
			]),
			new Element("Expression", {}, [
				new Element("EqualOperation", {}, [
					new Element("ColumnReference", {}, [
						new Element("ColumnName", { value: "a" }, [
							new Element("Identifier", {}, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("a"),
								new Element("WhiteSpace", {}, [new Text(" ")]),
							]),
						]),
					]),
					new Element("Operator", {}, [new Text("=")]),
					new Element("NumericLiteral", { value: "1" }, [
						new Element("Numeric", {}, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("UniqueOption", {}, [
			new Element("Reserved", { value: "UNIQUE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("UNIQUE"),
			]),
		]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [new Text("ix_sample")]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("AddOperation", {}, [
							new Element("ColumnReference", {}, [
								new Element("ColumnName", { value: "a" }, [
									new Element("Identifier", {}, [
										new Text("a"),
										new Element("WhiteSpace", {}, [new Text(" ")]),
									]),
								]),
							]),
							new Element("Operator", {}, [new Text("+")]),
							new Element("NumericLiteral", { value: "1" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("1"),
								]),
							]),
						]),
					]),
					new Element("AscOption", {}, [
						new Element("Identifier", { value: "ASC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("ASC"),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("AddOperation", {}, [
							new Element("ColumnReference", {}, [
								new Element("ColumnName", { value: "b" }, [
									new Element("Identifier", {}, [
										new Element("WhiteSpace", {}, [new Text(" ")]),
										new Text("b"),
										new Element("WhiteSpace", {}, [new Text(" ")]),
									]),
								]),
							]),
							new Element("Operator", {}, [new Text("+")]),
							new Element("NumericLiteral", { value: "1" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("1"),
								]),
							]),
						]),
					]),
					new Element("DescOption", {}, [
						new Element("Identifier", { value: "DESC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("DESC"),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("ColumnReference", {}, [
							new Element("ColumnName", { value: "c" }, [
								new Element("Identifier", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("c"),
								]),
							]),
						]),
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
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("UniqueOption", {}, [
			new Element("Reserved", { value: "UNIQUE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("UNIQUE"),
			]),
		]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("IfNotExistsOption", {}, [
			new Element("Identifier", { value: "IF" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("Reserved", { value: "NOT" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("Reserved", { value: "EXISTS" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [new Text("ix_sample")]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("CollateOperation", {}, [
							new Element("ColumnReference", {}, [
								new Element("ColumnName", { value: "a" }, [
									new Element("Identifier", {}, [new Text("a")]),
								]),
							]),
							new Element("Reserved", { value: "COLLATE" }, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("COLLATE"),
							]),
							new Element("CollationName", { value: "test" }, [
								new Element("Identifier", { value: "TEST" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("test"),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("RightParen", {}, [new Text(")")]),
		]),
		new Element("WhereClause", {}, [
			new Element("Reserved", { value: "WHERE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("WHERE"),
			]),
			new Element("Expression", {}, [
				new Element("EqualOperation", {}, [
					new Element("ColumnReference", {}, [
						new Element("ColumnName", { value: "a" }, [
							new Element("Identifier", {}, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("a"),
								new Element("WhiteSpace", {}, [new Text(" ")]),
							]),
						]),
					]),
					new Element("Operator", {}, [new Text("=")]),
					new Element("NumericLiteral", { value: "1" }, [
						new Element("Numeric", {}, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateIndexStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("UniqueOption", {}, [
			new Element("Reserved", { value: "UNIQUE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("UNIQUE"),
			]),
		]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("IfNotExistsOption", {}, [
			new Element("Identifier", { value: "IF" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("Reserved", { value: "NOT" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("Reserved", { value: "EXISTS" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "ix_sample" }, [
			new Element("Identifier", {}, [new Text("ix_sample")]),
		]),
		new Element("IndexOnClause", {}, [
			new Element("Reserved", { value: "ON" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("ON"),
			]),
			new Element("ObjectName", { value: "sample" }, [
				new Element("Identifier", { value: "SAMPLE" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("sample"),
					new Element("WhiteSpace", {}, [new Text(" ")]),
				]),
			]),
			new Element("LeftParen", {}, [new Text("(")]),
			new Element("SortColumnList", {}, [
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("AddOperation", {}, [
							new Element("ColumnReference", {}, [
								new Element("ColumnName", { value: "a" }, [
									new Element("Identifier", {}, [
										new Text("a"),
										new Element("WhiteSpace", {}, [new Text(" ")]),
									]),
								]),
							]),
							new Element("Operator", {}, [new Text("+")]),
							new Element("CollateOperation", {}, [
								new Element("NumericLiteral", { value: "1" }, [
									new Element("Numeric", {}, [
										new Element("WhiteSpace", {}, [new Text(" ")]),
										new Text("1"),
									]),
								]),
								new Element("Reserved", { value: "COLLATE" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("COLLATE"),
								]),
								new Element("CollationName", { value: "test" }, [
									new Element("Identifier", { value: "TEST" }, [
										new Element("WhiteSpace", {}, [new Text(" ")]),
										new Text("test"),
									]),
								]),
							]),
						]),
					]),
				]),
				new Element("Comma", {}, [new Text(",")]),
				new Element("SortColumn", {}, [
					new Element("Expression", {}, [
						new Element("AddOperation", {}, [
							new Element("ColumnReference", {}, [
								new Element("ColumnName", { value: "b" }, [
									new Element("Identifier", {}, [
										new Element("WhiteSpace", {}, [new Text(" ")]),
										new Text("b"),
										new Element("WhiteSpace", {}, [new Text(" ")]),
									]),
								]),
							]),
							new Element("Operator", {}, [new Text("+")]),
							new Element("CollateOperation", {}, [
								new Element("NumericLiteral", { value: "1" }, [
									new Element("Numeric", {}, [
										new Element("WhiteSpace", {}, [new Text(" ")]),
										new Text("1"),
									]),
								]),
								new Element("Reserved", { value: "COLLATE" }, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("COLLATE"),
								]),
								new Element("CollationName", { value: "test" }, [
									new Element("Identifier", { value: "TEST" }, [
										new Element("WhiteSpace", {}, [new Text(" ")]),
										new Text("test"),
									]),
								]),
							]),
						]),
					]),
					new Element("AscOption", {}, [
						new Element("Identifier", { value: "ASC" }, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("ASC"),
						]),
					]),
				]),
			]),
			new Element("RightParen", {}, [new Text(")")]),
		]),
		new Element("WhereClause", {}, [
			new Element("Reserved", { value: "WHERE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("WHERE"),
			]),
			new Element("Expression", {}, [
				new Element("EqualOperation", {}, [
					new Element("ColumnReference", {}, [
						new Element("ColumnName", { value: "a" }, [
							new Element("Identifier", {}, [
								new Element("WhiteSpace", {}, [new Text(" ")]),
								new Text("a"),
								new Element("WhiteSpace", {}, [new Text(" ")]),
							]),
						]),
					]),
					new Element("Operator", {}, [new Text("=")]),
					new Element("NumericLiteral", { value: "1" }, [
						new Element("Numeric", {}, [
							new Element("WhiteSpace", {}, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("EoF", {}),
]);
