import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  Code2,
  Smartphone,
  Figma,
  BarChart3,
  TestTube2,
  Users,
  BookOpen,
  Briefcase,
  Star,
  Laptop,
  Wifi,
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

// ── Shared data ───────────────────────────────────────────────────────────────
const tracks = [
  {
    id: "frontend",
    Icon: Monitor,
    title: "Frontend Development",
    subtitle: "React, Next.js",
  },
  {
    id: "backend",
    Icon: Code2,
    title: "Backend Development",
    subtitle: "Node.js, Laravel, Python",
  },
  {
    id: "mobile",
    Icon: Smartphone,
    title: "Mobile App Development",
    subtitle: "Flutter, React Native",
  },
  { id: "design", Icon: Figma, title: "UI/UX Design", subtitle: "" },
  { id: "product", Icon: BarChart3, title: "Product Management", subtitle: "" },
  { id: "qa", Icon: TestTube2, title: "QA & Software Testing", subtitle: "" },
];

// Extended eligible roles from the doc
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
    Icon: Laptop,
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
      "Before Aetos, I struggled to get past first-round interviews. After 90 days, I had two job offers and the confidence to negotiate. The real project experience made all the difference.",
    name: "Frontend Developer",
  },
  {
    quote:
      "Working in a structured team taught me more in 3 months than a year of solo learning. I can now explain my work, defend my decisions, and contribute meaningfully to product builds.",
    name: "Product Manager",
  },
];

const hireRequirements = [
  { Icon: Laptop, label: "Laptop" },
  { Icon: Wifi, label: "Stable Internet" },
  { Icon: Brain, label: "Willingness to learn" },
  { Icon: Heart, label: "Good Behavior" },
];

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
    <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-brand mb-5">
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
          className="text-brand shrink-0 transition-transform duration-300"
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

