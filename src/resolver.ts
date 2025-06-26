import type { CstNode, Parser } from "elder-parse";
import type { SqlLexer } from "./sql.ts";

export declare type ResolverOptions = {
	global?: FromObject[];
	[key: string]: any;
};

export class FromObject {
	objectName?: string;
	schemaName?: string;
	databaseName?: string;
	alias?: string;
	columns: ResolvedColumn[] = [];
	children: FromObject[] = [];
	type: "table" | "query" | "cte" | "function";

	constructor(type: "table" | "query" | "cte" | "function") {
		this.type = type;
		this.columns = [];
		this.children = [];
	}
}

export declare type ResolvedColumn = {
	columnName: string;
	alias?: string;
	dataType?: string;
	tableName?: string;
	schemaName?: string;
	databaseName?: string;
	isNullable?: boolean;
	expression?: CstNode;
};

export class Resolver {
	parser: Parser<SqlLexer>;
	options: ResolverOptions = {};

	constructor(parser: Parser<SqlLexer>, options: ResolverOptions = {}) {
		this.parser = parser;
		this.options = options;
	}

	resolve(query: string | CstNode): ResolvedColumn[] {
		const node = typeof query === "string" ? this.parser.parse(query) : query;

		// Handle script node - it contains statements
		if (this.isNodeType(node, "Script")) {
			// Find the main statement - prefer one with WithClause, otherwise the last SelectStatement
			let mainStatement = null;
			let lastStatement = null;

			for (let i = 2; i < node.length; i++) {
				const child = node[i];
				if (this.isCstNode(child) && this.isStatementNode(child)) {
					lastStatement = child;
					// Check if this statement has a WithClause (CTE)
					if (this.findNode(child, "WithClause")) {
						mainStatement = child;
						break; // This is the main statement with CTEs
					}
				}
			}

			// Use the statement with WithClause if found, otherwise the last statement
			const statementToResolve = mainStatement || lastStatement;
			if (statementToResolve) {
				return this.resolveStatement(statementToResolve);
			}
		} else if (this.isStatementNode(node)) {
			return this.resolveStatement(node);
		}

		return [];
	}

	protected resolveStatement(statement: CstNode): ResolvedColumn[] {
		const statementType = statement[1].type;

		if (statementType === "SelectStatement") {
			return this.resolveSelectStatement(statement);
		} else if (statementType === "InsertStatement") {
			return this.resolveInsertStatement(statement);
		} else if (statementType === "UpdateStatement") {
			return this.resolveUpdateStatement(statement);
		} else if (statementType === "DeleteStatement") {
			return this.resolveDeleteStatement(statement);
		}

		return [];
	}

	protected resolveSelectStatement(statement: CstNode): ResolvedColumn[] {
		const columns: ResolvedColumn[] = [];

		// First, extract FROM clause to understand available tables
		const fromObjects = this.extractFromClause(statement);

		// Then, extract SELECT columns
		const selectClause = this.findNode(statement, "SelectClause");
		if (selectClause) {
			const selectColumns = this.findAllNodes(selectClause, "SelectColumn");
			for (const selectColumn of selectColumns) {
				const resolvedColumns = this.resolveSelectColumn(
					selectColumn,
					fromObjects,
				);
				columns.push(...resolvedColumns);
			}
		}

		return columns;
	}

	protected resolveSelectColumn(
		selectColumn: CstNode,
		fromObjects: FromObject[],
	): ResolvedColumn[] {
		const columns: ResolvedColumn[] = [];

		// First check if there's an Expression node
		const expression = this.findNode(selectColumn, "Expression");
		if (expression) {
			// If expression contains a function, resolve as function
			if (this.findNode(expression, "FunctionExpression")) {
				const column = this.resolveExpression(expression, fromObjects);

				// Check for alias
				const columnAlias = this.findNode(selectColumn, "ColumnAlias");
				if (columnAlias) {
					column.alias = this.getNodeText(columnAlias);
				}

				columns.push(column);
				return columns;
			}
		}

		// Check for direct AllColumnsOption (SELECT * not in function)
		const directAllColumns = this.findNode(selectColumn, "AllColumnsOption");
		if (directAllColumns) {
			// Check if it's qualified (table.*)
			const schemaName = this.findNode(directAllColumns, "SchemaName");
			if (schemaName) {
				const tableName = this.getNodeText(schemaName);
				// Find matching table and return all its columns
				const matchingTable = this.findFromObject(fromObjects, tableName);
				if (matchingTable && matchingTable.columns.length > 0) {
					return matchingTable.columns.map((col) => ({
						...col,
						tableName: matchingTable.alias || matchingTable.objectName,
						schemaName: matchingTable.schemaName,
					}));
				}
			}
			// Return all columns from tables referenced in FROM clause
			return this.getAllColumnsFromTables(fromObjects);
		}

		// Handle regular column or expression
		if (expression) {
			// Otherwise resolve as normal expression
			const column = this.resolveExpression(expression, fromObjects);

			// Check for alias
			const columnAlias = this.findNode(selectColumn, "ColumnAlias");
			if (columnAlias) {
				column.alias = this.getNodeText(columnAlias);
			}

			columns.push(column);
		}

		return columns;
	}

