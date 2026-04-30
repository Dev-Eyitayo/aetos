import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const partners = [
  { id: "1", name: "MyCliq", logo: "/mycliq.png" },
  { id: "2", name: "Sync360", logo: "/sync.png" },
  { id: "3", name: "ToltiMed", logo: "/toltim.png" },
  { id: "4", name: "WagesFinance", logo: "/wages.png" },
  { id: "5", name: "Needz", logo: "/needz.png" },
];

const marqueeItems = [...partners, ...partners];

export default function Partners() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();

  return (
    <section
      ref={ref}
      className={`section-pad ${isDark ? "bg-[#0d0d0d]" : "bg-light-card"}`}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 18s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
            Our <span className="text-[#7D75E0]">Partners and Clients</span>
          </h2>
          <p className="text-secondary font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            We are grateful for the opportunity to work with esteemed partners
            and clients. Our strong relationships are a testament to our
            dedication and expertise in the digital realm.
          </p>
        </motion.div>

        {/* Mobile marquee */}
        <div className="sm:hidden overflow-hidden">
          <div className="flex marquee-track w-max">
            {marqueeItems.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className={`card flex items-center justify-center px-6 py-4 mx-3 shrink-0 w-36 h-20 hover:border-brand/30 transition-all duration-300 ${isDark ? "" : "bg-white"}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden sm:flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`card flex items-center justify-center px-6 py-4 w-36 h-20 hover:border-brand/30 transition-all duration-300 cursor-pointer ${isDark ? "" : "bg-white"}`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 max-w-full object-contain"
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
