import { Landmark, Plane, Factory, Droplets, Truck, Building2, HardHat, Banknote } from 'lucide-react'
import SectionLabel from './SectionLabel'
import AnimateIn from './AnimateIn'

/**
 * Client wordmarks rendered as typographic logos (icon + name) so there are
 * never broken logo images. Swap for real SVG/PNG logos when available.
 */
const clients = [
  { name: 'Ethiopian Roads Authority', icon: Truck },
  { name: 'Ethiopian Airlines', icon: Plane },
  { name: 'Commercial Bank of Ethiopia', icon: Banknote },
  { name: 'Ethio Telecom', icon: Building2 },
  { name: 'Hawassa Industrial Park', icon: Factory },
  { name: 'Awash Water Works', icon: Droplets },
  { name: 'Addis Ababa City Administration', icon: Landmark },
  { name: 'Derba Cement', icon: HardHat },
]

export default function ClientLogos() {
  // Track is duplicated so the -50% translate loops seamlessly
  const track = [...clients, ...clients]

  return (
    <section className="section-white" style={{ padding: '4.5rem 0 4rem', borderBottom: '1px solid var(--he-border)' }}>
      <AnimateIn direction="up">
        <div style={{ textAlign: 'center', marginBottom: '2.75rem', padding: '0 1.5rem' }}>
          <SectionLabel center>Trusted By</SectionLabel>
          <h2 className="he-heading" style={{ fontSize: 'clamp(1.375rem, 3vw, 1.75rem)', margin: 0 }}>
            Partners In Nation Building
          </h2>
        </div>
      </AnimateIn>

      <div className="logo-marquee" aria-label="Our clients">
        <div className="logo-track">
          {track.map((c, i) => {
            const Icon = c.icon
            return (
              <div className="logo-item" key={`${c.name}-${i}`} aria-hidden={i >= clients.length}>
                <span className="logo-item-icon"><Icon size={20} strokeWidth={1.75} /></span>
                <span className="logo-item-name">{c.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
