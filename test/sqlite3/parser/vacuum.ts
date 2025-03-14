import { Element, Text } from "domhandler";

export default new Element("Script", {}, [
	new Element("VacuumStatement", {}, [
		new Element("Identifier", { value: "VACUUM" }, [new Text("VACUUM")]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("VacuumStatement", {}, [
		new Element("Identifier", { value: "VACUUM" }, [new Text("VACUUM")]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("VacuumStatement", {}, [
		new Element("Identifier", { value: "VACUUM" }, [new Text("VACUUM")]),
		new Element("SchemaName", { value: "main" }, [
			new Element("Identifier", { value: "MAIN" }, [
				new Element("WhiteSpace", {}, [new Text(" ")]),
				new Text("main"),
			]),
		]),
		new Element("Reserved", { value: "INTO" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INTO"),
		]),
		new Element("FileName", {}, [
			new Element("StringLiteral", { value: "database.dat" }, [
				new Element("String", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text("'database.dat'"),
				]),
			]),
		]),
	]),
	new Element("SemiColon", {}, [
		new Text(";"),
		new Element("LineBreak", {}, [new Text("\n")]),
	]),
	new Element("VacuumStatement", {}, [
		new Element("Identifier", { value: "VACUUM" }, [new Text("VACUUM")]),
		new Element("Reserved", { value: "INTO" }, [
			new Element("WhiteSpace", {}, [new Text(" ")]),
			new Text("INTO"),
		]),
		new Element("FileName", {}, [
			new Element("StringLiteral", { value: "database.dat" }, [
				new Element("Identifier", {}, [
					new Element("WhiteSpace", {}, [new Text(" ")]),
					new Text('"database.dat"'),
					new Element("LineBreak", {}, [new Text("\n")]),
				]),
			]),
		]),
	]),
	new Element("EoF", {}),
]);
