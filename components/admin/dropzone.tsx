import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";

interface DropZoneProps {
  setImages: (images: File[]) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
export function DropZone({ setImages, disabled, children }: DropZoneProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 20,
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

  // Small dropzone height (image aspect ratio, e.g. 4:3, for 4 images wide)
  const smallZone = cn(
    "h-28 w-full max-w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors"
  );

  // Default: small clickable dropzone with previews below, all inside card border
  return (
    <div className={cn("w-full p-4", cardBorder)}>
      <div
        {...getRootProps({
          className: smallZone,
        })}
        aria-disabled={disabled}
      >
        <input {...getInputProps()} multiple disabled={disabled} />
        <Plus className="h-8 w-8 text-gray-400 mr-2" />
        <span className="text-gray-500 text-sm">
          {disabled
            ? "Maks antall bilder nådd. Last opp før du legger til flere."
            : "Dra inn eller klikk for å velge bilder (maks 20)"}
        </span>
      </div>
      {/* Previews below dropzone, inside card border */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
