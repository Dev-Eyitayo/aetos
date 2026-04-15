import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { useTheme } from "../../hooks/useTheme";
import { useFirebaseSubmit } from "../../hooks/useFirebaseSubmit";

// ── Types ─────────────────────────────────────────────────────────────────────
interface MentorshipForm {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  ageRange: string;
  gender: string;
  currentStatus: string;
  careerPath: string;
  whyJoin: string;
  problemSolving: string;
  successVision: string;
  weeklyCommitment: string;
  priorProgram: string;
  commitmentFee: string;
}

const EMPTY: MentorshipForm = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  ageRange: "",
  gender: "",
  currentStatus: "",
  careerPath: "",
  whyJoin: "",
  problemSolving: "",
  successVision: "",
  weeklyCommitment: "",
  priorProgram: "",
  commitmentFee: "",
};

// ── Static options ────────────────────────────────────────────────────────────
const CAREER_PATHS = [
  "Backend Developer",
  "Web Frontend Developer",
  "Mobile Frontend Developer",
  "UI/UX Designer",
  "Product Manager",
  "Project Manager",
  "DevOps Engineer",
  "Product Marketer",
  "QA Tester",
  "Cybersecurity",
];

const CURRENT_STATUSES = ["Student", "NYSC", "Unemployed", "Employed"];
const AGE_RANGES = ["18–21", "22–25", "26–30", "31–35", "36+"];
const GENDERS = ["Male", "Female", "Prefer not to say"];
const YES_NO = ["Yes", "No"];

// ── Shared atoms ──────────────────────────────────────────────────────────────
function FieldInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  isDark,
  required,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  isDark: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-body text-xs font-medium"
        style={{ color: isDark ? "#888" : "#666" }}
      >
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${focused ? "var(--color-brand-green)" : isDark ? "#2a2a2a" : "#d8d8d8"}`,
          color: isDark ? "#f0f0f0" : "#111",
        }}
      />
    </div>
  );
}

function FieldTextarea({
  label,
  placeholder,
  value,
  onChange,
  isDark,
  rows = 4,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  isDark: boolean;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-body text-xs font-medium"
        style={{ color: isDark ? "#888" : "#666" }}
      >
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200 resize-none"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
          color: isDark ? "#f0f0f0" : "#111",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-brand-green)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = isDark ? "#2a2a2a" : "#d8d8d8";
        }}
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  isDark,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  isDark: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-body text-xs font-medium"
        style={{ color: isDark ? "#888" : "#666" }}
      >
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200 appearance-none cursor-pointer"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d8"}`,
          color: value
            ? isDark
              ? "#f0f0f0"
              : "#111"
            : isDark
              ? "#555"
              : "#aaa",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-brand-green)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = isDark ? "#2a2a2a" : "#d8d8d8";
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option
            key={o}
            value={o}
            style={{
              color: isDark ? "#f0f0f0" : "#111",
              background: isDark ? "#1a1a1a" : "#fff",
            }}
          >
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  isDark,
  small = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  isDark: boolean;
  small?: boolean;
}) {
  return (
    <label
      onClick={onChange} // ← ADD THIS
      className={`flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-150 select-none ${small ? "px-3 py-2" : "px-4 py-3"}`}
      style={{
        background: checked
          ? isDark
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.07)"
          : "transparent",
        border: `1px solid ${checked ? (isDark ? "#333" : "#b8b8b8") : "transparent"}`,
      }}
    >
      <span
        className="flex items-center justify-center shrink-0 rounded transition-all duration-150"
        style={{
          width: small ? 16 : 18,
          height: small ? 16 : 18,
          background: checked
            ? "var(--color-brand-green)"
            : isDark
              ? "#222"
              : "#eee",
          border: `1.5px solid ${checked ? "var(--color-brand-green)" : isDark ? "#3a3a3a" : "#ccc"}`,
        }}
      >
        {checked && (
          <Check size={small ? 10 : 11} strokeWidth={3} color="#000" />
        )}
      </span>
      <span
        className="font-body text-sm"
        style={{ color: isDark ? "#d0d0d0" : "#222" }}
      >
        {label}
      </span>
    </label>
  );
}