	protected resolveExpression(
		expression: CstNode,
		fromObjects: FromObject[],
	): ResolvedColumn {
		// Handle function expression first
		const funcExpr = this.findNode(expression, "FunctionExpression");
		if (funcExpr) {
			const objectName = this.findNode(funcExpr, "ObjectName");
			return {
				columnName: objectName ? this.getNodeText(objectName) : "function",
				expression: expression,
			};
		}

		// Check for operations (complex expressions)
		const operationTypes = [
			"ConcatenateOperation",
			"AddOperation",
			"SubtractOperation",
			"MultiplyOperation",
			"DivideOperation",
			"ModuloOperation",
			"AndOperation",
			"OrOperation",
			"NotOperation",
			"EqualOperation",
			"NotEqualOperation",
			"LessOperation",
			"LessEqualOperation",
			"GreaterOperation",
			"GreaterEqualOperation",
			"LikeOperation",
			"InOperation",
			"BetweenOperation",
		];

		for (const opType of operationTypes) {
			if (this.findNode(expression, opType)) {
				return {
					columnName: "expression",
					expression: expression,
				};
			}
		}

		// Handle simple column reference
		const columnRef = this.findNode(expression, "ColumnReference");
		if (columnRef) {
			const parts = this.extractColumnReferenceParts(columnRef);
			const column: ResolvedColumn = {
				columnName: parts.column || "unknown",
				tableName: parts.table,
				schemaName: parts.schema,
				expression: expression,
			};

			// Try to find the column in from objects to get more info
			if (parts.table) {
				const fromObject = this.findFromObject(
					fromObjects,
					parts.table,
					parts.schema,
				);
				if (fromObject) {
					const sourceColumn = fromObject.columns.find(
						(col) => col.columnName === column.columnName,
					);
					if (sourceColumn) {
						column.dataType = sourceColumn.dataType;
						column.isNullable = sourceColumn.isNullable;
					}
				}
			}

			return column;
		}

		// Handle literal values - check for direct literal types
		const stringLiteral = this.findNode(expression, "StringLiteral");
		if (stringLiteral) {
			return {
				columnName: this.getNodeText(stringLiteral),
				dataType: "string",
				expression: expression,
			};
		}

		const numberLiteral = this.findNode(expression, "NumericLiteral");
		if (numberLiteral) {
			return {
				columnName: this.getNodeText(numberLiteral),
				dataType: "number",
				expression: expression,
			};
		}

		const booleanLiteral = this.findNode(expression, "BooleanLiteral");
		if (booleanLiteral) {
			return {
				columnName: this.getNodeText(booleanLiteral),
				dataType: "boolean",
				expression: expression,
			};
		}

		const nullLiteral = this.findNode(expression, "NullLiteral");
		if (nullLiteral) {
			return {
				columnName: this.getNodeText(nullLiteral),
				dataType: "null",
				expression: expression,
			};
		}

		// Default case for complex expressions
		return {
			columnName: "expression",
			expression: expression,
		};
	}

	protected extractFromClause(statement: CstNode): FromObject[] {
		const fromObjects: FromObject[] = [];

		// Add CTEs if present
		const ctes: FromObject[] = [];
		const withClause = this.findNode(statement, "WithClause");
		if (withClause) {
			const cteNodes = this.findAllNodes(withClause, "CommonTable");
			for (const cte of cteNodes) {
				const cteObject = this.extractCommonTable(cte);
				if (cteObject) {
					ctes.push(cteObject);
					fromObjects.push(cteObject);
				}
			}
		}

		// Add tables from FROM clause
		const fromClause = this.findNode(statement, "FromClause");
		if (fromClause) {
			const fromObjectNodes = this.findAllNodes(fromClause, "FromObject");
			for (const fromObjectNode of fromObjectNodes) {
				const fromObject = this.extractFromObject(fromObjectNode, ctes);
				if (fromObject) {
					fromObjects.push(fromObject);
				}
			}
		}

		// Only add global tables if there's no FROM clause
		if (this.options.global && !fromClause) {
			fromObjects.push(...this.options.global);
		}

		return fromObjects;
	}

