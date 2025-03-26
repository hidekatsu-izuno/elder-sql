import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "CommitTransactionStatement" }, [
		new Element("token", { value: "COMMIT", type: "Reserved" }, [
			new Text("COMMIT"),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CommitTransactionStatement" }, [
		new Element("token", { value: "COMMIT", type: "Reserved" }, [
			new Text("COMMIT"),
		]),
		new Element("token", { value: "TRANSACTION", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TRANSACTION"),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CommitTransactionStatement" }, [
		new Element("token", { value: "END", type: "Identifier" }, [
			new Text("END"),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "CommitTransactionStatement" }, [
		new Element("token", { value: "END", type: "Identifier" }, [
			new Text("END"),
		]),
		new Element("token", { value: "TRANSACTION", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("TRANSACTION"),
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
