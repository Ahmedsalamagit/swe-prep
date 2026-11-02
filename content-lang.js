/* Languages: side-by-side comparison, Python, Java, JavaScript, SQL. (C# lives in content.js, chapter 2.) */
window.COURSE = window.COURSE || [];
window.COURSE.push(

/* ================= SIDE BY SIDE ================= */
{ id:"cmp", title:"Side by Side — How the Languages Differ", mins:50,
  sub:"C#, Python, Java and JavaScript compared on exactly what matters in an interview: collections, the heap, sorting, strings, numbers, equality and the traps that differ.",
  lessons:[

  { id:"cmp.1", title:"Choosing your language, and the big differences", body:`
<p class="l-lede">Interview in the language you write daily — for you, C#. Know the others well enough to read an interviewer's starter code and to recognise when another language would have made a problem shorter.</p>

<h3>At a glance</h3>
<div class="tbl"><table>
<tr><th></th><th>C#</th><th>Python</th><th>Java</th><th>JavaScript</th></tr>
<tr><td>Typing</td><td>Static, inferred with <code>var</code></td><td>Dynamic (optional hints)</td><td>Static, <code>var</code> since 10</td><td>Dynamic (TypeScript adds static)</td></tr>
<tr><td>Verbosity in interviews</td><td>Medium</td><td>Lowest</td><td>Highest</td><td>Low</td></tr>
<tr><td>Integers</td><td>32-bit <code>int</code>, 64-bit <code>long</code>, wraps</td><td>Arbitrary precision</td><td>32-bit <code>int</code>, 64-bit <code>long</code>, wraps</td><td>64-bit float; exact to 2⁵³; <code>BigInt</code></td></tr>
<tr><td>Built-in heap</td><td><code>PriorityQueue&lt;E,P&gt;</code></td><td><code>heapq</code> (min)</td><td><code>PriorityQueue</code> (min)</td><td><b>None</b></td></tr>
<tr><td>Sorted map/set</td><td><code>SortedDictionary</code>, <code>SortedSet</code></td><td><b>None</b> in stdlib (bisect on list)</td><td><code>TreeMap</code>, <code>TreeSet</code></td><td><b>None</b></td></tr>
<tr><td>Strings</td><td>Immutable, UTF-16</td><td>Immutable, Unicode code points</td><td>Immutable, UTF-16</td><td>Immutable, UTF-16</td></tr>
<tr><td>Default sort</td><td>Unstable (introsort)</td><td>Stable</td><td>Stable for objects; unstable for primitives</td><td>Stable, but <b>string compare</b> by default</td></tr>
<tr><td>Memoise</td><td>Dictionary by hand</td><td><code>@cache</code></td><td>HashMap by hand</td><td>Map by hand</td></tr>
<tr><td>Recursion depth</td><td>~10k+ frames, uncatchable overflow</td><td>1000 default</td><td>~10k+ frames</td><td>~10k frames</td></tr>
<tr><td>Parallelism</td><td>Real threads, <code>async/await</code></td><td>GIL; processes for CPU work</td><td>Real threads, virtual threads (21+)</td><td>Single-threaded event loop</td></tr>
</table></div>

<h3>Where each language wins a problem</h3>
<ul class="clean">
  <li><b>Python</b> — fewest lines: <code>Counter</code>, <code>defaultdict</code>, slicing, tuple keys, <code>@cache</code>, big ints. Most interviewers can read it.</li>
  <li><b>C#</b> — LINQ, tuples, records, pattern matching; a real <code>PriorityQueue</code> with separate priority; <code>SortedSet</code> with <code>GetViewBetween</code>.</li>
  <li><b>Java</b> — <code>TreeMap</code>'s <code>floorKey</code>/<code>ceilingKey</code> are unmatched for interval and calendar problems. Very common at Amazon and Google.</li>
  <li><b>JavaScript</b> — fine for most problems; painful for heap, sorted-map and big-integer problems. Expected for front-end roles.</li>
</ul>

<div class="callout">
  <span class="tag">Recommendation</span>
  <p>Stay in C#. Switching languages for interviews costs fluency, and fluency is graded. The one exception worth considering is Python for companies that explicitly encourage it and for problems with heavy counting/memoisation — but only if you've done 30+ problems in it.</p>
</div>
` },

  { id:"cmp.2", title:"The collections map", body:`
<p class="l-lede">The same twelve operations, in all four languages. When you read a problem, you think in the left column; your fingers should produce the right one without stopping.</p>

<div class="tbl"><table>
<tr><th>Need</th><th>C#</th><th>Python</th><th>Java</th><th>JavaScript</th></tr>
<tr><td>Dynamic array</td><td><code>List&lt;int&gt;</code></td><td><code>list</code></td><td><code>ArrayList&lt;Integer&gt;</code></td><td><code>[]</code></td></tr>
<tr><td>Hash map</td><td><code>Dictionary&lt;K,V&gt;</code></td><td><code>dict</code></td><td><code>HashMap&lt;K,V&gt;</code></td><td><code>new Map()</code></td></tr>
<tr><td>Map with default</td><td><code>d.GetValueOrDefault(k)</code></td><td><code>defaultdict(int)</code></td><td><code>getOrDefault</code>, <code>merge</code></td><td><code>(m.get(k) ?? 0)</code></td></tr>
<tr><td>Counter</td><td><code>GroupBy(x=&gt;x).ToDictionary(...)</code></td><td><code>Counter(xs)</code></td><td><code>m.merge(x, 1, Integer::sum)</code></td><td>loop + Map</td></tr>
<tr><td>Hash set</td><td><code>HashSet&lt;T&gt;</code></td><td><code>set()</code></td><td><code>HashSet&lt;T&gt;</code></td><td><code>new Set()</code></td></tr>
<tr><td>Stack</td><td><code>Stack&lt;T&gt;</code></td><td><code>list</code> append/pop</td><td><code>ArrayDeque</code> push/pop</td><td><code>[]</code> push/pop</td></tr>
<tr><td>Queue</td><td><code>Queue&lt;T&gt;</code></td><td><code>deque</code> append/popleft</td><td><code>ArrayDeque</code> offer/poll</td><td>array + head index</td></tr>
<tr><td>Min-heap</td><td><code>PriorityQueue&lt;E,P&gt;</code></td><td><code>heapq.heappush</code></td><td><code>PriorityQueue&lt;E&gt;</code></td><td>write your own</td></tr>
<tr><td>Sorted set</td><td><code>SortedSet&lt;T&gt;</code></td><td><code>bisect</code> on list / <code>sortedcontainers</code>*</td><td><code>TreeSet&lt;T&gt;</code></td><td>—</td></tr>
<tr><td>Floor / ceiling</td><td><code>GetViewBetween(..).Max</code></td><td><code>bisect_left/right</code></td><td><code>floor()</code>, <code>ceiling()</code></td><td>binary search by hand</td></tr>
<tr><td>Tuple as key</td><td><code>(int,int)</code> value tuple</td><td><code>(r, c)</code></td><td>record or <code>r * C + c</code></td><td><code>r + ',' + c</code> string</td></tr>
<tr><td>String builder</td><td><code>StringBuilder</code></td><td><code>''.join(list)</code></td><td><code>StringBuilder</code></td><td><code>arr.join('')</code></td></tr>
</table></div>
<p style="font-size:13px;color:var(--muted)">* <code>sortedcontainers</code> is third-party; LeetCode has it, many interview pads don't.</p>

<h3>Equality and hashing — the differences that cause bugs</h3>
<ul>
  <li><b>C#</b> — <code>==</code> on strings compares values; on classes compares references unless overloaded. Value tuples and records get structural equality for free.</li>
  <li><b>Java</b> — <code>==</code> on objects (including <code>String</code> and <code>Integer</code>) compares references. <code>Integer</code> values from −128 to 127 are cached, so <code>==</code> "works" in tests and fails in production. Always <code>.equals()</code>.</li>
  <li><b>Python</b> — <code>==</code> compares values, <code>is</code> compares identity. Lists aren't hashable; tuples are.</li>
  <li><b>JavaScript</b> — use <code>===</code>. <code>Map</code>/<code>Set</code> compare objects by reference, so <code>set.has([1,2])</code> is always false for a new array — encode as a string.</li>
</ul>
` },

  { id:"cmp.3", title:"The same problems, four ways", body:`
<p class="l-lede">Three canonical problems in each language. Switch tabs and look at what changes — that delta is the list of things you'd trip over mid-interview.</p>

<h3>1 · Two Sum (hash map)</h3>
<div class="ltabs">
<pre data-lang="C#"><code><span class="k">int</span>[] TwoSum(<span class="k">int</span>[] nums, <span class="k">int</span> target) {
    <span class="k">var</span> seen = <span class="k">new</span> Dictionary&lt;<span class="k">int</span>, <span class="k">int</span>&gt;();
    <span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; nums.Length; i++) {
        <span class="k">if</span> (seen.TryGetValue(target - nums[i], <span class="k">out int</span> j)) <span class="k">return new</span>[] { j, i };
        seen[nums[i]] = i;
    }
    <span class="k">return</span> Array.Empty&lt;<span class="k">int</span>&gt;();
}</code></pre>
<pre data-lang="Python"><code><span class="k">def</span> two_sum(nums, target):
    seen = {}
    <span class="k">for</span> i, x <span class="k">in</span> enumerate(nums):
        <span class="k">if</span> target - x <span class="k">in</span> seen:
            <span class="k">return</span> [seen[target - x], i]
        seen[x] = i
    <span class="k">return</span> []</code></pre>
<pre data-lang="Java"><code><span class="k">int</span>[] twoSum(<span class="k">int</span>[] nums, <span class="k">int</span> target) {
    Map&lt;Integer, Integer&gt; seen = <span class="k">new</span> HashMap&lt;&gt;();
    <span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; nums.length; i++) {
        Integer j = seen.get(target - nums[i]);     <span class="c">// null if absent (boxed)</span>
        <span class="k">if</span> (j != <span class="k">null</span>) <span class="k">return new int</span>[]{ j, i };
        seen.put(nums[i], i);
    }
    <span class="k">return new int</span>[0];
}</code></pre>
<pre data-lang="JavaScript"><code><span class="k">function</span> twoSum(nums, target) {
  <span class="k">const</span> seen = <span class="k">new</span> Map();
  <span class="k">for</span> (<span class="k">let</span> i = 0; i &lt; nums.length; i++) {
    <span class="k">if</span> (seen.has(target - nums[i])) <span class="k">return</span> [seen.get(target - nums[i]), i];
    seen.set(nums[i], i);
  }
  <span class="k">return</span> [];
}</code></pre>
</div>
<p><b>Differences:</b> C# <code>TryGetValue</code> does lookup and fetch in one call. Java returns <code>null</code> for missing keys and boxes ints. Python's <code>in</code> + index is two lookups but reads cleanest. JS must use <code>Map</code>, not an object.</p>

<h3>2 · Top K frequent (counting + heap)</h3>
<div class="ltabs">
<pre data-lang="C#"><code><span class="k">int</span>[] TopK(<span class="k">int</span>[] nums, <span class="k">int</span> k) {
    <span class="k">var</span> count = <span class="k">new</span> Dictionary&lt;<span class="k">int</span>, <span class="k">int</span>&gt;();
    <span class="k">foreach</span> (<span class="k">var</span> x <span class="k">in</span> nums) count[x] = count.GetValueOrDefault(x) + 1;
    <span class="k">var</span> pq = <span class="k">new</span> PriorityQueue&lt;<span class="k">int</span>, <span class="k">int</span>&gt;();     <span class="c">// min-heap by frequency</span>
    <span class="k">foreach</span> (<span class="k">var</span> (x, c) <span class="k">in</span> count) {
        pq.Enqueue(x, c);
        <span class="k">if</span> (pq.Count &gt; k) pq.Dequeue();
    }
    <span class="k">var</span> res = <span class="k">new int</span>[k];
    <span class="k">for</span> (<span class="k">int</span> i = k - 1; i &gt;= 0; i--) res[i] = pq.Dequeue();
    <span class="k">return</span> res;
}</code></pre>
<pre data-lang="Python"><code><span class="k">from</span> collections <span class="k">import</span> Counter
<span class="k">import</span> heapq

<span class="k">def</span> top_k(nums, k):
    <span class="k">return</span> [x <span class="k">for</span> x, _ <span class="k">in</span> Counter(nums).most_common(k)]
    <span class="c"># or: heapq.nlargest(k, count, key=count.get)</span></code></pre>
<pre data-lang="Java"><code><span class="k">int</span>[] topK(<span class="k">int</span>[] nums, <span class="k">int</span> k) {
    Map&lt;Integer, Integer&gt; count = <span class="k">new</span> HashMap&lt;&gt;();
    <span class="k">for</span> (<span class="k">int</span> x : nums) count.merge(x, 1, Integer::sum);
    PriorityQueue&lt;Integer&gt; pq =
        <span class="k">new</span> PriorityQueue&lt;&gt;((a, b) -&gt; count.get(a) - count.get(b));
    <span class="k">for</span> (<span class="k">int</span> x : count.keySet()) {
        pq.offer(x);
        <span class="k">if</span> (pq.size() &gt; k) pq.poll();
    }
    <span class="k">return</span> pq.stream().mapToInt(Integer::intValue).toArray();
}</code></pre>
<pre data-lang="JavaScript"><code><span class="k">function</span> topK(nums, k) {
  <span class="k">const</span> count = <span class="k">new</span> Map();
  <span class="k">for</span> (<span class="k">const</span> x <span class="k">of</span> nums) count.set(x, (count.get(x) ?? 0) + 1);
  <span class="c">// No heap: bucket sort by frequency gives O(n) and avoids writing one</span>
  <span class="k">const</span> buckets = Array.from({ length: nums.length + 1 }, () =&gt; []);
  <span class="k">for</span> (<span class="k">const</span> [x, c] <span class="k">of</span> count) buckets[c].push(x);
  <span class="k">const</span> res = [];
  <span class="k">for</span> (<span class="k">let</span> f = buckets.length - 1; f &gt; 0 &amp;&amp; res.length &lt; k; f--) res.push(...buckets[f]);
  <span class="k">return</span> res.slice(0, k);
}</code></pre>
</div>
<p><b>Differences:</b> C#'s heap takes the priority separately — no comparator needed. Python collapses the whole thing to one line (say that you know the heap version too). Java needs a comparator lambda; <code>a - b</code> can overflow for large values, so <code>Integer.compare</code> is safer. JS has no heap, so pick an algorithm that doesn't need one.</p>

<h3>3 · BFS shortest path on a grid</h3>
<div class="ltabs">
<pre data-lang="C#"><code><span class="k">int</span> Shortest(<span class="k">int</span>[][] g) {
    <span class="k">int</span> R = g.Length, C = g[0].Length;
    <span class="k">var</span> q = <span class="k">new</span> Queue&lt;(<span class="k">int</span> r, <span class="k">int</span> c, <span class="k">int</span> d)&gt;();
    <span class="k">var</span> seen = <span class="k">new bool</span>[R, C];
    q.Enqueue((0, 0, 0)); seen[0, 0] = <span class="k">true</span>;
    <span class="k">int</span>[] dr = { 1, -1, 0, 0 }, dc = { 0, 0, 1, -1 };
    <span class="k">while</span> (q.Count &gt; 0) {
        <span class="k">var</span> (r, c, d) = q.Dequeue();
        <span class="k">if</span> (r == R - 1 &amp;&amp; c == C - 1) <span class="k">return</span> d;
        <span class="k">for</span> (<span class="k">int</span> i = 0; i &lt; 4; i++) {
            <span class="k">int</span> nr = r + dr[i], nc = c + dc[i];
            <span class="k">if</span> (nr &lt; 0 || nc &lt; 0 || nr &gt;= R || nc &gt;= C || g[nr][nc] == 1 || seen[nr, nc]) <span class="k">continue</span>;
            seen[nr, nc] = <span class="k">true</span>; q.Enqueue((nr, nc, d + 1));
        }
    }
    <span class="k">return</span> -1;
}</code></pre>
<pre data-lang="Python"><code><span class="k">from</span> collections <span class="k">import</span> deque

<span class="k">def</span> shortest(g):
    R, C = len(g), len(g[0])
    q, seen = deque([(0, 0, 0)]), {(0, 0)}
    <span class="k">while</span> q:
        r, c, d = q.popleft()
        <span class="k">if</span> (r, c) == (R - 1, C - 1):
            <span class="k">return</span> d
        <span class="k">for</span> nr, nc <span class="k">in</span> ((r+1, c), (r-1, c), (r, c+1), (r, c-1)):
            <span class="k">if</span> 0 &lt;= nr &lt; R <span class="k">and</span> 0 &lt;= nc &lt; C <span class="k">and</span> g[nr][nc] == 0 <span class="k">and</span> (nr, nc) <span class="k">not in</span> seen:
                seen.add((nr, nc))
                q.append((nr, nc, d + 1))
    <span class="k">return</span> -1</code></pre>
<pre data-lang="Java"><code><span class="k">int</span> shortest(<span class="k">int</span>[][] g) {
    <span class="k">int</span> R = g.length, C = g[0].length;
    Deque&lt;<span class="k">int</span>[]&gt; q = <span class="k">new</span> ArrayDeque&lt;&gt;();
    <span class="k">boolean</span>[][] seen = <span class="k">new boolean</span>[R][C];
    q.offer(<span class="k">new int</span>[]{0, 0, 0}); seen[0][0] = <span class="k">true</span>;
    <span class="k">int</span>[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    <span class="k">while</span> (!q.isEmpty()) {
        <span class="k">int</span>[] cur = q.poll();
        <span class="k">if</span> (cur[0] == R - 1 &amp;&amp; cur[1] == C - 1) <span class="k">return</span> cur[2];
        <span class="k">for</span> (<span class="k">int</span>[] dd : dirs) {
            <span class="k">int</span> nr = cur[0] + dd[0], nc = cur[1] + dd[1];
            <span class="k">if</span> (nr &lt; 0 || nc &lt; 0 || nr &gt;= R || nc &gt;= C || g[nr][nc] == 1 || seen[nr][nc]) <span class="k">continue</span>;
            seen[nr][nc] = <span class="k">true</span>; q.offer(<span class="k">new int</span>[]{nr, nc, cur[2] + 1});
        }
    }
    <span class="k">return</span> -1;
}</code></pre>
<pre data-lang="JavaScript"><code><span class="k">function</span> shortest(g) {
  <span class="k">const</span> R = g.length, C = g[0].length;
  <span class="k">const</span> q = [[0, 0, 0]];
  <span class="k">let</span> head = 0;                                   <span class="c">// shift() is O(n): use a head index</span>
  <span class="k">const</span> seen = Array.from({ length: R }, () =&gt; Array(C).fill(<span class="k">false</span>));
  seen[0][0] = <span class="k">true</span>;
  <span class="k">while</span> (head &lt; q.length) {
    <span class="k">const</span> [r, c, d] = q[head++];
    <span class="k">if</span> (r === R - 1 &amp;&amp; c === C - 1) <span class="k">return</span> d;
    <span class="k">for</span> (<span class="k">const</span> [dr, dc] <span class="k">of</span> [[1,0],[-1,0],[0,1],[0,-1]]) {
      <span class="k">const</span> nr = r + dr, nc = c + dc;
      <span class="k">if</span> (nr &lt; 0 || nc &lt; 0 || nr &gt;= R || nc &gt;= C || g[nr][nc] === 1 || seen[nr][nc]) <span class="k">continue</span>;
      seen[nr][nc] = <span class="k">true</span>; q.push([nr, nc, d + 1]);
    }
  }
  <span class="k">return</span> -1;
}</code></pre>
</div>
<p><b>Differences:</b> C# value tuples and deconstruction make queue items clean. Python tuples in a set replace a 2D array. Java falls back to <code>int[]</code> triples. JS needs the head-index trick because <code>Array.shift()</code> is O(n). In all four: mark visited on enqueue.</p>
` },

  { id:"cmp.4", title:"Traps that differ by language", body:`
<p class="l-lede">Each of these has cost someone an offer. Skim the column for your language before every interview; read the others so you can spot them in an interviewer's code.</p>

<div class="tbl"><table>
<tr><th>Trap</th><th>C#</th><th>Python</th><th>Java</th><th>JavaScript</th></tr>
<tr><td>Integer overflow</td><td>Silent wrap; use <code>long</code></td><td>Never</td><td>Silent wrap; use <code>long</code></td><td>Loses precision past 2⁵³</td></tr>
<tr><td>Integer division</td><td><code>7 / 2 == 3</code>, truncates toward 0</td><td><code>7 // 2 == 3</code>, floors: <code>-7 // 2 == -4</code></td><td>Truncates toward 0</td><td><code>7 / 2 == 3.5</code>; use <code>Math.trunc</code> or <code>| 0</code></td></tr>
<tr><td>Negative modulo</td><td><code>-1 % 5 == -1</code></td><td><code>-1 % 5 == 4</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>
<tr><td>Default sort of numbers</td><td>Numeric</td><td>Numeric</td><td>Numeric</td><td><b>Lexicographic</b></td></tr>
<tr><td>2D array init</td><td><code>new int[R, C]</code> or jagged</td><td><code>[[0]*C]*R</code> <b>aliases rows</b>; use a comprehension</td><td><code>new int[R][C]</code></td><td><code>Array(R).fill([])</code> <b>aliases</b>; use <code>Array.from</code></td></tr>
<tr><td>Missing map key</td><td>Indexer <b>throws</b> <code>KeyNotFoundException</code></td><td><code>d[k]</code> throws <code>KeyError</code></td><td>Returns <code>null</code> (then NPE on unboxing)</td><td>Returns <code>undefined</code></td></tr>
<tr><td>Modify while iterating</td><td>Throws</td><td>dict: throws; list: silently skips</td><td><code>ConcurrentModificationException</code></td><td>Allowed, confusing</td></tr>
<tr><td>Mutable default args</td><td>N/A</td><td><code>def f(x=[])</code> shares the list</td><td>N/A</td><td>Defaults re-evaluated (safe)</td></tr>
<tr><td>Char arithmetic</td><td><code>c - 'a'</code> gives <code>int</code></td><td><code>ord(c) - ord('a')</code></td><td><code>c - 'a'</code></td><td><code>s.charCodeAt(i) - 97</code></td></tr>
<tr><td>String equality</td><td><code>==</code> is value</td><td><code>==</code> is value</td><td><b><code>.equals()</code></b></td><td><code>===</code></td></tr>
<tr><td>Max int sentinel</td><td><code>int.MaxValue</code></td><td><code>float('inf')</code></td><td><code>Integer.MAX_VALUE</code></td><td><code>Infinity</code></td></tr>
</table></div>

<h3>The three that come up most</h3>
<ol class="steps">
  <li><b>Midpoint overflow</b> — <code>(lo + hi) / 2</code> in C#/Java with large indices. Write <code>lo + (hi - lo) / 2</code> by habit in every language.</li>
  <li><b>Comparator subtraction</b> — <code>(a, b) =&gt; a - b</code> overflows in C#/Java for values near the int limits. Use <code>a.CompareTo(b)</code> / <code>Integer.compare(a, b)</code>. In JS it's fine (floats).</li>
  <li><b>Aliased rows</b> — Python <code>[[0]*C]*R</code> and JS <code>Array(R).fill(Array(C).fill(0))</code> create R references to one row. A DP table built this way gives silently wrong answers.</li>
</ol>
` }
  ]
},

/* ================= PYTHON ================= */
{ id:"py", title:"Python", mins:35,
  sub:"Python for interviews: the standard-library pieces that make solutions short, and the traps that make them wrong.",
  lessons:[

  { id:"py.1", title:"Python interview toolkit", body:`
<p class="l-lede">Python's advantage is the standard library. Know these modules and most solutions shrink by a third.</p>

<h3>collections</h3>
<pre><code><span class="k">from</span> collections <span class="k">import</span> Counter, defaultdict, deque, OrderedDict

Counter(<span class="s">"banana"</span>)                 <span class="c"># {'a': 3, 'n': 2, 'b': 1}</span>
Counter(a) == Counter(b)          <span class="c"># anagram check</span>
cnt.most_common(k)                <span class="c"># top k</span>
g = defaultdict(list); g[u].append(v)   <span class="c"># adjacency list, no KeyError</span>
q = deque(); q.append(x); q.popleft()   <span class="c"># O(1) both ends; list.pop(0) is O(n)</span>
od.move_to_end(k); od.popitem(last=<span class="k">False</span>)   <span class="c"># LRU in five lines</span></code></pre>

<h3>heapq and bisect</h3>
<pre><code><span class="k">import</span> heapq
h = []; heapq.heappush(h, (dist, node)); d, n = heapq.heappop(h)   <span class="c"># min-heap; tuples compare in order</span>
heapq.heapify(arr)                 <span class="c"># O(n)</span>
heapq.heappush(h, -x)              <span class="c"># max-heap: negate</span>
heapq.nlargest(k, xs, key=f)

<span class="k">import</span> bisect
i = bisect.bisect_left(a, x)       <span class="c"># first index with a[i] &gt;= x</span>
j = bisect.bisect_right(a, x)      <span class="c"># first index with a[j] &gt;  x</span>
bisect.insort(a, x)                <span class="c"># O(n) insert keeping order</span></code></pre>
<p>Tuple ties: if two heap entries have equal first elements, Python compares the second — which fails for objects without <code>&lt;</code>. Add a counter: <code>(priority, next(counter), item)</code>.</p>

<h3>functools, itertools, math</h3>
<pre><code><span class="k">from</span> functools <span class="k">import</span> cache, reduce
<span class="k">from</span> itertools <span class="k">import</span> accumulate, combinations, permutations, product, pairwise

@cache
<span class="k">def</span> dp(i, j): ...                 <span class="c"># memoised; args must be hashable</span>
list(accumulate(nums))            <span class="c"># prefix sums</span>
combinations(xs, 2)               <span class="c"># all pairs</span>
math.gcd(a, b); math.inf; math.isqrt(n)</code></pre>

<h3>Idioms that read as fluent</h3>
<ul class="clean">
  <li><code>for i, x in enumerate(xs)</code> and <code>for a, b in zip(xs, ys)</code></li>
  <li>Slicing: <code>s[::-1]</code> reverses; <code>a[i:j]</code> copies (O(j−i)!).</li>
  <li>Sort by key: <code>xs.sort(key=lambda p: (p[0], -p[1]))</code> — multi-key with descending second.</li>
  <li><code>divmod(n, 10)</code>, <code>a, b = b, a + b</code>, <code>float('inf')</code>.</li>
  <li>Grid init: <code>[[0] * C for _ in range(R)]</code>.</li>
</ul>
` },

  { id:"py.2", title:"Python traps & how it differs from C#", body:`
<p class="l-lede">Coming from C#, Python feels permissive — and the things it permits are exactly the bugs.</p>

<div class="tbl"><table>
<tr><th>Thing</th><th>C# habit</th><th>Python reality</th></tr>
<tr><td>Block scope</td><td>Variables die at <code>}</code></td><td>Function scope; loop variables leak and survive the loop</td></tr>
<tr><td>Closures in loops</td><td>C# 5+ captures a fresh <code>foreach</code> variable</td><td>Lambdas capture the variable, not the value — late binding</td></tr>
<tr><td>Nested function writes</td><td>Just assign</td><td>Need <code>nonlocal x</code> to rebind an outer variable</td></tr>
<tr><td>Integer division</td><td><code>/</code> on ints truncates</td><td><code>/</code> is float; <code>//</code> floors (toward −∞)</td></tr>
<tr><td>Ternary</td><td><code>c ? a : b</code></td><td><code>a if c else b</code></td></tr>
<tr><td>Null</td><td><code>null</code>, <code>?.</code>, <code>??</code></td><td><code>None</code>; test with <code>is None</code>; no null-conditional</td></tr>
<tr><td>Truthiness</td><td>Only bools in <code>if</code></td><td><code>0</code>, <code>""</code>, <code>[]</code>, <code>None</code> are falsy — <code>if node.val:</code> skips a 0-valued node</td></tr>
<tr><td>Copying</td><td><code>new List&lt;T&gt;(xs)</code></td><td><code>xs[:]</code> / <code>list(xs)</code> shallow; <code>copy.deepcopy</code> deep. Backtracking: append <code>path[:]</code>, not <code>path</code></td></tr>
<tr><td>Recursion limit</td><td>~10k+</td><td>1000 → <code>sys.setrecursionlimit(10**6)</code></td></tr>
<tr><td>Performance</td><td>Fast</td><td>~10–50× slower; tight O(n log n) on 10⁶ may time out</td></tr>
</table></div>

<div class="callout gold">
  <span class="tag">The backtracking bug</span>
  <p><code>res.append(path)</code> appends a reference; later mutations change every stored result. Always <code>res.append(path[:])</code> or <code>list(path)</code>. Same bug exists in C# (<code>res.Add(path)</code> vs <code>res.Add(new List&lt;int&gt;(path))</code>), but it's more common in Python because the syntax hides the copy.</p>
</div>
` }
  ]
},

/* ================= JAVA ================= */
{ id:"java", title:"Java", mins:30,
  sub:"Java for interviews: the collections framework, TreeMap superpowers, and the boxing and equality traps that catch C# developers.",
  lessons:[

  { id:"java.1", title:"Java interview toolkit", body:`
<p class="l-lede">Java is closest to C# — which makes the small differences more dangerous, because your fingers will type the C# version.</p>

<h3>Collections you'll use</h3>
<pre><code>List&lt;Integer&gt; a = <span class="k">new</span> ArrayList&lt;&gt;();      a.add(x); a.get(i); a.size();
Map&lt;String, Integer&gt; m = <span class="k">new</span> HashMap&lt;&gt;();
m.put(k, m.getOrDefault(k, 0) + 1);       <span class="c">// or m.merge(k, 1, Integer::sum)</span>
m.computeIfAbsent(u, z -&gt; <span class="k">new</span> ArrayList&lt;&gt;()).add(v);   <span class="c">// adjacency list</span>
Set&lt;Integer&gt; s = <span class="k">new</span> HashSet&lt;&gt;();
Deque&lt;Integer&gt; st = <span class="k">new</span> ArrayDeque&lt;&gt;();    st.push(x); st.pop(); st.peek();
Deque&lt;Integer&gt; q  = <span class="k">new</span> ArrayDeque&lt;&gt;();    q.offer(x); q.poll(); q.peek();
PriorityQueue&lt;<span class="k">int</span>[]&gt; pq = <span class="k">new</span> PriorityQueue&lt;&gt;((x, y) -&gt; Integer.compare(x[0], y[0]));</code></pre>

<h3>TreeMap / TreeSet — Java's best interview feature</h3>
<pre><code>TreeMap&lt;Integer, Integer&gt; tm = <span class="k">new</span> TreeMap&lt;&gt;();
tm.floorKey(x);    <span class="c">// greatest key &lt;= x, or null</span>
tm.ceilingKey(x);  <span class="c">// least key &gt;= x</span>
tm.lowerKey(x); tm.higherKey(x);           <span class="c">// strict versions</span>
tm.firstKey(); tm.lastKey(); tm.pollFirstEntry();
tm.headMap(x); tm.tailMap(x, <span class="k">true</span>);         <span class="c">// views</span></code></pre>
<p>"My Calendar", "range module", "stock price fluctuation", and sliding-window median become straightforward. C#'s <code>SortedSet.GetViewBetween</code> can do some of this but is clunkier; Python needs <code>bisect</code> or third-party <code>sortedcontainers</code>.</p>

<h3>Arrays and strings</h3>
<pre><code>Arrays.sort(arr);                          <span class="c">// primitives: dual-pivot quicksort</span>
Arrays.sort(intervals, (x, y) -&gt; x[0] - y[0]);
Arrays.fill(dp, Integer.MAX_VALUE);
<span class="k">char</span>[] cs = s.toCharArray(); String t = <span class="k">new</span> String(cs);
StringBuilder sb = <span class="k">new</span> StringBuilder(); sb.append(c).reverse().toString();
s.charAt(i); s.substring(i, j);            <span class="c">// substring is (begin, END) — C# is (start, LENGTH)</span></code></pre>
` },

  { id:"java.2", title:"Java traps & how it differs from C#", body:`
<p class="l-lede">Ten things that are different from C# even though they look the same.</p>

<div class="tbl"><table>
<tr><th>Thing</th><th>C#</th><th>Java</th></tr>
<tr><td>Generics over primitives</td><td><code>List&lt;int&gt;</code> — real ints</td><td><code>List&lt;Integer&gt;</code> — boxed objects; slower, nullable</td></tr>
<tr><td><code>==</code> on boxed / strings</td><td>Value equality for strings</td><td>Reference equality. <code>Integer</code> 127 == 127 true, 128 == 128 <b>false</b></td></tr>
<tr><td>Substring</td><td><code>Substring(start, length)</code></td><td><code>substring(begin, end)</code></td></tr>
<tr><td>Length</td><td><code>.Length</code> / <code>.Count</code></td><td><code>.length</code> (array) / <code>.length()</code> (String) / <code>.size()</code> (collection)</td></tr>
<tr><td>Missing key</td><td>Indexer throws</td><td><code>get</code> returns <code>null</code>; unboxing it to <code>int</code> throws NPE</td></tr>
<tr><td>Stack</td><td><code>Stack&lt;T&gt;</code> is fine</td><td><code>Stack</code> is legacy (synchronized Vector) — use <code>ArrayDeque</code></td></tr>
<tr><td>Remove from list</td><td><code>Remove(T)</code> vs <code>RemoveAt(int)</code></td><td><code>remove(int)</code> removes by <b>index</b>; for a value use <code>remove(Integer.valueOf(x))</code></td></tr>
<tr><td>Tuples</td><td><code>(int, int)</code> value tuples</td><td>None; use <code>int[]</code>, a <code>record</code>, or encode as <code>long</code></td></tr>
<tr><td>Properties</td><td><code>obj.Name</code></td><td><code>obj.getName()</code> (records: <code>obj.name()</code>)</td></tr>
<tr><td>Checked exceptions</td><td>None</td><td>Must declare or catch — rarely matters in interviews</td></tr>
</table></div>

<div class="callout gold">
  <span class="tag">The one to remember</span>
  <p><code>list.remove(i)</code> on a <code>List&lt;Integer&gt;</code> with an <code>int</code> argument removes the element at index <code>i</code>, not the value <code>i</code>. Backtracking code that removes "the last added number" this way works by accident only when the value equals its index.</p>
</div>
` }
  ]
},

/* ================= JAVASCRIPT ================= */
{ id:"js", title:"JavaScript", mins:30,
  sub:"JavaScript for interviews: what's missing from the standard library, how to work around it, and the coercion and sorting traps.",
  lessons:[

  { id:"js.1", title:"JavaScript interview toolkit", body:`
<p class="l-lede">JavaScript is perfectly fine for interviews — once you know which three data structures you'll have to fake.</p>

<h3>What you have</h3>
<pre><code><span class="k">const</span> m = <span class="k">new</span> Map();  m.set(k, (m.get(k) ?? 0) + 1);  m.has(k); m.delete(k); m.size;
<span class="k">const</span> s = <span class="k">new</span> Set([1, 2]);  s.add(3); s.has(3);
<span class="k">for</span> (<span class="k">const</span> [k, v] <span class="k">of</span> m) { ... }       <span class="c">// Map iterates in insertion order</span>
<span class="k">const</span> grid = Array.from({ length: R }, () =&gt; Array(C).fill(0));
arr.sort((a, b) =&gt; a - b);                 <span class="c">// ALWAYS pass a comparator for numbers</span>
<span class="k">const</span> sum = arr.reduce((a, b) =&gt; a + b, 0);
s.split(<span class="s">''</span>).reverse().join(<span class="s">''</span>);
Math.max(...arr)                           <span class="c">// spread blows the stack past ~100k elements; use reduce</span></code></pre>

<h3>What you don't have, and what to do</h3>
<ul class="clean">
  <li><b>Heap</b> — write a minimal binary heap (push/pop with sift up/down, ~25 lines), or choose an algorithm that avoids it (bucket sort for top-K, sorting once for static data). Practise writing it once so it's a 3-minute job.</li>
  <li><b>Queue</b> — <code>shift()</code> is O(n). Use an array with a moving head index.</li>
  <li><b>Sorted map / set</b> — keep a sorted array with binary-search insert (O(n) insert), or reframe the problem.</li>
  <li><b>Tuple keys</b> — encode as strings: <code>r + ',' + c</code>, or as a number <code>r * C + c</code> (faster).</li>
  <li><b>Integer division</b> — <code>Math.floor(a / b)</code> for non-negatives, <code>Math.trunc</code> to match C#.</li>
</ul>

<h3>Minimal min-heap</h3>
<pre><code><span class="k">class</span> MinHeap {
  constructor(less = (a, b) =&gt; a &lt; b) { <span class="k">this</span>.a = []; <span class="k">this</span>.less = less; }
  get size() { <span class="k">return this</span>.a.length; }
  push(x) {
    <span class="k">const</span> a = <span class="k">this</span>.a; a.push(x);
    <span class="k">let</span> i = a.length - 1;
    <span class="k">while</span> (i &gt; 0) {
      <span class="k">const</span> p = (i - 1) &gt;&gt; 1;
      <span class="k">if</span> (!<span class="k">this</span>.less(a[i], a[p])) <span class="k">break</span>;
      [a[i], a[p]] = [a[p], a[i]]; i = p;
    }
  }
  pop() {
    <span class="k">const</span> a = <span class="k">this</span>.a, top = a[0], last = a.pop();
    <span class="k">if</span> (a.length) {
      a[0] = last; <span class="k">let</span> i = 0;
      <span class="k">for</span> (;;) {
        <span class="k">let</span> l = 2 * i + 1, r = l + 1, m = i;
        <span class="k">if</span> (l &lt; a.length &amp;&amp; <span class="k">this</span>.less(a[l], a[m])) m = l;
        <span class="k">if</span> (r &lt; a.length &amp;&amp; <span class="k">this</span>.less(a[r], a[m])) m = r;
        <span class="k">if</span> (m === i) <span class="k">break</span>;
        [a[i], a[m]] = [a[m], a[i]]; i = m;
      }
    }
    <span class="k">return</span> top;
  }
}</code></pre>
` },

  { id:"js.2", title:"JavaScript traps & how it differs from C#", body:`
<p class="l-lede">JavaScript's traps come from coercion and from one numeric type. Know them and they're just trivia.</p>

<div class="tbl"><table>
<tr><th>Thing</th><th>C#</th><th>JavaScript</th></tr>
<tr><td>Equality</td><td><code>==</code> typed</td><td><code>==</code> coerces (<code>'1' == 1</code>); always <code>===</code></td></tr>
<tr><td>Numbers</td><td><code>int</code>, <code>long</code>, <code>double</code></td><td>One 64-bit float; <code>0.1 + 0.2 !== 0.3</code>; safe ints to 2⁵³−1</td></tr>
<tr><td>Bitwise</td><td>On 32/64-bit ints</td><td>Converts to 32-bit signed; <code>&gt;&gt;&gt;</code> for unsigned</td></tr>
<tr><td>Sort</td><td>Numeric</td><td>String compare unless you pass a comparator</td></tr>
<tr><td>Missing values</td><td><code>null</code></td><td><code>undefined</code> and <code>null</code>; <code>??</code> treats both as missing; <code>||</code> also treats <code>0</code> and <code>''</code> as missing</td></tr>
<tr><td>Object keys</td><td>Any type in a Dictionary</td><td>Plain objects stringify keys; <code>Map</code> keeps types</td></tr>
<tr><td>Array holes</td><td>N/A</td><td><code>new Array(3)</code> has holes; <code>.map</code> skips them — use <code>Array.from</code> or <code>.fill</code></td></tr>
<tr><td><code>this</code></td><td>Always the instance</td><td>Depends on call site; arrow functions capture lexically</td></tr>
<tr><td>Concurrency</td><td>Threads, <code>async/await</code></td><td>Single thread + event loop; <code>async/await</code> is I/O concurrency, not parallelism</td></tr>
<tr><td><code>for…in</code> vs <code>for…of</code></td><td><code>foreach</code></td><td><code>for…in</code> iterates <b>keys as strings</b>; you want <code>for…of</code></td></tr>
</table></div>

<div class="callout gold">
  <span class="tag">Event loop questions</span>
  <p>Front-end and Node roles ask "what order does this log?" Know the rule: synchronous code first, then <b>microtasks</b> (resolved promises, <code>queueMicrotask</code>) completely drained, then the next <b>macrotask</b> (<code>setTimeout</code>, I/O). So <code>setTimeout(f, 0)</code> runs after <code>Promise.resolve().then(g)</code>.</p>
</div>
` }
  ]
},

/* ================= SQL ================= */
{ id:"sql", title:"SQL", mins:60,
  sub:"SQL for interviews: joins, aggregation and the order of execution, window functions and CTEs, the classic query problems, and the indexing and transaction questions that bridge into system design.",
  lessons:[

  { id:"sql.1", title:"Joins, grouping & execution order", body:`
<p class="l-lede">Most SQL interview mistakes come from not knowing the order a query is actually evaluated in. Learn it once and half the errors disappear.</p>

<h3>Logical order of execution</h3>
<ol class="steps">
  <li><b>FROM / JOIN</b> — build the row set.</li>
  <li><b>WHERE</b> — filter rows. Can't see aggregates or SELECT aliases.</li>
  <li><b>GROUP BY</b> — collapse into groups.</li>
  <li><b>HAVING</b> — filter groups. Can use aggregates.</li>
  <li><b>SELECT</b> — compute output columns; window functions run here.</li>
  <li><b>DISTINCT</b></li>
  <li><b>ORDER BY</b> — can use SELECT aliases.</li>
  <li><b>LIMIT / OFFSET / TOP / FETCH</b></li>
</ol>
<p>That's why <code>WHERE COUNT(*) &gt; 1</code> fails (use <code>HAVING</code>) and why a window function can't go in <code>WHERE</code> (wrap it in a CTE or subquery).</p>

<h3>Joins</h3>
<div class="tbl"><table>
<tr><th>Join</th><th>Returns</th><th>Interview use</th></tr>
<tr><td><code>INNER</code></td><td>Rows matching in both</td><td>Default</td></tr>
<tr><td><code>LEFT</code></td><td>All left rows; NULLs where no match</td><td>"Customers who never ordered": <code>LEFT JOIN … WHERE o.id IS NULL</code></td></tr>
<tr><td><code>RIGHT</code></td><td>Mirror of LEFT</td><td>Rarely — rewrite as LEFT</td></tr>
<tr><td><code>FULL OUTER</code></td><td>All rows from both</td><td>Reconciling two lists. Not in MySQL.</td></tr>
<tr><td><code>CROSS</code></td><td>Every combination</td><td>Generating pairs, calendars</td></tr>
<tr><td>Self join</td><td>Table joined to itself</td><td>"Employees earning more than their manager"</td></tr>
</table></div>
<div class="callout gold">
  <span class="tag">The LEFT JOIN trap</span>
  <p>A condition on the right table in <code>WHERE</code> turns a LEFT JOIN into an INNER JOIN (NULL rows fail the test). Put it in the <code>ON</code> clause instead: <code>LEFT JOIN orders o ON o.cust_id = c.id AND o.year = 2026</code>.</p>
</div>

<h3>NULL semantics</h3>
<ul>
  <li><code>NULL = NULL</code> is unknown, not true. Use <code>IS NULL</code>.</li>
  <li><code>COUNT(*)</code> counts rows; <code>COUNT(col)</code> skips NULLs; <code>AVG</code> ignores NULLs.</li>
  <li><code>NOT IN (subquery)</code> returns nothing if the subquery contains a NULL. Prefer <code>NOT EXISTS</code>.</li>
  <li><code>COALESCE(x, 0)</code> to default.</li>
</ul>

<h3>Dialect differences you'll hit</h3>
<div class="tbl"><table>
<tr><th></th><th>SQL Server (T-SQL)</th><th>PostgreSQL</th><th>MySQL</th></tr>
<tr><td>Top N</td><td><code>SELECT TOP 5</code> / <code>OFFSET…FETCH</code></td><td><code>LIMIT 5 OFFSET 0</code></td><td><code>LIMIT 0, 5</code></td></tr>
<tr><td>String concat</td><td><code>+</code> or <code>CONCAT</code></td><td><code>||</code></td><td><code>CONCAT</code></td></tr>
<tr><td>Date diff</td><td><code>DATEDIFF(day, a, b)</code></td><td><code>b - a</code></td><td><code>DATEDIFF(b, a)</code></td></tr>
<tr><td>Upsert</td><td><code>MERGE</code></td><td><code>ON CONFLICT DO UPDATE</code></td><td><code>ON DUPLICATE KEY UPDATE</code></td></tr>
<tr><td>Auto id</td><td><code>IDENTITY</code></td><td><code>GENERATED … AS IDENTITY</code> / <code>SERIAL</code></td><td><code>AUTO_INCREMENT</code></td></tr>
</table></div>
` },

  { id:"sql.2", title:"Window functions & CTEs", body:`
<p class="l-lede">Window functions are the single biggest upgrade to your SQL interview answers. They compute across related rows without collapsing them.</p>

<h3>The syntax</h3>
<pre><code><span class="k">SELECT</span> name, dept, salary,
       <span class="k">RANK</span>() <span class="k">OVER</span> (<span class="k">PARTITION BY</span> dept <span class="k">ORDER BY</span> salary <span class="k">DESC</span>) <span class="k">AS</span> rnk,
       <span class="k">SUM</span>(salary) <span class="k">OVER</span> (<span class="k">PARTITION BY</span> dept) <span class="k">AS</span> dept_total,
       salary - <span class="k">LAG</span>(salary) <span class="k">OVER</span> (<span class="k">ORDER BY</span> hired) <span class="k">AS</span> diff_from_prev
<span class="k">FROM</span> employees;</code></pre>

<h3>The functions</h3>
<div class="tbl"><table>
<tr><th>Function</th><th>Ties (100, 100, 90)</th><th>Use</th></tr>
<tr><td><code>ROW_NUMBER()</code></td><td>1, 2, 3</td><td>Dedupe, pick exactly one per group</td></tr>
<tr><td><code>RANK()</code></td><td>1, 1, 3</td><td>Competition ranking with gaps</td></tr>
<tr><td><code>DENSE_RANK()</code></td><td>1, 1, 2</td><td>"Nth highest distinct salary"</td></tr>
<tr><td><code>LAG/LEAD(col, n)</code></td><td>—</td><td>Compare with previous/next row: day-over-day change, consecutive events</td></tr>
<tr><td><code>SUM/AVG/COUNT() OVER</code></td><td>—</td><td>Running totals, moving averages, percent of total</td></tr>
<tr><td><code>NTILE(n)</code>, <code>FIRST_VALUE</code></td><td>—</td><td>Quartiles, first in group</td></tr>
</table></div>

<h3>Frames</h3>
<p>With <code>ORDER BY</code> inside <code>OVER</code>, the default frame is "from the start to the current row" — that's a running total. A 7-day moving average:</p>
<pre><code><span class="k">AVG</span>(amount) <span class="k">OVER</span> (<span class="k">ORDER BY</span> day <span class="k">ROWS BETWEEN</span> 6 <span class="k">PRECEDING AND CURRENT ROW</span>)</code></pre>
<p>Watch the default: <code>RANGE</code> treats rows with equal <code>ORDER BY</code> values as one peer group, which surprises people with duplicate dates. Specify <code>ROWS</code> when you mean rows.</p>

<h3>CTEs</h3>
<pre><code><span class="k">WITH</span> ranked <span class="k">AS</span> (
    <span class="k">SELECT</span> *, <span class="k">DENSE_RANK</span>() <span class="k">OVER</span> (<span class="k">PARTITION BY</span> dept <span class="k">ORDER BY</span> salary <span class="k">DESC</span>) <span class="k">AS</span> r
    <span class="k">FROM</span> employees
)
<span class="k">SELECT</span> dept, name, salary <span class="k">FROM</span> ranked <span class="k">WHERE</span> r &lt;= 3;     <span class="c">-- top 3 salaries per dept</span></code></pre>
<p>CTEs make multi-step logic readable and are how you filter on a window function. <b>Recursive CTEs</b> walk hierarchies (org charts, category trees) and generate series:</p>
<pre><code><span class="k">WITH RECURSIVE</span> chain <span class="k">AS</span> (            <span class="c">-- T-SQL omits RECURSIVE</span>
    <span class="k">SELECT</span> id, manager_id, 1 <span class="k">AS</span> lvl <span class="k">FROM</span> emp <span class="k">WHERE</span> manager_id <span class="k">IS NULL</span>
    <span class="k">UNION ALL</span>
    <span class="k">SELECT</span> e.id, e.manager_id, c.lvl + 1 <span class="k">FROM</span> emp e <span class="k">JOIN</span> chain c <span class="k">ON</span> e.manager_id = c.id
)
<span class="k">SELECT</span> * <span class="k">FROM</span> chain;</code></pre>
` },

  { id:"sql.3", title:"Classic SQL interview problems", body:`
<p class="l-lede">Six problems cover most of what gets asked. Each one is a pattern you'll reuse.</p>

<h4>1 · Nth highest salary</h4>
<pre><code><span class="k">SELECT</span> salary <span class="k">FROM</span> (
  <span class="k">SELECT</span> salary, <span class="k">DENSE_RANK</span>() <span class="k">OVER</span> (<span class="k">ORDER BY</span> salary <span class="k">DESC</span>) r <span class="k">FROM</span> employees
) t <span class="k">WHERE</span> r = 2;
<span class="c">-- Return NULL if none: wrap in SELECT (subquery) or use MAX(...)</span></code></pre>

<h4>2 · Duplicates</h4>
<pre><code><span class="k">SELECT</span> email <span class="k">FROM</span> users <span class="k">GROUP BY</span> email <span class="k">HAVING COUNT</span>(*) &gt; 1;

<span class="c">-- Delete duplicates, keep lowest id</span>
<span class="k">DELETE FROM</span> users <span class="k">WHERE</span> id <span class="k">IN</span> (
  <span class="k">SELECT</span> id <span class="k">FROM</span> (
    <span class="k">SELECT</span> id, <span class="k">ROW_NUMBER</span>() <span class="k">OVER</span> (<span class="k">PARTITION BY</span> email <span class="k">ORDER BY</span> id) rn <span class="k">FROM</span> users
  ) t <span class="k">WHERE</span> rn &gt; 1);</code></pre>

<h4>3 · Top N per group</h4>
<p>The CTE + <code>DENSE_RANK</code> pattern from the previous lesson. Decide out loud whether ties count (<code>RANK</code>/<code>DENSE_RANK</code>) or you want exactly N rows (<code>ROW_NUMBER</code>).</p>

<h4>4 · Anti-join: rows with no match</h4>
<pre><code><span class="k">SELECT</span> c.name <span class="k">FROM</span> customers c
<span class="k">WHERE NOT EXISTS</span> (<span class="k">SELECT</span> 1 <span class="k">FROM</span> orders o <span class="k">WHERE</span> o.customer_id = c.id);</code></pre>

<h4>5 · Consecutive streaks (gaps and islands)</h4>
<pre><code><span class="c">-- Users who logged in 3+ consecutive days</span>
<span class="k">WITH</span> d <span class="k">AS</span> (
  <span class="k">SELECT DISTINCT</span> user_id, login_date,
         login_date - <span class="k">ROW_NUMBER</span>() <span class="k">OVER</span> (<span class="k">PARTITION BY</span> user_id <span class="k">ORDER BY</span> login_date) * <span class="k">INTERVAL</span> '1 day' <span class="k">AS</span> grp
  <span class="k">FROM</span> logins
)
<span class="k">SELECT</span> user_id <span class="k">FROM</span> d <span class="k">GROUP BY</span> user_id, grp <span class="k">HAVING COUNT</span>(*) &gt;= 3;</code></pre>
<p>Date minus row number is constant within a run of consecutive days — the core "gaps and islands" trick. In T-SQL use <code>DATEADD(day, -ROW_NUMBER() OVER(...), login_date)</code>.</p>

<h4>6 · Running total and percent of total</h4>
<pre><code><span class="k">SELECT</span> day, revenue,
       <span class="k">SUM</span>(revenue) <span class="k">OVER</span> (<span class="k">ORDER BY</span> day) <span class="k">AS</span> running,
       100.0 * revenue / <span class="k">SUM</span>(revenue) <span class="k">OVER</span> () <span class="k">AS</span> pct
<span class="k">FROM</span> daily;</code></pre>
<p>Note <code>100.0</code>: integer division in SQL Server and PostgreSQL truncates <code>3 / 4</code> to <code>0</code>.</p>

<div class="drill">
  <span class="tag">Drill — LeetCode SQL 50 covers all of these</span>
  <ol>
    <li>Second Highest Salary, Nth Highest Salary</li>
    <li>Duplicate Emails, Delete Duplicate Emails</li>
    <li>Department Top Three Salaries</li>
    <li>Customers Who Never Order</li>
    <li>Consecutive Numbers / Game Play Analysis IV</li>
    <li>Employees Earning More Than Their Managers <em>— self join</em></li>
  </ol>
</div>
` },

  { id:"sql.4", title:"Indexes, transactions & isolation", body:`
<p class="l-lede">These questions show up in backend and design rounds: "why is this query slow?" and "what happens if two people book the last seat?"</p>

<h3>Indexes</h3>
<ul class="clean">
  <li><b>B-tree</b> (the default) — supports equality, ranges, ORDER BY, prefix matches. Lookups O(log n).</li>
  <li><b>Clustered</b> — the table is stored in index order; one per table (SQL Server, MySQL InnoDB's primary key). <b>Non-clustered</b> — separate structure pointing to rows.</li>
  <li><b>Composite</b> <code>(a, b, c)</code> — usable for filters on <code>a</code>, <code>a,b</code>, <code>a,b,c</code>; not for <code>b</code> alone (leftmost-prefix rule). Put equality columns before range columns.</li>
  <li><b>Covering</b> — includes every column the query needs, so the table is never touched (<code>INCLUDE</code> in SQL Server).</li>
  <li><b>Hash</b> — equality only. <b>GIN / full-text</b> — arrays, JSON, text search.</li>
</ul>
<p><b>Why an index isn't used:</b> function on the column (<code>WHERE YEAR(created) = 2026</code> — rewrite as a range), leading wildcard (<code>LIKE '%abc'</code>), implicit type conversion, low selectivity, or stale statistics. Check with <code>EXPLAIN</code> / the execution plan.</p>
<p><b>Cost:</b> every index slows writes and takes space. Don't index everything.</p>

<h3>Transactions: ACID</h3>
<p><b>Atomicity</b> (all or nothing), <b>Consistency</b> (constraints hold), <b>Isolation</b> (concurrent transactions don't see each other's partial work), <b>Durability</b> (committed survives a crash — write-ahead log).</p>

<h3>Isolation levels and the anomalies they allow</h3>
<div class="tbl"><table>
<tr><th>Level</th><th>Dirty read</th><th>Non-repeatable read</th><th>Phantom</th></tr>
<tr><td>Read uncommitted</td><td>Possible</td><td>Possible</td><td>Possible</td></tr>
<tr><td>Read committed <em>(SQL Server, Postgres default)</em></td><td>No</td><td>Possible</td><td>Possible</td></tr>
<tr><td>Repeatable read <em>(MySQL default)</em></td><td>No</td><td>No</td><td>Possible*</td></tr>
<tr><td>Serializable</td><td>No</td><td>No</td><td>No</td></tr>
</table></div>
<p style="font-size:13px;color:var(--muted)">* Postgres's repeatable read is snapshot isolation and prevents phantoms but allows write skew.</p>

<h3>The "last seat" answer</h3>
<ol class="steps">
  <li><b>Atomic conditional update:</b> <code>UPDATE seats SET held_by = @u WHERE id = @s AND held_by IS NULL</code> — check rows affected. Simplest and best.</li>
  <li><b>Pessimistic lock:</b> <code>SELECT … FOR UPDATE</code> (Postgres/MySQL) or <code>WITH (UPDLOCK)</code> (SQL Server) inside a transaction.</li>
  <li><b>Optimistic concurrency:</b> a <code>version</code> / <code>rowversion</code> column; update <code>WHERE version = @v</code>; retry on conflict. Same idea as Cosmos DB ETags.</li>
  <li><b>Unique constraint</b> as the final safety net.</li>
</ol>
` }
  ]
}

);
