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

  const eventDate = d.date ? new Date(d.date) : null;

  await prisma.reservation.create({
    data: {
      userId: session?.user?.id ?? null,
      names: d.names,
      email: d.email.trim().toLowerCase(),
      phone: d.phone || null,
      eventType: d.eventType,
      eventDate: eventDate && !isNaN(eventDate.getTime()) ? eventDate : null,
      place: d.place || null,
      notes: d.notes || null,
      plan: d.plan || null,
      templateSlug: d.templateSlug || null,
    },
  });

  return NextResponse.json({ ok: true });
}
