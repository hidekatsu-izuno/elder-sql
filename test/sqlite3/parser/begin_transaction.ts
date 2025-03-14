import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("Reserved", { value: "TRANSACTION" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TRANSACTION"),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("DeferredOption", {}, [
			new Element("Identifier", { value: "DEFERRED" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("DEFERRED"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("ImmediateOption", {}, [
			new Element("Identifier", { value: "IMMEDIATE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("IMMEDIATE"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("ExclusiveOption", {}, [
			new Element("Identifier", { value: "EXCLUSIVE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("EXCLUSIVE"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("DeferredOption", {}, [
			new Element("Identifier", { value: "DEFERRED" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("DEFERRED"),
			]),
		]),
		new Element("Reserved", { value: "TRANSACTION" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TRANSACTION"),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("ImmediateOption", {}, [
			new Element("Identifier", { value: "IMMEDIATE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("IMMEDIATE"),
			]),
		]),
		new Element("Reserved", { value: "TRANSACTION" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TRANSACTION"),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("BeginTransactionStatement", {}, [
		new Element("Identifier", { value: "BEGIN" }, [new Text("BEGIN")]),
		new Element("ExclusiveOption", {}, [
			new Element("Identifier", { value: "EXCLUSIVE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("EXCLUSIVE"),
			]),
		]),
		new Element("Reserved", { value: "TRANSACTION" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TRANSACTION"),
			new Element("LineBreak", {}, [new Text("\n")]),
		]),
	]),
	new Element("EoF", {}),
]);
