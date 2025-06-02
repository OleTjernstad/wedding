"use client";

import { FileWithStatus, UploadStatus } from "./type";

import { Button } from "@/components/ui/button";
import { DropZone } from "@/components/admin/dropzone";
import Image from "next/image";
import { ImagePreview } from "./image-preview";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/lib/s3/paths";
import { preSignedUrlAction } from "./pre-sign-url";
import { uploadToS3 } from "@/lib/s3/file-upload-helpers";
import { useState } from "react";

const path = paths.uploads;

export default function UploadImagesView() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function handleDrop(files: File[]) {
    const newFiles = files.map((file) => ({
      file: Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
      status: "idle" as UploadStatus,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0) return;

    setIsUploading(true);

    // Update all files to uploading status
    setFiles((prev) =>
      prev.map((fileData) => ({
        ...fileData,
        status: "uploading",
        progress: 0,
      }))
    );

    // Upload each file individually
    const uploadPromises = files.map(async (fileData, index) => {
      try {
        const filesInfo = {
          path,
          originalFileName: fileData.file.name,
          fileSize: fileData.file.size,
        };
        const { presignedUrl } = await preSignedUrlAction(filesInfo);
        const res = await uploadToS3(presignedUrl, fileData.file);

        // Update status to success
        setFiles((prev) => {
          const newFiles = [...prev];
          newFiles[index] = {
            ...newFiles[index],
            status: "success",
            progress: 100,
            uploadedUrl: presignedUrl.url,
          };
          return newFiles;
        });

        console.log(
          `Successfully uploaded: ${fileData.file.name} to ${presignedUrl.url}`
        );
      } catch (error) {
        console.error(`Failed to upload ${fileData.file.name}:`, error);

        // Update status to error
        setFiles((prev) => {
          const newFiles = [...prev];
          newFiles[index] = {
            ...newFiles[index],
            status: "error",
            error: error instanceof Error ? error.message : "Upload failed",
          };
          return newFiles;
        });
      }
    });

    await Promise.all(uploadPromises);
    setIsUploading(false);

    // Show success message if all uploads succeeded
    const successCount = files.filter((f) => f.status === "success").length;
    if (successCount === files.length) {
      console.log(`All ${successCount} images uploaded successfully!`);
    }
  }
  function removeFile(index: number) {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].file.preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4 ">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">
        Del dine bilder med oss!
      </h1>
      <p className="mb-6 text-gray-700">
        Vi blir veldig glade hvis du vil dele bilder fra bryllupet med oss. Last
        opp dine favorittbilder her – tusen takk!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <DropZone
          setImages={handleDrop}
          // disabled={isMax}
        />
        {/* {isMax && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Maksimalt antall bilder er nådd ({maxImages}). Vennligst last opp
            disse før du legger til flere.
          </div>
        )} */}
        {/* Preview thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((fileData, index) => (
            <ImagePreview
              fileData={fileData}
              key={index}
              removeFile={() => removeFile(index)}
              isUploading={isUploading}
            />
          ))}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-1 font-medium text-gray-700"
          >
            Skriv gjerne en melding til oss (valgfritt)
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Din melding..."
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800"
        >
          Last opp bilder
        </Button>
      </form>
    </div>
  );
}
