export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  code?: string;
  body: string;
};

export type Module = {
  id: string;
  phase: "01" | "02" | "03";
  phaseName: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export const curriculum: Module[] = [
  {
    id: "foundations",
    phase: "01",
    phaseName: "The Foundation",
    title: "Python Foundations",
    description: "Zero to scripting. Variables, control flow, and the Pythonic philosophy.",
    lessons: [
      {
        slug: "hello-python",
        title: "Hello, Python",
        summary: "Install Python, run your first script, and understand the REPL.",
        code: `# Your first Python program\nprint("Hello, Python")\nname = input("What is your name? ")\nprint(f"Welcome, {name}.")`,
        body: "Python runs everywhere — your laptop, servers, satellites. We start by installing Python 3.12, configuring a clean virtual environment, and writing a script you can execute from the terminal. The REPL is your scratchpad; learn to think in expressions, not statements.",
      },
      {
        slug: "variables-types",
        title: "Variables & Data Types",
        summary: "int, float, str, bool — and how Python tracks them in memory.",
        code: `x: int = 42\npi: float = 3.14159\nname: str = "Ada"\nactive: bool = True\n\nprint(type(x), id(x))`,
        body: "Everything in Python is an object. Variables are labels, not boxes. Understanding identity (`id`), type (`type`), and value is the foundation of debugging anything more complex.",
      },
      {
        slug: "control-flow",
        title: "Control Flow",
        summary: "if/elif/else, while, for, and the walrus operator.",
        code: `for n in range(1, 11):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)`,
        body: "Branching and iteration. The classic FizzBuzz reveals how Python reads top-to-bottom. Use `break`, `continue`, and `else` clauses on loops — yes, loops have `else`.",
      },
      {
        slug: "data-structures",
        title: "Lists, Tuples, Dicts, Sets",
        summary: "Choose the right container for the job.",
        code: `users = [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Linus"}]\nby_id = {u["id"]: u["name"] for u in users}\nunique_names = {u["name"] for u in users}`,
        body: "Lists are ordered and mutable. Tuples are ordered and frozen. Dicts are hash-maps with O(1) lookup. Sets are dicts without values. Pick correctly and your code runs 100× faster.",
      },
      {
        slug: "functions",
        title: "Functions & Scope",
        summary: "Arguments, defaults, *args, **kwargs, closures.",
        code: `def discount(price: float, *, rate: float = 0.1) -> float:\n    return round(price * (1 - rate), 2)\n\nprint(discount(100, rate=0.25))`,
        body: "Functions are first-class. Keyword-only arguments (after `*`) prevent positional mistakes. Type hints are documentation that your editor can check.",
      },
      {
        slug: "file-io",
        title: "File I/O & Context Managers",
        summary: "Read, write, and never leak a file handle again.",
        code: `from pathlib import Path\n\nwith Path("notes.txt").open("w", encoding="utf-8") as f:\n    f.write("Python is the language of leverage.\\n")`,
        body: "The `with` statement guarantees cleanup. `pathlib` is the modern API — string paths are legacy. Always specify encoding.",
      },
    ],
  },
  {
    id: "intermediate",
    phase: "02",
    phaseName: "Enterprise Patterns",
    title: "OOP, Patterns & Async",
    description: "Classes, decorators, design patterns, and concurrency.",
    lessons: [
      {
        slug: "classes",
        title: "Classes & Dataclasses",
        summary: "Objects without the boilerplate.",
        code: `from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Point:\n    x: float\n    y: float\n\n    def distance_to(self, other: "Point") -> float:\n        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5`,
        body: "Dataclasses generate `__init__`, `__repr__`, and `__eq__` for you. `frozen=True` makes instances hashable and safe across threads.",
      },
      {
        slug: "decorators",
        title: "Decorators",
        summary: "Functions that wrap functions — the heart of Python frameworks.",
        code: `from functools import wraps\nimport time\n\ndef timed(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        result = fn(*args, **kwargs)\n        print(f"{fn.__name__}: {time.perf_counter() - t0:.4f}s")\n        return result\n    return wrapper\n\n@timed\ndef slow():\n    time.sleep(0.5)`,
        body: "Decorators are syntactic sugar for `fn = decorator(fn)`. They power Flask routes, pytest fixtures, and every cache you've ever used.",
      },
      {
        slug: "iterators-generators",
        title: "Iterators & Generators",
        summary: "Lazy sequences that never blow your memory.",
        code: `def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfrom itertools import islice\nprint(list(islice(fibonacci(), 10)))`,
        body: "`yield` turns a function into a generator. Generators produce one value at a time — perfect for log streams, infinite series, and pipelines.",
      },
      {
        slug: "errors",
        title: "Error Handling Done Right",
        summary: "try/except/else/finally — and custom exceptions.",
        code: `class PaymentError(Exception):\n    pass\n\ntry:\n    charge(user, amount)\nexcept PaymentError as e:\n    logger.warning("payment failed: %s", e)\nelse:\n    send_receipt(user)\nfinally:\n    close_connection()`,
        body: "Catch what you can handle. Re-raise what you can't. Custom exception hierarchies make your library a joy to use.",
      },
      {
        slug: "asyncio",
        title: "Asyncio Mastery",
        summary: "Concurrent I/O without threads.",
        code: `import asyncio, httpx\n\nasync def fetch(client, url):\n    r = await client.get(url)\n    return r.status_code\n\nasync def main():\n    async with httpx.AsyncClient() as client:\n        urls = ["https://example.com"] * 50\n        return await asyncio.gather(*[fetch(client, u) for u in urls])\n\nasyncio.run(main())`,
        body: "Async lets one thread juggle thousands of network calls. The event loop never blocks — your code awaits. Use `asyncio.gather` for parallelism.",
      },
      {
        slug: "testing",
        title: "Unit Testing with pytest",
        summary: "Tests are documentation that runs.",
        code: `import pytest\nfrom shop import discount\n\n@pytest.mark.parametrize("price,rate,expected", [\n    (100, 0.1, 90.0),\n    (50, 0.0, 50.0),\n])\ndef test_discount(price, rate, expected):\n    assert discount(price, rate=rate) == expected`,
        body: "pytest finds tests, runs them, and reports failures in plain English. Parametrize to cover edge cases in one function.",
      },
    ],
  },
  {
    id: "advanced",
    phase: "03",
    phaseName: "The Architect",
    title: "Production Engineering",
    description: "FastAPI, Docker, CI/CD, and ML pipelines.",
    lessons: [
      {
        slug: "fastapi",
        title: "Build APIs with FastAPI",
        summary: "Modern Python web services in 30 lines.",
        code: `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\n@app.post("/items")\nasync def create(item: Item):\n    return {"id": 1, **item.model_dump()}`,
        body: "FastAPI auto-generates OpenAPI docs, validates with Pydantic, and runs async out of the box. Production-grade in one file.",
      },
      {
        slug: "sql",
        title: "Databases with SQLAlchemy",
        summary: "ORM done right — typed, async, and fast.",
        code: `from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\n\nclass Base(DeclarativeBase): pass\n\nclass User(Base):\n    __tablename__ = "users"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(unique=True)`,
        body: "SQLAlchemy 2.0's typed API gives you migrations, query building, and connection pooling. Master joins and you master data.",
      },
      {
        slug: "docker",
        title: "Containerize Everything",
        summary: "Reproducible builds from your laptop to production.",
        code: `# Dockerfile\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`,
        body: "Docker freezes your environment. Multi-stage builds keep images small. Compose orchestrates services locally.",
      },
      {
        slug: "ci-cd",
        title: "CI/CD with GitHub Actions",
        summary: "Test, lint, and deploy on every push.",
        code: `# .github/workflows/ci.yml\nname: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with: { python-version: '3.12' }\n      - run: pip install -r requirements.txt\n      - run: pytest`,
        body: "Automate the boring parts. Block merges on red tests. Deploy on green tags. Sleep at night.",
      },
      {
        slug: "data-pandas",
        title: "Data Wrangling with Pandas",
        summary: "Tabular data at the speed of thought.",
        code: `import pandas as pd\n\ndf = pd.read_csv("sales.csv", parse_dates=["date"])\nmonthly = (df.assign(month=df.date.dt.to_period("M"))\n             .groupby("month")["revenue"].sum())\nprint(monthly.head())`,
        body: "Pandas is the lingua franca of data work. Master groupby, merge, and pivot — they cover 80% of analysis.",
      },
      {
        slug: "ml-deploy",
        title: "Deploy a Model",
        summary: "From notebook to production endpoint.",
        code: `import joblib\nfrom fastapi import FastAPI\n\nmodel = joblib.load("classifier.pkl")\napp = FastAPI()\n\n@app.post("/predict")\ndef predict(features: list[float]):\n    return {"label": int(model.predict([features])[0])}`,
        body: "A trained model is just a function. Serialize with joblib, serve with FastAPI, monitor with Prometheus. That's MLOps in three steps.",
      },
    ],
  },
];

export const allLessons = curriculum.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, module: m.id, phase: m.phase })),
);

