import { getFileFromBucket } from "@/lib/s3/manage";
import JSZip from "jszip";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // Collect all images from query params
  const images = [];
  const buckets = searchParams.getAll("bucket");
  const fileNames = searchParams.getAll("fileName");
  const paths = searchParams.getAll("path");
  const originalNames = searchParams.getAll("originalName");

  for (let i = 0; i < fileNames.length; i++) {
    images.push({
      bucket: buckets[i],
      fileName: fileNames[i],
      path: paths[i],
      originalName: originalNames[i],
    });
  }

  const zip = new JSZip();
  for (const img of images) {
    const file = await getFileFromBucket({
      bucketName: img.bucket,
      fileName: img.fileName,
      path: img.path,
    });
    if (!file) continue;
    const chunks: Buffer[] = [];
    for await (const chunk of file) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    zip.file(img.originalName, buffer);
  }

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  return new NextResponse(zipBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=batch-download.zip`,
    },
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url!);
  const searchParams = url.searchParams;
  // Collect all images from query params
  const images: Array<{
    bucket: string;
    fileName: string;
    path: string;
    originalName: string;
  }> = [];
  for (const [key, value] of searchParams.entries()) {
    if (key === "bucket") {
      images.push({
        bucket: value,
        fileName: searchParams.getAll("fileName")[images.length],
        path: searchParams.getAll("path")[images.length],
        originalName: searchParams.getAll("originalName")[images.length],
      });
    }
  }

  const zip = new JSZip();
  for (const img of images) {
    const file = await getFileFromBucket({
      bucketName: img.bucket,
      fileName: img.fileName,
      path: img.path,
    });
    if (!file) continue;
    const chunks: Buffer[] = [];
    for await (const chunk of file) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    zip.file(img.originalName, buffer);
  }
  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  return new NextResponse(zipBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=batch-download.zip`,
    },
  });
}
