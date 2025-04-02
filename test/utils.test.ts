import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { bquote, dequote, dquote, squote } from "../src/utils.ts";

describe("test utils", () => {
	test("test squote", async () => {
		assert.strictEqual(squote("test"), "'test'");
		assert.strictEqual(squote("test's value"), "'test''s value'");
	});

	test("test dquote", async () => {
		assert.strictEqual(dquote("test"), '"test"');
		assert.strictEqual(dquote('test"s value'), '"test""s value"');
	});

	test("test bquote", async () => {
		assert.strictEqual(bquote("test"), "`test`");
		assert.strictEqual(bquote("test`s value"), "`test``s value`");
	});

	test("test dequote", async () => {
		assert.strictEqual(dequote("test"), "test");
		assert.strictEqual(dequote("test's value"), "test's value");
		assert.strictEqual(dequote("'test'"), "test");
		assert.strictEqual(dequote("'test''s value'"), "test's value");
		assert.strictEqual(dequote('"test"'), "test");
		assert.strictEqual(dequote('"test""s value"'), 'test"s value');
		assert.strictEqual(dequote("`test`"), "test");
		assert.strictEqual(dequote("`test``s value`"), "test`s value");
		assert.strictEqual(dequote("N'test'"), "test");
		assert.strictEqual(dequote("n'test''s value'"), "test's value");
		assert.strictEqual(dequote('N"test"'), "test");
		assert.strictEqual(dequote('n"test""s value"'), 'test"s value');
		assert.strictEqual(dequote("$$test's value$$"), "test's value");
		assert.strictEqual(dequote("$body$test's value$body$"), "test's value");
		assert.strictEqual(dequote("Q'[test's value]'"), "test's value");
		assert.strictEqual(dequote("q'{test's value}'"), "test's value");
		assert.strictEqual(dequote("NQ'(test's value)'"), "test's value");
		assert.strictEqual(dequote("nq'#test's value#'"), "test's value");
	});
});
