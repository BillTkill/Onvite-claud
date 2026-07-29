import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const MAX_BYTES = 30 * 1024 * 1024; // 30 MB
const ALLOWED = /^(image|video|audio)\//;

/**
 * Stores an uploaded file on disk under public/uploads and returns its URL.
 * Public endpoint (guests upload photos without an account). Real production
 * would use object storage (S3 / Cloudinary); this works for a self-hosted app.
 */
export async function POST(req) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }
  if (file.type && !ALLOWED.test(file.type)) {
    return NextResponse.json({ ok: false, error: "type" }, { status: 415 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const ext = (file.name?.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "bin";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);

  return NextResponse.json({ ok: true, url: `/uploads/${name}` });
}
