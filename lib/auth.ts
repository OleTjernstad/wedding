import { cookies } from "next/headers";
import { getPayloadClient } from "./payload";

export async function getCurrentUser() {
  try {
    // Get the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;

    if (!token) {
      return null;
    }

    // Get Payload instance
    const payload = await getPayloadClient();

    // Verify and get the user
    const { user } = await payload.verifyToken({
      token,
      collection: "users",
    });

    if (!user) {
      return null;
    }

    // Return user data (excluding sensitive information)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function hasRole(roles: string[]) {
  const user = await getCurrentUser();
  return user && roles.includes(user.role);
}

export async function isAdminOrCouple() {
  return hasRole(["admin", "couple"]);
}
