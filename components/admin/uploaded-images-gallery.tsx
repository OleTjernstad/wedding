"use client";

import { Button } from "../ui/button";
import Image from "next/image";

export function UploadedImagesGallery({
  batches,
}: {
  batches: Record<string, any[]>;
}) {
  function downloadImage(img: any) {
    const url = `/admin/uploaded-images/download?bucket=${encodeURIComponent(
      img.bucket
    )}&fileName=${encodeURIComponent(img.fileName)}&path=${encodeURIComponent(
      img.path
    )}&originalName=${encodeURIComponent(img.originalName)}`;
    window.open(url, "_blank");
  }

  function downloadBatch(batch: any[]) {
    const params = batch
      .map(
        (img) =>
          `bucket=${encodeURIComponent(img.bucket)}&fileName=${encodeURIComponent(
            img.fileName
          )}&path=${encodeURIComponent(img.path)}&originalName=${encodeURIComponent(
            img.originalName
          )}`
      )
      .join("&");
    const url = `/admin/uploaded-images/download-batch?${params}`;
    window.open(url, "_blank");
  }

  return (
    <div className="space-y-12">
      {Object.entries(batches).map(([batchId, images]) => (
        <div key={batchId}>
          <div className="mb-2 flex items-center gap-4">
            <span className="font-bold text-lg">Batch: {batchId}</span>
            <button
              type="button"
              className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 text-sm"
              onClick={() => downloadBatch(images)}
            >
              Last ned alle i batch
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded overflow-hidden border bg-gray-50 flex flex-col"
              >
                <Image
                  src={img.url}
                  alt={img.originalName}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <Button
                  type="button"
                  className="w-full mt-2"
                  onClick={() => downloadImage(img)}
                >
                  Last ned original
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
