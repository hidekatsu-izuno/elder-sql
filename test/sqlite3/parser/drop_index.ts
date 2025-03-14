import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("DropIndexStatement", {}, [
		new Element("Identifier", { value: "DROP" }, [new Text("DROP")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("ObjectName", { value: "i_sample" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("i_sample"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("DropIndexStatement", {}, [
		new Element("Identifier", { value: "DROP" }, [new Text("DROP")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "i_sample" }, [
			new Element("Identifier", {}, [new Text("i_sample")]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("DropIndexStatement", {}, [
		new Element("Identifier", { value: "DROP" }, [new Text("DROP")]),
		new Element("Reserved", { value: "INDEX" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INDEX"),
		]),
		new Element("IfExists", {}, [
			new Element("Identifier", { value: "IF" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("IF"),
			]),
			new Element("Reserved", { value: "EXISTS" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("EXISTS"),
			]),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "i_sample" }, [
			new Element("Identifier", {}, [new Text("i_sample")]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("EoF", {}),
]);
