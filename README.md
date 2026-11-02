# swe-prep

A self-contained interview-prep course: coding patterns in C#, system design, and
behavioural prep, laid out as 10 chapters / 43 lessons over a 28-day schedule.

Built for a mid-level → senior software engineering job search.

## Run it

It is a static site with no build step and no dependencies.

```sh
# just open it
open index.html

# or serve it, if you prefer a real origin for localStorage
python3 -m http.server 8000
# -> http://localhost:8000
```

## Contents

| Chapter | Topic | Lessons |
| --- | --- | ---: |
| 1 | Orientation — strategy, what changed in 2026, the daily hour | 3 |
| 2 | C# interview toolkit — collections, PriorityQueue, sharp edges | 5 |
| 3 | Core patterns I — hashing, two pointers, sliding window, binary search | 5 |
| 4 | Core patterns II — trees, graphs, heaps | 5 |
| 5 | Core patterns III — intervals, stacks, backtracking, DP | 4 |
| 6 | System design foundations — the 45-min frame, components, numbers | 5 |
| 7 | Six worked designs — shortener, rate limiter, fan-out, feed, chat, scheduler | 6 |
| 8 | The new rounds — debug-this-code, AI-assisted | 2 |
| 9 | Behavioural and the senior bar | 4 |
| 10 | The 28-day schedule | 4 |

Chapters 2–5 each end with a drill list. The reading is worth very little
without them.

## Layout

```
index.html    shell: styles, routing, progress tracking
content.js    all lesson content (window.COURSE)
```

`content.js` is a single array of chapters, each with a `lessons` array of
`{ id, title, body }` where `body` is an HTML string. To add or edit a lesson,
edit that array — `index.html` needs no changes.

## Progress

Completion is kept in `localStorage` under the key `course-v1`, per browser.
Clearing site data resets it.
