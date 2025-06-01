import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  setImages: (images: File[]) => void;
}
export function DropZone({ setImages }: DropZoneProps) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      maxFiles: 20,
      maxSize: 10485760, // 10 MB per file
      onDrop: (incomingFiles) => {
        setImages(incomingFiles);
      },
    });
  return (
    <div
      {...getRootProps({
        className: cn(
          "focus-visible:outline-none dropzone relative w-full aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors min-h-[180px]",
          {
            "border-blue-500": isFocused,
            "border-green-500": isDragAccept,
            "border-red-500": isDragReject,
          }
        ),
      })}
    >
      <Plus
        className={cn("h-8 w-8 text-gray-400", {
          "text-blue-500": isFocused,
          "text-green-500": isDragAccept,
          "text-red-500": isDragReject,
        })}
      />
      <span className="ml-4 text-gray-500 text-sm">
        Dra inn eller klikk for å velge bilder (maks 20)
      </span>
      <input {...getInputProps()} multiple />
    </div>
  );
}
