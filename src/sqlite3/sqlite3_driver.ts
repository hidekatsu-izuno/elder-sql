import { ElderSqlConnection, ElderSqlDriver } from "@/driver.js"

class Sqlite3Connection extends ElderSqlConnection {
  close() {

  }
}

export class Sqlite3Driver extends ElderSqlDriver {
  constructor(option: Record<string, any>) {
    super()
  }

  open() {
    return new Sqlite3Connection()
  }
}