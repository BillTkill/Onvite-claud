import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1),
  username: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const { name, username, email, password } = parsed.data;
  const emailNorm = email.toLowerCase();

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: emailNorm }, { username }] },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, username, email: emailNorm, passwordHash, role: "CLIENT" },
  });

  return NextResponse.json({ ok: true });
}
