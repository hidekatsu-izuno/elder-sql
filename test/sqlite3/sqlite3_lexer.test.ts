import { test, describe, expect } from 'vitest'
import path from "node:path"
import fs from "node:fs"
import { Sqlite3Lexer } from "../../src/sqlite3/sqlite3_lexer.js"
import { writeDebugFile, toJSScript, toJSString } from "../utils/debug.js"

describe("test sqlite3 lexer", () => {
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
    const expected = (await import("./lexer/" + target + ".js")).default
    const tokens = new Sqlite3Lexer().lex(script)

    writeDebugFile(`test/dump/sqlite3/lexer/${target}.js.txt`, toJSScript(tokens))

    expect(toJSString(tokens)).toStrictEqual(toJSString(expected))
  })
})
