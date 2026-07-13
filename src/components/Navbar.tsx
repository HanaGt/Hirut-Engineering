import { Link, useRouterState } from '@tanstack/react-router'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'

// "Contact" lives only in the CTA button ("Contact Us") to avoid duplicate
// nav entries pointing to the same page.
const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/inventory', label: 'Materials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { location } = useRouterState()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close menu on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Only the homepage and project detail pages have a dark hero behind the
  // navbar. Everywhere else the page starts light, so the navbar must use its
  // solid (white bg / dark text) treatment from the start for readable contrast.
  const onDarkHero = location.pathname === '/' || /^\/projects\/.+/.test(location.pathname)
  const solid = scrolled || !onDarkHero

  const lightChrome = solid && !open
  const textColor = lightChrome ? 'var(--he-text-secondary)' : 'rgba(255,255,255,0.9)'
  const activeColor = lightChrome ? 'var(--he-amber-text)' : 'var(--he-amber-light)'
  const logoMain = lightChrome ? 'var(--he-navy)' : '#ffffff'
  const logoSub = lightChrome ? 'var(--he-text-muted)' : 'rgba(255,255,255,0.55)'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: open ? 'transparent' : solid ? 'rgba(255,255,255,0.96)' : 'rgba(12,18,34,0.2)',
        backdropFilter: open ? 'none' : 'blur(20px)',
        WebkitBackdropFilter: open ? 'none' : 'blur(20px)',
        borderBottom: open ? '1px solid transparent' : solid ? '1px solid var(--he-border)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: !open && solid ? '0 4px 24px rgba(12,18,34,0.06)' : 'none',
        transition: 'background 350ms ease, border-color 350ms ease, box-shadow 350ms ease',
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          transformOrigin: '0%',
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, var(--he-amber), var(--he-amber-light))',
          zIndex: 2,
        }}
      />

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: -1,
              background: 'linear-gradient(160deg, var(--he-navy) 0%, var(--he-navy-mid) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '5.5rem 2rem 3rem',
              overflowY: 'auto',
            }}
          >
            <div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 80% 10%, rgba(232,135,10,0.14) 0%, transparent 65%)', pointerEvents: 'none' }}
            />
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', position: 'relative' }}>
              {links.map((l, i) => {
                const isActive = location.pathname === l.to || (l.to !== '/' && location.pathname.startsWith(l.to))
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.45, delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={l.to}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: isActive ? 'var(--he-amber-light)' : '#ffffff',
                        fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 7vw, 2.5rem)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.2,
                        textDecoration: 'none',
                        padding: '0.5rem 0',
                      }}
                    >
                      {l.label}
                      {isActive && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--he-amber)', boxShadow: '0 0 10px var(--he-amber-glow)' }} />}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.06 + links.length * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}
            >
              <Link to="/contact" className="btn-gold" style={{ padding: '0.95rem 1.5rem', fontSize: '0.9375rem' }}>
                <Phone size={15} /> Contact Us
              </Link>
              <Link
                to="/admin"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}
              >
                Admin Panel <ArrowUpRight size={13} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="he-container"
        style={{
          height: 'var(--he-nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'linear-gradient(135deg, var(--he-amber), var(--he-amber-dark))',
              borderRadius: '0.625rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px var(--he-amber-glow)',
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>H</span>
          </motion.div>
          <div>
            <div style={{ color: logoMain, fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', lineHeight: 1.1, transition: 'color 350ms' }}>
              HIRUT
            </div>
            <div style={{ color: logoSub, fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 1, transition: 'color 350ms' }}>
              Engineering
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {links.map((l) => {
            const isActive = location.pathname === l.to || (l.to !== '/' && location.pathname.startsWith(l.to))
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  color: isActive ? activeColor : textColor,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  transition: 'color 200ms',
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = lightChrome ? 'var(--he-amber-dark)' : 'var(--he-amber-light)' }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = textColor }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: lightChrome ? 'rgba(232,135,10,0.09)' : 'rgba(232,135,10,0.14)',
                      borderRadius: '0.5rem',
                      border: `1px solid ${lightChrome ? 'rgba(232,135,10,0.22)' : 'rgba(232,135,10,0.3)'}`,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span style={{ position: 'relative' }}>{l.label}</span>
              </Link>
            )
          })}
          <div style={{ marginLeft: '1.25rem', display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="btn-gold" style={{ padding: '0.55rem 1.25rem', fontSize: '0.8125rem' }}>
                <Phone size={14} /> Contact Us
              </Link>
            </motion.div>
            <Link
              to="/admin"
              style={{
                padding: '0.5rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: lightChrome ? 'var(--he-text-muted)' : 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'color 200ms',
                borderRadius: '0.375rem',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--he-amber-dark)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = lightChrome ? 'var(--he-text-muted)' : 'rgba(255,255,255,0.4)' }}
            >
              Admin
            </Link>
          </div>
        </nav>

        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'none',
            border: 'none',
            color: lightChrome ? 'var(--he-text-secondary)' : 'rgba(255,255,255,0.9)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="show-mobile"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  )
}
