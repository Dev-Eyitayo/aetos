import { useState, useEffect, FormEvent, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check } from 'lucide-react'
import { useModal } from '../../hooks/useModal'
import { useTheme } from '../../hooks/useTheme'
import { useFirebaseSubmit } from '../../hooks/useFirebaseSubmit'

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  name: string
  email: string
  phone: string
  company: string
  services: string[]
  projectDescription: string
  budget: string
  timeline: string
}

// ── Static data ───────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  'New Product / Software Development',
  'Website or Mobile App',
  'Hire Developers',
  'UI/UX Design',
  'Product Consultation',
  'Others',
]

const BUDGET_OPTIONS = [
  'Not sure yet',
  '₦500k – ₦1m',
  '₦1m – ₦5m',
  '₦5m+',
]

const TIMELINE_OPTIONS = [
  'Immediately',
  '1–3 months',
  '3–6 months',
  'Flexible',
]

// ── Reusable field atoms ──────────────────────────────────────────────────────
function FieldInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  hint,
  isDark,
  required = false,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  hint?: string
  isDark: boolean
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
      <label className="font-body text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200"
        style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
          border: `1px solid ${focused ? 'var(--color-brand-green)' : isDark ? '#2a2a2a' : '#d8d8d8'}`,
          color: isDark ? '#f0f0f0' : '#111',
        }}
      />
      {hint && (
        <span className="text-xs font-body" style={{ color: isDark ? '#555' : '#aaa' }}>{hint}</span>
      )}
    </div>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
  isDark,
}: {
  label: string
  checked: boolean
  onChange: () => void 
  isDark: boolean
}) {
  return (
    <label
      // Add the onClick handler here
      onClick={onChange}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 select-none"
      style={{
        background: checked
          ? isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
          : 'transparent',
        border: `1px solid ${checked ? isDark ? '#333' : '#c0c0c0' : 'transparent'}`,
      }}
    >
      {/* Custom checkbox */}
      <span
        className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-150"
        style={{
          background: checked ? 'var(--color-brand-green)' : isDark ? '#222' : '#eee',
          border: `1.5px solid ${checked ? 'var(--color-brand-green)' : isDark ? '#3a3a3a' : '#ccc'}`,
        }}
      >
        {checked && <Check size={12} strokeWidth={3} color="#000" />}
      </span>
      <span className="font-body text-sm" style={{ color: isDark ? '#d0d0d0' : '#222' }}>
        {label}
      </span>
    </label>
  )
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function SectionCard({
  title,
  isDark,
  children,
}: {
  title: string
  isDark: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
      }}
    >
      <h3 className="font-display font-bold text-sm text-primary">{title}</h3>
      {children}
    </div>
  )
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function ConsultationModal() {
  const { isOpen, closeModal } = useModal()
  const { isDark } = useTheme()
  const { submit, loading } = useFirebaseSubmit('consultation_requests')
  const scrollRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', company: '',
    services: ['New Product / Software Development'],
    projectDescription: '',
    budget: 'Not sure yet',
    timeline: 'Immediately',
  })
  const [submitted, setSubmitted] = useState(false)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeModal])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false)
        setForm({
          name: '', email: '', phone: '', company: '',
          services: ['New Product / Software Development'],
          projectDescription: '',
          budget: 'Not sure yet',
          timeline: 'Immediately',
        })
      }, 400)
    }
  }, [isOpen])

  const setField = (key: keyof FormState) => (v: string) =>
    setForm(prev => ({ ...prev, [key]: v }))

  const toggleService = (s: string) =>
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter(x => x !== s)
        : [...prev.services, s],
    }))

  const setBudget   = (b: string) => setForm(prev => ({ ...prev, budget: b }))
  const setTimeline = (t: string) => setForm(prev => ({ ...prev, timeline: t }))

  // Validation
  const canSubmit = form.name.trim() && form.email.trim() && form.company.trim() && form.projectDescription.trim() && form.services.length > 0

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    try {
      await submit({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        services: form.services,
        projectDescription: form.projectDescription,
        budget: form.budget,
        timeline: form.timeline,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit form:', err)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
          />

          {/* Modal sheet */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none"
            style={{ padding: '2rem 1rem' }}
          >
            <div
              ref={scrollRef}
              className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: isDark ? '#0e0e0e' : '#f8f8f6',
                border: `1px solid ${isDark ? '#222' : '#d8d8d8'}`,
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#2a2a2a transparent' : '#d0d0d0 transparent',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* ── Close button ──────────────────────────────────────────── */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  border: `1px solid ${isDark ? '#2a2a2a' : '#d0d0d0'}`,
                }}
                aria-label="Close modal"
              >
                <X size={15} className="text-secondary" />
              </button>

              {/* ── Success state ─────────────────────────────────────────── */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-24 px-8 flex flex-col items-center text-center gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(127,255,0,0.12)', border: '2px solid rgba(127,255,0,0.35)' }}
                    >
                      <Check size={32} className="text-brand" strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-primary">Request Submitted!</h3>
                    <p className="text-secondary font-body text-sm max-w-sm leading-relaxed">
                      We've received your consultation request and will review it shortly.
                      Expect a response within 24 hours.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-2 px-8 py-3.5 rounded-xl bg-brand text-black font-display font-bold text-sm hover:bg-[#5fcc00] transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (

                  /* ── Form ───────────────────────────────────────────────── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 p-6 sm:p-8"
                  >
                    {/* Header */}
                    <div className="text-center mb-2 pr-8">
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-2">
                        Let's Work Together
                      </h2>
                      <p className="text-secondary font-body text-sm">
                        Tell us a bit about what you need. We'll review it and get back to you shortly.
                      </p>
                    </div>

                    {/* ── Section 1: Personal / Company Details ─────────── */}
                    <SectionCard title="Personal/Company Details" isDark={isDark}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FieldInput
                          label="Name"
                          placeholder="Enter your Name"
                          value={form.name}
                          onChange={setField('name')}
                          isDark={isDark}
                          required
                        />
                        <FieldInput
                          label="Email"
                          type="email"
                          placeholder="Enter your Email"
                          value={form.email}
                          onChange={setField('email')}
                          hint="We'll use this to respond"
                          isDark={isDark}
                          required
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FieldInput
                          label="Phone Number"
                          type="tel"
                          placeholder="Enter your Phone Number"
                          value={form.phone}
                          onChange={setField('phone')}
                          isDark={isDark}
                        />
                        <FieldInput
                          label="Company / Brand Name"
                          placeholder="Enter Name"
                          value={form.company}
                          onChange={setField('company')}
                          isDark={isDark}
                          required
                        />
                      </div>
                    </SectionCard>

                    {/* ── Section 2: What Are You Reaching Out For? ─────── */}
                    <SectionCard title="What Are You Reaching Out For?" isDark={isDark}>
                      <p className="text-xs font-body" style={{ color: isDark ? '#555' : '#aaa', marginTop: -8 }}>
                        Select one or more options
                        <span className="text-brand ml-0.5">*</span>
                      </p>
                      <div className="flex flex-col gap-1">
                        {SERVICE_OPTIONS.map(s => (
                          <CheckRow
                            key={s}
                            label={s}
                            checked={form.services.includes(s)}
                            onChange={() => toggleService(s)}
                            isDark={isDark}
                          />
                        ))}
                      </div>
                    </SectionCard>

                    {/* ── Section 3: Project Details ────────────────────── */}
                    <SectionCard title="Project Details" isDark={isDark}>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                          Briefly describe your project or need
                          <span className="text-brand ml-0.5">*</span>
                        </label>
                        <textarea
                          placeholder="What are you trying to build or achieve?"
                          value={form.projectDescription}
                          required
                          onChange={e => setField('projectDescription')(e.target.value)}
                          rows={6}
                          className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200 resize-none"
                          style={{
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}`,
                            color: isDark ? '#f0f0f0' : '#111',
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-green)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#d8d8d8' }}
                        />
                      </div>
                    </SectionCard>

                    {/* ── Section 4: Budget + Timeline ──────────────────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Budget */}
                      <div
                        className="rounded-2xl p-6 flex flex-col gap-4"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                          border: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
                        }}
                      >
                        <h3 className="font-display font-bold text-sm text-primary">Budget Range</h3>
                        <div className="flex flex-col gap-1">
                          {BUDGET_OPTIONS.map(b => (
                            <CheckRow
                              key={b}
                              label={b}
                              checked={form.budget === b}
                              onChange={() => setBudget(b)}
                              isDark={isDark}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div
                        className="rounded-2xl p-6 flex flex-col gap-4"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                          border: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
                        }}
                      >
                        <h3 className="font-display font-bold text-sm text-primary">Timeline</h3>
                        <div className="flex flex-col gap-1">
                          {TIMELINE_OPTIONS.map(t => (
                            <CheckRow
                              key={t}
                              label={t}
                              checked={form.timeline === t}
                              onChange={() => setTimeline(t)}
                              isDark={isDark}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ── Submit ────────────────────────────────────────── */}
                    <div className="flex justify-center pt-2 pb-1">
                      <button
                        type="submit"
                        disabled={loading || !canSubmit}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-200 disabled:opacity-50 group"
                        style={{
                          background: isDark ? '#ffffff' : '#111111',
                          color: isDark ? '#000000' : '#ffffff',
                          border: 'none',
                          cursor: canSubmit ? 'pointer' : 'not-allowed',
                        }}
                        onMouseEnter={e => { if (canSubmit) { e.currentTarget.style.background = 'var(--color-brand-green)'; e.currentTarget.style.color = '#000' } }}
                        onMouseLeave={e => { if (canSubmit) { e.currentTarget.style.background = isDark ? '#ffffff' : '#111111'; e.currentTarget.style.color = isDark ? '#000' : '#fff' } }}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Submit Request
                            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
