import { useEffect, useState } from "react";

import Image from "next/image";

interface ImagePreviewProps {
  file: File;
}

export function ImagePreview({ file }: ImagePreviewProps) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="w-20 h-20 rounded overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
      {url && (
        <Image
          src={url}
          alt={file.name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
}
