import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const footerLinks = {
  Home: [
    { label: "Contact", href: "/contact" },
    { label: "Projects", href: "/projects" },
    // { label: "Mentorship", href: "/enrol" },

  ],
  Services: [
    { label: "Web Development", href: "/contact" },
    { label: "Mobile App Development", href: "/contact" },
    { label: "AI", href: "/contact" },
    { label: "QA testing", href: "/contact" },
    { label: "Code Audit & penetration testing", href: "/contact" },
    { label: "Cloud Computing (AWS)", href: "/contact" },
    { label: "Maintenance support", href: "/contact" },
  ],
  Careers: [
    { label: "Mentorship", href: "/enrol" },
    { label: "Hire Developers", href: "/hire" },
  ],
};

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/aetos-agency-technology/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/aetosagency_atfm?igsh=MXhzc2VvdGV4NWwwaA==",
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: "https://x.com/AetosTalent?t=Sj5mBgcHWhP2OQSLqEg74A&s=09",
    label: "Twitter / X",
  },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`border-t border-subtle ${
        isDark ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      {/* Top bar: Logo + Socials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="inline-block">
            <img
              src="/logo.png"
              alt="Aetos"
              className="h-8 w-auto rounded-2xl object-contain"
            />
          </Link>

          {/* Socials */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-secondary text-sm font-body hidden md:block">
              Follow Us On Social Media
            </span>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-subtle text-secondary hover:text-brand hover:border-brand transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-subtle" />

      {/* Middle: Nav sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile: stacked columns, centered */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div
              key={section}
              className="flex flex-col items-center text-center"
            >
              <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider mb-3">
                {section}
              </h4>
              <ul className="flex flex-col items-center gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-secondary hover:text-primary text-sm font-body transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:flex md:flex-row md:justify-between gap-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div
              key={section}
              className={
                section === "Services" ? "flex-1 max-w-sm" : "shrink-0"
              }
            >
              <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider mb-4">
                {section}
              </h4>

              {section === "Services" ? (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  {links.map((link, i) => (
                    <span key={link.label} className="flex items-center gap-2">
                      <Link
                        to={link.href}
                        className="text-secondary hover:text-primary text-sm font-body transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                      {i < links.length - 1 && (
                        <span className="text-muted text-xs select-none">
                          •
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-secondary hover:text-primary text-sm font-body transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={11}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t border-subtle ${
          isDark ? "bg-[#080808]" : "bg-light-card"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted text-xs font-body">
            ©{new Date().getFullYear()} Aetos. All Rights Reserved.
          </p>
          <p className="text-muted text-xs font-body hidden sm:block">
            Version 1.0
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-muted hover:text-secondary text-xs font-body transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted hover:text-secondary text-xs font-body transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/cookies"
              className="text-muted hover:text-secondary text-xs font-body transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}