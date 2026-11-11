import type { SkillCategory } from '../../content/types'

export function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <dl className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.name}>
          <dt className="text-[13px] font-medium text-ink">{cat.name}</dt>
          <dd className="mt-2">
            {cat.items.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="rounded-sm border border-line-strong bg-card px-2 py-0.5 text-[13px] text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="inline-block rounded-sm border border-dashed border-line-strong px-2 py-0.5 font-mono text-[11.5px] text-faint">
                to be added
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
