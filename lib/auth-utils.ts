import { auth } from "@clerk/nextjs"

// Check if the current user is an admin
export async function isAdmin() {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  // In a real application, you would check if the user has admin privileges
  // This could be done by checking a role in your database
  // For simplicity, we're just checking if the user is authenticated

  return true
}

// Get the current user's ID
export function getCurrentUserId() {
  const { userId } = auth()
  return userId
}

