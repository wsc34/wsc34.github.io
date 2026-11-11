import type { ArticleCollection } from '../content/types'
import { articlesByCollection, collections } from '../content/articles'
import { PageHeader } from '../components/ui/PageHeader'
import { FeaturedArticle } from '../components/articles/FeaturedArticle'
import { ArticleGrid } from '../components/articles/ArticleGrid'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/** Editorial landing page shared by Personal and Super-curricular. */
export function CollectionPage({ collection }: { collection: ArticleCollection }) {
  const meta = collections[collection]
  useDocumentTitle(meta.title, meta.intro)

  const articles = articlesByCollection[collection]
  const featured = articles.find((a) => a.featured) ?? articles[0]
  const rest = articles.filter((a) => a !== featured)
  const tone = collection === 'super-curricular' ? 'journal' : 'notebook'

  return (
    <div className="w-full">
      <PageHeader index={meta.index} label={meta.title} title={meta.title} intro={meta.intro} />

      {!featured ? (
        <p className="border-t border-line py-16 text-center text-muted">New articles are on their way.</p>
      ) : (
        <>
          <div className="border-t border-line pt-10 md:pt-12">
            <FeaturedArticle article={featured} tone={tone} />
          </div>

          {rest.length > 0 && (
            <section aria-labelledby={`${collection}-more`} className="mt-16 border-t border-line pt-10 md:mt-20">
              <div className="mb-10 flex items-baseline justify-between">
                <h2 id={`${collection}-more`} className="eyebrow">
                  {tone === 'journal' ? 'More to read' : 'From the notebook'}
                </h2>
                <p className="font-mono text-[12px] text-faint">
                  {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                </p>
              </div>
              <ArticleGrid articles={rest} tone={tone} />
            </section>
          )}
        </>
      )}
    </div>
  )
}
