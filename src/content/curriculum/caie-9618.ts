import type { CurriculumBoard } from '../types'
import { topic } from './helpers'

/**
 * Cambridge International AS & A Level Computer Science (9618).
 * Headings follow the syllabus topic numbering (AS: 1–12, A Level: 13–20).
 * Check against the syllabus year you teach, since topics can change between versions.
 */
export const caie9618: CurriculumBoard = {
  slug: 'caie-9618',
  level: 'a-level',
  board: 'Cambridge (CAIE)',
  code: '9618',
  qualification: 'Cambridge International AS & A Level Computer Science',
  description:
    'A two-stage course: AS foundations in theory and programming, followed by advanced A Level topics including AI and further programming.',
  facts: ['AS + A Level', '4 papers'],
  specUrl:
    'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/',
  groups: [
    {
      title: 'AS Level content',
      topics: [
        topic('1', 'Information representation'),
        topic('2', 'Communication'),
        topic('3', 'Hardware'),
        topic('4', 'Processor fundamentals'),
        topic('5', 'System software'),
        topic('6', 'Security, privacy and data integrity'),
        topic('7', 'Ethics and ownership'),
        topic('8', 'Databases'),
        topic('9', 'Algorithm design and problem-solving'),
        topic('10', 'Data types and structures'),
        topic('11', 'Programming'),
        topic('12', 'Software development'),
      ],
    },
    {
      title: 'A Level content',
      topics: [
        topic('13', 'Data representation', undefined, { slug: 'data-representation-a-level' }),
        topic('14', 'Communication and internet technologies'),
        topic('15', 'Hardware and virtual machines'),
        topic('16', 'System software', undefined, { slug: 'system-software-a-level' }),
        topic('17', 'Security'),
        topic('18', 'Artificial intelligence (AI)'),
        topic('19', 'Computational thinking and problem-solving'),
        topic('20', 'Further programming'),
      ],
    },
  ],
}
