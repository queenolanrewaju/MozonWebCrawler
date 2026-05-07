import { describe, it, expect } from "vitest";
import { normalizeUrl, isSameDomain } from "../src/urlUtils.js";

describe("urlUtils", () => {

    it("normalizes relative URLs", () => {
        const result = normalizeUrl("/about", "https://crawlme.monzo.com/page");
        expect(result).toBe("https://crawlme.monzo.com/about");
    });

    it("removes hash fragments", () => {
        const result = normalizeUrl("https://crawlme.monzo.com/a#section", "https://crawlme.monzo.com");
        expect(result).toBe("https://crawlme.monzo.com/a");
    });

    it("rejects mailto links", () => {
        const result = normalizeUrl("mailto:test@test.com", "https://crawlme.monzo.com");
        expect(result).toBeNull();
    });

    it("checks same domain correctly", () => {
        expect(isSameDomain("https://crawlme.monzo.com/abc", "crawlme.monzo.com")).toBe(true);
        expect(isSameDomain("https://facebook.com/atf", "crawlme.monzo.com")).toBe(false);
    });

});