import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  style?: React.CSSProperties
  once?: boolean
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })

  const offsets = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
    none: { y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      // once=false: animate back to hidden when scrolled out so the entrance
      // replays every time the section re-enters the viewport
      animate={inView ? { opacity: 1, x: 0, y: 0 } : once ? {} : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
