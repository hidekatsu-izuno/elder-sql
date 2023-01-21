import { ElderSqlConnection, ElderSqlDriver } from "@/driver.js"

class MysqlConnection extends ElderSqlConnection {
  close() {

  }
}

export class MysqlDriver extends ElderSqlDriver {
  constructor(option: Record<string, any>) {
    super()
  }

  open() {
    return new MysqlConnection()
  }
}