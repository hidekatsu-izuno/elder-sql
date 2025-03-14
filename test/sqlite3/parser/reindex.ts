import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("ReindexStatement", {}, [
		new Element("Identifier", { value: "REINDEX" }, [new Text("REINDEX")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("ReindexStatement", {}, [
		new Element("Identifier", { value: "REINDEX" }, [new Text("REINDEX")]),
		new Element("ObjectName", { value: "test_collation" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("test_collation"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("ReindexStatement", {}, [
		new Element("Identifier", { value: "REINDEX" }, [new Text("REINDEX")]),
		new Element("SchemaName", { value: "test" }, [
			new Element("Identifier", { value: "TEST" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("test"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "sample" }, [
			new Element("Identifier", { value: "SAMPLE" }, [
				new Text("sample"),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
		]),
	]),
	new Element("EoF", {}),
]);
