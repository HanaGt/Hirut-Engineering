import SectionLabel from './SectionLabel'
import AnimateIn from './AnimateIn'

/**
 * Partner logos served from local files in /public/logos — they always
 * exist and load instantly (remote logo CDNs proved unreliable).
 *
 * Each SVG follows the partner's real brand identity. To use an official
 * logo file, drop it into /public/logos with the same filename (any image
 * format works — just update the path here).
 */
const clients = [
  { name: 'Ethiopian Airlines', logo: '/logos/ethiopian-airlines.svg' },
  { name: 'Commercial Bank of Ethiopia', logo: '/logos/commercial-bank-ethiopia.svg' },
  { name: 'Ethio Telecom', logo: '/logos/ethio-telecom.svg' },
  { name: 'Ethiopian Roads Administration', logo: '/logos/ethiopian-roads-authority.svg' },
  { name: 'Industrial Parks Dev. Corporation', logo: '/logos/hawassa-industrial-park.svg' },
  { name: 'Awash Bank', logo: '/logos/awash-bank.svg' },
  { name: 'Addis Ababa City Administration', logo: '/logos/addis-ababa-city.svg' },
  { name: 'Derba Cement', logo: '/logos/derba-cement.svg' },
]

export default function ClientLogos() {
  // Track is duplicated so the -50% translate loops seamlessly
  const track = [...clients, ...clients]

  return (
    <section className="section-white" style={{ padding: '5rem 0 4.5rem', borderBottom: '1px solid var(--he-border)' }}>
      <AnimateIn direction="up">
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1.5rem' }}>
          <SectionLabel center>Trusted By</SectionLabel>
          <h2 className="he-heading" style={{ fontSize: 'clamp(1.375rem, 3vw, 1.75rem)', margin: 0 }}>
            Partners In Nation Building
          </h2>
        </div>
      </AnimateIn>

      <div className="logo-marquee" aria-label="Our clients">
        <div className="logo-track">
          {track.map((c, i) => (
            <div className="logo-item" key={`${c.name}-${i}`} aria-hidden={i >= clients.length}>
              <img src={c.logo} alt={`${c.name} logo`} className="logo-img" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
