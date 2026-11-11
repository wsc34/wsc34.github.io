import type { Article } from '../types'

/* ================================================================== */
/*  SUPER-CURRICULAR ARTICLES                                          */
/*  Demonstration articles: edit, replace or delete freely.            */
/*  Order here = order on the page. Set `featured: true` on one.       */
/* ================================================================== */

export const superCurricularArticles: Article[] = [
  {
    collection: 'super-curricular',
    slug: 'the-quiet-power-of-binary-search',
    title: 'The quiet power of binary search',
    excerpt:
      'Halving a problem again and again turns a million comparisons into twenty. Why one of the simplest algorithms is also one of the most profound.',
    category: 'Algorithms',
    date: '2026-10-02',
    image: '/images/articles/binary-search.svg',
    imageAlt: 'Abstract diagram of a sorted row of cells being repeatedly halved',
    featured: true,
    readingMinutes: 6,
    body: `
Imagine guessing a number between 1 and 1,000,000. Asking "is it 1? is it 2?" could take a million questions. Asking "is it higher or lower than 500,000?" takes at most **twenty**.

That is binary search: if the data is *sorted*, each comparison discards half of what remains.

## The idea in one loop

\`\`\`python
def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`

## Why it matters

The number of steps grows with the *logarithm* of the input size, written **O(log n)**. Doubling the data adds just one more step. This pattern of repeatedly halving a search space appears far beyond lists: in debugging with \`git bisect\`, in root-finding methods, and in the structure of balanced search trees.

> The hard part of binary search is not the idea; it is getting the boundaries exactly right.

## Things to try

- Rewrite the function recursively and compare the two versions.
- Modify it to return the *first* occurrence of a repeated value.
- Count the comparisons for lists of size 10, 1,000 and 1,000,000.
`,
  },
  {
    collection: 'super-curricular',
    slug: 'how-strangers-share-secrets',
    title: 'How strangers share secrets in public',
    excerpt:
      'Public-key cryptography lets two people who have never met agree on a secret while everyone listens. A gentle tour of the mathematics behind it.',
    category: 'Cryptography',
    date: '2026-09-18',
    image: '/images/articles/cryptography.svg',
    imageAlt: 'Two interlocking geometric keys drawn in thin lines',
    readingMinutes: 8,
    body: `
For most of history, two people could only communicate secretly if they had already met to agree a key. In the 1970s that assumption was overturned.

## One-way functions

Some operations are easy to do and very hard to undo. Multiplying two large primes takes a fraction of a second; recovering those primes from their product is, as far as anyone knows, infeasible for large enough numbers.

## A public padlock

In public-key cryptography, you publish a **public key** that anyone can use to lock a message, while keeping a **private key** that alone can unlock it. Anyone can lock the padlock, but only you can open it.

## Further reading

- Diffie–Hellman key exchange
- The RSA algorithm and modular arithmetic
- Why quantum computers threaten some of today's schemes
`,
  },
  {
    collection: 'super-curricular',
    slug: 'what-a-neural-network-learns',
    title: 'What a neural network actually learns',
    excerpt:
      'Beneath the hype, a neural network is a large collection of adjustable numbers. Here is what training really changes, and why it works.',
    category: 'Artificial Intelligence',
    date: '2026-08-27',
    image: '/images/articles/neural-network.svg',
    imageAlt: 'Layers of connected nodes forming a simple neural network',
    readingMinutes: 7,
    body: `
A neural network takes numbers in, multiplies them by **weights**, adds them up, and passes the result through a simple function. Stack enough of these layers and the network can approximate remarkably complex relationships.

## Learning is adjustment

Training compares the network's output with the correct answer, measures the error, and nudges every weight slightly in the direction that reduces it. This is **gradient descent**, repeated millions of times.

## Questions worth asking

- What does it mean for a model to *generalise*?
- How can training data introduce bias?
- Why is it hard to explain an individual decision?
`,
  },
  {
    collection: 'super-curricular',
    slug: 'the-engine-that-was-never-built',
    title: 'The engine that was never built',
    excerpt:
      'Charles Babbage designed a general-purpose computer a century early; Ada Lovelace saw what it could become. Their story still shapes how we think about computing.',
    category: 'Computing History',
    date: '2026-07-30',
    image: '/images/articles/analytical-engine.svg',
    imageAlt: 'Line drawing of interlocking gears and punched cards',
    readingMinutes: 5,
    body: `
In the 1830s Charles Babbage designed the **Analytical Engine**: a mechanical machine with a store (memory), a mill (processor) and instructions supplied on punched cards.

## Lovelace's insight

Ada Lovelace's notes include what is often described as the first published program, a method for computing Bernoulli numbers. More strikingly, she suggested the engine might manipulate any symbols, not just numbers, including music.

## Why it still matters

The separation of memory, processing and program that Babbage imagined is recognisable in every computer today.
`,
  },
  {
    collection: 'super-curricular',
    slug: 'thinking-in-invariants',
    title: 'Thinking in invariants',
    excerpt:
      'The most useful question when writing a loop is not "what changes?" but "what stays true?" An introduction to reasoning about correctness.',
    category: 'Computational Thinking',
    date: '2026-06-12',
    image: '/images/articles/invariants.svg',
    imageAlt: 'A looping path around a fixed central point',
    readingMinutes: 6,
    body: `
A **loop invariant** is a statement that is true before a loop starts and remains true after every iteration. If you can find one, you can often prove your code is correct.

## An example

When summing a list, the invariant might be: *\`total\` equals the sum of the first \`i\` items.* It holds before the loop (both are zero) and every iteration preserves it. When the loop ends, \`i\` equals the length of the list, so \`total\` is the full sum.

## Try it yourself

Find the invariant in insertion sort. What is true about the left-hand part of the list after each pass?
`,
  },
]