export type Problem = {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  category: string;
  prompt: string;
  example: string;
  solution: string;
};

export const problems: Problem[] = [
  {
    slug: "right-triangle",
    title: "Right Triangle Pattern",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a right-angled triangle of stars with N rows.",
    example: "N = 4 →\n*\n* *\n* * *\n* * * *",
    solution: `def triangle(n: int) -> None:\n    for i in range(1, n + 1):\n        print(" ".join("*" * i))\n\ntriangle(4)`,
  },
  {
    slug: "diamond",
    title: "Diamond Pattern",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a centered diamond of stars of height 2N-1.",
    example: "N = 3 →\n  *\n ***\n*****\n ***\n  *",
    solution: `def diamond(n: int) -> None:\n    for i in list(range(n)) + list(range(n - 2, -1, -1)):\n        print(" " * (n - i - 1) + "*" * (2 * i + 1))\n\ndiamond(3)`,
  },
  {
    slug: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "Medium",
    category: "Math",
    prompt: "Generate the first N rows of Pascal's triangle.",
    example: "N = 5 → [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    solution: `def pascal(n: int) -> list[list[int]]:\n    rows = [[1]]\n    for _ in range(n - 1):\n        prev = rows[-1]\n        rows.append([1, *[a + b for a, b in zip(prev, prev[1:])], 1])\n    return rows`,
  },
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    prompt: "Given an array and a target, return indices of two numbers that add to target.",
    example: "[2,7,11,15], target=9 → [0,1]",
    solution: `def two_sum(nums: list[int], target: int) -> list[int]:\n    seen: dict[int, int] = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []`,
  },
  {
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Hard",
    category: "Matrix",
    prompt: "Return all elements of an m×n matrix in spiral order.",
    example: "[[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]",
    solution: `def spiral(m: list[list[int]]) -> list[int]:\n    out = []\n    while m:\n        out += m.pop(0)\n        m = list(zip(*m))[::-1]\n    return out`,
  },
  {
    slug: "prime-sieve",
    title: "Sieve of Eratosthenes",
    difficulty: "Medium",
    category: "Math",
    prompt: "Return all primes below N.",
    example: "N = 30 → [2,3,5,7,11,13,17,19,23,29]",
    solution: `def sieve(n: int) -> list[int]:\n    flags = [True] * n\n    flags[:2] = [False, False]\n    for i in range(2, int(n ** 0.5) + 1):\n        if flags[i]:\n            flags[i*i::i] = [False] * len(flags[i*i::i])\n    return [i for i, p in enumerate(flags) if p]`,
  },
  {
    slug: "balanced-parens",
    title: "Balanced Parentheses",
    difficulty: "Medium",
    category: "Stacks",
    prompt: "Determine if a string of brackets is well-formed.",
    example: "'({[]})' → True, '([)]' → False",
    solution: `def balanced(s: str) -> bool:\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack: list[str] = []\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return not stack`,
  },
  {
    slug: "fibonacci-memo",
    title: "Memoized Fibonacci",
    difficulty: "Easy",
    category: "DP",
    prompt: "Compute the nth Fibonacci number in O(N) time.",
    example: "n=10 → 55",
    solution: `from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)`,
  },
  {
    slug: "anagram-groups",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Hashing",
    prompt: "Group a list of strings so that anagrams are together.",
    example: "['eat','tea','tan','ate','nat','bat'] → [['eat','tea','ate'],['tan','nat'],['bat']]",
    solution: `from collections import defaultdict\n\ndef groups(words: list[str]) -> list[list[str]]:\n    bucket: dict[str, list[str]] = defaultdict(list)\n    for w in words:\n        bucket["".join(sorted(w))].append(w)\n    return list(bucket.values())`,
  },
  {
    slug: "lru-cache",
    title: "Design an LRU Cache",
    difficulty: "Hard",
    category: "Design",
    prompt: "Implement a fixed-capacity LRU cache with O(1) get and put.",
    example: "capacity=2; put(1,1); put(2,2); get(1) → 1; put(3,3) evicts 2",
    solution: `from collections import OrderedDict\n\nclass LRU:\n    def __init__(self, cap: int):\n        self.cap, self.data = cap, OrderedDict()\n    def get(self, k):\n        if k not in self.data: return -1\n        self.data.move_to_end(k); return self.data[k]\n    def put(self, k, v):\n        if k in self.data: self.data.move_to_end(k)\n        self.data[k] = v\n        if len(self.data) > self.cap: self.data.popitem(last=False)`,
  },
  {
    slug: "topological-sort",
    title: "Topological Sort",
    difficulty: "Expert",
    category: "Graphs",
    prompt: "Order tasks given prerequisite edges, or detect a cycle.",
    example: "edges=[(1,2),(2,3)] → [1,2,3]",
    solution: `from collections import defaultdict, deque\n\ndef toposort(n: int, edges: list[tuple[int,int]]) -> list[int]:\n    g = defaultdict(list); indeg = [0]*n\n    for u, v in edges: g[u].append(v); indeg[v] += 1\n    q = deque(i for i in range(n) if indeg[i] == 0)\n    out = []\n    while q:\n        u = q.popleft(); out.append(u)\n        for v in g[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0: q.append(v)\n    return out if len(out) == n else []`,
  },
  {
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Expert",
    category: "BFS",
    prompt: "Find shortest transformation length from begin to end, changing one letter at a time.",
    example: "'hit' → 'cog' via ['hot','dot','dog','cog'] → 5",
    solution: `from collections import deque\n\ndef ladder(begin: str, end: str, words: set[str]) -> int:\n    if end not in words: return 0\n    q = deque([(begin, 1)])\n    while q:\n        w, d = q.popleft()\n        if w == end: return d\n        for i in range(len(w)):\n            for c in "abcdefghijklmnopqrstuvwxyz":\n                nxt = w[:i] + c + w[i+1:]\n                if nxt in words:\n                    words.remove(nxt); q.append((nxt, d + 1))\n    return 0`,
  },
];

