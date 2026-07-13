import { Link } from '@tanstack/react-router'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="he-container" style={{ paddingTop: '5rem', paddingBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3.5rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'linear-gradient(135deg, var(--he-amber), var(--he-amber-dark))',
                  borderRadius: '0.625rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px var(--he-amber-glow)',
                }}
              >
                <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem' }}>H</span>
              </div>
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>HIRUT</div>
                <div style={{ color: '#64748b', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Engineering</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '300px', margin: '0 0 1.75rem' }}>
              Building Ethiopia's landmark infrastructure since 2006. From highways to high-rises, we deliver excellence at every scale.
            </p>
            <Link to="/contact" className="btn-ghost" style={{ fontSize: '0.8125rem', padding: '0.55rem 1.125rem' }}>
              Start a Project <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <h4 className="he-kicker" style={{ color: '#64748b', marginBottom: '1.5rem', marginTop: 0 }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/projects', label: 'Projects' },
                { to: '/inventory', label: 'Imported Materials' },
                { to: '/contact', label: 'Contact Us' },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 200ms, transform 200ms', display: 'inline-block' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--he-amber-light)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(3px)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="he-kicker" style={{ color: '#64748b', marginBottom: '1.5rem', marginTop: 0 }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {['Infrastructure & Roads', 'Commercial Buildings', 'Industrial Facilities', 'Water & Sanitation', 'Project Management'].map((s) => (
                <span key={s} style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="he-kicker" style={{ color: '#64748b', marginBottom: '1.5rem', marginTop: 0 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--he-amber)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.65 }}>Bole Sub-city, Woreda 03<br />Addis Ababa, Ethiopia</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--he-amber)', flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>+251 11 234 5678</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--he-amber)', flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>info@hirutengineering.com</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2rem' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#475569', fontSize: '0.8125rem', margin: 0 }}>
            © {new Date().getFullYear()} Hirut Engineering PLC. All rights reserved.
          </p>
          <p style={{ color: '#475569', fontSize: '0.8125rem', margin: 0 }}>
            Addis Ababa · Ethiopia · Est. 2006
          </p>
        </div>
      </div>
    </footer>
  )
}
