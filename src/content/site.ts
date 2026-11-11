/* ================================================================== */
/*  SITE-WIDE SETTINGS                                                 */
/* ================================================================== */

export const site = {
  name: 'wsc34',
  titleSuffix: 'wsc34',
  description:
    'A personal portfolio and a library of Computer Science resources.',
  footerLine: 'Just trying to build something',
  copyrightName: 'wsc34',
}

/** The five main tabs, in order. */
export const navTabs = [
  { label: 'Personal', to: '/', match: ['/', '/personal'] },
  { label: 'Portfolio', to: '/portfolio', match: ['/portfolio'] },
  { label: 'A Level CS', to: '/a-level', match: ['/a-level', '/resources/a-level'] },
  { label: 'GCSE CS', to: '/gcse', match: ['/gcse', '/resources/gcse', '/python-emulator'] },
  { label: 'Super-curricular', to: '/super-curricular', match: ['/super-curricular'] },
] as const
