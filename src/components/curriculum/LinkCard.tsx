import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { CurriculumLinkCard } from '../../content/types'

/**
 * A dark, terminal-inspired entry card that navigates elsewhere (used for the
 * Python emulator). Matches the board cards' proportions.
 */
export function LinkCard({ card }: { card: CurriculumLinkCard }) {
  return (
    <h2 className="h-full">
      <Link
        to={card.to}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-night bg-night p-6 text-left text-paper transition-shadow duration-200 hover:shadow-[0_10px_30px_-14px_rgba(23,23,23,0.55)] md:p-8"
      >
        <span className="flex items-start justify-between gap-6">
          <span className="font-mono text-[12px] tracking-[0.04em] text-[#9a9a96] uppercase">{card.eyebrow}</span>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#3a3a3a] transition-all duration-200 group-hover:border-paper group-hover:bg-paper group-hover:text-night"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </span>
        <span className="mt-6 block text-[40px] leading-none font-semibold tracking-[-0.035em] md:mt-10 md:text-[48px]">
          {card.title}
        </span>
        <span className="mt-4 block max-w-[46ch] text-[15px] leading-relaxed font-normal text-[#b5b5b1]">
          {card.description}
        </span>
        <span
          aria-hidden="true"
          className="mt-6 block rounded-md border border-[#2a2a2a] bg-[#0c0c0c] px-4 py-3 font-mono text-[13px] leading-6 font-normal text-[#cfcfca] md:mt-8"
        >
          <span className="text-[#6f86a8]">&gt;&gt;&gt;</span> print(<span className="text-[#c9b48a]">"Hello, world!"</span>)
          <br />
          Hello, world!
          <br />
          <span className="text-[#6f86a8]">&gt;&gt;&gt;</span>{' '}
          <span className="inline-block h-[14px] w-[7px] translate-y-[2px] bg-[#cfcfca] [animation:caret-blink_1.1s_steps(1)_infinite]" />
        </span>
        <span className="mt-6 flex items-center border-t border-[#2a2a2a] pt-4 font-mono text-[12px] font-normal text-[#9a9a96] md:mt-auto md:pt-5">
          /python-emulator
          <span className="ml-auto text-paper">{card.cta}</span>
        </span>
      </Link>
    </h2>
  )
}