function YesNoToggle({
  label,
  value,
  onChange,
  isDark,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p
        className="font-body text-xs font-medium"
        style={{ color: isDark ? "#888" : "#666" }}
      >
        {label}
      </p>
      <div className="flex gap-2">
        {YES_NO.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className="flex-1 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-150"
              style={{
                background: active
                  ? "rgba(127,255,0,0.12)"
                  : isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.04)",
                border: `1px solid ${active ? "var(--color-brand-green)" : isDark ? "#2a2a2a" : "#d8d8d8"}`,
                color: active
                  ? "var(--color-brand-green)"
                  : isDark
                    ? "#888"
                    : "#666",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  hint,
  isDark,
  children,
  className = "",
}: {
  title: string;
  hint?: string;
  isDark: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 flex flex-col gap-4 ${className}`}
      style={{
        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
        border: `1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"}`,
      }}
    >
      <div>
        <h3 className="font-display font-bold text-sm text-primary inline">
          {title}
        </h3>
        {hint && (
          <span
            className="font-body text-xs ml-1.5"
            style={{ color: isDark ? "#555" : "#aaa" }}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function InternshipModal() {
  const { activeModal, closeModalById } = useModal();
  const { isDark } = useTheme();
  const { submit, loading } = useFirebaseSubmit('mentorship_applications');
  const isOpen = activeModal === "internship";

  const [form, setForm] = useState<MentorshipForm>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof MentorshipForm) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModalById();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [closeModalById]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setForm(EMPTY);
      }, 400);
    }
  }, [isOpen]);

  const canSubmit =
    form.fullName &&
    form.email &&
    form.phone &&
    form.location &&
    form.ageRange &&
    form.gender &&
    form.currentStatus &&
    form.careerPath &&
    form.whyJoin &&
    form.problemSolving &&
    form.successVision &&
    form.weeklyCommitment &&
    form.priorProgram &&
    form.commitmentFee;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      await submit({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        ageRange: form.ageRange,
        gender: form.gender,
        currentStatus: form.currentStatus,
        careerPath: form.careerPath,
        whyJoin: form.whyJoin,
        problemSolving: form.problemSolving,
        successVision: form.successVision,
        weeklyCommitment: form.weeklyCommitment,
        priorProgram: form.priorProgram,
        commitmentFee: form.commitmentFee,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit form:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="intern-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModalById}
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.84)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Sheet */}
          <motion.div
            key="intern-modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none"
            style={{ padding: "2rem 1rem" }}
          >
            <div
              className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: isDark ? "#0e0e0e" : "#f8f8f6",
                border: `1px solid ${isDark ? "#222" : "#d8d8d8"}`,
                boxShadow: "0 32px 80px rgba(0,0,0,0.65)",
                scrollbarWidth: "thin",
                scrollbarColor: isDark
                  ? "#2a2a2a transparent"
                  : "#d0d0d0 transparent",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModalById}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                  border: `1px solid ${isDark ? "#2a2a2a" : "#d0d0d0"}`,
                }}
              >
                <X size={15} className="text-secondary" />
              </button>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success ── */
                  <motion.div
                    key="intern-success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-24 px-8 flex flex-col items-center text-center gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(127,255,0,0.12)",
                        border: "2px solid rgba(127,255,0,0.35)",
                      }}
                    >
                      <Check
                        size={32}
                        className="text-brand"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-primary">
                      Application Submitted!
                    </h3>
                    <p className="text-secondary font-body text-sm max-w-sm leading-relaxed">
                      Thanks for applying to the Aetos Talent Factory! We'll
                      review your application and reach out within 3–5 business
                      days.
                    </p>
                    <button
                      onClick={closeModalById}
                      className="mt-2 px-8 py-3.5 rounded-xl bg-brand text-black font-display font-bold text-sm hover:bg-brand-green-dim transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="intern-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 p-6 sm:p-8"
                  >
                    {/* Header */}
                    <div className="text-center mb-2 pr-8">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-display font-semibold text-brand mb-3"
                        style={{
                          background: "rgba(127,255,0,0.08)",
                          border: "1px solid rgba(127,255,0,0.25)",
                        }}
                      >
                        90-Day Intensive Program
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-2">
                        Apply to Talent Factory
                      </h2>
                      <p className="text-secondary font-body text-sm leading-relaxed">
                        Fill in your details carefully. All fields marked{" "}
                        <span className="text-brand">*</span> are required.
                      </p>
                    </div>

                    {/* ── 1. Personal Information ── */}
                    <SectionCard title="Personal Information" isDark={isDark}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FieldInput
                          label="Full Name"
                          placeholder="e.g. Chukwuemeka Obi"
                          value={form.fullName}
                          onChange={set("fullName")}
                          isDark={isDark}
                          required
                        />
                        <FieldInput
                          label="Email Address"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={set("email")}
                          isDark={isDark}
                          required
                        />
                        <FieldInput
                          label="Phone Number (WhatsApp preferred)"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={form.phone}
                          onChange={set("phone")}
                          isDark={isDark}
                          required
                        />
                        <FieldInput
                          label="Location (City, State, Country)"
                          placeholder="e.g. Lagos, Lagos, Nigeria"
                          value={form.location}
                          onChange={set("location")}
                          isDark={isDark}
                          required
                        />
                        <FieldSelect
                          label="Age Range"
                          value={form.ageRange}
                          onChange={set("ageRange")}
                          options={AGE_RANGES}
                          placeholder="Select age range"
                          isDark={isDark}
                          required
                        />
                        <FieldSelect
                          label="Gender"
                          value={form.gender}
                          onChange={set("gender")}
                          options={GENDERS}
                          placeholder="Select gender"
                          isDark={isDark}
                          required
                        />
                      </div>
                    </SectionCard>

                    {/* ── 2. Background ── */}
                    <SectionCard title="Background" isDark={isDark}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FieldSelect
                          label="Current Status"
                          value={form.currentStatus}
                          onChange={set("currentStatus")}
                          options={CURRENT_STATUSES}
                          placeholder="Select current status"
                          isDark={isDark}
                          required
                        />
                      </div>
                      {/* Career path as checklist — full width */}
                      <div>
                        <p
                          className="font-body text-xs font-medium mb-2"
                          style={{ color: isDark ? "#888" : "#666" }}
                        >
                          What career path are you in?
                          <span className="text-brand ml-0.5">*</span>
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          {CAREER_PATHS.map((path) => (
                            <CheckRow
                              key={path}
                              label={path}
                              checked={form.careerPath === path}
                              onChange={() => set("careerPath")(path)}
                              isDark={isDark}
                            />
                          ))}
                        </div>
                      </div>
                    </SectionCard>

                    {/* ── 3. Motivation ── */}
                    <SectionCard title="Motivation" isDark={isDark}>
                      <FieldTextarea
                        label="Why do you want to join the Aetos Talent Factory Mentorship Program?"
                        placeholder="Tell us what draws you to this program..."
                        value={form.whyJoin}
                        onChange={set("whyJoin")}
                        isDark={isDark}
                        rows={3}
                        required
                      />
                      <FieldTextarea
                        label="What problem in your life or career are you trying to solve right now?"
                        placeholder="Be as specific as possible..."
                        value={form.problemSolving}
                        onChange={set("problemSolving")}
                        isDark={isDark}
                        rows={3}
                        required
                      />
                      <FieldTextarea
                        label="What does success look like for you in the next 12 months?"
                        placeholder="Paint us a picture of where you want to be..."
                        value={form.successVision}
                        onChange={set("successVision")}
                        isDark={isDark}
                        rows={3}
                        required
                      />
                    </SectionCard>

                    {/* ── 4. Commitment ── */}
                    <SectionCard title="Commitment" isDark={isDark}>
                      <YesNoToggle
                        label="Are you willing to complete weekly tasks and deadlines? *"
                        value={form.weeklyCommitment}
                        onChange={set("weeklyCommitment")}
                        isDark={isDark}
                      />
                      <div
                        className="h-px"
                        style={{ background: isDark ? "#1e1e1e" : "#e8e8e8" }}
                      />
                      <YesNoToggle
                        label="Have you ever committed to a structured program before? *"
                        value={form.priorProgram}
                        onChange={set("priorProgram")}
                        isDark={isDark}
                      />
                      <div
                        className="h-px"
                        style={{ background: isDark ? "#1e1e1e" : "#e8e8e8" }}
                      />
                      <YesNoToggle
                        label="Are you committed to paying the commitment fee (₦60,000) if selected? *"
                        value={form.commitmentFee}
                        onChange={set("commitmentFee")}
                        isDark={isDark}
                      />
                    </SectionCard>

                    {/* ── Submit ── */}
                    <div className="flex justify-center pt-2 pb-1">
                      <button
                        type="submit"
                        disabled={loading || !canSubmit}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-200 group"
                        style={{
                          background: canSubmit
                            ? isDark
                              ? "#ffffff"
                              : "#111111"
                            : isDark
                              ? "#1a1a1a"
                              : "#e0e0e0",
                          color: canSubmit
                            ? isDark
                              ? "#000000"
                              : "#ffffff"
                            : isDark
                              ? "#444"
                              : "#aaa",
                          opacity: loading ? 0.7 : 1,
                          cursor: canSubmit ? "pointer" : "not-allowed",
                        }}
                        onMouseEnter={(e) => {
                          if (!canSubmit) return;
                          e.currentTarget.style.background =
                            "var(--color-brand-green)";
                          e.currentTarget.style.color = "#000";
                        }}
                        onMouseLeave={(e) => {
                          if (!canSubmit) return;
                          e.currentTarget.style.background = isDark
                            ? "#ffffff"
                            : "#111111";
                          e.currentTarget.style.color = isDark
                            ? "#000"
                            : "#fff";
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight
                              size={15}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
