import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  Code2,
  Figma,
  BarChart3,
  TestTube2,
  Users,
  BookOpen,
  Briefcase,
  Star,
  Brain,
  Heart,
  ChevronDown,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MessageSquare,
  Send,
  BadgeCheck,
  Sparkles,
  LineChart,
  Server,
  Megaphone,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useModal } from "../hooks/useModal";
import CTABanner from "../components/sections/CTABanner";
import { X } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const eligibleRoles = [
  { Icon: Monitor, label: "Frontend Developers" },
  { Icon: Code2, label: "Backend Developers" },
  { Icon: BarChart3, label: "Product Managers" },
  { Icon: Figma, label: "UI/UX Designers" },
  { Icon: TestTube2, label: "QA Testers" },
  { Icon: Server, label: "DevOps Engineers" },
  { Icon: Megaphone, label: "Product Marketers" },
  { Icon: LineChart, label: "Data Analysts" },
];

const idealCandidateTraits = [
  {
    title: "Prior Training or Self-Learning",
    desc: "You've completed courses, bootcamps, or self-taught programs and have foundational technical skills.",
  },
  {
    title: "Team Spirit",
    desc: "You thrive in collaborative environments and value working with others to achieve common goals.",
  },
  {
    title: "Commitment to Growth",
    desc: "You're serious about accelerating your career and willing to invest time and effort into the program.",
  },
  {
    title: "Ownership Mindset",
    desc: "You take responsibility for your work, meet deadlines, and deliver quality outputs.",
  },
  {
    title: "Coachability",
    desc: "You're open to feedback, eager to learn, and willing to iterate and improve.",
  },
  {
    title: "Readiness to Execute",
    desc: "You're done with tutorials and you want hands-on experience building real products.",
  },
];

const eligibilityItems = [
  {
    Icon: Brain,
    title: "Basic Technical Skills",
    desc: "Foundational knowledge in your chosen field (development, design, product management, etc.)",
  },
  {
    Icon: Clock,
    title: "Time Commitment",
    desc: "Ability to dedicate 12–15 hours per week for the duration of the program (90 days)",
  },
  {
    Icon: Monitor,
    title: "Access to Tools",
    desc: "A functional laptop/computer and stable internet connection",
  },
  {
    Icon: CheckCircle2,
    title: "Availability",
    desc: "Ready to start and fully participate upon acceptance into the program",
  },
  {
    Icon: CreditCard,
    title: "Commitment Fee",
    desc: "Program fee of ₦60,000 (payment required upon acceptance)",
  },
];

const whatYoullGet = [
  {
    Icon: Sparkles,
    title: "Live Product Execution",
    desc: "Build 1–2 real products from scratch — not just portfolio pieces, but market-ready tools.",
  },
  {
    Icon: Users,
    title: "1-on-1 Mentorship",
    desc: "Direct access to industry veterans who have scaled products for top-tier firms.",
  },
  {
    Icon: BadgeCheck,
    title: "Reference & Employability",
    desc: "A performance-based recommendation and a portfolio you can actually defend in a mid-level interview.",
  },
  {
    Icon: Briefcase,
    title: "Portfolio-Ready Outputs",
    desc: "Build products you can showcase — real work that speaks for itself.",
  },
  {
    Icon: ShieldCheck,
    title: "Performance-Based Reference",
    desc: "Credible recommendations from mentors who watched you build.",
  },
  {
    Icon: TrendingUp,
    title: "Enhanced Employability",
    desc: "Walk into interviews with real experience, not just theoretical knowledge.",
  },
];

const applicationStages = [
  {
    Icon: Send,
    stage: "01",
    title: "Submit Application",
    desc: "Fill out the application form with your background and chosen track.",
  },
  {
    Icon: FileText,
    stage: "02",
    title: "Application Review",
    desc: "Our team reviews your submission for fit and readiness.",
  },
  {
    Icon: MessageSquare,
    stage: "03",
    title: "Interview",
    desc: "A short conversation to assess your mindset, goals, and commitment.",
  },
  {
    Icon: BookOpen,
    stage: "04",
    title: "Document Submission",
    desc: "Provide required documents to complete your profile.",
  },
  {
    Icon: CreditCard,
    stage: "05",
    title: "Acceptance Payment",
    desc: "Pay the program fee of ₦60,000 to secure your spot.",
  },
  {
    Icon: Star,
    stage: "06",
    title: "Program Begins",
    desc: "Welcome to Aetos Talent Factory! Your 90-day transformation starts now.",
  },
];

