import { useState } from 'react'
import { ImageOff } from 'lucide-react'

/** Known-good construction fallback (cranes at dusk). */
const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80'

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  /** Shown if `src` fails. If this also fails, a styled placeholder renders. */
  fallback?: string
}

/**
 * Drop-in <img> replacement that never renders a broken image:
 * src → fallback image → styled placeholder.
 */
export default function SmartImage({ src, fallback = DEFAULT_FALLBACK, alt = '', ...rest }: SmartImageProps) {
  const [current, setCurrent] = useState(src)
  const [dead, setDead] = useState(false)
  const [prevSrc, setPrevSrc] = useState(src)

  // Reset the chain if the src prop changes (e.g. gallery switching)
  if (src !== prevSrc) {
    setPrevSrc(src)
    setCurrent(src)
    setDead(false)
  }

  if (dead) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--he-navy-soft) 0%, var(--he-navy) 100%)',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        <ImageOff size={28} />
      </div>
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback)
        else setDead(true)
      }}
      {...rest}
    />
  )
}
