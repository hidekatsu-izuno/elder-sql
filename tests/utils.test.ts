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
		assert.equal(squote("test"), "'test'");
		assert.equal(squote("test's value"), "'test''s value'");
	});

	test("test dquote", async () => {
		assert.equal(dquote("test"), '"test"');
		assert.equal(dquote('test"s value'), '"test""s value"');
	});

	test("test bquote", async () => {
		assert.equal(bquote("test"), "`test`");
		assert.equal(bquote("test`s value"), "`test``s value`");
	});

	test("test dequote", async () => {
		assert.equal(dequote("test"), "test");
		assert.equal(dequote("test's value"), "test's value");
		assert.equal(dequote("'test'"), "test");
		assert.equal(dequote("'test''s value'"), "test's value");
		assert.equal(dequote('"test"'), "test");
		assert.equal(dequote('"test""s value"'), 'test"s value');
		assert.equal(dequote("`test`"), "test");
		assert.equal(dequote("`test``s value`"), "test`s value");
		assert.equal(dequote("N'test'"), "test");
		assert.equal(dequote("n'test''s value'"), "test's value");
		assert.equal(dequote('N"test"'), "test");
		assert.equal(dequote('n"test""s value"'), 'test"s value');
		assert.equal(dequote("$$test's value$$"), "test's value");
		assert.equal(dequote("$body$test's value$body$"), "test's value");
		assert.equal(dequote("Q'[test's value]'"), "test's value");
		assert.equal(dequote("q'{test's value}'"), "test's value");
		assert.equal(dequote("NQ'(test's value)'"), "test's value");
		assert.equal(dequote("nq'#test's value#'"), "test's value");
	});

	test("test compareVersion", async () => {
		assert.equal(compareVersion("0", "1"), -1);
		assert.equal(compareVersion("0.1", "1"), -1);
		assert.equal(compareVersion("1.0.1-alpha.1", "1.0.1-beta"), -1);
		assert.equal(compareVersion("1.0.0", "1"), 0);
		assert.equal(compareVersion("1.0.0", "1+x"), 0);
		assert.equal(compareVersion("1", "0"), 1);
		assert.equal(compareVersion("1.0.1", "1"), 1);
		assert.equal(compareVersion("1.0.1-beta.1", "1.0.1-beta"), 1);
	});
});
