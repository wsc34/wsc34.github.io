import { ArrowDown, MapPin } from 'lucide-react'
import { contactLinks, cvFile, education, profile, skills, work } from '../content/profile'
import { CVSection } from '../components/portfolio/CVSection'
import { ContactSection } from '../components/portfolio/ContactSection'
import { ProfileImage } from '../components/portfolio/ProfileImage'
import { SkillsSection } from '../components/portfolio/SkillsSection'
import { TimelineEntry } from '../components/portfolio/TimelineEntry'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function PortfolioPage() {
  useDocumentTitle('Portfolio')

  return (
    <div className="container-site">
      {/* ---------------- Hero ---------------- */}
      <section
        aria-labelledby="hero-name"
        className="grid items-center gap-12 pt-14 pb-16 md:pt-24 md:pb-24 lg:grid-cols-[1fr_auto] lg:gap-20"
      >
        <div className="order-2 lg:order-1">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">02</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span>Portfolio</span>
          </p>
          <h1
            id="hero-name"
            className="mt-6 font-mono text-[40px] leading-[1.02] font-medium tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[72px]"
          >
            {profile.name}
          </h1>
          <p className="mt-5 text-[19px] font-medium tracking-[-0.01em] text-ink-soft md:text-[21px]">
            {profile.title}
          </p>
          <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-md bg-ink px-5 text-[14px] font-medium text-paper transition-colors duration-150 hover:bg-accent-strong"
            >
              Get in touch
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Read the CV
              <ArrowDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
            {profile.location && (
              <span className="inline-flex items-center gap-1.5 text-[13.5px] text-muted">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-faint" />
                {profile.location}
              </span>
            )}
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:pr-4">
          <ProfileImage src={profile.photo} alt={profile.photoAlt} name={profile.name} />
        </div>
      </section>

      {/* ---------------- CV ---------------- */}
      <div id="about" className="scroll-mt-28">
        <CVSection id="about-me" number="01.1" title="About me">
          <div className="max-w-[62ch] space-y-4 text-[16.5px] leading-[1.7] text-ink-soft">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </CVSection>
      </div>

      <CVSection id="education" number="01.2" title="Education">
        <ol className="space-y-10">
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
        <ol className="space-y-10">
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
                <div className="space-y-4">
                  {w.responsibilities.length > 0 && (
                    <ul className="space-y-1.5">
                      {w.responsibilities.map((r) => (
                        <li key={r} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint">
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                  {w.achievements.length > 0 && (
                    <div>
                      <p className="eyebrow !text-[11px]">Key achievements</p>
                      <ul className="mt-2 space-y-1.5">
                        {w.achievements.map((a) => (
                          <li key={a} className="relative pl-4 text-ink-soft before:absolute before:top-[0.55em] before:left-0 before:h-[5px] before:w-[5px] before:rounded-full before:bg-accent">
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

      <div id="contact" className="scroll-mt-28">
        <CVSection id="contact-links" number="01.5" title="Contact & links">
          <ContactSection links={contactLinks} cvFile={cvFile} />
        </CVSection>
      </div>
    </div>
  )
}
