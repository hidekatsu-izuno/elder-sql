import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "DropIndexStatement" }, [
		new Element("token", { type: "Identifier", value: "DROP" }, [
			new Text("DROP"),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "ObjectName", value: "i_sample" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("i_sample"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "DropIndexStatement" }, [
		new Element("token", { type: "Identifier", value: "DROP" }, [
			new Text("DROP"),
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
		new Element("node", { type: "ObjectName", value: "i_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("i_sample")]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "DropIndexStatement" }, [
		new Element("token", { type: "Identifier", value: "DROP" }, [
			new Text("DROP"),
		]),
		new Element("token", { type: "Reserved", value: "INDEX" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "IfExists" }, [
			new Element("token", { type: "Identifier", value: "IF" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
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
		new Element("node", { type: "ObjectName", value: "i_sample" }, [
			new Element("token", { type: "Identifier" }, [new Text("i_sample")]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("token", { type: "EoF" }),
]);
