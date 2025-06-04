"use server";

import { getFileFromBucket } from "@/lib/s3/manage";
import { NextResponse } from "next/server";

export async function downloadImageAction({ bucket, fileName, path, originalName }: { bucket: string; fileName: string; path: string; originalName: string; }) {
  const file = await getFileFromBucket({ bucketName: bucket, fileName, path });
  if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

  // Buffer the stream if needed (Minio returns a stream)
  const chunks: Buffer[] = [];
  for await (const chunk of file) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=\"${originalName}\"`,
    },
  });
}
