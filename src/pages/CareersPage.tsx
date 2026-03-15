import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
// import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Monitor,
  Code2,
  Smartphone,
  Figma,
  BarChart3,
  TestTube2,
  Users,
  BookOpen,
  Briefcase,
  Star,
  Laptop,
  Wifi,
  Brain,
  Heart,
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useModal } from '../hooks/useModal'
import CTABanner from '../components/sections/CTABanner'

// ── Shared data ───────────────────────────────────────────────────────────────
const tracks = [
  { id: 'frontend', Icon: Monitor,   title: 'Frontend Development',   subtitle: 'React, Next.js'           },
  { id: 'backend',  Icon: Code2,     title: 'Backend Development',    subtitle: 'Node.js, Laravel, Python' },
  { id: 'mobile',   Icon: Smartphone,title: 'Mobile App Development', subtitle: 'Flutter, React Native'    },
  { id: 'design',   Icon: Figma,     title: 'UI/UX Design',           subtitle: ''                         },
  { id: 'product',  Icon: BarChart3, title: 'Product Management',     subtitle: ''                         },
  { id: 'qa',       Icon: TestTube2, title: 'QA & Software Testing',  subtitle: ''                         },
]

const whatYoullGet = [
  { Icon: Star,      label: 'Real projects'       },
  { Icon: Users,     label: 'Mentorship'           },
  { Icon: BookOpen,  label: 'Team experience'      },
  { Icon: Briefcase, label: 'Portfolio-ready work' },
  { Icon: Heart,     label: 'Possible job offer'   },
]

const requirements = [
  { Icon: Laptop,    label: 'Laptop'               },
  { Icon: Wifi,      label: 'Stable Internet'      },
  { Icon: Brain,     label: 'Willingness to learn' },
  { Icon: Heart,     label: 'Good Behavior'        },
]

// ── Shared atoms ──────────────────────────────────────────────────────────────
function Divider({ isDark }: { isDark: boolean }) {
  return <div className="w-full h-px" style={{ background: isDark ? '#1e2018' : '#dde8cc' }} />
}

