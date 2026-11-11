import type { SkillCategory } from '../../content/types'

export function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <dl className="divide-y divide-line">
      {categories.map((cat) => (
        <div key={cat.name} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[190px_1fr] sm:gap-6">
          <dt className="pt-1 text-[14px] font-medium text-ink">{cat.name}</dt>
          <dd>
            {cat.items.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-line-strong bg-card px-2.5 py-1 text-[13.5px] text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="inline-block rounded-sm border border-dashed border-line-strong px-2.5 py-1 font-mono text-[12px] text-faint">
                to be added
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
