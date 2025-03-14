import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("DropViewStatement", {}, [
		new Element("Identifier", { value: "DROP" }, [new Text("DROP")]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("v_sample"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("DropViewStatement", {}, [
		new Element("Identifier", { value: "DROP" }, [new Text("DROP")]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Dot", {}, [new Text(".")]),
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [new Text("v_sample")]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("DropViewStatement", {}, [
		new Element("Identifier", { value: "DROP" }, [new Text("DROP")]),
		new Element("Identifier", { value: "VIEW" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("VIEW"),
		]),
		new Element("IfExistsOption", {}, [
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
		new Element("ObjectName", { value: "v_sample" }, [
			new Element("Identifier", {}, [new Text("v_sample")]),
		]),
	]),
	new Element("SemiColon", {}, [new Text(";")]),
	new Element("EoF", {}),
]);
