import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { Sqlite3Formatter } from "../../src/sqlite3/sqlite3_formatter"
import { writeDebugFile } from "../utils/debug.js"

describe("test sqlite3 formatter", () => {
  test.each([
    "alter_table",
    "analyze",
    "attach_database",
    "begin_transaction",
    "command",
    "commit_transaction",
    "create_index",
    "create_table",
    "create_trigger",
    "create_view",
    "delete",
    "detach_database",
    "drop_index",
    "drop_table",
    "drop_trigger",
    "drop_view",
    "explain",
    "insert",
    "pragma",
    "reindex",
    "release_savepoint",
    "rollback_transaction",
    "savepoint",
    "select",
    "update",
    "vacuum",
    "unknown",
  ])("%s", async (target) => {
    const script = fs.readFileSync(path.join(__dirname, "scripts", target + ".sql"), "utf8")
    const expected = fs.readFileSync(path.join(__dirname, "formatter", target + ".sql"), "utf8")
    const formatted = new Sqlite3Formatter().format(script)

    writeDebugFile(`test/dump/sqlite3/formatter/${target}.sql.txt`, formatted)

    expect(formatted).toStrictEqual(expected)
  })
})