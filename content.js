window.COURSE = [

/* ================= CH 1 ================= */
{ id:1, title:"Orientation", mins:20,
  sub:"Why this course is built the way it is, what changed in interviews since you last did this, and how to spend your daily hour.",
  lessons:[

  { id:"1.1", title:"Patterns, not volume", body:`
<p class="l-lede">Four weeks is not enough time to grind three hundred problems. It is enough time to rebuild pattern recognition, and pattern recognition is what actually gets tested.</p>

<p>Interview questions are not memorised, they are <em>recognised</em>. A strong candidate hears a problem and within ninety seconds thinks "this is a variable sliding window with a frequency map." The mapping from problem-shape to technique is the whole skill. Volume grinding builds it slowly and by accident. Deliberate pattern study builds it fast and on purpose.</p>

<p>So this course optimises three things and deliberately sacrifices everything else.</p>

<ul class="clean">
  <li><b>Pattern coverage over problem count.</b> Twelve patterns cover the large majority of what gets asked. You will do about 62 problems, each chosen because it is the cleanest representative of its pattern — not because a list said so.</li>
  <li><b>Spaced repetition over fresh problems.</b> Re-solving something you saw three days ago is worth more than a new problem. The 28-Day Schedule opens every weekend block with re-solves. Skip that and you will feel productive and retain nothing.</li>
  <li><b>Out loud, always.</b> You are not graded on the solution, you are graded on the narration. Silent solving trains the wrong muscle entirely. From day one, talk through every problem as if someone is listening — because in four weeks someone will be.</li>
</ul>

<h3>What this course deliberately cuts</h3>
<p>Hard dynamic programming, advanced graph algorithms (max flow, Bellman-Ford, A*), segment trees, string algorithms like KMP, and bit-manipulation puzzles. Low frequency, high cost. If the 28-Day Schedule's week four leaves you room, they are the stretch. They are not in the critical path and chasing them is the most common way a four-week plan collapses.</p>

<div class="callout">
  <span class="tag">The honest risk</span>
  <p>The failure mode here is not the schedule — it is reading solutions instead of producing them. If you look at an answer, close it, wait an hour, and write the code from scratch. A problem you read is a problem you have not done.</p>
</div>
` },

  { id:"1.2", title:"What changed in 2026", body:`
<p class="l-lede">The loop you remember from four years ago is not the loop you are walking into. Three of the four changes work in your favour.</p>

<h3>Debug-this-code rounds</h3>
<p>You are handed working-ish broken code and asked to find and fix the defect while explaining your reasoning. These exist specifically because they are hard to fake with an AI assistant. They reward exactly what four years of production work taught you: read the test first, form a hypothesis, bisect, verify. This is likely your strongest round. The New Rounds covers how to practise it on purpose rather than assuming it comes free.</p>

<h3>AI-assisted rounds</h3>
<p>Some companies now hand you an AI tool during the round deliberately. They are grading judgement, not generation — whether you verify output, catch a subtly wrong suggestion, and can articulate why you rejected one. Take-homes increasingly assume AI use and then require a live defence of every choice.</p>

<h3>System design moved down-level</h3>
<p>Design rounds now appear in mid-level and even new-grad loops, not just senior ones. That is a shift toward what you have genuinely lived — Cosmos DB partitioning, Service Fabric, a real multi-region notification system — and away from puzzle recall. Do not treat design as optional because you are applying at SWE II.</p>

<h3>Tighter bar, more rounds</h3>
<p>More evaluation stages, less tolerance for a vague answer, onsites back for final stages at large companies. The practical consequence: a half-explained correct answer now scores below a fully-explained one. Narration is not a soft skill in this market, it is the scoring surface.</p>

<div class="callout gold">
  <span class="tag">Read this twice</span>
  <p>Three of those four shifts reward production experience over puzzle-grinding, and you have four years of it across three products. The course leans on that deliberately — particularly in system design, where Azure Service Health is very close to the canonical "design a notification and fan-out system" question, and Cosmos DB gives you concrete, non-hand-wavy answers on partitioning and consistency that most candidates cannot produce.</p>
</div>
` },

  { id:"1.3", title:"Your daily hour", body:`
<p class="l-lede">One hour on a weekday, longer on weekends. The structure of the hour matters more than the length of it.</p>

<ol class="steps">
  <li><span class="t">10 min</span><b>Recall first, notes second</b>Before opening anything, write down yesterday's pattern from memory: the trigger, the template, the complexity. <em>Then</em> check your notes and see what you missed. This retrieval step is where retention actually happens — reading your notes first feels better and does almost nothing.</li>
  <li><span class="t">35 min</span><b>Two problems, timed, narrated</b>Twenty minutes hard cap on the first. If you are stuck at twenty, read the <em>approach</em> only — never the code — then implement it yourself.</li>
  <li><span class="t">15 min</span><b>The one-line log</b>One line per problem: <em>problem → pattern → the single insight that unlocked it.</em> Nothing else.</li>
</ol>

<h3>The one-line log is the most valuable thing you will produce</h3>
<p>By week four you will have around sixty lines. That document is your entire revision material for the final week, and it is better than any notes you could write up front, because every line is something <em>you</em> got stuck on. Keep it in one file, plain text, newest at the bottom.</p>

<p>An example of a good line:</p>
<pre><code>Koko Eating Bananas -> binary search on ANSWER space
  trigger: "minimise the maximum" + a monotonic feasibility check</code></pre>

<p>An example of a useless line:</p>
<pre><code>Koko Eating Bananas -> binary search, medium, took 25 min</code></pre>

<div class="callout">
  <span class="tag">Narration, from today</span>
  <p>Talk through every single problem out loud, even alone, even the easy ones. Say the approach before you type. Say the complexity when you finish. It will feel absurd for about three days and then it will feel normal — and the alternative is discovering in a real interview that you have never once said this out loud.</p>
</div>
` }
]},

/* ================= CH 2 ================= */
{ id:2, title:"C# — Your Interview Toolkit", mins:50,
  sub:"C# is a fine interview language and you should not switch. But it has specific sharp edges that cost people real points, and features that make you look deliberate.",
  lessons:[

  { id:"2.1", title:"Collections and what they cost", body:`
<p class="l-lede">You will reach for five of these constantly. Knowing the cost of each operation, out loud, is free credibility.</p>

<div class="tbl"><table>
<thead><tr><th>Type</th><th>Use it for</th><th class="nc">Cost</th></tr></thead>
<tbody>
<tr><td><code>Dictionary&lt;K,V&gt;</code></td><td>Frequency maps, memo tables, index lookups</td><td class="nc">O(1) avg</td></tr>
<tr><td><code>HashSet&lt;T&gt;</code></td><td>Seen-sets, dedup, membership</td><td class="nc">O(1) avg</td></tr>
<tr><td><code>List&lt;T&gt;</code></td><td>Dynamic array, accumulating results</td><td class="nc">O(1) add amortised</td></tr>
<tr><td><code>Queue&lt;T&gt;</code></td><td>BFS</td><td class="nc">O(1)</td></tr>
<tr><td><code>Stack&lt;T&gt;</code></td><td>Iterative DFS, monotonic stack, parsing</td><td class="nc">O(1)</td></tr>
<tr><td><code>LinkedList&lt;T&gt;</code></td><td>LRU cache</td><td class="nc">O(1) splice</td></tr>
<tr><td><code>PriorityQueue&lt;E,P&gt;</code></td><td>Top-K, Dijkstra, merge-K</td><td class="nc">O(log n)</td></tr>
<tr><td><code>SortedSet&lt;T&gt;</code></td><td>Ordered set, range queries</td><td class="nc">O(log n)</td></tr>
<tr><td><code>SortedDictionary&lt;K,V&gt;</code></td><td>Ordered map (red-black tree)</td><td class="nc">O(log n)</td></tr>
</tbody></table></div>

<h3>The four gotchas in that table</h3>
<ul class="clean">
  <li><b>Use <code>TryGetValue</code>, not <code>ContainsKey</code> then index.</b> The second form does two hash lookups. Interviewers who write C# notice.</li>
  <li><b><code>List&lt;T&gt;.Insert(0, x)</code> and <code>Remove</code> are O(n).</b> People treat <code>List</code> as a general-purpose container and quietly turn an O(n) algorithm into O(n²).</li>
  <li><b><code>SortedList</code> is not <code>SortedDictionary</code>.</b> <code>SortedList</code> is array-backed: O(n) insert, O(log n) lookup, less memory. <code>SortedDictionary</code> is a tree: O(log n) everywhere. If you say the wrong one, you will be asked.</li>
  <li><b><code>SortedSet&lt;T&gt;.GetViewBetween(lo, hi)</code></b> is the underused one — it gives you an efficient range view, which turns several "find the closest value seen so far" problems into three lines.</li>
</ul>

<h3>The LRU cache trick, since it comes up</h3>
<p>The whole problem is combining two structures: a <code>Dictionary</code> from key to <code>LinkedListNode</code>, and a <code>LinkedList</code> holding the recency order. The dictionary gives O(1) lookup; holding the <em>node reference</em> rather than the value gives you O(1) splice-to-front. Say that sentence and you have essentially solved it.</p>
` },

  { id:"2.2", title:"PriorityQueue — the trap", body:`
<p class="l-lede">This is the single most common way a C# candidate loses a heap problem. Two facts, both non-obvious, both with standard workarounds.</p>

<p><code>PriorityQueue&lt;TElement,TPriority&gt;</code> arrived in .NET 6. It is a <strong>min-heap</strong>, and there is <strong>no way to update an element's priority</strong> once enqueued.</p>

<pre><code><span class="c">// Min-heap by default: lowest priority value comes out first</span>
<span class="k">var</span> pq = <span class="k">new</span> PriorityQueue&lt;<span class="k">string</span>, <span class="k">int</span>&gt;();
pq.Enqueue(<span class="s">"task"</span>, priority: 3);
<span class="k">if</span> (pq.TryDequeue(<span class="k">out var</span> item, <span class="k">out var</span> pri)) { <span class="c">/* ... */</span> }

<span class="c">// Max-heap, option A: negate the priority</span>
pq.Enqueue(item, -value);

<span class="c">// Max-heap, option B: a reversed comparer. Clearer — say this one out loud.</span>
<span class="k">var</span> maxHeap = <span class="k">new</span> PriorityQueue&lt;<span class="k">int</span>, <span class="k">int</span>&gt;(
    Comparer&lt;<span class="k">int</span>&gt;.Create((a, b) =&gt; b.CompareTo(a)));</code></pre>

<h3>No decrease-key, so Dijkstra needs lazy deletion</h3>
<p>The textbook Dijkstra lowers a node's key when it finds a shorter path. You cannot do that here. Instead you push a duplicate entry and discard stale ones as they surface:</p>

<pre><code><span class="k">while</span> (pq.TryDequeue(<span class="k">out var</span> node, <span class="k">out var</span> d)) {
    <span class="k">if</span> (d &gt; dist[node]) <span class="k">continue</span>;      <span class="c">// stale — already improved, skip it</span>
    <span class="k">foreach</span> (<span class="k">var</span> (next, w) <span class="k">in</span> adj[node]) {
        <span class="k">if</span> (d + w &lt; dist[next]) {
            dist[next] = d + w;
            pq.Enqueue(next, d + w);    <span class="c">// duplicate entry, not an update</span>
        }
    }
}</code></pre>

<p>The heap can hold more entries than there are nodes, which is fine — it is bounded by the edge count, so the complexity is still O(E log E).</p>

<div class="callout good">
  <span class="tag">Say this in the room</span>
  <p>"C#'s PriorityQueue has no decrease-key, so I'll push duplicates and skip stale entries when they pop." It takes four seconds, it is genuinely true, and it signals that you have used the type rather than recited it.</p>
</div>

<h3>One more, if you build from an array</h3>
<p>Constructing a <code>PriorityQueue</code> from an existing collection heapifies in O(n), not O(n log n). Worth a sentence if you are seeding a heap with the whole input.</p>
` },

  { id:"2.3", title:"Sharp edges worth memorising", body:`
<p class="l-lede">Six things that are silently wrong until they are loudly wrong. Each costs one line to avoid.</p>

<ul class="clean">
  <li><b>Sorting is not stable.</b> <code>Array.Sort</code> and <code>List&lt;T&gt;.Sort</code> use introsort and are <em>unstable</em>. LINQ's <code>OrderBy</code> <em>is</em> stable. If equal elements must keep their original order, you must use <code>OrderBy</code> or sort on a composite key. This quietly breaks tie-ordering problems.</li>
  <li><b>Integer overflow in binary search.</b> Write <code>int mid = lo + (hi - lo) / 2;</code>, never <code>(lo + hi) / 2</code>. Use <code>long</code> for accumulated sums — this bites on prefix-sum problems with large inputs.</li>
  <li><b>String concatenation in a loop is O(n²).</b> Strings are immutable; every <code>+=</code> allocates a new one. Use <code>StringBuilder</code>. Every time.</li>
  <li><b>Substring allocates.</b> <code>s.Substring(i, len)</code> copies; <code>s.AsSpan(i, len)</code> does not. Reaching for <code>ReadOnlySpan&lt;char&gt;</code> on a string-heavy problem is a nice depth signal — but only if you are fluent. Do not fumble it live.</li>
  <li><b>Recursion depth is real.</b> The default stack is about 1 MB, roughly 10,000 frames. A DFS on a 10⁵-node degenerate tree or linked list will <em>stack overflow and kill the process</em> — a <code>StackOverflowException</code> cannot be caught in .NET. Say "I'd convert this to an explicit stack for deep inputs" and you have pre-empted the follow-up.</li>
  <li><b>Digit conversion.</b> <code>s[i] - '0'</code>, not <code>int.Parse(s[i].ToString())</code>, inside any hot loop.</li>
</ul>

<h3>Two array shapes, and they are not interchangeable</h3>
<pre><code><span class="k">int</span>[,]  rect;    <span class="c">// rectangular. rect.GetLength(0), rect.GetLength(1)</span>
<span class="k">int</span>[][] jag;     <span class="c">// jagged: array of arrays. jag.Length, jag[r].Length</span></code></pre>
<p>Rows in a jagged array can differ in length, and it indexes faster because each row is a normal single-dimension array. Most interview-platform inputs are jagged. Know which one you were handed before you write <code>GetLength</code> and get a compile error on the clock.</p>

<h3>On LINQ</h3>
<p>It is readable and perfectly acceptable in an interview. It also allocates enumerators and closures, and a manual loop is meaningfully faster. If the interviewer asks about performance, say so plainly rather than defending it — knowing the cost of your own idioms is the signal.</p>
` },

  { id:"2.4", title:"Idioms that read as fluent", body:`
<p class="l-lede">Small things that make the code look like it was written by someone who writes C# every day. Which you are.</p>

<pre><code><span class="c">// Frequency map in one line</span>
<span class="k">var</span> freq = <span class="k">new</span> Dictionary&lt;<span class="k">char</span>, <span class="k">int</span>&gt;();
<span class="k">foreach</span> (<span class="k">var</span> c <span class="k">in</span> s) freq[c] = freq.GetValueOrDefault(c) + 1;</code></pre>

<pre><code><span class="c">// Single-lookup increment for hot paths</span>
<span class="c">// using System.Runtime.InteropServices;</span>
<span class="k">ref int</span> n = <span class="k">ref</span> CollectionsMarshal.GetValueRefOrAddDefault(freq, c, <span class="k">out</span> _);
n++;</code></pre>

<pre><code><span class="c">// Value tuples as composite keys — they hash structurally,</span>
<span class="c">// so no custom GetHashCode needed</span>
<span class="k">var</span> visited = <span class="k">new</span> HashSet&lt;(<span class="k">int</span> r, <span class="k">int</span> c)&gt;();
visited.Add((row, col));</code></pre>

<pre><code><span class="c">// Custom sort with a lambda comparison</span>
intervals.Sort((a, b) =&gt; a[0].CompareTo(b[0]));</code></pre>

<pre><code><span class="c">// Grid neighbours without four copy-pasted blocks</span>
<span class="k">int</span>[] d = { -1, 0, 1, 0, -1 };
<span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; 4; i++) {
    <span class="k">int</span> nr = r + d[i], nc = c + d[i + 1];
    <span class="k">if</span> (nr &lt; 0 || nc &lt; 0 || nr &gt;= rows || nc &gt;= cols) <span class="k">continue</span>;
    <span class="c">// ...</span>
}</code></pre>

<p>That last one is worth internalising. The four-direction walk appears in every grid problem, and writing it as four near-identical blocks wastes ninety seconds and introduces a typo roughly a third of the time.</p>

<div class="callout">
  <span class="tag">A note on style under pressure</span>
  <p>Do not optimise for cleverness. <code>GetValueRefOrAddDefault</code> is a nice flourish when you are relaxed and a liability when you are not. The tuple-key <code>HashSet</code> and the direction array are the two worth making automatic; everything else here is a bonus.</p>
</div>
` },

  { id:"2.5", title:"Quick check", body:`
<p class="l-lede">Answer these out loud before reading on. If you miss more than two, reread the chapter before starting Patterns I.</p>

<ol class="steps">
  <li><b>You need the three largest elements from a stream of ten million. What structure, what size, and why that direction?</b></li>
  <li><b>Your sort keeps scrambling the order of equal elements. What is happening and what is the fix?</b></li>
  <li><b>You are doing DFS on a linked list of 200,000 nodes. What goes wrong and what do you do instead?</b></li>
  <li><b>Write the binary search midpoint line.</b></li>
  <li><b>You need a set of visited (row, col) pairs. What do you declare?</b></li>
  <li><b>You are implementing Dijkstra in C#. What does the standard algorithm want that the language does not give you, and what do you do about it?</b></li>
</ol>

<h3>Answers</h3>
<div class="tbl"><table>
<tbody>
<tr><td class="nc">1</td><td>A <strong>min-heap of size 3</strong>. Counter-intuitive but correct: the smallest of your current top-3 sits at the root, so you can evict it in O(log k) when something bigger arrives. O(n log k) rather than O(n log n).</td></tr>
<tr><td class="nc">2</td><td><code>List.Sort</code> and <code>Array.Sort</code> are <strong>unstable</strong>. Use <code>OrderBy</code>, which is stable, or sort on a composite key that includes the original index.</td></tr>
<tr><td class="nc">3</td><td>Stack overflow — about 1 MB of stack, roughly 10,000 frames, and it <strong>cannot be caught</strong>. Convert to an iterative loop with an explicit <code>Stack&lt;T&gt;</code>.</td></tr>
<tr><td class="nc">4</td><td><code>int mid = lo + (hi - lo) / 2;</code></td></tr>
<tr><td class="nc">5</td><td><code>var seen = new HashSet&lt;(int, int)&gt;();</code> — value tuples hash structurally.</td></tr>
<tr><td class="nc">6</td><td><strong>Decrease-key.</strong> <code>PriorityQueue</code> has no way to update a priority, so you push duplicate entries and skip stale ones on pop by checking <code>if (d &gt; dist[node]) continue;</code>.</td></tr>
</tbody></table></div>
` }
]},

/* ================= CH 3 ================= */
{ id:3, title:"Core Patterns I — Arrays & Strings", mins:75,
  sub:"The four highest-frequency patterns in the entire interview, plus the drill set that makes them automatic.",
  lessons:[

  { id:"3.1", title:"Hash map & frequency", body:`
<p class="l-lede">The default first thought on almost any array or string problem: can I trade space for time?</p>

<h4>Recognition trigger</h4>
<p>"Have I seen this before?" · "how many times" · anagram · duplicate · "find the pair that…"</p>

<h3>The complement trick</h3>
<p>The insight that makes Two Sum O(n) generalises widely: as you walk the array, store <em>what you would need</em> rather than what you have. Then each element is a single lookup against everything before it.</p>
<pre><code><span class="k">var</span> need = <span class="k">new</span> Dictionary&lt;<span class="k">int</span>, <span class="k">int</span>&gt;();   <span class="c">// value -> index</span>
<span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; nums.Length; i++) {
    <span class="k">if</span> (need.TryGetValue(nums[i], <span class="k">out int</span> j)) <span class="k">return new</span>[] { j, i };
    need[target - nums[i]] = i;           <span class="c">// store the complement</span>
}</code></pre>

<h3>Anagram keys</h3>
<p>Two ways to make a canonical key for a group of anagrams: sort the string (O(k log k) per word), or build a 26-integer count array and use it as the key (O(k)). Mention both, pick the count array if the strings are long, and say why.</p>

<h3>The one that looks harder than it is</h3>
<p><em>Longest Consecutive Sequence</em> feels like it needs sorting. It does not. Put everything in a <code>HashSet</code>, then for each value only start counting upward if <code>value - 1</code> is absent — that makes each run get walked exactly once, giving O(n). If you can explain why that check is what makes it linear, you have understood the problem.</p>

<div class="drill">
  <span class="tag">Drill — do these today</span>
  <ol>
    <li>Two Sum <em>— the complement trick</em></li>
    <li>Contains Duplicate <em>— warm-up</em></li>
    <li>Valid Anagram <em>— both key strategies</em></li>
    <li>Group Anagrams <em>— canonical keys at scale</em></li>
    <li>Longest Consecutive Sequence <em>— the linearity argument</em></li>
  </ol>
</div>
` },

  { id:"3.2", title:"Two pointers", body:`
<p class="l-lede">If the input is sorted and you reached for a hash map, stop and reconsider. That instinct is worth a lot of points.</p>

<h4>Recognition trigger</h4>
<p>Sorted array · pair-finding · palindrome · in-place removal · "without extra space"</p>

<h3>Two shapes, and they solve different things</h3>

<h4>Opposite ends, converging</h4>
<p>Start at both ends, move the pointer that can improve the answer. Works because sortedness tells you which direction helps.</p>
<pre><code><span class="k">int</span> lo = 0, hi = a.Length - 1;
<span class="k">while</span> (lo &lt; hi) {
    <span class="k">int</span> sum = a[lo] + a[hi];
    <span class="k">if</span> (sum == target) <span class="k">return</span> (lo, hi);
    <span class="k">if</span> (sum &lt; target) lo++; <span class="k">else</span> hi--;
}</code></pre>

<h4>Same direction, slow and fast</h4>
<p>One pointer reads, one writes. This is how you do in-place compaction, deduplication, and cycle detection in a linked list.</p>
<pre><code><span class="k">int</span> write = 0;
<span class="k">for</span> (<span class="k">int</span> read = 0; read &lt; a.Length; read++)
    <span class="k">if</span> (keep(a[read])) a[write++] = a[read];
<span class="c">// everything before 'write' is the compacted result</span></code></pre>

<h3>3Sum is Two Sum in a loop</h3>
<p>Sort, fix the first element, then run converging two-pointers on the remainder. The only real difficulty is deduplication: skip a repeated value at the outer level with <code>if (i &gt; 0 &amp;&amp; a[i] == a[i-1]) continue;</code>, and skip repeats on both pointers after recording a hit. Most failures on this problem are duplicate handling, not the algorithm.</p>

<h3>Container With Most Water — the argument that matters</h3>
<p>Move the <em>shorter</em> wall inward. Interviewers often ask why that is safe. The answer: the area is bounded by the shorter wall, so moving the taller one inward can never increase the height and always decreases the width — it cannot produce a better answer. Being able to give that justification is the difference between having memorised it and having understood it.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Valid Palindrome <em>— converging, warm-up</em></li>
    <li>Two Sum II <em>— converging on sorted input</em></li>
    <li>3Sum <em>— the dedup discipline</em></li>
    <li>Container With Most Water <em>— practise the justification out loud</em></li>
    <li>Trapping Rain Water <em>— hard; two pointers with running maxima</em></li>
  </ol>
</div>
` },

  { id:"3.3", title:"Sliding window", body:`
<p class="l-lede">"Contiguous subarray" or "substring" plus a constraint. Nearly always this pattern, and it is one of the most frequently asked in the whole interview.</p>

<h3>Fixed-size window</h3>
<p>Every step: add the incoming element on the right, remove the outgoing one on the left. The window never changes size, so there is no inner loop.</p>

<h3>Variable-size window — the important one</h3>
<p>One skeleton covers nearly all of them. Expand right unconditionally; shrink left <em>while</em> the window is invalid; record the answer when it is valid.</p>
<pre><code><span class="k">int</span> left = 0, best = 0;
<span class="k">var</span> count = <span class="k">new</span> Dictionary&lt;<span class="k">char</span>, <span class="k">int</span>&gt;();

<span class="k">for</span> (<span class="k">int</span> right = 0; right &lt; s.Length; right++) {
    count[s[right]] = count.GetValueOrDefault(s[right]) + 1;

    <span class="k">while</span> (<span class="c">/* window is invalid */</span>) {
        count[s[left]]--;
        <span class="k">if</span> (count[s[left]] == 0) count.Remove(s[left]);
        left++;
    }
    best = Math.Max(best, right - left + 1);
}</code></pre>

<p>The entire skill is writing the <code>while</code> condition correctly. Some examples of what goes in it:</p>
<ul>
  <li><em>Longest substring without repeating characters:</em> <code>count[s[right]] &gt; 1</code></li>
  <li><em>Longest repeating character replacement:</em> <code>(windowLength - maxFreq) &gt; k</code></li>
  <li><em>Minimum window substring:</em> invert it — shrink while the window <strong>is</strong> valid, recording the best as you go</li>
</ul>

<h3>Why it is O(n) and not O(n²)</h3>
<p>Each pointer only moves forward, so across the whole run each index is added once and removed at most once — 2n operations. Say this when you state the complexity; the nested <code>while</code> makes it look quadratic and interviewers like to check whether you know why it is not.</p>

<div class="callout">
  <span class="tag">Minimum Window Substring</span>
  <p>This is the hardest problem in the chapter and it is worth the struggle — it is asked directly and it is the ancestor of several others. Give it thirty minutes before looking at anything. The trick that unlocks it is tracking a single <code>have</code> counter of satisfied character requirements rather than comparing two dictionaries on every step.</p>
</div>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Best Time to Buy and Sell Stock <em>— a window in disguise</em></li>
    <li>Longest Substring Without Repeating Characters <em>— the canonical variable window</em></li>
    <li>Longest Repeating Character Replacement <em>— a non-obvious validity condition</em></li>
    <li>Permutation in String <em>— fixed size</em></li>
    <li>Minimum Window Substring <em>— hard, inverted shrink</em></li>
  </ol>
</div>
` },

  { id:"3.4", title:"Binary search, including the one people miss", body:`
<p class="l-lede">Everyone knows binary search on a sorted array. The version that separates candidates is binary search on the answer space.</p>

<h3>Settle your convention once</h3>
<p>Pick one boundary convention and reuse it forever. Off-by-one errors here burn minutes you do not have.</p>
<pre><code><span class="k">int</span> lo = 0, hi = a.Length - 1;      <span class="c">// inclusive both ends</span>
<span class="k">while</span> (lo &lt;= hi) {
    <span class="k">int</span> mid = lo + (hi - lo) / 2;
    <span class="k">if</span> (a[mid] == target) <span class="k">return</span> mid;
    <span class="k">if</span> (a[mid] &lt; target) lo = mid + 1; <span class="k">else</span> hi = mid - 1;
}
<span class="k">return</span> -1;</code></pre>

<h3>Binary search on the answer space</h3>
<p>This is the one to internalise. The trigger phrases are <strong>"minimise the maximum"</strong>, <strong>"maximise the minimum"</strong>, or <strong>"smallest k such that…"</strong>. The input may not be sorted at all.</p>

<p>The method has three steps:</p>
<ol class="steps">
  <li><b>Identify the range of possible answers.</b> For Koko: between 1 banana per hour and the largest pile.</li>
  <li><b>Write a monotonic predicate.</b> <code>bool Feasible(x)</code> — can she finish in time at speed x? Crucially, if x works then every larger x also works. That monotonicity is what makes the search valid, and it is the thing to verify out loud.</li>
  <li><b>Binary search for the boundary</b> where the predicate flips from false to true.</li>
</ol>

<pre><code><span class="k">int</span> lo = 1, hi = piles.Max();
<span class="k">while</span> (lo &lt; hi) {
    <span class="k">int</span> mid = lo + (hi - lo) / 2;
    <span class="k">if</span> (Feasible(mid)) hi = mid;      <span class="c">// mid might be the answer — keep it</span>
    <span class="k">else</span> lo = mid + 1;                <span class="c">// mid is too small — discard it</span>
}
<span class="k">return</span> lo;</code></pre>

<h3>Rotated sorted array</h3>
<p>The key observation: at any midpoint, <em>at least one half is properly sorted</em>. Work out which half that is, check whether the target falls inside its range, and discard the other half. Stating that observation before coding is most of the credit.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Binary Search <em>— lock in your convention</em></li>
    <li>Search a 2D Matrix <em>— treat it as one flat sorted array</em></li>
    <li>Find Minimum in Rotated Sorted Array</li>
    <li>Search in Rotated Sorted Array</li>
    <li>Koko Eating Bananas <em>— answer-space search; the important one</em></li>
    <li>Split Array Largest Sum <em>— harder answer-space variant, optional</em></li>
  </ol>
</div>
` },

  { id:"3.5", title:"Prefix sums & consolidation", body:`
<p class="l-lede">One more small technique, then a consolidation session — because four patterns learned and never revisited is four patterns lost.</p>

<h3>Prefix sums</h3>
<p>Precompute running totals so any range sum becomes a single subtraction. Build once in O(n), answer any query in O(1).</p>
<pre><code><span class="k">var</span> pre = <span class="k">new long</span>[a.Length + 1];
<span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; a.Length; i++) pre[i + 1] = pre[i] + a[i];
<span class="c">// sum of a[l..r] inclusive:</span>
<span class="k">long</span> sum = pre[r + 1] - pre[l];</code></pre>
<p>Note the <code>long</code> and the size <code>n+1</code>. Both prevent the two standard bugs.</p>

<h3>Prefix sums plus a hash map</h3>
<p>The combination is what makes <em>Subarray Sum Equals K</em> work. Walk the array keeping a running sum; at each point, ask how many earlier prefixes equal <code>running - k</code>. Each such prefix marks the start of a qualifying subarray. Store counts of prefix sums seen so far in a dictionary, and seed it with <code>{0: 1}</code> so a subarray starting at index zero is counted.</p>

<h3>Product of Array Except Self</h3>
<p>Same idea, different operation: a left-products pass and a right-products pass, multiplied together — no division, which is usually a stated constraint.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Product of Array Except Self</li>
    <li>Subarray Sum Equals K <em>— prefix sums plus a map</em></li>
  </ol>
</div>

<div class="callout gold">
  <span class="tag">Consolidation — do not skip this</span>
  <p>Before moving to Patterns II, re-solve <strong>one problem from each of 3.1 through 3.4</strong>, cold, with no notes open. Pick the ones you found hardest. This will take about an hour and it is the single highest-value hour in the chapter.</p>
  <p>While you do it, notice which pattern you had to <em>think</em> to identify versus which one fired immediately. The ones that needed thinking go in your one-line log, and they are what you re-solve again next weekend.</p>
</div>
` }
]},

/* ================= CH 4 ================= */
{ id:4, title:"Core Patterns II — Trees & Graphs", mins:80,
  sub:"The highest-frequency territory in the entire interview. If you only have time for one chapter of patterns, it is this one.",
  lessons:[

  { id:"4.1", title:"Tree DFS", body:`
<p class="l-lede">Almost every tree problem reduces to two questions. Ask them out loud, every time, before writing anything.</p>

<div class="callout">
  <span class="tag">The two questions</span>
  <p><b>1. What do I need <em>from</em> my children?</b> That determines your return value.</p>
  <p><b>2. What do I need to pass <em>down</em> to them?</b> That determines your parameters.</p>
</div>

<p>Answer those and the code writes itself. Post-order when you need results from children; pre-order when you carry state downward.</p>

<pre><code><span class="k">int</span> Depth(TreeNode node) {
    <span class="k">if</span> (node == <span class="k">null</span>) <span class="k">return</span> 0;           <span class="c">// base case first, always</span>
    <span class="k">return</span> 1 + Math.Max(Depth(node.left), Depth(node.right));
}</code></pre>

<h3>The trick in Diameter of a Binary Tree</h3>
<p>The answer at each node is <code>leftDepth + rightDepth</code>, but the value you <em>return</em> to your parent is <code>1 + max(left, right)</code>. Those are different quantities, and recognising that you must return one while recording the other is the entire problem. The same shape appears in "maximum path sum" and several others — a global best tracked in a field, a different local value returned.</p>

<pre><code><span class="k">int</span> best = 0;

<span class="k">int</span> Depth(TreeNode n) {
    <span class="k">if</span> (n == <span class="k">null</span>) <span class="k">return</span> 0;
    <span class="k">int</span> l = Depth(n.left), r = Depth(n.right);
    best = Math.Max(best, l + r);      <span class="c">// record: path THROUGH this node</span>
    <span class="k">return</span> 1 + Math.Max(l, r);         <span class="c">// return: path ENDING at this node</span>
}</code></pre>

<h3>State carried downward</h3>
<p>Problems like "count nodes whose value is at least every value on the path from the root" pass the running maximum down as a parameter. That is the pre-order shape, and it is much less common than the post-order one — but when it fires, trying to force a post-order solution wastes a lot of time.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Maximum Depth of Binary Tree <em>— warm-up</em></li>
    <li>Invert Binary Tree</li>
    <li>Same Tree / Subtree of Another Tree</li>
    <li>Diameter of Binary Tree <em>— record vs return</em></li>
    <li>Balanced Binary Tree <em>— returning two facts at once</em></li>
  </ol>
</div>
` },

  { id:"4.2", title:"Binary search trees", body:`
<p class="l-lede">One fact does most of the work: an in-order traversal of a BST yields the values in sorted order.</p>

<p>That single property is the answer to a surprising share of BST questions. Kth smallest? In-order, stop at k. Validate? In-order must be strictly increasing. Convert to a sorted list? In-order.</p>

<h3>Validate BST — the trap</h3>
<p>The wrong answer, which most people give first, is checking only that each node sits between its immediate children. That passes trees which are not valid BSTs. The correct approach carries a <strong>range</strong> down the recursion:</p>

<pre><code><span class="k">bool</span> Valid(TreeNode n, <span class="k">long</span> min, <span class="k">long</span> max) {
    <span class="k">if</span> (n == <span class="k">null</span>) <span class="k">return true</span>;
    <span class="k">if</span> (n.val &lt;= min || n.val &gt;= max) <span class="k">return false</span>;
    <span class="k">return</span> Valid(n.left, min, n.val) &amp;&amp; Valid(n.right, n.val, max);
}
<span class="c">// call with long.MinValue, long.MaxValue — note long, not int,</span>
<span class="c">// because a node can legitimately hold int.MinValue</span>
</code></pre>

<p>That <code>long</code> is a real test case on most platforms and a nice detail to mention unprompted.</p>

<h3>Lowest common ancestor in a BST</h3>
<p>In a plain binary tree, LCA needs a full search. In a BST it is almost trivial: walk down from the root; if both targets are smaller, go left; if both are larger, go right; the moment they split — or one equals the current node — you are standing on the answer. O(height), no recursion needed.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Lowest Common Ancestor of a BST <em>— the walk-down</em></li>
    <li>Validate Binary Search Tree <em>— range carried down</em></li>
    <li>Kth Smallest Element in a BST <em>— in-order with a counter</em></li>
    <li>Construct BST from Preorder <em>— optional stretch</em></li>
  </ol>
</div>
` },

  { id:"4.3", title:"BFS on trees and grids", body:`
<p class="l-lede">The trigger is specific: shortest path on an <em>unweighted</em> graph, "level by level", or "minimum number of steps".</p>

<h3>The level-size loop</h3>
<p>When levels matter, capture the queue size before draining it. That one line is what separates level-order from a flat traversal.</p>
<pre><code><span class="k">var</span> q = <span class="k">new</span> Queue&lt;TreeNode&gt;();
q.Enqueue(root);
<span class="k">while</span> (q.Count &gt; 0) {
    <span class="k">int</span> n = q.Count;                 <span class="c">// exactly this level</span>
    <span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; n; i++) {
        <span class="k">var</span> node = q.Dequeue();
        <span class="c">// ... process node at this level</span>
        <span class="k">if</span> (node.left != <span class="k">null</span>) q.Enqueue(node.left);
        <span class="k">if</span> (node.right != <span class="k">null</span>) q.Enqueue(node.right);
    }
    <span class="c">// one full level done — depth++, or record the level</span>
}</code></pre>

<div class="callout gold">
  <span class="tag">Mark visited on enqueue, never on dequeue</span>
  <p>This is the most common BFS bug and it is silent. If you mark visited only when you dequeue, a node reachable from several neighbours gets enqueued multiple times before any of them is processed. On a grid that can blow up to an exponential number of queue entries. Mark it the moment you push it.</p>
</div>

<h3>Multi-source BFS</h3>
<p><em>Rotting Oranges</em> is the canonical example and the technique is underused. Rather than running a separate BFS from each source, seed the queue with <strong>all sources at once</strong> before the loop starts. Every node is then reached by whichever source is nearest, in a single O(V+E) pass. Any problem phrased as "distance to the nearest X" should make you reach for this.</p>

<h3>Grid problems are graph problems</h3>
<p>A grid is just a graph whose adjacency is implied by coordinates. Use the direction-array idiom from lesson 2.4, decide up front whether you mutate the grid to mark visited (cheap, destructive) or keep a separate visited set (clean, uses memory), and say which you chose and why.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Binary Tree Level Order Traversal <em>— the level-size loop</em></li>
    <li>Binary Tree Right Side View <em>— last node of each level</em></li>
    <li>Number of Islands <em>— flood fill; BFS or DFS</em></li>
    <li>Rotting Oranges <em>— multi-source BFS</em></li>
    <li>Word Ladder <em>— BFS on an implicit graph; harder</em></li>
  </ol>
</div>
` },

  { id:"4.4", title:"Graphs & topological sort", body:`
<p class="l-lede">Dependencies, prerequisites, build order, cycles. Once you see "A must happen before B", you are in topological sort territory.</p>

<h3>Build the adjacency list first, out loud</h3>
<p>Most graph problems hand you an edge list. Converting it is the first thing you do and it is worth narrating, because the direction of edges is where people silently go wrong.</p>
<pre><code><span class="k">var</span> adj = <span class="k">new</span> List&lt;<span class="k">int</span>&gt;[n];
<span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; n; i++) adj[i] = <span class="k">new</span> List&lt;<span class="k">int</span>&gt;();
<span class="k">foreach</span> (<span class="k">var</span> e <span class="k">in</span> edges) adj[e[1]].Add(e[0]);   <span class="c">// e[1] must come before e[0]</span></code></pre>

<h3>Kahn's algorithm — the one to know</h3>
<p>Count how many prerequisites each node has. Start with everything that has none. Each time you take a node, decrement its dependents; anything that drops to zero becomes available.</p>
<pre><code><span class="k">var</span> indeg = <span class="k">new int</span>[n];
<span class="k">foreach</span> (<span class="k">var</span> list <span class="k">in</span> adj) <span class="k">foreach</span> (<span class="k">var</span> v <span class="k">in</span> list) indeg[v]++;

<span class="k">var</span> q = <span class="k">new</span> Queue&lt;<span class="k">int</span>&gt;();
<span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; n; i++) <span class="k">if</span> (indeg[i] == 0) q.Enqueue(i);

<span class="k">var</span> order = <span class="k">new</span> List&lt;<span class="k">int</span>&gt;();
<span class="k">while</span> (q.Count &gt; 0) {
    <span class="k">int</span> u = q.Dequeue();
    order.Add(u);
    <span class="k">foreach</span> (<span class="k">var</span> v <span class="k">in</span> adj[u])
        <span class="k">if</span> (--indeg[v] == 0) q.Enqueue(v);
}
<span class="c">// order.Count &lt; n  =&gt;  there is a cycle</span></code></pre>

<p>That last line is the whole cycle-detection story, and it is free. <em>Course Schedule</em> asks only "is it possible" — return the boolean. <em>Course Schedule II</em> asks for the order — return the list. Same code.</p>

<h3>Cycle detection by DFS needs three colours, not two</h3>
<p>If you go the DFS route instead, a simple visited set is not enough: you must distinguish "currently on the recursion stack" (a back edge here means a cycle) from "fully explored" (safe). White / grey / black, or two sets. People routinely give the two-state version and it is wrong — it reports a cycle for any node reachable by two different paths.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Clone Graph <em>— traversal plus a map from old to new</em></li>
    <li>Course Schedule <em>— cycle detection</em></li>
    <li>Course Schedule II <em>— the full ordering</em></li>
    <li>Number of Connected Components <em>— or do it with Union-Find</em></li>
    <li>Pacific Atlantic Water Flow <em>— reverse-direction traversal from the edges</em></li>
  </ol>
</div>
` },

  { id:"4.5", title:"Heaps & top-K", body:`
<p class="l-lede">"K largest", "K closest", "median of a stream", "merge these sorted things". Reach for a heap and state the complexity immediately.</p>

<h3>The counter-intuitive bit, said out loud</h3>
<p>For the <strong>K largest</strong> elements you want a <strong>min-heap of size K</strong>. The root is then the smallest of your current best K, so when a larger element arrives you evict the root in O(log k). Saying "min-heap for K largest, because the root is the weakest member I'd want to evict" is a small, reliable signal that you understand the structure rather than the recipe.</p>

<p>The payoff is O(n log k) instead of sorting's O(n log n). When k is 10 and n is ten million, that is the difference between a good and a bad answer.</p>

<pre><code><span class="k">var</span> heap = <span class="k">new</span> PriorityQueue&lt;<span class="k">int</span>, <span class="k">int</span>&gt;();   <span class="c">// min-heap</span>
<span class="k">foreach</span> (<span class="k">var</span> x <span class="k">in</span> nums) {
    heap.Enqueue(x, x);
    <span class="k">if</span> (heap.Count &gt; k) heap.Dequeue();     <span class="c">// drop the smallest</span>
}
<span class="c">// heap now holds the k largest; its root is the kth largest</span></code></pre>

<h3>Running median — two heaps</h3>
<p>A max-heap for the lower half, a min-heap for the upper half, kept balanced to within one element. The median is then either the root of the larger heap or the average of the two roots. The only fiddly part is the rebalancing step, and writing it once is enough to remember it.</p>

<h3>Merge K sorted lists</h3>
<p>Push the head of each list into a heap keyed on value; pop the smallest, append it, push that list's next node. O(N log k) where N is the total element count. There is also a divide-and-conquer pairwise-merge solution with the same complexity — mentioning that both exist and that the heap version is easier to get right under time pressure is a good answer.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Kth Largest Element in an Array <em>— size-k min-heap</em></li>
    <li>Top K Frequent Elements <em>— frequency map, then heap or bucket sort</em></li>
    <li>K Closest Points to Origin</li>
    <li>Merge K Sorted Lists</li>
    <li>Find Median from Data Stream <em>— two heaps; harder</em></li>
  </ol>
</div>

<div class="callout gold">
  <span class="tag">Consolidation</span>
  <p>Before Patterns III, re-solve one problem each from 4.1, 4.3 and 4.4 cold. Trees and graphs are the highest-frequency territory in the interview — of everything in this course, this is the material most worth over-learning.</p>
</div>
` }
]},

/* ================= CH 5 ================= */
{ id:5, title:"Core Patterns III — The harder ones", mins:70,
  sub:"Intervals, monotonic stacks, backtracking and dynamic programming. Lower frequency individually, but together they cover most of what is left.",
  lessons:[

  { id:"5.1", title:"Intervals & sweep line", body:`
<p class="l-lede">Meetings, bookings, ranges, calendars. Almost every one of these starts with the same line of code.</p>

<h3>Sort by start. Almost always.</h3>
<pre><code>intervals.Sort((a, b) =&gt; a[0].CompareTo(b[0]));</code></pre>

<p>Once sorted, merging is a single pass: if the current interval starts before the last one ends, extend the last one's end to the maximum of the two; otherwise start a new interval.</p>

<h3>The overlap test, memorised</h3>
<pre><code><span class="k">bool</span> overlaps = a.start &lt;= b.end &amp;&amp; b.start &lt;= a.end;</code></pre>
<p>Write it out once and never derive it again under pressure. Note it is inclusive — if touching endpoints should not count as overlapping, use strict inequalities and say that you are making that choice.</p>

<h3>Sweep line — for "maximum concurrent"</h3>
<p><em>Meeting Rooms II</em> asks for the minimum number of rooms, which is the maximum number of meetings running at once. Do not try to merge. Instead turn each interval into two events, sort them, and walk:</p>
<pre><code><span class="c">// +1 at every start, -1 at every end</span>
<span class="c">// sort events by time; on ties, process ends BEFORE starts</span>
<span class="c">// (a meeting ending at 10 frees the room for one starting at 10)</span>
<span class="k">int</span> cur = 0, best = 0;
<span class="k">foreach</span> (<span class="k">var</span> e <span class="k">in</span> events) {
    cur += e.delta;
    best = Math.Max(best, cur);
}</code></pre>
<p>That tie-breaking rule is the bug that catches people. Mention it before you are asked.</p>

<h3>Non-overlapping Intervals — sort by END</h3>
<p>The exception to "sort by start". When you want to <em>keep the most</em> intervals (equivalently, remove the fewest), sort by end time and greedily keep every interval that starts after the last kept one ended. This is the classic activity-selection greedy, and the justification — finishing earliest leaves the most room for everything after — is worth saying.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Merge Intervals <em>— sort by start</em></li>
    <li>Insert Interval <em>— no sort needed; three phases</em></li>
    <li>Non-overlapping Intervals <em>— sort by end, greedy</em></li>
    <li>Meeting Rooms II <em>— sweep line</em></li>
  </ol>
</div>
` },

  { id:"5.2", title:"Stack & monotonic stack", body:`
<p class="l-lede">Two distinct uses of the same structure. The second one is the one worth real study.</p>

<h3>Plain stack: matching and parsing</h3>
<p>Valid parentheses, expression evaluation, path simplification. Push openers, pop and check on closers. Nothing subtle, but fast to get right, so get it right fast.</p>

<h3>Monotonic stack: "next greater element"</h3>
<p>Any question of the form "for each element, find the next one that is bigger / smaller" is O(n) with a stack that is kept in sorted order. The pattern:</p>

<pre><code><span class="k">var</span> st = <span class="k">new</span> Stack&lt;<span class="k">int</span>&gt;();        <span class="c">// holds INDICES, not values</span>
<span class="k">var</span> res = <span class="k">new int</span>[t.Length];

<span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; t.Length; i++) {
    <span class="k">while</span> (st.Count &gt; 0 &amp;&amp; t[i] &gt; t[st.Peek()]) {
        <span class="k">int</span> j = st.Pop();
        res[j] = i - j;               <span class="c">// i is j's "next greater"</span>
    }
    st.Push(i);
}</code></pre>

<div class="callout">
  <span class="tag">Store indices, not values</span>
  <p>You almost always need the <em>distance</em> to the next greater element, not just its value. Storing indices gives you both — the value is one lookup away. Starting with values and having to rewrite is a common two-minute loss.</p>
</div>

<h3>Why it is linear</h3>
<p>Each index is pushed exactly once and popped at most once, so the inner <code>while</code> does at most n total work across the entire outer loop. Same argument as the sliding window. State it when you give the complexity.</p>

<h3>The two hard ones are the same problem</h3>
<p><em>Largest Rectangle in Histogram</em> and <em>Trapping Rain Water</em> both look geometric and are both monotonic-stack problems underneath. The histogram one is the more instructive: for each bar you need the nearest shorter bar to the left and right, which is precisely what the stack gives you. If you only do one hard problem in this lesson, do that one — <em>Maximal Rectangle</em> is literally it applied row by row.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Valid Parentheses <em>— warm-up</em></li>
    <li>Min Stack <em>— a second stack holding running minima</em></li>
    <li>Daily Temperatures <em>— the canonical monotonic stack</em></li>
    <li>Car Fleet <em>— sort, then stack; a good disguise</em></li>
    <li>Largest Rectangle in Histogram <em>— hard, worth it</em></li>
  </ol>
</div>
` },

  { id:"5.3", title:"Backtracking", body:`
<p class="l-lede">"All combinations", "all permutations", "all valid ways", and an input size under about twenty. One template covers every one of them.</p>

<h3>The template</h3>
<pre><code><span class="k">void</span> Backtrack(List&lt;<span class="k">int</span>&gt; path, <span class="k">int</span> start) {
    <span class="k">if</span> (<span class="c">/* complete */</span>) { results.Add(<span class="k">new</span> List&lt;<span class="k">int</span>&gt;(path)); <span class="k">return</span>; }

    <span class="k">for</span> (<span class="k">int</span> i = start; i &lt; choices.Length; i++) {
        path.Add(choices[i]);        <span class="c">// choose</span>
        Backtrack(path, i + 1);      <span class="c">// explore</span>
        path.RemoveAt(path.Count-1); <span class="c">// UN-CHOOSE  &lt;-- the one people forget</span>
    }
}</code></pre>

<div class="callout gold">
  <span class="tag">Two bugs, every time</span>
  <p><b>Forgetting to un-choose.</b> The path accumulates garbage and every result after the first is wrong.</p>
  <p><b>Adding the path by reference.</b> <code>results.Add(path)</code> stores a pointer to a list you are about to mutate — you end up with N copies of an empty list. It must be <code>new List&lt;int&gt;(path)</code>.</p>
</div>

<h3>Deduplication</h3>
<p>When the input contains duplicates and the output must not, sort first and skip repeats at the same recursion depth:</p>
<pre><code><span class="k">if</span> (i &gt; start &amp;&amp; nums[i] == nums[i - 1]) <span class="k">continue</span>;</code></pre>
<p>The <code>i &gt; start</code> is essential — it allows a duplicate to be <em>used</em> deeper in the path while preventing it from starting a second identical branch at the same level. Explain that distinction if asked; it is the part that is actually subtle.</p>

<h3>State the complexity first</h3>
<p>These are exponential and interviewers want to see that you know it before you start typing. Subsets is O(2ⁿ · n). Permutations is O(n! · n). Saying so up front frames the problem correctly and pre-empts "can you do better?" — usually you cannot, because the output itself is that large.</p>

<h3>Word Search — the grid variant</h3>
<p>Same template, but the "choice" is a direction and the un-choose step restores the grid cell you temporarily marked as visited. Mutating the board and restoring it is cheaper than a visited set and is the expected solution.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Subsets <em>— the plain template</em></li>
    <li>Combination Sum <em>— reuse allowed; pass i, not i+1</em></li>
    <li>Permutations <em>— a used[] array instead of a start index</em></li>
    <li>Subsets II <em>— the dedup rule</em></li>
    <li>Word Search <em>— grid backtracking with restore</em></li>
  </ol>
</div>
` },

  { id:"5.4", title:"Dynamic programming — the five shapes", body:`
<p class="l-lede">DP is where four-week plans go to die. The way through is to learn five shapes rather than fifty problems, and to accept that you will not master the hard ones. That is fine — the hard ones are rare.</p>

<div class="callout">
  <span class="tag">The discipline that makes DP tractable</span>
  <p><b>Define <code>dp[i]</code> in words, out loud, before writing a single line of code.</b> Not "dp is the answer" — precisely: "<code>dp[i]</code> is the maximum money I can rob from the first i houses." Ninety per cent of DP failures are an imprecise state definition, and you cannot debug your way out of one.</p>
</div>

<h3>Start top-down</h3>
<p>Write the plain recursion, then add a memo dictionary or array. It is closer to how you actually reason, it is much easier to get right under pressure, and you can always say "this converts to a bottom-up table with O(1) space if you'd like" — which earns the same credit with less risk.</p>

<h3>The five shapes</h3>
<div class="tbl"><table>
<thead><tr><th>Shape</th><th>State</th><th>Canonical problems</th></tr></thead>
<tbody>
<tr><td><b>Linear</b></td><td><code>dp[i]</code> from <code>dp[i-1]</code>, <code>dp[i-2]</code></td><td>Climbing Stairs, House Robber</td></tr>
<tr><td><b>Grid</b></td><td><code>dp[r][c]</code> from above and left</td><td>Unique Paths, Min Path Sum</td></tr>
<tr><td><b>Knapsack</b></td><td><code>dp[amount]</code> or <code>dp[i][capacity]</code></td><td>Coin Change, Partition Equal Subset Sum</td></tr>
<tr><td><b>Two sequences</b></td><td><code>dp[i][j]</code> comparing two strings</td><td>Longest Common Subsequence, Edit Distance</td></tr>
<tr><td><b>Interval</b></td><td><code>dp[i][j]</code> over a range</td><td>Longest Palindromic Substring</td></tr>
</tbody></table></div>

<h3>Coin Change, as the worked example</h3>
<p><em>"<code>dp[a]</code> is the fewest coins needed to make amount a."</em> Base case <code>dp[0] = 0</code>. For every amount, try every coin:</p>
<pre><code><span class="k">var</span> dp = <span class="k">new int</span>[amount + 1];
Array.Fill(dp, amount + 1);            <span class="c">// sentinel for "impossible"</span>
dp[0] = 0;

<span class="k">for</span> (<span class="k">int</span> a = 1; a &lt;= amount; a++)
    <span class="k">foreach</span> (<span class="k">var</span> c <span class="k">in</span> coins)
        <span class="k">if</span> (c &lt;= a) dp[a] = Math.Min(dp[a], dp[a - c] + 1);

<span class="k">return</span> dp[amount] &gt; amount ? -1 : dp[amount];</code></pre>
<p>The sentinel trick — fill with a value larger than any real answer, then test against it at the end — avoids special-casing unreachable amounts throughout the loop.</p>

<h3>What to skip</h3>
<p>Do not spend week three on Edit Distance, Regular Expression Matching, or Burst Balloons. Get Climbing Stairs, House Robber, Coin Change, Unique Paths and Longest Increasing Subsequence genuinely solid. Five DP problems you can produce cold beat fifteen you have read.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Climbing Stairs <em>— the simplest possible state</em></li>
    <li>House Robber <em>— the choose-or-skip shape</em></li>
    <li>Coin Change <em>— knapsack</em></li>
    <li>Longest Increasing Subsequence <em>— O(n²) is fine; mention the O(n log n) exists</em></li>
    <li>Unique Paths <em>— grid</em></li>
    <li>Longest Common Subsequence <em>— two sequences, if time allows</em></li>
  </ol>
</div>
` }
]},
/* ================= CH 6 ================= */
{ id:6, title:"System Design Foundations", mins:70,
  sub:"Design rounds are not about knowing more components. They are about driving a structured conversation and making defensible trade-offs under time pressure.",
  lessons:[

  { id:"6.1", title:"The 45-minute frame", body:`
<p class="l-lede">Rehearse this until the timing is automatic. The most common failure in a design round is spending twenty-five minutes on requirements and never reaching a deep dive.</p>

<ol class="steps">
  <li><span class="t">5 min</span><b>Functional requirements — and scope cuts</b>List what the system does. Then explicitly cut: "I'm going to treat auth, payments and analytics as out of scope — tell me if you'd rather I include one." Cutting scope out loud is a senior behaviour and it buys you the time you need later.</li>
  <li><span class="t">3 min</span><b>Non-functional requirements</b>Scale, latency target, read/write ratio, consistency needs, availability target. These drive every later decision, so pin them down before designing anything.</li>
  <li><span class="t">4 min</span><b>Capacity estimate</b>Only the numbers that change a decision. QPS, storage per year, whether the working set fits in memory. If a number does not change your design, skip it — and say that you are skipping it and why.</li>
  <li><span class="t">4 min</span><b>API surface and data model</b>Three or four endpoints. Then the core entities and — the part people skip — the <em>access patterns</em>, which is what actually picks your database and your partition key.</li>
  <li><span class="t">10 min</span><b>High-level design</b>Boxes and arrows, then narrate one request end to end. Keep it deliberately simple; complexity belongs in the deep dives, not here.</li>
  <li><span class="t">14 min</span><b>Two or three deep dives</b>This is the round. Pick the riskiest parts and go deep. Mid-level candidates do one and wait to be prompted; senior candidates pick two or three themselves.</li>
  <li><span class="t">5 min</span><b>Failure modes and operations</b>What breaks first as this grows? Then: what do you monitor, how do you roll it out, what pages you at 3am.</li>
</ol>

<div class="callout">
  <span class="tag">The sentence that buys you control</span>
  <p>"I'm going to go deep on the partitioning next, unless you'd rather see the delivery path." You are steering, and you are checking alignment. Interviewers consistently rate that higher than a candidate who waits to be asked — and it costs nothing to adopt.</p>
</div>

<h3>Practise the clock, not just the content</h3>
<p>When you do the designs in Six Worked Designs, set an actual timer and speak out loud. Reading a design and being able to produce one under a clock are different skills, and only the second one is tested.</p>
` },

  { id:"6.2", title:"The component vocabulary", body:`
<p class="l-lede">Nine building blocks. For each one, know what it buys you and what it costs — the cost half is where the credit is.</p>

<div class="tbl"><table>
<thead><tr><th>Component</th><th>Buys you</th><th>Costs you</th></tr></thead>
<tbody>
<tr><td><b>CDN</b></td><td>Edge latency, origin offload</td><td>Invalidation complexity, staleness</td></tr>
<tr><td><b>Load balancer</b></td><td>Horizontal scale, health-check failover</td><td>Another hop; sticky sessions constrain scaling</td></tr>
<tr><td><b>Cache</b></td><td>Read latency, database offload</td><td>Invalidation, stampedes, a second source of truth</td></tr>
<tr><td><b>Relational DB</b></td><td>Transactions, joins, constraints</td><td>Harder horizontal scale, migrations at size</td></tr>
<tr><td><b>Document / wide-column</b></td><td>Horizontal scale, high write throughput</td><td>You design for access patterns up front; cross-partition queries hurt</td></tr>
<tr><td><b>Message queue</b></td><td>Decoupling, spike absorption, retries</td><td>Eventual consistency, ordering, duplicates</td></tr>
<tr><td><b>Log / stream</b></td><td>Replay, many consumers, ordered partitions</td><td>Operational weight; ordering only <em>within</em> a partition</td></tr>
<tr><td><b>Object store</b></td><td>Cheap durable bytes at any size</td><td>High per-object latency; not a database</td></tr>
<tr><td><b>Search index</b></td><td>Full-text, faceting, ranking</td><td>A second store to keep in sync, usually via CDC</td></tr>
</tbody></table></div>

<h3>The request path, narrated</h3>
<p>Have one default path you can draw in thirty seconds and then modify:</p>
<pre><code>client -> DNS -> CDN -> load balancer -> API gateway
       -> service -> cache -> database
                  -> queue -> workers -> object store</code></pre>

<h3>Two habits that separate good answers</h3>
<ul class="clean">
  <li><b>Never add a component without saying what it costs.</b> "I'll put Redis in front of the database for reads — which means I now own an invalidation strategy, so let me say what it is." That second clause is the whole signal.</li>
  <li><b>Start simpler than you think you should.</b> Beginning with a monolith and a single database and then <em>evolving</em> it under pressure reads as far more experienced than opening with twelve boxes. Complexity you introduce in response to a stated constraint is justified; complexity you open with is decoration.</li>
</ul>
` },

  { id:"6.3", title:"Numbers to have in your head", body:`
<p class="l-lede">Order of magnitude only. Nobody expects precision — they expect you not to be wrong by a factor of a thousand, and to reach for a number rather than stall.</p>

<h3>Latency</h3>
<div class="tbl"><table>
<thead><tr><th>Operation</th><th class="nc">Time</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Main memory reference</td><td class="nc">~100 ns</td><td>The baseline everything else is compared to</td></tr>
<tr><td>Send 1 KB over 1 Gbps</td><td class="nc">~10 µs</td><td>Network is not free, but rarely the bottleneck</td></tr>
<tr><td>SSD random read</td><td class="nc">~100 µs</td><td>~1000× slower than memory — this is why caches exist</td></tr>
<tr><td>Round trip in a datacenter</td><td class="nc">~500 µs</td><td>Every service hop costs this. Chatty designs die here</td></tr>
<tr><td>Read 1 MB sequentially from SSD</td><td class="nc">~1 ms</td><td>Sequential beats random by a lot — design for it</td></tr>
<tr><td>Disk seek (spinning)</td><td class="nc">~10 ms</td><td>Why log-structured storage exists</td></tr>
<tr><td>Round trip US coast to coast</td><td class="nc">~70 ms</td><td rowspan="2">Physics. The only fix is moving data closer to users</td></tr>
<tr><td>Round trip US to Europe</td><td class="nc">~150 ms</td></tr>
</tbody></table></div>

<h3>Capacity arithmetic</h3>
<ul class="clean">
  <li><b>One day ≈ 10⁵ seconds</b> (86,400). This single number does most of the work. 1 M events/day ≈ 12/s. 1 B/day ≈ 12,000/s.</li>
  <li><b>Peak is 2–3× average.</b> Always say which one you are designing for.</li>
  <li><b>Storage template:</b> DAU × actions per user per day × bytes per action × retention days × replication factor. Say it in that order and the estimate writes itself.</li>
  <li><b>Useful sizes:</b> a short text row with metadata ≈ 1 KB. A compressed photo ≈ 500 KB. One million 1 KB rows = 1 GB; one billion = 1 TB.</li>
  <li><b>A commodity server</b> holds tens of GB of RAM and serves thousands of QPS for simple operations. Use it to sanity-check "how many machines" — and to notice when the whole working set fits in memory, which changes the design entirely.</li>
</ul>

<h3>Availability, in time</h3>
<div class="tbl"><table>
<thead><tr><th>Target</th><th class="nc">Downtime per year</th></tr></thead>
<tbody>
<tr><td>99.9% — three nines</td><td class="nc">8.8 hours</td></tr>
<tr><td>99.99% — four nines</td><td class="nc">53 minutes</td></tr>
<tr><td>99.999% — five nines</td><td class="nc">5 minutes</td></tr>
</tbody></table></div>
<p>Each nine costs real money and real operational burden. Saying "four nines is about fifty minutes a year, which means we need automated failover, not a human in the loop" turns a number into a design constraint — which is the point of knowing it.</p>
` },

  { id:"6.4", title:"Trade-offs you must argue both sides of", body:`
<p class="l-lede">Naming options is mid-level. Comparing realistic alternatives and then <em>recommending</em> one, with a reason, is the senior behaviour. These are the nine that come up most.</p>

<ul class="clean">
  <li><b>Fan-out on write vs. on read.</b> Precompute each user's feed at write time (fast reads, brutal for accounts with millions of followers) or assemble at read time (cheap writes, slow reads). The real answer is a hybrid — fan-out on write for normal accounts, pull at read time for high-follower ones. Knowing the hybrid is the differentiator.</li>
  <li><b>Strong vs. eventual consistency.</b> Name the actual anomaly you are preventing. "Read-your-own-writes after posting" is a requirement; "we need strong consistency" is not an answer.</li>
  <li><b>Replication topology.</b> Leader-follower (simple, scales reads, has a failover gap), multi-leader (write availability, needs conflict resolution), leaderless quorum (tunable with R + W &gt; N).</li>
  <li><b>Sharding strategy.</b> Range (good for scans, prone to hotspots), hash (even distribution, no range scans), consistent hashing (minimal reshuffle when nodes join or leave). Then always address hot keys — it is the guaranteed follow-up.</li>
  <li><b>Caching strategy.</b> Cache-aside is the default. Write-through for read-heavy consistency. Write-behind absorbs writes at the cost of durability risk. Then: TTL with jitter, LRU eviction, and request coalescing to prevent stampedes.</li>
  <li><b>Delivery semantics.</b> Exactly-once is largely a fiction across a network. The real answer is at-least-once delivery plus an idempotent consumer — usually an idempotency key and a dedup store with a TTL.</li>
  <li><b>The dual-write problem.</b> Writing to a database and a queue is not atomic; one can succeed and the other fail. The transactional outbox pattern or change data capture is the answer, and naming it unprompted reads as genuinely senior.</li>
  <li><b>Rate limiting.</b> Token bucket allows bursts, leaky bucket smooths output, sliding-window counter is a memory-cheap approximation. Pick one and justify it from the requirement.</li>
  <li><b>Resilience primitives.</b> Retry with exponential backoff <em>and jitter</em> — the jitter is the part people omit and the part that prevents synchronised retry storms. Plus circuit breakers, bulkheads, timeouts everywhere, and graceful degradation.</li>
</ul>

<div class="callout">
  <span class="tag">CAP, said usefully</span>
  <p>"During a network partition you choose availability or consistency" is true and nearly useless, because partitions are rare. PACELC is the version worth saying: <em>else</em>, when the system is running normally, you are still trading latency against consistency — and that trade-off is live every single day, not just during an outage.</p>
</div>
` },

  { id:"6.5", title:"Your Azure advantage", body:`
<p class="l-lede">Most candidates discuss consistency and partitioning in the abstract. You have shipped both. Use the specifics — they are the most credible thing you can bring into a design round.</p>

<h3>Cosmos DB gives you concrete consistency language</h3>
<p>Cosmos exposes <strong>five</strong> consistency levels rather than the usual binary, and being able to name them changes the register of the conversation entirely:</p>
<div class="tbl"><table>
<thead><tr><th>Level</th><th>What it guarantees</th></tr></thead>
<tbody>
<tr><td><b>Strong</b></td><td>Linearizable — every read sees the latest committed write</td></tr>
<tr><td><b>Bounded staleness</b></td><td>Lag bounded by a chosen number of versions or a time window</td></tr>
<tr><td><b>Session</b></td><td>Read-your-own-writes within a session — the practical default</td></tr>
<tr><td><b>Consistent prefix</b></td><td>You never see writes out of order, only possibly behind</td></tr>
<tr><td><b>Eventual</b></td><td>No ordering guarantee; converges in time</td></tr>
</tbody></table></div>

<p>When an interviewer asks how you would stop a user from posting a comment and not seeing it on refresh, "session consistency" is a better answer than "we'd need strong consistency", and it is a much better answer than a vague one. The middle three levels are exactly the ones most candidates do not know exist.</p>

<h3>Partition keys, from experience</h3>
<p>You can speak first-hand about the real trade-off: a partition key with high cardinality distributes load evenly but makes cross-partition queries expensive, while a key aligned to your query pattern keeps reads cheap and risks hot partitions. Add the throughput dimension — provisioned capacity is divided across partitions, so a hot partition starves while the account looks underused overall — and you are describing something you have debugged rather than read about.</p>

<h3>Service Health is a notification system</h3>
<p>Event ingestion, subscription filtering, fan-out, multi-region delivery, at-least-once semantics. That is the canonical "design a notification system" question, and you have shipped it. Prepare it deliberately as <strong>both</strong> a worked design example (Six Worked Designs, lesson 3) and a behavioural story (Behavioural).</p>

<h3>Service Fabric for stateful systems</h3>
<p>Stateful services with partitioned reliable collections, rolling upgrades with health checks, automatic failover. If a design goes toward "where does the state live and what happens when a node dies mid-operation", you have a concrete reference point most candidates lack.</p>

<div class="callout gold">
  <span class="tag">How to use this without overplaying it</span>
  <p>Do not open with "at Microsoft we…" on every answer — it reads as deflection. Use it when it is load-bearing: the interviewer probes partitioning, or consistency, or what happens during a regional failover, and you reach for the concrete thing you have operated. One or two well-placed references per round is far stronger than six.</p>
</div>
` }
]},

/* ================= CH 7 ================= */
{ id:7, title:"Six Worked Designs", mins:120,
  sub:"Six done properly beats fifteen skimmed. The patterns transfer — once you can argue fan-out, you can design a feed, a notification system and a chat backend.",
  lessons:[

  { id:"7.1", title:"URL shortener", body:`
<p class="l-lede">The standard opener. It looks trivial, which is exactly why the interviewer is watching whether you find the interesting parts.</p>

<h4>Requirements worth pinning</h4>
<p>Shorten a URL, redirect a short code, optional custom alias, optional expiry. Out of scope: analytics, auth. <b>Read-heavy by a large margin</b> — say something like 100:1 and confirm it; that ratio drives the entire design.</p>

<h4>Scale</h4>
<p>Say 100 M new URLs per day. That is roughly 1,200 writes/s, and at 100:1 about 120,000 reads/s. At ~500 bytes per record, 100 M/day is ~50 GB/day, ~18 TB/year. Those three numbers justify everything that follows.</p>

<h3>The actual problem: generating the code</h3>
<p>This is where the round is won. Three options, and you should compare them rather than pick one silently.</p>
<div class="tbl"><table>
<thead><tr><th>Approach</th><th>Upside</th><th>Downside</th></tr></thead>
<tbody>
<tr><td><b>Hash the URL</b>, take the first 7 base62 chars</td><td>Stateless, deterministic, dedups identical URLs for free</td><td>Collisions are certain at scale — you need a check-and-retry loop, which costs a read on every write</td></tr>
<tr><td><b>Counter</b> encoded to base62</td><td>No collisions ever, shortest possible codes</td><td>Sequential IDs are guessable and enumerable; the counter is a single point of contention</td></tr>
<tr><td><b>Pre-generated key pool</b></td><td>No collisions, no contention on the write path, unguessable</td><td>An extra service and a key-exhaustion failure mode to operate</td></tr>
</tbody></table></div>
<p><b>Recommend:</b> counter-based with a per-server range allocation — each app server claims a block of, say, 10,000 IDs from a central allocator and hands them out locally. That removes the contention without collisions. 62⁷ is about 3.5 trillion codes, so seven characters is plenty.</p>

<h3>Storage and read path</h3>
<p>The access pattern is a pure key-value lookup by short code — no joins, no scans. That points at a key-value or document store partitioned on the short code, which distributes perfectly because the codes are effectively random. Put a cache in front holding the hot set; URL popularity is heavily skewed, so a small cache absorbs a large majority of reads.</p>

<div class="callout">
  <span class="tag">Deep dive to volunteer</span>
  <p><b>301 or 302?</b> A 301 permanent redirect lets browsers cache it, which cuts your traffic dramatically — and also means you can never change or revoke that mapping, and you lose all click visibility. A 302 keeps control and costs traffic. Raising this unprompted is a strong move because it shows you are thinking about the product, not just the boxes.</p>
</div>

<h4>What breaks first</h4>
<p>A single viral link becoming a hot key — solved by the cache, since it is read-only data. Then the ID allocator as a single point of failure — solved by the block-allocation scheme, since servers only touch it once per 10,000 URLs.</p>
` },

  { id:"7.2", title:"Rate limiter", body:`
<p class="l-lede">A small-surface problem with real depth. The interesting question is not the algorithm, it is making it accurate across many servers.</p>

<h4>Requirements</h4>
<p>Limit each API key to N requests per window. Return 429 with a <code>Retry-After</code> header when exceeded. Must add minimal latency and must fail <em>open</em> — if the limiter is down, you do not take the whole API down with it.</p>

<h3>The four algorithms</h3>
<div class="tbl"><table>
<thead><tr><th>Algorithm</th><th>Behaviour</th><th>Cost</th></tr></thead>
<tbody>
<tr><td><b>Fixed window</b></td><td>Count per clock window</td><td>Allows a 2× burst straddling the boundary</td></tr>
<tr><td><b>Sliding window log</b></td><td>Exact — stores every timestamp</td><td>Memory grows with request volume</td></tr>
<tr><td><b>Sliding window counter</b></td><td>Weighted blend of current and previous window</td><td>Approximate, but two counters per key</td></tr>
<tr><td><b>Token bucket</b></td><td>Tokens refill at a steady rate; a request costs one</td><td>Two values per key; allows controlled bursts</td></tr>
</tbody></table></div>
<p><b>Recommend token bucket</b> for a public API: it permits the natural bursts real clients produce while still bounding the sustained rate, and it needs only a token count and a last-refill timestamp per key.</p>

<h3>The real problem: distribution</h3>
<p>With fifty app servers, per-server counters give an effective limit fifty times higher than intended. Three ways out:</p>
<ol class="steps">
  <li><b>Centralised counter in Redis</b>Correct and simple. Costs a network round trip per request (~0.5 ms) and makes Redis a dependency on every call. Do the increment-and-check in a single atomic operation — a Lua script or an atomic counter — or you have a race between read and write.</li>
  <li><b>Local counters, periodic sync</b>Fast, approximate, and it drifts. Acceptable when the limit is a guardrail against abuse rather than a billing boundary.</li>
  <li><b>Sticky routing by API key</b>Route each key to a fixed server so its counter lives in one place. Fast and exact, but rebalancing on server changes is painful and it undermines even load distribution.</li>
</ol>
<p>Recommend centralised Redis for correctness, with local counters as a degraded fallback when Redis is unreachable — which also satisfies the fail-open requirement.</p>

<div class="callout gold">
  <span class="tag">The follow-up they will ask</span>
  <p>"What if Redis goes down?" The answer is not "we add a replica". It is: <b>decide the failure policy first.</b> For abuse prevention, fail open — a brief window of unlimited traffic beats an outage. For anything billing-related or safety-critical, fail closed. Naming that as a product decision rather than a technical one is the senior answer.</p>
</div>
` },

  { id:"7.3", title:"Notification & fan-out", body:`
<p class="l-lede">Your home ground. This is structurally what Azure Service Health does, so prepare it as your strongest design and be ready to say so.</p>

<h4>Requirements</h4>
<p>Accept events from many producers. Match each event against subscriptions. Deliver via multiple channels (push, email, webhook). Respect per-user preferences and quiet hours. At-least-once delivery with no duplicates visible to the user. Retry failures with backoff.</p>

<h3>The pipeline</h3>
<pre><code>producers -> ingestion API -> event log (partitioned)
          -> matcher service -> per-channel queues
          -> delivery workers -> providers (APNs / FCM / SMTP / webhook)
                              -> dead letter queue</code></pre>

<h3>Deep dive one: subscription matching</h3>
<p>The naive approach — scan all subscriptions per event — is O(subscriptions) per event and dies immediately. Invert it: index subscriptions by their filter attributes so an incoming event looks up only the matching set. For Service-Health-shaped data that means indexing on region, service and impact type, then intersecting the candidate sets. Keep the index in memory on the matcher nodes and rebuild it from a change feed, because it is read constantly and written rarely.</p>

<h3>Deep dive two: at-least-once without visible duplicates</h3>
<p>You cannot get exactly-once across a network. What you can get:</p>
<ul class="clean">
  <li>Assign every notification a deterministic <b>idempotency key</b> — a hash of event ID plus user ID plus channel.</li>
  <li>Before dispatching, write that key to a dedup store with a TTL. If it is already present, drop the message.</li>
  <li>Make the write conditional (insert-if-absent) so two workers racing on the same message cannot both proceed.</li>
</ul>
<p>The result is at-least-once delivery with an idempotent consumer, which users experience as exactly-once. Say it in exactly those terms.</p>

<h3>Deep dive three: the dual-write trap</h3>
<p>The ingestion service must record the event and publish it to the queue. Those are two systems and there is no transaction across them — a crash between them loses the event silently. Use the <b>transactional outbox</b>: write the event and an outbox row in one database transaction, then have a separate relay read the outbox and publish. Raising this unprompted is one of the strongest single moves available in a design round.</p>

<h4>What breaks first</h4>
<p>A broadcast event matching millions of subscriptions — one message in, millions out. Handle it by chunking the fan-out into batched work items rather than one message per recipient, and by giving broadcast traffic its own queue so it cannot starve normal notifications. Then: a slow downstream provider backing up the queue, which needs per-channel isolation (bulkheads) and a circuit breaker.</p>
` },

  { id:"7.4", title:"News feed", body:`
<p class="l-lede">The canonical fan-out problem. There is a known right answer and the interviewer is checking whether you reach it or stop one step short.</p>

<h4>Requirements</h4>
<p>Post content. View a feed of posts from accounts you follow, newest first. Heavily read-skewed — say 100:1. Feed load must be fast, low hundreds of milliseconds. Eventual consistency is acceptable: a post appearing a few seconds late is fine.</p>

<h3>The central trade-off</h3>
<div class="tbl"><table>
<thead><tr><th></th><th>Fan-out on write</th><th>Fan-out on read</th></tr></thead>
<tbody>
<tr><td><b>How</b></td><td>On posting, push the post ID into every follower's precomputed feed</td><td>On viewing, query everyone the user follows and merge</td></tr>
<tr><td><b>Read</b></td><td>Very fast — one lookup</td><td>Slow — N queries plus a merge</td></tr>
<tr><td><b>Write</b></td><td>Expensive, proportional to follower count</td><td>Cheap — one insert</td></tr>
<tr><td><b>Breaks on</b></td><td>Accounts with millions of followers</td><td>Users who follow thousands of accounts</td></tr>
</tbody></table></div>

<h3>The answer is the hybrid</h3>
<p>Fan-out on write for ordinary accounts, and for high-follower accounts do nothing at write time — pull their recent posts at read time and merge them into the precomputed feed. Set a threshold (say, more than 100,000 followers) and treat those accounts differently.</p>
<p>This is the expected answer. A candidate who picks one strategy and defends it has given a mid-level answer; a candidate who identifies the celebrity problem and resolves it with the hybrid has given the senior one.</p>

<h3>Deep dive: what the feed actually stores</h3>
<p>Store post <em>IDs</em>, not post content. The feed becomes a list of IDs per user — cheap to write, cheap to store, and hydrated from a post cache at read time. It also means editing or deleting a post does not require touching millions of feed rows. Cap each feed at a few hundred entries; nobody scrolls past that and unbounded feeds are an unbounded storage bill.</p>

<h3>Deep dive: the write amplification number</h3>
<p>Make this concrete out loud. A user with 1,000 followers posting once creates 1,000 feed writes. Ten million posts a day at an average of 500 followers is five billion feed writes a day — about 58,000 writes/s sustained, and double that at peak. That number is why the celebrity case cannot be handled the same way, and computing it unprompted is exactly the capacity-estimate habit from lesson 6.1.</p>

<h4>What breaks first</h4>
<p>A very large account posting, creating a write storm. Then the merge path for users who follow many celebrity accounts, since they get the least benefit from precomputation. Cache the recent posts of high-follower accounts aggressively — there are few of them and everybody reads them.</p>
` },

  { id:"7.5", title:"Chat & messaging", body:`
<p class="l-lede">The design that forces you to talk about connections rather than requests. Ordering and offline delivery are where the depth is.</p>

<h4>Requirements</h4>
<p>One-to-one messaging, delivered in real time. Message history. Delivery and read receipts. Online presence. Messages must survive the recipient being offline. Ordering must be consistent within a conversation.</p>

<h3>Connections, not requests</h3>
<p>Real-time delivery needs a persistent connection — WebSockets. That changes the shape of the system in ways worth naming:</p>
<ul class="clean">
  <li>Connections are <b>stateful</b>, so load balancing is about connection count, not request rate, and a deploy drops every connection unless you drain carefully.</li>
  <li>You need a <b>session registry</b> — which user is connected to which gateway node — so a message can be routed to the right box. Keep it in a fast shared store with a TTL and a heartbeat.</li>
  <li>A single node holds tens of thousands of open connections, so <b>node failure is a mass reconnect event</b>. Reconnect with jittered backoff or you get a thundering herd onto the remaining nodes.</li>
</ul>

<h3>Deep dive: ordering</h3>
<p>Client timestamps cannot be trusted — clocks drift and clients lie. Assign a <b>per-conversation sequence number</b> server-side at write time. Because messages in one conversation go to one partition, that partition provides a single authority for the sequence, and the client sorts by it. Global ordering across conversations is neither needed nor achievable cheaply, and saying that explicitly is a good scope cut.</p>

<h3>Deep dive: offline delivery and sync</h3>
<p>Do not treat "deliver now" and "store history" as separate systems. Persist every message first, then attempt real-time delivery as an optimisation. When a client reconnects it sends the last sequence number it has, and the server returns everything after it. That one design choice makes offline delivery, multi-device sync and reconnect-after-network-blip all the same code path.</p>

<h3>Storage</h3>
<p>The access pattern is "fetch the most recent N messages in conversation X", which points at a wide-column store partitioned by conversation ID and clustered by sequence descending. That gives you the newest messages as a contiguous read. Old conversations tier to cheaper storage; almost all reads hit recent data.</p>

<h4>What breaks first</h4>
<p>Presence. It sounds trivial and it is the heaviest thing in the system — naive presence means every user's status change notifies every contact, which is a fan-out problem hiding inside a chat app. Mitigate by only computing presence for conversations the user currently has open, and by accepting staleness of a few seconds.</p>
` },

  { id:"7.6", title:"Distributed job scheduler", body:`
<p class="l-lede">The design that is really about failure. Everything interesting happens when a worker dies holding a job.</p>

<h4>Requirements</h4>
<p>Schedule jobs to run at a time, or on a recurring schedule. Execute each job at least once, ideally exactly once. Survive worker crashes. Retry failures with backoff. Scale to millions of scheduled jobs.</p>

<h3>The structure</h3>
<pre><code>scheduler API -> job store (partitioned by due time)
             -> dispatcher (polls for due jobs, claims them)
             -> worker pool -> execution
                            -> completion / retry / dead letter</code></pre>

<h3>Deep dive: claiming a job safely</h3>
<p>This is the heart of it. A naive "read due jobs, then mark them running" races — two dispatchers read the same job and both run it. You need an atomic claim:</p>
<ul class="clean">
  <li><b>Lease-based claiming.</b> A dispatcher atomically sets <code>owner</code> and <code>leaseExpiry</code> on the job in a single conditional update that only succeeds if the job is unclaimed or its lease has expired. Losing the race is a normal outcome, not an error.</li>
  <li><b>Heartbeat to extend.</b> A long-running job renews its lease periodically. If the worker dies, the lease simply expires and another dispatcher picks the job up.</li>
  <li><b>Short leases.</b> Long leases mean slow recovery from a crash; very short ones mean healthy jobs get stolen mid-flight. Sixty seconds with a twenty-second heartbeat is a reasonable starting point to state.</li>
</ul>

<h3>Deep dive: at-least-once, and why exactly-once is a lie</h3>
<p>A worker can complete a job and crash before recording completion. The job will run again. There is no way around this, so the correct framing is: <b>the system guarantees at-least-once, and job handlers must be idempotent.</b> Provide an execution ID that handlers can use to dedup. Be explicit that this is a contract you are pushing onto the job author, because pretending otherwise is the wrong answer.</p>

<h3>Deep dive: finding due jobs efficiently</h3>
<p>Scanning all jobs for "is it due" does not scale past a few million. Partition the job store by time bucket — one partition per minute, say — so the dispatcher only reads the current and previous buckets. That turns a full scan into a bounded read regardless of total job count. For recurring jobs, insert the next occurrence at completion time rather than storing an infinite series.</p>

<h4>What breaks first</h4>
<p>A thundering herd at round times — enormous numbers of jobs scheduled for exactly midnight or exactly the top of the hour, because humans pick round numbers. Add jitter on scheduling, or smear execution across the bucket. This is a genuinely common production problem and naming it marks you as someone who has operated a system rather than designed one on paper.</p>

<div class="callout good">
  <span class="tag">Six Worked Designs wrap</span>
  <p>Six designs, and the pieces recur: partitioning, idempotency, leases, fan-out, hot keys, the outbox. That recurrence is the point — you are not memorising six systems, you are accumulating a small set of moves you can assemble against a question you have never seen.</p>
</div>
` }
]},

/* ================= CH 8 ================= */
{ id:8, title:"The New Rounds", mins:25,
  sub:"Two formats that did not exist when you last interviewed. Both reward production instincts, and both are easy to fail by not preparing for them at all.",
  lessons:[

  { id:"8.1", title:"Debug-this-code", body:`
<p class="l-lede">You are handed unfamiliar broken code and a failing case. You are graded on process far more than speed — which makes this the most learnable round in the loop.</p>

<ul class="clean">
  <li><b>Read the failing test first.</b> It tells you what the code is supposed to do, which is information you would otherwise have to infer from the implementation — and the implementation is wrong.</li>
  <li><b>State a hypothesis before touching anything.</b> "This looks like an off-by-one in the loop bound, let me check that first." Narrating the hypothesis <em>is</em> the graded behaviour. Silent correct debugging scores worse than spoken methodical debugging.</li>
  <li><b>Bisect, do not stare.</b> Halve the search space with a print or a breakpoint. Say what you expect to see <em>before</em> you look — that is what makes it an experiment rather than a guess.</li>
  <li><b>Change one thing at a time.</b> Two simultaneous edits and you no longer know which one mattered.</li>
  <li><b>When you find it, say why it was not caught.</b> Missing test case, unclear contract, a race that only appears under load. That is the senior half of the answer and it takes ten seconds.</li>
</ul>

<h3>The bugs that get planted</h3>
<p>They tend to come from a small family: off-by-one in a boundary, a mutation during iteration, an incorrect early return, a shared mutable default, an integer overflow, a comparison that should be <code>&lt;=</code>, or a condition inverted. Knowing the family means you can check the likely candidates fast rather than reading top to bottom.</p>

<div class="callout gold">
  <span class="tag">How to practise it</span>
  <p>Take three problems you have already solved. Introduce one subtle bug in each — the kind above, not a syntax error. Leave them for a week. Then debug them cold, out loud, timing yourself. This is scheduled for week three, Sunday, in the 28-Day Schedule.</p>
  <p>It feels artificial and it works, because the skill being trained is <em>reading unfamiliar code under time pressure</em> and code you wrote a week ago is genuinely unfamiliar.</p>
</div>
` },

  { id:"8.2", title:"The AI-assisted round", body:`
<p class="l-lede">They hand you a tool deliberately. They are measuring judgement, not typing speed — and they will often seed a subtly wrong suggestion to see whether you catch it.</p>

<ul class="clean">
  <li><b>Say what you are asking for, and why, before you ask.</b> The reasoning is the artifact being graded. An unnarrated prompt tells the interviewer nothing about you.</li>
  <li><b>Read every line before accepting it.</b> Out loud: "this handles the base case but I do not think it covers an empty input — let me check."</li>
  <li><b>Write the test yourself.</b> Verification is the skill on display. Generated code you verified beats hand-written code you did not.</li>
  <li><b>Reject something, and say why.</b> If nothing genuinely warrants rejection, say what you checked and why you are satisfied. Silent acceptance is the losing move in both directions.</li>
  <li><b>Keep ownership of the design.</b> Use the tool for the mechanical parts. Decide the approach yourself and say that is what you are doing.</li>
</ul>

<h3>On take-homes</h3>
<p>Assume you will defend every decision live. Do not submit a single line you cannot explain and justify under questioning — that is now the most common way take-homes are failed, and it is entirely avoidable. If you used a generated approach you do not fully understand, either understand it or replace it before submitting.</p>

<div class="callout">
  <span class="tag">The through-line of both new rounds</span>
  <p>Every change in 2026 pushes the same direction: away from recall, toward demonstrated reasoning. That is good news for someone four years into shipping production systems and rusty on puzzle recall — which is precisely your situation. Narrate everything, and the rust matters far less than you think it does.</p>
</div>
` }
]},

/* ================= CH 9 ================= */
{ id:9, title:"Behavioural & the Senior Bar", mins:55,
  sub:"You are applying for both SWE II and Senior. The technical content is identical; what differs is behaviour in the room and framing on the page.",
  lessons:[

  { id:"9.1", title:"The SWE II → Senior gap", body:`
<p class="l-lede">Most of the distinction reduces to one thing: who is steering the conversation. Nearly all of it is free to adopt.</p>

<div class="tbl"><table>
<thead><tr><th>Dimension</th><th>Mid-level</th><th>Senior</th></tr></thead>
<tbody>
<tr><td>Scope</td><td>Waits for the interviewer to define the problem</td><td>Proposes scope, states assumptions, explicitly cuts what is out</td></tr>
<tr><td>Depth</td><td>One component explored well</td><td>Two or three deep dives, chosen by risk, unprompted</td></tr>
<tr><td>Failure</td><td>Discusses failure when asked</td><td>Asks "what breaks first as this grows?" and designs around it from the start</td></tr>
<tr><td>Trade-offs</td><td>Names the options</td><td>Compares realistic alternatives and <em>makes a recommendation</em></td></tr>
<tr><td>Operations</td><td>Ends at the architecture diagram</td><td>Covers monitoring, rollout, migration, on-call burden, cost</td></tr>
<tr><td>Behavioural</td><td>"I built X"</td><td>"I saw the problem, aligned three people, and here is what changed after"</td></tr>
<tr><td>Disagreement</td><td>Accepts the interviewer's pushback</td><td>Engages, then either updates the design or defends it with reasoning</td></tr>
</tbody></table></div>

<div class="callout gold">
  <span class="tag">The single highest-leverage change</span>
  <p><b>Drive the conversation.</b> If the interviewer is pulling information out of you, you read mid-level. If you are narrating a structured path and pausing to check alignment, you read senior. This costs nothing and you can adopt it today.</p>
</div>

<h3>Where framing genuinely matters</h3>
<p>Four years and three products at Microsoft is a solid Senior case — but only if you present <em>impact and influence</em> rather than tasks completed. Compare:</p>
<div class="tbl"><table>
<tbody>
<tr><td><b>Mid-level phrasing</b></td><td>"Migrated the notification pipeline."</td></tr>
<tr><td><b>Senior phrasing</b></td><td>"Identified that the pipeline would not hold projected load, built the case, got two teams aligned on the migration, and led it — cutting p99 by X and on-call pages by Y."</td></tr>
</tbody></table></div>
<p>Same work. The second version names the judgement, the influence, and the outcome. Go through your résumé line by line and ask of each: <em>does this say what I did, or does it say what changed because I did it?</em></p>
` },

  { id:"9.2", title:"The eight stories", body:`
<p class="l-lede">Nearly every behavioural question is a re-skin of one of eight. Prepared once, they carry the entire loop.</p>

<div class="tbl"><table>
<thead><tr><th class="nc">#</th><th>Story</th><th>Must demonstrate</th></tr></thead>
<tbody>
<tr><td class="nc">1</td><td>Hardest technical problem you solved</td><td>Depth, systematic debugging, judgement under uncertainty</td></tr>
<tr><td class="nc">2</td><td>Conflict with a peer</td><td>You engaged rather than escalated or avoided; the relationship survived</td></tr>
<tr><td class="nc">3</td><td>Disagreed with your manager or a senior</td><td>You made the case with data — and can say what you would do if overruled</td></tr>
<tr><td class="nc">4</td><td>A failure: a bug you shipped, an outage you caused</td><td>Ownership without self-flagellation; the concrete systemic fix after</td></tr>
<tr><td class="nc">5</td><td>Led something without formal authority</td><td><b>The critical Senior story.</b> Influence over people who do not report to you</td></tr>
<tr><td class="nc">6</td><td>Ambiguous problem you had to define</td><td>You created clarity rather than waiting for a spec</td></tr>
<tr><td class="nc">7</td><td>Mentored someone or raised the team's bar</td><td>Impact beyond your own commits — the other key Senior signal</td></tr>
<tr><td class="nc">8</td><td>Delivered under real pressure</td><td>Prioritisation and scope-cutting, not heroics and all-nighters</td></tr>
</tbody></table></div>

<h3>Sourcing them from your four years</h3>
<p>Three products — Skylight, Quality Hub and CM, and Azure Service Health — is an advantage here, because a loop that hears the same project three times starts to wonder about your range. Spread your eight across all three. The Service Health work almost certainly supplies stories 1 and 5, and it doubles as your strongest system design reference.</p>

<div class="callout">
  <span class="tag">Two rules for the set</span>
  <p><b>At least one story where you were wrong.</b> A candidate with eight stories in which they were right throughout is a candidate the interviewer stops believing. Story 4 is the obvious slot; do not soften it into a near-miss.</p>
  <p><b>Story 5 is the one to over-prepare.</b> "Led without authority" is the single most reliable discriminator between a mid-level and a senior hire, and it is the one people most often have to invent on the spot. Find the real instance now, while you have four weeks.</p>
</div>
` },

  { id:"9.3", title:"Structuring a story", body:`
<p class="l-lede">Sixty seconds of structure beats three minutes of narrative. Four beats, and the last one is the one almost everybody omits.</p>

<ol class="steps">
  <li><span class="t">15 sec</span><b>Situation and stakes</b>Enough context to make it matter. What would have gone wrong if nobody had acted? Skip the org chart and the project history.</li>
  <li><span class="t">20 sec</span><b>What you specifically did</b>"I", not "we". Interviewers cannot give credit to a team. Include the judgement call, not just the action — <em>why</em> you chose that path over the obvious one.</li>
  <li><span class="t">15 sec</span><b>Result, quantified where you can</b>Latency, incidents, hours saved, people unblocked. An honest estimate with a stated basis beats no number at all.</li>
  <li><span class="t">10 sec</span><b>What changed afterwards</b>The reflection, or the process change that outlived the incident. <b>This is the beat that distinguishes a senior story and nearly everyone leaves it out.</b></li>
</ol>

<h3>Memorise the beats, not the words</h3>
<p>Write them out in full once — the writing is what clarifies them. Then practise out loud until you can tell each in under two minutes <em>without</em> reading. Do not memorise verbatim; recited answers land badly and you cannot adapt them when the question comes in at a slightly different angle.</p>

<h3>Handling the follow-up</h3>
<p>Good interviewers push on one detail: "what would you do differently?", "what did the other person say?", "how did you know that was the cause?". Prepare one layer deeper than the story itself for each of the eight. The follow-up is where the story is actually evaluated — the first telling is just setup.</p>

<div class="callout">
  <span class="tag">On the failure story specifically</span>
  <p>Take ownership cleanly and stop. Do not over-apologise, do not spread the blame, and do not pick a failure that was secretly a success. The structure is: here is what broke, here is my part in it, here is what I did immediately, and here is the systemic change that means it cannot happen the same way again. Calm ownership reads as senior; excessive contrition reads as junior.</p>
</div>
` },

  { id:"9.4", title:"Questions to ask them", body:`
<p class="l-lede">Have four ready, specific enough to actually reveal something. Generic questions are a small negative signal; sharp ones are a real positive.</p>

<ul class="clean">
  <li><b>"What does the on-call rotation actually look like?"</b> Frequency, what typically pages, whether anyone is fixing the causes. Tells you more about engineering culture than any values page.</li>
  <li><b>"What is the thing about this codebase that would most surprise me in month one?"</b> Invites an honest answer about tech debt and usually gets one.</li>
  <li><b>"How does work get decided here — who picks what the team builds?"</b> Distinguishes teams that receive a roadmap from teams that shape one. Directly relevant to whether Senior scope is available.</li>
  <li><b>"What separates someone doing well at this level from someone struggling?"</b> <b>Particularly useful when targeting Senior</b> — the answer tells you the exact bar you are being measured against, and you can often address it before the loop ends.</li>
</ul>

<h3>One you should ask if the level is ambiguous</h3>
<p>If you are interviewing against a range, ask directly and early: <em>"What would you need to see from me today to be confident at the senior level?"</em> Most interviewers will tell you. Then spend the round showing them that. Candidates rarely ask this and it is close to free information.</p>

<h3>What not to ask</h3>
<p>Anything answerable from the careers page. Anything about compensation before an offer conversation. And do not ask "what do you like about working here?" — it produces a rehearsed answer and tells you nothing.</p>

<div class="callout good">
  <span class="tag">Behavioural wrap</span>
  <p>The technical chapters are the bulk of the work, but this is the chapter that decides your <em>level</em>. Two hours on the eight stories is worth more to your offer than another twenty LeetCode problems, and it is the part candidates most reliably skip.</p>
</div>
` }
]},

/* ================= CH 10 ================= */
{ id:10, title:"The 28-Day Schedule", mins:15,
  sub:"Everything above, laid onto a calendar. One hour on weekdays, four on Saturdays, three on Sundays. Day one is Monday 28 September.",
  lessons:[

  { id:"10.1", title:"Week 1 — Rebuild the core", body:`
<p class="l-lede">Arrays, hashing, two pointers, sliding window, binary search. This week is about making the basics automatic again.</p>

<div class="tbl"><table>
<thead><tr><th>Day</th><th class="nc">Time</th><th>Work</th></tr></thead>
<tbody>
<tr><td><b>Mon</b></td><td class="nc">1 hr</td><td>Orientation end to end, then the C# toolkit lessons 1–3. Read, do not drill yet.</td></tr>
<tr><td><b>Tue</b></td><td class="nc">1 hr</td><td>Finish the C# toolkit including the quick check. Then lesson 3.1 and its drill.</td></tr>
<tr><td><b>Wed</b></td><td class="nc">1 hr</td><td>Lesson 3.2 — two pointers. Full drill.</td></tr>
<tr><td><b>Thu</b></td><td class="nc">1 hr</td><td>Lesson 3.3 — sliding window. Drill items 1–4; leave Minimum Window for Saturday.</td></tr>
<tr><td><b>Fri</b></td><td class="nc">1 hr</td><td>Lesson 3.4 — binary search, including the answer-space variant.</td></tr>
<tr><td><b>Sat</b></td><td class="nc">4 hrs</td><td><b>1:</b> re-solve Tue and Wed problems cold. <b>2:</b> Minimum Window Substring, properly. <b>3:</b> lesson 3.5 and its drill. <b>4:</b> System Design Foundations lessons 1 and 3 — write the 45-minute frame on paper from memory.</td></tr>
<tr><td><b>Sun</b></td><td class="nc">3 hrs</td><td><b>1:</b> lesson 5.2 — stacks and monotonic stack, drill items 1–3. <b>2:</b> linked lists — Reverse, Merge Two Sorted, Cycle. <b>3:</b> re-solve one problem entirely out loud, recorded. Watch it back.</td></tr>
</tbody></table></div>

<div class="callout gold">
  <span class="tag">That last hour</span>
  <p>Recording yourself will be uncomfortable and it is the most useful hour of the week. You are looking for two things: how long you go silent while thinking, and whether you state an approach before you start typing. Almost everyone fails both on the first attempt.</p>
</div>
` },

  { id:"10.2", title:"Week 2 — Trees, graphs, heaps", body:`
<p class="l-lede">The highest-frequency territory in the interview, plus your first two full system designs under a clock.</p>

<div class="tbl"><table>
<thead><tr><th>Day</th><th class="nc">Time</th><th>Work</th></tr></thead>
<tbody>
<tr><td><b>Mon</b></td><td class="nc">1 hr</td><td>Lesson 4.1 — tree DFS. Full drill. Ask the two questions out loud on every problem.</td></tr>
<tr><td><b>Tue</b></td><td class="nc">1 hr</td><td>Lesson 4.2 — BSTs. Full drill.</td></tr>
<tr><td><b>Wed</b></td><td class="nc">1 hr</td><td>Lesson 4.3 — BFS. Drill items 1–4.</td></tr>
<tr><td><b>Thu</b></td><td class="nc">1 hr</td><td>Lesson 4.4 — graphs and topological sort. Write Kahn's from memory before starting.</td></tr>
<tr><td><b>Fri</b></td><td class="nc">1 hr</td><td>Lesson 4.5 — heaps. Drill items 1–4. Re-read 2.2 first.</td></tr>
<tr><td><b>Sat</b></td><td class="nc">4 hrs</td><td><b>1:</b> re-solve three week-one problems cold. <b>2:</b> System Design Foundations lessons 2, 4 and 5. <b>3–4:</b> designs 7.1 and 7.2, timed at 45 min each, out loud, on paper. Then review against the frame — where did you overrun?</td></tr>
<tr><td><b>Sun</b></td><td class="nc">3 hrs</td><td><b>1–2:</b> Word Ladder, Pacific Atlantic, Find Median from Stream — timed, 25 min each. <b>3:</b> Behavioural lessons 1 and 2; draft all eight stories as bullets. Do not polish.</td></tr>
</tbody></table></div>

<div class="callout">
  <span class="tag">Checkpoint</span>
  <p>By Sunday night you should be able to write a BFS with the level-size loop, and Kahn's algorithm, without reference. If you cannot, spend Monday of week three on that instead of moving forward. These two appear more often than anything else in this course.</p>
</div>
` },

  { id:"10.3", title:"Week 3 — The harder patterns", body:`
<p class="l-lede">Intervals, backtracking, DP, and the design deep dives. This is the heaviest week — protect the weekend blocks.</p>

<div class="tbl"><table>
<thead><tr><th>Day</th><th class="nc">Time</th><th>Work</th></tr></thead>
<tbody>
<tr><td><b>Mon</b></td><td class="nc">1 hr</td><td>Lesson 5.1 — intervals. Full drill including the sweep line.</td></tr>
<tr><td><b>Tue</b></td><td class="nc">1 hr</td><td>Lesson 5.3 — backtracking. Drill items 1–3.</td></tr>
<tr><td><b>Wed</b></td><td class="nc">1 hr</td><td>Finish the backtracking drill. Then Largest Rectangle in Histogram from 5.2.</td></tr>
<tr><td><b>Thu</b></td><td class="nc">1 hr</td><td>Lesson 5.4 — DP. Drill items 1–3. Define the state out loud every time.</td></tr>
<tr><td><b>Fri</b></td><td class="nc">1 hr</td><td>DP drill items 4–5. Stop at Longest Common Subsequence; do not chase Edit Distance.</td></tr>
<tr><td><b>Sat</b></td><td class="nc">4 hrs</td><td><b>1:</b> re-solve week-two graph problems cold. <b>2–3:</b> designs 7.3 and 7.4 — 45 min each. Use Service Health explicitly in 7.3. <b>4:</b> go deep on the celebrity problem and hot partitions.</td></tr>
<tr><td><b>Sun</b></td><td class="nc">3 hrs</td><td><b>1:</b> The New Rounds lesson 1 — debug three problems you bugged a week ago. <b>2:</b> The New Rounds lesson 2 — solve a new medium with an AI assistant, verifying out loud. <b>3:</b> read your one-line log; list your three weakest patterns.</td></tr>
</tbody></table></div>

<div class="callout gold">
  <span class="tag">Set this up now</span>
  <p>Sunday's debug session needs bugged code that is a week old. <b>Do it on the Sunday of week two</b> — take three solved problems, introduce one subtle bug in each, and do not look at them again until week three.</p>
</div>
` },

  { id:"10.4", title:"Week 4 — Simulate and sharpen", body:`
<p class="l-lede">No new material. Mocks under real conditions, then patch exactly what the mocks expose.</p>

<div class="tbl"><table>
<thead><tr><th>Day</th><th class="nc">Time</th><th>Work</th></tr></thead>
<tbody>
<tr><td><b>Mon</b></td><td class="nc">1 hr</td><td><b>Mock coding round.</b> Two unseen mediums, 45 min total, narrated, recorded, no pausing, no notes open.</td></tr>
<tr><td><b>Tue</b></td><td class="nc">1 hr</td><td>Watch the recording. Where did you go silent? Where did you code before stating the approach? Re-solve the weaker problem properly.</td></tr>
<tr><td><b>Wed</b></td><td class="nc">1 hr</td><td><b>Mock system design</b> — design 7.5, chat, 45 min out loud against the clock. Force two deep dives without prompting.</td></tr>
<tr><td><b>Thu</b></td><td class="nc">1 hr</td><td>Behavioural lessons 3 and 4. Take all eight stories to finished; tell each out loud under two minutes.</td></tr>
<tr><td><b>Fri</b></td><td class="nc">1 hr</td><td>Re-solve your three weakest patterns. Write your four questions for interviewers.</td></tr>
<tr><td><b>Sat</b></td><td class="nc">4 hrs</td><td><b>Full loop simulation</b>, back to back with no long breaks: 45 min coding, 45 min design (7.6, the job scheduler), 45 min behavioural, then review.</td></tr>
<tr><td><b>Sun</b></td><td class="nc">2 hrs</td><td>Read your one-line log end to end. Skim the pattern lessons and the numbers table. <b>Learn nothing new.</b> Rest.</td></tr>
</tbody></table></div>

<div class="callout">
  <span class="tag">Why Saturday is back-to-back</span>
  <p>A real loop is four to five hours and it is exhausting in a way that practising one round at a time never reveals. Most people's fourth interview is visibly worse than their first. Finding that out on a Saturday at home is considerably better than finding it out on the day.</p>
</div>

<div class="callout good">
  <span class="tag">And then</span>
  <p>Twenty-eight days, about 47 hours, roughly 62 problems and six designs. That is a real rebuild — not a complete education, but enough to walk into a loop with the patterns firing and the narration natural. The rust you are worried about is mostly recall, and recall is exactly what four weeks of deliberate practice fixes.</p>
</div>
` }
]}
];
