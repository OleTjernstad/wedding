// API client functions for interacting with the backend

/**
 * Fetch all gifts with optional filtering
 */
export async function getGifts({
  category = "",
  search = "",
  page = 1,
  limit = 50,
  sort = "name",
  order = "asc",
}: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
} = {}) {
  // Build query parameters
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);

  // Make API request
  const response = await fetch(`/api/gifts?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch gifts");
  }

  return response.json();
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

/**
 * Fetch registry settings
 */
export async function getRegistrySettings() {
  const response = await fetch("/api/settings");

  if (!response.ok) {
    throw new Error("Failed to fetch registry settings");
  }

  return response.json();
}

/**
 * Reserve a gift
 */
export async function reserveGift({
  giftId,
  guestName,
  guestEmail,
  message,
  anonymous,
}: {
  giftId: string;
  guestName: string;
  guestEmail: string;
  message?: string;
  anonymous?: boolean;
}) {
  const response = await fetch("/api/registry/reserve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      giftId,
      guestName,
      guestEmail,
      message,
      anonymous,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to reserve gift");
  }

  return response.json();
}
