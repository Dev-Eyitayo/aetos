import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
// import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
  Shield,
  ChevronDown,
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useFirebaseSubmit } from '../hooks/useFirebaseSubmit'
import CTABanner from '../components/sections/CTABanner'

// ── Data ──────────────────────────────────────────────────────────────────────
const emailChannels = [
  { label: 'For General Inquiries',       value: 'info@company.com',         href: 'mailto:info@company.com'         },
  { label: 'For Business Collaborations', value: 'partnerships@company.com', href: 'mailto:partnerships@company.com' },
  { label: 'For Job Opportunities',       value: 'careers@company.com',      href: 'mailto:careers@company.com'      },
]

const phoneChannels = [
  { label: 'General Enquiries',       value: '+234 812 345 6789' },
  { label: 'Business Collaborations', value: '+234 812 345 6789' },
  { label: 'Free Consultation',       value: '+234 812 345 6789' },
]

const offices = [
  {
    city: 'New York City',
    address: '123 Main Street, Suite 456, New York, NY 10001',
    mapsUrl: 'https://maps.google.com/?q=New+York+City',
  },
  {
    city: 'San Francisco',
    address: '789 Tech Avenue, 10th Floor, San Francisco, CA 94105',
    mapsUrl: 'https://maps.google.com/?q=San+Francisco+CA',
  },
]

const subjects = [
  'General Inquiry',
  'Web Development',
  'Mobile App Development',
  'AI / ML Solutions',
  'QA Testing',
  'SEO Services',
  'Partnership / Collaboration',
  'Job Opportunity',
  'Other',
]

const socials = [
  { Icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn'  },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Twitter,   href: 'https://twitter.com',   label: 'X / Twitter' },
]

// ── Reusable atoms ────────────────────────────────────────────────────────────
function SectionHeading({
  title,
  subtitle,
  inView,
  delay = 0,
}: {
  title: string
  subtitle?: string
  inView: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-10"
    >
      <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-secondary font-body text-sm leading-relaxed max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

function Card({
  isDark,
  children,
  className = '',
}: {
  isDark: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        background: isDark ? '#111111' : '#ffffff',
        border: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
      }}
    >
      {children}
    </div>
  )
}

// ── Input / Textarea ──────────────────────────────────────────────────────────
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  isDark,
  required,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  isDark: boolean
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium text-secondary">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg px-4 py-3 text-sm font-body text-primary placeholder:text-muted outline-none transition-all duration-200"
        style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
          border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}`,
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-green)' }}
        onBlur={e => { e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#d8d8d8' }}
      />
    </div>
  )
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  isDark,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  isDark: boolean
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium text-secondary">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          className="w-full appearance-none rounded-lg px-4 py-3 text-sm font-body outline-none transition-all duration-200 cursor-pointer"
          style={{
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}`,
            color: value ? (isDark ? '#f5f5f5' : '#0a0a0a') : (isDark ? '#555' : '#aaa'),
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-green)' }}
          onBlur={e => { e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#d8d8d8' }}
        >
          <option value="" disabled>Select your Subject</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      </div>
    </div>
  )
}

