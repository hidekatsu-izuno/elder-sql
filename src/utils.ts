import type { Options } from "acorn";
import { parseExpressionAt } from "acorn";

const acornOption: Options = {
	ecmaVersion: "latest",
};

export function lcase(text: string) {
	return text.toLowerCase();
}

export function ucase(text: string) {
	return text.toUpperCase();
}

export function lcamel(text: string) {
	return text.replace(/(^|[_ \t-]+)([A-Za-z])|(.)/g, (m, g1, g2, g3) => {
		if (g2) {
			if (g1) {
				return g2.toUpperCase();
			} else {
				return g2.toLowerCase();
			}
		} else {
			return g3.toLowerCase();
		}
	});
}

export function ucamel(text: string) {
	return text.replace(/(^|[_ \t-]+)([A-Za-z])|(.)/g, (m, g1, g2, g3) => {
		if (g2) {
			return g2.toUpperCase();
		} else {
			return g3.toLowerCase();
		}
	});
}

export function squote(text: string) {
	return `'${text.replace(/'/g, "''")}'`;
}

export function dquote(text: string) {
	return `"${text.replace(/"/g, '""')}"`;
}

export function bquote(text: string) {
	return `\`${text.replace(/`/g, "``")}\``;
}

export function dequote(text: string) {
	if (text.length >= 2) {
		if (text.startsWith("'") && text.endsWith("'")) {
			return text.substring(1, text.length - 1).replace(/''/g, "'");
		}
		if (text.startsWith('"') && text.endsWith('"')) {
			return text.substring(1, text.length - 1).replace(/""/g, '"');
		}
		if (text.startsWith("`") && text.endsWith("`")) {
			return text.substring(1, text.length - 1).replace(/``/g, "`");
		}
		if (text.startsWith("[") && text.endsWith("]")) {
			return text.substring(1, text.length - 1);
		}
		let m = /^[Nn]'((?:''|[^'])*)'$/.exec(text);
		if (m) {
			return m[1].replace(/''/g, "'");
		}
		m = /^[Nn]"((?:""|[^"])*)"$/.exec(text);
		if (m) {
			return m[1].replace(/""/g, '"');
		}
		m = /^\$([^$]*)\$(.*?)\$\1\$$/s.exec(text);
		if (m) {
			return m[2];
		}
		m =
			/^[Nn]?[Qq]'(?:\[(.*?)\]|\{(.*?)\}|\((.*?)\)|([^ \t\r\n])(.*?)\4)'$/s.exec(
				text,
			);
		if (m) {
			return m[1] || m[2] || m[3] || m[5];
		}
	}
	return text;
}

export function escapeRegExp(text: string) {
	return text.replace(/[.*+?^=!:${}()|[\]/\\]/g, "\\$&");
}

export function compareVersion(version1 = "0", version2 = "0") {
	const v1 = toVersionObject(version1);
	const v2 = toVersionObject(version2);
	for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
		if (v1[i] == null || v2[i] == null) {
			return v1[i] == null ? (v2[i] == null ? 0 : -1) : 1;
		}
		if (typeof v1[i] === typeof v2[i]) {
			if (v1[i] !== v2[i]) {
				return v1[i] < v2[i] ? -1 : 1;
			}
		} else {
			return typeof v1[i] === "number" ? -1 : 1;
		}
	}
	return 0;
}

function toVersionObject(text: string) {
	const cparts =
		/^([0-9]+(?:\.[0-9]+)*)(?:-([^.+]+(?:\.[^.+]+)*))?(?:\+.+)?$/.exec(text);
	if (!cparts) {
		throw new Error(`Invalid version number: ${text}`);
	}

	const vparts = [];
	const nparts = cparts[1].split(".");
	let hex = "0x";
	for (let i = 0; i < 6; i++) {
		if (i < nparts.length) {
			hex += Number.parseInt(nparts[i], 10).toString(16).padStart(2, "0");
		} else {
			hex += "00";
		}
	}
	vparts.push(Number.parseInt(hex, 16));
	if (cparts[2]) {
		const sparts = cparts[2].split(".");
		for (let i = 0; i < 6; i++) {
			if (/^[0-9]+$/.test(sparts[i])) {
				vparts.push(Number.parseInt(sparts[i], 10));
			} else {
				vparts.push(sparts[i]);
			}
		}
	}
	return vparts;
}

const sandboxProxies = new WeakMap();

export function sandbox(src: string) {
	const code = new Function("sandbox", `with (sandbox) {${src}}`);

	return (context: Record<string, any>) => {
		if (!sandboxProxies.has(context)) {
			const sandboxProxy = new Proxy(context, {
				has(_target: Record<string | symbol, any>, _p: string | symbol) {
					return true;
				},
				get(target: Record<string | symbol, any>, p: string | symbol) {
					if (p !== Symbol.unscopables) {
						return target[p];
					}
				},
			});
			sandboxProxies.set(sandbox, sandboxProxy);
		}
		return code(sandboxProxies.get(context));
	};
}

export function isJSIdentifier(text: string) {
	const result = parseExpressionAt(text, 0, acornOption);
	return result.end === text.length && result.type === "Identifier";
}

export function isJSExpression(text: string) {
	const result = parseExpressionAt(text, 0, acornOption);
	return result.end === text.length;
}

export class CacheMap<K, V> extends Map<K, V> {
	private capacity;

	constructor(capacity: number) {
		super();
		this.capacity = capacity;
	}

	set(key: K, value: V) {
		super.set(key, value);
		if (this.size > this.capacity) {
			for (const key of this.keys()) {
				this.delete(key);
			}
		}
		return this;
	}

	get(key: K) {
		if (!super.has(key)) {
			return;
		}

		const value = super.get(key);
		this.delete(key);
		if (value !== undefined) {
			super.set(key, value);
		}
		return value;
	}
}
