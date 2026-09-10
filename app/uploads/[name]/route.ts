import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

export async function GET(
  _request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(name) || name.includes("..")) {
    return new NextResponse(null, { status: 404 });
  }

  const ext = path.extname(name).toLowerCase();
  const type = CONTENT_TYPES[ext];
  if (!type) return new NextResponse(null, { status: 404 });

  try {
    const file = await readFile(path.join(process.cwd(), "uploads", name));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
