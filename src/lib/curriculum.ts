export type LessonSection = {
  heading: string;
  body: string;
  code?: string;
};

export type KeywordNote = {
  name: string;
  description: string;
  example?: string;
};

export type SyntaxRule = {
  rule: string;
  example: string;
};

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  code?: string;
  body: string;
  /** Long-form, multi-section explanation rendered after the intro. */
  sections?: LessonSection[];
  /** Keywords / built-ins introduced in this lesson, with plain-English notes. */
  keywords?: KeywordNote[];
  /** Syntax rules the learner MUST internalise for this topic. */
  syntax?: SyntaxRule[];
  /** Common mistakes & how to avoid them. */
  pitfalls?: string[];
  /** "Why it matters" — connects the lesson to real engineering work. */
  whyItMatters?: string;
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
        body:
          "Python runs everywhere — your laptop, servers, satellites. We start by installing Python 3.12, configuring a clean virtual environment, and writing a script you can execute from the terminal. The REPL is your scratchpad; learn to think in expressions, not statements.",
        sections: [
          {
            heading: "What Python actually is",
            body:
              "Python is an interpreted, dynamically-typed, multi-paradigm language created by Guido van Rossum in 1991. 'Interpreted' means a program called the Python interpreter (CPython is the reference implementation) reads your .py file line by line, converts each statement into bytecode, and runs that bytecode on a virtual machine. There is no separate compile step like in C or Java — you save the file and run it. 'Dynamically typed' means a variable's type is decided at runtime, not when you declare it; the same name can hold an integer one moment and a string the next.",
          },
          {
            heading: "Installing the interpreter",
            body:
              "On macOS use Homebrew: `brew install python@3.12`. On Windows download the official installer from python.org and TICK the 'Add Python to PATH' checkbox — forgetting that single checkbox is the #1 reason beginners cannot run `python` from the terminal. On Linux Python is usually pre-installed; verify with `python3 --version`. Always prefer Python 3.10 or newer; the 2.x series was retired in 2020.",
          },
          {
            heading: "Virtual environments",
            body:
              "A virtual environment is an isolated folder containing its own Python interpreter and its own installed packages. Create one per project so dependencies never collide: `python -m venv .venv` then `source .venv/bin/activate` (macOS/Linux) or `.venv\\Scripts\\activate` (Windows). When the prompt shows `(.venv)`, every `pip install` writes into that folder, not your global Python. Deactivate with `deactivate`.",
            code: `python -m venv .venv\nsource .venv/bin/activate   # mac/linux\n.venv\\Scripts\\activate     # windows\npip install requests`,
          },
          {
            heading: "The REPL vs. a script",
            body:
              "Typing `python` with no arguments opens the REPL (Read–Eval–Print Loop) — an interactive prompt where every expression you type is evaluated immediately and its value printed. Use it to test snippets. For real programs save code in a `.py` file and run `python myfile.py`. The REPL prints expressions; a script only prints what you explicitly `print()`.",
          },
        ],
        keywords: [
          { name: "print", description: "Built-in function that writes text to standard output (your terminal). Accepts any number of values separated by commas and joins them with a space.", example: 'print("hello", 42)  # hello 42' },
          { name: "input", description: "Pauses the program, reads one line from the keyboard, and returns it as a string. Always a string — convert with int() or float() if you need a number.", example: 'age = int(input("Age? "))' },
          { name: "#", description: "Starts a single-line comment. Everything after # on that line is ignored by the interpreter — use comments to explain WHY, not what.", example: "# this is a comment" },
          { name: "f-string", description: "A string literal prefixed with f or F that lets you embed expressions in braces. Evaluated at runtime — the fastest and most readable formatting style in modern Python.", example: 'name = "Ada"; print(f"hi {name}")' },
        ],
        syntax: [
          { rule: "Python statements end at the newline, not with a semicolon.", example: "x = 5    # one statement, no ;" },
          { rule: "String literals can use single or double quotes — pick one style and be consistent.", example: "'hello'  or  \"hello\"" },
          { rule: "Function calls require parentheses, even with no arguments.", example: "print()    # works\nprint      # does NOT call, just refers to the function" },
        ],
        pitfalls: [
          "Forgetting to add Python to PATH on Windows — `python` then prints 'command not found'.",
          "Editing a script in one window while running an old version in another. Always re-run after saving.",
          "Using `input()` and expecting a number — it returns a string; wrap it in `int(...)` or `float(...)`.",
        ],
        whyItMatters:
          "Every later lesson assumes you can save a file, activate a virtualenv, and run it. Master this 30-minute setup and you save weeks of 'why doesn't it work on my machine?' pain.",
      },
      {
        slug: "variables-types",
        title: "Variables & Data Types",
        summary: "int, float, str, bool — and how Python tracks them in memory.",
        code: `x: int = 42\npi: float = 3.14159\nname: str = "Ada"\nactive: bool = True\n\nprint(type(x), id(x))`,
        body:
          "Everything in Python is an object. Variables are labels, not boxes. Understanding identity (`id`), type (`type`), and value is the foundation of debugging anything more complex.",
        sections: [
          {
            heading: "The four primitive types",
            body:
              "`int` is an integer of unlimited size — Python automatically grows the number's storage as it gets bigger, so `2 ** 1000` just works. `float` is a 64-bit IEEE-754 double-precision number; it can represent very large or very small values but with rounding error (0.1 + 0.2 != 0.3 in floats). `str` is an immutable sequence of Unicode characters, so emoji and Hindi and Mandarin all work without ceremony. `bool` is a subclass of `int` where `True == 1` and `False == 0`.",
          },
          {
            heading: "Names vs. objects",
            body:
              "When you write `x = 42`, Python creates the integer object 42 (or reuses a cached one) and binds the name `x` to it. Writing `y = x` does NOT copy; it binds `y` to the same object. You can verify with `id(x) == id(y)`. This is why assigning a list to two names and mutating one mutates 'both' — they are the same object.",
            code: `a = [1, 2, 3]\nb = a          # same object, not a copy\nb.append(4)\nprint(a)        # [1, 2, 3, 4]`,
          },
          {
            heading: "Mutable vs. immutable",
            body:
              "Strings, ints, floats, tuples, frozensets, and bytes are IMMUTABLE — once created, they cannot be changed. `s = 'hi'; s += '!'` does not modify the original string; it creates a new one and re-binds `s`. Lists, dicts, sets, and most user-defined classes are MUTABLE. The distinction matters for function arguments (mutable defaults are a famous trap) and for using values as dictionary keys (only immutable values are hashable).",
          },
          {
            heading: "Type hints",
            body:
              "Python is dynamically typed at runtime, but since 3.5 you can annotate names with their intended type: `count: int = 0`. The interpreter ignores these annotations — they are documentation for humans and for static checkers like `mypy` or `pyright`. Modern IDEs use hints to flag errors before you run the code.",
          },
        ],
        keywords: [
          { name: "int", description: "Built-in arbitrary-precision integer type and constructor. `int('42')` parses a string to a number.", example: "int('42')  # 42" },
          { name: "float", description: "64-bit IEEE-754 floating-point number. `float('3.14')` parses a string.", example: "float('3.14')" },
          { name: "str", description: "Immutable Unicode string. `str(42)` converts a value to its text representation.", example: "str(42)  # '42'" },
          { name: "bool", description: "Either True or False. Any value can be tested for truthiness with bool(x).", example: "bool([])   # False (empty list)" },
          { name: "type", description: "Returns the class of an object. Use `isinstance(x, int)` in production code instead of comparing types directly.", example: "type(3.14)  # <class 'float'>" },
          { name: "id", description: "Returns a unique integer identifying the object during its lifetime — useful for debugging aliasing bugs.", example: "id(x)" },
        ],
        syntax: [
          { rule: "Variable names: letters, digits, underscores; cannot start with a digit. Case-sensitive.", example: "user_id, _private, count2" },
          { rule: "Type annotations use a colon AFTER the name, equals for the value.", example: "age: int = 30" },
          { rule: "Use `is` for identity (same object), `==` for equality (same value). Almost always you want `==`.", example: "x is None    # identity\nx == None    # bad style — use the first form for None" },
        ],
        pitfalls: [
          "Floats are not exact: `0.1 + 0.2 == 0.3` is False. Use the `decimal` module for money.",
          "Mutable default arguments: `def f(x=[])` shares the list across every call. Use `None` as the default and create a new list inside.",
          "Comparing strings with `is` ('hello' is 'hello' is True only because of CPython interning — relying on it is a bug).",
        ],
        whyItMatters:
          "Bugs in production are usually bugs about state: who owns this list, when was it mutated, why does this dict have stale data? Knowing how Python stores values turns mysterious bugs into obvious ones.",
      },
      {
        slug: "control-flow",
        title: "Control Flow",
        summary: "if/elif/else, while, for, and the walrus operator.",
        code: `for n in range(1, 11):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)`,
        body:
          "Branching and iteration. The classic FizzBuzz reveals how Python reads top-to-bottom. Use `break`, `continue`, and `else` clauses on loops — yes, loops have `else`.",
        sections: [
          {
            heading: "Indentation IS syntax",
            body:
              "Python has no curly braces. A block is defined by indenting a consistent number of spaces (4 by convention) underneath a header line that ends with a colon. Mixing tabs and spaces is a syntax error. Every modern editor will insert 4 spaces when you press Tab inside a .py file — let it.",
          },
          {
            heading: "if / elif / else",
            body:
              "A chain runs the FIRST branch whose condition is truthy and skips the rest. `elif` is short for 'else if'. `else` is optional and runs when nothing else matched. Conditions can be any expression — Python calls `bool()` on the result, so empty collections and zero count as False.",
            code: `score = 87\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"`,
          },
          {
            heading: "for and while",
            body:
              "`for x in iterable:` walks through any object that supports iteration — lists, strings, files, generators. `while cond:` repeats as long as `cond` is truthy. Inside either, `break` exits the loop immediately and `continue` jumps to the next iteration. The unusual loop-`else` clause runs only if the loop finished WITHOUT hitting `break` — useful for search loops.",
            code: `for n in nums:\n    if n == target:\n        print("found")\n        break\nelse:\n    print("not found")`,
          },
          {
            heading: "The walrus operator :=",
            body:
              "Added in 3.8, `:=` lets you assign inside an expression. Common pattern: read a chunk and loop until empty without calling the read twice.",
            code: `while (chunk := f.read(4096)):\n    process(chunk)`,
          },
          {
            heading: "match / case (3.10+)",
            body:
              "Pattern matching is a powerful switch-like statement that destructures shapes. Use it for parsing AST-like data, command parsers, and state machines.",
            code: `match command.split():\n    case ["quit"]:\n        exit()\n    case ["go", direction]:\n        move(direction)\n    case ["drop", *items]:\n        for i in items: drop(i)\n    case _:\n        print("unknown")`,
          },
        ],
        keywords: [
          { name: "if", description: "Starts a conditional branch. Followed by an expression and a colon." },
          { name: "elif", description: "Else-if. Checked only if the preceding if/elif was False." },
          { name: "else", description: "Runs when no preceding if/elif matched. Works on loops too." },
          { name: "for", description: "Iterates over any iterable. Syntax: `for item in iterable:`." },
          { name: "while", description: "Loops as long as its condition is truthy." },
          { name: "break", description: "Exits the innermost loop immediately." },
          { name: "continue", description: "Skips to the next iteration of the innermost loop." },
          { name: "pass", description: "A do-nothing placeholder. Required when a block needs at least one statement.", example: "if x: pass" },
          { name: "range", description: "Returns a lazy sequence of integers. range(stop), range(start, stop), range(start, stop, step).", example: "range(0, 10, 2)  # 0,2,4,6,8" },
          { name: "match", description: "Begins a structural pattern-matching statement (Python 3.10+)." },
          { name: "case", description: "A pattern inside a match block. `case _:` is the default." },
        ],
        syntax: [
          { rule: "Every block header (if, for, while, def, class) ends with a colon.", example: "if x > 0:" },
          { rule: "Indent the body 4 spaces — never mix tabs and spaces.", example: "if x:\n    do_it()" },
          { rule: "Comparison chaining works: `a < b < c` is equivalent to `a < b and b < c` but evaluates b only once.", example: "if 0 < score < 100:" },
        ],
        pitfalls: [
          "Off-by-one errors with `range` — `range(10)` produces 0..9, not 1..10.",
          "Mutating a list while iterating over it. Iterate over a copy or build a new list.",
          "Using `==` to compare with `None`. Always use `is None` / `is not None`.",
        ],
        whyItMatters:
          "Every program is data + control flow. Master `for` + `if` + `match` and you can express almost any algorithm cleanly without resorting to recursion or exotic libraries.",
      },
      {
        slug: "data-structures",
        title: "Lists, Tuples, Dicts, Sets",
        summary: "Choose the right container for the job.",
        code: `users = [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Linus"}]\nby_id = {u["id"]: u["name"] for u in users}\nunique_names = {u["name"] for u in users}`,
        body:
          "Lists are ordered and mutable. Tuples are ordered and frozen. Dicts are hash-maps with O(1) lookup. Sets are dicts without values. Pick correctly and your code runs 100× faster.",
        sections: [
          {
            heading: "List — the workhorse",
            body:
              "A `list` is an ordered, mutable, heterogeneous sequence. Created with `[]` or `list()`. Indexing is zero-based, negative indices count from the end. Slicing returns a new list. Common methods: `.append(x)`, `.extend(iter)`, `.pop(i)`, `.insert(i, x)`, `.sort()`, `.reverse()`. Time complexity: append O(1) amortised, insert/pop at front O(n), index O(1), `in` is O(n).",
            code: `nums = [3, 1, 4, 1, 5, 9]\nnums.append(2)\nnums.sort()           # in place\nfirst_three = nums[:3]\nlast = nums[-1]`,
          },
          {
            heading: "Tuple — the frozen list",
            body:
              "A `tuple` is an ordered, IMMUTABLE sequence. Created with `()` or just commas: `point = 3, 4`. Use tuples for fixed-size records, dict keys, and when you want to signal 'this should never change'. Slightly faster and smaller than lists. The named alternative is `collections.namedtuple` or modern `typing.NamedTuple`.",
          },
          {
            heading: "Dict — the hash map",
            body:
              "A `dict` maps hashable keys to values, with average O(1) lookup, insert, and delete. Since 3.7 dictionaries preserve insertion order. Create with `{key: value}` or `dict(...)`. Iterate with `.items()`, `.keys()`, `.values()`. Use `.get(key, default)` for safe lookup, `setdefault(key, default)` for build-once patterns, and `collections.defaultdict` when every miss should auto-create a value.",
            code: `scores = {"ada": 95, "linus": 88}\nscores["grace"] = 99\nfor name, s in scores.items():\n    print(name, s)`,
          },
          {
            heading: "Set — the membership tester",
            body:
              "A `set` is an unordered collection of unique, hashable values. O(1) membership test, union (`|`), intersection (`&`), difference (`-`). Empty set is `set()`, NOT `{}` (that is an empty dict).",
          },
          {
            heading: "Comprehensions",
            body:
              "Comprehensions build a new list/dict/set/generator in one expression. Read left to right as 'output | for | filter'.",
            code: `squares = [n * n for n in range(10)]\neven_sq = [n * n for n in range(10) if n % 2 == 0]\nby_len = {w: len(w) for w in words}\nuniq_chars = {c for c in text}`,
          },
        ],
        keywords: [
          { name: "in", description: "Membership test. `x in container` returns True if x equals some element.", example: "5 in [1, 2, 5]   # True" },
          { name: "not in", description: "Negated membership test." },
          { name: "del", description: "Removes a binding or item. `del nums[0]` removes element 0; `del nums` unbinds the name." },
          { name: "len", description: "Returns the number of items in any sized container." },
          { name: "sorted", description: "Returns a NEW sorted list. `key=` accepts a function; `reverse=True` flips order." },
          { name: "enumerate", description: "Pairs each item with its index. Use instead of `range(len(...))`.", example: "for i, x in enumerate(nums):" },
          { name: "zip", description: "Pairs items from multiple iterables. Stops at the shortest." },
        ],
        syntax: [
          { rule: "Empty containers: [] list, () tuple, {} dict, set() set.", example: "empty_set = set()" },
          { rule: "Slicing: seq[start:stop:step]. Negative indices count from the end. Stop is EXCLUSIVE.", example: "nums[1:5:2]" },
          { rule: "Unpacking: a, b, *rest = [1, 2, 3, 4]   # a=1 b=2 rest=[3,4]", example: "first, *mid, last = nums" },
        ],
        pitfalls: [
          "`a = b = []` makes both names point to the SAME list. Mutating through one affects both.",
          "Dict keys must be hashable — lists cannot be keys; convert to tuples first.",
          "`{}` creates an empty dict, not an empty set. Beginners trip on this constantly.",
        ],
        whyItMatters:
          "Choosing the right container is usually the single biggest performance decision. A `list` lookup of 1,000,000 items is 100,000× slower than a `set` or `dict` lookup.",
      },
      {
        slug: "functions",
        title: "Functions & Scope",
        summary: "Arguments, defaults, *args, **kwargs, closures.",
        code: `def discount(price: float, *, rate: float = 0.1) -> float:\n    return round(price * (1 - rate), 2)\n\nprint(discount(100, rate=0.25))`,
        body:
          "Functions are first-class. Keyword-only arguments (after `*`) prevent positional mistakes. Type hints are documentation that your editor can check.",
        sections: [
          {
            heading: "Definitions and calls",
            body:
              "Define with `def name(params):` followed by an indented body. A function returns `None` unless you `return` something. Parameters can have defaults (`x=0`), accept variable positional args (`*args`), variable keyword args (`**kwargs`), and force keyword-only or positional-only with `*` and `/` markers.",
            code: `def greet(name: str, greeting: str = "Hi") -> str:\n    return f"{greeting}, {name}!"\n\ndef sum_all(*nums: int) -> int:\n    return sum(nums)\n\ndef config(**options):\n    print(options)`,
          },
          {
            heading: "Scopes — the LEGB rule",
            body:
              "When Python looks up a name, it searches in order: Local (this function) → Enclosing (any nested function) → Global (module-level) → Built-in. Use `global x` to rebind a module-level name from inside a function, and `nonlocal x` to rebind a name in the nearest enclosing function (closures).",
          },
          {
            heading: "Closures and first-class functions",
            body:
              "Functions are objects. You can pass them, store them in lists, return them. A function defined inside another captures variables from the outer scope by reference — that captured environment is called a closure.",
            code: `def make_multiplier(n):\n    def mul(x):\n        return x * n\n    return mul\n\ntimes3 = make_multiplier(3)\nprint(times3(10))   # 30`,
          },
          {
            heading: "Lambdas",
            body:
              "`lambda args: expr` is a one-line anonymous function. Use them for short throwaway callbacks (sort keys, map filters). For anything multi-line, write a `def`.",
            code: `pairs = [(1, 'b'), (2, 'a')]\npairs.sort(key=lambda p: p[1])`,
          },
        ],
        keywords: [
          { name: "def", description: "Defines a function." },
          { name: "return", description: "Exits a function and yields a value to the caller. No expression returns None." },
          { name: "lambda", description: "Creates an anonymous single-expression function." },
          { name: "global", description: "Declares that a name refers to the module-level variable." },
          { name: "nonlocal", description: "Declares that a name refers to a variable in the nearest enclosing (non-global) scope." },
          { name: "*args", description: "Collects extra positional arguments into a tuple." },
          { name: "**kwargs", description: "Collects extra keyword arguments into a dict." },
        ],
        syntax: [
          { rule: "Parameter order: positional, *args, keyword-only (after *), **kwargs.", example: "def f(a, b, *args, c=0, **kw):" },
          { rule: "A bare `*` marks the start of keyword-only parameters.", example: "def f(a, *, key):  # key MUST be passed by name" },
          { rule: "Return type annotation uses ->. Like all hints, it is documentation, not enforcement.", example: "def add(a: int, b: int) -> int:" },
        ],
        pitfalls: [
          "Default arguments are evaluated ONCE at definition time. `def f(x=[])` shares the same list across calls.",
          "Forgetting `return` and getting `None` back silently.",
          "Closures capture variables by reference — a classic bug is `[lambda: i for i in range(3)]` where every lambda returns 2.",
        ],
        whyItMatters:
          "Functions are how you compose ideas. Tiny, single-purpose, well-named functions read like prose and replace whole pages of comments.",
      },
      {
        slug: "file-io",
        title: "File I/O & Context Managers",
        summary: "Read, write, and never leak a file handle again.",
        code: `from pathlib import Path\n\nwith Path("notes.txt").open("w", encoding="utf-8") as f:\n    f.write("Python is the language of leverage.\\n")`,
        body:
          "The `with` statement guarantees cleanup. `pathlib` is the modern API — string paths are legacy. Always specify encoding.",
        sections: [
          {
            heading: "open() modes",
            body:
              "`open(path, mode, encoding=...)` returns a file object. Modes: `'r'` read text (default), `'w'` write text (truncates!), `'a'` append, `'x'` exclusive create, add `'b'` for binary (`'rb'`, `'wb'`). Always pass `encoding='utf-8'` for text files — the default depends on the OS and is a source of cross-platform bugs.",
          },
          {
            heading: "The with statement",
            body:
              "`with open(...) as f:` opens the file, binds it to `f`, runs the block, and guarantees `f.close()` even if an exception is raised. Any object that defines `__enter__` and `__exit__` is a context manager. You can compose multiple in one line and write your own with `contextlib.contextmanager`.",
            code: `with open("in.txt") as src, open("out.txt", "w") as dst:\n    for line in src:\n        dst.write(line.upper())`,
          },
          {
            heading: "pathlib over os.path",
            body:
              "`pathlib.Path` is an object-oriented filesystem API. `Path('a') / 'b' / 'c.txt'` builds a cross-platform path. Methods: `.exists()`, `.read_text()`, `.write_text()`, `.glob('*.py')`, `.parent`, `.stem`, `.suffix`. Almost everything that used to require `os` + `os.path` is one line with `Path`.",
          },
          {
            heading: "JSON and CSV",
            body:
              "Reading structured data: `json.load(file)` parses, `json.dump(obj, file)` writes. For CSV use `csv.DictReader(file)` to iterate rows as dicts. Both are standard library — no install needed.",
            code: `import json\ndata = json.loads(Path("config.json").read_text())`,
          },
        ],
        keywords: [
          { name: "with", description: "Context manager statement. Guarantees cleanup of the resource on exit." },
          { name: "as", description: "Binds the value returned by `with`, `import`, or `except` to a name." },
          { name: "open", description: "Built-in that returns a file object for reading or writing." },
        ],
        syntax: [
          { rule: "Always pass encoding= to open() for text files. UTF-8 is the right default.", example: "open(p, encoding='utf-8')" },
          { rule: "Read line by line by iterating the file object — memory efficient.", example: "for line in f: ..." },
        ],
        pitfalls: [
          "Opening with mode 'w' silently truncates an existing file. Use 'x' to fail if it exists.",
          "Forgetting to use `with` — leaked file handles eventually exhaust the OS limit.",
          "Reading a 50 GB file with `.read()` — use streaming iteration instead.",
        ],
        whyItMatters:
          "Almost every real program reads or writes something. Context managers prevent the most common class of resource bugs.",
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
        body:
          "Dataclasses generate `__init__`, `__repr__`, and `__eq__` for you. `frozen=True` makes instances hashable and safe across threads.",
        sections: [
          {
            heading: "The class statement",
            body:
              "`class Name:` creates a new type. Instance methods take `self` as the first parameter — Python passes the instance automatically when you call `obj.method()`. `__init__` is the constructor. `__repr__` defines what `repr(obj)` returns and is what you see in the REPL.",
            code: `class Counter:\n    def __init__(self, start: int = 0):\n        self.value = start\n    def inc(self) -> None:\n        self.value += 1\n    def __repr__(self) -> str:\n        return f"Counter({self.value})"`,
          },
          {
            heading: "Dunder methods",
            body:
              "Double-underscore methods (a.k.a. 'dunder' or 'magic') hook into Python syntax: `__len__` powers `len(x)`, `__iter__` powers `for`, `__add__` powers `+`, `__eq__` powers `==`, `__getitem__` powers `x[i]`. Implementing the right dunder makes your class feel native.",
          },
          {
            heading: "Inheritance",
            body:
              "`class Child(Parent):` inherits all attributes. Call `super().__init__(...)` to run the parent constructor. Python supports multiple inheritance with a defined MRO (Method Resolution Order) — check it with `Cls.mro()`.",
          },
          {
            heading: "Dataclasses",
            body:
              "`@dataclass` auto-generates `__init__`, `__repr__`, `__eq__` from type-annotated class attributes. Options: `frozen=True` (immutable, hashable), `slots=True` (memory-lean, blocks attribute typos), `order=True` (generates `<`, `<=`, etc.). For validation/parsing, jump up to `pydantic.BaseModel`.",
          },
        ],
        keywords: [
          { name: "class", description: "Defines a new type." },
          { name: "self", description: "Convention for the first parameter of instance methods — the current instance." },
          { name: "super", description: "Proxy to the parent class. Use `super().method(...)` for cooperative inheritance." },
          { name: "@property", description: "Decorator that turns a method into a read-only attribute." },
          { name: "@staticmethod", description: "Method that does not receive self or cls — just lives in the class namespace." },
          { name: "@classmethod", description: "Receives the class as first arg (`cls`). Useful for alternative constructors." },
        ],
        syntax: [
          { rule: "Methods declared inside a class take `self` as the first parameter.", example: "def greet(self): ..." },
          { rule: "Class attributes are shared across instances; instance attributes live on `self`.", example: "class C:\n    kind = 'shared'\n    def __init__(self, n):\n        self.n = n" },
        ],
        pitfalls: [
          "Forgetting `self` in method signatures or when accessing attributes.",
          "Using a mutable class attribute as a 'default' for instance state — every instance ends up sharing the same list.",
          "Hiding bugs with multiple inheritance — keep hierarchies shallow.",
        ],
        whyItMatters:
          "Classes model the nouns of your domain. A good class hierarchy makes a codebase searchable, testable, and a joy to extend.",
      },
      {
        slug: "decorators",
        title: "Decorators",
        summary: "Functions that wrap functions — the heart of Python frameworks.",
        code: `from functools import wraps\nimport time\n\ndef timed(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        result = fn(*args, **kwargs)\n        print(f"{fn.__name__}: {time.perf_counter() - t0:.4f}s")\n        return result\n    return wrapper\n\n@timed\ndef slow():\n    time.sleep(0.5)`,
        body:
          "Decorators are syntactic sugar for `fn = decorator(fn)`. They power Flask routes, pytest fixtures, and every cache you've ever used.",
        sections: [
          {
            heading: "How the @ syntax works",
            body:
              "`@decorator` placed above a function definition is exactly equivalent to `func = decorator(func)`. The decorator is just a function that takes a function and returns a (usually wrapped) function.",
          },
          {
            heading: "Always use functools.wraps",
            body:
              "Without `@wraps(fn)` on the inner `wrapper`, your decorated function loses its name, docstring, and signature — every IDE and debugger gets confused. Make it muscle memory.",
          },
          {
            heading: "Built-in decorators worth memorising",
            body:
              "`@functools.lru_cache(maxsize=128)` memoises results. `@functools.cache` is the unlimited-size shortcut (3.9+). `@dataclass` from `dataclasses`. `@property`, `@staticmethod`, `@classmethod` are class-time decorators. `@contextlib.contextmanager` turns a generator into a context manager.",
          },
        ],
        keywords: [
          { name: "@", description: "Decorator syntax. Applies the function or class below to whatever follows the @." },
          { name: "functools.wraps", description: "Copies the wrapped function's metadata onto the wrapper. Use it ALWAYS." },
        ],
        syntax: [
          { rule: "A decorator can take arguments by being a function that RETURNS a decorator.", example: "@retry(times=3)\ndef fetch(): ..." },
        ],
        pitfalls: [
          "Forgetting @wraps breaks introspection and Flask URL routing.",
          "Decorating with side effects at import time — those run BEFORE main() does anything.",
        ],
        whyItMatters:
          "Half of every Python framework (Flask, FastAPI, Django REST, pytest, Celery) is decorators. Reading them fluently is non-negotiable.",
      },
      {
        slug: "iterators-generators",
        title: "Iterators & Generators",
        summary: "Lazy sequences that never blow your memory.",
        code: `def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfrom itertools import islice\nprint(list(islice(fibonacci(), 10)))`,
        body:
          "`yield` turns a function into a generator. Generators produce one value at a time — perfect for log streams, infinite series, and pipelines.",
        sections: [
          {
            heading: "The iterator protocol",
            body:
              "Any object with `__iter__()` returning an iterator, and `__next__()` returning the next value or raising `StopIteration`, is iterable. `for x in obj:` is sugar around this protocol.",
          },
          {
            heading: "Generators are iterators for free",
            body:
              "Any function containing `yield` becomes a generator function. Calling it returns a generator object — code starts executing only when you iterate. Each `yield` pauses execution and saves the state; the next call resumes from there. Use `yield from sub` to delegate to another iterator.",
          },
          {
            heading: "itertools — every loop you wish you didn't write",
            body:
              "`chain`, `cycle`, `islice`, `groupby`, `accumulate`, `permutations`, `combinations`, `product` cover most combinatorial needs. They are all lazy.",
            code: `from itertools import groupby\nfor key, group in groupby(sorted(rows), key=lambda r: r.status):\n    ...`,
          },
        ],
        keywords: [
          { name: "yield", description: "Suspends a generator and returns a value. The next next() call resumes after this yield." },
          { name: "yield from", description: "Delegates iteration to another iterable inside a generator." },
          { name: "next", description: "Built-in that pulls the next value from an iterator." },
          { name: "iter", description: "Built-in that returns an iterator from an iterable." },
          { name: "StopIteration", description: "Raised by an iterator to signal exhaustion. Generators raise it automatically when they return." },
        ],
        syntax: [
          { rule: "Generator expression: `(x*x for x in nums)` — like a list comprehension but lazy.", example: "sum(x*x for x in nums)" },
        ],
        pitfalls: [
          "A generator is single-use — once exhausted, iterating again yields nothing.",
          "Building a list from a huge generator (`list(gen)`) defeats the memory savings.",
        ],
        whyItMatters:
          "Generators let you process terabytes of data with megabytes of RAM. Every log shipper, ETL pipeline, and streaming API uses them.",
      },
      {
        slug: "errors",
        title: "Error Handling Done Right",
        summary: "try/except/else/finally — and custom exceptions.",
        code: `class PaymentError(Exception):\n    pass\n\ntry:\n    charge(user, amount)\nexcept PaymentError as e:\n    logger.warning("payment failed: %s", e)\nelse:\n    send_receipt(user)\nfinally:\n    close_connection()`,
        body:
          "Catch what you can handle. Re-raise what you can't. Custom exception hierarchies make your library a joy to use.",
        sections: [
          {
            heading: "The four clauses",
            body:
              "`try` wraps risky code. `except Type as e:` handles a matching exception — you can stack many. `else` runs only if NO exception was raised inside try. `finally` ALWAYS runs, even on return or unhandled exceptions — perfect for cleanup.",
          },
          {
            heading: "Exception hierarchy",
            body:
              "All exceptions inherit from `BaseException`. The user-relevant root is `Exception`. Catch `Exception` only at the program's outermost boundary. Catch specific subclasses (`ValueError`, `KeyError`, `FileNotFoundError`) where you actually know how to recover.",
          },
          {
            heading: "raise and re-raise",
            body:
              "`raise SomeError('detail')` throws a new exception. Bare `raise` inside an except clause re-raises the current one (preserves the traceback). `raise NewError(...) from e` chains the original cause, shown in the traceback as 'The above exception was the direct cause of...'.",
          },
        ],
        keywords: [
          { name: "try", description: "Starts a guarded block." },
          { name: "except", description: "Catches a matching exception type." },
          { name: "raise", description: "Throws an exception." },
          { name: "finally", description: "Runs after the try block no matter what — exceptions, returns, breaks." },
          { name: "assert", description: "Raises AssertionError if the expression is False. Stripped when Python is run with -O — never use for production validation." },
        ],
        syntax: [
          { rule: "Catch the narrowest exception you can actually handle.", example: "except KeyError:  # not except Exception:" },
        ],
        pitfalls: [
          "Bare `except:` catches even KeyboardInterrupt — almost always wrong.",
          "Swallowing exceptions silently (`except: pass`) hides bugs for months.",
        ],
        whyItMatters:
          "Production systems are defined by how they fail, not how they succeed. Clean error handling is the difference between a 2 a.m. pager and a calm Monday.",
      },
      {
        slug: "asyncio",
        title: "Asyncio Mastery",
        summary: "Concurrent I/O without threads.",
        code: `import asyncio, httpx\n\nasync def fetch(client, url):\n    r = await client.get(url)\n    return r.status_code\n\nasync def main():\n    async with httpx.AsyncClient() as client:\n        urls = ["https://example.com"] * 50\n        return await asyncio.gather(*[fetch(client, u) for u in urls])\n\nasyncio.run(main())`,
        body:
          "Async lets one thread juggle thousands of network calls. The event loop never blocks — your code awaits. Use `asyncio.gather` for parallelism.",
        sections: [
          {
            heading: "Coroutines, the event loop, and await",
            body:
              "An `async def` function returns a coroutine — a paused computation. The event loop schedules coroutines; each `await` is a point where the loop can switch to another ready coroutine. There is exactly ONE thread; concurrency comes from interleaving await points.",
          },
          {
            heading: "Running tasks in parallel",
            body:
              "`asyncio.gather(*coros)` schedules many coroutines and waits for all of them. `asyncio.create_task(coro)` starts one in the background. `asyncio.TaskGroup` (3.11+) is the safer modern alternative — cancels siblings on the first failure.",
          },
          {
            heading: "Don't mix blocking calls",
            body:
              "Calling `time.sleep(1)` inside a coroutine blocks the ENTIRE event loop. Use `await asyncio.sleep(1)`. For unavoidable blocking work (pandas, numpy, file CPU work) wrap it in `await asyncio.to_thread(blocking_fn, ...)`.",
          },
        ],
        keywords: [
          { name: "async def", description: "Defines a coroutine function." },
          { name: "await", description: "Yields control to the event loop until the awaited coroutine finishes." },
          { name: "async with", description: "Context manager whose enter/exit are coroutines." },
          { name: "async for", description: "Iterates over an asynchronous iterator." },
        ],
        syntax: [
          { rule: "You can only `await` inside an `async def` function.", example: "async def f(): await asyncio.sleep(0)" },
        ],
        pitfalls: [
          "Forgetting `await` — you get a coroutine object that never runs.",
          "Using requests/sleep/time/blocking DB drivers inside async code.",
        ],
        whyItMatters:
          "Modern APIs are I/O-bound. Async gives you 10× the throughput of threads with a tenth of the memory.",
      },
      {
        slug: "testing",
        title: "Unit Testing with pytest",
        summary: "Tests are documentation that runs.",
        code: `import pytest\nfrom shop import discount\n\n@pytest.mark.parametrize("price,rate,expected", [\n    (100, 0.1, 90.0),\n    (50, 0.0, 50.0),\n])\ndef test_discount(price, rate, expected):\n    assert discount(price, rate=rate) == expected`,
        body:
          "pytest finds tests, runs them, and reports failures in plain English. Parametrize to cover edge cases in one function.",
        sections: [
          {
            heading: "Conventions",
            body:
              "pytest discovers files named `test_*.py`, classes `Test*`, and functions `test_*`. Use plain `assert` — pytest rewrites it to show both sides on failure. Run with `pytest`, narrow with `pytest -k name`, run with verbose output via `-v`.",
          },
          {
            heading: "Fixtures",
            body:
              "Mark a function `@pytest.fixture` and request it by parameter name in a test — pytest constructs it, injects it, and tears it down. Scope it to function (default), module, or session for expensive setup.",
            code: `@pytest.fixture\ndef db():\n    conn = connect()\n    yield conn\n    conn.close()\n\ndef test_insert(db):\n    db.execute("...")`,
          },
          {
            heading: "Parametrize",
            body:
              "`@pytest.mark.parametrize('a,b', [...])` runs the same test once per row. Combined with `pytest.raises(SomeError)` you can pack happy + edge cases into a tight matrix.",
          },
        ],
        keywords: [
          { name: "pytest", description: "The de-facto Python test framework." },
          { name: "fixture", description: "Reusable setup/teardown for tests, injected by name." },
          { name: "parametrize", description: "Marker that runs the same test against multiple input rows." },
        ],
        syntax: [],
        pitfalls: [
          "Tests that depend on each other's order — keep each test independent.",
          "Mocking what you don't own — wrap external services in your own adapter, then mock the adapter.",
        ],
        whyItMatters:
          "Untested code is legacy the moment you write it. A good test suite lets you refactor fearlessly.",
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
        body:
          "FastAPI auto-generates OpenAPI docs, validates with Pydantic, and runs async out of the box. Production-grade in one file.",
        sections: [
          {
            heading: "The request lifecycle",
            body:
              "ASGI server (uvicorn / hypercorn) → FastAPI app → middleware → dependency resolution → path operation. Each step is typed; Pydantic validates the request body, query params, and path params automatically. Errors come back as structured 422 responses.",
          },
          {
            heading: "Dependency injection",
            body:
              "`Depends(get_db)` injects values into path functions. Stack them for auth → db → repository. Override them in tests for clean mocks.",
            code: `from fastapi import Depends\n\ndef get_user(token: str = Header(...)) -> User: ...\n\n@app.get("/me")\nasync def me(user: User = Depends(get_user)):\n    return user`,
          },
          {
            heading: "Background tasks and streaming",
            body:
              "`BackgroundTasks` runs work after the response is sent. `StreamingResponse(generator)` streams chunks — great for LLM token output or large CSV exports.",
          },
        ],
        keywords: [
          { name: "FastAPI", description: "The app/router class. Decorate functions with @app.get/post/etc." },
          { name: "Depends", description: "Marker that injects the result of a dependency function." },
          { name: "BaseModel", description: "Pydantic base class for typed request/response schemas." },
        ],
        syntax: [],
        pitfalls: [
          "Mixing sync DB drivers inside async path functions blocks the event loop.",
          "Returning ORM objects directly — use Pydantic `response_model` to control the wire shape.",
        ],
        whyItMatters:
          "FastAPI is the modern default for Python services — interview-ready, production-ready, and beginner-friendly.",
      },
      {
        slug: "sql",
        title: "Databases with SQLAlchemy",
        summary: "ORM done right — typed, async, and fast.",
        code: `from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\n\nclass Base(DeclarativeBase): pass\n\nclass User(Base):\n    __tablename__ = "users"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(unique=True)`,
        body:
          "SQLAlchemy 2.0's typed API gives you migrations, query building, and connection pooling. Master joins and you master data.",
        whyItMatters:
          "Every backend is a thin layer over a database. Knowing your ORM cold means you stop fighting it and start designing schemas.",
      },
      {
        slug: "docker",
        title: "Containerize Everything",
        summary: "Reproducible builds from your laptop to production.",
        code: `# Dockerfile\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`,
        body:
          "Docker freezes your environment. Multi-stage builds keep images small. Compose orchestrates services locally.",
        whyItMatters:
          "Containers turn 'works on my machine' into 'works everywhere'. Mandatory for any modern deployment.",
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
        body:
          "A trained model is just a function. Serialize with joblib, serve with FastAPI, monitor with Prometheus. That's MLOps in three steps.",
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
  explanation?: string;
};

