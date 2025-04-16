import assert from "node:assert/strict";
import { suite, test } from "node:test";
import {
	bquote,
	compareVersion,
	dequote,
	dquote,
	squote,
} from "../src/utils.ts";

suite("test utils", () => {
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

	test("test compareVersion", async () => {
		assert.strictEqual(compareVersion("0", "1"), -1);
		assert.strictEqual(compareVersion("0.1", "1"), -1);
		assert.strictEqual(compareVersion("1.0.1-alpha.1", "1.0.1-beta"), -1);
		assert.strictEqual(compareVersion("1.0.0", "1"), 0);
		assert.strictEqual(compareVersion("1.0.0", "1+x"), 0);
		assert.strictEqual(compareVersion("1", "0"), 1);
		assert.strictEqual(compareVersion("1.0.1", "1"), 1);
		assert.strictEqual(compareVersion("1.0.1-beta.1", "1.0.1-beta"), 1);
	});
});
