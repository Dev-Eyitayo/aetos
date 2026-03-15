import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Settings, Palette, Smartphone, Target, Search } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const reasons = [
  {
    icon: TrendingUp,
    title: 'Expertise That Drives Results',
    description:
      'Our team of seasoned professionals brings years of experience and expertise to the table.',
  },
  {
    icon: Settings,
    title: 'Tailored Business Solutions',
    description:
      'We understand that every business is unique. That\'s why our solutions are customized.',
  },
  {
    icon: Palette,
    title: 'Cutting-Edge Web Design',
    description:
      'Make a lasting impression with our top-notch web design services.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Approach',
    description:
      'Our team of mobile experts consistently prioritize mobile-first design to ensure your website.',
  },
  {
    icon: Target,
    title: 'Marketing Strategies',
    description:
      'Our team of marketing specialists allow us to target the right audience with precision.',
  },
  {
    icon: Search,
    title: 'Search Engine Optimization',
    description:
      'Maximize your online visibility with our expert SEO techniques.',
  },
]

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  return (
    <section
      ref={ref}
      className={`section-pad relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f6]'}`}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(127,255,0,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-2">
            Why Choose Us for
          </h2>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand mb-4">
            Your Digital Journey
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Partnering with us offers a multitude of advantages. Gain increased brand visibility,
            improved customer engagement, and higher ROI. Our digital solutions are designed to meet
            your unique business needs, ensuring lasting success.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`card group p-6 hover:border-brand/30 transition-all duration-300 ${isDark ? '' : 'bg-white'}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand/10 border border-brand/20 mb-5 group-hover:bg-brand/20 transition-colors">
                  <Icon size={20} className="text-brand" />
                </div>
                <h3 className="font-display font-bold text-base text-primary mb-2">
                  {reason.title}
                </h3>
                <p className="text-secondary text-sm font-body leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
