[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/thejabrics-jpg/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/thejabrics-jpg/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

# makefun-x-reposts-02 — Get the most reposts and likes on make.fun's newest X posts

Entry for the make.fun bounty [Get the most reposts and likes on make.fun's newest X posts](https://make.fun/bounty/makefun-x-reposts-02) ($500, 50 places: 1st $100, 2nd $60, 3rd $30, 4th–10th $10, 11th–50th $6).

The entry is my own posts on X, all from one public account (@innless), each one a quote of a different one of make.fun's newest posts on x.com/makefunai, with make.fun or @makefunai and my play code (`makefun-tadpole-starfish-zucchini`) in each post's own words. Places go by the score — 2 points for each repost and each quote, 1 point for each like, summed over all my posts, as the house reads them at the deadline (28 Nov 2026 14:30 WIB).

## The posts

| # | make.fun's post quoted | My post |
|---|---|---|
| 1 | https://x.com/makefunai/status/2125610034209939567 | https://x.com/innless/status/2125747027690889521 |
| 2 | https://x.com/makefunai/status/2125609728088666351 | https://x.com/innless/status/2125747893550436522 |
| 3 | https://x.com/makefunai/status/2125375203744391226 | https://x.com/innless/status/2125748177043407140 |
| 4 | https://x.com/makefunai/status/2125247026728235268 | https://x.com/innless/status/2125748483386978598 |
| 5 | https://x.com/makefunai/status/2125246707512553850 | https://x.com/innless/status/2125748810332987766 |
| 6 | https://x.com/makefunai/status/2125053991293784431 | https://x.com/innless/status/2125749067317919817 |
| 7 | https://x.com/makefunai/status/2125053632605196760 | https://x.com/innless/status/2125749496303034838 |

## Files

- `main.ts` — the entry program (Node 22, standard library only). It reads `POSTS.json`, checks it names 1 to 15 X post addresses with no repeats, and writes it unchanged to the output directory, where the gate reads it. That is all it has to do.
- `POSTS.json` — my posts' addresses, as `{"posts": ["https://x.com/innless/status/<id>", ...]}`.
- `LICENSE` — MIT.

## Run

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
# out/POSTS.json is byte-identical to POSTS.json
```
