import { describe, it, expect, vi } from "vitest";

// mock dependencies BEFORE importing crawl
vi.mock("../src/fetch.js", () => ({
    getPage: vi.fn()
}));

vi.mock("../src/parser.js", () => ({
    parse: vi.fn()
}));

import { crawl } from "../src/crawler.js";
import { getPage } from "../src/fetch.js";
import { parse } from "../src/parser.js";

describe("crawl", () => {

    it("visits linked pages correctly", async () => {

        (getPage as any)
            .mockResolvedValueOnce("<html></html>")
            .mockResolvedValueOnce("<html></html>");

        (parse as any)
            .mockResolvedValueOnce(["/page1"])
            .mockResolvedValueOnce([]);

        const result = await crawl("https://crawlme.monzo.com", { maxDepth: 1 });

        expect(result.length).toBeGreaterThan(0);
    });

});