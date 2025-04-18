import fs from "node:fs";
import path from "node:path";
import { Element, Text } from "domhandler";
import type { Token } from "../../src/lexer.ts";

export function getRootDir() {
	let current = process.cwd();
	while (current) {
		if (fs.existsSync(path.join(current, "package.json"))) {
			break;
		} else {
			current = path.resolve(current, "../");
		}
	}
	return current;
}

export function writeDebugFile(
	file: string,
	data: string | NodeJS.ArrayBufferView,
) {
	const filePath = path.join(getRootDir(), file);
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, data);
}

export function toJSScript(target: Element | Token | (Element | Token)[]) {
	let imports = "";
	if (target instanceof Element) {
		imports += 'import { Element, Text } from "domhandler"\n';
	} else {
		imports +=
			'import { SourceLocation, Token } from "../../../src/lexer.ts"\n';
		imports +=
			'import { SqlTokenType, SqlKeywords } from "../../../src/sql.ts"\n';
	}
	return `${imports}\nexport default ${toJSString(target)}\n`;
}

export function toJSString(
	target: Element | Token | (Element | Token)[],
	options: {
		space?: number;
	} = {},
) {
	const space = options.space ?? 0;

	let text = "";
	if (Array.isArray(target)) {
		text += `${" ".repeat(space * 2)}[\n`;
		let index = 0;
		for (const item of target) {
			if (index > 0) {
				text += ",\n";
			}
			text += `${" ".repeat((space + 1) * 2)}${toJSString(item, { space: space + 1 })}`;
			index++;
		}
		text += `\n${" ".repeat(space * 2)}]`;
	} else if (target instanceof Element) {
		text += `${" ".repeat(space * 2)}new Element(${JSON.stringify(target.name)}, `;
		text += JSON.stringify(target.attribs || {}, (_, v) => {
			if (!Array.isArray(v) && v !== null && typeof v === "object") {
				return Object.keys(v)
					.sort()
					.reduce((r, k) => {
						r[k] = v[k];
						return r;
					}, {});
			} else {
				return v;
			}
		});
		if (target.children.length === 1 && target.children[0] instanceof Text) {
			text += `, [new Text(${JSON.stringify(target.children[0].data)})])`;
		} else if (target.children.length > 0) {
			text += ", [\n";
			for (const child of target.children) {
				if (child instanceof Element) {
					const ctext = toJSString(child, { space: space + 1 }).trimStart();
					text += `${" ".repeat((space + 1) * 2)}${ctext},\n`;
				} else if (child instanceof Text) {
					text += `${" ".repeat((space + 1) * 2)}new Text(${JSON.stringify(child.data)}),\n`;
				}
			}
			text += `${" ".repeat(space * 2)}])`;
		} else {
			text += ")";
		}
	} else {
		text += `${" ".repeat(space * 2)}new Token(`;
		text += `SqlTokenType.${target.type.name}`;
		text += `, ${JSON.stringify(target.text)}`;
		if (
			target.keyword ||
			target.preskips.length ||
			target.postskips.length ||
			target.location
		) {
			text += ", { ";
			const elems = new Array<string>();
			if (target.keyword) {
				elems.push(`keyword: SqlKeywords.${target.keyword.name}`);
			}
			if (target.eos) {
				elems.push(`eos: ${target.eos}`);
			}
			if (target.preskips.length) {
				elems.push(
					`preskips: [${target.preskips.map((t) => toJSString(t)).join(", ")}]`,
				);
			}
			if (target.postskips.length) {
				elems.push(
					`postskips: [${target.postskips.map((t) => toJSString(t)).join(", ")}]`,
				);
			}
			if (target.location) {
				let elem = "location: new SourceLocation(";
				if (target.location.source != null) {
					elem += `${target.location.position ?? "undefined"}, ${target.location.lineNumber ?? "undefined"}, ${target.location.columnNumber ?? "undefined"}, ${JSON.stringify(target.location.source)}`;
				} else if (target.location.columnNumber != null) {
					elem += `${target.location.position ?? "undefined"}, ${target.location.lineNumber ?? "undefined"}, ${target.location.columnNumber}`;
				} else if (target.location.lineNumber != null) {
					elem += `${target.location.position ?? "undefined"}, ${target.location.lineNumber}`;
				} else if (target.location.position != null) {
					elem += target.location.position;
				}
				elem += ")";
				elems.push(elem);
			}
			text += elems.join(", ");
			text += "}";
		}
		text += ")";
	}
	return text;
}
