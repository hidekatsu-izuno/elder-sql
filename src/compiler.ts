export class ElderSqlCompiler {
  constructor(
    public options = {}
  ) {

  }

  compile(filePath: string) {
    return new ElderSqlCompileResult("", {})
  }
}

export class ElderSqlCompileResult {
  constructor(
    public js: string,
    public map: object,
  ) {
  }
}

export class ElderSqlError extends Error {
  constructor(err: Error) {
    super(err.message)

    this.name = "ElderSqlError"
  }
}
