import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BYTES = 30 * 1024 * 1024; // 30 MB
// Allowlist of safe media types → extension. The extension comes from the
// (trusted) MIME, never from the filename. SVG is intentionally excluded: a
// stored SVG served from our origin could execute scripts (XSS).
const EXT_BY_TYPE = {
  "image/jpeg": "jpg", "image/pjpeg": "jpg", "image/png": "png", "image/webp": "webp",
  "image/gif": "gif", "image/heic": "heic", "image/heif": "heif",
  "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov", "video/3gpp": "3gp",
  "audio/mpeg": "mp3", "audio/mp3": "mp3", "audio/mp4": "m4a", "audio/x-m4a": "m4a",
  "audio/wav": "wav", "audio/x-wav": "wav", "audio/ogg": "ogg", "audio/webm": "weba",
};

/**
 * Stores an uploaded file on disk under public/uploads and returns its URL.
 * Public endpoint (guests upload photos without an account). Real production
 * would use object storage (S3 / Cloudinary) + rate limiting; this works for a
 * self-hosted app.
 */
export async function POST(req) {
  if (!rateLimit(`upload:${clientIp(req)}`, { limit: 20, windowMs: 60_000 }).ok) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json({ ok: false, error: "type" }, { status: 415 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length === 0 || bytes.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "size" }, { status: 413 });
  }

  // Random, server-generated filename — no user-controlled path segment.
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);

  return NextResponse.json({ ok: true, url: `/uploads/${name}` });
}
