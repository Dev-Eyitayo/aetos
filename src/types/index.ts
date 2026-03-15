// ── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
}

// ── Stats ────────────────────────────────────────────────────────────────────
export interface Stat {
  value: string
  label: string
  description: string
}

// ── Projects / Works ─────────────────────────────────────────────────────────
export interface TeamMember {
  name: string
  avatar?: string
}

export interface TeamGroup {
  role: string
  members: TeamMember[]
}

export interface ProjectDetails {
  category: string
  timeTaken: string
  startDate: string
  completedDate: string
  technologies: string[]        // icon slugs or names
  teamGroups: TeamGroup[]
  methodsUsed: string[]
}

export interface Project {
  id: string
  title: string
  tags: string[]                // e.g. ['Fintech', 'Mobile App Design & Development']
  description: string
  heroGradient: string          // CSS gradient string
  logoBg?: string
  logoText?: string
  logoEmoji?: string
  accentColor: string
  details?: ProjectDetails
}

// ── Services ─────────────────────────────────────────────────────────────────
export interface Service {
  id: string
  icon: string
  title: string
  description?: string
}

// ── Why Choose Us ────────────────────────────────────────────────────────────
export interface ChooseReason {
  icon: string
  title: string
  description: string
}

// ── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  avatar?: string
  platform?: 'twitter' | 'linkedin' | 'instagram'
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQItem {
  id: string
  question: string
  answer: string
}

// ── Partners ─────────────────────────────────────────────────────────────────
export interface Partner {
  id: string
  name: string
  logo: string
}

// ── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactForm {
  name: string
  email: string
  message: string
  service?: string
}
// ── Careers ──────────────────────────────────────────────────────────────────
export interface InternshipTrack {
  id: string
  icon: string
  title: string
  subtitle?: string
}

export interface HireRole {
  id: string
  title: string
  type: string
  location: string
  tags: string[]
}
