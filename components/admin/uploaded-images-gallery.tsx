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
          `bucket=${encodeURIComponent(
            img.bucket
          )}&fileName=${encodeURIComponent(
            img.fileName
          )}&path=${encodeURIComponent(
            img.path
          )}&originalName=${encodeURIComponent(img.originalName)}`
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
            <span className="font-bold text-lg">Gruppe: {batchId}</span>
            <button
              type="button"
              className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 text-sm"
              onClick={() => downloadBatch(images)}
            >
              Last ned alle i gruppe
            </button>
          </div>
          {/* Display message from the first image in the group, if present */}
          {images[0]?.message && (
            <div className="mb-2 text-gray-700 italic text-sm">
              {images[0].message}
            </div>
          )}
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
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNs0d68CgAEqwIOzwJ17AAAAABJRU5ErkJggg=="
                />

                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                  onClick={() => downloadImage(img)}
                  title="Last ned bilde"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-purple-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v12m0 0l-4-4m4 4l4-4m-9 7h10"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
