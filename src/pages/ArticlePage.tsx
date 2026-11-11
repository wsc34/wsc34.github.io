import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { marked } from 'marked'
import type { ArticleCollection } from '../content/types'
import { articleHref, articlesByCollection, collections, findArticle } from '../content/articles'
import { ArticleImage } from '../components/articles/ArticleImage'
import { ArticleMeta } from '../components/articles/ArticleMeta'
import { NotFoundPage } from './NotFoundPage'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/** Reusable article template. Bodies are Markdown strings from /src/content/articles. */
export function ArticlePage({ collection }: { collection: ArticleCollection }) {
  const { slug = '' } = useParams()
  const article = findArticle(collection, slug)
  const meta = collections[collection]
  useDocumentTitle(article?.title ?? 'Article not found', article?.excerpt)

  const html = useMemo(() => (article ? (marked.parse(article.body.trim(), { async: false }) as string) : ''), [article])

  if (!article) return <NotFoundPage />

  const list = articlesByCollection[collection]
  const idx = list.indexOf(article)
  const next = list[(idx + 1) % list.length]
  const journal = collection === 'super-curricular'

  return (
    <article className="container-site">
      <div className="mx-auto max-w-[720px] pt-10 md:pt-14">
        <Link
          to={`/${collection}`}
          className="group inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {meta.title}
        </Link>

        <header className="mt-10 md:mt-12">
          <ArticleMeta article={article} />
          <h1
            className={
              journal
                ? 'mt-4 font-serif text-[36px] leading-[1.08] font-medium tracking-[-0.02em] text-ink md:text-[52px]'
                : 'mt-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] text-ink md:text-[44px]'
            }
          >
            {article.title}
          </h1>
          <p className="mt-5 text-[19px] leading-relaxed text-muted">{article.excerpt}</p>
        </header>
      </div>

      <div className="mx-auto mt-10 max-w-[960px] md:mt-14">
        <ArticleImage src={article.image} alt={article.imageAlt} eager />
      </div>

      <div className="mx-auto max-w-[680px]">
        <div className="prose-article mt-12 md:mt-16" dangerouslySetInnerHTML={{ __html: html }} />

        <footer className="mt-16 border-t border-line pt-8">
          {next && next !== article && (
            <Link to={articleHref(next)} className="group block">
              <span className="eyebrow">Next in {meta.title}</span>
              <span className="mt-2 block text-[20px] leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                {next.title} →
              </span>
            </Link>
          )}
          <Link
            to={`/${collection}`}
            className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to all articles
          </Link>
        </footer>
      </div>
    </article>
  )
}
