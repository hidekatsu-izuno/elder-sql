import { ElderSqlConnection, ElderSqlDriver } from "@/driver.js"

class OracleConnection extends ElderSqlConnection {
  close() {

  }
}

export class OracleDriver extends ElderSqlDriver {
  constructor(option: Record<string, any>) {
    super()
  }

  open() {
    return new OracleConnection()
  }
}