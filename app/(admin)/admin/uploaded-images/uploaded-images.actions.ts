import { db } from "@/lib/db";

export async function getUploadedImagesGroupedByBatch() {
  // Fetch all images, group by batchId, order by createdAt desc
  const images = await db.uploadedImage.findMany({
    orderBy: { createdAt: "desc" },
  });
  // Group by batchId
  const batches: Record<string, typeof images> = {};
  for (const img of images) {
    const key = img.batchId || "ingen gruppe";
    if (!batches[key]) batches[key] = [];
    batches[key].push(img);
  }
  return batches;
}