// ── Internship Panel ──────────────────────────────────────────────────────────
function InternshipPanel({ isDark, onApply }: { isDark: boolean; onApply: () => void }) {
  return (
    <motion.div
      key="internship"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(160deg, #141c0e 0%, #0f1508 100%)'
          : 'linear-gradient(160deg, #f2f8e8 0%, #e6f2d4 100%)',
        border: `1px solid ${isDark ? '#1e2a14' : '#c8dca8'}`,
      }}
    >
      {/* Header */}
      <div className="px-6 sm:px-10 pt-10 pb-8 text-center">
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-brand">
          Internship Program
        </h2>
        <p className="text-secondary font-body text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          If you want real experience, not just certificates — this is for you.
          <br className="hidden sm:block" />
          This internship is built for people who want to grow by doing real work on real products.
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-10 flex flex-col gap-8">
        <Divider isDark={isDark} />

        {/* Tracks */}
        <div>
          <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-brand mb-5">
            Tracks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {tracks.map(({ id, Icon, title, subtitle }) => (
              <div
                key={id}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? '#262626' : '#d4d4d4'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(127,255,0,0.10)', border: '1px solid rgba(127,255,0,0.22)' }}
                >
                  <Icon size={15} className="text-brand" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-primary leading-tight">{title}</p>
                  {subtitle && <p className="text-muted text-xs font-body mt-0.5">{subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider isDark={isDark} />

        {/* What you'll get + Requirements */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display font-semibold text-sm text-primary mb-5">What You'll Get</h3>
            <ul className="flex flex-col gap-3.5">
              {whatYoullGet.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}` }}
                  >
                    <Icon size={13} className="text-secondary" />
                  </div>
                  <span className="font-body text-sm text-primary">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:border-l sm:pl-8" style={{ borderColor: isDark ? '#1e2018' : '#dde8cc' }}>
            <h3 className="font-display font-semibold text-sm text-primary mb-5">Requirements</h3>
            <ul className="flex flex-col gap-3.5">
              {requirements.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}` }}
                  >
                    <Icon size={13} className="text-secondary" />
                  </div>
                  <span className="font-body text-sm text-primary">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider isDark={isDark} />

        {/* Apply CTA */}
        <div className="flex justify-center">
          <button
            onClick={onApply}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary hover:text-brand transition-all duration-200 group"
            style={{ border: `1px solid ${isDark ? '#383838' : '#bbb'}` }}
          >
            Apply Now
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Hire Panel ────────────────────────────────────────────────────────────────
function HirePanel({ isDark, onConsult }: { isDark: boolean; onConsult: () => void }) {
  // Reuse the same track data but render in the "hire" style — icon above, title below
  const topRow = tracks.slice(0, 3)
  const bottomRow = tracks.slice(3)

  return (
    <motion.div
      key="hire"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark ? '#131313' : '#f4f4f2',
        border: `1px solid ${isDark ? '#202020' : '#d4d4d4'}`,
      }}
    >
      {/* Header */}
      <div className="px-6 sm:px-10 pt-10 pb-8 text-center">
        <h2
          className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4"
          style={{
            background: 'linear-gradient(130deg, #ffb899 0%, #ff8050 55%, #d05020 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Hire Developers &amp; Tech Talent
        </h2>
        <p className="text-secondary font-body text-sm sm:text-base">
          Hire developers without recruitment headaches.
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-10 flex flex-col gap-8">
        {/* Inner bordered tracks card */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${isDark ? '#242424' : '#d0d0d0'}` }}
        >
          {/* "Tracks" label row */}
          <div
            className="px-5 py-4"
            style={{ background: isDark ? '#0f0f0f' : '#ececea', borderBottom: `1px solid ${isDark ? '#1e1e1e' : '#d0d0d0'}` }}
          >
            <span className="font-display font-semibold text-xs uppercase tracking-widest text-brand">
              Tracks
            </span>
          </div>

          {/* Top 3 tracks — icon + title + subtitle stacked */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ borderBottom: `1px solid ${isDark ? '#1e1e1e' : '#d0d0d0'}` }}
          >
            {topRow.map(({ id, Icon, title, subtitle }, i) => (
              <div
                key={id}
                className="flex flex-col gap-3 p-5"
                style={{
                  background: isDark ? '#111111' : '#f8f8f6',
                  borderRight: i < 2 ? `1px solid ${isDark ? '#1e1e1e' : '#d0d0d0'}` : undefined,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${isDark ? '#2e2e2e' : '#d0d0d0'}` }}
                >
                  <Icon size={15} className="text-secondary" />
                </div>
                <div>
                  <p className="font-body font-bold text-sm text-primary">{title}</p>
                  {subtitle && <p className="text-muted text-xs font-body mt-0.5">{subtitle}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 3 tracks — icon + title only */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {bottomRow.map(({ id, Icon, title }, i) => (
              <div
                key={id}
                className="flex flex-col gap-3 p-5"
                style={{
                  background: isDark ? '#111111' : '#f8f8f6',
                  borderRight: i < 2 ? `1px solid ${isDark ? '#1e1e1e' : '#d0d0d0'}` : undefined,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${isDark ? '#2e2e2e' : '#d0d0d0'}` }}
                >
                  <Icon size={15} className="text-secondary" />
                </div>
                <p className="font-body font-bold text-sm text-primary">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consult CTA */}
        <div className="flex justify-center">
          <button
            onClick={onConsult}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary hover:text-brand transition-all duration-200 group"
            style={{ border: `1px solid ${isDark ? '#383838' : '#bbb'}` }}
          >
            Consult Us Today
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── We Value Your Interest ────────────────────────────────────────────────────
function ValueCard({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-2xl px-6 sm:px-8 py-8 flex flex-col gap-4"
      style={{
        background: isDark ? '#111111' : '#ffffff',
        border: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}` }}
        >
          <Heart size={16} className="text-brand" />
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg text-brand">
          We value your interest
        </h3>
      </div>
      <p className="text-secondary font-body text-sm sm:text-base leading-relaxed">
        We value your interest and appreciate the time and effort you put into your application.
        Our team looks forward to reviewing your application and finding the best talent to join
        our vibrant and innovative team. Apply now and take the next step towards an exciting
        and fulfilling career with Us!
      </p>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
type Tab = 'internship' | 'hire'

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('internship')
  const { isDark } = useTheme()
  const { openModalById } = useModal()

  return (
    <>
      <div className={`min-h-screen pt-20 relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-light'}`}>

        {/* Decorative dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {[[72,18],[28,35],[88,52],[15,68],[62,8],[45,42],[92,72],[5,25],[78,88],[35,12]].map(([l,t], i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width: 2, height: 2, background: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.10)', top: `${t}%`, left: `${l}%` }}
            />
          ))}
        </div>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4"
          >
            Learn. Build. Grow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-secondary font-body text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto"
          >
            Whether you're starting out or looking to work on meaningful projects,
            this is where growth begins.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {(['internship', 'hire'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-display font-semibold text-sm transition-all duration-200 group"
                style={{
                  borderColor: activeTab === tab
                    ? 'var(--color-brand-green)'
                    : isDark ? '#383838' : '#c0c0c0',
                  color: activeTab === tab ? 'var(--color-brand-green)' : isDark ? '#d0d0d0' : '#333',
                }}
              >
                {tab === 'internship' ? 'Apply For Internship' : 'Hire Developers or Tech Talents'}
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Tab Switcher ──────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-1 w-fit mx-auto rounded-xl p-1"
            style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? '#222' : '#ddd'}` }}
          >
            {(['internship', 'hire'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-5 py-2 rounded-lg font-display font-semibold text-sm transition-colors duration-200"
                style={{ color: activeTab === tab ? '#000' : isDark ? '#666' : '#888' }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="careers-tab-bg"
                    className="absolute inset-0 rounded-lg bg-brand"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.42 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative" style={{ zIndex: 1 }}>
                  {tab === 'internship' ? 'Internship' : 'Hire'}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Tab Panels ────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'internship'
              ? <InternshipPanel key="internship" isDark={isDark} onApply={() => openModalById('internship')} />
              : <HirePanel key="hire" isDark={isDark} onConsult={() => openModalById('consultation')} />
            }
          </AnimatePresence>
        </div>

        {/* ── Value Card ────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
          <ValueCard isDark={isDark} />
        </div>
      </div>

      <CTABanner />
    </>
  )
}
