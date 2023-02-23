import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { Sqlite3Parser } from "../../src/sqlite3/sqlite3_parser.js"
import { writeDebugFile, toJSScript, toJSString } from "../utils/debug.js"
import { AggregateParseError } from '../../src/parser.js'

describe("test sqlite3 parser", () => {
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
    const expected = (await import("./parser/" + target + ".js")).default
    let node
    try {
      node = new Sqlite3Parser().parse(script)
    } catch (err) {
      if (target === "unknown" && err instanceof AggregateParseError) {
        node = err.node
      } else {
        throw err
      }
    }

    writeDebugFile(`test/dump/sqlite3/parser/${target}.js.txt`, toJSScript(node))

    expect(toJSString(node)).toStrictEqual(toJSString(expected))
  })
})