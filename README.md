**Web Crawler (TypeScript)**

A simple domain-restricted web crawler built in TypeScript.
Given a starting URL, it recursively visits all pages on the same domain, extracts links, and prints visited pages.

The crawler is designed with bounded traversal, testability, and modular design in mind.

**Features**
Crawls pages within a single domain only
Prevents duplicate visits using a Set
Parses HTML using Cheerio
Supports optional maximum depth limiting
Bounded concurrency using a worker pool for faster crawling
CLI-based execution via Node.js
Clean modular architecture (crawler, parser, utilities)
Unit tested with Vitest (mocked network + deterministic logic)

**How it works**

The crawler uses a BFS (breadth-first search) approach with a bounded worker pool:

A shared queue stores URLs to visit
A visited set prevents duplicates
Multiple workers process URLs concurrently
Each worker fetches and parses pages independently
Links are normalised and filtered by domain
Valid links are added back into the shared queue
Optional depth limits control traversal depth


**Installation**
npm install

Usage
Run the crawler
npm run dev <maxDepth?>
Example
npm run dev 2
startURL → starting point for crawling
maxDepth → optional depth limit
🧪 Running tests
npm run test

Run tests once:

npm run test:run

Project structure
src/
  crawler.ts        # core BFS crawler logic
  fetch.ts          # fetch HTML pages
  parser.ts         # extract links from HTML
  urlUtils.ts       # URL normalization + domain checks
  index.ts          # CLI entry point

tests/
  crawl.test.ts
  parser.test.ts
  urlUtils.test.ts


**Testing**

The project uses Vitest with mocked dependencies:

URL utilities → pure unit tests
Parser → HTML string-based tests
Crawler → mocked fetch + parser (no real network calls)


**Tech Stack**
TypeScript
Node.js (ESM)
Cheerio (HTML parsing)
Vitest (testing)


**Design decisions**
BFS traversal ensures predictable exploration order
Visited set prevents infinite loops
Domain restriction ensures safe crawling scope
Optional depth limit allows controlled traversal
Modular design separates parsing, fetching, and crawling logic

**Concurrency Model**

The crawler uses a bounded worker pool to improve performance:

A fixed number of workers (default: 5) run concurrently
Each worker pulls URLs from a shared queue
A shared visited set ensures URLs are only processed once
Concurrency is implemented using Promise.all

This approach increases throughput while maintaining correctness and avoiding duplicate work.


**Possible improvements for scaled product**
Configurable concurrency level (currently fixed worker count)
Rate limiting / politeness delay
Retry logic for failed requests
CLI flags (--depth, --limit, --concurrency)
Output export (JSON/CSV)


**Notes**

This crawler is intentionally lightweight and designed for interview demonstration purposes rather than production-scale crawling.
Concurrency is intentionally bounded to avoid overwhelming target servers and to keep resource usage predictable.