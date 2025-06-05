"use server";

import { PresignedUrlProp } from "@/lib/s3/types";
import { db } from "@/lib/db";
import { env } from "@/utils/env";

const bucketName = env.S3_BUCKET_NAME;
const expiry = 60 * 60; // 24 hours

export async function saveToDBAction({
  fileSize,
  originalFileName,
  fileNameInBucket,
  mimeType,

  height,
  width,
  path,
  message,
  batchId,
}: Omit<PresignedUrlProp, "url"> & {
  mimeType: string;
  height: number;
  width: number;
  message?: string;
  batchId?: string;
}) {
  const media = await db.uploadedImage.create({
    data: {
      fileName: fileNameInBucket,
      originalName: originalFileName,
      bucket: bucketName,
      fileSize,
      height,
      mimeType,
      width,
      path,
      url: `https://${env.S3_ENDPOINT}/${bucketName}${path}${fileNameInBucket}`,
      message,
      batchId,
    },
  });

  return media;
}
