import { MssqlDriver } from "./mssql/mssql_driver.js"
import { MysqlDriver } from "./mysql/mysql_driver.js"
import { OracleDriver } from "./oracle/oracle_driver.js"
import { PostgresDriver } from "./postgres/postgres_driver.js"
import { Sqlite3Driver } from "./sqlite3/sqlite3_driver.js"

export type ElderSqlDriverOptions = {
  dialect: "sqlite3" | "mysql" | "postgres" | "oracle" | "mssql"
  host?: string
  port?: string
  username?: string
  password?: string
  database?: string
  [key: string]: any
}

export abstract class ElderSqlConnection {
  abstract transaction<T=void>(proc: () => T): Promise<T>
  abstract close(): Promise<void>
}

export abstract class ElderSqlDriver {
  static connect(options: ElderSqlDriverOptions) {
    if (options.dialect === 'sqlite3') {
      return new Sqlite3Driver(options).connect()
    } else if (options.dialect === 'mysql') {
      return new MysqlDriver(options).connect()
    } else if (options.dialect === 'postgres') {
      return new PostgresDriver(options).connect()
    } else if (options.dialect === 'oracle') {
      return new OracleDriver(options).connect()
    } else if (options.dialect === 'mssql') {
      return new MssqlDriver(options).connect()
    } else {
      throw new TypeError(`Unknown dialect: ${options.dialect}`)
    }
  }

  constructor(
    public options: ElderSqlDriverOptions
  ) {
  }

  abstract connect(): Promise<ElderSqlConnection>
}
