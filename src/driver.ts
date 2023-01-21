import { MssqlDriver } from "./mssql/mssql_driver.js"
import { MysqlDriver } from "./mysql/mysql_driver.js"
import { OracleDriver } from "./oracle/oracle_driver.js"
import { PostgresDriver } from "./postgres/postgres_driver.js"
import { Sqlite3Driver } from "./sqlite3/sqlite3_driver.js"

export type ElderSqlOpenOptions = {
  dialect: "sqlite3" | "mysql" | "postgres" | "oracle" | "mssql"
  host?: string
  port?: string
  username?: string
  password?: string
  database?: string
}

export abstract class ElderSqlConnection {
  abstract close(): void
}

export abstract class ElderSqlDriver {
  static open(options: ElderSqlOpenOptions) {
    if (options.dialect === 'sqlite3') {
      return new Sqlite3Driver(options)
    } else if (options.dialect === 'mysql') {
      return new MysqlDriver(options)
    } else if (options.dialect === 'postgres') {
      return new PostgresDriver(options)
    } else if (options.dialect === 'oracle') {
      return new OracleDriver(options)
    } else if (options.dialect === 'mssql') {
      return new MssqlDriver(options)
    } else {
      throw new TypeError(`Unknown dialect: ${options.dialect}`)
    }
  }

  abstract open(): ElderSqlConnection
}
