import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const stats = [
  {
    value: '50+',
    label: 'Completed Projects',
    description: 'Across fintech, retail, healthcare, and enterprise systems.',
  },
  {
    value: '20+',
    label: 'Satisfied Clients',
    description: 'Building long-lasting, trust-based partnerships and performative work.',
  },
  {
    value: '5+ Years',
    label: 'Industry Experience',
    description: 'Building, designing, and supporting digital solutions.',
  },
  {
    value: '90%',
    label: 'Client Retention Rate',
    description: 'Most clients come back — and stay with us for years to come.',
  },
  {
    value: '5+',
    label: 'Industries Served',
    description: 'From healthcare to logistics and beyond.',
  },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  return (
    <section
      ref={ref}
      className={`py-16 border-y border-subtle ${isDark ? 'bg-[#0d0d0d]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-subtle">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col gap-2 p-6 ${isDark ? 'bg-[#0d0d0d]' : 'bg-white'}`}
            >
              <span className="font-display font-bold text-3xl sm:text-4xl text-brand leading-none">
                {stat.value}
              </span>
              <span className="font-display font-semibold text-sm text-primary leading-tight">
                {stat.label}
              </span>
              <p className="text-muted text-xs font-body leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
