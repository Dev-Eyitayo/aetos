import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Figma, Hash, ArrowUpRight } from "lucide-react";
import { createPortal } from "react-dom";
import { useTheme } from "../../hooks/useTheme";
import type { Project } from "../../types";

// ── Tech icon map ─────────────────────────────────────────────────────────────
function TechIcon({ name, accent }: { name: string; accent: string }) {
  const iconStyle =
    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border";

  const map: Record<string, JSX.Element> = {
    Figma: (
      <div
        className={iconStyle}
        style={{
          borderColor: `${accent}40`,
          background: `${accent}12`,
          color: accent,
        }}
        title="Figma"
      >
        <Figma size={14} />
      </div>
    ),
    CSS3: (
      <div
        className={iconStyle}
        style={{
          borderColor: "#264de440",
          background: "#264de412",
          color: "#264de4",
        }}
        title="CSS3"
      >
        <span style={{ fontSize: 10 }}>CSS</span>
      </div>
    ),
    Bootstrap: (
      <div
        className={iconStyle}
        style={{
          borderColor: "#7952b340",
          background: "#7952b312",
          color: "#7952b3",
        }}
        title="Bootstrap"
      >
        <span style={{ fontSize: 10 }}>B</span>
      </div>
    ),
  };

  return (
    map[name] ?? (
      <div
        className={iconStyle}
        style={{
          borderColor: `${accent}40`,
          background: `${accent}12`,
          color: accent,
        }}
        title={name}
      >
        <Hash size={12} />
      </div>
    )
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, accent }: { name: string; accent: string }) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{
        background: `${accent}25`,
        color: accent,
        border: `1px solid ${accent}40`,
      }}
    >
      {name.charAt(0)}
    </div>
  );
}

// ── Tag pill ──────────────────────────────────────────────────────────────────
function Tag({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium border ${
        isDark
          ? "border-[#2a2a2a] bg-[#1a1a1a] text-[#a0a0a0]"
          : "border-[#d8d8d8] bg-[#f0f0f0] text-[#555555]"
      }`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "currentColor", opacity: 0.6 }}
      />
      {label}
    </span>
  );
}

// ── Project Detail Modal ──────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  isDark,
}: {
  project: Project;
  onClose: () => void;
  isDark: boolean;
}) {
  const { details } = project;

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden"
          style={{
            background: isDark ? "#111111" : "#ffffff",
            border: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
          }}
        >
          {/* Drag handle (mobile) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: isDark ? "#333" : "#d0d0d0" }}
            />
          </div>

          {/* ── Modal header ── */}
          <div
            className="flex items-center justify-between px-6 pt-4 pb-4 shrink-0 border-b"
            style={{ borderColor: isDark ? "#1e1e1e" : "#e8e8e8" }}
          >
            {/* Hero gradient mini badge */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0"
                style={{ background: project.heroGradient }}
              >
                <span
                  style={{
                    color: project.id === "mycliq" ? "#1a0a00" : "#ffffff",
                    fontSize: 11,
                  }}
                >
                  {project.logoText}
                </span>
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-primary leading-tight">
                  {project.title}
                </h2>
                {details?.category && (
                  <p className="text-muted text-xs font-body mt-0.5">
                    {details.category}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)",
                border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
                color: isDark ? "#888" : "#666",
              }}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div className="overflow-y-auto flex-1 px-6 py-6 flex flex-col gap-7">
            {/* Description */}
            <div>
              <h4 className="font-display font-semibold text-sm text-primary mb-2">
                Project Description
              </h4>
              <p className="text-secondary font-body text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Meta grid */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pb-7 border-b`}
              style={{ borderColor: isDark ? "#1e1e1e" : "#e8e8e8" }}
            >
              {[
                { label: "Category", value: details?.category },
                { label: "Time Taken", value: details?.timeTaken },
                { label: "Start Date", value: details?.startDate },
                { label: "Completed Date", value: details?.completedDate },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-muted text-xs font-body mb-1">{m.label}</p>
                  <p className="text-primary font-body font-medium text-sm whitespace-pre-line">
                    {m.value ?? "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Technologies */}
            {details?.technologies?.length ? (
              <div
                className="pb-7 border-b"
                style={{ borderColor: isDark ? "#1e1e1e" : "#e8e8e8" }}
              >
                <h4 className="font-display font-semibold text-sm text-primary mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech, i) => (
                    <TechIcon
                      key={i}
                      name={tech}
                      accent={project.accentColor}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {/* Team members */}
            {details?.teamGroups?.length ? (
              <div
                className="pb-7 border-b"
                style={{ borderColor: isDark ? "#1e1e1e" : "#e8e8e8" }}
              >
                <h4 className="font-display font-semibold text-sm text-primary mb-5">
                  Team Members
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {details.teamGroups.map((group) => (
                    <div key={group.role}>
                      <p className="text-muted text-xs font-body mb-3">
                        {group.role}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {group.members.map((m) => (
                          <div
                            key={m.name}
                            className="flex items-center gap-2.5"
                          >
                            <Avatar
                              name={m.name}
                              accent={project.accentColor}
                            />
                            <span className="text-primary font-body text-sm">
                              {m.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Methods used */}
            {details?.methodsUsed?.length ? (
              <div>
                <h4 className="font-display font-semibold text-sm text-primary mb-4">
                  Methods Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {details.methodsUsed.map((method) => (
                    <span
                      key={method}
                      className="px-4 py-2 rounded-lg text-sm font-body border"
                      style={{
                        borderColor: isDark ? "#2a2a2a" : "#d8d8d8",
                        background: isDark ? "#181818" : "#f4f4f4",
                        color: isDark ? "#888" : "#555",
                      }}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
interface Props {
  project: Project;
  defaultOpen?: boolean;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.65,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        {/* ── Hero image card ── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer group"
          style={{
            background: project.heroGradient,
            minHeight: "200px",
            height: "clamp(200px, 22vw, 280px)",
          }}
          onClick={() => setModalOpen(true)}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <span className="font-display font-semibold text-sm text-white flex items-center gap-2">
              View Details <ArrowUpRight size={14} />
            </span>
          </div>
          <span
            className="relative z-10 font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight"
            style={{
              color:
                project.id === "mycliq"
                  ? "#1a0a00"
                  : project.id === "chatrizz"
                    ? "#ffffff"
                    : project.id === "sync360"
                      ? "#ffffff"
                      : "#ffffff",
              textShadow:
                project.id === "chatrizz"
                  ? "0 2px 20px rgba(0,180,216,0.4)"
                  : "none",
            }}
          >
            {project.logoText}
          </span>
        </div>

        {/* ── Info bar ── */}
        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-primary">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} isDark={isDark} />
              ))}
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-body font-medium transition-colors shrink-0 mt-1"
            style={{ color: isDark ? "#666" : "#888" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = isDark ? "#999" : "#444")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = isDark ? "#666" : "#888")
            }
          >
            Details
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center border"
              style={{ borderColor: isDark ? "#2a2a2a" : "#d8d8d8" }}
            >
              <ArrowUpRight size={11} />
            </span>
          </button>
        </div>

        <div className="h-4" />
      </motion.div>

      {/* ── Modal ── */}
      {modalOpen && (
        <ProjectModal
          project={project}
          onClose={() => setModalOpen(false)}
          isDark={isDark}
        />
      )}
    </>
  );
}
