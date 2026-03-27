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
      className={`relative min-h-screen flex items-center overflow-hidden md:pt-16 ${
        isDark ? "bg-[#0a0a0a]" : "bg-light-bg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full py-12 sm:py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-5 lg:gap-8">
            <motion.h1
              {...fadeUp(0.2)}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-brand">Build Software</span>
              <br />
              <span className="text-primary">That Actually</span>
              <br />
              <span className="text-primary">Solves Problems</span>
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
              className="flex items-center gap-3"
            >
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white text-gray-500 font-display font-bold text-sm transition-all duration-200 group whitespace-nowrap"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full border border-subtle text-primary font-display font-semibold text-sm hover:border-brand/50 hover:text-brand transition-all duration-200 whitespace-nowrap"
              >
                Free Consultation
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
              <img
                src="/hero.png"
                alt="Hero"
                className="w-full h-100 md:h-155 object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
