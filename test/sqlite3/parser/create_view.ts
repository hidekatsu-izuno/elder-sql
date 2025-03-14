import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("CreateViewStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("v_sample"),
			]),
		]),
		new Element("Reserved", { value: "AS" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("SelectStatement", {}, [
			new Element("SelectClause", {}, [
				new Element("Reserved", { value: "SELECT" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("SelectColumnList", {}, [
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
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
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateViewStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
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
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [
				new Text("v_sample"),
				new Element("WhiteSpace", {}, [new Text(" ")]),
			]),
		]),
		new Element("LeftParen", {}, [new Text("(")]),
		new Element("ColumnList", {}, [
			new Element("ColumnName", { value: "x" }, [
				new Element("Identifier", {}, [new Text("x")]),
			]),
		]),
		new Element("RightParen", {}, [new Text(")")]),
		new Element("Reserved", { value: "AS" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("SelectStatement", {}, [
			new Element("SelectClause", {}, [
				new Element("Reserved", { value: "SELECT" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("SelectColumnList", {}, [
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
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
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateViewStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("TemporaryOption", {}, [
			new Element("Identifier", { value: "TEMP" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("TEMP"),
			]),
		]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [new Text("v_sample")]),
		]),
		new Element("Reserved", { value: "AS" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("SelectStatement", {}, [
			new Element("SelectClause", {}, [
				new Element("Reserved", { value: "SELECT" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("SelectColumnList", {}, [
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
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
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CreateViewStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("TemporaryOption", {}, [
			new Element("Reserved", { value: "TEMPORARY" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("TEMPORARY"),
			]),
		]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [
				new Text("v_sample"),
				new Element("WhiteSpace", {}, [new Text(" ")]),
			]),
		]),
		new Element("LeftParen", {}, [new Text("(")]),
		new Element("ColumnList", {}, [
			new Element("ColumnName", { value: "a" }, [
				new Element("Identifier", {}, [new Text("a")]),
			]),
			new Element("Comma", {}, [new Text(",")]),
			new Element("ColumnName", { value: "b" }, [
				new Element("Identifier", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("b"),
				]),
			]),
			new Element("Comma", {}, [new Text(",")]),
			new Element("ColumnName", { value: "c" }, [
				new Element("Identifier", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("c"),
				]),
			]),
		]),
		new Element("RightParen", {}, [new Text(")")]),
		new Element("Reserved", { value: "AS" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("SelectStatement", {}, [
			new Element("SelectClause", {}, [
				new Element("Reserved", { value: "SELECT" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("SelectColumnList", {}, [
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
							new Element("NumericLiteral", { value: "1" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("1"),
								]),
							]),
						]),
					]),
					new Element("Comma", {}, [new Text(",")]),
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
							new Element("NumericLiteral", { value: "2" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("2"),
								]),
							]),
						]),
					]),
					new Element("Comma", {}, [new Text(",")]),
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
							new Element("NumericLiteral", { value: "3" }, [
								new Element("Numeric", {}, [
									new Element("WhiteSpace", {}, [new Text(" ")]),
									new Text("3"),
								]),
							]),
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
	new Element("CreateViewStatement", {}, [
		new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
		new Element("TemporaryOption", {}, [
			new Element("Reserved", { value: "TEMPORARY" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("TEMPORARY"),
			]),
		]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
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
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [new Text("v_sample")]),
		]),
		new Element("Reserved", { value: "AS" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("SelectStatement", {}, [
			new Element("SelectClause", {}, [
				new Element("Reserved", { value: "SELECT" }, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("SelectColumnList", {}, [
					new Element("SelectColumn", {}, [
						new Element("Expression", {}, [
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
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("EoF", {}),
]);
