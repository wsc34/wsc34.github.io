import type { Article, ArticleCollection, CollectionContent } from '../types'
import { extrasArticles } from './extras'
import { superCurricularArticles } from './super-curricular'

/* Page headings for the two editorial tabs. */
export const collections: Record<ArticleCollection, CollectionContent> = {
  'super-curricular': {
    collection: 'super-curricular',
    index: '04',
    title: 'Super-curricular',
    intro:
      'Ideas, history and projects beyond the specification, for students who want to understand not just how computing works, but why.',
  },
  extras: {
    collection: 'extras',
    index: '05',
    title: 'Extras',
    intro:
      'Projects, experiments, recommendations and occasional reflections. A more personal notebook.',
  },
}

export const articlesByCollection: Record<ArticleCollection, Article[]> = {
  'super-curricular': superCurricularArticles,
  extras: extrasArticles,
}

export function findArticle(collection: ArticleCollection, slug: string) {
  return articlesByCollection[collection].find((a) => a.slug === slug)
}

export function articleHref(a: Article) {
  return `/${a.collection}/${a.slug}`
}
