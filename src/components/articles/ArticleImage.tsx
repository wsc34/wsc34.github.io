import { useState } from 'react'

interface ArticleImageProps {
  /** Leave empty to show the blank placeholder. */
  src?: string
  alt?: string
  /** Tailwind aspect class, e.g. 'aspect-[16/9]'. */
  aspect?: string
  className?: string
  eager?: boolean
}

/** Fixed-aspect image with a soft hover zoom and a neutral fallback. */
export function ArticleImage({ src, alt = '', aspect = 'aspect-[16/9]', className = '', eager }: ArticleImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-md border border-line bg-wash ${aspect} ${className}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.025] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[12px] text-faint">{src ? 'image unavailable' : 'image to be added'}</span>
        </div>
      )}
    </div>
  )
}
