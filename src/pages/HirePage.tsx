import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  Code2,
  Smartphone,
  Figma,
  BarChart3,
  TestTube2,
  Laptop,
  Wifi,
  Brain,
  Heart,
  CheckCircle2,
  Users,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useModal } from "../hooks/useModal";
import CTABanner from "../components/sections/CTABanner";

// ── Data ──────────────────────────────────────────────────────────────────────

const tracks = [
  {
    id: "frontend",
    Icon: Monitor,
    title: "Frontend Development",
    subtitle: "React, Next.js",
    desc: "Pixel-perfect interfaces built with modern React and Next.js, focused on performance and accessibility.",
  },
  {
    id: "backend",
    Icon: Code2,
    title: "Backend Development",
    subtitle: "Node.js, Laravel, Python",
    desc: "Scalable APIs and server architecture across Node.js, Laravel, and Python ecosystems.",
  },
  {
    id: "mobile",
    Icon: Smartphone,
    title: "Mobile App Development",
    subtitle: "Flutter, React Native",
    desc: "Cross-platform mobile apps with native-feel UX using Flutter and React Native.",
  },
  {
    id: "design",
    Icon: Figma,
    title: "UI/UX Design",
    subtitle: "Figma, Prototyping",
    desc: "Research-driven design with sharp visual execution and complete design systems.",
  },
  {
    id: "product",
    Icon: BarChart3,
    title: "Product Management",
    subtitle: "Strategy & Execution",
    desc: "Product thinkers who bridge business goals with technical delivery.",
  },
  {
    id: "qa",
    Icon: TestTube2,
    title: "QA & Software Testing",
    subtitle: "Manual & Automated",
    desc: "Quality engineers who ship confidence — not just software.",
  },
];

const hireRequirements = [
  {
    Icon: Laptop,
    label: "Laptop",
    desc: "Every hire arrives with their own working setup.",
  },
  {
    Icon: Wifi,
    label: "Stable Internet",
    desc: "Remote-ready with reliable connectivity.",
  },
  {
    Icon: Brain,
    label: "Willingness to Learn",
    desc: "Coachable, curious, and growth-oriented.",
  },
  {
    Icon: Heart,
    label: "Good Conduct",
    desc: "Professional, collaborative, and dependable.",
  },
];

