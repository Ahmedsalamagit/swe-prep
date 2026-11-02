# swe-prep

A self-contained interview-prep site organised **by subject**: Basics (complexity,
data structures), Coding Patterns, System Design (foundations, scaling, worked
designs, low-level design), Languages (C#, Python, Java, JavaScript, SQL, plus
side-by-side comparisons), Interview Rounds, and Resources. 23 topics / 90 lessons,
with a 28-day plan in "Start here".

Built for a mid-level → senior software engineering job search. Content draws on
tech-interview-handbook, system-design-primer, system-design-101,
awesome-scalability, awesome-low-level-design and awesome-behavioral-interviews.

## Run it

It is a static site with no build step and no dependencies.

```sh
# just open it
open index.html

# or serve it, if you prefer a real origin for localStorage
python3 -m http.server 8000
# -> http://localhost:8000
```

## Layout

```
index.html          shell: styles, subject/topic/lesson routing, progress tracking
subjects.js         window.SUBJECTS — which topics belong to which subject, in order
content.js          original topics (orientation, C#, patterns I–III, design, rounds, schedule)
content-basics.js   complexity, data structures, recursion/sorting/bits, patterns IV
content-design.js   scaling, low-level design
content-lang.js     side-by-side comparison, Python, Java, JavaScript, SQL
content-rounds.js   coding-round playbook, resource library
```

Each content file pushes topics `{ id, title, sub, mins, lessons:[{ id, title, body }] }`
onto `window.COURSE`. To add a topic, push it from any content file and list its id
in `subjects.js`. Code blocks wrapped in `<div class="ltabs">` with one
`<pre data-lang="…">` per language become tabs; the chosen language is remembered.

## Progress

Completion is kept in `localStorage` under the key `course-v1`, per browser.
Clearing site data resets it.
