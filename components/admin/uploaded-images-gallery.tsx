"use client";

import Image from "next/image";
import { useState } from "react";

export function UploadedImagesGallery({
  batches,
}: {
  batches: Record<string, any[]>;
}) {
  console.log({ batches });
  // State for selected batch and pagination
  const batchIds = Object.keys(batches);
  const [selectedBatchId, setSelectedBatchId] = useState(batchIds[0] || "");
  const [page, setPage] = useState(1);
  const IMAGES_PER_PAGE = 20;

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

  // Get images for selected batch
  const images = batches[selectedBatchId] || [];
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const paginatedImages = images.slice(
    (page - 1) * IMAGES_PER_PAGE,
    page * IMAGES_PER_PAGE
  );

  // Reset page when batch changes
  function handleBatchChange(batchId: string) {
    setSelectedBatchId(batchId);
    setPage(1);
  }

  return (
    <div className="space-y-8">
      {/* Batch selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {batchIds.map((batchId) => (
          <button
            key={batchId}
            type="button"
            className={`px-3 py-1 rounded text-sm border transition-colors ${
              batchId === selectedBatchId
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => handleBatchChange(batchId)}
          >
            Gruppe: {batchId}
          </button>
        ))}
      </div>

      {/* Only show one batch at a time */}
      <div>
        <div className="mb-2 flex items-center gap-4">
          <span className="font-bold text-lg">Gruppe: {selectedBatchId}</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {paginatedImages.map((img) => (
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
                blurDataURL="data:image/png;base64,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"
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
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              type="button"
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Forrige
            </button>
            <span className="text-sm">
              Side {page} av {totalPages}
            </span>
            <button
              type="button"
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Neste
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
