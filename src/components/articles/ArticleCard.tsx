import { Link } from 'react-router'
import type { Article } from '../../content/types'
import { articleHref } from '../../content/articles'
import { ArticleImage } from './ArticleImage'
import { ArticleMeta } from './ArticleMeta'

interface ArticleCardProps {
  article: Article
  tone?: 'journal' | 'notebook'
  /** Optional running number shown in notebook tone, e.g. "02". */
  number?: string
}

/** Whole card is clickable via a stretched link on the title. */
export function ArticleCard({ article, tone = 'journal', number }: ArticleCardProps) {
  const journal = tone === 'journal'
  return (
    <article className="group relative flex flex-col">
      <ArticleImage src={article.image} alt={article.imageAlt} aspect={journal ? 'aspect-[3/2]' : 'aspect-[16/9]'} />
      <div className="mt-5 flex items-start gap-4">
        {number && (
          <span aria-hidden="true" className="pt-[3px] font-mono text-[12px] text-faint">
            {number}
          </span>
        )}
        <div className="min-w-0">
          <ArticleMeta article={article} compact />
          <h3
            className={
              journal
                ? 'mt-2.5 font-serif text-[23px] leading-[1.2] font-medium tracking-[-0.01em] text-ink'
                : 'mt-2.5 text-[19px] leading-[1.3] font-semibold tracking-[-0.02em] text-ink'
            }
          >
            <Link to={articleHref(article)} className="after:absolute after:inset-0 after:content-['']">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                {article.title}
              </span>
            </Link>
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
        </div>
      </div>
    </article>
  )
}
