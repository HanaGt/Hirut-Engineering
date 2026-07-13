import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import { projects } from '../../data/projects'
import PageHeader from '../../components/PageHeader'
import SmartImage from '../../components/SmartImage'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

function ProjectsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="he-page">
      <PageHeader
        label="Our Projects"
        title="Landmark Projects"
        description="18 years of delivering award-winning infrastructure, commercial, and industrial projects across Ethiopia."
      />

      <div className="filter-bar">
        <div className="he-container" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map((c) => {
            const isActive = c === active
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`filter-pill${isActive ? ' filter-pill--active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="filter-pill"
                    style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: 'rgba(232,135,10,0.08)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span style={{ position: 'relative' }}>{c}</span>
              </button>
            )
          })}
          <span style={{ color: 'var(--he-text-muted)', fontSize: '0.8125rem', marginLeft: 'auto' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <section className="he-container" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.38, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to="/projects/$projectId" params={{ projectId: p.id }} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div className="project-card" whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
                    <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative' }}>
                      <SmartImage
                        src={p.coverImage}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                      />
                      <div className="project-card-overlay" />
                      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                        <span className="category-badge" style={{ background: 'var(--he-amber)', borderColor: 'var(--he-amber)', color: '#fff' }}>
                          {p.category}
                        </span>
                      </div>
                      <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.375rem', right: '1.375rem' }}>
                        <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.1875rem', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.name}</h3>
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--he-text-secondary)', fontSize: '0.8125rem' }}>
                          <MapPin size={12} style={{ color: 'var(--he-amber)' }} />{p.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--he-text-secondary)', fontSize: '0.8125rem' }}>
                          <Calendar size={12} style={{ color: 'var(--he-amber)' }} />{p.year}
                        </span>
                      </div>
                      <ArrowRight size={15} style={{ color: 'var(--he-amber)' }} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  )
}
