import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
  { label: "Mentorship", href: "/enrol" },
  { label: "Hire Talent", href: "/hire" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 px-4"
      >
        {/* ── Mobile: Logo left + Menu icon right ── */}
        <div
          className="md:hidden flex items-center justify-between w-full px-4 py-2 rounded-full"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src="/logo.png"
              alt="Aetos"
              className="h-8 w-auto rounded-2xl object-contain"
            />
          </Link>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center p-1.5 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={22} className="text-primary" />
            ) : (
              <Menu size={22} className="text-primary" />
            )}
          </button>
        </div>

        {/* ── Desktop pill navbar ── */}
        <div
          className="hidden md:flex items-center justify-between gap-2 px-4 w-full max-w-6xl py-4 rounded-full"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          }}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Aetos"
              className="h-8 w-auto rounded-2xl object-contain"
            />
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-1.5 text-sm font-medium transition-all duration-200 font-body rounded-full ${
                  location.pathname === item.href ||
                  (item.href === "/" && location.pathname === "/")
                    ? isDark
                      ? "text-white border border-white/20 bg-white/10"
                      : "text-black border border-black/20 bg-black/10"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-49 pt-24 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}
          >
            <nav className="flex flex-col p-6 gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNav(item.href)}
                    className={`block w-full text-left px-4 py-4 text-xl font-display font-semibold rounded-xl transition-all ${
                      location.pathname === item.href
                        ? "text-brand"
                        : "text-primary hover:text-brand"
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
