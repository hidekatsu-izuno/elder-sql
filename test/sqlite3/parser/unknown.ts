import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("SelectStatement", {}, [
		new Element("SelectClause", {}, [
			new Element("Reserved", { value: "SELECT" }, [
				new Text("SELECT"),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("SelectColumnList", {}, [
				new Element("SelectColumn", {}, [new Element("Expression", {})]),
			]),
		]),
		new Element("Unknown", {}, [
			new Element("Reserved", { value: "UPDATE" }, [
				new Text("UPDATE"),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("Reserved", { value: "SELECT" }, [new Text("select")]),
			new Element("Numeric", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("1"),
			]),
			new Element("Numeric", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("2"),
			]),
			new Element("Numeric", {}, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("3"),
				new Element("LineBreak", {}, [new Text("\n")]),
			]),
			new Element("Reserved", { value: "CREATE" }, [new Text("CREATE")]),
			new Element("Reserved", { value: "TABLE" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("TABLE"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("Unknown", {}, [
		new Element("Reserved", { value: "CREATE" }, [
			new Element("LineBreak", {}, [new Text("\n")]),
			new Text("CREATE"),
		]),
		new Element("BindVariable", {}, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("@aaa"),
		]),
		new Element("Error", {}, [new Text("@")]),
		new Element("Reserved", { value: "FROM" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("FROM"),
			new Element("WhiteSpace", {}, [new Text(" ")]),
		]),
		new Element("Error", {}, [new Text("#")]),
		new Element("Error", {}, [new Text("#")]),
		new Element("Error", {}, [new Text("#")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("EoF", {}),
]);