export const problems: Problem[] = [
  // ---------- PATTERNS ----------
  {
    slug: "right-triangle",
    title: "Right Triangle Pattern",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a right-angled triangle of stars with N rows.",
    example: "N = 4 →\n*\n* *\n* * *\n* * * *",
    solution: `def triangle(n: int) -> None:\n    for i in range(1, n + 1):\n        print(" ".join("*" * i))\n\ntriangle(4)`,
    explanation:
      "We loop i from 1 to n. On row i we want i stars separated by spaces — `'*' * i` makes the run of stars and `' '.join(...)` inserts a space between every character. Time complexity O(n^2) characters printed.",
  },
  {
    slug: "inverted-triangle",
    title: "Inverted Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a right-aligned triangle that shrinks from N to 1 row.",
    example: "N = 4 →\n* * * *\n* * *\n* *\n*",
    solution: `def inv(n: int) -> None:\n    for i in range(n, 0, -1):\n        print(" ".join("*" * i))\n\ninv(4)`,
    explanation:
      "Same idea as the right triangle but iterate downward with `range(n, 0, -1)`. The third argument of range is the step.",
  },
  {
    slug: "pyramid",
    title: "Centered Pyramid",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a symmetric pyramid of stars with N rows.",
    example: "N = 4 →\n   *\n  ***\n *****\n*******",
    solution: `def pyramid(n: int) -> None:\n    for i in range(n):\n        print(" " * (n - i - 1) + "*" * (2 * i + 1))\n\npyramid(4)`,
    explanation:
      "Each row i (0-indexed) has `2*i+1` stars and is padded on the left by `n-i-1` spaces so the apex stays centered.",
  },
  {
    slug: "diamond",
    title: "Diamond Pattern",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a centered diamond of stars of height 2N-1.",
    example: "N = 3 →\n  *\n ***\n*****\n ***\n  *",
    solution: `def diamond(n: int) -> None:\n    for i in list(range(n)) + list(range(n - 2, -1, -1)):\n        print(" " * (n - i - 1) + "*" * (2 * i + 1))\n\ndiamond(3)`,
    explanation:
      "A diamond is an up-pyramid concatenated with an inverted pyramid that skips its first row. Concatenating two ranges builds the index list cleanly.",
  },
  {
    slug: "hollow-square",
    title: "Hollow Square",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print an N×N square whose interior is empty.",
    example: "N = 5 →\n* * * * *\n*       *\n*       *\n*       *\n* * * * *",
    solution: `def hollow(n: int) -> None:\n    for r in range(n):\n        row = []\n        for c in range(n):\n            row.append("*" if r in (0, n - 1) or c in (0, n - 1) else " ")\n        print(" ".join(row))\n\nhollow(5)`,
    explanation: "Print a star only on the border (first/last row or first/last column).",
  },
  {
    slug: "butterfly",
    title: "Butterfly Pattern",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a butterfly pattern of height 2N.",
    example: "N = 3 →\n*       *\n* *   * *\n* * * * *\n* * * * *\n* *   * *\n*       *",
    solution: `def butterfly(n: int) -> None:\n    for i in list(range(1, n + 1)) + list(range(n, 0, -1)):\n        left = "* " * i\n        mid = "  " * (2 * (n - i))\n        right = " *" * i\n        print(left + mid + right)\n\nbutterfly(3)`,
    explanation: "Two mirrored wings grow then shrink; the gap in the middle shrinks to nothing at the widest row.",
  },
  {
    slug: "number-triangle",
    title: "Number Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a triangle where row i contains the numbers 1..i.",
    example: "N = 4 →\n1\n1 2\n1 2 3\n1 2 3 4",
    solution: `def nums(n: int) -> None:\n    for i in range(1, n + 1):\n        print(" ".join(str(x) for x in range(1, i + 1)))\n\nnums(4)`,
    explanation: "Build each row with a generator expression and join with spaces.",
  },
  {
    slug: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Generate the first N rows of Pascal's triangle.",
    example: "N = 5 → [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    solution: `def pascal(n: int) -> list[list[int]]:\n    rows = [[1]]\n    for _ in range(n - 1):\n        prev = rows[-1]\n        rows.append([1, *[a + b for a, b in zip(prev, prev[1:])], 1])\n    return rows`,
    explanation: "Each interior cell is the sum of the two cells above it; `zip(prev, prev[1:])` pairs adjacent elements.",
  },
  {
    slug: "left-triangle",
    title: "Left-Aligned Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a left-aligned triangle of stars with N rows (no spaces).",
    example: "N = 4 →\n*\n**\n***\n****",
    solution: `def left(n: int) -> None:\n    for i in range(1, n + 1):\n        print("*" * i)\n\nleft(4)`,
    explanation: "String repetition with `*` builds each row in O(n).",
  },
  {
    slug: "mirrored-right-triangle",
    title: "Mirrored Right Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a right-aligned (mirrored) triangle of stars with N rows.",
    example: "N = 4 →\n   *\n  **\n ***\n****",
    solution: `def mirror(n: int) -> None:\n    for i in range(1, n + 1):\n        print(" " * (n - i) + "*" * i)\n\nmirror(4)`,
    explanation: "Pad each row on the left with `n - i` spaces so the stars line up on the right.",
  },
  {
    slug: "inverted-pyramid",
    title: "Inverted Pyramid",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a centered pyramid pointing downward.",
    example: "N = 4 →\n*******\n *****\n  ***\n   *",
    solution: `def inv_pyr(n: int) -> None:\n    for i in range(n, 0, -1):\n        print(" " * (n - i) + "*" * (2 * i - 1))\n\ninv_pyr(4)`,
    explanation: "Reverse the row counter and reuse the centered-pyramid formula.",
  },
  {
    slug: "hollow-pyramid",
    title: "Hollow Pyramid",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a centered pyramid whose interior is hollow.",
    example: "N = 5 →\n    *\n   * *\n  *   *\n *     *\n*********",
    solution: `def hollow_pyr(n: int) -> None:\n    for i in range(n):\n        if i == 0:\n            print(" " * (n - 1) + "*")\n        elif i == n - 1:\n            print("*" * (2 * n - 1))\n        else:\n            print(" " * (n - i - 1) + "*" + " " * (2 * i - 1) + "*")\n\nhollow_pyr(5)`,
    explanation: "Only the apex, base, and the two diagonal edges are drawn; everything else is a space.",
  },
  {
    slug: "hollow-diamond",
    title: "Hollow Diamond",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a hollow diamond of height 2N-1.",
    example: "N = 4 →\n   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *",
    solution: `def hd(n: int) -> None:\n    for i in list(range(n)) + list(range(n - 2, -1, -1)):\n        if i == 0:\n            print(" " * (n - 1) + "*")\n        else:\n            print(" " * (n - i - 1) + "*" + " " * (2 * i - 1) + "*")\n\nhd(4)`,
    explanation: "Use the diamond row sequence but draw only the edges (first/last char of each row).",
  },
  {
    slug: "solid-square",
    title: "Solid Square",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print an N×N solid square of stars.",
    example: "N = 4 →\n****\n****\n****\n****",
    solution: `def sq(n: int) -> None:\n    for _ in range(n):\n        print("*" * n)\n\nsq(4)`,
    explanation: "Print the same row of n stars n times.",
  },
  {
    slug: "rhombus",
    title: "Rhombus Pattern",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a slanted rhombus (parallelogram) of stars.",
    example: "N = 4 →\n   ****\n  ****\n ****\n****",
    solution: `def rhombus(n: int) -> None:\n    for i in range(n):\n        print(" " * (n - i - 1) + "*" * n)\n\nrhombus(4)`,
    explanation: "Same row width every line, but the leading padding decreases by one each row.",
  },
  {
    slug: "hollow-rhombus",
    title: "Hollow Rhombus",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a hollow rhombus of side N.",
    example: "N = 4 →\n   ****\n  *  *\n *  *\n****",
    solution: `def hr(n: int) -> None:\n    for i in range(n):\n        pad = " " * (n - i - 1)\n        if i == 0 or i == n - 1:\n            print(pad + "*" * n)\n        else:\n            print(pad + "*" + " " * (n - 2) + "*")\n\nhr(4)`,
    explanation: "Top and bottom rows are solid; middle rows only print the side edges.",
  },
  {
    slug: "right-pascal",
    title: "Right Pascal Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a right-pointing pascal (triangle that grows then shrinks).",
    example: "N = 4 →\n*\n**\n***\n****\n***\n**\n*",
    solution: `def rp(n: int) -> None:\n    for i in list(range(1, n + 1)) + list(range(n - 1, 0, -1)):\n        print("*" * i)\n\nrp(4)`,
    explanation: "Concatenate an ascending and descending range to drive the row widths.",
  },
  {
    slug: "left-pascal",
    title: "Left Pascal Triangle",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a left-pointing pascal triangle.",
    example: "N = 4 →\n   *\n  **\n ***\n****\n ***\n  **\n   *",
    solution: `def lp(n: int) -> None:\n    for i in list(range(1, n + 1)) + list(range(n - 1, 0, -1)):\n        print(" " * (n - i) + "*" * i)\n\nlp(4)`,
    explanation: "Add left padding to the right-pascal pattern so the stars align on the right edge.",
  },
  {
    slug: "sandglass",
    title: "Sandglass / Hourglass",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print an hourglass of height 2N-1 stars.",
    example: "N = 4 →\n*******\n *****\n  ***\n   *\n  ***\n *****\n*******",
    solution: `def hg(n: int) -> None:\n    for i in list(range(n, 0, -1)) + list(range(2, n + 1)):\n        print(" " * (n - i) + "*" * (2 * i - 1))\n\nhg(4)`,
    explanation: "An inverted pyramid stacked on top of a regular pyramid (skipping the duplicate middle row).",
  },
  {
    slug: "x-pattern",
    title: "X Pattern",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print an X made of stars inside an N×N grid (N should be odd).",
    example: "N = 5 →\n*   *\n * * \n  *  \n * * \n*   *",
    solution: `def x(n: int) -> None:\n    for r in range(n):\n        row = ["*" if c == r or c == n - 1 - r else " " for c in range(n)]\n        print("".join(row))\n\nx(5)`,
    explanation: "Stars sit on the two diagonals: `c == r` and `c == n-1-r`.",
  },
  {
    slug: "plus-pattern",
    title: "Plus Pattern",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a plus sign inside an N×N grid (N odd).",
    example: "N = 5 →\n  *  \n  *  \n*****\n  *  \n  *  ",
    solution: `def plus(n: int) -> None:\n    mid = n // 2\n    for r in range(n):\n        row = ["*" if r == mid or c == mid else " " for c in range(n)]\n        print("".join(row))\n\nplus(5)`,
    explanation: "Stars are on the middle row or middle column.",
  },
  {
    slug: "arrow-pattern",
    title: "Right Arrow",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a right-pointing arrow built from two mirrored triangles.",
    example: "N = 4 →\n*\n**\n***\n****\n***\n**\n*",
    solution: `def arrow(n: int) -> None:\n    for i in list(range(1, n + 1)) + list(range(n - 1, 0, -1)):\n        print("*" * i)\n\narrow(4)`,
    explanation: "Same as right-pascal — included as a labelled arrow for completeness.",
  },
  {
    slug: "number-pyramid",
    title: "Number Pyramid",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a centered pyramid where each row repeats the row number.",
    example: "N = 4 →\n   1\n  222\n 33333\n4444444",
    solution: `def np_(n: int) -> None:\n    for i in range(1, n + 1):\n        print(" " * (n - i) + str(i) * (2 * i - 1))\n\nnp_(4)`,
    explanation: "Use `str(i) * (2i-1)` to repeat the digit across the row.",
  },
  {
    slug: "floyds-triangle",
    title: "Floyd's Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print Floyd's triangle: consecutive integers laid out in a left-aligned triangle.",
    example: "N = 4 →\n1\n2 3\n4 5 6\n7 8 9 10",
    solution: `def floyd(n: int) -> None:\n    k = 1\n    for i in range(1, n + 1):\n        print(" ".join(str(k + j) for j in range(i)))\n        k += i\n\nfloyd(4)`,
    explanation: "Keep a running counter `k`; row `i` prints `i` consecutive values starting from `k`.",
  },
  {
    slug: "binary-triangle",
    title: "0/1 Binary Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a triangle of 0s and 1s alternating by (row+col)%2.",
    example: "N = 4 →\n1\n0 1\n1 0 1\n0 1 0 1",
    solution: `def bt(n: int) -> None:\n    for i in range(n):\n        print(" ".join(str((i + j) % 2) for j in range(i + 1)))\n\nbt(4)`,
    explanation: "Alternating values are produced by `(i + j) % 2`.",
  },
  {
    slug: "palindrome-pyramid",
    title: "Palindrome Number Pyramid",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a pyramid where each row reads as a palindrome 1..i..1.",
    example: "N = 4 →\n      1\n    1 2 1\n  1 2 3 2 1\n1 2 3 4 3 2 1",
    solution: `def pp(n: int) -> None:\n    for i in range(1, n + 1):\n        nums = list(range(1, i + 1)) + list(range(i - 1, 0, -1))\n        print("  " * (n - i) + " ".join(str(x) for x in nums))\n\npp(4)`,
    explanation: "Build each row as the concatenation of ascending and descending ranges.",
  },
  {
    slug: "alphabet-triangle",
    title: "Alphabet Triangle",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print a triangle of letters where each row starts with A.",
    example: "N = 4 →\nA\nA B\nA B C\nA B C D",
    solution: `def at(n: int) -> None:\n    for i in range(1, n + 1):\n        print(" ".join(chr(65 + j) for j in range(i)))\n\nat(4)`,
    explanation: "`chr(65)` is 'A'; offset by `j` to walk the alphabet.",
  },
  {
    slug: "alphabet-pyramid",
    title: "Alphabet Pyramid",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print a centered pyramid of letters where row i contains the first i letters.",
    example: "N = 4 →\n      A\n    A B A\n  A B C B A\nA B C D C B A",
    solution: `def ap(n: int) -> None:\n    for i in range(1, n + 1):\n        chars = [chr(65 + j) for j in range(i)] + [chr(65 + j) for j in range(i - 2, -1, -1)]\n        print("  " * (n - i) + " ".join(chars))\n\nap(4)`,
    explanation: "Palindromic letter row plus centering pad.",
  },
  {
    slug: "diagonal-numbers",
    title: "Diagonal Number Square",
    difficulty: "Medium",
    category: "Patterns",
    prompt: "Print an N×N grid where the main diagonal holds 1 and the rest is 0.",
    example: "N = 4 →\n1 0 0 0\n0 1 0 0\n0 0 1 0\n0 0 0 1",
    solution: `def diag(n: int) -> None:\n    for r in range(n):\n        print(" ".join("1" if r == c else "0" for c in range(n)))\n\ndiag(4)`,
    explanation: "Identity matrix pattern — `1` when row equals column.",
  },
  {
    slug: "checkerboard",
    title: "Checkerboard Pattern",
    difficulty: "Easy",
    category: "Patterns",
    prompt: "Print an N×N checkerboard of '#' and '.'.",
    example: "N = 4 →\n# . # .\n. # . #\n# . # .\n. # . #",
    solution: `def cb(n: int) -> None:\n    for r in range(n):\n        print(" ".join("#" if (r + c) % 2 == 0 else "." for c in range(n)))\n\ncb(4)`,
    explanation: "Toggle the cell glyph based on parity of `(row + col)`.",
  },
  {
    slug: "zigzag-pattern",
    title: "Zig-Zag Pattern",
    difficulty: "Hard",
    category: "Patterns",
    prompt: "Print a zig-zag wave of stars across 3 rows and N columns.",
    example: "N = 9 →\n*   *   *\n* * * * *\n  *   *  ",
    solution: `def zz(n: int) -> None:\n    rows = [[" "] * n for _ in range(3)]\n    for c in range(n):\n        if c % 4 == 0 or c % 4 == 2:\n            rows[1][c] = "*"\n        elif c % 4 == 1:\n            rows[0][c] = "*"\n        else:\n            rows[2][c] = "*"\n    for row in rows:\n        print("".join(row))\n\nzz(9)`,
    explanation: "Cycle through 4 column phases that paint the wave: middle, top, middle, bottom.",
  },
  {
    slug: "heart-pattern",
    title: "Heart Pattern",
    difficulty: "Hard",
    category: "Patterns",
    prompt: "Print a stylised heart of stars using the implicit-equation trick.",
    example: "Outputs a heart shape made of stars.",
    solution: `def heart() -> None:\n    for y in range(15, -15, -1):\n        line = ""\n        for x in range(-30, 30):\n            xf, yf = x * 0.05, y * 0.1\n            v = (xf*xf + yf*yf - 1) ** 3 - xf*xf * yf*yf*yf\n            line += "*" if v <= 0 else " "\n        print(line)\n\nheart()`,
    explanation: "Evaluate the heart curve `(x²+y²-1)³ - x²y³ ≤ 0` over a grid and print a star where the inequality holds.",
  },
  {
    slug: "spiral-number-matrix",
    title: "Spiral Number Matrix",
    difficulty: "Hard",
    category: "Patterns",
    prompt: "Fill an N×N matrix with 1..N*N spiraling clockwise from the top-left.",
    example: "N = 3 →\n1 2 3\n8 9 4\n7 6 5",
    solution: `def spiral_fill(n: int) -> None:\n    g = [[0] * n for _ in range(n)]\n    dirs = [(0,1),(1,0),(0,-1),(-1,0)]\n    r=c=di=0\n    for k in range(1, n*n + 1):\n        g[r][c] = k\n        nr, nc = r + dirs[di][0], c + dirs[di][1]\n        if not (0 <= nr < n and 0 <= nc < n) or g[nr][nc]:\n            di = (di + 1) % 4\n            nr, nc = r + dirs[di][0], c + dirs[di][1]\n        r, c = nr, nc\n    for row in g:\n        print(" ".join(f"{v:2}" for v in row))\n\nspiral_fill(3)`,
    explanation: "Walk in the current direction until you'd leave the grid or hit a filled cell, then turn right.",
  },

  // ---------- ARRAYS / DSA ----------
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    prompt: "Given an array and a target, return indices of two numbers that add to target.",
    example: "[2,7,11,15], target=9 → [0,1]",
    solution: `def two_sum(nums: list[int], target: int) -> list[int]:\n    seen: dict[int, int] = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []`,
    explanation: "One pass with a hash map: for each n we check if its complement was already seen. O(n) time, O(n) space.",
  },
  {
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Hard",
    category: "Matrix",
    prompt: "Return all elements of an m×n matrix in spiral order.",
    example: "[[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]",
    solution: `def spiral(m: list[list[int]]) -> list[int]:\n    out = []\n    while m:\n        out += m.pop(0)\n        m = list(zip(*m))[::-1]\n    return out`,
    explanation:
      "Repeatedly take the top row then rotate the remaining matrix 90° counter-clockwise. `zip(*m)` is the classic transpose trick.",
  },
  {
    slug: "prime-sieve",
    title: "Sieve of Eratosthenes",
    difficulty: "Medium",
    category: "Math",
    prompt: "Return all primes below N.",
    example: "N = 30 → [2,3,5,7,11,13,17,19,23,29]",
    solution: `def sieve(n: int) -> list[int]:\n    flags = [True] * n\n    flags[:2] = [False, False]\n    for i in range(2, int(n ** 0.5) + 1):\n        if flags[i]:\n            flags[i*i::i] = [False] * len(flags[i*i::i])\n    return [i for i, p in enumerate(flags) if p]`,
    explanation: "Cross out multiples of each prime starting at i*i. Slice assignment is a single C-level loop — very fast.",
  },
  {
    slug: "balanced-parens",
    title: "Balanced Parentheses",
    difficulty: "Medium",
    category: "Stacks",
    prompt: "Determine if a string of brackets is well-formed.",
    example: "'({[]})' → True, '([)]' → False",
    solution: `def balanced(s: str) -> bool:\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack: list[str] = []\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return not stack`,
    explanation: "Push openers, pop on closers. If the popped opener does not match the expected pair, the string is unbalanced.",
  },
  {
    slug: "fibonacci-memo",
    title: "Memoized Fibonacci",
    difficulty: "Easy",
    category: "DP",
    prompt: "Compute the nth Fibonacci number in O(N) time.",
    example: "n=10 → 55",
    solution: `from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)`,
    explanation: "Memoisation turns a 2^n recursion into n unique subproblems. lru_cache is the one-line solution.",
  },
  {
    slug: "anagram-groups",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Hashing",
    prompt: "Group a list of strings so that anagrams are together.",
    example: "['eat','tea','tan','ate','nat','bat'] → [['eat','tea','ate'],['tan','nat'],['bat']]",
    solution: `from collections import defaultdict\n\ndef groups(words: list[str]) -> list[list[str]]:\n    bucket: dict[str, list[str]] = defaultdict(list)\n    for w in words:\n        bucket["".join(sorted(w))].append(w)\n    return list(bucket.values())`,
    explanation: "Two words are anagrams iff their sorted letters are equal — use that sorted string as a bucket key.",
  },
  {
    slug: "lru-cache",
    title: "Design an LRU Cache",
    difficulty: "Hard",
    category: "Design",
    prompt: "Implement a fixed-capacity LRU cache with O(1) get and put.",
    example: "capacity=2; put(1,1); put(2,2); get(1) → 1; put(3,3) evicts 2",
    solution: `from collections import OrderedDict\n\nclass LRU:\n    def __init__(self, cap: int):\n        self.cap, self.data = cap, OrderedDict()\n    def get(self, k):\n        if k not in self.data: return -1\n        self.data.move_to_end(k); return self.data[k]\n    def put(self, k, v):\n        if k in self.data: self.data.move_to_end(k)\n        self.data[k] = v\n        if len(self.data) > self.cap: self.data.popitem(last=False)`,
    explanation: "OrderedDict is a hashmap+doubly-linked-list. move_to_end / popitem(last=False) give O(1) LRU operations.",
  },
  {
    slug: "topological-sort",
    title: "Topological Sort",
    difficulty: "Expert",
    category: "Graphs",
    prompt: "Order tasks given prerequisite edges, or detect a cycle.",
    example: "edges=[(1,2),(2,3)] → [1,2,3]",
    solution: `from collections import defaultdict, deque\n\ndef toposort(n: int, edges: list[tuple[int,int]]) -> list[int]:\n    g = defaultdict(list); indeg = [0]*n\n    for u, v in edges: g[u].append(v); indeg[v] += 1\n    q = deque(i for i in range(n) if indeg[i] == 0)\n    out = []\n    while q:\n        u = q.popleft(); out.append(u)\n        for v in g[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0: q.append(v)\n    return out if len(out) == n else []`,
    explanation: "Kahn's algorithm: repeatedly remove a node with in-degree 0. If we cannot remove all nodes, there is a cycle.",
  },
  {
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Expert",
    category: "BFS",
    prompt: "Find shortest transformation length from begin to end, changing one letter at a time.",
    example: "'hit' → 'cog' via ['hot','dot','dog','cog'] → 5",
    solution: `from collections import deque\n\ndef ladder(begin: str, end: str, words: set[str]) -> int:\n    if end not in words: return 0\n    q = deque([(begin, 1)])\n    while q:\n        w, d = q.popleft()\n        if w == end: return d\n        for i in range(len(w)):\n            for c in "abcdefghijklmnopqrstuvwxyz":\n                nxt = w[:i] + c + w[i+1:]\n                if nxt in words:\n                    words.remove(nxt); q.append((nxt, d + 1))\n    return 0`,
    explanation: "BFS on a graph where edges connect words differing by one letter. Remove visited words to avoid revisits.",
  },

  // ---------- GAMES ----------
  {
    slug: "number-guessing",
    title: "Number Guessing Game",
    difficulty: "Easy",
    category: "Games",
    prompt: "The computer picks a random number from 1-100. The player keeps guessing; respond 'higher', 'lower', or 'correct'.",
    example: "Secret = 42. Guess 50 → lower. Guess 25 → higher. Guess 42 → correct in 3 tries.",
    solution: `import random\n\ndef play() -> None:\n    secret = random.randint(1, 100)\n    tries = 0\n    while True:\n        tries += 1\n        guess = int(input("Guess (1-100): "))\n        if guess == secret:\n            print(f"Correct in {tries} tries!"); return\n        print("higher" if guess < secret else "lower")\n\nif __name__ == "__main__":\n    play()`,
    explanation: "Showcases `random.randint`, an input loop, and break-via-return. Optimal strategy uses binary search (≤7 guesses).",
  },
  {
    slug: "rock-paper-scissors",
    title: "Rock, Paper, Scissors",
    difficulty: "Easy",
    category: "Games",
    prompt: "Play best-of-five against the computer.",
    example: "You: rock, CPU: scissors → win. First to 3 wins the match.",
    solution: `import random\n\nMOVES = ("rock", "paper", "scissors")\nBEATS = {"rock": "scissors", "paper": "rock", "scissors": "paper"}\n\ndef round_result(you: str, cpu: str) -> str:\n    if you == cpu: return "tie"\n    return "win" if BEATS[you] == cpu else "lose"\n\ndef play(best_of: int = 5) -> None:\n    needed = best_of // 2 + 1\n    you = cpu = 0\n    while you < needed and cpu < needed:\n        move = input("rock / paper / scissors: ").strip().lower()\n        if move not in MOVES: continue\n        cpu_move = random.choice(MOVES)\n        r = round_result(move, cpu_move)\n        print(f"CPU: {cpu_move} — {r}")\n        if r == "win": you += 1\n        elif r == "lose": cpu += 1\n    print("YOU WIN" if you > cpu else "CPU WINS")\n\nplay()`,
    explanation: "Dictionary `BEATS` encodes the rules in one line — no nested if/else. The match loop ends when either side reaches the threshold.",
  },
  {
    slug: "hangman",
    title: "Hangman",
    difficulty: "Medium",
    category: "Games",
    prompt: "Pick a hidden word. The player guesses letters, with 6 lives. Reveal correctly guessed letters in place.",
    example: "Word = 'python'. Guess 'p' → p_____. Guess 'z' → 5 lives left.",
    solution: `import random\n\nWORDS = ["python", "kernel", "compiler", "decorator", "iterator"]\n\ndef play() -> None:\n    word = random.choice(WORDS)\n    guessed: set[str] = set()\n    lives = 6\n    while lives > 0:\n        shown = "".join(c if c in guessed else "_" for c in word)\n        print(shown, f"({lives} lives)")\n        if "_" not in shown:\n            print("YOU WIN"); return\n        g = input("letter: ").lower().strip()\n        if len(g) != 1 or not g.isalpha(): continue\n        if g in guessed: continue\n        guessed.add(g)\n        if g not in word:\n            lives -= 1\n    print(f"GAME OVER. word was: {word}")\n\nplay()`,
    explanation: "Sets give O(1) 'already guessed?' checks. Generator expression builds the masked word in a single pass.",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe (CLI)",
    difficulty: "Medium",
    category: "Games",
    prompt: "Two-player tic-tac-toe in the terminal. Detect win or draw.",
    example: "Board:\nX | O | X\n---------\n  | X | O\n---------\nO |   | X\nX wins on the diagonal.",
    solution: `LINES = [\n    (0, 1, 2), (3, 4, 5), (6, 7, 8),  # rows\n    (0, 3, 6), (1, 4, 7), (2, 5, 8),  # cols\n    (0, 4, 8), (2, 4, 6),             # diagonals\n]\n\ndef winner(b: list[str]) -> str | None:\n    for a, c, d in LINES:\n        if b[a] != " " and b[a] == b[c] == b[d]:\n            return b[a]\n    return None\n\ndef show(b: list[str]) -> None:\n    for i in range(0, 9, 3):\n        print(" | ".join(b[i:i+3]))\n        if i < 6: print("---------")\n\ndef play() -> None:\n    board = [" "] * 9\n    turn = "X"\n    for _ in range(9):\n        show(board)\n        pos = int(input(f"{turn} pos (0-8): "))\n        if board[pos] != " ": continue\n        board[pos] = turn\n        w = winner(board)\n        if w: show(board); print(f"{w} WINS"); return\n        turn = "O" if turn == "X" else "X"\n    show(board); print("DRAW")\n\nplay()`,
    explanation: "Encode all eight winning lines once and check them after every move. The board is a flat list of 9 cells — simple and fast.",
  },
  {
    slug: "snake-logic",
    title: "Snake Game Logic",
    difficulty: "Hard",
    category: "Games",
    prompt: "Implement the pure logic of Snake: the snake grows on food, dies on wall or self collision.",
    example: "Grid 10x10. Snake starts at (5,5). Direction RIGHT. Step → head moves to (6,5). Eats food → length += 1.",
    solution: `from collections import deque\nimport random\n\nclass Snake:\n    def __init__(self, w=10, h=10):\n        self.w, self.h = w, h\n        self.body = deque([(w // 2, h // 2)])\n        self.dir = (1, 0)\n        self.food = self._spawn_food()\n        self.alive = True\n    def _spawn_food(self):\n        while True:\n            f = (random.randrange(self.w), random.randrange(self.h))\n            if f not in self.body: return f\n    def turn(self, d):\n        # cannot reverse onto self\n        if (d[0] + self.dir[0], d[1] + self.dir[1]) != (0, 0):\n            self.dir = d\n    def step(self):\n        hx, hy = self.body[-1]\n        nx, ny = hx + self.dir[0], hy + self.dir[1]\n        if not (0 <= nx < self.w and 0 <= ny < self.h):\n            self.alive = False; return\n        if (nx, ny) in self.body and (nx, ny) != self.body[0]:\n            self.alive = False; return\n        self.body.append((nx, ny))\n        if (nx, ny) == self.food:\n            self.food = self._spawn_food()\n        else:\n            self.body.popleft()`,
    explanation:
      "A `deque` makes head-append and tail-pop both O(1). Growth is just 'skip the pop'. Wrap this class with pygame or curses to render frames.",
  },
];

