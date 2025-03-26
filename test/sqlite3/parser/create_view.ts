import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "CreateViewStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("token", { value: "VIEW", type: "Identifier" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("node", { type: "ObjectName", value: "v_sample" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("v_sample"),
			]),
		]),
		new Element("token", { value: "AS", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("node", { type: "SelectStatement" }, [
			new Element("node", { type: "SelectClause" }, [
				new Element("token", { value: "SELECT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateViewStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("token", { value: "VIEW", type: "Identifier" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("node", { type: "IfNotExistsOption" }, [
			new Element("token", { value: "IF", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("token", { value: "NOT", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("token", { value: "EXISTS", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "v_sample" }, [
			new Element("token", { type: "Identifier" }, [
				new Text("v_sample"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "LeftParen" }, [new Text("(")]),
		new Element("node", { type: "ColumnList" }, [
			new Element("node", { type: "ColumnName", value: "x" }, [
				new Element("token", { type: "Identifier" }, [new Text("x")]),
			]),
		]),
		new Element("token", { type: "RightParen" }, [new Text(")")]),
		new Element("token", { value: "AS", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("node", { type: "SelectStatement" }, [
			new Element("node", { type: "SelectClause" }, [
				new Element("token", { value: "SELECT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateViewStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "TemporaryOption" }, [
			new Element("token", { value: "TEMP", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("TEMP"),
			]),
		]),
		new Element("token", { value: "VIEW", type: "Identifier" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "v_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("v_sample")]),
		]),
		new Element("token", { value: "AS", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("node", { type: "SelectStatement" }, [
			new Element("node", { type: "SelectClause" }, [
				new Element("token", { value: "SELECT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CreateViewStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "TemporaryOption" }, [
			new Element("token", { value: "TEMPORARY", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("TEMPORARY"),
			]),
		]),
		new Element("token", { value: "VIEW", type: "Identifier" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "v_sample" }, [
			new Element("token", { type: "Identifier" }, [
				new Text("v_sample"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "LeftParen" }, [new Text("(")]),
		new Element("node", { type: "ColumnList" }, [
			new Element("node", { type: "ColumnName", value: "a" }, [
				new Element("token", { type: "Identifier" }, [new Text("a")]),
			]),
			new Element("token", { type: "Comma" }, [new Text(",")]),
			new Element("node", { type: "ColumnName", value: "b" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("b"),
				]),
			]),
			new Element("token", { type: "Comma" }, [new Text(",")]),
			new Element("node", { type: "ColumnName", value: "c" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("c"),
				]),
			]),
		]),
		new Element("token", { type: "RightParen" }, [new Text(")")]),
		new Element("token", { value: "AS", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("node", { type: "SelectStatement" }, [
			new Element("node", { type: "SelectClause" }, [
				new Element("token", { value: "SELECT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
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
					new Element("token", { type: "Comma" }, [new Text(",")]),
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "2" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("2"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "Comma" }, [new Text(",")]),
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "3" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("3"),
								]),
							]),
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
	new Element("node", { type: "CreateViewStatement" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Text("CREATE"),
		]),
		new Element("node", { type: "TemporaryOption" }, [
			new Element("token", { value: "TEMPORARY", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("TEMPORARY"),
			]),
		]),
		new Element("token", { value: "VIEW", type: "Identifier" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("node", { type: "IfNotExistsOption" }, [
			new Element("token", { value: "IF", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("token", { value: "NOT", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("NOT"),
			]),
			new Element("token", { value: "EXISTS", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "v_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("v_sample")]),
		]),
		new Element("token", { value: "AS", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("AS"),
		]),
		new Element("node", { type: "SelectStatement" }, [
			new Element("node", { type: "SelectClause" }, [
				new Element("token", { value: "SELECT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("SELECT"),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("token", { type: "EoF" }),
]);
