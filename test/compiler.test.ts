import fs from "node:fs"
import { ElderSqlCompiler } from "../src/compiler"

describe("test compiler", () => {
  test.each([
    "select"
  ])("%s", (target) => {
    const module = require("./compiler/" + target)
    const result = new ElderSqlCompiler({
      dialect: 'sqlite3'
    }).compile(module.actual)

    if (target === "select") {
      fs.writeFileSync("temp.txt", result.js)
    }

    expect(result.js).toStrictEqual(module.expected)
  })
})