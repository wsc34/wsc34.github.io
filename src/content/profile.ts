import type {
  ContactLink,
  EducationEntry,
  Profile,
  SkillCategory,
  WorkEntry,
} from './types'

/* ================================================================== */
/*  PORTFOLIO CONTENT                                                  */
/*  Everything on the Portfolio tab comes from this file.              */
/*  Replace the bracketed placeholder text with your own details.      */
/* ================================================================== */

export const profile: Profile = {
  name: 'Wing Shing Chiu',
  title: 'Teacher of Computer Science',
  intro:
    'idk wt to write',
  location: 'Tonbridge, United Kingdom',
  // e.g. '/images/profile.jpg' (place the file in /public/images)
  photo: '',
  photoAlt: 'Not done yet, meh',
  about: [
    'Was trying to do more gaming but somehow ended up doing Computer Science.',
    'Now trying to mock about with AI and build some CS material.',
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
    responsibilities: ['[Main responsibility]', '[Another responsibility]'],
    achievements: ['[A key achievement, ideally with a measurable outcome]'],
  },
  {
    organisation: '[Organisation]',
    position: '[Position]',
    start: '[Month 20XX]',
    end: '[Month 20XX]',
    location: '[Location]',
    responsibilities: ['[Main responsibility]'],
    achievements: [],
  },
]

/** Leave `items` empty to show a quiet "to be added" placeholder. */
export const skills: SkillCategory[] = [
  { name: 'Programming Languages', items: [] },
  { name: 'Frameworks & Technologies', items: [] },
  { name: 'Tools', items: [] },
  { name: 'Teaching & Professional', items: [] },
  { name: 'Other', items: [] },
]

/** Leave `href` empty for anything you have not added yet. */
export const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'Not yet added', href: '' },
  { label: 'GitHub', value: 'Not yet added', href: '' },
  { label: 'LinkedIn', value: 'Not yet added', href: '' },
  { label: 'Website', value: 'Not yet added', href: '' },
]

/**
 * Path to a downloadable CV, e.g. '/files/cv.pdf' (place the file in
 * /public/files). Leave '' to show "CV available on request".
 */
export const cvFile = ''
