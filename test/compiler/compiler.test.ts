import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { ElderSqlCompiler } from "../../src/compiler.js"

describe("test compiler", () => {
  test.each([
    "select"
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = fs.readFileSync(path.join(__dirname, "expected", target + ".ts.txt"), "utf8")
    const result = new ElderSqlCompiler({
      dialect: 'sqlite3'
    }).compile(script)

    if (target === "select") {
      fs.writeFileSync("temp.txt", result.js)
    }

    expect(result.js).toStrictEqual(expected)
  })
})