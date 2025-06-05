"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

export function UploadedImagesGallery({
  batches,
}: {
  batches: Record<string, any[]>;
}) {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
