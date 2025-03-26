import { Element, Text } from "domhandler";

export default new Element("node", { type: "Script" }, [
	new Element("node", { type: "SelectStatement" }, [
		new Element("node", { type: "SelectClause" }, [
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("SELECT"),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("node", { type: "SelectColumnList" }, [
				new Element("node", { type: "SelectColumn" }, [
					new Element("node", { type: "Expression" }),
				]),
			]),
		]),
		new Element("node", { type: "Unknown" }, [
			new Element("token", { value: "UPDATE", type: "Reserved" }, [
				new Text("UPDATE"),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("token", { value: "SELECT", type: "Reserved" }, [
				new Text("select"),
			]),
			new Element("token", { type: "Numeric" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("1"),
			]),
			new Element("token", { type: "Numeric" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("2"),
			]),
			new Element("token", { type: "Numeric" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("3"),
				new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			]),
			new Element("token", { value: "CREATE", type: "Reserved" }, [
				new Text("CREATE"),
			]),
			new Element("token", { value: "TABLE", type: "Reserved" }, [
				new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
				new Text("TABLE"),
			]),
		]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("node", { type: "Unknown" }, [
		new Element("token", { value: "CREATE", type: "Reserved" }, [
			new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("token", { type: "BindVariable" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("@aaa"),
		]),
		new Element("token", { type: "Error" }, [new Text("@")]),
		new Element("token", { value: "FROM", type: "Reserved" }, [
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
			new Text("FROM"),
			new Element("trivia", { type: "WhiteSpace" }, [new Text(" ")]),
		]),
		new Element("token", { type: "Error" }, [new Text("#")]),
		new Element("token", { type: "Error" }, [new Text("#")]),
		new Element("token", { type: "Error" }, [new Text("#")]),
	]),
	new Element("token", { type: "SemiColon" }, [
		new Text(";"),
		new Element("trivia", { type: "LineBreak" }, [new Text("\n")]),
	]),
	new Element("token", { type: "EoF" }),
]);
