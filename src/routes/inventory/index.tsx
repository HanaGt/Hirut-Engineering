import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Package, Calendar, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CATEGORY_LABELS, CATEGORY_IMAGES, getItemImage, formatDate } from '../../lib/utils'
import { getInventory } from '../../lib/inventory'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import SmartImage from '../../components/SmartImage'

export const Route = createFileRoute('/inventory/')({ component: InventoryPage })

const CATEGORIES = ['All', ...Object.values(CATEGORY_LABELS)]

type InventoryItem = Awaited<ReturnType<typeof getInventory>>[number]

function InventoryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(id)
  }, [search])

  const categoryKey =
    category === 'All'
      ? undefined
      : Object.entries(CATEGORY_LABELS).find(([, v]) => v === category)?.[0]

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['inventory', debouncedSearch, categoryKey],
    queryFn: () => getInventory({ data: { q: debouncedSearch || undefined, category: categoryKey } }),
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="he-page section-white">
      <PageHeader
        label="Live Inventory"
        title="Imported Materials"
        description="Browse our live inventory of recently arrived construction materials and heavy machinery. All items are available for inquiry."
      />

      <div className="filter-bar">
        <div className="he-container" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px', maxWidth: '400px' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--he-text-muted)' }} />
            <input type="text" className="he-input" placeholder="Search materials…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={15} style={{ color: 'var(--he-text-muted)' }} />
            <Select
              aria-label="Filter by category"
              value={category}
              onChange={setCategory}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              style={{ minWidth: '200px' }}
            />
          </div>
          <span style={{ color: 'var(--he-text-muted)', fontSize: '0.8125rem', marginLeft: 'auto' }}>
            {isLoading ? 'Loading…' : `${items.length} item${items.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      <section className="he-container" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        {isLoading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ background: 'var(--he-surface-cool)', borderRadius: 'var(--he-radius-lg)', height: '340px', border: '1px solid var(--he-border)' }}
              />
            ))}
          </div>
        )}

        {isError && (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(220,38,38,0.05)', borderRadius: 'var(--he-radius-lg)', border: '1px solid rgba(220,38,38,0.15)' }}>
            <p style={{ margin: 0, color: 'var(--he-error)', fontWeight: 600 }}>Unable to load inventory. Ensure the database is connected.</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.8125rem', color: 'var(--he-text-secondary)' }}>
              Seed the database via the <Link to="/admin">Admin panel</Link>.
            </p>
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--he-surface-cool)', borderRadius: 'var(--he-radius-lg)', border: '1px solid var(--he-border)' }}>
            <Package size={48} style={{ marginBottom: '1rem', color: 'var(--he-border-strong)' }} />
            <p style={{ margin: '0 0 0.375rem', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--he-text)' }}>No items match your filters.</p>
            <p style={{ margin: '0 0 1.5rem', fontSize: '0.875rem', color: 'var(--he-text-muted)' }}>
              Try a different search term or category.
            </p>
            {(search !== '' || category !== 'All') && (
              <button className="btn-ghost" onClick={() => { setSearch(''); setCategory('All') }}>
                <RotateCcw size={13} /> Clear Filters
              </button>
            )}
          </div>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}>
                  <InventoryCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </motion.div>
  )
}

function InventoryCard({ item }: { item: InventoryItem }) {
  return (
    <motion.article
      className={`inventory-card${item.available ? '' : ' inventory-card--unavailable'}`}
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
      whileHover={item.available ? { y: -4 } : undefined}
      transition={{ duration: 0.22 }}
    >
      <Link to="/inventory/$itemId" params={{ itemId: item.id }} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Custom image when provided, otherwise the category's predefined image */}
        <div style={{ aspectRatio: '16 / 10', borderRadius: 'var(--he-radius-sm)', overflow: 'hidden', background: 'var(--he-surface-cool)' }}>
          <SmartImage
            src={getItemImage(item)}
            fallback={CATEGORY_IMAGES[item.category] ?? CATEGORY_IMAGES.OTHER}
            alt={item.name}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
          <span className="category-badge">{CATEGORY_LABELS[item.category] ?? item.category}</span>
          <span className={`status-badge ${item.available ? 'status-badge--available' : 'status-badge--unavailable'}`}>
            {item.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <h3 style={{ color: 'var(--he-navy)', fontWeight: 700, fontSize: '1.0625rem', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          {item.name}
        </h3>

        <p className="he-body" style={{ fontSize: '0.8125rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.specs}
        </p>
      </Link>

      <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8125rem', borderTop: '1px solid var(--he-border)', paddingTop: '1rem', marginTop: 'auto' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--he-text-secondary)' }}>
          <Package size={12} style={{ color: 'var(--he-amber-dark)' }} />{item.quantity} {item.unit}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--he-text-secondary)' }}>
          <Calendar size={12} style={{ color: 'var(--he-amber-dark)' }} />{formatDate(item.arrivalDate)}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.625rem' }}>
        <Link
          to="/inventory/$itemId"
          params={{ itemId: item.id }}
          className="btn-light"
          style={{ flex: 1, fontSize: '0.8125rem', padding: '0.65rem 1rem' }}
        >
          Details <ArrowRight size={13} />
        </Link>
        {item.available ? (
          <motion.a
            href={`mailto:info@hirutengineering.com?subject=Inquiry: ${encodeURIComponent(item.name)}`}
            className="btn-gold"
            style={{ flex: 1, fontSize: '0.8125rem', padding: '0.65rem 1rem' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare size={13} /> Inquire
          </motion.a>
        ) : (
          <span
            className="btn-gold"
            aria-disabled="true"
            style={{ flex: 1, fontSize: '0.8125rem', padding: '0.65rem 1rem', filter: 'grayscale(1)', opacity: 0.55, pointerEvents: 'none' }}
          >
            Unavailable
          </span>
        )}
      </div>
    </motion.article>
  )
}
