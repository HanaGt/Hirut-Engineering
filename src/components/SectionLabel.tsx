interface SectionLabelProps {
  children: string
  center?: boolean
}

export default function SectionLabel({ children, center }: SectionLabelProps) {
  return (
    <div className={`section-label${center ? ' section-label--center' : ''}`}>
      <span className="gold-line" />
      <span className="he-kicker">{children}</span>
      {center && <span className="gold-line" />}
    </div>
  )
}