const testimonials = [
  {
    quote:
      "Being part of Aetos Talent Factory Mentorship has been a defining step in my career as a UI/UX designer.Beyond the projects, the community creates valuable networking opportunities that have connected me with like-minded professionals, mentors, and collaborators who genuinely support one another's progress.The constructive feedback, accountability, and peer support I received built my confidence and strengthened my skills, helping me grow faster than I would have on my own.Through the community, I have met amazing people, gained valuable opportunities, and continue to benefit from the exposure and connections that keep advancing my growth within the tech ecosystem.",
    name: "Oresanwo A. Oluwatosin",
    skill: "UI/UX Designer",
  },
  {
    quote:
      "Years ago, I made a decision that quietly changed the trajectory of my career  joining Aetos Talent Factory Mentorship in 2023 as a Frontend Developer.What I didn't expect was how much of the growth would come not just from the technical side, but from the people around me. The community connected me with mentors, collaborators, and likeminded developers who actually show up for each other.The accountability, the real feedback, the late-night conversations about code and career all of it compounded into a version of me that builds with more confidence and thinks with more clarity.Two years in and I'm still gaining  new opportunities, deeper connections, and a place in a tech ecosystem that continues to push my growth forward.",
    name: "Ochigbo Emmanuel",
    skill: "Frontend Developer",
  },
];

// ── Countdown Badge ───────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
  expired: boolean;
}

