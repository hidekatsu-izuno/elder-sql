import { ElderSqlConnection, ElderSqlDriver, ElderSqlDriverOptions } from "@/driver.js"
import Database from 'better-sqlite3'

class Sqlite3Connection extends ElderSqlConnection {
  private database

  constructor(
    connection: string,
    private options: Record<string, any>,
  ) {
    super()
    this.database = Database(connection, options)
  }

  async get(query: string, params: any[]) {
    return this.database.prepare(query).get(params)
  }

  async list(query: string, params: any[]) {
    return this.database.prepare(query).all(params)
  }

  async iterate(query: string, params: any[]) {
    return this.database.prepare(query).iterate(params)
  }

  async execute(proc: string, params: any[]) {
    return this.database.prepare(proc).run(params)
  }

  async transaction<T=void>(proc: () => T): Promise<T> {
    return this.database.transaction(proc)()
  }

  async close() {
    this.database.close()
  }
}

export class Sqlite3Driver extends ElderSqlDriver {
  constructor(options: ElderSqlDriverOptions) {
    super(options)
  }

  async connect() {
    return new Sqlite3Connection(this.options.database || "", this.options.sqlite3)
  }
}