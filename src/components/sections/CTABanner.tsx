import { useRef } from "react";
import { motion, useInView } from "framer-motion";
// import { ArrowRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
// import { useModal } from "../../hooks/useModal";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();
  // const { openModal } = useModal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden section-pad"
      style={{
        background: isDark ? "#0e0e0e" : "#f9f9f9",
      }}
    >
      {/* Dot / cross grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 40%, #0e0e0e 100%)"
            : "radial-gradient(ellipse at center, transparent 40%, #f9f9f9 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-6 py-16 sm:py-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight"
          >
            Ready to{" "}
            <span className="text-[#D68BDA]">
              Transform Your Digital Presence?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-secondary font-body text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Take the first step towards digital success with Us by your side.
            Our team of experts is eager to craft tailored solutions that drive
            growth for your business. Whether you need a stunning website, a
            powerful mobile app, or a data-driven marketing campaign, we've got
            you covered. Let's embark on this transformative journey together.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="text-primary font-display font-semibold text-sm tracking-wide"
          >
            Unlock Your Digital Potential Today
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={openModal}
              className="inline-flex bg-white items-center gap-2 px-8 py-4 rounded-full border border-primary text-black font-display font-semibold text-base hover:bg-primary hover:text-background transition-all duration-300 group"
            >
              Get In Touch
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
