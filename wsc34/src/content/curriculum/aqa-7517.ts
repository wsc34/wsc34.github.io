import type { CurriculumBoard } from '../types'
import { topic } from './helpers'

/**
 * AQA A Level Computer Science (7517).
 * Section headings follow the published specification (sections 4.1–4.14).
 * To link a document, add `{ documentUrl: '...' }` as the fourth argument.
 */
export const aqa7517: CurriculumBoard = {
  slug: 'aqa-7517',
  level: 'a-level',
  board: 'AQA',
  code: '7517',
  qualification: 'AQA A Level Computer Science',
  description:
    'Programming, theory of computation and computer systems, assessed through two examinations and an independent programming project.',
  facts: ['2 exams', 'NEA project'],
  specUrl:
    'https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517',
  groups: [
    {
      title: 'Specification content',
      topics: [
        topic('4.1', 'Fundamentals of programming', 'Data types, control structures, subroutines, OOP'),
        topic('4.2', 'Fundamentals of data structures', 'Arrays, queues, stacks, graphs, trees, hash tables'),
        topic('4.3', 'Fundamentals of algorithms', 'Traversals, searching, sorting, optimisation'),
        topic('4.4', 'Theory of computation', 'Abstraction, FSMs, regular languages, Turing machines'),
        topic('4.5', 'Fundamentals of data representation', 'Number systems, binary, encoding, compression'),
        topic('4.6', 'Fundamentals of computer systems', 'Hardware, software, Boolean algebra, logic gates'),
        topic('4.7', 'Fundamentals of computer organisation and architecture', 'Processor, fetch–execute, assembly language'),
        topic('4.8', 'Consequences of uses of computing', 'Ethical, legal, cultural and moral issues'),
        topic('4.9', 'Fundamentals of communication and networking', 'Protocols, TCP/IP, security, client–server'),
        topic('4.10', 'Fundamentals of databases', 'Relational modelling, normalisation, SQL'),
        topic('4.11', 'Big Data', 'Volume, velocity, variety; distributed processing'),
        topic('4.12', 'Fundamentals of functional programming', 'Functions, higher-order functions, lists'),
        topic('4.13', 'Systematic approach to problem solving', 'Analysis, design, implementation, evaluation'),
      ],
    },
    {
      title: 'Non-exam assessment',
      topics: [
        topic('4.14', 'Non-exam assessment: the computer systems project', 'Planning, documenting and evaluating your project'),
      ],
    },
  ],
}
