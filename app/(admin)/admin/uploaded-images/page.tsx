import { UploadedImagesGallery } from "@/components/admin/uploaded-images-gallery";
import { getUploadedImagesGroupedByBatch } from "./uploaded-images.actions";

export const revalidate = 1800; // revalidate at most every 30 minutes

export default async function AdminUploadedImagesPage() {
  const batches = await getUploadedImagesGroupedByBatch();
  return <UploadedImagesGallery batches={batches} />;
}
