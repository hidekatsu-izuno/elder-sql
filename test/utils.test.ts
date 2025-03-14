import { describe, expect, test } from "vitest";
import { bquote, dequote, dquote, squote } from "../src/utils";

describe("test utils", () => {
	test("test squote", async () => {
		expect(squote("test")).toStrictEqual("'test'");
		expect(squote("test's value")).toStrictEqual("'test''s value'");
	});

	test("test dquote", async () => {
		expect(dquote("test")).toStrictEqual('"test"');
		expect(dquote('test"s value')).toStrictEqual('"test""s value"');
	});

	test("test bquote", async () => {
		expect(bquote("test")).toStrictEqual("`test`");
		expect(bquote("test`s value")).toStrictEqual("`test``s value`");
	});

	test("test dequote", async () => {
		expect(dequote("test")).toBe("test");
		expect(dequote("test's value")).toBe("test's value");
		expect(dequote("'test'")).toBe("test");
		expect(dequote("'test''s value'")).toBe("test's value");
		expect(dequote('"test"')).toBe("test");
		expect(dequote('"test""s value"')).toBe('test"s value');
		expect(dequote("`test`")).toBe("test");
		expect(dequote("`test``s value`")).toBe("test`s value");
		expect(dequote("N'test'")).toBe("test");
		expect(dequote("n'test''s value'")).toBe("test's value");
		expect(dequote('N"test"')).toBe("test");
		expect(dequote('n"test""s value"')).toBe('test"s value');
		expect(dequote("$$test's value$$")).toBe("test's value");
		expect(dequote("$body$test's value$body$")).toBe("test's value");
		expect(dequote("Q'[test's value]'")).toBe("test's value");
		expect(dequote("q'{test's value}'")).toBe("test's value");
		expect(dequote("NQ'(test's value)'")).toBe("test's value");
		expect(dequote("nq'#test's value#'")).toBe("test's value");
	});
});
