import { AlertCircle, CheckCircle, ImageIcon, Loader2, X } from "lucide-react";
import { FileWithStatus, UploadStatus } from "./type";

import Image from "next/image";

interface ImagePreviewProps {
  fileData: FileWithStatus;
  removeFile: () => void;
  isUploading: boolean;
}

export function ImagePreview({
  fileData,
  removeFile,
  isUploading,
}: ImagePreviewProps) {
  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case "idle":
        return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
      case "uploading":
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="relative border rounded-md overflow-hidden group">
      <div className="aspect-square relative">
        <Image
          src={fileData.file.preview || "/placeholder.svg"}
          alt={fileData.file.name}
          fill
          className="object-cover"
        />
        {fileData.status === "uploading" ? (
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
        ) : null}

        <button
          type="button"
          onClick={() => removeFile()}
          className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          disabled={isUploading}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-2 bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            {getStatusIcon(fileData.status)}
            <span className="text-xs truncate" title={fileData.file.name}>
              {fileData.file.name.length > 20
                ? `${fileData.file.name.substring(0, 20)}...`
                : fileData.file.name}
            </span>
          </div>
        </div>
        {fileData.status === "uploading" && (
          <div className="w-full bg-muted rounded-full h-1 mt-1">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${fileData.progress}%` }}
            />
          </div>
        )}
        {fileData.status === "error" && (
          <p
            className="text-xs text-red-500 mt-1 truncate"
            title={fileData.error}
          >
            {fileData.error}
          </p>
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="w-20 h-20 rounded overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center relative">
  //     {/* {url && (
  //       <Image
  //         src={url}
  //         alt={file.name}
  //         width={80}
  //         height={80}
  //         className="object-cover w-full h-full"
  //       />
  //     )} */}
  //     {uploading && (
  //       <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
  //         <svg
  //           className="animate-spin h-6 w-6 text-purple-700"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //         >
  //           <circle
  //             className="opacity-25"
  //             cx="12"
  //             cy="12"
  //             r="10"
  //             stroke="currentColor"
  //             strokeWidth="4"
  //           />
  //           <path
  //             className="opacity-75"
  //             fill="currentColor"
  //             d="M4 12a8 8 0 018-8v8z"
  //           />
  //         </svg>
  //       </div>
  //     )}
  //     {uploaded && !uploading && (
  //       <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
  //         <svg
  //           className="h-4 w-4 text-white"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={3}
  //             d="M5 13l4 4L19 7"
  //           />
  //         </svg>
  //       </div>
  //     )}
  //     {notUploaded && !uploading && !uploaded && (
  //       <div className="absolute top-1 right-1 bg-gray-400 rounded-full p-1">
  //         <svg
  //           className="h-4 w-4 text-white"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <circle
  //             cx="12"
  //             cy="12"
  //             r="6"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             fill="none"
  //           />
  //           <line
  //             x1="8"
  //             y1="12"
  //             x2="16"
  //             y2="12"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       </div>
  //     )}
  //   </div>
  // );
}
