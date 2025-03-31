import { ElderSqlCompiler, ElderSqlError } from "./compiler.ts";

export default function loader(this: any, source: any) {
	const options = this.getOptions({
		title: "Elder-SQL Loader options",
		type: "object",
		description: "Options for Elder-SQL.",
		additionalProperties: true,
	});
	const callback = this.async();
	const useSourceMap =
		typeof options.sourceMap === "boolean" ? options.sourceMap : this.sourceMap;

	try {
		const compiler = new ElderSqlCompiler(options);
		const result = compiler.compile(this.resourcePath);

		callback(null, result.js, useSourceMap && result.map);
	} catch (err) {
		if (err instanceof Error) {
			callback(new ElderSqlError(err));
		} else {
			callback(err);
		}
	}
}
