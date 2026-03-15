import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const footerLinks = {
  Home: [
    { label: 'Benefits', href: '/#services' },
    { label: 'Our Testimonials', href: '/#testimonials' },
    { label: 'Partners', href: '/#partners' },
  ],
  Services: [
    { label: 'Web Development', href: '/services/web' },
    { label: 'Mobile App Development', href: '/services/mobile' },
    { label: 'AI', href: '/services/ai' },
    { label: 'QA testing', href: '/services/qa' },
    { label: 'Code Audit & penetration testing', href: '/services/audit' },
    { label: 'Cloud Computing (AWS)', href: '/services/cloud' },
    { label: 'Maintenance support', href: '/services/maintenance' },
  ],
  Careers: [
    { label: 'Internship', href: '/careers' },
    { label: 'Hire Developers', href: '/careers#hire' },
  ],
}

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X' },
]

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer
      className={`border-t border-subtle ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-bold text-primary">
                ae<span className="text-brand">tos</span>
              </span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-xs font-body">
              We design and develop digital products for businesses that want
              systems that work, scale, and make sense.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <span className="text-muted text-xs uppercase tracking-widest font-body">
                Follow Us On Social Media
              </span>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-subtle text-secondary hover:text-brand hover:border-brand transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-secondary hover:text-primary text-sm font-body transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t border-subtle ${
          isDark ? 'bg-[#080808]' : 'bg-light-card'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs font-body">
            ©{new Date().getFullYear()} Aetos. All Rights Reserved.
          </p>
          <p className="text-muted text-xs font-body hidden sm:block">Version 1.0</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-muted hover:text-secondary text-xs font-body transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted hover:text-secondary text-xs font-body transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/cookies" className="text-muted hover:text-secondary text-xs font-body transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
