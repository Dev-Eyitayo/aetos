import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  LogOut, 
  TrendingUp,
  Mail,
  MessageSquare,
  Users,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp,
  Query,
  QueryConstraint,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'

interface Submission {
  id: string
  name: string
  email: string
  formType: 'contact' | 'consultation' | 'mentorship'
  createdAt: any
}

interface Metrics {
  totalSubmissions: number
  contactCount: number
  consultationCount: number
  mentorshipCount: number
  submissionsToday: number
  submissionsThisWeek: number
  recentSubmissions: Submission[]
}

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState<Metrics>({
    totalSubmissions: 0,
    contactCount: 0,
    consultationCount: 0,
    mentorshipCount: 0,
    submissionsToday: 0,
    submissionsThisWeek: 0,
    recentSubmissions: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/admin/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get all submissions from all collections
        const contactDocs = await getDocs(collection(db, 'contact_messages'))
        const consultationDocs = await getDocs(collection(db, 'consultation_requests'))
        const mentorshipDocs = await getDocs(collection(db, 'mentorship_applications'))

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

        // Process contact messages
        const contactSubmissions: Submission[] = contactDocs.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown',
          email: doc.data().email || 'N/A',
          formType: 'contact' as const,
          createdAt: doc.data().createdAt,
        }))

        // Process consultation requests
        const consultationSubmissions: Submission[] = consultationDocs.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown',
          email: doc.data().email || 'N/A',
          formType: 'consultation' as const,
          createdAt: doc.data().createdAt,
        }))

        // Process mentorship applications
        const mentorshipSubmissions: Submission[] = mentorshipDocs.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().fullName || 'Unknown',
          email: doc.data().email || 'N/A',
          formType: 'mentorship' as const,
          createdAt: doc.data().createdAt,
        }))

        const allSubmissions = [
          ...contactSubmissions,
          ...consultationSubmissions,
          ...mentorshipSubmissions,
        ]

        // Calculate submissions today and this week
        const submissionsToday = allSubmissions.filter((sub) => {
          const createdDate = sub.createdAt?.toDate?.() || new Date(sub.createdAt)
          return createdDate >= today
        }).length

        const submissionsThisWeek = allSubmissions.filter((sub) => {
          const createdDate = sub.createdAt?.toDate?.() || new Date(sub.createdAt)
          return createdDate >= weekAgo
        }).length

        // Sort by date and get recent submissions
        const sortedSubmissions = [...allSubmissions].sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt)
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })

        setMetrics({
          totalSubmissions: allSubmissions.length,
          contactCount: contactSubmissions.length,
          consultationCount: consultationSubmissions.length,
          mentorshipCount: mentorshipSubmissions.length,
          submissionsToday,
          submissionsThisWeek,
          recentSubmissions: sortedSubmissions.slice(0, 8),
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch metrics'
        setError(errorMessage)
        console.error('Error fetching metrics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    color = 'green',
  }: {
    icon: any
    label: string
    value: number | string
    color?: 'green' | 'blue' | 'purple' | 'orange'
  }) => {
    const colorMap = {
      green: { bg: 'rgba(127, 255, 0, 0.08)', border: 'rgba(127, 255, 0, 0.2)', icon: '#7fff00' },
      blue: { bg: 'rgba(17, 129, 234, 0.08)', border: 'rgba(17, 129, 234, 0.2)', icon: '#1181EA' },
      purple: { bg: 'rgba(168, 85, 247, 0.08)', border: 'rgba(168, 85, 247, 0.2)', icon: '#a855f7' },
      orange: { bg: 'rgba(255, 140, 60, 0.08)', border: 'rgba(255, 140, 60, 0.2)', icon: '#ff8c3c' },
    }

    const scheme = colorMap[color]

    return (
      <div
        className="rounded-xl p-5 border"
        style={{
          background: isDark ? scheme.bg : 'rgba(0, 0, 0, 0.02)',
          borderColor: isDark ? scheme.border : '#e0e0e0',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
              {label}
            </p>
            <p className="text-3xl font-bold mt-2" style={{ color: isDark ? '#fff' : '#000' }}>
              {value}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: scheme.bg, borderColor: scheme.border, border: '1px solid' }}
          >
            <Icon size={18} style={{ color: scheme.icon }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: isDark ? '#0a0a0a' : '#f5f5f3', minHeight: '100vh' }}>
      {/* Header */}
      <div
        className="border-b"
        style={{
          background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
                Admin Dashboard
              </h1>
              <p className="text-sm mt-1" style={{ color: isDark ? '#888' : '#666' }}>
                Welcome back, {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                color: isDark ? '#f0f0f0' : '#111',
                border: `1px solid ${isDark ? '#2a2a2a' : '#d8d8d8'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
              }}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div
            className="rounded-xl p-4 border mb-8 text-sm"
            style={{
              background: 'rgba(255, 59, 48, 0.1)',
              borderColor: 'rgba(255, 59, 48, 0.3)',
              color: '#ff3b30',
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <Loader2 size={32} className="animate-spin mx-auto mb-4" style={{ color: '#7fff00' }} />
              <p style={{ color: isDark ? '#888' : '#666' }}>Loading metrics...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon={FileText}
                label="Total Submissions"
                value={metrics.totalSubmissions}
                color="green"
              />
              <MetricCard
                icon={Calendar}
                label="Submissions Today"
                value={metrics.submissionsToday}
                color="blue"
              />
              <MetricCard
                icon={TrendingUp}
                label="This Week"
                value={metrics.submissionsThisWeek}
                color="purple"
              />
              <MetricCard
                icon={BarChart3}
                label="Growth Status"
                value={metrics.totalSubmissions > 0 ? '↑' : '—'}
                color="orange"
              />
            </div>

            {/* Form Type Breakdown */}
            <div
              className="rounded-xl p-6 border grid grid-cols-1 sm:grid-cols-3 gap-4"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} style={{ color: '#7fff00' }} />
                  <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                    Contact Messages
                  </p>
                </div>
                <p className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
                  {metrics.contactCount}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} style={{ color: '#1181EA' }} />
                  <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                    Consultations
                  </p>
                </div>
                <p className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
                  {metrics.consultationCount}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} style={{ color: '#a855f7' }} />
                  <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                    Applications
                  </p>
                </div>
                <p className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
                  {metrics.mentorshipCount}
                </p>
              </div>
            </div>

            {/* Recent Submissions */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
              }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
                }}
              >
                <h3 className="font-semibold text-sm" style={{ color: isDark ? '#fff' : '#000' }}>
                  Recent Submissions
                </h3>
              </div>

              <div className="divide-y" style={{ borderColor: isDark ? '#1e1e1e' : '#e0e0e0' }}>
                {metrics.recentSubmissions.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p style={{ color: isDark ? '#888' : '#666' }}>No submissions yet</p>
                  </div>
                ) : (
                  metrics.recentSubmissions.map((submission) => {
                    const createdDate = submission.createdAt?.toDate?.() || new Date(submission.createdAt)
                    const formTypeColors = {
                      contact: { label: 'Contact', color: '#7fff00' },
                      consultation: { label: 'Consultation', color: '#1181EA' },
                      mentorship: { label: 'Application', color: '#a855f7' },
                    }
                    const typeInfo = formTypeColors[submission.formType]

                    return (
                      <div key={submission.id} className="px-6 py-4 hover:opacity-75 transition-opacity">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate" style={{ color: isDark ? '#fff' : '#000' }}>
                              {submission.name}
                            </p>
                            <p className="text-xs mt-1" style={{ color: isDark ? '#555' : '#aaa' }}>
                              {submission.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <p
                                className="text-xs font-medium px-2 py-1 rounded-full"
                                style={{
                                  background: `${typeInfo.color}22`,
                                  color: typeInfo.color,
                                }}
                              >
                                {typeInfo.label}
                              </p>
                              <p className="text-xs mt-1" style={{ color: isDark ? '#555' : '#aaa' }}>
                                {createdDate.toLocaleDateString()}
                              </p>
                            </div>
                            <ChevronRight size={16} style={{ color: isDark ? '#444' : '#ccc' }} />
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {metrics.recentSubmissions.length > 0 && (
                <div
                  className="px-6 py-4 border-t text-center"
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)',
                    borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
                  }}
                >
                  <button
                    onClick={() => navigate('/admin/submissions')}
                    className="text-xs font-semibold inline-flex items-center gap-1"
                    style={{ color: '#7fff00' }}
                  >
                    View All Submissions
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
