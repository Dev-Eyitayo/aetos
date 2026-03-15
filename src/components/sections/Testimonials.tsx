import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Twitter, Linkedin, Instagram } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const testimonials = [
  {
    id: '1',
    quote:
      'Lorem ipsum dolor sit amet consectetur. Vitae elementum at nisi leo nulla mollis. Feugiat fringilla risus at leo nulla mollis. Feugiat fringilla risus at leo nulla sem in quam arcu ulpre. Sed sem in quam arcu ulpre.',
    author: 'John Doe',
    role: 'Founder of Neetiz',
    platform: 'twitter' as const,
  },
  {
    id: '2',
    quote:
      'Lorem ipsum dolor sit amet consectetur. Vitae elementum at nisi leo nulla mollis. Feugiat fringilla risus at leo nulla mollis. Feugiat fringilla risus at leo nulla sem in quam arcu ulpre.',
    author: 'John Doe',
    role: 'CEO, TechVentures',
    platform: 'linkedin' as const,
  },
  {
    id: '3',
    quote:
      'Vitae elementum at nisi leo nulla mollis. Feugiat fringilla risus at leo nulla mollis. May to elementum at nisi leo nulla mollis. Feugiat fringilla risus at nisi leo nulla per.',
    author: 'Jane Doe',
    role: 'Product Manager',
    platform: 'instagram' as const,
  },
]

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'twitter': return <Twitter size={16} className="text-[#1DA1F2]" />
    case 'linkedin': return <Linkedin size={16} className="text-[#0A66C2]" />
    case 'instagram': return <Instagram size={16} className="text-[#E1306C]" />
    default: return null
  }
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  return (
    <section
      ref={ref}
      id="testimonials"
      className={`section-pad ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#f0f0ee]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
            Testimonials
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Don't just take our word for it. Hear what our satisfied clients have to say about their
            experience with us. We take pride in building relationships and delivering beyond expectations.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`card p-6 flex flex-col gap-4 hover:border-brand/20 transition-all duration-300 ${isDark ? '' : 'bg-white'}`}
            >
              {/* Platform */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={t.platform} />
                  <span className="text-muted text-xs font-body capitalize">{t.platform}</span>
                </div>
                {/* Quote mark */}
                <span className="font-display text-4xl text-brand/30 leading-none">"</span>
              </div>

              {/* Quote */}
              <p className="text-secondary font-body text-sm leading-relaxed flex-1">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-subtle">
                <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center font-display font-bold text-brand text-sm shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-primary">{t.author}</p>
                  <p className="text-muted text-xs font-body">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
