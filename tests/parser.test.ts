import { describe, it, expect } from "vitest";
import { parse } from "../src/parser.js";

describe("parser", () => {

    it("extracts hrefs from anchor tags", async () => {
        const html = `
            <a href="/a">A</a>
            <a href="/b">B</a>
        `;

        const result = await parse(html);

        expect(result).toEqual(["/a", "/b"]);
    });

    it("ignores missing hrefs", async () => {
        const html = `<a>A</a>`;

        const result = await parse(html);

        expect(result).toEqual([]);
    });

});