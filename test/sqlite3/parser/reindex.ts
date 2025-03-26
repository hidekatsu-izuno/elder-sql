import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "ReindexStatement" }, [
		new Element("token", { value: "REINDEX", type: "Identifier" }, [
			new Text("REINDEX"),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "ReindexStatement" }, [
		new Element("token", { value: "REINDEX", type: "Identifier" }, [
			new Text("REINDEX"),
		]),
		new Element("node", { type: "ObjectName", value: "test_collation" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test_collation"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "ReindexStatement" }, [
		new Element("token", { value: "REINDEX", type: "Identifier" }, [
			new Text("REINDEX"),
		]),
		new Element("SchemaName", { type: "ObjectName", value: "test" }, [
			new Element("token", { value: "TEST", type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "sample" }, [
			new Element("token", { value: "SAMPLE", type: "Identifier" }, [
				new Text("sample"),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