	protected extractFromObject(
		fromObjectNode: CstNode,
		availableCtes: FromObject[] = [],
	): FromObject | null {
		// Handle table reference
		const objectRef = this.findNode(fromObjectNode, "ObjectReference");
		if (objectRef) {
			const fromObject = new FromObject("table");

			const schemaName = this.findNode(objectRef, "SchemaName");
			const objectName = this.findNode(objectRef, "ObjectName");
			const objectAlias = this.findNode(fromObjectNode, "ObjectAlias");

			if (schemaName) {
				fromObject.schemaName = this.getNodeText(schemaName);
			}
			if (objectName) {
				fromObject.objectName = this.getNodeText(objectName);
			}
			if (objectAlias) {
				fromObject.alias = this.getNodeText(objectAlias);
			}

			// First check if this is a CTE
			const matchingCte = availableCtes.find(
				(cte) => cte.objectName === fromObject.objectName,
			);
			if (matchingCte) {
				// Return a copy of the CTE with alias if specified
				const cteObject = new FromObject("cte");
				cteObject.objectName = matchingCte.objectName;
				cteObject.schemaName = matchingCte.schemaName;
				cteObject.alias = fromObject.alias || matchingCte.alias;
				cteObject.columns = matchingCte.columns.map((col) => ({ ...col }));
				return cteObject;
			}

			// Try to get columns from global tables
			if (this.options.global) {
				const globalTable = this.options.global.find(
					(t) =>
						t.objectName === fromObject.objectName &&
						(!t.schemaName || t.schemaName === fromObject.schemaName),
				);
				if (globalTable) {
					fromObject.columns = globalTable.columns.map((col) => ({ ...col }));
				}
			}

			return fromObject;
		}

		// Handle subquery
		const subquery = this.findNode(fromObjectNode, "SubqueryExpression");
		if (subquery) {
			const selectStatement = this.findNode(subquery, "SelectStatement");
			if (selectStatement) {
				const fromObject = new FromObject("query");
				const objectAlias = this.findNode(fromObjectNode, "ObjectAlias");

				if (objectAlias) {
					fromObject.alias = this.getNodeText(objectAlias);
				}

				// Resolve subquery columns
				fromObject.columns = this.resolveSelectStatement(selectStatement).map(
					(col) => ({
						...col,
						tableName: fromObject.alias || fromObject.objectName,
					}),
				);

				return fromObject;
			}
		}

		return null;
	}

	protected extractCommonTable(cteNode: CstNode): FromObject | null {
		const fromObject = new FromObject("cte");

		const objectName = this.findNode(cteNode, "ObjectName");
		if (objectName) {
			fromObject.objectName = this.getNodeText(objectName);
		}

		// Extract column list if specified
		const columnList = this.findNode(cteNode, "ColumnList");
		const columnNames: string[] = [];
		if (columnList) {
			const columns = this.findAllNodes(columnList, "ColumnName");
			for (const col of columns) {
				columnNames.push(this.getNodeText(col));
			}
		}

		// Resolve the CTE query
		const selectStatement = this.findNode(cteNode, "SelectStatement");
		if (selectStatement) {
			const resolvedColumns = this.resolveSelectStatement(selectStatement);

			// If column names were specified, use them
			if (columnNames.length > 0) {
				fromObject.columns = columnNames.map((name, i) => ({
					columnName: name,
					dataType: resolvedColumns[i]?.dataType,
					isNullable: resolvedColumns[i]?.isNullable,
				}));
			} else {
				fromObject.columns = resolvedColumns;
			}
		}

		return fromObject;
	}

	protected extractColumnReferenceParts(columnRef: CstNode): {
		schema?: string;
		table?: string;
		column?: string;
	} {
		const parts: { schema?: string; table?: string; column?: string } = {};

		const schemaName = this.findNode(columnRef, "SchemaName");
		const objectName = this.findNode(columnRef, "ObjectName");
		const columnName = this.findNode(columnRef, "ColumnName");

		if (schemaName) {
			parts.schema = this.getNodeText(schemaName);
		}
		if (objectName) {
			parts.table = this.getNodeText(objectName);
		}
		if (columnName) {
			parts.column = this.getNodeText(columnName);
		} else if (!objectName && schemaName) {
			// Sometimes schema.column is parsed as schema being the table
			parts.table = parts.schema;
			parts.schema = undefined;
			parts.column = this.getNodeText(schemaName);
		}

		return parts;
	}

