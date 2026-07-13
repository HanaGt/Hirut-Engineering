import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface StaggerChildrenProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  style?: React.CSSProperties
}

const container = (stagger: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
})

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export function StaggerChildren({
  children,
  staggerDelay = 0.08,
  className,
  style,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={container(staggerDelay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div variants={item} className={className} style={style}>
      {children}
    </motion.div>
  )
}
