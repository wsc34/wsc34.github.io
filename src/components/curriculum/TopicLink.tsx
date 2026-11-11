import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router'
import type { Topic } from '../../content/types'

interface TopicLinkProps {
  topic: Topic
  to: string
}

/** A single clickable resource row inside an expanded syllabus panel. */
export function TopicLink({ topic, to }: TopicLinkProps) {
  return (
    <Link
      to={to}
      className="group -mx-3 grid grid-cols-[3.25rem_1fr_auto] items-start gap-3 rounded-md px-3 py-3 transition-colors duration-150 hover:bg-wash sm:grid-cols-[3.75rem_1fr_auto]"
    >
      <span className="pt-[3px] font-mono text-[12.5px] text-faint transition-colors group-hover:text-accent">
        {topic.number}
      </span>
      <span className="min-w-0">
        <span className="block text-[15.5px] leading-snug font-medium text-ink">{topic.title}</span>
        {topic.description && (
          <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{topic.description}</span>
        )}
      </span>
      <span className="flex h-6 items-center gap-2 text-faint">
        {topic.documentUrl && <FileText aria-label="Document available" className="h-3.5 w-3.5" />}
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 -translate-x-1 opacity-50 transition-all duration-200 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100"
        />
      </span>
    </Link>
  )
}
