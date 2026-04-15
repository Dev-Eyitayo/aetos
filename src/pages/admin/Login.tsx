import { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Shield } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { createAdminUser, isUserAdmin } from '../../utils/seedAdmin'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [seedLoading, setSeedLoading] = useState(false)
  const [seedError, setSeedError] = useState<string | null>(null)
  const [seedSuccess, setSeedSuccess] = useState(false)
  const showSetup = false // For now, we can toggle this on to show the setup guide tab if needed
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in'
      // Map Firebase error codes to user-friendly messages
      if (errorMessage.includes('user-not-found')) {
        setError('Email not found. Create an account in Firebase Console first.')
      } else if (errorMessage.includes('wrong-password')) {
        setError('Incorrect password')
      } else if (errorMessage.includes('too-many-requests')) {
        setError('Too many login attempts. Please try again later.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSeedAdmin = async () => {
    setSeedError(null)
    setSeedSuccess(false)
    setSeedLoading(true)

    try {
      if (!email.trim()) {
        throw new Error('Please enter your admin email first')
      }

      // First, ensure user is authenticated
      if (!user) {
        // Try to sign in first
        await signIn(email, password)
      }

      // Check if already admin
      const alreadyAdmin = await isUserAdmin(user?.uid || '')
      if (alreadyAdmin) {
        setSeedSuccess(true)
        setSeedError(null)
        setAdmin(true)
        return
      }

      // Create admin user in Firestore
      await createAdminUser(user!)
      setSeedSuccess(true)
      setSeedError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to seed admin user'
      setSeedError(errorMessage)
      setSeedSuccess(false)
    } finally {
      setSeedLoading(false)
    }
  }

  const [ isAdmin, setAdmin] = useState(false)

  console.log(isAdmin)

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#7fff00] flex items-center justify-center">
              <LogIn size={20} className="text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white">Aetos Admin</h1>
          </div>
          <p className="text-white/50 text-sm">Sign in to manage submissions</p>
        </div>

        {/* Setup Guide Tab */}
        {/* <div className="mb-6 flex gap-2">
          <button
            onClick={() => setShowSetup(false)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: !showSetup ? '#7fff00' : 'rgba(255, 255, 255, 0.05)',
              color: !showSetup ? '#000' : '#888',
              border: `1px solid ${!showSetup ? '#7fff00' : '#2a2a2a'}`,
            }}
          >
            Login
          </button>
          <button
            onClick={() => setShowSetup(true)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: showSetup ? 'rgba(17, 129, 234, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              color: showSetup ? '#1181EA' : '#888',
              border: `1px solid ${showSetup ? 'rgba(17, 129, 234, 0.3)' : '#2a2a2a'}`,
            }}
          >
            Setup
          </button>
        </div> */}

        {/* Login Form */}
        {!showSetup && (
          <div
            className="rounded-xl p-8 border"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderColor: '#2a2a2a',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/70">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-lg px-4 py-3 text-sm font-body outline-none transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid #2a2a2a',
                    color: '#f0f0f0',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#7fff00'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(127, 255, 0, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/70">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg px-4 py-3 text-sm font-body outline-none transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid #2a2a2a',
                    color: '#f0f0f0',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#7fff00'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(127, 255, 0, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="text-xs rounded-lg p-3 border"
                  style={{
                    background: 'rgba(255, 59, 48, 0.1)',
                    borderColor: 'rgba(255, 59, 48, 0.3)',
                    color: '#ff3b30',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: loading ? '#7fff00/60' : '#7fff00',
                  color: '#000',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#6ee600'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#7fff00'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Setup Guide */}
        {showSetup && (
          <div
            className="rounded-xl p-8 border"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderColor: '#2a2a2a',
            }}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Shield size={16} style={{ color: '#1181EA' }} />
                  Admin Setup
                </h3>
                <p className="text-xs text-white/60 mb-4">
                  Follow these steps to set up your admin account:
                </p>
              </div>

              <ol className="space-y-3 text-xs text-white/70">
                <li className="flex gap-2">
                  <span className="text-brand font-bold">1</span>
                  <span>Create a user in Firebase Console → Authentication</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">2</span>
                  <span>Enter your credentials in the Login tab</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">3</span>
                  <span>Click "Seed Admin" below to create your admin role</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">4</span>
                  <span>Go back to Login and sign in with your credentials</span>
                </li>
              </ol>

              {/* Seed Admin Section */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-medium text-white mb-3">Email to make admin:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full rounded-lg px-3 py-2 text-xs mb-3 outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid #2a2a2a',
                    color: '#f0f0f0',
                  }}
                />

                {seedError && (
                  <div
                    className="text-xs rounded-lg p-2 mb-3 border"
                    style={{
                      background: 'rgba(255, 59, 48, 0.1)',
                      borderColor: 'rgba(255, 59, 48, 0.3)',
                      color: '#ff3b30',
                    }}
                  >
                    {seedError}
                  </div>
                )}

                {seedSuccess && (
                  <div
                    className="text-xs rounded-lg p-2 mb-3 border"
                    style={{
                      background: 'rgba(127, 255, 0, 0.1)',
                      borderColor: 'rgba(127, 255, 0, 0.3)',
                      color: '#7fff00',
                    }}
                  >
                    ✓ Admin role created successfully! Go to Login to sign in.
                  </div>
                )}

                <button
                  onClick={handleSeedAdmin}
                  disabled={seedLoading || !email.trim()}
                  className="w-full py-2 rounded-lg font-semibold text-xs transition-all"
                  style={{
                    background: seedLoading || !email.trim() ? 'rgba(17, 129, 234, 0.3)' : 'rgba(17, 129, 234, 0.15)',
                    color: '#1181EA',
                    border: '1px solid rgba(17, 129, 234, 0.3)',
                    cursor: seedLoading || !email.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {seedLoading ? 'Creating admin role...' : 'Seed Admin Role'}
                </button>
              </div>

              <p className="text-xs text-white/40 text-center pt-4">
                Note: You must have logged in at least once before seeding admin role.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
