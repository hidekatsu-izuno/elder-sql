import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "ReindexStatement" }, [
		new Element("token", { type: "Identifier", value: "REINDEX" }, [
			new Text("REINDEX"),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "ReindexStatement" }, [
		new Element("token", { type: "Identifier", value: "REINDEX" }, [
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
		new Element("token", { type: "Identifier", value: "REINDEX" }, [
			new Text("REINDEX"),
		]),
		new Element("node", { type: "SchemaName", value: "test" }, [
			new Element("token", { type: "Identifier", value: "TEST" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("token", { type: "Dot" }, [new Text(".")]),
		new Element("node", { type: "ObjectName", value: "sample" }, [
			new Element("token", { type: "Identifier", value: "SAMPLE" }, [
				new Text("sample"),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
