import { User } from 'firebase/auth'
import { setDoc, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface AdminDocument {
  email: string
  role: 'admin'
  createdAt: string
  permissions?: string[]
}

/**
 * Create an admin user in Firestore
 * @param user - The Firebase Auth user object
 * @param permissions - Optional array of additional permissions
 * @returns Promise with the admin document creation result
 */
export const createAdminUser = async (
  user: User,
  permissions?: string[]
): Promise<void> => {
  if (!user.email) {
    throw new Error('User must have an email address')
  }

  const adminData: AdminDocument = {
    email: user.email,
    role: 'admin',
    createdAt: new Date().toISOString(),
  }

  if (permissions && permissions.length > 0) {
    adminData.permissions = permissions
  }

  try {
    await setDoc(doc(db, 'admins', user.uid), adminData)
    console.log(`Admin user created successfully: ${user.email} (${user.uid})`)
    return
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create admin user'
    throw new Error(`Failed to seed admin user: ${errorMessage}`)
  }
}

/**
 * Check if a user is already an admin
 * @param userId - The Firebase Auth UID
 * @returns Promise<boolean> - True if user is admin, False otherwise
 */
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const adminDoc = await getDoc(doc(db, 'admins', userId))
    return adminDoc.exists()
  } catch (err) {
    console.error('Error checking admin status:', err)
    return false
  }
}

/**
 * Get all admin users in the system
 * @returns Promise<Array> - Array of admin documents
 */
export const getAllAdmins = async (): Promise<AdminDocument[]> => {
  try {
    const adminsCollection = collection(db, 'admins')
    const snapshot = await getDocs(adminsCollection)
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as (AdminDocument & { uid: string })[]
  } catch (err) {
    console.error('Error fetching admins:', err)
    throw new Error('Failed to fetch admin list')
  }
}

/**
 * Remove admin access from a user
 * DANGER: Only call this if you know what you're doing
 * @param userId - The Firebase Auth UID
 */
export const removeAdminAccess = async (userId: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'admins', userId), {}, { merge: false })
    console.log(`Admin access removed for user: ${userId}`)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to remove admin access'
    throw new Error(`Failed to remove admin access: ${errorMessage}`)
  }
}

/**
 * Add permissions to an admin user
 * @param userId - The Firebase Auth UID
 * @param permission - The permission to add
 */
export const addAdminPermission = async (userId: string, permission: string): Promise<void> => {
  try {
    const adminDoc = await getDoc(doc(db, 'admins', userId))
    if (!adminDoc.exists()) {
      throw new Error('User is not an admin')
    }

    const currentPermissions = adminDoc.data().permissions || []
    if (!currentPermissions.includes(permission)) {
      await setDoc(doc(db, 'admins', userId), {
        permissions: [...currentPermissions, permission],
      }, { merge: true })
      console.log(`Permission '${permission}' added to user: ${userId}`)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to add permission'
    throw new Error(`Failed to add admin permission: ${errorMessage}`)
  }
}

/**
 * Remove a specific permission from an admin user
 * @param userId - The Firebase Auth UID
 * @param permission - The permission to remove
 */
export const removeAdminPermission = async (userId: string, permission: string): Promise<void> => {
  try {
    const adminDoc = await getDoc(doc(db, 'admins', userId))
    if (!adminDoc.exists()) {
      throw new Error('User is not an admin')
    }

    const currentPermissions = adminDoc.data().permissions || []
    const updatedPermissions = currentPermissions.filter((p: string) => p !== permission)
    
    await setDoc(doc(db, 'admins', userId), {
      permissions: updatedPermissions,
    }, { merge: true })
    console.log(`Permission '${permission}' removed from user: ${userId}`)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to remove permission'
    throw new Error(`Failed to remove admin permission: ${errorMessage}`)
  }
}