	protected findFromObject(
		fromObjects: FromObject[],
		tableName: string,
		schemaName?: string,
	): FromObject | undefined {
		return fromObjects.find(
			(obj) =>
				(obj.alias === tableName || obj.objectName === tableName) &&
				(!schemaName || obj.schemaName === schemaName),
		);
	}

	protected getAllColumnsFromTables(
		fromObjects: FromObject[],
	): ResolvedColumn[] {
		const columns: ResolvedColumn[] = [];
		for (const fromObject of fromObjects) {
			columns.push(
				...fromObject.columns.map((col) => ({
					...col,
					tableName: fromObject.alias || fromObject.objectName,
					schemaName: fromObject.schemaName,
				})),
			);
		}
		return columns;
	}

	protected inferLiteralType(literal: CstNode): string {
		const tokenType = literal[1].type;
		if (tokenType === "NumberLiteral") {
			return "number";
		} else if (tokenType === "StringLiteral") {
			return "string";
		} else if (tokenType === "BooleanLiteral") {
			return "boolean";
		} else if (tokenType === "NullLiteral") {
			return "null";
		}
		return "unknown";
	}

	// DML statement methods with RETURNING clause support
	protected resolveInsertStatement(statement: CstNode): ResolvedColumn[] {
		// Check for RETURNING clause
		const returningClause = this.findNode(statement, "ReturningClause");
		if (returningClause) {
			// Extract the target table to understand available columns
			const fromObjects = this.extractDmlFromObjects(statement);
			return this.resolveReturningClause(returningClause, fromObjects);
		}

		// INSERT statements without RETURNING don't return columns
		return [];
	}

	protected resolveUpdateStatement(statement: CstNode): ResolvedColumn[] {
		// Check for RETURNING clause
		const returningClause = this.findNode(statement, "ReturningClause");
		if (returningClause) {
			// Extract the target table to understand available columns
			const fromObjects = this.extractDmlFromObjects(statement);
			return this.resolveReturningClause(returningClause, fromObjects);
		}

		// UPDATE statements without RETURNING don't return columns
		return [];
	}

	protected resolveDeleteStatement(statement: CstNode): ResolvedColumn[] {
		// Check for RETURNING clause
		const returningClause = this.findNode(statement, "ReturningClause");
		if (returningClause) {
			// Extract the target table to understand available columns
			const fromObjects = this.extractDmlFromObjects(statement);
			return this.resolveReturningClause(returningClause, fromObjects);
		}

		// DELETE statements without RETURNING don't return columns
		return [];
	}

	protected resolveReturningClause(
		returningClause: CstNode,
		fromObjects: FromObject[],
	): ResolvedColumn[] {
		const columns: ResolvedColumn[] = [];

		// Find the SelectColumnList in the RETURNING clause
		const selectColumnList = this.findNode(returningClause, "SelectColumnList");
		if (selectColumnList) {
			const selectColumns = this.findAllNodes(selectColumnList, "SelectColumn");
			for (const selectColumn of selectColumns) {
				const resolvedColumns = this.resolveSelectColumn(
					selectColumn,
					fromObjects,
				);
				columns.push(...resolvedColumns);
			}
		}

		return columns;
	}

	protected extractDmlFromObjects(statement: CstNode): FromObject[] {
		const fromObjects: FromObject[] = [];

		// Extract the target table from DML statement
		const statementType = statement[1].type;

		if (statementType === "InsertStatement") {
			// In INSERT statements, the table name is typically directly as ObjectName in InsertClause
			const insertClause = this.findNode(statement, "InsertClause");
			if (insertClause) {
				const objectName = this.findNode(insertClause, "ObjectName");
				if (objectName) {
					const fromObject = this.createFromObjectFromName(objectName);
					if (fromObject) {
						fromObjects.push(fromObject);
					}
				}
			}
		} else if (statementType === "UpdateStatement") {
			// Find the table name in UPDATE clause - could be ObjectReference or ObjectName
			const tableRef = this.findNode(statement, "ObjectReference");
			if (tableRef) {
				const fromObject = this.extractFromObjectRef(tableRef);
				if (fromObject) {
					fromObjects.push(fromObject);
				}
			} else {
				// Try ObjectName directly
				const objectName = this.findNode(statement, "ObjectName");
				if (objectName) {
					const fromObject = this.createFromObjectFromName(objectName);
					if (fromObject) {
						fromObjects.push(fromObject);
					}
				}
			}
		} else if (statementType === "DeleteStatement") {
			// Find the table name in DELETE FROM clause
			const fromClause = this.findNode(statement, "FromClause");
			if (fromClause) {
				const tableRef = this.findNode(fromClause, "ObjectReference");
				if (tableRef) {
					const fromObject = this.extractFromObjectRef(tableRef);
					if (fromObject) {
						fromObjects.push(fromObject);
					}
				} else {
					// Try ObjectName directly
					const objectName = this.findNode(fromClause, "ObjectName");
					if (objectName) {
						const fromObject = this.createFromObjectFromName(objectName);
						if (fromObject) {
							fromObjects.push(fromObject);
						}
					}
				}
			} else {
				// Look for table name directly in DeleteClause (for "DELETE FROM table" syntax)
				const deleteClause = this.findNode(statement, "DeleteClause");
				if (deleteClause) {
					const objectName = this.findNode(deleteClause, "ObjectName");
					if (objectName) {
						const fromObject = this.createFromObjectFromName(objectName);
						if (fromObject) {
							fromObjects.push(fromObject);
						}
					}
				}
			}
		}

		return fromObjects;
	}

