
import {getPage} from "./fetch.js"
import {parse} from "./parser.js"
import {normalizeUrl, isSameDomain} from "./urlUtils.js"


export const crawl = async (startURL:string , options?:{maxDepth?: number}): Promise<string[]> =>
{
    const queue: {url: string; depth: number } [] = [{url :startURL, depth : 0}]; //array for queue order can loop through easily
    const visited = new Set<string>(); //set to avoid duplication
    const maxDepth = options?.maxDepth ?? Infinity; // adding optional max depth so the crawler doesn't go on forever
    //extract the base hostname 
    const urlObj = new URL(startURL).hostname; //returns the hostname
    const CONCURRENCY = 5; // add concurrency to have multiple links moving at the same time

    const worker = async () =>{

    
    while (true){
        const current = queue.shift();

        if (!current) break;
        if (current.depth > maxDepth) continue;

        if (visited.has(current.url)) continue; //checks if the current url is included in the visited set

        visited.add(current.url); // if not in set add it to it

        //try catch block
        try{
            const html = await getPage(current.url); // returns the html of page to be pushed into the parser with cheerio lib
            const rawLinks = await parse(html) //returns unediited links
            console.log("Visited:", current.url)
            console.log("Links found:");
            rawLinks.forEach(link => console.log(" -", link));

            for ( const href of rawLinks){
                const normalized = normalizeUrl(href, current.url); // the normalized links in a for loop due to array
                if (!normalized) continue; //skips if not normalized
                if(!isSameDomain(normalized, urlObj)) continue;
                if (!visited.has(normalized)) {
                    queue.push({url:normalized, depth : current.depth+1});
                }
            }

        } catch (err){
            console.error("Failed:", current.url)
        }
    }
};
const workers = [];

    for (let i = 0; i < CONCURRENCY; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);

    return Array.from(visited);
};