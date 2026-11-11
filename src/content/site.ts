/* ================================================================== */
/*  SITE-WIDE SETTINGS                                                 */
/* ================================================================== */

export const site = {
  name: 'wsc34',
  /** Used in browser tab titles: "Page — wsc34". */
  titleSuffix: 'wsc34',
  description:
    'A personal portfolio and a curated library of Computer Science resources.',
  footerLine: 'Made with care for curious minds.',
  /** Name used in the copyright notice. */
  copyrightName: 'wsc34',
}

/** The five main tabs, in order. */
export const navTabs = [
  { label: 'Portfolio', to: '/', match: ['/'] },
  { label: 'A Level CS', to: '/a-level', match: ['/a-level', '/resources/a-level'] },
  { label: 'GCSE CS', to: '/gcse', match: ['/gcse', '/resources/gcse', '/python-emulator'] },
  { label: 'Super-curricular', to: '/super-curricular', match: ['/super-curricular'] },
  { label: 'Extras', to: '/extras', match: ['/extras'] },
] as const
