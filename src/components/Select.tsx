import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  style?: React.CSSProperties
  id?: string
  'aria-label'?: string
}

/** Custom animated dropdown replacing native <select>. */
export default function Select({ value, onChange, options, placeholder = 'Select…', style, id, 'aria-label': ariaLabel }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    if (open) setHighlight(options.findIndex((o) => o.value === value))
  }, [open, options, value])

  const selected = options.find((o) => o.value === value)

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        setOpen(false)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!open) setOpen(true)
        else if (highlight >= 0) {
          onChange(options[highlight].value)
          setOpen(false)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) setOpen(true)
        setHighlight((h) => Math.min(h + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlight((h) => Math.max(h - 1, 0))
        break
    }
  }

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <button
        type="button"
        id={id}
        className="he-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(!open)}
        onKeyDown={onKeyDown}
      >
        <span style={{ color: selected ? 'var(--he-text)' : 'var(--he-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', color: 'var(--he-text-muted)', flexShrink: 0 }}>
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className="he-select-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {options.map((o, i) => {
              const isSelected = o.value === value
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`he-select-option${isSelected ? ' he-select-option--selected' : ''}${highlight === i ? ' he-select-option--highlight' : ''}`}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => { onChange(o.value); setOpen(false) }}
                >
                  <span>{o.label}</span>
                  {isSelected && <Check size={14} strokeWidth={3} style={{ color: 'var(--he-amber-dark)', flexShrink: 0 }} />}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
