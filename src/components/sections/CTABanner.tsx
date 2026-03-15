import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useModal } from '../../hooks/useModal'

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()
  const { openModal } = useModal()

  return (
    <section ref={ref} className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #111111 0%, #0f1a0f 50%, #0a1a0a 100%)'
              : 'linear-gradient(135deg, #e8f5e8 0%, #d4f0d4 50%, #c8e8c8 100%)',
            border: `1px solid ${isDark ? '#1a2e1a' : '#b8d8b8'}`,
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(127,255,0,0.12) 0%, transparent 60%)',
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(${isDark ? '#7FFF00' : '#2d5a2d'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#7FFF00' : '#2d5a2d'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-6 px-6 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-medium border border-brand/30 text-brand mb-4"
                style={{ background: 'rgba(127,255,0,0.07)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Limited spots available
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary max-w-2xl leading-tight"
            >
              Ready to Transform Your{' '}
              <span className="text-brand">Digital Presence?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-secondary font-body text-sm sm:text-base leading-relaxed max-w-xl"
            >
              Take the first step towards digital success with us by your side. We deliver strategic
              digital solutions to transform your business. Whether you need a thriving website,
              a powerful mobile app, or a robust digital marketing strategy, we have you covered.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="text-brand font-display font-semibold text-sm"
            >
              Unlock Your Digital Potential Today
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand text-black font-display font-bold text-base hover:bg-brand-green transition-all duration-200 group shadow-lg"
                style={{ boxShadow: '0 0 40px rgba(127,255,0,0.25)' }}
              >
                Get In Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
