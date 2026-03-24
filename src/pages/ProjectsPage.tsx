import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import ProjectCard from "../components/ui/ProjectCard";
import CTABanner from "../components/sections/CTABanner";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  const { isDark } = useTheme();

  return (
    <>
      {/* ── Page wrapper ──────────────────────────────────────────────────────── */}
      <div
        className={`min-h-screen relative overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-light"}`}
      >
        {/* ── Full-width Hero ───────────────────────────────────────────────── */}
        <div
          className="relative w-full pt-32 pb-20 overflow-hidden"
          style={{
            background: isDark
              ? "linear-gradient(160deg, #0d0d0d 0%, #0a0a0a 100%)"
              : "linear-gradient(160deg, #f4f4f2 0%, #ebebea 100%)",
            borderBottom: `1px solid ${isDark ? "#1a1a1a" : "#e0e0e0"}`,
          }}
        >
          {/* Decorative dots */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {[
              [72, 18],
              [28, 35],
              [88, 52],
              [15, 68],
              [62, 8],
              [45, 42],
              [92, 72],
              [5, 25],
              [78, 88],
              [35, 12],
              [55, 60],
              [20, 80],
              [80, 30],
            ].map(([l, t], i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? 3 : 2,
                  height: i % 3 === 0 ? 3 : 2,
                  background: isDark
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(0,0,0,0.08)",
                  top: `${t}%`,
                  left: `${l}%`,
                }}
              />
            ))}
          </div>

          {/* Large background text */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span
              className="font-display font-black leading-none tracking-tighter whitespace-nowrap"
              style={{
                fontSize: "clamp(80px, 18vw, 240px)",
                color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
              }}
            >
              WORK
            </span>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-semibold text-secondary"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                  border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
                }}
              >
                Selected Work
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-primary mb-5"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
            >
              Projects Showcase
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-secondary font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Witness the brilliance of our previous projects. Our portfolio
              showcases the successful collaborations we've had with diverse
              clients across various industries. Let our work speak for itself.
            </motion.p>
          </div>
        </div>

        {/* ── Project grid ──────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
