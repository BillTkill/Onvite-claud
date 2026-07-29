import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

const schema = z.object({
  plan: z.string().optional(),
  templateSlug: z.string().optional(),
  names: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().optional(),
  eventType: z.string().trim().min(1),
  date: z.string().optional(),
  city: z.string().optional(),
  place: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const d = parsed.data;
  const session = await auth();

  // One reservation per account: if the logged-in user (or their email) already
  // has a booking, block a second one.
  const emailNorm = d.email.trim().toLowerCase();
  const existing = await prisma.reservation.findFirst({
    where: { OR: [session?.user?.id ? { userId: session.user.id } : undefined, { email: emailNorm }].filter(Boolean) },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
  }

  const eventDate = d.date ? new Date(d.date) : null;

  await prisma.reservation.create({
    data: {
      userId: session?.user?.id ?? null,
      names: d.names,
      email: d.email.trim().toLowerCase(),
      phone: d.phone || null,
      eventType: d.eventType,
      eventDate: eventDate && !isNaN(eventDate.getTime()) ? eventDate : null,
      // The public form has a single location field ("Lugar", placeholder
      // "Ciudad, país"). Persist it as `city` too so the admin CRM — which
      // reads `city` — shows the location instead of an empty cell.
      city: d.city || d.place || null,
      place: d.place || null,
      notes: d.notes || null,
      plan: d.plan || null,
      templateSlug: d.templateSlug || null,
    },
  });

  return NextResponse.json({ ok: true });
}
