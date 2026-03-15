import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import ProjectCard from '../components/ui/ProjectCard'
import CTABanner from '../components/sections/CTABanner'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const { isDark } = useTheme()

  return (
    <>
      {/* ── Page wrapper ──────────────────────────────────────────────────────── */}
      <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0a0a0a]' : 'bg-light'}`}>

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4"
          >
            Projects Showcase
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-secondary font-body text-sm sm:text-base leading-relaxed"
          >
            Witness the brilliance of our previous projects. Our portfolio showcases the successful
            collaborations we've had with diverse clients across various industries. Let our work
            speak for itself.
          </motion.p>
        </div>

        {/* ── Project list ──────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              defaultOpen={i === 0}   /* first card open by default */
            />
          ))}
        </div>
      </div>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <CTABanner />
    </>
  )
}
