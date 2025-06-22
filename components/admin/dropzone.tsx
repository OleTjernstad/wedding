import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  setImages: (images: File[]) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
export function DropZone({ setImages, disabled, children }: DropZoneProps) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    isFileDialogActive,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10485760, // 10 MB per file
    onDrop: (incomingFiles) => {
      if (!disabled) setImages(incomingFiles);
    },
    disabled,
    noClick: false, // allow click on small zone
    noDrag: false, // allow drag
  });

  // Card border styling
  const cardBorder = cn("border border-gray-300 rounded-xl shadow-sm bg-white");

  // Default: small clickable dropzone with previews below, all inside card border
  return (
    <div className={cn("w-full p-4", cardBorder)}>
      <div
        {...getRootProps({
          className: cn(
            "focus-visible:outline-none relative h-[96px] rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors",
            {
              "border-blue-500 ring-2 ring-blue-200": isFocused,
              "border-green-500 bg-green-50": isDragAccept,
              "border-red-500 bg-red-50": isDragReject,
              "border-purple-600 bg-purple-50": isDragActive,
              "border-yellow-500 bg-yellow-50 animate-pulse":
                isFileDialogActive,
              "opacity-50 pointer-events-none": disabled,
            }
          ),
        })}
        aria-disabled={disabled}
      >
        <Plus
          className={cn("h-8 w-8 text-gray-400", {
            "text-blue-500": isFocused,
            "text-green-500": isDragAccept,
            "text-red-500": isDragReject,
            "text-purple-600": isDragActive,
            "text-yellow-500 animate-pulse": isFileDialogActive,
          })}
        />
        <span className="ml-4 text-gray-500 text-sm">
          {disabled
            ? "Maks antall bilder nådd. Last opp før du legger til flere."
            : "Dra inn eller klikk for å velge bilder (jpg, png, webp). Maks 10 MB per bilde."}
        </span>
        <input {...getInputProps()} multiple disabled={disabled} />
      </div>
      {/* Previews below dropzone, inside card border */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
