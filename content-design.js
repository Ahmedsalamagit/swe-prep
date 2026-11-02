/* System design: Scaling, Low-level design. */
window.COURSE = window.COURSE || [];
window.COURSE.push(

/* ================= SCALING ================= */
{ id:"sc", title:"Scaling", mins:110,
  sub:"The building blocks behind every design answer: going from one server to millions of users, load balancing, caching, database scaling, consistency, queues and the network.",
  lessons:[

  { id:"sc.1", title:"From one server to millions of users", body:`
<p class="l-lede">Almost every design interview is this story told about a specific product. Know the stages cold and you can narrate any system's growth.</p>

<ol class="steps">
  <li><b>One box.</b> Web app and database on the same machine. DNS points at it. Fine for a prototype; a single point of failure for everything.</li>
  <li><b>Split the database out.</b> Web tier and data tier scale independently and fail independently.</li>
  <li><b>Vertical scaling.</b> Bigger machine. Simple, no code change — but has a hard ceiling, gets expensive non-linearly, and keeps the single point of failure.</li>
  <li><b>Horizontal scaling of the web tier.</b> Many stateless app servers behind a <b>load balancer</b>. This requires moving session state out of the servers (into a cache or DB, or a signed token).</li>
  <li><b>Database replication.</b> One primary for writes, read replicas for reads. Most apps are read-heavy (often 10:1 to 100:1), so this buys a lot.</li>
  <li><b>Cache.</b> Put hot reads in memory (Redis/Memcached) in front of the DB.</li>
  <li><b>CDN.</b> Serve static assets — images, JS, video — from edge locations near users.</li>
  <li><b>Async work via queues.</b> Move slow work (emails, thumbnails, fan-out) off the request path.</li>
  <li><b>Multiple data centres / regions.</b> GeoDNS routes users to the nearest region; data replicates across regions. Now you must think about consistency across distance.</li>
  <li><b>Shard the database.</b> When writes or data size outgrow one primary, partition data across many.</li>
  <li><b>Split into services.</b> Separate teams, deploys and scaling per domain — at the cost of network calls, distributed failures and harder consistency.</li>
</ol>

<div class="callout">
  <span class="tag">How to use this in the room</span>
  <p>Start your high-level design at the simplest stage that meets the requirements, then <em>say why</em> you move to each next stage: "At 50k writes/sec a single primary won't keep up, so I'll shard by user_id." Jumping straight to the final picture without the reasoning reads as memorised.</p>
</div>

<h3>Performance vs scalability; latency vs throughput</h3>
<p>A <b>performance</b> problem means the system is slow for one user. A <b>scalability</b> problem means it's fast for one user but slow under load. <b>Latency</b> is time per operation; <b>throughput</b> is operations per unit time. Aim for maximal throughput with acceptable latency — and say which one a design decision trades away (batching raises throughput, adds latency).</p>

<h3>Stateless is the unlock</h3>
<p>Horizontal scaling, rolling deploys, autoscaling and failover all assume any server can handle any request. When you put state in a service, say where it lives and how it survives the box dying.</p>
` },

  { id:"sc.2", title:"Load balancers & reverse proxies", body:`
<p class="l-lede">A load balancer spreads requests across servers and stops sending to the ones that are down. That second job is the one people forget to mention.</p>

<h3>Layer 4 vs layer 7</h3>
<div class="tbl"><table>
<tr><th></th><th>Layer 4 (transport)</th><th>Layer 7 (application)</th></tr>
<tr><td>Sees</td><td>IPs and ports</td><td>HTTP: path, headers, cookies</td></tr>
<tr><td>Can do</td><td>Fast forwarding, NAT</td><td>Route <code>/api</code> vs <code>/img</code>, TLS termination, auth, rewrites, sticky sessions by cookie</td></tr>
<tr><td>Cost</td><td>Cheaper, faster</td><td>More CPU, more flexibility</td></tr>
<tr><td>Azure / AWS</td><td>Azure Load Balancer / NLB</td><td>Application Gateway, Front Door / ALB</td></tr>
</table></div>

<h3>Algorithms</h3>
<ul class="clean">
  <li><b>Round robin / weighted round robin</b> — simple, ignores load.</li>
  <li><b>Least connections</b> — better when request cost varies (long-lived connections, WebSockets).</li>
  <li><b>Hash-based (IP or key)</b> — same client to same server; useful for caches, bad when servers change. <b>Consistent hashing</b> fixes the reshuffle (see Database scaling).</li>
  <li><b>Power of two choices</b> — pick two at random, send to the less loaded. Near-optimal with little coordination.</li>
</ul>

<h3>Avoiding the load balancer as single point of failure</h3>
<p>Run them in pairs: <b>active-passive</b> (heartbeat, standby takes the virtual IP) or <b>active-active</b> (both serve, DNS or anycast spreads traffic). Managed cloud LBs do this for you — say so.</p>

<h3>Reverse proxy vs load balancer</h3>
<p>A reverse proxy (nginx, Envoy) sits in front of servers even if there's only one: it terminates TLS, compresses, caches, hides internal topology, and enforces limits. A load balancer is a reverse proxy whose main job is distribution. In practice one component often does both; an <b>API gateway</b> adds auth, rate limiting and request routing to many services.</p>

<h3>Health checks</h3>
<p>Distinguish <b>liveness</b> ("process is up") from <b>readiness</b> ("can serve traffic — dependencies OK, warmed up"). Failing readiness pulls a node out of rotation without killing it. This distinction is worth thirty seconds in any answer involving deploys.</p>
` },

  { id:"sc.3", title:"Caching", body:`
<p class="l-lede">Caching is the cheapest big win in any design — and the source of the hardest bugs. A good answer covers where, what, how it's updated, and how it goes wrong.</p>

<h3>Where caches live</h3>
<p>Client (browser, app) → CDN → reverse proxy → application (in-process memory) → distributed cache (Redis) → database's own buffer pool. Each layer closer to the user is faster and harder to invalidate.</p>

<h3>Update strategies</h3>
<div class="tbl"><table>
<tr><th>Strategy</th><th>How</th><th>Good</th><th>Bad</th></tr>
<tr><td><b>Cache-aside</b> (lazy)</td><td>App reads cache; on miss, reads DB and fills cache</td><td>Only caches what's used; cache failure isn't fatal</td><td>Miss = 3 trips; stale until TTL or explicit delete</td></tr>
<tr><td><b>Write-through</b></td><td>App writes cache; cache writes DB synchronously</td><td>Cache always fresh</td><td>Slower writes; caches data nobody reads</td></tr>
<tr><td><b>Write-behind</b> (write-back)</td><td>Write cache; DB updated asynchronously</td><td>Very fast writes, batching</td><td>Data loss if cache dies before flush</td></tr>
<tr><td><b>Refresh-ahead</b></td><td>Refresh hot keys before they expire</td><td>Low read latency</td><td>Wasted work if prediction is wrong</td></tr>
</table></div>
<p>Default answer: <b>cache-aside with a TTL, delete (not update) the key on write.</b> Deleting avoids a race where two writers leave the cache with the older value.</p>

<h3>Eviction</h3>
<p>LRU (most common), LFU (better for skewed popularity), TTL-based expiry. Redis implements approximated LRU/LFU. Implementing LRU from scratch is a classic coding question — see Low-Level Design.</p>

<h3>The failure modes interviewers probe</h3>
<ul class="clean">
  <li><b>Thundering herd / stampede</b> — a hot key expires and thousands of requests hit the DB at once. Fix: request coalescing (single-flight lock per key), jittered TTLs, refresh-ahead, or serve stale while one request refreshes.</li>
  <li><b>Cache penetration</b> — repeated lookups for keys that don't exist go straight to the DB. Fix: cache negative results briefly, or a Bloom filter.</li>
  <li><b>Hot keys</b> — one key (a celebrity's profile) overloads one cache shard. Fix: replicate the key with suffixes, or a local in-process cache in front.</li>
  <li><b>Inconsistency</b> — DB updated, cache delete fails. Fix: TTL as a safety net, or drive invalidation from the DB change feed (CDC) — very natural if you've used Cosmos DB's change feed.</li>
</ul>

<div class="callout gold">
  <span class="tag">Say this</span>
  <p>"I'd cache user profiles cache-aside with a 5-minute TTL plus explicit delete on update. Profiles are read-heavy and tolerate a few seconds of staleness. For the hot-key case I'd add a small in-process LRU." Specific data, specific staleness tolerance, specific failure handled.</p>
</div>
` },

  { id:"sc.4", title:"Scaling the database", body:`
<p class="l-lede">The database is almost always the bottleneck. Know the four levers in the order you'd pull them, and the cost of each.</p>

<h3>1 · Replication</h3>
<ul>
  <li><b>Primary–replica</b> (leader–follower): writes to one primary, reads spread across replicas. Replication is usually async, so replicas lag — a user may not see their own write. Fix with <b>read-your-writes</b>: route that user's reads to the primary for a short window, or read by session token.</li>
  <li><b>Primary–primary</b> (multi-leader): writes accepted in several places. Higher write availability, but you now need conflict resolution (last-write-wins, version vectors, CRDTs).</li>
  <li><b>Leaderless</b> (Dynamo, Cassandra): write to W of N replicas, read from R. If <code>R + W &gt; N</code> reads see the latest write.</li>
</ul>

<h3>2 · Federation (functional partitioning)</h3>
<p>Split by domain — users DB, orders DB, products DB. Less load per DB, smaller indexes. Cost: no cross-database joins; the app joins.</p>

<h3>3 · Sharding (horizontal partitioning)</h3>
<p>Split one table's rows across many databases by a <b>shard key</b>. The choice of key is the interview.</p>
<div class="tbl"><table>
<tr><th>Scheme</th><th>How</th><th>Trade-off</th></tr>
<tr><td>Range</td><td>Users A–M on shard 1, N–Z on shard 2; or by time</td><td>Range scans are easy; hot spots (all new rows land on one shard)</td></tr>
<tr><td>Hash</td><td><code>hash(key) % N</code></td><td>Even spread; range queries scatter; changing N moves almost everything</td></tr>
<tr><td>Consistent hashing</td><td>Keys and nodes on a ring; key goes to next node clockwise; virtual nodes smooth it</td><td>Adding a node moves only ~1/N of keys. Used by Dynamo, Cassandra, many caches</td></tr>
<tr><td>Directory / lookup</td><td>A service maps key → shard</td><td>Flexible rebalancing; the directory is a dependency to keep available</td></tr>
</table></div>
<p>Good shard keys have <b>high cardinality</b>, <b>even access</b>, and match the <b>dominant query</b> so most requests hit one shard. <code>user_id</code> for a social app; <code>tenant_id</code> for SaaS (watch for one huge tenant). This is exactly a Cosmos DB partition-key decision — use your real examples.</p>
<p><b>Costs of sharding:</b> cross-shard queries and joins, cross-shard transactions (avoid, or use sagas), rebalancing, and celebrity/hot partitions.</p>

<h3>4 · Denormalisation</h3>
<p>Duplicate data to avoid joins at read time — store the author's name on each post. Reads get cheap; writes must update every copy (often asynchronously). Materialised views are the managed version.</p>

<h3>Plus: indexes and query tuning</h3>
<p>Before any of the above, say "first I'd check indexes and slow queries." A B-tree index makes lookups O(log n) instead of a scan; composite index column order matters (leftmost prefix). Indexes speed reads and slow writes.</p>
` },

  { id:"sc.5", title:"SQL vs NoSQL", body:`
<p class="l-lede">"Which database?" is never answered with a brand. It's answered with access patterns, consistency needs and scale — then a brand.</p>

<h3>The families</h3>
<div class="tbl"><table>
<tr><th>Type</th><th>Model</th><th>Strength</th><th>Examples</th></tr>
<tr><td>Relational</td><td>Tables, rows, joins, schema</td><td>ACID transactions, ad-hoc queries, integrity</td><td>PostgreSQL, SQL Server, MySQL, Azure SQL</td></tr>
<tr><td>Key-value</td><td>key → blob</td><td>O(1) lookups, huge scale, caching</td><td>Redis, DynamoDB, Azure Table</td></tr>
<tr><td>Document</td><td>key → JSON document</td><td>Flexible schema, nested data read together</td><td>MongoDB, Cosmos DB (NoSQL API)</td></tr>
<tr><td>Wide-column</td><td>Row key → sparse columns, sorted</td><td>Massive write throughput, time-series</td><td>Cassandra, HBase, Bigtable</td></tr>
<tr><td>Graph</td><td>Nodes + edges</td><td>Multi-hop relationship queries</td><td>Neo4j, Cosmos DB Gremlin</td></tr>
<tr><td>Search</td><td>Inverted index</td><td>Full-text, relevance, facets</td><td>Elasticsearch, Azure AI Search</td></tr>
<tr><td>Object / blob</td><td>Files by key</td><td>Cheap durable large objects</td><td>S3, Azure Blob</td></tr>
</table></div>

<h3>Decision heuristics</h3>
<ul class="clean">
  <li><b>Choose SQL</b> when data is relational, you need multi-row transactions (money, inventory, bookings), or query patterns aren't known yet. Modern SQL scales further than people assume — read replicas and partitioning go a long way.</li>
  <li><b>Choose NoSQL</b> when access is by key with known patterns, write volume or data size exceeds a single node, schema varies, or you need multi-region writes with tunable consistency.</li>
  <li><b>Use several.</b> Real systems pair a source-of-truth store with a cache, a search index, and blob storage. Saying "Postgres for orders, Redis for sessions, Blob for images, Elasticsearch for search" is a complete, credible answer.</li>
</ul>

<h3>ACID vs BASE</h3>
<p><b>ACID</b> — Atomic, Consistent, Isolated, Durable: the transaction either fully happens or doesn't. <b>BASE</b> — Basically Available, Soft state, Eventually consistent: stay up and converge later. Most NoSQL stores now offer per-item or per-partition ACID, so the line is blurrier than the slogan.</p>
` },

  { id:"sc.6", title:"Consistency, CAP & availability", body:`
<p class="l-lede">This is where senior answers separate from mid-level ones: naming exactly which guarantee each piece of data needs, and paying only for that.</p>

<h3>CAP, stated correctly</h3>
<p>In a distributed system, during a <b>network partition</b> you must choose between <b>consistency</b> (every read sees the latest write, or errors) and <b>availability</b> (every request gets a response, possibly stale). Partitions are not optional, so the real choice is <b>CP or AP during a partition</b>. "CA" isn't a real option for a distributed system.</p>
<p><b>PACELC</b> adds the useful part: <em>Else</em>, when there's no partition, you trade <b>latency</b> against <b>consistency</b>. Strong consistency across regions costs round trips on every write.</p>

<h3>Consistency levels, weakest to strongest</h3>
<ul class="clean">
  <li><b>Eventual</b> — replicas converge eventually. Likes, view counts, feeds.</li>
  <li><b>Consistent prefix</b> — never see writes out of order.</li>
  <li><b>Session / read-your-writes</b> — you always see your own writes. The right default for most user-facing apps.</li>
  <li><b>Bounded staleness</b> — at most k versions or t seconds behind.</li>
  <li><b>Strong / linearizable</b> — behaves like a single copy. Payments, inventory decrements, unique usernames, locks.</li>
</ul>
<p>Those five are literally Cosmos DB's consistency levels — you can speak about them from experience rather than theory.</p>

<h3>Availability patterns</h3>
<ul>
  <li><b>Fail-over</b> — active-passive (standby takes over; risk of data loss if replication was async) or active-active (both serve).</li>
  <li><b>Replication</b> — across nodes, zones, regions.</li>
  <li><b>Redundancy math</b> — components in series multiply availability (two 99.9% services in series ≈ 99.8%); in parallel, failure probabilities multiply (two 99.9% replicas ≈ 99.9999%).</li>
</ul>
<div class="tbl"><table>
<tr><th>Availability</th><th>Downtime / year</th><th>Downtime / month</th></tr>
<tr><td class="nc">99.9%</td><td class="nc">8h 46m</td><td class="nc">43m</td></tr>
<tr><td class="nc">99.95%</td><td class="nc">4h 23m</td><td class="nc">22m</td></tr>
<tr><td class="nc">99.99%</td><td class="nc">52m</td><td class="nc">4m 23s</td></tr>
<tr><td class="nc">99.999%</td><td class="nc">5m 15s</td><td class="nc">26s</td></tr>
</table></div>

<h3>Distributed transactions</h3>
<p><b>Two-phase commit</b> gives atomicity across services but blocks if the coordinator dies and couples availability. The usual interview answer is a <b>saga</b>: a sequence of local transactions, each with a compensating action ("refund" undoes "charge"), coordinated by events or an orchestrator. Pair it with the <b>outbox pattern</b> so the DB write and the event publish can't diverge.</p>
` },

  { id:"sc.7", title:"Queues, streams & async processing", body:`
<p class="l-lede">Anything slow, spiky or retryable should not happen inside the user's request. Queues are how you say that in architecture.</p>

<h3>Message queue vs event stream</h3>
<div class="tbl"><table>
<tr><th></th><th>Queue</th><th>Log / stream</th></tr>
<tr><td>Model</td><td>Each message consumed once, then deleted</td><td>Append-only log, many consumers each track an offset</td></tr>
<tr><td>Replay</td><td>No</td><td>Yes, within retention</td></tr>
<tr><td>Ordering</td><td>Best-effort (FIFO variants exist)</td><td>Strict within a partition</td></tr>
<tr><td>Use</td><td>Task distribution, work queues</td><td>Event sourcing, fan-out to many systems, analytics</td></tr>
<tr><td>Examples</td><td>RabbitMQ, SQS, Azure Service Bus queues, Storage Queues</td><td>Kafka, Kinesis, Azure Event Hubs</td></tr>
</table></div>

<h3>Delivery semantics</h3>
<ul class="clean">
  <li><b>At-most-once</b> — may lose messages. Metrics you can afford to drop.</li>
  <li><b>At-least-once</b> — may duplicate. The practical default. Make consumers <b>idempotent</b>: dedupe on a message id, or make the operation naturally idempotent (<code>SET status = 'paid'</code> rather than <code>balance += 10</code>).</li>
  <li><b>Exactly-once</b> — only within a closed system (e.g. Kafka transactions). End to end, it's at-least-once plus idempotency. Saying that sentence is a strong signal.</li>
</ul>

<h3>Back pressure and failure handling</h3>
<ul>
  <li><b>Back pressure</b> — when consumers can't keep up, bound the queue and push back on producers (429 / Retry-After) rather than letting the backlog grow until everything times out.</li>
  <li><b>Dead-letter queue</b> — after N failed attempts, park the message for inspection instead of poisoning the queue.</li>
  <li><b>Retries with exponential backoff + jitter</b> — and only for idempotent operations.</li>
  <li><b>Visibility timeout / lease</b> — a message being processed is hidden; if the worker dies it reappears.</li>
</ul>

<h3>Related patterns</h3>
<p><b>Pub/sub</b> (one event, many subscribers), <b>fan-out</b> (Service Health notifications to millions — your strongest real example), <b>CQRS</b> (separate write model and read model, synced by events), <b>event sourcing</b> (store the events, derive state).</p>
` },

  { id:"sc.8", title:"The network: DNS, CDN, protocols & APIs", body:`
<p class="l-lede">You don't need networking depth for most loops, but you need correct vocabulary and the right choice when real-time or global traffic comes up.</p>

<h3>DNS and CDN</h3>
<ul>
  <li><b>DNS</b> maps names to IPs, with TTL-based caching at every layer — so changes propagate slowly. GeoDNS / latency-based routing sends users to the nearest region; it's also a crude failover mechanism.</li>
  <li><b>CDN</b> caches content at edge locations. <b>Pull</b> CDNs fetch from origin on first request (simple, first request slow); <b>push</b> CDNs are uploaded proactively (good for large, rarely-changing files). Invalidate with versioned URLs (<code>app.3f9a.js</code>) rather than purges.</li>
</ul>

<h3>TCP vs UDP</h3>
<p><b>TCP</b>: connection-oriented, ordered, reliable, congestion-controlled — HTTP/1.1 and HTTP/2, databases. <b>UDP</b>: no handshake, no guarantee, low latency — video calls, games, DNS, and HTTP/3 (QUIC, which rebuilds reliability on top of UDP).</p>

<h3>API styles</h3>
<div class="tbl"><table>
<tr><th>Style</th><th>Shape</th><th>Pick it for</th></tr>
<tr><td>REST</td><td>Resources + HTTP verbs, JSON</td><td>Public APIs, CRUD, cacheable reads</td></tr>
<tr><td>gRPC</td><td>Protobuf over HTTP/2, generated clients, streaming</td><td>Internal service-to-service, low latency, strict contracts</td></tr>
<tr><td>GraphQL</td><td>Client specifies the fields it wants</td><td>Many clients with different needs, avoiding over-fetching</td></tr>
</table></div>

<h3>Real-time options</h3>
<ul class="clean">
  <li><b>Short polling</b> — simple, wasteful.</li>
  <li><b>Long polling</b> — server holds the request until data arrives. Works everywhere.</li>
  <li><b>Server-sent events</b> — one-way server→client stream over HTTP. Great for notifications, live feeds, LLM token streaming.</li>
  <li><b>WebSockets</b> — full duplex, persistent. Chat, collaborative editing, games. Costs: stateful connections, sticky routing, a connection-registry service.</li>
</ul>

<h3>API design details that show seniority</h3>
<p>Pagination by <b>cursor</b> rather than offset (stable under inserts, O(1) seek). <b>Idempotency keys</b> on POSTs that create money or orders. Versioning (<code>/v2/</code> or header). Correct status codes — 409 conflict, 429 rate limited, 503 with Retry-After. Rate limiting per client at the gateway.</p>
` },

  { id:"sc.9", title:"Reliability patterns", body:`
<p class="l-lede">Distributed systems fail partially and constantly. These patterns are how you say "and when that dependency goes down…" before the interviewer asks.</p>

<ul class="clean">
  <li><b>Timeouts everywhere.</b> A call without a timeout is a thread you'll eventually lose. Set them shorter than the caller's timeout.</li>
  <li><b>Retries with exponential backoff and jitter</b> — and a retry budget, so retries can't multiply load during an outage (retry storms).</li>
  <li><b>Circuit breaker</b> — after repeated failures, stop calling the dependency for a cool-down, then probe with a few requests (closed → open → half-open). In .NET, Polly implements this.</li>
  <li><b>Bulkheads</b> — isolate resources (thread pools, connection pools) per dependency so one slow dependency can't starve everything.</li>
  <li><b>Graceful degradation</b> — serve a cached or reduced result (no recommendations, stale prices with a banner) rather than an error.</li>
  <li><b>Load shedding</b> — when overloaded, reject low-priority work early and cheaply.</li>
  <li><b>Idempotency</b> — makes retries and at-least-once delivery safe. The precondition for most of the above.</li>
  <li><b>Health checks + automatic failover</b> — liveness vs readiness (see Load balancers).</li>
  <li><b>Rate limiting</b> — protect yourself from clients; covered in the Rate limiter worked design.</li>
</ul>

<h3>Observability: how you know</h3>
<p><b>Metrics</b> (RED: rate, errors, duration; USE: utilisation, saturation, errors), <b>logs</b> (structured, with correlation ids), <b>traces</b> (a request across services). Define <b>SLIs</b> (what you measure), <b>SLOs</b> (the target, e.g. 99.9% of requests &lt; 300 ms), and an <b>error budget</b>. Ending a design with "and here's what I'd alert on" is a senior habit — and you work on Azure Status, so you have real stories here.</p>

<h3>Deployment safety</h3>
<p>Rolling, blue-green and canary deploys; feature flags; automatic rollback on SLO regression; safe schema migrations (expand → migrate → contract). One sentence on how you'd ship the design is often the last box the interviewer ticks.</p>

<div class="callout good">
  <span class="tag">Further reading in the repos</span>
  <p>The <code>awesome-scalability</code> repo groups real-world engineering posts by these exact themes (scalability, availability, stability, performance). Reading two posts per week from companies you're interviewing with gives you concrete examples to cite.</p>
</div>
` }
  ]
},

/* ================= LOW LEVEL DESIGN ================= */
{ id:"lld", title:"Low-Level Design (OOD)", mins:70,
  sub:"Object-oriented design rounds: OOP and SOLID, the design patterns that actually come up, a method for the round, and worked examples including LRU cache.",
  lessons:[

  { id:"lld.1", title:"OOP & SOLID, the useful parts", body:`
<p class="l-lede">LLD rounds ("design a parking lot", "design an elevator") test whether your classes have clear responsibilities and your code bends instead of breaks when requirements change.</p>

<h3>The four pillars in one line each</h3>
<ul class="clean">
  <li><b>Encapsulation</b> — keep state private; expose behaviour. <code>account.Withdraw(50)</code>, not <code>account.Balance -= 50</code>.</li>
  <li><b>Abstraction</b> — callers depend on what something does, not how. Interfaces.</li>
  <li><b>Inheritance</b> — "is-a" reuse. Use sparingly; deep hierarchies are brittle.</li>
  <li><b>Polymorphism</b> — one call, behaviour chosen by the runtime type. This is what lets you add a new vehicle type without editing a switch statement.</li>
</ul>
<p><b>Prefer composition over inheritance.</b> A <code>Car</code> <em>has an</em> <code>Engine</code>; it isn't one.</p>

<h3>SOLID with the smell each fixes</h3>
<div class="tbl"><table>
<tr><th>Principle</th><th>Means</th><th>Smell it prevents</th></tr>
<tr><td><b>S</b>ingle responsibility</td><td>One reason to change per class</td><td><code>OrderService</code> that also emails, logs and prints invoices</td></tr>
<tr><td><b>O</b>pen/closed</td><td>Extend by adding code, not editing it</td><td>Growing <code>switch (type)</code> statements</td></tr>
<tr><td><b>L</b>iskov substitution</td><td>Subtypes must honour the parent's contract</td><td><code>Square : Rectangle</code> breaking <code>SetWidth</code></td></tr>
<tr><td><b>I</b>nterface segregation</td><td>Small, focused interfaces</td><td>Implementations throwing <code>NotImplementedException</code></td></tr>
<tr><td><b>D</b>ependency inversion</td><td>Depend on abstractions; inject them</td><td><code>new SqlRepository()</code> inside business logic — untestable</td></tr>
</table></div>
<p>Also name-drop where relevant: <b>DRY</b>, <b>KISS</b>, <b>YAGNI</b>. YAGNI is your defence when an interviewer asks why you didn't build a plugin system for a parking lot.</p>

<h3>Class relationships</h3>
<p><b>Association</b> (uses), <b>aggregation</b> (has, can exist independently — a team has players), <b>composition</b> (owns, lifecycle tied — a house has rooms), <b>dependency</b> (uses temporarily, e.g. as a parameter). You may be asked to sketch a UML class diagram; boxes with fields/methods and labelled arrows are enough.</p>
` },

  { id:"lld.2", title:"Design patterns that actually come up", body:`
<p class="l-lede">You don't need all 23 Gang of Four patterns. You need about eight, and the ability to say why one fits.</p>

<div class="tbl"><table>
<tr><th>Pattern</th><th>Problem it solves</th><th>Typical LLD use</th></tr>
<tr><td><b>Strategy</b></td><td>Swap an algorithm at runtime</td><td>Pricing rules, parking-spot allocation, payment methods</td></tr>
<tr><td><b>Factory</b></td><td>Create objects without the caller knowing the concrete type</td><td><code>VehicleFactory.Create("truck")</code></td></tr>
<tr><td><b>Singleton</b></td><td>Exactly one instance</td><td>Config, logger, the <code>ParkingLot</code> itself. Mention thread safety (<code>Lazy&lt;T&gt;</code>) and that it hurts testability.</td></tr>
<tr><td><b>Observer</b></td><td>Notify subscribers of changes</td><td>Display boards, stock tickers, pub/sub, event handlers</td></tr>
<tr><td><b>State</b></td><td>Behaviour depends on state; avoid giant if-chains</td><td>Vending machine, elevator, order lifecycle, traffic light</td></tr>
<tr><td><b>Decorator</b></td><td>Add behaviour by wrapping</td><td>Coffee add-ons, middleware, logging/caching wrappers</td></tr>
<tr><td><b>Builder</b></td><td>Construct complex objects step by step</td><td>Requests, queries, immutable configs</td></tr>
<tr><td><b>Command</b></td><td>Encapsulate an action as an object</td><td>Undo/redo, job queues, elevator requests</td></tr>
<tr><td>Adapter / Facade</td><td>Wrap an awkward or complex interface</td><td>Third-party payment gateway, legacy subsystem</td></tr>
<tr><td>Chain of responsibility</td><td>Pass a request along handlers</td><td>ATM dispensing notes, logging levels, approval flows</td></tr>
</table></div>

<h3>State pattern, compressed</h3>
<pre><code><span class="k">interface</span> IVendingState {
    <span class="k">void</span> InsertCoin(VendingMachine m, <span class="k">int</span> cents);
    <span class="k">void</span> Select(VendingMachine m, <span class="k">string</span> code);
}
<span class="k">class</span> Idle : IVendingState { <span class="c">/* InsertCoin -> m.State = new HasMoney() */</span> }
<span class="k">class</span> HasMoney : IVendingState { <span class="c">/* Select -> dispense, maybe refund, -> Idle */</span> }
<span class="c">// Adding "OutOfStock" is a new class, not edits to every method. That's open/closed.</span></code></pre>

<div class="callout">
  <span class="tag">How to mention a pattern</span>
  <p>Never lead with the pattern name. Lead with the problem: "Pricing differs for hourly vs daily vs monthly, and they'll add more — so I'll put pricing behind an <code>IPricingStrategy</code>." Naming it after the reason sounds like experience; naming it first sounds like a textbook.</p>
</div>
` },

  { id:"lld.3", title:"Running the LLD round + parking lot", body:`
<p class="l-lede">A 45-minute LLD round rewards structure exactly like a system design round, just at the class level.</p>

<ol class="steps">
  <li><b>Clarify requirements (5 min).</b> Actors, core use cases, scale, what's explicitly out of scope. Write them as a short list.</li>
  <li><b>Identify entities (5 min).</b> Nouns in the requirements become candidate classes; verbs become methods.</li>
  <li><b>Define relationships and interfaces (10 min).</b> Sketch the class diagram. Mark where things will vary — those get interfaces.</li>
  <li><b>Code the core (15–20 min).</b> The main flow end to end, in your interview language. Skip getters/boilerplate; say you're skipping them.</li>
  <li><b>Extend and stress (5 min).</b> Concurrency (two cars, one spot), a new requirement ("add EV charging"), testing approach.</li>
</ol>

<h3>Parking lot, worked to the decisions that matter</h3>
<p><b>Requirements:</b> multiple floors; spot sizes small/medium/large; vehicles motorcycle/car/truck; issue a ticket on entry; charge on exit by duration; show free spots per floor.</p>
<pre><code><span class="k">enum</span> SpotSize { Small, Medium, Large }
<span class="k">abstract class</span> Vehicle { <span class="k">public string</span> Plate; <span class="k">public abstract</span> SpotSize Needs { <span class="k">get</span>; } }
<span class="k">class</span> Car : Vehicle { <span class="k">public override</span> SpotSize Needs =&gt; SpotSize.Medium; }

<span class="k">class</span> Spot { <span class="k">public</span> SpotSize Size; <span class="k">public</span> Vehicle? Parked; <span class="k">public bool</span> Free =&gt; Parked == <span class="k">null</span>; }
<span class="k">class</span> Floor { <span class="k">public</span> List&lt;Spot&gt; Spots; }
<span class="k">record</span> Ticket(Guid Id, Spot Spot, Vehicle Vehicle, DateTime In);

<span class="k">interface</span> ISpotAllocator { Spot? Find(IEnumerable&lt;Floor&gt; floors, Vehicle v); }
<span class="k">interface</span> IPricing { <span class="k">decimal</span> Price(Ticket t, DateTime outAt); }

<span class="k">class</span> ParkingLot {
    <span class="k">readonly</span> List&lt;Floor&gt; floors; <span class="k">readonly</span> ISpotAllocator alloc; <span class="k">readonly</span> IPricing pricing;
    <span class="k">readonly object</span> gate = <span class="k">new</span>();
    <span class="k">public</span> Ticket? Enter(Vehicle v) {
        <span class="k">lock</span> (gate) {                              <span class="c">// two cars must not get the same spot</span>
            <span class="k">var</span> s = alloc.Find(floors, v);
            <span class="k">if</span> (s == <span class="k">null</span>) <span class="k">return null</span>;
            s.Parked = v;
            <span class="k">return new</span> Ticket(Guid.NewGuid(), s, v, DateTime.UtcNow);
        }
    }
    <span class="k">public decimal</span> Exit(Ticket t) {
        <span class="k">lock</span> (gate) t.Spot.Parked = <span class="k">null</span>;
        <span class="k">return</span> pricing.Price(t, DateTime.UtcNow);
    }
}</code></pre>
<p><b>What the interviewer is checking:</b> allocation and pricing behind interfaces (strategy) so "nearest to elevator" or "weekend rates" are additive; vehicle size as polymorphism rather than a type switch; the lock around allocation; and that you can say a per-floor lock or concurrent free-spot queues would scale better.</p>

<div class="drill">
  <span class="tag">Drill — 45 minutes each, out loud</span>
  <ol>
    <li>Parking lot <em>— redo from scratch without looking</em></li>
    <li>Vending machine <em>— state pattern</em></li>
    <li>Elevator system <em>— scheduling strategy, request queue</em></li>
    <li>Logging framework <em>— levels, chain of responsibility, sinks</em></li>
    <li>Library / task management system</li>
  </ol>
</div>
` },

  { id:"lld.4", title:"LRU cache & concurrency basics", body:`
<p class="l-lede">LRU cache is the one LLD question that is also a coding question. Then come the concurrency follow-ups.</p>

<h3>LRU cache: hash map + doubly linked list</h3>
<p>Map gives O(1) lookup of the node; the list keeps recency order with O(1) move-to-front and remove-from-back.</p>
<pre><code><span class="k">public class</span> LRUCache {
    <span class="k">readonly int</span> cap;
    <span class="k">readonly</span> Dictionary&lt;<span class="k">int</span>, LinkedListNode&lt;(<span class="k">int</span> k, <span class="k">int</span> v)&gt;&gt; map = <span class="k">new</span>();
    <span class="k">readonly</span> LinkedList&lt;(<span class="k">int</span> k, <span class="k">int</span> v)&gt; order = <span class="k">new</span>();   <span class="c">// front = most recent</span>
    <span class="k">public</span> LRUCache(<span class="k">int</span> capacity) =&gt; cap = capacity;

    <span class="k">public int</span> Get(<span class="k">int</span> key) {
        <span class="k">if</span> (!map.TryGetValue(key, <span class="k">out var</span> node)) <span class="k">return</span> -1;
        order.Remove(node); order.AddFirst(node);
        <span class="k">return</span> node.Value.v;
    }
    <span class="k">public void</span> Put(<span class="k">int</span> key, <span class="k">int</span> value) {
        <span class="k">if</span> (map.TryGetValue(key, <span class="k">out var</span> node)) order.Remove(node);
        <span class="k">else if</span> (map.Count == cap) { map.Remove(order.Last!.Value.k); order.RemoveLast(); }
        map[key] = order.AddFirst((key, value));
    }
}</code></pre>
<p>Know the language shortcuts: Python <code>OrderedDict</code> with <code>move_to_end</code>/<code>popitem(last=False)</code>; Java <code>LinkedHashMap</code> with <code>accessOrder=true</code> and <code>removeEldestEntry</code>; JavaScript <code>Map</code> preserves insertion order, so delete-and-reinsert moves a key to the end. Interviewers often ask you to build it by hand anyway.</p>

<h3>Concurrency vocabulary you must have</h3>
<ul class="clean">
  <li><b>Race condition</b> — outcome depends on timing. Check-then-act (<code>if (!map.ContainsKey(k)) map[k] = …</code>) is the classic.</li>
  <li><b>Mutex / lock</b> — one thread in a critical section. C# <code>lock</code>, Java <code>synchronized</code> / <code>ReentrantLock</code>, Python <code>threading.Lock</code>.</li>
  <li><b>Semaphore</b> — at most N threads. Connection pools, rate limiting.</li>
  <li><b>Read-write lock</b> — many readers or one writer. A thread-safe LRU's <code>Get</code> still mutates order, so it needs the write lock — a nice gotcha.</li>
  <li><b>Atomic / CAS</b> — lock-free updates. <code>Interlocked.Increment</code>, <code>AtomicInteger</code>.</li>
  <li><b>Deadlock</b> — needs mutual exclusion, hold-and-wait, no preemption, circular wait. Prevent by acquiring locks in a fixed global order.</li>
  <li><b>Producer–consumer</b> — bounded blocking queue. C# <code>Channel&lt;T&gt;</code> / <code>BlockingCollection&lt;T&gt;</code>, Java <code>BlockingQueue</code>, Python <code>queue.Queue</code>.</li>
</ul>

<div class="callout gold">
  <span class="tag">Language difference that matters</span>
  <p>CPython's GIL means threads don't run Python bytecode in parallel (free-threaded builds exist from 3.13 but aren't the default), so CPU-bound parallelism uses processes. JavaScript is single-threaded with an event loop — concurrency is async I/O, and true parallelism needs Worker threads. C# and Java threads run truly in parallel, so data races are real.</p>
</div>

<div class="drill">
  <span class="tag">Drill</span>
  <ol>
    <li>LRU Cache <em>— by hand, then with the library shortcut</em></li>
    <li>LFU Cache <em>— stretch</em></li>
    <li>Design a thread-safe bounded blocking queue</li>
    <li>Print FooBar Alternately <em>— semaphores</em></li>
    <li>Design Hit Counter</li>
  </ol>
</div>
` }
  ]
}

);
