import * as Minio from "minio";

import { env } from "@/utils/env";
import type internal from "stream";

export const s3Client = new Minio.Client({
  endPoint: env.S3_ENDPOINT,
  region: env.S3_REGION,
  port: env.S3_PORT ? Number(env.S3_PORT) : undefined,
  accessKey: env.S3_ACCESS_KEY,
  secretKey: env.S3_SECRET_KEY,
  useSSL: env.S3_USE_SSL === "true",
});

export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await s3Client.bucketExists(bucketName);
  if (!bucketExists) {
    await s3Client.makeBucket(bucketName);
  }
}

export async function saveFileInBucket({
  bucketName,
  fileName,
  file,
  path,
}: {
  bucketName: string;
  fileName: string;
  path: string;
  file: Buffer | internal.Readable;
}) {
  // Create bucket if it doesn't exist
  await createBucketIfNotExists(bucketName);

  // check if file exists
  const fileExists = await checkFileExistsInBucket({
    bucketName,
    fileName,
    path,
  });

  if (fileExists) {
    throw new Error("File already exists");
  }

  // Upload image to S3 bucket
  await s3Client.putObject(bucketName, `${path}${fileName}`, file);
}

export async function checkFileExistsInBucket({
  bucketName,
  fileName,
  path,
}: {
  bucketName: string;
  fileName: string;
  path: string;
}) {
  try {
    await s3Client.statObject(bucketName, `${path}${fileName}`);
  } catch (error) {
    return false;
  }
  return true;
}

export async function getFileFromBucket({
  bucketName,
  fileName,
  path,
}: {
  bucketName: string;
  fileName: string;
  path: string;
}) {
  try {
    await s3Client.statObject(bucketName, `${path}${fileName}`);
  } catch (error) {
    console.error(error);
    return null;
  }
  return await s3Client.getObject(bucketName, `${path}${fileName}`);
}

export async function deleteFileFromBucket({
  bucketName,
  fileName,
  path,
}: {
  bucketName: string;
  fileName: string;
  path: string;
}) {
  try {
    await s3Client.removeObject(bucketName, `${path}${fileName}`);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function createPresignedUrlToUpload({
  bucketName,
  fileName,
  path,
  expiry = 60 * 60, // 1 hour
}: {
  bucketName: string;
  fileName: string;
  path: string;
  expiry?: number;
}) {
  // Create bucket if it doesn't exist
  await createBucketIfNotExists(bucketName);

  return await s3Client.presignedPutObject(
    bucketName,
    `${path}${fileName}`,
    expiry
  );
}

export async function createPresignedUrlToDownload({
  bucketName,
  fileName,
  path,
  expiry = 60 * 60, // 1 hour
}: {
  bucketName: string;
  fileName: string;
  path: string;
  expiry?: number;
}) {
  return await s3Client.presignedGetObject(
    bucketName,
    `${path}${fileName}`,
    expiry
  );
}
