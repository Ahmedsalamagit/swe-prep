/* Interview rounds (coding round playbook) and Resources. */
window.COURSE = window.COURSE || [];
window.COURSE.push(

{ id:"cr", title:"The Coding Round", mins:30,
  sub:"How coding interviews are actually scored at large tech companies, and a minute-by-minute playbook that hits every rubric line.",
  lessons:[

  { id:"cr.1", title:"How you're graded", body:`
<p class="l-lede">Across Google, Amazon, Meta, Microsoft and most companies that copy them, coding rounds are scored on roughly the same four dimensions. A correct solution delivered silently can still be a "no hire".</p>

<div class="tbl"><table>
<tr><th>Dimension</th><th>Strong signal</th><th>Weak signal</th></tr>
<tr><td><b>Communication</b></td><td>Clarifies, explains approach and trade-offs before coding, narrates while coding</td><td>Jumps into code; interviewer has to ask what you're doing</td></tr>
<tr><td><b>Problem solving</b></td><td>Finds an approach, analyses complexity, improves it, compares alternatives</td><td>Needs heavy hints; can't state complexity</td></tr>
<tr><td><b>Technical competency</b></td><td>Fast, clean, idiomatic code; few syntax errors; good names</td><td>Fights the language; long pauses over APIs</td></tr>
<tr><td><b>Testing</b></td><td>Walks through examples, finds own bugs, covers edge cases unprompted</td><td>Declares "done" without tracing; interviewer finds the bug</td></tr>
</table></div>

<p>Interviewers usually score each dimension and write evidence for it — specific things you said or did. Your job is to <b>give them quotable evidence</b> for all four. Say the trade-off out loud. Say the complexity. Say which edge case you're checking.</p>

<h3>What changes for Senior</h3>
<p>The same problems, but the bar on <em>independence</em> rises. Mid-level candidates are allowed a nudge; senior candidates are expected to drive — choose the approach, justify it, notice their own bugs, and discuss production concerns (input validation, scale, testing strategy) without being asked.</p>

<div class="callout">
  <span class="tag">Hints aren't fatal</span>
  <p>Taking a hint well — acknowledging it, integrating it, moving faster — is itself a positive signal. Ignoring a hint, or arguing with it, is what hurts.</p>
</div>
` },

  { id:"cr.2", title:"The 45-minute playbook", body:`
<p class="l-lede">One fixed sequence, practised until it's automatic. Under pressure you won't remember advice — you'll remember habits.</p>

<ol class="steps">
  <li><b>Restate and clarify</b> <span class="t">2–4 min</span>Input size and range, sorted?, duplicates?, negative values?, empty input?, return format, can I mutate the input? Write the answers as comments.</li>
  <li><b>Work an example by hand</b> <span class="t">2–3 min</span>Use your own, slightly non-trivial example. This is where you find the pattern — and where you catch misunderstanding early.</li>
  <li><b>State the brute force + complexity</b> <span class="t">1–2 min</span>Even if obvious. It proves you understand the problem and gives a fallback.</li>
  <li><b>Optimise out loud</b> <span class="t">5–8 min</span>"The bottleneck is the inner search — a hash map makes it O(1)." Use the constraints table from the Complexity topic. Agree the approach with the interviewer before coding.</li>
  <li><b>Code</b> <span class="t">12–18 min</span>Top-down: write the main function with helper calls, then fill helpers. Good names. Narrate decisions, not keystrokes.</li>
  <li><b>Test</b> <span class="t">5 min</span>Trace your example through the <em>code</em> (not your intent), line by line with variable values. Then edge cases.</li>
  <li><b>Complexity and follow-ups</b> <span class="t">2–3 min</span>Final time and space. Offer an improvement or the trade-off you chose.</li>
</ol>

<h3>Edge-case checklist</h3>
<div class="tbl"><table>
<tr><th>Input type</th><th>Check</th></tr>
<tr><td>Array</td><td>Empty, one element, two elements, all same, already sorted, reverse sorted, negatives, duplicates</td></tr>
<tr><td>String</td><td>Empty, one char, all same char, spaces, case, non-ASCII</td></tr>
<tr><td>Numbers</td><td>0, negative, int max/min (overflow), division by zero</td></tr>
<tr><td>Linked list</td><td>Null head, one node, two nodes, cycle</td></tr>
<tr><td>Tree</td><td>Null root, one node, skewed (depth n), duplicates</td></tr>
<tr><td>Graph</td><td>Disconnected, cycles, self-loops, single node</td></tr>
<tr><td>Intervals</td><td>Touching endpoints, fully nested, unsorted input</td></tr>
</table></div>

<h3>When you're stuck</h3>
<ul class="clean">
  <li>Go back to a small example and solve it by hand — what did your brain just do?</li>
  <li>Walk the data structures: would a hash map, heap, stack, sorted order or prefix sum help?</li>
  <li>Simplify: solve it for a sorted input, or for k = 1, then generalise.</li>
  <li>Say what you're thinking. Interviewers can't hint into silence.</li>
</ul>

<div class="callout gold">
  <span class="tag">If you're cutting a corner, say so</span>
  <p>"In production I'd validate this input and use a proper parser; for time I'll assume it's well formed." That sentence turns a shortcut into a signal of judgement.</p>
</div>
` }
  ]
},

{ id:"res", title:"The Resource Library", mins:15,
  sub:"The open-source repos this site draws on, what each is best for, and when in your prep to use it.",
  lessons:[

  { id:"res.1", title:"The repos, and when to use each", body:`
<p class="l-lede">This site is a condensed path through these repos. Use them to go deeper on a topic, not as a second curriculum running in parallel.</p>

<h3>Coding</h3>
<div class="tbl"><table>
<tr><th>Repo</th><th>Best for</th><th>Use it when</th></tr>
<tr><td><a href="https://github.com/yangshun/tech-interview-handbook" target="_blank" rel="noopener">yangshun/tech-interview-handbook</a></td><td>Grind 75 list, per-topic cheatsheets, rubrics, behavioural, negotiation</td><td>Your problem list. Its rubric informed "How you're graded".</td></tr>
<tr><td><a href="https://github.com/jwasham/coding-interview-university" target="_blank" rel="noopener">jwasham/coding-interview-university</a></td><td>Full CS curriculum with videos</td><td>Patching a specific gap (e.g. you've forgotten how a heap sifts). Don't do it end to end.</td></tr>
<tr><td><a href="https://github.com/neetcode-gh/leetcode" target="_blank" rel="noopener">neetcode-gh/leetcode</a></td><td>NeetCode 150 solutions in many languages, including C#</td><td>After you've attempted a problem; pair with the free videos.</td></tr>
<tr><td><a href="https://github.com/doocs/leetcode" target="_blank" rel="noopener">doocs/leetcode</a></td><td>Solutions to almost every problem in many languages</td><td>Seeing an idiomatic C# (or other language) version.</td></tr>
</table></div>

<h3>System design</h3>
<div class="tbl"><table>
<tr><th>Repo</th><th>Best for</th><th>Use it when</th></tr>
<tr><td><a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noopener">donnemartin/system-design-primer</a></td><td>Fundamentals: CAP, caching, replication, sharding, queues, latency numbers</td><td>Source for most of the Scaling topic. Its Anki decks are good for spaced review.</td></tr>
<tr><td><a href="https://github.com/ByteByteGoHq/system-design-101" target="_blank" rel="noopener">ByteByteGoHq/system-design-101</a></td><td>One-page visual explainers on modern topics</td><td>Quick review before an interview; filling a gap in 5 minutes.</td></tr>
<tr><td><a href="https://github.com/ashishps1/awesome-system-design-resources" target="_blank" rel="noopener">ashishps1/awesome-system-design-resources</a></td><td>Curated concept articles and interview problems</td><td>Finding a good write-up on a specific concept.</td></tr>
<tr><td><a href="https://github.com/binhnguyennus/awesome-scalability" target="_blank" rel="noopener">binhnguyennus/awesome-scalability</a></td><td>Real engineering blog posts grouped by scalability, availability, stability</td><td>Senior depth: concrete examples to cite. Read posts from your target companies.</td></tr>
<tr><td><a href="https://github.com/ashishps1/awesome-low-level-design" target="_blank" rel="noopener">ashishps1/awesome-low-level-design</a></td><td>OOP, SOLID, design patterns, concurrency, LLD problems with solutions</td><td>LLD round prep; source of the Low-Level Design topic's problem list.</td></tr>
</table></div>

<h3>Behavioural</h3>
<div class="tbl"><table>
<tr><th>Repo</th><th>Best for</th><th>Use it when</th></tr>
<tr><td><a href="https://github.com/ashishps1/awesome-behavioral-interviews" target="_blank" rel="noopener">ashishps1/awesome-behavioral-interviews</a></td><td>STAR framework, common questions, company-specific values</td><td>Mapping your eight stories onto each company's values (Amazon leadership principles, etc.).</td></tr>
</table></div>

<h3>Suggested order</h3>
<ol class="steps">
  <li><b>Weeks 1–3:</b> this site's Basics and Patterns topics + Grind 75 in C#. Check your solution against NeetCode/doocs only after attempting.</li>
  <li><b>Weeks 2–4:</b> Scaling + Worked Designs here; system-design-primer for depth; ByteByteGo for review.</li>
  <li><b>Week 4:</b> Low-Level Design if your targets run an OOD round; behavioural stories; awesome-scalability posts for your target companies.</li>
  <li><b>Interview week:</b> the Side-by-Side traps table for your language, the coding playbook, and re-solves.</li>
</ol>
` }
  ]
}

);
