/**
 * Fetch all gifts with optional filtering
 */
export async function getGifts({
  categoryId,
  search = "",
}: {
  categoryId?: string;
  search?: string;
} = {}) {
  // Build query parameters
  const params = new URLSearchParams();

  if (categoryId) params.append("categoryId", categoryId);
  if (search) params.append("search", search);

  // Make API request
  const response = await fetch(`/api/public-gifts?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch gifts");
  }

  return response.json();
}
