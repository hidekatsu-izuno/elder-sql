import { ElderSqlConnection, ElderSqlDriver } from "@/driver.js"

class MssqlConnection extends ElderSqlConnection {
  close() {

  }
}

export class MssqlDriver extends ElderSqlDriver {
  constructor(option: Record<string, any>) {
    super()
  }

  open() {
    return new MssqlConnection()
  }
}