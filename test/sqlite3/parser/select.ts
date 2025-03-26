import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "SubtractOperation" }, [
							new Element("node", { type: "AddOperation" }, [
								new Element("node", { type: "NumericLiteral", value: "1" }, [
									new Element("token", { type: "Numeric" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("1"),
									]),
								]),
								new Element("token", { type: "Operator" }, [new Text("+")]),
								new Element("node", { type: "NumericLiteral", value: "2" }, [
									new Element("token", { type: "Numeric" }, [new Text("2")]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("-")]),
							new Element("node", { type: "NumericLiteral", value: "3" }, [
								new Element("token", { type: "Numeric" }, [new Text("3")]),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [
					new Text(","),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "DivideOperation" }, [
							new Element("node", { type: "MultiplyOperation" }, [
								new Element("node", { type: "UnaryMinusOperation" }, [
									new Element("token", { type: "Operator" }, [new Text("-")]),
									new Element("node", { type: "NumericLiteral", value: "1" }, [
										new Element("token", { type: "Numeric" }, [new Text("1")]),
									]),
								]),
								new Element("token", { type: "Operator" }, [new Text("*")]),
								new Element("node", { type: "NumericLiteral", value: "2" }, [
									new Element("token", { type: "Numeric" }, [new Text("2")]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("/")]),
							new Element("node", { type: "NumericLiteral", value: "3" }, [
								new Element("token", { type: "Numeric" }, [new Text("3")]),
							]),
						]),
					]),
					new Element("node", { type: "ColumnAlias", value: "c1" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("c1"),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [
					new Text(","),
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "SubtractOperation" }, [
							new Element("node", { type: "UnaryPlusOperation" }, [
								new Element("token", { type: "Operator" }, [new Text("+")]),
								new Element("node", { type: "NumericLiteral", value: "1" }, [
									new Element("token", { type: "Numeric" }, [new Text("1")]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("-")]),
							new Element("node", { type: "MultiplyOperation" }, [
								new Element("node", { type: "NumericLiteral", value: "2" }, [
									new Element("token", { type: "Numeric" }, [new Text("2")]),
								]),
								new Element("token", { type: "Operator" }, [new Text("*")]),
								new Element("node", { type: "NumericLiteral", value: "3" }, [
									new Element("token", { type: "Numeric" }, [new Text("3")]),
								]),
							]),
						]),
					]),
					new Element("token", { value: "AS", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("AS"),
					]),
					new Element("node", { type: "ColumnAlias", value: "c2" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("c2"),
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
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "c1" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("c1"),
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
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				]),
				new Element("node", { type: "FromObjectList" }, [
					new Element("node", { type: "FromObject" }, [
						new Element("token", { type: "LeftParen" }, [new Text("(")]),
						new Element("node", { type: "SubqueryExpression" }, [
							new Element("node", { type: "SelectStatement" }, [
								new Element("node", { type: "SelectClause" }, [
									new Element("token", { value: "SELECT", type: "Reserved" }, [
										new Text("SELECT"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
									new Element("node", { type: "SelectColumnList" }, [
										new Element("node", { type: "SelectColumn" }, [
											new Element("node", { type: "AllColumnsOption" }, [
												new Element("token", { type: "Operator" }, [
													new Text("*"),
												]),
											]),
										]),
									]),
									new Element("node", { type: "FromClause" }, [
										new Element("token", { value: "FROM", type: "Reserved" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("FROM"),
										]),
										new Element("node", { type: "FromObjectList" }, [
											new Element("node", { type: "FromObject" }, [
												new Element("node", { type: "ObjectReference" }, [
													new Element(
														"node",
														{ type: "ObjectName", value: "sample" },
														[
															new Element(
																"token",
																{ value: "SAMPLE", type: "Identifier" },
																[
																	new Element(
																		"trivia",
																		{ type: "WhiteSpace" },
																		[new Text(" ")],
																	),
																	new Text("sample"),
																],
															),
														],
													),
												]),
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
			new Element("node", { type: "GroupByClause" }, [
				new Element("token", { value: "GROUP", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("GROUP"),
				]),
				new Element("token", { value: "BY", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("BY"),
				]),
				new Element("node", { type: "ExpressionList" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ColumnName", value: "c1" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("c1"),
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
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "WithClause" }, [
			new Element("token", { value: "WITH", type: "Identifier" }, [
				new Text("WITH"),
			]),
			new Element("node", { type: "CommonTableList" }, [
				new Element("node", { type: "CommonTable" }, [
					new Element("node", { type: "ObjectName", value: "x" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("x"),
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
									new Element("node", { type: "AllColumnsOption" }, [
										new Element("node", { type: "SchemaName", value: "s" }, [
											new Element("token", { type: "Identifier" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("s"),
											]),
										]),
										new Element("token", { type: "Dot" }, [new Text(".")]),
										new Element("token", { type: "Operator" }, [new Text("*")]),
									]),
								]),
							]),
							new Element("node", { type: "FromClause" }, [
								new Element("token", { value: "FROM", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("FROM"),
								]),
								new Element("node", { type: "FromObjectList" }, [
									new Element("node", { type: "FromObject" }, [
										new Element("node", { type: "ObjectReference" }, [
											new Element(
												"node",
												{ type: "ObjectName", value: "sample" },
												[
													new Element(
														"token",
														{ value: "SAMPLE", type: "Identifier" },
														[
															new Element("trivia", { type: "WhiteSpace" }, [
																new Text(" "),
															]),
															new Text("sample"),
														],
													),
												],
											),
										]),
										new Element("node", { type: "ObjectAlias", value: "s" }, [
											new Element("token", { type: "Identifier" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("s"),
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
				]),
			]),
		]),
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "AllColumnsOption" }, [
						new Element("token", { type: "Operator" }, [new Text("*")]),
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
							new Element("node", { type: "ObjectName", value: "x" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("x"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("node", { type: "WhereClause" }, [
				new Element("token", { value: "WHERE", type: "Reserved" }, [
					new Text("WHERE"),
				]),
				new Element("node", { type: "Expression" }, [
					new Element("node", { type: "AndOperation" }, [
						new Element("node", { type: "EqualOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ObjectName", value: "x" }, [
									new Element("token", { type: "Identifier" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("x"),
									]),
								]),
								new Element("token", { type: "Dot" }, [new Text(".")]),
								new Element("node", { type: "ColumnName", value: "col1" }, [
									new Element("token", { type: "Identifier" }, [
										new Text("col1"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("=")]),
							new Element("node", { type: "NumericLiteral", value: "2" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("2"),
								]),
							]),
						]),
						new Element("token", { value: "AND", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("AND"),
						]),
						new Element("node", { type: "NotOperation" }, [
							new Element("token", { value: "NOT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("NOT"),
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							]),
							new Element("node", { type: "ParenthesesOperation" }, [
								new Element("token", { type: "LeftParen" }, [new Text("(")]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "OrOperation" }, [
										new Element("node", { type: "NotLikeOperation" }, [
											new Element("node", { type: "ColumnReference" }, [
												new Element(
													"node",
													{ type: "ObjectName", value: "x" },
													[
														new Element("token", { type: "Identifier" }, [
															new Text("x"),
														]),
													],
												),
												new Element("token", { type: "Dot" }, [new Text(".")]),
												new Element(
													"node",
													{ type: "ColumnName", value: "col2" },
													[
														new Element("token", { type: "Identifier" }, [
															new Text("col2"),
														]),
													],
												),
											]),
											new Element("token", { value: "NOT", type: "Reserved" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("NOT"),
											]),
											new Element(
												"token",
												{ value: "LIKE", type: "Identifier" },
												[
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("LIKE"),
												],
											),
											new Element(
												"node",
												{ type: "StringLiteral", value: "%x%" },
												[
													new Element("token", { type: "String" }, [
														new Element("trivia", { type: "WhiteSpace" }, [
															new Text(" "),
														]),
														new Text("'%x%'"),
													]),
												],
											),
										]),
										new Element("token", { value: "OR", type: "Reserved" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("OR"),
										]),
										new Element("node", { type: "IsOperation" }, [
											new Element("node", { type: "ColumnReference" }, [
												new Element(
													"node",
													{ type: "ObjectName", value: "x" },
													[
														new Element("token", { type: "Identifier" }, [
															new Element("trivia", { type: "WhiteSpace" }, [
																new Text(" "),
															]),
															new Text("x"),
														]),
													],
												),
												new Element("token", { type: "Dot" }, [new Text(".")]),
												new Element(
													"node",
													{ type: "ColumnName", value: "col2" },
													[
														new Element("token", { type: "Identifier" }, [
															new Text("col2"),
														]),
													],
												),
											]),
											new Element("token", { value: "IS", type: "Reserved" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("IS"),
											]),
											new Element("node", { type: "NullLiteral" }, [
												new Element(
													"token",
													{ value: "NULL", type: "Reserved" },
													[
														new Element("trivia", { type: "WhiteSpace" }, [
															new Text(" "),
														]),
														new Text("NULL"),
													],
												),
											]),
										]),
									]),
								]),
								new Element("token", { type: "RightParen" }, [
									new Text(")"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
					]),
				]),
			]),
		]),
		new Element("node", { type: "OrderByClause" }, [
			new Element("token", { value: "ORDER", type: "Reserved" }, [
				new Text("ORDER"),
			]),
			new Element("token", { value: "BY", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("BY"),
			]),
			new Element("node", { type: "SortColumnList" }, [
				new Element("node", { type: "SortColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ObjectName", value: "x" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("x"),
								]),
							]),
							new Element("token", { type: "Dot" }, [new Text(".")]),
							new Element("node", { type: "ColumnName", value: "col3" }, [
								new Element("token", { type: "Identifier" }, [
									new Text("col3"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
					]),
				]),
			]),
		]),
		new Element("node", { type: "LimitClause" }, [
			new Element("token", { value: "LIMIT", type: "Reserved" }, [
				new Text("LIMIT"),
			]),
			new Element("node", { type: "LimitOption" }, [
				new Element("node", { type: "Expression" }, [
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
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "AllColumnsOption" }, [
						new Element("token", { type: "Operator" }, [new Text("*")]),
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
							new Element("node", { type: "ObjectName", value: "a" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("a"),
								]),
							]),
						]),
					]),
					new Element("token", { type: "Comma" }, [new Text(",")]),
					new Element("node", { type: "FromObject" }, [
						new Element("node", { type: "ObjectReference" }, [
							new Element("node", { type: "SchemaName", value: "main" }, [
								new Element("token", { value: "MAIN", type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("main"),
								]),
							]),
							new Element("token", { type: "Dot" }, [new Text(".")]),
							new Element("node", { type: "ObjectName", value: "b" }, [
								new Element("token", { type: "Identifier" }, [new Text("b")]),
							]),
						]),
						new Element("node", { type: "ObjectAlias", value: "x" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("x"),
							]),
						]),
					]),
					new Element("token", { type: "Comma" }, [new Text(",")]),
					new Element("node", { type: "FromObject" }, [
						new Element("node", { type: "ObjectReference" }, [
							new Element("node", { type: "ObjectName", value: "c" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("c"),
								]),
							]),
						]),
						new Element("token", { value: "AS", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("as"),
						]),
						new Element("node", { type: "ObjectAlias", value: "y" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("y"),
							]),
						]),
					]),
				]),
			]),
			new Element("node", { type: "WhereClause" }, [
				new Element("token", { value: "WHERE", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("WHERE"),
				]),
				new Element("node", { type: "Expression" }, [
					new Element("node", { type: "AndOperation" }, [
						new Element("node", { type: "AndOperation" }, [
							new Element("node", { type: "EqualOperation" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ObjectName", value: "a" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("a"),
										]),
									]),
									new Element("token", { type: "Dot" }, [new Text(".")]),
									new Element("node", { type: "ColumnName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Text("x"),
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
										]),
									]),
								]),
								new Element("token", { type: "Operator" }, [new Text("=")]),
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ObjectName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("x"),
										]),
									]),
									new Element("token", { type: "Dot" }, [new Text(".")]),
									new Element("node", { type: "ColumnName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Text("x"),
										]),
									]),
								]),
							]),
							new Element("token", { value: "AND", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("AND"),
							]),
							new Element("node", { type: "EqualOperation" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ObjectName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("x"),
										]),
									]),
									new Element("token", { type: "Dot" }, [new Text(".")]),
									new Element("node", { type: "ColumnName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Text("x"),
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
										]),
									]),
								]),
								new Element("token", { type: "Operator" }, [new Text("=")]),
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ObjectName", value: "y" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("y"),
										]),
									]),
									new Element("token", { type: "Dot" }, [new Text(".")]),
									new Element("node", { type: "ColumnName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Text("x"),
										]),
									]),
								]),
							]),
						]),
						new Element("token", { value: "AND", type: "Reserved" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("AND"),
						]),
						new Element("node", { type: "EqualOperation" }, [
							new Element("node", { type: "ColumnReference" }, [
								new Element("node", { type: "ObjectName", value: "y" }, [
									new Element("token", { type: "Identifier" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("y"),
									]),
								]),
								new Element("token", { type: "Dot" }, [new Text(".")]),
								new Element("node", { type: "ColumnName", value: "y" }, [
									new Element("token", { type: "Identifier" }, [
										new Text("y"),
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
									]),
								]),
							]),
							new Element("token", { type: "Operator" }, [new Text("=")]),
							new Element("node", { type: "NumericLiteral", value: "0" }, [
								new Element("token", { type: "Numeric" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("0"),
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
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "UnaryMinusOperation" }, [
							new Element("token", { type: "Operator" }, [new Text("-")]),
							new Element("node", { type: "NumericLiteral", value: "1" }, [
								new Element("token", { type: "Numeric" }, [new Text("1")]),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "BooleanLiteral", value: "TRUE" }, [
							new Element("token", { value: "TRUE", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("TRUE"),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "BooleanLiteral", value: "FALSE" }, [
							new Element("token", { value: "FALSE", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("FALSE"),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "NullLiteral" }, [
							new Element("token", { value: "NULL", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("NULL"),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "FunctionExpression" }, [
							new Element(
								"node",
								{ type: "ObjectName", value: "CURRENT_TIME" },
								[
									new Element(
										"token",
										{ value: "CURRENT_TIME", type: "Reserved" },
										[
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("CURRENT_TIME"),
										],
									),
								],
							),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "FunctionExpression" }, [
							new Element(
								"node",
								{ type: "ObjectName", value: "CURRENT_DATE" },
								[
									new Element(
										"token",
										{ value: "CURRENT_DATE", type: "Reserved" },
										[
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("CURRENT_DATE"),
										],
									),
								],
							),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "FunctionExpression" }, [
							new Element(
								"node",
								{ type: "ObjectName", value: "CURRENT_TIMESTAMP" },
								[
									new Element(
										"token",
										{ value: "CURRENT_TIMESTAMP", type: "Reserved" },
										[
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("CURRENT_TIMESTAMP"),
										],
									),
								],
							),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "StringLiteral", value: "aaa" }, [
							new Element("token", { type: "String" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("'aaa'"),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "StringLiteral", value: "aaa" }, [
							new Element("token", { type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text('"aaa"'),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element(
							"node",
							{ type: "BlobLiteral", value: "53514C697465" },
							[
								new Element("token", { type: "Blob" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("x'53514C697465'"),
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
								]),
							],
						),
					]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
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
							{ type: "PositionalBindVariable", value: "1" },
							[
								new Element("token", { type: "BindVariable" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("?1"),
								]),
							],
						),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element(
							"node",
							{ type: "PositionalBindVariable", value: "2" },
							[
								new Element("token", { type: "BindVariable" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("?"),
								]),
							],
						),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "NamedBindVariable", value: "param" }, [
							new Element("token", { type: "BindVariable" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text(":param"),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "NamedBindVariable", value: "param" }, [
							new Element("token", { type: "BindVariable" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("@param"),
							]),
						]),
					]),
				]),
				new Element("token", { type: "Comma" }, [new Text(",")]),
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "NamedBindVariable", value: "param" }, [
							new Element("token", { type: "BindVariable" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("$param"),
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
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "CaseExpression" }, [
							new Element("token", { value: "CASE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("CASE"),
							]),
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("x"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "WhenClause" }, [
								new Element("token", { value: "WHEN", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("WHEN"),
								]),
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
								new Element("node", { type: "ThenClause" }, [
									new Element("token", { value: "THEN", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("THEN"),
									]),
									new Element("node", { type: "Expression" }, [
										new Element("node", { type: "StringLiteral", value: "a" }, [
											new Element("token", { type: "String" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("'a'"),
											]),
										]),
									]),
								]),
							]),
							new Element("token", { value: "END", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("END"),
							]),
						]),
					]),
					new Element("node", { type: "ColumnAlias", value: "x" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("x"),
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
							new Element("node", { type: "ObjectName", value: "test" }, [
								new Element("token", { value: "TEST", type: "Identifier" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "CaseExpression" }, [
							new Element("token", { value: "CASE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("CASE"),
							]),
							new Element("node", { type: "Expression" }, [
								new Element("node", { type: "ColumnReference" }, [
									new Element("node", { type: "ColumnName", value: "x" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("x"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "WhenClause" }, [
								new Element("token", { value: "WHEN", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("WHEN"),
								]),
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
								new Element("node", { type: "ThenClause" }, [
									new Element("token", { value: "THEN", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("THEN"),
									]),
									new Element("node", { type: "Expression" }, [
										new Element("node", { type: "StringLiteral", value: "a" }, [
											new Element("token", { type: "String" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("'a'"),
											]),
										]),
									]),
								]),
							]),
							new Element("node", { type: "WhenClause" }, [
								new Element("token", { value: "WHEN", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("WHEN"),
								]),
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
								new Element("node", { type: "ThenClause" }, [
									new Element("token", { value: "THEN", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("THEN"),
									]),
									new Element("node", { type: "Expression" }, [
										new Element("node", { type: "StringLiteral", value: "b" }, [
											new Element("token", { type: "String" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("'b'"),
											]),
										]),
									]),
								]),
							]),
							new Element("node", { type: "ElseClause" }, [
								new Element("token", { value: "ELSE", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ELSE"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "StringLiteral", value: "c" }, [
										new Element("token", { type: "String" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("'c'"),
										]),
									]),
								]),
							]),
							new Element("token", { value: "END", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("END"),
							]),
						]),
					]),
					new Element("node", { type: "ColumnAlias", value: "x" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("x"),
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
							new Element("node", { type: "ObjectName", value: "test" }, [
								new Element("token", { value: "TEST", type: "Identifier" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "CaseExpression" }, [
							new Element("token", { value: "CASE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("CASE"),
							]),
							new Element("node", { type: "WhenClause" }, [
								new Element("token", { value: "WHEN", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("WHEN"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
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
								]),
								new Element("node", { type: "ThenClause" }, [
									new Element("token", { value: "THEN", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("THEN"),
									]),
									new Element("node", { type: "Expression" }, [
										new Element("node", { type: "StringLiteral", value: "a" }, [
											new Element("token", { type: "String" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("'a'"),
											]),
										]),
									]),
								]),
							]),
							new Element("token", { value: "END", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("END"),
							]),
						]),
					]),
					new Element("token", { value: "AS", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("AS"),
					]),
					new Element("node", { type: "ColumnAlias", value: "x" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("x"),
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
							new Element("node", { type: "ObjectName", value: "test" }, [
								new Element("token", { value: "TEST", type: "Identifier" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "CaseExpression" }, [
							new Element("token", { value: "CASE", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("CASE"),
							]),
							new Element("node", { type: "WhenClause" }, [
								new Element("token", { value: "WHEN", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("WHEN"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
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
								]),
								new Element("node", { type: "ThenClause" }, [
									new Element("token", { value: "THEN", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("THEN"),
									]),
									new Element("node", { type: "Expression" }, [
										new Element("node", { type: "StringLiteral", value: "a" }, [
											new Element("token", { type: "String" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("'a'"),
											]),
										]),
									]),
								]),
							]),
							new Element("node", { type: "WhenClause" }, [
								new Element("token", { value: "WHEN", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("WHEN"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element(
											"node",
											{ type: "NumericLiteral", value: "2" },
											[
												new Element("token", { type: "Numeric" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("2"),
												]),
											],
										),
									]),
								]),
								new Element("node", { type: "ThenClause" }, [
									new Element("token", { value: "THEN", type: "Reserved" }, [
										new Element("trivia", { type: "WhiteSpace" }, [
											new Text(" "),
										]),
										new Text("THEN"),
									]),
									new Element("node", { type: "Expression" }, [
										new Element("node", { type: "StringLiteral", value: "b" }, [
											new Element("token", { type: "String" }, [
												new Element("trivia", { type: "WhiteSpace" }, [
													new Text(" "),
												]),
												new Text("'b'"),
											]),
										]),
									]),
								]),
							]),
							new Element("node", { type: "ElseClause" }, [
								new Element("token", { value: "ELSE", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ELSE"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "StringLiteral", value: "c" }, [
										new Element("token", { type: "String" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("'c'"),
										]),
									]),
								]),
							]),
							new Element("token", { value: "END", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("END"),
							]),
						]),
					]),
					new Element("token", { value: "AS", type: "Reserved" }, [
						new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
						new Text("AS"),
					]),
					new Element("node", { type: "ColumnAlias", value: "x" }, [
						new Element("token", { type: "Identifier" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("x"),
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
							new Element("node", { type: "ObjectName", value: "test" }, [
								new Element("token", { value: "TEST", type: "Identifier" }, [
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
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
			]),
			new Element("node", { type: "DistinctOption" }, [
				new Element("token", { value: "DISTINCT", type: "Reserved" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("DISTINCT"),
					new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
				]),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }, [
						new Element("node", { type: "ColumnReference" }, [
							new Element("node", { type: "ObjectName", value: "a" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("  "),
									]),
									new Text("a"),
								]),
							]),
							new Element("token", { type: "Dot" }, [new Text(".")]),
							new Element("node", { type: "ColumnName", value: "x" }, [
								new Element("token", { type: "Identifier" }, [
									new Text("x"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
					]),
				]),
			]),
			new Element("node", { type: "FromClause" }, [
				new Element("token", { value: "FROM", type: "Reserved" }, [
					new Text("FROM"),
					new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
				]),
				new Element("node", { type: "FromObjectList" }, [
					new Element("node", { type: "FromObject" }, [
						new Element("node", { type: "ObjectReference" }, [
							new Element("node", { type: "ObjectName", value: "a" }, [
								new Element("token", { type: "Identifier" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("  "),
									]),
									new Text("a"),
									new Element("trivia", { type: "LineBreak" }, [
										new Text("\n"),
									]),
								]),
							]),
						]),
						new Element("node", { type: "CrossJoinClause" }, [
							new Element("token", { value: "CROSS", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("CROSS"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "b" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("b"),
											new Element("trivia", { type: "LineBreak" }, [
												new Text("\n"),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "InnerJoinClause" }, [
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "c" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("c"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "c" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("c"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "InnerJoinClause" }, [
							new Element("token", { value: "INNER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("INNER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "c1" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("c1"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "c1" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("c1"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "InnerJoinClause" }, [
							new Element("node", { type: "NatualOption" }, [
								new Element("token", { value: "NATURAL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("  "),
									]),
									new Text("NATURAL"),
								]),
							]),
							new Element("token", { value: "INNER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("INNER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "c2" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("c2"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "c2" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("c2"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "LeftOuterJoinClause" }, [
							new Element("token", { value: "LEFT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("LEFT"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "d" }, [
										new Element("token", { value: "D", type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("d"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "d" }, [
												new Element(
													"token",
													{ value: "D", type: "Identifier" },
													[
														new Element("trivia", { type: "WhiteSpace" }, [
															new Text(" "),
														]),
														new Text("d"),
													],
												),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "LeftOuterJoinClause" }, [
							new Element("token", { value: "LEFT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("LEFT"),
							]),
							new Element("token", { value: "OUTER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("OUTER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "d1" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("d1"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "d1" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("d1"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "LeftOuterJoinClause" }, [
							new Element("node", { type: "NatualOption" }, [
								new Element("token", { value: "NATURAL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("  "),
									]),
									new Text("NATURAL"),
								]),
							]),
							new Element("token", { value: "LEFT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("LEFT"),
							]),
							new Element("token", { value: "OUTER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("OUTER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "d2" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("d2"),
											new Element("trivia", { type: "LineBreak" }, [
												new Text("\n"),
											]),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("    "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "d2" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("d2"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "RightOuterJoinClause" }, [
							new Element("token", { value: "RIGHT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("RIGHT"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "e" }, [
										new Element("token", { value: "E", type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("e"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "e" }, [
												new Element(
													"token",
													{ value: "E", type: "Identifier" },
													[
														new Element("trivia", { type: "WhiteSpace" }, [
															new Text(" "),
														]),
														new Text("e"),
													],
												),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "RightOuterJoinClause" }, [
							new Element("token", { value: "RIGHT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("RIGHT"),
							]),
							new Element("token", { value: "OUTER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("OUTER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "e1" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("e1"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "e1" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("e1"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "RightOuterJoinClause" }, [
							new Element("node", { type: "NatualOption" }, [
								new Element("token", { value: "NATURAL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("  "),
									]),
									new Text("NATURAL"),
								]),
							]),
							new Element("token", { value: "RIGHT", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("RIGHT"),
							]),
							new Element("token", { value: "OUTER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("OUTER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "e2" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("e2"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "e2" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("e2"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "FullOuterJoinClause" }, [
							new Element("token", { value: "FULL", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("FULL"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "f" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("f"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "f" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("f"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "FullOuterJoinClause" }, [
							new Element("token", { value: "FULL", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text("  ")]),
								new Text("FULL"),
							]),
							new Element("token", { value: "OUTER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("OUTER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "f1" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("f1"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "f1" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("f1"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
													]),
												]),
											]),
										]),
									]),
								]),
							]),
						]),
						new Element("node", { type: "FullOuterJoinClause" }, [
							new Element("node", { type: "NatualOption" }, [
								new Element("token", { value: "NATURAL", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text("  "),
									]),
									new Text("NATURAL"),
								]),
							]),
							new Element("token", { value: "FULL", type: "Identifier" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("FULL"),
							]),
							new Element("token", { value: "OUTER", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("OUTER"),
							]),
							new Element("token", { value: "JOIN", type: "Reserved" }, [
								new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
								new Text("JOIN"),
							]),
							new Element("node", { type: "FromObject" }, [
								new Element("node", { type: "ObjectReference" }, [
									new Element("node", { type: "ObjectName", value: "f2" }, [
										new Element("token", { type: "Identifier" }, [
											new Element("trivia", { type: "WhiteSpace" }, [
												new Text(" "),
											]),
											new Text("f2"),
										]),
									]),
								]),
							]),
							new Element("node", { type: "JoinOnClause" }, [
								new Element("token", { value: "ON", type: "Reserved" }, [
									new Element("trivia", { type: "WhiteSpace" }, [
										new Text(" "),
									]),
									new Text("ON"),
								]),
								new Element("node", { type: "Expression" }, [
									new Element("node", { type: "EqualOperation" }, [
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "f2" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("f2"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
												]),
											]),
										]),
										new Element("token", { type: "Operator" }, [new Text("=")]),
										new Element("node", { type: "ColumnReference" }, [
											new Element("node", { type: "ObjectName", value: "a" }, [
												new Element("token", { type: "Identifier" }, [
													new Element("trivia", { type: "WhiteSpace" }, [
														new Text(" "),
													]),
													new Text("a"),
												]),
											]),
											new Element("token", { type: "Dot" }, [new Text(".")]),
											new Element("node", { type: "ColumnName", value: "x" }, [
												new Element("token", { type: "Identifier" }, [
													new Text("x"),
													new Element("trivia", { type: "LineBreak" }, [
														new Text("\n"),
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
			]),
		]),
		new Element("node", { type: "LimitClause" }, [
			new Element("token", { value: "LIMIT", type: "Reserved" }, [
				new Text("LIMIT"),
			]),
			new Element("node", { type: "LimitOption" }, [
				new Element("node", { type: "Expression" }, [
					new Element("node", { type: "NumericLiteral", value: "1" }, [
						new Element("token", { type: "Numeric" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("1"),
						]),
					]),
				]),
			]),
			new Element("node", { type: "OffsetOption" }, [
				new Element("token", { value: "OFFSET", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("OFFSET"),
				]),
				new Element("node", { type: "Expression" }, [
					new Element("node", { type: "NumericLiteral", value: "2" }, [
						new Element("token", { type: "Numeric" }, [
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
							new Text("2"),
						]),
					]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
