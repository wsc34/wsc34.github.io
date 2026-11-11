import type { CurriculumBoard } from '../types'
import { topic } from './helpers'

/**
 * Pearson Edexcel GCSE (9–1) Computer Science (1CP2).
 * Grouped by the six specification topics.
 */
export const edexcel1cp2: CurriculumBoard = {
  slug: 'edexcel-1cp2',
  level: 'gcse',
  board: 'Edexcel',
  code: '1CP2',
  qualification: 'Pearson Edexcel GCSE (9–1) Computer Science',
  description:
    'Computational thinking, data, computers, networks and the wider impact of technology, with on-screen Python programming.',
  facts: ['Paper 1 theory', 'Paper 2 on-screen'],
  specUrl:
    'https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html',
  groups: [
    {
      title: 'Topic 1: Computational thinking',
      topics: [
        topic('1.1', 'Decomposition and abstraction'),
        topic('1.2', 'Algorithms'),
        topic('1.3', 'Truth tables'),
      ],
    },
    {
      title: 'Topic 2: Data',
      topics: [
        topic('2.1', 'Binary'),
        topic('2.2', 'Data representation'),
        topic('2.3', 'Data storage and compression'),
        topic('2.4', 'Encryption'),
      ],
    },
    {
      title: 'Topic 3: Computers',
      topics: [
        topic('3.1', 'Hardware'),
        topic('3.2', 'Software'),
        topic('3.3', 'Programming languages'),
      ],
    },
    {
      title: 'Topic 4: Networks',
      topics: [topic('4.1', 'Networks'), topic('4.2', 'Network security')],
    },
    {
      title: 'Topic 5: Issues and impact',
      topics: [
        topic('5.1', 'Environmental issues'),
        topic('5.2', 'Ethical and legal issues'),
        topic('5.3', 'Cybersecurity'),
      ],
    },
    {
      title: 'Topic 6: Problem solving with programming',
      topics: [
        topic('6.1', 'Develop code'),
        topic('6.2', 'Constructs'),
        topic('6.3', 'Data types and data structures'),
        topic('6.4', 'Input and output'),
        topic('6.5', 'Operators'),
        topic('6.6', 'Subprograms'),
      ],
    },
  ],
}
