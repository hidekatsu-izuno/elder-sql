export type ElderSqlDriverOptions = {
  host?: string
  port?: string
  username?: string
  password?: string
  database?: string
  [key: string]: any
}

export interface ElderSqlSelecter<P, R> {
  get(params: P): R

  list(params: P): R[]

  iterate(params: P): AsyncIterable<R>
}

export interface ElderSqlExecuter<P, R> {
  execute(params: P): R
}

export abstract class ElderSqlConnection {
  abstract select(text: string): ElderSqlSelecter<Record<string, any>, Record<string, any>>
  abstract select<P, R>(builder: (con: ElderSqlConnection) => ElderSqlSelecter<P, R>): ElderSqlSelecter<P, R>

  abstract execute(text: string): ElderSqlExecuter<Record<string, any>, any>
  abstract execute<P, R>(builder: (con: ElderSqlConnection) => ElderSqlExecuter<P, R>): ElderSqlExecuter<P, R>
}

export declare type ElderSqlTransactionOptions = {
}

export abstract class ElderSqlDriver {
  public options: ElderSqlDriverOptions

  constructor(
    options: ElderSqlDriverOptions
  ) {
    this.options = options;
  }

  abstract transaction<T=void>(fn: (con: ElderSqlConnection) => Promise<T>): Promise<T>
  abstract transaction<T=void>(options: ElderSqlTransactionOptions, fn: (con: ElderSqlConnection) => Promise<T>): Promise<T>

  abstract close(): Promise<void>
}
