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
  name: 'Your Name',
  title: '[Your professional title]',
  intro:
    '[One or two sentences introducing yourself: what you teach, build or study, and what you care about.]',
  location: '[City, Country]',
  // e.g. '/images/profile.jpg' (place the file in /public/images)
  photo: '',
  photoAlt: 'Portrait of Your Name',
  about: [
    '[A short paragraph about your background: where you started, what drew you to Computer Science, and what you do now.]',
    '[A second, optional paragraph about your interests, teaching approach or current projects.]',
  ],
}

export const education: EducationEntry[] = [
  {
    institution: '[Institution name]',
    qualification: '[Qualification, e.g. degree or certificate]',
    field: '[Field of study]',
    dates: '[20XX — 20XX]',
    description: '[Optional: dissertation, notable modules, awards.]',
  },
  {
    institution: '[Institution name]',
    qualification: '[Qualification]',
    field: '[Field of study]',
    dates: '[20XX — 20XX]',
  },
]

export const work: WorkEntry[] = [
  {
    organisation: '[Organisation]',
    position: '[Position]',
    start: '[Month 20XX]',
    end: 'Present',
    location: '[Location]',
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
