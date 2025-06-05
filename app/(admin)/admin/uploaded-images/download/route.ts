import { getFileFromBucket } from "@/lib/s3/manage";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bucket = searchParams.get("bucket");
  const fileName = searchParams.get("fileName");
  const path = searchParams.get("path") || "";
  const originalName = searchParams.get("originalName") || fileName || "file";

  if (!bucket || !fileName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const file = await getFileFromBucket({ bucketName: bucket, fileName, path });
  if (!file)
    return NextResponse.json({ error: "File not found" }, { status: 404 });

  const chunks: Buffer[] = [];
  for await (const chunk of file) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${originalName}"`,
    },
  });
}