function Textarea({
  label,
  placeholder,
  value,
  onChange,
  isDark,
  required = false,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  isDark: boolean
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium text-secondary">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        rows={5}
        className="w-full rounded-lg px-4 py-3 text-sm font-body text-primary placeholder:text-muted outline-none transition-all duration-200 resize-none"
        style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
          border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}`,
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-green)' }}
        onBlur={e => { e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#d8d8d8' }}
      />
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const { isDark } = useTheme()
  const { submit, loading } = useFirebaseSubmit('contact_messages')

  // Form state
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof typeof form) => (v: string) =>
    setForm(prev => ({ ...prev, [key]: v }))

  const canSubmit = form.name.trim() && form.email.trim() && form.phone.trim() && form.company.trim() && form.subject.trim() && form.message.trim()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    try {
      await submit({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.subject,
        message: form.message,
      })
      setSubmitted(true)
      // Reset form after successful submission
      setTimeout(() => {
        setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to submit form:', err)
    }
  }

  // Refs for scroll animations
  const heroRef    = useRef<HTMLDivElement>(null)
  const emailRef   = useRef<HTMLDivElement>(null)
  const phoneRef   = useRef<HTMLDivElement>(null)
  const officeRef  = useRef<HTMLDivElement>(null)
  const formRef    = useRef<HTMLDivElement>(null)
  const socialRef  = useRef<HTMLDivElement>(null)

  const heroInView   = useInView(heroRef,   { once: true, margin: '-60px' })
  const emailInView  = useInView(emailRef,  { once: true, margin: '-60px' })
  const phoneInView  = useInView(phoneRef,  { once: true, margin: '-60px' })
  const officeInView = useInView(officeRef, { once: true, margin: '-60px' })
  const formInView   = useInView(formRef,   { once: true, margin: '-60px' })
  const socialInView = useInView(socialRef, { once: true, margin: '-60px' })

  return (
    <>
      <div
        className={`min-h-screen pt-20 ${isDark ? "bg-[#0a0a0a]" : "bg-light"}`}
      >
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight"
          >
            <span className="text-primary">Get in </span>
            <span className="text-[#1181EA]">Touch with Us Today!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-secondary font-body text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8"
          >
            We value your inquiries, feedback, and collaborations. Whether you
            are interested in our digital services, have questions about our
            projects, or want to explore potential partnerships, we encourage
            you to reach out to our dedicated team. Connect with us through any
            of the channels below, and we'll be delighted to assist you on your
            digital journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="inline-flex items-center px-5 py-2.5 rounded-full font-body text-sm text-secondary"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
                border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
              }}
            >
              Feel free to contact us through any of the following channels
            </span>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 pb-20">
          {/* ── Email section ────────────────────────────────────────────────── */}
          <div ref={emailRef}>
            <SectionHeading title="Contact Us Via Email" inView={emailInView} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {emailChannels.map((ch, i) => (
                <motion.div
                  key={ch.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={emailInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card
                    isDark={isDark}
                    className="p-5 group hover:border-brand/30 transition-all duration-200"
                  >
                    <p className="text-muted text-xs font-body mb-3">
                      {ch.label}
                    </p>
                    <a
                      href={ch.href}
                      className="flex items-center justify-between gap-3 group/link"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail size={14} className="text-primary shrink-0" />
                        <span className="font-body text-sm text-primary truncate group-hover/link:text-primary transition-colors">
                          {ch.value}
                        </span>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 group-hover/link:bg-brand"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)",
                          border: `1px solid ${isDark ? "#2a2a2a" : "#d0d0d0"}`,
                        }}
                      >
                        <ArrowRight
                          size={12}
                          className="text-secondary group-hover/link:text-black transition-colors"
                        />
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Phone section ────────────────────────────────────────────────── */}
          <div ref={phoneRef}>
            <SectionHeading title="Contact Us By Phone" inView={phoneInView} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {phoneChannels.map((ch, i) => (
                <motion.div
                  key={ch.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={phoneInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card
                    isDark={isDark}
                    className="p-5 group hover:border-brand/30 transition-all duration-200"
                  >
                    <p className="text-muted text-xs font-body mb-3">
                      {ch.label}
                    </p>
                    <a
                      href={`tel:${ch.value.replace(/\s/g, "")}`}
                      className="flex items-center justify-between gap-3 group/link"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Phone size={14} className="text-primary shrink-0" />
                        <span className="font-body text-sm text-primary truncate group-hover/link:text-primary transition-colors">
                          {ch.value}
                        </span>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 group-hover/link:bg-brand"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)",
                          border: `1px solid ${isDark ? "#2a2a2a" : "#d0d0d0"}`,
                        }}
                      >
                        <ArrowRight
                          size={12}
                          className="text-secondary group-hover/link:text-black transition-colors"
                        />
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Office Locations ─────────────────────────────────────────────── */}
          <div ref={officeRef}>
            <SectionHeading
              title="Office Locations"
              subtitle="Visit our offices to have a face-to-face discussion with our team. We have locations in:"
              inView={officeInView}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office, i) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, y: 24 }}
                  animate={officeInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <Card
                    isDark={isDark}
                    className="overflow-hidden group hover:border-brand/25 transition-all duration-300"
                  >
                    {/* Map placeholder */}
                    <div
                      className="relative h-44 flex items-center justify-center overflow-hidden"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)"
                          : "linear-gradient(135deg, #e8e8e6 0%, #f0f0ee 100%)",
                      }}
                    >
                      {/* Grid texture */}
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
                          backgroundSize: "30px 30px",
                        }}
                      />
                      {/* Location pin icon */}
                      <div
                        className="relative w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.08)",
                          border: `1px solid ${isDark ? "#2a2a2a" : "#d0d0d0"}`,
                        }}
                      >
                        <MapPin size={20} className="text-primary" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-display font-bold text-base text-primary mb-1.5">
                        {office.city}
                      </h3>
                      <p className="text-secondary font-body text-xs leading-relaxed mb-4">
                        {office.address}
                      </p>
                      <a
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-display font-semibold text-primary hover:text-primary transition-colors group/dir"
                        style={{
                          border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
                          borderRadius: "0.5rem",
                          padding: "0.4rem 0.85rem",
                        }}
                      >
                        Get Direction
                        <ArrowRight
                          size={12}
                          className="group-hover/dir:translate-x-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Online Inquiry Form ───────────────────────────────────────────── */}
          <div ref={formRef}>
            <SectionHeading
              title="Online Inquiry Form"
              subtitle="Please fill in the following details, and we'll get back to you within 24 hours."
              inView={formInView}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Card isDark={isDark} className="p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center flex flex-col items-center gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(127,255,0,0.12)",
                        border: "2px solid rgba(127,255,0,0.3)",
                      }}
                    >
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-primary">
                      Inquiry Sent!
                    </h3>
                    <p className="text-secondary font-body text-sm max-w-sm">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="mt-2 px-6 py-2.5 rounded-lg border border-subtle text-secondary hover:border-brand hover:text-primary font-display font-semibold text-sm transition-all duration-200"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Row 1: Name / Email / Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Name"
                        placeholder="Enter your Name"
                        value={form.name}
                        onChange={set("name")}
                        isDark={isDark}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your Email"
                        value={form.email}
                        onChange={set("email")}
                        isDark={isDark}
                        required
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your Phone Number"
                        value={form.phone}
                        onChange={set("phone")}
                        isDark={isDark}
                        required
                      />
                    </div>

                    {/* Row 2: Company / Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Company / Organization Name"
                        placeholder="Enter Name"
                        value={form.company}
                        onChange={set("company")}
                        isDark={isDark}
                        required
                      />
                      <SelectInput
                        label="Subject"
                        value={form.subject}
                        onChange={set("subject")}
                        options={subjects}
                        isDark={isDark}
                        required
                      />
                    </div>

                    {/* Row 3: Message */}
                    <Textarea
                      label="Message"
                      placeholder="Enter your Message"
                      value={form.message}
                      onChange={set("message")}
                      isDark={isDark}
                      required
                    />

                    {/* Submit */}
                    <div className="flex justify-center pt-2">
                      <button
                        type="submit"
                        disabled={loading || !canSubmit}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary hover:text-primary transition-all duration-200 disabled:opacity-60 group"
                        style={{
                          border: `1px solid ${isDark ? "#383838" : "#bbb"}`,
                          cursor: canSubmit ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send your Inquiry
                            <ArrowRight
                              size={15}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Response + Privacy two-column info */}
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {[
                {
                  Icon: MessageCircle,
                  title: "Our Response",
                  body: "We understand the importance of timely responses, and our team is committed to addressing your inquiries promptly. Whether you have a specific project in mind, need advice on digital strategies, or want to explore partnership opportunities, we are here to assist you at every step.",
                },
                {
                  Icon: Shield,
                  title: "Privacy Assurance",
                  body: "We prioritize your privacy and protect your personal information in compliance with data protection regulations. Rest assured that your details will only be used for the purpose of addressing your inquiries and will not be shared with third parties without your consent.",
                },
              ].map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <Card isDark={isDark} className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.05)",
                          border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
                        }}
                      >
                        <Icon size={15} className="text-secondary" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-primary">
                        {title}
                      </h3>
                    </div>
                    <p className="text-secondary font-body text-xs leading-relaxed">
                      {body}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Join us on Social Media ───────────────────────────────────────── */}
          <div ref={socialRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="text-center flex flex-col items-center gap-6"
            >
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-primary mb-3">
                  Join Us on Social Media
                </h2>
                <p className="text-secondary font-body text-sm leading-relaxed max-w-md mx-auto">
                  Stay updated with our latest projects, industry insights, and
                  company news by following us on social media.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-brand hover:text-primary text-secondary"
                    style={{
                      borderColor: isDark ? "#2a2a2a" : "#d8d8d8",
                      background: isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.04)",
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Thank you */}
              <div className="pt-4">
                <h3 className="font-display font-bold text-lg text-primary mb-1.5">
                  Thank You!
                </h3>
                <p className="text-secondary font-body text-sm">
                  For considering Us for your digital needs. We look forward to
                  connecting with you and being part of your digital success!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
