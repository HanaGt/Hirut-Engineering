import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  /** e.g. "200+", "12B+", "18+" — animates the numeric part, keeps the suffix */
  value: string
  duration?: number
}

export default function CountUp({ value, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  const match = value.match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : value

  useEffect(() => {
    if (!inView || !match) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return <span ref={ref}>{match ? `0${suffix}` : value}</span>
}
