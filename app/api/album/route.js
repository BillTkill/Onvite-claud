import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  slug: z.string().trim().min(1),
  uploaderName: z.string().trim().max(80).optional().or(z.literal("")),
  urls: z.array(z.string().trim().min(1)).min(1).max(30),
});

/**
 * Registers guest-uploaded album photos for an event (found by slug).
 * If the couple enabled "review before publishing", photos start unapproved.
 */
export async function POST(req) {
  if (!rateLimit(`album:${clientIp(req)}`, { limit: 10, windowMs: 60_000 }).ok) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const { slug, uploaderName, urls } = parsed.data;

  const event = await prisma.event.findFirst({ where: { slug, active: true }, select: { id: true, albumModerate: true } });
  if (!event) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  await prisma.photo.createMany({
    data: urls.map((url) => ({
      eventId: event.id,
      url,
      uploaderName: uploaderName || null,
      approved: !event.albumModerate,
    })),
  });

  return NextResponse.json({ ok: true, pending: event.albumModerate });
}
