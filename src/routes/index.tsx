import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Check, Quote } from 'lucide-react'
import { useRef } from 'react'
import { projects } from '../data/projects'
import AnimateIn from '../components/AnimateIn'
import ClientLogos from '../components/ClientLogos'
import CountUp from '../components/CountUp'
import SmartImage from '../components/SmartImage'
import SectionLabel from '../components/SectionLabel'
import { StaggerChildren, StaggerItem } from '../components/StaggerChildren'

export const Route = createFileRoute('/')({ component: HomePage })

const stats = [
  { number: '200+', label: 'Projects Delivered', note: 'Across Ethiopia' },
  { number: '18+', label: 'Years of Excellence', note: 'Est. 2006' },
  { number: '12B+', label: 'ETB Contract Value', note: 'Total portfolio' },
  { number: '850+', label: 'Skilled Engineers', note: 'In-house team' },
]

const services = [
  {
    title: 'Infrastructure & Roads',
    description: 'Highways, interchanges, bridges, and urban transport corridors built to international FIDIC standards.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&q=80',
  },
  {
    title: 'Commercial & High-Rise',
    description: 'Grade-A office towers, mixed-use developments, and luxury hospitality buildings.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80',
  },
  {
    title: 'Industrial Facilities',
    description: 'Large-span manufacturing sheds, logistics hubs, and industrial park infrastructure.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80',
  },
  {
    title: 'Water & Sanitation',
    description: 'Treatment plants, distribution networks, irrigation dams, and wastewater systems.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80',
  },
]

const processSteps = [
  { step: '01', title: 'Project Consultation', desc: 'Understanding your vision, scope, budget, and site constraints through deep discovery sessions with our senior engineers.' },
  { step: '02', title: 'Strategic Planning', desc: 'Creating detailed project plans, BOQs, and milestone schedules focused on efficiency, safety, and delivery excellence.' },
  { step: '03', title: 'Precision Construction', desc: 'Expert execution by 850+ engineers using premium imported materials and rigorous ISO-9001 quality assurance.' },
  { step: '04', title: 'Final Delivery', desc: 'Handing over high-quality, fully commissioned structures — on time, on budget, with zero compromises.' },
]

const testimonials = [
  {
    quote: 'Hirut Engineering delivered our logistics hub ahead of schedule and under budget. Their technical expertise and project management are simply unmatched in the region.',
    author: 'Bekele Tadesse',
    role: 'CEO, Ethio Freight Solutions',
    initial: 'B',
  },
  {
    quote: 'The quality of their infrastructure work on the ring road corridor exceeded every expectation. A truly world-class team operating right here on Ethiopian soil.',
    author: 'Almaz Girma',
    role: 'Director, Ethiopian Roads Authority',
    initial: 'A',
  },
]

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <ClientLogos />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <CTABanner />
      <TestimonialsSection />
    </>
  )
}

