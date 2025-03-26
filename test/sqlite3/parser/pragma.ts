import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("node", { type: "PragmaName", value: "analysis_limit" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("analysis_limit"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("node", { type: "PragmaName", value: "analysis_limit" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("analysis_limit"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "Operator" }, [new Text("=")]),
		new Element("node", { type: "PragmaValue" }, [
			new Element("node", { type: "NumericLiteral", value: "3" }, [
				new Element("token", { type: "Numeric" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("3"),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("SchemaName", { type: "PragmaName", value: "test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "PragmaName", value: "application_id" }, [
			new Element("token", { type: "Identifier" }, [
				new Text("application_id"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("SchemaName", { type: "PragmaName", value: "test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "PragmaName", value: "application_id" }, [
			new Element("token", { type: "Identifier" }, [
				new Text("application_id"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "Operator" }, [
			new Text("="),
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
		]),
		new Element("node", { type: "PragmaValue" }, [
			new Element("node", { type: "Expression" }, [
				new Element("node", { type: "UnaryMinusOperation" }, [
					new Element("token", { type: "Operator" }, [new Text("-")]),
					new Element("node", { type: "NumericLiteral", value: "3" }, [
						new Element("token", { type: "Numeric" }, [
							new Text("3"),
							new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
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
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("SchemaName", { type: "PragmaName", value: "Test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("Test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "PragmaName", value: "auto_vacuum" }, [
			new Element("token", { type: "Identifier" }, [new Text("auto_vacuum")]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("SchemaName", { type: "PragmaName", value: "Test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("Test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "PragmaName", value: "auto_vacuum" }, [
			new Element("token", { type: "Identifier" }, [
				new Text("auto_vacuum"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "Operator" }, [new Text("=")]),
		new Element("node", { type: "PragmaValue" }, [
			new Element("node", { type: "PragmaLiteral", value: "NONE" }, [
				new Element("token", { value: "NONE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("NONE"),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("pragma"),
		]),
		new Element("node", { type: "PragmaName", value: "automatic_index" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("automatic_index"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("pragma"),
		]),
		new Element("node", { type: "PragmaName", value: "automatic_index" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("automatic_index"),
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			]),
		]),
		new Element("token", { type: "Operator" }, [new Text("=")]),
		new Element("node", { type: "PragmaValue" }, [
			new Element("node", { type: "PragmaLiteral", value: "true" }, [
				new Element("token", { value: "TRUE", type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("true"),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "PragmaStatement" }, [
		new Element("token", { value: "PRAGMA", type: "Identifier" }, [
			new Text("PRAGMA"),
		]),
		new Element("SchemaName", { type: "PragmaName", value: "test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "PragmaName", value: "index_info" }, [
			new Element("token", { type: "Identifier" }, [new Text("index_info")]),
		]),
		new Element("token", { type: "LeftParen" }, [new Text("(")]),
		new Element("node", { type: "PragmaArgumentList" }, [
			new Element("node", { type: "PragmaArgument" }, [
				new Element("node", { type: "PragmaValue" }, [
					new Element(
						"node",
						{ type: "StringLiteral", value: "test.pk_test" },
						[
							new Element("token", { type: "String" }, [
								new Text("'test.pk_test'"),
							]),
						],
					),
				]),
			]),
		]),
		new Element("token", { type: "RightParen" }, [new Text(")")]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("token", { type: "EoF" }),
]);
