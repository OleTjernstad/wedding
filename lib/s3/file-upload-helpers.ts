import type { PresignedUrlProp, ShortFileProp } from "./types";

export const MAX_FILE_SIZE_NEXTJS_ROUTE = 4;
export const MAX_FILE_SIZE_S3_ENDPOINT = 100;
export const FILE_NUMBER_LIMIT = 10;

/**
 *
 * @param files array of files
 * @returns true if all files are valid
 */
export function validateFiles(files: ShortFileProp[], maxSizeMB: number) {
  // check if all files in total are less than 100 MB
  const totalFileSize = files.reduce((acc, file) => acc + file.fileSize, 0);
  const isFileSizeValid = totalFileSize < maxSizeMB * 1024 * 1024;
  if (!isFileSizeValid) {
    return { error: `Total file size should be less than ${maxSizeMB} MB` };
  }
  if (files.length > FILE_NUMBER_LIMIT) {
    return {
      error: `You can upload maximum ${FILE_NUMBER_LIMIT} files at a time`,
    };
  }
  return;
}

/**
 * Uploads file to S3 directly using presigned url
 * @param presignedUrl presigned url for uploading
 * @param file  file to upload
 * @returns  response from S3
 */
export const uploadToS3 = async (
  presignedUrl: PresignedUrlProp,
  file: File
) => {
  const response = await fetch(presignedUrl.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};

/**
 *
 * @param bytes size of file
 * @param decimals number of decimals to show
 * @returns formatted string
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB"];

  // get index of size to use from sizes array
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // return formatted string
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 *
 * @param files array of files
 * @returns FormData object
 */
export function createFormData(files: File[]): FormData {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });
  return formData;
}
