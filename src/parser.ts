import * as cheerio from 'cheerio';

export const parse = async (html: string) => {
    const output: string[] = [];

    const $ = cheerio.load(html);
    const links = $('a');

    for (let i = 0; i < links.length; i++) {
        const href = $(links[i]).attr('href');

        // skip missing or empty hrefs
        if (!href) continue;
        if (href?.startsWith('#')) continue; //skips fragmented links ( links to sections of the page)



        output.push(href);
    }

    return output;
};