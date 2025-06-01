import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  setImage: (image: File) => void;
}
export function DropZone({ setImage }: DropZoneProps) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      maxFiles: 1,
      maxSize: 10485760, // 10 MB
      onDragEnter: () => console.log("onDragEnter"),
      onDrop: (incomingFiles) => {
        console.log("onDrop");

        setImage(incomingFiles[0]);
      },
    });
  return (
    <form>
      <div
        {...getRootProps({
          className: cn(
            "focus-visible:outline-none dropzone relative w-full aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors",
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

        <input {...getInputProps()} />
      </div>
    </form>
  );
}
