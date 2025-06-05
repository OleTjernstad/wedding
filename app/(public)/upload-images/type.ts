export type FileWithPreview = File & {
  preview: string;
};

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export type FileWithStatus = {
  file: FileWithPreview;
  status: UploadStatus;
  progress: number;
  error?: string;
  uploadedUrl?: string;
};
