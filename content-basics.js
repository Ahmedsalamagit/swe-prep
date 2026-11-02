/* Basics: complexity, data structures, recursion/sorting/bits. Plus Patterns IV. */
window.COURSE = window.COURSE || [];
window.COURSE.push(

/* ================= COMPLEXITY ================= */
{ id:"cx", title:"Complexity (Big-O)", mins:45,
  sub:"How to state, derive and defend the time and space cost of anything you write — the first thing every interviewer asks after you finish coding.",
  lessons:[

  { id:"cx.1", title:"Big-O in practice", body:`
<p class="l-lede">Big-O describes how cost grows as input grows. In an interview it is not a maths exercise — it is a one-sentence claim you make, then defend.</p>

<h3>The four rules that cover 95% of cases</h3>
<ol class="steps">
  <li><b>Drop constants.</b> <code>O(2n)</code> is <code>O(n)</code>. Two passes over an array are still linear.</li>
  <li><b>Drop non-dominant terms.</b> <code>O(n² + n)</code> is <code>O(n²)</code>.</li>
  <li><b>Different inputs get different letters.</b> Looping over <code>a</code> then <code>b</code> is <code>O(a + b)</code>; nesting them is <code>O(a · b)</code>. Calling it <code>O(n²)</code> is a classic mistake interviewers listen for.</li>
  <li><b>Sequential adds, nested multiplies.</b> That is the whole algebra for iterative code.</li>
</ol>

<h3>The growth classes, and what they look like</h3>
<div class="tbl"><table>
<tr><th>Class</th><th>Name</th><th>Typical source</th></tr>
<tr><td class="nc"><code>O(1)</code></td><td>Constant</td><td>Hash lookup, array index, push/pop on a stack</td></tr>
<tr><td class="nc"><code>O(log n)</code></td><td>Logarithmic</td><td>Binary search, balanced-tree op, heap push/pop</td></tr>
<tr><td class="nc"><code>O(n)</code></td><td>Linear</td><td>One pass, two pointers, sliding window, BFS/DFS on V+E</td></tr>
<tr><td class="nc"><code>O(n log n)</code></td><td>Linearithmic</td><td>Sorting, n heap operations, merge sort</td></tr>
<tr><td class="nc"><code>O(n²)</code></td><td>Quadratic</td><td>All pairs, nested loops, 2D DP on n×n</td></tr>
<tr><td class="nc"><code>O(2ⁿ)</code></td><td>Exponential</td><td>All subsets, naive recursion with two branches</td></tr>
<tr><td class="nc"><code>O(n!)</code></td><td>Factorial</td><td>All permutations</td></tr>
</table></div>

<h3>Reverse-engineer from the constraints</h3>
<p>Problem statements give you <code>n</code>'s upper bound. A judge does roughly 10⁸ simple operations per second, so the bound tells you which complexity is expected. Use it to steer before you write a line.</p>
<div class="tbl"><table>
<tr><th>n up to</th><th>Target complexity</th><th>Usually means</th></tr>
<tr><td class="nc">≤ 12</td><td><code>O(n!)</code></td><td>Permutations / brute backtracking</td></tr>
<tr><td class="nc">≤ 25</td><td><code>O(2ⁿ)</code></td><td>Subsets, bitmask</td></tr>
<tr><td class="nc">≤ 500</td><td><code>O(n³)</code></td><td>Interval DP, Floyd–Warshall</td></tr>
<tr><td class="nc">≤ 5,000</td><td><code>O(n²)</code></td><td>2D DP, all pairs</td></tr>
<tr><td class="nc">≤ 10⁶</td><td><code>O(n log n)</code></td><td>Sort, heap, binary search on answer</td></tr>
<tr><td class="nc">≥ 10⁷</td><td><code>O(n)</code> / <code>O(log n)</code></td><td>One pass, math, binary search</td></tr>
</table></div>

<div class="callout">
  <span class="tag">How to say it</span>
  <p>"This is O(n log n) time because of the sort; the scan after is linear and dominated. Space is O(n) for the hash map — O(1) extra if I'm allowed to sort in place." State time <em>and</em> space, name the dominating step, and mention the alternative trade-off. That sentence alone scores on the problem-solving rubric.</p>
</div>

<h3>Best, average, worst — and which one to quote</h3>
<p>Quote the worst case unless you say otherwise. The exception is when the average is what everyone means: hash-table operations are <code>O(1)</code> average, <code>O(n)</code> worst (all keys collide); quicksort is <code>O(n log n)</code> average, <code>O(n²)</code> worst. Say "average" out loud when you rely on it — interviewers note whether you know the difference.</p>
` },

  { id:"cx.2", title:"Deriving it: loops, recursion, amortised", body:`
<p class="l-lede">Most complexity questions are one of four shapes. Recognise the shape and the answer falls out.</p>

<h3>1 · Loops that shrink by a factor</h3>
<p>Any loop where the remaining work is halved (or divided by any constant) each step runs <code>O(log n)</code> times. Binary search, <code>while (n &gt; 0) n /= 2</code>, walking up a balanced tree, repeated squaring.</p>

<h3>2 · Nested loops where the inner bound depends on the outer</h3>
<pre><code><span class="k">for</span> (int i = 0; i &lt; n; i++)
    <span class="k">for</span> (int j = i; j &lt; n; j++)   <span class="c">// n + (n-1) + ... + 1 = n(n+1)/2</span>
        Work();                       <span class="c">// => O(n²), not O(n log n)</span></code></pre>
<p>Triangular loops are still quadratic. Contrast with <code>for (j = 1; j &lt; n; j *= 2)</code> inside an <code>n</code> loop: that is <code>O(n log n)</code>.</p>

<h3>3 · Recursion: branches<sup>depth</sup></h3>
<p>Draw the recursion tree. Total work ≈ (number of calls) × (work per call). Number of calls ≈ <b>branching factor ^ depth</b>.</p>
<ul>
  <li>Naive Fibonacci: 2 branches, depth n → <code>O(2ⁿ)</code>.</li>
  <li>Memoised Fibonacci: each of n states computed once → <code>O(n)</code>. Memoisation turns "calls" into "distinct states".</li>
  <li>Merge sort: 2 branches, depth log n, O(n) work per level → <code>O(n log n)</code>.</li>
  <li>Subsets: 2 choices per element, depth n, O(n) to copy each result → <code>O(n · 2ⁿ)</code>.</li>
  <li>Permutations: n · (n−1) · … → <code>O(n · n!)</code>.</li>
</ul>

<h3>The Master Theorem, interview version</h3>
<p>For <code>T(n) = a·T(n/b) + O(n<sup>d</sup>)</code>, compare <code>a</code> with <code>b<sup>d</sup></code>:</p>
<div class="tbl"><table>
<tr><th>Case</th><th>Result</th><th>Example</th></tr>
<tr><td><code>a &lt; b<sup>d</sup></code></td><td><code>O(n<sup>d</sup>)</code> — top level dominates</td><td>Quickselect avg: T(n)=T(n/2)+n → O(n)</td></tr>
<tr><td><code>a = b<sup>d</sup></code></td><td><code>O(n<sup>d</sup> log n)</code> — every level equal</td><td>Merge sort: 2T(n/2)+n → O(n log n)</td></tr>
<tr><td><code>a &gt; b<sup>d</sup></code></td><td><code>O(n<sup>log_b a</sup>)</code> — leaves dominate</td><td>Tree traversal: 2T(n/2)+1 → O(n)</td></tr>
</table></div>

<h3>4 · Amortised cost</h3>
<p>Some operations are occasionally expensive but cheap on average across a sequence. <code>List&lt;T&gt;.Add</code> doubles capacity when full — that copy is O(n), but it happens so rarely that n adds cost O(n) total, so each is <b>amortised O(1)</b>. Same argument for:</p>
<ul>
  <li><b>Monotonic stack / sliding window:</b> each element is pushed once and popped at most once, so the nested <code>while</code> inside the <code>for</code> is still O(n) overall. Interviewers often probe this — say "each index enters and leaves at most once."</li>
  <li><b>Union-find</b> with path compression + rank: amortised ~O(α(n)), effectively constant.</li>
</ul>

<div class="callout gold">
  <span class="tag">Traps that cost points</span>
  <p><b>Hidden linear work:</b> string concatenation in a loop (O(n²) in C#/Java/Python), <code>list.Contains</code> / <code>in list</code> inside a loop, slicing (<code>s[1:]</code>, <code>Substring</code>) in recursion, <code>List.RemoveAt(0)</code>. Each looks O(1) and is O(n).</p>
  <p><b>Sorting strings</b> is O(n log n · L) where L is string length. Hashing a string key is O(L). Mention it when L is unbounded.</p>
</div>
` },

  { id:"cx.3", title:"Space complexity & the cost cheat sheet", body:`
<p class="l-lede">Space is the follow-up you forget to answer. Count what you allocate that grows with input — plus the call stack.</p>

<h3>What counts</h3>
<ul class="clean">
  <li><b>Auxiliary structures</b> — hash maps, visited sets, DP tables, queues. The output array is usually excluded; say so.</li>
  <li><b>Recursion depth</b> — every frame is memory. DFS on a skewed tree is O(n) stack; on a balanced tree O(log n). Recursing over a 10⁵-length linked list can stack-overflow in C#/Java and hits Python's default limit of 1000.</li>
  <li><b>Copies</b> — slicing, <code>ToList()</code>, <code>string.Substring</code>, sorted copies. "In place" means O(1) extra, not "I didn't call new".</li>
</ul>

<h3>Data structure operations</h3>
<div class="tbl"><table>
<tr><th>Structure</th><th>Access</th><th>Search</th><th>Insert</th><th>Delete</th></tr>
<tr><td>Array / dynamic array</td><td class="nc">O(1)</td><td class="nc">O(n)</td><td class="nc">O(1)* end, O(n) mid</td><td class="nc">O(1) end, O(n) mid</td></tr>
<tr><td>Linked list</td><td class="nc">O(n)</td><td class="nc">O(n)</td><td class="nc">O(1) at known node</td><td class="nc">O(1) at known node</td></tr>
<tr><td>Hash map / set</td><td class="nc">—</td><td class="nc">O(1) avg</td><td class="nc">O(1) avg</td><td class="nc">O(1) avg</td></tr>
<tr><td>Balanced BST (SortedSet, TreeMap)</td><td class="nc">O(log n)</td><td class="nc">O(log n)</td><td class="nc">O(log n)</td><td class="nc">O(log n)</td></tr>
<tr><td>Binary heap</td><td class="nc">O(1) top</td><td class="nc">O(n)</td><td class="nc">O(log n)</td><td class="nc">O(log n) top</td></tr>
<tr><td>Stack / queue / deque</td><td class="nc">O(1) ends</td><td class="nc">O(n)</td><td class="nc">O(1)</td><td class="nc">O(1)</td></tr>
<tr><td>Trie</td><td class="nc">—</td><td class="nc">O(L)</td><td class="nc">O(L)</td><td class="nc">O(L)</td></tr>
</table></div>
<p style="font-size:13px;color:var(--muted)">* amortised. L = key length.</p>

<h3>Algorithms</h3>
<div class="tbl"><table>
<tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Note</th></tr>
<tr><td>Merge sort</td><td class="nc">O(n log n)</td><td class="nc">O(n)</td><td>Stable; Java/Python object sort</td></tr>
<tr><td>Quicksort</td><td class="nc">O(n log n) avg, O(n²) worst</td><td class="nc">O(log n)</td><td>Unstable; basis of introsort (C# <code>Array.Sort</code>)</td></tr>
<tr><td>Heap sort</td><td class="nc">O(n log n)</td><td class="nc">O(1)</td><td>Unstable</td></tr>
<tr><td>Counting / bucket sort</td><td class="nc">O(n + k)</td><td class="nc">O(k)</td><td>Small integer range</td></tr>
<tr><td>Binary search</td><td class="nc">O(log n)</td><td class="nc">O(1)</td><td>Sorted or monotonic predicate</td></tr>
<tr><td>BFS / DFS</td><td class="nc">O(V + E)</td><td class="nc">O(V)</td><td>Grid: V = rows × cols</td></tr>
<tr><td>Dijkstra (binary heap)</td><td class="nc">O((V + E) log V)</td><td class="nc">O(V)</td><td>Non-negative weights</td></tr>
<tr><td>Topological sort</td><td class="nc">O(V + E)</td><td class="nc">O(V)</td><td>Kahn's or DFS</td></tr>
<tr><td>Union-find</td><td class="nc">~O(α(n)) per op</td><td class="nc">O(n)</td><td>Path compression + rank</td></tr>
</table></div>

<div class="drill">
  <span class="tag">Drill — say the complexity before you look</span>
  <ol>
    <li>Two Sum with a hash map <em>— O(n) / O(n)</em></li>
    <li>Sort then two-pointer 3Sum <em>— O(n²) / O(1) extra (ignoring sort)</em></li>
    <li>Top-K frequent with a size-k heap <em>— O(n log k) / O(n)</em></li>
    <li>Number of islands on m×n grid <em>— O(mn) / O(mn) worst stack or queue</em></li>
    <li>Word search (backtracking) on m×n with word length L <em>— O(mn · 3^L) / O(L)</em></li>
    <li>Longest common subsequence of lengths m, n <em>— O(mn) / O(min(m,n)) with rolling rows</em></li>
  </ol>
</div>
` }
  ]
},

/* ================= DATA STRUCTURES ================= */
{ id:"ds", title:"Data Structures", mins:90,
  sub:"Every structure that shows up in interviews: what it is, what it costs, its corner cases, and the techniques it unlocks.",
  lessons:[

  { id:"ds.1", title:"Arrays & strings", body:`
<p class="l-lede">Half of all coding questions are array or string questions wearing a costume. The techniques matter more than the structure.</p>

<h3>What to clarify first</h3>
<ul class="clean">
  <li>Sorted? Duplicates? Negative numbers? Can I modify the input?</li>
  <li>Strings: ASCII only, or Unicode? Case-sensitive? Is the character set bounded (26 letters → a fixed <code>int[26]</code> beats a hash map)?</li>
  <li>Empty input, single element, all-identical elements — say these out loud before coding.</li>
</ul>

<h3>Techniques this structure unlocks</h3>
<div class="tbl"><table>
<tr><th>Signal in the problem</th><th>Technique</th></tr>
<tr><td>Sorted array, find a pair/triple</td><td>Two pointers from both ends</td></tr>
<tr><td>Contiguous subarray / substring with a condition</td><td>Sliding window</td></tr>
<tr><td>Range sums, "subarray sums to k"</td><td>Prefix sums (+ hash map of prefix counts)</td></tr>
<tr><td>Need O(1) extra space, values in 1..n</td><td>Index-as-hash (negate / swap into place)</td></tr>
<tr><td>Anagram, permutation, frequency</td><td>Count array / frequency map</td></tr>
<tr><td>Rotate, reverse in place</td><td>Reverse whole, then reverse parts</td></tr>
<tr><td>"Next greater", "days until warmer"</td><td>Monotonic stack</td></tr>
</table></div>

<h3>Strings are immutable in C#, Java, Python, JavaScript</h3>
<p>Every <code>s += c</code> allocates a new string. In a loop that is O(n²). Use <code>StringBuilder</code> (C#/Java), <code>"".join(parts)</code> (Python), or <code>parts.join("")</code> (JS). To mutate characters, convert to a char array first. C++ is the odd one out — <code>std::string</code> is mutable.</p>

<h3>Matrices (2D arrays)</h3>
<p>Grid problems are graph problems. Keep a direction array <code>{(0,1),(1,0),(0,-1),(-1,0)}</code>, bounds-check before indexing, and decide up front whether you may mark visited cells in place. Common moves: transpose + reverse rows to rotate 90°, layer-by-layer for spiral order, first row/column as markers for "set matrix zeroes" in O(1) space.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Product of Array Except Self <em>— prefix/suffix products, no division</em></li>
    <li>Rotate Image <em>— transpose then reverse</em></li>
    <li>Spiral Matrix</li>
    <li>Longest Substring Without Repeating Characters <em>— sliding window</em></li>
    <li>Group Anagrams <em>— sorted key or count key</em></li>
    <li>First Missing Positive <em>— index-as-hash, O(1) space</em></li>
  </ol>
</div>
` },

  { id:"ds.2", title:"Linked lists", body:`
<p class="l-lede">Linked list questions test pointer discipline, not cleverness. Almost all of them yield to three tools: a dummy head, two pointers, and in-place reversal.</p>

<h3>The three tools</h3>
<ol class="steps">
  <li><b>Dummy (sentinel) head.</b> Create <code>dummy.next = head</code> whenever the head itself might change — deletions, merges, partitions. Return <code>dummy.next</code>. It deletes a whole class of edge cases.</li>
  <li><b>Fast and slow pointers.</b> Fast moves 2, slow moves 1. Finds the middle, detects cycles (Floyd), finds the cycle start (reset one pointer to head, move both by 1), finds the k-th from the end (give fast a k-step head start).</li>
  <li><b>Reverse in place.</b> Three variables: <code>prev</code>, <code>cur</code>, <code>next</code>. Memorise it cold; it is a sub-step of palindrome check, reorder list, and reverse-in-k-groups.</li>
</ol>

<pre><code><span class="k">ListNode</span> Reverse(ListNode head) {
    ListNode prev = <span class="k">null</span>, cur = head;
    <span class="k">while</span> (cur != <span class="k">null</span>) {
        <span class="k">var</span> next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    <span class="k">return</span> prev;
}</code></pre>

<h3>Corner cases to say out loud</h3>
<ul>
  <li>Empty list, one node, two nodes (fast/slow off-by-ones live here).</li>
  <li>Cycle present when you assumed none.</li>
  <li>Operating on the head node itself.</li>
</ul>

<div class="callout">
  <span class="tag">Why it still gets asked</span>
  <p>Real code rarely uses raw linked lists, but LRU caches (hash map + doubly linked list) and most queue implementations do. "Design an LRU cache" is a top-10 question at Microsoft, Amazon and Meta — it is the reason to be fluent here.</p>
</div>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Reverse Linked List <em>— iterative and recursive</em></li>
    <li>Merge Two Sorted Lists <em>— dummy head</em></li>
    <li>Linked List Cycle II <em>— Floyd, find the start</em></li>
    <li>Remove Nth Node From End <em>— fast pointer head start</em></li>
    <li>Reorder List <em>— middle + reverse + merge</em></li>
    <li>LRU Cache <em>— see Low-Level Design</em></li>
  </ol>
</div>
` },

  { id:"ds.3", title:"Hash tables", body:`
<p class="l-lede">When you are stuck, ask "what would I want to look up in O(1)?" A hash map is the most common optimisation in the entire interview canon.</p>

<h3>How it works, briefly — because you will be asked</h3>
<p>A key is hashed to an integer, reduced modulo the bucket count, and stored in that bucket. Two keys landing in one bucket is a <b>collision</b>, resolved by <b>chaining</b> (each bucket holds a small list — Java's <code>HashMap</code>, which upgrades long chains to red-black trees) or <b>open addressing</b> (probe for the next free slot — Python's <code>dict</code>, C#'s <code>Dictionary</code> uses chaining via an entries array). When the load factor passes a threshold the table doubles and rehashes — amortised O(1) inserts.</p>

<h3>The uses, by pattern</h3>
<ul class="clean">
  <li><b>Complement lookup</b> — Two Sum: store what you've seen, check for <code>target − x</code>.</li>
  <li><b>Counting</b> — anagrams, top-K frequent, majority element.</li>
  <li><b>Prefix-sum counts</b> — "number of subarrays summing to k": store how often each running sum has occurred.</li>
  <li><b>Canonical key grouping</b> — group anagrams by sorted string or 26-count tuple.</li>
  <li><b>Visited / dedupe</b> — any graph traversal, cycle detection in sequences.</li>
  <li><b>Index map</b> — value → last index seen, for windows and "contains duplicate within k".</li>
</ul>

<h3>Keys you must be careful with</h3>
<ul>
  <li><b>Mutable keys</b> — a list or array key hashes by reference in C#/Java/JS. Use a tuple/record, a string encoding, or a struct. Python refuses list keys outright; use <code>tuple(...)</code>.</li>
  <li><b>Custom objects</b> — override <code>Equals</code> + <code>GetHashCode</code> (C#), <code>equals</code> + <code>hashCode</code> (Java), <code>__eq__</code> + <code>__hash__</code> (Python). Or use C# <code>record</code> / Java <code>record</code>, which do it for you.</li>
  <li><b>JavaScript objects as maps</b> — keys are coerced to strings; <code>{}</code> has prototype keys. Use <code>Map</code>.</li>
</ul>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Two Sum</li>
    <li>Subarray Sum Equals K <em>— prefix sums + counts</em></li>
    <li>Longest Consecutive Sequence <em>— set, start only at sequence heads, O(n)</em></li>
    <li>Contains Duplicate II</li>
    <li>Insert Delete GetRandom O(1) <em>— map + array swap-remove</em></li>
  </ol>
</div>
` },

  { id:"ds.4", title:"Stacks, queues & deques", body:`
<p class="l-lede">A stack answers "what was the most recent unresolved thing?" A queue answers "what's next, in arrival order?" Recognising which question the problem is asking is the skill.</p>

<h3>Stack signals</h3>
<ul class="clean">
  <li>Matching / nesting — parentheses, HTML tags, decode <code>3[a2[c]]</code>.</li>
  <li>Undo / backtrack — browser history, path simplification (<code>/a/./b/../c</code>).</li>
  <li>Expression evaluation — RPN, basic calculator.</li>
  <li>"Next greater / smaller element", "largest rectangle" — <b>monotonic stack</b> (covered in Patterns III).</li>
  <li>Iterative DFS — replace recursion when depth could overflow.</li>
</ul>

<h3>Queue signals</h3>
<ul class="clean">
  <li>BFS — shortest path in an unweighted graph, level-order traversal.</li>
  <li>Processing in arrival order — task scheduling, rate limiter windows.</li>
  <li><b>Monotonic deque</b> — sliding window maximum in O(n): keep indices whose values are decreasing; pop the front when it leaves the window.</li>
</ul>

<h3>Which type in which language</h3>
<div class="tbl"><table>
<tr><th></th><th>Stack</th><th>Queue</th><th>Deque</th></tr>
<tr><td>C#</td><td><code>Stack&lt;T&gt;</code></td><td><code>Queue&lt;T&gt;</code></td><td><code>LinkedList&lt;T&gt;</code> (no built-in deque)</td></tr>
<tr><td>Python</td><td><code>list</code> (append/pop)</td><td><code>collections.deque</code></td><td><code>collections.deque</code></td></tr>
<tr><td>Java</td><td><code>ArrayDeque</code> (not <code>Stack</code>)</td><td><code>ArrayDeque</code></td><td><code>ArrayDeque</code></td></tr>
<tr><td>JavaScript</td><td><code>Array</code> push/pop</td><td>Array + head index (shift is O(n))</td><td>Write one, or index tricks</td></tr>
</table></div>

<div class="callout gold">
  <span class="tag">Classic follow-ups</span>
  <p>"Implement a queue using two stacks" (amortised O(1) — move inbox to outbox only when outbox is empty). "Min stack" (store the running min alongside each value). Both are five-minute warm-ups that open many phone screens.</p>
</div>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Valid Parentheses</li>
    <li>Min Stack</li>
    <li>Implement Queue using Stacks</li>
    <li>Evaluate Reverse Polish Notation</li>
    <li>Sliding Window Maximum <em>— monotonic deque</em></li>
    <li>Decode String</li>
  </ol>
</div>
` },

  { id:"ds.5", title:"Trees & tries", body:`
<p class="l-lede">Trees are recursion's natural habitat. If you can write "solve left, solve right, combine" fluently, most tree problems are ten lines.</p>

<h3>Vocabulary you should use precisely</h3>
<div class="tbl"><table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Binary tree</td><td>Each node has ≤ 2 children. No ordering implied.</td></tr>
<tr><td>BST</td><td>Left subtree &lt; node &lt; right subtree, for <em>every</em> node — not just immediate children.</td></tr>
<tr><td>Balanced</td><td>Height O(log n). AVL and red-black trees self-balance; a plain BST does not.</td></tr>
<tr><td>Complete</td><td>Every level full except possibly the last, filled left to right. This is why a heap fits in an array.</td></tr>
<tr><td>Full / perfect</td><td>Every node has 0 or 2 children / every level completely full.</td></tr>
<tr><td>Height vs depth</td><td>Height counts down from a node to its deepest leaf; depth counts up to the root.</td></tr>
</table></div>

<h3>Traversals</h3>
<ul>
  <li><b>Pre-order</b> (node, left, right) — copying/serialising a tree.</li>
  <li><b>In-order</b> (left, node, right) — gives a BST in sorted order. Validating a BST = checking in-order is strictly increasing.</li>
  <li><b>Post-order</b> (left, right, node) — anything that needs the children's answers first: height, diameter, delete.</li>
  <li><b>Level-order</b> — BFS with a queue; snapshot <code>queue.Count</code> to process one level at a time.</li>
</ul>
<p>Know at least in-order iteratively with an explicit stack — it is a common "now without recursion" follow-up.</p>

<h3>Tries (prefix trees)</h3>
<p>Each node holds children keyed by character plus an <code>isEnd</code> flag. Insert and lookup are O(L) in key length, independent of how many words are stored. Reach for a trie when you see: prefix search, autocomplete, "word search II" over a grid with many words, or longest common prefix across many strings.</p>
<pre><code><span class="k">class</span> TrieNode {
    <span class="k">public</span> TrieNode[] Next = <span class="k">new</span> TrieNode[26];
    <span class="k">public bool</span> IsEnd;
}
<span class="k">void</span> Insert(TrieNode root, <span class="k">string</span> w) {
    <span class="k">var</span> n = root;
    <span class="k">foreach</span> (<span class="k">var</span> c <span class="k">in</span> w) n = n.Next[c - 'a'] ??= <span class="k">new</span> TrieNode();
    n.IsEnd = <span class="k">true</span>;
}</code></pre>

<h3>Corner cases</h3>
<p>Empty tree, single node, completely skewed tree (O(n) recursion depth — mention it), duplicate values in a "BST" (clarify where they go), integer overflow when validating a BST with <code>int.MinValue</code>/<code>MaxValue</code> sentinels — use <code>long</code> or nullable bounds.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Implement Trie (Prefix Tree)</li>
    <li>Design Add and Search Words <em>— trie + DFS on '.'</em></li>
    <li>Word Search II <em>— trie + grid backtracking</em></li>
    <li>Binary Tree Inorder Traversal <em>— iterative</em></li>
    <li>Serialize and Deserialize Binary Tree</li>
  </ol>
</div>
` },

  { id:"ds.6", title:"Heaps (priority queues)", body:`
<p class="l-lede">A heap gives you the min (or max) in O(1) and lets you add or remove in O(log n). Any time a problem says "k smallest", "k largest", "closest", "merge sorted", or "schedule by earliest", think heap.</p>

<h3>The mechanics</h3>
<p>A binary heap is a complete binary tree stored in an array: children of <code>i</code> are <code>2i+1</code> and <code>2i+2</code>, parent is <code>(i−1)/2</code>. Push appends and sifts up; pop swaps the root with the last element and sifts down. <b>Building a heap from n items is O(n)</b>, not O(n log n) — a favourite trick question.</p>

<h3>The four heap patterns</h3>
<ol class="steps">
  <li><b>Top-K with a size-k heap.</b> For k largest, keep a <em>min</em>-heap of size k; pop when it exceeds k. O(n log k). The counter-intuitive heap direction is the point of the question.</li>
  <li><b>K-way merge.</b> Push the head of each of k sorted lists; pop the smallest, push its successor. O(N log k).</li>
  <li><b>Two heaps.</b> Max-heap for the lower half, min-heap for the upper half → running median in O(log n) per insert.</li>
  <li><b>Greedy scheduling / Dijkstra.</b> Always expand the cheapest frontier item next.</li>
</ol>

<h3>Language support is wildly uneven</h3>
<div class="tbl"><table>
<tr><th>Language</th><th>Type</th><th>Default</th><th>Max-heap trick</th></tr>
<tr><td>C#</td><td><code>PriorityQueue&lt;TElement,TPriority&gt;</code></td><td>Min</td><td>Comparer: <code>Comparer&lt;int&gt;.Create((a,b) =&gt; b.CompareTo(a))</code></td></tr>
<tr><td>Python</td><td><code>heapq</code> on a list</td><td>Min</td><td>Push negated values</td></tr>
<tr><td>Java</td><td><code>PriorityQueue&lt;E&gt;</code></td><td>Min</td><td><code>new PriorityQueue&lt;&gt;(Collections.reverseOrder())</code></td></tr>
<tr><td>JavaScript</td><td><b>None built in</b></td><td>—</td><td>Write a 25-line binary heap or sort (state the cost)</td></tr>
</table></div>
<p>C#'s <code>PriorityQueue</code> has no decrease-key and cannot remove arbitrary items — see "PriorityQueue — the trap" in the C# topic.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Kth Largest Element in an Array <em>— heap O(n log k), quickselect O(n) avg</em></li>
    <li>Top K Frequent Elements</li>
    <li>Merge k Sorted Lists</li>
    <li>Find Median from Data Stream <em>— two heaps</em></li>
    <li>K Closest Points to Origin</li>
  </ol>
</div>
` },

  { id:"ds.7", title:"Graphs: representation & traversal", body:`
<p class="l-lede">Most graph questions are disguised. Grids, word ladders, course prerequisites, friend networks and dependency builds are all graphs. Step one is noticing.</p>

<h3>Representations</h3>
<div class="tbl"><table>
<tr><th>Form</th><th>Space</th><th>Edge check</th><th>Use when</th></tr>
<tr><td>Adjacency list</td><td class="nc">O(V + E)</td><td class="nc">O(degree)</td><td>Default. Sparse graphs — nearly every interview problem.</td></tr>
<tr><td>Adjacency matrix</td><td class="nc">O(V²)</td><td class="nc">O(1)</td><td>Dense graphs, small V, Floyd–Warshall.</td></tr>
<tr><td>Edge list</td><td class="nc">O(E)</td><td class="nc">O(E)</td><td>Kruskal's MST, Bellman–Ford, union-find input.</td></tr>
<tr><td>Implicit (grid)</td><td class="nc">O(1) extra</td><td class="nc">O(1)</td><td>Neighbours computed from coordinates.</td></tr>
</table></div>

<h3>Choosing a traversal</h3>
<ul class="clean">
  <li><b>BFS</b> — shortest path by edge count, level-by-level, "minimum steps". Queue + visited marked <em>when enqueued</em> (marking on dequeue causes duplicates).</li>
  <li><b>DFS</b> — connectivity, counting components, cycle detection, path existence, backtracking. Recursion or explicit stack.</li>
  <li><b>Topological sort</b> — ordering with dependencies; also detects cycles in a directed graph (Kahn's: if processed &lt; V, there's a cycle).</li>
  <li><b>Union-find</b> — dynamic connectivity, "number of connected components", redundant connection.</li>
  <li><b>Dijkstra</b> — weighted shortest path, non-negative weights. Min-heap of (dist, node); skip stale entries.</li>
  <li><b>0-1 BFS / multi-source BFS</b> — weights of 0/1 with a deque; start the queue with all sources ("rotting oranges", "walls and gates").</li>
</ul>

<h3>Cycle detection differs by graph type</h3>
<p><b>Undirected:</b> DFS that ignores the edge back to the parent, or union-find (an edge joining two nodes already in one set is a cycle). <b>Directed:</b> three-colour DFS (white/grey/black — a grey neighbour means a back edge) or Kahn's algorithm. Using the undirected technique on a directed graph is a frequent bug.</p>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Number of Islands</li>
    <li>Clone Graph</li>
    <li>Course Schedule II <em>— topological order</em></li>
    <li>Rotting Oranges <em>— multi-source BFS</em></li>
    <li>Network Delay Time <em>— Dijkstra</em></li>
    <li>Word Ladder <em>— BFS on implicit graph</em></li>
  </ol>
</div>
` }
  ]
},

/* ================= RECURSION / SORTING / BITS ================= */
{ id:"rs", title:"Recursion, Sorting & Bits", mins:50,
  sub:"The algorithmic building blocks under everything else: recursion and memoisation, the sorts you must be able to explain, binary search, and bit tricks.",
  lessons:[

  { id:"rs.1", title:"Recursion & memoisation", body:`
<p class="l-lede">Every recursive function is three decisions: the base case, the recursive case, and what you return. Get those right before writing a single line.</p>

<h3>A template that prevents most bugs</h3>
<ol class="steps">
  <li><b>Define the function in English.</b> "<code>Height(node)</code> returns the number of nodes on the longest path from node down to a leaf." If you can't say it, you can't code it.</li>
  <li><b>Base case first.</b> Usually null / empty / index out of range. Handle it at the top.</li>
  <li><b>Trust the recursion.</b> Assume the call on a smaller input returns the right answer and combine.</li>
  <li><b>Check that every path shrinks the input</b> toward the base case.</li>
</ol>

<h3>From recursion to DP</h3>
<p>If the recursion tree has repeated sub-calls with the same arguments, cache them. That's top-down DP (memoisation). The arguments that change between calls are the <b>state</b>; the number of distinct states × work per state is the new complexity.</p>
<pre><code><span class="c">// Climbing stairs: 2^n naive -> O(n) memoised</span>
<span class="k">int</span> Ways(<span class="k">int</span> n, Dictionary&lt;<span class="k">int</span>,<span class="k">int</span>&gt; memo) {
    <span class="k">if</span> (n &lt;= 1) <span class="k">return</span> 1;
    <span class="k">if</span> (memo.TryGetValue(n, <span class="k">out var</span> v)) <span class="k">return</span> v;
    <span class="k">return</span> memo[n] = Ways(n - 1, memo) + Ways(n - 2, memo);
}</code></pre>
<p>Python gives you <code>@functools.cache</code> for free — a real speed advantage in interviews. In C#, Java and JS you write the dictionary by hand, or switch to a bottom-up array.</p>

<h3>Recursion pitfalls by language</h3>
<ul>
  <li><b>Python</b> — default recursion limit is 1000. Deep DFS on a 10⁴-node path fails; use <code>sys.setrecursionlimit</code> or go iterative.</li>
  <li><b>C# / Java</b> — default stack ~1 MB; typically tens of thousands of frames. A <code>StackOverflowException</code> in .NET cannot be caught and kills the process.</li>
  <li><b>JavaScript</b> — ~10k frames in V8; no tail-call optimisation in practice.</li>
</ul>
<p>Say "this is O(h) stack; on a skewed input I'd convert to an explicit stack" — that's the senior signal.</p>
` },

  { id:"rs.2", title:"Sorting & searching", body:`
<p class="l-lede">You will almost never implement a sort in an interview. You will often be asked how one works, why the library chose it, and when sorting is the whole trick.</p>

<h3>What each standard library actually does</h3>
<div class="tbl"><table>
<tr><th>Language</th><th>Algorithm</th><th>Stable?</th></tr>
<tr><td>C# <code>Array.Sort</code> / <code>List.Sort</code></td><td>Introsort (quick → heap → insertion)</td><td><b>No</b></td></tr>
<tr><td>C# LINQ <code>OrderBy</code></td><td>Stable sort</td><td>Yes</td></tr>
<tr><td>Python <code>sorted</code> / <code>.sort</code></td><td>Timsort (Powersort since 3.11)</td><td>Yes</td></tr>
<tr><td>Java <code>Arrays.sort(int[])</code></td><td>Dual-pivot quicksort</td><td>No (primitives)</td></tr>
<tr><td>Java <code>Arrays.sort(Object[])</code>, <code>Collections.sort</code></td><td>Timsort</td><td>Yes</td></tr>
<tr><td>JavaScript <code>Array.prototype.sort</code></td><td>Timsort in V8</td><td>Yes (spec since ES2019)</td></tr>
</table></div>
<div class="callout gold">
  <span class="tag">The JavaScript trap</span>
  <p><code>[10, 9, 1].sort()</code> returns <code>[1, 10, 9]</code> — the default comparator converts to strings. Always pass <code>(a, b) =&gt; a - b</code>.</p>
</div>

<h3>Algorithms you should be able to explain in 60 seconds</h3>
<ul class="clean">
  <li><b>Merge sort</b> — split in half, sort each, merge. O(n log n) always, O(n) space, stable. Basis of "count inversions" and "sort a linked list".</li>
  <li><b>Quicksort</b> — partition around a pivot, recurse. O(n log n) average, O(n²) worst on bad pivots; random pivot fixes it in expectation. <b>Quickselect</b> uses one side only → O(n) average for k-th element.</li>
  <li><b>Heap sort</b> — build heap, pop n times. O(n log n), O(1) space, unstable.</li>
  <li><b>Counting / bucket / radix</b> — beat n log n when keys are small integers or bounded. "Top K frequent" in O(n) with buckets indexed by frequency.</li>
</ul>

<h3>When sorting is the trick</h3>
<p>Intervals (sort by start), meeting rooms, "minimum arrows", two-pointer pair sums, grouping anagrams, greedy assignment ("assign cookies"), and deduping 3Sum. If brute force is O(n²) and you can't see a hash-map trick, ask whether sorting first gives O(n log n).</p>

<h3>Binary search beyond sorted arrays</h3>
<p>Binary search works on any <b>monotonic predicate</b>: "is speed k enough to eat all bananas in h hours?" goes false…false…true…true as k rises. Search the answer space, not the array. Covered in depth in Patterns I; the template with <code>lo &lt; hi</code> and <code>hi = mid</code> avoids infinite loops.</p>
` },

  { id:"rs.3", title:"Binary, bits & math", body:`
<p class="l-lede">Low priority, but a handful of bit tricks come up repeatedly and are free points if you know them.</p>

<h3>The tricks worth memorising</h3>
<div class="tbl"><table>
<tr><th>Expression</th><th>Does</th></tr>
<tr><td><code>x &amp; 1</code></td><td>Odd test</td></tr>
<tr><td><code>x &amp; (x - 1)</code></td><td>Clears the lowest set bit. <code>== 0</code> → power of two. Loop it to count bits.</td></tr>
<tr><td><code>x &amp; -x</code></td><td>Isolates the lowest set bit (Fenwick trees)</td></tr>
<tr><td><code>a ^ a = 0</code>, <code>a ^ 0 = a</code></td><td>XOR everything to find the single non-duplicate; missing number</td></tr>
<tr><td><code>1 &lt;&lt; k</code>, <code>(mask &gt;&gt; k) &amp; 1</code></td><td>Set / test bit k — bitmask subsets for n ≤ 20</td></tr>
<tr><td><code>mask &amp; (mask - 1)</code> loops</td><td>Iterate set bits</td></tr>
</table></div>

<h3>Integer overflow — where the languages differ</h3>
<ul>
  <li><b>C# / Java</b> — 32-bit <code>int</code> wraps silently. <code>(lo + hi) / 2</code> can overflow; write <code>lo + (hi - lo) / 2</code>. Use <code>long</code> for products and sums. C# has a <code>checked</code> keyword to throw instead.</li>
  <li><b>Python</b> — integers are arbitrary precision. No overflow, but "reverse integer" style problems expect you to clamp to 32-bit manually.</li>
  <li><b>JavaScript</b> — numbers are 64-bit floats; integers are exact only up to 2⁵³−1. Bitwise ops convert to 32-bit signed. Use <code>BigInt</code> for large values.</li>
</ul>

<h3>Math you might need</h3>
<ul>
  <li>GCD by Euclid: <code>gcd(a, b) = b == 0 ? a : gcd(b, a % b)</code>. LCM = a / gcd · b.</li>
  <li>Modular arithmetic: answers "mod 10⁹+7" — apply mod after every add/multiply. Negative modulo differs: C#/Java/JS <code>-3 % 5 == -3</code>, Python gives <code>2</code>.</li>
  <li>Sieve of Eratosthenes for primes up to n: O(n log log n).</li>
  <li>Fast exponentiation by squaring: O(log n).</li>
</ul>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Single Number</li>
    <li>Number of 1 Bits</li>
    <li>Counting Bits <em>— dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1)</em></li>
    <li>Missing Number <em>— XOR or Gauss sum</em></li>
    <li>Reverse Integer <em>— overflow handling</em></li>
    <li>Pow(x, n) <em>— fast exponentiation, negative n</em></li>
  </ol>
</div>
` }
  ]
},

/* ================= PATTERNS IV ================= */
{ id:"p4", title:"Core Patterns IV — The rest of the toolkit", mins:60,
  sub:"Patterns that are less frequent but still show up in real loops: linked-list manipulation, union-find, tries, greedy, and matrix traversal.",
  lessons:[

  { id:"p4.1", title:"Fast & slow pointers, in-place reversal", body:`
<p class="l-lede">Two pointers moving at different speeds solve cycle and middle problems in O(1) space. Combine with reversal for most "hard-feeling" linked-list questions.</p>

<h3>Recognise it</h3>
<ul class="clean">
  <li>"Detect a cycle" / "where does the cycle begin" — Floyd's tortoise and hare.</li>
  <li>"Middle of the list", "is it a palindrome" — fast reaches the end when slow is in the middle.</li>
  <li>"Find the duplicate number" in an array of 1..n without modifying it — treat <code>i → nums[i]</code> as a linked list; it has a cycle at the duplicate.</li>
  <li>"Happy number" — the digit-square sequence either reaches 1 or cycles.</li>
</ul>

<h3>Why the cycle-start trick works</h3>
<p>When fast and slow meet inside the cycle, the distance from the head to the cycle start equals the distance from the meeting point to the cycle start (mod cycle length). So reset one pointer to the head and advance both one step at a time; they meet at the entrance. You don't need to prove it in an interview, but being able to sketch why is a strong signal.</p>

<h3>Palindrome linked list in O(1) space</h3>
<ol class="steps">
  <li>Find the middle with fast/slow.</li>
  <li>Reverse the second half.</li>
  <li>Compare the two halves node by node.</li>
  <li>(Bonus points) reverse the second half back to restore the input.</li>
</ol>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Middle of the Linked List</li>
    <li>Palindrome Linked List</li>
    <li>Find the Duplicate Number</li>
    <li>Happy Number</li>
    <li>Reverse Nodes in k-Group <em>— stretch</em></li>
  </ol>
</div>
` },

  { id:"p4.2", title:"Union-find (disjoint set)", body:`
<p class="l-lede">When the question is "are these two things connected?" and connections keep being added, union-find answers in near-constant time.</p>

<pre><code><span class="k">class</span> DSU {
    <span class="k">int</span>[] parent, rank;
    <span class="k">public int</span> Components;
    <span class="k">public</span> DSU(<span class="k">int</span> n) {
        parent = Enumerable.Range(0, n).ToArray();
        rank = <span class="k">new int</span>[n]; Components = n;
    }
    <span class="k">public int</span> Find(<span class="k">int</span> x) =&gt;
        parent[x] == x ? x : parent[x] = Find(parent[x]);   <span class="c">// path compression</span>
    <span class="k">public bool</span> Union(<span class="k">int</span> a, <span class="k">int</span> b) {
        <span class="k">int</span> ra = Find(a), rb = Find(b);
        <span class="k">if</span> (ra == rb) <span class="k">return false</span>;                    <span class="c">// already connected → cycle</span>
        <span class="k">if</span> (rank[ra] &lt; rank[rb]) (ra, rb) = (rb, ra);
        parent[rb] = ra;
        <span class="k">if</span> (rank[ra] == rank[rb]) rank[ra]++;
        Components--; <span class="k">return true</span>;
    }
}</code></pre>

<h3>Recognise it</h3>
<ul class="clean">
  <li>Number of connected components / provinces.</li>
  <li>"Redundant connection" — the first edge whose <code>Union</code> returns false.</li>
  <li>Accounts merge — union emails that share an account.</li>
  <li>Kruskal's minimum spanning tree — sort edges by weight, union if not connected.</li>
  <li>Grid connectivity with cells being added over time ("number of islands II").</li>
</ul>

<div class="callout">
  <span class="tag">DFS or union-find?</span>
  <p>For a static graph, BFS/DFS is simpler and equally fast. Union-find wins when edges arrive incrementally and you need answers between additions, or when the input is a raw edge list and you'd otherwise build an adjacency list first.</p>
</div>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Number of Provinces</li>
    <li>Redundant Connection</li>
    <li>Graph Valid Tree <em>— n−1 edges and no cycle</em></li>
    <li>Accounts Merge</li>
    <li>Min Cost to Connect All Points <em>— Kruskal or Prim</em></li>
  </ol>
</div>
` },

  { id:"p4.3", title:"Greedy", body:`
<p class="l-lede">Greedy means making the locally best choice and never revisiting it. It's fast and short — and wrong more often than it feels. The interview skill is justifying it.</p>

<h3>How to tell if greedy works</h3>
<p>Try to break it with a small counter-example first. If you can't, give the <b>exchange argument</b>: "Take any optimal solution that differs from mine at the first choice. Swapping in my choice doesn't make it worse, so there's an optimal solution that agrees with greedy." Interviewers rarely require rigour, but they reward you for asking the question.</p>

<h3>The greedy shapes that recur</h3>
<div class="tbl"><table>
<tr><th>Shape</th><th>Greedy choice</th><th>Example</th></tr>
<tr><td>Interval scheduling</td><td>Sort by <b>end</b>, take the earliest-ending compatible interval</td><td>Non-overlapping Intervals, Minimum Arrows</td></tr>
<tr><td>Reachability</td><td>Track the farthest index reachable so far</td><td>Jump Game I &amp; II</td></tr>
<tr><td>Running sum reset</td><td>Drop the prefix when it goes negative</td><td>Maximum Subarray (Kadane), Gas Station</td></tr>
<tr><td>Matching / assignment</td><td>Sort both sides, pair smallest with smallest that works</td><td>Assign Cookies, Boats to Save People</td></tr>
<tr><td>Frequency scheduling</td><td>Always place the most frequent remaining item</td><td>Task Scheduler, Reorganize String</td></tr>
</table></div>

<div class="callout gold">
  <span class="tag">Where greedy fails</span>
  <p>Coin change with arbitrary denominations (coins 1, 3, 4 and target 6: greedy takes 4+1+1, optimal is 3+3). 0/1 knapsack. Longest increasing subsequence. If a greedy attempt has a counter-example, the problem is usually DP.</p>
</div>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Maximum Subarray</li>
    <li>Jump Game, Jump Game II</li>
    <li>Gas Station</li>
    <li>Non-overlapping Intervals</li>
    <li>Task Scheduler</li>
    <li>Partition Labels</li>
  </ol>
</div>
` },

  { id:"p4.4", title:"Matrix traversal & simulation", body:`
<p class="l-lede">Grid questions are graph and array questions at once. Get the boilerplate automatic so your attention goes to the actual logic.</p>

<h3>Boilerplate to type without thinking</h3>
<pre><code><span class="k">int</span>[][] dirs = { <span class="k">new</span>[]{0,1}, <span class="k">new</span>[]{1,0}, <span class="k">new</span>[]{0,-1}, <span class="k">new</span>[]{-1,0} };
<span class="k">int</span> R = grid.Length, C = grid[0].Length;
<span class="k">bool</span> In(<span class="k">int</span> r, <span class="k">int</span> c) =&gt; r &gt;= 0 &amp;&amp; r &lt; R &amp;&amp; c &gt;= 0 &amp;&amp; c &lt; C;</code></pre>

<h3>Moves that recur</h3>
<ul class="clean">
  <li><b>Flood fill from the border</b> — "surrounded regions", "Pacific Atlantic water flow": start from the edges and mark what's reachable, rather than testing each interior cell.</li>
  <li><b>Multi-source BFS</b> — enqueue every source at distance 0 (rotting oranges, nearest exit).</li>
  <li><b>In-place state encoding</b> — Game of Life: store next state in a higher bit (<code>cell |= 2</code>) and shift at the end, to avoid a copy.</li>
  <li><b>Row/column as a sorted list</b> — "search a 2D matrix II": start top-right, go left if too big, down if too small. O(m + n).</li>
  <li><b>Treat as 1D</b> — a fully sorted matrix can be binary searched with <code>mid / C</code>, <code>mid % C</code>.</li>
</ul>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>Flood Fill</li>
    <li>Surrounded Regions</li>
    <li>Pacific Atlantic Water Flow</li>
    <li>Game of Life</li>
    <li>Search a 2D Matrix II</li>
  </ol>
</div>
` }
  ]
}

);
