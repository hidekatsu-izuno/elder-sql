import type { CstNode } from "./cst.ts"
import type { Parser } from "./parser.ts";

export declare type ResolverOptions = {
	global?: FromObject[];
	[key: string]: any;
};

export class ResolverContext {
	parent?: ResolverContext;
	children: ResolverContext[] = [];

	//constructor(fos: FromObject[] = []) {}
}

export class FromObject {
	objectType: string;
	schemaName?: string;
	objectName?: string;
	columns = new Array<ResolvedColumn>();
	children = new Array<FromObject>();

	constructor(objectType: string) {
		this.objectType = objectType;
	}
}

export declare type ResolvedColumn = {
	schemaName?: string;
	objectName?: string;
	objectType?: string;
	columnName: string;
	columnTypeSchema?: string;
	columnTypeName: string;
	length?: number;
	precision?: number;
};

export abstract class Resolver {
	parser: Parser;
	options: ResolverOptions = {};

	constructor(parser: Parser, options: ResolverOptions = {}) {
		this.parser = parser;
		this.options = options;
	}

	resolve(query: string | CstNode, filename?: string): ResolvedColumn[] {
		const node =
			typeof query === "string" ? this.parser.parse(query, filename) : query;
		const statement = this.findStatement(node);
		if (!statement) {
			throw new TypeError("Statement node is not found.");
		}
		const fo = this.extractNode(statement);
		const columns = new Array<ResolvedColumn>();
		if (fo) {
			// resolve
		}
		return columns;
	}

	protected abstract extractNode(statement: CstNode): FromObject | undefined;

	private findStatement(elem: CstNode): CstNode | undefined {
		if (/(\\s|^)Statement(\\s|$)/.test(elem[1].type)) {
			return elem;
		} else {
			for (let i = 2; i < elem.length; i++) {
				const child = elem[i];
				if (Array.isArray(child)) {
					const result = this.findStatement(child);
					if (result) {
						return result;
					}
				}
			}
		}
	}
}
