import { PlaceholderPage } from '../components/ui/PlaceholderPage'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/**
 * Placeholder for the standalone Python emulator. When the emulator is
 * built, replace this route's element in src/router.tsx (or host it
 * separately at /python-emulator). It is intentionally independent of the
 * tab content.
 */
export function PythonEmulatorPage() {
  useDocumentTitle('Python Emulator', 'An interactive Python programming environment for GCSE students. Coming soon.')

  return (
    <PlaceholderPage
      crumbs={[{ label: 'GCSE CS', to: '/gcse' }, { label: 'Python Emulator' }]}
      eyebrow="Programming · GCSE"
      title="Python Emulator"
      status="Coming soon"
      description={
        <p>
          An interactive Python environment is being prepared: write, run and debug programs directly in the
          browser, with exercises designed around the GCSE programming paper.
        </p>
      }
      back={{ label: 'Back to GCSE CS', to: '/gcse' }}
      aside={
        <div
          aria-hidden="true"
          className="self-start overflow-hidden rounded-lg border border-night bg-night shadow-[0_20px_50px_-28px_rgba(23,23,23,0.6)]"
        >
          <div className="flex items-center gap-1.5 border-b border-[#262626] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
            <span className="ml-3 font-mono text-[11.5px] text-[#77776f]">main.py</span>
          </div>
          <pre className="px-5 py-5 font-mono text-[13px] leading-[1.75] text-[#d4d4cf]">
            <span className="text-[#6f86a8]">def</span> <span className="text-paper">greet</span>(name):{'\n'}
            {'    '}<span className="text-[#6f86a8]">return</span> <span className="text-[#c9b48a]">f"Hello, {'{'}name{'}'}!"</span>{'\n'}
            {'\n'}
            <span className="text-[#77776f]"># coming soon</span>{'\n'}
            print(greet(<span className="text-[#c9b48a]">"student"</span>))
          </pre>
          <div className="border-t border-[#262626] bg-[#0c0c0c] px-5 py-4 font-mono text-[13px] text-[#a3a39e]">
            <span className="text-[#6f86a8]">&gt;&gt;&gt;</span> Hello, student!
            <span className="ml-1 inline-block h-[14px] w-[7px] translate-y-[2px] bg-[#a3a39e] [animation:caret-blink_1.1s_steps(1)_infinite]" />
          </div>
        </div>
      }
    />
  )
}
