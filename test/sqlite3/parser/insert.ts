import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "String" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("'2'"),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NullLiteral" }, [
								new Element("token", { value: "NULL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("NULL"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("node", { type: "OrConflictClause" }, [
				new Element("token", { value: "OR", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("OR"),
				]),
				new Element("node", { type: "AbortOption" }, [
					new Element("token", { value: "ABORT", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("ABORT"),
					]),
				]),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "ColumnList" }, [
				new Element("node", { type: "ColumnName", value: "a" }, [
					new Element("token", { type: "Identifier" }, [new Text("a")]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("node", { type: "OrConflictClause" }, [
				new Element("token", { value: "OR", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("OR"),
				]),
				new Element("node", { type: "FailOption" }, [
					new Element("token", { value: "FAIL", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("FAIL"),
					]),
				]),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
				]),
			]),
			new Element("token", { value: "AS", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("AS"),
			]),
			new Element("node", { type: "ObjectAlias", value: "sample2" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample2"),
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
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text('"2"'),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("node", { type: "OrConflictClause" }, [
				new Element("token", { value: "OR", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("OR"),
				]),
				new Element("node", { type: "IgnoreOption" }, [
					new Element("token", { value: "IGNORE", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("IGNORE"),
					]),
				]),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
			]),
			new Element("token", { value: "AS", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("AS"),
			]),
			new Element("node", { type: "ObjectAlias", value: "sample2" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample2"),
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
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text('"2"'),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "BooleanLiteral", value: "TRUE" }, [
								new Element("token", { value: "TRUE", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("TRUE"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
					new Element("token", { type: "Comma" }, [
						new Text(","),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "String" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("'2'"),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "BooleanLiteral", value: "FALSE" }, [
								new Element("token", { value: "FALSE", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("FALSE"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("node", { type: "OrConflictClause" }, [
				new Element("token", { value: "OR", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("OR"),
				]),
				new Element("node", { type: "ReplaceOption" }, [
					new Element("token", { value: "REPLACE", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("REPLACE"),
					]),
				]),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text('"2"'),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NullLiteral" }, [
								new Element("token", { value: "NULL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("NULL"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
					new Element("token", { type: "Comma" }, [
						new Text(","),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "String" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("'2'"),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "BooleanLiteral", value: "TRUE" }, [
								new Element("token", { value: "TRUE", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("TRUE"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
					new Element("token", { type: "Comma" }, [
						new Text(","),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text('"2"'),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "BooleanLiteral", value: "FALSE" }, [
								new Element("token", { value: "FALSE", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("FALSE"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("node", { type: "OrConflictClause" }, [
				new Element("token", { value: "OR", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("OR"),
				]),
				new Element("node", { type: "RollbackOption" }, [
					new Element("token", { value: "ROLLBACK", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("ROLLBACK"),
					]),
				]),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
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
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "DefaultValuesOption" }, [
				new Element("token", { value: "DEFAULT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("DEFAULT"),
				]),
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
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
					new Element("node", { type: "FromClause" }, [
						new Element("token", { value: "FROM", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("FROM"),
						]),
						new Element("node", { type: "FromObjectList" }, [
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element(
										"node",
										{ type: "ObjectName", value: "sample2" },
										[
											new Element("token", { type: "Identifier" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("sample2"),
											]),
										],
									),
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
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("node", { type: "ReplaceOption" }, [
				new Element("token", { value: "REPLACE", type: "Identifier" }, [
					new Text("REPLACE"),
				]),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
			]),
			new Element("token", { type: "LeftParen" }, [new Text("(")]),
			new Element("node", { type: "ColumnList" }, [
				new Element("node", { type: "ColumnName", value: "a" }, [
					new Element("token", { type: "Identifier" }, [new Text("a")]),
				]),
			]),
			new Element("token", { type: "RightParen" }, [new Text(")")]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "WithClause" }, [
			new Element("token", { value: "WITH", type: "Identifier" }, [
				new Text("WITH"),
			]),
			new Element("node", { type: "CommonTableList" }, [
				new Element("node", { type: "CommonTable" }, [
					new Element("node", { type: "ObjectName", value: "X" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("X"),
						]),
					]),
					new Element("token", { value: "AS", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("AS"),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "SelectStatement" }, [
						new Element("node", { type: "SelectClause" }, [
							new Element("token", { value: "SELECT", type: "Reserved" }, [
								new Text("SELECT"),
							]),
							new Element("node", { type: "SelectColumnList" }, [
								new Element("node", { type: "SelectColumn" }, [
									new Element("node", { type: "Expression" }, [
										new Element(
											"node",
											{ type: "NumericLiteral", value: "1" },
											[
												new Element("token", { type: "Numeric" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("1"),
												]),
											],
										),
									]),
									new Element("token", { value: "AS", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("AS"),
									]),
									new Element("node", { type: "ColumnAlias", value: "Y" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("Y"),
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
				]),
			]),
		]),
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
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
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "Y" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("Y"),
										]),
									]),
								]),
							]),
						]),
					]),
					new Element("node", { type: "FromClause" }, [
						new Element("token", { value: "FROM", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("FROM"),
						]),
						new Element("node", { type: "FromObjectList" }, [
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "X" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("X"),
										]),
									]),
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
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "SelectStatement" }, [
				new Element("node", { type: "WithClause" }, [
					new Element("token", { value: "WITH", type: "Identifier" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("WITH"),
					]),
					new Element("node", { type: "CommonTableList" }, [
						new Element("node", { type: "CommonTable" }, [
							new Element("node", { type: "ObjectName", value: "X" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("X"),
								]),
							]),
							new Element("token", { value: "AS", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("AS"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
							new Element("token", { type: "LeftParen" }, [new Text("(")]),
							new Element("node", { type: "SelectStatement" }, [
								new Element("node", { type: "SelectClause" }, [
									new Element("token", { value: "SELECT", type: "Reserved" }, [
										new Text("SELECT"),
									]),
									new Element("node", { type: "SelectColumnList" }, [
										new Element("node", { type: "SelectColumn" }, [
											new Element("node", { type: "Expression" }, [
												new Element(
													"node",
													{ type: "NumericLiteral", value: "1" },
													[
														new Element("token", { type: "Numeric" }, [
															new Element("trivia", { type: "WhiteSpace" }, [
																new Text(" "),
															]),
															new Text("1"),
														]),
													],
												),
											]),
											new Element("token", { value: "AS", type: "Reserved" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("AS"),
											]),
											new Element("node", { type: "ColumnAlias", value: "Y" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("Y"),
												]),
											]),
										]),
									]),
								]),
							]),
							new Element("token", { type: "RightParen" }, [new Text(")")]),
						]),
					]),
				]),
				new Element("node", { type: "SelectClause" }, [
					new Element("token", { value: "SELECT", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("SELECT"),
					]),
					new Element("node", { type: "SelectColumnList" }, [
						new Element("node", { type: "SelectColumn" }, [
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "Y" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("Y"),
										]),
									]),
								]),
							]),
						]),
					]),
					new Element("node", { type: "FromClause" }, [
						new Element("token", { value: "FROM", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("FROM"),
						]),
						new Element("node", { type: "FromObjectList" }, [
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "X" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("X"),
										]),
									]),
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
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "ValuesClause" }, [
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "ExpressionListGroup" }, [
					new Element("token", { type: "LeftParen" }, [new Text("(")]),
					new Element("node", { type: "ExpressionList" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "StringLiteral", value: "2" }, [
								new Element("token", { type: "String" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("'2'"),
								]),
							]),
						]),
						new Element("token", { type: "Comma" }, [new Text(",")]),
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "NullLiteral" }, [
								new Element("token", { value: "NULL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("NULL"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "RightParen" }, [new Text(")")]),
				]),
			]),
			new Element("node", { type: "ReturningClause" }, [
				new Element("token", { value: "RETURNING", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("RETURNING"),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "AllColumnsOption" }, [
							new Element("token", { type: "Operator" }, [new Text("*")]),
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
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "SchemaName", value: "main" }, [
				new Element("token", { value: "MAIN", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("main"),
				]),
			]),
			new Element("token", { type: "Dot" }, [new Text(".")]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Text("sample"),
				]),
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
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "Y" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("Y"),
										]),
									]),
								]),
							]),
						]),
					]),
					new Element("node", { type: "FromClause" }, [
						new Element("token", { value: "FROM", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("FROM"),
						]),
						new Element("node", { type: "FromObjectList" }, [
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "X" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("X"),
										]),
									]),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("node", { type: "ReturningClause" }, [
				new Element("token", { value: "RETURNING", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("RETURNING"),
				]),
				new Element("node", { type: "SelectColumnList" }, [
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "Expression" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ColumnName", value: "Y" }, [
									new Element("token", { type: "Identifier" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("Y"),
									]),
								]),
							]),
						]),
					]),
					new Element("token", { type: "Comma" }, [new Text(",")]),
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
						new Element("token", { value: "AS", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("AS"),
						]),
						new Element("node", { type: "ColumnAlias", value: "Z" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("Z"),
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
	new Element("node", { type: "InsertStatement" }, [
		new Element("node", { type: "InsertClause" }, [
			new Element("token", { value: "INSERT", type: "Reserved" }, [
				new Text("INSERT"),
			]),
			new Element("token", { value: "INTO", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("INTO"),
			]),
			new Element("node", { type: "ObjectName", value: "sample" }, [
				new Element("token", { value: "SAMPLE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("sample"),
				]),
			]),
			new Element("node", { type: "DefaultValuesOption" }, [
				new Element("token", { value: "DEFAULT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("DEFAULT"),
				]),
				new Element("token", { value: "VALUES", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("VALUES"),
				]),
			]),
			new Element("node", { type: "ReturningClause" }, [
				new Element("token", { value: "RETURNING", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("RETURNING"),
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
						new Element("token", { value: "AS", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("AS"),
						]),
						new Element("node", { type: "ColumnAlias", value: "Z" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("Z"),
							]),
						]),
					]),
					new Element("token", { type: "Comma" }, [
						new Text(","),
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					]),
					new Element("node", { type: "SelectColumn" }, [
						new Element("node", { type: "AllColumnsOption" }, [
							new Element("token", { type: "Operator" }, [new Text("*")]),
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
