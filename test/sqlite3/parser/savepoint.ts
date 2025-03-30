import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "SavepointStatement" }, [
		new Element("token", { type: "Identifier", value: "SAVEPOINT" }, [
			new Text("SAVEPOINT"),
		]),
		new Element("node", { type: "SavepointName", value: "sect1" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("sect1"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "SavepointStatement" }, [
		new Element("token", { type: "Identifier", value: "SAVEPOINT" }, [
			new Text("SAVEPOINT"),
		]),
		new Element("node", { type: "SavepointName", value: "sect2" }, [
			new Element("token", { type: "Identifier" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("sect2"),
			]),
		]),
	]),
	new Element("token", { type: "EoF" }),
]);
