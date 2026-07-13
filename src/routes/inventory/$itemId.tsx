import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, Calendar, MessageSquare, Tag, CheckCircle, XCircle } from 'lucide-react'
import { CATEGORY_LABELS, CATEGORY_IMAGES, getItemImage, formatDate } from '../../lib/utils'
import { getInventoryItem } from '../../lib/inventory'
import AnimateIn from '../../components/AnimateIn'
import SmartImage from '../../components/SmartImage'

export const Route = createFileRoute('/inventory/$itemId')({
  loader: async ({ params }) => {
    const item = await getInventoryItem({ data: { id: params.itemId } })
    if (!item) throw notFound()
    return item
  },
  notFoundComponent: ItemNotFound,
  component: ItemDetailPage,
})

function ItemNotFound() {
  return (
    <div className="he-page section-white" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Package size={48} style={{ color: 'var(--he-border-strong)', marginBottom: '1rem' }} />
        <h1 className="he-heading" style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>Item Not Found</h1>
        <p className="he-body" style={{ margin: '0 0 1.75rem' }}>This item may have been sold or removed from inventory.</p>
        <Link to="/inventory" className="btn-gold">
          <ArrowLeft size={14} /> Back to Materials
        </Link>
      </div>
    </div>
  )
}

function ItemDetailPage() {
  const item = Route.useLoaderData()
  const label = CATEGORY_LABELS[item.category] ?? item.category

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="he-page section-white">
      <div className="he-container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <AnimateIn>
          <Link
            to="/inventory"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--he-text-secondary)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', marginBottom: '2.25rem', transition: 'color 200ms' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--he-amber-dark)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--he-text-secondary)' }}
          >
            <ArrowLeft size={14} /> Back to Materials
          </Link>
        </AnimateIn>

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '4rem', alignItems: 'start' }}>
          <AnimateIn direction="up" delay={0.05}>
            <div style={{ borderRadius: 'var(--he-radius-xl)', overflow: 'hidden', aspectRatio: '4 / 3', background: 'var(--he-surface-cool)', border: '1px solid var(--he-border)', boxShadow: 'var(--he-shadow-md)' }}>
              <SmartImage
                src={getItemImage(item)}
                fallback={CATEGORY_IMAGES[item.category] ?? CATEGORY_IMAGES.OTHER}
                alt={item.name}
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: item.available ? 'none' : 'grayscale(0.85)' }}
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.12}>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="category-badge">{label}</span>
              <span className={`status-badge ${item.available ? 'status-badge--available' : 'status-badge--unavailable'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                {item.available ? <CheckCircle size={11} /> : <XCircle size={11} />}
                {item.available ? 'Available' : 'Currently Unavailable'}
              </span>
            </div>

            <h1 className="he-heading" style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.25rem)', margin: '0 0 1.25rem' }}>{item.name}</h1>

            <div style={{ background: 'var(--he-surface-cool)', border: '1px solid var(--he-border)', borderRadius: 'var(--he-radius-lg)', padding: '1.5rem', marginBottom: '1.75rem' }}>
              {[
                { icon: <Tag size={14} />, label: 'Category', value: label },
                { icon: <Package size={14} />, label: 'Quantity in Stock', value: `${item.quantity} ${item.unit}` },
                { icon: <Calendar size={14} />, label: 'Arrival Date', value: formatDate(item.arrivalDate) },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: 'flex', gap: '0.75rem', paddingBottom: i < arr.length - 1 ? '1rem' : 0, marginBottom: i < arr.length - 1 ? '1rem' : 0, borderBottom: i < arr.length - 1 ? '1px solid var(--he-border)' : 'none' }}>
                  <span style={{ color: 'var(--he-amber-dark)', marginTop: 2, flexShrink: 0 }}>{row.icon}</span>
                  <div>
                    <div className="he-kicker" style={{ color: 'var(--he-text-muted)', fontSize: '0.68rem', marginBottom: '0.25rem' }}>{row.label}</div>
                    <div style={{ color: 'var(--he-navy)', fontSize: '0.9375rem', fontWeight: 600 }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="he-kicker" style={{ color: 'var(--he-text-muted)', margin: '0 0 0.625rem' }}>Specifications</h2>
            <p className="he-body" style={{ margin: '0 0 2rem', whiteSpace: 'pre-line' }}>{item.specs}</p>

            {item.available ? (
              <motion.a
                href={`mailto:info@hirutengineering.com?subject=Inquiry: ${encodeURIComponent(item.name)}`}
                className="btn-gold"
                style={{ padding: '0.9rem 2rem' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={15} /> Inquire About This Item
              </motion.a>
            ) : (
              <p className="he-body" style={{ fontSize: '0.875rem', margin: 0, padding: '0.875rem 1.25rem', background: 'var(--he-surface-warm)', border: '1px solid var(--he-border)', borderRadius: 'var(--he-radius-sm)' }}>
                This item is currently unavailable. <Link to="/contact">Contact us</Link> to ask about restocking.
              </p>
            )}
          </AnimateIn>
        </div>
      </div>
    </motion.div>
  )
}
