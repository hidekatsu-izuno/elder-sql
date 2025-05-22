import { EOL } from "node:os";
import type { Options } from "css-select";
import { compile } from "css-select";
import {
	AggregateParseError,
	CstBuilder,
	type CstNode,
	type Parser,
} from "./parser.ts";

export declare type FormatActionType =
	| "reset"
	| "indent"
	| "unindent"
	| "softbreak"
	| "break"
	| "nospace"
	| "nobreak";

export declare type FormatPattern = {
	pattern: string;
	before?: FormatActionType | FormatActionType[];
	after?: FormatActionType | FormatActionType[];
};

export declare type FormatterOptions = {
	printWidth?: number;
	tabWidth?: number;
	useTabs?: boolean;
	endOfLine?: "lf" | "crlf" | "cr" | "auto";
	[key: string]: any;
};

export abstract class Formatter {
	parser: Parser;
	private patterns = new Array<FormatPattern>();
	options: FormatterOptions;

	private cache: Record<
		string,
		ReturnType<typeof compile<CstNode, CstNode>>
	> = {};

	constructor(
		parser: Parser,
		patterns: FormatPattern[],
		options: FormatterOptions = {},
	) {
		this.parser = parser;
		this.patterns = patterns;
		this.options = options;
	}

	format(script: string | CstNode, filename?: string): string {
		let node: CstNode | undefined;
		if (Array.isArray(script)) {
			node = script;
		} else {
			try {
				node = this.parser.parse(script, filename);
			} catch (err) {
				if (err instanceof AggregateParseError) {
					node = err.node;
				} else {
					throw err;
				}
			}
		}

		const out = new FormatWriter(this.options);
		if (node) {
			this.formatElement(node, out);
		}
		return out.toString();
	}

	private formatElement(node: CstNode, out: FormatWriter) {
		let before: FormatActionType | FormatActionType[] | undefined;
		let after: FormatActionType | FormatActionType[] | undefined;
		for (const item of this.patterns) {
			let query = this.cache[item.pattern];
			if (!query) {
				query = compile<CstNode, CstNode>(item.pattern, {
					xmlMode: true,
					adapter: new CstNodeAdapter(),
				});
				this.cache[item.pattern] = query;
			}
			if (query(node)) {
				before = item.before;
				after = item.after;
				break;
			}
		}

		if (before) {
			if (Array.isArray(before)) {
				for (const action of before) {
					out.control(action);
				}
			} else {
				out.control(before);
			}
		}
		if (node[1].type === "LineComment") {
			out.write(CstBuilder.toTextString(node), true);
			out.control("softbreak");
		} else if (
			node[1].type === "BlockComment" ||
			node[1].type === "HintComment"
		) {
			const segments = CstBuilder.toTextString(node).split(/\r\n?|\n/g);
			for (let i = 0; i < segments.length; i++) {
				if (i > 0) {
					out.control("break");
				}
				out.write(segments[i], true);
			}
		} else if (node[1].type === "WhiteSpace" || node[1].type === "LineBreak") {
			// no handle
		} else if (node[1].type === "EoF") {
			out.write("", false);
		} else if (node[1].type === "Unknown") {
			out.write(this.concatNode(node, out).trim(), false);
			out.control("break");
		} else {
			for (let i = 2; i < node.length; i++) {
				const child = node[i];
				if (Array.isArray(child)) {
					this.formatElement(child, out);
				} else if (child) {
					out.write(child.toString(), false);
				}
			}
		}
		if (after) {
			if (Array.isArray(after)) {
				for (const action of after) {
					out.control(action);
				}
			} else {
				out.control(after);
			}
		}
	}

	private concatNode(node: CstNode, out: FormatWriter) {
		let text = "";
		for (let i = 2; i < node.length; i++) {
			const child = node[i];
			if (Array.isArray(child)) {
				if (child[1].type === "LineBreak") {
					text += out.eol;
				} else {
					text += this.concatNode(child, out);
				}
			} else if (child) {
				text += child.toString();
			}
		}
		return text;
	}
}

class FormatWriter {
	printWidth: number;
	indent: string;
	indentWidth: number;
	eol: string;

	private text = "";
	private depth = 0;
	private line = new Array<{
		text: string;
		depth: number;
		nospace?: boolean;
	}>();

	private nospace = false;
	private nobreak = false;
	private actions = new Array<FormatActionType>();

	constructor(options: FormatterOptions) {
		this.printWidth = options.printWidth ?? 80;
		if (options.useTabs) {
			this.indent = "\t";
			this.indentWidth = options.tabWidth ?? 2;
		} else {
			this.indent = " ".repeat(options.tabWidth ?? 2);
			this.indentWidth = options.tabWidth ?? 2;
		}
		if (options.endOfLine === "crlf") {
			this.eol = "\r\n";
		} else if (options.endOfLine === "cr") {
			this.eol = "\r";
		} else if (options.endOfLine === "auto") {
			this.eol = EOL;
		} else {
			this.eol = "\n";
		}
	}

