import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Article } from '../../content/types'
import { articleHref } from '../../content/articles'
import { ArticleImage } from './ArticleImage'
import { ArticleMeta } from './ArticleMeta'

interface FeaturedArticleProps {
  article: Article
  /** 'journal' = serif headline (Super-curricular), 'notebook' = sans (Extras). */
  tone?: 'journal' | 'notebook'
}

export function FeaturedArticle({ article, tone = 'journal' }: FeaturedArticleProps) {
  return (
    <article className="group relative grid gap-7 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-14">
      <ArticleImage src={article.image} alt={article.imageAlt} eager />
      <div>
        <p className="eyebrow mb-4">Featured</p>
        <ArticleMeta article={article} />
        <h2
          className={
            tone === 'journal'
              ? 'mt-3 font-serif text-[32px] leading-[1.1] font-medium tracking-[-0.015em] text-ink md:text-[42px]'
              : 'mt-3 text-[28px] leading-[1.15] font-semibold tracking-[-0.03em] text-ink md:text-[34px]'
          }
        >
          <Link to={articleHref(article)} className="after:absolute after:inset-0 after:content-['']">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
              {article.title}
            </span>
          </Link>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[16.5px] leading-relaxed text-muted">{article.excerpt}</p>
        <p aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  )
}
