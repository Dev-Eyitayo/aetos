import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check } from 'lucide-react'
import { useModal } from '../../hooks/useModal'
import { useTheme } from '../../hooks/useTheme'

// ── Types ─────────────────────────────────────────────────────────────────────
interface InternForm {
  name: string
  email: string
  phone: string
  track: string
  skillLevel: string
  portfolioLink: string
  background: string
  availability: string
  hasLaptop: string
  hasInternet: string
  motivation: string
}

const EMPTY: InternForm = {
  name: '', email: '', phone: '',
  track: 'Frontend Developer',
  skillLevel: 'Beginner',
  portfolioLink: '',
  background: '',
  availability: 'Full-time',
  hasLaptop: 'Yes',
  hasInternet: 'Yes',
  motivation: '',
}

// ── Static options ────────────────────────────────────────────────────────────
const TRACKS = [
  'Frontend Developer',
  'Backend Developer',
  'Mobile App Developer',
  'UI/UX Designer',
  'Product Intern',
  'QA / Software Tester',
]

const SKILL_LEVELS  = ['Beginner', 'Intermediate', 'Advanced']
const AVAILABILITY  = ['Full-time', 'Part-time']
const YES_NO        = ['Yes', 'No']

// ── Shared atoms ──────────────────────────────────────────────────────────────
function FieldInput({
  label, type = 'text', placeholder, value, onChange, isDark, required,
}: {
  label: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void
  isDark: boolean; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
        {label}
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
    </div>
  )
}

