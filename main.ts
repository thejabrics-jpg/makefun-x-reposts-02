// Entry program for the make.fun bounty "Get the most reposts and likes on
// make.fun's newest X posts" (makefun-x-reposts-02).
//
// The entry is the posts themselves: posts of my own on X, all from one public
// account, each quoting or replying directly to a different one of make.fun's
// newest posts on x.com/makefunai, make.fun or @makefunai and my play code in
// each one's own words. POSTS.json at the repository root names them, and the
// house reads their reposts, quotes and likes from X.
//
// This program reads POSTS.json, checks it is a list of 1 to 15 X post
// addresses (each one named once), and writes it unchanged to
// /output/POSTS.json, where the gate reads it. That is all it has to do.
// Node 22, standard library only.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The address forms the gate reads: https://x.com/<handle>/status/<id> (or
// the same on twitter.com, with an optional www. or mobile. prefix, or
// /i/web/status/<id>), with an optional query or fragment after it.
const POST_URL =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/(?:[^/\s]+\/status\/\d+|i\/web\/status\/\d+)(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`POSTS.json invalid: ${message}`);
  process.exit(1);
}

let raw: string;
try {
  raw = readFileSync(join(BOT_DIR, "POSTS.json"), "utf8");
} catch (err) {
  fail(`could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

let posts: unknown;
try {
  posts = JSON.parse(raw).posts;
} catch (err) {
  fail(`is not valid JSON: ${(err as Error).message}`);
}

if (!Array.isArray(posts)) fail(`"posts" must be a list of post addresses`);
if (posts.length < 1 || posts.length > 15) {
  fail(`names ${posts.length} posts, expected 1 to 15`);
}
const seen = new Set<string>();
for (const address of posts) {
  if (typeof address !== "string" || !POST_URL.test(address)) {
    fail(`not an X post address: ${JSON.stringify(address)}`);
  }
  const id = address.match(/\/status\/(\d+)/)?.[1];
  if (id && seen.has(id)) fail(`post ${id} is named twice`);
  if (id) seen.add(id);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, "POSTS.json");
writeFileSync(outPath, raw);
// Read it back: the gate reads this file, so a partial write must fail loudly
// here instead of shipping a truncated POSTS.json.
if (readFileSync(outPath, "utf8") !== raw) {
  fail(`wrote ${outPath} but its bytes do not match POSTS.json`);
}
console.log(`Wrote ${posts.length} post(s) to ${outPath}`);
