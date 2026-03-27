import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const faqs = [
  {
    id: '1',
    question: 'How long does it take to complete a web development project?',
    answer:
      'Timelines vary depending on the project\'s complexity and requirements. We always strive to deliver projects on time and maintain transparency throughout the process.',
  },
  {
    id: '2',
    question: 'Can you create a responsive website design that looks great on all devices?',
    answer:
      'Absolutely. Every website we build is fully responsive, optimized for all screen sizes from mobile phones to large desktop monitors.',
  },
  {
    id: '3',
    question: 'Can you help manage large-scale mobile app development projects?',
    answer:
      'Yes. Our team has extensive experience managing large-scale mobile projects with complex requirements, multiple integrations, and enterprise-grade quality standards.',
  },
  {
    id: '4',
    question: 'What digital marketing strategies do you employ to drive business growth?',
    answer:
      'We use a combination of SEO, content marketing, paid advertising, social media strategy, and conversion rate optimization to drive measurable growth.',
  },
  {
    id: '5',
    question: 'Can you maintain services for websites and apps developed by other companies?',
    answer:
      'Yes. We offer maintenance and support for existing projects regardless of which company built them. We conduct a thorough technical audit first.',
  },
  {
    id: '6',
    question: 'Can you integrate third-party APIs into our mobile app?',
    answer:
      'Yes. We have extensive experience integrating payment gateways, social platforms, mapping services, analytics tools, and custom third-party APIs.',
  },
  {
    id: '7',
    question: 'How do you ensure the security of user data in your web applications?',
    answer:
      'We follow industry best practices including data encryption, secure authentication, regular security audits, and compliance with GDPR and other data protection regulations.',
  },
  {
    id: '8',
    question: 'How do you ensure cross-platform compatibility for mobile apps?',
    answer:
      'We build with cross-platform frameworks like React Native and Flutter, and conduct thorough testing on multiple devices and OS versions.',
  },
]

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openId, setOpenId] = useState<string | null>(null)
  const { isDark } = useTheme()

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id))

  // Split into two columns
  const left = faqs.slice(0, Math.ceil(faqs.length / 2))
  const right = faqs.slice(Math.ceil(faqs.length / 2))

  return (
    <section
      ref={ref}
      className={`section-pad ${isDark ? "bg-[#0a0a0a]" : "bg-light-card"}`}
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
            Frequently <span className="text-[#77D4D3]">Asked Questions</span>
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Got questions? We've got answers. Check our frequently asked
            questions for insights into our capabilities, services, pricing, and
            more. Transparency is at the heart of how we work.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-2 gap-3">
          {[left, right].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: (ci * left.length + i) * 0.05,
                  }}
                  className={`card overflow-hidden ${isDark ? "" : "bg-white"}`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-body font-medium text-sm text-primary leading-snug flex-1">
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-subtle text-muted">
                      {openId === faq.id ? (
                        <Minus size={12} />
                      ) : (
                        <Plus size={12} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-5 border-t border-subtle pt-4">
                          <p className="text-secondary text-sm font-body leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
