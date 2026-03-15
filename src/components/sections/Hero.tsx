import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useModal } from "../../hooks/useModal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const { isDark } = useTheme();
  const { openModal } = useModal();

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden pt-16 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#f8f8f6]"
      }`}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/4 left-0 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(127,255,0,0.06) 0%, transparent 70%)",
          transform: "translateX(-30%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[calc(100vh-4rem)]">
          {/* Text */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-medium border border-brand/30 text-brand"
                style={{ background: "rgba(127,255,0,0.07)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-primary">Build Software</span>
              <br />
              <span className="text-primary">That Actually</span>
              <br />
              <span className="text-brand">Solves Problems</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.35)}
              className="text-secondary font-body text-base sm:text-lg leading-relaxed max-w-md"
            >
              We design and develop digital products for businesses that want
              systems that work, scale, and make sense.
            </motion.p>

            <motion.div
              {...fadeUp(0.45)}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand text-black font-display font-bold text-sm hover:bg-[#5fcc00] transition-all duration-200 group"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-subtle text-primary font-display font-semibold text-sm hover:border-brand/50 hover:text-brand transition-all duration-200"
              >
                Free Consultation
              </button>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
              {/* Card with full-cover image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${isDark ? "#2a2a2a" : "#d8d8d6"}`,
                  aspectRatio: "4/5",
                }}
              >
                <img
                  src="/hero.png"
                  alt="Hero"
                  className="w-full h-full object-cover object-top"
                />

                {/* Subtle green gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(127,255,0,0.12) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 card px-4 py-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                  <span className="text-brand text-xs font-bold">50+</span>
                </div>
                <div>
                  <p className="text-primary font-display font-bold text-sm leading-none">
                    Projects
                  </p>
                  <p className="text-muted text-xs font-body mt-0.5">
                    Completed
                  </p>
                </div>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-4 -right-4 card px-4 py-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                  <span className="text-brand text-xs font-bold">5★</span>
                </div>
                <div>
                  <p className="text-primary font-display font-bold text-sm leading-none">
                    Client Rating
                  </p>
                  <p className="text-muted text-xs font-body mt-0.5">
                    90% retention
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
