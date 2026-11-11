import { useState } from 'react'

interface ProfileImageProps {
  src: string
  alt: string
  name: string
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

/**
 * Circular profile photo. Shows a calm, neutral empty state when no photo is
 * set (or if the image fails to load).
 */
export function ProfileImage({ src, alt, name }: ProfileImageProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <figure className="relative aspect-square w-[104px] shrink-0">
      {/* Fine outer ring for a subtle, considered frame. */}
      <div aria-hidden="true" className="absolute -inset-1.5 rounded-full border border-line" />
      <div className="relative h-full w-full overflow-hidden rounded-full border border-line-strong bg-wash">
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
            width={600}
            height={600}
            decoding="async"
          />
        ) : (
          <div
            role="img"
            aria-label="Profile photo placeholder"
            className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#f3f3f0_70%)]"
          >
            <span className="font-mono text-[26px] font-medium tracking-tight text-line-strong">
              {initials(name) || '—'}
            </span>
          </div>
        )}
      </div>
    </figure>
  )
}
