import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { ArrowLeft, MapPin, Calendar, Ruler, CheckCircle, ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import AnimateIn from '../../components/AnimateIn'
import SectionLabel from '../../components/SectionLabel'
import { StaggerChildren, StaggerItem } from '../../components/StaggerChildren'
import SmartImage from '../../components/SmartImage'

export const Route = createFileRoute('/projects/$projectId')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId)
    if (!project) throw notFound()
    return project
  },
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const project = Route.useLoaderData()
  const [activeImage, setActiveImage] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="he-page section-white">
      <div ref={heroRef} style={{ position: 'relative', height: 'clamp(400px, 58vh, 660px)', overflow: 'hidden' }}>
        <motion.div
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '130%', position: 'absolute', top: '-15%', y: heroY }}
        >
          <SmartImage
            src={project.gallery[activeImage]}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,18,34,0.2), rgba(12,18,34,0.9))' }} />
        <div className="hero-accent-line" />

        <motion.div
          className="he-container"
          style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', opacity: heroOpacity }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="category-badge" style={{ background: 'rgba(232,135,10,0.2)', borderColor: 'rgba(232,135,10,0.4)', color: 'var(--he-amber-light)' }}>
              {project.category}
            </span>
            <h1 className="he-display" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', color: '#ffffff', margin: '1rem 0 0', maxWidth: '720px' }}>
              {project.name}
            </h1>
          </motion.div>
        </motion.div>

        <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          {project.gallery.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveImage(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: i === activeImage ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '999px',
                background: i === activeImage ? 'var(--he-amber)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms ease',
              }}
            />
          ))}
        </div>
      </div>

      <div className="he-container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <AnimateIn>
          <Link
            to="/projects"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--he-text-secondary)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', marginBottom: '2.5rem', transition: 'color 200ms' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--he-amber)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--he-text-secondary)' }}
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </AnimateIn>

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
          <div>
            <AnimateIn delay={0.05}>
              <p className="he-body-lg" style={{ margin: '0 0 2.5rem' }}>{project.longDescription}</p>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h2 className="he-heading" style={{ fontSize: '1.125rem', margin: '0 0 1.25rem' }}>Project Highlights</h2>
            </AnimateIn>

            <StaggerChildren style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
              {project.highlights.map((h) => (
                <StaggerItem key={h} className="check-item">
                  <div className="check-item-icon">
                    <CheckCircle size={10} style={{ color: 'var(--he-amber)' }} strokeWidth={3} />
                  </div>
                  <span className="he-body" style={{ fontSize: '0.9375rem' }}>{h}</span>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <AnimateIn delay={0.15}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.gallery.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: 92,
                      height: 68,
                      borderRadius: 'var(--he-radius-sm)',
                      overflow: 'hidden',
                      border: i === activeImage ? '2px solid var(--he-amber)' : '2px solid var(--he-border)',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'border-color 200ms',
                      boxShadow: i === activeImage ? '0 0 0 3px rgba(232,135,10,0.15)' : 'none',
                    }}
                  >
                    <SmartImage src={img} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.button>
                ))}
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.2} direction="left">
            <div style={{ background: 'var(--he-surface-cool)', border: '1px solid var(--he-border)', borderRadius: 'var(--he-radius-lg)', padding: '1.875rem', position: 'sticky', top: 'calc(var(--he-nav-height) + 1.25rem)', boxShadow: 'var(--he-shadow-sm)' }}>
              <h3 className="he-kicker" style={{ color: 'var(--he-text-muted)', margin: '0 0 1.5rem' }}>Project Details</h3>

              {[
                { icon: <MapPin size={14} />, label: 'Location', value: project.location },
                { icon: <Calendar size={14} />, label: 'Year Completed', value: String(project.year) },
                { icon: <Ruler size={14} />, label: 'Duration', value: project.duration },
                { icon: <Ruler size={14} />, label: 'Scale', value: project.scale },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--he-border)' }}>
                  <span style={{ color: 'var(--he-amber)', marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div className="he-kicker" style={{ color: 'var(--he-text-muted)', fontSize: '0.68rem', marginBottom: '0.25rem' }}>{item.label}</div>
                    <div style={{ color: 'var(--he-navy)', fontSize: '0.9375rem', fontWeight: 600 }}>{item.value}</div>
                  </div>
                </div>
              ))}

              <Link to="/contact" className="btn-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
                Inquire About This Project <ArrowRight size={14} />
              </Link>
            </div>
          </AnimateIn>
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--he-border)' }}>
          <AnimateIn style={{ marginBottom: '2.5rem' }}>
            <SectionLabel>Related Work</SectionLabel>
            <h2 className="he-heading" style={{ fontSize: '1.75rem', margin: 0 }}>More Projects</h2>
          </AnimateIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {projects.filter((p) => p.id !== project.id).slice(0, 3).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link to="/projects/$projectId" params={{ projectId: p.id }} style={{ textDecoration: 'none' }}>
                  <motion.article className="project-card" style={{ height: 230 }} whileHover={{ y: -4 }} transition={{ duration: 0.22 }}>
                    <SmartImage src={p.coverImage} alt={p.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="project-card-overlay" />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.375rem' }}>
                      <h3 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.01em', margin: '0 0 0.25rem', lineHeight: 1.3 }}>{p.name}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', margin: 0 }}>{p.year}</p>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
