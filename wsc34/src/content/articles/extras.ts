import type { Article } from '../types'

/* ================================================================== */
/*  EXTRAS ARTICLES                                                    */
/*  Projects, experiments, recommendations and reflections.            */
/*  Demonstration articles: edit, replace or delete freely.            */
/* ================================================================== */

export const extrasArticles: Article[] = [
  {
    collection: 'extras',
    slug: 'a-tiny-interpreter-in-a-weekend',
    title: 'Building a tiny interpreter in a weekend',
    excerpt:
      'Notes from writing a calculator language from scratch: tokenising, parsing, and the moment the first expression evaluated correctly.',
    category: 'Project',
    date: '2026-10-20',
    image: '/images/articles/interpreter.svg',
    imageAlt: 'A parse tree branching from a single expression',
    featured: true,
    readingMinutes: 9,
    body: `
*This is a demonstration post. Replace it with your own writing.*

Every programming language you use was, at some point, just text that another program read. Writing a tiny interpreter is one of the best ways to understand what happens between typing code and seeing a result.

## Three stages

1. **Tokenise:** split \`2 * (3 + 4)\` into numbers, operators and brackets.
2. **Parse:** arrange the tokens into a tree that respects precedence.
3. **Evaluate:** walk the tree, computing each branch.

\`\`\`python
def evaluate(node):
    if node.kind == "number":
        return node.value
    left, right = evaluate(node.left), evaluate(node.right)
    return {"+": left + right, "*": left * right}[node.op]
\`\`\`

## What I would do next

Add variables, then functions, and suddenly the calculator is a language.
`,
  },
  {
    collection: 'extras',
    slug: 'a-reading-list-for-curious-programmers',
    title: 'A reading list for curious programmers',
    excerpt:
      'Books, essays and talks that changed how I think about code. Some technical, some not, all worth your time.',
    category: 'Recommendations',
    date: '2026-09-05',
    image: '/images/articles/reading-list.svg',
    imageAlt: 'A neat stack of books drawn in outline',
    readingMinutes: 4,
    body: `
*This is a demonstration post. Replace it with your own recommendations.*

## How to use this list

Pick one item, read it slowly, and try to explain the main idea to someone else.

## Categories to fill in

- **Foundations:** a book on algorithms you would recommend to a student.
- **Craft:** writing about how to write clear, maintainable code.
- **History:** stories of the people who built computing.
- **Wider view:** essays on technology and society.
`,
  },
  {
    collection: 'extras',
    slug: 'why-i-write-tests-first-sometimes',
    title: 'Why I write tests first, sometimes',
    excerpt:
      'Test-driven development is not a religion. A short reflection on when writing the test first genuinely helps, and when it gets in the way.',
    category: 'Reflection',
    date: '2026-08-14',
    image: '/images/articles/tests.svg',
    imageAlt: 'A column of check marks beside lines of code',
    readingMinutes: 5,
    body: `
*This is a demonstration post. Replace it with your own reflections.*

Writing the test first forces a decision about **what the code should do** before deciding **how** it does it. That is most valuable when the behaviour is clear but the implementation is not.

## When it helps

- Fixing a bug: write a test that reproduces it first.
- Pure functions with clear inputs and outputs.

## When it gets in the way

- Exploratory prototypes, where you are still discovering the problem.
`,
  },
  {
    collection: 'extras',
    slug: 'a-raspberry-pi-weather-station',
    title: 'A Raspberry Pi weather station',
    excerpt:
      'A small hardware project that logs temperature and humidity, and a surprisingly good introduction to sensors, data and graphs.',
    category: 'Experiment',
    date: '2026-07-02',
    image: '/images/articles/weather-station.svg',
    imageAlt: 'A line chart of temperature readings over a day',
    readingMinutes: 6,
    body: `
*This is a demonstration post. Replace it with your own project write-up.*

## The plan

Read a sensor every five minutes, store each reading in a CSV file, and draw a daily chart.

## What it teaches

Sampling, data types, file handling and visualisation: four syllabus ideas in one weekend project.
`,
  },
]
