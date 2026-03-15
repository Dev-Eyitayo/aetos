import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useModal } from '../../hooks/useModal'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Careers', href: '/careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme, isDark } = useTheme()
  const { openModal } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-dark'
              : 'bg-white/90 backdrop-blur-xl border-b border-light'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span
                className="font-display text-2xl font-bold tracking-tight text-primary"
              >
                ae<span className="text-brand">tos</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-body ${
                      isActive
                        ? 'text-brand'
                        : 'text-secondary hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-subtle text-secondary hover:text-primary hover:border-brand transition-all duration-200"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* CTA */}
              <button
                onClick={openModal}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-black font-display font-semibold text-sm hover:bg-brand-green-dim transition-colors duration-200"
              >
                Get Started
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-secondary hover:text-primary"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-40 pt-16 ${
              isDark ? 'bg-[#0a0a0a]' : 'bg-white'
            }`}
          >
            <nav className="flex flex-col p-6 gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-4 text-xl font-display font-semibold rounded-xl transition-all ${
                        isActive ? 'text-brand' : 'text-primary hover:text-brand'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
                className="mt-4"
              >
                <button
                  onClick={() => { setMenuOpen(false); openModal() }}
                  className="block w-full text-center px-5 py-4 rounded-xl bg-brand text-black font-display font-bold text-lg"
                >
                  Get Started
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
