import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Package, Lock, CheckCircle, ToggleLeft, ToggleRight, X } from 'lucide-react'
import { CATEGORY_LABELS, CATEGORY_IMAGES, getItemImage, formatDate } from '../../lib/utils'
import { getInventory, createInventoryItem, deleteInventoryItem, toggleAvailability } from '../../lib/inventory'
import Select from '../../components/Select'
import SmartImage from '../../components/SmartImage'

export const Route = createFileRoute('/admin/')({ component: AdminPage })

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET ?? 'hirut-admin-2025'

interface ItemForm {
  name: string; category: string; arrivalDate: string; specs: string
  imageUrl: string; quantity: string; unit: string; available: boolean
}

const DEFAULT_FORM: ItemForm = {
  name: '', category: 'HEAVY_MACHINERY',
  arrivalDate: new Date().toISOString().split('T')[0],
  specs: '', imageUrl: '', quantity: '1', unit: 'unit', available: true,
}

function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)
  const [form, setForm] = useState<ItemForm>(DEFAULT_FORM)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const qc = useQueryClient()
  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventory({ data: {} }),
    enabled: authed,
  })

  const addMutation = useMutation({
    mutationFn: (data: Parameters<typeof createInventoryItem>[0]['data']) => createInventoryItem({ data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory'] })
      setForm(DEFAULT_FORM)
      setAddSuccess(true)
      setTimeout(() => { setAddSuccess(false); setShowForm(false) }, 1800)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteInventoryItem({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inventory'] }); setDeleteId(null) },
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, available }: { id: string; available: boolean }) => toggleAvailability({ data: { id, available } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inventory'] }),
  })

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_SECRET) { setAuthed(true); setAuthError(false) }
    else setAuthError(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate({
      name: form.name,
      category: form.category as 'HEAVY_MACHINERY' | 'STRUCTURAL_STEEL' | 'ELECTRICAL' | 'PLUMBING' | 'FINISHING_MATERIALS' | 'SAFETY_EQUIPMENT' | 'OTHER',
      arrivalDate: new Date(form.arrivalDate).toISOString(),
      specs: form.specs, imageUrl: form.imageUrl || undefined,
      quantity: parseInt(form.quantity, 10), unit: form.unit, available: form.available,
    })
  }

  if (!authed) {
    return (
      <div className="he-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--he-surface-cool)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
          className="form-card"
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 25 }}
            style={{ width: '3rem', height: '3rem', borderRadius: '0.625rem', background: 'rgba(217,119,6,0.1)', border: '1.5px solid rgba(217,119,6,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#d97706' }}
          >
            <Lock size={20} />
          </motion.div>
          <h1 style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.375rem', margin: '0 0 0.375rem', letterSpacing: '-0.01em' }}>Admin Access</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 1.75rem' }}>Enter the admin password to manage inventory.</p>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input className="he-input" type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            <AnimatePresence>
              {authError && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#dc2626', fontSize: '0.8125rem', margin: 0 }}>
                  Incorrect password. Try again.
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button type="submit" className="btn-gold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>Sign In</motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="he-page section-white" style={{ minHeight: '100vh' }}>
      <section className="page-header" style={{ padding: '3.5rem 1.5rem 2.5rem', textAlign: 'left' }}>
        <div className="he-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label">
              <span className="gold-line" />
              <span className="he-kicker">Management</span>
            </div>
            <h1 className="he-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', margin: 0 }}>
              Inventory Admin
            </h1>
            <p className="he-body" style={{ fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
              {items.length} item{items.length !== 1 ? 's' : ''} · Add, toggle availability, and remove materials.
            </p>
          </div>
          <motion.button
            className={showForm ? 'btn-light' : 'btn-gold'}
            onClick={() => { setShowForm(!showForm); setAddSuccess(false) }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={showForm ? 'close' : 'add'} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Item</>}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </section>

      <div className="he-container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        {/* Add form */}
        <AnimatePresence>
          {showForm && (
            <motion.div key="add-form" initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }} style={{ overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ background: '#ffffff', border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: '0.875rem', padding: '2rem', boxShadow: '0 4px 20px rgba(217,119,6,0.08)' }}>
                <AnimatePresence mode="wait">
                  {addSuccess ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '2.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} style={{ color: '#16a34a' }}>
                        <CheckCircle size={48} />
                      </motion.div>
                      <h3 style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.25rem', margin: 0 }}>Item Added</h3>
                      <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>The inventory has been updated successfully.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.125rem', margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>New Inventory Item</h2>
                      <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                          <div>
                            <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Item Name *</label>
                            <input className="he-input" required placeholder="e.g. 50-ton Crawler Crane" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                          </div>
                          <div>
                            <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Category *</label>
                            <Select
                              aria-label="Category"
                              value={form.category}
                              onChange={(category) => setForm({ ...form, category })}
                              options={Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))}
                            />
                          </div>
                          <div>
                            <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Arrival Date *</label>
                            <input className="he-input" type="date" required value={form.arrivalDate} onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })} />
                          </div>
                          <div>
                            <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Quantity *</label>
                            <input className="he-input" type="number" min="1" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                          </div>
                          <div>
                            <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Unit</label>
                            <input className="he-input" placeholder="e.g. units, tons, m³" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
                          </div>
                          <div>
                            <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Image URL</label>
                            <input className="he-input" type="url" placeholder="https://…" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                          </div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ color: '#374151', fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Specifications *</label>
                          <textarea className="he-textarea" required placeholder="Technical details, model numbers, condition, country of origin…" value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} style={{ minHeight: '6rem' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                          <input type="checkbox" id="available" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} style={{ width: '1rem', height: '1rem', accentColor: '#d97706' }} />
                          <label htmlFor="available" style={{ color: '#374151', fontSize: '0.875rem' }}>Mark as available</label>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <motion.button type="submit" className="btn-gold" disabled={addMutation.isPending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                            {addMutation.isPending ? 'Saving…' : 'Save Item'}
                          </motion.button>
                          <motion.button type="button" className="btn-light" onClick={() => setShowForm(false)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                            Cancel
                          </motion.button>
                        </div>
                        <AnimatePresence>
                          {addMutation.isError && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.75rem' }}>
                              Failed to save. Ensure the database is connected.
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Items list */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div key={i} animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ background: '#f1f5f9', borderRadius: '0.75rem', height: '72px', border: '1px solid #e2e8f0' }}
              />
            ))}
          </div>
        )}

        {isError && (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#fef2f2', borderRadius: '0.875rem', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>
            Failed to load inventory. Check database connection.
          </div>
        )}

        {!isLoading && !isError && (
          <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {items.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', background: '#f8fafc', borderRadius: '0.875rem', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
                <Package size={40} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                <p style={{ margin: 0 }}>No items yet. Add your first item above.</p>
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id} layout
                  initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                  style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.125rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <SmartImage src={getItemImage(item)} fallback={CATEGORY_IMAGES[item.category] ?? CATEGORY_IMAGES.OTHER} alt={item.name} loading="lazy" style={{ width: '56px', height: '48px', objectFit: 'cover', borderRadius: '0.375rem', flexShrink: 0, border: '1px solid #e2e8f0' }} />
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.2rem' }}>{item.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>
                      {CATEGORY_LABELS[item.category] ?? item.category} · {item.quantity} {item.unit} · Arrived {formatDate(item.arrivalDate)}
                    </div>
                  </div>

                  {/* Availability toggle */}
                  <motion.button
                    onClick={() => toggleMutation.mutate({ id: item.id, available: !item.available })}
                    disabled={toggleMutation.isPending}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.35rem 0.75rem',
                      borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                      background: item.available ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.07)',
                      border: `1px solid ${item.available ? 'rgba(22,163,74,0.25)' : 'rgba(220,38,38,0.2)'}`,
                      color: item.available ? '#16a34a' : '#dc2626',
                      transition: 'all 200ms',
                    }}
                  >
                    {item.available ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                    {item.available ? 'Available' : 'Unavailable'}
                  </motion.button>

                  {/* Delete / confirm */}
                  <AnimatePresence mode="wait">
                    {deleteId === item.id ? (
                      <motion.div key="confirm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Delete?</span>
                        <motion.button onClick={() => deleteMutation.mutate(item.id)} disabled={deleteMutation.isPending} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '0.375rem', color: '#dc2626', padding: '0.35rem 0.7rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                          {deleteMutation.isPending ? '…' : 'Yes'}
                        </motion.button>
                        <motion.button onClick={() => setDeleteId(null)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.375rem', color: '#64748b', padding: '0.35rem 0.7rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                          No
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.button key="trash" onClick={() => setDeleteId(item.id)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '0.375rem', color: '#dc2626', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        aria-label="Delete item">
                        <Trash2 size={14} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
