import type { Article } from '../../content/types'
import { ArticleCard } from './ArticleCard'

interface ArticleGridProps {
  articles: Article[]
  tone?: 'journal' | 'notebook'
}

export function ArticleGrid({ articles, tone = 'journal' }: ArticleGridProps) {
  if (!articles.length) return null
  const journal = tone === 'journal'
  // Avoid a lonely last card: use three columns only when the count fills the rows.
  const threeCols = articles.length % 3 === 0 || articles.length % 2 === 1
  return (
    <ul className={`grid gap-x-8 gap-y-14 sm:grid-cols-2 ${threeCols ? 'lg:grid-cols-3' : 'lg:gap-x-12'}`}>
      {articles.map((a, i) => (
        <li key={a.slug} className="flex">
          <ArticleCard article={a} tone={tone} number={journal ? undefined : String(i + 2).padStart(2, '0')} />
        </li>
      ))}
    </ul>
  )
}
