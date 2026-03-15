import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, Figma, Hash } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import type { Project } from '../../types'

// ── Tech icon map ─────────────────────────────────────────────────────────────
function TechIcon({ name, accent }: { name: string; accent: string }) {
  const iconStyle =
    'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border'

  const map: Record<string, JSX.Element> = {
    Figma: (
      <div
        className={iconStyle}
        style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
        title="Figma"
      >
        <Figma size={14} />
      </div>
    ),
    CSS3: (
      <div
        className={iconStyle}
        style={{ borderColor: '#264de440', background: '#264de412', color: '#264de4' }}
        title="CSS3"
      >
        <span style={{ fontSize: 10 }}>CSS</span>
      </div>
    ),
    Bootstrap: (
      <div
        className={iconStyle}
        style={{ borderColor: '#7952b340', background: '#7952b312', color: '#7952b3' }}
        title="Bootstrap"
      >
        <span style={{ fontSize: 10 }}>B</span>
      </div>
    ),
  }

  return (
    map[name] ?? (
      <div
        className={iconStyle}
        style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
        title={name}
      >
        <Hash size={12} />
      </div>
    )
  )
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, accent }: { name: string; accent: string }) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}40` }}
    >
      {name.charAt(0)}
    </div>
  )
}

// ── Tag pill ──────────────────────────────────────────────────────────────────
function Tag({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium border ${
        isDark
          ? 'border-[#2a2a2a] bg-[#1a1a1a] text-[#a0a0a0]'
          : 'border-[#d8d8d8] bg-[#f0f0f0] text-[#555555]'
      }`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: 'currentColor', opacity: 0.6 }}
      />
      {label}
    </span>
  )
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
interface Props {
  project: Project
  defaultOpen?: boolean
  index: number
}

export default function ProjectCard({ project, defaultOpen = false, index }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const { isDark } = useTheme()
  const { details } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* ── Hero image card ─────────────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          background: project.heroGradient,
          minHeight: '260px',
          height: 'clamp(240px, 30vw, 340px)',
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        <span
          className="relative z-10 font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight"
          style={{
            color:
              project.id === 'mycliq'
                ? '#1a0a00'
                : project.id === 'chatrizz'
                ? '#ffffff'
                : project.id === 'sync360'
                ? '#ffffff'
                : '#ffffff',
            textShadow:
              project.id === 'chatrizz'
                ? '0 2px 20px rgba(0,180,216,0.4)'
                : 'none',
          }}
        >
          {project.logoText}
        </span>
      </div>

      {/* ── Info bar ────────────────────────────────────────────────────────── */}
      <div
        className={`mt-4 flex items-center justify-between gap-4 px-1 ${
          open ? 'mb-3' : 'mb-0'
        }`}
      >
        <h3 className="font-display font-bold text-xl sm:text-2xl text-primary">
          {project.title}
        </h3>
        <button
          onClick={() => setOpen(prev => !prev)}
          className={`flex items-center gap-1.5 text-xs font-body font-medium transition-colors shrink-0 ${
            isDark
              ? 'text-[#666] hover:text-[#999]'
              : 'text-[#888] hover:text-[#444]'
          }`}
        >
          {open ? 'Show Less' : 'Show More'}
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              isDark ? 'border-[#2a2a2a]' : 'border-[#d8d8d8]'
            }`}
          >
            {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        </button>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2 px-1 mb-0">
        {project.tags.map(tag => (
          <Tag key={tag} label={tag} isDark={isDark} />
        ))}
      </div>

      {/* ── Collapsible detail panel ─────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className={`mt-4 rounded-2xl border p-6 sm:p-8 flex flex-col gap-7 ${
                isDark
                  ? 'bg-[#111111] border-[#1e1e1e]'
                  : 'bg-white border-[#e0e0e0]'
              }`}
            >
              {/* Project Description */}
              <div>
                <h4 className="font-display font-semibold text-base text-primary mb-1.5">
                  Project Description
                </h4>
                <p className="text-secondary font-body text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Meta grid */}
              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pb-7 border-b ${
                  isDark ? 'border-[#1e1e1e]' : 'border-[#e8e8e8]'
                }`}
              >
                {[
                  { label: 'Category', value: details.category },
                  { label: 'Time Taken', value: details.timeTaken },
                  { label: 'Start Date', value: details.startDate },
                  { label: 'Completed Date', value: details.completedDate },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-muted text-xs font-body mb-1">{m.label}</p>
                    <p className="text-primary font-body font-medium text-sm whitespace-pre-line">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div
                className={`pb-7 border-b ${
                  isDark ? 'border-[#1e1e1e]' : 'border-[#e8e8e8]'
                }`}
              >
                <h4 className="font-display font-semibold text-base text-primary mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech, i) => (
                    <TechIcon key={i} name={tech} accent={project.accentColor} />
                  ))}
                </div>
              </div>

              {/* Team members */}
              <div
                className={`pb-7 border-b ${
                  isDark ? 'border-[#1e1e1e]' : 'border-[#e8e8e8]'
                }`}
              >
                <h4 className="font-display font-semibold text-base text-primary mb-5">
                  Team Members
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {details.teamGroups.map(group => (
                    <div key={group.role}>
                      <p className="text-muted text-xs font-body mb-3">{group.role}</p>
                      <div className="flex flex-col gap-2.5">
                        {group.members.map(m => (
                          <div key={m.name} className="flex items-center gap-2.5">
                            <Avatar name={m.name} accent={project.accentColor} />
                            <span className="text-primary font-body text-sm">{m.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methods used */}
              <div>
                <h4 className="font-display font-semibold text-base text-primary mb-4">
                  Methods Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {details.methodsUsed.map(method => (
                    <span
                      key={method}
                      className={`px-4 py-2 rounded-lg text-sm font-body border ${
                        isDark
                          ? 'border-[#2a2a2a] bg-[#181818] text-[#888]'
                          : 'border-[#d8d8d8] bg-[#f4f4f4] text-[#555]'
                      }`}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* spacer */}
      <div className="h-4" />
    </motion.div>
  )
}