	protected extractFromObjectRef(objectRef: CstNode): FromObject | null {
		const fromObject = new FromObject("table");

		const schemaName = this.findNode(objectRef, "SchemaName");
		const objectName = this.findNode(objectRef, "ObjectName");

		if (schemaName) {
			fromObject.schemaName = this.getNodeText(schemaName);
		}
		if (objectName) {
			fromObject.objectName = this.getNodeText(objectName);
		}

		// Try to get columns from global tables
		if (this.options.global) {
			const globalTable = this.options.global.find(
				(t) =>
					t.objectName === fromObject.objectName &&
					(!t.schemaName || t.schemaName === fromObject.schemaName),
			);
			if (globalTable) {
				fromObject.columns = globalTable.columns.map((col) => ({ ...col }));
			}
		}

		return fromObject;
	}

	protected createFromObjectFromName(
		objectNameNode: CstNode,
	): FromObject | null {
		const fromObject = new FromObject("table");

		// Extract the table name
		fromObject.objectName = this.getNodeText(objectNameNode);

		// Try to get columns from global tables
		if (this.options.global) {
			const globalTable = this.options.global.find(
				(t) => t.objectName === fromObject.objectName,
			);
			if (globalTable) {
				fromObject.columns = globalTable.columns.map((col) => ({ ...col }));
			}
		}

		return fromObject;
	}

	// Helper methods for node navigation
	protected isNodeType(node: CstNode, type: string): boolean {
		return this.isCstNode(node) && node[1].type === type;
	}

	protected isStatementNode(node: CstNode): boolean {
		return this.isCstNode(node) && node[1].type.endsWith("Statement");
	}

	protected isCstNode(node: any): node is CstNode {
		return Array.isArray(node) && node.length >= 2 && node[0] === "node";
	}

	protected findNode(parent: CstNode, type: string): CstNode | null {
		for (let i = 2; i < parent.length; i++) {
			const child = parent[i];
			if (this.isNodeType(child as CstNode, type)) {
				return child as CstNode;
			}
			if (this.isCstNode(child)) {
				const found = this.findNode(child as CstNode, type);
				if (found) return found;
			}
		}
		return null;
	}

	protected findAllNodes(parent: CstNode, type: string): CstNode[] {
		const nodes: CstNode[] = [];
		for (let i = 2; i < parent.length; i++) {
			const child = parent[i];
			if (this.isNodeType(child as CstNode, type)) {
				nodes.push(child as CstNode);
			}
			if (this.isCstNode(child)) {
				nodes.push(...this.findAllNodes(child as CstNode, type));
			}
		}
		return nodes;
	}

	protected getNodeText(node: CstNode): string {
		// If the node has a value attribute, return it directly
		if (node[1].value) {
			return String(node[1].value);
		}

		const tokens: string[] = [];
		this.collectTokens(node, tokens);
		return tokens.join("");
	}

	protected collectTokens(node: CstNode | string, tokens: string[]): void {
		if (typeof node === "string") {
			return;
		}

		for (let i = 2; i < node.length; i++) {
			const child = node[i];
			if (Array.isArray(child)) {
				if (child[0] === "token") {
					// Get the actual token value (skip trivia)
					const tokenValue = child[child.length - 1];
					if (typeof tokenValue === "string") {
						tokens.push(tokenValue);
					}
				} else if (child[0] === "node") {
					this.collectTokens(child as CstNode, tokens);
				}
			}
		}
	}
}
