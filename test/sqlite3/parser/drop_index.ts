import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "DropIndexStatement" }, [
		new Element("token", { value: "DROP", type: "Identifier" }, [
			new Text("DROP"),
		]),
		new Element("token", { value: "INDEX", type: "Reserved" }, [
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
		new Element("token", { value: "DROP", type: "Identifier" }, [
			new Text("DROP"),
		]),
		new Element("token", { value: "INDEX", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
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
		new Element("token", { value: "DROP", type: "Identifier" }, [
			new Text("DROP"),
		]),
		new Element("token", { value: "INDEX", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("node", { type: "IfExists" }, [
			new Element("token", { value: "IF", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("IF"),
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
