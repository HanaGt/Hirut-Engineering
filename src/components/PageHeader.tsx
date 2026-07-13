import AnimateIn from './AnimateIn'
import SectionLabel from './SectionLabel'

interface PageHeaderProps {
  label: string
  title: string
  description?: string
}

/**
 * Light tinted page hero — visibly distinct from the white content below
 * without going dark.
 */
export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="page-header page-header--tinted">
      <AnimateIn>
        <SectionLabel center>{label}</SectionLabel>
        <h1
          className="he-display"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem' }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="he-body-lg"
            style={{ maxWidth: '540px', margin: '0 auto' }}
          >
            {description}
          </p>
        )}
      </AnimateIn>
    </section>
  )
}
