import type { CstNode } from "../cst.ts";
import type { FromObject, ResolverOptions } from "../resolver.ts";
import { Resolver } from "../resolver.ts";
import { Sqlite3Parser } from "./sqlite3_parser.ts";

export class Sqlite3Resolver extends Resolver {
	constructor(options: ResolverOptions = {}) {
		super(options.parser ?? new Sqlite3Parser(options), options);
	}

	protected extractNode(statement: CstNode): FromObject | undefined {
		return;
	}
	/*
	protected extractNode(statement: CstNode) {
		let fo: FromObject | undefined;
		if (statement[1].type === "SelectStatement") {
			fo = this.extractSelectStatement(statement);
		} else if (statement[1].type === "InsertStatement") {
		} else if (statement[1].type === "UpdateStatement") {
		} else if (statement[1].type === "DeleteStatement") {
		}
		return fo;
	}

	private extractSelectStatement(elem: CstNode) {
		const fos = [];
		const fo = new FromObject("query");
		for (const child of findElementAll(
			elem,
			"WithClase",
			"CommonTableList",
			"CommonTable",
		)) {
			fos.push(this.extractCommonTable(child));
		}
		for (const child of findElementAll(
			elem,
			"FromClause",
			"FromObjectList",
			"FromObject",
		)) {
			fos.push(this.extractFromObject(child));
		}
		for (const child of findElementAll(
			elem,
			"SelectClase",
			"SelectColumnList",
			"SelectColumn",
		)) {
			//fo.columns.push(this.extractColumn(fo, child))
		}
		return fo;
	}

	private extractCommonTable(elem: Element) {
		const objectName = findElementFirst(elem, "ObjectName");
		const columnNames = findElementAll(elem, "ColumnList", "ColumnName");
		const selectStatement = findElementFirst(elem, "SelectStatement");
		if (!selectStatement) {
			throw new Error("SelectStatement is not found in CommonTable node.");
		}

		let fo = this.extractSelectStatement(selectStatement);

		if (objectName) {
			fo.objectName = textContent(objectName);
		}

		if (columnNames) {
			const fo2 = new FromObject("query");
			for (let i = 0; i < columnNames.length; i++) {
				if (i < fo.columns.length) {
					fo2.columns.push({
						...fo.columns[i],
						columnName: textContent(columnNames[i]),
					});
				}
			}
			fo = fo2;
		}

		return fo;
	}

	private extractFromObject(elem: Element) {
		const fo = new FromObject("query");
		for (const child of elem.childNodes) {
			if (child instanceof Element) {
				if (child.tagName === "ObjectReference") {
					const schemaName = findElementFirst(child, "SchemaName");
					const objectName = findElementFirst(child, "ObjectName");
					const objectAlias = findElementFirst(child, "ObjectAlias");

					const fo2 = new FromObject("ref");
					if (schemaName) {
						fo.schemaName = textContent(schemaName);
					}
					if (objectAlias) {
						fo.objectName = textContent(objectAlias);
					} else if (objectName) {
						fo.objectName = textContent(objectName);
					}
					fo.children.push(fo2);
				} else if (child.tagName === "FunctionExpression") {
					const schemaName = findElementFirst(child, "SchemaName");
					const objectName = findElementFirst(child, "ObjectName");
					const objectAlias = findElementFirst(child, "ObjectAlias");
					const fo2 = new FromObject("ref");
					if (schemaName) {
						fo.schemaName = textContent(schemaName);
					}
					if (objectAlias) {
						fo.objectName = textContent(objectAlias);
					} else if (objectName) {
						fo.objectName = textContent(objectName);
					}
					//TODO arguments
					fo.children.push(fo2);
				} else if (child.tagName === "SubqueryExpression") {
					const fo2 = this.extractSelectStatement(child);
					const objectAlias = findElementFirst(elem, "ObjecAlias");
					if (objectAlias) {
						fo2.objectName = textContent(objectAlias);
					}
					fo.children.push(fo2);
				} else if (/JoinClause$/.test(child.tagName)) {
					fo.children.push(this.extractFromObject(child));
				}
			}
		}
		return fo;
	}

	private extractColumn(parent: FromObject, elem: Element) {
		const allColumns = findElementFirst(elem, "AllColumnsOption");
		if (allColumns) {
			const schemaName = findElementFirst(elem, "SchemaName");
			if (schemaName) {
				for (const child of parent.children) {
				}
				parent.children.push();
			}
		} else {
		}
		const expr = findElementFirst(elem, "Expression");
	}
*/
}
