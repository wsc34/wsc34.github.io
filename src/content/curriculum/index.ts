import type {
  CurriculumBoard,
  CurriculumLevel,
  CurriculumPageContent,
  Topic,
} from '../types'
import { aqa7517 } from './aqa-7517'
import { caie9618 } from './caie-9618'
import { edexcel1cp2 } from './edexcel-1cp2'

/* ================================================================== */
/*  CURRICULUM PAGES                                                   */
/*  To add a new exam board: create a file like aqa-7517.ts, import it */
/*  here and add `{ kind: 'board', board: yourBoard }` to `entries`.   */
/* ================================================================== */

export const aLevelPage: CurriculumPageContent = {
  level: 'a-level',
  index: '02',
  title: 'A Level Computer Science',
  intro:
    'Topic-by-topic resources for the two A Level specifications, organised to follow the structure of each syllabus.',
  entries: [
    { kind: 'board', board: aqa7517 },
    { kind: 'board', board: caie9618 },
  ],
  note: 'Topic headings follow the published specifications. Always check the latest version from the exam board.',
}

export const gcsePage: CurriculumPageContent = {
  level: 'gcse',
  index: '03',
  title: 'GCSE Computer Science',
  intro:
    'Clear, structured notes for every GCSE topic, plus a dedicated space for learning to program in Python.',
  entries: [
    { kind: 'board', board: edexcel1cp2 },
    {
      kind: 'link',
      card: {
        eyebrow: 'Python',
        title: 'Programming',
        description:
          'An interactive Python environment for practising the programming skills assessed in Paper 2.',
        to: '/python-emulator',
        cta: 'Open the Python emulator',
      },
    },
  ],
  note: 'Topic headings follow the published specification. Always check the latest version from the exam board.',
}

/** Every board, used to look up resource pages. */
export const allBoards: CurriculumBoard[] = [aqa7517, caie9618, edexcel1cp2]

export const levelLabels: Record<CurriculumLevel, { label: string; path: string }> = {
  'a-level': { label: 'A Level CS', path: '/a-level' },
  gcse: { label: 'GCSE CS', path: '/gcse' },
}

export function topicHref(board: CurriculumBoard, t: Topic): string {
  return `/resources/${board.level}/${board.slug}/${t.slug}`
}

export function findTopic(level: string, boardSlug: string, topicSlug: string) {
  const board = allBoards.find((b) => b.level === level && b.slug === boardSlug)
  if (!board) return undefined
  for (const group of board.groups) {
    const t = group.topics.find((x) => x.slug === topicSlug)
    if (t) return { board, group, topic: t }
  }
  return undefined
}

/** Previous / next topic within a board, for in-page navigation. */
export function adjacentTopics(board: CurriculumBoard, topicSlug: string) {
  const flat = board.groups.flatMap((g) => g.topics)
  const i = flat.findIndex((t) => t.slug === topicSlug)
  return { prev: i > 0 ? flat[i - 1] : undefined, next: i >= 0 ? flat[i + 1] : undefined }
}
