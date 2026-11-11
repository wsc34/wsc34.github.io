import type { Article, ArticleCollection, CollectionContent } from '../types'
import { personalArticles } from './personal'
import { superCurricularArticles } from './super-curricular'

/* Page headings for the two editorial tabs. */
export const collections: Record<ArticleCollection, CollectionContent> = {
  personal: {
    collection: 'personal',
    index: '01',
    title: 'Personal',
    intro:
      'Anything totally irrelevant',
  },
  'super-curricular': {
    collection: 'super-curricular',
    index: '04',
    title: 'Super-curricular',
    intro:
      'Ideas, history and projects beyond the specification.',
  },
}

export const articlesByCollection: Record<ArticleCollection, Article[]> = {
  personal: personalArticles,
  'super-curricular': superCurricularArticles,
}

export function findArticle(collection: ArticleCollection, slug: string) {
  return articlesByCollection[collection].find((a) => a.slug === slug)
}

/** Landing page of a collection. Personal is the home page. */
export function collectionHref(collection: ArticleCollection) {
  return collection === 'personal' ? '/' : `/${collection}`
}

export function articleHref(a: Article) {
  return `/${a.collection}/${a.slug}`
}
