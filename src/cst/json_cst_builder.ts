import type { CstBuilder, CstBuilderOptions } from "../parser.ts"
import type { Token } from "../lexer.ts"

interface Element {
    parent?: Element,
    name: string,
    type: string,
    value?: string,
    children?: (Element | string)[],
}

const EMPTY_NODE: Element = { name: "node", type: "" };
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
        const elem: Element = {
            name: "node",
            type,
            ...(value != null ? { value: value.toString() } : {}),
        };
        if (this.current === EMPTY_NODE) {
            this.root = elem;
        } else {
            (this.current.children ??= []).push(elem);
            elem.parent = this.current;
        }
        this.current = elem;
        return this.current;
    }

    type(type: string, context?: Element) {
        if (context) {
            context.type = type;
            return context.type;
        } else {
            this.current.type = type;
            return this.current.type;
        }
    }

    value(value: string | number | boolean, context?: Element) {
        if (context) {
            context.value = value.toString();
            return context.value;
        } else {
            this.current.value = value.toString();
            return this.current.value;
        }
    }

    append(child: Element, context?: Element) {
        if (context) {
            (context.children ??= []).push(child);
            child.parent = context;
        } else {
            (this.current.children ??= []).push(child);
            child.parent = this.current;
        }
        return child;
    }

    token(token: Token, context?: Element) {
        const elem: Element = {
            name: "token",
            type: token.type.name,
            ...(token.keyword != null ? { value: token.keyword.name } : {}),
        };
        if (this.options.trivia) {
            for (const skip of token.preskips) {
                const trivia: Element = {
                    name: "trivia",
                    type: skip.type.name,
                    ...(skip.keyword != null ? { value: skip.keyword.name } : {}),
                };
                if (skip.text) {
                    (trivia.children ??= []).push(skip.text);
                }
                (elem.children ??= []).push(trivia);
                trivia.parent = elem;
            }
        }
        if (token.text) {
            (elem.children ??= []).push(token.text);
        }
        if (this.options.trivia) {
            for (const skip of token.postskips) {
                const trivia: Element = {
                    name: "trivia",
                    type: skip.type.name,
                    ...(skip.keyword != null ? { value: skip.keyword.name } : {}),
                };
                if (skip.text) {
                    (trivia.children ??= []).push(skip.text);
                }
                (elem.children ??= []).push(trivia);
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
                (context.children ??= []).push(elem);
                elem.parent = context;
            } else {
                (this.current.children ??= []).push(elem);
                elem.parent = this.current;
            }
        }
        return token;
    }

    end(start?: Element) {
        if (start && start !== this.current) {
            throw new Error("Start and end elements do not match");
        }
        if (this.current.parent instanceof Element) {
            const current = this.current;
            this.current = this.current.parent;
            return current;
        } else {
            return this.root;
        }
    }

    toString(context?: Element) {
        const options = this.options;
        function filter(src: Element) {
            const dest: Element = {
                name: src.name,
                type: src.type,
            };
            if (src.value) {
                dest.value = src.value;
            }
            if (src.children) {
                dest.children = [];
                for (const child of src.children) {
                    if (child != null && typeof child === "object") {
                        const token = child.name === "token";
                        const trivia = child.name === "trivia";
                        const marker = token && (child.children?.length ?? 0) === 0;
                        if (
                            (token && !options.token) ||
                            (trivia && !options.trivia) ||
                            (marker && !options.marker)
                        ) {
                            continue;
                        }
                        return filter(child);
                    } else {
                        return child;
                    }
                }
            }
            return dest;
        } 
        return JSON.stringify(
            filter(context ?? this.current),
            ["name", "value", "children"],
            "  ",
        );
    }
}
