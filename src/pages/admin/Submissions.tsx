import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Filter, Loader2, ExternalLink } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { 
  collection, 
  getDocs,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'

interface Submission {
  id: string
  name: string
  email: string
  formType: 'contact' | 'consultation' | 'mentorship'
  createdAt: any
  fullData: Record<string, any>
}

const ITEMS_PER_PAGE = 10

export default function AdminSubmissions() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'contact' | 'consultation' | 'mentorship'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all submissions
        const contactDocs = await getDocs(collection(db, 'contact_messages'))
        const consultationDocs = await getDocs(collection(db, 'consultation_requests'))
        const mentorshipDocs = await getDocs(collection(db, 'mentorship_applications'))

        const allSubmissions: Submission[] = [
          ...contactDocs.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name || 'Unknown',
            email: doc.data().email || 'N/A',
            formType: 'contact' as const,
            createdAt: doc.data().createdAt,
            fullData: doc.data(),
          })),
          ...consultationDocs.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name || 'Unknown',
            email: doc.data().email || 'N/A',
            formType: 'consultation' as const,
            createdAt: doc.data().createdAt,
            fullData: doc.data(),
          })),
          ...mentorshipDocs.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().fullName || 'Unknown',
            email: doc.data().email || 'N/A',
            formType: 'mentorship' as const,
            createdAt: doc.data().createdAt,
            fullData: doc.data(),
          })),
        ]

        // Sort by date descending
        allSubmissions.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt)
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })

        setSubmissions(allSubmissions)
        setCurrentPage(1)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submissions'
        setError(errorMessage)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  // Filter submissions
  const filteredSubmissions = filterType === 'all' 
    ? submissions 
    : submissions.filter(s => s.formType === filterType)

  // Paginate
  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedSubmissions = filteredSubmissions.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const formTypeInfo = {
    contact: { label: 'Contact Message', color: '#7fff00' },
    consultation: { label: 'Consultation', color: '#1181EA' },
    mentorship: { label: 'Mentorship App', color: '#a855f7' },
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
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center gap-2 text-sm mb-4"
            style={{ color: '#7fff00' }}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            All Submissions
          </h1>
          <p className="text-sm mt-1" style={{ color: isDark ? '#888' : '#666' }}>
            Total: {filteredSubmissions.length} submissions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Filter Bar */}
        <div
          className="rounded-xl p-4 border mb-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
          }}
        >
          <div className="flex items-center gap-2">
            <Filter size={16} style={{ color: isDark ? '#888' : '#666' }} />
            <p className="text-sm font-medium" style={{ color: isDark ? '#ccc' : '#333' }}>
              Filter by Type:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'contact', 'consultation', 'mentorship'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilterType(type)
                  setCurrentPage(1)
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: filterType === type ? '#7fff00' : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  color: filterType === type ? '#000' : isDark ? '#ccc' : '#333',
                  border: `1px solid ${filterType === type ? '#7fff00' : isDark ? '#2a2a2a' : '#d8d8d8'}`,
                }}
              >
                {type === 'all' ? 'All' : formTypeInfo[type].label}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <Loader2 size={32} className="animate-spin mx-auto mb-4" style={{ color: '#7fff00' }} />
              <p style={{ color: isDark ? '#888' : '#666' }}>Loading submissions...</p>
            </div>
          </div>
        ) : paginatedSubmissions.length === 0 ? (
          <div
            className="rounded-xl p-8 border text-center"
            style={{
              background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
            }}
          >
            <p style={{ color: isDark ? '#888' : '#666' }}>No submissions found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <div
                className="rounded-xl border overflow-hidden"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
                }}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                        borderBottom: `1px solid ${isDark ? '#1e1e1e' : '#e0e0e0'}`,
                      }}
                    >
                      <th className="px-6 py-3 text-left text-xs font-semibold" style={{ color: isDark ? '#888' : '#666' }}>
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold" style={{ color: isDark ? '#888' : '#666' }}>
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold" style={{ color: isDark ? '#888' : '#666' }}>
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold" style={{ color: isDark ? '#888' : '#666' }}>
                        Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold" style={{ color: isDark ? '#888' : '#666' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{ borderColor: isDark ? '#1e1e1e' : '#e0e0e0' }}
                    className="divide-y"
                  >
                    {paginatedSubmissions.map((submission) => {
                      const createdDate = submission.createdAt?.toDate?.() || new Date(submission.createdAt)
                      const typeInfo = formTypeInfo[submission.formType]

                      return (
                        <tr key={submission.id}>
                          <td className="px-6 py-4 text-sm font-medium" style={{ color: isDark ? '#f0f0f0' : '#111' }}>
                            {submission.name}
                          </td>
                          <td className="px-6 py-4 text-sm" style={{ color: isDark ? '#aaa' : '#555' }}>
                            {submission.email}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: `${typeInfo.color}22`,
                                color: typeInfo.color,
                              }}
                            >
                              {typeInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm" style={{ color: isDark ? '#aaa' : '#555' }}>
                            {createdDate.toLocaleDateString()} {createdDate.toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => navigate(`/admin/submissions/${submission.id}?type=${submission.formType}`)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                              style={{
                                background: isDark ? 'rgba(127, 255, 0, 0.08)' : 'rgba(127, 255, 0, 0.05)',
                                color: '#7fff00',
                              }}
                            >
                              <ExternalLink size={14} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {paginatedSubmissions.map((submission) => {
                const createdDate = submission.createdAt?.toDate?.() || new Date(submission.createdAt)
                const typeInfo = formTypeInfo[submission.formType]

                return (
                  <div
                    key={submission.id}
                    className="rounded-lg p-4 border"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                      borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p style={{ color: isDark ? '#f0f0f0' : '#111' }} className="font-medium text-sm">
                          {submission.name}
                        </p>
                        <p style={{ color: isDark ? '#666' : '#aaa' }} className="text-xs">
                          {submission.email}
                        </p>
                      </div>
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium shrink-0"
                        style={{
                          background: `${typeInfo.color}22`,
                          color: typeInfo.color,
                        }}
                      >
                        {typeInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p style={{ color: isDark ? '#666' : '#aaa' }} className="text-xs">
                        {createdDate.toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => navigate(`/admin/submissions/${submission.id}?type=${submission.formType}`)}
                        className="text-xs font-medium"
                        style={{ color: '#7fff00' }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <p style={{ color: isDark ? '#888' : '#666' }} className="text-sm">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                    style={{
                      background: isDark ? 'rgba(127, 255, 0, 0.08)' : 'rgba(127, 255, 0, 0.05)',
                      color: '#7fff00',
                      border: '1px solid rgba(127, 255, 0, 0.2)',
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                    style={{
                      background: isDark ? 'rgba(127, 255, 0, 0.08)' : 'rgba(127, 255, 0, 0.05)',
                      color: '#7fff00',
                      border: '1px solid rgba(127, 255, 0, 0.2)',
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