export const projects = [
  {
    slug: "web-scraper",
    title: "Distributed Web Scraper",
    stack: ["httpx", "asyncio", "BeautifulSoup", "Postgres"],
    summary: "Scrape thousands of pages concurrently with proxy rotation and a SQL sink.",
    skills: ["Async I/O", "Rate limiting", "Database design"],
  },
  {
    slug: "sentiment-api",
    title: "Sentiment Analysis API",
    stack: ["FastAPI", "Hugging Face", "Docker"],
    summary: "Wrap a transformer model behind a typed REST endpoint with batching and caching.",
    skills: ["ML inference", "REST design", "Containerization"],
  },
  {
    slug: "blockchain-ledger",
    title: "Mock Blockchain Ledger",
    stack: ["hashlib", "FastAPI", "Pydantic"],
    summary: "Build an immutable hash chain with node validation and proof-of-work.",
    skills: ["Cryptography", "Consensus", "Data structures"],
  },
  {
    slug: "task-scheduler",
    title: "Distributed Task Scheduler",
    stack: ["Redis", "Celery", "FastAPI"],
    summary: "Cron-like scheduler that fans tasks across worker processes with retry semantics.",
    skills: ["Message queues", "Concurrency", "Observability"],
  },
  {
    slug: "trading-bot",
    title: "Algorithmic Trading Bot",
    stack: ["pandas", "ccxt", "asyncio"],
    summary: "Backtest a momentum strategy on historical data, then paper-trade live tickers.",
    skills: ["Time series", "Strategy design", "Live data"],
  },
  {
    slug: "log-pipeline",
    title: "Real-time Log Pipeline",
    stack: ["Kafka", "FastAPI", "ClickHouse"],
    summary: "Ingest, parse, and query application logs at millions of events per minute.",
    skills: ["Streaming", "Schema design", "Aggregation"],
  },
];
