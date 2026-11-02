/* Subjects group topics (COURSE entries) for navigation. Order here = order on the site. */
window.SUBJECTS = [
  { id:"start", title:"Start here", icon:"◎",
    sub:"Strategy, what changed in interviews, how to spend your daily hour — and the 28-day plan that ties every subject together.",
    topics:[1, 10] },
  { id:"basics", title:"Basics", icon:"∑",
    sub:"Big-O complexity, every core data structure, recursion, sorting and bits. Rebuild the foundation first.",
    topics:["cx", "ds", "rs"] },
  { id:"patterns", title:"Coding Patterns", icon:"⌘",
    sub:"The patterns that map problem shapes to techniques: windows, pointers, trees, graphs, heaps, DP, greedy and more — each with a drill list.",
    topics:[3, 4, 5, "p4"] },
  { id:"design", title:"System Design", icon:"⧉",
    sub:"Foundations, scaling building blocks, six worked designs and low-level (object-oriented) design.",
    topics:[6, "sc", 7, "lld"] },
  { id:"lang", title:"Languages", icon:"{ }",
    sub:"C#, Python, Java, JavaScript and SQL — toolkits, traps, and side-by-side comparisons of where they differ.",
    topics:["cmp", 2, "py", "java", "js", "sql"] },
  { id:"rounds", title:"Interview Rounds", icon:"◷",
    sub:"How coding rounds are scored, the 45-minute playbook, the new debug and AI-assisted rounds, and behavioural for the senior bar.",
    topics:["cr", 8, 9] },
  { id:"res", title:"Resources", icon:"↗",
    sub:"The open-source repos behind this site and when to use each one.",
    topics:["res"] }
];
