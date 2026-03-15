import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

interface PlaceholderProps {
  title: string
  subtitle?: string
}

function PlaceholderPage({ title, subtitle }: PlaceholderProps) {
  const { isDark } = useTheme()
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-light'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <p className="text-brand font-display font-semibold text-sm mb-3 uppercase tracking-widest">Coming Soon</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-primary mb-4">{title}</h1>
        {subtitle && <p className="text-secondary font-body text-base leading-relaxed mb-8">{subtitle}</p>}
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-subtle text-secondary hover:border-brand hover:text-brand font-display font-semibold text-sm transition-all duration-200">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <PlaceholderPage
      title="404 — Not Found"
      subtitle="The page you're looking for doesn't exist or has been moved."
    />
  )
}
