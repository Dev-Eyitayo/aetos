import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface UseFirebaseSubmitReturn {
  submit: (data: Record<string, unknown>) => Promise<void>
  loading: boolean
  error: string | null
  success: boolean
  reset: () => void
}

/**
 * Reusable hook for submitting form data to Firestore
 * @param collectionName - Name of the Firestore collection to submit to
 * @returns Object with submit function, loading, error, and success states
 */
export const useFirebaseSubmit = (collectionName: string): UseFirebaseSubmitReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const collectionRef = collection(db, collectionName)
      
      // Add document with automatic timestamp
      await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
      })

      setSuccess(true)
      setLoading(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form'
      setError(errorMessage)
      setLoading(false)
      throw err
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return { submit, loading, error, success, reset }
}
