export default function (program, host, config, { ts }) {
    const rootFileNames = program.getRootFileNames().map(ts.normalizePath);
    const compilerOptions = program.getCompilerOptions();
    const compilerHost = getPatchedHost(host, ts, compilerOptions);

    /* Transform AST */
    const transformedSource = ts.transform(
        program.getSourceFiles().filter(sourceFile => rootFileNames.includes(sourceFile.fileName)),
        [transformAst.bind(ts)],
        compilerOptions
    ).transformed;

    /* Render modified files and create new SourceFiles for them to use in host's cache */
    const { printFile } = ts.createPrinter();
    for (const sourceFile of transformedSource) {
        const { fileName, languageVersion } = sourceFile;
        const updatedSourceFile = ts.createSourceFile(fileName, printFile(sourceFile), languageVersion);
        compilerHost.fileCache.set(fileName, updatedSourceFile);
    }

    return ts.createProgram(rootFileNames, compilerOptions, compilerHost);
}

function getPatchedHost(
    maybeHost,
    ts,
    compilerOptions
) {
    const fileCache = new Map();
    const compilerHost = maybeHost ?? ts.createCompilerHost(compilerOptions, true);
    const originalGetSourceFile = compilerHost.getSourceFile;

    return Object.assign(compilerHost, {
        getSourceFile(fileName, languageVersion) {
            fileName = ts.normalizePath(fileName);
            if (fileCache.has(fileName)) return fileCache.get(fileName);

            const sourceFile = originalGetSourceFile.apply(void 0, Array.from(arguments));
            fileCache.set(fileName, sourceFile);

            return sourceFile;
        },
        fileCache
    });
}

function transformAst(context) {
    const ts = this;
    /* Transformer Function */
    return (sourceFile) => {
        function visit(node) {
            if (ts.isStringLiteral(node) && node.text.endsWith(".ts")) {
                return context.factory.createStringLiteral(node.text.replace(/\.ts$/, '.js'));
            } else {
                return ts.visitEachChild(node, visit, context);
            }
        }
        return ts.visitEachChild(sourceFile, visit, context);
    }
}