import { ElderSqlConnection, ElderSqlDriver } from "@/driver.js"

class PostgresConnection extends ElderSqlConnection {
  close() {

  }
}

export class PostgresDriver extends ElderSqlDriver {
  constructor(option: Record<string, any>) {
    super()
  }

  open() {
    return new PostgresConnection()
  }
}