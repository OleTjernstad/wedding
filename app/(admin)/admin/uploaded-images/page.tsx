import { UploadedImagesGallery } from "@/components/admin/uploaded-images-gallery";
import { getUploadedImagesGroupedByBatch } from "./uploaded-images.actions";

export default async function AdminUploadedImagesPage() {
  const batches = await getUploadedImagesGroupedByBatch();
  return <UploadedImagesGallery batches={batches} />;
}