function CheckRow({
  label, checked, onChange, isDark, small = false,
}: {
  label: string; checked: boolean; onChange: () => void
  isDark: boolean; small?: boolean
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-150 select-none ${small ? 'px-3 py-2' : 'px-4 py-3'}`}
      style={{
        background: checked
          ? isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
          : 'transparent',
        border: `1px solid ${checked ? isDark ? '#333' : '#b8b8b8' : 'transparent'}`,
      }}
    >
      <span
        className="flex items-center justify-center shrink-0 rounded transition-all duration-150"
        style={{
          width: small ? 16 : 18,
          height: small ? 16 : 18,
          background: checked ? 'var(--color-brand-green)' : isDark ? '#222' : '#eee',
          border: `1.5px solid ${checked ? 'var(--color-brand-green)' : isDark ? '#3a3a3a' : '#ccc'}`,
        }}
      >
        {checked && <Check size={small ? 10 : 11} strokeWidth={3} color="#000" />}
      </span>
      <span className="font-body text-sm" style={{ color: isDark ? '#d0d0d0' : '#222' }}>
        {label}
      </span>
    </label>
  )
}

function SectionCard({
  title, hint, isDark, children, className = '',
}: {
  title: string; hint?: string; isDark: boolean
  children: React.ReactNode; className?: string
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 flex flex-col gap-4 ${className}`}
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
      }}
    >
      <div>
        <h3 className="font-display font-bold text-sm text-primary inline">{title}</h3>
        {hint && (
          <span className="font-body text-xs ml-1.5" style={{ color: isDark ? '#555' : '#aaa' }}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function InternshipModal() {
  const { activeModal, closeModalById } = useModal()
  const { isDark } = useTheme()
  const isOpen = activeModal === 'internship'

  const [form, setForm]         = useState<InternForm>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const set = (key: keyof InternForm) => (v: string) =>
    setForm(prev => ({ ...prev, [key]: v }))

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModalById() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [closeModalById])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setSubmitted(false); setLoading(false); setForm(EMPTY) }, 400)
    }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="intern-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModalById}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.84)', backdropFilter: 'blur(6px)' }}
          />

          {/* Sheet */}
          <motion.div
            key="intern-modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none"
            style={{ padding: '2rem 1rem' }}
          >
            <div
              className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: isDark ? '#0e0e0e' : '#f8f8f6',
                border: `1px solid ${isDark ? '#222' : '#d8d8d8'}`,
                boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#2a2a2a transparent' : '#d0d0d0 transparent',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModalById}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  border: `1px solid ${isDark ? '#2a2a2a' : '#d0d0d0'}`,
                }}
              >
                <X size={15} className="text-secondary" />
              </button>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success ── */
                  <motion.div
                    key="intern-success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
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
                    <h3 className="font-display font-bold text-2xl text-primary">Application Submitted!</h3>
                    <p className="text-secondary font-body text-sm max-w-sm leading-relaxed">
                      Thanks for applying! We'll review your application and reach out within a few business days.
                    </p>
                    <button
                      onClick={closeModalById}
                      className="mt-2 px-8 py-3.5 rounded-xl bg-brand text-black font-display font-bold text-sm hover:bg-[#5fcc00] transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="intern-form"
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
                      <p className="text-secondary font-body text-sm leading-relaxed">
                        Tell us a bit about what you need. We'll review it and get back to you shortly.
                      </p>
                    </div>

                    {/* ── 1. Personal / Company Details ─────────────────── */}
                    <SectionCard title="Personal/Company Details" isDark={isDark}>
                      <FieldInput
                        label="Name"
                        placeholder="Enter your Name"
                        value={form.name}
                        onChange={set('name')}
                        isDark={isDark}
                        required
                      />
                      <FieldInput
                        label="Email"
                        type="email"
                        placeholder="Enter your Email"
                        value={form.email}
                        onChange={set('email')}
                        isDark={isDark}
                        required
                      />
                      <FieldInput
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your Phone Number"
                        value={form.phone}
                        onChange={set('phone')}
                        isDark={isDark}
                      />
                    </SectionCard>

                    {/* ── 2. Internship Track ────────────────────────────── */}
                    <SectionCard title="Internship Track" isDark={isDark}>
                      <p className="text-xs font-body -mt-2" style={{ color: isDark ? '#555' : '#aaa' }}>
                        Select your preferred role
                      </p>
                      <div className="flex flex-col gap-1">
                        {TRACKS.map(t => (
                          <CheckRow
                            key={t}
                            label={t}
                            checked={form.track === t}
                            onChange={() => set('track')(t)}
                            isDark={isDark}
                          />
                        ))}
                      </div>
                    </SectionCard>

                    {/* ── 3. Skill Level + Portfolio ─────────────────────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Skill Level */}
                      <SectionCard title="Skill Level" isDark={isDark}>
                        <div className="flex flex-col gap-1">
                          {SKILL_LEVELS.map(s => (
                            <CheckRow
                              key={s}
                              label={s}
                              checked={form.skillLevel === s}
                              onChange={() => set('skillLevel')(s)}
                              isDark={isDark}
                            />
                          ))}
                        </div>
                      </SectionCard>

                      {/* Portfolio */}
                      <SectionCard
                        title="Portfolio / GitHub / Dribbble"
                        hint="(Optional but encouraged)"
                        isDark={isDark}
                      >
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                            Link to your work
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/yourname"
                            value={form.portfolioLink}
                            onChange={e => set('portfolioLink')(e.target.value)}
                            className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200"
                            style={{
                              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                              border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}`,
                              color: isDark ? '#f0f0f0' : '#111',
                              minHeight: '100px',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-green)' }}
                            onBlur={e => { e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#d8d8d8' }}
                          />
                        </div>
                      </SectionCard>
                    </div>

                    {/* ── 4. Experience & Background ─────────────────────── */}
                    <SectionCard title="Experience & Background" isDark={isDark}>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                          Tell us about yourself
                        </label>
                        <textarea
                          placeholder="Your background, what you're learning, or what excites you about tech."
                          value={form.background}
                          onChange={e => set('background')(e.target.value)}
                          rows={5}
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

                    {/* ── 5. Availability + Access Check ─────────────────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Availability */}
                      <SectionCard title="Availability" isDark={isDark}>
                        <div className="flex flex-col gap-1">
                          {AVAILABILITY.map(a => (
                            <CheckRow
                              key={a}
                              label={a}
                              checked={form.availability === a}
                              onChange={() => set('availability')(a)}
                              isDark={isDark}
                            />
                          ))}
                        </div>
                      </SectionCard>

                      {/* Access Check */}
                      <SectionCard title="Access Check" isDark={isDark}>
                        {/* Laptop row */}
                        <div>
                          <p className="font-body text-xs text-secondary mb-2">Do you have a laptop?</p>
                          <div className="flex items-center gap-2">
                            {YES_NO.map(v => (
                              <CheckRow
                                key={`laptop-${v}`}
                                label={v}
                                checked={form.hasLaptop === v}
                                onChange={() => set('hasLaptop')(v)}
                                isDark={isDark}
                                small
                              />
                            ))}
                          </div>
                        </div>
                        {/* Divider */}
                        <div className="h-px" style={{ background: isDark ? '#1e1e1e' : '#e8e8e8' }} />
                        {/* Internet row */}
                        <div>
                          <p className="font-body text-xs text-secondary mb-2">Do you have stable internet access?</p>
                          <div className="flex items-center gap-2">
                            {YES_NO.map(v => (
                              <CheckRow
                                key={`internet-${v}`}
                                label={v}
                                checked={form.hasInternet === v}
                                onChange={() => set('hasInternet')(v)}
                                isDark={isDark}
                                small
                              />
                            ))}
                          </div>
                        </div>
                      </SectionCard>
                    </div>

                    {/* ── 6. Motivation ──────────────────────────────────── */}
                    <SectionCard title="Motivation" isDark={isDark}>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                          Why do you want to join this internship?
                        </label>
                        <textarea
                          placeholder="What motivates you to join us?"
                          value={form.motivation}
                          onChange={e => set('motivation')(e.target.value)}
                          rows={4}
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

                    {/* ── Submit ─────────────────────────────────────────── */}
                    <div className="flex justify-center pt-2 pb-1">
                      <button
                        type="submit"
                        disabled={loading || !form.name || !form.email}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-200 disabled:opacity-50 group"
                        style={{
                          background: isDark ? '#ffffff' : '#111111',
                          color: isDark ? '#000000' : '#ffffff',
                          border: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'var(--color-brand-green)'
                          e.currentTarget.style.color = '#000'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = isDark ? '#ffffff' : '#111111'
                          e.currentTarget.style.color = isDark ? '#000' : '#fff'
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Apply Now
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