// ── Internship Panel ──────────────────────────────────────────────────────────
function InternshipPanel({
  isDark,
  onApply,
}: {
  isDark: boolean;
  onApply: () => void;
}) {
  return (
    <motion.div
      key="internship"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #141c0e 0%, #0f1508 100%)"
          : "linear-gradient(160deg, #f2f8e8 0%, #e6f2d4 100%)",
        border: `1px solid ${isDark ? "#1e2a14" : "#c8dca8"}`,
      }}
    >
      {/* ── Header ── */}
      <div className="px-6 sm:px-10 pt-10 pb-8 text-center">
        {/* 90-day badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 text-xs font-display font-semibold text-brand"
          style={{
            background: isDark ? "rgba(127,255,0,0.08)" : "rgba(60,120,0,0.08)",
            border: "1px solid rgba(127,255,0,0.22)",
          }}
        >
          <Clock size={11} /> 90-Day Intensive Program
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-brand">
          Aetos Talent Factory
        </h2>
        <p className="text-secondary font-body text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          From Junior Developer to Intermediate in 90 Days. A hands-on
          mentorship program designed to transition junior tech professionals
          into intermediate-level contributors through real-world execution.
        </p>
        <p className="font-display font-semibold text-sm text-primary mt-3">
          Build real products. Work in teams. Gain employment-ready skills.
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-10 flex flex-col gap-5">
        <Divider isDark={isDark} />

        {/* ── Section 2: Who This Is For ── */}
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
                  <Icon size={13} className="text-brand" />
                </div>
                <span className="font-body text-xs text-primary leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </DetailBlock>

        {/* ── Section 3: Ideal Candidate ── */}
        <DetailBlock isDark={isDark} summary="The Ideal Candidate">
          <p className="text-secondary font-body text-sm leading-relaxed mb-4">
            We are looking for individuals who demonstrate:
          </p>
          <div className="flex flex-col gap-3">
            {idealCandidateTraits.map(({ title, desc }) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2
                  size={15}
                  className="text-brand shrink-0 mt-0.5"
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

        {/* ── Section 4: Eligibility ── */}
        <DetailBlock isDark={isDark} summary="Eligibility Requirements">
          <div className="flex flex-col gap-3">
            {eligibilityItems.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "rgba(127,255,0,0.10)",
                    border: "1px solid rgba(127,255,0,0.18)",
                  }}
                >
                  <Icon size={13} className="text-brand" />
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

        {/* ── Section 5: What You'll Get ── */}
        <DetailBlock
          isDark={isDark}
          summary="Your 90-Day Transformation Package"
        >
          <p className="text-secondary font-body text-sm leading-relaxed mb-4">
            The Aetos Talent Factory provides more than just training — it's a
            complete career acceleration system.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
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
                  <Icon size={14} className="text-brand" />
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

        {/* ── Section 6: Application Process ── */}
        <DetailBlock isDark={isDark} summary="How to Apply">
          <p className="text-secondary font-body text-sm leading-relaxed mb-4">
            Joining the Aetos Talent Factory is a straightforward, multi-stage
            process designed to ensure we select committed and capable
            candidates.
          </p>
          <div className="flex flex-col gap-3">
            {applicationStages.map(({ stage, title, desc }) => (
              <div key={stage} className="flex gap-3 items-start">
                {/* Stage number */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs text-brand"
                    style={{
                      background: "rgba(127,255,0,0.10)",
                      border: "1px solid rgba(127,255,0,0.22)",
                    }}
                  >
                    {stage}
                  </div>
                  {/* connector line */}
                  {stage !== "06" && (
                    <div
                      className="w-px flex-1 mt-1.5 mb-0"
                      style={{
                        background: isDark ? "#262626" : "#d4d4d4",
                        minHeight: 16,
                      }}
                    />
                  )}
                </div>
                <div className="pb-3">
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

        {/* ── Section 7: Track Record / Testimonials ── */}
        <DetailBlock isDark={isDark} summary="Our Track Record">
          <p className="text-secondary font-body text-sm leading-relaxed mb-4">
            The Aetos Talent Factory has helped dozens of junior professionals
            transition into intermediate-level roles with confidence and
            competence.
          </p>
          <div className="flex flex-col gap-3">
            {testimonials.map(({ quote, name }) => (
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
                <p className="font-display font-semibold text-xs text-brand">
                  — {name}
                </p>
              </div>
            ))}
          </div>
        </DetailBlock>

        <Divider isDark={isDark} />

        {/* Apply CTA */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onApply}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary hover:text-brand transition-all duration-200 group"
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
              className="text-brand underline underline-offset-2"
            >
              talent@aetos.com.ng
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Hire Panel ────────────────────────────────────────────────────────────────
function HirePanel({
  isDark,
  onConsult,
}: {
  isDark: boolean;
  onConsult: () => void;
}) {
  const topRow = tracks.slice(0, 3);
  const bottomRow = tracks.slice(3);

  return (
    <motion.div
      key="hire"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "#131313" : "#f4f4f2",
        border: `1px solid ${isDark ? "#202020" : "#d4d4d4"}`,
      }}
    >
      {/* Header */}
      <div className="px-6 sm:px-10 pt-10 pb-8 text-center">
        <h2
          className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4"
          style={{
            background:
              "linear-gradient(130deg, #ffb899 0%, #ff8050 55%, #d05020 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hire Developers &amp; Tech Talent
        </h2>
        <p className="text-secondary font-body text-sm sm:text-base">
          Hire developers without recruitment headaches.
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-10 flex flex-col gap-8">
        {/* Inner bordered tracks card */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${isDark ? "#242424" : "#d0d0d0"}` }}
        >
          <div
            className="px-5 py-4"
            style={{
              background: isDark ? "#0f0f0f" : "#ececea",
              borderBottom: `1px solid ${isDark ? "#1e1e1e" : "#d0d0d0"}`,
            }}
          >
            <span className="font-display font-semibold text-xs uppercase tracking-widest text-brand">
              Tracks
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              borderBottom: `1px solid ${isDark ? "#1e1e1e" : "#d0d0d0"}`,
            }}
          >
            {topRow.map(({ id, Icon, title, subtitle }, i) => (
              <div
                key={id}
                className="flex flex-col gap-3 p-5"
                style={{
                  background: isDark ? "#111111" : "#f8f8f6",
                  borderRight:
                    i < 2
                      ? `1px solid ${isDark ? "#1e1e1e" : "#d0d0d0"}`
                      : undefined,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)",
                    border: `1px solid ${isDark ? "#2e2e2e" : "#d0d0d0"}`,
                  }}
                >
                  <Icon size={15} className="text-secondary" />
                </div>
                <div>
                  <p className="font-body font-bold text-sm text-primary">
                    {title}
                  </p>
                  {subtitle && (
                    <p className="text-muted text-xs font-body mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3">
            {bottomRow.map(({ id, Icon, title }, i) => (
              <div
                key={id}
                className="flex flex-col gap-3 p-5"
                style={{
                  background: isDark ? "#111111" : "#f8f8f6",
                  borderRight:
                    i < 2
                      ? `1px solid ${isDark ? "#1e1e1e" : "#d0d0d0"}`
                      : undefined,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)",
                    border: `1px solid ${isDark ? "#2e2e2e" : "#d0d0d0"}`,
                  }}
                >
                  <Icon size={15} className="text-secondary" />
                </div>
                <p className="font-body font-bold text-sm text-primary">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <SectionLabel text="What They'll Come With" />
          <ul className="grid grid-cols-2 gap-3">
            {hireRequirements.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                    border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
                  }}
                >
                  <Icon size={13} className="text-secondary" />
                </div>
                <span className="font-body text-sm text-primary">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consult CTA */}
        <div className="flex justify-center">
          <button
            onClick={onConsult}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary hover:text-brand transition-all duration-200 group"
            style={{ border: `1px solid ${isDark ? "#383838" : "#bbb"}` }}
          >
            Consult Us Today
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── We Value Your Interest ────────────────────────────────────────────────────
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
          <Heart size={16} className="text-brand" />
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg text-brand">
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

// ── Page ──────────────────────────────────────────────────────────────────────
type Tab = "internship" | "hire";

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("internship");
  const { isDark } = useTheme();
  const { openModalById } = useModal();

  return (
    <>
      <div
        className={`min-h-screen pt-20 relative overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-light"}`}
      >
        {/* Decorative dots */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
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
          ].map(([l, t], i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2,
                height: 2,
                background: isDark
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(0,0,0,0.10)",
                top: `${t}%`,
                left: `${l}%`,
              }}
            />
          ))}
        </div>

        {/* ── Hero ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4"
          >
            Learn. Build. Grow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-secondary font-body text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto"
          >
            Whether you're starting out or looking to work on meaningful
            projects, this is where growth begins.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {(["internship", "hire"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-display font-semibold text-sm transition-all duration-200 group"
                style={{
                  borderColor:
                    activeTab === tab
                      ? "var(--color-brand-green)"
                      : isDark
                        ? "#383838"
                        : "#c0c0c0",
                  color:
                    activeTab === tab
                      ? "var(--color-brand-green)"
                      : isDark
                        ? "#d0d0d0"
                        : "#333",
                }}
              >
                {tab === "internship"
                  ? "Apply For Internship"
                  : "Hire Developers or Tech Talents"}
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-1 w-fit mx-auto rounded-xl p-1"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.05)",
              border: `1px solid ${isDark ? "#222" : "#ddd"}`,
            }}
          >
            {(["internship", "hire"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-5 py-2 rounded-lg font-display font-semibold text-sm transition-colors duration-200"
                style={{
                  color: activeTab === tab ? "#000" : isDark ? "#666" : "#888",
                }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="careers-tab-bg"
                    className="absolute inset-0 rounded-lg bg-brand"
                    transition={{
                      type: "spring",
                      bounce: 0.18,
                      duration: 0.42,
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative" style={{ zIndex: 1 }}>
                  {tab === "internship" ? "Internship" : "Hire"}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Tab Panels ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === "internship" ? (
              <InternshipPanel
                key="internship"
                isDark={isDark}
                onApply={() => openModalById("internship")}
              />
            ) : (
              <HirePanel
                key="hire"
                isDark={isDark}
                onConsult={() => openModalById("consultation")}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── Value Card ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
          <ValueCard isDark={isDark} />
        </div>
      </div>

      <CTABanner />
    </>
  );
}
