"use server";

import { PresignedUrlProp, ShortFileProp } from "@/lib/s3/types";

import { createPresignedUrlToUpload } from "@/lib/s3/manage";
import { env } from "@/utils/env";
import { nanoid } from "nanoid";

const bucketName = env.S3_BUCKET_NAME;
const expiry = 60 * 60; // 24 hours

export async function preSignedUrlAction({
  fileSize,
  originalFileName,
  path,
}: ShortFileProp) {
  const fileName = `${nanoid(8)}-${originalFileName}`;

  const url = await createPresignedUrlToUpload({
    bucketName,
    path,
    fileName,
    expiry,
  });

  const presignedUrl: PresignedUrlProp = {
    fileNameInBucket: fileName,
    originalFileName: originalFileName,
    fileSize: fileSize,
    path,
    url,
  };

  return { presignedUrl };
}
