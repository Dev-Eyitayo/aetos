import { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from './useAuth'

interface AdminData {
  email: string
  role: 'admin'
  createdAt: string
  permissions?: string[]
}

interface UseAdminReturn {
  isAdmin: boolean
  adminData: AdminData | null
  loading: boolean
  error: string | null
}

/**
 * Hook to check if user has admin role in Firestore
 * Replaces hardcoded admin checks with database-driven access control
 */
export const useAdmin = (): UseAdminReturn => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setIsAdmin(false)
      setAdminData(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    // Real-time listener for admin document
    // This ensures if admin role is revoked, user immediately loses access
    const unsubscribe = onSnapshot(
      doc(db, 'admins', user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as AdminData
          setAdminData(data)
          setIsAdmin(true)
        } else {
          setAdminData(null)
          setIsAdmin(false)
        }
        setLoading(false)
      },
      (err) => {
        const errorMessage = err instanceof Error ? err.message : 'Failed to check admin status'
        console.error('Admin check error:', err)
        setError(errorMessage)
        setIsAdmin(false)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  return {
    isAdmin,
    adminData,
    loading,
    error,
  }
}

/**
 * Simple version of useAdmin that just checks if user is admin
 * Use this when you only need a boolean check
 */
export const useIsAdmin = (): boolean => {
  const { isAdmin } = useAdmin()
  return isAdmin
}
