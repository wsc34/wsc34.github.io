import { useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import { contactLinks, cvFile, education, profile, skills, work } from '../../content/profile'
import { CVSection } from './CVSection'
import { ContactSection } from './ContactSection'
import { ProfileImage } from './ProfileImage'
import { SkillsSection } from './SkillsSection'
import { TimelineEntry } from './TimelineEntry'

/**
 * The portfolio, shown as the left-hand column of the Personal page.
 * On desktop every section is visible; on small screens the CV sections sit
 * behind a "Show full profile" toggle so the articles stay close to the top.
 */
export function PortfolioColumn({ desktop }: { desktop: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const open = desktop || expanded

  return (
    <div>
      {/* ---------------- Profile summary ---------------- */}
      <section aria-labelledby="profile-name" className="pb-7">
        <ProfileImage src={profile.photo} alt={profile.photoAlt} name={profile.name} />
        <h2
          id="profile-name"
          className="mt-6 font-mono text-[26px] leading-[1.1] font-medium tracking-[-0.04em] text-ink"
        >
          {profile.name}
        </h2>
        <p className="mt-2 text-[15px] font-medium text-ink-soft">{profile.title}</p>
        {profile.location && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-faint" />
            {profile.location}
          </p>
        )}
        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{profile.intro}</p>
        <a
          href="#contact-links-title"
          onClick={() => setExpanded(true)}
          className="mt-5 inline-flex h-10 items-center rounded-md bg-ink px-4 text-[13.5px] font-medium text-paper transition-colors duration-150 hover:bg-accent-strong"
        >
          Get in touch
        </a>
      </section>

      {!desktop && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="profile-details"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between border-t border-line py-4 text-[14px] font-medium text-ink"
        >
          {expanded ? 'Hide full profile' : 'Show full profile'}
          <ChevronDown aria-hidden="true" className={`h-4 w-4 text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* ---------------- CV ---------------- */}
      <div id="profile-details" className="collapse-grid" data-open={open} inert={!open}>
        <div>
          <CVSection id="about-me" number="01.1" title="About me">
            <div className="space-y-3 text-[14.5px] leading-[1.7] text-ink-soft">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </CVSection>

          <CVSection id="education" number="01.2" title="Education">
            <ol className="space-y-7">
              {education.map((e, i) => (
                <TimelineEntry
                  key={i}
                  dates={e.dates}
                  title={e.institution}
                  subtitle={e.qualification}
                  meta={e.field}
                  last={i === education.length - 1}
                >
                  {e.description && <p>{e.description}</p>}
                </TimelineEntry>
              ))}
            </ol>
          </CVSection>

          <CVSection id="experience" number="01.3" title="Work experience">
            <ol className="space-y-7">
              {work.map((w, i) => (
                <TimelineEntry
                  key={i}
                  dates={`${w.start} — ${w.end}`}
                  title={w.position}
                  subtitle={w.organisation}
                  meta={w.location}
                  last={i === work.length - 1}
                >
                  {(w.responsibilities.length > 0 || w.achievements.length > 0) && (
                    <div className="space-y-3">
                      {w.responsibilities.length > 0 && (
                        <ul className="space-y-1">
                          {w.responsibilities.map((r) => (
                            <li key={r} className="relative pl-3.5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint">
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}
                      {w.achievements.length > 0 && (
                        <div>
                          <p className="eyebrow !text-[10.5px]">Key achievements</p>
                          <ul className="mt-1.5 space-y-1">
                            {w.achievements.map((a) => (
                              <li key={a} className="relative pl-3.5 text-ink-soft before:absolute before:top-[0.6em] before:left-0 before:h-[5px] before:w-[5px] before:rounded-full before:bg-accent">
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </TimelineEntry>
              ))}
            </ol>
          </CVSection>

          <CVSection id="skills" number="01.4" title="Skills">
            <SkillsSection categories={skills} />
          </CVSection>

          <div className="scroll-mt-24">
            <CVSection id="contact-links" number="01.5" title="Contact & links">
              <ContactSection links={contactLinks} cvFile={cvFile} />
            </CVSection>
          </div>
        </div>
      </div>
    </div>
  )
}
