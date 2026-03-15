import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { projects } from '../../data/projects'

export default function Works() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  // Show only first 4 on home page
  const featured = projects.slice(0, 4)

  return (
    <section ref={ref} id="works" className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
            Our Works
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Aetos is the lifeblood of our previous projects. Our portfolio showcases the successful collaborations we've
            had with diverse clients across various industries. Let our work speak for itself.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/projects`}
                className="group block relative rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${isDark ? '#222' : '#e0e0e0'}`,
                }}
              >
                {/* Image area */}
                <div
                  className="relative h-52 sm:h-64 flex items-center justify-center overflow-hidden"
                  style={{ background: project.heroGradient }}
                >
                  <span
                    className="font-display font-bold text-3xl sm:text-4xl relative z-10 tracking-tight"
                    style={{
                      color: project.id === 'mycliq' ? '#1a0a00' : '#ffffff',
                    }}
                  >
                    {project.logoText}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-black font-display font-bold text-sm">
                      View Project Details <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className={`p-5 ${isDark ? 'bg-[#111111]' : 'bg-white'} border-t border-subtle`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-bold text-base text-primary mb-1">
                        {project.title}
                      </h3>
                      <p className="text-muted text-xs font-body mb-2">
                        Category: {project.tags[0]}
                      </p>
                      <p className="text-secondary text-xs font-body leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted group-hover:text-brand transition-colors shrink-0 mt-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-subtle text-secondary hover:border-brand hover:text-brand font-display font-semibold text-sm transition-all duration-200"
          >
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
