import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Copy, Check } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

interface SubmissionData {
  id: string
  formType: 'contact' | 'consultation' | 'mentorship'
  createdAt: any
  data: Record<string, any>
}

const collectionMap = {
  contact: 'contact_messages',
  consultation: 'consultation_requests',
  mentorship: 'mentorship_applications',
}

export default function AdminSubmissionDetail() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const formType = (searchParams.get('type') || 'contact') as 'contact' | 'consultation' | 'mentorship'
  const [submission, setSubmission] = useState<SubmissionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!id) return

      try {
        setLoading(true)
        setError(null)

        const collectionName = collectionMap[formType]
        const docRef = doc(db, collectionName, id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          setError('Submission not found')
          return
        }

        setSubmission({
          id: docSnap.id,
          formType,
          createdAt: docSnap.data().createdAt,
          data: docSnap.data(),
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submission'
        setError(errorMessage)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmission()
  }, [id, formType])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A'
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return String(value)
  }

  const formTypeInfo = {
    contact: { label: 'Contact Message', color: '#7fff00' },
    consultation: { label: 'Consultation Request', color: '#1181EA' },
    mentorship: { label: 'Mentorship Application', color: '#a855f7' },
  }

  if (loading) {
    return (
      <div style={{ background: isDark ? '#0a0a0a' : '#f5f5f3', minHeight: '100vh' }}>
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 size={32} className="animate-spin mx-auto mb-4" style={{ color: '#7fff00' }} />
            <p style={{ color: isDark ? '#888' : '#666' }}>Loading submission...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !submission) {
    return (
      <div style={{ background: isDark ? '#0a0a0a' : '#f5f5f3', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/admin/submissions')}
            className="inline-flex items-center gap-2 text-sm mb-8"
            style={{ color: '#7fff00' }}
          >
            <ArrowLeft size={16} />
            Back to Submissions
          </button>
          <div
            className="rounded-xl p-8 border text-center"
            style={{
              background: 'rgba(255, 59, 48, 0.1)',
              borderColor: 'rgba(255, 59, 48, 0.3)',
              color: '#ff3b30',
            }}
          >
            {error || 'Submission not found'}
          </div>
        </div>
      </div>
    )
  }

  const typeInfo = formTypeInfo[submission.formType]
  const createdDate = submission.createdAt?.toDate?.() || new Date(submission.createdAt)

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/admin/submissions')}
            className="inline-flex items-center gap-2 text-sm mb-4"
            style={{ color: '#7fff00' }}
          >
            <ArrowLeft size={16} />
            Back to Submissions
          </button>
          <h1 className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            Submission Details
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meta Info */}
        <div
          className="rounded-xl p-6 border mb-8"
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            borderColor: isDark ? '#1e1e1e' : '#e0e0e0',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                Type
              </p>
              <p
                className="text-sm font-semibold mt-1 px-2 py-1 rounded-full inline-block"
                style={{
                  background: `${typeInfo.color}22`,
                  color: typeInfo.color,
                }}
              >
                {typeInfo.label}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                Submitted
              </p>
              <p className="text-sm font-medium mt-1" style={{ color: isDark ? '#f0f0f0' : '#111' }}>
                {createdDate.toLocaleDateString()}
              </p>
              <p className="text-xs mt-0.5" style={{ color: isDark ? '#666' : '#aaa' }}>
                {createdDate.toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: isDark ? '#888' : '#666' }}>
                ID
              </p>
              <p className="text-sm font-mono mt-1" style={{ color: isDark ? '#f0f0f0' : '#111' }}>
                {submission.id.substring(0, 16)}...
              </p>
            </div>
          </div>
        </div>

        {/* Form Data */}
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
            <h2 className="font-semibold text-sm" style={{ color: isDark ? '#fff' : '#000' }}>
              Submission Data
            </h2>
          </div>

          <div
            className="divide-y"
            style={{ borderColor: isDark ? '#1e1e1e' : '#e0e0e0' }}
          >
            {Object.entries(submission.data)
              .filter(([key]) => key !== 'createdAt') // Skip createdAt as we showed it above
              .map(([key, value]) => (
                <div key={key} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-medium text-sm" style={{ color: isDark ? '#f0f0f0' : '#111' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <button
                      onClick={() => copyToClipboard(formatValue(value), key)}
                      className="p-1.5 rounded transition-all text-xs shrink-0"
                      style={{
                        background: isDark ? 'rgba(127, 255, 0, 0.1)' : 'rgba(127, 255, 0, 0.08)',
                        color: copiedField === key ? '#4ade80' : '#7fff00',
                      }}
                    >
                      {copiedField === key ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                  <pre
                    className="text-xs p-3 rounded-lg overflow-x-auto break-words whitespace-pre-wrap word-break"
                    style={{
                      background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                      color: isDark ? '#aaa' : '#666',
                    }}
                  >
                    {formatValue(value)}
                  </pre>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/admin/submissions')}
            className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: isDark ? 'rgba(127, 255, 0, 0.08)' : 'rgba(127, 255, 0, 0.05)',
              color: '#7fff00',
              border: '1px solid rgba(127, 255, 0, 0.2)',
            }}
          >
            Back to All Submissions
          </button>
        </div>
      </div>
    </div>
  )
}
