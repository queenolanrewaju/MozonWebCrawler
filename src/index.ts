import {crawl} from "./crawler.js"

const startURL = 'https://crawlme.monzo.com/'

const depthArg = process.argv[2];
const options = depthArg ? {maxDepth: Number(depthArg)} : undefined; 

const run = async () => {
    try {
        const visited = await crawl(startURL ,options);

        console.log("Crawling complete");
        console.log("Pages visited:", visited.length);
        console.log(visited);
    } catch (err) {
        console.error("Crawler failed:", err);
    }
};



run();