const HERO_POSTER = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80'

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${HERO_POSTER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
          scale: 1.1,
        }}
      >
        {/*
          Drone footage background. Drop your own footage (highways, bridges,
          high-rises, machinery, engineers, concrete pours) at
          public/videos/hero-drone.mp4 — it takes priority over the stock reel.
          The poster image above shows until the video is ready (or if it fails).
        */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          aria-hidden="true"
        >
          <source src="/videos/hero-drone.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/2835998/2835998-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(115deg, rgba(12,18,34,0.94) 0%, rgba(12,18,34,0.78) 50%, rgba(12,18,34,0.55) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232,135,10,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div className="hero-accent-line" />

      <motion.div
        className="he-container"
        style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '7rem', width: '100%', opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hero-badge"
        >
          <span className="hero-badge-dot" />
          <span style={{ color: 'var(--he-amber-light)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Ethiopia's Premier Engineering Firm
          </span>
        </motion.div>

        <h1 style={{ margin: '0 0 1.75rem' }}>
          {[
            { text: 'Engineering', color: '#ffffff' },
            { text: "Ethiopia's Future", color: 'var(--he-amber-light)' },
          ].map((line, i) => (
            /* paddingBottom + negative marginBottom give descenders ("g", "y")
               room inside the overflow-hidden reveal without adding line gap */
            <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.16em', marginBottom: '-0.16em' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.12 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'block',
                  fontSize: 'clamp(2.75rem, 7vw, 4.5rem)', /* 72px max */
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: line.color,
                  lineHeight: 1.08,
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)', fontWeight: 400, maxWidth: '580px', lineHeight: 1.75, marginBottom: '2.75rem' }}
        >
          We design, supervise, and build world-class infrastructure that transforms cities and connects communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="hero-cta-row"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <Link to="/contact" className="btn-gold" style={{ padding: '0.95rem 2.25rem', fontSize: '0.9375rem' }}>
            Start a Project <ArrowRight size={16} />
          </Link>
          <Link to="/projects" className="btn-outline" style={{ padding: '0.95rem 2.25rem', fontSize: '0.9375rem' }}>
            Explore Projects
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.35)' }}
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  )
}

function StatsStrip() {
  return (
    <section className="section-cool" style={{ borderBottom: '1px solid var(--he-border)', padding: '4rem 1.5rem' }}>
      <div className="stats-grid he-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {stats.map((s, i) => (
          <AnimateIn key={s.label} delay={i * 0.07} direction="up">
            <div className="stat-card">
              <div className="stat-number"><CountUp value={s.number} /></div>
              <div style={{ color: 'var(--he-navy)', fontWeight: 700, fontSize: '0.9375rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: 'var(--he-text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{s.note}</div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="section-white" style={{ padding: '7rem 1.5rem' }}>
      <div className="about-grid he-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '5rem', alignItems: 'center' }}>
        {/* once={false}: this section replays its entrance on every scroll-through */}
        <AnimateIn direction="left" once={false}>
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 'var(--he-radius-xl)', overflow: 'hidden', aspectRatio: '4/5', boxShadow: 'var(--he-shadow-lg)' }}>
              <SmartImage src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80" alt="Construction excellence" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                background: 'linear-gradient(135deg, var(--he-amber), var(--he-amber-dark))',
                borderRadius: 'var(--he-radius-lg)',
                padding: '1.5rem 1.75rem',
                boxShadow: 'var(--he-shadow-amber)',
              }}
            >
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>18+</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8125rem', fontWeight: 600, marginTop: '0.3rem' }}>Years of Excellence</div>
            </motion.div>
            <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', width: '3.5rem', height: '3.5rem', borderTop: '3px solid var(--he-amber)', borderLeft: '3px solid var(--he-amber)', borderRadius: '0.375rem 0 0 0', pointerEvents: 'none' }} />
          </div>
        </AnimateIn>

        <AnimateIn direction="right" once={false}>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="he-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', margin: '0 0 1.5rem' }}>
            Crafting Excellence<br />In Every Structure
          </h2>
          <p className="he-body-lg" style={{ marginBottom: '1.125rem' }}>
            Founded in 2006 by engineer Hirut Kebede, we have grown from a regional road contractor into Ethiopia's most trusted construction partner. Every structure we build carries our name — and our promise.
          </p>
          <p className="he-body-lg" style={{ marginBottom: '2.25rem' }}>
            We combine internationally certified talent, premium imported materials, and rigorous project management to deliver outcomes that stand the test of time.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
            {['ISO 9001:2015 Certified Quality Management', 'FIDIC-Standard Contract Execution', '850+ In-House Engineers & Specialists'].map((v) => (
              <div key={v} className="check-item">
                <div className="check-item-icon">
                  <Check size={11} style={{ color: 'var(--he-amber)' }} strokeWidth={3} />
                </div>
                <span style={{ color: 'var(--he-text)', fontSize: '0.9375rem', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
          <Link to="/projects" className="btn-gold">
            Discover Our Work <ArrowRight size={15} />
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section-warm" style={{ padding: '7rem 1.5rem', borderTop: '1px solid var(--he-border)', borderBottom: '1px solid var(--he-border)' }}>
      <div className="he-container">
        <AnimateIn direction="up">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel center>What We Build</SectionLabel>
            <h2 className="he-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', margin: '0 0 1rem' }}>
              Expert Solutions For Every Build
            </h2>
            <p className="he-body-lg" style={{ maxWidth: '560px', margin: '0 auto' }}>
              From concept to completion, we provide construction services focused on quality, precision, and lasting performance.
            </p>
          </div>
        </AnimateIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {services.map((s, i) => (
            <AnimateIn key={s.title} delay={i * 0.09} direction="up">
              <motion.div className="service-card" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', position: 'relative' }}>
                  <SmartImage
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                  />
                </div>
                <div style={{ padding: '1.625rem' }}>
                  <h3 style={{ color: 'var(--he-navy)', fontWeight: 800, fontSize: '1.0625rem', margin: '0 0 0.625rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p className="he-body" style={{ fontSize: '0.875rem', margin: '0 0 1.25rem' }}>{s.description}</p>
                  <Link to="/projects" style={{ color: 'var(--he-amber-text)', fontSize: '0.8125rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                    Learn More <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="section-white" style={{ padding: '7rem 1.5rem' }}>
      <div className="process-grid he-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)', gap: '5rem', alignItems: 'start' }}>
        <AnimateIn direction="left" style={{ paddingTop: '0.5rem' }}>
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="he-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', margin: '0 0 1.25rem' }}>
            Turning Plans Into Structures
          </h2>
          <p className="he-body-lg" style={{ marginBottom: '2.25rem' }}>
            From the first consultation to final handover, our process is designed to deliver clarity, efficiency, and exceptional quality at every stage.
          </p>
          <Link to="/contact" className="btn-gold">
            Start Your Project <ArrowRight size={15} />
          </Link>
        </AnimateIn>

        <StaggerChildren className="process-steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {processSteps.map((p) => (
            <StaggerItem key={p.step}>
              <div className="process-card">
                <div style={{ position: 'absolute', top: '0.75rem', right: '1rem', fontSize: '3.5rem', fontWeight: 800, color: 'var(--he-surface-cool)', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none' }}>
                  {p.step}
                </div>
                <div className="icon-box" style={{ width: '2.5rem', height: '2.5rem', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--he-amber)', fontWeight: 800, fontSize: '0.8125rem' }}>{p.step}</span>
                </div>
                <h3 style={{ color: 'var(--he-navy)', fontWeight: 800, fontSize: '0.9375rem', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p className="he-body" style={{ fontSize: '0.8125rem', margin: 0 }}>{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const featured = projects.slice(0, 3)
  return (
    <section className="section-cool" style={{ padding: '7rem 1.5rem', borderTop: '1px solid var(--he-border)' }}>
      <div className="he-container">
        <AnimateIn direction="up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <SectionLabel>Our Projects</SectionLabel>
              <h2 className="he-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', margin: 0 }}>
                Landmark Projects
              </h2>
            </div>
            <Link to="/projects" className="btn-ghost">
              View All Projects <ArrowRight size={15} />
            </Link>
          </div>
        </AnimateIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {featured.map((p, i) => (
            <AnimateIn key={p.id} delay={i * 0.1} direction="up">
              <Link to="/projects/$projectId" params={{ projectId: p.id }} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div className="project-card" whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative' }}>
                    <SmartImage src={p.coverImage} alt={p.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                    />
                    <div className="project-card-overlay" />
                    <div style={{ position: 'absolute', bottom: '1.375rem', left: '1.375rem', right: '1.375rem' }}>
                      <span className="category-badge" style={{ background: 'var(--he-amber)', borderColor: 'var(--he-amber)', color: '#fff', marginBottom: '0.625rem' }}>
                        {p.category}
                      </span>
                      <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.125rem', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.name}</h3>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--he-border)' }}>
                    <span className="he-body" style={{ fontSize: '0.8125rem' }}>{p.location} · {p.year}</span>
                    <ArrowRight size={15} style={{ color: 'var(--he-amber)' }} />
                  </div>
                </motion.div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '8rem 1.5rem' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--he-navy)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,18,34,0.86)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,135,10,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, var(--he-amber), var(--he-amber-light), transparent)' }} />
      <div className="he-container" style={{ position: 'relative', maxWidth: '800px', textAlign: 'center' }}>
        <AnimateIn direction="up">
          <div className="section-label section-label--center">
            <span className="gold-line" />
            <span className="he-kicker" style={{ color: 'var(--he-amber-light)' }}>Ready to Build</span>
            <span className="gold-line" />
          </div>
          <h2 className="he-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#ffffff', margin: '0 0 1.25rem' }}>
            Constructing Your Vision<br />With Precision
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.0625rem', lineHeight: 1.85, maxWidth: '540px', margin: '0 auto 2.75rem' }}>
            Whether a single landmark structure or a national infrastructure programme — our team is ready to build it, right.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold" style={{ padding: '0.95rem 2.25rem', fontSize: '0.9375rem' }}>
              Schedule a Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/projects" className="btn-outline" style={{ padding: '0.95rem 2.25rem', fontSize: '0.9375rem' }}>
              View Our Work
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="section-white" style={{ padding: '7rem 1.5rem', borderTop: '1px solid var(--he-border)' }}>
      <div className="he-container">
        <AnimateIn direction="up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <SectionLabel center>Client Trust</SectionLabel>
          <h2 className="he-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', margin: 0 }}>
            What Our Clients Say About Us
          </h2>
        </AnimateIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <AnimateIn key={t.author} delay={i * 0.1} direction="up">
              <div className="testimonial-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Quote size={30} style={{ color: 'var(--he-amber)', opacity: 0.55, flexShrink: 0 }} />
                <p style={{ color: 'var(--he-text)', fontSize: '1rem', lineHeight: 1.85, margin: 0, flex: 1, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', borderTop: '1px solid var(--he-border)', paddingTop: '1.375rem' }}>
                  <div style={{ width: '2.875rem', height: '2.875rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--he-amber), var(--he-amber-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.0625rem', flexShrink: 0 }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ color: 'var(--he-navy)', fontWeight: 700, fontSize: '0.9375rem' }}>{t.author}</div>
                    <div style={{ color: 'var(--he-text-muted)', fontSize: '0.8125rem', marginTop: '0.15rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
