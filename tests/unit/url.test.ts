import { describe, expect, it } from "vitest";
import { safeCmsUrl } from "../../src/utils/url";

describe("url utils", () => {
  it("allows internal paths and http urls", () => {
    expect(safeCmsUrl("/privacidad", "/fallback")).toBe("/privacidad");
    expect(safeCmsUrl("https://example.com/page", "/fallback")).toBe("https://example.com/page");
  });

  it("rejects protocol-relative urls", () => {
    expect(safeCmsUrl("//evil.example", "/fallback")).toBe("/fallback");
  });
});
