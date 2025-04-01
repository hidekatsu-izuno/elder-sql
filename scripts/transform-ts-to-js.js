import ts from "typescript";

export default function (program, host, config, { ts: tsInstance }) {
    const rootFileNames = program.getRootFileNames().map(tsInstance.normalizePath);
    const compilerOptions = program.getCompilerOptions();
    const compilerHost = getPatchedHost(host, tsInstance, compilerOptions);

    /* Transform AST */
    const transformedSource = tsInstance.transform(
        program.getSourceFiles().filter(sourceFile => rootFileNames.includes(sourceFile.fileName)),
        [transformAst.bind(tsInstance)],
        compilerOptions
    ).transformed;

    /* Render modified files and create new SourceFiles for them to use in host's cache */
    const { printFile } = tsInstance.createPrinter();
    for (const sourceFile of transformedSource) {
        const { fileName, languageVersion } = sourceFile;
        const updatedSourceFile = tsInstance.createSourceFile(fileName, printFile(sourceFile), languageVersion);
        compilerHost.fileCache.set(fileName, updatedSourceFile);
    }

    return tsInstance.createProgram(rootFileNames, compilerOptions, compilerHost);
}

function getPatchedHost(
    maybeHost,
    tsInstance,
    compilerOptions
) {
    const fileCache = new Map();
    const compilerHost = maybeHost ?? tsInstance.createCompilerHost(compilerOptions, true);
    const originalGetSourceFile = compilerHost.getSourceFile;

    return Object.assign(compilerHost, {
        getSourceFile(fileName, languageVersion) {
            fileName = tsInstance.normalizePath(fileName);
            if (fileCache.has(fileName)) return fileCache.get(fileName);

            const sourceFile = originalGetSourceFile.apply(void 0, Array.from(arguments));
            fileCache.set(fileName, sourceFile);

            return sourceFile;
        },
        fileCache
    });
}

function transformAst(context) {
    const tsInstance = this;

    /* Transformer Function */
    return (sourceFile) => {
        function visit(node) {
            if (ts.isStringLiteral(node) && node.text.endsWith(".ts")) {
                return context.factory.createStringLiteral(node.text.replace(/\.ts$/, '.js'));
            } else {
                return tsInstance.visitEachChild(node, visit, context);
            }
        }
        return tsInstance.visitEachChild(sourceFile, visit, context);
    }
}