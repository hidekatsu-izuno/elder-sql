import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "AnalyzeStatement" }, [
		new Element("token", { value: "ANALYZE", type: "Identifier" }, [
			new Text("analyze"),
		]),
		new Element("node", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "AnalyzeStatement" }, [
		new Element("token", { value: "ANALYZE", type: "Identifier" }, [
			new Text("ANALYZE"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "main" }, [
			new Element("token", { value: "MAIN", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Text("test"),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
