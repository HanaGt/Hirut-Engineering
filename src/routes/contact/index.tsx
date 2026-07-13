import { createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import AnimateIn from '../../components/AnimateIn'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import { StaggerChildren, StaggerItem } from '../../components/StaggerChildren'

export const Route = createFileRoute('/contact/')({ component: ContactPage })

function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', projectType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="he-page section-white">
      <PageHeader
        label="Contact Us"
        title="Get In Touch"
        description="Ready to discuss your project? Our senior engineers respond to all inquiries within 5 business days."
      />

      <div className="he-container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '4rem', alignItems: 'start' }}>
          <AnimateIn direction="up" delay={0.1}>
            <div className="form-card">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{ width: '4.25rem', height: '4.25rem', borderRadius: '50%', background: 'rgba(21,128,61,0.1)', border: '1.5px solid rgba(21,128,61,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <CheckCircle size={30} style={{ color: 'var(--he-success)' }} />
                    </motion.div>
                    <h2 className="he-heading" style={{ fontSize: '1.5rem', margin: 0 }}>Message Received</h2>
                    <p className="he-body" style={{ maxWidth: '380px', margin: 0 }}>
                      Thank you for reaching out. A member of our team will contact you within 5 business days.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="he-heading" style={{ fontSize: '1.375rem', margin: '0 0 0.375rem' }}>Project Inquiry</h2>
                    <p className="he-body" style={{ fontSize: '0.875rem', margin: '0 0 2rem' }}>
                      Fill in the details below and one of our senior engineers will follow up with you.
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div className="form-row-2">
                        <div>
                          <label className="he-label">Full Name *</label>
                          <input className="he-input" type="text" required placeholder="Abebe Bekele" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                          <label className="he-label">Company</label>
                          <input className="he-input" type="text" placeholder="Your Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                        </div>
                      </div>
                      <div className="form-row-2">
                        <div>
                          <label className="he-label">Email *</label>
                          <input className="he-input" type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                          <label className="he-label">Phone</label>
                          <input className="he-input" type="tel" placeholder="+251 9X XXX XXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                      </div>
                      <div>
                        <label className="he-label">Project Type</label>
                        <Select
                          aria-label="Project type"
                          placeholder="Select a project type…"
                          value={form.projectType}
                          onChange={(projectType) => setForm({ ...form, projectType })}
                          options={[
                            'Infrastructure & Roads',
                            'Commercial Building',
                            'Industrial Facility',
                            'Water & Sanitation',
                            'Other',
                          ].map((v) => ({ value: v, label: v }))}
                        />
                      </div>
                      <div>
                        <label className="he-label">Message *</label>
                        <textarea className="he-textarea" required placeholder="Tell us about your project — scope, location, timeline, and any specific requirements…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      </div>
                      <motion.button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start' }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        Send Message <Send size={14} />
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimateIn>

          <StaggerChildren style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: <MapPin size={18} />, label: 'Office', value: 'Bole Sub-city, Woreda 03\nAddis Ababa, Ethiopia' },
              { icon: <Phone size={18} />, label: 'Phone', value: '+251 11 234 5678\n+251 91 234 5678' },
              { icon: <Mail size={18} />, label: 'Email', value: 'info@hirutengineering.com\nprojects@hirutengineering.com' },
              { icon: <Clock size={18} />, label: 'Working Hours', value: 'Mon – Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 1:00 PM' },
            ].map((item) => (
              <StaggerItem key={item.label} className="info-card">
                <div className="icon-box">{item.icon}</div>
                <div>
                  <div className="he-kicker" style={{ color: 'var(--he-text-muted)', marginBottom: '0.375rem' }}>{item.label}</div>
                  <div style={{ color: 'var(--he-text)', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-line', fontWeight: 500 }}>{item.value}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </motion.div>
  )
}
