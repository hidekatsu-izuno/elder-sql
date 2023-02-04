import { test, describe, expect } from 'vitest'
import { bquote, dequote, dquote, squote } from '../src/utils'

describe("test utils", () => {
  test("test squote", async () => {
    expect(squote("test")).toStrictEqual("'test'")
    expect(squote("test's value")).toStrictEqual("'test''s value'")
  })

  test("test dquote", async () => {
    expect(dquote("test")).toStrictEqual("\"test\"")
    expect(dquote("test\"s value")).toStrictEqual("\"test\"\"s value\"")
  })

  test("test bquote", async () => {
    expect(bquote("test")).toStrictEqual("`test`")
    expect(bquote("test`s value")).toStrictEqual("`test``s value`")
  })

  test("test dequote", async () => {
    expect(dequote("test")).toStrictEqual("test")
    expect(dequote("test's value")).toStrictEqual("test's value")
    expect(dequote("'test'")).toStrictEqual("test")
    expect(dequote("'test''s value'")).toStrictEqual("test's value")
    expect(dequote("\"test\"")).toStrictEqual("test")
    expect(dequote("\"test\"\"s value\"")).toStrictEqual("test\"s value")
    expect(dequote("`test`")).toStrictEqual("test")
    expect(dequote("`test``s value`")).toStrictEqual("test`s value")
  })
})