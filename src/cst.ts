import type { Options } from "css-select";
import { AttributeAction, parse, SelectorType, stringify, type PseudoSelector, type Selector } from "css-what";
import { compile, selectAll, selectOne } from "css-select";
import { escapeXml, LRUMap } from "./utils.ts"

export type CstAttrs = {
	type: string;
	value?: string | number | boolean;
    [name: string]: string | number | boolean | undefined;
};

export type CstPrintOptions = {
	token?: boolean;
	trivia?: boolean;
	marker?: boolean;
};

const KEY_PARENT = Symbol.for("parent");
const KEY_TYPECACHE = Symbol.for("typecache");

class CstNodeAdapter implements NonNullable<Options<CstNode, CstNode>["adapter"]> {
    static OPTIONS: Options<CstNode, CstNode> = {
        xmlMode: true,
        adapter: new CstNodeAdapter(),
    };

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
        return (elem[1] as any)?.[name]?.toString();
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
        return node.name;
    }

    getParent(node: CstNode): CstNode | null {
        return node.parent ?? null;
    }

    getSiblings(node: CstNode): CstNode[] {
        const result: CstNode[] = [];
        const parent = node.parent;
        if (parent) {
            for (let i = 2; i < parent.length; i++) {
                const child = parent[i];
                if (Array.isArray(child)) {
                    result.push(child);
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

const SELECTOR_CACHE = new LRUMap<string, ReturnType<typeof compile<CstNode, CstNode>>>(256);

function getSeletor(pattern: string) {
    let selector = SELECTOR_CACHE.get(pattern);
    if (!selector) {
        const parsed = parse(pattern);
        selector = compile<CstNode, CstNode>(parsed, CstNodeAdapter.OPTIONS);
        SELECTOR_CACHE.set(pattern, selector);
    }
    return selector;
}

function getTypeCache(node: CstNode) {
    let typecache = node[1][KEY_TYPECACHE];
    if (!typecache) {
        typecache = {};
        for (let i = 2; i < node.length; i++) {
            const child = node[i];
            if (child instanceof CstNode) {
                const type = child.attrs.type;
                if (type != null) {
                    let values = typecache[type];
                    if (!values) {
                        values = [child];
                        typecache[type] = values;
                    } else {
                        values.push(child);
                    }
                }
            }
        }
        node[1][KEY_TYPECACHE] = typecache;
    }
    return typecache;
}

export class CstNode extends Array<CstAttrs | CstNode | string> {
    static parseJSON(source: any): CstNode {
        const node = typeof source === "string" ? JSON.parse(source, (key, value) => {
            if (value?.constructor === Object) {
                return Object.keys(value)
                    .filter(key => key === "type" || key === "value")
                    .reduce((obj: any, key: string) => {
                        obj[key] = value[key];
                        return obj;
                    }, {});
            }
            return value;
        }) : source;

        function traverse(current: Array<unknown>) {
            if (current.length < 2 || typeof current[0] !== "string") {
                throw new SyntaxError();
            }

            if (
                current.length >= 2 &&
                typeof current[0] === "string" &&
                current[1]?.constructor === Object &&
                typeof (current[1] as Record<string, any>)?.type === "string"
            ) {
                Object.setPrototypeOf(current, CstNode.prototype);
                for (let i = 2; i < current.length; i++) {
                    const child = current[i];
                    if (Array.isArray(child)) {
                        traverse(child);
                        child[1][KEY_PARENT] = current;
                    } else if (typeof child !== "string") {
                        throw new SyntaxError();
                    }
                }
            } else  {
                throw new SyntaxError();
            }
        }

        if (Array.isArray(node)) {
            traverse(node);
        } else {
            throw new SyntaxError();
        }
        return node as CstNode;
    }

	0: string;
	1: CstAttrs & {
        [KEY_PARENT]?: CstNode,
        [KEY_TYPECACHE]?: Record<string, CstNode[]>,
    };

    constructor(name: string, attrs: CstAttrs, ...childNodes: (CstNode | string)[]) {
        super(name, attrs, ...childNodes);
        if (this.name === undefined) {
            this[0] = name;
            this[1] = attrs;
            for (let i = 0; i < childNodes.length; i++) {
                this[i + 2] = childNodes[i];
            }
        }
    }

    get name() {
        return this[0];
    }

    set name(value: string) {
        this[0] = value;
    }

    get attrs(): CstAttrs {
        return this[1];
    }

    get parent(): CstNode | undefined {
        return this[1][KEY_PARENT];
    }

    get children() {
        const result: CstNode[] = [];
        for (let i = 2; i < this.length; i++) {
            const node = this[i];
            if (node instanceof CstNode) {
                result.push(node);
            }
        }
        return result;
    }

    get childNodes() {
        return this.slice(2);
    }

    append(node: CstNode | string) {
        if (node instanceof CstNode) {
            const parent = node[1][KEY_PARENT];
            if (parent) {
                const index = parent.indexOf(node);
                if (index !== -1) {
                    parent.splice(index, 1);
                }
            }
            this.push(node);
            node[1][KEY_PARENT] = this;
        } else {
            this.push(node);
        }
    }

    is(selector: string) {
        const compiled = getSeletor(selector);
        return compiled(this);
    }

    selectOne(selector: string): CstNode | undefined {
        const compiled = getSeletor(selector);
        return selectOne<CstNode, CstNode>(compiled, this, CstNodeAdapter.OPTIONS) ?? undefined;
    }

    selectAll(selector: string): CstNode[] {
        const compiled = getSeletor(selector);
        return selectAll<CstNode, CstNode>(compiled, this, CstNodeAdapter.OPTIONS);
    }

    toJSONString(options?: CstPrintOptions) {
        let out = "";
        function print(elem: CstNode, indent: number) {
            for (let i = 0; i < indent; i++) {
                out += "\t";
            }
            out += `[${JSON.stringify(elem[0])}, { "type": ${JSON.stringify(elem[1].type)}`;
            if (elem[1].value != null) {
                out += `, "value": ${JSON.stringify(elem[1].value)}`;
            }
            out += " }";
            for (let i = 2; i < elem.length; i++) {
                const child = elem[i];
                if (Array.isArray(child)) {
                    const token = child[0] === "token";
                    const trivia = child[0] === "trivia";
                    const marker = token && child.length <= 1;
                    if (
                        (token && options?.token === false) ||
                        (trivia && options?.trivia === false) ||
                        (marker && options?.marker === false)
                    ) {
                        continue;
                    }
                    out += ",\n";
                    print(child, indent + 1);
                } else {
                    out += ",";
                    if (elem[0] === "node") {
                        out += "\n";
                        for (let i = 0; i < indent + 1; i++) {
                            out += "\t";
                        }
                    } else {
                        out += " ";
                    }
                    out += JSON.stringify(child);
                }
            }
            if (elem[0] === "node") {
                out += "\n";
                for (let i = 0; i < indent; i++) {
                    out += "\t";
                }
            }
            out += "]";
        }
        print(this, 0);
        return out;
    }

    toXMLString(options?: CstPrintOptions) {
        let out = "";
        function print(elem: CstNode, indent: number) {
            for (let i = 0; i < indent; i++) {
                out += "\t";
            }
            out += `<${escapeXml(elem[0])} type="${escapeXml(elem[1].type)}"`;
            if (elem[1].value != null) {
                out += ` value="${escapeXml(elem[1].value.toString())}"`;
            }
            out += ">";
            for (let i = 2; i < elem.length; i++) {
                const child = elem[i];
                if (Array.isArray(child)) {
                    const token = child[0] === "token";
                    const trivia = child[0] === "trivia";
                    const marker = token && child.length <= 1;
                    if (
                        (token && options?.token === false) ||
                        (trivia && options?.trivia === false) ||
                        (marker && options?.marker === false)
                    ) {
                        continue;
                    }
                    out += "\n";
                    print(child, indent + 1);
                } else {
                    if (elem[0] === "node") {
                        out += "\n";
                        for (let i = 0; i < indent + 1; i++) {
                            out += "\t";
                        }
                    }
                    out += escapeXml(child.toString());
                }
            }
            if (elem[0] === "node") {
                out += "\n";
                for (let i = 0; i < indent; i++) {
                    out += "\t";
                }
            }
            out += `</${escapeXml(elem[0])}>`;
        }
        print(this, 0);
        return out;
    }

    text(options?: CstPrintOptions) {
        let out = "";
        function print(elem: CstNode, indent: number) {
            for (let i = 2; i < elem.length; i++) {
                const child = elem[i];
                if (Array.isArray(child)) {
                    const token = child[0] === "token";
                    const trivia = child[0] === "trivia";
                    const marker = token && child.length <= 1;
                    if (
                        (token && options?.token === false) ||
                        (trivia && options?.trivia === false) ||
                        (marker && options?.marker === false)
                    ) {
                        continue;
                    }
                    print(child, indent + 1);
                } else {
                    out += child.toString();
                }
            }
        }
        print(this, 0);
        return out;
    }

    toString() {
        return this.toJSONString();
    }
}
