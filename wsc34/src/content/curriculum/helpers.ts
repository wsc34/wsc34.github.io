import type { Topic } from '../types'

/** Turns "Fundamentals of data structures" into "fundamentals-of-data-structures". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Shorthand for a topic. The slug is generated from the title unless you
 * pass one in `extra`, so renaming a topic also changes its URL. Pass a fixed
 * `slug` if you want the URL to stay stable after a rename.
 */
export function topic(
  number: string,
  title: string,
  description?: string,
  extra: Partial<Topic> = {},
): Topic {
  return { number, title, slug: slugify(title), description, ...extra }
}