const whyHire = [
  {
    Icon: Shield,
    title: "Pre-vetted Talent",
    desc: "Every candidate goes through our rigorous 6-stage selection process before they ever work on a real product.",
  },
  {
    Icon: Zap,
    title: "Battle-tested in Real Projects",
    desc: "They've already built and shipped products. No hand-holding required.",
  },
  {
    Icon: Users,
    title: "Team-trained Mindset",
    desc: "90 days of collaborative, structured work means they know how to operate inside teams.",
  },
  {
    Icon: Clock,
    title: "Ready to Contribute from Day One",
    desc: "Skip the ramp-up. Our alumni hit the ground running.",
  },
  {
    Icon: CheckCircle2,
    title: "Mentor-backed References",
    desc: "Performance-based recommendations from industry veterans who supervised their work.",
  },
  {
    Icon: BarChart3,
    title: "Mid-level Ready",
    desc: "Not just juniors. These are professionals who've leveled up through execution, not coursework.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HirePage() {
  const { isDark } = useTheme();
  const { openModalById } = useModal();

  return (
    <>
      <div
        className={`min-h-screen relative overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-light"}`}
      >
        {/* ── Full-width Hero ── */}
        <div
          className="relative w-full pt-32 pb-20 overflow-hidden"
          style={{
            background: isDark
              ? "linear-gradient(160deg, #130d07 0%, #0f0a05 50%, #0a0a0a 100%)"
              : "linear-gradient(160deg, #fdf0e6 0%, #fae3cc 50%, #fdf6ee 100%)",
          }}
        >
          {/* Decorative background dots */}
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
              [40, 55],
              [65, 75],
            ].map(([l, t], i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? 3 : 2,
                  height: i % 3 === 0 ? 3 : 2,
                  background: isDark
                    ? "rgba(255,140,60,0.18)"
                    : "rgba(200,80,20,0.10)",
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
              className="font-display font-black text-[clamp(80px,18vw,240px)] leading-none tracking-tighter whitespace-nowrap"
              style={{
                color: isDark
                  ? "rgba(255,140,60,0.04)"
                  : "rgba(200,80,20,0.04)",
              }}
            >
              HIRE
            </span>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-semibold"
                style={{
                  color: isDark ? "#ff9a60" : "#c04010",
                  background: isDark
                    ? "rgba(255,140,60,0.08)"
                    : "rgba(200,80,20,0.07)",
                  border: isDark
                    ? "1px solid rgba(255,140,60,0.22)"
                    : "1px solid rgba(200,80,20,0.20)",
                }}
              >
                <Zap size={11} />
                Skip the Recruitment Headache
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-center"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.1,
                background:
                  "linear-gradient(130deg, #ffb899 0%, #ff8050 55%, #d05020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hire Developers &amp; Tech Talent
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-secondary font-body text-base sm:text-lg text-center leading-relaxed mt-5 max-w-2xl mx-auto"
            >
              Access pre-vetted, project-hardened tech talent. Every hire from
              Aetos has built real products, worked in real teams, and earned a
              mentor-backed reference. No guesswork. No recruitment fees.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-10 gap-3"
            >
              <button
                onClick={() => openModalById("consultation")}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm text-white hover:opacity-90 transition-all duration-200 group"
                style={{
                  background:
                    "linear-gradient(130deg, #ff8050 0%, #d05020 100%)",
                }}
              >
                Consult Us Today
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-14">
          {/* ── Available Tracks ── */}
          <section>
            <div className="mb-8">
              <h3
                className="font-display font-semibold text-xs uppercase tracking-widest mb-2"
                style={{ color: isDark ? "#ff8050" : "#c04010" }}
              >
                Available Tracks
              </h3>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                The talent you need, across every discipline
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tracks.map(({ id, Icon, title, subtitle, desc }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="p-5 rounded-xl flex flex-col gap-3"
                  style={{
                    background: isDark ? "#111111" : "#f8f8f6",
                    border: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: isDark
                          ? "rgba(255,140,60,0.08)"
                          : "rgba(200,80,20,0.07)",
                        border: isDark
                          ? "1px solid rgba(255,140,60,0.18)"
                          : "1px solid rgba(200,80,20,0.15)",
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: isDark ? "#ff8050" : "#c04010" }}
                      />
                    </div>
                    <div>
                      <p className="font-body font-bold text-sm text-primary leading-tight">
                        {title}
                      </p>
                      {subtitle && (
                        <p className="text-muted text-xs font-body mt-0.5">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-secondary text-xs font-body leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: isDark ? "#1a1a1a" : "#e8e8e8" }}
          />

          {/* ── Why Hire from Aetos ── */}
          <section>
            <div className="mb-8">
              <h3
                className="font-display font-semibold text-xs uppercase tracking-widest mb-2"
                style={{ color: isDark ? "#ff8050" : "#c04010" }}
              >
                Why Aetos
              </h3>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                Not just junior hires. Execution-ready talent.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyHire.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{
                    background: isDark ? "#111111" : "#f8f8f6",
                    border: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: isDark
                        ? "rgba(255,140,60,0.08)"
                        : "rgba(200,80,20,0.07)",
                      border: isDark
                        ? "1px solid rgba(255,140,60,0.18)"
                        : "1px solid rgba(200,80,20,0.15)",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: isDark ? "#ff8050" : "#c04010" }}
                    />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-primary leading-tight">
                      {title}
                    </p>
                    <p className="text-secondary text-xs font-body mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: isDark ? "#1a1a1a" : "#e8e8e8" }}
          />

          {/* ── What They'll Come With ── */}
          <section>
            <div className="mb-8">
              <h3
                className="font-display font-semibold text-xs uppercase tracking-widest mb-2"
                style={{ color: isDark ? "#ff8050" : "#c04010" }}
              >
                Every hire comes equipped
              </h3>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                What They'll Come With
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hireRequirements.map(({ Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col gap-3 p-5 rounded-xl"
                  style={{
                    background: isDark ? "#111111" : "#f8f8f6",
                    border: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                      border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
                    }}
                  >
                    <Icon size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm text-primary">
                      {label}
                    </p>
                    <p className="text-secondary text-xs font-body mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl px-8 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              background: isDark
                ? "linear-gradient(130deg, #1a0d07 0%, #130908 100%)"
                : "linear-gradient(130deg, #fdf0e6 0%, #fae3cc 100%)",
              border: isDark ? "1px solid #2a1008" : "1px solid #f0c8a8",
            }}
          >
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-primary mb-2">
                Ready to hire top tech talent?
              </h3>
              <p className="text-secondary font-body text-sm leading-relaxed max-w-md">
                Tell us what you need and we'll match you with pre-vetted,
                project-ready professionals from our talent pool.
              </p>
            </div>
            <button
              onClick={() => openModalById("consultation")}
              className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-display font-bold text-sm text-white hover:opacity-90 transition-all duration-200 group whitespace-nowrap"
              style={{
                background: "linear-gradient(130deg, #ff8050 0%, #d05020 100%)",
              }}
            >
              Consult Us Today
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </motion.div>

          {/* Value card */}
          <ValueCard isDark={isDark} />
        </div>
      </div>

      <CTABanner />
    </>
  );
}

function ValueCard({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-2xl px-6 sm:px-8 py-8 flex flex-col gap-4"
      style={{
        background: isDark ? "#111111" : "#ffffff",
        border: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
            border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
          }}
        >
          <Heart size={16} style={{ color: isDark ? "#ff8050" : "#c04010" }} />
        </div>
        <h3
          className="font-display font-bold text-base sm:text-lg"
          style={{ color: isDark ? "#ff8050" : "#c04010" }}
        >
          We value your partnership
        </h3>
      </div>
      <p className="text-secondary font-body text-sm sm:text-base leading-relaxed">
        We take hiring seriously. Every candidate we recommend has been through
        our program, evaluated by experienced mentors, and proven their ability
        on real products. When you hire from Aetos, you're not taking a gamble —
        you're making a confident, informed decision.
      </p>
    </motion.div>
  );
}
