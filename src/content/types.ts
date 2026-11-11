/* ------------------------------------------------------------------ */
/*  Shared content types. Every editable content file uses these.      */
/* ------------------------------------------------------------------ */

/* ---------- Portfolio ---------- */

export interface Profile {
  /** Full name, shown large in the hero. */
  name: string
  /** A short professional title */
  title: string
  /** One or two sentences shown under the name. */
  intro: string
  /** Optional line such as a city or "Based in London". Leave '' to hide. */
  location: string
  /**
   * Put the image in /public/images and set e.g.
   * '/images/profile.jpg'. Leave '' to show the neutral placeholder.
   */
  photo: string
  /** Alt text for the photo . */
  photoAlt: string
  /** Paragraphs for the "About me" section. */
  about: string[]
}

export interface EducationEntry {
  institution: string
  qualification: string
  field: string
  /** Free text, e.g. "2019 — 2022" or "Sep 2019 — Jul 2022". */
  dates: string
  description?: string
}

export interface WorkEntry {
  organisation: string
  position: string
  start: string
  /** Use 'Present' for a current role. */
  end: string
  location: string
  responsibilities: string[]
  achievements: string[]
}

export interface SkillCategory {
  name: string
  /** Leave empty to show a quiet "to be added" placeholder. */
  items: string[]
}

export interface ContactLink {
  label: string
  /** The text shown, e.g. your email address or "github.com/username". */
  value: string
  /** The destination. Leave '' and the row is shown as "not yet added". */
  href: string
}

/* ---------- Curriculum ---------- */

export interface Topic {
  /** Shown in monospace before the title, e.g. "4.1" or "12". */
  number: string
  title: string
  /** Used to build the default URL: /resources/{level}/{board}/{slug} */
  slug: string
  description?: string
  /**
   * Optional link to an actual document (PDF, Google Doc, page…). When set,
   * the topic's resource page shows a button to open it.
   */
  documentUrl?: string
  /** Button text for `documentUrl`. Defaults to "Open resource". */
  documentLabel?: string
}

export interface TopicGroup {
  /** Optional heading for a group of topics (e.g. "AS Level content"). */
  title?: string
  topics: Topic[]
}

export type CurriculumLevel = 'a-level' | 'gcse'

export interface CurriculumBoard {
  /** URL segment, e.g. 'aqa-7517'. */
  slug: string
  level: CurriculumLevel
  /** Exam board, e.g. "AQA". */
  board: string
  /** Specification code, e.g. "7517". */
  code: string
  /** Optional full qualification name for screen readers / subtitles. */
  qualification: string
  description: string
  /** Short facts shown on the card, e.g. ["2 exams", "NEA"]. */
  facts?: string[]
  /** Link to the official specification (optional). */
  specUrl?: string
  groups: TopicGroup[]
}

/** A non-expanding card that links somewhere (e.g. the Python emulator). */
export interface CurriculumLinkCard {
  title: string
  eyebrow: string
  description: string
  to: string
  cta: string
}

export type CurriculumEntry =
  | { kind: 'board'; board: CurriculumBoard }
  | { kind: 'link'; card: CurriculumLinkCard }

export interface CurriculumPageContent {
  level: CurriculumLevel
  /** Numbered label shown above the title, e.g. "02". */
  index: string
  title: string
  intro: string
  entries: CurriculumEntry[]
  /** Small print under the cards. */
  note?: string
}

/* ---------- Articles ---------- */

export type ArticleCollection = 'personal' | 'super-curricular'

export interface Article {
  collection: ArticleCollection
  /** URL segment: /{collection}/{slug} */
  slug: string
  title: string
  excerpt: string
  category?: string
  /** ISO date, e.g. '2026-09-14'. Leave undefined to hide. */
  date?: string
  /** Image path, e.g. '/images/articles/my-post.jpg'. 16:9 works best. Leave out for a blank placeholder. */
  image?: string
  imageAlt?: string
  /** Show as the large featured article (first match wins). */
  featured?: boolean
  /** Estimated reading time in minutes (optional). */
  readingMinutes?: number
  /** Article body written in Markdown. Leave out to show a "coming soon" notice. */
  body?: string
}

export interface CollectionContent {
  collection: ArticleCollection
  index: string
  title: string
  intro: string
}
