import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Smartphone, Bot, Shield, Search, ChevronRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const services = [
  {
    id: 'web',
    icon: Globe,
    label: 'Web Development',
    description: 'Scalable, performant web applications built with modern frameworks.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile App Development',
    description: 'Native and cross-platform apps for iOS and Android.',
  },
  {
    id: 'ai',
    icon: Bot,
    label: 'AI / ML',
    description: 'Intelligent features and automation powered by modern AI.',
  },
  {
    id: 'qa',
    icon: Shield,
    label: 'QA Testing',
    description: 'Comprehensive manual and automated testing services.',
  },
  {
    id: 'seo',
    icon: Search,
    label: 'Search Engine Optimization',
    description: 'Data-driven SEO strategies to grow your organic reach.',
  },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('web')
  const { isDark } = useTheme()

  return (
    <section
      ref={ref}
      id="services"
      className={`section-pad ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#f0f0ee]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
            Our Services
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Our comprehensive range of services includes web design, mobile app development,
            AI, Quality Assurance/QA testing, making sure there is a startup to enterprise
            solution with solutions that work for you.
          </p>
        </motion.div>

        {/* Service tabs — scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {services.map(service => {
            const Icon = service.icon
            const isActive = active === service.id
            return (
              <button
                key={service.id}
                onClick={() => setActive(service.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap text-sm font-display font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-brand text-black border-brand'
                    : `border-subtle text-secondary hover:text-primary hover:border-brand/30 ${isDark ? 'bg-transparent' : 'bg-white'}`
                }`}
              >
                <Icon size={15} />
                {service.label}
              </button>
            )
          })}
        </motion.div>

        {/* Active service detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 ${isDark ? '' : 'bg-white'}`}
        >
          {(() => {
            const s = services.find(s => s.id === active)!
            const Icon = s.icon
            return (
              <>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-brand/10 border border-brand/20 shrink-0">
                  <Icon size={24} className="text-brand" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-primary mb-2">{s.label}</h3>
                  <p className="text-secondary font-body text-sm leading-relaxed">{s.description}</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-black font-display font-bold text-sm hover:bg-[#5fcc00] transition-colors shrink-0">
                  Learn More <ChevronRight size={16} />
                </button>
              </>
            )
          })()}
        </motion.div>
      </div>
    </section>
  )
}