function CountdownBadge({ isDark }: { isDark: boolean }) {
  const REGISTRATION_START = new Date("2026-04-15T00:00:00");
  const REGISTRATION_END = new Date("2026-05-25T23:59:59");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    expired: false,
  });
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = REGISTRATION_END.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, expired: true });
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        expired: false,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const now = Date.now();
  const hasStarted = now >= REGISTRATION_START.getTime();
  const isOpen = hasStarted && !timeLeft.expired;

  const units = [
    { value: timeLeft.d, label: "Days" },
    { value: timeLeft.h, label: "Hrs" },
    { value: timeLeft.m, label: "Mins" },
    { value: timeLeft.s, label: "Secs" },
  ];

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-2 px-4 py-3 rounded-2xl"
          style={{
            background: isDark
              ? "rgba(8, 12, 4, 0.88)"
              : "rgba(10, 18, 4, 0.84)",
            border: "1px solid rgba(127,255,0,0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            minWidth: 230,
            boxShadow: "0 0 0 1px rgba(127,255,0,0.06) inset",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full transition-colors"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
            aria-label="Dismiss countdown"
          >
            <X size={10} />
          </button>

          {/* Status row */}
          <div className="flex items-center gap-1.5 pr-5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: timeLeft.expired
                  ? "#ff5555"
                  : isOpen
                    ? "#7fff00"
                    : "#f5a623",
                boxShadow: timeLeft.expired
                  ? "0 0 6px #ff5555"
                  : isOpen
                    ? "0 0 6px rgba(127,255,0,0.7)"
                    : "0 0 6px #f5a623",
                animation: timeLeft.expired
                  ? "none"
                  : "cdPulse 1.8s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-widest font-semibold"
              style={{ color: "rgba(127,255,0,0.75)" }}
            >
              {timeLeft.expired
                ? "Registration closed"
                : !hasStarted
                  ? "Registration opens soon"
                  : "Registration closes in"}
            </span>
          </div>

          {/* Countdown units */}
          {!timeLeft.expired && (
            <div className="flex items-center gap-1.5">
              {units.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className="flex flex-col items-center"
                    style={{ minWidth: 46 }}
                  >
                    <span
                      className="font-semibold leading-none tabular-nums"
                      style={{
                        fontSize: 26,
                        color: "#ffffff",
                        letterSpacing: "-0.5px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {label === "Days" ? timeLeft.d : pad(value)}
                    </span>
                    <span
                      className="uppercase mt-0.5"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.38)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <span
                      className="leading-none"
                      style={{
                        fontSize: 20,
                        color: "rgba(127,255,0,0.35)",
                        marginBottom: 10,
                      }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Deadline date */}
          <p
            className="text-right"
            style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}
          >
            15 Apr – 25 May 2026
          </p>

          <style>{`
            @keyframes cdPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.25; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Shared atoms ──────────────────────────────────────────────────────────────

function Divider({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="w-full h-px"
      style={{ background: isDark ? "#1e2018" : "#dde8cc" }}
    />
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-primary mb-5">
      {text}
    </h3>
  );
}

// ── Collapsible Detail Block ──────────────────────────────────────────────────
function DetailBlock({
  isDark,
  summary,
  children,
  defaultOpen = false,
}: {
  isDark: boolean;
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${isDark ? "#242424" : "#d8d8d8"}`,
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ background: isDark ? "#0f0f0f" : "#f5f5f3" }}
      >
        <span className="font-display font-semibold text-sm text-primary">
          {summary}
        </span>
        <ChevronDown
          size={15}
          className="text-primary shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar({ isDark }: { isDark: boolean }) {
  const stats = [
    { value: "90", unit: "Days", label: "Intensive Program" },
    { value: "12–15", unit: "hrs/wk", label: "Time Commitment" },
    { value: "1-on-1", unit: "", label: "Mentorship Access" },
    { value: "₦60k", unit: "", label: "Program Fee" },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 divide-x"
      style={{
        borderTop: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
        borderBottom: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
      }}
    >
      {stats.map(({ value, unit, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-6 px-4 gap-1"
          style={{
            borderRight: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
          }}
        >
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {value}
            </span>
            {unit && (
              <span className="font-body text-xs text-secondary">{unit}</span>
            )}
          </div>
          <span className="font-body text-xs text-secondary text-center">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MentorshipPage() {
  const { isDark } = useTheme();
  const { openModalById } = useModal();

  const text =
    "Build real products. Work in teams. Gain employment-ready skills.";

  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayed("");
          setIndex(0);
        }, 1500);
      }
    }, 45);

    return () => clearTimeout(timeout);
  }, [index]);

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
              ? "linear-gradient(160deg, #0d1508 0%, #0a0f05 50%, #0a0a0a 100%)"
              : "linear-gradient(160deg, #eef7dc 0%, #e4f2c8 50%, #f4f8ec 100%)",
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
                    ? "rgba(127,255,0,0.15)"
                    : "rgba(80,140,0,0.12)",
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
                color: isDark ? "rgba(127,255,0,0.03)" : "rgba(60,120,0,0.04)",
              }}
            >
              AETOS
            </span>
          </div>

          {/* ── Countdown Badge — top-right of hero ── */}
          <div className="absolute top-23 right-4 sm:right-8 z-20">
            <CountdownBadge isDark={isDark} />
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xl font-display font-semibold text-primary"
                style={{
                  background: isDark
                    ? "rgba(127,255,0,0.08)"
                    : "rgba(60,120,0,0.08)",
                  border: "1px solid rgba(127,255,0,0.25)",
                }}
              >
                <Clock size={11} />
                90-Day Intensive Program
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-center text-primary"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
            >
              Aetos talent factory mentorship
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-secondary font-body text-base sm:text-lg text-center leading-relaxed mt-5 max-w-2xl mx-auto"
            >
              From Junior Developer to Intermediate in 90 Days. A hands-on
              mentorship program designed to transition junior tech
              professionals into intermediate-level contributors through
              real-world execution.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display font-semibold text-xl text-center text-primary mt-5"
            >
              {displayed}
              <span className="animate-pulse">|</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-10 gap-3"
            >
              <button
                onClick={() => openModalById("internship")}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-display font-bold text-sm bg-white text-black hover:opacity-90 transition-all duration-200 group"
              >
                Apply Now
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Stats bar — full-width */}
        <StatsBar isDark={isDark} />

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-5">
          {/* ── Section: Who This Is For ── */}
          <DetailBlock
            isDark={isDark}
            summary="Who This Program Is For"
            defaultOpen
          >
            <p className="text-secondary font-body text-sm leading-relaxed mb-4">
              The Aetos Talent Factory mentorship welcomes junior-level tech
              professionals across multiple disciplines who are ready to
              accelerate their growth through structured, hands-on experience.
            </p>
            <SectionLabel text="Eligible Roles" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {eligibleRoles.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 p-3 rounded-lg"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.03)",
                    border: `1px solid ${isDark ? "#262626" : "#d4d4d4"}`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(127,255,0,0.10)",
                      border: "1px solid rgba(127,255,0,0.18)",
                    }}
                  >
                    <Icon size={13} className="text-primary" />
                  </div>
                  <span className="font-body text-xs text-primary leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* ── Section: Ideal Candidate ── */}
          <DetailBlock isDark={isDark} summary="The Ideal Candidate">
            <p className="text-secondary font-body text-sm leading-relaxed mb-4">
              We are looking for individuals who demonstrate:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {idealCandidateTraits.map(({ title, desc }) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2
                    size={15}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-body font-semibold text-sm text-primary">
                      {title}
                    </p>
                    <p className="text-secondary text-xs font-body mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* ── Section: Eligibility ── */}
          <DetailBlock isDark={isDark} summary="Eligibility Requirements">
            <div className="grid sm:grid-cols-2 gap-3">
              {eligibilityItems.map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "rgba(127,255,0,0.10)",
                      border: "1px solid rgba(127,255,0,0.18)",
                    }}
                  >
                    <Icon size={13} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-primary">
                      {title}
                    </p>
                    <p className="text-secondary text-xs font-body mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* ── Section: What You'll Get ── */}
          <DetailBlock
            isDark={isDark}
            summary="Your 90-Day Transformation Package"
          >
            <p className="text-secondary font-body text-sm leading-relaxed mb-4">
              The Aetos Talent Factory provides more than just training — it's a
              complete career acceleration system.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {whatYoullGet.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-4 rounded-xl"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.03)",
                    border: `1px solid ${isDark ? "#262626" : "#d4d4d4"}`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "rgba(127,255,0,0.10)",
                      border: "1px solid rgba(127,255,0,0.18)",
                    }}
                  >
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-primary leading-tight">
                      {title}
                    </p>
                    <p className="text-secondary text-xs font-body mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* ── Section: Application Process ── */}
          <DetailBlock isDark={isDark} summary="How to Apply">
            <p className="text-secondary font-body text-sm leading-relaxed mb-4">
              Joining the Aetos Talent Factory is a straightforward, multi-stage
              process designed to ensure we select committed and capable
              candidates.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {applicationStages.map(({ stage, title, desc }) => (
                <div
                  key={stage}
                  className="flex gap-3 p-4 rounded-xl"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.03)",
                    border: `1px solid ${isDark ? "#262626" : "#d4d4d4"}`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs text-primary shrink-0"
                    style={{
                      background: "rgba(127,255,0,0.10)",
                      border: "1px solid rgba(127,255,0,0.22)",
                    }}
                  >
                    {stage}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-primary leading-tight">
                      {title}
                    </p>
                    <p className="text-secondary text-xs font-body mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* ── Section: Track Record ── */}
          <DetailBlock isDark={isDark} summary="Our Track Record">
            <p className="text-secondary font-body text-sm leading-relaxed mb-4">
              The Aetos Talent Factory has helped dozens of junior professionals
              transition into intermediate-level roles with confidence and
              competence.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {testimonials.map(({ quote, name, skill }) => (
                <div
                  key={name}
                  className="p-4 rounded-xl"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.03)",
                    border: `1px solid ${isDark ? "#262626" : "#d4d4d4"}`,
                  }}
                >
                  <p className="text-secondary font-body text-sm leading-relaxed italic mb-3">
                    "{quote}"
                  </p>
                  <p className="font-display font-semibold text-xs text-primary">
                    — {name}
                  </p>
                  <p className="font-display font-semibold text-xs text-primary">
                    — {skill}
                  </p>
                </div>
              ))}
            </div>
          </DetailBlock>

          <Divider isDark={isDark} />

          {/* Apply CTA */}
          <div className="flex flex-col items-center gap-2 py-4">
            <button
              onClick={() => openModalById("internship")}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary hover:text-primary transition-all duration-200 group"
              style={{ border: `1px solid ${isDark ? "#383838" : "#bbb"}` }}
            >
              Apply Now
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
            <p className="text-muted text-xs font-body">
              Questions? Email us at{" "}
              <a
                href="mailto:talent@aetos.com.ng"
                className="text-primary underline underline-offset-2"
              >
                talent@aetos.com.ng
              </a>
            </p>
          </div>

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
          <Heart size={16} className="text-primary" />
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg text-primary">
          We value your interest
        </h3>
      </div>
      <p className="text-secondary font-body text-sm sm:text-base leading-relaxed">
        We value your interest and appreciate the time and effort you put into
        your application. Our team looks forward to reviewing your application
        and finding the best talent to join our vibrant and innovative team.
        Apply now and take the next step towards an exciting and fulfilling
        career with Us!
      </p>
    </motion.div>
  );
}
