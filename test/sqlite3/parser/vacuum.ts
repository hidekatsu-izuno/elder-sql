import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "VacuumStatement" }, [
		new Element("token", { type: "Identifier", value: "VACUUM" }, [
			new Text("VACUUM"),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "VacuumStatement" }, [
		new Element("token", { type: "Identifier", value: "VACUUM" }, [
			new Text("VACUUM"),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "VacuumStatement" }, [
		new Element("token", { type: "Identifier", value: "VACUUM" }, [
			new Text("VACUUM"),
		]),
		new Element("node", { type: "SchemaName", value: "main" }, [
			new Element("token", { type: "Identifier", value: "MAIN" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Reserved", value: "INTO" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INTO"),
		]),
		new Element("node", { type: "FileName" }, [
			new Element("node", { type: "StringLiteral", value: "database.dat" }, [
				new Element("token", { type: "String" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text("'database.dat'"),
				]),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "VacuumStatement" }, [
		new Element("token", { type: "Identifier", value: "VACUUM" }, [
			new Text("VACUUM"),
		]),
		new Element("token", { type: "Reserved", value: "INTO" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INTO"),
		]),
		new Element("node", { type: "FileName" }, [
			new Element("node", { type: "StringLiteral", value: "database.dat" }, [
				new Element("token", { type: "Identifier" }, [
					new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
					new Text('"database.dat"'),
					new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
				]),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