	control(action: FormatActionType) {
		if (action === "nospace") {
			this.nospace = true;
		} else if (action === "nobreak") {
			this.nobreak = true;
		} else {
			this.actions.push(action);
		}
	}

	write(text: string, skip: boolean) {
		if (this.actions.length > 0) {
			this.performActions();
		}
		if (skip) {
			this.line.push({ text, depth: this.depth });
		} else {
			this.line.push({ text, depth: this.depth, nospace: this.nospace });
			this.nospace = false;
			this.nobreak = false;
		}
	}

	toString() {
		this.nospace = false;
		this.nobreak = false;
		this.performActions();
		return this.text;
	}

	private performActions() {
		let breaked = false;
		let breakCount = 0;
		let depth = this.depth;
		for (const action of this.actions) {
			if (action === "break") {
				breakCount++;
				breaked = true;
			} else {
				if (!breaked) {
					breakCount++;
					breaked = true;
				}

				if (action === "softbreak") {
					// no handle
				} else if (action === "indent") {
					depth++;
				} else if (action === "unindent") {
					depth--;
				} else if (action === "reset") {
					depth = 0;
				} else {
					throw new Error(`Unexpected action: ${action}`);
				}
			}
		}
		this.actions.length = 0;

		if (!(this.nospace || this.nobreak)) {
			if (this.line.length > 0) {
				const depth = this.line[0].depth;

				let first = true;
				let width = this.indentWidth * (depth + (first ? 0 : 1));
				let text = this.indent.repeat(depth + (first ? 0 : 1));
				for (let i = 0; i < this.line.length; i++) {
					const item = this.line[i];
					const nospace = i === 0 || item.nospace;
					if (width + item.text.length + (nospace ? 0 : 1) < this.printWidth) {
						width += (nospace ? 0 : 1) + item.text.length;
						text += (nospace ? "" : " ") + item.text;
					} else {
						this.text += text + this.eol;
						first = false;

						width =
							this.indentWidth * (depth + (first ? 0 : 1)) +
							(nospace ? 0 : 1) +
							item.text.length;
						text =
							this.indent.repeat(depth + (first ? 0 : 1)) +
							(nospace ? "" : " ") +
							item.text;
					}
				}
				this.text += text;
				this.line.length = 0;
			}

			if (breakCount > 2) {
				breakCount = 2;
			}
			for (let i = 0; i < breakCount; i++) {
				this.text += this.eol;
			}
		}

		this.depth = depth;
	}
}

type Adapter = NonNullable<(Options<CstNode, CstNode>)["adapter"]>;

class CstNodeAdapter implements Adapter {
	isTag(node: CstNode): node is CstNode {
		return Array.isArray(node);
	}

	existsOne(test: (elem: CstNode) => boolean, elems: CstNode[]) {
		for (const elem of elems) {
			if (test(elem)) {
				return true;
			}
		}
		return false;
	}

	hasAttrib(elem: CstNode, name: string): boolean {
		return name in elem[1];
	}

	getAttributeValue(elem: CstNode, name: string) {
		return ((elem[1] as any)?.[name])?.toString();
	}

	getChildren(node: CstNode): CstNode[] {
		const result: CstNode[] = [];
		for (let i = 2; i < node.length; i++) {
			const child = node[i];
			if (Array.isArray(child)) {
				result.push(child);
			}
		}
		return result;
	}

	getName(node: CstNode): string {
		return node[0];
	}

	getParent(node: CstNode): CstNode | null {
		return node.parent ?? null;
	}

	getSiblings(node: CstNode): CstNode[] {
		const result: CstNode[] = [];
		if (node.parent) {
			for (let i = 2; i < node.parent.length; i++) {
				const child = node.parent[i];
				if (Array.isArray(child)) {
					result.push(child)
				}
			}
		}
		return result;
	}

	getText(node: CstNode): string {
		let str = "";
		for (let i = 2; i < node.length; i++) {
			const child = node[i];
			if (Array.isArray(child)) {
				str += this.getText(child);
			}
		}
		return str;
	}

	removeSubsets(nodes: CstNode[]): CstNode[] {
		return Array.from(new Set(nodes));
	}

	findAll(test: (node: CstNode) => boolean, nodes: CstNode[]): CstNode[] {
		const result: CstNode[] = [];
		function traverse(current: CstNode) {
			if (test(current)) {
				result.push(current);
			}
			for (let i = 2; i < current.length; i++) {
				const child = current[i];
				if (Array.isArray(child)) {
					traverse(child);
				}
			}
		}
		for (const node of nodes) {
			traverse(node);
		}
		return result;
	}

	findOne(test: (node: CstNode) => boolean, nodes: CstNode[]): CstNode | null {
		function traverse(current: CstNode): CstNode | null {
			if (test(current)) {
				return current;
			}
			for (let i = 2; i < current.length; i++) {
				const child = current[i];
				if (Array.isArray(child)) {
					const result = traverse(child);
					if (result != null) {
						return result;
					}
				}
			}
			return null;
		}
		for (const node of nodes) {
			const result = traverse(node);
			if (result != null) {
				return result;
			}
		}
		return null;
	}
}
