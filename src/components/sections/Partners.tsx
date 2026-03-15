import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const partners = [
  { id: '1', name: 'Wordmark', initial: 'W' },
  { id: '2', name: '360', initial: '360' },
  { id: '3', name: 'Partner Co', initial: 'P' },
  { id: '4', name: 'Chatrizz', initial: 'C' },
  { id: '5', name: 'Needz', initial: 'N' },
]

export default function Partners() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  return (
    <section
      ref={ref}
      className={`section-pad ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#f0f0ee]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
            Our Partners and Clients
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            We are grateful for the opportunity to work with esteemed partners and clients. Helping
            businesses and entrepreneurs grow and succeed in the digital realm is our dedication.
          </p>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`card flex items-center justify-center px-6 py-4 min-w-[120px] hover:border-brand/30 transition-all duration-300 cursor-pointer ${isDark ? '' : 'bg-white'}`}
            >
              <span className="font-display font-bold text-lg text-primary">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
