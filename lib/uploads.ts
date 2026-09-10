import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

function driver(): "blob" | "local" {
  const d = process.env.UPLOAD_DRIVER;
  if (d === "blob" || d === "local") return d;
  return process.env.VERCEL ? "blob" : "local";
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES[file.type]) return "صيغة الصورة غير مدعومة (jpg, png, webp, avif)";
  if (file.size > MAX_UPLOAD_BYTES) return "حجم الصورة أكبر من 5MB";
  return null;
}

export async function saveUpload(file: File): Promise<string> {
  const ext = ALLOWED_TYPES[file.type];
  const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;

  if (driver() === "blob") {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${name}`, file, { access: "public" });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
