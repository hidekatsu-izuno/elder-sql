import type { CstBuilder, CstBuilderOptions } from "../parser.ts"
import { TokenType, type Token } from "../lexer.ts"

export type Header = {
    tag: string,
    type: string,
    value?: string | number | boolean
};
export interface Element extends Array<Header | Element | string> {
    parent?: Element,
    0: Header,
}

const EMPTY_NODE: Element = [{ tag: "node", type: "" }];
export class JsonCstBuilder implements CstBuilder<Element> {
    root: Element;
    current: Element;
    options: {
        token: boolean;
        trivia: boolean;
        marker: boolean;
    };

    constructor(options: CstBuilderOptions = {}) {
        this.root = EMPTY_NODE;
        this.current = EMPTY_NODE;
        this.options = {
            token: options.token ?? true,
            trivia: options.trivia ?? true,
            marker: options.marker ?? true,
        };
    }

    start(type: string, value?: string | number | boolean) {
        const elem: Element = [{
            tag: "node",
            type,
        }];
        if (value != null) {
            elem[0].value = value;
        }
        if (this.current === EMPTY_NODE) {
            this.root = elem;
        } else {
            this.current.push(elem);
            elem.parent = this.current;
        }
        this.current = elem;
        return this.current;
    }

    type(type: string, context?: Element) {
        if (context) {
            context[0].type = type;
            return context[0].type;
        } else {
            this.current[0].type = type;
            return this.current[0].type;
        }
    }

    value(value: string | number | boolean, context?: Element) {
        if (context) {
            context[0].value = value.toString();
            return context[0].value;
        } else {
            this.current[0].value = value.toString();
            return this.current[0].value;
        }
    }

    append(child: Element, context?: Element) {
        if (context) {
            context.push(child);
            child.parent = context;
        } else {
            this.current.push(child);
            child.parent = this.current;
        }
        return child;
    }

    token(token: Token, context?: Element) {
        const elem: Element = [{
            tag: "token",
            type: token.type.name,
        }];
        if (token.type === TokenType.Reserved && token.keyword != null) {
            elem[0].value = token.keyword.name;
        }
        if (this.options.trivia) {
            for (const skip of token.preskips) {
                const trivia: Element = [{
                    tag: "trivia",
                    type: skip.type.name,
                }];
                if (skip.type === TokenType.Reserved && skip.keyword != null) {
                    trivia[0].value = skip.keyword.name;
                }
                if (skip.text) {
                    trivia.push(skip.text);
                }
                elem.push(trivia);
                trivia.parent = elem;
            }
        }
        if (token.text) {
            elem.push(token.text);
        }
        if (this.options.trivia) {
            for (const skip of token.postskips) {
                const trivia: Element = [{
                    tag: "trivia",
                    type: skip.type.name,
                }];
                if (skip.type === TokenType.Reserved && skip.keyword != null) {
                    elem[0].value = skip.keyword.name;
                }
                if (skip.text) {
                    trivia.push(skip.text);
                }
                elem.push(trivia);
                trivia.parent = elem;
            }
        }
        if (
            !this.options.token ||
            this.options.marker ||
            token.text ||
            (this.options.trivia &&
                (token.preskips.length !== 0 || token.postskips.length !== 0))
        ) {
            if (context) {
                context.push(elem);
                elem.parent = context;
            } else {
                this.current.push(elem);
                elem.parent = this.current;
            }
        }
        return token;
    }

    end(start?: Element) {
        if (start && start !== this.current) {
            throw new Error("Start and end elements do not match");
        }
        if (this.current.parent) {
            const current = this.current;
            this.current = this.current.parent;
            return current;
        } else {
            return this.root;
        }
    }

    toString(context?: Element) {
        const options = this.options;
        let out = "";
        function print(elem: Element, indent: number) {
            for (let i = 0; i < indent; i++) {
                out += "\t";
            }
            out += "[{ \"tag\": " + JSON.stringify(elem[0].tag) 
                + ", \"type\": " + JSON.stringify(elem[0].type);
            if (elem[0].value != null) {
                out += ", \"value\": " + JSON.stringify(elem[0].value);
            }
            out += " }";
            for (let i = 1; i < elem.length; i++) {
                const child = elem[i];
                if (Array.isArray(child)) {
                    const token = child[0].tag === "token";
                    const trivia = child[0].tag === "trivia";
                    const marker = token && child.length <= 1;
                    if (
                        (token && !options.token) ||
                        (trivia && !options.trivia) ||
                        (marker && !options.marker)
                    ) {
                        continue;
                    }
                    out += ",\n";
                    print(child, indent + 1);
                } else {
                    out += ",";
                    if (elem[0].tag === "node") {
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
            if (elem[0].tag === "node") {
                out += "\n";
                for (let i = 0; i < indent; i++) {
                    out += "\t";
                }
            }
            out += "]";
        }
        print(context ?? this.current, 0);
        return out;
    }
}
