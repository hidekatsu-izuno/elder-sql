export default function (program, host, config, { ts }) {
	const rootFileNames = program.getRootFileNames().map(ts.normalizePath);
	const compilerOptions = program.getCompilerOptions();
	const compilerHost = getPatchedHost(host, ts, compilerOptions);

	/* Transform AST */
	const transformedSource = ts.transform(
		program
			.getSourceFiles()
			.filter((sourceFile) => rootFileNames.includes(sourceFile.fileName)),
		[transformAst.bind(ts)],
		compilerOptions,
	).transformed;

	/* Render modified files and create new SourceFiles for them to use in host's cache */
	const { printFile } = ts.createPrinter();
	for (const sourceFile of transformedSource) {
		const { fileName, languageVersion } = sourceFile;
		const updatedSourceFile = ts.createSourceFile(
			fileName,
			printFile(sourceFile),
			languageVersion,
		);
		compilerHost.fileCache.set(fileName, updatedSourceFile);
	}

	return ts.createProgram(rootFileNames, compilerOptions, compilerHost);
}

function getPatchedHost(maybeHost, ts, compilerOptions) {
	const fileCache = new Map();
	const compilerHost =
		maybeHost ?? ts.createCompilerHost(compilerOptions, true);
	const originalGetSourceFile = compilerHost.getSourceFile;

	return Object.assign(compilerHost, {
		getSourceFile(fileName, ...params) {
			const nFileName = ts.normalizePath(fileName);
			if (fileCache.has(nFileName)) {
				return fileCache.get(nFileName);
			}

			const sourceFile = originalGetSourceFile.apply(void 0, [
				fileName,
				...params,
			]);
			fileCache.set(nFileName, sourceFile);

			return sourceFile;
		},
		fileCache,
	});
}

function transformAst(context) {
	const ts = this;
	/* Transformer Function */
	return (sourceFile) => {
		function visit(node) {
			if (
				ts.isStringLiteral(node) &&
				node.text.endsWith(".ts") &&
				node.parent &&
				(ts.isImportDeclaration(node.parent) ||
					ts.isExportDeclaration(node.parent) ||
					(ts.isCallExpression(node.parent) &&
						(node.parent.expression.kind === ts.SyntaxKind.ImportKeyword ||
							node.parent.expression.text === "require")))
			) {
				return context.factory.createStringLiteral(
					node.text.replace(/\.ts$/, ".js"),
				);
			} else {
				return ts.visitEachChild(node, visit, context);
			}
		}
		return ts.visitEachChild(sourceFile, visit, context);
	};
}
