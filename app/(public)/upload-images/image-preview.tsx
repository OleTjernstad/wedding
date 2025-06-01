import { useEffect, useState } from "react";

import Image from "next/image";

interface ImagePreviewProps {
  file: File;
  uploading?: boolean;
  uploaded?: boolean;
}

export function ImagePreview({ file, uploading, uploaded }: ImagePreviewProps) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="w-20 h-20 rounded overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center relative">
      {url && (
        <Image
          src={url}
          alt={file.name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      )}
      {uploading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <svg
            className="animate-spin h-6 w-6 text-purple-700"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        </div>
      )}
      {uploaded && !uploading && (
        <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
