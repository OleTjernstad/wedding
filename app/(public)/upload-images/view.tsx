"use client";

import { Button } from "@/components/ui/button";
import { DropZone } from "@/components/admin/dropzone";
import { ImagePreview } from "./image-preview";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/lib/s3/paths";
import { preSignedUrlAction } from "./pre-sign-url";
import { uploadToS3 } from "@/lib/s3/file-upload-helpers";
import { useState } from "react";

interface UploadStatus {
  uploading: boolean;
  uploaded: boolean;
  error?: string;
}

const path = paths.uploads;

export default function UploadImagesView() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Map<File, UploadStatus>>(new Map());

  function handleDrop(files: File[]) {
    setImages((prev) => {
      const all = [...prev, ...files].slice(0, 20);
      // Set status for new images as 'not uploaded'
      setStatus((prevStatus) => {
        const newStatus = new Map(prevStatus);
        for (const file of files) {
          if (!newStatus.has(file) && all.includes(file)) {
            newStatus.set(file, { uploading: false, uploaded: false });
          }
        }
        return newStatus;
      });
      return all;
    });
  }

  const maxImages = 20;
  const isMax = images.length >= maxImages;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus((prevStatus) => {
      const newStatus = new Map(prevStatus);
      images.forEach((file) => {
        newStatus.set(file, { uploading: true, uploaded: false });
      });
      return newStatus;
    });
    let idx = 0;
    for (const imageFile of images) {
      try {
        const filesInfo = {
          path,
          originalFileName: imageFile.name,
          fileSize: imageFile.size,
        };
        const { presignedUrl } = await preSignedUrlAction(filesInfo);
        const res = await uploadToS3(presignedUrl, imageFile);
        if (res.status !== 200) throw new Error("Failed to upload image");
        setStatus((prevStatus) => {
          const newStatus = new Map(prevStatus);
          newStatus.set(imageFile, { uploading: false, uploaded: true });
          return newStatus;
        });
      } catch (err) {
        setStatus((prevStatus) => {
          const newStatus = new Map(prevStatus);
          newStatus.set(imageFile, {
            uploading: false,
            uploaded: false,
            error:
              err instanceof Error
                ? `Feil ved opplasting: ${err.message}`
                : "Feil ved opplasting",
          });
          return newStatus;
        });
      }
      idx++;
    }
    // TODO: handle message upload
    // alert("Bilder og melding sendt! (ikke implementert)");
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">
        Del dine bilder med oss!
      </h1>
      <p className="mb-6 text-gray-700">
        Vi blir veldig glade hvis du vil dele bilder fra bryllupet med oss. Last
        opp dine favorittbilder her – tusen takk!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <DropZone setImages={handleDrop} disabled={isMax} />
        {isMax && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Maksimalt antall bilder er nådd ({maxImages}). Vennligst last opp
            disse før du legger til flere.
          </div>
        )}
        {/* Preview thumbnails */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {images.map((file, idx) => {
              const fileStatus = status.get(file) || {
                uploading: false,
                uploaded: false,
              };
              return (
                <ImagePreview
                  key={idx}
                  file={file}
                  uploading={fileStatus.uploading}
                  uploaded={fileStatus.uploaded}
                  notUploaded={!fileStatus.uploading && !fileStatus.uploaded}
                />
              );
            })}
          </div>
        )}
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
