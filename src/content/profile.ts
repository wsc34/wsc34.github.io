import type {
  ContactLink,
  EducationEntry,
  Profile,
  SkillCategory,
  WorkEntry,
} from './types'

export const profile: Profile = {
  name: 'Wing Shing Chiu',
  title: 'Teacher of Computer Science',
  intro:
    'idk wt to write',
  location: 'Tonbridge, United Kingdom',
  // e.g. '/images/profile.jpg' (location: /public/images)
  photo: '',
  photoAlt: 'Not done yet, meh',
  about: [
    'Was trying to do more Gaming but somehow ended up doing Computing.',
    'Now trying to muck about with AI and build some CS material.',
  ],
}

export const education: EducationEntry[] = [
  {
    institution: 'Kings College London',
    qualification: 'PGCE',
    field: 'Computing',
    dates: 'Sep 2021 — July 2022',
  },
  {
    institution: 'University of Cambridge',
    qualification: 'BA',
    field: 'Computer Science',
    dates: 'Oct 2018 — July 2021',
  },
]

export const work: WorkEntry[] = [
  {
    organisation: 'Tonbridge School',
    position: 'Teacher of Computer Science',
    start: 'Sep 2022',
    end: 'Present',
    location: 'Tonbridge',
    responsibilities: ['Deliver lessons (A Level and GCSE Computer Science)', 'Create CS related teaching and learning material'],
    achievements: ['Does living a happy life count?'],
  },
]

export const skills: SkillCategory[] = [
  { name: 'Programming Languages', items: ['Python','Java','C++'] },
  { name: 'Tools', items: ['Does AI count?'] },
  { name: 'Teaching & Professional', items: ['AQA 7517', 'CAIE 9618', 'Edexcel 1CP2'] },
  { name: 'Other', items: ['I will definitely find something to fill it in'] },
]

export const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'email', href: '' },
  { label: 'GitHub', value: 'wsc34', href: 'https://github.com/wsc34' },
  { label: 'LinkedIn', value: 'wsc34', href: 'https://www.linkedin.com/in/wsc34' },
  { label: 'Website', value: 'this', href: 'https://wsc34.github.io/' },
]

/**
 * Path to a downloadable CV, e.g. '/files/cv.pdf' (place the file in
 * /public/files). Leave '' to show "CV available on request".
 */
export const cvFile = ''