// ---------- PYTHON REFERENCE ----------

export type ReferenceEntry = { name: string; description: string; example?: string };
export type ReferenceCategory = { id: string; title: string; intro: string; entries: ReferenceEntry[] };

export const pythonReference: ReferenceCategory[] = [
  {
    id: "keywords",
    title: "All 35 Python Keywords",
    intro:
      "Reserved words that cannot be used as variable names. Every Python program is built from these.",
    entries: [
      { name: "False", description: "The boolean false value. Same object as bool(0)." },
      { name: "None", description: "The unique sentinel that means 'no value'. Use `is None` to test for it." },
      { name: "True", description: "The boolean true value." },
      { name: "and", description: "Short-circuit logical AND. Returns the first falsy operand or the last value.", example: "x and y" },
      { name: "as", description: "Aliases an import, with-statement target, or exception variable.", example: "import numpy as np" },
      { name: "assert", description: "Raises AssertionError if the expression is False. Disabled with the -O flag.", example: "assert x > 0, 'must be positive'" },
      { name: "async", description: "Marks a coroutine function or async context manager / iterator." },
      { name: "await", description: "Pauses a coroutine until the awaited awaitable resolves." },
      { name: "break", description: "Exits the innermost loop." },
      { name: "class", description: "Defines a new class." },
      { name: "continue", description: "Skips to the next iteration of the innermost loop." },
      { name: "def", description: "Defines a function or method." },
      { name: "del", description: "Deletes a name binding or container item." },
      { name: "elif", description: "Else-if branch of an if statement." },
      { name: "else", description: "The fallback branch of if, for, while, try." },
      { name: "except", description: "Catches a matching exception in a try statement." },
      { name: "finally", description: "A try-block clause that always runs on exit." },
      { name: "for", description: "Iterates over an iterable." },
      { name: "from", description: "Used in `from module import name` and `yield from iterable`." },
      { name: "global", description: "Declares names that refer to module-level variables." },
      { name: "if", description: "Conditional branch." },
      { name: "import", description: "Imports a module or package." },
      { name: "in", description: "Membership test or part of a for-loop header." },
      { name: "is", description: "Identity test — True if both operands are the same object." },
      { name: "lambda", description: "Anonymous single-expression function." },
      { name: "nonlocal", description: "Binds a name to the nearest enclosing function scope." },
      { name: "not", description: "Logical negation." },
      { name: "or", description: "Short-circuit logical OR. Returns the first truthy operand or the last value." },
      { name: "pass", description: "Do-nothing statement; placeholder where a statement is required." },
      { name: "raise", description: "Throws an exception." },
      { name: "return", description: "Exits a function, optionally returning a value." },
      { name: "try", description: "Starts a guarded block." },
      { name: "while", description: "Loops while a condition is truthy." },
      { name: "with", description: "Runs a block within a context manager that handles setup/teardown." },
      { name: "yield", description: "Pauses a generator and emits a value." },
    ],
  },
  {
    id: "builtins",
    title: "Essential Built-in Functions",
    intro: "Available without any import. Memorising these is half of writing idiomatic Python.",
    entries: [
      { name: "print(*objs, sep=' ', end='\\n')", description: "Write objects to stdout." },
      { name: "len(x)", description: "Number of items in a container." },
      { name: "range(start, stop, step)", description: "Lazy integer sequence — half-open: stop is excluded." },
      { name: "enumerate(iter, start=0)", description: "Yields (index, value) pairs." },
      { name: "zip(*iters)", description: "Yields tuples taken in parallel from each iterable. Stops at the shortest." },
      { name: "map(fn, iter)", description: "Lazy fn(x) for x in iter. Often a list-comp is clearer." },
      { name: "filter(pred, iter)", description: "Lazy elements where pred(x) is truthy." },
      { name: "sorted(iter, key=None, reverse=False)", description: "Returns a NEW sorted list." },
      { name: "reversed(seq)", description: "Returns an iterator over seq in reverse." },
      { name: "sum(iter, start=0)", description: "Sum of numbers." },
      { name: "min / max(iter, key=...)", description: "Smallest / largest item." },
      { name: "any(iter) / all(iter)", description: "Short-circuit OR / AND across an iterable of booleans." },
      { name: "abs(x)", description: "Absolute value." },
      { name: "round(x, ndigits=0)", description: "Banker's-rounding to ndigits decimal places." },
      { name: "isinstance(x, type)", description: "True if x is an instance of type (or its subclass)." },
      { name: "type(x)", description: "The class of x. Use isinstance for type checks." },
      { name: "hasattr / getattr / setattr", description: "Introspect or set attributes by name string." },
      { name: "open(path, mode='r', encoding=None)", description: "Returns a file object — wrap in `with`." },
      { name: "input(prompt='')", description: "Read one line from stdin as a string." },
      { name: "str / int / float / bool / list / tuple / dict / set", description: "Type constructors and converters." },
    ],
  },
  {
    id: "stdlib",
    title: "Standard Library Highlights",
    intro:
      "Ship with Python — no pip install needed. Reach for these before searching for a third-party package.",
    entries: [
      { name: "os", description: "OS interfaces: environment variables, paths, processes. Use `os.environ['KEY']`." },
      { name: "sys", description: "Interpreter introspection: sys.argv, sys.exit(), sys.path." },
      { name: "pathlib", description: "Object-oriented filesystem paths. Replace os.path." },
      { name: "json", description: "Parse and serialise JSON. `json.loads` / `json.dumps`." },
      { name: "csv", description: "Read and write CSV files. `csv.DictReader` for typed rows." },
      { name: "re", description: "Regular expressions. `re.search`, `re.findall`, `re.sub`." },
      { name: "datetime", description: "Dates, times, and timezone-aware timestamps." },
      { name: "math", description: "Math functions: sqrt, log, sin, pi." },
      { name: "random", description: "Pseudo-random numbers, choices, shuffles." },
      { name: "statistics", description: "Mean, median, stdev — no numpy needed for basics." },
      { name: "collections", description: "Counter, defaultdict, deque, namedtuple, OrderedDict." },
      { name: "itertools", description: "Lazy combinators: chain, islice, groupby, product, permutations." },
      { name: "functools", description: "lru_cache, cache, reduce, partial, wraps." },
      { name: "dataclasses", description: "Boilerplate-free classes from type annotations." },
      { name: "typing", description: "Type hints: List, Dict, Optional, Callable, TypedDict." },
      { name: "asyncio", description: "Concurrent I/O with coroutines and the event loop." },
      { name: "subprocess", description: "Run external programs. Use `subprocess.run(..., check=True)`." },
      { name: "logging", description: "Structured, level-based logging. Beats print() for real apps." },
      { name: "argparse", description: "Build CLI tools with auto-generated --help." },
      { name: "unittest", description: "Stdlib test framework. pytest is the modern alternative." },
      { name: "sqlite3", description: "Embedded SQL database, no install required." },
      { name: "http.client / urllib", description: "Built-in HTTP — but most apps use httpx or requests." },
      { name: "concurrent.futures", description: "Thread and process pools with a clean Future API." },
      { name: "contextlib", description: "Tools for writing context managers: contextmanager, ExitStack, suppress." },
      { name: "decimal", description: "Exact decimal arithmetic — use for money instead of float." },
      { name: "hashlib", description: "Cryptographic hashes: sha256, md5, blake2." },
      { name: "secrets", description: "Cryptographically secure tokens and random values." },
      { name: "uuid", description: "Generate UUIDs. `uuid4()` for random IDs." },
    ],
  },
  {
    id: "third-party",
    title: "Must-know Third-Party Libraries",
    intro:
      "Install with `pip install <name>`. These are the libraries that show up in nearly every modern Python codebase.",
    entries: [
      { name: "requests / httpx", description: "Friendly HTTP clients. httpx adds async + HTTP/2." },
      { name: "pydantic", description: "Typed data validation. Powers FastAPI request/response models." },
      { name: "fastapi", description: "Async web framework with automatic OpenAPI docs." },
      { name: "flask", description: "Minimal sync web framework — great for small APIs and prototypes." },
      { name: "django", description: "Batteries-included web framework: ORM, admin, auth, migrations." },
      { name: "sqlalchemy", description: "The Python ORM. Typed 2.0 API + raw SQL escape hatch." },
      { name: "alembic", description: "Schema migrations for SQLAlchemy." },
      { name: "numpy", description: "N-dimensional array math at C speed." },
      { name: "pandas", description: "Tabular data analysis — DataFrames, groupby, merge." },
      { name: "polars", description: "Modern, multi-threaded DataFrame library; often 10× faster than pandas." },
      { name: "matplotlib / seaborn / plotly", description: "Static and interactive plotting." },
      { name: "scikit-learn", description: "Classical ML: regression, classification, clustering." },
      { name: "pytorch / tensorflow", description: "Deep learning frameworks." },
      { name: "transformers", description: "Hugging Face — state-of-the-art NLP / LLM models." },
      { name: "openai / anthropic", description: "Official SDKs for LLM APIs." },
      { name: "beautifulsoup4", description: "HTML parsing for web scraping." },
      { name: "lxml", description: "Fast XML / HTML parser with XPath." },
      { name: "pillow", description: "Image read / write / transform (the modern PIL fork)." },
      { name: "rich", description: "Beautiful terminal output: tables, syntax highlight, progress bars." },
      { name: "typer / click", description: "Build expressive CLIs with type hints." },
      { name: "celery", description: "Distributed task queue with Redis or RabbitMQ broker." },
      { name: "redis", description: "Client for the Redis in-memory data store." },
      { name: "boto3", description: "AWS SDK for Python." },
      { name: "playwright / selenium", description: "Browser automation and E2E testing." },
      { name: "pytest", description: "The de-facto test framework." },
      { name: "black / ruff", description: "Formatter (black) and ultra-fast linter (ruff)." },
      { name: "mypy / pyright", description: "Static type checkers." },
      { name: "uvicorn / hypercorn", description: "ASGI servers used to run FastAPI / Starlette apps." },
    ],
  },
  {
    id: "operators",
    title: "Operators & Syntax Cheatsheet",
    intro: "Every symbol that does something in Python source.",
    entries: [
      { name: "+  -  *  /  //  %  **", description: "Add, subtract, multiply, true-divide, floor-divide, modulo, power." },
      { name: "==  !=  <  <=  >  >=", description: "Comparison. Chainable: `a < b < c`." },
      { name: "and  or  not", description: "Short-circuit logical operators." },
      { name: "is  is not", description: "Identity (same object)." },
      { name: "in  not in", description: "Membership test." },
      { name: "&  |  ^  ~  <<  >>", description: "Bitwise AND, OR, XOR, NOT, shift left/right. Also set ops for sets." },
      { name: "=  +=  -=  *=  /=  //=  **=  %=", description: "Assignment and compound assignment." },
      { name: ":=", description: "Walrus — assignment inside an expression (3.8+)." },
      { name: "->", description: "Function return-type annotation." },
      { name: "@", description: "Decorator marker / matrix-multiply operator (numpy)." },
      { name: "*  **", description: "Unpacking in calls and signatures: *args / **kwargs." },
      { name: "f'...'", description: "Formatted string literal. `f'{name=}'` shows name and value (3.8+)." },
    ],
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
