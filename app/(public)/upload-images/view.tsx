"use client";

import { FileWithStatus, UploadStatus } from "./type";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { DropZone } from "@/components/admin/dropzone";
import { ImagePreview } from "./image-preview";
import { Textarea } from "@/components/ui/textarea";
import { getImageDimensions } from "@/utils/image-size";
import { nanoid } from "nanoid";
import { paths } from "@/lib/s3/paths";
import { preSignedUrlAction } from "./pre-sign-url";
import { saveToDBAction } from "./save-to-db.action";
import { uploadToS3 } from "@/lib/s3/file-upload-helpers";

const path = paths.uploads;

export default function UploadImagesView() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [allUploaded, setAllUploaded] = useState<string[]>([]); // store all uploaded image URLs

  const maxFiles = 20;
  const isMax = files.length >= maxFiles;
  const formRef = useRef<HTMLFormElement>(null);

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

    // Generate a batchId for this upload session
    const newBatchId = nanoid();

    // Update all files to uploading status
    setFiles((prev) =>
      prev.map((fileData) => {
        if (fileData.status === "success") {
          return fileData;
        }
        return {
          ...fileData,
          status: "uploading",
          progress: 0,
        };
      })
    );

    // Upload each file individually
    const uploadPromises = files.map(async (fileData, index) => {
      if (fileData.status === "success") return;
      try {
        const filesInfo = {
          path,
          originalFileName: fileData.file.name,
          fileSize: fileData.file.size,
        };
        const { presignedUrl } = await preSignedUrlAction(filesInfo);
        const res = await uploadToS3(presignedUrl, fileData.file);

        if (res.status !== 200) throw new Error("Failed to upload image");

        const dim = await getImageDimensions(fileData.file);

        await saveToDBAction({
          fileNameInBucket: presignedUrl.fileNameInBucket,
          fileSize: presignedUrl.fileSize,
          mimeType: fileData.file.type,
          originalFileName: presignedUrl.originalFileName,
          width: dim.width,
          height: dim.height,
          path,
          message: message || undefined,
          batchId: newBatchId,
        });

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
      // Add all uploaded image URLs to allUploaded
      setAllUploaded((prev) => [
        ...prev,
        ...files
          .filter((f) => f.status === "success" && f.uploadedUrl)
          .map((f) => f.uploadedUrl!),
      ]);
      setShowThankYou(true);
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
  function handleReset() {
    setFiles([]);
    setMessage("");
    setShowThankYou(false);
    if (formRef.current) formRef.current.reset();
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4 ">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">
        Del dine bilder med oss!
      </h1>
      <p className="mb-6 text-gray-700">
        Vi blir veldig glade hvis du vil dele favorittbildene dine fra bryllupet
        med oss.
        <br /> <br /> Del gjerne bildene dine her, eller send dem til{" "}
        <a
          href="mailto:bryllup@fresvoll.no"
          className="underline text-purple-800"
        >
          bryllup@fresvoll.no
        </a>{" "}
        om du foretrekker det. - Tusen takk!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
        <DropZone setImages={handleDrop} disabled={isMax || isUploading}>
          {isMax && (
            <div className="mb-2 p-2 rounded bg-red-100 border border-red-300 text-red-700 text-center font-semibold text-sm">
              Maksimalt antall bilder er nådd ({maxFiles}). Vennligst last opp
              eller fjern noen før du legger til flere.
            </div>
          )}
          <div className="mt-4 grid grid-cols-4 gap-4 min-h-[6rem]">
            {files.map((fileData, index) => (
              <ImagePreview
                fileData={fileData}
                key={index}
                removeFile={() => removeFile(index)}
                isUploading={isUploading}
              />
            ))}
          </div>
        </DropZone>
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
          disabled={isUploading || files.length === 0}
        >
          Last opp bilder
        </Button>
      </form>
      {/* Thank you overlay */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center max-w-xs w-full">
            <span className="text-3xl mb-4">🎉</span>
            <h2 className="text-xl font-bold mb-2 text-purple-800 text-center">
              Tusen takk for bildene!
            </h2>
            <p className="mb-6 text-gray-700 text-center">
              Vi setter stor pris på at du deler dine minner med oss.
            </p>
            <Button
              onClick={handleReset}
              className="w-full bg-purple-700 hover:bg-purple-800"
            >
              Legg til flere bilder
            </Button>
          </div>
        </div>
      )}
      {/* All uploaded images section */}
      {allUploaded.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4 text-purple-800">
            Alle opplastede bilder
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allUploaded.map((url, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded overflow-hidden border bg-gray-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="Uploaded"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
