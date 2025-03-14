import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("CommitTransactionStatement", {}, [
		new Element("Reserved", { value: "COMMIT" }, [new Text("COMMIT")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CommitTransactionStatement", {}, [
		new Element("Reserved", { value: "COMMIT" }, [new Text("COMMIT")]),
		new Element("Reserved", { value: "TRANSACTION" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TRANSACTION"),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CommitTransactionStatement", {}, [
		new Element("Identifier", { value: "END" }, [new Text("END")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("CommitTransactionStatement", {}, [
		new Element("Identifier", { value: "END" }, [new Text("END")]),
		new Element("Reserved", { value: "TRANSACTION" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("TRANSACTION"),
			new Element("LineBreak", {}, [new Text("\n")]),
		]),
	]),
	new Element("EoF", {}),
]);
