import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAdmin } from '../hooks/useAdmin'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth()
  const { isAdmin, loading: adminLoading } = useAdmin()

  // Show loading while checking both auth and admin status
  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#7fff00]/30 border-t-[#7fff00] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  // Redirect to unauthorized if user is not admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="mb-6 text-5xl">🔐</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-white/60 mb-6">You do not have admin access to this resource.</p>
          <p className="text-white/40 text-sm">Email: {user.email}</p>
        </div>
      </div>
    )
  }

  // User is authenticated and is an admin
  return <>{children}</>
}
