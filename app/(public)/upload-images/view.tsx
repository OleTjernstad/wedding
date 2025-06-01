"use client";

import { Button } from "@/components/ui/button";
import { DropZone } from "@/components/admin/dropzone";
import { ImagePreview } from "./image-preview";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function UploadImagesView() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  function handleDrop(files: File[]) {
    setImages((prev) => {
      const all = [...prev, ...files];
      return all.slice(0, 20);
    });
  }

  const maxImages = 20;
  const isMax = images.length >= maxImages;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: implement upload logic
    alert("Bilder og melding sendt! (ikke implementert)");
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
            {images.map((file, idx) => (
              <ImagePreview key={idx} file={file} />
            ))}
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
